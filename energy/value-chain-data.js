'use strict';
// 밸류체인 기업 desk content: each company's latest reported quarter from its
// earnings release, call and filings, every figure with its source. Rendered by
// value-chain.js; backend/app/etl/external/energy_companies.py lists the same
// companies for the live quotes and SEC facts (tests check they agree).
const valueChain = {
 "as_of": "2026-11-07",
 "segments": [
  {
   "id": "offshore_drilling",
   "title": "해양 시추·해저 장비·FPSO",
   "position": "해양 시추·해저 장비는 석유·가스 공급 사슬의 최상류(탐사·개발 시추와 해저 생산설비 설치)로 수년 뒤 해상 원유 공급 능력을 먼저 보여준다. FPSO 운영사는 원유 생산·처리·저장·하역 설비를 임대·운영한다.",
   "summary": [
    "초심해 시추 능력은 2027년분까지 대부분 계약됐다. 노블 집계로 시장에 나온 초심해 리그 110기 중 109기(99%)가 계약 상태로 2024년 고점 105기를 넘었다(노블 3). 트랜스오션은 2027년 계약 커버리지 약 95%와 향후 12개월 내 신규 계약 투입이 가능한 드릴십 1척(Deepwater Mykonos)을 제시했다(트랜스오션 3). 시드릴도 2027년 드릴십 가용일의 85% 이상을 계약했다(시드릴 2).",
    "Tier-1 드릴십 선도 요율이 올랐고 평균 요율도 구계약 재가격으로 오르고 있다. 노블의 선도 요율 제시치는 1분기 40만 달러 초중반에서 3분기 40만 달러 중반~50만 달러로 높아졌다(노블 1, 6). 시드릴의 평균 계약 요율은 37만 6,000달러로 전년 동기 33만 달러보다 13.9% 높다(시드릴 3). 다만 트랜스오션의 8월 이후 신규 9건 가중평균 요율은 약 42만 3,000달러로 2분기 신규분 약 46만 1,000달러보다 낮다(트랜스오션 2, 7).",
    "직전 보고(7~8월) 이후 신규 수주는 트랜스오션 약 20억 달러(11월 2일 잔고 약 80억 달러), 시드릴 약 8억 달러(약 33억 달러), 밸러리스 약 6억 달러(약 48억 달러), 노블 약 5억 6,000만 달러(67억 달러) 순이다(트랜스오션 2, 시드릴 1, 밸러리스 2, 노블 1).",
    "중동 분쟁의 시추 비용 부담은 2분기를 고점으로 줄고 있다. 밸러리스가 밝힌 분쟁의 조정 EBITDA 영향은 1분기 800만 달러, 2분기 약 3,000만 달러, 3분기 약 2,400만 달러이고 전쟁위험 보험료 하락이 주된 이유다. ARO Drilling 리그 5기는 2026년 10월부터 사우디 아람코와 3년 연장 계약을 맺었다(밸러리스 1, 2, 7).",
    "신규 심해 공급 확대는 2027년 하반기 이후로 늦어질 가능성이 크다. 노블 CEO는 고객의 추가 현금흐름이 아직 시추로 전환되지 않았다고 말했고 2027년 하반기 계약 가동능력이 상반기보다 약 20% 많다고 제시했다(노블 1, 2). 테크닙FMC의 3분기 해저 수주는 20억 5,150만 달러(수주/매출 0.8배)로 해저 수주잔고가 2.2% 줄었지만 향후 5개 분기 해저 수주는 최소 145억 달러로 제시됐다(테크닙FMC 1).",
    "천해 잭업 회복은 아직 실적으로 확인되지 않았다. 보르 드릴링의 2분기 조정 EBITDA는 4,380만 달러로 1분기 대비 4,470만 달러 줄었고, 경영진은 3분기 평균 가동 리그 약 23기와 EBITDA 반등을 제시했으나 3분기 실적은 11월 7일 현재 나오지 않았다(보르 드릴링 1, 3, 4)."
   ],
   "open_items": [
    "보도자료·전사록은 원문 미열람이며, 그 내용은 발췌문과 SEC XBRL(data.sec.gov) 수치로 대조했다.",
    "트랜스오션·노블·시드릴·테크닙FMC 컨퍼런스콜에서는 호르무즈·이란·러시아·제재에 대한 직접 발언이 확인되지 않았다. 중동 관련 경영진 수치는 밸러리스 보도자료(분쟁의 조정 EBITDA 영향)뿐이다.",
    "노블 Interceptor·BlackHawk의 신규 계약 조건은 미확인이다.",
    "보르 드릴링의 3분기 실적 발표일은 회사 공지가 확인되지 않았고(Public.com 추정 11월 18일), 3분기 가동률·요율·수주잔고도 미확인이다.",
    "테크닙FMC 전사 수주잔고는 보도자료 수치(160억 6,580만 달러)다. 10-Q XBRL의 잔여이행의무(151억 달러)와 다르며 두 수치의 정의 차이는 미확인이다. 나머지 iEPCI 2건의 이름·규모도 미확인이다.",
    "트랜스오션–밸러리스 합병은 11월 24일 주주총회와 버뮤다 법원 승인(보도상 11월 26일 심리)을 거쳐 12월 1일경 완료 예정이다. 두 회사 수주잔고(약 80억 달러, 약 48억 달러)는 합병 완료 전 개별 기준이다.",
    "SBM 오프쇼어 카드는 Annual Report 2025의 연간 수치이며 2026년 분기 실적과 보고서 발간일은 없다."
   ],
   "companies": [
    {
     "name_kr": "트랜스오션",
     "name_en": "Transocean Ltd.",
     "ticker": "RIG",
     "yahoo": "RIG",
     "exchange": "NYSE",
     "country": "스위스",
     "cik": 1451505,
     "role_kr": "초심해·혹한지 부유식 시추선(드릴십·반잠수식) 최대 운영사로, 12월 1일 밸러리스 인수 완료를 앞두고 있다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-02",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 계약 시추 매출은 9억 3,700만 달러로 전년 동기 10억 2,800만 달러 대비 8.9% 줄었고, 조정 EBITDA는 3억 1,300만 달러(마진 33.4%), 수익 효율은 96.8%다.",
       "src": [
        1,
        5
       ]
      },
      {
       "text": "가동률 하락이 전분기 대비 매출 감소(9억 6,600만→9억 3,700만 달러)의 원인이다. 선대 가동률은 74.7%로 2분기 78.2%, 전년 동기 76.0%보다 낮았고 평균 일일 매출은 46만 2,600달러로 2분기 47만 2,500달러에서 줄었다(초심해 44만 2,100달러, 혹한지 50만 4,300달러). 혹한지 가동률은 95.1%로 2분기 94.2%에서 올랐다.",
       "src": [
        1,
        3,
        4
       ]
      },
      {
       "text": "8월 보고 이후 신규 계약 9건으로 수주잔고 약 20억 달러를 추가했지만 가중평균 일일용선료는 약 42만 3,000달러로 2분기 신규분(2억 9,200만 달러, 약 46만 1,000달러)보다 낮았다. 11월 2일 기준 총 수주잔고는 약 80억 달러, 연초 이후 신규 수주는 40억 달러를 넘었다.",
       "src": [
        1,
        2,
        3,
        7
       ]
      },
      {
       "text": "신규 계약은 Deepwater Proteus 미국 걸프 10공, Deepwater Conqueror 적도기니 2공·미국 걸프 5공(10월 19일 두 리그 수주 약 5억 5,000만 달러 공시), Dhirubhai Deepwater KG2 인도 ONGC 2년 확정 낙찰의향서(LOA), Transocean Norge 노르웨이 A/S Norske Shell 2공(옵션 1공)이다.",
       "src": [
        2,
        6
       ]
      },
      {
       "text": "2027년 계약 커버리지는 약 95%, 2028년은 기존 선대 기준 약 65%다. 향후 12개월 안에 신규 장기 계약을 시작할 수 있는 드릴십은 Deepwater Mykonos 1척뿐이다.",
       "src": [
        3
       ]
      },
      {
       "text": "순이익 2,600만 달러(주당 0.02달러)는 세전손실 7,500만 달러를 법인세 이익 1억 100만 달러가 메운 결과이며, 영업현금흐름 1억 7,400만 달러에서 capex 4,300만 달러를 뺀 잉여현금흐름 1억 3,100만 달러로 Deepwater Aquila 노트 잔액 2억 달러를 조기 상환했으며, 9개월 누적 부채 상환은 7억 1,800만 달러다.",
       "src": [
        1,
        3,
        5
       ]
      },
      {
       "text": "경영진은 동남아 4~5건 입찰에서 7~9 리그-년 수요가 나올 수 있다고 밝혔고, 10-Q는 서아프리카·지중해·동남아·인도에서 초심해 수요 기회가 늘고 있다고 적었다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "3분기 초심해 부문 가동률은 67.6%로 2분기(72.6%)보다 낮아졌다.",
       "src": [
        8
       ]
      }
     ],
     "metrics": [
      {
       "label": "계약 시추 매출",
       "value": "937",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 -8.9%",
       "src": 5
      },
      {
       "label": "조정 EBITDA",
       "value": "313",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "조정 EBITDA 마진",
       "value": "33.4",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "영업이익",
       "value": "143",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 -5.9%",
       "src": 5
      },
      {
       "label": "순이익(주당 0.02달러)",
       "value": "26",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 -1,923백만 달러에서 흑자 전환",
       "src": 5
      },
      {
       "label": "운영·유지 비용(O&M)",
       "value": "589",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 -3.1%",
       "src": 1
      },
      {
       "label": "영업현금흐름",
       "value": "174",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "capex",
       "value": "43",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "잉여현금흐름",
       "value": "131",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "수익 효율",
       "value": "96.8",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "선대 가동률",
       "value": "74.7",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "전분기 대비 -3.5%p",
       "src": 1
      },
      {
       "label": "혹한지 부유식 가동률",
       "value": "95.1",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "전분기 대비 +0.9%p",
       "src": 1
      },
      {
       "label": "평균 일일 매출(전체 선대)",
       "value": "462,600",
       "unit": "달러/일",
       "period": "2026년 3분기",
       "change": "전분기 대비 -2.1%",
       "src": 1
      },
      {
       "label": "평균 일일 매출(초심해 부유식)",
       "value": "442,100",
       "unit": "달러/일",
       "period": "2026년 3분기",
       "change": "전분기 대비 -2.9%",
       "src": 1
      },
      {
       "label": "평균 일일 매출(혹한지 부유식)",
       "value": "504,300",
       "unit": "달러/일",
       "period": "2026년 3분기",
       "change": "전분기 대비 -1.1%",
       "src": 1
      },
      {
       "label": "수주잔고",
       "value": "약 8.0",
       "unit": "십억 달러",
       "period": "2026-11-02 기준",
       "change": "",
       "src": 2
      },
      {
       "label": "신규 수주(9건)",
       "value": "약 2.0",
       "unit": "십억 달러",
       "period": "2026년 8월 보고 이후",
       "change": "",
       "src": 2
      },
      {
       "label": "신규 수주 가중평균 일일용선료",
       "value": "약 423,000",
       "unit": "달러/일",
       "period": "2026년 8월 보고 이후",
       "change": "2분기 신규분(약 461,000달러) 대비 -8%",
       "src": 2
      },
      {
       "label": "유동성(미사용 RCF 510백만 달러 포함)",
       "value": "약 1.3",
       "unit": "십억 달러",
       "period": "2026-09-30 기준",
       "change": "",
       "src": 1
      },
      {
       "label": "2027년 계약 커버리지",
       "value": "약 95",
       "unit": "%",
       "period": "2026-11-03 컨퍼런스콜",
       "change": "",
       "src": 3
      }
     ],
     "guidance": [
      {
       "text": "4분기 계약 시추 매출 가이던스는 9억 1,500만~9억 6,500만 달러, 2026년 연간은 39억~39억 5,000만 달러이며, 선대 수익 효율 가정은 96.5%다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "2027년 단독 기준 예비 가이던스는 매출 38억 5,000만~40억 달러, O&M 비용 23억 7,500만~25억 달러, capex 1억 3,000만~1억 4,000만 달러이고, 비용 인플레이션은 한 자릿수 초반으로 가정했다.",
       "src": [
        3
       ]
      },
      {
       "text": "2026년 G&A는 1억 8,500만~1억 9,000만 달러로 제시했고, 최근 24개월간 20억 달러 넘게 부채를 상환했으며 부채 감축을 이어간다.",
       "src": [
        3
       ]
      },
      {
       "text": "밸러리스 인수는 규제 승인을 모두 받아 12월 1일 완료 예정이고 연간 시너지는 약 2억 달러이며, 합병 법인의 2027년 가이던스는 2027년 2월 연간 실적 발표 때 낸다.",
       "src": [
        3
       ]
      },
      {
       "text": "4분기 운영·유지(O&M) 비용 가이던스는 5억 5,000만~6억 달러다.",
       "src": [
        8
       ]
      }
     ],
     "read_through": {
      "text": "2027년까지 추가로 투입할 수 있는 심해 시추 능력은 거의 없다. 트랜스오션의 2027년 커버리지는 약 95%이고 12개월 내 신규 계약이 가능한 드릴십은 1척이다. 신규 계약 가중평균 요율(약 42만 3,000달러)은 2분기 신규분보다 낮아 요율 상승은 트랜스오션 계약에서 아직 확인되지 않는다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Transocean Ltd. Reports Third Quarter 2026 Results (Form 8-K Ex. 99.1)",
       "publisher": "Transocean / SEC EDGAR",
       "date": "2026-11-02",
       "url": "https://www.sec.gov/Archives/edgar/data/0001451505/000145150526000083/rig-ex99d1.htm"
      },
      {
       "id": 2,
       "title": "Transocean Fleet Status Report, November 2, 2026 (Form 8-K Ex. 99.2)",
       "publisher": "Transocean / SEC EDGAR",
       "date": "2026-11-02",
       "url": "https://www.sec.gov/Archives/edgar/data/0001451505/000145150526000083/rig-ex99d2.htm"
      },
      {
       "id": 3,
       "title": "Transocean (RIG) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-11-03",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/11/03/transocean-rig-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 4,
       "title": "Transocean Ltd. Form 10-Q for the quarter ended September 30, 2026",
       "publisher": "SEC EDGAR",
       "date": "2026-11-03",
       "url": "https://www.sec.gov/Archives/edgar/data/0001451505/000145150526000085/rig-20260930x10q.htm"
      },
      {
       "id": 5,
       "title": "Transocean Ltd. XBRL company facts (10-Q, 2026-09-30)",
       "publisher": "SEC (data.sec.gov)",
       "date": "2026-11-03",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001451505.json"
      },
      {
       "id": 6,
       "title": "Transocean Form 8-K Ex. 99.1: Deepwater Proteus·Deepwater Conqueror contract awards",
       "publisher": "Transocean / SEC EDGAR",
       "date": "2026-10-19",
       "url": "https://www.sec.gov/Archives/edgar/data/0001451505/000145150526000077/rig-ex99d1.htm"
      },
      {
       "id": 7,
       "title": "Transocean Ltd. Reports Second Quarter 2026 Results (Form 8-K Ex. 99.1)",
       "publisher": "Transocean / SEC EDGAR",
       "date": "2026-08-05",
       "url": "https://www.sec.gov/Archives/edgar/data/0001451505/000145150526000058/rig-20260805xex99d1.htm"
      },
      {
       "id": 8,
       "title": "Transocean Q3 2026 earnings release (8-K Ex.99.1)",
       "publisher": "SEC EDGAR",
       "date": "2026-11-02",
       "url": "https://www.sec.gov/Archives/edgar/data/1451505/000145150526000083/rig-ex99d1.htm"
      }
     ]
    },
    {
     "name_kr": "밸러리스",
     "name_en": "Valaris Limited",
     "ticker": "VAL",
     "yahoo": "VAL",
     "exchange": "NYSE",
     "country": "버뮤다",
     "cik": 314808,
     "role_kr": "드릴십과 잭업을 함께 운영하는 해양 시추사로 사우디 아람코 합작사 ARO Drilling에 잭업을 임대하며, 12월 1일경 트랜스오션과의 합병이 완료될 예정이다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-02",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 매출은 5억 9,360만 달러로 2분기 5억 3,920만 달러 대비 10.1% 늘었고 전년 동기(5억 9,570만 달러)와 비슷하며, 조정 EBITDA는 1억 5,100만 달러로 2분기 9,700만 달러에서 늘었다.",
       "src": [
        1,
        5
       ]
      },
      {
       "text": "부유식 선대가 증익을 이끌었다. 유휴 이후 드릴십 3척이 2~3분기에 신규 계약을 시작했고 VALARIS DS-9은 더 높은 요율로 새 계약에 들어갔으며, 올해 4척을 재가동해 가동 드릴십 10척 전부가 계약 상태다. 잭업은 운항일수 감소로 증가분을 일부 상쇄했다.",
       "src": [
        1
       ]
      },
      {
       "text": "회사가 밝힌 중동 분쟁의 조정 EBITDA 영향은 1분기 800만 달러, 2분기 약 3,000만 달러, 3분기 약 2,400만 달러다. 장기 전쟁위험 보험을 낮은 요율로 갱신했고, 중동 조선소 작업을 마친 잭업 VALARIS 250·116이 ARO 장기 나용선을 재개하면서 관련 계약 시추 비용(상환성 제외)이 2,700만 달러에서 2,100만 달러로 줄었다.",
       "src": [
        1,
        7
       ]
      },
      {
       "text": "11월 2일 기준 수주잔고는 약 48억 달러로 8월 5일 약 46억 달러에서 늘었다. 신규 수주·연장 약 6억 달러 중 bp의 Mad Dog·Thunder Horse 플랫폼 시추 3년 계약(2027년 1월 시작, 약 2억 9,000만 달러)이 가장 크다.",
       "src": [
        2
       ]
      },
      {
       "text": "ARO Drilling 보유 리그 5기가 2026년 10월부터 사우디 아람코와 3년 연장 계약을 맺었다. 드릴십 DS-18은 PETRONAS 수리남 2공 탐사, DS-12는 bp 이집트 60일 연장을 받았다.",
       "src": [
        2,
        4
       ]
      },
      {
       "text": "가동 리그는 1년 전 29기에서 27기로, 계선(stacked) 리그는 12기에서 7기로 줄었다. 3분기에 VALARIS MS-1을 재활용 매각했고 9개월 누적 자산 매각 대금은 1억 260만 달러다.",
       "src": [
        1,
        3,
        5
       ]
      },
      {
       "text": "지배주주 순이익은 4,610만 달러(주당 0.66달러)로 전년 동기 1억 8,810만 달러 대비 75.5% 줄었고, 3분기 capex는 1억 2,160만 달러, 영업현금흐름은 6,720만 달러다. 합병을 앞두고 컨퍼런스콜은 열지 않았다.",
       "src": [
        1,
        5
       ]
      },
      {
       "text": "3분기 가동률은 부유식 58%(활성 선대 기준 75%), 잭업 64%(85%)이고 평균 일일 매출은 부유식 46만 9,000달러, 잭업 13만 1,000달러다(10-Q).",
       "src": [
        8
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "593.6",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +10.1%",
       "src": 5
      },
      {
       "label": "조정 EBITDA",
       "value": "151",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +56%",
       "src": 1
      },
      {
       "label": "영업이익",
       "value": "81.3",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 -37.7%",
       "src": 5
      },
      {
       "label": "지배주주 순이익",
       "value": "46.1",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 -75.5%",
       "src": 5
      },
      {
       "label": "희석 EPS",
       "value": "0.66",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 대비 -75.1%",
       "src": 5
      },
      {
       "label": "중동 분쟁의 조정 EBITDA 영향",
       "value": "약 -24",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "2분기 약 -30백만 달러, 1분기 -8백만 달러",
       "src": 1
      },
      {
       "label": "수익 효율",
       "value": "97",
       "unit": "%",
       "period": "2026년 3분기(연초 이후 98%)",
       "change": "",
       "src": 1
      },
      {
       "label": "가동 드릴십 중 계약 척수",
       "value": "10/10",
       "unit": "척",
       "period": "2026-11-02 기준",
       "change": "",
       "src": 1
      },
      {
       "label": "수주잔고",
       "value": "약 4.8",
       "unit": "십억 달러",
       "period": "2026-11-02 기준",
       "change": "8월 5일 약 4.6십억 달러 대비 증가",
       "src": 2
      },
      {
       "label": "신규 수주·연장",
       "value": "약 600",
       "unit": "백만 달러",
       "period": "2026년 8월 5일 이후",
       "change": "",
       "src": 2
      },
      {
       "label": "capex",
       "value": "121.6",
       "unit": "백만 달러",
       "period": "2026년 3분기(9개월 누적−상반기 누적)",
       "change": "",
       "src": 5
      },
      {
       "label": "영업현금흐름",
       "value": "67.2",
       "unit": "백만 달러",
       "period": "2026년 3분기(9개월 누적−상반기 누적)",
       "change": "",
       "src": 5
      },
      {
       "label": "현금",
       "value": "525.1",
       "unit": "백만 달러",
       "period": "2026-09-30 기준",
       "change": "",
       "src": 5
      }
     ],
     "guidance": [
      {
       "text": "2026년 2월 9일 합병 발표 이후 실적 컨퍼런스콜과 가이던스 갱신을 중단했다.",
       "src": [
        1
       ]
      },
      {
       "text": "트랜스오션과의 합병은 필요한 규제 승인을 모두 받았고 11월 24일 주주총회를 거쳐 12월 1일경 완료될 예정이며, 밸러리스 1주당 트랜스오션 15.235주를 받고, 합병 후 지분은 트랜스오션 주주 약 53%, 밸러리스 주주 약 47%다.",
       "src": [
        1,
        6
       ]
      },
      {
       "text": "계약 개시 일정은 VALARIS 121의 Eni 작업 2026년 11월, bp 플랫폼 3년 계약 2027년 1월, VALARIS 122의 INEOS 덴마크 북해 연장 2027년 2월(약 126일)이다.",
       "src": [
        2,
        4
       ]
      }
     ],
     "read_through": {
      "text": "중동 분쟁 속에서도 사우디 해상 원유 개발 시추는 이어지고 있다. 밸러리스의 분쟁 관련 조정 EBITDA 영향은 2분기 약 3,000만 달러에서 3분기 약 2,400만 달러로 줄었고, 아람코는 ARO 리그 5기를 2026년 10월부터 3년 연장했다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Valaris Reports Third Quarter 2026 Results (Form 8-K Ex. 99.1)",
       "publisher": "Valaris / SEC EDGAR",
       "date": "2026-11-02",
       "url": "https://www.sec.gov/Archives/edgar/data/0000314808/000031480826000152/a09302026ex991pressrelease.htm"
      },
      {
       "id": 2,
       "title": "Valaris Fleet Status Report, November 2026 (Form 8-K Ex. 99.2)",
       "publisher": "Valaris / SEC EDGAR",
       "date": "2026-11-02",
       "url": "https://www.sec.gov/Archives/edgar/data/0000314808/000031480826000153/fsrex99_2november2026.htm"
      },
      {
       "id": 3,
       "title": "Valaris Limited Form 10-Q for the quarter ended September 30, 2026",
       "publisher": "SEC EDGAR",
       "date": "2026-11-03",
       "url": "https://www.sec.gov/Archives/edgar/data/0000314808/000031480826000155/val-20260930.htm"
      },
      {
       "id": 4,
       "title": "Valaris Announces Contract Awards and Fleet Status Updates",
       "publisher": "Valaris (Nasdaq 게재)",
       "date": "2026-10-07",
       "url": "https://www.nasdaq.com/press-release/valaris-announces-contract-awards-and-fleet-status-updates-2026-10-07"
      },
      {
       "id": 5,
       "title": "Valaris Limited XBRL company facts (10-Q, 2026-09-30)",
       "publisher": "SEC (data.sec.gov)",
       "date": "2026-11-03",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0000314808.json"
      },
      {
       "id": 6,
       "title": "Transocean Ltd. Definitive Merger Proxy Statement (DEFM14A)",
       "publisher": "SEC EDGAR",
       "date": "2026-10-14",
       "url": "https://www.sec.gov/Archives/edgar/data/0001451505/000110465926115680/tm269762-10_defm14a.htm"
      },
      {
       "id": 7,
       "title": "Valaris Reports Second Quarter 2026 Results (Form 8-K Ex. 99.1)",
       "publisher": "Valaris / SEC EDGAR",
       "date": "2026-08-05",
       "url": "https://www.sec.gov/Archives/edgar/data/0000314808/000031480826000138/a06302026ex991pressrelease.htm"
      },
      {
       "id": 8,
       "title": "Valaris 10-Q for the quarter ended 2026-09-30",
       "publisher": "SEC EDGAR",
       "date": "2026-10-30",
       "url": "https://www.sec.gov/Archives/edgar/data/314808/000031480826000155/val-20260930.htm"
      }
     ]
    },
    {
     "name_kr": "노블",
     "name_en": "Noble Corporation plc",
     "ticker": "NE",
     "yahoo": "NE",
     "exchange": "NYSE",
     "country": "영국",
     "cik": 1895262,
     "role_kr": "드릴십·반잠수식·초혹한지 잭업을 운영하는 해양 시추사로, 가이아나·수리남·브라질·서아프리카 심해 프로그램에 리그를 투입한다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-26",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 총매출은 7억 2,880만 달러(계약 시추 매출 6억 8,400만 달러)로 전년 동기 7억 9,800만 달러 대비 8.7% 줄었고, 조정 EBITDA는 리그 계약 교체 공백으로 2억 100만 달러, 전분기 대비 5% 감소했다.",
       "src": [
        1,
        2,
        5
       ]
      },
      {
       "text": "순손실 1억 1,700만 달러(주당 -0.73달러)는 세전이익 1,600만 달러에 법인세 비용 1억 3,300만 달러가 반영된 결과다.",
       "src": [
        5
       ]
      },
      {
       "text": "마케팅 중인 28기 가동률은 70%로 전분기 67%에서 올랐고, 부유식 23기 계약률은 66%(전분기 64%), 초혹한지 잭업 5기 가동률은 86%다.",
       "src": [
        1
       ]
      },
      {
       "text": "7월 27일 이후 신규 수주는 약 5억 6,000만 달러이고 10월 26일 기준 수주잔고는 67억 달러이며, 이 중 약 26억 달러가 2027년 매출로 전환될 예정이다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "신규 계약은 BlackRhino의 TotalEnergies 나이지리아 4공(2026년 4분기 시작, 약 150일, 옵션 6공), Faye Kozack의 Tullow 가나 5공(2027년 중반, 약 250일, 옵션 5공), Globetrotter I의 Occidental 페루 2공(2027년 2분기, 일일 40만 달러+동원비)이다.",
       "src": [
        1
       ]
      },
      {
       "text": "Tier-1 드릴십 선도 요율 제시치는 1분기 발표 때 40만 달러 초중반에서 3분기 발표 때 40만 달러 중반~50만 달러로 높아졌고 초혹한지 잭업은 23만~30만 달러다. 업계 마케팅 초심해 리그 110기 중 109기(99%)가 계약돼 2024년 고점 105기를 넘었다. 가이아나 계약 요율은 반기마다 글로벌 Tier-1 기준 요율에 맞춰 재설정된다.",
       "src": [
        1,
        2,
        3,
        6
       ]
      },
      {
       "text": "탐사 발주는 늦다. CEO는 고객사가 투자 규율을 지켜 추가 현금흐름이 아직 시추로 전환되지 않는다고 말했고, 2027년 와일드캣 탐사 증가와 다수 리그 개발 프로그램을 2027년 말 수요의 근거로 들었다. 인도는 2027년 말~2028년 고사양 드릴십 2~4척이 필요할 수 있고 미국 걸프는 약세라고 봤다.",
       "src": [
        2,
        3
       ]
      },
      {
       "text": "영업현금흐름 1억 4,400만 달러에서 capex 1억 9,200만 달러를 빼 잉여현금흐름은 -4,800만 달러이며, 3분기 배당 지급액은 7,990만 달러(주당 0.50달러)다.",
       "src": [
        1,
        5
       ]
      }
     ],
     "metrics": [
      {
       "label": "총매출",
       "value": "728.8",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 -8.7%",
       "src": 5
      },
      {
       "label": "계약 시추 매출",
       "value": "684",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +0.7%",
       "src": 1
      },
      {
       "label": "조정 EBITDA",
       "value": "201",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 -5%",
       "src": 1
      },
      {
       "label": "영업이익",
       "value": "60.1",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +19.2%",
       "src": 5
      },
      {
       "label": "순손실",
       "value": "-117.0",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "희석 EPS",
       "value": "-0.73",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 동기 -0.13달러",
       "src": 5
      },
      {
       "label": "법인세 비용",
       "value": "133.0",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "영업현금흐름",
       "value": "144",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "capex",
       "value": "192",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "잉여현금흐름",
       "value": "-48",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "수주잔고",
       "value": "6.7",
       "unit": "십억 달러",
       "period": "2026-10-26 기준",
       "change": "",
       "src": 1
      },
      {
       "label": "신규 수주",
       "value": "약 560",
       "unit": "백만 달러",
       "period": "2026년 7월 27일 이후",
       "change": "",
       "src": 1
      },
      {
       "label": "마케팅 리그 가동률(28기)",
       "value": "70",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "전분기 대비 +3%p",
       "src": 1
      },
      {
       "label": "부유식 계약률(23기)",
       "value": "66",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "전분기 대비 +2%p",
       "src": 1
      },
      {
       "label": "초혹한지 잭업 가동률(5기)",
       "value": "86",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "Tier-1 드릴십 선도 일일용선료",
       "value": "40만 중반~50만",
       "unit": "달러/일",
       "period": "2026-10-26 발표",
       "change": "1분기 발표 40만 초중반",
       "src": 1
      },
      {
       "label": "초혹한지 잭업 선도 일일용선료",
       "value": "23만~30만",
       "unit": "달러/일",
       "period": "2026-10-26 발표",
       "change": "",
       "src": 1
      },
      {
       "label": "4분기 주당 배당",
       "value": "0.50",
       "unit": "달러",
       "period": "2026년 4분기",
       "change": "",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "2026년 매출 가이던스를 28억 5,000만~29억 달러, 조정 EBITDA를 8억 5,000만~9억 달러로 좁혔고, capex는 고객 상환분 증가로 6억 8,000만~7억 500만 달러로 올렸다.",
       "src": [
        1
       ]
      },
      {
       "text": "2027년 하반기 계약 가동능력이 상반기보다 약 20% 많아 2027년 하반기에 실적이 크게 개선될 것으로 전망했다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "Valiant와 Discoverer는 2026년 말 전후 수리남에서 TotalEnergies 장기 개발 작업을 시작한다.",
       "src": [
        3
       ]
      },
      {
       "text": "4분기 배당 주당 0.50달러를 11월 25일 기준 주주에게 12월 17일 지급한다.",
       "src": [
        1
       ]
      }
     ],
     "read_through": {
      "text": "신규 심해 공급 확대는 2027년 하반기 이후 개발 프로그램 중심으로 나타날 가능성이 크다. 고객의 추가 현금흐름이 아직 시추로 전환되지 않았고, 노블의 2027년 하반기 계약 가동능력은 상반기보다 약 20% 많다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Noble Corporation plc Announces Third Quarter 2026 Results (Form 8-K Ex. 99.1)",
       "publisher": "Noble / SEC EDGAR",
       "date": "2026-10-26",
       "url": "https://www.sec.gov/Archives/edgar/data/0001895262/000189526226000147/exhibit991-q32026pressrele.htm"
      },
      {
       "id": 2,
       "title": "Noble (NE) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-27",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/27/noble-ne-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 3,
       "title": "Noble Q3 Earnings Call Highlights",
       "publisher": "MarketBeat",
       "date": "2026-10-27",
       "url": "https://www.marketbeat.com/instant-alerts/transcript-noble-q3-earnings-call-highlights-2026-10-27/"
      },
      {
       "id": 4,
       "title": "Noble rigs' $560 million drilling gigs push fleet backlog to $6.7 billion",
       "publisher": "Offshore Energy",
       "date": "2026-10-30",
       "url": "https://www.offshore-energy.biz/2026/10/30/noble-rigs-dollar560-million-drilling-gigs-push-fleet-backlog-to-dollar67-billion"
      },
      {
       "id": 5,
       "title": "Noble Corporation plc XBRL company facts (10-Q, 2026-09-30)",
       "publisher": "SEC (data.sec.gov)",
       "date": "2026-10-27",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001895262.json"
      },
      {
       "id": 6,
       "title": "Noble Corporation plc Announces First Quarter 2026 Results (Form 8-K Ex. 99.1)",
       "publisher": "Noble / SEC EDGAR",
       "date": "2026-04-27",
       "url": "https://www.sec.gov/Archives/edgar/data/0001895262/000189526226000108/exhibit991-q12026pressrele.htm"
      }
     ]
    },
    {
     "name_kr": "시드릴",
     "name_en": "Seadrill Limited",
     "ticker": "SDRL",
     "yahoo": "SDRL",
     "exchange": "NYSE",
     "country": "버뮤다",
     "cik": 1737706,
     "role_kr": "드릴십·반잠수식 등 부유식 시추선을 운영하는 해양 시추사로, 브라질 레거시 드릴십 계약의 재가격이 진행 중이다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-03",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 총매출은 4억 2,800만 달러로 전년 동기 3억 6,300만 달러 대비 17.9% 늘었지만 2분기 4억 4,900만 달러보다 4.7% 줄었고, 조정 EBITDA는 1억 2,100만 달러로 2분기 1억 4,400만 달러에서 16% 감소했다. West Carina 운항일수 감소와 West Vela·West Elara·Sevan Louisiana의 계약 간 공백이 원인이다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "평균 계약 일일용선료는 37만 6,000달러로 2분기 36만 달러, 전년 동기 33만 달러에서 올랐고, 경제적 가동률은 95%다.",
       "src": [
        2,
        3
       ]
      },
      {
       "text": "8월 보고 이후 인도네시아·말레이시아·앙골라·미국 걸프에서 약 8억 달러를 수주해 11월 3일 기준 수주잔고는 약 33억 달러이며, 2027년 드릴십 가용일의 85% 이상이 계약됐다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "최대 수주는 West Carina 확정 기간 약 4억 2,000만 달러(약 880일)이고, Sonangol Libongos(Sonadrill 50:50 합작)는 남은 가격 확정 옵션이 모두 행사돼 약 3년 연장(2030년까지), West Capella(말레이시아)는 옵션 행사로 2028년 2월까지 연속 작업, Sevan Louisiana는 LLOG와 미국 걸프 60일 계약을 따냈다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "브라질 레거시 계약의 재가격 효과가 나타나고 있다. West Tellus·West Jupiter는 올해 브라질에서 크게 오른 요율로 작업을 시작했고 West Carina가 2027년에 뒤따른다.",
       "src": [
        2
       ]
      },
      {
       "text": "순손실 3,000만 달러(주당 -0.49달러)에는 법적 충당금이 포함됐고, 기타 영업외비용 4,800만 달러·이자비용 1,500만 달러·법인세 1,900만 달러가 영업이익 4,400만 달러를 넘었다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "잉여현금흐름은 1억 7,900만 달러(영업현금흐름 1억 9,500만 달러, capex 1,600만 달러)이고, 3분기에 자사주 54만 7,674주를 평균 40.34달러, 2,200만 달러에 매입해 9개월 누적 매입액은 4,200만 달러다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "경영진은 미국 걸프 수급이 2028년까지 재균형되고 향후 몇 달 안에 다년 계약 몇 건이 나올 것으로 봤고, 40만 달러 중반의 선도 요율에 대해서는 대체로 예상대로 움직인다고 답했다.",
       "src": [
        2
       ]
      },
      {
       "text": "West Carina의 약 4억 2,000만 달러 계약은 인도네시아 작업으로 레거시 계약 3건 중 마지막 재가격 계약이다. West Capella는 가격 확정 옵션 120일(약 4,100만 달러)과 미확정 옵션 120일(약 5,300만 달러)이 함께 행사돼 합계 약 9,400만 달러(240일)다. 3분기 법적 충당금은 SFL Hercules 소송 항소심 판결로 4,100만 달러 늘었다.",
       "src": [
        5,
        6
       ]
      }
     ],
     "metrics": [
      {
       "label": "총매출",
       "value": "428",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +17.9%",
       "src": 4
      },
      {
       "label": "계약 매출(고객계약수익)",
       "value": "329",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +17.5%",
       "src": 4
      },
      {
       "label": "조정 EBITDA",
       "value": "121",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 -16.0%",
       "src": 1
      },
      {
       "label": "영업이익",
       "value": "44",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +69.2%",
       "src": 4
      },
      {
       "label": "순손실",
       "value": "-30",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 -11백만 달러",
       "src": 4
      },
      {
       "label": "희석 EPS",
       "value": "-0.49",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 동기 -0.17달러",
       "src": 4
      },
      {
       "label": "평균 계약 일일용선료",
       "value": "376,000",
       "unit": "달러/일",
       "period": "2026년 3분기",
       "change": "전년 대비 +13.9%",
       "src": 3
      },
      {
       "label": "경제적 가동률",
       "value": "95",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 2
      },
      {
       "label": "수주잔고",
       "value": "약 3.3",
       "unit": "십억 달러",
       "period": "2026-11-03 기준",
       "change": "",
       "src": 1
      },
      {
       "label": "신규 수주·연장",
       "value": "약 800",
       "unit": "백만 달러",
       "period": "2026년 8월 보고 이후",
       "change": "",
       "src": 1
      },
      {
       "label": "2027년 드릴십 가용일 계약률",
       "value": "85 초과",
       "unit": "%",
       "period": "2026-11-04 컨퍼런스콜",
       "change": "",
       "src": 2
      },
      {
       "label": "영업현금흐름",
       "value": "195",
       "unit": "백만 달러",
       "period": "2026년 3분기(9개월 누적−상반기 누적)",
       "change": "",
       "src": 4
      },
      {
       "label": "capex",
       "value": "16",
       "unit": "백만 달러",
       "period": "2026년 3분기(9개월 누적−상반기 누적)",
       "change": "",
       "src": 4
      },
      {
       "label": "잉여현금흐름",
       "value": "179",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "자사주 매입",
       "value": "22",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "현금",
       "value": "483",
       "unit": "백만 달러",
       "period": "2026-09-30 기준",
       "change": "",
       "src": 4
      },
      {
       "label": "장기부채",
       "value": "737",
       "unit": "백만 달러",
       "period": "2026-09-30 기준",
       "change": "",
       "src": 4
      }
     ],
     "guidance": [
      {
       "text": "2026년 조정 EBITDA 가이던스를 4억 2,000만~4억 5,000만 달러에서 4억 4,000만~4억 6,000만 달러로, 매출(상환성 매출 약 9,000만 달러 제외)을 15억 6,000만~15억 8,000만 달러로 올렸고, 3분기 연속 상향이다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "capex·장기 유지보수 비용 가이던스는 2억~2억 4,000만 달러에서 2억 1,000만~2억 3,000만 달러로 좁혔다.",
       "src": [
        1
       ]
      },
      {
       "text": "조정 EBITDA 가이던스에는 동원비 상각에 따른 비현금 비용 3,300만 달러가 들어 있다.",
       "src": [
        2
       ]
      }
     ],
     "read_through": {
      "text": "부유식 리그 평균 요율은 구계약 재가격으로 오르고 있지만 계약 간 공백이 남아 있다. 평균 계약 요율은 37만 6,000달러로 전년 대비 13.9% 올랐고 2027년 드릴십 가용일의 85% 이상이 계약됐으나, 3분기 매출은 West Carina 운항일수 감소와 리그 3척의 계약 공백으로 전분기 대비 4.7% 줄었다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Seadrill Announces Third Quarter 2026 Results (Form 8-K Ex. 99.1)",
       "publisher": "Seadrill / SEC EDGAR",
       "date": "2026-11-03",
       "url": "https://www.sec.gov/Archives/edgar/data/0001737706/000173770626000029/seadrillpressreleaseq32026.htm"
      },
      {
       "id": 2,
       "title": "Seadrill (SDRL) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-11-04",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/11/04/seadrill-sdrl-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 3,
       "title": "Seadrill Limited Form 10-Q for the quarter ended September 30, 2026",
       "publisher": "SEC EDGAR",
       "date": "2026-11-04",
       "url": "https://www.sec.gov/Archives/edgar/data/0001737706/000173770626000033/sdrl-20260930.htm"
      },
      {
       "id": 4,
       "title": "Seadrill Limited XBRL company facts (10-Q, 2026-09-30)",
       "publisher": "SEC (data.sec.gov)",
       "date": "2026-11-04",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001737706.json"
      },
      {
       "id": 5,
       "title": "Seadrill Third Quarter 2026 Results (press release)",
       "publisher": "SEC EDGAR",
       "date": "2026-11-03",
       "url": "https://www.sec.gov/Archives/edgar/data/1737706/000173770626000029/seadrillpressreleaseq32026.htm"
      },
      {
       "id": 6,
       "title": "Seadrill 10-Q for the quarter ended 2026-09-30",
       "publisher": "SEC EDGAR",
       "date": "2026-11-03",
       "url": "https://www.sec.gov/Archives/edgar/data/1737706/000173770626000033/sdrl-20260930.htm"
      }
     ]
    },
    {
     "name_kr": "보르 드릴링",
     "name_en": "Borr Drilling Limited",
     "ticker": "BORR",
     "yahoo": "BORR",
     "exchange": "NYSE",
     "country": "버뮤다",
     "cik": null,
     "role_kr": "잭업만 운영하는 천해 시추사로, 천해 유전 개발 활동을 보여준다.",
     "period": "2026년 2분기(3분기 미발표)",
     "period_end": "2026-06-30",
     "report_date": "2026-08-11",
     "status": "not_yet",
     "highlights": [
      {
       "text": "3분기 실적은 11월 7일 현재 나오지 않았고 회사 공지 일정도 확인되지 않았다. Public.com은 다음 컨퍼런스콜을 11월 18일로 추정하며, 전년 3분기 실적 6-K는 2025년 11월 5일 제출됐다.",
       "src": [
        1,
        6
       ]
      },
      {
       "text": "2분기 매출은 2억 3,230만 달러로 1분기 대비 6%(1,470만 달러), 전년 동기 2억 6,770만 달러 대비 13.2% 줄었고, 조정 EBITDA는 4,380만 달러로 1분기 대비 4,470만 달러 감소했다.",
       "src": [
        2,
        3
       ]
      },
      {
       "text": "2분기 순손실 2억 4,140만 달러(주당 -0.79달러)는 차입금 조기상환 손실 1억 7,630만 달러가 대부분이며, 차입금 22억 9,310만 달러를 상환하고 22억 9,130만 달러를 새로 조달했고, 6월 말 장기부채 24억 8,530만 달러 중 20억 2,690만 달러가 5년 이후 만기다.",
       "src": [
        2
       ]
      },
      {
       "text": "경영진은 3분기 평균 가동 리그를 약 23기로 제시하고 전환 리그 복귀와 Odin의 미국 걸프 작업 개시로 EBITDA가 전분기 대비 큰 폭으로 개선된다고 봤다. Odin 준비 비용은 600만~900만 달러다.",
       "src": [
        4
       ]
      },
      {
       "text": "29기 중 24기가 계약 또는 확정 상태이고 2026년 계약 커버리지는 73%, 평균 일일용선료는 약 13만 4,000달러이며, 연초 이후 계약 21건(약 4,350일, 일일용선료 환산 수주잔고 5억 4,100만 달러)을 확보했다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "9월 30일 계약 공시에서 Norve는 서아프리카 3공 확정(2026년 12월 중순 시작, 약 245일, 옵션 약 175일)으로 2027년 8월까지, Natt는 Shell 나이지리아 옵션 1공 행사로 2027년 8월 초까지 일감을 확보했고, Joro는 영국 숙박 지원 60일(옵션 56일) 계약을 받았다.",
       "src": [
        5
       ]
      },
      {
       "text": "멕시코 합작사는 잭업 5기를 2억 8,700만 달러에 인수했고 이 중 3기가 계약 또는 가동 중이며, 6월 말 총유동성은 4억 7,360만 달러, 현금은 2억 2,360만 달러다.",
       "src": [
        2,
        4
       ]
      },
      {
       "text": "10월 24일 가봉 해상에서 잭업 리그 Prospector 5가 프리로드 중 지반 관입(펀치스루)으로 침몰해 승선 115명 중 4명이 숨지고 1명이 실종됐다(10월 25일·29일·11월 2일 6-K).",
       "src": [
        7,
        8,
        9
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "232.3",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "전년 대비 -13.2%",
       "src": 2
      },
      {
       "label": "조정 EBITDA",
       "value": "43.8",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "전분기 대비 -50.5%",
       "src": 3
      },
      {
       "label": "영업이익",
       "value": "0.3",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "전년 동기 96.5백만 달러",
       "src": 2
      },
      {
       "label": "순손실",
       "value": "-241.4",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "전년 동기 +35.1백만 달러",
       "src": 2
      },
      {
       "label": "희석 EPS",
       "value": "-0.79",
       "unit": "달러",
       "period": "2026년 2분기",
       "change": "전년 동기 +0.14달러",
       "src": 2
      },
      {
       "label": "채무 소멸 손실",
       "value": "-176.3",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "",
       "src": 2
      },
      {
       "label": "영업현금흐름",
       "value": "-21.8",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "",
       "src": 2
      },
      {
       "label": "리그 투자(capex)",
       "value": "8.3",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "",
       "src": 2
      },
      {
       "label": "2026년 계약 커버리지",
       "value": "73",
       "unit": "%",
       "period": "2026년 2분기 말",
       "change": "",
       "src": 3
      },
      {
       "label": "2026년 계약분 평균 일일용선료",
       "value": "약 134,000",
       "unit": "달러/일",
       "period": "2026년 2분기 말",
       "change": "",
       "src": 3
      },
      {
       "label": "계약·확정 리그",
       "value": "24/29",
       "unit": "기",
       "period": "2026년 2분기 발표",
       "change": "",
       "src": 4
      },
      {
       "label": "연초 이후 신규 계약(21건, 약 4,350일)",
       "value": "541",
       "unit": "백만 달러",
       "period": "2026년 2분기 발표",
       "change": "",
       "src": 3
      },
      {
       "label": "3분기 평균 가동 리그(회사 전망)",
       "value": "약 23",
       "unit": "기",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "총유동성",
       "value": "473.6",
       "unit": "백만 달러",
       "period": "2026-06-30 기준",
       "change": "",
       "src": 4
      },
      {
       "label": "장기부채",
       "value": "2,485.3",
       "unit": "백만 달러",
       "period": "2026-06-30 기준",
       "change": "",
       "src": 2
      }
     ],
     "guidance": [],
     "read_through": {
      "text": "경영진 전망 기준 천해 잭업 일감은 2분기를 저점으로 회복된다. 경영진은 3분기 평균 가동 리그 약 23기와 EBITDA 반등을 제시했고 2026년 계약 커버리지는 73%(평균 약 13만 4,000달러/일)다. 3분기 실적으로는 아직 확인되지 않았다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "SEC EDGAR filing index: Borr Drilling 6-K list (latest 2026-11-02; Q3 2025 results 6-K 2025-11-05; Q2 2026 6-K with XBRL 2026-08-12)",
       "publisher": "SEC (data.sec.gov)",
       "date": "2026-11-02",
       "url": "https://data.sec.gov/submissions/CIK0001715497.json"
      },
      {
       "id": 2,
       "title": "Borr Drilling Limited XBRL company facts (6-K, 2026-06-30)",
       "publisher": "SEC (data.sec.gov)",
       "date": "2026-08-12",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001715497.json"
      },
      {
       "id": 3,
       "title": "Borr Drilling Limited Q2 2026 results (Form 6-K Ex. 99.1)",
       "publisher": "Borr Drilling / SEC EDGAR",
       "date": "2026-08-13",
       "url": "https://www.sec.gov/Archives/edgar/data/0001715497/000114036126032598/ef20080031_ex99-1.htm"
      },
      {
       "id": 4,
       "title": "Borr Drilling Q2 Earnings Call Highlights",
       "publisher": "MarketBeat",
       "date": "2026-08-12",
       "url": "https://www.marketbeat.com/instant-alerts/borr-drilling-q2-earnings-call-highlights-2026-08-12/"
      },
      {
       "id": 5,
       "title": "Borr Drilling Limited - Contracting Updates",
       "publisher": "Borr Drilling (Nasdaq 게재)",
       "date": "2026-09-30",
       "url": "https://www.nasdaq.com/press-release/borr-drilling-limited-contracting-updates-2026-09-30"
      },
      {
       "id": 6,
       "title": "BORR Earnings: Latest Report, Earnings Call & Financials (next earnings call estimate, 2026-11-07 조회)",
       "publisher": "Public.com",
       "date": "2026-11-07",
       "url": "https://public.com/stocks/borr/earnings"
      },
      {
       "id": 7,
       "title": "Borr Drilling 6-K Ex.99.1: Prospector 5 사고 공지",
       "publisher": "SEC EDGAR",
       "date": "2026-10-25",
       "url": "https://www.sec.gov/Archives/edgar/data/1715497/000114036126040699/ef20084379_ex99-1.htm"
      },
      {
       "id": 8,
       "title": "Borr Drilling 6-K Ex.99.1: Prospector 5 사고 후속 공지",
       "publisher": "SEC EDGAR",
       "date": "2026-10-29",
       "url": "https://www.sec.gov/Archives/edgar/data/1715497/000114036126041261/ef20084574_ex99-1.htm"
      },
      {
       "id": 9,
       "title": "Borr Drilling 6-K Ex.99.1: Prospector 5 사고 후속 공지",
       "publisher": "SEC EDGAR",
       "date": "2026-11-02",
       "url": "https://www.sec.gov/Archives/edgar/data/1715497/000114036126041400/ef20084775_ex99-1.htm"
      }
     ]
    },
    {
     "name_kr": "테크닙FMC",
     "name_en": "TechnipFMC plc",
     "ticker": "FTI",
     "yahoo": "FTI",
     "exchange": "NYSE",
     "country": "영국",
     "cik": 1681459,
     "role_kr": "해저 생산 시스템(트리·매니폴드·해저 배관)을 설계·제작·설치하는 해저 장비 업체로, 심해 개발 최종투자결정(FID)이 먼저 수주로 잡힌다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-29",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 매출은 28억 9,580만 달러로 전년 동기 대비 9.4% 늘었고, 조정 EBITDA는 6억 2,780만 달러(마진 21.7%, 환손실 860만 달러 제외 시 6억 3,640만 달러)다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "해저(Subsea) 매출은 26억 달러로 2분기 대비 4.5%, 해저 조정 EBITDA는 6억 1,160만 달러(마진 23.5%)로 6% 늘었다.",
       "src": [
        1
       ]
      },
      {
       "text": "3분기 해저 수주는 20억 5,150만 달러로 2분기 25억 710만 달러 대비 18.2%, 전년 동기 23억 8,150만 달러 대비 13.9% 줄었고(해저 수주/매출 0.8배), 전사 수주는 23억 1,950만 달러다.",
       "src": [
        1
       ]
      },
      {
       "text": "9월 말 해저 수주잔고는 154억 8,700만 달러로 6월 말 158억 3,320만 달러 대비 2.2% 줄었고(환율 효과에 따른 증가 2억 200만 달러 포함), 전사 수주잔고는 160억 6,580만 달러다.",
       "src": [
        1
       ]
      },
      {
       "text": "해저 수주에는 통합 프로젝트(iEPCI) 3건이 들어 있고 PETRONAS의 Limbayong 프로젝트가 포함됐으며, Chevron Gorgon 3단계 첫 Subsea 2.0 트리와 ExxonMobil 가이아나 200번째 해저 트리를 납품했다.",
       "src": [
        1
       ]
      },
      {
       "text": "영업이익은 5억 6,400만 달러로 전년 동기 대비 28.7%, 순이익은 4억 1,840만 달러(희석 EPS 1.05달러)로 35.1% 늘었다.",
       "src": [
        3
       ]
      },
      {
       "text": "3분기 잉여현금흐름은 4억 7,000만 달러(영업현금흐름 5억 3,070만 달러, capex 6,100만 달러), 9개월 누적 12억 달러이고, 9개월 주주환원은 11억 달러로 잉여현금흐름의 86%이며 3분기에는 자사주 매입 3억 2,000만 달러를 포함해 3억 4,000만 달러를 환원했다.",
       "src": [
        1,
        2,
        3
       ]
      },
      {
       "text": "Surface Technologies 부문 3분기 매출은 2억 9,580만 달러, 조정 EBITDA는 5,330만 달러다.",
       "src": [
        4
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "2,895.8",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +9.4%",
       "src": 3
      },
      {
       "label": "조정 EBITDA",
       "value": "627.8",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "조정 EBITDA 마진",
       "value": "21.7",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "해저 매출",
       "value": "약 2,600",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +4.5%",
       "src": 1
      },
      {
       "label": "해저 조정 EBITDA",
       "value": "611.6",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +6%",
       "src": 1
      },
      {
       "label": "해저 조정 EBITDA 마진",
       "value": "23.5",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "해저 수주",
       "value": "2,051.5",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 -18.2%, 전년 대비 -13.9%",
       "src": 1
      },
      {
       "label": "해저 수주/매출",
       "value": "0.8",
       "unit": "배",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "전사 수주",
       "value": "2,319.5",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "해저 수주잔고",
       "value": "15,487.0",
       "unit": "백만 달러",
       "period": "2026-09-30 기준",
       "change": "전분기 대비 -2.2%",
       "src": 1
      },
      {
       "label": "전사 수주잔고",
       "value": "16,065.8",
       "unit": "백만 달러",
       "period": "2026-09-30 기준",
       "change": "",
       "src": 1
      },
      {
       "label": "영업이익",
       "value": "564.0",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +28.7%",
       "src": 3
      },
      {
       "label": "순이익",
       "value": "418.4",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +35.1%",
       "src": 3
      },
      {
       "label": "희석 EPS",
       "value": "1.05",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +40.0%",
       "src": 3
      },
      {
       "label": "영업현금흐름",
       "value": "530.7",
       "unit": "백만 달러",
       "period": "2026년 3분기(9개월 누적−상반기 누적)",
       "change": "",
       "src": 3
      },
      {
       "label": "capex",
       "value": "61.0",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      },
      {
       "label": "잉여현금흐름",
       "value": "470",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "자사주 매입",
       "value": "320.0",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      }
     ],
     "guidance": [
      {
       "text": "2026년 해저 매출 가이던스를 96억~98억 달러로 올렸고, 2026년 해저 수주 100억 달러 목표는 유지했다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "2027년 해저 가이던스는 매출 100억~104억 달러, 조정 EBITDA 마진 22.5~24.0%로 처음 제시했고, 나머지 2027년 가이던스는 4분기 실적 때 낸다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "향후 5개 분기 해저 수주는 2027년 기대분을 포함해 최소 145억 달러로 제시했고, 2027년 해저 증분 마진은 50%에 가까워진다고 밝혔다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "2026년 잉여현금흐름 가이던스를 14억 5,000만~15억 5,000만 달러로 올렸다(기존 13억~14억 5,000만 달러).",
       "src": [
        4
       ]
      }
     ],
     "read_through": {
      "text": "심해 개발 FID 흐름은 3분기에 약했지만 회사는 2027년까지 발주 확대를 예상한다. 해저 수주가 20억 5,150만 달러로 수주/매출 0.8배에 그쳐 해저 잔고가 2.2% 줄었으나, 향후 5개 분기 해저 수주 최소 145억 달러와 2027년 해저 매출 100억~104억 달러를 제시했다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "TechnipFMC Announces Third-Quarter 2026 Results (Form 8-K Ex. 99.1)",
       "publisher": "TechnipFMC / SEC EDGAR",
       "date": "2026-10-29",
       "url": "https://www.sec.gov/Archives/edgar/data/0001681459/000168145926000050/technipfmc2026930-8kerex.htm"
      },
      {
       "id": 2,
       "title": "TechnipFMC (FTI) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-29",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/29/technipfmc-fti-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 3,
       "title": "TechnipFMC plc XBRL company facts (10-Q, 2026-09-30)",
       "publisher": "SEC (data.sec.gov)",
       "date": "2026-10-29",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001681459.json"
      },
      {
       "id": 4,
       "title": "TechnipFMC Q3 2026 earnings release (8-K Ex.99.1)",
       "publisher": "SEC EDGAR",
       "date": "2026-10-29",
       "url": "https://www.sec.gov/Archives/edgar/data/1681459/000168145926000050/technipfmc2026930-8kerex.htm"
      }
     ]
    },
    {
     "name_kr": "SBM 오프쇼어",
     "name_en": "SBM Offshore N.V.",
     "ticker": "SBMO",
     "yahoo": "SBMO.AS",
     "exchange": "Euronext Amsterdam",
     "country": "네덜란드",
     "cik": null,
     "role_kr": "FPSO를 임대·운영하는 Lease and Operate 사업과 Turnkey 사업을 하는 FPSO 운영사로, 자산 판매 후 운영 서비스가 남는 경우도 있다.",
     "period": "2025년 연간(Annual Report 2025)",
     "period_end": "2025-12-31",
     "report_date": "",
     "status": "reported",
     "highlights": [
      {
       "text": "2025년 말 운영 선대는 FPSO 16기다(생산·처리·저장 설비 기준).",
       "src": [
        1
       ]
      },
      {
       "text": "Lease and Operate 매출 변화에는 신규 인도, 자산 거래, 임대 종료 후 O&M 전환이 함께 반영됐다.",
       "src": [
        1
       ]
      },
      {
       "text": "IFRS 매출에는 금융리스·연결회계가, Directional 매출에는 운영리스 가정과 지분 기준 조정이 들어가 두 수치의 기준이 다르다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "운영 선대",
       "value": "16",
       "unit": "FPSO",
       "period": "2025년 말",
       "change": "",
       "src": 1
      },
      {
       "label": "IFRS Lease and Operate 매출",
       "value": "2,398",
       "unit": "백만 달러",
       "period": "2025년",
       "change": "2024년 2,074",
       "src": 1
      },
      {
       "label": "Directional Lease and Operate 매출",
       "value": "2,295",
       "unit": "백만 달러",
       "period": "2025년",
       "change": "2024년 2,369",
       "src": 1
      }
     ],
     "guidance": [],
     "read_through": {
      "text": "",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "SBM Offshore Annual Report 2025: Operations, 177–179, 200–202, 214–219, 228–229쪽",
       "publisher": "SBM Offshore",
       "date": "",
       "url": "https://www.sbmoffshore.com/wp-content/uploads/2026/02/SBM-Offshore-Annual-Report-2025.pdf"
      }
     ]
    }
   ]
  },
  {
   "id": "land_drilling",
   "title": "육상 시추·완결",
   "position": "육상 시추·완결은 셰일 유정의 시추와 수압파쇄를 맡는 상류 서비스 구간이다.",
   "summary": [
    "미국 리그 수는 1년 전보다 원유 중심으로 늘었다. 베이커휴즈 2026-11-06 주간 미국 리그는 604기(원유 463기, 가스 131기, 퍼미안 273기)로 2025-11-07 548기보다 56기(원유 +49기, 가스 +3기) 많다. 캐나다는 223기로 1년 전 191기보다 32기, 해외(월간)는 10월 1,111기로 전년 동월 대비 52기 늘었다 (Baker Hughes 집계: Oil & Gas 360 2026-11-06 주간, 1년 전 수치 SteelOrbis 2025년 11월 주간 기사, 해외 수치 rigcount.bakerhughes.com 요약).",
    "시추사 가동 리그도 늘었다. 패터슨-UTI 3분기 평균 가동 리그는 101기(전분기 대비 +9%), 네이버스 Lower 48은 72.8기(2분기 67.8기), 프리시전은 캐나다 73기(전년 대비 +16%)·미국 43기(2분기 35기)였다. H&P는 7~9월 북미 145~151기를 가이던스로 제시했다 (PTEN 1, Nabors 1, Precision 1, Precision 3, H&P 1).",
    "리그·프랙 가격은 함께 오르고 있다. 패터슨-UTI 평균 일일 리그 단가는 3만 달러 초반에서 중반으로, 완결 가격은 전분기 대비 한 자릿수 중반 % 올랐다. 리버티는 꽉 찬 작업 일정 속 소폭 가격 인상을, 프로페트로는 가스 연소 플릿의 가격 프리미엄을 확인했다 (PTEN 3, PTEN 1, Liberty 4, ProPetro 4).",
    "설비 측 공급 탄력성은 낮다. 패터슨-UTI는 현 가격에서 경제적으로 재가동할 수 있는 리그를 8~10기로, 프리시전은 2027년 미국 재가동을 한 자릿수로 제시했다. 프랙 업체 3분기 투자는 발전 부문에 집중돼 리버티 순설비투자 6억 2,200만 달러 중 약 4억 5,000만 달러, 프로페트로 발생 기준 1억 7,100만 달러 중 약 1억 2,800만 달러가 발전 관련이었다 (PTEN 2, Precision 2, Liberty 3, ProPetro 3).",
    "중동 분쟁은 해외 육상 시추를 줄이고 있다. 사우디에서 업계 전체 최대 15기 육상 리그(네이버스 SANAD 5기 포함)가 가동 중단 통보를 받았다. H&P는 호르무즈 해협 봉쇄 지속을 전제로 분기 600만 달러 영향을 가정한 뒤 이라크·바레인 리그 중단을 보고했고, 프리시전 해외 일일 단가는 전년 대비 14% 낮아졌다 (Nabors 2, H&P 3, H&P 2, Precision 2).",
    "경영진은 2027년 미국 육상 수요 증가를 예상한다. 패터슨-UTI는 리그 추가 재가동과 완결 수요 증가를, 네이버스는 연환산 조정 EBITDA 약 10억 달러로의 진입을 제시했다. 리버티는 4분기 계절 감소가 예년보다 작고 고객 예산 소진 신호가 없다고 밝혔고, 프로페트로는 플릿 약 절반을 2027년에 재계약한다 (PTEN 3, Nabors 3, Liberty 4, ProPetro 5)."
   ],
   "open_items": [
    "보도자료·녹취록은 원문 미열람이며, 수치는 발췌문과 SEC XBRL(data.sec.gov)로 확인했다.",
    "베이커휴즈 리그 수 출처는 2026-11-06 주간 https://www.oilandgas360.com/baker-hughes-rig-count-11-6/ , 1년 전 https://www.steelorbis.com/steel-news/latest-news/us-rig-count-and-canadian-rig-count-both-increase-week-46-2025-1418883.htm , 해외 https://rigcount.bakerhughes.com/ 다. RBN Energy는 같은 주 미국 리그를 1년 전보다 58기 많다고 집계해 56기와 차이가 있다.",
    "베이커휴즈 해외 리그는 월간 집계이며 10월 지역별(중동 등) 수치와 10월 전 세계 합계는 미확인이다. 캐나다 1년 전 비교(+32기)는 2025-11-07 191기 기준 계산치다.",
    "H&P의 역년 3분기(회계연도 4분기, 7~9월) 실적은 2026-11-19 컨퍼런스콜에서 발표 예정이다.",
    "네이버스 3분기 설비투자는 요약 자료 1억 4,100만 달러와 10-Q 현금흐름표 기준 1억 7,024만 달러(1~9월 4억 6,080만 달러 - 상반기 2억 9,057만 달러)가 달라 분기 수치를 싣지 않았다. SANAD 3분기 말 가동 리그(53기 대 56기)도 출처마다 다르다.",
    "패터슨-UTI의 미국 계약 시추 일일 매출·일일 조정 매출총이익 정확치, 활성 프랙 플릿 수는 미확인이다.",
    "프리시전의 가동일당 매출·일일 영업마진 비교치(캐나다 3만 4,193캐나다달러, 미국 3만 1,040달러·8,700달러)는 보도자료 기준 전년 동기(2025년 3분기) 수치이고, 3분기 희석 EPS는 1.65캐나다달러다. 순부채 목표 수치와 미국 4분기 가동 리그 가이던스는 미확인이다.",
    "리버티의 활성 프랙 플릿 수는 미확인이다. 요약 자료에 나온 '업계 증분 크루 15~18개'와 '고객 연료비 연 10억 달러 이상 절감'은 맥락이 불분명해 싣지 않았다.",
    "프로페트로 EPS는 출처에 따라 0.09달러와 0.90달러로 다르며, 10-Q XBRL 값 0.09달러를 채택했다.",
    "가스 지향 대 원유 지향 활동의 근거는 베이커휴즈 집계(원유 463기·가스 131기)뿐이며, 시추사별 헤인즈빌·퍼미안 코멘트는 미확인이다.",
    "TradingKey·Benzinga 녹취록은 게시일이 확인되지 않아 출처 날짜가 컨퍼런스콜 일자이고, ROIC.AI H&P 녹취록도 콜 일자(2026-08-06)다."
   ],
   "companies": [
    {
     "name_kr": "패터슨-UTI 에너지",
     "name_en": "Patterson-UTI Energy, Inc.",
     "ticker": "PTEN",
     "yahoo": "PTEN",
     "exchange": "NASDAQ",
     "country": "미국",
     "cik": 889900,
     "role_kr": "미국 육상 시추 리그, 수압파쇄·완결 서비스, 드릴비트(드릴링 프로덕츠)를 함께 운영하는 유전 서비스 업체다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-28",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기는 가동 리그 증가와 가격 인상으로 흑자 전환했으며, 매출 13억 4,223만 달러(전분기 대비 +9.3%, 전년 대비 +14.1%), 순이익 2,835만 달러(2분기 -1,960만 달러, 전년 동기 -3,640만 달러), 조정 EBITDA 2억 6,400만 달러를 기록했고 순이익에는 리그 13기(콜롬비아 철수 관련 3기, 미국 비마케팅 리그 10기) 매각 차익 약 2,210만 달러가 포함됐다.",
       "src": [
        6,
        1
       ]
      },
      {
       "text": "시추 부문은 가동률과 일일 매출이 함께 올라 매출 4억 1,700만 달러, 조정 매출총이익 1억 4,900만 달러를 냈으며, 미국 계약 시추 운영일수 9,249일, 평균 가동 리그 101기(전분기 대비 +9%), 분기 말 104기, 9월 평균 103기였다.",
       "src": [
        1,
        5
       ]
      },
      {
       "text": "리그 추가 공급 여력은 제한적이며, 경영진은 평균 일일 단가가 3만 달러 초반에서 중반으로 올랐으나 현 가격에서 경제적으로 재가동할 수 있는 리그는 8~10기뿐이고 그 이상은 가격이 더 올라야 한다고 밝혔다.",
       "src": [
        3,
        2
       ]
      },
      {
       "text": "완결(프랙) 가격은 회복 초기 단계이며, 부문 매출 8억 800만 달러, 조정 매출총이익 1억 3,300만 달러에 가격이 2분기 대비 한 자릿수 중반 % 올랐고, 경영진은 지난 3년간 약 30% 하락한 가격 가운데 약 3분의 1을 되찾았다고 평가했다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "천연가스 구동 프랙 장비 수급이 빠듯하며, 다이렉트 드라이브 신규 장비 리드타임은 자가발전(behind-the-meter) 설비와 제조 능력을 공유해 1년을 넘고, 경영진은 디젤 가격 상승이 가스 구동 장비 수요를 키운다고 설명했다.",
       "src": [
        2,
        3,
        4
       ]
      },
      {
       "text": "드릴링 프로덕츠는 매출 1억 1,000만 달러, 조정 매출총이익 5,100만 달러로 2023년 Ulterra 인수 이후 최대를 기록했으나, 4분기에는 사우디 활동 감소로 조정 매출총이익이 3분기 대비 5~10% 줄어든다고 제시했다.",
       "src": [
        1
       ]
      },
      {
       "text": "현금 배분은 투자 절제 기조이며, 3분기 설비투자 1억 4,135만 달러, 주주환원 약 6,200만 달러(자사주 2,421만 달러, 배당 3,809만 달러)를 집행했고 분기 배당 주당 0.10달러를 12월 15일 지급한다.",
       "src": [
        6,
        1
       ]
      },
      {
       "text": "경영진은 2027년 수요 증가를 예상하며, 기존 계약과 2026년 예산 편성 당시보다 높은 원유 선물 가격을 반영한 고객 예산 재설정으로 리그 추가 재가동과 완결 수요 증가가 나타나고 원유 지향 활동이 2027년으로 갈수록 강해진다고 밝혔다.",
       "src": [
        2,
        3,
        4
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "1,342.2",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +9.3%, 전년 대비 +14.1%",
       "src": 6
      },
      {
       "label": "조정 EBITDA",
       "value": "264",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "영업이익",
       "value": "63.3",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 -28.1",
       "src": 6
      },
      {
       "label": "순이익(지배주주)",
       "value": "28.4",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "2분기 -19.6, 전년 동기 -36.4 (흑자 전환)",
       "src": 6
      },
      {
       "label": "희석 EPS",
       "value": "0.07",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 동기 -0.10",
       "src": 6
      },
      {
       "label": "시추 부문 매출",
       "value": "417",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "시추 부문 조정 매출총이익",
       "value": "149",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "미국 계약 시추 평균 가동 리그",
       "value": "101",
       "unit": "기",
       "period": "2026년 3분기",
       "change": "전분기 대비 +9%",
       "src": 1
      },
      {
       "label": "미국 계약 시추 운영일수",
       "value": "9,249",
       "unit": "일",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "분기 말 가동 리그",
       "value": "104",
       "unit": "기",
       "period": "2026년 9월 말",
       "change": "",
       "src": 1
      },
      {
       "label": "미국 평균 가동 리그(월간)",
       "value": "103",
       "unit": "기",
       "period": "2026년 9월",
       "change": "",
       "src": 5
      },
      {
       "label": "완결 부문 매출",
       "value": "808",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "완결 부문 조정 매출총이익",
       "value": "133",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "완결 가격",
       "value": "한 자릿수 중반 % 상승",
       "unit": "",
       "period": "2026년 3분기",
       "change": "2분기 대비",
       "src": 1
      },
      {
       "label": "드릴링 프로덕츠 매출",
       "value": "110",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "드릴링 프로덕츠 조정 매출총이익",
       "value": "51",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "2023년 Ulterra 인수 이후 최대",
       "src": 1
      },
      {
       "label": "설비투자",
       "value": "141.4",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 6
      },
      {
       "label": "주주환원(자사주+배당)",
       "value": "약 62 (자사주 24 포함)",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "4분기 미국 평균 가동 리그는 약 104기, 분기 말은 이를 웃돌 전망이며 2027년 1분기 추가 재가동을 예상한다.",
       "src": [
        1
       ]
      },
      {
       "text": "4분기 조정 매출총이익은 시추 약 1억 5,000만 달러, 완결 약 1억 4,000만 달러(활동 3분기와 유사, 추가 가격 인상 반영), 드릴링 프로덕츠 3분기 대비 5~10% 감소, 기타 부문 3분기와 유사로 제시했다.",
       "src": [
        1
       ]
      },
      {
       "text": "2026년 설비투자는 자산매각 수입 차감 후 6억 달러 미만이며, 잉여현금흐름은 4분기에도 견조하고 2027년에 2026년 대비 뚜렷하게 늘어난다고 밝혔다.",
       "src": [
        2,
        1
       ]
      },
      {
       "text": "신규 장비 투자는 가격과 계약 구조가 자본비용을 크게 웃도는 수익률을 뒷받침할 때까지 늘리지 않는다는 입장이다.",
       "src": [
        3,
        2
       ]
      }
     ],
     "read_through": {
      "text": "2027년 미국 육상 활동 증가는 서비스 가격 상승을 동반해야 실현되며, 패터슨-UTI의 저비용 재가동 여력은 8~10기, 가스 구동 프랙 장비 리드타임은 1년 이상이다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Patterson-UTI Energy Reports Financial Results for the Quarter Ended September 30, 2026",
       "publisher": "Newswire (Patterson-UTI 보도자료)",
       "date": "2026-10-28",
       "url": "https://www.newswire.com/news/patterson-uti-energy-reports-financial-results-for-the-quarter-ended-4618616"
      },
      {
       "id": 2,
       "title": "Patterson-UTI (PTEN) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-29",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/29/patterson-uti-pten-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 3,
       "title": "Patterson-UTI (PTEN) Q3 2026 Earnings Call: Pricing Gains and 2027 Demand",
       "publisher": "TradingKey",
       "date": "2026-10-29",
       "url": "https://www.tradingkey.com/news/transcripts/262259143-"
      },
      {
       "id": 4,
       "title": "Patterson-UTI Energy Q3 2026 Earnings Call Transcript",
       "publisher": "Benzinga",
       "date": "2026-10-29",
       "url": "https://www.benzinga.com/news/26/10/62703917/patterson-uti-energy-q3-2026-earnings-call-transcript"
      },
      {
       "id": 5,
       "title": "Patterson-UTI Reports Drilling Activity for September 2026",
       "publisher": "Nasdaq (Patterson-UTI 보도자료)",
       "date": "2026-10-09",
       "url": "https://www.nasdaq.com/press-release/patterson-uti-reports-drilling-activity-september-2026-2026-10-09"
      },
      {
       "id": 6,
       "title": "Patterson-UTI Energy XBRL company facts (Form 10-Q, 2026-09-30 분기)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-02",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0000889900.json"
      }
     ]
    },
    {
     "name_kr": "헬머리치 앤 페인",
     "name_en": "Helmerich & Payne, Inc.",
     "ticker": "HP",
     "yahoo": "HP",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 46765,
     "role_kr": "미국 최대 육상 시추 리그(FlexRig) 운영사로 중동·남미 해외 육상과 해상 시추를 함께 운영한다.",
     "period": "2026회계연도 3분기(2026년 4~6월, 최근 발표 분기)",
     "period_end": "2026-06-30",
     "report_date": "2026-08-05",
     "status": "not_yet",
     "highlights": [
      {
       "text": "역년 3분기에 해당하는 2026회계연도 4분기(7~9월) 실적은 아직 발표 전으로 2026-11-19 컨퍼런스콜이 예정돼 있으며, 10월 7일 예비 발표에서 북미·해외·해상 세 부문 직접마진이 모두 기존 가이던스 상단 또는 그 부근이라고 밝혔다.",
       "src": [
        5,
        4
       ]
      },
      {
       "text": "최근 발표 분기인 회계연도 3분기(4~6월) 매출은 10억 3,486만 달러로 전분기 대비 11.0% 늘었고, 순이익 7,568만 달러(희석 EPS 0.74달러)에는 Utica Square 매각 차익 약 1억 1,500만 달러가 포함돼 조정 EPS는 -0.11달러, 조정 EBITDA는 2억 3,600만 달러다.",
       "src": [
        6,
        1
       ]
      },
      {
       "text": "북미 육상은 가동과 마진이 함께 개선됐으며, 직접마진 2억 4,100만 달러(전분기 2억 1,500만 달러), 일일 직접마진 1만 8,669달러, 가동 리그 142기를 기록했고 민간 운영사 수요에 리그 10기를 추가 투입하면서 일일 마진을 전분기 대비 1,000달러 이상 높였다.",
       "src": [
        1
       ]
      },
      {
       "text": "중동 분쟁으로 해외 가동이 지연됐으며, 이라크·바레인 리그는 분기 중 중단 상태가 이어졌고 사우디 재가동은 계획보다 늦어 분기 말 4기만 완전 재가동, 5번째 리그는 4분기 초 시추를 시작했으며 바레인 리그 2기는 회계연도 4분기 중 재가동됐다.",
       "src": [
        2,
        7
       ]
      },
      {
       "text": "해외 직접마진은 약 3,100만 달러(전분기 1,100만 달러), 평균 가동 리그 65기이며, 아르헨티나 바카 무에르타에서 FlexRig 9기가 가동 중이고 미국에서 수출할 3기를 포함해 5기 신규 계약을 확보했다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "호르무즈 해협 봉쇄는 회사 가정에 직접 반영됐으며, 회계연도 2분기 실적 발표(5월) 때 해협이 사실상 봉쇄된 상태가 이어진다는 전제로 3분기 600만 달러의 실적 영향을 가정했다.",
       "src": [
        3
       ]
      },
      {
       "text": "해상 부문은 직접마진 2,900만 달러로 해상 리그 3기와 관리 계약 30건이 가동됐다.",
       "src": [
        1
       ]
      },
      {
       "text": "경영진은 고객 협의와 계약 동향을 근거로 2027회계연도 직접마진이 2026회계연도를 웃돈다고 봤다.",
       "src": [
        4
       ]
      },
      {
       "text": "10월 7일 예비 발표(8-K)에서 역년 3분기 해외 직접마진을 약 4,500만 달러로 제시했다.",
       "src": [
        8
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "1,034.9",
       "unit": "백만 달러",
       "period": "2026회계연도 3분기(4~6월)",
       "change": "전분기 대비 +11.0%, 전년 대비 -0.6%",
       "src": 6
      },
      {
       "label": "조정 EBITDA",
       "value": "236",
       "unit": "백만 달러",
       "period": "2026회계연도 3분기(4~6월)",
       "change": "",
       "src": 1
      },
      {
       "label": "영업이익(Utica Square 매각 차익 포함)",
       "value": "188.2",
       "unit": "백만 달러",
       "period": "2026회계연도 3분기(4~6월)",
       "change": "전년 동기 -128.3",
       "src": 6
      },
      {
       "label": "순이익",
       "value": "75.7",
       "unit": "백만 달러",
       "period": "2026회계연도 3분기(4~6월)",
       "change": "전년 동기 -162.8",
       "src": 6
      },
      {
       "label": "희석 EPS",
       "value": "0.74 (조정 -0.11)",
       "unit": "달러",
       "period": "2026회계연도 3분기(4~6월)",
       "change": "전년 동기 -1.64",
       "src": 6
      },
      {
       "label": "북미 솔루션 직접마진",
       "value": "241",
       "unit": "백만 달러",
       "period": "2026회계연도 3분기(4~6월)",
       "change": "전분기 215",
       "src": 1
      },
      {
       "label": "북미 솔루션 일일 직접마진",
       "value": "18,669",
       "unit": "달러/일",
       "period": "2026회계연도 3분기(4~6월)",
       "change": "전분기 대비 +1,000달러 이상",
       "src": 1
      },
      {
       "label": "북미 솔루션 가동 리그",
       "value": "142",
       "unit": "기",
       "period": "2026회계연도 3분기(4~6월)",
       "change": "",
       "src": 1
      },
      {
       "label": "북미 솔루션 부문 영업이익",
       "value": "140",
       "unit": "백만 달러",
       "period": "2026회계연도 3분기(4~6월)",
       "change": "",
       "src": 1
      },
      {
       "label": "해외 솔루션 직접마진",
       "value": "약 31",
       "unit": "백만 달러",
       "period": "2026회계연도 3분기(4~6월)",
       "change": "전분기 11",
       "src": 1
      },
      {
       "label": "해외 솔루션 평균 가동 리그",
       "value": "65",
       "unit": "기",
       "period": "2026회계연도 3분기(4~6월)",
       "change": "",
       "src": 1
      },
      {
       "label": "해외 솔루션 부문 영업손실",
       "value": "약 -54",
       "unit": "백만 달러",
       "period": "2026회계연도 3분기(4~6월)",
       "change": "",
       "src": 1
      },
      {
       "label": "해상 솔루션 직접마진",
       "value": "29",
       "unit": "백만 달러",
       "period": "2026회계연도 3분기(4~6월)",
       "change": "",
       "src": 1
      },
      {
       "label": "설비투자",
       "value": "69.8",
       "unit": "백만 달러",
       "period": "2026회계연도 3분기(4~6월)",
       "change": "",
       "src": 6
      },
      {
       "label": "배당 지급",
       "value": "25.4",
       "unit": "백만 달러",
       "period": "2026회계연도 3분기(4~6월)",
       "change": "",
       "src": 6
      }
     ],
     "guidance": [
      {
       "text": "회계연도 4분기(7~9월) 북미 직접마진 2억 4,500만~2억 5,500만 달러, 평균 가동 리그 145~151기를 제시했다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "4분기 해외 직접마진은 중동 분쟁 변수를 반영해 2,500만~4,500만 달러로 범위를 넓게 잡았고, 해상 직접마진은 2,600만~3,000만 달러다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "2026회계연도 설비투자는 2억 7,000만~3억 1,000만 달러(3분기 집행 지연분은 4분기로 이연), 현금 법인세는 1억 5,000만~1억 8,000만 달러다.",
       "src": [
        2
       ]
      },
      {
       "text": "2027년 말까지 순부채/조정 EBITDA 약 1배 달성과 기본 배당 유지를 재확인했다.",
       "src": [
        4
       ]
      },
      {
       "text": "2026회계연도 북미 평균 가동 리그는 140~144기다(8월 5일 가이던스 표).",
       "src": [
        9
       ]
      }
     ],
     "read_through": {
      "text": "미국 육상 리그 공급은 늘고 중동 육상 시추는 분쟁으로 차질을 빚고 있으며, H&P 북미 가동 리그는 4~6월 142기, 7~9월 가이던스 145~151기이고 이라크·바레인 리그는 중단됐다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Helmerich & Payne, Inc. Announces Fiscal Third Quarter Results",
       "publisher": "Business Wire",
       "date": "2026-08-05",
       "url": "https://www.businesswire.com/news/home/20260805462741/en/Helmerich-Payne-Inc.-Announces-Fiscal-Third-Quarter-Results"
      },
      {
       "id": 2,
       "title": "Helmerich & Payne, Inc. (HP) Q3 FY2026 Earnings Call Transcript - August 6, 2026",
       "publisher": "ROIC.AI",
       "date": "2026-08-06",
       "url": "https://www.roic.ai/quote/HP/transcripts/2026-year/3-quarter"
      },
      {
       "id": 3,
       "title": "Helmerich & Payne (HP) Q2 2026 Earnings Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-05-07",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/05/07/helmerich-payne-hp-q2-2026-earnings-transcript/"
      },
      {
       "id": 4,
       "title": "H&P Provides Fourth Quarter Financial & Operational Update",
       "publisher": "Business Wire (Morningstar 게재)",
       "date": "2026-10-07",
       "url": "https://www.morningstar.com/news/business-wire/20261007183786/hp-provides-fourth-quarter-financial-operational-update"
      },
      {
       "id": 5,
       "title": "Helmerich & Payne, Inc. Schedules Fiscal Fourth Quarter 2026 and Year End Conference Call and Webcast",
       "publisher": "Business Wire",
       "date": "2026-10-14",
       "url": "https://www.businesswire.com/news/home/20261014175282/en/Helmerich-Payne-Inc.-Schedules-Fiscal-Fourth-Quarter-2026-and-Year-End-Conference-Call-and-Webcast"
      },
      {
       "id": 6,
       "title": "Helmerich & Payne XBRL company facts (Form 10-Q, 2026-06-30 분기)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-08-06",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0000046765.json"
      },
      {
       "id": 7,
       "title": "Helmerich & Payne (HP) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-08-13",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/08/13/helmerich-payne-hp-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 8,
       "title": "Helmerich & Payne guidance update (8-K Ex.99.1)",
       "publisher": "SEC EDGAR",
       "date": "2026-10-07",
       "url": "https://www.sec.gov/Archives/edgar/data/46765/000004676526000055/a20261007guidanceupdate.htm"
      },
      {
       "id": 9,
       "title": "Helmerich & Payne fiscal Q3 2026 earnings release",
       "publisher": "SEC EDGAR",
       "date": "2026-08-05",
       "url": "https://www.sec.gov/Archives/edgar/data/46765/000004676526000039/q3fy26earningsrelease.htm"
      }
     ]
    },
    {
     "name_kr": "네이버스 인더스트리",
     "name_en": "Nabors Industries Ltd.",
     "ticker": "NBR",
     "yahoo": "NBR",
     "exchange": "NYSE",
     "country": "버뮤다",
     "cik": 1163739,
     "role_kr": "미국 Lower 48 육상 리그와 사우디 아람코 합작사 SANAD를 포함한 해외 육상 리그를 운영하는 시추 업체다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-27",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기는 해외 마진 확대로 수익성이 개선됐으며, 매출 8억 7,219만 달러(전분기 대비 +7.0%), 조정 EBITDA 2억 4,600만 달러(전분기 대비 약 +11%), 조정 잉여현금흐름 7,500만 달러를 기록했고 지배주주 순손실은 1,117만 달러다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "Lower 48은 가동과 마진이 함께 늘었으며, 평균 가동 리그 72.8기(2분기 67.8기), 분기 말 74기, 일일 조정 매출총이익 1만 4,016달러(전분기 대비 +232달러), 미국 시추 조정 EBITDA 9,900만 달러(2분기 9,400만 달러)를 기록했다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "해외 시추는 사상 최대 마진을 냈으며, 평균 가동 리그 94.9기(2분기 93.4기), 일일 조정 매출총이익 1만 9,060달러(전분기 대비 +8.7%), 조정 EBITDA 1억 4,600만 달러(2분기 1억 3,100만 달러)다.",
       "src": [
        1,
        5
       ]
      },
      {
       "text": "사우디 육상 리그는 중동 분쟁 여파로 줄고 있으며, 업계 전체 최대 15기가 가동 중단 통보를 받았고 SANAD 리그 5기가 포함되며, 4분기 현금흐름 영향은 비용 절감 후 500만~600만 달러로 가이던스에 반영됐다.",
       "src": [
        2,
        1
       ]
      },
      {
       "text": "SANAD 신조 프로그램은 분쟁에 따른 장비 지연으로 19번째 리그 가동이 2027년 1분기로 밀렸고, 5차 신조 계약 체결로 누적 25기가 확정됐다.",
       "src": [
        2
       ]
      },
      {
       "text": "Lower 48 수요는 고사양 리그 중심으로 가격 개선과 계약 기간 장기화가 동반되고 있으며, 경영진은 연환산 조정 EBITDA 약 10억 달러 수준으로 2027년에 진입한다고 밝혔다.",
       "src": [
        3,
        2
       ]
      },
      {
       "text": "현금흐름은 가이던스를 웃돌았으며, SANAD 신조 마일스톤 지급 시점 이동에 따른 설비투자 감소와 운전자본 개선이 3분기 조정 잉여현금흐름 7,500만 달러를 이끌었고 10-Q 기준 1~9월 유형자산 취득은 4억 6,080만 달러다.",
       "src": [
        1,
        4
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "872.2",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +7.0%, 전년 대비 +6.6%",
       "src": 4
      },
      {
       "label": "조정 EBITDA",
       "value": "246",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 약 +11%",
       "src": 1
      },
      {
       "label": "영업이익",
       "value": "136.8",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 110.4",
       "src": 4
      },
      {
       "label": "지배주주 순이익",
       "value": "-11.2",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "2분기 -22.3",
       "src": 4
      },
      {
       "label": "보통주 희석 EPS",
       "value": "-1.24",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "2분기 -2.04",
       "src": 4
      },
      {
       "label": "조정 잉여현금흐름",
       "value": "75",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "Lower 48 평균 가동 리그",
       "value": "72.8",
       "unit": "기",
       "period": "2026년 3분기",
       "change": "2분기 67.8",
       "src": 1
      },
      {
       "label": "Lower 48 분기 말 가동 리그",
       "value": "74",
       "unit": "기",
       "period": "2026년 9월 말",
       "change": "",
       "src": 1
      },
      {
       "label": "Lower 48 일일 조정 매출총이익",
       "value": "14,016",
       "unit": "달러/일",
       "period": "2026년 3분기",
       "change": "전분기 대비 +232달러",
       "src": 2
      },
      {
       "label": "미국 시추 조정 EBITDA",
       "value": "99",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "2분기 94",
       "src": 1
      },
      {
       "label": "해외 시추 평균 가동 리그",
       "value": "94.9",
       "unit": "기",
       "period": "2026년 3분기",
       "change": "2분기 93.4",
       "src": 1
      },
      {
       "label": "해외 시추 일일 조정 매출총이익",
       "value": "19,060",
       "unit": "달러/일",
       "period": "2026년 3분기",
       "change": "전분기 대비 +8.7% (사상 최대)",
       "src": 5
      },
      {
       "label": "해외 시추 조정 EBITDA",
       "value": "146",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "2분기 131",
       "src": 1
      },
      {
       "label": "유형자산 취득(현금흐름표)",
       "value": "460.8",
       "unit": "백만 달러",
       "period": "2026년 1~9월",
       "change": "",
       "src": 4
      }
     ],
     "guidance": [
      {
       "text": "4분기 Lower 48 평균 가동 리그 약 75기, 분기 말 76~77기, 일일 조정 매출총이익 1만 4,500~1만 4,700달러를 제시했다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "4분기 해외 평균 가동 리그 92~93기, 분기 말 92기, 일일 조정 매출총이익 약 1만 9,500달러로 SANAD 리그 감소에도 마진 개선을 예상한다.",
       "src": [
        2,
        1
       ]
      },
      {
       "text": "2026년 설비투자는 7억 1,000만~7억 2,000만 달러(SANAD 신조 2억 9,500만~3억 500만 달러), 4분기는 2억 5,000만~2억 6,000만 달러(SANAD 신조 1억 4,000만~1억 5,000만 달러)다.",
       "src": [
        2
       ]
      },
      {
       "text": "2026년 조정 잉여현금흐름은 1억~1억 1,000만 달러, 4분기는 6,000만~7,000만 달러(SANAD 현금 소요 약 2,000만 달러 포함)로 제시했다.",
       "src": [
        2
       ]
      }
     ],
     "read_through": {
      "text": "리그 공급 증분은 미국 Lower 48에서 나오고 사우디는 감소하고 있으며, 네이버스 가이던스 기준 Lower 48 리그는 3분기 평균 72.8기에서 4분기 약 75기로 늘고 해외 리그는 94.9기에서 92~93기로 줄어든다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Record International Drilling Margin. $75 Million in Adjusted Free Cash Flow. Nabors Reports Third Quarter 2026 Results.",
       "publisher": "Nabors Industries IR",
       "date": "2026-10-27",
       "url": "https://investor.nabors.com/2026-10-27-Record-International-Drilling-Margin-75-Million-in-Adjusted-Free-Cash-Flow-Nabors-Reports-Third-Quarter-2026-Results"
      },
      {
       "id": 2,
       "title": "Nabors (NBR) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-28",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/28/nabors-nbr-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 3,
       "title": "Nabors Industries Q3 Earnings Call Highlights",
       "publisher": "MarketBeat",
       "date": "2026-10-28",
       "url": "https://www.marketbeat.com/instant-alerts/transcript-nabors-industries-q3-earnings-call-highlights-2026-10-28/"
      },
      {
       "id": 4,
       "title": "Nabors Industries XBRL company facts (Form 10-Q, 2026-09-30 분기)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-04",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001163739.json"
      },
      {
       "id": 5,
       "title": "Nabors Industries Ltd. Form 8-K Exhibit 99.1 (2026년 3분기 실적 보도자료)",
       "publisher": "SEC EDGAR",
       "date": "2026-10-27",
       "url": "https://www.sec.gov/Archives/edgar/data/0001163739/000110465926119167/tm2628332d1_ex99-1.htm"
      }
     ]
    },
    {
     "name_kr": "프리시전 드릴링",
     "name_en": "Precision Drilling Corporation",
     "ticker": "PD",
     "yahoo": "PD.TO",
     "exchange": "TSX (NYSE: PDS)",
     "country": "캐나다",
     "cik": null,
     "role_kr": "캐나다 최대 육상 시추 업체로 미국 육상과 중동(쿠웨이트·사우디아라비아) 리그를 함께 운영한다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-27",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기는 캐나다·미국 가동 증가로 흑자 전환했으며, 매출 5억 3,200만 캐나다달러(전년 대비 약 +15%), 조정 EBITDA 1억 2,500만 캐나다달러(약 +6%), 순이익 2,100만 캐나다달러(전년 동기 -700만 캐나다달러)를 기록했다.",
       "src": [
        1,
        5
       ]
      },
      {
       "text": "캐나다 평균 가동 리그는 73기로 전년 동기 63기 대비 16% 늘었고, 가동일당 매출은 3만 3,654캐나다달러로 전년 동기 3만 4,193캐나다달러보다 낮았으며 회사는 하락 원인을 리그 구성 변화로 설명했다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "미국 평균 가동 리그는 43기로 2분기 35기보다 8기, 전년 동기보다 7기 많았고, 가동일당 매출은 3만 3,270달러로 전년 동기 3만 1,040달러보다 올랐으나 재가동 비용으로 일일 영업마진은 7,653달러(전년 동기 8,700달러)로 낮아졌다.",
       "src": [
        3,
        5,
        2
       ]
      },
      {
       "text": "미국 재가동은 둔화 단계에 들어섰으며, 3분기 6기를 재가동했고 2027년 재가동은 더 높은 가동 기반 위에서 한 자릿수에 그칠 전망이지만, 웜스택 리그 복귀로 이르면 2027년 초 미국 50기 도달이 가능하다고 밝혔다.",
       "src": [
        2
       ]
      },
      {
       "text": "중동은 지역 긴장으로 비용이 늘었고 해외 일일 단가는 4만 6,304달러로 전년 동기 대비 14% 하락했으며, 쿠웨이트 유휴 리그 1기의 2027년 중반 복귀(5년 계약) 외에 중동 재가동 계획은 없고 아르헨티나는 계약 조건 합의에 이르지 못했다.",
       "src": [
        2
       ]
      },
      {
       "text": "3분기 설비투자 8,200만 캐나다달러, 자사주 매입 3,100만 캐나다달러를 집행했고, 장납기 장비 인도와 업그레이드 기회를 반영해 2026년 설비투자 예산을 2억 6,500만 캐나다달러에서 2억 7,500만~2억 8,500만 캐나다달러로 올렸다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "2027년 캐나다 업그레이드는 몬트니 ERD 2~3기와 중질유용 Super Single 패드 업그레이드 중심이다.",
       "src": [
        2
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "532",
       "unit": "백만 캐나다달러",
       "period": "2026년 3분기",
       "change": "전년 대비 약 +15%",
       "src": 1
      },
      {
       "label": "조정 EBITDA",
       "value": "125",
       "unit": "백만 캐나다달러",
       "period": "2026년 3분기",
       "change": "전년 대비 약 +6%",
       "src": 5
      },
      {
       "label": "순이익",
       "value": "21",
       "unit": "백만 캐나다달러",
       "period": "2026년 3분기",
       "change": "전년 동기 -7 (흑자 전환)",
       "src": 1
      },
      {
       "label": "캐나다 평균 가동 리그",
       "value": "73",
       "unit": "기",
       "period": "2026년 3분기",
       "change": "전년 동기 63 (+16%)",
       "src": 1
      },
      {
       "label": "캐나다 가동일당 매출",
       "value": "33,654",
       "unit": "캐나다달러/일",
       "period": "2026년 3분기",
       "change": "전년 동기 34,193 (리그 구성 변화)",
       "src": 4
      },
      {
       "label": "미국 평균 가동 리그",
       "value": "43",
       "unit": "기",
       "period": "2026년 3분기",
       "change": "2분기 35, 전년 동기 대비 +7기",
       "src": 3
      },
      {
       "label": "미국 가동일당 매출",
       "value": "33,270",
       "unit": "달러/일",
       "period": "2026년 3분기",
       "change": "전년 동기 31,040",
       "src": 5
      },
      {
       "label": "미국 일일 영업마진",
       "value": "7,653",
       "unit": "달러/일",
       "period": "2026년 3분기",
       "change": "전년 동기 8,700 (재가동 비용)",
       "src": 2
      },
      {
       "label": "해외 일일 단가",
       "value": "46,304",
       "unit": "달러/일",
       "period": "2026년 3분기",
       "change": "전년 동기 대비 -14%",
       "src": 2
      },
      {
       "label": "미국 재가동 리그",
       "value": "6",
       "unit": "기",
       "period": "2026년 3분기",
       "change": "",
       "src": 2
      },
      {
       "label": "설비투자",
       "value": "82",
       "unit": "백만 캐나다달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "자사주 매입",
       "value": "31",
       "unit": "백만 캐나다달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "4분기 캐나다 평균 가동 리그는 70기 초반으로 예상한다.",
       "src": [
        2
       ]
      },
      {
       "text": "미국은 재가동 둔화와 고정비 흡수 개선으로 4분기 마진이 최근 2년 중 최고가 될 전망이다.",
       "src": [
        2
       ]
      }
     ],
     "read_through": {
      "text": "북미 리그 공급 증가 속도는 2027년에 낮아진다고 판단하며, 프리시전의 캐나다·미국 가동은 전년 대비 16%·19% 늘었으나 2027년 미국 재가동은 한 자릿수로 제시됐다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Precision Drilling Announces 2026 Third Quarter Unaudited Financial Statements",
       "publisher": "GlobeNewswire (The Globe and Mail 게재)",
       "date": "2026-10-27",
       "url": "https://www.theglobeandmail.com/investing/markets/stocks/PDS-N/pressreleases/8488805/precision-drilling-announces-2026-third-quarter-unaudited-financial-statements/"
      },
      {
       "id": 2,
       "title": "Precision Drilling (PDS) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-28",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/28/precision-drilling-pds-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 3,
       "title": "Precision Drilling Q3 2026 Earnings Call Transcript",
       "publisher": "Benzinga",
       "date": "2026-10-28",
       "url": "https://www.benzinga.com/news/26/10/62668070/precision-drilling-q3-2026-earnings-call-transcript"
      },
      {
       "id": 4,
       "title": "Precision Drilling Announces 2026 Third Quarter Unaudited Financial Statements",
       "publisher": "GlobeNewswire (Manila Times 게재)",
       "date": "2026-10-28",
       "url": "https://www.manilatimes.net/2026/10/28/tmt-newswire/globenewswire/precision-drilling-announces-2026-third-quarter-unaudited-financial-statements/2455653"
      },
      {
       "id": 5,
       "title": "Precision Drilling Q3 Earnings: Revenue Up 15% to $532M",
       "publisher": "StockTitan",
       "date": "2026-10-27",
       "url": "https://www.stocktitan.net/news/PDS/precision-drilling-announces-2026-third-quarter-unaudited-financial-40321syjj8pc.html"
      }
     ]
    },
    {
     "name_kr": "리버티 에너지",
     "name_en": "Liberty Energy Inc.",
     "ticker": "LBRT",
     "yahoo": "LBRT",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1694028,
     "role_kr": "북미 대형 수압파쇄(프랙) 완결 서비스 업체로 Liberty Power Innovations를 통한 분산형 발전 사업을 키우고 있다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-21",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기는 시추 지연과 원가 상승으로 전분기 대비 이익이 줄었으며, 매출 11억 9,616만 달러(전년 대비 +26.3%, 전분기 대비 +0.6%), 조정 EBITDA 1억 4,160만 달러(전년 동기 1억 2,770만 달러, 전분기 대비 약 -6%)를 기록했다.",
       "src": [
        2,
        3
       ]
      },
      {
       "text": "순손실 3,906만 달러(희석 EPS -0.24달러)는 투자자산 평가손실 6,289만 달러에서 비롯됐고, 조정 순이익은 1,000만 달러(주당 0.06달러)다.",
       "src": [
        2,
        3
       ]
      },
      {
       "text": "프랙 시장은 빠듯하며, 경영진은 작업 일정이 꽉 차고 가용 설비가 제한적이어서 소폭 가격 인상을 확보할 수 있다고 보고, 강해진 원유 선도 곡선이 E&P 고객의 경제성을 높인다고 밝혔다.",
       "src": [
        4
       ]
      },
      {
       "text": "천연가스 연료 대체율은 전체 플릿 연료 소비의 60%를 넘어 사상 최고를 기록했으며, 회사는 연료비 절감분을 가격 인상 협상의 근거로 활용한다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "원가 압력은 이어지고 있으며, 서비스 원가(감가상각 제외) 9억 9,505만 달러는 매출의 83.2%(XBRL 값으로 산출)로 2분기 82.5%보다 높고, 경영진은 인건비·트럭 운송·유체 비용 상승이 계속된다고 밝혔다.",
       "src": [
        2,
        3
       ]
      },
      {
       "text": "발전 사업은 프런티어 AI 연구소와 데이터센터 캠퍼스용 1.2GW 통합 전력 개발 계약을 맺고 상당한 용량 요금 선급금을 받았으며, 약 500MW 첫 에너지 서비스 계약을 2026년 12월까지 체결하고 확보한 발전 설비 3GW를 2029년 말까지 가동하는 것을 목표로 한다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "투자는 발전 부문에 집중돼 3분기 순설비투자·장기 예치금 6억 2,200만 달러 중 발전 장비 예치금 등 발전 관련이 약 4억 5,000만 달러였고, 분기 말 유동성은 6억 6,900만 달러, 장기차입금은 12억 9,057만 달러다.",
       "src": [
        3,
        2
       ]
      },
      {
       "text": "3분기 실적은 2026-10-21 보도자료와 8-K(항목 2.02)로 발표됐고 10-Q는 2026-10-22에 제출됐다.",
       "src": [
        1,
        3
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "1,196.2",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +0.6%, 전년 대비 +26.3%",
       "src": 2
      },
      {
       "label": "조정 EBITDA",
       "value": "141.6",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 127.7, 전분기 대비 약 -6%",
       "src": 3
      },
      {
       "label": "영업이익",
       "value": "19.3",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 -2.4, 2분기 12.7",
       "src": 2
      },
      {
       "label": "투자자산 손익",
       "value": "-62.9",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "2분기 +42.9, 전년 동기 +68.4",
       "src": 2
      },
      {
       "label": "순이익",
       "value": "-39.1",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 43.1",
       "src": 2
      },
      {
       "label": "희석 EPS",
       "value": "-0.24 (조정 0.06)",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 동기 0.26",
       "src": 2
      },
      {
       "label": "서비스 원가(감가상각 제외)",
       "value": "995.0",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 769.8",
       "src": 2
      },
      {
       "label": "천연가스 연료 대체율",
       "value": "60% 초과 (사상 최고)",
       "unit": "",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      },
      {
       "label": "순설비투자·장기 예치금",
       "value": "622 (발전 관련 약 450 포함)",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      },
      {
       "label": "현금 설비투자(누적)",
       "value": "1,006.8",
       "unit": "백만 달러",
       "period": "2026년 1~9월",
       "change": "전년 동기 390.1 (2.6배)",
       "src": 2
      },
      {
       "label": "발전 개발 계약 규모",
       "value": "1.2",
       "unit": "GW",
       "period": "2026년 3분기 체결",
       "change": "",
       "src": 3
      },
      {
       "label": "확보 발전 설비",
       "value": "3",
       "unit": "GW",
       "period": "2029년 말 가동 목표",
       "change": "",
       "src": 4
      },
      {
       "label": "유동성",
       "value": "669",
       "unit": "백만 달러",
       "period": "2026년 9월 말",
       "change": "",
       "src": 3
      },
      {
       "label": "장기차입금(유동 포함)",
       "value": "1,290.6",
       "unit": "백만 달러",
       "period": "2026년 9월 말",
       "change": "2025년 말 246.6",
       "src": 2
      }
     ],
     "guidance": [
      {
       "text": "4분기 프랙 활동은 연휴·동절기 계절 감소가 예년보다 다소 작을 전망이며, 근거로 견조한 원자재 가격, 고객 예산 소진 신호 부재, 3분기에서 이연된 작업을 제시했다.",
       "src": [
        4
       ]
      },
      {
       "text": "2026년 설비투자 전망 15억 달러를 유지했고 분기 배당은 주당 0.10달러로 올렸다.",
       "src": [
        4,
        3
       ]
      },
      {
       "text": "2027년에는 분기마다 소폭의 가격 인상이 가능한 시장을 예상하나 인건비·운송비 중심의 인플레이션이 이어진다고 밝혔다.",
       "src": [
        4
       ]
      }
     ],
     "read_through": {
      "text": "미국 프랙 설비 수급은 빠듯해 가격이 소폭 오르고 있으나 신규 투자는 발전 사업에 쏠려 있으며, 리버티 3분기 순설비투자 6억 2,200만 달러 중 약 4억 5,000만 달러가 발전 관련이고 4분기 계절 감소는 예년보다 작을 전망이다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Liberty Energy Inc. EDGAR 제출 목록 (8-K Item 2.02 2026-10-21, 10-Q 2026-10-22)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-10-22",
       "url": "https://data.sec.gov/submissions/CIK0001694028.json"
      },
      {
       "id": 2,
       "title": "Liberty Energy Inc. XBRL company facts (Form 10-Q, 2026-09-30 분기)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-10-22",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001694028.json"
      },
      {
       "id": 3,
       "title": "Liberty Energy Inc. Announces Third Quarter 2026 Financial and Operational Results",
       "publisher": "Liberty Energy IR",
       "date": "2026-10-21",
       "url": "https://investors.libertyenergy.com/news-and-events/press-releases/2026/10-21-2026-223015990"
      },
      {
       "id": 4,
       "title": "Liberty Energy (LBRT) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-22",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/22/liberty-energy-lbrt-q3-2026-earnings-call-transcript/"
      }
     ]
    },
    {
     "name_kr": "프로페트로",
     "name_en": "ProPetro Holding Corp.",
     "ticker": "PUMP",
     "yahoo": "PUMP",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1680247,
     "role_kr": "퍼미안 분지에 집중한 수압파쇄·와이어라인 완결 서비스 업체로 PROPWR 발전 사업을 키우고 있다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-28",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기는 완결 가동률 상승과 PROPWR 배치 확대로 흑자 전환했으며, 매출 3억 5,538만 달러(전분기 대비 +16.2%, 전년 대비 +20.9%), 순이익 1,302만 달러(희석 EPS 0.09달러), 조정 EBITDA 6,000만 달러(매출 대비 17%, 전분기 대비 +33%)를 기록했다.",
       "src": [
        2,
        3
       ]
      },
      {
       "text": "활성 프랙 플릿은 13개이며, 올해 가격 개선과 작업 기간 가시성 향상으로 2개 플릿을 재가동했다.",
       "src": [
        5,
        4
       ]
      },
      {
       "text": "계약 커버리지는 높으며, 활성 마력의 3분의 2 이상이 계약돼 있고 대부분의 갱신이 2027년 상반기에 몰려 있어 내년에 플릿의 약 절반이 재계약된다.",
       "src": [
        5,
        4
       ]
      },
      {
       "text": "천연가스 연소 차세대 플릿은 디젤-가스 가격 차이로 뚜렷한 가격 프리미엄을 받고 있으며, 회사는 이 프리미엄이 유지된다고 보고 계약 플릿의 재가격 시점을 이에 맞추고 있다.",
       "src": [
        4
       ]
      },
      {
       "text": "PROPWR(발전) 부문은 3분기 조정 EBITDA 약 800만 달러로 전분기 대비 크게 늘었고, 계약 용량은 Targa 230MW를 포함해 약 510MW, 확보한 발전 설비 총 용량은 약 2.6GW이며 이 중 1GW 이상이 Caterpillar 프레임워크 계약의 10MW 유닛이다.",
       "src": [
        3
       ]
      },
      {
       "text": "투자는 발전 부문에 집중돼 3분기 발생 기준 설비투자 1억 7,100만 달러 중 PROPWR가 약 1억 2,800만 달러, 완결이 약 4,300만 달러였고, 현금 지급 기준 1억 2,319만 달러와의 차이는 금융 파트너가 PROPWR 지출을 직접 지급한 데 따른 것이다.",
       "src": [
        3,
        5,
        2
       ]
      },
      {
       "text": "전기식 FORCE 플릿 리스 비용 약 1,600만 달러가 조정 EBITDA에 반영돼 있으며, 회사는 2027년 최소 3개 FORCE 플릿을 매입해 리스 비용을 줄이고 완결 마진을 높일 계획이다.",
       "src": [
        4
       ]
      },
      {
       "text": "재무 여력은 충분하며, 분기 말 유동성 9억 3,400만 달러, 현금 7억 2,887만 달러를 보유하고 있으나 3분기 영업현금흐름은 운전자본 영향으로 4,631만 달러(2분기 6,600만 달러)로 줄었다.",
       "src": [
        3,
        2
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "355.4",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +16.2%, 전년 대비 +20.9%",
       "src": 2
      },
      {
       "label": "조정 EBITDA",
       "value": "60",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +33%, 매출 대비 17%",
       "src": 3
      },
      {
       "label": "영업이익",
       "value": "11.0",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "2분기 -3.2, 전년 동기 -6.1",
       "src": 2
      },
      {
       "label": "순이익",
       "value": "13.0",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 -2.4 (흑자 전환)",
       "src": 2
      },
      {
       "label": "희석 EPS",
       "value": "0.09",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 동기 -0.02",
       "src": 2
      },
      {
       "label": "활성 프랙 플릿",
       "value": "13",
       "unit": "개",
       "period": "2026년 3분기",
       "change": "2026년 중 2개 재가동",
       "src": 5
      },
      {
       "label": "계약된 활성 마력 비중",
       "value": "3분의 2 이상",
       "unit": "",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "PROPWR 조정 EBITDA",
       "value": "약 8",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 큰 폭 증가",
       "src": 3
      },
      {
       "label": "PROPWR 계약 용량",
       "value": "약 510 (Targa 230 포함)",
       "unit": "MW",
       "period": "2026년 9월 말",
       "change": "",
       "src": 3
      },
      {
       "label": "PROPWR 확보 총 용량",
       "value": "2.6",
       "unit": "GW",
       "period": "2026년 9월 말",
       "change": "",
       "src": 3
      },
      {
       "label": "설비투자(발생 기준)",
       "value": "171 (PROPWR 약 128, 완결 약 43)",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      },
      {
       "label": "설비투자(현금 지급)",
       "value": "123.2",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "2분기 61.4",
       "src": 2
      },
      {
       "label": "유동성",
       "value": "934",
       "unit": "백만 달러",
       "period": "2026년 9월 말",
       "change": "",
       "src": 3
      },
      {
       "label": "비유동 장기차입금",
       "value": "808.7",
       "unit": "백만 달러",
       "period": "2026년 9월 말",
       "change": "2025년 말 105.6",
       "src": 2
      }
     ],
     "guidance": [
      {
       "text": "4분기 활성 프랙 플릿은 연휴 둔화 속에 약 13개를 유지할 전망이다.",
       "src": [
        5,
        4
       ]
      },
      {
       "text": "2026년 발생 기준 설비투자는 5억 2,500만~5억 9,500만 달러에서 5억 2,500만~5억 7,500만 달러로 상단을 낮췄고, 이 중 PROPWR는 4억~4억 3,000만 달러(기존 4억~4억 5,000만 달러)로 좁혔다.",
       "src": [
        5
       ]
      },
      {
       "text": "PROPWR 설비투자는 2027년에 늘어나며, 2028년 초까지 단계적으로 500MW 이상을 배치할 계획이고 MW당 자본비용은 약 140만~150만 달러다.",
       "src": [
        5,
        3
       ]
      }
     ],
     "read_through": {
      "text": "퍼미안 프랙 설비는 계약률이 높고 가스 연소 플릿에 프리미엄이 붙어 2027년 상반기 재계약 때 가격 인상 여지가 크다고 판단하며, 프로페트로는 활성 플릿 13개, 계약 마력 3분의 2 이상, 2027년 재계약 비중 약 절반이다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 2,
       "title": "ProPetro Holding Corp. XBRL company facts (Form 10-Q, 2026-09-30 분기)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-10-29",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001680247.json"
      },
      {
       "id": 3,
       "title": "ProPetro Reports Financial Results for the Third Quarter of 2026",
       "publisher": "Business Wire (Morningstar 게재)",
       "date": "2026-10-28",
       "url": "https://www.morningstar.com/news/business-wire/20261028871931/propetro-reports-financial-results-for-the-third-quarter-of-2026"
      },
      {
       "id": 4,
       "title": "ProPetro Q3 Earnings Call Highlights",
       "publisher": "MarketBeat",
       "date": "2026-10-29",
       "url": "https://www.marketbeat.com/instant-alerts/transcript-propetro-q3-earnings-call-highlights-2026-10-29/"
      },
      {
       "id": 5,
       "title": "ProPetro Holding Corp. Form 8-K Exhibit 99.3 (3Q26 earnings call script)",
       "publisher": "SEC EDGAR",
       "date": "2026-10-28",
       "url": "https://www.sec.gov/Archives/edgar/data/0001680247/000168024726000122/exhibit993-3q26earningsc.htm"
      }
     ]
    }
   ]
  },
  {
   "id": "oilfield_services",
   "title": "유전 서비스",
   "position": "유전 서비스는 E&P 기업의 시추·완결·생산 투자를 장비와 인력으로 실행해 원유·가스 생산능력을 만드는 업스트림 공정이다.",
   "summary": [
    "3분기 유전 서비스 업황은 중동 회복과 북미 수압파쇄 부진으로 갈렸다. SLB 중동 매출은 전분기 대비 13% 늘어 약 19억 달러였다(SLB 1). 할리버튼 중동/아시아 매출은 사우디·쿠웨이트 주도로 8% 늘어 14억 달러였으나 할리버튼 북미 매출은 5% 줄어 22억 달러였다(HAL 1).",
    "중동 활동은 분쟁 이전 수준을 회복하지 못했다. SLB는 4분기 중동 매출을 2025년 4분기의 약 83%인 약 19억 달러로 동결 가정했다(SLB 2). 베이커휴즈는 4분기 중동 OFSE 활동 감소를 예고했고(BKR 4), 웨더포드는 단기 전망에서 중동 회복을 제외했다(WFRD 5).",
    "북미 압력펌핑 가격은 하락을 멈춘 것으로 판단한다. 할리버튼은 3분기 일부 프랙 크루를 더 나은 가격의 신규 고객으로 옮기고 가격이 강보합으로 돌아서고 있다고 밝혔으나, 2027년 계획에는 북미 활동 보합을 가정했고 뚜렷한 가격 인상은 반영하지 않았다(HAL 3).",
    "2027년 업스트림 지출 전망은 한 자릿수 중반 성장으로 모인다. SLB는 중동 활동이 2026년 하반기 수준에 머문다는 가정 아래 글로벌 활동 한 자릿수 중반 성장을(SLB 3), 할리버튼은 매출 한 자릿수 중반 성장과 영업이익률 약 15%(+200bp)를 제시했다(HAL 1, 3).",
    "가스·전력 설비 수요는 유전 서비스보다 강하다. 베이커휴즈 IET 수주는 58억 8,600만 달러(수주/매출 1.7배)로 LNG 10억 달러와 데이터센터가 이끈 발전 시스템 22억 달러를 포함했고 IET 잔고는 394억 달러로 사상 최대다(BKR 3, 4). SLB 데이터센터 솔루션 매출도 2억 3,000만 달러로 전분기 대비 23% 늘었다(SLB 1).",
    "중형사 실적은 대형사보다 늦게 회복되고 있다. 웨더포드 3분기 매출은 11억 4,300만 달러로 전년 대비 7% 줄었으나(WFRD 1) 4분기 매출 가이던스는 12억 8,000만~13억 3,000만 달러로 3분기보다 12~16% 많다(WFRD 5)."
   ],
   "open_items": [
    "SLB·할리버튼·베이커휴즈·웨더포드 4개사 발표문과 콜 내용은 원문 전체가 아닌 발췌(IR 페이지, GlobeNewswire·Nasdaq 배포문, SEC 8-K·10-Q, Motley Fool 전사본) 기준이다. 매출·순이익·EPS·현금흐름·설비투자·자사주 매입은 SEC XBRL(10-Q)로 교차 확인했다.",
    "SLB IR 사이트 자료와 베이커휴즈 발표문·프레젠테이션 PDF도 원문 미열람이다.",
    "SLB는 10-Q와 같은 날(2026-10-28) IRANNOTICE(이란 관련 활동 공시 통지)를 별도 제출했으며 그 내용은 미확인이다.",
    "할리버튼 2027년 가이던스에 호르무즈 해협 경유 물류·자재 운송 비용 상승이 반영됐다는 언급은 콜 요약 2건에만 있고 전사본 원문으로는 미확인이어서 싣지 않았다. SLB 콜 발췌에는 호르무즈를 직접 언급한 문장이 없다(긴장 고조·분쟁 표현만 있다).",
    "베이커휴즈 1~9월 데이터센터 수주 49억 달러는 콜 요약 1건에만 나와 싣지 않았다. NovaLT 등 제품별 수주, 4분기 부문별 가이던스 범위, 2027년 OFSE 지출 전망 수치는 미확인이다.",
    "웨더포드 지역별 매출 금액은 미확인이고(지역별 증감률·비중은 콜 요약 기준), 북미 매출은 총매출에서 국제 매출을 뺀 계산치다.",
    "SLB의 ChampionX 매출 기여분은 출처에 따라 9억 5,600만 달러와 9억 7,000만 달러로 다르고 디지털 부문 세전이익률(약 28%)은 단일 출처여서, 둘 다 싣지 않았다.",
    "SLB·할리버튼·베이커휴즈·웨더포드 4개사의 2026년 연간·2027년 설비투자 가이던스, 할리버튼 가동 프랙 플릿 수, SLB 4분기 조정 EBITDA 금액은 미확인이다.",
    "테크닙FMC 등 해저 장비 업체는 해양 시추·해저 장비·FPSO 구간에 있다.",
    "NOV는 2026년 10월 28일 어닝콜 설명과 연차보고서의 사업 범위만 확인했다. 조사한 분기 매출·수주·이익 수치는 없고 매출·순이익·희석 EPS는 SEC 공시 값이다. 어닝콜 출처는 콜 날짜와 질의응답 번호만 있고 전사본 링크는 없다."
   ],
   "companies": [
    {
     "name_kr": "SLB(옛 슐럼버거)",
     "name_en": "SLB",
     "ticker": "SLB",
     "yahoo": "SLB",
     "exchange": "NYSE",
     "country": "미국(본사 휴스턴, 퀴라소 법인)",
     "cik": 87347,
     "role_kr": "세계 최대 유전 서비스 기업으로 저류층 평가·시추·생산 설비·디지털을 함께 제공하며, 3분기 매출의 74%가 북미 외 국제 시장에서 나왔다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-23",
     "status": "reported",
     "highlights": [
      {
       "text": "매출은 94억 4,900만 달러로 전분기 대비 5%, 전년 대비 6% 늘었고, 북미(24억 100만 달러, 전년 대비 +24%)가 국제(69억 9,300만 달러, +1%)보다 빠르게 늘었다.",
       "src": [
        1,
        6
       ]
      },
      {
       "text": "중동 매출은 분기 말 차질에도 전분기 대비 13% 늘어 약 19억 달러를 기록했으나 분쟁 관련 차질로 전년 대비 12% 줄었고, 중동·아시아 합산 매출은 28억 1,000만 달러(전분기 대비 +9%, 전년 대비 -6%)다.",
       "src": [
        1,
        8
       ]
      },
      {
       "text": "경영진은 3분기 UAE·쿠웨이트와 상대적으로 작은 폭의 사우디아라비아에서 활동이 늘고 이라크도 개선됐다고 밝혔으며, CFO는 중동 인력·장비를 일부만 줄여 두었기 때문에 회복 시 영업 레버리지가 크다고 설명했다.",
       "src": [
        3
       ]
      },
      {
       "text": "사업부 매출은 생산시스템 40억 달러(전분기 대비 +6%, 세전이익률 16.1%), 웰 컨스트럭션 28억 9,000만 달러(+5%, 16.4%), 저류층 성능 16억 3,000만 달러(+5%, 16.3%), 디지털 6억 9,300만 달러(-1%)이며, 웰 컨스트럭션과 저류층 성능 이익률은 중동 수익성 회복으로 각각 122bp, 140bp 개선됐다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "데이터센터 솔루션 매출은 2억 3,000만 달러로 전분기 1억 8,600만 달러 대비 23% 늘어 기타 부문(5억 4,400만 달러, 전분기 대비 +8%) 성장을 이끌었다.",
       "src": [
        1,
        5
       ]
      },
      {
       "text": "조정 EBITDA는 20억 7,000만 달러(마진 21.9%, 전분기 대비 +71bp)이고, 1억 8,700만 달러의 비현금 연금 정산 비용 때문에 GAAP EPS는 0.49달러, 특별항목 제외 EPS는 0.64달러(전분기 대비 +16%, 전년 대비 -7%)다.",
       "src": [
        1,
        6
       ]
      },
      {
       "text": "영업현금흐름 15억 1,000만 달러, 잉여현금흐름 8억 2,800만 달러를 냈고 3분기 자사주 6억 5,600만 달러를 매입했으며, 순부채는 92억 달러로 전년 3분기와 같다.",
       "src": [
        1,
        6
       ]
      },
      {
       "text": "북미 성장은 미국 육상 활동 증가가, 국제 성장은 중남미·유럽·사하라 이남 아프리카·아시아의 심해 활동이 이끌었고, CEO는 ChampionX 생산 화학제품·인공채유와 시추 기술·디지털을 묶은 북미 육상 사업이 미국·캐나다 실적을 계속 지지하는 반면 알래스카·멕시코만(Gulf of America) 등 북미 해상은 약하다고 밝혔다.",
       "src": [
        1,
        4,
        9
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "9,449",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +6%, 전분기 대비 +5%",
       "src": 6
      },
      {
       "label": "국제 매출",
       "value": "6,993",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +1%, 전분기 대비 +5%",
       "src": 1
      },
      {
       "label": "북미 매출",
       "value": "2,401",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +24%, 전분기 대비 +7%",
       "src": 1
      },
      {
       "label": "중동·아시아 매출",
       "value": "2.81",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 -6%, 전분기 대비 +9%",
       "src": 1
      },
      {
       "label": "중동 매출",
       "value": "약 1.9",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 -12%, 전분기 대비 +13%",
       "src": 1
      },
      {
       "label": "세전 부문이익(이익률)",
       "value": "1,576 (16.7%)",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "조정 EBITDA(마진)",
       "value": "2.07 (21.9%)",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +9%, 마진 +71bp, 전년과 비슷",
       "src": 1
      },
      {
       "label": "지배주주 순이익",
       "value": "735",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 739백만 달러 대비 -0.5%",
       "src": 6
      },
      {
       "label": "EPS(GAAP / 특별항목 제외)",
       "value": "0.49 / 0.64",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "특별항목 제외 기준 전년 대비 -7%, 전분기 대비 +16%",
       "src": 1
      },
      {
       "label": "영업현금흐름",
       "value": "1.51",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "잉여현금흐름",
       "value": "828",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "유형자산 투자(누적)",
       "value": "1,287",
       "unit": "백만 달러",
       "period": "2026년 1~9월",
       "change": "전년 동기 1,178백만 달러 대비 +9%",
       "src": 6
      },
      {
       "label": "자사주 매입",
       "value": "656",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "데이터센터 솔루션 매출",
       "value": "230",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +23%",
       "src": 5
      },
      {
       "label": "생산시스템 매출(세전이익률)",
       "value": "4.00 (16.1%)",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +6%, 이익률 +60bp",
       "src": 1
      },
      {
       "label": "웰 컨스트럭션 매출(세전이익률)",
       "value": "2.89 (16.4%)",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +5%, 이익률 +122bp(전년 대비 -239bp)",
       "src": 1
      },
      {
       "label": "저류층 성능 매출(세전이익률)",
       "value": "1.63 (16.3%)",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +5%, 이익률 +140bp",
       "src": 1
      },
      {
       "label": "디지털 매출",
       "value": "693",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 -1%",
       "src": 1
      },
      {
       "label": "순부채",
       "value": "9.2",
       "unit": "십억 달러",
       "period": "2026-09-30",
       "change": "전년 3분기와 같음",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "4분기 매출은 약 100억 달러(전분기 대비 +5~7%)로 제시했고, 심해 활동과 연말 디지털(탐사 데이터) 판매가 증가를 이끈다.",
       "src": [
        2,
        3
       ]
      },
      {
       "text": "4분기 중동 매출은 약 19억 달러로 전분기와 같다고 가정했으며, 이는 2025년 4분기 중동 매출의 약 83%다.",
       "src": [
        2,
        3
       ]
      },
      {
       "text": "4분기 조정 EBITDA 마진은 전분기 대비 100~150bp 개선, 핵심 사업부 매출은 전분기 대비 한 자릿수 초반 증가를 예상한다.",
       "src": [
        2,
        3
       ]
      },
      {
       "text": "2027년 글로벌 업스트림 활동은 한 자릿수 중반 성장으로 보며, 중동 활동은 2026년 하반기 수준 유지와 분쟁의 중대한 확전 부재를 기본 가정으로 두고, 분쟁 해소 시 이연된 활동이 풀리는 효과는 전망에서 제외했다.",
       "src": [
        3,
        9
       ]
      },
      {
       "text": "2026년 연간 자사주 매입 약 24억 달러, 총 주주환원 40억 달러 이상을 계획하며, 4분기 잉여현금흐름 증가 폭은 일부 국가의 대금 회수 시점에 좌우된다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "분기 배당은 주당 0.295달러로 동결했고 2027년 1월 7일(기준일 2026년 12월 2일) 지급한다.",
       "src": [
        1
       ]
      }
     ],
     "read_through": {
      "text": "SLB가 4분기 중동 매출을 분쟁 이전인 2025년 4분기의 약 83%로 가정해 걸프 산유국의 시추·완결 활동은 연말까지 분쟁 이전 수준을 밑돌고, 2027년 중동 정상화는 원유 생산능력 확대의 상방 요인으로 남는다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "SLB Announces Third-Quarter 2026 Results",
       "publisher": "SLB (Business Wire)",
       "date": "2026-10-23",
       "url": "https://investorcenter.slb.com/news-releases/news-release-details/slb-announces-third-quarter-2026-results/"
      },
      {
       "id": 2,
       "title": "SLB Third-Quarter 2026 Results Prepared Remarks",
       "publisher": "SLB",
       "date": "2026-10-23",
       "url": "https://investorcenter.slb.com/static-files/ae8a0441-90e0-4ec8-ba78-fbc8c96fe99a"
      },
      {
       "id": 3,
       "title": "SLB (SLB) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-23",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/23/slb-slb-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 4,
       "title": "SLB Q3 growth spans all regions as deepwater, Middle East rebound",
       "publisher": "World Oil",
       "date": "2026-10-23",
       "url": "https://www.worldoil.com/news/2026/10/23/slb-q3-growth-spans-all-regions-as-deepwater-middle-east-rebound/"
      },
      {
       "id": 5,
       "title": "SLB’s Q3 2026 revenue hit $9.45 billion as Data Center Solutions jumped 23% sequentially",
       "publisher": "Market Chameleon",
       "date": "2026-10-23",
       "url": "https://marketchameleon.com/articles/b/2026/10/23/slb-q3-2026-results-data-center-solutions-growth"
      },
      {
       "id": 6,
       "title": "SLB LIMITED/NV XBRL company facts (Form 10-Q, quarter ended 2026-09-30)",
       "publisher": "U.S. SEC EDGAR (data.sec.gov)",
       "date": "2026-10-28",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0000087347.json"
      },
      {
       "id": 7,
       "title": "SLB LIMITED/NV EDGAR filing index (8-K Item 2.02 2026-10-23; 10-Q and IRANNOTICE 2026-10-28)",
       "publisher": "U.S. SEC EDGAR (data.sec.gov)",
       "date": "2026-10-28",
       "url": "https://data.sec.gov/submissions/CIK0000087347.json"
      },
      {
       "id": 8,
       "title": "SLB Form 10-Q for the quarter ended September 30, 2026",
       "publisher": "U.S. SEC EDGAR",
       "date": "2026-10-28",
       "url": "https://www.sec.gov/Archives/edgar/data/0000087347/000119312526435577/slb-20260930.htm"
      },
      {
       "id": 9,
       "title": "LSEG StreetEvents edited transcript: SLB.N Q3 2026 SLB N.V. Earnings Call",
       "publisher": "SLB (LSEG StreetEvents)",
       "date": "2026-10-23",
       "url": "https://investorcenter.slb.com/static-files/b578b6d9-7008-4e3d-9317-7112b7c08493"
      }
     ]
    },
    {
     "name_kr": "할리버튼",
     "name_en": "Halliburton Company",
     "ticker": "HAL",
     "yahoo": "HAL",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 45012,
     "role_kr": "북미 수압파쇄 중심의 완결·생산(C&P)과 시추·평가(D&E) 두 사업부로 구성된 유전 서비스 기업으로, 3분기 매출의 약 38%가 북미에서 나왔다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-20",
     "status": "reported",
     "highlights": [
      {
       "text": "매출은 57억 300만 달러로 전분기(57억 1,400만 달러)와 비슷하고 전년 대비 2% 늘었으며, 영업이익 6억 2,400만 달러(이익률 10.9%), 손상·기타 비용 1억 700만 달러를 제외한 조정 영업이익 7억 3,100만 달러(12.8%)를 기록했다.",
       "src": [
        1,
        2,
        5
       ]
      },
      {
       "text": "북미 매출은 22억 달러로 전분기 대비 5%, 전년 대비 9% 줄었고, 국제 매출은 35억 달러로 전분기 대비 3%, 전년 대비 약 9% 늘었다.",
       "src": [
        1,
        3,
        4
       ]
      },
      {
       "text": "중동/아시아 매출은 14억 달러로 전분기 대비 8% 늘었고 사우디아라비아·쿠웨이트의 다수 제품·서비스 라인 활동 증가가 견인했으며, 중남미(11억 달러)와 유럽/아프리카(10억 달러)는 전분기와 같았다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "10-Q는 두 사업부 모두 중동 지정학적 분쟁에 따른 차질 이후 활동 회복이 이어졌고 역내 운영비 인플레이션 압력이 이를 일부 상쇄했다고 기술했으며, CEO는 콜에서 중동 사업의 회복력이 매우 강하다고 평가했다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "C&P 매출은 31억 달러로 전분기 대비 4%(1억 1,300만 달러) 줄고 영업이익은 4억 5,700만 달러였으며, CFO는 북미 육상과 아르헨티나의 수압파쇄 활동이 예상보다 낮았다고 설명했다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "D&E 매출은 26억 달러로 전분기 대비 4%(1억 200만 달러) 늘고 영업이익은 3억 9,100만 달러로 16% 늘어 이익률이 150bp 개선됐다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "CEO는 북미 프랙을 점유율보다 수익성 기준으로 운영해 3분기 일부 크루를 더 나은 가격의 신규 고객으로 옮겼고 가격이 강보합으로 돌아서고 있으나 뚜렷한 가격 인상은 가정하지 않는다고 밝혔으며, 북미 담당 경영진은 가격 협상이 2분기 말부터 비상장 운영사에서 헤지 보유 운영사로 넓어지고 있다고 설명했다.",
       "src": [
        3
       ]
      },
      {
       "text": "3분기 설비투자 2억 6,600만 달러, 잉여현금흐름 1억 5,600만 달러, 자사주 매입 약 2억 5,000만 달러(730만 주)를 집행했다.",
       "src": [
        1,
        5
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "5,703",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +2%, 전분기 대비 -0.2%",
       "src": 5
      },
      {
       "label": "영업이익(이익률)",
       "value": "624 (10.9%)",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 356백만 달러 대비 +75%",
       "src": 5
      },
      {
       "label": "조정 영업이익(이익률)",
       "value": "731 (12.8%)",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 683백만 달러 대비 +7%",
       "src": 1
      },
      {
       "label": "순이익",
       "value": "417",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 18백만 달러",
       "src": 5
      },
      {
       "label": "희석 EPS",
       "value": "0.50",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 0.02달러",
       "src": 5
      },
      {
       "label": "북미 매출",
       "value": "2.2",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 -5%, 전년 대비 -9%",
       "src": 1
      },
      {
       "label": "국제 매출",
       "value": "3.5",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +3%",
       "src": 1
      },
      {
       "label": "중동/아시아 매출",
       "value": "1.4",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +8%",
       "src": 1
      },
      {
       "label": "C&P 매출",
       "value": "3.1",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 -4%",
       "src": 1
      },
      {
       "label": "C&P 영업이익",
       "value": "457",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "D&E 매출",
       "value": "2.6",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +4%",
       "src": 1
      },
      {
       "label": "D&E 영업이익",
       "value": "391",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +16%, 이익률 +150bp",
       "src": 1
      },
      {
       "label": "설비투자",
       "value": "266",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 261백만 달러 대비 +2%",
       "src": 5
      },
      {
       "label": "잉여현금흐름",
       "value": "156",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "자사주 매입",
       "value": "250",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "분기 배당",
       "value": "0.17",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "전년과 같음",
       "src": 5
      }
     ],
     "guidance": [
      {
       "text": "4분기 매출은 약 57억 달러로 3분기와 비슷하고 영업이익률은 약 70bp 개선될 것으로 전망했다.",
       "src": [
        3
       ]
      },
      {
       "text": "4분기 C&P 매출은 전분기 대비 3~5% 증가, 이익률은 75~125bp 개선을 예상한다.",
       "src": [
        3
       ]
      },
      {
       "text": "4분기 D&E 매출은 3분기 대비 3~5% 감소, 이익률은 보합~50bp 개선을 예상한다.",
       "src": [
        3
       ]
      },
      {
       "text": "2027년 매출은 한 자릿수 중반 성장, 영업이익률은 비용 절감으로 2026년 대비 약 200bp 높은 15% 수준을 목표로 하며, 북미 활동 보합과 국제 시장의 꾸준한 확대를 가정했다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "북미 프랙 회복은 2027년 계획에 넣지 않아 회복 시 추가 성장 요인이며, 중동 분쟁이 즉시 해소되면 핵심 사업이 빠르게 늘어 견조한 성장이 가능하다고 밝혔다.",
       "src": [
        3
       ]
      },
      {
       "text": "4분기 잉여현금흐름은 전분기 대비 늘어날 것으로 예상한다.",
       "src": [
        3
       ]
      }
     ],
     "read_through": {
      "text": "할리버튼 북미 매출이 전년 대비 9% 줄고 2027년 계획도 북미 활동 보합을 전제해 미국 셰일 완결 활동에 기반한 원유 공급 증가는 2027년까지 제한적이며, 사우디·쿠웨이트가 이끈 중동/아시아 매출 8% 증가는 걸프 산유국 상류 활동의 회복을 보여준다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Halliburton Announces Third Quarter 2026 Results",
       "publisher": "Halliburton (Business Wire)",
       "date": "2026-10-20",
       "url": "https://ir.halliburton.com/news-releases/news-release-details/halliburton-announces-third-quarter-2026-results"
      },
      {
       "id": 2,
       "title": "Halliburton Form 8-K (Item 2.02) - third quarter 2026 results release",
       "publisher": "U.S. SEC EDGAR",
       "date": "2026-10-20",
       "url": "https://www.sec.gov/Archives/edgar/data/0000045012/000004501226000070/livemastererdocument.htm"
      },
      {
       "id": 3,
       "title": "Halliburton (HAL) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-20",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/20/halliburton-hal-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 4,
       "title": "Halliburton Form 10-Q for the quarter ended September 30, 2026",
       "publisher": "U.S. SEC EDGAR",
       "date": "2026-10-23",
       "url": "https://www.sec.gov/Archives/edgar/data/0000045012/000004501226000074/hal-20260930.htm"
      },
      {
       "id": 5,
       "title": "HALLIBURTON CO XBRL company facts (Form 10-Q, quarter ended 2026-09-30)",
       "publisher": "U.S. SEC EDGAR (data.sec.gov)",
       "date": "2026-10-23",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0000045012.json"
      },
      {
       "id": 6,
       "title": "HALLIBURTON CO EDGAR filing index (8-K Item 2.02 2026-10-20; 10-Q 2026-10-23)",
       "publisher": "U.S. SEC EDGAR (data.sec.gov)",
       "date": "2026-10-23",
       "url": "https://data.sec.gov/submissions/CIK0000045012.json"
      }
     ]
    },
    {
     "name_kr": "베이커휴즈",
     "name_en": "Baker Hughes Company",
     "ticker": "BKR",
     "yahoo": "BKR",
     "exchange": "Nasdaq",
     "country": "미국",
     "cik": 1701605,
     "role_kr": "유전 서비스·장비(OFSE), 가스 압축·LNG 설비·발전 시스템 등 산업·에너지 기술(IET), 2026년 7월 인수한 Chart의 3개 부문을 가진 장비 중심 기업으로, 9월 말 잔여이행의무가 464억 달러다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-27",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 수주는 108억 달러이며, IET 수주 58억 8,600만 달러(수주/매출 1.7배)에는 LNG 설비 10억 달러와 데이터센터 수요가 이끈 발전 시스템 22억 달러가 포함됐고, OFSE 수주는 40억 4,700만 달러로 전분기 대비 19% 늘었다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "잔여이행의무는 464억 달러로 전분기 대비 64억 달러 늘었고, IET 394억 달러(사상 최대, 전분기 대비 +6%, 전년 대비 +23%), OFSE 34억 달러(전분기 대비 +4억 달러), 7월 16일 인수한 Chart 36억 달러로 구성된다.",
       "src": [
        1,
        3,
        4
       ]
      },
      {
       "text": "매출은 80억 2,500만 달러로 전년 대비 14% 늘었고, OFSE 36억 6,000만 달러(전분기 대비 +6%, 전년 대비 +1%), IET 34억 7,700만 달러(전년 대비 +3%), Chart 8억 8,800만 달러(인수 이후 실적)로 구성된다.",
       "src": [
        1,
        3,
        6
       ]
      },
      {
       "text": "OFSE 매출 중 북미는 9억 5,500만 달러, 국제는 27억 500만 달러이며, 국제 매출은 유럽/CIS/사하라 이남 아프리카와 중동/아시아 성장으로 전분기 대비 늘었고 경영진은 3분기 중동 활동 증가 폭이 예상보다 컸다고 밝혔다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "조정 EBITDA는 14억 1,500만 달러(마진 17.6%)로 전분기 대비 15%, 전년 대비 14% 늘었고, 부문 EBITDA는 OFSE 6억 5,900만 달러(마진 18.1%, +50bp), IET 6억 8,500만 달러(19.7%, -90bp), Chart 1억 5,600만 달러이며, IET 마진은 프로젝트 시점·믹스와 인플레이션 때문에 가이던스 중간값을 소폭 밑돌았다.",
       "src": [
        3,
        4,
        5
       ]
      },
      {
       "text": "GAAP 희석 EPS는 0.41달러, 조정 EPS는 0.70달러이고, 영업현금흐름 10억 500만 달러, 잉여현금흐름 7억 6,900만 달러를 기록했다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "Chart 인수가 포함된 1~9월 사업 인수 지출은 141억 5,000만 달러이고 장기차입 118억 8,500만 달러 조달로 총차입금이 9월 말 182억 6,400만 달러(2025년 말 60억 8,700만 달러)로 늘었으며, 연환산 7,000만 달러의 비용 절감을 완료해 3억 2,500만 달러 시너지 목표를 추진 중이다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "지배주주 순이익은 4억 1,100만 달러로 전년 대비 32.5% 줄었고, 순이자비용은 1억 7,700만 달러로 전분기 6,600만 달러의 2.7배였다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "수주",
       "value": "10.8",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      },
      {
       "label": "IET 수주",
       "value": "5,886",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "수주/매출 1.7배",
       "src": 3
      },
      {
       "label": "OFSE 수주",
       "value": "4,047",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +19%",
       "src": 3
      },
      {
       "label": "매출",
       "value": "8,025",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +14%, 전분기 대비 +19%",
       "src": 1
      },
      {
       "label": "OFSE 매출",
       "value": "3,660",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +6%, 전년 대비 +1%",
       "src": 3
      },
      {
       "label": "OFSE 북미 / 국제 매출",
       "value": "955 / 2,705",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      },
      {
       "label": "IET 매출",
       "value": "3,477",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +3%",
       "src": 3
      },
      {
       "label": "Chart 매출",
       "value": "888",
       "unit": "백만 달러",
       "period": "2026년 3분기(7월 16일 인수 이후)",
       "change": "",
       "src": 3
      },
      {
       "label": "조정 EBITDA(마진)",
       "value": "1,415 (17.6%)",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +15%, 전년 대비 +14%",
       "src": 3
      },
      {
       "label": "OFSE EBITDA(마진)",
       "value": "659 (18.1%)",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "마진 전분기 대비 +50bp",
       "src": 3
      },
      {
       "label": "IET EBITDA(마진)",
       "value": "685 (19.7%)",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "마진 전분기 대비 -90bp(전년 대비 +90bp)",
       "src": 5
      },
      {
       "label": "Chart EBITDA",
       "value": "156",
       "unit": "백만 달러",
       "period": "2026년 3분기(7월 16일 인수 이후)",
       "change": "",
       "src": 3
      },
      {
       "label": "EPS(GAAP / 조정)",
       "value": "0.41 / 0.70",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      },
      {
       "label": "지배주주 순이익",
       "value": "411",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 -32.5%",
       "src": 1
      },
      {
       "label": "영업현금흐름 / 잉여현금흐름",
       "value": "1,005 / 769",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      },
      {
       "label": "잔여이행의무(RPO)",
       "value": "46.4",
       "unit": "십억 달러",
       "period": "2026-09-30",
       "change": "전분기 대비 +6.4십억 달러, 전년 동기 대비 +31%",
       "src": 3
      },
      {
       "label": "IET 잔여이행의무",
       "value": "39.4",
       "unit": "십억 달러",
       "period": "2026-09-30",
       "change": "전분기 대비 +6%, 전년 대비 +23%",
       "src": 4
      },
      {
       "label": "총차입금",
       "value": "18,264",
       "unit": "백만 달러",
       "period": "2026-09-30",
       "change": "2025년 말 6,087백만 달러",
       "src": 1
      },
      {
       "label": "설비투자(유형자산 취득, 누적)",
       "value": "907",
       "unit": "백만 달러",
       "period": "2026년 1~9월",
       "change": "전년 동기 896백만 달러 대비 +1%",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "4분기 매출 약 82억 5,000만 달러, 조정 EBITDA 약 14억 6,000만 달러를 제시했다.",
       "src": [
        4
       ]
      },
      {
       "text": "2026년 연간 조정 EBITDA 가이던스 중간값을 약 52억 6,500만 달러로 올렸고, 잉여현금흐름 전환율은 45~50%로 예상한다.",
       "src": [
        4
       ]
      },
      {
       "text": "2026년 IET 수주 가이던스를 215억~235억 달러로 올렸고(1~9월 약 180억 달러), Horizon 2 기간 IET 수주 전망은 500억 달러 이상으로 높였다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "4분기 OFSE 매출은 중동·북미 활동 감소로 전분기 대비 소폭 줄고, 3분기에 예상보다 크게 늘었던 중동 활동은 4분기에 전분기 대비 감소할 것으로 본다.",
       "src": [
        4
       ]
      },
      {
       "text": "2027년은 장납기 발전 시스템·LNG 수주 비중이 커져 수주잔고의 매출 전환 기간이 길어지므로 성장 폭이 완만하다고 보며, 2027년 1분기 OFSE는 계절적 감소를 예상하고 중동 정상화 속도를 주요 변수로 꼽았다.",
       "src": [
        4
       ]
      },
      {
       "text": "지정학적 여건이나 역내 차질에 중대한 변화가 생기면 실적이 가이던스 대비 위아래로 달라질 수 있다고 밝혔다.",
       "src": [
        4
       ]
      },
      {
       "text": "Chart는 3억 2,500만 달러 시너지를 바탕으로 2028년 하반기 EBITDA 마진 22~23%를 목표로 한다.",
       "src": [
        4
       ]
      }
     ],
     "read_through": {
      "text": "베이커휴즈는 3분기 중동 OFSE 활동 증가 폭이 예상보다 컸다면서도 4분기 감소를 예고해 걸프 지역 상류 활동은 아직 추세적 회복에 들어서지 않았고, LNG 수주 10억 달러와 IET 잔고 394억 달러로 가스 수출·발전 설비 투자는 원유 서비스보다 견조하다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Baker Hughes Co XBRL company facts (Form 10-Q, quarter ended 2026-09-30)",
       "publisher": "U.S. SEC EDGAR (data.sec.gov)",
       "date": "2026-10-28",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001701605.json"
      },
      {
       "id": 2,
       "title": "Baker Hughes Co EDGAR filing index (8-K Items 1.01/2.01/2.03 2026-07-16; 8-K/A 2026-10-01; 8-K Item 2.02 2026-10-27; 10-Q 2026-10-28)",
       "publisher": "U.S. SEC EDGAR (data.sec.gov)",
       "date": "2026-10-28",
       "url": "https://data.sec.gov/submissions/CIK0001701605.json"
      },
      {
       "id": 3,
       "title": "Baker Hughes Announces Third-Quarter 2026 Results",
       "publisher": "Baker Hughes (GlobeNewswire)",
       "date": "2026-10-27",
       "url": "https://www.globenewswire.com/news-release/2026/10/27/3389707/0/en/baker-hughes-announces-third-quarter-2026-results.html"
      },
      {
       "id": 4,
       "title": "Baker Hughes (BKR) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-28",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/28/baker-hughes-bkr-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 5,
       "title": "3Q 2026 Results - Earnings Conference Call Presentation",
       "publisher": "Baker Hughes",
       "date": "2026-10-28",
       "url": "https://s21.q4cdn.com/548121662/files/doc_earnings/2026/q3/presentation/Third-Quarter-2026_Earnings-Conference-Call-Presentation.pdf"
      },
      {
       "id": 6,
       "title": "Baker Hughes Form 8-K Exhibit 99.1 - third-quarter 2026 earnings release",
       "publisher": "U.S. SEC EDGAR",
       "date": "2026-10-27",
       "url": "https://www.sec.gov/Archives/edgar/data/0001701605/000170160526000033/earningsreleaseex991093020.htm"
      }
     ]
    },
    {
     "name_kr": "웨더포드 인터내셔널",
     "name_en": "Weatherford International plc",
     "ticker": "WFRD",
     "yahoo": "WFRD",
     "exchange": "Nasdaq",
     "country": "미국(본사 휴스턴, 아일랜드 법인)",
     "cik": 1603923,
     "role_kr": "시추·평가(DRE), 웰 컨스트럭션·완결(WCC), 생산·개입(PRI) 3개 부문으로 관리압력시추(MPD)·와이어라인·완결·인공채유 장비와 서비스를 제공하는 중형 유전 서비스 기업으로, 3분기 매출의 79%가 북미 외 국제 시장에서 나왔다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-20",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 매출은 11억 4,300만 달러로 전분기 대비 3% 늘고 전년 대비 7% 줄었으며, 조정 EBITDA는 2억 5,400만 달러(마진 22.2%)로 전분기 대비 14% 늘었다.",
       "src": [
        1,
        3,
        4
       ]
      },
      {
       "text": "국제 매출은 9억 700만 달러로 전분기 대비 1%(700만 달러) 늘고 전년 대비 8%(8,200만 달러) 줄었으며, 북미 매출은 약 2억 3,600만 달러(총매출에서 국제 매출을 뺀 계산치, 전분기 대비 약 +15%)로 NCS 인수분 1개월이 반영됐다.",
       "src": [
        3,
        5
       ]
      },
      {
       "text": "지역별로 중남미는 멕시코·카리브해 주도로 전분기 대비 14% 늘었고, 중동/북아프리카/아시아는 사우디 LSTK 계약 종료와 오만 마르물 계약 전환으로 보합이었으며, 유럽/사하라 이남 아프리카/러시아는 활동 감소와 노르웨이 노동 파업으로 약 9% 줄었다.",
       "src": [
        5
       ]
      },
      {
       "text": "경영진은 3분기가 사우디 LSTK 계약이 빠진 첫 온전한 분기였고 중동 활동이 분쟁 이전 수준을 밑돌았으며, 최근 중동 사태로 빠른 회복 기대가 약해져 단기 전망에 역내 회복을 넣지 않았다고 밝혔고, 사우디 비중은 지역 매출의 20%, UAE·오만·쿠웨이트 합산은 약 41%다.",
       "src": [
        5
       ]
      },
      {
       "text": "DRE 매출은 중남미 MPD·시추 서비스와 중동/북아프리카/아시아 MPD·와이어라인 활동 증가로 전분기 대비 14% 늘어 3억 3,100만 달러, 조정 EBITDA는 55% 늘어 9,000만 달러였고, WCC 매출은 4억 5,000만 달러(+4%)였으나 조정 EBITDA는 북미 이익 전환율 하락으로 7% 줄어 1억 달러, PRI 매출은 3억 1,400만 달러(-1%)였다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "3분기 첫 베네수엘라 매출을 인식했고 4분기 기여가 커질 것으로 보며, 멕시코 최대 고객으로부터 18개월 전과 달리 정기적으로 대금을 받고 있다고 밝혔다.",
       "src": [
        5
       ]
      },
      {
       "text": "조정 잉여현금흐름은 1억 5,500만 달러로 조정 EBITDA의 61%(전년 3분기 36.8%)이고, 배당 1,900만 달러와 자사주 2,800만 달러로 4,700만 달러를 환원했으며, 9월 말 현금 약 12억 달러, 유동성 약 18억 달러, 순레버리지 0.28배다.",
       "src": [
        3,
        5
       ]
      },
      {
       "text": "순이익은 1억 2,000만 달러, 희석 EPS는 1.66달러(전년 1.12달러)이며, 세전이익 1억 2,900만 달러에 법인세가 400만 달러에 그쳤고 이연법인세자산 평가충당금은 5,600만 달러 줄었다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "1,143",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 -7%, 전분기 대비 +3%",
       "src": 1
      },
      {
       "label": "국제 매출",
       "value": "907",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 -8%, 전분기 대비 +1%",
       "src": 3
      },
      {
       "label": "북미 매출(계산치)",
       "value": "약 236",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 약 +15%(계산치)",
       "src": 3
      },
      {
       "label": "조정 EBITDA(마진)",
       "value": "254 (22.2%)",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +14%",
       "src": 3
      },
      {
       "label": "영업이익",
       "value": "153",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 -14%, 전분기 대비 +43%",
       "src": 1
      },
      {
       "label": "순이익",
       "value": "120",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 81백만 달러 대비 +48%",
       "src": 1
      },
      {
       "label": "희석 EPS",
       "value": "1.66",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 1.12달러",
       "src": 1
      },
      {
       "label": "DRE 매출 / 조정 EBITDA",
       "value": "331 / 90",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 매출 +14%, EBITDA +55%",
       "src": 3
      },
      {
       "label": "WCC 매출 / 조정 EBITDA",
       "value": "450 / 100",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 매출 +4%, EBITDA -7%",
       "src": 3
      },
      {
       "label": "PRI 매출",
       "value": "314",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 -1%",
       "src": 3
      },
      {
       "label": "조정 잉여현금흐름",
       "value": "155",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "조정 EBITDA 대비 61%(전년 36.8%)",
       "src": 3
      },
      {
       "label": "영업현금흐름(누적치 차감)",
       "value": "192",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "설비투자",
       "value": "45",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 44백만 달러",
       "src": 1
      },
      {
       "label": "주주환원(배당 / 자사주)",
       "value": "47 (19 / 28)",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "주당 배당",
       "value": "0.275",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "전년 0.25달러 대비 +10%",
       "src": 1
      },
      {
       "label": "순레버리지",
       "value": "0.28",
       "unit": "배",
       "period": "2026-09-30",
       "change": "",
       "src": 5
      }
     ],
     "guidance": [
      {
       "text": "4분기 매출 12억 8,000만~13억 3,000만 달러(3분기 대비 +12~16%, 계산치), 조정 EBITDA 2억 7,000만~2억 9,000만 달러를 제시했다.",
       "src": [
        5
       ]
      },
      {
       "text": "2026년 연간 조정 잉여현금흐름 전환율 가이던스를 40% 중후반에서 40% 후반으로 올렸고, 2027년에는 50% 달성을 예상한다.",
       "src": [
        5
       ]
      },
      {
       "text": "2027년 마진은 생산성 개선, 기술 중심 믹스 변화, 활동 증가로 전년 대비 개선될 것으로 보며 구체 수치는 다음 실적 발표에서 제시한다.",
       "src": [
        5
       ]
      },
      {
       "text": "최근 중동 사태로 빠른 회복 기대는 약해졌으나 4분기 조정 EBITDA는 뚜렷하게 늘어날 것으로 보며, 고객 논의가 착수 여부에서 착수 시점·속도로 바뀌어 여러 국제 운영사로부터 발주서를 받고 작업을 시작했다고 밝혔다.",
       "src": [
        5
       ]
      },
      {
       "text": "유럽/사하라 이남 아프리카/러시아 매출은 4분기 보합을 예상하고, 베네수엘라 사업은 초기 비용이 4분기 실적에 부담이 된다.",
       "src": [
        5
       ]
      }
     ],
     "read_through": {
      "text": "웨더포드는 중동 활동이 분쟁 이전 수준을 밑돌아 단기 전망에서 역내 회복을 제외했고 사우디 LSTK 계약 종료로 사우디 비중이 중동/북아프리카/아시아 매출의 20%로 낮아져, 걸프 지역 유전 서비스 수요의 정상화는 4분기 가이던스에 반영되지 않았다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Weatherford International plc XBRL company facts (Form 10-Q, quarter ended 2026-09-30)",
       "publisher": "U.S. SEC EDGAR (data.sec.gov)",
       "date": "2026-10-21",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001603923.json"
      },
      {
       "id": 2,
       "title": "Weatherford International plc EDGAR filing index (8-K Item 2.02 2026-10-20; 10-Q 2026-10-21)",
       "publisher": "U.S. SEC EDGAR (data.sec.gov)",
       "date": "2026-10-21",
       "url": "https://data.sec.gov/submissions/CIK0001603923.json"
      },
      {
       "id": 3,
       "title": "Weatherford Announces Third Quarter 2026 Results",
       "publisher": "Weatherford (GlobeNewswire, via Nasdaq)",
       "date": "2026-10-20",
       "url": "https://www.nasdaq.com/press-release/weatherford-announces-third-quarter-2026-results-2026-10-20"
      },
      {
       "id": 4,
       "title": "Weatherford Form 8-K Exhibit 99.1 - third quarter 2026 earnings release",
       "publisher": "U.S. SEC EDGAR",
       "date": "2026-10-20",
       "url": "https://www.sec.gov/Archives/edgar/data/0001603923/000160392326000118/a2026-q3ex991earningsrelea.htm"
      },
      {
       "id": 5,
       "title": "Weatherford (WFRD) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-21",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/21/weatherford-wfrd-q3-2026-earnings-call-transcript/"
      }
     ]
    },
    {
     "name_kr": "NOV",
     "name_en": "NOV Inc.",
     "ticker": "NOV",
     "yahoo": "NOV",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1021860,
     "role_kr": "Energy Products and Services와 Energy Equipment 두 부문으로 도급사·서비스 회사·생산자·조선소에 장비·부품·렌털·서비스를 공급한다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-28",
     "status": "reported",
     "highlights": [
      {
       "text": "중동 장비 반입·반출과 운임에 문제가 있으며 운임은 전년 대비 약 20% 높다고 설명했다.",
       "src": [
        1
       ]
      },
      {
       "text": "물류 변동성에 대비해 재고를 더 보유했다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "운임 증감",
       "value": "약 +20%",
       "unit": "",
       "period": "2026년 10월 28일 콜 설명",
       "change": "전년 대비",
       "src": 1
      },
      {
       "label": "중동 활동 전망(회사 전망)",
       "value": "한 자릿수 중반 감소",
       "unit": "",
       "period": "2026년 4분기",
       "change": "",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "4분기 중동 활동은 한 자릿수 중반 감소를 전망했다.",
       "src": [
        1
       ]
      }
     ],
     "read_through": {
      "text": "",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "NOV 어닝콜 · 2026년 10월 28일(질의응답 1·2·3·5·7)",
       "publisher": "NOV",
       "date": "2026-10-28",
       "url": ""
      },
      {
       "id": 2,
       "title": "NOV 회계 2025년 연차보고서 Item 1",
       "publisher": "NOV",
       "date": "",
       "url": "https://www.sec.gov/Archives/edgar/data/1021860/000119312526048350/nov-20251231.htm"
      }
     ]
    }
   ]
  },
  {
   "id": "us_producers",
   "title": "미국 생산(메이저·E&P)",
   "position": "원유·가스 공급망의 최상류(탐사·생산) 단계다. 미국 메이저와 독립계 E&P의 생산량·실현가격·투자 결정이 미국 공급 반응을 보여준다.",
   "summary": [
    "3분기 메이저 실적은 정제가 주도했고 업스트림은 유가 하락으로 후퇴했다. 엑슨모빌 업스트림 조정이익은 전분기 대비 20% 줄어든 약 73억 달러였고, Energy Products 조정이익은 41억 달러에서 91억 달러로 늘었다(엑슨모빌 4).",
    "중동 분쟁이 생산을 직접 줄이고 있다. 엑슨모빌은 카타르 LNG 중심의 약 35만 boe/일 차질을 4분기에도 가정했다(엑슨모빌 5, 7). 셰브론 해외 생산은 전년 대비 109천 boe/일 줄었다(셰브론 1). 코노코필립스 전사 생산은 전년 대비 97천 boe/일 줄었고, 자산 매매를 조정하면 카타르 영향 등으로 40천 boe/일 줄었다(코노코필립스 4).",
    "미국 원유 실현가격은 전년보다 30%대 올랐지만 퍼미안 가스는 낮게 머물렀다. EOG 원유는 86.72달러/배럴(+31%)(EOG 리소시스 4), 코노코필립스 Lower 48 원유는 85.63달러(전년 63.71달러)였고(코노코필립스 5), 다이아몬드백은 무헤지 원유 87.30달러와 가스 1.12달러/Mcf를 기록했다(다이아몬드백 에너지 5).",
    "고유가에도 미국 증산은 한 자릿수 초반에 머물렀다. EOG는 원유 550.4천 b/일(전년 대비 +3%)에 Capex 65억 달러를 유지하고 2027년 원유 증산을 한 자릿수 초반으로 제시했다(EOG 리소시스 4, 7). 다이아몬드백은 원유 525천 b/일에 2027년 기본안을 리그 19~20기·프랙 크루 5개로 잡았다(다이아몬드백 에너지 4, 8). 셰브론 미국 생산은 전년 대비 3천 boe/일 늘었다(셰브론 1).",
    "증산을 막는 요인은 자본 규율과 서비스 수급이다. 코노코필립스는 슈퍼스펙 리그 가동률 90% 초과·프랙 장비 75% 초과를 밝혔다(코노코필립스 6). EOG는 이란 분쟁 이후 하이스펙 장비 시장이 타이트해져 2027년 시추 비용 소폭 상승을 예상했다(EOG 리소시스 8). 다이아몬드백은 3분기 중 배럴당 약 60달러의 유가 변동을 이유로 신중한 계획을 유지했다(다이아몬드백 에너지 10).",
    "늘어난 현금은 환원과 대형 프로젝트로 가고 있다. 코노코필립스는 3분기 34억 달러를 환원하고 2027년 Capex 소폭 감소를 예고했다(코노코필립스 4, 9). 셰브론은 베네수엘라 합작사 총생산을 2031년 약 60만 b/일로 늘리는 계획을 내놨다(셰브론 5, 8). 엑슨모빌은 2027년 자사주 매입 200억 달러를 유지했다(엑슨모빌 1, 4)."
   ],
   "open_items": [
    "코노코필립스: 2027년 Capex는 금액 없이 '소폭 감소'로만 제시됐다. 3분기 카타르 차질 규모(천 boe/일)는 정량화되지 않았고, Lower 48 가스 실현가격은 미확인이다.",
    "EOG: 3분기 Capex 발표 금액과 가스 실현가격(달러/Mcf)은 미확인이며, Capex는 XBRL 현금흐름표 값(14.76억 달러)이다. 호르무즈에 대한 직접 발언, 유티카·도라도 활동량과 리그 수도 미확인이다. '가스로의 큰 전환' 발언은 녹취록마다 정반대로 기록돼 싣지 않았다.",
    "다이아몬드백: WTI 대비 원유 실현 비율, 이란·호르무즈 직접 발언은 미확인이다. 2026년 현금 Capex 가이던스 39.5억~40억 달러는 단일 보도 기준이고, 조정 EPS 컨센서스는 5.46달러(인베스팅닷컴)와 5.60달러(야후)로 출처마다 다르다. 2027년 증산 여부는 2월 가이던스로 미뤄졌다.",
    "옥시덴탈은 3분기 실적이 2026-11-09 발표(콜 11-10) 예정이라 2분기 수치로 대체했다. 2026-10-13 제출 8-K(항목 2.02), 2분기 발표문·콜(생산량, 실현가격, 가이던스), 상반기 중단영업 처분 대상 사업은 미확인이다.",
    "엑슨모빌: 3분기 퍼미안·가이아나 개별 생산량과 실현가격(달러/배럴) 표는 미확인이다. 인베스팅닷컴 슬라이드 요약의 중동 감산 이익 영향 29억 달러는 기간이 불명확하고 10-Q 9개월 누계 브리지(-21.4억 달러)와 달라 싣지 않았다. 우아루 생산능력은 2분기 발표문(25만 b/일)과 다른 보도(5만 b/일)가 엇갈려 싣지 않았다.",
    "셰브론: 3분기 퍼미안 생산량, 실현가격 표, 중립지대 감산 규모, 4분기 생산 가이던스와 2027년 Capex 계획은 미확인이다. '9개월 누계 이익 178억 달러' 보도는 XBRL 9개월 순이익 242억 달러와, '매출 305억 달러' 보도(GuruFocus)는 XBRL 3분기 매출 677.98억 달러와 맞지 않아 싣지 않았다.",
    "엑슨모빌 3분기 매출은 보도마다 1,033.6억~1,131.6억 달러로 엇갈린다. 본문 매출은 10-Q XBRL 값(1,131억 6,400만 달러)이다. SEC 제출 법인은 ExxonMobil Holdings Corp(CIK 0002115436)이며, 2분기 10-Q(2026-08-03)는 기존 Exxon Mobil Corp(CIK 0000034088) 접수번호로 제출됐다.",
    "발표문·녹취록 원문은 미확인이며, 내용은 요약 자료와 SEC XBRL로 확인했다. XBRL 현금흐름 항목의 분기 값은 9개월 누계에서 상반기 누계를 뺀 값이고, 야후 파이낸스 EPS·컨센서스는 집계치라 회사 발표치와 다를 수 있다. GuruFocus, RBN, TipRanks, TradingView, Stock Titan, Kalkine, rallies.ai, AOL, 엑슨모빌 기업계획 페이지 출처는 게시일이 미확인이다."
   ],
   "companies": [
    {
     "name_kr": "엑슨모빌",
     "name_en": "ExxonMobil Holdings Corporation",
     "ticker": "XOM",
     "yahoo": "XOM",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 2115436,
     "role_kr": "미국 최대 석유 생산업체로 퍼미안·가이아나 업스트림, 미국 걸프만 정제, 골든패스 LNG를 함께 운영하는 통합 메이저다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-30",
     "status": "reported",
     "highlights": [
      {
       "text": "정제 부문이 3분기 증익을 주도했다. GAAP 순이익은 154억 달러(주당 3.72달러), 조정이익은 175억 달러(주당 4.23달러)로 LSEG 컨센서스(Reuters 인용) 주당 4.08달러를 웃돌았고, Energy Products 조정이익은 전분기 41억 달러에서 91억 달러로 늘었다. 회사는 10월 16일 사전 공시에서 정제 마진 개선 효과를 약 45억 달러로 제시했다.",
       "src": [
        1,
        4,
        11
       ]
      },
      {
       "text": "업스트림 이익은 유가 하락과 가이아나 생산분배(entitlement) 축소로 줄었다. 업스트림 조정이익은 약 73억 달러로 전분기 대비 20% 감소했고, 사전 공시는 전분기 대비 액체 가격 효과 -13억 달러, 가스 가격 효과 +3억 달러를 제시했다.",
       "src": [
        1,
        4,
        10
       ]
      },
      {
       "text": "지분 생산량은 4,496천 boe/일로 전분기 4,514천, 전년 동기 4,769천 boe/일보다 적다. 10-Q는 중동·카자흐스탄 차질과 가이아나 entitlement 감소가 퍼미안·가이아나 증산을 상쇄했다고 설명했고, 9개월 누계 기준 원유 실현가격 상승이 이익을 79.6억 달러 늘린 반면 중동 차질은 21.4억 달러 줄였다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "중동 차질은 약 35만 boe/일이며 카타르에 집중돼 있다. 경영진은 손상된 LNG 트레인과 운송 제약으로 카타르 물량을 분쟁 전 수준으로 내보내지 못한다고 밝혔고, UAE 생산은 과거 수준으로 회복했으나 물류 제약으로 판매 인식이 늦어지고 있다.",
       "src": [
        5,
        6,
        7,
        14
       ]
      },
      {
       "text": "경영진은 정제제품 공급 부족이 길어진다고 봤다. 우즈 CEO는 부족분의 약 3분의 1이 중동에서 휘발유·경유 등 클린 제품을 반출하지 못하는 데서 생기고 러시아 정제설비 중단도 부족을 키웠다고 언급했으며, 정상화에는 '내년 내내(well through next year)'가 걸릴 수 있다고 밝혔다.",
       "src": [
        5,
        6,
        8
       ]
      },
      {
       "text": "퍼미안은 생산 가이던스를 예정보다 일찍 달성했고 연간 약 180만 boe/일이 예상된다. 현재 3기인 자동화 시추 리그는 2027년 퍼미안 리그의 약 25%, 2028년 약 50%로 늘린다.",
       "src": [
        6,
        7
       ]
      },
      {
       "text": "가이아나 스타브로엑 누적 생산은 발견 11년 만에 10억 배럴을 넘었고 5번째 개발인 우아루는 4분기 말 가동 예정이다. 골든패스 LNG는 애널리스트가 제3자 자료상 1호 트레인이 정격 용량에 근접했다고 언급했고, 경영진은 2호 트레인 12월 실질 완공, 3호 트레인 2027년 중반 기계적 완공 일정을 제시했다.",
       "src": [
        1,
        7,
        12,
        13
       ]
      },
      {
       "text": "현금흐름이 환원 규모를 뒷받침했다. 3분기 영업현금흐름 257억 달러, 잉여현금흐름 191억 달러 가운데 94억 달러(배당 43억 달러, 자사주 51억 달러)를 환원했고 4분기 배당을 주당 1.07달러로 4% 올렸다.",
       "src": [
        1,
        3,
        4,
        6
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "113,164",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 85,294 대비 +32.7%",
       "src": 3
      },
      {
       "label": "GAAP 순이익(지배주주)",
       "value": "15,413",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 14,525 대비 +6.1%",
       "src": 3
      },
      {
       "label": "희석 EPS",
       "value": "3.72",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 동기 1.76",
       "src": 3
      },
      {
       "label": "조정 EPS",
       "value": "4.23",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "LSEG 컨센서스(Reuters 인용) 4.08 상회",
       "src": 4
      },
      {
       "label": "업스트림 조정이익",
       "value": "약 7.3",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 -20%",
       "src": 4
      },
      {
       "label": "Energy Products 조정이익",
       "value": "9.1",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전분기 4.1",
       "src": 4
      },
      {
       "label": "석유환산 생산량",
       "value": "4,496",
       "unit": "천 boe/일",
       "period": "2026년 3분기",
       "change": "전년 동기 4,769 대비 -273",
       "src": 2
      },
      {
       "label": "중동 생산 차질",
       "value": "약 350",
       "unit": "천 boe/일",
       "period": "2026년 3분기",
       "change": "4분기 동일 수준 가정",
       "src": 7
      },
      {
       "label": "영업현금흐름(누계 차감 산출)",
       "value": "25,650",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 14,788 대비 +73.5%",
       "src": 3
      },
      {
       "label": "잉여현금흐름",
       "value": "19.1",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "현금 Capex",
       "value": "약 7.0",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 대비 -1.6십억 달러",
       "src": 9
      },
      {
       "label": "현금 Capex 누계",
       "value": "19,976",
       "unit": "백만 달러",
       "period": "2026년 1~9월",
       "change": "연간 가이던스 27~29십억 달러",
       "src": 9
      },
      {
       "label": "자사주 매입(누계 차감 산출)",
       "value": "5,103",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 5,126",
       "src": 3
      },
      {
       "label": "배당 지급(누계 차감 산출)",
       "value": "4,264",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 4,242",
       "src": 3
      },
      {
       "label": "주당 분기 배당(선언)",
       "value": "1.07",
       "unit": "달러",
       "period": "2026년 4분기",
       "change": "",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "2027년 자사주 매입 200억 달러를 합리적 시장 여건을 전제로 유지한다.",
       "src": [
        1,
        4,
        6
       ]
      },
      {
       "text": "2026년 현금 Capex 가이던스 270억~290억 달러를 유지했다. 9월까지 누계 199.76억 달러를 빼면 4분기에 70억~90억 달러가 남고(단순 계산), 2027년 1분기부터 현금 Capex는 현금흐름표상 유형자산 취득액 기준으로 바뀐다.",
       "src": [
        9
       ]
      },
      {
       "text": "4분기에도 중동 생산 차질이 3분기와 같은 약 35만 boe/일 이어진다고 가정했다.",
       "src": [
        5,
        7
       ]
      },
      {
       "text": "가이아나 우아루 FPSO는 4분기 말 가동, 골든패스 LNG 2호 트레인은 12월 실질 완공, 3호 트레인은 2027년 중반 기계적 완공이 목표다.",
       "src": [
        7,
        12
       ]
      },
      {
       "text": "12월 기업계획 발표 행사는 열지 않고 2027년 세부 계획은 1월 말 4분기 실적 발표에서 내놓는다. 기존 기업계획은 2027~2030년 연 280억~320억 달러의 현금 Capex를 제시했다.",
       "src": [
        5,
        7,
        15
       ]
      },
      {
       "text": "자동화 시추 리그 비중을 2027년 퍼미안 리그의 약 25%, 2028년 약 50%로 높인다.",
       "src": [
        6
       ]
      }
     ],
     "read_through": {
      "text": "엑슨모빌 지분 생산 기준으로 미국·가이아나 증산이 중동 차질을 메우지 못하고 있다. 3분기 생산은 전년 대비 273천 boe/일 줄었고 4분기에도 중동 차질 약 350천 boe/일을 가정해, 퍼미안 연 180만 boe/일과 우아루 가동이 더해져도 연말까지 분쟁 전 생산 수준 회복은 어렵다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "ExxonMobil Announces Third-Quarter 2026 Results (Form 8-K Exhibit 99.1)",
       "publisher": "ExxonMobil / SEC EDGAR",
       "date": "2026-10-30",
       "url": "https://www.sec.gov/Archives/edgar/data/0002115436/000211543626000018/livef8k3q26991.htm"
      },
      {
       "id": 2,
       "title": "ExxonMobil Holdings Corp Form 10-Q for the quarter ended 2026-09-30",
       "publisher": "SEC EDGAR",
       "date": "2026-11-02",
       "url": "https://www.sec.gov/Archives/edgar/data/0002115436/000211543626000020/xom-20260930.htm"
      },
      {
       "id": 3,
       "title": "ExxonMobil Holdings Corp XBRL company facts (10-Q, 2026-09-30)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-02",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0002115436.json"
      },
      {
       "id": 4,
       "title": "ExxonMobil beats third-quarter profit estimates on refining boom",
       "publisher": "Reuters (Investing.com)",
       "date": "2026-10-30",
       "url": "https://www.investing.com/news/stock-market-news/exxonmobil-beats-thirdquarter-profit-estimates-on-refining-boom-4986749"
      },
      {
       "id": 5,
       "title": "ExxonMobil (XOM) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-30",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/30/exxonmobil-xom-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 6,
       "title": "Exxon Mobil Q3 2026 Earnings Call Transcript",
       "publisher": "Benzinga",
       "date": "2026-10-30",
       "url": "https://www.benzinga.com/news/26/10/62743217/exxon-mobil-q3-2026-earnings-call-transcript"
      },
      {
       "id": 7,
       "title": "ExxonMobil Q3 2026 slides: record refining drives earnings beat",
       "publisher": "Investing.com",
       "date": "2026-10-30",
       "url": "https://www.investing.com/news/company-news/exxonmobil-q3-2026-slides-record-refining-drives-earnings-beat-93CH-4989459"
      },
      {
       "id": 8,
       "title": "What ExxonMobil (XOM) Said on Its Q3 Earnings Call",
       "publisher": "MarketBeat",
       "date": "2026-10-31",
       "url": "https://www.marketbeat.com/instant-alerts/transcript-what-exxonmobil-xom-said-on-its-q3-earnings-call-2026-10-31/"
      },
      {
       "id": 9,
       "title": "ExxonMobil : Presentation Q3 2026",
       "publisher": "MarketScreener",
       "date": "2026-10-30",
       "url": "https://www.marketscreener.com/news/exxonmobil-presentation-q3-2026-ce785fdbda8bfe27"
      },
      {
       "id": 10,
       "title": "ExxonMobil 3Q 2026 earnings considerations (Form 8-K Exhibit 99.1)",
       "publisher": "ExxonMobil / SEC EDGAR",
       "date": "2026-10-16",
       "url": "https://www.sec.gov/Archives/edgar/data/2115436/000211543626000013/f8k3q991101626.htm"
      },
      {
       "id": 11,
       "title": "ExxonMobil says refining margins added $4.5 billion in Q3 earnings",
       "publisher": "Quartz",
       "date": "2026-10-16",
       "url": "https://qz.com/exxonmobil-refining-margins-earnings-preliminary-statement-101626"
      },
      {
       "id": 12,
       "title": "Earnings call transcript: ExxonMobil posts Q3 2026 EPS beat as revenue misses",
       "publisher": "Investing.com",
       "date": "2026-10-30",
       "url": "https://in.investing.com/news/stock-market-news/earnings-call-transcript-exxonmobil-posts-q3-2026-eps-beat-as-revenue-misses-93CH-5669783"
      },
      {
       "id": 13,
       "title": "ExxonMobil Holdings Corporation (XOM) Q3 FY2026 earnings call transcript",
       "publisher": "Yahoo Finance",
       "date": "2026-10-30",
       "url": "https://finance.yahoo.com/quote/XOM/earnings/XOM-Q3-2026-earnings_call-721367.html"
      },
      {
       "id": 14,
       "title": "XOM Q3 Earnings Call Highlights Refining Strength and LNG Expansion",
       "publisher": "Zacks (TradingView News)",
       "date": "",
       "url": "https://www.tradingview.com/news/zacks:7b2f3d9b2094b:0-xom-q3-earnings-call-highlights-refining-strength-and-lng-expansion/"
      },
      {
       "id": 15,
       "title": "Corporate Plan Update",
       "publisher": "ExxonMobil",
       "date": "",
       "url": "https://investor.exxonmobil.com/news-events/corporate-plan-update"
      }
     ]
    },
    {
     "name_kr": "셰브론",
     "name_en": "Chevron Corporation",
     "ticker": "CVX",
     "yahoo": "CVX",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 93410,
     "role_kr": "퍼미안·미국 걸프만·호주 LNG·카자흐스탄 텡기즈·동지중해 가스와 베네수엘라 합작사를 보유한 통합 메이저다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-30",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 조정이익은 업스트림 실현가격 하락과 선적량 감소로 전분기보다 16억 달러 줄었다. 순이익은 99억 달러(주당 5.06달러), 조정이익은 104억 달러(주당 5.28달러)이며 법적 충당금 1.6억 달러와 손상 1.1억 달러가 포함됐고, 콜 요약 기준 업스트림 실현가격 효과는 전분기 대비 -7.05억 달러다.",
       "src": [
        1,
        5
       ]
      },
      {
       "text": "전년 대비 증익 폭은 다운스트림이 더 컸다. 업스트림 이익은 33억 달러에서 57억 달러로, 다운스트림 이익은 11억 달러에서 49억 달러로 늘었고 미국 다운스트림은 6.38억 달러에서 36억 달러가 됐다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "생산은 3,980천 boe/일로 전분기 4,070천, 전년 동기 4,086천 boe/일보다 줄었다. 미국은 2,043천 boe/일로 전년 대비 3천 boe/일 늘었고 해외는 1,937천 boe/일로 109천 boe/일 줄었는데, 고유가에 따른 entitlement 감소와 중동 분쟁 영향이 호주 최대 생산과 지분법 전환에 따른 베네수엘라 1개월분 편입을 상쇄했다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "중동 분쟁은 생산과 판매를 함께 줄였다. 10-Q는 사우디·쿠웨이트 중립지대(Partitioned Zone) 생산 감축을 명시했고, 해외 정제제품 판매는 중동 공급 차질로 129천 b/일(9%) 감소했으며, CPC 송유관·선박 드론 공격은 향후 위험 요인으로 적시됐다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "슬라이드 요약 기준 자산별 생산 변동은 가이아나 약 -65천 b/일(entitlement·정비), 텡기즈(TCO) 약 -25천 b/일(전분기 대비), 호주 +45천 b/일이다. 가스 생산은 분기 최대인 9 Bcf/일을 넘었고 동지중해도 타마르 최적화 사업과 리바이어선 3번째 수집관 가동으로 분기 최대를 기록했다.",
       "src": [
        4,
        5
       ]
      },
      {
       "text": "퍼미안은 100만 boe/일 플래토로 관리되고 있다. 100만 boe/일 이상을 6개 분기 연속 유지했고 콜에서 애널리스트는 생산이 소폭 줄었지만 목표를 웃돈다고 언급했으며, 3분기 Capex는 퍼미안 지출 축소로 전년보다 낮았고 플래토 관리 전환 뒤 배럴당 Capex는 약 25% 줄었다.",
       "src": [
        1,
        5,
        6,
        10
       ]
      },
      {
       "text": "현금 창출이 차입금 축소로 이어졌다. 영업현금흐름 160억 달러(운전자본 제외 166억 달러), 조정 FCF 142억 달러(TCO 대여금 10억 달러 상환·자산매각 포함)로 자사주 25억 달러와 배당 34.8억 달러를 지급했고 총차입금 35억 달러, 순차입금 78억 달러를 줄였다.",
       "src": [
        1,
        3,
        4,
        7
       ]
      },
      {
       "text": "베네수엘라를 중기 증산원으로 제시했다. 3개 합작사 총생산을 연말 약 30만 b/일, 2031년 약 60만 b/일로 늘리고 총 자본·운영비를 배럴당 20달러 미만, 합작사 투자를 5년간 70억 달러로 잡았으며, 본너 CFO는 3분기 분기 중 유가 변동폭이 배럴당 64달러였지만 재무 프레임워크는 바꾸지 않는다고 밝혔다.",
       "src": [
        5,
        8
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출 및 기타수익",
       "value": "67,798",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 49,726 대비 +36.3%",
       "src": 3
      },
      {
       "label": "순이익(지배주주)",
       "value": "9,924",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 12,072 대비 -17.8%",
       "src": 3
      },
      {
       "label": "희석 EPS",
       "value": "5.06",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전분기 6.11",
       "src": 3
      },
      {
       "label": "조정 EPS",
       "value": "5.28",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "업스트림 이익",
       "value": "5.7",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 3.3",
       "src": 1
      },
      {
       "label": "미국 업스트림 이익",
       "value": "3.3",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 1.3",
       "src": 2
      },
      {
       "label": "해외 업스트림 이익",
       "value": "2.4",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 2.0",
       "src": 2
      },
      {
       "label": "다운스트림 이익",
       "value": "4.9",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 1.1",
       "src": 1
      },
      {
       "label": "순생산량",
       "value": "3,980",
       "unit": "천 boe/일",
       "period": "2026년 3분기",
       "change": "전분기 4,070, 전년 동기 4,086",
       "src": 1
      },
      {
       "label": "미국 생산",
       "value": "2,043",
       "unit": "천 boe/일",
       "period": "2026년 3분기",
       "change": "전년 동기 대비 +3",
       "src": 1
      },
      {
       "label": "해외 생산",
       "value": "1,937",
       "unit": "천 boe/일",
       "period": "2026년 3분기",
       "change": "전년 동기 대비 -109",
       "src": 1
      },
      {
       "label": "천연가스 생산",
       "value": "9 초과",
       "unit": "Bcf/일",
       "period": "2026년 3분기",
       "change": "분기 최대",
       "src": 5
      },
      {
       "label": "영업현금흐름(누계 차감 산출)",
       "value": "16,014",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 9,385 대비 +70.6%",
       "src": 3
      },
      {
       "label": "조정 FCF",
       "value": "14.2",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "생산자산 취득(Capex, 누계 차감 산출)",
       "value": "4,011",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 4,444 대비 -9.7%",
       "src": 3
      },
      {
       "label": "자사주 매입(누계 차감 산출)",
       "value": "2,502",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 2,566",
       "src": 3
      },
      {
       "label": "배당 지급(누계 차감 산출)",
       "value": "3,482",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 3,429",
       "src": 3
      },
      {
       "label": "주당 분기 배당(선언)",
       "value": "1.78",
       "unit": "달러",
       "period": "2026년 4분기 지급",
       "change": "",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "4분기 자사주 매입은 25억~30억 달러로 제시했다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "2026년 Capex는 가이던스 하단에서 마무리되고 4분기 Capex는 계절적으로 늘어난다. 3분기 유기적 Capex는 39억 달러다.",
       "src": [
        6,
        9
       ]
      },
      {
       "text": "베네수엘라 3개 합작사 총생산은 연말 약 30만 b/일, 2031년 약 60만 b/일이 목표이며 자체 자금으로 조달한다.",
       "src": [
        5,
        8,
        10
       ]
      },
      {
       "text": "퍼미안 생산은 2020년대 말까지 100만 boe/일 이상을 유지한다.",
       "src": [
        4
       ]
      },
      {
       "text": "2027년 탐사 지출은 50% 늘린다(컨퍼런스콜 발언).",
       "src": [
        6
       ]
      }
     ],
     "read_through": {
      "text": "셰브론은 고유가에도 미국 생산을 늘리지 않고 퍼미안 투자를 줄였다. 브렌트 9개월 평균이 배럴당 94달러(전년 71달러)였지만 미국 생산은 2,043천 boe/일로 전년 대비 3천 boe/일 증가에 그쳤고 Capex는 40억 1,100만 달러로 10% 줄어, 셰브론의 증산 물량은 베네수엘라(연말 총생산 30만 b/일 목표)에서 나온다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Chevron Reports Third Quarter 2026 Results (Form 8-K Exhibit 99.1)",
       "publisher": "Chevron / SEC EDGAR",
       "date": "2026-10-30",
       "url": "https://www.sec.gov/Archives/edgar/data/0000093410/000009341026000196/a09302026ex9918-k.htm"
      },
      {
       "id": 2,
       "title": "Chevron Corp Form 10-Q for the quarter ended 2026-09-30",
       "publisher": "SEC EDGAR",
       "date": "2026-11-05",
       "url": "https://www.sec.gov/Archives/edgar/data/0000093410/000009341026000200/cvx-20260930.htm"
      },
      {
       "id": 3,
       "title": "Chevron Corp XBRL company facts (10-Q, 2026-09-30)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-05",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0000093410.json"
      },
      {
       "id": 4,
       "title": "Chevron Q3 2026 slides: strong cash flow, Venezuela growth story",
       "publisher": "Investing.com",
       "date": "2026-10-30",
       "url": "https://www.investing.com/news/company-news/chevron-q3-2026-slides-strong-cash-flow-venezuela-growth-story-93CH-4989454"
      },
      {
       "id": 5,
       "title": "Chevron Corp (CVX) (Q3 2026) Earnings Call Highlights: Record Production, $14.2 Billion Free Cash Flow, and a Bold Venezuela Growth Plan",
       "publisher": "GuruFocus",
       "date": "",
       "url": "https://www.gurufocus.com/news/9160537/chevron-corp-cvx-q3-2026-earnings-call-highlights-record-production-142-billion-free-cash-flow-and-a-bold-venezuela-growth-plan"
      },
      {
       "id": 6,
       "title": "Chevron Q3 2026 Earnings Call Transcript",
       "publisher": "Benzinga",
       "date": "2026-10-30",
       "url": "https://www.benzinga.com/news/26/10/62747667/chevron-q3-2026-earnings-call-transcript"
      },
      {
       "id": 7,
       "title": "Chevron posts $12.00B free cash flow in Q3 2026 as U.S. refineries run near 98% utilization",
       "publisher": "MarketChameleon",
       "date": "2026-10-30",
       "url": "https://marketchameleon.com/articles/b/2026/10/30/cvx-q3-2026-results-free-cash-flow-record-refinery-throughput"
      },
      {
       "id": 8,
       "title": "Q3 2026 Earnings Calls: Chevron Says Venezuela Production Could Double by 2031",
       "publisher": "RBN Energy",
       "date": "",
       "url": "https://rbnenergy.com/daily-posts/analyst-insight/q3-2026-earnings-calls-chevron-says-venezuela-production-could-double"
      },
      {
       "id": 9,
       "title": "Chevron (CVX) Q3 2026 Earnings Report - Results, Call & Slides",
       "publisher": "TipRanks",
       "date": "",
       "url": "https://www.tipranks.com/stocks/ch:cvx/earnings/q3-2026-report"
      },
      {
       "id": 10,
       "title": "Chevron (CVX) Q3 2026 Earnings Results & Call Transcript",
       "publisher": "MarketBeat",
       "date": "2026-10-30",
       "url": "https://www.marketbeat.com/earnings/reports/2026-10-30-chevron-co-stock/"
      }
     ]
    },
    {
     "name_kr": "코노코필립스",
     "name_en": "ConocoPhillips",
     "ticker": "COP",
     "yahoo": "COP",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1163165,
     "role_kr": "델라웨어·이글포드 등 미국 Lower 48과 캐나다 서몬트 오일샌드, 카타르 LNG 지분을 보유한 독립계 E&P다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-05",
     "status": "reported",
     "highlights": [
      {
       "text": "11월 5일 발표한 3분기 순이익은 40.0억 달러(희석 EPS 3.34달러)로 전년 동기 17.3억 달러의 2.3배다. 조정이익은 39억 달러(주당 3.27달러)로 전년 20억 달러(1.61달러)에서 늘었고 컨센서스 3.05달러(야후 집계)를 7% 웃돌았다.",
       "src": [
        1,
        2,
        3,
        4
       ]
      },
      {
       "text": "실현가격 상승이 증익을 이끌었다. 평균 실현가격은 boe당 61.40달러로 전년 동기 46.44달러보다 32% 올랐고, 원유는 배럴당 88.80달러(전년 66.13달러, +34%), Lower 48 원유는 85.63달러(전년 63.71달러), 비투멘은 57.58달러(+38%)였다.",
       "src": [
        4,
        5,
        11
       ]
      },
      {
       "text": "생산은 카타르 차질로 줄었다. 3분기 생산은 2,302천 boe/일로 전년 동기 2,399천 boe/일보다 97천 boe/일 적고 자산 매매 조정 후로는 약 2% 감소했으며, 회사는 중동 분쟁의 카타르 영향과 서몬트 로열티 상승을 원인으로 들었다. 1분기 10-Q는 연간 가이던스에 카타르 20천 boe/일, 고유가에 따른 서몬트 로열티 15천 boe/일 하향을 반영했다.",
       "src": [
        4,
        5,
        13
       ]
      },
      {
       "text": "Lower 48 생산은 1,517천 boe/일로 델라웨어 757천, 이글포드 369천, 미들랜드 197천 boe/일이며, 퍼미안 완결 크루의 펌핑 시간은 2025년 평균보다 약 15% 늘었고 3마일 이상 수평정 수를 두 배로 늘리고 있다.",
       "src": [
        4,
        6,
        7,
        10
       ]
      },
      {
       "text": "카타르 LNG는 3분기에 늘었지만 분쟁 전 수준을 밑돈다. 경영진은 호르무즈 해협 차질로 물량 이동이 제한된다고 밝혔고, 4분기 가이던스에는 제약 지속부터 M3 트레인 완전 가동까지의 범위가 들어 있다.",
       "src": [
        6,
        8
       ]
      },
      {
       "text": "영업현금흐름 72억 달러에서 Capex·투자 31억 달러를 뺀 FCF는 약 40억 달러다. 자사주 24억 달러·배당 10억 달러로 34억 달러를 환원했고 자산매각으로 16억 달러를 받았다. 분기 배당은 11% 올려 주당 0.93달러다.",
       "src": [
        1,
        4,
        7
       ]
      },
      {
       "text": "유전 서비스 수급이 타이트해졌다. 경영진은 슈퍼스펙 리그 가동률이 90%, 프랙 장비 가동률이 75%를 넘는다고 밝혔다.",
       "src": [
        6,
        10
       ]
      },
      {
       "text": "생산·운영비는 24.4억 달러로 전년 동기 26.3억 달러보다 7% 감소했고, 소득세 외 세금은 6.5억 달러로 23% 늘었다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "19,435",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 15,031 대비 +29.3%",
       "src": 1
      },
      {
       "label": "순이익",
       "value": "4,001",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 1,726 대비 +131.8%",
       "src": 1
      },
      {
       "label": "희석 EPS",
       "value": "3.34",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 동기 1.38",
       "src": 1
      },
      {
       "label": "조정이익",
       "value": "3.9",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 2.0",
       "src": 4
      },
      {
       "label": "조정 EPS",
       "value": "3.27",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "컨센서스 3.05(야후 집계) 대비 +7.3%",
       "src": 3
      },
      {
       "label": "총생산",
       "value": "2,302",
       "unit": "천 boe/일",
       "period": "2026년 3분기",
       "change": "전년 동기 2,399 대비 -97",
       "src": 4
      },
      {
       "label": "Lower 48 생산",
       "value": "1,517",
       "unit": "천 boe/일",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "델라웨어 생산",
       "value": "757",
       "unit": "천 boe/일",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "평균 실현가격",
       "value": "61.40",
       "unit": "달러/boe",
       "period": "2026년 3분기",
       "change": "전년 동기 46.44 대비 +32%",
       "src": 4
      },
      {
       "label": "원유 실현가격(전사)",
       "value": "88.80",
       "unit": "달러/배럴",
       "period": "2026년 3분기",
       "change": "전년 동기 66.13 대비 +34%",
       "src": 11
      },
      {
       "label": "Lower 48 원유 실현가격",
       "value": "85.63",
       "unit": "달러/배럴",
       "period": "2026년 3분기",
       "change": "전년 동기 63.71",
       "src": 5
      },
      {
       "label": "영업현금흐름(누계 차감 산출)",
       "value": "7,195",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 5,878 대비 +22.4%",
       "src": 1
      },
      {
       "label": "Capex·투자",
       "value": "3.1",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "FCF",
       "value": "약 4.0",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 7
      },
      {
       "label": "자사주 매입",
       "value": "2,401",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 1,274 대비 +88.5%",
       "src": 1
      },
      {
       "label": "배당 지급",
       "value": "1,007",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 975",
       "src": 1
      },
      {
       "label": "주당 분기 배당(인상 후)",
       "value": "0.93",
       "unit": "달러",
       "period": "다음 분기부터",
       "change": "+11%",
       "src": 4
      },
      {
       "label": "생산·운영비",
       "value": "2,440",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 2,632 대비 -7.3%",
       "src": 1
      },
      {
       "label": "4분기 생산 가이던스",
       "value": "2,320~2,360",
       "unit": "천 boe/일",
       "period": "2026년 4분기",
       "change": "",
       "src": 4
      }
     ],
     "guidance": [
      {
       "text": "4분기 생산 가이던스는 2,320~2,360천 boe/일, 2026년 연간 생산은 약 2,300천 boe/일이다. 4분기 범위에는 카타르 제약 지속부터 M3 트레인 완전 가동까지가 들어 있다.",
       "src": [
        4,
        5,
        8
       ]
      },
      {
       "text": "2026년 연간 Capex·DD&A 가이던스는 유지했다(10-Q).",
       "src": [
        5
       ]
      },
      {
       "text": "2027년 예비 계획은 Capex 소폭 감소, Lower 48 주도의 기저 생산 한 자릿수 초반 증가, 단위 원가 하락, 영업현금흐름의 약 45% 주주환원이며 세부 가이던스는 추후 제시한다.",
       "src": [
        6,
        7,
        9
       ]
      },
      {
       "text": "2029년까지 FCF를 70억 달러 늘리는 목표를 재확인했고, 콜에서는 WTI 70달러 기준 2025년 FCF의 약 2배라고 설명했다. 윌로(Willow) 핵심 공정과 LNG 구매 포트폴리오 확대도 진행 중이다.",
       "src": [
        4,
        6,
        12
       ]
      },
      {
       "text": "2026년 연간 설비투자 가이던스는 약 120억~125억 달러다(3분기 10-Q).",
       "src": [
        14
       ]
      }
     ],
     "read_through": {
      "text": "코노코필립스의 미국 증산은 효율 개선에 기댄 한 자릿수 초반에 머물고 카타르 차질이 전사 생산을 줄이고 있다. 3분기 생산은 전년 대비 97천 boe/일(자산 매매 조정 후 40천 boe/일) 줄었고 2027년 예비 계획은 Capex 소폭 감소 속 기저 생산 한 자릿수 초반 증가이며, 슈퍼스펙 리그(90% 초과)·프랙 장비(75% 초과) 가동률이 높아 서비스 수급이 미국 증산 속도를 제한한다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "ConocoPhillips XBRL company facts (10-Q, 2026-09-30)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-05",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001163165.json"
      },
      {
       "id": 2,
       "title": "ConocoPhillips SEC filing index (8-K Item 2.02 and 10-Q filed 2026-11-05)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-05",
       "url": "https://data.sec.gov/submissions/CIK0001163165.json"
      },
      {
       "id": 3,
       "title": "ConocoPhillips earnings history and calendar (quoteSummary)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/v10/finance/quoteSummary/COP?modules=earningsHistory,calendarEvents"
      },
      {
       "id": 4,
       "title": "ConocoPhillips announces third-quarter 2026 results and increases quarterly ordinary dividend by 11% (Form 8-K Exhibit 99.1)",
       "publisher": "ConocoPhillips / SEC EDGAR",
       "date": "2026-11-05",
       "url": "https://www.sec.gov/Archives/edgar/data/0001163165/000116316526000043/cop-20261105x8kexx991.htm"
      },
      {
       "id": 5,
       "title": "ConocoPhillips Form 10-Q for the quarter ended 2026-09-30",
       "publisher": "SEC EDGAR",
       "date": "2026-11-05",
       "url": "https://www.sec.gov/Archives/edgar/data/0001163165/000116316526000045/cop-20260930.htm"
      },
      {
       "id": 6,
       "title": "ConocoPhillips (COP) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-11-05",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/11/05/conocophillips-cop-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 7,
       "title": "ConocoPhillips Q3 2026 Earnings Call Transcript",
       "publisher": "Benzinga",
       "date": "2026-11-05",
       "url": "https://www.benzinga.com/news/26/11/62939986/conocophillips-q3-2026-earnings-call-transcript"
      },
      {
       "id": 8,
       "title": "ConocoPhillips (COP) (Q3 2026) Earnings Call Highlights: $4 Billion Free Cash Flow, 11% Dividend Hike and a $7 Billion Cash Inflection on the Horizon",
       "publisher": "GuruFocus",
       "date": "",
       "url": "https://www.gurufocus.com/news/9177969/conocophillips-cop-q3-2026-earnings-call-highlights-4-billion-free-cash-flow-11-dividend-hike-and-a-7-billion-cash-inflection-on-the-horizon"
      },
      {
       "id": 9,
       "title": "ConocoPhillips publishes Q3 2026 earnings call transcript",
       "publisher": "rallies.ai",
       "date": "",
       "url": "https://rallies.ai/news/conocophillips-publishes-q3-2026-earnings-call-transcript-358c3ad16ecd5066"
      },
      {
       "id": 10,
       "title": "Q3 2026 Earnings Calls: ConocoPhillips' New CEO Leans on the Permian and LNG for Growth",
       "publisher": "RBN Energy",
       "date": "",
       "url": "https://rbnenergy.com/daily-posts/analyst-insight/q3-2026-earnings-calls-conocophillips-new-ceo-leans-permian-and-lng"
      },
      {
       "id": 11,
       "title": "ConocoPhillips Q3 2026 earnings climb to $4B (10-Q summary)",
       "publisher": "Stock Titan",
       "date": "",
       "url": "https://www.stocktitan.net/sec-filings/COP/10-q-conocophillips-quarterly-earnings-report-1ae71d254aed.html"
      },
      {
       "id": 12,
       "title": "ConocoPhillips Targets $7 Billion Free Cash Flow Inflection by 2029, Raises Dividend 11%",
       "publisher": "Benzinga",
       "date": "2026-11-05",
       "url": "https://www.benzinga.com/markets/large-cap/26/11/62934879/conocophillips-targets-7-billion-free-cash-flow-inflection-by-2029-raises-dividend-11"
      },
      {
       "id": 13,
       "title": "ConocoPhillips Form 10-Q for the quarter ended 2026-03-31",
       "publisher": "SEC EDGAR",
       "date": "2026-04-30",
       "url": "https://www.sec.gov/Archives/edgar/data/0001163165/000116316526000018/cop-20260331.htm"
      },
      {
       "id": 14,
       "title": "ConocoPhillips 10-Q for the quarter ended 2026-09-30",
       "publisher": "SEC EDGAR",
       "date": "2026-11-05",
       "url": "https://www.sec.gov/Archives/edgar/data/1163165/000116316526000045/cop-20260930.htm"
      }
     ]
    },
    {
     "name_kr": "EOG 리소시스",
     "name_en": "EOG Resources, Inc.",
     "ticker": "EOG",
     "yahoo": "EOG",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 821189,
     "role_kr": "델라웨어 분지 중심의 미국 셰일 원유·가스 생산업체로 Encino 인수 자산과 UAE 원유 광구를 보유한다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-05",
     "status": "reported",
     "highlights": [
      {
       "text": "11월 5일 발표한 3분기 순이익은 27.8억 달러(희석 EPS 5.33달러)로 전년 동기의 1.9배이고, 조정 EPS 4.87달러는 컨센서스 4.45달러(야후 집계)를 9% 웃돌았다.",
       "src": [
        1,
        2,
        3
       ]
      },
      {
       "text": "원유·NGL·가스 생산이 모두 사상 최대이자 가이던스 중간값을 넘었다. 원유·컨덴세이트는 550.4천 b/일(가이던스 중간값 548.5, 전년 534.5), NGL은 357.1천 b/일(중간값 347.0), 총생산은 1,433.1천 boe/일로 전년 동기 1,301.2천 boe/일보다 10% 늘었고, 증가분은 델라웨어 유기 성장과 인수한 Encino 자산에서 나왔다.",
       "src": [
        4,
        5
       ]
      },
      {
       "text": "원유 실현가격은 배럴당 86.72달러로 전년 동기 65.95달러보다 31% 올랐고, NGL 매출은 8.58억 달러로 전년 6.04억 달러보다 42% 늘었다.",
       "src": [
        4,
        5
       ]
      },
      {
       "text": "투자는 연간 65억 달러 계획을 유지했다. 3분기 Capex는 가이던스 중간값을 밑돌았고 석유·가스 자산 투자(현금흐름표, 누계 차감 산출)는 14.8억 달러로 전년 동기 14.9억 달러와 비슷했으며, 단위 현금영업비와 DD&A도 가이던스 중간값보다 낮았다.",
       "src": [
        1,
        6,
        11
       ]
      },
      {
       "text": "환원을 늘렸다. FCF 22억 달러 가운데 자사주 700만 주를 10억 달러(평균 143달러)에 매입했고, 정기 배당을 8% 올려 주당 1.10달러(연 4.40달러)로 했으며 FCF의 최소 70%를 환원하는 방침을 유지했다.",
       "src": [
        4,
        7,
        12
       ]
      },
      {
       "text": "경영진은 원유 시장을 긍정적으로 봤다. 높은 제품 가격에도 수요가 견조하고 중동 공급 회복은 불안정하며, 재고 감소 속도는 둔화됐지만 세계 재고는 5년 평균을 크게 밑돈다고 밝혔다.",
       "src": [
        6,
        10
       ]
      },
      {
       "text": "이란 분쟁 이후 서비스 비용 압력이 커졌다. 경영진은 하이스펙 장비 시장이 연초에는 안정적이었으나 이란 분쟁 시작 이후 크게 타이트해졌고 철강·경유 비용도 올라 2027년 시추 비용이 소폭 오를 것으로 봤다.",
       "src": [
        8,
        10
       ]
      },
      {
       "text": "가스·해외 사업을 넓히고 있다. 델라웨어 Janus 가스처리 시설 증설을 승인했고 국제 가격 노출을 늘리는 장기 가스 공급 계약을 체결했으며, UAE 원유 광구 진척을 언급했다.",
       "src": [
        7,
        8,
        9
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "8,549",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 5,847 대비 +46.2%",
       "src": 1
      },
      {
       "label": "순이익",
       "value": "2,781",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 1,471 대비 +89.1%",
       "src": 1
      },
      {
       "label": "희석 EPS",
       "value": "5.33",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 동기 2.70",
       "src": 1
      },
      {
       "label": "조정 EPS",
       "value": "4.87",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "컨센서스 4.45(야후 집계) 대비 +9.3%",
       "src": 3
      },
      {
       "label": "원유·컨덴세이트 생산",
       "value": "550.4",
       "unit": "천 b/일",
       "period": "2026년 3분기",
       "change": "전년 동기 534.5 대비 +3.0%, 가이던스 중간값 548.5",
       "src": 4
      },
      {
       "label": "NGL 생산",
       "value": "357.1",
       "unit": "천 b/일",
       "period": "2026년 3분기",
       "change": "가이던스 중간값 347.0",
       "src": 4
      },
      {
       "label": "총생산",
       "value": "1,433.1",
       "unit": "천 boe/일",
       "period": "2026년 3분기",
       "change": "전년 동기 1,301.2 대비 +10.1%",
       "src": 4
      },
      {
       "label": "원유·컨덴세이트 실현가격",
       "value": "86.72",
       "unit": "달러/배럴",
       "period": "2026년 3분기",
       "change": "전년 동기 65.95 대비 +31%",
       "src": 4
      },
      {
       "label": "영업현금흐름(누계 차감 산출)",
       "value": "3,813",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 3,111 대비 +22.6%",
       "src": 1
      },
      {
       "label": "석유·가스 자산 투자(누계 차감 산출)",
       "value": "1,476",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 1,492 대비 -1.1%",
       "src": 1
      },
      {
       "label": "FCF",
       "value": "2.2",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 7
      },
      {
       "label": "자사주 매입",
       "value": "1.0",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "700만 주, 평균 143달러",
       "src": 4
      },
      {
       "label": "주당 분기 배당(인상 후)",
       "value": "1.10",
       "unit": "달러",
       "period": "다음 분기부터",
       "change": "+8%",
       "src": 4
      },
      {
       "label": "순차입금",
       "value": "약 2.2",
       "unit": "십억 달러",
       "period": "2026-09-30",
       "change": "현금 5.7십억 달러",
       "src": 7
      },
      {
       "label": "잔여 자사주 매입 한도",
       "value": "10.6",
       "unit": "십억 달러",
       "period": "2026-09-30",
       "change": "6월 말 11.7",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "2026년 원유 생산 5%, 총생산 14% 증가와 Capex 65억 달러(변동 없음)를 제시했다.",
       "src": [
        7,
        8
       ]
      },
      {
       "text": "4분기 원유 생산 가이던스는 548~553천 b/일이고 연간 원유 가이던스는 549.5천 b/일로 소폭 올렸다.",
       "src": [
        9
       ]
      },
      {
       "text": "2027년에는 현재와 비슷한 활동량으로 원유 생산을 한 자릿수 초반 늘릴 계획이며, 현재 수급 여건 유지를 전제로 한다.",
       "src": [
        7,
        9
       ]
      },
      {
       "text": "레버리지 목표는 WTI 45달러·헨리허브 2.50달러의 하단 가격에서 총차입금/EBITDA 1배 미만이다.",
       "src": [
        7
       ]
      },
      {
       "text": "2027년 시추 비용은 소폭 상승을 예상한다.",
       "src": [
        8
       ]
      }
     ],
     "read_through": {
      "text": "EOG는 고유가에도 활동량을 늘리지 않고 2027년 원유 증산을 한 자릿수 초반으로 묶었다. 3분기 원유 실현가격이 배럴당 86.72달러(+31%)였지만 Capex는 연 65억 달러로 유지됐고, 원유 생산은 550.4천 b/일로 전년 대비 3% 증가에 그쳤다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "EOG Resources XBRL company facts (10-Q, 2026-09-30)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-05",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0000821189.json"
      },
      {
       "id": 2,
       "title": "EOG Resources SEC filing index (8-K Item 2.02 and 10-Q filed 2026-11-05)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-05",
       "url": "https://data.sec.gov/submissions/CIK0000821189.json"
      },
      {
       "id": 3,
       "title": "EOG Resources earnings history and calendar (quoteSummary)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/v10/finance/quoteSummary/EOG?modules=earningsHistory,calendarEvents"
      },
      {
       "id": 4,
       "title": "EOG Resources Reports Third Quarter 2026 Results and Raises Regular Dividend 8%",
       "publisher": "EOG Resources (PR Newswire)",
       "date": "2026-11-05",
       "url": "https://www.prnewswire.com/news-releases/eog-resources-reports-third-quarter-2026-results-and-raises-regular-dividend-8-302931110.html"
      },
      {
       "id": 5,
       "title": "EOG Resources Form 10-Q for the quarter ended 2026-09-30",
       "publisher": "SEC EDGAR",
       "date": "2026-11-05",
       "url": "https://www.sec.gov/Archives/edgar/data/0000821189/000082118926000227/eog-20260930.htm"
      },
      {
       "id": 6,
       "title": "EOG Resources (EOG) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-11-06",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/11/06/eog-resources-eog-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 7,
       "title": "EOG Resources Q3 2026 Earnings Call Transcript",
       "publisher": "Benzinga",
       "date": "2026-11-06",
       "url": "https://www.benzinga.com/news/26/11/62991030/eog-resources-q3-2026-earnings-call-transcript"
      },
      {
       "id": 8,
       "title": "EOG Resources, Inc. (EOG) Q3 FY2026 earnings call transcript",
       "publisher": "Yahoo Finance",
       "date": "2026-11-06",
       "url": "https://finance.yahoo.com/quote/EOG/earnings/EOG-Q3-2026-earnings_call-725163.html"
      },
      {
       "id": 9,
       "title": "Q3 2026 Earnings Calls: EOG Lifts 2026 Oil Guidance, Doubles Janus Plant as Well Performance Beats Expectations",
       "publisher": "RBN Energy",
       "date": "",
       "url": "https://rbnenergy.com/daily-posts/analyst-insight/q3-2026-earnings-calls-eog-lifts-2026-oil-guidance-doubles-janus-plant-well-performance-beats-expectations"
      },
      {
       "id": 10,
       "title": "[EOG Resources Q3 2026 Earnings Call] EOG Raises Dividend 8% to $4.40 and Posts Record Oil, NGL and Gas Output with $2.2 Billion Free Cash Flow",
       "publisher": "BigGo Finance",
       "date": "2026-11-06",
       "url": "https://finance.biggo.com/news/US_EOG_2026-11-06"
      },
      {
       "id": 11,
       "title": "EOG Resources, Inc. Q3 2026 Earnings Call Summary",
       "publisher": "Yahoo Finance",
       "date": "",
       "url": "https://finance.yahoo.com/energy/articles/eog-resources-inc-q3-2026-133000519.html"
      },
      {
       "id": 12,
       "title": "EOG Resources (EOG) Q3 2026 Earnings Call Transcript",
       "publisher": "AOL",
       "date": "",
       "url": "https://www.aol.com/articles/eog-resources-eog-q3-2026-193241000.html"
      }
     ]
    },
    {
     "name_kr": "다이아몬드백 에너지",
     "name_en": "Diamondback Energy, Inc.",
     "ticker": "FANG",
     "yahoo": "FANG",
     "exchange": "Nasdaq",
     "country": "미국",
     "cik": 1539838,
     "role_kr": "미들랜드 분지 중심의 퍼미안 전업 원유 생산업체다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-02",
     "status": "reported",
     "highlights": [
      {
       "text": "11월 2일 발표한 3분기 순이익(지배주주)은 16.0억 달러(희석 EPS 5.69달러)로 전년 동기보다 57% 늘었고, 조정 EPS 5.86달러는 컨센서스(인베스팅닷컴 5.46달러, 야후 집계 5.60달러)를 웃돌았다.",
       "src": [
        1,
        2,
        3,
        11
       ]
      },
      {
       "text": "원유 생산은 525천 b/일(총 1,034천 boe/일)이며, 2026년 원유 가이던스를 약 524천 b/일(기존 522천 이상)로, 총생산 가이던스를 약 1,015천 boe/일로 올렸다.",
       "src": [
        4
       ]
      },
      {
       "text": "원유 실현가격은 높고 가스는 낮다. 3분기 무헤지 실현가격은 원유 배럴당 87.30달러(헤지 반영 85.89달러), 가스 Mcf당 1.12달러(헤지 반영 0.90달러), NGL 배럴당 20.02달러이며, boe 기준 51.03달러로 2분기 51.68달러와 비슷했다.",
       "src": [
        5,
        6
       ]
      },
      {
       "text": "투자는 3분기 수준에서 묶었다. 3분기 현금 Capex는 10억 달러, 재투자율은 약 32%(스트립 기준 약 30%)이고, 4분기에도 3분기와 같은 활동량과 Capex를 유지한다.",
       "src": [
        4,
        7,
        16
       ]
      },
      {
       "text": "FCF는 21억 달러(조정 22억 달러)이고 자사주 130만 주를 약 2.51억 달러에 매입했으며 기본 배당을 7.3% 올려 연 4.72달러로 했다. 9월 말 잔여 자사주 한도는 97억 달러로 6월 말 20억 달러에서 늘었다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "경영진은 유가 변동성을 이유로 신중했다. 반트호프 CEO는 3분기 중 배럴당 약 60달러의 유가 변동을 근거로 보수적 운용을 유지하고 유가 약세 때 자사주를 매입했다고 밝혔고, 개인적으로는 '고유가 장기화' 쪽이지만 영구 강세론은 경계한다고 말했다.",
       "src": [
        9,
        10
       ]
      },
      {
       "text": "2027년 공식 계획은 2월에 나온다. 기본안은 리그 19~20기와 프랙 크루 5개, 완결 길이는 2026년 644만 피트와 비슷한 수준이며, 증산하려면 4분기 지출 범위를 다소 웃도는 투자가 필요해 매크로 상황을 보고 결정한다.",
       "src": [
        7,
        8,
        11,
        12
       ]
      },
      {
       "text": "비용은 오르고 있다. 현금 영업비용은 boe당 10.91달러로 전년 동기 10.05달러보다 9% 올랐고, 경영진은 유가 100달러 부근에서 서비스 비용 인플레이션이 나타날 수 있다고 봤다.",
       "src": [
        13,
        15
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "5,431",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 3,924 대비 +38.4%",
       "src": 1
      },
      {
       "label": "순이익(지배주주)",
       "value": "1,603",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 1,018 대비 +57.5%",
       "src": 1
      },
      {
       "label": "희석 EPS",
       "value": "5.69",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 동기 3.51",
       "src": 1
      },
      {
       "label": "조정 EPS",
       "value": "5.86",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "컨센서스 5.46(인베스팅닷컴)",
       "src": 11
      },
      {
       "label": "원유 생산",
       "value": "525",
       "unit": "천 b/일",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "총생산",
       "value": "1,034",
       "unit": "천 boe/일",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "무헤지 원유 실현가격",
       "value": "87.30",
       "unit": "달러/배럴",
       "period": "2026년 3분기",
       "change": "헤지 반영 85.89",
       "src": 5
      },
      {
       "label": "무헤지 가스 실현가격",
       "value": "1.12",
       "unit": "달러/Mcf",
       "period": "2026년 3분기",
       "change": "헤지 반영 0.90",
       "src": 5
      },
      {
       "label": "NGL 실현가격",
       "value": "20.02",
       "unit": "달러/배럴",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "boe당 실현가격(무헤지)",
       "value": "51.03",
       "unit": "달러/boe",
       "period": "2026년 3분기",
       "change": "전분기 51.68",
       "src": 6
      },
      {
       "label": "현금 영업비용",
       "value": "10.91",
       "unit": "달러/boe",
       "period": "2026년 3분기",
       "change": "전년 동기 10.05",
       "src": 15
      },
      {
       "label": "현금 Capex",
       "value": "1.0",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "시추·완결·인프라 투자(누계 차감 산출)",
       "value": "1,026",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 774 대비 +32.6%",
       "src": 1
      },
      {
       "label": "영업현금흐름(누계 차감 산출)",
       "value": "2,599",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 2,383 대비 +9.1%",
       "src": 1
      },
      {
       "label": "FCF / 조정 FCF",
       "value": "2.1 / 2.2",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "자사주 매입",
       "value": "약 251",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "130만 주",
       "src": 4
      },
      {
       "label": "연 기본 배당(인상 후)",
       "value": "4.72",
       "unit": "달러",
       "period": "연환산",
       "change": "+7.3%",
       "src": 4
      },
      {
       "label": "생산세",
       "value": "287",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 212 대비 +35.4%",
       "src": 1
      },
      {
       "label": "총차입금",
       "value": "13,230",
       "unit": "백만 달러",
       "period": "2026-09-30",
       "change": "1년 전 16,242",
       "src": 1
      },
      {
       "label": "잔여 자사주 매입 한도",
       "value": "9.7",
       "unit": "십억 달러",
       "period": "2026-09-30",
       "change": "6월 말 2.0",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "2026년 원유 생산 가이던스를 약 524천 b/일(기존 522천 이상), 총생산을 약 1,015천 boe/일로 올렸다.",
       "src": [
        4
       ]
      },
      {
       "text": "4분기 활동량과 Capex는 3분기 수준을 유지한다.",
       "src": [
        4,
        7
       ]
      },
      {
       "text": "2026년 현금 Capex 가이던스는 39.5억~40억 달러다(보도 기준).",
       "src": [
        14
       ]
      },
      {
       "text": "2027년 공식 가이던스는 2월에 내놓는다. 기본안은 리그 19~20기·프랙 크루 5개, 완결 길이는 2026년(644만 피트)과 비슷한 수준이며, 증산 여부는 매크로와 서비스 비용을 보고 결정한다.",
       "src": [
        7,
        8,
        11,
        12
       ]
      }
     ],
     "read_through": {
      "text": "퍼미안 대형 독립계의 고유가 증산 대응은 아직 없다. 다이아몬드백은 무헤지 원유 실현가격 배럴당 87.30달러에도 원유 생산을 525천 b/일에 유지했고, 2027년 기본안도 리그 19~20기·프랙 크루 5개로 잡았다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Diamondback Energy XBRL company facts (10-Q, 2026-09-30)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-04",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001539838.json"
      },
      {
       "id": 2,
       "title": "Diamondback Energy SEC filing index (8-K Item 2.02 filed 2026-11-02, 10-Q filed 2026-11-04)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-02",
       "url": "https://data.sec.gov/submissions/CIK0001539838.json"
      },
      {
       "id": 3,
       "title": "Diamondback Energy earnings history and calendar (quoteSummary)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/v10/finance/quoteSummary/FANG?modules=earningsHistory,calendarEvents"
      },
      {
       "id": 4,
       "title": "Diamondback Energy, Inc. Announces Third Quarter 2026 Financial and Operating Results; Increases Base Dividend (Form 8-K Exhibit 99.1)",
       "publisher": "Diamondback Energy / SEC EDGAR",
       "date": "2026-11-02",
       "url": "https://www.sec.gov/Archives/edgar/data/0001539838/000153983826000180/diamondbackex991-11x2x26.htm"
      },
      {
       "id": 5,
       "title": "Diamondback Energy Form 8-K (Item 2.02): third quarter 2026 realized prices",
       "publisher": "SEC EDGAR",
       "date": "2026-10-08",
       "url": "https://www.sec.gov/Archives/edgar/data/0001539838/000153983826000177/fang-20261008.htm"
      },
      {
       "id": 6,
       "title": "Diamondback Energy Reports Q3 2026 Commodity Prices and $182 Million Derivative Loss",
       "publisher": "Kalkine Media",
       "date": "",
       "url": "https://kalkinemedia.com/us/news/announcements/diamondback-energy-reports-q3-2026-commodity-prices-and-182-million-derivative-loss"
      },
      {
       "id": 7,
       "title": "Diamondback (FANG) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-11-03",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/11/03/diamondback-fang-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 8,
       "title": "Diamondback Energy Q3 2026 Earnings Call Transcript",
       "publisher": "Benzinga",
       "date": "2026-11-03",
       "url": "https://www.benzinga.com/news/26/11/62825678/diamondback-energy-q3-2026-earnings-call-transcript"
      },
      {
       "id": 9,
       "title": "Diamondback Energy, Inc. (FANG) Q3 FY2026 earnings call transcript",
       "publisher": "Yahoo Finance",
       "date": "2026-11-03",
       "url": "https://finance.yahoo.com/quote/FANG/earnings/FANG-Q3-2026-earnings_call-723780.html"
      },
      {
       "id": 10,
       "title": "Q3 2026 Earnings Calls: Diamondback Holds 525 Mbbl/d as Barnett Closes In on Core Economics",
       "publisher": "RBN Energy",
       "date": "",
       "url": "https://rbnenergy.com/daily-posts/analyst-insight/q3-2026-earnings-calls-diamondback-holds-525-mbbld-barnett-closes-core"
      },
      {
       "id": 11,
       "title": "Earnings call transcript: Diamondback Energy tops Q3 2026 forecasts as stock slips",
       "publisher": "Investing.com",
       "date": "2026-11-03",
       "url": "https://www.investing.com/news/transcripts/earnings-call-transcript-diamondback-energy-tops-q3-2026-forecasts-as-stock-slips-93CH-4995831"
      },
      {
       "id": 12,
       "title": "What Diamondback Energy (FANG) Said on Its Q3 Earnings Call",
       "publisher": "MarketBeat (TradingView News)",
       "date": "",
       "url": "https://www.tradingview.com/news/marketbeat:6ea75f619094b:0-what-diamondback-energy-fang-said-on-its-q3-earnings-call/"
      },
      {
       "id": 13,
       "title": "Diamondback Energy Inc (FANG) Q3 2026 Earnings Call Highlights: Low Reinvestment Rates, Barnett ...",
       "publisher": "GuruFocus (Investing.com)",
       "date": "",
       "url": "https://ca.investing.com/news/company-news/diamondback-energy-inc-fang-q3-2026-earnings-call-highlights-low-reinvestment-rates-barnett--4931731"
      },
      {
       "id": 14,
       "title": "Diamondback Energy Reports Q3 2026 Results, Raises Dividend and Production Guidance",
       "publisher": "TradingView News",
       "date": "",
       "url": "https://www.tradingview.com/news/tradingview:d3271a711f39c:0-diamondback-energy-reports-q3-2026-results-raises-dividend-and-production-guidance/"
      },
      {
       "id": 15,
       "title": "Diamondback Q3 Earnings Beat on Higher Oil Prices and Production",
       "publisher": "Zacks (Yahoo Finance)",
       "date": "",
       "url": "https://sg.finance.yahoo.com/news/diamondback-q3-earnings-beat-higher-134700228.html"
      },
      {
       "id": 16,
       "title": "Diamondback Energy Form 8-K Exhibit 99.2 (Q3 2026 stockholder letter)",
       "publisher": "Diamondback Energy / SEC EDGAR",
       "date": "2026-11-02",
       "url": "https://www.sec.gov/Archives/edgar/data/0001539838/000153983826000180/diamondbackex992-11x2x26.htm"
      }
     ]
    },
    {
     "name_kr": "옥시덴탈 페트롤리엄",
     "name_en": "Occidental Petroleum Corporation",
     "ticker": "OXY",
     "yahoo": "OXY",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 797468,
     "role_kr": "퍼미안 중심의 미국 셰일과 중동 자산을 보유한 E&P다.",
     "period": "2026년 2분기(3분기 실적은 2026-11-09 발표 예정)",
     "period_end": "2026-06-30",
     "report_date": "2026-08-05",
     "status": "not_yet",
     "highlights": [
      {
       "text": "3분기 실적은 아직 발표되지 않았다. 발표는 2026-11-09, 컨퍼런스콜은 11-10 예정이며(야후 파이낸스 일정), 3분기 컨센서스는 EPS 1.47달러, 매출 68.9억 달러(애널리스트 추정치)다.",
       "src": [
        2,
        3
       ]
      },
      {
       "text": "2분기 매출은 80.7억 달러로 전년 동기 52.6억 달러보다 53% 늘었고 희석 EPS는 2.75달러(전년 0.26달러)였다.",
       "src": [
        1
       ]
      },
      {
       "text": "2분기 조정 EPS는 2.40달러로 컨센서스 1.86달러를 29% 웃돌았다(야후 파이낸스 집계).",
       "src": [
        3
       ]
      },
      {
       "text": "상반기 자본배분은 차입금 축소에 집중됐다. 리스 포함 총차입금은 2025년 말 224억 달러에서 6월 말 137억 달러로 줄었고 상반기 장기차입금 상환은 87억 달러이며, 같은 기간 중단영업 처분이익 31.2억 달러와 중단영업 투자현금 유입 94.6억 달러가 있었다.",
       "src": [
        1
       ]
      },
      {
       "text": "2분기 계속영업 영업현금흐름은 50.9억 달러, 유형자산 투자는 15.9억 달러(누계 차감 산출)이고 자사주 취득은 0.4억 달러에 그쳤다.",
       "src": [
        1
       ]
      },
      {
       "text": "배당은 주당 0.26달러(전년 0.24달러)이며 우선주 배당 1.7억 달러가 별도로 나갔다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "8,065",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "전년 동기 5,258 대비 +53.4%",
       "src": 1
      },
      {
       "label": "희석 EPS",
       "value": "2.75",
       "unit": "달러",
       "period": "2026년 2분기",
       "change": "전년 동기 0.26",
       "src": 1
      },
      {
       "label": "조정 EPS(야후 파이낸스 집계)",
       "value": "2.40",
       "unit": "달러",
       "period": "2026년 2분기",
       "change": "컨센서스 1.86 대비 +29.0%",
       "src": 3
      },
      {
       "label": "계속영업 영업현금흐름(누계 차감 산출)",
       "value": "5,086",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "",
       "src": 1
      },
      {
       "label": "유형자산 투자(누계 차감 산출)",
       "value": "1,589",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "",
       "src": 1
      },
      {
       "label": "총차입금(리스 포함)",
       "value": "13,743",
       "unit": "백만 달러",
       "period": "2026-06-30",
       "change": "2025-12-31 22,396",
       "src": 1
      },
      {
       "label": "주당 분기 배당(선언)",
       "value": "0.26",
       "unit": "달러",
       "period": "2026년 2분기",
       "change": "전년 동기 0.24",
       "src": 1
      },
      {
       "label": "석유·가스 생산활동 비용",
       "value": "1,117",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "전년 동기 1,135 대비 -1.6%",
       "src": 1
      },
      {
       "label": "3분기 컨센서스 EPS(애널리스트 추정치)",
       "value": "1.47",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "2분기 조정 EPS 2.40 대비 -38.7%",
       "src": 3
      },
      {
       "label": "3분기 컨센서스 매출(애널리스트 추정치)",
       "value": "6.89",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      }
     ],
     "guidance": [],
     "read_through": {
      "text": "옥시덴탈 3분기 컨센서스 EPS 1.47달러는 2분기 조정 EPS 2.40달러보다 39% 낮아, 3분기 유가 하락이 독립계 실적 추정에 반영돼 있다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Occidental Petroleum XBRL company facts (10-Q, 2026-06-30)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-08-05",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0000797468.json"
      },
      {
       "id": 2,
       "title": "Occidental Petroleum SEC filing index (latest 8-K Item 2.02 filed 2026-10-13; no Q3 10-Q as of 2026-11-07)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-10-13",
       "url": "https://data.sec.gov/submissions/CIK0000797468.json"
      },
      {
       "id": 3,
       "title": "Occidental Petroleum earnings calendar and history (quoteSummary)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/v10/finance/quoteSummary/OXY?modules=earningsHistory,calendarEvents"
      }
     ]
    }
   ]
  },
  {
   "id": "intl_producers",
   "title": "국제 메이저·국영 석유사",
   "position": "원유·가스 생산부터 LNG 액화·트레이딩과 정제까지 통합 운영하는 공급 측 최상류 기업군이다.",
   "summary": [
    "3분기 메이저 이익 증가는 정제마진이 주도했다. 정제 지표마진은 BP 배럴당 46.7달러(전년 동기 15.8달러), 셸 42달러(전년 동기 11.6달러), 토탈에너지스 ERM 33.2달러(전년 동기 8.4달러)였고 아람코 다운스트림 조정 EBIT도 103억 달러로 전년 대비 234% 늘었다(BP 3, 셸 3, 셸 2, 토탈에너지스 1, 사우디 아람코 1).",
    "호르무즈 LNG 통항 제약은 4분기에도 이어진다. 토탈에너지스는 LNG선 통항이 전쟁 전의 약 25%에 그친다고 밝혔고 셸은 펄 GTL 두 번째 트레인 가동을 호르무즈 재개 조건부로 2027년 1분기 말로 잡았다(토탈에너지스 2, 셸 4).",
    "LNG·가스 가격 상승이 정비에 따른 물량 감소를 상쇄했다. 토탈에너지스 평균 LNG 판매가격은 MMBtu당 12.28달러(2분기 대비 +20%, 4분기 14달러 이상 전망), 에퀴노르 실현 유럽 가스가격은 20.0달러였고 셸 LNG 액화량(740만 톤)과 토탈에너지스 LNG 판매량(980만 톤)은 2분기보다 줄었다(토탈에너지스 1, 에퀴노르 1, 셸 1).",
    "걸프 원유 공급은 회복 중이나 전년 수준에 못 미친다. 아람코 총 탄화수소 생산은 1,104.6만 boe/d로 2분기 대비 17% 늘고 전년 동기 대비 17% 줄었고, 나세르 CEO는 분쟁 전 수준 복귀에 수일, MSC 1,200만 b/d 도달에 3주 미만이 걸린다고 밝혔다(사우디 아람코 2, 사우디 아람코 3).",
    "경영진은 중동 차질 장기화를 전제하고 있다. BP는 2027년까지의 중동 공급 차질을 가격 가정에 넣었고 토탈에너지스는 4분기 초 유가가 배럴당 100달러를 웃돈다고 밝혔으며, 비걸프 공급원인 페트로브라스는 3분기 원유·연료 수출 125.1만 b/d로 최대치를 기록했다(BP 1, 토탈에너지스 3, 페트로브라스 5).",
    "현금흐름 급증은 주주환원 확대와 부채 축소로 이어졌다. 셸은 향후 3개월 50억 달러, 토탈에너지스는 4분기와 2027년 1분기 각각 25억 달러 자사주 매입을 승인한 반면 BP는 순부채를 139억 달러로 84억 달러 줄이면서 자사주 매입 재개를 미뤘다(셸 2, 토탈에너지스 1, BP 3, BP 4)."
   ],
   "open_items": [
    "발표문·트랜스크립트 원문은 미확인이다. 모든 회사 수치는 발표문·트랜스크립트 발췌, Yahoo Finance 재무 데이터, SEC 제출 목록으로 확인했다.",
    "셸(영업현금흐름 210.4억 달러·순이익 120.6억 달러·매출 928.5억 달러), BP(영업현금흐름 148.3억 달러·순이익 47.0억 달러), 에퀴노르(순이익 25.4억 달러·조정 EPS 1.20달러), 아람코(영업현금흐름 387억 달러·잉여현금흐름 282억 달러·자본지출 105.2억 달러)는 회사 발표치와 Yahoo 집계치가 일치한다. 아람코 순이익은 회사 발표 1,359억 리얄과 Yahoo 1,373.9억 리얄이 0.9% 다르다.",
    "사우디 아람코: 원유·가스 생산 구분, OSP, 호르무즈 '보호 회랑' 운영 세부, 부채비율, 3분기 주당 배당액은 미확인이다. 10월 수출이 선박 추적 기준 약 700만 b/d로 전쟁 전 수준을 회복했다는 보도는 출처가 특정되지 않아 싣지 않았다.",
    "토탈에너지스: 카타르 물량 손실에도 아시아 LNG 고객에 불가항력을 선언하지 않았다는 컨퍼런스콜 발언은 요약 자료 간 엇갈려 싣지 않았다. 2026년 현금흐름 전망(420억 달러 초과, 최대 430억 달러)과 4분기 유가 100달러 이상 전망은 2차 보도 기준이고, 액체 실현가격 절대 수준은 미확인이다.",
    "에퀴노르: 노르웨이 가스 생산량과 유럽향 가스 공급량(bcm), 4분기 생산·정비 가이던스, 러시아 관련 발언은 미확인이다. 지분 생산 216.6만 boe/d는 2차 출처(IndexBox) 수치다.",
    "페트로브라스: 3분기 재무 실적 발표일(11월 10일)은 Yahoo 캘린더(확정 표시) 기준이며 회사 IR 일정으로는 미확인이다. 수출 행선지(중국 비중)와 2분기 정제 가동률 수치도 미확인이다.",
    "BP: 3분기 배당 결의액(주당 0.0866달러로 보도됐으나 2분기 배당과 구분 불명확)과 컨퍼런스콜의 이라크(루마일라) 수출 관련 답변 내용은 미확인이다.",
    "셸: 순부채는 출처 간 수치가 엇갈려 싣지 않았다. Yahoo 집계 자본지출(75.8억 달러)은 셸의 '현금 자본지출' 정의와 다를 수 있고, 4분기 LNG 액화 가이던스(730만~790만 톤)에 카타르 물량이 포함됐는지는 미확인이다.",
    "Yahoo 집계 조정 EPS는 Yahoo non-GAAP 기준이고 컨센서스는 애널리스트 추정이다.",
    "게재일이 미확인인 2차 출처(셸 5 TradingView/Quartr, 사우디 아람코 3 Investing.com, 에퀴노르 3 Benzinga·4 OGJ·5 IndexBox)의 날짜는 실적 발표일 또는 컨퍼런스콜 날짜다."
   ],
   "companies": [
    {
     "name_kr": "셸",
     "name_en": "Shell plc",
     "ticker": "SHEL",
     "yahoo": "SHEL",
     "exchange": "LSE / NYSE",
     "country": "United Kingdom",
     "cik": null,
     "role_kr": "LNG 액화·판매·트레이딩 비중이 큰 영국 통합 메이저로, 카타르 LNG와 펄 GTL 지분을 통해 호르무즈 차질의 영향을 직접 받는다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-29",
     "status": "reported",
     "highlights": [
      {
       "text": "이익 증가는 정제마진 급등이 이끌었고, 3분기 조정이익은 108억 달러로 2분기(98.4억 달러) 대비 10%, 전년 동기(54억 달러) 대비 약 2배 늘었다. 발표문은 트레이딩·최적화 기여가 비현금성 타이밍 효과로 매우 강했던 2분기보다 줄었다고 설명했다.",
       "src": [
        2
       ]
      },
      {
       "text": "화학·제품 부문은 정제마진 상승으로 조정이익 38.6억 달러를 냈고, 지표 정제마진은 배럴당 42달러로 2분기(24달러)와 전년 동기(11.6달러)를 크게 웃돌았으나 라인강 저수위로 라인란트 정제소 가동이 줄어 정제 가동률은 96%(2분기 102%)로 낮아졌다.",
       "src": [
        2,
        3
       ]
      },
      {
       "text": "LNG 액화량은 계획정비로 740만 톤(2분기 770만 톤)으로 줄었고 LNG 판매량은 1,930만 톤(2분기 1,800만 톤)으로 늘어, 판매량과 액화량의 차이가 1,180만 톤(2분기 1,020만 톤)으로 커졌다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "카타르 차질은 4분기에도 이어진다. 펄 GTL은 1개 트레인만 부분 재가동했고 두 번째 트레인은 호르무즈 해협 재개를 조건으로 2027년 1분기 말 가동 예정이며, 경영진은 당분간 현금흐름·이익 기여를 기대하지 않는다고 밝혔다.",
       "src": [
        4
       ]
      },
      {
       "text": "통합가스는 ARC 리소시스 인수(9월 2일 완료)와 가스 가격 상승으로 이익이 늘었다. 생산은 77.2만 boe/d(2분기 63.1만 boe/d), 조정이익은 30.4억 달러(2분기 26.9억 달러), 실현 가스가격은 mscf당 8.3달러(2분기 7.2달러)다.",
       "src": [
        2,
        6
       ]
      },
      {
       "text": "업스트림은 유가 하락으로 이익이 줄었다. 조정이익은 31.9억 달러(2분기 34.9억 달러), 생산은 180만 boe/d(2분기 182만 boe/d), 액체 실현가격은 배럴당 84달러(2분기 89달러)다.",
       "src": [
        2,
        6
       ]
      },
      {
       "text": "중동 생산 차질에도 현금흐름이 주주환원을 뒷받침했다. 영업현금흐름은 210억 달러, 잉여현금흐름은 163억 달러(전년 동기 100억 달러)이고, 향후 3개월 50억 달러 자사주 매입과 주당 0.3906달러 배당을 발표했으며 부채비율(gearing)은 16.6%다.",
       "src": [
        2
       ]
      },
      {
       "text": "경영진은 중동-중국 항로 운임이 2025년의 약 10배라고 밝혔다. 고객의 LNG 공급원·운송 경로 다변화 관심은 커졌으나 계약 변화 여부는 판단하기 이르다고 말했다.",
       "src": [
        5,
        4
       ]
      }
     ],
     "metrics": [
      {
       "label": "조정이익",
       "value": "10.8",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전년 대비 +99%",
       "src": 2
      },
      {
       "label": "IFRS 주주귀속 순이익",
       "value": "12.06",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전년 대비 +127%",
       "src": 7
      },
      {
       "label": "영업현금흐름(CFFO)",
       "value": "21.04",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전년 대비 +72%",
       "src": 7
      },
      {
       "label": "잉여현금흐름(회사 정의)",
       "value": "16.3",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전년 대비 +64%",
       "src": 2
      },
      {
       "label": "자본지출(현금흐름표, Yahoo 집계)",
       "value": "7.58",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전분기 대비 +88%",
       "src": 7
      },
      {
       "label": "자사주 매입 현금 지출",
       "value": "3.18",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전년 대비 -12%",
       "src": 7
      },
      {
       "label": "신규 자사주 매입 발표(향후 3개월)",
       "value": "5.0",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "",
       "src": 2
      },
      {
       "label": "분기 배당",
       "value": "0.3906",
       "unit": "USD/주",
       "period": "2026년 3분기",
       "change": "",
       "src": 2
      },
      {
       "label": "부채비율(gearing)",
       "value": "16.6",
       "unit": "%",
       "period": "2026-09-30",
       "change": "",
       "src": 2
      },
      {
       "label": "통합가스 조정이익",
       "value": "3.04",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전분기 대비 +13%",
       "src": 2
      },
      {
       "label": "통합가스 생산",
       "value": "772",
       "unit": "kboe/d",
       "period": "2026년 3분기",
       "change": "전분기 대비 +22%",
       "src": 2
      },
      {
       "label": "LNG 액화량",
       "value": "7.4",
       "unit": "Mt",
       "period": "2026년 3분기",
       "change": "전분기 대비 -4%",
       "src": 1
      },
      {
       "label": "LNG 판매량",
       "value": "19.3",
       "unit": "Mt",
       "period": "2026년 3분기",
       "change": "전분기 대비 +7%",
       "src": 1
      },
      {
       "label": "통합가스 실현 가스가격",
       "value": "8.3",
       "unit": "USD/mscf",
       "period": "2026년 3분기",
       "change": "전분기 대비 +15%",
       "src": 6
      },
      {
       "label": "통합가스 실현 액체가격",
       "value": "69",
       "unit": "USD/bbl",
       "period": "2026년 3분기",
       "change": "전분기 대비 -14%",
       "src": 6
      },
      {
       "label": "업스트림 조정이익",
       "value": "3.19",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전분기 대비 -8%",
       "src": 2
      },
      {
       "label": "업스트림 생산",
       "value": "1.80",
       "unit": "million boe/d",
       "period": "2026년 3분기",
       "change": "전분기 대비 -1%",
       "src": 2
      },
      {
       "label": "업스트림 실현 액체가격",
       "value": "84",
       "unit": "USD/bbl",
       "period": "2026년 3분기",
       "change": "전분기 대비 -6%",
       "src": 6
      },
      {
       "label": "업스트림 실현 가스가격",
       "value": "10.0",
       "unit": "USD/mscf",
       "period": "2026년 3분기",
       "change": "전분기 대비 +20%",
       "src": 6
      },
      {
       "label": "화학·제품 조정이익",
       "value": "3.86",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "",
       "src": 2
      },
      {
       "label": "지표 정제마진",
       "value": "42",
       "unit": "USD/bbl",
       "period": "2026년 3분기",
       "change": "전분기 대비 +75%",
       "src": 3
      },
      {
       "label": "정제 가동률",
       "value": "96",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "전분기 대비 -6%p",
       "src": 2
      },
      {
       "label": "지표 화학마진",
       "value": "208",
       "unit": "USD/t",
       "period": "2026년 3분기",
       "change": "전분기 대비 -23%",
       "src": 3
      },
      {
       "label": "기업부문 조정이익",
       "value": "-705",
       "unit": "USD m",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "4분기 통합가스 생산 108만~118만 boe/d, LNG 액화 730만~790만 톤을 제시했다.",
       "src": [
        1
       ]
      },
      {
       "text": "4분기 업스트림 생산은 멕시코만 기상 영향 여유분을 넣어 170만~190만 boe/d, 정제 가동률 92~100%, 화학 가동률 78~86%, 마케팅 판매 240만~260만 b/d, 기업부문 조정 순비용 6억~8억 달러다.",
       "src": [
        1
       ]
      },
      {
       "text": "2026년 현금 자본지출은 ARC 인수분 약 40억 달러를 포함해 230억~250억 달러다.",
       "src": [
        2,
        4
       ]
      },
      {
       "text": "펄 GTL 두 번째 트레인은 호르무즈 해협 재개를 조건으로 2027년 1분기 말 가동을 목표로 하며, 펄 GTL·카타르 LNG 물량 차질은 4분기에도 이어진다.",
       "src": [
        4
       ]
      },
      {
       "text": "10월 정제마진은 3분기를 소폭 밑돌았고, 경영진은 운임 상승이 4분기 실현 마진을 압박할 수 있다고 밝혔다.",
       "src": [
        5
       ]
      },
      {
       "text": "4분기에 네덜란드 확정급여 연금제도 제거로 약 64억 달러(9월 30일 기준 추정)의 비현금 손실을 인식할 예정이다.",
       "src": [
        2
       ]
      },
      {
       "text": "LNG 캐나다 2단계 최종투자결정으로 연간 LNG 물량이 약 600만 톤 늘어날 예정이다.",
       "src": [
        4
       ]
      }
     ],
     "read_through": {
      "text": "카타르발 LNG·GTL 공급 차질은 4분기에도 해소되지 않는다. 셸은 카타르 LNG·펄 GTL 물량 차질이 4분기까지 이어지고 펄 GTL 두 번째 트레인은 호르무즈 재개를 전제로 2027년 1분기 말 가동한다고 밝혔으며, 통합가스 실현 가스가격은 mscf당 8.3달러로 2분기(7.2달러)보다 15% 올랐다.",
      "desk": "gas"
     },
     "sources": [
      {
       "id": 1,
       "title": "Shell plc publishes third quarter 2026 press release (Q3 2026 quarterly press release)",
       "publisher": "Shell plc",
       "date": "2026-10-29",
       "url": "https://www.shell.com/investors/results-and-reporting/quarterly-results/_jcr_content/root/main/section/simple/promo_1962010312_cop/links/item0.stream/1793238861562/c51182ec68b70b120e29f5a1ede9bd4911d54432/q3-2026-quarterly-press-release.pdf"
      },
      {
       "id": 2,
       "title": "SHELL PLC 3rd QUARTER 2026 AND NINE MONTHS UNAUDITED RESULTS",
       "publisher": "Shell plc",
       "date": "2026-10-29",
       "url": "https://www.shell.com/investors/results-and-reporting/quarterly-results/_jcr_content/root/main/section/simple/promo_1962010312_cop/links/item1.stream/1793238865458/4bc70d25b73a07e71802c547bf6df9afbb724171/q3-2026-qra-document.pdf"
      },
      {
       "id": 3,
       "title": "Shell third quarter 2026 update note",
       "publisher": "Shell plc",
       "date": "2026-10-07",
       "url": "https://www.shell.com/news-and-insights/newsroom/news-and-media-releases/2026/shell-third-quarter-2026-update-note/_jcr_content/root/main/section/simple_copy/call_to_action/links/item0.stream/1791349231897/c8861121920e47d0e80c3ff047537e15e0580dae/q3-2026-quarterly-update-note.pdf"
      },
      {
       "id": 4,
       "title": "Shell (SHEL) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-30",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/30/shell-shel-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 5,
       "title": "SHEL: Strong Q3 cash generation funded growth and returns amid freight and Qatar-related headwinds (Quartr 컨퍼런스콜 요약)",
       "publisher": "TradingView (Quartr)",
       "date": "2026-10-29",
       "url": "https://www.tradingview.com/news/urn:summary_document_transcript:quartr.com:4384702:0-shel-strong-q3-cash-generation-funded-growth-and-returns-amid-freight-and-qatar-related-headwinds/"
      },
      {
       "id": 6,
       "title": "Shell plc publishes third quarter 2026 press release (key data table)",
       "publisher": "Nasdaq (GlobeNewswire 배포)",
       "date": "2026-10-29",
       "url": "https://www.nasdaq.com/press-release/shell-plc-publishes-third-quarter-2026-press-release-2026-10-29"
      },
      {
       "id": 7,
       "title": "Yahoo Finance fundamentals timeseries: SHEL 분기 재무 데이터(매출·순이익·영업현금흐름·자본지출·주주환원)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/SHEL?symbol=SHEL&type=quarterlyTotalRevenue,quarterlyNetIncomeCommonStockholders,quarterlyOperatingCashFlow,quarterlyCapitalExpenditure,quarterlyFreeCashFlow,quarterlyRepurchaseOfCapitalStock,quarterlyCashDividendsPaid,quarterlyNetDebt,quarterlyEBITDA,quarterlyChangeInWorkingCapital"
      }
     ]
    },
    {
     "name_kr": "BP",
     "name_en": "BP p.l.c.",
     "ticker": "BP",
     "yahoo": "BP",
     "exchange": "LSE / NYSE",
     "country": "United Kingdom",
     "cik": null,
     "role_kr": "업스트림 생산(2026년 3분기 222만 boe/d)과 정제, 가스 마케팅·트레이딩을 겸하는 영국 통합 메이저로, 중동 공급 차질이 4분기 생산 가이던스와 가격 가정에 반영돼 있다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-30",
     "status": "reported",
     "highlights": [
      {
       "text": "이익 증가는 정제마진 상승과 가스 마케팅·트레이딩 실적 개선이 이끌었고, 기초 RC 이익은 84.6억 달러로 2분기(57.3억 달러) 대비 48%, 전년 동기(22.1억 달러) 대비 283% 늘어 시장 예상(61.9억 달러, 애널리스트 추정)을 웃돌았다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "정제 지표마진은 배럴당 46.7달러로 2분기(29.6달러)와 전년 동기(15.8달러)를 크게 웃돌았고, 정제 가동률(availability)은 96.5%(2분기 94.7%)로 높아졌으며 정제 처리량은 겔젠키르헨 매각 영향으로 1,396 mb/d였다.",
       "src": [
        3,
        2
       ]
      },
      {
       "text": "업스트림 생산은 2,220 mboe/d로 2분기(2,201) 대비 1% 늘었으나 전년 동기(2,362) 대비 6% 줄었고, 석유 생산·운영 1,436 mboe/d(전년 대비 -7.8%), 가스·저탄소 784 mboe/d(-2.6%)였으며 업스트림 설비 신뢰도는 95.3%(2분기 92.4%)로 개선됐다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "영업현금흐름 148억 달러가 순부채 감소에 기여해 순부채가 223억 달러에서 139억 달러로 줄었고, 총금융부채(TFO)는 3분기 중 93억 달러 감소한 443억 달러다.",
       "src": [
        1,
        3,
        4
       ]
      },
      {
       "text": "전환 사업 손상이 IFRS 이익을 줄였다. 라이트소스bp·해상풍력 중심 세전 순손상 41억 달러 등 조정항목이 세후 54억 달러 손실이었고, IFRS 이익은 47억 달러(2분기 39억 달러)다.",
       "src": [
        1
       ]
      },
      {
       "text": "자사주 매입은 재개하지 않았다. 오닐 CEO는 증가하는 배당을 감당하도록 사업 투자를 이어가야 하며 자사주 매입은 대차대조표가 개선된 뒤의 선택지라고 말했다.",
       "src": [
        4
       ]
      },
      {
       "text": "11월 5일 Aker BP 지분 5% 매각을 공시했다.",
       "src": [
        6
       ]
      }
     ],
     "metrics": [
      {
       "label": "기초 RC 이익(underlying RC profit)",
       "value": "8,458",
       "unit": "USD m",
       "period": "2026년 3분기",
       "change": "전년 대비 +283%",
       "src": 1
      },
      {
       "label": "IFRS 주주귀속 이익",
       "value": "4.70",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전년 대비 +304%",
       "src": 7
      },
      {
       "label": "영업현금흐름",
       "value": "14.83",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전년 대비 +90%",
       "src": 7
      },
      {
       "label": "자본지출(현금흐름표, Yahoo 집계)",
       "value": "2.96",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전년 대비 -7%",
       "src": 7
      },
      {
       "label": "순부채",
       "value": "13.9",
       "unit": "USD bn",
       "period": "2026-09-30",
       "change": "전분기 대비 -38%",
       "src": 3
      },
      {
       "label": "총금융부채(TFO)",
       "value": "44.3",
       "unit": "USD bn",
       "period": "2026-09-30",
       "change": "3분기 중 -9.3 USD bn",
       "src": 4
      },
      {
       "label": "배당 현금 지급",
       "value": "1.345",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전년 대비 +4%",
       "src": 7
      },
      {
       "label": "업스트림 생산",
       "value": "2,220",
       "unit": "mboe/d(천 boe/d)",
       "period": "2026년 3분기",
       "change": "전년 대비 -6%",
       "src": 1
      },
      {
       "label": "석유 생산·운영 부문 생산",
       "value": "1,436",
       "unit": "mboe/d(천 boe/d)",
       "period": "2026년 3분기",
       "change": "전년 대비 -7.8%",
       "src": 1
      },
      {
       "label": "가스·저탄소 부문 생산",
       "value": "784",
       "unit": "mboe/d(천 boe/d)",
       "period": "2026년 3분기",
       "change": "전년 대비 -2.6%",
       "src": 1
      },
      {
       "label": "정제 지표마진",
       "value": "46.7",
       "unit": "USD/bbl",
       "period": "2026년 3분기",
       "change": "전년 대비 +196%",
       "src": 3
      },
      {
       "label": "정제 가동률(availability)",
       "value": "96.5",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "전분기 대비 +1.8%p",
       "src": 2
      },
      {
       "label": "정제 처리량",
       "value": "1,396",
       "unit": "mb/d(천 b/d)",
       "period": "2026년 3분기",
       "change": "",
       "src": 2
      },
      {
       "label": "업스트림 설비 신뢰도",
       "value": "95.3",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "전분기 대비 +2.9%p",
       "src": 2
      },
      {
       "label": "기초 유효세율",
       "value": "28",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "조정항목(세후)",
       "value": "-5.4",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "기초 RC 이익 시장 예상(애널리스트 추정)",
       "value": "6.19",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      }
     ],
     "guidance": [
      {
       "text": "4분기 업스트림 생산은 중동 차질 지속, bpx 활동 조정, 계절적 가스 수요 둔화를 반영해 2,090~2,230 mboe/d(천 boe/d)로 제시했다. 3분기 사전 가이던스는 2,190~2,240 mboe/d였고 실적은 2,220 mboe/d였다.",
       "src": [
        1,
        5
       ]
      },
      {
       "text": "2026년 연간 업스트림 생산은 2,210~2,250 mboe/d로 2025년(2,312 mboe/d)보다 낮을 것으로 전망했다.",
       "src": [
        1
       ]
      },
      {
       "text": "가격 가정에는 중동 지정학 불안에 따른 공급 차질이 2027년까지 이어진다는 전제를 넣었다.",
       "src": [
        1
       ]
      },
      {
       "text": "정제마진은 높은 수준을 유지하되 공급 비용과 시장 여건에 민감하다고 봤고, CEO는 4분기 들어 정제마진이 다소 약해지기 시작했다고 말했다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "12월 15일 전략·전망 업데이트를 발표한다.",
       "src": [
        1
       ]
      }
     ],
     "read_through": {
      "text": "BP는 중동 원유 공급 차질이 2027년까지 이어진다고 본다. 가격 가정에 2027년까지의 중동 공급 차질을 넣었고 4분기 업스트림 생산 가이던스(2,090~2,230 mboe/d)에도 중동 차질 지속을 반영했으며, 정제 지표마진은 배럴당 46.7달러로 전년 동기(15.8달러)의 약 3배였다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "bp's third quarter and nine months 2026 results",
       "publisher": "BP p.l.c.",
       "date": "2026-10-30",
       "url": "https://www.bp.com/api/files/6cqieuqhq4no/master/1HujOjJO3P33sq8aLWgp0k/d3e041f0beb6bc478be9d746cb0288e1/bp-third-quarter-2026-results.pdf"
      },
      {
       "id": 2,
       "title": "Third quarter 2026 results",
       "publisher": "BP p.l.c.",
       "date": "2026-10-30",
       "url": "https://www.bp.com/press-and-publications/press-releases/third-quarter-2026-results"
      },
      {
       "id": 3,
       "title": "BP's third-quarter profit nearly quadruples to $8.5 billion as refining margins surge",
       "publisher": "CNBC",
       "date": "2026-10-30",
       "url": "https://www.cnbc.com/2026/10/30/bp-earnings-oil-q3.html"
      },
      {
       "id": 4,
       "title": "BP (BP) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-30",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/30/bp-bp-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 5,
       "title": "Third quarter 2026 trading statement",
       "publisher": "BP p.l.c.",
       "date": "2026-10-13",
       "url": "https://www.bp.com/press-and-publications/press-releases/third-quarter-2026-trading-statement"
      },
      {
       "id": 6,
       "title": "EDGAR 제출 목록: 6-K 'BP SELLS 5% STAKE IN AKER BP'",
       "publisher": "U.S. SEC (EDGAR submissions API)",
       "date": "2026-11-05",
       "url": "https://data.sec.gov/submissions/CIK0000313807.json"
      },
      {
       "id": 7,
       "title": "Yahoo Finance fundamentals timeseries: BP 분기 재무 데이터(매출·순이익·영업현금흐름·자본지출·주주환원)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/BP?symbol=BP&type=quarterlyTotalRevenue,quarterlyNetIncomeCommonStockholders,quarterlyOperatingCashFlow,quarterlyCapitalExpenditure,quarterlyFreeCashFlow,quarterlyRepurchaseOfCapitalStock,quarterlyCashDividendsPaid,quarterlyNetDebt,quarterlyEBITDA,quarterlyChangeInWorkingCapital"
      }
     ]
    },
    {
     "name_kr": "토탈에너지스",
     "name_en": "TotalEnergies SE",
     "ticker": "TTE",
     "yahoo": "TTE",
     "exchange": "Euronext Paris / NYSE",
     "country": "France",
     "cik": null,
     "role_kr": "업스트림 원유·가스, 통합 LNG, 정제·화학, 전력을 함께 운영하는 프랑스 통합 메이저로, 호르무즈 경유 LNG 수출 제한이 생산에 직접 반영돼 있다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-29",
     "status": "reported",
     "highlights": [
      {
       "text": "정제와 LNG가 이익을 끌어올렸다. 3분기 조정순이익은 90.97억 달러로 2분기(60.27억 달러) 대비 51% 늘었고, IFRS 순이익은 82.6억 달러(전년 동기 36.8억 달러)였다.",
       "src": [
        1,
        5
       ]
      },
      {
       "text": "유럽 정제마진 지표(ERM)는 배럴당 33.2달러로 전년 동기(8.4달러)의 약 4배였고, 정제 가동률은 88%, 원유 처리량은 155.5만 b/d였다.",
       "src": [
        1
       ]
      },
      {
       "text": "LNG 가격 상승이 물량 감소를 상쇄했다. 평균 LNG 판매가격은 MMBtu당 12.28달러로 2분기(10.20달러) 대비 20%, 전년 동기(8.91달러) 대비 38% 올랐고, 통합 LNG 조정 순영업이익은 19억 달러(2분기 8.07억 달러)였으나 LNG 판매량은 980만 톤(2분기 1,070만 톤)으로 9% 줄었다.",
       "src": [
        1
       ]
      },
      {
       "text": "LNG 생산은 앙골라 LNG·이크시스 LNG 계획정비로 전분기 대비 7% 줄었고, 탄화수소 생산은 247.4만 boe/d로 2분기(239.5만 boe/d) 대비 3% 늘었으나 중동 분쟁 영향(약 5%p)으로 전년 동기(250.8만 boe/d)를 밑돌았다.",
       "src": [
        1
       ]
      },
      {
       "text": "푸야네 CEO는 전쟁 전 대비 LNG선 통항이 약 25%만 이뤄져 유럽과 아시아가 남은 물량을 두고 경쟁하며 고가가 유지된다고 말했고, 회사는 분쟁의 생산 영향이 3분기보다 줄어 총생산의 5% 미만(주로 호르무즈 경유 LNG 수출 제한)이라고 밝혔다.",
       "src": [
        2,
        1
       ]
      },
      {
       "text": "액체 판매가격은 2분기 대비 배럴당 4.5달러 낮아졌고, 경영진은 실현가격 약세의 주원인으로 운임 상승을 들었다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "운전자본 제외 영업현금흐름은 122.6억 달러(2분기 대비 +25%), DACF는 126.34억 달러(+24%)이고, 순부채가 197.1억 달러에서 137.9억 달러로 줄어 부채비율(gearing)은 9.1%(2분기 13.1%)로 연말 목표 10%를 밑돌았다.",
       "src": [
        1
       ]
      },
      {
       "text": "3분기 주주환원은 37억 달러(배당 22억 달러, 자사주 15억 달러)였고, 이사회는 2026년 4분기와 2027년 1분기에 각각 25억 달러의 소각 목적 자사주 매입을 승인했으며 중간배당은 주당 0.90유로로 유지했다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "조정순이익(TotalEnergies 몫)",
       "value": "9,097",
       "unit": "USD m",
       "period": "2026년 3분기",
       "change": "전분기 대비 +51%",
       "src": 1
      },
      {
       "label": "IFRS 주주귀속 순이익",
       "value": "8.26",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전년 대비 +124%",
       "src": 5
      },
      {
       "label": "운전자본 제외 영업현금흐름",
       "value": "12.26",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전분기 대비 +25%",
       "src": 1
      },
      {
       "label": "DACF",
       "value": "12,634",
       "unit": "USD m",
       "period": "2026년 3분기",
       "change": "전분기 대비 +24%",
       "src": 1
      },
      {
       "label": "영업현금흐름(IFRS, Yahoo 집계)",
       "value": "15.39",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전년 대비 +84%",
       "src": 5
      },
      {
       "label": "순투자",
       "value": "3.3",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "순부채",
       "value": "13.79",
       "unit": "USD bn",
       "period": "2026-09-30",
       "change": "전분기 대비 -30%",
       "src": 1
      },
      {
       "label": "부채비율(gearing)",
       "value": "9.1",
       "unit": "%",
       "period": "2026-09-30",
       "change": "전분기 대비 -4.0%p",
       "src": 1
      },
      {
       "label": "자사주 매입",
       "value": "1.5",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "탄화수소 생산",
       "value": "2,474",
       "unit": "kboe/d",
       "period": "2026년 3분기",
       "change": "전분기 대비 +3%",
       "src": 1
      },
      {
       "label": "LNG 판매량",
       "value": "9.8",
       "unit": "Mt",
       "period": "2026년 3분기",
       "change": "전분기 대비 -9%",
       "src": 1
      },
      {
       "label": "평균 LNG 판매가격",
       "value": "12.28",
       "unit": "USD/MMBtu",
       "period": "2026년 3분기",
       "change": "전분기 대비 +20%",
       "src": 1
      },
      {
       "label": "통합 LNG 조정 순영업이익",
       "value": "1.9",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전분기 대비 +134%",
       "src": 1
      },
      {
       "label": "유럽 정제마진 지표(ERM)",
       "value": "33.2",
       "unit": "USD/bbl",
       "period": "2026년 3분기",
       "change": "전년 대비 +295%",
       "src": 1
      },
      {
       "label": "정제 가동률",
       "value": "88",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "원유 처리량",
       "value": "1,555",
       "unit": "kb/d",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "조정 EPS(non-GAAP, Yahoo 집계)",
       "value": "4.03",
       "unit": "USD",
       "period": "2026년 3분기",
       "change": "컨센서스 3.61 대비 +12%",
       "src": 4
      }
     ],
     "guidance": [
      {
       "text": "4분기 생산은 중동 영향을 제외하면 2025년 4분기 대비 3% 넘게 늘어 연간 성장 가이던스(약 3%)에 부합할 것으로 전망했다.",
       "src": [
        1
       ]
      },
      {
       "text": "4분기 LNG·가스 트레이딩 실적은 3분기와 같은 범위, 평균 LNG 판매가격은 MMBtu당 14달러 이상으로 전망했다.",
       "src": [
        1
       ]
      },
      {
       "text": "4분기 초 유가가 배럴당 100달러를 웃돌고 있다고 밝혔고, 높은 LNG 가격과 정제마진이 2026년 실적을 계속 지지할 것으로 봤다.",
       "src": [
        3
       ]
      },
      {
       "text": "2026년 현금흐름은 420억 달러를 넘어 최대 430억 달러에 이를 것으로 봤다.",
       "src": [
        3,
        2
       ]
      },
      {
       "text": "2026년 순투자 가이던스 150억 달러를 유지했고(1~3분기 112억 달러 집행), 연말 부채비율 목표는 10%다.",
       "src": [
        1
       ]
      }
     ],
     "read_through": {
      "text": "호르무즈 LNG 통항 제약이 LNG 가격을 지지하고 있다. 토탈에너지스는 LNG선 통항이 전쟁 전의 약 25%에 그친다고 밝혔고, 평균 LNG 판매가격은 MMBtu당 12.28달러로 2분기 대비 20% 올랐으며 4분기에는 14달러 이상을 제시했다.",
      "desk": "gas"
     },
     "sources": [
      {
       "id": 1,
       "title": "TotalEnergies: Third Quarter 2026 Results (3rd Quarter Results)",
       "publisher": "TotalEnergies SE (RNS, Investegate 게재)",
       "date": "2026-10-29",
       "url": "https://www.investegate.co.uk/announcement/bzw/totalenergies-se--tte/3rd-quarter-results/9847787"
      },
      {
       "id": 2,
       "title": "TotalEnergies (TTE) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-29",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/29/totalenergies-tte-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 3,
       "title": "TotalEnergies Expects to Sustain Tailwinds behind Blockbuster Q3",
       "publisher": "Rigzone",
       "date": "2026-10-29",
       "url": "https://www.rigzone.com/news/totalenergies_expects_to_sustain_tailwinds_behind_blockbuster_q3-29-oct-2026-184961-article/"
      },
      {
       "id": 4,
       "title": "Yahoo Finance quoteSummary(earnings, calendarEvents): TTE 실적 발표일·non-GAAP EPS·컨센서스",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query2.finance.yahoo.com/v10/finance/quoteSummary/TTE?modules=calendarEvents,earnings"
      },
      {
       "id": 5,
       "title": "Yahoo Finance fundamentals timeseries: TTE 분기 재무 데이터(매출·순이익·영업현금흐름·자본지출·주주환원)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/TTE?symbol=TTE&type=quarterlyTotalRevenue,quarterlyNetIncomeCommonStockholders,quarterlyOperatingCashFlow,quarterlyCapitalExpenditure,quarterlyFreeCashFlow,quarterlyRepurchaseOfCapitalStock,quarterlyCashDividendsPaid,quarterlyNetDebt,quarterlyEBITDA,quarterlyChangeInWorkingCapital"
      }
     ]
    },
    {
     "name_kr": "사우디 아람코",
     "name_en": "Saudi Arabian Oil Company (Saudi Aramco)",
     "ticker": "2222",
     "yahoo": "2222.SR",
     "exchange": "Saudi Exchange (Tadawul)",
     "country": "Saudi Arabia",
     "cik": null,
     "role_kr": "걸프 연안 수출 터미널과 동서 파이프라인을 통한 홍해(얀부) 수출 경로를 함께 보유한 사우디아라비아 국영 석유사로, 최대지속생산능력(MSC)은 1,200만 b/d다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-03",
     "status": "reported",
     "highlights": [
      {
       "text": "정제 부문이 이익을 지탱했다. 조정순이익은 312억 달러로 전년 동기(286억 달러) 대비 9% 늘어 컨센서스(306.6억 달러, 애널리스트 추정)를 웃돌았고, 다운스트림 조정 EBIT는 103억 달러로 전년 대비 234% 늘어난 반면 업스트림 조정 EBIT는 468억 달러로 9% 줄었다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "총 탄화수소 생산은 1,104.6만 boe/d로 2분기(946.3만 boe/d) 대비 17% 늘었으나 전년 동기(1,326.7만 boe/d)보다 17% 적었다.",
       "src": [
        2
       ]
      },
      {
       "text": "원유 실현가격은 배럴당 95.2달러로 2분기(108.1달러)보다 12% 낮고 전년 동기(70.1달러)보다 36% 높았다.",
       "src": [
        2
       ]
      },
      {
       "text": "나세르 CEO는 동서 파이프라인이 공격받은 뒤 수일 내 복구해 서부 지역 수출을 극대화했고, 자사 시설로 오지 않는 고객에게는 걸프 수출 터미널과 호르무즈 밖 선박 간 환적(STS)으로 공급했다고 말했다.",
       "src": [
        3
       ]
      },
      {
       "text": "나세르 CEO는 공급 차질이 시작된 이후 세계 시장에서 30억 배럴 이상의 액체 공급이 사라졌다고 말했다.",
       "src": [
        3
       ]
      },
      {
       "text": "현금흐름은 운전자본 정상화로 늘었다. 영업현금흐름은 387억 달러, 잉여현금흐름은 282억 달러(전년 동기 236억 달러)이고, 운전자본은 1·2분기 유출(-548.2억, -523.4억 리얄)에서 3분기 64.0억 리얄 유입으로 돌아섰으며 CFO는 3분기에 운전자본이 정상화됐다고 말했다.",
       "src": [
        1,
        7,
        3
       ]
      },
      {
       "text": "기본배당은 219억 달러로 전년 대비 3.5% 늘었고, IFRS 순이익은 자산 매각 이익을 포함해 363억 달러(1,359억 리얄)로 전년 대비 35% 늘었으며, AI 기업 HUMAIN 지분 49% 인수를 마쳤다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "IFRS 순이익",
       "value": "36.3",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전년 대비 +35%",
       "src": 1
      },
      {
       "label": "조정순이익",
       "value": "31.2",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전년 대비 +9%",
       "src": 1
      },
      {
       "label": "조정순이익 컨센서스(애널리스트 추정)",
       "value": "30.66",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "영업현금흐름",
       "value": "38.7",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "잉여현금흐름",
       "value": "28.2",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전년 대비 +19%",
       "src": 1
      },
      {
       "label": "자본지출",
       "value": "10,524",
       "unit": "USD m",
       "period": "2026년 3분기",
       "change": "",
       "src": 2
      },
      {
       "label": "기본배당",
       "value": "21.9",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전년 대비 +3.5%",
       "src": 1
      },
      {
       "label": "업스트림 조정 EBIT",
       "value": "46.8",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전년 대비 -9%",
       "src": 1
      },
      {
       "label": "다운스트림 조정 EBIT",
       "value": "10.3",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전년 대비 +234%",
       "src": 1
      },
      {
       "label": "총 탄화수소 생산",
       "value": "11,046",
       "unit": "mboed(천 boe/d)",
       "period": "2026년 3분기",
       "change": "전분기 대비 +17%, 전년 대비 -17%",
       "src": 2
      },
      {
       "label": "원유 실현가격",
       "value": "95.2",
       "unit": "USD/bbl",
       "period": "2026년 3분기",
       "change": "전분기 대비 -12%, 전년 대비 +36%",
       "src": 2
      },
      {
       "label": "매출(Yahoo 집계)",
       "value": "526.84",
       "unit": "SAR bn",
       "period": "2026년 3분기",
       "change": "전분기 대비 +1%",
       "src": 7
      },
      {
       "label": "운전자본 변동(Yahoo 집계)",
       "value": "6.40",
       "unit": "SAR bn",
       "period": "2026년 3분기",
       "change": "전분기 -52.34",
       "src": 7
      },
      {
       "label": "조정 EPS(non-GAAP, Yahoo 집계)",
       "value": "0.49",
       "unit": "SAR",
       "period": "2026년 3분기",
       "change": "컨센서스 0.43 대비 +13%",
       "src": 6
      }
     ],
     "guidance": [
      {
       "text": "2026년 자본지출 가이던스 500억~550억 달러를 유지했고(1~3분기 357.9억 달러 집행), 여기에는 피해 시설 복구 비용과 HUMAIN 투자 26억 달러가 포함되며 2027년 가이던스는 2027년 3월에 제시한다.",
       "src": [
        2,
        3
       ]
      },
      {
       "text": "동서 파이프라인 용량을 하루 약 700만 배럴에서 1,000만 배럴로 늘려 홍해 수출 전환 능력을 키우는 기본설계를 진행 중이다.",
       "src": [
        5,
        3
       ]
      },
      {
       "text": "나세르 CEO는 수일 내 분쟁 전 생산 수준으로 복귀하고 3주 안에 MSC 1,200만 b/d에 도달할 수 있으며, 그 이상 증산에는 정부 지시가 필요하다고 말했다.",
       "src": [
        3
       ]
      },
      {
       "text": "줄루프 증설이 생산을 시작했고 연말까지 최대 60만 b/d의 추가 생산능력을 낼 예정이다.",
       "src": [
        3
       ]
      }
     ],
     "read_through": {
      "text": "걸프 원유 공급은 회복 중이나 전년 수준에 못 미친다. 아람코 총 탄화수소 생산은 1,104.6만 boe/d로 2분기 대비 17% 늘고 전년 동기 대비 17% 줄었으며, 회사는 수일 내 분쟁 전 수준 복귀와 3주 내 MSC 1,200만 b/d 도달이 가능하다고 밝혀 호르무즈 정상화 시 사우디 공급은 수주 안에 늘어날 수 있다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Aramco announces third quarter 2026 results",
       "publisher": "Saudi Aramco",
       "date": "2026-11-03",
       "url": "https://www.aramco.com/en/news-media/news/2026/aramco-announces-third-quarter-2026-results"
      },
      {
       "id": 2,
       "title": "Saudi Aramco Q3 2026 interim report",
       "publisher": "Saudi Aramco",
       "date": "2026-11-03",
       "url": "https://www.aramco.com/-/media/publications/corporate-reports/reports-and-presentations/2026/q3/saudi-aramco-q3-2026-interim-report-english.pdf"
      },
      {
       "id": 3,
       "title": "Earnings call transcript: Saudi Aramco posts strong Q3 2026 cash flow as stock steadies",
       "publisher": "Investing.com",
       "date": "2026-11-03",
       "url": "https://www.investing.com/news/transcripts/earnings-call-transcript-saudi-aramco-posts-strong-q3-2026-cash-flow-as-stock-steadies-93CH-4994085"
      },
      {
       "id": 4,
       "title": "Aramco's profit rises as refining margins strengthen amid Iran war",
       "publisher": "CNBC",
       "date": "2026-11-03",
       "url": "https://www.cnbc.com/2026/11/03/saudi-aramcos-third-quarter-middle-east-.html"
      },
      {
       "id": 5,
       "title": "Saudi Aramco posts 49 trillion won in third-quarter net profit; considers expanding East-West pipeline",
       "publisher": "Financial News (파이낸셜뉴스)",
       "date": "2026-11-03",
       "url": "https://en.fnnews.com/news/202611031930183402"
      },
      {
       "id": 6,
       "title": "Yahoo Finance quoteSummary(earnings, calendarEvents): 2222.SR 실적 발표일·non-GAAP EPS·컨센서스",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query2.finance.yahoo.com/v10/finance/quoteSummary/2222.SR?modules=calendarEvents,earnings"
      },
      {
       "id": 7,
       "title": "Yahoo Finance fundamentals timeseries: 2222.SR 분기 재무 데이터(매출·순이익·영업현금흐름·자본지출·주주환원)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/2222.SR?symbol=2222.SR&type=quarterlyTotalRevenue,quarterlyNetIncomeCommonStockholders,quarterlyOperatingCashFlow,quarterlyCapitalExpenditure,quarterlyFreeCashFlow,quarterlyRepurchaseOfCapitalStock,quarterlyCashDividendsPaid,quarterlyNetDebt,quarterlyEBITDA,quarterlyChangeInWorkingCapital"
      }
     ]
    },
    {
     "name_kr": "에퀴노르",
     "name_en": "Equinor ASA",
     "ticker": "EQNR",
     "yahoo": "EQNR",
     "exchange": "Oslo Børs / NYSE",
     "country": "Norway",
     "cik": null,
     "role_kr": "노르웨이 대륙붕 가스를 파이프라인으로 유럽에 공급하는 노르웨이 국영 석유사로, 노르웨이산 원유도 전량 유럽 시장에 판매한다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-28",
     "status": "reported",
     "highlights": [
      {
       "text": "가스와 유가 상승이 이익을 두 배로 늘렸다. 조정 영업이익은 123.5억 달러로 전년 동기 대비 약 99% 늘었고, 실현 유럽 가스가격은 MMBtu당 20.0달러, 실현 액체가격은 배럴당 92.3달러(전년 대비 +42%)였다.",
       "src": [
        1
       ]
      },
      {
       "text": "회사는 중동 분쟁 이후 공급 차질과 시장 긴장으로 유럽 가스가격이 전년 대비 75% 올랐다고 설명했다.",
       "src": [
        1
       ]
      },
      {
       "text": "조정순이익은 28.6억 달러, 조정 EPS는 1.20달러로 컨센서스(1.35달러, 애널리스트 추정)를 11% 밑돌았고, IFRS 순이익은 25.4억 달러(순손상 4.85억 달러 반영)다.",
       "src": [
        1,
        7
       ]
      },
      {
       "text": "지분 생산은 216.6만 boe/d로 전년 동기(213.0만 boe/d) 대비 2% 늘었으나 노르웨이 대륙붕(NCS) 물량은 전년과 같았고, 신규 유전 약 7만 b/d가 자연 감소와 요한 카스트베르그·트롤의 비계획 손실을 상쇄했다.",
       "src": [
        5,
        3,
        4
       ]
      },
      {
       "text": "해외 생산은 바칼라우 정점 도달로 약 5% 늘었으나, 해외 선적량이 지분 생산보다 적어 판매량이 줄었다.",
       "src": [
        3,
        1
       ]
      },
      {
       "text": "MMP(마케팅·미드스트림·가공)는 정제마진과 LNG 트레이딩 호조로 강했고, 몽스타드 정제소가 사상 최대 기여를 냈다.",
       "src": [
        1
       ]
      },
      {
       "text": "세금 납부로 현금흐름이 줄었다. 세후 영업현금흐름은 81.4억 달러(세전·운전자본 반영 전 약 147억 달러)였고, 3분기에 2026년 NCS 세금 1·2차분 62억 달러를 납부했다.",
       "src": [
        1
       ]
      },
      {
       "text": "주주환원은 2026년 자사주 매입 30억 달러 프로그램의 4차(최종) 트랜치 최대 11.3억 달러와 분기 배당 주당 0.39달러다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "조정 영업이익",
       "value": "12.35",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전년 대비 +99%",
       "src": 1
      },
      {
       "label": "순영업이익(IFRS)",
       "value": "11.95",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "조정순이익",
       "value": "2.86",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "IFRS 주주귀속 순이익",
       "value": "2.54",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전분기 대비 -48%",
       "src": 6
      },
      {
       "label": "조정 EPS(non-GAAP)",
       "value": "1.20",
       "unit": "USD",
       "period": "2026년 3분기",
       "change": "컨센서스 1.35 대비 -11%",
       "src": 7
      },
      {
       "label": "세후 영업현금흐름",
       "value": "8.14",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "세전·운전자본 반영 전 영업현금흐름",
       "value": "14.7",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "NCS 세금 납부(2026년 1·2차분)",
       "value": "6.2",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "자본지출(현금흐름표, Yahoo 집계)",
       "value": "2.87",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "전년 대비 -16%",
       "src": 6
      },
      {
       "label": "자사주 매입 4차 트랜치(최대)",
       "value": "1.13",
       "unit": "USD bn",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "분기 배당",
       "value": "0.39",
       "unit": "USD/주",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "지분 생산",
       "value": "2,166",
       "unit": "kboe/d",
       "period": "2026년 3분기",
       "change": "전년 대비 +2%",
       "src": 5
      },
      {
       "label": "실현 유럽 가스가격",
       "value": "20.0",
       "unit": "USD/MMBtu",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "실현 액체가격",
       "value": "92.3",
       "unit": "USD/bbl",
       "period": "2026년 3분기",
       "change": "전년 대비 +42%",
       "src": 1
      },
      {
       "label": "순손상",
       "value": "485",
       "unit": "USD m",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "2026년 생산 증가율 가이던스를 약 3%에서 약 4%로 올렸다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "2026년 자사주 매입은 4차 트랜치(최대 11.3억 달러)로 총 30억 달러가 된다.",
       "src": [
        1
       ]
      },
      {
       "text": "계획된 정기보수 프로그램은 3분기에 완료됐다고 밝혔다.",
       "src": [
        2
       ]
      }
     ],
     "read_through": {
      "text": "유럽 가스 공급 측 증분은 제한적이다. 에퀴노르의 노르웨이 대륙붕 물량은 트롤 비계획 손실 속에 전년과 같은 수준에 머물렀고, 실현 유럽 가스가격은 MMBtu당 20.0달러로 회사는 중동 분쟁 이후 공급 차질을 가격 상승 요인으로 꼽았다.",
      "desk": "gas"
     },
     "sources": [
      {
       "id": 1,
       "title": "Equinor third quarter 2026 results",
       "publisher": "Equinor ASA",
       "date": "2026-10-28",
       "url": "https://www.equinor.com/news/equinor-third-quarter-2026-results"
      },
      {
       "id": 2,
       "title": "Equinor (EQNR) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-28",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/28/equinor-eqnr-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 3,
       "title": "Equinor Q3 2026 Earnings Call Transcript",
       "publisher": "Benzinga",
       "date": "2026-10-28",
       "url": "https://www.benzinga.com/news/26/10/62649664/equinor-q3-2026-earnings-call-transcript"
      },
      {
       "id": 4,
       "title": "Equinor nearly doubles third-quarter earnings on higher commodity prices, production gains",
       "publisher": "Oil & Gas Journal",
       "date": "2026-10-28",
       "url": "https://www.ogj.com/general-interest/companies/news/55415015/equinor-nearly-doubles-third-quarter-earnings-on-higher-commodity-prices-production-gains"
      },
      {
       "id": 5,
       "title": "Equinor Lifts 2026 Output Growth Target to 4% on Strong Q3 Results",
       "publisher": "IndexBox",
       "date": "2026-10-28",
       "url": "https://www.indexbox.io/blog/equinor-raises-2026-output-growth-target-to-about-4-after-strong-quarter/"
      },
      {
       "id": 6,
       "title": "Yahoo Finance fundamentals timeseries: EQNR 분기 재무 데이터(매출·순이익·영업현금흐름·자본지출·주주환원)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/EQNR?symbol=EQNR&type=quarterlyTotalRevenue,quarterlyNetIncomeCommonStockholders,quarterlyOperatingCashFlow,quarterlyCapitalExpenditure,quarterlyFreeCashFlow,quarterlyRepurchaseOfCapitalStock,quarterlyCashDividendsPaid,quarterlyNetDebt,quarterlyEBITDA,quarterlyChangeInWorkingCapital"
      },
      {
       "id": 7,
       "title": "Yahoo Finance quoteSummary(earnings, calendarEvents): EQNR 실적 발표일·non-GAAP EPS·컨센서스",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query2.finance.yahoo.com/v10/finance/quoteSummary/EQNR?modules=calendarEvents,earnings"
      }
     ]
    },
    {
     "name_kr": "페트로브라스",
     "name_en": "Petróleo Brasileiro S.A. – Petrobras",
     "ticker": "PBR",
     "yahoo": "PBR",
     "exchange": "B3 / NYSE",
     "country": "Brazil",
     "cik": null,
     "role_kr": "브라질 프리솔트 심해 유전을 운영하며 원유를 생산·수출하는 브라질 국영 석유사로, 비걸프 원유 공급원이다.",
     "period": "2026년 2분기(3분기 실적은 2026-11-10 발표 예정, 3분기 생산·판매 보고서는 반영)",
     "period_end": "2026-06-30",
     "report_date": "2026-08-06",
     "status": "not_yet",
     "highlights": [
      {
       "text": "3분기 재무 실적은 11월 10일 발표·11월 11일 컨퍼런스콜 예정으로 아직 나오지 않았고, 11월 7일 현재 SEC에 3분기 재무제표 6-K가 제출되지 않았다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "3분기 생산은 사상 최대다. 10월 28일 생산·판매 보고서 기준 자체 생산은 351.2만 boe/d(전년 대비 +11.7%), 운영 생산은 508만 boe/d, 자체 프리솔트 생산은 296만 boe/d였다.",
       "src": [
        5
       ]
      },
      {
       "text": "3분기 원유·연료 수출은 125.1만 b/d로 최대치였고 8월 원유 선적량도 최대였으나, 수입이 114.1% 늘어 순수출은 전분기 대비 14.6% 줄었다.",
       "src": [
        5
       ]
      },
      {
       "text": "3분기 정제 가동률은 99%, 디젤 생산은 분기 최대인 76.9만 b/d였다.",
       "src": [
        5
       ]
      },
      {
       "text": "2분기 자체 생산은 333.6만 boe/d로 전년 대비 14.1% 늘었고, 운영 생산 487만 boe/d, 원유 수출 99.6만 b/d, 순수출 107.5만 b/d, 원유 수입 8.9만 b/d(팬데믹 이후 최저)였다.",
       "src": [
        4
       ]
      },
      {
       "text": "최근 발표 분기인 2분기 순이익은 524.5억 헤알로 1분기(326.6억 헤알) 대비 61% 늘었고 매출은 1,695억 헤알(+37%)이었다.",
       "src": [
        1
       ]
      },
      {
       "text": "2분기 영업현금흐름은 122.5억 달러로 전년 동기(75.3억 달러) 대비 63% 늘었고, 자본지출 45.6억 달러, 배당 현금 지급 15.1억 달러였다.",
       "src": [
        2
       ]
      }
     ],
     "metrics": [
      {
       "label": "자체 생산(3분기 생산·판매 보고서)",
       "value": "3,512",
       "unit": "kboe/d",
       "period": "2026년 3분기",
       "change": "전년 대비 +11.7%",
       "src": 5
      },
      {
       "label": "원유·연료 수출(3분기)",
       "value": "1,251",
       "unit": "kb/d",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "정제 가동률(3분기)",
       "value": "99",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "디젤 생산(3분기)",
       "value": "769",
       "unit": "kb/d",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "자체 생산",
       "value": "3,336",
       "unit": "mboed(천 boe/d)",
       "period": "2026년 2분기",
       "change": "전년 대비 +14.1%",
       "src": 4
      },
      {
       "label": "원유 수출",
       "value": "996",
       "unit": "mbpd(천 b/d)",
       "period": "2026년 2분기",
       "change": "",
       "src": 4
      },
      {
       "label": "순수출",
       "value": "1,075",
       "unit": "mbpd(천 b/d)",
       "period": "2026년 2분기",
       "change": "",
       "src": 4
      },
      {
       "label": "매출(Yahoo 집계)",
       "value": "169.5",
       "unit": "BRL bn",
       "period": "2026년 2분기",
       "change": "전분기 대비 +37%",
       "src": 1
      },
      {
       "label": "순이익",
       "value": "52.45",
       "unit": "BRL bn",
       "period": "2026년 2분기",
       "change": "전분기 대비 +61%",
       "src": 1
      },
      {
       "label": "순이익(USD 기준)",
       "value": "10.43",
       "unit": "USD bn",
       "period": "2026년 2분기",
       "change": "전년 대비 +120%",
       "src": 2
      },
      {
       "label": "영업현금흐름",
       "value": "12.25",
       "unit": "USD bn",
       "period": "2026년 2분기",
       "change": "전년 대비 +63%",
       "src": 2
      },
      {
       "label": "자본지출(현금흐름표)",
       "value": "4.56",
       "unit": "USD bn",
       "period": "2026년 2분기",
       "change": "전년 대비 +12%",
       "src": 2
      },
      {
       "label": "배당 현금 지급",
       "value": "1.51",
       "unit": "USD bn",
       "period": "2026년 2분기",
       "change": "전년 대비 -11%",
       "src": 2
      }
     ],
     "guidance": [],
     "read_through": {
      "text": "비걸프 원유 공급은 늘고 있다. 페트로브라스 3분기 자체 생산은 351.2만 boe/d(전년 대비 +11.7%), 원유·연료 수출은 125.1만 b/d로 모두 최대치였고, 수입이 114.1% 늘어 순수출은 전분기 대비 14.6% 줄었다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Yahoo Finance quoteSummary(earnings, calendarEvents): PBR 실적 발표일·non-GAAP EPS·컨센서스",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query2.finance.yahoo.com/v10/finance/quoteSummary/PBR?modules=calendarEvents,earnings"
      },
      {
       "id": 2,
       "title": "Yahoo Finance fundamentals timeseries: PBR 분기 재무 데이터(매출·순이익·영업현금흐름·자본지출·주주환원)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/PBR?symbol=PBR&type=quarterlyTotalRevenue,quarterlyNetIncomeCommonStockholders,quarterlyOperatingCashFlow,quarterlyCapitalExpenditure,quarterlyFreeCashFlow,quarterlyRepurchaseOfCapitalStock,quarterlyCashDividendsPaid,quarterlyNetDebt,quarterlyEBITDA,quarterlyChangeInWorkingCapital"
      },
      {
       "id": 3,
       "title": "EDGAR 제출 목록: 2Q26 재무제표 6-K(2026-08-07), 3Q26 생산·판매 보고서 6-K(2026-10-29 접수)",
       "publisher": "U.S. SEC (EDGAR submissions API)",
       "date": "2026-10-29",
       "url": "https://data.sec.gov/submissions/CIK0001119639.json"
      },
      {
       "id": 4,
       "title": "Petrobras 2Q26 Production and Sales Report (Form 6-K)",
       "publisher": "Petrobras",
       "date": "2026-07-28",
       "url": "https://www.sec.gov/Archives/edgar/data/0001119639/000129281426003948/pbr20260728_6k.htm"
      },
      {
       "id": 5,
       "title": "Petrobras 3Q26 Production and Sales Report (Form 6-K)",
       "publisher": "Petrobras",
       "date": "2026-10-28",
       "url": "https://www.sec.gov/Archives/edgar/data/0001119639/000129281426005030/pbr20261028_6k.htm"
      }
     ]
    }
   ]
  },
  {
   "id": "midstream_tankers",
   "title": "미드스트림·유조선",
   "position": "미국 파이프라인·수출터미널(가스·NGL·원유)과 원유·정제유 탱커 해상운송을 묶은 미드스트림 구간이다.",
   "summary": [
    "미국 가스 파이프라인 물량 증가는 LNG 피드가스와 데이터센터 수요가 이끌고 있다. 킨더모건 3분기 천연가스 수송량은 49,273 BBtu/d로 3% 늘었고, 백로그 144억달러 가운데 가스 프로젝트 132억달러는 사상 최대다. 에너지 트랜스퍼는 2025년 이후 데이터센터·발전소와 하루 950만 MMBtu 이상의 공급 계약을 맺었다(킨더모건 1, 에너지 트랜스퍼 6).",
    "미국 NGL 수출은 3분기에도 늘었다. 엔터프라이즈 프로덕츠 파트너스의 NGL 해상터미널 물량은 120만 b/d로 전년 대비 28.8만 b/d 늘었고 에너지 트랜스퍼 NGL 수출 물량은 9% 증가했다. 두 회사 조정 EBITDA는 각각 16%, 31% 늘었다(엔터프라이즈 프로덕츠 파트너스 4, 에너지 트랜스퍼 4).",
    "원유 스프레드 확대가 미드스트림 이익을 키웠다. 에너지 트랜스퍼는 원유 부문 조정 EBITDA가 8.71억달러(전년 7.46억달러)로 늘었다며 2026년 조정 EBITDA 가이던스를 197억~199억달러로 올렸다. 엔터프라이즈는 지정학적 불확실성과 현재 스프레드의 지속 가능성을 근거로 들어 2027년 성장률이 2026년보다 낮을 것으로 봤다(에너지 트랜스퍼 4, 엔터프라이즈 프로덕츠 파트너스 5).",
    "4분기 VLCC 확보 운임은 DHT 홀딩스 509,100달러/일(현물 일수 약 50%), 인터내셔널 시웨이즈 471,600달러/일(60%)로 각사 3분기 VLCC 현물 TCE(167,100달러/일, 154,600달러/일)의 3.0~3.1배다(DHT 홀딩스 5, 인터내셔널 시웨이즈 7).",
    "정제유선 운임도 4분기에 반등했다. 스콜피오 탱커스의 4분기 확보 운임은 LR2 181,000달러/일(44%), MR 56,000달러/일(47%)로 3분기 풀·현물 실적(72,283달러/일, 31,183달러/일)의 1.8~2.5배다. 3분기 인터내셔널 시웨이즈의 LR1·MR 현물 TCE는 2분기 대비 35~41% 낮았다(스콜피오 탱커스 4, 인터내셔널 시웨이즈 7).",
    "선사들은 운임 급등 요인으로 중동 전쟁에 따른 교역 경로 변화를 들었다. 스콜피오 탱커스는 호르무즈 해협 경유 수출 중단 이후 중동 원유 수출이 5월 하루 800만배럴에서 1,700만배럴 가까이로 늘고 항해거리 증가·선박 분산으로 선복이 빠듯해졌다고 밝혔고, 인터내셔널 시웨이즈는 VLCC 운임이 지난 35년 최고치의 4배 가까이라고 밝혔다(스콜피오 탱커스 4, 스콜피오 탱커스 5, 스콜피오 탱커스 6, 인터내셔널 시웨이즈 6)."
   ],
   "open_items": [
    "회사 발표문·콜 수치는 2차 자료에 인용된 내용이며, 원문은 직접 확인하지 못했다.",
    "스콜피오 탱커스·인터내셔널 시웨이즈·DHT 홀딩스 경영진의 전쟁보험료, 제재·그림자 선대 관련 발언은 찾지 못했다. 호르무즈 관련 내용은 스콜피오 발표문 문구만 확인했다.",
    "이 구간 카드에 없는 Navios Maritime Partners는 3분기 콜(2026-11-04)에서 VLCC 운임이 일 140만달러로 사상 최고였고 VLCC 선대의 28%가 정상 운항에서 제한됐다고 밝혔다(https://www.fool.com/earnings/call-transcripts/2026/11/04/navios-maritime-nmm-q3-2026-earnings-call-transcript/).",
    "4분기 확보 운임은 분기 일부 일수 기준이며 분기 평균이 아니다. DHT는 discharge-to-discharge, 프론트라인은 load-to-discharge 기준이어서 두 회사 수치를 그대로 비교할 수 없다.",
    "DHT 홀딩스(11월 9일)와 프론트라인(11월 20일)은 3분기 실적이 아직 발표되지 않았다. 프론트라인 카드는 2분기 실적 기준이다.",
    "인터내셔널 시웨이즈 3분기 MR 현물 TCE는 자료별로 35,400달러/일(TradingKey)과 56,000달러/일(AOL 전사록)이 엇갈려 앞의 수치를 썼다.",
    "DHT 3분기 정기용선 예상 운임은 자료마다 75,000달러/일과 75,900달러/일로 달라 싣지 않았다.",
    "에너지 트랜스퍼의 원유 수송·터미널 물량과 Lake Charles LNG 진행 상황, 엔터프라이즈의 원유 해상터미널 물량(자료마다 확인 내용이 엇갈린다)과 2026~2027년 성장 투자 총액은 확인하지 못했다.",
    "킨더모건 3분기 DCF, 윌리엄스 Transco 수송량·계약용량과 3분기 주당 배당금은 확인하지 못했다.",
    "인터내셔널 시웨이즈 Bruton Limited 인수 대가 구성은 확인하지 못했다. 10월 16일 8-K에 항목 3.02(비등록 주식 발행)가 포함됐고 발행주식수는 9월 말 4,953만주에서 5,116만주(Yahoo)로 늘었다.",
    "에너지 트랜스퍼 거래소는 SEC 공시 정보와 Yahoo 모두 TXSE(텍사스증권거래소)로 표기한다. 2026-09-10 상장 관련 8-K(항목 3.01) 내용은 확인하지 못했다.",
    "스콜피오 탱커스 3분기 매출은 Yahoo 데이터 간 수치(2.49억달러, 2.66억달러)가 달라 싣지 않았다. 프론트라인 4분기(애널리스트 2명)·인터내셔널 시웨이즈 4분기(1명) 컨센서스는 표본이 작아 싣지 않았다.",
    "엔브리지 카드에는 3분기 매출·이익·가이던스와 Mainline 물량·요금이 없다. 어닝콜 출처에는 전사본 링크가 없다."
   ],
   "companies": [
    {
     "name_kr": "킨더모건",
     "name_en": "Kinder Morgan, Inc.",
     "ticker": "KMI",
     "yahoo": "KMI",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1506307,
     "role_kr": "미국 천연가스 물량과 LNG 피드가스의 약 40%를 수송한다고 밝히는 미국 가스 파이프라인 사업자다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-21",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 실적은 같은 분기 기준 사상 최대다. 조정 EBITDA는 21.8억달러(+9%), 조정 EPS는 0.35달러(+21%)로 Yahoo 집계 컨센서스(0.33달러)를 웃돌았고 GAAP 순이익은 7.64억달러(EPS 0.34달러)다.",
       "src": [
        1,
        4,
        5
       ]
      },
      {
       "text": "3분기 천연가스 수송량은 49,273 BBtu/d로 전년(47,918 BBtu/d) 대비 3% 늘었고, 회사는 TGP의 LNG 인도와 텍사스 주내 시스템 수요를 요인으로 들었다.",
       "src": [
        1
       ]
      },
      {
       "text": "가스 집하량은 KinderHawk 시스템을 중심으로 전년 대비 14% 늘었고, 정제유 수송량은 3%, 원유·콘덴세이트 수송량은 11% 감소했다.",
       "src": [
        1
       ]
      },
      {
       "text": "프로젝트 백로그는 신규 54억달러가 더해져 144억달러로 늘었고, 이 중 천연가스 프로젝트가 132억달러로 사상 최대다.",
       "src": [
        1
       ]
      },
      {
       "text": "신규 대형 프로젝트는 남동부로 2.6 Bcf/d를 보내는 Southeast Connector(KMI 몫 31억달러, 2030년 말 가동 목표)와 A등급 하이퍼스케일러를 앵커 고객으로 둔 2.8 Bcf/d 규모 Permian Link다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "경영진은 미국 천연가스의 약 40%, LNG 피드가스의 약 40%, 멕시코향 가스 수출의 50% 이상을 자사 망이 수송한다고 밝혔다.",
       "src": [
        2
       ]
      },
      {
       "text": "경영진은 우드매켄지의 2035년까지 북미 가스 수요 약 46 Bcf/d 증가 전망과 남동부 대형 부하 연계 요청 200GW 초과(가스 환산 약 8 Bcf/d)를 수요 근거로 제시했고, 퍼미안 과잉 증설 우려에는 발전·LNG 수요처가 주도하는 계약 구조를 들어 반박했다.",
       "src": [
        2
       ]
      },
      {
       "text": "9월 말 순부채/조정 EBITDA는 3.5배로 목표 범위 하단이다. 3분기 배당은 주당 0.2975달러(연환산 1.19달러, 전년 대비 +2%)다.",
       "src": [
        1,
        4
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "4,531",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +9%(4,146)",
       "src": 4
      },
      {
       "label": "조정 EBITDA",
       "value": "2.18",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +9%",
       "src": 1
      },
      {
       "label": "KMI 귀속 순이익",
       "value": "764",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +22%(628)",
       "src": 4
      },
      {
       "label": "조정 EPS",
       "value": "0.35",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "전년 대비 +21%",
       "src": 1
      },
      {
       "label": "천연가스 수송량",
       "value": "49,273",
       "unit": "BBtu/d",
       "period": "2026년 3분기",
       "change": "전년 대비 +3%(47,918)",
       "src": 1
      },
      {
       "label": "천연가스 집하량 증감",
       "value": "+14%",
       "unit": "",
       "period": "2026년 3분기",
       "change": "전년 대비",
       "src": 1
      },
      {
       "label": "정제유 수송량 증감",
       "value": "-3%",
       "unit": "",
       "period": "2026년 3분기",
       "change": "전년 대비",
       "src": 1
      },
      {
       "label": "원유·콘덴세이트 수송량 증감",
       "value": "-11%",
       "unit": "",
       "period": "2026년 3분기",
       "change": "전년 대비",
       "src": 1
      },
      {
       "label": "프로젝트 백로그(천연가스)",
       "value": "14.4(13.2)",
       "unit": "십억 달러",
       "period": "2026-09-30",
       "change": "신규 추가 5.4",
       "src": 1
      },
      {
       "label": "순부채/조정 EBITDA",
       "value": "3.5",
       "unit": "배",
       "period": "2026-09-30",
       "change": "",
       "src": 1
      },
      {
       "label": "분기 배당",
       "value": "0.2975",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "전년 대비 +2%",
       "src": 1
      },
      {
       "label": "영업현금흐름",
       "value": "5,041",
       "unit": "백만 달러",
       "period": "2026년 1~9월",
       "change": "전년 대비 +19%(4,225)",
       "src": 4
      },
      {
       "label": "설비투자 현금지출",
       "value": "2,831",
       "unit": "백만 달러",
       "period": "2026년 1~9월",
       "change": "전년 대비 +28%(2,206)",
       "src": 4
      }
     ],
     "guidance": [
      {
       "text": "2026년 조정 EBITDA는 예산 86억달러 대비 6% 이상, 조정 EPS는 예산 1.36달러 대비 13% 이상 웃돌 것으로 예상해 2분기 발표 때(각각 5%, 12% 이상)보다 전망을 올렸다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "2026년 말 순부채/조정 EBITDA는 3.6배로 예산 대비 0.2배 낮을 것으로 예상한다.",
       "src": [
        1
       ]
      }
     ],
     "read_through": {
      "text": "3분기 천연가스 수송량이 3% 늘었고 회사는 TGP의 LNG 인도와 텍사스 주내 시스템 수요를 요인으로 들었다. 남동부·퍼미안 신규 수송능력 5.4 Bcf/d(Southeast Connector 2.6, Permian Link 2.8)가 백로그에 추가됐다.",
      "desk": "gas"
     },
     "sources": [
      {
       "id": 1,
       "title": "Kinder Morgan Reports Record Third Quarter 2026 Financial Results",
       "publisher": "Kinder Morgan (보도자료, SEC 8-K Ex.99.1)",
       "date": "2026-10-21",
       "url": "https://ir.kindermorgan.com/news/news-details/2026/Kinder-Morgan-Reports-Record-Third-Quarter-2026-Financial-Results/default.aspx"
      },
      {
       "id": 2,
       "title": "Kinder Morgan (KMI) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-21",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/21/kinder-morgan-kmi-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 3,
       "title": "Kinder Morgan 2026년 2분기 실적 발표문 (Form 8-K Ex.99.1)",
       "publisher": "SEC EDGAR",
       "date": "2026-07-22",
       "url": "https://www.sec.gov/Archives/edgar/data/0001506307/000150630726000063/kmi2026q28-kex991.htm"
      },
      {
       "id": 4,
       "title": "Kinder Morgan Form 10-Q(2026-09-30) XBRL company facts",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-10-23",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001506307.json"
      },
      {
       "id": 5,
       "title": "KMI quoteSummary (earningsHistory: 3분기 EPS 실적·컨센서스)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/v10/finance/quoteSummary/KMI?modules=calendarEvents,earnings,earningsHistory,earningsTrend,summaryDetail,defaultKeyStatistics"
      }
     ]
    },
    {
     "name_kr": "윌리엄스",
     "name_en": "The Williams Companies, Inc.",
     "ticker": "WMB",
     "yahoo": "WMB",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 107263,
     "role_kr": "Transco 간선망과 북동부·서부 집하망을 운영하는 천연가스 미드스트림 업체로 Socrates 등 데이터센터 전력 공급 프로젝트를 병행한다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-02",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 조정 EBITDA는 20.39억달러로 전년 대비 1.19억달러(6%) 늘어 같은 분기 기준 사상 최대다.",
       "src": [
        1
       ]
      },
      {
       "text": "GAAP 순이익은 6.99억달러(주당 0.56달러, 전년 0.53달러)이고, 조정 EPS는 0.54달러로 전년(0.49달러) 대비 10% 늘었다.",
       "src": [
        1
       ]
      },
      {
       "text": "AFFO는 15.89억달러로 10% 늘었고 AFFO 기준 배당 커버리지는 2.42배(전년 2.37배)다.",
       "src": [
        1
       ]
      },
      {
       "text": "Transmission, Power & Gulf 부문 EBITDA는 Socrates 전력 프로젝트, 가스 저장, 파이프라인 증설로 약 8,300만달러(약 9%) 늘었다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "Northeast G&P는 Ohio Valley Midstream 물량 증가로, West는 9월 인수를 마친 Momentum과 2025년 3분기 가동한 Louisiana Energy Gateway로 이익이 늘었다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "경영진은 연말까지 신규 우량 고객과 더 긴 계약 기간의 전력 프로젝트 1~2건을 추가할 것으로 예상했고, 내부 레버리지 상한 4배 이내의 신규 전력 프로젝트 초기 투자 여력을 약 20억달러로 제시했다.",
       "src": [
        2,
        3
       ]
      },
      {
       "text": "1~9월 누적 조정 EBITDA는 62.14억달러로 전년 대비 9% 늘었다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "3,223",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "조정 EBITDA",
       "value": "2.039",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +6%(+119백만 달러)",
       "src": 1
      },
      {
       "label": "보통주 귀속 순이익",
       "value": "699",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 646",
       "src": 1
      },
      {
       "label": "조정 EPS",
       "value": "0.54",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "전년 대비 +10%(0.49)",
       "src": 1
      },
      {
       "label": "AFFO",
       "value": "1.589",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +10%",
       "src": 1
      },
      {
       "label": "AFFO 기준 배당 커버리지",
       "value": "2.42",
       "unit": "배",
       "period": "2026년 3분기",
       "change": "전년 2.37배",
       "src": 1
      },
      {
       "label": "조정 EBITDA(누적)",
       "value": "6.214",
       "unit": "십억 달러",
       "period": "2026년 1~9월",
       "change": "전년 대비 +9%",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "2026년 조정 EBITDA 가이던스 83억~85억달러를 유지했고 범위 상단 절반 달성을 예상한다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "2026년 조정 EPS 2.30~2.40달러, AFFO 63.1억~64.4억달러 가이던스를 유지했다.",
       "src": [
        1
       ]
      },
      {
       "text": "연말 레버리지는 Momentum 연간 환산 기준 약 3.75배로 예상하며, CFO는 2026~2027년 레버리지 여력이 빠듯하고 2028년부터 이익 증가가 빨라진다고 밝혔다.",
       "src": [
        2
       ]
      },
      {
       "text": "2030년까지 조정 EBITDA 연평균 11% 이상 성장 목표를 재확인했다.",
       "src": [
        2,
        3
       ]
      }
     ],
     "read_through": {
      "text": "데이터센터 전력용 가스 수요가 윌리엄스 이익 증가를 이끌고 있다. Socrates 등으로 Transmission, Power & Gulf 부문 EBITDA가 약 9% 늘었고, 경영진은 연말까지 하이퍼스케일러 전력 프로젝트 1~2건 추가를 예상했다.",
      "desk": "power"
     },
     "sources": [
      {
       "id": 1,
       "title": "Williams Delivers Strong Third-Quarter 2026 Results",
       "publisher": "Williams (보도자료, SEC 8-K Ex.99)",
       "date": "2026-11-02",
       "url": "https://www.williams.com/2026/11/02/williams-delivers-strong-third-quarter-2026-results/"
      },
      {
       "id": 2,
       "title": "Williams (WMB) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-11-03",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/11/03/williams-wmb-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 3,
       "title": "Williams Posts Record $2.04B Q3 EBITDA, Tees Up One to Two More Hyperscaler Power Deals by Year-End",
       "publisher": "BigGo Finance (컨퍼런스콜 요약)",
       "date": "2026-11-03",
       "url": "https://finance.biggo.com/news/US_WMB_2026-11-03"
      },
      {
       "id": 4,
       "title": "WMB quoteSummary (earnings: 분기 매출·순이익)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/v10/finance/quoteSummary/WMB?modules=calendarEvents,earnings,earningsHistory,earningsTrend,summaryDetail,defaultKeyStatistics"
      }
     ]
    },
    {
     "name_kr": "에너지 트랜스퍼",
     "name_en": "Energy Transfer LP",
     "ticker": "ET",
     "yahoo": "ET",
     "exchange": "TXSE",
     "country": "미국",
     "cik": 1276187,
     "role_kr": "원유·NGL·천연가스 파이프라인과 수출터미널을 함께 운영하는 미국 대형 미드스트림 MLP다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-03",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 조정 EBITDA는 50.3억달러로 전년(38.4억달러) 대비 31% 늘었고, 파트너 귀속 조정 DCF는 25.2억달러로 33% 증가했다.",
       "src": [
        4
       ]
      },
      {
       "text": "NGL·정제유 부문 조정 EBITDA는 약 12억달러(전년 약 11억달러)로 우호적 시장 여건에 따른 마케팅 마진 증가(+1.77억달러)가 주로 이끌었고(Nederland·Marcus Hook 수출 관련 터미널 수수료 증가는 +1,200만달러), NGL 수출 물량은 전년 대비 9%, NGL 수송량은 6%, 분리 처리량은 5% 늘었다.",
       "src": [
        4,
        6
       ]
      },
      {
       "text": "원유 부문 조정 EBITDA는 8.71억달러로 전년(7.46억달러) 대비 17% 늘었고, 회사는 스프레드 확대와 변동성 증가 등 우호적 시장 여건을 주요인으로 들었다.",
       "src": [
        4
       ]
      },
      {
       "text": "주간(interstate) 가스 부문 조정 EBITDA는 약 5억달러(전년 4.31억달러)로 늘었고, 주요인은 운영비 5,500만달러 감소(Rover 과거분 재산세 정산 4,300만달러 포함)이며 계약 물량·가동률 상승에 따른 마진 증가는 1,700만달러였다.",
       "src": [
        4,
        6
       ]
      },
      {
       "text": "Nederland 에탄 수출 프로젝트 규모를 하루 24만배럴에서 약 30만배럴로 키웠고, LPG 수출능력 약 5.5만 b/d와 NGL 선석 2개를 더해 2028년부터 단계적으로 가동한다.",
       "src": [
        4,
        5
       ]
      },
      {
       "text": "경영진은 2025년 초 이후 하이퍼스케일러·데이터센터·발전소와 하루 950만 MMBtu 이상의 가스 공급 계약을 맺었다고 밝혔고, 텍사스 애빌린 900MW AI 캠퍼스용 Crusoe 가스 공급 계약을 사례로 들었다.",
       "src": [
        6
       ]
      },
      {
       "text": "11월 3일 발표(8-K)된 3분기 매출은 371.03억달러(+86%), 매출원가는 305.31억달러(+110%)다. LP 귀속 순이익은 11.40억달러(+19%)이고 유닛당 순이익 0.33달러는 Yahoo 집계 컨센서스(0.41달러)를 밑돌았다.",
       "src": [
        1,
        2,
        3
       ]
      },
      {
       "text": "3분기 지급 분배금은 유닛당 0.3425달러로 전년 동기(0.3325달러) 대비 3% 늘었고, 1~9월 설비투자 현금지출은 53.64억달러로 28% 증가했다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "조정 EBITDA",
       "value": "5.03",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +31%(3.84)",
       "src": 4
      },
      {
       "label": "파트너 귀속 조정 DCF",
       "value": "2.52",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +33%",
       "src": 4
      },
      {
       "label": "NGL·정제유 부문 조정 EBITDA",
       "value": "약 1.2",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 약 1.1",
       "src": 4
      },
      {
       "label": "원유 부문 조정 EBITDA",
       "value": "871",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +17%(746)",
       "src": 4
      },
      {
       "label": "주간 가스 부문 조정 EBITDA",
       "value": "약 500",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 431",
       "src": 4
      },
      {
       "label": "NGL 수출 물량 증감",
       "value": "+9%",
       "unit": "",
       "period": "2026년 3분기",
       "change": "전년 대비",
       "src": 4
      },
      {
       "label": "NGL 수송량 증감",
       "value": "+6%",
       "unit": "",
       "period": "2026년 3분기",
       "change": "전년 대비",
       "src": 4
      },
      {
       "label": "NGL 분리 처리량 증감",
       "value": "+5%",
       "unit": "",
       "period": "2026년 3분기",
       "change": "전년 대비",
       "src": 4
      },
      {
       "label": "매출",
       "value": "37,103",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +86%(19,954)",
       "src": 1
      },
      {
       "label": "LP 귀속 순이익",
       "value": "1,140",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +19%(959)",
       "src": 1
      },
      {
       "label": "희석 유닛당 순이익",
       "value": "0.33",
       "unit": "달러/유닛",
       "period": "2026년 3분기",
       "change": "전년 0.28",
       "src": 1
      },
      {
       "label": "유닛당 지급 분배금",
       "value": "0.3425",
       "unit": "달러/유닛",
       "period": "2026년 3분기",
       "change": "전년 대비 +3%(0.3325)",
       "src": 1
      },
      {
       "label": "설비투자 현금지출",
       "value": "5,364",
       "unit": "백만 달러",
       "period": "2026년 1~9월",
       "change": "전년 대비 +28%(4,180)",
       "src": 1
      },
      {
       "label": "장기부채",
       "value": "68,850",
       "unit": "백만 달러",
       "period": "2026-09-30",
       "change": "2025년 말 68,330",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "2026년 조정 EBITDA 가이던스를 197억~199억달러로 기존 188억~191억달러에서 올렸다.",
       "src": [
        4
       ]
      },
      {
       "text": "2026년 성장 투자는 54억~56억달러, 2027년은 약 70억달러를 예상하며, 2027년 정식 가이던스는 다음 분기에 제시한다.",
       "src": [
        4,
        6
       ]
      },
      {
       "text": "Desert Southwest 확장은 2029년 4분기, 아칸소 데이터센터 가스 공급 프로젝트는 2027년 중반 가동이 목표이고, Desert Southwest는 FERC 정식 인가 신청이 남았으며 South Mississippi 파이프라인 규모는 구속력 있는 오픈시즌 결과로 정한다.",
       "src": [
        5,
        6
       ]
      }
     ],
     "read_through": {
      "text": "원유 부문 조정 EBITDA가 8.71억달러로 17% 늘었고 회사는 스프레드 확대와 변동성 증가를 요인으로 들었다. NGL 수출 물량은 Nederland·Marcus Hook 중심으로 9% 늘었다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Energy Transfer LP Form 10-Q(2026-09-30) XBRL company facts",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-05",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001276187.json"
      },
      {
       "id": 2,
       "title": "Energy Transfer LP 공시 목록 (8-K 항목 2.02, 2026-11-03 제출)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-07",
       "url": "https://data.sec.gov/submissions/CIK0001276187.json"
      },
      {
       "id": 3,
       "title": "ET quoteSummary (earningsHistory: 3분기 EPS 실적·컨센서스)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/v10/finance/quoteSummary/ET?modules=calendarEvents,earnings,earningsHistory,earningsTrend,summaryDetail,defaultKeyStatistics"
      },
      {
       "id": 4,
       "title": "Energy Transfer Reports Third Quarter 2026 Results",
       "publisher": "Energy Transfer (보도자료, SEC 8-K Ex.99.1)",
       "date": "2026-11-03",
       "url": "https://ir.energytransfer.com/news-releases/news-release-details/energy-transfer-reports-third-quarter-2026-results"
      },
      {
       "id": 5,
       "title": "Q3 2026 Earnings, November 3, 2026 (실적 프레젠테이션)",
       "publisher": "Energy Transfer",
       "date": "2026-11-03",
       "url": "https://www.energytransfer.com/wp-content/uploads/2026/11/ET_Q3_2026_Earnings_Presentation_Final.pdf"
      },
      {
       "id": 6,
       "title": "Energy Transfer Q3 2026 Earnings Call Transcript (2026-11-03 컨퍼런스콜)",
       "publisher": "Benzinga",
       "date": "2026-11-03",
       "url": "https://www.benzinga.com/news/26/11/62825637/energy-transfer-q3-2026-earnings-call-transcript"
      }
     ]
    },
    {
     "name_kr": "엔터프라이즈 프로덕츠 파트너스",
     "name_en": "Enterprise Products Partners L.P.",
     "ticker": "EPD",
     "yahoo": "EPD",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1061219,
     "role_kr": "NGL·LPG·에탄 수출터미널과 원유·석유화학 파이프라인을 운영하는 미국 대형 미드스트림 MLP다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-29",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 조정 EBITDA는 약 28억달러로 16% 늘었고 DCF는 23억달러로 27% 증가해 분배금 커버리지 1.9배, 유보 현금흐름 11억달러를 기록했다.",
       "src": [
        4
       ]
      },
      {
       "text": "해상터미널 물량은 250만 b/d로 28% 늘었고, 이 중 NGL 해상터미널 물량은 120만 b/d로 전년 대비 28.8만 b/d 증가했다(에탄 수출 +13.9만 b/d, LPG 수출 +14.9만 b/d).",
       "src": [
        4
       ]
      },
      {
       "text": "NGL 파이프라인 물량은 사상 최대인 500만 b/d(+6%), 분리 처리량은 190만 b/d(전년 160만 b/d), 가스처리 유입량은 사상 최대인 8.5 Bcf/d, 원유 파이프라인 물량은 270만 b/d(+4.8만 b/d)다.",
       "src": [
        4
       ]
      },
      {
       "text": "Neches River 2단계 수출능력은 5월 가동했고, Houston Ship Channel LPG 터미널 증설(30만 b/d, 전량 계약)은 시운전 중으로 연내 완공 시 선적능력이 약 110만 b/d가 되며, Midland Basin Athena 가스처리 플랜트도 4분기 완공 예정이다.",
       "src": [
        4,
        5
       ]
      },
      {
       "text": "경영진은 2025~2030년 퍼미안 습성가스·NGL 생산 증가율 전망을 6개월 전 23%에서 34%로 올렸고(원유 증가는 약 10만 b/d), 퍼미안 가스처리 플랜트를 연 2기 가까이 지어야 한다고 밝혔다.",
       "src": [
        5
       ]
      },
      {
       "text": "경영진은 LPG 수출능력의 약 90%가 2030년까지 계약됐고 고객 수요가 에너지 안보 우려와 미국 생산자에 대한 신뢰에서 나온다고 밝혔으며, 미국 에탄은 공급 과잉이 이어질 것으로 봤다.",
       "src": [
        5
       ]
      },
      {
       "text": "10월 29일 발표(8-K)된 3분기 매출은 179.48억달러(+49%), 매출원가는 139.93억달러(+63%)다. 순이익은 16.24억달러(+21%), 희석 유닛당 순이익은 0.75달러이고 조정 EPS 0.755달러는 Yahoo 집계 컨센서스(0.73달러)를 웃돌았다.",
       "src": [
        1,
        2,
        3
       ]
      },
      {
       "text": "3분기 분배금은 유닛당 0.56달러(+2.8%)이고 3분기 자사 유닛 매입은 1.12억달러이며, 1~9월 설비투자 현금지출은 31.99억달러로 26% 줄었다.",
       "src": [
        1,
        4
       ]
      }
     ],
     "metrics": [
      {
       "label": "조정 EBITDA",
       "value": "약 2.8",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +16%",
       "src": 4
      },
      {
       "label": "DCF",
       "value": "2.3",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +27%",
       "src": 4
      },
      {
       "label": "분배금 커버리지",
       "value": "1.9",
       "unit": "배",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "해상터미널 물량",
       "value": "2.5",
       "unit": "MMBPD",
       "period": "2026년 3분기",
       "change": "전년 대비 +28%",
       "src": 4
      },
      {
       "label": "NGL 해상터미널 물량",
       "value": "1.2",
       "unit": "MMBPD",
       "period": "2026년 3분기",
       "change": "전년 대비 +288 MBPD",
       "src": 4
      },
      {
       "label": "에탄 수출 물량 증감",
       "value": "+139",
       "unit": "MBPD",
       "period": "2026년 3분기",
       "change": "전년 대비",
       "src": 4
      },
      {
       "label": "LPG 수출 물량 증감",
       "value": "+149",
       "unit": "MBPD",
       "period": "2026년 3분기",
       "change": "전년 대비",
       "src": 4
      },
      {
       "label": "NGL 파이프라인 물량",
       "value": "5.0",
       "unit": "MMBPD",
       "period": "2026년 3분기",
       "change": "전년 대비 +6%(+284 MBPD), 사상 최대",
       "src": 4
      },
      {
       "label": "NGL 분리 처리량",
       "value": "1.9",
       "unit": "MMBPD",
       "period": "2026년 3분기",
       "change": "전년 1.6",
       "src": 4
      },
      {
       "label": "가스처리 유입량",
       "value": "8.5",
       "unit": "Bcf/d",
       "period": "2026년 3분기",
       "change": "사상 최대",
       "src": 4
      },
      {
       "label": "원유 파이프라인 물량",
       "value": "2.7",
       "unit": "MMBPD",
       "period": "2026년 3분기",
       "change": "전년 대비 +48 MBPD",
       "src": 4
      },
      {
       "label": "매출",
       "value": "17,948",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +49%(12,023)",
       "src": 1
      },
      {
       "label": "순이익",
       "value": "1,624",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +21%(1,338)",
       "src": 1
      },
      {
       "label": "분배금(선언)",
       "value": "0.56",
       "unit": "달러/유닛",
       "period": "2026년 3분기",
       "change": "전년 대비 +2.8%(0.545)",
       "src": 1
      },
      {
       "label": "설비투자 현금지출",
       "value": "3,199",
       "unit": "백만 달러",
       "period": "2026년 1~9월",
       "change": "전년 대비 -26%(4,319)",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "2027년 성장률은 2026년보다 낮을 것으로 예상했고, 근거로 지정학적 불확실성과 현재 스프레드의 지속 가능성을 들었다.",
       "src": [
        5
       ]
      },
      {
       "text": "경영진은 LPG 수출 물량이 2027년에 크게 늘 것으로 예상했다.",
       "src": [
        4,
        5
       ]
      },
      {
       "text": "건설 중인 프로젝트 규모는 63억달러다.",
       "src": [
        6
       ]
      }
     ],
     "read_through": {
      "text": "NGL 해상터미널 물량이 120만 b/d로 전년 대비 28.8만 b/d 늘었고, 회사는 2030년까지 퍼미안 습성가스·NGL 생산 증가율 전망을 34%로 올렸다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Enterprise Products Partners Form 10-Q(2026-09-30) XBRL company facts",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-04",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001061219.json"
      },
      {
       "id": 2,
       "title": "Enterprise Products Partners 공시 목록 (8-K 항목 2.02, 2026-10-29 제출)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-07",
       "url": "https://data.sec.gov/submissions/CIK0001061219.json"
      },
      {
       "id": 3,
       "title": "EPD quoteSummary (earningsHistory: 3분기 EPS 실적·컨센서스)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/v10/finance/quoteSummary/EPD?modules=calendarEvents,earnings,earningsHistory,earningsTrend,summaryDetail,defaultKeyStatistics"
      },
      {
       "id": 4,
       "title": "Enterprise Reports Third Quarter 2026 Earnings",
       "publisher": "Enterprise Products Partners (보도자료, Business Wire)",
       "date": "2026-10-29",
       "url": "https://ir.enterpriseproducts.com/news-releases/news-release-details/enterprise-reports-third-quarter-2026-earnings"
      },
      {
       "id": 5,
       "title": "Enterprise Products (EPD) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-29",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/29/enterprise-products-epd-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 6,
       "title": "With $6.3B in projects under construction, Enterprise Products (EPD) posts higher quarterly profit (8-K 요약)",
       "publisher": "StockTitan",
       "date": "2026-10-29",
       "url": "https://www.stocktitan.net/sec-filings/EPD/8-k-enterprise-products-partners-l-p-reports-material-event-15775a8759e1.html"
      }
     ]
    },
    {
     "name_kr": "엔브리지",
     "name_en": "Enbridge Inc.",
     "ticker": "ENB",
     "yahoo": "ENB",
     "exchange": "NYSE·TSX",
     "country": "캐나다",
     "cik": null,
     "role_kr": "원유·희석제 배관과 터미널, 가스 수송·도시가스·저장 사업을 운영하는 배관 회사로, 자산마다 공용 운송·장기 약정·규제요금 구조가 다르다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-06",
     "status": "reported",
     "highlights": [
      {
       "text": "경영진은 Mainline이 수송능력 한도 가까이 운영됐다고 설명했다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "경영진은 Permian 생산지에서 Gray Oak를 거쳐 Ingleside 수출 거점으로 가는 연결 강화를 설명했다.",
       "src": [
        2
       ]
      },
      {
       "text": "Flanagan South는 추가 수요 모집(open season)을 완료했다.",
       "src": [
        1
       ]
      },
      {
       "text": "Blackcomb 가스관은 가동을 개시했고, Bay Runner 가스관은 기계적 완공 단계로 LNG 시설 연결을 준비했다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "Blackcomb 가스관 최대 능력(가동 개시)",
       "value": "2.5",
       "unit": "Bcf/d",
       "period": "2026년 3분기 발표 기준",
       "change": "",
       "src": 1
      },
      {
       "label": "Bay Runner 가스관 능력(기계적 완공)",
       "value": "2.6",
       "unit": "Bcf/d",
       "period": "2026년 3분기 발표 기준",
       "change": "",
       "src": 1
      },
      {
       "label": "Canadian Mainline 캐나다 구간 운영능력",
       "value": "약 3.2",
       "unit": "백만 b/d",
       "period": "회계 2025년 연차보고서",
       "change": "",
       "src": 3
      },
      {
       "label": "Southern Lights 희석제 수송 약정 비중",
       "value": "약 90",
       "unit": "%",
       "period": "회계 2025년 연차보고서(계약 수준은 2030년 중반까지)",
       "change": "",
       "src": 3
      }
     ],
     "guidance": [],
     "read_through": {
      "text": "캐나다 WCSB 원유는 Mainline을 거쳐 정유 수요지로 간다. 배관 반출이 제한되면 산지 가격이 할인될 수 있다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Enbridge 공식 실적자료: 3Q26",
       "publisher": "Enbridge",
       "date": "2026-11-06",
       "url": "https://www.enbridge.com/media-center/news/details?id=123894&lang=en"
      },
      {
       "id": 2,
       "title": "Enbridge 어닝콜 · 2026년 11월 6일(발표발언, 가스 수송·프로젝트 관련 질의응답)",
       "publisher": "Enbridge",
       "date": "2026-11-06",
       "url": ""
      },
      {
       "id": 3,
       "title": "Enbridge 회계 2025년 연차보고서 Item 1·1A(자산·계약 설명)",
       "publisher": "Enbridge",
       "date": "",
       "url": "https://www.sec.gov/Archives/edgar/data/895728/000119312526049810/enb-20251231.htm"
      }
     ]
    },
    {
     "name_kr": "프론트라인",
     "name_en": "Frontline plc",
     "ticker": "FRO",
     "yahoo": "FRO",
     "exchange": "NYSE",
     "country": "키프로스",
     "cik": null,
     "role_kr": "VLCC·수에즈막스·LR2/아프라막스 선대를 현물 시장 중심으로 운용하는 원유 탱커 선사다.",
     "period": "2026년 2분기",
     "period_end": "2026-06-30",
     "report_date": "2026-08-28",
     "status": "not_yet",
     "highlights": [
      {
       "text": "3분기 실적은 11월 20일 발표 예정이다(Yahoo 일정). 11월 7일 기준 3분기 보고서는 SEC에 제출되지 않아 최신 실적은 2분기다.",
       "src": [
        3,
        5
       ]
      },
      {
       "text": "2분기 순이익은 6.59억달러(주당 2.96달러)로 사상 최대였고, 조정 순이익은 5.80억달러(조정 EPS 2.61달러)다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "2분기 현물 TCE는 VLCC 152,700달러/일, 수에즈막스 111,500달러/일, LR2/아프라막스 92,400달러/일이다.",
       "src": [
        1
       ]
      },
      {
       "text": "2분기 TCE 수익은 7.53억달러로 전년 동기(2.83억달러)의 2.7배다.",
       "src": [
        1
       ]
      },
      {
       "text": "2분기 발표 시점 3분기 현물 확보 운임은 VLCC 156,900달러/일(일수의 86%), 수에즈막스 117,400달러/일(79%), LR2/아프라막스 81,000달러/일(70%)로 VLCC·수에즈막스는 2분기 실현치를 웃돌고 LR2/아프라막스는 밑돈다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "경영진은 적하~양하(load-to-discharge) 회계상 공선 항해일에는 수익이 인식되지 않아 3분기 전체 실현 운임이 확보 운임보다 낮을 수 있다고 밝혔다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "최고령 수에즈막스 2척 매각으로 5,470만달러 차익을 냈고 VLCC 2척 매각 완료와 연계한 주당 0.80달러 특별배당을 계획했으며, 9월 18일 배당락 기준 주당 배당은 3.41달러다(Yahoo).",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "6월 말 총차입금은 24.35억달러로 2025년 9월 말(32.40억달러) 대비 8.05억달러 줄었다(Yahoo 재무 데이터).",
       "src": [
        4
       ]
      }
     ],
     "metrics": [
      {
       "label": "순이익",
       "value": "659.2",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "",
       "src": 1
      },
      {
       "label": "조정 순이익",
       "value": "580.2",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "",
       "src": 1
      },
      {
       "label": "EPS",
       "value": "2.96",
       "unit": "달러/주",
       "period": "2026년 2분기",
       "change": "",
       "src": 1
      },
      {
       "label": "조정 EPS",
       "value": "2.61",
       "unit": "달러/주",
       "period": "2026년 2분기",
       "change": "",
       "src": 3
      },
      {
       "label": "TCE 수익",
       "value": "753.3",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "전년 동기 283",
       "src": 1
      },
      {
       "label": "VLCC 현물 TCE",
       "value": "152,700",
       "unit": "달러/일",
       "period": "2026년 2분기",
       "change": "",
       "src": 1
      },
      {
       "label": "수에즈막스 현물 TCE",
       "value": "111,500",
       "unit": "달러/일",
       "period": "2026년 2분기",
       "change": "",
       "src": 1
      },
      {
       "label": "LR2/아프라막스 현물 TCE",
       "value": "92,400",
       "unit": "달러/일",
       "period": "2026년 2분기",
       "change": "",
       "src": 1
      },
      {
       "label": "VLCC 확보 운임(확보율)",
       "value": "156,900(86%)",
       "unit": "달러/일",
       "period": "2026년 3분기(2분기 발표 시점)",
       "change": "",
       "src": 1
      },
      {
       "label": "수에즈막스 확보 운임(확보율)",
       "value": "117,400(79%)",
       "unit": "달러/일",
       "period": "2026년 3분기(2분기 발표 시점)",
       "change": "",
       "src": 1
      },
      {
       "label": "LR2/아프라막스 확보 운임(확보율)",
       "value": "81,000(70%)",
       "unit": "달러/일",
       "period": "2026년 3분기(2분기 발표 시점)",
       "change": "",
       "src": 1
      },
      {
       "label": "총차입금",
       "value": "2,434.8",
       "unit": "백만 달러",
       "period": "2026-06-30",
       "change": "2025-09-30 3,239.7",
       "src": 4
      },
      {
       "label": "3분기 EPS 컨센서스(애널리스트 추정)",
       "value": "2.27",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "애널리스트 3명",
       "src": 3
      }
     ],
     "guidance": [],
     "read_through": {
      "text": "3분기 VLCC 확보 운임 156,900달러/일(86%)은 2분기 실현치 152,700달러/일을 웃돌았고, LR2/아프라막스는 81,000달러/일로 2분기 92,400달러/일보다 낮다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "Frontline plc reports results for the second quarter ended June 30, 2026 (Form 6-K Ex.1)",
       "publisher": "Frontline plc / SEC EDGAR",
       "date": "2026-08-28",
       "url": "https://www.sec.gov/Archives/edgar/data/913290/000091957426005942/p15060813_ex-1.htm"
      },
      {
       "id": 2,
       "title": "Frontline plc (FRO) Q2 2026 Earnings Call Transcript (2026-08-28 컨퍼런스콜)",
       "publisher": "Seeking Alpha",
       "date": "2026-08-28",
       "url": "https://seekingalpha.com/article/4941294-frontline-plc-fro-q2-2026-earnings-call-transcript"
      },
      {
       "id": 3,
       "title": "FRO quoteSummary (실적 일정, EPS 실적·컨센서스, 배당)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/v10/finance/quoteSummary/FRO?modules=calendarEvents,earnings,earningsHistory,earningsTrend,summaryDetail,defaultKeyStatistics"
      },
      {
       "id": 4,
       "title": "FRO fundamentals timeseries (분기 차입금·현금)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/FRO?type=quarterlyNetIncome,quarterlyDilutedEPS,quarterlyEBITDA,quarterlyOperatingCashFlow,quarterlyGainOnSaleOfPPE,quarterlyCashAndCashEquivalents,quarterlyTotalDebt,quarterlyNetPPE,quarterlyCapitalExpenditure,quarterlyRepurchaseOfCapitalStock,quarterlyCashDividendsPaid"
      },
      {
       "id": 5,
       "title": "Frontline plc 공시 목록 (최근 6-K: 2026-08-28 2분기 실적, 2026-09-16 반기보고서)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-07",
       "url": "https://data.sec.gov/submissions/CIK0000913290.json"
      }
     ]
    },
    {
     "name_kr": "DHT 홀딩스",
     "name_en": "DHT Holdings, Inc.",
     "ticker": "DHT",
     "yahoo": "DHT",
     "exchange": "NYSE",
     "country": "버뮤다(해밀턴 본사, 마셜제도 법인)",
     "cik": null,
     "role_kr": "VLCC 선대를 운용하는 원유 탱커 선사다.",
     "period": "2026년 2분기",
     "period_end": "2026-06-30",
     "report_date": "2026-08-05",
     "status": "not_yet",
     "highlights": [
      {
       "text": "3분기 실적은 11월 9일 21:00 UTC(한국시간 10일 06:00) 발표, 11월 10일 13:00 UTC 컨퍼런스콜 예정이다(Yahoo 일정). 11월 7일 기준 3분기 실적 6-K는 SEC에 제출되지 않았다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "10월 12일 사업 업데이트에서 3분기 VLCC 현물 TCE는 약 167,100달러/일이고, 4분기 현물 일수의 약 50%를 평균 509,100달러/일(discharge-to-discharge 기준)에 확보했다고 밝혔다.",
       "src": [
        5
       ]
      },
      {
       "text": "2분기는 사상 최대 분기다. 해운 매출은 2.848억달러, 순이익은 1.983억달러(EPS 1.23달러), 조정 EBITDA는 2.31억달러다.",
       "src": [
        2,
        4
       ]
      },
      {
       "text": "2분기 TCE는 평균 126,700달러/일이며 현물 VLCC 162,600달러/일, 정기용선 VLCC 90,800달러/일이다(수익일수 2,012일 중 현물 1,007일).",
       "src": [
        4,
        6
       ]
      },
      {
       "text": "2분기 발표 시점 3분기 예상 현물 1,029일 중 58%(600일)를 152,700달러/일에 확보했고, 회사는 3분기 현물 손익분기점이 0 미만이라고 추정했다.",
       "src": [
        4,
        6
       ]
      },
      {
       "text": "2분기 배당은 주당 1.22달러(기준일 8월 17일, 지급 8월 24일)이고, 유동성은 5.69억달러(현금 1.617억달러, 리볼버 가용액 4.075억달러)다.",
       "src": [
        4
       ]
      },
      {
       "text": "부채 없는 DHT Bauhinia를 5,100만달러에 매각해 3,420만달러 차익을 예상했고, DHT Jaguar는 3년 정기용선을 75,000달러/일에 체결했다.",
       "src": [
        4
       ]
      },
      {
       "text": "애널리스트 컨센서스(Yahoo 집계, 추정)는 3분기 EPS 1.26달러(5명), 4분기 EPS 2.83달러(4명)·매출 4.82억달러다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "현물 VLCC TCE",
       "value": "162,600",
       "unit": "달러/일",
       "period": "2026년 2분기",
       "change": "",
       "src": 4
      },
      {
       "label": "정기용선 VLCC TCE",
       "value": "90,800",
       "unit": "달러/일",
       "period": "2026년 2분기",
       "change": "",
       "src": 4
      },
      {
       "label": "평균 TCE",
       "value": "126,700",
       "unit": "달러/일",
       "period": "2026년 2분기",
       "change": "",
       "src": 4
      },
      {
       "label": "3분기 현물 확보 운임(확보율)",
       "value": "152,700(58%)",
       "unit": "달러/일",
       "period": "2026년 3분기(2분기 발표 시점)",
       "change": "",
       "src": 6
      },
      {
       "label": "3분기 현물 VLCC TCE(예비)",
       "value": "약 167,100",
       "unit": "달러/일",
       "period": "2026년 3분기(10월 12일 업데이트)",
       "change": "",
       "src": 5
      },
      {
       "label": "4분기 현물 확보 운임(확보율)",
       "value": "509,100(약 50%)",
       "unit": "달러/일",
       "period": "2026년 4분기(10월 12일 기준, discharge-to-discharge)",
       "change": "",
       "src": 5
      },
      {
       "label": "해운 매출",
       "value": "284.8",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "",
       "src": 4
      },
      {
       "label": "순이익",
       "value": "198.3",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "1분기 164.5(Yahoo)",
       "src": 4
      },
      {
       "label": "EPS",
       "value": "1.23",
       "unit": "달러/주",
       "period": "2026년 2분기",
       "change": "",
       "src": 4
      },
      {
       "label": "조정 EBITDA",
       "value": "231.0",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "",
       "src": 4
      },
      {
       "label": "분기 배당",
       "value": "1.22",
       "unit": "달러/주",
       "period": "2026년 2분기",
       "change": "",
       "src": 4
      },
      {
       "label": "총차입금",
       "value": "434.8",
       "unit": "백만 달러",
       "period": "2026-06-30",
       "change": "",
       "src": 2
      },
      {
       "label": "3분기 EPS 컨센서스(애널리스트 추정)",
       "value": "1.26",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "애널리스트 5명",
       "src": 1
      },
      {
       "label": "4분기 EPS 컨센서스(애널리스트 추정)",
       "value": "2.83",
       "unit": "달러/주",
       "period": "2026년 4분기",
       "change": "애널리스트 4명",
       "src": 1
      }
     ],
     "guidance": [],
     "read_through": {
      "text": "4분기 VLCC 현물 확보 운임은 509,100달러/일로 3분기 예비 TCE 167,100달러/일의 3.0배다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "DHT quoteSummary (실적 일정, EPS 실적·컨센서스, 배당)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/v10/finance/quoteSummary/DHT?modules=calendarEvents,earnings,earningsHistory,earningsTrend,summaryDetail,defaultKeyStatistics"
      },
      {
       "id": 2,
       "title": "DHT fundamentals timeseries (분기 순이익·차입금)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/DHT?type=quarterlyNetIncome,quarterlyDilutedEPS,quarterlyEBITDA,quarterlyOperatingCashFlow,quarterlyGainOnSaleOfPPE,quarterlyCashAndCashEquivalents,quarterlyTotalDebt,quarterlyNetPPE,quarterlyCapitalExpenditure,quarterlyRepurchaseOfCapitalStock,quarterlyCashDividendsPaid"
      },
      {
       "id": 3,
       "title": "DHT Holdings 공시 목록 (6-K: 2026-08-05 2분기 실적, 2026-10-13 사업 업데이트)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-07",
       "url": "https://data.sec.gov/submissions/CIK0001331284.json"
      },
      {
       "id": 4,
       "title": "DHT Holdings, Inc. Second Quarter 2026 Results (Form 6-K Ex.99.1)",
       "publisher": "DHT Holdings / SEC EDGAR",
       "date": "2026-08-05",
       "url": "https://www.sec.gov/Archives/edgar/data/0001331284/000095015726000847/ex99-1.htm"
      },
      {
       "id": 5,
       "title": "DHT Holdings, Inc. Business Update (Form 6-K Ex.99.1, 2026-10-13 제출)",
       "publisher": "DHT Holdings / SEC EDGAR",
       "date": "2026-10-12",
       "url": "https://www.sec.gov/Archives/edgar/data/0001331284/000095015726001092/ex99-1.htm"
      },
      {
       "id": 6,
       "title": "Earnings call transcript: DHT posts record Q2 2026 profit, beats forecasts (2분기 컨퍼런스콜)",
       "publisher": "Investing.com",
       "date": "2026-08-05",
       "url": "https://www.investing.com/news/transcripts/earnings-call-transcript-dht-posts-record-q2-2026-profit-beats-forecasts-93CH-4842188"
      }
     ]
    },
    {
     "name_kr": "스콜피오 탱커스",
     "name_en": "Scorpio Tankers Inc.",
     "ticker": "STNG",
     "yahoo": "STNG",
     "exchange": "NYSE",
     "country": "모나코",
     "cik": null,
     "role_kr": "MR·LR2 중심 정제유 탱커 선대를 운용하는 석유제품 해상운송 선사다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-28",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 TCE는 LR2 55,184달러/일(전년 31,482달러/일), MR 31,073달러/일, Handymax 24,157달러/일이다.",
       "src": [
        4
       ]
      },
      {
       "text": "10월 28일 기준 4분기 풀·현물 확보 운임은 LR2 181,000달러/일(일수의 44%), MR 56,000달러/일(47%), Handymax 40,000달러/일(37%)이다.",
       "src": [
        4,
        5
       ]
      },
      {
       "text": "경영진은 5월 이후 중동 원유 수출이 하루 800만배럴에서 1,700만배럴 가까이로 두 배 넘게 늘고 세계 정제 가동량이 하루 400만배럴 늘어 운임이 올랐다고 밝혔다.",
       "src": [
        5
       ]
      },
      {
       "text": "회사는 2분기 발표문에서 호르무즈 해협 경유 수출이 멈춰 원거리 시장에서 물량을 조달했다고 밝혔고, 3분기 발표문에서는 전쟁으로 항해 거리가 늘고 선박 위치가 흩어져 선복이 빠듯해졌다고 설명했다.",
       "src": [
        4,
        6
       ]
      },
      {
       "text": "10월 28일 발표(6-K)된 3분기 조정 EBITDA는 1.72억달러, 조정 순이익은 1.27억달러(조정 EPS 2.49달러, 컨센서스 2.07달러)이고, GAAP 순이익은 선박 매각 차익 1.53억달러를 포함한 2.24억달러(희석 EPS 4.60달러)다.",
       "src": [
        1,
        2,
        3,
        4
       ]
      },
      {
       "text": "분기 배당을 주당 0.45달러에서 0.75달러로 67% 올렸고(기준일 11월 13일, 지급 12월 4일), 경영진은 배당을 매년 늘리겠다고 밝혔다.",
       "src": [
        4,
        5
       ]
      },
      {
       "text": "노르딕 채권 조기상환으로 2억달러를 갚았고 순현금은 14억달러이며, 10월 26일 기준 현금 21억달러·가용 유동성 25억달러(리볼버 4.83억달러 포함), 선박당 현금 손익분기점은 하루 11,000달러 미만이다.",
       "src": [
        4,
        5
       ]
      }
     ],
     "metrics": [
      {
       "label": "LR2 TCE",
       "value": "55,184",
       "unit": "달러/일",
       "period": "2026년 3분기",
       "change": "전년 31,482",
       "src": 4
      },
      {
       "label": "MR TCE",
       "value": "31,073",
       "unit": "달러/일",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "Handymax TCE",
       "value": "24,157",
       "unit": "달러/일",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "LR2 확보 운임(확보율)",
       "value": "181,000(44%)",
       "unit": "달러/일",
       "period": "2026년 4분기(10월 28일 기준)",
       "change": "",
       "src": 4
      },
      {
       "label": "MR 확보 운임(확보율)",
       "value": "56,000(47%)",
       "unit": "달러/일",
       "period": "2026년 4분기(10월 28일 기준)",
       "change": "",
       "src": 4
      },
      {
       "label": "Handymax 확보 운임(확보율)",
       "value": "40,000(37%)",
       "unit": "달러/일",
       "period": "2026년 4분기(10월 28일 기준)",
       "change": "",
       "src": 5
      },
      {
       "label": "조정 EBITDA",
       "value": "172",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "조정 순이익",
       "value": "127",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "조정 EPS",
       "value": "2.49",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "2분기 4.68, 컨센서스 2.07",
       "src": 2
      },
      {
       "label": "순이익",
       "value": "224.3",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 84.5",
       "src": 3
      },
      {
       "label": "분기 배당",
       "value": "0.75",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "+67%(0.45)",
       "src": 4
      },
      {
       "label": "순현금",
       "value": "1.4",
       "unit": "십억 달러",
       "period": "2026년 3분기 말",
       "change": "",
       "src": 5
      },
      {
       "label": "선박당 현금 손익분기점",
       "value": "<11,000",
       "unit": "달러/일",
       "period": "",
       "change": "",
       "src": 5
      },
      {
       "label": "4분기 EPS 컨센서스(애널리스트 추정)",
       "value": "5.67",
       "unit": "달러/주",
       "period": "2026년 4분기",
       "change": "애널리스트 9명",
       "src": 2
      }
     ],
     "guidance": [
      {
       "text": "4분기 확보 운임은 LR2 181,000달러/일(44%), MR 56,000달러/일(47%), Handymax 40,000달러/일(37%)이며 일부 일수 기준이다.",
       "src": [
        4,
        5
       ]
      },
      {
       "text": "경영진은 4분기가 통상 정제유선 최대 성수기이고 올해는 예년보다 훨씬 높은 수준에서 출발한다고 밝혔다.",
       "src": [
        5
       ]
      }
     ],
     "read_through": {
      "text": "4분기 LR2 확보 운임 181,000달러/일은 3분기 풀·현물 72,283달러/일의 2.5배, MR 56,000달러/일은 31,183달러/일의 1.8배다. 회사는 중동 원유 수출 회복과 전쟁에 따른 항해거리 증가·선박 분산을 요인으로 들었다.",
      "desk": "products"
     },
     "sources": [
      {
       "id": 1,
       "title": "Scorpio Tankers 공시 목록 (6-K stng6k-q32026epr.htm, 2026-10-28 제출)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-07",
       "url": "https://data.sec.gov/submissions/CIK0001483934.json"
      },
      {
       "id": 2,
       "title": "STNG quoteSummary (EPS 실적·컨센서스, 배당 일정)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/v10/finance/quoteSummary/STNG?modules=calendarEvents,earnings,earningsHistory,earningsTrend,summaryDetail,defaultKeyStatistics"
      },
      {
       "id": 3,
       "title": "STNG fundamentals timeseries (분기 순이익·매각차익·현금·차입금)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/STNG?type=quarterlyNetIncome,quarterlyDilutedEPS,quarterlyEBITDA,quarterlyOperatingCashFlow,quarterlyGainOnSaleOfPPE,quarterlyCashAndCashEquivalents,quarterlyTotalDebt,quarterlyNetPPE,quarterlyCapitalExpenditure,quarterlyRepurchaseOfCapitalStock,quarterlyCashDividendsPaid"
      },
      {
       "id": 4,
       "title": "Scorpio Tankers Inc. Announces Financial Results for the Third Quarter of 2026 and An Increase to its Quarterly Dividend",
       "publisher": "Scorpio Tankers (GlobeNewswire, SEC 6-K Ex.99.1)",
       "date": "2026-10-28",
       "url": "https://www.globenewswire.com/news-release/2026/10/28/3389990/0/en/scorpio-tankers-inc-announces-financial-results-for-the-third-quarter-of-2026-and-an-increase-to-its-quarterly-dividend.html"
      },
      {
       "id": 5,
       "title": "Scorpio Tankers (STNG) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-28",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/28/scorpio-tankers-stng-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 6,
       "title": "Scorpio Tankers 2026년 2분기 실적 발표문 (Form 6-K Ex.99.1)",
       "publisher": "SEC EDGAR",
       "date": "2026-07-30",
       "url": "https://www.sec.gov/Archives/edgar/data/0001483934/000162828026051064/q22026earnings-exhibit991.htm"
      }
     ]
    },
    {
     "name_kr": "인터내셔널 시웨이즈",
     "name_en": "International Seaways, Inc.",
     "ticker": "INSW",
     "yahoo": "INSW",
     "exchange": "NYSE",
     "country": "미국(뉴욕 본사, 마셜제도 법인)",
     "cik": 1679049,
     "role_kr": "원유선과 정제유선 2개 사업부를 함께 운영하는 미국 상장 탱커 선사다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-05",
     "status": "reported",
     "highlights": [
      {
       "text": "11월 5일 발표(8-K)된 3분기 순이익은 사상 최대인 3.44억달러(희석 EPS 6.90달러)이고 조정 EBITDA는 3.45억달러, 선박 매각 차익을 뺀 조정 순이익은 약 2.91억달러로 2분기 순이익(2.95억달러)과 비슷하며, 조정 EPS 5.84달러는 컨센서스(5.79달러)와 비슷하다.",
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
       "text": "3분기 현물 TCE는 VLCC 약 154,600달러/일, 수에즈막스 약 102,500달러/일, 아프라막스 약 57,800달러/일, LR1 약 51,100달러/일(2분기 79,200달러/일), MR 약 35,400달러/일(2분기 60,300달러/일)이다.",
       "src": [
        7
       ]
      },
      {
       "text": "TCE 수익은 4.43억달러로 원유선 3.21억달러(이중연료 VLCC 이익공유 약 7,700만달러 포함), 정제유선 1.21억달러다.",
       "src": [
        5,
        7
       ]
      },
      {
       "text": "콜 시점 4분기 현물 일수의 53%를 약 172,300달러/일에 확보했다. VLCC는 60%를 약 471,600달러/일(3분기 154,600달러/일의 3.1배), 수에즈막스는 47%를 약 300,200달러/일에 확보했다.",
       "src": [
        6,
        7
       ]
      },
      {
       "text": "경영진은 VLCC 운임이 지난 35년 최고치의 4배 가까이에 이르렀고 현물·정기용선 합산 VLCC 수익이 하루 20만달러를 넘었다고 밝혔으며, 요인으로 지정학 요인과 낮은 OECD 원유 재고를 들었다.",
       "src": [
        6
       ]
      },
      {
       "text": "2012년식 수에즈막스를 7,400만달러에 팔아 약 5,300만달러 차익을 냈고, LR1 6척 프로그램을 마무리한 뒤 2028년 하반기 인도 LR1 4척을 추가 발주했으며, VLCC 4척을 보유한 Bruton Limited 인수(약 3.7억달러)를 10월 16일 공시했다.",
       "src": [
        5,
        7,
        8
       ]
      },
      {
       "text": "3분기 배당으로 주당 5.05달러를 선언해 직전 분기 최대치와 같은 수준을 유지했고, 1~9월 배당 지급액은 5.82억달러(전년 1.02억달러)다.",
       "src": [
        1,
        5
       ]
      },
      {
       "text": "유동성은 약 9.64억달러이고 9월 말 장기부채는 7.00억달러(2025년 말 5.67억달러)이며, 경영진은 신조 발주 잔량 증가를 운임 하방 위험으로 꼽았다.",
       "src": [
        1,
        6
       ]
      }
     ],
     "metrics": [
      {
       "label": "VLCC 현물 TCE",
       "value": "약 154,600",
       "unit": "달러/일",
       "period": "2026년 3분기",
       "change": "",
       "src": 7
      },
      {
       "label": "수에즈막스 현물 TCE",
       "value": "약 102,500",
       "unit": "달러/일",
       "period": "2026년 3분기",
       "change": "",
       "src": 7
      },
      {
       "label": "아프라막스 현물 TCE",
       "value": "약 57,800",
       "unit": "달러/일",
       "period": "2026년 3분기",
       "change": "",
       "src": 7
      },
      {
       "label": "LR1 현물 TCE",
       "value": "약 51,100",
       "unit": "달러/일",
       "period": "2026년 3분기",
       "change": "2분기 79,200",
       "src": 7
      },
      {
       "label": "MR 현물 TCE",
       "value": "약 35,400",
       "unit": "달러/일",
       "period": "2026년 3분기",
       "change": "2분기 60,300",
       "src": 7
      },
      {
       "label": "4분기 현물 확보 운임(확보율)",
       "value": "약 172,300(53%)",
       "unit": "달러/일",
       "period": "2026년 4분기(콜 시점)",
       "change": "",
       "src": 7
      },
      {
       "label": "4분기 VLCC 확보 운임(확보율)",
       "value": "약 471,600(60%)",
       "unit": "달러/일",
       "period": "2026년 4분기(콜 시점)",
       "change": "",
       "src": 7
      },
      {
       "label": "4분기 수에즈막스 확보 운임(확보율)",
       "value": "약 300,200(47%)",
       "unit": "달러/일",
       "period": "2026년 4분기(콜 시점)",
       "change": "",
       "src": 7
      },
      {
       "label": "TCE 수익",
       "value": "443",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 7
      },
      {
       "label": "해운 매출",
       "value": "483.2",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +146%(196.4)",
       "src": 1
      },
      {
       "label": "순이익",
       "value": "344.2",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 70.5",
       "src": 1
      },
      {
       "label": "희석 EPS",
       "value": "6.90",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "전년 1.42",
       "src": 1
      },
      {
       "label": "조정 EBITDA",
       "value": "345",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "분기 배당(선언)",
       "value": "5.05",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "2분기와 동일",
       "src": 5
      },
      {
       "label": "장기부채",
       "value": "700.0",
       "unit": "백만 달러",
       "period": "2026-09-30",
       "change": "2025년 말 567.1",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "10월 16일 예비 공시 때는 4분기 현물 일수의 약 37%를 약 180,000달러/일에 확보했다고 밝혔으며, 추가 계약에 따라 수치가 바뀔 수 있다고 했다.",
       "src": [
        6,
        7,
        8
       ]
      }
     ],
     "read_through": {
      "text": "4분기 VLCC 확보 운임은 471,600달러/일로 3분기 실적 154,600달러/일의 3.1배다. 정제유선(LR1·MR) 현물 TCE는 3분기에 2분기 대비 35~41% 낮아졌다.",
      "desk": "oil"
     },
     "sources": [
      {
       "id": 1,
       "title": "International Seaways Form 10-Q(2026-09-30) XBRL company facts",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-05",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001679049.json"
      },
      {
       "id": 2,
       "title": "International Seaways 공시 목록 (8-K 항목 2.02·7.01, 2026-11-05 제출)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-07",
       "url": "https://data.sec.gov/submissions/CIK0001679049.json"
      },
      {
       "id": 3,
       "title": "INSW quoteSummary (EPS 실적·컨센서스, 배당)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/v10/finance/quoteSummary/INSW?modules=calendarEvents,earnings,earningsHistory,earningsTrend,summaryDetail,defaultKeyStatistics"
      },
      {
       "id": 4,
       "title": "INSW fundamentals timeseries (2분기 순이익)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/INSW?type=quarterlyNetIncome,quarterlyDilutedEPS,quarterlyEBITDA,quarterlyOperatingCashFlow,quarterlyGainOnSaleOfPPE,quarterlyCashAndCashEquivalents,quarterlyTotalDebt,quarterlyNetPPE,quarterlyCapitalExpenditure,quarterlyRepurchaseOfCapitalStock,quarterlyCashDividendsPaid"
      },
      {
       "id": 5,
       "title": "International Seaways Reports Third Quarter 2026 Results (Form 8-K Ex.99.1)",
       "publisher": "International Seaways / SEC EDGAR",
       "date": "2026-11-05",
       "url": "https://www.sec.gov/Archives/edgar/data/0001679049/000110465926123058/tm2629068d1_ex99-1.htm"
      },
      {
       "id": 6,
       "title": "Intl Seaways (INSW) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-11-05",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/11/05/intl-seaways-insw-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 7,
       "title": "International Seaways Posts Record Q3 Profit as Q4 Fixtures Reach $172,300 a Day (실적 프레젠테이션 요약)",
       "publisher": "TradingKey",
       "date": "2026-11-05",
       "url": "https://www.tradingkey.com/news/presentation/262286580-"
      },
      {
       "id": 8,
       "title": "International Seaways Form 8-K Ex.99.1 (4분기 예비 운임, Bruton Limited 인수)",
       "publisher": "International Seaways / SEC EDGAR",
       "date": "2026-10-16",
       "url": "https://www.sec.gov/Archives/edgar/data/0001679049/000110465926116371/tm2627713d1_ex99-1.htm"
      }
     ]
    }
   ]
  },
  {
   "id": "lng",
   "title": "LNG 액화·수송",
   "position": "LNG 액화·재기화·해상수송은 미국·호주 가스전과 유럽·아시아 수입국 사이의 중류 단계다.",
   "summary": [
    "미국 액화 공급은 3분기에도 늘었다. 셰니어는 Corpus Christi Stage 3 완공으로 분기 최대인 188카고·684TBtu를 수출했고(셰니어 1, 4), 벤처 글로벌은 2026년 500~518카고 수출을 제시했다(벤처 글로벌 1).",
    "공급 증가에도 가격은 높다. 우드사이드 보고서 가격 표의 3분기(산정 기간 미확인) JKM은 18.9달러/MMBtu, TTF는 18.0달러/MMBtu였고(우드사이드 1), 셰니어는 호르무즈 통항 제약에 따른 공급 손실로 3분기 세계 LNG 수출 누적 증가분이 마이너스로 돌아섰다고 밝혔다(셰니어 3, 8).",
    "QatarEnergy는 셰니어에서 2031~2054년 연 4백만 톤을 Henry Hub 연동 FOB 조건으로 사기로 했다(셰니어 6, 7). 유럽 겨울 수급은 빠듯하다. 셰니어는 10월 초 유럽 재고 약 72%(2011년 이후 최저)와 이번 겨울 유럽 LNG 수요 약 69백만 톤(지난겨울 대비 +7%)을 제시했다(셰니어 3, 9).",
    "미국 수출 마진 전망은 상향 중이다. 셰니어는 2026년 연결 조정 EBITDA 가이던스를 87.5억~92.5억 달러로 올해 세 번째 올렸고(셰니어 1), 벤처 글로벌은 미판매 카고 액화 마진을 12.50~13.50달러/MMBtu로 가정했다(벤처 글로벌 1).",
    "다음 공급 증분은 4분기 우드사이드 Scarborough 첫 카고(공정률 99%)와 벤처 글로벌 Plaquemines 1단계 상업운전, 2027년 2분기 넥스트디케이드 Rio Grande Train 1 첫 LNG(Train 1~5 허가 용량 30.15백만 톤/년), 2027년 하반기 CP2 첫 LNG다(우드사이드 1; 벤처 글로벌 1; 넥스트디케이드 3).",
    "LNG 운반선 현물 운임이 반등하고 있다. LNG Prime 등이 보도한 Spark 기준 대서양 운임은 9월 18일 25,250달러/일에서 10월 말 28,000달러/일로, 태평양은 10월 말 44,500달러/일로 올랐고 11월 6일 주간까지 두 해역 모두 3주 연속 상승했다(플렉스 LNG 7, 9, 8)."
   ],
   "open_items": [
    "회사 IR·보도자료 원문은 직접 확인하지 못했고, 수치는 발췌문과 SEC XBRL로 확인했다.",
    "11월 6일 주간 Spark 운임 수준(대서양·태평양 일일 운임)은 유료 기사라 확인하지 못했고, 10월 말 대서양 28,000달러/일·태평양 44,500달러/일 수치는 Spark 애널리스트 인용 재게재 기사로 정확한 게시일이 미확인이다.",
    "플렉스 LNG 콜 요약 1건의 '3분기 현물 운임 약 30,000달러/일, 전년 같은 분기 약 120,000달러/일' 언급은 다른 운임 자료와 맞지 않아 싣지 않았다. 플렉스 3분기 TCE·실적은 11월 11일 발표 전이라 없다.",
    "넥스트디케이드 Train 4·5 공정률과 Train 1·2 관련 '68.8%' 수치의 정의는 확인하지 못했다. 콜 요약 1건의 '미계약 램프업 물량 마진 6달러/MMBtu 이상, 회사 몫 프로젝트 DCF 24억 달러 이상(기준 20억 달러)' 발언과 Train 6 계약 비율 목표(75% 초과, 90% 미만)는 단일 출처라 싣지 않았다.",
    "엑셀러레이트 매출의 전분기(3.29억→2.97억 달러)·전년 대비 감소 원인(가스 판매 물량·가격)은 확인하지 못했고, 전년 대비 이익 증가 일부를 Atlantic Basin 계약 인도 시점이 상쇄했다는 설명만 확인했다. 매출 컨센서스(3.72억 달러 추정) 미달 보도는 출처의 게시일을 확인하지 못해 싣지 않았다.",
    "골라 2분기 순이익은 지배주주 기준 0.38억 달러(보도자료)와 비지배지분 포함 0.56억 달러(콜)로 기준이 다르고, Investing.com의 1.56억 달러는 오기로 보여 싣지 않았다. Hilli 원자재 연동 이익 0.37억 달러와 조정 EBITDA에 포함된 파생상품 실현이익 0.37억 달러가 같은 항목인지 확인하지 못했다. FLNG 설비별 2분기 카고 수와 MKII 진척률은 미확인이다.",
    "벤처 글로벌이 2026-10-07(Item 2.02)·10-08(Item 7.01)·10-15(Item 1.01)에 제출한 8-K의 내용과 3분기 예비 수치 공개 여부는 확인하지 못했다. Plaquemines·CP2 확장 FID 목표 시점은 요약 자료에서 확인했으나 해당 문구가 실린 회사 문서는 찾지 못했다. 'Cloud Connector' 파이프라인·31백만 톤/년 확장 언급은 단일 요약 출처라 싣지 않았다.",
    "셰니어의 2026-11-03 8-K(Item 1.01·7.01) 내용은 미확인이다. SPL 확장 1단계 용량은 실적 발표문(8-K Ex.99.1) 기준 6백만 톤/년 이상(Train 7)이다. 조정 EPS는 Zacks 3.62달러와 Investing.com 5.65달러로 엇갈려 GAAP 희석 EPS(5.65달러, 10-Q XBRL)만 실었다.",
    "콜 요약 기사 1건은 2026년 잔여 기간 미국 LNG 넷백이 8월 10달러/MMBtu대에서 콜 시점 20달러/MMBtu대로 올랐다고 전했으나 다른 출처로 확인하지 못해 싣지 않았다.",
    "QatarEnergy 계약 인도 개시 시점은 QatarEnergy 발표 기준 2031년, 셰니어 자료 기준 2030년대 초로 표현이 다르다.",
    "우드사이드 CEO의 '계약 가격 시차로 강한 가격이 몇 달 더 이어질 수 있다' 발언은 출처 기사 시점(2분기 보고서일 가능성)이 불분명해 싣지 않았다. 2026년 설비투자 가이던스(40억~45억 달러)의 Louisiana LNG 포함 여부와 2026-11-05 제출 6-K 2건의 내용은 미확인이다.",
    "게시일을 확인하지 못한 출처는 날짜를 적지 않았다(벤처 글로벌 8, 플렉스 LNG 6·9, 골라 LNG 8)."
   ],
   "companies": [
    {
     "name_kr": "셰니어 에너지",
     "name_en": "Cheniere Energy, Inc.",
     "ticker": "LNG",
     "yahoo": "LNG",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 3570,
     "role_kr": "Sabine Pass(루이지애나)·Corpus Christi(텍사스)에서 약 56백만 톤/년 액화 설비를 운영하고 약 5백만 톤/년을 추가 건설 중인 미국 LNG 수출사다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-29",
     "status": "reported",
     "highlights": [
      {
       "text": "Corpus Christi Stage 3 완공 효과로 3분기 수출이 분기 최대인 188카고·684TBtu를 기록했다. 전년 동기 163카고 대비 카고 수는 15%, 물량은 17% 늘었고, 7번째 마지막 트레인이 8월 말 일정보다 앞서 예산 내에서 실질 완공돼 Stage 3로 생산능력이 20% 넘게 늘었다.",
       "src": [
        1,
        3,
        4
       ]
      },
      {
       "text": "매출은 61.73억 달러로 전년 대비 39%, 지배주주 순이익은 11.70억 달러로 12% 늘었다. 희석 EPS는 5.65달러(전년 4.75달러)다.",
       "src": [
        2,
        1
       ]
      },
      {
       "text": "연결 조정 EBITDA는 약 19억 달러로 전년 대비 약 18% 늘었으나 DCF는 현금 회수 시점과 운전자본 영향으로 약 12.3억 달러(전년 16.1억 달러)로 줄었다.",
       "src": [
        1
       ]
      },
      {
       "text": "감가상각 제외 매출원가는 32.07억 달러로 전년 동기 17.50억 달러보다 83% 늘어 매출 증가율 39%를 웃돌았다.",
       "src": [
        2
       ]
      },
      {
       "text": "3분기 자본배분 약 15억 달러 가운데 자사주 약 280만 주를 7.31억 달러(평균 260.52달러)에 사들였고, 분기 배당을 12% 넘게 올려 주당 0.625달러로 정했다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "QatarEnergy는 2054년까지 연 4백만 톤(SPL·CCL 각 2백만 톤)을 Henry Hub 연동+고정 수수료 FOB 조건으로 사는 계약을 맺었다. 인도는 2031년 개시 예정이고 이 중 1백만 톤은 SPL 확장 1단계 FID가 조건이다. 회사는 콜에서 Petrobras 계약을 포함한 신규 장기계약이 합계 약 5백만 톤/년이라고 밝혔다.",
       "src": [
        6,
        7,
        1,
        3,
        9
       ]
      },
      {
       "text": "경영진은 호르무즈 해협 통항 제약에 따른 공급 손실이 다른 지역 증가분을 웃돌아 3분기 세계 LNG 수출 누적 증가분이 마이너스로 돌아섰다고 밝혔다. 유럽 재고는 10월 초 약 72%로 2011년 이후 같은 시점 최저다.",
       "src": [
        3,
        8,
        9
       ]
      },
      {
       "text": "회사는 유럽이 재고 28%로 겨울을 마친다고 가정하면 약 69백만 톤의 LNG가 필요하고 이는 지난겨울보다 약 7% 많다고 추산했다.",
       "src": [
        3,
        9
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "6,173",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +39%",
       "src": 2
      },
      {
       "label": "지배주주 순이익",
       "value": "1,170",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +12%",
       "src": 2
      },
      {
       "label": "희석 EPS",
       "value": "5.65",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 4.75달러",
       "src": 2
      },
      {
       "label": "연결 조정 EBITDA",
       "value": "약 1.9",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 약 +18%",
       "src": 1
      },
      {
       "label": "분배가능현금흐름(DCF)",
       "value": "약 1.23",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 1.61십억 달러",
       "src": 1
      },
      {
       "label": "LNG 수출 카고",
       "value": "188",
       "unit": "카고",
       "period": "2026년 3분기",
       "change": "전년 163카고",
       "src": 1
      },
      {
       "label": "LNG 수출 물량",
       "value": "684",
       "unit": "TBtu",
       "period": "2026년 3분기",
       "change": "전년 대비 +17%",
       "src": 4
      },
      {
       "label": "손익 인식 LNG 물량",
       "value": "697",
       "unit": "TBtu",
       "period": "2026년 3분기",
       "change": "분기 최대",
       "src": 4
      },
      {
       "label": "자사주 매입",
       "value": "731",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "약 280만 주",
       "src": 1
      },
      {
       "label": "분기 배당",
       "value": "0.625",
       "unit": "달러/주",
       "period": "2026년 3분기 실적 발표 시 결의",
       "change": "12% 이상 인상",
       "src": 1
      },
      {
       "label": "매출원가(감가상각 제외)",
       "value": "3,207",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +83%",
       "src": 2
      },
      {
       "label": "지배주주 순이익(누적)",
       "value": "736",
       "unit": "백만 달러",
       "period": "2026년 1~9월",
       "change": "전년 동기 3,028백만 달러",
       "src": 2
      },
      {
       "label": "총차입금",
       "value": "24,138",
       "unit": "백만 달러",
       "period": "2026년 9월 말",
       "change": "",
       "src": 2
      },
      {
       "label": "잔여 자사주 매입 한도",
       "value": "8,400",
       "unit": "백만 달러",
       "period": "2026년 9월 말",
       "change": "",
       "src": 2
      },
      {
       "label": "운영 액화 용량",
       "value": "약 56",
       "unit": "백만 톤/년",
       "period": "2026년 10월",
       "change": "건설 중 약 5백만 톤/년",
       "src": 6
      }
     ],
     "guidance": [
      {
       "text": "2026년 연결 조정 EBITDA 가이던스를 87.5억~92.5억 달러(종전 79억~84억 달러), DCF를 60.5억~65.5억 달러(종전 53억~58억 달러)로 올렸고 올해 세 번째 상향이다.",
       "src": [
        1,
        8
       ]
      },
      {
       "text": "2026년 생산 가이던스는 53~54백만 톤으로 유지했고, 2027년 생산은 56~58백만 톤, 장기계약 물량은 약 52백만 톤(2026년 46~47백만 톤)으로 제시했다.",
       "src": [
        3
       ]
      },
      {
       "text": "SPL 확장 1단계(Train 7, 6백만 톤/년 이상)는 2026년 9월 FERC 최종 EIS를 받았고 2026년 말 인가 후 2026년 말~2027년 초 FID가 목표이며, 1단계 비용의 약 50%인 32.5억 달러 지연인출 담보 텀론 약정을 확보했다.",
       "src": [
        5
       ]
      },
      {
       "text": "CCL 확장은 2026년 9월 FERC 초안 EIS를 받아 2027년~2028년 초 FID가 목표이고, Corpus Christi Midscale 8·9 트레인은 건설 중이다.",
       "src": [
        5
       ]
      }
     ],
     "read_through": {
      "text": "QatarEnergy가 2031~2054년 연 4백만 톤의 미국산 FOB 물량을 확보했다. 셰니어는 유럽 재고 약 72%(2011년 이후 최저)와 겨울 수요 약 69백만 톤 추정을 근거로 2026/27년 겨울 카고 경합과 가격 상방 위험을 제시했다.",
      "desk": "gas"
     },
     "sources": [
      {
       "id": 1,
       "title": "Cheniere Reports Third Quarter 2026 Results, Raises Full Year 2026 Financial Guidance, and Increases Quarterly Dividend by Over 12%",
       "publisher": "Cheniere Energy (SEC 8-K Ex.99.1)",
       "date": "2026-10-29",
       "url": "https://www.sec.gov/Archives/edgar/data/0000003570/000000357026000040/cei20263rdqtrerex991.htm"
      },
      {
       "id": 2,
       "title": "Cheniere Energy, Inc. Form 10-Q (quarter ended 2026-09-30) XBRL company facts",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-10-29",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0000003570.json"
      },
      {
       "id": 3,
       "title": "Cheniere (LNG) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-29",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/29/cheniere-lng-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 4,
       "title": "Cheniere Q3 2026 slides: record volumes drive guidance raise",
       "publisher": "Investing.com",
       "date": "2026-10-29",
       "url": "https://www.investing.com/news/company-news/cheniere-q3-2026-slides-record-volumes-drive-guidance-raise-93CH-4989478"
      },
      {
       "id": 5,
       "title": "Cheniere Energy, Inc. Third Quarter 2026 (earnings presentation)",
       "publisher": "Cheniere Energy",
       "date": "2026-10-29",
       "url": "https://lngir.cheniere.com/_assets/_ce01cff7721d1599c1832dacee3b6fd9/cheniere/db/804/7576/presentation/10_29_2026_3Q_2026_Earnings_Presentation_vF.pdf"
      },
      {
       "id": 6,
       "title": "Cheniere Signs Long-Term Sale and Purchase Agreements to Supply QatarEnergy with LNG through 2054",
       "publisher": "Cheniere Energy (Business Wire)",
       "date": "2026-10-22",
       "url": "https://www.morningstar.com/news/business-wire/20261021078986/cheniere-signs-long-term-sale-and-purchase-agreements-to-supply-qatarenergy-with-lng-through-2054"
      },
      {
       "id": 7,
       "title": "QatarEnergy Signs Long-Term Agreements to Purchase 4 MTPA of U.S. LNG",
       "publisher": "Qatar News Agency",
       "date": "2026-10-22",
       "url": "https://qna.org.qa/en/news/news-details?id=qatarenergy-signs-long-term-agreements-to-purchase-4-mtpa-of-us-lng&date=22%2F10%2F2026"
      },
      {
       "id": 8,
       "title": "Earnings call transcript: Cheniere Energy tops Q3 2026 estimates, lifts outlook",
       "publisher": "Investing.com",
       "date": "2026-10-29",
       "url": "https://www.investing.com/news/transcripts/earnings-call-transcript-cheniere-energy-tops-q3-2026-estimates-lifts-outlook-93CH-4989455"
      },
      {
       "id": 9,
       "title": "What Cheniere Energy (LNG) Said on Its Q3 Earnings Call",
       "publisher": "MarketBeat",
       "date": "2026-10-30",
       "url": "https://www.marketbeat.com/instant-alerts/transcript-what-cheniere-energy-lng-said-on-its-q3-earnings-call-2026-10-30/"
      },
      {
       "id": 10,
       "title": "Cheniere Energy, Inc. EDGAR filing index (8-K Item 2.02 and 10-Q filed 2026-10-29)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-07",
       "url": "https://data.sec.gov/submissions/CIK0000003570.json"
      }
     ]
    },
    {
     "name_kr": "벤처 글로벌",
     "name_en": "Venture Global, Inc.",
     "ticker": "VG",
     "yahoo": "VG",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 2007855,
     "role_kr": "루이지애나에서 Calcasieu Pass·Plaquemines LNG를 가동하고 CP2 LNG를 건설 중인 미국 LNG 수출사다.",
     "period": "2026년 2분기(3분기 실적은 2026-11-10 장 개시 전 발표 예정)",
     "period_end": "2026-06-30",
     "report_date": "2026-08-11",
     "status": "not_yet",
     "highlights": [
      {
       "text": "Plaquemines 물량 증가로 2분기 수출이 127카고, 판매량이 466.4TBtu로 전년 동기 대비 38카고, 137.2TBtu(+42%) 늘었다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "시운전 판매 카고의 높은 액화 마진이 이익을 키웠다. 매출은 45.78억 달러(+48%), 연결 조정 EBITDA는 25억 달러(+79%), 지배주주 순이익은 13.47억 달러(전년 3.68억 달러)이며 희석 EPS는 0.51달러(전년 0.14달러)다.",
       "src": [
        1,
        3,
        4
       ]
      },
      {
       "text": "2026년 연결 조정 EBITDA 가이던스를 87억~91억 달러(종전 82억~85억 달러)로 올렸고, 남은 미판매 카고의 가중평균 액화 마진을 12.50~13.50달러/MMBtu로 가정했다.",
       "src": [
        1
       ]
      },
      {
       "text": "2026년 포트폴리오 계약 비율은 91%로 1분기 84%에서 올랐다. CEO는 중동 사태에 따른 LNG 가격 급변 탓에 가이던스 범위를 평소보다 넓게 유지했다고 밝혔다.",
       "src": [
        5
       ]
      },
      {
       "text": "2026년 상반기 Plaquemines 가중평균 LNG 판매가격은 10.34달러/MMBtu로 전년 동기 11.22달러보다 0.88달러 낮다.",
       "src": [
        6
       ]
      },
      {
       "text": "CP2는 1단계 FID 1년 만에 액화 모듈 16기가 현장에 도착했고 1단계 첫 LNG는 2027년 하반기 목표다. 2단계는 2026년 3월 13일 86억 달러 금융 조달과 함께 FID해 CP2 누적 조달액이 207억 달러다.",
       "src": [
        5,
        1,
        7
       ]
      },
      {
       "text": "상반기 설비투자 현금지출은 69억 달러다. 53억 달러 규모를 차환했고 Calcasieu Pass Funding에서 17.5억 달러 담보 텀론 B를 조달했다.",
       "src": [
        3,
        1
       ]
      },
      {
       "text": "3분기 배당을 주당 0.04달러(2분기 결의 0.018달러)로 올렸다.",
       "src": [
        1,
        3
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "4,578",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "전년 대비 +48%",
       "src": 3
      },
      {
       "label": "연결 조정 EBITDA",
       "value": "2.5",
       "unit": "십억 달러",
       "period": "2026년 2분기",
       "change": "전년 대비 +79%",
       "src": 1
      },
      {
       "label": "지배주주 순이익",
       "value": "1,347",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "전년 368백만 달러",
       "src": 3
      },
      {
       "label": "희석 EPS",
       "value": "0.51",
       "unit": "달러",
       "period": "2026년 2분기",
       "change": "전년 0.14달러",
       "src": 3
      },
      {
       "label": "영업이익",
       "value": "2,188",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "전년 대비 +111%",
       "src": 3
      },
      {
       "label": "LNG 수출 카고",
       "value": "127",
       "unit": "카고",
       "period": "2026년 2분기",
       "change": "전년 대비 +38카고",
       "src": 1
      },
      {
       "label": "LNG 판매량",
       "value": "466.4",
       "unit": "TBtu",
       "period": "2026년 2분기",
       "change": "전년 대비 +42%",
       "src": 1
      },
      {
       "label": "2026년 포트폴리오 계약 비율",
       "value": "91",
       "unit": "%",
       "period": "2026년 2분기 발표",
       "change": "1분기 84%",
       "src": 5
      },
      {
       "label": "Plaquemines 가중평균 LNG 판매가격",
       "value": "10.34",
       "unit": "달러/MMBtu",
       "period": "2026년 1~6월",
       "change": "전년 동기 11.22달러",
       "src": 6
      },
      {
       "label": "설비투자 현금지출",
       "value": "6,900",
       "unit": "백만 달러",
       "period": "2026년 1~6월",
       "change": "",
       "src": 3
      },
      {
       "label": "장기차입금",
       "value": "41,814",
       "unit": "백만 달러",
       "period": "2026년 6월 말",
       "change": "",
       "src": 3
      }
     ],
     "guidance": [
      {
       "text": "2026년 연결 조정 EBITDA 가이던스는 87억~91억 달러이고, 미판매 카고 가중평균 액화 마진 가정은 12.50~13.50달러/MMBtu다(2분기 발표 기준).",
       "src": [
        1
       ]
      },
      {
       "text": "2026년 수출 가이던스는 500~518카고(종전 494~523카고)로, Calcasieu Pass 149~154카고와 Plaquemines 351~364카고다.",
       "src": [
        1,
        6
       ]
      },
      {
       "text": "Plaquemines 1단계 상업운전(COD)은 2026년 4분기, 2단계는 2027년 중반이 목표이며 시운전·성능 시험과 보완 작업 완료가 전제다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "CP2 1단계 첫 LNG는 2027년 하반기 목표다.",
       "src": [
        1
       ]
      },
      {
       "text": "2026년 회사 발표 자료 기준 Plaquemines 확장 FID는 2027년 상반기, CP2 확장 FID는 2027년 초(첫 생산 2028년 말)가 목표이며 인허가가 전제다.",
       "src": [
        2,
        7
       ]
      },
      {
       "text": "3분기 실적은 2026년 11월 10일 장 개시 전 발표하고 같은 날 오전 9시(미 동부) 컨퍼런스콜을 연다.",
       "src": [
        8
       ]
      }
     ],
     "read_through": {
      "text": "2026년 수출 전망은 500~518카고이고 이 중 Plaquemines가 351~364카고다. 회사는 미판매 카고 액화 마진을 12.50~13.50달러/MMBtu로 가정했다.",
      "desk": "gas"
     },
     "sources": [
      {
       "id": 1,
       "title": "Venture Global Reports Second Quarter 2026 Results",
       "publisher": "Venture Global (Business Wire)",
       "date": "2026-08-11",
       "url": "https://www.businesswire.com/news/home/20260811465911/en/Venture-Global-Reports-Second-Quarter-2026-Results"
      },
      {
       "id": 2,
       "title": "Venture Global, Inc. Form 8-K Ex.99 – Second Quarter 2026 earnings release",
       "publisher": "SEC EDGAR",
       "date": "2026-08-11",
       "url": "https://www.sec.gov/Archives/edgar/data/0002007855/000200785526000063/vgincq22026earningsrelease.htm"
      },
      {
       "id": 3,
       "title": "Venture Global, Inc. Form 10-Q (quarter ended 2026-06-30) XBRL company facts",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-08-11",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0002007855.json"
      },
      {
       "id": 4,
       "title": "Venture Global Q2 Earnings Call Highlights",
       "publisher": "MarketBeat",
       "date": "2026-08-11",
       "url": "https://www.marketbeat.com/instant-alerts/venture-global-q2-earnings-call-highlights-2026-08-11/"
      },
      {
       "id": 5,
       "title": "Venture Global (VG) Q2 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-08-18",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/08/18/venture-global-vg-q2-2026-earnings-call-transcript/"
      },
      {
       "id": 6,
       "title": "Venture Global, Inc. Form 10-Q for the quarter ended June 30, 2026",
       "publisher": "SEC EDGAR",
       "date": "2026-08-11",
       "url": "https://www.sec.gov/Archives/edgar/data/0002007855/000200785526000062/vg-20260630.htm"
      },
      {
       "id": 7,
       "title": "Venture Global Announces Final Investment Decision and Financial Close for Phase 2 of CP2 LNG",
       "publisher": "Venture Global",
       "date": "2026-03-13",
       "url": "https://investors.ventureglobal.com/news/news-details/2026/Venture-Global-Announces-Final-Investment-Decision-and-Financial-Close-for-Phase-2-of-CP2-LNG/default.aspx"
      },
      {
       "id": 8,
       "title": "CORRECTING and REPLACING Venture Global, Inc. Announces Timing of Third Quarter 2026 Earnings Release and Conference Call",
       "publisher": "Venture Global (Nasdaq press release)",
       "date": "",
       "url": "https://www.nasdaq.com/press-release/correcting-and-replacing-venture-global-inc-announces-timing-third-quarter-2026"
      },
      {
       "id": 9,
       "title": "Venture Global, Inc. EDGAR filing index (8-K filings 2026-10-07, 10-08, 10-15)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-07",
       "url": "https://data.sec.gov/submissions/CIK0002007855.json"
      }
     ]
    },
    {
     "name_kr": "우드사이드 에너지",
     "name_en": "Woodside Energy Group Ltd",
     "ticker": "WDS",
     "yahoo": "WDS.AX",
     "exchange": "ASX (NYSE ADS: WDS)",
     "country": "호주",
     "cik": null,
     "role_kr": "호주 North West Shelf·Pluto LNG를 운영하고 Scarborough와 미국 Louisiana LNG를 개발하는 LNG 생산사다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-21",
     "status": "reported",
     "highlights": [
      {
       "text": "Pluto LNG 정비가 끝나 3분기 생산량은 46.2MMboe(일 503천boe)로 전분기 대비 12% 늘었다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "생산 LNG 실현가격은 13.3달러/MMBtu로 2분기 10.5달러, 전년 동기 9.5달러보다 높았고 트레이딩 LNG는 16.6달러/MMBtu(2분기 15.2달러)였다.",
       "src": [
        1
       ]
      },
      {
       "text": "회사는 가격 상승 요인으로 2분기 가격의 시차 반영, LNG 포트폴리오 최적화, 북반구 겨울을 앞둔 허브 가격 강세를 들었다. 같은 보고서 가격 표의 3분기(산정 기간 미확인) JKM은 18.9달러/MMBtu, TTF는 18.0달러/MMBtu로 생산 LNG 실현가격보다 각각 5.6달러, 4.7달러 높았다.",
       "src": [
        1
       ]
      },
      {
       "text": "3분기 판매량은 51.1MMboe로 전분기 대비 6% 늘었으나 전년 동기 55.1MMboe보다 7% 적다. 영업수익은 42.81억 달러로 전분기 대비 2% 증가했다.",
       "src": [
        5,
        1
       ]
      },
      {
       "text": "Scarborough는 공정률 99%로 예산 내에 있다. 3분기 중 FPU에 가스를 투입해 트렁크라인으로 송출했고 첫 LNG 카고는 4분기 목표다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "Louisiana LNG는 공정률 32%(Train 1 41%)로 2029년 첫 LNG 목표를 유지했으나, 중동 차질에 따른 구조용 강재 공급 문제가 이어지고 있고 지분 참여·장기 판매 협의는 진행 중이다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "2026년 생산 가이던스는 Scarborough 첫 카고 시점 범위 축소 등을 반영해 174~181MMboe(종전 174~185MMboe)로 상단을 낮췄다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "생산량",
       "value": "46.2",
       "unit": "MMboe",
       "period": "2026년 3분기",
       "change": "전분기 대비 +12%",
       "src": 1
      },
      {
       "label": "일평균 생산량",
       "value": "503",
       "unit": "천boe/일",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "판매량",
       "value": "51,094",
       "unit": "천boe",
       "period": "2026년 3분기",
       "change": "전분기 대비 +6%, 전년 대비 -7%",
       "src": 5
      },
      {
       "label": "영업수익",
       "value": "4,281",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 대비 +2%",
       "src": 1
      },
      {
       "label": "생산 LNG 실현가격",
       "value": "13.3",
       "unit": "달러/MMBtu",
       "period": "2026년 3분기",
       "change": "전분기 10.5달러, 전년 9.5달러",
       "src": 1
      },
      {
       "label": "생산 LNG 실현가격(boe 환산)",
       "value": "84",
       "unit": "달러/boe",
       "period": "2026년 3분기",
       "change": "전분기 대비 +27%",
       "src": 1
      },
      {
       "label": "트레이딩 LNG 실현가격",
       "value": "16.6",
       "unit": "달러/MMBtu",
       "period": "2026년 3분기",
       "change": "전분기 15.2달러, 전년 11.2달러",
       "src": 1
      },
      {
       "label": "JKM(보고서 가격 표, 참고 지표)",
       "value": "18.9",
       "unit": "달러/MMBtu",
       "period": "2026년 3분기 · 산정 기간 미확인",
       "change": "",
       "src": 1
      },
      {
       "label": "TTF(보고서 가격 표, 참고 지표)",
       "value": "18.0",
       "unit": "달러/MMBtu",
       "period": "2026년 3분기 · 산정 기간 미확인",
       "change": "",
       "src": 1
      },
      {
       "label": "Scarborough 공정률",
       "value": "99",
       "unit": "%",
       "period": "2026년 9월 말",
       "change": "",
       "src": 1
      },
      {
       "label": "Louisiana LNG 공정률",
       "value": "32",
       "unit": "%",
       "period": "2026년 9월 말",
       "change": "Train 1 41%",
       "src": 1
      },
      {
       "label": "누적 판매량",
       "value": "150,854",
       "unit": "천boe",
       "period": "2026년 1~9월",
       "change": "전년 동기 대비 -6%",
       "src": 5
      }
     ],
     "guidance": [
      {
       "text": "2026년 생산 가이던스는 174~181MMboe(종전 174~185MMboe)다.",
       "src": [
        1
       ]
      },
      {
       "text": "Scarborough 첫 LNG 카고는 2026년 4분기 목표다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "Louisiana LNG는 3개 트레인을 동시에 건설 중이며 첫 LNG는 2029년 목표다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "2026년 설비투자 가이던스 40억~45억 달러(현 지분 기준)를 유지했다(요약 자료 기준, Louisiana LNG 포함 범위는 미확인).",
       "src": [
        5,
        2
       ]
      }
     ],
     "read_through": {
      "text": "호주발 신규 공급은 4분기 Scarborough 첫 카고부터 늘어난다. 보고서 가격 표의 3분기(산정 기간 미확인) JKM 18.9달러·TTF 18.0달러와 생산 LNG 실현가격 13.3달러의 격차, 회사가 밝힌 계약 가격 시차 효과를 감안하면 4분기 실현가격은 추가로 오를 가능성이 있다.",
      "desk": "gas"
     },
     "sources": [
      {
       "id": 1,
       "title": "Third Quarter Report for Period Ended 30 September 2026",
       "publisher": "Woodside Energy",
       "date": "2026-10-21",
       "url": "https://www.woodside.com/docs/default-source/investor-documents/quarterly-and-half-yearly-pdfs-and-data-tables/2026/third-quarter-2026-report.pdf?sfvrsn=bc7738f4_1"
      },
      {
       "id": 2,
       "title": "Woodside Energy Group Ltd Form 6-K Ex.99.1 (Third Quarter 2026 Report)",
       "publisher": "SEC EDGAR",
       "date": "2026-10-21",
       "url": "https://www.sec.gov/Archives/edgar/data/0000844551/000119312526427148/d166690dex991.htm"
      },
      {
       "id": 3,
       "title": "Woodside Posts Higher Quarterly Revenue",
       "publisher": "Rigzone",
       "date": "2026-10-21",
       "url": "https://www.rigzone.com/news/woodside_posts_higher_quarterly_revenue-21-oct-2026-184893-article"
      },
      {
       "id": 4,
       "title": "Woodside's Scarborough hits 99% complete, first LNG on track for Q4",
       "publisher": "World Oil",
       "date": "2026-10-21",
       "url": "https://www.worldoil.com/news/2026/10/21/woodside-s-scarborough-hits-99-complete-first-lng-on-track-for-q4/"
      },
      {
       "id": 5,
       "title": "Third Quarter 2026 Report - Woodside Energy Group Ltd (ASX:WDS)",
       "publisher": "Listcorp",
       "date": "2026-10-21",
       "url": "https://www.listcorp.com/asx/wds/woodside-energy-group/news/third-quarter-2026-report-3424953.html"
      }
     ]
    },
    {
     "name_kr": "넥스트디케이드",
     "name_en": "NextDecade Corporation",
     "ticker": "NEXT",
     "yahoo": "NEXT",
     "exchange": "Nasdaq",
     "country": "미국",
     "cik": 1612720,
     "role_kr": "텍사스 브라운스빌에서 Rio Grande LNG(Train 1~5 허가 용량 30.15백만 톤/년)를 건설 중인 개발사다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-29",
     "status": "reported",
     "highlights": [
      {
       "text": "Rio Grande 1단계는 일정보다 앞서 예산 내에서 진행 중이다. Train 1 첫 LNG 시점을 2027년 2분기로 좁혔고(종전 2027년 상반기), Train 1 실질 완공은 Bechtel EPC 보증 일정보다 한 분기 이른 2027년 3분기가 목표다.",
       "src": [
        3,
        5
       ]
      },
      {
       "text": "9월 말 공정률은 Train 1·2가 79.7%, Train 3가 55.2%다. Train 2 주 극저온 열교환기 설치를 마쳤고 Train 4·5도 건설 중이다.",
       "src": [
        3
       ]
      },
      {
       "text": "3분기 Bay Runner 파이프라인이 가동에 들어갔고 가스 인입 설비가 시운전 준비(ready for start-up)를 마쳤다. 첫 가스 투입은 2026년 말 이전으로 예정돼 있다.",
       "src": [
        3
       ]
      },
      {
       "text": "FERC는 2026년 9월 증설(uprate) 신청을 승인해 Train 1~5의 허가 액화 용량을 30.15백만 톤/년으로 올렸다.",
       "src": [
        3
       ]
      },
      {
       "text": "1~9월 설비투자 현금지출은 33.48억 달러로 전년 동기 28.59억 달러보다 17% 많고, 유형자산은 9월 말 144.39억 달러로 2025년 말 105.68억 달러에서 38.70억 달러 증가했다.",
       "src": [
        1
       ]
      },
      {
       "text": "1단계 은행 차입 70억 달러 이상을 선순위 담보채로 차환해 만기를 늘리고 Train 6용 은행 한도를 확보했다. 차입금 장부가는 112.99억 달러(2025년 말 대비 +28%), 3분기 차입금 조기상환손실은 1.37억 달러다.",
       "src": [
        4,
        5,
        1
       ]
      },
      {
       "text": "3분기에는 매출 0달러, 영업손실 0.83억 달러에 파생상품 이익 8.51억 달러가 더해져 지배주주 순이익 1.55억 달러(희석 EPS 0.54달러)를 냈다. 전년 동기에는 순손실 1.09억 달러였다.",
       "src": [
        1
       ]
      },
      {
       "text": "회사는 Train 6 용량의 상당 부분을 장기 SPA로 채울 계획이며 앞으로 수개월 안에 SPA 발표가 이어질 수 있다고 밝혔다.",
       "src": [
        4,
        5
       ]
      }
     ],
     "metrics": [
      {
       "label": "Train 1·2 공정률",
       "value": "79.7",
       "unit": "%",
       "period": "2026년 9월",
       "change": "",
       "src": 3
      },
      {
       "label": "Train 3 공정률",
       "value": "55.2",
       "unit": "%",
       "period": "2026년 9월",
       "change": "",
       "src": 3
      },
      {
       "label": "허가 액화 용량(Train 1~5)",
       "value": "30.15",
       "unit": "백만 톤/년",
       "period": "2026년 9월 FERC 승인",
       "change": "증설 승인",
       "src": 3
      },
      {
       "label": "1단계 은행 차입 차환",
       "value": "7 이상",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "선순위 담보채로 전환",
       "src": 4
      },
      {
       "label": "매출",
       "value": "0",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 0",
       "src": 1
      },
      {
       "label": "지배주주 순이익",
       "value": "155.4",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 -109.5백만 달러",
       "src": 1
      },
      {
       "label": "희석 EPS",
       "value": "0.54",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 -0.42달러",
       "src": 1
      },
      {
       "label": "파생상품 손익",
       "value": "851.2",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 -74.1백만 달러",
       "src": 1
      },
      {
       "label": "영업손익",
       "value": "-82.9",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "설비투자 현금지출",
       "value": "3,348",
       "unit": "백만 달러",
       "period": "2026년 1~9월",
       "change": "전년 동기 대비 +17%",
       "src": 1
      },
      {
       "label": "유형자산(순)",
       "value": "14,439",
       "unit": "백만 달러",
       "period": "2026년 9월 말",
       "change": "2025년 말 대비 +37%",
       "src": 1
      },
      {
       "label": "차입금 장부가",
       "value": "11,299",
       "unit": "백만 달러",
       "period": "2026년 9월 말",
       "change": "2025년 말 대비 +28%",
       "src": 1
      },
      {
       "label": "현금·제한현금",
       "value": "592.1",
       "unit": "백만 달러",
       "period": "2026년 9월 말",
       "change": "",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "Train 1 첫 LNG는 2027년 2분기, 실질 완공은 2027년 3분기가 목표다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "Rio Grande 설비 첫 가스 투입은 2026년 말 이전으로 예정돼 있다.",
       "src": [
        3
       ]
      },
      {
       "text": "Train 6(추가 선석 포함)은 2026년 5월 FERC에 신청했고, 2027년 6월 예정인 최종 EIS를 거쳐 2027년 하반기 FID가 목표다.",
       "src": [
        3,
        4,
        5
       ]
      },
      {
       "text": "Train 5 상업 인도 개시 이후 회사 차원 차입금을 약 20억~22.5억 달러로 관리하는 것이 목표다.",
       "src": [
        4,
        5
       ]
      }
     ],
     "read_through": {
      "text": "Rio Grande 첫 LNG는 2027년 2분기 목표다. Train 1~5 허가 용량은 30.15백만 톤/년이고 첫 가스 투입은 2026년 말 이전으로 예정돼 있다. 물량은 2027~2028년 미국 수출 증가분에 들어가고 2026년 기여는 없다.",
      "desk": "gas"
     },
     "sources": [
      {
       "id": 1,
       "title": "NextDecade Corp Form 10-Q (quarter ended 2026-09-30) XBRL company facts",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-10-29",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001612720.json"
      },
      {
       "id": 2,
       "title": "NextDecade Corp EDGAR filing index (10-Q filed 2026-10-29)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-07",
       "url": "https://data.sec.gov/submissions/CIK0001612720.json"
      },
      {
       "id": 3,
       "title": "NextDecade Provides Third Quarter 2026 Business Update",
       "publisher": "NextDecade",
       "date": "2026-10-29",
       "url": "https://www.investors.next-decade.com/news-releases/news-release-details/nextdecade-provides-third-quarter-2026-business-update"
      },
      {
       "id": 4,
       "title": "NextDecade (NEXT) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-29",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/29/nextdecade-next-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 5,
       "title": "What NextDecade (NEXT) Said on Its Q3 Earnings Call",
       "publisher": "MarketBeat",
       "date": "2026-10-29",
       "url": "https://www.marketbeat.com/instant-alerts/transcript-what-nextdecade-next-said-on-its-q3-earnings-call-2026-10-29/"
      }
     ]
    },
    {
     "name_kr": "엑셀러레이트 에너지",
     "name_en": "Excelerate Energy, Inc.",
     "ticker": "EE",
     "yahoo": "EE",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1888447,
     "role_kr": "부유식 저장·재기화설비(FSRU)를 보유·운영해 수입국에 재기화 서비스와 LNG·가스를 공급하는 회사다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-04",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 조정 EBITDA는 1.335억 달러, 순이익은 0.60억 달러(전년 대비 +9%)이고, 조정 매출총이익은 1.559억 달러로 2분기 1.379억 달러보다 늘었다.",
       "src": [
        3,
        4,
        1
       ]
      },
      {
       "text": "이익 증가는 요르단 신규 FSRU 용선과 LNG·가스·전력 직접 마진 개선에서 나왔고, 전년 대비로는 Atlantic Basin 계약의 인도 시점 차이가 일부를 상쇄했다.",
       "src": [
        3
       ]
      },
      {
       "text": "3분기 매출은 2.97억 달러로 2분기 3.29억 달러, 전년 동기 3.91억 달러보다 적다(전년 대비 -24%). 영업이익은 0.95억 달러로 전년보다 8% 늘었다.",
       "src": [
        3,
        1
       ]
      },
      {
       "text": "Class A 지배주주 순이익은 0.14억 달러, 희석 EPS는 0.44달러(전년 0.43달러)다.",
       "src": [
        1
       ]
      },
      {
       "text": "Methane Patricia Camila호의 FSRU 개조를 Seatrium에 맡겨 2028년 상업 투입할 예정이다. Petrobras와는 FSRU Sequoia 용선을 2038년까지 5년 연장하고 2028년 도크 때 재액화 설비를 달기로 했다.",
       "src": [
        5
       ]
      },
      {
       "text": "경영진은 신규 사업 두 건 모두 FSRU가 호르무즈 해협을 지날 필요가 없다고 밝혔고, 이라크·콜롬비아용 FSRU 배치 경로를 해협 통과 위험을 줄이는 쪽으로 바꾸고 있다.",
       "src": [
        5
       ]
      },
      {
       "text": "잔여 수행의무는 9월 말 183.3억 달러로 2025년 말 174.3억 달러보다 5% 많고, 1~9월 설비투자 현금지출은 3.14억 달러로 전년 동기 1.29억 달러의 2.4배다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "297.2",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 -24%, 2분기 329.3백만 달러",
       "src": 1
      },
      {
       "label": "조정 EBITDA",
       "value": "133.5",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      },
      {
       "label": "조정 매출총이익",
       "value": "155.9",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "2분기 137.9백만 달러",
       "src": 3
      },
      {
       "label": "영업이익",
       "value": "94.6",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +8%",
       "src": 1
      },
      {
       "label": "순이익(비지배지분 포함)",
       "value": "60.0",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +9%",
       "src": 1
      },
      {
       "label": "Class A 지배주주 순이익",
       "value": "14.2",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 14.0백만 달러",
       "src": 1
      },
      {
       "label": "희석 EPS",
       "value": "0.44",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 0.43달러",
       "src": 1
      },
      {
       "label": "매출(누적)",
       "value": "1,059.9",
       "unit": "백만 달러",
       "period": "2026년 1~9월",
       "change": "전년 동기 대비 +16%",
       "src": 1
      },
      {
       "label": "잔여 수행의무(계약 잔고)",
       "value": "18,330",
       "unit": "백만 달러",
       "period": "2026년 9월 말",
       "change": "2025년 말 대비 +5%",
       "src": 1
      },
      {
       "label": "설비투자 현금지출",
       "value": "313.6",
       "unit": "백만 달러",
       "period": "2026년 1~9월",
       "change": "전년 동기 129.4백만 달러",
       "src": 1
      },
      {
       "label": "차입금 장부가",
       "value": "934.3",
       "unit": "백만 달러",
       "period": "2026년 9월 말",
       "change": "",
       "src": 1
      },
      {
       "label": "현금",
       "value": "356.7",
       "unit": "백만 달러",
       "period": "2026년 9월 말",
       "change": "",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "2026년 조정 EBITDA 가이던스는 4.95억~5.15억 달러로 범위를 좁혔다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "2026년 확정 성장 투자(committed growth capex) 가이던스는 FSRU 개조 지출 시점을 반영해 4.00억~4.10억 달러로 올렸다.",
       "src": [
        3,
        5
       ]
      },
      {
       "text": "바하마 사업은 자메이카 플랫폼을 활용해 2027년 1분기 개시 예정이다.",
       "src": [
        5
       ]
      },
      {
       "text": "경영진은 바하마·이라크·콜롬비아 등 성장 사업으로 2029년까지 조정 EBITDA가 2.5억~3.0억 달러 늘어날 것으로 본다.",
       "src": [
        5
       ]
      }
     ],
     "read_through": {
      "text": "계약 잔고는 9개월 새 약 9억 달러 늘었고 Petrobras 용선은 2038년까지 연장됐다. 회사는 이라크·콜롬비아 FSRU 배치 경로를 호르무즈 해협 통과 위험을 줄이는 쪽으로 바꾸고 있다.",
      "desk": "gas"
     },
     "sources": [
      {
       "id": 1,
       "title": "Excelerate Energy, Inc. Form 10-Q (quarter ended 2026-09-30) XBRL company facts",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-05",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001888447.json"
      },
      {
       "id": 2,
       "title": "Excelerate Energy, Inc. EDGAR filing index (8-K Item 2.02 filed 2026-11-04, 10-Q filed 2026-11-05)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-07",
       "url": "https://data.sec.gov/submissions/CIK0001888447.json"
      },
      {
       "id": 3,
       "title": "Excelerate Energy Reports Strong Third Quarter 2026 Results",
       "publisher": "Excelerate Energy",
       "date": "2026-11-04",
       "url": "https://excelerateenergy.com/news/excelerate-energy-reports-strong-third-quarter-2026-results/"
      },
      {
       "id": 4,
       "title": "Excelerate Energy, Inc. Form 8-K Ex.99.1 (third quarter 2026 results)",
       "publisher": "SEC EDGAR",
       "date": "2026-11-04",
       "url": "https://www.sec.gov/Archives/edgar/data/0001888447/000119312526447504/ee-ex99_1.htm"
      },
      {
       "id": 5,
       "title": "Excelerate Energy (EE) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-11-05",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/11/05/excelerate-energy-ee-q3-2026-earnings-call-transcript/"
      }
     ]
    },
    {
     "name_kr": "플렉스 LNG",
     "name_en": "FLEX LNG Ltd.",
     "ticker": "FLNG",
     "yahoo": "FLNG",
     "exchange": "NYSE",
     "country": "버뮤다",
     "cik": null,
     "role_kr": "대형 LNG 운반선 13척을 보유해 기간·현물 용선 영업을 하는 LNG 해운사다.",
     "period": "2026년 2분기(3분기 실적은 2026-11-11 발표 예정)",
     "period_end": "2026-06-30",
     "report_date": "2026-08-19",
     "status": "not_yet",
     "highlights": [
      {
       "text": "2분기 선대 평균 TCE는 86,119달러/일로 1분기 65,729달러/일보다 31% 높았고 2분기 매출은 1.068억 달러다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "13척 가운데 현물 노출선은 Flex Artemis·Flex Volunteer 2척이다. 두 척은 3분기 말부터 현물·기간 용선을 함께 타진하고 있고, 남은 연도 확정 계약 비중은 약 89%다.",
       "src": [
        3
       ]
      },
      {
       "text": "상반기 매출은 1.87억 달러(+7%), 영업이익은 0.94억 달러(+3%), 순이익은 0.64억 달러(+77%), EPS는 1.19달러(전년 0.67달러)다.",
       "src": [
        1
       ]
      },
      {
       "text": "2분기 배당은 주당 0.75달러로 유지했고, 상반기 배당 지급액 0.81억 달러는 영업현금흐름 0.86억 달러의 94%다.",
       "src": [
        4,
        1
       ]
      },
      {
       "text": "상반기 유형자산 취득 지출은 0달러이고, 총차입금은 6월 말 18.05억 달러로 2025년 말 18.61억 달러보다 0.56억 달러 적다. 현금은 3.97억 달러다.",
       "src": [
        1
       ]
      },
      {
       "text": "LNG Prime 등이 보도한 Spark 기준 대서양 현물 운임은 9월 18일 25,250달러/일로 3주 연속 올랐고, 10월 말에는 대서양 28,000달러/일·태평양 44,500달러/일이었다. 11월 6일 주간까지 두 해역 모두 3주 연속 상승했다(시장 지표).",
       "src": [
        7,
        9,
        8
       ]
      }
     ],
     "metrics": [
      {
       "label": "선대 평균 TCE",
       "value": "86,119",
       "unit": "달러/일",
       "period": "2026년 2분기",
       "change": "1분기 65,729달러/일(+31%)",
       "src": 3
      },
      {
       "label": "매출",
       "value": "106.8",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "",
       "src": 4
      },
      {
       "label": "분기 배당",
       "value": "0.75",
       "unit": "달러/주",
       "period": "2026년 2분기",
       "change": "",
       "src": 4
      },
      {
       "label": "확정 계약 비중",
       "value": "약 89",
       "unit": "%",
       "period": "2026년 잔여 기간",
       "change": "",
       "src": 3
      },
      {
       "label": "보유 선대",
       "value": "13",
       "unit": "척",
       "period": "2026년 2분기 발표",
       "change": "현물 노출 2척",
       "src": 3
      },
      {
       "label": "매출(누적)",
       "value": "187.3",
       "unit": "백만 달러",
       "period": "2026년 1~6월",
       "change": "전년 동기 대비 +7%",
       "src": 1
      },
      {
       "label": "순이익(누적)",
       "value": "64.4",
       "unit": "백만 달러",
       "period": "2026년 1~6월",
       "change": "전년 동기 대비 +77%",
       "src": 1
      },
      {
       "label": "총차입금",
       "value": "1,805.1",
       "unit": "백만 달러",
       "period": "2026년 6월 말",
       "change": "2025년 말 1,860.6백만 달러",
       "src": 1
      },
      {
       "label": "현금",
       "value": "397.4",
       "unit": "백만 달러",
       "period": "2026년 6월 말",
       "change": "2025년 말 447.6백만 달러",
       "src": 1
      },
      {
       "label": "대서양 현물 운임(Spark·LNG Prime 보도, 참고 지표)",
       "value": "25,250",
       "unit": "달러/일",
       "period": "2026-09-18",
       "change": "3주 연속 상승",
       "src": 7
      },
      {
       "label": "대서양 현물 운임(Spark·보도 재게재, 참고 지표)",
       "value": "28,000",
       "unit": "달러/일",
       "period": "2026년 10월 말",
       "change": "전주 대비 상승",
       "src": 9
      },
      {
       "label": "태평양 현물 운임(Spark·보도 재게재, 참고 지표)",
       "value": "44,500",
       "unit": "달러/일",
       "period": "2026년 10월 말",
       "change": "전주 대비 상승",
       "src": 9
      }
     ],
     "guidance": [
      {
       "text": "2026년 선대 평균 TCE 전망 73,000~78,000달러/일을 2분기에도 유지했다.",
       "src": [
        3
       ]
      },
      {
       "text": "회사는 계절적으로 강한 겨울 시장이 미계약 2척의 4분기 고용을 뒷받침할 것으로 기대했다.",
       "src": [
        3
       ]
      },
      {
       "text": "3분기 실적은 2026년 11월 11일 07:00(중앙유럽시간)에 발표하고 15:00에 웹캐스트를 연다.",
       "src": [
        6
       ]
      }
     ],
     "read_through": {
      "text": "LNG 운반선 현물 운임은 대서양이 9월 18일 25,250달러/일에서 10월 말 28,000달러/일로, 태평양이 10월 말 44,500달러/일로 올랐다. 플렉스는 남은 연도 물량의 약 89%가 확정 계약이어서 현물 반등은 2척분에만 반영된다.",
      "desk": "gas"
     },
     "sources": [
      {
       "id": 1,
       "title": "Flex LNG Ltd. XBRL company facts (20-F FY2025; 6-K interim financial statements for the six months ended 2026-06-30)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-08-19",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001772253.json"
      },
      {
       "id": 2,
       "title": "Flex LNG Ltd. EDGAR filing index (Q2 2026 6-K filed 2026-08-19)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-07",
       "url": "https://data.sec.gov/submissions/CIK0001772253.json"
      },
      {
       "id": 3,
       "title": "Flex LNG - Second Quarter 2026 Earnings Release",
       "publisher": "Flex LNG",
       "date": "2026-08-19",
       "url": "https://www.flexlng.com/flex-lng-second-quarter-2026-earnings-release/"
      },
      {
       "id": 4,
       "title": "Flex LNG posts $106.8m Q2 revenue, $0.75 dividend (6-K summary)",
       "publisher": "Stock Titan",
       "date": "2026-08-19",
       "url": "https://www.stocktitan.net/sec-filings/FLNG/6-k-flex-lng-ltd-current-report-foreign-issuer-0e5ec86800e7.html"
      },
      {
       "id": 6,
       "title": "Flex LNG - Invitation to the 2026 third quarter results presentation",
       "publisher": "Stock Titan",
       "date": "",
       "url": "https://www.stocktitan.net/news/FLNG/flex-lng-invitation-to-the-2026-third-quarter-gv5xbpb0srjf.html"
      },
      {
       "id": 7,
       "title": "Atlantic LNG rates continue to increase (Spark Commodities)",
       "publisher": "LNG Prime",
       "date": "2026-09-18",
       "url": "https://lngprime.com/asia/atlantic-lng-rates-continue-to-increase/197077/"
      },
      {
       "id": 8,
       "title": "Atlantic and Pacific LNG rates rise for third week (Spark Commodities)",
       "publisher": "LNG Prime",
       "date": "2026-11-06",
       "url": "https://lngprime.com/americas/atlantic-and-pacific-lng-rates-rise-for-third-week/199626/"
      },
      {
       "id": 9,
       "title": "Asian spot LNG prices rise to new multi-year high on Mideast tensions and buying interest (Spark analyst quote)",
       "publisher": "UNG News (rallies.ai)",
       "date": "",
       "url": "https://rallies.ai/news/asian-spot-lng-prices-rise-to-new-multi-year-high-on-mideast-tensions-and-buying-interest-91f9ab976031d4ea"
      }
     ]
    },
    {
     "name_kr": "골라 LNG",
     "name_en": "Golar LNG Limited",
     "ticker": "GLNG",
     "yahoo": "GLNG",
     "exchange": "Nasdaq",
     "country": "버뮤다",
     "cik": null,
     "role_kr": "FLNG Hilli·Gimi를 운영하고 MKII와 4번째 FLNG를 추진하는 해상 액화 사업자다.",
     "period": "2026년 2분기(3분기 실적은 2026-11-18 발표 예정)",
     "period_end": "2026-06-30",
     "report_date": "2026-08-13",
     "status": "not_yet",
     "highlights": [
      {
       "text": "2분기 조정 EBITDA는 1.27억 달러로 전년 동기 0.49억 달러보다 159% 많다.",
       "src": [
        3
       ]
      },
      {
       "text": "FLNG Hilli의 원자재 연동 이익은 2분기 0.37억 달러로 1분기 0.10억 달러에서 늘었다. FLNG Gimi는 2분기 계약 약정 물량보다 15% 많이 생산했다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "2분기 지배주주 순이익은 0.38억 달러이며 비현금 항목 0.29억 달러가 포함됐다.",
       "src": [
        3
       ]
      },
      {
       "text": "1분기 Gimi 생산량은 계약 약정 물량보다 19% 많았고 Hilli는 누적 150번째 카고를 선적했다.",
       "src": [
        6
       ]
      },
      {
       "text": "4번째 FLNG를 24.5억 달러에 발주해 지배 액화 용량을 12백만 톤/년 이상으로 늘릴 계획이며, 10월에는 4번째 FLNG용 개조 선박을 확보했다.",
       "src": [
        3,
        4,
        7
       ]
      },
      {
       "text": "아르헨티나 SESA 계약은 골라 몫 조정 EBITDA 연 2.85억 달러에 FOB 가격 8달러/MMBtu 초과분의 25%를 받는 원자재 연동 요금이 더해진다.",
       "src": [
        3
       ]
      },
      {
       "text": "6월 말 현금은 8.70억 달러(제한현금 포함 골라 총현금 9.08억 달러)로 2025년 말 11.51억 달러보다 적고 장기차입금은 26.75억 달러다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "상반기 누적 매출은 2.68억 달러로 전년 동기의 1.9배, 지배주주 순이익은 1.22억 달러(전년 0.24억 달러)다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "조정 EBITDA",
       "value": "127",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "전년 대비 +159%",
       "src": 3
      },
      {
       "label": "지배주주 순이익",
       "value": "38",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "비현금 항목 29백만 달러 포함",
       "src": 3
      },
      {
       "label": "Hilli 원자재 연동 이익",
       "value": "37",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "1분기 10백만 달러",
       "src": 3
      },
      {
       "label": "Gimi 생산량(계약 약정 물량 대비)",
       "value": "+15",
       "unit": "%",
       "period": "2026년 2분기",
       "change": "",
       "src": 4
      },
      {
       "label": "Gimi 생산량(계약 약정 물량 대비)",
       "value": "+19",
       "unit": "%",
       "period": "2026년 1분기",
       "change": "",
       "src": 6
      },
      {
       "label": "조정 EBITDA",
       "value": "105.6",
       "unit": "백만 달러",
       "period": "2026년 1분기",
       "change": "",
       "src": 6
      },
      {
       "label": "골라 총현금",
       "value": "908",
       "unit": "백만 달러",
       "period": "2026년 6월 말",
       "change": "",
       "src": 3
      },
      {
       "label": "고객계약 매출(누적)",
       "value": "268.0",
       "unit": "백만 달러",
       "period": "2026년 1~6월",
       "change": "전년 동기 대비 +94%",
       "src": 1
      },
      {
       "label": "지배주주 순이익(누적)",
       "value": "121.8",
       "unit": "백만 달러",
       "period": "2026년 1~6월",
       "change": "전년 동기 23.8백만 달러",
       "src": 1
      },
      {
       "label": "장기차입금",
       "value": "2,675.4",
       "unit": "백만 달러",
       "period": "2026년 6월 말",
       "change": "2025년 말 2,758.0백만 달러",
       "src": 1
      },
      {
       "label": "4번째 FLNG 투자비",
       "value": "2.45",
       "unit": "십억 달러",
       "period": "2026년 발주",
       "change": "",
       "src": 3
      },
      {
       "label": "SESA 계약 골라 몫 조정 EBITDA",
       "value": "285",
       "unit": "백만 달러/년",
       "period": "계약 조건",
       "change": "FOB 8달러/MMBtu 초과분 25% 별도",
       "src": 3
      }
     ],
     "guidance": [
      {
       "text": "3분기 실적은 2026년 11월 18일 장 개시 전 발표하고 오전 8시(미 동부) 웹캐스트를 연다.",
       "src": [
        8
       ]
      },
      {
       "text": "MKII FLNG 건조는 일정·예산대로 진행 중이다(1분기 발표 기준).",
       "src": [
        6
       ]
      },
      {
       "text": "4번째 FLNG는 2029년 인도 예정이다.",
       "src": [
        7
       ]
      }
     ],
     "read_through": {
      "text": "Gimi는 2분기 계약 약정 물량보다 15% 많이 생산했고 Hilli는 원자재 연동 이익 0.37억 달러를 냈다. 4번째 FLNG(2029년 인도)로 지배 액화 용량은 12백만 톤/년 이상으로 늘어난다.",
      "desk": "gas"
     },
     "sources": [
      {
       "id": 1,
       "title": "Golar LNG Limited XBRL company facts (20-F FY2025; 6-K interim financial statements for the six months ended 2026-06-30)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-08-19",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001207179.json"
      },
      {
       "id": 2,
       "title": "Golar LNG Ltd EDGAR filing index (6-K filings 2026-05-20, 08-13, 08-19, 10-07, 10-19, 10-23)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-07",
       "url": "https://data.sec.gov/submissions/CIK0001207179.json"
      },
      {
       "id": 3,
       "title": "Golar LNG Limited Interim results for the period ended June 30, 2026",
       "publisher": "Golar LNG (GlobeNewswire via Nasdaq)",
       "date": "2026-08-13",
       "url": "https://www.nasdaq.com/press-release/golar-lng-limited-interim-results-period-ended-june-30-2026-2026-08-13-0"
      },
      {
       "id": 4,
       "title": "Golar (GLNG) Q2 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-08-20",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/08/20/golar-glng-q2-2026-earnings-call-transcript/"
      },
      {
       "id": 6,
       "title": "Golar LNG Limited Q1 2026 results (Form 6-K Ex.99.1)",
       "publisher": "SEC EDGAR",
       "date": "2026-05-20",
       "url": "https://www.sec.gov/Archives/edgar/data/0001207179/000117184326003563/exh_991.htm"
      },
      {
       "id": 7,
       "title": "Press releases 2026 (Golar orders 4th FLNG unit for 2029 delivery; acquires conversion vessel for 4th FLNG)",
       "publisher": "Golar LNG",
       "date": "2026-11-07",
       "url": "https://www.golarlng.com/investors/press-releases/2026.aspx"
      },
      {
       "id": 8,
       "title": "Golar LNG sets Q3 2026 results for November 18 (6-K summary)",
       "publisher": "Stock Titan",
       "date": "",
       "url": "https://www.stocktitan.net/sec-filings/GLNG/6-k-golar-lng-ltd-current-report-foreign-issuer-38c67ab32a68.html"
      }
     ]
    }
   ]
  },
  {
   "id": "refining",
   "title": "정유",
   "position": "원유를 휘발유·경유·항공유 등 석유제품으로 바꾸는 하류 단계다.",
   "summary": [
    "미국 정제사는 3분기에 처리능력을 거의 다 썼다. 마라톤 원유 처리설비 가동률은 100%(처리량 320만 배럴/일)(마라톤 4), 필립스66 정제 가동률은 98%(필립스66 6), 발레로 처리량은 2,972천 배럴/일(처리능력 약 3,000천 배럴/일)(발레로 1)(발레로 2)이다.",
    "배럴당 마진은 전년의 2.6~3.8배로 올랐다. 마라톤 R&M 마진은 45.70달러(전년 17.60달러)(마라톤 4), 발레로 정제마진은 39.24달러(13.14달러)(발레로 4), PBF 정제 총마진은 34.56달러(9.00달러)(PBF 5), HF싱클레어 조정 정제 총마진은 54.22달러(19.16달러)(HF싱클레어 4)다.",
    "4분기 미국 대형 정제사 가동은 정기보수로 3분기보다 낮아진다. 발레로는 처리량 2,875~2,975천 배럴/일(가동률 96~99%)(발레로 4), 마라톤은 가동률 95%와 걸프·서부 전환설비 정기보수(마라톤 7), HF싱클레어는 560~600천 배럴/일(3분기 614.06천 배럴/일)(HF싱클레어 5)을 제시했다. 가이던스를 확인한 4개사 중 PBF만 925~985천 배럴/일로 3분기 923.8천 배럴/일보다 늘린다(PBF 4).",
    "디젤 공급 차질은 4분기에도 이어질 가능성이 크다. 발레로 COO는 러시아 디젤 수출이 미국 제재 완화 이후에도 전년보다 60만~70만 배럴/일 적다고 봤고(발레로 5), HF싱클레어는 지정학적 차질과 중국 수출 축소로 시장 긴장이 2028년까지 간다고 전망했다(HF싱클레어 7). 필립스66은 3분기 경유 수율을 3분기 기준 최대인 41%로 끌어올렸다(필립스66 6).",
    "한국 정유사는 3분기에 윤활 부문이 정유 부문과 비슷하거나 더 많이 벌었다. 에쓰오일은 영업이익 1조 4,067억 원 중 정유 6,904억 원·윤활 7,427억 원(에쓰오일 1)(에쓰오일 2), SK이노베이션은 영업이익 3조 7,043억 원 중 SK에너지 1조 2,058억 원·윤활유 1조 906억 원(SK이노베이션 1)(SK이노베이션 3)이다. 에쓰오일은 낮은 글로벌 제품 재고와 난방유 성수기를, SK이노베이션은 낮은 OSP와 동절기 수요를 근거로 4분기 정유 호조를 전망했다(에쓰오일 3)(SK이노베이션 2).",
    "3분기 자사주 매입은 발레로 33억 9,600만 달러(발레로 3), 마라톤 30억 3,600만 달러(마라톤 1), 필립스66 23억 6,200만 달러(필립스66 1)다. PBF는 순차입금을 12억 달러 넘게 줄였고(PBF 7) SK이노베이션은 주주환원보다 재무안정을 우선한다(SK이노베이션 4)."
   ],
   "open_items": [
    "발표문·녹취록은 원문을 직접 확인하지 못해 요약 자료를 근거로 삼았다.",
    "필립스66의 3분기 캡처율과 4분기 처리량·가동률·정기보수 비용 가이던스를 확인하지 못했다. 실현 정제마진 38.00달러/배럴과 청정제품 수율 86%는 발표 자료 요약 기사 기준이다. 같은 기사군의 매출 426억 달러는 XBRL(505억 4,000만 달러)과 다르다.",
    "마라톤 4분기 처리량(배럴/일) 수치와 경유·항공유 수요·수출 발언을 확인하지 못했다. 세인트폴파크·맨던 매각은 매수자 표기(CVR/CBR)와 회사 수령액(34억 달러 대 42억 달러)이 출처마다 다르고, 2026년 정기보수 비용 13.5억 달러는 요약 기사 한 곳 기준이다.",
    "PBF·HF싱클레어 캡처율, PBF 지역별 처리량·마진, HF싱클레어 배럴당 운영비와 경유·항공유 크랙 발언을 확인하지 못했다.",
    "HF싱클레어 RIN 면제 이익 6억 달러가 영업이익과 조정 EPS 11.75달러에 포함됐는지 확인하지 못했다. 3분기 자사주 매입은 회사 발표 4억 7,900만 달러와 XBRL 자기주식 취득 4억 9,500만 달러로 다르다.",
    "에쓰오일·SK이노베이션의 배럴당 정제마진(싱가포르 복합마진 등), SK에너지 가동률, 양사 수출 물량과 한국 석유제품 수출 허용량 관련 발언을 확인하지 못했다. SK이노베이션이 4분기 강세 요인으로 든 '주요국 석유제품 수출 제한'의 대상 국가도 확인하지 못했다.",
    "에쓰오일 CDU 가동률(3분기 81%, 현재 약 90%)과 윤활기유 전망은 여러 보도를 묶은 요약 기준이며 개별 기사 출처를 특정하지 못했다.",
    "SK이노베이션 순이익은 보도 기준 2조 6,413억 원이고 Yahoo 집계 값(2조 5,858억 원)과 다르다. 연결·지배주주 기준 차이로 보이나 확인하지 못했다.",
    "발레로 지역별(미드컨티넨트·북대서양·서부) 3분기 처리량·마진, 전사 처리량이 전년 대비 115천 배럴/일 줄어든 원인, 3분기 현금운영비 표기 차이(5.03달러 대 5.3달러)는 원문으로 확인하지 못했다. 4분기 서부 처리량 가이던스(100~110천 배럴/일)는 요약 기사 한 곳에만 나온다.",
    "미국 디젤 수출 금지 검토와 러시아산 디젤 제재 완화의 이후 결정 상황은 확인하지 못했다.",
    "HF싱클레어 10월 30일·11월 4일 8-K(Item 1.01)와 PBF 9~10월 8-K(Item 1.01·2.03·3.02)의 계약 내용은 EDGAR 목록에서 항목 번호만 확인했다.",
    "마라톤·필립스66·PBF·HF싱클레어 매출은 XBRL 'RevenueFromContractWithCustomerExcludingAssessedTax' 기준이라 회사 발표 총수익(기타수익 포함)과 다를 수 있다."
   ],
   "companies": [
    {
     "name_kr": "발레로",
     "name_en": "Valero Energy Corporation",
     "ticker": "VLO",
     "yahoo": "VLO",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1035002,
     "role_kr": "걸프코스트 비중이 큰 미국 대형 독립 정유사로 재생디젤(DGD 합작)·에탄올 사업을 함께 운영한다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-22",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 정제 영업이익은 87억 8,200만 달러로 전년 16억 1,000만 달러의 5배를 넘었다. 정제마진은 107억 3,000만 달러(전년 37억 3,100만 달러), 배럴당 39.24달러(전년 13.14달러)다.",
       "src": [
        2,
        4
       ]
      },
      {
       "text": "3분기 처리량은 2,972천 배럴/일(전년 3,087천 배럴/일)로 14개 정유공장 처리능력 약 3,000천 배럴/일에 근접했다. 걸프코스트는 1,874천 배럴/일(전년 1,846천 배럴/일)로 늘었고 베네수엘라산 원유 처리량은 분기 최대를 기록했다.",
       "src": [
        1,
        2,
        8
       ]
      },
      {
       "text": "조정 EPS 23.90달러는 LSEG 컨센서스 21.07달러(추정치, Reuters 인용)를 13% 상회했고, 같은 분기 미국 3-2-1 크랙은 전년 대비 150% 넘게 올랐다.",
       "src": [
        4
       ]
      },
      {
       "text": "재생디젤 영업이익은 3억 5,300만 달러(전년 -2,800만 달러)로 흑자 전환했고 판매량은 340만 갤런/일이다. 에탄올은 영업이익 2억 7,200만 달러(전년 1억 8,300만 달러), 생산 480만 갤런/일로 분기 최대다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "3분기 자사주 매입 33억 9,600만 달러(전년 9억 3,100만 달러)와 배당 3억 4,500만 달러(주당 1.20달러)를 집행했다. 조정 영업현금흐름 72억 5,300만 달러 대비 환원율은 52%다.",
       "src": [
        1,
        3,
        12
       ]
      },
      {
       "text": "수요 위축 신호는 아직 없다. COO는 미국 도매 휘발유 판매가 전년 대비 4%, 경유가 약 2% 늘었고 휘발유·디젤 수출 수요가 중남미·유럽 모두 강하며 10월 휘발유 백워데이션이 단기 수급 긴장을 반영한다고 밝혔다.",
       "src": [
        5,
        6,
        9
       ]
      },
      {
       "text": "COO는 미 행정부의 러시아산 디젤 제재 완화로 러시아 디젤 수출이 7월 수준으로 돌아오는 데 그쳐 전년보다 60만~70만 배럴/일 적다고 평가했다. 호르무즈 해협 통과 물량이 최근 주간 기준 전쟁 이전 수준을 웃돈다는 보도와 최근 SPR 방출도 함께 언급했다.",
       "src": [
        5,
        6,
        10
       ]
      },
      {
       "text": "9월 미 대통령이 디젤 수출 자제를 언급한 뒤 재무장관은 디젤 수출 전면 또는 부분 금지를 검토 중이라고 밝혔다.",
       "src": [
        11
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "46,098",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +43%",
       "src": 3
      },
      {
       "label": "영업이익",
       "value": "9,073",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 1,509 대비 6.0배",
       "src": 3
      },
      {
       "label": "지배주주 순이익",
       "value": "6,828",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 1,095 대비 6.2배",
       "src": 3
      },
      {
       "label": "희석 EPS",
       "value": "23.89",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 3.53달러",
       "src": 3
      },
      {
       "label": "조정 EPS",
       "value": "23.90",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 대비 약 +553%",
       "src": 4
      },
      {
       "label": "정제 부문 영업이익",
       "value": "8,782",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 1,610",
       "src": 2
      },
      {
       "label": "정제마진(배럴당)",
       "value": "39.24",
       "unit": "달러/배럴",
       "period": "2026년 3분기",
       "change": "전년 13.14달러",
       "src": 4
      },
      {
       "label": "정제 처리량",
       "value": "2,972",
       "unit": "천 배럴/일",
       "period": "2026년 3분기",
       "change": "전년 대비 -115",
       "src": 2
      },
      {
       "label": "걸프코스트 처리량",
       "value": "1,874",
       "unit": "천 배럴/일",
       "period": "2026년 3분기",
       "change": "전년 1,846",
       "src": 1
      },
      {
       "label": "정제 현금운영비",
       "value": "5.03",
       "unit": "달러/배럴",
       "period": "2026년 3분기",
       "change": "",
       "src": 8
      },
      {
       "label": "재생디젤 영업이익",
       "value": "353",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 -28",
       "src": 1
      },
      {
       "label": "설비투자",
       "value": "432",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "유지보수 투자 371",
       "src": 1
      },
      {
       "label": "자사주 매입",
       "value": "3,396",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 931",
       "src": 3
      },
      {
       "label": "조정 영업현금흐름",
       "value": "7,253",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 12
      }
     ],
     "guidance": [
      {
       "text": "4분기 처리량은 2,875~2,975천 배럴/일로 3분기(2,972천 배럴/일) 이하를 제시했다. 지역별로는 걸프코스트 1,855~1,905천, 미드컨티넨트 440~460천, 북대서양 480~500천, 서부 100~110천 배럴/일이며 가동률은 96~99%를 계획한다.",
       "src": [
        4,
        7,
        13
       ]
      },
      {
       "text": "4분기 정제 현금운영비는 4.85달러/배럴로 3분기 5.03달러/배럴보다 낮고, 순이자비용은 약 1억 3,500만 달러, 감가상각비는 약 7억 달러다.",
       "src": [
        7,
        8
       ]
      },
      {
       "text": "4분기 재생디젤 판매량은 약 3억 2,500만 갤런(운영비 0.53달러/갤런), 에탄올 생산은 490만 갤런/일이다.",
       "src": [
        7
       ]
      },
      {
       "text": "2026년 설비투자는 약 20억 달러이며, 장기 현금 목표 40억~50억 달러는 유지하되 유연성을 위해 그 이상의 현금(9월 말 98억 4,000만 달러)을 보유한다.",
       "src": [
        3,
        8
       ]
      }
     ],
     "read_through": {
      "text": "미국 걸프 정제설비의 추가 증산 여력은 작다. 발레로는 3분기 처리능력에 근접한 2,972천 배럴/일을 처리했고 4분기에도 가동률 96~99%를 계획한다. 러시아 디젤 수출이 전년보다 60만~70만 배럴/일 적은 상태여서 대서양권 디젤 크랙은 4분기에도 높은 수준을 유지할 가능성이 크다(발레로 2)(발레로 4)(발레로 5).",
      "desk": "products"
     },
     "sources": [
      {
       "id": 1,
       "title": "Valero Energy Reports Third Quarter 2026 Results (Form 8-K Exhibit 99.01)",
       "publisher": "Valero Energy / SEC EDGAR",
       "date": "2026-10-22",
       "url": "https://www.sec.gov/Archives/edgar/data/0001035002/000162828026066795/a9302026exh9901earningsrel.htm"
      },
      {
       "id": 2,
       "title": "Valero Energy Form 10-Q for the quarter ended September 30, 2026",
       "publisher": "SEC EDGAR",
       "date": "2026-10-28",
       "url": "https://www.sec.gov/Archives/edgar/data/0001035002/000162828026067679/vlo-20260930.htm"
      },
      {
       "id": 3,
       "title": "Valero Energy XBRL company facts (Form 10-Q, period ended 2026-09-30, accession 0001628280-26-067679)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-10-28",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001035002.json"
      },
      {
       "id": 4,
       "title": "US refiner Valero posts record quarterly profit as supply disruptions boost margins",
       "publisher": "Reuters (via TradingView)",
       "date": "2026-10-22",
       "url": "https://www.tradingview.com/news/reuters.com,2026:newsml_L4N4680YK:0-us-refiner-valero-posts-record-quarterly-profit-as-supply-disruptions-boost-margins/"
      },
      {
       "id": 5,
       "title": "Earnings call transcript: Valero tops Q3 2026 estimates as shares fall",
       "publisher": "Investing.com",
       "date": "",
       "url": "https://www.investing.com/news/transcripts/earnings-call-transcript-valero-tops-q3-2026-estimates-as-shares-fall-93CH-4966833"
      },
      {
       "id": 6,
       "title": "Valero (VLO) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-22",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/22/valero-vlo-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 7,
       "title": "Valero Q3 Earnings Call Highlights Refining and Cash Strength",
       "publisher": "The Globe and Mail (MarketBeat)",
       "date": "",
       "url": "https://www.theglobeandmail.com/investing/markets/stocks/VLO/pressreleases/8369799/valero-q3-earnings-call-highlights-refining-and-cash-strength/"
      },
      {
       "id": 8,
       "title": "Valero Energy Corp (VLO) Q3 2026 Earnings Call Highlights: Net Income Surges to $6.8 Billion on Record Refining Throughput and Renewable Diesel Turnaround",
       "publisher": "GuruFocus",
       "date": "",
       "url": "https://www.gurufocus.com/news/9137692/valero-energy-corp-vlo-q3-2026-earnings-call-highlights-net-income-surges-to-68-billion-on-record-refining-throughput-and-renewable-diesel-turnaround"
      },
      {
       "id": 9,
       "title": "US Refiner Valero Posts Record Quarterly Profit as Supply Disruptions Boost Margins",
       "publisher": "EnergyNow (Reuters)",
       "date": "",
       "url": "https://energynow.com/2026/10/us-refiner-valero-posts-record-quarterly-profit-as-supply-disruptions-boost-margins/"
      },
      {
       "id": 10,
       "title": "Valero's Windfall Quarter Meets Washington's Push for Cheaper Diesel",
       "publisher": "MarketBeat",
       "date": "",
       "url": "https://www.marketbeat.com/articles/valeros-windfall-quarter-meets-washingtons-push-for-cheaper-diesel/"
      },
      {
       "id": 11,
       "title": "Trump Wants to Ban Diesel Exports. Refiners Are Selling Off.",
       "publisher": "24/7 Wall St.",
       "date": "2026-09-24",
       "url": "https://247wallst.com/investing/2026/09/24/trump-wants-to-ban-diesel-exports-refiners-are-selling-off/"
      },
      {
       "id": 12,
       "title": "Valero Energy presents its results for the third quarter of 2026",
       "publisher": "Inspenet",
       "date": "",
       "url": "https://inspenet.com/en/news/valero-energy-third-quarter-2026/"
      },
      {
       "id": 13,
       "title": "[Valero Energy Q3 2026 Earnings Call] Valero Posts $6.8 Billion Quarterly Profit, a Sixfold Surge, as Freight Dislocations Supercharge Gulf Coast Refining",
       "publisher": "BigGo Finance",
       "date": "2026-10-22",
       "url": "https://finance.biggo.com/news/US_VLO_2026-10-22"
      }
     ]
    },
    {
     "name_kr": "마라톤페트롤리엄",
     "name_en": "Marathon Petroleum Corporation",
     "ticker": "MPC",
     "yahoo": "MPC",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1510295,
     "role_kr": "정제능력 기준 미국 최대 정유사로 미드스트림 자회사 MPLX를 연결 실적에 포함한다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-03",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 원유 처리설비 가동률은 100%(전년 95%), 총 처리량은 320만 배럴/일이다. 경영진은 3분기 기준 최대 가동률이라고 밝혔다.",
       "src": [
        4,
        5
       ]
      },
      {
       "text": "R&M 마진은 배럴당 45.70달러(전년 17.60달러), R&M 부문 조정 EBITDA는 99억 달러(전년 18억 달러)·배럴당 34.15달러(전년 6.37달러)다. 회사는 전 지역 크랙 상승을 주요인으로 들었다.",
       "src": [
        4
       ]
      },
      {
       "text": "정제 운영비는 배럴당 5.60달러(전년 5.59달러)로 전년과 비슷하다. 3분기 캡처율은 93%이며 부산물 가격이 주요 부담이었다.",
       "src": [
        4,
        6,
        7
       ]
      },
      {
       "text": "영업이익은 104억 5,000만 달러로 전년 27억 1,300만 달러의 3.9배다. 지배주주 순이익은 74억 4,700만 달러(희석 EPS 26.59달러), 조정 순이익은 75억 4,100만 달러(주당 26.93달러), 조정 EBITDA는 117억 2,900만 달러다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "조정 EPS 26.93달러는 Yahoo 집계 컨센서스 26.00달러(추정치)를 3.6% 웃돌았다.",
       "src": [
        3
       ]
      },
      {
       "text": "경영진은 원유의 약 90%를 미국·캐나다에서 조달한다고 밝혔다.",
       "src": [
        6,
        7
       ]
      },
      {
       "text": "세인트폴파크·맨던 정유공장과 관련 미드스트림 자산을 CVR Energy에 42억 달러(헤드라인 거래가치)에 매각하기로 합의했다. 순수익은 4분기 말까지 들어온다.",
       "src": [
        6,
        7
       ]
      },
      {
       "text": "3분기 자사주 매입은 30억 3,600만 달러(전년 6억 5,600만 달러), 배당은 2억 7,900만 달러(주당 1.00달러)다. 9월 말 현금성자산은 128억 500만 달러(2025년 말 36억 7,200만 달러)다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "56,032",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +61%",
       "src": 1
      },
      {
       "label": "영업이익",
       "value": "10,450",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 2,713 대비 3.9배",
       "src": 1
      },
      {
       "label": "지배주주 순이익",
       "value": "7,447",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 1,370 대비 5.4배",
       "src": 1
      },
      {
       "label": "조정 EPS",
       "value": "26.93",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "조정 EBITDA",
       "value": "11,729",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "R&M 마진(배럴당)",
       "value": "45.70",
       "unit": "달러/배럴",
       "period": "2026년 3분기",
       "change": "전년 17.60달러",
       "src": 4
      },
      {
       "label": "R&M 조정 EBITDA(배럴당)",
       "value": "34.15",
       "unit": "달러/배럴",
       "period": "2026년 3분기",
       "change": "전년 6.37달러",
       "src": 4
      },
      {
       "label": "원유 처리설비 가동률",
       "value": "100",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "전년 95%",
       "src": 4
      },
      {
       "label": "총 처리량",
       "value": "3.2",
       "unit": "백만 배럴/일",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "정제 운영비",
       "value": "5.60",
       "unit": "달러/배럴",
       "period": "2026년 3분기",
       "change": "전년 5.59달러",
       "src": 4
      },
      {
       "label": "캡처율",
       "value": "93",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 7
      },
      {
       "label": "자사주 매입",
       "value": "3,036",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 656",
       "src": 1
      },
      {
       "label": "유형자산 취득",
       "value": "3,226",
       "unit": "백만 달러",
       "period": "2026년 1~9월",
       "change": "전년 대비 +40%",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "4분기 정제 가이던스는 가동률 95%를 가정하며, 걸프·서부 지역 전환설비 정기보수로 캡처율이 일시적으로 낮아진다.",
       "src": [
        6,
        7
       ]
      },
      {
       "text": "2026년 정기보수 비용은 기존 가이던스인 13.5억 달러를 유지했다.",
       "src": [
        7
       ]
      },
      {
       "text": "4분기 캐나다산 중질유 처리량은 최대를 기록할 것으로 예상했다.",
       "src": [
        6,
        7
       ]
      },
      {
       "text": "정제 업황은 최소 2027년 중반까지 우호적이고 2020년대 말까지 이어질 수 있다고 봤다.",
       "src": [
        6,
        7
       ]
      }
     ],
     "read_through": {
      "text": "미국 걸프·서부 정제 공급은 4분기에 3분기보다 줄어든다. 마라톤은 3분기 가동률 100%에서 4분기 95%를 가정했고 걸프·서부 전환설비 정기보수를 예고했다(마라톤 4)(마라톤 7).",
      "desk": "products"
     },
     "sources": [
      {
       "id": 1,
       "title": "Marathon Petroleum XBRL company facts (Form 10-Q, period ended 2026-09-30, accession 0001510295-26-000071)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-03",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001510295.json"
      },
      {
       "id": 2,
       "title": "Marathon Petroleum EDGAR filing index: Form 8-K Item 2.02 filed 2026-11-03",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-03",
       "url": "https://data.sec.gov/submissions/CIK0001510295.json"
      },
      {
       "id": 3,
       "title": "MPC earnings history and calendar (quoteSummary: earningsHistory, calendarEvents, earnings)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/v10/finance/quoteSummary/MPC?modules=earningsHistory,calendarEvents,earnings"
      },
      {
       "id": 4,
       "title": "Marathon Petroleum Corp. Reports Third-Quarter 2026 Results (Form 8-K Exhibit 99.1)",
       "publisher": "Marathon Petroleum / SEC EDGAR",
       "date": "2026-11-03",
       "url": "https://www.sec.gov/Archives/edgar/data/0001510295/000151029526000069/mpcq32026earningsrelease.htm"
      },
      {
       "id": 5,
       "title": "Marathon Petroleum (MPC) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-11-03",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/11/03/marathon-petroleum-mpc-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 6,
       "title": "Earnings call transcript: Marathon Petroleum tops Q3 2026 estimates",
       "publisher": "Investing.com",
       "date": "",
       "url": "https://www.investing.com/news/transcripts/earnings-call-transcript-marathon-petroleum-tops-q3-2026-estimates-93CH-4996104"
      },
      {
       "id": 7,
       "title": "Marathon Petroleum Corp (MPC) Q3 2026 Earnings Call Highlights: Record 100% Refinery Utilization and $4.2 Billion Asset Sale Reshape Portfolio",
       "publisher": "GuruFocus",
       "date": "",
       "url": "https://www.gurufocus.com/news/9169014/marathon-petroleum-corp-mpc-q3-2026-earnings-call-highlights-record-100-refinery-utilization-and-42-billion-asset-sale-reshape-portfolio"
      }
     ]
    },
    {
     "name_kr": "필립스66",
     "name_en": "Phillips 66",
     "ticker": "PSX",
     "yahoo": "PSX",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1534701,
     "role_kr": "정제·미드스트림·화학(CPChem 지분법)·마케팅을 함께 운영하는 미국 통합 하류 기업이다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-28",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 정제 가동률은 98%이고 경유 수율은 41%로 3분기 기준 최대다. 중부(Central Corridor) 처리량은 848천 배럴/일로 최대다.",
       "src": [
        6
       ]
      },
      {
       "text": "정제 부문 세전이익은 60억 3,100만 달러로 전년 동기 -5억 1,800만 달러에서 흑자로 돌아섰다. 실현 정제마진은 배럴당 38.00달러, 청정제품 수율은 86%다(마진·수율은 발표 자료 요약 기사 기준).",
       "src": [
        5,
        7
       ]
      },
      {
       "text": "회사는 정제 조정 세전이익이 2분기보다 늘어난 원인으로 실현 마진과 물량 증가를 들었고, 정제 부문 특별항목은 세전 -2,900만 달러다.",
       "src": [
        4
       ]
      },
      {
       "text": "순이익은 56억 1,600만 달러로 2분기 약 38억 달러와 전년 동기 1억 3,300만 달러를 크게 웃돌았고, 전년 동기에는 자산손상 9억 5,100만 달러가 반영됐다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "EPS 14.08달러는 Yahoo 집계 컨센서스 11.79달러(추정치)보다 19% 높다.",
       "src": [
        3
       ]
      },
      {
       "text": "3분기 영업현금흐름은 73억 달러이며 부채를 20억 달러 줄였다(시장 매입 약 8억 달러). 회사는 부채 목표 170억 달러를 달성할 수 있다고 밝혔다.",
       "src": [
        8,
        9
       ]
      },
      {
       "text": "3분기 자사주 매입은 23억 6,200만 달러(전년 2억 6,600만 달러), 배당은 5억 400만 달러(주당 1.27달러)다. 2026년 두 번째 배당 인상으로 배당은 2025년 4분기보다 10.8% 높다.",
       "src": [
        1,
        8
       ]
      },
      {
       "text": "지분법이익은 5억 6,100만 달러로 전년 3억 3,700만 달러보다 66% 늘었고, 매출은 505억 4,000만 달러로 전년 대비 46% 늘었다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "50,540",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +46%",
       "src": 1
      },
      {
       "label": "지배주주 순이익",
       "value": "5,616",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 133",
       "src": 1
      },
      {
       "label": "희석 EPS",
       "value": "14.08",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 0.32달러",
       "src": 1
      },
      {
       "label": "정제 부문 세전이익",
       "value": "6,031",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 -518",
       "src": 5
      },
      {
       "label": "정제 가동률",
       "value": "98",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 6
      },
      {
       "label": "경유 수율",
       "value": "41",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "3분기 기준 최대",
       "src": 6
      },
      {
       "label": "중부(Central Corridor) 처리량",
       "value": "848",
       "unit": "천 배럴/일",
       "period": "2026년 3분기",
       "change": "최대",
       "src": 6
      },
      {
       "label": "실현 정제마진(요약 기사 기준)",
       "value": "38.00",
       "unit": "달러/배럴",
       "period": "2026년 3분기",
       "change": "",
       "src": 7
      },
      {
       "label": "청정제품 수율(요약 기사 기준)",
       "value": "86",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 7
      },
      {
       "label": "지분법이익",
       "value": "561",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +66%",
       "src": 1
      },
      {
       "label": "자사주 매입",
       "value": "2,362",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 266",
       "src": 1
      },
      {
       "label": "영업현금흐름",
       "value": "12,276",
       "unit": "백만 달러",
       "period": "2026년 1~9월",
       "change": "전년 2,210",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "WRB 거래(우드리버·보저 정유공장)에서 연 5천만 달러 이상의 단기 운영·상업 시너지를 달성했다고 밝혔다.",
       "src": [
        8
       ]
      },
      {
       "text": "웨스턴 게이트웨이 프로젝트(필립스66 몫 25억 달러)로 설비투자가 이전 수준보다 늘어난다.",
       "src": [
        9
       ]
      },
      {
       "text": "미드스트림 조정 EBITDA는 2020년대 말까지 연 한 자릿수 중반 성장을 예상하고, CPChem 골든트라이앵글·라스라판 석유화학 프로젝트는 2027년 전면 가동이 목표다.",
       "src": [
        8
       ]
      }
     ],
     "read_through": {
      "text": "미국 정제사는 경유 생산을 최대로 끌어올리고 있다. 필립스66은 가동률 98%에서 3분기 기준 최대 경유 수율 41%를 기록했다(필립스66 6).",
      "desk": "products"
     },
     "sources": [
      {
       "id": 1,
       "title": "Phillips 66 XBRL company facts (Form 10-Q, period ended 2026-09-30, accession 0001534701-26-000037)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-10-28",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001534701.json"
      },
      {
       "id": 2,
       "title": "Phillips 66 EDGAR filing index: Form 8-K Item 2.02 filed 2026-10-28",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-10-28",
       "url": "https://data.sec.gov/submissions/CIK0001534701.json"
      },
      {
       "id": 3,
       "title": "PSX earnings history and calendar (quoteSummary: earningsHistory, calendarEvents, earnings)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/v10/finance/quoteSummary/PSX?modules=earningsHistory,calendarEvents,earnings"
      },
      {
       "id": 4,
       "title": "Phillips 66 third-quarter 2026 earnings release (Form 8-K Exhibit 99.1)",
       "publisher": "Phillips 66 / SEC EDGAR",
       "date": "2026-10-28",
       "url": "https://www.sec.gov/Archives/edgar/data/0001534701/000153470126000035/psx-2026930_ex991.htm"
      },
      {
       "id": 5,
       "title": "Phillips 66 Form 10-Q for the quarter ended September 30, 2026",
       "publisher": "SEC EDGAR",
       "date": "2026-10-28",
       "url": "https://www.sec.gov/Archives/edgar/data/0001534701/000153470126000037/psx-20260930.htm"
      },
      {
       "id": 6,
       "title": "Phillips 66 Reports Third-Quarter Results: Delivers 98% Refining Utilization and Strong Midstream Volumes",
       "publisher": "Phillips 66",
       "date": "2026-10-28",
       "url": "https://investor.phillips66.com/financial-information/news-releases/news-release-details/2026/Phillips-66-Reports-Third-Quarter-Results-Delivers-98-Refining-Utilization-and-Strong-Midstream-Volumes/default.aspx"
      },
      {
       "id": 7,
       "title": "Phillips 66 Q3 2026 slides: record refining margins drive earnings",
       "publisher": "Investing.com",
       "date": "",
       "url": "https://in.investing.com/news/stock-market-news/phillips-66-q3-2026-slides-record-refining-margins-drive-earnings-93CH-5661428"
      },
      {
       "id": 8,
       "title": "Phillips 66 (PSX) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-28",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/28/phillips-66-psx-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 9,
       "title": "Earnings call transcript: Phillips 66 tops Q3 2026 EPS forecast as cash flow jumps",
       "publisher": "Investing.com",
       "date": "",
       "url": "https://www.investing.com/news/transcripts/earnings-call-transcript-phillips-66-tops-q3-2026-eps-forecast-as-cash-flow-jumps-93CH-4980349"
      }
     ]
    },
    {
     "name_kr": "PBF에너지",
     "name_en": "PBF Energy Inc.",
     "ticker": "PBF",
     "yahoo": "PBF",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1534504,
     "role_kr": "미국 동부·중서부·걸프·캘리포니아에 정제설비를 둔 독립 정유사로 대서양 연안 제품 수급에 노출이 크다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-29",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 처리량은 923.8천 배럴/일로 전년 대비 6% 늘어 회사 가이던스에 부합했다. 마르티네즈 수소화분해공정 정기보수는 9월 시작해 10월 계획대로 끝났다.",
       "src": [
        4,
        6
       ]
      },
      {
       "text": "정제 총마진은 29억 3,750만 달러, 처리 배럴당 34.56달러로 전년 9.00달러의 3.8배다. 연결 총마진은 배럴당 25.54달러이며, 회사는 크랙 강세와 지정학 요인에 따른 일부 원유 디퍼런셜 개선을 원인으로 들었다.",
       "src": [
        5
       ]
      },
      {
       "text": "3분기 평균 뉴욕항 2-1-1 크랙은 배럴당 64.77달러, WTI(시카고) 4-3-1 크랙은 54.64달러다. 회사는 강한 제품 시장과 빠듯한 공급을 실적 배경으로 들었다.",
       "src": [
        5,
        7
       ]
      },
      {
       "text": "영업이익은 21억 90만 달러로 전년 2억 8,590만 달러의 7.3배다. 순이익은 15억 2,930만 달러(희석 EPS 12.54달러)이고 조정 EPS 12.78달러는 Yahoo 집계 컨센서스 11.11달러(추정치)를 15% 웃돌았다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "3분기 순차입금을 12억 달러 넘게, 연초 이후 20억 달러 넘게 줄여 분기 말 순현금 4억 2,600만 달러(현금 25억 달러, 총차입금 21억 달러)를 기록했다.",
       "src": [
        7,
        8
       ]
      },
      {
       "text": "배당은 18% 올린 분기 주당 0.325달러로 결정했고, 주요 정기보수는 일정과 예산 안에 끝났다.",
       "src": [
        4,
        7
       ]
      },
      {
       "text": "2025년 말 3억 1,300만 달러였던 재고 평가조정액은 제품가격 상승으로 9월 말 0으로 소멸했다. 1~9월 영업현금흐름은 31억 4,280만 달러(전년 -4억 4,460만 달러)다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "12,132.8",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +59%",
       "src": 1
      },
      {
       "label": "영업이익",
       "value": "2,100.9",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 285.9 대비 7.3배",
       "src": 1
      },
      {
       "label": "지배주주 순이익",
       "value": "1,529.3",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 170.1",
       "src": 1
      },
      {
       "label": "희석 EPS",
       "value": "12.54",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 1.45달러",
       "src": 1
      },
      {
       "label": "처리량",
       "value": "923.8",
       "unit": "천 배럴/일",
       "period": "2026년 3분기",
       "change": "전년 대비 +6%",
       "src": 6
      },
      {
       "label": "정제 총마진",
       "value": "2,937.5",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "정제 총마진(처리 배럴당)",
       "value": "34.56",
       "unit": "달러/배럴",
       "period": "2026년 3분기",
       "change": "전년 9.00달러",
       "src": 5
      },
      {
       "label": "연결 총마진(처리 배럴당)",
       "value": "25.54",
       "unit": "달러/배럴",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "뉴욕항 2-1-1 크랙(벤치마크)",
       "value": "64.77",
       "unit": "달러/배럴",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "순현금(분기 말)",
       "value": "426",
       "unit": "백만 달러",
       "period": "2026-09-30",
       "change": "",
       "src": 7
      },
      {
       "label": "유형자산 취득",
       "value": "594.9",
       "unit": "백만 달러",
       "period": "2026년 1~9월",
       "change": "전년 대비 +43%",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "4분기 총처리량은 925~985천 배럴/일로 3분기 923.8천 배럴/일보다 많다.",
       "src": [
        4,
        6
       ]
      },
      {
       "text": "최근 차환 효과로 2027년 이자비용이 최소 1억 3,000만 달러 줄어든다고 밝혔다.",
       "src": [
        7,
        8
       ]
      }
     ],
     "read_through": {
      "text": "미국 동부 정제 마진은 3분기에 높았다. 3분기 평균 뉴욕항 2-1-1 크랙은 배럴당 64.77달러, PBF의 처리 배럴당 정제 총마진은 34.56달러(전년 9.00달러)다. PBF는 4분기 처리량을 925~985천 배럴/일로 늘린다(PBF 4)(PBF 5).",
      "desk": "products"
     },
     "sources": [
      {
       "id": 1,
       "title": "PBF Energy XBRL company facts (Form 10-Q, period ended 2026-09-30, accession 0001534504-26-000041)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-10-29",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001534504.json"
      },
      {
       "id": 2,
       "title": "PBF Energy EDGAR filing index: Form 8-K Item 2.02 filed 2026-10-29",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-10-29",
       "url": "https://data.sec.gov/submissions/CIK0001534504.json"
      },
      {
       "id": 3,
       "title": "PBF earnings history and calendar (quoteSummary: earningsHistory, calendarEvents, earnings)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/v10/finance/quoteSummary/PBF?modules=earningsHistory,calendarEvents,earnings"
      },
      {
       "id": 4,
       "title": "PBF Energy Announces Third Quarter 2026 Results, Declares Dividend of $0.325 per Share",
       "publisher": "PBF Energy (PR Newswire)",
       "date": "2026-10-29",
       "url": "https://www.prnewswire.com/news-releases/pbf-energy-announces-third-quarter-2026-results-declares-dividend-of-0-325-per-share-302923043.html"
      },
      {
       "id": 5,
       "title": "PBF Energy Inc. Form 10-Q for the quarter ended September 30, 2026",
       "publisher": "SEC EDGAR",
       "date": "2026-10-29",
       "url": "https://www.sec.gov/Archives/edgar/data/0001534504/000153450426000041/pbf-20260930.htm"
      },
      {
       "id": 6,
       "title": "PBF Energy 3Q 2026: Revenue $12.13B, Net income $1.53B, EPS $12.54 — 10-Q Summary",
       "publisher": "TradingView News",
       "date": "",
       "url": "https://www.tradingview.com/news/tradingview:ffb37c68988e0:0-pbf-energy-3q-2026-revenue-12-13b-net-income-1-53b-eps-12-54-10-q-summary/"
      },
      {
       "id": 7,
       "title": "Earnings call transcript: PBF Energy tops Q3 2026 estimates as refining boom lifts results",
       "publisher": "Investing.com",
       "date": "",
       "url": "https://uk.investing.com/news/stock-market-news/earnings-call-transcript-pbf-energy-tops-q3-2026-estimates-as-refining-boom-lifts-results-93CH-4942338"
      },
      {
       "id": 8,
       "title": "Q3 2026 PBF Energy Inc. Earnings Call Transcript",
       "publisher": "GuruFocus",
       "date": "",
       "url": "https://www.gurufocus.com/news/9152148/q3-2026-pbf-energy-inc-earnings-call-transcript"
      }
     ]
    },
    {
     "name_kr": "HF싱클레어",
     "name_en": "HF Sinclair Corporation",
     "ticker": "DINO",
     "yahoo": "DINO",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1915657,
     "role_kr": "미국 내륙(로키·미드컨티넨트)·남서부 정제설비와 윤활유·재생디젤·미드스트림 사업을 운영하는 정유사다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-28",
     "status": "reported",
     "highlights": [
      {
       "text": "조정 정제 총마진은 판매 배럴당 54.22달러로 전년 19.16달러의 2.8배(+183%)다. 정제 부문 조정 EBITDA는 25억 8,200만 달러(전년 6억 6,100만 달러)다.",
       "src": [
        4
       ]
      },
      {
       "text": "원유 처리량은 614.06천 배럴/일로 전년 639.05천 배럴/일보다 적었고 엘도라도 정유공장 계획 정기보수가 일부 원인이다.",
       "src": [
        4,
        7
       ]
      },
      {
       "text": "이익에는 EPA 소규모 정유시설 면제(SRE)에 따른 RIN 관련 이익 5억 8,200만 달러가 반영됐다. 한 요약은 이를 과거 적립 비용의 비현금 환입으로 설명했다.",
       "src": [
        7,
        8
       ]
      },
      {
       "text": "영업이익은 26억 7,200만 달러(전년 5억 6,400만 달러의 4.7배), 지배주주 순이익은 20억 1,500만 달러이고 조정 순이익은 약 21억 달러(주당 11.75달러, 전년 4억 5,900만 달러·2.44달러)다.",
       "src": [
        1,
        7
       ]
      },
      {
       "text": "조정 EPS 11.75달러는 Yahoo 집계 컨센서스 7.83달러(추정치)보다 50% 높다.",
       "src": [
        3
       ]
      },
      {
       "text": "3분기 배당 9,300만 달러와 자사주 매입 4억 7,900만 달러로 5억 7,200만 달러를 환원했고 목표 환원율 50%를 유지했다.",
       "src": [
        7
       ]
      },
      {
       "text": "재생연료 판매는 6,300만 갤런으로 전년 5,700만 갤런보다 늘었고, 윤활유·특수제품 부문 FIFO 이익은 2,200만 달러(전년 200만 달러)다.",
       "src": [
        7
       ]
      },
      {
       "text": "회사는 운송연료 공급 부족과 높은 크랙을 실적 배경으로 들었고, 정제 운영비는 촉매·화학약품 중심의 인플레이션 압력으로 전분기보다 늘었다고 설명했다.",
       "src": [
        4,
        6
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "10,857",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +50%",
       "src": 1
      },
      {
       "label": "영업이익",
       "value": "2,672",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 564 대비 4.7배",
       "src": 1
      },
      {
       "label": "지배주주 순이익",
       "value": "2,015",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 403",
       "src": 1
      },
      {
       "label": "조정 EPS",
       "value": "11.75",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 2.44달러",
       "src": 7
      },
      {
       "label": "원유 처리량",
       "value": "614.06",
       "unit": "천 배럴/일",
       "period": "2026년 3분기",
       "change": "전년 639.05",
       "src": 4
      },
      {
       "label": "조정 정제 총마진(판매 배럴당)",
       "value": "54.22",
       "unit": "달러/배럴",
       "period": "2026년 3분기",
       "change": "전년 19.16달러(+183%)",
       "src": 4
      },
      {
       "label": "정제 부문 조정 EBITDA",
       "value": "2,582",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 661",
       "src": 4
      },
      {
       "label": "RIN 면제(SRE) 관련 이익",
       "value": "582",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "재생연료 판매량",
       "value": "63",
       "unit": "백만 갤런",
       "period": "2026년 3분기",
       "change": "전년 57",
       "src": 7
      },
      {
       "label": "설비투자",
       "value": "137",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 121",
       "src": 1
      },
      {
       "label": "자사주 매입(회사 발표)",
       "value": "479",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 7
      },
      {
       "label": "현금성자산(9월 말)",
       "value": "3,333",
       "unit": "백만 달러",
       "period": "2026-09-30",
       "change": "2025년 말 978",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "4분기 원유 처리량 가이던스는 560~600천 배럴/일로 엘도라도 정유공장 계획 정기보수 완료를 반영한다.",
       "src": [
        5
       ]
      },
      {
       "text": "경영진은 지정학적 공급 차질과 중국의 석유제품 수출 축소로 시장 긴장이 2028년까지 이어진다고 전망했다.",
       "src": [
        7
       ]
      },
      {
       "text": "스티븐 레드베터가 1월부터 CEO를 맡고, 웨스트라인 커넥트 프로젝트의 최종투자결정은 2027년 1분기로 예상한다.",
       "src": [
        7
       ]
      }
     ],
     "read_through": {
      "text": "미국 내륙 정제 마진은 3분기에 전년의 2.8배였다. HF싱클레어 조정 정제 총마진은 판매 배럴당 54.22달러(전년 19.16달러)다. 3분기 이익에는 RIN 면제 이익 5억 8,200만 달러가 반영됐다(HF싱클레어 4)(HF싱클레어 7).",
      "desk": "products"
     },
     "sources": [
      {
       "id": 1,
       "title": "HF Sinclair XBRL company facts (Form 10-Q, period ended 2026-09-30, accession 0001915657-26-000074)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-10-28",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001915657.json"
      },
      {
       "id": 2,
       "title": "HF Sinclair EDGAR filing index: Form 8-K Item 2.02 filed 2026-10-28",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-10-28",
       "url": "https://data.sec.gov/submissions/CIK0001915657.json"
      },
      {
       "id": 3,
       "title": "DINO earnings history and calendar (quoteSummary: earningsHistory, calendarEvents, earnings)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query1.finance.yahoo.com/v10/finance/quoteSummary/DINO?modules=earningsHistory,calendarEvents,earnings"
      },
      {
       "id": 4,
       "title": "HF Sinclair Reports 2026 Third Quarter Results and Announces Regular Cash Dividend (Form 8-K Exhibit 99.1)",
       "publisher": "HF Sinclair / SEC EDGAR",
       "date": "2026-10-28",
       "url": "https://www.sec.gov/Archives/edgar/data/0001915657/000191565726000071/dinoex99109-30x2026.htm"
      },
      {
       "id": 5,
       "title": "HF Sinclair Form 10-Q for the quarter ended September 30, 2026",
       "publisher": "SEC EDGAR",
       "date": "2026-10-28",
       "url": "https://www.sec.gov/Archives/edgar/data/0001915657/000191565726000074/dino-20260930.htm"
      },
      {
       "id": 6,
       "title": "HF Sinclair (DINO) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-28",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/28/hf-sinclair-dino-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 7,
       "title": "HF Sinclair Corp (DINO) (Q3 2026) Earnings Call Highlights: Record Refining Margins Drive $2.1 Billion Adjusted Net Income",
       "publisher": "Yahoo Finance (GuruFocus)",
       "date": "",
       "url": "https://finance.yahoo.com/energy/articles/hf-sinclair-corp-dino-q3-010613205.html"
      },
      {
       "id": 8,
       "title": "HF Sinclair Q3 Earnings Call Highlights",
       "publisher": "MarketBeat",
       "date": "2026-10-28",
       "url": "https://www.marketbeat.com/instant-alerts/transcript-hf-sinclair-q3-earnings-call-highlights-2026-10-28/"
      }
     ]
    },
    {
     "name_kr": "에쓰오일",
     "name_en": "S-Oil Corporation",
     "ticker": "010950",
     "yahoo": "010950.KS",
     "exchange": "KRX KOSPI",
     "country": "한국",
     "cik": null,
     "role_kr": "사우디 아람코가 최대주주인 울산 정유·석유화학·윤활기유 단지 운영사로 제품 수출 비중이 높다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-02",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 영업이익은 1조 4,067억 원(전년 대비 +513.7%, 전분기 대비 +45.8%), 매출은 11조 9,687억 원(전년 대비 +42.2%), 순이익은 1조 4,356억 원(전분기 대비 +179.0%)이다.",
       "src": [
        1,
        2,
        3
       ]
      },
      {
       "text": "윤활 영업이익은 7,427억 원으로 분기 최대이며 전체 이익의 절반을 차지했다. 중동 생산 차질과 물류 제약 장기화로 그룹3 윤활기유 스프레드가 올랐다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "정유 부문 영업이익은 6,904억 원(매출 9조 647억 원)이며, 중동 지정학 긴장에 따른 원유가 급등과 주요 정제시설 가동 차질 장기화로 정제마진이 높게 유지됐다.",
       "src": [
        2,
        3
       ]
      },
      {
       "text": "3분기 원유정제시설(CDU) 가동률은 81%였고 정기보수 이후 현재 약 90%로 높아졌다.",
       "src": [
        1,
        2,
        3
       ]
      },
      {
       "text": "석유화학 부문은 264억 원 영업손실로 3개 부문 중 유일하게 적자다.",
       "src": [
        2,
        3
       ]
      },
      {
       "text": "회사는 환율 급락(원화 강세) 악재에도 중동 정세 불안에 따른 유가 상승과 수출 정제마진·윤활 스프레드 호조가 실적을 이끌었다고 설명했다.",
       "src": [
        6,
        7
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "119,687",
       "unit": "억 원",
       "period": "2026년 3분기",
       "change": "전년 대비 +42.2%",
       "src": 3
      },
      {
       "label": "영업이익",
       "value": "14,067",
       "unit": "억 원",
       "period": "2026년 3분기",
       "change": "전년 대비 +513.7%",
       "src": 3
      },
      {
       "label": "순이익",
       "value": "14,356",
       "unit": "억 원",
       "period": "2026년 3분기",
       "change": "전분기 대비 +179.0%",
       "src": 1
      },
      {
       "label": "정유 부문 영업이익",
       "value": "6,904",
       "unit": "억 원",
       "period": "2026년 3분기",
       "change": "",
       "src": 2
      },
      {
       "label": "정유 부문 매출",
       "value": "90,647",
       "unit": "억 원",
       "period": "2026년 3분기",
       "change": "",
       "src": 2
      },
      {
       "label": "윤활 부문 영업이익",
       "value": "7,427",
       "unit": "억 원",
       "period": "2026년 3분기",
       "change": "분기 최대",
       "src": 1
      },
      {
       "label": "석유화학 부문 영업이익",
       "value": "-264",
       "unit": "억 원",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      },
      {
       "label": "CDU 가동률",
       "value": "81",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "현재 약 90%",
       "src": 2
      }
     ],
     "guidance": [
      {
       "text": "회사는 주요 정유제품 글로벌 재고가 낮고 난방유 수요 성수기에 들어서 4분기에도 양호한 정제마진이 이어진다고 봤다.",
       "src": [
        2,
        3,
        5
       ]
      },
      {
       "text": "윤활기유 수급은 내년까지 빠듯하고 중동산 윤활기유 공급이 정상화될 때까지 양호한 실적이 이어진다고 전망했다.",
       "src": [
        4,
        6,
        7
       ]
      },
      {
       "text": "샤힌 프로젝트는 주요 설비 순차 시운전을 진행 중이며 2027년 초 가동 개시가 목표다.",
       "src": [
        5,
        6,
        7
       ]
      }
     ],
     "read_through": {
      "text": "아시아 정제마진은 4분기에도 높게 유지될 가능성이 크다. 에쓰오일은 낮은 글로벌 제품 재고와 난방유 성수기를 근거로 4분기 양호한 정제마진을 전망했다. CDU 가동률을 3분기 81%에서 약 90%로 올려 4분기 제품 생산은 3분기보다 늘어날 전망이다(에쓰오일 2)(에쓰오일 3).",
      "desk": "products"
     },
     "sources": [
      {
       "id": 1,
       "title": "에쓰오일, 3분기 영업익 1.4조…윤활 부문이 절반 벌었다",
       "publisher": "머니투데이방송(MTN)",
       "date": "2026-11-02",
       "url": "https://news.mtn.co.kr/article/2026110218014931213"
      },
      {
       "id": 2,
       "title": "에쓰오일, 윤활·정유 '쌍끌이'…3분기 영업이익 1.4조(종합)",
       "publisher": "글로벌이코노믹",
       "date": "2026-11-02",
       "url": "https://www.g-enews.com/article/Industry/2026/11/20261102153037274224debea800_1"
      },
      {
       "id": 3,
       "title": "중동발 공급 불안 견딘 에쓰오일… 3분기 영업익 1조4067억원",
       "publisher": "아시아경제",
       "date": "2026-11-02",
       "url": "https://view.asiae.co.kr/article/2026110215150739448"
      },
      {
       "id": 4,
       "title": "에쓰오일, 윤활 '잭팟'에 영업익 514%↑…\"정제마진 당분간 강세\"(종합)",
       "publisher": "데일리안",
       "date": "",
       "url": "https://www.dailian.co.kr/news/view/1709691/%EC%97%90%EC%93%B0%EC%98%A4%EC%9D%BC-%EC%9C%A4%ED%99%9C-%EC%9E%AD%ED%8C%9F-%EC%98%81%EC%97%85%EC%9D%B5-514%EC%A0%95%EC%A0%9C-2026"
      },
      {
       "id": 5,
       "title": "에쓰오일, 정유·윤활 호조에 3Q 영업익 1.4조원… 내년 샤힌 가동",
       "publisher": "비즈트리뷴",
       "date": "",
       "url": "https://www.biztribune.co.kr/news/articleView.html?idxno=361771"
      },
      {
       "id": 6,
       "title": "에쓰오일, 3분기 영업이익 1조 4067억…\"유가·정제마진 호조 견인\"",
       "publisher": "베타뉴스",
       "date": "2026-11-02",
       "url": "https://www.betanews.net/article/view/beta202611020105"
      },
      {
       "id": 7,
       "title": "에쓰오일, 3분기 영업이익 1.4조원 돌파",
       "publisher": "비즈니스코리아",
       "date": "",
       "url": "https://www.businesskorea.co.kr/news/articleView.html?idxno=280231"
      }
     ]
    },
    {
     "name_kr": "SK이노베이션",
     "name_en": "SK Innovation Co., Ltd.",
     "ticker": "096770",
     "yahoo": "096770.KS",
     "exchange": "KRX KOSPI",
     "country": "한국",
     "cik": null,
     "role_kr": "SK에너지·SK인천석유화학을 통해 국내 최대 정제설비를 운영하는 지주회사로, 연결 실적에 배터리(SK온)·LNG·발전 사업이 함께 잡힌다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-29",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 영업이익은 3조 7,043억 원으로 전년 동기 대비 532.5% 늘어 분기 최대를 기록했고, 매출은 28조 7,738억 원(+39.7%), 순이익은 2조 6,413억 원으로 흑자 전환했다.",
       "src": [
        1,
        3,
        5,
        7
       ]
      },
      {
       "text": "SK에너지 영업이익은 1조 2,058억 원으로 전분기보다 5,546억 원 늘었다. 중동 정유설비 가동률 저하와 러시아 경유 수출 제한에 따른 제품 공급 감소, 여름철 수송용 연료 수요가 정제마진을 끌어올렸다.",
       "src": [
        1,
        2,
        3
       ]
      },
      {
       "text": "석유제품 수출마진이 강했고 2분기 정기보수를 마친 설비의 가동량이 늘었다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "윤활유(SK엔무브) 영업이익은 1조 906억 원으로 한 분기 만에 과거 연간 최대치를 넘었고, SK지오센트릭(화학)은 867억 원으로 전분기보다 430억 원 늘었다.",
       "src": [
        3,
        6
       ]
      },
      {
       "text": "SK이노베이션 E&S 영업이익은 7,744억 원이고, SK온은 전분기 일회성 이익 소멸과 판매량 감소로 805억 원 영업손실을 냈다.",
       "src": [
        3,
        6
       ]
      },
      {
       "text": "주영규 SK에너지 경영기획실장은 컨퍼런스콜에서 OSP가 크게 내렸고 정제마진은 매우 강하지만 운임이 크게 올랐다고 설명했다.",
       "src": [
        2,
        4
       ]
      },
      {
       "text": "회사는 주주환원보다 재무안정을 우선한다고 밝혔다. 3분기 말 차입금은 33조 1,000억 원으로 2025년 말보다 5조 8,000억 원 줄었다.",
       "src": [
        4
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "287,738",
       "unit": "억 원",
       "period": "2026년 3분기",
       "change": "전년 대비 +39.7%",
       "src": 1
      },
      {
       "label": "영업이익",
       "value": "37,043",
       "unit": "억 원",
       "period": "2026년 3분기",
       "change": "전년 대비 +532.5%",
       "src": 1
      },
      {
       "label": "순이익",
       "value": "26,413",
       "unit": "억 원",
       "period": "2026년 3분기",
       "change": "흑자 전환",
       "src": 3
      },
      {
       "label": "석유사업(SK에너지) 영업이익",
       "value": "12,058",
       "unit": "억 원",
       "period": "2026년 3분기",
       "change": "전분기 대비 +5,546억 원",
       "src": 1
      },
      {
       "label": "윤활유(SK엔무브) 영업이익",
       "value": "10,906",
       "unit": "억 원",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      },
      {
       "label": "화학(SK지오센트릭) 영업이익",
       "value": "867",
       "unit": "억 원",
       "period": "2026년 3분기",
       "change": "전분기 대비 +430억 원",
       "src": 6
      },
      {
       "label": "SK이노베이션 E&S 영업이익",
       "value": "7,744",
       "unit": "억 원",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      },
      {
       "label": "SK온 영업이익",
       "value": "-805",
       "unit": "억 원",
       "period": "2026년 3분기",
       "change": "적자 전환",
       "src": 3
      },
      {
       "label": "차입금(3분기 말)",
       "value": "331,000",
       "unit": "억 원",
       "period": "2026-09-30",
       "change": "2025년 말 대비 -58,000억 원",
       "src": 4
      }
     ],
     "guidance": [
      {
       "text": "회사는 4분기 도입 원유가 낮은 OSP와 어느 정도 제한된 운임으로 들어와 유가 급락이 없는 한 정유사업이 견조한 실적을 유지한다고 설명했다.",
       "src": [
        2,
        4
       ]
      },
      {
       "text": "주요국의 석유제품 수출 제한, 정유설비 정기보수, 동절기 수요 증가가 4분기 시황을 받칠 것으로 전망했다.",
       "src": [
        2,
        4
       ]
      },
      {
       "text": "2027년 석유시장은 중동 추가 확전과 협상을 통한 안정화 가능성이 모두 열려 있어 유가·정제마진 변동성이 이어지고, 사태가 길어질수록 재고·생산으로 공급 충격을 흡수할 여력이 줄어든다고 봤다.",
       "src": [
        2
       ]
      }
     ],
     "read_through": {
      "text": "아시아 정제마진 강세는 4분기에도 이어질 가능성이 크다. SK에너지 석유사업 영업이익은 1조 2,058억 원으로 전분기보다 5,546억 원 늘었고, 회사는 낮은 OSP와 주요국 수출 제한·동절기 수요를 근거로 4분기 견조한 실적을 전망했다(SK이노베이션 1)(SK이노베이션 2).",
      "desk": "products"
     },
     "sources": [
      {
       "id": 1,
       "title": "SK이노베이션, 석유 수출마진·윤활유 '쌍끌이'…3분기 영업익 3조7043억원",
       "publisher": "아시아경제",
       "date": "2026-10-29",
       "url": "https://view.asiae.co.kr/article/2026102911264115632"
      },
      {
       "id": 2,
       "title": "SK이노 \"연말까지 정유사업 견조한 실적 기대\"",
       "publisher": "파이낸셜뉴스",
       "date": "2026-10-29",
       "url": "https://www.fnnews.com/news/202610291817114267"
      },
      {
       "id": 3,
       "title": "석유 공급난에 영업익 6배…SK이노베이션 '3.7조 잭팟'",
       "publisher": "비즈워치",
       "date": "2026-10-29",
       "url": "https://news.bizwatch.co.kr/article/industry/2026/10/29/0022"
      },
      {
       "id": 4,
       "title": "SK이노 \"4분기도 정유 호조\"…주주환원은 재무안정 우선 [종합2보]",
       "publisher": "파이낸셜뉴스",
       "date": "2026-10-29",
       "url": "https://www.fnnews.com/news/202610291538581477"
      },
      {
       "id": 5,
       "title": "SK이노, 3Q 영업익 3.7조 '역대 최대'…석유·윤활유 실적 견인 [종합]",
       "publisher": "파이낸셜뉴스",
       "date": "2026-10-29",
       "url": "https://www.fnnews.com/news/202610291418099934"
      },
      {
       "id": 6,
       "title": "SK이노, 중동발 특수에 역대 최대 이익…내년 정유·배터리 시험대",
       "publisher": "ZDNet Korea",
       "date": "2026-10-29",
       "url": "https://zdnet.co.kr/view/?no=20261029120007"
      },
      {
       "id": 7,
       "title": "SK이노베이션, 3분기 영업익 3조7043억원…정유·윤활유 호조",
       "publisher": "데일리안",
       "date": "",
       "url": "https://www.dailian.co.kr/news/view/1707928/SK%EC%9D%B4%EB%85%B8%EB%B2%A0%EC%9D%B4%EC%85%98-3%EB%B6%84%EA%B8%B0-%EC%98%81%EC%97%85%EC%9D%B5-3%EC%A1%B070-2026"
      }
     ]
    }
   ]
  },
  {
   "id": "asia_refining",
   "title": "아시아 정유(중국·인도·일본)",
   "position": "원유를 들여와 휘발유·경유·항공유와 나프타 등 석유화학 원료로 바꾸는 정제 단계로, 이익은 원유가격 자체보다 제품 크랙과 재고평가에 좌우되며 중국은 수출쿼터로 역내 제품 공급량을 조절한다.",
   "summary": [
    "중국은 2026년 휘발유·경유·항공유 수출쿼터 총량을 4차 할당으로 늘려 4분기 아시아 제품 공급 여력을 열었다. 1차 1,900만 톤(2025년 12월, 로이터 인용 Hydrocarbon Processing)에 2차 1,300만 톤(2026-06, OPIS·Global Trade Alert), 3차 455만 톤(2026-10-09, Global Trade Alert), 4차 약 400만 톤(2026-10-28, 모스크바타임스 소식통 인용)이 더해져 연간 누계는 같은 보도 기준 약 4,000만 톤(전년 수준)이 됐다. 로이터는 4차 할당 뒤 연간 합산 허용량을 4,200만 톤(전년 대비 +6%)으로 전했다.",
    "1차 쿼터 1,900만 톤 가운데 1,376만 톤(70% 이상)이 시노펙·CNPC에 배정됐고 롱성 계열 저장석유화학(ZPC)은 156만 톤을 받았다(로이터 인용 Hydrocarbon Processing, 2025-12).",
    "중동 전쟁(호르무즈 위기)은 상반기 중국의 정제와 제품 수출을 함께 끌어내렸다. 당국은 3월 초 신규 제품 수출 계약 중단을 지시했다가(Business Today, 2026-03-05) 4월 30일에야 국영사의 일부 아시아향 수출을 허용했다(The Star, 2026-04-30). 4월 원유 처리량은 5,465만 톤으로 전년 대비 5.8% 줄어 2022년 8월 이후 최저였다(Tank Terminals, 2026-05).",
    "수출 재개 뒤 경유가 가장 강하게 반등했다. 9월 경유 수출은 185만 톤으로 전년 대비 262.3% 늘어 2023년 2월 이후 최대였고, 항공유 194만 톤(+16.7%)과 휘발유 62만 톤(-4.1%)을 합친 3대 제품 수출은 441만 톤(+56%)이었다(해관총서, 로이터 인용 The Edge Malaysia 2026-10-18·OilMonster 2026-10-19).",
    "연간 누계는 상반기 공백을 메우지 못했다. 1~9월 휘발유 수출은 304만 톤(-51.9%), 항공유는 1,370만 톤(-11%)이었다(해관총서, 2026-10-18~19 보도). 10월 3대 제품 수출 물량은 약 370만 톤으로 전월보다 적을 것으로 예상됐다(S&P Global, 2026-10-09).",
    "정제 가동은 바닥을 지났지만 전년 수준을 크게 밑돈다. 9월 원유 처리량은 전년 대비 8.4% 줄었으나 일평균 기준 전월 대비 0.6% 늘어 3개월 연속 증가했고, 9월 원유 수입은 전년 대비 21.5% 감소했다(국가통계국·해관총서, 로이터 인용 Investing.com 2026-10-19·Energy Intelligence 2026-10).",
    "산둥 독립계(티팟) 정유사는 원유 조달난과 마진 악화로 2017년 이후 최저 가동 구간에 있다. 산둥 평균 가동률은 5월 초 약 50%로 한 달 전 약 55%에서 떨어졌고(Tank Terminals, 2026-05), JLC 집계로 50.5%까지 내려가 2017년 8월 이후 최저를 기록했다(블룸버그 인용 OilPrice, 2026-06). 9월에는 할인 원유 공급 축소로 10월 감산 위험이 제기됐다(Lloyd's List, 2026-09).",
    "경유 내수는 트럭 전동화로 구조적 감소 국면이다. 9월 중국 대형(重卡) 트럭 판매의 50.3%가 전기트럭이었고 1~9월 비중은 38.1%로 2025년 28.9%에서 높아졌다(Electrek, 2026-11-02).",
    "LNG 트럭도 전기트럭에 밀려 경유 대체의 주역이 바뀌었다. LNG 트럭의 대형트럭 등록 비중은 3월 37%에서 7월 11%로 떨어지고 전기트럭은 23%에서 47%로 올랐다. Kpler는 2026년 중국 경유 수요가 약 23만 b/d 줄고 도로연료 대체 규모가 130만 b/d에 이를 것으로 추정했다(Kpler 공개 블로그, 2026-09-08).",
    "시노펙은 1~9월 국내 정제유 소비가 신에너지 대체 가속으로 8.6% 줄었다고 밝혔고(The Standard, 2026-10), 시노펙 경제기술연구원은 2026년 중국 석유 수요가 8.9% 감소할 것으로 전망했다(EnergyNow, 2026-09).",
    "인도는 유럽 경유 공백을 메우는 스윙 공급자다. 9월 인도 경유 수출은 약 62만 b/d로 1년 만에 최대였고 유럽향 선적이 급증했다(Kpler·Vortexa·LSEG 선적 자료, Angel One 2026-10).",
    "릴라이언스는 7~9월 경유 크랙이 전년 대비 3.5배, 항공유 3.7배, 휘발유 3배였고 글로벌 휘발유·경유 재고가 5년 평균보다 6~10% 낮다고 밝혔다(릴라이언스 FY27 2분기 IR 자료, 2026-10-30)."
   ],
   "open_items": [
    "중국 2차 수출쿼터 규모가 출처별로 다르다(OPIS·Global Trade Alert 1,300만 톤 vs ValueTheMarkets·L'Economiste Maghrébin 1,800만 톤). 10월 28일 보도의 연간 약 4,000만 톤과의 합산 정합성은 1,300만 톤 쪽이 높지만(1~4차 합 약 4,055만 톤, 1,800만 톤이면 약 4,555만 톤, 계산) 확정하지 못했다.",
    "3차(455만 톤, Global Trade Alert)·4차(약 400만 톤, 모스크바타임스 러시아어 보도) 쿼터의 기업별 배분과 로이터 영문 원문은 확인하지 못했다.",
    "9월 원유 처리량 절대치가 출처별로 다르다(로이터 인용 Investing.com 약 1,399만 b/d vs Energy Intelligence 1,404만 b/d). 톤 기준 원수치, 10월 NBS 처리량, 10월 해관 품목별 수출은 미확인이다.",
    "9월 정제유 총수출(선박유 포함) 716만 톤(+39.4%)은 업계 집계와 범위가 맞지 않아 제외했다.",
    "산둥 티팟 가동률의 10~11월 최신치(OilChem·Mysteel 주간 조사)는 유료 자료라 확인하지 못했다. JLC 50.5% 보도 시점(2026년 6월)은 기사 원문으로 확인하지 못했다.",
    "인도: 10월 경유 수출(약 70만 b/d, 13개월 최고)과 10월 유럽향 급감(7.5만 b/d) 보도는 게재 연도를 확인하지 못했다. 9월 유럽향 물량과 전월 대비 증가율(약 3배 vs +80%)은 출처별로 다르다. S&P Global의 9월 약 74만 b/d는 집계 범위(경유 vs 중간유분)를 확인하지 못했다.",
    "싱가포르 중간유분 재고(9월 846만 배럴, 10월 935만~988만 배럴)는 기사 게재 시점과 집계 시점을 확인하지 못했다. 싱가포르 경유 크랙의 달러/배럴 수준도 확인하지 못했다(릴라이언스의 전년 대비 배수만 확인).",
    "시노펙: CAS 기준 1~9월 순이익(389.9억 위안, +30%)과 3분기 순이익(133.6억 위안, +57.2%)은 2차 보도로만 확인된다. 본문 수치는 IFRS 기준이다. 3분기 단독 정제량, 국내 제품 판매량, 정제마진은 미확인이다.",
    "페트로차이나: 정제 부문 3분기 영업이익은 같은 증권사 노트 안에서 63억 위안(+31.4%)과 정제·화학 합산 31억 위안(-22.8%)으로 엇갈린다. 가공량 수치는 HKEX 공시 PDF 원문이 아닌 발췌로만 확인했고 1~9월 매출·순이익은 증권사 리포트 요약 기준이다.",
    "롱성·헝리: 수치는 공시 원문 대신 증권사 리포트 요약과 财联社·每日经济新闻 보도 기준이다. 원유 처리량, 가동률, 수출 물량은 미확인이며, 헝리 3분기 보고서 공시일은 10월 하순으로만 확인돼 발표일을 표시하지 않았다.",
    "릴라이언스: 그룹 EBITDA는 ₹62,409 crore와 ₹56,616 crore로 엇갈린다. 일부 매체의 순이익 ₹25,548 crore(+41%)는 지배주주 기준으로 보이나 확인하지 못했고, 크랙의 달러/배럴 수준은 IR 자료 본문을 열람하지 못해 미확인이다.",
    "ENEOS: FY2026 2분기(4~9월) 실적은 미발표이며 발표일도 확인하지 못했다(일부 실적 캘린더는 11월 6일로 표기했으나 발표 보도가 없다). 1분기 재고영향 분해치(2,874억 엔/1,952억 엔)는 개인 블로그 2차 자료이고, FilingReader(2026-06-18)의 JX금속 지분 매각 관련 8,600억 엔 수치는 가이던스와 맞지 않는다.",
    "이데미쓰코산(5019.T): FY2026 2분기는 미발표다. 1분기 영업이익 3,074.62억 엔과 연간 가이던스(금융비용 차감 전 세전이익 1,400억 엔 유지)가 2차 자료로만 확인되고 서로 맞지 않아 기업 목록에 넣지 않았다.",
    "1차 공시 PDF 원문은 직접 확인하지 못했다. 모든 수치는 요약 자료 기준이다."
   ],
   "companies": [
    {
     "name_kr": "시노펙(중국석유화공)",
     "name_en": "China Petroleum & Chemical Corp. (Sinopec)",
     "ticker": "0386",
     "yahoo": "0386.HK",
     "exchange": "HKEX",
     "country": "CN",
     "cik": null,
     "role_kr": "중국 최대 국영 정유·석유화학사로 내수 연료 유통과 제품 수출쿼터의 중심축이다.",
     "period": "2026년 1~9월(3분기 누적)",
     "period_end": "2026-09-30",
     "report_date": "2026-10-29",
     "status": "reported",
     "highlights": [
      {
       "text": "1~9월 원유 처리량은 1억 6,700만 톤으로 10% 감소했으나 IFRS 지배주주 순이익은 401.67억 위안으로 25.3% 늘었다.",
       "src": [
        "s1",
        "s2"
       ]
      },
      {
       "text": "3분기 지배주주 순이익은 136억 위안으로 63.6% 늘었고 매출은 7,700억 위안으로 9.3% 증가했다.",
       "src": [
        "s1",
        "s2"
       ]
      },
      {
       "text": "1~9월 브렌트 평균가는 배럴당 94.05달러로 32.7% 올랐다.",
       "src": [
        "s1"
       ]
      },
      {
       "text": "회사는 신에너지 대체 가속으로 국내 정제유 소비가 8.6% 감소했다고 밝혔다.",
       "src": [
        "s1"
       ]
      },
      {
       "text": "2026년 1차 수출쿼터 1,900만 톤 가운데 1,376만 톤이 시노펙·CNPC 몫이었다.",
       "src": [
        "s3"
       ]
      }
     ],
     "metrics": [
      {
       "label": "지배주주 순이익(IFRS)",
       "value": "401.67",
       "unit": "억 위안",
       "period": "2026년 1~9월",
       "change": "+25.3% YoY",
       "src": [
        "s2",
        "s1"
       ]
      },
      {
       "label": "지배주주 순이익(IFRS)",
       "value": "136",
       "unit": "억 위안",
       "period": "2026년 3분기",
       "change": "+63.6% YoY",
       "src": [
        "s1",
        "s2"
       ]
      },
      {
       "label": "매출",
       "value": "7700",
       "unit": "억 위안",
       "period": "2026년 3분기",
       "change": "+9.3% YoY",
       "src": [
        "s1"
       ]
      },
      {
       "label": "원유 처리량",
       "value": "16700",
       "unit": "만 톤",
       "period": "2026년 1~9월",
       "change": "-10% YoY",
       "src": [
        "s1"
       ]
      },
      {
       "label": "국내 정제유 소비(회사 제시)",
       "value": "-8.6",
       "unit": "% YoY",
       "period": "2026년 1~9월",
       "change": "",
       "src": [
        "s1"
       ]
      },
      {
       "label": "브렌트 평균가",
       "value": "94.05",
       "unit": "달러/배럴",
       "period": "2026년 1~9월",
       "change": "+32.7% YoY",
       "src": [
        "s1"
       ]
      }
     ],
     "guidance": [
      {
       "text": "회사 계열 연구기관인 시노펙 경제기술연구원은 2026년 중국 석유 수요가 8.9% 감소할 것으로 전망했다(회사 공식 가이던스는 아니다).",
       "src": [
        "s4"
       ]
      }
     ],
     "read_through": {
      "text": "중국 내수 감소분은 수출쿼터를 통해 역내로 나온다. 10월 추가 배정분의 선적이 빠를수록 4분기 역내 경유·항공유 공급이 늘어난다.",
      "desk": "products"
     },
     "sources": [
      {
       "id": "s1",
       "title": "Sinopec's three-quarter profit surges 25.3 pc on rising oil prices",
       "publisher": "The Standard (HK)",
       "date": "2026-10",
       "url": "https://www.thestandard.com.hk/finance/article/346949/Sinopecs-three-quarter-profit-surges-253-pc-on-rising-oil-prices"
      },
      {
       "id": "s2",
       "title": "중국석화 2026년 3분기 실적 보도",
       "publisher": "新华财经(cnfin.com)",
       "date": "2026-10-29",
       "url": "https://www.cnfin.com/dz-lb/detail/20261029/4488278_1.html"
      },
      {
       "id": "s3",
       "title": "China's 2026 first batch fuel export quotas steady year on year",
       "publisher": "Hydrocarbon Processing (Reuters)",
       "date": "2025-12",
       "url": "https://www.hydrocarbonprocessing.com/news/2025/12/chinas-2026-first-batch-fuel-export-quotas-steady-year-on-year/"
      },
      {
       "id": "s4",
       "title": "China Oil Demand to Fall 8.9% in 2026, Sinopec Research Says",
       "publisher": "EnergyNow",
       "date": "2026-09",
       "url": "https://energynow.com/2026/09/china-oil-demand-to-fall-8-9-in-2026-sinopec-research-says/"
      }
     ]
    },
    {
     "name_kr": "페트로차이나(중국석유천연가스)",
     "name_en": "PetroChina Co., Ltd.",
     "ticker": "0857",
     "yahoo": "0857.HK",
     "exchange": "HKEX",
     "country": "CN",
     "cik": null,
     "role_kr": "중국 최대 원유·가스 생산사이자 2위 국영 정유사다.",
     "period": "2026년 1~9월(3분기 누적)",
     "period_end": "2026-09-30",
     "report_date": "2026-10-28",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 지배주주 순이익은 518.4억 위안으로 전년 대비 21.6% 늘고 전분기 대비 6.8% 감소했으며, 매출은 7,936억 위안으로 10.4% 증가했다.",
       "src": [
        "p3",
        "p4"
       ]
      },
      {
       "text": "1~9월 원유 가공량은 10.022억 배럴로 3.7% 줄었고 휘발유·등유·경유 생산은 8,336.8만 톤으로 6.9% 감소했다.",
       "src": [
        "p1",
        "p2"
       ]
      },
      {
       "text": "3분기 원유 가공량은 3.469억 배럴로 전분기 대비 11.1% 늘었다.",
       "src": [
        "p1",
        "p2"
       ]
      },
      {
       "text": "1~9월 매출은 2조 3,211억 위안(+7.0%), 지배주주 순이익은 1,557.7억 위안(+21.9%), 비경상 제외 순이익은 1,589.0억 위안(+23.7%)이었다.",
       "src": [
        "p5",
        "p7"
       ]
      },
      {
       "text": "2026년 1차 수출쿼터 1,900만 톤 가운데 1,376만 톤이 시노펙·CNPC 몫이었다.",
       "src": [
        "p6"
       ]
      }
     ],
     "metrics": [
      {
       "label": "지배주주 순이익",
       "value": "518.4",
       "unit": "억 위안",
       "period": "2026년 3분기",
       "change": "+21.6% YoY, -6.8% QoQ",
       "src": [
        "p3",
        "p4"
       ]
      },
      {
       "label": "매출",
       "value": "7936",
       "unit": "억 위안",
       "period": "2026년 3분기",
       "change": "+10.4% YoY",
       "src": [
        "p3"
       ]
      },
      {
       "label": "지배주주 순이익",
       "value": "1557.7",
       "unit": "억 위안",
       "period": "2026년 1~9월",
       "change": "+21.9% YoY",
       "src": [
        "p5",
        "p7"
       ]
      },
      {
       "label": "비경상 제외 순이익",
       "value": "1589.0",
       "unit": "억 위안",
       "period": "2026년 1~9월",
       "change": "+23.7% YoY",
       "src": [
        "p5",
        "p7"
       ]
      },
      {
       "label": "매출",
       "value": "23211",
       "unit": "억 위안",
       "period": "2026년 1~9월",
       "change": "+7.0% YoY",
       "src": [
        "p5",
        "p7"
       ]
      },
      {
       "label": "원유 가공량",
       "value": "10.022",
       "unit": "억 배럴",
       "period": "2026년 1~9월",
       "change": "-3.7% YoY(전년 10.406억 배럴)",
       "src": [
        "p1",
        "p2"
       ]
      },
      {
       "label": "휘발유·등유·경유 생산",
       "value": "8336.8",
       "unit": "만 톤",
       "period": "2026년 1~9월",
       "change": "-6.9% YoY(전년 8,959.0만 톤)",
       "src": [
        "p1",
        "p2"
       ]
      },
      {
       "label": "원유 가공량",
       "value": "3.469",
       "unit": "억 배럴",
       "period": "2026년 3분기",
       "change": "+11.1% QoQ",
       "src": [
        "p1",
        "p2"
       ]
      }
     ],
     "guidance": [],
     "read_through": {
      "text": "국영 2사가 모두 가공량을 줄이고 있어 중국 내수 공급 과잉은 완화되고 있으나, 3분기 가공 회복분이 쿼터 소진과 맞물리면 연말 아시아 경유 공급이 늘어난다.",
      "desk": "products"
     },
     "sources": [
      {
       "id": "p1",
       "title": "PetroChina 2026년 3분기 보고서(HKEX 공시)",
       "publisher": "PetroChina / HKEXnews",
       "date": "2026-10-28",
       "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1028/2026102801189.pdf"
      },
      {
       "id": "p2",
       "title": "중국석유 2026년 3분기 실적 보도",
       "publisher": "新华财经(cnfin.com)",
       "date": "2026-10-28",
       "url": "https://www.cnfin.com/yw-lb/detail/20261028/4487709_1.html"
      },
      {
       "id": "p3",
       "title": "PetroChina Q3 2026: Revenue Climbs 10.4 %, Net Profit Surges 21.6 % on Stronger Oil Prices",
       "publisher": "Tiger Brokers News",
       "date": "2026-10",
       "url": "https://www.itiger.com/news/1195941520"
      },
      {
       "id": "p4",
       "title": "PetroChina (857 HK) Q3 2026 (CNY): IFRS net profit 51.84bln, +22% Y/Y",
       "publisher": "Newsquawk",
       "date": "2026-10",
       "url": "https://www.newsquawk.com/headlines/petrochina-857-hk-q3-2026-cny-ifrs-net-profit-5184bln-22-yy"
      },
      {
       "id": "p5",
       "title": "Everbright Securities Keeps Buy Rating on PetroChina, Bullish on Reserve Growth and Production Potential",
       "publisher": "Tiger Brokers News(광대증권 리포트 요약)",
       "date": "",
       "url": "https://www.itiger.com/news/1145817008"
      },
      {
       "id": "p6",
       "title": "China's 2026 first batch fuel export quotas steady year on year",
       "publisher": "Hydrocarbon Processing (Reuters)",
       "date": "2025-12",
       "url": "https://www.hydrocarbonprocessing.com/news/2025/12/chinas-2026-first-batch-fuel-export-quotas-steady-year-on-year/"
      },
      {
       "id": "p7",
       "title": "중국석유 3분기 실적 증권사 리포트 요약",
       "publisher": "同花顺(10jqka)",
       "date": "2026-10-30",
       "url": "https://news.10jqka.com.cn/field/sr/20261030/60368119.shtml"
      }
     ]
    },
    {
     "name_kr": "롱성석화(荣盛石化)",
     "name_en": "Rongsheng Petrochemical Co., Ltd.",
     "ticker": "002493",
     "yahoo": "002493.SZ",
     "exchange": "SZSE",
     "country": "CN",
     "cik": null,
     "role_kr": "저장석유화학(ZPC) 정유·화학 단지를 지배하는 민영 정유·석유화학 통합사다.",
     "period": "2026년 1~9월(3분기 누적)",
     "period_end": "2026-09-30",
     "report_date": "2026-10-28",
     "status": "reported",
     "highlights": [
      {
       "text": "1~9월 지배주주 순이익은 80.15억 위안으로 802.12% 늘었고, 3분기 단독은 29.04억 위안으로 전년 대비 914.18%, 전분기 대비 26.53% 증가했다.",
       "src": [
        "r1",
        "r2"
       ]
      },
      {
       "text": "1~9월 매출은 1,935.99억 위안(-15.02%), 3분기 매출은 641.92억 위안(전년 대비 -18.93%, 전분기 대비 -6.67%)이었다.",
       "src": [
        "r1",
        "r2"
       ]
      },
      {
       "text": "1~9월 영업활동 순현금흐름은 270.76억 위안으로 14.50% 늘었다.",
       "src": [
        "r1",
        "r2"
       ]
      },
      {
       "text": "증권사는 제품 수출이 이끈 해외 제품시장 개선과 주요 제품 가공 스프레드 회복을 이익 증가 요인으로 꼽았다. 3분기 WTI 평균가는 배럴당 85.68달러(전년 대비 +31.88%, 전분기 대비 -7.37%)로 제시했다.",
       "src": [
        "r1"
       ]
      },
      {
       "text": "자회사 저장석유화학(ZPC)은 2026년 1차 제품 수출쿼터 156만 톤을 배정받았다.",
       "src": [
        "r3"
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "1935.99",
       "unit": "억 위안",
       "period": "2026년 1~9월",
       "change": "-15.02% YoY",
       "src": [
        "r1",
        "r2"
       ]
      },
      {
       "label": "지배주주 순이익",
       "value": "80.15",
       "unit": "억 위안",
       "period": "2026년 1~9월",
       "change": "+802.12% YoY",
       "src": [
        "r1",
        "r2"
       ]
      },
      {
       "label": "비경상 제외 순이익",
       "value": "79.22",
       "unit": "억 위안",
       "period": "2026년 1~9월",
       "change": "+640.93% YoY",
       "src": [
        "r1",
        "r2"
       ]
      },
      {
       "label": "영업활동 순현금흐름",
       "value": "270.76",
       "unit": "억 위안",
       "period": "2026년 1~9월",
       "change": "+14.50% YoY",
       "src": [
        "r1",
        "r2"
       ]
      },
      {
       "label": "매출",
       "value": "641.92",
       "unit": "억 위안",
       "period": "2026년 3분기",
       "change": "-18.93% YoY, -6.67% QoQ",
       "src": [
        "r1",
        "r2"
       ]
      },
      {
       "label": "지배주주 순이익",
       "value": "29.04",
       "unit": "억 위안",
       "period": "2026년 3분기",
       "change": "+914.18% YoY, +26.53% QoQ",
       "src": [
        "r1",
        "r2"
       ]
      },
      {
       "label": "비경상 제외 순이익",
       "value": "25.79",
       "unit": "억 위안",
       "period": "2026년 3분기",
       "change": "+720.5% YoY, +11.4% QoQ",
       "src": [
        "r1",
        "r2"
       ]
      },
      {
       "label": "WTI 평균가(증권사 제시)",
       "value": "85.68",
       "unit": "달러/배럴",
       "period": "2026년 3분기",
       "change": "+31.88% YoY, -7.37% QoQ",
       "src": [
        "r1"
       ]
      }
     ],
     "guidance": [],
     "read_through": {
      "text": "민영 대형 정유사가 수출쿼터로 해외 크랙을 이익에 반영하기 시작했다. 민영사에 쿼터가 추가 배정되면 아시아 경유·휘발유 공급이 늘어난다.",
      "desk": "products"
     },
     "sources": [
      {
       "id": "r1",
       "title": "荣盛石化(002493)：Q3业绩持续高增 关注成品油出口进展",
       "publisher": "格隆汇(증권사 리포트 게재)",
       "date": "",
       "url": "https://m.gelonghui.com/news/5340721"
      },
      {
       "id": "r2",
       "title": "荣盛石化 研报正文",
       "publisher": "东方财富 研报",
       "date": "2026-11-02",
       "url": "https://data.eastmoney.com/report/info/AP202611021831308345.html"
      },
      {
       "id": "r3",
       "title": "China's 2026 first batch fuel export quotas steady year on year",
       "publisher": "Hydrocarbon Processing (Reuters)",
       "date": "2025-12",
       "url": "https://www.hydrocarbonprocessing.com/news/2025/12/chinas-2026-first-batch-fuel-export-quotas-steady-year-on-year/"
      }
     ]
    },
    {
     "name_kr": "헝리석화(恒力石化)",
     "name_en": "Hengli Petrochemical Co., Ltd.",
     "ticker": "600346",
     "yahoo": "600346.SS",
     "exchange": "SSE",
     "country": "CN",
     "cik": null,
     "role_kr": "다롄 창싱다오에 정유·PX·PTA 통합 단지를 둔 민영 정유·석유화학사다.",
     "period": "2026년 1~9월(3분기 누적)",
     "period_end": "2026-09-30",
     "report_date": "",
     "status": "reported",
     "highlights": [
      {
       "text": "1~9월 지배주주 순이익은 102.56억 위안으로 104.20% 늘었다.",
       "src": [
        "h1",
        "h2"
       ]
      },
      {
       "text": "3분기 지배주주 순이익은 30.50억 위안으로 54.64% 증가했고 매출은 528.53억 위안으로 1.20% 줄었다.",
       "src": [
        "h1"
       ]
      },
      {
       "text": "1~9월 매출은 1,510.75억 위안으로 4.01% 줄었다.",
       "src": [
        "h1"
       ]
      },
      {
       "text": "회사는 정제·PTA 산업체인 업황 회복과 가공 스프레드 개선을 이익 개선 요인으로 들었다. 10월 18일 예고 기준 1~9월 비경상 제외 순이익은 약 79.06억 위안(약 +88.89%)이었다.",
       "src": [
        "h1",
        "h2"
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "528.53",
       "unit": "억 위안",
       "period": "2026년 3분기",
       "change": "-1.20% YoY",
       "src": [
        "h1"
       ]
      },
      {
       "label": "지배주주 순이익",
       "value": "30.5",
       "unit": "억 위안",
       "period": "2026년 3분기",
       "change": "+54.64% YoY",
       "src": [
        "h1"
       ]
      },
      {
       "label": "매출",
       "value": "1510.75",
       "unit": "억 위안",
       "period": "2026년 1~9월",
       "change": "-4.01% YoY",
       "src": [
        "h1"
       ]
      },
      {
       "label": "지배주주 순이익",
       "value": "102.56",
       "unit": "억 위안",
       "period": "2026년 1~9월",
       "change": "+104.20% YoY",
       "src": [
        "h1",
        "h2"
       ]
      },
      {
       "label": "비경상 제외 순이익(10/18 예고치, 약)",
       "value": "79.06",
       "unit": "억 위안",
       "period": "2026년 1~9월",
       "change": "약 +88.89% YoY",
       "src": [
        "h2"
       ]
      }
     ],
     "guidance": [],
     "read_through": {
      "text": "헝리의 이익 회복에는 연료유와 PTA 체인 스프레드 개선이 함께 작용했다. 중국 민영 통합사가 가동을 늘리면 석유제품과 아시아 PX·PTA 공급이 함께 늘어난다.",
      "desk": "products"
     },
     "sources": [
      {
       "id": "h1",
       "title": "恒力石化 2026年三季报 공시 해설",
       "publisher": "财联社(cls.cn)",
       "date": "",
       "url": "https://www.cls.cn/detail/2518059"
      },
      {
       "id": "h2",
       "title": "恒力石化 2026년 1~3분기 업적 예고 보도",
       "publisher": "每日经济新闻(mrjjxw.com)",
       "date": "2026-10-18",
       "url": "https://www.mrjjxw.com/articles/2026-10-18/4607854.html"
      }
     ]
    },
    {
     "name_kr": "릴라이언스 인더스트리",
     "name_en": "Reliance Industries Ltd.",
     "ticker": "RELIANCE",
     "yahoo": "RELIANCE.NS",
     "exchange": "NSE",
     "country": "IN",
     "cik": null,
     "role_kr": "잠나가르 정유단지를 운영하는 인도 최대 민영 정유·석유화학사로, O2C 부문이 정유·석유화학을 담당한다.",
     "period": "FY27 2분기(2026년 7~9월)",
     "period_end": "2026-09-30",
     "report_date": "2026-10-30",
     "status": "reported",
     "highlights": [
      {
       "text": "O2C 부문은 크랙 급등으로 사상 최고 실적을 냈다. FY27 2분기 O2C EBITDA는 ₹25,203 crore(2,520.3억 루피)로 67.9% 늘었고 매출은 ₹2,31,601 crore(2조 3,160.1억 루피)로 44.2% 증가했다.",
       "src": [
        "l1",
        "l2",
        "l3"
       ]
      },
      {
       "text": "총 처리량은 2,060만 톤으로 1.0% 줄었으나 경유 크랙은 전년 대비 3.5배, 항공유 3.7배, 휘발유 3배로 올랐다.",
       "src": [
        "l1"
       ]
      },
      {
       "text": "연결 순이익은 ₹29,550 crore(2,955.0억 루피)로 33.8% 늘어 분기 최대다.",
       "src": [
        "l3"
       ]
      }
     ],
     "metrics": [
      {
       "label": "O2C 매출(₹2,31,601 crore)",
       "value": "23160.1",
       "unit": "억 루피",
       "period": "FY27 2분기(2026년 7~9월)",
       "change": "+44.2% YoY",
       "src": [
        "l1",
        "l2"
       ]
      },
      {
       "label": "O2C EBITDA(₹25,203 crore)",
       "value": "2520.3",
       "unit": "억 루피",
       "period": "FY27 2분기(2026년 7~9월)",
       "change": "+67.9% YoY(전년 1,500.8억 루피)",
       "src": [
        "l1",
        "l2"
       ]
      },
      {
       "label": "총 처리량",
       "value": "2060",
       "unit": "만 톤",
       "period": "FY27 2분기(2026년 7~9월)",
       "change": "-1.0% YoY(직전 분기 1,810만 톤)",
       "src": [
        "l1"
       ]
      },
      {
       "label": "경유 크랙(전년 동기 대비 배수)",
       "value": "3.5",
       "unit": "배",
       "period": "FY27 2분기(2026년 7~9월)",
       "change": "",
       "src": [
        "l1"
       ]
      },
      {
       "label": "항공유 크랙(전년 동기 대비 배수)",
       "value": "3.7",
       "unit": "배",
       "period": "FY27 2분기(2026년 7~9월)",
       "change": "",
       "src": [
        "l1"
       ]
      },
      {
       "label": "휘발유 크랙(전년 동기 대비 배수)",
       "value": "3",
       "unit": "배",
       "period": "FY27 2분기(2026년 7~9월)",
       "change": "",
       "src": [
        "l1"
       ]
      },
      {
       "label": "연결 순이익(₹29,550 crore)",
       "value": "2955.0",
       "unit": "억 루피",
       "period": "FY27 2분기(2026년 7~9월)",
       "change": "+33.8% YoY",
       "src": [
        "l3"
       ]
      }
     ],
     "guidance": [
      {
       "text": "회사는 경유·항공유 크랙이 마진의 주 동인으로 남아 있고 정유사들의 경유 수율 극대화로 휘발유 크랙도 강해졌다고 설명했다.",
       "src": [
        "l1"
       ]
      },
      {
       "text": "회사는 글로벌 휘발유·경유 재고가 5년 평균보다 6~10% 낮다고 제시해 빠듯한 수급이 이어진다는 시각을 보였다.",
       "src": [
        "l1"
       ]
      }
     ],
     "read_through": {
      "text": "물량이 줄어도 크랙만으로 O2C 이익이 급증했다. 글로벌 저재고가 이어지는 한 4분기 경유 크랙의 하방은 제한적이다.",
      "desk": "products"
     },
     "sources": [
      {
       "id": "l1",
       "title": "Financial Results Presentation Q2 FY27 (30 October 2026)",
       "publisher": "Reliance Industries",
       "date": "2026-10-30",
       "url": "https://www.ril.com/sites/default/files/2026-10/RIL-2Q_FY27_Analyst_Presentation_30Oct26.pdf"
      },
      {
       "id": "l2",
       "title": "Media Release: RIL Q2 FY2026-27 Financial and Operational Performance",
       "publisher": "Reliance Industries",
       "date": "2026-10-30",
       "url": "https://www.ril.com/sites/default/files/2026-10/30102026_Media%20Release_RIL_Q2_FY2026-27_Financial_and_Operational_Performance.pdf"
      },
      {
       "id": "l3",
       "title": "RIL Qtrly PAT At New High of Rs295 Bn, Up 34%",
       "publisher": "Fintech BizNews",
       "date": "2026-10",
       "url": "https://www.fintechbiznews.com/business-corporates-industries/ril-qtrly-pat-at-new-high-of-rs295-bn-up-34"
      }
     ]
    },
    {
     "name_kr": "ENEOS 홀딩스",
     "name_en": "ENEOS Holdings, Inc.",
     "ticker": "5020",
     "yahoo": "5020.T",
     "exchange": "TSE",
     "country": "JP",
     "cik": null,
     "role_kr": "일본 최대 석유 원매(정유·연료 판매)사다.",
     "period": "FY2026 2분기 누적(2026년 4~9월)",
     "period_end": "2026-09-30",
     "report_date": "",
     "status": "not_yet",
     "highlights": [
      {
       "text": "2분기(4~9월) 실적은 2026-11-07 현재 발표 보도가 없다. 전년 2분기 실적은 2025-11-12에 발표됐다.",
       "src": [
        "e5"
       ]
      },
      {
       "text": "1분기(4~6월) 영업이익은 4,826억 엔으로 연간 가이던스 6,100억 엔의 79.1%에 이르렀다.",
       "src": [
        "e2",
        "e1"
       ]
      },
      {
       "text": "1분기 재고영향 제외 영업이익 상당액은 2,874억 엔, 재고영향은 1,952억 엔이었다(2차 자료).",
       "src": [
        "e3"
       ]
      },
      {
       "text": "회사는 1분기 호실적에도 연간 전망을 바꾸지 않았다.",
       "src": [
        "e4"
       ]
      },
      {
       "text": "FY2025(2026년 3월기) 영업이익은 4,666.27억 엔으로 전전기 1,060.93억 엔에서 크게 늘었고 매출은 11조 7,650억 엔으로 4.5% 줄었다.",
       "src": [
        "e1"
       ]
      }
     ],
     "metrics": [
      {
       "label": "영업이익",
       "value": "4826",
       "unit": "억 엔",
       "period": "FY2026 1분기(2026년 4~6월)",
       "change": "연간 가이던스 대비 진척률 79.1%",
       "src": [
        "e2"
       ]
      },
      {
       "label": "재고영향 제외 영업이익 상당액(2차 자료)",
       "value": "2874",
       "unit": "억 엔",
       "period": "FY2026 1분기(2026년 4~6월)",
       "change": "",
       "src": [
        "e3"
       ]
      },
      {
       "label": "재고영향(2차 자료)",
       "value": "1952",
       "unit": "억 엔",
       "period": "FY2026 1분기(2026년 4~6월)",
       "change": "",
       "src": [
        "e3"
       ]
      },
      {
       "label": "영업이익 가이던스",
       "value": "6100",
       "unit": "억 엔",
       "period": "FY2026(2026년 4월~2027년 3월)",
       "change": "+30.7% YoY",
       "src": [
        "e1"
       ]
      },
      {
       "label": "지배주주 순이익 가이던스",
       "value": "4150",
       "unit": "억 엔",
       "period": "FY2026(2026년 4월~2027년 3월)",
       "change": "",
       "src": [
        "e1"
       ]
      },
      {
       "label": "영업이익",
       "value": "4666.27",
       "unit": "억 엔",
       "period": "FY2025(2025년 4월~2026년 3월)",
       "change": "전기 1,060.93억 엔",
       "src": [
        "e1"
       ]
      },
      {
       "label": "매출",
       "value": "117650",
       "unit": "억 엔",
       "period": "FY2025(2025년 4월~2026년 3월)",
       "change": "-4.5% YoY",
       "src": [
        "e1"
       ]
      }
     ],
     "guidance": [
      {
       "text": "FY2026(2027년 3월기) 영업이익 6,100억 엔(+30.7%), 지배주주 순이익 4,150억 엔 가이던스를 제시했다.",
       "src": [
        "e1",
        "e4"
       ]
      }
     ],
     "read_through": {
      "text": "1분기 이익의 상당 부분이 재고평가 효과다. 유가가 전분기보다 내려가면 일본·한국 정유사 모두 재고이익이 줄거나 손실로 바뀐다. 2분기 크랙 수준은 재고 제외 이익에서 드러난다.",
      "desk": "products"
     },
     "sources": [
      {
       "id": "e1",
       "title": "ENEOS Full-Year Profit Jumps Despite Lower Revenue; Guides Higher For Fiscal 2026",
       "publisher": "RTTNews",
       "date": "2026-05",
       "url": "https://www.rttnews.com/3651904/eneos-full-year-profit-jumps-despite-lower-revenue-guides-higher-for-fiscal-2026.aspx"
      },
      {
       "id": "e2",
       "title": "ENEOSホールディングス 決算 FY2027-Q1(2027년 3월기 1분기)",
       "publisher": "EDINET DB",
       "date": "",
       "url": "https://edinetdb.jp/company/E24050/earnings/FY2027-Q1"
      },
      {
       "id": "e3",
       "title": "Japanese oil refiners earnings 2026",
       "publisher": "kabu.tagu-blog.com(개인 블로그, 2차 자료)",
       "date": "",
       "url": "https://kabu.tagu-blog.com/japanese-oil-refiners-earnings-2026/"
      },
      {
       "id": "e4",
       "title": "ENEOS (5020) Q1 2027 earnings summary",
       "publisher": "Quartr",
       "date": "",
       "url": "https://quartr.com/events/eneos-holdings-inc-5020-q1-2027_FGUNmWGo"
      },
      {
       "id": "e5",
       "title": "ENEOS revises full-year forecasts, raises dividends despite lower oil prices",
       "publisher": "FilingReader",
       "date": "2025-11-12",
       "url": "https://filingreader.com/news-wire/tokyo/2025-11-12/eneos-revises-full-year-forecasts-raises-dividends-despite-lower-oil-prices"
      }
     ]
    }
   ]
  },
  {
   "id": "petrochemicals",
   "title": "석유화학",
   "position": "석유화학은 정유·가스처리에서 나온 나프타·에탄·LPG를 분해해 에틸렌·프로필렌과 PE·PP·PVC 등 합성수지로 바꾸는 중류 단계다.",
   "summary": [
    "3분기 미국 에탄 기반 업체 이익은 전년 대비 크게 개선됐으며, 다우 영업 EBIT는 현지 가격 14% 상승에 힘입어 8.87억달러(전년 대비 +7.07억달러), 라이온델바젤 순이익은 7.58억달러(전년 동기 -8.90억달러)를 기록했다(다우 1, 라이온델바젤 1).",
    "전분기 대비로는 2분기 중동 사태로 급등했던 가격이 7월 이후 조정되며 이익이 줄었고, 라이온델바젤 O&P 미주 EBITDA는 6.41억달러로 46% 감소했고 웨스트레이크 EBITDA는 3.50억달러로 2분기 6.79억달러의 절반 수준에 그쳤다(다우 4, 라이온델바젤 2, 웨스트레이크 5).",
    "나프타 기반 한국 NCC는 고가 원료 역래깅으로 적자로 돌아섰으며, LG화학 석유화학 부문 영업손실은 1,756억원, 롯데케미칼 기초화학 영업손실은 2,166억원이고 롯데케미칼은 스프레드 악화 영향을 약 4,900억원, 국내 NCC 가동률을 70% 수준으로 제시했다(LG화학 1, 롯데케미칼 1, 롯데케미칼 5).",
    "중동 공급은 대체 수출 경로로 회복 중이며, 사빅(SABIC) 판매량은 대체 해상 경로와 항만 활용으로 전분기 대비 약 30% 늘어 위기 이전의 약 80%에 이르렀고 평균 판매가격은 13% 떨어졌으며 회사는 현재 가격 수준을 일시적으로 봤다(사빅 2, 사빅 3).",
    "에탄 원가 상승분이 가격에 전가되지 않으면 4분기 미국 PE 마진은 줄어든다. 미국 에탄은 3분기 14% 오른 뒤 컨콜 시점 3분기 평균을 24% 웃돌았고, 다우는 10월 파운드당 7센트·11월 5센트 인상을 제안하며 4분기 영업 EBITDA 약 15억달러를 제시했다(라이온델바젤 6, 다우 5, 다우 4).",
    "설비 감축은 진행 중이나 공급 과잉 해소에는 못 미치며, 한국은 대산·여수 확정 감축 249만톤으로 정부 목표 270만~370만톤의 67~92% 수준이고, 다우는 정상 가동률 복귀에 세계 설비 약 10% 퇴출이 필요하다고 봤으며(발표 5~6%), LG화학은 2031년까지 동북아 증설이 폐쇄를 크게 웃돌 것으로 봤다(롯데케미칼 11, 다우 5, LG화학 4)."
   ],
   "open_items": [
    "회사 IR, DART, PR Newswire, 컨콜 녹취록 원문은 직접 확인하지 못했다. 비XBRL 수치와 경영진 발언은 요약 자료 기준이다.",
    "LG화학의 에틸렌·PE 스프레드 수치, NCC 가동률 수치, 호르무즈·이란 관련 직접 언급, 운반비 급등 원인은 확인하지 못했다. 2분기 석유화학 영업이익 4,265억원은 보도 한 곳에서만 확인돼 싣지 않았다.",
    "롯데케미칼 3분기 컨콜의 나프타 도입선·호르무즈 관련 언급, 4분기 가동률 계획, LC타이탄·LC USA 개별 실적은 확인하지 못했다. Yahoo 집계 3분기 순손익(-2,831억원)과 보도된 당기순손실(2,898억원)의 기준 차이(지배주주 귀속 여부)도 확인하지 못했다.",
    "울산(SK지오센트릭·대한유화·에쓰오일 샤힌 프로젝트) 감축안과 LG화학–GS칼텍스 여수 NCC 통합안은 확정되지 않았다.",
    "사빅 발표일 2026-10-25는 요약 자료 기준이며 회사 페이지로 확인하지 못했다. Yahoo 집계 3분기 순이익(4.99억리얄)과 컨콜 요약의 계속사업 순이익 6.76억달러의 차이(중단사업 손익 등)도 확인하지 못했다. 2026년 설비투자 33억달러는 요약 기사 기준이고, CEO 이름은 자료마다 다르다.",
    "사빅 자료 요약에는 '지정학적 상황'과 대체 경로만 나오고 호르무즈 해협을 직접 언급한 대목은 확인하지 못했다. 미국 업체 자료에도 '중동 분쟁'만 나오며 이란·러시아 제재에 대한 직접 언급은 확인하지 못했다.",
    "다우: 사다라 부분 재가동 세부(크래커·PE 라인 가동, 액체 계열 정지)와 '고비용 설비 추가 8% 퇴출 필요' 발언은 출처마다 내용이 달라 싣지 않았다.",
    "웨스트레이크 가성소다 4분기 계약가(10월 +5센트, 11월 +10센트 전망)는 컨콜 요약 1곳 기준이며, 2026년 연간 설비투자 가이던스는 확인하지 못했다. 2026-09-29 제출 Item 2.05 8-K는 쾰른 폐쇄 관련으로 보이나 대상 설비를 확인하지 못했다.",
    "라이온델바젤 휴스턴 부지 매각의 연간 현금흐름 개선 효과(5,000만~1억달러)와 5월 유럽 자산 매각의 부문 능력 비중(약 25%)은 요약 기사 기준이다.",
    "RBN Energy, GuruFocus, Investing.com, Yahoo Finance, 데일리안, 투데이코리아 등 일부 기사는 게재일을 확인하지 못해 표시하지 않았다."
   ],
   "companies": [
    {
     "name_kr": "다우",
     "name_en": "Dow Inc.",
     "ticker": "DOW",
     "yahoo": "DOW",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1751788,
     "role_kr": "미국 걸프·캐나다 에탄 크래커와 사우디 사다라 등 중동 합작 설비를 운영하는 세계 최대급 PE 생산자다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-22",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 순매출은 112.67억달러로 전년 대비 13% 늘었고, 현지 가격 14% 상승이 물량 1% 감소를 상쇄했다. 물량은 중동 분쟁 영향이 가장 큰 아시아태평양을 빼고 전 지역에서 늘었다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "영업 EBIT는 8.87억달러로 전년 대비 7.07억달러 늘었고, 영업 EPS는 0.71달러(전년 -0.19달러)로 시장 예상 0.61달러를 웃돌았다. GAAP 희석 EPS는 0.62달러이며, 제외 항목은 세전 0.84억달러(주당 0.09달러)로 주로 자구책 관련 비용이다.",
       "src": [
        1,
        3,
        8,
        12
       ]
      },
      {
       "text": "포장·특수플라스틱(P&SP) 영업 EBIT는 5.85억달러로 전년 1.99억달러의 약 3배다. 매출은 57.8억달러(+18%)이며 전 지역 PE 가격 상승, 통합 마진 개선, 자구책이 기여했고 PE 물량은 중동 분쟁 영향으로 줄었다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "산업중간재·인프라(II&I) 영업 EBIT는 1.76억달러(전년 -0.47억달러)로 MDI·PO 유도체 가격 상승(현지 가격 +16%)이 물량 7% 감소를 상쇄했고, 기능성소재·코팅(PM&C)은 영국 배리 실록산 설비 폐쇄 효과로 영업 EBIT 1.54억달러(전년 대비 +0.74억달러)를 냈다.",
       "src": [
        1
       ]
      },
      {
       "text": "7월 1일 취임한 카렌 카터 CEO는 세계 에틸렌 가동률을 80% 초반, 미국 걸프 가동률을 90% 이상으로 제시했다. 세계 설비의 5~6% 폐쇄가 발표됐고 정상 사이클 가동률 복귀에는 약 10% 퇴출이 필요하며, 다우 독일 뵐렌 크래커는 2027년 4분기 폐쇄 예정이다.",
       "src": [
        4,
        5,
        11
       ]
      },
      {
       "text": "중동 합작 설비 일부는 분쟁과 물류 제약으로 감산 중이며, 2분기 중동 사태로 급등한 가격은 7월 하락 후 9월 인상으로 안정됐다.",
       "src": [
        4
       ]
      },
      {
       "text": "사다라 프로젝트 금융 보증 부채는 9월 말 5.86억달러(2025년 말 2.12억달러)이고 최대 지급액은 13.55억달러다. 보증 부채 조정 손실 2.92억달러(세전, II&I 2.11억달러·P&SP 0.81억달러)는 1분기에 인식했고 9개월 누계도 같은 규모이며, 사다라 지분법 손실 인식은 1분기부터 중단했다.",
       "src": [
        1,
        2,
        13
       ]
      },
      {
       "text": "영업현금흐름 18억달러, 잉여현금흐름 11억달러(전분기 대비 운전자본 13억달러 회수 포함)를 냈고 배당으로 2.53억달러를 지급했다. 3분기 설비투자는 7.06억달러로 전년 동기 5.64억달러보다 25% 늘었다.",
       "src": [
        1,
        3,
        6
       ]
      }
     ],
     "metrics": [
      {
       "label": "순매출",
       "value": "11,267",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +13%",
       "src": 3
      },
      {
       "label": "영업 EBIT",
       "value": "887",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +707백만 달러",
       "src": 1
      },
      {
       "label": "영업 EBITDA",
       "value": "약 1,553",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 6
      },
      {
       "label": "GAAP 순이익(비지배지분 포함)",
       "value": "525",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 124백만 달러",
       "src": 3
      },
      {
       "label": "지배주주 순이익",
       "value": "458",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 62백만 달러",
       "src": 3
      },
      {
       "label": "영업 EPS",
       "value": "0.71",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 -0.19달러",
       "src": 1
      },
      {
       "label": "GAAP 희석 EPS",
       "value": "0.62",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 0.08달러",
       "src": 3
      },
      {
       "label": "제외 항목(세전)",
       "value": "-84",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "주당 -0.09달러",
       "src": 12
      },
      {
       "label": "현지 가격",
       "value": "+14",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "전년 대비",
       "src": 1
      },
      {
       "label": "물량",
       "value": "-1",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "전년 대비",
       "src": 1
      },
      {
       "label": "P&SP 영업 EBIT",
       "value": "585",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 199백만 달러",
       "src": 1
      },
      {
       "label": "P&SP 순매출",
       "value": "5.78",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +18%",
       "src": 1
      },
      {
       "label": "II&I 영업 EBIT",
       "value": "176",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 -47백만 달러",
       "src": 1
      },
      {
       "label": "PM&C 영업 EBIT",
       "value": "154",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +74백만 달러",
       "src": 1
      },
      {
       "label": "영업현금흐름",
       "value": "1.8",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "잉여현금흐름",
       "value": "1.1",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "설비투자",
       "value": "706",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +25%",
       "src": 3
      },
      {
       "label": "분기 주당 배당(선언)",
       "value": "0.35",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 동기와 같음",
       "src": 3
      },
      {
       "label": "세계 에틸렌 가동률(업계, 경영진 제시)",
       "value": "80% 초반",
       "unit": "",
       "period": "2026년 10월 컨콜 시점",
       "change": "",
       "src": 4
      },
      {
       "label": "미국 걸프 가동률(경영진 제시)",
       "value": "90% 이상",
       "unit": "",
       "period": "2026년 10월 컨콜 시점",
       "change": "",
       "src": 5
      },
      {
       "label": "사다라 보증 장부상 부채",
       "value": "586",
       "unit": "백만 달러",
       "period": "2026-09-30",
       "change": "2025년 말 212백만 달러",
       "src": 2
      }
     ],
     "guidance": [
      {
       "text": "4분기 영업 EBITDA 약 15억달러를 제시했으며, 최근 PE 가격 상승과 자구책 효과 약 1억달러를 반영했다.",
       "src": [
        4,
        7
       ]
      },
      {
       "text": "4분기 세계 PE 통합 마진은 9월 가격 인상이 유지된다는 전제에서 3분기 대비 파운드당 약 2센트 개선돼 연말 계절성을 상쇄할 것으로 봤다.",
       "src": [
        4
       ]
      },
      {
       "text": "10월 파운드당 7센트, 11월 5센트 PE 가격 인상을 제안했으며, 인상이 반영되면 4분기 가이던스 대비 약 2억달러의 상방 요인이 있다(빅고 요약).",
       "src": [
        5,
        7
       ]
      },
      {
       "text": "자구책은 2025년 10억달러 비용 절감을 마쳤고 2026년 성장·생산성 개선 약 7억달러를 계획보다 앞당겨 달성 중이며, 2027년에는 약 13억달러의 이익 개선 효과를 예상했다.",
       "src": [
        4,
        6
       ]
      },
      {
       "text": "2026년 설비투자는 포트 서스캐처원 Path2Zero 포함 약 25억달러를 유지했고, 9개월 누계 집행액은 18.41억달러(전년 동기 19.11억달러)다.",
       "src": [
        2,
        3
       ]
      },
      {
       "text": "Path2Zero는 2026년 1월 재추진을 결정해 1단계 2029년 말, 2단계 2030년 말 가동 예정이며 총 설비투자는 약 75억달러다.",
       "src": [
        9,
        10
       ]
      },
      {
       "text": "경영진은 업계 가동률이 2020년대 말 중간 사이클 수준으로 돌아갈 수 있다고 봤으나, 중동 사태를 포함한 시장 불확실성이 여전히 크다고 밝혔다.",
       "src": [
        4
       ]
      }
     ],
     "read_through": {
      "text": "미국 걸프 설비가 90% 이상 가동하는 가운데 중동 합작 설비 감산으로 아시아 물량이 줄어 PE 가격은 전 지역에서 전년보다 높게 유지되고 있다. 4분기 통합 마진은 9~11월 가격 인상이 정착하는지에 따라 달라진다.",
      "desk": "products"
     },
     "sources": [
      {
       "id": 1,
       "title": "Dow reports third quarter 2026 results",
       "publisher": "Dow",
       "date": "2026-10-22",
       "url": "https://investors.dow.com/en/news/news-details/2026/Dow-reports-third-quarter-2026-results/default.aspx"
      },
      {
       "id": 2,
       "title": "Dow Inc. Form 10-Q for the quarter ended September 30, 2026",
       "publisher": "SEC EDGAR",
       "date": "2026-10-23",
       "url": "https://www.sec.gov/Archives/edgar/data/0001751788/000175178826000160/dow-20260930.htm"
      },
      {
       "id": 3,
       "title": "Dow Inc. XBRL company facts (Form 10-Q, period ended 2026-09-30)",
       "publisher": "SEC data.sec.gov",
       "date": "2026-10-23",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001751788.json"
      },
      {
       "id": 4,
       "title": "Dow (DOW) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-22",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/22/dow-dow-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 5,
       "title": "Q3 2026 Earnings Calls: Dow Says Closures Will Lead to Petchem Recovery",
       "publisher": "RBN Energy",
       "date": "",
       "url": "https://rbnenergy.com/daily-posts/analyst-insight/q3-2026-earnings-calls-dow-says-closures-will-lead-petchem-recovery"
      },
      {
       "id": 6,
       "title": "Dow Inc (DOW) Q3 2026 Earnings Call Highlights: Double-Digit Sales Growth and $1.3 Billion Self-Help Tailwind",
       "publisher": "GuruFocus",
       "date": "",
       "url": "https://www.gurufocus.com/news/9137667/dow-inc-dow-q3-2026-earnings-call-highlights-doubledigit-sales-growth-and-13-billion-selfhelp-tailwind"
      },
      {
       "id": 7,
       "title": "[DOW Q3 2026 Earnings Call] Dow Posts 13% Sales Growth, $1.5 Billion EBITDA as Polyethylene Pricing and $700 Million Self-Help Offset Cost Pressures; Q4 Guide Flat at ~$1.5 Billion with $200 Million Price-Hike Upside",
       "publisher": "BigGo Finance",
       "date": "2026-10-22",
       "url": "https://finance.biggo.com/news/US_DOW_2026-10-22"
      },
      {
       "id": 8,
       "title": "Earnings call transcript: Dow beats Q3 2026 estimates as shares rise premarket",
       "publisher": "Investing.com",
       "date": "",
       "url": "https://www.investing.com/news/transcripts/earnings-call-transcript-dow-beats-q3-2026-estimates-as-shares-rise-premarket-93CH-4966222"
      },
      {
       "id": 9,
       "title": "Dow greenlights Path2Zero cracker project after delay, Phase 1 start-up for end-2029",
       "publisher": "ICIS",
       "date": "2026-01-29",
       "url": "https://www.icis.com/explore/resources/news/2026/01/29/11175679/dow-greenlights-path2zero-cracker-project-after-delay-phase-1-start-up-for-end-2029/"
      },
      {
       "id": 10,
       "title": "Dow announces 2029 startup of Phase 1 of its $7.5-B Path2Zero ethylene project",
       "publisher": "Hydrocarbon Processing",
       "date": "",
       "url": "https://www.hydrocarbonprocessing.com/news/2026/02/dow-announces-2029-startup-of-phase-1-of-its-75-b-path2zero-ethylene-project/"
      },
      {
       "id": 11,
       "title": "Dow's Transition: Karen S. Carter Named Next CEO Amid Continued Focus on Growth and Innovation",
       "publisher": "Market Chameleon",
       "date": "2026-04-14",
       "url": "https://marketchameleon.com/articles/b/2026/4/14/dow-transition-karen-carter-appointed-ceo-jim-fitterling-executive-chair"
      },
      {
       "id": 12,
       "title": "Dow Inc. Form 8-K Exhibit 99.1, 3Q26 earnings release schedules (significant items)",
       "publisher": "SEC EDGAR",
       "date": "2026-10-22",
       "url": "https://www.sec.gov/Archives/edgar/data/0001751788/000175178826000155/exhibit991enrschedules3q26.htm"
      },
      {
       "id": 13,
       "title": "Dow Inc. Form 8-K Exhibit 99.1, 1Q26 earnings release schedules (significant items)",
       "publisher": "SEC EDGAR",
       "date": "",
       "url": "https://www.sec.gov/Archives/edgar/data/0001751788/000175178826000131/exhibit991enrschedules1q26.htm"
      }
     ]
    },
    {
     "name_kr": "라이온델바젤",
     "name_en": "LyondellBasell Industries N.V.",
     "ticker": "LYB",
     "yahoo": "LYB",
     "exchange": "NYSE",
     "country": "네덜란드(본사 미국 휴스턴)",
     "cik": 1489393,
     "role_kr": "미국 에탄 기반 올레핀·폴리올레핀과 PO·옥시퓨얼(휘발유 첨가제) 중간재를 생산하며 유럽 자산을 매각·폐쇄하고 있다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-30",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 순이익은 7.58억달러(희석 EPS 2.32달러), 일회성 제외 8.28억달러(2.54달러)로 전년 동기 순손실 8.90억달러에서 흑자로 돌아섰고, 매출은 84.99억달러로 전년 대비 10% 늘었다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "EBITDA는 14억달러, 일회성 제외 15억달러이며, 일회성 항목(주당 0.22달러)에는 유럽 PO 합작 설비 폐쇄 비용이 들어 있다.",
       "src": [
        1
       ]
      },
      {
       "text": "I&D 일회성 제외 EBITDA는 사상 최대인 7.95억달러로 2분기의 두 배를 넘었다. 6월 재가동한 베이포트 PO/TBA가 정상 가동률로 돌아왔고, 세계 공급 차질로 휘발유 크랙과 옥탄 가치가 오르며 옥시퓨얼 마진이 커졌다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "O&P 미주 EBITDA는 6.41억달러로 2분기 11.83억달러에서 46% 줄었고(가격 약세에 따른 마진 축소), 업계 통합 PE 마진은 3분기 말 2025년 수준보다 약 50% 높다.",
       "src": [
        2,
        1,
        9
       ]
      },
      {
       "text": "미국 에탄 가격은 3분기에 전분기 대비 14% 올랐고 컨콜 시점 갤런당 약 30센트로 3분기 평균보다 24% 높으며, 경영진은 중동 분쟁 영향이 이제 원료 원가에 반영되기 시작했다고 했다.",
       "src": [
        6,
        9
       ]
      },
      {
       "text": "O&P EAI EBITDA는 2,600만달러로 2분기 -4.32억달러(유럽 O&P 자산 매각손실 7.34억달러 포함)에서 개선됐고, 5월 유럽 자산 매각으로 부문 능력의 약 25%가 빠졌다. 3분기 가동률은 O&P 미주 약 85%, O&P EAI 약 65%, I&D 약 85%다.",
       "src": [
        2,
        5
       ]
      },
      {
       "text": "영업현금흐름은 17억달러(운전자본 회수 포함), 설비투자는 3.03억달러로 잉여현금흐름은 약 14억달러(EBITDA 대비 약 100%)다. 9월 말 현금은 32억달러, 가용 유동성은 77억달러이며 9월 5억유로 사채를 예정대로 상환했다.",
       "src": [
        1,
        3,
        7
       ]
      },
      {
       "text": "분기 배당은 주당 0.69달러로 전년 동기 1.37달러에서 약 50% 줄었고 9개월 자사주 매입은 없다. 9개월 설비투자는 8.42억달러로 전년 동기 14.28억달러보다 41% 줄었다.",
       "src": [
        3
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "8,499",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +10.0%",
       "src": 3
      },
      {
       "label": "순이익",
       "value": "758",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 -890백만 달러",
       "src": 3
      },
      {
       "label": "희석 EPS",
       "value": "2.32",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 -2.77달러",
       "src": 3
      },
      {
       "label": "일회성 제외 희석 EPS",
       "value": "2.54",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "EBITDA",
       "value": "1.4",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "일회성 제외 EBITDA",
       "value": "1.5",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "O&P 미주 EBITDA",
       "value": "641",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 1,183백만 달러 대비 -46%",
       "src": 2
      },
      {
       "label": "O&P EAI EBITDA",
       "value": "26",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 -432백만 달러(매각손실 포함)",
       "src": 2
      },
      {
       "label": "I&D EBITDA(일회성 제외)",
       "value": "795",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "사상 최대, 전분기의 2배 이상",
       "src": 4
      },
      {
       "label": "APS EBITDA(일회성 제외)",
       "value": "45",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 보합",
       "src": 4
      },
      {
       "label": "O&P 미주 가동률",
       "value": "약 85",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "O&P EAI 가동률",
       "value": "약 65",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "I&D 가동률",
       "value": "약 85",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "미국 에탄 가격",
       "value": "+14",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "전분기 대비",
       "src": 6
      },
      {
       "label": "영업현금흐름(9개월 누계-상반기)",
       "value": "1,716",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      },
      {
       "label": "설비투자(9개월 누계-상반기)",
       "value": "303",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 406백만 달러 대비 -25%",
       "src": 3
      },
      {
       "label": "분기 주당 배당(선언)",
       "value": "0.69",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 1.37달러",
       "src": 3
      },
      {
       "label": "현금성자산",
       "value": "3,227",
       "unit": "백만 달러",
       "period": "2026-09-30",
       "change": "",
       "src": 3
      }
     ],
     "guidance": [
      {
       "text": "4분기 실적은 3분기의 이례적 강세에서 둔화될 것으로 봤으며, 북미 PE 수요는 견조하나 원가 상승과 연말 계절성이 마진을 누를 것이라고 했다.",
       "src": [
        1,
        9
       ]
      },
      {
       "text": "4분기 목표 가동률은 O&P 미주 약 85%(3분기와 같음), O&P EAI 약 60%(3분기 약 65%), I&D 약 75%(3분기 85%, 계획 정비·계절성 반영)다.",
       "src": [
        5,
        1
       ]
      },
      {
       "text": "10월과 11월 각각 파운드당 5센트 PE 가격 인상을 발표했고, 에탄 가격은 4분기 신규 분별설비 가동으로 진정될 것으로 봤다.",
       "src": [
        6,
        9
       ]
      },
      {
       "text": "바나커 CEO는 유럽 통합 마진이 에너지·물류비 상승, 폴리머 스프레드 하락, 원료 유연성 저하로 압박받을 수 있고 분쟁 이전 여건 회복에는 여러 분기가 걸릴 것으로 봤다.",
       "src": [
        8,
        4
       ]
      },
      {
       "text": "연말 현금 약 34억달러를 목표로 하며, 자본 배분 우선순위는 투자등급 유지, 유지보수·안전 투자, 배당, 이후 자사주 매입 순이다.",
       "src": [
        8
       ]
      },
      {
       "text": "옛 휴스턴 정유소 부지를 발레로에 3.205억달러에 매각하는 거래는 4분기 종결 예정이며, 연간 현금흐름 5,000만~1억달러 개선 효과를 예상했다.",
       "src": [
        6,
        8
       ]
      }
     ],
     "read_through": {
      "text": "미국 에탄 원가가 3분기 14% 오른 뒤 4분기 초 3분기 평균보다 24% 높아 미국 PE 통합 마진은 4분기에 줄어들 가능성이 높고, 유럽은 가동률 60%대와 자산 매각·폐쇄로 공급이 줄고 있으며, 세계 공급 차질에 따른 휘발유·옥탄 강세가 옥시퓨얼 이익을 키웠다.",
      "desk": "products"
     },
     "sources": [
      {
       "id": 1,
       "title": "LyondellBasell reports third quarter 2026 earnings",
       "publisher": "LyondellBasell",
       "date": "2026-10-30",
       "url": "https://www.lyondellbasell.com/en/who-we-are/updates-events/corporate--financial-news/lyondellbasell-reports-third-quarter-2026-earnings/"
      },
      {
       "id": 2,
       "title": "LyondellBasell Industries N.V. Form 10-Q for the quarter ended September 30, 2026",
       "publisher": "SEC EDGAR",
       "date": "2026-10-30",
       "url": "https://www.sec.gov/Archives/edgar/data/0001489393/000148939326000070/lyb-20260930.htm"
      },
      {
       "id": 3,
       "title": "LyondellBasell XBRL company facts (Form 10-Q, period ended 2026-09-30)",
       "publisher": "SEC data.sec.gov",
       "date": "2026-10-30",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001489393.json"
      },
      {
       "id": 4,
       "title": "LyondellBasell (LYB) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-30",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/30/lyondellbasell-lyb-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 5,
       "title": "LyondellBasell Q3 2026 slides: strong cash flow offsets margin pressure",
       "publisher": "Investing.com",
       "date": "",
       "url": "https://www.investing.com/news/company-news/lyondellbasell-q3-2026-slides-strong-cash-flow-offsets-margin-pressure-93CH-4989516"
      },
      {
       "id": 6,
       "title": "Q3 2026 Earnings Calls: LyondellBasell Sees Ethane Costs Climb as Polyethylene Demand Holds",
       "publisher": "RBN Energy",
       "date": "",
       "url": "https://rbnenergy.com/daily-posts/analyst-insight/q3-2026-earnings-calls-lyondellbasell-sees-ethane-costs-climb"
      },
      {
       "id": 7,
       "title": "LyondellBasell Industries NV (LYB) (Q3 2026) Earnings Call Highlights: Record I&D EBITDA and 100% Cash Conversion Offset European Weakness",
       "publisher": "GuruFocus",
       "date": "",
       "url": "https://www.gurufocus.com/news/9160536/lyondellbasell-industries-nv-lyb-q3-2026-earnings-call-highlights-record-id-ebitda-and-100-cash-conversion-offset-european-weakness"
      },
      {
       "id": 8,
       "title": "LyondellBasell Industries NV (LYB) (Q3 2026) Earnings Call Highlights: Record I&D EBITDA ...",
       "publisher": "Yahoo Finance",
       "date": "",
       "url": "https://finance.yahoo.com/markets/stocks/articles/lyondellbasell-industries-nv-lyb-q3-010756163.html"
      },
      {
       "id": 9,
       "title": "Earnings call transcript: LyondellBasell Q3 2026 profit tops cash flow, shares rise",
       "publisher": "Investing.com",
       "date": "",
       "url": "https://www.investing.com/news/transcripts/earnings-call-transcript-lyondellbasell-q3-2026-profit-tops-cash-flow-shares-rise-93CH-4989491"
      }
     ]
    },
    {
     "name_kr": "웨스트레이크",
     "name_en": "Westlake Corporation",
     "ticker": "WLK",
     "yahoo": "WLK",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1262823,
     "role_kr": "미국 걸프 에탄 크래커에서 PVC·가성소다(클로르알칼리)와 건축자재까지 수직계열화한 업체다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-04",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 EBITDA는 3.50억달러로 2분기 6.79억달러의 절반 수준이며, 일회성 제외 EBITDA는 4.08억달러로 전년 동기 3.13억달러보다 30% 늘었다.",
       "src": [
        5,
        6
       ]
      },
      {
       "text": "영업이익은 4,300만달러(2분기 3.64억달러), 지배주주 순이익은 600만달러, 희석 EPS는 0.05달러이며, 일회성 제외 EPS 0.45달러는 시장 예상(야후 집계 0.50달러, 인베스팅닷컴 0.72달러)을 밑돌았다. 매출은 29.81억달러로 전분기 대비 8.9% 줄었다.",
       "src": [
        1,
        5,
        4
       ]
      },
      {
       "text": "PEM(올레핀·PVC·가성소다) 일회성 제외 EBITDA는 2.15억달러로 전년 대비 1.25억달러 늘었으나 2분기 4.16억달러에서 줄었고, 마진은 11%(2분기 21%)로 중간 사이클을 크게 밑돈다.",
       "src": [
        5,
        6
       ]
      },
      {
       "text": "HIP(주택·인프라 제품) EBITDA는 1.95억달러(마진 18%)로 2분기 2.76억달러에서 8,100만달러 줄었고, 판매량 감소와 경유·운송비 상승이 원인이다.",
       "src": [
        5,
        6
       ]
      },
      {
       "text": "유럽 범용 PVC 가격은 2분기 상승 후 3분기 평균 파운드당 약 0.20달러 떨어졌다. 가성소다 시장은 중동 분쟁에 따른 운송 가용성·운임 영향으로 지역별로 따로 움직였고 세계적으로는 보합 또는 소폭 약세다.",
       "src": [
        6,
        7
       ]
      },
      {
       "text": "3분기 구조조정 비용은 5,800만달러이며 9월 독일 쾰른 공장 폐쇄 관련 비용 5,100만달러를 반영했다. 회사는 미국 걸프 저가 원료 기반 공급을 늘려 유럽 에너지 비용 급등 부담을 메우고 있다. 회사는 2026년 9월 24일자 사업 철수·처분 비용(Item 2.05) 8-K를 제출했다.",
       "src": [
        1,
        6,
        3,
        2
       ]
      },
      {
       "text": "잉여현금흐름은 2.20억달러(영업현금흐름 4.08억달러, 설비투자 1.88억달러)이고, 9개월 설비투자는 5.91억달러로 전년 동기 대비 22% 줄었다.",
       "src": [
        5,
        1
       ]
      },
      {
       "text": "분기 주당 배당 0.533달러를 선언했고 9개월 자사주 매입은 3,000만달러다. 수익성 개선 계획으로 9개월 누적 EBITDA가 5억달러 개선됐다.",
       "src": [
        1,
        7
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "2,981",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +5.0%, 전분기 대비 -8.9%",
       "src": 1
      },
      {
       "label": "EBITDA",
       "value": "350",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 679백만 달러",
       "src": 5
      },
      {
       "label": "일회성 제외 EBITDA",
       "value": "408",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 313백만 달러 대비 +30%",
       "src": 5
      },
      {
       "label": "PEM 일회성 제외 EBITDA",
       "value": "215",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 416백만 달러, 전년 대비 +125백만 달러",
       "src": 5
      },
      {
       "label": "PEM EBITDA 마진(일회성 제외)",
       "value": "11",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "전분기 21%",
       "src": 6
      },
      {
       "label": "HIP EBITDA",
       "value": "195",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전분기 276백만 달러, 전년 215백만 달러",
       "src": 5
      },
      {
       "label": "HIP EBITDA 마진",
       "value": "18",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "영업이익",
       "value": "43",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 -766백만 달러, 전분기 364백만 달러",
       "src": 1
      },
      {
       "label": "지배주주 순이익",
       "value": "6",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 -782백만 달러, 전분기 260백만 달러",
       "src": 1
      },
      {
       "label": "희석 EPS",
       "value": "0.05",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 -6.06달러",
       "src": 1
      },
      {
       "label": "일회성 제외 EPS",
       "value": "0.45",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "컨센서스 0.50달러(야후 집계)·0.72달러(인베스팅닷컴)",
       "src": 4
      },
      {
       "label": "구조조정 비용",
       "value": "58",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 17백만 달러",
       "src": 1
      },
      {
       "label": "잉여현금흐름",
       "value": "220",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "설비투자(9개월 누계-상반기)",
       "value": "188",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 239백만 달러 대비 -21%",
       "src": 1
      },
      {
       "label": "분기 주당 배당(선언)",
       "value": "0.533",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "전년 0.53달러",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "4분기 HIP 매출은 9억~10억달러, EBITDA 마진은 약 13%로 제시했다.",
       "src": [
        6,
        7
       ]
      },
      {
       "text": "가성소다 계약가격은 10월 파운드당 5센트 올랐고 업계는 11월 10센트 추가 인상을 예상한다(컨콜 요약 1곳 기준).",
       "src": [
        6,
        7
       ]
      },
      {
       "text": "수익성 개선 계획은 2026년 연간 6억달러 이익 개선을 목표로 하며, 유럽 사업은 2027년 현금흐름 균형을 목표로 하고 빌헬름스하펜이 2027년부터 기여할 것으로 봤다.",
       "src": [
        6,
        7
       ]
      },
      {
       "text": "2027년 업계 PVC 수지와 가성소다 생산능력은 각각 약 2% 늘 것으로 봤다.",
       "src": [
        6
       ]
      },
      {
       "text": "CFO(Jonathan Baksht)는 업황 회복이 다른 지역 설비 폐쇄에 달려 있다고 봤다.",
       "src": [
        3
       ]
      }
     ],
     "read_through": {
      "text": "PVC·가성소다 체인은 3분기에 2분기 가격 급등분을 반납했다. 유럽 PVC가 평균 파운드당 약 0.20달러 떨어지고 PEM 마진이 21%에서 11%로 낮아졌다. 10월 가성소다 계약가는 파운드당 5센트 올랐다.",
      "desk": "products"
     },
     "sources": [
      {
       "id": 1,
       "title": "Westlake Corporation XBRL company facts (Form 10-Q, period ended 2026-09-30)",
       "publisher": "SEC data.sec.gov",
       "date": "2026-11-04",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001262823.json"
      },
      {
       "id": 2,
       "title": "Westlake Corporation EDGAR submissions (8-K 2026-11-04 Items 2.02/7.01/9.01; 8-K filed 2026-09-29 Item 2.05; 10-Q 2026-11-04)",
       "publisher": "SEC data.sec.gov",
       "date": "2026-11-04",
       "url": "https://data.sec.gov/submissions/CIK0001262823.json"
      },
      {
       "id": 3,
       "title": "Q3 2026 Earnings Calls: Westlake Leans Harder on Gulf Coast Supply as Europe's Energy Costs Soar",
       "publisher": "RBN Energy",
       "date": "",
       "url": "https://rbnenergy.com/daily-posts/analyst-insight/q3-2026-earnings-calls-westlake-leans-harder-gulf-coast-supply-europes"
      },
      {
       "id": 4,
       "title": "Earnings call transcript: Westlake misses Q3 2026 EPS forecast as sales beat",
       "publisher": "Investing.com",
       "date": "",
       "url": "https://uk.investing.com/news/stock-market-news/earnings-call-transcript-westlake-misses-q3-2026-eps-forecast-as-sales-beat-93CH-4957902"
      },
      {
       "id": 5,
       "title": "Westlake Corporation Reports Third Quarter 2026 Results",
       "publisher": "Westlake",
       "date": "2026-11-04",
       "url": "https://investors.westlake.com/news-releases/news-release-details/westlake-corporation-reports-third-quarter-2026-results"
      },
      {
       "id": 6,
       "title": "Westlake (WLK) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-11-04",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/11/04/westlake-wlk-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 7,
       "title": "Westlake Corp (WLK) (Q3 2026) Earnings Call Highlights: $408 Million EBITDA, Margin Expansion, and a $600 Million Profitability Push",
       "publisher": "GuruFocus",
       "date": "",
       "url": "https://www.gurufocus.com/news/9171797/westlake-corp-wlk-q3-2026-earnings-call-highlights-408-million-ebitda-margin-expansion-and-a-600-million-profitability-push"
      }
     ]
    },
    {
     "name_kr": "사빅",
     "name_en": "Saudi Basic Industries Corporation (SABIC)",
     "ticker": "2010",
     "yahoo": "2010.SR",
     "exchange": "Saudi Exchange(Tadawul)",
     "country": "사우디아라비아",
     "cik": null,
     "role_kr": "주베일·얀부에 크래커를 둔 중동 최대 석유화학 업체로, 사우디 아람코가 최대주주다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-25",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 매출은 281.7억리얄로 전분기 대비 14% 늘었고, 조정 EBITDA는 47.5억리얄로 40% 늘었다.",
       "src": [
        1
       ]
      },
      {
       "text": "조정 순이익은 8.4억리얄로 2분기 조정 순손실 3.8억리얄에서 흑자로 돌아섰고, 계속사업 보고 순이익은 클라리언트 관련 손상차손 환입 4.51억달러를 포함해 6.76억달러다(컨콜 요약).",
       "src": [
        1,
        4,
        3
       ]
      },
      {
       "text": "판매량은 전분기 대비 약 30% 늘고 평균 판매가격은 13% 떨어졌다. 회사는 대체 해상 경로와 항만으로 수출이 재개된 것을 판매량 회복 요인으로 들었다.",
       "src": [
        2,
        3
       ]
      },
      {
       "text": "판매량은 위기 이전의 약 80% 수준까지 회복했고, 홍해 연안 얀부·라비그·제다 수출 경로에 더해 NEOM 항을 요소 수출 창구로 추가했다.",
       "src": [
        3,
        5
       ]
      },
      {
       "text": "조정 EBITDA 마진은 약 17%로 2분기 대비 323bp 올라 약 4년 만의 최고치이며, 9월 말 순부채는 약 8.1억달러다.",
       "src": [
        2
       ]
      },
      {
       "text": "경영진은 현재의 높은 석유화학 가격을 일시적으로 보고 중동 생산이 위기 이전 수준으로 돌아오면 정상화될 것으로 봤으며, 업계 가동률은 사이클 저점 부근에서 점진적으로 회복할 것으로 봤다.",
       "src": [
        3,
        5
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "28.17",
       "unit": "십억 리얄",
       "period": "2026년 3분기",
       "change": "전분기 대비 +14%",
       "src": 1
      },
      {
       "label": "조정 EBITDA",
       "value": "4.75",
       "unit": "십억 리얄",
       "period": "2026년 3분기",
       "change": "전분기 대비 +40%",
       "src": 1
      },
      {
       "label": "조정 순이익",
       "value": "0.84",
       "unit": "십억 리얄",
       "period": "2026년 3분기",
       "change": "전분기 -0.38십억 리얄",
       "src": 1
      },
      {
       "label": "계속사업 보고 순이익(컨콜 요약)",
       "value": "676",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "클라리언트 손상 환입 451백만 달러 포함",
       "src": 3
      },
      {
       "label": "조정 EBITDA 마진",
       "value": "약 17",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "전분기 대비 +323bp",
       "src": 2
      },
      {
       "label": "판매량",
       "value": "+30",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "전분기 대비",
       "src": 2
      },
      {
       "label": "평균 판매가격",
       "value": "-13",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "전분기 대비",
       "src": 3
      },
      {
       "label": "판매량(위기 이전 대비)",
       "value": "약 80",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      },
      {
       "label": "순부채",
       "value": "약 0.81",
       "unit": "십억 달러",
       "period": "2026-09-30",
       "change": "",
       "src": 2
      }
     ],
     "guidance": [
      {
       "text": "4분기 구체적 가이던스는 제시하지 않았다.",
       "src": [
        5,
        3
       ]
      },
      {
       "text": "2026년 설비투자 가이던스를 33억달러로 기존 35억~40억달러에서 낮췄다(요약 기사 기준, 녹취 원문 미확인).",
       "src": [
        3
       ]
      },
      {
       "text": "배당은 장기적으로 유지·확대한다는 입장을 밝혔다.",
       "src": [
        3
       ]
      }
     ],
     "read_through": {
      "text": "중동산 석유화학 공급은 홍해 쪽 대체 경로로 위기 이전의 약 80%까지 돌아왔고 사빅 평균 판매가격이 13% 떨어졌으며, 회사가 현재 가격을 일시적으로 보는 만큼 아시아 범용 폴리머 가격의 하방 압력이 커질 가능성이 높다.",
      "desk": "products"
     },
     "sources": [
      {
       "id": 1,
       "title": "SABIC reports increases of 14% in revenue and 40% in EBITDA Q-o-Q, demonstrates exceptional operational excellence",
       "publisher": "SABIC",
       "date": "",
       "url": "https://www.sabic.com/en/news/51794-sabic-reports-increases-ebitda-q-o-q"
      },
      {
       "id": 2,
       "title": "SABIC Q3 2026 slides: volumes surge 30%, EBITDA margin hits 17%",
       "publisher": "Investing.com",
       "date": "",
       "url": "https://www.investing.com/news/company-news/sabic-q3-2026-slides-volumes-surge-30-ebitda-margin-hits-17-93CH-4972860"
      },
      {
       "id": 3,
       "title": "Earnings call transcript: SABIC Q3 2026 profit jumps as volumes recover",
       "publisher": "Investing.com",
       "date": "",
       "url": "https://www.investing.com/news/transcripts/earnings-call-transcript-sabic-q3-2026-profit-jumps-as-volumes-recover-93CH-4972840"
      },
      {
       "id": 4,
       "title": "SABIC returns to profitability with $224m adjusted net income in Q3",
       "publisher": "Arab News",
       "date": "",
       "url": "https://www.arabnews.com/finance/sabic-returns-to-profitability-with-224m-adjusted-net-income-in-q3-3008150"
      },
      {
       "id": 5,
       "title": "Saudi Basic Industries Corp. (2010.SR) Q3 FY2026 earnings call transcript",
       "publisher": "Yahoo Finance",
       "date": "",
       "url": "https://finance.yahoo.com/quote/2010.SR/earnings/2010.SR-Q3-2026-earnings_call-719874.html"
      }
     ]
    },
    {
     "name_kr": "LG화학",
     "name_en": "LG Chem, Ltd.",
     "ticker": "051910",
     "yahoo": "051910.KS",
     "exchange": "KRX(KOSPI)",
     "country": "한국",
     "cik": null,
     "role_kr": "여수·대산 나프타 분해설비(NCC)를 보유한 한국 최대 석유화학 업체이며, 연결 실적에 LG에너지솔루션(배터리)이 포함된다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-05",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 연결 매출은 15조 4,960억원으로 전년 대비 34.0%, 전분기 대비 9.3% 늘었으나 영업이익은 5,612억원으로 전년 대비 17.4%, 전분기 대비 6.4% 줄었다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "석유화학 부문은 매출 4조 7,547억원, 영업손실 1,756억원으로 적자 전환했다(전년 동기 영업이익 291억원).",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "회사는 컨퍼런스콜에서 원료가 역래깅에 따른 스프레드 악화, 운반비 급등, 환율 하락을 적자 원인으로 들었고, 물량 증가와 원가 절감으로 비용은 전분기보다 개선됐다고 했다.",
       "src": [
        1,
        3,
        6
       ]
      },
      {
       "text": "3월 중동 분쟁으로 여수 일부 NCC 가동을 일시 중단한 뒤 여수 1NCC와 대산 NCC를 높은 가동률로 운영해 왔으며, 가동률은 유가와 나프타 수급에 따라 탄력적으로 조정할 계획이다.",
       "src": [
        4,
        5,
        6
       ]
      },
      {
       "text": "첨단소재 영업이익은 397억원으로 전년 대비 약 5.7배 늘었고, LG에너지솔루션 영업이익 7,560억원이 석유화학 적자를 메웠다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "당기순손실은 6,000억원으로 전년 동기 흑자에서 적자로 돌아섰으며, 환율 하락에 따른 LG에너지솔루션 외화 자산·부채 평가손실이 원인으로 꼽혔다.",
       "src": [
        7,
        8
       ]
      },
      {
       "text": "석유화학 사업재편은 여수에서 GS칼텍스와 NCC 통합을 협의 중이며, 당초 2025년 말 제출 예정이던 계획안은 지분율·통합법인 지배구조 협의로 늦어졌고 감축 규모는 공개하지 않았다.",
       "src": [
        3,
        4
       ]
      }
     ],
     "metrics": [
      {
       "label": "연결 매출",
       "value": "154,960",
       "unit": "억원",
       "period": "2026년 3분기",
       "change": "전년 대비 +34.0%, 전분기 대비 +9.3%",
       "src": 1
      },
      {
       "label": "연결 영업이익",
       "value": "5,612",
       "unit": "억원",
       "period": "2026년 3분기",
       "change": "전년 대비 -17.4%, 전분기 대비 -6.4%",
       "src": 1
      },
      {
       "label": "석유화학 매출",
       "value": "47,547",
       "unit": "억원",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "석유화학 영업이익",
       "value": "-1,756",
       "unit": "억원",
       "period": "2026년 3분기",
       "change": "전년 동기 291억원",
       "src": 1
      },
      {
       "label": "첨단소재 영업이익",
       "value": "397",
       "unit": "억원",
       "period": "2026년 3분기",
       "change": "전년 대비 약 5.7배",
       "src": 2
      },
      {
       "label": "LG에너지솔루션 영업이익",
       "value": "7,560",
       "unit": "억원",
       "period": "2026년 3분기",
       "change": "",
       "src": 2
      },
      {
       "label": "당기순이익",
       "value": "-6,000",
       "unit": "억원",
       "period": "2026년 3분기",
       "change": "전년 동기 흑자에서 적자 전환",
       "src": 8
      }
     ],
     "guidance": [
      {
       "text": "4분기 석유화학은 고유가 부담과 여수 1NCC 정기보수에 따른 기회손실이 예상된다고 했다.",
       "src": [
        4,
        5
       ]
      },
      {
       "text": "공급 과잉은 2027년에도 이어지고 2031년까지 동북아 신규 증설이 폐쇄 물량을 크게 웃돌 것으로 봤다.",
       "src": [
        4,
        10
       ]
      },
      {
       "text": "차동석 CFO는 일부 절차 지연에도 석유화학 사업재편 계획안을 연내 제출하는 것을 목표로 한다고 밝혔다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "첨단소재는 2027년 양극재 출하량을 2배 이상 늘릴 계획이다.",
       "src": [
        9
       ]
      }
     ],
     "read_through": {
      "text": "LG화학 석유화학 부문이 고가 원료 역래깅과 운반비 급등으로 3분기 영업손실 1,756억원을 낸 만큼, 4분기 여수 1NCC 정기보수와 유가·나프타 수급에 따른 탄력 가동으로 한국 NCC의 나프타 투입은 3분기보다 줄 가능성이 높다.",
      "desk": "products"
     },
     "sources": [
      {
       "id": 1,
       "title": "LG화학, 3분기 영업익 5612억원…석유화학 부문 적자전환",
       "publisher": "뉴스핌",
       "date": "2026-11-05",
       "url": "https://www.newspim.com/news/view/20261105000950"
      },
      {
       "id": 2,
       "title": "LG화학, 3분기 영업이익 5612억…석화 적자에 전년比 17.4%↓",
       "publisher": "글로벌이코노믹",
       "date": "2026-11-05",
       "url": "https://www.g-enews.com/article/Industry/2026/11/20261105161744953224debea800_1"
      },
      {
       "id": 3,
       "title": "[컨콜] LG화학 \"석유화학 사업 재편 계획안, 연내 제출 목표\"",
       "publisher": "데일리안",
       "date": "",
       "url": "https://www.dailian.co.kr/news/view/1711239/%EC%BB%A8%EC%BD%9C-LG%ED%99%94%ED%95%99-%EC%84%9D%EC%9C%A0%ED%99%94%ED%95%99-%EC%82%AC%EC%97%85-%EC%9E%AC%ED%8E%B8-%EA%B3%84-2026"
      },
      {
       "id": 4,
       "title": "LG화학, 석화 사업재편 연내 결론…\"2031년까지 공급과잉 지속\"",
       "publisher": "뉴스핌",
       "date": "2026-11-05",
       "url": "https://www.newspim.com/news/view/20261105001227"
      },
      {
       "id": 5,
       "title": "LG화학, 석화 부진에도 배터리는 웃었다…4Q 수익성 회복 기대",
       "publisher": "투데이신문",
       "date": "",
       "url": "https://www.ntoday.co.kr/news/articleView.html?idxno=130661"
      },
      {
       "id": 6,
       "title": "LG화학, 2026년 3분기 실적발표 컨퍼런스콜 전문",
       "publisher": "디일렉(THE ELEC)",
       "date": "",
       "url": "https://www.thelec.kr/news/articleView.html?idxno=64957"
      },
      {
       "id": 7,
       "title": "LG화학, 3분기 순손실 6000억원…석화 불황·배터리 둔화 '이중고'",
       "publisher": "EBN(인베스팅닷컴 전재)",
       "date": "",
       "url": "https://kr.investing.com/news/stock-market-news/article-2160768"
      },
      {
       "id": 8,
       "title": "LG화학 3분기 매출 15조4960억원…순손실 6000억원",
       "publisher": "비건뉴스",
       "date": "",
       "url": "https://www.vegannews.co.kr/news/article.html?no=401050"
      },
      {
       "id": 9,
       "title": "LG화학 \"석화 구조조정 연내 결론…내년 양극재 출하 2배 이상 확대\"",
       "publisher": "이코노믹리뷰",
       "date": "",
       "url": "https://www.econovill.com/news/articleView.html?idxno=756188"
      },
      {
       "id": 10,
       "title": "LG화학, 내년에도 석화 공급과잉 전망…고부가 전환 속도",
       "publisher": "딜사이트",
       "date": "",
       "url": "https://dealsite.co.kr/articles/172211"
      }
     ]
    },
    {
     "name_kr": "롯데케미칼",
     "name_en": "Lotte Chemical Corporation",
     "ticker": "011170",
     "yahoo": "011170.KS",
     "exchange": "KRX(KOSPI)",
     "country": "한국",
     "cik": null,
     "role_kr": "여수·대산 나프타 분해설비(NCC)와 미국·말레이시아·인도네시아 설비를 운영하는 한국 범용 석유화학 업체다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-06",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 연결 매출은 5조 3,951억원으로 전년 대비 12.7% 늘었으나 영업손실은 2,814억원으로 2분기 영업이익 1,101억원에서 적자 전환했고, 전년 동기 영업손실 1,326억원보다 적자 폭이 1,488억원 커졌다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "기초화학 부문(LC타이탄, LC USA, 롯데대산석화 포함)은 매출 3조 7,235억원, 영업손실 2,166억원으로 원료가 하락에 따른 역래깅, 스프레드 축소, 환율 하락의 영향을 받았다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "회사는 컨퍼런스콜에서 스프레드 악화가 약 4,900억원, 환율 하락과 해상운임 상승이 약 800억원의 영업손실 요인이었다고 밝혔고, 중동 지정학 리스크에 따른 원료·제품 가격 변동성 확대를 원가 부담으로 꼽았다.",
       "src": [
        4,
        5,
        1
       ]
      },
      {
       "text": "NCC 가동률은 국내(여수 포함) 70% 수준, 말레이시아 75%, 인도네시아 70% 수준이다.",
       "src": [
        5
       ]
      },
      {
       "text": "첨단소재 부문은 매출 1조 893억원, 영업손실 154억원으로 적자 전환했고, ABS 스프레드는 약 200달러 수준으로 2027년 상반기까지 비슷할 것으로 봤다.",
       "src": [
        1,
        5
       ]
      },
      {
       "text": "당기순손실은 2,898억원이며, 3분기 말 차입금은 8조 7,692억원으로 전분기보다 줄었다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "대산은 9월 HD현대케미칼과 롯데대산석화를 합친 H&L어드밴스드를 출범해 향후 3년간 롯데케미칼 대산 NCC 110만톤 가동을 멈추고, 여수는 정부 승인에 따라 여천NCC 2·3공장(92만톤·47만톤)을 멈추고 1공장을 롯데케미칼 여수공장과 통합한다. 대산·여수 확정 감축은 합계 249만톤으로 정부·업계 목표 270만~370만톤의 67~92% 수준이며, 울산은 감축안이 확정되지 않았다.",
       "src": [
        9,
        10,
        6,
        11
       ]
      },
      {
       "text": "2분기에는 중동 전쟁 이후 73%로 낮췄던 대산 NCC 가동률을 4월 83%로 올렸고, 1분기 컨콜(5월 11일)에서는 역외 추가 물량 확보로 나프타를 안정적으로 보유해 가동률에 지장이 없다고 밝혔다.",
       "src": [
        7,
        8
       ]
      }
     ],
     "metrics": [
      {
       "label": "연결 매출",
       "value": "53,951",
       "unit": "억원",
       "period": "2026년 3분기",
       "change": "전년 대비 +12.7%",
       "src": 1
      },
      {
       "label": "연결 영업이익",
       "value": "-2,814",
       "unit": "억원",
       "period": "2026년 3분기",
       "change": "전분기 1,101억원, 전년 동기 -1,326억원",
       "src": 1
      },
      {
       "label": "기초화학 매출",
       "value": "37,235",
       "unit": "억원",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "기초화학 영업이익",
       "value": "-2,166",
       "unit": "억원",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "첨단소재 매출",
       "value": "10,893",
       "unit": "억원",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "첨단소재 영업이익",
       "value": "-154",
       "unit": "억원",
       "period": "2026년 3분기",
       "change": "적자 전환",
       "src": 1
      },
      {
       "label": "당기순이익",
       "value": "-2,898",
       "unit": "억원",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "스프레드 악화 영향(경영진 제시)",
       "value": "약 -4,900",
       "unit": "억원",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "환율·해상운임 영향(경영진 제시)",
       "value": "약 -800",
       "unit": "억원",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "국내 NCC 가동률(여수 포함)",
       "value": "약 70",
       "unit": "%",
       "period": "2026년 3분기 컨콜 시점",
       "change": "",
       "src": 5
      },
      {
       "label": "말레이시아 NCC 가동률",
       "value": "약 75",
       "unit": "%",
       "period": "2026년 3분기 컨콜 시점",
       "change": "",
       "src": 5
      },
      {
       "label": "인도네시아 NCC 가동률",
       "value": "약 70",
       "unit": "%",
       "period": "2026년 3분기 컨콜 시점",
       "change": "",
       "src": 5
      },
      {
       "label": "차입금",
       "value": "87,692",
       "unit": "억원",
       "period": "2026-09-30",
       "change": "전분기 대비 감소",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "4분기에는 고가 원료 역래깅 부담이 다소 줄고 판매량 증가와 스프레드 개선으로 손익이 3분기보다 나아질 것으로 봤다.",
       "src": [
        5,
        4
       ]
      },
      {
       "text": "전방 산업 부진, 연말 재고 조정, 운임·환율 부담으로 회복 속도는 점진적이며, 글로벌 공급 과잉과 수요 회복 지연으로 업황 부진은 이어질 것으로 봤다.",
       "src": [
        5,
        1
       ]
      },
      {
       "text": "가동률은 증설 속도 둔화와 일본 설비 구조 개편으로 점진적으로 회복될 것으로 봤다.",
       "src": [
        5
       ]
      },
      {
       "text": "여천NCC와의 여수 통합 법인은 2027년 상반기 출범이 목표다.",
       "src": [
        4,
        6
       ]
      }
     ],
     "read_through": {
      "text": "한국 NCC는 국내 가동률 70% 수준에서 역래깅 손실을 냈으며, 대산 110만톤과 여천NCC 139만톤 가동 중단이 진행되면 국내 에틸렌 생산과 나프타 수입 수요는 구조적으로 줄어든다.",
      "desk": "products"
     },
     "sources": [
      {
       "id": 1,
       "title": "롯데케미칼, 3분기 영업손실 2814억…원가 부담 가중",
       "publisher": "ZDNet Korea",
       "date": "2026-11-06",
       "url": "https://zdnet.co.kr/view/?no=20261106164238"
      },
      {
       "id": 2,
       "title": "롯데케미칼, 3분기 영업손실 2814억원",
       "publisher": "뉴스핌",
       "date": "2026-11-06",
       "url": "https://www.newspim.com/news/view/20261106001025"
      },
      {
       "id": 3,
       "title": "롯데케미칼, 3분기 영업손실 2814억…한 분기 만에 적자 전환",
       "publisher": "데일리안",
       "date": "",
       "url": "https://www.dailian.co.kr/news/view/1711879/%EB%A1%AF%EB%8D%B0%EC%BC%80%EB%AF%B8%EC%B9%BC-3%EB%B6%84%EA%B8%B0-%EC%98%81%EC%97%85%EC%86%90%EC%8B%A4-2814%EC%96%B5-2026"
      },
      {
       "id": 4,
       "title": "[컨콜] 롯데케미칼 \"스프레드 악화가 4900억 영업손실 발생시켜\"",
       "publisher": "데일리안",
       "date": "",
       "url": "https://www.dailian.co.kr/news/view/1711882/%EC%BB%A8%EC%BD%9C-%EB%A1%AF%EB%8D%B0%EC%BC%80%EB%AF%B8%EC%B9%BC-%EC%8A%A4%ED%94%84%EB%A0%88%EB%93%9C-%EC%95%85%ED%99%94-490-2026"
      },
      {
       "id": 5,
       "title": "[컨콜] 롯데케미칼 \"스프레드 악화로 4900억원 영업손실 발생···첨단소재도 스프레드 축소\"",
       "publisher": "투데이코리아",
       "date": "",
       "url": "https://www.todaykorea.co.kr/news/articleView.html?idxno=408280"
      },
      {
       "id": 6,
       "title": "롯데케미칼, 3분기 2814억 적자…대산·여수 사업재편 속도",
       "publisher": "이투데이",
       "date": "",
       "url": "https://www.etoday.co.kr/news/view/2645191"
      },
      {
       "id": 7,
       "title": "롯데케미칼도 NCC 가동률 83%로 상향…\"공급망 안정 노력\"",
       "publisher": "이투데이(네이트 전재)",
       "date": "2026-04-29",
       "url": "https://m.news.nate.com/view/20260429n30264"
      },
      {
       "id": 8,
       "title": "[컨콜]롯데케미칼 \"나프타 안정적 보유..가동률 지장 없어\"",
       "publisher": "머니투데이",
       "date": "2026-05-11",
       "url": "https://www.mt.co.kr/industry/2026/05/11/2026051116303452774"
      },
      {
       "id": 9,
       "title": "석화 사업재편 1호 출범…H&L어드밴스드, 대산 NCC 110만t 감축 본격화",
       "publisher": "아시아경제",
       "date": "2026-09-01",
       "url": "https://view.asiae.co.kr/article/2026090115460459838"
      },
      {
       "id": 10,
       "title": "'NCC 249만톤' 통폐합 승인…울산·여수 등 추가 감산 가능성은",
       "publisher": "네이트뉴스",
       "date": "2026-07-22",
       "url": "https://m.news.nate.com/view/20260722n28185"
      },
      {
       "id": 11,
       "title": "석유화학 구조조정, 249만t 줄였지만…이제 '남은 설비'가 문제",
       "publisher": "더트래커",
       "date": "",
       "url": "https://thetracker.co.kr/View.aspx?No=4250551"
      }
     ]
    }
   ]
  },
  {
   "id": "end_demand",
   "title": "전방 수요(항공·배송)",
   "position": "항공사와 배송업체는 정유소가 만든 항공유·경유를 사서 쓰는 전방 수요 단계다.",
   "summary": [
    "세 회사의 2026년 3분기 연료비 증가액은 산출 기준이 다르다. 델타항공은 비GAAP 조정 연료비, 유나이티드항공은 콜에서 설명한 약 값, UPS는 10-Q 값이다(델타항공 1, 유나이티드항공 1, UPS 1).",
    "연료비 증가는 사용량보다 단가에서 나왔다. 델타항공은 단가 효과 15억 4,768만 달러에 사용량 효과 1,800만 달러이고, UPS는 단가 효과 5억 3,200만 달러에 사용량 감소 효과 -5,900만 달러다(델타항공 1, UPS 1).",
    "같은 연료비 충격도 계약·예약 시차·수요·자체 정유·할증 구조에 따라 손익 반영이 달라진다. 개별 기업이 설명한 비용 회수율은 전체 CPI 전가 계수와 다르다."
   ],
   "open_items": [
    "유나이티드항공의 연료비 증가액은 콜에서 설명한 약 값이며 최신 분기공시의 원가 세목과는 대조하지 않았다.",
    "세 회사 카드에는 연료비·회수 지표만 있고 분기 매출·이익·가이던스 수치는 없다(매출·순이익·희석 EPS는 SEC 공시 값을 따로 표시한다).",
    "어닝콜 출처는 콜 날짜와 질의응답 번호만 있고 전사본 링크는 없다."
   ],
   "companies": [
    {
     "name_kr": "델타항공",
     "name_en": "Delta Air Lines, Inc.",
     "ticker": "DAL",
     "yahoo": "DAL",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 27904,
     "role_kr": "자체 정유시설을 가진 미국 항공사로, 항공유 구매원가가 예약·노선별 가격을 거쳐 실제 탑승 매출에 반영된다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-09",
     "status": "reported",
     "highlights": [
      {
       "text": "높은 연료비를 운임과 수요·좌석 공급 관리로 보전한다고 설명했다.",
       "src": [
        2
       ]
      },
      {
       "text": "자체 정유시설의 이익도 연료비 부담에 영향을 준다. 이 때문에 다른 항공사와 원유 민감도가 같지 않다.",
       "src": [
        2
       ]
      },
      {
       "text": "단위매출 증가분에는 연료 전가 외에 수요·좌석·노선·고객 구성 변화도 들어 있다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "조정 연료비(비GAAP)",
       "value": "4,143",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 2,565 (+1,578)",
       "src": 1
      },
      {
       "label": "연료 사용량",
       "value": "1,146",
       "unit": "백만 갤런",
       "period": "2026년 3분기",
       "change": "전년 1,138",
       "src": 1
      },
      {
       "label": "조정 연료단가",
       "value": "3.61",
       "unit": "달러/갤런",
       "period": "2026년 3분기",
       "change": "전년 2.25",
       "src": 1
      },
      {
       "label": "연료비 증가 중 단가 효과(계산값)",
       "value": "+1,547.68",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 사용량 기준",
       "src": 1
      },
      {
       "label": "연료비 증가 중 사용량 효과(계산값)",
       "value": "+18.00",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 단가 기준",
       "src": 1
      },
      {
       "label": "공시 반올림·구성 잔차(계산값)",
       "value": "+12.32",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "총 단위매출 증감",
       "value": "+15.4%",
       "unit": "",
       "period": "2026년 3분기",
       "change": "전년 대비",
       "src": 1
      }
     ],
     "guidance": [],
     "read_through": {
      "text": "연료비 증가의 대부분이 사용량보다 단가에서 발생해 운항을 소폭 줄이는 대응만으로 같은 기간의 비용 증가를 상쇄하기 어렵다. 이미 팔린 항공권의 가격은 항공유가 비싸져도 다시 올릴 수 없어 원가와 매출의 반영 시점이 다르다.",
      "desk": "inflation"
     },
     "sources": [
      {
       "id": 1,
       "title": "Delta 2026년 3분기 공식 실적(조정 연료비·단가·사용량, 비GAAP 기준)",
       "publisher": "Delta Air Lines",
       "date": "2026-10-09",
       "url": "https://ir.delta.com/news/news-details/2026/Delta-Air-Lines-Announces-September-Quarter-2026-Financial-Results/"
      },
      {
       "id": 2,
       "title": "Delta 어닝콜 · 2026년 10월 9일(발표발언, 질의응답 5·14·18)",
       "publisher": "Delta Air Lines",
       "date": "2026-10-09",
       "url": ""
      }
     ]
    },
    {
     "name_kr": "유나이티드항공",
     "name_en": "United Airlines Holdings, Inc.",
     "ticker": "UAL",
     "yahoo": "UAL",
     "exchange": "Nasdaq",
     "country": "미국",
     "cik": 100517,
     "role_kr": "미국 항공사로, 항공유 비용에는 원유가격과 제품 가격차가 함께 반영된다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-21",
     "status": "reported",
     "highlights": [
      {
       "text": "유나이티드항공은 3분기에 증가한 연료비 일부를 회수했다고 설명했다. 회수율은 경영진이 밝힌 비율이고, 회수 대응액과 미회수액은 그 비율에 증가액을 곱한 산술치다.",
       "src": [
        1
       ]
      },
      {
       "text": "유나이티드항공은 수익이 낮은 운항을 조정할 수 있다고 설명했다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "연료비 증가액(콜 설명)",
       "value": "약 1,800",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비",
       "src": 1
      },
      {
       "label": "연료비 증가분 회수율(경영진 설명)",
       "value": "72",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "회수 대응 산술액(계산값)",
       "value": "1,296",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "증가액 × 72%",
       "src": 1
      },
      {
       "label": "미회수 산술액(계산값)",
       "value": "504",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "증가액 − 회수 대응 산술액",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "회사는 앞으로의 연료 가정에 Brent 선도곡선과 제품 크랙을 사용했다.",
       "src": [
        1
       ]
      }
     ],
     "read_through": {
      "text": "72%는 회사가 밝힌 연료비 회수 비율이며 CPI 항공권 가격 전가율과는 다른 지표다. 항공권 CPI 상승분에는 연료비 외에 수요·좌석 공급·노선 변화의 영향이 함께 들어 있다.",
      "desk": "inflation"
     },
     "sources": [
      {
       "id": 1,
       "title": "United 어닝콜 · 2026년 10월 21일(발표발언, 질의응답 7·12·16·17)",
       "publisher": "United Airlines",
       "date": "2026-10-21",
       "url": ""
      }
     ]
    },
    {
     "name_kr": "UPS",
     "name_en": "United Parcel Service, Inc.",
     "ticker": "UPS",
     "yahoo": "UPS",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1090727,
     "role_kr": "경유·항공유 비용을 유류할증으로 청구하는 배송업체다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-27",
     "status": "reported",
     "highlights": [
      {
       "text": "건당 매출 증가에는 유류할증 외에 기본요금·고객·서비스 구성도 함께 반영됐다고 설명했다.",
       "src": [
        2
       ]
      },
      {
       "text": "외주 육상운송 원가의 연료 영향은 자체 연료비 증가와 별도로 집계된다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "연료비 증가액(10-Q)",
       "value": "473",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "연료비 단가 효과",
       "value": "+532",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "연료비 사용량 감소 효과",
       "value": "-59",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "외주 육상운송 원가의 연료 영향",
       "value": "111",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "자체 연료비 증가와 별도",
       "src": 1
      },
      {
       "label": "유류할증의 미국 국내 매출 증가율 기여",
       "value": "2.9",
       "unit": "%p",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "유류할증의 국제 매출 증가율 기여",
       "value": "8.4",
       "unit": "%p",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      }
     ],
     "guidance": [],
     "read_through": {
      "text": "경유·항공유 비용은 할증 적용, 청구·매출 인식의 순서로 요금에 반영된다. 유류할증 기여는 각 사업의 매출 증가율에 대한 기여이며 전사 가격 인상률이나 CPI 기여도와는 다르다.",
      "desk": "inflation"
     },
     "sources": [
      {
       "id": 1,
       "title": "UPS 2026년 9월 30일 분기 10-Q(2026년 11월 4일 제출)",
       "publisher": "UPS",
       "date": "2026-11-04",
       "url": "https://investors.ups.com/sec-filings/all-sec-filings/content/0001628280-26-070246/ups-20260930.htm"
      },
      {
       "id": 2,
       "title": "UPS 어닝콜 · 2026년 10월 27일(발표발언, 질의응답 5)",
       "publisher": "UPS",
       "date": "2026-10-27",
       "url": ""
      }
     ]
    }
   ]
  },
  {
   "id": "coal_power",
   "title": "석탄·전력",
   "position": "석탄·전력은 광산의 연료탄·제철탄 생산과 해상 수출에서 발전사의 연료 선택(가스·석탄·원전)과 미국 도매·소매 전력 판매로 이어지는 구간이다.",
   "summary": [
    "아시아 해상 석탄은 가격 상승과 공급 차질이 겹쳤다. 피바디의 해상 연료탄 수출 실현가는 톤당 100.37달러(2분기 95.87달러)로 올랐고 경영진은 뉴캐슬 가격이 분기 말 145달러를 넘었다고 밝혔다(피바디 1, 5). 화이트헤이븐은 RG Tanna 터미널 중단 12일로 지분 판매가 600만 톤(전분기 대비 -5%)에 그쳐 재고가 310만 톤으로 늘었다(화이트헤이븐 1).",
    "화이트헤이븐은 BMA 인수대금 가운데 이번 분기 2년차 조건부 대금 8,400만 호주달러를 지급했고, 남은 대금은 2027년 4월 이연대금 1억 미국달러와 2027년 7월 최종 조건부 대금(상한 3.5억 미국달러)이다(화이트헤이븐 2, 5).",
    "미국 석탄 발전은 가스·재생에너지로 대체되고 데이터센터향 신규 설비는 가스 중심이다. 피바디는 낮은 천연가스 가격과 재생에너지 발전 증가로 PRB 연간 판매 가이던스를 750만 톤 낮췄다(피바디 1, 5). 넥스트에라가 진행 중인 대형 부하 프로젝트 20GW 이상 중 18GW 이상이 가스 발전이다(넥스트에라 6).",
    "PJM 전력 수급은 타이트하다. 2026-07-14 발표된 2028/29 용량 경매는 RTO 전역 상한가 325달러/MW-일에 낙찰됐고 확보 물량 138,318MW(UCAP)는 신뢰도 기준보다 6,831MW 부족했으며 신규 자원은 525MW에 그쳤다(컨스텔레이션 4).",
    "비스트라의 2027년 이익은 헤지와 장기계약으로 대부분 확정됐다. 비스트라는 2027년 예상 발전량의 약 98%를 헤지했고 메타 2,609MW·AWS 1,200MW 원전 PPA 공급이 2026년 말~2027년 4분기에 시작된다. 2027년 조정 EBITDA 가이던스는 77억~85억 달러로 중간값 기준 2026년보다 11% 높다(비스트라 2, 6, 7).",
    "미국 발전·유틸리티 자산 통합이 이어지고 있다. 넥스트에라는 도미니언 에너지 인수(도미니언 1주당 NEE 0.8138주, 2026-09-03 양사 주주 승인)를 2027년 하반기에 완료할 계획이다(넥스트에라 6, 7). 컨스텔레이션은 1월 Calpine, NRG는 1월 LS Power 가스 발전 약 13GW 인수를 마쳤으며 두 회사는 11월 9일 3분기 실적을 발표한다(컨스텔레이션 1, 5; NRG 1, 4)."
   ],
   "open_items": [
    "비스트라 3분기 발전량(TWh·GWh)과 연료별 이용률은 확인하지 못했다. 3분기 콜의 텍사스 데이터센터 모라토리엄 관련 발언도 확인하지 못했고, 텍사스 데이터센터 개발 중단 관련 내용은 8월 2분기 콜 보도 기준이다.",
    "화이트헤이븐·비스트라 발표문 원문은 직접 확인하지 못했고, 수치는 발췌문, SEC 공시 데이터(data.sec.gov), 야후 파이낸스로 확인했다.",
    "컨스텔레이션·NRG는 3분기 실적이 2026-11-09 발표 예정(야후 파이낸스 일정, SEC에 3분기 실적 8-K 미제출)이어서 두 회사 수치는 2분기 10-Q XBRL 기준이다. 두 회사의 2026년 가이던스와 데이터센터 계약 현황은 확인하지 못했다.",
    "넥스트에라 3분기 매출·순이익은 야후 파이낸스 집계치와 8-K 요약 보도 기준이다(2026년 2·3분기 10-Q XBRL은 SEC 공시 데이터에 반영되지 않았다). GAAP와 조정 이익의 차이(약 21.8억 달러) 구성, 도미니언 인수 총액, FERC·NRC·주 규제 심사 진행 상황은 미확인이다(한 콜 요약은 주 규제 심사가 2027년 초 마무리될 것으로 전했다).",
    "비스트라가 2026-09-24 공시한 중요 계약(8-K Item 1.01·8.01)의 내용은 확인하지 못했고, AWS 코만치 피크 계약의 최초 발표 시점은 출처마다 2025년 9월(SEC 8-K Item 8.01 2025-09-29 제출)과 2025년 11월로 엇갈린다.",
    "컨스텔레이션·NRG·비스트라는 PJM 2028/29 용량 경매 결과 발표일인 2026-07-14에 모두 8-K Item 8.01을 제출했으나 공시 내용은 확인하지 못했다.",
    "피바디의 2027년 가이던스는 다음 실적 발표 때 나온다. 3분기 단독 영업현금흐름과 연초 이후 주주환원 총액은 보도마다 달라 싣지 않았다.",
    "화이트헤이븐의 관리 기준 판매량(750만 톤·770만 톤 보도)과 FY27 설비투자 가이던스, 2026년 7월 조건부 대금의 미국달러 금액(업계지 보도 5,800만 달러)은 회사 자료로 확인하지 못했다.",
    "출처 날짜 가운데 GuruFocus 피바디 기사 2건은 실적 발표일(2026-11-04), RTO Insider는 경매 결과 발표일(2026-07-14), Utility Dive는 비스트라 2분기 콜 날짜(2026-08-07), MarketScreener는 Calpine 인수 완료일(2026-01-07), Business Wire는 URL 날짜(2026-01-29), 화이트헤이븐 연차보고서는 FY26 실적 발표일(2026-08-19)이며, 이 출처들의 게재일은 확인하지 못했다."
   ],
   "companies": [
    {
     "name_kr": "화이트헤이븐 콜",
     "name_en": "Whitehaven Coal Limited",
     "ticker": "WHC",
     "yahoo": "WHC.AX",
     "exchange": "ASX",
     "country": "호주",
     "cik": null,
     "role_kr": "호주 NSW 고열량 연료탄과 퀸즐랜드 블랙워터·다우니아 제철탄을 생산해 아시아 철강사·발전사에 수출하는 석탄 업체다.",
     "period": "2026년 9월 분기(FY27 1분기)",
     "period_end": "2026-09-30",
     "report_date": "2026-10-23",
     "status": "reported",
     "highlights": [
      {
       "text": "9월 분기 관리 기준 ROM 생산은 1,100만 톤으로 전분기 대비 3%, 전년 동기 대비 22% 늘어 Visible Alpha 컨센서스(Reuters 인용) 950만 톤을 넘었다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "지역별 ROM 생산은 퀸즐랜드 550만 톤(전분기 대비 -4%), NSW 550만 톤(+10%)이었고, 지분 기준 자체 생산 석탄 판매는 퀸즐랜드 280만 톤(-12%), NSW 320만 톤(+2%)으로 합계 600만 톤(-5%)이었다.",
       "src": [
        1
       ]
      },
      {
       "text": "판매 감소는 항만 차질 때문이다. RG Tanna 터미널 가동 중단이 분기 중 12일에 달하고 PWCS 선적도 지연돼 기말 석탄 재고가 100만 톤 늘어난 310만 톤이 됐다. 회사는 차질이 해소돼 12월 분기에 판매가 회복될 것이라고 밝혔다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "평균 실현가는 톤당 226호주달러로 전분기 대비 2%, 전년 동기 대비 20% 상승했고, 퀸즐랜드 제철탄은 257호주달러(184미국달러, PLV HCC 지수 분기 평균 248미국달러의 74%), NSW 연료탄은 198호주달러(140미국달러, gC NEWC 지수의 103%)였다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "단위원가는 FY27 가이던스 범위 하단에 있었고, 경영진은 경유 가격 상승 속에서도 하단을 지켰다고 밝혔다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "BMA 인수대금은 이번 분기에 2년차 조건부 대금 8,400만 호주달러를 지급했고, 남은 대금은 2027년 4월 최종 이연대금 1억 미국달러와 2027년 7월 최종 조건부 대금(퀸즐랜드 평균 실현가 톤당 134미국달러 초과 매출의 35%, 상한 3.5억 미국달러)이다.",
       "src": [
        2,
        5
       ]
      },
      {
       "text": "9월 말 순부채는 약 14억 호주달러로 6월 말 13.27억 호주달러보다 늘었고, 분기 중 1,400만 호주달러 규모 자사주를 장내 매입했다.",
       "src": [
        1,
        3,
        5
       ]
      },
      {
       "text": "경영진은 일본·한국 고객이 에너지 안보를 우려하고 있고 LNG가 열량 기준으로 석탄보다 훨씬 비싸 향후 3~6개월 석탄 시장이 더 타이트해질 수 있다고 밝혔다.",
       "src": [
        2
       ]
      }
     ],
     "metrics": [
      {
       "label": "관리 기준 ROM 생산",
       "value": "11.0",
       "unit": "백만 톤",
       "period": "2026년 9월 분기",
       "change": "전년 대비 +22%",
       "src": 1
      },
      {
       "label": "지분 기준 자체 생산 석탄 판매",
       "value": "6.0",
       "unit": "백만 톤",
       "period": "2026년 9월 분기",
       "change": "전분기 대비 -5%",
       "src": 1
      },
      {
       "label": "평균 실현가",
       "value": "226",
       "unit": "호주달러/톤",
       "period": "2026년 9월 분기",
       "change": "전년 대비 +20%",
       "src": 1
      },
      {
       "label": "퀸즐랜드(제철탄) 실현가",
       "value": "257",
       "unit": "호주달러/톤",
       "period": "2026년 9월 분기",
       "change": "",
       "src": 1
      },
      {
       "label": "퀸즐랜드 실현가(PLV HCC 대비 74%)",
       "value": "184",
       "unit": "미국달러/톤",
       "period": "2026년 9월 분기",
       "change": "",
       "src": 2
      },
      {
       "label": "NSW(연료탄) 실현가",
       "value": "198",
       "unit": "호주달러/톤",
       "period": "2026년 9월 분기",
       "change": "",
       "src": 1
      },
      {
       "label": "NSW 실현가(gC NEWC 대비 103%)",
       "value": "140",
       "unit": "미국달러/톤",
       "period": "2026년 9월 분기",
       "change": "",
       "src": 2
      },
      {
       "label": "기말 석탄 재고",
       "value": "3.1",
       "unit": "백만 톤",
       "period": "2026-09-30",
       "change": "분기 중 +1.0백만 톤",
       "src": 1
      },
      {
       "label": "순부채",
       "value": "약 1.4",
       "unit": "십억 호주달러",
       "period": "2026-09-30",
       "change": "2026-06-30 1,327백만 호주달러",
       "src": 3
      },
      {
       "label": "BMA 2년차 조건부 대금 지급",
       "value": "84",
       "unit": "백만 호주달러",
       "period": "2026년 9월 분기",
       "change": "",
       "src": 2
      },
      {
       "label": "자사주 장내 매입",
       "value": "14",
       "unit": "백만 호주달러",
       "period": "2026년 9월 분기",
       "change": "",
       "src": 1
      },
      {
       "label": "FY27 단위원가 가이던스(로열티 제외)",
       "value": "132–147",
       "unit": "호주달러/톤",
       "period": "FY27",
       "change": "유지",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "FY27(2026년 7월~2027년 6월) 관리 기준 ROM 생산 3,800만~4,100만 톤, 관리 기준 판매 3,040만~3,300만 톤, 지분 기준 판매 2,390만~2,600만 톤 가이던스를 유지했다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "FY27 단위원가 가이던스 톤당 132~147호주달러(로열티 제외)를 유지했다.",
       "src": [
        1
       ]
      },
      {
       "text": "회사는 판매 이연과 재고 증가가 12월 분기에 해소되고, 석탄 가격 강세와 퀸즐랜드 인수 관련 이연·조건부 대금 지급 종료로 FY27 잔여 기간 현금 창출이 늘어날 것으로 전망했다.",
       "src": [
        1,
        4
       ]
      }
     ],
     "read_through": {
      "text": "아시아향 고열량 연료탄·제철탄 공급의 제약 요인은 수출 항만이다. 9월 분기 RG Tanna 터미널 중단 12일로 재고가 310만 톤까지 쌓였고, 같은 분기 평균 실현가는 전년 대비 20% 올랐다. 경영진은 LNG가 열량 기준으로 석탄보다 비싸 향후 3~6개월 석탄 시장이 더 타이트해질 수 있다고 밝혔다.",
      "desk": "power"
     },
     "sources": [
      {
       "id": 1,
       "title": "September 2026 Quarterly Production Report",
       "publisher": "Whitehaven Coal",
       "date": "2026-10-23",
       "url": "https://whitehavencoal.com.au/september-2026-quarterly-production-report/"
      },
      {
       "id": 2,
       "title": "Earnings call transcript: Whitehaven Coal posts strong Q1 2026 output as shares slip",
       "publisher": "Investing.com",
       "date": "2026-10-23",
       "url": "https://www.investing.com/news/transcripts/earnings-call-transcript-whitehaven-coal-posts-strong-q1-2026-output-as-shares-slip-93CH-4967851"
      },
      {
       "id": 3,
       "title": "Whitehaven Coal posts record Q1 production and keeps FY27 guidance",
       "publisher": "The Motley Fool Australia",
       "date": "2026-10-23",
       "url": "https://www.fool.com.au/2026/10/23/whitehaven-coal-posts-record-q1-production-and-keeps-fy27-guidance/"
      },
      {
       "id": 4,
       "title": "Australia's Whitehaven Coal beats quarterly output estimates on Queensland strength",
       "publisher": "Mining Weekly (Reuters)",
       "date": "2026-10-23",
       "url": "https://www.miningweekly.com/article/australias-whitehaven-coal-beats-quarterly-output-estimates-on-queensland-strength-2026-10-23"
      },
      {
       "id": 5,
       "title": "2026 Annual Report",
       "publisher": "Whitehaven Coal",
       "date": "2026-08-19",
       "url": "https://whitehavencoal.com.au/wp-content/uploads/2026/08/Annual-Report-2026.pdf"
      }
     ]
    },
    {
     "name_kr": "피바디 에너지",
     "name_en": "Peabody Energy Corporation",
     "ticker": "BTU",
     "yahoo": "BTU",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1064728,
     "role_kr": "호주 광산에서 해상 연료탄·제철탄을 수출하고 미국 파우더리버분지(PRB)·기타 미국 광산에서 발전용 석탄을 공급하는 석탄 업체다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-04",
     "status": "reported",
     "highlights": [
      {
       "text": "해상 연료탄 부문이 이익 대부분을 냈다. 3분기 판매 310만 톤, 톤당 매출 77.63달러·원가 56.58달러로 부문 조정 EBITDA 6,550만 달러(전사 9,750만 달러의 67%, 전분기 대비 +26%, 전년 동기 대비 +60%)를 기록했고 수출 톤당 실현가는 100.37달러(2분기 95.87달러)로 올랐다.",
       "src": [
        1,
        3,
        5
       ]
      },
      {
       "text": "제철탄은 센추리온 단층으로 손익분기 수준에 머물렀다. 판매 220만 톤, 톤당 매출 164.83달러·원가 162.45달러로 부문 조정 EBITDA는 520만 달러(흑자 전환)였다. 센추리온은 3분기 목표 58만 톤을 출하했으나 10월 생산은 약 4.5만 톤이었고, 경영진은 롱월이 주요 단층 구간을 지나기까지 약 110m가 남았다고 밝혔다.",
       "src": [
        1,
        2,
        5
       ]
      },
      {
       "text": "미국 PRB는 판매 1,960만 톤, 톤당 매출 13.71달러·원가 12.94달러(전분기 대비 -8%)로 부문 조정 EBITDA가 1,500만 달러(전년 동기 5,170만 달러)였고, 경영진은 서늘한 날씨·재생에너지 발전 증가·낮은 천연가스 가격이 석탄 수요를 줄였다고 밝혔다.",
       "src": [
        1,
        5
       ]
      },
      {
       "text": "연간 가이던스는 물량 기준으로 낮아졌다. 조정 폭은 PRB 판매 -750만 톤(원가 톤당 +1달러), 해상 제철탄 -60만 톤(원가 톤당 약 +15달러), 설비투자 -4,000만 달러(센추리온 북부 패널 개발 이연 약 3,000만 달러 포함)이고, 해상 연료탄 수출만 830만~850만 톤으로 20만 톤 상향됐다.",
       "src": [
        1,
        2,
        3
       ]
      },
      {
       "text": "경영진은 3분기 뉴캐슬 가격이 평균 톤당 약 135달러에서 분기 말 145달러 이상으로 올랐다며 북아시아 수요와 인도네시아·중국 내 공급 제약을 원인으로 들었고, 프리미엄 강점결탄은 분기 평균 248달러(전년 대비 +35%), 중국 제철탄 수입은 25% 늘었다고 밝혔다.",
       "src": [
        5
       ]
      },
      {
       "text": "3분기 매출은 10.963억 달러(전년 대비 +8.3%)였으나 순손실 3,280만 달러(주당 -0.27달러), 조정 EBITDA 9,750만 달러(전년 동기 9,950만 달러), 잉여현금흐름 -6,120만 달러였고 1~9월 영업현금흐름은 2,720만 달러(전년 동기 2.651억 달러)로 줄었다.",
       "src": [
        1,
        6,
        7
       ]
      },
      {
       "text": "분기 배당 주당 0.075달러를 선언했고 3분기에 2028년 만기 전환사채 원금 3,890만 달러를 5,810만 달러에 매입했으며 잔여 3,990만 달러는 2026년 11월 상환 예정이다. 9월 말 현금 4.34억 달러·가용 유동성 8.87억 달러를 보유했다.",
       "src": [
        1,
        7
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "1,096.3",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +8.3%",
       "src": 7
      },
      {
       "label": "조정 EBITDA",
       "value": "97.5",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 99.5백만 달러",
       "src": 1
      },
      {
       "label": "보통주 귀속 순이익",
       "value": "-32.8",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 -70.1백만 달러",
       "src": 7
      },
      {
       "label": "희석 EPS",
       "value": "-0.27",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "전년 동기 -0.58달러",
       "src": 7
      },
      {
       "label": "해상 연료탄 판매량",
       "value": "3.1",
       "unit": "백만 톤",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "해상 연료탄 수출 실현가",
       "value": "100.37",
       "unit": "달러/톤",
       "period": "2026년 3분기",
       "change": "전분기 95.87달러",
       "src": 1
      },
      {
       "label": "해상 연료탄 톤당 원가",
       "value": "56.58",
       "unit": "달러/톤",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      },
      {
       "label": "해상 제철탄 판매량",
       "value": "2.2",
       "unit": "백만 톤",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "해상 제철탄 톤당 매출",
       "value": "164.83",
       "unit": "달러/톤",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "해상 제철탄 톤당 원가",
       "value": "162.45",
       "unit": "달러/톤",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "PRB 판매량",
       "value": "19.6",
       "unit": "백만 톤",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "PRB 톤당 매출",
       "value": "13.71",
       "unit": "달러/톤",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "PRB 톤당 원가",
       "value": "12.94",
       "unit": "달러/톤",
       "period": "2026년 3분기",
       "change": "전분기 대비 -8%",
       "src": 1
      },
      {
       "label": "센추리온 출하량",
       "value": "0.58",
       "unit": "백만 톤",
       "period": "2026년 3분기",
       "change": "목표 달성",
       "src": 1
      },
      {
       "label": "잉여현금흐름",
       "value": "-61.2",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 5.8백만 달러",
       "src": 6
      },
      {
       "label": "영업현금흐름(누계)",
       "value": "27.2",
       "unit": "백만 달러",
       "period": "2026년 1~9월",
       "change": "전년 동기 265.1백만 달러",
       "src": 7
      },
      {
       "label": "현금",
       "value": "434.3",
       "unit": "백만 달러",
       "period": "2026-09-30",
       "change": "2025-12-31 575.3백만 달러",
       "src": 7
      },
      {
       "label": "재고자산",
       "value": "450.5",
       "unit": "백만 달러",
       "period": "2026-09-30",
       "change": "2025-12-31 383.2백만 달러",
       "src": 7
      }
     ],
     "guidance": [
      {
       "text": "4분기 해상 연료탄 판매 360만~380만 톤(수출 250만~270만 톤), 톤당 원가 46~51달러를 제시했고, 왐보 광산 4분기 제품 구성은 뉴캐슬 규격 약 65%, 고회분탄 35%로 개선된다.",
       "src": [
        1,
        2,
        5
       ]
      },
      {
       "text": "4분기 해상 제철탄 판매 220만~240만 톤, 톤당 원가 150~160달러, 센추리온 판매 30만~50만 톤을 제시했고 제철탄 판매가는 프리미엄 강점결탄 지수(FOB 호주)의 약 70%로 예상했다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "4분기 PRB 판매 1,950만~2,150만 톤(평균 판매가 톤당 약 13.75달러, 원가 13.00~13.50달러), 기타 미국 연료탄 판매 360만~400만 톤을 제시했다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "센추리온 개선을 위해 현 패널 정비 중 150만~200만 달러, 2027년 3분기로 예정된 다음 롱월 이동 때 500만~1,000만 달러를 투입하고, 2027년 가이던스는 다음 실적 발표에서 제시한다.",
       "src": [
        2,
        5
       ]
      },
      {
       "text": "경영진은 4분기 생산 증가로 잉여현금흐름이 개선될 것으로 전망했다.",
       "src": [
        1,
        6
       ]
      }
     ],
     "read_through": {
      "text": "아시아 해상 석탄은 타이트하고 미국 내 석탄 발전 수요는 가스·재생에너지로 대체되고 있다. 수출 연료탄 실현가는 톤당 100.37달러로 올랐고 뉴캐슬 가격은 분기 말 145달러를 넘었으나, PRB 연간 판매 가이던스는 낮은 천연가스 가격과 재생에너지 발전 증가로 750만 톤 낮아졌다.",
      "desk": "power"
     },
     "sources": [
      {
       "id": 1,
       "title": "Peabody Reports Results for the Quarter Ended September 30, 2026",
       "publisher": "Peabody Energy (StockTitan 게재 보도자료)",
       "date": "2026-11-04",
       "url": "https://www.stocktitan.net/news/BTU/peabody-reports-results-for-the-quarter-ended-september-30-drh9o0sfg2fq.html"
      },
      {
       "id": 2,
       "title": "Peabody Energy Form 8-K, Exhibit 99.1 (2026년 3분기 실적 발표)",
       "publisher": "U.S. SEC EDGAR",
       "date": "2026-11-04",
       "url": "https://www.sec.gov/Archives/edgar/data/0001064728/000106472826000067/btu8k20261104ex991.htm"
      },
      {
       "id": 3,
       "title": "Peabody Energy Reports Q3 Loss of $0.27 per Share, Misses Analyst EPS Estimate of -$0.07",
       "publisher": "GuruFocus",
       "date": "2026-11-04",
       "url": "https://www.gurufocus.com/news/9169672/peabody-energy-reports-q3-loss-of-027-per-share-misses-analyst-eps-estimate-of-007"
      },
      {
       "id": 4,
       "title": "Peabody Energy (BTU) Provides Q4 Coal Volume and Cost Outlook Amid Mixed Market Signals",
       "publisher": "GuruFocus",
       "date": "2026-11-04",
       "url": "https://www.gurufocus.com/news/9169710/peabody-energy-btu-provides-q4-coal-volume-and-cost-outlook-amid-mixed-market-signals"
      },
      {
       "id": 5,
       "title": "Peabody (BTU) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-11-04",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/11/04/peabody-btu-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 6,
       "title": "Peabody Energy (NYSE:BTU) exceeds Q3 2026 expectations",
       "publisher": "StockStory (FinancialContent)",
       "date": "2026-11-04",
       "url": "https://markets.financialcontent.com/stocks/article/stockstory-2026-11-4-peabody-energy-nysebtu-exceeds-q3-2026-expectations"
      },
      {
       "id": 7,
       "title": "Peabody Energy 10-Q (2026년 3분기) XBRL company facts",
       "publisher": "U.S. SEC (data.sec.gov)",
       "date": "2026-11-06",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001064728.json"
      }
     ]
    },
    {
     "name_kr": "비스트라",
     "name_en": "Vistra Corp.",
     "ticker": "VST",
     "yahoo": "VST",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1692819,
     "role_kr": "텍사스(ERCOT)와 PJM 등 미국 경쟁 전력시장에서 원전·가스 발전설비와 소매 전력 사업을 함께 운영하는 발전사업자다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-06",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 Ongoing Operations 조정 EBITDA는 23.78억 달러로 전년 동기 대비 50% 이상 늘어 사상 최대를 기록했고, 회사는 에너지·용량 실현가격 상승, Lotus 인수 발전소의 분기 전체 반영, Martin Lake 1호기 복귀를 요인으로 제시했다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "매출은 63.47억 달러로 전년 동기 49.71억 달러 대비 27.7% 늘었고, GAAP 순이익은 11.40억 달러로 전년 동기 6.52억 달러보다 4.88억 달러 많았으며 헤지 미실현이익 5.59억 달러가 포함됐고 감가상각 증가·Moss Landing 350 설비 부분 손상·법인세 증가가 일부 상쇄했다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "10월 30일 기준 예상 발전량의 헤지 비율은 2026년 약 100%, 2027년 약 98%, 2028년 약 78%다.",
       "src": [
        2
       ]
      },
      {
       "text": "기록적 여름 날씨 속 발전설비 상업 가동률은 약 95%였고 Pulaski·Deer Creek 설비가 상업운전을 시작했으며, 약 5,500MW 가스 발전 포트폴리오인 Cogentrix 인수를 마쳤다(SEC 공시상 인수 완료 Item 2.01 기준일 2026-10-30).",
       "src": [
        2,
        3
       ]
      },
      {
       "text": "2026-01-09 발표한 메타향 원전 20년 PPA는 운영 중인 Perry(1,268MW)·Davis-Besse(908MW) 2,176MW와 Perry·Davis-Besse·Beaver Valley 증설분 433MW 등 총 2,609MW이며 2026년 말 공급을 시작해 2034년 전량에 이른다. 경영진은 Perry 계약분이 2027년 실적에 기여한다고 밝혔다.",
       "src": [
        5,
        6
       ]
      },
      {
       "text": "데이터센터향 장기계약이 원전과 가스로 넓어졌다. AWS와의 코만치 피크 1,200MW 20년 PPA(최대 20년 연장 옵션)는 2027년 4분기 공급을 시작해 2032년 전량에 이르고, 3분기에는 Odessa 가스복합 발전소에서 New Era Energy & Digital과 207MW 20년 PPA를 체결했다. 경영진은 코만치 피크 잔여 용량과 Beaver Valley가 아직 미계약이라고 밝혔다.",
       "src": [
        2,
        5,
        7
       ]
      },
      {
       "text": "경영진은 8월 2분기 콜에서 ERCOT 연계 대기열 감사 기간 동안 텍사스 데이터센터 개발을 중단하는 데 찬성하고 코만치 피크 계약은 영향받지 않는다고 밝혔으며, ERCOT 부하 증가율 전망을 연 5~6%에서 4~6%로 낮췄다.",
       "src": [
        8
       ]
      },
      {
       "text": "2026년 조정 EBITDA·조정 FCFbG 가이던스는 범위를 좁히며 중간값을 올렸고(조정 FCFbG 기존 39.25억~47.25억 달러) 2027년 가이던스를 처음 제시했다. 이사회는 자사주 매입 한도 15억 달러를 추가 승인했다.",
       "src": [
        1,
        2
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "6,347",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +27.7%",
       "src": 1
      },
      {
       "label": "순이익",
       "value": "1,140",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 652백만 달러",
       "src": 1
      },
      {
       "label": "헤지 미실현이익(순이익 포함분)",
       "value": "559",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "Ongoing Operations 조정 EBITDA",
       "value": "2,378",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +50% 이상",
       "src": 1
      },
      {
       "label": "예상 발전량 헤지 비율",
       "value": "약 100",
       "unit": "%",
       "period": "2026년분(2026-10-30 기준)",
       "change": "",
       "src": 2
      },
      {
       "label": "예상 발전량 헤지 비율",
       "value": "약 98",
       "unit": "%",
       "period": "2027년분(2026-10-30 기준)",
       "change": "",
       "src": 2
      },
      {
       "label": "예상 발전량 헤지 비율",
       "value": "약 78",
       "unit": "%",
       "period": "2028년분(2026-10-30 기준)",
       "change": "",
       "src": 2
      },
      {
       "label": "발전설비 상업 가동률",
       "value": "약 95",
       "unit": "%",
       "period": "2026년 여름",
       "change": "",
       "src": 2
      },
      {
       "label": "Cogentrix 인수 가스 발전 설비",
       "value": "약 5,500",
       "unit": "MW",
       "period": "2026년 10월 인수 완료",
       "change": "",
       "src": 1
      },
      {
       "label": "메타 원전 PPA 계약 용량(20년)",
       "value": "2,609",
       "unit": "MW",
       "period": "2026년 말~2034년 공급",
       "change": "",
       "src": 6
      },
      {
       "label": "AWS 코만치 피크 PPA 계약 용량(20년)",
       "value": "1,200",
       "unit": "MW",
       "period": "2027년 4분기~2032년 전량",
       "change": "",
       "src": 7
      },
      {
       "label": "Odessa 가스복합 PPA 계약 용량(20년)",
       "value": "207",
       "unit": "MW",
       "period": "2026년 3분기 체결",
       "change": "",
       "src": 2
      },
      {
       "label": "ERCOT 부하 증가율 전망",
       "value": "4–6",
       "unit": "%/년",
       "period": "2026년 2분기 콜",
       "change": "기존 5–6%",
       "src": 8
      },
      {
       "label": "2026년 조정 EBITDA 가이던스",
       "value": "7.1–7.5",
       "unit": "십억 달러",
       "period": "2026년",
       "change": "범위 축소·중간값 상향",
       "src": 2
      },
      {
       "label": "2026년 조정 FCFbG 가이던스",
       "value": "4.3–4.7",
       "unit": "십억 달러",
       "period": "2026년",
       "change": "기존 3.925–4.725",
       "src": 2
      },
      {
       "label": "2027년 조정 EBITDA 가이던스",
       "value": "7.7–8.5",
       "unit": "십억 달러",
       "period": "2027년",
       "change": "신규",
       "src": 2
      },
      {
       "label": "2027년 조정 FCFbG 가이던스",
       "value": "4.3–5.1",
       "unit": "십억 달러",
       "period": "2027년",
       "change": "신규",
       "src": 2
      },
      {
       "label": "자사주 매입 추가 승인",
       "value": "1.5",
       "unit": "십억 달러",
       "period": "2026-11-06 발표",
       "change": "",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "2026년 Ongoing Operations 조정 EBITDA 71억~75억 달러, 조정 FCFbG 43억~47억 달러로 범위를 좁히고 중간값을 올렸다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "2027년 Ongoing Operations 조정 EBITDA 77억~85억 달러, 조정 FCFbG 43억~51억 달러를 처음 제시했고, 경영진은 Cogentrix 인수와 Perry 메타 PPA를 기여 요인으로 들었다.",
       "src": [
        2,
        5
       ]
      },
      {
       "text": "경영진은 2030년 주당 잉여현금흐름 약 24달러를 목표로 제시했다.",
       "src": [
        9
       ]
      }
     ],
     "read_through": {
      "text": "비스트라의 2027년 이익은 헤지와 장기계약으로 대부분 확정됐다. 2027년 예상 발전량의 약 98%를 헤지했고 메타 2,609MW·AWS 1,200MW 원전 PPA 공급이 2026년 말~2027년 4분기에 시작되며, 2027년 조정 EBITDA 가이던스 중간값(81억 달러)은 2026년 중간값(73억 달러)보다 11% 높다.",
      "desk": "power"
     },
     "sources": [
      {
       "id": 1,
       "title": "Vistra Reports Third Quarter 2026 Results",
       "publisher": "Vistra (PR Newswire)",
       "date": "2026-11-06",
       "url": "https://www.prnewswire.com/news-releases/vistra-reports-third-quarter-2026-results-302931798.html"
      },
      {
       "id": 2,
       "title": "Vistra Corp. Form 8-K, Exhibit 99.1 (2026년 3분기 실적 발표)",
       "publisher": "U.S. SEC EDGAR",
       "date": "2026-11-06",
       "url": "https://www.sec.gov/Archives/edgar/data/0001692819/000169281926000023/vistra-20260930xearningsre.htm"
      },
      {
       "id": 3,
       "title": "Vistra Corp. EDGAR 제출 목록: Form 8-K(Items 2.01·2.03·3.02·7.01, 기준일 2026-10-30)",
       "publisher": "U.S. SEC (data.sec.gov)",
       "date": "2026-11-05",
       "url": "https://data.sec.gov/submissions/CIK0001692819.json"
      },
      {
       "id": 4,
       "title": "Vistra Corp. XBRL company facts (2025년 3분기·2026년 2분기 10-Q)",
       "publisher": "U.S. SEC (data.sec.gov)",
       "date": "2026-08-10",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001692819.json"
      },
      {
       "id": 5,
       "title": "Vistra (VST) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-11-06",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/11/06/vistra-vst-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 6,
       "title": "Vistra and Meta Announce Agreements to Support Nuclear Plants in PJM and Add New Nuclear Generation to the Grid",
       "publisher": "Vistra",
       "date": "2026-01-09",
       "url": "https://investor.vistracorp.com/2026-01-09-Vistra-and-Meta-Announce-Agreements-to-Support-Nuclear-Plants-in-PJM-and-Add-New-Nuclear-Generation-to-the-Grid?asPDF=1"
      },
      {
       "id": 7,
       "title": "Vistra Corp. Form 10-Q (2026년 2분기)",
       "publisher": "U.S. SEC EDGAR",
       "date": "2026-08-10",
       "url": "https://www.sec.gov/Archives/edgar/data/0001692819/000169281926000019/vistra-20260630.htm"
      },
      {
       "id": 8,
       "title": "Vistra supports Texas data center pause, execs say",
       "publisher": "Utility Dive",
       "date": "2026-08-07",
       "url": "https://www.utilitydive.com/news/vistra-texas-data-center-pause-comanche-amazon-earnings/827434/"
      },
      {
       "id": 9,
       "title": "[Vistra Q3 2026 Earnings Call] Vistra Posts Record $2.38B Adjusted EBITDA, Introduces 2027 Guidance of $7.7–$8.5B and Eyes $24 FCF/Share by 2030",
       "publisher": "BigGo Finance",
       "date": "2026-11-06",
       "url": "https://finance.biggo.com/news/US_VST_2026-11-06"
      }
     ]
    },
    {
     "name_kr": "컨스텔레이션 에너지",
     "name_en": "Constellation Energy Corporation",
     "ticker": "CEG",
     "yahoo": "CEG",
     "exchange": "Nasdaq",
     "country": "미국",
     "cik": 1868275,
     "role_kr": "미국 최대 원전 운영사로 2026년 1월 Calpine 인수 후 가스·지열 발전까지 보유하고 도매 전력시장과 대형 수요처에 전력을 판매하는 발전사업자다.",
     "period": "2026년 2분기(3분기 미발표)",
     "period_end": "2026-06-30",
     "report_date": "2026-08-06",
     "status": "not_yet",
     "highlights": [
      {
       "text": "3분기 실적은 2026-11-09 발표 예정이며(야후 파이낸스 일정, 11월 7일 현재 SEC 3분기 실적 8-K 없음), 애널리스트 추정치(야후 집계, 15명)는 3분기 EPS 3.88달러·매출 93.5억 달러다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "2분기 매출은 75.04억 달러로 전년 동기 61.01억 달러 대비 23.0% 늘었으나 지배주주 순이익은 5.13억 달러로 38.9% 줄었고 희석 EPS는 1.42달러(전년 동기 2.67달러)였으며, 조정 EPS는 2.55달러로 컨센서스 2.28달러를 웃돌았다(야후 집계).",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "2026-01-07 Calpine 인수를 완료했고(발표 기준 지분 인수가 약 164억 달러, 부채 포함 순인수가 약 266억 달러), 6월 말 총자산은 982.5억 달러(2025년 말 572.5억 달러), 유형자산은 412.3억 달러(224.7억 달러), 영업권은 115.3억 달러(4.2억 달러)로 늘었다. 상반기 사업 인수 순현금 지출은 25.37억 달러, 승계 부채는 22.9억 달러였다.",
       "src": [
        2,
        5
       ]
      },
      {
       "text": "인수 조건에 따른 자산 매각으로 2026-10-14 Brazos Valley 에너지센터를 LS Power에 매각 완료했고, PJM 내 약 4.4GW(Bethlehem, York 1·2, Hay Road, Edge Moor)를 LS Power에 약 50억 달러에 넘기는 거래는 2026년 말 종결 예정이다.",
       "src": [
        6
       ]
      },
      {
       "text": "PJM 용량 가격은 상한에 묶여 있다. 2026-07-14 발표된 2028/29 용량 경매는 RTO 전역 상한가 325달러/MW-일(전년 상한 대비 -2.5%)에 낙찰됐고 확보 물량 138,318MW(UCAP)는 신뢰도 기준보다 6,831MW 부족했으며, 상·하한이 없었을 때의 모의 가격은 554.72달러/MW-일이었다.",
       "src": [
        4
       ]
      },
      {
       "text": "상반기 영업현금흐름은 15.53억 달러(전년 동기 15.84억 달러)였고, 6월 말 비유동 장기차입금은 191.1억 달러(2025년 말 72.5억 달러), 현금은 6.97억 달러(36.41억 달러)다.",
       "src": [
        2
       ]
      },
      {
       "text": "상반기 유형자산 투자는 25.21억 달러(전년 동기 15.73억 달러, +60%), 자사주 매입은 19.71억 달러(전년 동기 4.00억 달러, 전액 2분기), 배당 지급은 3.09억 달러였고 분기 배당은 주당 0.4265달러로 전년 대비 10% 올랐다.",
       "src": [
        2
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "7,504",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "전년 대비 +23.0%",
       "src": 2
      },
      {
       "label": "지배주주 순이익",
       "value": "513",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "전년 대비 -38.9%",
       "src": 2
      },
      {
       "label": "희석 EPS",
       "value": "1.42",
       "unit": "달러/주",
       "period": "2026년 2분기",
       "change": "전년 동기 2.67달러",
       "src": 2
      },
      {
       "label": "조정 EPS(야후 집계)",
       "value": "2.55",
       "unit": "달러/주",
       "period": "2026년 2분기",
       "change": "컨센서스 2.28달러",
       "src": 1
      },
      {
       "label": "설비투자(유형자산 취득)",
       "value": "2,521",
       "unit": "백만 달러",
       "period": "2026년 상반기",
       "change": "전년 대비 +60%",
       "src": 2
      },
      {
       "label": "자사주 매입",
       "value": "1,971",
       "unit": "백만 달러",
       "period": "2026년 상반기",
       "change": "전년 동기 400백만 달러",
       "src": 2
      },
      {
       "label": "영업권",
       "value": "11,527",
       "unit": "백만 달러",
       "period": "2026-06-30",
       "change": "2025-12-31 420백만 달러",
       "src": 2
      },
      {
       "label": "Calpine 순인수가(부채 포함, 발표 기준)",
       "value": "약 26.6",
       "unit": "십억 달러",
       "period": "2026-01-07 완료",
       "change": "",
       "src": 5
      },
      {
       "label": "PJM 매각 대상 설비",
       "value": "약 4.4",
       "unit": "GW",
       "period": "2026년 말 종결 예정",
       "change": "",
       "src": 6
      },
      {
       "label": "PJM 2028/29 용량 경매 낙찰가",
       "value": "325",
       "unit": "달러/MW-일",
       "period": "2028/29 인도연도",
       "change": "전년 상한 대비 -2.5%",
       "src": 4
      },
      {
       "label": "PJM 2028/29 신뢰도 기준 대비 부족분",
       "value": "6,831",
       "unit": "MW",
       "period": "2028/29 인도연도",
       "change": "",
       "src": 4
      },
      {
       "label": "3분기 EPS 컨센서스(애널리스트 추정치)",
       "value": "3.88",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "추정치",
       "src": 1
      }
     ],
     "guidance": [],
     "read_through": {
      "text": "PJM 공급 부족 속에 원전·가스 설비가 대형 발전사로 모이고 있다. 컨스텔레이션은 Calpine 인수로 6월 말 유형자산이 412.3억 달러로 2025년 말 대비 83% 늘었고, PJM 2028/29 용량 경매는 상한가 325달러/MW-일에 낙찰되며 신뢰도 기준보다 6,831MW 부족했다.",
      "desk": "power"
     },
     "sources": [
      {
       "id": 1,
       "title": "CEG quoteSummary (calendarEvents·earningsTrend·earningsHistory)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query2.finance.yahoo.com/v10/finance/quoteSummary/CEG?modules=calendarEvents,earningsTrend,earningsHistory"
      },
      {
       "id": 2,
       "title": "Constellation Energy 10-Q (2026년 2분기) XBRL company facts",
       "publisher": "U.S. SEC (data.sec.gov)",
       "date": "2026-08-06",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001868275.json"
      },
      {
       "id": 3,
       "title": "Constellation Energy EDGAR 제출 목록(2026-11-07 조회, 2분기 실적 8-K Item 2.02 2026-08-06)",
       "publisher": "U.S. SEC (data.sec.gov)",
       "date": "2026-11-07",
       "url": "https://data.sec.gov/submissions/CIK0001868275.json"
      },
      {
       "id": 4,
       "title": "PJM Capacity Auction Clears at $325 Cap, 6.8 GW Short of Reliability Requirement",
       "publisher": "RTO Insider",
       "date": "2026-07-14",
       "url": "https://www.rtoinsider.com/136577-pjm-capacity-auction-clears-325-cap-short-reliability-requirement/"
      },
      {
       "id": 5,
       "title": "Constellation Energy Corporation completed the acquisition of Calpine Corporation from Energy Capital Partners and others",
       "publisher": "MarketScreener",
       "date": "2026-01-07",
       "url": "https://uk.marketscreener.com/news/constellation-energy-corporation-completed-the-acquisition-of-calpine-corporation-from-energy-capita-ce7e59dcd08ff123"
      },
      {
       "id": 6,
       "title": "Constellation Completes Sale of Brazos Valley Energy Center to LS Power",
       "publisher": "Constellation Energy",
       "date": "2026-10-14",
       "url": "https://www.constellationenergy.com/news/2026/10/constellation-completes-sale-of-brazos-valley-energy-center-to-ls-power.html"
      }
     ]
    },
    {
     "name_kr": "NRG 에너지",
     "name_en": "NRG Energy, Inc.",
     "ticker": "NRG",
     "yahoo": "NRG",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1013871,
     "role_kr": "발전설비와 소매 전력·가스 판매 사업을 함께 운영하는 미국 통합 전력회사로 2026년 1월 LS Power 가스 발전소 인수로 발전 설비를 약 25GW로 늘렸다.",
     "period": "2026년 2분기(3분기 미발표)",
     "period_end": "2026-06-30",
     "report_date": "2026-08-04",
     "status": "not_yet",
     "highlights": [
      {
       "text": "3분기 실적은 2026-11-09 발표 예정이며(야후 파이낸스 일정, 11월 7일 현재 SEC 3분기 실적 8-K 없음), 애널리스트 추정치(야후 집계, 6명)는 3분기 EPS 3.03달러·매출 92.9억 달러다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "2분기 매출은 74.81억 달러로 전년 동기 67.40억 달러 대비 11.0% 늘었고 순이익은 5.06억 달러로 전년 동기 순손실 1.04억 달러에서 흑자 전환했으며 희석 EPS는 2.31달러(전년 동기 -0.62달러)였다.",
       "src": [
        2
       ]
      },
      {
       "text": "조정 EPS는 1.49달러로 컨센서스 1.74달러를 14% 밑돌았다(야후 집계).",
       "src": [
        1
       ]
      },
      {
       "text": "2026년 1월 LS Power로부터 가스 발전소 18곳 약 13GW와 CPower의 상업·산업용 가상발전소(VPP) 사업 인수를 완료해 발전 설비가 약 25GW가 됐다. 인수 대가는 잠정 105.83억 달러(현금과 주식 2,425만 주 37.28억 달러)였으며 설비는 북동부·텍사스 등 9개 주에 있다.",
       "src": [
        4,
        5
       ]
      },
      {
       "text": "인수로 상반기 영업권이 38.0억 달러 늘었고 6월 말 총자산은 399.4억 달러(2025년 말 291.4억 달러), 장기차입금은 233.9억 달러(165.8억 달러)가 됐다.",
       "src": [
        2
       ]
      },
      {
       "text": "상반기 자사주 매입은 9.31억 달러(586.5만 주, 전년 동기 6.03억 달러)로 늘었고 분기 배당은 주당 0.475달러로 전년(0.44달러)보다 8% 올랐다.",
       "src": [
        2
       ]
      },
      {
       "text": "상반기 영업현금흐름은 9.48억 달러로 전년 동기 13.06억 달러 대비 27% 줄었고 설비투자는 6.55억 달러(전년 동기 5.95억 달러)였으며 6월 말 현금은 1.62억 달러(2025년 말 47.08억 달러)다.",
       "src": [
        2
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "7,481",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "전년 대비 +11.0%",
       "src": 2
      },
      {
       "label": "순이익",
       "value": "506",
       "unit": "백만 달러",
       "period": "2026년 2분기",
       "change": "전년 동기 -104백만 달러",
       "src": 2
      },
      {
       "label": "희석 EPS",
       "value": "2.31",
       "unit": "달러/주",
       "period": "2026년 2분기",
       "change": "전년 동기 -0.62달러",
       "src": 2
      },
      {
       "label": "조정 EPS(야후 집계)",
       "value": "1.49",
       "unit": "달러/주",
       "period": "2026년 2분기",
       "change": "컨센서스 1.74달러",
       "src": 1
      },
      {
       "label": "설비투자(유형자산 취득)",
       "value": "655",
       "unit": "백만 달러",
       "period": "2026년 상반기",
       "change": "전년 대비 +10%",
       "src": 2
      },
      {
       "label": "자사주 매입",
       "value": "931",
       "unit": "백만 달러",
       "period": "2026년 상반기",
       "change": "전년 동기 603백만 달러",
       "src": 2
      },
      {
       "label": "장기차입금",
       "value": "23,392",
       "unit": "백만 달러",
       "period": "2026-06-30",
       "change": "2025-12-31 16,576백만 달러",
       "src": 2
      },
      {
       "label": "LS Power 인수 가스 발전 설비",
       "value": "약 13",
       "unit": "GW",
       "period": "2026년 1월 완료",
       "change": "",
       "src": 4
      },
      {
       "label": "인수 후 발전 설비",
       "value": "약 25",
       "unit": "GW",
       "period": "2026년 1월 이후",
       "change": "",
       "src": 4
      },
      {
       "label": "LS Power 인수 대가(잠정)",
       "value": "10,583",
       "unit": "백만 달러",
       "period": "2026년 1분기",
       "change": "",
       "src": 5
      },
      {
       "label": "3분기 EPS 컨센서스(애널리스트 추정치)",
       "value": "3.03",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "추정치",
       "src": 1
      }
     ],
     "guidance": [],
     "read_through": {
      "text": "NRG는 LS Power로부터 가스 발전소 18곳 약 13GW를 인수해 발전 설비를 약 25GW로 늘리고 북동부·텍사스 등 9개 주로 거점을 넓혔으며, 2분기 매출은 74.81억 달러로 전년 대비 11.0% 늘었다.",
      "desk": "power"
     },
     "sources": [
      {
       "id": 1,
       "title": "NRG quoteSummary (calendarEvents·earningsTrend·earningsHistory)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query2.finance.yahoo.com/v10/finance/quoteSummary/NRG?modules=calendarEvents,earningsTrend,earningsHistory"
      },
      {
       "id": 2,
       "title": "NRG Energy 10-Q (2026년 2분기) XBRL company facts",
       "publisher": "U.S. SEC (data.sec.gov)",
       "date": "2026-08-04",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001013871.json"
      },
      {
       "id": 3,
       "title": "NRG Energy EDGAR 제출 목록(2026-11-07 조회, 2분기 실적 8-K Item 2.02 2026-08-04)",
       "publisher": "U.S. SEC (data.sec.gov)",
       "date": "2026-11-07",
       "url": "https://data.sec.gov/submissions/CIK0001013871.json"
      },
      {
       "id": 4,
       "title": "NRG Energy Completes Acquisition of 13 GW of Power Generation and C&I VPP Portfolio from LS Power",
       "publisher": "NRG Energy (Business Wire)",
       "date": "2026-01-29",
       "url": "https://www.businesswire.com/news/home/20260129354070/en/NRG-Energy-Completes-Acquisition-of-13-GW-of-Power-Generation-and-CI-VPP-Portfolio-from-LS-Power/"
      },
      {
       "id": 5,
       "title": "NRG Energy Form 10-Q (2026년 1분기)",
       "publisher": "U.S. SEC EDGAR",
       "date": "2026-05-06",
       "url": "https://www.sec.gov/Archives/edgar/data/0001013871/000101387126000012/nrg-20260331.htm"
      }
     ]
    },
    {
     "name_kr": "넥스트에라 에너지",
     "name_en": "NextEra Energy, Inc.",
     "ticker": "NEE",
     "yahoo": "NEE",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 753308,
     "role_kr": "플로리다 규제 유틸리티(FPL)와 경쟁 발전·재생에너지 개발 사업(NextEra Energy Resources)을 운영하는 미국 전력회사로 도미니언 에너지 인수를 추진하고 있다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-21",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 조정 EPS는 1.24달러로 전년 동기 1.13달러 대비 9.7% 늘어 컨센서스 1.19달러(야후 집계)를 웃돌았고, 조정 순이익은 25.92억 달러(전년 동기 23.48억 달러)였다.",
       "src": [
        5,
        1
       ]
      },
      {
       "text": "GAAP 기준 3분기 순이익은 47.8억 달러(EPS 2.28달러)로 전년 동기 24.38억 달러의 약 2배였고 조정 순이익보다 약 21.8억 달러 많았으며, 매출은 80.9억 달러로 전년 대비 1.6% 늘었다.",
       "src": [
        5,
        9,
        1,
        2
       ]
      },
      {
       "text": "사업부별로 NextEra Energy Resources 조정 이익은 주당 0.59달러로 약 11% 늘었고, FPL 규제 자본은 전년 대비 약 9.2% 증가했다.",
       "src": [
        5,
        6
       ]
      },
      {
       "text": "NextEra Energy Resources는 분기 중 3.7GW(저장장치 약 2.4GW)를 백로그에 추가해 총 약 36.7GW가 됐고, 직전 실적 발표 이후 1.8GW 이상을 상업운전에 투입했다.",
       "src": [
        6
       ]
      },
      {
       "text": "경영진은 20GW 이상의 대형 부하 프로젝트를 진행 중이며 이 중 18GW 이상이 가스 발전이라고 밝혔다. 7월 참여한 켄터키주 패듀카(DOE 부지) 데이터센터 단지에 가스 최대 2GW·배터리 최대 2.6GW 전용 설비를 건설·보유할 계획이다.",
       "src": [
        6
       ]
      },
      {
       "text": "도미니언 에너지 인수 조건은 도미니언 1주당 NEE 0.8138주의 고정 교환비율, 거래 종결 시 도미니언 주주에 대한 일회성 현금 3.6억 달러, 합병 후 지분율 NEE 주주 약 74.5%·도미니언 주주 약 25.5%이며, NEE 주가 변동으로 도미니언 주당 내재가치는 계약 시 약 76.38달러에서 2026-07-24 기준 약 73.47달러로 낮아졌다.",
       "src": [
        7,
        8
       ]
      },
      {
       "text": "양사 주주는 2026-09-03 도미니언 에너지와의 결합을 승인했다(8-K Item 5.07). 종결 조건은 HSR 대기기간 만료, FERC(연방전력법 203조)·NRC 승인과 버지니아 SCC·노스캐롤라이나 NCUC 등 주 규제 승인이다.",
       "src": [
        6,
        7,
        3,
        4
       ]
      }
     ],
     "metrics": [
      {
       "label": "조정 EPS",
       "value": "1.24",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "전년 동기 1.13달러, +9.7%",
       "src": 5
      },
      {
       "label": "조정 순이익",
       "value": "2,592",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 2,348백만 달러",
       "src": 5
      },
      {
       "label": "GAAP EPS",
       "value": "2.28",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "매출(야후 집계)",
       "value": "8.09",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +1.6%",
       "src": 1
      },
      {
       "label": "순이익(야후 집계)",
       "value": "4.775",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +96%",
       "src": 1
      },
      {
       "label": "NEER 백로그 신규 추가",
       "value": "3.7",
       "unit": "GW",
       "period": "2026년 3분기",
       "change": "저장장치 약 2.4GW",
       "src": 6
      },
      {
       "label": "NEER 백로그 총량",
       "value": "약 36.7",
       "unit": "GW",
       "period": "2026년 3분기 말",
       "change": "",
       "src": 6
      },
      {
       "label": "신규 상업운전 설비",
       "value": "1.8 이상",
       "unit": "GW",
       "period": "직전 실적 발표 이후",
       "change": "",
       "src": 6
      },
      {
       "label": "진행 중 대형 부하 프로젝트",
       "value": "20 이상",
       "unit": "GW",
       "period": "2026-10-21 기준",
       "change": "가스 발전 18GW 이상",
       "src": 6
      },
      {
       "label": "도미니언 인수 교환비율",
       "value": "0.8138",
       "unit": "NEE주/도미니언 1주",
       "period": "2026-05-18 계약",
       "change": "고정",
       "src": 7
      },
      {
       "label": "2026년 조정 EPS 가이던스",
       "value": "3.92–4.02",
       "unit": "달러/주",
       "period": "2026년",
       "change": "유지, 상단 목표",
       "src": 5
      }
     ],
     "guidance": [
      {
       "text": "2026년 조정 EPS 가이던스 3.92~4.02달러를 유지하고 상단 달성을 목표로 제시했다.",
       "src": [
        5,
        6
       ]
      },
      {
       "text": "조정 EPS를 2032년까지 연 8% 이상 늘리고 2032~2035년에도 같은 증가율을 목표로 제시했다.",
       "src": [
        5,
        6
       ]
      },
      {
       "text": "경영진은 도미니언 인수를 2027년 하반기에 완료한다는 목표를 재확인했다(2026-05-18 발표 당시 12~18개월 소요 예상).",
       "src": [
        6,
        7
       ]
      }
     ],
     "read_through": {
      "text": "데이터센터 수요 대응 설비는 가스 발전과 저장장치로 늘고 있다. 넥스트에라가 진행 중인 대형 부하 프로젝트 20GW 이상 중 18GW 이상이 가스 발전이고 3분기 신규 백로그 3.7GW 중 약 2.4GW가 저장장치였다. 버지니아·노스캐롤라이나 규제 승인이 필요한 도미니언 인수는 2027년 하반기 완료가 목표다.",
      "desk": "power"
     },
     "sources": [
      {
       "id": 1,
       "title": "NEE quoteSummary (earnings·earningsHistory·calendarEvents)",
       "publisher": "Yahoo Finance",
       "date": "2026-11-07",
       "url": "https://query2.finance.yahoo.com/v10/finance/quoteSummary/NEE?modules=calendarEvents,earnings,earningsHistory"
      },
      {
       "id": 2,
       "title": "NextEra Energy XBRL company facts (2025년 3분기·2026년 1분기 10-Q)",
       "publisher": "U.S. SEC (data.sec.gov)",
       "date": "2026-04-23",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0000753308.json"
      },
      {
       "id": 3,
       "title": "NextEra Energy EDGAR 제출 목록(8-K Item 1.01·2.02·5.07, S-4, EFFECT, Form 425)",
       "publisher": "U.S. SEC (data.sec.gov)",
       "date": "2026-11-07",
       "url": "https://data.sec.gov/submissions/CIK0000753308.json"
      },
      {
       "id": 4,
       "title": "Dominion Energy EDGAR 제출 목록(8-K Item 1.01·5.07, DEFM14A, Form 425)",
       "publisher": "U.S. SEC (data.sec.gov)",
       "date": "2026-11-07",
       "url": "https://data.sec.gov/submissions/CIK0000715957.json"
      },
      {
       "id": 5,
       "title": "NextEra Energy Form 8-K, Exhibit 99 (2026년 3분기 실적 발표)",
       "publisher": "U.S. SEC EDGAR",
       "date": "2026-10-21",
       "url": "https://www.sec.gov/Archives/edgar/data/0000753308/000075330826000077/neeq32026exhibit99.htm"
      },
      {
       "id": 6,
       "title": "NextEra Energy (NEE) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-21",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/21/nextera-energy-nee-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 7,
       "title": "NextEra Energy and Dominion Energy to Combine, Creating the World's Largest Regulated Electric Utility Business and North America's Premier Energy Infrastructure Platform Benefiting Customers",
       "publisher": "NextEra Energy",
       "date": "2026-05-18",
       "url": "https://newsroom.nexteraenergy.com/2026-05-18-NextEra-Energy-and-Dominion-Energy-to-Combine,-Creating-the-Worlds-Largest-Regulated-Electric-Utility-Business-and-North-Americas-Premier-Energy-Infrastructure-Platform-Benefiting-Customers?l=12"
      },
      {
       "id": 8,
       "title": "Dominion Energy Form DEFM14A (합병 위임장·증권신고서)",
       "publisher": "U.S. SEC EDGAR",
       "date": "2026-07-28",
       "url": "https://www.sec.gov/Archives/edgar/data/0000715957/000110465926087585/tm2621467-2_defm14a.htm"
      },
      {
       "id": 9,
       "title": "Quarterly net income hits $4.78B at NextEra Energy (NEE), which holds its 2026 earnings outlook",
       "publisher": "StockTitan (SEC 8-K 요약)",
       "date": "2026-10-21",
       "url": "https://www.stocktitan.net/sec-filings/NEE/8-k-nextera-energy-inc-reports-material-event-4e515db776ea.html"
      }
     ]
    }
   ]
  },
  {
   "id": "copper",
   "title": "구리 채굴·제련·전선",
   "position": "광석 채굴·정광, 제련·정련(캐소드·황산), 전선으로 이어지는 구리 체인의 광산·제련·케이블 기업을 묶은 구간이다.",
   "summary": [
    "3분기 대형 광산 물량은 품위 하락과 조업 차질로 줄어 BHP 그룹 구리 생산이 400.7천 톤으로 전년 대비 19%(에스콘디다 -23%), 프리포트 판매량이 7.49억 파운드로 23% 감소했고, 리오틴토는 오유톨고이 증산(+27%)으로 연결 생산 205천 톤의 보합을 지켰다 (BHP 1, 프리포트 1, 리오틴토 1).",
    "가격이 물량 감소를 상쇄해 평균 실현 구리가격은 BHP 파운드당 7.01달러(+53%), 프리포트 6.54달러(+40%)로 올랐고, 서던코퍼는 분기 최대 매출 46.97억 달러(+39.1%)를 냈으며 프리포트 기준 3분기 COMEX-LME 월평균 차이는 0.08달러에 그쳤다 (BHP 1, 프리포트 1, 서던코퍼 1).",
    "공급 회복 일정은 늦춰져 프리포트 2027년 판매 가이던스가 37억 파운드로 약 2.5%, 아이반호 카모아-카쿨라 2027년 가이던스가 30만~35만 톤으로 하향됐고, 서던코퍼 티아마리아 가동은 2028년 상반기로 밀렸다 (프리포트 1, 6, 아이반호 2, 서던코퍼 5).",
    "제련 단계는 정광 부족과 부산물 가격 급등이 함께 나타나 안토파가스타 스폿 정광 TC가 톤당 -310~-330달러대로 보도됐고, 카모아-카쿨라 황산 순판매가는 톤당 약 915달러로 두 배가 됐으며, 글렌코어 맞춤형 제련 캐소드 생산은 원료 품위 하락과 노 정지로 1~9월 8% 줄었다 (안토파가스타 5, 아이반호 2, 글렌코어 2).",
    "에너지 비용이 원가를 밀어올려 안토파가스타는 디젤 가격을 이유로 2026년 부산물 차감 전 현금원가 가이던스를 파운드당 2.60~2.70달러로 높였고, 카모아-카쿨라 C1은 디젤·품위 영향으로 3.00달러까지 올라 가이던스 상단에 닿았다 (안토파가스타 1, 아이반호 2).",
    "전선 수요는 미국 데이터센터와 송전망이 이끌어 프리즈미안이 3분기 조정 EBITDA 8.51억 유로(+32.1%)와 송전 유기적 성장 23.1%를 기록하고 2026년 가이던스를 30.75억~31.25억 유로로 올렸으나, 신규 송전 수주 부족으로 수주잔고는 소폭 줄었다 (프리즈미안 1, 3)."
   ],
   "open_items": [
    "BHP: 가이던스표의 에스콘디다 단위원가(파운드당 1.20~1.50달러) 행의 연도 표기와 별도 행(1.30~1.60달러, 연 900~1,000천 톤)의 의미는 원문으로 확인하지 못했다. 스펜스·코퍼 SA·안타미나 수치는 2차 보도 기준이다.",
    "리오틴토: 케네콧 채굴 구리 생산량, 정련동 연간 전망, 오유톨고이 단위원가는 확인하지 못했다.",
    "글렌코어: KCC·무탄다·콜라우아시의 분기별 자산 생산량, 코발트 수치, TC/RC 코멘트는 확인하지 못했다. 2026년 마케팅 EBIT 50억 달러 초과 전망은 칼킨 보도 기준이다.",
    "안토파가스타: 3분기 부산물 차감 전 현금원가는 출처마다 2.41달러/파운드(전분기 대비 -7%)와 2.70달러/파운드(-16%)로 달라 싣지 않았다. 스폿 TC 낙찰가는 로이터 소식통 보도이며 회사 공시가 아니다. 2026년 연간 TC/RC 벤치마크(톤당 0달러 보도)는 연도 표기를 확인하지 못해 싣지 않았고, 회사 보고서의 TC/RC 코멘트는 확인하지 못했다.",
    "아이반호: 2026년 생산 전망은 보도자료 기준 약 29만 톤이나 회사 웹사이트에는 29만~31만 톤으로 표기돼 있다. 2027년 가이던스의 이전 범위(38만~42만 톤, 애노드 기준이라는 보도), 카쿨라 배수·제련소 램프업 세부, 보도자료 발표일(11월 3일 또는 4일)은 확인하지 못했다.",
    "프리즈미안: 콜 녹취에 송전 수주잔고 140억 유로(2분기 콜 170억 유로) 발언이 있으나 보도자료의 수주잔고 약 165억 유로와 범위가 달라 반영하지 않았다. 구리가격 영향에 대한 경영진 코멘트는 확인하지 못했다.",
    "서던코퍼: 3분기 생산 감소율 1.1%의 비교 기준이 출처별로 전년 동기와 전분기로 엇갈린다. 현금원가는 0.09달러/파운드(-77%)가 다수 출처이나 0.01달러로 적은 2차 출처가 있다. 티아마리아 총투자비, 제련·정련 물량, 황산 판매는 확인하지 못했다.",
    "프리포트: 2027년 단위 순현금원가 수치, 지역별(북미·남미·인도네시아) 생산·원가, 콜에서의 COMEX 프리미엄·정련동 관세 발언, 금 판매 이연 사유는 확인하지 못했다. 2026-11-04 제출 8-K(Item 8.01) 내용도 미확인이다. 2026년(약 2%)·2027년(약 2.5%) 가이던스 하향 폭은 콜 요약 보도 기준이다.",
    "SEC 공시와 기업 IR 원문은 직접 확인하지 못했고, 수치는 발췌문과 data.sec.gov XBRL(프리포트·서던코퍼 10-Q)로 확인했다.",
    "2차 출처(SMM·칼킨·콜 녹취·요약 등) 가운데 게재일을 확인하지 못한 것의 날짜는 원 발표일 또는 콜 날짜다."
   ],
   "companies": [
    {
     "name_kr": "프리포트-맥모란",
     "name_en": "Freeport-McMoRan Inc.",
     "ticker": "FCX",
     "yahoo": "FCX",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 831259,
     "role_kr": "인도네시아 그라스버그와 미국·남미 광산을 운영하고 미국 정련동 생산의 약 70%를 공급하는 구리 생산자다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-27",
     "status": "reported",
     "highlights": [
      {
       "text": "그라스버그 블록케이브(GBC) 램프업 구간의 PTFI 가동률 저하와 선적 시점 차이로 3분기 구리 판매량은 7.49억 파운드에 그쳐 전년 동기(9.77억 파운드) 대비 23% 감소했다. 같은 분기 구리 생산량은 약 8.3억 파운드로 판매량을 약 0.8억 파운드 웃돌았다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "가격이 물량 감소를 상쇄했다. 평균 실현 구리가격은 파운드당 6.54달러로 전년 동기(4.68달러) 대비 40% 올랐고, 매출은 75.46억 달러(+8%), 지배주주 순이익은 11.74억 달러(+74%)를 기록했다. 경영진은 구리가격 파운드당 0.10달러 변동이 연간 EBITDA를 약 3.9억 달러 바꾼다고 밝혔다.",
       "src": [
        1,
        3,
        6
       ]
      },
      {
       "text": "금 판매 이연이 단위원가를 끌어올렸다. 3분기 금 생산량은 약 23만 온스였으나 판매량은 10.5만 온스에 그쳐 부산물 크레딧이 줄었고, 단위 순현금원가는 파운드당 2.07달러로 7월 추정치(2.00달러)를 4% 웃돌았다. 전년 동기(1.40달러) 대비 상승에는 PTFI 구리·금 물량 감소와 에너지·소모품 등 생산비 증가가 작용했다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "그라스버그 정상화는 2027년 말까지 걸린다. 3분기 밀 처리량은 일 약 14만 톤으로 2025년 9월 사고 이전 대비 67%이며 이 중 GBC가 일 약 7만 톤을 차지했다. 회사는 정상화 목표 일정을 유지했고, 운반 레벨 설비 개선은 2027년 초, PB1S 생산 재개는 2027년 중반으로 제시했다.",
       "src": [
        1,
        5
       ]
      },
      {
       "text": "인도네시아 동자바 제련소는 2025년 9월 사고 이후 가동을 멈췄다가 2026년 8월 말 재가동했다. 2026년 판매 가이던스는 PTFI 제련 공정 재고로 이연된 약 1억 파운드를 반영한 수치다.",
       "src": [
        1
       ]
      },
      {
       "text": "미국 프리미엄은 작았다. 3분기 COMEX 월평균 정산가는 파운드당 6.48달러로 LME 월평균(6.40달러)보다 0.08달러 높았고, 잠정가격 조정은 구리 매출에 6,400만 달러를 더했다.",
       "src": [
        1
       ]
      },
      {
       "text": "정련동 관세는 미확정이다. 2분기 10-Q 기준 2025년 8월 반제품·구리 집약 파생품에 50% 232조 관세가 부과됐으나 캐소드·정광·스크랩은 면제됐고, 2027년 15%·2028년 30% 정련동 관세 부과는 재검토 대상이다. 미국산 캐소드·정광의 국내 판매 의무(2027년 25%, 2028년 30%, 2029년 40%)에 대해 회사는 통합 조업 구조상 부정적 영향이 없다고 본다.",
       "src": [
        7
       ]
      },
      {
       "text": "유휴비용이 2027년부터 단위원가에 들어간다. 3분기 유휴설비·직접 복구·복원 비용은 2.44억 달러(1~9월 누적 9억 달러 이상)로 단위 순현금원가에서 제외됐고, 캐슬린 퀵 CEO는 이를 사라지지 않는 고정비로 규정했다.",
       "src": [
        1,
        5
       ]
      }
     ],
     "metrics": [
      {
       "label": "구리 생산량",
       "value": "약 830",
       "unit": "백만 파운드",
       "period": "2026년 3분기",
       "change": "",
       "src": 2
      },
      {
       "label": "구리 판매량",
       "value": "749",
       "unit": "백만 파운드",
       "period": "2026년 3분기",
       "change": "전년 대비 -23%",
       "src": 1
      },
      {
       "label": "평균 실현 구리가격",
       "value": "6.54",
       "unit": "달러/파운드",
       "period": "2026년 3분기",
       "change": "전년 대비 +40%",
       "src": 1
      },
      {
       "label": "LME 월평균 정산가",
       "value": "6.40",
       "unit": "달러/파운드",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "COMEX 월평균 정산가",
       "value": "6.48",
       "unit": "달러/파운드",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "단위 순현금원가",
       "value": "2.07",
       "unit": "달러/파운드",
       "period": "2026년 3분기",
       "change": "전년 동기 1.40달러 대비 +48%",
       "src": 1
      },
      {
       "label": "금 판매량",
       "value": "105",
       "unit": "천 온스",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "몰리브덴 판매량",
       "value": "22",
       "unit": "백만 파운드",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "잠정가격 조정(구리 매출 가산)",
       "value": "64",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "유휴설비·복구 비용(단위원가 제외)",
       "value": "244",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "매출",
       "value": "7,546",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +8%",
       "src": 3
      },
      {
       "label": "영업이익",
       "value": "2,353",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +19%",
       "src": 3
      },
      {
       "label": "지배주주 순이익",
       "value": "1,174",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +74%",
       "src": 3
      },
      {
       "label": "자본지출",
       "value": "1,159",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +10%",
       "src": 3
      },
      {
       "label": "자사주 매입",
       "value": "102",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      },
      {
       "label": "주당 배당(선언)",
       "value": "0.15",
       "unit": "달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      }
     ],
     "guidance": [
      {
       "text": "2026년 구리 판매량 가이던스는 약 30억 파운드(4분기 8.75억 파운드, 3분기 대비 +17%)로 미국·칠레 광산 생산 부진을 반영해 약 2% 낮아졌고, 4분기 증가분은 그라스버그 램프업과 제련소 정상화에서 나온다.",
       "src": [
        1,
        4,
        6
       ]
      },
      {
       "text": "2027년 구리 판매량은 37억 파운드로 광산계획 수정에 따라 약 2.5% 하향됐고, 2028년은 41억 파운드로 유지됐다.",
       "src": [
        1,
        6
       ]
      },
      {
       "text": "단위 순현금원가는 2026년 연간 파운드당 1.90달러(4분기 1.68달러)로 제시됐고, 2027년부터는 유휴비용이 별도 구분 없이 단위원가에 포함된다.",
       "src": [
        1,
        5
       ]
      },
      {
       "text": "자본지출은 2026년 약 44억 달러, 2027년 약 52억 달러이며 2027년 계획은 장비 추가 투자와 비용 인플레이션으로 7월 대비 약 4억 달러 늘었다.",
       "src": [
        1
       ]
      },
      {
       "text": "그라스버그 밀 처리량 목표는 2027년 중반 정상의 80%, 2027년 말 정상 근접이며, 애리조나 바그다드 증설에는 관세·인력 부족·인플레이션이 위험 요인으로 제시됐다.",
       "src": [
        1,
        5
       ]
      }
     ],
     "read_through": {
      "text": "그라스버그 처리량이 정상의 67%에 머물고 2027년 판매 가이던스(37억 파운드)마저 약 2.5% 낮아져 대형 광산발 공급 회복은 2027년 말까지 지연되며, 3분기 COMEX-LME 차이가 0.08달러/파운드에 그쳐 가격 강세는 LME 기준 글로벌 수급이 주도했다.",
      "desk": "copper"
     },
     "sources": [
      {
       "id": 1,
       "title": "Freeport Reports Third-Quarter and Nine-Month 2026 Results (Form 8-K Exhibit 99.1)",
       "publisher": "Freeport-McMoRan / SEC EDGAR",
       "date": "2026-10-27",
       "url": "https://www.sec.gov/Archives/edgar/data/0000831259/000083125926000045/a3q2026exhibit991.htm"
      },
      {
       "id": 2,
       "title": "Freeport Provides Third-Quarter 2026 Operational Update",
       "publisher": "Freeport-McMoRan",
       "date": "2026-10-02",
       "url": "https://investors.fcx.com/investors/news-releases/news-release-details/2026/Freeport-Provides-Third-Quarter-2026-Operational-Update/default.aspx"
      },
      {
       "id": 3,
       "title": "Freeport-McMoRan Form 10-Q (period ended 2026-09-30) XBRL company facts",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-06",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0000831259.json"
      },
      {
       "id": 4,
       "title": "Freeport-McMoRan (FCX) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-27",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/27/freeport-mcmoran-fcx-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 5,
       "title": "Freeport-McMoRan Inc (FCX) (Q3 2026) Earnings Call Highlights: Strong Copper Growth and Grasberg Ramp-Up Offset Cost Pressures",
       "publisher": "GuruFocus",
       "date": "2026-10-27",
       "url": "https://www.gurufocus.com/news/9145343/freeportmcmoran-inc-fcx-q3-2026-earnings-call-highlights-strong-copper-growth-and-grasberg-rampup-offset-cost-pressures"
      },
      {
       "id": 6,
       "title": "What Freeport-McMoRan (FCX) Said on Its Q3 Earnings Call",
       "publisher": "MarketBeat",
       "date": "2026-10-27",
       "url": "https://www.marketbeat.com/instant-alerts/transcript-what-freeport-mcmoran-fcx-said-on-its-q3-earnings-call-2026-10-27/"
      },
      {
       "id": 7,
       "title": "Freeport-McMoRan Form 10-Q for the quarter ended June 30, 2026",
       "publisher": "SEC EDGAR",
       "date": "2026-08-06",
       "url": "https://www.sec.gov/Archives/edgar/data/0000831259/000083125926000036/fcx-20260630.htm"
      }
     ]
    },
    {
     "name_kr": "서던코퍼",
     "name_en": "Southern Copper Corporation",
     "ticker": "SCCO",
     "yahoo": "SCCO",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1001838,
     "role_kr": "멕시코와 페루에서 구리 광산과 제련·정련소를 함께 운영하는 수직계열화 구리 생산자다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-20",
     "status": "reported",
     "highlights": [
      {
       "text": "가격 효과로 분기 최대 매출을 냈다. 3분기 매출은 46.97억 달러로 전년 동기 대비 39.1% 늘었고, 회사는 모든 제품의 가격 상승을 주요인으로 제시했다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "이익 증가율이 매출 증가율을 웃돌았다. 3분기 영업이익은 28.15억 달러(+59.2%)로 영업이익률이 59.9%(전년 동기 52.4%)까지 올랐고, 순이익은 18.02억 달러(+62.7%), 영업현금흐름은 22.24억 달러(+42.6%)였다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "3분기 채굴 구리 생산량은 232,396톤으로 전년 동기 대비 1.1% 감소했고 페루 광산의 품위 하락이 주요인이다. 1~9월 누적은 693,602톤으로 전년 동기 대비 2.9% 줄었다.",
       "src": [
        3,
        6
       ]
      },
      {
       "text": "부산물 크레딧이 원가를 대부분 상쇄했다. 3분기 부산물 차감 후 구리 현금원가는 파운드당 0.09달러로 전년 동기 대비 77% 낮아졌다.",
       "src": [
        4,
        6
       ]
      },
      {
       "text": "경영진은 기계 조립과 엔지니어링 기간이 길어져 페루 티아마리아 가동 시점을 2027년 4분기에서 2028년 상반기로 미뤘고, 9월 말 공정률은 49.6%, 누적 투자액은 8.843억 달러다.",
       "src": [
        5,
        6
       ]
      },
      {
       "text": "3분기 유형자산 취득액은 5.16억 달러로 전년 동기(3.49억 달러) 대비 48% 늘었고, 배당금 지급액은 9.18억 달러로 43% 증가했다.",
       "src": [
        2
       ]
      }
     ],
     "metrics": [
      {
       "label": "채굴 구리 생산량",
       "value": "232,396",
       "unit": "톤",
       "period": "2026년 3분기",
       "change": "전년 대비 -1.1%",
       "src": 3
      },
      {
       "label": "채굴 구리 생산량 누계",
       "value": "693,602",
       "unit": "톤",
       "period": "2026년 1~9월",
       "change": "전년 대비 -2.9%",
       "src": 3
      },
      {
       "label": "부산물 차감 후 구리 현금원가",
       "value": "0.09",
       "unit": "달러/파운드",
       "period": "2026년 3분기",
       "change": "전년 대비 -77%",
       "src": 4
      },
      {
       "label": "매출",
       "value": "4,696.6",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +39.1%",
       "src": 2
      },
      {
       "label": "영업이익",
       "value": "2,815.1",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +59.2%",
       "src": 2
      },
      {
       "label": "순이익(지배주주)",
       "value": "1,801.8",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +62.7%",
       "src": 2
      },
      {
       "label": "영업현금흐름",
       "value": "2,224.3",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +42.6%",
       "src": 2
      },
      {
       "label": "유형자산 취득(설비투자)",
       "value": "515.8",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +47.7%",
       "src": 2
      },
      {
       "label": "배당금 지급",
       "value": "917.9",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +42.7%",
       "src": 2
      },
      {
       "label": "티아마리아 공정률",
       "value": "49.6",
       "unit": "%",
       "period": "2026-09-30",
       "change": "",
       "src": 6
      },
      {
       "label": "티아마리아 누적 투자액",
       "value": "884.3",
       "unit": "백만 달러",
       "period": "2026-09-30",
       "change": "",
       "src": 6
      }
     ],
     "guidance": [
      {
       "text": "2026년 구리 생산 전망 918천 톤(초기 계획 대비 +0.7%)을 유지했고, 경영진은 실제 생산이 920천 톤을 약간 밑돌 것으로 봤다.",
       "src": [
        4,
        5
       ]
      },
      {
       "text": "2027년 상세 생산 가이던스는 전 광산 채광계획을 재검토한 뒤 2027년 1월 제시할 예정이다.",
       "src": [
        5,
        6
       ]
      },
      {
       "text": "티아마리아는 2028년 상반기 가동 후 초기 연 120천 톤의 구리를 생산할 계획이며, 엘필라르와 합쳐 연 약 156천 톤의 정련동이 추가된다.",
       "src": [
        5,
        6
       ]
      },
      {
       "text": "경영진은 4분기 현금원가가 3분기와 비슷하거나 소폭 나아질 것으로 전망했다.",
       "src": [
        6
       ]
      }
     ],
     "read_through": {
      "text": "구리가격이 오른 3분기에도 페루 광산 품위 하락으로 1~9월 채굴량이 2.9% 줄었고 티아마리아(연 120천 톤) 가동이 2028년 상반기로 밀려, 고가격이 단기 증산으로 이어지지 않고 있다.",
      "desk": "copper"
     },
     "sources": [
      {
       "id": 1,
       "title": "Southern Copper third quarter and nine months 2026 results (Form 8-K Exhibit 99.1)",
       "publisher": "Southern Copper / SEC EDGAR",
       "date": "2026-10-20",
       "url": "https://www.sec.gov/Archives/edgar/data/1001838/000110465926117588/scco-ex99d1.htm"
      },
      {
       "id": 2,
       "title": "Southern Copper Form 10-Q (period ended 2026-09-30) XBRL company facts",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-10-30",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001001838.json"
      },
      {
       "id": 3,
       "title": "Southern Copper reported on October 20 that third-quarter 2026 mined copper output was 232,396 tonnes",
       "publisher": "Shanghai Metals Market (SMM)",
       "date": "2026-10-20",
       "url": "https://news.metal.com/newscontent/104173689-southern-copper-2026-q3-output-falls-11-qoq-to-232396-tonnes"
      },
      {
       "id": 4,
       "title": "Earnings call transcript: Southern Copper posts record Q3 2026 results as shares fall",
       "publisher": "Investing.com",
       "date": "2026-10-22",
       "url": "https://www.investing.com/news/transcripts/earnings-call-transcript-southern-copper-posts-record-q3-2026-results-as-shares-fall-93CH-4967029"
      },
      {
       "id": 5,
       "title": "Southern Copper (SCCO) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-22",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/22/southern-copper-scco-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 6,
       "title": "SCCO Q3 Earnings Call Highlights Project Delays and Cost Outlook",
       "publisher": "Zacks / Yahoo Finance",
       "date": "2026-10-22",
       "url": "https://finance.yahoo.com/markets/commodities/articles/scco-q3-earnings-call-highlights-182000680.html"
      }
     ]
    },
    {
     "name_kr": "BHP",
     "name_en": "BHP Group Limited",
     "ticker": "BHP",
     "yahoo": "BHP",
     "exchange": "NYSE(ADR), 주상장 ASX",
     "country": "호주",
     "cik": null,
     "role_kr": "칠레 에스콘디다·스펜스, 남호주 구리 자산과 페루 안타미나 지분을 보유한 대형 구리 생산자다.",
     "period": "2026년 9월 분기(FY27 1분기)",
     "period_end": "2026-09-30",
     "report_date": "2026-10-20",
     "status": "reported",
     "highlights": [
      {
       "text": "에스콘디다 품위 하락이 그룹 물량을 끌어내렸다. 9월 분기 그룹 구리 생산량은 400.7천 톤으로 전년 동기 대비 19% 줄었고, 에스콘디다는 252.6천 톤(-23%)으로 투입 품위가 0.81%(전년 동기 0.94%)로 낮아졌다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "감산은 계획된 품위 하락과 정기 보수에 칠레 기상 악화, 안전 관련 조업 중단, 카라파티나 컨베이어 고장이 겹친 결과이며, 7~8월에는 에스콘디다의 운영 물류와 트럭 가동률 제약도 있었다.",
       "src": [
        1
       ]
      },
      {
       "text": "자산별로는 스펜스 47.4천 톤(-15%), 코퍼 사우스오스트레일리아 60.7천 톤(-16%)이 줄었고, 안타미나(BHP 지분분)는 40천 톤으로 18% 늘었다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "9월 분기 평균 실현 구리가격은 파운드당 7.01달러로 전분기 대비 7%, 전년 동기 대비 53% 올랐다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "그룹 구리 생산량",
       "value": "400.7",
       "unit": "천 톤",
       "period": "2026년 9월 분기",
       "change": "전년 대비 -19%",
       "src": 1
      },
      {
       "label": "에스콘디다 구리 생산량",
       "value": "252.6",
       "unit": "천 톤",
       "period": "2026년 9월 분기",
       "change": "전년 대비 -23%",
       "src": 1
      },
      {
       "label": "에스콘디다 투입 품위",
       "value": "0.81",
       "unit": "%",
       "period": "2026년 9월 분기",
       "change": "전년 동기 0.94%",
       "src": 1
      },
      {
       "label": "스펜스 구리 생산량",
       "value": "47.4",
       "unit": "천 톤",
       "period": "2026년 9월 분기",
       "change": "전년 대비 -15%",
       "src": 3
      },
      {
       "label": "코퍼 사우스오스트레일리아 구리 생산량",
       "value": "60.7",
       "unit": "천 톤",
       "period": "2026년 9월 분기",
       "change": "전년 대비 -16%",
       "src": 4
      },
      {
       "label": "안타미나 구리 생산량(BHP 지분분)",
       "value": "40",
       "unit": "천 톤",
       "period": "2026년 9월 분기",
       "change": "전년 대비 +18%",
       "src": 3
      },
      {
       "label": "평균 실현 구리가격",
       "value": "7.01",
       "unit": "달러/파운드",
       "period": "2026년 9월 분기",
       "change": "전년 대비 +53%, 전분기 대비 +7%",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "FY27(2027년 6월 결산) 그룹 구리 생산 가이던스 1,650~1,800천 톤과 에스콘디다 생산 가이던스 1,000~1,100천 톤을 모두 유지했다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "가이던스표상 에스콘디다 단위원가는 파운드당 1.20~1.50달러로 변동이 없다.",
       "src": [
        1
       ]
      }
     ],
     "read_through": {
      "text": "에스콘디다 투입 품위가 0.13%p 낮아지며 생산이 23% 줄었고 1분기 연율(약 1,010천 톤)이 FY27 가이던스 하단(1,000천 톤)에 머물러, 칠레발 정광 공급의 상향 여지는 작다.",
      "desk": "copper"
     },
     "sources": [
      {
       "id": 1,
       "title": "Operational review for the quarter ended 30 September 2026",
       "publisher": "BHP",
       "date": "2026-10-20",
       "url": "https://www.bhp.com/-/media/documents/media/reports-and-presentations/2026/261020_bhpoperationalreviewforthequarterended30september2026-pdf.pdf"
      },
      {
       "id": 2,
       "title": "BHP Operational review for the quarter ended 30 September 2026 (media release)",
       "publisher": "BHP",
       "date": "2026-10-20",
       "url": "https://www.bhp.com/news/media-centre/releases/2026/10/bhp-operational-review-for-the-quarter-ended-30-september-2026"
      },
      {
       "id": 3,
       "title": "BHP quarterly copper output falls 19% year on year; FY2027 guidance unchanged",
       "publisher": "Shanghai Metals Market (SMM)",
       "date": "2026-10-20",
       "url": "https://news.metal.com/newscontent/104167555-bhp-quarterly-copper-output-falls-19-year-on-year-and-quarter-on-quarter-fy2027-guidance-unchanged"
      },
      {
       "id": 4,
       "title": "BHP Share Price News: BHP (ASX:BHP) Copper Output Falls 19% as FY27 Guidance Holds",
       "publisher": "Kalkine Media",
       "date": "2026-10-20",
       "url": "https://kalkine.com.au/news/mining/bhp-share-price-news-bhp-asxbhp-copper-output-falls-19-as-fy27-guidance-holds"
      }
     ]
    },
    {
     "name_kr": "리오틴토",
     "name_en": "Rio Tinto Group",
     "ticker": "RIO",
     "yahoo": "RIO",
     "exchange": "NYSE(ADR), 주상장 LSE·ASX",
     "country": "영국·호주",
     "cik": null,
     "role_kr": "몽골 오유톨고이와 미국 케네콧(광산·제련·정련), 칠레 에스콘디다 지분을 보유한 구리 생산자다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-14",
     "status": "reported",
     "highlights": [
      {
       "text": "오유톨고이 증산이 다른 자산의 차질을 메웠다. 3분기 연결 구리 생산량은 205천 톤으로 전년 동기와 같고 전분기 대비 4% 줄었으며, 1~9월 누적은 646천 톤으로 1% 늘었다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "오유톨고이는 지하광산 램프업과 회수율 개선으로 3분기 정광 내 구리 114천 톤(+27%), 1~9월 312천 톤(+29%)을 생산했고, 분기 중 연율 약 450천 톤으로 가동했다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "케네콧 제련 차질로 정련동이 급감했다. 6월 말 파손된 플래시 컨버팅 노는 8월 말 계획보다 앞당겨 재건을 마치고 정상 용량으로 복귀했으나, 3분기 케네콧 정련동은 약 12천 톤으로 전년 대비 10%, 전분기 대비 43% 줄었다. 광산·선광 조업은 영향을 받지 않았다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "에스콘디다 지분분은 정광 내 구리 63천 톤으로 전년 대비 29% 줄었고 정련동은 16천 톤으로 18% 늘었다.",
       "src": [
        3
       ]
      }
     ],
     "metrics": [
      {
       "label": "연결 구리 생산량",
       "value": "205",
       "unit": "천 톤",
       "period": "2026년 3분기",
       "change": "전년 대비 0%, 전분기 대비 -4%",
       "src": 2
      },
      {
       "label": "연결 구리 생산량 누계",
       "value": "646",
       "unit": "천 톤",
       "period": "2026년 1~9월",
       "change": "전년 대비 +1%",
       "src": 2
      },
      {
       "label": "오유톨고이 정광 내 구리",
       "value": "114",
       "unit": "천 톤",
       "period": "2026년 3분기",
       "change": "전년 대비 +27%",
       "src": 3
      },
      {
       "label": "오유톨고이 정광 내 구리 누계",
       "value": "312",
       "unit": "천 톤",
       "period": "2026년 1~9월",
       "change": "전년 대비 +29%",
       "src": 3
      },
      {
       "label": "케네콧 정련동",
       "value": "약 12",
       "unit": "천 톤",
       "period": "2026년 3분기",
       "change": "전년 대비 -10%, 전분기 대비 -43%",
       "src": 3
      },
      {
       "label": "에스콘디다(지분분) 정광 내 구리",
       "value": "63",
       "unit": "천 톤",
       "period": "2026년 3분기",
       "change": "전년 대비 -29%",
       "src": 3
      },
      {
       "label": "에스콘디다(지분분) 정련동",
       "value": "16",
       "unit": "천 톤",
       "period": "2026년 3분기",
       "change": "전년 대비 +18%",
       "src": 3
      }
     ],
     "guidance": [
      {
       "text": "2026년 구리 생산 가이던스 800~870천 톤과 C1 단위원가 가이던스 파운드당 30~50센트를 유지했다.",
       "src": [
        1
       ]
      },
      {
       "text": "오유톨고이는 2028년부터 연 약 500천 톤 생산 목표를 유지했다.",
       "src": [
        1
       ]
      }
     ],
     "read_through": {
      "text": "오유톨고이 증산(+27%)이 에스콘디다 지분분 정광 감소(-29%)를 메워 연결 생산이 보합에 그쳤고, 케네콧 제련 차질(정련동 전분기 대비 -43%)이 8월 말 해소돼 4분기 미국 내 정련동 공급은 회복될 전망이다.",
      "desk": "copper"
     },
     "sources": [
      {
       "id": 1,
       "title": "Rio Tinto releases third quarter 2026 production results",
       "publisher": "Rio Tinto",
       "date": "2026-10-14",
       "url": "https://www.riotinto.com/en/news/releases/2026/rio-tinto-releases-third-quarter-2026-production-results"
      },
      {
       "id": 2,
       "title": "Rio Tinto releases third quarter 2026 production results, 14 October 2026 (ASX announcement)",
       "publisher": "Rio Tinto / ASX",
       "date": "2026-10-14",
       "url": "https://announcements.asx.com.au/asxpdf/20261014/pdf/07591gbn3g6c6g.pdf"
      },
      {
       "id": 3,
       "title": "Rio Tinto Q3 copper production 204,500 mt, basically flat YoY; Kennecott flash converting furnace rebuild completed",
       "publisher": "Shanghai Metals Market (SMM)",
       "date": "2026-10-20",
       "url": "https://news.metal.com/newscontent/104169063-rio-tinto-q3-copper-production-204500-mt-basically-flat-yoy-kennecott-flash-converting-furnace-rebuild-completed"
      }
     ]
    },
    {
     "name_kr": "글렌코어",
     "name_en": "Glencore plc",
     "ticker": "GLEN",
     "yahoo": "GLEN.L",
     "exchange": "LSE",
     "country": "스위스",
     "cik": null,
     "role_kr": "아프리카(DRC)·칠레·페루 구리 광산과 맞춤형 제련·정련 사업, 금속 트레이딩을 겸하는 통합 상품회사다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-29",
     "status": "reported",
     "highlights": [
      {
       "text": "아프리카 구리와 안타미나가 증산을 이끌었다. 3분기 자체 구리 생산량은 201.6천 톤으로 2분기(197.4천 톤)보다 늘었고, 1~9월 누적 598.6천 톤은 전년 대비 3%, 마운트아이자 폐쇄와 키드 매각(2026년 6월 1일) 효과를 조정하면 12% 증가했다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "1~9월 아프리카 구리는 채굴량 증가와 품위 개선으로 56.7천 톤, 안타미나는 품위 상승으로 32.3천 톤 늘었고, 안타파카이(-16.7천 톤)와 콜라우아시(-7.2천 톤)는 줄었다.",
       "src": [
        2
       ]
      },
      {
       "text": "제련 부문은 위축됐다. 맞춤형 제련 부문 1~9월 캐소드 생산량은 217.8천 톤으로 원료 품위 하락과 노 정지 탓에 전년 동기 대비 18.9천 톤(8%) 줄었고, 2025년 매각한 파사르 물량(38.3천 톤)을 제외한 애노드 생산량은 34.9천 톤(12%) 늘었다.",
       "src": [
        2
       ]
      }
     ],
     "metrics": [
      {
       "label": "자체 구리 생산량",
       "value": "201.6",
       "unit": "천 톤",
       "period": "2026년 3분기",
       "change": "2분기 197.4천 톤",
       "src": 1
      },
      {
       "label": "자체 구리 생산량 누계",
       "value": "598.6",
       "unit": "천 톤",
       "period": "2026년 1~9월",
       "change": "전년 대비 +3%(처분·폐쇄 조정 시 +12%)",
       "src": 1
      },
      {
       "label": "맞춤형 제련 캐소드 생산량",
       "value": "217.8",
       "unit": "천 톤",
       "period": "2026년 1~9월",
       "change": "전년 대비 -8%",
       "src": 2
      },
      {
       "label": "애노드 생산량 증가분(파사르 제외)",
       "value": "34.9",
       "unit": "천 톤",
       "period": "2026년 1~9월",
       "change": "전년 대비 +12%",
       "src": 2
      },
      {
       "label": "자체 구리 생산량(전년 실적)",
       "value": "851.6",
       "unit": "천 톤",
       "period": "2025년",
       "change": "",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "2026년 구리 생산 가이던스 810~870천 톤을 유지했으나 회사는 실적이 범위 하단일 것으로 예상하며, 4분기 증가분은 콜라우아시의 품위·회수율 개선에서 나온다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "칼킨 보도에 따르면 회사는 2026년 마케팅(트레이딩) EBIT 전망을 50억 달러 초과로 제시했다.",
       "src": [
        3
       ]
      }
     ],
     "read_through": {
      "text": "가이던스 하단(810천 톤) 달성에 4분기 약 211천 톤(3분기 대비 +5%)이 필요해 연간 물량은 콜라우아시 품위 회복에 달려 있고, 맞춤형 제련 캐소드 생산은 원료 품위 하락과 노 정지로 8% 줄었다.",
      "desk": "copper"
     },
     "sources": [
      {
       "id": 1,
       "title": "Third Quarter 2026 Production Report",
       "publisher": "Glencore",
       "date": "2026-10-29",
       "url": "https://www.glencore.com/media-and-insights/news/third-quarter-2026-production-report"
      },
      {
       "id": 2,
       "title": "Glencore Third Quarter 2026 Production Report (PDF)",
       "publisher": "Glencore",
       "date": "2026-10-29",
       "url": "https://www.glencore.com/.rest/api/v1/documents/static/7ed50c65-7d84-4cc1-a2c4-216060583297/GLEN_2026-Q3_ProductionReport.pdf"
      },
      {
       "id": 3,
       "title": "Glencore Reports Q3 2026 Production With Copper Up 3% YTD and 2026 Marketing EBIT Guidance Above $5bn",
       "publisher": "Kalkine Media",
       "date": "2026-10-29",
       "url": "https://kalkine.com.au/news/announcements/glencore-reports-q3-2026-production-with-copper-up-3-ytd-and-2026-marketing-ebit-guidance-above-5bn"
      },
      {
       "id": 4,
       "title": "Glencore's self-produced copper up 3% YoY in first three quarters, full-year production expected near lower end of guidance",
       "publisher": "Shanghai Metals Market (SMM)",
       "date": "2026-10-29",
       "url": "https://news.metal.com/newscontent/104186741-glencores-self-produced-copper-up-3-yoy-in-first-three-quarters-full-year-production-expected-near-lower-end-of-guidance"
      }
     ]
    },
    {
     "name_kr": "안토파가스타",
     "name_en": "Antofagasta plc",
     "ticker": "ANTO",
     "yahoo": "ANTO.L",
     "exchange": "LSE",
     "country": "영국",
     "cik": null,
     "role_kr": "칠레 로스펠람브레스·센티넬라 등에서 정광과 캐소드를 생산하며 중국 제련소와 연간 TC/RC 협상을 이끄는 구리 광산사다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-15",
     "status": "reported",
     "highlights": [
      {
       "text": "로스펠람브레스 정상화로 3분기 구리 생산량은 151.9천 톤으로 전분기 대비 7% 늘었다. 로스펠람브레스가 7월 기상 악화에서 회복하고 전분기에 쌓인 재고를 소진한 영향이다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "1~9월 생산량은 436.9천 톤으로 전년 동기 대비 8% 줄었고, 센티넬라의 품위·회수율 하락이 주요인이다.",
       "src": [
        1
       ]
      },
      {
       "text": "3분기 생산량은 애널리스트 추정치(피엘헌트 158천 톤)를 밑돌았고, 2027년 가이던스 발표 후 주가가 하락했다.",
       "src": [
        4
       ]
      },
      {
       "text": "디젤 가격이 원가를 밀어올렸다. 회사는 국제 디젤 가격 상승을 이유로 2026년 부산물 차감 전 현금원가 가이던스를 파운드당 2.40~2.60달러에서 2.60~2.70달러로 높였고, 순현금원가와 자본지출 가이던스는 유지했다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "정광 TC는 마이너스 폭이 커졌다. 로이터는 소식통을 인용해 회사가 센티넬라 정광 1만 톤(11월 선적)을 톤당 -310달러, 로스펠람브레스 정광 4만 톤(2027년 물량)을 -330달러대 TC에 낙찰시켰다고 보도했다.",
       "src": [
        5
       ]
      },
      {
       "text": "로이터에 따르면 회사는 7월 일부 중국 제련소와 TC/RC를 스폿 지수에 연동하되 하한을 보장하는 판매 방식에 합의했고, 2027년 물량 협상은 LME 위크를 계기로 시작할 예정이다.",
       "src": [
        5,
        6
       ]
      }
     ],
     "metrics": [
      {
       "label": "구리 생산량",
       "value": "151.9",
       "unit": "천 톤",
       "period": "2026년 3분기",
       "change": "전분기 대비 +7%",
       "src": 1
      },
      {
       "label": "구리 생산량 누계",
       "value": "436.9",
       "unit": "천 톤",
       "period": "2026년 1~9월",
       "change": "전년 대비 -8%",
       "src": 1
      },
      {
       "label": "부산물 차감 전 현금원가 가이던스",
       "value": "2.60~2.70",
       "unit": "달러/파운드",
       "period": "2026년",
       "change": "기존 2.40~2.60달러에서 상향",
       "src": 1
      },
      {
       "label": "순현금원가 가이던스",
       "value": "1.15~1.35",
       "unit": "달러/파운드",
       "period": "2026년",
       "change": "유지",
       "src": 1
      },
      {
       "label": "센티넬라 정광 스폿 TC(로이터 보도)",
       "value": "-310",
       "unit": "달러/톤",
       "period": "2026년 11월 선적분(1만 톤)",
       "change": "",
       "src": 5
      },
      {
       "label": "로스펠람브레스 정광 TC(로이터 보도)",
       "value": "-330대",
       "unit": "달러/톤",
       "period": "2027년 물량(4만 톤)",
       "change": "",
       "src": 5
      }
     ],
     "guidance": [
      {
       "text": "2026년 구리 생산 가이던스 625~655천 톤을 유지했다.",
       "src": [
        1
       ]
      },
      {
       "text": "2027년 생산 가이던스는 630~690천 톤으로, 로스펠람브레스 품위 상승이 센티넬라 정광 품위 하락을 일부 상쇄하는 계획이다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "2026년 부산물 차감 전 현금원가 가이던스는 파운드당 2.60~2.70달러(상향), 순현금원가 가이던스는 1.15~1.35달러(유지)다.",
       "src": [
        1
       ]
      }
     ],
     "read_through": {
      "text": "스폿 정광 TC가 톤당 -310~-330달러대까지 내려가 제련소가 광산에 처리비를 지불하는 구조가 2027년 물량까지 확산됐고, 디젤 가격 상승으로 회사의 2026년 현금원가 가이던스는 파운드당 0.10~0.20달러 높아졌다.",
      "desk": "copper"
     },
     "sources": [
      {
       "id": 1,
       "title": "Q3 2026 Production Report",
       "publisher": "Antofagasta plc",
       "date": "2026-10-15",
       "url": "https://www.antofagasta.co.uk/investors/news/2026/q3-2026-production-report/"
      },
      {
       "id": 2,
       "title": "News release, 15 October 2026: Q3 2026 Production Report (PDF)",
       "publisher": "Antofagasta plc",
       "date": "2026-10-15",
       "url": "https://www.antofagasta.co.uk/media/4976/20261015_aplc26q3prodreport-oct26-vf.pdf"
      },
      {
       "id": 3,
       "title": "Antofagasta Q3 copper output rises 7%, issues 2027 production guidance",
       "publisher": "Investing.com",
       "date": "2026-10-15",
       "url": "https://www.investing.com/news/earnings/antofagasta-q3-copper-output-rises-7-issues-2027-production-guidance-4950659"
      },
      {
       "id": 4,
       "title": "Antofagasta Q3 copper output misses estimates, softer 2027 guidance sends shares down",
       "publisher": "Shanghai Metals Market (SMM)",
       "date": "2026-10-15",
       "url": "https://news.metal.com/newscontent/104160149-antofagasta-q3-copper-output-misses-estimates-softer-2027-guidance-sends-shares-down-7"
      },
      {
       "id": 5,
       "title": "Antofagasta nets its highest ever copper treatment charges in auction, sources say",
       "publisher": "Reuters via Kitco",
       "date": "2026-10-16",
       "url": "https://www.kitco.com/news/off-the-wire/2026-10-16/antofagasta-nets-its-highest-ever-copper-treatment-charges-auction"
      },
      {
       "id": 6,
       "title": "Antofagasta agrees spot-indexed copper ore sales with some Chinese smelters",
       "publisher": "Reuters via Kitco",
       "date": "2026-07-01",
       "url": "https://www.kitco.com/news/off-the-wire/2026-07-01/antofagasta-agrees-spot-indexed-copper-ore-sales-some-chinese-smelters"
      }
     ]
    },
    {
     "name_kr": "아이반호 마인스",
     "name_en": "Ivanhoe Mines Ltd.",
     "ticker": "IVN",
     "yahoo": "IVN.TO",
     "exchange": "TSX",
     "country": "캐나다",
     "cik": null,
     "role_kr": "DRC 카모아-카쿨라 구리 광산과 단지 내 직접 제련소, 키푸시 아연 광산을 운영하는 광산사다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-03",
     "status": "reported",
     "highlights": [
      {
       "text": "생산이 판매를 웃돌아 재고가 쌓였다. 카모아-카쿨라의 3분기 구리 생산량(판매가능 제품 내)은 76,401톤, 유상 구리 판매량은 67,025톤이며 분기 말 구리 재고는 약 43,000톤이다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "황산이 제련 원가를 상쇄했다. 단지 내 제련소는 3분기 고농도 황산 118,638톤을 생산해 분기 최대를 기록했고 황산 순판매가는 전분기 대비 약 2배인 톤당 약 915달러로 올라, 제련 조업비 파운드당 0.51달러를 황산 부산물 크레딧 0.69달러가 웃돌았다.",
       "src": [
        2,
        4
       ]
      },
      {
       "text": "3분기 C1 현금원가는 파운드당 3.00달러로 1~9월 평균(2.80달러)을 웃돌며 2026년 가이던스(2.60~3.00달러) 상단에 닿았고, 디젤 가격 상승과 처리 광석 품위 하락이 원인이다. C1 중 전력 비중은 23%로 2분기(20%)보다 높아졌다.",
       "src": [
        2,
        5
       ]
      },
      {
       "text": "가격 효과로 카모아-카쿨라 3분기 매출은 10.34억 달러로 분기 최대를 기록했고 EBITDA는 4.78억 달러, 평균 실현 구리가격은 파운드당 6.12달러, 물류비는 파운드당 0.29달러였다. 그룹 세후이익은 4,500만 달러(전년 동기 3,100만 달러)다.",
       "src": [
        2
       ]
      },
      {
       "text": "회사는 고품위 채광 일정을 늦추는 방향으로 단기 생산 경로를 수정해 2027년 생산 가이던스를 낮췄고, 2027년 C1 현금원가 가이던스는 기존(파운드당 2.10~2.50달러)보다 높였다.",
       "src": [
        2,
        3
       ]
      }
     ],
     "metrics": [
      {
       "label": "카모아-카쿨라 구리 생산량(판매가능 제품 내)",
       "value": "76,401",
       "unit": "톤",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "유상 구리 판매량",
       "value": "67,025",
       "unit": "톤",
       "period": "2026년 3분기",
       "change": "",
       "src": 2
      },
      {
       "label": "분기 말 구리 재고",
       "value": "약 43,000",
       "unit": "톤",
       "period": "2026-09-30",
       "change": "",
       "src": 2
      },
      {
       "label": "C1 현금원가",
       "value": "3.00",
       "unit": "달러/파운드",
       "period": "2026년 3분기",
       "change": "1~9월 평균 2.80달러",
       "src": 2
      },
      {
       "label": "평균 실현 구리가격",
       "value": "6.12",
       "unit": "달러/파운드",
       "period": "2026년 3분기",
       "change": "",
       "src": 2
      },
      {
       "label": "황산 생산량",
       "value": "118,638",
       "unit": "톤",
       "period": "2026년 3분기",
       "change": "분기 최대",
       "src": 2
      },
      {
       "label": "황산 순판매가",
       "value": "약 915",
       "unit": "달러/톤",
       "period": "2026년 3분기",
       "change": "전분기 대비 약 2배",
       "src": 2
      },
      {
       "label": "카모아-카쿨라 매출",
       "value": "1,034",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "분기 최대",
       "src": 2
      },
      {
       "label": "카모아-카쿨라 EBITDA",
       "value": "478",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 2
      },
      {
       "label": "그룹 세후이익",
       "value": "45",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 동기 31백만 달러",
       "src": 2
      }
     ],
     "guidance": [
      {
       "text": "2026년 카모아-카쿨라 생산은 약 29만 톤(판매가능 제품 내 구리, 보도자료 기준)으로 제시됐고 2026년 현금원가 가이던스(파운드당 2.60~3.00달러)는 유지됐다.",
       "src": [
        2,
        5
       ]
      },
      {
       "text": "2027년 생산 가이던스는 30만~35만 톤, C1 현금원가 가이던스는 파운드당 2.50~3.00달러다.",
       "src": [
        2,
        3
       ]
      },
      {
       "text": "회사는 신규 60MW 태양광 설비가 4분기부터 에너지 비용을 낮출 것으로 전망했다.",
       "src": [
        2,
        5
       ]
      }
     ],
     "read_through": {
      "text": "카모아-카쿨라의 황산 순판매가가 톤당 약 915달러로 두 배가 됐고, 2027년 생산 가이던스가 30만~35만 톤으로 낮아져 아프리카발 구리 공급 증가 폭이 줄었다.",
      "desk": "copper"
     },
     "sources": [
      {
       "id": 1,
       "title": "Ivanhoe Mines reports 76,401 tonnes of copper produced by Kamoa-Kakula in Q3 2026 (production results)",
       "publisher": "Ivanhoe Mines",
       "date": "2026-10-08",
       "url": "https://www.ivanhoemines.com/wp-content/uploads/20261008-Q3-2026-Production-Results-VF-1.pdf"
      },
      {
       "id": 2,
       "title": "Ivanhoe Mines Issues 2026 Third-Quarter Financial Results, Overview of Operations and Exploration Activities",
       "publisher": "Ivanhoe Mines",
       "date": "2026-11-03",
       "url": "https://www.ivanhoemines.com/news-stories/news-release/ivanhoe-mines-issues-2026-third-quarter-financial-results-overview-of-operations-and-exploration-activities/"
      },
      {
       "id": 3,
       "title": "Earnings call transcript: Ivanhoe Mines misses Q3 2026 estimates as stock falls",
       "publisher": "Investing.com",
       "date": "2026-11-04",
       "url": "https://www.investing.com/news/transcripts/earnings-call-transcript-ivanhoe-mines-misses-q3-2026-estimates-as-stock-falls-93CH-5000779"
      },
      {
       "id": 4,
       "title": "Ivanhoe Q3 2026 slides: record revenues offset by cost pressures",
       "publisher": "Investing.com",
       "date": "2026-11-04",
       "url": "https://www.investing.com/news/company-news/ivanhoe-q3-2026-slides-record-revenues-offset-by-cost-pressures-93CH-5000830"
      },
      {
       "id": 5,
       "title": "Ivanhoe records profitable third quarter, boosted by record revenue at Kamoa-Kakula",
       "publisher": "Mining Weekly",
       "date": "2026-11-05",
       "url": "https://www.miningweekly.com/article/ivanhoe-records-profitable-third-quarter-boosted-by-record-revenue-at-kamoa-kakula-2026-11-05"
      }
     ]
    },
    {
     "name_kr": "프리즈미안",
     "name_en": "Prysmian S.p.A.",
     "ticker": "PRY",
     "yahoo": "PRY.MI",
     "exchange": "Euronext Milan",
     "country": "이탈리아",
     "cik": null,
     "role_kr": "구리·알루미늄을 원료로 송전(해저·지중)·전력망·건설·데이터센터용 케이블을 생산하는 전선 제조사다.",
     "period": "2026년 3분기(1~9월)",
     "period_end": "2026-09-30",
     "report_date": "2026-10-29",
     "status": "reported",
     "highlights": [
      {
       "text": "송전 부문이 성장을 주도했다. 3분기 그룹 유기적 성장률은 13.1%, 조정 EBITDA는 8.51억 유로로 전년 동기(6.44억 유로) 대비 32.1% 늘어 분기 최대를 기록했고, 송전 부문은 유기적 성장률 23.1%, 마진 20.0%(전년 동기 17.8%)를 냈다.",
       "src": [
        1
       ]
      },
      {
       "text": "금속가격 상승분이 매출에 전가되고 있다. 1~9월 매출은 176.56억 유로(전년 동기 146.84억 유로), 유기적 성장률은 9.2%, 조정 EBITDA는 21.82억 유로(전년 동기 17.76억 유로)이며, 조정 EBITDA 마진은 현재 금속가격 기준 12.4%로 표준 금속가격 기준(15.5%)보다 3.1%p 낮다.",
       "src": [
        1
       ]
      },
      {
       "text": "수주잔고는 약 165억 유로이고 아직 반영하지 않은 약 20억 유로 규모 프로젝트가 별도로 있으나, 바타이니 CEO는 신규 수주 부족으로 송전 수주잔고가 전분기보다 소폭 줄었다고 밝혔다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "바타이니 CEO는 미국 데이터센터 수요가 통상의 11~12월 비수기를 상쇄해 4분기 설치·건설(I&C) 부문을 지지할 것이라고 밝혔고, 북미 I&C EBITDA 마진은 과거 20%에서 27%로 높아졌으며 미국 비중은 그룹 실적의 50%를 넘는다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "3분기 아트코어 마진은 14.5%로 연초 이후 누적 수준과 같았고, 회사는 2026년 가이던스 상향 근거로 아트코어 기여를 들었다.",
       "src": [
        1,
        3
       ]
      }
     ],
     "metrics": [
      {
       "label": "유기적 성장률",
       "value": "13.1",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "조정 EBITDA",
       "value": "851",
       "unit": "백만 유로",
       "period": "2026년 3분기",
       "change": "전년 대비 +32.1%",
       "src": 1
      },
      {
       "label": "송전 부문 유기적 성장률",
       "value": "23.1",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "송전 부문 마진",
       "value": "20.0",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "전년 동기 17.8%",
       "src": 1
      },
      {
       "label": "매출",
       "value": "17,656",
       "unit": "백만 유로",
       "period": "2026년 1~9월",
       "change": "전년 동기 14,684백만 유로",
       "src": 1
      },
      {
       "label": "유기적 성장률",
       "value": "9.2",
       "unit": "%",
       "period": "2026년 1~9월",
       "change": "",
       "src": 1
      },
      {
       "label": "조정 EBITDA",
       "value": "2,182",
       "unit": "백만 유로",
       "period": "2026년 1~9월",
       "change": "전년 동기 1,776백만 유로",
       "src": 1
      },
      {
       "label": "조정 EBITDA 마진(현재 금속가격)",
       "value": "12.4",
       "unit": "%",
       "period": "2026년 1~9월",
       "change": "",
       "src": 1
      },
      {
       "label": "조정 EBITDA 마진(표준 금속가격)",
       "value": "15.5",
       "unit": "%",
       "period": "2026년 1~9월",
       "change": "",
       "src": 1
      },
      {
       "label": "수주잔고",
       "value": "약 16.5",
       "unit": "십억 유로",
       "period": "2026-10-29",
       "change": "미반영 프로젝트 약 2십억 유로 별도",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "2026년 조정 EBITDA 가이던스를 30.75억~31.25억 유로(기존 28억~29억 유로)로 다시 높였다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "회사는 2028년 재무 목표를 2년 앞당겨 초과 달성할 것으로 전망했다.",
       "src": [
        2
       ]
      }
     ],
     "read_through": {
      "text": "미국 데이터센터·송전망 수요로 3분기 송전 유기적 성장 23.1%, 북미 I&C 마진 27%가 확인돼 구리 전선 수요는 견조하나, 신규 송전 수주 부족으로 수주잔고가 소폭 줄어 2027년 이후 해저·지중 케이블용 구리 수요의 증가 속도는 둔화될 수 있다.",
      "desk": "copper"
     },
     "sources": [
      {
       "id": 1,
       "title": "Price-sensitive press release: Q3'26 & 9M26 results, October 29, 2026",
       "publisher": "Prysmian",
       "date": "2026-10-29",
       "url": "https://www.prysmian.com/sites/www.prysmian.com/files/media/documents/PR_Q326_ENGLISH.pdf"
      },
      {
       "id": 2,
       "title": "Prysmian to Exceed 2028 Financial Targets Two Years Early, Raises 2026 Guidance Again After its Best Quarter to Date",
       "publisher": "Prysmian (North America)",
       "date": "2026-10-29",
       "url": "https://na.prysmian.com/resources/press-releases/prysmian-to-exceed-2028-financial-targets-two-years-early-raises-2026-guidance-again-after-its-best-quarter-to-date"
      },
      {
       "id": 3,
       "title": "Earnings call transcript: Prysmian Q3 2026 profit jumps as stock rises 4.2%",
       "publisher": "Investing.com",
       "date": "2026-10-29",
       "url": "https://www.investing.com/news/transcripts/earnings-call-transcript-prysmian-q3-2026-profit-jumps-as-stock-rises-42-93CH-4982532"
      },
      {
       "id": 4,
       "title": "Prysmian (BIT:PRY) Q3 2026 Earnings Call Transcript & Audio",
       "publisher": "StockAnalysis",
       "date": "2026-10-29",
       "url": "https://stockanalysis.com/quote/bit/PRY/transcripts/659713-q3-2026/"
      }
     ]
    }
   ]
  },
  {
   "id": "food_ag",
   "title": "곡물 유통·가공·비료",
   "position": "곡물 유통·가공·비료 업체는 천연가스·황·암모니아를 비료로 바꾸는 투입재 단계와 곡물·유지작물의 집하·압착·수출 단계를 맡는다.",
   "summary": [
    "북미 대두 압착 업황은 미국 바이오연료 정책에 힘입어 3분기에 크게 개선됐다. ADM 압착 영업이익은 3.11억 달러로 전년 0.13억 달러에서 급증했고 ADM은 2026년 45Z 순효과 전망을 약 2.5억 달러에서 약 3.5억 달러로 올렸다. Bunge 대두 가공·정제 EBIT도 5.47억 달러(전년 3.37억 달러)로 늘었다 (ADM 1, ADM 3, BG 2).",
    "ADM은 2026년 조정 EPS 가이던스를 5.50~5.80달러로 세 번째 상향했지만 우크라이나 재고 선적 차질로 Ag Services 영업이익이 1.72억 달러로 9% 줄었다. Bunge는 조정 EPS 2.56달러(전년 2.27달러)에 연간 전망 9.25~9.75달러를 유지했다 (ADM 1, ADM 4, BG 1).",
    "중동 분쟁이 세계 질소 공급을 줄이고 있다. CF는 2월 말 이후 세계 요소 공급이 약 9백만 톤 줄고 페르시아만을 빠져나온 중동 요소 수출이 평균의 절반에 그쳤다고 밝혔으며, MMBtu당 2.88달러의 가스 원가 위에서 암모니아 판매가를 톤당 532달러(전년 418달러)로 올렸다 (CF 3, CF 5, CF 7).",
    "유럽 질소 생산은 가스 비용 부담으로 축소되고 있다. Yara는 특별항목 제외 EBITDA가 6.75억 달러로 16% 줄고 3분기에 암모니아 15만 톤을 감산했으며 4분기 유럽 가스 비용이 전년보다 약 4.5억 달러 늘 것으로 추정했다. CF는 유럽 암모니아 생산능력의 35% 이상이 감산 상태라고 밝혔다 (YAR 1, YAR 7, CF 6).",
    "인산은 황 가격이 공급을 제약하고 있다. Mosaic은 황 롱톤당 715달러·암모니아 톤당 619달러 원가 속에 인산 판매량을 1.4백만 톤(전년 1.6백만 톤)으로 줄였고 조정 EBITDA는 3.24억 달러(전년 8.06억 달러)로 감소했다. Nutrien 인산 조정 EBITDA도 0.08억 달러(-93%)로 급감했다 (MOS 4, NTR 4, NTR 5).",
    "칼륨은 상대적으로 견조하다. Nutrien은 칼륨 판매 가이던스를 14.3~14.8백만 톤으로 올리고 2027년 세계 출하를 75~79백만 톤으로 제시했으며, Mosaic MOP 판매가는 톤당 276달러(전년 271달러)였다 (NTR 1, MOS 5)."
   ],
   "open_items": [
    "보도자료·통화 내용은 본문 발췌로 확인했고, 회사 IR과 SEC 공시 원문은 직접 확인하지 못했다. ADM·Bunge·Mosaic·CF의 연결 재무는 SEC XBRL(data.sec.gov)로 대조했다.",
    "Mosaic: 4분기 황 계약가(톤당 615달러, 콜 요약)와 실현 원가 가이던스(톤당 800~850달러)의 기준 차이, 황 가이던스 단위(롱톤/메트릭톤), 인산 전환 현금원가 비교치(131달러)의 비교 기간, 인산 부문 조정 EBITDA, Fertilizantes 손익을 확인하지 못했다. 10-Q는 중동 분쟁을 언급하지만 호르무즈 해협을 직접 거론했는지는 확인하지 못했다.",
    "CF Industries: 암모니아 부문 매출총이익이 출처별로 다르고(Zacks 조정 2.53억 달러, 10-Q 요약 1.94억 달러) 시장 예상 EPS도 2.84~3.00달러로 갈려 싣지 않았다. 품목별 판매가·물량은 Zacks 집계 기준이며, 사업중단 보험금이 발생한 설비와 45Q 세액공제 규모는 확인하지 못했다.",
    "Yara: 3분기 TTF 평균이 출처별로 다르고(MMBtu당 18.1달러 대 16.3달러) 약 27만 톤 감산의 기준(현재 연환산 여부)이 불명확하다. 암모니아 FOB 아라비아만 톤당 307달러와 유럽 요소 529달러는 단일 요약에만 있어 싣지 않았고, 러시아산 비료·EU 관세·CBAM 영향과 Gulf Coast Ammonia 인수 금액·완료 시점은 확인하지 못했다. 가스 비용 가이던스(4분기 4.5억 달러, 2027년 1분기 4.45억 달러)는 4분기분이 '전년 대비 증가분(물량 중립)'으로 확인돼 같은 기준으로 적었으나, 한 요약은 절대 금액처럼 서술했다.",
    "Nutrien: 질소·인산 부문의 전년 동기 조정 EBITDA는 확인하지 못했다(보도자료 발췌 표의 값 5.56억·1.22억 달러가 전년치로 보이나 확인하지 못했고, 인산 -93%만 별도 출처로 확인했다). 질소 판매량·판매가, 천연가스 원가(달러/MMBtu), 자본지출, 중국·인도 칼륨 계약, 호르무즈 관련 발언도 확인하지 못했다.",
    "Bunge: 중국 대두 구매, 45Z 효과, 2027년 전망, 곡물 유통·제분 EBIT와 유통 물량을 확인하지 못했다. 대두 가공 물량 -3.2%와 조정 EBIT +18.2%는 Tridge 요약 수치다.",
    "ADM: 압착 물량 절대치(백만 톤), 4분기 45Z 효과 금액, 브라질 바이오디젤 혼합 정책의 구체 내용, 우크라이나 재고 재평가 금액, 지분법 Wilmar 이익을 확인하지 못했다. 총 부문 영업이익 '약 14억 달러'는 보도자료 표기이며 부문 합산치는 13.82억 달러다.",
    "흑해·제재: 흑해 비료 수출, 대러 제재, 관세에 관한 경영진 발언은 Mosaic 10-Q의 러시아·우크라이나 원자재 시설 공격 언급과 ADM의 우크라이나 선적 차질 외에는 확인하지 못했다.",
    "통화 전사·요약 페이지의 날짜는 게시일을 확인하지 못해 실적 통화일 기준이다. Tridge·Agriland 기사는 날짜를 적지 않았다. Zacks(CF) 기사 날짜 2026-11-06은 상대 날짜 표기(하루 전) 기준이다."
   ],
   "companies": [
    {
     "name_kr": "아처대니얼스미들랜드",
     "name_en": "Archer-Daniels-Midland Company",
     "ticker": "ADM",
     "yahoo": "ADM",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 7084,
     "role_kr": "곡물 집하·수출(Ag Services), 대두 등 유지작물 압착(Crushing), 정제유·바이오디젤(Refined Products), 옥수수 가공(탄수화물 솔루션)을 운영하는 곡물 메이저다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-03",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 조정 EPS는 1.77달러로 시장 예상치 1.57달러(애널리스트 추정)를 웃돌았고, 매출은 223.4억 달러로 예상치 231.0억 달러(애널리스트 추정)에 못 미쳤다.",
       "src": [
        1,
        4,
        6
       ]
      },
      {
       "text": "이익 개선은 압착이 주도했다. 총 부문 영업이익은 약 14억 달러로 전년 8.45억 달러 대비 64% 늘었고, 압착(Crushing) 영업이익은 3.11억 달러로 전년 0.13억 달러에서 급증했다.",
       "src": [
        1,
        2,
        5
       ]
      },
      {
       "text": "농산물·유지작물(AS&O) 부문 영업이익은 7.78억 달러로 전년 대비 105% 늘었고, 정제제품·기타는 2.18억 달러로 82% 증가했으며, 순 평가·타이밍 효과는 약 +0.35억 달러였다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "우크라이나 선적 차질이 곡물 집하·수출 이익을 낮췄다. Ag Services 영업이익은 1.72억 달러로 전년 1.90억 달러보다 9% 줄었고, 경영진은 우크라이나에서 선적하지 못한 재고를 재평가했으며 미국 옥수수·대두 수출 증가와 북미·남미 사업 호조가 감소분을 일부 상쇄했다고 설명했다.",
       "src": [
        1,
        3,
        4
       ]
      },
      {
       "text": "글로벌 압착 물량은 전년 대비 1.6% 늘었고 남미 대두 압착 물량은 분기 최대치를 기록했으나, 남미 압착 마진은 브라질 바이오연료 정책 변경 지연으로 약했다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "경영진은 3월 확정된 RVO(재생연료 의무량)에 따른 미국 내 바이오연료 수요를 마진 호조의 배경으로 들었고, 2026년 45Z 세액공제 순효과 전망을 약 2.5억 달러에서 약 3.5억 달러로 높였다. 4분기 효과는 소폭 줄어들 것으로 예상했다.",
       "src": [
        3,
        5
       ]
      },
      {
       "text": "옥수수 가공(탄수화물 솔루션) 영업이익은 4.70억 달러로 40% 늘었고, 영양(Nutrition)은 1.34억 달러로 3% 증가했다.",
       "src": [
        1,
        2
       ]
      },
      {
       "text": "GAAP 지배주주 순이익은 8.21억 달러(희석 EPS 1.70달러)로 전년 1.08억 달러(0.22달러)에서 늘었고, 3분기에 자사주 440만 주를 매입(1~3분기 매입 지출 3.58억 달러)했으며 주당 0.52달러를 배당했다.",
       "src": [
        6
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "22,335",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +9.6%",
       "src": 6
      },
      {
       "label": "조정 EPS",
       "value": "1.77",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "희석 EPS(GAAP)",
       "value": "1.70",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "전년 0.22달러",
       "src": 6
      },
      {
       "label": "지배주주 순이익",
       "value": "821",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 108백만 달러",
       "src": 6
      },
      {
       "label": "총 부문 영업이익",
       "value": "1.4",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 845백만 달러",
       "src": 1
      },
      {
       "label": "AS&O 부문 영업이익",
       "value": "778",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +105%",
       "src": 1
      },
      {
       "label": "Ag Services 영업이익",
       "value": "172",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 190백만 달러(-9%)",
       "src": 1
      },
      {
       "label": "압착(Crushing) 영업이익",
       "value": "311",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 13백만 달러",
       "src": 1
      },
      {
       "label": "정제제품·기타 영업이익",
       "value": "218",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +82%",
       "src": 1
      },
      {
       "label": "탄수화물 솔루션 영업이익",
       "value": "470",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +40%",
       "src": 1
      },
      {
       "label": "Nutrition 영업이익",
       "value": "134",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +3%",
       "src": 1
      },
      {
       "label": "글로벌 압착 물량 증감률",
       "value": "+1.6",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "전년 대비",
       "src": 1
      },
      {
       "label": "45Z 순효과(회사 전망)",
       "value": "약 350",
       "unit": "백만 달러",
       "period": "2026년",
       "change": "기존 전망 약 250백만 달러",
       "src": 3
      },
      {
       "label": "자본지출",
       "value": "773",
       "unit": "백만 달러",
       "period": "2026년 1~3분기",
       "change": "전년 동기 892백만 달러",
       "src": 6
      },
      {
       "label": "자사주 매입",
       "value": "358",
       "unit": "백만 달러",
       "period": "2026년 1~3분기",
       "change": "전년 동기 0",
       "src": 6
      },
      {
       "label": "주당 배당금",
       "value": "0.52",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "전년 0.51달러",
       "src": 6
      }
     ],
     "guidance": [
      {
       "text": "2026년 조정 EPS 가이던스를 5.15~5.60달러에서 5.50~5.80달러로 올해 세 번째 상향했고, 경영진 설명 기준 4분기 내재 조정 EPS는 1.17~1.47달러(전년 동기 대비 +35~70%)다.",
       "src": [
        1,
        3,
        5
       ]
      },
      {
       "text": "Luciano CEO는 압착 마진이 3분기에 고점을 지났을 수 있으나 급락은 없다고 보고 4분기와 2027년에도 강한 마진을 예상했으며, 업계 생산량이 아직 RVO 의무량을 채우지 못한다고 판단했다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "4분기 Ag Services는 북미 계절성으로 3분기보다 높아질 것으로 전망했고, 대두는 중국으로, 옥수수는 유럽·멕시코로 수출될 것으로 봤다. 유럽 옥수수 생산은 다시 매우 적다고 평가했다. 가이던스는 중국의 북미산 대두 구매 지속을 전제로 한다.",
       "src": [
        3,
        4,
        5
       ]
      },
      {
       "text": "4분기에는 향료·에탄올의 계절적 비수기와 3분기 보험 충당금 환입의 소멸이 반영된다고 밝혔다.",
       "src": [
        3,
        5
       ]
      },
      {
       "text": "2026년 자본지출 가이던스를 13~15억 달러에서 12~13억 달러로 낮췄고, 미국 내 압착·에탄올 설비 디보틀넥킹 등 고수익 프로젝트에 집중한다.",
       "src": [
        3,
        5
       ]
      },
      {
       "text": "2027년은 2026년과 비슷한 시장 구조를 가정하되, 이자비용 증가와 일회성 이익의 미반복을 변수로 제시했다.",
       "src": [
        3,
        5
       ]
      }
     ],
     "read_through": {
      "text": "미국 대두유의 바이오연료 수요가 북미 압착 가동을 끌어올리고 있다. 압착 영업이익은 3.11억 달러(전년 0.13억 달러)였고 2026년 45Z 순효과 전망은 3.5억 달러다. 우크라이나에서는 선적하지 못한 재고를 재평가했고 남미 압착 마진은 브라질 정책 지연으로 약했다.",
      "desk": "food"
     },
     "sources": [
      {
       "id": 1,
       "title": "ADM Reports Third Quarter 2026 Results",
       "publisher": "ADM",
       "date": "2026-11-03",
       "url": "https://www.adm.com/en-us/news/news-releases/2026/11/adm-reports-third-quarter-2026-results/"
      },
      {
       "id": 2,
       "title": "Form 8-K Exhibit 99.1: ADM Reports Third Quarter 2026 Results",
       "publisher": "SEC EDGAR",
       "date": "2026-11-03",
       "url": "https://www.sec.gov/Archives/edgar/data/0000007084/000000708426000054/adm-ex991_20260930xq3.htm"
      },
      {
       "id": 3,
       "title": "ADM (ADM) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-11-03",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/11/03/adm-adm-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 4,
       "title": "Earnings call transcript: ADM beats Q3 2026 profit forecast, shares fall 5.5%",
       "publisher": "Investing.com",
       "date": "2026-11-03",
       "url": "https://www.investing.com/news/transcripts/earnings-call-transcript-adm-beats-q3-2026-profit-forecast-shares-fall-55-93CH-4995682"
      },
      {
       "id": 5,
       "title": "Archer-Daniels-Midland Co (ADM) (Q3 2026) Earnings Call Highlights: Third EPS Guidance Raise and 64% Segment Profit Surge",
       "publisher": "GuruFocus",
       "date": "2026-11-03",
       "url": "https://www.gurufocus.com/news/9167209/archerdanielsmidland-co-adm-q3-2026-earnings-call-highlights-third-eps-guidance-raise-and-64-segment-profit-surge"
      },
      {
       "id": 6,
       "title": "Archer-Daniels-Midland Co XBRL company facts (Form 10-Q, period ended 2026-09-30, filed 2026-11-03)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-03",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0000007084.json"
      }
     ]
    },
    {
     "name_kr": "번지 글로벌",
     "name_en": "Bunge Global SA",
     "ticker": "BG",
     "yahoo": "BG",
     "exchange": "NYSE",
     "country": "스위스",
     "cik": 1996862,
     "role_kr": "대두·연질유지종자 가공·정제, 열대유·특수원료, 곡물 유통·제분 4개 부문을 운영하는 유지작물 가공·곡물 유통 업체다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-29",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 조정 EPS는 2.56달러로 전년 2.27달러보다 13% 늘었고, 계속사업 희석 EPS(GAAP)는 1.64달러로 전년 0.86달러의 1.9배였다.",
       "src": [
        1,
        2,
        4
       ]
      },
      {
       "text": "부문 EBIT는 8.39억 달러로 전년 6.71억 달러보다 25% 늘었고, 조정 부문 EBIT는 9.97억 달러(전년 9.24억 달러)였다.",
       "src": [
        2,
        5
       ]
      },
      {
       "text": "압착이 이익을 이끌었다. 대두 가공·정제 부문 EBIT는 5.47억 달러로 전년 3.37억 달러에서 늘었고(조정 5.65억 달러), 북미·아르헨티나·브라질 가공 개선이 남미 비료·정제 부진과 아시아 가공 약세를 상쇄했다.",
       "src": [
        2,
        5,
        6
       ]
      },
      {
       "text": "대두 가공 물량은 남미·아시아에서 줄고 유럽에서 늘었으며 미국은 전년과 비슷했다. Tridge 요약 기준 대두 가공·정제 조정 EBIT는 18.2% 늘었으나 가공 물량은 3.2% 줄었다.",
       "src": [
        5,
        6,
        7
       ]
      },
      {
       "text": "연질유지종자 가공·정제 조정 EBIT는 3.29억 달러로 마진 개선과 전 지역 가공 물량 증가가 기여했고, 곡물 유통·제분에서는 곡물 유통이 개선된 반면 대두유 유통은 전년보다 부진했다.",
       "src": [
        5,
        6
       ]
      },
      {
       "text": "매출은 238.04억 달러(전년 대비 +7.4%), 매출총이익은 13.32억 달러(+25%), 지배주주 순이익은 3.18억 달러(+92%)였다.",
       "src": [
        4
       ]
      },
      {
       "text": "Heckman CEO는 대두유 가격이 2026년 초 RVO 불확실성 속에 원유와 동행하다 연중반부터 에너지 가격과 분리됐다고 설명했고, 공장들이 RVO 수요를 맞추려 최대 가동 중이어서 대두유 수급이 계속 빠듯할 것으로 봤다.",
       "src": [
        5,
        6
       ]
      },
      {
       "text": "3분기 순이자비용은 1.88억 달러로 전년보다 늘었고 3분기 말 조정 레버리지는 1.9배였으며, 분기 종료(9월 30일) 직후 Chevron과의 합작사 Bunge Chevron Ag Renewables가 루이지애나주 Destrehan 신규 유지작물 가공 라인 생산을 시작했다.",
       "src": [
        1,
        3,
        4
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "23,804",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +7.4%",
       "src": 4
      },
      {
       "label": "매출총이익",
       "value": "1,332",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +25.3%",
       "src": 4
      },
      {
       "label": "지배주주 순이익",
       "value": "318",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 166백만 달러",
       "src": 4
      },
      {
       "label": "희석 EPS(계속사업, GAAP)",
       "value": "1.64",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "전년 0.86달러",
       "src": 4
      },
      {
       "label": "조정 EPS",
       "value": "2.56",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "전년 2.27달러",
       "src": 1
      },
      {
       "label": "총 EBIT",
       "value": "667",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 403백만 달러",
       "src": 8
      },
      {
       "label": "부문 EBIT",
       "value": "839",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 671백만 달러",
       "src": 2
      },
      {
       "label": "조정 부문 EBIT",
       "value": "997",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 924백만 달러",
       "src": 5
      },
      {
       "label": "대두 가공·정제 부문 EBIT",
       "value": "547",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 337백만 달러",
       "src": 2
      },
      {
       "label": "대두 가공·정제 조정 EBIT",
       "value": "565",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "연질유지종자 가공·정제 조정 EBIT",
       "value": "329",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "조정 레버리지",
       "value": "1.9",
       "unit": "배",
       "period": "2026년 3분기 말",
       "change": "",
       "src": 3
      },
      {
       "label": "순이자비용",
       "value": "188",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 증가",
       "src": 3
      },
      {
       "label": "자본지출",
       "value": "384",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 469백만 달러",
       "src": 4
      },
      {
       "label": "자사주 매입",
       "value": "249",
       "unit": "백만 달러",
       "period": "2026년 1~3분기",
       "change": "전년 동기 545백만 달러",
       "src": 4
      },
      {
       "label": "주당 배당금(지급)",
       "value": "0.72",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "전년 0.70달러",
       "src": 4
      }
     ],
     "guidance": [
      {
       "text": "2026년 조정 EPS 전망 9.25~9.75달러를 유지했다.",
       "src": [
        1,
        2,
        7
       ]
      },
      {
       "text": "2026년 부문별 전망은 대두 가공·정제를 기존 전망보다 소폭 낮추고 연질유지종자는 유지했으며, 열대유·특수원료는 낮추고 곡물 유통·제분은 높였다.",
       "src": [
        1,
        5
       ]
      },
      {
       "text": "Heckman CEO는 3분기 콜에서 아르헨티나·브라질 압착 환경이 양호하다고 평가했고, 압착 마진은 원유 가격 변동보다 업계 고유의 수급이 좌우한다고 설명했다.",
       "src": [
        5,
        6
       ]
      }
     ],
     "read_through": {
      "text": "미국 대두유 수급은 RVO 수요로 빠듯하다. Bunge는 공장들이 RVO 수요에 맞춰 최대 가동 중이라고 밝혔고 대두 가공·정제 부문 EBIT가 5.47억 달러(전년 3.37억 달러)로 늘었다. Destrehan 신규 라인 가동은 미국 내 유지작물 가공 능력과 재생연료 원료용 식물성 기름 공급을 늘린다.",
      "desk": "food"
     },
     "sources": [
      {
       "id": 1,
       "title": "Bunge Reports Third Quarter 2026 Results",
       "publisher": "Bunge",
       "date": "2026-10-29",
       "url": "https://www.bunge.com/press-releases/bunge-reports-third-quarter-2026-results"
      },
      {
       "id": 2,
       "title": "Form 8-K Exhibit 99.1: Bunge Reports Third Quarter 2026 Results",
       "publisher": "SEC EDGAR",
       "date": "2026-10-29",
       "url": "https://www.sec.gov/Archives/edgar/data/0001996862/000162828026068051/epr09302026.htm"
      },
      {
       "id": 3,
       "title": "Bunge Global Q3 2026 Earnings Call Transcript",
       "publisher": "Benzinga",
       "date": "2026-10-29",
       "url": "https://www.benzinga.com/news/26/10/62694979/bunge-global-q3-2026-earnings-call-transcript"
      },
      {
       "id": 4,
       "title": "Bunge Global SA XBRL company facts (Form 10-Q, period ended 2026-09-30, filed 2026-10-29)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-10-29",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001996862.json"
      },
      {
       "id": 5,
       "title": "Bunge (BG) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-10-29",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/10/29/bunge-bg-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 6,
       "title": "Earnings call transcript: Bunge beats Q3 2026 estimates as shares edge lower",
       "publisher": "Investing.com",
       "date": "2026-10-29",
       "url": "https://www.investing.com/news/transcripts/earnings-call-transcript-bunge-beats-q3-2026-estimates-as-shares-edge-lower-93CH-4983850"
      },
      {
       "id": 7,
       "title": "Bunge Reports Strong Q3 2026 Gains in Soybean and Oilseed Processing Amid Integration Progress",
       "publisher": "Tridge",
       "date": "",
       "url": "https://insights.tridge.com/speaker-product-news-reports/KJLyFXpzJzgKuB1Gqsm5QUKHGgR43AVdqLW83EdJwD3iGLhwyWspVPyP"
      },
      {
       "id": 8,
       "title": "Bunge Global SA Form 10-Q for the quarter ended 2026-09-30",
       "publisher": "SEC EDGAR",
       "date": "2026-10-29",
       "url": "https://www.sec.gov/Archives/edgar/data/0001996862/000162828026068130/bg-20260930.htm"
      }
     ]
    },
    {
     "name_kr": "뉴트리엔",
     "name_en": "Nutrien Ltd.",
     "ticker": "NTR",
     "yahoo": "NTR",
     "exchange": "NYSE·TSX",
     "country": "캐나다",
     "cik": null,
     "role_kr": "칼륨·질소·인산 비료를 생산하고 농자재 소매 유통을 겸하는 캐나다 비료 업체다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-04",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 순이익은 2.9억 달러(희석 EPS 0.60달러), 조정 EBITDA는 13.1억 달러(전년 대비 -8%), 조정 EPS는 0.61달러였고, 회사는 이익이 전년보다 줄어든 주된 원인으로 인산·질소 부문 이익 감소를 제시했다.",
       "src": [
        1,
        2,
        5
       ]
      },
      {
       "text": "칼륨이 이익을 지탱했다. 칼륨 부문 조정 EBITDA는 7.3억 달러로 전사 조정 EBITDA의 56%를 차지했고, 주요 시장의 견조한 수요와 양호한 구매 여력(affordability)으로 판매량이 기록적 수준으로 늘었다.",
       "src": [
        1,
        3,
        7
       ]
      },
      {
       "text": "칼륨 통제가능 현금 생산원가(controllable cash cost of product manufactured)는 톤당 67달러로 전년 56달러보다 20% 높아졌다.",
       "src": [
        1
       ]
      },
      {
       "text": "질소 부문 조정 EBITDA는 4.97억 달러였고, 계획 정비와 생산 차질로 질소 판매량이 줄었다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "인산은 황 원가 상승으로 매출총이익이 마이너스로 돌아서 조정 EBITDA가 0.08억 달러(전년 대비 -93%)로 급감했고, 회사는 Aurora 사업장을 유지·최적화하는 한편 White Springs 인산 사업장을 2027년 2분기까지 폐쇄한다.",
       "src": [
        4,
        5,
        6
       ]
      },
      {
       "text": "소매(Retail) 조정 EBITDA는 2.03억 달러로 작물 영양제 매출총이익 축소와 브라질 기상 영향을 받았고, 2026년 Retail EBITDA 가이던스도 낮아졌다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "2026년 칼륨 판매량 가이던스를 상향했고, 세계 칼륨 출하량 전망은 2026년분을 유지하고 2027년분을 제시했다.",
       "src": [
        1
       ]
      },
      {
       "text": "1~3분기 자사주 매입은 전년 동기보다 36% 늘었고, 배당과 자사주 매입을 합쳐 13억 달러를 주주에게 환원했다.",
       "src": [
        6,
        7
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "6,064",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +1%",
       "src": 5
      },
      {
       "label": "순이익",
       "value": "0.29",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 감소",
       "src": 1
      },
      {
       "label": "희석 EPS",
       "value": "0.60",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "조정 EBITDA",
       "value": "1.31",
       "unit": "십억 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 -8%",
       "src": 5
      },
      {
       "label": "조정 EPS",
       "value": "0.61",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "",
       "src": 1
      },
      {
       "label": "칼륨 부문 조정 EBITDA",
       "value": "730",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      },
      {
       "label": "질소 부문 조정 EBITDA",
       "value": "497",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "인산 부문 조정 EBITDA",
       "value": "8",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 -93%",
       "src": 5
      },
      {
       "label": "Retail 조정 EBITDA",
       "value": "203",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "칼륨 통제가능 현금 생산원가",
       "value": "67",
       "unit": "달러/톤",
       "period": "2026년 3분기",
       "change": "전년 56달러/톤",
       "src": 1
      },
      {
       "label": "칼륨 판매량(회사 가이던스)",
       "value": "14.3~14.8",
       "unit": "백만 톤",
       "period": "2026년",
       "change": "상향",
       "src": 1
      },
      {
       "label": "Retail 조정 EBITDA(회사 가이던스)",
       "value": "1.72~1.85",
       "unit": "십억 달러",
       "period": "2026년",
       "change": "하향",
       "src": 1
      },
      {
       "label": "세계 칼륨 출하량(회사 전망)",
       "value": "74~77",
       "unit": "백만 톤",
       "period": "2026년",
       "change": "유지",
       "src": 1
      },
      {
       "label": "세계 칼륨 출하량(회사 전망)",
       "value": "75~79",
       "unit": "백만 톤",
       "period": "2027년",
       "change": "",
       "src": 1
      },
      {
       "label": "주주환원(배당+자사주)",
       "value": "1.3",
       "unit": "십억 달러",
       "period": "2026년 1~3분기",
       "change": "자사주 매입 전년 동기 대비 +36%",
       "src": 7
      }
     ],
     "guidance": [
      {
       "text": "2026년 칼륨 판매량 가이던스를 14.3~14.8백만 톤으로 높였고, Retail 조정 EBITDA 가이던스는 17.2~18.5억 달러로 낮췄다.",
       "src": [
        1,
        4
       ]
      },
      {
       "text": "세계 칼륨 출하량은 2026년 74~77백만 톤(유지), 2027년 75~79백만 톤으로 전망했다.",
       "src": [
        1
       ]
      },
      {
       "text": "질소 수급은 교역 흐름 차질, 생산 차질, 높은 에너지 가격으로 2027년까지 빠듯할 것으로 전망했다.",
       "src": [
        6,
        7
       ]
      },
      {
       "text": "칼륨 생산능력은 15~16백만 톤이며, 채굴 장비·벨트 설비 투자로 19백만 톤까지 늘리는 경로를 제시했다.",
       "src": [
        6
       ]
      },
      {
       "text": "White Springs 사업장은 2027년 2분기에 가동을 멈추며, 회사는 이를 통해 조정 EBITDA와 잉여현금흐름이 개선될 것으로 본다.",
       "src": [
        1,
        6
       ]
      }
     ],
     "read_through": {
      "text": "칼륨은 견조하고 인산은 황 원가 부담으로 조정 EBITDA가 0.08억 달러(-93%)로 줄었다. 칼륨 판매 가이던스는 14.3~14.8백만 톤으로 올라갔고 2027년 세계 출하 전망은 75~79백만 톤이다. White Springs 폐쇄(2027년 2분기)는 북미 인산 공급을 줄인다.",
      "desk": "food"
     },
     "sources": [
      {
       "id": 1,
       "title": "Nutrien Reports Third Quarter 2026 Results",
       "publisher": "Nutrien",
       "date": "2026-11-04",
       "url": "https://www.nutrien.com/news/press-releases/nutrien-reports-third-quarter-2026-results-1761"
      },
      {
       "id": 2,
       "title": "Form 6-K Exhibit 99.1: Nutrien Reports Third Quarter 2026 Results",
       "publisher": "SEC EDGAR",
       "date": "2026-11-04",
       "url": "https://www.sec.gov/Archives/edgar/data/0001725964/000119312526447554/d139721dex991.htm"
      },
      {
       "id": 3,
       "title": "Nutrien Q3 2026 Earnings Call Transcript",
       "publisher": "Benzinga",
       "date": "2026-11-05",
       "url": "https://www.benzinga.com/news/26/11/62932705/nutrien-q3-2026-earnings-call-transcript"
      },
      {
       "id": 4,
       "title": "Nutrien (NTR) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-11-05",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/11/05/nutrien-ntr-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 5,
       "title": "Nutrien Reports Q3 2026 Profit Decline Amid Challenges in Nitrogen and Phosphate Segments",
       "publisher": "Tridge",
       "date": "",
       "url": "https://insights.tridge.com/speaker-product-news-reports/KJLyFXpzJzgKuB1Gqsm5QUKHGgR43AVdqLULZExCA7wJcRLuBUWyCTMu"
      },
      {
       "id": 6,
       "title": "Nutrien Ltd. Q3 2026 Earnings Call Summary",
       "publisher": "Yahoo Finance",
       "date": "2026-11-05",
       "url": "https://finance.yahoo.com/markets/stocks/articles/nutrien-ltd-q3-2026-earnings-133000000.html"
      },
      {
       "id": 7,
       "title": "Nutrien Ltd (NTR) (Q3 2026) Earnings Call Highlights: Record Potash Volumes, Raised Guidance and Accelerated Buybacks",
       "publisher": "GuruFocus",
       "date": "2026-11-05",
       "url": "https://www.gurufocus.com/news/9182943/nutrien-ltd-ntr-q3-2026-earnings-call-highlights-record-potash-volumes-raised-guidance-and-accelerated-buybacks"
      }
     ]
    },
    {
     "name_kr": "모자이크",
     "name_en": "The Mosaic Company",
     "ticker": "MOS",
     "yahoo": "MOS",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1285785,
     "role_kr": "인산·칼륨 비료를 생산하고 브라질에서 비료 유통(Mosaic Fertilizantes)을 운영하는 비료 업체로, 인산 공정에 황·암모니아를 투입한다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-03",
     "status": "reported",
     "highlights": [
      {
       "text": "3분기 조정 EBITDA는 3.24억 달러로 전년 8.06억 달러보다 60% 줄었고, 회사는 전 부문 판매량 감소와 인산·브라질(Fertilizantes) 원료비 상승을 원인으로, 인산 가격 상승을 일부 상쇄 요인으로 제시했다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "인산 판매량은 감당 가능한 가격의 황 확보가 제한돼 감산하면서 1.4백만 톤(전년 1.6백만 톤)으로 줄었고, 인산 부문은 1.94억 달러 영업손실을 냈다.",
       "src": [
        4,
        7
       ]
      },
      {
       "text": "3분기 평균 원료비는 황 롱톤당 715달러, 암모니아 톤당 619달러였고, 10-Q는 황·암모니아 수급 경색의 원인으로 중동 분쟁 지속과 러시아·우크라이나 원자재 산업시설 공격을 들었다.",
       "src": [
        4,
        6
       ]
      },
      {
       "text": "DAP 평균 판매가는 FOB 공장 기준 톤당 838달러로 전년 714달러, 직전 분기 773달러보다 높았고, 인산 전환 현금원가는 고원가 루이지애나 생산 중단으로 톤당 117달러(비교 기간 131달러)로 낮아졌다.",
       "src": [
        5,
        7
       ]
      },
      {
       "text": "칼륨 판매량은 정기 보수와 Esterhazy 광산의 일시적 지질 문제로 2.1백만 톤(전년 2.3백만 톤)으로 줄었지만, MOP 판매가는 FOB 광산 기준 톤당 276달러(전년 271달러)였고 부문 조정 EBITDA 2.84억 달러, 영업이익 1.89억 달러를 기록했다.",
       "src": [
        3,
        5
       ]
      },
      {
       "text": "MOP 생산 현금원가는 톤당 73달러로 전년 71달러보다 높았으나 직전 분기 84달러보다 낮아졌다.",
       "src": [
        5
       ]
      },
      {
       "text": "브라질 Mosaic Fertilizantes 판매량은 현지 생산 감축과 고객 신용 제약으로 1.9백만 톤(전년 2.8백만 톤)으로 32% 줄었다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "연결 매출은 31.01억 달러(전년 대비 -10%), 매출총이익은 0.84억 달러(전년 5.52억 달러), 지배주주 순손실은 0.72억 달러(희석 EPS -0.23달러)였고, 3분기 설비투자는 2.82억 달러(전년 3.64억 달러)였다.",
       "src": [
        1
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "3,100.6",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 -10.2%",
       "src": 1
      },
      {
       "label": "매출총이익",
       "value": "84.1",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 552.3백만 달러(-84.8%)",
       "src": 1
      },
      {
       "label": "영업손익",
       "value": "-96.6",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 +339.8백만 달러",
       "src": 1
      },
      {
       "label": "지배주주 순손익",
       "value": "-72.1",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 +411.4백만 달러",
       "src": 1
      },
      {
       "label": "희석 EPS",
       "value": "-0.23",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "전년 1.29달러",
       "src": 1
      },
      {
       "label": "조정 EBITDA",
       "value": "324",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 806백만 달러",
       "src": 4
      },
      {
       "label": "인산 판매량",
       "value": "1.4",
       "unit": "백만 톤",
       "period": "2026년 3분기",
       "change": "전년 1.6백만 톤",
       "src": 4
      },
      {
       "label": "DAP 평균 판매가(FOB 공장)",
       "value": "838",
       "unit": "달러/톤",
       "period": "2026년 3분기",
       "change": "전년 714달러, 직전 분기 773달러",
       "src": 5
      },
      {
       "label": "황 원가",
       "value": "715",
       "unit": "달러/롱톤",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "암모니아 원가",
       "value": "619",
       "unit": "달러/톤",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "인산 부문 영업손익",
       "value": "-194",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "칼륨 판매량",
       "value": "2.1",
       "unit": "백만 톤",
       "period": "2026년 3분기",
       "change": "전년 2.3백만 톤",
       "src": 4
      },
      {
       "label": "MOP 평균 판매가(FOB 광산)",
       "value": "276",
       "unit": "달러/톤",
       "period": "2026년 3분기",
       "change": "전년 271달러, 직전 분기 275달러",
       "src": 5
      },
      {
       "label": "MOP 생산 현금원가",
       "value": "73",
       "unit": "달러/톤",
       "period": "2026년 3분기",
       "change": "전년 71달러, 직전 분기 84달러",
       "src": 5
      },
      {
       "label": "칼륨 부문 조정 EBITDA",
       "value": "284",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 5
      },
      {
       "label": "Fertilizantes 판매량",
       "value": "1.9",
       "unit": "백만 톤",
       "period": "2026년 3분기",
       "change": "전년 2.8백만 톤",
       "src": 4
      },
      {
       "label": "설비투자",
       "value": "281.5",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 364.4백만 달러",
       "src": 1
      },
      {
       "label": "영업현금흐름",
       "value": "556.0",
       "unit": "백만 달러",
       "period": "2026년 1~3분기",
       "change": "전년 동기 880.9백만 달러",
       "src": 1
      },
      {
       "label": "인산 판매량(가이던스)",
       "value": "1.3~1.6",
       "unit": "백만 톤",
       "period": "2026년 4분기(회사 가이던스)",
       "change": "",
       "src": 4
      },
      {
       "label": "DAP 가격(가이던스, FOB 공장)",
       "value": "820~840",
       "unit": "달러/톤",
       "period": "2026년 4분기(회사 가이던스)",
       "change": "",
       "src": 4
      },
      {
       "label": "칼륨 판매량(가이던스)",
       "value": "2.3~2.6",
       "unit": "백만 톤",
       "period": "2026년 4분기(회사 가이던스)",
       "change": "",
       "src": 4
      },
      {
       "label": "MOP 가격(가이던스, FOB 광산)",
       "value": "255~275",
       "unit": "달러/톤",
       "period": "2026년 4분기(회사 가이던스)",
       "change": "",
       "src": 4
      }
     ],
     "guidance": [
      {
       "text": "4분기 인산 판매량 1.3~1.6백만 톤, DAP 가격 톤당 820~840달러(FOB 공장), 칼륨 판매량 2.3~2.6백만 톤, MOP 가격 톤당 255~275달러(FOB 광산)를 제시했다.",
       "src": [
        3,
        4
       ]
      },
      {
       "text": "4분기 실현 황 원가는 톤당 800~850달러, 암모니아는 590~610달러로 예상했고, 이에 따른 인산 스트리핑 마진은 톤당 300달러대 중반으로 제시했다.",
       "src": [
        4,
        7,
        9
       ]
      },
      {
       "text": "콜 요약 기준 4분기 황 계약가는 톤당 615달러로 시장 평균 약 1,100달러를 크게 밑돌며, 미국 걸프 정유사 계약으로 2027년 생산 소요 황의 약 65~66%를 확보했다.",
       "src": [
        7,
        9
       ]
      },
      {
       "text": "2027년 설비투자는 10억 달러 미만을 목표로 하며, 감산 설비 재가동에는 마진의 지속적 개선과 현물 황 가격의 큰 폭 하락이 필요하다고 밝혔다.",
       "src": [
        7,
        8
       ]
      }
     ],
     "read_through": {
      "text": "인산 공급은 황 가격이 결정하고 있다. 황 롱톤당 715달러와 암모니아 톤당 619달러 원가 속에 Mosaic은 인산 판매량을 1.4백만 톤(전년 1.6백만 톤)으로 줄였고 DAP 판매가는 톤당 838달러(전년 714달러)로 올랐다. Mosaic이 감산 설비 재가동 조건으로 현물 황 가격 하락을 제시해 인산 공급 제약이 4분기에도 이어질 전망이다.",
      "desk": "food"
     },
     "sources": [
      {
       "id": 1,
       "title": "The Mosaic Company XBRL company facts (Form 10-Q, period ended 2026-09-30, filed 2026-11-04)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-04",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001285785.json"
      },
      {
       "id": 2,
       "title": "The Mosaic Company EDGAR filing index (Form 8-K, Item 2.02 Results of Operations, filed 2026-11-03)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-03",
       "url": "https://data.sec.gov/submissions/CIK0001285785.json"
      },
      {
       "id": 3,
       "title": "The Mosaic Company Reports Third Quarter 2026 Results",
       "publisher": "The Mosaic Company",
       "date": "2026-11-03",
       "url": "https://investors.mosaicco.com/press-releases/news-details/2026/The-Mosaic-Company-Reports-Third-Quarter-2026-Results/default.aspx"
      },
      {
       "id": 4,
       "title": "Form 8-K Exhibit 99.1: The Mosaic Company Reports Third Quarter 2026 Results",
       "publisher": "SEC EDGAR",
       "date": "2026-11-03",
       "url": "https://www.sec.gov/Archives/edgar/data/0001285785/000128578526000139/pressreleaseq32026-ex991.htm"
      },
      {
       "id": 5,
       "title": "Exhibit 99.1 Q3 2026 press release (PDF)",
       "publisher": "The Mosaic Company",
       "date": "2026-11-03",
       "url": "https://s1.q4cdn.com/823038994/files/content_files/Press-Release-Q3-2026-Exhibit-99-1-Final.pdf"
      },
      {
       "id": 6,
       "title": "The Mosaic Company Form 10-Q for the quarter ended 2026-09-30",
       "publisher": "SEC EDGAR",
       "date": "2026-11-04",
       "url": "https://www.sec.gov/Archives/edgar/data/0001285785/000128578526000147/mos-20260930.htm"
      },
      {
       "id": 7,
       "title": "Mosaic (MOS) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-11-04",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/11/04/mosaic-mos-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 8,
       "title": "Earnings call transcript: Mosaic posts Q3 2026 loss but shares jump on outlook",
       "publisher": "Investing.com",
       "date": "2026-11-04",
       "url": "https://www.investing.com/news/transcripts/earnings-call-transcript-mosaic-posts-q3-2026-loss-but-shares-jump-on-outlook-93CH-5000739"
      },
      {
       "id": 9,
       "title": "The Mosaic Co (MOS) (Q3 2026) Earnings Call Highlights: Sulfur Cost Advantage, Phosphate Trough, and Potash Strength",
       "publisher": "GuruFocus",
       "date": "2026-11-04",
       "url": "https://www.gurufocus.com/news/9171805/the-mosaic-co-mos-q3-2026-earnings-call-highlights-sulfur-cost-advantage-phosphate-trough-and-potash-strength"
      }
     ]
    },
    {
     "name_kr": "CF인더스트리즈",
     "name_en": "CF Industries Holdings, Inc.",
     "ticker": "CF",
     "yahoo": "CF",
     "exchange": "NYSE",
     "country": "미국",
     "cik": 1324404,
     "role_kr": "북미 천연가스를 원료로 암모니아·요소·UAN 등 질소 비료를 생산하는 업체다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-11-04",
     "status": "reported",
     "highlights": [
      {
       "text": "경영진은 2월 말 중동 분쟁 시작 이후 세계 요소 공급이 약 9백만 톤 줄었고 페르시아만을 빠져나온 중동 요소 수출이 평균의 절반 수준에 그쳤다고 밝혔다. 분쟁·호르무즈 해협 통항 차질·설비 복구 기간 때문에 역내 공급은 분쟁 전 수준을 밑돌 것으로 봤다.",
       "src": [
        3,
        4,
        6
       ]
      },
      {
       "text": "3분기 조정 EBITDA는 8.33억 달러(EBITDA 8.22억 달러), 지배주주 순이익은 4.36억 달러(희석 EPS 2.87달러)였고, 매출은 18.60억 달러로 전년 대비 12% 늘었다.",
       "src": [
        1,
        3
       ]
      },
      {
       "text": "총 판매량은 4,799천 톤으로 전년 대비 약 7%(Yazoo City 손실분 제외 시 약 13%) 늘었고, UAN 판매량은 1.99백만 톤(전년 1.56백만 톤)으로 2020년대 분기 최대치였다.",
       "src": [
        3,
        6,
        7
       ]
      },
      {
       "text": "품목별 가격은 엇갈렸다. 암모니아 평균 판매가는 톤당 532달러(전년 418달러)로 27% 올랐지만, 입상 요소는 423달러(전년 450달러), UAN은 322달러(전년 331달러)로 내렸다.",
       "src": [
        5,
        7
       ]
      },
      {
       "text": "원가는 안정적이었다. 파생상품 포함 천연가스 실현 원가는 MMBtu당 2.88달러로 전년 2.96달러보다 낮았고 톤당 매출원가는 약 238달러(전년 228달러)였다. 3분기 총 암모니아 생산은 약 2.4백만 톤(1~3분기 약 7.2백만 톤)이었다.",
       "src": [
        4,
        5
       ]
      },
      {
       "text": "Yazoo City 단지는 2025년 11월 AN 고도화 설비 사고 이후 가동이 멈춰 AN 판매량이 127천 톤(전년 384천 톤)으로 줄었고 생산 재개 시점은 2027년 상반기로 늦춰졌으며, 3분기에는 사업중단 보험금 이익 0.62억 달러도 인식했다.",
       "src": [
        1,
        5,
        7
       ]
      },
      {
       "text": "3분기 자사주 매입은 3.71억 달러(1~3분기 6.18억 달러)였고 분기 배당은 주당 0.60달러로 전년 0.50달러보다 20% 높였으며, 1~3분기 영업현금흐름은 25.44억 달러(전년 동기 대비 +15%)였다.",
       "src": [
        1
       ]
      },
      {
       "text": "Donaldsonville 탄소포집(CCS)은 정상 가동 중이고 Yazoo City CCS는 2028년 가동을 목표로 하며, Blue Point 1단계 저탄소 암모니아 프로젝트는 건설 중이다.",
       "src": [
        6,
        8
       ]
      }
     ],
     "metrics": [
      {
       "label": "매출",
       "value": "1,860",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +12.1%",
       "src": 1
      },
      {
       "label": "조정 EBITDA",
       "value": "833",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      },
      {
       "label": "EBITDA",
       "value": "822",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      },
      {
       "label": "지배주주 순이익",
       "value": "436",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 +23.5%",
       "src": 1
      },
      {
       "label": "희석 EPS",
       "value": "2.87",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "전년 2.19달러",
       "src": 1
      },
      {
       "label": "총 판매량",
       "value": "4,799",
       "unit": "천 톤",
       "period": "2026년 3분기",
       "change": "전년 대비 +6.5%(Zacks 집계)",
       "src": 7
      },
      {
       "label": "암모니아 평균 판매가",
       "value": "532",
       "unit": "달러/톤",
       "period": "2026년 3분기",
       "change": "전년 418달러",
       "src": 7
      },
      {
       "label": "암모니아 판매량",
       "value": "1.00",
       "unit": "백만 톤",
       "period": "2026년 3분기",
       "change": "전년 1.09백만 톤",
       "src": 7
      },
      {
       "label": "입상 요소 평균 판매가",
       "value": "423",
       "unit": "달러/톤",
       "period": "2026년 3분기",
       "change": "전년 450달러",
       "src": 7
      },
      {
       "label": "입상 요소 판매량",
       "value": "1.08",
       "unit": "백만 톤",
       "period": "2026년 3분기",
       "change": "전년 0.939백만 톤",
       "src": 7
      },
      {
       "label": "UAN 평균 판매가",
       "value": "322",
       "unit": "달러/톤",
       "period": "2026년 3분기",
       "change": "전년 331달러",
       "src": 7
      },
      {
       "label": "UAN 판매량",
       "value": "1.99",
       "unit": "백만 톤",
       "period": "2026년 3분기",
       "change": "전년 1.56백만 톤",
       "src": 7
      },
      {
       "label": "AN 판매량",
       "value": "127",
       "unit": "천 톤",
       "period": "2026년 3분기",
       "change": "전년 384천 톤",
       "src": 5
      },
      {
       "label": "천연가스 실현 원가(파생상품 포함)",
       "value": "2.88",
       "unit": "달러/MMBtu",
       "period": "2026년 3분기",
       "change": "전년 2.96달러",
       "src": 5
      },
      {
       "label": "톤당 매출원가",
       "value": "238",
       "unit": "달러/톤",
       "period": "2026년 3분기",
       "change": "전년 228달러",
       "src": 5
      },
      {
       "label": "총 암모니아 생산",
       "value": "2.4",
       "unit": "백만 톤",
       "period": "2026년 3분기",
       "change": "",
       "src": 4
      },
      {
       "label": "총 암모니아 생산(회사 가이던스)",
       "value": "9.5",
       "unit": "백만 톤",
       "period": "2026년",
       "change": "",
       "src": 5
      },
      {
       "label": "설비투자(회사 가이던스, 연결)",
       "value": "1.3",
       "unit": "십억 달러",
       "period": "2026년",
       "change": "CF 몫 약 0.95십억 달러",
       "src": 8
      },
      {
       "label": "사업중단 보험금 이익",
       "value": "62",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 0",
       "src": 1
      },
      {
       "label": "자사주 매입",
       "value": "371",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 369백만 달러",
       "src": 1
      },
      {
       "label": "주당 배당금(선언)",
       "value": "0.60",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "전년 0.50달러",
       "src": 1
      },
      {
       "label": "영업현금흐름",
       "value": "2,544",
       "unit": "백만 달러",
       "period": "2026년 1~3분기",
       "change": "전년 동기 2,213백만 달러",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "2026년 총 암모니아 생산 전망은 Yazoo City 정지를 반영해 약 9.5백만 톤을 유지했고, Yazoo City의 암모니아·AN·질산·UAN 생산 재개는 2027년 상반기로 제시했다.",
       "src": [
        3,
        5
       ]
      },
      {
       "text": "경영진은 휴전이 이뤄져도 해운과 설비 정상화에 4~6개월이 걸리고, 이연 수요 복귀와 낮은 세계 재고로 질소 수급이 2027년까지 빠듯할 것으로 봤으며, 중국산 공급이 공백을 일부 메웠다고 설명했다.",
       "src": [
        6,
        8,
        9
       ]
      },
      {
       "text": "높은 유럽 가스 가격 때문에 유럽 암모니아 생산능력의 35% 이상이 감산 상태라고 밝혔다.",
       "src": [
        6,
        9
       ]
      },
      {
       "text": "2026년 설비투자는 연결 기준 약 13억 달러(CF 몫 약 9.5억 달러)이며, Blue Point 1단계는 장납기 설비 발주를 마치고 2029년 가동을 목표로 한다.",
       "src": [
        6,
        8
       ]
      }
     ],
     "read_through": {
      "text": "중동발 요소 공급 손실과 낮은 미국 가스 원가가 북미 질소 생산자의 마진을 지지하고 있다. 가스 실현 원가는 MMBtu당 2.88달러(전년 2.96달러)로 낮아졌고 암모니아 판매가는 톤당 532달러(전년 418달러)로 올랐다. 경영진은 세계 요소 공급 손실을 약 9백만 톤으로 추정하고 질소 수급 경색이 2027년까지 이어질 것으로 본다.",
      "desk": "food"
     },
     "sources": [
      {
       "id": 1,
       "title": "CF Industries Holdings XBRL company facts (Form 10-Q, period ended 2026-09-30, filed 2026-11-05)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-05",
       "url": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001324404.json"
      },
      {
       "id": 2,
       "title": "CF Industries Holdings EDGAR filing index (Form 8-K, Item 2.02 Results of Operations, filed 2026-11-04)",
       "publisher": "SEC EDGAR (data.sec.gov)",
       "date": "2026-11-04",
       "url": "https://data.sec.gov/submissions/CIK0001324404.json"
      },
      {
       "id": 3,
       "title": "CF Industries Holdings, Inc. Reports First Nine Months 2026 Net Earnings of $1.78 Billion, Adjusted EBITDA of $3.01 Billion",
       "publisher": "Business Wire",
       "date": "2026-11-04",
       "url": "https://www.businesswire.com/news/home/20261104372347/en/CF-Industries-Holdings-Inc.-Reports-First-Nine-Months-2026-Net-Earnings-of-%241.78-Billion-Adjusted-EBITDA-of-%243.01-Billion"
      },
      {
       "id": 4,
       "title": "Form 8-K Exhibit 99.1: CF Industries third quarter 2026 earnings release",
       "publisher": "SEC EDGAR",
       "date": "2026-11-04",
       "url": "https://www.sec.gov/Archives/edgar/data/0001324404/000132440426000023/cf-11042026_ex991xearnings.htm"
      },
      {
       "id": 5,
       "title": "CF Industries Holdings Form 10-Q for the quarter ended 2026-09-30",
       "publisher": "SEC EDGAR",
       "date": "2026-11-05",
       "url": "https://www.sec.gov/Archives/edgar/data/0001324404/000132440426000025/cf-20260930.htm"
      },
      {
       "id": 6,
       "title": "CF Industries (CF) Q3 2026 Earnings Call Transcript",
       "publisher": "The Motley Fool",
       "date": "2026-11-05",
       "url": "https://www.fool.com/earnings/call-transcripts/2026/11/05/cf-industries-cf-q3-2026-earnings-call-transcript/"
      },
      {
       "id": 7,
       "title": "CF Q3 Earnings Miss Estimates as Higher Costs Offset Sales Gains (Zacks)",
       "publisher": "Yahoo Finance / Zacks",
       "date": "2026-11-06",
       "url": "https://finance.yahoo.com/markets/stocks/articles/cf-q3-earnings-miss-estimates-145100997.html"
      },
      {
       "id": 8,
       "title": "CF Industries Holdings Inc (CF) (Q3 2026) Earnings Call Highlights: Adjusted EBITDA Tops $3 ...",
       "publisher": "Investing.com (GuruFocus)",
       "date": "2026-11-05",
       "url": "https://ca.investing.com/news/company-news/cf-industries-holdings-inc-cf-q3-2026-earnings-call-highlights-adjusted-ebitda-tops-3--4939915"
      },
      {
       "id": 9,
       "title": "CF Industries Holdings, Inc. Q3 2026 Earnings Call Summary",
       "publisher": "Yahoo Finance",
       "date": "2026-11-05",
       "url": "https://finance.yahoo.com/markets/stocks/articles/cf-industries-holdings-inc-q3-133000713.html"
      }
     ]
    },
    {
     "name_kr": "야라 인터내셔널",
     "name_en": "Yara International ASA",
     "ticker": "YAR",
     "yahoo": "YAR.OL",
     "exchange": "Oslo Børs",
     "country": "노르웨이",
     "cik": null,
     "role_kr": "유럽 천연가스로 암모니아를 생산해 질산염·NPK 등 완제 비료로 판매하는 노르웨이 질소 비료 업체로, 유럽 가스 가격이 원가를 좌우한다.",
     "period": "2026년 3분기",
     "period_end": "2026-09-30",
     "report_date": "2026-10-22",
     "status": "reported",
     "highlights": [
      {
       "text": "유럽 가스 비용이 이익을 끌어내렸다. 3분기 특별항목 제외 EBITDA는 6.75억 달러로 전년 8.04억 달러보다 16% 줄었고 순이익은 1.99억 달러(전년 3.20억 달러)였으며, EBITDA는 시장 예상 약 7.52억 달러(애널리스트 추정)를 밑돌았다.",
       "src": [
        1,
        3,
        4
       ]
      },
      {
       "text": "유럽 암모니아 마진은 분기 말 마이너스로 돌아섰고, Yara는 3분기에 주로 이탈리아 Ferrara 공장에서 암모니아 15만 톤과 완제품 11.5만 톤을 감산했으며 현재 감산 규모는 약 27만 톤이다.",
       "src": [
        3,
        5,
        7
       ]
      },
      {
       "text": "3분기 총 출하량은 7,839천 톤으로 전년 8,173천 톤보다 4% 줄었고, 1~3분기 암모니아 생산은 4.7백만 톤(전년 5.1백만 톤)이었으며, 라틴아메리카 NPK 수요 부진과 핀란드 비계획 정지 등 설비 신뢰성 문제로 물량 효과가 약 -0.4억 달러였다.",
       "src": [
        1,
        3,
        7
       ]
      },
      {
       "text": "지역별 EBITDA는 유럽 0.73억 달러(전년 대비 -62%), 미주 1.55억 달러(-38%)로 줄었고, 클린 암모니아는 0.71억 달러로 늘었다.",
       "src": [
        3
       ]
      },
      {
       "text": "유럽 핵심 질소 출하는 전년 대비 4% 늘었지만 시장 전체는 5~10% 줄어든 것으로 추정했고, 2025/26 시즌 유럽 질소 공급은 약 10%, 북미는 약 5% 줄었으며 브라질 질소 수입은 연초 이후 22% 감소했다.",
       "src": [
        5,
        8
       ]
      },
      {
       "text": "Holsether CEO는 중동 불확실성으로 구매자가 신중해 시즌 출발이 느리다고 평가했고, 9월 아시아 요소 시장에서는 인도 수입 감소와 중국 수출 증가가 겹쳤다고 설명했다.",
       "src": [
        5,
        8
       ]
      },
      {
       "text": "입상 요소 가격(FOB 이집트)은 톤당 486달러로 3% 올랐고, 경영진은 북아프리카·유럽 요소 가격이 톤당 500달러 위로 확실히 돌아왔다고 밝혔다.",
       "src": [
        2,
        5
       ]
      },
      {
       "text": "완제품 포트폴리오의 약 80%는 TTF에 직접 노출되지 않으며, 2026년 7월 발표한 미국 텍사스 Gulf Coast Ammonia 인수(미완료)가 끝나면 암모니아 생산의 에너지 노출은 현재 TTF 연동 50%에서 Henry Hub 연동 38%를 포함한 구조로 바뀐다.",
       "src": [
        5,
        6,
        8
       ]
      }
     ],
     "metrics": [
      {
       "label": "특별항목 제외 EBITDA",
       "value": "675",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 804백만 달러(-16%)",
       "src": 3
      },
      {
       "label": "순이익",
       "value": "199",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 320백만 달러",
       "src": 3
      },
      {
       "label": "EPS(환율·특별항목 제외)",
       "value": "0.95",
       "unit": "달러/주",
       "period": "2026년 3분기",
       "change": "시장 예상 1.36달러(애널리스트 추정)",
       "src": 5
      },
      {
       "label": "ROIC",
       "value": "13.5",
       "unit": "%",
       "period": "2026년 3분기",
       "change": "",
       "src": 3
      },
      {
       "label": "총 출하량",
       "value": "7,839",
       "unit": "천 톤",
       "period": "2026년 3분기",
       "change": "전년 8,173천 톤",
       "src": 1
      },
      {
       "label": "암모니아 생산",
       "value": "4.7",
       "unit": "백만 톤",
       "period": "2026년 1~3분기",
       "change": "전년 동기 5.1백만 톤",
       "src": 7
      },
      {
       "label": "암모니아 감산",
       "value": "150",
       "unit": "천 톤",
       "period": "2026년 3분기",
       "change": "",
       "src": 7
      },
      {
       "label": "완제품 감산",
       "value": "115",
       "unit": "천 톤",
       "period": "2026년 3분기",
       "change": "",
       "src": 7
      },
      {
       "label": "유럽 EBITDA",
       "value": "73",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 -62%",
       "src": 3
      },
      {
       "label": "미주 EBITDA",
       "value": "155",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 -38%",
       "src": 3
      },
      {
       "label": "클린 암모니아 EBITDA",
       "value": "71",
       "unit": "백만 달러",
       "period": "2026년 3분기",
       "change": "전년 대비 증가",
       "src": 3
      },
      {
       "label": "입상 요소 가격(FOB 이집트)",
       "value": "486",
       "unit": "달러/톤",
       "period": "2026년 3분기",
       "change": "+3%",
       "src": 2
      },
      {
       "label": "유럽 가스 비용 증감(회사 추정, 물량 중립)",
       "value": "+450",
       "unit": "백만 달러",
       "period": "2026년 4분기",
       "change": "전년 동기 대비",
       "src": 1
      },
      {
       "label": "유럽 가스 비용 증감(회사 추정)",
       "value": "+445",
       "unit": "백만 달러",
       "period": "2027년 1분기",
       "change": "전년 동기 대비",
       "src": 1
      }
     ],
     "guidance": [
      {
       "text": "선도가격 기준 4분기 유럽 가스 비용은 물량 중립 기준 전년 동기보다 약 4.5억 달러, 2027년 1분기는 약 4.45억 달러 늘어날 것으로 추정했다.",
       "src": [
        1,
        3,
        6
       ]
      },
      {
       "text": "CFO는 유럽 암모니아 생산을 연간 최대 1백만 톤까지 감산할 수 있으며, TTF 대비 암모니아 스프레드가 마이너스인 동안 최대한 감산하겠다고 밝혔다.",
       "src": [
        5,
        6
       ]
      },
      {
       "text": "경영진은 구매 여력 개선으로 2027년 수요가 회복될 것으로 보고 중기 목표를 유지했으나, 요소 균형 가격 전망은 제시하지 않았다.",
       "src": [
        5,
        8
       ]
      }
     ],
     "read_through": {
      "text": "유럽 가스 가격이 유럽 질소 생산을 줄이고 있다. Yara는 3분기 암모니아 15만 톤을 감산했고 현재 감산 규모가 약 27만 톤이며 4분기 유럽 가스 비용이 전년보다 약 4.5억 달러 늘 것으로 추정해, 유럽 암모니아 자체 생산 축소와 수입 의존 확대가 이어질 전망이다.",
      "desk": "gas"
     },
     "sources": [
      {
       "id": 1,
       "title": "Yara 3Q 2026 Report",
       "publisher": "Yara International",
       "date": "2026-10-22",
       "url": "https://www.yara.com/siteassets/investors/057-reports-and-presentations/quarterly-reports/2026/3q-2026/yara-3q-2026-report.pdf"
      },
      {
       "id": 2,
       "title": "Yara 3Q 2026 Presentation",
       "publisher": "Yara International",
       "date": "2026-10-22",
       "url": "https://www.yara.com/siteassets/investors/057-reports-and-presentations/quarterly-reports/2026/3q-2026/yara-3q-2026-presentation.pdf"
      },
      {
       "id": 3,
       "title": "Yara International ASA (YARIY) (Q3 2026) Earnings Call Highlights: EBITDA Slips to $675 Million as Gas Costs Bite, but ROIC Jumps to 13.5%",
       "publisher": "GuruFocus",
       "date": "2026-10-22",
       "url": "https://www.gurufocus.com/news/9140978/yara-international-asa-yariy-q3-2026-earnings-call-highlights-ebitda-slips-to-675-million-as-gas-costs-bite-but-roic-jumps-to-135"
      },
      {
       "id": 4,
       "title": "Yara reports Q3 earnings miss as energy costs weigh on results",
       "publisher": "Investing.com",
       "date": "2026-10-22",
       "url": "https://www.investing.com/news/stock-market-news/yara-reports-q3-earnings-miss-as-energy-costs-weigh-on-results-93CH-4965094"
      },
      {
       "id": 5,
       "title": "Earnings call transcript: Yara misses Q3 2026 EPS forecast as gas costs bite",
       "publisher": "Investing.com",
       "date": "2026-10-22",
       "url": "https://in.investing.com/news/stock-market-news/earnings-call-transcript-yara-misses-q3-2026-eps-forecast-as-gas-costs-bite-93CH-5650908"
      },
      {
       "id": 6,
       "title": "YARA INTERNATIONAL (YAR.OL) Q3 FY2026 earnings call transcript",
       "publisher": "Yahoo Finance",
       "date": "2026-10-22",
       "url": "https://finance.yahoo.com/quote/YAR.OL/earnings/YAR.OL-Q3-2026-earnings_call-534082.html"
      },
      {
       "id": 7,
       "title": "Yara flags surging gas costs in Europe, lowers ammonia output",
       "publisher": "Chemical Week",
       "date": "2026-10-26",
       "url": "https://chemweek.mydigitalpublication.com/publication/?i=873026&article_id=5232695&view=articleBrowser"
      },
      {
       "id": 8,
       "title": "Higher gas prices and lower demand weigh on Yara Q3 margins",
       "publisher": "Agriland.ie",
       "date": "",
       "url": "https://www.agriland.ie/farming-news/higher-gas-prices-and-lower-demand-weigh-on-yara-q3-margins/"
      }
     ]
    }
   ]
  }
 ]
};
