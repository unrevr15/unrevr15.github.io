'use strict';

function chainStages(steps) {
  return '<ol class="chain-stages">'+steps.map(([title,scope,id])=>
    '<li><a href="#'+id+'"><strong>'+title+'</strong><small>'+scope+'</small></a></li>'
  ).join('')+'</ol>';
}

byId('food-chain-flow').innerHTML=chainStages([
  ['농가 투입','비료·연료','food-inputs'],
  ['재배·수확·저장','밀 생산량과 기말 재고','food-production'],
  ['수출·수입','밀·대두 물량과 운임','food-actual-trade'],
  ['제분·착유','밀가루·대두박·대두유','food-milling'],
  ['식품·사료·연료','원곡·밀가루·빵 가격','food-downstream']
]);
byId('copper-chain-flow').innerHTML=chainStages([
  ['채굴·선광','광석 품위와 정광','copper-production'],
  ['정광 조달','중국 원료 수입','copper-actual-trade'],
  ['제련·정련','전기동·황산·가공비','copper-smelting'],
  ['전기동 유통','현물 웃돈·거래소 재고','copper-physical'],
  ['가공·최종 수요','전선·건설·운송','copper-downstream']
]);

function tradeQuantityTables(layers) {
  return '<div class="detail-grid">'+Object.values(layers).map(({product,code,rows,total})=>{
    const quantities=rows.map(([from,to,tonnes,source,reporter])=>[
      tradeCountries[from][0]+' → '+tradeCountries[to][0]+'<small>'+reporter+' '+ref(source)+'</small>',
      num(tonnes,0),...(total?[num(100*tonnes/total)+'%']:[])
    ]);
    if(total) quantities.push(['중국 신고 전체',num(total,0),'100%']);
    return '<div class="table-scroll"><h3>'+product+' <span class="meta">HS '+code+'</span></h3>'+
      marketTable(['수출국 → 수입국','미터톤',...(total?['수입량 비중']:[])],quantities)+'</div>';
  }).join('')+'</div>';
}

byId('food-actual-trade').innerHTML=tradeQuantityTables(commodityTrade.food)+
  '<p class="note">달력연도 실제 신고량이다. 밀은 메슬린을 포함한다. 수출국 → 수입국은 신고 기준이며 선박 경로, 환적, 운송 수단은 이 표에 없다. '+ref('witsSoyChina','대두 원표')+'</p>';
byId('copper-actual-trade').innerHTML=tradeQuantityTables(commodityTrade.copper)+
  '<p class="note">중국 수입 신고 기준이다. 정광의 함유 구리량은 품위를 알아야 산출할 수 있다. '+ref('witsCopperOre','정광 원표')+' '+ref('witsCopperCathode','음극 원표')+'</p>';

byId('food-cereal-data').innerHTML=comparisonChart([
  ['생산',[3046.9,2998.7]],['이용',[2965.1,2970.7]],['국제 교역',[525.1,507.7]],['기말 재고',[987.9,1005.1]]
],['2025/26 추정','2026/27 전망'])+
  '<p class="note">11월 6일 FAO. 재고는 각국 작기 말의 합계다. FAO는 러시아·우크라이나의 수출 차질로 현지 밀 재고가 쌓이는 한편 세계 곡물 교역이 줄 것으로 봤다. '+ref('faoCerealsNov','수급표')+' '+ref('faoCerealLogistics','FAO 설명')+'</p>'+
  '<div class="transmission-links"><a href="#food-production">밀만 비교 ↗</a><a href="#food-downstream">가공품·소매 가격 ↗</a></div>';

byId('food-wheat-balance').innerHTML=comparisonChart([
  ['세계 생산',[844.06,822.39]],['세계 총이용',[822.90,827.90]],['그중 사료용',[168.65,166.90]],
  ['세계 수출',[226.91,208.97]],['세계 기말 재고',[281.55,276.04]]
],['2025/26 추정','2026/27 전망'],{digits:2})+
  '<p class="note">10월 9일 USDA. 총이용에는 식품·종자·산업·사료 등이 포함된다. 수출은 국가 간 이동량이다. '+ref('wheatWasdeOct','USDA 18~19쪽')+'</p>';

byId('food-fertilizers').innerHTML=comparisonChart([
  ['요소(질소)',[693.5,399.2]],['인산이암모늄(DAP)',[759.5,791.8]],['염화칼륨',[402.9,383.6]]
],q2q3)+
  '<p class="note">세계은행 11월호 지표. 요소는 암모니아를 거치며, 천연가스를 원료로 쓰는 지역에서는 가스 조달비의 영향을 받는다. 인산과 칼륨 비료는 원료와 교역 구조가 요소와 다르다. '+ref('wbquarters','World Bank')+'</p>'+
  '<div class="transmission-links"><a href="#gas-market">가스 지표 ↗</a><a href="#diesel-cost">경유 판매가 ↗</a></div>';

byId('food-logistics').innerHTML=contextFlow([
  ['산지','건조·등급 분류·사일로'],['내륙','트럭·철도·바지선'],['항만','선적·벌크선'],['소비지','하역·저장·제분']
])+comparisonChart([
  ['미국 걸프 → 일본',[74.75]],['미국 태평양 북서부 → 일본',[39.50]]
],['2026년 10월 29일 · 해상 운임 달러/톤'],{digits:2})+
  '<p class="note">미국 곡물 운임 평가로, 두 출발지에서 일본까지의 해상 구간만 비교했다. 산지에서 항구까지의 운송비, 보험료, 도착지 비용은 넣지 않았다. '+ref('grainFreightNov','USDA 11월 5일자')+'</p>';

const poundsToTonnes=.00045359237;
const shortTonToTonnes=2000*poundsToTonnes;
const usMilling=[
  ['밀 투입',[231.402,223.067,227.003],60*poundsToTonnes,'백만 부셸'],
  ['밀가루 생산',[106.230,103.683,104.863],100*poundsToTonnes,'백만 cwt'],
  ['제분 부산물',[1.663809,1.597379,1.630336],shortTonToTonnes,'백만 쇼트톤']
];
const millingPeriods=['2025년 3분기','2026년 2분기','2026년 3분기'];
byId('food-milling-data').innerHTML=comparisonChart(usMilling.map(([name,values,conversion])=>[
  name,values.map(value=>value*conversion)
]),millingPeriods,{digits:2})+
  '<p class="note">2026년 3분기 미국 제분설비의 24시간 기준 밀가루 생산능력은 하루 약 162.9만 cwt다. 환산은 밀 1부셸 60파운드, 1 cwt(헌드레드웨이트) 100파운드, 1쇼트톤 2,000파운드를 적용했다. '+ref('wheatFlourQ3','USDA')+'</p>'+
  exactData(marketTable(['원표 단위',...millingPeriods],usMilling.map(([name,values,,unit])=>[
    name+'<small>'+unit+'</small>',...values.map(value=>num(value,3))
  ])),'환산 전 원표');

byId('food-milling-yield').innerHTML=contextFlow([
  ['원곡','선별·가수'],['제분','파쇄·체질'],['밀가루','제빵·면류'],['부산물','밀기울·사료']
])+comparisonChart([['밀가루',[73]],['밀기울 등 부산물',[27]]],['밀 100kg당 kg · 표준 수율'],{digits:0})+
  '<p class="note">USDA의 가격 전가 분석에 쓰는 표준 수율이다. 제분용 밀의 실제 수율과 조달 가격은 품종·단백질·수분·등급별로 다르다. '+ref('wheatFlourYield','USDA 수율')+'</p>'+
  '<div class="transmission-links"><a href="#grain-quality-cost">호주 고단백 밀과 일반 제분용 밀 ↗</a><a href="#food-downstream">밀가루·식빵 가격 ↗</a></div>';

byId('food-soy-crush').innerHTML=comparisonChart([
  ['대두 투입',[5.964861*shortTonToTonnes]],['대두박 생산',[4.187161*shortTonToTonnes]],
  ['그중 사료용 대두박',[4.136836*shortTonToTonnes]],['조대두유 생산',[2309.806*poundsToTonnes]]
],['미국 2026년 9월 · 백만 톤'],{digits:2})+
  '<p class="note">USDA 실제 조사. 대두와 박은 쇼트톤에서, 조대두유는 파운드에서 환산했다. '+ref('soyCrushSep','USDA')+'</p>'+
  exactData(comparisonChart([
    ['대두박',[44]],['조대두유',[11]],['껍질',[4]],['손실',[1]]
  ],['대두 60파운드당 파운드'],{digits:0})+'<p class="note">대두 착유의 표준 예시다. '+ref('soyCrushGuide','CME')+'</p>','박과 유의 표준 착유 수율');

byId('food-soy-use').innerHTML=comparisonChart([
  ['바이오연료',[14.800,17.800]],['식품·사료·기타 산업',[15.555,15.305]]
],['2025/26 추정','2026/27 전망'],{digits:2})+
  '<p class="note">미국 대두유 국내 용도, 십억 파운드. 바이오연료 비중은 48.8%에서 53.8%로 높아질 전망이다. '+ref('wheatWasdeOct','USDA 15쪽')+'</p>'+
  comparisonChart([['바이오연료 시설의 실제 대두유 투입',[7.291,10.620]]],['2025년 1~8월','2026년 1~8월'],{digits:2})+
  '<p class="note">십억 파운드. EIA 달력연도 누계 실적이다. '+ref('eiaSoyBiofuel','EIA')+'</p>'+
  '<div class="transmission-links"><a href="#brazil-sugar-mix">사탕수수의 설탕·에탄올 배분 ↗</a></div>';

const meanCommodityPrices=values=>values.reduce((sum,value)=>sum+value,0)/values.length;
function commodityPriceComparison(rows) {
  return '<div class="detail-grid"><div>'+comparisonChart(rows.map(([name,,q2,q3])=>[
    name,[100*(q3/q2-1)]
  ]),['3분기 전분기비 · %'],{signed:true,showSign:true})+'</div><div class="table-scroll">'+
    marketTable(['가격 단계','단위','2분기','3분기'],rows.map(([name,unit,q2,q3,source,digits])=>[
      name+' '+ref(source),unit,num(q2,digits),num(q3,digits)
    ]))+'</div></div>';
}

byId('food-retail-prices').innerHTML=commodityPriceComparison([
  ['미국 경질 적색 겨울밀(HRW)','달러/톤',290.3,329.0,'wbquarters',1],
  ['미국 밀가루 생산자물가','1982년=100',meanCommodityPrices([249.074,257.200,248.681]),meanCommodityPrices([251.059,254.895,260.321]),'blsWheatFlour',2],
  ['미국 흰 식빵 평균 소매가','달러/파운드',meanCommodityPrices([1.869,1.830,1.814]),meanCommodityPrices([1.820,1.823,1.830]),'blsWhiteBread',3]
])+'<p class="note">원곡은 수출 지표, 밀가루는 미국 생산자물가, 식빵은 미국 도시 표본 평균 가격이다. 밀가루와 식빵의 분기 값은 월평균 세 개의 단순 평균이다.</p>'+
  '<div class="transmission-links"><a href="#food-price-index">FAO 국제 식량가격 ↗</a><a href="#consumer-pass-through">계란·기업 원가·실질 소비 ↗</a></div>';

const copperProductionRows=[
  ['세계',[23.00,23.00],[27.60,29.00]],
  ['칠레',[5.51,5.30],[1.94,1.70]],
  ['콩고민주공화국',[2.99,3.20],[2.56,2.80]],
  ['페루',[2.74,2.70],[.385,.340]],
  ['중국',[1.84,1.80],[12.40,14.00]],
  ['잠비아',[.823,.940],[.189,.270]]
];
byId('copper-geography').innerHTML=comparisonChart(copperProductionRows.slice(1,5).map(([name,mine,refining])=>[
  name,[mine[1],refining[1]]
]),['광산','정련'],{digits:2})+
  '<p class="note">구리 함량 기준 백만 톤. 세계 광산 2,300만 톤, 정련 2,900만 톤. 정련은 스크랩 원료도 포함한다. '+ref('copperUsgs','USGS')+'</p>'+
  '<div class="transmission-links"><a href="#copper-production">2024년 비교·가공 경로 ↗</a><a href="#copper-downstream">전선·케이블 가격 ↗</a></div>';

byId('copper-production-data').innerHTML=marketTable(['지역','광산 2024','광산 2025 추정','정련 2024','정련 2025 추정'],
  copperProductionRows.map(([name,mine,refining])=>[name,...[...mine,...refining].map(value=>num(value,2))]))+
  '<p class="note">USGS 세계 합계는 반올림값이며, 나라 행은 주요 생산지다. '+ref('copperUsgs','USGS')+'</p>'+
  comparisonChart([['에스콘디다 선광 투입 품위',[1.05,.91]]],['FY2025 3월까지','FY2026 3월까지'],{digits:2})+
  '<p class="note">품위는 %. BHP에 따르면 FY2026 3월까지 9개월 에스콘디다 구리 생산은 광산 전체 기준 94.9만 톤으로 전년보다 3% 줄었다. '+ref('bhpEscondida','BHP')+'</p>';

byId('copper-process-paths').innerHTML=contextFlow([
  ['황화광','파쇄·부유선광'],['정광','운송·용융제련'],['양극','전해정련'],['음극','전기동']
])+contextFlow([
  ['산화광','황산 침출'],['침출액','용매추출(SX)'],['구리 용액','전해채취(EW)'],['음극','전기동']
])+contextFlow([
  ['스크랩','수거·선별'],['가공 원료','재용해 또는 2차 정련'],['제품','합금·반제품·전기동']
])+'<p class="note">황화광과 산화광의 대표 공정이다. 침출·전해채취는 황산과 전력을 쓴다. '+ref('copperEpaProcess','EPA')+' '+ref('copperUsgs','USGS 재활용')+'</p>'+
  '<div class="transmission-links"><a href="#copper-smelting">정광 제련비와 황산 수익 ↗</a><a href="#zambia-copper">잠비아 황산·디젤 비용 ↗</a></div>';

byId('copper-demand-data').innerHTML=comparisonChart([
  ['세계 광산 생산',[23.48,24.22]],['세계 정제 생산',[28.69,29.67]],['세계 정제 사용',[28.59,29.30]]
],['2026년 전망','2027년 전망'],{digits:2})+
  '<p class="note">백만 톤 · ICSG 10월 전망. 정제 공급과 사용의 차이는 각각 +10.4만, +36.8만 톤이다. '+ref('copperIcsgOct','ICSG')+' '+ref('copperIcsgLevels','수치 재게시')+'</p>'+
  comparisonChart([
    ['건축',[42]],['전기·전자',[23]],['운송 장비',[18]],['소비·일반 제품',[10]],['산업 장비',[7]]
  ],['미국 구리·구리합금 제품 용도 · %'],{digits:0})+
  '<p class="note">미국 용도 분류다. USGS는 재활용 구리가 2025년 미국 구리 공급의 약 30%를 차지한 것으로 추정한다. '+ref('copperUsgs','USGS')+'</p>';

byId('copper-wire-prices').innerHTML=contextFlow([
  ['전기동·스크랩','가공 원료'],['선재','주조·압연'],['전선·케이블','인발·절연'],['설비·건물','전력망·제조·건설']
])+commodityPriceComparison([
  ['국제 구리 지표','달러/톤',13349,14114,'wbquarters',0],
  ['미국 구리 전선·케이블 생산자물가','1986.12=100',meanCommodityPrices([533.808,564.877,577.166]),meanCommodityPrices([578.690,602.663,607.705]),'blsCopperWire',2]
])+'<p class="note">전선·케이블은 미국 생산자 출하가격 지수의 월평균 세 개를 평균했다. 규격, 가공, 계약, 시공비가 붙는 설치 단가는 이 지수에 없다.</p>'+
  '<div class="transmission-links"><a href="#copper-physical">현물 프리미엄·재고 ↗</a><a href="#datacenter-power">전력 설비·데이터센터 ↗</a></div>';
