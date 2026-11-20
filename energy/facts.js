'use strict';
// Facts that more than one desk reports (redesign plan §6.3). A record keeps
// every source's value with its basis, so a reader who meets a different
// number on another desk can see where each one comes from. `lead` is the
// value a headline uses, picked in the owner's order: government statistics >
// international bodies > company filings > wire reports > industry estimates.
// Pages are to print values with fact()/factCited() instead of retyping them
// and list the rest with factOthers() (redesign steps 4-8). Until then the
// desks keep their own text, and backend/tests/test_energy_facts.py checks it
// against these records.
//
// Loads after research.js (sources, ref) and before the desks. Keep the facts
// object strict JSON (double quotes, no comments or trailing commas): the tests
// parse it.

const factTiers = {gov:'정부 통계', intl:'국제기구', company:'회사 공시', wire:'통신 보도', industry:'업계 추정'};

const facts = {
  "cn-product-quota-2026": {
    "metric": "중국 석유제품 수출쿼터(휘발유·경유·항공유)",
    "period": "2026년 연간",
    "unit": "만 톤",
    "lead": 0,
    "lead_reason": "두 값 모두 통신 보도라 10월 28일 보도보다 늦은 Reuters 보도를 앞에 둔다.",
    "values": [
      {
        "value": 4200,
        "text": "4,200만 톤",
        "basis": "4차 할당 뒤 연간 합산 허용량, 전년 대비 +6%",
        "source": "cnDieselNov",
        "label": "Reuters",
        "tier": "wire",
        "home": "diesel-exports-asia"
      },
      {
        "value": 4000,
        "text": "약 4,000만 톤",
        "approx": true,
        "basis": "4차 할당 직후 소식통이 전한 연간 합계, 전년 수준",
        "date": "2026-10-28",
        "source": null,
        "label": "모스크바타임스 보도",
        "tier": "wire",
        "home": "vc-asia_refining"
      }
    ],
    "differ": "보도 시점과 전년 비교(+6% 대 전년 수준)가 다르다. 약 200만 톤 차이의 원인(4차 규모, 전년 기준, 집계 범위)은 확인하지 못했다."
  },
  "cn-diesel-export-2026-09": {
    "metric": "중국 경유 수출",
    "period": "2026년 9월",
    "unit": "만 톤",
    "lead": 0,
    "values": [
      {
        "value": 185,
        "text": "185만 톤",
        "basis": "해관총서 통관 통계, 전년 대비 +262.3%",
        "source": null,
        "label": "해관총서",
        "tier": "gov",
        "home": "diesel-exports-asia"
      },
      {
        "value": 180,
        "text": "180만 톤",
        "basis": "11월 5일 Reuters 기사에 적힌 9월 값(통관 수치를 줄여 적은 것으로 보이나 미확인)",
        "date": "2026-11-05",
        "source": "cnDieselNov",
        "label": "Reuters",
        "tier": "wire",
        "home": "diesel-exports-asia"
      }
    ],
    "differ": "같은 통관 통계를 기사가 반올림해 적은 것으로 보인다."
  },
  "eu-gas-2026q3": {
    "metric": "유럽 천연가스 가격",
    "period": "2026년 3분기",
    "unit": "달러/MMBtu",
    "lead": 0,
    "values": [
      {
        "value": 21.53,
        "text": "21.53달러",
        "basis": "세계은행 유럽 천연가스 분기 평균(7~9월)",
        "source": "wbquarters",
        "label": "세계은행",
        "tier": "intl",
        "home": "gas-market"
      },
      {
        "value": 18.0,
        "text": "18.0달러",
        "basis": "우드사이드 3분기 보고서 가격 표의 TTF, 산정 기간 미확인",
        "source": null,
        "label": "우드사이드 3분기 보고서",
        "tier": "company",
        "home": "vc-lng"
      }
    ],
    "differ": "세계은행 값은 7~9월 평균이고 우드사이드 값은 산정 기간이 밝혀지지 않았다. 우드사이드 값은 한 달 앞선 기간의 평균과 가깝다(계산, 미확인)."
  },
  "asia-lng-2026-08": {
    "metric": "아시아 LNG 현물(JKM)",
    "period": "2026년 8월",
    "unit": "달러/MMBtu",
    "lead": 0,
    "values": [
      {
        "value": 22.0,
        "text": "22.0달러",
        "basis": "에너지경제연구원 에너지수급동향의 8월 평균",
        "source": "keei",
        "label": "KEEI",
        "tier": "gov",
        "home": "industry-prices-section"
      },
      {
        "value": 22.04,
        "text": "22.04달러",
        "basis": "IMF 아시아 LNG 가격 8월 평균(FRED PNGASJPUSDM, 자동 갱신)",
        "source": null,
        "label": "IMF",
        "tier": "intl",
        "home": "gas-market"
      }
    ],
    "differ": "같은 달 값이며 반올림 자릿수만 다르다."
  },
  "asia-lng-2026q3": {
    "metric": "아시아 LNG 현물(JKM)",
    "period": "2026년 3분기",
    "unit": "달러/MMBtu",
    "lead": 0,
    "values": [
      {
        "value": 18.9,
        "text": "18.9달러",
        "basis": "우드사이드 3분기 보고서 가격 표의 JKM, 산정 기간 미확인",
        "source": null,
        "label": "우드사이드 3분기 보고서",
        "tier": "company",
        "home": "vc-lng"
      }
    ],
    "differ": "IMF 월간 값(7월 19.56, 8월 22.04, 9월 26.64)의 3분기 평균보다 낮아 같은 기간 평균으로 볼 수 없다(계산)."
  },
  "whitehaven-bma-payment-2": {
    "metric": "화이트헤이븐 BMA 2차 연도 조건부 대금",
    "period": "2026년 7월 2일 지급",
    "unit": "만(호주달러·미국달러)",
    "lead": 0,
    "values": [
      {
        "value": 8400,
        "text": "8,400만 호주달러",
        "basis": "회사 9월 분기 현금흐름",
        "source": "whitehaven26",
        "label": "화이트헤이븐 9월 분기",
        "tier": "company",
        "home": "whitehaven"
      },
      {
        "value": 5800,
        "text": "5,800만 미국달러",
        "basis": "업계지 보도, 회사 자료로 확인하지 못함",
        "source": null,
        "label": "업계지",
        "tier": "industry",
        "home": "vc-coal_power"
      }
    ],
    "differ": "같은 지급을 다른 통화로 적은 값으로 보이나 미국달러 금액은 회사 자료로 확인하지 못했다."
  },
  "ru-refinery-runs-2026-10": {
    "metric": "러시아 원유 처리량",
    "period": "2026년 10월",
    "unit": "만 배럴/일",
    "lead": 0,
    "values": [
      {
        "value": 500,
        "text": "약 500만 배럴/일",
        "approx": true,
        "period": "10월 하순",
        "basis": "업계 소식통 추정, 월초 대비 약 25% 증가",
        "rise_pct": 25,
        "date": "2026-10-27",
        "source": "russiaOctoberRuns",
        "label": "Reuters",
        "tier": "wire",
        "home": "refinery-damage"
      },
      {
        "value": 430,
        "text": "약 430만 배럴/일",
        "approx": true,
        "period": "10월 월평균",
        "basis": "Kpler 공개 블로그의 월평균 추정",
        "date": "2026-10-28",
        "source": "ruwinter",
        "label": "Kpler",
        "tier": "industry",
        "home": "refinery-damage"
      }
    ],
    "differ": "하순 처리 속도와 월초 저점을 포함한 월평균이라 기간이 다르다."
  },
  "usgc-diesel-crack-2026-10": {
    "metric": "미국 걸프연안 경유 크랙",
    "period": "2026년 10월",
    "unit": "달러/배럴",
    "lead": 0,
    "lead_reason": "소유자 결정 Q2: 미국 걸프연안 크랙은 쿠싱 WTI 기준을 앞에 둔다. 세 값 모두 EIA 현물로 계산하며 월평균을 앞에 둔다.",
    "values": [
      {
        "value": 98.69,
        "text": "98.69달러",
        "period": "10월 월평균",
        "basis": "걸프연안 초저유황 경유 × 42 − 쿠싱 WTI",
        "source": "usd",
        "label": "EIA",
        "tier": "gov",
        "home": "oil-market",
        "formula": "DDFUELUSGULF*42-DCOILWTICO"
      },
      {
        "value": 95.26,
        "text": "95.3달러",
        "period": "10월 26~30일",
        "basis": "걸프연안 경유 × 42 − 쿠싱 WTI, 주간 평균",
        "source": "usd",
        "label": "EIA",
        "tier": "gov",
        "home": "supply-distillate",
        "formula": "DDFUELUSGULF*42-DCOILWTICO"
      },
      {
        "value": 79.7,
        "text": "79.7달러",
        "period": "10월 26~30일",
        "basis": "걸프연안 경유 × 42 − 브렌트 현물(보조 선 경유 − 브렌트)",
        "source": "usd",
        "label": "EIA",
        "tier": "gov",
        "home": "supply-distillate",
        "formula": "DDFUELUSGULF*42-DCOILBRENTEU"
      }
    ],
    "differ": "같은 WTI 기준에서 기간(10월 월평균·10월 26~30일 주간)이 다르고, 브렌트 기준 값은 보조 선이다. 값은 갱신마다 바뀌며 위 값은 11월 8일 빌드의 예시다."
  },
  "brent-close-2026-10-30": {
    "metric": "브렌트 선물 종가",
    "period": "2026년 10월 30일",
    "unit": "달러/배럴",
    "lead": 0,
    "values": [
      {
        "value": 113.43,
        "text": "113.43달러",
        "basis": "ICE 2027년 1월물 종가",
        "source": "brentNov2",
        "label": "Reuters",
        "tier": "wire",
        "home": "physical-crude"
      },
      {
        "value": 117.64,
        "text": "117.64달러",
        "basis": "근월물 연속 시세(BZ=F), 그날 만기인 2026년 12월물 종가",
        "source": "brentFrontYahoo",
        "label": "Yahoo Finance",
        "tier": "industry",
        "home": "live-market"
      }
    ],
    "differ": "계약월이 다르다. 10월 30일은 12월물의 마지막 거래일이다."
  },
  "gulf-crude-exports-2026-10": {
    "metric": "걸프 해상 원유·콘덴세이트 수출",
    "period": "2026년 10월",
    "unit": "만 배럴/일",
    "lead": 0,
    "values": [
      {
        "value": 1400,
        "text": "1,400만 배럴/일",
        "basis": "Vortexa 잠정 집계(Reuters 인용), 이란과 LPG 제외",
        "share": 86,
        "date": "2026-11-03",
        "source": "gulfflow",
        "label": "Reuters",
        "tier": "wire",
        "home": "gulf-recovery"
      }
    ]
  },
  "hormuz-oil-2026-09": {
    "metric": "호르무즈 해협 통과 석유(원유·제품)",
    "period": "2026년 9월",
    "unit": "만 배럴/일",
    "lead": 0,
    "values": [
      {
        "value": 1090,
        "text": "1,090만 배럴/일",
        "basis": "IEA 10월 석유시장 보고서의 9월 추정",
        "source": "ieaoil",
        "label": "IEA",
        "tier": "intl",
        "home": "sea-flows"
      }
    ]
  },
  "hormuz-oil-2026-08": {
    "metric": "호르무즈 해협 통과 석유(원유·제품)",
    "period": "2026년 8월",
    "unit": "만 배럴/일",
    "lead": 0,
    "values": [
      {
        "value": 720,
        "text": "720만 배럴/일",
        "basis": "8월은 IEA 9월 수치와 증감분으로 역산",
        "source": "ieaoil",
        "label": "IEA",
        "tier": "intl",
        "home": "sea-flows"
      }
    ]
  },
  "hormuz-bypass-2026-09": {
    "metric": "걸프 산유국 우회 수출(해협 밖 항구)",
    "period": "2026년 9월",
    "unit": "만 배럴/일",
    "lead": 0,
    "values": [
      {
        "value": 560,
        "text": "560만 배럴/일",
        "basis": "IEA 10월 석유시장 보고서의 9월 추정",
        "source": "ieaoil",
        "label": "IEA",
        "tier": "intl",
        "home": "sea-flows"
      }
    ]
  },
  "war-premium-2026-06": {
    "metric": "호르무즈 추가 전쟁보험료(선체 가치 대비)",
    "period": "2026년 6월 합의 후",
    "unit": "%",
    "lead": 0,
    "values": [
      {
        "value": 3,
        "text": "3~4%",
        "range": [3, 4],
        "before": [4.5, 6],
        "basis": "보험중개사 Marsh 평가, 합의 전 4.5~6%",
        "source": "warpremium",
        "label": "S&P Global",
        "tier": "wire",
        "home": "escort-watch"
      }
    ]
  }
};

function factValue(id, which) {
  const record = facts[id];
  if (!record) throw new Error('unknown fact ' + id);
  const value = record.values[which === undefined ? record.lead : which];
  if (!value) throw new Error('fact ' + id + ' has no value ' + which);
  return value;
}

// The value as the page writes it, e.g. '4,200만 톤'.
function fact(id, which) {
  return factValue(id, which).text;
}

// The citation chip of a value, or its label in brackets when the source has
// no card in research.js.
function factChip(value) {
  return value.source ? ref(value.source, value.label) : '<span class="ref">[' + value.label + ']</span>';
}

// The value with its period (when it differs from the record's), basis and citation.
function factCited(id, which) {
  const value = factValue(id, which);
  return value.text + '(' + [value.period, value.basis].filter(Boolean).join(', ') + ') ' + factChip(value);
}

// The record's other values, for a note next to the one shown.
function factOthers(id, which) {
  const record = facts[id];
  if (!record) throw new Error('unknown fact ' + id);
  const shown = which === undefined ? record.lead : which;
  return record.values.map((_, i) => i).filter(i => i !== shown).map(i => factCited(id, i)).join(', ');
}

// Counts behind the companies desk's overview sentence, taken from the data
// each time (plan §6.3 no. 10: counts typed into a sentence went stale within
// two hours of a data update).
function companyTotals(data) {
  const segments = (data && Array.isArray(data.segments) ? data.segments : []).filter(seg => seg && Array.isArray(seg.companies));
  const companies = segments.flatMap(seg => seg.companies);
  const count = key => companies.reduce((n, company) => n + (Array.isArray(company[key]) ? company[key].length : 0), 0);
  return {
    companies: companies.length,
    metrics: count('metrics'),
    highlights: count('highlights'),
    guidance: count('guidance'),
    sources: count('sources'),
    open_items: segments.reduce((n, seg) => n + (Array.isArray(seg.open_items) ? seg.open_items.length : 0), 0),
  };
}
