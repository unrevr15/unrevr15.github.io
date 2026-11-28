'use strict';

const quarterSupplyRows=[
  ['브렌트 원유','달러/배럴',...crudeQuarterPrices[0][1].slice(1),'crude-quotes','wbquarters'],
  ['미국 걸프 디젤 현물','달러/배럴',...productQuarterPrices[0][1].slice(1),'diesel-wholesale-bridge','usd'],
  ['미국 디젤 크랙','달러/배럴',...productQuarterCracks[0][1].slice(1),'quarter-cracks','wti'],
  ['미국 상업용 원유','백만 배럴',408.359,427.320,'oil-balance','eia'],
  ['미국 전략비축 원유','백만 배럴',325.655,283.767,'stock-programs','spr'],
  ['미국 중간유분 재고','백만 배럴',108.599,105.180,'product-stocks','distStocks'],
  ['유럽 천연가스','달러/MMBtu',...gasQuarterPrices[0][1].slice(1),'gas-market','wbquarters']
];
byId('quarter-supply-data').innerHTML=
  '<div class="detail-grid"><div>'+comparisonChart(quarterSupplyRows.map(([name,,q2,q3,target])=>[
    '<a href="#'+target+'">'+name+'</a>',[(q3/q2-1)*100]
  ]),['3분기 전분기비 · %'],{signed:true,showSign:true})+'</div><div class="table-scroll">'+
  marketTable(['지표','단위','2분기','3분기'],[
    ...quarterSupplyRows.map(([name,unit,q2,q3,,source])=>[name+' '+ref(source),unit,num(q2,2),num(q3,2)]),
    ['미국 정유 가동률 '+ref('refUtil4w','EIA'),'4주 평균 %','96.2','95.3'],
    ['세계 원유 정유 투입 '+ref('globalruns','EIA'),'전분기비 백만 배럴/일','−4.8','+1.8']
  ])+'</div></div>'+
  '<p class="note">가격은 분기 평균, 미국 재고·가동률은 각 분기 마지막 공표 주(6월 26일·9월 25일)다. 상업 원유는 SPR와 유전 현장 재고를 제외한다. 세계 정유 투입은 절대량이 아닌 각 분기의 전분기 대비 변화다. '+ref('eia','EIA')+' '+ref('wbquarters','세계은행')+'</p>'+
  '<div class="transmission-links"><a href="#monthly-oil-supply">같은 월의 걸프 수송·운임·현물 ↗</a><a href="#diesel-transmission">디젤 도매·최종 판매가 ↗</a><a href="#lng-netback">LNG 목적지별 선적 ↗</a><a href="#source-list">출처 목록 ↗</a></div>';

byId('monthly-oil-supply-data').innerHTML=marketTable(['2026년 관측 지표','단위','8월','9월'],[
  ['걸프 원유 수출','백만 배럴/일','9.50','13.90'],
  ['호르무즈 통과 석유','백만 배럴/일','7.20','10.90'],
  ['우회 원유 수출','백만 배럴/일','4.63','5.60'],
  ['미국 걸프 → 동북아 원유선 운임','달러/톤','79.21','156.19'],
  ['Dated Brent','달러/배럴','90.72','116.89'],
  ['미국 중간유분 재고','백만 배럴, 마지막 주','104.19','105.18']
])+ '<p class="note">수출과 통항은 IEA 월평균 추정, 운임은 S&amp;P Global 기사에 공개된 용선 평가, 미국 중간유분은 EIA 8월 28일·9월 25일 기말값이다. 걸프 수출과 해협 통과는 집계 범위가 겹칠 수 있다. '+ref('ieaoil','유량·현물')+' '+ref('ceramargins','운임')+' '+ref('distStocks','중간유분')+'</p>'+
  exactData('<div class="detail-grid"><div>'+comparisonChart([
    ['세계 석유 공급',[99.8,102.3]]
  ],['2026년 8월 추정','9월 추정'],{digits:1})+'</div><div>'+comparisonChart([
    ['세계 정유 처리량',[81.3,84.6]]
  ],['10월 전망','연말 전망'],{digits:1})+'</div></div>'+
  '<p class="note">백만 배럴/일. 세계 석유 공급은 원유 이외 액체연료를 포함한다. 8월 공급은 9월과 월간 변화로 역산했다. <a href="#iea-context">연간 수급·정유·재고 전망 표 ↗</a> '+ref('ieaoil','IEA 10월 보고서')+'</p>',
  '세계 공급·정유 처리·수요 전망');

const brentDateLabels=['11월 3일','11월 4일'];
const brentPrompt=[103.60,94.62];
const brentFar=[84.88,79.12];
byId('brent-curve-data').innerHTML='<div class="detail-grid"><div>'+
  comparisonChart([
    ['ICE 2027년 1월물',brentPrompt],['ICE 2027년 12월물',brentFar]
  ],brentDateLabels,{digits:2})+
  '<p class="note">두 계열 모두 ICE 만기별 결제값이다. '+ref('nov4oil','근월 종가')+' '+ref('brentDec27','원월 결제')+'</p></div><div class="table-scroll">'+
  marketTable(['달러/배럴','11월 3일','11월 4일','일간 변화'],[
    ['근월 − 원월',num(brentPrompt[0]-brentFar[0],2),num(brentPrompt[1]-brentFar[1],2),'−3.22'],
    ['ICE DFL 계약 결제','미확인','미확인','—']
  ])+
  '<p class="note">DFL은 계약 사양만 공개 확인됐고 11월 3~4일 결제값은 미확인이다. 이날 원월물은 5.76달러 내려 근월보다 하락 폭이 작았다. '+ref('icedfl','DFL 계약 사양')+'</p></div></div>'+
  exactData(comparisonChart([
    ['Brent 2027년 12월물',[82.81,88.16,87.62,79.12]]
  ],['10월 7일','10월 28일','10월 29일','11월 4일'],{digits:2})+
    '<p class="note">달러/배럴. DTN이 재게시한 NYMEX BZZ27 일일 결제다. CME는 이 계약의 결제에 같은 만기의 ICE Brent 결제값을 적용한다. 10월 7일에서 28일까지 5.35달러 상승했고, 11월 4일까지 비교하면 3.69달러 하락했다. '+ref('brentDec27History','만기별 이력')+' '+ref('cmeBrentSettlement','CME 결제 규칙')+'</p>',
    '동일 2027년 12월물의 10~11월 결제값')+
  '<div class="transmission-links"><a href="#brent-market">Dated 산정·CFD·DFL ↗</a><a href="#futures-physical">11월 5일까지의 근월물 ↗</a><a href="#producer-netback">원유 실현가격과 생산 투자 ↗</a></div>'+
  exactData(marketTable(['중동 원유 지표','확인된 값과 의미'],[
    ['Dubai 11월 − 12월 선도','11월 3일 무렵 약 −2달러/배럴. '+ref('dubaiCurve','Bloomberg 인용')],
    ['Oman − Dubai · General Index','시장 보도 인용으로 9월 중순 약 +30달러/배럴에서 10월 21일 보도 주간 +4.22달러로 좁혀졌다. '+ref('omanGx','General Index 인용')],
    ['Arab Light 아시아 공식판매가','오만·두바이 평균 대비 10월 선적 −2 → 11월 선적 −5달러/배럴. 사우디가 정한 판매가 차등이다. '+ref('arabLightOsp','Reuters')]
  ],'text-table'),'오만·두바이 실물 차이, 두바이 만기 차이, 사우디 판매가');

byId('td3c-basis-data').innerHTML=marketTable(['가격·계약','어디에 쓰이나','읽을 때 구분할 범위'],[
  ['실제 용선 체결','선박 1척의 항차 또는 기간 계약','운항일·기항지·안전 조건·보험 부담은 계약에서 정한다. 공개 법정 사례의 DHT Puma 약 52,000달러/일은 한 척의 고정 계약이다. '+ref('td3cbloom','법정 보도')],
  ['TD3C·왕복 일일 환산수익','중동 걸프 → 중국 VLCC 항로 평가','월드스케일, 달러/톤, 달러/일의 단위가 다르다. 거래가 적을 때 중개인 평가로 공표를 이어갈 수 있는지가 본안 쟁점이다. '+ref('td3cbaltic','Baltic')],
  ['선도운임계약(FFA)','미래 기간 운임의 현금 정산','해당 지수·정산월·중단 시 대체 조항. Hunter 용선료 중재는 Baltic에 대한 선언적 청구와 다른 절차다. '+ref('td3cdocket','사건 기록')],
  ['전쟁보험과 화주 도착비','보험 할증과 항해 비용','선체 가치 기준 보험료는 계약상 부담자를 가려 화물 단위로 환산한다. 지수 환산수익과 배럴당 도착비는 단위가 달라 그대로 더할 수 없다. '+ref('warpremium','보험 평가')+' '+ref('ieafreight','화주 비용')]
],'text-table')+
  '<div class="transmission-links"><a href="#td3c-case">법원 절차 ↗</a><a href="#shipping">운임 시계열 ↗</a><a href="#fleet">섀도우 플릿·보험 ↗</a></div>';

byId('stock-programs-data').innerHTML='<div class="detail-grid"><div class="table-scroll">'+marketTable(['발표·조치','백만 배럴','확인 상태'],[
  ['3월 IEA 회원국 공동 조치','400','초기 발표 규모. IEA는 10월 15일 약 330 방출과 약 100의 잔여 집행을 각각 보고했다. 발표별 집계와 반올림을 그대로 표시했다. '+ref('release','IEA')],
  ['10월 2일 G7','100','3월 공동 조치의 이행과 연결된 약속이며 3월 물량에 추가되는 물량이 아니다. '+ref('g7Remainder','공동 조치 범위')],
  ['10월 29일 유럽 11개국','42.6','2027년 1월 말까지 발표한 석유 물량, 그중 경유 20.5. '+ref('europeReserveOct','공동선언')],
  ['11월 프랑스','10','SAGESS 경유를 11월 중 공급하라는 집행 결정. 리터당 12~18유로센트는 정부의 예상 효과다. 유럽 물량과 중복될 수 있다. '+ref('frDieselRelease','재무부')]
],'text-table')+'</div><div>'+
  comparisonChart([['고유황(sour)',[186.2,185.8]],['저유황(sweet)',[96.4,96.4]]],['직전 공표 · 역산','10월 30일'],{digits:1})+
  '<p class="note">백만 배럴. DOE의 10월 30일 공표는 고유황 185.8(직전 대비 −0.4), 저유황 96.4(보합)다. EIA 총량은 10월 23일 282.583 → 30일 282.184다. DOE 원표 이미지는 최신 주로 교체되며 시설별 요약 페이지에는 10월 16일자로 별도 스냅샷이 표시돼 있다. '+ref('sprGradesOct30','DOE 주간 원표')+' '+ref('spr','EIA 주간 총량')+' '+ref('sprGrades','DOE 시설별')+'</p></div></div>'+
  '<p class="note">10월 14일 미국 API 발표 재게시값은 −1,112만 배럴, 예상 +190만, 이전 −209만 배럴이다. 같은 10월 9일 종료 주간의 EIA 상업용 원유 감소 약 856만 배럴과 기관이 다르다. '+ref('api1014','API 인용')+' '+ref('eia','EIA 주간')+'</p>';

byId('producer-netback-data').innerHTML='<div class="detail-grid"><div>'+
  comparisonChart([['Diamondback 원유 실현가<small>헤지 전 · 달러/배럴</small>',[64.60,96.82,87.30]]],['2025년 3분기','2026년 2분기','2026년 3분기'],{digits:2})+
  '<p class="note">2026년 3분기 헤지 후 85.89달러/배럴이다. 같은 분기 원유 생산은 52.5만 배럴/일, 혼합 제품 현금 운영비는 10.91달러/boe다. 원유 배럴과 원유환산배럴(boe)은 분모가 달라 실현가에서 운영비를 그대로 뺄 수 없다. '+ref('diamondSec','SEC 공시')+'</p></div><div>'+
  comparisonChart([['영업 현금흐름',[2.6]],['현금 자본지출',[1.0]],['자사주 매입',[.251]]],['2026년 3분기 · 십억 달러'],{digits:2})+
  '<p class="note">항목별 현금 규모다. 자본지출의 유지·성장 구분 기준은 미확인이다. '+ref('diamondSec','SEC 공시')+' '+ref('diamondq3','주주 서한')+'</p></div></div>'+
  exactData(marketTable(['퍼미안 시추·완결','확인 기준'],[
    ['활성 회전식 시추 리그','10월 30일 종료 주간 퍼미안 272기, 미국 전체 603기. '+ref('permianRigs','Baker Hughes 집계')],
    ['Diamondback 완결 계획','11월 2일 주주서한은 2027년 동시 파쇄용 전기 장비팀 5개 운용을 계획했다. 유정 완결팀은 시추 리그 수에 들어가지 않는다. '+ref('diamondq3','회사 서한')]
  ],'text-table'),'퍼미안 활성 리그와 완결 계획');

const refineryModelForm=byId('refinery-run-form');
const refineryProductShares=[.44,.32,.12,.12];
function renderRefineryModel() {
  const output=byId('refinery-run-model-data');
  if(!refineryModelForm.checkValidity()) {
    output.textContent='입력 범위 안의 수치를 모두 입력하면 계산된다.';
    return;
  }
  const month=byId('refinery-model-month').value==='sep'?8:7;
  const freightColumn=month===8?2:1;
  const [basis,risk,opex]=Array.from(refineryModelForm.querySelectorAll('input'),input=>input.valueAsNumber);
  const crude=market2026.wti[month]+basis;
  const basket=[market2026.gasoline[month]*42,market2026.diesel[month]*42,jetMonthly[month]*42,crude];
  const revenue=basket.reduce((sum,price,i)=>sum+price*refineryProductShares[i],0);
  const regions=[['미국 걸프 기준',0],...regionalFreightRows.map(row=>[row[0],row[freightColumn]/7.33+risk])];
  const marginBeforeFreight=revenue-crude-opex;
  const costHeadroom=marginBeforeFreight>=0
    ? '변동비를 차감한 뒤 추가 운송·보험비를 배럴당 '+num(marginBeforeFreight,2)+'달러까지 감당할 수 있다.'
    : '운임을 0으로 잡아도 변동비 차감 후 배럴당 '+num(-marginBeforeFreight,2)+'달러 적자다.';
  output.innerHTML=comparisonChart(regions.map(([region,routeCost])=>[region,[marginBeforeFreight-routeCost]]),
    ['변동비 차감 후 · 달러/원유 배럴'],{digits:2,signed:true,showSign:true})+
    '<div class="table-scroll">'+marketTable(['정제 지역','제품 매출','도착 원유비','변동비','차감 후'],regions.map(([region,routeCost])=>[
      region,num(revenue,2),num(crude+routeCost,2),num(opex,2),num(marginBeforeFreight-routeCost,2)
    ]))+'</div>'+
    '<p class="note">모든 지역에 같은 미국 걸프 제품 가격과 수율 가정(휘발유 44%, 중간유분 32%, 항공유 12%, 기타 12%)을 적용한다. 기타는 원유와 같은 단가로 가정했다. 수입 항로 운임은 관측 달러/톤을 7.33배럴/톤으로 환산한 뒤 입력한 추가비를 더한다. 미국 기준 해상 운임은 0이다. 설비별 수율·원유·현지 제품값과 고정비는 넣지 않아 회사 실적과 다르다. '+ref('ceramargins','운임')+' '+ref('eiaYieldNov','수율 자료')+'</p>'+
    '<p class="note">'+costHeadroom+' 최소가동률·정지 비용·이미 계약한 원유와 제품 판매가는 넣지 않았다. '+ref('sinopecQ4','Sinopec 사례')+'</p>';
}
refineryModelForm.addEventListener('input',renderRefineryModel);
refineryModelForm.addEventListener('submit',event=>event.preventDefault());
renderRefineryModel();

byId('refinery-run-model-data').insertAdjacentHTML('afterend',
  exactData(marketTable(['중국 조달·정유','공개 사례'],[
    ['육상 원유 재고','Kpler는 공개 블로그에서 9월 육상 원유 재고가 약 160만 배럴/일 속도로 줄었고, 10월 14일 보고 기준 저장 원유 11.24억 배럴이 정유 원유 소요 약 80일분이라고 추정했다. 감소는 주로 상업재고로 분석했다. '+ref('kplerChinaDraw','Kpler')],
    ['Sinopec 원유 투입·비용','1~9월 원유 투입은 하루 1,060만→990만 배럴로 전년 동기 대비 감소했다. 경영진은 원유·운송비 상승이 4분기 정유 채산성을 압박할 수 있다고 설명했다. 개별 공장의 감산이나 손실은 미확인이다. '+ref('sinopecQ4','S&P Global')]
  ],'text-table'),'중국 육상 원유 재고와 Sinopec 원유 투입·비용'));

byId('refinery-damage-data').innerHTML=marketTable(['시설·시점','확인된 능력·피해','재가동·출하'],[
  ['<a href="#products-map" data-region="russia" data-site="moscow">모스크바 ↗</a> · 6월','25만 배럴/일 설치 능력. IEA는 피격 후 가동 중단을 전했다.','9월 IEA 보고에서 2027년 초까지 중단 전망. 실제 재가동일은 미확인. '+ref('russia','IEA')],
  ['<a href="#products-map" data-region="russia" data-site="novosam">노보쿠이비셰프스크 ↗</a> · 10월 30일','피격 보도. 가동 정지 공정 및 시간은 미확인.','세 곳 합계 설계능력은 러시아 전체의 약 10%이며 출하 손실은 미확인이다. '+ref('ruTargetCapacity','OSINT 인용')],
  ['<a href="#products-map" data-region="russia" data-site="novoil">노보일 ↗</a> · 10월 31일','피격 정황.','시설별 원유 투입·제품 출하 미확인. '+ref('ruStrikesOct','피격 추적')],
  ['<a href="#products-map" data-region="russia" data-site="norsi">NORSI ↗</a> · 11월 1일','주지사는 지역 산업시설 피해 확인.','정지 공정과 피해 규모는 미확인. '+ref('yar','Reuters')],
  ['<a href="#products-map" data-region="russia" data-site="yaroslavl">야로슬라블 YANOS ↗</a> · 11월 3일','연 약 1,500만 톤 처리 규모. Rosneft·Gazprom Neft의 Slavneft 합작 계열. 휘발유·경유·항공유·윤활유·연료유 등을 생산한다.','화재·기반시설 피해는 주지사 발표. 공정별 재가동일과 실손실 미확인. '+ref('yanosPlant','시설')+' '+ref('yanosOwnership','소유구조')+' '+ref('yar','피격')],
  ['<a href="#products-map" data-region="russia" data-site="ryazan">랴잔 ↗</a> · 11월 5일','Reuters는 영상에서 정유시설 피격 정황을 확인했다.','설비별 투입·출하 미확인. '+ref('ryazanNov5','Reuters')]
],'text-table')+
  '<p class="note">상압증류가 재가동돼 원유 투입이 회복돼도 수첨분해·탈황 복구가 남아 있으면 저유황·동절기 규격에 맞는 디젤 출하에는 시간이 더 걸릴 수 있다. '+ref('russia','공정 복구')+' '+ref('rulatest','디젤 선적')+'</p>'+
  exactData(comparisonChart([['러시아 원유 투입 추정',[4,5]]],['2026년 10월 초 역산','10월 하순 추정'],{digits:1})+
    '<p class="note">백만 배럴/일. Reuters가 인용한 업계 소식통은 10월 하순 처리량을 약 500만 배럴/일, 월초 대비 약 25% 증가로 추정했다. 월초는 500 ÷ 1.25로 역산했다. Kpler 공개 블로그의 10월 월평균 추정은 약 430만 배럴/일이다. 이후 피격과 디젤 선적 차질이 보도됐다. '+ref('russiaOctoberRuns','Reuters')+' '+ref('ruwinter','Kpler')+' '+ref('rulatest','11월 5일 보도')+'</p>',
    '10월 러시아 전국 투입과 이후 피해');
wireMapLinks('refinery-damage-data');

byId('lng-netback-data').innerHTML='<div>'+
  comparisonChart([['유럽행 미국 LNG',[5.91,6.89]],['아시아행 미국 LNG',[2.84,2.73]]],['2026년 9월','2026년 10월'],{digits:2})+
  '<p class="note">LSEG 추적 출항 물량(Reuters 인용) · 백만 톤. 10월 TTF와 JKM 월평균은 모두 약 28달러/MMBtu였다. '+ref('lngUsTrade','Reuters')+'</p></div>'+
  '<div class="transmission-links"><a href="#lng-voyages">항해 거리·용선비 ↗</a><a href="#lng-price-linkage">현물과 계약가격 ↗</a><a href="#winter-gas">유럽 저장·겨울 수요 ↗</a></div>';

byId('supply-history-data').innerHTML=marketTable(['시기','달라진 수송·공급 구조','현재 화면에서 비교'],[
  ['1956년 수에즈 위기','운하 통제와 통항 차질로 유럽 석유 조달의 수송 경로가 중요해졌다. '+ref('suezHistory','미 국무부 역사자료'),'<a href="#sea-flows">호르무즈와 우회로 ↗</a>'],
  ['1973~74년 석유 위기','금수와 공급 충격 뒤 IEA가 설립됐고 수입국의 공동 비축 대응 체계가 마련됐다. '+ref('ieaHistory','IEA'),'<a href="#stock-programs">공동방출과 실제 집행 ↗</a>'],
  ['2022년 러시아 전면 침공','유럽의 러시아산 원유·가스 노출과 러시아의 아시아 수출 경로가 재편됐다. '+ref('ru2022','IEA'),'<a href="#gas-map">가스관과 LNG 지도 ↗</a>'],
  ['2026년 이란 전쟁','해협 통과·우회 원유·LNG 선적과 정제제품 공급이 다른 속도로 회복됐다. '+ref('ieaoil','IEA'),'<a href="#physical-crude">원유·제품 회복 비교 ↗</a>']
],'text-table');
