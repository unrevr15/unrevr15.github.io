'use strict';
// 교재 원고에서 대시보드로 온 참조 자료(표와 그림의 값). reference-charts.js가 그린다.
const energyReference = {
 "as_of": "2026-11-13",
 "layout": [
  {
   "section": "ref-crude-stocks",
   "panels": [
    {
     "title": "국가별 전략 재고 추정",
     "items": [
      "strategic-stocks-quarterly",
      "strategic-stocks-comparison-conditions"
     ]
    },
    {
     "title": "각국 공식 비축 자료와 시설능력",
     "items": [
      "knoc-bases-by-type",
      "india-spr-capacity-by-site",
      "official-reserve-records"
     ],
     "links": [
      {
       "to": "stock-programs",
       "label": "미국 SPR 잔고와 유종 구성"
      },
      {
       "to": "oil-balance",
       "label": "한국 정부 비축유 보유량·시설능력"
      }
     ]
    }
   ]
  },
  {
   "section": "ref-chokepoints",
   "panels": [
    {
     "title": "",
     "items": [
      "chokepoint-oil-transit-4q25-2q26"
     ]
    }
   ]
  },
  {
   "section": "ref-rig-counts",
   "panels": [
    {
     "title": "Baker Hughes 최근 집계",
     "note": "2026년 11월 7일에 확인한 고정 스냅샷이다. 미국·캐나다는 주간, International은 월간 집계여서 같은 날짜의 세계 총계로 합산할 수 없다.",
     "items": [
      "baker-hughes-us-rigs-2026-11-06",
      "baker-hughes-canada-rigs-2026-11-06",
      "baker-hughes-international-rigs-2026-10"
     ]
    },
    {
     "title": "국가별 과거 기준선",
     "items": [
      "opec-active-rigs-by-country-2024"
     ]
    }
   ]
  },
  {
   "section": "ref-refining-capacity",
   "panels": [
    {
     "title": "지역·국가(OPEC 명목능력)",
     "note": "지역 분포는 2025년 관측·ASB 2026판이고 선정 국가는 2024년 관측·ASB 2025판이다. 두 판본의 차이에는 증설·폐쇄 외에 과거값 개정이 포함될 수 있다.",
     "items": [
      "refining-capacity-by-region-2025",
      "refining-capacity-selected-countries-2024"
     ],
     "links": [
      {
       "to": "regional-runs",
       "label": "세계 원유 정유 투입량의 분기 변화"
      },
      {
       "to": "refinery-roster",
       "label": "정유시설 명부"
      }
     ]
    },
    {
     "title": "미국(EIA): 가용 능력과 공정·권역별 능력",
     "lead": true,
     "items": [
      "us-operable-distillation-capacity-2026",
      "us-process-capacity-2026",
      "us-padd-distillation-2026",
      "us-padd-hydrocracking-2026",
      "us-process-capacity-comparison-conditions"
     ]
    }
   ]
  },
  {
   "section": "ref-refining-plants",
   "panels": [
    {
     "title": "울산 CLX(SK에너지)",
     "scale": "shared",
     "items": [
      "ulsan-clx-cdu-capacity-2025",
      "ulsan-clx-upgrading-capacity-2025",
      "ulsan-clx-desulfurization-capacity-2025"
     ]
    },
    {
     "title": "Marathon Petroleum",
     "items": [
      "marathon-refinery-crude-capacity-2025"
     ],
     "links": [
      {
       "to": "refinery-roster",
       "label": "정유시설 명부"
      }
     ]
    }
   ]
  },
  {
   "section": "ref-companies-fleet",
   "panels": [
    {
     "title": "유조선 선사",
     "items": [
      "scorpio-fleet-by-class",
      "seaways-operating-fleet",
      "tanker-owner-profiles"
     ],
     "links": [
      {
       "to": "peer-quarters-s1",
       "label": "연차공시상 리그 구성(Transocean·Valaris)"
      }
     ]
    },
    {
     "title": "배관 회사",
     "items": [
      "kinder-morgan-pipeline-miles",
      "kinder-morgan-terminals",
      "enbridge-mainline-capacity",
      "southern-lights-committed-share",
      "pipeline-company-assets",
      "enbridge-contract-structures"
     ]
    }
   ]
  },
  {
   "section": "ref-companies-refining",
   "panels": [
    {
     "title": "Reliance O2C 판매용 생산량",
     "items": [
      "reliance-o2c-transport-fuel-production",
      "reliance-o2c-polymer-production"
     ]
    },
    {
     "title": "운영회사·사업 결합",
     "items": [
      "kr-refiners-operator-and-listed-parent",
      "overseas-refiners-refining-logistics-chemicals",
      "post-refining-chemicals-base-oil-retail"
     ],
     "links": [
      {
       "to": "refinery-roster",
       "label": "정유시설 명부"
      }
     ]
    }
   ]
  },
  {
   "section": "ref-companies-filings",
   "panels": [
    {
     "title": "",
     "items": [
      "annual-reports-a1-drilling-services-subsea",
      "annual-reports-a2-producers-majors-fpso",
      "annual-reports-a3-pipelines-storage-shipping",
      "annual-reports-a4-korea-refining-chemicals-base-oil",
      "annual-reports-a5-overseas-refining-chemicals-retail"
     ]
    }
   ]
  },
  {
   "section": "ref-cpi-weights",
   "panels": [
    {
     "title": "전체 CPI 비중과 근원 포함 여부",
     "items": [
      "us-cpi-retail-item-weights-2026-09",
      "us-cpi-relative-importance-2026-09",
      "us-cpi-core-basket-share-2026-09",
      "us-cpi-latest-month-items-basis"
     ],
     "links": [
      {
       "to": "cpi-items",
       "label": "미국 CPI 품목별 전월비·전년비와 계산 기준"
      }
     ]
    },
    {
     "title": "조건부 기여",
     "items": [
      "us-cpi-contribution-10pct-assumption",
      "us-cpi-retail-item-rise-needed-for-0-1pp",
      "us-cpi-retail-item-effect-of-1pct"
     ]
    }
   ]
  },
  {
   "section": "ref-policy-support",
   "panels": [
    {
     "title": "",
     "items": [
      "jp-low-voltage-power-support-unit-price-2026-08",
      "jp-low-voltage-power-monthly-discount-2026-08",
      "jp-power-gas-support-2026"
     ],
     "links": [
      {
       "to": "sb-jp",
       "label": "일본 전기·가스요금 부담경감 지원 예산"
      }
     ]
    }
   ]
  },
  {
   "section": "ref-climate-grain",
   "panels": [
    {
     "title": "",
     "items": [
      "us-heating-degree-days-2026-10",
      "us-heating-degree-days-2026-10-vs-prior-forecast",
      "us-heating-degree-days-2026-10-vs-10y-average",
      "us-winter-heating-degree-days-forecast-2026-27",
      "usda-ers-food-price-forecast-2026",
      "usda-ers-food-price-forecast-2027",
      "climate-grain-direction-and-baseline"
     ],
     "links": [
      {
       "to": "food-price-index",
       "label": "국제 식량 가격"
      }
     ]
    }
   ]
  }
 ],
 "datasets": [
  {
   "id": "strategic-stocks-quarterly",
   "kind": "series",
   "title": "국가별 전략 재고 추정: 4Q25~2Q26",
   "section": "6.2",
   "figure": "그림 6-2",
   "unit": "백만 배럴",
   "published": "2026-08-12",
   "basis": "EIA가 2026년 8월 12일 공개한 Estimated Strategic Oil Inventories의 고정 관측이다. 2Q26은 2026년 6월 또는 최신 가용 관측을 사용했다. 선정 국가·권역 자료이며 세계 전수 집계와 다르다.",
   "note": "국가별로 원출처, 추정 범위, 정부·민간 범위, 접근권이 달라 같은 시점·같은 기준의 순위로 비교할 수 없다. 일일 반출능력, 원유·제품 구성, 저장 위치, 재고일수의 분모는 이 그림에 없다.",
   "columns": [
    "국가·권역",
    "4Q25",
    "1Q26",
    "2Q26",
    "구분"
   ],
   "rows": [
    [
     "중국",
     1397,
     1541,
     1492,
     ""
    ],
    [
     "미국",
     413,
     413,
     321,
     ""
    ],
    [
     "일본",
     263,
     263,
     187,
     ""
    ],
    [
     "기타 OECD 유럽",
     134,
     132,
     130,
     "권역"
    ],
    [
     "이란",
     71,
     74,
     88,
     ""
    ],
    [
     "사우디아라비아",
     82,
     88,
     74,
     ""
    ],
    [
     "한국",
     79,
     78,
     69,
     ""
    ],
    [
     "UAE",
     34,
     41,
     35,
     ""
    ],
    [
     "프랑스",
     33,
     33,
     33,
     ""
    ],
    [
     "인도",
     21,
     21,
     21,
     ""
    ],
    [
     "스페인",
     12,
     12,
     12,
     ""
    ]
   ],
   "numeric_columns": [
    1,
    2,
    3
   ],
   "series_axis": "columns",
   "sources": [
    {
     "title": "EIA Table 1: 국가별 전략 재고 추정의 출처·범위",
     "url": "https://www.eia.gov/outlooks/steo/report/energysecurity/article.php"
    }
   ],
   "labels": [
    [
     "1,397",
     "1,541",
     "1,492"
    ],
    [
     "413",
     "413",
     "321"
    ],
    [
     "263",
     "263",
     "187"
    ],
    [
     "134",
     "132",
     "130"
    ],
    [
     "71",
     "74",
     "88"
    ],
    [
     "82",
     "88",
     "74"
    ],
    [
     "79",
     "78",
     "69"
    ],
    [
     "34",
     "41",
     "35"
    ],
    [
     "33",
     "33",
     "33"
    ],
    [
     "21",
     "21",
     "21"
    ],
    [
     "12",
     "12",
     "12"
    ]
   ]
  },
  {
   "id": "strategic-stocks-comparison-conditions",
   "kind": "table",
   "title": "국가별 비교 시 구분할 항목",
   "section": "6.2",
   "published": "2026-08-12",
   "basis": "",
   "note": "소유권, 원유·제품 구분, 저장 위치, 반출능력이 달라 보유량 순위와 대응력 순위는 같지 않다.",
   "columns": [
    "비교 기준",
    "구분할 항목"
   ],
   "rows": [
    [
     "EIA 추정표",
     "2026년 8월 12일 공개 자료다. 여러 기관과 관측을 조합한 선정 국가·권역 자료다."
    ],
    [
     "비상 대응력",
     "정부·민간 구분, 접근권, 원유·제품 구성, 관측시점"
    ],
    [
     "공식 통계 보완",
     "각국 공식 자료는 시점·범위가 달라 EIA 표와 한 총계로 합산할 수 없다."
    ],
    [
     "보유일수의 분모",
     "순수입이 작은 산유국의 긴 일수가 더 큰 물리적 완충량을 보장하지 않는다."
    ]
   ],
   "sources": [
    {
     "title": "EIA Table 1: 국가별 전략 재고 추정의 출처·범위",
     "url": "https://www.eia.gov/outlooks/steo/report/energysecurity/article.php"
    }
   ],
   "numeric_columns": []
  },
  {
   "id": "knoc-bases-by-type",
   "kind": "stacked",
   "title": "한국 석유공사 비축기지 구성",
   "section": "6.3",
   "unit": "개",
   "as_of": "2026-08-31",
   "basis": "석유공사 공개 자료를 교재 6.3절이 2026년 8월 31일 기준으로 적은 값이다.",
   "note": "한국 정부 비축유 패널은 보유유 100백만 배럴과 시설능력 146백만 배럴을 2025년 말 값으로 적어 이 그림과 기준일 표기가 다르다. 9개 기지의 시설능력은 146백만 배럴이며 빈 공간도 포함한 저장능력이다.",
   "columns": [
    "기지 종류",
    "기지 수"
   ],
   "rows": [
    [
     "원유",
     4
    ],
    [
     "제품",
     4
    ],
    [
     "LPG",
     1
    ]
   ],
   "numeric_columns": [
    1
   ],
   "total": {
    "label": "기지",
    "value": 9,
    "text": "9개"
   },
   "labels": [
    [
     "4개"
    ],
    [
     "4개"
    ],
    [
     "1개"
    ]
   ]
  },
  {
   "id": "india-spr-capacity-by-site",
   "kind": "stacked",
   "title": "인도 기존 SPR 저장능력",
   "section": "6.3",
   "unit": "백만 톤",
   "basis": "석유천연가스부 공개 사업 현황이다.",
   "note": "시설능력이며 재고량은 이 그림에 없다. 단위가 톤이어서 유종 밀도 없이는 배럴 수치와 합산하거나 환산할 수 없다.",
   "columns": [
    "저장지",
    "저장능력"
   ],
   "rows": [
    [
     "Visakhapatnam",
     1.33
    ],
    [
     "Mangalore",
     1.5
    ],
    [
     "Padur",
     2.5
    ]
   ],
   "numeric_columns": [
    1
   ],
   "total": {
    "label": "인도 기존 SPR 저장능력",
    "value": 5.33,
    "text": "5.33백만 톤"
   },
   "labels": [
    [
     "1.33"
    ],
    [
     "1.50"
    ],
    [
     "2.50"
    ]
   ]
  },
  {
   "id": "official-reserve-records",
   "kind": "table",
   "title": "각국 공식 비축 자료와 시설능력",
   "section": "6.3",
   "as_of": "2026-10-30(미국 SPR 잔고), 2026-08-31(한국 석유공사, 교재 6.3절 표기)",
   "basis": "각 행은 기준일과 집계 범위가 다른 별도 자료다.",
   "note": "한국 석유공사 두 행의 기준일은 교재 6.3절 표기이며, 한국 정부 비축유 패널은 같은 보유유·시설능력을 2025년 말 값으로 적는다. 한국 석유공사 보유유와 EIA 추정표의 한국 수치는 기준일·범위가 다르다.",
   "columns": [
    "국가·항목",
    "공개 값",
    "관측 기준",
    "수치의 범위"
   ],
   "rows": [
    [
     "미국 SPR 잔고",
     "282.184백만 배럴",
     "2026년 10월 30일로 끝나는 주·EIA 11월 4일 공표",
     "상업재고를 제외한 전략 원유 재고다."
    ],
    [
     "미국 SPR 저장지",
     "Texas·Louisiana의 4개 저장지",
     "DOE 공식 시설 설명",
     "Bryan Mound·Big Hill·West Hackberry·Bayou Choctaw"
    ],
    [
     "한국 석유공사 보유유",
     "100백만 배럴",
     "2026년 8월 31일·공동비축 물량 제외",
     "해당 공사의 공개 범위다."
    ],
    [
     "한국 석유공사 시설능력",
     "146백만 배럴·9개 기지",
     "2026년 8월 31일",
     "원유 4개, 제품 4개, LPG 1개 기지다. 빈 공간도 포함한 저장능력이다."
    ],
    [
     "일본 비축 체계",
     "국가·민간·산유국 공동비축",
     "자원에너지청 제도 설명",
     "전체 비축에는 국가비축 외에 민간비축과 산유국 공동비축이 포함된다."
    ],
    [
     "인도 기존 SPR 저장능력",
     "5.33백만 톤",
     "석유천연가스부 공개 사업 현황",
     "Visakhapatnam 1.33, Mangalore 1.50, Padur 2.50백만 톤의 시설능력이다."
    ]
   ],
   "numeric_columns": []
  },
  {
   "id": "chokepoint-oil-transit-4q25-2q26",
   "kind": "grouped",
   "title": "관측 통과량: 4Q25와 2Q26",
   "section": "5.3",
   "figure": "그림 5-2",
   "unit": "백만 b/d",
   "published": "2026-08-12",
   "basis": "EIA Global Energy Security Data의 2026년 8월 12일 공표 자료다. 해당 자료 Table 2의 원유·석유계 액체 통과량이다.",
   "note": "LNG를 포함하지 않은 과거 관측치다. 경로가 겹쳐 통행로별 통과량은 합산할 수 없고 항로의 기술적 최대능력과도 다르다.",
   "columns": [
    "통행로",
    "4Q25",
    "2Q26"
   ],
   "rows": [
    [
     "말라카",
     24.9,
     16.6
    ],
    [
     "호르무즈",
     21.6,
     4.9
    ],
    [
     "수에즈·SUMED",
     5.9,
     5.8
    ],
    [
     "바브엘만데브",
     5.4,
     8.1
    ],
    [
     "덴마크 해협",
     5.0,
     4.7
    ],
    [
     "튀르키예 해협",
     3.7,
     4.1
    ],
    [
     "파나마",
     2.8,
     3.2
    ],
    [
     "희망봉",
     9.9,
     9.4
    ]
   ],
   "numeric_columns": [
    1,
    2
   ],
   "row_notes": {
    "희망봉": "아프리카 남단의 우회 경로다."
   },
   "sources": [
    {
     "title": "EIA: 물동량·비축 추정 원표",
     "url": "https://www.eia.gov/outlooks/steo/report/energysecurity/article.php"
    }
   ],
   "labels": [
    [
     "24.9",
     "16.6"
    ],
    [
     "21.6",
     "4.9"
    ],
    [
     "5.9",
     "5.8"
    ],
    [
     "5.4",
     "8.1"
    ],
    [
     "5.0",
     "4.7"
    ],
    [
     "3.7",
     "4.1"
    ],
    [
     "2.8",
     "3.2"
    ],
    [
     "9.9",
     "9.4"
    ]
   ]
  },
  {
   "id": "baker-hughes-us-rigs-2026-11-06",
   "kind": "tile",
   "title": "미국 리그·주간",
   "section": "2.10",
   "unit": "기",
   "as_of": "2026-11-06",
   "basis": "Baker Hughes 주간 집계의 2026년 11월 6일 관측이다.",
   "columns": [
    "집계 구분",
    "가동 리그"
   ],
   "rows": [
    [
     "미국",
     604
    ]
   ],
   "numeric_columns": [
    1
   ],
   "sources": [
    {
     "title": "집계 기준·최근 집계: Baker Hughes Rig Count",
     "url": "https://bakerhughesrigcount.gcs-web.com/"
    }
   ],
   "labels": [
    [
     "604기"
    ]
   ]
  },
  {
   "id": "baker-hughes-canada-rigs-2026-11-06",
   "kind": "tile",
   "title": "캐나다 리그·주간",
   "section": "2.10",
   "unit": "기",
   "as_of": "2026-11-06",
   "basis": "Baker Hughes 주간 집계의 2026년 11월 6일 관측이다.",
   "columns": [
    "집계 구분",
    "가동 리그"
   ],
   "rows": [
    [
     "캐나다",
     223
    ]
   ],
   "numeric_columns": [
    1
   ],
   "sources": [
    {
     "title": "집계 기준·최근 집계: Baker Hughes Rig Count",
     "url": "https://bakerhughesrigcount.gcs-web.com/"
    }
   ],
   "labels": [
    [
     "223기"
    ]
   ]
  },
  {
   "id": "baker-hughes-international-rigs-2026-10",
   "kind": "tile",
   "title": "International 리그·월간(북미 제외)",
   "section": "2.10",
   "unit": "기",
   "as_of": "2026-10",
   "basis": "Baker Hughes 월간 집계의 2026년 10월 관측이며 북미를 제외한다.",
   "note": "Baker Hughes 국제 집계에는 러시아·카스피해 권역·이란·중국 육상 등 일부 제외 범위가 있다.",
   "columns": [
    "집계 구분",
    "가동 리그"
   ],
   "rows": [
    [
     "International",
     1111
    ]
   ],
   "numeric_columns": [
    1
   ],
   "sources": [
    {
     "title": "집계 기준·최근 집계: Baker Hughes Rig Count",
     "url": "https://bakerhughesrigcount.gcs-web.com/"
    }
   ],
   "labels": [
    [
     "1,111기"
    ]
   ]
  },
  {
   "id": "opec-active-rigs-by-country-2024",
   "kind": "bars",
   "title": "국가별 가동 리그 수·2024년 말",
   "section": "2.10",
   "unit": "기",
   "as_of": "2024년 말",
   "basis": "OPEC ASB 2025, Table 3.2의 2024년 말 수치다.",
   "note": "기준 시점과 제외 범위가 달라 Baker Hughes 집계와 증감을 직접 비교할 수 없다. OPEC 표에는 중국 육상·러시아·기타 유라시아에 제외 범위가 있다.",
   "columns": [
    "국가",
    "가동 리그"
   ],
   "rows": [
    [
     "미국",
     589
    ],
    [
     "캐나다",
     162
    ],
    [
     "이란",
     117
    ],
    [
     "쿠웨이트",
     80
    ],
    [
     "인도",
     77
    ],
    [
     "UAE",
     73
    ],
    [
     "사우디아라비아",
     70
    ],
    [
     "이라크",
     62
    ],
    [
     "오만",
     50
    ],
    [
     "아르헨티나",
     45
    ],
    [
     "나이지리아",
     31
    ],
    [
     "브라질",
     18
    ]
   ],
   "numeric_columns": [
    1
   ],
   "sources": [
    {
     "title": "OPEC ASB 2025: Tables 3.2·4.1·4.2",
     "url": "https://www.opec.org/assets/assetdb/asb-2025.pdf"
    }
   ],
   "labels": [
    [
     "589기"
    ],
    [
     "162기"
    ],
    [
     "117기"
    ],
    [
     "80기"
    ],
    [
     "77기"
    ],
    [
     "73기"
    ],
    [
     "70기"
    ],
    [
     "62기"
    ],
    [
     "50기"
    ],
    [
     "45기"
    ],
    [
     "31기"
    ],
    [
     "18기"
    ]
   ]
  },
  {
   "id": "refining-capacity-by-region-2025",
   "kind": "stacked",
   "title": "정유능력의 지역 분포·2025년",
   "section": "7.5",
   "figure": "그림 7-2",
   "unit": "백만 b/d",
   "as_of": "2025",
   "basis": "OPEC ASB 2026에 수록된 2025년 명목능력이다. 원표의 권역·중국·인도 구분을 유지했다.",
   "note": "명목능력이며 실제 투입·생산·수출은 이 그림에 없다.",
   "columns": [
    "권역·국가 집계",
    "2025년 명목능력·백만 b/d"
   ],
   "rows": [
    [
     "OECD 미주",
     21.65
    ],
    [
     "OECD 유럽",
     13.41
    ],
    [
     "OECD 아시아·태평양",
     7.15
    ],
    [
     "중국",
     17.35
    ],
    [
     "인도",
     5.18
    ],
    [
     "기타 아시아",
     7.75
    ],
    [
     "라틴아메리카",
     6.59
    ],
    [
     "중동",
     10.88
    ],
    [
     "아프리카",
     4.17
    ],
    [
     "러시아",
     7.17
    ],
    [
     "기타 유라시아",
     1.56
    ],
    [
     "기타 유럽",
     0.81
    ]
   ],
   "numeric_columns": [
    1
   ],
   "total": {
    "label": "세계 합계",
    "value": 103.66,
    "text": "103.66"
   },
   "sources": [
    {
     "title": "OPEC ASB 2026: World refinery capacity",
     "url": "https://publications.opec.org/asb/chapter/show/154/2833"
    }
   ],
   "labels": [
    [
     "21.65"
    ],
    [
     "13.41"
    ],
    [
     "7.15"
    ],
    [
     "17.35"
    ],
    [
     "5.18"
    ],
    [
     "7.75"
    ],
    [
     "6.59"
    ],
    [
     "10.88"
    ],
    [
     "4.17"
    ],
    [
     "7.17"
    ],
    [
     "1.56"
    ],
    [
     "0.81"
    ]
   ]
  },
  {
   "id": "refining-capacity-selected-countries-2024",
   "kind": "bars",
   "title": "선정 국가 정유능력·2024년",
   "section": "7.5",
   "figure": "그림 7-3",
   "unit": "천 b/d",
   "as_of": "2024",
   "basis": "OPEC ASB 2025, Table 4.2의 2024년 명목 정유능력이다.",
   "note": "선정 국가만 담은 그림이다. 일부 국가는 콘덴세이트 스플리터 등을 포함해 국가별 시설 범위가 같지 않다. 수출 여력은 이 그림에 없다.",
   "columns": [
    "국가",
    "2024년 명목 정유능력·천 b/d"
   ],
   "rows": [
    [
     "미국",
     17918
    ],
    [
     "중국",
     17430
    ],
    [
     "러시아",
     7105
    ],
    [
     "인도",
     4970
    ],
    [
     "한국",
     3518
    ],
    [
     "사우디아라비아",
     3291
    ],
    [
     "일본",
     3115
    ],
    [
     "브라질",
     2289
    ],
    [
     "이란",
     2237
    ],
    [
     "독일",
     2051
    ],
    [
     "싱가포르",
     1453
    ],
    [
     "쿠웨이트",
     1451
    ],
    [
     "UAE",
     1227
    ]
   ],
   "numeric_columns": [
    1
   ],
   "sources": [
    {
     "title": "OPEC ASB 2025: Tables 3.2·4.1·4.2",
     "url": "https://www.opec.org/assets/assetdb/asb-2025.pdf"
    }
   ],
   "labels": [
    [
     "17,918"
    ],
    [
     "17,430"
    ],
    [
     "7,105"
    ],
    [
     "4,970"
    ],
    [
     "3,518"
    ],
    [
     "3,291"
    ],
    [
     "3,115"
    ],
    [
     "2,289"
    ],
    [
     "2,237"
    ],
    [
     "2,051"
    ],
    [
     "1,453"
    ],
    [
     "1,451"
    ],
    [
     "1,227"
    ]
   ]
  },
  {
   "id": "us-operable-distillation-capacity-2026",
   "kind": "tile",
   "title": "미국 가용 상압증류능력(EIA operable, calendar-day)",
   "section": "7.7",
   "unit": "백만 b/cd",
   "as_of": "2026-01-01",
   "basis": "EIA operable capacity의 2026년 1월 1일 값이다. OPEC 명목능력과 정의·연도가 다르다.",
   "note": "시설능력이며 실제 투입 유량은 포함하지 않는다.",
   "columns": [
    "자료",
    "관측·공표 시점",
    "공개 값·백만 b/cd",
    "집계 의미"
   ],
   "rows": [
    [
     "미국 가용 상압증류능력",
     "2026년 1월 1일",
     18.2,
     "EIA operable capacity"
    ]
   ],
   "numeric_columns": [
    2
   ],
   "approx": true,
   "row_notes": {
    "미국 가용 상압증류능력": "교재가 약 18.2백만 b/cd로 적은 어림값이다."
   },
   "labels": [
    [
     "약 18.2백만 b/cd"
    ]
   ]
  },
  {
   "id": "us-process-capacity-2026",
   "kind": "grouped",
   "title": "증류·후속 공정의 규모",
   "section": "7.27",
   "figure": "그림 7-8",
   "unit": "천 b/sd",
   "as_of": "2026-01-01",
   "basis": "EIA Refinery Capacity 2026, Table 6의 2026년 1월 1일 고정 관측이다. 단위는 천 b/stream-day다.",
   "note": "Gulf Coast인 PADD III는 미국 전체의 부분집합이다. 같은 원료가 여러 공정을 거칠 수 있고 장치마다 투입 유분과 재순환 범위가 달라 공정별 능력의 합계는 정유소 생산능력과 다르다. 2027년 전망 행은 싣지 않았다.",
   "columns": [
    "장치·투입 기준",
    "미국 전체·천 b/sd",
    "Gulf Coast·PADD III·천 b/sd"
   ],
   "rows": [
    [
     "상압 원유 증류",
     19157,
     10420
    ],
    [
     "감압 증류",
     8371,
     4610
    ],
    [
     "열분해",
     2830,
     1638
    ],
    [
     "촉매 분해·fresh feed",
     5335,
     2741
    ],
    [
     "촉매 분해·recycled feed",
     39,
     17
    ],
    [
     "수첨분해",
     2343,
     1427
    ],
    [
     "촉매 개질",
     3549,
     1868
    ],
    [
     "수첨처리·탈황",
     17002,
     9160
    ],
    [
     "용제 탈아스팔트",
     372,
     245
    ]
   ],
   "numeric_columns": [
    1,
    2
   ],
   "sources": [
    {
     "title": "EIA Table 6: 공정·권역별 stream-day 능력",
     "url": "https://www.eia.gov/petroleum/refinerycapacity/table6.pdf"
    }
   ],
   "labels": [
    [
     "19,157",
     "10,420"
    ],
    [
     "8,371",
     "4,610"
    ],
    [
     "2,830",
     "1,638"
    ],
    [
     "5,335",
     "2,741"
    ],
    [
     "39",
     "17"
    ],
    [
     "2,343",
     "1,427"
    ],
    [
     "3,549",
     "1,868"
    ],
    [
     "17,002",
     "9,160"
    ],
    [
     "372",
     "245"
    ]
   ]
  },
  {
   "id": "us-padd-distillation-2026",
   "kind": "stacked",
   "title": "미국 권역별 상압증류 능력",
   "section": "7.27",
   "unit": "천 b/sd",
   "as_of": "2026-01-01",
   "basis": "EIA Refinery Capacity 2026, Table 6의 2026년 1월 1일 고정 관측이다. 증류·후속 공정의 규모 그림과 같은 표·같은 기준일·같은 단위다.",
   "note": "2026년 1월 1일 자료에서는 Gulf Coast에 증류와 후속 공정이 함께 집중돼 있다. 시설과 항만이 동시에 멈추면 다른 권역의 여유 증류능력만으로 같은 제품·같은 소비지의 공급을 메우기 어렵다.",
   "columns": [
    "권역",
    "상압증류·천 b/sd"
   ],
   "rows": [
    [
     "PADD I·East Coast",
     983
    ],
    [
     "PADD II·Midwest",
     4515
    ],
    [
     "PADD III·Gulf Coast",
     10420
    ],
    [
     "PADD IV·Rocky Mountain",
     706
    ],
    [
     "PADD V·West Coast",
     2533
    ]
   ],
   "numeric_columns": [
    1
   ],
   "highlight": "PADD III·Gulf Coast",
   "total": {
    "label": "미국 전체",
    "value": 19157,
    "text": "19,157"
   },
   "sources": [
    {
     "title": "EIA Table 6: 공정·권역별 stream-day 능력",
     "url": "https://www.eia.gov/petroleum/refinerycapacity/table6.pdf"
    }
   ],
   "labels": [
    [
     "983"
    ],
    [
     "4,515"
    ],
    [
     "10,420"
    ],
    [
     "706"
    ],
    [
     "2,533"
    ]
   ]
  },
  {
   "id": "us-padd-hydrocracking-2026",
   "kind": "stacked",
   "title": "미국 권역별 수첨분해 능력",
   "section": "7.27",
   "unit": "천 b/sd",
   "as_of": "2026-01-01",
   "basis": "EIA Refinery Capacity 2026, Table 6의 2026년 1월 1일 고정 관측이다. 증류·후속 공정의 규모 그림과 같은 표·같은 기준일·같은 단위다.",
   "note": "",
   "columns": [
    "권역",
    "수첨분해·천 b/sd"
   ],
   "rows": [
    [
     "PADD I·East Coast",
     47
    ],
    [
     "PADD II·Midwest",
     369
    ],
    [
     "PADD III·Gulf Coast",
     1427
    ],
    [
     "PADD IV·Rocky Mountain",
     37
    ],
    [
     "PADD V·West Coast",
     463
    ]
   ],
   "numeric_columns": [
    1
   ],
   "highlight": "PADD III·Gulf Coast",
   "total": {
    "label": "미국 전체",
    "value": 2343,
    "text": "2,343"
   },
   "sources": [
    {
     "title": "EIA Table 6: 공정·권역별 stream-day 능력",
     "url": "https://www.eia.gov/petroleum/refinerycapacity/table6.pdf"
    }
   ],
   "labels": [
    [
     "47"
    ],
    [
     "369"
    ],
    [
     "1,427"
    ],
    [
     "37"
    ],
    [
     "463"
    ]
   ]
  },
  {
   "id": "us-process-capacity-comparison-conditions",
   "kind": "table",
   "title": "EIA Table 6·8 비교 기준",
   "section": "7.27",
   "as_of": "2026-01-01",
   "basis": "",
   "columns": [
    "항목",
    "비교 기준"
   ],
   "rows": [
    [
     "Stream-day와 calendar-day",
     "정지일을 반영하는 방식이 달라 기준이 다른 자료끼리 그대로 나눠 가동률을 계산할 수 없다."
    ],
    [
     "공정별 능력",
     "공정 사이에 중복이 있어 합산할 수 없다. Gulf Coast도 미국 전체에 포함돼 있다."
    ],
    [
     "실제 투입량의 미공개 칸",
     "EIA Table 8의 해당 연도 미공개 칸은 여유능력을 뜻하지 않는다."
    ]
   ],
   "sources": [
    {
     "title": "EIA Table 6: 공정·권역별 stream-day 능력",
     "url": "https://www.eia.gov/petroleum/refinerycapacity/table6.pdf"
    },
    {
     "title": "EIA Table 8: calendar-day 능력·실제 투입량·미공개 구분",
     "url": "https://www.eia.gov/petroleum/refinerycapacity/table8.pdf"
    }
   ],
   "numeric_columns": []
  },
  {
   "id": "ulsan-clx-cdu-capacity-2025",
   "kind": "stacked",
   "title": "울산 CLX 상압증류 장치별 능력",
   "section": "7.30",
   "figure": "그림 7-9",
   "unit": "천 b/d",
   "as_of": "2025",
   "basis": "SK이노베이션 2025년 사업보고서의 SK에너지 생산설비 표다. 단위는 천 b/d이며 표준 처리량이다.",
   "note": "원유 증류 입구의 능력이다.",
   "columns": [
    "장치",
    "표준 처리량·천 b/d"
   ],
   "rows": [
    [
     "No.1 CDU",
     60
    ],
    [
     "No.2 CDU",
     110
    ],
    [
     "No.3 CDU",
     170
    ],
    [
     "No.4 CDU",
     240
    ],
    [
     "No.5 CDU",
     260
    ]
   ],
   "numeric_columns": [
    1
   ],
   "total": {
    "label": "CDU 합계",
    "value": 840,
    "text": "840"
   },
   "sources": [
    {
     "title": "SK이노베이션·2025 사업보고서",
     "url": "https://www.valley.town/financials/quote/096770:KR/ir/filings/7305ca6f-4c2b-4248-92a5-298f3b611bd9"
    }
   ],
   "labels": [
    [
     "60"
    ],
    [
     "110"
    ],
    [
     "170"
    ],
    [
     "240"
    ],
    [
     "260"
    ]
   ]
  },
  {
   "id": "ulsan-clx-upgrading-capacity-2025",
   "kind": "bars",
   "title": "울산 CLX 고도화 장치별 능력",
   "section": "7.30",
   "figure": "그림 7-10",
   "unit": "천 b/d",
   "as_of": "2025",
   "basis": "SK이노베이션 2025년 사업보고서의 SK에너지 생산설비 표다. 단위는 천 b/d이며 표준 처리량이다.",
   "note": "증류 뒤 중간 원료를 추가 전환하는 장치다. 울산의 고도화·탈황 장치는 증류한 유분을 다시 처리한다. 각 장치의 처리능력을 전부 더하면 같은 원료를 중복해서 세게 된다.",
   "columns": [
    "장치",
    "표준 처리량·천 b/d"
   ],
   "rows": [
    [
     "HOU",
     45
    ],
    [
     "No.1 RFCC",
     68
    ],
    [
     "No.2 RFCC",
     94.5
    ]
   ],
   "numeric_columns": [
    1
   ],
   "sources": [
    {
     "title": "SK이노베이션·2025 사업보고서",
     "url": "https://www.valley.town/financials/quote/096770:KR/ir/filings/7305ca6f-4c2b-4248-92a5-298f3b611bd9"
    }
   ],
   "labels": [
    [
     "45"
    ],
    [
     "68"
    ],
    [
     "94.5"
    ]
   ]
  },
  {
   "id": "ulsan-clx-desulfurization-capacity-2025",
   "kind": "bars",
   "title": "울산 CLX 탈황 장치별 능력",
   "section": "7.30",
   "figure": "그림 7-11",
   "unit": "천 b/d",
   "as_of": "2025",
   "basis": "SK이노베이션 2025년 사업보고서의 SK에너지 생산설비 표다. 단위는 천 b/d이며 표준 처리량이다.",
   "note": "부속 공정의 처리능력이다.",
   "columns": [
    "장치",
    "표준 처리량·천 b/d"
   ],
   "rows": [
    [
     "No.1 VRDS",
     40
    ],
    [
     "No.2 VRDS",
     40
    ],
    [
     "No.1 RHDS",
     72
    ],
    [
     "No.2 RHDS",
     88
    ]
   ],
   "numeric_columns": [
    1
   ],
   "sources": [
    {
     "title": "SK이노베이션·2025 사업보고서",
     "url": "https://www.valley.town/financials/quote/096770:KR/ir/filings/7305ca6f-4c2b-4248-92a5-298f3b611bd9"
    }
   ],
   "labels": [
    [
     "40"
    ],
    [
     "40"
    ],
    [
     "72"
    ],
    [
     "88"
    ]
   ]
  },
  {
   "id": "marathon-refinery-crude-capacity-2025",
   "kind": "stacked",
   "title": "Marathon 지역별·개별 공장 원유 정제능력",
   "section": "7.31",
   "figure": "그림 7-12",
   "unit": "천 b/cd",
   "as_of": "2025-12-31",
   "basis": "회계 2025년 10-K Item 2의 2025년 12월 31일 시설 스냅샷이다. 단위는 천 barrels per calendar day다.",
   "note": "실가동량·제품 생산량·매각 후 현재 자산 구성은 표시하지 않았다. 지역 구분은 회사 보고서 기준이다. 2025년 말 공시 기준 Galveston Bay와 Garyville은 원유 정제능력의 약 41.8%를 차지한다. 이곳의 차질을 다른 지역 공장이 메우려면 원료·제품 규격과 배관·항만이 맞아야 한다.",
   "columns": [
    "정유소",
    "회사 보고서상 권역",
    "원유 정제능력·천 b/cd"
   ],
   "rows": [
    [
     "Galveston Bay·Texas City, TX",
     "Gulf Coast",
     631
    ],
    [
     "Garyville·LA",
     "Gulf Coast",
     617
    ],
    [
     "Catlettsburg·KY",
     "Mid-Continent",
     307
    ],
    [
     "Robinson·IL",
     "Mid-Continent",
     253
    ],
    [
     "Detroit·MI",
     "Mid-Continent",
     146
    ],
    [
     "El Paso·TX",
     "Mid-Continent",
     133
    ],
    [
     "St. Paul Park·MN",
     "Mid-Continent",
     105
    ],
    [
     "Canton·OH",
     "Mid-Continent",
     100
    ],
    [
     "Mandan·ND",
     "Mid-Continent",
     72
    ],
    [
     "Salt Lake City·UT",
     "Mid-Continent",
     70
    ],
    [
     "Los Angeles·CA",
     "West Coast",
     365
    ],
    [
     "Anacortes·WA",
     "West Coast",
     119
    ],
    [
     "Kenai·AK",
     "West Coast",
     68
    ]
   ],
   "numeric_columns": [
    2
   ],
   "group_column": 1,
   "total": {
    "label": "합계",
    "value": 2986,
    "text": "2,986"
   },
   "sources": [
    {
     "title": "Marathon Petroleum·FY2025 10-K",
     "url": "https://www.sec.gov/Archives/edgar/data/1510295/000151029526000009/mpc-20251231.htm"
    }
   ],
   "labels": [
    [
     "631"
    ],
    [
     "617"
    ],
    [
     "307"
    ],
    [
     "253"
    ],
    [
     "146"
    ],
    [
     "133"
    ],
    [
     "105"
    ],
    [
     "100"
    ],
    [
     "72"
    ],
    [
     "70"
    ],
    [
     "365"
    ],
    [
     "119"
    ],
    [
     "68"
    ]
   ]
  },
  {
   "id": "scorpio-fleet-by-class",
   "kind": "bars",
   "title": "Scorpio의 선종 구성",
   "section": "5.15",
   "figure": "그림 5-9",
   "unit": "척",
   "as_of": "2026-03-19",
   "basis": "기준일은 2026년 3월 19일이다. 회계 2025년 연차보고서 제출 직전 선대 기준이다.",
   "note": "2026년 11월 현재 선대와 다르며 발주 잔량은 포함하지 않았다.",
   "columns": [
    "선종",
    "선박 수"
   ],
   "rows": [
    [
     "LR2",
     34
    ],
    [
     "MR",
     42
    ],
    [
     "Handymax",
     14
    ]
   ],
   "numeric_columns": [
    1
   ],
   "sources": [
    {
     "title": "Scorpio Tankers·FY2025 20-F",
     "url": "https://www.sec.gov/Archives/edgar/data/1483934/000148393426000021/stng-20251231.htm"
    }
   ],
   "labels": [
    [
     "34척"
    ],
    [
     "42척"
    ],
    [
     "14척"
    ]
   ]
  },
  {
   "id": "seaways-operating-fleet",
   "kind": "stacked",
   "title": "International Seaways의 운영 선대",
   "section": "5.15",
   "figure": "그림 5-10",
   "unit": "척",
   "as_of": "2025-12-31",
   "basis": "기준일은 2025년 12월 31일이다. 회계 2025년 연차보고서 Item 1·1A 기준이다.",
   "note": "신조 발주 4척은 그림에서 제외했다. 직접 매입·용선 도입·금융성 매각 후 재용선은 초기 투자와 고정 지급 의무가 다르다.",
   "columns": [
    "운영 방식",
    "선박 수"
   ],
   "rows": [
    [
     "보유",
     62
    ],
    [
     "용선 도입",
     8
    ]
   ],
   "numeric_columns": [
    1
   ],
   "total": {
    "label": "운영 선대",
    "value": 70,
    "text": "70척"
   },
   "excluded": [
    {
     "label": "신조 발주",
     "value": 4,
     "text": "4척",
     "why": "그림에서 제외했다."
    }
   ],
   "row_notes": {
    "용선 도입": "금융성 매각 후 재용선이 포함돼 있어 전부를 단기 임차로 볼 수 없다."
   },
   "sources": [
    {
     "title": "International Seaways·FY2025 10-K",
     "url": "https://www.sec.gov/Archives/edgar/data/1679049/000110465926020113/insw-20251231x10k.htm"
    }
   ],
   "labels": [
    [
     "62척"
    ],
    [
     "8척"
    ]
   ]
  },
  {
   "id": "tanker-owner-profiles",
   "kind": "table",
   "title": "선사 공시: 선종·소유·계약",
   "section": "5.15",
   "as_of": "회계 2025년 연차보고서(International Seaways 선대는 2025-12-31)",
   "basis": "Frontline·Scorpio의 회계 2025년 연차보고서 Item 4, International Seaways의 회계 2025년 연차보고서 Item 1·1A 기준이다. 숫자는 각 공시 기준일의 스냅샷이다.",
   "note": "DWT는 화물·연료·비품 등을 포함한 중량능력이며 실제 원유 적재량과 다르다. 풀 운영과 선박 기술 관리는 별도 기능이다. 제품선은 정유소 제품 출하와 소비지 수요를, 원유선은 원유 선적지와 도착지 사이의 거래를 주로 연결한다.",
   "columns": [
    "기업",
    "선종·노선의 역할",
    "계약·운영 방식과 수익 확인"
   ],
   "rows": [
    [
     "Frontline",
     "VLCC는 장거리 원유 항로에, Suezmax는 대서양·중동·아시아 항로에 투입한다. LR2/Aframax는 제품과 원유를 모두 실을 수 있다.",
     "일부 정기용선으로 고정수입을 확보하고 나머지는 스팟으로 운용한다. 교차 운항으로 공선 구간을 줄인다. 보고부문은 하나다."
    ],
    [
     "Scorpio Tankers",
     "LR2·MR·Handymax 제품선 중심이다.",
     "풀·용선·화물 운용으로 제품 수송에 노출된다. 수익 확인 항목은 화물 전환, 항로, 매각 후 선대 변화다."
    ],
    [
     "International Seaways",
     "원유선과 제품선의 두 보고부문이다. 2025년 12월 31일 운영 선대는 70척이다.",
     "보유 62척·용선 8척이다. 스팟 참여는 상업 풀을 주요 수단으로 활용한다. 수익 확인 항목은 풀 매출 배분, 용선료, 금융성 리스, 드라이도크, off-hire다."
    ]
   ],
   "sources": [
    {
     "title": "Frontline·FY2025 20-F",
     "url": "https://www.sec.gov/Archives/edgar/data/913290/000162828026021774/fro-20251231.htm"
    },
    {
     "title": "Scorpio Tankers·FY2025 20-F",
     "url": "https://www.sec.gov/Archives/edgar/data/1483934/000148393426000021/stng-20251231.htm"
    },
    {
     "title": "International Seaways·FY2025 10-K",
     "url": "https://www.sec.gov/Archives/edgar/data/1679049/000110465926020113/insw-20251231x10k.htm"
    }
   ],
   "numeric_columns": []
  },
  {
   "id": "kinder-morgan-pipeline-miles",
   "kind": "tile",
   "title": "Kinder Morgan의 배관 길이(연차보고서 기재)",
   "section": "4.8",
   "unit": "마일",
   "as_of": "2025-12-31",
   "basis": "2025년 12월 31일 기준이다. 회계 2025년 연차보고서 Item 1·1A에 기재된 값이다.",
   "note": "가스관·제품관·터미널·CO₂ 사업을 하는 회사의 전체 배관 길이이며 원유관 길이와 다르다.",
   "columns": [
    "항목",
    "값"
   ],
   "rows": [
    [
     "Kinder Morgan 배관",
     78000
    ]
   ],
   "numeric_columns": [
    1
   ],
   "approx": true,
   "sources": [
    {
     "title": "Kinder Morgan·FY2025 10-K",
     "url": "https://www.sec.gov/Archives/edgar/data/1506307/000150630726000011/kmi-20251231.htm"
    }
   ],
   "labels": [
    [
     "약 78,000마일"
    ]
   ]
  },
  {
   "id": "kinder-morgan-terminals",
   "kind": "tile",
   "title": "Kinder Morgan의 터미널 수(연차보고서 기재)",
   "section": "4.8",
   "unit": "개",
   "as_of": "2025-12-31",
   "basis": "2025년 12월 31일 기준이다. 회계 2025년 연차보고서 Item 1·1A에 기재된 값이다.",
   "note": "가스관·제품관·터미널·CO₂ 사업을 하는 회사 전체의 터미널 수다.",
   "columns": [
    "항목",
    "값"
   ],
   "rows": [
    [
     "Kinder Morgan 터미널",
     136
    ]
   ],
   "numeric_columns": [
    1
   ],
   "sources": [
    {
     "title": "Kinder Morgan·FY2025 10-K",
     "url": "https://www.sec.gov/Archives/edgar/data/1506307/000150630726000011/kmi-20251231.htm"
    }
   ],
   "labels": [
    [
     "136개"
    ]
   ]
  },
  {
   "id": "enbridge-mainline-capacity",
   "kind": "tile",
   "title": "Canadian Mainline 캐나다 구간 운영능력",
   "section": "4.8",
   "unit": "백만 b/d",
   "as_of": "회계 2025년 연차보고서",
   "basis": "Enbridge 회계 2025년 연차보고서 Item 1의 자산·계약 설명이 근거다.",
   "note": "공용 운송망이다.",
   "columns": [
    "자산",
    "운영능력"
   ],
   "rows": [
    [
     "Canadian Mainline(캐나다 구간)",
     3.2
    ]
   ],
   "numeric_columns": [
    1
   ],
   "approx": true,
   "sources": [
    {
     "title": "Enbridge·FY2025 10-K",
     "url": "https://www.sec.gov/Archives/edgar/data/895728/000119312526049810/enb-20251231.htm"
    }
   ],
   "labels": [
    [
     "약 3.2백만 b/d"
    ]
   ]
  },
  {
   "id": "southern-lights-committed-share",
   "kind": "tile",
   "title": "Southern Lights 약정 비중",
   "section": "4.8",
   "unit": "%",
   "as_of": "회계 2025년 연차보고서",
   "basis": "Enbridge 회계 2025년 연차보고서 Item 1의 자산·계약 설명이 근거다. 약정률은 해당 보고서 기준이다.",
   "note": "해당 계약 수준은 2030년 중반까지로 기재됐다.",
   "columns": [
    "자산",
    "약정 비중"
   ],
   "rows": [
    [
     "Southern Lights(희석제 수송)",
     90
    ]
   ],
   "numeric_columns": [
    1
   ],
   "approx": true,
   "sources": [
    {
     "title": "Enbridge·FY2025 10-K",
     "url": "https://www.sec.gov/Archives/edgar/data/895728/000119312526049810/enb-20251231.htm"
    }
   ],
   "labels": [
    [
     "약 90%"
    ]
   ]
  },
  {
   "id": "pipeline-company-assets",
   "kind": "table",
   "title": "배관 회사의 자산과 매출 발생 지점",
   "section": "4.8",
   "as_of": "회계 2025년 연차보고서(Kinder Morgan 배관·터미널 수는 2025-12-31)",
   "basis": "회계 2025년 연차보고서 Item 1·1A 기준이다. 연결·지분법·권익 물량은 각 보고서의 정의를 따른다.",
   "note": "회사 전체 자산 기준이다. 가스 Bcf와 액체 bbl은 단위가 달라 합산할 수 없다.",
   "columns": [
    "기업",
    "실제 사업·자산",
    "매출의 기준",
    "이후 콜에서 비교하는 변화"
   ],
   "rows": [
    [
     "Kinder Morgan",
     "가스관·제품관·터미널·CO₂ 사업이다. 2025년 12월 31일 기준 약 78,000마일의 배관과 136개 터미널을 기재했다.",
     "수송·예약용량·저장·처리 수수료 등",
     "신규 가스관 예약, 기존 계약 갱신·신용위험, 물량 연동·직접 상품 노출"
    ],
    [
     "Enbridge",
     "원유·희석제 배관과 터미널, 가스 수송·도시가스·저장 등",
     "개별 자산마다 공용 운송·장기 약정·규제요금 구조가 다르다.",
     "배관별 물량·요금·계약 만기, 신규 연결 수요"
    ],
    [
     "Enterprise Products Partners",
     "NGL 운송·분리·저장·수출, 원유, 가스 처리, 제품·석유화학 물류",
     "운송량·예약용량·분리 처리·저장·선적 수수료, 일부 상품·처리 노출",
     "Permian 등 공급지에서 Mont Belvieu를 거쳐 수출 터미널로 이어지는 연결 병목"
    ]
   ],
   "row_notes": {
    "Enterprise Products Partners": "Enterprise의 NGL 분리는 가스에서 나온 액체 성분을 나누는 경로다. 정유소의 원유 처리와는 원료·공정이 달라 별도로 배치했다."
   },
   "sources": [
    {
     "title": "Kinder Morgan·FY2025 10-K",
     "url": "https://www.sec.gov/Archives/edgar/data/1506307/000150630726000011/kmi-20251231.htm"
    },
    {
     "title": "Enbridge·FY2025 10-K",
     "url": "https://www.sec.gov/Archives/edgar/data/895728/000119312526049810/enb-20251231.htm"
    },
    {
     "title": "Enterprise Products Partners·FY2025 10-K",
     "url": "https://www.sec.gov/Archives/edgar/data/1061219/000106121926000006/epd-20251231.htm"
    }
   ],
   "numeric_columns": []
  },
  {
   "id": "enbridge-contract-structures",
   "kind": "table",
   "title": "Enbridge 자산별 계약 구조",
   "section": "4.8",
   "as_of": "회계 2025년 연차보고서",
   "basis": "Enbridge 회계 2025년 연차보고서 Item 1의 자산·계약 설명이 근거다. 약정률은 해당 보고서 기준이다.",
   "note": "Express와 Platte는 계약 방식이 달라 물량이 줄었을 때 수입에 미치는 영향도 같지 않다.",
   "columns": [
    "자산 예시",
    "회계 2025년 보고서상 구조",
    "해석"
   ],
   "rows": [
    [
     "Canadian Mainline",
     "공용 운송망이다. 캐나다 구간 운영능력은 약 3.2백만 b/d다.",
     "공용 운송망이어서 전량 take-or-pay로 볼 수 없다. 변수는 물량, 수송 원유 품질, 요금, 연결 구간이다."
    ],
    [
     "Express / Platte",
     "Express는 주로 장기 take-or-pay 계약이다. Platte는 비약정 운송 비중이 있는 구조다.",
     "같은 회사의 원유관도 최소 지급 약정과 실제 이용량 요금에 대한 노출이 다르다."
    ],
    [
     "Southern Lights",
     "희석제 수송이다. 약정 비중은 약 90%이며 해당 계약 수준은 2030년 중반까지로 기재됐다.",
     "중질유 운송에 필요한 희석제 공급망이다."
    ]
   ],
   "sources": [
    {
     "title": "Enbridge·FY2025 10-K",
     "url": "https://www.sec.gov/Archives/edgar/data/895728/000119312526049810/enb-20251231.htm"
    }
   ],
   "numeric_columns": []
  },
  {
   "id": "reliance-o2c-transport-fuel-production",
   "kind": "grouped",
   "title": "Reliance O2C 운송연료의 판매용 생산량",
   "section": "9.8",
   "figure": "그림 9-3",
   "unit": "MMT",
   "as_of": "2026-03-31",
   "basis": "Reliance 회계 2025–2026년 통합연차보고서 O2C 부분의 Production Meant for Sale이다. 단위는 백만 톤·MMT다. 회계 2025–2026년 종료일은 2026년 3월 31일이다.",
   "note": "같은 기간 경유와 휘발유 물량의 방향이 달랐다. 판매용 생산량이며 처리량 대비 수율, 유종별 판매마진, 이익은 이 그림에 없다.",
   "columns": [
    "제품",
    "회계 2024–2025년·MMT",
    "회계 2025–2026년·MMT"
   ],
   "rows": [
    [
     "Gasoil",
     25.7,
     26.8
    ],
    [
     "Gasoline / Alkylate",
     15.7,
     14.9
    ],
    [
     "ATF",
     5.3,
     5.2
    ]
   ],
   "numeric_columns": [
    1,
    2
   ],
   "sources": [
    {
     "title": "Reliance Industries·FY2025–2026 통합연차보고서",
     "url": "https://www.ril.com/ar2025-26/RIL_IAR%202026.pdf"
    }
   ],
   "labels": [
    [
     "25.7",
     "26.8"
    ],
    [
     "15.7",
     "14.9"
    ],
    [
     "5.3",
     "5.2"
    ]
   ]
  },
  {
   "id": "reliance-o2c-polymer-production",
   "kind": "grouped",
   "title": "Reliance O2C 폴리머의 판매용 생산량",
   "section": "9.8",
   "figure": "그림 9-4",
   "unit": "MMT",
   "as_of": "2026-03-31",
   "basis": "Reliance 회계 2025–2026년 통합연차보고서 O2C 부분의 Production Meant for Sale이다. 단위는 백만 톤·MMT다. 회계 2025–2026년 종료일은 2026년 3월 31일이다.",
   "note": "운송연료와 규모 차이가 커 별도 차트로 표시했다. 판매용 생산량이며 마진과 이익은 이 그림에 없다.",
   "columns": [
    "제품",
    "회계 2024–2025년·MMT",
    "회계 2025–2026년·MMT"
   ],
   "rows": [
    [
     "PP",
     3.0,
     3.1
    ],
    [
     "PE",
     2.2,
     2.3
    ],
    [
     "PVC",
     0.8,
     0.8
    ]
   ],
   "numeric_columns": [
    1,
    2
   ],
   "sources": [
    {
     "title": "Reliance Industries·FY2025–2026 통합연차보고서",
     "url": "https://www.ril.com/ar2025-26/RIL_IAR%202026.pdf"
    }
   ],
   "labels": [
    [
     "3.0",
     "3.1"
    ],
    [
     "2.2",
     "2.3"
    ],
    [
     "0.8",
     "0.8"
    ]
   ]
  },
  {
   "id": "kr-refiners-operator-and-listed-parent",
   "kind": "table",
   "title": "국내 정유사의 운영회사와 상장 모회사",
   "section": "7.28",
   "as_of": "2025",
   "basis": "2025년 사업보고서의 사업 내용·원재료·생산설비를 기준으로 정리한 표다. 근거는 S-OIL 2025년 사업보고서 II-3·II-7, SK이노베이션 II, GS II·연결주석, HD현대 II다. 각 수치는 해당 운영·공시 범위의 2025년 값이다.",
   "note": "S-OIL의 669,000 b/d는 CFU를 포함한 공시 표준능력이며 정유시설 명부의 온산 CDU 580,000 b/d와 범위가 다르다. HD현대오일뱅크는 원유 처리와 콘덴세이트를 따로 적은 값이다. 정유소를 운영하는 회사와 주식시장에 상장된 모회사가 항상 같지는 않다. GS·HD현대·SK이노베이션에는 정유 외 사업과 서로 다른 지분 구조가 들어 있다.",
   "columns": [
    "운영사·상장 경로",
    "공시에서 확인한 설비·사업",
    "숫자·손익의 범위",
    "이후 실적과 대조할 항목"
   ],
   "rows": [
    [
     "S-OIL·직접 상장",
     "온산 정유·윤활·석유화학이다. 2025년 정유 표준능력은 669,000 b/d, 윤활은 44,700 b/d다.",
     "정유·윤활·기초화학의 처리능력은 합산해도 원유 증류능력이 되지 않는다.",
     "Shaheen의 기계적 완공·시운전·상업 생산(연차보고서 기재는 계획)"
    ],
    [
     "SK에너지·SK인천석유화학·SK이노베이션 산하",
     "울산·인천 정유와 별도 화학·기유·트레이딩이다. 그룹에는 LNG·전력·배터리도 포함된다.",
     "SK이노베이션 연결 실적에는 정유 외 사업이 들어 있다. 울산 CDU와 후속 공정 능력은 별도 수치다.",
     "SK에너지의 실제 처리량·가동 가능일수·제품 구성, 그룹 내 판매·트레이딩의 범위"
    ],
    [
     "GS칼텍스·GS에너지 경유 GS와 연결",
     "여수 정유·방향족·윤활·올레핀 사업이다.",
     "GS와 GS칼텍스는 서로 다른 법인이다. 운영사 실적과 모회사의 연결·지분법 손익은 범위가 다르다.",
     "정유마진, 올레핀·화학 손익, 원료·제품 내부 연결, 모회사로 가는 배당"
    ],
    [
     "HD현대오일뱅크·HD현대 산하",
     "대산 원유 처리 520,000 b/d, 콘덴세이트 170,000 b/d다. 기유·BTX·폴리머·카본블랙과 연계된다.",
     "원유 처리와 콘덴세이트는 별도 수치다. 정유·화학 합작사업의 전체 설비 능력은 모회사 지분능력과 다르다.",
     "원유·콘덴세이트 조달, HPC·기유 등 제품 스프레드, 정유 부문과 지주회사 손익"
    ]
   ],
   "row_numbers": {
    "S-OIL·직접 상장": [
     {
      "label": "정유 표준능력·CFU 포함",
      "value": 669000,
      "unit": "b/d",
      "text": "669,000 b/d",
      "as_of": "2025년",
      "note": "정유시설 명부의 온산 CDU는 580,000 b/d"
     },
     {
      "label": "윤활",
      "value": 44700,
      "unit": "b/d",
      "text": "44,700 b/d",
      "as_of": "2025년"
     }
    ],
    "HD현대오일뱅크·HD현대 산하": [
     {
      "label": "원유 처리",
      "value": 520000,
      "unit": "b/d",
      "text": "520,000 b/d",
      "as_of": "2025년",
      "note": "콘덴세이트는 별도 표기"
     },
     {
      "label": "콘덴세이트",
      "value": 170000,
      "unit": "b/d",
      "text": "170,000 b/d",
      "as_of": "2025년",
      "note": "원유 처리와 별도 표기"
     }
    ]
   },
   "sources": [
    {
     "title": "S-OIL·2025 사업보고서",
     "url": "https://www.valley.town/financials/quote/010950:KR/ir/filings/29f5310c-e76b-4bcf-aa3b-108d47892127"
    },
    {
     "title": "SK이노베이션·2025 사업보고서",
     "url": "https://www.valley.town/financials/quote/096770:KR/ir/filings/7305ca6f-4c2b-4248-92a5-298f3b611bd9"
    },
    {
     "title": "GS·2025 사업보고서",
     "url": "https://www.valley.town/financials/quote/078930:KR/ir/filings/fb91e758-e53d-4d1f-8ad1-bc5590b6683c"
    },
    {
     "title": "HD현대·2025 사업보고서",
     "url": "https://www.valley.town/financials/quote/267250:KR/ir/filings/bf961854-a788-413e-be3c-9cd300a1ae0a"
    }
   ],
   "numeric_columns": []
  },
  {
   "id": "overseas-refiners-refining-logistics-chemicals",
   "kind": "table",
   "title": "해외 정유사의 정유·물류·화학 결합",
   "section": "7.29",
   "basis": "회계 2025년 연차공시 기준이며, Reliance는 회계 2025–2026년 자료다. 근거는 Valero 회계 2025년 Annual Report·10-K, Marathon Item 1·2, Phillips 66 Item 1, Reliance 회계 2025–2026년 통합연차보고서 O2C 부분이다.",
   "note": "정유사 공시에는 물류·가스·화학 등이 함께 들어 있고 능력 기준(공장 전체·지분, 원유·총원료)이 회사마다 다르다. 전사 이익을 정제마진으로 나누는 방식으로는 이런 차이를 구분하기 어렵다.",
   "columns": [
    "기업",
    "공시상 사업·시설",
    "마진 분석에 반영할 내용",
    "비교할 때의 범위"
   ],
   "rows": [
    [
     "Valero",
     "2025년 말 석유 정유소 15개, 합산 feedstock throughput 약 3.2백만 b/d다. Renewable Diesel·Ethanol은 별도다.",
     "정유 손익과 저탄소 연료·에탄올 손익의 구분, 원유 품질·정비·제품 구성",
     "Feedstock throughput은 다른 회사의 원유 CDU 능력과 정의가 다르다. 연말 이후의 시설 변화는 이 수치에 없다."
    ],
    [
     "Marathon Petroleum",
     "Refining & Marketing과 Midstream이다. MPLX가 연결된 정유·물류망이다.",
     "정유 크랙·처리량, 물류·가스 처리·분리 실적",
     "정유와 미드스트림의 내부 거래·연결 손익은 합산하면 중복된다."
    ],
    [
     "Phillips 66",
     "Midstream·Chemicals·Refining·Marketing and Specialties다. CPChem 지분은 50%다.",
     "정유·NGL·화학·판매가 다른 수익원이다. 2025년 10월 1일 WRB 잔여 지분을 인수했다.",
     "지분·연결 범위 변화는 물리 설비 증설과 다르다."
    ],
    [
     "Reliance Industries",
     "Jamnagar를 중심으로 정유·화학을 묶은 O2C 사업이다.",
     "운송연료 크랙, 원료 조달·국내 판매, 화학마진",
     "O2C EBITDA는 순수 정유 GRM과 다르다. 회계 2025–2026년은 다른 회사의 2025년 달력연도와 기간이 다르다."
    ]
   ],
   "row_notes": {
    "Reliance Industries": "회계 2025–2026년 자료다. 종료일은 2026년 3월 31일이다."
   },
   "row_numbers": {
    "Valero": [
     {
      "label": "석유 정유소",
      "value": 15,
      "unit": "개",
      "text": "15개",
      "as_of": "2025년 말"
     },
     {
      "label": "합산 feedstock throughput",
      "value": 3.2,
      "unit": "백만 b/d",
      "text": "약 3.2백만 b/d",
      "approx": true,
      "as_of": "2025년 말"
     }
    ],
    "Phillips 66": [
     {
      "label": "CPChem 지분",
      "value": 50,
      "unit": "%",
      "text": "50%"
     }
    ]
   },
   "sources": [
    {
     "title": "Valero·FY2025 10-K·연차자료집",
     "url": "https://s23.q4cdn.com/587626645/files/doc_financials/2026/ar/ARS.pdf"
    },
    {
     "title": "Marathon Petroleum·FY2025 10-K",
     "url": "https://www.sec.gov/Archives/edgar/data/1510295/000151029526000009/mpc-20251231.htm"
    },
    {
     "title": "Phillips 66·FY2025 10-K",
     "url": "https://www.sec.gov/Archives/edgar/data/1534701/000153470126000006/psx-20251231.htm"
    },
    {
     "title": "Reliance Industries·FY2025–2026 통합연차보고서",
     "url": "https://www.ril.com/ar2025-26/RIL_IAR%202026.pdf"
    }
   ],
   "numeric_columns": []
  },
  {
   "id": "post-refining-chemicals-base-oil-retail",
   "kind": "table",
   "title": "정유 이후의 화학·기유·소매 사업",
   "section": "9.7",
   "basis": "LyondellBasell은 회계 2025년, Casey’s는 2026년 4월 30일 종료 회계연도, Reliance는 회계 2025–2026년, SK이노베이션은 2025년 사업보고서 기준이다. 근거는 LyondellBasell 10-K Item 1, Casey’s 10-K Item 1·7, Reliance 통합연차보고서 O2C, SK이노베이션 II의 윤활유 사업이다.",
   "note": "연료와 화학제품은 수요·원료·증설 상황이 달라 마진도 다르게 움직인다. Reliance의 회계 2025–2026년 보고서는 두 사업의 마진 방향이 달랐다고 설명했다. LyondellBasell에서는 정유 중단영업을 분리했고, 소매 사례에서는 연료 판매량·단위 마진과 매장 이익을 나눴다.",
   "columns": [
    "운영사·단계",
    "보고서에서 확인한 내용",
    "손익의 연결",
    "분류·집계 주의"
   ],
   "rows": [
    [
     "LyondellBasell·석유화학",
     "올레핀·폴리올레핀, 중간체·파생물, 고기능 폴리머, 기술·촉매",
     "제품과 에탄·나프타 등 원료의 차이, 가동률, 수요, 지역 원가",
     "Houston 정유는 2025년 2월 영업 중단 후 중단영업으로 공시했다. 계속영업 정유사 피어에 넣지 않았다."
    ],
    [
     "Reliance·O2C",
     "정유와 폴리머·중간체·폴리에스터를 함께 운영한다.",
     "회계 2025–2026년 보고서는 운송연료 크랙 강세와 약한 다운스트림 화학마진을 함께 설명했다.",
     "판매용 생산량은 CDU 투입량·명목능력·제품 수율과 다르다."
    ],
    [
     "SK엔무브·윤활기유",
     "울산·두마이·카르타헤나에서 생산하고 정유사·합작사업에서 UCO를 조달한다.",
     "정유·수첨분해와 기유 생산을 원료 거래·합작사업·물류로 연결한다.",
     "기유 능력은 CDW Feed 기준이어서 완제품 윤활유와 합산할 수 없다."
    ],
    [
     "Casey’s·도매·주유·편의점",
     "연료 소매·도매, 조리식품·음료·매장 상품, 자체 물류·저장·유통",
     "판매 갤런·갤런당 연료마진, 매장 매출·마진, 물류·인건비·카드 비용",
     "주유 가격 상승과 소매 이익 증가는 별개다."
    ]
   ],
   "row_notes": {
    "LyondellBasell·석유화학": "회계 2025년 기준이다.",
    "Reliance·O2C": "회계 2025–2026년 기준이다.",
    "SK엔무브·윤활기유": "SK이노베이션 2025년 사업보고서 기준이다.",
    "Casey’s·도매·주유·편의점": "2026년 4월 30일 종료 회계연도 기준이다."
   },
   "sources": [
    {
     "title": "LyondellBasell·FY2025 10-K",
     "url": "https://www.sec.gov/Archives/edgar/data/1489393/000148939326000012/lyb-20251231.htm"
    },
    {
     "title": "Reliance Industries·FY2025–2026 통합연차보고서",
     "url": "https://www.ril.com/ar2025-26/RIL_IAR%202026.pdf"
    },
    {
     "title": "SK이노베이션·2025 사업보고서",
     "url": "https://www.valley.town/financials/quote/096770:KR/ir/filings/7305ca6f-4c2b-4248-92a5-298f3b611bd9"
    },
    {
     "title": "Casey’s General Stores·FY2026 10-K",
     "url": "https://www.sec.gov/Archives/edgar/data/726958/000072695826000046/casy-20260430.htm"
    }
   ],
   "numeric_columns": []
  },
  {
   "id": "annual-reports-a1-drilling-services-subsea",
   "kind": "links",
   "title": "A-1. 시추·유전서비스·해저장비",
   "section": "부록 A",
   "as_of": "보고기간 말 2025-09-30(Helmerich & Payne), 2025-12-31(나머지). 선대 기준일 2026-02-17(Transocean), 2026-02-20(Valaris)",
   "basis": "연간 보고기간과 보고서 안의 별도 자산 기준일을 함께 기록했다.",
   "note": "",
   "columns": [
    "기업·자료",
    "보고기간·별도 기준일",
    "확인한 부분",
    "URL"
   ],
   "rows": [
    [
     "Helmerich & Payne·FY2025 10-K",
     "2025년 9월 30일",
     "Item 1: KCA Deutag 인수, 육상·해양 플랫폼 사업·계약",
     "https://www.sec.gov/Archives/edgar/data/46765/000004676525000071/hp-20250930.htm"
    ],
    [
     "Patterson-UTI·FY2025 10-K",
     "2025년 12월 31일",
     "Item 1: 시추·완결·제품 부문, 파쇄·방향제어",
     "https://www.sec.gov/Archives/edgar/data/889900/000088990026000013/pten-20251231.htm"
    ],
    [
     "Transocean·FY2025 10-K",
     "보고기간 2025년 12월 31일 / 선대 2026년 2월 17일",
     "Item 1·1A: 리그 구성·데이레이트·휴지·재가동·계약 위험",
     "https://www.sec.gov/Archives/edgar/data/1451505/000145150526000018/rig-20251231x10k.htm"
    ],
    [
     "Valaris·FY2025 10-K",
     "보고기간 2025년 12월 31일 / 선대 2026년 2월 20일",
     "Item 1: 드릴십·반잠수식·잭업·ARO 합작사업 범위",
     "https://www.sec.gov/Archives/edgar/data/314808/000031480826000029/val-20251231.htm"
    ],
    [
     "SLB·FY2025 10-K",
     "2025년 12월 31일",
     "Item 1: Digital 등 사업부·생산시스템·OneSubsea",
     "https://www.sec.gov/Archives/edgar/data/87347/000119312526021017/slb-20251231.htm"
    ],
    [
     "Halliburton·FY2025 10-K",
     "2025년 12월 31일",
     "Item 1: C&P·D&E, 파쇄·완결·평가·인공채유",
     "https://www.sec.gov/Archives/edgar/data/45012/000004501226000015/hal-20251231.htm"
    ],
    [
     "Baker Hughes·FY2025 10-K",
     "2025년 12월 31일",
     "Item 1: OFSE·IET, LNG·압축기·서비스",
     "https://www.sec.gov/Archives/edgar/data/1701605/000170160526000007/bkr-20251231.htm"
    ],
    [
     "NOV·FY2025 10-K",
     "2025년 12월 31일",
     "Item 1: Energy Equipment·Energy Products and Services",
     "https://www.sec.gov/Archives/edgar/data/1021860/000119312526048350/nov-20251231.htm"
    ],
    [
     "TechnipFMC·FY2025 10-K",
     "2025년 12월 31일",
     "Item 1·1A: 해저 통합·Surface·고정가격·시공 위험",
     "https://www.sec.gov/Archives/edgar/data/1681459/000168145926000010/fti-20251231.htm"
    ]
   ],
   "numeric_columns": [],
   "cards": {
    "Helmerich & Payne·FY2025 10-K": "HP",
    "Patterson-UTI·FY2025 10-K": "PTEN",
    "Transocean·FY2025 10-K": "RIG",
    "Valaris·FY2025 10-K": "VAL",
    "SLB·FY2025 10-K": "SLB",
    "Halliburton·FY2025 10-K": "HAL",
    "Baker Hughes·FY2025 10-K": "BKR",
    "NOV·FY2025 10-K": "NOV",
    "TechnipFMC·FY2025 10-K": "FTI"
   }
  },
  {
   "id": "annual-reports-a2-producers-majors-fpso",
   "kind": "links",
   "title": "A-2. 생산자·통합 메이저·FPSO",
   "section": "부록 A",
   "as_of": "보고기간 말 2025-12-31",
   "basis": "연간 보고기간과 보고서 안의 별도 자산 기준일을 함께 기록했다.",
   "note": "",
   "columns": [
    "기업·자료",
    "보고기간",
    "확인한 부분",
    "URL"
   ],
   "rows": [
    [
     "ConocoPhillips·FY2025 10-K",
     "2025년 12월 31일",
     "Item 1: 독립 E&P, 자산·생산·LNG·지분 범위",
     "https://www.sec.gov/Archives/edgar/data/1163165/000116316526000009/cop-20251231.htm"
    ],
    [
     "ExxonMobil·FY2025 10-K",
     "2025년 12월 31일",
     "Principal business·사업부: 생산·에너지·화학·특수제품",
     "https://investor.exxonmobil.com/sec-filings/all-sec-filings/content/0000034088-26-000045/xom-20251231.htm"
    ],
    [
     "Chevron·FY2025 10-K",
     "2025년 12월 31일",
     "Item 1: Upstream·Downstream, Hess 편입·순생산·관계회사",
     "https://www.sec.gov/Archives/edgar/data/93410/000009341026000078/cvx-20251231.htm"
    ],
    [
     "Saudi Aramco·Annual Report 2025",
     "2025년 12월 31일",
     "Results and performance: Upstream·Downstream, MSC·생산·능력 지표 정의",
     "https://www.aramco.com/-/media/publications/corporate-reports/reports-and-presentations/2025/fy/sections/ara-2025-results-english.pdf"
    ],
    [
     "SBM Offshore·Annual Report 2025",
     "2025년 12월 31일",
     "Operations·IFRS/Directional·L&O·Turnkey·매각 후 운영",
     "https://www.sbmoffshore.com/wp-content/uploads/2026/02/SBM-Offshore-Annual-Report-2025.pdf"
    ]
   ],
   "numeric_columns": [],
   "cards": {
    "ConocoPhillips·FY2025 10-K": "COP",
    "ExxonMobil·FY2025 10-K": "XOM",
    "Chevron·FY2025 10-K": "CVX",
    "Saudi Aramco·Annual Report 2025": "2222"
   }
  },
  {
   "id": "annual-reports-a3-pipelines-storage-shipping",
   "kind": "links",
   "title": "A-3. 배관·저장·해운",
   "section": "부록 A",
   "as_of": "보고기간 말 2025-12-31. 선대 기준일 2026-03-19(Scorpio Tankers)",
   "basis": "연간 보고기간과 보고서 안의 별도 자산 기준일을 함께 기록했다.",
   "note": "",
   "columns": [
    "기업·자료",
    "보고기간·별도 기준일",
    "확인한 부분",
    "URL"
   ],
   "rows": [
    [
     "Kinder Morgan·FY2025 10-K",
     "2025년 12월 31일",
     "Item 1·1A: 배관·저장·터미널, 계약·고객 신용·물량 위험",
     "https://www.sec.gov/Archives/edgar/data/1506307/000150630726000011/kmi-20251231.htm"
    ],
    [
     "Enbridge·FY2025 10-K",
     "2025년 12월 31일",
     "Item 1: Mainline·Express-Platte·Southern Lights 계약",
     "https://www.sec.gov/Archives/edgar/data/895728/000119312526049810/enb-20251231.htm"
    ],
    [
     "Enterprise Products Partners·FY2025 10-K",
     "2025년 12월 31일",
     "Item 1: NGL 분리·물류·원유·가스·제품 터미널",
     "https://www.sec.gov/Archives/edgar/data/1061219/000106121926000006/epd-20251231.htm"
    ],
    [
     "Frontline·FY2025 20-F",
     "2025년 12월 31일",
     "Item 4: VLCC·Suezmax·LR2/Aframax, 스팟·정기용선·공선 운항",
     "https://www.sec.gov/Archives/edgar/data/913290/000162828026021774/fro-20251231.htm"
    ],
    [
     "Scorpio Tankers·FY2025 20-F",
     "보고기간 2025년 12월 31일 / 선대 2026년 3월 19일",
     "Item 4: 제품선 구성·보유선대·풀·용선",
     "https://www.sec.gov/Archives/edgar/data/1483934/000148393426000021/stng-20251231.htm"
    ],
    [
     "International Seaways·FY2025 10-K",
     "2025년 12월 31일",
     "Item 1·1A: 소유·용선·발주 구분, 풀·스팟·정비 위험",
     "https://www.sec.gov/Archives/edgar/data/1679049/000110465926020113/insw-20251231x10k.htm"
    ]
   ],
   "numeric_columns": [],
   "cards": {
    "Kinder Morgan·FY2025 10-K": "KMI",
    "Enterprise Products Partners·FY2025 10-K": "EPD",
    "Frontline·FY2025 20-F": "FRO",
    "Scorpio Tankers·FY2025 20-F": "STNG",
    "International Seaways·FY2025 10-K": "INSW"
   }
  },
  {
   "id": "annual-reports-a4-korea-refining-chemicals-base-oil",
   "kind": "links",
   "title": "A-4. 한국 정유·화학·기유",
   "section": "부록 A",
   "as_of": "보고기간 말 2025-12-31",
   "basis": "연간 보고기간과 보고서 안의 별도 자산 기준일을 함께 기록했다.",
   "note": "",
   "columns": [
    "기업·자료",
    "보고기간",
    "확인한 부분",
    "URL"
   ],
   "rows": [
    [
     "S-OIL·2025 사업보고서",
     "2025년 12월 31일",
     "II-3·II-5·II-7: 설비·위험관리·Shaheen 계획",
     "https://www.valley.town/financials/quote/010950:KR/ir/filings/29f5310c-e76b-4bcf-aa3b-108d47892127"
    ],
    [
     "SK이노베이션·2025 사업보고서",
     "2025년 12월 31일",
     "SK에너지·SK인천석유화학·SK엔무브의 운영사·공정·처리량·가동률·기유 CDW Feed·판매",
     "https://www.valley.town/financials/quote/096770:KR/ir/filings/7305ca6f-4c2b-4248-92a5-298f3b611bd9"
    ],
    [
     "GS·2025 사업보고서",
     "2025년 12월 31일",
     "II·연결주석: GS에너지·GS칼텍스의 사업·원재료·설비·지분법·운영사 범위",
     "https://www.valley.town/financials/quote/078930:KR/ir/filings/fb91e758-e53d-4d1f-8ad1-bc5590b6683c"
    ],
    [
     "HD현대·2025 사업보고서",
     "2025년 12월 31일",
     "HD현대오일뱅크의 원유·콘덴세이트·기유·BTX·HPC·원료 조달",
     "https://www.valley.town/financials/quote/267250:KR/ir/filings/bf961854-a788-413e-be3c-9cd300a1ae0a"
    ]
   ],
   "numeric_columns": [],
   "cards": {
    "S-OIL·2025 사업보고서": "010950",
    "SK이노베이션·2025 사업보고서": "096770"
   }
  },
  {
   "id": "annual-reports-a5-overseas-refining-chemicals-retail",
   "kind": "links",
   "title": "A-5. 해외 정유·화학·소매",
   "section": "부록 A",
   "as_of": "보고기간 말 2025-12-31(네 곳), 2026-03-31(Reliance Industries), 2026-04-30(Casey’s General Stores)",
   "basis": "연간 보고기간과 보고서 안의 별도 자산 기준일을 함께 기록했다.",
   "note": "",
   "columns": [
    "기업·자료",
    "보고기간",
    "확인한 부분",
    "URL"
   ],
   "rows": [
    [
     "Valero·FY2025 10-K·연차자료집",
     "2025년 12월 31일",
     "사업·정유시설·총원료 처리능력·Renewable Diesel·Ethanol",
     "https://s23.q4cdn.com/587626645/files/doc_financials/2026/ar/ARS.pdf"
    ],
    [
     "Marathon Petroleum·FY2025 10-K",
     "2025년 12월 31일",
     "Item 1·2: R&M·Midstream·MPLX·정유소별 원유 정제능력",
     "https://www.sec.gov/Archives/edgar/data/1510295/000151029526000009/mpc-20251231.htm"
    ],
    [
     "Phillips 66·FY2025 10-K",
     "2025년 12월 31일",
     "Item 1: 사업부·정유·CPChem·WRB 지분 인수",
     "https://www.sec.gov/Archives/edgar/data/1534701/000153470126000006/psx-20251231.htm"
    ],
    [
     "Reliance Industries·FY2025–2026 통합연차보고서",
     "2026년 3월 31일",
     "O2C 제품별 판매용 생산량·연료와 화학마진 구분",
     "https://www.ril.com/ar2025-26/RIL_IAR%202026.pdf"
    ],
    [
     "LyondellBasell·FY2025 10-K",
     "2025년 12월 31일",
     "Item 1: 화학 부문·원료·Houston 정유 중단영업",
     "https://www.sec.gov/Archives/edgar/data/1489393/000148939326000012/lyb-20251231.htm"
    ],
    [
     "Casey’s General Stores·FY2026 10-K",
     "2026년 4월 30일",
     "Item 1·7: 연료 도소매·매장·물류·판매량·비용",
     "https://www.sec.gov/Archives/edgar/data/726958/000072695826000046/casy-20260430.htm"
    ]
   ],
   "numeric_columns": [],
   "cards": {
    "Valero·FY2025 10-K·연차자료집": "VLO",
    "Marathon Petroleum·FY2025 10-K": "MPC",
    "Phillips 66·FY2025 10-K": "PSX",
    "Reliance Industries·FY2025–2026 통합연차보고서": "RELIANCE",
    "LyondellBasell·FY2025 10-K": "LYB"
   }
  },
  {
   "id": "us-cpi-retail-item-weights-2026-09",
   "kind": "bars",
   "title": "소매 품목별 전체 CPI 비중",
   "section": "10.20",
   "unit": "%",
   "as_of": "2026-09",
   "published": "2026-11-10",
   "basis": "2026년 9월 상대중요도이며 2026년 11월 10일 공표 자료다.",
   "note": "미국 식품·에너지 제외 근원 CPI는 항공요금을 포함하고 나머지 다섯 품목을 직접 제외한다. 근원 바스켓 비중은 78.905%로 재정규화했다.",
   "columns": [
    "소매품목",
    "연결 경로",
    "전체 CPI 비중",
    "미국 식품·에너지 제외 근원 CPI"
   ],
   "rows": [
    [
     "휘발유",
     "정유·유통·세금",
     4.08,
     "직접 제외한다. 운송비를 통한 다른 품목 효과는 별도다."
    ],
    [
     "가정 내 식품",
     "원재료·가공·유통",
     8.162,
     "직접 제외한다."
    ],
    [
     "외식",
     "식재료·임금·임차료",
     5.285,
     "미국에서는 식품에 포함돼 직접 제외한다."
    ],
    [
     "전기요금",
     "발전연료·송배전·규제",
     2.513,
     "직접 제외한다."
    ],
    [
     "도시가스요금",
     "가스 조달·배관·규제",
     0.732,
     "직접 제외한다."
    ],
    [
     "항공요금",
     "항공유·좌석공급·예약수요",
     1.055,
     "포함한다. 같은 +1%의 근원 CPI 효과는 약 +0.01337%p다."
    ]
   ],
   "numeric_columns": [
    2
   ],
   "extra_values": [
    {
     "label": "근원 바스켓 비중",
     "value": 78.905,
     "text": "78.905%",
     "unit": "%",
     "note": "근원 CPI 효과를 다시 계산할 때 쓴 비중이다."
    }
   ],
   "sources": [
    {
     "title": "BLS: 공표 가중치·품목별 가격 변화와 제외 품목",
     "url": "https://www.bls.gov/news.release/cpi.t02.htm"
    }
   ],
   "labels": [
    [
     "4.080%"
    ],
    [
     "8.162%"
    ],
    [
     "5.285%"
    ],
    [
     "2.513%"
    ],
    [
     "0.732%"
    ],
    [
     "1.055%"
    ]
   ],
   "row_tags": {
    "휘발유": "근원 제외",
    "가정 내 식품": "근원 제외",
    "외식": "근원 제외",
    "전기요금": "근원 제외",
    "도시가스요금": "근원 제외",
    "항공요금": "근원 포함"
   }
  },
  {
   "id": "us-cpi-relative-importance-2026-09",
   "kind": "tile",
   "title": "에너지 합계의 전체 CPI 비중",
   "section": "10.11",
   "unit": "%",
   "as_of": "2026-09",
   "published": "2026-11-10",
   "basis": "미국 2026년 9월 상대중요도와 2026년 11월 10일 발표 Table 2를 사용한 고정 계산이다.",
   "note": "휘발유는 에너지 합계에 포함된다. 근원 CPI에서는 근원 바스켓 안의 비중으로 다시 계산한다. 일본의 신선식품 제외 CPI는 에너지를 포함하고, 미국의 식품·에너지 제외 CPI는 에너지를 제외한다.",
   "columns": [
    "항목",
    "전체 CPI 비중"
   ],
   "rows": [
    [
     "에너지 합계",
     7.649
    ]
   ],
   "numeric_columns": [
    1
   ],
   "row_notes": {
    "에너지 합계": "합계 행이다. 근원 CPI의 직접 기여는 0%p다."
   },
   "sources": [
    {
     "title": "BLS·품목별 상대중요도·Table 2",
     "url": "https://www.bls.gov/news.release/cpi.t02.htm"
    }
   ],
   "labels": [
    [
     "7.649%"
    ]
   ]
  },
  {
   "id": "us-cpi-core-basket-share-2026-09",
   "kind": "tile",
   "title": "근원 바스켓 비중",
   "section": "10.11",
   "unit": "%",
   "as_of": "2026-09",
   "published": "2026-11-10",
   "basis": "미국 2026년 9월 상대중요도와 2026년 11월 10일 발표 Table 2를 사용한 고정 계산이다.",
   "note": "근원 CPI에서는 근원 바스켓 안의 비중으로 다시 계산한다. 미국의 식품·에너지 제외 CPI는 에너지를 제외한다.",
   "columns": [
    "항목",
    "전체 CPI 비중"
   ],
   "rows": [
    [
     "근원 바스켓",
     78.905
    ]
   ],
   "numeric_columns": [
    1
   ],
   "row_notes": {
    "근원 바스켓": "합계 행이다. 식품·에너지 제외 품목 전체이며 항공요금이 포함된다."
   },
   "sources": [
    {
     "title": "BLS·품목별 상대중요도·Table 2",
     "url": "https://www.bls.gov/news.release/cpi.t02.htm"
    }
   ],
   "labels": [
    [
     "78.905%"
    ]
   ]
  },
  {
   "id": "us-cpi-latest-month-items-basis",
   "kind": "table",
   "title": "품목별 소비자가격 변화: 품목 구성",
   "section": "10.20",
   "figure": "그림 10-11",
   "note": "원인별 가격 상승분은 이 표에 없다.",
   "columns": [
    "품목",
    "소매가격에 함께 반영되는 것"
   ],
   "rows": [
    [
     "휘발유",
     "정유·원유·유통 등이 함께 반영된다."
    ],
    [
     "가정 내 식품",
     "비료·곡물 외에 가공·유통 등이 들어간다."
    ],
    [
     "항공요금",
     "항공유 외에 수요·좌석공급·예약 구성이 작용한다."
    ]
   ],
   "sources": [
    {
     "title": "BLS: 공표 가중치·품목별 가격 변화와 제외 품목",
     "url": "https://www.bls.gov/news.release/cpi.t02.htm"
    }
   ],
   "numeric_columns": []
  },
  {
   "id": "us-cpi-contribution-10pct-assumption",
   "kind": "grouped",
   "title": "품목가격 +10% 가정의 기여",
   "section": "10.11",
   "unit": "%p",
   "as_of": "2026-09",
   "published": "2026-11-10",
   "basis": "미국 2026년 9월 상대중요도와 2026년 11월 10일 발표 Table 2를 사용한 고정 계산이다. 같은 비교기간에 품목가격이 10% 오른다는 가정이며 다른 품목가격은 고정했다.",
   "note": "휘발유는 에너지 합계에 포함돼 두 행을 더하면 중복된다. 근원 CPI에서는 근원 바스켓 안의 비중으로 다시 계산한다. 항공권 가격에는 연료비뿐 아니라 좌석·노선·수요가 반영된다.",
   "columns": [
    "항목",
    "가격 가정",
    "종합 CPI 기여·근사",
    "근원 CPI 기여·근사"
   ],
   "rows": [
    [
     "휘발유",
     "+10%",
     0.408,
     0
    ],
    [
     "에너지 합계",
     "+10%",
     0.7649,
     0
    ],
    [
     "항공요금",
     "+10%",
     0.1055,
     0.1337
    ]
   ],
   "numeric_columns": [
    2,
    3
   ],
   "row_notes": {
    "휘발유": "에너지 합계에 포함된다. 근원 CPI의 직접 기여는 0%p다. 다른 품목으로의 간접효과는 별도다.",
    "에너지 합계": "합계 행이다. 근원 CPI의 직접 기여는 0%p다.",
    "항공요금": "근원 바스켓 비중 78.905%로 다시 계산했다. 0.1055 ÷ 0.78905 = 0.1337."
   },
   "formula": "기여도 ≈ 항목 비중 × 항목가격 변화율",
   "sources": [
    {
     "title": "BLS·품목별 상대중요도·Table 2",
     "url": "https://www.bls.gov/news.release/cpi.t02.htm"
    }
   ],
   "labels": [
    [
     "+0.4080%p",
     "직접 0%p·다른 품목으로의 간접효과는 별도"
    ],
    [
     "+0.7649%p",
     "직접 0%p"
    ],
    [
     "+0.1055%p",
     "+0.1337%p"
    ]
   ]
  },
  {
   "id": "us-cpi-retail-item-rise-needed-for-0-1pp",
   "kind": "bars",
   "title": "종합 CPI +0.1%p에 필요한 해당 품목 가격 상승",
   "section": "10.20",
   "unit": "%",
   "as_of": "2026-09",
   "published": "2026-11-10",
   "basis": "2026년 9월 상대중요도, 2026년 11월 10일 공표 자료를 사용한 고정 민감도다. 종합 CPI가 0.1%p 오르는 데 필요한 해당 품목의 가격 상승률이며 다른 품목가격은 고정했다.",
   "note": "다른 품목가격은 고정했다. +1%와 +0.1%p는 계산용 가정이다. 근원 바스켓 비중은 78.905%로 재정규화했다.",
   "columns": [
    "소매품목",
    "종합 CPI +0.1%p에 필요한 해당 품목 가격 상승"
   ],
   "rows": [
    [
     "휘발유",
     2.45
    ],
    [
     "가정 내 식품",
     1.23
    ],
    [
     "외식",
     1.89
    ],
    [
     "전기요금",
     3.98
    ],
    [
     "도시가스요금",
     13.66
    ],
    [
     "항공요금",
     9.48
    ]
   ],
   "numeric_columns": [
    1
   ],
   "approx": true,
   "sources": [
    {
     "title": "BLS: 공표 가중치·품목별 가격 변화와 제외 품목",
     "url": "https://www.bls.gov/news.release/cpi.t02.htm"
    }
   ],
   "labels": [
    [
     "약 2.45%"
    ],
    [
     "약 1.23%"
    ],
    [
     "약 1.89%"
    ],
    [
     "약 3.98%"
    ],
    [
     "약 13.66%"
    ],
    [
     "약 9.48%"
    ]
   ],
   "display": "table"
  },
  {
   "id": "us-cpi-retail-item-effect-of-1pct",
   "kind": "bars",
   "title": "해당 소매가격 +1%의 종합 CPI 효과",
   "section": "10.20",
   "unit": "%p",
   "as_of": "2026-09",
   "published": "2026-11-10",
   "basis": "2026년 9월 상대중요도, 2026년 11월 10일 공표 자료를 사용한 고정 민감도다. 해당 소매가격이 1% 오르고 다른 품목가격은 고정한 계산이다.",
   "note": "다른 품목가격은 고정했다. +1%와 +0.1%p는 계산용 가정이다. 근원 바스켓 비중은 78.905%로 재정규화했다.",
   "columns": [
    "소매품목",
    "해당 소매가격 +1%의 종합 CPI 효과"
   ],
   "rows": [
    [
     "휘발유",
     0.0408
    ],
    [
     "가정 내 식품",
     0.08162
    ],
    [
     "외식",
     0.05285
    ],
    [
     "전기요금",
     0.02513
    ],
    [
     "도시가스요금",
     0.00732
    ],
    [
     "항공요금",
     0.01055
    ]
   ],
   "numeric_columns": [
    1
   ],
   "row_notes": {
    "항공요금": "근원 CPI에 포함된다. 같은 +1%의 근원 CPI 효과는 약 +0.01337%p다."
   },
   "extra_values": [
    {
     "label": "항공요금 +1%의 근원 CPI 효과",
     "value": 0.01337,
     "text": "약 +0.01337%p",
     "unit": "%p",
     "approx": true
    },
    {
     "label": "근원 바스켓 비중",
     "value": 78.905,
     "text": "78.905%",
     "unit": "%",
     "note": "근원 CPI 효과를 다시 계산할 때 쓴 비중이다."
    }
   ],
   "sources": [
    {
     "title": "BLS: 공표 가중치·품목별 가격 변화와 제외 품목",
     "url": "https://www.bls.gov/news.release/cpi.t02.htm"
    }
   ],
   "labels": [
    [
     "+0.04080%p"
    ],
    [
     "+0.08162%p"
    ],
    [
     "+0.05285%p"
    ],
    [
     "+0.02513%p"
    ],
    [
     "+0.00732%p"
    ],
    [
     "+0.01055%p"
    ]
   ],
   "display": "table"
  },
  {
   "id": "jp-low-voltage-power-support-unit-price-2026-08",
   "kind": "tile",
   "title": "일본 저압 전력 지원 단가",
   "section": "10.9",
   "unit": "엔/kWh",
   "as_of": "2026-08",
   "basis": "2026년 8월 사용분 저압 전력의 지원 단가다.",
   "note": "대상 품목의 소비자가격에 직접 반영된다. 일본의 신선식품 제외 CPI에는 에너지가 포함된다.",
   "columns": [
    "사례·기준시점",
    "지원 단가"
   ],
   "rows": [
    [
     "일본·2026년 8월 사용분·저압 전력",
     4.5
    ]
   ],
   "numeric_columns": [
    1
   ],
   "row_notes": {
    "일본·2026년 8월 사용분·저압 전력": "정책 단가다."
   },
   "sources": [
    {
     "title": "일본 METI·전기·가스 요금 경감",
     "url": "https://www.meti.go.jp/main/yosan/yosan_fy2026/pdf/pr_yobihi_denki_gas.pdf"
    }
   ],
   "labels": [
    [
     "4.5엔/kWh"
    ]
   ]
  },
  {
   "id": "jp-low-voltage-power-monthly-discount-2026-08",
   "kind": "tile",
   "title": "일본 저압 전력 지원: 월 300kWh 가정의 할인액",
   "section": "10.9",
   "unit": "엔",
   "as_of": "2026-08",
   "basis": "2026년 8월 사용분 지원 단가 4.5엔/kWh에 월 300kWh 사용을 가정한 계산값이다.",
   "note": "계산값이다. 가구 평균 청구액과 다르다.",
   "columns": [
    "사례·기준시점",
    "월 사용량 가정",
    "할인액"
   ],
   "rows": [
    [
     "일본·2026년 8월 사용분·저압 전력",
     "300kWh",
     1350
    ]
   ],
   "numeric_columns": [
    2
   ],
   "row_notes": {
    "일본·2026년 8월 사용분·저압 전력": "4.5엔은 정책 단가, 300kWh는 사용자 가정, 1,350엔은 계산값이다. 가구 평균 청구액과 다르다."
   },
   "assumptions": [
    {
     "label": "월 사용량 가정",
     "value": 300,
     "text": "300kWh",
     "unit": "kWh",
     "nature": "사용자 가정"
    }
   ],
   "sources": [
    {
     "title": "일본 METI·전기·가스 요금 경감",
     "url": "https://www.meti.go.jp/main/yosan/yosan_fy2026/pdf/pr_yobihi_denki_gas.pdf"
    }
   ],
   "labels": [
    [
     "1,350엔"
    ]
   ]
  },
  {
   "id": "jp-power-gas-support-2026",
   "kind": "table",
   "title": "일본 전기·가스 지원",
   "section": "10.9",
   "as_of": "2026-05-26(일반예비비 사용 결정), 2026-08(저압 전력 사용분)",
   "basis": "일본의 2026년 예산이다. 2026년 5월 26일 사용 결정과 7–9월 전기·가스 지원, 2026년 8월 사용분 저압 전력 지원 단가를 적었다.",
   "note": "가격 보조·세율 인하·현금 이전은 CPI 처리와 재정 계정이 다르다. 소매요금 지원이 끝나면 국제가격이 그대로여도 소비자 요금이 올라갈 수 있다. 공기업이 요금 인상을 늦추고 손실을 부담하면 정부 현금지출이 같은 시점에 발생하지 않을 수 있다.",
   "columns": [
    "사례·기준시점",
    "금액·정책",
    "CPI와 연결되는 부분",
    "숫자의 성격"
   ],
   "rows": [
    [
     "일본·2026년 5월 26일 사용 결정·7–9월 전기·가스 지원",
     "일반예비비 5,135억 엔 사용 결정이다.",
     "공급자에게 지급해 소비자 청구단가를 낮추는 재원이다.",
     "공식 예산·사용 결정액이다. 최종 집행액과 다르며 전체 연료유 지원의 누적 비용과도 다르다."
    ],
    [
     "일본·2026년 8월 사용분·저압 전력",
     "지원 단가 4.5엔/kWh다. 월 300kWh 사용을 가정하면 1,350엔 할인이다.",
     "대상 품목의 소비자가격에 직접 반영된다. 일본의 신선식품 제외 CPI에는 에너지가 포함된다.",
     "4.5엔은 정책 단가, 300kWh는 사용자 가정, 1,350엔은 계산값이다. 가구 평균 청구액과 다르다."
    ]
   ],
   "sources": [
    {
     "title": "일본 재무성·2026년도 제1차 추경 설명",
     "url": "https://www.mof.go.jp/public_relations/finance/202607/202607d.html"
    },
    {
     "title": "일본 METI·전기·가스 요금 경감",
     "url": "https://www.meti.go.jp/main/yosan/yosan_fy2026/pdf/pr_yobihi_denki_gas.pdf"
    },
    {
     "title": "일본 통계국·CPI 정의",
     "url": "https://www.stat.go.jp/english/data/cpi/1585.html"
    }
   ],
   "numeric_columns": []
  },
  {
   "id": "us-heating-degree-days-2026-10",
   "kind": "tile",
   "title": "미국 난방도일: 2026년 10월 관측",
   "section": "10.22",
   "unit": "난방도일",
   "as_of": "2026-10",
   "published": "2026-11-10",
   "basis": "EIA가 2026년 11월 10일 발표한 10월 날씨 관측이다.",
   "note": "난방도일은 난방 필요도를 측정하는 지표이며 감소율이 연료수요 감소율과 같지 않다.",
   "columns": [
    "자료",
    "미국 난방도일"
   ],
   "rows": [
    [
     "EIA·2026년 11월 10일·10월 날씨 관측",
     189
    ]
   ],
   "numeric_columns": [
    1
   ],
   "row_notes": {
    "EIA·2026년 11월 10일·10월 날씨 관측": "직전 전망보다 20%, 최근 10년 평균보다 14% 낮았다고 발표했다."
   },
   "sources": [
    {
     "title": "EIA·2026년 11월 STEO: 날씨·난방도일·겨울 기준선",
     "url": "https://www.eia.gov/outlooks/steo/report/total.php"
    }
   ],
   "labels": [
    [
     "189"
    ]
   ]
  },
  {
   "id": "us-winter-heating-degree-days-forecast-2026-27",
   "kind": "tile",
   "title": "미국 2026–2027년 겨울 난방도일 전망: 최근 10년 겨울 평균 대비",
   "section": "10.22",
   "unit": "%",
   "published": "2026-11-10",
   "basis": "EIA가 2026년 11월 10일 발표한 겨울 전망이다. 값은 최근 10년 겨울 평균보다 낮은 폭이다.",
   "note": "이 전망은 따뜻한 겨울을 이미 반영한 기준선이다.",
   "columns": [
    "자료",
    "최근 10년 겨울 평균보다 낮은 폭"
   ],
   "rows": [
    [
     "EIA·2026년 11월 10일·겨울 전망",
     4
    ]
   ],
   "numeric_columns": [
    1
   ],
   "direction": "lower",
   "row_notes": {
    "EIA·2026년 11월 10일·겨울 전망": "2026–2027년 겨울 난방도일의 전망이다."
   },
   "sources": [
    {
     "title": "EIA·2026년 11월 STEO: 날씨·난방도일·겨울 기준선",
     "url": "https://www.eia.gov/outlooks/steo/report/total.php"
    }
   ],
   "labels": [
    [
     "4%"
    ]
   ]
  },
  {
   "id": "us-heating-degree-days-2026-10-vs-prior-forecast",
   "kind": "tile",
   "title": "미국 2026년 10월 난방도일: 직전 전망 대비",
   "section": "10.22",
   "unit": "%",
   "as_of": "2026-10",
   "published": "2026-11-10",
   "basis": "EIA가 2026년 11월 10일 발표한 10월 날씨 관측이다. 값은 직전 전망보다 낮은 폭이다.",
   "note": "",
   "columns": [
    "비교 기준",
    "기준보다 낮은 폭"
   ],
   "rows": [
    [
     "직전 전망",
     20
    ]
   ],
   "numeric_columns": [
    1
   ],
   "direction": "lower",
   "sources": [
    {
     "title": "EIA·2026년 11월 STEO: 날씨·난방도일·겨울 기준선",
     "url": "https://www.eia.gov/outlooks/steo/report/total.php"
    }
   ],
   "labels": [
    [
     "20%"
    ]
   ]
  },
  {
   "id": "us-heating-degree-days-2026-10-vs-10y-average",
   "kind": "tile",
   "title": "미국 2026년 10월 난방도일: 최근 10년 평균 대비",
   "section": "10.22",
   "unit": "%",
   "as_of": "2026-10",
   "published": "2026-11-10",
   "basis": "EIA가 2026년 11월 10일 발표한 10월 날씨 관측이다. 값은 최근 10년 평균보다 낮은 폭이다.",
   "note": "",
   "columns": [
    "비교 기준",
    "기준보다 낮은 폭"
   ],
   "rows": [
    [
     "최근 10년 평균",
     14
    ]
   ],
   "numeric_columns": [
    1
   ],
   "direction": "lower",
   "sources": [
    {
     "title": "EIA·2026년 11월 STEO: 날씨·난방도일·겨울 기준선",
     "url": "https://www.eia.gov/outlooks/steo/report/total.php"
    }
   ],
   "labels": [
    [
     "14%"
    ]
   ]
  },
  {
   "id": "usda-ers-food-price-forecast-2026",
   "kind": "tile",
   "title": "미국 전체 식품의 연평균 가격 전망: 2026년",
   "section": "10.22",
   "unit": "%",
   "published": "2026-10-23",
   "basis": "USDA ERS의 2026년 10월 23일 통계모형 전망이다. 미국 전체 식품의 연평균 가격 변화다.",
   "note": "연평균 전망이라 10월 전월비와 기간이 다르다. 이 전망에는 기존 비용·가격 정보가 들어 있다.",
   "columns": [
    "연도",
    "연평균 가격 변화 전망"
   ],
   "rows": [
    [
     "2026년",
     2.8
    ]
   ],
   "numeric_columns": [
    1
   ],
   "sources": [
    {
     "title": "USDA ERS·식품가격 전망과 방법론",
     "url": "https://www.ers.usda.gov/data-products/food-price-outlook/summary-findings"
    }
   ],
   "labels": [
    [
     "+2.8%"
    ]
   ]
  },
  {
   "id": "usda-ers-food-price-forecast-2027",
   "kind": "tile",
   "title": "미국 전체 식품의 연평균 가격 전망: 2027년",
   "section": "10.22",
   "unit": "%",
   "published": "2026-10-23",
   "basis": "USDA ERS의 2026년 10월 23일 통계모형 전망이다. 미국 전체 식품의 연평균 가격 변화다.",
   "note": "",
   "columns": [
    "연도",
    "연평균 가격 변화 전망"
   ],
   "rows": [
    [
     "2027년",
     1.7
    ]
   ],
   "numeric_columns": [
    1
   ],
   "sources": [
    {
     "title": "USDA ERS·식품가격 전망과 방법론",
     "url": "https://www.ers.usda.gov/data-products/food-price-outlook/summary-findings"
    }
   ],
   "labels": [
    [
     "+1.7%"
    ]
   ]
  },
  {
   "id": "climate-grain-direction-and-baseline",
   "kind": "table",
   "title": "기후·곡물가격의 방향과 기준선",
   "section": "10.22",
   "published": "2026-11-10(EIA), 2026-11-06(FAO), 2026-10-23(USDA ERS)",
   "basis": "2026년 11월 10일 EIA는 따뜻한 겨울을 가정해 난방수요가 줄어드는 경로를 제시했다. 11월 6일 FAO 발표에서는 10월 국제 곡물가격이 하락했다.",
   "note": "2026년 10월 국제 곡물가격 하락과 미국 가정 내 식품의 소매가격 상승은 서로 다른 거래 단계·품목 구성·시간을 반영한다. 같은 달의 두 지수를 나눠 전가율을 구하면 이 차이가 계수에 섞인다.",
   "columns": [
    "자료",
    "관측 또는 전망",
    "해석 기준"
   ],
   "rows": [
    [
     "EIA·2026년 11월 10일·10월 날씨 관측",
     "미국 난방도일은 189다. 직전 전망보다 20%, 최근 10년 평균보다 14% 낮았다고 발표했다.",
     "난방도일 감소율은 연료수요 감소율과 같지 않다. 환산에는 지역·난방연료·가구별 노출과 수요 반응계수가 필요하다."
    ],
    [
     "EIA·2026년 11월 10일·겨울 전망",
     "2026–2027년 겨울 난방도일을 최근 10년 겨울 평균보다 4% 낮게 예상했다.",
     "따뜻한 겨울을 이미 반영한 기준선이다."
    ],
    [
     "USDA ERS·2026년 10월 23일·통계모형 전망",
     "미국 전체 식품의 연평균 가격을 2026년 +2.8%, 2027년 +1.7%로 전망했다.",
     "연평균 전망이라 10월 전월비와 기간이 다르다. 이 전망에는 기존 비용·가격 정보가 들어 있다."
    ]
   ],
   "sources": [
    {
     "title": "EIA·2026년 11월 STEO: 날씨·난방도일·겨울 기준선",
     "url": "https://www.eia.gov/outlooks/steo/report/total.php"
    },
    {
     "title": "FAO·2026년 11월 6일: 10월 식량가격·수급",
     "url": "https://www.fao.org/newsroom/detail/fao-food-price-index-edges-down-in-october-amid-subdued-demand/en"
    },
    {
     "title": "USDA ERS·식품가격 전망과 방법론",
     "url": "https://www.ers.usda.gov/data-products/food-price-outlook/summary-findings"
    }
   ],
   "numeric_columns": []
  },
  {
   "id": "marathon-region-crude-capacity-2025",
   "kind": "stacked",
   "title": "Marathon 권역별 원유 정제능력",
   "section": "7.31",
   "figure": "그림 7-12",
   "unit": "천 b/cd",
   "as_of": "2025-12-31",
   "basis": "회계 2025년 10-K Item 2의 2025년 12월 31일 시설 스냅샷이다. 단위는 천 barrels per calendar day다.",
   "note": "지역 구분은 회사 보고서 기준이며 지리적 면적이나 위경도를 표현하지 않는다. 2025년 말 공시 기준 Galveston Bay와 Garyville은 원유 정제능력의 약 41.8%를 차지한다. 실가동량·제품 생산량·매각 후 현재 자산 구성은 표시하지 않았다.",
   "columns": [
    "권역",
    "원유 정제능력·천 b/cd"
   ],
   "rows": [
    [
     "Gulf Coast",
     1248
    ],
    [
     "Mid-Continent",
     1186
    ],
    [
     "West Coast",
     552
    ]
   ],
   "numeric_columns": [
    1
   ],
   "subtotal_of": "marathon-refinery-crude-capacity-2025",
   "total": {
    "label": "합계",
    "value": 2986,
    "text": "2,986"
   },
   "sources": [
    {
     "title": "Marathon Petroleum·FY2025 10-K",
     "url": "https://www.sec.gov/Archives/edgar/data/1510295/000151029526000009/mpc-20251231.htm"
    }
   ],
   "labels": [
    [
     "1,248"
    ],
    [
     "1,186"
    ],
    [
     "552"
    ]
   ]
  }
 ]
};
