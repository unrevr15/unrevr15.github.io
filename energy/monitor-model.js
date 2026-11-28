/* 에너지 체인 모니터 · 계산 모델 (순수 함수, DOM 없음)
 * buildMonitorModel({live, records, projects, recordsAsOf, chains}, {win, today, pages})
 * 모든 숫자는 실행 시 payload에서 계산한다. 값이 없으면 null → 화면은 '미수집'.
 */
(function (root) {
'use strict';

/* ---------- 설정 블록 (strict JSON) ---------- */
const MONITOR_RULE = {"window":{"presets":["1주","4주","13주","52주"],"default":"4주","monthly_months":{"1주":1,"4주":1,"13주":3,"52주":12}},"flat":{"sigma":0.5,"min_changes":20},"level":{"rank":"median","band":"minmax","ratio":100,"multiple":1},"aggregate":{"both":"혼재","with_flat":"majority","tie":"signal"},"fresh":{"D":[5,12],"W":[10,20],"M":[55,85]},"stale_months":6,"events_days":28,"comove_months":6,"big_multiple":3};

const WIN_DAYS = {'1주': 7, '4주': 28, '13주': 91, '52주': 364};
const TERM_OF = {brent_fut: 'brent', wti_fut: 'wti'};
const MONITOR_HOPE = null;

const PARTS = [
  {id: 'p1', label: 'Ⅰ 기대 경로', checks: ['c1', 'c2', 'c3', 'c4']},
  {id: 'p1c', label: 'Ⅰ 조건', checks: ['c5', 'c6']},
  {id: 'p2', label: 'Ⅱ 병목', checks: ['c7', 'c8', 'c9', 'c10']},
  {id: 'p3', label: 'Ⅲ 비용·물가', checks: ['c11', 'c12']},
  {id: 'p4', label: 'Ⅳ 전망', checks: ['c13']}
];
const CIRC = ['', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬'];

const CHECK_META = {
  c1: {name: '물동량', nodes: ['n-flow'], guide: ['g3-1', '#gulf-recovery'], dirRef: '회복률 ▲', lvlRef: '100 = 전년 같은 달'},
  c2: {name: '유가·곡선', nodes: ['n-crude', 'n-supply'], guide: ['g3-5', '#term-spreads'], dirRef: '▼', lvlRef: '월평균 순위 vs 중앙값'},
  c3: {name: '크랙', nodes: ['n-cracks'], guide: ['g4-2', '#oil-market'], dirRef: '▼', lvlRef: '같은 달 2022–25 범위'},
  c4: {name: '소매 연료', nodes: ['n-retail'], guide: ['g7-2', '#diesel-cost'], dirRef: '▼', lvlRef: '순위 · 마진 분포'},
  c5: {name: '재고', nodes: ['n-stocks'], guide: ['g3-2', '#supply-summary'], dirRef: '▲ 재축적', lvlRef: '같은 주 5년 범위'},
  c6: {name: '운임·위험', nodes: ['n-freight'], guide: ['g3-4', '#shipping'], dirRef: '▼', lvlRef: '1× = 전년 같은 주'},
  c7: {name: '정제', nodes: ['n-refining'], guide: ['g4-3', '#supply-runs'], dirRef: '여유 ▲', lvlRef: '5년 범위'},
  c8: {name: '중국', nodes: ['n-china'], guide: ['g4-5', '#diesel-exports-asia'], dirRef: '▲ / ▲', lvlRef: '100'},
  c9: {name: '가스·LNG', nodes: ['n-lng', 'n-gas', 'n-storage'], guide: ['g5-3', '#supply-gas'], dirRef: '▼', lvlRef: '순위 · 5년 범위'},
  c10: {name: '연관 원자재', nodes: ['n-materials', 'n-food', 'n-utility'], guide: ['g5-5', '#coal-trade'], dirRef: '▼', lvlRef: '순위'},
  c11: {name: '산업비용', nodes: ['n-costs'], guide: ['g8-1', '#industry-prices-section'], dirRef: '▼', lvlRef: '순위'},
  c12: {name: '소비자물가', nodes: ['n-cpi-energy', 'n-cpi-core', 'n-cpi'], guide: ['g7-1', '#cpi-items'], dirRef: '▼ 둔화', lvlRef: '3개월 연율 순위'},
  c13: {name: '2027 지표', nodes: [], guide: ['g3-5', '#brent-curve'], dirRef: '—', lvlRef: '—'}
};

/* §4 시스템 그래프 */
const MONITOR_GRAPH = {
  cols: ['물량', '수송·가공·완충', '도매 가격', '비용 전달', '물가'],
  nodes: [
    {id: 'n-flow', name: '걸프 수출', col: 1, row: 1, check: 'c1'},
    {id: 'n-supply', name: '비걸프 공급', col: 1, row: 2, check: 'c2'},
    {id: 'n-china', name: '중국 흡수', col: 1, row: 3, check: 'c8'},
    {id: 'n-lng', name: 'LNG 공급', col: 1, row: 4, check: 'c9'},
    {id: 'n-freight', name: '운임·위험', col: 2, row: 1, check: 'c6'},
    {id: 'n-refining', name: '정제 가동', col: 2, row: 2, check: 'c7'},
    {id: 'n-stocks', name: '석유 재고', col: 2, row: 3, check: 'c5'},
    {id: 'n-storage', name: '가스 저장', col: 2, row: 4, check: 'c9'},
    {id: 'n-crude', name: '원유 가격', col: 3, row: 1, check: 'c2'},
    {id: 'n-cracks', name: '제품 크랙', col: 3, row: 2, check: 'c3'},
    {id: 'n-gas', name: '가스 가격', col: 3, row: 3, check: 'c9'},
    {id: 'n-materials', name: '석탄·구리·곡물', col: 3, row: 4, check: 'c10'},
    {id: 'n-retail', name: '소매 연료', col: 4, row: 1, check: 'c4'},
    {id: 'n-costs', name: '산업비용', col: 4, row: 2, check: 'c11'},
    {id: 'n-utility', name: '전력·가스 요금', col: 4, row: 3, check: 'c10'},
    {id: 'n-food', name: '식품', col: 4, row: 4, check: 'c10'},
    {id: 'n-cpi-energy', name: 'CPI 에너지', col: 5, row: 1, check: 'c12'},
    {id: 'n-cpi-core', name: '근원·서비스', col: 5, row: 2, check: 'c12'},
    {id: 'n-cpi', name: 'CPI 종합', col: 5, row: 3, check: 'c12'}
  ],
  edges: [
    {id: 'e1', from: 'n-flow', to: 'n-crude', label: '공급 회복', kind: '계산', hope: true},
    {id: 'e2', from: 'n-freight', to: 'n-crude', label: '도착원가', kind: '도식', hope: true},
    {id: 'e3', from: 'n-supply', to: 'n-crude', label: '비걸프 공급', kind: '표시'},
    {id: 'e4', from: 'n-crude', to: 'n-cracks', label: '원료비', kind: '계산', hope: true},
    {id: 'e5', from: 'n-refining', to: 'n-cracks', label: '처리 여력', kind: '표시'},
    {id: 'e6', from: 'n-stocks', to: 'n-cracks', label: '완충(제품)', kind: '표시'},
    {id: 'e7', from: 'n-stocks', to: 'n-crude', label: '완충(원유)', kind: '표시'},
    {id: 'e8', from: 'n-china', to: 'n-cracks', label: '제품 수출', kind: '표시'},
    {id: 'e9', from: 'n-cracks', to: 'n-retail', label: '도매→소매', kind: '표시', hope: true},
    {id: 'e10', from: 'n-retail', to: 'n-cpi-energy', label: '휘발유', kind: '표시', hope: true},
    {id: 'e11', from: 'n-cpi-energy', to: 'n-cpi', label: '에너지 기여', kind: '도식', hope: true, after: 'P1'},
    {id: 'e12', from: 'n-lng', to: 'n-gas', label: 'LNG 공급', kind: '도식'},
    {id: 'e13', from: 'n-storage', to: 'n-gas', label: '겨울 완충', kind: '표시'},
    {id: 'e14', from: 'n-gas', to: 'n-utility', label: '발전 연료', kind: '도식', after: 'P1'},
    {id: 'e15', from: 'n-gas', to: 'n-materials', label: '비료 원료', kind: '도식'},
    {id: 'e16', from: 'n-materials', to: 'n-food', label: '곡물→식품', kind: '표시'},
    {id: 'e17', from: 'n-cracks', to: 'n-costs', label: '경유→운송비', kind: '도식', after: 'P1'},
    {id: 'e18', from: 'n-costs', to: 'n-cpi-core', label: '서비스 전가', kind: '도식', after: 'P1'},
    {id: 'e19', from: 'n-food', to: 'n-cpi', label: '식품', kind: '계산'},
    {id: 'e20', from: 'n-utility', to: 'n-cpi', label: '전기·가스 요금', kind: '도식', after: 'P1'}
  ]
};

/* 미수집 경로 상태: 수집 전 · DB 있음 · 유료 · 원천 없음 · 미보고 · 승인 필요 호스트 · 비공개 · 키 없음
 * 미보고 항목은 JODI 감시 목록(U.jodi.watch)이나 data 의 마지막 달이 U.jodi.latest 에서 stale_months 안이면 대장에서 빠진다(jodiOn) */
const TTF_JKM_ROUTE = 'Yahoo는 TTF 앞 3개 월물만 · JKM 월물 없음 · CME 호스트 미허용';
const MONITOR_MISSING = {
  c1: [['UAE·이라크·카타르·오만 수출', '미보고', 'JODI 비보고국 (마지막 보고 UAE·카타르 2018-12, 오만 2016-02, 이라크 2024-03) · 보고하면 자동 표시'], ['이란 수출', '원천 없음', ''], ['항만별 선적', '수집 전', 'services9.arcgis.com · 비공개'], ['걸프 주간 물동량', '유료', ''], ['사우디 LPG 수출', '미보고', 'JODI · LPG·NGL 수출 · 보고하면 자동 표시']],
  c2: [['2027년 12월물 브렌트·WTI', '수집 전', 'Yahoo 월물 심볼 (P6)'], ['Dated·아시아 현물 프리미엄', '유료', ''], ['배럴당 운임·보험', '유료', ''], ['비OPEC BR·GY·AR 생산', '수집 전', 'STEO 표 3b'], ['OPEC 잉여 생산능력', '수집 전', 'STEO 표 3d · 이미 받는 통합문서'], ['국가별 잉여 생산능력', '원천 없음', 'STEO는 OPEC 합계·중동·그 밖만']],
  c3: [['싱가포르 경유·ARA 크랙', '유료', ''], ['RB·HO 월물 구분', '수집 전', 'Yahoo 월물 (P0)'], ['지역별 정제마진', '유료', '']],
  c4: [['항공유 소매', '원천 없음', ''], ['가정용 난방유 소매', '수집 전', 'www.eia.gov (P7)'], ['1994년 이후 순위', '수집 전', 'FRED GASDESW·GASREGW 장기 (P7)'], ['CPI 자동차연료·연료유', 'DB 있음', 'CUSR0000SETB · CUSR0000SEHE01 (P1)']],
  c5: [['세계·OECD 관측 재고', '수집 전', 'STEO 표 3a · 이미 받는 통합문서'], ['쿠싱·지역 원유 재고', '수집 전', 'EIA 주간 W_EPC0_SAX_YCUOK_MBBL·WCESTP21·WCESTP31'], ['탱크 작업 저장능력', '수집 전', 'EIA 저장능력 보고서 · www.eia.gov'],
    ['2024년 3월 뒤 탱크 저장능력', '원천 없음', 'EIA 보고서 중단 (2024-05 최종판)'], ['제품 탱크 충전률', '원천 없음', '주간 재고(배관 포함)와 능력표(정유·터미널) 범위가 다름'], ['해상 부유 저장', '유료', ''],
    ['ARA·싱가포르 제품 재고', '원천 없음', ''], ['중국 원유 비축', '미보고', 'JODI 중국 재고 없음 · 수지가 잔차 없이 맞춰짐 · 보고하면 자동 표시'], ['SPR 판매·교환 일정', '승인 필요 호스트', 'energy.gov · 해설 #stock-programs'],
    ['IEA 공동 방출 집행 계열', '승인 필요 호스트', 'www.iea.org · 해설 #oil-buffers'], ['국가별 수요 5년 범위', '수집 전', 'JODI_BANDED에 TOTDEMO · 새 요청 없음'],
    ['사우디 원유 직접 연소(여름 발전)', '수집 전', 'JODI DIRECUSE · JODI_FLOWS 추가'], ['EU 가스 저장', '키 없음', 'AGSI · 추가 안 함']],
  c6: [['노선별 운임 TD3C·TD20·TC1·TC2', '유료', ''], ['수에즈 통과', '수집 전', 'services9.arcgis.com · 비공개'], ['전쟁보험료 계열', '유료', ''], ['피격 건수 계열', '원천 없음', '대장만']],
  c7: [['러시아 처리량', '미보고', 'JODI 비보고국 · 보고하면 자동 표시'], ['2027–28 증설 능력 수치', '원천 없음', ''], ['세계 처리량', '원천 없음', '해설'], ['휘발유·프로판 주간 수출', '수집 전', 'www.eia.gov']],
  c8: [['해관 월간 제품 수출', '승인 필요 호스트', ''], ['수출 쿼터', '원천 없음', '조사 기록 링크']],
  c9: [['미국 LNG 수출', '수집 전', 'www.eia.gov N9133US2 (P4)'], ['카타르 LNG 수출', '승인 필요 호스트', 'api.publisher.jodidata.org (JODI-Gas 파일 목록) 또는 JODI 계정 (REST API)'], ['TTF 달러 환산', 'DB 있음', 'DEXUSEU (P1)'], ['TTF·JKM 원월물', '원천 없음', TTF_JKM_ROUTE], ['난방도일', '수집 전', 'STEO 표 9c (월간) · 이미 받는 통합문서'], ['주간 난방도일', '승인 필요 호스트', 'NOAA CPC']],
  c10: [['전력 도매가·스파크 스프레드', '원천 없음', ''], ['CPI 전기·도시가스', 'DB 있음', 'CUSR0000SEHF01·02 (P1)'], ['비료 가격', '승인 필요 호스트', ''], ['TC/RC', '유료', ''], ['LME 재고', '유료', '']],
  c11: [['PPI 서비스·운송·유통마진', 'DB 있음', 'WPSFD42·422·423 (P1)'], ['PPI 기여표', 'DB 있음', 'PPIFIS 기여표 → live-data.js (P1)'], ['트럭 운임 PPI', '수집 전', 'PCU484121484121 · fredgraph.csv (Cass와 한 요청) (P5)'], ['화물 물동량·지출 (Cass)', '수집 전', 'fredgraph.csv (P5)'], ['트럭 주가', '수집 전', 'ODFL·SAIA·XPO·JBHT·KNX·WERN (P5)'], ['트럭 파산', '원천 없음', '']],
  c12: [['CPI 에너지·전기·도시가스·운송서비스', 'DB 있음', 'CPIENGSL·SEHF01·SEHF02·SAS4 (P1)'], ['CPI 기여표', 'DB 있음', 'CPIAUCSL 기여표 → live-data.js (P1)'], ['클리블랜드 연준 나우캐스트', 'DB 있음', 'CLEV_NOW_CPI_YOY (P1)'], ['CPI 휘발유 원지수', 'DB 있음', 'CUUR0000SETB01 (P1)'], ['PCE', 'DB 있음', 'PCEPI']],
  c13: [['브렌트·WTI 2027년물 곡선', '수집 전', 'Yahoo 월물 (P6)'], ['TTF·JKM 원월물', '원천 없음', TTF_JKM_ROUTE], ['증설 능력 수치', '원천 없음', 'P.size 텍스트']]
};

/* §3 문장 템플릿: 데이터 값 없음. {x} 자리표시, {a|b:key} 선택. */
const SAY = {
  c1: {
    lvl: '{m} 사우디·쿠웨이트 원유 수출은 전년 같은 달의 {rc}%, 제품·LPG 수출은 {rp}%(품목 {n}/{N})다.',
    mix: '원유 회복률이 제품보다 {d}%p {높다|낮다:c}.',
    dir: '원유 회복률은 {m3}보다 {dd}%p {올랐다|내렸다|변하지 않았다:s}.',
    priv: '{label} 유조선 통과는 최근 7일 평균 하루 {x}척으로 전년 같은 분기 평균의 {r}%다({date}, 선박 신호 기준 하한).',
    ports: '{d}까지 7일 평균 걸프 내 {n}개 항만의 유조선 수출 추정은 하루 {x}천 톤으로 전년 같은 분기 평균의 {r}%이고, 우회 항만 {n2}곳은 {r2}%다(선박 신호 기준 추정).'
  },
  c2: {
    dir: '브렌트 근월물({c})은 {w} 동안 {dv}달러({p}%) {올랐다|내렸다|변하지 않았다:s}({d}).',
    str: '근월−차월 차는 {sp}달러로 {w} 전보다 {ds}달러 {넓어졌다|좁아졌다|변하지 않았다:s2}. 같은 날({d2}) 현물은 근월물보다 {b}달러 {높다|낮다:c}.',
    lvl: '브렌트 현물 월평균은 {from} 이후 {N}개월 가운데 {k}번째로 높다({m}). {pm}({n}일) 평균은 {N2}개 가운데 {k2}번째다.',
    bw: '브렌트−WTI 현물 차(주평균)는 {y}달러로 {w} 전 {y0}달러에서 {넓어졌다|좁아졌다|변하지 않았다:s}({d}). 근월물 차는 {x}달러다({d2}).',
    fault: '{key} 마지막 값({d})은 {tag}로 표시돼 있으나 T 행과 맞추면 {act}이다. 근월물로 읽지 않는다.',
    grade: '{m} 브렌트(IMF)는 두바이보다 {g}달러 {높다|낮다:c}.',
    spare: '{m} OPEC 잉여 원유 생산능력은 하루 {x}백만 배럴로 전년 같은 달 {y}백만 배럴에서 {늘었다|줄었다:c}(STEO {ed}판 추정).',
    use: '{m} 세계 석유 소비는 하루 {v}백만 배럴로 전년 같은 달의 {r}% 수준이다. 중국은 {c}%, 미국은 {u}%, OECD 유럽은 {e}% 수준이다(STEO {ed}판 추정).',
    back: '{c} 브렌트는 {w} 동안 {dv}달러 {올랐다|내렸다|변하지 않았다:s}({d}). 같은 날 근월물({c1})보다 {sp}달러 {낮다|높다:k}.',
    nonopec: '{m} 브라질·가이아나·아르헨티나 석유 생산 합계는 하루 {x}백만 배럴로 전년 같은 달보다 {d}백만 배럴 {늘었다|줄었다|변하지 않았다:s}(STEO {ed}판 추정).'
  },
  c3: {
    dec: '{w} 동안 뉴욕항 3-2-1 현물 크랙(브렌트 기준, 주평균)은 {dv}달러 {올랐다|내렸다|변하지 않았다:s}({d0}→{d1}). 휘발유 몫 {g}달러, 초저유황 경유 몫 {u}달러다.',
    leg: '같은 창 WTI 기준 3-2-1은 {dv}달러 {올랐다|내렸다|변하지 않았다:s}. 브렌트−WTI 현물 차가 {b0}달러에서 {b1}달러로 바뀌어 원유 기준에 따라 크랙 방향이 {같다|다르다:c}.',
    roll: '선물 3-2-1(NYMEX)은 {w} 창 안에 RB·HO 만기 교체가 있어 방향 판정에서 뺐다.',
    fut: '선물 3-2-1(NYMEX)은 {w} 동안 {dv}달러 {올랐다|내렸다|변하지 않았다:s}(같은 월물).',
    lvl: '{m} 뉴욕항 3-2-1 현물 크랙은 {by}–{ey}년 같은 달 범위 {p3}, 초저유황 경유 크랙은 범위 {pu}.',
    prem: '경유−휘발유 크랙 차(선물)는 {x}달러로 전년 같은 날의 {k}배다({d}).'
  },
  c4: {
    dec: '{w} 동안 휘발유 소매는 {dv}달러 {올랐다|내렸다|변하지 않았다:s}({d0}→{d1}). 도매(USGC 주평균) 몫 {wv}달러, 소매 마진 몫 {k}달러다.',
    decM: '{m} 휘발유 소매 월평균은 {m0}보다 {dv}달러 {올랐다|내렸다|변하지 않았다:s}. 도매 몫 {wv}달러, 소매 마진 몫 {k}달러다.',
    sea: '휘발유 소매 전월비 {p}%는 {by}–{ey}년 같은 달 범위({lo}~{hi}%) {pos}.',
    rank: '경유 소매 월평균은 {from} 이후 {N}개월 가운데 {k}번째로 높다({m}). {pm}({n}회) 평균은 {N2}개 가운데 {k2}번째다.',
    marg: '경유 소매 마진은 {by}–{ey}년 분포의 {q}번째 백분위다.',
    jump: '{w} 창에서 {a}는 평소 변화폭의 {x}배, {b}는 {y}배 움직였다{tag}.',
    cpi: '{m} CPI 자동차 연료는 전월보다 {x}% {올랐고|내렸고|변하지 않았고:s}, 연료유는 {y}% {올랐다|내렸다|변하지 않았다:t}.',
    rank94: '{m} 경유 소매 월평균은 {from} 이후 {N}개월 가운데 명목 {k}번째, 물가 조정 {kr}번째로 높다. 휘발유는 {g}번째·{gr}번째다.'
  },
  c5: {
    sum: '{d} 주 미국 재고 {N}종 가운데 {a}종이 같은 주 {by}–{ey}년 범위 아래, {c}종이 범위 위다. 범위 아래: {names}.',
    cov: '중간유분 공급일수는 {x}일로 같은 주 범위 하단({lo}일)보다 {dd}일 {많다|적다:c}.',
    spr: '전략비축은 {x}백만 배럴로 같은 주 {by}–{ey}년 평균보다 {p}% {많다|적다:c}.',
    eu: 'EU {N}개국 가운데 {k}개국이 각국 최신 달({mfrom}~{mto}) 기준 {min}일 미만이다.',
    jp: '일본 비축은 {m} 기준 {t}일이며 민간 {pv}일은 민간 의무 {o}일({since}부터)보다 {많다|적다:c}.',
    dem: '{d} 주 미국 제품 수요(4주 평균) {N}종 가운데 {a}종이 같은 주 범위 아래, {c}종이 위다. 평년 계절이면 13주 뒤 수요가 느는 품목은 {up}, 주는 품목은 {dn}이다.',
    path: '평년 경로면 13주 뒤 중간유분 재고는 {e1}백만 배럴(범위 {p1}), 전년 경로면 {e2}백만 배럴(범위 {p2})이다. 확률이 아닌 조건부 계산이다.',
    room: '{d} 주 쿠싱 원유 재고 {x}백만 배럴은 작업 저장능력과 수송 중 재고 합({cap}백만 배럴, {cm} 기준)의 {p}%다.',
    sprY: '전략비축 {x}백만 배럴은 전년 같은 주의 {r}%, 작업 저장능력({cap}백만 배럴)의 {f}%다({d}).',
    world: '{m} EIA 추정 세계 재고 순인출은 하루 {x}백만 배럴이고 OECD 상업 재고는 {o}백만 배럴이다(STEO {ed}).',
    burn: '{m} 사우디 원유 직접 연소는 하루 {x}천 배럴로 같은 달 {by}–{ey}년 범위 {pos}. 전년 같은 달은 {y}천 배럴이다.'
  },
  c6: {
    dir: '탱커 운임선물 ETF 주평균은 {w} 동안 {p}% {올랐다|내렸다|변하지 않았다:s}({d0}→{d}).',
    anc: '일별 마지막 값({d2}) 기준으로는 {p2}%이며, 두 기준의 판정이 {같다|다르다:c}(변화/σ {z1} 대 {z2}).',
    lvl: '탱커 운임선물 ETF의 {d} 주 평균은 52주 고점보다 {x}% 낮고 전년 같은 주의 {n}배다.',
    eq: '원유선 3사 주가는 최근 한 달 평균 {a}% {올랐고|내렸고|변하지 않았고:s1}, 제품선은 {b}% {올랐다|내렸다|변하지 않았다:s2}.',
    led: '대장 기준 최근 {days}일 선박 피격·공격 기록은 {k}건이다(대장 확인 {asof}).',
    suez: '수에즈 운하 유조선 통과는 {d} 주 하루 {x}척으로 전년 같은 주의 {r}%다(선박 신호 기준, 방향 구분 없음).'
  },
  c7: {
    lvl: '{d} 주 미국 정제 여유능력은 하루 {x}천 배럴이고 가동률 {u}%는 같은 주 {by}–{ey}년 범위 {pos}.',
    led: '대장 기준 최근 {days}일 정제시설 차질 기록은 {k}건({sites})이다(대장 확인 {asof}).',
    jodi: 'JODI 정제 투입 {N}개국 가운데 {a}개국이 같은 달 범위 아래다({m}).'
  },
  c8: {
    lvl: '{m} 중국 원유 수입은 전년 같은 달의 {a}%, 정제 투입은 {b}%, 휘발유 수출은 {c}%다. 경유·등유 수출은 {m2} 이후 미보고다.'
  },
  c9: {
    st: '미국 가스 저장은 {d} 주 {x}bcf로 같은 주 {by}–{ey}년 평균보다 {p}% {많다|적다:c}.',
    cond: '평년 인출이면 3월 말 {e1}bcf(범위 {p1}), 지난겨울 인출이면 {e2}bcf(범위 {p2})다. 3월 말 같은 주 범위는 {lo}~{hi}bcf이며, 확률이 아닌 조건부 계산이다.',
    ep: '{m} 유럽 가스(IMF 월간)는 2022년 월간 최고의 {r}%다.',
    fut: 'TTF 선물({c})은 {w} 동안 {tp}, JKM({c2})은 {jp}.',
    futRoll: '{w} 창에는 TTF({c})·JKM({c2}) 근월물 모두 만기 교체가 있어 변화를 비교하지 않는다.',
    sp: 'JKM−헨리허브 차는 {s}달러/MMBtu다({d}, 주평균).',
    hdd: '{m} 미국 난방도일은 {x}이고 직전 {k}년 같은 달 평균({n})의 {r}%다(STEO {ed}).'
  },
  c10: {
    coal: '{m} 호주 석탄은 전년 같은 달보다 {a}% {높다|낮다:c}.',
    cu: '구리 선물은 최근 한 달 {b}% {올랐다|내렸다|변하지 않았다:s1}. 전년 같은 날과 비교하면 {c}% {높다|낮다:s2}({d}).',
    food: '{m} IMF 식품지수는 전년보다 {dd}% {높고|낮고:c}, 가정식 CPI는 3개월 연율 {e}%다({m2}).',
    util: '{m} CPI 전기는 3개월 연율 {a}%, 도시가스는 {b}%다.'
  },
  c11: {
    ppi: '{m} PPI 최종수요는 전년보다 {x}% {올랐다|내렸다|변하지 않았다:s}. 에너지 기여 {a}%p, 서비스 기여 {b}%p다({ri} 가중치).',
    alt: '산업비용 점검 입력(PPI 서비스·운송·유통마진, 기여표)은 저장소에 있으나 이 화면 자료에 아직 없다. 경유 소매 전년비는 {x}%다({m}).',
    notr: 'PPI 운송·창고는 이 화면 자료에 없다. 경유 소매 전년비는 {x}%다({m}).',
    trn: '{m} PPI 운송·창고 서비스는 전월보다 {x}% {올랐고|내렸고|변하지 않았고:s}, 3개월 연율 {a}%는 {from} 이후 {N}개월 가운데 {k}번째로 높다.',
    svc: '같은 달 PPI 최종수요 서비스는 3개월 연율 {a}%, 유통마진은 {b}%다({m}).',
    svc0: '{m} PPI 최종수요 서비스는 3개월 연율 {a}%, 유통마진은 {b}%다.',
    tl: '{m} 장거리 트럭(TL) 운송 PPI는 전년보다 {x}% {높다|낮다:c}(계절조정 전 지수).',
    cass: '{m} Cass 화물 물동량은 전년 같은 달 대비 {a}%, 운임 지출은 {b}%다. 건당 운임(지출÷물동량)은 {c}% {올랐다|내렸다|변하지 않았다:s}.',
    trk: '트럭 주가는 최근 한 달 LTL 세 회사 평균 {a}% {올랐고|내렸고|변하지 않았고:s1}, 트럭·인터모달 세 회사 평균 {b}% {올랐다|내렸다|변하지 않았다:s2}.'
  },
  c12: {
    cpi: '{m} CPI 종합은 전월보다 {x}% 올라 직전 3개월 평균보다 {dd}%p {높다|낮다:c}. 3개월 연율 {a}%는 {from} 이후 {N}개월 가운데 {k}번째로 높다.',
    core: '근원은 전월보다 {x}% {올랐고|내렸고|변하지 않았고:s}, 3개월 연율 {a}%는 {from} 이후 {N}개월 가운데 {k}번째로 높다.',
    part: '{pm}({n}회) 휘발유 소매 평균은 {m} 평균보다 {r}% {높다|낮다:c}.',
    part0: '{pm}({n}회) 휘발유 소매 평균은 {m} 평균과 같다.',
    gas: '{gm} CPI 휘발유는 전월보다 {gx}% {올랐다|내렸다:s}.',
    gas0: '{gm} CPI 휘발유는 전월과 같다.',
    gasN: '{gm} CPI 휘발유 계절조정 전 지수는 전월보다 {gx}% {올랐다|내렸다|변하지 않았다:s}.',
    cont: '{m}까지 3개월 CPI 변화 {x}% 가운데 에너지 기여 {a}%p, 식품 {b}%p, 근원 상품 {c}%p, 근원 서비스 {d}%p다({ri} 가중치).',
    clev: '클리블랜드 연준이 {d}에 낸 {tm} CPI 전년비 나우캐스트는 {x}%다.'
  },
  c13: {
    p: '{y1}–{y2}년 일정이 있는 계약·프로젝트 기록은 {k}건({kinds})이다. 원월물 곡선은 미수집이다.',
    p0: '{y1}–{y2}년 일정이 있는 계약·프로젝트 기록은 {k}건({kinds})이다.',
    curve: '{dt} 브렌트 {ca}은 {a}달러, {cb}은 {b}달러다. {cb}은 한 달 전보다 {d}달러 {올랐다|내렸다|변하지 않았다:s}.'
  },
  answer: {
    p1: '기대 경로 {path}의 판정은 방향 {dl}, 수준 {ll}로 나온다.',
    r2: '{list}: 기대 쪽으로 움직이지만 위치는 기준 밖이다.',
    fb: '첫 이탈은 방향 {fd}, 수준 {fl}이다.',
    tot: '점검 {n}개 전체: 방향 부합 {a}·불일치 {b}·혼재 {c}·보합 {f}, 수준 부합 {d}·불일치 {e}·혼재 {g}·보합 {h}. 판정 입력 미수집 {m}개 · 가장 오래된 판정 입력 {src}.',
    a1: '점검 {n}개 가운데 방향 부합 {a}·불일치 {b}·혼재 {c}, 수준 부합 {d}·불일치 {e}다.',
    a2: '기대 경로에서 처음 어긋나는 곳은 {no} {name}의 {axis}({ind} {date})이다.',
    a2none: '기대 경로 점검 {k}개는 부합하거나 미수집이다.',
    a3: '판정 입력 미수집 {m}개 · 가장 오래된 입력 {src} {date}.',
    neutral: '점검 지표 {n}개 가운데 같은 시기 범위 위 {a}개, 범위 아래 {b}개다. 최근 관측 {d1}, 가장 오래된 관측 {d2}.',
    comove: '최근 {k}개월 가운데 물동량↑·유가↓가 함께 나타난 달은 {x}개, 유가↓·물가 둔화가 함께 나타난 달은 {y}개다.'
  }
};

/* ---------- 기본 유틸 ---------- */
const DAY = 864e5;
const isNum = v => typeof v === 'number' && isFinite(v);
const tOf = d => { if (!d) return NaN; if (/^\d{4}-\d{2}$/.test(d)) d += '-01'; return Date.parse(d.slice(0, 10) + 'T00:00:00Z'); };
const isoOf = t => new Date(t).toISOString().slice(0, 10);
function addM(m, k) { let y = +m.slice(0, 4), mo = +m.slice(5, 7) + k; while (mo < 1) { mo += 12; y--; } while (mo > 12) { mo -= 12; y++; } return y + '-' + String(mo).padStart(2, '0'); }
const mean = a => { const b = a.filter(isNum); return b.length ? b.reduce((s, x) => s + x, 0) / b.length : null; };
function sd(a) { const b = a.filter(isNum); if (b.length < 2) return null; const m = mean(b); return Math.sqrt(b.reduce((s, x) => s + (x - m) * (x - m), 0) / (b.length - 1)); }
function quant(a, q) { const b = a.filter(isNum).sort((x, y) => x - y); if (!b.length) return null; const p = (b.length - 1) * q, i = Math.floor(p); return b[i] + (b[Math.min(i + 1, b.length - 1)] - b[i]) * (p - i); }
const median = a => quant(a, 0.5);

/* 숫자·날짜 서식 (문장 자리표시용) */
function fnum(v, d) { if (!isNum(v)) return null; const s = Math.abs(v).toLocaleString('en-US', {minimumFractionDigits: d, maximumFractionDigits: d}); return (v < 0 && +s.replace(/,/g, '') !== 0 ? '−' : '') + s; }
function fabs(v, d) { return isNum(v) ? fnum(Math.abs(v), d) : null; }
function fsg(v, d) { if (!isNum(v)) return null; const s = fnum(Math.abs(v), d); return (+s.replace(/,/g, '') === 0 ? '' : v > 0 ? '+' : '−') + s; }
let CUR_YEAR = 2026;
function fdate(d, freq) {
  if (!d) return null;
  const y = +d.slice(0, 4), pre = y === CUR_YEAR ? '' : String(y).slice(2) + '.';
  if (freq === 'M' || d.length === 7) return pre + (+d.slice(5, 7)) + '월';
  return pre + d.slice(5, 7) + '.' + d.slice(8, 10);
}

/* 템플릿 채우기: null 이 하나라도 있으면 문장 전체를 '미수집'으로 */
function say(tpl, f, miss) {
  let bad = null;
  const text = tpl.replace(/\{([^{}]+)\}/g, (_, body) => {
    const ci = body.lastIndexOf(':');
    if (body.includes('|') && ci > 0) {
      const opts = body.slice(0, ci).split('|'), k = body.slice(ci + 1), i = f[k];
      if (!isNum(i) || !opts[i]) { bad = bad || k; return ''; }
      return opts[i];
    }
    const v = f[body];
    if (v === null || v === undefined || v === '') { if (v === '' && body === 'roll') return ''; bad = bad || body; return ''; }
    return String(v);
  });
  if (bad) return {miss: true, text: '미수집: ' + (miss || bad)};
  return {miss: false, text};
}
const posEnd = p => !p ? null : p === '안' ? '안이다' : p + '다';
const fym = d => d ? d.slice(0, 4) + '년 ' + (+d.slice(5, 7)) + '월' : null;
const fctr = c => c ? c.slice(0, 4) + '년 ' + (+c.slice(5, 7)) + '월물' : null;
const s3 = (d, flat) => flat ? 2 : !isNum(d) ? null : d > 0 ? 0 : d < 0 ? 1 : 2;
const c2 = d => !isNum(d) ? null : d >= 0 ? 0 : 1;

/* ---------- 시계열 접근 ---------- */
function atOrBefore(arr, t) { let lo = 0, hi = arr.length - 1, ans = -1; while (lo <= hi) { const m = (lo + hi) >> 1; if (tOf(arr[m][0]) <= t) { ans = m; lo = m + 1; } else hi = m - 1; } return ans < 0 ? null : arr[ans]; }
function arrWin(arr, days) {
  if (!arr || arr.length < 2) return null;
  const last = arr[arr.length - 1], p = atOrBefore(arr, tOf(last[0]) - days * DAY);
  if (!p || !isNum(p[1]) || !isNum(last[1])) return null;
  return {v0: p[1], d0: p[0], v1: last[1], d1: last[0], abs: last[1] - p[1], pct: p[1] ? (last[1] / p[1] - 1) * 100 : null};
}
function changesByDays(arr, days, pct) {
  const out = []; let j = 0;
  for (let i = 0; i < arr.length; i++) {
    const ti = tOf(arr[i][0]) - days * DAY;
    while (j + 1 < i && tOf(arr[j + 1][0]) <= ti) j++;
    if (j < i && tOf(arr[j][0]) <= ti && isNum(arr[j][1]) && isNum(arr[i][1])) out.push(pct ? (arr[i][1] / arr[j][1] - 1) * 100 : arr[i][1] - arr[j][1]);
  }
  return out;
}
const mArr = o => Object.keys(o || {}).sort().map(k => [k, o[k]]).filter(x => isNum(x[1]));
function mChg(o, k, pct) { const out = {}; for (const m of Object.keys(o || {})) { const a = o[addM(m, -k)], b = o[m]; if (isNum(a) && isNum(b)) out[m] = pct ? (b / a - 1) * 100 : b - a; } return out; }
function mLastFull(o) { const a = mArr(o); return a.length ? a[a.length - 1][0] : null; }
function wkSeries(o) { const out = []; (o.prev || []).forEach(([w, v]) => isNum(v) && out.push({y: o.year - 1, w, v})); (o.cur || []).forEach(([w, v]) => isNum(v) && out.push({y: o.year, w, v})); return out; }
/* 상세 행 추세 칸: 행 값과 같은 단위의 이력 [날짜, 값].
 * 주간 계절 계열({y, w, v})은 주 번호를 날짜로 되돌린다. 주 번호는 1월 1일부터 7일 단위(ETL week_of_year)이고,
 * 관측일의 요일 어긋남(1월 1일부터 7로 나눈 나머지)은 계열의 마지막 관측일에서 잰다. 각 주는 그 해(마지막 관측일의 해)의
 * 슬롯 날짜에 놓고, 다른 해 값은 같은 달·일로 옮긴다(ETL prev 는 같은 달·일 관측이다. 2월 29일은 28일).
 * 마지막 점이 그 날짜의 주가 아니어도(두 계열 차의 한쪽이 한 주 늦은 때) 각 점은 제 주 날짜에 놓인다 */
function sameDay(ts, y) { const d = new Date(ts), m = d.getUTCMonth(), n = Date.UTC(y, m, d.getUTCDate()); return new Date(n).getUTCMonth() === m ? n : Date.UTC(y, m, 28); }
function wkDated(a, lastDate) {
  const t = tOf(lastDate); if (!a || !a.length || !isNum(t)) return [];
  const Y = new Date(t).getUTCFullYear(), j1 = y => Date.UTC(y, 0, 1), off = (t - j1(Y)) % (7 * DAY);
  return a.every(p => isNum(p.y) && isNum(p.w)) ? a.map(p => [isoOf(sameDay(j1(Y) + 7 * DAY * (p.w - 1) + off, p.y)), p.v]) : [];
}
/* 주간 목록이 있으면 그것을, 없으면 월평균을 쓴다. 끝 점은 행 값과 같은 최신 관측(last)이다:
 * 더 늦으면 붙이고, 같은 날짜의 주평균이면 그 값으로 바꾼다 */
function histOf(s) {
  if (!s) return [];
  return withLast((s.weekly && s.weekly.length ? s.weekly : mArr(s.monthly)).filter(x => isNum(x[1])), s.last && s.last.date, s.last && s.last.value);
}
/* 일 단위 키의 주간 목록은 진행 중인 주를 그 주 금요일 날짜로 둔다(ETL weekly_means): 최신 관측 날짜 이후의 점은 그 관측으로 바꾼다.
 * 월 키('YYYY-MM')는 그 달 1일로 보고 최신 관측을 뒤에 붙인다 */
function withLast(a, d, v) {
  a = a.slice(); const t = tOf(d); if (!isNum(t) || !isNum(v)) return a;
  while (a.length && a[a.length - 1][0].length > 7 && tOf(a[a.length - 1][0]) >= t) a.pop();
  const e = a[a.length - 1];
  if (!e || t > tOf(e[0])) a.push([d, v]);
  return a;
}
function wkChanges(a, k, pct) { const out = []; for (let i = k; i < a.length; i++) out.push(pct ? (a[i].v / a[i - k].v - 1) * 100 : a[i].v - a[i - k].v); return out; }

/* ---------- 판정 ---------- */
function judgeDir(delta, expect, sigma, nCh, rule, note) {
  if (!isNum(delta)) return {v: '미수집'};
  if (note) return {v: '판정 없음', note};
  if (!isNum(sigma) || nCh < rule.flat.min_changes) return {v: Math.sign(delta) === expect ? '부합' : delta === 0 ? '보합' : '불일치', basis: '부호 기준'};
  if (Math.abs(delta) < rule.flat.sigma * sigma) return {v: '보합', basis: 'σ ' + fnum(sigma, 2)};
  return {v: Math.sign(delta) === expect ? '부합' : '불일치', basis: 'σ ' + fnum(sigma, 2)};
}
function bandPos(v, b, expect) {
  if (!isNum(v) || !b || !isNum(b[0])) return null;
  const pos = v < b[0] ? '아래' : v > b[2] ? '위' : '안';
  const verdict = expect < 0 ? (pos === '아래' ? '부합' : pos === '위' ? '불일치' : '보합') : (pos === '위' ? '부합' : pos === '아래' ? '불일치' : '보합');
  return {kind: 'band', pos, verdict, min: b[0], avg: b[1], max: b[2], cur: v, text: '범위 ' + pos};
}
function rankPos(vals, v, expect, from) {
  const a = vals.filter(isNum); if (!a.length || !isNum(v)) return null;
  const k = a.filter(x => x > v).length + 1, N = a.length, med = median(a), above = v > med;
  return {kind: 'rank', k, N, med, cur: v, min: Math.min(...a), max: Math.max(...a), from, verdict: expect < 0 ? (above ? '불일치' : '부합') : (above ? '부합' : '불일치'), text: N + '중 ' + k + '위', pos: above ? '중앙 위' : '중앙 아래'};
}
const ratioPos = (v, expect) => !isNum(v) ? null : {kind: 'ratio', cur: v, verdict: expect > 0 ? (v >= 100 ? '부합' : '불일치') : (v <= 100 ? '부합' : '불일치'), text: fnum(v, 0) + ' / 100', pos: v >= 100 ? '100 이상' : '100 미만'};
const multPos = (v) => !isNum(v) ? null : {kind: 'multiple', cur: v, verdict: v <= 1 ? '부합' : '불일치', text: '×' + fnum(v, 1), pos: v > 1 ? '1× 초과' : '1× 이하'};

/* 점검 집계 (MONITOR_RULE.aggregate): 부합·불일치가 함께 있으면 혼재.
 * 한쪽 신호 + 보합이면 다수결, 같은 수면 신호 쪽. 행 구성은 mix 로 늘 함께 낸다. */
function aggregate(rows, axis) {
  const live = rows.filter(r => r.judged && r[axis] && r[axis].v !== '미수집');
  if (!live.length) return {v: '미수집'};
  const vs = live.map(r => r[axis].v);
  const n = w => vs.filter(x => x === w).length;
  const P = n('부합'), N = n('불일치'), F = n('보합');
  const parts = [['부합', P], ['불일치', N], ['보합', F]].filter(x => x[1]);
  const mix = parts.length > 1 ? parts.map(x => x[0] + ' ' + x[1]).join(' · ') : null;
  if (P && N) return {v: '혼재', mix};
  if (P) return {v: P >= F ? '부합' : '보합', mix};
  if (N) return {v: N >= F ? '불일치' : '보합', mix};
  if (F) return {v: '보합', mix};
  return {v: '판정 없음', mix};
}

/* 선물 월물 표시 결함 검출: 같은 날 T 행의 M1·M2 값과 맞춰 실제 월물을 찾는다 */
function trueContract(sf, field, term) {
  const p = sf && sf[field]; if (!p) return null;
  if (term && term.rows) {
    const row = term.rows.find(r => r[0] === p.date);
    if (row) {
      const m1 = Math.abs(p.value - row[1]) < 0.006, m2 = Math.abs(p.value - row[2]) < 0.006;
      if (m2 && !m1) return {c: row[4], tag: p.contract, fault: row[4] !== p.contract, date: p.date};
      if (m1) return {c: row[3], tag: p.contract, fault: row[3] !== p.contract, date: p.date};
    }
  }
  return {c: p.contract, tag: p.contract, fault: false, date: p.date};
}

/* ---------- 전가 자리: 급변 값 ---------- */
/* 급변: 창 변화(%) ÷ 평소 변화폭(σ, 변동 상위와 같은 척도). |배수| ≥ big_multiple 이면 급변이다 */
/* 경계 포함: 평소의 big_multiple배와 같으면 급변이다 */
const isJump = (z, rule) => isNum(z) && Math.abs(z) >= rule.big_multiple;
/* 배수 표시는 소수 한 자리. 기준 바로 아래 값(2.9757)이 반올림으로 기준(3.0)처럼 보이면 그때만 둘째 자리에서 버린다(2.97) */
const zfmt = (z, rule) => { const a = Math.abs(z), m = (rule || MONITOR_RULE).big_multiple, r = Math.round(a * 10) / 10; return a < m && r >= m ? (Math.floor(a * 100) / 100).toFixed(2) : fnum(a, 1); };
const jumpText = j => !j || j.miss ? (j ? j.name + ' 미수집' : '미수집') : j.name + ' ' + (j.big ? '급변 · ' : '') + '평소의 ' + zfmt(j.z) + '배';
/* 노드 보조 숫자: 값이 없으면 'null%' 대신 이름 뒤에 미수집 */
const kpiClean = t => typeof t === 'string' && /null|NaN|undefined/.test(t) ? t.split(/ null| NaN| undefined/)[0] + ' 미수집' : t;
const jumpPair = (a, b) => [a, b].map(jumpText).join(' · ');
/* 급변 없음은 양 끝이 모두 있을 때만 말한다(한쪽이 미수집이면 말하지 않는다) */
const jumpNone = js => { if (!js.length || js.some(j => !j || j.miss) || js.some(j => j.big)) return null; return '급변 없음 (최대 평소의 ' + zfmt(Math.max(...js.map(j => Math.abs(j.z)))) + '배)'; };
const jumpEdge = js => js.every(j => j && !j.miss) ? {big: js.some(j => j.big)} : {miss: true};

/* ---------- 사건 → 노드 (§5.2) ---------- */
const GULF_RE = /사우디|쿠웨이트|UAE|아랍에미리트|카타르|이라크|오만|이란|바레인|중동/;
function mapEvent(r) {
  const t = [r.type, r.scope, r.facility, r.what].join(' ');
  if (/비료|질소|인산|암모니아/.test(t)) return 'n-materials';
  if (/구리|정광|제련/.test(t)) return 'n-materials';
  if (/석탄/.test(t)) return 'n-materials';
  if (/LNG|천연가스|가스전|가스 /.test(t)) return (r.stage >= 1 && r.stage <= 3) ? 'n-lng' : 'n-gas';
  if (/전략비축|SPR/.test(t)) return 'n-stocks';
  switch (r.stage) {
    case 1: case 2: return GULF_RE.test(r.country || '') ? 'n-flow' : /중국/.test(r.country || '') ? 'n-china' : 'n-supply';
    case 3: return 'n-freight';
    case 4: return 'n-refining';
    case 5: return 'n-cracks';
    case 6: return 'n-stocks';
    default: return null;
  }
}
function evDate(r) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(r.event_date || '')) return {d: r.event_date, approx: false};
  if (/^\d{4}-\d{2}-\d{2}$/.test(r.source_date || '')) return {d: r.source_date, approx: false, src: true};
  if (/^\d{4}-\d{2}$/.test(r.source_date || '')) return {d: r.source_date + '-01', approx: true, src: true};
  return null;
}

/* ======================================================================
 * buildMonitorModel
 * ====================================================================== */
function buildMonitorModel(input, opts) {
  opts = opts || {};
  const rule = MONITOR_RULE;
  /* 공개본은 MONITOR_HOPE 를 null 로 바꾼다(public_scope.json). 그러면 판정 없이 위치와 값만 낸다. */
  const pages = !!opts.pages || MONITOR_HOPE === null;
  const hope = pages ? null : MONITOR_HOPE;
  const L = input.live, S = L.series, T = L.term || {}, U = L.supply || {}, J = (U.jodi || {}).data || {}, C = L.companies || {};
  /* 선박 신호(비공개, Pages 에는 없다): 해협(chokepoints)과 항만(ports)은 따로 실릴 수 있다. 항만만 있는 날에도 항만 행은 선다 */
  const SH = pages ? null : (L.shipping && typeof L.shipping === 'object' && (L.shipping.chokepoints || L.shipping.ports) ? L.shipping : null);
  const CP = SH && SH.chokepoints && typeof SH.chokepoints === 'object' ? SH.chokepoints : null;
  const EC = pages ? null : input.chains;
  const win = opts.win && WIN_DAYS[opts.win] ? opts.win : rule.window.default;
  const days = WIN_DAYS[win], months = rule.window.monthly_months[win], wks = days / 7;
  const fetchD = isoOf(Date.parse(L.fetched_at) + 9 * 3600e3);   /* KST 날짜 */
  const today = opts.today ? tOf(opts.today) : tOf(new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10));
  CUR_YEAR = +fetchD.slice(0, 4);
  const records = (input.records || []).map(r => ({...r, node: mapEvent(r), ed: evDate(r)}));
  const projects = input.projects || [];
  const recordsAsOf = input.recordsAsOf;
  const fetchDT = tOf(fetchD);
  const recent = (nodes, nd) => records.filter(r => r.ed && nodes.includes(r.node) && tOf(r.ed.d) > fetchDT - nd * DAY && tOf(r.ed.d) <= fetchDT);
  const inputs = {};   /* 근거: check → [{label, path, src, date, freq, cov}] */
  /* lag: 자료 달보다 늦게 나오는 월간 원천(개월). 경과일을 자료 달 + lag 달 1일부터 센다 */
  const addIn = (cid, label, path, src, date, freq, cov, fixed, lag) => { (inputs[cid] = inputs[cid] || []).push({label, path, src, date, freq, cov, fixed: fixed || null, ...(lag ? {lag} : {})}); };
  /* 대장 항목의 새 입력(수집 전·DB 있음·미보고): 맥락 행·탭·문장·입력 신선도만 더한다. 판정 행, 판정 행의 입력, 판정은 그대로다.
   * 키가 없으면 아무것도 더하지 않는다. 모양이 달라 계산이 멈추면 그 맥락만 빠지고 점검은 그대로 선다 */
  const got = new Set();   /* 맥락 행을 만든 대장 항목 (HAVE 가 함께 본다) */
  const freshX = [];       /* 원천별 자료 시점에 더할 새 원천 */
  const extra = fn => { try { fn(); } catch (e) { /* 이 맥락만 뺀다 */ } };
  const safe = fn => { try { return fn(); } catch (e) { return null; } };
  const nj = (...xs) => xs.filter(x => typeof x === 'string' && x !== '' && !/null|NaN|undefined/.test(x)).join(' · ');
  const sayOk = (tpl, f) => { const s = say(tpl, f, ''); return s.miss || /null|NaN|undefined/.test(s.text) ? null : s; };
  const isM = m => typeof m === 'string' && /^\d{4}-\d{2}$/.test(m);
  const isD = d => typeof d === 'string' && /^\d{4}-\d{2}(-\d{2})?$/.test(d);
  /* JODI: 보고국(data) 또는 감시 목록(watch) 항목. 마지막 달이 기준 달(U.jodi.latest)에서 stale_months 안이면 보고 중이다 */
  const JV = U.jodi || {}, JW = JV.watch || {};
  const mIdx = m => +m.slice(0, 4) * 12 + +m.slice(5, 7) - 1;
  const jEnt = (c, p, f) => (J[c] && J[c][p] && J[c][p][f]) || (JW[c] && JW[c][p] && JW[c][p][f]) || null;
  const jodiOn = (c, p, f) => { const e = jEnt(c, p, f); if (!e || !Array.isArray(e.last) || !isM(e.last[0]) || !isNum(e.last[1]) || !isM(JV.latest)) return false; const lag = mIdx(JV.latest) - mIdx(e.last[0]); return lag >= 0 && lag <= rule.stale_months; };
  /* 마지막 달의 전년 같은 달 값: 그 달이 기준 해면 prev, 그 전 해면 prev2 */
  const jPrev = e => { const m = e.last[0], i = +m.slice(5, 7) - 1, y = +m.slice(0, 4); const a = y === JV.year ? e.prev : y === JV.year - 1 ? e.prev2 : null; return Array.isArray(a) && isNum(a[i]) ? a[i] : null; };
  const jName = c => (JV.watch_names || {})[c] || ((JV.countries || {})[c] || {}).name || c;
  /* 내년 월물(curve.brent·wti): 값이 있는 월물과 기준 월물(anchor, 12월물) */
  const curveOf = k => {
    const c = L.curve && L.curve[k]; if (!c || typeof c !== 'object' || !c.contracts || typeof c.contracts !== 'object' || !isM(c.anchor)) return null;
    const pts = Object.keys(c.contracts).filter(isM).sort().map(m => [m, c.contracts[m]]).filter(([, x]) => x && x.last && isNum(x.last.value) && isD(x.last.date));
    return {c, pts, z: (pts.find(([m]) => m === c.anchor) || [])[1] || null, year: isNum(c.year) ? c.year : +c.anchor.slice(0, 4)};
  };
  const moOf = m => (+m.slice(5, 7)) + '월물';

  /* --- 공통: 일반 계열 창 변화 (M1) --- */
  function seriesWin(key, wdays, wlabel) {
    const s = S[key]; if (!s) return null;
    wdays = wdays || days; wlabel = wlabel || win;
    const mm = {7: 1, 28: 1, 91: 3, 364: 12}[wdays];
    let r = null, basis = '', sig = null, nCh = 0, roll = null;
    if (s.daily && s.daily.length > 20) {
      r = arrWin(s.daily, wdays); const ch = changesByDays(s.daily, wdays, true); sig = sd(ch); nCh = ch.length; basis = '일별';
    } else if (s.freq !== 'M' && (wdays === 7 || wdays === 28 || wdays === 364) && s[{7: 'w1', 28: 'm1', 364: 'y1'}[wdays]]) {
      const a = s[{7: 'w1', 28: 'm1', 364: 'y1'}[wdays]];
      r = {v0: a.value, d0: a.date, v1: s.last.value, d1: s.last.date, abs: s.last.value - a.value, pct: (s.last.value / a.value - 1) * 100};
      if (s.weekly && s.weekly.length > 20) { const ch = changesByDays(s.weekly, wdays, true); sig = sd(ch); nCh = ch.length; basis = '주평균 σ'; }
      else { const ch = Object.values(mChg(s.monthly, 1, true)); sig = isNum(sd(ch)) ? sd(ch) * Math.sqrt(wdays / 30.4) : null; nCh = ch.length; basis = '월 σ 환산'; }
    } else if (s.freq !== 'M' && s.weekly && s.weekly.length > 20) {
      r = arrWin(s.weekly, wdays); const ch = changesByDays(s.weekly, wdays, true); sig = sd(ch); nCh = ch.length; basis = '주평균';
    } else {
      const lm = mLastFull(s.monthly); if (lm) { const a = s.monthly[addM(lm, -mm)]; if (isNum(a)) r = {v0: a, d0: addM(lm, -mm), v1: s.monthly[lm], d1: lm, abs: s.monthly[lm] - a, pct: (s.monthly[lm] / a - 1) * 100, monthly: true}; }
      const ch = Object.values(mChg(s.monthly, mm, true)); sig = sd(ch); nCh = ch.length; basis = '월평균 ' + mm + '개월';
    }
    let fault = null;
    if (r && s.last && s.last.contract) {
      const term = TERM_OF[key] ? T[TERM_OF[key]] : null;
      const lc = trueContract(s, 'last', term); if (lc && lc.fault) fault = lc;
      const anchorF = {7: 'w1', 28: 'm1', 364: 'y1'}[wdays]; const anchor = anchorF ? s[anchorF] : null;
      const ac = anchor ? trueContract(s, anchorF, term) : null;
      if (!anchor || !anchor.contract) roll = '월물 미확인';
      else if (ac.c !== lc.c) roll = wdays === 364 ? null : '만기 교체';
      if (wdays === 364 && anchor && anchor.contract) roll = null;   /* 근월물 대 근월물 = 근월물 기준 */
    }
    return r ? {...r, sig, nCh, basis, roll, fault, wlabel} : null;
  }
  function jumpOf(key, name) {
    const s = S[key]; if (!s) return {key, name, miss: true};
    const w = seriesWin(key); if (!w || !isNum(w.pct) || !isNum(w.sig) || !w.sig) return {key, name, miss: true};
    const z = w.pct / w.sig;
    return {key, name, v: w.v1, unit: s.unit, digits: s.digits, date: w.d1, d0: w.d0, freq: w.monthly ? 'M' : s.freq, chg: w.pct, z, big: isJump(z, rule), basis: w.basis, w: win};
  }
  function rankOf(key, expect, monthKey) {
    const s = S[key]; if (!s || !s.monthly) return null;
    const a = mArr(s.monthly); if (!a.length) return null;
    const m = monthKey || a[a.length - 1][0];
    const rp = rankPos(a.map(x => x[1]), s.monthly[m], expect, a[0][0]);
    if (!rp) return null;
    /* M2 부분월: 진행 중인 달의 평균을 완결 월 이력 + 자신 가운데 순위로 따로 낸다 */
    const pm = s.partial_month && s.partial_month.month > m ? s.partial_month : null;
    let part = null;
    if (pm && isNum(pm.value)) { const vals = a.map(x => x[1]).concat([pm.value]); const k = vals.filter(x => x > pm.value).length + 1; const med = median(a.map(x => x[1])); part = {m: pm.month, n: pm.n, v: pm.value, k, N: vals.length, above: pm.value > med, verdict: expect < 0 ? (pm.value > med ? '불일치' : '부합') : (pm.value > med ? '부합' : '불일치')}; }
    return {...rp, m, part};
  }
  function sameMonthBand(mobj, m, y0, y1) {
    const mm = m.slice(5, 7); const vals = []; for (let y = y0; y <= y1; y++) { const v = mobj[y + '-' + mm]; if (isNum(v)) vals.push(v); }
    return vals.length ? [Math.min(...vals), mean(vals), Math.max(...vals), vals.length] : null;
  }
  const deltaObj = (r, unit, pct, d) => r ? {abs: r.abs, pct: r.pct, unit, usePct: pct, d0: r.d0, d1: r.d1, roll: r.roll, w: r.wlabel || win, basis: r.basis, show: pct ? fsg(r.pct, 1) + '%' : fsg(r.abs, d == null ? 2 : d) + (unit || '')} : null;

  const checks = {};
  /* R4: 한 점검의 입력이 payload 에 없어 계산이 멈추면 그 점검만 미수집 한 행으로 남기고 나머지는 계속 계산한다 */
  function guard(id, fn) {
    try { fn(); } catch (e) {
      checks[id] = {rows: [{id: id + '-miss', label: '입력 미수집', judged: true, value: null, missing: {status: '미수집', route: 'payload에 이 점검의 입력이 없다'}}],
        ctx: [], flags: [], sentences: [], tabs: [], primary: 0, posRow: 0, failed: String(e && e.message || e)};
    }
  }

  /* ---------- ⑤ 완충 면 (판정 없음 · 위치와 값) ----------
   * 계절 수요: 제품 수요 4주 평균의 같은 주 5년 범위 위치. 평년 13주 변화 = 범위 평균(w+13) − 범위 평균(w).
   * 13주 경로(M10): 지금 재고 + 평년 13주 변화(e1), 지금 재고 + 전년 같은 13주 변화(e2). 13주 뒤 같은 주 범위와 비교한다.
   * 저장 여유: 주간 재고 ÷ EIA 작업 저장능력. 상업 원유는 EIA 각주대로 작업 능력 + 수송 중 재고, SPR은 표 1의 작업 저장능력.
   *   능력은 2024년 3월 기준이다(보고서 중단). 그 뒤 증설·폐쇄는 반영되지 않는다.
   *   만충까지 주 = 남은 공간 ÷ 최근 4주 평균 주간 증가(교재 15장 T = H/(Qin−Qout), 속도 불변 가정). 줄고 있으면 없음.
   * 비축: SPR 전년 같은 주 대비·설계 능력 대비·STEO 월말 경로, 일본·EU 의무 비축, JODI 국가 재고, EIA 국가별 전략 재고 추정(참조 자료).
   * 세계·여유능력: STEO 세계 재고 순인출·OECD 상업 재고·OPEC 잉여 생산능력·비계획 차질, 미국 난방·냉방도일과 직전 10년 평균, DUC. */
  /* STEO 월간 계열: 실적(last_historical 까지)과 EIA 전망을 나눈다. ⑤ 면과 ② 사용량 면이 함께 쓴다 */
  const STEO_B = U.steo_balance && U.steo_balance.series && U.steo_balance.months ? U.steo_balance : null;
  function steoSer(key) {
    if (!STEO_B || !STEO_B.series[key]) return null; const B = STEO_B, s = B.series[key];
    const pts = B.months.map((m, i) => [m, s.values[i]]).filter(x => isNum(x[1])); const h = pts.filter(x => x[0] <= B.last_historical); const L = h[h.length - 1]; if (!L) return null;
    const y = pts.find(x => x[0] === addM(L[0], -12));
    return {label: s.label, unit: s.unit, code: s.code, pts, hist: h, fcst: pts.filter(x => x[0] > B.last_historical), m: L[0], v: L[1], y: y ? y[1] : null};
  }
  function bufferFacets(o) {
    const {W, CV, rows, euS, eu, jp, jpl, jodiStocks} = o;
    const B = U.steo_balance && U.steo_balance.series && U.steo_balance.months ? U.steo_balance : null;
    const CAP = U.storage_capacity && U.storage_capacity.regions ? U.storage_capacity : null;
    const NAME = {crude: '원유', gasoline: '휘발유', distillate: '중간유분', jet: '항공유', propane: '프로판', resid: '중유', total: '석유제품 합계'};
    /* 주 번호는 ETL과 같게 1월 1일부터 7일 묶음(1~53). 13주 뒤는 날짜(+91일)로 찾는다.
     * 그날이 다음 해이면 다음 해 첫 주들의 범위(band_next, 그해 포함 다섯 해)를 쓴다:
     * 11월 → 이듬해 2월의 평년 변화 = 평균(다음 해 2월, 해당 다섯 해) − 평균(11월, 이전 다섯 해). */
    const weekOf = t => { const d = new Date(t), y = d.getUTCFullYear(); return {y, w: Math.floor((t - Date.UTC(y, 0, 1)) / DAY / 7) + 1}; };
    const lastWk = s => { const a = s ? wkSeries(s) : []; return a.length ? {a, L: a[a.length - 1]} : null; };
    function bandAt(s, y, w) {
      if (y === s.year) { const b = s.band && s.band[w - 1]; return b ? {b, by: s.band_years} : null; }
      const n = (s.band_next || []).find(x => x[0] === w); return n && y === s.year + 1 ? {b: [n[1], n[2], n[3]], by: s.band_next_years} : null;
    }
    function ahead13(s) {
      const lw = lastWk(s); if (!lw || !s.band) return null;
      const t0 = tOf(s.last.date), T = weekOf(t0 + 91 * DAY); const bw = s.band[lw.L.w - 1], bt = bandAt(s, T.y, T.w);
      return {lw, w: lw.L.w, bw, T, bt, n13: bw && bt && isNum(bt.b[1]) && isNum(bw[1]) ? bt.b[1] - bw[1] : null};
    }
    function season(s) {
      const A = s && s.band ? ahead13(s) : null; if (!A) return null;
      const {lw, w, bw, n13} = A; const avg = s.band.map(b => b ? b[1] : null);
      const v52 = avg.slice(0, 52).map((v, i) => [i + 1, v]).filter(x => isNum(x[1]));
      const ext = f => v52.reduce((p, x) => !p || f(x[1], p[1]) ? x : p, null);
      return {w, w13: A.T.w, wrap: A.T.y !== s.year, v: lw.L.v, date: s.last.date, pos: bandPos(lw.L.v, bw, 1), n13, n13pct: isNum(n13) && bw && bw[1] ? n13 / bw[1] * 100 : null,
        peakW: (ext((a, b) => a > b) || [])[0], troughW: (ext((a, b) => a < b) || [])[0], by: s.band_years};
    }
    const demand = [['crude', 'crude_runs'], ['gasoline', 'gasoline_demand'], ['distillate', 'distillate_demand'], ['jet', 'jet_demand'], ['propane', 'propane_demand'], ['total', 'total_demand']]
      .map(([p, key]) => { const s = season(W[key]); return {p, name: p === 'crude' ? '원유(정제 투입)' : NAME[p], key, unit: '천 b/d', path: 'U.us_weekly.' + key, ...(s || {}), value: s ? s.v : null}; });
    const cover = [['gasoline', 'gasoline_days'], ['distillate', 'distillate_days'], ['jet', 'jet_days'], ['propane', 'propane_days']]
      .map(([p, key]) => { const s = season(CV[key]); return {p, name: NAME[p], key, unit: '일', path: 'U.us_cover.' + key, ...(s || {}), value: s ? s.v : null}; });
    const P_OF = {crude_stocks: 'crude', gasoline_stocks: 'gasoline', distillate_stocks: 'distillate', jet_stocks: 'jet', propane_stocks: 'propane', resid_stocks: 'resid'};
    const level = rows.filter(r => P_OF[r.key]).map(r => ({p: P_OF[r.key], name: NAME[P_OF[r.key]], row: r.id, value: r.value, unit: r.unit, date: r.date, pos: r.pos, path: r.path}));
    function path13(s) {
      const A = s && s.band ? ahead13(s) : null; if (!A || !A.bw || !A.bt) return null;
      const {lw, w, bw, T} = A, b13 = A.bt.b, L = lw.L;
      const e1 = L.v + A.n13;
      /* 전년 경로: 1년(364일) 전 같은 날짜에서 13주 뒤까지 실제 변화. 값은 주 번호로 cur·prev 에서 찾는다 */
      const t0 = tOf(s.last.date), P0 = weekOf(t0 - 364 * DAY), P1 = weekOf(t0 - 364 * DAY + 91 * DAY);
      const look = (y, wk) => { const arr = y === s.year ? s.cur : y === s.year - 1 ? s.prev : null; const hit = arr && arr.find(x => x[0] === wk); return hit && isNum(hit[1]) ? hit[1] : null; };
      const v0 = look(P0.y, P0.w), v1 = look(P1.y, P1.w);
      const e2 = isNum(v0) && isNum(v1) ? L.v + (v1 - v0) : null;
      const at = v => !isNum(v) ? null : v < b13[0] ? '아래' : v > b13[2] ? '위' : '안';
      return {w, w13: T.w, wrap: T.y !== s.year, by13: A.bt.by, cur: L.v, e1, e2, b13, bw, p1: at(e1), p2: at(e2), date: s.last.date};
    }
    const path = Object.entries(P_OF).map(([key, p]) => ({p, name: NAME[p], key, unit: '천 배럴', path: 'U.us_weekly.' + key, ...(path13(W[key]) || {})}));
    const room = [['US', '미국 상업', 'crude_stocks'], ['Cushing', '쿠싱', 'cushing_stocks'], ['PADD 2', '중서부', 'midwest_crude_stocks'], ['PADD 3', '멕시코만 연안', 'gulf_crude_stocks'], ['SPR', 'SPR', 'spr']].map(([rg, name, key]) => {
      const s = W[key], cap = CAP && CAP.regions[rg];
      const den = cap ? (rg === 'SPR' ? cap.working : (cap.with_transit || cap.working)) : null;
      const base = {rg, name, key, path: 'U.us_weekly.' + key + ' ÷ U.storage_capacity.regions.' + rg};
      if (!s || !isNum(den) || !den) return {...base, value: s ? s.last.value / 1000 : null, date: s ? s.last.date : null, fill: null, missing: !s ? '수집 전' : '능력 미수집'};
      const lw = lastWk(s); const v = s.last.value; const w = lw ? lw.L.w : null; const b = w && s.band ? s.band[w - 1] : null;
      const bands = (s.band || []).filter(Boolean);
      const k4 = lw && lw.a.length > 4 ? lw.L.v - lw.a[lw.a.length - 5].v : null;
      return {...base, value: v / 1000, unit: '백만 배럴', date: s.last.date, cap: den / 1000, capBasis: rg === 'SPR' ? '작업 저장능력' : '작업 능력 + 수송 중 재고', capAsOf: CAP.as_of,
        fill: v / den * 100, bandFill: b ? b.map(x => x / den * 100) : null, by: s.band_years,
        fillLo: bands.length ? Math.min(...bands.map(x => x[0])) / den * 100 : null, fillHi: bands.length ? Math.max(...bands.map(x => x[2])) / den * 100 : null,
        y1Fill: s.y1 ? s.y1.value / den * 100 : null, room: (den - v) / 1000, k4: isNum(k4) ? k4 / 1000 : null, weeksToFull: isNum(k4) && k4 > 0 ? (den - v) / (k4 / 4) : null, raw: s};
    });
    const steo = steoSer;
    const oecd = steo('oecd_stocks');
    if (oecd) {
      const y0 = +B.months[0].slice(0, 4), y1 = +oecd.m.slice(0, 4) - 1, mm = oecd.m.slice(5, 7); const vals = [];
      for (let y = y0; y <= y1; y++) { const p = oecd.hist.find(x => x[0] === y + '-' + mm); if (p) vals.push(p[1]); }
      oecd.by = [y0, y1]; oecd.band = vals.length >= 3 ? [Math.min(...vals), mean(vals), Math.max(...vals)] : null; oecd.pos = oecd.band ? bandPos(oecd.v, oecd.band, 1) : null;
    }
    const world = {ed: B && B.edition, lh: B && B.last_historical, draw: steo('world_draw'), supply: steo('world_supply'), consumption: steo('world_demand'), oecd,
      spare: steo('opec_spare'), capacity: steo('opec_capacity'), outages: steo('opec_outages'), sprPath: steo('us_spr'), sprDraw: steo('us_spr_draw'),
      hdd: steo('us_hdd'), hddN: steo('us_hdd_normal'), cdd: steo('us_cdd'), cddN: steo('us_cdd_normal')};
    /* DUC: 같은 달 모든 지역 값이 있을 때만 합한다 */
    const Dr = U.us_drilling;
    if (Dr && Dr.data && Dr.data.duc && Dr.months) {
      const regs = Object.values(Dr.data.duc); const sumAt = i => regs.every(r => isNum(r[i])) ? regs.reduce((t, r) => t + r[i], 0) : null;
      const ok = Dr.months.map((m, i) => i).filter(i => isNum(sumAt(i))); const li = ok[ok.length - 1];
      if (li != null) { const yi = Dr.months.indexOf(addM(Dr.months[li], -12)); world.duc = {m: Dr.months[li], v: sumAt(li), y: yi >= 0 ? sumAt(yi) : null, pts: ok.map(i => [Dr.months[i], sumAt(i)])}; }
    }
    const spr = room.find(x => x.rg === 'SPR'), sw = W.spr;
    const euK0 = (() => { if (!eu) return null; let k = 0, n = 0; for (const r of Object.values(eu.rows)) { const L = r.points[r.points.length - 1]; const p = r.points.find(x => x[0] === addM(L[0], -12)); if (p) { n++; if (p[1] < eu.minimum_days) k++; } } return n ? {k, n} : null; })();
    const strategic = (() => { const ds = input.strategic; if (!ds || !ds.rows) return null; return {published: ds.published, columns: ds.columns, rows: ds.rows.filter(r => isNum(r[1]) && isNum(r[3])).map(r => ({name: r[0], s0: r[1], s1: r[2], s2: r[3], kind: r[4] || ''}))}; })();
    const stockpile = {
      spr: sw ? {value: sw.last.value / 1000, date: sw.last.date, y1r: sw.y1 ? sw.last.value / sw.y1.value * 100 : null, y1: sw.y1 ? sw.y1.value / 1000 : null, fill: spr && spr.fill, cap: spr && spr.cap, capAsOf: spr && spr.capAsOf, raw: sw} : null,
      jp: jpl ? {m: jpl.month, total: jpl.total, private: jpl.private, national: jpl.national, joint: jpl.joint, obligation: jp.private_obligation && jp.private_obligation.days, y: (jp.rows.find(r => r.month === addM(jpl.month, -12)) || {}).total, rows: jp.rows} : null,
      eu: euS ? {...euS, k0: euK0} : null, jodi: jodiStocks, strategic};
    return {level, cover, demand, path, room, stockpile, world};
  }

  /* ② 사용량 면: 세계·지역 소비(STEO 표 3a, 실적과 EIA 전망), 국가별 수요(JODI 제품 합계, 같은 달 다섯 해 범위),
   * 비축 수요(SPR 순인출·경로). 미국 주간 제품 공급·계절 달력·여유능력은 ⑤ 면을 그대로 쓴다.
   * 전년=100 은 같은 달 비교(산술), 12개월 평균 비교는 최근 12개월 실적 대 직전 12개월·다음 12개월 전망. */
  const USE_REGIONS = [['world_demand', '세계', 'all'], ['demand_oecd', 'OECD', 'agg'], ['demand_non_oecd', '비OECD', 'agg'], ['demand_us', '미국', 'oecd'], ['demand_ch', '중국', 'non'],
    ['demand_oecd_europe', 'OECD 유럽', 'oecd'], ['demand_other_asia', '기타 아시아', 'non'], ['demand_ja', '일본', 'oecd'], ['demand_fsu', '유라시아', 'non'], ['demand_other_nonoecd', '기타 비OECD', 'non'],
    ['demand_ca', '캐나다', 'oecd'], ['demand_other_oecd', '기타 OECD', 'oecd'], ['demand_nonoecd_europe', '비OECD 유럽', 'non'], ['demand_ust', '미국 해외 영토', 'oecd']];
  function usageFacets() {
    const avg = a => a.length ? mean(a.map(p => p[1])) : null;
    const regions = USE_REGIONS.map(([key, name, grp]) => {
      const s = steoSer(key); if (!s) return {key, name, grp, miss: true};
      const t12 = avg(s.hist.slice(-12)), p12 = s.hist.length >= 24 ? avg(s.hist.slice(-24, -12)) : null, n12 = s.fcst.length >= 12 ? avg(s.fcst.slice(0, 12)) : null;
      return {...s, key, name, grp, r: isNum(s.y) && s.y ? s.v / s.y * 100 : null, t12, p12, n12, rT: isNum(p12) && p12 ? t12 / p12 * 100 : null, rN: isNum(n12) && t12 ? n12 / t12 * 100 : null};
    });
    const Jv = U.jodi || {}; const jodi = [];
    Object.entries(Jv.data || {}).forEach(([cc, d]) => {
      const e = d.TOTPRODS && d.TOTPRODS.TOTDEMO; if (!e || !e.last || !e.lo) return;
      const m = e.last[0], i = +m.slice(5, 7) - 1; if (+m.slice(0, 4) !== Jv.year) return;
      const band = [e.lo[i], e.avg[i], e.hi[i]]; if (!band.every(isNum)) return; const py = e.prev[i];
      jodi.push({cc, name: (Jv.countries[cc] || {}).name || cc, m, v: e.last[1], band, bp: bandPos(e.last[1], band, 1), y: py, r: isNum(py) && py ? e.last[1] / py * 100 : null, stale: m < addM(Jv.latest, -rule.stale_months),
        /* 최신 달보다 석 달 이상 늦게 보고한 나라는 칸 앞면에 자료 달을 적는다(인도 2026-03 등) */
        behind: (+Jv.latest.slice(0, 4) - +m.slice(0, 4)) * 12 + (+Jv.latest.slice(5, 7) - +m.slice(5, 7))});
    });
    jodi.sort((a, b) => b.v - a.v);
    return {ed: STEO_B && STEO_B.edition, lh: STEO_B && STEO_B.last_historical, regions, jodi, jby: Jv.band_years, sprDraw: steoSer('us_spr_draw'), sprPath: steoSer('us_spr')};
  }

  /* ================= C1 물동량 (M4) ================= */
  guard('c1', function () {
    const crudeParts = [['SA', 'CRUDEOIL'], ['KW', 'CRUDEOIL']];
    const prodParts = [['SA', 'GASDIES'], ['SA', 'GASOLINE'], ['SA', 'NAPHTHA'], ['SA', 'RESFUEL'], ['KW', 'GASDIES'], ['KW', 'GASOLINE'], ['KW', 'NAPHTHA'], ['KW', 'RESFUEL'], ['KW', 'LPG']];
    const yr = (U.jodi || {}).year;
    const ser = (c, p, f) => J[c] && J[c][p] && J[c][p][f || 'TOTEXPSB'];
    /* back: 전년 비율(전년 ÷ 2년 전, ETL prev2). prev2 가 없는 페이로드에서는 null 이다 */
    function ratioAt(parts, mi, all, flow, back) {
      let sc = 0, sp = 0, n = 0; const by = {};
      for (const [c, p] of parts) { const s = ser(c, p, flow); if (!s) { if (all) return null; continue; } const a = (back ? s.prev : s.cur)[mi], b = ((back ? s.prev2 : s.prev) || [])[mi]; if (isNum(a) && isNum(b) && b > 0) { sc += a; sp += b; n++; by[c] = by[c] || {sc: 0, sp: 0}; by[c].sc += a; by[c].sp += b; } else if (all) return null; }
      return n ? {r: sc / sp * 100, n, N: parts.length, sc, sp, by} : null;
    }
    let mi = -1; for (let i = 11; i >= 0; i--) { if (ratioAt(crudeParts, i, true)) { mi = i; break; } }
    const mKey = mi >= 0 ? yr + '-' + String(mi + 1).padStart(2, '0') : null;
    const rc = mi >= 0 ? ratioAt(crudeParts, mi, true) : null, rp = mi >= 0 ? ratioAt(prodParts, mi, false) : null;
    /* 상세 추세 칸: 전년 달별 비율을 올해 앞에 붙인다(연초에도 점이 모자라지 않게) */
    const mKeyOf = (y, i) => y + '-' + String(i + 1).padStart(2, '0');
    const years = (parts, all) => { if (mi < 0) return []; const out = []; for (let i = 0; i < 12; i++) { const r = ratioAt(parts, i, all, null, true); if (r) out.push([mKeyOf(yr - 1, i), r.r]); } for (let i = 0; i <= mi; i++) { const r = ratioAt(parts, i, all); if (r) out.push([mKeyOf(yr, i), r.r]); } return out; };
    const trend = []; for (let i = 0; i <= mi; i++) { const a = ratioAt(crudeParts, i, true), b = ratioAt(prodParts, i, false); trend.push({m: yr + '-' + String(i + 1).padStart(2, '0'), crude: a ? a.r : null, prod: b ? b.r : null, n: b ? b.n : 0}); }
    const back = 3; const rc3 = mi - back >= 0 ? ratioAt(crudeParts, mi - back, true) : null, rp3 = mi - back >= 0 ? ratioAt(prodParts, mi - back, false) : null;
    const dC = rc && rc3 ? rc.r - rc3.r : null, dP = rp && rp3 ? rp.r - rp3.r : null;
    const m3 = mi - back >= 0 ? yr + '-' + String(mi - back + 1).padStart(2, '0') : null;
    const mkDelta = (d) => isNum(d) ? {abs: d, unit: '%p', show: fsg(d, 1) + '%p', w: 'Δ3개월', d0: m3, basis: '비율 이력 12점 이하'} : null;
    const rows = [
      {id: 'c1-crude', label: '원유 수출 회복률', sub: '사우디+쿠웨이트', judged: true, value: rc && rc.r, unit: '%', digits: 1, date: mKey, freq: 'M',
        delta: mkDelta(dC), pos: ratioPos(rc && rc.r, 1), dir: judgeDir(dC, 1, null, 0, rule), path: 'J.{SA,KW}.CRUDEOIL.TOTEXPSB', src: 'JODI', arr: years(crudeParts, true)},
      {id: 'c1-prod', label: '제품·LPG 수출 회복률', sub: rp ? '품목 ' + rp.n + '/' + rp.N : '', judged: true, value: rp && rp.r, unit: '%', digits: 1, date: mKey, freq: 'M',
        delta: mkDelta(dP), pos: ratioPos(rp && rp.r, 1), dir: judgeDir(dP, 1, null, 0, rule), path: 'J.SA.{GASDIES,GASOLINE,NAPHTHA,RESFUEL}, J.KW.{…,LPG}.TOTEXPSB', src: 'JODI', arr: years(prodParts, false)}
    ];
    rows.forEach(r => { r.lvl = r.pos ? {v: r.pos.verdict} : {v: '미수집'}; });
    /* 맥락 */
    const ctx = [];
    let pmi = -1; for (let i = 11; i >= 0; i--) if (ratioAt(crudeParts, i, true, 'INDPROD')) { pmi = i; break; }
    const rprod = pmi >= 0 ? ratioAt(crudeParts, pmi, true, 'INDPROD') : null;
    ctx.push({label: '원유 생산 회복률', value: rprod && rprod.r, unit: '%', digits: 1, date: pmi >= 0 ? yr + '-' + String(pmi + 1).padStart(2, '0') : null, freq: 'M', note: '전년 같은 달 = 100', path: 'J.{SA,KW}.CRUDEOIL.INDPROD'});
    const st = ser('SA', 'CRUDEOIL', 'CLOSTLV');
    let stBand = null;
    if (st && st.last) { const i = +st.last[0].slice(5, 7) - 1; stBand = bandPos(st.last[1], [st.lo[i], st.avg[i], st.hi[i]], 1); ctx.push({label: '사우디 원유 재고', value: st.last[1] / 1000, unit: '백만 배럴', digits: 1, date: st.last[0], freq: 'M', note: stBand ? '같은 달 ' + U.jodi.band_years.join('–') + ' 범위 ' + stBand.pos + (stBand.pos === '위' ? ' · 산지 적체 신호' : '') : '', path: 'J.SA.CRUDEOIL.CLOSTLV'}); }
    let priv = null;
    if (CP) {
      priv = ['hormuz', 'bab_el_mandeb', 'cape'].map(k => {
        const cp = CP[k]; if (!cp || !cp.daily) return null;
        const d7 = cp.daily.slice(-7); const x = mean(d7.map(d => d[1]));
        const lastD = d7[d7.length - 1][0]; const q = Math.floor((+lastD.slice(5, 7) - 1) / 3) + 1; const qk = (+lastD.slice(0, 4) - 1) + 'Q' + q;
        const qr = (cp.quarterly || []).find(r => r[0] === qk);
        return {key: k, label: cp.label, x, date: lastD, q: qk, qv: qr ? qr[1] : null, r: qr && qr[1] ? x / qr[1] * 100 : null, weekly: cp.weekly.slice(-104)};
      }).filter(Boolean);
    }
    const flags = []; if (rc && rp && rp.r < rc.r) flags.push('제품 지연');
    const sentences = [
      say(SAY.c1.lvl, {m: fdate(mKey, 'M'), rc: fnum(rc && rc.r, 0), rp: fnum(rp && rp.r, 0), n: rp && rp.n, N: rp && rp.N}, '걸프 수출(JODI)'),
      say(SAY.c1.mix, {d: fabs(rc && rp ? rc.r - rp.r : null, 0), c: c2(rc && rp ? rc.r - rp.r : null)}, '제품 회복률'),
      say(SAY.c1.dir, {m3: fdate(m3, 'M'), dd: fabs(dC, 1), s: s3(dC)}, '원유 회복률 3개월 전')
    ];
    if (priv && priv[0]) sentences.push(say(SAY.c1.priv, {label: priv[0].label, x: fnum(priv[0].x, 1), r: fnum(priv[0].r, 0), date: fdate(priv[0].date)}, '해협 통과(비공개)'));
    addIn('c1', '원유 수출 (사우디·쿠웨이트)', 'U.jodi.data.{SA,KW}.CRUDEOIL.TOTEXPSB', 'JODI', mKey, 'M', '2/2국');
    addIn('c1', '제품·LPG 수출', 'U.jodi.data.{SA,KW}.{GASDIES,GASOLINE,NAPHTHA,RESFUEL,LPG}.TOTEXPSB', 'JODI', mKey, 'M', rp ? rp.n + '/' + rp.N + '품목' : null);
    addIn('c1', '원유 생산', 'U.jodi.data.{SA,KW}.CRUDEOIL.INDPROD', 'JODI', ctx[0].date, 'M');
    if (st) addIn('c1', '사우디 원유 재고 + 같은 달 범위', 'U.jodi.data.SA.CRUDEOIL.{CLOSTLV,lo,avg,hi}', 'JODI', st.last[0], 'M');
    if (CP) addIn('c1', '해협 유조선 통과 (비공개)', 'shipping.chokepoints.*.{daily,quarterly}', '선박 신호', SH.latest, 'D');
    const byCountry = rc && rp ? ['SA', 'KW'].map(c => ({c, name: (U.jodi.countries[c] || {}).name || c, crude: rc.by[c] ? rc.by[c].sc / rc.by[c].sp * 100 : null, prod: rp.by[c] ? rp.by[c].sc / rp.by[c].sp * 100 : null})) : [];
    byCountry.push({c: 'ALL', name: '합계', crude: rc && rc.r, prod: rp && rp.r});
    const tabs = [
      {id: 'm4', label: '동월비', model: 'M4', primary: true, vis: {type: 'c1bars', byCountry, m: mKey, trend}},
      {id: 'trend', label: '추세', model: 'M1', vis: {type: 'c1trend', trend}},
      {id: 'season', label: '계절', model: 'M3', vis: st ? {type: 'calband', title: '사우디 원유 재고 · 같은 달 ' + U.jodi.band_years.join('–') + ' 범위 (백만 배럴)', unit: '백만 배럴', x: 'month', band: st.lo.map((v, i) => [v / 1000, st.avg[i] / 1000, st.hi[i] / 1000]), cur: st.cur.map(v => isNum(v) ? v / 1000 : null), prev: st.prev.map(v => isNum(v) ? v / 1000 : null), curLabel: String(yr), prevLabel: String(yr - 1)} : null}
    ];
    if (priv) tabs.push({id: 'flow', label: '유량', model: 'M8', priv: true, vis: {type: 'c1priv', priv}});
    /* UAE·이라크·카타르·오만: JODI 비보고국. 감시 목록에 보고가 다시 들어오면 보고국만의 동월비를 맥락 행으로 둔다(판정 행은 사우디·쿠웨이트 그대로) */
    extra(() => {
      const on = ['AE', 'IQ', 'QA', 'OM'].filter(c => jodiOn(c, 'CRUDEOIL', 'TOTEXPSB')); if (!on.length) return;
      const es = on.map(c => jEnt(c, 'CRUDEOIL', 'TOTEXPSB'));
      let i = -1; for (let k = 11; k >= 0; k--) if (es.every(e => Array.isArray(e.cur) && Array.isArray(e.prev) && isNum(e.cur[k]) && isNum(e.prev[k]) && e.prev[k] > 0)) { i = k; break; }
      if (i < 0) return;
      const sc = es.reduce((s, e) => s + e.cur[i], 0), sp = es.reduce((s, e) => s + e.prev[i], 0), m = yr + '-' + String(i + 1).padStart(2, '0');
      ctx.push({label: '걸프 기타 원유 수출 회복률 (보고국 ' + on.length + '/4)', value: sc / sp * 100, unit: '%', digits: 1, date: m, freq: 'M', note: nj(on.map(jName).join('·'), '전년 같은 달 = 100', '사우디·쿠웨이트 회복률과 따로 계산'), path: 'U.jodi.watch.{AE,IQ,QA,OM}.CRUDEOIL.TOTEXPSB'});
      addIn('c1', '원유 수출 (UAE·이라크·카타르·오만, 보고국만)', 'U.jodi.watch.<CC>.CRUDEOIL.TOTEXPSB', 'JODI', m, 'M', on.length + '/4국');
      if (on.length === 4) got.add('UAE·이라크·카타르·오만 수출');
    });
    /* 사우디 LPG 수출: JODI에 0(평가 없음)으로만 있다. LPG나 NGL 수출이 보고되면 맥락 행으로 둔다(제품·LPG 회복률 바구니는 그대로) */
    extra(() => {
      const p = ['LPG', 'NGL'].find(x => jodiOn('SA', x, 'TOTEXPSB')); if (!p) return;
      const e = jEnt('SA', p, 'TOTEXPSB'), py = jPrev(e);
      ctx.push({label: p === 'LPG' ? '사우디 LPG 수출' : '사우디 NGL 수출 (LPG 포함)', value: e.last[1], unit: '천 b/d', digits: 0, date: e.last[0], freq: 'M', note: nj(isNum(py) ? '전년 같은 달 ' + fnum(py, 0) : null, '제품·LPG 회복률 바구니 밖'), path: (J.SA && J.SA[p] && J.SA[p].TOTEXPSB ? 'J' : 'U.jodi.watch') + '.SA.' + p + '.TOTEXPSB'});
      addIn('c1', '사우디 ' + p + ' 수출', 'U.jodi.{data,watch}.SA.' + p + '.TOTEXPSB', 'JODI', e.last[0], 'M');
      got.add('사우디 LPG 수출');
    });
    /* 걸프 수출항(비공개): 항만별 유조선 수출 추정(선박 신호)의 최근 7일 평균과 전년 같은 분기 평균 */
    extra(() => {
      const P = SH && SH.ports, lt = SH && SH.ports_latest; if (!P || typeof P !== 'object' || !isD(lt)) return;
      const t1 = tOf(lt), q = Math.floor((+lt.slice(5, 7) - 1) / 3) + 1, qk = (+lt.slice(0, 4) - 1) + 'Q' + q;
      const ps = Object.entries(P).map(([k, p]) => {
        if (!p || !Array.isArray(p.daily)) return null;
        const d7 = p.daily.filter(r => Array.isArray(r) && isD(r[0]) && isNum(r[2]) && tOf(r[0]) > t1 - 7 * DAY && tOf(r[0]) <= t1); if (!d7.length) return null;
        const qr = (p.quarterly || []).find(r => Array.isArray(r) && r[0] === qk), y = qr && isNum(qr[2]) ? qr[2] / 1000 : null, x = mean(d7.map(r => r[2])) / 1000;
        return {key: k, label: p.label || p.name || k, side: p.side === 'bypass' ? 'bypass' : 'inside', x, y, r: isNum(y) && y ? x / y * 100 : null, d: d7[d7.length - 1][0]};
      }).filter(Boolean);
      if (!ps.length) return;
      const sum = side => { const a = ps.filter(p => p.side === side); if (!a.length) return null; const b = a.filter(p => isNum(p.y)), sy = b.reduce((s, p) => s + p.y, 0);
        return {n: a.length, x: a.reduce((s, p) => s + p.x, 0), r: b.length && sy ? b.reduce((s, p) => s + p.x, 0) / sy * 100 : null, names: a.map(p => p.label).join('·')}; };
      const a = sum('inside'), b = sum('bypass');
      if (a) ctx.push({label: '걸프 내 항만 유조선 수출 추정 (7일 평균, 비공개)', value: a.x, unit: '천 톤/일', digits: 0, date: lt, freq: 'D', note: nj(a.n + '곳', isNum(a.r) ? '전년 같은 분기 평균의 ' + fnum(a.r, 0) + '%' : null, '선박 신호 추정'), path: 'shipping.ports.*.{daily,quarterly} (side=inside)'});
      if (b) ctx.push({label: '우회 항만 유조선 수출 추정 (' + b.names + ', 비공개)', value: b.x, unit: '천 톤/일', digits: 0, date: lt, freq: 'D', note: nj(isNum(b.r) ? '전년 같은 분기 평균의 ' + fnum(b.r, 0) + '%' : null, '선박 신호 추정'), path: 'shipping.ports.*.{daily,quarterly} (side=bypass)'});
      if (a && b) { const s = sayOk(SAY.c1.ports, {d: fdate(lt), n: a.n, x: fnum(a.x, 0), r: fnum(a.r, 0), n2: b.n, r2: fnum(b.r, 0)}); if (s) sentences.push(s); }
      tabs.push({id: 'ports', label: '항만', model: 'M8', priv: true, vis: {type: 'routes', head: '비공개 · 항만별 유조선 수출 추정(천 톤/일, ' + fdate(lt) + '까지 7일 평균) · 전년 같은 분기 평균(' + qk + ') 대비', digits: 1,
        routes: ps.slice().sort((u, v) => v.x - u.x).map(p => ({label: p.label + (p.side === 'bypass' ? ' (우회)' : ''), v: p.x, d: p.d, y: p.y, r: p.r}))}});
      addIn('c1', '항만별 유조선 수출 추정 (비공개)', 'shipping.ports.*.{daily,quarterly}', '선박 신호', lt, 'D', ps.length + '곳');
      if (ps.length >= 8) got.add('항만별 선적');
    });
    checks.c1 = {rows, ctx, flags, sentences, tabs, primary: 0, posRow: 0, priv: !!priv,
      kpiSub: rp ? '제품 ' + fnum(rp.r, 0) + '% · ' + rp.n + '/' + rp.N + '품목' : null};
  });

  /* ================= C2 유가·곡선 (M5) ================= */
  guard('c2', function () {
    const tb = T.brent, tw = T.wti;
    function m1Win(t, wdays) {
      if (!t || !t.rows || !t.rows.length) return null;
      const rows = t.rows, last = rows[rows.length - 1], c1 = last[3], t0 = tOf(last[0]) - wdays * DAY;
      for (let i = rows.length - 1; i >= 0; i--) {
        const r = rows[i]; if (tOf(r[0]) > t0) continue;
        if (r[3] === c1) return {v0: r[1], d0: r[0], v1: last[1], d1: last[0], c: c1, abs: last[1] - r[1], pct: (last[1] / r[1] - 1) * 100, wlabel: win};
        if (r[4] === c1) return {v0: r[2], d0: r[0], v1: last[1], d1: last[0], c: c1, abs: last[1] - r[2], pct: (last[1] / r[2] - 1) * 100, wlabel: win, viaM2: true};
        return {short: true, c: c1, reason: '같은 월물 없음'};
      }
      return {short: true, c: c1, reason: '이력 ' + rows.length + '일 (' + fdate(rows[0][0]) + '부터)'};
    }
    function spreadWin(t, wdays) {
      if (!t || !t.rows || !t.rows.length) return null;
      const arr = t.rows.map(r => [r[0], r[1] - r[2]]); const w = arrWin(arr, wdays);
      return {arr, last: arr[arr.length - 1], w, n: arr.length};
    }
    const bw = m1Win(tb, days), ww = m1Win(tw, days);
    const lastB = tb && tb.rows[tb.rows.length - 1];
    const sigB = S.brent_fut && S.brent_fut.weekly ? sd(changesByDays(S.brent_fut.weekly, days, true)) : null;
    const nB = S.brent_fut && S.brent_fut.weekly ? changesByDays(S.brent_fut.weekly, days, true).length : 0;
    const rk = rankOf('brent', -1);
    const spB = spreadWin(tb, days), spW = spreadWin(tw, days);
    /* 현물−근월 (같은 날짜) */
    const tRow = d => tb && tb.rows.find(r => r[0] === d);
    const basisAt = a => { if (!a) return null; const r = tRow(a.date); return r ? {d: a.date, v: a.value - r[1], spot: a.value, m1: r[1]} : null; };
    const bNow = basisAt(S.brent && S.brent.last);
    const bThen = basisAt(S.brent && ({7: S.brent.w1, 28: S.brent.m1}[days]));
    const dBasis = bNow && bThen ? bNow.v - bThen.v : null;
    /* 현물−근월 주간: brent.weekly − 같은 주 T M1 평균 */
    const basisWeekly = [];
    if (S.brent && S.brent.weekly && tb) {
      for (const [wd, v] of S.brent.weekly) { const t1 = tOf(wd); const rs = tb.rows.filter(r => tOf(r[0]) > t1 - 7 * DAY && tOf(r[0]) <= t1); if (rs.length) basisWeekly.push([wd, v - mean(rs.map(r => r[1]))]); }
    }
    const rows = [
      {id: 'c2-m1', label: '브렌트 근월물', sub: lastB ? fctr(lastB[3]) + ' · T 행' : '', judged: true, value: lastB && lastB[1], unit: '$', digits: 2, date: lastB && lastB[0], freq: 'D',
        delta: bw && !bw.short ? {abs: bw.abs, pct: bw.pct, unit: '$', show: fsg(bw.abs, 2) + '$', w: win, d0: bw.d0, basis: bw.viaM2 ? '같은 월물(그때 차월)' : '같은 월물'} : null,
        deltaNote: bw && bw.short ? bw.reason : null,
        pos: rk, dir: bw && !bw.short ? judgeDir(bw.pct, -1, sigB, nB, rule) : {v: '판정 없음', note: bw ? bw.reason : '이력 없음'}, path: 'T.brent.rows · S.brent.monthly(순위)', src: 'Yahoo · FRED', arr: tb ? tb.rows.map(r => [r[0], r[1]]) : []},
      {id: 'c2-sp', label: '근월−차월', sub: '브렌트 M1−M2', judged: true, value: spB && spB.last[1], unit: '$', digits: 2, date: spB && spB.last[0], freq: 'D',
        delta: spB && spB.w ? {abs: spB.w.abs, unit: '$', show: fsg(spB.w.abs, 2) + '$', w: win, d0: spB.w.d0} : null, deltaNote: spB && !spB.w ? '이력 ' + spB.n + '일' : null,
        pos: spB ? {kind: 'none', text: '이력 ' + spB.n + '일', pos: '순위 없음'} : null,
        dir: spB && spB.w ? judgeDir(spB.w.abs, -1, sd(changesByDays(spB.arr, days, false)), changesByDays(spB.arr, days, false).length, rule) : {v: '판정 없음', note: '이력 부족'}, path: 'T.brent.rows[M1−M2]', src: 'Yahoo', arr: spB ? spB.arr : []},
      {id: 'c2-basis', label: '현물−근월', sub: '같은 날짜', judged: true, value: bNow && bNow.v, unit: '$', digits: 2, date: bNow && bNow.d, freq: 'D',
        delta: isNum(dBasis) ? {abs: dBasis, unit: '$', show: fsg(dBasis, 2) + '$', w: win, d0: bThen.d} : null, deltaNote: bNow && !bThen ? '창 미지원' : null,
        pos: bNow ? {kind: 'none', text: '순위 없음', pos: bNow.v > 0 ? '현물 높음' : '현물 낮음'} : null,
        dir: isNum(dBasis) ? judgeDir(dBasis, -1, null, 0, rule) : {v: bNow ? '판정 없음' : '미수집', note: '창 미지원'}, path: 'S.brent.last − T.brent(M1, 같은 날)', src: 'FRED · Yahoo', arr: withLast(basisWeekly, bNow && bNow.d, bNow && bNow.v)}
    ];
    rows.forEach(r => { r.lvl = r.pos && r.pos.verdict ? {v: r.pos.verdict} : {v: r.value == null ? '미수집' : '판정 없음'}; });
    const ctx = [];
    const lastW = tw && tw.rows[tw.rows.length - 1];
    ctx.push({label: 'WTI 근월물', value: lastW && lastW[1], unit: '$', digits: 2, date: lastW && lastW[0], freq: 'D', delta: ww && !ww.short ? fsg(ww.abs, 2) + '$' : (ww && ww.reason), note: lastW ? fctr(lastW[3]) : '', path: 'T.wti.rows'});
    ctx.push({label: 'WTI 근월−차월', value: spW && spW.last[1], unit: '$', digits: 2, date: spW && spW.last[0], freq: 'D', delta: spW && spW.w ? fsg(spW.w.abs, 2) + '$' : null, path: 'T.wti.rows'});
    const bd = mArr(S.brent_imf && S.brent_imf.monthly).map(([m, v]) => [m, isNum((S.dubai_imf.monthly || {})[m]) ? v - S.dubai_imf.monthly[m] : null]).filter(x => isNum(x[1]));
    const bdl = bd[bd.length - 1];
    ctx.push({label: '브렌트−두바이 (IMF 월간)', value: bdl && bdl[1], unit: '$', digits: 2, date: bdl && bdl[0], freq: 'M', note: 'IMF 브렌트는 선물 추종', path: 'S.brent_imf − S.dubai_imf'});
    const cp = U.us_weekly && U.us_weekly.crude_prod;
    ctx.push({label: '미국 원유 생산 (4주 평균)', value: cp && cp.last.value, unit: '천 b/d', digits: 0, date: cp && cp.last.date, freq: 'W', note: cp && cp.vs5 ? '5년 평균 대비 ' + fsg(cp.vs5.pct, 1) + '%' : '', path: 'U.us_weekly.crude_prod'});
    const rg = U.us_rigs && U.us_rigs.oil; const rgl = rg && rg.points[rg.points.length - 1]; const rgy = rg && rg.points.find(p => p[0] === addM(rgl[0], -12));
    ctx.push({label: '미국 원유 리그', value: rgl && rgl[1], unit: '기', digits: 0, date: rgl && rgl[0], freq: 'M', note: rgy ? '전년 ' + rgy[1] + '기' : '', path: 'U.us_rigs.oil', node: 'n-supply'});
    ctx[3].node = 'n-supply';
    /* 여유 생산능력(STEO 표 3d)과 셰일 미완결 유정(STEO 표 10a): 공급 쪽 완충 · 판정 없음 */
    const SB = U.steo_balance && U.steo_balance.series && U.steo_balance.months ? U.steo_balance : null;
    const steoLast = key => { if (!SB || !SB.series[key]) return null; const v = SB.series[key].values; let i = SB.months.indexOf(SB.last_historical); while (i >= 0 && !isNum(v[i])) i--; if (i < 0) return null; const j = SB.months.indexOf(addM(SB.months[i], -12)); return {m: SB.months[i], v: v[i], y: j >= 0 && isNum(v[j]) ? v[j] : null}; };
    const opS = steoLast('opec_spare'), opO = steoLast('opec_outages');
    if (opS) ctx.push({label: 'OPEC 잉여 원유 생산능력', value: opS.v, unit: '백만 b/d', digits: 2, date: opS.m, freq: 'M', note: (isNum(opS.y) ? '전년 같은 달 ' + fnum(opS.y, 2) : '') + (opO ? ' · 비계획 차질 ' + fnum(opO.v, 2) : '') + ' · STEO ' + fdate(SB.edition, 'M'), path: 'U.steo_balance.series.opec_spare', node: 'n-supply'});
    const sentSpare = opS ? say(SAY.c2.spare, {m: fdate(opS.m, 'M'), x: fnum(opS.v, 2), y: fnum(opS.y, 2), c: c2(isNum(opS.y) ? opS.v - opS.y : null), ed: fdate(SB.edition, 'M')}, 'OPEC 잉여 생산능력(STEO)') : null;
    if (opS) addIn('c2', 'OPEC 잉여 생산능력·비계획 차질', 'U.steo_balance.series.{opec_spare,opec_outages,opec_capacity}', 'EIA STEO', opS.m, 'M');
    /* 브렌트−WTI: 현물 주평균(같은 주) · 근월물(같은 날 T 행) */
    const mW = new Map((S.wti && S.wti.weekly) || []);
    const bwSpot = ((S.brent && S.brent.weekly) || []).filter(([d]) => mW.has(d)).map(([d, v]) => [d, v - mW.get(d)]);
    const bwW = arrWin(bwSpot, days); const bwL = bwSpot[bwSpot.length - 1];
    const mTw = new Map(tw ? tw.rows.map(r => [r[0], r]) : []);
    const bwFut = tb ? tb.rows.filter(r => mTw.has(r[0])).map(r => [r[0], r[1] - mTw.get(r[0])[1], r[3], mTw.get(r[0])[3]]) : [];
    const bwFL = bwFut[bwFut.length - 1];
    ctx.splice(2, 0, {label: '브렌트−WTI 현물 (주평균)', value: bwL && bwL[1], unit: '$', digits: 2, date: bwL && bwL[0], freq: 'W', delta: bwW ? fsg(bwW.abs, 2) + '$ (' + fdate(bwW.d0) + '부터)' : null, note: '③ 크랙의 원유 기준 차이', path: 'S.brent.weekly − S.wti.weekly'});
    ctx.splice(3, 0, {label: '브렌트−WTI 근월물', value: bwFL && bwFL[1], unit: '$', digits: 2, date: bwFL && bwFL[0], freq: 'D', note: bwFL ? fctr(bwFL[2]) + ' − ' + fctr(bwFL[3]) : '', path: 'T.brent M1 − T.wti M1 (같은 날)'});
    /* 월물 표시 결함 */
    const faults = [['S.brent_fut.last', trueContract(S.brent_fut, 'last', tb)], ['S.wti_fut.last', trueContract(S.wti_fut, 'last', tw)]].filter(([, z]) => z && z.fault).map(([key, z]) => ({key, d: z.date, tag: z.tag, act: z.c}));
    const pr = rk && rk.part;
    const sentences = [
      say(SAY.c2.dir, {c: fctr(lastB && lastB[3]), w: win, dv: fabs(bw && bw.abs, 2), p: fabs(bw && bw.pct, 1), s: bw && !bw.short ? s3(bw.abs, rows[0].dir.v === '보합') : null, d: fdate(lastB && lastB[0])}, '브렌트 근월물 ' + win + ' 변화(' + (bw && bw.reason || '') + ')'),
      say(SAY.c2.str, {sp: fnum(spB && spB.last[1], 2), w: win, ds: fabs(spB && spB.w && spB.w.abs, 2), s2: spB && spB.w ? s3(spB.w.abs) : null, d2: fdate(bNow && bNow.d), b: fabs(bNow && bNow.v, 2), c: c2(bNow && bNow.v)}, '근월−차월 ' + win + ' 변화'),
      say(SAY.c2.lvl, {from: fym(rk && rk.from), N: rk && rk.N, k: rk && rk.k, m: fdate(rk && rk.m, 'M'), pm: pr && fdate(pr.m, 'M'), n: pr && pr.n, N2: pr && pr.N, k2: pr && pr.k}, '브렌트 월평균'),
      say(SAY.c2.bw, {y: fnum(bwL && bwL[1], 2), w: win, y0: fnum(bwW && bwW.v0, 2), s: bwW ? s3(Math.abs(bwW.v1) - Math.abs(bwW.v0)) : null, d: fdate(bwL && bwL[0]), x: fnum(bwFL && bwFL[1], 2), d2: fdate(bwFL && bwFL[0])}, '브렌트−WTI'),
      say(SAY.c2.grade, {m: fdate(bdl && bdl[0], 'M'), g: fabs(bdl && bdl[1], 2), c: c2(bdl && bdl[1])}, '브렌트−두바이')
    ].concat(faults.map(z => say(SAY.c2.fault, {key: z.key, d: fdate(z.d), tag: fctr(z.tag), act: fctr(z.act)}, '월물 표시')), sentSpare ? [sentSpare] : []);
    if (pr && rows[0].pos) rows[0].pos.text = fdate(rk.m, 'M') + ' ' + rk.N + '중 ' + rk.k + '위 · ' + fdate(pr.m, 'M') + '(' + pr.n + '일) ' + pr.k + '위';
    addIn('c2', '브렌트 근월·차월 (월물 표시)', 'T.brent.rows [date, M1, M2, cM1, cM2]', 'Yahoo', lastB && lastB[0], 'D', (tb ? tb.rows.length : 0) + '일');
    addIn('c2', '브렌트 현물', 'S.brent.{last,w1,m1,weekly,monthly}', 'FRED', S.brent.last.date, 'D');
    addIn('c2', '브렌트 선물 주평균 (σ용)', 'S.brent_fut.weekly', 'Yahoo', S.brent_fut.weekly.slice(-1)[0][0], 'W');
    addIn('c2', 'WTI 근월·차월', 'T.wti.rows', 'Yahoo', lastW && lastW[0], 'D');
    addIn('c2', '브렌트·두바이 (IMF)', 'S.brent_imf, S.dubai_imf .monthly', 'IMF', bdl && bdl[0], 'M');
    /* M9 사건 정렬: T M1 의 ±5 거래일 */
    const evs = records.filter(r => r.ed && !r.ed.approx && [1, 2, 3].includes(r.stage) && tb && tOf(r.ed.d) >= tOf(tb.rows[0][0]));
    const study = evs.map(r => { const rows = tb.rows; let i = rows.findIndex(x => tOf(x[0]) >= tOf(r.ed.d)); if (i < 0) return {r, pre: null, post: null}; const a = rows[Math.max(0, i - 5)], b = rows[i], c = rows[Math.min(rows.length - 1, i + 5)]; return {r, d: b[0], pre: i - 5 >= 0 ? b[1] - a[1] : null, post: i + 5 < rows.length ? c[1] - b[1] : null}; });
    const tabs = [
      {id: 'm5', label: '구조', model: 'M5', primary: true, vis: {type: 'c2struct', m1: tb ? tb.rows.slice(-40).map(r => [r[0], r[1]]) : [], sp: spB ? spB.arr.slice(-40) : [], basis: basisWeekly.slice(-8), rows: rows.slice(0, 3), rank: rk}},
      {id: 'trend', label: '추세', model: 'M1', vis: {type: 'lines', title: '브렌트·WTI 근월물과 차월물 ($/배럴)', x: 'date', series: [{name: '브렌트 M1', pts: tb ? tb.rows.map(r => [r[0], r[1]]) : []}, {name: '브렌트 M2', pts: tb ? tb.rows.map(r => [r[0], r[2]]) : [], dash: true}, {name: 'WTI M1', pts: tw ? tw.rows.map(r => [r[0], r[1]]) : [], alt: true}]}},
      {id: 'grade', label: '등급', model: 'M5', vis: {type: 'mbars', title: '브렌트−두바이 (IMF 월간, $/배럴)', bars: bd.slice(-12)}},
      {id: 'event', label: '사건', model: 'M9', vis: {type: 'study', unit: '$', title: '브렌트 근월물, 기록일 ±5거래일 변화', study, note: '같은 기간 다른 요인이 함께 반영된다.'}}
    ];
    tabs.splice(2, 0, {id: 'bw', label: '원유 기준', model: 'M5', vis: {type: 'lines', title: '브렌트−WTI ($/배럴) · 현물 주평균과 근월물(같은 날)', x: 'date', series: [{name: '현물 주평균', pts: bwSpot.slice(-60)}, {name: '근월물', pts: bwFut.map(r => [r[0], r[1]]), alt: true}], zero: true}});
    if (faults.length) addIn('c2', '월물 표시 결함 검출 (T 행 대조)', faults.map(z => z.key).join(', '), '계산', faults[0].d, 'D', faults.length + '건');
    const flags = faults.length ? ['월물 표시 결함 ' + faults.length] : [];
    if (pr && pr.verdict !== rows[0].lvl.v) flags.push('부분월 수준 다름');
    /* 내년 12월물(curve): 한 계약의 일별 종가라 창 안 만기 교체가 없다. 판정 행(근월물)과 따로 둔 맥락이다 */
    extra(() => {
      const out = [];
      for (const [k, name, t] of [['brent', '브렌트', tb], ['wti', 'WTI', tw]]) {
        const o = curveOf(k); if (!o || !o.z) continue;
        const daily = (Array.isArray(o.c.daily) ? o.c.daily : []).filter(p => Array.isArray(p) && isD(p[0]) && isNum(p[1]));
        const w = arrWin(daily, days), tr = t && t.rows ? t.rows.find(r => r[0] === o.z.last.date) : null, sp = tr && isNum(tr[1]) ? tr[1] - o.z.last.value : null;
        out.push({k, name, o, daily, w, sp, c1: tr && tr[3]});
        /* 이전 실행 값: 그 월물만 못 받으면 월물에, 그 유종의 월물을 하나도 못 받으면 블록 전체(curve.<유종>)에 carried 가 붙는다 */
        ctx.push({label: name + ' ' + fctr(o.c.anchor), value: o.z.last.value, unit: '$', digits: 2, date: o.z.last.date, freq: 'D', delta: w ? fsg(w.abs, 2) + '$ (' + fdate(w.d0) + '부터)' : null,
          note: nj(isNum(sp) ? '같은 날 근월물보다 ' + fnum(Math.abs(sp), 2) + '달러 ' + (sp >= 0 ? '낮다' : '높다') : null, '한 계약 일별 · 만기 교체 없음', o.c.carried || o.z.carried ? '이전 실행 값' : null), path: 'curve.' + k + '.{daily,contracts} · T.' + k + '.rows', node: 'n-crude'});
      }
      if (!out.length) return;
      const B = out.find(x => x.k === 'brent');
      if (B && B.w) { const s = sayOk(SAY.c2.back, {c: fctr(B.o.c.anchor), w: win, dv: fabs(B.w.abs, 2), s: s3(B.w.abs), d: fdate(B.o.z.last.date), c1: fctr(B.c1), sp: fabs(B.sp, 2), k: c2(B.sp)}); if (s) sentences.push(s); }
      const tr = tabs.find(x => x.id === 'trend');
      if (B && tr && tb && tb.rows.length && B.daily.length) tr.vis.series.push({name: '브렌트 ' + fctr(B.o.c.anchor), pts: B.daily.filter(p => tOf(p[0]) >= tOf(tb.rows[0][0])), alt: true, dash: true});
      addIn('c2', '브렌트·WTI ' + fctr(out[0].o.c.anchor), 'curve.{brent,wti}.{daily,contracts}', 'Yahoo', out.map(x => x.o.z.last.date).sort()[0], 'D', out.map(x => x.name + ' ' + x.daily.length + '일').join(' · '));
      if (out.length === 2) got.add('2027년 12월물 브렌트·WTI');
    });
    /* 비OPEC 생산(STEO 표 3b): 브라질·가이아나·아르헨티나. 실적 마지막 달(EIA 추정)과 전년 같은 달 */
    extra(() => {
      const ps = ['prod_br', 'prod_gy', 'prod_ar'].map(steoLast); if (!ps.every(Boolean) || !ps.every(p => p.m === ps[0].m && isNum(p.v))) return;
      const x = ps.reduce((s, p) => s + p.v, 0), y = ps.every(p => isNum(p.y)) ? ps.reduce((s, p) => s + p.y, 0) : null;
      ctx.push({label: '브라질·가이아나·아르헨티나 생산', value: x, unit: '백만 b/d', digits: 2, date: ps[0].m, freq: 'M', note: nj(isNum(y) ? '전년 같은 달 ' + fnum(y, 2) : null, 'BR ' + fnum(ps[0].v, 2), 'GY ' + fnum(ps[1].v, 2), 'AR ' + fnum(ps[2].v, 2), 'STEO ' + fdate(SB.edition, 'M') + '판 추정'), path: 'U.steo_balance.series.{prod_br,prod_gy,prod_ar}', node: 'n-supply'});
      if (isNum(y)) { const s = sayOk(SAY.c2.nonopec, {m: fdate(ps[0].m, 'M'), x: fnum(x, 2), d: fabs(x - y, 2), s: s3(x - y), ed: fdate(SB.edition, 'M')}); if (s) sentences.push(s); }
      addIn('c2', '비OPEC 생산 BR·GY·AR (STEO 표 3b)', 'U.steo_balance.series.{prod_br,prod_gy,prod_ar}', 'EIA STEO', ps[0].m, 'M');
      got.add('비OPEC BR·GY·AR 생산');
    });
    checks.c2 = {rows, ctx, flags, sentences, tabs, primary: 0, posRow: 0, kpiSub: spB ? 'M1−M2 ' + fsg(spB.last[1], 2) + ' · 현물−근월 ' + (bNow ? fsg(bNow.v, 2) : '미수집') : null,
      bw, spB, bNow, bwSpot, bwFut, faults};
  });

  /* ================= C3 크랙 (M6 분해 · 판정은 현물 주평균, 선물은 같은 월물 창만) ================= */
  guard('c3', function () {
    const ho = S.ho_fut, rb = S.rbob_fut, cl = S.wti_fut;
    const mHo = new Map(ho.daily), mRb = new Map(rb.daily), mCl = new Map(cl.daily);
    const mT = new Map((T.wti ? T.wti.rows : []).map(r => [r[0], r[1]]));   /* 근월물 WTI는 T 행 우선 (만기일 결함) */
    const dates = ho.daily.map(d => d[0]).filter(d => mRb.has(d) && (mT.has(d) || mCl.has(d)));
    const g = [], u = [], c = [], p = [];
    for (const d of dates) { const w = mT.has(d) ? mT.get(d) : mCl.get(d); const gv = mRb.get(d) * 42 - w, uv = mHo.get(d) * 42 - w; g.push([d, gv]); u.push([d, uv]); c.push([d, (2 * gv + uv) / 3]); p.push([d, uv - gv]); }
    function rollFor(wdays) {
      if (wdays === 7) return (ho.w1 && ho.w1.contract !== ho.last.contract) || (rb.w1 && rb.w1.contract !== rb.last.contract) ? '만기 교체' : null;
      if (wdays === 28) return (ho.m1 && ho.m1.contract !== ho.last.contract) || (rb.m1 && rb.m1.contract !== rb.last.contract) ? '만기 교체' : null;
      return '만기 교체';   /* RB·HO는 매달 교체: 한 달을 넘는 창은 교체를 포함한다 */
    }
    const yoy = arr => { const last = arr[arr.length - 1]; const a = atOrBefore(arr, tOf(last[0]) - 365 * DAY); return a && a[1] ? {x: last[1] / a[1], d0: a[0], v0: a[1]} : null; };
    /* 현물 크랙: 주평균(같은 주) · 월평균 */
    const crackW = (k, base) => { const mb = new Map(S[base].weekly || []); return (S[k].weekly || []).filter(([d]) => mb.has(d)).map(([d, v]) => [d, v * 42 - mb.get(d)]); };
    const crackM = (k, base) => { const o = {}; for (const [m, v] of mArr(S[k].monthly)) { const b = S[base].monthly[m]; if (isNum(b)) o[m] = v * 42 - b; } return o; };
    const crackPartial = (k, base) => S[k].partial_month && S[base].partial_month && S[k].partial_month.month === S[base].partial_month.month ? {m: S[k].partial_month.month, v: S[k].partial_month.value * 42 - S[base].partial_month.value, n: Math.min(S[k].partial_month.n, S[base].partial_month.n)} : null;
    const mk321 = (ga, ua) => { const mu = new Map(ua); return ga.filter(([d]) => mu.has(d)).map(([d, v]) => [d, (2 * v + mu.get(d)) / 3]); };
    const m321 = base => { const gm = crackM('nyh_gasoline', base), um = crackM('nyh_ulsd', base); const o = {}; for (const m of Object.keys(gm)) if (isNum(um[m])) o[m] = (2 * gm[m] + um[m]) / 3; return o; };
    const p321 = base => { const a = crackPartial('nyh_gasoline', base), b = crackPartial('nyh_ulsd', base); return a && b ? {m: a.m, v: (2 * a.v + b.v) / 3, n: Math.min(a.n, b.n)} : null; };
    const wG = crackW('nyh_gasoline', 'brent'), wU = crackW('nyh_ulsd', 'brent'), wH = crackW('nyh_heating_oil', 'brent');
    const wGw = crackW('nyh_gasoline', 'wti'), wUw = crackW('nyh_ulsd', 'wti');
    const w321 = mk321(wG, wU), w321w = mk321(wGw, wUw);
    function spotW(id, label, sub, arr, mobj, partial, path) {
      const l = arr[arr.length - 1]; const w = arrWin(arr, days); const ch = changesByDays(arr, days, false);
      const lm = mLastFull(mobj); const band = lm ? sameMonthBand(mobj, lm, 2022, 2025) : null; const bp = band ? bandPos(mobj[lm], band, -1) : null;
      if (bp) { bp.years = band[3]; bp.m = lm; bp.text = fdate(lm, 'M') + ' 범위 ' + bp.pos; }
      return {id, label, sub, judged: true, value: l && l[1], unit: '$', digits: 2, date: l && l[0], freq: 'W', dateNote: '주평균',
        delta: w ? {abs: w.abs, unit: '$', show: fsg(w.abs, 2) + '$', w: win, d0: w.d0, d1: w.d1, basis: '주평균'} : null,
        pos: bp, dir: judgeDir(w && w.abs, -1, sd(ch), ch.length, rule), lvl: bp ? {v: bp.verdict} : {v: '미수집'}, path, src: 'FRED', mobj, arr, partial, lvlMonth: lm};
    }
    const wC = arrWin(c, days), roll = rollFor(days), chC = changesByDays(c, days, false), yC = yoy(c), yU = yoy(u), yP = yoy(p);
    const lastC = c[c.length - 1], lastU = u[u.length - 1], lastG = g[g.length - 1], lastP = p[p.length - 1];
    const rows = [
      spotW('c3-321b', '3-2-1 현물 · 브렌트 기준', '뉴욕항 · 주평균', w321, m321('brent'), p321('brent'), '(2·S.nyh_gasoline + S.nyh_ulsd)/3 ×42 − S.brent (.weekly)'),
      spotW('c3-321w', '3-2-1 현물 · WTI 기준', '뉴욕항 · 주평균', w321w, m321('wti'), p321('wti'), '(2·S.nyh_gasoline + S.nyh_ulsd)/3 ×42 − S.wti (.weekly)'),
      spotW('c3-ulsd', 'ULSD 크랙 현물', '뉴욕항 · 브렌트 기준', wU, crackM('nyh_ulsd', 'brent'), crackPartial('nyh_ulsd', 'brent'), 'S.nyh_ulsd×42 − S.brent (.weekly)'),
      spotW('c3-ho', '난방유 크랙 현물', '뉴욕항 · 브렌트 기준', wH, crackM('nyh_heating_oil', 'brent'), crackPartial('nyh_heating_oil', 'brent'), 'S.nyh_heating_oil×42 − S.brent (.weekly)'),
      {id: 'c3-fut', label: '3-2-1 선물 (NYMEX)', sub: roll ? '창 안 만기 교체 · 방향 판정 없음' : '같은 월물', judged: true, value: lastC && lastC[1], unit: '$', digits: 2, date: lastC && lastC[0], freq: 'D',
        delta: wC ? {abs: wC.abs, unit: '$', show: fsg(wC.abs, 2) + '$', w: win, d0: wC.d0, roll} : null,
        pos: yC ? {...multPos(yC.x), text: '전년 같은 날 ×' + fnum(yC.x, 2), y0: yC.d0} : null, dir: judgeDir(wC && wC.abs, -1, sd(chC), chC.length, rule, roll), path: '(2·RB + HO)/3 ×42 − CL (WTI 다리는 T 행 M1)', src: 'Yahoo', arr: c}
    ];
    rows[4].lvl = rows[4].pos ? {v: rows[4].pos.verdict} : {v: '미수집'};
    const [rB, rW, rU, rH, rF] = rows;
    const decOf = (ga, ua, wdays) => { const a = arrWin(ga, wdays), b = arrWin(ua, wdays); if (!a || !b) return null; return {dg: a.abs, du: b.abs, gPart: a.abs * 2 / 3, uPart: b.abs / 3, dc: a.abs * 2 / 3 + b.abs / 3, d0: a.d0, d1: a.d1}; };
    const WL = {7: '1주', 28: '4주', 91: '13주', 364: '52주'};
    const decB = decOf(wG, wU, days), decWt = decOf(wGw, wUw, days);
    const alt = days === 91 ? 28 : 91; const decB2 = decOf(wG, wU, alt);
    const decF = !roll ? decOf(g, u, days) : null;
    const bars = [];
    if (decB) bars.push({...decB, w: win, name: win + ' · 현물 브렌트 기준', note: fdate(decB.d0) + '→' + fdate(decB.d1) + ' 주평균'});
    if (decWt) bars.push({...decWt, w: win, name: win + ' · 현물 WTI 기준', note: fdate(decWt.d0) + '→' + fdate(decWt.d1) + ' 주평균'});
    if (decB2) bars.push({...decB2, w: WL[alt], name: WL[alt] + ' · 현물 브렌트 기준', note: fdate(decB2.d0) + '→' + fdate(decB2.d1) + ' 주평균'});
    if (decF) bars.push({...decF, w: win, name: win + ' · 선물 같은 월물', note: fdate(decF.d0) + '→' + fdate(decF.d1) + ' 일별'});
    /* 브렌트−WTI 현물 (같은 주) */
    const mWt = new Map(S.wti.weekly || []); const bwArr = (S.brent.weekly || []).filter(([d]) => mWt.has(d)).map(([d, v]) => [d, v - mWt.get(d)]); const bwW = arrWin(bwArr, days);
    /* 규칙: 분할(경유 버팀) · 원유 기준 따라 방향 다름 */
    const flags = [];
    const split = rB.delta && rU.delta && rB.delta.abs < 0 && rU.delta.abs > 0 && rU.dir.v !== '보합';
    if (split) flags.push('경유 버팀');
    const legDiff = ['부합', '불일치'].includes(rB.dir.v) && ['부합', '불일치'].includes(rW.dir.v) && rB.dir.v !== rW.dir.v;
    if (legDiff) flags.push('원유 기준 따라 방향 다름');
    if (roll) flags.push('선물 만기 교체');
    const nyg = crackM('nyh_gasoline', 'brent'); const lmG = mLastFull(nyg); const bG = lmG ? sameMonthBand(nyg, lmG, 2022, 2025) : null; const pG = bG ? bandPos(nyg[lmG], bG, -1) : null;
    const jetM = crackM('usgc_jet', 'wti'); const lmJ = mLastFull(jetM); const bJ = lmJ ? sameMonthBand(jetM, lmJ, 2022, 2025) : null; const pJ = bJ ? bandPos(jetM[lmJ], bJ, -1) : null;
    const ctx = [
      {label: 'ULSD 크랙 선물 (NYMEX)', value: lastU && lastU[1], unit: '$', digits: 2, date: lastU && lastU[0], freq: 'D', delta: arrWin(u, days) ? fsg(arrWin(u, days).abs, 2) + '$' + (roll ? ' · 교체' : '') : null, note: yU ? '전년 같은 날 ×' + fnum(yU.x, 2) : '', path: 'HO×42 − CL'},
      {label: '휘발유 크랙 선물 (NYMEX)', value: lastG && lastG[1], unit: '$', digits: 2, date: lastG && lastG[0], freq: 'D', delta: arrWin(g, days) ? fsg(arrWin(g, days).abs, 2) + '$' + (roll ? ' · 교체' : '') : null, path: 'RB×42 − CL'},
      {label: '경유 프리미엄 선물 (ULSD−휘발유)', value: lastP && lastP[1], unit: '$', digits: 2, date: lastP && lastP[0], freq: 'D', note: yP ? '전년 같은 날 ×' + fnum(yP.x, 1) : '', path: 'u − g'},
      {label: '뉴욕항 휘발유 크랙 (월)', value: lmG ? nyg[lmG] : null, unit: '$', digits: 2, date: lmG, freq: 'M', note: pG ? '같은 달 범위 ' + pG.pos : '', path: 'S.nyh_gasoline×42 − S.brent (.monthly)'},
      {label: 'USGC 항공유 크랙 (월)', value: lmJ ? jetM[lmJ] : null, unit: '$', digits: 2, date: lmJ, freq: 'M', note: pJ ? '같은 달 범위 ' + pJ.pos : '', path: 'S.usgc_jet×42 − S.wti (.monthly)'},
      {label: '브렌트−WTI 현물 (주평균)', value: bwArr.length ? bwArr[bwArr.length - 1][1] : null, unit: '$', digits: 2, date: bwArr.length ? bwArr[bwArr.length - 1][0] : null, freq: 'W', delta: bwW ? fsg(bwW.abs, 2) + '$' : null, note: '크랙 원유 기준 차이', path: 'S.brent.weekly − S.wti.weekly'}
    ];
    const sentences = [
      say(SAY.c3.dec, {w: win, dv: fabs(decB && decB.dc, 2), s: decB ? s3(decB.dc, rB.dir.v === '보합') : null, d0: fdate(decB && decB.d0), d1: fdate(decB && decB.d1), g: fsg(decB && decB.gPart, 2), u: fsg(decB && decB.uPart, 2)}, '3-2-1 현물 분해'),
      say(SAY.c3.leg, {dv: fabs(decWt && decWt.dc, 2), s: decWt ? s3(decWt.dc, rW.dir.v === '보합') : null, b0: fnum(bwW && bwW.v0, 2), b1: fnum(bwW && bwW.v1, 2), c: decB && decWt ? (Math.sign(decB.dc) === Math.sign(decWt.dc) ? 0 : 1) : null}, 'WTI 기준 3-2-1'),
      roll ? say(SAY.c3.roll, {w: win}, '') : say(SAY.c3.fut, {w: win, dv: fabs(wC && wC.abs, 2), s: wC ? s3(wC.abs, rF.dir.v === '보합') : null}, '선물 3-2-1'),
      say(SAY.c3.lvl, {m: fdate(rB.lvlMonth, 'M'), by: 2022, ey: 2025, p3: rB.pos && rB.pos.pos, pu: posEnd(rU.pos && rU.pos.pos)}, '뉴욕항 크랙 같은 달 범위'),
      say(SAY.c3.prem, {x: fnum(lastP && lastP[1], 2), k: fnum(yP && yP.x, 1), d: fdate(lastP && lastP[0])}, '경유 프리미엄 전년비')
    ];
    addIn('c3', '뉴욕항 휘발유·ULSD·난방유 현물 주평균', 'S.nyh_{gasoline,ulsd,heating_oil}.weekly', 'FRED', wU.length ? wU[wU.length - 1][0] : null, 'W', wU.length + '주');
    addIn('c3', '브렌트·WTI 현물 주평균', 'S.brent.weekly, S.wti.weekly', 'FRED', bwArr.length ? bwArr[bwArr.length - 1][0] : null, 'W');
    addIn('c3', '현물 월평균 (같은 달 범위용)', 'S.nyh_*.monthly, S.brent.monthly, S.wti.monthly', 'FRED', rB.lvlMonth, 'M', '2022–25');
    addIn('c3', 'RBOB·ULSD 선물 일별', 'S.rbob_fut.daily, S.ho_fut.daily', 'Yahoo', ho.last.date, 'D', ho.daily.length + '일');
    addIn('c3', 'WTI 근월물 (T 행, 없으면 일별)', 'T.wti.rows[M1] · S.wti_fut.daily', 'Yahoo', lastC && lastC[0], 'D');
    addIn('c3', 'RB·HO 월물 표시', 'S.{rbob,ho}_fut.{last,w1,m1}.contract', 'Yahoo', ho.last.date, 'D', 'HO ' + ho.last.contract + ' · RB ' + rb.last.contract);
    /* 크랙 행렬 (구조 탭): 날짜를 칸마다 둔다 */
    const matW = (name, arr, mobj, bp) => { const l = arr[arr.length - 1]; const a1 = arrWin(arr, 7), a4 = arrWin(arr, 28); const y = atOrBefore(arr, tOf(l[0]) - 364 * DAY); return {name, v: l[1], d: l[0], freq: 'W', d1: a1 && a1.abs, d4: a4 && a4.abs, dy: y ? l[1] - y[1] : null, yd: y && y[0], pos: bp ? bp.pos : null, posM: bp ? bp.m : null, wk: true}; };
    const matF = (name, arr) => { const l = arr[arr.length - 1]; const a1 = arrWin(arr, 7), a4 = arrWin(arr, 28), y = yoy(arr); return {name, v: l[1], d: l[0], freq: 'D', d1: a1 && a1.abs, r1: rollFor(7), d4: a4 && a4.abs, r4: rollFor(28), yx: y && y.x}; };
    const matrix = [matW('3-2-1 현물 · 브렌트', w321, null, rB.pos), matW('3-2-1 현물 · WTI', w321w, null, rW.pos), matW('ULSD 현물 · 브렌트', wU, null, rU.pos), matW('난방유 현물 · 브렌트', wH, null, rH.pos), matW('휘발유 현물 · 브렌트', wG, null, pG ? {...pG, m: lmG} : null),
      matF('3-2-1 선물', c), matF('ULSD 선물', u), matF('휘발유 선물', g), matF('경유 프리미엄 선물', p)];
    /* 계절 탭: 3-2-1 현물(브렌트) 1–12월, 2022–25 범위 */
    const o = rB.mobj; const band = []; for (let mo = 1; mo <= 12; mo++) { const b = sameMonthBand(o, '2025-' + String(mo).padStart(2, '0'), 2022, 2025); band.push(b ? b.slice(0, 3) : null); }
    const yline = y => Array.from({length: 12}, (_, i) => { const v = o[y + '-' + String(i + 1).padStart(2, '0')]; return isNum(v) ? v : null; });
    const study = records.filter(r => r.ed && !r.ed.approx && [4, 5].includes(r.stage) && tOf(r.ed.d) >= tOf(c[0][0])).map(r => { let i = c.findIndex(x => tOf(x[0]) >= tOf(r.ed.d)); if (i < 0) return {r, pre: null, post: null}; return {r, d: c[i][0], pre: i >= 5 ? u[i][1] - u[i - 5][1] : null, post: i + 5 < u.length ? u[i + 5][1] - u[i][1] : null, pre2: i >= 5 ? c[i][1] - c[i - 5][1] : null, post2: i + 5 < c.length ? c[i + 5][1] - c[i][1] : null}; });
    const tabs = [
      {id: 'm6', label: '분해', model: 'M6', primary: true, vis: {type: 'decomp', bars, unit: '$', legend: ['휘발유 몫 ⅔Δg', '경유 몫 ⅓Δu'], roll}},
      {id: 'struct', label: '구조', model: 'M5', vis: {type: 'crackmatrix', matrix}},
      {id: 'season', label: '계절', model: 'M3', vis: {type: 'calband', title: '뉴욕항 3-2-1 현물 크랙(브렌트 기준) · 같은 달 2022–25 범위 ($/배럴)', unit: '$', x: 'month', band, cur: yline(CUR_YEAR), prev: yline(CUR_YEAR - 1), curLabel: String(CUR_YEAR), prevLabel: String(CUR_YEAR - 1), partial: rB.partial}},
      {id: 'trend', label: '추세', model: 'M1', vis: {type: 'lines', title: '3-2-1 크랙 ($/배럴) · 현물 주평균(브렌트·WTI 기준)과 선물 일별', x: 'date', series: [{name: '현물·브렌트', pts: w321.slice(-56)}, {name: '현물·WTI', pts: w321w.slice(-56), alt: true}, {name: '선물', pts: c.filter(x => tOf(x[0]) >= tOf(w321[Math.max(0, w321.length - 56)][0])), dash: true}]}},
      {id: 'event', label: '사건', model: 'M9', vis: {type: 'study', unit: '$', title: 'ULSD 크랙 · 3-2-1 선물, 정유·출하 기록일 ±5거래일', study, two: ['ULSD', '3-2-1'], note: '같은 기간 다른 요인이 함께 반영된다. 선물 연결 값이라 창 안 만기 교체가 섞일 수 있다.'}}
    ];
    /* 같은 월물 3-2-1(crack): RB·HO·CL 세 다리가 모두 같은 계약 월인 일별 값. 맥락 행과 탭으로만 둔다(선물 판정 행과 만기 교체 표시는 그대로) */
    extra(() => {
      const K = L.crack; if (!K || typeof K !== 'object' || !Array.isArray(K.rows) || !isM(K.month)) return;
      const sm = K.rows.filter(r => Array.isArray(r) && isD(r[0]) && [r[1], r[2], r[3]].every(isNum)).map(r => [r[0], (2 * r[1] + r[2]) / 3 * 42 - r[3]]);
      if (sm.length < 2) return;
      const l = sm[sm.length - 1], w = arrWin(sm, days), syms = Object.values(K.symbols || {}).filter(x => typeof x === 'string').map(x => x.replace(/\.NYM$/, '')).join('·');
      ctx.push({label: '3-2-1 선물 같은 월물 (' + fctr(K.month) + ')', value: l[1], unit: '$', digits: 2, date: l[0], freq: 'D', delta: w ? fsg(w.abs, 2) + '$ (' + fdate(w.d0) + '부터)' : null,
        note: nj(syms, sm.length + '일', w && days === 364 ? '1년 전은 원월물 시기(거래 적음)' : null, K.carried ? '이전 실행 값' : null), path: 'crack.rows [date, RB, HO, CL]'});
      const t0 = sm[Math.max(0, sm.length - 130)][0];
      tabs.push({id: 'same', label: '같은 월물', model: 'M5', vis: {type: 'lines', title: '3-2-1 선물 ($/배럴) · 같은 월물(' + fctr(K.month) + ')과 근월물 연결', x: 'date', series: [{name: '같은 월물', pts: sm.filter(p => p[0] >= t0)}, {name: '근월물 연결', pts: c.filter(p => p[0] >= t0), alt: true, dash: true}]}});
      addIn('c3', 'NYMEX 3-2-1 같은 월물 (' + fctr(K.month) + ')', 'crack.rows [date, RB, HO, CL]', 'Yahoo', l[0], 'D', sm.length + '일');
      if (sm.length > 60 && !K.carried) got.add('RB·HO 월물 구분');
    });
    checks.c3 = {rows, ctx, flags, sentences, tabs, primary: 0, posRow: 0, split, legDiff, roll, decB, decWt, bwArr,
      kpiSub: decWt && rW.delta ? 'WTI 기준 ' + fsg(rW.delta.abs, 2) + ' · ULSD ' + (rU.delta ? fsg(rU.delta.abs, 2) : '—') : null};
  });

  /* ================= C4 소매 연료 (M6, M7) ================= */
  guard('c4', function () {
    function retailRow(id, label, key) {
      const s = S[key]; let r = null;
      if (days === 7 || days === 28) { const a = days === 7 ? s.w1 : s.m1; r = {abs: s.last.value - a.value, pct: (s.last.value / a.value - 1) * 100, d0: a.date, d1: s.last.date}; }
      else { const lm = mLastFull(s.monthly), a = s.monthly[addM(lm, -months)]; if (isNum(a)) r = {abs: s.monthly[lm] - a, pct: (s.monthly[lm] / a - 1) * 100, d0: addM(lm, -months), d1: lm, monthly: true}; }
      const ch1 = Object.values(mChg(s.monthly, days <= 28 ? 1 : months, true)); const sig = sd(ch1) * (days === 7 ? Math.sqrt(7 / 30.4) : 1);
      const rk = rankOf(key, -1);
      return {id, label, sub: r && r.monthly ? '월평균 기준' : '주간 · ' + (s.ref || ''), judged: true, value: s.last.value, unit: '$', digits: 3, date: s.last.date, freq: 'W',
        delta: r ? {abs: r.abs, pct: r.pct, unit: '$', show: fsg(r.abs, 3) + '$', w: win, d0: r.d0, basis: days === 7 ? '월 σ 환산' : '월 σ'} : null,
        pos: rk, dir: judgeDir(r && r.pct, -1, sig, ch1.length, rule), lvl: rk ? {v: rk.verdict} : {v: '미수집'}, path: 'S.' + key + '.{last,w1,m1,monthly}', src: 'FRED', arr: histOf(s)};
    }
    const rows = [retailRow('c4-gas', '휘발유 소매', 'retail_gasoline'), retailRow('c4-dsl', '경유 소매', 'retail_diesel')];
    function decomp(rk, wk, name) {
      const r = S[rk].monthly, w = S[wk].monthly; const lm = mLastFull(r); const pm = addM(lm, -1);
      if (![r[lm], r[pm], w[lm], w[pm]].every(isNum)) return null;
      const dR = r[lm] - r[pm], dW = w[lm] - w[pm], dM = dR - dW;
      const marg = {}; for (const m of Object.keys(r)) if (isNum(w[m])) marg[m] = r[m] - w[m];
      const dist = Object.keys(marg).filter(m => m >= '2022-01' && m <= '2025-12').map(m => marg[m]);
      const q = dist.length ? Math.round(dist.filter(x => x <= marg[lm]).length / dist.length * 100) : null;
      return {name, m: lm, m0: pm, dR, dW, dM, margin: marg[lm], q, marg, flag: Math.abs(dM) > Math.abs(dW) && Math.sign(dM) === Math.sign(dW)};
    }
    /* 창 분해: Δ소매(조사일 a→b) = Δ도매(USGC 주평균, 각 조사일 직전 주) + Δ마진. 1주·4주는 주간 앵커, 그 밖은 월평균 */
    function decompWin(rk, wk, name) {
      const s = S[rk], wArr = S[wk].weekly || [];
      if (days === 7 || days === 28) {
        const a = days === 7 ? s.w1 : s.m1; if (!a || !s.last) return null;
        const w0 = atOrBefore(wArr, tOf(a.date)), w1 = atOrBefore(wArr, tOf(s.last.date)); if (!w0 || !w1) return null;
        const dR = s.last.value - a.value, dW = w1[1] - w0[1], dM = dR - dW;
        return {name, w: win, d0: a.date, d1: s.last.date, wd0: w0[0], wd1: w1[0], dR, dW, dM, weekly: true, flag: Math.abs(dM) > Math.abs(dW) && Math.sign(dM) === Math.sign(dW)};
      }
      const r = s.monthly, w = S[wk].monthly; const lm = mLastFull(r), m0 = addM(lm, -months);
      if (![r[lm], r[m0], w[lm], w[m0]].every(isNum)) return null;
      const dR = r[lm] - r[m0], dW = w[lm] - w[m0], dM = dR - dW;
      return {name, w: win, d0: m0, d1: lm, dR, dW, dM, weekly: false, flag: Math.abs(dM) > Math.abs(dW) && Math.sign(dM) === Math.sign(dW)};
    }
    const dG = decomp('retail_gasoline', 'usgc_gasoline', '휘발유'), dD = decomp('retail_diesel', 'usgc_ulsd', '경유');
    const wGd = decompWin('retail_gasoline', 'usgc_gasoline', '휘발유'), wDd = decompWin('retail_diesel', 'usgc_ulsd', '경유');
    const flags = []; if ((wGd && wGd.flag) || (wDd && wDd.flag)) flags.push('마진 몫 > 도매 몫'); else if ((wGd && Math.sign(wGd.dM) === -Math.sign(wGd.dW) && wGd.dM !== 0) || (wDd && Math.sign(wDd.dM) === -Math.sign(wDd.dW) && wDd.dM !== 0)) flags.push('마진 확대(소매 지연)');
    /* 계절성 검정: 휘발유 소매 전월비 vs 같은 달 2022–25 범위 */
    const mm = mChg(S.retail_gasoline.monthly, 1, true); const lmG = mLastFull(S.retail_gasoline.monthly);
    const bandMM = lmG ? sameMonthBand(mm, lmG, 2022, 2025) : null;
    const seaPos = bandMM ? (mm[lmG] < bandMM[0] ? '아래' : mm[lmG] > bandMM[2] ? '위' : '안') : null;
    const seaBand = []; for (let mo = 1; mo <= 12; mo++) { const b = sameMonthBand(mm, '2025-' + String(mo).padStart(2, '0'), 2022, 2025); seaBand.push(b ? b.slice(0, 3) : null); }
    const seaCur = Array.from({length: 12}, (_, i) => { const v = mm[CUR_YEAR + '-' + String(i + 1).padStart(2, '0')]; return isNum(v) ? v : null; });
    /* M7 도매→소매 */
    /* 전가 자리: 도매·소매 계열의 급변 값 */
    const jG = [jumpOf('usgc_gasoline', 'USGC 휘발유'), jumpOf('retail_gasoline', '휘발유 소매')], jD = [jumpOf('usgc_ulsd', 'USGC 경유(ULSD)'), jumpOf('retail_diesel', '경유 소매')];
    const rkD = rows[1].pos;
    const ctx = [
      {label: '휘발유 소매 마진', value: dG && dG.margin, unit: '$/gal', digits: 3, date: dG && dG.m, freq: 'M', note: dG ? '2022–25 분포 ' + dG.q + '백분위' : '', path: 'retail_gasoline − usgc_gasoline (월)'},
      {label: '경유 소매 마진', value: dD && dD.margin, unit: '$/gal', digits: 3, date: dD && dD.m, freq: 'M', note: dD ? '2022–25 분포 ' + dD.q + '백분위' : '', path: 'retail_diesel − usgc_ulsd (월)'},
      {label: '경유−휘발유 소매 차', value: S.retail_diesel.last.value - S.retail_gasoline.last.value, unit: '$/gal', digits: 3, date: S.retail_diesel.last.date, freq: 'W', note: '전년 ' + fnum(S.retail_diesel.y1.value - S.retail_gasoline.y1.value, 3), path: 'retail_diesel − retail_gasoline'},
      {label: 'USGC 항공유 (도매)', value: S.usgc_jet.last.value, unit: '$/gal', digits: 3, date: S.usgc_jet.last.date, freq: 'D', note: '소매 항공유 원천 없음', path: 'S.usgc_jet'},
      {label: 'CPI 항공운임', value: S.cpi_airfare.monthly[mLastFull(S.cpi_airfare.monthly)], unit: '지수', digits: 1, date: mLastFull(S.cpi_airfare.monthly), freq: 'M', note: '전월비 ' + fsg(mChg(S.cpi_airfare.monthly, 1, true)[mLastFull(S.cpi_airfare.monthly)], 2) + '%', path: 'S.cpi_airfare'}
    ];
    const sentences = [
      wGd && wGd.weekly ? say(SAY.c4.dec, {w: win, dv: fabs(wGd.dR, 3), s: s3(wGd.dR), d0: fdate(wGd.d0), d1: fdate(wGd.d1), wv: fsg(wGd.dW, 3), k: fsg(wGd.dM, 3)}, '휘발유 소매 창 분해')
        : say(SAY.c4.decM, {m: fdate(wGd && wGd.d1, 'M'), m0: fdate(wGd && wGd.d0, 'M'), dv: fabs(wGd && wGd.dR, 3), s: wGd ? s3(wGd.dR) : null, wv: fsg(wGd && wGd.dW, 3), k: fsg(wGd && wGd.dM, 3)}, '휘발유 소매 분해'),
      say(SAY.c4.sea, {p: fsg(mm[lmG], 1), by: 2022, ey: 2025, lo: fsg(bandMM && bandMM[0], 1), hi: fsg(bandMM && bandMM[2], 1), pos: posEnd(seaPos)}, '휘발유 소매 계절 범위'),
      say(SAY.c4.rank, {from: fym(rkD && rkD.from), N: rkD && rkD.N, k: rkD && rkD.k, m: fdate(rkD && rkD.m, 'M'), pm: rkD && rkD.part && fdate(rkD.part.m, 'M'), n: rkD && rkD.part && rkD.part.n, N2: rkD && rkD.part && rkD.part.N, k2: rkD && rkD.part && rkD.part.k}, '경유 소매 순위'),
      say(SAY.c4.marg, {by: 2022, ey: 2025, q: dD && dD.q}, '경유 소매 마진')
    ];
    addIn('c4', '휘발유·경유 소매 (주간 앵커·월평균)', 'S.retail_{gasoline,diesel}.{last,w1,m1,monthly,partial_month}', 'FRED', S.retail_diesel.last.date, 'W', '주간 배열 없음');
    addIn('c4', 'USGC 휘발유·ULSD 도매 주평균·월평균', 'S.usgc_{gasoline,ulsd}.{weekly,monthly}', 'FRED', (S.usgc_ulsd.weekly || []).length ? S.usgc_ulsd.weekly[S.usgc_ulsd.weekly.length - 1][0] : S.usgc_ulsd.last.date, 'W');
    addIn('c4', 'CPI 항공운임', 'S.cpi_airfare.monthly', 'FRED', S.cpi_airfare.last.date, 'M');
    const tabs = [
      {id: 'm6', label: '분해', model: 'M6', primary: true, vis: {type: 'retaildec', win: [wGd, wDd].filter(Boolean), items: [dG, dD].filter(Boolean), ranks: [rows[0].pos, rows[1].pos]}},
      {id: 'season', label: '계절', model: 'M3', vis: {type: 'calband', title: '휘발유 소매 전월비 · 같은 달 2022–25 범위 (%)', unit: '%', x: 'month', band: seaBand, cur: seaCur, curLabel: String(CUR_YEAR), zero: true}},
      {id: 'jump', label: '급변', model: 'M1', vis: {type: 'jumps', title: '도매 → 소매 · 창 변화와 평소 변화폭 배수', rows: jG.concat(jD), none: jumpNone(jG.concat(jD)), big: rule.big_multiple}},
      {id: 'trend', label: '추세', model: 'M1', vis: {type: 'lines', title: '소매·도매 월평균 ($/갤런)', x: 'month', series: [{name: '경유 소매', pts: mArr(S.retail_diesel.monthly)}, {name: 'USGC ULSD', pts: mArr(S.usgc_ulsd.monthly), dash: true}, {name: '휘발유 소매', pts: mArr(S.retail_gasoline.monthly), alt: true}, {name: 'USGC 휘발유', pts: mArr(S.usgc_gasoline.monthly), alt: true, dash: true}]}}
    ];
    rows.forEach(r => { const rk = r.pos; if (rk && rk.part) { r.pos.text = fdate(rk.m, 'M') + ' ' + rk.N + '중 ' + rk.k + '위 · ' + fdate(rk.part.m, 'M') + '(' + rk.part.n + '회) ' + rk.part.k + '위'; if (rk.part.verdict !== r.lvl.v) flags.push(r.label + ' 부분월 수준 다름'); } });
    /* CPI 자동차 연료·연료유(계절조정): 전월비 맥락 행. 항공유 도매 행 뒤에 둔다 */
    extra(() => {
      const MF = idxStats('cpi_motor_fuel'), FO = idxStats('cpi_fuel_oil');
      const row = (label, st, key) => st && isNum(st.mm) && isM(st.lm) ? {label, value: st.mm, unit: '% 전월비', digits: 2, date: st.lm, freq: 'M', sign: true, path: 'S.' + key + '.monthly',
        note: nj(isNum(st.ann) ? '3개월 연율 ' + fsg(st.ann, 1) + '%' : null, isNum(st.yoy) ? '전년비' + (st.yoyFall ? '* ' : ' ') + fsg(st.yoy, 1) + '%' : null, st.yoyFall ? '기준 ' + fdate(st.yoyFall, 'M') : null)} : null;
      const a = row('CPI 자동차 연료', MF, 'cpi_motor_fuel'), b = row('CPI 연료유', FO, 'cpi_fuel_oil'); if (!a && !b) return;
      const at = ctx.findIndex(r => r.label === 'USGC 항공유 (도매)'); ctx.splice(at < 0 ? ctx.length : at + 1, 0, ...[a, b].filter(Boolean));
      if (a && b && MF.lm === FO.lm) { const s = sayOk(SAY.c4.cpi, {m: fdate(MF.lm, 'M'), x: fabs(MF.mm, 2), s: s3(MF.mm), y: fabs(FO.mm, 2), t: s3(FO.mm)}); if (s) sentences.push(s); }
      addIn('c4', 'CPI 자동차 연료·연료유 (계절조정)', 'S.cpi_{motor_fuel,fuel_oil}.monthly', 'FRED · BLS', (a || b).date, 'M', '25.10 결측');
      if (a && b) got.add('CPI 자동차연료·연료유');
    });
    /* 가정용 난방유 소매(EIA, 10~3월 월요일 조사): 난방철 밖에는 마지막 조사 날짜만 적고 경과일을 세지 않는다.
     * 난방철은 모델의 오늘로 정한다(payload 의 season.in_season 은 수집한 날 기준이라, 이전 실행 값이면 철이 바뀌어도 그대로다).
     * 철 첫 조사는 10월 첫 월요일 것이 그 주 수요일에 나온다. 철 시작(10월 1일)부터 14일 안에 마지막 조사가 철 시작 전이면
     * 첫 조사 전으로 보고 경과일을 세지 않는다. 그 뒤에도 이번 철 조사가 없으면 경과일을 그대로 센다 */
    extra(() => {
      const HO = (U.us_weekly || {}).heating_oil_retail; if (!HO || !HO.last || !isNum(HO.last.value) || !isD(HO.last.date)) return;
      const t = tOf(HO.last.date), td = new Date(today), mo = td.getUTCMonth() + 1;
      const inS = [10, 11, 12, 1, 2, 3].includes(mo), s0 = Date.UTC(td.getUTCFullYear() - (mo >= 10 ? 0 : 1), 9, 1);
      const unseen = inS && t < s0, wait = unseen && today < s0 + 14 * DAY;
      let note = (wait ? '이번 난방철 첫 조사 전' : '난방철(10~3월) 밖') + ' · 마지막 조사 ' + fdate(HO.last.date);
      if (inS && !wait) {
        const w1 = HO.w1 && isNum(HO.w1.value) && isD(HO.w1.date) && t - tOf(HO.w1.date) <= 8 * DAY ? HO.last.value - HO.w1.value : null;
        const sp = S.nyh_heating_oil && Array.isArray(S.nyh_heating_oil.weekly) ? atOrBefore(S.nyh_heating_oil.weekly.filter(p => isNum(p[1])), t) : null;
        note = nj(unseen ? '이번 난방철 조사 아직 없음' : null, isNum(w1) ? '전주 대비 ' + fsg(w1, 3) : null, HO.y1 && isNum(HO.y1.value) ? '전년 같은 주 ' + fnum(HO.y1.value, 3) : null,
          HO.vs5 && isNum(HO.vs5.pct) && Array.isArray(HO.band_years) ? HO.band_years.join('–') + ' 같은 주 평균 대비 ' + fsg(HO.vs5.pct, 1) + '%' : null,
          sp ? '뉴욕항 현물(' + fdate(sp[0]) + ' 주평균)과 차 ' + fsg(HO.last.value - sp[1], 3) : null);
      }
      const onS = inS && !wait;
      ctx.push({label: '가정용 난방유 소매', value: HO.last.value, unit: '$/gal', digits: 3, date: HO.last.date, freq: 'W', note, path: 'U.us_weekly.heating_oil_retail.{last,w1,y1,vs5}'});
      addIn('c4', '가정용 난방유 소매 (난방철 주간)', 'U.us_weekly.heating_oil_retail', 'EIA', HO.last.date, 'W', null, onS ? null : (wait ? '이번 난방철 첫 조사 전 · ' : '10~3월만 주간 조사 · ') + fdate(HO.last.date) + ' 기준');
      if (onS) freshX.push({src: 'EIA 난방유 소매', d: HO.last.date, freq: 'W', path: 'U.us_weekly.heating_oil_retail.last'});
      got.add('가정용 난방유 소매');
    });
    /* 1994년 이후 순위: 2021년까지 고정한 월평균(monthly_long)으로 명목과 물가 조정(CPI 종합) 순위. 판정 행의 순위(2022년 이후)는 그대로 */
    extra(() => {
      const from = '1994-04';
      const CL = S.cpi_all && S.cpi_all.monthly_long && typeof S.cpi_all.monthly_long === 'object' ? S.cpi_all.monthly_long : null;
      const ca = CL ? mArr(CL) : [], cl = ca[ca.length - 1];
      const cpiAt = m => CL && isNum(CL[m]) ? CL[m] : cl && m > cl[0] ? cl[1] : null;
      const rk = key => {
        const o = S[key] && S[key].monthly_long; if (!o || typeof o !== 'object') return null;
        const all = mArr(o).filter(x => isM(x[0])); if (!all.length || all[0][0] > from) return null;
        const a = all.filter(x => x[0] >= from); if (a.length < 13) return null;
        const lm = a[a.length - 1][0], nom = rankPos(a.map(x => x[1]), o[lm], 1, a[0][0]); if (!nom) return null;
        const ref = cpiAt(lm), rv = isNum(ref) ? a.map(([m, v]) => { const c = cpiAt(m); return isNum(c) && c ? [m, v * ref / c] : null; }).filter(Boolean) : [];
        const real = rv.length && rv[rv.length - 1][0] === lm ? rankPos(rv.map(x => x[1]), rv[rv.length - 1][1], 1, rv[0][0]) : null;
        return {key, lm, from: a[0][0], N: nom.N, k: nom.k, kr: real ? real.k : null, Nr: real ? real.N : null, nom};
      };
      const D = rk('retail_diesel'), G2 = rk('retail_gasoline'); if (!D && !G2) return;
      const row = (name, x) => ({label: name + ' 소매 ' + x.from.slice(0, 4) + '년 이후 순위', value: x.k, unit: '위 / ' + x.N + '개월', digits: 0, date: x.lm, freq: 'M',
        note: nj('명목 ' + x.k + '위', isNum(x.kr) ? '물가 조정 ' + x.kr + '위' + (x.Nr !== x.N ? ' (' + x.Nr + '개월)' : '') : null, fym(x.lm) + ' 월평균'), path: 'S.' + x.key + '.monthly_long' + (isNum(x.kr) ? ' ÷ S.cpi_all.monthly_long' : '')});
      if (D) ctx.push(row('경유', D)); if (G2) ctx.push(row('휘발유', G2));
      if (D && G2 && D.lm === G2.lm && D.from === G2.from) { const s = sayOk(SAY.c4.rank94, {m: fdate(D.lm, 'M'), from: fym(D.from), N: D.N, k: D.k, kr: D.kr, g: G2.k, gr: G2.kr}); if (s) sentences.push(s); }
      const R = D || G2;
      tabs.push({id: 'rank94', label: '장기 순위', model: 'M2', vis: {type: 'rankonly', rank: R.nom, label: (R === D ? '경유' : '휘발유') + ' 소매 월평균 ' + fym(R.from) + ' 이후 ' + R.N + '개월 (명목, $/갤런) · ' + fdate(R.lm, 'M'), unit: '$'}});
      addIn('c4', '휘발유·경유 소매 ' + R.from.slice(0, 4) + '년 이후 월평균 (2021년까지 고정 이력)', 'S.retail_{gasoline,diesel}.monthly_long · S.cpi_all.monthly_long', 'FRED', R.lm, 'M', R.N + '개월');
      if (D && G2) got.add('1994년 이후 순위');
    });
    checks.c4 = {rows, ctx, flags, sentences, tabs, primary: 1, posRow: 1, dG, dD, wGd, wDd, jG, jD,
      kpiSub: '휘발유 ' + fnum(S.retail_gasoline.last.value, 3) + ' · Δ ' + (rows[0].delta ? rows[0].delta.show.replace('$', '') : '—') + (rows[0].pos ? ' · ' + rows[0].pos.N + '중 ' + rows[0].pos.k + '위' : '')};
  });

  /* ================= C5 재고 (M3) ================= */
  guard('c5', function () {
    const W = U.us_weekly || {}, CV = U.us_cover || {};
    const keys = [['crude_stocks', W, 'kb'], ['spr', W, 'kb'], ['distillate_stocks', W, 'kb'], ['distillate_stocks_east', W, 'kb'], ['gasoline_stocks', W, 'kb'], ['jet_stocks', W, 'kb'], ['propane_stocks', W, 'kb'], ['resid_stocks', W, 'kb'], ['distillate_days', CV, 'd'], ['gasoline_days', CV, 'd'], ['jet_days', CV, 'd']];
    const rows = keys.map(([k, src, kind]) => {
      const o = src[k]; if (!o) return {id: 'c5-' + k, label: k, judged: true, value: null, dir: {v: '미수집'}, lvl: {v: '미수집'}};
      const a = wkSeries(o); const n = a.length; const kk = Math.min(wks, n - 1);
      const dv = n > kk ? (kind === 'kb' ? (a[n - 1].v / a[n - 1 - kk].v - 1) * 100 : a[n - 1].v - a[n - 1 - kk].v) : null;
      const ch = wkChanges(a, kk, kind === 'kb');
      const w = a[n - 1].w; const b = o.band && o.band[w - 1]; const bp = bandPos(a[n - 1].v, b, 1);
      const prevW = (o.prev || []).find(x => x[0] === w);
      const sc = kind === 'kb' ? 1000 : 1;
      return {id: 'c5-' + k, key: k, label: o.label, judged: true, value: o.last.value / sc, unit: kind === 'kb' ? '백만 배럴' : '일', digits: 1, date: o.last.date, freq: 'W',
        delta: isNum(dv) ? {abs: dv, unit: kind === 'kb' ? '%' : '일', show: fsg(dv, 1) + (kind === 'kb' ? '%' : '일'), w: win, basis: '주간'} : null,
        pos: bp ? {...bp, min: bp.min / sc, avg: bp.avg / sc, max: bp.max / sc, cur: bp.cur / sc, prev: prevW ? prevW[1] / sc : null, week: w} : null,
        dir: judgeDir(dv, 1, sd(ch), ch.length, rule), lvl: bp ? {v: bp.verdict} : {v: '미수집'}, vs5: o.vs5, path: (src === W ? 'U.us_weekly.' : 'U.us_cover.') + k, src: 'EIA', raw: o, kind, arr: wkDated(a, o.last.date).map(([d, v]) => [d, v / sc])};
    });
    const below = rows.filter(r => r.pos && r.pos.pos === '아래'), above = rows.filter(r => r.pos && r.pos.pos === '위'), inside = rows.filter(r => r.pos && r.pos.pos === '안');
    const flags = [];
    if (rows.some(r => ['distillate_stocks', 'distillate_days', 'distillate_stocks_east'].includes(r.key) && r.pos && r.pos.pos === '아래')) flags.push('완충 약함(중간유분)');
    if (rows.some(r => ['crude_stocks', 'spr'].includes(r.key) && r.pos && r.pos.pos === '아래')) flags.push('완충 약함(원유)');
    /* 맥락: EU·일본·JODI·수요 */
    const eu = U.eu_emergency; let euS = null;
    if (eu) { const lastPts = Object.entries(eu.rows).map(([cc, r]) => ({cc, name: r.name, p: r.points[r.points.length - 1]})); const ms = lastPts.map(x => x.p[0]).sort(); euS = {N: lastPts.length, k: lastPts.filter(x => x.p[1] < eu.minimum_days).length, mfrom: ms[0], mto: ms[ms.length - 1], min: eu.minimum_days, list: lastPts.sort((a, b) => a.p[1] - b.p[1])}; }
    const jp = U.japan_reserves; const jpl = jp && jp.rows[jp.rows.length - 1]; const jpy = jp && jp.rows.find(r => r.month === addM(jpl.month, -12));
    const jodiStocks = []; for (const cc of ['JP', 'KR', 'DE', 'FR', 'IT', 'GB', 'IN', 'CN']) for (const pr of ['CRUDEOIL', 'GASDIES']) { const s = J[cc] && J[cc][pr] && J[cc][pr].CLOSTLV; if (!s || !s.last || !s.lo) continue; const i = +s.last[0].slice(5, 7) - 1; const bp = bandPos(s.last[1], [s.lo[i], s.avg[i], s.hi[i]], 1); jodiStocks.push({cc, name: (U.jodi.countries[cc] || {}).name, pr: pr === 'CRUDEOIL' ? '원유' : '경유', m: s.last[0], v: s.last[1] / 1000, bp}); }
    const td = W.total_demand;
    const ctx = [
      {label: 'EU 비상 비축', value: euS && euS.k, unit: '/' + (euS && euS.N) + '개국 ' + (euS && euS.min) + '일 미만', digits: 0, date: euS && euS.mto, freq: 'M', note: euS ? '국가별 최신 달 ' + fdate(euS.mfrom, 'M') + '~' + fdate(euS.mto, 'M') : '', path: 'U.eu_emergency.rows[*].points'},
      {label: '일본 비축 일수', value: jpl && jpl.total, unit: '일', digits: 0, date: jpl && jpl.month, freq: 'M', note: jpl ? '민간 ' + jpl.private + '일 / 의무 ' + jp.private_obligation.days + '일' + (jpy ? ' · 12개월 ' + fsg(jpl.total - jpy.total, 0) + '일' : '') : '', path: 'U.japan_reserves'},
      {label: 'JODI 재고 범위 아래', value: jodiStocks.filter(x => x.bp && x.bp.pos === '아래').length, unit: '/' + jodiStocks.length + '계열', digits: 0, date: jodiStocks.length ? jodiStocks.map(x => x.m).sort().slice(-1)[0] : null, freq: 'M', note: '같은 달 2021–25', path: 'J.<CC>.{CRUDEOIL,GASDIES}.CLOSTLV'},
      {label: '미국 석유 수요 (4주 평균)', value: td && td.last.value, unit: '천 b/d', digits: 0, date: td && td.last.date, freq: 'W', note: td && td.vs5 ? '5년 평균 대비 ' + fsg(td.vs5.pct, 1) + '% · 분모 주의' : '', path: 'U.us_weekly.total_demand'}
    ];
    const by = (U.us_weekly.crude_stocks.band_years || [2021, 2025]);
    const rDist = rows.find(r => r.key === 'distillate_days'), rSpr = rows.find(r => r.key === 'spr');
    const sentences = [
      say(SAY.c5.sum, {d: fdate(rows[0].date), N: rows.length, a: below.length, c: above.length, by: by[0], ey: by[1], names: below.map(r => r.label.replace(/\s*\(.*\)/, '')).join(', ') || '없음'}, '미국 주간 재고'),
      say(SAY.c5.cov, {x: fnum(rDist && rDist.value, 1), lo: fnum(rDist && rDist.pos && rDist.pos.min, 1), dd: fabs(rDist && rDist.pos ? rDist.value - rDist.pos.min : null, 1), c: c2(rDist && rDist.pos ? rDist.value - rDist.pos.min : null)}, '중간유분 공급일수'),
      say(SAY.c5.spr, {x: fnum(rSpr && rSpr.value, 1), by: by[0], ey: by[1], p: fabs(rSpr && rSpr.vs5 && rSpr.vs5.pct, 1), c: c2(rSpr && rSpr.vs5 && rSpr.vs5.pct)}, '전략비축'),
      say(SAY.c5.eu, {N: euS && euS.N, k: euS && euS.k, mfrom: fdate(euS && euS.mfrom, 'M'), mto: fdate(euS && euS.mto, 'M'), min: euS && euS.min}, 'EU 비상 비축'),
      say(SAY.c5.jp, {m: fdate(jpl && jpl.month, 'M'), t: jpl && jpl.total, pv: jpl && jpl.private, o: jp && jp.private_obligation.days, since: fdate(jp && jp.private_obligation.since), c: c2(jpl ? jpl.private - jp.private_obligation.days : null)}, '일본 비축')
    ];
    addIn('c5', '미국 주간 재고 8종 + 같은 주 범위', 'U.us_weekly.{crude_stocks,spr,distillate_stocks,…}.{cur,prev,band,vs5}', 'EIA', rows[0].date, 'W', rows.filter(r => r.value != null).length + '/' + rows.length);
    addIn('c5', '공급일수 3종', 'U.us_cover.{distillate,gasoline,jet}_days', 'EIA', rDist && rDist.date, 'W');
    addIn('c5', 'EU 비상 비축', 'U.eu_emergency', 'Eurostat', euS && euS.mto, 'M', euS ? euS.N + '개국' : null);
    addIn('c5', '일본 비축', 'U.japan_reserves', '석유연맹', jpl && jpl.month, 'M');
    addIn('c5', 'JODI 재고', 'J.*.{CRUDEOIL,GASDIES}.CLOSTLV', 'JODI', ctx[2].date, 'M', jodiStocks.length + '계열');
    const sorted = rows.filter(r => r.pos).slice().sort((a, b) => ((a.pos.cur - a.pos.min) / (a.pos.max - a.pos.min || 1)) - ((b.pos.cur - b.pos.min) / (b.pos.max - b.pos.min || 1)));
    const cal = rDist ? rDist : rows[2];
    const calOf = r => ({type: 'calband', title: r.label + ' · 같은 주 ' + by.join('–') + ' 범위 (' + r.unit + ')', unit: r.unit, x: 'week', band: r.raw.band.map(b => b.map(v => v / (r.kind === 'kb' ? 1000 : 1))), cur: weekLine(r.raw.cur, r.kind), prev: weekLine(r.raw.prev, r.kind), curLabel: String(r.raw.year), prevLabel: String(r.raw.year - 1)});
    function weekLine(a, kind) { const o = new Array(53).fill(null); (a || []).forEach(([w, v]) => { o[w - 1] = isNum(v) ? v / (kind === 'kb' ? 1000 : 1) : null; }); return o; }
    const tabs = [
      {id: 'm3', label: '계절', model: 'M3', primary: true, vis: {type: 'strips', rows: sorted, head: '범위 아래 ' + below.length + ' · 안 ' + inside.length + ' · 위 ' + above.length}},
      {id: 'trend', label: '추세', model: 'M3', vis: {...calOf(cal), choices: rows.filter(r => r.raw && r.raw.band).map(r => ({id: r.id, label: r.label, vis: calOf(r)}))}},
      {id: 'world', label: '국가', model: 'M3', vis: {type: 'stocktable', eu: euS, jodi: jodiStocks, by: U.jodi.band_years}}
    ];
    let facets;
    try { facets = bufferFacets({W, CV, rows, euS, eu, jp, jpl, jodiStocks}); }
    catch (e) { facets = {level: [], cover: [], demand: [], path: [], room: [], stockpile: {}, world: {}, failed: String(e && e.message || e)}; }
    /* 맥락 행: 완충 면의 대표값 (판정 없음). 앞의 맥락 행 순서는 그대로 둔다. */
    const fRoom = k => facets.room.find(x => x.rg === k);
    for (const [rg, label] of [['US', '상업 원유 충전률'], ['Cushing', '쿠싱 충전률']]) {
      const x = fRoom(rg);
      if (x && isNum(x.fill)) ctx.push({label, value: x.fill, unit: '%', digits: 1, date: x.date, freq: 'W', note: x.capBasis + ' ' + fnum(x.cap, 1) + '백만 배럴 · EIA ' + fdate(x.capAsOf, 'M') + ' 기준 (보고서 중단)', path: x.path});
    }
    const sp = facets.stockpile.spr;
    if (sp && isNum(sp.y1r)) ctx.push({label: 'SPR 전년 같은 주 대비', value: sp.y1r, unit: '/100', digits: 0, date: sp.date, freq: 'W', note: isNum(sp.fill) ? '작업 저장능력의 ' + fnum(sp.fill, 0) + '%' : '', path: 'U.us_weekly.spr.{last,y1}'});
    const wo = facets.world;
    if (wo.oecd) ctx.push({label: 'OECD 상업 재고', value: wo.oecd.v, unit: '백만 배럴', digits: 0, date: wo.oecd.m, freq: 'M', note: wo.oecd.pos ? '같은 달 ' + wo.oecd.by.join('–') + ' 범위 ' + wo.oecd.pos.pos + ' · STEO ' + fdate(wo.ed, 'M') : '', path: 'U.steo_balance.series.oecd_stocks'});
    if (wo.draw) ctx.push({label: '세계 재고 순인출', value: wo.draw.v, unit: '백만 b/d', digits: 2, date: wo.draw.m, freq: 'M', note: '+ 인출 · − 축적 · EIA 추정', path: 'U.steo_balance.series.world_draw'});
    /* 제품 수요만 센다: 원유 정제 투입(원료)과 합계(중복)는 빼고 */
    const dd = facets.demand.filter(x => x.pos && x.p !== 'crude' && x.p !== 'total'), dUp = dd.filter(x => isNum(x.n13) && x.n13 > 0).map(x => x.name), dDn = dd.filter(x => isNum(x.n13) && x.n13 < 0).map(x => x.name);
    const pD = facets.path.find(x => x.p === 'distillate'), cush = fRoom('Cushing');
    sentences.push(
      say(SAY.c5.dem, {d: fdate(dd[0] && dd[0].date), N: dd.length, a: dd.filter(x => x.pos.pos === '아래').length, c: dd.filter(x => x.pos.pos === '위').length, up: dUp.join('·') || '없음', dn: dDn.join('·') || '없음'}, '제품 수요 계절'),
      say(SAY.c5.path, {e1: fnum(pD && pD.e1 / 1000, 1), e2: fnum(pD && isNum(pD.e2) ? pD.e2 / 1000 : null, 1), p1: pD && pD.p1, p2: pD && pD.p2}, '13주 경로'),
      say(SAY.c5.room, {d: fdate(cush && cush.date), x: fnum(cush && cush.value, 1), cap: fnum(cush && cush.cap, 1), cm: fym(cush && cush.capAsOf), p: fnum(cush && cush.fill, 0)}, '쿠싱 충전률'),
      say(SAY.c5.sprY, {x: fnum(sp && sp.value, 1), r: fnum(sp && sp.y1r, 0), cap: fnum(sp && sp.cap, 1), f: fnum(sp && sp.fill, 0), d: fdate(sp && sp.date)}, 'SPR 전년·설계 능력'),
      say(SAY.c5.world, {m: fdate(wo.draw && wo.draw.m, 'M'), x: fnum(wo.draw && wo.draw.v, 2), o: fnum(wo.oecd && wo.oecd.v, 0), ed: fdate(wo.ed, 'M')}, '세계·OECD 재고(STEO)'));
    if (facets.room.some(x => isNum(x.fill))) addIn('c5', '원유 재고 ÷ (작업 능력 + 수송 중 재고) · SPR ÷ 작업 능력', 'U.us_weekly.{crude,cushing,midwest_crude,gulf_crude}_stocks·spr ÷ U.storage_capacity', 'EIA', U.storage_capacity && U.storage_capacity.as_of, 'M', facets.room.filter(x => isNum(x.fill)).length + '/' + facets.room.length + '곳', '보고서 중단 · ' + (U.storage_capacity && U.storage_capacity.as_of) + ' 기준');
    if (facets.demand.some(x => x.pos)) addIn('c5', '제품 수요 4주 평균 + 같은 주 범위', 'U.us_weekly.*_demand·crude_runs.{cur,prev,band}', 'EIA', dd[0] && dd[0].date, 'W', dd.length + '/' + facets.demand.length);
    if (wo.ed) addIn('c5', 'STEO 세계 균형·OECD·SPR·도일', 'U.steo_balance.series', 'EIA STEO', wo.lh, 'M', Object.keys((U.steo_balance || {}).series || {}).length + '계열');
    /* 사우디 원유 직접 연소(JODI DIRECUSE): 발전 등에 정제 없이 태우는 원유. 같은 달 다섯 해 범위와 전년 같은 달 */
    extra(() => {
      if (!jodiOn('SA', 'CRUDEOIL', 'DIRECUSE')) return;
      const e = jEnt('SA', 'CRUDEOIL', 'DIRECUSE'), [m, v] = e.last, i = +m.slice(5, 7) - 1, py = jPrev(e), byJ = JV.band_years;
      const hasBand = ['lo', 'avg', 'hi'].every(k => Array.isArray(e[k]) && e[k].length === 12) && Array.isArray(byJ);
      const bp = hasBand && [e.lo[i], e.avg[i], e.hi[i]].every(isNum) ? bandPos(v, [e.lo[i], e.avg[i], e.hi[i]], 1) : null;
      ctx.push({label: '사우디 원유 직접 연소', value: v, unit: '천 b/d', digits: 0, date: m, freq: 'M', note: nj(bp ? '같은 달 ' + byJ.join('–') + ' 범위 ' + bp.pos : null, isNum(py) ? '전년 같은 달 ' + fnum(py, 0) : null, '발전용을 포함한 직접 연소 전체'), path: 'J.SA.CRUDEOIL.DIRECUSE'});
      if (bp && isNum(py)) { const s = sayOk(SAY.c5.burn, {m: fdate(m, 'M'), x: fnum(v, 0), by: byJ[0], ey: byJ[1], pos: posEnd(bp.pos), y: fnum(py, 0)}); if (s) sentences.push(s); }
      if (hasBand && Array.isArray(e.cur) && Array.isArray(e.prev)) tabs.push({id: 'burn', label: '직접 연소', model: 'M3', vis: {type: 'calband', title: '사우디 원유 직접 연소 · 같은 달 ' + byJ.join('–') + ' 범위 (천 b/d)', unit: '천 b/d', x: 'month', band: e.lo.map((x, k) => [x, e.avg[k], e.hi[k]]), cur: e.cur, prev: e.prev, curLabel: String(JV.year), prevLabel: String(JV.year - 1)}});
      addIn('c5', '사우디 원유 직접 연소 + 같은 달 범위', 'U.jodi.data.SA.CRUDEOIL.DIRECUSE.{cur,prev,lo,avg,hi}', 'JODI', m, 'M');
      got.add('사우디 원유 직접 연소(여름 발전)');
    });
    /* 중국 원유 재고: JODI에 재고 수준이 없다. 보고되면 맥락 행(같은 달 범위는 이력 세 해 이후) */
    extra(() => {
      if (!jodiOn('CN', 'CRUDEOIL', 'CLOSTLV')) return;
      const e = jEnt('CN', 'CRUDEOIL', 'CLOSTLV'), [m, v] = e.last, i = +m.slice(5, 7) - 1;
      const bp = ['lo', 'avg', 'hi'].every(k => Array.isArray(e[k]) && isNum(e[k][i])) ? bandPos(v, [e.lo[i], e.avg[i], e.hi[i]], 1) : null;
      ctx.push({label: '중국 원유 재고 (JODI)', value: v / 1000, unit: '백만 배럴', digits: 1, date: m, freq: 'M', note: bp && Array.isArray(JV.band_years) ? '같은 달 ' + JV.band_years.join('–') + ' 범위 ' + bp.pos : '같은 달 범위 없음 (이력 세 해 미만)', path: 'J.CN.CRUDEOIL.CLOSTLV'});
      addIn('c5', '중국 원유 재고', 'J.CN.CRUDEOIL.CLOSTLV', 'JODI', m, 'M');
      got.add('중국 원유 비축');
    });
    checks.c5 = {rows, ctx, flags, sentences, tabs, primary: 2, posRow: 2, below, above, inside, facets,
      kpiSub: '범위 아래 ' + below.length + ' · 안 ' + inside.length + ' · 위 ' + above.length};
  });

  /* ⑤ 판정 행 계산이 멈춰도(입력 일부 없음) 완충 면은 있는 입력만으로 따로 낸다 */
  /* ② 사용량 면: c2 계산이 실패해도 면은 따로 만든다 */
  if (checks.c2) {
    try {
      const use = usageFacets(); checks.c2.usage = use;
      const w = use.regions.find(r => r.key === 'world_demand' && !r.miss), rr = k => (use.regions.find(r => r.key === k && !r.miss) || {}).r;
      if (w && Array.isArray(checks.c2.ctx)) {
        checks.c2.ctx.push({label: '세계 석유 소비 (전년 같은 달 = 100)', value: w.r, unit: '', digits: 1, date: w.m, freq: 'M', note: '하루 ' + fnum(w.v, 2) + '백만 배럴 · STEO 표 3a', path: 'U.steo_balance.series.world_demand'});
        checks.c2.sentences.push(say(SAY.c2.use, {m: fdate(w.m, 'M'), v: fnum(w.v, 1), r: fnum(w.r, 1), c: fnum(rr('demand_ch'), 1), u: fnum(rr('demand_us'), 1), e: fnum(rr('demand_oecd_europe'), 1), ed: fdate(use.ed, 'M')}, '세계 소비'));
        addIn('c2', '세계·지역 석유 소비 (STEO 표 3a)', 'U.steo_balance.series.{world_demand,demand_*}', 'EIA', w.m, 'M');
      }
      if (use.jodi.length && Array.isArray(checks.c2.ctx)) addIn('c2', '국가별 석유 수요 (JODI 제품 합계)', 'U.jodi.data[cc].TOTPRODS.TOTDEMO', 'JODI', use.jodi[0].m, 'M');
    } catch (e) { checks.c2.usage = {regions: [], jodi: [], failed: String(e && e.message || e)}; }
  }
  if (checks.c5 && !checks.c5.facets) {
    try { const jp = U.japan_reserves; checks.c5.facets = bufferFacets({W: U.us_weekly || {}, CV: U.us_cover || {}, rows: [], euS: null, eu: null, jp, jpl: jp && jp.rows && jp.rows[jp.rows.length - 1], jodiStocks: []}); }
    catch (e) { checks.c5.facets = {level: [], cover: [], demand: [], path: [], room: [], stockpile: {}, world: {}, failed: String(e && e.message || e)}; }
  }

  /* ================= C6 운임·위험 (M1 · 주평균 앵커) ================= */
  guard('c6', function () {
    const s = S.bwet;
    const wk = s.weekly || []; const last52 = wk.filter(x => tOf(x[0]) > tOf(wk[wk.length - 1][0]) - 364 * DAY);
    const hi = last52.length ? Math.max(...last52.map(x => x[1])) : null; const hiD = last52.find(x => x[1] === hi);
    const lastWk = wk[wk.length - 1];
    const dd = isNum(hi) ? (lastWk[1] / hi - 1) * 100 : null;
    const yWk = atOrBefore(wk, tOf(lastWk[0]) - 364 * DAY); const multW = yWk ? lastWk[1] / yWk[1] : null;
    const rkW = rankPos(wk.map(x => x[1]), lastWk[1], -1, wk[0][0]);
    /* 값·Δ·σ 모두 주평균 한 앵커. 일별 마지막 값 기준은 비교용으로만 계산한다 */
    const ww = arrWin(wk, days); const chW = changesByDays(wk, days, true); const sigW = sd(chW);
    const dirW = judgeDir(ww && ww.pct, -1, sigW, chW.length, rule);
    const wd = seriesWin('bwet');   /* 일별 last 대 w1/m1/y1 */
    const dirD = judgeDir(wd && wd.pct, -1, wd && wd.sig, wd ? wd.nCh : 0, rule);
    const z1 = ww && sigW ? ww.pct / sigW : null, z2 = wd && wd.sig ? wd.pct / wd.sig : null;
    const anchorDiff = dirW.v !== dirD.v && !['미수집', '판정 없음'].includes(dirD.v);
    const rows = [{id: 'c6-bwet', label: 'VLCC 운임선물 ETF', sub: 'BWET 주평균 · 운임 아님', judged: true, value: lastWk && lastWk[1], unit: '$', digits: 2, date: lastWk && lastWk[0], freq: 'W', dateNote: '주평균',
      delta: ww ? {abs: ww.abs, pct: ww.pct, unit: '$', usePct: true, show: fsg(ww.pct, 1) + '%', w: win, d0: ww.d0, d1: ww.d1, basis: '주평균'} : null,
      pos: multW ? {...multPos(multW), text: '전년 같은 주 ×' + fnum(multW, 1)} : null, dir: {...dirW, basis: (dirW.basis || '') + (isNum(z1) ? ' · 변화/σ ' + fnum(z1, 2) : '')}, path: 'S.bwet.weekly', src: 'Yahoo', arr: wk}];
    rows[0].lvl = rows[0].pos ? {v: rows[0].pos.verdict} : {v: '미수집'};
    const eqm = ks => mean(ks.map(k => C[k] && C[k].m1 ? (C[k].last.value / C[k].m1.value - 1) * 100 : null));
    const crudeEq = eqm(['FRO', 'DHT', 'INSW']), prodEq = eqm(['STNG']), lngEq = eqm(['FLNG', 'GLNG']);
    const atk = records.filter(r => r.ed && /피격|공격/.test(r.type || '') && tOf(r.ed.d) > fetchDT - rule.events_days * DAY && tOf(r.ed.d) <= fetchDT);
    const ctx = [
      {label: '원유선 3사 주가 (FRO·DHT·INSW)', value: crudeEq, unit: '% 1개월', digits: 1, date: C.FRO && C.FRO.last.date, freq: 'D', path: 'C.{FRO,DHT,INSW}.{last,m1}', sign: true},
      {label: '제품선 주가 (STNG)', value: prodEq, unit: '% 1개월', digits: 1, date: C.STNG && C.STNG.last.date, freq: 'D', path: 'C.STNG', sign: true},
      {label: 'LNG선 주가 (FLNG·GLNG)', value: lngEq, unit: '% 1개월', digits: 1, date: C.FLNG && C.FLNG.last.date, freq: 'D', path: 'C.{FLNG,GLNG}', sign: true},
      {label: '선박 피격·공격 기록', value: atk.length, unit: '건 / ' + rule.events_days + '일', digits: 0, date: recordsAsOf, freq: 'D', note: '대장 확인 ' + fdate(recordsAsOf), path: 'R[type ~ 피격|공격]'}
    ];
    let routes = null;
    /* 해협 주간 통과(비공개): 수에즈는 에너지 체인 모니터만 쓴다. 주간 값이 없는 해협은 뺀다 */
    if (CP) routes = ['bab_el_mandeb', 'cape', 'hormuz', 'suez'].filter(k => { const w = CP[k] && CP[k].weekly; return Array.isArray(w) && w.length && Array.isArray(w[w.length - 1]) && isD(w[w.length - 1][0]); }).map(k => { const cp = CP[k]; const w = cp.weekly; const l = w[w.length - 1]; const y = atOrBefore(w, tOf(l[0]) - 364 * DAY); return {key: k, label: cp.label, v: l[1], d: l[0], y: y && y[1], r: y && y[1] ? l[1] / y[1] * 100 : null}; });
    const suez = routes && routes.find(x => x.key === 'suez' && isNum(x.v));
    if (suez) {
      ctx.push({label: '수에즈 유조선 통과 (비공개)', value: suez.v, unit: '척/일', digits: 1, date: suez.d, freq: 'W', note: nj(isNum(suez.r) ? '전년 같은 주의 ' + fnum(suez.r, 0) + '%' : null, '주간 평균 · 방향 구분 없음'), path: 'shipping.chokepoints.suez.weekly'});
      got.add('수에즈 통과');
    }
    const sentences = [
      say(SAY.c6.dir, {w: win, p: fabs(ww && ww.pct, 1), s: ww ? s3(ww.pct, dirW.v === '보합') : null, d0: fdate(ww && ww.d0), d: fdate(lastWk && lastWk[0])}, '운임선물 ETF 주평균 변화'),
      say(SAY.c6.anc, {d2: fdate(s.last && s.last.date), p2: fsg(wd && wd.pct, 1), c: anchorDiff ? 1 : 0, z1: fnum(z1, 2), z2: fnum(z2, 2)}, '일별 앵커'),
      say(SAY.c6.lvl, {d: fdate(lastWk && lastWk[0]), x: fabs(dd, 0), n: fnum(multW, 1)}, '운임선물 ETF 주평균'),
      say(SAY.c6.eq, {a: fabs(crudeEq, 1), s1: s3(crudeEq), b: fabs(prodEq, 1), s2: s3(prodEq)}, '탱커 주가'),
      say(SAY.c6.led, {days: rule.events_days, k: atk.length, asof: fdate(recordsAsOf)}, '사건 대장')
    ];
    if (suez && isNum(suez.r)) { const s6 = sayOk(SAY.c6.suez, {d: fdate(suez.d), x: fnum(suez.v, 1), r: fnum(suez.r, 0)}); if (s6) sentences.push(s6); }
    addIn('c6', 'VLCC 운임선물 ETF', 'S.bwet.{last,w1,m1,y1,weekly}', 'Yahoo', s.last.date, 'D', wk.length + '주');
    addIn('c6', '탱커·LNG선 주가', 'C.{FRO,DHT,INSW,STNG,FLNG,GLNG}', 'Yahoo', C.FRO.last.date, 'D', '6종');
    addIn('c6', '차질 대장 (피격·공격)', 'R.disruptionRecords', '대장', recordsAsOf, 'D', records.length + '건');
    if (CP) addIn('c6', '해협 통과 주간 (비공개)', 'shipping.chokepoints.*.weekly', '선박 신호', SH.latest, 'W', routes.length + '곳');
    const study = records.filter(r => r.ed && !r.ed.approx && r.stage === 3 && tOf(r.ed.d) >= tOf(wk[0][0])).map(r => { const i = wk.findIndex(x => tOf(x[0]) >= tOf(r.ed.d)); if (i < 0) return {r, pre: null, post: null}; return {r, d: wk[i][0], pre: i >= 2 ? (wk[i][1] / wk[i - 2][1] - 1) * 100 : null, post: i + 2 < wk.length ? (wk[i + 2][1] / wk[i][1] - 1) * 100 : null}; });
    const tabs = [
      {id: 'm1', label: '추세', model: 'M1', primary: true, vis: {type: 'c6pair', dd, hi, hiD: hiD && hiD[0], multW, last: lastWk, pts: last52, all: wk, log: true, anchor: {pW: ww && ww.pct, z1, dirW: dirW.v, pD: wd && wd.pct, z2, dirD: dirD.v, dD: s.last && s.last.date, d0: ww && ww.d0}}},
      {id: 'rank', label: '순위', model: 'M2', vis: {type: 'rankonly', rank: rkW, label: 'BWET 주평균 ' + fdate(wk[0][0]) + ' 이후 ' + wk.length + '주', unit: '$'}},
      {id: 'event', label: '사건', model: 'M9', vis: {type: 'study', unit: '%', title: 'BWET 주평균, 수송 단계 기록 ±2주 변화', study, note: '같은 기간 다른 요인이 함께 반영된다.'}}
    ];
    if (routes) tabs.push({id: 'route', label: '노선', model: 'M8', priv: true, vis: {type: 'routes', routes}});
    const flags6 = []; if (anchorDiff) flags6.push('경계 · 앵커 따라 판정 다름'); if (atk.length) flags6.push('피격 ' + atk.length + '건');
    checks.c6 = {rows, ctx, flags: flags6, sentences, tabs, primary: 0, posRow: 0, anchor: {z1, z2, dirW: dirW.v, dirD: dirD.v, pD: wd && wd.pct, dD: s.last && s.last.date},
      kpiSub: isNum(dd) ? '52주 고점 대비 ' + fsg(dd, 0) + '%' : null};
  });

  /* ================= C7 정제 (M8) ================= */
  guard('c7', function () {
    const W = U.us_weekly; const cap = wkSeries(W.capacity), gi = wkSeries(W.gross_inputs);
    const mg = new Map(gi.map(p => [p.y + '-' + p.w, p.v]));
    const spare = cap.filter(p => mg.has(p.y + '-' + p.w)).map(p => ({y: p.y, w: p.w, v: p.v - mg.get(p.y + '-' + p.w)}));
    /* 여유능력 행의 값·날짜·추세·방향(Δ·σ)은 두 계열이 함께 있는 주끼리다. 두 계열을 제 마지막 관측일로 날짜에 놓고, 늦은 쪽의 주마다
     * 다른 쪽에서 ±3일 안의 점을 짝짓는다(한쪽이 한 주 늦거나 해를 넘겨 주 번호 체계가 달라도 다른 주끼리 빼지 않는다).
     * 주 번호 짝(spare)은 유량 탭의 올해·전년 주 번호 선(spareCur·sparePrev)에만 쓴다 */
    const capD = wkDated(cap, W.capacity.last.date), giD = wkDated(gi, W.gross_inputs.last.date);
    const giLate = tOf(W.gross_inputs.last.date) <= tOf(W.capacity.last.date), base = giLate ? giD : capD, other = giLate ? capD : giD;
    const near = t => { let b = null; for (const p of other) { const dd = Math.abs(tOf(p[0]) - t); if (dd <= 3 * DAY && (!b || dd < b.dd)) b = {dd, v: p[1]}; } return b; };
    const spD = []; for (const [d, v] of base) { const o = near(tOf(d)); if (o) spD.push([d, giLate ? o.v - v : v - o.v]); }
    const spL = spD[spD.length - 1];
    const spV = spD.map(p => ({v: p[1]})), sn = spV.length, sk = Math.min(wks, sn - 1);
    const dS = sn > sk && sk > 0 ? spV[sn - 1].v - spV[sn - 1 - sk].v : null; const chS = sk > 0 ? wkChanges(spV, sk, false) : [];
    /* 가동률은 한 계열이다. Δ 창은 이 계열 길이로만 줄인다(⑤ 재고 행과 같다). 여유능력 짝 수와 상관없다 */
    const ut = W.utilization; const ua = wkSeries(ut); const un = ua.length, uk = Math.min(wks, un - 1);
    const dU = uk > 0 ? ua[un - 1].v - ua[un - 1 - uk].v : null; const chU = uk > 0 ? wkChanges(ua, uk, false) : [];
    const uw = ua[un - 1].w; const ub = bandPos(ua[un - 1].v, ut.band[uw - 1], -1);
    const prevU = (ut.prev || []).find(x => x[0] === uw);
    const rows = [
      {id: 'c7-spare', label: '미국 정제 여유능력', sub: '능력 − 총투입', judged: true, value: spL ? spL[1] : W.capacity.last.value - W.gross_inputs.last.value, unit: '천 b/d', digits: 0, date: spL ? spL[0] : W.capacity.last.date, freq: 'W',
        delta: isNum(dS) ? {abs: dS, unit: '천 b/d', show: fsg(dS, 0), w: win} : null, pos: {kind: 'none', text: '수준 기준 없음', pos: '—'}, dir: judgeDir(dS, 1, sd(chS), chS.length, rule), lvl: {v: '판정 없음'}, path: 'U.us_weekly.capacity − gross_inputs', src: 'EIA', arr: spD},
      {id: 'c7-util', label: '미국 정제 가동률', sub: '같은 주 5년 범위', judged: true, value: ut.last.value, unit: '%', digits: 1, date: ut.last.date, freq: 'W',
        delta: isNum(dU) ? {abs: dU, unit: '%p', show: fsg(dU, 1) + '%p', w: win} : null, pos: ub ? {...ub, prev: prevU && prevU[1], week: uw} : null, dir: judgeDir(dU, -1, sd(chU), chU.length, rule), lvl: ub ? {v: ub.verdict} : {v: '미수집'}, path: 'U.us_weekly.utilization', src: 'EIA', arr: wkDated(ua, ut.last.date)}
    ];
    const jodiRef = Object.entries(J).map(([cc, d]) => { const s = d.CRUDEOIL && d.CRUDEOIL.REFINOBS; if (!s || !s.lo || !s.last) return null; const i = +s.last[0].slice(5, 7) - 1; return {cc, name: (U.jodi.countries[cc] || {}).name || cc, m: s.last[0], v: s.last[1], bp: bandPos(s.last[1], [s.lo[i], s.avg[i], s.hi[i]], 1), stale: s.last[0] < addM(U.jodi.latest, -rule.stale_months)}; }).filter(Boolean);
    const jBelow = jodiRef.filter(x => x.bp && x.bp.pos === '아래' && !x.stale);
    const st4 = records.filter(r => r.stage === 4 && r.ed && tOf(r.ed.d) > fetchDT - days * DAY && tOf(r.ed.d) <= fetchDT);
    const yl = k => { const p = U.us_yields[k].points; return p[p.length - 1]; };
    const ctx = [
      {label: '원유 처리량 (4주 평균)', value: W.crude_runs.last.value, unit: '천 b/d', digits: 0, date: W.crude_runs.last.date, freq: 'W', note: '5년 평균 대비 ' + fsg(W.crude_runs.vs5.pct, 1) + '%', path: 'U.us_weekly.crude_runs'},
      {label: '중간유분 수율', value: yl('distillate')[1], unit: '%', digits: 1, date: yl('distillate')[0], freq: 'M', note: '휘발유 ' + yl('gasoline')[1] + '% · 항공유 ' + yl('jet')[1] + '%', path: 'U.us_yields.*'},
      {label: '중간유분 수출 (4주 평균)', value: W.distillate_exports.last.value, unit: '천 b/d', digits: 0, date: W.distillate_exports.last.date, freq: 'W', note: '5년 평균 대비 ' + fsg(W.distillate_exports.vs5.pct, 1) + '%', path: 'U.us_weekly.distillate_exports'},
      {label: '항공유 수출 (4주 평균)', value: W.jet_exports.last.value, unit: '천 b/d', digits: 0, date: W.jet_exports.last.date, freq: 'W', note: '5년 평균 대비 ' + fsg(W.jet_exports.vs5.pct, 1) + '%', path: 'U.us_weekly.jet_exports'},
      {label: '정유 차질 기록 (창 안)', value: st4.length, unit: '건', digits: 0, date: recordsAsOf, freq: 'D', note: st4.map(r => r.site).filter(Boolean).slice(0, 4).join('·'), path: 'R[stage=4]'},
      {label: '계획·재가동 기록', value: projects.filter(p => p.target_start).length, unit: '건 (일정 있음)', digits: 0, date: null, freq: 'D', note: '규모는 텍스트 · 미수집', path: 'P[target_start]'}
    ];
    const by = ut.band_years || [2021, 2025];
    const jm = jodiRef.filter(x => !x.stale).map(x => x.m).sort();
    const sentences = [
      say(SAY.c7.lvl, {d: fdate(ut.last.date), x: fnum(rows[0].value, 0), u: fnum(ut.last.value, 1), by: by[0], ey: by[1], pos: posEnd(ub && ub.pos)}, '정제 여유능력'),
      say(SAY.c7.led, {days, k: st4.length, sites: st4.map(r => r.site).filter(Boolean).join('·') || '지점 미기재', asof: fdate(recordsAsOf)}, '정유 차질 대장'),
      say(SAY.c7.jodi, {N: jodiRef.filter(x => !x.stale).length, a: jBelow.length, m: jm.length ? fdate(jm[0], 'M') + '~' + fdate(jm[jm.length - 1], 'M') : null}, 'JODI 정제 투입')
    ];
    addIn('c7', '정제 능력·총투입·가동률', 'U.us_weekly.{capacity,gross_inputs,utilization}', 'EIA', ut.last.date, 'W');
    addIn('c7', '수율', 'U.us_yields.{gasoline,distillate,jet}.points', 'EIA', yl('distillate')[0], 'M');
    addIn('c7', 'JODI 정제 투입 + 같은 달 범위', 'J.<CC>.CRUDEOIL.REFINOBS', 'JODI', jm[jm.length - 1], 'M', jodiRef.length + '개국');
    addIn('c7', '정유 차질 기록', 'R[stage=4]', '대장', recordsAsOf, 'D');
    const wl = a => { const o = new Array(53).fill(null); a.forEach(p => { o[p.w - 1] = p.v; }); return o; };
    const tabs = [
      {id: 'm8', label: '유량', model: 'M8', primary: true, vis: {type: 'c7', spare: rows[0], util: rows[1], spareCur: wl(spare.filter(p => p.y === W.capacity.year)), sparePrev: wl(spare.filter(p => p.y === W.capacity.year - 1)), jBelow: jBelow.length, jN: jodiRef.filter(x => !x.stale).length}},
      {id: 'season', label: '계절', model: 'M3', vis: {type: 'calband', title: '미국 정제 가동률 · 같은 주 ' + by.join('–') + ' 범위 (%)', unit: '%', x: 'week', band: ut.band, cur: wl(ua.filter(p => p.y === ut.year)), prev: wl(ua.filter(p => p.y === ut.year - 1)), curLabel: String(ut.year), prevLabel: String(ut.year - 1)}},
      {id: 'world', label: '국가', model: 'M3', vis: {type: 'jodiref', list: jodiRef, by: U.jodi.band_years}}
    ];
    /* 휘발유·프로판 주간 수출(EIA, 4주 평균): 항공유 수출 행 뒤의 맥락 행 */
    extra(() => {
      const ok = o => o && o.last && isNum(o.last.value) && isD(o.last.date);
      const GX = ok(W.gasoline_exports) ? W.gasoline_exports : null, PX = ok(W.propane_exports) ? W.propane_exports : null; if (!GX && !PX) return;
      const rs = [];
      if (GX) rs.push({label: '휘발유 수출 (4주 평균)', value: GX.last.value, unit: '천 b/d', digits: 0, date: GX.last.date, freq: 'W', path: 'U.us_weekly.gasoline_exports',
        note: nj(GX.vs5 && isNum(GX.vs5.pct) ? '5년 평균 대비 ' + fsg(GX.vs5.pct, 1) + '%' : null, GX.y1 && isNum(GX.y1.value) ? '전년 ' + fnum(GX.y1.value, 0) : null, '2023년 6월부터 혼합 성분 포함')});
      if (PX) rs.push({label: '프로판 수출 (4주 평균)', value: PX.last.value, unit: '천 b/d', digits: 0, date: PX.last.date, freq: 'W', path: 'U.us_weekly.propane_exports',
        note: nj(PX.y1 && isNum(PX.y1.value) && PX.y1.value ? '전년 같은 주 대비 ' + fsg((PX.last.value / PX.y1.value - 1) * 100, 1) + '%' : null, '해마다 늘어 5년 범위와 비교하지 않는다')});
      const at = ctx.findIndex(r => r.label === '항공유 수출 (4주 평균)'); ctx.splice(at < 0 ? ctx.length : at + 1, 0, ...rs);
      addIn('c7', '휘발유·프로판 수출 (4주 평균)', 'U.us_weekly.{gasoline,propane}_exports', 'EIA', rs.map(r => r.date).sort()[0], 'W', rs.length + '/2');
      if (GX && PX) got.add('휘발유·프로판 주간 수출');
    });
    /* 러시아 정제 투입: JODI 비보고국(2023-03 이후). 감시 목록에 보고가 들어오면 맥락 행(국가 목록 jodiRef 밖) */
    extra(() => {
      if (!jodiOn('RU', 'CRUDEOIL', 'REFINOBS')) return;
      const e = jEnt('RU', 'CRUDEOIL', 'REFINOBS'), py = jPrev(e);
      ctx.push({label: '러시아 정제 투입 (JODI)', value: e.last[1], unit: '천 b/d', digits: 0, date: e.last[0], freq: 'M', note: nj(isNum(py) ? '전년 같은 달 ' + fnum(py, 0) : null, '같은 달 범위 국가 목록 밖'), path: 'U.jodi.watch.RU.CRUDEOIL.REFINOBS'});
      addIn('c7', '러시아 정제 투입', 'U.jodi.watch.RU.CRUDEOIL.REFINOBS', 'JODI', e.last[0], 'M');
      got.add('러시아 처리량');
    });
    checks.c7 = {rows, ctx, flags: ub && ub.pos === '위' ? ['여력 없음'] : [], sentences, tabs, primary: 0, posRow: 1,
      kpiSub: '가동률 ' + fnum(ut.last.value, 1) + '% · 범위 ' + (ub ? ub.pos : '—')};
  });

  /* ================= C8 중국 (M4) ================= */
  guard('c8', function () {
    const cn = J.CN || {}; const yr = U.jodi.year;
    const ratio = s => { if (!s || !s.last) return null; const lm = s.last[0]; if (+lm.slice(0, 4) !== yr) return {stale: true, m: lm}; const i = +lm.slice(5, 7) - 1; const r = isNum(s.cur[i]) && s.prev[i] ? s.cur[i] / s.prev[i] * 100 : null; const i3 = i - 3; const r3 = i3 >= 0 && isNum(s.cur[i3]) && s.prev[i3] ? s.cur[i3] / s.prev[i3] * 100 : null; return {r, m: lm, d3: isNum(r) && isNum(r3) ? r - r3 : null, m3: i3 >= 0 ? yr + '-' + String(i3 + 1).padStart(2, '0') : null, monthly: s.cur.map((v, k) => isNum(v) && s.prev[k] ? v / s.prev[k] * 100 : null), prior: (s.prev2 || []).map((v, k) => isNum(s.prev[k]) && v ? s.prev[k] / v * 100 : null)}; };
    const imp = ratio(cn.CRUDEOIL && cn.CRUDEOIL.TOTIMPSB), ref = ratio(cn.CRUDEOIL && cn.CRUDEOIL.REFINOBS), gas = ratio(cn.GASOLINE && cn.GASOLINE.TOTEXPSB);
    const isStale = s => !s || !s.last || s.last[0] < addM(U.jodi.latest, -rule.stale_months);
    const dsl = cn.GASDIES && cn.GASDIES.TOTEXPSB, ker = cn.KEROSENE && cn.KEROSENE.TOTEXPSB;
    const mk = (id, label, o, s, key) => ({id, label, sub: '전년 같은 달 = 100', judged: true, value: o && o.r, unit: '%', digits: 1, date: o && o.m, freq: 'M',
      delta: o && isNum(o.d3) ? {abs: o.d3, unit: '%p', show: fsg(o.d3, 1) + '%p', w: 'Δ3개월', d0: o.m3} : null, pos: ratioPos(o && o.r, 1), dir: judgeDir(o && o.d3, 1, null, 0, rule), path: key, src: 'JODI',
      arr: o && o.monthly ? [...o.prior.map((v, k) => [(yr - 1) + '-' + String(k + 1).padStart(2, '0'), v]), ...o.monthly.map((v, k) => [yr + '-' + String(k + 1).padStart(2, '0'), v])].filter(x => isNum(x[1])) : []});
    const rows = [mk('c8-imp', '원유 수입 회복률', imp, null, 'J.CN.CRUDEOIL.TOTIMPSB'), mk('c8-gas', '휘발유 수출 회복률', gas, null, 'J.CN.GASOLINE.TOTEXPSB')];
    rows.forEach(r => { r.lvl = r.pos ? {v: r.pos.verdict} : {v: '미수집'}; });
    /* 결합 규칙 */
    const iUp = imp && imp.d3 > 0, gUp = gas && gas.d3 > 0, gDown = gas && gas.d3 < 0, gMiss = !gas || isStale(cn.GASOLINE && cn.GASOLINE.TOTEXPSB);
    let comb = !imp && !gas ? '미수집' : '혼재', tag = null; if (iUp && gUp) comb = '부합'; else if (iUp && (gDown || gMiss)) { comb = '불일치'; tag = '흡수·수출 억제'; }
    const ctx = [
      {label: '정제 투입 회복률', value: ref && ref.r, unit: '%', digits: 1, date: ref && ref.m, freq: 'M', note: (() => { const s = cn.CRUDEOIL && cn.CRUDEOIL.REFINOBS; if (!s || !s.lo) return ''; const i = +s.last[0].slice(5, 7) - 1; const b = bandPos(s.last[1], [s.lo[i], s.avg[i], s.hi[i]], 1); return b ? '같은 달 범위 ' + b.pos : ''; })(), path: 'J.CN.CRUDEOIL.REFINOBS'},
      {label: '경유 수출', value: null, unit: '', digits: 0, date: dsl && dsl.last && dsl.last[0], freq: 'M', note: isStale(dsl) ? (dsl && dsl.last ? fym(dsl.last[0]) + ' 이후 미보고' : '미보고') : '', path: 'J.CN.GASDIES.TOTEXPSB', missing: isStale(dsl)},
      {label: '등유 수출', value: null, unit: '', digits: 0, date: ker && ker.last && ker.last[0], freq: 'M', note: isStale(ker) ? (ker && ker.last ? fym(ker.last[0]) + ' 이후 미보고' : '미보고') : '', path: 'J.CN.KEROSENE.TOTEXPSB', missing: isStale(ker)}
    ];
    const sentences = [say(SAY.c8.lvl, {m: fdate(imp && imp.m, 'M'), a: fnum(imp && imp.r, 0), b: fnum(ref && ref.r, 0), c: fnum(gas && gas.r, 0), m2: fym(dsl && dsl.last && dsl.last[0])}, '중국 JODI')];
    addIn('c8', '중국 원유 수입·정제 투입', 'J.CN.CRUDEOIL.{TOTIMPSB,REFINOBS}', 'JODI', imp && imp.m, 'M');
    addIn('c8', '중국 제품 수출', 'J.CN.{GASOLINE,GASDIES,KEROSENE}.TOTEXPSB', 'JODI', gas && gas.m, 'M', '1/3 보고');
    const s = cn.CRUDEOIL && cn.CRUDEOIL.REFINOBS;
    const tabs = [
      {id: 'm4', label: '동월비', model: 'M4', primary: true, vis: {type: 'c8bars', bars: [{name: '원유 수입', o: imp}, {name: '정제 투입', o: ref}, {name: '휘발유 수출', o: gas}, {name: '경유 수출', miss: fym(dsl && dsl.last && dsl.last[0]) + ' 이후 미보고'}, {name: '등유 수출', miss: fym(ker && ker.last && ker.last[0]) + ' 이후 미보고'}], comb, tag}},
      {id: 'season', label: '계절', model: 'M3', vis: s && s.lo ? {type: 'calband', title: '중국 정제 투입 · 같은 달 ' + U.jodi.band_years.join('–') + ' 범위 (천 b/d)', unit: '천 b/d', x: 'month', band: s.lo.map((v, i) => [v, s.avg[i], s.hi[i]]), cur: s.cur, prev: s.prev, curLabel: String(yr), prevLabel: String(yr - 1)} : null}
    ];
    checks.c8 = {rows, ctx, flags: tag ? [tag] : [], sentences, tabs, primary: 0, posRow: 0, comb,
      kpiSub: '휘발유 수출 ' + (gas && isNum(gas.r) ? fnum(gas.r, 0) + '%' : '미보고') + ' · 경유·등유 미보고'};
  });

  /* ================= C9 가스·LNG (M10) ================= */
  guard('c9', function () {
    const ttf = seriesWin('ttf_fut'), jkm = seriesWin('jkm_fut');
    const eu = S.eu_gas_imf; const euA = mArr(eu.monthly); const max22 = Math.max(...euA.filter(([m]) => m.startsWith('2022')).map(x => x[1]));
    const max22m = (euA.find(([m, v]) => m.startsWith('2022') && v === max22) || [])[0];
    const euL = euA[euA.length - 1]; const epR = isNum(max22) ? euL[1] / max22 * 100 : null;
    const rkEu = rankOf('eu_gas_imf', -1); const rkJ = rankOf('jkm_fut', -1);
    const gs = U.us_weekly.gas_storage; const ga = wkSeries(gs); const n = ga.length, kk = Math.min(wks, n - 1);
    const w = ga[n - 1].w, w0 = ga[n - 1 - kk].w;
    const dAct = ga[n - 1].v - ga[n - 1 - kk].v;
    const bandAvgAt = wk => gs.band[(wk - 1 + 52) % 52] && gs.band[(wk - 1 + 52) % 52][1];
    const dNorm = isNum(bandAvgAt(w)) && isNum(bandAvgAt(w0)) ? bandAvgAt(w) - bandAvgAt(w0) : null;
    const dRel = isNum(dNorm) ? dAct - dNorm : null;
    const chRel = []; for (let i = kk; i < n; i++) { const a = ga[i], b = ga[i - kk]; const na = bandAvgAt(a.w), nb = bandAvgAt(b.w); if (isNum(na) && isNum(nb)) chRel.push((a.v - b.v) - (na - nb)); }
    const gb = bandPos(ga[n - 1].v, gs.band[w - 1], 1);
    /* M10 조건부 산술 */
    const b13 = gs.band[12]; const curW = ga[n - 1].v; const prevW = (gs.prev.find(x => x[0] === w) || [])[1]; const cur13 = (gs.cur.find(x => x[0] === 13) || [])[1];
    const e1 = isNum(gs.band[w - 1] && gs.band[w - 1][1]) ? curW - (gs.band[w - 1][1] - b13[1]) : null;
    const e2 = isNum(prevW) && isNum(cur13) ? curW - (prevW - cur13) : null;
    const posOf = v => !isNum(v) ? null : v < b13[0] ? '아래' : v > b13[2] ? '위' : '안';
    const flags = []; if (isNum(e2) && e2 < b13[0]) flags.push('겨울 완충 약함');
    const rows = [
      {id: 'c9-ttf', label: 'TTF 선물', sub: S.ttf_fut.last.contract ? fctr(S.ttf_fut.last.contract) + ' · 유로/MWh' : '', judged: true, value: S.ttf_fut.last.value, unit: '€', digits: 2, date: S.ttf_fut.last.date, freq: 'D',
        delta: deltaObj(ttf, '€', true), pos: rkEu ? {...rkEu, text: '유럽 가스 IMF ' + rkEu.N + '중 ' + rkEu.k + '위', ep: epR} : null, dir: judgeDir(ttf && ttf.pct, -1, ttf && ttf.sig, ttf ? ttf.nCh : 0, rule, ttf && ttf.roll), path: 'S.ttf_fut · S.eu_gas_imf.monthly(순위)', src: 'Yahoo · IMF', arr: histOf(S.ttf_fut)},
      {id: 'c9-jkm', label: 'JKM 선물', sub: S.jkm_fut.last.contract ? fctr(S.jkm_fut.last.contract) + ' · $/MMBtu' : '', judged: true, value: S.jkm_fut.last.value, unit: '$', digits: 2, date: S.jkm_fut.last.date, freq: 'D',
        delta: deltaObj(jkm, '$', true), pos: rkJ ? {...rkJ, text: '근월물 연결 ' + rkJ.N + '개월 중 ' + rkJ.k + '위'} : null, dir: judgeDir(jkm && jkm.pct, -1, jkm && jkm.sig, jkm ? jkm.nCh : 0, rule, jkm && jkm.roll), path: 'S.jkm_fut', src: 'Yahoo', arr: histOf(S.jkm_fut)},
      {id: 'c9-gs', label: '미국 가스 저장', sub: '평년 대비 Δ', judged: true, value: gs.last.value, unit: 'bcf', digits: 0, date: gs.last.date, freq: 'W',
        delta: isNum(dRel) ? {abs: dRel, unit: 'bcf', show: fsg(dRel, 0), w: win, basis: '실제 ' + fsg(dAct, 0) + ' − 평년 ' + fsg(dNorm, 0)} : null, pos: gb ? {...gb, prev: prevW, week: w} : null, dir: judgeDir(dRel, 1, sd(chRel), chRel.length, rule), path: 'U.us_weekly.gas_storage.{cur,prev,band}', src: 'EIA', arr: wkDated(ga, gs.last.date)}
    ];
    rows.forEach(r => { if (!r.lvl) r.lvl = r.pos ? {v: r.pos.verdict} : {v: '미수집'}; });
    const jw = new Map(S.henry_hub.weekly || []); const jh = (S.jkm_fut.weekly || []).filter(([d]) => jw.has(d)).map(([d, v]) => [d, v - jw.get(d)]); const jhl = jh[jh.length - 1];
    const lngEq = mean(['LNG', 'VG', 'NEXT', 'EE'].map(k => C[k] && C[k].m1 ? (C[k].last.value / C[k].m1.value - 1) * 100 : null));
    const gasEv = records.filter(r => ['n-lng', 'n-gas'].includes(r.node));
    const ctx = [
      {label: '헨리허브 현물', value: S.henry_hub.last.value, unit: '$/MMBtu', digits: 2, date: S.henry_hub.last.date, freq: 'D', note: '선물 ' + fnum(S.ng_fut.last.value, 2) + ' (' + fdate(S.ng_fut.last.date) + ')', path: 'S.henry_hub, S.ng_fut'},
      {label: 'JKM−헨리허브', value: jhl && jhl[1], unit: '$/MMBtu', digits: 2, date: jhl && jhl[0], freq: 'W', note: '주평균 · 같은 주', path: 'S.jkm_fut.weekly − S.henry_hub.weekly'},
      {label: '아시아 LNG (IMF, 유가연동)', value: S.asia_lng_imf.last.value, unit: '$/MMBtu', digits: 2, date: mLastFull(S.asia_lng_imf.monthly), freq: 'M', note: '현물 아님', path: 'S.asia_lng_imf'},
      {label: '유럽 가스 (IMF)', value: euL[1], unit: '$/MMBtu', digits: 2, date: euL[0], freq: 'M', note: '2022년 최고(' + fdate(max22m, 'M') + ') 대비 ' + fnum(epR, 0) + '%', path: 'S.eu_gas_imf'},
      {label: '미국 LNG 수출 기업 주가', value: lngEq, unit: '% 1개월', digits: 1, date: C.LNG && C.LNG.last.date, freq: 'D', path: 'C.{LNG,VG,NEXT,EE}', sign: true},
      {label: 'LNG·가스 기록', value: gasEv.length, unit: '건', digits: 0, date: recordsAsOf, freq: 'D', note: gasEv.map(r => r.site).filter(Boolean).slice(0, 3).join('·'), path: 'R → n-lng·n-gas'}
    ];
    const by = gs.band_years || [2021, 2025];
    const futTxt = o => !o ? null : o.roll ? '만기 교체로 비교하지 않는다' : (o.pct >= 0 ? fnum(o.pct, 1) + '% 올랐다' : fnum(-o.pct, 1) + '% 내렸다');
    const sentences0 = [
      say(SAY.c9.st, {d: fdate(gs.last.date), x: fnum(gs.last.value, 0), by: by[0], ey: by[1], p: fabs(gs.vs5 && gs.vs5.pct, 1), c: c2(gs.vs5 && gs.vs5.pct)}, '미국 가스 저장'),
      say(SAY.c9.cond, {e1: fnum(e1, 0), e2: fnum(e2, 0), lo: fnum(b13[0], 0), hi: fnum(b13[2], 0), p1: posOf(e1), p2: posOf(e2)}, '3월 말 조건부 계산'),
      say(SAY.c9.ep, {m: fdate(euL[0], 'M'), r: fnum(epR, 0)}, '유럽 가스 2022 대비'),
      (ttf && ttf.roll && jkm && jkm.roll) ? say(SAY.c9.futRoll, {w: win, c: fctr(S.ttf_fut.last.contract), c2: fctr(S.jkm_fut.last.contract)}, 'TTF·JKM') : say(SAY.c9.fut, {c: fctr(S.ttf_fut.last.contract), w: win, tp: futTxt(ttf), c2: fctr(S.jkm_fut.last.contract), jp: futTxt(jkm)}, 'TTF·JKM 변화'),
      say(SAY.c9.sp, {s: fnum(jhl && jhl[1], 2), d: fdate(jhl && jhl[0])}, 'JKM−헨리허브')
    ];
    const sentences = [sentences0[1], sentences0[0], sentences0[3], sentences0[2], sentences0[4]];
    /* 난방도일(STEO 표 9c, 월간): 실적 마지막 달과 직전 10년 같은 달 평균 · 판정 없음 */
    const SB9 = U.steo_balance && U.steo_balance.series && U.steo_balance.months ? U.steo_balance : null;
    const hddAt = (() => { if (!SB9 || !SB9.series.us_hdd || !SB9.series.us_hdd_normal) return null; const i = SB9.months.indexOf(SB9.last_historical); if (i < 0) return null; return {m: SB9.months[i], v: SB9.series.us_hdd.values[i], n: SB9.series.us_hdd_normal.values[i], next: SB9.months.slice(i + 1, i + 4).map((m, k) => [m, SB9.series.us_hdd.values[i + 1 + k], SB9.series.us_hdd_normal.values[i + 1 + k]])}; })();
    if (hddAt && isNum(hddAt.v) && isNum(hddAt.n) && hddAt.n) {
      ctx.push({label: '미국 난방도일 (평년 대비)', value: hddAt.v / hddAt.n * 100, unit: '%', digits: 0, date: hddAt.m, freq: 'M', note: fnum(hddAt.v, 0) + ' / 직전 10년 평균 ' + fnum(hddAt.n, 0) + ' · STEO ' + fdate(SB9.edition, 'M'), path: 'U.steo_balance.series.{us_hdd,us_hdd_normal}'});
      sentences.push(say(SAY.c9.hdd, {m: fdate(hddAt.m, 'M'), x: fnum(hddAt.v, 0), k: 10, n: fnum(hddAt.n, 0), r: fnum(hddAt.v / hddAt.n * 100, 0), ed: fdate(SB9.edition, 'M')}, '난방도일(STEO)'));
      addIn('c9', '미국 난방도일·직전 10년 평균', 'U.steo_balance.series.{us_hdd,us_hdd_normal}', 'EIA STEO', hddAt.m, 'M');
    }
    addIn('c9', 'TTF·JKM 선물 (월물 표시)', 'S.{ttf,jkm}_fut.{last,w1,m1,weekly,monthly}', 'Yahoo', S.ttf_fut.last.date, 'D');
    addIn('c9', '미국 가스 저장 + 같은 주 범위', 'U.us_weekly.gas_storage.{cur,prev,band}', 'EIA', gs.last.date, 'W');
    addIn('c9', '유럽 가스·아시아 LNG (IMF)', 'S.{eu_gas_imf,asia_lng_imf}.monthly', 'IMF', euL[0], 'M');
    addIn('c9', '헨리허브 현물·선물', 'S.{henry_hub,ng_fut}', 'FRED · Yahoo', S.henry_hub.last.date, 'D');
    const wl = a => { const o = new Array(53).fill(null); a.forEach(([wk, v]) => { o[wk - 1] = v; }); return o; };
    const ep22 = mArr(eu.monthly).filter(([m]) => m.startsWith('2022')).map(([m, v]) => v), ep26 = Array.from({length: 12}, (_, i) => { const v = eu.monthly[CUR_YEAR + '-' + String(i + 1).padStart(2, '0')]; return isNum(v) ? v : null; });
    const tabs = [
      {id: 'm10', label: '조건부', model: 'M10', primary: true, vis: {type: 'bracket', by, w, cur: curW, e1, e2, b13, bandW: gs.band[w - 1], band: gs.band, prev: wl(gs.prev), curLine: wl(gs.cur), ep: {r: epR, m: euL[0], max: max22, maxM: max22m}}},
      {id: 'trend', label: '추세', model: 'M1', vis: {type: 'lines', title: 'TTF(€/MWh)·JKM($/MMBtu) 주평균, 근월물 연결', x: 'date', series: [{name: 'TTF', pts: (S.ttf_fut.weekly || []).slice(-60)}, {name: 'JKM', pts: (S.jkm_fut.weekly || []).slice(-60), alt: true}]}},
      {id: 'season', label: '계절', model: 'M3', vis: {type: 'calband', title: '미국 가스 저장 · 같은 주 ' + by.join('–') + ' 범위 (bcf)', unit: 'bcf', x: 'week', band: gs.band, cur: wl(gs.cur), prev: wl(gs.prev), curLabel: String(gs.year), prevLabel: String(gs.year - 1)}},
      {id: 'struct', label: '구조', model: 'M5', vis: {type: 'lines', title: 'JKM−헨리허브 ($/MMBtu, 주평균)', x: 'date', series: [{name: 'JKM−HH', pts: jh}], zero: true}},
      {id: 'event', label: '2022', model: 'M9', vis: {type: 'episode', a: ep22, b: ep26, max: max22, maxM: max22m, labelA: '2022', labelB: String(CUR_YEAR), title: '유럽 가스(IMF) 월별, 2022년과 같은 달 비교 ($/MMBtu)'}}
    ];
    /* TTF 달러 환산: TTF 주평균(€/MWh) × 같은 금요일 주의 H.10 달러/유로 주평균 ÷ 3.412142(MWh당 MMBtu). 환율이 늦은 주는 기다린다 */
    extra(() => {
      const FX = S.usd_per_eur, fw = FX && Array.isArray(FX.weekly) ? FX.weekly.filter(p => Array.isArray(p) && isD(p[0]) && isNum(p[1])) : []; if (!fw.length) return;
      const fxW = new Map(fw.map(p => [p[0], p[1]])), tw = (S.ttf_fut.weekly || []).filter(p => isNum(p[1]));
      const usd = tw.filter(([d]) => fxW.has(d)).map(([d, v]) => [d, v * fxW.get(d) / 3.412142, v, fxW.get(d)]); if (!usd.length) return;
      const l = usd[usd.length - 1], wait = tw.filter(([d]) => d > l[0]).map(p => p[0]), jkW = new Map((S.jkm_fut.weekly || []).filter(p => isNum(p[1]))), hw = new Map((S.henry_hub.weekly || []).filter(p => isNum(p[1])));
      ctx.push({label: 'TTF 달러 환산', value: l[1], unit: '$/MMBtu', digits: 2, date: l[0], freq: 'W', note: nj('주평균 €' + fnum(l[2], 2) + '/MWh × $' + fnum(l[3], 4) + '/€ ÷ 3.412', '근월물 연결', wait.length ? fdate(wait[wait.length - 1]) + ' 주는 환율 대기' : null), path: 'S.ttf_fut.weekly × S.usd_per_eur.weekly ÷ 3.412'});
      const cj = S.jkm_fut.last && S.jkm_fut.last.contract, ct = S.ttf_fut.last && S.ttf_fut.last.contract;
      if (jkW.has(l[0])) ctx.push({label: 'JKM−TTF (달러 환산)', value: jkW.get(l[0]) - l[1], unit: '$/MMBtu', digits: 2, date: l[0], freq: 'W', note: nj('같은 주 주평균', cj && ct && cj !== ct ? '근월물이 다르다(JKM ' + fctr(cj) + ' · TTF ' + fctr(ct) + ')' : null), path: 'S.jkm_fut.weekly − TTF 달러 환산'});
      const st = tabs.find(t => t.id === 'struct');
      if (st) { st.vis.title = 'JKM·TTF(달러 환산)와 헨리허브의 차 ($/MMBtu, 주평균)'; st.vis.series.push({name: 'TTF($)−HH', pts: usd.filter(p => hw.has(p[0])).map(p => [p[0], p[1] - hw.get(p[0])]), alt: true}, {name: 'JKM−TTF($)', pts: usd.filter(p => jkW.has(p[0])).map(p => [p[0], jkW.get(p[0]) - p[1]]), dash: true}); }
      const tr = tabs.find(t => t.id === 'trend');
      if (tr) tr.vis = {type: 'lines', title: 'TTF(달러 환산)·JKM 주평균 ($/MMBtu), 근월물 연결', x: 'date', series: [{name: 'TTF $', pts: usd.slice(-60).map(p => [p[0], p[1]])}, {name: 'JKM', pts: (S.jkm_fut.weekly || []).slice(-60), alt: true}]};
      addIn('c9', '달러/유로 (TTF 환산)', 'S.usd_per_eur.{last,weekly}', 'FRED H.10', FX.last && isD(FX.last.date) ? FX.last.date : fw[fw.length - 1][0], 'W', '주간 발표');
      if (FX.last && isD(FX.last.date)) freshX.push({src: 'H.10 환율', d: FX.last.date, freq: 'W', path: 'S.usd_per_eur.last'});
      got.add('TTF 달러 환산');
    });
    /* 미국 LNG 수출(EIA 천연가스 월보, 두 달 늦음): 맥락 행과 노드 숫자. 없으면 STEO 표 5a(추정 포함). 월보 뒤 달은 STEO 추정·전망 행으로 */
    let lng = null;
    extra(() => {
      const UL = U.us_lng, pts = UL && Array.isArray(UL.points) ? UL.points.filter(p => Array.isArray(p) && isM(p[0]) && isNum(p[1])) : [];
      if (pts.length) { const l = pts[pts.length - 1], y = pts.find(p => p[0] === addM(l[0], -12)); lng = {m: l[0], v: l[1], y: y ? y[1] : null, n: pts.length, est: false}; }
      else { const s = steoSer('us_lng_exports'); if (s && isM(s.m) && isNum(s.v)) lng = {m: s.m, v: s.v, y: s.y, n: s.hist.length, est: true}; }
      if (!lng) return;
      lng.yoy = isNum(lng.y) && lng.y ? (lng.v / lng.y - 1) * 100 : null;
      const ed = STEO_B && STEO_B.edition;
      ctx.push({label: '미국 LNG 수출', value: lng.v, unit: 'Bcf/d', digits: 2, date: lng.m, freq: 'M', note: nj(isNum(lng.y) ? '전년 같은 달 ' + fnum(lng.y, 2) + ' (' + fsg(lng.yoy, 1) + '%)' : null, lng.est ? 'STEO ' + fdate(ed, 'M') + '판 표 5a · 추정 포함' : '천연가스 월보'), path: lng.est ? 'U.steo_balance.series.us_lng_exports' : 'U.us_lng.points', node: 'n-lng'});
      /* 천연가스 월보(N9133US2)는 자료 달 두 달 뒤 말에 나온다(8월분 10.30). 경과일은 자료 달 + 2개월 1일부터 세어
       * 발표 직후는 신선, 다음 발표를 놓치면 지연이다. 발표일(release)이 더 빠른 간격을 보이면 그 간격을 쓴다 */
      const lag = lng.est ? 0 : (() => { const r = U.us_lng.release; if (!isD(r)) return 2; const k = mIdx(r.slice(0, 7)) - mIdx(lng.m); return Math.max(0, Math.min(2, k)); })();
      addIn('c9', lng.est ? '미국 LNG 수출 (STEO 표 5a, 추정 포함)' : '미국 LNG 수출 (천연가스 월보)', lng.est ? 'U.steo_balance.series.us_lng_exports' : 'U.us_lng.points', lng.est ? 'EIA STEO' : 'EIA', lng.m, 'M', lng.n + '개월', null, lag);
      if (!lng.est) freshX.push({src: 'EIA 월보(LNG)', d: lng.m, freq: 'M', lag, path: 'U.us_lng.last'});
      const s = !lng.est ? steoSer('us_lng_exports') : null;
      if (s && isM(s.m) && s.m > lng.m && isNum(s.v)) {
        const f0 = s.fcst.find(p => isNum(p[1]));
        ctx.push({label: 'LNG 수출 STEO 추정·전망', value: s.v, unit: 'Bcf/d', digits: 2, date: s.m, freq: 'M', note: nj('추정 ' + fdate(addM(lng.m, 1), 'M') + (addM(lng.m, 1) < s.m ? '~' + fdate(s.m, 'M') : ''), f0 ? fdate(f0[0], 'M') + ' 전망 ' + fnum(f0[1], 2) : null, 'STEO ' + fdate(ed, 'M') + '판'), path: 'U.steo_balance.series.us_lng_exports', node: 'n-lng'});
        addIn('c9', 'LNG 수출 STEO 추정·전망', 'U.steo_balance.series.us_lng_exports', 'EIA STEO', s.m, 'M');
      }
      got.add('미국 LNG 수출');
    });
    checks.c9 = {rows, ctx, flags, sentences, tabs, primary: 2, posRow: 2, e1, e2, b13, lng,
      kpiSub: '3월 말 조건부 ' + (posOf(e1) || '—') + '·' + (posOf(e2) || '—') + ' · 유럽 2022 최고 ' + fnum(epR, 0) + '%'};
  });

  /* 월간 지수 행: 3개월 연율(수준), 전월비 − 직전 3개월 평균(가속, 방향), 3개월 연율 순위 */
  function idxStats(key) {
    const s = S[key]; if (!s || !s.monthly) return null;
    const o = s.monthly; const mm = mChg(o, 1, true); const lm = mLastFull(o);
    const acc = m => { const prior = [1, 2, 3].map(k => mm[addM(m, -k)]); return isNum(mm[m]) && prior.every(isNum) ? mm[m] - mean(prior) : null; };
    const accH = Object.keys(mm).map(acc).filter(isNum);
    const ann = {}; Object.keys(o).forEach(m => { const a = o[addM(m, -3)]; if (isNum(a)) ann[m] = ((o[m] / a) ** 4 - 1) * 100; });
    const rk = rankPos(Object.values(ann), ann[lm], -1, Object.keys(ann).sort()[0]);
    /* 전년 같은 달이 결측(CPI 2025-10)이면 그 전 달을 쓰고 전년*로 적는다 (⑫와 같은 처리) */
    let yb = o[addM(lm, -12)], yoyFall = null; if (!isNum(yb) && isNum(o[addM(lm, -13)])) { yb = o[addM(lm, -13)]; yoyFall = addM(lm, -13); }
    return {key, lm, mm: mm[lm], acc: acc(lm), accH, ann: ann[lm], annS: ann, rk, yoy: isNum(yb) ? (o[lm] / yb - 1) * 100 : null, yoyFall, yoyS: mChg(o, 12, true), src: s.source};
  }
  function idxRow(id, label, sub, st) {
    return {id, label, sub, judged: true, value: st.ann, unit: '% 3개월 연율', digits: 1, date: st.lm, freq: 'M',
      delta: isNum(st.acc) ? {abs: st.acc, unit: '%p', show: fsg(st.acc, 2) + '%p', w: '전월비−직전3', basis: '전월비 ' + fsg(st.mm, 2) + '%'} : null,
      pos: st.rk, dir: judgeDir(st.acc, -1, sd(st.accH), st.accH.length, rule), lvl: st.rk ? {v: st.rk.verdict} : {v: '미수집'}, path: 'S.' + st.key + '.monthly', src: st.src, yoy: st.yoy, arr: mArr(st.annS)};
  }
  /* 기여표(L.contrib.ppi·cpi, 대시보드 기여표와 같은 엔진): 코드별 행에서 parts 의 기여(%p). 측정은 prefs 가운데 합계 값이 있는 첫 것
   * (CPI 2026-10 전년비는 2025-10 결측으로 비어 3개월 변화를 쓴다). 고정 가중 근사라 부분 합이 합계와 조금 다르다 */
  const MS_NAME = {c_yoy: '전년비', c_qoq: '3개월 변화', c_mom: '전월비'};
  function contribOf(CB, parts, prefs) {
    if (!CB || typeof CB !== 'object' || !Array.isArray(CB.rows) || !CB.rows.length || !isM(CB.asof)) return null;
    const by = {}; CB.rows.forEach(r => { if (r && typeof r.code === 'string') by[r.code] = r; });
    const head = by[CB.head] || CB.rows.find(r => r && r.level === 0); if (!head) return null;
    const ms = prefs.find(k => isNum(head[k]) && parts.some(([c]) => by[c] && isNum(by[c][k]))); if (!ms) return null;
    return {ms, msName: MS_NAME[ms], head, by, total: head[ms], asof: CB.asof, ri: isM(CB.ri_month) ? CB.ri_month : null, carried: !!CB.carried, n: CB.rows.length,
      bars: parts.map(([code, name]) => ({code, name, v: by[code] && isNum(by[code][ms]) ? by[code][ms] : null}))};
  }
  /* 탭: 항목 막대 + 합계, 세 측정 표, 이력 선(hist) */
  function contribVis(o, CB, title, headName, table, histCodes) {
    const H = CB.hist, hm = H && Array.isArray(H.months) && H[o.ms] ? H.months : [];
    const series = hm.length ? histCodes.map(([code, name], i) => ({name, pts: hm.map((m, k) => [m, (H[o.ms][code] || [])[k]]).filter(p => isM(p[0]) && isNum(p[1])), alt: i > 0, dash: i > 1})).filter(x => x.pts.length > 1) : [];
    const cell = (r, k) => r && isNum(r[k]) ? r[k] : null;
    return {type: 'contrib', title: title + ' ' + o.msName + ' 기여 (%p' + (o.ms === 'c_qoq' ? ', 연율 아님' : '') + ') · ' + fdate(o.asof, 'M'), bars: o.bars, total: o.total, totalLabel: headName, d: 2,
      table: table.map(([code, name]) => ({name, mom: cell(o.by[code], 'c_mom'), qoq: cell(o.by[code], 'c_qoq'), yoy: cell(o.by[code], 'c_yoy')})).filter(r => [r.mom, r.qoq, r.yoy].some(isNum)),
      hist: series.length ? {title: o.msName + ' 기여 이력 (%p)', x: 'month', zero: true, series} : null,
      note: nj(o.ri ? 'RI(' + fdate(o.ri, 'M') + ' 상대 중요도) × 항목 변화' : null, '고정 가중 근사라 항목 합이 합계와 조금 다르다', o.carried ? '이전 실행 값' : null)};
  }

  /* ================= C10 연관 원자재 ================= */
  guard('c10', function () {
    const mk = (id, label, key, sub, useYoy) => { const s = S[key]; const w = seriesWin(key); const rk = rankOf(key, -1); const lmK = mLastFull(s.monthly); const yoyM = s.freq === 'M' ? (() => { const a = s.monthly[addM(lmK, -12)]; return isNum(a) ? (s.monthly[lmK] / a - 1) * 100 : null; })() : (s.y1 ? (s.last.value / s.y1.value - 1) * 100 : null);
      /* 석탄·식품지수: 방향 = 전년비(%)의 부호, σ = 전년비 이력의 표준편차 (스펙 §3.12) */
      let delta = deltaObj(w, '', true), dir = judgeDir(w && w.pct, -1, w && w.sig, w ? w.nCh : 0, rule, w && w.roll === '만기 교체' ? '만기 교체' : null);
      if (useYoy) { const yh = Object.values(mChg(s.monthly, 12, true)); delta = isNum(yoyM) ? {abs: yoyM, pct: yoyM, unit: '%', usePct: true, show: fsg(yoyM, 1) + '%', w: '전년비', d0: addM(lmK, -12), basis: '전년 같은 달'} : null; dir = judgeDir(yoyM, -1, sd(yh), yh.length, rule); }
      return {id, label, sub: sub || (s.freq === 'M' ? 'IMF 월간' : '근월물'), judged: true, value: s.freq === 'M' ? s.monthly[lmK] : s.last.value, unit: s.unit.replace('달러', '$').replace('센트', '¢'), digits: s.digits, date: s.freq === 'M' ? lmK : s.last.date, freq: s.freq,
        delta, pos: rk, dir, lvl: rk ? {v: rk.verdict} : {v: '미수집'}, path: 'S.' + key, src: s.source, yoy: yoyM, arr: s.freq === 'M' ? mArr(s.monthly) : histOf(s)}; };
    /* 가정식 CPI: 가속(전월비 − 직전 3개월 평균) */
    const fh = S.cpi_food_home.monthly; const mmF = mChg(fh, 1, true); const lmF = mLastFull(fh);
    const acc = m => { const prior = [1, 2, 3].map(k => mmF[addM(m, -k)]); return isNum(mmF[m]) && prior.every(isNum) ? mmF[m] - mean(prior) : null; };
    const accHist = Object.keys(mmF).map(acc).filter(isNum);
    const ann3 = m => isNum(fh[m]) && isNum(fh[addM(m, -3)]) ? ((fh[m] / fh[addM(m, -3)]) ** 4 - 1) * 100 : null;
    const ann = {}; Object.keys(fh).forEach(m => { const v = ann3(m); if (isNum(v)) ann[m] = v; });
    const rkF = rankPos(Object.values(ann), ann[lmF], -1, Object.keys(ann).sort()[0]);
    const rows = [
      mk('c10-coal', '호주 석탄', 'coal_au_imf', 'IMF 월간 · 전년비 판정', true),
      mk('c10-cu', 'COMEX 구리', 'copper_fut'),
      mk('c10-wheat', '밀 선물', 'wheat_fut'),
      mk('c10-corn', '옥수수 선물', 'corn_fut'),
      mk('c10-food', 'IMF 식품지수', 'food_index_imf', 'IMF 월간 · 전년비 판정', true),
      {id: 'c10-cpif', label: '가정식 CPI', sub: '소비자 끝 · 가속', judged: true, value: ann[lmF], unit: '% 3개월 연율', digits: 1, date: lmF, freq: 'M',
        delta: isNum(acc(lmF)) ? {abs: acc(lmF), unit: '%p', show: fsg(acc(lmF), 2) + '%p', w: '전월비−직전3', basis: '가속'} : null, pos: rkF, dir: judgeDir(acc(lmF), -1, sd(accHist), accHist.length, rule), lvl: rkF ? {v: rkF.verdict} : {v: '미수집'}, path: 'S.cpi_food_home.monthly', src: 'FRED', arr: mArr(ann)}
    ];
    /* 전력·가스 요금 (CPI 전기·도시가스): 석탄·가스 투입의 소비자 끝. 자료가 없으면 행을 만들지 않고 대장에 남는다 */
    const EL = idxStats('cpi_electricity'), UG = idxStats('cpi_utility_gas');
    if (EL) rows.push(idxRow('c10-elec', 'CPI 전기', '소비자 끝 · 가속', EL));
    if (UG) rows.push(idxRow('c10-ugas', 'CPI 도시가스', '소비자 끝 · 가속', UG));
    const cuI = S.copper_imf.monthly, cuF = S.copper_fut.monthly; const cuS = Object.keys(cuI).filter(m => isNum(cuF[m])).sort().map(m => [m, cuF[m] * 2204.62 - cuI[m]]); const cuL = cuS[cuS.length - 1];
    const prox = ks => mean(ks.map(k => C[k] && C[k].m1 ? (C[k].last.value / C[k].m1.value - 1) * 100 : null));
    const matEv = records.filter(r => r.node === 'n-materials');
    const ctx = [
      {label: 'COMEX−IMF 구리 차', value: cuL && cuL[1], unit: '$/t', digits: 0, date: cuL && cuL[0], freq: 'M', note: '같은 달 · ×2204.62', path: 'copper_fut.monthly×2204.62 − copper_imf.monthly'},
      {label: '알루미늄 선물', value: S.aluminum_fut.last.value, unit: '$/t', digits: 1, date: S.aluminum_fut.last.date, freq: 'D', note: '1개월 ' + fsg((S.aluminum_fut.last.value / S.aluminum_fut.m1.value - 1) * 100, 1) + '%', path: 'S.aluminum_fut'},
      {label: '대두 선물', value: S.soy_fut.last.value, unit: '¢/bu', digits: 2, date: S.soy_fut.last.date, freq: 'D', note: '1개월 ' + fsg((S.soy_fut.last.value / S.soy_fut.m1.value - 1) * 100, 1) + '%', path: 'S.soy_fut'},
      {label: '계란 소매', value: S.eggs.last.value, unit: '$/12개', digits: 2, date: S.eggs.last.date.slice(0, 7), freq: 'M', note: '전년 ' + fnum(S.eggs.y1 && S.eggs.y1.value, 2), path: 'S.eggs'},
      {label: '전력주 (VST·CEG·NRG)', value: prox(['VST', 'CEG', 'NRG']), unit: '% 1개월', digits: 1, date: C.VST && C.VST.last.date, freq: 'D', note: '대리지표 · 판정 없음', path: 'C.{VST,CEG,NRG}', sign: true},
      {label: '구리 광산주 (FCX·SCCO·BHP)', value: prox(['FCX', 'SCCO', 'BHP']), unit: '% 1개월', digits: 1, date: C.FCX && C.FCX.last.date, freq: 'D', note: '대리지표 · 판정 없음', path: 'C.{FCX,SCCO,BHP}', sign: true},
      {label: '비료주 (CF·NTR·MOS)', value: prox(['CF', 'NTR', 'MOS']), unit: '% 1개월', digits: 1, date: C.CF && C.CF.last.date, freq: 'D', note: '대리지표 · 판정 없음 · 기록 ' + matEv.length + '건', path: 'C.{CF,NTR,MOS}', sign: true}
    ];
    const jF = [jumpOf('food_index_imf', 'IMF 식품지수'), jumpOf('cpi_food_home', '가정식 CPI')];
    const cu = rows[1], coal = rows[0], fd = rows[4];
    const sentences = [
      say(SAY.c10.coal, {m: fdate(coal.date, 'M'), a: fabs(coal.yoy, 0), c: c2(coal.yoy)}, '호주 석탄 전년비'),
      say(SAY.c10.cu, {b: fabs((S.copper_fut.last.value / S.copper_fut.m1.value - 1) * 100, 1), s1: s3(S.copper_fut.last.value - S.copper_fut.m1.value), c: fabs(cu.yoy, 1), s2: c2(cu.yoy), d: fdate(S.copper_fut.last.date)}, '구리 선물'),
      say(SAY.c10.food, {m: fdate(fd.date, 'M'), dd: fabs(fd.yoy, 1), c: c2(fd.yoy), e: fnum(ann[lmF], 1), m2: fdate(lmF, 'M')}, '식품')
    ];
    if (EL && UG) sentences.push(say(SAY.c10.util, {m: fdate(EL.lm, 'M'), a: fnum(EL.ann, 1), b: fnum(UG.ann, 1)}, '전기·도시가스 CPI'));
    addIn('c10', '석탄·식품지수·곡물 (IMF 월간)', 'S.{coal_au_imf,food_index_imf,wheat_imf,maize_imf,soy_imf}.monthly', 'IMF', coal.date, 'M');
    addIn('c10', '구리·알루미늄·곡물 선물', 'S.{copper_fut,aluminum_fut,wheat_fut,corn_fut,soy_fut}', 'Yahoo', S.copper_fut.last.date, 'D');
    addIn('c10', '가정식 CPI', 'S.cpi_food_home.monthly', 'FRED', lmF, 'M', '25.10 결측');
    if (EL) addIn('c10', 'CPI 전기·도시가스', 'S.cpi_{electricity,utility_gas}.monthly', 'FRED', EL.lm, 'M', '25.10 결측');
    addIn('c10', '전력·광산·비료 주가 (대리)', 'C.{VST,CEG,NRG,FCX,SCCO,BHP,CF,NTR,MOS}', 'Yahoo', C.VST.last.date, 'D');
    const table = [
      {name: '석탄·전력', input: coal, inputTxt: '석탄 전년비 ' + fsg(coal.yoy, 0) + '%', consumer: EL ? rows.find(r => r.id === 'c10-elec') : null, consumerTxt: EL ? 'CPI 전기 3개월 연율 ' + fnum(EL.ann, 1) + '%' : 'CPI 전기 · 미수집 (DB 있음)', d: coal.date},
      {name: '구리', input: cu, inputTxt: '구리 ' + (cu.delta ? cu.delta.show : '') + ' (' + win + ')', consumer: null, consumerTxt: '직접 소비자 품목 없음', d: cu.date},
      {name: '식품', input: fd, inputTxt: '식품지수 전년비 ' + fsg(fd.yoy, 1) + '%', consumer: rows[5], consumerTxt: '가정식 CPI 3개월 연율 ' + fnum(ann[lmF], 1) + '%', d: fd.date}
    ];
    const tabs = [
      {id: 'tbl', label: '투입·소비자', model: 'M1', primary: true, vis: {type: 'c10table', table, rows}},
      {id: 'jump', label: '급변', model: 'M1', vis: {type: 'jumps', title: '식품 투입 → 소비자 · 창 변화와 평소 변화폭 배수', rows: jF, none: jumpNone(jF), big: rule.big_multiple}},
      {id: 'struct', label: '구조', model: 'M5', vis: {type: 'mbars', title: 'COMEX−IMF 구리 ($/톤, 같은 달)', bars: cuS.slice(-18)}},
      {id: 'rank', label: '순위', model: 'M2', vis: {type: 'ranklist', rows}}
    ];
    checks.c10 = {rows, ctx, flags: [], sentences, tabs, primary: 1, posRow: 1, jF,
      kpiSub: '석탄 ' + fsg(coal.yoy, 0) + '% y/y · 식품 ' + fsg(fd.yoy, 1) + '% y/y'};
  });

  /* ================= C11 산업비용 (PPI 최종수요 서비스) ================= */
  guard('c11', function () {
    const SV = idxStats('ppi_services'), TR = idxStats('ppi_transport'), TD = idxStats('ppi_trade');
    const miss = (id, label, key) => ({id, label, sub: key + ' · DB 있음', judged: true, value: null, unit: '%', date: null, freq: 'M', delta: null, pos: null, dir: {v: '미수집'}, lvl: {v: '미수집'}, path: 'S.' + key, src: '카탈로그', missing: {status: 'DB 있음', route: key + ' → ENERGY_LIVE.series (group inflation)'}});
    const rows = [
      SV ? idxRow('c11-svc', 'PPI 서비스', '최종수요 · 가속', SV) : miss('c11-svc', 'PPI 서비스', 'WPSFD42'),
      TR ? idxRow('c11-trn', 'PPI 운송·창고', '경유 전가 경로 · 가속', TR) : miss('c11-trn', 'PPI 운송·창고', 'WPSFD422'),
      TD ? idxRow('c11-trd', 'PPI 유통마진', '도소매 마진 · 가속', TD) : miss('c11-trd', 'PPI 유통마진', 'WPSFD423')
    ];
    /* 경유 소매가 없어도 PPI 행만으로 점검을 낸다(전가 적합과 투입 맥락만 빠진다) */
    const RD = S.retail_diesel && S.retail_diesel.last ? S.retail_diesel : null;
    const dy = RD && RD.y1 ? (RD.last.value / RD.y1.value - 1) * 100 : null;
    const prox = k => C[k] && C[k].m1 ? (C[k].last.value / C[k].m1.value - 1) * 100 : null;
    const ctx = [
      {label: '경유 소매 전년비 (투입)', value: dy, unit: '%', digits: 1, date: RD && RD.last.date, freq: 'W', note: '전가 입력 · 판정 없음', path: 'S.retail_diesel.{last,y1}', sign: true},
      {label: 'UPS 주가', value: prox('UPS'), unit: '% 1개월', digits: 1, date: C.UPS && C.UPS.last.date, freq: 'D', note: '대리지표', path: 'C.UPS', sign: true},
      {label: '항공사 주가 (DAL·UAL)', value: mean([prox('DAL'), prox('UAL')]), unit: '% 1개월', digits: 1, date: C.DAL && C.DAL.last.date, freq: 'D', note: '대리지표', path: 'C.{DAL,UAL}', sign: true}
    ];
    if (TR) ctx.unshift({label: 'PPI 운송·창고 전년비', value: TR.yoy, unit: '%', digits: 1, date: TR.lm, freq: 'M', note: '전가 출력', path: 'S.ppi_transport.monthly', sign: true});
    /* 전가 자리: 경유 소매와 PPI 운송·창고의 급변 값 */
    const jT = [jumpOf('retail_diesel', '경유 소매'), jumpOf('ppi_transport', 'PPI 운송·창고')];
    const sentences = [];
    if (TR) sentences.push(say(SAY.c11.trn, {m: fdate(TR.lm, 'M'), x: fabs(TR.mm, 2), s: s3(TR.mm), a: fnum(TR.ann, 1), from: fym(TR.rk && TR.rk.from), N: TR.rk && TR.rk.N, k: TR.rk && TR.rk.k}, 'PPI 운송·창고'));
    if (SV && TD) sentences.push(say(TR ? SAY.c11.svc : SAY.c11.svc0, {a: fnum(SV.ann, 1), b: fnum(TD.ann, 1), m: fdate(SV.lm, 'M')}, 'PPI 서비스·유통마진'));
    if (!TR) sentences.push(say(SV || TD ? SAY.c11.notr : SAY.c11.alt, {x: fsg(dy, 1), m: RD ? fdate(RD.last.date) : null}, '경유 소매'));
    if (jT.every(j => !j.miss)) sentences.push(say(SAY.c4.jump, {w: win, a: jT[0].name, x: zfmt(jT[0].z, rule), b: jT[1].name, y: zfmt(jT[1].z, rule), tag: jT.some(j => j.big) ? '(급변)' : '(급변 없음)'}, '급변'));
    if (SV) addIn('c11', 'PPI 서비스·운송·유통마진 (계절조정)', 'S.ppi_{services,transport,trade}.monthly', 'BLS', SV.lm, 'M');
    const WF = [['FD412', '에너지'], ['FD411', '식품'], ['FD413', '재화(식품·에너지 제외)'], ['FD423', '유통마진'], ['FD422', '운송·창고'], ['FD421', '기타 서비스'], ['FD43', '건설']];
    const CPc = safe(() => contribOf(L.contrib && L.contrib.ppi, WF, ['c_yoy', 'c_qoq', 'c_mom']));
    const ppiVis = CPc ? safe(() => contribVis(CPc, L.contrib.ppi, 'PPI 최종수요', '최종수요', WF.concat([['FD41', '재화'], ['FD42', '서비스']]), [['FD412', '에너지'], ['FD42', '서비스'], ['FD411', '식품']])) : null;
    if (ppiVis) {
      addIn('c11', 'PPI 최종수요 기여표', 'L.contrib.ppi.{rows,hist}', 'BLS · 계산', CPc.asof, 'M', CPc.n + '행' + (CPc.carried ? ' · 이전 값' : ''));
      const fe = CPc.by.FD412, fs2 = CPc.by.FD42;
      if (CPc.ms === 'c_yoy' && fe && fs2) { const s = sayOk(SAY.c11.ppi, {m: fdate(CPc.asof, 'M'), x: fabs(CPc.total, 1), s: s3(CPc.total), a: fsg(fe.c_yoy, 2), b: fsg(fs2.c_yoy, 2), ri: fdate(CPc.ri, 'M')}); if (s) sentences.push(s); }
      got.add('PPI 기여표');
    } else addIn('c11', 'PPI 최종수요 기여표', 'X.ppi_contrib (core.json series/PPIFIS/contribution-table)', '저장소', null, 'M', '미수집');
    addIn('c11', '경유 소매 (투입)', 'S.retail_diesel', 'FRED', RD && RD.last.date, 'W');
    const wf = WF;
    const have = [SV, TR, TD].filter(Boolean);
    const tabs = [
      have.length ? {id: 'trend', label: '추세', model: 'M1', primary: true, vis: {type: 'lines', title: 'PPI 3개월 연율 (%)', x: 'month', series: [[SV, '서비스'], [TR, '운송·창고'], [TD, '유통마진']].filter(([st]) => st).map(([st, name], i) => ({name, pts: Object.keys(st.annS).sort().map(m => [m, st.annS[m]]), alt: i > 0, dash: i > 1})), zero: true}} : null,
      {id: 'jump', label: '급변', model: 'M1', vis: {type: 'jumps', title: '경유 → 운송비 · 창 변화와 평소 변화폭 배수', rows: jT, none: jumpNone(jT), big: rule.big_multiple}},
      {id: 'm6', label: '분해', model: 'M6', primary: !have.length, vis: ppiVis || {type: 'skeleton', title: 'PPI 최종수요 전년비 기여 (%p)', parts: wf, route: 'PPIFIS 기여표(c_yoy) → live-data.js (P1 나머지)'}},
      have.length ? {id: 'rank', label: '순위', model: 'M2', vis: {type: 'ranklist', rows: rows.filter(r => isNum(r.value))}} : null
    ].filter(Boolean);
    /* 화물 맥락(판정 없음): 장거리 트럭(TL) PPI와 Cass 화물지수는 계절조정 전이라 전년 같은 달과만 비교한다 */
    const freight = [];
    extra(() => {
      const o = S.ppi_truckload && S.ppi_truckload.monthly; if (!o || typeof o !== 'object') return;
      const lm = mLastFull(o); if (!isM(lm)) return;
      const a = o[addM(lm, -12)], p = o[addM(lm, -1)], yoy = isNum(a) && a ? (o[lm] / a - 1) * 100 : null, mm = isNum(p) && p ? (o[lm] / p - 1) * 100 : null; if (!isNum(yoy)) return;
      const at = ctx.findIndex(r => r.label === 'PPI 운송·창고 전년비');
      ctx.splice(at + 1, 0, {label: 'PPI 장거리 트럭(TL) 전년비', value: yoy, unit: '%', digits: 1, date: lm, freq: 'M', note: nj('계절조정 전 지수', isNum(mm) ? '전월비 ' + fsg(mm, 1) + '%' : null), path: 'S.ppi_truckload.monthly', sign: true});
      const s = sayOk(SAY.c11.tl, {m: fdate(lm, 'M'), x: fabs(yoy, 1), c: c2(yoy)}); if (s) sentences.push(s);
      freight.push({name: 'PPI 트럭(TL)', pts: mArr(mChg(o, 12, true)), src: 'BLS'});
      addIn('c11', '트럭 운임 PPI (장거리 TL, 원지수)', 'S.ppi_truckload.monthly', 'BLS (FRED CSV)', lm, 'M');
      freshX.push({src: 'PPI 트럭(BLS)', d: lm, freq: 'M', path: 'S.ppi_truckload.last'});
      if (Object.keys(o).length >= 13) got.add('트럭 운임 PPI');
    });
    extra(() => {
      const sh = S.cass_shipments && S.cass_shipments.monthly, ex = S.cass_expenditures && S.cass_expenditures.monthly; if (!sh || typeof sh !== 'object') return;
      const ys = mChg(sh, 12, true), ye = ex ? mChg(ex, 12, true) : {}, per = {};
      if (ex) for (const m of Object.keys(sh)) { const a = sh[m], b = ex[m], a0 = sh[addM(m, -12)], b0 = ex[addM(m, -12)]; if ([a, b, a0, b0].every(isNum) && a && a0 && b0) per[m] = (b / a) / (b0 / a0) * 100 - 100; }
      const lm = mLastFull(sh); if (!isM(lm) || !isNum(ys[lm])) return;
      /* 출처 표기는 소유자가 정한 'Cass Information Systems' 하나다(이전 스냅숏의 다른 표기를 이어 쓰지 않는다).
       * 인용 조건이 있는 자료라 툴팁(맥락 행)만으로는 안 된다: 화물 탭 그림 아래 자료 줄, 자료 시점·입력 신선도 행에 글자로 둔다(휴대폰에는 툴팁이 없다) */
      const CASS = 'Cass Information Systems', cr = nj(CASS, '계절조정 전');
      const rs = [{label: 'Cass 물동량 전년비', value: ys[lm], key: 'shipments'}, {label: 'Cass 운임 지출 전년비', value: ye[lm], key: 'expenditures'}, {label: 'Cass 건당 운임 (지출÷물동량) 전년비', value: per[lm], key: 'shipments,expenditures'}]
        .filter(r => isNum(r.value)).map(r => ({label: r.label, value: r.value, unit: '%', digits: 1, date: lm, freq: 'M', note: cr, path: 'S.cass_{' + r.key + '}.monthly', sign: true}));
      ctx.push(...rs);
      if (isNum(ye[lm]) && isNum(per[lm])) { const s = sayOk(SAY.c11.cass, {m: fdate(lm, 'M'), a: fsg(ys[lm], 1), b: fsg(ye[lm], 1), c: fabs(per[lm], 1), s: s3(per[lm])}); if (s) sentences.push(s); }
      freight.push({name: 'Cass 물동량', pts: mArr(ys), alt: true, src: CASS}, {name: 'Cass 건당 운임', pts: mArr(per), alt: true, dash: true, src: CASS});
      addIn('c11', CASS + ' 화물 물동량·지출 (원지수)', 'S.cass_{shipments,expenditures}.monthly', CASS + ' (FRED)', lm, 'M');
      freshX.push({src: CASS, d: lm, freq: 'M', path: 'S.cass_shipments.last'});
      if (ex) got.add('화물 물동량·지출 (Cass)');
    });
    /* 그림 아래 자료 줄: 그린 선의 원천만, 선 순서대로 (예: 자료: BLS(FRED), Cass Information Systems(FRED)) */
    extra(() => {
      const ser = freight.map(x => ({...x, pts: x.pts.slice(-36)})).filter(x => x.pts.length > 1); if (!ser.length) return;
      tabs.push({id: 'freight', label: '화물', model: 'M1', vis: {type: 'lines', title: '트럭 운임 PPI·Cass 화물 전년비 (%, 계절조정 전)', x: 'month', zero: true, series: ser,
        src: '자료: ' + [...new Set(ser.map(x => x.src))].map(s => s + '(FRED)').join(', ')}});
    });
    /* 트럭 주가(대리지표, 운임 아님): LTL 세 회사와 트럭·인터모달 세 회사의 1개월 변화 평균 */
    extra(() => {
      const ok = k => C[k] && C[k].last && C[k].m1 && isNum(C[k].last.value) && isNum(C[k].m1.value) && C[k].m1.value && isD(C[k].last.date);
      const grp = ks => { const a = ks.filter(ok); return a.length ? {v: mean(a.map(k => (C[k].last.value / C[k].m1.value - 1) * 100)), n: a.length, d: a.map(k => C[k].last.date).sort().slice(-1)[0]} : null; };
      const g1 = ['ODFL', 'SAIA', 'XPO'], g2 = ['JBHT', 'KNX', 'WERN'], a = grp(g1), b = grp(g2); if (!a && !b) return;
      if (a) ctx.push({label: 'LTL 트럭 주가 (ODFL·SAIA·XPO)', value: a.v, unit: '% 1개월', digits: 1, date: a.d, freq: 'D', note: nj('대리지표 · 운임 아님', a.n < 3 ? a.n + '/3종' : null), path: 'C.{ODFL,SAIA,XPO}.{last,m1}', sign: true});
      if (b) ctx.push({label: '트럭·인터모달 주가 (JBHT·KNX·WERN)', value: b.v, unit: '% 1개월', digits: 1, date: b.d, freq: 'D', note: nj('대리지표 · 운임 아님', b.n < 3 ? b.n + '/3종' : null), path: 'C.{JBHT,KNX,WERN}.{last,m1}', sign: true});
      if (a && b) { const s = sayOk(SAY.c11.trk, {a: fabs(a.v, 1), s1: s3(a.v), b: fabs(b.v, 1), s2: s3(b.v)}); if (s) sentences.push(s); }
      const n = g1.concat(g2).filter(ok).length;
      addIn('c11', '트럭 주가', 'C.{ODFL,SAIA,XPO,JBHT,KNX,WERN}', 'Yahoo', [a, b].filter(Boolean).map(x => x.d).sort()[0], 'D', n + '/6종');
      if (n === 6) got.add('트럭 주가');
    });
    checks.c11 = {rows, ctx, flags: [], sentences, tabs, primary: 1, posRow: 1, jT,
      kpiSub: TR ? '서비스 ' + fnum(SV && SV.ann, 1) + '% · 유통마진 ' + fnum(TD && TD.ann, 1) + '% (3개월 연율)'
        : SV || TD ? '운송·창고 미수집 · ' + [SV && '서비스 ' + fnum(SV.ann, 1) + '%', TD && '유통마진 ' + fnum(TD.ann, 1) + '%'].filter(Boolean).join(' · ') + ' (3개월 연율)'
        : '미수집' + (isNum(dy) ? ' · 경유 소매 ' + fsg(dy, 0) + '% y/y' : '')};
  });

  /* ================= C12 소비자물가 (M1·M2, 휘발유 소매 부분월은 맥락) ================= */
  guard('c12', function () {
    function cpiStats(key) {
      const o = S[key].monthly; const mm = mChg(o, 1, true); const lm = mLastFull(o);
      const acc = m => { const prior = [1, 2, 3].map(k => mm[addM(m, -k)]); return isNum(mm[m]) && prior.every(isNum) ? mm[m] - mean(prior) : null; };
      const accH = Object.keys(mm).map(acc).filter(isNum);
      const ann = {}; Object.keys(o).forEach(m => { const a = o[addM(m, -3)]; if (isNum(a)) ann[m] = ((o[m] / a) ** 4 - 1) * 100; });
      const rk = rankPos(Object.values(ann), ann[lm], -1, Object.keys(ann).sort()[0]);
      const y1d = S[key].y1 && S[key].y1.date ? S[key].y1.date.slice(0, 7) : null; const fall = y1d && y1d !== addM(lm, -12);
      return {lm, mm: mm[lm], acc: acc(lm), accH, ann: ann[lm], annS: ann, rk, yoy: S[key].y1 ? (o[lm] / S[key].y1.value - 1) * 100 : null, yoyFall: fall ? y1d : null};
    }
    const A = cpiStats('cpi_all'), K = cpiStats('cpi_core');
    /* 맥락 계열(CPI 휘발유·항공운임)은 없어도 ⑫ 판정(CPI 종합·근원)은 선다 */
    const G = S.cpi_gasoline && S.cpi_gasoline.monthly ? cpiStats('cpi_gasoline') : {lm: null, mm: null, yoy: null};
    const AF = S.cpi_airfare && S.cpi_airfare.monthly ? S.cpi_airfare.monthly : null;
    /* 휘발유 소매 부분월: 진행 중인 달 소매 평균의 전월 평균 대비 변화(판정 없는 맥락. 적합·추정은 하지 않는다) */
    const rg = S.retail_gasoline; const pm = rg && rg.partial_month; const lmR = rg ? mLastFull(rg.monthly) : null;
    const r = pm && isNum(rg.monthly[lmR]) ? (pm.value / rg.monthly[lmR] - 1) * 100 : null;
    const part = {r, pm, lm: lmR};
    const rows = [
      {id: 'c12-all', label: 'CPI 종합', sub: '계절조정 · 가속', judged: true, value: A.ann, unit: '% 3개월 연율', digits: 1, date: A.lm, freq: 'M',
        delta: isNum(A.acc) ? {abs: A.acc, unit: '%p', show: fsg(A.acc, 2) + '%p', w: '전월비−직전3', basis: '전월비 ' + fsg(A.mm, 2) + '%'} : null, pos: A.rk, dir: judgeDir(A.acc, -1, sd(A.accH), A.accH.length, rule), lvl: A.rk ? {v: A.rk.verdict} : {v: '미수집'}, path: 'S.cpi_all.monthly', src: 'FRED', arr: mArr(A.annS)},
      {id: 'c12-core', label: '근원 CPI', sub: '식품·에너지 제외', judged: true, value: K.ann, unit: '% 3개월 연율', digits: 1, date: K.lm, freq: 'M',
        delta: isNum(K.acc) ? {abs: K.acc, unit: '%p', show: fsg(K.acc, 2) + '%p', w: '전월비−직전3', basis: '전월비 ' + fsg(K.mm, 2) + '%'} : null, pos: K.rk, dir: judgeDir(K.acc, -1, sd(K.accH), K.accH.length, rule), lvl: K.rk ? {v: K.rk.verdict} : {v: '미수집'}, path: 'S.cpi_core.monthly', src: 'FRED', arr: mArr(K.annS)},
    ];
    const ctx = [
      {label: '휘발유 소매 부분월', value: r, unit: '% 전월 평균 대비', digits: 1, date: pm ? pm.month : null, freq: 'M', note: pm ? fdate(pm.month, 'M') + ' ' + pm.n + '회 평균' + (lmR ? ' · ' + fdate(lmR, 'M') + ' 평균 대비' : '') + ' · 판정 없음' : '', path: 'S.retail_gasoline.partial_month', sign: true},
      {label: 'CPI 휘발유', value: G.mm, unit: '% 전월비', digits: 2, date: G.lm, freq: 'M', note: isNum(G.yoy) ? '전년비 ' + fsg(G.yoy, 1) + '%' : '', path: 'S.cpi_gasoline', sign: true},
      {label: 'CPI 항공운임', value: AF ? mChg(AF, 1, true)[mLastFull(AF)] : null, unit: '% 전월비', digits: 2, date: AF ? mLastFull(AF) : null, freq: 'M', path: 'S.cpi_airfare', sign: true},
      {label: 'CPI 종합 전년비', value: A.yoy, unit: '%', digits: 2, date: A.lm, freq: 'M', note: A.yoyFall ? '전년* · 기준 ' + fdate(A.yoyFall, 'M') + ' (전년 같은 달 결측)' : '', path: 'S.cpi_all.{last,y1}'},
      {label: '근원 전년비', value: K.yoy, unit: '%', digits: 2, date: K.lm, freq: 'M', note: K.yoyFall ? '전년* · 기준 ' + fdate(K.yoyFall, 'M') : '', path: 'S.cpi_core.{last,y1}'}
    ];
    const EN = idxStats('cpi_energy'), TS = idxStats('cpi_transport_svc');
    if (EN) ctx.push({label: 'CPI 에너지', value: EN.ann, unit: '% 3개월 연율', digits: 1, date: EN.lm, freq: 'M', note: '전년비' + (EN.yoyFall ? '* ' : ' ') + fsg(EN.yoy, 1) + '%' + (EN.yoyFall ? ' · 기준 ' + fdate(EN.yoyFall, 'M') : ''), path: 'S.cpi_energy.monthly', sign: true});
    if (TS) ctx.push({label: 'CPI 운송 서비스', value: TS.ann, unit: '% 3개월 연율', digits: 1, date: TS.lm, freq: 'M', note: '전년비' + (TS.yoyFall ? '* ' : ' ') + fsg(TS.yoy, 1) + '%' + (TS.yoyFall ? ' · 기준 ' + fdate(TS.yoyFall, 'M') : '') + ' · ⑪ 서비스 전가의 소비자 끝', path: 'S.cpi_transport_svc.monthly', sign: true});
    const sentences = [
      say(SAY.c12.cpi, {m: fdate(A.lm, 'M'), x: fnum(A.mm, 2), dd: fabs(A.acc, 2), c: c2(A.acc), a: fnum(A.ann, 1), from: fym(A.rk && A.rk.from), N: A.rk && A.rk.N, k: A.rk && A.rk.k}, 'CPI 종합'),
      say(SAY.c12.core, {x: fabs(K.mm, 2), s: s3(K.mm), a: fnum(K.ann, 1), from: fym(K.rk && K.rk.from), N: K.rk && K.rk.N, k: K.rk && K.rk.k}, '근원 CPI'),
      say(isNum(r) && Math.round(r * 10) === 0 ? SAY.c12.part0 : SAY.c12.part, {pm: fdate(pm && pm.month, 'M'), n: pm && pm.n, m: fdate(lmR, 'M'), r: fabs(r, 1), c: c2(r)}, '휘발유 소매 부분월')
    ];
    if (isNum(G.mm)) sentences.push(say(Math.round(G.mm * 100) === 0 ? SAY.c12.gas0 : SAY.c12.gas, {gm: fdate(G.lm, 'M'), gx: fabs(G.mm, 2), s: s3(G.mm)}, 'CPI 휘발유'));
    /* 맥락 행을 이름 뒤에 끼운다(없으면 끝에) */
    const ins = (after, ...rs) => { const at = ctx.findIndex(x => x.label === after); ctx.splice(at < 0 ? ctx.length : at + 1, 0, ...rs); };
    /* CPI 휘발유 계절조정 전 지수: 계절 모양이 섞인 전월비라 이름에 적고 판정하지 않는다 */
    let GN = null;
    extra(() => {
      const st = idxStats('cpi_gasoline_nsa'); if (!st || !isNum(st.mm) || !isM(st.lm)) return;
      ins('CPI 휘발유', {label: 'CPI 휘발유 (계절조정 전)', value: st.mm, unit: '% 전월비', digits: 2, date: st.lm, freq: 'M', sign: true, path: 'S.cpi_gasoline_nsa.monthly',
        note: nj(isNum(G.mm) && G.lm === st.lm ? '계절조정 ' + fsg(G.mm, 2) + '%' : null, isNum(st.yoy) ? '전년비' + (st.yoyFall ? '* ' : ' ') + fsg(st.yoy, 1) + '%' : null)});
      const s = sayOk(SAY.c12.gasN, {gm: fdate(st.lm, 'M'), gx: fabs(st.mm, 2), s: s3(st.mm)}); if (s) sentences.push(s);
      addIn('c12', 'CPI 휘발유 (계절조정 전)', 'S.cpi_gasoline_nsa.monthly', 'FRED', st.lm, 'M');
      GN = {lm: st.lm, mm: st.mm, yoy: st.yoy}; got.add('CPI 휘발유 원지수');
    });
    /* 클리블랜드 연준 CPI 전년비 나우캐스트: 공식 CPI가 아직 없는 달의 공표값만 그대로 적는다(비교·추정 없음) */
    extra(() => {
      const CL = S.clev_cpi_yoy; if (!CL || !CL.monthly || typeof CL.monthly !== 'object') return;
      const ms = Object.keys(CL.monthly).filter(m => isM(m) && isNum(CL.monthly[m]) && (!A.lm || m > A.lm)).sort(); if (!ms.length) return;
      const asof = isD(CL.asof) ? CL.asof : null;
      ins('CPI 종합 전년비', ...ms.map(m => ({label: '클리블랜드 연준 나우캐스트 · ' + fdate(m, 'M') + ' CPI 전년비', value: CL.monthly[m], unit: '% 전년비', digits: 2, date: m, freq: 'M', path: 'S.clev_cpi_yoy.{monthly,asof}',
        note: nj('공표값', asof ? fdate(asof) + ' 기준' : null, '계절조정 전 지수 기준')})));
      const tm = ms[ms.length - 1];
      if (asof) { const s = sayOk(SAY.c12.clev, {d: fdate(asof), tm: fdate(tm, 'M'), x: fnum(CL.monthly[tm], 2)}); if (s) sentences.push(s); }
      addIn('c12', '클리블랜드 연준 CPI 나우캐스트 (공표값)', 'S.clev_cpi_yoy.{monthly,asof}', '클리블랜드 연준', asof || (CL.last && isD(CL.last.date) ? CL.last.date : null), 'D', '대상 ' + ms.map(m => fdate(m, 'M')).join('·'));
      if (asof) freshX.push({src: '클리블랜드 연준', d: asof, freq: 'D', path: 'S.clev_cpi_yoy.asof'});
    });
    /* PCE 물가(BEA): CPI보다 두 주쯤 늦어 제 달로 적는다 */
    extra(() => {
      const PC = idxStats('pce_all'); if (!PC || !isNum(PC.yoy) || !isM(PC.lm)) return;
      ins('근원 전년비', {label: 'PCE 물가 전년비', value: PC.yoy, unit: '%', digits: 1, date: PC.lm, freq: 'M', path: 'S.pce_all.monthly',
        note: nj(isNum(PC.ann) ? '3개월 연율 ' + fnum(PC.ann, 1) + '%' : null, isNum(PC.mm) ? '전월비 ' + fsg(PC.mm, 2) + '%' : null, 'BEA')});
      addIn('c12', 'PCE 물가', 'S.pce_all.monthly', 'FRED (BEA)', PC.lm, 'M');
      freshX.push({src: 'PCE', d: PC.lm, freq: 'M', path: 'S.pce_all.last'});
      got.add('PCE');
    });
    /* CPI 기여표: 에너지·식품·근원 상품·근원 서비스의 3개월 변화 기여(%p). 물가 탭의 빈 줄을 막대로 바꾸고 기여 탭을 더한다 */
    const CPI4 = [['SA0E', '에너지'], ['SAF1', '식품'], ['SACL1E', '근원 상품'], ['SASLE', '근원 서비스']], CPIE = [['SETB01', '휘발유'], ['SEHE01', '연료유'], ['SEHF01', '전기'], ['SEHF02', '도시가스']];
    const CCc = safe(() => contribOf(L.contrib && L.contrib.cpi, CPI4, ['c_qoq', 'c_mom', 'c_yoy']));
    const cpiVis = CCc ? safe(() => contribVis(CCc, L.contrib.cpi, 'CPI', 'CPI 종합', CPI4.concat(CPIE, [['SA0L1E', '근원']]), [['SA0E', '에너지'], ['SA0L1E', '근원']])) : null;
    let cpiBars = null;
    if (cpiVis) extra(() => {
      const sub = contribOf(L.contrib.cpi, CPIE, [CCc.ms]);
      cpiBars = {title: 'CPI ' + CCc.msName + ' 기여 (에너지·식품·근원 상품·근원 서비스, %p' + (CCc.ms === 'c_qoq' ? ', 연율 아님' : '') + ') · ' + fdate(CCc.asof, 'M'), bars: CCc.bars, total: CCc.total, totalLabel: 'CPI 종합', d: 2};
      if (sub) cpiVis.sub = {title: '에너지 안 ' + CCc.msName + ' 기여 (%p)', bars: sub.bars, d: 2};
      const v = k => (CCc.bars.find(b => b.code === k) || {}).v;
      if (CCc.ms === 'c_qoq') { const s = sayOk(SAY.c12.cont, {m: fdate(CCc.asof, 'M'), x: fsg(CCc.total, 2), a: fsg(v('SA0E'), 2), b: fsg(v('SAF1'), 2), c: fsg(v('SACL1E'), 2), d: fsg(v('SASLE'), 2), ri: fdate(CCc.ri, 'M')}); if (s) sentences.push(s); }
    });
    /* 전가 자리(e10): 휘발유 소매와 CPI 휘발유의 급변 값 */
    const jC = [jumpOf('retail_gasoline', '휘발유 소매'), jumpOf('cpi_gasoline', 'CPI 휘발유')];
    addIn('c12', 'CPI 종합·근원 (계절조정)', 'S.cpi_{all,core}.monthly', 'FRED', A.lm, 'M', '25.10 결측');
    if (G.lm) addIn('c12', 'CPI 휘발유', 'S.cpi_gasoline.monthly', 'FRED', G.lm, 'M');
    addIn('c12', '휘발유 소매 부분월', 'S.retail_gasoline.partial_month', 'FRED', pm && pm.month, 'W', pm ? pm.n + '회' : null);
    if (EN) addIn('c12', 'CPI 에너지·운송 서비스', 'S.cpi_{energy,transport_svc}.monthly', 'FRED', EN.lm, 'M', '25.10 결측');
    if (cpiVis) { addIn('c12', 'CPI 기여표', 'L.contrib.cpi.{rows,hist}', 'BLS · 계산', CCc.asof, 'M', CCc.n + '행' + (CCc.carried ? ' · 이전 값' : '')); got.add('CPI 기여표'); }
    else addIn('c12', 'CPI 기여표', 'X.cpi_contrib (core.json)', '저장소', null, 'M', '미수집 · P1');
    const tabs = [
      {id: 'cpi', label: '물가', model: 'M1', primary: true, vis: {type: 'c12', A, K, G, part, GN, contrib: cpiBars}},
      {id: 'jump', label: '급변', model: 'M1', vis: {type: 'jumps', title: '휘발유 소매 → CPI 휘발유 · 창 변화와 평소 변화폭 배수', rows: jC, none: jumpNone(jC), big: rule.big_multiple}},
      {id: 'trend', label: '추세', model: 'M1', vis: {type: 'lines', title: '3개월 연율 (%)', x: 'month', series: [{name: '종합', pts: Object.keys(A.annS).sort().map(m => [m, A.annS[m]])}, {name: '근원', pts: Object.keys(K.annS).sort().map(m => [m, K.annS[m]]), alt: true}], zero: true}},
      {id: 'rank', label: '순위', model: 'M2', vis: {type: 'ranklist', rows: rows.slice(0, 2)}}
    ];
    if (cpiVis) tabs.push({id: 'contrib', label: '기여', model: 'M6', vis: cpiVis});
    checks.c12 = {rows, ctx, flags: [], sentences, tabs, primary: 0, posRow: 0, A, K, G, GN, gasPart: part, jC, contrib: cpiBars,
      kpiSub: '근원 ' + fnum(K.ann, 1) + '%' + (isNum(r) ? ' · 휘발유 소매 부분월 ' + fsg(r, 1) + '%' : '')};
  });

  /* ================= C13 2027 지표 (판정 없음) ================= */
  guard('c13', function () {
    const y1 = CUR_YEAR + 1, y2 = CUR_YEAR + 2;
    const ps = projects.filter(p => p.target_start && +p.target_start.slice(0, 4) >= y1 && +p.target_start.slice(0, 4) <= y2);
    const kinds = {}; ps.forEach(p => { kinds[p.kind] = (kinds[p.kind] || 0) + 1; });
    const c9 = checks.c9, c7 = checks.c7;
    const rows = [
      {id: 'c13-curve', label: '브렌트·WTI 2027년물', judged: false, value: null, dir: {v: '—'}, lvl: {v: '—'}, missing: {status: '수집 전', route: 'Yahoo 월물 (P6)'}, path: '—'},
      {id: 'c13-gas', label: 'TTF·JKM 원월물', judged: false, value: null, dir: {v: '—'}, lvl: {v: '—'}, missing: {status: '원천 없음', route: TTF_JKM_ROUTE}, path: '—'},
      {id: 'c13-cond', label: '가스 3월 말 조건부', judged: false, value: c9.e1, unit: 'bcf', digits: 0, date: U.us_weekly.gas_storage.last.date, freq: 'W', sub: '평년 인출 · 지난겨울 ' + fnum(c9.e2, 0), dir: {v: '—'}, lvl: {v: '—'}, path: '⑨ M10'},
      {id: 'c13-spare', label: '정제 여유능력', judged: false, value: c7.rows[0].value, unit: '천 b/d', digits: 0, date: c7.rows[0].date, freq: 'W', dir: {v: '—'}, lvl: {v: '—'}, path: '⑦ M8'},
      {id: 'c13-proj', label: y1 + '–' + y2 + ' 일정 기록', judged: false, value: ps.length, unit: '건', digits: 0, date: null, freq: 'M', sub: Object.entries(kinds).map(([k, n]) => k + ' ' + n).join(' · '), dir: {v: '—'}, lvl: {v: '—'}, path: 'P[target_start]'}
    ];
    /* 내년 월물 곡선(curve): 브렌트 12월물 값, WTI 12월물과 앞 월물−12월물. 판정 없는 점검이라 행만 채운다.
     * 값은 월물마다 at(as_of, 모든 월물에 종가가 있는 가장 최근 날의 종가)을 쓴다. at 이 없으면 제 마지막 값을 그 날짜로 쓴다.
     * 한 달 전도 같은 날 기준: 그날의 30일 전 또는 그 앞 마지막 값(ETL m1 과 같은 규칙).
     *   at 이 곧 마지막 값이면 m1 그대로다. 아니면 m1 이 그 30일 전 이하일 때만 같은 값이고, 12월물은 일별(daily)에서 찾는다.
     *   그 밖의 월물은 그림의 한 달 전 선에만 제 m1 을 두고(날짜는 제목 줄 범위에), 문장의 변화에는 쓰지 않는다 */
    const cvAt = x => x.at && isNum(x.at.value) && isD(x.at.date) ? {v: x.at.value, d: x.at.date} : {v: x.last.value, d: x.last.date};
    const cvAgo = (o, m, x, loose) => {
      const a = cvAt(x), t0 = tOf(a.d) - 30 * DAY, m1 = x.m1 && isNum(x.m1.value) && isD(x.m1.date) ? {v: x.m1.value, d: x.m1.date} : null;
      if (m1 && (a.d === x.last.date || tOf(m1.d) <= t0)) return m1;
      if (m === o.c.anchor) { const p = atOrBefore((Array.isArray(o.c.daily) ? o.c.daily : []).filter(q => Array.isArray(q) && isD(q[0]) && isNum(q[1])), t0); if (p) return {v: p[1], d: p[0]}; }
      return loose ? m1 : null;
    };
    const cvB = safe(() => curveOf('brent')), cvW = safe(() => curveOf('wti'));
    let cvTab = null, cvSay = null;
    if (cvB && cvB.z) extra(() => {
      const zb = cvAt(cvB.z), zw = cvW && cvW.z ? cvAt(cvW.z) : null, f0 = cvB.pts[0], fa = f0 && f0[0] !== cvB.c.anchor ? cvAt(f0[1]) : null;
      /* 앞 월물−12월물은 두 값이 같은 날일 때만 */
      const spr = fa && fa.d === zb.d ? fa.v - zb.v : null, asof = zb.d;
      rows[0] = {id: 'c13-curve', label: '브렌트·WTI ' + cvB.year + '년물', judged: false, value: zb.v, unit: '$', digits: 2, date: asof, freq: 'D', dir: {v: '—'}, lvl: {v: '—'}, path: 'curve.{brent,wti}.contracts',
        sub: nj('브렌트 ' + moOf(cvB.c.anchor), zw ? 'WTI ' + fnum(zw.v, 2) + (zw.d !== asof ? ' (' + fdate(zw.d) + ')' : '') : null, isNum(spr) ? '브렌트 ' + moOf(f0[0]) + '−' + moOf(cvB.c.anchor) + ' ' + fsg(spr, 2) : null,
          [cvB, cvW].some(o => o && (o.c.carried || (o.z && o.z.carried))) ? '이전 실행 값' : null)};
      const line = (o, alt) => [{name: (o === cvB ? '브렌트' : 'WTI'), pts: o.pts.map(([m, x]) => { const a = cvAt(x); return [m, a.v, a.d]; }), alt},
        {name: (o === cvB ? '브렌트' : 'WTI') + ' 한 달 전', pts: o.pts.map(([m, x]) => [m, cvAgo(o, m, x, true)]).filter(([, a]) => a).map(([m, a]) => [m, a.v, a.d]), alt, dash: true}];
      cvTab = {id: 'curve', label: '곡선', model: 'M5', vis: {type: 'curve', title: '브렌트·WTI ' + cvB.year + '년 월물 ($/배럴) · 최신과 한 달 전', months: [...new Set(cvB.pts.concat(cvW ? cvW.pts : []).map(p => p[0]))].sort(), series: line(cvB, false).concat(cvW && cvW.pts.length ? line(cvW, true) : [])}};
      const ago = cvAgo(cvB, cvB.c.anchor, cvB.z, false), zl = ago ? zb.v - ago.v : null;
      if (isNum(spr) && isNum(zl)) cvSay = sayOk(SAY.c13.curve, {dt: fdate(asof), ca: fctr(f0[0]), a: fnum(fa.v, 2), cb: fctr(cvB.c.anchor), b: fnum(zb.v, 2), d: fabs(zl, 2), s: s3(zl)});
      addIn('c13', '브렌트·WTI ' + cvB.year + '년 월물', 'curve.{brent,wti}.contracts', 'Yahoo', asof, 'D', cvB.pts.length + (cvW ? '·' + cvW.pts.length : '') + '개 월물');
      if (cvB.pts.length >= 3 && cvW && cvW.pts.length >= 3) got.add('브렌트·WTI 2027년물 곡선');
    });
    const sentences = [say(cvTab ? SAY.c13.p0 : SAY.c13.p, {y1, y2, k: ps.length, kinds: Object.entries(kinds).map(([k, n]) => k + ' ' + n).join(', ') || '없음'}, '프로젝트 기록')];
    if (cvSay) sentences.unshift(cvSay);
    addIn('c13', '계약·프로젝트 기록', 'P.{target_start,target_end,kind,phase}', '대장', null, 'M', projects.length + '건');
    const tabs = [{id: 'list', label: '지표', model: 'M8', primary: true, vis: {type: 'c13', rows, projects: ps}}];
    if (cvTab) tabs.push(cvTab);
    checks.c13 = {rows, ctx: [], flags: [], sentences, tabs, primary: 2, posRow: 2, noVerdict: true, kpiSub: '판정 없음 · 시나리오 없음'};
  });

  /* ---------- 점검 마무리: 집계, 메타, 신선도 ---------- */
  const order = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13'];
  const freshTh = rule.fresh;
  const ageOf = (d, freq, lag) => { if (!d) return null; const t = tOf(d.length === 7 ? (lag ? addM(d, lag) : d) + '-01' : d); return Math.round((today - t) / DAY); };
  const freshDot = (d, freq, lag) => { const a = ageOf(d, freq, lag); if (a == null) return null; const th = freshTh[freq === 'M' ? 'M' : freq === 'W' ? 'W' : 'D']; return a <= th[0] ? '●' : a <= th[1] ? '◐' : '○'; };
  /* 행 → 노드 (§4.1 KPI 배치) */
  /* 수집 전으로 적어 둔 항목이 이번 payload에 들어 있으면 대장에서 뺀다 */
  const steoHas = k => !!(U.steo_balance && U.steo_balance.series && U.steo_balance.series[k]);
  const HAVE = {
    '세계·OECD 관측 재고': () => steoHas('oecd_stocks') && steoHas('world_draw'),
    '쿠싱·지역 원유 재고': () => !!(U.us_weekly && U.us_weekly.cushing_stocks && U.us_weekly.midwest_crude_stocks && U.us_weekly.gulf_crude_stocks),
    '탱크 작업 저장능력': () => !!(U.storage_capacity && U.storage_capacity.regions && U.storage_capacity.regions.Cushing),
    'OPEC 잉여 생산능력': () => steoHas('opec_spare'),
    '난방도일': () => steoHas('us_hdd') && steoHas('us_hdd_normal'),
    'CPI 전기·도시가스': () => !!(S.cpi_electricity && S.cpi_utility_gas),
    '국가별 수요 5년 범위': () => !!(checks.c2 && checks.c2.usage && checks.c2.usage.jodi && checks.c2.usage.jodi.length),
    'PPI 서비스·운송·유통마진': () => !!(S.ppi_services && S.ppi_transport && S.ppi_trade),
    'CPI 에너지·전기·도시가스·운송서비스': () => !!(S.cpi_energy && S.cpi_electricity && S.cpi_utility_gas && S.cpi_transport_svc),
    /* 아래는 맥락 행을 만든 항목(got)만 뺀다: 키가 있어도 모양이 달라 행이 없으면 대장에 남는다 */
    'UAE·이라크·카타르·오만 수출': () => got.has('UAE·이라크·카타르·오만 수출') && ['AE', 'IQ', 'QA', 'OM'].every(c => jodiOn(c, 'CRUDEOIL', 'TOTEXPSB')),
    '사우디 LPG 수출': () => got.has('사우디 LPG 수출') && (jodiOn('SA', 'LPG', 'TOTEXPSB') || jodiOn('SA', 'NGL', 'TOTEXPSB')),
    '항만별 선적': () => got.has('항만별 선적'),
    '2027년 12월물 브렌트·WTI': () => got.has('2027년 12월물 브렌트·WTI'),
    '비OPEC BR·GY·AR 생산': () => got.has('비OPEC BR·GY·AR 생산') && ['prod_br', 'prod_gy', 'prod_ar'].every(steoHas),
    'RB·HO 월물 구분': () => got.has('RB·HO 월물 구분'),
    '가정용 난방유 소매': () => got.has('가정용 난방유 소매'),
    '1994년 이후 순위': () => got.has('1994년 이후 순위'),
    'CPI 자동차연료·연료유': () => got.has('CPI 자동차연료·연료유'),
    '사우디 원유 직접 연소(여름 발전)': () => got.has('사우디 원유 직접 연소(여름 발전)') && jodiOn('SA', 'CRUDEOIL', 'DIRECUSE'),
    '중국 원유 비축': () => got.has('중국 원유 비축') && jodiOn('CN', 'CRUDEOIL', 'CLOSTLV'),
    '수에즈 통과': () => got.has('수에즈 통과'),
    '러시아 처리량': () => got.has('러시아 처리량') && jodiOn('RU', 'CRUDEOIL', 'REFINOBS'),
    '휘발유·프로판 주간 수출': () => got.has('휘발유·프로판 주간 수출'),
    '미국 LNG 수출': () => got.has('미국 LNG 수출'),
    'TTF 달러 환산': () => got.has('TTF 달러 환산'),
    'PPI 기여표': () => got.has('PPI 기여표'),
    '트럭 운임 PPI': () => got.has('트럭 운임 PPI'),
    '화물 물동량·지출 (Cass)': () => got.has('화물 물동량·지출 (Cass)'),
    '트럭 주가': () => got.has('트럭 주가'),
    'CPI 기여표': () => got.has('CPI 기여표'),
    /* 공식 CPI가 이미 나온 달만 있으면 행은 없지만 자료는 payload에 있다 */
    '클리블랜드 연준 나우캐스트': () => !!(S.clev_cpi_yoy && S.clev_cpi_yoy.last && isNum(S.clev_cpi_yoy.last.value)),
    'CPI 휘발유 원지수': () => got.has('CPI 휘발유 원지수'),
    'PCE': () => got.has('PCE'),
    '브렌트·WTI 2027년물 곡선': () => got.has('브렌트·WTI 2027년물 곡선')
  };
  const have = item => { try { return !!(HAVE[item] && HAVE[item]()); } catch (e) { return false; } };
  const ROW_NODE = [[/^c1-/, 'n-flow'], [/^c2-/, 'n-crude'], [/^c3-/, 'n-cracks'], [/^c4-/, 'n-retail'], [/^c5-/, 'n-stocks'], [/^c6-/, 'n-freight'], [/^c7-/, 'n-refining'], [/^c8-/, 'n-china'], [/^c9-(ttf|jkm)/, 'n-gas'], [/^c9-gs/, 'n-storage'], [/^c10-(coal|cu|wheat|corn)/, 'n-materials'], [/^c10-(food|cpif)/, 'n-food'], [/^c10-(elec|ugas)/, 'n-utility'], [/^c11-/, 'n-costs'], [/^c12-all/, 'n-cpi'], [/^c12-core/, 'n-cpi-core']];
  const list = order.map((id, i) => {
    const c = checks[id]; const meta = CHECK_META[id];
    c.id = id; c.no = i + 1; c.circ = CIRC[i + 1]; c.name = meta.name; c.meta = meta;
    c.part = PARTS.find(p => p.checks.includes(id)).label;
    c.q = hope ? hope.checks[id].q : null; c.counter = hope ? hope.checks[id].counter : null;
    /* R5: 비공개 경로의 미수집 항목은 Pages 에서 미수집으로도 남기지 않는다 */
    c.missing = (MONITOR_MISSING[id] || []).filter(([item, , route]) => !(pages && /비공개/.test(route || '')) && !have(item)).map(([item, status, route]) => ({item, status, route}));
    c.missing = c.missing.filter(mi => !c.rows.some(r => r.missing && (mi.item.startsWith(r.label) || r.label.startsWith(mi.item.split('·')[0]))));
    c.rows.forEach(r => { if (r.missing) c.missing.unshift({item: r.label, status: r.missing.status, route: r.missing.route, judged: r.judged}); if (!r.lvl) r.lvl = r.pos && r.pos.verdict ? {v: r.pos.verdict} : {v: r.value == null ? '미수집' : '판정 없음'}; if (!r.node) { const hit = ROW_NODE.find(([re]) => re.test(r.id || '')); r.node = hit ? hit[1] : null; } r.check = id; });
    /* 중단된 보고서의 고정 값(저장능력 2024-03)은 경과일을 세지 않는다 */
    c.inputs = (inputs[id] || []).map(x => x.fixed ? {...x, age: null, dot: null} : {...x, age: ageOf(x.date, x.freq, x.lag), dot: freshDot(x.date, x.freq, x.lag), ...(x.lag && isM(x.date) ? {ageFrom: addM(x.date, x.lag)} : {})});
    if (c.noVerdict) { c.dir = {v: '—'}; c.lvl = {v: '—'}; }
    else {
      c.dir = aggregate(c.rows, 'dir'); c.lvl = aggregate(c.rows, 'lvl');
      if (id === 'c8') c.dir = {v: c.comb, tag: c.flags[0], mix: c.dir.mix, rule: '결합 규칙'};
    }
    c.tabs = c.tabs.filter(t => t.vis);
    c.events = records.filter(r => meta.nodes.includes(r.node));
    if (pages) { c.dir = {v: '—'}; c.lvl = {v: '—'}; c.tabs = c.tabs.filter(t => !t.priv); c.flags = []; }
    const pr = c.rows[c.primary] || c.rows[0];
    c.kpi = pr; c.posKpi = c.rows[c.posRow] || pr; c.date = pr && pr.date; c.freq = pr && pr.freq;
    c.guideHref = meta.guide[1];
    return c;
  });

  /* ---------- 답 (Level 0) ---------- */
  const judgedChecks = list.filter(c => !c.noVerdict);
  const cnt = (axis, v) => judgedChecks.filter(c => c[axis].v === v).length;
  /* 첫 이탈은 축마다 따로: 기대 경로 순서에서 처음 불일치·혼재인 점검의 첫 불일치 행 */
  const breakOn = axis => {
    if (!hope) return null;
    for (const id of hope.path) {
      const c = checks[id];
      if (!['불일치', '혼재'].includes(c[axis].v)) continue;
      const row = c.rows.find(r => r.judged && r[axis] && r[axis].v === '불일치');
      if (row) return {id, no: c.circ, name: c.name, axis: axis === 'dir' ? '방향' : '수준', axisKey: axis, row: row.id, ind: row.label, date: fdate(row.date, row.freq), check: c[axis].v};
    }
    return null;
  };
  const breakDir = breakOn('dir'), breakLvl = breakOn('lvl');
  const firstBreak = hope ? (function () { const ids = hope.path; const a = breakDir ? ids.indexOf(breakDir.id) : 99, b = breakLvl ? ids.indexOf(breakLvl.id) : 99; return a === 99 && b === 99 ? null : a < b ? breakDir : breakLvl; })() : null;
  const freshList = [
    {src: '선물·주식', d: S.wti_fut?.last?.date, freq: 'D', path: 'S.wti_fut.last'},
    {src: 'EIA 현물', d: S.brent?.last?.date, freq: 'D', path: 'S.brent.last'},
    {src: '소매', d: S.retail_diesel?.last?.date, freq: 'W', path: 'S.retail_diesel.last'},
    {src: 'EIA 주간', d: U.us_weekly?.utilization?.last?.date, freq: 'W', path: 'U.us_weekly.utilization.last'},
    {src: 'CPI', d: S.cpi_all?.last?.date?.slice(0, 7), freq: 'M', path: 'S.cpi_all.last'},
    {src: 'PPI(BLS)', d: S.ppi_services?.last?.date?.slice(0, 7), freq: 'M', path: 'S.ppi_services.last'},
    {src: 'JODI', d: U.jodi?.latest, freq: 'M', path: 'U.jodi.latest'},
    {src: 'IMF', d: S.brent_imf?.last?.date?.slice(0, 7), freq: 'M', path: 'S.brent_imf.last'},
    {src: '대장', d: recordsAsOf, freq: 'D', path: 'recordsAsOf'},
    {src: 'STEO', d: U.steo_balance?.last_historical, freq: 'M', path: 'U.steo_balance.last_historical'}
  ];
  for (let i = freshList.length - 1; i >= 0; i--) if (!freshList[i].d) freshList.splice(i, 1);
  if (CP && isD(SH.latest)) freshList.push({src: '해협(비공개)', d: SH.latest, freq: 'D', path: 'shipping.latest', priv: true});
  /* 새 원천: 그 맥락 행이 선 원천만 (난방유 소매는 난방철에만) */
  freshX.forEach(x => { if (isD(x.d) && !freshList.some(f => f.src === x.src)) freshList.push(x); });
  if (SH && got.has('항만별 선적') && isD(SH.ports_latest)) freshList.push({src: '항만(비공개)', d: SH.ports_latest, freq: 'D', path: 'shipping.ports_latest', priv: true});
  freshList.forEach(f => { f.age = ageOf(f.d, f.freq, f.lag); f.dot = freshDot(f.d, f.freq, f.lag); f.label = fdate(f.d, f.freq); });
  /* 경과일 순(늦게 발표하는 원천은 lag 를 뺀 경과일) */
  const oldest = freshList.filter(f => isNum(f.age)).sort((a, b) => b.age - a.age)[0];
  /* 가장 오래된 판정 입력: 판정에 쓰인 행 가운데 관측일이 가장 이른 것 (월간은 그 달 첫날) */
  const judgedRows = judgedChecks.flatMap(c => c.rows.filter(r => r.judged && r.date && isNum(r.value) && r.dir && !['미수집'].includes(r.dir.v)).map(r => ({c, r})));
  const oj = judgedRows.slice().sort((a, b) => tOf(a.r.date) - tOf(b.r.date))[0];
  const oldestJudged = oj ? {check: oj.c.id, circ: oj.c.circ, name: oj.c.name, ind: oj.r.label, d: oj.r.date, freq: oj.r.freq, label: fdate(oj.r.date, oj.r.freq), age: ageOf(oj.r.date, oj.r.freq), dot: freshDot(oj.r.date, oj.r.freq), text: oj.c.circ + ' ' + oj.r.label + ' ' + fdate(oj.r.date, oj.r.freq)} : null;
  const missJudged = list.reduce((s, c) => s + c.rows.filter(r => r.judged && r.dir && r.dir.v === '미수집').length, 0);
  /* 경로 판정 묶음: 같은 판정끼리 번호를 모은다 */
  const groupBy = axis => { if (!hope) return null; const g = []; for (const id of hope.path) { const c = checks[id]; const v = c[axis].v; const e = g.find(x => x.v === v); if (e) e.ids.push(c.circ); else g.push({v, ids: [c.circ]}); } return g; };
  const gtxt = g => g.length === 1 ? g[0].ids.join('') + ' 모두 ' + g[0].v : g.map(x => x.ids.join('') + ' ' + x.v).join('·');
  const answer = [];
  let pathV = null;
  if (hope) {
    const gd = groupBy('dir'), gl = groupBy('lvl');
    pathV = hope.path.map(id => ({id, circ: checks[id].circ, name: checks[id].name, dir: checks[id].dir, lvl: checks[id].lvl}));
    const r2 = pathV.filter(x => x.dir.v === '부합' && x.lvl.v === '불일치').map(x => x.circ);
    answer.push(say(SAY.answer.p1, {path: pathV.map(x => x.circ).join('→'), dl: gtxt(gd), ll: gtxt(gl)}, '경로 판정'));
    if (r2.length) answer.push(say(SAY.answer.r2, {list: r2.join('')}, ''));
    const bt = b => b ? b.no + ' ' + b.name + '(' + b.ind + ' ' + b.date + ')' : '없음';
    answer.push(say(SAY.answer.fb, {fd: bt(breakDir), fl: bt(breakLvl)}, '첫 이탈'));
    answer.push(say(SAY.answer.tot, {n: judgedChecks.length, a: cnt('dir', '부합'), b: cnt('dir', '불일치'), c: cnt('dir', '혼재'), f: cnt('dir', '보합'), d: cnt('lvl', '부합'), e: cnt('lvl', '불일치'), g: cnt('lvl', '혼재'), h: cnt('lvl', '보합'), m: missJudged, src: oldestJudged ? oldestJudged.text : null}, '집계'));
  } else {
    const bandRows = list.flatMap(c => c.rows).filter(r => r.pos && r.pos.kind === 'band');
    const ds = list.map(c => c.date).filter(Boolean).sort();
    answer.push(say(SAY.answer.neutral, {n: bandRows.length, a: bandRows.filter(r => r.pos.pos === '위').length, b: bandRows.filter(r => r.pos.pos === '아래').length, d1: fdate(ds[ds.length - 1]), d2: fdate(ds[0])}, '집계'));
  }

  /* 세 끝 */
  const c1 = checks.c1, c2c = checks.c2, c12 = checks.c12;
  const ends = [
    {k: '물동량', label: '사우디·쿠웨이트 원유 수출', value: c1.rows[0].value, unit: '%', digits: 0, ref: '전년 같은 달 = 100', delta: c1.rows[0].delta, date: c1.rows[0].date, freq: 'M', pos: c1.rows[0].pos, model: 'M4', check: 'c1'},
    {k: '유가', label: '브렌트 근월물', value: c2c.rows[0].value, unit: '$', digits: 2, ref: c2c.rows[0].sub, delta: c2c.rows[0].delta, deltaNote: c2c.rows[0].deltaNote, date: c2c.rows[0].date, freq: 'D', pos: c2c.rows[0].pos, model: 'M1·M2', check: 'c2'},
    {k: '물가', label: 'CPI 종합 3개월 연율', value: c12.rows[0].value, unit: '%', digits: 1, ref: '계절조정', delta: c12.A ? {abs: c12.A.mm, unit: "%", show: fsg(c12.A.mm, 2) + "%", w: "전월비"} : null, date: c12.rows[0].date, freq: 'M', pos: c12.rows[0].pos, model: 'M1·M2', check: 'c12'}
  ];
  /* 동행 점검: 최근 6개월 부호 격자 */
  const comove = (function () {
    try {
    const tr = c1.tabs.find(t => t.id === 'm4') ? c1.tabs.find(t => t.id === 'm4').vis.trend : [];
    const fr = {}; tr.forEach(x => { if (isNum(x.crude)) fr[x.m] = x.crude; });
    const bm = S.brent.monthly; const cm = S.cpi_all.monthly; const mm = mChg(cm, 1, true);
    const accA = m => { const p = [1, 2, 3].map(k => mm[addM(m, -k)]); return isNum(mm[m]) && p.every(isNum) ? mm[m] - mean(p) : null; };
    const ms = Object.keys(fr).sort().filter(m => isNum(fr[addM(m, -1)]) && isNum(bm[m]) && isNum(bm[addM(m, -1)]) && isNum(accA(m)));
    const last = ms.slice(-rule.comove_months);
    const grid = last.map(m => ({m, flow: Math.sign(fr[m] - fr[addM(m, -1)]), oil: Math.sign(bm[m] - bm[addM(m, -1)]), cpi: Math.sign(accA(m))}));
    const x = grid.filter(g => g.flow > 0 && g.oil < 0).length, y = grid.filter(g => g.oil < 0 && g.cpi < 0).length;
    return {grid, x, y, k: grid.length, s: say(SAY.answer.comove, {k: grid.length, x, y}, '동행 점검')};
    } catch (e) { return {grid: [], x: 0, y: 0, k: 0, s: {miss: true, text: '미수집: 동행 점검(세 끝 중 하나 이상 없음)'}}; }
  })();

  /* ---------- 구조 모니터 (스프레드 표, M5) ---------- */
  const spreads = (function () {
    try {
    const out = []; const tb = T.brent, tw = T.wti;
    const pctile = (arr, v) => { const a = arr.filter(isNum); return a.length && isNum(v) ? Math.round(a.filter(x => x <= v).length / a.length * 100) : null; };
    const spArr = t => t ? t.rows.map(r => [r[0], r[1] - r[2]]) : [];
    for (const [name, t] of [['브렌트 근월−차월', tb], ['WTI 근월−차월', tw]]) { const a = spArr(t); const w = arrWin(a, days); out.push({name, v: a.length ? a[a.length - 1][1] : null, d: a.length ? a[a.length - 1][0] : null, dv: w && w.abs, d0: w && w.d0, pos: '이력 ' + a.length + '일 · 순위 없음', spark: a, unit: '$', path: 'T.' + (t === tb ? 'brent' : 'wti') + '.rows'}); }
    const bN = c2c.bNow; const bW = c2c.tabs.find(t => t.id === 'm5').vis.basis;
    out.push({name: '브렌트 현물−근월', v: bN && bN.v, d: bN && bN.d, dv: c2c.rows[2].delta && c2c.rows[2].delta.abs, d0: c2c.rows[2].delta && c2c.rows[2].delta.d0, pos: '같은 날짜 · 순위 없음', spark: bW, unit: '$', path: 'S.brent − T.brent M1'});
    const bwS = c2c.bwSpot; const bwl = bwS[bwS.length - 1]; const bww = arrWin(bwS, days);
    out.push({name: '브렌트−WTI 현물', v: bwl && bwl[1], d: bwl && bwl[0], freq: 'W', dv: bww && bww.abs, d0: bww && bww.d0, pos: '이력 ' + pctile(bwS.map(x => x[1]), bwl && bwl[1]) + '백분위 (' + bwS.length + '주)', spark: bwS.slice(-60), unit: '$', path: 'S.brent.weekly − S.wti.weekly'});
    const bwF = c2c.bwFut; const bfl = bwF[bwF.length - 1]; const bfw = arrWin(bwF.map(r => [r[0], r[1]]), days);
    out.push({name: '브렌트−WTI 근월물', v: bfl && bfl[1], d: bfl && bfl[0], dv: bfw && bfw.abs, d0: bfw && bfw.d0, pos: '이력 ' + bwF.length + '일 · 순위 없음', spark: bwF.map(r => [r[0], r[1]]), unit: '$', path: 'T.brent M1 − T.wti M1'});
    const bd = mArr(S.brent_imf.monthly).map(([m, v]) => [m, v - S.dubai_imf.monthly[m]]).filter(x => isNum(x[1])); const bdl = bd[bd.length - 1]; const bdp = bd[bd.length - 1 - months];
    out.push({name: '브렌트−두바이 (IMF)', v: bdl && bdl[1], d: bdl && bdl[0], freq: 'M', dv: bdl && bdp ? bdl[1] - bdp[1] : null, d0: bdp && bdp[0], pos: '이력 ' + pctile(bd.map(x => x[1]), bdl[1]) + '백분위 (' + bd.length + '개월)', spark: bd, unit: '$', path: 'S.brent_imf − S.dubai_imf'});
    const c3 = checks.c3;
    for (const r of c3.rows.slice(0, 2)) { const a = r.arr; const w = arrWin(a, days); out.push({name: r.label.replace(' 현물', ' 현물 크랙'), v: r.value, d: r.date, freq: 'W', dv: w && w.abs, d0: w && w.d0, pos: '이력 ' + pctile(a.map(x => x[1]), r.value) + '백분위 (' + a.length + '주)', spark: a.slice(-60), unit: '$', path: r.path}); }
    const fr = c3.rows[4]; const ftr = c3.tabs.find(t => t.id === 'trend').vis.series[2].pts;
    out.push({name: '3-2-1 선물 크랙 (NYMEX)', v: fr.value, d: fr.date, dv: fr.delta && fr.delta.abs, d0: fr.delta && fr.delta.d0, roll: fr.delta && fr.delta.roll, pos: '전년 같은 날 ×' + fnum(fr.pos && fr.pos.cur, 2), spark: ftr, unit: '$', path: fr.path});
    const jh = checks.c9.tabs.find(t => t.id === 'struct').vis.series[0].pts; const jw = arrWin(jh, days);
    out.push({name: 'JKM−헨리허브', v: jh[jh.length - 1][1], d: jh[jh.length - 1][0], freq: 'W', dv: jw && jw.abs, d0: jw && jw.d0, pos: '이력 ' + pctile(jh.map(x => x[1]), jh[jh.length - 1][1]) + '백분위 (' + jh.length + '주)', spark: jh, unit: '$', path: 'jkm_fut.weekly − henry_hub.weekly'});
    const cuAll = Object.keys(S.copper_imf.monthly).filter(m => isNum(S.copper_fut.monthly[m])).sort().map(m => [m, S.copper_fut.monthly[m] * 2204.62 - S.copper_imf.monthly[m]]); const cl = cuAll[cuAll.length - 1], cp = cuAll[cuAll.length - 1 - months];
    out.push({name: 'COMEX−IMF 구리', v: cl && cl[1], d: cl && cl[0], freq: 'M', dv: cl && cp ? cl[1] - cp[1] : null, d0: cp && cp[0], pos: '이력 ' + pctile(cuAll.map(x => x[1]), cl[1]) + '백분위 (' + cuAll.length + '개월)', spark: cuAll, unit: '$/t', path: 'copper_fut×2204.62 − copper_imf', digits: 0});
    return out;
    } catch (e) { return []; }
  })();

  /* ---------- 변동 상위 (|Δ|/σ) ---------- */
  const movers = Object.keys(S).filter(k => S[k].group !== 'cpi').map(k => { const w = seriesWin(k); if (!w || !isNum(w.pct) || !isNum(w.sig) || !w.sig) return null; return {key: k, label: S[k].label, pct: w.pct, z: w.pct / w.sig, big: isJump(w.pct / w.sig, rule), roll: w.roll, fault: w.fault, d0: w.d0, d1: w.d1, basis: w.basis}; }).filter(Boolean).sort((a, b) => Math.abs(b.z) - Math.abs(a.z)).slice(0, 10);

  /* ---------- 미수집 대장 ---------- */
  const register = list.flatMap(c => c.missing.map(m => ({check: c.circ + ' ' + c.name, cid: c.id, ...m})));

  /* ---------- 그래프: 노드는 자기 행만으로 판정 (경로를 따라 번지지 않음) ---------- */
  const allRows = list.flatMap(c => c.rows);
  const NODE_MISS = {'n-lng': '미국 LNG 수출 · 수집 전 (P4)', 'n-utility': 'CPI 전기·도시가스 · DB 있음 (P1)', 'n-costs': 'PPI 서비스·운송 · DB 있음 (P1)'};
  const nodeKpi = {
    'n-flow': () => { const r = checks.c1.rows; return [r[0].label.replace(' 회복률', '') + ' ' + fnum(r[0].value, 0) + '%', '제품 ' + fnum(r[1].value, 0) + '% · ' + fdate(r[0].date, 'M')]; },
    'n-supply': () => { const cp = U.us_weekly.crude_prod; return ['미국 생산 ' + fnum(cp.last.value, 0) + '천 b/d', '5년 평균 대비 ' + fsg(cp.vs5.pct, 1) + '% · ' + fdate(cp.last.date)]; },
    'n-china': () => { const r = checks.c8.rows; return ['원유 수입 ' + fnum(r[0].value, 0) + '%', '휘발유 수출 ' + fnum(r[1].value, 0) + '% · ' + fdate(r[0].date, 'M')]; },
    'n-lng': () => { const x = checks.c9 && checks.c9.lng; if (!x) throw 0; return ['LNG 수출 ' + fnum(x.v, 1) + ' Bcf/d', (isNum(x.yoy) ? '전년비 ' + fsg(x.yoy, 1) + '% · ' : '') + fdate(x.m, 'M') + (x.est ? ' · STEO 추정' : '')]; },
    'n-freight': () => { const r = checks.c6.rows[0]; return ['BWET 주평균 ' + (r.delta ? r.delta.show : '—'), r.pos ? r.pos.text : '—']; },
    'n-refining': () => { const r = checks.c7.rows; return ['여유 ' + fnum(r[0].value, 0) + '천 b/d', '가동률 ' + fnum(r[1].value, 1) + '% 범위 ' + (r[1].pos ? r[1].pos.pos : '—')]; },
    'n-stocks': () => { const c = checks.c5; return ['범위 아래 ' + c.below.length + '/' + c.rows.length, '위 ' + c.above.length + ' · ' + fdate(c.rows[0].date)]; },
    'n-storage': () => { const r = checks.c9.rows[2]; return ['가스 저장 ' + fnum(r.value, 0) + 'bcf', '범위 ' + (r.pos ? r.pos.pos : '—') + ' · 3월 말 ' + fnum(checks.c9.e1, 0)]; },
    'n-crude': () => { const r = checks.c2.rows[0]; return ['브렌트 ' + fnum(r.value, 2) + ' ' + (r.delta ? r.delta.show.replace('$', '') : '—'), r.pos ? r.pos.text : '—']; },
    'n-cracks': () => { const r = checks.c3.rows; return ['3-2-1 현물 ' + (r[0].delta ? r[0].delta.show.replace('$', '') : '—'), 'WTI 기준 ' + (r[1].delta ? r[1].delta.show.replace('$', '') : '—') + ' · ' + fdate(r[0].date)]; },
    'n-gas': () => { const r = checks.c9.rows[0]; return ['TTF ' + fnum(r.value, 1) + (r.delta && r.delta.roll ? ' 교체' : r.delta ? ' ' + r.delta.show : ''), 'IMF 유럽 ' + (r.pos ? r.pos.N + '중 ' + r.pos.k + '위' : '—')]; },
    'n-materials': () => { const r = checks.c10.rows; return ['석탄 ' + fsg(r[0].yoy, 0) + '% y/y', '구리 ' + (r[1].delta ? r[1].delta.show : '—') + ' · 밀 ' + (r[2].delta ? r[2].delta.show : '—')]; },
    'n-retail': () => { const r = checks.c4.rows; return ['경유 ' + fnum(r[1].value, 2) + ' ' + (r[1].delta ? r[1].delta.show.replace('$', '') : ''), '휘발유 ' + (r[0].delta ? r[0].delta.show.replace('$', '') : '') + ' · ' + fdate(r[0].date)]; },
    'n-costs': () => { const r = checks.c11.rows; if (!isNum(r[1].value)) throw 0; return ['운송·창고 ' + fnum(r[1].value, 1) + '% 3개월', '서비스 ' + fnum(r[0].value, 1) + '% · ' + fdate(r[1].date, 'M')]; },
    'n-utility': () => { const r = checks.c10.rows; const e = r.find(x => x.id === 'c10-elec'), g = r.find(x => x.id === 'c10-ugas'); if (!e) throw 0; return ['전기 ' + fnum(e.value, 1) + '% 3개월', '도시가스 ' + (g ? fnum(g.value, 1) + '%' : '—') + ' · ' + fdate(e.date, 'M')]; },
    'n-food': () => { const r = checks.c10.rows; return ['가정식 CPI ' + fnum(r[5].value, 1) + '%', 'IMF 식품 ' + fsg(r[4].yoy, 1) + '% y/y']; },
    'n-cpi-energy': () => { const c = checks.c12; return ['휘발유 소매 부분월 ' + fsg(c.gasPart.r, 1) + '%', 'CPI 휘발유 전월비 ' + fsg(c.G.mm, 2) + '% · ' + fdate(c.G.lm, 'M')]; },
    'n-cpi-core': () => { const r = checks.c12.rows[1]; return ['근원 ' + fnum(r.value, 1) + '% 3개월', '가속 ' + (r.delta ? r.delta.show : '—')]; },
    'n-cpi': () => { const r = checks.c12.rows && checks.c12.rows[0]; if (!r || !isNum(r.value)) return ['종합 미수집', '가속 —']; return ['종합 ' + fnum(r.value, 1) + '% 3개월', '가속 ' + (r.delta ? r.delta.show : '—') + ' · ' + fdate(r.date, 'M')]; }
  };
  const graph = {
    cols: MONITOR_GRAPH.cols,
    nodes: MONITOR_GRAPH.nodes.map(n => {
      const rs = allRows.filter(r => r.node === n.id && r.judged);
      let dir, lvl, note = null;
      /* 미국 LNG 수출은 맥락 행이라 노드에 판정 행이 없다: 자료가 있으면 미수집 대신 판정 없음과 숫자를 둔다 */
      if (NODE_MISS[n.id] && !rs.some(r => isNum(r.value)) && !(n.id === 'n-lng' && have('미국 LNG 수출'))) { dir = {v: '미수집'}; lvl = {v: '미수집'}; note = NODE_MISS[n.id]; }
      else if (!rs.length) { dir = {v: '판정 없음'}; lvl = {v: '판정 없음'}; note = '맥락 · 판정 없음'; }
      else if (n.id === 'n-china') { dir = {v: checks.c8.comb}; lvl = aggregate(rs, 'lvl'); }
      else { dir = aggregate(rs, 'dir'); lvl = aggregate(rs, 'lvl'); }
      if (pages) { dir = {v: '—'}; lvl = {v: '—'}; }
      if (note && pages) note = note.replace(/\s*\(P\d+\)/g, '');
      let k; try { k = nodeKpi[n.id] ? nodeKpi[n.id]() : [note || '', '']; } catch (e) { k = [note || '미수집', '']; }
      return {...n, dir: dir.v, lvl: lvl.v, mix: [dir.mix, lvl.mix], note, kpi1: kpiClean(k[0]), kpi2: kpiClean(k[1]), nRows: rs.length, ev: records.filter(r => r.node === n.id && r.ed && tOf(r.ed.d) > fetchDT - rule.events_days * DAY).length};
    }),
    edges: MONITOR_GRAPH.edges.map(e => {
      const out = {...e};
      try {
      if (e.id === 'e1') { const g = comove.grid; out.test = g.length ? g.filter(x => x.flow > 0 && x.oil < 0).length + '/' + g.length + '개월 부합' : '판정 불가 · 입력 부족'; out.inputs = '원유 수출 회복률 Δ · 브렌트 현물 월평균 Δ'; if (checks.c1.flags.length) out.flag = checks.c1.flags[0]; }
      if (e.id === 'e2') { const r = checks.c6.rows[0]; out.badge = 'BWET ' + (r.delta ? r.delta.show : '—'); }
      if (e.id === 'e4') {
        const a = checks.c2.bw, r = checks.c3.rows[2];
        out.inputs = '브렌트 근월물 Δ' + win + ' · ULSD 크랙 현물(주평균) Δ' + win;
        if (!a || a.short || !r.delta) out.test = '판정 불가 · ' + (a && a.reason || '입력 부족');
        else { const bd = a.abs, ud = r.delta.abs, uv = r.dir.v; out.test = (bd < 0 && uv === '보합' ? '보합 · 크랙 유지' : bd < 0 && ud > 0 ? '불일치 · 원유만 내림' : bd < 0 && ud < 0 ? '부합' : '혼재') + ' (브렌트 ' + fsg(bd, 2) + ' · ULSD 크랙 ' + fsg(ud, 2) + ')'; }
      }
      if (e.id === 'e5') out.flag = checks.c7.flags[0] || null;
      if (e.id === 'e6') out.flag = checks.c5.flags.find(f => f.includes('중간유분')) || null;
      if (e.id === 'e7') out.flag = checks.c5.flags.find(f => f.includes('원유')) || null;
      if (e.id === 'e8') out.flag = '중국 제품 수출 ' + (checks.c8.comb === '불일치' ? '억제' : '미보고');
      if (e.id === 'e3') { const cp = U.us_weekly.crude_prod; out.flag = cp && cp.vs5 ? '미국 생산 vs5 ' + fsg(cp.vs5.pct, 1) + '%' : null; }
      if (e.id === 'e9') { const j = checks.c4.jG; out.inputs = 'USGC 휘발유 → 휘발유 소매 (창 변화 ÷ 평소 변화폭)'; out.test = jumpPair(j[0], j[1]); out.jump = jumpEdge(j); }
      if (e.id === 'e10') { const j = checks.c12.jC; out.inputs = '휘발유 소매 → CPI 휘발유 (창 변화 ÷ 평소 변화폭)'; out.test = jumpPair(j[0], j[1]); out.jump = jumpEdge(j); }
      if (e.id === 'e13') out.flag = checks.c9.flags[0] || null;
      if (e.id === 'e16') { const j = checks.c10.jF; out.inputs = 'IMF 식품지수 → 가정식 CPI (창 변화 ÷ 평소 변화폭)'; out.test = jumpPair(j[0], j[1]); out.jump = jumpEdge(j); }
      if (e.id === 'e19') { const v = mChg(S.cpi_food_home.monthly, 1, true)[mLastFull(S.cpi_food_home.monthly)]; out.inputs = '가정식 CPI 전월비'; out.test = isNum(v) ? '가정식 전월비 ' + fsg(v, 2) + '%' : '가정식 전월비 미수집'; }
      /* P1 계열이 들어오면 경유→운송비는 두 끝 계열의 급변 값을 적는 표시 간선이 되고, 나머지 P1 고리는 자료만 있음을 적는다 */
      if (e.id === 'e17') { const j = checks.c11.jT; if (j && j.every(x => !x.miss)) { out.kind = '표시'; out.after = null; out.inputs = '경유 소매 → PPI 운송·창고 (창 변화 ÷ 평소 변화폭)'; out.test = jumpPair(j[0], j[1]); out.jump = jumpEdge(j); } else if (j) out.missText = j.filter(x => x.miss).map(x => x.name + ' 미수집').join(' · '); }
      } catch (err) { out.test = '판정 불가 · 입력 미수집'; }
      const p1In = {e11: ['cpi_energy'], e14: ['cpi_electricity', 'cpi_utility_gas'], e18: ['ppi_services', 'cpi_transport_svc'], e20: ['cpi_electricity', 'cpi_utility_gas'], e17: ['ppi_transport']}[e.id];
      if (out.kind === '도식' && out.missText) { out.test = '도식 · ' + out.missText; delete out.missText; }
      else if (out.kind === '도식') out.test = out.after ? (p1In && p1In.every(k => S[k] && S[k].monthly) ? '도식 · 자료 있음 · 고리 계산 전' : '도식 · ' + out.after + ' 뒤 계산') : '도식 · 자료 없음';
      /* 급변 간선: 판정 근거 패널이 두 끝의 최신값·창 변화·관측 기간·배수를 표로 보인다 */
      const jx = {e9: () => checks.c4.jG, e10: () => checks.c12.jC, e16: () => checks.c10.jF, e17: () => checks.c11.jT}[e.id];
      if (jx && out.jump) { try { const j = jx(); out.jumps = j; out.jumpNone = jumpNone(j); } catch (err) { /* 표 없이 시험 문구만 */ } }
      if (pages) { delete out.test; delete out.flag; delete out.jumps; delete out.jumpNone; }
      return out;
    })
  };

  /* ---------- 시간 띠 ---------- */
  const timeline = {
    fetch: fetchD, asOf: recordsAsOf, fresh: freshList,
    records: records.filter(r => r.ed).map(r => ({id: r.id, d: r.ed.d, approx: r.ed.approx, stage: r.stage, site: r.site || r.facility, type: r.type, status: r.status, node: r.node, country: r.country})),
    chains: EC ? EC.chains.map(ch => { const [a, b] = (ch.event_period || '').split('/'); return {id: ch.id, title: ch.title, a, b: b || a, records: ch.records, links: ch.links.length, status: ch.links.reduce((o, l) => { o[l.status] = (o[l.status] || 0) + 1; return o; }, {})}; }) : null,
    projects: projects.filter(p => p.target_start).map(p => ({id: p.id, a: p.target_start, b: p.target_end || p.target_start, project: p.project, kind: p.kind, phase: p.phase}))
  };

  return {rule, hope, pages, win, days, fetched: L.fetched_at, fetchD, today: isoOf(today), stale: today - tOf(fetchD) >= 2 * DAY,
    answer, firstBreak, breakDir, breakLvl, pathV, ends, comove, checks: list, parts: PARTS, fresh: freshList, oldest, oldestJudged, register, spreads, movers, graph, timeline, faults: checks.c2.faults,
    counts: {dir: {부합: cnt('dir', '부합'), 불일치: cnt('dir', '불일치'), 혼재: cnt('dir', '혼재'), 보합: cnt('dir', '보합')}, lvl: {부합: cnt('lvl', '부합'), 불일치: cnt('lvl', '불일치'), 혼재: cnt('lvl', '혼재'), 보합: cnt('lvl', '보합')}, miss: list.filter(c => c.dir.v === '미수집').length}};
}

const API = {fym, fctr, aggregate, trueContract, isJump, zfmt, jumpNone, jumpEdge, buildMonitorModel, MONITOR_RULE, MONITOR_HOPE, MONITOR_GRAPH, MONITOR_MISSING, SAY, mapEvent, fnum, fsg, fdate, isNum, tOf, addM, wkDated, withLast};
if (typeof module !== 'undefined' && module.exports) module.exports = API; else root.MonitorModel = API;
})(typeof window !== 'undefined' ? window : globalThis);
