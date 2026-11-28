'use strict';

byId('copper-market').innerHTML=marketTable(['관측·계약 기준','TC · 달러/건조 정광 톤','RC · 센트/지급대상 구리 파운드'],[
  ['2026년 안토파가스타·중국 제련소 연간 벤치마크 '+ref('copperTerms','Reuters'),'0','0'],
  ['10월 8일 · Platts 중국 도착 현물 평가 '+ref('copperPlatts','S&P Global 기사'),'−235','−23.5'],
  ['10월 9일 · Fastmarkets 아시아·태평양 도착 지수(Fastmarkets 공개 기사) '+ref('copperFastmarkets','Fastmarkets'),'−272.20','미공개'],
  ['10월 16일 보도 · 센티넬라 1만 톤 입찰 '+ref('copperTender','Reuters'),'−310','미공개'],
  ['10월 16일 보도 · 로스펠람브레스 4만 톤 입찰 '+ref('copperTender','Reuters'),'−330달러대','미공개']
],'text-table')+
  '<p class="note">칠레 등 광산의 공급 차질과 중국 제련능력 증설이 겹쳤다. 각 행의 거래·평가 범위가 달라 한 가격의 시계열로 이어 볼 수 없다. '+ref('copperFastmarkets','시장 동향')+'</p>';

const copperPoundsPerTonne=2204.6226;
const concentrateTonnesAt25Pct=1/.25;
const copperChargeScenarios=[
  ['10월 8일 Platts 평가(S&amp;P Global 기사 인용)',-235,-23.5]
];
const copperDollarAmount=value=>num(value,0).replace(/^-/,'−');
byId('copper-charge-example').innerHTML=marketTable(['입력 기준','TC 환산','RC 환산','합계'],copperChargeScenarios.map(([basis,tc,rc])=>{
  const treatment=tc*concentrateTonnesAt25Pct;
  const refining=rc/100*copperPoundsPerTonne;
  return [basis+'<small>TC '+tc+'달러 / RC '+rc+'센트</small>',copperDollarAmount(treatment),copperDollarAmount(refining),'<b>'+copperDollarAmount(treatment+refining)+'</b>'];
}),'text-table')+
  '<p class="note">단위는 전기동 1톤당 미국달러다. 계산 예시는 건조 정광 품위 25%, 회수율과 지급률 100%를 가정한다. 가공비 부담은 같은 조건에서 TC·RC에 선형으로 변한다.</p>'+
  exactData(
    '<p>제련비(Treatment Charge, TC)는 건조 정광 톤당 미국달러, 정련비(Refining Charge, RC)는 계약상 대금을 지급하는 구리 1파운드당 미국센트다. 위 예시는 TC × 4톤, RC ÷ 100 × 2,204.62파운드로 계산했다.</p>'+
    '<p>실제 정광 투입량은 전기동 목표 생산량 ÷ (정광 품위 × 회수율)이다. RC는 정광에 든 구리량에 계약상 지급 조건을 적용해 계산한다. 회수율과 지급률은 별개의 변수다. '+ref('copperPayable','계약 예시')+'</p>',
    '산식과 단위'
  );

byId('copper-margins').innerHTML=marketTable(['구분','수익에 영향을 주는 조건','관측값과 계약 사례'],[
  ['제련소의 원료 조달','정광 매입대금은 지급대상 금속 가치에서 TC·RC 등을 차감해 산정한다. 음수 TC·RC는 다른 조건이 같을 때 매입대금을 높인다.','SMM 기사에 따르면 10월 중국 전기동 생산은 108만 6,700톤으로 전월 대비 3.03%, 전년 대비 0.45% 감소했다. 정비와 원료 부족이 겹쳤고 일부 제련소가 감산했다. 1~10월 누계는 전년 대비 3.15% 증가했다. '+ref('copperChina','SMM')],
  ['황산·금·은 수익','제련소는 황산과 계약상 보유할 수 있는 금·은을 판매한다. 회수율과 판매가격, 광산에 지급하는 비율, 물류비가 순수익을 좌우한다.','S&amp;P Global 기사가 인용한 중국 일부 지역의 10월 초 황산 가격은 약 900위안/톤으로 7월 고점 대비 약 50% 낮았다. La Arena 계약 예시에서 은 지급률은 기준 함량 초과 시 90%, 금은 함량 구간별로 달랐다. '+ref('copperPlatts','황산 가격')+' '+ref('copperPayable','금·은 지급 조건')],
  ['설비·장기 계약','가공 원가가 낮고 부산물 회수율이 높거나, 고정 조건으로 원료를 조달하는 제련소는 손익 충격이 작을 수 있다.','현물 연동 장기 계약은 재가격 시 하락분을 반영할 수 있다. SMM은 기사에서 10월 중국 현물 정광 사용 제련소의 손실을 톤당 약 5,715위안으로 추정했다. '+ref('copperTerms','계약 조건')+' '+ref('copperChina','손익 추정')],
  ['광산의 정광 판매','낮은 TC·RC가 적용되는 판매 물량은 다른 조건이 같을 때 정광 실현가격이 올라간다.','실적 효과의 변수는 실제 출하량, 고정·현물 계약 비중, 금속 지급률, 불순물 감액, 운송 조건이다. '+ref('copperTerms','Reuters')]
],'text-table')+'<div class="transmission-links"><a href="#copper-physical">전기동 현물 프리미엄과 거래소 재고 ↗</a><a href="#zambia-copper">잠비아의 황산 구매비와 생산 차질 ↗</a></div>';

const copperYangshanPrices=[['8월 13일',95],['10월 28일',205]];
byId('copper-yangshan').innerHTML=comparisonChart(copperYangshanPrices.map(([date,price])=>[date,[price]]),
  ['SMM 창고증권 평균 평가(SMM 기사)'],{digits:0})+
  '<p class="note">상하이 보세창고에서 받는 A등급 전기동의 LME 현물가 대비 웃돈이다. 8월 13일에서 10월 28일까지 약 2.2배로 올랐다. '+ref('copperYangshanAug','8월 13일')+' '+ref('copperYangshanOct','10월 28일')+'</p>'+
  '<p class="note">Bloomberg는 10월 28일 200달러를 넘은 Fastmarkets 평가가 2017년 집계 시작 이후 최고였다고 보도했다. '+ref('copperBloomberg','Bloomberg')+'</p>';

const copperLmePrices=[
  ['10월 29일',14560,14350],
  ['11월 4일',14201,14095],
  ['11월 5일',14110,14030]
];
byId('copper-lme-spread').innerHTML=marketTable(['공식 가격','현물','3개월물','현물 − 3개월물'],copperLmePrices.map(([date,cash,threeMonths])=>[
  date,num(cash,0),num(threeMonths,0),'<b>+'+num(cash-threeMonths,0)+'</b>'
]))+
  '<p class="note">현물이 3개월물보다 비싼 상태를 백워데이션이라고 부른다. Bloomberg가 보도한 217달러는 10월 29일 런던 장중 가격차로, 8월 중순 이후 가장 컸다. 같은 날 공식 가격차는 210달러였고 11월 5일에는 80달러로 좁혀졌다. '+ref('copperBloomberg','장중')+' '+ref('copperLmeSeries','공식 가격 이력')+' '+ref('copperCochilco','11월 5일 공식 가격')+'</p>';

const copperExchangeStocks=[
  ['미국 상품거래소(COMEX)<small>11월 4일 마감</small>',732316],
  ['런던금속거래소(LME)<small>11월 5일 개장 · 각국 창고 합계</small>',318675],
  ['상하이선물거래소(SHFE)<small>10월 30일 마감</small>',44612]
];
const copperReportedStocks=copperExchangeStocks.reduce((total,[,tonnes])=>total+tonnes,0);
const copperComexShare=100*copperExchangeStocks[0][1]/copperReportedStocks;
byId('copper-exchange-stocks').innerHTML=comparisonChart(copperExchangeStocks.map(([market,tonnes])=>[market,[tonnes]]),
  ['거래소 집계 재고 · 톤'],{digits:0})+
  '<p class="note">세 거래소 합계는 '+num(copperReportedStocks,0)+'톤이고 COMEX 비중은 '+num(copperComexShare)+'%다. 11월 5일자 보고서에 실린 각 거래소의 최신 관측값을 합산했으며, 관측일이 서로 다르다. 거래소 밖 재고는 이 합계에 포함되지 않는다. '+ref('copperCochilco','Cochilco')+'</p>';

byId('copper-physical-balance').innerHTML=marketTable(['구분','관측과 해석'],[
  ['중국 현물','SMM 기사가 전한 주요 지역 전기동 유통 재고는 10월 29일 6만 6,900톤으로 전년 동기 18만 2,600톤보다 약 63% 적었다. 11월 5일 상하이 내수 현물은 현지 선물 대비 2,100위안/톤의 웃돈이 붙었다. '+ref('copperChinaStock','중국 유통 재고')+' '+ref('copperSpotBloomberg','상하이 내수')],
  ['미국 선적','정제 구리 관세 가능성에 대비한 미국 선적은 다른 지역에서 바로 구할 수 있는 물량을 줄였다. 관세 전망이 바뀌어 미국 가격의 웃돈이 줄어들면, 운임과 계약 조건에 따라 새 화물이 다른 지역으로 향할 수 있다. '+ref('copperUSFlows','Reuters')+' '+ref('copperTariff','관세 검토 조항')],
  ['세계 연간 수급','국제구리연구그룹(ICSG)은 10월 전망에서 세계 정제 구리 공급이 2026년 10만 4,000톤, 2027년 36만 8,000톤 수요를 웃돌 것으로 추정했다. 연간 세계 수급과 중국의 단기 인도 가능 물량은 집계 범위가 다르다. '+ref('copperIcsG','ICSG 전망')],
  ['수급이 완화되는지 볼 지표','중국 제련소 생산, 수입 도착량, 유통 재고, 양산 프리미엄. 미국 재고의 반출 여부는 미국과 LME의 가격차 및 실제 출고량으로 확인한다.']
],'text-table')+
  '<div class="transmission-links"><a href="#copper-smelting">정광 제련비와 중국 생산 ↗</a></div>';

byId('zambia-constraints').innerHTML=marketTable(['구분','회사 공시에서 확인한 내용'],[
  ['투입비','주빌리 메탈스는 FY2026 4분기(2026년 4~6월) 현지 황산 공급이 크게 줄면서 황산 비용이 200% 넘게, 디젤 비용이 90% 올랐다고 9월 14일 공시했다.'],
  ['생산 영향','회사는 잠비아 세이블(Sable) 정련소 생산에 상당한 영향이 있었고, 인근 일부 금속 처리업체는 일시 가동 중단을 겪었다고 밝혔다. 공시상 세이블의 FY2026 연간 전기동 생산은 1,207톤으로 전년 대비 17.5% 증가했다.'],
  ['공급망에서 확인할 항목','황산은 산화구리의 침출에 쓰인다. 이 사례에서 분기 생산 손실량과 잠비아 전체 감산 규모는 확인되지 않았다.']
],'text-table')+
  '<p class="note">'+ref('jubilee26','주빌리 메탈스 9월 14일 공시')+'</p>'+
  '<div class="transmission-links"><a href="#copper-smelting">중국 제련소의 황산 판매 수익 ↗</a><a href="#diesel-cost">경유 가격의 유통 단계 ↗</a></div>';

byId('ai-vc-share').innerHTML=comparisonChart([
  ['AI 지출 상위 1%',[80]],['AI 지출 중앙값 구간',[13]]
],['벤처캐피털(VC) 투자 유치 기업 비율 · %'],{digits:0})+
  '<p class="note">Apollo 수석 이코노미스트 토르스텐 슬록이 10월 22일 공개한 Ramp 표본 비교다. 이 비율은 VC 투자를 유치한 기업 수를 기준으로 한다. 개별 기업의 토큰 청구서 중 투자금이 충당한 몫과 전체 데이터센터 고객 구성은 이 표본으로 알 수 없다. '+ref('apolloAI','Apollo')+' '+ref('rampAI','Ramp 거래 집계')+'</p>';

byId('ai-load-risk').innerHTML=marketTable(['단계','수요 둔화가 전달되는 조건'],[
  ['AI 구매 기업','추가 투자 유치 감소, 고객 매출로 AI 비용 충당 곤란 → 모델 호출 축소 또는 저가 모델 전환.'],
  ['모델 제공사·클라우드','스타트업 지출 감소를 대기업·소비자 수요가 메우지 못하는 경우. 확인 지표는 토큰 사용량과 토큰당 가격이다.'],
  ['데이터센터·전력','서버 사용률 하락 → 실제 전력 사용량·증설 속도 하락. 확인 지표는 전력 예약 용량(MW), 실제 소비량(MWh), 최소구매 약정, 계약기간이다.']
],'text-table')+
  '<p class="note">'+ref('apolloAI','자금 조달 해석')+' '+ref('ieaAI','전력 수요 전망')+'</p>';

byId('whitehaven-cash').innerHTML=marketTable(['9월 분기 지표','공시 수치와 변화'],[
  ['생산·판매','운영 광산의 원탄 생산 1,100만 톤(전분기 대비 +3%), 지분 기준 자체 생산탄 판매 600만 톤(−5%). 전사 평균 실현가 톤당 226호주달러(+2%).'],
  ['순차입금','9월 말 약 14억 호주달러, 전분기 말 대비 약 1억 호주달러 증가.'],
  ['주요 현금 유출','FY26 기말배당·자사주 매입 6,100만 호주달러, BMA 2차 조건부 인수대금 8,400만 호주달러.'],
  ['항만·운전자금','RG Tanna와 포트워라타 석탄터미널(PWCS)의 처리량 감소로 선박 대기가 길어졌고 일부 판매가 12월 분기로 넘어갔다. 석탄 재고 100만 톤 증가와 매출채권 증가로 운전자금 부담이 커졌다. 회사는 12월 분기에 이 부담이 완화될 것으로 봤다.'],
  ['광산 경유 비용','실제 분기 평균 리터당 약 1.38호주달러. FY27 원가 가이던스 중간값에 사용한 평균 가정은 약 1.16호주달러였다.']
],'text-table')+
  '<p class="note">'+ref('whitehaven26','화이트헤이븐 9월 분기 생산보고서')+'</p>'+
  '<div class="transmission-links"><a href="#australia-diesel">호주 도시 경유 도매·소매와 비교 ↗</a></div>';

byId('whitehaven-bma').innerHTML=marketTable(['지급 시점','금액·상태'],[
  ['2026년 7월 2일','2차 연도 조건부 대금 지급 완료. 9월 분기 현금흐름에 8,400만 호주달러로 나온다. 업계지는 미국달러 금액을 5,800만 달러로 보도했다. 회사 자료에서는 이 금액이 확인되지 않는다.'],
  ['2027년 4월','마지막 이연 인수대금 1억 미국달러 지급 예정.'],
  ['2027년 7월 초','마지막 조건부 대금 지급 예정. 2027년 4월 2일 종료되는 3차 연도 첫 두 분기 누적 추정액은 1억 900만 미국달러로 제3자 검증 대상이다. 연간 상한은 3억 5,000만 미국달러다.']
],'text-table')+
  '<p class="note">인수 대상 광산의 3차 연도 상반기 평균 실현가는 톤당 175.31미국달러, 계약 기준가는 134.00미국달러다. 초과분의 35%인 약 14.46미국달러를 대상 판매량 약 751만 톤에 적용한 중간 추정치다. 두 잔여 지급이 끝나면 해당 인수에 대한 BHP 미쓰비시 얼라이언스(BMA) 지급 의무가 종료된다. '+ref('whitehaven26','5쪽 산식')+' '+ref('bhpBMA','인수 조건')+'</p>';

byId('brazil-sugar-data').innerHTML=comparisonChart([
  ['설탕 배분율',[52.5,46.4]]
],['2025/26 작기','2026/27 작기'])+
  '<p class="note">중남부 9월 상반기까지의 작기 누적. 설탕 배분율(Sugar Mix)은 사탕수수에서 회수할 수 있는 당(ATR, Açúcares Totais Recuperáveis) 가운데 설탕 생산에 배정한 비율이다. 같은 기간 사탕수수 1톤당 ATR은 135.0 → 132.8kg(−1.7%)이었다. '+ref('brazilMixB3','FG/Agro 16쪽')+' '+ref('brazilMixUnica','지표 정의')+'</p>'+
  comparisonChart([
    ['설탕 배분율 · 반월',[53.10,50.18]]
  ],['9월 16~30일 · StoneX','10월 1~15일 · DATAGRO'],{digits:2})+
  '<p class="note">중남부 업계 추정치(%). 두 업체 값을 비교하면 직전 반월보다 약 2.9%p 낮다. DATAGRO의 10월 상반기 자체 비교는 전년 같은 반월 대비 +1.9%p, 작기 누적 47.16%(−4.8%p)다. '+ref('sugarStoneXSep','StoneX')+' '+ref('sugarDatagroOct','DATAGRO')+'</p>'+
  marketTable(['10월 상반기 중남부','2026년','전년 동기 대비'],[
    ['사탕수수 처리량','2,730만 톤','−21.3%'],
    ['설탕 생산','187만 톤','−27.1%'],
    ['에탄올 생산','15억 3,000만 리터','−26.1%']
  ],'text-table')+
  '<p class="note">표는 브라질 농업부의 10월 상반기 생산량이다. 강우로 수확과 반입이 늦어지면서 설탕·에탄올 생산이 함께 줄었다. 위 배분율의 출처는 농업부가 아닌 업계 분석이다. '+ref('brazilCropMapa','농업부')+' '+ref('brazilCropOct','10월 생산')+'</p>';

byId('brazil-fuel-switch').innerHTML=marketTable(['단계','전달 조건'],[
  ['설탕 생산 배분','설탕 순수취가가 에탄올보다 높고 수확 여건과 사탕수수 품질이 회복되면, 전환 가능한 제분소에서 설탕에 배정하는 비율이 오를 수 있다. 강우가 길어지면 수확과 처리량이 줄고 사탕수수의 당 농도도 낮아질 수 있다. '+ref('brazilSugarWeather','Reuters')],
  ['에탄올 공급','사탕수수 처리량과 ATR이 일정하면 설탕 배분율 상승은 에탄올에 배정되는 당을 줄인다. 처리량·ATR의 회복이나 옥수수 에탄올 생산·재고가 이를 상쇄할 수 있다.'],
  ['주유소 휘발유','별도 판매되는 함수 에탄올 가격이 휘발유 대비 올라 주행거리당 비용이 높아지면, 두 연료를 사용할 수 있는 차량은 혼합 휘발유(C)로 전환할 수 있다. 8월 1일부터 일반 휘발유는 한시적으로 무수 에탄올 32%를 섞는 E32다. '+ref('brazilAnpE32','ANP')],
  ['석유계 휘발유와 원유','E32 일반 휘발유 판매 100리터 증가에는 산술상 석유계 휘발유 68리터가 들어간다.']
],'text-table');

byId('brazil-mix-watch').innerHTML=marketTable(['추적 지표','판단 기준'],[
  ['① 설탕 배분율·ATR','최신 반월 설탕 배분율은 직전 반월, 전년 같은 반월과 비교한다. 누적 배분율은 전년 같은 시점과 비교한다. ATR(kg/톤)과 사탕수수 처리량으로 배분 변화와 수확 차질을 가른다. '+ref('brazilMixUnica','UNICA 집계')],
  ['② 설탕과 에탄올의 제분소 순수취가','원당 선물과 에탄올 가격을 같은 원료 단위로 환산하고 환율·물류비 등을 반영한다. 10월 9일 S&amp;P Global 기사에 공개된 Platts 평가에서는 원당이 함수 에탄올 환산가보다 파운드당 3.17센트 높았다. 같은 2027년 3월물 원당은 10월 5일 20.73센트에서 11월 5일 18.56센트로 내렸다. '+ref('brazilSugarParity','S&P Global 기사')+' '+ref('brazilSugarOctPrice','10월 5일')+' '+ref('brazilSugarNovPrice','11월 5일')],
  ['③ 함수 에탄올 공급·주유소 판매','사탕수수·옥수수 에탄올별 공급, 함수 에탄올 생산·재고, 무수 에탄올 공급, 주유소 가격, 월간 함수 에탄올·휘발유 C 판매량으로 대체 여부를 판단한다. '+ref('brazilCropMapa','공급')+' '+ref('brazilAnpPrices','소매가')+' '+ref('brazilAnpSales','판매량')]
],'text-table');
