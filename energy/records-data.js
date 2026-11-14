'use strict';
// Rows of the 차질·복구 대장 and the 계약·프로젝트 진행표 (밸류체인 기업 › 차질·계약 기록),
// drawn by records.js. Each row is a dated record from a company release, filing,
// earnings call or public report; `sections` are the textbook sections the record
// came from and `cards` the company cards (vc-co-<card>) it belongs to. A ledger
// row without a `stage` is outside the six supply stages; `date_note` says when
// 자료일 is not a publication date (확인일: the day a standing page was read).
// `lat` and `lon` (one decimal) place a ledger row on the map: the site of the
// named facility or sea area, taken from the page's map points where the same
// site is there and from the town or port of the facility otherwise. A row with
// no single site (a company-wide remark, a fleet, a region) has null for both
// and is counted as 장소 없는 기록. `site` is the short name of that place, the
// one the map writes beside the mark; rows of one place share it and a row
// without coordinates has "". `target_start` and `target_end` (YYYY-MM or
// YYYY-MM-DD) are the months the `target` wording of a project row names
// ("2027년 말" is 2027-12, "2028년" is 2028-01 to 2028-12, "연말" is December of
// the year announced, a quarter, a half or a month is its months); null when
// the wording names no period that follows from these rules.
// recordsAsOf is the 확인 기준 date index.html shows beside the two headings and the
// last day of the time axes records.js draws. The three constants are strict
// JSON: backend/tests/test_energy_records.py parses them.
const recordsAsOf = "2026-11-10";
const disruptionRecords = [
 {
  "id": "pten-south-texas-sand",
  "stage": 1,
  "event_date": "",
  "source_date": "2026-10-29",
  "date_note": "",
  "facility": "South Texas 완결용 모래 광산",
  "country": "미국",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "Patterson-UTI",
  "scope": "자재·물류(완결용 모래의 광산·공급 측)",
  "type": "공급 병목",
  "what": "미리 잡힌 완결 작업과 필요한 모래 공급이 맞지 않아 일부 지연이 발생했다. 회사는 운송 물류 문제와 구분해 광산·공급 측 병목으로 설명했다.",
  "figure": "",
  "recovery": "회사는 2026년 4분기 초 해소됐다고 설명했다(회사 설명). 밀렸던 완결 작업을 다시 진행할 조건이 마련된 단계이며, 유정 완결과 생산시설 연결을 마쳐야 생산량에 반영된다.",
  "status": "resolved",
  "confidence": "회사 설명(어닝콜)",
  "remaining": "광산 생산·공급능력과 작업 일정을 대조한다. 이 설명만으로 해소된 지연에 따른 현재의 원유 손실은 확인되지 않는다.",
  "sources": [
   {
    "title": "Patterson-UTI 2026년 10월 29일 어닝콜",
    "url": "",
    "qa": "12·21"
   }
  ],
  "sections": [
   "2.6",
   "2.12"
  ],
  "cards": [
   "PTEN"
  ]
 },
 {
  "id": "hp-superspec-reactivation",
  "stage": 1,
  "event_date": "회계 3Q26",
  "source_date": "2026-08-06",
  "date_note": "",
  "facility": "고사양 육상 리그 선대",
  "country": "",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "H&P",
  "scope": "육상 리그(super-spec 선대)",
  "type": "리그 재가동",
  "what": "회계 3Q26에 리그 10기를 재가동했다. super-spec 선대 이용률은 약 95%라고 밝혔다. 고사양 육상 리그의 즉시 투입 여력에 관한 설명이다.",
  "figure": "리그 10기 재가동(회계 3Q26), super-spec 선대 이용률 약 95%",
  "recovery": "과거 관측이다. 유휴 리그가 바로 가용 공급이 되는 것은 아니며 정비·인력·이동·고객 계약을 확인한다.",
  "status": "unknown",
  "confidence": "회사 설명(어닝콜)",
  "remaining": "다른 회사보다 오래된 어닝콜의 관측이며 당시 이용률로 2026년 11월의 가용 장비 수는 확인되지 않는다.",
  "sources": [
   {
    "title": "H&P 2026년 8월 6일 어닝콜",
    "url": "",
    "qa": "2"
   }
  ],
  "sections": [
   "2.12"
  ],
  "cards": [
   "HP"
  ]
 },
 {
  "id": "transocean-cold-stacked-rigs",
  "stage": 1,
  "event_date": "",
  "source_date": "2026-11-03",
  "date_note": "",
  "facility": "고사양 부유식 시추설비·cold-stacked 리그",
  "country": "",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "Transocean",
  "scope": "해양 시추 리그(드릴십 등 부유식)",
  "type": "공급 병목(리그 재가동 보류)",
  "what": "고사양 드릴십 계약을 확보했고 고사양 부유식 시추설비의 계약 공백이 적다고 설명했다. cold-stacked 리그는 선제적으로 재가동하지 않겠다고 밝혔다.",
  "figure": "",
  "recovery": "재가동 조건은 일감과 수익성이 자본 투입을 정당화하는 것이다(회사 방침). 장기 계약·비용 회수·인력·정비·인증이 필요하고, 재가동 뒤에도 시추·완결·해저 연결이 남는다.",
  "status": "open",
  "confidence": "회사 설명(어닝콜)",
  "remaining": "미래 공급 증가의 제약이며 현재 생산설비 파괴와는 다르다. 드릴십 계약 확보로 잭업·반잠수식의 단가·수요까지 확인되지는 않는다.",
  "sources": [
   {
    "title": "Transocean 2026년 11월 3일 어닝콜",
    "url": "",
    "qa": "6·7"
   }
  ],
  "sections": [
   "2.7",
   "2.12"
  ],
  "cards": [
   "RIG"
  ]
 },
 {
  "id": "valaris-drillship-contracts",
  "stage": 1,
  "event_date": "",
  "source_date": "2026-11-02",
  "date_note": "",
  "facility": "고사양 드릴십",
  "country": "",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "Valaris",
  "scope": "해양 시추 리그(드릴십)",
  "type": "계약 확보",
  "what": "2026년 11월 2일 고사양 드릴십 계약 확보를 발표했다.",
  "figure": "",
  "recovery": "계약이 원유 공급으로 이어지려면 수심·기상·압력 사양이 맞는 장비에 계약·정비·인력 준비가 끝나고 해저 연결과 생산시설 일정이 이어져야 한다.",
  "status": "unknown",
  "confidence": "회사 발표",
  "remaining": "드릴십 계약 확보로 잭업·반잠수식의 단가·수요까지 확인되지는 않는다. 가동률과 매출효율은 계산 대상이 다르다.",
  "sources": [
   {
    "title": "Valaris 2026년 11월 2일 발표",
    "url": "",
    "qa": ""
   }
  ],
  "sections": [
   "2.7"
  ],
  "cards": [
   "VAL"
  ]
 },
 {
  "id": "slb-middle-east-operations",
  "stage": 1,
  "event_date": "",
  "source_date": "2026-10-23",
  "date_note": "",
  "facility": "중동 현장",
  "country": "중동",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "SLB",
  "scope": "현장 운영·물류",
  "type": "현장 운영·물류 불확실성",
  "what": "중동 현장 운영과 물류가 불확실하다고 설명했다. 분기 초 UAE·쿠웨이트·카타르 등에서 회복을 관측했지만 이후 재개 속도를 보수적으로 평가했다.",
  "figure": "",
  "recovery": "지역별 재개 속도가 다르다(회사 평가). 현장 접근·인력·자재 반입·고객 작업계획을 함께 확인한다.",
  "status": "open",
  "confidence": "회사 설명(어닝콜)",
  "remaining": "서비스 매출 회복은 생산량 회복과 다른 지표다.",
  "sources": [
   {
    "title": "SLB 2026년 10월 23일 어닝콜",
    "url": "",
    "qa": "3·5"
   }
  ],
  "sections": [
   "2.12"
  ],
  "cards": [
   "SLB"
  ]
 },
 {
  "id": "halliburton-strait-logistics-cost",
  "stage": 1,
  "event_date": "",
  "source_date": "2026-10-20",
  "date_note": "",
  "facility": "운송·자재 조달(해협 상황)",
  "country": "",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "Halliburton",
  "scope": "자재·물류(운송·자재 배송비)",
  "type": "물류비 상승",
  "what": "해협 상황으로 운송·자재 조달비가 올랐다. 회사는 높은 물류·자재 배송비를 다음 해 가정에도 반영했다고 설명했다.",
  "figure": "",
  "recovery": "비용·운영 제약에 관한 설명이다. 운송비 정상화, 고객 작업 재개, 비용의 가격 전가 여부를 각각 확인한다.",
  "status": "open",
  "confidence": "회사 설명(어닝콜)",
  "remaining": "원유 감산량은 정량 제시되지 않았다.",
  "sources": [
   {
    "title": "Halliburton 2026년 10월 20일 어닝콜",
    "url": "",
    "qa": "6·12"
   }
  ],
  "sections": [
   "2.12"
  ],
  "cards": [
   "HAL"
  ]
 },
 {
  "id": "baker-hughes-middle-east-supply",
  "stage": 1,
  "event_date": "",
  "source_date": "2026-10-28",
  "date_note": "",
  "facility": "중동 물류·부품·설비 공급",
  "country": "",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "Baker Hughes",
  "scope": "자재·물류(부품·설비 공급)",
  "type": "공급 병목",
  "what": "중동 물류와 부품·설비 공급에 제약이 있다고 설명했다. IET에는 물류·공급 제약에 따른 소폭의 매출 부담을 예상했다.",
  "figure": "4분기 중동 활동을 2분기 수준으로 가정(회사 전망)",
  "recovery": "4분기 회사 전망이다. 실제 배송 지연은 계약별로 다르다.",
  "status": "open",
  "confidence": "회사 설명(어닝콜)",
  "remaining": "주문잔고 외에 제작·인도·설치·시운전 일정을 확인한다.",
  "sources": [
   {
    "title": "Baker Hughes 2026년 10월 28일 어닝콜",
    "url": "",
    "qa": "5"
   }
  ],
  "sections": [
   "2.12"
  ],
  "cards": [
   "BKR"
  ]
 },
 {
  "id": "nov-middle-east-freight",
  "stage": 1,
  "event_date": "",
  "source_date": "2026-10-28",
  "date_note": "",
  "facility": "중동 장비 반입·반출",
  "country": "",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "NOV",
  "scope": "자재·물류(장비 운송·운임)",
  "type": "공급 병목(운임·장비 반입)",
  "what": "중동 장비 반입·반출과 운임에 문제가 있다고 설명했다. 물류 변동성에 대비해 재고도 더 보유했다.",
  "figure": "운임 전년 대비 약 20% 높음. 중동 활동은 4분기 중간 한 자릿수 감소 전망(회사 전망)",
  "recovery": "비용 증가와 예방재고, 회사 전망이 함께 들어 있다. 부품 배송 정상화·리그 재투입·공정 단계별 청구·재고의 현금 전환을 확인한다.",
  "status": "open",
  "confidence": "회사 설명(어닝콜)",
  "remaining": "장비·작업·회사 매출에 관한 설명이며 이 설명만으로 원유 감산량은 확인되지 않는다.",
  "sources": [
   {
    "title": "NOV 2026년 10월 28일 어닝콜",
    "url": "",
    "qa": "2·5·7"
   }
  ],
  "sections": [
   "2.12"
  ],
  "cards": [
   "NOV"
  ]
 },
 {
  "id": "technipfmc-subsea-manufacturing",
  "stage": 1,
  "event_date": "",
  "source_date": "2026-10-29",
  "date_note": "",
  "facility": "해저장비 제조(Subsea 2.0)",
  "country": "",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "TechnipFMC",
  "scope": "해저장비 제조능력",
  "type": "제약 없음(반대 사례)",
  "what": "CFO는 자사 전체 제조능력에 큰 우려가 없다고 답했다. Subsea 2.0 제조 흐름의 처리 속도가 기존 1.0 대비 2.5배인 사례를 들었다.",
  "figure": "Subsea 2.0 처리 속도는 기존 1.0 대비 2.5배(회사 설명 사례)",
  "recovery": "자사 생산능력에 관한 설명이며 산업 전체의 공급능력을 보증하지 않는다.",
  "status": "unknown",
  "confidence": "회사 설명(어닝콜)",
  "remaining": "제조 처리량과 프로젝트 인도·설치선 투입·첫 생산을 따로 확인한다.",
  "sources": [
   {
    "title": "TechnipFMC 2026년 10월 29일 어닝콜",
    "url": "",
    "qa": "4"
   }
  ],
  "sections": [
   "2.12"
  ],
  "cards": [
   "FTI"
  ]
 },
 {
  "id": "exxonmobil-uae-sales-delay",
  "stage": 2,
  "event_date": "",
  "source_date": "2026-10-30",
  "date_note": "",
  "facility": "UAE 생산·수출",
  "country": "UAE",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "ExxonMobil",
  "scope": "생산·수출 물류",
  "type": "판매 지연(생산 회복 뒤)",
  "what": "생산은 회복됐지만 판매·수익 인식은 물류 제약으로 지연된다고 설명했다. 대체 수송·저장·항로를 협의했다.",
  "figure": "",
  "recovery": "생산은 회복됐다(회사 설명). 판매·수익 인식은 물류 제약으로 늦어지고 있다.",
  "status": "open",
  "confidence": "회사 설명(어닝콜)",
  "remaining": "회복된 생산이 모두 같은 분기에 판매됐는지와 지연·출하 물량은 확인되지 않았다. 생산량 다음에 선적량·판매량·운전자본이 따라오는지 비교한다.",
  "sources": [
   {
    "title": "ExxonMobil 2026년 10월 30일 어닝콜",
    "url": "",
    "qa": "14"
   }
  ],
  "sections": [
   "2.15"
  ],
  "cards": [
   "XOM"
  ]
 },
 {
  "id": "exxonmobil-qatar-lng-train",
  "stage": 2,
  "event_date": "",
  "source_date": "2026-10-30",
  "date_note": "",
  "facility": "카타르 LNG train",
  "country": "카타르",
  "lat": 25.9,
  "lon": 51.6,
  "site": "Ras Laffan",
  "company": "ExxonMobil",
  "scope": "개별 장치(LNG train, 가스 설비)",
  "type": "설비 손상",
  "what": "손상된 LNG train이 물량을 제한한다고 설명했다.",
  "figure": "",
  "recovery": "수리 완료일은 확정되지 않았다. 항로가 열리면 이미 생산할 수 있는 물량의 출하는 빨라질 수 있지만 손상된 장치에는 수리가 별도로 필요하다.",
  "status": "open",
  "confidence": "회사 설명(어닝콜)",
  "remaining": "train별 실제 중단량·수리 완료일은 답변에서 정량 확정되지 않았다. 손상 장치 수리·가스 처리·LNG 선적을 순서대로 확인한다.",
  "sources": [
   {
    "title": "ExxonMobil 2026년 10월 30일 어닝콜",
    "url": "",
    "qa": "9·14"
   }
  ],
  "sections": [
   "2.15"
  ],
  "cards": [
   "XOM"
  ]
 },
 {
  "id": "conocophillips-qatar-lng",
  "stage": 2,
  "event_date": "2026년 3분기",
  "source_date": "2026-11-05",
  "date_note": "",
  "facility": "카타르 LNG 투자자산",
  "country": "카타르",
  "lat": 25.9,
  "lon": 51.6,
  "site": "Ras Laffan",
  "company": "ConocoPhillips",
  "scope": "생산설비(물리적 손상 없음)·생산·운송 제약",
  "type": "생산 제약",
  "what": "카타르 LNG 투자자산의 3분기 생산이 제약됐다. 분기보고서는 9월 말 기준 자사 생산설비에 물리적 손상이 없다고 밝혔다.",
  "figure": "2025년 회사 생산에서 카타르 비중 약 4%(과거 회사 생산 비중이며 세계 LNG 손실률과 다르다)",
  "recovery": "9월 말 기준 자사 생산설비에 물리적 손상이 없다(회사 공시). 생산·운송 제약은 받았다. 손상차손 미인식과 생산 정상화는 별개다.",
  "status": "unknown",
  "confidence": "공식 공시(분기보고서)·어닝콜",
  "remaining": "ExxonMobil이 언급한 손상 train은 ConocoPhillips 자산의 손상으로 확인되지 않았다. 같은 프로젝트의 지분 물량과 시설 전체 물량은 합산하는 값이 아니다.",
  "sources": [
   {
    "title": "ConocoPhillips 2026년 11월 5일 어닝콜·분기보고서",
    "url": "",
    "qa": "10"
   }
  ],
  "sections": [
   "2.15"
  ],
  "cards": [
   "COP"
  ]
 },
 {
  "id": "aramco-riyadh-building",
  "stage": null,
  "event_date": "2026-11-08",
  "source_date": "2026-11-08",
  "date_note": "",
  "facility": "Aramco 리야드 건물",
  "country": "사우디아라비아",
  "lat": 24.7,
  "lon": 46.7,
  "site": "리야드",
  "company": "Aramco",
  "scope": "사무 건물",
  "type": "요격 잔해 피해",
  "what": "요격 잔해에 따른 건물 피해 보도다. 사무 건물 사건이며 정유능력 손실에 해당하지 않는다.",
  "figure": "",
  "recovery": "",
  "status": "unknown",
  "confidence": "1차 보도(AP)",
  "remaining": "피해 대상은 사무 건물이며 생산설비가 아니다. 2026년 11월 10일 보도된 후티 측의 Riyadh 공격 주장은 East-West 원유관(메디나 지역) 기록에 있으며, 이 건물 피해의 후속 확인이 아니다.",
  "sources": [
   {
    "title": "AP·2026년 11월 8일",
    "url": "https://apnews.com/article/090d96e25872f5c63e105b9dd3e5dc60",
    "qa": ""
   }
  ],
  "sections": [
   "7.18",
   "7.26"
  ],
  "cards": [
   "2222-SR"
  ]
 },
 {
  "id": "chevron-logistics-insurance",
  "stage": 3,
  "event_date": "",
  "source_date": "2026-10-30",
  "date_note": "",
  "facility": "자체 운송·정유 통합 체계",
  "country": "",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "Chevron",
  "scope": "물류·보험",
  "type": "물류·보험비 상승",
  "what": "자체 운송·정유 통합과 유연한 원료 조달이 물류·보험비 상승을 완충한다고 설명했다. 일부 생산·가공 설비의 병목 해소도 추진했다.",
  "figure": "",
  "recovery": "",
  "status": "unknown",
  "confidence": "회사 설명(어닝콜)",
  "remaining": "이 어닝콜에서 CPC의 구체적 현재 장애량은 확인되지 않았다. CPC 사건은 관로·터미널 운영 공지로 따로 검증한다. Tengiz 지분·허가권 논의와 관로 운영 상태는 별개다.",
  "sources": [
   {
    "title": "Chevron 2026년 10월 30일 어닝콜",
    "url": "",
    "qa": "12·16"
   }
  ],
  "sections": [
   "2.15"
  ],
  "cards": [
   "CVX"
  ]
 },
 {
  "id": "aramco-msc-return",
  "stage": 3,
  "event_date": "",
  "source_date": "2026-11-03",
  "date_note": "",
  "facility": "최대 지속생산능력·동서 파이프라인 우회 수송망",
  "country": "사우디아라비아",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "Aramco",
  "scope": "생산능력·우회 수송(배관·해외 저장·수출 경로)",
  "type": "복구 전망",
  "what": "약 3주 안에 최대 지속생산능력으로 복귀할 수 있다고 설명했다. 동서 파이프라인·해외 저장·새 수출 경로를 완충 수단으로 활용한다고 밝혔다.",
  "figure": "최대 지속생산능력 복귀 가능 기간 약 3주(회사 설명)",
  "recovery": "복귀 가능성은 회사 설명이며 실제 추가 수출량·고객 인도 일정과는 별개다.",
  "status": "plan",
  "confidence": "공식 웹캐스트(회사 설명)",
  "remaining": "안전 통항·선적 여건이 필요하다. 배관 흐름·항만 적재·고객 인도를 확인한다. 우회 수송능력과 실제 수송·항만 선적량은 다르다. 2026년 11월 9일 사건은 이 발표 이후에 일어났으며 그 사건의 공급 영향은 이 발표에 반영되지 않았다.",
  "sources": [
   {
    "title": "Aramco 공식 웹캐스트 스크립트: 3Q26·2026년 11월 3일",
    "url": "https://www.aramco.com/-/media/publications/corporate-reports/reports-and-presentations/2026/q3/saudi-aramco-q3-2026-webcast-presentation-script-english.pdf",
    "qa": ""
   }
  ],
  "sections": [
   "2.15",
   "4.6"
  ],
  "cards": [
   "2222-SR"
  ]
 },
 {
  "id": "lake-charles-spr-exchange",
  "stage": 3,
  "event_date": "",
  "source_date": "2026-10-23",
  "date_note": "",
  "facility": "Lake Charles(Phillips 66)·West Hackberry SPR",
  "country": "미국",
  "lat": 30.2,
  "lon": -93.3,
  "site": "Lake Charles",
  "company": "Phillips 66 / 미국 DOE",
  "scope": "원유 조달(SPR 원유 교환)",
  "type": "원유 공급 차질·SPR 교환 승인",
  "what": "2026년 10월 23일 원유 공급 차질에 대응하기 위해 West Hackberry SPR 원유 교환이 승인됐다. SPR 교환은 임시 조달 완충이며 관로·정유장치 수리와는 별개 조치다.",
  "figure": "최대 400,000배럴(승인 상한이자 누적량. b/d 단위와 다르고 실제 인도 완료량과도 다르다)",
  "recovery": "승인 단계다(부처 발표). 실제 인도량과 정유소 투입이 확인돼야 조달 차질이 얼마나 완화됐는지 계산할 수 있다.",
  "status": "unknown",
  "confidence": "부처 발표(미국 DOE)",
  "remaining": "차질 원인·지속시간·실제 수령량·정유소 투입 정상화를 따로 확인한다.",
  "sources": [
   {
    "title": "미국 DOE: Lake Charles SPR 교환 승인",
    "url": "https://www.energy.gov/articles/energy-department-authorizes-strategic-petroleum-reserve-exchange-support-fuel-supply",
    "qa": ""
   }
  ],
  "sections": [
   "4.6"
  ],
  "cards": [
   "PSX"
  ]
 },
 {
  "id": "east-west-pipeline-2026-04",
  "stage": 3,
  "event_date": "",
  "source_date": "2026-04-12",
  "date_note": "",
  "facility": "East-West 원유관",
  "country": "사우디아라비아",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "Aramco",
  "scope": "관로(원유 수송능력)",
  "type": "피해·펌핑능력 회복 발표",
  "what": "2026년 4월 9일 피해가 발표됐고, 4월 12일 정부가 전체 펌핑능력 회복을 발표했다.",
  "figure": "",
  "recovery": "전체 펌핑능력 회복을 정부가 발표했다(완료 발표). 회복 대상은 원유 수송능력이며 정유소 경유 출하와 소비지 재고 회복은 별도 관측이다.",
  "status": "resolved",
  "confidence": "부처 발표(사우디 에너지부)",
  "remaining": "발표일 사이의 간격과 실제 중단기간은 다르다. 이 4월 발표는 2026년 11월의 다른 피격 사건의 복구를 확인한 자료가 아니다.",
  "sources": [
   {
    "title": "사우디 에너지부: 과거 사건의 회복 발표·2026년 4월 12일",
    "url": "https://www.spa.gov.sa/fa/N2557744",
    "qa": ""
   }
  ],
  "sections": [
   "7.20"
  ],
  "cards": [
   "2222-SR"
  ]
 },
 {
  "id": "east-west-pipeline-medina-2026-11",
  "stage": 3,
  "event_date": "2026-11-09",
  "source_date": "2026-11-09",
  "date_note": "",
  "facility": "East-West 원유관(메디나 지역)",
  "country": "사우디아라비아",
  "lat": 24.5,
  "lon": 39.6,
  "site": "메디나",
  "company": "Aramco",
  "scope": "관로",
  "type": "피격·화재",
  "what": "메디나 지역에서 관로가 공격받아 제한적 화재가 났고 진화됐다. 사우디 에너지부는 운영 영향이 없다고 발표했다.",
  "figure": "",
  "recovery": "화재 진화와 운영 영향 없음은 부처 발표다. 실제 흐름 감소·손실량·수리 일정은 확정되지 않았다. 전면 송유 중단은 확인되지 않았다.",
  "status": "unknown",
  "confidence": "부처 발표(AP가 사우디 에너지부 발표 인용)·당사자 주장 상충",
  "remaining": "후티 측은 2026년 11월 10일 메디나의 East-West 파이프라인 공격을 부인하고 Riyadh를 공격했다고 주장했다. 그 보도는 Riyadh의 추가 손상이나 운영 영향을 정량 확인하지 않았다. 같은 날 후티 대변인은 East-West 파이프라인 등을 대상으로 한 군사작전을 주장했다. 공격 위치에 관한 설명이 상충한다. 부처 발표는 실제 유량 자료를 대신하지 않는다. 같은 사건의 후속 보도는 별도의 공급 손실이 아니다.",
  "sources": [
   {
    "title": "사우디 에너지부 발표를 인용한 AP 보도·2026년 11월 9일",
    "url": "https://apnews.com/article/9b6fa963ea4766a08956e53506494468",
    "qa": ""
   },
   {
    "title": "Medina 파이프라인 화재·운영 지속 보도·2026년 11월 9일",
    "url": "https://www.brecorder.com/news/40448133/saudi-east-west-oil-pipeline-hit-in-medina-region-state-media-reports",
    "qa": ""
   },
   {
    "title": "East-West 공격 위치에 관한 상충 보도·2026년 11월 10일",
    "url": "https://www.brecorder.com/news/40448277/yemens-houthis-deny-attacking-east-west-pipeline-in-medina",
    "qa": ""
   },
   {
    "title": "Riyadh·남부 미사일 요격과 파이프라인 사건·2026년 11월 10일",
    "url": "https://www.aljazeera.com/news/2026/11/10/saudi-arabia-downs-missiles-fired-at-riyadh-after-houthi-attack-on-pipeline?traffic_source=rss",
    "qa": ""
   }
  ],
  "sections": [
   "4.6",
   "7.18",
   "7.26"
  ],
  "cards": [
   "2222-SR"
  ]
 },
 {
  "id": "east-west-expansion-predesign-2026-11",
  "stage": 3,
  "event_date": "",
  "source_date": "2026-11-04",
  "date_note": "",
  "facility": "East-West 파이프라인·해외 저장·수출 경로",
  "country": "사우디아라비아",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "Aramco",
  "scope": "관로·저장·수출 경로(미래 확장)",
  "type": "확장 검토",
  "what": "Aramco의 East-West 파이프라인 확장 사전 설계와 해외 저장·수출 경로 확대 검토 보도다.",
  "figure": "",
  "recovery": "미래 설계·확장 검토다. 이 보도는 현재 가용능력 증가나 이후 공격의 복구 완료를 확인한 자료가 아니다.",
  "status": "plan",
  "confidence": "매체 보도",
  "remaining": "2026년 11월 4일 매체 보도 기준이다. 설계 단계의 명칭과 확장 일정은 회사 발표로 확인한다.",
  "sources": [
   {
    "title": "Aramco의 East-West 확장 사전 설계 보도·2026년 11월 4일",
    "url": "https://m.jiemian.com/article/15289258.html",
    "qa": ""
   }
  ],
  "sections": [
   "7.26"
  ],
  "cards": [
   "2222-SR"
  ]
 },
 {
  "id": "qatar-north-tanker-ukmto-196-26",
  "stage": 3,
  "event_date": "2026-11-04",
  "source_date": "2026-11-05",
  "date_note": "",
  "facility": "카타르 북방 해역(Madinat ash Shamal 북쪽 50해리)",
  "country": "카타르 북방 해역",
  "lat": 27.0,
  "lon": 51.2,
  "site": "카타르 북방 해역",
  "company": "",
  "scope": "선박(유조선)",
  "type": "피격",
  "what": "유조선이 미확인 발사체 두 발에 피격됐다는 공식 경보가 나왔다.",
  "figure": "Madinat ash Shamal 북쪽 50해리, 미확인 발사체 두 발",
  "recovery": "",
  "status": "unknown",
  "confidence": "공식 경보(UKMTO 196-26)",
  "remaining": "선원 상태·손상 평가·환경 영향은 해당 경보에서 확인되지 않았다.",
  "sources": [
   {
    "title": "UKMTO 196-26 공식 경보·2026년 11월 5일",
    "url": "https://www.ukmto.org/-/media/ukmto/products/20261105-ukmto_warning-196-26.pdf?rev=21551561384d4d77a20f66bf7251abad",
    "qa": ""
   }
  ],
  "sections": [
   "7.18"
  ],
  "cards": []
 },
 {
  "id": "kirishi-refinery-2026-11",
  "stage": 4,
  "event_date": "2026-11-09",
  "source_date": "2026-11-09",
  "date_note": "",
  "facility": "Kirishi 정유소",
  "country": "러시아",
  "lat": 59.5,
  "lon": 32.0,
  "site": "Kirishi",
  "company": "",
  "scope": "장치 미공개",
  "type": "피격·화재",
  "what": "드론 공격에 따른 화재 보도다. 주지사 발언을 인용했다.",
  "figure": "",
  "recovery": "장치·손실량·재가동 시점은 검증되지 않았다.",
  "status": "unknown",
  "confidence": "1차 보도(Reuters 제목·주지사 인용)",
  "remaining": "",
  "sources": [
   {
    "title": "Reuters 제목·주지사 인용·2026년 11월 9일",
    "url": "https://ca.marketscreener.com/news/ukrainian-drone-attack-sets-russia-s-kirishi-refinery-ablaze-governor-says-ce785fd3d881f024",
    "qa": ""
   }
  ],
  "sections": [
   "7.18"
  ],
  "cards": []
 },
 {
  "id": "afipsky-refinery-2026-11",
  "stage": 4,
  "event_date": "",
  "source_date": "2026-11-06",
  "date_note": "",
  "facility": "Afipsky 정유소",
  "country": "러시아",
  "lat": 44.9,
  "lon": 38.8,
  "site": "Afipsky",
  "company": "",
  "scope": "장치 미공개",
  "type": "피격",
  "what": "정유소 공격 보도다. Russia Matters가 Reuters를 인용한 2차 요약이다.",
  "figure": "",
  "recovery": "영향 장치와 현재 가동률은 확인되지 않았다.",
  "status": "unknown",
  "confidence": "2차 요약(Russia Matters가 Reuters 인용)",
  "remaining": "",
  "sources": [
   {
    "title": "Russia Matters의 Reuters 인용·2026년 11월 6일·2차 요약",
    "url": "https://www.russiamatters.org/news/russia-review/russia-review-oct-30-nov-6-2026",
    "qa": ""
   }
  ],
  "sections": [
   "7.18"
  ],
  "cards": []
 },
 {
  "id": "ryazan-refinery-2026-11",
  "stage": 4,
  "event_date": "2026-11-05",
  "source_date": "2026-11-05",
  "date_note": "",
  "facility": "Ryazan 정유소",
  "country": "러시아",
  "lat": 54.6,
  "lon": 39.8,
  "site": "Ryazan",
  "company": "",
  "scope": "정유소 관련 산업시설(범위 미확인)",
  "type": "피격·화재",
  "what": "정유소 관련 산업시설의 피격 정황과 도시 정전·화재 보도다. 같은 날 정유소 산업구역을 겨냥한 드론 공격 속보도 나왔다.",
  "figure": "",
  "recovery": "피해·운전 범위는 확인되지 않았다. 도시 전력 복구와 정유소 재가동은 별개다.",
  "status": "unknown",
  "confidence": "1차 보도(Reuters)",
  "remaining": "영향 장치와 손실량, 복구일을 확인한다.",
  "sources": [
   {
    "title": "Reuters·2026년 11월 5일",
    "url": "https://ca.marketscreener.com/news/renewed-refinery-attacks-deplete-russian-diesel-supply-as-us-deal-in-focus-ce785fddd889f527",
    "qa": ""
   },
   {
    "title": "Ryazan 정유소 산업구역 드론 공격 속보·2026년 11월 5일",
    "url": "",
    "qa": ""
   }
  ],
  "sections": [
   "7.18",
   "7.26"
  ],
  "cards": []
 },
 {
  "id": "yaroslavl-yanos-2026-11",
  "stage": 4,
  "event_date": "2026-11-03",
  "source_date": "2026-11-03",
  "date_note": "",
  "facility": "Yaroslavl / YANOS 정유소",
  "country": "러시아",
  "lat": 57.6,
  "lon": 39.9,
  "site": "Yaroslavl",
  "company": "",
  "scope": "장치 미공개",
  "type": "화재",
  "what": "주지사가 정유소 화재를 확인했다.",
  "figure": "공장 규모 연 15백만 톤 수준(공장 전체 규모이며 손실량과 다르다)",
  "recovery": "영향 장치·실제 중단량·복구일은 확인되지 않았다.",
  "status": "unknown",
  "confidence": "1차 보도(Reuters, 주지사 확인)",
  "remaining": "",
  "sources": [
   {
    "title": "Reuters·2026년 11월 3일",
    "url": "https://ca.marketscreener.com/news/ukrainian-drones-set-fire-to-major-russian-oil-refinery-local-governor-says--ce785fd9df88f521",
    "qa": ""
   }
  ],
  "sections": [
   "7.18"
  ],
  "cards": []
 },
 {
  "id": "ras-tanura-2026-10",
  "stage": 4,
  "event_date": "2026-10-27",
  "source_date": "2026-10-27",
  "date_note": "",
  "facility": "Ras Tanura 수출 터미널 인근",
  "country": "사우디아라비아",
  "lat": 26.6,
  "lon": 50.2,
  "site": "Ras Tanura",
  "company": "",
  "scope": "수출 터미널 인근(정유소 타격은 당사자 주장)",
  "type": "화재·피격 주장",
  "what": "수출 터미널 인근 화재가 진화됐다는 보도다. 후티는 정유소 타격을 주장했다.",
  "figure": "",
  "recovery": "화재 진화는 보도로 확인됐다. 장치·선적 영향은 확인되지 않았다.",
  "status": "unknown",
  "confidence": "1차 보도(Reuters / Moneycontrol)·당사자 주장(후티)",
  "remaining": "공격 주장과 터미널 주변 화재는 보도됐으나 실제 CDU 피해는 확인되지 않았다.",
  "sources": [
   {
    "title": "Reuters / Moneycontrol·2026년 10월 27일",
    "url": "https://www.moneycontrol.com/world/saudi-arabia-contains-fire-near-ras-tanura-oil-hub-after-attack-article-14061244.html",
    "qa": ""
   }
  ],
  "sections": [
   "7.18"
  ],
  "cards": []
 },
 {
  "id": "lytton-fccu-ampol",
  "stage": 4,
  "event_date": "",
  "source_date": "2026-10-19",
  "date_note": "",
  "facility": "Lytton 정유소 FCCU",
  "country": "호주",
  "lat": -27.4,
  "lon": 153.2,
  "site": "Lytton",
  "company": "Ampol",
  "scope": "개별 장치(FCCU)",
  "type": "정비(추가 신뢰성 작업)",
  "what": "검사 중 추가 신뢰성 작업을 확인했다고 발표했고, FCCU 재가동 전망을 늦췄다.",
  "figure": "4분기 휘발유·경유·항공유 생산 합계가 이전 예상보다 약 150 ML 감소 전망(ML은 백만 리터, 세 제품 합계)",
  "recovery": "재가동 전망은 2026년 11월 중순이다(회사 전망). 2026년 11월 11일 기준 실제 재가동 완료는 확인되지 않았다.",
  "status": "open",
  "confidence": "공식 공시(Ampol ASX 공시)",
  "remaining": "150 ML는 휘발유·경유·항공유 세 제품의 합계이며 경유만의 감소량이 아니다.",
  "sources": [
   {
    "title": "Ampol ASX 공시: 거래·생산 업데이트·2026년 10월 19일",
    "url": "https://announcements.asx.com.au/asxpdf/20261019/pdf/075glcg40kwdcz.pdf",
    "qa": ""
   }
  ],
  "sections": [
   "7.18",
   "7.20"
  ],
  "cards": []
 },
 {
  "id": "geelong-fire-viva",
  "stage": 4,
  "event_date": "4월",
  "source_date": "2026-11-10",
  "date_note": "확인일",
  "facility": "Geelong 정유소",
  "country": "호주",
  "lat": -38.1,
  "lon": 144.4,
  "site": "Geelong",
  "company": "Viva Energy",
  "scope": "일부 장치",
  "type": "화재",
  "what": "4월 화재로 일부 장치가 영향을 받았다. 운영사는 연료 생산 지속과 휘발유 증기압의 임시 면제를 설명했다.",
  "figure": "",
  "recovery": "부분 장치 차질이다. 정상 수율 복귀는 별도 확인 항목이다.",
  "status": "open",
  "confidence": "운영사 현황 공지(2026년 11월 10일 확인)",
  "remaining": "공장 전체가 폐쇄된 것은 아니다.",
  "sources": [
   {
    "title": "Viva Energy 운영 현황·증기압 설명·2026년 11월 10일 확인",
    "url": "https://www.vivaenergy.com.au/operations/geelong/rvp",
    "qa": ""
   }
  ],
  "sections": [
   "7.18"
  ],
  "cards": []
 },
 {
  "id": "benicia-closure-valero",
  "stage": 4,
  "event_date": "2026년 4월 말",
  "source_date": "2026-10-22",
  "date_note": "",
  "facility": "Benicia 정유소",
  "country": "미국",
  "lat": 38.1,
  "lon": -122.1,
  "site": "Benicia",
  "company": "Valero",
  "scope": "공장 전체",
  "type": "상업적 폐쇄",
  "what": "단계적 장치 유휴화 뒤 정제영업 중단을 2026년 4월 말까지 완료했다. 피격·일시 정기정비와 구분되는 구조적 공급 철수다.",
  "figure": "",
  "recovery": "운영 중단이 완료됐다(회사 공시). 이 정유소는 정비 후 돌아올 장치와 달리 곧 돌아올 공급에 해당하지 않는다.",
  "status": "closed",
  "confidence": "공식 공시(Valero 3Q 공시)",
  "remaining": "같은 발표에서 회사는 높은 이용률과 계획 정기보수 진행을 설명했다. 가동 시설별 처리량·정비·수율과 과거 연차보고서의 공장 수는 별개 자료다.",
  "sources": [
   {
    "title": "Valero 3Q 공시·2026년 10월 22일",
    "url": "https://investorvalero.com/news/news-details/2026/Valero-Energy-Reports-Third-Quarter-2026-Results/default.aspx",
    "qa": ""
   },
   {
    "title": "Valero 2026년 10월 22일 준비발언·질의응답·실적자료",
    "url": "",
    "qa": "13·14·15·18"
   }
  ],
  "sections": [
   "7.18",
   "7.22"
  ],
  "cards": [
   "VLO"
  ]
 },
 {
  "id": "lyb-houston-restart-plan",
  "stage": 4,
  "event_date": "",
  "source_date": "2026-10-30",
  "date_note": "",
  "facility": "옛 LYB Houston 정유소",
  "country": "미국",
  "lat": 29.7,
  "lon": -95.2,
  "site": "Houston",
  "company": "Valero",
  "scope": "정유소 처리능력(재가동 계획 대상)",
  "type": "재가동 계획",
  "what": "Valero가 인수 계약과 재가동 계획을 발표했다.",
  "figure": "처리능력 165,000 BPD를 2027년 말까지 재개할 계획",
  "recovery": "미래 재가동 계획이다(회사 계획). 재가동 계획 대상 처리능력은 현재 공급에 포함되지 않는다.",
  "status": "plan",
  "confidence": "공식 발표(Valero)",
  "remaining": "",
  "sources": [
   {
    "title": "Valero 재가동 계획·2026년 10월 30일",
    "url": "https://investorvalero.com/news/news-details/2026/Valero-to-Acquire-Former-Houston-Refinery-from-LyondellBasell/default.aspx",
    "qa": ""
   }
  ],
  "sections": [
   "7.18"
  ],
  "cards": [
   "VLO",
   "LYB"
  ]
 },
 {
  "id": "st-charles-fcc-optimization",
  "stage": 4,
  "event_date": "2026년 3분기",
  "source_date": "2026-10-22",
  "date_note": "",
  "facility": "St. Charles 정유소 FCC",
  "country": "미국",
  "lat": 30.0,
  "lon": -90.4,
  "site": "St. Charles",
  "company": "Valero",
  "scope": "개별 장치(FCC)",
  "type": "사업 완료",
  "what": "FCC 최적화 사업을 3분기에 완료했고 가동 중이라고 설명했다.",
  "figure": "",
  "recovery": "완료·가동 사례다(회사 공시).",
  "status": "resolved",
  "confidence": "공식 공시(Valero 3Q 공시)",
  "remaining": "FCC 최적화 사업이며 공장 전체의 신규 증설이 아니다.",
  "sources": [
   {
    "title": "Valero 3Q 공시·2026년 10월 22일",
    "url": "https://investorvalero.com/news/news-details/2026/Valero-Energy-Reports-Third-Quarter-2026-Results/default.aspx",
    "qa": ""
   }
  ],
  "sections": [
   "7.18"
  ],
  "cards": [
   "VLO"
  ]
 },
 {
  "id": "martinez-fire-2025",
  "stage": 4,
  "event_date": "2025-02-01",
  "source_date": "2026-10-29",
  "date_note": "",
  "facility": "Martinez 정유소",
  "country": "미국",
  "lat": 38.0,
  "lon": -122.1,
  "site": "Martinez",
  "company": "PBF Energy",
  "scope": "범위 미기재(화재 재건)",
  "type": "화재·재가동",
  "what": "2025년 2월 1일 화재가 났다. 이후 장치 정비는 화재 재건과 별개 건이다.",
  "figure": "",
  "recovery": "2026년 1월 2일 발표는 재건 작업이 2월까지 이어질 전망이라고 설명했다(회사 전망). 분기보고서는 화재 이후 2026년 5월 재가동 이력을 공시했다(회사 공시).",
  "status": "resolved",
  "confidence": "공식 공시(PBF 발표·분기보고서)",
  "remaining": "화재일부터 2026년 10월까지 전면 중단이 이어진 것은 아니다. 과거 화재, 재가동, 후속 정기보수는 서로 다른 사건이다.",
  "sources": [
   {
    "title": "PBF: Martinez 복구 업데이트·2026년 1월 2일",
    "url": "https://www.sec.gov/Archives/edgar/data/1566011/000153450426000004/a991pressrelease-martinezu.htm",
    "qa": ""
   },
   {
    "title": "PBF Energy 3Q26 분기보고서: 운영·Martinez 화재·정비 이력",
    "url": "https://www.sec.gov/Archives/edgar/data/1534504/000153450426000041/pbf-20260930.htm",
    "qa": ""
   }
  ],
  "sections": [
   "7.20",
   "7.22"
  ],
  "cards": [
   "PBF"
  ]
 },
 {
  "id": "martinez-hydrocracker-turnaround-2026",
  "stage": 4,
  "event_date": "2026년 9월 시작·10월 완료",
  "source_date": "2026-10-29",
  "date_note": "",
  "facility": "Martinez 정유소 수첨분해장치",
  "country": "미국",
  "lat": 38.0,
  "lon": -122.1,
  "site": "Martinez",
  "company": "PBF Energy",
  "scope": "개별 장치(수첨분해장치)",
  "type": "정비",
  "what": "9월 시작한 수첨분해장치 정비를 10월 완료했다고 설명했다. 경유 수율에 관련된 장치다.",
  "figure": "PBF 3분기 전체 처리량 약 924,000 b/d(회사 전체 수치이며 이 장치의 손실량과 다르다)",
  "recovery": "정비 완료는 회사 설명이다. 완료된 정비는 앞으로도 계속되는 생산 중단에 해당하지 않는다.",
  "status": "resolved",
  "confidence": "회사 설명(어닝콜)·분기보고서",
  "remaining": "정비 완료 후 처리량·수율·불시정지 재발 여부와 규격별 실제 생산·출하 증가를 확인한다. 회사 전체 처리량은 경유 증산량과 다른 수치다.",
  "sources": [
   {
    "title": "PBF Energy 2026년 10월 29일 어닝콜(운영 발언·질의응답)",
    "url": "",
    "qa": "3·14"
   },
   {
    "title": "PBF Energy 3Q26 분기보고서: 운영·Martinez 화재·정비 이력",
    "url": "https://www.sec.gov/Archives/edgar/data/1534504/000153450426000041/pbf-20260930.htm",
    "qa": ""
   }
  ],
  "sections": [
   "7.20",
   "7.22",
   "10.21"
  ],
  "cards": [
   "PBF"
  ]
 },
 {
  "id": "paulsboro-cdu-turnaround-2026",
  "stage": 4,
  "event_date": "2026년 9월 시작·10월 완료",
  "source_date": "2026-10-29",
  "date_note": "",
  "facility": "Paulsboro 정유소 CDU",
  "country": "미국",
  "lat": 39.8,
  "lon": -75.2,
  "site": "Paulsboro",
  "company": "PBF Energy",
  "scope": "개별 장치(CDU, 원유 증류장치)",
  "type": "정비",
  "what": "9월 시작한 Paulsboro CDU 정비를 10월 완료했다고 설명했다. Martinez 수첨분해장치 정비와는 공정이 다른 사례다.",
  "figure": "",
  "recovery": "정비 완료는 회사 설명이다. 완료된 정비는 앞으로도 계속되는 생산 중단에 해당하지 않는다.",
  "status": "resolved",
  "confidence": "회사 설명(어닝콜)·분기보고서",
  "remaining": "정비 완료 후 처리량·수율·불시정지 재발 여부와 규격별 실제 생산·출하 증가를 확인한다.",
  "sources": [
   {
    "title": "PBF Energy 2026년 10월 29일 어닝콜(운영 발언·질의응답)",
    "url": "",
    "qa": "3·14"
   },
   {
    "title": "PBF Energy 3Q26 분기보고서: 운영·Martinez 화재·정비 이력",
    "url": "https://www.sec.gov/Archives/edgar/data/1534504/000153450426000041/pbf-20260930.htm",
    "qa": ""
   }
  ],
  "sections": [
   "7.22",
   "10.21"
  ],
  "cards": [
   "PBF"
  ]
 },
 {
  "id": "torrance-hydrogen-plants-pbf",
  "stage": 4,
  "event_date": "2026-09-09",
  "source_date": "2026-10-29",
  "date_note": "",
  "facility": "Torrance 정유소 수소 공급 공장",
  "country": "미국",
  "lat": 33.9,
  "lon": -118.3,
  "site": "Torrance",
  "company": "PBF Energy",
  "scope": "수소 공급시설(공장 2개)",
  "type": "수소 공급시설 인수",
  "what": "2026년 9월 9일 Torrance에 수소를 공급하는 공장 2개를 인수했다. 정비·운영 통합으로 신뢰성을 높이려는 조치라고 설명했다.",
  "figure": "수소 공급 공장 2개",
  "recovery": "인수는 끝났다(회사 설명). 인수가 생산능력 2배나 고장 해소를 뜻하지는 않는다.",
  "status": "unknown",
  "confidence": "회사 설명(어닝콜 운영 발언)",
  "remaining": "수소 가동·정비 일정과 수첨분해·탈황 장치의 연동을 확인한다.",
  "sources": [
   {
    "title": "PBF Energy 2026년 10월 29일 어닝콜(운영 발언)",
    "url": "",
    "qa": ""
   }
  ],
  "sections": [
   "7.22"
  ],
  "cards": [
   "PBF"
  ]
 },
 {
  "id": "bp-whiting-external-event",
  "stage": 4,
  "event_date": "전분기(10월 30일 분기공시 기준)",
  "source_date": "2026-10-30",
  "date_note": "",
  "facility": "Whiting 정유소",
  "country": "미국",
  "lat": 41.7,
  "lon": -87.5,
  "site": "Whiting",
  "company": "BP",
  "scope": "범위 미기재(외부 사건 영향)",
  "type": "복구 완료",
  "what": "공식 공시는 전분기 Whiting 외부 사건 영향의 해소와 정비 부담 감소를 설명했다. 준비발언은 운영 신뢰성 개선을 강조했다.",
  "figure": "",
  "recovery": "과거 차질의 해소 사례다(회사 공시).",
  "status": "resolved",
  "confidence": "공식 공시(분기공시)·준비발언, 질의응답은 미반영",
  "remaining": "신뢰도와 능력 이용률은 분모가 달라 숫자 순위로 비교할 수 없다.",
  "sources": [
   {
    "title": "BP 2026년 10월 30일 준비발언·분기공시",
    "url": "",
    "qa": ""
   }
  ],
  "sections": [
   "7.22"
  ],
  "cards": [
   "BP"
  ]
 },
 {
  "id": "phillips66-refining-indicators",
  "stage": 4,
  "event_date": "2026년 3분기",
  "source_date": "2026-10-28",
  "date_note": "",
  "facility": "Phillips 66 정유 부문",
  "country": "",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "Phillips 66",
  "scope": "회사 전체 지표",
  "type": "가동 지표",
  "what": "3분기 이용률 98%, 중간유분 수율 41%를 회사 지표로 제시했다. 공정 변경·전용 배관·장기 용선이 도착원가와 수율에 영향을 준다.",
  "figure": "3분기 이용률 98%, 중간유분 수율 41%(회사 지표)",
  "recovery": "",
  "status": "unknown",
  "confidence": "회사 설명(어닝콜)",
  "remaining": "나프타·경유 전환 여력과 다음 분기 처리량·수율·원료 조합을 확인한다. 상압증류 총능력이 같아도 제품 생산과 실현마진은 다르다. Lake Charles SPR 교환은 별도 행이다.",
  "sources": [
   {
    "title": "Phillips 66 2026년 10월 28일 어닝콜(준비발언·질의응답)",
    "url": "",
    "qa": "1·8·11·22"
   }
  ],
  "sections": [
   "7.22"
  ],
  "cards": [
   "PSX"
  ]
 },
 {
  "id": "marathon-alternative-supply",
  "stage": 4,
  "event_date": "2026년 3분기",
  "source_date": "2026-11-03",
  "date_note": "",
  "facility": "Marathon Petroleum 정유 부문",
  "country": "미국",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "Marathon Petroleum",
  "scope": "회사 전체 지표",
  "type": "대체 공급",
  "what": "3분기 원유능력 이용률은 100%였다. 캐나다 원유, 미국 걸프만 수출, 배관·저장 통합으로 공급 부족 시장에 대응했다.",
  "figure": "3분기 원유능력 이용률 100%",
  "recovery": "미국 정유소 증산은 중동 설비 복구와 다른 대체 공급이다. 거리·제품 규격·해운이 소비지 도착을 제한할 수 있다.",
  "status": "unknown",
  "confidence": "회사 설명(어닝콜)",
  "remaining": "지역별 수출·도착·재고와 다음 정비 시즌을 확인한다.",
  "sources": [
   {
    "title": "Marathon Petroleum 2026년 11월 3일 어닝콜",
    "url": "",
    "qa": "5·9·14"
   }
  ],
  "sections": [
   "7.22"
  ],
  "cards": [
   "MPC"
  ]
 },
 {
  "id": "chevron-middle-distillate-yield",
  "stage": 4,
  "event_date": "",
  "source_date": "2026-10-30",
  "date_note": "",
  "facility": "주요 미국 정유소",
  "country": "미국",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "Chevron",
  "scope": "제품 수율(자체 촉매·증류 분리점 조정)",
  "type": "수율 조정(대응 사례)",
  "what": "주요 미국 정유소에서 자체 촉매와 증류 분리점 조정으로 중간유분 생산을 약 10% 높인 사례를 설명했다.",
  "figure": "중간유분 생산 약 10% 증가(회사 설명. CDU 10% 증설이나 모든 정유소의 수율 상승과 다르다)",
  "recovery": "같은 원유 투입에서 제품 공급을 늘리는 대응이다.",
  "status": "unknown",
  "confidence": "회사 설명(어닝콜)",
  "remaining": "촉매 성능·수율·품질·정비를 확인한다.",
  "sources": [
   {
    "title": "Chevron 2026년 10월 30일 어닝콜",
    "url": "",
    "qa": "5"
   }
  ],
  "sections": [
   "7.22"
  ],
  "cards": [
   "CVX"
  ]
 },
 {
  "id": "exxonmobil-product-normalization-view",
  "stage": 4,
  "event_date": "",
  "source_date": "2026-10-30",
  "date_note": "",
  "facility": "중동 생산·해협 물류, 러시아 정유시설, 중국 수출",
  "country": "중동·러시아·중국",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "ExxonMobil",
  "scope": "제품시장 전반(회사의 시장 진단)",
  "type": "정상화 전망",
  "what": "중동 생산·해협 물류, 러시아 정유시설 복구, 중국 수출을 정상화 요인으로 설명했다.",
  "figure": "",
  "recovery": "회사의 예상 정상화 시점은 확정 복구일과 다르다(회사 전망). 공장 가동 회복, 수출 허용, 소비지 도착이 함께 필요하다.",
  "status": "plan",
  "confidence": "회사 설명(어닝콜)",
  "remaining": "",
  "sources": [
   {
    "title": "ExxonMobil 2026년 10월 30일 어닝콜",
    "url": "",
    "qa": "9"
   }
  ],
  "sections": [
   "7.22"
  ],
  "cards": [
   "XOM"
  ]
 },
 {
  "id": "eia-product-supply-outlook-2026-11",
  "stage": 4,
  "event_date": "",
  "source_date": "2026-11-10",
  "date_note": "",
  "facility": "중동·러시아 정유시설",
  "country": "중동·러시아",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "",
  "scope": "정유시설 전반(수출 가능한 제품 공급)",
  "type": "복구 전망",
  "what": "EIA는 중동·러시아 정유 피해로 수출 가능한 제품 공급이 감소했다고 설명했다.",
  "figure": "제약은 2027년 1분기에 집중되고 이후 완화될 것으로 전망",
  "recovery": "공식 전망이며 복구 완료 기록과 다르다.",
  "status": "plan",
  "confidence": "공식 전망(EIA)",
  "remaining": "설비·장치별 제품 순손실과 복구 단계, 재고·수입으로 보완되는 물량을 확인한다. 공식 전망에 이미 포함된 피해를 추가 시나리오에 다시 더하면 중복 계산이 된다.",
  "sources": [
   {
    "title": "EIA 2026년 11월 10일 공식 전망",
    "url": "",
    "qa": ""
   }
  ],
  "sections": [
   "10.21"
  ],
  "cards": []
 },
 {
  "id": "point-lisas-nutrien",
  "stage": null,
  "event_date": "2025-10-23",
  "source_date": "2026-10-05",
  "date_note": "",
  "facility": "Point Lisas 질소사업",
  "country": "Trinidad",
  "lat": 10.4,
  "lon": -61.5,
  "site": "Point Lisas",
  "company": "Nutrien",
  "scope": "공장 전체(질소비료 시설)",
  "type": "무기한 가동 중단",
  "what": "2025년 10월 23일 통제된 가동 중단에 들어갔고, 2026년 10월 5일 무기한 중단을 결정했다. 회사는 천연가스 제약·불확실성과 항만 접근 문제 등을 설명했다.",
  "figure": "",
  "recovery": "발표된 재가동일이 없다. 재개에는 안정적이고 경제적인 가스 공급, 항만 접근, 회사의 재개 결정이 필요하다.",
  "status": "open",
  "confidence": "공식 발표(Nutrien)",
  "remaining": "재개 결정과 가스계약, 시설 가동, 제품 출하를 확인한다. 회사는 2026년 판매량 가이던스에 이 공장의 생산을 애초 반영하지 않았다고 설명했다. 10월 결정은 새로운 전량 공급 손실이 아니다.",
  "sources": [
   {
    "title": "Nutrien: Point Lisas 무기한 중단·2026년 10월 5일",
    "url": "https://www.nutrien.com/news/press-releases/nutrien-provides-update-on-trinidad-nitrogen-operations-1756",
    "qa": ""
   }
  ],
  "sections": [
   "7.20",
   "10.21"
  ],
  "cards": [
   "NTR"
  ]
 },
 {
  "id": "mosaic-phosphate-curtailment",
  "stage": null,
  "event_date": "",
  "source_date": "2026-11-04",
  "date_note": "",
  "facility": "Bartow·Louisiana 등 인산사업 시설과 광산",
  "country": "미국",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "Mosaic",
  "scope": "인산비료 공장·광산(비료 시설)",
  "type": "감산(원료 조달·경제성)",
  "what": "경제적으로 조달 가능한 황 물량에 맞춰 감산했다고 설명했다. 저가 황 공급량이 미국 전체 설비를 완전 가동하기에는 충분하지 않다고 밝혔고, 남는 재고와 현금을 관리하기 위한 광산 감산도 설명했다.",
  "figure": "4분기 황 계약가격 $615/long ton, 3분기 소비 원가 $715/long ton, 재고 회전 2–3개월(2026년 11월 3일 발표)",
  "recovery": "공장별 재개 날짜는 공개되지 않았다. 재가동에는 황의 조달가격·물량, 암모니아·인광석, 제품 순판매가격, 고정비와 현금흐름이 영향을 준다. 회사는 관련 손익 개선을 주로 2027년 1분기로 예상했다(회사 전망). 이 전망은 공장 전체 정상화일이나 DAP 가격 하락일을 확정한 설명과 다르다.",
  "status": "open",
  "confidence": "공식 공시(실적 발표)·어닝콜",
  "remaining": "조달 물량과 공장별 감산 해제, 재고 소진, 제품 출하를 확인한다. 설비 수리기간만으로 설명되지 않는 감산이며, 황 가격 하락만으로는 인산비료 공급 정상화 여부가 정해지지 않는다. long ton과 metric tonne은 다른 단위다.",
  "sources": [
   {
    "title": "Mosaic: 실적·원료비·재고 회전 설명·2026년 11월 3일",
    "url": "https://www.sec.gov/Archives/edgar/data/1285785/000128578526000139/pressreleaseq32026-ex991.htm",
    "qa": ""
   },
   {
    "title": "Mosaic 2026년 11월 4일 어닝콜",
    "url": "",
    "qa": ""
   }
  ],
  "sections": [
   "7.20",
   "10.21"
  ],
  "cards": [
   "MOS"
  ]
 },
 {
  "id": "cf-industries-nitrogen-constraints",
  "stage": null,
  "event_date": "",
  "source_date": "2026-11",
  "date_note": "",
  "facility": "중동 시설·유럽·Trinidad의 질소 공급 조건",
  "country": "중동·유럽·Trinidad",
  "lat": null,
  "lon": null,
  "site": "",
  "company": "CF Industries",
  "scope": "질소비료(가스·설비·운송 조건)",
  "type": "공급 제약",
  "what": "질소 공급의 제약 요인으로 중동 시설 복구와 운송, 유럽의 가스비, Trinidad의 가스 제약을 들었다.",
  "figure": "",
  "recovery": "",
  "status": "open",
  "confidence": "회사 설명(실적·어닝콜)",
  "remaining": "공장별 실제 가동·수출 가능량·원가와 농가 도착 물량을 확인한다. 질소비료 공급을 지역별 가스·설비·운송 조건으로 나눠 확인한다.",
  "sources": [
   {
    "title": "CF Industries 2026년 11월 실적·어닝콜",
    "url": "",
    "qa": ""
   }
  ],
  "sections": [
   "10.21"
  ],
  "cards": [
   "CF"
  ]
 },
 {
  "id": "ruwais-recovery-view-2026-08",
  "stage": 5,
  "event_date": "",
  "source_date": "2026-08-20",
  "date_note": "",
  "facility": "Ruwais 정유소",
  "country": "UAE",
  "lat": 24.1,
  "lon": 52.7,
  "site": "Ruwais",
  "company": "",
  "scope": "정유소·제품 수출",
  "type": "복구 전망(과거 평가)",
  "what": "8월 20일 평가는 이전 차질이 대체로 해소됐다고 봤다. 주된 제약은 제품 수출·선적이었다.",
  "figure": "",
  "recovery": "8월 20일 작성 당시의 분석 평가다. 후속 운영자료와 대조되지 않았다.",
  "status": "unknown",
  "confidence": "분석기관 평가(Kpler 공개 블로그·2026년 8월 20일)",
  "remaining": "현재 상태가 완전 정상인지 파괴 상태인지는 확인되지 않았다.",
  "sources": [
   {
    "title": "Kpler 공개 블로그: 중동 정유시설의 손상·수출 차질·복구 경로·2026년 8월 20일",
    "url": "https://cn.kpler.com/blog/middle-east-refining-under-pressure-damage-export-disruption-and-a-two-speed-recovery",
    "qa": ""
   }
  ],
  "sections": [
   "7.24"
  ],
  "cards": []
 },
 {
  "id": "sitra-recovery-view-2026-08",
  "stage": 4,
  "event_date": "",
  "source_date": "2026-08-20",
  "date_note": "",
  "facility": "Sitra 정유소",
  "country": "바레인",
  "lat": 26.2,
  "lon": 50.6,
  "site": "Sitra",
  "company": "",
  "scope": "공정 장치·수출",
  "type": "복구 전망(과거 평가)",
  "what": "8월 20일 평가는 공정 장치 피해와 수출 제약이 있다고 봤다.",
  "figure": "당시 처리량 약 100–120천 b/d(평가값)",
  "recovery": "점진적 복구를 전망했다(8월 20일 작성 당시의 분석 전망).",
  "status": "plan",
  "confidence": "분석기관 평가(Kpler 공개 블로그·2026년 8월 20일)",
  "remaining": "현재 처리량은 확인되지 않았다. 설계능력과 당시 처리량은 다른 지표다.",
  "sources": [
   {
    "title": "Kpler 공개 블로그: 중동 정유시설의 손상·수출 차질·복구 경로·2026년 8월 20일",
    "url": "https://cn.kpler.com/blog/middle-east-refining-under-pressure-damage-export-disruption-and-a-two-speed-recovery",
    "qa": ""
   }
  ],
  "sections": [
   "7.24"
  ],
  "cards": []
 },
 {
  "id": "pearl-gtl-train-2-recovery-view-2026-08",
  "stage": null,
  "event_date": "",
  "source_date": "2026-08-20",
  "date_note": "",
  "facility": "Pearl GTL Train 2",
  "country": "카타르",
  "lat": 25.9,
  "lon": 51.6,
  "site": "Ras Laffan",
  "company": "",
  "scope": "GTL 트레인(가스 기반 액체연료 설비)",
  "type": "복구 전망(과거 평가)",
  "what": "8월 20일 평가는 장기 수리가 필요하다고 봤다.",
  "figure": "",
  "recovery": "당시 예상 재개는 2027년 2분기였다. 보장 일정이 아니다(8월 20일 작성 당시의 분석 전망).",
  "status": "plan",
  "confidence": "분석기관 평가(Kpler 공개 블로그·2026년 8월 20일)",
  "remaining": "GTL은 가스 기반 액체연료 설비이며 원유 정유능력에 포함되지 않는다. 회사가 밝힌 가동 목표는 셸 카드에 따로 있다.",
  "sources": [
   {
    "title": "Kpler 공개 블로그: 중동 정유시설의 손상·수출 차질·복구 경로·2026년 8월 20일",
    "url": "https://cn.kpler.com/blog/middle-east-refining-under-pressure-damage-export-disruption-and-a-two-speed-recovery",
    "qa": ""
   }
  ],
  "sections": [
   "7.24"
  ],
  "cards": [
   "SHEL"
  ]
 },
 {
  "id": "ras-laffan-refinery-lr2-view-2026-08",
  "stage": 4,
  "event_date": "",
  "source_date": "2026-08-20",
  "date_note": "",
  "facility": "Ras Laffan Refinery LR2",
  "country": "카타르",
  "lat": 25.9,
  "lon": 51.6,
  "site": "Ras Laffan",
  "company": "",
  "scope": "정유소(원료 공급 포함)",
  "type": "복구 전망(과거 평가)",
  "what": "8월 20일 평가는 상류 설비 공격 뒤 유휴화된 것으로 봤다.",
  "figure": "",
  "recovery": "원료 공급과 정유 장치를 함께 확인한다.",
  "status": "unknown",
  "confidence": "분석기관 평가(Kpler 공개 블로그·2026년 8월 20일)",
  "remaining": "LR2는 이 정유소의 표기다. LR2 제품선 분류와 다르다.",
  "sources": [
   {
    "title": "Kpler 공개 블로그: 중동 정유시설의 손상·수출 차질·복구 경로·2026년 8월 20일",
    "url": "https://cn.kpler.com/blog/middle-east-refining-under-pressure-damage-export-disruption-and-a-two-speed-recovery",
    "qa": ""
   }
  ],
  "sections": [
   "7.24"
  ],
  "cards": []
 }
];
const projectRecords = [
 {
  "id": "aker-bp-slb-onesubsea-lyra",
  "kind": "공급계약",
  "phase": "계약",
  "phase_text": "",
  "announced": "2026-11-05",
  "checked": "2026-11-10",
  "owner": "Aker BP",
  "counterparty": "SLB OneSubsea",
  "project": "Lyra 개발의 해저시스템·장비·서비스",
  "country": "노르웨이",
  "what": "노르웨이 Lyra 개발의 해저 생산시스템·엄빌리컬·서비스 공급계약이다.",
  "size": "",
  "target": "",
  "target_start": null,
  "target_end": null,
  "not_counted": "계약 금액, 개별 장비 인도일·첫 생산일은 이 발표만으로 확인되지 않는다.",
  "followup": "",
  "sources": [
   {
    "title": "SLB 공식 발표: Lyra 공급계약 — 2026년 11월 5일",
    "url": "https://www.slb.com/newsroom/press-release/2026/pr-2026-1105-slb-oss-lyra",
    "qa": ""
   }
  ],
  "sections": [
   "1장"
  ],
  "cards": [
   "SLB"
  ]
 },
 {
  "id": "bp-technipfmc-paleogene-mou",
  "kind": "MoU",
  "phase": "MoU",
  "phase_text": "",
  "announced": "2026-10-20",
  "checked": "2026-11-10",
  "owner": "BP",
  "counterparty": "TechnipFMC",
  "project": "Paleogene 개발용 초고압 해저 생산시스템",
  "country": "",
  "what": "Paleogene 개발용 초고압 해저 트리 시스템 공급 협력의 MoU다.",
  "size": "",
  "target": "",
  "target_start": null,
  "target_end": null,
  "not_counted": "개별 구매주문·인도·매출을 확정 계약으로 세지 않았다. MoU와 확정 수주는 별도다.",
  "followup": "협력 범위 합의, 확정 발주, 제작·설치, 시운전·생산을 단계별로 확인한다.",
  "sources": [
   {
    "title": "TechnipFMC 공식 발표: BP MoU — 2026년 10월 20일",
    "url": "https://www.technipfmc.com/en/investors/financial-news-releases/press-release/technipfmc-and-bp-sign-mou-for-supply-of-20k-subsea-production-systems/",
    "qa": ""
   }
  ],
  "sections": [
   "1장",
   "2.14"
  ],
  "cards": [
   "BP",
   "FTI"
  ]
 },
 {
  "id": "western-gateway-jv-fid",
  "kind": "합작·투자결정",
  "phase": "투자결정",
  "phase_text": "",
  "announced": "2026-08-11",
  "checked": "2026-11-10",
  "owner": "Phillips 66·Kinder Morgan·HF Sinclair",
  "counterparty": "공동투자 합작사업",
  "project": "Western Gateway 제품관 개발",
  "country": "",
  "what": "Western Gateway 합작사업과 최종투자결정이다. 지분은 Phillips 66 49.9%, Kinder Morgan 35.1%, HF Sinclair 15%다.",
  "size": "설계능력 230,000 b/d",
  "target": "2029년 완공 목표",
  "target_start": "2029-01",
  "target_end": "2029-12",
  "not_counted": "인허가 조건이 남아 있다. 설계능력 230,000 b/d를 현재 수송량에 더하지 않았다. 신설 구간과 기존 배관 전환이 포함돼 있어 설계능력을 세계 배관능력의 순증으로 전부 더하지 않았다.",
  "followup": "",
  "sources": [
   {
    "title": "Phillips 66 공식 발표: Western Gateway 합작사업·최종투자결정 — 2026년 8월 11일",
    "url": "https://investor.phillips66.com/financial-information/news-releases/news-release-details/2026/Phillips-66-Kinder-Morgan-and-HF-Sinclair-Announce-Final-Investment-Decision-for-Western-Gateway-Pipeline/default.aspx",
    "qa": ""
   }
  ],
  "sections": [
   "1장"
  ],
  "cards": [
   "PSX",
   "KMI",
   "DINO"
  ]
 },
 {
  "id": "enterprise-frac-15",
  "kind": "증설",
  "phase": "계획",
  "phase_text": "",
  "announced": "2026-10-29",
  "checked": "2026-11-10",
  "owner": "Enterprise Products",
  "counterparty": "",
  "project": "Frac 15(NGL 분리시설)",
  "country": "",
  "what": "Frac 15를 2028년에 투입할 계획이고 설비 리드타임이 약 6개월 늘었다고 설명했다. NGL 처리능력 확장의 일정 문제다.",
  "size": "",
  "target": "2028년 투입 계획",
  "target_start": "2028-01",
  "target_end": "2028-12",
  "not_counted": "리드타임 연장은 기존 시설의 중단기간과 다르다. 이 설명만으로 현재 원유관의 파손은 확인되지 않는다.",
  "followup": "제품별 분리능력·설비 인도·시운전·상업가동일을 확인한다.",
  "sources": [
   {
    "title": "Enterprise Products 어닝콜 · 2026년 10월 29일",
    "url": "",
    "qa": "12·16"
   }
  ],
  "sections": [
   "4.5"
  ],
  "cards": [
   "EPD"
  ]
 },
 {
  "id": "enterprise-export-expansion",
  "kind": "증설",
  "phase": "건설·시운전",
  "phase_text": "계약·시운전 단계",
  "announced": "2026-10-29",
  "checked": "2026-11-10",
  "owner": "Enterprise Products",
  "counterparty": "",
  "project": "수출 터미널 확장",
  "country": "",
  "what": "분리시설과 별도인 수출 확장은 계약·시운전 단계라고 설명했다.",
  "size": "",
  "target": "",
  "target_start": null,
  "target_end": null,
  "not_counted": "",
  "followup": "시운전·상업가동일을 확인한다.",
  "sources": [
   {
    "title": "Enterprise Products 어닝콜 · 2026년 10월 29일",
    "url": "",
    "qa": "12·16"
   }
  ],
  "sections": [
   "4.5"
  ],
  "cards": [
   "EPD"
  ]
 },
 {
  "id": "enterprise-permian-gathering",
  "kind": "기타(가격·채산성에 따른 생산 제약)",
  "phase": "unknown",
  "phase_text": "생산 복귀·처리량 회복",
  "announced": "2026-10-29",
  "checked": "2026-11-10",
  "owner": "Enterprise Products",
  "counterparty": "",
  "project": "Permian 집하",
  "country": "",
  "what": "Waha 가격 변동에 따른 이전의 경제적 생산 중단 이후 생산이 돌아온 영향도 처리량 회복에 포함됐다. 물리적 관로 수리가 없어도 물량이 돌아올 수 있다.",
  "size": "",
  "target": "",
  "target_start": null,
  "target_end": null,
  "not_counted": "처리량 감소를 물리적 배관 파손으로 분류하지 않았다.",
  "followup": "가스가격·생산자 경제성·집하량을 함께 비교한다.",
  "sources": [
   {
    "title": "Enterprise Products 어닝콜 · 2026년 10월 29일",
    "url": "",
    "qa": "21"
   }
  ],
  "sections": [
   "4.5"
  ],
  "cards": [
   "EPD"
  ]
 },
 {
  "id": "pbf-california-m-70",
  "kind": "기타(배관 병목으로 분류하지 않은 사례)",
  "phase": "unknown",
  "phase_text": "여유 수송능력 있음",
  "announced": "2026-10-29",
  "checked": "2026-11-10",
  "owner": "PBF Energy",
  "counterparty": "",
  "project": "M-70",
  "country": "캘리포니아",
  "what": "PBF는 M-70에 여유 수송능력이 있고 당시 제약은 원유 생산 쪽이라고 설명했다.",
  "size": "",
  "target": "",
  "target_start": null,
  "target_end": null,
  "not_counted": "배관 이름이 언급됐다는 이유로 수송 병목으로 분류하지 않았다. 추가 배관 논의만으로 현재 반출능력 부족은 확인되지 않는다.",
  "followup": "지역 원유 생산량과 M-70 수송량·잔여능력을 확인한다.",
  "sources": [
   {
    "title": "PBF Energy 어닝콜 · 2026년 10월 29일",
    "url": "",
    "qa": "9"
   }
  ],
  "sections": [
   "4.5"
  ],
  "cards": [
   "PBF"
  ]
 },
 {
  "id": "kinder-morgan-gas-pipeline-projects",
  "kind": "증설",
  "phase": "unknown",
  "phase_text": "프로젝트 일정·계약 설명",
  "announced": "2026-10-21",
  "checked": "2026-11-10",
  "owner": "Kinder Morgan",
  "counterparty": "",
  "project": "가스관·고객 연결",
  "country": "",
  "what": "확장 수요와 프로젝트 일정·계약을 설명했다. 미래 가스 수송능력과 수요처 연결에 관한 사업이다.",
  "size": "",
  "target": "",
  "target_start": null,
  "target_end": null,
  "not_counted": "증설 수요만으로 특정 원유관의 현재 중단량은 확인할 수 없다. 가스 증설 필요와 현재 원유 수송 중단은 별개다.",
  "followup": "배관별 가동일·계약 물량·접속 고객을 확인한다.",
  "sources": [
   {
    "title": "Kinder Morgan 어닝콜 · 2026년 10월 21일",
    "url": "",
    "qa": ""
   }
  ],
  "sections": [
   "4.5"
  ],
  "cards": [
   "KMI"
  ]
 },
 {
  "id": "enbridge-system-new-projects",
  "kind": "증설",
  "phase": "unknown",
  "phase_text": "신규 프로젝트 투입 설명",
  "announced": "2026-11-06",
  "checked": "2026-11-10",
  "owner": "Enbridge",
  "counterparty": "",
  "project": "원유·가스 시스템",
  "country": "",
  "what": "높은 수송 수요와 신규 프로젝트 투입을 설명했다. 운송망 확충에 관한 설명이며, 회사 성장 전망과 개별 관로의 운영 상태는 다른 지표다.",
  "size": "",
  "target": "",
  "target_start": null,
  "target_end": null,
  "not_counted": "회사 전체 물량 호조로 모든 관로의 실시간 무차질까지 확인되지는 않는다.",
  "followup": "Mainline·터미널·가스관 운영 공지를 개별 대조한다.",
  "sources": [
   {
    "title": "Enbridge 어닝콜 · 2026년 11월 6일",
    "url": "",
    "qa": ""
   }
  ],
  "sections": [
   "4.5"
  ],
  "cards": [
   "ENB"
  ]
 },
 {
  "id": "valero-st-charles-fcc-optimization",
  "kind": "기타(FCC 최적화 사업)",
  "phase": "가동",
  "phase_text": "3Q26 완료·가동 중",
  "announced": "2026-10-22",
  "checked": "2026-11-07",
  "owner": "Valero",
  "counterparty": "",
  "project": "St. Charles FCC 최적화",
  "country": "미국",
  "what": "FCC 최적화 사업을 3Q26에 완료하고 가동 중이라고 했고, 고가치 alkylate·휘발유 생산 증가를 설명했다.",
  "size": "사업비 $230m, 개별 증설 b/d 미제시",
  "target": "",
  "target_start": null,
  "target_end": null,
  "not_counted": "사업비를 처리능력으로 환산하지 않았다. 공장 전체의 신규 증설과 구분했다.",
  "followup": "실제 가동·신뢰성·제품 출하와 연결한다.",
  "sources": [
   {
    "title": "Valero 어닝콜 · 2026년 10월 22일",
    "url": "",
    "qa": ""
   },
   {
    "title": "Valero 3Q26: St. Charles·Port Arthur 장치 상태",
    "url": "https://investorvalero.com/news/news-details/2026/Valero-Energy-Reports-Third-Quarter-2026-Results/default.aspx",
    "qa": ""
   }
  ],
  "sections": [
   "7.32",
   "7.18"
  ],
  "cards": [
   "VLO"
  ]
 },
 {
  "id": "valero-port-arthur-dht-repair",
  "kind": "수리",
  "phase": "수리 중",
  "phase_text": "",
  "announced": "2026-10-22",
  "checked": "2026-11-07",
  "owner": "Valero",
  "counterparty": "",
  "project": "Port Arthur DHT 수리",
  "country": "미국",
  "what": "DHT 수리가 진행 중이다. 정유소 총 처리량이 정상 수준이라는 설명과 DHT 수리 진행이 함께 나왔다.",
  "size": "추정 수리비 약 $250m",
  "target": "연말 완료 목표",
  "target_start": "2026-12",
  "target_end": "2026-12",
  "not_counted": "이 자료만으로 특정 제품 감소량은 확인되지 않는다.",
  "followup": "",
  "sources": [
   {
    "title": "Valero 어닝콜 · 2026년 10월 22일",
    "url": "",
    "qa": ""
   },
   {
    "title": "Valero 3Q26: St. Charles·Port Arthur 장치 상태",
    "url": "https://investorvalero.com/news/news-details/2026/Valero-Energy-Reports-Third-Quarter-2026-Results/default.aspx",
    "qa": ""
   }
  ],
  "sections": [
   "7.32"
  ],
  "cards": [
   "VLO"
  ]
 },
 {
  "id": "marathon-galveston-bay-distillate-hydrotreater",
  "kind": "증설",
  "phase": "계획",
  "phase_text": "",
  "announced": "2026-11-03",
  "checked": "2026-11-07",
  "owner": "Marathon Petroleum",
  "counterparty": "",
  "project": "Galveston Bay 중간유분 수첨처리",
  "country": "미국",
  "what": "Galveston Bay 중간유분 수첨처리 계획 사업이다. 설계 90,000 b/d는 미래 장치 투입능력이다.",
  "size": "설계 90,000 b/d",
  "target": "2027년 말까지 가동 목표",
  "target_start": "2027-12",
  "target_end": "2027-12",
  "not_counted": "설계 90,000 b/d를 현재 원유 증류능력이나 추가 경유 생산량으로 세지 않았다. 가동 개시·신뢰성·출하가 확인되기 전이어서 계획능력을 현재 공급에 더하지 않았다.",
  "followup": "가동 개시·신뢰성·출하를 확인한다.",
  "sources": [
   {
    "title": "Marathon Petroleum 어닝콜 · 2026년 11월 3일",
    "url": "",
    "qa": ""
   },
   {
    "title": "Marathon Petroleum 3Q26: Galveston Bay·Garyville 계획",
    "url": "https://ir.marathonpetroleum.com/investor/news-releases/news-details/2026/Marathon-Petroleum-Corp--Reports-Third-Quarter-2026-Results/default.aspx",
    "qa": ""
   }
  ],
  "sections": [
   "7.32"
  ],
  "cards": [
   "MPC"
  ]
 },
 {
  "id": "marathon-garyville-debottleneck",
  "kind": "증설",
  "phase": "계획",
  "phase_text": "",
  "announced": "2026-11-03",
  "checked": "2026-11-07",
  "owner": "Marathon Petroleum",
  "counterparty": "",
  "project": "Garyville 병목 해소",
  "country": "미국",
  "what": "Garyville 병목 해소 계획 사업이다. 원유 처리 +30,000 b/d와 수출 premium 휘발유 +10,000 b/d를 제시했다.",
  "size": "원유 처리 +30,000 b/d, 수출 premium 휘발유 +10,000 b/d",
  "target": "2027년 말 목표",
  "target_start": "2027-12",
  "target_end": "2027-12",
  "not_counted": "두 수치는 원료 투입과 제품 산출이므로 합계 +40,000 b/d 신규 공급으로 계산하지 않았다. 가동 개시·신뢰성·출하가 확인되기 전이어서 계획능력을 현재 공급에 더하지 않았다.",
  "followup": "가동 개시·신뢰성·출하를 확인한다.",
  "sources": [
   {
    "title": "Marathon Petroleum 어닝콜 · 2026년 11월 3일",
    "url": "",
    "qa": ""
   },
   {
    "title": "Marathon Petroleum 3Q26: Galveston Bay·Garyville 계획",
    "url": "https://ir.marathonpetroleum.com/investor/news-releases/news-details/2026/Marathon-Petroleum-Corp--Reports-Third-Quarter-2026-Results/default.aspx",
    "qa": ""
   }
  ],
  "sections": [
   "7.32"
  ],
  "cards": [
   "MPC"
  ]
 }
];
