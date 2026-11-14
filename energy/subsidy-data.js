'use strict';
// 연료 보조금·재정 desk content: each country's 2026 fuel-subsidy budget,
// spending, oil-price assumption, measures and fiscal effect, every figure
// with its source. Rendered by subsidy.js.
const fuelSubsidy = {
 "as_of": "2026-11-07",
 "regions": [
  [
   "sea",
   "동남아"
  ],
  [
   "south_asia",
   "남아시아"
  ],
  [
   "mena_africa",
   "중동·아프리카"
  ],
  [
   "east_asia",
   "한국·일본·중국"
  ]
 ],
 "notes": {
  "table": "금액은 각국 통화 기준이고, 달러 환산은 카드에 적은 날짜의 환율로 계산했다(출처가 밝힌 달러 금액은 카드 주석). 보조 범위는 인도네시아가 전력 포함, 베트남이 세수 감소, 태국이 기금 적자, 방글라데시가 국영사 손실로 나라마다 다르다. 수치는 카드에 원문 확인을 적은 항목을 빼면 언론 보도·2차 자료 기준이다.",
  "bars": "인도네시아(전력 포함)·한국(최고가격제 손실보전만)·일본(예비비로 기금에 적립한 금액)은 보조 범위가 달라 막대 길이를 그대로 비교할 수 없다."
 },
 "countries": [
  {
   "code": "ID",
   "name_kr": "인도네시아",
   "mechanism": "정부가 Pertalite(RON90)·Biosolar·LPG 3kg 소매가와 일부 전기요금을 고정하고, 국영 Pertamina와 PLN이 시장가와의 차액을 먼저 부담한다. 예산의 '에너지 보조금' 항목은 Solar 리터당 고정보조금(2026년 Rp1,000)과 LPG 3kg·보조 대상 전력요금의 단가 차액을 지급한다. 고정 소매가와 원가의 나머지 차액은 '보상금(kompensasi)'으로 따로 정산하며, 보조금 항목이 없는 Pertalite는 전액 보상금으로 처리한다. 재무부는 2026년부터 보조금과 보상금을 월별로 지급하고, 미지급분은 Pertamina·PLN의 대정부 미수금으로 남는다.",
   "budget_oil_price": {
    "benchmark": "ICP",
    "value": 70,
    "unit": "USD/bbl",
    "year": 2026,
    "note": "APBN 2026 가정이다. 환율 가정은 Rp16,500/USD다. 실제 ICP는 2026년 8월 US$89.43, 9월 US$112.81이다. 1~10월 평균 ICP는 US$93, 평균 환율은 Rp17,508/USD다(재무부, 2026-11-03). SKK Migas는 연말 ICP를 US$95~100으로 본다.",
    "src": [
     15,
     7,
     16,
     17,
     18,
     54
    ],
    "basis": "APBN 2026"
   },
   "items": [
    {
     "label": "에너지 보조금+보상금(연료·LPG·전력)",
     "year": 2026,
     "kind": "budget",
     "amount": 338,
     "currency": "IDR",
     "unit": "조 루피아",
     "usd_bn": 18.6709,
     "usd_note": "계산: 2026-11-07 환율 18,103.00 IDR/USD",
     "pct_gdp": 1.31,
     "pct_note": "계산값: 예산 적자 Rp689.1조=GDP 2.68%에서 역산한 명목 GDP 약 Rp25,713조 대비",
     "note": "재무장관 수아하실 나자라가 밝힌 APBN 2026 원예산이다. 보조금 항목 Rp210.06조를 뺀 보상금 예산은 원문 미확인이다. Indonesia Business Post 등은 원예산을 Rp381.3조로 적어 불일치한다.",
     "src": [
      7,
      9,
      10,
      56
     ]
    },
    {
     "label": "에너지 보조금(연료·LPG·전력, 보상금 제외)",
     "year": 2026,
     "kind": "budget",
     "amount": 210.06,
     "currency": "IDR",
     "unit": "조 루피아",
     "usd_bn": 11.6036,
     "usd_note": "계산: 2026-11-07 환율 18,103.00 IDR/USD",
     "pct_gdp": 0.82,
     "pct_note": "계산값: 예산 적자 Rp689.1조=GDP 2.68%에서 역산한 명목 GDP 약 Rp25,713조 대비",
     "note": "JBT(Solar·등유) Rp25.14조, LPG 3kg Rp80.26조, 전력 Rp104.64조로 구성된다. 연료+LPG는 Rp105.4조다. 예산안(2025-08) 보도 수치이며 확정치 표기는 Rp210.06조와 Rp210.1조가 혼재한다.",
     "src": [
      12,
      13,
      14
     ]
    },
    {
     "label": "연료 보조금(JBT: Solar·등유)",
     "year": 2026,
     "kind": "budget",
     "amount": 25.14,
     "currency": "IDR",
     "unit": "조 루피아",
     "usd_bn": 1.3887,
     "usd_note": "계산: 2026-11-07 환율 18,103.00 IDR/USD",
     "note": "Solar 리터당 고정보조금 Rp1,000을 반영한다. 물량은 Solar 18,636.5천kl, 등유 526천kl다. Pertalite는 보조금 항목이 없고 보상금으로 처리한다.",
     "src": [
      12,
      13,
      14
     ]
    },
    {
     "label": "LPG 3kg 보조금",
     "year": 2026,
     "kind": "budget",
     "amount": 80.26,
     "currency": "IDR",
     "unit": "조 루피아",
     "usd_bn": 4.4335,
     "usd_note": "계산: 2026-11-07 환율 18,103.00 IDR/USD",
     "note": "물량은 예산안 보도 기준 8.31백만t이다. ESDM은 APBN 2026 쿼터를 8백만t으로 언급했다.",
     "src": [
      12,
      13,
      14,
      36
     ]
    },
    {
     "label": "전력 보조금",
     "year": 2026,
     "kind": "budget",
     "amount": 104.64,
     "currency": "IDR",
     "unit": "조 루피아",
     "usd_bn": 5.7803,
     "usd_note": "계산: 2026-11-07 환율 18,103.00 IDR/USD",
     "note": "요금 미조정분 보상금은 별도다. 연료 부분은 JBT 항목으로 따로 집계된다.",
     "src": [
      12,
      13,
      14
     ]
    },
    {
     "label": "에너지 보조금+보상금 증액분(반기보고서 전망)",
     "year": 2026,
     "kind": "estimate",
     "amount": 132,
     "currency": "IDR",
     "unit": "조 루피아",
     "usd_bn": 7.2916,
     "usd_note": "계산: 2026-11-07 환율 18,103.00 IDR/USD",
     "note": "2026-07-07 국회 예산위원회에 제출한 반기보고서 전망이다. 세출 전망 Rp3,942.4조에 포함됐다. 원예산 Rp338조 기준이면 전망치는 Rp470조가 된다(계산값).",
     "src": [
      23,
      24
     ]
    },
    {
     "label": "에너지 보조금+보상금(연료·LPG·전력)",
     "year": 2026,
     "kind": "revised",
     "amount": 500,
     "currency": "IDR",
     "unit": "조 루피아",
     "usd_bn": 27.6197,
     "usd_note": "계산: 2026-11-07 환율 18,103.00 IDR/USD; 출처 표기 약 275.6억 달러",
     "pct_gdp": 1.94,
     "pct_note": "계산값: 반기보고서 전망 적자 Rp734.3조=GDP 2.85%에서 역산한 명목 GDP 약 Rp25,765조 대비",
     "note": "2026-11-03 재무부 발표다(KSSK 기자회견). 원예산 대비 Rp162조 늘었다. 1~10월 평균 ICP US$93, 평균 환율 Rp17,508/USD를 근거로 들었다. PLN·Pertamina 월별 지급 기준이며 최종 소요는 연말에 산정한다. 수아하실은 2026-08-05에는 연말 소요를 Rp525.9조로 전망했다(IDN Times·Fortune IDN). APBN-P(법 개정) 여부는 미확인이다.",
     "src": [
      7,
      8,
      9,
      10,
      11
     ],
     "kind_label": "수정 전망(11월 3일)"
    },
    {
     "label": "에너지 보조금+보상금 지급액",
     "year": 2026,
     "kind": "realised",
     "amount": 333.9,
     "currency": "IDR",
     "unit": "조 루피아",
     "period_end": "2026-10-30",
     "usd_bn": 18.4445,
     "usd_note": "계산: 2026-11-07 환율 18,103.00 IDR/USD",
     "pct_gdp": 1.3,
     "pct_note": "계산값: 반기보고서 전망 명목 GDP 약 Rp25,765조 대비",
     "note": "10월 30일까지 지급액이다. 상향된 기준 Rp500조의 66.8%다(계산값).",
     "src": [
      8,
      11,
      7
     ]
    },
    {
     "label": "보조금+보상금 총액(비에너지 포함 추정)",
     "year": 2026,
     "kind": "realised",
     "amount": 376.8,
     "currency": "IDR",
     "unit": "조 루피아",
     "period_end": "2026-09-30",
     "usd_bn": 20.8142,
     "usd_note": "계산: 2026-11-07 환율 18,103.00 IDR/USD",
     "note": "보조금 Rp222.5조, 보상금 Rp154.4조이며 APBN 대비 84.3%다. 전년 동기 Rp244.6조보다 54.1% 많다. 9월 말 보조 연료 판매는 13.40백만kl로 9.1% 늘었고, 전력 보조 고객은 43.4백만이다. 언론은 '에너지'로 표기했으나 Tridge 요약은 비료 지원을 함께 들었다. 84.3%로 역산한 분모 약 Rp447조는 에너지 원예산 Rp338조보다 크다(계산값).",
     "src": [
      1,
      2,
      3,
      4,
      5,
      6
     ]
    },
    {
     "label": "보조금+보상금 총액(비에너지 포함 추정)",
     "year": 2026,
     "kind": "realised",
     "amount": 331.4,
     "currency": "IDR",
     "unit": "조 루피아",
     "period_end": "2026-08-31",
     "usd_bn": 18.3064,
     "usd_note": "계산: 2026-11-07 환율 18,103.00 IDR/USD",
     "note": "전년 동기보다 52.1% 많고 최대 수령처는 PLN·Pertamina다. 2025년 8월 말 비교치 Rp218조(보조금·보상금 총예산 Rp498.8조의 43.7%)와 증가율이 맞아 비에너지 포함 총액으로 판단한다.",
     "src": [
      31,
      32,
      33,
      57,
      52
     ]
    },
    {
     "label": "에너지 보조금+보상금(연료·LPG·전력)",
     "year": 2025,
     "kind": "budget",
     "amount": 394.3,
     "currency": "IDR",
     "unit": "조 루피아",
     "note": "APBN 2025 예산이다.",
     "src": [
      49,
      48
     ]
    },
    {
     "label": "에너지 보조금+보상금 지급액",
     "year": 2025,
     "kind": "realised",
     "amount": 192.2,
     "currency": "IDR",
     "unit": "조 루피아",
     "period_end": "2025-10-03",
     "note": "예산의 49%다. 이 중 보상금은 Rp69.2조다. 2025년 연간 실적은 미확인이다.",
     "src": [
      48
     ]
    },
    {
     "label": "보조금+보상금 총액(비에너지 포함 추정)",
     "year": 2025,
     "kind": "realised",
     "amount": 244.6,
     "currency": "IDR",
     "unit": "조 루피아",
     "period_end": "2025-09-30",
     "note": "2026년 9월 실적 보도의 전년 동기 비교치다.",
     "src": [
      1,
      2
     ]
    },
    {
     "label": "보조금+보상금 총액(비료 포함)",
     "year": 2025,
     "kind": "realised",
     "amount": 345.1,
     "currency": "IDR",
     "unit": "조 루피아",
     "period_end": "2025-11-30",
     "note": "Kontan 제목은 '에너지'로 표기했으나 기사 본문은 비료 포함으로 전한다. 국영기업 지급 기준이다.",
     "src": [
      50
     ]
    },
    {
     "label": "보조금 총액(에너지+비에너지, 보상금 제외)",
     "year": 2025,
     "kind": "realised",
     "amount": 281.6,
     "currency": "IDR",
     "unit": "조 루피아",
     "note": "2025년 연간 잠정 실적으로 목표 대비 91.4%다. 11월 말 보조금+보상금 지급이 이미 Rp345.1조여서 보상금 제외 수치로 판단한다.",
     "src": [
      51,
      50
     ]
    }
   ],
   "prices": [
    {
     "product": "Pertalite (RON90, 보상금 대상)",
     "price": 10000,
     "unit": "IDR/ℓ",
     "date": "2026-11-06",
     "note": "2026년 동결 상태다. ESDM 장관은 연말까지 동결을 밝혔다.",
     "src": [
      42,
      43,
      41,
      58
     ]
    },
    {
     "product": "Biosolar (보조 경유)",
     "price": 6800,
     "unit": "IDR/ℓ",
     "date": "2026-11-06",
     "note": "2026년 동결 상태다.",
     "src": [
      42,
      43,
      58
     ]
    },
    {
     "product": "Pertamax (RON92, 비보조)",
     "price": 16250,
     "unit": "IDR/ℓ",
     "date": "2026-06-10",
     "note": "Rp12,300에서 인상했다.",
     "src": [
      39,
      40
     ]
    },
    {
     "product": "Pertamax (RON92, 비보조, 자카르타)",
     "price": 15950,
     "unit": "IDR/ℓ",
     "date": "2026-11-06",
     "note": "지역별 Rp14,950~16,650이다.",
     "src": [
      44,
      42,
      43
     ]
    }
   ],
   "measures_2026": [
    {
     "date": "2026-01-27",
     "text": "BPH Migas가 2026년 쿼터를 Pertalite 29,267,947kl(전년 대비 −6.28%), 보조 Solar 18,636,500kl(−2.32%), 등유 526천kl로 정했다.",
     "src": [
      34,
      35
     ]
    },
    {
     "date": "2026-03-31",
     "text": "정부는 국제유가 급등에도 4월 1일부터 보조·비보조 연료 소매가를 올리지 않는다고 발표했다.",
     "src": [
      38
     ]
    },
    {
     "date": "2026-06-10",
     "text": "Pertamina는 비보조 Pertamax(RON92)를 리터당 Rp12,300에서 Rp16,250으로 올렸다. Pertalite Rp10,000과 Biosolar Rp6,800은 동결했다.",
     "src": [
      39,
      40
     ]
    },
    {
     "date": "2026-08-27",
     "text": "ESDM·Pertamina는 7월 말 추세 기준 연간 판매가 쿼터를 Solar 약 9.4%, Pertalite 약 1.7%, LPG 3kg 약 8.5% 넘는다고 추정했다.",
     "src": [
      36
     ]
    },
    {
     "date": "2026 (일자 미확인)",
     "text": "석유가스총국장 Laode Sulaeman은 Solar 추가 쿼터를 처리 중이며 규모는 미발표라고 밝혔다. Pertalite 추가 쿼터는 산정 중이다.",
     "src": [
      37
     ]
    },
    {
     "date": "2026",
     "text": "재무부는 PLN·Pertamina에 대한 보조금·보상금 지급을 월별로 바꿨다.",
     "src": [
      11,
      31
     ]
    },
    {
     "date": "2026-11-03",
     "text": "재무부는 에너지 보조금·보상금 지급 기준을 Rp338조에서 Rp500조로 Rp162조 올렸다. 1~10월 평균 ICP US$93과 평균 환율 Rp17,508/USD를 근거로 들었다.",
     "src": [
      7,
      8,
      9,
      10,
      11
     ]
    },
    {
     "date": "2026-11-06",
     "text": "Pertalite Rp10,000/ℓ, Biosolar Rp6,800/ℓ는 동결 상태다. ESDM 장관 바흘릴은 보조 연료가를 연말까지 올리지 않는다고 밝혔다.",
     "src": [
      41,
      42,
      43,
      58
     ]
    }
   ],
   "fiscal_impact": [
    {
     "text": "반기보고서(2026-07-07 국회 예산위원회 제출)는 2026년 적자를 Rp734.3조(GDP 2.85%)로 전망했다. 예산 Rp689.1조(GDP 2.68%)보다 Rp45.2조 크고, 정부는 법정 상한 3% 이내 유지를 밝혔다.",
     "src": [
      23,
      24,
      25
     ]
    },
    {
     "text": "같은 전망의 세출은 Rp3,942.4조이고 에너지 보조금·보상금 Rp132조 증액을 포함한다.",
     "src": [
      23,
      24
     ]
    },
    {
     "text": "9월 말 누적 적자는 Rp319조(GDP 1.24%)로 전년 동기 Rp371.5조보다 14.13% 작다. 수아하실 재무장관은 연간 목표 경로 안에 있다고 밝혔다.",
     "src": [
      26,
      27
     ]
    },
    {
     "text": "상반기 적자는 Rp196.5조(GDP 0.76%)이고 세입은 Rp1,459.4조로 예산 대비 46.3%다.",
     "src": [
      24
     ]
    },
    {
     "text": "Pertamina의 대정부 BBM·LPG 3kg 보조금·보상금 미수금은 2026년 8월 초 Rp166.84조다. 보조금 Rp24.4조, 보상금 Rp142.44조이며 2025년 이월분 Rp54.4조를 포함한다.",
     "src": [
      28,
      29,
      30
     ]
    },
    {
     "text": "같은 시점 Pertamina의 2026년 보조금·보상금 발생액은 Rp236.98조이고, 재무부 지급액은 보조금 Rp63.49조, 보상금 Rp61.3조다.",
     "src": [
      28
     ]
    },
    {
     "text": "재무부는 11월 3일 올린 Rp500조를 연말까지 PLN·Pertamina 월별 지급 기준으로 쓰고, 최종 소요는 연말에 산정한다.",
     "src": [
      7,
      9,
      11,
      31
     ]
    },
    {
     "text": "OECD(Economic Outlook 2026년 1호)는 인도네시아 재정적자가 2025년 GDP 2.9%에서 2026년 3.0%로 커진다고 전망했다.",
     "src": [
      21
     ]
    },
    {
     "text": "Purbaya 당시 재무장관은 2026-03-31~04-01 유가가 연말까지 평균 US$100이어도 적자가 GDP 2.9%로 3% 아래에 머문다고 밝혔다.",
     "src": [
      45,
      46
     ]
    },
    {
     "text": "BNP Paribas는 다른 지출을 줄이지 않으면 연료 보조금 때문에 2026년 적자가 3% 상한을 넘을 수 있다고 경고했다. 발표일은 미확인이다.",
     "src": [
      47
     ]
    },
    {
     "text": "2025년 적자(잠정)는 Rp695.1조(GDP 2.92%)다.",
     "src": [
      53
     ]
    },
    {
     "text": "2027년 에너지 보조금은 정부안 Rp272.9조에서 국회 합의 Rp261.5조로 줄었다. BBM·LPG 3kg은 Rp142.83조에서 Rp131.39조로 줄고 전력은 Rp130.1조로 유지됐다.",
     "src": [
      54,
      55,
      56
     ]
    }
   ],
   "sensitivity": [
    {
     "text": "정부는 ICP가 US$1/bbl 오르면 세출이 약 Rp10.3조, 세입이 약 Rp3.5조 늘어 적자가 약 Rp6.8조 커진다고 추정한다(KSSK 기자회견 보도, 날짜 미확인).",
     "src": [
      19,
      20
     ]
    },
    {
     "text": "루피아가 달러당 Rp100 절하되면 세출 Rp6.1조, 세입 Rp5.3조가 늘어 적자는 Rp0.8조 커진다.",
     "src": [
      19,
      20
     ]
    },
    {
     "text": "OECD는 연료가격 동결이 유지되면 유가 상승이 연료 보조금을 통해 적자를 GDP 0.6%p 늘린다고 추정했다.",
     "src": [
      21
     ]
    },
    {
     "text": "IESR(Deon Arinaldo)은 유가가 평균 US$100을 넘고 환율이 Rp18,000/USD에 이르면 에너지 보조금·보상금이 Rp600조~700조로 늘 수 있다고 2026-10-30 밝혔다.",
     "src": [
      22
     ]
    }
   ],
   "open_items": [
    "2025년 에너지 보조금+보상금 연간 실적(2026-01-08 잠정 결산 발표)은 미확인이다. Datasatu가 재무부를 인용한 2025년 에너지 보조금 Rp185.20조는 1차 자료 미확인이다.",
    "APBN 2026 에너지 보조금+보상금 원예산은 재무장관 발언 기준 Rp338조이나 Indonesia Business Post 등은 Rp381.3조로 적는다. 보상금 예산액(Rp338조 기준 역산 시 약 Rp128조)은 원문 미확인이다.",
    "9월 말 Rp376.8조(보조금+보상금)와 10월 30일 Rp333.9조(에너지 지급액)는 범위가 다르다. 전자는 비료 등 비에너지 포함 총액일 가능성이 높으나 재무부 슬라이드 원문은 미확인이다. 2026년 BBM·LPG·전력별 집행 내역도 미확인이다.",
    "5월 말 보조금·보상금 Rp203.7조(전년 대비 208.2% 증가)와 상반기 Rp233조(APBN 대비 52.1%, 전년 대비 44.4% 증가, 보조금 약 Rp116조·보상금 약 Rp116.9조)는 역산 분모가 약 Rp447조로 9월 84.3%와 같은 보조금·보상금 총액(비에너지 포함) 기준이다. Rp203.7조(5월)→Rp233조(6월)→Rp331.4조(8월)→Rp376.8조(9월) 누적 계열과 맞는다.",
    "반기보고서(2026-07)의 ICP 전망치는 미확인이다. CORE가 정부 전망 ICP를 약 US$83로 언급했다는 보도만 있다. 2026년 3~7월 월별 ICP도 미확인이다.",
    "ICP·환율 민감도(US$1당 세출 Rp10.3조, 적자 Rp6.8조)를 발표한 KSSK 기자회견 날짜",
    "Purbaya 당시 재무장관이 Reuters에 'ICP US$90~92면 적자 GDP 3.6%'라고 말했다는 2차 요약(VT Markets 경유)은 미확인이다. 같은 장관의 3월 31일~4월 1일 발언(US$100에서도 2.9%)과 상충한다.",
    "Fitch·Moody's·S&P와 IMF의 2026년 인도네시아 보조금·적자 관련 코멘트",
    "LPG 3kg 소매 상한가(HET)와 2026년 분기별 전기요금 조정 결과는 미확인이다. Petromindo가 제목에 적은 4월까지 전력 보조금 비용 Rp59.9조는 범위가 미확인이다.",
    "Solar 추가 쿼터 규모는 발표되지 않았고 Pertalite 추가 쿼터는 산정 중이다.",
    "APBN-P(추경 법 개정) 편성 여부는 미확인이다. 확인된 것은 반기보고서 전망과 11월 3일 지급 기준 상향뿐이다.",
    "Pertamina 미수금의 8월 이후 잔액과 PLN 미수금",
    "Antara, CNBC Indonesia 등 1차 출처의 원문"
   ],
   "sources": [
    {
     "id": 1,
     "title": "Subsidi dan Kompensasi Energi Naik 54,1% Tembus Rp 376,8 Triliun per September 2026",
     "publisher": "Kontan",
     "url": "https://nasional.kontan.co.id/news/subsidi-dan-kompensasi-energi-naik-541-tembus-rp-3768-triliun-per-september-2026"
    },
    {
     "id": 2,
     "title": "Subsidi dan kompensasi energi capai Rp376,8 T hingga September",
     "publisher": "ANTARA",
     "url": "https://www.antaranews.com/berita/5778778/subsidi-dan-kompensasi-energi-capai-rp3768-t-hingga-september"
    },
    {
     "id": 3,
     "title": "Subsidi dan Kompensasi Energi Tembus Rp376,8 Triliun hingga September 2026",
     "publisher": "Media Indonesia",
     "url": "https://mediaindonesia.com/ekonomi/942595/subsidi-dan-kompensasi-energi-tembus-rp3768-triliun-hingga-september-2026"
    },
    {
     "id": 4,
     "title": "Subsidi dan Kompensasi Energi Tembus Rp376,8 Triliun, Beban APBN Membengkak",
     "publisher": "Koran Jakarta",
     "date": "2026-10-09",
     "url": "https://koran-jakarta.com/2026-10-09/subsidi-dan-kompensasi-energi-tembus-rp3768-triliun-beban-apbn-membengkak"
    },
    {
     "id": 5,
     "title": "Indonesia's Subsidies and Compensation Reach Rp376.8 Trillion by September 2026 Driven by Increased Energy and Fertilizer Support",
     "publisher": "Tridge",
     "url": "https://insights.tridge.com/speaker-product-news-reports/KJLyFXpzJzgKuB1Gqsm5QUKHGgR43AVdqLLsqN1g3ZH4NYWnvMuPoDjK"
    },
    {
     "id": 6,
     "title": "Konferensi Pers APBN KiTa Oktober 2026 (slide)",
     "publisher": "Kementerian Keuangan RI",
     "url": "https://media.kemenkeu.go.id/getmedia/044b5248-bdb9-4434-adf7-62fd50e93f3d/Publikasi-Web-Konpers-APBN-KiTa-(Oktober-2026)-(1).pdf?ext=.pdf"
    },
    {
     "id": 7,
     "title": "Harga Minyak Tinggi, Anggaran Subsidi dan Kompensasi Energi Naik Jadi Rp 500 Triliun",
     "publisher": "Kontan",
     "url": "https://nasional.kontan.co.id/news/harga-minyak-tinggi-anggaran-subsidi-dan-kompensasi-energi-naik-jadi-rp-500-triliun"
    },
    {
     "id": 8,
     "title": "Pemerintah Bayar Subsidi-Kompensasi Energi Rp333,9 T per Oktober 2026",
     "publisher": "CNBC Indonesia",
     "date": "2026-11-03",
     "url": "https://www.cnbcindonesia.com/news/20261103182203-4-782023/pemerintah-bayar-subsidi-kompensasi-energi-rp3339-t-per-oktober-2026"
    },
    {
     "id": 9,
     "title": "Suahasil Tambah Anggaran Subsidi dan Kompensasi Energi Jadi Rp 500 T Imbas Kenaikan Harga Minyak",
     "publisher": "Suara.com",
     "date": "2026-11-04",
     "url": "https://www.suara.com/bisnis/2026/11/04/122636/suahasil-tambah-anggaran-subsidi-dan-kompensasi-energi-jadi-rp-500-t-imbas-kenaikan-harga-minyak"
    },
    {
     "id": 10,
     "title": "Suahasil Naikkan Anggaran Subsidi dan Kompensasi Energi Jadi Rp500 T",
     "publisher": "IDN Times",
     "url": "https://www.idntimes.com/business/economy/menkeu-naikkan-anggaran-subsidi-dan-kompensasi-energi-jadi-rp500-t-00-gshdq-sqry7b"
    },
    {
     "id": 11,
     "title": "Indonesia 2026 energy subsidy bill projected at $27.6 billion, finance minister says",
     "publisher": "Reuters (via TradingView)",
     "url": "https://www.tradingview.com/news/reuters.com,2026:newsml_L2N46K0EN:0-indonesia-2026-energy-subsidy-bill-projected-at-27-6-billion-finance-minister-says/"
    },
    {
     "id": 12,
     "title": "Subsidi BBM & LPG 3 Kg di 2026 Melejit 11,2% Jadi Rp 105,4 Triliun",
     "publisher": "CNBC Indonesia",
     "date": "2025-08-20",
     "url": "https://www.cnbcindonesia.com/news/20250820095921-4-659582/subsidi-bbm-lpg-3-kg-di-2026-melejit-112-jadi-rp-1054-triliun"
    },
    {
     "id": 13,
     "title": "Anggaran Subsidi Energi 2026 Naik 14,25 Persen, Terbanyak untuk Apa?",
     "publisher": "Kompas",
     "date": "2025-08-16",
     "url": "https://money.kompas.com/read/2025/08/16/160000426/anggaran-subsidi-energi-2026-naik-14-25-persen-terbanyak-untuk-apa-"
    },
    {
     "id": 14,
     "title": "Perang Dongkrak Subsidi Energi, Fiskal Tertekan, Pertimbangkan Kenaikan BBM",
     "publisher": "Investor Trust",
     "url": "https://investortrust.id/indepth/99054/perang-dongkrak-subsidi-energi-fiskal-tertekan-pertimbangkan-kenaikan-bbm"
    },
    {
     "id": 15,
     "title": "Harga Minyak Mentah ICP di RAPBN 2026 Disepakati 70 Dolar AS per Barel",
     "publisher": "Tempo",
     "url": "https://www.tempo.co/ekonomi/harga-minyak-mentah-icp-di-rapbn-2026-disepakati-70-dolar-as-per-barel-2063766"
    },
    {
     "id": 16,
     "title": "Harga minyak mentah Indonesia naik menjadi 112,81 dolar AS per barel",
     "publisher": "ANTARA",
     "url": "https://www.antaranews.com/berita/5782588/harga-minyak-mentah-indonesia-naik-menjadi-11281-dolar-as-per-barel"
    },
    {
     "id": 17,
     "title": "Harga Minyak Mentah Indonesia Naik, Tembus US$ 112,81/ Barel",
     "publisher": "detikFinance",
     "url": "https://finance.detik.com/energi/d-8704053/harga-minyak-mentah-indonesia-naik-tembus-us-112-81-barel"
    },
    {
     "id": 18,
     "title": "SKK Migas perkirakan ICP 95-100 dolar AS per barel pada akhir 2026",
     "publisher": "ANTARA",
     "url": "https://www.antaranews.com/berita/5799097/skk-migas-perkirakan-icp-95-100-dolar-as-per-barel-pada-akhir-2026"
    },
    {
     "id": 19,
     "title": "Rupiah Kembali Tertekan, Lonjakan Harga Minyak Berisiko Perlebar Defisit APBN",
     "publisher": "Kontan",
     "url": "https://investasi.kontan.co.id/news/rupiah-kembali-tertekan-lonjakan-harga-minyak-berisiko-perlebar-defisit-apbn"
    },
    {
     "id": 20,
     "title": "Harga Minyak dan Rupiah Picu Risiko Pembengkakan Belanja Negara 2026",
     "publisher": "Media Indonesia",
     "url": "https://mediaindonesia.com/ekonomi/935004/harga-minyak-dan-rupiah-picu-risiko-pembengkakan-belanja-negara-2026"
    },
    {
     "id": 21,
     "title": "Indonesia: OECD Economic Outlook, Volume 2026 Issue 1",
     "publisher": "OECD",
     "url": "https://www.oecd.org/en/publications/oecd-economic-outlook-volume-2026-issue-1_2d1956f0-en/full-report/indonesia_12d20c97.html"
    },
    {
     "id": 22,
     "title": "Efek Rupiah Lemah, Subsidi-Kompensasi Energi Rawan Jebol ke Rp700 T",
     "publisher": "CNBC Indonesia",
     "date": "2026-10-30",
     "url": "https://www.cnbcindonesia.com/news/20261030155048-4-780989/efek-rupiah-lemah-subsidi-kompensasi-energi-rawan-jebol-ke-rp700-t"
    },
    {
     "id": 23,
     "title": "Defisit APBN Semester I-2026 Capai Rp 196 Triliun",
     "publisher": "Kompas.id",
     "url": "https://www.kompas.id/artikel/defisit-apbn-capai-rp-1965-triliun-pemerintah-perkuat-pengawasan-pajak"
    },
    {
     "id": 24,
     "title": "APBN Defisit Rp196,5 T pada Semester I 2026",
     "publisher": "CNN Indonesia",
     "date": "2026-07-21",
     "url": "https://www.cnnindonesia.com/ekonomi/20260721141346-532-1383183/apbn-defisit-rp1965-t-pada-semester-i-2026"
    },
    {
     "id": 25,
     "title": "Indonesia's 2026 Budget Deficit Seen Widening to $40.5 Billion, Above Target",
     "publisher": "Jakarta Globe",
     "url": "https://jakartaglobe.id/business/indonesias-2026-budget-deficit-seen-widening-to-405-billion-above-target"
    },
    {
     "id": 26,
     "title": "Realisasi Defisit APBN 2026 Capai Rp319 Triliun, Menkeu Suahasil Sebut Masih On Track",
     "publisher": "JPNN",
     "url": "https://www.jpnn.com/news/realisasi-defisit-apbn-2026-capai-rp319-triliun-menkeu-suahasil-sebut-masih-on-track"
    },
    {
     "id": 27,
     "title": "Defisit APBN 2026 September Capai Rp319 Triliun",
     "publisher": "Fortune IDN",
     "url": "https://www.fortuneidn.com/news/apbn-september-2026-defisit-rp319-triliun-menkeu-klaim-masih-on-track-00-my5jv-0tlf92"
    },
    {
     "id": 28,
     "title": "Pemerintah Punya Utang Subsidi & Kompensasi BBM-LPG Rp166,84 T",
     "publisher": "tirto.id",
     "url": "https://tirto.id/pemerintah-punya-utang-subsidi-kompensasi-bbm-lpg-rp16684-t-hBRZ"
    },
    {
     "id": 29,
     "title": "Piutang Pertamina kepada Pemerintah Capai Rp166,84 Triliun",
     "publisher": "Fortune IDN",
     "url": "https://www.fortuneidn.com/news/pemerintah-punya-utang-dengan-pertamina-hingga-rp166-84-triliun-00-my5jv-0717p0/amp"
    },
    {
     "id": 30,
     "title": "Purbaya Buka Suara soal Utang Rp166,8 T ke Pertamina",
     "publisher": "CNN Indonesia",
     "date": "2026-08-27",
     "url": "https://www.cnnindonesia.com/ekonomi/20260827123932-532-1396909/purbaya-buka-suara-soal-utang-rp1668-t-ke-pertamina"
    },
    {
     "id": 31,
     "title": "Pemerintah Bayar Subsidi dan Kompensasi ke Pertamina - PLN Rp 331T",
     "publisher": "Katadata",
     "url": "https://katadata.co.id/finansial/makro/6ab1031a1ba4a/pemerintah-bayar-subsidi-dan-kompensasi-ke-pertamina-pln-rp-331t"
    },
    {
     "id": 32,
     "title": "Realisasi Subsidi dan Kompensasi Energi Capai Rp 331,4 T hingga Agustus 2026",
     "publisher": "kumparan",
     "url": "https://kumparan.com/kumparanbisnis/realisasi-subsidi-dan-kompensasi-energi-capai-rp-331-4-t-hingga-agustus-2026-28CrjhZLNy4"
    },
    {
     "id": 33,
     "title": "Pemerintah Gelontorkan Rp331,4 T untuk Subsidi BBM hingga Listrik",
     "publisher": "DDTC News",
     "url": "https://news.ddtc.co.id/berita/nasional/1822606/pemerintah-gelontorkan-rp3314-t-untuk-subsidi-bbm-hingga-listrik"
    },
    {
     "id": 34,
     "title": "Tok! Kuota BBM Solar Tahun 2026 Dipatok 18,6 Juta KL",
     "publisher": "CNBC Indonesia",
     "date": "2026-01-27",
     "url": "https://www.cnbcindonesia.com/news/20260127155644-4-705716/tok-kuota-bbm-solar-tahun-2026-dipatok-186-juta-kl"
    },
    {
     "id": 35,
     "title": "BPH Migas Pangkas Kuota Pertalite dan Solar Subsidi Tahun 2026",
     "publisher": "Metro TV",
     "url": "https://www.metrotvnews.com/play/NA0Crwx7-bph-migas-pangkas-kuota-pertalite-dan-solar-subsidi-tahun-2026"
    },
    {
     "id": 36,
     "title": "ESDM-Pertamina Prediksi Kuota LPG 3 Kg dan Pertalite Jebol",
     "publisher": "periskop.id",
     "date": "2026-08-27",
     "url": "https://periskop.id/energi/20260827/esdm-pertamina-kuota-lpg-pertalite-jebol-2026"
    },
    {
     "id": 37,
     "title": "ESDM Proses Tambahan Kuota Solar dan Kaji Pertalite",
     "publisher": "Media Kompeten",
     "url": "https://www.mediakompeten.co.id/esdm-tambah-kuota-solar-pertalite"
    },
    {
     "id": 38,
     "title": "Indonesia says it will not raise fuel prices despite global oil surge, urges public not to panic",
     "publisher": "Malay Mail",
     "date": "2026-03-31",
     "url": "https://www.malaymail.com/news/world/2026/03/31/indonesia-says-it-will-not-raise-fuel-prices-despite-global-oil-surge-urges-public-not-to-panic/214548"
    },
    {
     "id": 39,
     "title": "Meski Harga BBM Pertamax Naik per 10 Juni 2026, Pertalite dan Solar Terpantau Stabil",
     "publisher": "tvOnenews",
     "url": "https://www.tvonenews.com/lifestyle/trend/446330-meski-harga-bbm-pertamax-naik-per-10-juni-2026-pertalite-dan-solar-terpantau-stabil"
    },
    {
     "id": 40,
     "title": "Per 10 Juni 2026 Pertamax Series Naik, Harga Pertalite dan Solar Subsidi Tetap",
     "publisher": "BacaMalang",
     "url": "https://bacamalang.com/per-10-juni-2026-pertamax-series-naik-harga-pertalite-dan-solar-subsidi-tetap/"
    },
    {
     "id": 41,
     "title": "Bahlil Pastikan Harga BBM Subsidi Tak Naik hingga Akhir Tahun Ini",
     "publisher": "Katadata",
     "url": "https://katadata.co.id/berita/energi/6aeecb7f8a71a/bahlil-pastikan-harga-bbm-subsidi-tak-naik-hingga-akhir-tahun-ini"
    },
    {
     "id": 42,
     "title": "Harga BBM Hari Ini 6 November 2026: Brent Rebound ke US$97,09 dan WTI ke US$90,50 setelah Anjlok ke Level Terendah Pekan Ini, Berikut Daftar Lengkap Pertamina, BP, Shell, dan Vivo",
     "publisher": "Industry.co.id",
     "date": "2026-11-06",
     "url": "https://www.industry.co.id/read/158622/harga-bbm-hari-ini-6-november-2026-brent-rebound-ke-us9709-dan-wti-ke-us9050-setelah-anjlok-ke-level-terendah-pekan-ini-berikut-daftar-lengkap-pertamina-bp-shell-dan-vivo"
    },
    {
     "id": 43,
     "title": "Harga BBM Hari Ini 6 November 2026: Pertalite Tetap Rp10.000, Pertamax Tembus Rp16.650, Cek Tabel Lengkap!",
     "publisher": "Gakorpan",
     "date": "2026-11-06",
     "url": "https://www.gakorpan.com/harga-bbm-hari-ini-6-november-2026-pertalite-tetap-rp10000-pertamax-tembus-rp16650-cek-tabel-lengkap"
    },
    {
     "id": 44,
     "title": "Harga BBM Pertamina dan Swasta Bertahan 6 November 2026",
     "publisher": "Chatnews",
     "date": "2026-11-06",
     "url": "https://chatnews.id/harga-bbm-6-november-2026"
    },
    {
     "id": 45,
     "title": "Menkeu Purbaya Pastikan APBN 2026 Tetap Kokoh di Tengah Fluktuasi Harga Minyak Dunia",
     "publisher": "Abadikini",
     "date": "2026-04-01",
     "url": "https://www.abadikini.com/2026/04/01/menkeu-purbaya-pastikan-apbn-2026-tetap-kokoh-di-tengah-fluktuasi-harga-minyak-dunia/"
    },
    {
     "id": 46,
     "title": "Harga Minyak Dunia Meroket, Purbaya Jamin Defisit APBN Tetap di Bawah 3 Persen",
     "publisher": "Republika",
     "url": "https://ekonomi.republika.co.id/berita/tcw7ka490/harga-minyak-dunia-meroket-purbaya-jamin-defisit-apbn-tetap-di-bawah-3-persen"
    },
    {
     "id": 47,
     "title": "BNP Paribas Warns Indonesia Fuel Subsidies Risk 2026 Deficit Breach, Rupiah Pressure and Funding Strain",
     "publisher": "VT Markets",
     "url": "https://www.vtmarkets.net/live-updates/bnp-paribas-warns-indonesia-fuel-subsidies-risk-2026-deficit-breach-rupiah-pressure-and-funding-strain/"
    },
    {
     "id": 48,
     "title": "Kemenkeu bayar subsidi dan kompensasi energi Rp192 triliun per Oktober",
     "publisher": "ANTARA",
     "url": "https://www.antaranews.com/berita/5173684/kemenkeu-bayar-subsidi-dan-kompensasi-energi-rp192-triliun-per-oktober"
    },
    {
     "id": 49,
     "title": "Subsidi & Kompensasi Energi 2025 Makin Bengkak, Tembus Rp394,3 Triliun",
     "publisher": "CNBC Indonesia",
     "date": "2024-08-19",
     "url": "https://www.cnbcindonesia.com/news/20240819100544-4-564323/subsidi-kompensasi-energi-2025-makin-bengkak-tembus-rp3943-triliun"
    },
    {
     "id": 50,
     "title": "Belanja Subsidi dan Kompensasi Energi Tembus Rp 345,1 Triliun Hingga November 2025",
     "publisher": "Kontan",
     "url": "https://nasional.kontan.co.id/news/belanja-subsidi-dan-kompensasi-energi-tembus-rp-3451-triliun-hingga-november-2025"
    },
    {
     "id": 51,
     "title": "Realisasi Subsidi Pemerintah pada 2025 Naik Jadi Rp 281,6 T",
     "publisher": "Tempo",
     "url": "https://www.tempo.co/ekonomi/realisasi-subsidi-pemerintah-pada-2025-naik-jadi-rp-281-6-t-2105784"
    },
    {
     "id": 52,
     "title": "Menkeu Sampaikan Realisasi Subsidi dan Kompensasi Hingga Agustus 2025",
     "publisher": "Kementerian Keuangan RI",
     "url": "https://www.kemenkeu.go.id/informasi-publik/publikasi/berita-utama/Realisasi-Subsidi-dan-Kompensasi-Hingga-Agustus"
    },
    {
     "id": 53,
     "title": "Defisit APBN 2025 Capai 2,92% dari PDB, Lampaui Target Awal",
     "publisher": "DDTC News",
     "url": "https://news.ddtc.co.id/berita/nasional/1816449/defisit-apbn-2025-capai-292-dari-pdb-lampaui-target-awal"
    },
    {
     "id": 54,
     "title": "Subsidi BBM-Listrik Dipangkas Jadi Rp 261 T Tahun Depan",
     "publisher": "detikFinance",
     "url": "https://finance.detik.com/energi/d-8684189/subsidi-bbm-listrik-dipangkas-jadi-rp-261-t-tahun-depan"
    },
    {
     "id": 55,
     "title": "Subsidi BBM-LPG 3 Kg 2027 Turun dari Usulan Awal, DPR Ingatkan Kesalahan Data Pemerintah",
     "publisher": "Bisnis.com",
     "date": "2026-09-25",
     "url": "https://ekonomi.bisnis.com/read/20260925/10/2007286/subsidi-bbm-lpg-3-kg-2027-turun-dari-usulan-awal-dpr-ingatkan-kesalahan-data-pemerintah"
    },
    {
     "id": 56,
     "title": "Indonesia sets 2027 energy subsidy budget at Rp272.9 trillion",
     "publisher": "Indonesia Business Post",
     "url": "https://indonesiabusinesspost.com/7160/energy-and-resources/indonesia-sets-2027-energy-subsidy-budget-at-rp272-9-trillion"
    },
    {
     "id": 57,
     "title": "Realisasi Subsidi dan Kompensasi Capai Rp331,4 Triliun per Agustus 2026",
     "publisher": "Infobank",
     "url": "https://infobanknews.com/realisasi-subsidi-dan-kompensasi-capai-rp3314-triliun-per-agustus-2026"
    },
    {
     "id": 58,
     "title": "Harga BBM Bersubsidi Tak Naik, APBN Kian Terhimpit; Seberapa Tahan?",
     "publisher": "periskop.id",
     "date": "2026-10-26",
     "url": "https://periskop.id/makro/20261026/di-balik-harga-bbm-yang-tak-naik-ada-apbn-yang-kian-terhimpit-seberapa-tahan"
    }
   ],
   "region": "sea",
   "tag": "가격 동결 · 국영사 보상금",
   "fy": "1~12월",
   "overview_budget": 6,
   "overview_realised": 7,
   "group": "indonesia"
  },
  {
   "code": "MY",
   "name_kr": "말레이시아",
   "mechanism": "말레이시아 정부는 자동가격결정메커니즘(APM)으로 RON95·경유·LPG 소매가를 매주 고시하고 시장가와의 차액을 연방정부 운영지출(보조금·사회지원)로 부담한다. 경유는 2024년 6월 반도부 가격을 시장가로 전환한 뒤 적격 차량에만 보조하며, 2026-07-01부터 MyKad 기반 BUDI 디젤(RM2.10/L)로 사바·사라왁을 포함한 전국 단일 체계로 바꿨다. RON95는 2025-09-30 BUDI95 시행 이후 적격 시민에게 월 한도 안에서 RM1.99/L를 적용하고 나머지 소비자는 주간 비보조가를 낸다. 재무부의 2026년 연료 보조금 추계(RM400억)는 휘발유·경유·LPG를 포괄하며, 유가 상승기에는 페트로나스 배당과 석유소득세 증가분이 보조금 증가분 일부를 상쇄한다.",
   "budget_oil_price": {
    "benchmark": "Brent",
    "value": 65,
    "unit": "USD/bbl",
    "year": 2026,
    "note": "예산 2026 원안의 2026년 브렌트 가정 범위 USD60~65(정부 전망, The Star 2026-01 보도)의 상단이다. 출처별로 USD60~63(AmInvest), USD65(The Edge·Apex), USD70(안와르 총리 발언, RM285.90 환산)으로도 적힌다. 경제전망 2026 원문은 미확인이다. 예산 2027은 2026년 수정 추정과 2027년 가정을 모두 브렌트 USD85로 둔다. 일부 보도의 USD78은 예산 가정과 별개인 OECD의 선물 기반 경로(2026년 2분기 USD102 고점, 2027년 4분기 USD78)다.",
    "src": [
     8,
     23,
     27,
     28,
     29,
     55,
     49,
     4,
     58
    ],
    "basis": "전망 범위 60~65 상단"
   },
   "items": [
    {
     "label": "석유제품 보조금(휘발유·경유·LPG)",
     "year": 2025,
     "kind": "realised",
     "amount": 19.11,
     "currency": "MYR",
     "unit": "십억 링깃",
     "note": "감사원장 보고서 2/2026(2026-10-05 공개) 기준이다. 2024년 RM349.1억에서 줄었다. 휘발유 RM105.1억, 경유 RM59.8억, LPG RM26.3억의 합이다.",
     "src": [
      44,
      45,
      46,
      47
     ]
    },
    {
     "label": "휘발유(RON95) 보조금",
     "year": 2025,
     "kind": "realised",
     "amount": 10.51,
     "currency": "MYR",
     "unit": "십억 링깃",
     "note": "전년 대비 46.5% 줄었다. 2025-09-30 BUDI95 표적화가 반영됐다.",
     "src": [
      44,
      46,
      47
     ]
    },
    {
     "label": "경유 보조금",
     "year": 2025,
     "kind": "realised",
     "amount": 5.98,
     "currency": "MYR",
     "unit": "십억 링깃",
     "note": "전년 대비 48.2% 줄었다. 2024년 6월 경유 표적화가 반영됐다.",
     "src": [
      44,
      46,
      47
     ]
    },
    {
     "label": "LPG 보조금",
     "year": 2025,
     "kind": "realised",
     "amount": 2.63,
     "currency": "MYR",
     "unit": "십억 링깃",
     "note": "전년 대비 29.1% 줄었다.",
     "src": [
      44,
      46,
      47
     ]
    },
    {
     "label": "연방 보조금 총액(감사원장 기준, 연료·식품 등)",
     "year": 2025,
     "kind": "realised",
     "amount": 23.43,
     "currency": "MYR",
     "unit": "십억 링깃",
     "note": "2024년 RM391.0억 대비 40.1% 줄었다. 석유제품 RM191.1억과 식품지원 RM25.1억(식용유 가격안정 RM19.4억 포함)이 들어 있다. 복지 현금지원 RM203.6억은 별도 항목이다.",
     "src": [
      44,
      45,
      46
     ]
    },
    {
     "label": "보조금·사회지원(연료·LPG·현금지원 등 포괄)",
     "year": 2025,
     "kind": "realised",
     "amount": 55.27,
     "currency": "MYR",
     "unit": "십억 링깃",
     "note": "재정전망 2027의 2025년 실적이다.",
     "src": [
      5
     ]
    },
    {
     "label": "석유제품 보조금(휘발유·경유·LPG)",
     "year": 2026,
     "kind": "budget",
     "amount": 15,
     "currency": "MYR",
     "unit": "십억 링깃",
     "usd_bn": 3.6978,
     "usd_note": "계산: 2026-11-07 환율 4.06 MYR/USD",
     "note": "예산 2026(2025년 10월 상정) 배정액이다.",
     "src": [
      15,
      16,
      18,
      34
     ]
    },
    {
     "label": "석유제품 보조금(휘발유·경유·LPG)",
     "year": 2026,
     "kind": "revised",
     "amount": 40,
     "currency": "MYR",
     "unit": "십억 링깃",
     "usd_bn": 9.8607,
     "usd_note": "계산: 2026-11-07 환율 4.06 MYR/USD; 출처 표기 약 98.0억 달러",
     "note": "2026-07-01 총리 겸 재무장관 의회 서면답변에서 처음 제시했다. RM250억 추가 배정으로 총 RM400억이 됐다. 재무부는 2026-10-30에도 연간 RM400억 전망을 유지했고, 예산 2027 재정전망의 2026년 수정치도 같다.",
     "src": [
      2,
      15,
      16,
      17,
      20,
      33
     ],
     "kind_label": "추가 배정 후"
    },
    {
     "label": "RON95 보조금(BUDI95)",
     "year": 2026,
     "kind": "realised",
     "amount": 11.2,
     "currency": "MYR",
     "unit": "십억 링깃",
     "note": "BUDI95 시행(2025-09-30) 이후 8개월 누적 실집행액이다. 2025년 10~12월분이 포함된다. 2026년 6월 하순 의회 서면답변 기준이며 정확한 종료일은 원문 미확인이다.",
     "src": [
      39
     ],
     "period": "BUDI95 시행 후 8개월 누적(2026년 6월 하순 답변)",
     "usd_bn": 2.761,
     "usd_note": "계산: 2026-11-07 환율 4.06 MYR/USD"
    },
    {
     "label": "보조금·사회지원(연료·LPG·현금지원 등 포괄)",
     "year": 2026,
     "kind": "budget",
     "amount": 49,
     "currency": "MYR",
     "unit": "십억 링깃",
     "note": "예산 2026 원안이다.",
     "src": [
      4
     ],
     "usd_bn": 12.0794,
     "usd_note": "계산: 2026-11-07 환율 4.06 MYR/USD"
    },
    {
     "label": "보조금·사회지원(연료·LPG·현금지원 등 포괄)",
     "year": 2026,
     "kind": "revised",
     "amount": 74.47,
     "currency": "MYR",
     "unit": "십억 링깃",
     "note": "예산 대비 52% 늘었다. 재무부는 증가 요인으로 연료 보조금을 들었다(2026년 평균 유가 가정 USD85). MARC는 RM745억으로 표기한다.",
     "src": [
      4,
      5
     ],
     "usd_bn": 18.3582,
     "usd_note": "계산: 2026-11-07 환율 4.06 MYR/USD"
    },
    {
     "label": "석유제품 보조금(휘발유·경유·LPG)",
     "year": 2027,
     "kind": "budget",
     "amount": 40,
     "currency": "MYR",
     "unit": "십억 링깃",
     "usd_bn": 9.8607,
     "usd_note": "계산: 2026-11-07 환율 4.06 MYR/USD",
     "note": "예산 2027(2026-10-09 상정) 편성액이다. 브렌트 USD85를 가정했다.",
     "src": [
      1,
      2,
      4,
      48
     ]
    },
    {
     "label": "보조금·사회지원(연료·LPG·현금지원 등 포괄)",
     "year": 2027,
     "kind": "budget",
     "amount": 72.73,
     "currency": "MYR",
     "unit": "십억 링깃",
     "pct_note": "운영지출 대비 19.3%",
     "note": "STR/SARA 현금지원은 RM160억(2026년 RM150억)이다.",
     "src": [
      4,
      5
     ],
     "usd_bn": 17.9292,
     "usd_note": "계산: 2026-11-07 환율 4.06 MYR/USD"
    },
    {
     "label": "보조금·지원금·인센티브 총액",
     "year": 2027,
     "kind": "budget",
     "amount": 80,
     "currency": "MYR",
     "unit": "십억 링깃",
     "note": "예산 2027 연설의 'RM800억 초과' 표현이다. 수치는 하한이다.",
     "src": [
      1,
      2,
      57
     ],
     "usd_bn": 19.7214,
     "usd_note": "계산: 2026-11-07 환율 4.06 MYR/USD"
    }
   ],
   "prices": [
    {
     "product": "RON95(BUDI95 보조가)",
     "price": 1.99,
     "unit": "RM/리터",
     "date": "2026-10-09",
     "note": "2025-09-30 도입 이후 유지되고 있다. 월 한도는 300리터다(2026-04-01~08-31은 200리터).",
     "src": [
      1,
      16,
      48
     ]
    },
    {
     "product": "RON95(비보조가)",
     "price": 3.87,
     "unit": "RM/리터",
     "date": "2026-03-26",
     "note": "2026-03-26~04-01 주간 고시가다.",
     "src": [
      9,
      10
     ]
    },
    {
     "product": "경유(반도부 비보조가)",
     "price": 6,
     "unit": "RM/리터",
     "date": "2026-04-01",
     "note": "RM6을 넘었다는 보도 기준이다. 정확한 고시가는 미확인이다.",
     "src": [
      6
     ]
    },
    {
     "product": "경유(BUDI 디젤, 적격 개인)",
     "price": 2.1,
     "unit": "RM/리터",
     "date": "2026-07-01",
     "note": "MyKad 기반 전국 단일가다. 반도부 적격자는 2026-06-27부터 RM2.15로 먼저 이용했다.",
     "src": [
      16,
      40,
      41,
      42
     ]
    },
    {
     "product": "경유(SKDS 승인 물류·대중교통 차량)",
     "price": 2.15,
     "unit": "RM/리터",
     "date": "2026-07-01",
     "src": [
      42,
      43
     ]
    },
    {
     "product": "경유(어민)",
     "price": 1.65,
     "unit": "RM/리터",
     "date": "2026-07-01",
     "src": [
      16
     ]
    },
    {
     "product": "경유(반도부 비보조가)",
     "price": 5.07,
     "unit": "RM/리터",
     "date": "2026-10-22",
     "note": "2026-10-22~28 주간 고시가이며 전주 대비 10센 하락했다. paultan 주간 가격 페이지 기준이며 페이지 원문은 미확인이다.",
     "src": [
      52
     ]
    }
   ],
   "measures_2026": [
    {
     "date": "2026-03-26",
     "text": "정부는 BUDI95 월 보조 한도를 300리터에서 200리터로 줄여 2026-04-01부터 적용한다고 발표했다. 재무부는 세계 공급이 안정될 때까지의 한시 조치라고 밝혔다. 보조가 RM1.99/L는 유지했고 인증 e-hailing 운전자 한도는 월 800리터다. 같은 주(3/26~4/1) 비보조 RON95 가격은 RM3.87/L다.",
     "src": [
      7,
      8,
      9,
      10
     ]
    },
    {
     "date": "2026-04-01",
     "text": "재무부는 연료 보조를 유지한다고 밝혔다. 반도부 비보조 경유 가격은 리터당 RM6을 넘었다.",
     "src": [
      6
     ]
    },
    {
     "date": "2026-06-22",
     "text": "정부는 MyKad 기반 BUDI 마다니 디젤을 발표했다. 2026-07-01부터 적격 개인 경유차에 RM2.10/L를 적용하고, 발표 당시 월 한도는 BUDI95와 합산 200리터다.",
     "src": [
      40
     ]
    },
    {
     "date": "2026-06-27",
     "text": "반도부 적격자는 2026-06-27부터 전국 시행 전까지 RM2.15/L로 BUDI 디젤을 먼저 이용했다.",
     "src": [
      41
     ]
    },
    {
     "date": "2026-07-01",
     "text": "BUDI 디젤을 전국에 시행했다. 적격 개인은 RM2.10/L, SKDS 승인 물류·대중교통 차량은 RM2.15/L, 어민은 RM1.65/L를 낸다. 사바·사라왁·라부안의 별도 경유 가격은 폐지했다.",
     "src": [
      16,
      42,
      43
     ]
    },
    {
     "date": "2026-07-01",
     "text": "안와르 총리 겸 재무장관은 의회 서면답변에서 2026년 석유제품 보조금이 약 RM400억(USD98억)으로 예산 RM150억의 2배를 넘는다고 밝혔다.",
     "src": [
      15,
      16,
      17
     ]
    },
    {
     "date": "2026-07-16",
     "text": "안와르 총리는 RON95 평균 사용량이 월 100리터여서 200리터 한도가 대부분 운전자에게 충분하다고 말했다.",
     "src": [
      11
     ]
    },
    {
     "date": "2026-08-30",
     "text": "안와르 총리는 BUDI95 월 한도를 2026-09-01부터 300리터로 되돌리고 BUDI 디젤 월 한도를 300리터에서 400리터로 높인다고 발표했다. 정부는 RON95 보조 대상자를 1,600만 명 이상으로 제시했다.",
     "src": [
      12,
      13,
      14
     ]
    },
    {
     "date": "2026-10-09",
     "text": "예산 2027은 RON95 보조가 RM1.99/L를 유지하고 2027년 연료 보조금을 RM400억으로 편성했다. 9월에 300리터 한도를 모두 쓴 사용자는 약 10만 명으로 전체의 1% 미만이다.",
     "src": [
      1,
      2,
      48,
      57
     ]
    },
    {
     "date": "2026-10-30",
     "text": "재무부는 6~8월 월간 연료 보조금이 약 RM30억으로 줄었으나 연간 RM400억 전망을 유지한다고 밝혔다.",
     "src": [
      20
     ]
    }
   ],
   "sensitivity": [
    {
     "text": "리우친통 재무부 부장관은 국제유가가 배럴당 USD1 변하면 연방 석유 관련 수입(페트로나스 배당 제외)이 RM3억 변한다고 밝혔다.",
     "src": [
      22
     ]
    },
    {
     "text": "재무부 부장관은 원유가가 배럴당 USD90을 유지하면 연료 보조금이 월 RM35억에 이를 수 있다고 밝혔다(2026-07-22 보도).",
     "src": [
      21
     ]
    },
    {
     "text": "Kenanga 리서치는 유가 배럴당 USD1 변동당 연간 보조금 비용을 약 RM10.5억으로 추정한다. 석유 수입 증가분을 빼면 순노출은 연 약 RM7.5억이다.",
     "src": [
      24,
      54
     ]
    },
    {
     "text": "Apex 리서치는 브렌트 배럴당 USD1 상승당 연료 보조금 RM12.5억 증가를 가정한다. 2027년 브렌트가 평균 USD100이면 보조금이 예산(USD85 가정) 대비 약 RM190억 늘어난다고 추정한다.",
     "src": [
      23
     ]
    },
    {
     "text": "안와르 총리는 최초 전망의 배럴당 USD70 가정과 달리 유가가 약 USD110까지 올랐고, RON95 RM1.99 유지에 연 RM400억이 든다고 밝혔다.",
     "src": [
      49
     ]
    }
   ],
   "fiscal_impact": [
    {
     "text": "2026년 석유제품 보조금은 예산 RM150억에서 RM400억으로 수정됐다. 정부는 RON95 보조가 RM1.99/L 유지를 위해 RM250억을 추가 배정했다.",
     "src": [
      15,
      16,
      33
     ]
    },
    {
     "text": "월간 석유제품 보조금은 1~2월 약 RM8억, 3~4월 약 RM50억, 5~6월 약 RM40억이다. 재무부는 2026-10-30 발표에서 6~8월 월간 지출을 약 RM30억으로 집계했다. 6월분은 7월 보도(RM40억)와 10월 발표(RM30억)가 다르다.",
     "src": [
      15,
      18,
      19,
      20
     ]
    },
    {
     "text": "보조금·사회지원 지출은 2026년 예산 RM490억에서 수정 RM744.7억으로 52% 늘었다. 2027년 예산은 RM727.3억으로 운영지출의 19.3%다. 2025년 실적은 RM552.7억이다.",
     "src": [
      4,
      5
     ]
    },
    {
     "text": "2026년 연방 재정적자는 목표 GDP 대비 3.5%에서 수정 3.6%(RM785억)로 높아졌다. 정부는 2027년 3.3%(RM775억), 2028년 3.0%를 목표로 한다. 2027년 총지출은 RM4,598억(USD1,125억)이다.",
     "src": [
      2,
      3,
      28,
      29,
      30,
      50,
      53,
      55
     ]
    },
    {
     "text": "Fitch는 보조금 비용 증가로 2026년 수정 지출이 약 6% 늘었다고 평가했다. Fitch는 2027년 적자를 GDP 대비 3.3%로 보고, 정부부채가 동급 국가 중앙값 쪽으로 꾸준히 낮아지면 등급 상향 압력이 생길 수 있다고 밝혔다.",
     "src": [
      30,
      31
     ]
    },
    {
     "text": "S&P는 말레이시아 신용등급을 A-(안정적)로 유지하면서 세계 유가 충격으로 보조금 지출이 다시 급증할 수 있다고 지적했다.",
     "src": [
      32
     ]
    },
    {
     "text": "BMI는 중동 분쟁이 예상보다 길어지면 2027년 보조금 지출이 정부 전망을 넘을 수 있다고 평가했다.",
     "src": [
      51
     ]
    },
    {
     "text": "HSBC는 2026년 보조금이 RM584억까지 늘 수 있다고 추정하고, 적자 GDP 대비 3.5%를 지키려면 RON95 가격 조정이 필요하다고 봤다.",
     "src": [
      34
     ]
    },
    {
     "text": "OCBC는 앞선 보도에서 2026년 적자를 GDP 대비 약 3.7%로 추정했으나 2026-09-25 예산 2027 프리뷰에서는 3.6%를 제시했다. 보조금 초과분은 GDP의 약 1%로 추정했다. HLIB와 TA증권은 2026년 적자를 3.6%로 전망했다.",
     "src": [
      33,
      35,
      36,
      56
     ]
    },
    {
     "text": "TA증권은 BUDI95 월 한도를 200리터로 줄이면 연간 약 RM50억을 총액 기준으로 절감한다고 추정했다. 행동 변화로 실제 절감액은 이보다 작을 수 있다고 덧붙였다.",
     "src": [
      35
     ]
    },
    {
     "text": "페트로나스의 정부 배당은 2026년 RM270억(예산 2026 원안 RM200억), 2027년 RM320억으로 추정된다. 2024·2025년 배당은 각각 RM320억이다. 2027년 배당 RM320억은 총수입 RM3,808억의 8.4%다.",
     "src": [
      25,
      26
     ]
    },
    {
     "text": "석유 관련 수입은 2027년 RM612억으로 총수입의 16.1%다. 2026년 비중은 15.1%다. 석유소득세는 2027년 RM205억으로 보합이다.",
     "src": [
      25
     ]
    },
    {
     "text": "2025년 연방 보조금은 RM234.3억으로 전년 RM391.0억보다 40.1% 줄었다. 같은 해 복지 현금지원은 RM203.6억으로 380.8% 늘었다. 감사원장은 감소 요인으로 유가 하락, 2024년 6월 경유 표적화, 2025년 9월 휘발유 표적화를 들었다.",
     "src": [
      44,
      45,
      46,
      47
     ]
    },
    {
     "text": "IMF는 2026-02-26 제4조 협의 결과에서 2025년 적자를 GDP 대비 3.8%(2024년 4.1%)로 추정하고 2028년까지 2.5%로 낮출 것을 권고했다. IMF는 RON95 보조금의 상당 부분이 고소득층에 귀속된다며 소득 심사와 고소득층부터의 단계적 폐지를 제안했다. 이 평가는 호르무즈 유가 충격 이전 자료다.",
     "src": [
      37,
      38
     ]
    }
   ],
   "open_items": [
    "MOF 예산 2027 연설문·재정전망 2027·경제전망 2026/2027 원문",
    "예산 2026의 유가 가정은 출처별로 USD60~63, 60~65, 65, 70으로 엇갈린다. 경제전망 2026 원문으로는 확인되지 않았다.",
    "2026년 연료 보조금 누적 실집행액(특정 종료일 기준)은 미확인이다. 확인된 것은 월별 근사치와 RON95 8개월 누적 RM112억이다.",
    "2026년 수정·2027년 예산 연료 보조금의 제품별(RON95·경유·LPG) 내역",
    "전력 보조금(요금 동결·전력산업기금 지원)의 2025~2027년 금액과 보조금·사회지원 항목 포함 여부",
    "2026년 LPG 소비자가격과 LPG 보조금 금액",
    "2026년 수정 재정적자의 링깃 금액(RM785억)은 언론 보도(The Edge) 기준이다. 정부부채 비율과 재정책임법(FRA)의 법정 한도 수치는 1차 자료 미확인이다.",
    "연료 보조금의 GDP 대비 비중(정부 제시 수치)",
    "Kenanga·Apex 민감도는 언론 인용 기준이며 리서치 원문은 미확인이다. Kenanga 수치의 인용 매체(Business Today 또는 Sinar Daily)도 미확인이다.",
    "BUDI 디젤 월 한도 경로(6월 발표 시 BUDI95와 합산 200리터 → 300리터 → 2026-09-01 400리터)의 중간 단계 시점이 출처마다 다르다.",
    "S&P 등급 유지 기사의 2026년 적자 3.1% 전망은 기준(일반정부 여부)이 미확인이다. Moody's의 2026년 코멘트도 미확인이다.",
    "HSBC(Yun Liu, 2026-06-24)는 RM584억을 '총 보조금 비용'으로 적고 예산의 연료 보조금 RM150억과 비교했다. 같은 분석은 월 연료 보조금이 분쟁 전 약 RM7억에서 약 RM70억으로 늘었다고 봤다. 연료 보조금만인지 보조금 전체인지는 원문 미확인이다.",
    "2026년 비보조 RON95·경유 주간 가격의 고점과 연간 경로",
    "2026-05 보도된 고소득층 BUDI95 배제안의 시행 여부는 미확인이다. 예산 2027 관련 보도에서는 소득 기준 배제가 확인되지 않았다.",
    "2026년 연료 보조금 초과분에 대한 보충공급법안 상정 여부는 미확인이다. 2026-02 통과한 보충공급(2025) 법안 RM79.4억에는 연료 보조금 항목이 보도되지 않았다."
   ],
   "sources": [
    {
     "id": 1,
     "title": "Speech The Fifth MADANI Budget 2027",
     "publisher": "Ministry of Finance Malaysia",
     "date": "2026-10-09",
     "url": "https://www.mof.gov.my/portal/en/news/speech/speech-the-fifth-madani-budget-2027"
    },
    {
     "id": 2,
     "title": "Oil above US$100 will keep Malaysia's fuel subsidy bill at around RM40 billion this year and next",
     "publisher": "The Sun (Malaysia)",
     "url": "https://thesun.my/business/oil-price-above-us100-will-keep-malaysias-fuel-subsidy-bill-at-around-rm40-billion-this-year-and-next/"
    },
    {
     "id": 3,
     "title": "Malaysia's fiscal deficit to narrow to 3.3% in 2027, but shortfall remains above RM77 bil",
     "publisher": "The Edge Malaysia",
     "url": "https://theedgemalaysia.com/node/821134"
    },
    {
     "id": 4,
     "title": "Budget 2027: Prioritising growth, sustaining fiscal plans",
     "publisher": "Malaysian Rating Corporation (MARC)",
     "url": "https://www.marc.com.my/views/budget-2027-prioritising-growth-sustaining-fiscal-plans/"
    },
    {
     "id": 5,
     "title": "Subsidy bill to ease in 2027, but remain elevated",
     "publisher": "The Edge Malaysia",
     "date": "2026-10-09",
     "url": "https://theedgemalaysia.com/node/821101"
    },
    {
     "id": 6,
     "title": "Finance Ministry: Fuel subsidies maintained but BUDI95 quota reduced to 200 litres, as unsubsidised diesel breaches RM6 mark",
     "publisher": "Malay Mail",
     "date": "2026-04-01",
     "url": "https://www.malaymail.com/news/malaysia/2026/04/01/finance-ministry-fuel-subsidies-maintained-but-budi95-quota-reduced-to-200-litres-as-unsubsidised-diesel-breaches-rm6-mark/214695"
    },
    {
     "id": 7,
     "title": "Govt lowers BUDI95 subsidised fuel quota to 200 litres monthly",
     "publisher": "Free Malaysia Today",
     "date": "2026-03-26",
     "url": "https://www.freemalaysiatoday.com/category/nation/2026/03/26/govt-lowers-budi95-subsidy-limit-to-200-litres-monthly"
    },
    {
     "id": 8,
     "title": "Monthly subsidised RON95 to be capped at 200 litres from April 1, confirming The Edge report",
     "publisher": "The Edge Malaysia",
     "url": "https://theedgemalaysia.com/node/797552"
    },
    {
     "id": 9,
     "title": "BUDI 95 monthly quota temporarily revised to 200 litres monthly starting 1 April, subsidised price remains at RM1.99/L",
     "publisher": "AutoBuzz.my",
     "date": "2026-03-26",
     "url": "https://autobuzz.my/2026/03/26/budi-95-monthly-quota-temporarily-revised-to-200-litres-monthly-starting-1-april-subsidised-price-remains-at-rm1-99-l/"
    },
    {
     "id": 10,
     "title": "BUDI95 reduced to 200L per month starting 1 April. Are you affected?",
     "publisher": "SoyaCincau",
     "date": "2026-03-26",
     "url": "https://soyacincau.com/2026/03/26/budi95-monthly-quota-200l-ehailing-drivers-800l/"
    },
    {
     "id": 11,
     "title": "Anwar says 200-litre BUDI95 quota fits most drivers as average RON95 use is 100 litres",
     "publisher": "Malay Mail",
     "date": "2026-07-16",
     "url": "https://www.malaymail.com/news/malaysia/2026/07/16/anwar-says-200-litre-budi95-quota-fits-most-drivers-as-average-ron95-use-is-100-litres/227787"
    },
    {
     "id": 12,
     "title": "Budi95 quota restored to 300 litres, Anwar announces goodies ahead of Merdeka celebration",
     "publisher": "Yahoo News Malaysia",
     "url": "https://malaysia.news.yahoo.com/budi95-quota-restored-300-litres-081327998.html"
    },
    {
     "id": 13,
     "title": "#Budget2027: Who truly benefits from the higher 300L BUDI95 and 400L Budi Diesel",
     "publisher": "Newswav",
     "url": "https://newswav.com/article/budget2027-who-truly-benefits-from-the-higher-300l-budi95-and-400l-budi-die-A2610_LSaMqn"
    },
    {
     "id": 14,
     "title": "Budget 2027: 10 things we already know",
     "publisher": "Sinar Daily",
     "url": "https://www.sinardaily.my/article/741632/focus/national/budget-2027-10-things-we-already-know"
    },
    {
     "id": 15,
     "title": "PM: Fuel subsidy spending to hit RM40bil, more than double Budget 2026 allocation",
     "publisher": "The Star",
     "date": "2026-07-01",
     "url": "https://www.thestar.com.my/news/nation/2026/07/01/pm-fuel-subsidy-spending-to-hit-rm40bil-more-than-double-budget-2026-allocation"
    },
    {
     "id": 16,
     "title": "PM Anwar: Malaysia's fuel subsidy bill set to hit RM40b, more than double Budget estimate",
     "publisher": "Malay Mail",
     "date": "2026-07-01",
     "url": "https://www.malaymail.com/news/malaysia/2026/07/01/pm-anwar-malaysias-fuel-subsidy-bill-set-to-hit-rm40b-more-than-double-budget-estimate/225879"
    },
    {
     "id": 17,
     "title": "Malaysia's Fuel Subsidy Bill May Reach $9.8 Billion, Anwar Says",
     "publisher": "Bloomberg",
     "date": "2026-07-01",
     "url": "https://www.bloomberg.com/news/articles/2026-07-01/malaysia-s-fuel-subsidy-bill-may-reach-9-8-billion-anwar-says"
    },
    {
     "id": 18,
     "title": "West Asia Conflict Pushes Malaysia's 2026 Fuel Subsidy Bill Towards RM40 Billion",
     "publisher": "Business Today",
     "date": "2026-07-15",
     "url": "https://www.businesstoday.com.my/2026/07/15/west-asia-conflict-pushes-malaysias-2026-fuel-subsidy-bill-towards-rm40-billion/"
    },
    {
     "id": 19,
     "title": "West Asia crisis pushes fuel subsidy bill towards RM40 billion in 2026",
     "publisher": "The Vibes",
     "url": "https://www.thevibes.com/articles/news/125059/west-asia-crisis-pushes-fuel-subsidy-bill-towards-rm40-billion-in-2026"
    },
    {
     "id": 20,
     "title": "Malaysian fuel subsidy bill eases, but still on track to reach RM40 billion this year - ministry of finance",
     "publisher": "paultan.org",
     "date": "2026-10-30",
     "url": "https://paultan.org/2026/10/30/malaysian-fuel-subsidy-bill-eases-but-still-on-track-to-reach-rm40-billion-this-year-ministry-of-finance/"
    },
    {
     "id": 21,
     "title": "Malaysian fuel subsidies could reach RM3.5 billion a month if crude oil remains at US$90 a barrel - DFM",
     "publisher": "paultan.org",
     "date": "2026-07-22",
     "url": "https://paultan.org/2026/07/22/malaysian-fuel-subsidies-could-reach-rm3-5-billion-a-month-if-crude-oil-remains-at-us90-a-barrel-dfm/"
    },
    {
     "id": 22,
     "title": "Higher petroleum-related revenue to partly offset subsidy burden on govt coffers — deputy minister",
     "publisher": "The Edge Malaysia",
     "url": "https://theedgemalaysia.com/node/810730"
    },
    {
     "id": 23,
     "title": "Oil, not handouts, is country's key fiscal swing factor",
     "publisher": "Webull News (syndicated)",
     "url": "https://www.webull.com/news/15777582402382848"
    },
    {
     "id": 24,
     "title": "Fuel Subsidy Reform Consequential For Fiscal Position",
     "publisher": "Business Today",
     "date": "2026-08-23",
     "url": "https://www.businesstoday.com.my/2026/08/23/fuel-subsidy-reform-consequential-for-fiscal-position/"
    },
    {
     "id": 25,
     "title": "Federal revenue to hit RM380.8 billion in 2027, tax collections lead growth",
     "publisher": "The Vibes",
     "url": "https://www.thevibes.com/articles/news/128137/federal-revenue-to-hit-rm380.8-billion-in-2027-tax-collections-lead-growth"
    },
    {
     "id": 26,
     "title": "RM32 bil PETRONAS dividend expected in 2027, matching 2024, 2025 payouts",
     "publisher": "KLSE Screener",
     "url": "https://www.klsescreener.com/v2/news/view/1806079/rm32-bil-petronas-dividend-expected-in-2027-matching-2024-2025-payouts"
    },
    {
     "id": 27,
     "title": "Malaysia Budget 2027 update (The Fifth MADANI Budget)",
     "publisher": "AmInvest (AmWealth Fund Management)",
     "url": "https://www.aminvest.com/docs/aminvestlibraries/knowledge/market-overview/amwealth-(fund-management-division)-malaysia-budget-2027-update.pdf?sfvrsn=70ac34d8_1"
    },
    {
     "id": 28,
     "title": "Budget 2027 Review - Rooted, Not Rash: Targeted Populism with a Fiscal Anchor",
     "publisher": "TA Research (i3investor)",
     "date": "2026-10-12",
     "url": "https://klse.i3investor.com/web/blog/detail/taresearch/2026-10-12-story-h502462139-Budget_2027_Review_Rooted_Not_Rash_Targeted_Populism_with_a_Fiscal_Ancho"
    },
    {
     "id": 29,
     "title": "Malaysia: Budget 2027 - Generous Measures, Tight Fiscal Arithmetic",
     "publisher": "PublicInvest Research (i3investor)",
     "date": "2026-10-12",
     "url": "https://klse.i3investor.com/web/blog/detail/PublicInvest/2026-10-12-story-h502462112-Malaysia_Budget_2027_Generous_Measures_Tight_Fiscal_Arithmetic_Executive"
    },
    {
     "id": 30,
     "title": "Malaysia's Budget maintains gradual fiscal consolidation - Fitch Ratings",
     "publisher": "TNGlobal",
     "date": "2026-10-14",
     "url": "https://technode.global/2026/10/14/malaysias-budget-maintains-gradual-fiscal-consolidation-fitch-ratings/"
    },
    {
     "id": 31,
     "title": "Malaysia's budget largesse limits extent of fiscal tightening, says Fitch",
     "publisher": "The Edge Malaysia",
     "url": "https://theedgemalaysia.com/node/821711"
    },
    {
     "id": 32,
     "title": "S&P affirms Malaysia's A- sovereign rating, outlook stable",
     "publisher": "The Edge Malaysia",
     "url": "https://theedgemalaysia.com/node/819709"
    },
    {
     "id": 33,
     "title": "HLIB projects fiscal deficit to widen to 3.6pct of GDP on higher fuel subsidy spending",
     "publisher": "New Straits Times",
     "url": "https://www.nst.com.my/business/economy/2026/07/1489580/hlib-projects-fiscal-deficit-widen-36pct-gdp-higher-fuel-subsidy"
    },
    {
     "id": 34,
     "title": "Malaysia may need to review RON95 subsidy to stay on track for 2026 deficit goal — HSBC",
     "publisher": "The Edge Malaysia",
     "url": "https://theedgemalaysia.com/node/808116"
    },
    {
     "id": 35,
     "title": "Malaysia's 2026 fiscal deficit seen at 3.6% as fuel subsidy reforms support consolidation",
     "publisher": "The Star",
     "date": "2026-03-27",
     "url": "https://www.thestar.com.my/business/business-news/2026/03/27/malaysias-2026-fiscal-deficit-seen-at-36-as-fuel-subsidy-reforms-support-consolidation"
    },
    {
     "id": 36,
     "title": "M'sia risks missing deficit goals on subsidy pressures",
     "publisher": "The Star",
     "date": "2026-06-11",
     "url": "https://www.thestar.com.my/business/business-news/2026/06/11/msia-risks-missing-deficit-goals-on-subsidy-pressures"
    },
    {
     "id": 37,
     "title": "IMF Executive Board Concludes 2026 Article IV Consultation with Malaysia",
     "publisher": "International Monetary Fund",
     "date": "2026-02-26",
     "url": "https://www.imf.org/en/news/articles/2026/02/26/pr-26065-malaysia-imf-executive-board-concludes-2026-article-iv-consultation"
    },
    {
     "id": 38,
     "title": "Malaysia: Article IV Consultation-Press Release; Staff Report (Country Report 2026/055)",
     "publisher": "International Monetary Fund eLibrary",
     "url": "https://www.elibrary.imf.org/downloadpdf/view/journals/002/2026/055/002.2026.issue-055-en.pdf"
    },
    {
     "id": 39,
     "title": "Malaysia spends RM11.2 bil on RON95 subsidies in eight months since targeted roll-out",
     "publisher": "The Edge Malaysia",
     "url": "https://theedgemalaysia.com/node/808194"
    },
    {
     "id": 40,
     "title": "Budi Madani Diesel: MyKad mechanism, RM2.10 per litre from July 1, 200-litre quota shared with Budi95",
     "publisher": "paultan.org",
     "date": "2026-06-22",
     "url": "https://paultan.org/2026/06/22/budi-madani-diesel-mykad-mechanism-rm2-10-per-litre-from-july-1-200-litre-quota-shared-with-budi95/"
    },
    {
     "id": 41,
     "title": "Budi Diesel: Peninsular Malaysia users to get early access of RM2.15 per litre from June 27 to July 1, 2026",
     "publisher": "paultan.org",
     "date": "2026-06-26",
     "url": "https://paultan.org/2026/06/26/budi-diesel-peninsular-malaysia-users-to-get-early-access-of-rm2-15-per-litre-from-june-27-to-july-1-2026/"
    },
    {
     "id": 42,
     "title": "Budi Diesel - frequently asked questions (FAQ) about RM2.10 per litre from July 1, 2026",
     "publisher": "paultan.org",
     "date": "2026-06-23",
     "url": "https://paultan.org/2026/06/23/budi-diesel-frequently-asked-questions/"
    },
    {
     "id": 43,
     "title": "Malaysia Expands BUDI Diesel Subsidy Scheme From 1 July 2026",
     "publisher": "OpenGov Asia",
     "url": "https://opengovasia.com/malaysia-expands-budi-diesel-subsidy-scheme-from-1-july-2026/?c=us"
    },
    {
     "id": 44,
     "title": "Welfare spending surges 380% to RM20bil as subsidies drop 40%, says Auditor-General's Report",
     "publisher": "The Star",
     "date": "2026-10-05",
     "url": "https://www.thestar.com.my/news/nation/2026/10/05/welfare-spending-surges-380-to-rm20bil-as-subsidies-drop-40-says-auditor-general039s-report"
    },
    {
     "id": 45,
     "title": "Targeted subsidy reforms help cut Malaysia's 2025 bill by RM15.67b, federal audit shows",
     "publisher": "Malay Mail",
     "date": "2026-10-05",
     "url": "https://www.malaymail.com/news/malaysia/2026/10/05/targeted-subsidy-reforms-help-cut-malaysias-2025-bill-by-rm1567b-federal-audit-shows/237772"
    },
    {
     "id": 46,
     "title": "Auditor-General's Report 2/2026: petroleum subsidies fall in 2025 (Region - Sarawak news)",
     "publisher": "Bernama",
     "url": "https://www.bernama.com/en/region/news.php?id=2615554"
    },
    {
     "id": 47,
     "title": "Government Spent Less On Your Fuel, More On Cash Aid In 2025",
     "publisher": "RinggitPlus",
     "url": "https://ringgitplus.com/en/blog/personal-finance-news/government-spent-less-on-your-fuel-more-on-cash-aid-in-2025.html"
    },
    {
     "id": 48,
     "title": "Budget 2027: Your Electricity Bill, Fuel Quota And Energy Future",
     "publisher": "The Rakyat Post",
     "date": "2026-10-09",
     "url": "https://www.therakyatpost.com/news/2026/10/09/budget-2027-your-electricity-bill-fuel-quota-and-energy-future/"
    },
    {
     "id": 49,
     "title": "Government Can Sustain Aid Despite Rising Oil Prices, Cost Of Living Pressures - Anwar",
     "publisher": "Bernama",
     "url": "https://www.bernama.com/en/general/news.php?id=2622409"
    },
    {
     "id": 50,
     "title": "Malaysia 2027 budget to tackle living costs, fiscal risks as election looms",
     "publisher": "Reuters (via Investing.com)",
     "url": "https://www.investing.com/news/stock-market-news/malaysia-2027-budget-to-tackle-living-costs-fiscal-risks-as-election-looms-4935559"
    },
    {
     "id": 51,
     "title": "BMI sees Budget 2027 subsidy allocations posing risk to Malaysia's fiscal consolidation",
     "publisher": "The Edge Malaysia",
     "url": "https://theedgemalaysia.com/node/821588"
    },
    {
     "id": 52,
     "title": "Malaysia Fuel Price This Week — RON95, RON97 & Diesel",
     "publisher": "paultan.org",
     "url": "https://paultan.org/fuel-price/"
    },
    {
     "id": 53,
     "title": "Malaysia plans $112.5 billion budget for 2027 ahead of possible election",
     "publisher": "Reuters (via 93.3 The Drive)",
     "date": "2026-10-09",
     "url": "https://www.933thedrive.com/2026/10/09/malaysia-plans-112-5-billion-budget-for-2027-ahead-of-possible-election/"
    },
    {
     "id": 54,
     "title": "High oil revenue shields Malaysian Budget 2027 projections",
     "publisher": "Sinar Daily",
     "url": "https://beta.sinardaily.my/article/738466/focus/money/high-oil-revenue-shields-malaysian-budget-2027-projections"
    },
    {
     "id": 55,
     "title": "Budget 2027: Broadly prudent, balancing fiscal consolidation with economic resilience; revenue reforms still to accelerate",
     "publisher": "RAM Rating Services",
     "url": "https://www.ram.com.my/pressrelease/?prviewid=7444"
    },
    {
     "id": 56,
     "title": "Malaysia Fiscal Deficit May Widen to 3.7% as Fuel Subsidies Pressure Budget",
     "publisher": "BigGo Finance",
     "url": "https://finance.biggo.com/news/8fbea688-d8e5-4b57-9c75-6eebecbcb692"
    },
    {
     "id": 57,
     "title": "2027 budget: the key highlights",
     "publisher": "Free Malaysia Today",
     "date": "2026-10-09",
     "url": "https://www.freemalaysiatoday.com/category/nation/2026/10/09/2027-budget-the-key-highlights"
    },
    {
     "id": 58,
     "title": "Macroeconomic resilience and policies: OECD Economic Surveys: Malaysia 2026",
     "publisher": "OECD",
     "url": "https://www.oecd.org/en/publications/oecd-economic-surveys-malaysia-2026_9ab6b826-en/full-report/macroeconomic-resilience-and-policies_4e730e26.html"
    }
   ],
   "region": "sea",
   "tag": "선별 보조(BUDI95·BUDI 디젤)",
   "fy": "1~12월",
   "overview_budget": 7,
   "overview_realised": 8,
   "group": "malaysia"
  },
  {
   "code": "TH",
   "name_kr": "태국",
   "mechanism": "태국은 에너지부 산하 석유연료기금이 정유·유통사에 리터당 보상금을 지급해 디젤·휘발유 소매가 상승을 억제하고, 가정용 LPG는 15kg 실린더 가격을 고정한다. 기금은 평시 유류 부과금으로 적립하고 적자는 차입으로 메우며, 기존 차입 여력(200억 바트)을 넘는 차입에는 재무부 보증이 필요하다. 보조금은 일반예산 밖의 기금 회계에서 나가며, OECD는 기금 적자와 긴급차입이 2026년 재정적자를 키운다고 본다. 물품세 인하는 재무부 세수 감소 경로이며 2026년 10월까지 시행되지 않았다.",
   "items": [
    {
     "label": "석유연료기금 순적자(유류+LPG 계정 누적)",
     "year": 2026,
     "kind": "balance",
     "amount": 103.561,
     "currency": "THB",
     "unit": "십억 바트",
     "period_end": "2026-10-18",
     "note": "유류 계정은 623.59억 바트, LPG 계정은 412.02억 바트 적자다. 기금 순자산(잔액) 기준이다.",
     "src": [
      2,
      3
     ],
     "usd_bn": 3.0977,
     "usd_note": "계산: 2026-11-06 환율 33.43 THB/USD"
    },
    {
     "label": "석유연료기금 순적자(유류+LPG 계정 누적)",
     "year": 2026,
     "kind": "balance",
     "amount": 98.942,
     "currency": "THB",
     "unit": "십억 바트",
     "period_end": "2026-10-04",
     "note": "석유연료기금관리청 10월 4일 재무제표 기준이다. 유류 계정은 584.29억 바트, LPG 계정은 405.13억 바트 적자다. 같은 시점 '1,000억 바트 돌파' 보도와 소폭 차이가 있다.",
     "src": [
      1,
      2
     ],
     "usd_bn": 2.9595,
     "usd_note": "계산: 2026-11-06 환율 33.43 THB/USD"
    },
    {
     "label": "석유연료기금 순적자(3월 보도)",
     "year": 2026,
     "kind": "balance",
     "amount": 12.6,
     "currency": "THB",
     "unit": "십억 바트",
     "note": "2026년 3월 보도이며, 디젤 보조 상한을 리터당 18.31바트로 설정한 시점이다. 같은 달 앞선 보도는 100억 바트였다.",
     "src": [
      8,
      23
     ],
     "usd_bn": 0.3769,
     "usd_note": "계산: 2026-11-06 환율 33.43 THB/USD"
    },
    {
     "label": "석유연료기금 유류·LPG 보조금 지급(일평균)",
     "year": 2026,
     "kind": "realised",
     "amount": 0.375,
     "currency": "THB",
     "unit": "십억 바트/일",
     "note": "2026년 10월 보도 기준이다. 정점은 하루 약 7억 바트(월 200억 바트 이상)였다.",
     "src": [
      1,
      2
     ],
     "usd_bn": 0.0112,
     "usd_note": "계산: 2026-11-06 환율 33.43 THB/USD, 일 기준"
    }
   ],
   "prices": [
    {
     "product": "디젤(상한)",
     "price": 29.94,
     "unit": "THB/L",
     "date": "2026-03",
     "note": "기금으로 15일간 상한을 설정했다.",
     "src": [
      7
     ]
    },
    {
     "product": "디젤",
     "price": 33,
     "unit": "THB/L",
     "date": "2026-03",
     "src": [
      9
     ]
    },
    {
     "product": "프리미엄 디젤(방짝 Hi Diesel S)",
     "price": 40.8,
     "unit": "THB/L",
     "date": "2026-05-01",
     "note": "기금 보조 3.12바트는 B7 기준(4월 30일 0.94바트 인상, 5월 1일 시행)이고, B20 보조는 9.18바트다. 같은 날 디젤 소매가는 0.60바트 오른 33.80바트로 보도됐다(B7/B20 구분은 원문 미확인).",
     "src": [
      20,
      21
     ]
    },
    {
     "product": "가정용 LPG 15kg",
     "price": 423,
     "unit": "THB/실린더",
     "date": "2026-10-31까지",
     "note": "kg당 보조금은 9.8642바트다.",
     "src": [
      6
     ]
    }
   ],
   "measures_2026": [
    {
     "date": "2026-03",
     "text": "에너지장관이 석유연료기금으로 디젤 소매가를 리터당 29.94바트에 15일간 묶었다.",
     "src": [
      7
     ]
    },
    {
     "date": "2026-03",
     "text": "기금의 디젤 보조 상한을 리터당 18.31바트로 정했다. 같은 시점 기금 순적자는 126억 바트다.",
     "src": [
      8
     ]
    },
    {
     "date": "2026-03",
     "text": "디젤 소매가가 리터당 33바트로 올랐다. 에너지부는 재무부가 기금 차입을 최대 1,500억 바트까지 보증하는 긴급칙령을 요청했다.",
     "src": [
      9,
      10,
      22
     ]
    },
    {
     "date": "2026-03 하순",
     "text": "재무부가 재정 안정을 이유로 유류 물품세 인하를 배제했다.",
     "src": [
      13,
      14
     ]
    },
    {
     "date": "2026-05-01",
     "text": "기금관리위원회가 4월 30일 B7 디젤 보조를 리터당 0.94바트 올린 3.12바트, B20 보조를 9.18바트로 정했다(5월 1일 시행). 같은 날 디젤 소매가는 0.60바트 오른 33.80바트로 보도됐다. 40.80바트는 방짝 프리미엄 디젤(Hi Diesel S) 가격이다.",
     "src": [
      20,
      21
     ]
    },
    {
     "date": "2026-05-05",
     "text": "내각이 최대 4,000억 바트 긴급차입 칙령안을 승인했다. 절반(2,000억 바트)은 에너지 위기 피해 가계·농민·기업 지원, 나머지는 재생에너지·EV 등 에너지 전환용이다. 하원은 위헌 심판 청구로 5월 14일 심의를 미뤘다.",
     "src": [
      15,
      18
     ]
    },
    {
     "date": "2026-09",
     "text": "에너지부가 디젤·휘발유 가격지원 기준선 리터당 30바트를 유지하고 약 1,000억 바트 신규 차입을 검토했다.",
     "src": [
      4,
      5
     ]
    },
    {
     "date": "2026-09-24",
     "text": "석유연료기금법(2019) 제55조 경과규정에 근거한 보조 장치가 이날 만료 예정이었다. 연장 여부는 미확인이다.",
     "src": [
      4,
      5
     ]
    },
    {
     "date": "2026-09-29",
     "text": "내각이 승인한 2027 회계연도 공공부채관리계획에 기금 신규 차입 보증이 빠졌다.",
     "src": [
      1
     ]
    },
    {
     "date": "2026-09~10",
     "text": "가정용 LPG 15kg 가격을 10월 31일까지 423바트로 동결하고 kg당 보조금을 7.2209바트에서 9.8642바트로 올렸다.",
     "src": [
      6,
      24
     ]
    },
    {
     "date": "2026-10",
     "text": "디젤 보조금을 위기 중 리터당 5~6바트에서 2~3바트로 줄였다. 일평균 보조금 지급은 약 7억 바트에서 3.75억 바트로 감소했다.",
     "src": [
      1,
      2
     ]
    },
    {
     "date": "2026-10",
     "text": "기금은 국내 디젤·휘발유 가격이 리터당 30바트를 넘거나 LPG 가격이 기준선을 넘을 때 보조에 쓸 수 있다.",
     "src": [
      1,
      22
     ]
    },
    {
     "date": "2026-10-21",
     "text": "기금관리위원회가 B7 디젤, 휘발유, E10 가소홀 95·91 소매가를 리터당 0.60바트 올렸다.",
     "src": [
      2,
      3
     ]
    },
    {
     "date": "2026-10",
     "text": "에너지장관(Akanat Promphan)에게 유류 물품세 리터당 1~2바트 인하를 포함한 기금 구제안 5개가 제출됐다. 디젤 물품세 리터당 2바트 이상 인하안이 승인 대기 중이다.",
     "src": [
      1,
      3
     ]
    }
   ],
   "fiscal_impact": [
    {
     "text": "기금 순적자는 3월 100억~126억 바트에서 562억 바트, 630억 바트를 거쳐 10월 18일 1,035.61억 바트로 늘었다.",
     "src": [
      23,
      8,
      19,
      20,
      2,
      3
     ]
    },
    {
     "text": "10월 4일~18일 2주간 순적자가 46.19억 바트 늘었다(단순 차감).",
     "src": [
      1,
      2,
      3
     ]
    },
    {
     "text": "기금의 기존 차입 여력 200억 바트로는 약 1,000억 바트 적자를 메울 수 없다. 에너지부는 재무부 보증 신규 차입이 불가피하다고 본다.",
     "src": [
      1,
      4,
      5
     ]
    },
    {
     "text": "9월 29일 승인된 2027 회계연도 공공부채관리계획에는 기금 신규 차입 보증이 없다.",
     "src": [
      1
     ]
    },
    {
     "text": "2026 회계연도 예산의 재정적자 목표는 8,600억 바트로 GDP 대비 약 4.3%다.",
     "src": [
      17,
      15
     ]
    },
    {
     "text": "OECD는 기금 적자와 긴급차입이 2026년 재정적자를 키운다고 평가했다. OECD 집계 2026년 3월 정부부채는 GDP 대비 66.4%다.",
     "src": [
      16
     ]
    },
    {
     "text": "공공부채 한도는 GDP 대비 70%다. 정부는 한도를 75%로 올려 약 1조 바트의 차입 여력을 늘리는 방안을 검토했다. 재무부는 잔여 여력 약 8,000억 바트를 근거로 즉시 상향은 필요 없다고 밝혔다.",
     "src": [
      15,
      18
     ]
    },
    {
     "text": "내각은 2026년 5월 5일 최대 4,000억 바트 긴급차입 칙령안을 승인했다(절반은 위기 피해 지원, 절반은 에너지 전환). 하원 심의는 5월 14일 위헌 심판 청구로 연기됐다.",
     "src": [
      15,
      18
     ]
    },
    {
     "text": "재무부는 2026 회계연도 하반기 세수 목표 미달 위험을 경고했다.",
     "src": [
      14
     ]
    }
   ],
   "sensitivity": [
    {
     "text": "물품세국 추정으로 디젤 물품세를 리터당 1바트 내리면 세수가 월 약 20억 바트, 휘발유 1바트 인하는 월 약 8억 바트 줄어든다.",
     "src": [
      12,
      13
     ]
    },
    {
     "text": "디젤·휘발유 동시 5바트 인하는 월 140억 바트, 디젤 단독 5바트는 월 100억 바트, 디젤 단독 7바트는 월 140억 바트의 세수 감소다.",
     "src": [
      12,
      13
     ]
    },
    {
     "text": "기금의 유류·LPG 보조금 지급은 정점에서 하루 약 7억 바트(월 200억 바트 이상)였고 10월에는 하루 약 3.75억 바트다.",
     "src": [
      1,
      2
     ]
    },
    {
     "text": "블룸버그는 3월 기금의 디젤 가격 억제 비용을 하루 3,200만 달러로 보도했다.",
     "src": [
      11
     ]
    },
    {
     "text": "LPG 15kg 423바트 동결에 드는 보조금은 kg당 9.8642바트다.",
     "src": [
      6
     ]
    }
   ],
   "open_items": [
    "석유연료기금관리청(OFFO) 재무제표와 내각 결의 원문",
    "2026년 누적 보조금 지급 총액(유류·LPG 분리)",
    "2025년 실적(2025년 말 기금 잔액, 연간 보조금 지급액)은 미확인이다. 확인된 것은 기금이 4년 만에 흑자로 돌아섰다는 이전 보도뿐이다.",
    "2026 회계연도 예산의 유가 가정(두바이유)과 정부의 배럴당 1달러 민감도",
    "3월 1,500억 바트 보증 긴급칙령의 공포 여부와 실제 보증 차입 실행액이 보도마다 다르다. 2026년 5월 승인된 4,000억 바트 긴급차입 중 에너지 보조 배정분도 미확인이다.",
    "디젤 물품세율이 3월 보도 리터당 7.44바트, 10월 보도 약 6바트로 엇갈린다.",
    "5월 1일 디젤 40.80바트·보조 3.12바트 수치의 출처 기사",
    "석유연료기금법 제55조 경과규정(9월 24일 만료 예정)의 연장 여부와 10월 31일 이후 LPG 가격",
    "IMF 2026년 Article IV와 신용평가사의 기금 관련 평가"
   ],
   "sources": [
    {
     "id": 1,
     "title": "Energy Ministry weighs exit strategy to cut fuel subsidies as oil fund deficit exceeds 100bn baht",
     "publisher": "The Nation (Thailand)",
     "url": "https://www.nationthailand.com/business/economy/40071947"
    },
    {
     "id": 2,
     "title": "Thailand weighs fuel subsidy cuts as Oil Fund nears B100bn",
     "publisher": "The Phuket News",
     "url": "https://www.thephuketnews.com/thailand-weighs-fuel-subsidy-cuts-as-oil-fund-nears-b100bn-101853.php"
    },
    {
     "id": 3,
     "title": "Five measures proposed to rescue Thailand's Oil Fuel Fund",
     "publisher": "Asia News Network",
     "url": "https://asianews.network/five-measures-proposed-to-rescue-thailands-oil-fuel-fund/"
    },
    {
     "id": 4,
     "title": "Thai oil fund deficit may hit 100bn baht by early October",
     "publisher": "The Nation (Thailand)",
     "url": "https://www.nationthailand.com/news/general/40071357"
    },
    {
     "id": 5,
     "title": "Thailand plans diesel subsidy cuts as fund deficit could hit 100bn baht in October",
     "publisher": "The Nation (Thailand)",
     "url": "https://www.nationthailand.com/business/economy/40071125"
    },
    {
     "id": 6,
     "title": "Thailand keeps LPG at 423 baht as oil fund deficit widens",
     "publisher": "The Nation (Thailand)",
     "url": "https://www.nationthailand.com/news/general/40069512"
    },
    {
     "id": 7,
     "title": "Energy Minister caps diesel at 29.94 baht for 15 days using Oil Fuel Fund",
     "publisher": "The Nation (Thailand)",
     "url": "https://www.nationthailand.com/news/policy/40063274"
    },
    {
     "id": 8,
     "title": "Oil Fuel Fund caps diesel support at 18.31 baht/litre as fund balance sinks to 12.6bn baht deficit",
     "publisher": "The Nation (Thailand)",
     "url": "https://www.nationthailand.com/news/general/40063847"
    },
    {
     "id": 9,
     "title": "Energy Ministry seeks Bt150bn loan guarantee decree as diesel rises to Bt33 a litre",
     "publisher": "The Nation (Thailand)",
     "url": "https://www.nationthailand.com/news/policy/40064171"
    },
    {
     "id": 10,
     "title": "Thailand weighs decree to back oil fund amid energy crisis",
     "publisher": "The Nation (Thailand)",
     "url": "https://www.nationthailand.com/news/general/40063501"
    },
    {
     "id": 11,
     "title": "Thailand's oil fund burns $32 million a day to cap diesel prices",
     "publisher": "BusinessMirror (Bloomberg)",
     "date": "2026-03-11",
     "url": "https://businessmirror.com.ph/2026/03/11/thailands-oil-fund-burns-32-million-a-day-to-cap-diesel-prices/"
    },
    {
     "id": 12,
     "title": "Thailand weighs fuel tax cuts as global oil surge tests fiscal limits",
     "publisher": "The Nation (Thailand)",
     "url": "https://www.nationthailand.com/news/general/40064462"
    },
    {
     "id": 13,
     "title": "Anutin: oil prices may rise again; Finance Ministry warns excise cuts could cost 14bn baht a month",
     "publisher": "The Nation (Thailand)",
     "url": "https://www.nationthailand.com/news/general/40064360"
    },
    {
     "id": 14,
     "title": "Revenue agencies risk missing targets in FY2026 second half amid Middle East crisis",
     "publisher": "The Nation (Thailand)",
     "url": "https://www.nationthailand.com/business/economy/40065038"
    },
    {
     "id": 15,
     "title": "Thailand may raise debt ceiling to 75% and issue emergency borrowing decree to fund crisis measures",
     "publisher": "The Nation (Thailand)",
     "url": "https://www.nationthailand.com/business/economy/40065243"
    },
    {
     "id": 16,
     "title": "Thailand: OECD Economic Outlook, Volume 2026 Issue 1",
     "publisher": "OECD",
     "url": "https://www.oecd.org/en/publications/oecd-economic-outlook-volume-2026-issue-1_2d1956f0-en/full-report/thailand_14cc31c9.html"
    },
    {
     "id": 17,
     "title": "Thailand's 2026 Budget, Explained",
     "publisher": "The Diplomat",
     "url": "https://thediplomat.com/2025/10/thailands-2026-budget-explained/"
    },
    {
     "id": 18,
     "title": "Time for government to tighten its belt as debt ceiling looms as public debt surges from the pre Covid era",
     "publisher": "Thai Examiner",
     "date": "2026-09-18",
     "url": "https://www.thaiexaminer.com/thai-news-foreigners/2026/09/18/time-for-government-to-tighten-its-belt-as-debt-ceiling-looms-as-public-debt-surges-from-pre-covid-era/"
    },
    {
     "id": 19,
     "title": "Thai fuel remains relatively cheaper in Asean, but Oil Fund deficit widens to 56.2bn baht",
     "publisher": "The Nation (Thailand)",
     "url": "https://www.nationthailand.com/news/general/40064770"
    },
    {
     "id": 20,
     "title": "Oil Fund deficit hits ฿63bn as Thailand holds energy prices",
     "publisher": "The Nation (Thailand)",
     "url": "https://www.nationthailand.com/news/general/40065943"
    },
    {
     "id": 21,
     "title": "Oil fund deficit hits as Thailand holds energy prices",
     "publisher": "Asia News Network",
     "url": "https://asianews.network/oil-fund-deficit-hits-as-thailand-holds-energy-prices/"
    },
    {
     "id": 22,
     "title": "Thailand Oil Fund Borrowing Backstop for Fuel Prices",
     "publisher": "Adalytica",
     "url": "https://adalytica.com/news/thailand-oil-fund-borrowing-fuel-prices-f67dd111"
    },
    {
     "id": 23,
     "title": "Government plans diesel rise as oil fund hits THB10 billion deficit",
     "publisher": "The Nation (Thailand)",
     "url": "https://www.nationthailand.com/blogs/news/policy/40063654"
    },
    {
     "id": 24,
     "title": "Thailand Raises LPG Subsidy to Shield Households as Fuel Fund Deficit Widens",
     "publisher": "BriefAsia",
     "url": "https://www.briefasia.com/article/thailand-raises-lpg-subsidy-fuel-fund-deficit"
    }
   ],
   "region": "sea",
   "tag": "석유연료기금 보조 · 차입",
   "fy": "10~9월",
   "overview_realised": 0,
   "group": "thai-viet-phil"
  },
  {
   "code": "VN",
   "name_kr": "베트남",
   "mechanism": "베트남은 산업무역부와 재무부가 기준가격 공식에 따라 소매 상한가를 정기 조정한다. 유통사가 소비자 가격에 얹어 적립한 가격안정기금을 가격 급등기에 인출해 인상 폭을 줄이며, 이 기금은 예산 밖 재원이다. 예산 부담은 환경보호세·부가가치세·특별소비세 인하에 따른 세수 감소로 나타나며, 2026년에는 3월 26일부터 연말까지 휘발유·디젤 등의 환경보호세를 0동으로 낮췄다. 원유 생산 세입이 예산에 들어와 유가 상승분 일부를 상쇄한다.",
   "budget_oil_price": {
    "benchmark": "베트남 원유 결제가격(예산 가정)",
    "value": 70,
    "unit": "USD/bbl",
    "year": 2026,
    "note": "국회 제출 예산안 보도는 배럴당 65~70달러 범위다. 1~10월 평균 98.86달러가 예산가 대비 28.86달러 높다는 보도로 역산하면 70달러다.",
    "src": [
     51,
     52
    ],
    "basis": "보도 역산(예산안 보도 65~70)"
   },
   "items": [
    {
     "label": "환경보호세 인하 세수 감소(2026년 기본 세율, 2018년 세율 대비)",
     "year": 2026,
     "kind": "estimate",
     "amount": 41.388,
     "currency": "VND",
     "unit": "조 동",
     "usd_bn": 1.6117,
     "usd_note": "계산: 2026-11-06 환율 25,680.00 VND/USD; 출처 표기 약 17.0억 달러",
     "note": "재무부 추정이며 2026년 소비량이 2025년과 같다고 가정했다. VAT 영향을 포함하면 총 44.699조 동이다. 3월 26일 0동 조치 이전 기준이다.",
     "src": [
      31,
      32
     ]
    },
    {
     "label": "연료 세금 인하 세수 감소(환경보호세 0동·VAT·특별소비세)",
     "year": 2026,
     "kind": "estimate",
     "amount": 7.2,
     "currency": "VND",
     "unit": "조 동/월",
     "usd_bn": 0.2804,
     "usd_note": "계산: 2026-11-06 환율 25,680.00 VND/USD, 월 기준; 출처 표기 약 2.7억 달러",
     "note": "결정 482/QĐ-TTg(3월 26일) 기준 월평균 추정치다. 12월 31일까지 연장됐으나 누적 공식 추정치는 미확인이다.",
     "src": [
      34,
      35,
      45
     ]
    },
    {
     "label": "가격안정기금(BOG) 잔액",
     "year": 2026,
     "kind": "balance",
     "amount": 195.9,
     "currency": "VND",
     "unit": "십억 동",
     "period_end": "2026-03-31",
     "note": "산업무역부 집계다. Petrolimex 단독 잔액 1.0738조 동이 전체보다 커 일부 사업자는 음(-) 잔액으로 추정된다.",
     "src": [
      48
     ],
     "usd_bn": 0.0076,
     "usd_note": "계산: 2026-11-06 환율 25,680.00 VND/USD"
    },
    {
     "label": "가격안정기금(BOG) 잔액(2025년 말)",
     "year": 2025,
     "kind": "balance",
     "amount": 5611.7,
     "currency": "VND",
     "unit": "십억 동",
     "note": "2026년 연초 잔액은 '5.6117조 동 이상'이다(2025년 말 잔액에 해당).",
     "src": [
      48
     ]
    }
   ],
   "prices": [
    {
     "product": "RON95-III",
     "price": 25240,
     "unit": "VND/L",
     "date": "2026-03-11",
     "note": "가격안정기금이 투입됐고 3,880동 인하됐다.",
     "src": [
      46
     ]
    },
    {
     "product": "RON95-III",
     "price": 30690,
     "unit": "VND/L",
     "date": "2026-03-19",
     "note": "5,115동 인상됐고 기금 인출은 지속됐다(기금 미사용 시 기준가 33,690동).",
     "src": [
      47,
      58
     ]
    },
    {
     "product": "RON95-III",
     "price": 25549,
     "unit": "VND/L",
     "date": "2026-05-21",
     "note": "상한가이며 1,471동 인상됐다.",
     "src": [
      49
     ]
    },
    {
     "product": "E10 RON95-III",
     "price": 25734,
     "unit": "VND/L",
     "date": "2026-10-29",
     "note": "상한가이며 521동 인상됐다. 기금 적립·인출은 없었다.",
     "src": [
      50
     ]
    },
    {
     "product": "디젤",
     "price": 30000,
     "unit": "VND/L",
     "date": "2026-10-29",
     "note": "헤드라인 기준 3만 동을 넘었다. 정확한 상한가는 미확인이다.",
     "src": [
      50
     ]
    }
   ],
   "measures_2026": [
    {
     "date": "2026-01-01",
     "text": "2026년 환경보호세 세율(휘발유 리터당 2,000동, 디젤 1,000동)이 12월 31일까지 적용되기 시작했다. 2018년 세율은 2027년 1월 1일 복귀 예정이다.",
     "src": [
      31,
      33
     ]
    },
    {
     "date": "2026-03-10",
     "text": "가격안정기금 인출을 늘렸지만 RON95-III 소매가가 리터당 29,120동으로 올라 29,000동을 넘었다(11일부터 적용 보도).",
     "src": [
      56,
      59
     ]
    },
    {
     "date": "2026-03-11",
     "text": "가격안정기금을 투입해 RON95-III를 리터당 3,880동 내린 25,240동으로 조정했다.",
     "src": [
      46
     ]
    },
    {
     "date": "2026-03-19",
     "text": "RON95-III를 리터당 5,115동 올린 30,690동으로 조정했다. 기금은 휘발유·등유·중유 리터당 3,000동, 디젤 4,000동을 인출했다.",
     "src": [
      47,
      58
     ]
    },
    {
     "date": "2026-03-26",
     "text": "총리 결정 482/QĐ-TTg로 휘발유(에탄올 제외)·디젤·항공유 환경보호세를 4월 15일까지 0동으로, 휘발유 특별소비세를 0%로 낮췄다. 이후 소매가는 기금을 쓰지 않고 내렸다.",
     "src": [
      34,
      36,
      37,
      60
     ]
    },
    {
     "date": "2026-04-12",
     "text": "국회 결의 19/2026/QH16으로 4월 16일~6월 30일 환경보호세 0동을 유지했다.",
     "src": [
      38,
      39
     ]
    },
    {
     "date": "2026-05-21",
     "text": "RON95-III 상한가를 리터당 1,471동 올린 25,549동으로 조정했다. 5월 14일 인하 조정에서는 기금 적립을 0으로 유지했다.",
     "src": [
      49
     ]
    },
    {
     "date": "2026-07",
     "text": "환경보호세 0동 등 연료 세금 감면을 9월 30일까지 연장했다.",
     "src": [
      40
     ]
    },
    {
     "date": "2026-09-30",
     "text": "정부 결의 43/2026/NQ-CP로 휘발유(에탄올 제외)·디젤·등유·중유·항공유 환경보호세 0동과 VAT·특별소비세 감면을 12월 31일까지 연장했다.",
     "src": [
      41,
      42,
      43,
      44,
      57
     ]
    },
    {
     "date": "2026-10-29",
     "text": "E10 RON95-III 상한가를 리터당 521동 올린 25,734동으로 조정했고 디젤은 리터당 3만 동을 넘었다. 이번 조정에서 기금 적립·인출은 없었다.",
     "src": [
      50
     ]
    }
   ],
   "fiscal_impact": [
    {
     "text": "2026년 예산은 세입 2,529.4조 동, 세출 3,159.1조 동이다.",
     "src": [
      51
     ]
    },
    {
     "text": "원유 세입 예산은 43조 동이며 생산량 약 800만 톤, 유가 배럴당 65~70달러를 가정했다.",
     "src": [
      51
     ]
    },
    {
     "text": "1~9월 원유 세입은 약 50조 동으로 연간 예산의 116.4%이고 전년 동기보다 33.8% 늘었다.",
     "src": [
      53
     ]
    },
    {
     "text": "1~10월 원유 세입은 56.3조 동으로 예산의 131%다. 같은 기간 총세입은 예산의 96.4%다.",
     "src": [
      52
     ]
    },
    {
     "text": "10월까지 원유 세입 예산 초과분 13.3조 동(단순 차감)은 월 7.2조 동인 세금 인하 비용의 약 2개월분이다.",
     "src": [
      52,
      34,
      35
     ]
    },
    {
     "text": "정부는 2026년 총세입을 3,055조 동으로 예산보다 526.3조 동 많을 것으로 전망했다(보도).",
     "src": [
      54
     ]
    },
    {
     "text": "가격안정기금 잔액은 1분기에 5.6조 동대에서 1,959억 동으로 줄어 가격 억제 여력이 작다.",
     "src": [
      48
     ]
    }
   ],
   "sensitivity": [
    {
     "text": "환경보호세 0동과 VAT·특별소비세 인하의 세수 감소는 월평균 약 7.2조 동(약 2.7억 달러)이다.",
     "src": [
      34,
      35
     ]
    },
    {
     "text": "인하 전 환경보호세는 연료 기준가격의 약 6.7%였다.",
     "src": [
      33
     ]
    },
    {
     "text": "2026년 기본 세율(휘발유 2,000동·디젤 1,000동)만으로도 2018년 세율 대비 연간 41.388조 동의 환경보호세가 줄어든다.",
     "src": [
      31,
      32,
      33
     ]
    },
    {
     "text": "1~10월 원유 평균 결제가격은 배럴당 98.86달러로 예산 가정보다 28.86달러 높았다.",
     "src": [
      52
     ]
    }
   ],
   "open_items": [
    "결정 482/QĐ-TTg, 국회 결의 19/2026/QH16, 정부 결의 43/2026/NQ-CP 원문",
    "3월 26일~12월 31일 세금 인하의 누적 세수 감소 공식 추정치는 미확인이다. 확인된 것은 월평균 7.2조 동 추정뿐이다.",
    "VAT 감면의 세율(0% 여부)·대상 품목은 1차 문서 미확인이다. vatcalc은 월 7.2조 동을 VAT 조치 효과로 표기해 보도 간 귀속이 다르다.",
    "가격안정기금 잔액은 3월 31일 1,959억 동(산업무역부) 이후 공식 수치가 미확인이다. 6월 25일 트래커는 2.6조 동 이상으로 표기해 집계 범위가 다를 수 있다.",
    "2025년 연료 환경보호세 실적 세수와 2025년 기금 인출 총액",
    "2026년 재정적자 목표(GDP 대비)와 유가 상승에 따른 수정치",
    "2026년 총세입 전망 3,055조 동(예산 대비 +526.3조 동)과 1~10월 진도율 96.4%가 서로 맞지 않는다. 재무부 원자료로는 확인되지 않았다.",
    "IMF·신용평가사의 2026년 연료 세금 인하 관련 평가"
   ],
   "sources": [
    {
     "id": 31,
     "title": "Vietnam sets 2026 environmental protection tax rates for fuel",
     "publisher": "VietNamNet",
     "url": "https://vietnamnet.vn/en/vietnam-sets-2026-environmental-protection-tax-rates-for-fuel-2453784.html"
    },
    {
     "id": 32,
     "title": "Giảm thuế bảo vệ môi trường với xăng dầu năm 2026, thu ngân sách dự kiến giảm hơn 44.000 tỷ đồng",
     "publisher": "VnEconomy",
     "url": "https://vneconomy.vn/giam-thue-bao-ve-moi-truong-voi-xang-dau-nam-2026-thu-ngan-sach-du-kien-giam-hon-44000-ty-dong.htm"
    },
    {
     "id": 33,
     "title": "Vietnam proposes 50 per cent cut to fuel environmental tax",
     "publisher": "Dtinews (Dân trí)",
     "date": "2026-03-24",
     "url": "https://dtinews.dantri.com.vn/vietnam-today/vietnam-proposes-50-per-cent-cut-to-fuel-environmental-tax-20260324220609770.htm"
    },
    {
     "id": 34,
     "title": "Vietnam cuts fuel taxes to zero till April 15 to stabilise energy market",
     "publisher": "VietNamNet",
     "url": "https://vietnamnet.vn/en/vietnam-cuts-fuel-taxes-to-zero-till-april-15-to-stabilise-energy-market-2501120.html"
    },
    {
     "id": 35,
     "title": "Giảm thuế đối với xăng, dầu từ 24 giờ ngày 26/3/2026",
     "publisher": "Báo Chính phủ",
     "date": "2026-03-27",
     "url": "https://baochinhphu.vn/giam-thue-doi-voi-xang-dau-tu-24-gio-ngay-26-3-2026-102260327005828248.htm"
    },
    {
     "id": 36,
     "title": "Environmental protection taxes on fuels temporarily removed to curb price hikes",
     "publisher": "VGP News (Báo Chính phủ)",
     "date": "2026-03-27",
     "url": "https://en.baochinhphu.vn/environmental-protection-tax-rates-on-fuels-cut-to-zero-to-curb-price-hikes-111260327093459958.htm"
    },
    {
     "id": 37,
     "title": "Environmental Tax on Gasoline, Diesel, Jet Fuel Cut to Zero from March 26, 2026",
     "publisher": "VATupdate",
     "date": "2026-03-26",
     "url": "https://www.vatupdate.com/2026/03/26/environmental-tax-on-gasoline-diesel-jet-fuel-cut-to-zero-from-march-26-2026/"
    },
    {
     "id": 38,
     "title": "Environmental protection tax on gasoline and diesel will remain at zero until the end of June.",
     "publisher": "Vietnam.vn",
     "url": "https://www.vietnam.vn/en/ap-thue-bao-ve-moi-truong-doi-voi-xang-dau-bang-0-den-het-thang-6"
    },
    {
     "id": 39,
     "title": "Nhất trí giảm thuế bảo vệ môi trường đối với xăng dầu là 0 đồng từ 16/4 đến hết 30/6/2026",
     "publisher": "Công an Nhân dân",
     "url": "https://cand.vn/su-kien-binh-luan-thoi-su/nhat-tri-giam-thue-bao-ve-moi-truong-doi-voi-xang-dau-la-0-dong-tu-16-4-den-het-30-6-2026-i802071/"
    },
    {
     "id": 40,
     "title": "Vietnam extends fuel tax relief through September 30 amid Middle East conflict",
     "publisher": "JIJI Press (Tuổi Trẻ)",
     "date": "2026-07-02",
     "url": "https://jen.jiji.com/jc/eng_agt?g=tuoitre&k=2026070200954"
    },
    {
     "id": 41,
     "title": "Vietnam extends preferential tax policies for fuel imports",
     "publisher": "VnEconomy",
     "url": "https://en.vneconomy.vn/vietnam-extends-preferential-tax-policies-for-fuel-imports.htm"
    },
    {
     "id": 42,
     "title": "Việt Nam extends preferential fuel taxes through the end of 2026",
     "publisher": "Viet Nam News",
     "url": "https://vietnamnews.vn/economy/1800981/viet-nam-extends-preferential-fuel-taxes-through-the-end-of-2026.html"
    },
    {
     "id": 43,
     "title": "Vietnam extends fuel tax relief measures until end-2026",
     "publisher": "Business Recorder (Reuters)",
     "url": "https://www.brecorder.com/news/40442154/vietnam-extends-fuel-tax-relief-measures-until-end-2026"
    },
    {
     "id": 44,
     "title": "Giảm các loại thuế đối với xăng, dầu đến hết năm 2026",
     "publisher": "Market Times",
     "url": "https://markettimes.vn/giam-cac-loai-thue-doi-voi-xang-dau-den-het-nam-2026-132160.html"
    },
    {
     "id": 45,
     "title": "Vietnam extends fuel VAT cut to zero amid energy shock",
     "publisher": "vatcalc",
     "url": "https://www.vatcalc.com/vietnam/vietnam-slashes-fuel-vat-to-zero-amid-energy-shock/"
    },
    {
     "id": 46,
     "title": "Fuel prices slashed as stabilisation fund deployed",
     "publisher": "Viet Nam News",
     "url": "https://vietnamnews.vn/economy/1767172/fuel-prices-slashed-as-stabilisation-fund-deployed.html"
    },
    {
     "id": 47,
     "title": "Retail fuel prices increase sharply, RON95 up more than VNĐ5,000 per litre",
     "publisher": "Viet Nam News",
     "url": "https://vietnamnews.vn/economy/1777744/retail-fuel-prices-increase-sharply-ron95-up-more-than-vnd5-000-per-litre.html"
    },
    {
     "id": 48,
     "title": "Petrol price stabilization fund remains at nearly VND196 billion",
     "publisher": "SGGP",
     "url": "https://en.sggp.org.vn/petrol-price-stabilization-fund-remains-at-nearly-vnd196-billion-post126788.html"
    },
    {
     "id": 49,
     "title": "Vietnam's petroleum market in May 2026",
     "publisher": "AsemConnect Vietnam (Ministry of Industry and Trade)",
     "url": "https://asemconnectvietnam.gov.vn/default.aspx?ZID1=8&ID1=2&ID8=149282"
    },
    {
     "id": 50,
     "title": "Vietnam's Fuel Prices Rise Across the Board from 3 P.M. on Oct. 29; Diesel Tops 30,000 Dong per Liter",
     "publisher": "BigGo Finance",
     "url": "https://finance.biggo.com/news/f220214e-1d21-4fdd-a513-43fe49cc5e31"
    },
    {
     "id": 51,
     "title": "Công khai dự toán ngân sách nhà nước năm 2026 trình Quốc hội",
     "publisher": "Tài chính Doanh nghiệp",
     "url": "https://taichinhdoanhnghiep.net.vn/cong-khai-du-toan-ngan-sach-nha-nuoc-nam-2026-trinh-quoc-hoi-d62199.html"
    },
    {
     "id": 52,
     "title": "Thu ngân sách nhà nước 10 tháng đạt 96,4% dự toán",
     "publisher": "Báo Đấu thầu",
     "url": "https://baodauthau.vn/thu-ngan-sach-nha-nuoc-10-thang-dat-964-du-toan-post211990.html"
    },
    {
     "id": 53,
     "title": "Thu ngân sách từ dầu thô 9 tháng đầu năm tăng gần 34% so với cùng kỳ",
     "publisher": "PetroTimes",
     "url": "https://petrotimes.vn/thu-ngan-sach-tu-dau-tho-9-thang-dau-nam-tang-gan-34-so-voi-cung-ky-746288.html"
    },
    {
     "id": 54,
     "title": "Thu ngân sách năm 2026 dự kiến vượt 3 triệu tỷ đồng, vượt dự toán khoảng 526.300 tỷ đồng",
     "publisher": "VnBusiness",
     "url": "https://vnbusiness.vn/thu-ngan-sach-nam-2026-du-kien-vuot-3-trieu-ti-dong-vuot-du-toan-khoang-526300-ty-dong.html"
    },
    {
     "id": 56,
     "title": "With a sharp increase in spending from the price stabilization fund, the price of RON95-III gasoline exceeded 29,000 VND per liter.",
     "publisher": "Vietnam.vn",
     "url": "https://www.vietnam.vn/en/tang-manh-muc-chi-quy-binh-on-mat-hang-xang-ron95-iii-vuot-29-000-dong-moi-lit"
    },
    {
     "id": 57,
     "title": "Vietnam Extends VAT and Excise Relief for Petroleum Products Through Year-End",
     "publisher": "VATupdate",
     "date": "2026-10-03",
     "url": "https://www.vatupdate.com/2026/10/03/vietnam-extends-vat-and-excise-relief-for-petroleum-products-through-year-end/"
    },
    {
     "id": 58,
     "title": "Vietnam raises retail fuel prices, with RON95 jumping by over VND5,000 a litre",
     "publisher": "The Nation (Thailand)",
     "url": "https://www.nationthailand.com/blogs/news/world/40064042"
    },
    {
     "id": 59,
     "title": "Retail fuel prices in Vietnam rise sharply in March 5 adjustment",
     "publisher": "Asia News Network",
     "url": "https://asianews.network/retail-fuel-prices-in-vietnam-rise-sharply-in-march-5-adjustment/"
    },
    {
     "id": 60,
     "title": "Environmental protection tax on fuels cut to zero to curb rising energy costs",
     "publisher": "Viet Nam News",
     "url": "https://vietnamnews.vn/economy/1778238/environmental-protection-tax-on-fuels-cut-to-zero-to-curb-rising-energy-costs.html"
    }
   ],
   "region": "sea",
   "tag": "가격안정기금 · 세금 인하",
   "fy": "1~12월",
   "overview_budget": 1,
   "group": "thai-viet-phil"
  },
  {
   "code": "PH",
   "name_kr": "필리핀",
   "mechanism": "필리핀은 소매가 상한이나 가격안정기금 없이 예산 기반 표적 현금보조와 물품세 정지로 대응한다. 대중교통 운전자 연료보조(Pantawid Pasada 계열)는 교통부(DOTr), 농어민 연료보조는 농업부(DA) 예산에서 나가며, DOTr 보조는 에너지부(DOE) 유가 트리거를 충족해야 지급된다. 2026년 3월 제정된 RA 12316은 두바이유 월평균이 배럴당 80달러를 넘으면 대통령이 연료 물품세를 정지·인하할 수 있게 했고, 실제 정지는 LPG·등유에 한정됐다.",
   "budget_oil_price": {
    "benchmark": "Dubai",
    "unit": "USD/bbl",
    "year": 2026,
    "note": "2025년 12월 192차 DBCC의 2026년 가정은 배럴당 60~70달러다(범위만 제시). 2026년 7월 8일 193차 DBCC가 80~100달러로 상향했고 2027년 70~90달러, 2028~2030년 60~80달러를 가정한다.",
    "src": [
     92,
     93,
     94
    ],
    "range": "2025년 12월 60~70달러, 2026년 7월 80~100달러로 상향"
   },
   "items": [
    {
     "label": "DOTr 연료보조금(2025 GAA 계속비, DBM 신속 배정)",
     "year": 2026,
     "kind": "budget",
     "amount": 2.49,
     "currency": "PHP",
     "unit": "십억 페소",
     "note": "2026년 3월 DBM이 2025년 GAA 계속비(25억 페소)에서 배정한 금액이며 실제 지급액은 미확인이다. 대상은 PUV·택시·TNVS·트라이시클이다. 2026년 GAA 항목은 미확인이다.",
     "src": [
      81,
      82,
      83
     ],
     "period": "2025년 예산 계속비, 2026년 3월 배정",
     "usd_bn": 0.0395,
     "usd_note": "계산: 2026-11-07 환율 63.03 PHP/USD"
    },
    {
     "label": "농어민 연료보조금(4월 배정 예정분)",
     "year": 2026,
     "kind": "budget",
     "amount": 0.1,
     "currency": "PHP",
     "unit": "십억 페소",
     "note": "농민은 1인당 5,000페소, 어민은 3,000페소다.",
     "src": [
      86
     ],
     "usd_bn": 0.0016,
     "usd_note": "계산: 2026-11-07 환율 63.03 PHP/USD"
    },
    {
     "label": "대통령 농어민 지원(PAFF) 배정",
     "year": 2026,
     "kind": "budget",
     "amount": 10,
     "currency": "PHP",
     "unit": "십억 페소",
     "period_end": "2026-06-04",
     "note": "약 100억 페소 배정이 보도됐다. 연료 보조 성격 비중은 미확인이다.",
     "src": [
      87
     ],
     "usd_bn": 0.1587,
     "usd_note": "계산: 2026-11-07 환율 63.03 PHP/USD"
    },
    {
     "label": "DA UPLIFT 연료보조(농어민·농산물 운송)",
     "year": 2026,
     "kind": "budget",
     "amount": 3,
     "currency": "PHP",
     "unit": "십억 페소",
     "note": "2026-10-02에 발표됐고 약 30만 명이 대상이다. 재원 예산 항목은 미확인이다.",
     "src": [
      88
     ],
     "usd_bn": 0.0476,
     "usd_note": "계산: 2026-11-07 환율 63.03 PHP/USD"
    },
    {
     "label": "LPG·등유 물품세 정지 세수 감소",
     "year": 2026,
     "kind": "estimate",
     "amount": 4.1,
     "currency": "PHP",
     "unit": "십억 페소",
     "note": "DOF 추정치다. 대상 기간(4월 1차 3개월분 여부)은 미확인이다.",
     "src": [
      75
     ],
     "usd_bn": 0.065,
     "usd_note": "계산: 2026-11-07 환율 63.03 PHP/USD"
    }
   ],
   "measures_2026": [
    {
     "date": "2026-03-04",
     "text": "교통부(DOTr)가 2025년 GAA 계속비 25억 페소로 PUV·택시·TNVS·트라이시클 운전자 연료보조금 지급을 준비했다. 지급은 에너지부(DOE) 유가 트리거 충족이 조건이다.",
     "src": [
      81,
      82
     ]
    },
    {
     "date": "2026-03",
     "text": "예산관리부(DBM)가 DOTr 연료보조 프로그램에 24.9억 페소를 신속 배정했다. 메트로마닐라 트라이시클 운전자 13.9만 명에게 AICS로 1회 5,000페소 지급이 시작됐다.",
     "src": [
      83,
      84
     ]
    },
    {
     "date": "2026-03",
     "text": "DBM은 2026년 예산의 재해기금 398억 페소 일부를 연료보조금에 쓸 수 있다고 밝혔다.",
     "src": [
      85
     ]
    },
    {
     "date": "2026-03-25",
     "text": "RA 12316에 서명했다(4월 9일 시행). 두바이유 월평균이 배럴당 80달러를 넘으면 대통령이 연료 물품세를 정지·인하할 수 있고, 1회 최장 3개월, 총 1년 한도다.",
     "src": [
      74,
      78,
      79
     ]
    },
    {
     "date": "2026-04-07",
     "text": "농어민 연료보조금 1억 페소가 한 달 지연 끝에 4월 배정 예정으로 발표됐다. 1인당 농민 5,000페소, 어민 3,000페소다.",
     "src": [
      86
     ]
    },
    {
     "date": "2026-04-16",
     "text": "LPG·등유 물품세를 3개월 정지했다(1차). 휘발유·디젤은 제외했다.",
     "src": [
      76
     ]
    },
    {
     "date": "2026-06-04",
     "text": "농업부(DA)가 농민 연료보조금 2,500만 페소(5,000명, 1인당 5,000페소)를 추가 확보했다. 대통령 농어민 지원(PAFF)에서는 약 100억 페소가 배정됐다.",
     "src": [
      87
     ]
    },
    {
     "date": "2026-07-08",
     "text": "193차 DBCC가 2026년 두바이유 가정을 배럴당 60~70달러에서 80~100달러로 올렸다.",
     "src": [
      92,
      93
     ]
    },
    {
     "date": "2026-09-22",
     "text": "직전 1개월 두바이유 평균 배럴당 99.41달러를 근거로 LPG·등유 물품세 2차 정지에 서명했다. 자동차용 LPG·석유화학 원료·항공유와 휘발유·디젤은 대상이 아니며 DBCC가 매월 연장 여부를 검토한다.",
     "src": [
      73,
      77,
      98
     ]
    },
    {
     "date": "2026-09-30",
     "text": "DOE가 석유회사에 월간 연료 원가 보고를 의무화해 물품세 정지 검토 자료로 쓴다.",
     "src": [
      73,
      98
     ]
    },
    {
     "date": "2026-10-02",
     "text": "DA가 UPLIFT 연계 30억 페소 연료보조금으로 농어민·농산물 운송기사 약 30만 명을 지원한다고 밝혔다. 농어민은 1회 5,000페소, 운송업자는 주 2,000페소다.",
     "src": [
      88
     ]
    }
   ],
   "fiscal_impact": [
    {
     "text": "1~9월 재정적자는 1조 3,030억 페소로 전년 동기 1조 1,170억 페소보다 16.64% 늘었다.",
     "src": [
      89,
      96
     ]
    },
    {
     "text": "9개월 적자는 계획치 약 1조 2,060억 페소를 8.08%(970억 페소) 넘었다. 세입은 목표 3조 5,700억 페소에 339억 페소(0.9%) 못 미쳤다.",
     "src": [
      90,
      97
     ]
    },
    {
     "text": "연간 적자 상한은 1조 6,600억 페소(GDP 대비 5.4%)이며 9개월 누적이 상한의 78.56%를 썼다.",
     "src": [
      91,
      96
     ]
    },
    {
     "text": "9월 단월 적자는 2,489억 페소로 전년 동월 2,481억 페소와 같은 수준이다.",
     "src": [
      89,
      91
     ]
    },
    {
     "text": "193차 DBCC는 재정적자를 2026년 GDP 대비 5.4%에서 2030년 3.5%로 줄이는 경로를 제시했고 2026년 성장률 목표를 3.5~4.5%로 낮췄다.",
     "src": [
      92,
      93,
      95
     ]
    },
    {
     "text": "국고국은 관세 수입 증가 요인으로 페소 약세와 유가 상승을 들었다.",
     "src": [
      89
     ]
    },
    {
     "text": "DOF는 물품세 일괄 정지보다 표적 직접지원을 선호한다.",
     "src": [
      77
     ]
    }
   ],
   "sensitivity": [
    {
     "text": "DOF는 5~12월 석유제품 물품세 전면 정지 시 세수 손실을 1,360억 페소(물품세 1,214억, VAT 146억)로 추정했다.",
     "src": [
      71
     ]
    },
    {
     "text": "DOF는 LPG·등유·디젤·휘발유 물품세 3개월 정지 비용을 436억 페소로 추정했다. VAT 증가분 130억~140억 페소를 감안한 순손실은 약 300억 페소다.",
     "src": [
      72
     ]
    },
    {
     "text": "현행 물품세는 휘발유 리터당 10페소, 디젤 리터당 6페소이고 12% VAT가 별도로 붙는다.",
     "src": [
      80,
      98
     ]
    },
    {
     "text": "RA 12316의 물품세 정지 요건은 두바이유 월평균 배럴당 80달러 초과다. 9월 2차 정지 직전 1개월 평균은 99.41달러였다.",
     "src": [
      73,
      74
     ]
    }
   ],
   "open_items": [
    "GAA, 행정명령(EO), DOF 보도자료 원문",
    "2026년 GAA의 연료보조금 항목(DOTr Fuel Subsidy Program, DA 연료 할인) 금액은 미확인이다. 25억 페소는 2025년 GAA 계속비다.",
    "2026년 연료보조금 실제 지급 누계와 2025년 연료보조금 실적",
    "DOTr 보조금의 두바이유 월평균 80달러 트리거는 GAA 특별조항 원문으로 확인되지 않았다.",
    "LPG·등유 물품세 정지 행정명령 번호가 보도마다 다르다(EO 144를 4월분으로, EO 125를 9월분으로 보도). 2차 정지의 세수 손실 추정치와 41억 페소 추정의 대상 기간은 미확인이다.",
    "정부의 유가 민감도(두바이유 배럴당 1달러당 적자·보조금 변화)",
    "대통령 농어민 지원(PAFF) 100억 페소 중 연료 보조 성격의 비중",
    "IMF·신용평가사의 2026년 필리핀 연료 지원 관련 평가"
   ],
   "sources": [
    {
     "id": 71,
     "title": "Excise tax suspension could cost PH P136-B in 2026",
     "publisher": "Philippine Daily Inquirer",
     "url": "https://newsinfo.inquirer.net/2192719/ph-may-lose-p136-b-in-2026-if-excise-tax-suspended-starting-may"
    },
    {
     "id": 72,
     "title": "DOF: Suspension of excise tax projects a P43.6 billion loss",
     "publisher": "Daily Tribune",
     "date": "2026-04-14",
     "url": "https://tribune.net.ph/amp/story/2026/04/14/dof-suspension-of-excise-tax-projects-a-p436-billion-loss"
    },
    {
     "id": 73,
     "title": "DOE orders monthly fuel cost reports",
     "publisher": "The Philippine Star",
     "date": "2026-09-30",
     "url": "https://www.philstar.com/business/2026/09/30/2559819/doe-orders-monthly-fuel-cost-reports"
    },
    {
     "id": 74,
     "title": "EXPLAINER: Marcos Signs Law to Suspend Excise Tax—What Does It Mean for Gas Prices?",
     "publisher": "SPOT.ph",
     "date": "2026-03-26",
     "url": "https://www.spot.ph/newsfeatures/policy/what-is-fuel-excise-taxand-how-can-suspending-it-help-with-rising-prices-a5229-20260326-bsc"
    },
    {
     "id": 75,
     "title": "Gov't faces P4.1B revenue loss from LPG, kerosene excise tax suspension - DOF",
     "publisher": "GMA News",
     "url": "https://www.gmanetwork.com/news/money/economy/983843/government-revenue-lpg-kerosene-tax-suspension/story/"
    },
    {
     "id": 76,
     "title": "Balancing the Sheet: Fiscal adequacy in quandary on excise tax",
     "publisher": "Grant Thornton Philippines",
     "url": "https://www.grantthornton.com.ph/insights/articles-and-updates1/lets-talk-tax/balancing-the-sheet-fiscal-adequacy-in-quandary-on-excise-tax/"
    },
    {
     "id": 77,
     "title": "LPG and kerosene excise taxes are suspended again: how much you save per tank",
     "publisher": "Astig.ph",
     "url": "https://astig.ph/dof-suspends-lpg-kerosene-excise-tax-2026/"
    },
    {
     "id": 78,
     "title": "The fiscal quandary posed by waiving excise tax",
     "publisher": "BusinessWorld",
     "date": "2026-04-20",
     "url": "https://www.bworldonline.com/economy/2026/04/20/744269/the-fiscal-quandary-posed-by-waiving-excise-tax/"
    },
    {
     "id": 79,
     "title": "DOF hit for not exploring excise tax suspension on existing fuel supply",
     "publisher": "Philippine Daily Inquirer",
     "url": "https://newsinfo.inquirer.net/2211326/dof-hit-for-not-exploring-excise-tax-suspension-on-existing-fuel-supply"
    },
    {
     "id": 80,
     "title": "How will suspending fuel excise taxes cushion a big oil price hike?",
     "publisher": "Rappler",
     "url": "https://www.rappler.com/newsbreak/explainers/how-suspending-fuel-excise-tax-cushion-big-oil-price-hike/"
    },
    {
     "id": 81,
     "title": "DOTr prepares P2.5B fuel subsidy amid rising oil prices",
     "publisher": "Daily Tribune",
     "date": "2026-03-04",
     "url": "https://tribune.net.ph/2026/03/04/dotr-prepares-p25b-fuel-subsidy-amid-rising-oil-prices"
    },
    {
     "id": 82,
     "title": "LTFRB-10 prepares fuel subsidy for public transport drivers, operators",
     "publisher": "Philippine Information Agency",
     "url": "https://pia.gov.ph/news/ltfrb-10-prepares-fuel-subsidy-for-public-transport-drivers-operators/"
    },
    {
     "id": 83,
     "title": "DBM releases fuel subsidy; diesel seen hitting P130/L",
     "publisher": "Philippine Daily Inquirer",
     "url": "https://newsinfo.inquirer.net/2198872/dbm-releases-fuel-subsidy-diesel-seen-hitting-p-130-l"
    },
    {
     "id": 84,
     "title": "Fuel subsidy rollout begins nationwide: How much are drivers entitled to?",
     "publisher": "The Philippine Star",
     "date": "2026-03-24",
     "url": "https://www.philstar.com/headlines/2026/03/24/2516495/fuel-subsidy-rollout-begins-nationwide-how-much-are-drivers-entitled-to"
    },
    {
     "id": 85,
     "title": "DBM: Calamity fund can cover fuel subsidies amid oil hike",
     "publisher": "GMA News",
     "url": "https://www.gmanetwork.com/news/topstories/nation/979409/dbm-calamity-fund-can-cover-fuel-subsidies-amid-oil-hike/story/"
    },
    {
     "id": 86,
     "title": "P100M fuel subsidies for farmers, fisherfolk set for release this month",
     "publisher": "Daily Tribune",
     "date": "2026-04-07",
     "url": "https://tribune.net.ph/2026/04/07/oil-subsidies-for-farmers-fisherfolk-up-for-release-after-month-long-delay"
    },
    {
     "id": 87,
     "title": "DA secures additional P25M fuel subsidy for farmers",
     "publisher": "The Manila Times",
     "date": "2026-06-04",
     "url": "https://www.manilatimes.net/2026/06/04/business/top-business/da-secures-additional-p25m-fuel-subsidy-for-farmers/2358094"
    },
    {
     "id": 88,
     "title": "300,000 farmers, fisherfolk, agri truckers to get P3-B fuel subsidy",
     "publisher": "NewsWatch Plus",
     "date": "2026-10-02",
     "url": "https://www.newswatchplus.ph/2026/10/02/300000-farmers-fisherfolk-agri-truckers-to-get-p3-b-fuel-subsidy/"
    },
    {
     "id": 89,
     "title": "Philippine budget deficit widens slightly in September",
     "publisher": "BusinessWorld",
     "date": "2026-10-22",
     "url": "https://bworldonline.com/top-stories/2026/10/22/788740/philippine-budget-deficit-widens-slightly-in-september/"
    },
    {
     "id": 90,
     "title": "Philippine ₱1.3-trillion budget deficit overshoots 9-month target by ₱97 billion as spending runs ahead",
     "publisher": "Manila Bulletin",
     "date": "2026-10-22",
     "url": "https://mb.com.ph/2026/10/22/philippine-13-trillion-budget-deficit-overshoots-9-month-target-by-97-billion-as-spending-runs-ahead"
    },
    {
     "id": 91,
     "title": "Budget shortfall widens in Sept to P249B",
     "publisher": "The Manila Times",
     "date": "2026-10-23",
     "url": "https://www.manilatimes.net/2026/10/23/business/top-business/budget-shortfall-widens-in-sept-to-p249b/2452242"
    },
    {
     "id": 92,
     "title": "193rd DBCC Statement on the Review of the Medium-Term Macroeconomic Assumptions and Fiscal Program for Fiscal Year (FY) 2026 to 2030",
     "publisher": "Department of Budget and Management",
     "url": "https://www.dbm.gov.ph/index.php/management-2/4081-193rd-dbcc-statement-on-the-review-of-the-medium-term-macroeconomic-assumptions-and-fiscal-program-for-fiscal-year-fy-2026-to-2030"
    },
    {
     "id": 93,
     "title": "193rd DBCC Joint Statement: Review of the Medium-Term Macroeconomic Assumptions and Fiscal Program",
     "publisher": "Department of Finance",
     "url": "https://www.dof.gov.ph/wp-content/uploads/2026/07/193rd-DBCC-Joint-Statement.pdf"
    },
    {
     "id": 94,
     "title": "Macroeconomic Parameters Assumptions, FYs 2026-2030 (192nd DBCC)",
     "publisher": "Department of Budget and Management",
     "url": "https://www.dbm.gov.ph/wp-content/uploads/DBCC/2026/MT-Macro-Assumptions-2026-2030_192nd-DBCC.pdf"
    },
    {
     "id": 95,
     "title": "DBCC revises medium-term economic, fiscal targets amid external risks",
     "publisher": "Philippine News Agency",
     "url": "https://www.pna.gov.ph/articles/1279006"
    },
    {
     "id": 96,
     "title": "Philippines Budget Deficit Widens in September",
     "publisher": "TradingView (Trading Economics)",
     "url": "https://www.tradingview.com/news/te_news:594156:0-philippines-budget-deficit-widens-in-september/"
    },
    {
     "id": 97,
     "title": "The budget deficit stayed flat in September at P248.9 billion. The nine-month gap is already 8 percent over program",
     "publisher": "Astig.ph",
     "url": "https://astig.ph/philippines-budget-deficit-september-2026-p248-9-billion/"
    },
    {
     "id": 98,
     "title": "Philippines Orders Monthly Fuel Cost Reports to Guide Excise Tax Review",
     "publisher": "BigGo Finance",
     "url": "https://finance.biggo.com/news/92c70281-ff0c-4217-b8cc-c537ee0ab3a5"
    }
   ],
   "region": "sea",
   "tag": "운송·농어민 현금 보조",
   "fy": "1~12월",
   "overview_budget": 0,
   "group": "thai-viet-phil"
  },
  {
   "code": "IN",
   "name_kr": "인도",
   "mechanism": "휘발유·경유 소매가는 국영 석유판매사(OMC: IOCL·BPCL·HPCL)가 정한다. 2026년 원가 상승분은 OMC 미회수손실(under-recovery)과 중앙정부 유류 특별소비세 인하로 흡수됐다. 가정용 LPG는 OMC가 원가 아래로 팔고, 정부가 예산의 LPG 보조금과 OMC 손실 일회성 보전금으로 일부를 메운다. SBI Research 추정으로 FY2026-27 소비세 인하 세수 감소(1.1조 루피)는 석유·LPG 보조금 추가분(약 48,000크로르 루피)보다 크다.",
   "items": [
    {
     "label": "LPG 보조금(석유 보조금)",
     "year": 2026,
     "kind": "budget",
     "amount": 11085,
     "currency": "INR",
     "unit": "크로르 루피",
     "note": "FY2026-27(2026.4~2027.3) 예산(BE)이다. PRS 분석 기준 FY2025-26 RE 대비 -27%다. PMUY 연결 9,200크로르·PAHAL DBT 1,500크로르를 포함한다. PSU Watch도 11,084.5크로르로 적어 12,085크로르 표기는 오기로 보인다.",
     "src": [
      5,
      7
     ],
     "period": "FY2026-27",
     "usd_bn": 1.1804,
     "usd_note": "계산: 2026-11-07 환율 93.91 INR/USD"
    },
    {
     "label": "LPG 보조금(석유 보조금)",
     "year": 2025,
     "kind": "revised",
     "amount": 15121,
     "currency": "INR",
     "unit": "크로르 루피",
     "note": "FY2025-26 수정예산(RE)이다. 두 출처가 같은 값을 제시한다. 실적은 발표되지 않았다.",
     "src": [
      5,
      7
     ],
     "kind_label": "수정 추정(RE)"
    },
    {
     "label": "OMC 가정용 LPG 미회수손실 일회성 보전금",
     "year": 2026,
     "kind": "budget",
     "amount": 17500,
     "currency": "INR",
     "unit": "크로르 루피",
     "note": "FY2026-27 BE다. FY2025-26 RE 12,500크로르에 이은 배정이다. 두 해 합계 30,000크로르는 2025년 8월 각의 승인액과 같다(동일 건 여부는 원문 미확인).",
     "src": [
      5,
      6
     ],
     "usd_bn": 1.8635,
     "usd_note": "계산: 2026-11-07 환율 93.91 INR/USD"
    },
    {
     "label": "OMC 가정용 LPG 미회수손실 일회성 보전금",
     "year": 2025,
     "kind": "revised",
     "amount": 12500,
     "currency": "INR",
     "unit": "크로르 루피",
     "note": "FY2025-26 RE다.",
     "src": [
      5,
      6
     ],
     "kind_label": "수정 추정(RE)"
    },
    {
     "label": "OMC LPG 손실보전(각의 승인)",
     "year": 2025,
     "kind": "budget",
     "amount": 30000,
     "currency": "INR",
     "unit": "크로르 루피",
     "note": "2025년 8월 각의에서 승인됐다. IISD는 승인 당시 누적 미회수손실이 50,000크로르를 넘었다고 적었다.",
     "src": [
      4
     ]
    },
    {
     "label": "석유천연가스부(MoPNG) 총예산",
     "year": 2026,
     "kind": "budget",
     "amount": 30443,
     "currency": "INR",
     "unit": "크로르 루피",
     "note": "FY2026-27 BE로 FY2025-26 RE 대비 +2%다. LPG 지원이 부처 예산의 대부분이다.",
     "src": [
      5,
      6
     ],
     "usd_bn": 3.2417,
     "usd_note": "계산: 2026-11-07 환율 93.91 INR/USD"
    },
    {
     "label": "가정용 LPG 미회수손실 전망(OMC 부담)",
     "year": 2026,
     "kind": "estimate",
     "amount": 60000,
     "currency": "INR",
     "unit": "크로르 루피",
     "usd_bn": 6.3891,
     "usd_note": "계산: 2026-11-07 환율 93.91 INR/USD; 출처 표기 약 70.0억 달러",
     "note": "IISD 전망이다. 가정용 가격 실린더당 913루피 유지를 가정했고, FY2026-27 '초과 가능' 하한이다.",
     "src": [
      4
     ]
    },
    {
     "label": "유류 특별소비세 인하 세수 감소(SBI Research 추정)",
     "year": 2026,
     "kind": "estimate",
     "amount": 1.1,
     "currency": "INR",
     "unit": "조 루피(lakh crore)",
     "note": "FY2026-27 재정적자 초과 요인 중 소비세 인하분이다. 2026년 11월 초 보도됐다.",
     "src": [
      10,
      11
     ],
     "usd_bn": 11.7133,
     "usd_note": "계산: 2026-11-07 환율 93.91 INR/USD"
    },
    {
     "label": "석유·LPG 보조금 추가 소요(SBI Research 추정)",
     "year": 2026,
     "kind": "estimate",
     "amount": 48000,
     "currency": "INR",
     "unit": "크로르 루피",
     "note": "FY2026-27 예산 대비 추가분이며 '약' 48,000크로르다.",
     "src": [
      10
     ],
     "usd_bn": 5.1113,
     "usd_note": "계산: 2026-11-07 환율 93.91 INR/USD"
    },
    {
     "label": "유류 특별소비세 인하 연간 세수 감소(Deven Choksey 추정)",
     "year": 2026,
     "kind": "estimate",
     "amount": 1.5,
     "currency": "INR",
     "unit": "조 루피",
     "pct_note": "재정적자 영향 40~45bp",
     "note": "2026-03-27 인하 직후 추정치다.",
     "src": [
      8
     ],
     "usd_bn": 15.9727,
     "usd_note": "계산: 2026-11-07 환율 93.91 INR/USD"
    },
    {
     "label": "유류 특별소비세 인하 12개월 세수 감소(IDFC First Bank 추정)",
     "year": 2026,
     "kind": "estimate",
     "amount": 1.8,
     "currency": "INR",
     "unit": "조 루피",
     "pct_gdp": 0.5,
     "pct_note": "재정적자 확대 최대치(GDP 대비 %p)",
     "src": [
      9
     ],
     "usd_bn": 19.1673,
     "usd_note": "계산: 2026-11-07 환율 93.91 INR/USD"
    }
   ],
   "measures_2026": [
    {
     "date": "2026-03-07",
     "text": "OMC는 가정용 LPG 14.2kg 가격을 실린더당 60루피 올렸다. 델리 가격은 853루피에서 913루피가 됐다. 상업용 실린더는 115루피 올랐다.",
     "src": [
      12
     ]
    },
    {
     "date": "2026-03-27",
     "text": "원유가 배럴당 100달러를 넘자 정부는 휘발유 특별소비세를 리터당 13루피에서 3루피로, 경유는 10루피에서 0으로 내렸다. 정부는 소매가 인상 억제가 목적이라고 밝혔다. 경유 수출에 리터당 21.5루피, 항공유 수출에 29.5루피를 새로 과세했고 세율은 2주마다 재검토한다.",
     "src": [
      1,
      2,
      3
     ]
    },
    {
     "date": "2026-06-07",
     "text": "OMC는 가정용 LPG를 실린더당 29루피 더 올렸다. 델리 가격은 942루피, 3개월 누적 인상폭은 89루피다.",
     "src": [
      14,
      15
     ]
    },
    {
     "date": "2026-08-03",
     "text": "경유 수출 특별추가소비세(SAED)를 리터당 25.5루피로 올렸다(고시 40/2026-Central Excise).",
     "src": [
      18
     ]
    },
    {
     "date": "2026-10 중순",
     "text": "휘발유 수출 SAED를 리터당 2.50루피로 5배 올리고, 경유 수출 SAED는 약 47% 내린 8.50루피로 조정했다(고시 54/2026-Central Excise).",
     "src": [
      17
     ]
    },
    {
     "date": "2026-10 말(토요일 고시)",
     "text": "휘발유 수출 SAED를 2.50루피에서 0으로 없앴다. 경유 수출 SAED는 8.50루피에서 11.50루피로, 항공유는 10.50루피에서 11루피로 올렸다.",
     "src": [
      16
     ]
    }
   ],
   "prices": [
    {
     "product": "가정용 LPG 14.2kg(델리)",
     "price": 913,
     "unit": "루피/실린더",
     "date": "2026-03-07",
     "note": "853루피에서 60루피 인상됐다.",
     "src": [
      12
     ]
    },
    {
     "product": "가정용 LPG 14.2kg(델리)",
     "price": 942,
     "unit": "루피/실린더",
     "date": "2026-06-07",
     "note": "29루피 인상됐다. 3개월 누적은 89루피다.",
     "src": [
      14,
      15
     ]
    }
   ],
   "sensitivity": [
    {
     "text": "Deven Choksey는 리터당 10루피 소비세 인하의 연간 세수 감소를 약 1.5조 루피, 재정적자 영향을 40~45bp로 추정했다(2026-03-27).",
     "src": [
      8
     ]
    },
    {
     "text": "IDFC First Bank는 같은 인하의 12개월 세수 감소를 약 1.8조 루피, 재정적자 확대를 GDP 대비 최대 0.5%p로 추정했다.",
     "src": [
      9
     ]
    },
    {
     "text": "3월 27일 인하 직전 OMC 미회수손실은 휘발유 리터당 약 26루피(0.3달러), 경유 리터당 약 82루피(0.9달러)였다.",
     "src": [
      1,
      2
     ]
    },
    {
     "text": "석유부는 최근 인상 뒤에도 가정용 LPG 실린더당 손실을 약 650루피로 제시했다(시점 미확인). 석유차관 추정치는 실린더당 약 690루피다.",
     "src": [
      14,
      13
     ]
    },
    {
     "text": "IISD는 가정용 LPG 가격이 실린더당 913루피에 머물면 FY2026-27 LPG 미회수손실이 60,000크로르 루피(약 70억 달러)를 넘을 수 있다고 전망했다.",
     "src": [
      4
     ]
    }
   ],
   "fiscal_impact": [
    {
     "text": "FY2026-27 예산 재정적자 목표는 GDP 대비 4.3%(1,695,768크로르 루피)다. FY2025-26 RE는 4.4%, FY2024-25 실적은 4.8%다.",
     "src": [
      7
     ]
    },
    {
     "text": "SBI Research는 FY2026-27 재정적자가 예산보다 약 1.2조 루피 많은 GDP 대비 4.7%에 이를 수 있다고 추정했다(2026년 11월 초 보도).",
     "src": [
      10,
      11
     ]
    },
    {
     "text": "SBI는 압박 요인으로 소비세 인하 1.1조 루피, 비료 보조금 추가 90,000크로르 루피, 석유·LPG 보조금 약 48,000크로르 루피를 제시했다.",
     "src": [
      10
     ]
    },
    {
     "text": "SBI는 추가 차입 없이 현금잔고로 부족분을 메울 수 있다고 봤다.",
     "src": [
      11
     ]
    },
    {
     "text": "CGA 기준 2026년 4~9월 재정적자는 7.14조 루피로 연간 예산의 약 42%다. 전년 같은 기간은 약 37%였다.",
     "src": [
      19
     ]
    },
    {
     "text": "2026년 4~9월 주요 보조금 집행액은 연간 예산의 54%다.",
     "src": [
      19
     ]
    },
    {
     "text": "Deven Choksey는 소비세 인하로 FY2026-27 재정적자가 목표 4.3%에서 4.75% 안팎으로 오를 수 있다고 봤다.",
     "src": [
      8
     ]
    }
   ],
   "open_items": [
    "PRS 원문",
    "FY2026-27 LPG 보조금 BE는 PRS 11,085크로르, 다른 예산 요약표 12,085크로르로 다르다. FY2024-25 실적도 15,479와 14,479로 엇갈리며, 예산서(Expenditure Budget)로는 확인되지 않았다.",
    "예산의 원유가 가정(인도 바스켓·브렌트)",
    "정부·RBI의 유가 1달러당 미회수손실·재정적자 민감도",
    "FY2026-27 중 OMC LPG 손실 추가 보전(각의 승인) 여부",
    "3월 27일 이후 내수 휘발유·경유 특별소비세 재조정과 휘발유·경유 소매가 변경 여부",
    "등유 미회수손실과 보조 규모",
    "FY2025-26 석유보조금 실적(CGA 잠정)과 FY2026-27 석유보조금 누적 집행액은 미확인이다. 4~9월은 주요 보조금 전체 집행률(54%)만 확인됐다.",
    "Whalesbook의 OMC 누적 LPG 미회수손실(9월 30일 기준 IOCL 32,506·BPCL 17,334·HPCL 18,049크로르)은 기준 연도가 불분명하다."
   ],
   "sources": [
    {
     "id": 1,
     "title": "India cuts excise duties on petrol, diesel as global oil prices surge",
     "publisher": "Gulf Business",
     "url": "https://gulfbusiness.com/en/2026/news/india-cuts-excise-duties-on-petrol-diesel-as-global-oil-prices-surge/"
    },
    {
     "id": 2,
     "title": "India Slashes Excise Duty on Petrol, Diesel to Shield Consumers Amid Global Oil Price Surge",
     "publisher": "VATupdate",
     "date": "2026-04-01",
     "url": "https://www.vatupdate.com/2026/04/01/india-slashes-excise-duty-on-petrol-diesel-to-shield-consumers-amid-global-oil-price-surge/"
    },
    {
     "id": 3,
     "title": "Govt cuts excise duty on petrol, diesel by Rs 10/litre, taxes diesel, ATF exports",
     "publisher": "PSU Watch",
     "url": "https://psuwatch.com/newsupdates/govt-cuts-excise-duty-on-petrol-diesel-by-rs-10litre-taxes-diesel-atf-exports"
    },
    {
     "id": 4,
     "title": "Mapping India's Energy Policy 2026",
     "publisher": "IISD",
     "url": "https://www.iisd.org/publications/digital-story/mapping-indias-energy-policy-2026"
    },
    {
     "id": 5,
     "title": "Demand for Grants 2026-27 Analysis: Petroleum and Natural Gas",
     "publisher": "PRS Legislative Research",
     "url": "https://prsindia.org/budgets/parliament/union-budget-2026-27-analysis-petroleum-and-natural-gas"
    },
    {
     "id": 6,
     "title": "Strategic crude oil purchases paused as LPG support dominates MoPNG budget 2026-27",
     "publisher": "PSU Watch",
     "url": "https://psuwatch.com/newsupdates/strategic-crude-oil-purchases-paused-as-lpg-support-dominates-mopng-budget-2026-27"
    },
    {
     "id": 7,
     "title": "Union Budget 2026-27 for UPSC: Deficits, Debt Path, Tax Changes and Likely Questions",
     "publisher": "TrackNation",
     "url": "https://tracknation.in/story/union-budget-2026-27-for-upsc-deficits-debt-path-tax-changes-and-likely-questions"
    },
    {
     "id": 8,
     "title": "₹1.5 trn hit to exchequer as govt cuts petrol, diesel excise: Deven Choksey",
     "publisher": "Business Standard",
     "date": "2026-03-27",
     "url": "https://www.business-standard.com/markets/news/1-5-trn-hit-to-exchequer-as-govt-cuts-petrol-diesel-excise-deven-choksey-126032700271_1.html"
    },
    {
     "id": 9,
     "title": "Excise Cut Impact May Widen FY27 Fiscal Gap by Up to 0.5% of GDP",
     "publisher": "Outlook Business",
     "url": "https://www.outlookbusiness.com/economy-and-policy/excise-cut-impact-may-widen-fy27-fiscal-gap-by-up-to-05-of-gdp"
    },
    {
     "id": 10,
     "title": "Centre's FY27 fiscal deficit may exceed Budget target by Rs 1.2 lakh crore, reach 4.7% of GDP: SBI Research",
     "publisher": "ChiniMandi",
     "url": "https://www.chinimandi.com/centres-fy27-fiscal-deficit-may-exceed-budget-target-by-rs-1-2-lakh-crore-reach-4-7-of-gdp-sbi-research/"
    },
    {
     "id": 11,
     "title": "Centre's FY27 fiscal deficit may exceed Budget target by Rs 1.2 lakh crore: SBI Research",
     "publisher": "A2Z Taxcorp LLP",
     "url": "https://a2ztaxcorp.net/centres-fy27-fiscal-deficit-may-exceed-budget-target-by-rs-1-2-lakh-crore-sbi-research/"
    },
    {
     "id": 12,
     "title": "Domestic LPG price hiked by Rs 60, commercial cylinder up Rs 115",
     "publisher": "News On AIR (Prasar Bharati)",
     "date": "2026-03-07",
     "url": "https://www.newsonair.gov.in/domestic-lpg-price-hiked-by-rs-60-commercial-cylinder-up-rs-115"
    },
    {
     "id": 13,
     "title": "LPG under-recovery hits ₹690; PNG push in 2026",
     "publisher": "Multibagg",
     "url": "https://www.multibagg.ai/market-pulse/articles/lpg-losses-png-push-states-cmqf8qi7j5h4qnv0jpq29zt79"
    },
    {
     "id": 14,
     "title": "OMCs Facing ₹650 Loss Per LPG Cylinder After Recent Price Hike, Says Government",
     "publisher": "Angel One",
     "url": "https://www.angelone.in/news/economy/omcs-facing-650-loss-per-lpg-cylinder-after-recent-price-hike-says-government"
    },
    {
     "id": 15,
     "title": "Despite Rs 29 LPG Price Hike, OMCs face Rs 700 loss per LPG cylinder; Why this huge gap?",
     "publisher": "OneNewsPage",
     "url": "https://www.onenewspage.com/n/Front+Page/1ztfzbl94u/Despite-Rs-29-LPG-Price-Hike-OMCs-face.htm"
    },
    {
     "id": 16,
     "title": "Centre Removes Export Duty on Petrol, Raises Levies on Diesel and ATF",
     "publisher": "DD News",
     "url": "https://ddnews.gov.in/en/centre-removes-export-duty-on-petrol-raises-levies-on-diesel-and-atf/"
    },
    {
     "id": 17,
     "title": "Centre hikes petrol export duty fivefold, cuts…",
     "publisher": "UNI India",
     "url": "https://www.uniindia.com/national/admin-petrol-hike-diesel/215669"
    },
    {
     "id": 18,
     "title": "India Raises Windfall Tax on Fuel Exports; Diesel Duty Sees Sharpest Hike",
     "publisher": "Forbes India",
     "url": "https://www.forbesindia.com/article/news/india-raises-windfall-tax-on-fuel-exports-diesel-duty-jumps-sharply/2996671/1"
    },
    {
     "id": 19,
     "title": "Centre's fiscal deficit widens to 42% of FY27 target in first half: CGA",
     "publisher": "A2Z Taxcorp LLP",
     "url": "https://a2ztaxcorp.net/centres-fiscal-deficit-widens-to-42-of-fy27-target-in-first-half-cga/"
    }
   ],
   "region": "south_asia",
   "tag": "LPG 보조 · 유류세 인하 · 국영 석유판매사(OMC) 손실",
   "fy": "4~3월",
   "fy_year": "start",
   "overview_budget": 0,
   "group": "south-asia"
  },
  {
   "code": "PK",
   "name_kr": "파키스탄",
   "mechanism": "정부가 국제가격·환율에 석유부담금(PL)·기후지원부담금·관세를 더해 휘발유·고속경유(HSD) 소매가를 정하며, 11월 6일과 7일에는 연속으로 가격을 내렸다. PL은 IMF 프로그램의 주요 세입이며 FY2026-27 목표 1.727조 루피는 정량적 이행기준(QPC)이다. 정부는 일반 보조 대신 유종 간 PL 조정, 이륜·소형차 대상 현금지원(총리 연료지원), 정유사 분담으로 가격을 낮췄다. 재정비용은 PL 세입 감소와 표적 지원 지출로 나타난다.",
   "items": [
    {
     "label": "석유부담금(PL) 세입 목표(예산)",
     "year": 2026,
     "kind": "budget",
     "amount": 1677,
     "currency": "PKR",
     "unit": "십억 루피",
     "note": "FY2026-27(2026.7~2027.6) 예산이다(6월 보도). FY2025-26 RE 1,498 대비 +178.5(+11.8%)다. 세입 항목이며 PL 인하는 세수 감소로 나타난다.",
     "src": [
      23
     ],
     "usd_bn": 6.0636,
     "usd_note": "계산: 2026-11-07 환율 276.57 PKR/USD"
    },
    {
     "label": "석유부담금(PL) 세입 목표(IMF 프로그램)",
     "year": 2026,
     "kind": "budget",
     "amount": 1727,
     "currency": "PKR",
     "unit": "십억 루피",
     "note": "IMF 스태프 보고서(2026년 5월) 기준이다. 전년 목표 대비 +259(+17.6%)다. 지표목표에서 정량적 이행기준(QPC)으로 바뀌었다.",
     "src": [
      21,
      22
     ],
     "usd_bn": 6.2443,
     "usd_note": "계산: 2026-11-07 환율 276.57 PKR/USD"
    },
    {
     "label": "석유부담금(PL) 세입",
     "year": 2025,
     "kind": "revised",
     "amount": 1498,
     "currency": "PKR",
     "unit": "십억 루피",
     "note": "FY2025-26 수정예산이다.",
     "src": [
      23
     ],
     "kind_label": "수정 추정(RE)"
    },
    {
     "label": "석유부담금(PL) 세입",
     "year": 2025,
     "kind": "realised",
     "amount": 1567,
     "currency": "PKR",
     "unit": "십억 루피",
     "period_end": "2026-06-30",
     "note": "FY2025-26 실적이다(재무부). 목표 대비 +99다.",
     "src": [
      27
     ]
    },
    {
     "label": "총리 연료지원(Fuel Relief Scheme) 배정",
     "year": 2026,
     "kind": "budget",
     "amount": 75,
     "currency": "PKR",
     "unit": "십억 루피",
     "note": "2026-09-14 ECC 배정액이다. 이륜·삼륜차는 주 500루피, 800cc 이하 승용차는 10일마다 1,000루피다. 12월 말까지 연장됐다.",
     "src": [
      31,
      32,
      33
     ],
     "period": "FY2026-27",
     "usd_bn": 0.2712,
     "usd_note": "계산: 2026-11-07 환율 276.57 PKR/USD"
    },
    {
     "label": "총리 연료지원 집행액",
     "year": 2026,
     "kind": "realised",
     "amount": 27,
     "currency": "PKR",
     "unit": "십억 루피",
     "note": "2026년 11월 초 보도 기준 소형차·오토바이·릭샤 소유자 배분액이다. 다른 보도는 280억 루피 방출로 적었다.",
     "src": [
      32,
      33
     ],
     "period": "2026년 11월 초 보도",
     "usd_bn": 0.0976,
     "usd_note": "계산: 2026-11-07 환율 276.57 PKR/USD"
    },
    {
     "label": "정유사 분담 가격 인하(재정 외)",
     "year": 2026,
     "kind": "estimate",
     "amount": 15,
     "currency": "PKR",
     "unit": "십억 루피/월",
     "note": "석유장관 발언 기준이다. 휘발유를 국제가격보다 리터당 약 15루피 낮게 유지하는 임시 약정이며 정유사가 부담한다.",
     "src": [
      34
     ],
     "usd_bn": 0.0542,
     "usd_note": "계산: 2026-11-07 환율 276.57 PKR/USD, 월 기준"
    }
   ],
   "measures_2026": [
    {
     "date": "2026-04(보도)",
     "text": "정부는 일괄 보조를 거두고 휘발유 PL을 리터당 105루피에서 160루피로 올렸다. 경유 PL은 55루피에서 0으로 내렸다. 이륜차 이용자에게 리터당 100루피를 월 20리터 한도로 3개월간 지원했다.",
     "src": [
      28,
      29
     ]
    },
    {
     "date": "2026-05-14~16",
     "text": "IMF 스태프 보고서 기준 PL은 휘발유 리터당 약 117.4루피, 경유 약 43루피다. IMF는 유가 변동 부담을 소비자에게 넘기라고 요구했다.",
     "src": [
      21,
      22,
      39
     ]
    },
    {
     "date": "2026-05-16 이후(날짜 미확인)",
     "text": "정부는 국제유가 급락 뒤 연료 보조 종료를 결정했다.",
     "src": [
      30
     ]
    },
    {
     "date": "2026-09-14",
     "text": "ECC는 총리 연료지원에 750억 루피를 배정했다. 이륜·삼륜차는 주 500루피(리터당 100루피×5리터), 800cc 이하 승용차는 10일마다 1,000루피를 받는다. 총리는 지원을 12월 말까지 연장했다.",
     "src": [
      31,
      32,
      33
     ]
    },
    {
     "date": "2026-11-03",
     "text": "자마아테 이슬라미(JI)는 정부가 농업·대중교통·일부 차량의 연료비 지원에 합의했다고 밝혔다. 정부는 PL 폐지는 거부했다.",
     "src": [
      38
     ]
    },
    {
     "date": "2026-11 초",
     "text": "정유사가 30일 약정으로 PL 중 150억 루피를 분담해 휘발유 가격을 리터당 14.71루피 낮췄다. 트리뷴 보도 기준 PL은 리터당 80루피, 기후지원부담금 5루피, 관세 20.56루피다. 총리는 보조 지급을 거부한 주유소의 면허 취소를 지시했다.",
     "src": [
      36,
      37,
      33
     ]
    },
    {
     "date": "2026-11-06",
     "text": "휘발유는 리터당 9.41루피 내린 352.59루피, 고속경유는 5.56루피 내린 382.25루피다. 휘발유는 10월 31일 377.91루피에서 1주일이 안 돼 25.32루피 내렸다.",
     "src": [
      26,
      37
     ]
    },
    {
     "date": "2026-11-07",
     "text": "휘발유는 6.59루피 내린 346.00루피, 고속경유는 4.25루피 내린 378.00루피다.",
     "src": [
      24,
      25
     ]
    }
   ],
   "prices": [
    {
     "product": "휘발유",
     "price": 377.91,
     "unit": "루피/리터",
     "date": "2026-10-31",
     "src": [
      26
     ]
    },
    {
     "product": "휘발유",
     "price": 352.59,
     "unit": "루피/리터",
     "date": "2026-11-06",
     "note": "9.41루피 인하됐다.",
     "src": [
      26,
      37
     ]
    },
    {
     "product": "고속경유(HSD)",
     "price": 382.25,
     "unit": "루피/리터",
     "date": "2026-11-06",
     "note": "5.56루피 인하됐다.",
     "src": [
      26,
      37
     ]
    },
    {
     "product": "휘발유",
     "price": 346,
     "unit": "루피/리터",
     "date": "2026-11-07",
     "note": "6.59루피 인하됐다.",
     "src": [
      24,
      25
     ]
    },
    {
     "product": "고속경유(HSD)",
     "price": 378,
     "unit": "루피/리터",
     "date": "2026-11-07",
     "note": "4.25루피 인하됐다.",
     "src": [
      24,
      25
     ]
    }
   ],
   "sensitivity": [
    {
     "text": "석유장관은 정유사가 휘발유를 국제가격보다 리터당 약 15루피 낮게 유지하는 임시 약정으로 월 약 150억 루피를 부담한다고 밝혔다.",
     "src": [
      34
     ]
    }
   ],
   "fiscal_impact": [
    {
     "text": "FY2025-26 PL 징수액은 1.567조 루피로 목표를 990억 루피 웃돌았다(재무부).",
     "src": [
      27
     ]
    },
    {
     "text": "FY2025-26 재정적자는 4.763조 루피, 기초재정흑자는 3.634조 루피다.",
     "src": [
      27
     ]
    },
    {
     "text": "IMF는 FY2026-27 PL 목표 1.727조 루피를 정량적 이행기준(QPC)으로 정했고 파키스탄은 이를 받아들였다.",
     "src": [
      21
     ]
    },
    {
     "text": "6월 예산의 FY2026-27 PL 목표는 1.677조 루피로 FY2025-26 RE 1.498조 루피보다 11.8% 많다.",
     "src": [
      23
     ]
    },
    {
     "text": "석유장관은 7월 30일 대체 세원 없이는 PL 인하에 IMF 승인을 받기 어렵다고 의회 위원회에 밝혔다.",
     "src": [
      35
     ]
    },
    {
     "text": "계획장관 아산 이크발은 JI 압박에도 즉각 인하를 배제했고 다음 예산부터 점진 인하를 검토한다고 밝혔다.",
     "src": [
      36,
      42
     ]
    }
   ],
   "open_items": [
    "FY2026-27 재정적자 목표(GDP 대비)와 예산 유가 가정",
    "FY2026-27 PL 목표는 IMF 1.727조 루피와 예산 1.677조 루피로 다르다. 최종 예산서로는 확인되지 않았다.",
    "PL 단가 시계열은 4월 휘발유 160·경유 0(Dawn), 5월 IMF 보고서 휘발유 117.4·경유 43, 5월 휘발유 103.50→117.41(Business Recorder 등 보도), 11월 트리뷴 80루피로 서로 맞지 않는다. 보조 종료 직후 총리의 '리터당 80루피 PL 즉시 인하' 발표 보도도 날짜와 대상 유종이 미확인이다.",
    "'IMF, 리터당 53루피까지 단계적 부담금 인상 허용'(Profit, 5월 1일)의 대상 유종",
    "4월 이륜차 보조(리터당 100루피)의 집행액과 FY2025-26 연료 보조 지출 총액",
    "Arab News의 '2.71억 달러 연료 보조 승인' 기사와 9월 14일 ECC 750억 루피 배정의 동일 건 여부",
    "유가 1달러당 PL·보조 비용 민감도와 IMF 리뷰의 연료가격 관련 평가 문구",
    "재무부·OGRA·IMF 원문"
   ],
   "sources": [
    {
     "id": 21,
     "title": "IMF sets Rs1.73tr petroleum levy target for FY27",
     "publisher": "The Express Tribune",
     "url": "https://tribune.com.pk/story/2608401/imf-sets-rs173tr-petroleum-levy-target-for-fy27"
    },
    {
     "id": 22,
     "title": "IMF projects FY27 budget above ₨17.1 trillion, sets ₨1.73 trillion petroleum levy and ₨15.27 trillion FBR target",
     "publisher": "Profit by Pakistan Today",
     "date": "2026-05-16",
     "url": "https://profit.pakistantoday.com.pk/2026/05/16/imf-projects-fy27-budget-above-%E2%82%A817-1-trillion-sets-%E2%82%A81-73-trillion-petroleum-levy-and-%E2%82%A815-27-trillion-fbr-target/"
    },
    {
     "id": 23,
     "title": "FY2026-27 Budget Sets Record Rs1.68 Trillion Petroleum Levy Target Amid Expectations of Higher Fuel Taxes",
     "publisher": "Energy Update",
     "date": "2026-06-13",
     "url": "https://www.energyupdate.com.pk/2026/06/13/fy2026-27-budget-sets-record-rs1-68-trillion-petroleum-levy-target-amid-expectations-of-higher-fuel-taxes/"
    },
    {
     "id": 24,
     "title": "Petrol price fixed at Rs 346 per litre, diesel at Rs 378 in Pakistan",
     "publisher": "The Nation",
     "date": "2026-11-07",
     "url": "https://www.nation.com.pk/07-Nov-2026/petrol-price-fixed-rs-346-per-litre-diesel-rs-378-pakistan"
    },
    {
     "id": 25,
     "title": "Petrol Price in Pakistan drops to Rs346, Diesel to Rs378 Per Litre",
     "publisher": "Daily Pakistan",
     "date": "2026-11-07",
     "url": "https://en.dailypakistan.com.pk/07-Nov-2026/petrol-price-in-pakistan-drops-to-rs346-diesel-to-rs378-per-litre"
    },
    {
     "id": 26,
     "title": "Petrol Price in Pakistan drops to Rs352.59, bringing Major Relief to Millions",
     "publisher": "Pakistan Observer",
     "date": "2026-11-05",
     "url": "https://pakobserver.net/petrol-price-in-pakistan-drops-to-rs352-59-bringing-major-relief-to-millions"
    },
    {
     "id": 27,
     "title": "Pakistan collects Rs1.567 Trl in Petroleum Levy during FY2025-26: FinMin",
     "publisher": "Times of Karachi",
     "url": "https://timesofkarachi.pk/97330-pakistan-collects-rs1-567-trl-in-petroleum-levy-during-fy2025-26-finmin/"
    },
    {
     "id": 28,
     "title": "Fuel rates explode as govt withdraws blanket subsidy",
     "publisher": "Dawn",
     "url": "https://www.dawn.com/news/1987962"
    },
    {
     "id": 29,
     "title": "Govt. announces targeted subsidies after fuel price hike amid regional tensions",
     "publisher": "Associated Press of Pakistan (APP)",
     "url": "https://www.app.com.pk/business/govt-announces-targeted-subsidies-after-fuel-price-hike-amid-regional-tensions/"
    },
    {
     "id": 30,
     "title": "Govt decides to end fuel subsidies after sharp decline in global oil prices",
     "publisher": "The Express Tribune",
     "url": "https://tribune.com.pk/story/2614572/govt-decides-to-end-fuel-subsidies-after-sharp-decline-in-global-oil-prices"
    },
    {
     "id": 31,
     "title": "Pakistan approves $271 million fuel subsidy amid US-Iran war energy shock",
     "publisher": "Arab News Pakistan",
     "url": "https://www.arabnews.pk/pakistan/pakistan-approves-271-million-fuel-subsidy-amid-us-iran-war-energy-shock-3001211"
    },
    {
     "id": 32,
     "title": "Fuel subsidy programme extended through December, says PM",
     "publisher": "Shafaqna Pakistan",
     "url": "https://pakistan.shafaqna.com/EN/340837"
    },
    {
     "id": 33,
     "title": "PM Shehbaz orders cancellation of petrol pump licences over subsidy denial",
     "publisher": "The Express Tribune",
     "url": "https://tribune.com.pk/story/2638808/pm-shehbaz-orders-cancellation-of-petrol-pump-licences-over-denial-of-fuel-subsidies"
    },
    {
     "id": 34,
     "title": "Pakistan arranges petrol price relief through refinery subsidy deal",
     "publisher": "Traders Union",
     "url": "https://tradersunion.com/news/commodities/show/4073317-pakistan-petrol-price-relief-subsidy/"
    },
    {
     "id": 35,
     "title": "Petroleum levy cannot be reduced without IMF approval, minister tells committee",
     "publisher": "Daily Pakistan",
     "date": "2026-07-30",
     "url": "https://en.dailypakistan.com.pk/30-Jul-2026/petroleum-levy-cannot-be-reduced-without-imf-approval-minister-tells-committee"
    },
    {
     "id": 36,
     "title": "Govt stands firm on petroleum levy",
     "publisher": "The Express Tribune",
     "url": "https://tribune.com.pk/story/2637689/govt-stands-firm-on-petroleum-levy"
    },
    {
     "id": 37,
     "title": "Petrol price slashed by Rs9.41 per litre, high-speed diesel by Rs5.56",
     "publisher": "Investify",
     "url": "https://www.investify.pk/news/100000160489/petrol-price-slashed-by-rs9-41-per-litre-high-speed-diesel-by-rs5-56"
    },
    {
     "id": 38,
     "title": "Govt Agrees Fuel Relief for Farmers and Transport, Says JI",
     "publisher": "ProPakistani",
     "date": "2026-11-03",
     "url": "https://propakistani.pk/2026/11/03/govt-agrees-fuel-relief-farmers-transport-ji-petroleum-levy/"
    },
    {
     "id": 39,
     "title": "IMF pushes Pakistan to pass petrol price burden to public",
     "publisher": "Daily Ittehad",
     "date": "2026-05-14",
     "url": "https://dailyittehad.com.pk/news/2026/05/14/imf-pushes-pakistan-to-pass-petrol-price-burden-to-public"
    },
    {
     "id": 42,
     "title": "Jamaat Long March, Petroleum Levy and IMF Pressure",
     "publisher": "Pakistan Today",
     "date": "2026-10-30",
     "url": "https://www.pakistantoday.com.pk/2026/10/30/petroleum-levy-problem"
    }
   ],
   "region": "south_asia",
   "tag": "석유부담금 징수 · 표적 현금 지원",
   "fy": "7~6월",
   "fy_year": "start",
   "overview_budget": 4,
   "overview_realised": 5,
   "group": "south-asia"
  },
  {
   "code": "BD",
   "name_kr": "방글라데시",
   "mechanism": "국영 BPC가 연료를 수입·공급하고 에너지부가 소매가를 정한다. 에너지장관은 2026년 2월까지 월별 국제가격 연동 조정으로 연료 보조가 필요 없었다고 밝혔다. 2월 28일 중동전쟁 뒤 인상이 늦어지며 손실은 BPC 은행예치금으로 흡수됐고, BPC는 재무부에 보조금을 요청했다. FY2026-27 예산의 보조금은 전력·LNG·비료 위주이며 BPC 연료유 보조금 배정은 미확인이다.",
   "items": [
    {
     "label": "BPC 연료 판매 손실",
     "year": 2026,
     "kind": "realised",
     "amount": 22875.66,
     "currency": "BDT",
     "unit": "크로르 타카",
     "period_end": "2026-08-31",
     "note": "2026년 3~8월분이며 수입 LC 결제 기준이다. 정부 보전 전 BPC 손실이다.",
     "src": [
      43,
      46
     ],
     "usd_bn": 1.8328,
     "usd_note": "계산: 2026-11-07 환율 124.81 BDT/USD"
    },
    {
     "label": "BPC 연료 판매 손실",
     "year": 2026,
     "kind": "realised",
     "amount": 18699,
     "currency": "BDT",
     "unit": "크로르 타카",
     "period_end": "2026-06-30",
     "note": "2026년 3~6월분이다. 에너지장관 국회 답변은 3월~6월 11일 17,039크로르였다.",
     "src": [
      50,
      51,
      52
     ],
     "usd_bn": 1.4982,
     "usd_note": "계산: 2026-11-07 환율 124.81 BDT/USD"
    },
    {
     "label": "BPC 보조금 요청액",
     "year": 2026,
     "kind": "estimate",
     "amount": 18000,
     "currency": "BDT",
     "unit": "크로르 타카",
     "note": "에너지부가 7월 28일 재무부에 '18,000크로르 이상'을 요청했다. 9월 8일 BPC 서한 기준 3~6월분은 미지급이다.",
     "src": [
      51,
      46
     ],
     "usd_bn": 1.4421,
     "usd_note": "계산: 2026-11-07 환율 124.81 BDT/USD"
    },
    {
     "label": "BPC 무이자 대출(재무부)",
     "year": 2026,
     "kind": "budget",
     "amount": 4500,
     "currency": "BDT",
     "unit": "크로르 타카",
     "note": "BPC의 정부 대출은 11년 만이다. 집행일은 미확인이다.",
     "src": [
      49
     ],
     "usd_bn": 0.3605,
     "usd_note": "계산: 2026-11-07 환율 124.81 BDT/USD"
    },
    {
     "label": "보조금·장려금 총액",
     "year": 2026,
     "kind": "budget",
     "amount": 126125,
     "currency": "BDT",
     "unit": "크로르 타카",
     "note": "FY2026-27(2026.7~2027.6) 예산이다. 전력·비료가 55%를 차지한다. 연료유(BPC) 몫은 미확인이다.",
     "src": [
      48
     ],
     "usd_bn": 10.105,
     "usd_note": "계산: 2026-11-07 환율 124.81 BDT/USD"
    },
    {
     "label": "전력·LNG 보조금 집행",
     "year": 2026,
     "kind": "realised",
     "amount": 238,
     "currency": "BDT",
     "unit": "십억 타카",
     "period_end": "2026-09-30",
     "pct_note": "연간 배정의 49.6%(기사 제목은 45%)",
     "note": "FY2026-27 1분기(7~9월) 기준이다. 연료유 보조금은 들어 있지 않다.",
     "src": [
      47
     ],
     "usd_bn": 1.9068,
     "usd_note": "계산: 2026-11-07 환율 124.81 BDT/USD"
    },
    {
     "label": "중동전쟁 관련 추가 보조금 소요(재무장관)",
     "year": 2026,
     "kind": "estimate",
     "amount": 42600,
     "currency": "BDT",
     "unit": "크로르 타카",
     "note": "보조금 전체 기준이며 연료유 몫은 구분되지 않는다.",
     "src": [
      53,
      57
     ],
     "usd_bn": 3.4131,
     "usd_note": "계산: 2026-11-07 환율 124.81 BDT/USD"
    },
    {
     "label": "경유 연간 손실(에너지부 추정)",
     "year": 2026,
     "kind": "estimate",
     "amount": 40000,
     "currency": "BDT",
     "unit": "크로르 타카",
     "note": "9월 인상 전 기준이며 경유만 대상이다. 리터당 손실은 약 89타카다.",
     "src": [
      45
     ],
     "usd_bn": 3.2048,
     "usd_note": "계산: 2026-11-07 환율 124.81 BDT/USD"
    }
   ],
   "measures_2026": [
    {
     "date": "2026-07-28",
     "text": "에너지부가 재무부에 BPC 보조금 18,000크로르 타카 이상을 요청했다. 근거는 3~6월 손실 18,699크로르 타카다.",
     "src": [
      51
     ]
    },
    {
     "date": "2026-09-08",
     "text": "BPC는 서한에서 3~6월분 보조금이 지급되지 않았고 10월 전후 수입 LC 개설 자금이 바닥날 수 있다고 밝혔다.",
     "src": [
      46
     ]
    },
    {
     "date": "2026-09-21",
     "text": "정부는 경유·옥탄·휘발유·등유를 리터당 20타카씩 올렸다. 경유 135타카, 옥탄 165타카, 휘발유 160타카, 등유 155타카다.",
     "src": [
      43,
      44,
      45
     ]
    },
    {
     "date": "2026-10~11(보도)",
     "text": "재무부가 BPC에 4,500크로르 타카 무이자 대출을 제공한다. BPC의 정부 대출은 11년 만이다.",
     "src": [
      49
     ]
    }
   ],
   "prices": [
    {
     "product": "경유",
     "price": 135,
     "unit": "타카/리터",
     "date": "2026-09-21",
     "note": "20타카 인상됐다. ANI 보도일 기준이다.",
     "src": [
      43,
      44,
      45
     ]
    },
    {
     "product": "옥탄",
     "price": 165,
     "unit": "타카/리터",
     "date": "2026-09-21",
     "note": "20타카 인상됐다.",
     "src": [
      43,
      44,
      45
     ]
    },
    {
     "product": "휘발유",
     "price": 160,
     "unit": "타카/리터",
     "date": "2026-09-21",
     "note": "20타카 인상됐다.",
     "src": [
      43,
      44,
      45
     ]
    },
    {
     "product": "등유",
     "price": 155,
     "unit": "타카/리터",
     "date": "2026-09-21",
     "note": "20타카 인상됐다.",
     "src": [
      43,
      44,
      45
     ]
    }
   ],
   "sensitivity": [
    {
     "text": "에너지부는 9월 인상 전 경유 리터당 손실을 약 89타카, 경유만의 연간 손실을 약 40,000크로르 타카로 추정했다.",
     "src": [
      45
     ]
    },
    {
     "text": "에너지부는 리터당 20타카 인상이 연간 손실을 약 10,000크로르 타카 줄인다고 추정했다.",
     "src": [
      45
     ]
    }
   ],
   "fiscal_impact": [
    {
     "text": "Economic Express는 FY2026-27 보조금·이자 전망이 2월 말 중동전쟁 이전 데이터에 기반한다고 보도했다.",
     "src": [
      55
     ]
    },
    {
     "text": "재무장관은 중동 충돌로 보조금 소요가 42,600크로르 타카 늘 수 있다고 밝혔다.",
     "src": [
      53,
      57
     ]
    },
    {
     "text": "TBS는 이란 전쟁으로 FY2026-27 보조금 수요가 1.2조 타카로 늘었다고 보도했다(제목 기준).",
     "src": [
      54
     ]
    },
    {
     "text": "FY2026-27 1분기(7~9월) 전력·LNG 보조금 집행액은 2,380억 타카로 연간 배정의 49.6%다.",
     "src": [
      47
     ]
    },
    {
     "text": "FE 보도 제목 기준 FY2026-27 첫 2.5개월에 전력 보조금 배정의 37%, LNG 보조금 배정의 91%가 소진됐다.",
     "src": [
      56
     ]
    },
    {
     "text": "전력부는 전력 보조금이 50,000크로르 타카, LNG 보조금이 40,000크로르 타카까지 늘 수 있다고 경고했다.",
     "src": [
      47
     ]
    },
    {
     "text": "BPC 은행예치금은 2월 28일 36,964크로르 타카에서 6월 말 18,524크로르 타카로 줄었다.",
     "src": [
      50
     ]
    },
    {
     "text": "BPC의 9월 6일 가용 운전자금은 약 12,368크로르 타카이며, 현 국제가격에서는 15,000~20,000크로르 타카가 더 필요하다.",
     "src": [
      46
     ]
    }
   ],
   "open_items": [
    "FY2026-27 예산의 BPC 연료유 보조금 배정액과 유가 가정",
    "FY2026-27 전력·LNG 보조금 배정은 42,000크로르와 4,800억 타카 보도가 엇갈린다. 1분기 집행률도 기사 제목 45%와 본문 49.6%가 다르다.",
    "Economic Express가 전한 FY2026-27 보조금 배정 89,538크로르 타카와 Daily Star의 보조금·장려금 126,125크로르 타카의 범위 차이",
    "BPC 4,500크로르 타카 무이자 대출의 승인·집행일",
    "'BPC loses Tk83cr daily'(Daily New Nation) 기사 본문",
    "에너지장관이 밝힌 3~7월 손실 20,059.73크로르 타카의 출처 기사",
    "FY2025-26 연료 보조 실적, 9월 인상의 발효 시각, 9월 21일 이후 추가 가격 조정 여부",
    "출처 기사 원문"
   ],
   "sources": [
    {
     "id": 43,
     "title": "Fuel prices hiked by Tk20 per litre",
     "publisher": "The Business Standard (Bangladesh)",
     "url": "https://www.tbsnews.net/economy/energy/fuel-prices-hiked-tk20-litre-1548591"
    },
    {
     "id": 44,
     "title": "Bangladesh Diesel, Petrol, Octane, Kerosene Prices Hiked by Tk 20 a Litre",
     "publisher": "The Daily Star",
     "url": "https://www.thedailystar.net/news/bangladesh/news/fuel-prices-tk-20-across-the-board-4278401"
    },
    {
     "id": 45,
     "title": "Bangladesh raises fuel prices by BDT 20 per litre amid oil supply crisis",
     "publisher": "ANI",
     "date": "2026-09-21",
     "url": "https://aninews.in/news/world/asia/bangladesh-raises-fuel-prices-by-bdt-20-per-litre-amid-oil-supply-crisis20260921120512/"
    },
    {
     "id": 46,
     "title": "BPC may run out of funds for fuel imports in Oct",
     "publisher": "The Daily Star",
     "url": "https://www.thedailystar.net/news/bangladesh/news/bpc-may-run-out-funds-fuel-imports-oct-4276036"
    },
    {
     "id": 47,
     "title": "45% of FY27 power, LNG subsidies spent in just 3 months",
     "publisher": "The Daily Star",
     "url": "https://www.thedailystar.net/news/bangladesh/news/45-fy27-power-lng-subsidies-spent-just-3-months-4283026"
    },
    {
     "id": 48,
     "title": "Subsidy burden set to rise for power, fertiliser",
     "publisher": "The Daily Star",
     "url": "https://www.thedailystar.net/business/bangladesh-budget-2026-27/news/subsidy-burden-set-rise-power-fertiliser-4191526"
    },
    {
     "id": 49,
     "title": "After 11yrs, BPC gets Tk 4,500cr loan to buy fuel",
     "publisher": "The Daily Star",
     "url": "https://www.thedailystar.net/news/bangladesh/news/after-11yrs-bpc-gets-tk-4500cr-loan-buy-fuel-4286591"
    },
    {
     "id": 50,
     "title": "Profit streak to cash crisis: BPC seeks Tk 18,699cr lifeline",
     "publisher": "The Daily Star",
     "url": "https://www.thedailystar.net/business/economy/news/profit-streak-cash-crisis-bpc-seeks-tk-18699cr-lifeline-4244811"
    },
    {
     "id": 51,
     "title": "Middle East war causes huge losses, BPC seeks Tk 18,000 crore subsidy",
     "publisher": "Views Bangladesh",
     "url": "https://viewsbangladesh.com/middle-east-war-causes-huge-losses-bpc-seeks-tk-18000-crore-subsidy/"
    },
    {
     "id": 52,
     "title": "BPC faces Tk 17,039cr loss as ME conflict spikes fuel costs",
     "publisher": "New Age",
     "url": "https://www.newagebd.net/post/power-energy/303614/bpc-faces-tk-17039cr-loss-as-me-conflict-spikes-fuel-costs"
    },
    {
     "id": 53,
     "title": "Middle East conflict could push Bangladesh's subsidy needs up by Tk 42,600cr: Finance minister",
     "publisher": "The Daily Star",
     "url": "https://www.thedailystar.net/news/environment/natural-resources/energy/news/middle-east-conflict-could-push-bangladeshs-subsidy-needs-tk-42600cr-finance-minister-4194511"
    },
    {
     "id": 54,
     "title": "Iran war pushes subsidy demand to Tk1.20 lakh crore in FY27",
     "publisher": "The Business Standard (Bangladesh)",
     "url": "https://www.tbsnews.net/economy/iran-war-pushes-subsidy-demand-tk120-lakh-crore-fy27-1453726"
    },
    {
     "id": 55,
     "title": "FY27 subsidy, debt servicing projections based on pre-Mideast war data",
     "publisher": "Economic Express",
     "url": "https://economicexpress.net/news/18142?ln=en"
    },
    {
     "id": 56,
     "title": "Power sector eats up 37pc, LNG 91pc in just 2.5 months",
     "publisher": "The Financial Express (Bangladesh)",
     "url": "https://today.thefinancialexpress.com.bd/first-page/power-sector-eats-up-37pc-lng-91pc-in-just-25-months-1790013306"
    },
    {
     "id": 57,
     "title": "Bangladesh faces additional Tk 42,600 cr subsidy burden for ME conflict: Khosru",
     "publisher": "The Daily New Nation",
     "url": "https://dailynewnation.com/news/833350"
    }
   ],
   "region": "south_asia",
   "tag": "국영 석유공사(BPC) 손실 · 보조 요청",
   "fy": "7~6월",
   "overview_realised": 0,
   "group": "south-asia"
  },
  {
   "code": "LK",
   "name_kr": "스리랑카",
   "mechanism": "국영 CPC(Ceypetco)와 Lanka IOC가 국제유가·환율을 반영한 월별 가격공식으로 소매가를 정한다. IMF EFF는 연료·전력 원가회수 가격을 자금 인출 조건으로 둔다. 2026년 CPC는 원가 상승분 일부를 손실로 흡수했고, CPC 회장에 따르면 정부가 그 상당 부분을 떠안았다. 정부는 운송·어업에 한시 표적 보조를 썼으며 일반 연료 보조 예산 항목은 미확인이다.",
   "items": [],
   "measures_2026": [
    {
     "date": "2026 초",
     "text": "원유가 배럴당 100달러를 넘은 뒤 CPC는 연료가격을 50% 가까이 올렸다. 정부는 운송·어업에 한시 표적 보조를 도입했다.",
     "src": [
      64,
      65
     ]
    },
    {
     "date": "2026-04",
     "text": "IMF와 EFF 5·6차 통합 리뷰 실무합의(SLA)를 맺었다. 자금 인출 조건은 연료·전력 원가회수 가격 복원이다.",
     "src": [
      64
     ]
    },
    {
     "date": "2026-05~06",
     "text": "5월 CPC 연료 수입대금이 5.24억 달러로 늘자 정부는 연료 QR 쿼터 집행을 강화하기로 했다.",
     "src": [
      67
     ]
    },
    {
     "date": "2026-05-30(자정 발효)",
     "text": "CPC가 오토디젤을 리터당 15루피 올린 407루피, 휘발유 92를 24루피 올린 434루피, 등유를 20루피 올린 285루피로 조정했다.",
     "src": [
      70
     ]
    },
    {
     "date": "2026-06 말·2026-08 말",
     "text": "정부는 연료가격을 두 차례 내렸다.",
     "src": [
      65,
      66
     ]
    },
    {
     "date": "2026-10",
     "text": "민간 유통사가 손실을 피하려 공급을 줄이자 CPC가 경유 공급을 늘렸다.",
     "src": [
      72
     ]
    },
    {
     "date": "2026-11-01",
     "text": "CPC는 휘발유 92를 10루피 올린 424루피, 휘발유 95를 15루피 올린 490루피, 오토디젤을 5루피 올린 397루피, 슈퍼디젤을 15루피 올린 543루피로 조정했다. 등유는 285루피로 동결했다. Lanka IOC도 휘발유 92·오토디젤을 같은 가격으로 맞췄다. 조정은 월별 가격공식에 따른다.",
     "src": [
      59,
      60,
      61,
      62
     ]
    }
   ],
   "prices": [
    {
     "product": "휘발유 92",
     "price": 424,
     "unit": "루피/리터",
     "date": "2026-11-01",
     "note": "10루피 인상됐다.",
     "src": [
      59,
      60,
      61,
      62
     ]
    },
    {
     "product": "휘발유 95",
     "price": 490,
     "unit": "루피/리터",
     "date": "2026-11-01",
     "note": "15루피 인상됐다.",
     "src": [
      59,
      60,
      61,
      62
     ]
    },
    {
     "product": "오토디젤",
     "price": 397,
     "unit": "루피/리터",
     "date": "2026-11-01",
     "note": "5루피 인상됐다.",
     "src": [
      59,
      60,
      61,
      62
     ]
    },
    {
     "product": "슈퍼디젤",
     "price": 543,
     "unit": "루피/리터",
     "date": "2026-11-01",
     "note": "15루피 인상됐다.",
     "src": [
      59,
      60,
      61,
      62
     ]
    },
    {
     "product": "등유",
     "price": 285,
     "unit": "루피/리터",
     "date": "2026-11-01",
     "note": "동결됐다.",
     "src": [
      59,
      60,
      61,
      62
     ]
    }
   ],
   "sensitivity": [
    {
     "text": "CPC 회장은 6월 1일 경유 리터당 약 129루피, 옥탄 92 휘발유 리터당 약 60루피 손실을 밝혔다.",
     "src": [
      70
     ]
    },
    {
     "text": "PublicFinance.lk는 5월 구매원가 기준 CPC 손실을 휘발유 리터당 40루피, 경유 리터당 29루피로 계산했다.",
     "src": [
      69
     ]
    }
   ],
   "fiscal_impact": [
    {
     "text": "10월 CCPI 상승률은 8.3%로 중앙은행 목표 상단 7%를 넘었다.",
     "src": [
      63
     ]
    },
    {
     "text": "선데이타임스(9월 20일)는 CPC가 원가 상승분을 다 넘기지 않고 손실을 흡수해 IMF 약속 이행이 위협받는다고 보도했다.",
     "src": [
      65
     ]
    },
    {
     "text": "CPC 회장은 6월 1일 최근 수개월 정부가 CPC 손실의 상당 부분을 떠안았다고 밝혔다.",
     "src": [
      70
     ]
    },
    {
     "text": "에너지장관 측은 IMF의 요구가 국제가격 일치가 아니라 CPC의 손익분기 운영이라고 설명했다.",
     "src": [
      68,
      66
     ]
    }
   ],
   "open_items": [
    "2026년 CPC 손실 총액과 정부의 손실 흡수액(재정 지출)",
    "운송·어업 한시 표적 보조의 예산과 집행액",
    "2026 예산의 유가 가정과 2026년 연료 세제(소비세) 변경 여부",
    "6월 1일 인상 폭과 6월 말·8월 말 인하 폭",
    "IMF 5·6차 통합 리뷰의 이사회 승인 시점과 이후 리뷰의 연료가격 평가",
    "정부가 연료가격 안정용으로 따로 둔 자금(6월 말 소진 예상 보도)의 규모",
    "Newswire(5월 29일)가 전한 에너지부 원가 공개 기반 경유 순손실(리터당 약 162루피)은 산식이 미확인이다.",
    "11월 인상 발효일은 대부분 11월 1일 0시로 보도됐고, EconomyNext 관련 요약은 11월 2일로 적었다.",
    "유가 1달러당 CPC 손실 민감도"
   ],
   "sources": [
    {
     "id": 59,
     "title": "Fuel prices increased across Sri Lanka from midnight",
     "publisher": "The Morning",
     "url": "https://www.themorning.lk/articles/kHOX6Aw8KhbSw70F2Ko3"
    },
    {
     "id": 60,
     "title": "Fuel prices increased in Sri Lanka",
     "publisher": "Newswire",
     "date": "2026-11-01",
     "url": "https://www.newswire.lk/2026/11/01/fuel-prices-increased-in-sri-lanka-3/"
    },
    {
     "id": 61,
     "title": "Ceylon Petroleum Corporation (Ceypetco) has announced a revision of fuel prices, effective from midnight Nov. 01",
     "publisher": "Colombo Times",
     "url": "https://colombotimes.net/ceylon-petroleum-corporation-ceypetco-has-announced-a-revision-of-fuel-prices-effective-from-midnight-nov-01/"
    },
    {
     "id": 62,
     "title": "Ceylon Petroleum Corporation Raises Fuel Prices Effective Midnight",
     "publisher": "Lanka Newspapers",
     "date": "2026-11-01",
     "url": "https://www.lankanewspapers.com/2026/11/01/ceylon-petroleum-corporation-raises-fuel-prices-effective-midnight"
    },
    {
     "id": 63,
     "title": "Sri Lanka's fuel price hike tests central bank's inflation target",
     "publisher": "EconomyNext",
     "url": "https://economynext.com/sri-lankas-fuel-price-hike-tests-central-banks-inflation-target-288530/"
    },
    {
     "id": 64,
     "title": "Between IMF Conditions and Rising Prices, Is Sri Lanka Heading Toward Stagflation?",
     "publisher": "The Diplomat",
     "url": "https://thediplomat.com/2026/04/between-imf-conditions-and-rising-prices-is-sri-lanka-heading-toward-stagflation/"
    },
    {
     "id": 65,
     "title": "Sunday Times (Sri Lanka) 2026-09-20 기사: CPC 손실과 IMF 약속(PressReader)",
     "publisher": "Sunday Times Sri Lanka",
     "date": "2026-09-20",
     "url": "https://www.pressreader.com/sri-lanka/sunday-times-sri-lanka/20260920/282183657957676"
    },
    {
     "id": 66,
     "title": "Sri Lanka's fuel pricing problem",
     "publisher": "The Morning",
     "url": "https://www.themorning.lk/articles/19166"
    },
    {
     "id": 67,
     "title": "Sri Lanka to tighten fuel quotas as CPC May import bill hits $524mn",
     "publisher": "EconomyNext",
     "url": "https://economynext.com/sri-lanka-to-tighten-fuel-quotas-as-cpc-may-import-bill-hits-524mn-273934/"
    },
    {
     "id": 68,
     "title": "Sri Lanka explores options for fuel price revisions: Energy Minister",
     "publisher": "EconomyNext",
     "url": "https://economynext.com/sri-lanka-explores-options-for-fuel-price-revisions-energy-minister-283499/"
    },
    {
     "id": 69,
     "title": "June 2026 Sri Lanka's Fuel Price Update: Is Diesel Underpriced or Overpriced?",
     "publisher": "PublicFinance.lk",
     "url": "https://publicfinance.lk/en/topics/june-2026-sri-lanka-s-fuel-price-update-is-diesel-underpriced-or-overpriced-1781176416"
    },
    {
     "id": 70,
     "title": "CPC losing Rs. 129 on every litre of Diesel, Rs. 60 on Petrol: Chairman",
     "publisher": "Newswire",
     "date": "2026-06-01",
     "url": "https://www.newswire.lk/2026/06/01/cpc-losing-rs-129-on-every-litre-of-diesel-rs-60-on-petrol-chairman/"
    },
    {
     "id": 72,
     "title": "Ceylon Petroleum Corporation Compelled to Boost Diesel Supply as Private Competitors Scale Back Operations",
     "publisher": "Lanka Newspapers",
     "date": "2026-10-07",
     "url": "https://www.lankanewspapers.com/2026/10/07/ceylon-petroleum-corporation-compelled-to-boost-diesel-supply-as-private-competitors-scale-back-operations"
    }
   ],
   "region": "south_asia",
   "tag": "원가 연동 가격(IMF 조건)",
   "fy": "1~12월",
   "fiscal_none": "국영 CPC가 원가 상승분 일부를 손실로 흡수했고 정부가 그 상당 부분을 떠안았다(CPC 회장, 6월 1일). 금액은 미확인이다.",
   "group": "south-asia"
  },
  {
   "code": "EG",
   "name_kr": "이집트",
   "mechanism": "이집트는 자동가격위원회가 분기마다 브렌트유 가격과 환율을 점검해 휘발유·경유 소매가를 고시한다. 고시가와 조달원가의 차액은 예산의 '석유제품 보조금' 항목이 메우고, 전력 보조금은 같은 에너지 보조금 묶음의 별도 항목이다. 연료 수입·판매는 국영 EGPC가 맡으며 EGPC의 국제석유회사(IOC) 미지급금이 예산 밖 부담으로 쌓인다. IMF 확대신용(EFF) 프로그램은 연료 원가회수와 가격연동제 재가동을 조건으로 둔다.",
   "budget_oil_price": {
    "benchmark": "Brent(보도상 비교 기준, 예산서 원문 미확인)",
    "value": 75,
    "unit": "USD/bbl",
    "year": 2027,
    "note": "FY2026/27(2026.7~2027.6) 예산 가정이다(연도는 회계연도 종료 연도). 환율 가정은 47파운드/달러로 보도됐다(2차 자료 기준). 예산 편성 당시 유가는 약 103달러였다. 마드불리 총리는 실제 유가를 약 110달러로 언급했다. 10월 브렌트는 100달러를 웃돌았고 EIA는 4분기 평균을 105달러로 전망했다.",
    "src": [
     25,
     19,
     4
    ],
    "from": "2026-07",
    "period": "FY2026/27"
   },
   "items": [
    {
     "label": "석유제품(연료) 보조금",
     "year": 2024,
     "kind": "realised",
     "amount": 165,
     "currency": "EGP",
     "unit": "십억 이집트파운드",
     "note": "FY2023/24(2023.7~2024.6) 집행 실적이며 약 1,650억 파운드다. 아랍어 언론 보도 기준이다.",
     "src": [
      24,
      25
     ]
    },
    {
     "label": "석유제품(연료) 보조금",
     "year": 2025,
     "kind": "realised",
     "amount": 155.6,
     "currency": "EGP",
     "unit": "십억 이집트파운드",
     "note": "FY2024/25(2024.7~2025.6) 집행 실적이다. 아랍어 언론 보도 기준이다.",
     "src": [
      24,
      25
     ]
    },
    {
     "label": "석유제품(연료) 보조금",
     "year": 2026,
     "kind": "budget",
     "amount": 75.033,
     "currency": "EGP",
     "unit": "십억 이집트파운드",
     "note": "FY2025/26(2025.7~2026.6) 당초 예산이다. 연도 표기는 회계연도 종료 연도 기준이다.",
     "src": [
      24,
      28
     ],
     "usd_bn": 1.3928,
     "usd_note": "계산: 2026-11-06 환율 53.87 EGP/USD"
    },
    {
     "label": "석유제품(연료) 보조금",
     "year": 2026,
     "kind": "realised",
     "amount": 32,
     "currency": "EGP",
     "unit": "십억 이집트파운드",
     "period_end": "2025-09-30",
     "note": "FY2025/26 1분기(2025.7~9) 집행액은 320억 파운드다. 2026년 이후 분기 실적은 미확인이다.",
     "src": [
      27
     ],
     "period": "FY2025/26 1분기"
    },
    {
     "label": "에너지 보조금(연료·전력)",
     "year": 2026,
     "kind": "budget",
     "amount": 150,
     "currency": "EGP",
     "unit": "십억 이집트파운드",
     "note": "FY2025/26 예산의 전력·석유제품 보조금 합계다(약 1,500억 파운드).",
     "src": [
      29,
      1,
      2
     ],
     "usd_bn": 2.7843,
     "usd_note": "계산: 2026-11-06 환율 53.87 EGP/USD"
    },
    {
     "label": "석유제품(연료) 보조금",
     "year": 2027,
     "kind": "budget",
     "amount": 15.84,
     "currency": "EGP",
     "unit": "십억 이집트파운드",
     "note": "FY2026/27(2026.7~2027.6) 예산이다. 전년 예산 대비 591.93억 파운드(78.9%) 줄었다. 별도로 석유제품 세금 250억 파운드를 국고가 부담한다고 보도됐다(성격 미확인).",
     "src": [
      24,
      25,
      26
     ],
     "period": "FY2026/27",
     "usd_bn": 0.294,
     "usd_note": "계산: 2026-11-06 환율 53.87 EGP/USD"
    },
    {
     "label": "전력 보조금",
     "year": 2027,
     "kind": "budget",
     "amount": 104.2,
     "currency": "EGP",
     "unit": "십억 이집트파운드",
     "note": "FY2026/27 예산이며 39% 늘었다. 에너지 보조금 묶음의 전력분이다(2차 자료 기준).",
     "src": [
      3
     ],
     "usd_bn": 1.9341,
     "usd_note": "계산: 2026-11-06 환율 53.87 EGP/USD"
    },
    {
     "label": "에너지 보조금(연료·전력)",
     "year": 2027,
     "kind": "budget",
     "amount": 120,
     "currency": "EGP",
     "unit": "십억 이집트파운드",
     "usd_bn": 2.2274,
     "usd_note": "계산: 2026-11-06 환율 53.87 EGP/USD; 출처 표기 약 22.6억 달러",
     "note": "FY2026/27 예산이며 전년 약 1,500억 파운드 대비 20% 줄었다. 연료 158.4억 + 전력 1,042억 파운드로 구성된다.",
     "src": [
      1,
      2,
      3
     ]
    },
    {
     "label": "연료 수입 조달 예산(휘발유·경유·LPG)",
     "year": 2027,
     "kind": "budget",
     "amount": 5.5,
     "currency": "USD",
     "unit": "billion USD",
     "usd_bn": 5.5,
     "note": "FY2026/27 예산이며 전년 대비 37~40% 증액됐다. 보조금과 별개인 수입 조달 배정액이다.",
     "src": [
      5,
      6
     ]
    }
   ],
   "prices": [
    {
     "product": "휘발유 92옥탄",
     "price": 22.25,
     "unit": "EGP/L",
     "date": "2026-03-10",
     "note": "종전 19.25파운드였다. 10월 위원회에서 동결돼 12월 말까지 유지된다.",
     "src": [
      11,
      8,
      9
     ]
    },
    {
     "product": "휘발유 95옥탄",
     "price": 24,
     "unit": "EGP/L",
     "date": "2026-03-10",
     "note": "종전 21파운드였다.",
     "src": [
      11,
      8
     ]
    },
    {
     "product": "휘발유 80옥탄",
     "price": 20.75,
     "unit": "EGP/L",
     "date": "2026-10",
     "note": "10월 동결 시점 고시가다.",
     "src": [
      8
     ]
    },
    {
     "product": "경유",
     "price": 20.5,
     "unit": "EGP/L",
     "date": "2026-03-10",
     "note": "리터당 3파운드 인상됐으며 약 0.38달러다(Africanews 표기). 10월에 동결됐다.",
     "src": [
      12,
      8
     ]
    },
    {
     "product": "차량용 CNG",
     "price": 13,
     "unit": "EGP/㎥",
     "date": "2026-03-10",
     "note": "종전 10파운드에서 30% 인상됐다.",
     "src": [
      11
     ]
    }
   ],
   "measures_2026": [
    {
     "date": "2026-03-10",
     "text": "휘발유·경유 소매가를 리터당 3파운드 올렸다. 92옥탄은 19.25파운드에서 22.25파운드로, 95옥탄은 21파운드에서 24파운드로, 경유는 17.5파운드에서 20.5파운드로 올랐다. 차량용 CNG는 ㎥당 10파운드에서 13파운드로 30% 올랐다. 2024년 3월 IMF 프로그램이 80억 달러로 증액된 뒤 다섯 번째 인상이다(2024년 7·10월, 2025년 4·10월에 이어). 2024년 3월 22일 인상까지 치면 2년 새 여섯 번째다.",
     "src": [
      11,
      12,
      13
     ]
    },
    {
     "date": "2026-03-10",
     "text": "마드불리 총리는 이번 인상이 예외적 조치이며 국제 에너지 가격이 안정되면 재검토한다고 밝혔다.",
     "src": [
      14
     ]
    },
    {
     "date": "2026-03-28",
     "text": "마드불리 총리는 에너지 절감 조치를 발표했다. 그는 경유 수입가가 톤당 665달러에서 1,665달러로 올라 하루 2,400만 달러, 월 7억5,000만 달러의 추가 비용이 생긴다고 밝혔다(하루 소비 2만4,000톤 기준).",
     "src": [
      18
     ]
    },
    {
     "date": "2026-04~05",
     "text": "FY2026/27 예산은 석유제품 보조금을 158.4억 파운드로 편성해 전년 예산 750.3억 파운드보다 78.9% 줄였다. 같은 예산은 휘발유·경유·LPG 수입 조달에 55억 달러를 배정해 전년보다 37~40% 늘렸다.",
     "src": [
      24,
      25,
      26,
      5,
      6
     ]
    },
    {
     "date": "2026-06-10",
     "text": "바다위 석유장관은 외국 석유·가스 회사 미지급금을 전액 상환했다고 발표했다. 미지급금은 2024년 6월 61억 달러 정점에서 2026년 4월 7.14억 달러로 줄어든 상태였다.",
     "src": [
      31,
      32
     ]
    },
    {
     "date": "2026-06 말(약속 시한)",
     "text": "IMF 5·6차 검토 보고서에 따르면 정부는 자동 연료가격 연동제를 2026년 2분기 말 재개하기로 약속했다. 이후 내각은 자동가격위원회에 업무 재개를 지시했다.",
     "src": [
      15,
      7
     ]
    },
    {
     "date": "2026-10 중순",
     "text": "자동가격위원회는 7~9월 브렌트유 가격과 환율을 직전 분기와 비교한 뒤 소매가를 동결했다. 동결 가격은 리터당 80옥탄 20.75파운드, 92옥탄 22.25파운드, 95옥탄 24파운드, 경유 20.5파운드다. 동결 가격은 12월 말까지 유지된다.",
     "src": [
      7,
      8,
      9,
      10
     ]
    }
   ],
   "fiscal_impact": [
    {
     "text": "FY2025/26(2025.7~2026.6) 기초재정수지는 GDP 대비 4.9% 흑자로 목표 4%를 넘었다(재무부 잠정).",
     "src": [
      22,
      23
     ]
    },
    {
     "text": "FY2025/26 재정적자는 GDP 대비 5.8%로 당초 목표 7.3%(이후 6.1%로 하향)와 전년 7.2%를 밑돌았다.",
     "src": [
      22,
      23
     ]
    },
    {
     "text": "FY2026/27 예산은 기초흑자 GDP 대비 5%, 재정적자 4.9%, 정부부채 약 78%를 목표로 한다. 의회 확정 기준 세입은 4.1조 파운드, 세출은 5.2조 파운드다.",
     "src": [
      20,
      21
     ]
    },
    {
     "text": "FY2026/27 보조금·사회보장 예산은 8,323억 파운드이며 이 중 식품 보조금이 1,783억 파운드다. 상품 보조금 총액은 3,340억 파운드다.",
     "src": [
      21,
      30
     ]
    },
    {
     "text": "FY2026/27 예산에는 GDP 대비 약 1.1%의 예비비가 있으며, 일부는 유가 75달러 초과분 흡수용으로 보도됐다(2차 자료 기준).",
     "src": [
      4
     ]
    },
    {
     "text": "Manassa와 The Middle East Observer는 석유제품 보조금 158.4억 파운드와 고유가의 괴리로 IOC 미지급금이 다시 생기거나 에너지 공급에 차질이 날 수 있다고 분석했다.",
     "src": [
      60,
      4
     ]
    },
    {
     "text": "마드불리 총리는 예산 가정 75달러와 실제 약 110달러의 차이를 들어 현 예산 배정만으로는 시장 수요의 50~60%만 충당한다고 밝혔다.",
     "src": [
      19
     ]
    },
    {
     "text": "IMF 7차 검토를 전한 Egypt Oil & Gas 보도에 따르면 EGPC의 IOC 미지급금 62억 달러가 2026년 6월까지 모두 정리됐고, 재원에는 국제기구로부터의 정부보증 차입이 쓰였다. 잔액이 2026년 4월 이미 7.14억 달러였으므로 62억 달러는 2024년 정점(61억 달러) 이후의 누적 정리액으로 보인다. 정부보증 차입으로 메운 만큼 미지급금이 정부보증 부채로 바뀌었다.",
     "src": [
      33
     ]
    },
    {
     "text": "IMF는 2026년 6월 29일 7차 검토 실무합의에 이어 7월 30일 이사회에서 약 18억 달러 인출을 승인했다. IMF는 에너지 가격 상승과 환율 약세로 2026년 하반기 물가상승률이 16.7%로 오를 것으로 본다.",
     "src": [
      16,
      17
     ]
    },
    {
     "text": "IMF 2026년 2월 스태프 보고서는 휘발유 95·92·80, 경유, 중유가 원가회수에 도달했다고 평가했다. 근거는 2025년 4월·10월 각 2파운드 인상(회당 약 11~15%, 두 차례 누적 약 24~30%)이다.",
     "src": [
      15
     ]
    },
    {
     "text": "총리는 3월 인상분이 국제가격 상승분의 3분의 1만 반영한다고 밝혔다. 이에 따라 2025년 말 달성한 원가회수는 3월 이후 유지되지 않았다고 판단한다.",
     "src": [
      18,
      15
     ]
    },
    {
     "text": "총리 발언 기준 에너지 수입액은 2026년 1월 12억 달러, 2월 15억 달러, 3월 25억 달러로 늘었다(단일 매체 보도).",
     "src": [
      18
     ]
    }
   ],
   "sensitivity": [
    {
     "text": "유가가 배럴당 1달러 오를 때마다 연간 부담이 30억~40억 파운드 늘어난다는 정부 추정치가 보도됐다(예산 유가 75달러 기준). 다른 이코노미스트는 40억~50억 파운드, 또 다른 추정은 약 35억 파운드로 본다. 세 수치 모두 2차 자료 기준이다.",
     "src": [
      4,
      34,
      35
     ]
    },
    {
     "text": "경유 수입가가 톤당 665달러에서 1,665달러로 오르자 월 비용이 7억5,000만 달러 늘었다(하루 소비 2만4,000톤 기준, 총리 발언).",
     "src": [
      18
     ]
    }
   ],
   "open_items": [
    "FY2025/26(2025.7~2026.6) 석유제품 보조금 연간 집행 실적은 미확인이다. 확인된 실적은 1분기(2025.7~9) 320억 파운드뿐이다.",
    "2026년 1~6월(FY2025/26 하반기)과 FY2026/27 1분기(2026.7~9) 집행 실적, 추경·재배정 여부",
    "유가 1달러당 민감도(30억~40억·40억~50억·35억 파운드)는 2차 자료 기준이다. 발언 주체와 게재 매체는 원문 미확인이다.",
    "예비비 GDP 1.1%는 The Middle East Observer 단일 보도 기준이며 원 매체는 미확인이다. 석유제품 보조금 USD 환산치(약 3억 579만 달러)도 원 매체가 미확인이다.",
    "FY2026/27 '석유제품 세금 250억 파운드 국고 부담'의 성격과 보조금 집계 포함 여부",
    "FY2024/25 집행 1,556억 파운드와 FY2023/24 약 1,650억 파운드는 아랍어 언론 보도 기준이며 재무부 결산 원문으로는 확인되지 않았다.",
    "FY2025/26 예산의 유가 가정, 석유제품 보조금의 GDP 대비 비중",
    "신용평가사(Fitch·Moody's·S&P)의 2026년 연료 보조금 관련 평가",
    "IMF 7차 검토 보고서(CR No. 26/224)의 연료 보조금 GDP 비중과 원가회수 재평가(원문 미확인)",
    "10월 자동가격위원회 결정일은 언론 보도상 10월 15일이나 원문으로는 확인되지 않았다.",
    "재무부 재정월보·IMF 보고서 등 1차 문서",
    "기타 국가(알제리·이란·쿠웨이트)의 2026년 국가별 연료 보조금 수치"
   ],
   "sources": [
    {
     "id": 1,
     "title": "Egypt cuts energy subsidy allocation by 20% in FY26/27 budget",
     "publisher": "Ahram Online",
     "url": "https://english.ahram.org.eg/NewsContentP/3/565787/Business/Egypt-cuts-energy-subsidy-allocation-by--in-FY-bud.aspx"
    },
    {
     "id": 2,
     "title": "Egypt to Cut Energy Subsidies by 20% in 2026/27 Budget",
     "publisher": "Egypt Oil & Gas",
     "url": "https://egyptoil-gas.com/news/egypt-to-cut-energy-subsidies-by-20-in-2026-27-budget/"
    },
    {
     "id": 3,
     "title": "Egypt aims to cut deficit but energy subsidies set to rise",
     "publisher": "AGBI",
     "url": "https://www.agbi.com/economy/2026/04/egypt-aims-to-cut-deficit-but-energy-subsidies-set-to-rise/"
    },
    {
     "id": 4,
     "title": "Egypt's $75 Oil Assumption Faces a $100 Reality",
     "publisher": "The Middle East Observer",
     "date": "2026-10-08",
     "url": "https://meobserver.news/energy/2026/10/08/egypts-75-oil-assumption-faces-a-100-reality/"
    },
    {
     "id": 5,
     "title": "Egypt Boosts Energy Import Budget by 37% to $5.5 Billion for FY 2026/27",
     "publisher": "The Middle East Observer",
     "date": "2026-05-12",
     "url": "https://meobserver.org/energy/2026/05/12/egypt-boosts-energy-import-budget-by-37-to-5-5-billion-for-fy-2026-27/"
    },
    {
     "id": 6,
     "title": "Egypt raises fuel import budget to meet demand",
     "publisher": "AGBI",
     "url": "https://www.agbi.com/oil-and-gas/2026/05/egypt-raises-fuel-import-budget-to-meet-demand/"
    },
    {
     "id": 7,
     "title": "Automatic pricing committee keeps gasoline and diesel prices unchanged",
     "publisher": "Egypt Today",
     "url": "https://www.egypttoday.com/Article/1/150087/Automatic-pricing-committee-keeps-gasoline-and-diesel-prices-unchanged"
    },
    {
     "id": 8,
     "title": "Egypt Holds Fuel Prices Steady as Committee Weighs Global",
     "publisher": "Egypt Daily News",
     "url": "https://egyptdailynews.com/egypt-holds-fuel-prices-steady-as-committee/"
    },
    {
     "id": 9,
     "title": "Egypt Freezes Petrol and Diesel Prices Until December",
     "publisher": "The Rio Times",
     "url": "https://www.riotimesonline.com/egypt-petrol-diesel-prices-unchanged-december-2026"
    },
    {
     "id": 10,
     "title": "Egypt Keeps Gasoline and Diesel Prices Unchanged After Repeated Increases",
     "publisher": "SEE News",
     "url": "https://see.news/egypt-keeps-gasoline-and-diesel-prices-unchanged-after-repeated-increases"
    },
    {
     "id": 11,
     "title": "Egypt raises fuel prices by EGP 3 per litre",
     "publisher": "Egyptian Streets",
     "date": "2026-03-10",
     "url": "https://egyptianstreets.com/2026/03/10/egypt-raises-fuel-prices-by-egp-3-per-litre/"
    },
    {
     "id": 12,
     "title": "Egypt raises fuel prices by up to 30 percent",
     "publisher": "Africanews",
     "date": "2026-03-10",
     "url": "https://www.africanews.com/amp/2026/03/10/egypt-raises-fuel-prices-by-up-to-30-percent"
    },
    {
     "id": 13,
     "title": "Egypt raises fuel prices up to 30% as Iran war pushes up oil",
     "publisher": "The National",
     "date": "2026-03-10",
     "url": "https://www.thenationalnews.com/business/2026/03/10/egypt-raises-fuel-prices-up-to-30-as-iran-war-pushes-up-oil"
    },
    {
     "id": 14,
     "title": "Egypt PM says fuel hikes to be reviewed once global energy costs ease",
     "publisher": "Ahram Online",
     "url": "https://english.ahram.org.eg/News/563703.aspx"
    },
    {
     "id": 15,
     "title": "Arab Republic of Egypt: Fifth and Sixth Reviews Under the Extended Arrangement Under the EFF and First Review Under the RSA - Press Release; and Staff Report (IMF Staff Country Reports 2026/069)",
     "publisher": "IMF",
     "url": "https://www.elibrary.imf.org/view/journals/002/2026/069/article-A001-en.xml"
    },
    {
     "id": 16,
     "title": "IMF Staff Reaches Staff Level Agreement on Egypt's Seventh Review Under the EFF and Second Review Under the RSF",
     "publisher": "IMF",
     "date": "2026-06-29",
     "url": "https://www.imf.org/en/news/articles/2026/06/29/pr26231-egypt-imf-staff-reaches-sla-7th-review-eff-2nd-review-rsf"
    },
    {
     "id": 17,
     "title": "IMF board approves $1.8bn disbursement for Egypt following seventh review",
     "publisher": "Daily News Egypt",
     "date": "2026-07-31",
     "url": "https://www.dailynewsegypt.com/2026/07/31/imf-board-approves-1-8bn-disbursement-for-egypt-following-seventh-review/"
    },
    {
     "id": 18,
     "title": "Madbouly Unveils Energy-Saving Measures Amid Global Price Surge",
     "publisher": "Egypt Oil & Gas",
     "url": "https://egyptoil-gas.com/news/madbouly-unveils-energy-saving-measures-amid-global-price-surge/"
    },
    {
     "id": 19,
     "title": "Egypt Forum 2026: Madbouly Outlines Three Tough Options Amid Global Price Hikes",
     "publisher": "SEE News",
     "url": "https://see.news/egypt-forum-2026-madbouly-outlines-three-tough-options-amid-global-price-hikes"
    },
    {
     "id": 20,
     "title": "Egypt targets 5% primary surplus, 4.9% deficit in 2026/27 budget",
     "publisher": "Amwal Al Ghad",
     "url": "https://en.amwalalghad.com/egypt-targets-5-primary-surplus-4-9-deficit-in-2026-27-budget/"
    },
    {
     "id": 21,
     "title": "Egypt's FY2026/27 budget gets Parliament's final nod, target EGP 4.1T revenue",
     "publisher": "Arab Finance",
     "url": "https://www.arabfinance.com/en/news/newdetails/egypt-budget-for-fiscal-year-2026-2027-gets-parliament-final-nod"
    },
    {
     "id": 22,
     "title": "Finance Minister Meets International Experts on Sidelines of IMF-World Bank Meetings in Bangkok",
     "publisher": "Ministry of Finance, Egypt",
     "url": "https://mof.gov.eg/en/media/press-releases/news-11"
    },
    {
     "id": 23,
     "title": "Egypt Reports Smaller Budget Deficit as Growth Accelerates",
     "publisher": "Egypt Daily News",
     "url": "https://egyptdailynews.com/egypt-reports-smaller-budget-deficit-as-growth/"
    },
    {
     "id": 24,
     "title": "هبطت من 75 مليار الي 15 مليار جنيه .. انخفاض حاد في دعم المواد البترولية في الموازنة الجديدة",
     "publisher": "EgyEconomy",
     "date": "2026-04-24",
     "url": "https://egyeconomy.com/24/04/2026/72601/"
    },
    {
     "id": 25,
     "title": "كم خصصت الحكومة لدعم الكهرباء والبترول في موازنة 2026/2027؟.. أرقام تكشف مفاجأة",
     "publisher": "Al-Dostor",
     "url": "https://www.dostor.org/5655378"
    },
    {
     "id": 26,
     "title": "وزير المالية: 15 مليار جنيه قيمة دعم المواد البترولية بالموازنة الجديدة",
     "publisher": "El Watan News",
     "url": "https://www.elwatannews.com/news/details/8272462"
    },
    {
     "id": 27,
     "title": "32 مليار جنيه فاتورة دعم المواد البترولية الربع الأول من العام المالى الحالى",
     "publisher": "Al Borsa News",
     "date": "2025-10-06",
     "url": "https://www.alborsaanews.com/2025/10/06/1920184"
    },
    {
     "id": 28,
     "title": "موازنة مصر 2025/2026 .. 75 مليار جنيه لدعم المواد البترولية وزيادة إضافية للكهرباء",
     "publisher": "Amwal Al Ghad",
     "date": "2025-03-26",
     "url": "https://amwalalghad.com/2025/03/26/%D9%85%D9%88%D8%A7%D8%B2%D9%86%D8%A9-%D9%85%D8%B5%D8%B1-2025-2026-75-%D9%85%D9%84%D9%8A%D8%A7%D8%B1-%D8%AC%D9%86%D9%8A%D9%87-%D9%84%D8%AF%D8%B9%D9%85-%D8%A7%D9%84%D9%85%D9%88%D8%A7%D8%AF-%D8%A7/"
    },
    {
     "id": 29,
     "title": "موازنة 25/26.. مخصصات الدعم السلعى تبلغ 318.5 مليار جنيه.. 160 مليارا لدعم السلع التموينية و150 للكهرباء والمواد البترولية",
     "publisher": "Youm7",
     "date": "2025-06-17",
     "url": "https://www.youm7.com/story/2025/6/17/%D9%85%D9%88%D8%A7%D8%B2%D9%86%D8%A9-25-26-%D9%85%D8%AE%D8%B5%D8%B5%D8%A7%D8%AA-%D8%A7%D9%84%D8%AF%D8%B9%D9%85-%D8%A7%D9%84%D8%B3%D9%84%D8%B9%D9%89-%D8%AA%D8%A8%D9%84%D8%BA-318-5-%D9%85%D9%84%D9%8A%D8%A7%D8%B1/7024310"
    },
    {
     "id": 30,
     "title": "334 مليار جنيه للدعم السلعى بموازنة 26/27.. 178 مليارا للتموين والخبز وزيادة مخصصات الكهرباء والمياه",
     "publisher": "Youm7",
     "date": "2026-05-12",
     "url": "https://www.youm7.com/story/2026/5/12/334-%D9%85%D9%84%D9%8A%D8%A7%D8%B1-%D8%AC%D9%86%D9%8A%D9%87-%D9%84%D9%84%D8%AF%D8%B9%D9%85-%D8%A7%D9%84%D8%B3%D9%84%D8%B9%D9%89-%D8%A8%D9%85%D9%88%D8%A7%D8%B2%D9%86%D8%A9-26-27-178-%D9%85%D9%84%D9%8A%D8%A7%D8%B1%D8%A7/7411522"
    },
    {
     "id": 31,
     "title": "Egypt slashes oil, gas partner arrears 88% to $714M, eyes full clearance in June",
     "publisher": "Egypt Today",
     "url": "https://www.egypttoday.com/Article/3/146847/Egypt-slashes-oil-gas-partner-arrears-88-to-714M-eyes"
    },
    {
     "id": 32,
     "title": "Egypt clears all arrears for foreign oil and gas companies",
     "publisher": "Energy Connects",
     "url": "https://www.energyconnects.com/news/oil/2026/june/egypt-clears-all-arrears-for-foreign-oil-and-gas-companies/"
    },
    {
     "id": 33,
     "title": "IMF Notes Egypt's Arrears Settlement Gains, Stresses Effort to Boost EGPC Inflows",
     "publisher": "Egypt Oil & Gas",
     "url": "https://egyptoil-gas.com/news/imf-notes-gains-from-arrears-clearance-stresses-government-drive-to-improve-egpc-viability/"
    },
    {
     "id": 34,
     "title": "How Oil Prices Increase Could Impact Egypt",
     "publisher": "SEE News",
     "url": "https://see.news/how-oil-prices-increase-could-impact-egypt"
    },
    {
     "id": 35,
     "title": "Higher oil prices pose risk to Egypt's strained budget",
     "publisher": "bne IntelliNews",
     "url": "https://www.intellinews.com/higher-oil-prices-pose-risk-to-egypt-s-strained-budget-386196"
    },
    {
     "id": 60,
     "title": "Egypt's fuel subsidies: Priced for wishful thinking",
     "publisher": "Manassa",
     "url": "https://manassa.news/en/stories/31567"
    }
   ],
   "region": "mena_africa",
   "tag": "분기 가격위원회 · 연료 보조 예산",
   "fy": "7~6월",
   "fy_year": "end",
   "overview_budget": 5,
   "group": "mena-africa"
  },
  {
   "code": "NG",
   "name_kr": "나이지리아",
   "mechanism": "나이지리아는 2023년 5월 29일 휘발유(PMS) 보조금을 폐지했고 이후 휘발유 가격은 자유화돼 있다. 단고테 정유소가 유럽 휘발유·원유 가격을 반영해 출하가(gantry)를 정하고, NNPC 리테일·MRS 등 주유소가 소매가를 정한다. 2026년 10월 정부가 발표한 NNPC 30일 할인은 NNPC 리테일 마진으로 충당하며 연방예산·연방계정(Federation Account)에서 지출하지 않는다고 재무장관이 밝혔다. NNPC가 국영기업이므로 할인 손실은 예산 밖 준재정 부담으로 남는다.",
   "budget_oil_price": {
    "benchmark": "예산 원유 벤치마크(유종 표기 미확인)",
    "value": 64.85,
    "unit": "USD/bbl",
    "year": 2026,
    "note": "대통령 예산안 기준이다(산유량 184만 b/d, 환율 1,400나이라/달러). 상원은 3월 31일 통과 시 벤치마크를 배럴당 10달러 올렸다고 보도됐다(약 75달러). 서명된 세출법의 최종치는 미확인이다.",
    "src": [
     52,
     53
    ],
    "basis": "대통령 예산안(확정치 미확인)"
   },
   "items": [
    {
     "label": "휘발유(PMS) 보조금(폐지 전)",
     "year": 2022,
     "kind": "realised",
     "amount": 4.39,
     "currency": "NGN",
     "unit": "조 나이라",
     "usd_bn": 9.7,
     "usd_note": "출처 표기 97억 달러",
     "note": "NNPC 집계로 인용된 2022년 비용이다(2차 자료 기준). 보조금은 2023-05-29 폐지됐다.",
     "src": [
      57
     ]
    },
    {
     "label": "휘발유 소매가 환원 시 보조금 비용(하원 추정)",
     "year": 2026,
     "kind": "estimate",
     "amount": 20,
     "currency": "NGN",
     "unit": "조 나이라/년",
     "note": "과거 소매가로 되돌릴 경우 연 20조 나이라 이상이 든다(하원 경고). 기사 날짜는 미확인이다.",
     "src": [
      45
     ],
     "usd_bn": 14.874,
     "usd_note": "계산: 2026-11-06 환율 1,344.63 NGN/USD, 년 기준"
    }
   ],
   "prices": [
    {
     "product": "휘발유(PMS) 단고테 출하가",
     "price": 874,
     "unit": "NGN/L",
     "date": "2026-03-02",
     "note": "국제유가 80달러 돌파 직후 리터당 100나이라 인상됐다.",
     "src": [
      40
     ]
    },
    {
     "product": "휘발유(PMS) NNPC·MRS 소매가",
     "price": 975,
     "unit": "NGN/L",
     "date": "2026-03-02",
     "note": "종전 875나이라였다.",
     "src": [
      40
     ]
    },
    {
     "product": "휘발유(PMS) 단고테 출하가",
     "price": 1265,
     "unit": "NGN/L",
     "date": "2026-08-29",
     "note": "8월 21일 1,185나이라, 8월 26일 1,200나이라를 거쳐 인상됐다. 9월 12일 추가 인상됐다(가격 미확인).",
     "src": [
      41
     ]
    },
    {
     "product": "휘발유(PMS) NNPC 라고스 소매가",
     "price": 1380,
     "unit": "NGN/L",
     "date": "2026-09",
     "note": "종전 1,299나이라이며 일부 주유소 최고가는 1,395나이라다.",
     "src": [
      41
     ]
    },
    {
     "product": "휘발유(PMS) 단고테 출하가",
     "price": 1300,
     "unit": "NGN/L",
     "date": "2026-11-03",
     "note": "종전 1,215나이라였다. 11월 1~2일 보도는 1,215·1,210나이라로 엇갈렸다.",
     "src": [
      38,
      39,
      36,
      37
     ]
    },
    {
     "product": "휘발유(PMS) NNPC·MRS 소매가",
     "price": 1360,
     "unit": "NGN/L",
     "date": "2026-11-03",
     "note": "Mobil은 1,349나이라다.",
     "src": [
      38
     ]
    }
   ],
   "measures_2026": [
    {
     "date": "2026-03-02",
     "text": "단고테는 국제유가가 배럴당 80달러를 넘자 휘발유 출하가를 리터당 100나이라 올려 874나이라로 고시했다. MRS·NNPC 리테일은 소매가를 875나이라에서 975나이라로 올렸다.",
     "src": [
      40
     ]
    },
    {
     "date": "2026-03-31",
     "text": "상원은 2026 세출법안을 68.323조 나이라로 통과시켰다. 세출위원회는 유가 벤치마크를 배럴당 10달러 올려 세입 2.592조 나이라를 추가로 잡았다.",
     "src": [
      53
     ]
    },
    {
     "date": "2026-04-17",
     "text": "티누부 대통령은 68.32조 나이라 규모의 2026 예산에 서명했다. 이는 당초안보다 9.85조 나이라 많다.",
     "src": [
      50,
      51
     ]
    },
    {
     "date": "2026-08-21~09-12",
     "text": "단고테는 출하가를 8월 21일 1,165나이라에서 1,185나이라로, 8월 26일 1,200나이라로, 8월 29일 1,265나이라로 올렸다. 9월 12일에는 한 달 새 네 번째 인상을 단행했다. 라고스 NNPC 소매가는 1,299나이라에서 1,380나이라로 올랐고 일부 주유소는 1,395나이라까지 받았다.",
     "src": [
      41
     ]
    },
    {
     "date": "2026-10-01",
     "text": "하원 소위 보고서는 10월 1일부터 리터당 66나이라 할인이 적용됐다고 기록했다(시행 주체 미확인).",
     "src": [
      45
     ]
    },
    {
     "date": "2026-10-08",
     "text": "연방정부는 NNPC 주유소 휘발유 30일 할인을 발표하고 대중교통 사업자에 우선권을 줬다. 정부는 NNPC 도입원가가 1,300나이라면 그 가격 그대로 판매한다고 설명했다. NNPC는 이후 성명에서 할인 종료일을 10월 31일로 명시했다.",
     "src": [
      44,
      42
     ]
    },
    {
     "date": "2026-10-09",
     "text": "정부는 휘발유 출하가·도입원가 상한을 리터당 1,350나이라로 협상하겠다고 밝혔으며 상한은 매월 재검토한다. 재무장관(보도상 Taiwo Oyedele)은 할인 비용을 소매업체가 전액 부담하므로 보조금 부활이 아니라고 밝혔다.",
     "src": [
      42,
      43
     ]
    },
    {
     "date": "2026-10-14",
     "text": "IMF 재정국장 로드리고 발데스는 광범위한 휘발유 보조금 재도입에 반대하고 취약계층 표적 지원을 권고했다.",
     "src": [
      47,
      48,
      49
     ]
    },
    {
     "date": "2026-11-03",
     "text": "단고테는 출하가를 1,215나이라에서 1,300나이라로 올렸다. NNPC·MRS 소매가는 1,360나이라, Mobil은 1,349나이라다. 11월 1~2일 보도는 출하가를 1,215나이라 또는 1,210나이라로 인하했다고 전해 수치가 엇갈린다.",
     "src": [
      38,
      39,
      36,
      37
     ]
    }
   ],
   "fiscal_impact": [
    {
     "text": "2026 예산은 68.32조 나이라로 명목 기준 사상 최대다.",
     "src": [
      50,
      51
     ]
    },
    {
     "text": "2월 말 전쟁 이후 원유 횡재수입은 총 약 5조 나이라로 추정됐다(Daily Trust). The Sun은 2~4월 두 달간 약 5.13조 나이라로 추정했다.",
     "src": [
      55,
      54
     ]
    },
    {
     "text": "산유량은 하루 약 160만 배럴로 예산 목표 184만 배럴을 밑돌아 고유가에 따른 세입 증가를 제약한다.",
     "src": [
      55
     ]
    },
    {
     "text": "정부는 NNPC 30일 할인이 연방예산·연방계정 지출이 아니라 NNPC 리테일 마진 축소로 충당된다고 밝혔다. 할인의 총비용과 회계 처리는 공개되지 않았다.",
     "src": [
      43,
      42,
      46
     ]
    },
    {
     "text": "IMF는 2026년 연료 보조금·가격억제 조치 비용을 해당국 GDP의 1~1.5%로 제시했다(발데스, 10월 14일). 나이지리아 보조금 재도입 비용의 개별 추정치는 내놓지 않았다.",
     "src": [
      49,
      47
     ]
    },
    {
     "text": "IMF는 2026년 4월에도 전쟁발 에너지 충격에 대규모 연료 보조금으로 대응하는 것을 경계했다.",
     "src": [
      59,
      58
     ]
    },
    {
     "text": "보조금 재도입 요구는 2027년 총선 일정과 맞물려 있다.",
     "src": [
      47,
      48
     ]
    }
   ],
   "sensitivity": [
    {
     "text": "상원 세출위원회는 유가 벤치마크를 배럴당 10달러 올리면 세입이 2.592조 나이라 늘어난다고 추산했다.",
     "src": [
      53
     ]
    },
    {
     "text": "The Sun은 유가가 예산 벤치마크 64.85달러로 내려가면 2026년 남은 기간 세입이 약 13조 나이라 줄어든다고 추정했다.",
     "src": [
      54
     ]
    },
    {
     "text": "하원은 휘발유 소매가를 과거 수준으로 되돌리면 연간 20조 나이라 이상이 든다고 경고했다.",
     "src": [
      45
     ]
    }
   ],
   "open_items": [
    "2026년 휘발유 원가 미달(under-recovery)·암묵적 보조금에 대한 NNPC·재무부·IMF 공식 추정치",
    "NNPC 30일 할인의 리터당 할인폭, 총비용, 회계 처리가 공개되지 않았다.",
    "10월 1일 리터당 66나이라 할인의 시행 주체와 비용",
    "서명된 2026 세출법의 최종 유가 벤치마크(64.85달러 대 약 75달러)와 환율 가정(1,400 대 1,512나이라/달러)은 미확인이다. 하원 64.85달러·상원 60달러로 엇갈린 보도도 있다.",
    "11월 초 단고테 출하가 보도가 1,210·1,215·1,300나이라로 엇갈린다.",
    "ThisDay(2026-07-06)는 호르무즈 재개방으로 브렌트가 70달러대 중반으로 내려왔다고 썼다. 10월 브렌트가 100달러 이상이라는 다른 보도와 상충한다.",
    "2022년 PMS 보조금 4.39조 나이라(97억 달러)는 2차 자료에서 NNPC 수치로 인용된 것이다. 원문으로는 확인되지 않았다.",
    "2025년 연료 보조금 실적(예산·NNPC 차손)",
    "IMF 2026년 Article IV 보고서",
    "Budget Office·IMF 원문"
   ],
   "sources": [
    {
     "id": 36,
     "title": "Dangote Refinery Cuts Petrol Price To ₦1,210/Litre",
     "publisher": "Naija News",
     "date": "2026-11-02",
     "url": "https://www.naijanews.com/2026/11/02/dangote-refinery-cuts-petrol-price-to-%E2%82%A61210-litre/"
    },
    {
     "id": 37,
     "title": "Dangote Refinery reduces petrol gantry price to N1,215 per litre",
     "publisher": "Parrot Nigeria",
     "date": "2026-11-01",
     "url": "https://parrotnigeria.com/2026/11/01/dangote-refinery-reduces-petrol-gantry-price-to-n1215-per-litre/"
    },
    {
     "id": 38,
     "title": "NNPC, MRS, Mobil, Other Filling Stations Release New Petrol Prices as Costs Rise",
     "publisher": "Legit.ng",
     "url": "https://www.legit.ng/business-economy/energy/1739753-nnpc-mobil-filling-stations-release-petrol-prices-costs-rise/"
    },
    {
     "id": 39,
     "title": "Dangote Raises Petrol Price, Depot Owners React, Announce New Rates",
     "publisher": "Legit.ng",
     "url": "https://www.legit.ng/business-economy/energy/1739427-dangote-reverses-increases-petrol-price-marketers-react-announce-rates/"
    },
    {
     "id": 40,
     "title": "Dangote's partner station MRS, NNPC raise petrol price by N100/litre",
     "publisher": "Vanguard",
     "url": "https://www.vanguardngr.com/2026/03/dangotes-partner-station-mrs-nnpc-raise-petrol-price-by-n100-litre/"
    },
    {
     "id": 41,
     "title": "Again, Dangote Refinery raises petrol price",
     "publisher": "StatePress NG",
     "url": "https://www.statepress.ng/2026/09/again-dangote-refinery-raises-petrol.html"
    },
    {
     "id": 42,
     "title": "FG proposes N1,350 petrol price ceiling, announces 30-day NNPC discount",
     "publisher": "ICIR",
     "url": "https://www.icirnigeria.org/fg-proposes-n1350-petrol-price-ceiling-announces-30-day-nnpc-discount/"
    },
    {
     "id": 43,
     "title": "NNPC petrol discount is not fuel subsidy — Finance minister",
     "publisher": "Premium Times",
     "url": "https://www.premiumtimesng.com/business/business-news/915610-nnpc-petrol-discount-is-not-fuel-subsidy-finance-minister.html"
    },
    {
     "id": 44,
     "title": "How it Will Work: FG's 30-Day NNPC Discount on Fuel Prices to Cushion Nigerians",
     "publisher": "The News Nigeria",
     "date": "2026-10-09",
     "url": "https://thenewsnigeria.com.ng/2026/10/09/how-it-will-work-fgs-30-day-nnpc-discount-on-fuel-prices-to-cushion-nigerians/"
    },
    {
     "id": 45,
     "title": "Returning to old pump price would cost over N20trn yearly, Reps warn",
     "publisher": "Nigerian Tribune",
     "url": "https://tribuneonlineng.com/returning-to-old-pump-price-would-cost-over-n20trn-yearly-reps-warn/"
    },
    {
     "id": 46,
     "title": "NNPC Retail Petrol Discount: Who Pays, Who Benefits?",
     "publisher": "The Trumpet",
     "url": "https://thetrumpet.ng/nnpc-retail-discount-who-pays-who-benefits/"
    },
    {
     "id": 47,
     "title": "IMF Warns Nigeria Against Restoring Petrol Subsidy",
     "publisher": "Channels Television",
     "date": "2026-10-14",
     "url": "https://www.channelstv.com/2026/10/14/imf-warns-nigeria-against-restoring-petrol-subsidy/"
    },
    {
     "id": 48,
     "title": "IMF warns Nigeria against restoring petrol subsidy",
     "publisher": "Nigerian Tribune",
     "url": "https://tribuneonlineng.com/imf-warns-nigeria-against-restoring-petrol-subsidy/"
    },
    {
     "id": 49,
     "title": "IMF Warns Nigerian Government, Others Against Return Of Fuel Subsidy, Backs Targeted Relief",
     "publisher": "Sahara Reporters",
     "date": "2026-10-14",
     "url": "https://saharareporters.com/2026/10/14/imf-warns-nigerian-government-others-against-return-fuel-subsidy-backs-targeted-relief"
    },
    {
     "id": 50,
     "title": "Tinubu Signs 2026 Appropriation Bill, 2025 Budget Extension",
     "publisher": "Channels Television",
     "date": "2026-04-17",
     "url": "https://www.channelstv.com/2026/04/17/tinubu-signs-2026-appropriation-bill-2025-budget-extension/"
    },
    {
     "id": 51,
     "title": "Tinubu signs 2026 appropriation bill, 2025 budget extension",
     "publisher": "The Telegraph (Nigeria)",
     "date": "2026-04-17",
     "url": "https://telegraph.ng/news/2026/04/17/tinubu-signs-2026-appropriation-bill-2025-budget-extension/"
    },
    {
     "id": 52,
     "title": "2026 Budget Speech",
     "publisher": "State House, Abuja",
     "url": "https://statehouse.gov.ng/2026-budget-speech/"
    },
    {
     "id": 53,
     "title": "allAfrica report on Senate passage of the 2026 Appropriation Bill (title not confirmed)",
     "publisher": "allAfrica",
     "date": "2026-04-01",
     "url": "https://allafrica.com/stories/202604010122.html"
    },
    {
     "id": 54,
     "title": "Nigeria may lose N13trn over Strait of Hormuz reopening",
     "publisher": "The Sun (Nigeria)",
     "url": "https://thesun.ng/nigeria-may-lose-n13trn-over-strait-of-hormuz-reopening/"
    },
    {
     "id": 55,
     "title": "Where Is Oil Windfall? (Daily Trust, reposted on Nairaland)",
     "publisher": "Daily Trust",
     "url": "https://www.nairaland.com/8760264/where-oil-windfall-daily-trust"
    },
    {
     "id": 57,
     "title": "Dangote Refinery Cuts Petrol to About US$0.90 a Litre",
     "publisher": "The Rio Times",
     "url": "https://www.riotimesonline.com/dangote-refinery-petrol-price-cut-nigeria-2026/"
    },
    {
     "id": 58,
     "title": "IMF warns against broad fuel subsidies to deal with energy shock",
     "publisher": "The Globe and Mail",
     "url": "https://www.theglobeandmail.com/business/industry-news/energy-and-resources/article-imf-warns-against-broad-fuel-subsidies-to-deal-with-energy-shock/"
    },
    {
     "id": 59,
     "title": "IMF warns against large fuel subsidies in response to war-driven energy shock",
     "publisher": "OE Digital",
     "date": "2026-04-15",
     "url": "https://energynews.oedigital.com/crude-oil/2026/04/15/imf-warns-against-large-fuel-subsidies-in-response-to-wardriven-energy-shock"
    }
   ],
   "region": "mena_africa",
   "tag": "보조 폐지(2023) · 시장가",
   "fy": "1~12월",
   "fiscal_none": "2023년 휘발유 보조를 폐지했다. 2026년 10월 NNPC 30일 할인은 NNPC 리테일 마진으로 충당해 연방예산 지출이 없고(재무장관), 예산 밖 손실 금액은 공개되지 않았다.",
   "group": "mena-africa"
  },
  {
   "code": "KR",
   "name_kr": "한국",
   "mechanism": "한국은 교통·에너지·환경세 등 유류세 탄력세율을 내려 휘발유·경유·LPG부탄 소비자가격을 낮추며, 비용은 세수 감소로 정부가 부담한다. 2026년 3월에는 석유 최고가격제를 도입해 석유제품 가격 상한을 정하고, 정유사 손실은 원가에 적정마진을 더한 기준으로 추경 예산에서 보전한다. 화물차·버스·택시 등 사업용 경유 차량에는 경유가가 기준가격을 넘는 부분의 일부를 돌려주는 유가연동보조금을 지급한다. 1차 추경은 이와 별도로 소득 하위 70%에 고유가 피해지원금(현금)을 지급한다.",
   "items": [
    {
     "label": "유류세 인하 세수 감소(3월 추경 반영분)",
     "year": 2026,
     "kind": "estimate",
     "amount": 3.4,
     "currency": "KRW",
     "unit": "조 원",
     "note": "2026년 3월 추경 편성 때 교통·에너지·환경세 인하 연장에 따른 세수 감소분으로 반영한 정부 추정치다. 이후 인하가 세 차례 더 연장돼 실제 감소액은 이보다 커질 전망이다(국회예산정책처, 2026-11-05 보도).",
     "src": [
      5
     ],
     "usd_bn": 2.5067,
     "usd_note": "계산: 2026-11-06 환율 1,356.34 KRW/USD"
    },
    {
     "label": "유류세 인하 세수 감소(2025년)",
     "year": 2025,
     "kind": "estimate",
     "amount": 3.3,
     "currency": "KRW",
     "unit": "조 원",
     "note": "국회예산정책처 '2027년도 조세지출예산서 분석'의 사후 추계다. 2022년 4.7조, 2023년 5.1조, 2024년 4.8조 원이다.",
     "src": [
      5
     ]
    },
    {
     "label": "석유 최고가격제 정유사 손실보전(1차 추경)",
     "year": 2026,
     "kind": "revised",
     "amount": 4.2,
     "currency": "KRW",
     "unit": "조 원",
     "note": "산업부가 2·3분기 원가 기준으로 추산한 손실 약 2.76조 원에 국제유가 배럴당 150달러 대비분 1.5조 원을 더해 예비비로 편성했다(최고가격제 6개월 운영 가정, 월 약 7천억 원). 2027년 예산안에 1조4,497억 원이 추가 반영돼 합계 5조6,497억 원이다. 1차 정산 대상은 3월 13일~6월 말이며 정산가격은 11월 말 확정 예정이다. 실제 지급은 빨라야 연말이며 지급액은 공개되지 않았다.",
     "src": [
      18,
      22
     ],
     "kind_label": "1차 추경",
     "usd_bn": 3.0966,
     "usd_note": "계산: 2026-11-06 환율 1,356.34 KRW/USD"
    },
    {
     "label": "석유 최고가격제 정유사 누적 손실(업계 추정, 3~5월)",
     "year": 2026,
     "kind": "estimate",
     "amount": 4,
     "currency": "KRW",
     "unit": "조 원",
     "note": "업계는 3월 도입 후 5월 말까지 누적 손실을 4조 원 초과로 추산했다(하한값 기재). 산업부는 원가 기준 손실이 업계 주장 3~4조 원보다 적을 것으로 봤다. 반면 검찰은 압수 자료 분석 결과 정유 4사 모두 최고가격제 시행 후 휘발유·경유·등유 등 전 유종에서 이익을 냈다고 판단했다(머니투데이방송 2026-07-06 단독 보도).",
     "src": [
      21,
      20,
      19
     ],
     "usd_bn": 2.9491,
     "usd_note": "계산: 2026-11-06 환율 1,356.34 KRW/USD"
    },
    {
     "label": "고유가 피해지원금(현금, 소득 하위 70%)",
     "year": 2026,
     "kind": "revised",
     "amount": 4.8,
     "currency": "KRW",
     "unit": "조 원",
     "note": "정부안은 4조8,252억 원이며 국무회의 통과 보도는 4.8조 원이다. 최종 합의를 약 4.5조 원으로 적은 보도도 있다. 1인당 최대 60만 원의 현금 이전이다.",
     "src": [
      12,
      13,
      17
     ],
     "kind_label": "1차 추경",
     "usd_bn": 3.5389,
     "usd_note": "계산: 2026-11-06 환율 1,356.34 KRW/USD"
    },
    {
     "label": "고유가 부담 완화 패키지(1차 추경 내)",
     "year": 2026,
     "kind": "revised",
     "amount": 10.1,
     "currency": "KRW",
     "unit": "조 원",
     "note": "정부안 기준 10.1조 원이며 보도별로 10.1조~10.4조 원이다. 석유 최고가격제 손실보전 예산을 포함한다. 추경 총액은 26.2조 원이다.",
     "src": [
      16,
      10,
      61
     ],
     "kind_label": "1차 추경",
     "usd_bn": 7.4465,
     "usd_note": "계산: 2026-11-06 환율 1,356.34 KRW/USD"
    },
    {
     "label": "농기계 경유 유가연동보조금 신설(1차 추경)",
     "year": 2026,
     "kind": "revised",
     "amount": 529,
     "currency": "KRW",
     "unit": "억 원",
     "note": "2차 자료 기준 수치이며 기사 원문은 미확인이다.",
     "src": [
      11,
      13
     ],
     "kind_label": "1차 추경",
     "usd_bn": 0.039,
     "usd_note": "계산: 2026-11-06 환율 1,356.34 KRW/USD"
    },
    {
     "label": "어업인 면세경유 유가연동보조금 증액(1차 추경)",
     "year": 2026,
     "kind": "revised",
     "amount": 94,
     "currency": "KRW",
     "unit": "억 원",
     "note": "2차 자료 기준 수치이며 기사 원문은 미확인이다.",
     "src": [
      11,
      13
     ],
     "kind_label": "1차 추경",
     "usd_bn": 0.0069,
     "usd_note": "계산: 2026-11-06 환율 1,356.34 KRW/USD"
    }
   ],
   "measures_2026": [
    {
     "date": "2026-03-11",
     "text": "정부는 화물차·버스·택시 경유 유가연동보조금 지급을 4월까지 연장하고 기준가격 초과분 지급 비율을 70%로 높였다.",
     "src": [
      8
     ]
    },
    {
     "date": "2026-03",
     "text": "유가연동보조금 대상은 경유 화물차 약 38만 대, 노선버스 1만6천 대, 택시 270대다.",
     "src": [
      58
     ]
    },
    {
     "date": "2026-03-13",
     "text": "정부는 석유 최고가격제를 도입했다.",
     "src": [
      21,
      20
     ]
    },
    {
     "date": "2026-03-26",
     "text": "정부는 유류세 인하율을 휘발유 7%→15%, 경유 10%→25%로 확대했다(3월 27일분부터 소급, 4월 1일 시행). 리터당 유류세는 휘발유 763원→698원, 경유 523원→436원이다. 인하 종료 시점은 4월 말에서 5월 말로 늦췄다.",
     "src": [
      1,
      2
     ]
    },
    {
     "date": "2026-03-31",
     "text": "정부는 26.2조 원 규모 1차 추경안(전쟁 추경)을 발표했다. 고유가 부담 완화에 10.1조 원을 배정했고 적자국채는 발행하지 않는다.",
     "src": [
      16,
      15
     ]
    },
    {
     "date": "2026-04-10",
     "text": "국회는 26.2조 원 추경을 통과시켰다. 편성부터 처리까지 29일이 걸렸다.",
     "src": [
      14,
      11
     ]
    },
    {
     "date": "2026-05-12",
     "text": "국토교통부는 화물차·버스 유가연동보조금 상한을 리터당 183원에서 280원으로 53% 올렸다. 지원 구간은 경유가 1,700~1,961원에서 1,700~2,100원으로 넓어졌다. 25톤 화물차는 월 최대 23만 원을 더 받는다.",
     "src": [
      7
     ]
    },
    {
     "date": "2026-05-21",
     "text": "정부는 유류세 인하(휘발유 15%, 경유 25%)를 7월 31일까지 연장했다.",
     "src": [
      3
     ]
    },
    {
     "date": "보도일 미확인",
     "text": "구윤철 경제부총리는 버스·택시·화물차 유가연동보조금을 6월까지 연장한다고 밝혔다.",
     "src": [
      9
     ]
    },
    {
     "date": "2026-06-18",
     "text": "정부는 최고가격제 손실보전 기준을 싱가포르 MOPS 가격이 아닌 원가에 적정마진을 더한 방식으로 정했다.",
     "src": [
      19
     ]
    },
    {
     "date": "2026-09-29",
     "text": "국무회의는 9월 30일 종료 예정이던 유류세 인하를 11월 30일까지 연장했다. 인하율은 휘발유 15%, 경유·LPG부탄 25%로 유지했다. 리터당 인하액은 휘발유 122원, 경유 145원이다.",
     "src": [
      4,
      59
     ]
    },
    {
     "date": "2026-10-04",
     "text": "제10차 최고가격은 휘발유 리터당 1,784원, 경유 1,773원으로 제9차와 같다. 산업부는 정산가격을 11월 말까지 확정하고 7월 이후 손실은 분기별로 정산한다.",
     "src": [
      18
     ]
    }
   ],
   "fiscal_impact": [
    {
     "text": "1차 추경(전쟁 추경)은 26.2조 원이며 4월 10일 국회를 통과했다.",
     "src": [
      14,
      11
     ]
    },
    {
     "text": "추경 재원은 초과세수 25.2조 원과 기금 자체재원 1.0조 원이며 적자국채는 발행하지 않았다. 이 가운데 1.0조 원은 국채 상환에 쓴다.",
     "src": [
      15
     ]
    },
    {
     "text": "추경 후 관리재정수지 적자는 107.6조 원(GDP 대비 3.8%)으로 본예산 107.8조 원(3.9%)보다 0.2조 원 줄었다.",
     "src": [
      14,
      15
     ]
    },
    {
     "text": "국가채무비율은 51.6%에서 50.6%로 1.0%p 내렸다. 정부가 경상성장률 전망을 3.9%에서 4.9%로 올린 영향이다.",
     "src": [
      15
     ]
    },
    {
     "text": "국회예산정책처는 2021~2025년 유류세 인하·할당관세에 따른 세입 감소를 연평균 4.8조 원으로 추산했다.",
     "src": [
      5
     ]
    },
    {
     "text": "정부는 유류세 인하분을 국세감면 통계에서 제외하며, 포함하면 국세감면율이 연평균 0.9%p 높아진다(국회예산정책처).",
     "src": [
      5
     ]
    },
    {
     "text": "업계는 3~5월 누적 손실만 4조 원을 넘는다고 추산해 손실보전 예산 4.2조 원이 부족하다고 본다. 산업부는 원가 기준 손실이 3~4조 원보다 적을 것으로 본다.",
     "src": [
      21,
      20,
      19
     ]
    }
   ],
   "sensitivity": [
    {
     "text": "산업부는 최고가격과 원가 기준 가격의 차이 100원당 약 1.5조 원을 기준으로 손실보전 예산을 추산했다(적용 기간 원문 미확인).",
     "src": [
      18
     ]
    },
    {
     "text": "산업부는 국회예산정책처의 국제유가 배럴당 150달러 가능성 의견을 반영해 손실보전 예산에 1.5조 원을 추가 편성했다.",
     "src": [
      18
     ]
    },
    {
     "text": "파이낸셜뉴스는 유류세 인하율을 10%p 더 확대하면 휘발유 가격은 리터당 82원 내리고 연간 세수는 1.8조 원 줄어든다고 보도했다(3월 12일).",
     "src": [
      6
     ]
    },
    {
     "text": "그린피스 브리핑(2026년 7월)은 인하율 10%p 확대 시 연간 세수 감소를 1.2조~1.8조 원으로 추정했다.",
     "src": [
      60
     ]
    }
   ],
   "prices": [
    {
     "product": "휘발유 최고가격(제10차)",
     "price": 1784,
     "unit": "원/L",
     "date": "2026-10-04",
     "note": "보도일 기준이며 제9차와 같다. 공급가·소매가 기준 여부는 원문 미확인이다.",
     "src": [
      18
     ]
    },
    {
     "product": "경유 최고가격(제10차)",
     "price": 1773,
     "unit": "원/L",
     "date": "2026-10-04",
     "note": "보도일 기준이며 제9차와 같다.",
     "src": [
      18
     ]
    }
   ],
   "open_items": [
    "2026년 본예산·추경의 국제유가 전제(벤치마크 포함)",
    "유류세 인하에 따른 2026년 실제 세수 감소액(4~11월 연장분 포함)은 정부가 별도로 공개하지 않았다.",
    "화물·버스·택시 유가연동보조금의 2026년 예산·집행액과 6월 이후 연장 여부",
    "석유 최고가격제 손실보전 실제 지급액은 정산 전이다(11월 말 정산가격 확정 예정).",
    "최고가격(휘발유 1,784원, 경유 1,773원)이 정유사 공급가 기준인지 소매가 기준인지는 원문 미확인이다.",
    "고유가 피해지원금 최종 금액은 4.8조 원과 4.5조 원 보도가 엇갈린다.",
    "농기계·어업인 유가연동보조금(529억·94억 원)과 업계 누적 손실(4조 원 초과)은 2차 자료 기준 수치이며 출처 기사 원문은 미확인이다.",
    "유류세 인하 종료 시점을 7월 말에서 9월 30일로 늦춘 결정일(1차 자료 미확인)",
    "신용평가사·IMF의 한국 유류 보조 관련 코멘트",
    "한국 언론 사이트의 기사 원문"
   ],
   "sources": [
    {
     "id": 1,
     "title": "유류세 인하폭 확대…경유 10→25%·휘발유 7→15%",
     "publisher": "한국경제",
     "date": "2026-03-26",
     "url": "https://www.hankyung.com/article/2026032685647"
    },
    {
     "id": 2,
     "title": "유류세 인하 휘발유 15%·경유 25%…5월 말까지 ℓ당 65~87원↓",
     "publisher": "기독일보",
     "date": "2026-03-26",
     "url": "https://www.christiandaily.co.kr/news/159655"
    },
    {
     "id": 3,
     "title": "[속보]유류세 인하 7월 말까지 추가 연장…휘발유 15%↓ 경유 25%↓",
     "publisher": "Daum 뉴스(원 매체 미확인)",
     "date": "2026-05-21",
     "url": "https://v.daum.net/v/20260521082449416?f=p"
    },
    {
     "id": 4,
     "title": "유류세 인하 두 달 연장, 휘발유·경유 가격 부담 낮춘다",
     "publisher": "데일리환경",
     "date": "2026-10-02",
     "url": "https://www.dailyt.co.kr/newsView/dlt202610020005"
    },
    {
     "id": 5,
     "title": "유류세·할당관세로 연평균 4.8조 세수감소…국세감면 통계엔 빠져",
     "publisher": "뉴스핌",
     "date": "2026-11-05",
     "url": "https://www.newspim.com/news/view/20261105001377"
    },
    {
     "id": 6,
     "title": "유류세 10% 확대 시 휘발유 82원↓…연간 세수 1.8조 감소 전망",
     "publisher": "파이낸셜뉴스",
     "date": "2026-03-12",
     "url": "https://www.fnnews.com/news/202603120609487821"
    },
    {
     "id": 7,
     "title": "화물차·버스 유가연동보조금 L당 최대 280원…53% 상향",
     "publisher": "머니투데이",
     "date": "2026-05-12",
     "url": "https://www.mt.co.kr/estate/2026/05/12/2026051211203961180"
    },
    {
     "id": 8,
     "title": "‘고유가’ 교통·물류업계 곡소리…경유 유가연동보조금 4월까지 지원",
     "publisher": "농민신문",
     "date": "2026-03-11",
     "url": "https://www.nongmin.com/article/20260311500164"
    },
    {
     "id": 9,
     "title": "구윤철 \"버스·택시·화물차 유가연동보조금 6월까지 연장\"",
     "publisher": "이투데이",
     "url": "https://m.etoday.co.kr/news/view/2580934"
    },
    {
     "id": 10,
     "title": "추경 25조 중 10조 ‘고유가 부담 완화’ 투입",
     "publisher": "경향신문",
     "date": "2026-03-30",
     "url": "https://www.khan.co.kr/article/202603302048005"
    },
    {
     "id": 11,
     "title": "전쟁 추경 26.2조 확정…고유가 피해 지원금 이달 지급 개시",
     "publisher": "파이낸셜뉴스",
     "date": "2026-04-11",
     "url": "https://www.fnnews.com/news/202604110602229845"
    },
    {
     "id": 12,
     "title": "국무회의, 2026년 추경 통과…고유가 피해지원금 4조8000억원",
     "publisher": "한국아이닷컴",
     "date": "2026-04-11",
     "url": "https://www.hankooki.com/news/articleView.html?idxno=328449"
    },
    {
     "id": 13,
     "title": "여야, 26.2조 추경 최종 합의…고유가 지원금 유지",
     "publisher": "뉴스보이",
     "url": "https://newsboy.news/news/344851"
    },
    {
     "id": 14,
     "title": "전쟁추경 26.2조원 국회 본회의 통과…재정수지·국가채무비율 원안 유지",
     "publisher": "아시아경제",
     "date": "2026-04-11",
     "url": "https://view.asiae.co.kr/article/2026041100033351847"
    },
    {
     "id": 15,
     "title": "[전쟁 추경] 고유가 대응·민생 안정에 26.2조…\"국채 발행없이 초과세수 재원\"",
     "publisher": "아주경제",
     "date": "2026-03-31",
     "url": "https://www.ajunews.com/view/20260331100537739"
    },
    {
     "id": 16,
     "title": "전쟁추경 26.2조 투입…'고유가 부담 완화' 10.1조 배정[전쟁추경]",
     "publisher": "Daum 뉴스(원 매체 미확인)",
     "date": "2026-03-31",
     "url": "https://v.daum.net/v/20260331123552249?f=p"
    },
    {
     "id": 17,
     "title": "소득 하위 70%, 최대 60만 원... 26조 '전쟁 추경' 국무회의 의결",
     "publisher": "한국일보",
     "date": "2026-04-09",
     "url": "https://www.hankookilbo.com/news/article/amp/A2026040908250005346"
    },
    {
     "id": 18,
     "title": "정유사 최고가격제 손실보전, 가격차 100원당 1.5조원 산정",
     "publisher": "뉴스웨이",
     "date": "2026-10-04",
     "url": "https://www.newsway.co.kr/news/view?ud=2026100410260279137"
    },
    {
     "id": 19,
     "title": "‘석유 최고가격제’ 정유사 손실 보전, 원가＋적정마진…“3~4조보다 적을 듯”",
     "publisher": "헤럴드경제",
     "date": "2026-06-18",
     "url": "https://biz.heraldcorp.com/article/10776762"
    },
    {
     "id": 20,
     "title": "석유 최고가격제 손실 보전, 핵심인 ‘원가 범위’ 샅바싸움 시작",
     "publisher": "경향신문",
     "date": "2026-06-29",
     "url": "https://www.khan.co.kr/article/202606292038035"
    },
    {
     "id": 21,
     "title": "최고가격제 손실 보전 기준 이르면 이번 주 공개…정유업계 '촉각'",
     "publisher": "파이낸셜뉴스",
     "date": "2026-06-15",
     "url": "https://www.fnnews.com/news/202606150630590265"
    },
    {
     "id": 22,
     "title": "석유 최고가격제 부활, 2026년 추경 4조 2천억 원 투입과 정유사 손실 보전 과제",
     "publisher": "토픽트리",
     "url": "https://topictree.co.kr/automobiles/news/korea-fuel-price-cap-policy-global-oil-gap/"
    },
    {
     "id": 58,
     "title": "\"화물차 연료비 월 44만 원 절감\"‥유가연동보조금 4월까지 연장",
     "publisher": "MBC",
     "url": "https://imnews.imbc.com/news/2026/econo/article/6806615_36932.html"
    },
    {
     "id": 59,
     "title": "유류세 인하 두 달 더 연장…휘발유 15%·경유·LPG 25% 유지",
     "publisher": "이투데이",
     "url": "https://m.etoday.co.kr/news/view/2606871"
    },
    {
     "id": 60,
     "title": "반복되는 유가 위기, 유류세 인하 원점에서 다시 검토해야 하는 이유(브리핑)",
     "publisher": "그린피스 서울사무소",
     "url": "https://www.greenpeace.org/static/planet4-korea-stateless/2026/07/58a6e5b8-%EB%B8%8C%EB%A6%AC%ED%95%91_%EB%B0%98%EB%B3%B5%EB%90%98%EB%8A%94-%EC%9C%A0%EA%B0%80-%EC%9C%84%EA%B8%B0-%EC%9C%A0%EB%A5%98%EC%84%B8-%EC%9D%B8%ED%95%98-%EC%9B%90%EC%A0%90%EC%97%90%EC%84%9C-%EB%8B%A4%EC%8B%9C-%EA%B2%80%ED%86%A0%ED%95%B4%EC%95%BC-%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0.pdf"
    },
    {
     "id": 61,
     "title": "2026 추가경정예산안 어디에 쓰이나?",
     "publisher": "대한민국 정책브리핑",
     "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148961913"
    }
   ],
   "region": "east_asia",
   "tag": "유류세 인하 · 최고가격제 손실보전",
   "fy": "1~12월",
   "overview_budget": 2,
   "group": "east-asia"
  },
  {
   "code": "JP",
   "name_kr": "일본",
   "mechanism": "일본은 석유 원매사(元売り)에 리터당 보조금을 지급해 소매가격 상승을 억제하는 연료유가격 격변완화 대책을 운영한다. 2026년 3월 19일 재개된 긴급 조치는 레귤러 휘발유 전국평균이 리터당 170엔 수준을 넘는 부분을 보조하며 휘발유·경유·중유·등유·항공유가 대상이다. 보조금은 기금에서 지급하고, 정부는 예비비 사용을 각의결정해 기금을 적립한다. 휘발유 잠정세율(2025년 12월 31일)과 경유인취세(軽油引取税) 잠정세율(2026년 4월 1일) 폐지로 세수 감소가 별도로 발생한다.",
   "items": [
    {
     "label": "연료유 격변완화 보조금(2025회계연도 일반예비비 사용)",
     "year": 2026,
     "kind": "revised",
     "amount": 7948.5,
     "currency": "JPY",
     "unit": "억 엔",
     "note": "2026-03-24 각의결정, 794,847,460천 엔이다. 같은 결정의 택시용 LPG 격변완화 58.4억 엔은 제외했다. 결정 당시 기존 기금 잔액은 2,800억 엔이다. 금액은 기금 적립액이다.",
     "src": [
      24,
      23
     ],
     "kind_label": "예비비 사용",
     "usd_bn": 5.0172,
     "usd_note": "계산: 2026-11-07 환율 158.43 JPY/USD"
    },
    {
     "label": "중동정세 등 대응 예비비(2026회계연도 1차 추경)",
     "year": 2026,
     "kind": "revised",
     "amount": 25000,
     "currency": "JPY",
     "unit": "억 엔",
     "note": "6월 3일 각의결정을 거쳐 6월 5일 성립했다. 추경 총액 3조1,135억 엔은 전액 특례공채로 조달한다. 휘발유 보조 지속을 우선 상정했으나 중동정세 관련 다른 긴급 경비에도 쓸 수 있다.",
     "src": [
      25,
      26,
      32
     ],
     "kind_label": "1차 추경",
     "usd_bn": 15.7803,
     "usd_note": "계산: 2026-11-07 환율 158.43 JPY/USD"
    },
    {
     "label": "연료유 격변완화 보조금(중동예비비 사용, 9월 1일)",
     "year": 2026,
     "kind": "revised",
     "amount": 6136.4,
     "currency": "JPY",
     "unit": "억 엔",
     "note": "613,639,094천 엔이다. 택시 LPG 23.7억 엔을 더한 결정 총액은 6,160.1억 엔이다. 기금 적립액이다.",
     "src": [
      27
     ],
     "kind_label": "예비비 사용",
     "usd_bn": 3.8734,
     "usd_note": "계산: 2026-11-07 환율 158.43 JPY/USD"
    },
    {
     "label": "연료유 격변완화 보조금(중동예비비 사용, 10월 30일)",
     "year": 2026,
     "kind": "revised",
     "amount": 11458.6,
     "currency": "JPY",
     "unit": "억 엔",
     "note": "1,145,862,018천 엔이다. 택시 LPG 22.5억 엔을 더한 결정 총액은 1조1,481억 엔이며, 사용 후 중동예비비 잔액은 7,358.8억 엔이다.",
     "src": [
      28,
      31
     ],
     "kind_label": "예비비 사용",
     "usd_bn": 7.2328,
     "usd_note": "계산: 2026-11-07 환율 158.43 JPY/USD"
    },
    {
     "label": "전기·가스요금 부담경감 지원(일반예비비, 연료유와 별도)",
     "year": 2026,
     "kind": "revised",
     "amount": 5135,
     "currency": "JPY",
     "unit": "억 엔",
     "note": "2026-05-26 각의결정, 513,504,625천 엔이다. 1차 추경은 같은 금액을 일반예비비에 다시 넣어 잔액을 1조 엔으로 복원했다.",
     "src": [
      29,
      26
     ],
     "kind_label": "예비비 사용",
     "usd_bn": 3.2413,
     "usd_note": "계산: 2026-11-07 환율 158.43 JPY/USD"
    },
    {
     "label": "잠정세율 폐지 세수 감소(휘발유+경유인취세, 국가·지방)",
     "year": 2026,
     "kind": "estimate",
     "amount": 1.5,
     "currency": "JPY",
     "unit": "조 엔/년",
     "note": "휘발유 잠정세율 폐지분은 연 1조 엔이다. 경유인취세 잠정세율까지 포함한 국가·지방 감수는 연 1.5조 엔이다(RIETI 사토 모토히로, 2025년 기고). 지방 감수는 약 5천억 엔이다(당시 총무상).",
     "src": [
      33,
      34
     ],
     "usd_bn": 9.4682,
     "usd_note": "계산: 2026-11-07 환율 158.43 JPY/USD, 년 기준"
    },
    {
     "label": "연료유 격변완화 보조금 예비비 사용 합계(2026년 각의결정 3건)",
     "year": 2026,
     "kind": "revised",
     "period": "2026년 3·9·10월 결정",
     "amount": 25543.5,
     "currency": "JPY",
     "unit": "억 엔",
     "note": "3월 24일 7,948.5억 엔(2025회계연도 일반예비비), 9월 1일 6,136.4억 엔, 10월 30일 1조1,458.6억 엔(2026회계연도 중동예비비)을 더한 계산값이다. 택시 LPG분은 뺐다. 금액은 기금 적립액이다.",
     "kind_label": "예비비 사용",
     "src": [
      23,
      24,
      27,
      28,
      31
     ],
     "usd_bn": 16.1234,
     "usd_note": "계산: 2026-11-07 환율 158.43 JPY/USD"
    }
   ],
   "measures_2026": [
    {
     "date": "2026-03-19",
     "text": "정부는 연료유 긴급 격변완화 조치를 재개했다. 레귤러 휘발유 소매가를 리터당 170엔 수준으로 억제하며 휘발유·경유·중유·등유·항공유가 대상이다.",
     "src": [
      23,
      30
     ]
    },
    {
     "date": "2026-03-24",
     "text": "각의는 2025회계연도 예비비 8,006.9억 엔 사용을 결정했다(연료유 7,948.5억 엔, 택시 LPG 58.4억 엔). 사용 후 2025회계연도 예비비 잔액은 99.3억 엔이다.",
     "src": [
      24,
      23
     ]
    },
    {
     "date": "2026-04-01",
     "text": "경유인취세 잠정세율이 폐지됐다(2025년 11월 여야 합의 일정).",
     "src": [
      35,
      37
     ]
    },
    {
     "date": "2026-05-26",
     "text": "각의는 일반예비비 5,135억 엔을 전기·가스요금 지원에 쓰기로 결정했다.",
     "src": [
      29
     ]
    },
    {
     "date": "2026-06-05",
     "text": "1차 추경 3조1,135억 엔이 성립했다. 중동정세 등 대응 예비비 2.5조 엔, 일반예비비 5,135억 엔, 특별고압전력·LPG 이용자 지원 등에 쓰는 중점지원 지방교부금 1,000억 엔으로 구성된다.",
     "src": [
      25,
      26,
      32
     ]
    },
    {
     "date": "2026-09-01",
     "text": "각의는 중동예비비 6,160.1억 엔 사용을 결정했다(연료유 6,136.4억 엔, 택시 LPG 23.7억 엔).",
     "src": [
      27
     ]
    },
    {
     "date": "2026-10-29",
     "text": "다카이치 총리는 12월부터 보조를 단계적으로 줄인다고 밝혔다. 기준가격 170엔을 봄까지 매월 5엔씩 올린다. 직전 보조 단가는 사상 최고인 리터당 52.4엔이다.",
     "src": [
      31
     ]
    },
    {
     "date": "2026-10-30",
     "text": "각의는 중동예비비 1조1,481억 엔 사용을 결정했다(연료유 1조1,458.6억 엔, 택시 LPG 22.5억 엔).",
     "src": [
      28,
      31
     ]
    }
   ],
   "fiscal_impact": [
    {
     "text": "1차 추경 3조1,135억 엔은 전액 특례공채(적자국채)로 조달한다.",
     "src": [
      25,
      26
     ]
    },
    {
     "text": "재무성은 2025회계연도 특례공채 중 3조 엔을 감액할 수 있어 2026회계연도 시중 발행액은 늘리지 않는다고 설명했다.",
     "src": [
      26
     ]
    },
    {
     "text": "2026년 연료유 보조용 예비비 사용 3건(2025회계연도 예비비 1건, 중동예비비 2건)의 합계는 약 2조5,543억 엔이다(7,948.5억+6,136.4억+1조1,458.6억 엔, 계산값).",
     "src": [
      24,
      27,
      28
     ]
    },
    {
     "text": "중동예비비 2.5조 엔 가운데 10월 30일까지 1조7,641억 엔을 써 잔액은 7,358.8억 엔이다.",
     "src": [
      28
     ]
    },
    {
     "text": "2025회계연도 일반예비비는 3월 24일 사용 후 잔액이 99.3억 엔으로 줄었다.",
     "src": [
      24
     ]
    },
    {
     "text": "확인한 2026회계연도 일반예비비 사용 결정(5월 26일, 9월 29일, 10월 6일, 10월 27일, 11월 6일)에는 연료유 보조 항목이 없다.",
     "src": [
      39,
      29
     ]
    },
    {
     "text": "휘발유 잠정세율(리터당 약 25엔)은 2025년 12월 31일 폐지됐다(관련법 2025년 11월 28일 성립).",
     "src": [
      36,
      40,
      37
     ]
    },
    {
     "text": "잠정세율 폐지로 휘발유분 연 1조 엔, 경유인취세까지 포함하면 국가·지방 세수가 연 1.5조 엔 줄어든다.",
     "src": [
      33
     ]
    }
   ],
   "prices": [
    {
     "product": "레귤러 휘발유 전국평균 소매가",
     "price": 169,
     "unit": "엔/L",
     "date": "2026-05",
     "note": "보조 단가 42.6엔/L 적용 시점의 세무사 사이트 집계다(2차 자료).",
     "src": [
      38
     ]
    },
    {
     "product": "레귤러 휘발유 보조 기준가격",
     "price": 170,
     "unit": "엔/L",
     "date": "2026-03-19",
     "note": "보조 목표 수준이며 12월부터 봄까지 매월 5엔씩 올린다.",
     "src": [
      23,
      31
     ]
    }
   ],
   "open_items": [
    "기금에서 석유 원매사에 실제 지급한 금액(집행액)과 월별 지출",
    "2025년 비교치(2025회계연도 보정예산의 연료유 보조 계상액, 2025년 지급액)",
    "2022년 제도 도입 이후 누적 지출",
    "일본 예산의 원유가격 전제",
    "보조 단가 시계열(3월 48.1엔, 5월 42.6엔, 9월 51.0엔, 10월 42.4엔·52.4엔)이 2차 자료마다 다르다.",
    "등유·중유·항공유 보조 단가",
    "경유인취세 잠정세율 폐지의 실제 시행(2026-04-01)은 세무사 사이트 기준이다.",
    "잠정세율 폐지 세수 감소(연 1.5조 엔)는 2025년 RIETI 기고 기준이며 재무성·총무성 공식 추계는 미확인이다.",
    "보조 비용의 유가·환율 민감도(배럴당 1달러 또는 1엔당 비용) 공식 수치",
    "신용평가사·IMF의 일본 연료 보조 관련 코멘트",
    "자원에너지청과 닛케이 원문(재무성 예비비·추경 자료는 원문 PDF로 확인했다)"
   ],
   "sources": [
    {
     "id": 23,
     "title": "ガソリン補助に予備費8000億円支出、閣議決定 暫定予算も準備",
     "publisher": "日本経済新聞",
     "date": "2026-03-24",
     "url": "https://www.nikkei.com/article/DGXZQOUA237040T20C26A3000000/"
    },
    {
     "id": 24,
     "title": "令和７年度一般会計予備費使用（令和８年３月24日閣議決定）",
     "publisher": "財務省",
     "date": "2026-03-24",
     "url": "https://www.mof.go.jp/policy/budget/budger_workflow/budget/fy2025/r80324kakugikettei.pdf"
    },
    {
     "id": 25,
     "title": "令和８年度一般会計補正予算（第１号）フレーム",
     "publisher": "財務省",
     "date": "2026-06-03",
     "url": "https://www.mof.go.jp/policy/budget/budger_workflow/budget/fy2026/hosei260603a.pdf"
    },
    {
     "id": 26,
     "title": "令和８年度一般会計補正予算（第１号）の概要",
     "publisher": "財務省",
     "date": "2026-06-03",
     "url": "https://www.mof.go.jp/policy/budget/budger_workflow/budget/fy2026/hosei260603c.pdf"
    },
    {
     "id": 27,
     "title": "令和８年度一般会計中東情勢等対応予備費使用（令和８年９月１日閣議決定）",
     "publisher": "財務省",
     "date": "2026-09-01",
     "url": "https://www.mof.go.jp/policy/budget/budger_workflow/budget/fy2026/r80901kakugikettei.pdf"
    },
    {
     "id": 28,
     "title": "令和８年度一般会計中東情勢等対応予備費使用（令和８年10月30日閣議決定）",
     "publisher": "財務省",
     "date": "2026-10-30",
     "url": "https://www.mof.go.jp/policy/budget/budger_workflow/budget/fy2026/r81030kakugikettei.pdf"
    },
    {
     "id": 29,
     "title": "令和８年度一般会計予備費使用（令和８年５月26日閣議決定）",
     "publisher": "財務省",
     "date": "2026-05-26",
     "url": "https://www.mof.go.jp/policy/budget/budger_workflow/budget/fy2026/r80526kakugikettei.pdf"
    },
    {
     "id": 30,
     "title": "日本のガソリン価格は世界と比べて安い？高い？中東情勢を踏まえた燃料油の「緊急的激変緩和措置」",
     "publisher": "資源エネルギー庁",
     "url": "https://www.enecho.meti.go.jp/about/special/johoteikyo/fuel_price_shien_2026.html"
    },
    {
     "id": 31,
     "title": "ガソリン補助金１兆円を閣議決定 財源を積み増し、１２月から縮小",
     "publisher": "東京新聞（共同通信）",
     "date": "2026-10-30",
     "url": "https://www.tokyo-np.co.jp/article/524966"
    },
    {
     "id": 32,
     "title": "エネルギー価格高騰に対応 中東情勢受けた補正予算成立",
     "publisher": "テレ東BIZ",
     "date": "2026-06-05",
     "url": "https://txbiz.tv-tokyo.co.jp/nmssat/news/post_342217"
    },
    {
     "id": 33,
     "title": "経済を見る眼 ガソリン税の暫定税率廃止は正しい選択か",
     "publisher": "経済産業研究所（RIETI）佐藤主光",
     "url": "https://www.rieti.go.jp/jp/papers/contribution/sato-motohiro/40.html"
    },
    {
     "id": 34,
     "title": "地方税収5千億円減",
     "publisher": "OANDA（共同通信配信）",
     "url": "https://www.oanda.jp/lab-education/?p=92406"
    },
    {
     "id": 35,
     "title": "社説:暫定税率年内廃止 財源確保策、早期決着を",
     "publisher": "秋田魁新報",
     "date": "2025-11-05",
     "url": "https://www.sakigake.jp/news/article/20251105AK0002/"
    },
    {
     "id": 36,
     "title": "ガソリン減税法成立、価格低下へ",
     "publisher": "OANDA（共同通信配信）",
     "date": "2025-11-28",
     "url": "https://www.oanda.jp/lab-education/market_news/kn_2025112801000394/"
    },
    {
     "id": 37,
     "title": "ガソリン暫定税率廃止【2026年5月最新】廃止完了・軽油4月廃止完了・補助金継続中を税理士が解説",
     "publisher": "taxlabor.com",
     "url": "https://taxlabor.com/gasoline-zantei-zeiritsu/"
    },
    {
     "id": 38,
     "title": "ガソリン補助金の最新情報｜補助単価・全国平均価格・継続見通し・財源を税理士が解説",
     "publisher": "taxlabor.com",
     "url": "https://taxlabor.com/gasoline-hojyokin-itsu-from/"
    },
    {
     "id": 39,
     "title": "令和８年度予算（補正予算・予備費使用一覧）",
     "publisher": "財務省",
     "url": "https://www.mof.go.jp/policy/budget/budger_workflow/budget/fy2026/index.html"
    },
    {
     "id": 40,
     "title": "暫定税率廃止、ガソリン年内25円安へ 与野党合意 財源議論は深まらず",
     "publisher": "北海道新聞",
     "url": "https://www.hokkaido-np.co.jp/article/1192972/"
    }
   ],
   "region": "east_asia",
   "tag": "석유 원매사(정유·도매) 리터당 보조(예비비)",
   "fy": "4~3월",
   "overview_budget": 6,
   "group": "east-asia"
  },
  {
   "code": "CN",
   "name_kr": "중국",
   "mechanism": "중국은 국가발전개혁위원회(NDRC)가 국제 원유 바스켓 가격에 연동해 휘발유·경유 최고소매가격을 10영업일마다 조정한다. 바스켓 가격이 배럴당 130달러를 넘으면 인상을 하지 않거나 줄이며, 2022년 규정은 이때 2개월 이내 동결과 함께 재정부·NDRC가 정유사에 한시 보조금을 지급하도록 했다. 2026년에는 130달러 상한을 적용하지 않고 기존 메커니즘 안의 임시 조정(临时调控)으로 인상폭을 약 절반으로 줄였다. 2026년 임시 조정분에 대한 재정 보전은 확인되지 않아 미반영분은 정유사가 부담한 것으로 판단한다.",
   "items": [],
   "measures_2026": [
    {
     "date": "2026-03-23",
     "text": "NDRC는 2013년 메커니즘 시행 후 첫 임시 조정을 했다. 계산상 인상폭은 휘발유 톤당 2,205위안, 경유 2,120위안이었으나 실제 인상은 1,160위안, 1,115위안이다.",
     "src": [
      41,
      57
     ]
    },
    {
     "date": "2026-04-07",
     "text": "NDRC는 두 번째 임시 조정을 했다. 계산상 인상폭 휘발유 800위안, 경유 770위안 대비 실제 420위안, 400위안을 올렸다.",
     "src": [
      47,
      46
     ]
    },
    {
     "date": "2026-04-21",
     "text": "휘발유는 톤당 555위안, 경유는 530위안 내렸다. 5월 8일에는 각각 320위안, 310위안 올렸다.",
     "src": [
      50
     ]
    },
    {
     "date": "2026-09-11",
     "text": "NDRC는 세 번째 임시 조정을 했다. 계산상 인상폭 휘발유 435위안, 경유 420위안 대비 실제 260위안, 250위안을 올렸다.",
     "src": [
      48
     ]
    },
    {
     "date": "2026-09-24",
     "text": "NDRC는 네 번째 임시 조정을 했다. 계산상 인상폭 휘발유 830위안, 경유 800위안 대비 실제 395위안, 385위안을 올렸다.",
     "src": [
      49
     ]
    },
    {
     "date": "2026-10-15",
     "text": "이번 조정 주기에는 휘발유·경유 가격을 동결했다.",
     "src": [
      51
     ]
    },
    {
     "date": "2026-10-29",
     "text": "다섯 번째 임시 조정으로 휘발유는 톤당 345위안, 경유는 335위안 올랐다.",
     "src": [
      50,
      52
     ]
    },
    {
     "date": "2026",
     "text": "2026년 택시 보조금은 도시교통발전 장려자금에서 나오며 연료 소비량과 연동하지 않고 신에너지 전환 지원에 쓴다.",
     "src": [
      55
     ]
    }
   ],
   "fiscal_impact": [
    {
     "text": "Trivium은 NDRC가 바스켓 가격 130달러 아래에서 2013년 조항을 근거로 인상폭을 약 절반으로 줄였다고 분석했다.",
     "src": [
      42
     ]
    },
    {
     "text": "NDRC는 CNPC·시노펙·CNOOC 등 원유 가공 기업에 생산·운송을 조직해 공급을 안정시키고 국가 가격정책을 엄격히 집행하라고 요구했다.",
     "src": [
      46,
      47
     ]
    },
    {
     "text": "최고소매가는 다섯 차례 임시 조정에도 2026년 들어 톤당 휘발유 2,460위안, 경유 2,340위안 누적 상승했다(11월 1일 보도).",
     "src": [
      52
     ]
    },
    {
     "text": "시노펙의 2026년 1~3분기 순이익(중국 회계기준)은 389.88억 위안으로 30.0% 늘었고, 3분기는 133.61억 위안으로 57.2% 늘었다.",
     "src": [
      53,
      54
     ]
    },
    {
     "text": "시노펙 정제 부문 1~3분기 EBIT는 300.99억 위안으로 전년 동기 70억 위안보다 늘었다. 회사는 정제 제품 스프레드 개선, 항공유 등 고부가 제품 증산, 유가 상승에 따른 재고 이익을 원인으로 들었다.",
     "src": [
      54,
      52
     ]
    },
    {
     "text": "국내 석유제품 소비는 전년 대비 8.6% 줄었고 시노펙 석유제품 판매량은 11.4% 줄었다.",
     "src": [
      54,
      52
     ]
    },
    {
     "text": "가격 억제분은 정유사가 흡수했으나 재고 이익과 마진 확대로 정제 부문 이익은 늘어난 것으로 판단한다.",
     "src": [
      54,
      52
     ]
    }
   ],
   "sensitivity": [
    {
     "text": "현행 규정상 바스켓 가격이 배럴당 130달러를 넘으면 국내 최고소매가 인상을 멈추거나 줄인다.",
     "src": [
      43,
      45
     ]
    },
    {
     "text": "2022년 규정은 130달러 초과 시 2개월 이내 가격을 올리지 않고, 공식이 산출한 미반영 인상분만큼 재정부·NDRC가 정유사에 보조하도록 했다.",
     "src": [
      44,
      43
     ]
    },
    {
     "text": "S&P Global은 130달러를 넘으면 정유사가 이론상 손실을 볼 수 있다고 봤다.",
     "src": [
      45
     ]
    }
   ],
   "open_items": [
    "2026년 임시 조정에 대한 중앙재정의 정유사 보조금 지급 여부와 금액",
    "2026년 바스켓 가격이 130달러를 넘은 조정 주기가 있었는지는 NDRC 원문 미확인이다(3월 조치는 130달러 미만).",
    "정유사가 흡수한 미반영 인상분의 금액 추정치",
    "어업·택시·대중교통 연료 보조의 2026년 예산과 유가 연동 일회성 지원 발표",
    "도시·농촌 도로여객 운송 석유제품 가격 보조 전용자금(2009년 근거 제도)의 2026년 집행 여부",
    "5월 8일~9월 11일 사이 조정 내역과 10월 29일 조정의 계산상 인상폭",
    "중국은 예산 유가 전제를 공표하지 않으며, 재정부 자료의 관련 수치도 미확인이다.",
    "CNPC·CNOOC 실적과 신용평가사·IMF의 중국 연료가격 통제 관련 재정 코멘트",
    "NDRC 등 중국 원문"
   ],
   "sources": [
    {
     "id": 41,
     "title": "China’s top economic planner to impose temporary curbs on domestic fuel prices",
     "publisher": "Global Times",
     "date": "2026-03-23",
     "url": "https://www.globaltimes.cn/page/202603/1357376.shtml"
    },
    {
     "id": 42,
     "title": "Beijing intervenes to limit fuel price increases in unprecedented move",
     "publisher": "Trivium China",
     "date": "2026-03-24",
     "url": "https://triviumchina.com/2026/03/24/beijing-intervenes-to-limit-fuel-price-increases-in-unprecedented-move/"
    },
    {
     "id": 43,
     "title": "How does China adjust its domestic refined oil prices?",
     "publisher": "Global Times",
     "url": "https://www.globaltimes.cn/page/202604/1358532.shtml"
    },
    {
     "id": 44,
     "title": "Beijing offers subsidy for refineries if benchmark crude price exceeds $130/b",
     "publisher": "S&P Global Commodity Insights",
     "date": "2022-06-29",
     "url": "https://spglobal.com/commodity-insights/en/news-research/latest-news/crude-oil/062922-beijing-offers-subsidy-for-refineries-if-benchmark-crude-price-exceeds-130b"
    },
    {
     "id": 45,
     "title": "China caps fuel price surge to shield consumers amid Middle East conflict",
     "publisher": "S&P Global",
     "date": "2026-03-23",
     "url": "https://www.spglobal.com/energy/en/news-research/latest-news/energy-transition/032326-china-caps-fuel-price-surge-to-shield-consumers-amid-middle-east-conflict"
    },
    {
     "id": 46,
     "title": "减缓国际油价上涨冲击 保障稳定供应——解读本次汽油、柴油价格调控",
     "publisher": "新华网",
     "date": "2026-04-07",
     "url": "https://www.news.cn/20260407/12dd63ed90a24dfeb9b372ca4c629ade/c.html"
    },
    {
     "id": 47,
     "title": "2026年4月7日国家继续实施调控 成品油价格适当调整",
     "publisher": "财联社",
     "date": "2026-04-07",
     "url": "https://www.cls.cn/detail/2336443"
    },
    {
     "id": 48,
     "title": "2026年9月11日国家对成品油价格实施调控",
     "publisher": "国家发展和改革委员会",
     "date": "2026-09-11",
     "url": "https://www.ndrc.gov.cn/xwdt/xwfb/202609/t20260911_1407564.html"
    },
    {
     "id": 49,
     "title": "2026年9月24日国家继续实施调控，成品油价格适当调整",
     "publisher": "国家发展和改革委员会",
     "date": "2026-09-24",
     "url": "https://www.ndrc.gov.cn/xwdt/xwfb/202609/t20260924_1407824.html"
    },
    {
     "id": 50,
     "title": "2026年国内油价调整时间表一览（持续更新）",
     "publisher": "深圳本地宝",
     "url": "https://m.bendibao.com/show826697.html"
    },
    {
     "id": 51,
     "title": "International oil prices fluctuate at high levels; China's refined fuel prices left unchanged again",
     "publisher": "BigGo Finance",
     "date": "2026-10-15",
     "url": "https://finance.biggo.com/news/fe7a836c-bec8-47d9-bede-f7ea93d78097"
    },
    {
     "id": 52,
     "title": "“两桶油”盈利大增 炼化价差扩大助推利润",
     "publisher": "中华网",
     "date": "2026-11-01",
     "url": "https://news.china.com/socialgd/10000169/20261101/49831645.html"
    },
    {
     "id": 53,
     "title": "中国石化2026年前三季度净利润389.88亿元 同比增长30%",
     "publisher": "观点网",
     "url": "https://www.guandian.cn/m/show/620390"
    },
    {
     "id": 54,
     "title": "油价大涨之下，中国石化前三季度净赚390亿元，同比增长30%",
     "publisher": "每日经济新闻",
     "date": "2026-10-29",
     "url": "https://www.nbd.com.cn/articles/2026-10-29/4629529.html"
    },
    {
     "id": 55,
     "title": "2026 年出租汽车专项补贴新政策解读：多地落地细则，申领要点梳理",
     "publisher": "搜狐",
     "url": "https://society.sohu.com/a/1005693480_122551714"
    },
    {
     "id": 57,
     "title": "今晚！成品油“限涨”：国家启动2013年来首次临时调控",
     "publisher": "第一财经",
     "url": "https://www.yicai.com/video/103100010.html"
    }
   ],
   "region": "east_asia",
   "tag": "가격 상한 메커니즘 · 임시 조정",
   "fy": "1~12월",
   "fiscal_none": "임시 조정으로 덜 올린 가격분을 정유사가 흡수했고 재정 보전은 확인되지 않았다.",
   "group": "east-asia"
  }
 ]
};
