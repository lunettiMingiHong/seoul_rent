const districtSelect = document.querySelector("#district");
const neighborhoodSelect = document.querySelector("#neighborhood");
const housingSelect = document.querySelector("#housing-type");
const searchButton = document.querySelector("#search-button");
const statusMessage = document.querySelector("#status");
const resultCard = document.querySelector("#result");

let rentRows = [];

function uniqueSorted(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "ko"));
}

function setOptions(select, values, placeholder) {
  select.replaceChildren(new Option(placeholder, ""));
  values.forEach((value) => select.add(new Option(value, value)));
  select.disabled = values.length === 0;
}

function parseCsv(csvText) {
  const [headerLine, ...lines] = csvText.trim().split(/\r?\n/);
  const headers = headerLine.split(",");
  return lines.map((line) => {
    const values = line.split(",");
    return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
  });
}

function formatPrice(valueInManwon) {
  const value = Math.round(Number(valueInManwon));
  const eok = Math.floor(value / 10000);
  const manwon = value % 10000;
  if (eok === 0) return `${value.toLocaleString("ko-KR")}만원`;
  if (manwon === 0) return `${eok}억 원`;
  return `${eok}억 ${manwon.toLocaleString("ko-KR")}만원`;
}

function updateNeighborhoods() {
  const district = districtSelect.value;
  const neighborhoods = uniqueSorted(rentRows.filter((row) => row.CGG_NM === district).map((row) => row.STDG_NM));
  setOptions(neighborhoodSelect, neighborhoods, "동을 선택하세요");
  setOptions(housingSelect, [], "동을 먼저 선택하세요");
  searchButton.disabled = true;
  resultCard.classList.add("is-hidden");
}

function updateHousingTypes() {
  const district = districtSelect.value;
  const neighborhood = neighborhoodSelect.value;
  const housingTypes = uniqueSorted(rentRows
    .filter((row) => row.CGG_NM === district && row.STDG_NM === neighborhood)
    .map((row) => row.BLDG_USG));
  setOptions(housingSelect, housingTypes, "주택유형을 선택하세요");
  searchButton.disabled = housingTypes.length === 0;
  resultCard.classList.add("is-hidden");
}

function showResult() {
  const row = rentRows.find((item) => item.CGG_NM === districtSelect.value
    && item.STDG_NM === neighborhoodSelect.value
    && item.BLDG_USG === housingSelect.value);

  if (!row) {
    statusMessage.textContent = "선택한 조건의 데이터를 찾지 못했어요.";
    resultCard.classList.add("is-hidden");
    return;
  }

  document.querySelector("#result-location").textContent = `${row.CGG_NM} · ${row.STDG_NM} · ${row.BLDG_USG}`;
  document.querySelector("#average-price").textContent = formatPrice(row["평균전세가_만원"]);
  document.querySelector("#transaction-count").textContent = `${Number(row["거래건수"]).toLocaleString("ko-KR")}건`;
  statusMessage.textContent = "선택한 조건의 전세 거래 정보를 찾았어요.";
  resultCard.classList.remove("is-hidden");
}

async function initialize() {
  try {
    // 로컬 파일로 열 때는 data.js의 내장 데이터를, 배포 환경에서는 CSV를 사용합니다.
    if (window.RENT_CSV) {
      rentRows = parseCsv(window.RENT_CSV);
    } else {
      const response = await fetch("jeonse_mean.csv");
      if (!response.ok) throw new Error("CSV를 불러오지 못했습니다.");
      rentRows = parseCsv(await response.text());
    }
    setOptions(districtSelect, uniqueSorted(rentRows.map((row) => row.CGG_NM)), "자치구를 선택하세요");
    statusMessage.textContent = `${rentRows.length.toLocaleString("ko-KR")}개의 동·주택유형 정보를 준비했어요.`;
  } catch (error) {
    statusMessage.textContent = "데이터를 불러오지 못했어요. CSV 파일이 앱 폴더에 있는지 확인해 주세요.";
    console.error(error);
  }
}

districtSelect.addEventListener("change", updateNeighborhoods);
neighborhoodSelect.addEventListener("change", updateHousingTypes);
housingSelect.addEventListener("change", () => { searchButton.disabled = !housingSelect.value; });
searchButton.addEventListener("click", showResult);

initialize();

