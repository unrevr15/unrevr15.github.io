'use strict';

byId('tanker-values').innerHTML=comparisonChart([
  ['신조 발주<small>2029년 인도</small>',[130]],
  ['신조 리세일<small>즉시 인도</small>',[235]],
  ['5년 중고선',[210]],
  ['10년 중고선',[180]]
],['Poten 평가(Port News 보도)'],{digits:0})+
  '<p class="note">즉시 인도 신조선의 평가액은 2029년 인도 발주가보다 1억 500만 달러(+81%, 반올림된 두 평가액 기준) 높다. Poten은 15년 선령도 신조 발주가를 웃돈다고 봤다. '+ref('poten2026','Poten')+'</p>'+
  exactData(marketTable(['비교 기준','가격을 움직이는 요인'],[
    ['즉시 인도 프리미엄','운항에 바로 투입할 수 있는 배는 인도까지 수년이 걸리는 신조선보다 먼저 운임을 벌 수 있다. 예를 들어 1억 500만 달러를 추가로 지불하고 하루 50만 달러의 증분 순현금을 얻는다면 단순 회수에 210일이 걸린다.'],
    ['매도 유인과 거래 유동성','높은 운임을 확보하려는 선주의 매각 연기, 선도매매의 인도 시점, 매각대금의 주식 포함 여부.'],
    ['2008년과 2026년','Poten은 두 시기 모두 인도 가능한 배의 평가가가 신조 발주가를 넘었다고 본다. 2008년에는 원자재 수요 호황, 2026년에는 위험 항로와 운항 제약이 주요 배경이었다.']
  ],'text-table'),'인도 시점과 2008년 비교')+
  '<div class="transmission-links"><a href="#shipping">VLCC 운임·일일 환산수익 ↗</a><a href="#fleet">제재 완화와 선복 ↗</a></div>';

byId('shuttle-flows').innerHTML=comparisonChart([
  ['시노코르 소유 선박',[105.6]],['사우디 Bahri·쿠웨이트 KOTC·UAE ADNOC 소유 선박 합계',[97.3]]
],['2026년 9월'])+
  '<p class="note">Bloomberg의 선박 추적 분석은 선박 소유자 기준 집계다. 실제 용선·운항 주체별, 산유국별 선적량은 이 집계로 알 수 없다. '+ref('hormuzowners','Bloomberg')+'</p>'+
  '<div class="transmission-reading">호르무즈 셔틀과 환적은 통항 가능한 선박에 집중된다. 선박이 부족하면 원유가 걸프 내 저장시설에 쌓일 수 있고, 왕복·대기 시간이 길어지면 같은 선대로 나를 수 있는 양이 줄어든다.</div>'+
  '<div class="transmission-links"><a href="#escort-watch">통항·전쟁보험 ↗</a><a href="#crude-transmission">걸프 수출과 원유 도착비 ↗</a></div>';

byId('upstream-mechanism').innerHTML=marketTable(['관측할 시장','도착비 상승과 정유 투입 감소가 이어질 경우','확인 지표'],[
  ['정제품','디젤 생산 감소 → 다른 지역 수출·재고가 메우지 못하면 현물가·크랙 상승.','<a href="#diesel-transmission">정유 투입·디젤 현물 ↗</a>'],
  ['원유 생산자','정유사 구매 감소 → 선적지 가격 하락 압력.','<a href="#crude-freight-bridge">항로별 운임 ↗</a> · <a href="#brent-market">FOB·CIF ↗</a>'],
  ['신규 투자','실현가격·현금흐름 → 투자·시추. 장기 프로젝트 투자에는 기존 유전 감산과 매장량 대체도 반영되며, 승인·개발·첫 생산 사이에 시차가 있다.','<a href="#slb-activity">심해 승인·서비스 전망 ↗</a>']
],'text-table')+'<p class="note">'+ref('ieaoil','IEA')+' '+ref('slbcall','SLB')+'</p>';

const slbSales=[8.928,8.972,9.449];
byId('slb-activity').innerHTML=comparisonChart([['SLB 매출<small>십억 달러</small>',slbSales]],['2025년 3분기','2026년 2분기','2026년 3분기'],{digits:2})+
  '<p class="note">보고 매출은 3분기 전분기 대비 약 5% 증가했다. '+ref('slbq3','SLB 실적')+'</p>'+
  marketTable(['경영진 전망','조건과 범위'],[
    ['2026년 심해 FID 전년 대비 30% 초과 증가','SLB 예상. 세계 심해 프로젝트의 최종투자결정 건수 기준이며 프로젝트별 승인·집행 실적이 아니다.'],
    ['2027년 유전 서비스·장비 시장 한 자릿수 중반대 성장','중동 활동이 2026년 하반기 수준을 유지하고 분쟁이 크게 확대되지 않는다는 가정이다.']
  ],'text-table')+'<p class="note">경영진이 언급한 탐사 지역은 브라질·가이아나·수리남·나미비아 등이다. 배럴당 65~70달러는 질의응답에서 애널리스트가 제시한 가정이다. '+ref('slbcall','10월 23일 회의록')+'</p>';

byId('us-oil-policy').innerHTML=contextFlow([
  ['10월 22일 결정','국방생산법 303조 적용'],
  ['개별 사업 집행','자금·계약·인허가 확인'],
  ['실물 공급','재가동·증설·첫 출하 확인']
])+'<p class="note">백악관 결정은 국내 석유 생산·정제·물류 능력을 대상으로 한다. 밴스 부통령은 텍사스 Delek 정유소 증설을 거론했다. 대통령 결정문에는 개별 지원 대상과 물량이 명시되지 않았다. '+ref('dpa2026','백악관')+' '+ref('dpareuters','Reuters')+'</p>'+
  '<p class="note">캘리포니아 Sable의 Santa Ynez 유전·송유관에 대한 에너지부 재가동 지시는 위 백악관 결정과 다른 조치다. '+ref('sableDOE','에너지부')+'</p>';

byId('refining-capacity-history').innerHTML=exactData(
  '<div class="detail-grid"><div>'+comparisonChart([['세계 정유 설계능력<small>백만 배럴/일</small>',[78.96,103.76]]],['1980년','2025년'],{digits:2})+'</div><div>'+
  comparisonChart([['세계 인구 1,000명당 설계능력<small>배럴/일</small>',[17.75,12.60]]],['1980년','2025년'],{digits:2})+'</div></div>'+
  '<p class="note">Energy Institute 설계능력과 UN 세계인구전망의 연중 인구 약 44.48억 명·82.32억 명으로 계산했다. 총 능력은 31.4% 증가했지만 인구 1,000명당 약 29.0% 감소했다. 2024년 총 능력은 104.03백만 배럴/일이다. '+ref('refineryhistory','정유능력')+' '+ref('worldPopulation','세계 인구')+'</p>',
  '세계 정제능력과 인구당 수치'
);

byId('qatar-spa-volume').innerHTML=comparisonChart([
  ['사빈패스<small>2.0 중 1.0은 증설 FID 조건</small>',[2]],
  ['코퍼스 크리스티',[2]]
],['발표 계약물량'])+
  '<p class="note">총 연 400만 톤. 조건부 연 100만 톤은 사빈패스 1단계 증설의 최종투자결정(FID)에 달려 있다. '+ref('chenierespa','Cheniere')+'</p>'+
  '<div class="transmission-links"><a href="#gas-map" data-region="world" data-site="us-kr">미국 걸프발 항로 ↗</a><a href="#lng-voyages">아시아 항해일·용선비 ↗</a></div>';
wireMapLinks('qatar-spa-volume');

byId('qatar-spa-terms').innerHTML=marketTable(['항목','공시 조건과 공급망 영향'],[
  ['가격과 인도','미국 Henry Hub 가스 지표 + 고정 수수료. 본선인도(FOB)로, 매수자가 선적 이후 해상운송을 주선한다.'],
  ['계약 기간','2030년대 초 인도를 시작해 2054년 말까지 공급할 예정이다.'],
  ['공급원 다변화','미국산 화물을 조달하면 호르무즈 밖에서도 계약 물량을 확보할 수 있다. 최근의 카타르산 선적 감소를 대체하는 즉시 인도 물량은 아니다.']
],'text-table')+'<p class="note">'+ref('chenierespa','계약 원문')+' · <a href="#lng-transmission">아시아 도착 실적 ↗</a></p>'+
  '<p class="note">McKinsey의 향후 15년간 연 1조 달러 추산은 아시아 전력망·발전·연료 조달을 포함한 에너지 투자 규모로, LNG 액화나 이 장기계약의 금액이 아니다. '+ref('asiaEnergyInvestment','McKinsey')+'</p>';

byId('coal-export-shift').innerHTML=comparisonChart([
  ['인도네시아',[517,495]],['호주',[209,216]],['러시아',[130,132]]
],['2025년 집계','2026년 전망'],{digits:0})+
  '<p class="note">철강용 원료탄을 제외한 연료탄 수출이다. 세계 해상 연료탄 수요는 약 10억 7,400만 톤에서 10억 6,200만 톤으로 줄 전망이다. '+ref('ieacoal','IEA')+'</p>';

byId('power-fuel-path').innerHTML=marketTable(['연료','조달과 발전'],[
  ['해상 연료탄','인도네시아·호주 등의 탄광 → 선적항·벌크선 → 수입국 발전소. IEA는 중국 해상 연료탄 수입이 3억 2,500만→3억 1,000만 톤으로 감소할 것으로 전망한다.'],
  ['갈탄','독일 사례의 갈탄은 해상 연료탄과 공급 구조가 다르다. 발전비 변수는 탄광·발전소 운영비와 탄소배출권이다.'],
  ['가스','가스관 또는 LNG 인수기지 → 저장·배관 → 발전소. 가스 가격과 탄소비가 석탄과의 발전비 차이를 바꾼다.']
],'text-table')+'<div class="transmission-links"><a href="#gas-map">가스·LNG 지도 ↗</a><a href="#dispatch">연료별 발전비 계산 ↗</a><a href="#germany-power">독일 발전량 ↗</a></div>';

const powerForm=byId('power-spread-form');
function renderPowerSpread() {
  const output=byId('power-spread-result');
  if(!powerForm.checkValidity()) {
    output.textContent='네 항목에 표시 범위 안의 가격을 입력하면 계산된다.';
    return;
  }
  const [power,gas,coal,carbon]=Array.from(powerForm.querySelectorAll('input'),input=>input.valueAsNumber);
  const costs=[
    ['가스',gas/.55,carbon*.37],
    ['석탄',coal/.40,carbon*.85]
  ];
  output.innerHTML=comparisonChart(costs.map(([name,fuel,emissions])=>[name,[power-fuel-emissions]]),
    ['전력가 − 연료비 − 탄소비 · 유로/MWh'],{signed:true,showSign:true})+
    marketTable(['발전원','연료비','탄소비','연료·탄소 차감 후'],costs.map(([name,fuel,emissions])=>[
      name,num(fuel),num(emissions),num(power-fuel-emissions)
    ]));
}
powerForm.addEventListener('input',renderPowerSpread);
powerForm.addEventListener('submit',event=>event.preventDefault());
renderPowerSpread();

const germanGeneration=[
  ['육상풍력',24.9,16.8],['해상풍력',5.9,4],['갈탄',15.4,1.5],['경질탄',6.4,39.3],['천연가스',8.9,-8.1]
];
byId('germany-generation').innerHTML=comparisonChart(germanGeneration.map(([name,twh,pct])=>[
  name+'<small>2026년 3분기 '+num(twh)+' TWh</small>',[pct]
]),['2026년 3분기 전년 대비 · %'],{signed:true,showSign:true})+
  '<p class="note">독일 계통 송전량 기준. 3분기 전체 계통 부하는 110.1TWh였다. 분기 평균 가스 도매가가 64.10유로/MWh로 오르면서 가스가 석탄보다 뒤에서 가동되는 시간이 늘었다고 SMARD는 분석했다. '+ref('smardq3','SMARD')+'</p>';

byId('germany-spreads').innerHTML=comparisonChart([['독일 도매 전력가',[82.76,125.51]]],['2025년 3분기','2026년 3분기'],{digits:2})+
  '<p class="note">하루 전 시장 분기 평균 · 유로/MWh 전력. '+ref('smardq3','SMARD')+'</p>'+
  marketTable(['별도 관측','시점과 기준'],[
    ['저녁 가스발전 14 GW','10월 21일 저녁 피크. 기온 하락과 풍력 약화 속 전력 수요는 약 60 GW에 근접했다. '+ref('degasevent','ENTSO-E 인용')],
    ['전력 246.29유로/MWh','10월 22일 보도의 저녁 19~20시 장중 거래 가격. 분기 평균과 다른 시장·시간이다. '+ref('degasevent','EPEX 인용')],
    ['갈탄 추정 마진 최대 64유로/MWh','10월 보도에서 인용한 Energy Aspects 지표. 발전소별 회계상 수익이 아니다. '+ref('delignite','보도')]
  ],'text-table');

byId('italy-price-context').innerHTML=comparisonChart([['이탈리아',[116]],['EU 평균',[85]]],['2025년 평균'],{digits:0})+
  '<p class="note">EU 집행위원회 국가 보고서. 2024년 이탈리아에서는 가스가 전체 시간의 61.4%에서 전력가격을 결정했다. '+ref('itcountry','EU')+'</p>';

byId('eu-power-policy').innerHTML=marketTable(['비교','이탈리아 · 2026년 협의','스페인·포르투갈 · 2022년'],[
  ['설계','FT는 발전용 가스 시장가격과 59유로/MWh 기준비용 사이 차액 보상을 보도했다. 이탈리아 에너지 장관은 11월 4일 내각 상정 계획을 밝혔다.','가스발전 입찰에 쓰는 연료비 기준을 낮추고 발전사에 차액을 보상했다.'],
  ['검증할 효과','Reuters에 따르면 전기요금에 붙는 시스템 부담금 인상이 보상 재원으로 거론됐다. 발전사 입찰가가 낮아져도 가계·기업 청구서에는 보상 재원과 계약 구조가 함께 반영된다.','2024년 연구는 규제요금 적용 소비자의 전기요금이 정책 미도입 대비 평균 20~28% 낮았다고 추정했다. 2026년 연구는 발전용 가스 수요 증가를 이베리아 +25%, EU 전체 +3.2%로 추정했다. 연구는 TTF 가격에 대한 직접 영향의 증거를 찾지 못했다.']
],'text-table')+'<p class="note">'+ref('itpower','이탈리아 보도')+' '+ref('itnov','11월 4일')+' '+ref('iberiapaper','소비자 요금 연구')+' '+ref('iberiagas','가스 수요 연구')+'</p>'+
  '<div class="transmission-links"><a href="#gas-storage">EU 저장량 ↗</a><a href="#lng-price-linkage">가스·LNG 가격 ↗</a></div>';

byId('us-power-comparison').innerHTML=comparisonChart([
  ['가정용',[17.57,18.16]],['상업용',[13.87,14.47]],['산업용',[8.98,9.64]]
],['2025년 8월','2026년 8월'],{digits:2})+
  '<p class="note">미국 에너지정보청(EIA)의 전국 최종 판매단가다. '+ref('usepm','EIA')+'</p>'+
  exactData(marketTable(['집계 기준','2025년 8월','2026년 8월','전년 동월비'],[
    ['EIA 전국 가정용','17.57','18.16','+3.4%'],
    ['BLS 미국 도시 평균','19.0','19.6','+3.2%']
  ])+'<p class="note">단위는 센트/kWh다. 19.6은 미국 노동통계국(BLS)의 도시 평균 전기 가격이다. 전국 가정용 최종 판매단가와 조사 범위가 다르다. '+ref('blsElectricity','BLS·FRED')+'</p>'+
    '<p class="note">Bloomberg가 보도한 +267%는 데이터센터 인근 일부 전력망 가격 노드의 2020년 4월 대비 2025년 4월 도매가 상승률이다. 지역 최대 사례이며 데이터센터 수요의 단독 효과는 이 비교로 산출할 수 없다. '+ref('bloombergPowerNodes','Bloomberg')+' '+ref('powerNodesScope','방법 검증')+' '+ref('usGridEffect','댈러스 연은 연구')+'</p>',
    '도시 평균 19.6센트와 지역 도매가 +267%의 집계 기준');

byId('china-cost-gap').innerHTML=comparisonChart([
  ['연료·동력 구입가',[13.6]],['원재료 공업 출하가',[9.4]],['가공 공업 출하가',[3.4]],['소비재 출하가',[-.1]]
],['2026년 9월 전년 대비 · %'],{signed:true,showSign:true})+
  '<p class="note">연료비가 올라도 소비재 출하가가 함께 오르지 않은 사례다. 지수 구성과 기업별 원료 비중이 달라 이 차이를 기업 이익률 변화로 계산할 수 없다. '+ref('nbscost','중국 국가통계국')+'</p>'+
  exactData(comparisonChart([['집적회로 수출 개수',[1]],['집적회로 수출 금액',[136]]],['2026년 9월 전년 대비 · %'],{digits:0,showSign:true})+
    '<p class="note">중국 해관 수치 인용으로 9월 327억 개, 약 450억 미국달러다. '+ref('cnChipsSept','9월 통관 보도')+' '+ref('cnChipsTrade','수출입 지표')+'</p>',
    '중국 반도체 수출의 수량·금액');

byId('industrial-exposure').innerHTML=marketTable(['지역','관측·정책','가격으로 이어지는 경로'],[
  ['일본','2023회계연도 중동산 원유 비중 94.7%. 2026년 10월 내각은 호르무즈 밖 조달비 보조·보험·배관 금융 법안을 채택했다. '+ref('japanoil','METI')+' '+ref('japanTanker','국토교통성')+' '+ref('japanbill','지지통신'),'우회 조달비·엔화 → 수입 단가.'],
  ['호주','10월 21일 5대 도시 경유 소매 평균 A$2.766/L. 2월 20일보다 A$1.00/L 높았다. '+ref('acccdiesel','ACCC'),'국제 싱가포르 경유 지표·환율 → 도매 → 소매. 화물·농업·광업·건설에는 간접 비용이 생기고, 연료세 공제가 업종별 부담을 바꾼다. '+ref('ausanalysis','업계 분석')],
  ['브라질','9월 Reuters는 수입 경유와 Petrobras 내수 판매가의 격차를 보도했다. 10월 물가 사전지표는 전월 대비 +0.32%. Petrobras의 경유 주문은 10월 6.5억 리터에서 11월 계획 6억 리터(약 12.5만 배럴/일)로 바뀌었다. '+ref('brazilimport','수입 채산성')+' '+ref('brazilipca','IBGE')+' '+ref('petrobrasDieselNov','Reuters'),'수입 채산성 하락 → 민간 조달 감소. 확인 지표는 주문과 실제 하역, 정유소 판매가와 소비자 판매가다.'],
  ['유럽','전력시장·가스 저장과 제조업 비용이 연결된다.','<a href="#germany-power">독일 전력 도매·발전 ↗</a> · <a href="#industry-prices">산업 전기·가스 요금 ↗</a>']
],'text-table');

byId('australia-diesel').innerHTML=comparisonChart([
  ['터미널 도매가',[1.614,3.083,2.606]],['소매가',[1.766,3.224,2.766]]
],['2월 20일','3월 31일','10월 21일'],{digits:3})+
  '<p class="note">5대 도시 도매가의 2월·3월 값은 ACCC 표에 나온 도시별 수치를 단순 평균했다. 3월 31일은 연료 소비세 인하 직전이다. '+ref('acccdiesel','ACCC 표 4·5')+'</p>';

byId('diesel-reading').insertAdjacentHTML('beforeend',
  '<div class="transmission-links"><a href="#upstream-investment">정유 가동과 산유업체 투자 ↗</a><a href="#industry-transmission">지역별 비용과 가격 전가 ↗</a></div>');

byId('fleet-note').insertAdjacentHTML('beforeend',
  '<div class="transmission-links"><a href="#tanker-assets">즉시 인도 선박 평가와 호르무즈 운송량 ↗</a></div>');
