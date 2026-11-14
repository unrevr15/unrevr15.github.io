'use strict';

byId('cargo-basis').innerHTML=comparisonChart([
  ['걸프 원유 수출<small>8월과 9월 비교</small>',[9.5,13.9]]
],['2026년 8월','2026년 9월'])+comparisonChart([
  ['정제제품 수출',[4.7,1.9]],
  ['LPG 수출',[1.5,.67]]
],['전쟁 전','2026년 9월'],{digits:2})+
  '<p class="note">중동 수출, 백만 배럴/일. 걸프 원유는 8월 950만 → 9월 1,390만 배럴/일로 반등해 전쟁 전의 75%를 넘겼다. 같은 9월 정제제품은 전쟁 전의 약 40%였다. 10월 일부 주요 산유국의 원유 선적이 전쟁 전 수준에 가까워진 사례와, 이란·LPG를 제외한 걸프 해상 석유 총량이 9월보다 줄었다는 관측은 집계 범위가 다르다. IEA는 전 세계 디젤·가스오일 3분기 공급을 전년 동기보다 170만 배럴/일 적게 추정했다. '+ref('ieaoil','IEA 10월 보고서')+' '+ref('gulfKplerRecovery','Kpler 원유')+' '+ref('gulftrack','Reuters · Vortexa 전체')+'</p>'+
  '<p class="note">원유를 확보한 뒤에도 황 함량·밀도에 맞는 정유시설, 가동 중인 탈황·전환 공정, 제품선이 필요하다. '+ref('eiaYieldNov','중간유분 수율')+'</p>'+
  '<div class="transmission-links"><a href="#gulf-recovery">10월 걸프 수출 ↗</a><a href="#refinery-compare">지역별 정제마진·가동 ↗</a><a href="#diesel-transmission">디젤 가격으로의 전이 ↗</a></div>';

byId('ubs-brent').innerHTML=comparisonChart([
  ['브렌트 선물<small>2027년 1월물</small>',[113.43,104.77]],['WTI 선물<small>2026년 12월물</small>',[104.12,96.46]]
],['10월 30일 종가','11월 2일 종가'],{digits:2})+
  '<p class="note">달러/배럴. 두 날짜 모두 같은 계약월의 종가다. 브렌트 −8.66달러(−7.63%). 10월 30일은 브렌트 12월물의 마지막 거래일로, 근월물 연속 시세는 그날 12월물 종가 117.64달러를 쓴다. '+ref('brentFrontYahoo','연속 시세')+' Reuters는 미·이란 외교 접촉을 하락 배경으로 보도했다. 이 일간 변동에는 수요·공급 기대와 포지션도 반영되므로 위험 프리미엄만의 크기는 따로 추정하기 어렵다. '+ref('brentNov2','Reuters')+'</p>'+
  exactData(marketTable(['실물 지표','읽는 기준'],[
    ['오만·두바이 가격차','오만 미나알파할은 호르무즈 바깥에서 선적한다. Platts Dubai에는 오만 등 대체 인도 유종이 포함된다. 스프레드는 해협 위험, 인도월·평가 방법·등급 품질·공급에 함께 반응한다. 비교 기준은 같은 평가 기관과 같은 인도월이다. '+ref('dubaiOmanMethod','두바이·오만 평가')],
    ['중국의 대체 구매','10월 말 장거리 운임이 고점에서 내려온 뒤 중국 정유사가 서아프리카·브라질산 12월 도착분을 ICE 브렌트 대비 최대 약 20달러/배럴에 샀다는 개별 거래 보도다. '+ref('chinaCargoOct','시장 보도')],
    ['UBS 전망','2026년 말 브렌트 100 → 110달러/배럴, 2027년 3월 말 90 → 95, 6월 말 85 → 90, 9월 말 80 → 85. '+ref('ubsOct','Reuters')]
  ],'text-table'),'오만·두바이와 실물 화물 · 은행 전망')+
  '<div class="transmission-links"><a href="#futures-physical">11월 3~5일 선물 종가 ↗</a><a href="#brent-market">Dated Brent·선물·DFL ↗</a></div>';

byId('physical-recovery-paths').innerHTML=marketTable(['조건','초기 반응','이후 방향을 가르는 관측치'],[
  ['협상 결렬·확전','해협 위험·전쟁보험료 상승, 선물·현물 프리미엄 재확대.','통항·환적·도착량, 재고 인출, 산업·운송 수요.'],
  ['휴전과 통항 회복','위험 프리미엄·운임 하락, 이미 선적된 화물의 도착.','산업 수요 회복, 상업재고·SPR 재비축, 항차·설비 복구 속도.'],
  ['수요 급감','원유·제품 가격과 크랙의 동반 약세.','화물·항공 수요, 산업 생산, 중간유분 출하. IEA 10월 전망에서 2026년 세계 석유 수요는 연평균 260만 배럴/일 감소한다. '+ref('ieaoil','IEA 전망')],
  ['투자 지연','제품 크랙과 원유 생산사 실현가격·현금흐름의 엇갈림.','원월물, 생산자 실현가격과 원가, 유지투자, 최종투자결정(FID), 시추선 계약. '+ref('ieaDecline','IEA 유전 감소율')]
],'text-table')+
  '<div class="transmission-links"><a href="#shipping">VLCC 운임 ↗</a><a href="#escort-watch">통항과 전쟁보험 ↗</a><a href="#oil-buffers">비축·재축적 ↗</a><a href="#offshore-cycle">장기 공급 투자 ↗</a><a href="#inflation-chain">산업·소비 비용 ↗</a></div>';

byId('europe-stock-release').innerHTML=comparisonChart([
  ['석유 총계',[42.6]],['그중 디젤',[20.5]]
],['2027년 1월 말까지 발표 계획 · 백만 배럴'])+
  '<p class="note">10월 29일 유럽 11개국 공동선언. 총량을 90일에 균등 배분하면 약 47만 배럴/일이다. 균등 배분은 계산상 가정이며 국가별 배정과 인도 일정은 반영하지 않았다. 이 물량은 3월 IEA 4억 배럴 조치, 10월 디젤 조치와 겹칠 수 있다. '+ref('europeReserveOct','공동선언 보도')+' '+ref('ieaDieselAction','IEA')+'</p>';

byId('stock-buffer-scope').innerHTML=marketTable(['범위','확인된 내용과 단위'],[
  ['세계 관측 석유 재고','IEA 10월 보고서에서 2월 말 대비 9월 말 5억 900만 배럴 감소. 육상과 해상 재고를 포함하는 관측치다. '+ref('ieaoil','IEA')],
  ['ADIPEC 경영진 발언','ADNOC CEO는 11월 2일 호르무즈 차질 이후 세계 석유 재고 감소를 약 10억 배럴로 추정했다. 일부 시장 디젤 재고의 35년 계절 최저, 다른 시장의 가스 공급 공백 6,000억 ft³ 상당, 원유 배럴 비용 중 해운·물류 비중 약 5% → 30%를 언급했다. 위 IEA 관측치와 집계 대상·기간이 다르다. '+ref('adnocBuffers','Reuters')],
  ['미국 SPR','10월 30일 종료 주간 약 2억 8,218만 배럴(전주 대비 약 −40만). '+ref('spr','EIA')],
  ['사우디 → 싱가포르','10월 26일 양국은 주롱섬 암반 저장고에 사우디 원유를 두기로 공동 의향을 발표했다. 2027년 하반기 목표로, 소비지 인근의 저장 계획이다. '+ref('jurongCrude','공동발표')+' '+ref('jurongSchedule','일정')+' <a class="ref" href="#oil-map" data-region="asia" data-site="jurong">저장고 지도 ↗</a>']
],'text-table')+
  '<div class="transmission-links"><a href="#oil-balance">원유 재고 시계열 ↗</a><a href="#product-stocks">제품별 재고 일수 ↗</a></div>';

wireMapLinks('stock-buffer-scope');

byId('offshore-fleet').innerHTML=comparisonChart([
  ['온화한 해역용 부유식 시추설비',[280,150]]
],['2014년 정점','2026년 6월 말'],{digits:0})+
  '<p class="note">설비 수, Valaris 집계. 폐선이 감소의 주된 원인이었다. 사양·해역별로 대체 가능성이 달라 이 설비 수는 개별 프로젝트의 가용 선대와 다르다. '+ref('valarisFleet','Valaris 10-Q')+'</p>'+
  comparisonChart([['시장에 투입된 Noble 선대 가동률',[67,70]]],['2026년 2분기','2026년 3분기'],{digits:0})+
  '<p class="note">가동률 %. 3분기 시장에 투입된 선대는 28기다. Noble 경영진은 최근 고사양 드릴십 계약 일당이 40만 달러 중반~50만 달러였고, 2027년 하반기 계약 확정 선대 용량은 상반기보다 약 20% 많다고 밝혔다. '+ref('nobleQ3','Noble 공시')+' '+ref('nobleCall','설명회')+'</p>';

byId('offshore-economics').innerHTML=comparisonChart([
  ['육상 유전',[4.2]],['심해 유전',[10.3]]
],['생산 정점 이후 연평균 관측 감소율 · %'])+
  '<p class="note">IEA는 2019년 이후 연간 석유·가스 상류 투자의 약 90%가 생산 감소를 상쇄하는 데 쓰였다고 분석했다. 기존 생산자산 투자가 즉시 전면 중단된다는 가정에서는 세계 석유 생산이 10년간 연평균 약 8%, 매년 약 550만 배럴/일씩 줄어든다. '+ref('ieaDecline','IEA 자산별 분석')+'</p>'+
  marketTable(['투자 판단','확인할 항목'],[
    ['정유와 상류 현금흐름','EIA 기준 2026년 3분기 미국 중간유분·항공유 크랙은 전년 동기의 거의 3배였다. 유럽·아시아에서는 원유 도착비가 높아지며 마진이 압박됐다. 정유사 항목은 수율을 적용한 제품 매출, 원유 도착원가, 가동비다. 생산사 항목은 실현 원유가, 수송·로열티·세금·운영비, 유지투자다. '+ref('eiaRefineryQ3','미국 크랙')+' '+ref('ieaoil','지역 마진')],
    ['브렌트 장기물과 타이백','Equinor는 배럴당 35달러 미만의 손익분기 사업군과 2035년까지 연간 신규 타이백 6~8건 개발 계획을 제시했다. 타이백은 기존 생산설비에 새 유정을 연결하는 방식이다. '+ref('equinorCmd','Equinor')],
    ['시추 비용과 공급 시차','전체 사업비 = 일당 × 작업일수 + 동원·해저설비·배관·운영비 등. FID → 시추·설비 계약 → 첫 생산의 시차.']
  ],'text-table')+
  '<div class="transmission-links"><a href="#upstream-investment">셰일·유전서비스 투자 ↗</a><a href="#lng-deliveries">해상 가스전과 기존 액화설비 ↗</a></div>';

byId('china-diesel-liftings').innerHTML=comparisonChart([
  ['월간 수출 실적<small>해관총서</small>',[1.33,1.85]]
],['8월','9월'],{digits:2})+
  '<p class="note">백만 톤. 9월은 해관총서 통계로 185만 톤(전년 대비 +262.3%)이고, 11월 5일 Reuters 기사에는 180만 톤으로 적혀 있다. <a href="#vc-asia_refining">9월 제품별 수출 ↗</a> 11월 5일 기준 약 50만 톤 판매가 파악됐고 업계 추정은 11월 전체 80만 톤 미만이다. 10월 말 상업 재고 1,110만 톤(약 8,300만 배럴)은 Reuters가 전한 Oilchem 집계로 2011년 기록 시작 이후 최저다. '+ref('cnDieselNov','Reuters · Oilchem')+'</p>'+
  exactData(comparisonChart([['아시아 휘발유 크랙',[50.53,11]]],['10월 1일','10월 30일 약'],{digits:2})+
    '<p class="note">브렌트 대비 달러/배럴. 중국 4차 쿼터 발표로 2026년 휘발유·디젤·항공유 합산 허용량은 4,200만 톤(전년 대비 +6%)이 됐다. 같은 시기 싱가포르 경질유분 재고는 1,130만 배럴로 2주 만의 최고였다. '+ref('cnDieselNov','연간 한도')+' '+ref('chinaQuotaReuters','크랙·싱가포르 재고')+'</p>',
    '중국 4차 쿼터와 아시아 휘발유 크랙')+
  exactData(comparisonChart([
    ['2021년',[37.61]],['2022년',[37.25]],['2023년',[40.79]],
    ['2024년',[41]],['2025년',[41.41]],['2026년',[42]]
  ],['휘발유·디젤·항공유 수출 허용량 · 백만 톤'],{digits:2})+
    '<p class="note">2021~2025년 S&amp;P Global, 2026년 Reuters. 2026년 4,200만 톤은 이 기간에 확인한 공개 집계 중 가장 많다. 전년 S&amp;P 수치와 단순 비교하면 +1.4%이며, Reuters의 +6%는 전년 비교치가 달라 직접 이어지지 않는다. S&amp;P의 2023년 수치도 기사에 따라 4,079만~4,082만 톤이다. 4차 할당 직후인 10월 28일 모스크바타임스 보도(소식통 인용)는 2026년 연간 합계를 약 4,000만 톤(전년 수준)으로 전했고, 1~4차 보도 값을 더해도 약 4,055만 톤(계산)이다. <a href="#vc-asia_refining">차수별 출처 ↗</a> '+ref('chinaQuota2021','2021')+' '+ref('chinaQuota2023','2023')+' '+ref('chinaQuota2024','2023·24')+' '+ref('chinaQuota2025','2022·25')+' '+ref('cnDieselNov','2026')+'</p>',
    '연간 수출 쿼터 · 2021~2026');

byId('korea-diesel-quota').innerHTML=comparisonChart([
  ['수출 허용 상한',[100,110]]
],['이전','2026년 11월부터'],{digits:0})+
  '<p class="note">전년 같은 달 실적 = 100. 국내 공급 의무를 이행하고 적정 재고를 확보한 경우 적용한다. 중국도 쿼터 외에 월별 수출 승인과 내수 재고가 실제 선적량을 정한다. 한국의 허용량 상향이 중국의 감소분을 얼마나 메우는지는 양국 선적 실적이 나오면 알 수 있다. '+ref('krDieselQuota','산업통상부')+' '+ref('cnDieselNov','중국 승인과 선적')+'</p>'+
  '<div class="transmission-links"><a href="#quarter-cracks">제품별 크랙 ↗</a><a href="#product-shipping">정제제품선 운임 ↗</a></div>';

byId('lng-cargo-disruptions').innerHTML=marketTable(['고객·시장','확인된 시점과 범위'],[
  ['이탈리아 Edison','10월 말 카타르에너지의 불가항력 종료 시한이 12월 말로 연장됐다. Edison 공지에서 추가 취소는 아드리아 LNG 터미널 도착분 세 화물이다. '+ref('edisonQatarDec','Edison')],
  ['남아시아','Reuters는 파키스탄·방글라데시 일부 고객에 연말까지, 인도 Petronet에는 11월 공급분에 대해 연장 통지가 있었다고 전했다. '+ref('qatarCustomers','Reuters')],
  ['미국산 LNG 목적지','순수취가는 동일 도착월의 유럽 TTF 또는 아시아 JKM에서 항차별 운임·운하비·손실·재기화·환율을 반영해 구한다. 목적지 제한이 있는 계약은 차익이 발생해도 선박을 돌리기 어렵다.']
],'text-table')+
  comparisonChart([['작업용량 대비 저장률',[61.7,75,91]]],['독일','EU 약','이탈리아 약'])+
  '<p class="note">10월 29일 Reuters 집계, %. 전날 TTF 근월물이 장중 100유로/MWh에 닿았다. 이탈리아 당국자는 독일의 주입 지연을 비판하고 추운 1월을 가정해 150~180유로/MWh 가능성을 언급했다. 독일은 겨울 공급이 안정적이라고 밝혔다. '+ref('italyStorage','Reuters')+'</p>'+
  '<div class="transmission-links"><a href="#winter-gas">EU 겨울 시나리오·러시아산 수입 규정 ↗</a><a href="#lng-voyages">항차·운송비 ↗</a><a href="#gas-map">카타르와 미국 공급 경로 ↗</a></div>';

byId('lng-buildout').innerHTML=comparisonChart([
  ['Cheniere 수출 카고',[163,188]]
],['2025년 3분기','2026년 3분기'],{digits:0})+
  '<p class="note">에너지량 586 → 684 TBtu(+17%). 188카고는 분기 평균 약 12시간당 한 카고다. 8월 Corpus Christi Stage 3의 7번째 중형 액화설비가 실질 완공됐고 회사 전체 LNG 능력은 이 사업으로 20% 넘게 늘었다. '+ref('cheniereQ3','Cheniere 8-K')+'</p>'+
  marketTable(['공급 프로젝트','계약·공정 단계'],[
    ['Woodside → QatarEnergy','루이지애나 LNG Train 2 가동부터 FOB 공급, Train 3 가동 후 연 최대 300만 톤. 20년 계약이며 사업의 첫 LNG 목표가 2029년이다. '+ref('lngWoodside','Woodside 공시')],
    ['Eni 동칼리만탄','2026년 3월 두 심해 가스 허브 FID. 생산정 7개와 16개를 개발해 국내 가스망과 Bontang LNG에 연결하고, 멈춰 있던 Train F를 재가동할 계획이다. '+ref('eniFid','Eni')],
    ['북해 Afrodite','35/7-2 평가정의 가스·콘덴세이트 추정 회수 가능 자원은 7,700만~1억 8,000만 boe다. 저류층 품질에 제약이 있으며 기존 Kvitebjørn 시설 연결은 검토 단계다. '+ref('afrodite','노르웨이 해양국')],
    ['QatarEnergy North Field','카타르 기존 액화능력 연 7,700만 톤에서 2030년 1억 4,200만 톤을 목표로 한다. 이 목표는 증설 공사·시운전 일정이며 현재 선적 회복 일정이 아니다. '+ref('qatarNorthField','QatarEnergy')],
    ['Sabine Pass 7호기','기존 부지 증설 1단계로 병목 개선분을 포함해 연 600만 톤 초과 계획이다. Bechtel EPC 계약과 조기 설계·조달 착수는 최종투자결정이 아니다. '+ref('sabineEpc','SEC')],
    ['Corpus Christi 4단계','회사 계획은 병목 개선분 포함 연 최대 약 2,400만 톤이다. 9월 환경영향평가서 초안이 나왔고 인허가와 최종투자결정이 남았다. 별개 8·9호기는 건설 중이다. '+ref('cheniereQ3','회사')+' '+ref('corpusFerc','FERC')]
  ],'text-table')+
  exactData(comparisonChart([
    ['3분기 매출',[4.441,6.173]],['3분기 조정 EBITDA',[1.608,1.900]],['3분기 GAAP 순이익',[1.049,1.170]],
    ['1~9월 GAAP 순이익',[3.028,.736]],['1~9월 조정 순이익',[1.883,2.388]],['1~9월 조정 EBITDA',[4.896,6.037]]
  ],['2025년','2026년'],{digits:2})+
    '<p class="note">십억 달러. 3분기 배당가능현금흐름은 12.3억 달러다. 1~9월 파생상품 공정가치 변동의 전년 대비 불리한 차이 36억 달러는 주로 장기 IPM 계약에서 발생했다(세전·비지배지분 반영 전). 조정 순이익은 비현금성 평가 변동과 관련 세금·비지배지분을 조정한다. '+ref('cheniereQ3','8-K 조정 내역')+'</p>'+
    marketTable(['2026년 연간 회사 전망','기존 → 변경 · 십억 달러'],[
      ['조정 EBITDA','7.90~8.40 → 8.75~9.25'],['배당가능현금흐름','5.30~5.80 → 6.05~6.55']
    ],'text-table')+'<p class="note">새 분기 배당은 주당 0.625달러로 직전 분기보다 12% 넘게 인상됐다. 자사주 매입은 3분기 7.31억 달러, 1~9월 18억 달러다.</p>',
    'Cheniere 실적·평가손익·현금 배분')+
  '<div class="transmission-links"><a href="#qatar-cheniere">별도 Cheniere 장기 구매계약 ↗</a><a href="#offshore-cycle">해양개발의 선행지표 ↗</a><a href="#gas-map" data-region="russia" data-site="afrodite">북해 평가정 지도 ↗</a><a href="#gas-map" data-region="asia" data-site="bontang">Bontang LNG 지도 ↗</a></div>';

wireMapLinks('lng-buildout');

byId('knesset-count').innerHTML=comparisonChart([
  ['네타냐후 진영',[53]],['아이젠코트 진영',[48]],['아랍계 정당',[19]]
],['확정 의석 · 총 120석 · 과반 61석'],{digits:0})+
  '<p class="note">10월 27일 총선 리쿠드 27석, 야샤르 21석. 11월 5일 대통령 협의에서는 아이젠코트 67명, 네타냐후 46명의 추천을 받았다. 후보 추천은 연정 합의가 아니다. 헤르초그 대통령은 11월 8일 정부 구성 후보를 지명하겠다고 밝혔다. '+ref('knesset26','크네세트')+' '+ref('knessetBloc','진영 분류')+' '+ref('israelNominee','Reuters')+'</p>';

byId('iran-diplomacy').innerHTML=marketTable(['시점·주체','공개 발언·협상 조건'],[
  ['이스라엘 후보 노선','네타냐후는 핵·군사 위협에 강경 대응하며 선거 전 이란 정권 붕괴도 목표로 언급했다. 아이젠코트는 핵 역량 해체를 강조하고 군사행동만으로 정권 교체가 가능한지 의문을 제기했다. 베네트도 이란 정권 교체를 추진할 구상을 공개했다. '+ref('israelIranPositions','후보별 발언')+' '+ref('bennettIran','베네트 구상')],
  ['10월 26일 테헤란','사우디아라비아·튀르키예·파키스탄이 이란과 안보를 협의했다. 후티의 공격이 이어지던 시점의 회담이다. '+ref('meccaTehran','Reuters')],
  ['10월 29일 이란 의회','호세인알리 하지델리게니 의원은 필요하면 유가를 배럴당 150달러 이상으로 끌어올리기 위한 조치를 취하겠다고 말하고 아라그치 외무장관의 교체를 요구했다. '+ref('iranOilThreat','Iran International')],
  ['11월 2일 카이한','카이한 편집장은 미국이 60% 농축우라늄 400kg의 희석과 핵시설 사찰을 요구했고 이란이 거부했다고 주장했다. '+ref('kayhanNuclear','발언 보도')],
  ['11월 5일 카타르 중재','Reuters는 익명 이란 고위 관계자를 인용해 카타르를 통해 핵 제안을 전달했으며 미국이 제재·봉쇄 해제 등을 포함한 7가지 요구를 먼저 이행해야 논의할 수 있다는 입장이라고 보도했다. '+ref('qatarNuclear','Reuters')]
],'text-table')+
  '<div class="transmission-links"><a href="#escort-watch">호르무즈 통항·보험 ↗</a><a href="#physical-crude">휴전과 확전 시 가격 경로 ↗</a></div>';

byId('russia-strike-followup').innerHTML=exactData(marketTable(['날짜·시설','공개 확인 단계'],[
  ['<a href="#products-map" data-region="russia" data-site="novosam">10월 30일 · 노보쿠이비셰프스크 ↗</a>','사마라 지역 정유시설 피격 보도. 시설별 정지 공정·규모 미확인.'],
  ['<a href="#products-map" data-region="russia" data-site="novoil">10월 31일 · 바슈네프트 노보일 ↗</a>','우파 정유시설 피격 정황. 실제 정지량 미확인.'],
  ['<a href="#products-map" data-region="russia" data-site="norsi">11월 1일 · 루코일 NORSI ↗</a>','니즈니노브고로드 주지사는 지역 산업시설 피해를 확인했다. 정유시설 여부와 정지 공정은 미확인이다.'],
  ['11월 3일 · 야로슬라블 YANOS','주지사가 화재와 기반시설 피해를 확인했다. 실제 손실은 미확인이다. '+ref('yar','Reuters')]
],'text-table')+
  '<p class="note">Dnipro OSINT가 추산한 첫 세 시설의 연간 설계능력 합계는 3,000만~3,300만 톤(러시아 전체의 약 10%)이다. 설계능력 합계이며 전국 처리량이나 완제품 출하의 감소 폭이 아니다. '+ref('ruStrikesOct','피격 추적')+' '+ref('ruTargetCapacity','설계능력 추정')+'</p>'+
  '<div class="transmission-links"><a href="#russia-repairs">러시아 정유시설과 복구 ↗</a><a href="#fuel-specs">MTBE·내한성 디젤 ↗</a></div>','10월 30일~11월 3일 시설별 확인 단계');

wireMapLinks('russia-strike-followup');

byId('ubs-brent').insertAdjacentHTML('beforeend',
  exactData(comparisonChart([
    ['Brent',[108,98,73]],['WTI',[96,87,66]]
  ],['2026년 4분기','2027년 1분기','2028년 연평균'],{digits:0})+
    '<p class="note">11월 초 보도된 Goldman Sachs 전망, 달러/배럴. 2026년 4분기는 이전 Brent 95·WTI 85에서 상향됐다. 2028년은 하향됐다. 분기 평균·연평균 전망치다. '+ref('goldmanTerms','전망 표 보도')+' '+ref('goldmannov','연간 및 12월 전망')+'</p><p class="note">별도 상방 시나리오에서 2027년 걸프 생산이 2025년 평균보다 350만 배럴/일 낮게 유지되면 브렌트가 140달러에 이를 수 있다고 봤다. '+ref('goldmanUpside','Reuters')+'</p>','Goldman Sachs · 2026년 4분기 상향, 2028년 하향'));

const foodPriceSeptember=[
  ['식량가격지수',1.5],['곡물',5.1],['식물성 유지',.9],['설탕',6.1],['육류',-1.1],['유제품',-.1]
];
const foodPriceOctober=[-1.2,-4.5,.3,6.6,-1.2,-1.1];
const eggRetailPrices=[['7월',[3.599,2.189]],['8월',[3.587,2.272]],['9월',[3.488,2.272]]];
byId('food-price-index').innerHTML=comparisonChart(foodPriceSeptember.map(([name,change],index)=>[name,[change,foodPriceOctober[index]]]),
  ['9월 공표 · 전월비 %','10월 공표 · 전월비 %'],{signed:true,showSign:true})+
  '<p class="note">10월 식량가격지수 133.9, 전년 같은 달 대비 +5.9%. 10월 전월비는 수정된 9월 지수 135.5를 기준으로 한다. 9월 막대는 10월 2일 발표치이며 당시 종합지수는 136.0, 전년 대비 +5.8%였다. '+ref('faoFoodSep','9월 공표')+' '+ref('faoFoodOct','10월 공표')+'</p>'+
  '<p class="note">FAO는 9월 곡물 상승에 흑해 운송과 작황 우려를, 10월 곡물 하락에 수입 수요 둔화와 아르헨티나 작황 개선을 들었다. 10월 설탕은 브라질 중남부 강우로 수확과 가공이 지연된 가운데 상승했다.</p>'+
  '<div class="transmission-links"><a href="#food">식량 생산·교역·가공 ↗</a><a href="#food-downstream">밀가루·빵 가격 ↗</a></div>';

byId('grain-quality-cost').innerHTML=contextFlow([
  ['호주 동부 강우','수확 지연과 수분 증가'],
  ['등급별 공급 변화','일부 제분용 밀의 등급 하락 위험'],
  ['제분·식품 원가','등급 프리미엄과 물류·포장 비용']
])+
  '<p class="note">총생산이 많아도 제분용 품질의 공급은 빠듯할 수 있다. 호주 기상청 집계에서 퀸즐랜드 10월 강수량은 평년보다 194% 많았다. ABARES는 11월 5일 추가 강우로 북동부 수확 지연과 등급 하락 위험이 커질 수 있다고 봤다. Bloomberg가 인용한 은행 분석은 뉴사우스웨일스·퀸즐랜드에서 사료용 밀 증가와 고단백 등급 감소 가능성을 제시했다. '+ref('ausRainOct','호주 기상청')+' '+ref('ausCropABARES','ABARES')+' '+ref('ausWheatBloomberg','Bloomberg')+'</p>'+
  '<p class="note">ABARES의 9월 호주 밀 생산 전망은 2026/27년 2,990만 톤이었다. 11월 5일 업계 보도에 따르면 호주 북부에서 고단백 APH의 일반 제분용 ASW 대비 프리미엄은 약 60호주달러/톤이다. '+ref('grainsAbaSep','ABARES')+' '+ref('grainGrades','등급별 거래')+'</p>';

const usPceChanges=[
  ['개인소비지출(PCE) 물가',[.3,.5],3.6],
  ['근원 PCE 물가<small>식품·에너지 제외</small>',[.3,.3],3.1],
  ['명목 소비지출',[.9,.5]],
  ['실질 소비지출',[.5,0]]
];
byId('consumer-pass-through').insertAdjacentHTML('beforeend',
  exactData(marketTable(['미국 개인소비지출 · %','8월 전월비','9월 전월비','9월 전년비'],usPceChanges.map(([name,values,yearChange])=>[
    name,...values.map(value=>signedChange(value,1)),yearChange==null?'—':signedChange(yearChange,1)
  ])).replace('<table','<table id="us-pce-changes"')+'<p class="note">9월 실질 지출 증가율은 0.1% 미만으로, 소수점 첫째 자리에서 0.0%다. '+ref('usPceSep','BEA')+'</p>'+
  marketTable(['실물 수요 점검','최근 관측'],[
    ['미국 9월 개인소비','전월 대비 명목 +0.5%, 실질 지출 +0.1% 미만. '+ref('usPceSep','BEA')],
    ['프랑스 3분기 성장','실질 GDP 전분기 대비 −0.1%, 2분기 0.0%. '+ref('franceGDP','INSEE')]
  ],'text-table'),'실질 소비와 경기 지표')+
  exactData(comparisonChart(eggRetailPrices,['2025년','2026년'],{digits:3})+
    '<p class="note">미국 도시 평균 A등급 대란 12개당 달러. 2026년 9월은 전월과 같고 전년 같은 달보다 낮았다. '+ref('eggRetail','BLS')+' '+ref('eggWholesale','USDA 도매')+'</p>',
    '미국 계란 소매가'));

byId('brent-products').insertAdjacentHTML('beforeend',
  exactData(marketTable(['순서','북해 화물 호가 비교 · 달러/배럴'],[
    ['화물 조건 확인','등급·선적 창·물량·FOB/CIF.'],
    ['동일 기준으로 환산','가정상 A의 CIF 104에서 운임 조정 3을 빼면 FOB 환산 101이다. B가 같은 품질 기준의 FOB 102라면 A가 더 경쟁력 있다.'],
    ['가격 평가','평가기관은 적격 호가와 거래, 인도 가능성 및 품질 조정을 검토한다. '+ref('platts','Platts 방법론')]
  ],'text-table'),'북해 화물 호가 비교 예시'));
