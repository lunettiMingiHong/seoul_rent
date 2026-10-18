# 서울 동별·주택유형별 평균 전세가 확인 앱

`jeonse_mean.csv`의 전처리된 데이터를 이용해 자치구, 동, 주택유형별 평균 전세가와 거래 건수를 보여 주는 정적 웹 앱입니다.

## 구성

- `index.html`: 화면 구조
- `style.css`: 무채색 기반의 미니멀 UI 스타일
- `script.js`: CSV 불러오기, 선택 메뉴 연결, 결과 표시
- `jeonse_mean.csv`: 동별·주택유형별 평균 전세가 데이터
- `data.js`: 로컬 파일로 직접 열어도 작동하도록 CSV를 내장한 데이터 파일

## Chrome에서 바로 열기

`index.html`을 Chrome 창으로 끌어 놓거나, 파일을 우클릭한 뒤 **연결 프로그램 → Google Chrome**을 선택하면 됩니다. `data.js`에 데이터가 함께 들어 있어 Live Server 없이도 동작합니다.

## GitHub에 올리기

1. GitHub에서 `seoul_rent`라는 새 저장소를 만듭니다.
2. 이 폴더 안의 파일을 모두 업로드합니다.
3. 저장소의 기본 브랜치를 선택해 Cloudflare Pages로 가져옵니다.

## Cloudflare Pages 배포

1. Cloudflare 대시보드에서 **Workers & Pages** → **Create application** → **Pages**를 선택합니다.
2. GitHub 저장소 `seoul_rent`를 연결합니다.
3. 이 앱은 정적 HTML/CSS/JavaScript 프로젝트이므로 빌드 명령은 비워 두고, 배포 디렉터리는 저장소의 루트(`/`)로 설정합니다.
4. 배포를 실행한 뒤 발급된 주소에서 자치구 → 동 → 주택유형을 선택해 결과를 확인합니다.

이 앱은 API 키를 사용하지 않는 옵션 1 과제입니다.

