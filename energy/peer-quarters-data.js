'use strict';
// Rows of 분기 비교 (밸류체인 기업 › 분기 비교), drawn by peer-quarters.js: the company
// sections of the textbook that went to the dashboard (2.13, 2.14, 2.16 to 2.19,
// 2.20, 2.21, 4.7, 4.9 to 4.11, 5.13, 5.14, 5.16 to 5.18, 7.23, 8.4, 8.5, 9.5,
// 9.6, 10.4, 10.7). `stages` is the order of the value chain. `metrics` are the
// reported figures: `value_text` is the figure as the textbook writes it and
// `value` the number behind a bar, in the unit of its chart, so the two can be
// written in different units ($693m on a $bn axis is 0.693, 약 1/8 is 0.125); a
// range is [low, high] and a wording null.
// `kind` is 실적, 회사 정의 지표, 가이던스 or 경영진 추정, `derived` marks a figure worked
// out from two reported ones, `card` is the ticker of the company card. `group` is
// the bundle of one axis: observations of one stage with the same `group` and `unit`
// are one chart when two of them have a number or a range, and the rest are tiles.
// A group is one measure of two companies, one measure of a company in two periods
// (or its actual and the guidance after it), or the parts a company reports in one
// period; figures on different definitions get different groups. `group_notes` is
// the line a chart carries under its head where its bars stand on different bases
// (group -> sentence). `notes` are what the calls and filings explained (`cards`: tickers,
// `dates`: the day of each company's call where a row reads several). `sources`
// are the documents behind each section. Keep the object strict JSON: the tests
// parse it (backend/tests/test_energy_peers.py).
const peerQuarters = {
 "as_of": "2026-11-11",
 "stages": [
  "육상 시추",
  "해양 시추·FPSO",
  "유전서비스·장비",
  "생산자·통합 메이저",
  "배관·가스 인프라",
  "원유선·제품선",
  "정유",
  "비료·화학",
  "전방 기업"
 ],
 "group_notes": {
  "리그 구성(연차공시)": "Transocean은 2026년 2월 17일 기준 보유·부분 보유·운영 선대, Valaris는 2026년 2월 20일 기준 자체 보유 선대라 집계 기준이 다르다. 두 회사 모두 운영 가능·계약 중·휴지 장비를 합친 수이며 합병 후 선대 현황과는 다르다.",
  "해양 수주잔고": "두 회사 각각의 독립회사 수주잔고이며 합병 가정 수주잔고와 합산하는 값이 아니다.",
  "유전서비스 분기 수주": "LNG 장비 수주는 IET 수주에 들어 있는 금액이다.",
  "가스관 설비 능력": "Blackcomb는 가동을 개시했고 Bay Runner는 기계적 완공 단계라 진행 단계가 다르다.",
  "확장 프로젝트 잔고·분기 변동": "잔고는 발표 시점의 잔액이고 분기 추가·분기 가동 개시는 분기 중 변동분이다.",
  "가스 처리 물량": "전체 물량과 Permian 물량의 포함 관계는 확인되지 않았다.",
  "자사 LR2 원유 항차 비중": "분수로 제시된 값이며 백분율 값은 제시되지 않았다.",
  "원유선 매출·이익공유": "이익공유 약 $77m은 원유선 매출 약 $321m에 들어 있다.",
  "처리량": "Valero는 정유 처리량, Marathon은 총 처리량으로 제시했다. 총 처리량은 원유만의 투입과 다를 수 있다.",
  "연료비 증가액과 회수 산술액": "회수 대응액과 미회수액은 경영진의 회수율 72%를 증가액에 곱해 얻은 산술치이며 회사는 이 금액을 제시하지 않았다."
 },
 "metrics": [
  {
   "id": "hp-na-avg-contracted-rigs",
   "stage": "육상 시추",
   "company": "H&P",
   "card": "HP",
   "period": "FY2026 Q3(분기말 2026년 6월 30일)",
   "report_date": "2026-08-06",
   "metric": "북미 평균 계약 리그",
   "value": 142,
   "unit": "기",
   "value_text": "142기",
   "compare": "",
   "kind": "실적",
   "definition": "분기 평균 계약 리그이며 분기말 가동 리그와 기준이 다르다. 분기말이 2026년 6월 30일이라 3Q26 회사들과 분기가 다르다.",
   "group": "북미 평균 리그",
   "section": "2.16",
   "derived": false
  },
  {
   "id": "hp-l48-quarter-end-active-rigs",
   "stage": "육상 시추",
   "company": "H&P",
   "card": "HP",
   "period": "2026년 6월 30일(FY2026 Q3 분기말)",
   "report_date": "2026-08-06",
   "metric": "미국 Lower 48 분기말 가동",
   "value": 147,
   "unit": "기",
   "value_text": "147기",
   "compare": "",
   "kind": "실적",
   "definition": "분기말 시점의 미국 Lower 48 가동 리그이며 북미 분기 평균 계약 리그와 범위·기준이 다르다.",
   "group": "육상 분기말 가동 리그",
   "section": "2.16",
   "derived": false
  },
  {
   "id": "hp-na-direct-margin-per-day",
   "stage": "육상 시추",
   "company": "H&P",
   "card": "HP",
   "period": "FY2026 Q3(분기말 2026년 6월 30일)",
   "report_date": "2026-08-06",
   "metric": "북미 direct margin/day",
   "value": 18700,
   "unit": "$/일",
   "value_text": "$18,700",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "Direct margin은 회사가 정의한 지표이며 Patterson-UTI의 시추 일당과는 다른 지표다. 기업 카드 표기: 북미 솔루션 일일 직접마진 18,669 달러/일",
   "group": "육상 일일 direct margin(회사 정의)",
   "section": "2.16",
   "derived": false
  },
  {
   "id": "hp-next-quarter-na-avg-rigs-guidance",
   "stage": "육상 시추",
   "company": "H&P",
   "card": "HP",
   "period": "FY2026 Q3의 다음 분기(회계연도 말 분기) 가이던스",
   "report_date": "2026-08-06",
   "metric": "다음 분기 북미 평균 리그 가이던스",
   "value": [
    145,
    151
   ],
   "unit": "기",
   "value_text": "145–151기",
   "compare": "",
   "kind": "가이던스",
   "definition": "2026년 8월 6일 콜 당시 전망이며 북미 평균 리그의 범위다.",
   "group": "북미 평균 리그",
   "section": "2.16",
   "derived": false
  },
  {
   "id": "pten-drilling-dayrate",
   "stage": "육상 시추",
   "company": "Patterson-UTI",
   "card": "PTEN",
   "period": "3Q26",
   "report_date": "2026-10-29",
   "metric": "분기 시추 일당",
   "value": null,
   "unit": "$/일",
   "value_text": "$30,000대 중반",
   "compare": "",
   "kind": "실적",
   "definition": "평균 가격대 설명이다.",
   "group": "육상 시추 일당",
   "section": "2.16",
   "derived": false
  },
  {
   "id": "pten-rig-reactivation-cost",
   "stage": "육상 시추",
   "company": "Patterson-UTI",
   "card": "PTEN",
   "period": "3Q26 콜 설명",
   "report_date": "2026-10-29",
   "metric": "리그 재가동 비용",
   "value": 1,
   "unit": "$m/기",
   "value_text": "약 $1m/기",
   "compare": "",
   "kind": "경영진 추정",
   "definition": "추가 업그레이드 비용은 제외한 값이다.",
   "group": "리그 재가동 비용",
   "section": "2.16",
   "derived": false
  },
  {
   "id": "pten-completion-pricing",
   "stage": "육상 시추",
   "company": "Patterson-UTI",
   "card": "PTEN",
   "period": "3Q26",
   "report_date": "2026-10-29",
   "metric": "완결 가격",
   "value": null,
   "unit": "",
   "value_text": "전분기 대비 한 자릿수 중반(%) 상승",
   "compare": "전분기 대비",
   "kind": "실적",
   "definition": "회사 표현이다.",
   "group": "완결 가격",
   "section": "2.16",
   "derived": false
  },
  {
   "id": "pten-q4-avg-rigs-guidance",
   "stage": "육상 시추",
   "company": "Patterson-UTI",
   "card": "PTEN",
   "period": "4Q26 가이던스",
   "report_date": "2026-10-29",
   "metric": "4분기 평균 시추 리그 가이던스",
   "value": 104,
   "unit": "기",
   "value_text": "약 104기",
   "compare": "",
   "kind": "가이던스",
   "definition": "2026년 10월 29일 콜 당시 전망이다. H&P 수치(분기말 2026년 6월 30일)와 기간이 다르다.",
   "group": "4분기 평균 시추 리그 가이던스",
   "section": "2.16",
   "derived": false
  },
  {
   "id": "pten-year-end-gas-capable-share-target",
   "stage": "육상 시추",
   "company": "Patterson-UTI",
   "card": "PTEN",
   "period": "2026년 말 목표",
   "report_date": "2026-10-29",
   "metric": "연말 가스 사용 장비 목표",
   "value": 90,
   "unit": "%",
   "value_text": "약 90%",
   "compare": "",
   "kind": "가이던스",
   "definition": "활동 펌핑 출력 가운데 일부라도 가스를 쓰는 비중의 목표이며 당시 전망이다. 가스 사용 목표에는 부분 혼소도 포함된다.",
   "group": "육상 완결 장비",
   "section": "2.16",
   "derived": false
  },
  {
   "id": "rig-fleet-drillships",
   "stage": "해양 시추·FPSO",
   "company": "Transocean",
   "card": "RIG",
   "period": "2026년 2월 17일 기준",
   "report_date": "",
   "metric": "드릴십",
   "value": 20,
   "unit": "기",
   "value_text": "20기",
   "compare": "",
   "kind": "실적",
   "definition": "2026년 2월 17일 기준 보유·부분 보유·운영 선대다.",
   "group": "리그 구성(연차공시)",
   "section": "2.17",
   "derived": false
  },
  {
   "id": "rig-fleet-semisubs",
   "stage": "해양 시추·FPSO",
   "company": "Transocean",
   "card": "RIG",
   "period": "2026년 2월 17일 기준",
   "report_date": "",
   "metric": "반잠수식",
   "value": 7,
   "unit": "기",
   "value_text": "7기",
   "compare": "",
   "kind": "실적",
   "definition": "2026년 2월 17일 기준 보유·부분 보유·운영 선대다.",
   "group": "리그 구성(연차공시)",
   "section": "2.17",
   "derived": false
  },
  {
   "id": "rig-fleet-jackups",
   "stage": "해양 시추·FPSO",
   "company": "Transocean",
   "card": "RIG",
   "period": "2026년 2월 17일 기준",
   "report_date": "",
   "metric": "잭업",
   "value": 0,
   "unit": "기",
   "value_text": "0기",
   "compare": "",
   "kind": "실적",
   "definition": "2026년 2월 17일 기준 보유·부분 보유·운영 선대다.",
   "group": "리그 구성(연차공시)",
   "section": "2.17",
   "derived": false
  },
  {
   "id": "val-fleet-drillships",
   "stage": "해양 시추·FPSO",
   "company": "Valaris",
   "card": "VAL",
   "period": "2026년 2월 20일 기준",
   "report_date": "",
   "metric": "드릴십",
   "value": 13,
   "unit": "기",
   "value_text": "13기",
   "compare": "",
   "kind": "실적",
   "definition": "2026년 2월 20일 기준 자체 보유 선대다. 지분법 합작사업 ARO 선대 9기는 제외했다.",
   "group": "리그 구성(연차공시)",
   "section": "2.17",
   "derived": false
  },
  {
   "id": "val-fleet-semisubs",
   "stage": "해양 시추·FPSO",
   "company": "Valaris",
   "card": "VAL",
   "period": "2026년 2월 20일 기준",
   "report_date": "",
   "metric": "반잠수식",
   "value": 2,
   "unit": "기",
   "value_text": "2기",
   "compare": "",
   "kind": "실적",
   "definition": "2026년 2월 20일 기준 자체 보유 선대다. 지분법 합작사업 ARO 선대 9기는 제외했다.",
   "group": "리그 구성(연차공시)",
   "section": "2.17",
   "derived": false
  },
  {
   "id": "val-fleet-jackups",
   "stage": "해양 시추·FPSO",
   "company": "Valaris",
   "card": "VAL",
   "period": "2026년 2월 20일 기준",
   "report_date": "",
   "metric": "잭업",
   "value": 31,
   "unit": "기",
   "value_text": "31기",
   "compare": "",
   "kind": "실적",
   "definition": "2026년 2월 20일 기준 자체 보유 선대다. 지분법 합작사업 ARO 선대 9기는 제외했다.",
   "group": "리그 구성(연차공시)",
   "section": "2.17",
   "derived": false
  },
  {
   "id": "val-aro-jv-fleet",
   "stage": "해양 시추·FPSO",
   "company": "Valaris",
   "card": "VAL",
   "period": "연차공시 기준(기준일 표기 없음)",
   "report_date": "",
   "metric": "ARO 합작사업 선대(그림에서 제외)",
   "value": 9,
   "unit": "기",
   "value_text": "9기",
   "compare": "",
   "kind": "실적",
   "definition": "지분법 합작사업 ARO의 선대이며 리그 구성 그림에서 제외했다.",
   "group": "ARO 합작사업 선대(그림 제외)",
   "section": "2.17",
   "derived": false
  },
  {
   "id": "rig-average-daily-revenue",
   "stage": "해양 시추·FPSO",
   "company": "Transocean",
   "card": "RIG",
   "period": "3Q26",
   "report_date": "2026-11-03",
   "metric": "평균 일일 매출",
   "value": 463000,
   "unit": "$/일",
   "value_text": "약 $463,000",
   "compare": "",
   "kind": "실적",
   "definition": "기존 계약의 평균 일일 매출이다. 기업 카드 표기: 평균 일일 매출(전체 선대) 462,600 달러/일",
   "group": "해양 평균 일일 매출",
   "section": "2.17",
   "derived": false
  },
  {
   "id": "rig-fleet-uptime",
   "stage": "해양 시추·FPSO",
   "company": "Transocean",
   "card": "RIG",
   "period": "3Q26",
   "report_date": "2026-11-03",
   "metric": "Fleet uptime",
   "value": 98,
   "unit": "%",
   "value_text": "98%",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "Valaris의 매출효율과는 이름이 다른 지표이며 전체 보유선대의 시장 가동률과도 다르다. 기업 카드 표기: 수익 효율 96.8%, 선대 가동률 74.7%. 카드의 두 값도 이 값과 이름이 다른 지표다.",
   "group": "해양 fleet uptime",
   "section": "2.17",
   "derived": false
  },
  {
   "id": "rig-standalone-backlog",
   "stage": "해양 시추·FPSO",
   "company": "Transocean",
   "card": "RIG",
   "period": "3Q26 발표 기준",
   "report_date": "2026-11-03",
   "metric": "독립회사 수주잔고",
   "value": 8.0,
   "unit": "$bn",
   "value_text": "약 $8.0bn",
   "compare": "",
   "kind": "실적",
   "definition": "Transocean 독립회사 기준 수주잔고(미래 매출)다.",
   "group": "해양 수주잔고",
   "section": "2.17",
   "derived": false
  },
  {
   "id": "rig-2027-contract-coverage",
   "stage": "해양 시추·FPSO",
   "company": "Transocean",
   "card": "RIG",
   "period": "2027년(3Q26 콜 설명)",
   "report_date": "2026-11-03",
   "metric": "2027년 계약 커버리지",
   "value": 95,
   "unit": "%",
   "value_text": "약 95%",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "미래 작업기간의 계약 비중이다.",
   "group": "해양 계약 커버리지(2027년)",
   "section": "2.17",
   "derived": false
  },
  {
   "id": "rig-pro-forma-merged-backlog",
   "stage": "해양 시추·FPSO",
   "company": "Transocean",
   "card": "RIG",
   "period": "3Q26 발표 기준",
   "report_date": "2026-11-03",
   "metric": "합병회사 pro forma 수주잔고",
   "value": 12.7,
   "unit": "$bn",
   "value_text": "약 $12.7bn",
   "compare": "",
   "kind": "경영진 추정",
   "definition": "합병 가정 수치이며 양사 독립 수주잔고와 합산하는 값이 아니다. 거래는 2026년 11월 7일 확인 시점에 미종결이다.",
   "group": "해양 수주잔고(합병 가정)",
   "section": "2.17",
   "derived": false
  },
  {
   "id": "val-revenue-efficiency",
   "stage": "해양 시추·FPSO",
   "company": "Valaris",
   "card": "VAL",
   "period": "3Q26",
   "report_date": "2026-11-02",
   "metric": "분기 매출효율",
   "value": 97,
   "unit": "%",
   "value_text": "97%",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "Valaris 공식 실적발표 자료의 지표다. Transocean의 fleet uptime과는 다른 이름의 지표다. 기업 카드 표기: 수익 효율 97%",
   "group": "해양 매출효율",
   "section": "2.17",
   "derived": false
  },
  {
   "id": "val-active-drillships-contracted",
   "stage": "해양 시추·FPSO",
   "company": "Valaris",
   "card": "VAL",
   "period": "3Q26 발표 기준",
   "report_date": "2026-11-02",
   "metric": "활동 드릴십 계약 상태",
   "value": 10,
   "unit": "척",
   "value_text": "10척 모두 계약",
   "compare": "",
   "kind": "실적",
   "definition": "활동 드릴십 10척이 모두 계약 상태다.",
   "group": "활동 드릴십 계약 상태",
   "section": "2.17",
   "derived": false
  },
  {
   "id": "val-backlog",
   "stage": "해양 시추·FPSO",
   "company": "Valaris",
   "card": "VAL",
   "period": "3Q26 발표 기준",
   "report_date": "2026-11-02",
   "metric": "수주잔고",
   "value": 4.8,
   "unit": "$bn",
   "value_text": "약 $4.8bn",
   "compare": "",
   "kind": "실적",
   "definition": "Valaris 독립회사 기준 수주잔고(미래 매출)다.",
   "group": "해양 수주잔고",
   "section": "2.17",
   "derived": false
  },
  {
   "id": "val-drillships-returned-from-long-idle",
   "stage": "해양 시추·FPSO",
   "company": "Valaris",
   "card": "VAL",
   "period": "2026년 중(3Q26 발표 기준)",
   "report_date": "2026-11-02",
   "metric": "당해 장기 유휴 후 복귀한 드릴십",
   "value": 4,
   "unit": "척",
   "value_text": "4척",
   "compare": "",
   "kind": "실적",
   "definition": "복귀 비용이 동반됐다.",
   "group": "장기 유휴 후 복귀 드릴십",
   "section": "2.17",
   "derived": false
  },
  {
   "id": "sbm-operating-fleet",
   "stage": "해양 시추·FPSO",
   "company": "SBM Offshore",
   "card": "SBMO",
   "period": "2025년 말",
   "report_date": "",
   "metric": "운영 선대",
   "value": 16,
   "unit": "FPSO",
   "value_text": "16 FPSO",
   "compare": "",
   "kind": "실적",
   "definition": "생산·처리·저장 설비의 수다.",
   "group": "FPSO 운영 선대",
   "section": "2.18",
   "derived": false
  },
  {
   "id": "sbm-ifrs-lo-revenue-2024",
   "stage": "해양 시추·FPSO",
   "company": "SBM Offshore",
   "card": "SBMO",
   "period": "2024년",
   "report_date": "",
   "metric": "IFRS L&O 매출",
   "value": 2074,
   "unit": "$m",
   "value_text": "$2,074m",
   "compare": "",
   "kind": "실적",
   "definition": "IFRS의 금융리스·연결회계가 반영된 매출이다.",
   "group": "FPSO L&O 매출(IFRS)",
   "section": "2.18",
   "derived": false
  },
  {
   "id": "sbm-ifrs-lo-revenue-2025",
   "stage": "해양 시추·FPSO",
   "company": "SBM Offshore",
   "card": "SBMO",
   "period": "2025년",
   "report_date": "",
   "metric": "IFRS L&O 매출",
   "value": 2398,
   "unit": "$m",
   "value_text": "$2,398m",
   "compare": "2024년 $2,074m",
   "kind": "실적",
   "definition": "IFRS의 금융리스·연결회계가 반영된 매출이다.",
   "group": "FPSO L&O 매출(IFRS)",
   "section": "2.18",
   "derived": false
  },
  {
   "id": "sbm-directional-lo-revenue-2024",
   "stage": "해양 시추·FPSO",
   "company": "SBM Offshore",
   "card": "SBMO",
   "period": "2024년",
   "report_date": "",
   "metric": "Directional L&O 매출",
   "value": 2369,
   "unit": "$m",
   "value_text": "$2,369m",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "운영리스 가정과 지분 기준 등의 조정이 들어간 회사 정의 매출이다.",
   "group": "FPSO L&O 매출(Directional)",
   "section": "2.18",
   "derived": false
  },
  {
   "id": "sbm-directional-lo-revenue-2025",
   "stage": "해양 시추·FPSO",
   "company": "SBM Offshore",
   "card": "SBMO",
   "period": "2025년",
   "report_date": "",
   "metric": "Directional L&O 매출",
   "value": 2295,
   "unit": "$m",
   "value_text": "$2,295m",
   "compare": "2024년 $2,369m",
   "kind": "회사 정의 지표",
   "definition": "운영리스 가정과 지분 기준 등의 조정이 들어간 회사 정의 매출이다.",
   "group": "FPSO L&O 매출(Directional)",
   "section": "2.18",
   "derived": false
  },
  {
   "id": "slb-well-construction-revenue",
   "stage": "유전서비스·장비",
   "company": "SLB",
   "card": "SLB",
   "period": "3Q26",
   "report_date": "2026-10-23",
   "metric": "Well Construction 매출",
   "value": 2.9,
   "unit": "$bn",
   "value_text": "약 $2.9bn",
   "compare": "",
   "kind": "실적",
   "definition": "부문 매출이다. 기업 카드 표기: 2.89 십억 달러",
   "group": "부문 매출",
   "section": "2.20",
   "derived": false
  },
  {
   "id": "slb-reservoir-performance-revenue",
   "stage": "유전서비스·장비",
   "company": "SLB",
   "card": "SLB",
   "period": "3Q26",
   "report_date": "2026-10-23",
   "metric": "Reservoir Performance 매출",
   "value": 1.6,
   "unit": "$bn",
   "value_text": "약 $1.6bn",
   "compare": "",
   "kind": "실적",
   "definition": "부문 매출이다. 기업 카드 표기: 1.63 십억 달러",
   "group": "부문 매출",
   "section": "2.20",
   "derived": false
  },
  {
   "id": "slb-production-systems-revenue",
   "stage": "유전서비스·장비",
   "company": "SLB",
   "card": "SLB",
   "period": "3Q26",
   "report_date": "2026-10-23",
   "metric": "Production Systems 매출",
   "value": 4.0,
   "unit": "$bn",
   "value_text": "약 $4.0bn",
   "compare": "",
   "kind": "실적",
   "definition": "부문 매출이다.",
   "group": "부문 매출",
   "section": "2.20",
   "derived": false
  },
  {
   "id": "slb-digital-revenue",
   "stage": "유전서비스·장비",
   "company": "SLB",
   "card": "SLB",
   "period": "3Q26",
   "report_date": "2026-10-23",
   "metric": "Digital 매출",
   "value": 0.693,
   "unit": "$bn",
   "value_text": "$693m",
   "compare": "",
   "kind": "실적",
   "definition": "부문 매출이다. $693m은 차트 단위로 $0.693bn이다.",
   "group": "부문 매출",
   "section": "2.20",
   "derived": false
  },
  {
   "id": "slb-middle-east-revenue",
   "stage": "유전서비스·장비",
   "company": "SLB",
   "card": "SLB",
   "period": "3Q26",
   "report_date": "2026-10-23",
   "metric": "중동 매출",
   "value": 1.9,
   "unit": "$bn",
   "value_text": "약 $1.9bn",
   "compare": "전분기 대비 13% 증가",
   "kind": "실적",
   "definition": "지역 매출이다. 부문 매출과는 같은 전사 매출을 다르게 나눈 값이다.",
   "group": "중동 매출",
   "section": "2.20",
   "derived": false
  },
  {
   "id": "hal-north-america-revenue",
   "stage": "유전서비스·장비",
   "company": "Halliburton",
   "card": "HAL",
   "period": "3Q26",
   "report_date": "2026-10-20",
   "metric": "북미 매출",
   "value": 2.2,
   "unit": "$bn",
   "value_text": "약 $2.2bn",
   "compare": "전년 대비 9% 감소",
   "kind": "실적",
   "definition": "지역 매출이다.",
   "group": "지역 매출(북미·국제)",
   "section": "2.20",
   "derived": false
  },
  {
   "id": "hal-international-revenue",
   "stage": "유전서비스·장비",
   "company": "Halliburton",
   "card": "HAL",
   "period": "3Q26",
   "report_date": "2026-10-20",
   "metric": "국제 매출",
   "value": 3.5,
   "unit": "$bn",
   "value_text": "약 $3.5bn",
   "compare": "전년 대비 9% 증가",
   "kind": "실적",
   "definition": "지역 매출이다.",
   "group": "지역 매출(북미·국제)",
   "section": "2.20",
   "derived": false
  },
  {
   "id": "hal-adjusted-operating-margin",
   "stage": "유전서비스·장비",
   "company": "Halliburton",
   "card": "HAL",
   "period": "3Q26",
   "report_date": "2026-10-20",
   "metric": "전사 조정 영업이익률",
   "value": 12.8,
   "unit": "%",
   "value_text": "12.8%",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "조정 기준의 전사 영업이익률이다. 기업 카드 표기: 조정 영업이익(이익률) 731 백만 달러 (12.8%)",
   "group": "전사 조정 영업이익률",
   "section": "2.20",
   "derived": false
  },
  {
   "id": "bkr-ofse-revenue",
   "stage": "유전서비스·장비",
   "company": "Baker Hughes",
   "card": "BKR",
   "period": "3Q26",
   "report_date": "2026-10-28",
   "metric": "OFSE 매출",
   "value": 3.66,
   "unit": "$bn",
   "value_text": "약 $3.66bn",
   "compare": "",
   "kind": "실적",
   "definition": "OFSE는 유전서비스·장비 부문이다. 기업 카드 표기: 3,660 백만 달러",
   "group": "OFSE 매출",
   "section": "2.20",
   "derived": false
  },
  {
   "id": "bkr-iet-orders",
   "stage": "유전서비스·장비",
   "company": "Baker Hughes",
   "card": "BKR",
   "period": "3Q26",
   "report_date": "2026-10-28",
   "metric": "IET 수주",
   "value": 5.9,
   "unit": "$bn",
   "value_text": "약 $5.9bn",
   "compare": "",
   "kind": "실적",
   "definition": "IET는 압축기·가스터빈 등을 공급하는 산업·에너지 기술 부문이다. 기업 카드 표기: 5,886 백만 달러",
   "group": "유전서비스 분기 수주",
   "section": "2.20",
   "derived": false
  },
  {
   "id": "bkr-iet-rpo",
   "stage": "유전서비스·장비",
   "company": "Baker Hughes",
   "card": "BKR",
   "period": "3Q26 발표 기준",
   "report_date": "2026-10-28",
   "metric": "IET RPO",
   "value": 39.4,
   "unit": "$bn",
   "value_text": "약 $39.4bn",
   "compare": "",
   "kind": "실적",
   "definition": "RPO는 남은 수행의무이며 분기 수주와 합산하는 값이 아니다. 기업 카드 표기: IET 잔여이행의무 39.4 십억 달러",
   "group": "유전서비스 남은 수행의무(RPO)",
   "section": "2.20",
   "derived": false
  },
  {
   "id": "bkr-lng-equipment-orders",
   "stage": "유전서비스·장비",
   "company": "Baker Hughes",
   "card": "BKR",
   "period": "3Q26",
   "report_date": "2026-10-28",
   "metric": "분기 LNG 장비 수주",
   "value": 1.0,
   "unit": "$bn",
   "value_text": "약 $1.0bn",
   "compare": "",
   "kind": "실적",
   "definition": "IET 수주에 들어 있는 금액이다.",
   "group": "유전서비스 분기 수주",
   "section": "2.20",
   "derived": false
  },
  {
   "id": "aramco-crude-msc",
   "stage": "생산자·통합 메이저",
   "company": "Saudi Aramco",
   "card": "2222",
   "period": "2025년 12월 31일",
   "report_date": "",
   "metric": "원유 MSC",
   "value": 12.0,
   "unit": "m b/d",
   "value_text": "12.0백만 b/d",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "MSC는 maximum sustainable capacity, 최대 지속생산능력이다. 원유 b/d 기준이라 총탄화수소 boe/d 생산량과 단위가 다르다.",
   "group": "생산자 생산능력",
   "section": "2.21",
   "derived": false
  },
  {
   "id": "cop-production",
   "stage": "생산자·통합 메이저",
   "company": "ConocoPhillips",
   "card": "COP",
   "period": "3Q26",
   "report_date": "2026-11-05",
   "metric": "생산량",
   "value": 2.302,
   "unit": "m boe/d",
   "value_text": "2.302m boe/d",
   "compare": "",
   "kind": "실적",
   "definition": "Boe/d에는 가스 환산량이 포함된다. 기업 카드 표기: 총생산 2,302 천 boe/일",
   "group": "생산자 생산량",
   "section": "2.21",
   "derived": false
  },
  {
   "id": "cop-quarterly-capex",
   "stage": "생산자·통합 메이저",
   "company": "ConocoPhillips",
   "card": "COP",
   "period": "3Q26",
   "report_date": "2026-11-05",
   "metric": "분기 자본지출",
   "value": 3.1,
   "unit": "$bn",
   "value_text": "약 $3.1bn",
   "compare": "",
   "kind": "실적",
   "definition": "기존 유정의 감소를 메우는 투자와 생산을 늘리는 투자를 합친 분기 자본지출이다.",
   "group": "생산자 현금흐름·투자",
   "section": "2.21",
   "derived": false
  },
  {
   "id": "cop-operating-cash-flow",
   "stage": "생산자·통합 메이저",
   "company": "ConocoPhillips",
   "card": "COP",
   "period": "3Q26",
   "report_date": "2026-11-05",
   "metric": "영업현금흐름",
   "value": 7.2,
   "unit": "$bn",
   "value_text": "약 $7.2bn",
   "compare": "",
   "kind": "실적",
   "definition": "기업 카드 표기: 7,195 백만 달러",
   "group": "생산자 현금흐름·투자",
   "section": "2.21",
   "derived": false
  },
  {
   "id": "enb-blackcomb-max-capacity",
   "stage": "배관·가스 인프라",
   "company": "Enbridge",
   "card": "ENB",
   "period": "3Q26 발표 기준",
   "report_date": "2026-11-06",
   "metric": "Blackcomb 가스관 최대 능력(가동 개시)",
   "value": 2.5,
   "unit": "Bcf/d",
   "value_text": "2.5 Bcf/d",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "가동을 개시한 가스관의 최대 설계능력이다.",
   "group": "가스관 설비 능력",
   "section": "4.9",
   "derived": false
  },
  {
   "id": "enb-bay-runner-capacity",
   "stage": "배관·가스 인프라",
   "company": "Enbridge",
   "card": "ENB",
   "period": "3Q26 발표 기준",
   "report_date": "2026-11-06",
   "metric": "Bay Runner 가스관 능력(기계적 완공 단계)",
   "value": 2.6,
   "unit": "Bcf/d",
   "value_text": "2.6 Bcf/d",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "기계적 완공 단계의 능력이며 LNG 시설 연결을 준비했다.",
   "group": "가스관 설비 능력",
   "section": "4.9",
   "derived": false
  },
  {
   "id": "kmi-adjusted-ebitda",
   "stage": "배관·가스 인프라",
   "company": "Kinder Morgan",
   "card": "KMI",
   "period": "3Q26",
   "report_date": "2026-10-21",
   "metric": "조정 EBITDA",
   "value": 2.18,
   "unit": "$bn",
   "value_text": "약 $2.18bn",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "회사가 정한 조정 항목을 반영한 이익이다.",
   "group": "배관사 조정 이익",
   "section": "4.10",
   "derived": false
  },
  {
   "id": "kmi-expansion-backlog",
   "stage": "배관·가스 인프라",
   "company": "Kinder Morgan",
   "card": "KMI",
   "period": "3Q26",
   "report_date": "2026-10-21",
   "metric": "확장 프로젝트 잔고",
   "value": 14.4,
   "unit": "$bn",
   "value_text": "약 $14.4bn",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "프로젝트 잔고는 미래 투자액이다.",
   "group": "확장 프로젝트 잔고·분기 변동",
   "section": "4.10",
   "derived": false
  },
  {
   "id": "kmi-projects-added",
   "stage": "배관·가스 인프라",
   "company": "Kinder Morgan",
   "card": "KMI",
   "period": "3Q26",
   "report_date": "2026-10-21",
   "metric": "분기 추가 프로젝트",
   "value": 5.4,
   "unit": "$bn",
   "value_text": "약 $5.4bn",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "분기 중 잔고에 더해진 프로젝트의 금액이며 잔고 약 $14.4bn에 들어 있다. 대형 추가 프로젝트는 천연가스 인프라 중심이다.",
   "group": "확장 프로젝트 잔고·분기 변동",
   "section": "4.10",
   "derived": false
  },
  {
   "id": "kmi-projects-in-service",
   "stage": "배관·가스 인프라",
   "company": "Kinder Morgan",
   "card": "KMI",
   "period": "3Q26",
   "report_date": "2026-10-21",
   "metric": "분기 가동 개시 프로젝트 규모",
   "value": 0.7,
   "unit": "$bn",
   "value_text": "약 $0.7bn",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "분기 중 가동을 개시한 프로젝트의 금액 기준 규모다.",
   "group": "확장 프로젝트 잔고·분기 변동",
   "section": "4.10",
   "derived": false
  },
  {
   "id": "epd-network-volume",
   "stage": "배관·가스 인프라",
   "company": "Enterprise Products",
   "card": "EPD",
   "period": "3Q26",
   "report_date": "2026-10-29",
   "metric": "네트워크 통합 수송량",
   "value": 14.8,
   "unit": "m bbl-equivalent/d",
   "value_text": "14.8m bbl-equivalent/d",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "단위의 m은 백만이다. 통합 수송량에는 다른 유체·구간이 포함된다.",
   "group": "액체 수송·수출 물량",
   "section": "4.11",
   "derived": false
  },
  {
   "id": "epd-marine-liquids-exports",
   "stage": "배관·가스 인프라",
   "company": "Enterprise Products",
   "card": "EPD",
   "period": "3Q26",
   "report_date": "2026-10-29",
   "metric": "해상 터미널 액체 수출",
   "value": 2.5,
   "unit": "m b/d",
   "value_text": "2.5m b/d",
   "compare": "",
   "kind": "실적",
   "definition": "단위의 m은 백만이다.",
   "group": "액체 수송·수출 물량",
   "section": "4.11",
   "derived": false
  },
  {
   "id": "epd-gas-processing-inlet",
   "stage": "배관·가스 인프라",
   "company": "Enterprise Products",
   "card": "EPD",
   "period": "3Q26",
   "report_date": "2026-10-29",
   "metric": "가스 처리 입구 물량",
   "value": 8.5,
   "unit": "Bcf/d",
   "value_text": "8.5 Bcf/d",
   "compare": "",
   "kind": "실적",
   "definition": "가스 처리 시설에 들어온 가스 물량이다. 액체 환산 통합 수송량과 단위가 다르다.",
   "group": "가스 처리 물량",
   "section": "4.11",
   "derived": false
  },
  {
   "id": "epd-permian-gas-processing-inlet",
   "stage": "배관·가스 인프라",
   "company": "Enterprise Products",
   "card": "EPD",
   "period": "3Q26",
   "report_date": "2026-10-29",
   "metric": "Permian 가스 처리 입구 물량",
   "value": 4.6,
   "unit": "Bcf/d",
   "value_text": "4.6 Bcf/d",
   "compare": "",
   "kind": "실적",
   "definition": "Permian 지역의 가스 처리 입구 물량이다. 전체 가스 처리 입구 물량 8.5 Bcf/d와의 포함 관계는 확인되지 않았다.",
   "group": "가스 처리 물량",
   "section": "4.11",
   "derived": false
  },
  {
   "id": "stng-lr2-crude-voyage-share-prior-call",
   "stage": "원유선·제품선",
   "company": "Scorpio Tankers",
   "card": "STNG",
   "period": "이전 콜",
   "report_date": "2026-10-28",
   "metric": "자사 LR2 원유 항차 비중",
   "value": 0.125,
   "unit": "",
   "value_text": "약 1/8",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "자사 LR2의 원유 항차 기준 비중이며 이전 콜의 날짜는 확인되지 않았다.",
   "group": "자사 LR2 원유 항차 비중",
   "section": "5.13",
   "derived": false
  },
  {
   "id": "stng-lr2-crude-voyage-share-3q",
   "stage": "원유선·제품선",
   "company": "Scorpio Tankers",
   "card": "STNG",
   "period": "3Q26",
   "report_date": "2026-10-28",
   "metric": "자사 LR2 원유 항차 비중",
   "value": 0.3333,
   "unit": "",
   "value_text": "약 1/3",
   "compare": "이전 콜 약 1/8",
   "kind": "회사 정의 지표",
   "definition": "자사 LR2의 원유 항차 기준 비중이다. 9월 말 LR2 dirty 운항 약 70%와는 세는 대상이 다르다.",
   "group": "자사 LR2 원유 항차 비중",
   "section": "5.13",
   "derived": false
  },
  {
   "id": "stng-lr2-dirty-share-sep-end",
   "stage": "원유선·제품선",
   "company": "Scorpio Tankers",
   "card": "STNG",
   "period": "2026년 9월 말",
   "report_date": "2026-10-28",
   "metric": "LR2 dirty 운항 비중(경영진 추정·분모 미확정)",
   "value": 70,
   "unit": "%",
   "value_text": "약 70%",
   "compare": "",
   "kind": "경영진 추정",
   "definition": "질의응답에서 나온 경영진 추정이다. 분모·집계 범위가 정의되지 않아 자사 선대 비율인지 세계 비율인지 확정되지 않았다. 자사 LR2 원유 항차 비중 약 1/3과는 세는 대상이 다르다.",
   "group": "LR2 dirty 운항 추정",
   "section": "5.13",
   "derived": false
  },
  {
   "id": "fro-vlcc-spot-tce",
   "stage": "원유선·제품선",
   "company": "Frontline",
   "card": "FRO",
   "period": "2Q26",
   "report_date": "2026-08-28",
   "metric": "VLCC 평균 일일 스팟 TCE",
   "value": 152700,
   "unit": "$/일",
   "value_text": "$152,700/일",
   "compare": "",
   "kind": "실적",
   "definition": "적하→양하 기준 집계다. International Seaways·Scorpio의 3분기와 기간이 다르다.",
   "group": "선종별 스팟 TCE(2Q26·적하→양하 기준)",
   "section": "5.16",
   "derived": false
  },
  {
   "id": "fro-suezmax-spot-tce",
   "stage": "원유선·제품선",
   "company": "Frontline",
   "card": "FRO",
   "period": "2Q26",
   "report_date": "2026-08-28",
   "metric": "Suezmax 평균 일일 스팟 TCE",
   "value": 111500,
   "unit": "$/일",
   "value_text": "$111,500/일·공식 실적발표 기준",
   "compare": "",
   "kind": "실적",
   "definition": "적하→양하 기준 집계다. 공식 실적발표 값이며 콜 전사본의 Suezmax 수치 $111,400과 $100 차이가 있다. International Seaways·Scorpio의 3분기와 기간이 다르다.",
   "group": "선종별 스팟 TCE(2Q26·적하→양하 기준)",
   "section": "5.16",
   "derived": false
  },
  {
   "id": "fro-lr2-aframax-spot-tce",
   "stage": "원유선·제품선",
   "company": "Frontline",
   "card": "FRO",
   "period": "2Q26",
   "report_date": "2026-08-28",
   "metric": "LR2/Aframax 평균 일일 스팟 TCE",
   "value": 92400,
   "unit": "$/일",
   "value_text": "$92,400/일",
   "compare": "",
   "kind": "실적",
   "definition": "적하→양하 기준 집계다. International Seaways·Scorpio의 3분기와 기간이 다르다.",
   "group": "선종별 스팟 TCE(2Q26·적하→양하 기준)",
   "section": "5.16",
   "derived": false
  },
  {
   "id": "insw-blended-spot-tce-prior-year",
   "stage": "원유선·제품선",
   "company": "International Seaways",
   "card": "INSW",
   "period": "3Q25(전년 동기)",
   "report_date": "2026-11-05",
   "metric": "혼합 스팟 TCE",
   "value": 29400,
   "unit": "$/일",
   "value_text": "$29,400/일",
   "compare": "",
   "kind": "실적",
   "definition": "전년 동기 값이다.",
   "group": "선대 혼합 스팟 TCE",
   "section": "5.17",
   "derived": false
  },
  {
   "id": "insw-blended-spot-tce",
   "stage": "원유선·제품선",
   "company": "International Seaways",
   "card": "INSW",
   "period": "3Q26",
   "report_date": "2026-11-05",
   "metric": "혼합 스팟 TCE",
   "value": 67700,
   "unit": "$/일",
   "value_text": "$67,700/일·매출일수 가중",
   "compare": "전년 동기 $29,400/일",
   "kind": "실적",
   "definition": "매출일수 가중 평균이며 원유선과 제품선이 섞인 값이다. 이익공유 포함 VLCC 수익과는 범위가 다른 지표다.",
   "group": "선대 혼합 스팟 TCE",
   "section": "5.17",
   "derived": false
  },
  {
   "id": "insw-crude-tanker-revenue",
   "stage": "원유선·제품선",
   "company": "International Seaways",
   "card": "INSW",
   "period": "3Q26",
   "report_date": "2026-11-05",
   "metric": "원유선 매출",
   "value": 321,
   "unit": "$m",
   "value_text": "약 $321m",
   "compare": "",
   "kind": "실적",
   "definition": "dual-fuel VLCC 이익공유 약 $77m이 들어 있다. 기업 카드 표기: TCE 수익 4.43억달러 중 원유선 3.21억달러",
   "group": "원유선 매출·이익공유",
   "section": "5.17",
   "derived": false
  },
  {
   "id": "insw-dual-fuel-vlcc-profit-share",
   "stage": "원유선·제품선",
   "company": "International Seaways",
   "card": "INSW",
   "period": "3Q26",
   "report_date": "2026-11-05",
   "metric": "dual-fuel VLCC 이익공유",
   "value": 77,
   "unit": "$m",
   "value_text": "약 $77m",
   "compare": "",
   "kind": "실적",
   "definition": "원유선 매출 약 $321m에 들어 있는 금액이다. 이익공유가 들어간 분기 지표를 순수 스팟 운임과 바로 비교하거나 다음 분기에도 같은 값으로 이어 쓰면 계약 차이가 빠진다.",
   "group": "원유선 매출·이익공유",
   "section": "5.17",
   "derived": false
  },
  {
   "id": "insw-vlcc-earnings-incl-profit-share",
   "stage": "원유선·제품선",
   "company": "International Seaways",
   "card": "INSW",
   "period": "3Q26",
   "report_date": "2026-11-05",
   "metric": "스팟·정기용선 합산 VLCC 수익(이익공유 포함)",
   "value": null,
   "unit": "$/일",
   "value_text": "$200,000/일 초과·이익공유 포함",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "스팟과 정기용선을 합산하고 이익공유를 포함한 값이다. 하한만 제시됐고 정확한 값은 제시되지 않았다. 혼합 스팟 TCE와 범위가 다른 지표다.",
   "group": "이익공유 포함 VLCC 수익",
   "section": "5.17",
   "derived": false
  },
  {
   "id": "stng-lr2-pool-spot-tce",
   "stage": "원유선·제품선",
   "company": "Scorpio Tankers",
   "card": "STNG",
   "period": "3Q26",
   "report_date": "2026-10-28",
   "metric": "LR2 pool/spot TCE",
   "value": 72283,
   "unit": "$/일",
   "value_text": "$72,283/일",
   "compare": "",
   "kind": "실적",
   "definition": "2026년 3분기 공식 실적자료의 선종별 TCE이며 pool/spot 운항분만의 값이다. 기업 카드 표기: LR2 TCE 55,184 달러/일. 카드 값에는 pool/spot 한정 표기가 없다.",
   "group": "선종별 pool/spot TCE(3Q26)",
   "section": "5.18",
   "derived": false
  },
  {
   "id": "stng-mr-pool-spot-tce",
   "stage": "원유선·제품선",
   "company": "Scorpio Tankers",
   "card": "STNG",
   "period": "3Q26",
   "report_date": "2026-10-28",
   "metric": "MR pool/spot TCE",
   "value": 31183,
   "unit": "$/일",
   "value_text": "$31,183/일",
   "compare": "",
   "kind": "실적",
   "definition": "2026년 3분기 공식 실적자료의 선종별 TCE이며 pool/spot 운항분만의 값이다. 기업 카드 표기: MR TCE 31,073 달러/일. 카드 값에는 pool/spot 한정 표기가 없다.",
   "group": "선종별 pool/spot TCE(3Q26)",
   "section": "5.18",
   "derived": false
  },
  {
   "id": "stng-handymax-pool-spot-tce",
   "stage": "원유선·제품선",
   "company": "Scorpio Tankers",
   "card": "STNG",
   "period": "3Q26",
   "report_date": "2026-10-28",
   "metric": "Handymax pool/spot TCE",
   "value": 24253,
   "unit": "$/일",
   "value_text": "$24,253/일",
   "compare": "",
   "kind": "실적",
   "definition": "2026년 3분기 공식 실적자료의 선종별 TCE이며 pool/spot 운항분만의 값이다. 기업 카드 표기: Handymax TCE 24,157 달러/일. 카드 값에는 pool/spot 한정 표기가 없다.",
   "group": "선종별 pool/spot TCE(3Q26)",
   "section": "5.18",
   "derived": false
  },
  {
   "id": "vlo-refining-throughput",
   "stage": "정유",
   "company": "Valero",
   "card": "VLO",
   "period": "3Q26",
   "report_date": "2026-10-22",
   "metric": "정유 처리량",
   "value": 3.0,
   "unit": "m b/d",
   "value_text": "약 3.0m b/d",
   "compare": "",
   "kind": "실적",
   "definition": "약 값이다. 기업 카드 표기: 정제 처리량 2,972 천 배럴/일",
   "group": "처리량",
   "section": "8.5",
   "derived": false
  },
  {
   "id": "vlo-refining-cash-opex",
   "stage": "정유",
   "company": "Valero",
   "card": "VLO",
   "period": "3Q26",
   "report_date": "2026-10-22",
   "metric": "정유 현금 운영비",
   "value": 5.03,
   "unit": "$/bbl",
   "value_text": "$5.03/bbl",
   "compare": "",
   "kind": "실적",
   "definition": "원유 구입비·감가상각·이자 등은 들어 있지 않은 배럴당 현금 운영비다.",
   "group": "배럴당 현금 운영비",
   "section": "8.5",
   "derived": false
  },
  {
   "id": "vlo-refining-operating-income",
   "stage": "정유",
   "company": "Valero",
   "card": "VLO",
   "period": "3Q26",
   "report_date": "2026-10-22",
   "metric": "정유 영업이익",
   "value": 8.8,
   "unit": "$bn",
   "value_text": "약 $8.8bn",
   "compare": "",
   "kind": "실적",
   "definition": "정유 부문 영업이익이며 약 값이다. 기업 카드 표기: 정제 부문 영업이익 8,782 백만 달러",
   "group": "정유 부문 영업이익",
   "section": "8.5",
   "derived": false
  },
  {
   "id": "mpc-crude-utilization",
   "stage": "정유",
   "company": "Marathon Petroleum",
   "card": "MPC",
   "period": "3Q26",
   "report_date": "2026-11-03",
   "metric": "원유 설비 가동률",
   "value": 100,
   "unit": "%",
   "value_text": "100%",
   "compare": "",
   "kind": "실적",
   "definition": "원유 설비(원유능력) 기준 가동률이다. 이용률·신뢰도·수율의 정의는 회사마다 다르다.",
   "group": "원유 설비 가동률",
   "section": "8.5",
   "derived": false
  },
  {
   "id": "mpc-total-throughput",
   "stage": "정유",
   "company": "Marathon Petroleum",
   "card": "MPC",
   "period": "3Q26",
   "report_date": "2026-11-03",
   "metric": "총 처리량",
   "value": 3.2,
   "unit": "m b/d",
   "value_text": "약 3.2m b/d",
   "compare": "",
   "kind": "실적",
   "definition": "약 값이다.",
   "group": "처리량",
   "section": "8.5",
   "derived": false
  },
  {
   "id": "mpc-rm-adj-ebitda-per-bbl",
   "stage": "정유",
   "company": "Marathon Petroleum",
   "card": "MPC",
   "period": "3Q26",
   "report_date": "2026-11-03",
   "metric": "R&M 조정 EBITDA/bbl",
   "value": 34.15,
   "unit": "$/bbl",
   "value_text": "$34.15/bbl",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "R&M 조정 EBITDA를 배럴당으로 적은 회사 지표다.",
   "group": "배럴당 조정 EBITDA",
   "section": "8.5",
   "derived": false
  },
  {
   "id": "mpc-refining-capture",
   "stage": "정유",
   "company": "Marathon Petroleum",
   "card": "MPC",
   "period": "3Q26",
   "report_date": "2026-11-03",
   "metric": "Refining capture(Marathon 정의)",
   "value": 93,
   "unit": "%",
   "value_text": "93%",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "Capture는 정유사의 기준 마진 대비 실현 비율이며 회사별 지표 구성이 다를 수 있다. Marathon의 시장지표에는 원료 차등가격·기간구조가 이미 포함되고 부차 제품 마진도 capture에 영향을 준다.",
   "group": "capture",
   "section": "8.5",
   "derived": false
  },
  {
   "id": "psx-refining-utilization",
   "stage": "정유",
   "company": "Phillips 66",
   "card": "PSX",
   "period": "3Q26",
   "report_date": "2026-10-28",
   "metric": "정유 가동률",
   "value": 98,
   "unit": "%",
   "value_text": "98%",
   "compare": "",
   "kind": "실적",
   "definition": "회사가 제시한 정유 가동률이다. 이용률·신뢰도·수율의 정의는 회사마다 다르다.",
   "group": "정유 가동률",
   "section": "8.5",
   "derived": false
  },
  {
   "id": "psx-distillate-yield",
   "stage": "정유",
   "company": "Phillips 66",
   "card": "PSX",
   "period": "3Q26",
   "report_date": "2026-10-28",
   "metric": "중간유분 수율",
   "value": 41,
   "unit": "%",
   "value_text": "41%·분기 기록",
   "compare": "",
   "kind": "실적",
   "definition": "경유만이 아닌 중간유분 전체의 수율이다. 제품 수율과 설비 가동률은 분모가 다르다. 기업 카드 표기: 경유 수율 41%. 카드는 같은 값을 경유 수율이라는 이름으로 싣는다.",
   "group": "수율",
   "section": "8.5",
   "derived": false
  },
  {
   "id": "psx-central-corridor-throughput",
   "stage": "정유",
   "company": "Phillips 66",
   "card": "PSX",
   "period": "3Q26",
   "report_date": "2026-10-28",
   "metric": "Central Corridor 처리 투입",
   "value": 848,
   "unit": "천 b/d",
   "value_text": "848천 b/d",
   "compare": "",
   "kind": "실적",
   "definition": "Central Corridor 처리 투입 값이다. 단위가 천 b/d이며 Valero·Marathon의 회사 처리량(m b/d)과 단위와 범위가 다르다.",
   "group": "Central Corridor 처리 투입",
   "section": "8.5",
   "derived": false
  },
  {
   "id": "psx-4q-utilization-guidance",
   "stage": "정유",
   "company": "Phillips 66",
   "card": "PSX",
   "period": "4분기 가이던스",
   "report_date": "2026-10-28",
   "metric": "4분기 정유 가동률 가이던스",
   "value": null,
   "unit": "%",
   "value_text": "mid-90s %·당시 전망",
   "compare": "",
   "kind": "가이던스",
   "definition": "2026년 10월 28일 발표 당시의 전망이다. 범위 표현이며 수치 하나로 제시되지 않았다.",
   "group": "정유 가동률",
   "section": "8.5",
   "derived": false
  },
  {
   "id": "psx-4q-turnaround-expense-guidance",
   "stage": "정유",
   "company": "Phillips 66",
   "card": "PSX",
   "period": "4분기 가이던스",
   "report_date": "2026-10-28",
   "metric": "4분기 정기보수비 가이던스",
   "value": null,
   "unit": "$m",
   "value_text": "$140m–$170m·당시 전망",
   "compare": "",
   "kind": "가이던스",
   "definition": "2026년 10월 28일 발표 당시의 전망이다. m은 백만 USD다.",
   "group": "정기보수비",
   "section": "8.5",
   "derived": false
  },
  {
   "id": "mos-phosphate-sales-3q25",
   "stage": "비료·화학",
   "company": "Mosaic",
   "card": "MOS",
   "period": "3Q25",
   "report_date": "2026-11-03",
   "metric": "인산비료 판매량",
   "value": 1.6,
   "unit": "백만 metric tonnes",
   "value_text": "1.6백만 metric tonnes",
   "compare": "",
   "kind": "실적",
   "definition": "판매량 기준이다.",
   "group": "인산비료 판매량",
   "section": "9.5",
   "derived": false
  },
  {
   "id": "mos-phosphate-sales-3q26",
   "stage": "비료·화학",
   "company": "Mosaic",
   "card": "MOS",
   "period": "3Q26",
   "report_date": "2026-11-03",
   "metric": "인산비료 판매량",
   "value": 1.4,
   "unit": "백만 metric tonnes",
   "value_text": "1.4백만 metric tonnes",
   "compare": "3Q25 1.6백만 metric tonnes, 전년 대비 −12.5%(두 공시 판매량으로 계산)",
   "kind": "실적",
   "definition": "판매량 기준이다.",
   "group": "인산비료 판매량",
   "section": "9.5",
   "derived": false
  },
  {
   "id": "mos-phosphate-sales-yoy",
   "stage": "비료·화학",
   "company": "Mosaic",
   "card": "MOS",
   "period": "3Q26",
   "report_date": "2026-11-03",
   "metric": "인산비료 판매량 전년 대비 증감률(계산값)",
   "value": -12.5,
   "unit": "%",
   "value_text": "−12.5%",
   "compare": "1.6백만 → 1.4백만 metric tonnes",
   "kind": "실적",
   "definition": "두 공시 판매량으로 계산한 전년 대비 감소율이며 회사가 직접 제시한 비율인지는 확인되지 않았다.",
   "group": "인산비료 판매량 증감률",
   "section": "9.5",
   "derived": true
  },
  {
   "id": "mos-phosphate-idle-fixed-cost-before",
   "stage": "비료·화학",
   "company": "Mosaic",
   "card": "MOS",
   "period": "비교 전(기간 미확인)",
   "report_date": "2026-11-03",
   "metric": "가동중단·정비·미흡수 고정비",
   "value": 42,
   "unit": "$m",
   "value_text": "$42m",
   "compare": "",
   "kind": "실적",
   "definition": "인산 부문의 가동중단·정비·미흡수 고정비를 묶은 값이며 감산해도 남는 비용이다. 두 값이 속한 기간은 확인되지 않았다.",
   "group": "인산 부문 고정비",
   "section": "9.5",
   "derived": false
  },
  {
   "id": "mos-phosphate-idle-fixed-cost-after",
   "stage": "비료·화학",
   "company": "Mosaic",
   "card": "MOS",
   "period": "비교 후(기간 미확인)",
   "report_date": "2026-11-03",
   "metric": "가동중단·정비·미흡수 고정비",
   "value": 77,
   "unit": "$m",
   "value_text": "$77m",
   "compare": "$42m → $77m, +$35m",
   "kind": "실적",
   "definition": "인산 부문의 가동중단·정비·미흡수 고정비를 묶은 값이며 감산해도 남는 비용이다. 두 값이 속한 기간은 확인되지 않았다.",
   "group": "인산 부문 고정비",
   "section": "9.5",
   "derived": false
  },
  {
   "id": "mos-phosphate-idle-fixed-cost-change",
   "stage": "비료·화학",
   "company": "Mosaic",
   "card": "MOS",
   "period": "비교 전후 차이(기간 미확인)",
   "report_date": "2026-11-03",
   "metric": "가동중단·정비·미흡수 고정비 증가분",
   "value": 35,
   "unit": "$m",
   "value_text": "+$35m",
   "compare": "$42m → $77m",
   "kind": "실적",
   "definition": "인산 부문 가동중단·정비·미흡수 고정비의 앞뒤 두 값 차이다. 두 값이 속한 기간은 확인되지 않았다.",
   "group": "인산 부문 고정비 증가분",
   "section": "9.5",
   "derived": false
  },
  {
   "id": "dal-adj-fuel-expense-3q25",
   "stage": "전방 기업",
   "company": "Delta",
   "card": "DAL",
   "period": "3Q25",
   "report_date": "2026-10-09",
   "metric": "조정 연료비",
   "value": 2565,
   "unit": "$m",
   "value_text": "$2,565m",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "조정 연료비는 비GAAP 기준이며 정유사업 효과가 반영된다. m은 백만 USD다.",
   "group": "조정 연료비",
   "section": "10.7",
   "derived": false
  },
  {
   "id": "dal-adj-fuel-expense-3q26",
   "stage": "전방 기업",
   "company": "Delta",
   "card": "DAL",
   "period": "3Q26",
   "report_date": "2026-10-09",
   "metric": "조정 연료비",
   "value": 4143,
   "unit": "$m",
   "value_text": "$4,143m",
   "compare": "전년 $2,565m, 증가액 $1,578m",
   "kind": "회사 정의 지표",
   "definition": "조정 연료비는 비GAAP 기준이며 정유사업 효과가 반영된다. m은 백만 USD다.",
   "group": "조정 연료비",
   "section": "10.7",
   "derived": false
  },
  {
   "id": "dal-adj-fuel-expense-increase",
   "stage": "전방 기업",
   "company": "Delta",
   "card": "DAL",
   "period": "3Q26",
   "report_date": "2026-10-09",
   "metric": "조정 연료비 전년 대비 증가액(비GAAP)",
   "value": 1578,
   "unit": "$m",
   "value_text": "$1,578m",
   "compare": "전년 $2,565m → $4,143m",
   "kind": "회사 정의 지표",
   "definition": "당기와 전년 조정 연료비의 차이와 같다. 비용을 소비자와 기업 사이에 나누기 전의 부담이다. United·UPS의 증가액과 산출 기준이 다르다.",
   "group": "조정 연료비 증가액(비GAAP)",
   "section": "10.7",
   "derived": false
  },
  {
   "id": "dal-fuel-gallons-3q25",
   "stage": "전방 기업",
   "company": "Delta",
   "card": "DAL",
   "period": "3Q25",
   "report_date": "2026-10-09",
   "metric": "연료 사용량",
   "value": 1138,
   "unit": "m갤런",
   "value_text": "1,138m갤런",
   "compare": "",
   "kind": "실적",
   "definition": "분기 연료 사용량이다. m갤런은 백만 갤런이다.",
   "group": "연료 사용량",
   "section": "10.7",
   "derived": false
  },
  {
   "id": "dal-fuel-gallons-3q26",
   "stage": "전방 기업",
   "company": "Delta",
   "card": "DAL",
   "period": "3Q26",
   "report_date": "2026-10-09",
   "metric": "연료 사용량",
   "value": 1146,
   "unit": "m갤런",
   "value_text": "1,146m갤런",
   "compare": "전년 1,138m갤런",
   "kind": "실적",
   "definition": "분기 연료 사용량이다. m갤런은 백만 갤런이다.",
   "group": "연료 사용량",
   "section": "10.7",
   "derived": false
  },
  {
   "id": "dal-adj-fuel-price-3q25",
   "stage": "전방 기업",
   "company": "Delta",
   "card": "DAL",
   "period": "3Q25",
   "report_date": "2026-10-09",
   "metric": "조정 연료단가",
   "value": 2.25,
   "unit": "$/갤런",
   "value_text": "$2.25/갤런",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "조정 연료비 기준의 갤런당 단가다.",
   "group": "조정 연료단가",
   "section": "10.7",
   "derived": false
  },
  {
   "id": "dal-adj-fuel-price-3q26",
   "stage": "전방 기업",
   "company": "Delta",
   "card": "DAL",
   "period": "3Q26",
   "report_date": "2026-10-09",
   "metric": "조정 연료단가",
   "value": 3.61,
   "unit": "$/갤런",
   "value_text": "$3.61/갤런",
   "compare": "전년 $2.25/갤런",
   "kind": "회사 정의 지표",
   "definition": "조정 연료비 기준의 갤런당 단가다.",
   "group": "조정 연료단가",
   "section": "10.7",
   "derived": false
  },
  {
   "id": "dal-total-unit-revenue-yoy",
   "stage": "전방 기업",
   "company": "Delta",
   "card": "DAL",
   "period": "3Q26",
   "report_date": "2026-10-09",
   "metric": "총 단위매출 전년 대비 증가율",
   "value": 15.4,
   "unit": "%",
   "value_text": "+15.4%",
   "compare": "",
   "kind": "실적",
   "definition": "단위매출에는 연료 전가 외에 수요·좌석·노선·고객 구성의 영향도 포함된다.",
   "group": "단위매출",
   "section": "10.7",
   "derived": false
  },
  {
   "id": "ual-fuel-expense-increase",
   "stage": "전방 기업",
   "company": "United",
   "card": "UAL",
   "period": "3Q26",
   "report_date": "2026-10-21",
   "metric": "연료비 전년 대비 증가액(콜 설명·약 값)",
   "value": 1800,
   "unit": "$m",
   "value_text": "약 $1,800m",
   "compare": "",
   "kind": "실적",
   "definition": "콜에서 설명한 약 값이다. 최신 분기공시의 원가 세목과는 별도로 대조하지 않았다. m은 백만 USD다. Delta의 조정 연료비·UPS의 10-Q 값과 산출 기준이 다르다.",
   "group": "연료비 증가액과 회수 산술액",
   "section": "10.7",
   "derived": false
  },
  {
   "id": "ual-fuel-recovery-share",
   "stage": "전방 기업",
   "company": "United",
   "card": "UAL",
   "period": "3Q26",
   "report_date": "2026-10-21",
   "metric": "연료비 증가분 회수율(경영진 설명)",
   "value": 72,
   "unit": "%",
   "value_text": "72%",
   "compare": "",
   "kind": "회사 정의 지표",
   "definition": "경영진이 증가분 가운데 회수했다고 설명한 비율이다.",
   "group": "연료비 회수율",
   "section": "10.7",
   "derived": false
  },
  {
   "id": "ual-fuel-recovered-amount",
   "stage": "전방 기업",
   "company": "United",
   "card": "UAL",
   "period": "3Q26",
   "report_date": "2026-10-21",
   "metric": "회수 대응 산술액(증가액 × 72%)",
   "value": 1296,
   "unit": "$m",
   "value_text": "$1,296m",
   "compare": "약 $1,800m × 72%",
   "kind": "실적",
   "definition": "경영진의 비율에 증가액을 곱한 산술치다.",
   "group": "연료비 증가액과 회수 산술액",
   "section": "10.7",
   "derived": true
  },
  {
   "id": "ual-fuel-unrecovered-amount",
   "stage": "전방 기업",
   "company": "United",
   "card": "UAL",
   "period": "3Q26",
   "report_date": "2026-10-21",
   "metric": "미회수 산술액(증가액 − 회수 대응 산술액)",
   "value": 504,
   "unit": "$m",
   "value_text": "$504m",
   "compare": "약 $1,800m − $1,296m",
   "kind": "실적",
   "definition": "경영진의 비율에 증가액을 곱한 산술치를 증가액에서 뺀 금액이다.",
   "group": "연료비 증가액과 회수 산술액",
   "section": "10.7",
   "derived": true
  },
  {
   "id": "ups-fuel-expense-increase",
   "stage": "전방 기업",
   "company": "UPS",
   "card": "UPS",
   "period": "3Q26",
   "report_date": "2026-11-04",
   "metric": "연료비 증가액(10-Q)",
   "value": 473,
   "unit": "$m",
   "value_text": "$473m",
   "compare": "단가 효과 $532m, 사용량 감소 효과 −$59m",
   "kind": "실적",
   "definition": "2026년 11월 4일 제출 10-Q 기준이다. m은 백만 USD다. 외주 육상운송 원가의 연료 영향 $111m은 이 금액과 별도다. Delta의 조정 연료비·United의 콜 설명 값과 산출 기준이 다르다.",
   "group": "연료비 증가의 분해",
   "section": "10.7",
   "derived": false
  },
  {
   "id": "ups-fuel-price-effect",
   "stage": "전방 기업",
   "company": "UPS",
   "card": "UPS",
   "period": "3Q26",
   "report_date": "2026-11-04",
   "metric": "연료비 단가 효과",
   "value": 532,
   "unit": "$m",
   "value_text": "$532m",
   "compare": "",
   "kind": "실적",
   "definition": "2026년 11월 4일 제출 10-Q 기준이다. 연료비 증가 $473m을 단가 효과와 사용량 감소 효과로 나눈 값 가운데 단가 효과다.",
   "group": "연료비 증가의 분해",
   "section": "10.7",
   "derived": false
  },
  {
   "id": "ups-fuel-volume-effect",
   "stage": "전방 기업",
   "company": "UPS",
   "card": "UPS",
   "period": "3Q26",
   "report_date": "2026-11-04",
   "metric": "연료비 사용량 감소 효과",
   "value": -59,
   "unit": "$m",
   "value_text": "−$59m",
   "compare": "",
   "kind": "실적",
   "definition": "2026년 11월 4일 제출 10-Q 기준이다. 연료비 증가 $473m을 단가 효과와 사용량 감소 효과로 나눈 값 가운데 사용량 감소 효과다.",
   "group": "연료비 증가의 분해",
   "section": "10.7",
   "derived": false
  },
  {
   "id": "ups-purchased-transport-fuel-impact",
   "stage": "전방 기업",
   "company": "UPS",
   "card": "UPS",
   "period": "3Q26",
   "report_date": "2026-11-04",
   "metric": "외주 육상운송 원가의 연료 영향",
   "value": 111,
   "unit": "$m",
   "value_text": "$111m",
   "compare": "",
   "kind": "실적",
   "definition": "2026년 11월 4일 제출 10-Q 기준이다. 자체 연료비 증가 $473m과 별도인 외주 육상운송 원가의 연료 영향이다.",
   "group": "외주 운송의 연료 영향",
   "section": "10.7",
   "derived": false
  },
  {
   "id": "ups-fuel-surcharge-us-domestic",
   "stage": "전방 기업",
   "company": "UPS",
   "card": "UPS",
   "period": "3Q26",
   "report_date": "2026-11-04",
   "metric": "유류할증의 미국 국내 매출 증가율 기여",
   "value": 2.9,
   "unit": "%p",
   "value_text": "2.9%p",
   "compare": "",
   "kind": "실적",
   "definition": "2026년 11월 4일 제출 10-Q 기준이다. 각 사업의 매출 증가율 기여다.",
   "group": "유류할증 기여",
   "section": "10.7",
   "derived": false
  },
  {
   "id": "ups-fuel-surcharge-international",
   "stage": "전방 기업",
   "company": "UPS",
   "card": "UPS",
   "period": "3Q26",
   "report_date": "2026-11-04",
   "metric": "유류할증의 국제 매출 증가율 기여",
   "value": 8.4,
   "unit": "%p",
   "value_text": "8.4%p",
   "compare": "",
   "kind": "실적",
   "definition": "2026년 11월 4일 제출 10-Q 기준이다. 각 사업의 매출 증가율 기여다.",
   "group": "유류할증 기여",
   "section": "10.7",
   "derived": false
  }
 ],
 "notes": [
  {
   "id": "peer-land-pten-sand-standby",
   "stage": "육상 시추",
   "company": "Patterson-UTI",
   "cards": [
    "PTEN"
   ],
   "date": "2026-10-29",
   "dates": {},
   "topic": "육상 피어 비교: 모래 공급·대기료·전동 파쇄",
   "text": "South Texas 광산의 모래 공급 문제로 완결 작업 일정에 공백이 생겼고 4분기 초 해소됐다고 설명했다. 일부 고객은 대기료를 지급했고, 장기 가스공급을 확보한 전동 파쇄 장비에는 수요가 있다고 밝혔다.",
   "caveat": "모래·연료·전력·현장 일정이 완료 가능한 작업량을 제한한다. 대기료는 해당 사례이며 모든 계약 조건으로 일반화하지 않았다.",
   "qa": "6·12·21·23·25",
   "section": "2.13"
  },
  {
   "id": "peer-land-read-together",
   "stage": "육상 시추",
   "company": "ConocoPhillips · Patterson-UTI · Halliburton",
   "cards": [
    "COP",
    "PTEN",
    "HAL"
   ],
   "date": "2026-11-10",
   "dates": {},
   "topic": "육상 피어 비교: 종합",
   "text": "고객의 효율 개선, 일부 완결 서비스의 가격·대기료, 분기 매출 감소가 동시에 나타났다.",
   "caveat": "세 회사 사이의 개별 공급계약은 확인되지 않았다. 경영진 전망을 확정 발주로 계산하지 않았고, 고객의 비용 절감액과 서비스사의 가격 상승분은 작업 종류와 계약 범위가 달라 서로 상계하지 않았다.",
   "qa": "",
   "section": "2.13"
  },
  {
   "id": "peer-land-production-condition",
   "stage": "육상 시추",
   "company": "ConocoPhillips · Patterson-UTI · Halliburton",
   "cards": [
    "COP",
    "PTEN",
    "HAL"
   ],
   "date": "",
   "dates": {},
   "topic": "육상 피어 비교: 생산 반영 조건",
   "text": "모래 공급 복구는 밀렸던 완결 작업을 다시 진행할 조건을 마련했다. 생산량 증가는 유정 완결과 배관 연결을 마친 뒤 확인된다.",
   "caveat": "후속 발표에서 완결 작업이 다시 지연되거나 연결된 유정이 늘지 않으면 장비 수요 개선을 생산 회복으로 연결한 설명을 수정할 수 있다.",
   "qa": "",
   "section": "2.13"
  },
  {
   "id": "peer-land-comparison-set",
   "stage": "육상 시추",
   "company": "ConocoPhillips · Patterson-UTI · Halliburton",
   "cards": [
    "COP",
    "PTEN",
    "HAL"
   ],
   "date": "",
   "dates": {},
   "topic": "육상 피어 비교: 비교군 구성",
   "text": "Patterson-UTI와 Halliburton은 북미 완결 서비스 공급사이고 ConocoPhillips는 이런 서비스를 구매하는 생산자다. 생산사는 지출을 통제하면서도 필요한 작업을 계속 발주할 수 있다.",
   "caveat": "이 비교만으로 세 회사 사이의 개별 거래가 확인되지는 않는다.",
   "qa": "",
   "section": "2.13"
  },
  {
   "id": "hp-business-scope",
   "stage": "육상 시추",
   "company": "H&P",
   "cards": [
    "HP"
   ],
   "date": "",
   "dates": {},
   "topic": "사업 범위(연차보고서 Item 1, 회계연도 종료일 2025년 9월 30일)",
   "text": "북미·해외 육상 시추, 해양 플랫폼 시추·운영, BENTEC 장비 사업이며 리그·승무원과 시추 운영 서비스를 제공한다. 2025년 1월 16일 KCA Deutag 인수로 해외 육상·해양 운영이 편입됐다.",
   "caveat": "미계약·계약 중단 장비, 이동·재가동비, 인수 후 운영 통합을 확인한다. 미국 FlexRig 외에 해외 계약·해양 운영을 별도로 비교하며, 플랫폼 소유자와 현장의 시추 운영사를 나누면 설비투자 부담과 작업 대가의 귀속을 확인할 수 있다.",
   "qa": "",
   "section": "2.16"
  },
  {
   "id": "pten-business-scope",
   "stage": "육상 시추",
   "company": "Patterson-UTI",
   "cards": [
    "PTEN"
   ],
   "date": "",
   "dates": {},
   "topic": "사업 범위(연차보고서 Item 1, 회계연도 종료일 2025년 12월 31일)",
   "text": "Contract Drilling, Completion Services, Drilling Products로 구분한다. 육상 시추 도급, 파쇄·완결, 방향제어·드릴 비트 등 제품·서비스를 제공한다.",
   "caveat": "리그 계약과 파쇄 플릿의 가동·단가가 따로 움직인다. 리그 감소를 전사 작업량 감소로 단정하지 않으며, 시추 도급·파쇄·장비 판매를 같은 단가나 같은 생산능력으로 비교하지 않는다.",
   "qa": "",
   "section": "2.16"
  },
  {
   "id": "hp-data-timing",
   "stage": "육상 시추",
   "company": "H&P",
   "cards": [
    "HP"
   ],
   "date": "2026-08-06",
   "dates": {},
   "topic": "자료 시점",
   "text": "확인한 콜은 2026년 8월 6일이고 분기말은 2026년 6월 30일이다. 다음 회계연도 말 분기 발표는 2026년 11월 18일 예정이며 2026년 11월 7일 현재 반영하지 않았다.",
   "caveat": "다른 회사의 3Q26 수치와 분기가 다르다.",
   "qa": "",
   "section": "2.16"
  },
  {
   "id": "hp-reactivation-automation",
   "stage": "육상 시추",
   "company": "H&P",
   "cards": [
    "HP"
   ],
   "date": "2026-08-06",
   "dates": {},
   "topic": "운영·사업 구분",
   "text": "언급 항목은 북미 리그 재가동·자동화다.",
   "caveat": "플랫폼 운영관리는 드릴십 소유·일당 임대와 다른 계약이다.",
   "qa": "",
   "section": "2.16"
  },
  {
   "id": "hp-cash-flow-link",
   "stage": "육상 시추",
   "company": "H&P",
   "cards": [
    "HP"
   ],
   "date": "2026-08-06",
   "dates": {},
   "topic": "현금흐름 연결",
   "text": "리그를 재가동하면 인력·정비·유지·이동 비용이 먼저 들고 이동·정비 기간에는 유상 작업시간이 준다.",
   "caveat": "가동 대수가 늘어난 뒤 고객에게 받는 작업 대가가 이 비용을 얼마나 충당하는지까지 비교한다.",
   "qa": "",
   "section": "2.16"
  },
  {
   "id": "pten-completion-site-sand",
   "stage": "육상 시추",
   "company": "Patterson-UTI",
   "cards": [
    "PTEN"
   ],
   "date": "2026-10-29",
   "dates": {},
   "topic": "완결 현장: 모래 공급 차질",
   "text": "분기 수치 자료에는 모래·트럭 부족이 작업 효율과 실적을 제한했다고 적혀 있고, 질의응답 상세 설명에서는 광산 공급 부족을 운송 문제와 구분했다. 회사는 광산 공급 문제가 2026년 4분기 초 해소됐다고 밝혔다.",
   "caveat": "두 설명의 표현이 달라 광산 공급과 운송 부족을 중복 확인된 사실로 취급하지 않았다.",
   "qa": "",
   "section": "2.16"
  },
  {
   "id": "pten-supply-discipline",
   "stage": "육상 시추",
   "company": "Patterson-UTI",
   "cards": [
    "PTEN"
   ],
   "date": "2026-10-29",
   "dates": {},
   "topic": "공급 확대 방침",
   "text": "증설보다 가격 회복·투자수익을 우선했다.",
   "caveat": "수요 증가를 장비 순증으로 바로 연결하지 않았다.",
   "qa": "",
   "section": "2.16"
  },
  {
   "id": "pten-follow-up-items",
   "stage": "육상 시추",
   "company": "Patterson-UTI",
   "cards": [
    "PTEN"
   ],
   "date": "2026-10-29",
   "dates": {},
   "topic": "후속 비교 항목",
   "text": "후속 비교 항목은 시추·완결 가격, 유효 펌핑 시간, 재가동 비용, 자본지출이다.",
   "caveat": "장비 출력과 현장에서 수행한 작업량을 나눠 비교한다.",
   "qa": "",
   "section": "2.16"
  },
  {
   "id": "peer-offshore-rig-cold-stack",
   "stage": "해양 시추·FPSO",
   "company": "Transocean",
   "cards": [
    "RIG"
   ],
   "date": "2026-11-03",
   "dates": {},
   "topic": "해양 피어 비교: cold-stacked 리그 재가동 조건",
   "text": "장기 계약과 비용 회수를 확보하지 않은 채 cold-stacked 리그를 먼저 재가동하지 않겠다고 설명했다.",
   "caveat": "공급이 늘기까지 리그 정비·인력·인증, 이동·시추, 완결·해저 연결이 남는다. 리그 운영사이며 NOV·해저장비 회사의 직접 피어로 비교하지 않았다.",
   "qa": "5·6",
   "section": "2.14"
  },
  {
   "id": "peer-offshore-read-together",
   "stage": "해양 시추·FPSO",
   "company": "Transocean · NOV · TechnipFMC · SLB OneSubsea",
   "cards": [
    "RIG",
    "NOV",
    "FTI",
    "SLB"
   ],
   "date": "2026-11-10",
   "dates": {},
   "topic": "해양 피어 비교: 종합",
   "text": "리그 가용성, 장비 주문, 해저시스템 수주, 실제 생산 개시는 확인 시점이 다르다.",
   "caveat": "같은 개발사업이 여러 회사의 수주잔고에 나타날 수 있다. 동일 프로젝트 여부와 참여 범위가 확인되지 않은 수주를 하나의 물량으로 합치지 않았고, 프로젝트별 리그 계약·장비 인도·설치·첫 생산일이 연결되지 않은 부분은 추가 생산 시점이 미확인이다.",
   "qa": "",
   "section": "2.14"
  },
  {
   "id": "peer-offshore-comparison-set",
   "stage": "해양 시추·FPSO",
   "company": "Transocean · NOV · TechnipFMC · SLB OneSubsea",
   "cards": [
    "RIG",
    "NOV",
    "FTI",
    "SLB"
   ],
   "date": "",
   "dates": {},
   "topic": "해양 피어 비교: 비교군 구성",
   "text": "Transocean의 리그 계약, NOV의 장비 발주, TechnipFMC와 SLB OneSubsea의 해저장비 수주는 서로 다른 작업 단계의 기록이다. 해저 생산시스템 비교에서는 TechnipFMC와 SLB OneSubsea를 같은 제품군으로 묶었다.",
   "caveat": "NOV 전체와 Transocean 전체를 그 비교군에 넣거나 회사 전체 수주를 합산하지 않았다. 기존 생산시설에 연결하는 tieback 사업은 새 생산시설 전체를 건설하는 사업과 필요한 공사가 달라 수주 규모만으로 공급 시점을 비교하기 어렵다.",
   "qa": "",
   "section": "2.14"
  },
  {
   "id": "offshore-fleet-basis",
   "stage": "해양 시추·FPSO",
   "company": "Transocean · Valaris",
   "cards": [
    "RIG",
    "VAL"
   ],
   "date": "",
   "dates": {},
   "topic": "연차공시상 리그 구성의 집계 기준",
   "text": "Transocean은 2026년 2월 17일 기준 보유·부분 보유·운영 선대, Valaris는 2026년 2월 20일 기준 자체 보유 선대다. Valaris의 지분법 합작사업 ARO 선대 9기는 그림에서 제외했다.",
   "caveat": "자체 선대와 합작사업 전체 선대를 단순 합산하지 않았다. 운영 가능·계약 중·휴지 장비를 모두 즉시 투입 가능한 공급능력으로 읽지 않으며, 합병 후 선대의 현황과도 다르다.",
   "qa": "",
   "section": "2.17"
  },
  {
   "id": "rig-business-scope",
   "stage": "해양 시추·FPSO",
   "company": "Transocean",
   "cards": [
    "RIG"
   ],
   "date": "",
   "dates": {},
   "topic": "영업 범위와 현금흐름(회계 2025년 연차보고서 Item 1·1A)",
   "text": "초심해 드릴십·혹한 환경 반잠수식 중심의 단일 시추 부문이며 매출은 계약 데이레이트와 유상 작업일수에서 나온다.",
   "caveat": "휴지 장비 복귀비·장기 대기·고객 취소·조기 종료·부채·투자 부담을 확인한다. 계약 잔고는 미래 매출이며 보장된 이익이나 현재 현금과 다르다.",
   "qa": "",
   "section": "2.17"
  },
  {
   "id": "val-business-scope",
   "stage": "해양 시추·FPSO",
   "company": "Valaris",
   "cards": [
    "VAL"
   ],
   "date": "",
   "dates": {},
   "topic": "영업 범위와 현금흐름(회계 2025년 연차보고서 Item 1)",
   "text": "드릴십·반잠수식·잭업과 별도 ARO 합작사업이다. 합작사업 수익은 자체 리그의 연결 매출과 별도다.",
   "caveat": "심해·천해 수요를 구분한다. 재가동·정비·동원비·계약 시작·합작사업 자금과 이익 배분을 확인한다.",
   "qa": "",
   "section": "2.17"
  },
  {
   "id": "rig-revenue-recognition-lag",
   "stage": "해양 시추·FPSO",
   "company": "Transocean",
   "cards": [
    "RIG"
   ],
   "date": "2026-11-03",
   "dates": {},
   "topic": "매출 반영",
   "text": "고사양 계약 커버리지 확대는 단기 유가 노출을 낮춘다. 신규 계약 단가는 기존 계약 종료 후 새 계약으로 작업할 때 평균 매출에 반영된다.",
   "caveat": "기존 계약의 평균 일일 매출은 신규 계약 데이레이트와 다르고, uptime도 전체 보유선대의 시장 가동률과 다르다. 새로 체결한 높은 단가가 모든 리그의 매출에 즉시 적용되지는 않는다.",
   "qa": "",
   "section": "2.17"
  },
  {
   "id": "rig-cash-flow",
   "stage": "해양 시추·FPSO",
   "company": "Transocean",
   "cards": [
    "RIG"
   ],
   "date": "2026-11-03",
   "dates": {},
   "topic": "현금흐름",
   "text": "높은 계약 커버리지로 추가 단기 작업 여지는 제한된다.",
   "caveat": "비용 절감과 가동·정비·이자비용 이후 현금흐름을 비교한다.",
   "qa": "",
   "section": "2.17"
  },
  {
   "id": "val-no-earnings-call",
   "stage": "해양 시추·FPSO",
   "company": "Valaris",
   "cards": [
    "VAL"
   ],
   "date": "2026-11-02",
   "dates": {},
   "topic": "정기 어닝콜 미개최",
   "text": "Transocean 합병 진행으로 정기 어닝콜을 열지 않는다고 공지했다. 근거는 공식 실적발표 자료다.",
   "caveat": "이번 분기의 미개최 콜에 질의응답을 붙이거나 과거 콜로 대체하지 않았다. 자료 확인일은 2026년 11월 7일이다.",
   "qa": "",
   "section": "2.17"
  },
  {
   "id": "val-drillship-jackup-divergence",
   "stage": "해양 시추·FPSO",
   "company": "Valaris",
   "cards": [
    "VAL"
   ],
   "date": "2026-11-02",
   "dates": {},
   "topic": "선종별 변화",
   "text": "복귀 드릴십의 작업일수·일일 매출은 증가했고 잭업 작업일수는 감소했다. 복귀 비용도 동반됐다.",
   "caveat": "해양 장비를 합계로만 비교하면 드릴십과 잭업의 방향 차이가 사라지므로 장비 유형별 작업일수와 복귀 비용을 함께 표시한다.",
   "qa": "",
   "section": "2.17"
  },
  {
   "id": "rig-val-merger-status",
   "stage": "해양 시추·FPSO",
   "company": "Transocean · Valaris",
   "cards": [
    "RIG",
    "VAL"
   ],
   "date": "2026-11-03",
   "dates": {},
   "topic": "합병 가정과 독립회사 수치",
   "text": "2026년 11월 3일 콜에서 설명한 예상 종결일은 2026년 12월 1일이다. 주주·법원 절차가 남아 있어 2026년 11월 7일 확인 시점에는 미종결 거래로 분류했다.",
   "caveat": "양사 독립 수주잔고와 합병 가정 수주잔고는 더하지 않는다.",
   "qa": "",
   "section": "2.17"
  },
  {
   "id": "sbm-revenue-structure",
   "stage": "해양 시추·FPSO",
   "company": "SBM Offshore",
   "cards": [
    "SBMO"
   ],
   "date": "",
   "dates": {},
   "topic": "수익 구조(Annual Report 2025)",
   "text": "Lease and Operate, Turnkey 사업이다. 자산 판매 후 운영 서비스가 남는 경우도 있다.",
   "caveat": "건조·인도 이익, 임대, 운영보수, 성과·가동 조건을 분리한다.",
   "qa": "",
   "section": "2.18"
  },
  {
   "id": "sbm-lo-revenue-change",
   "stage": "해양 시추·FPSO",
   "company": "SBM Offshore",
   "cards": [
    "SBMO"
   ],
   "date": "",
   "dates": {},
   "topic": "L&O 매출 변화의 이유(Annual Report 2025)",
   "text": "신규 인도·자산 거래·임대 종료 후 O&M 전환 등이 함께 반영됐다.",
   "caveat": "IFRS와 Directional 수치를 서로 다른 회사 매출처럼 합산하지 않는다. FPSO의 신규 가동·매각·임대 종료에 따라 운영 물량과 매출 반영 범위가 달라지므로 같은 기준끼리 비교하고 거래 효과를 분리한다.",
   "qa": "",
   "section": "2.18"
  },
  {
   "id": "peer-land-hal-na-contract-talks",
   "stage": "유전서비스·장비",
   "company": "Halliburton",
   "cards": [
    "HAL"
   ],
   "date": "2026-10-20",
   "dates": {},
   "topic": "육상 피어 비교: 북미 계약 논의·고사양 파쇄 장비",
   "text": "북미 고객의 계약 논의가 늘었고 고사양 파쇄 장비·자동화에 수요가 있다고 설명했다. 북미 매출은 전분기보다 감소했다.",
   "caveat": "미래 계약 논의와 이미 수행한 분기 작업량은 시점이 다르다. 고사양 장비 수요를 북미 모든 장비의 부족으로 확대하지 않았고, 발표발언과 질의응답 중 북미 완결 부문만 비교했다.",
   "qa": "4·6·10",
   "section": "2.13"
  },
  {
   "id": "peer-offshore-nov-long-lead",
   "stage": "유전서비스·장비",
   "company": "NOV",
   "cards": [
    "NOV"
   ],
   "date": "2026-10-28",
   "dates": {},
   "topic": "해양 피어 비교: 장기 납기 장비 발주",
   "text": "장기 납기 장비와 글로벌 프로젝트 수요를 설명했지만 미국 육상과 개별 프로젝트의 발주 시점에는 차이가 있었다.",
   "caveat": "장비 발주·제작·설치·검수가 리그 또는 생산시설 투입보다 앞설 수 있다. 리그·해양 장비 공급자로 비교하며, 회사 전체 주문을 신규 리그 대수로 환산하지 않았다.",
   "qa": "1·2·3",
   "section": "2.14"
  },
  {
   "id": "peer-offshore-fti-subsea",
   "stage": "유전서비스·장비",
   "company": "TechnipFMC",
   "cards": [
    "FTI"
   ],
   "date": "2026-10-29",
   "dates": {},
   "topic": "해양 피어 비교: 해저시스템 실행 물량·MoU",
   "text": "언급 항목은 해저시스템 실행 물량, 장기 계약 기회, bp의 초고압 해저시스템 협력 MoU다.",
   "caveat": "협력 범위 합의, 확정 발주, 제작·설치, 시운전·생산을 구분한다. MoU와 확정 수주는 별도이며, Subsea 부문의 발표발언과 질의응답만 비교했다.",
   "qa": "1·4·13",
   "section": "2.14"
  },
  {
   "id": "peer-offshore-slb-onesubsea",
   "stage": "유전서비스·장비",
   "company": "SLB OneSubsea",
   "cards": [
    "SLB"
   ],
   "date": "2026-10-23",
   "dates": {},
   "topic": "해양 피어 비교: 기수주 해저장비의 매출 전환",
   "text": "언급 항목은 기수주 해저장비의 매출 전환과 신규 프로젝트 기회다.",
   "caveat": "수주잔고는 여러 기간에 걸쳐 제작·인도되고, 인도 후에도 연결·생산 개시가 남는다. SLB Production Systems 안의 해저사업을 비교했으며 SLB 전체와 TechnipFMC 전체의 성장률 비교는 제외했다.",
   "qa": "8",
   "section": "2.14"
  },
  {
   "id": "slb-business-scope",
   "stage": "유전서비스·장비",
   "company": "SLB",
   "cards": [
    "SLB"
   ],
   "date": "",
   "dates": {},
   "topic": "사업 범위(연차보고서 Item 1, 회계연도 종료일 2025년 12월 31일)",
   "text": "Digital, Reservoir Performance, Well Construction, Production Systems로 구분한다. 생산자의 디지털·저류층·시추·생산 설비 수요에 연결되며 OneSubsea 등 해저시스템을 포함한다.",
   "caveat": "신규 시추, 기존 생산 최적화, 해저장비, 디지털을 분리하며 과거 Digital & Integration 분류를 새 분류에 그대로 연결하지 않는다.",
   "qa": "",
   "section": "2.19"
  },
  {
   "id": "hal-business-scope",
   "stage": "유전서비스·장비",
   "company": "Halliburton",
   "cards": [
    "HAL"
   ],
   "date": "",
   "dates": {},
   "topic": "사업 범위(연차보고서 Item 1, 회계연도 종료일 2025년 12월 31일)",
   "text": "Completion and Production, Drilling and Evaluation으로 구분한다. 파쇄·완결·인공채유·시멘팅·방향제어·평가 등 현장 서비스를 제공한다.",
   "caveat": "북미 완결 작업량·가격과 해외 시추·평가 수요를 나눈다. 전동 파쇄도 전력·정비·고객 계약 조건을 확인한다.",
   "qa": "",
   "section": "2.19"
  },
  {
   "id": "bkr-business-scope",
   "stage": "유전서비스·장비",
   "company": "Baker Hughes",
   "cards": [
    "BKR"
   ],
   "date": "",
   "dates": {},
   "topic": "사업 범위(연차보고서 Item 1, 회계연도 종료일 2025년 12월 31일)",
   "text": "Oilfield Services & Equipment(OFSE), Industrial & Energy Technology(IET)로 구분한다. 유전 서비스·장비와 LNG·가스용 압축기·터빈·산업 장비·서비스를 제공한다.",
   "caveat": "OFSE 현장 수요와 IET 대형 수주·납기·설치 후 서비스를 구분한다.",
   "qa": "",
   "section": "2.19"
  },
  {
   "id": "nov-business-scope",
   "stage": "유전서비스·장비",
   "company": "NOV",
   "cards": [
    "NOV"
   ],
   "date": "",
   "dates": {},
   "topic": "사업 범위(연차보고서 Item 1, 회계연도 종료일 2025년 12월 31일)",
   "text": "Energy Products and Services, Energy Equipment로 구분한다. 도급사·서비스 회사·생산자·조선소에 장비·부품·렌털·서비스를 공급한다.",
   "caveat": "짧은 주기의 소모품·렌털과 긴 주기의 자본장비 수주·인도를 분리한다.",
   "qa": "",
   "section": "2.19"
  },
  {
   "id": "fti-business-scope",
   "stage": "유전서비스·장비",
   "company": "TechnipFMC",
   "cards": [
    "FTI"
   ],
   "date": "",
   "dates": {},
   "topic": "사업 범위(연차보고서 Item 1·1A, 회계연도 종료일 2025년 12월 31일)",
   "text": "Subsea, Surface Technologies로 구분한다. 해저 트리·제어·배관·통합 설치와 육상·천해 유정 장비를 공급한다.",
   "caveat": "수주잔고 증가와 프로젝트 이익을 구분하며 고정가격·원가 초과·시공·고객 일정 위험을 확인한다. 수주는 제작·설치 일정과 원가를 거쳐 매출·이익으로 반영된다.",
   "qa": "",
   "section": "2.19"
  },
  {
   "id": "slb-quarter-background",
   "stage": "유전서비스·장비",
   "company": "SLB",
   "cards": [
    "SLB"
   ],
   "date": "2026-10-23",
   "dates": {},
   "topic": "실적 배경",
   "text": "실적 배경으로 중동 회복과 부문 성장을 들었다. 생산시스템 부문에는 기존 개발 유전의 설비·유지 수요도 들어 있다.",
   "caveat": "부문과 지역은 서로 다른 분해이므로 중동 매출을 부문 매출에 더하지 않는다. 리그 수와 실적의 방향이 달라질 수 있다.",
   "qa": "",
   "section": "2.20"
  },
  {
   "id": "slb-growth-cash-collection",
   "stage": "유전서비스·장비",
   "company": "SLB",
   "cards": [
    "SLB"
   ],
   "date": "2026-10-23",
   "dates": {},
   "topic": "성장·현금 회수",
   "text": "비교 항목은 해저 생산 수주, 납품, 현금 회수 일정이다.",
   "caveat": "유기적 성장과 인수 효과를 분리하고 해당 분기의 인수 효과도 별도로 비교한다. 리그 증가율을 전사 성장률로 적용하지 않는다.",
   "qa": "",
   "section": "2.20"
  },
  {
   "id": "hal-equipment-investment",
   "stage": "유전서비스·장비",
   "company": "Halliburton",
   "cards": [
    "HAL"
   ],
   "date": "2026-10-20",
   "dates": {},
   "topic": "장비 투자 구분",
   "text": "가스 사용·전동화 전환은 기존 장비 대체일 수 있다.",
   "caveat": "펌핑 출력의 순증과 구분한다.",
   "qa": "",
   "section": "2.20"
  },
  {
   "id": "hal-regional-divergence",
   "stage": "유전서비스·장비",
   "company": "Halliburton",
   "cards": [
    "HAL"
   ],
   "date": "2026-10-20",
   "dates": {},
   "topic": "지역별 실행",
   "text": "이 분기에는 북미 매출이 전년 대비 줄고 국제 매출은 늘어 두 지역의 방향이 달랐다.",
   "caveat": "매출 증가율에는 가격·활동량·제품 및 서비스 구성이 모두 반영된다. 지역 매출 성장률과 전사 마진 개선 속도는 다를 수 있다.",
   "qa": "",
   "section": "2.20"
  },
  {
   "id": "bkr-different-lead-times",
   "stage": "유전서비스·장비",
   "company": "Baker Hughes",
   "cards": [
    "BKR"
   ],
   "date": "2026-10-28",
   "dates": {},
   "topic": "서로 다른 납기",
   "text": "현장 서비스(OFSE)와 가스 인프라 장비(IET)는 대금을 받는 일정이 다르다.",
   "caveat": "압축기·가스터빈 수주를 같은 분기 원유 공급 증가로 계산하지 않는다. RPO는 남은 수행의무이며 분기 매출이나 원유 생산능력과 다르다.",
   "qa": "",
   "section": "2.20"
  },
  {
   "id": "bkr-revenue-cash-conversion",
   "stage": "유전서비스·장비",
   "company": "Baker Hughes",
   "cards": [
    "BKR"
   ],
   "date": "2026-10-28",
   "dates": {},
   "topic": "매출·현금 전환",
   "text": "장비 수주는 착수금·제작·납품을 거쳐 매출에 반영된다.",
   "caveat": "인수 연결 범위, 수주 취소, 착수금, 납품, 서비스 매출 전환 일정을 확인한다.",
   "qa": "",
   "section": "2.20"
  },
  {
   "id": "peer-land-cop-permian-efficiency",
   "stage": "생산자·통합 메이저",
   "company": "ConocoPhillips",
   "cards": [
    "COP"
   ],
   "date": "2026-11-05",
   "dates": {},
   "topic": "육상 피어 비교: 퍼미안 비용·설비투자",
   "text": "퍼미안에서 자원 투입과 작업 방식 개선으로 비용을 줄였다고 설명했다. 미국 Lower 48 설비투자 증가를 제한하면서 생산 성장을 추진했다.",
   "caveat": "생산 예산이 크게 늘지 않아도 작업 효율과 완결 일정에 따라 서비스 발주가 유지될 수 있다. 회사 전체 생산량에는 다른 지역·가스도 포함된다. 3Q26 발표발언도 함께 비교했다.",
   "qa": "3·6",
   "section": "2.13"
  },
  {
   "id": "cop-business-scope",
   "stage": "생산자·통합 메이저",
   "company": "ConocoPhillips",
   "cards": [
    "COP"
   ],
   "date": "",
   "dates": {},
   "topic": "사업 구성(2025년 연차공시)",
   "text": "독립 E&P다. 북미 비전통, 전통 육상·해양, 오일샌드·LNG 포트폴리오를 운영한다.",
   "caveat": "원유·NGL·가스별 실현가격, 순생산량, 운영비·개발투자를 비교한다. 정유 크랙을 생산자 이익 지표로 쓰지 않으며 boe와 원유 bbl, 총생산과 지분생산을 구분한다.",
   "qa": "",
   "section": "2.21"
  },
  {
   "id": "xom-business-scope",
   "stage": "생산자·통합 메이저",
   "company": "ExxonMobil",
   "cards": [
    "XOM"
   ],
   "date": "",
   "dates": {},
   "topic": "사업 구성(2025년 연차공시)",
   "text": "Upstream, Energy Products, Chemical Products, Specialty Products다.",
   "caveat": "생산·정유·화학·특수제품별 손익·투자를 나눈다. 유가 상승의 업스트림 효과와 정유·화학 원가·수요 효과를 각각 확인한다.",
   "qa": "",
   "section": "2.21"
  },
  {
   "id": "cvx-business-scope",
   "stage": "생산자·통합 메이저",
   "company": "Chevron",
   "cards": [
    "CVX"
   ],
   "date": "",
   "dates": {},
   "topic": "사업 구성(2025년 연차공시)",
   "text": "Upstream과 Downstream이며 회계 2025년에는 Hess 인수가 반영됐다.",
   "caveat": "생산 증가 중 인수 효과와 기존 자산 증가를 구분한다. 정유·판매·화학 투자와 합작사업 지분을 확인하고, 같은 자산을 다른 회사와 중복 합산하지 않는다.",
   "qa": "",
   "section": "2.21"
  },
  {
   "id": "aramco-business-scope",
   "stage": "생산자·통합 메이저",
   "company": "Saudi Aramco",
   "cards": [
    "2222"
   ],
   "date": "",
   "dates": {},
   "topic": "사업 구성(Aramco Annual Report 2025)",
   "text": "생산·수송·정유·화학 통합 사업이다.",
   "caveat": "실제 원유 생산과 최대 지속생산능력, 국내·해외 다운스트림 지분을 구분한다. 원유 b/d에서 총탄화수소 boe/d를 빼 여유능력을 계산하지 않는다.",
   "qa": "",
   "section": "2.21"
  },
  {
   "id": "producers-oil-price-exposure",
   "stage": "생산자·통합 메이저",
   "company": "ConocoPhillips · ExxonMobil · Chevron · Saudi Aramco",
   "cards": [
    "COP",
    "XOM",
    "CVX",
    "2222"
   ],
   "date": "",
   "dates": {},
   "topic": "독립 생산자와 통합 메이저의 유가 노출",
   "text": "독립 생산자는 생산 사업의 유가 영향을 받고, 통합 메이저에는 정유·화학 등 다른 사업의 영향도 들어간다.",
   "caveat": "매장량은 땅속 자원, 생산능력은 가능한 유량, 실제 생산은 해당 기간에 나온 물량이다.",
   "qa": "",
   "section": "2.21"
  },
  {
   "id": "cop-maintenance-new-projects",
   "stage": "생산자·통합 메이저",
   "company": "ConocoPhillips",
   "cards": [
    "COP"
   ],
   "date": "2026-11-05",
   "dates": {},
   "topic": "유지·신규 프로젝트",
   "text": "언급 항목은 Lower 48 완결 효율, Surmont 패드, Willow 공정 진행이다.",
   "caveat": "유지투자와 성장투자, 생산 가이던스 이행, 신규 생산의 기존정 감소 상쇄를 구분한다. 공정률을 현재 생산능력으로 계산하지 않는다.",
   "qa": "",
   "section": "2.21"
  },
  {
   "id": "cop-equipment-to-production",
   "stage": "생산자·통합 메이저",
   "company": "ConocoPhillips",
   "cards": [
    "COP"
   ],
   "date": "2026-11-05",
   "dates": {},
   "topic": "장비 주문과 생산 확대",
   "text": "비교 항목은 기존 자산의 완결 효율, 신규 프로젝트 진행, 운영사의 자본 배분·현장 연결 일정, 장비사의 주문·가동 증가다.",
   "caveat": "장비업체의 주문 증가가 실제 원유 공급으로 이어졌는지는 새 유정의 생산과 기존 유정의 감소를 함께 비교해 확인한다.",
   "qa": "",
   "section": "2.21"
  },
  {
   "id": "kmi-gas-demand-contracted-expansion",
   "stage": "배관·가스 인프라",
   "company": "Kinder Morgan",
   "cards": [
    "KMI"
   ],
   "date": "2026-10-21",
   "dates": {},
   "topic": "가스 수송 수요와 계약 기반 증설",
   "text": "언급 항목은 발전·산업·LNG 관련 가스 수송 수요, 장기 계약 기반 증설, Permian 반출 여건이다.",
   "caveat": "생산량이 있어도 처리·수송·수요처 접속이 맞아야 판매할 수 있다. 계약금액은 현재 수송량과 다르다. 배관별 실제 서비스 개시일은 별도 확인 항목이다.",
   "qa": "11·19·21",
   "section": "4.7"
  },
  {
   "id": "enb-gas-transmission-in-service",
   "stage": "배관·가스 인프라",
   "company": "Enbridge",
   "cards": [
    "ENB"
   ],
   "date": "2026-11-06",
   "dates": {},
   "topic": "가스 수송사업 서비스 개시",
   "text": "언급 항목은 분기 중 가스 수송사업의 서비스 개시와 전력·LNG 수요처 관련 투자 진행이다.",
   "caveat": "기계적 완공·서비스 개시·실제 가스 유량을 나눠 읽는다. 수요처 가동 전에 계약만으로 처리 물량을 계산하지 않는다. 원유관·배급사업과 구분했다.",
   "qa": "가스 수송·프로젝트 관련(번호 미기재)",
   "section": "4.7"
  },
  {
   "id": "epd-permian-takeaway-ethane",
   "stage": "배관·가스 인프라",
   "company": "Enterprise Products",
   "cards": [
    "EPD"
   ],
   "date": "2026-10-29",
   "dates": {},
   "topic": "Permian 가스 반출과 에탄 회수",
   "text": "언급 항목은 Permian 가스 반출, 에탄 회수·rejection, 에탄을 분리해 팔거나 판매가스에 남기는 경제성이다.",
   "caveat": "가스관·처리시설·분리시설·수출 터미널은 각각 다른 용량이다. 에탄 회수는 가스와 화학 원료 양쪽 수요에 영향을 준다. 경영진이 언급한 시장 물량을 회사 자체 물량으로 바꾸지 않았다.",
   "qa": "2·16·22",
   "section": "4.7"
  },
  {
   "id": "pipe-read-together",
   "stage": "배관·가스 인프라",
   "company": "Kinder Morgan · Enbridge · Enterprise Products",
   "cards": [
    "KMI",
    "ENB",
    "EPD"
   ],
   "date": "2026-11-10",
   "dates": {},
   "topic": "세 회사 종합",
   "text": "배관사의 수요 전망과 생산지의 낮은 현물가격이 동시에 나타날 수 있다. 장기 계약 증설은 미래 투자계획이며 현재 가용능력에 들어가지 않는다.",
   "caveat": "수송량·가동일이 없는 증설은 계획·진행 단계로 유지했다.",
   "qa": "",
   "section": "4.7"
  },
  {
   "id": "pipe-comparison-scope",
   "stage": "배관·가스 인프라",
   "company": "Kinder Morgan · Enbridge · Enterprise Products",
   "cards": [
    "KMI",
    "ENB",
    "EPD"
   ],
   "date": "",
   "dates": {},
   "topic": "비교 범위",
   "text": "Kinder Morgan과 Enbridge는 가스 수송·저장 사업이, Enterprise Products는 처리·NGL 분리·수출로 이어지는 인접 사업이 비교 대상이다.",
   "caveat": "회사 전체 실적을 동일 사업으로 취급하지 않았다. 배관 운영사는 계약 물량·운임·설비 투입을 보고하므로 가스가격과 배관 회사의 이익이 같은 비율로 움직이지 않을 수 있다.",
   "qa": "",
   "section": "4.7"
  },
  {
   "id": "pipe-basis-discount-check",
   "stage": "배관·가스 인프라",
   "company": "Kinder Morgan · Enbridge · Enterprise Products",
   "cards": [
    "KMI",
    "ENB",
    "EPD"
   ],
   "date": "",
   "dates": {},
   "topic": "생산지 할인과 배관 병목",
   "text": "생산지 할인 축소가 배관 병목 완화를 반영하는지의 확인 지표는 수송량과 수요처 가동이다.",
   "caveat": "발전·LNG 수요처의 착공 발표만 있고 가스 인수가 시작되지 않았다면 현장 반출 여건은 그대로일 수 있다.",
   "qa": "",
   "section": "4.7"
  },
  {
   "id": "enb-mainline-near-capacity",
   "stage": "배관·가스 인프라",
   "company": "Enbridge",
   "cards": [
    "ENB"
   ],
   "date": "2026-11-06",
   "dates": {},
   "topic": "Mainline 운영",
   "text": "Mainline이 능력에 근접해 운영됐다고 경영진이 설명했다.",
   "caveat": "Mainline 물량·요금·하류 투자결정을 확인한다.",
   "qa": "",
   "section": "4.9"
  },
  {
   "id": "enb-flanagan-south-open-season",
   "stage": "배관·가스 인프라",
   "company": "Enbridge",
   "cards": [
    "ENB"
   ],
   "date": "2026-11-06",
   "dates": {},
   "topic": "Flanagan South open season",
   "text": "Flanagan South는 추가 수요 모집인 open season을 완료했다.",
   "caveat": "투자결정·가동과 구분한다.",
   "qa": "",
   "section": "4.9"
  },
  {
   "id": "enb-gas-pipeline-milestones",
   "stage": "배관·가스 인프라",
   "company": "Enbridge",
   "cards": [
    "ENB"
   ],
   "date": "2026-11-06",
   "dates": {},
   "topic": "가스관 진행 단계",
   "text": "Blackcomb 가스관은 가동을 개시했고 최대 능력은 2.5 Bcf/d다. Bay Runner 가스관은 기계적 완공 단계로 능력은 2.6 Bcf/d이며 LNG 시설 연결을 준비했다.",
   "caveat": "최대 설계능력은 실제 수송량과 다르다. 가스관의 기계적 완공을 LNG 수출 전 과정의 가동으로 취급하지 않고, 가스관 수치를 원유 송유능력에 합산하지 않는다.",
   "qa": "",
   "section": "4.9"
  },
  {
   "id": "enb-project-stages",
   "stage": "배관·가스 인프라",
   "company": "Enbridge",
   "cards": [
    "ENB"
   ],
   "date": "2026-11-06",
   "dates": {},
   "topic": "사업 단계와 실적 기여 시점",
   "text": "사업은 수요 모집 → 투자결정 → 공사 완료 → 상업가동·요금 수취로 이어지고 각 단계의 실적 기여 시점은 다르다.",
   "caveat": "원유 집하·수출 연결과 가스관 개시는 별개다.",
   "qa": "",
   "section": "4.9"
  },
  {
   "id": "kmi-investment-demand-source",
   "stage": "배관·가스 인프라",
   "company": "Kinder Morgan",
   "cards": [
    "KMI"
   ],
   "date": "2026-10-21",
   "dates": {},
   "topic": "투자 수요의 출처",
   "text": "대형 추가 프로젝트는 천연가스 인프라 중심이다. 제품관·터미널도 운영하지만 확장 수요는 가스 쪽 비중이 크다.",
   "caveat": "LNG·발전 수요를 정유소 원유 투입과 같은 물량으로 비교하지 않는다. 확장 수요를 원유 운송량 증가로 연결하면 필요한 배관과 고객을 잘못 짚을 수 있다.",
   "qa": "",
   "section": "4.10"
  },
  {
   "id": "kmi-investment-payback",
   "stage": "배관·가스 인프라",
   "company": "Kinder Morgan",
   "cards": [
    "KMI"
   ],
   "date": "2026-10-21",
   "dates": {},
   "topic": "투자 회수 조건",
   "text": "투자 회수의 확인 항목은 계약 수요, 공사·허가·가동 일정, 투자 대비 현금, 자금 조달이다.",
   "caveat": "프로젝트 잔고는 미래 투자액이다. 파이프라인 수송능력이나 이미 인식한 매출과 다르다.",
   "qa": "",
   "section": "4.10"
  },
  {
   "id": "epd-call-demand-contracts",
   "stage": "배관·가스 인프라",
   "company": "Enterprise Products",
   "cards": [
    "EPD"
   ],
   "date": "2026-10-29",
   "dates": {},
   "topic": "콜·질의응답",
   "text": "언급 항목은 Permian 처리·NGL·해상 수출 수요, LPG 터미널 장기 계약, 에탄관 갱신·최적 용도다.",
   "caveat": "",
   "qa": "",
   "section": "4.11"
  },
  {
   "id": "epd-linked-volumes",
   "stage": "배관·가스 인프라",
   "company": "Enterprise Products",
   "cards": [
    "EPD"
   ],
   "date": "2026-10-29",
   "dates": {},
   "topic": "연결 물량",
   "text": "가스 처리·NGL 분리·수출 터미널을 이어 운영한다.",
   "caveat": "처리장 → 분별장 → 배관 → 수출항의 물량 일치와 계약 갱신 조건을 확인한다. 같은 유체를 단계별 신규 공급으로 반복 계산하지 않는다. NGL 계약과 제품별 수요는 원유가격 하나로 설명하기 어렵다.",
   "qa": "",
   "section": "4.11"
  },
  {
   "id": "stng-lr2-crude-voyages",
   "stage": "원유선·제품선",
   "company": "Scorpio Tankers",
   "cards": [
    "STNG"
   ],
   "date": "2026-10-28",
   "dates": {},
   "topic": "LR2의 원유 항차 비중",
   "text": "자사 LR2 원유 항차 비중이 이전 콜의 약 1/8에서 3분기 약 1/3로 증가했다고 설명했다.",
   "caveat": "항차 비중은 선박 대수·DWT·톤마일 비중과 다르다. 후속 확인 자료는 clean/dirty 용도 전환, 선체 세정·검사, 실제 항차일수다.",
   "qa": "1",
   "section": "5.13"
  },
  {
   "id": "stng-lr2-dirty-estimate",
   "stage": "원유선·제품선",
   "company": "Scorpio Tankers",
   "cards": [
    "STNG"
   ],
   "date": "2026-10-28",
   "dates": {},
   "topic": "LR2 dirty 운항 추정(분모 미확정)",
   "text": "9월 말 LR2 약 70%가 dirty 운항이라는 경영진 추정도 제시했다.",
   "caveat": "분모·집계 범위가 명확히 정의되지 않았다. 자사 선대 비율이나 검증된 세계 비율로 확정하지 않았고 세계 제품선 부족량 계산에 쓰지 않았다. 자사 LR2 원유 항차 비중 약 1/3과 같은 대상을 세지 않았으므로 합치거나 서로 대체하지 않는다. 브로커·선대 자료에서 같은 시점과 분모로 재검증하는 항목이다.",
   "qa": "1",
   "section": "5.13"
  },
  {
   "id": "insw-mr-market-drivers",
   "stage": "원유선·제품선",
   "company": "International Seaways",
   "cards": [
    "INSW"
   ],
   "date": "2026-11-05",
   "dates": {},
   "topic": "MR 시황 요인",
   "text": "MR 시황의 요인으로 미국의 높은 정유 가동·USGC 제품 수출, 러시아 정유 차질, 해협 우회를 들었다.",
   "caveat": "높은 운임만으로 현재 해협 통과량·세계 손실량을 계산할 수는 없다. 후속 확인 자료는 미국 걸프 제품 수출, 항로별 항차·대기일수, 제품선 수급이다.",
   "qa": "1",
   "section": "5.13"
  },
  {
   "id": "fro-fleet-categories",
   "stage": "원유선·제품선",
   "company": "Frontline",
   "cards": [
    "FRO"
   ],
   "date": "2026-08-28",
   "dates": {},
   "topic": "선대 구분",
   "text": "장기 용선·제재 선대·활동 선대를 구분해 설명했다.",
   "caveat": "과거 2분기 콜을 현재 운임·제재 선대 숫자의 확정 자료로 쓰지 않았다. 후속 확인 자료는 최근 선대·보험·항만 수용·제재 변경이다.",
   "qa": "2·3",
   "section": "5.13"
  },
  {
   "id": "refiners-freight-buffer",
   "stage": "원유선·제품선",
   "company": "Valero · PBF",
   "cards": [
    "VLO",
    "PBF"
   ],
   "date": "2026-10-22",
   "dates": {
    "Valero": "2026-10-22",
    "PBF": "2026-10-29"
   },
   "topic": "정유사의 운임 부담",
   "text": "자사 용선·원유 조달 거리·배관 접근성이 스팟 운임 급등의 충격을 완화한다고 설명했다.",
   "caveat": "미국 회사의 완충 능력을 아시아 수입 정유사에 적용하지 않았다. 후속 확인 자료는 용선 커버리지, 도입 원유, 목적지별 제품 순수익이다.",
   "qa": "Valero 13 · PBF 10",
   "section": "5.13"
  },
  {
   "id": "ship-delivery-delay-read",
   "stage": "원유선·제품선",
   "company": "Scorpio Tankers · International Seaways",
   "cards": [
    "STNG",
    "INSW"
   ],
   "date": "2026-11-10",
   "dates": {},
   "topic": "선사 수익과 제품 배송 지연",
   "text": "선사의 운임·수익 개선과 소비지 공급 부족은 함께 나타날 수 있다. LR2가 원유를 운송하거나 배가 장거리 항해·항만 대기에 묶이면 미국 정유소가 출하를 늘려도 다음 화물을 실을 시점이 늦어진다.",
   "caveat": "배송 문제의 해소 여부는 제품 도착량과 항차·대기시간이 함께 회복되는지로 판단한다.",
   "qa": "",
   "section": "5.13"
  },
  {
   "id": "stng-longer-destinations",
   "stage": "원유선·제품선",
   "company": "Scorpio Tankers",
   "cards": [
    "STNG"
   ],
   "date": "2026-10-28",
   "dates": {},
   "topic": "제품 화물의 목적지와 운항 지연",
   "text": "제품 화물이 더 먼 목적지로 이동하고 운항 지연·재취급이 선박 시간을 소비한다고 설명했다. 일부 LR2는 원유 운송을 유지했다.",
   "caveat": "정유 출하가 회복돼도 선박 회전이 느리면 즉시 배송 가능한 제품선이 부족할 수 있다. 자사 항차 비중과 시장 선대 운항 용도 추정의 분모를 구분했다.",
   "qa": "1·2·6·8",
   "section": "5.14"
  },
  {
   "id": "insw-usgc-mr-exports",
   "stage": "원유선·제품선",
   "company": "International Seaways",
   "cards": [
    "INSW"
   ],
   "date": "2026-11-05",
   "dates": {},
   "topic": "미국 걸프 MR 수출 화물",
   "text": "미국 정유소의 높은 가동이 미국 걸프 MR 수출 화물을 뒷받침한다고 설명했다. 우회 운항도 수요 요인으로 언급했다.",
   "caveat": "화물의 출발지·목적지·선종을 확인한다. 전체 선대에는 VLCC·Suezmax가 포함되므로 제품선 범위만 비교했다.",
   "qa": "1·3",
   "section": "5.14"
  },
  {
   "id": "psx-time-charter-cover",
   "stage": "원유선·제품선",
   "company": "Phillips 66",
   "cards": [
    "PSX"
   ],
   "date": "2026-10-28",
   "dates": {},
   "topic": "화주의 정기용선 선복",
   "text": "미리 확보한 정기용선 선복과 시장보다 낮은 계약운임이 정유·상업 부문의 비용을 낮춘다고 설명했다.",
   "caveat": "현물운임 상승이 모든 화주 비용에 바로 같은 폭으로 반영되지는 않는다. 계약 만기·갱신 시점이 비용 전이를 바꾼다. Phillips 66과 두 선사 사이의 개별 용선계약은 미확인이다.",
   "qa": "8·19",
   "section": "5.14"
  },
  {
   "id": "ship-read-together",
   "stage": "원유선·제품선",
   "company": "Scorpio Tankers · International Seaways · Phillips 66",
   "cards": [
    "STNG",
    "INSW",
    "PSX"
   ],
   "date": "2026-11-10",
   "dates": {},
   "topic": "세 회사 종합",
   "text": "미국 제품 출하, 장거리·지연 운항, 화주의 기존 운송계약이 함께 작용했다.",
   "caveat": "스팟 운임·기체결 용선료·선주 실현 TCE를 구분했다. 제품별 물량과 실제 항로가 없으면 톤마일 증가분은 미확인이다.",
   "qa": "",
   "section": "5.14"
  },
  {
   "id": "ship-comparison-scope",
   "stage": "원유선·제품선",
   "company": "Scorpio Tankers · International Seaways",
   "cards": [
    "STNG",
    "INSW"
   ],
   "date": "",
   "dates": {},
   "topic": "비교 범위",
   "text": "두 선사는 제품선 사업이 겹치지만 International Seaways에는 원유선도 있다.",
   "caveat": "회사 전체 TCE를 같은 선종의 운임으로 비교하지 않았다.",
   "qa": "",
   "section": "5.14"
  },
  {
   "id": "ship-product-tanker-demand",
   "stage": "원유선·제품선",
   "company": "Scorpio Tankers · International Seaways · Phillips 66",
   "cards": [
    "STNG",
    "INSW",
    "PSX"
   ],
   "date": "",
   "dates": {},
   "topic": "제품선 수요 추정 조건",
   "text": "정유사가 증산해도 제품이 현지에서 소비되면 해상 운송은 늘지 않는다.",
   "caveat": "선박 회전이 빨라지거나 LR2가 제품 운송으로 돌아오면 같은 수출 물량에서도 운임 압력이 완화될 수 있다. 과거의 운항 지연 설명을 이후 운임에 계속 적용하지 않는다.",
   "qa": "",
   "section": "5.14"
  },
  {
   "id": "fro-period-mismatch",
   "stage": "원유선·제품선",
   "company": "Frontline",
   "cards": [
    "FRO"
   ],
   "date": "2026-08-28",
   "dates": {},
   "topic": "기간 차이",
   "text": "Frontline 자료는 2026년 2분기(2Q26)다. International Seaways·Scorpio의 3분기와 기간이 다르다.",
   "caveat": "기간을 맞추지 않은 수익 순위는 만들지 않았다.",
   "qa": "",
   "section": "5.16"
  },
  {
   "id": "fro-tce-basis",
   "stage": "원유선·제품선",
   "company": "Frontline",
   "cards": [
    "FRO"
   ],
   "date": "2026-08-28",
   "dates": {},
   "topic": "집계 방식",
   "text": "평균 일일 스팟 TCE는 적하→양하 기준이다.",
   "caveat": "분기 경계의 공선일수 영향을 확인한다. Suezmax는 공식 실적발표 값 $111,500을 우선했고, 콜 전사본의 $111,400과는 $100 차이가 있어 혼용하지 않았다.",
   "qa": "",
   "section": "5.16"
  },
  {
   "id": "fro-next-results",
   "stage": "원유선·제품선",
   "company": "Frontline",
   "cards": [
    "FRO"
   ],
   "date": "2026-08-28",
   "dates": {},
   "topic": "다음 실적발표",
   "text": "다음 실적발표는 2026년 11월 30일 예정으로 기재돼 있다.",
   "caveat": "작성 당시 미래 일정이다. 기업 카드 표기: 3분기 실적 11월 20일 발표 예정(Yahoo 일정). 위 11월 30일과 날짜가 다르다.",
   "qa": "",
   "section": "5.16"
  },
  {
   "id": "fro-rate-explanation",
   "stage": "원유선·제품선",
   "company": "Frontline",
   "cards": [
    "FRO"
   ],
   "date": "2026-08-28",
   "dates": {},
   "topic": "운임 설명",
   "text": "장거리 대체 조달·환적·유료 대기로 선박 회전이 줄었다고 설명했다.",
   "caveat": "항해가 정상화되면 같은 선대가 더 많은 항차를 수행한다. 선박 수와 실제 사용할 수 있는 운송 여력을 구분한다.",
   "qa": "",
   "section": "5.16"
  },
  {
   "id": "fro-normalization",
   "stage": "원유선·제품선",
   "company": "Frontline",
   "cards": [
    "FRO"
   ],
   "date": "2026-08-28",
   "dates": {},
   "topic": "정상화 조건",
   "text": "우회·대기 해소는 유효선복을 늘릴 수 있다. 비교 항목은 신규 인도·노후선 퇴출·스팟과 정기용선 비중이다.",
   "caveat": "",
   "qa": "",
   "section": "5.16"
  },
  {
   "id": "insw-contract-structure",
   "stage": "원유선·제품선",
   "company": "International Seaways",
   "cards": [
    "INSW"
   ],
   "date": "2026-11-05",
   "dates": {},
   "topic": "계약 구조",
   "text": "일부 계약에는 이익공유가 포함된다.",
   "caveat": "이익공유가 들어간 분기 지표를 순수 스팟 운임과 바로 비교하거나 다음 분기에도 같은 값으로 이어 쓰면 계약 차이가 빠진다.",
   "qa": "",
   "section": "5.17"
  },
  {
   "id": "insw-recurring-earnings",
   "stage": "원유선·제품선",
   "company": "International Seaways",
   "cards": [
    "INSW"
   ],
   "date": "2026-11-05",
   "dates": {},
   "topic": "반복 수익 구분",
   "text": "구분 항목은 선박별 계약, 공선일수, 정기검사·휴항, 매각이익이다.",
   "caveat": "혼합 평균을 선종별 시황으로 사용하지 않는다. 혼합 스팟 TCE와 이익공유 포함 VLCC 수익은 범위가 다른 지표이며 하나의 시장운임으로 취급하지 않는다.",
   "qa": "",
   "section": "5.17"
  },
  {
   "id": "stng-newbuild-vlcc-investment",
   "stage": "원유선·제품선",
   "company": "Scorpio Tankers",
   "cards": [
    "STNG"
   ],
   "date": "2026-10-28",
   "dates": {},
   "topic": "신조·VLCC 투자",
   "text": "제품선 신조 외에 VLCC 직접 매입계약·소수지분 투자도 공지했다.",
   "caveat": "현재 운항 화물, 앞으로 직접 인도될 VLCC, 소수지분 투자는 별도 노출이다. 확보하는 선박과 수익 반영 방식이 다르다. 계약된 미래 인도를 현재 가동선대로 계산하지 않았다.",
   "qa": "",
   "section": "5.18"
  },
  {
   "id": "stng-clean-return",
   "stage": "원유선·제품선",
   "company": "Scorpio Tankers",
   "cards": [
    "STNG"
   ],
   "date": "2026-10-28",
   "dates": {},
   "topic": "제품선 공급",
   "text": "제품선 공급 변수는 신조 인도와 dirty로 이동한 선복의 clean 복귀다.",
   "caveat": "LR2 고수익을 모두 정제제품 수요 증가로 해석하지 않는다.",
   "qa": "",
   "section": "5.18"
  },
  {
   "id": "soil-crude-procurement",
   "stage": "정유",
   "company": "S-OIL",
   "cards": [
    "010950"
   ],
   "date": "2026-11-02",
   "dates": {},
   "topic": "원유 조달: 장기계약·스팟·정부 swap",
   "text": "중동 지정학에 따른 원유 조달·수송 불확실성과 세계 제품 공급 제약에 대해 기존 장기계약, 스팟·대체 원유, 정부 원유 swap을 활용했다.",
   "caveat": "물량별 실제 구매·인도량과 교환유 반납조건은 추가로 필요한 자료다. 정부 swap을 보조금·무상 공급으로 해석하지 않았다. 공식 실적자료 11쪽이다.",
   "qa": "",
   "section": "7.23"
  },
  {
   "id": "soil-routes-sts",
   "stage": "정유",
   "company": "S-OIL",
   "cards": [
    "010950"
   ],
   "date": "2026-11-02",
   "dates": {},
   "topic": "운송: 대체 경로·STS 환적",
   "text": "기존 항로 사용이 제약되자 다양한 운송 경로와 STS 환적을 활용했다.",
   "caveat": "정확한 환적 위치·선박·항차·비용·보험·기간은 해당 슬라이드에 공개되지 않았다. 공식 실적자료 11쪽이다.",
   "qa": "",
   "section": "7.23"
  },
  {
   "id": "soil-process-optimization",
   "stage": "정유",
   "company": "S-OIL",
   "cards": [
    "010950"
   ],
   "date": "2026-11-02",
   "dates": {},
   "topic": "공정: 원유 성상 변화 대응",
   "text": "도입 원유 성상 변화에 맞춰 공정을 최적화했다.",
   "caveat": "장치별 가동률·수율·에너지·수소 비용이 추가로 필요하다. 투입 유지가 동일 마진을 보장하지 않는다. 공식 실적자료 11쪽이다.",
   "qa": "",
   "section": "7.23"
  },
  {
   "id": "soil-base-oil-spread",
   "stage": "정유",
   "company": "S-OIL",
   "cards": [
    "010950"
   ],
   "date": "2026-11-02",
   "dates": {},
   "topic": "기유 공급 제약과 스프레드",
   "text": "중동 생산·물류 제약에 따른 기유 공급 제약 속에서 Group III 중심의 기유 스프레드 강세를 설명했다.",
   "caveat": "기유와 운송 연료의 공급 복구를 구분한다. 원유관 하나로 모든 제품 부족이 해소되지는 않는다. 공식 실적자료 9쪽이다.",
   "qa": "",
   "section": "7.23"
  },
  {
   "id": "soil-confirmation-scope",
   "stage": "정유",
   "company": "S-OIL",
   "cards": [
    "010950"
   ],
   "date": "2026-11-02",
   "dates": {},
   "topic": "확인 범위",
   "text": "공개 콜 항목은 오디오이며, 확인 범위는 공식 PDF와 공개 문서다.",
   "caveat": "음성 질의응답은 확인한 것으로 표시하지 않았다.",
   "qa": "",
   "section": "7.23"
  },
  {
   "id": "ski-export-margin-lubes",
   "stage": "정유",
   "company": "SK이노베이션",
   "cards": [
    "096770"
   ],
   "date": "2026-10-29",
   "dates": {},
   "topic": "제품 수출마진·윤활유",
   "text": "중동 정유 가동 저하와 러시아 경유 수출 제약 속에서 제품 수출마진이 강세였고 윤활유가 호조였다고 설명했다. 국내 안정 공급과 운영 효율로 대응했다고 밝혔다.",
   "caveat": "개별 해외 시설 피해량과 복구일을 확정하는 자료로 쓰지 않는다. 콜 질의응답 전체는 확보하지 못했다. 공식 실적 공지 기준이다.",
   "qa": "",
   "section": "7.23"
  },
  {
   "id": "kr-refiners-price-vs-cost",
   "stage": "정유",
   "company": "",
   "cards": [],
   "date": "",
   "dates": {},
   "topic": "한국 정유사: 제품가격과 조달·운송 원가",
   "text": "다른 지역의 공급 차질은 한국 정유사의 제품 판매가격을 높일 수 있지만 원유 조달비·운임·보험료·공정 조정비도 늘면 가격차가 그대로 이익으로 남지는 않는다.",
   "caveat": "해외 시설 복구가 제품가격에 미치는 영향과 한국 공장의 원료·운송 대응이 원가·가동에 미치는 영향을 나눠 확인한다.",
   "qa": "",
   "section": "7.23"
  },
  {
   "id": "mpc-yield-capture-benchmark",
   "stage": "정유",
   "company": "Marathon Petroleum",
   "cards": [
    "MPC"
   ],
   "date": "2026-11-03",
   "dates": {},
   "topic": "수율 조정과 capture 기준 지표",
   "text": "휘발유·경유·항공유 수율을 조정하고 원유·운송 선택을 활용했다. Capture 기준 지표에는 일부 원유 차등가격과 backwardation이 이미 들어간다고 설명했다.",
   "caveat": "다른 회사의 capture와 같은 분모라고 가정하지 않았다. 원유 차등가격 일부는 이미 기준 지표에 반영되므로 추가 개선분으로 다시 더하지 않았다. 같이 비교하는 항목은 처리량·실제 제품 수율·원유 투입구성·정비 장치·운송계약이다.",
   "qa": "9·14·17",
   "section": "8.4"
  },
  {
   "id": "psx-distillate-procurement",
   "stage": "정유",
   "company": "Phillips 66",
   "cards": [
    "PSX"
   ],
   "date": "2026-10-28",
   "dates": {},
   "topic": "중간유분 생산·조달·정기용선",
   "text": "언급 항목은 중간유분 생산, 후속 공정 개선, 조달·혼합·정기용선의 이점이다. 일부 화학 자산은 별도 물류 제약을 받았다.",
   "caveat": "Marathon과 정유 부문·제품군을 맞추고 NGL·화학·상업 사업은 분리했다. 회사 전체 EBITDA를 정유 공정 효율로 비교하지 않았다.",
   "qa": "8·11·17·19·21",
   "section": "8.4"
  },
  {
   "id": "tankers-refinery-export-link",
   "stage": "정유",
   "company": "Scorpio Tankers · International Seaways",
   "cards": [
    "STNG",
    "INSW"
   ],
   "date": "2026-10-28",
   "dates": {
    "Scorpio Tankers": "2026-10-28",
    "International Seaways": "2026-11-05"
   },
   "topic": "정유 가동과 수출 화물",
   "text": "언급 항목은 정유 가동과 수출 화물의 연결, 우회·지연, 선종 배치다.",
   "caveat": "정유 처리량 증가분 전부를 해상 화물 증가로 계산하지 않았다. 제품 출하가 내수·수출 중 어디로 가는지 비교한다.",
   "qa": "",
   "section": "8.4"
  },
  {
   "id": "refining-read-together",
   "stage": "정유",
   "company": "Marathon Petroleum · Phillips 66",
   "cards": [
    "MPC",
    "PSX"
   ],
   "date": "2026-11-10",
   "dates": {
    "Marathon Petroleum": "2026-11-03",
    "Phillips 66": "2026-10-28"
   },
   "topic": "두 회사 종합",
   "text": "실현이익은 크랙 외에 고도화 공정·수율·원유 조달·운송계약에 좌우된다. 경유·항공유 수율을 늘리면 다른 제품의 생산구성이 바뀐다.",
   "caveat": "개별 정유소의 수율·정비·지표 정의가 없으면 운영 우열은 미확인이다.",
   "qa": "",
   "section": "8.4"
  },
  {
   "id": "refining-comparison-scope",
   "stage": "정유",
   "company": "Marathon Petroleum · Phillips 66",
   "cards": [
    "MPC",
    "PSX"
   ],
   "date": "",
   "dates": {},
   "topic": "비교 범위",
   "text": "두 회사 모두 경유·항공유 생산을 늘릴 수 있는 공정 구성과 원유 조달·운송의 이점이 있다고 설명했다. 두 회사의 시장지표와 capture 산식이 달라 실현율 숫자만으로 운영 우열을 매기기 어렵다.",
   "caveat": "Capture는 정유사의 기준 마진 대비 실현 비율이며 회사별 지표 구성이 다를 수 있다.",
   "qa": "",
   "section": "8.4"
  },
  {
   "id": "refining-crack-vs-profit",
   "stage": "정유",
   "company": "",
   "cards": [],
   "date": "",
   "dates": {},
   "topic": "크랙과 실제 이익, 소비지 재고",
   "text": "경유 크랙이 높아도 후속 공정 정비, 낮은 부산물 가격, 비싼 운임이 실제 이익을 줄일 수 있다.",
   "caveat": "정유사의 제품 판매와 선사의 선적 증가가 함께 확인돼도 소비지 재고가 회복되지 않으면 배송 시차가 남을 수 있다. 재고 회복 없이 정유 가동률만 오른 상황을 소비지의 공급 정상화로 표시하지 않았다.",
   "qa": "",
   "section": "8.4"
  },
  {
   "id": "vlo-benicia-idle",
   "stage": "정유",
   "company": "Valero",
   "cards": [
    "VLO"
   ],
   "date": "2026-10-22",
   "dates": {},
   "topic": "Benicia 유휴 상태",
   "text": "Benicia는 4월 이후 안전한 유휴 상태이며 당시 재가동 계획이 없다고 설명했다.",
   "caveat": "유휴 설비는 재고·인력·정비를 다시 확보해야 가동할 수 있다. 장부상 설비를 즉시 공급으로 계산하지 않았다.",
   "qa": "",
   "section": "8.5"
  },
  {
   "id": "vlo-feedstock-freight",
   "stage": "정유",
   "company": "Valero",
   "cards": [
    "VLO"
   ],
   "date": "2026-10-22",
   "dates": {},
   "topic": "원료 조달과 지역별 운임",
   "text": "언급 항목은 운임·보험·배송 지연에 따른 원유 차등가격 변화, Gulf Coast·유럽·북미 거점별 손익 차이, 배관 접근·정기용선 보유다.",
   "caveat": "배관 접근성과 용선계약은 원유를 공장까지 가져오는 비용에 영향을 준다. 같은 원유·제품 시세에서도 정유소별로 남는 마진이 다를 수 있다.",
   "qa": "",
   "section": "8.5"
  },
  {
   "id": "mpc-refinery-sale",
   "stage": "정유",
   "company": "Marathon Petroleum",
   "cards": [
    "MPC"
   ],
   "date": "2026-11-03",
   "dates": {},
   "topic": "정유소 매각 발표",
   "text": "St. Paul Park·Mandan 및 관련 자산의 매각을 발표했다. 매각 종결 전 발표다.",
   "caveat": "정유소 매각은 운영 주체 변경이며 공장 폐쇄와 구분했다. 소유주 변경·실제 가동 중단·다른 거점 증설은 각각 별개다.",
   "qa": "",
   "section": "8.5"
  },
  {
   "id": "mpc-capture-denominator",
   "stage": "정유",
   "company": "Marathon Petroleum",
   "cards": [
    "MPC"
   ],
   "date": "2026-11-03",
   "dates": {},
   "topic": "Capture의 분모",
   "text": "원료 차등가격·기간구조가 회사 시장지표에 이미 포함된다. 부차 제품 마진도 capture에 영향을 준다.",
   "caveat": "Capture가 낮아졌다고 운영이 악화됐다고 단정할 수 없다. 분모와 부차 제품 마진을 함께 확인한다.",
   "qa": "",
   "section": "8.5"
  },
  {
   "id": "mpc-high-utilization",
   "stage": "정유",
   "company": "Marathon Petroleum",
   "cards": [
    "MPC"
   ],
   "date": "2026-11-03",
   "dates": {},
   "topic": "높은 가동의 배경",
   "text": "높은 가동을 신뢰성 투자·상업 최적화로 설명했다.",
   "caveat": "총 처리량은 원유만의 투입과 다를 수 있다. R&M EBITDA/bbl, 영업이익, 현금 운영비, 이론 크랙도 서로 다른 지표다.",
   "qa": "",
   "section": "8.5"
  },
  {
   "id": "psx-feedstock-access",
   "stage": "정유",
   "company": "Phillips 66",
   "cards": [
    "PSX"
   ],
   "date": "2026-10-28",
   "dates": {},
   "topic": "원료 접근: 캐나다 중질유·배관·계약 운임",
   "text": "캐나다 중질유 차등가격·배관 접근·낮은 계약 운임·중간원료로 후속 장치를 활용했다.",
   "caveat": "할인 원유를 확보해도 이를 처리할 공정과 운송망이 있어야 판매 제품으로 바꿀 수 있다. 원료 가격차만으로 공장 마진을 계산하지 않았다.",
   "qa": "",
   "section": "8.5"
  },
  {
   "id": "psx-supply-conditions",
   "stage": "정유",
   "company": "Phillips 66",
   "cards": [
    "PSX"
   ],
   "date": "2026-10-28",
   "dates": {},
   "topic": "할인 원유 도착 뒤 공정",
   "text": "할인 원유는 도착 뒤 수소·탈황·고도화 처리와 정비·출하를 거친다.",
   "caveat": "제품 수율과 설비 가동률은 분모가 다르다. 중간유분 수율을 경유만의 수율이나 세계 공통 수율로 해석하지 않는다.",
   "qa": "",
   "section": "8.5"
  },
  {
   "id": "refiners-three-company-compare",
   "stage": "정유",
   "company": "Valero · Marathon Petroleum · Phillips 66",
   "cards": [
    "VLO",
    "MPC",
    "PSX"
   ],
   "date": "",
   "dates": {
    "Valero": "2026-10-22",
    "Marathon Petroleum": "2026-11-03",
    "Phillips 66": "2026-10-28"
   },
   "topic": "세 회사 비교",
   "text": "회사별 언급 항목은 Valero가 원료·운송 조건, Marathon이 기준 마진과 capture, Phillips 66이 수율과 통합 물류다.",
   "caveat": "제품 재고와 공정 가동이 회복되면 부족에 따른 가격 프리미엄과 정비 부담도 함께 달라질 수 있다. 한 분기의 높은 실현마진을 이후에도 고정해 사용하지 않는다.",
   "qa": "",
   "section": "8.5"
  },
  {
   "id": "mos-sulfur-curtailment",
   "stage": "비료·화학",
   "company": "Mosaic",
   "cards": [
    "MOS"
   ],
   "date": "2026-11-04",
   "dates": {},
   "topic": "황 제약에 따른 감산",
   "text": "경제적으로 조달 가능한 황의 제약에 따른 감산을 설명했다.",
   "caveat": "판매량은 생산량·설비능력과 다르다. 개별 회사 공시이며 지역 전체 비료 손실량으로 확대하지 않는다.",
   "qa": "",
   "section": "9.5"
  },
  {
   "id": "mos-phosphate-potash-split",
   "stage": "비료·화학",
   "company": "Mosaic",
   "cards": [
    "MOS"
   ],
   "date": "",
   "dates": {},
   "topic": "인산·칼륨·유통의 구분",
   "text": "인산 부문은 황의 가격·물량 제약과 고가 재고의 영향을 받았다. 칼륨 부문의 변수는 이와 별개인 광산 원가와 물량이다.",
   "caveat": "인산의 감산 조건을 칼륨 전체에 적용하지 않는다. 감산 공장별 확정 재개일은 미확인이다.",
   "qa": "",
   "section": "9.5"
  },
  {
   "id": "cf-regional-nitrogen-supply",
   "stage": "비료·화학",
   "company": "CF Industries",
   "cards": [
    "CF"
   ],
   "date": "2026-11-04",
   "dates": {
    "실적자료": "2026-11-04",
    "콜": "2026-11-05"
   },
   "topic": "질소: 지역별 공급 제약",
   "text": "실적자료와 콜에서 질소 공급 제약으로 중동 시설·호르무즈 물류, 유럽의 높은 가스비, Trinidad의 가스 제약을 들었다.",
   "caveat": "지역 공급 전망을 검증된 공장별 손실량으로 사용하지 않는다. 미국 생산·지역 가스비·수출 경로도 따로 비교한다.",
   "qa": "",
   "section": "9.5"
  },
  {
   "id": "ntr-point-lisas-indefinite",
   "stage": "비료·화학",
   "company": "Nutrien",
   "cards": [
    "NTR"
   ],
   "date": "2026-10-05",
   "dates": {},
   "topic": "Point Lisas 무기한 중단",
   "text": "2026년 10월 5일 Point Lisas의 무기한 중단을 발표했다.",
   "caveat": "해당 질소시설의 중단을 회사 전체·칼륨 공급 중단으로 확대하지 않는다. 전체 콜 질의응답은 미확보다.",
   "qa": "",
   "section": "9.5"
  },
  {
   "id": "fert-farm-importer-conditions",
   "stage": "비료·화학",
   "company": "",
   "cards": [],
   "date": "",
   "dates": {},
   "topic": "농가·수입국",
   "text": "가격 외에 신용·외화·살포 시기가 구매와 사용량을 바꿀 수 있다.",
   "caveat": "기업 판매량·농가 도착량·실제 살포량을 구분한다. 미확인 살포 감소율로 수확 손실을 확정하지 않는다.",
   "qa": "",
   "section": "9.5"
  },
  {
   "id": "fert-recovery-sequence",
   "stage": "비료·화학",
   "company": "",
   "cards": [],
   "date": "2026-11-11",
   "dates": {},
   "topic": "회복 시점 변수",
   "text": "회사 현금흐름·비료 출하·농가 원가의 회복 시점 변수는 감산 중에도 남는 고정비, 고가 재고가 빠지는 시간, 농가가 비료를 쓰는 시기다.",
   "caveat": "수치는 2026년 11월 11일 검토 기준의 고정 관측이다.",
   "qa": "",
   "section": "9.5"
  },
  {
   "id": "epd-ethane-recovery-export",
   "stage": "비료·화학",
   "company": "Enterprise Products",
   "cards": [
    "EPD"
   ],
   "date": "2026-10-29",
   "dates": {},
   "topic": "에탄 회수·분리와 수출",
   "text": "언급 항목은 에탄을 회수·분리해 판매하거나 가스에 남기는 선택과 수송·수출 여건이다.",
   "caveat": "배관 통과량과 실제 에탄 회수량은 별도다. 인접 원료 사업이며 Dow·LyondellBasell과 같은 화학 피어로 취급하지 않았다.",
   "qa": "2·16·22",
   "section": "9.6"
  },
  {
   "id": "dow-ethane-demand-storage",
   "stage": "비료·화학",
   "company": "Dow",
   "cards": [
    "DOW"
   ],
   "date": "2026-10-22",
   "dates": {},
   "topic": "에탄 가격과 중동 유도품 설비",
   "text": "에탄 수출과 국내·국제 크래커 수요가 가격에 영향을 줬다고 설명했다. 중동 일부 유도품 설비는 저장·물류 제약으로 가동이 제한됐다. 저장공간·원료·물류 여건은 공정별로 달랐고 미국 걸프의 물류 제약과도 구분됐다.",
   "caveat": "공장·장치별 손실량과 완전 복구일은 미확인이다. 저장공간과 출하가 막히면 손상되지 않은 공정도 가동을 낮출 수 있다. 중동 화학설비의 낮은 가동을 모두 설비 파괴로 설명하면 저장·출하 제약이 빠진다.",
   "qa": "2·10·11·14",
   "section": "9.6"
  },
  {
   "id": "lyb-ethane-cost-advantage",
   "stage": "비료·화학",
   "company": "LyondellBasell",
   "cards": [
    "LYB"
   ],
   "date": "2026-10-30",
   "dates": {},
   "topic": "에탄 원가와 원료 이점",
   "text": "미국 에탄 원가 상승이 단기 마진을 줄일 수 있지만 원료 이점은 유지된다고 설명했다. 미국 분리시설 증설도 전망했다.",
   "caveat": "전망을 이미 가동한 원료 공급으로 세지 않았다. 원가 방향은 Dow의 설명과 겹치지만 제품가격 반영·자산구성·분기 운영은 다르다.",
   "qa": "3",
   "section": "9.6"
  },
  {
   "id": "lyb-port-sales-backhaul",
   "stage": "비료·화학",
   "company": "LyondellBasell",
   "cards": [
    "LYB"
   ],
   "date": "2026-10-30",
   "dates": {},
   "topic": "항만 판매와 backhaul 운송",
   "text": "대부분 항만에서 판매하고 자사 수출에는 backhaul 운송의 이점이 있다고 설명했다.",
   "caveat": "품목별 선종·운임과 Incoterms 조항은 미확인이다. LR2 제품선 운임을 그대로 대입하지 않았다. 제품 도착가격은 원료원가와 별도로 항로 방향·거래조건의 영향을 받는다.",
   "qa": "8",
   "section": "9.6"
  },
  {
   "id": "chem-read-together",
   "stage": "비료·화학",
   "company": "Enterprise Products · Dow · LyondellBasell",
   "cards": [
    "EPD",
    "DOW",
    "LYB"
   ],
   "date": "2026-11-10",
   "dates": {
    "Enterprise Products": "2026-10-29",
    "Dow": "2026-10-22",
    "LyondellBasell": "2026-10-30"
   },
   "topic": "세 회사 종합",
   "text": "가스·NGL 공급자와 화학사가 받는 에탄 가격 상승의 영향은 계약과 가격 전가 조건이 정한다. 전달 순서는 원료가격, 크래커 비용, 유도품 생산, 저장·선적, 고객 구매다.",
   "caveat": "가격 인상 발표와 실제 판매단가·판매량을 구분한다.",
   "qa": "",
   "section": "9.6"
  },
  {
   "id": "chem-comparison-scope",
   "stage": "비료·화학",
   "company": "Dow · LyondellBasell",
   "cards": [
    "DOW",
    "LYB"
   ],
   "date": "",
   "dates": {},
   "topic": "비교 범위",
   "text": "두 회사는 미국 에탄 가격 상승과 석유계 원료 대비 비용 이점을 함께 설명했다. 비교 대상은 미국 올레핀·폴리에틸렌 사업이다.",
   "caveat": "양사의 다른 소재 사업과 유럽·아시아 자산을 묶어 회사 전체 가격·물량을 같은 시장으로 읽지 않았다.",
   "qa": "",
   "section": "9.6"
  },
  {
   "id": "chem-price-vs-feedstock",
   "stage": "비료·화학",
   "company": "",
   "cards": [],
   "date": "",
   "dates": {},
   "topic": "원료비 보전 확인 지표",
   "text": "제품가격 상승이 원료비를 보전했는지의 확인 지표는 판매단가와 물량이다.",
   "caveat": "새 분리시설이 가동되거나 출하 제약이 풀리면 원료·제품 가격차가 바뀔 수 있어, 해당 분기의 가격 이점을 고정적인 마진으로 연장하지 않았다.",
   "qa": "",
   "section": "9.6"
  },
  {
   "id": "lyb-ethane-pass-through",
   "stage": "비료·화학",
   "company": "LyondellBasell",
   "cards": [
    "LYB"
   ],
   "date": "2026-10-30",
   "dates": {},
   "topic": "에탄 원가와 가격 반영",
   "text": "언급 항목은 에탄 가격, 에탄/메탄 상대가격, 원료 선택이다.",
   "caveat": "확인 범위에서 에탄 상승만의 원가 증가액·소비자 전가율은 미확인이다. B2B 화학제품 가격을 CPI에 직접 더하지 않는다.",
   "qa": "",
   "section": "10.7"
  },
  {
   "id": "airlines-jet-fuel-cost",
   "stage": "전방 기업",
   "company": "Delta · United",
   "cards": [
    "DAL",
    "UAL"
   ],
   "date": "2026-10-09",
   "dates": {
    "Delta": "2026-10-09",
    "United": "2026-10-21"
   },
   "topic": "항공유 비용과 운임·좌석 공급",
   "text": "언급 항목은 항공유 비용이 운임·수요·좌석 공급 결정에 미치는 영향이다.",
   "caveat": "항공유 가격 상승분을 곧바로 항공권 인상률로 환산하지 않았다. 제품가격·연료 구매원가·항공 운임의 반영 시점을 비교한다.",
   "qa": "",
   "section": "8.4"
  },
  {
   "id": "dal-fuel-cost-recovery",
   "stage": "전방 기업",
   "company": "Delta",
   "cards": [
    "DAL"
   ],
   "date": "2026-10-09",
   "dates": {},
   "topic": "연료비 보전: 운임·좌석 공급·자체 정유",
   "text": "Delta는 높은 연료비를 운임과 수요·좌석 공급 관리로 보전한다고 설명했다. 자체 정유시설의 이익은 조정 연료비에 반영된다.",
   "caveat": "자체 정유시설 때문에 다른 항공사와 원유 민감도가 같지 않다. 항공유 구매원가, 예약·노선별 가격, 실제 탑승 매출은 반영 시점이 다르다.",
   "qa": "5·14·18",
   "section": "10.4"
  },
  {
   "id": "ual-fuel-cost-recovery",
   "stage": "전방 기업",
   "company": "United",
   "cards": [
    "UAL"
   ],
   "date": "2026-10-21",
   "dates": {},
   "topic": "연료비 회수와 운항 조정",
   "text": "United는 3분기에 증가한 연료비 일부를 회수했고 수익이 낮은 운항을 조정할 수 있다고 밝혔다. 앞으로의 연료 가정에 Brent 선도곡선과 제품 크랙을 사용했다.",
   "caveat": "미래 원가·가격 전가 계획은 전망이다. 회사의 연료 가정은 자체 유가 예측과 구분한다. 항공유에는 원유가격과 제품 가격차가 함께 반영된다.",
   "qa": "7·12·16·17",
   "section": "10.4"
  },
  {
   "id": "ups-revenue-per-piece",
   "stage": "전방 기업",
   "company": "UPS",
   "cards": [
    "UPS"
   ],
   "date": "2026-10-27",
   "dates": {},
   "topic": "건당 매출과 유류할증",
   "text": "건당 매출 증가에는 유류할증 외에 기본요금·고객·서비스 구성도 함께 반영됐다고 설명했다.",
   "caveat": "건당 매출을 물동량 증가나 순수 요금 인상으로 바꾸지 않는다. 경유·항공유 비용, 할증 적용, 청구·매출 인식 순으로 이어지며 고객·서비스 비중 변화도 건당 매출을 바꾼다.",
   "qa": "5",
   "section": "10.4"
  },
  {
   "id": "downstream-read-together",
   "stage": "전방 기업",
   "company": "Delta · United · UPS",
   "cards": [
    "DAL",
    "UAL",
    "UPS"
   ],
   "date": "2026-11-10",
   "dates": {
    "Delta": "2026-10-09",
    "United": "2026-10-21",
    "UPS": "2026-10-27"
   },
   "topic": "세 회사 종합",
   "text": "연료비 상승이 손익에 반영되는 폭과 시점은 계약·예약 시차·수요·자체 정유·할증 구조가 정한다.",
   "caveat": "개별 기업의 비용 회수 설명을 전체 CPI 계수로 사용하지 않는다.",
   "qa": "",
   "section": "10.4"
  },
  {
   "id": "downstream-comparison-scope",
   "stage": "전방 기업",
   "company": "Delta · United · UPS",
   "cards": [
    "DAL",
    "UAL",
    "UPS"
   ],
   "date": "",
   "dates": {},
   "topic": "비교 범위",
   "text": "Delta와 United는 항공사, UPS는 배송업체다. UPS의 유류할증은 항공권과 요금 구조가 다르다.",
   "caveat": "화물·여객 사업을 한 가격전가율로 합치지 않았다. 이미 팔린 항공권의 가격은 항공유가 비싸져도 다시 올릴 수 없다.",
   "qa": "",
   "section": "10.4"
  },
  {
   "id": "downstream-recovery-check",
   "stage": "전방 기업",
   "company": "",
   "cards": [],
   "date": "",
   "dates": {},
   "topic": "비용 회수 확인 지표",
   "text": "운송사의 비용 회수 확인 지표는 요금, 이용량, 서비스 구성, 운송 공급이다.",
   "caveat": "이용량이 줄면서 요금만 오른 경우와 비용 상승을 충분히 회수하지 못한 경우는 후속 공급 결정이 달라진다. 다음 콜의 실제 연료비·단가·물량을 해당 분기 계획과 대조한다.",
   "qa": "",
   "section": "10.4"
  },
  {
   "id": "downstream-measure-scope",
   "stage": "전방 기업",
   "company": "Delta · United · UPS",
   "cards": [
    "DAL",
    "UAL",
    "UPS"
   ],
   "date": "",
   "dates": {},
   "topic": "측정치의 차이",
   "text": "미국 기업의 2026년 3분기 수치이며 금액·회수율·매출 증가율로 측정 기준이 서로 다르다.",
   "caveat": "Delta 조정 연료비는 비GAAP 기준이며 정유사업 효과가 반영된다. United 회수액은 경영진의 비율에 증가액을 곱한 산술치다.",
   "qa": "",
   "section": "10.7"
  },
  {
   "id": "downstream-cpi-link",
   "stage": "전방 기업",
   "company": "",
   "cards": [],
   "date": "",
   "dates": {},
   "topic": "기업 매출과 가계 CPI",
   "text": "연료비 부담이 고객에게 넘어간 정황은 유류할증과 항공사의 회수 설명에서 확인된다.",
   "caveat": "운송회사의 매출에는 기업·해외 고객과 물량 변화가 함께 들어가므로 증가액을 가계 CPI로 그대로 연결할 수 없다. 항공권 CPI가 올랐더라도 연료비 때문인 부분과 수요·좌석 공급·노선 변화 때문인 부분은 따로 추정한다.",
   "qa": "",
   "section": "10.7"
  }
 ],
 "sources": [
  {
   "section": "2.13",
   "company": "ConocoPhillips",
   "title": "ConocoPhillips 3Q26 콜(2026년 11월 5일) 발표발언·질의응답 3·6",
   "url": ""
  },
  {
   "section": "2.13",
   "company": "Patterson-UTI",
   "title": "Patterson-UTI 3Q26 콜(2026년 10월 29일) 질의응답 6·12·21·23·25",
   "url": ""
  },
  {
   "section": "2.13",
   "company": "Halliburton",
   "title": "Halliburton 3Q26 콜(2026년 10월 20일) 발표발언·질의응답 4·6·10",
   "url": ""
  },
  {
   "section": "2.14",
   "company": "Transocean",
   "title": "Transocean 콜(2026년 11월 3일) 질의응답 5·6",
   "url": ""
  },
  {
   "section": "2.14",
   "company": "NOV",
   "title": "NOV 콜(2026년 10월 28일) 질의응답 1·2·3",
   "url": ""
  },
  {
   "section": "2.14",
   "company": "TechnipFMC",
   "title": "TechnipFMC 콜(2026년 10월 29일) Subsea 부문 발표발언·질의응답 1·4·13",
   "url": ""
  },
  {
   "section": "2.14",
   "company": "SLB OneSubsea",
   "title": "SLB 콜(2026년 10월 23일) 질의응답 8",
   "url": ""
  },
  {
   "section": "2.16",
   "company": "H&P",
   "title": "H&P 연차보고서 Item 1(회계연도 종료일 2025년 9월 30일)",
   "url": ""
  },
  {
   "section": "2.16",
   "company": "Patterson-UTI",
   "title": "Patterson-UTI 연차보고서 Item 1(회계연도 종료일 2025년 12월 31일)",
   "url": ""
  },
  {
   "section": "2.16",
   "company": "H&P",
   "title": "H&P 공식 분기 실적: FY2026 Q3",
   "url": "https://www.sec.gov/Archives/edgar/data/46765/000004676526000039/q3fy26earningsrelease.htm"
  },
  {
   "section": "2.16",
   "company": "Patterson-UTI",
   "title": "Patterson-UTI 공식 실적자료: 3Q26",
   "url": "https://www.sec.gov/Archives/edgar/data/889900/000088990026000070/a2026q3earningsreleaseex991.htm"
  },
  {
   "section": "2.17",
   "company": "Transocean",
   "title": "Transocean 회계 2025년 연차보고서 Item 1·Item 1A",
   "url": ""
  },
  {
   "section": "2.17",
   "company": "Valaris",
   "title": "Valaris 회계 2025년 연차보고서 Item 1",
   "url": ""
  },
  {
   "section": "2.17",
   "company": "Transocean",
   "title": "Transocean 공식 실적·콜 안내: 3Q26",
   "url": "https://investor.deepwater.com/news-releases/news-release-details/transocean-ltd-reports-third-quarter-2026-results"
  },
  {
   "section": "2.17",
   "company": "Valaris",
   "title": "Valaris 공식 실적·콜 미개최 공지: 3Q26",
   "url": "https://www.valaris.com/news/news-details/2026/Valaris-Reports-Third-Quarter-2026-Results/default.aspx"
  },
  {
   "section": "2.18",
   "company": "SBM Offshore",
   "title": "SBM Offshore Annual Report 2025: Operations, 177–179, 200–202, 214–219, 228–229쪽",
   "url": ""
  },
  {
   "section": "2.19",
   "company": "SLB",
   "title": "SLB 연차보고서 Item 1(회계연도 종료일 2025년 12월 31일)",
   "url": "https://www.sec.gov/Archives/edgar/data/87347/000119312526021017/slb-20251231.htm"
  },
  {
   "section": "2.19",
   "company": "Halliburton",
   "title": "Halliburton 연차보고서 Item 1(회계연도 종료일 2025년 12월 31일)",
   "url": "https://www.sec.gov/Archives/edgar/data/45012/000004501226000015/hal-20251231.htm"
  },
  {
   "section": "2.19",
   "company": "Baker Hughes",
   "title": "Baker Hughes 연차보고서 Item 1(회계연도 종료일 2025년 12월 31일)",
   "url": "https://www.sec.gov/Archives/edgar/data/1701605/000170160526000007/bkr-20251231.htm"
  },
  {
   "section": "2.19",
   "company": "NOV",
   "title": "NOV 연차보고서 Item 1(회계연도 종료일 2025년 12월 31일)",
   "url": "https://www.sec.gov/Archives/edgar/data/1021860/000119312526048350/nov-20251231.htm"
  },
  {
   "section": "2.19",
   "company": "TechnipFMC",
   "title": "TechnipFMC 연차보고서 Item 1·1A(회계연도 종료일 2025년 12월 31일)",
   "url": "https://www.sec.gov/Archives/edgar/data/1681459/000168145926000010/fti-20251231.htm"
  },
  {
   "section": "2.20",
   "company": "SLB",
   "title": "SLB 실적·콜 원문 자료: 3Q26",
   "url": "https://investorcenter.slb.com/news-releases/news-release-details/slb-announces-third-quarter-2026-results"
  },
  {
   "section": "2.20",
   "company": "Halliburton",
   "title": "Halliburton 공식 실적자료: 3Q26",
   "url": "https://ir.halliburton.com/news-releases/news-release-details/halliburton-announces-third-quarter-2026-results"
  },
  {
   "section": "2.20",
   "company": "Baker Hughes",
   "title": "Baker Hughes 공식 실적자료: 3Q26",
   "url": "https://investors.bakerhughes.com/news/press-releases/news-details/2026/Baker-Hughes-Announces-Third-Quarter-2026-Results/default.aspx"
  },
  {
   "section": "2.21",
   "company": "ConocoPhillips",
   "title": "ConocoPhillips 회계 2025년 연차보고서 Item 1",
   "url": ""
  },
  {
   "section": "2.21",
   "company": "Chevron",
   "title": "Chevron 회계 2025년 연차보고서 Item 1",
   "url": ""
  },
  {
   "section": "2.21",
   "company": "ExxonMobil",
   "title": "ExxonMobil 회계 2025년 연차보고서",
   "url": ""
  },
  {
   "section": "2.21",
   "company": "Saudi Aramco",
   "title": "Aramco Annual Report 2025: Results and performance",
   "url": ""
  },
  {
   "section": "2.21",
   "company": "ConocoPhillips",
   "title": "ConocoPhillips 콜(2026년 11월 5일) 발표발언·질의응답",
   "url": ""
  },
  {
   "section": "2.21",
   "company": "ConocoPhillips",
   "title": "ConocoPhillips 상세 보충자료: 3Q26",
   "url": "https://static.conocophillips.com/files/resources/3q26_supplemental-information.pdf"
  },
  {
   "section": "4.7",
   "company": "Kinder Morgan",
   "title": "Kinder Morgan 콜 · 2026년 10월 21일 (발표발언, 질의응답 11·19·21)",
   "url": ""
  },
  {
   "section": "4.7",
   "company": "Enbridge",
   "title": "Enbridge 콜 · 2026년 11월 6일 (발표발언, 가스 수송·프로젝트 관련 질의응답)",
   "url": ""
  },
  {
   "section": "4.7",
   "company": "Enterprise Products",
   "title": "Enterprise Products 콜 · 2026년 10월 29일 (질의응답 2·16·22)",
   "url": ""
  },
  {
   "section": "4.9",
   "company": "Enbridge",
   "title": "Enbridge 공식 실적자료: 3Q26",
   "url": "https://www.enbridge.com/media-center/news/details?id=123894&lang=en"
  },
  {
   "section": "4.10",
   "company": "Kinder Morgan",
   "title": "Kinder Morgan 공식 실적자료: 3Q26",
   "url": "https://ir.kindermorgan.com/news/news-details/2026/Kinder-Morgan-Reports-Record-Third-Quarter-2026-Financial-Results/default.aspx"
  },
  {
   "section": "4.11",
   "company": "Enterprise Products",
   "title": "Enterprise Products 공식 실적자료: 3Q26",
   "url": "https://ir.enterpriseproducts.com/news-releases/news-release-details/enterprise-reports-third-quarter-2026-earnings"
  },
  {
   "section": "5.13",
   "company": "Scorpio Tankers",
   "title": "Scorpio Tankers 콜 · 2026년 10월 28일 (질의응답 1)",
   "url": ""
  },
  {
   "section": "5.13",
   "company": "International Seaways",
   "title": "International Seaways 콜 · 2026년 11월 5일 (질의응답 1)",
   "url": ""
  },
  {
   "section": "5.13",
   "company": "Frontline",
   "title": "Frontline 콜 · 2026년 8월 28일 (질의응답 2·3)",
   "url": ""
  },
  {
   "section": "5.13",
   "company": "Valero",
   "title": "Valero 콜 · 2026년 10월 22일 (질의응답 13)",
   "url": ""
  },
  {
   "section": "5.13",
   "company": "PBF",
   "title": "PBF 콜 · 2026년 10월 29일 (질의응답 10)",
   "url": ""
  },
  {
   "section": "5.14",
   "company": "Scorpio Tankers",
   "title": "Scorpio Tankers 콜 · 2026년 10월 28일 (질의응답 1·2·6·8)",
   "url": ""
  },
  {
   "section": "5.14",
   "company": "International Seaways",
   "title": "International Seaways 콜 · 2026년 11월 5일 (질의응답 1·3)",
   "url": ""
  },
  {
   "section": "5.14",
   "company": "Phillips 66",
   "title": "Phillips 66 콜 · 2026년 10월 28일 (질의응답 8·19)",
   "url": ""
  },
  {
   "section": "5.16",
   "company": "Frontline",
   "title": "Frontline 공식 실적·선종별 TCE: 2Q26",
   "url": "https://www.frontlineplc.cy/fro-second-quarter-and-six-months-2026-results/"
  },
  {
   "section": "5.17",
   "company": "International Seaways",
   "title": "International Seaways 공식 실적자료: 3Q26",
   "url": "https://www.intlseas.com/newsroom/news/news-details/2026/International-Seaways-Reports-Third-Quarter-2026-Results/default.aspx"
  },
  {
   "section": "5.18",
   "company": "Scorpio Tankers",
   "title": "Scorpio 공식 실적·선종별 TCE·선대 투자: 3Q26",
   "url": "https://www.scorpiotankers.com/scorpio-tankers-inc-announces-financial-results-for-the-third-quarter-of-2026-and-an-increase-to-its-quarterly-dividend/"
  },
  {
   "section": "7.23",
   "company": "S-OIL",
   "title": "S-OIL: 3Q26 공식 발표자료",
   "url": "https://www.s-oil.com/common/page/FileDownload.aspx?FileName=639292304771563502.pdf&PIndex=23&PathType=BOARD&TFileName=3Q26+Earnings+Release+%28Eng%29.pdf"
  },
  {
   "section": "7.23",
   "company": "SK이노베이션",
   "title": "SK이노베이션: 3Q26 공식 실적 공지",
   "url": "https://askinno.com/archives/172439"
  },
  {
   "section": "8.4",
   "company": "Marathon Petroleum",
   "title": "Marathon Petroleum 콜 · 2026년 11월 3일 (질의응답 9·14·17)",
   "url": ""
  },
  {
   "section": "8.4",
   "company": "Phillips 66",
   "title": "Phillips 66 콜 · 2026년 10월 28일 (질의응답 8·11·17·19·21)",
   "url": ""
  },
  {
   "section": "8.4",
   "company": "Scorpio Tankers",
   "title": "Scorpio Tankers 콜 · 2026년 10월 28일",
   "url": ""
  },
  {
   "section": "8.4",
   "company": "International Seaways",
   "title": "International Seaways 콜 · 2026년 11월 5일",
   "url": ""
  },
  {
   "section": "8.4",
   "company": "Delta",
   "title": "Delta 콜 · 2026년 10월 9일",
   "url": ""
  },
  {
   "section": "8.4",
   "company": "United",
   "title": "United 콜 · 2026년 10월 21일",
   "url": ""
  },
  {
   "section": "8.5",
   "company": "Valero",
   "title": "Valero 3Q26 공식 실적자료",
   "url": "https://investorvalero.com/news/news-details/2026/Valero-Energy-Reports-Third-Quarter-2026-Results/default.aspx"
  },
  {
   "section": "8.5",
   "company": "Marathon Petroleum",
   "title": "Marathon Petroleum 3Q26 공식 실적자료",
   "url": "https://ir.marathonpetroleum.com/investor/news-releases/news-details/2026/Marathon-Petroleum-Corp--Reports-Third-Quarter-2026-Results/default.aspx"
  },
  {
   "section": "8.5",
   "company": "Phillips 66",
   "title": "Phillips 66 3Q26 공식 실적·보충자료",
   "url": "https://investor.phillips66.com/financial-information/news-releases/news-release-details/2026/Phillips-66-Reports-Third-Quarter-Results-Delivers-98-Refining-Utilization-and-Strong-Midstream-Volumes/default.aspx"
  },
  {
   "section": "9.5",
   "company": "Mosaic",
   "title": "Mosaic: 판매량·고정비·황·재고 시차",
   "url": "https://www.sec.gov/Archives/edgar/data/1285785/000128578526000139/pressreleaseq32026-ex991.htm"
  },
  {
   "section": "9.5",
   "company": "CF Industries",
   "title": "CF Industries: 2026년 9개월 실적과 지역별 공급",
   "url": "https://ir.cfindustries.com/Investors/news/news-details/2026/CF-Industries-Holdings-Inc--Reports-First-Nine-Months-2026-Net-Earnings-of-1-78-Billion-Adjusted-EBITDA-of-3-01-Billion/default.aspx"
  },
  {
   "section": "9.5",
   "company": "Nutrien",
   "title": "Nutrien: 3Q26 공식 결과(콜 질의응답 검토 완료로 표시하지 않음)",
   "url": "https://www.nutrien.com/news/press-releases/nutrien-reports-third-quarter-2026-results-1761"
  },
  {
   "section": "9.6",
   "company": "Enterprise Products",
   "title": "Enterprise Products 콜 · 2026년 10월 29일 (질의응답 2·16·22)",
   "url": ""
  },
  {
   "section": "9.6",
   "company": "Dow",
   "title": "Dow 콜 · 2026년 10월 22일 (질의응답 2·10·11·14)",
   "url": ""
  },
  {
   "section": "9.6",
   "company": "LyondellBasell",
   "title": "LyondellBasell 콜 · 2026년 10월 30일 (질의응답 3·8)",
   "url": ""
  },
  {
   "section": "10.4",
   "company": "Delta",
   "title": "Delta 콜 · 2026년 10월 9일 (발표발언, 질의응답 5·14·18)",
   "url": ""
  },
  {
   "section": "10.4",
   "company": "United",
   "title": "United 콜 · 2026년 10월 21일 (발표발언, 질의응답 7·12·16·17)",
   "url": ""
  },
  {
   "section": "10.4",
   "company": "UPS",
   "title": "UPS 콜 · 2026년 10월 27일 (발표발언, 질의응답 5)",
   "url": ""
  },
  {
   "section": "10.7",
   "company": "Delta",
   "title": "Delta·2026년 3분기 공식 실적",
   "url": "https://ir.delta.com/news/news-details/2026/Delta-Air-Lines-Announces-September-Quarter-2026-Financial-Results/"
  },
  {
   "section": "10.7",
   "company": "United",
   "title": "United 콜 · 2026년 10월 21일",
   "url": ""
  },
  {
   "section": "10.7",
   "company": "UPS",
   "title": "UPS·2026년 9월 30일 분기 10-Q",
   "url": "https://investors.ups.com/sec-filings/all-sec-filings/content/0001628280-26-070246/ups-20260930.htm"
  },
  {
   "section": "10.7",
   "company": "LyondellBasell",
   "title": "LyondellBasell·2026년 3분기 공식 발표",
   "url": "https://www.lyondellbasell.com/en/who-we-are/updates-events/corporate--financial-news/lyondellbasell-reports-third-quarter-2026-earnings"
  }
 ]
};
