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
