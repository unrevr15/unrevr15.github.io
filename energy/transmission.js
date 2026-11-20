'use strict';

const augustSeptember=['8월','9월'];
const q2q3=quarterLabels.slice(1);

byId('crude-route-bridge').innerHTML=comparisonChart([
  ['걸프 원유 수출',[9.5,13.9]],['호르무즈 통과 석유',[7.2,10.9]],['배관 우회 수출',[4.63,5.6]]
],augustSeptember,{digits:2})+
  '<p class="note">IEA 추정. 8월은 9월 수치와 증감분으로 역산했다. 호르무즈 통과량은 제품을 포함한다. 행을 합산할 수 없다. '+ref('ieaoil','IEA')+'</p>'+
  '<div class="transmission-links"><a href="#oil-map" data-region="gulf" data-site="ew">동서 송유관 지도 ↗</a><a href="#escort-watch">호위·보험 비교 ↗</a><a href="#oil-balance">비축·재고 ↗</a></div>';
wireMapLinks('crude-route-bridge');

byId('crude-freight-bridge').innerHTML=comparisonChart(regionalFreightRows.map(([region,aug,sep])=>[region,[aug,sep]]),augustSeptember,{digits:2})+
  '<p class="note">S&amp;P Global 기사에 공개된 용선 평가. 같은 출발지의 도착지별 비교다. '+ref('ceramargins','S&P Global')+'</p>'+
  exactData(comparisonChart([['미국 걸프 → 중국 VLCC',[8.60,40]]],['2월 전쟁 전','10월 9일 보도'],{digits:2})+
    '<p class="note">달러/배럴. Reuters가 인용한 SSY/LSEG는 11월 선적분 200만 배럴에 8,000만 달러의 운임을 관측했다. 8.60달러는 같은 기사에 나온 전쟁 전 비교값이다. 개별 화물 기준이며 위 월평균 운임은 달러/톤이다. '+ref('vlccFreightCase','Reuters')+'</p>',
    '중국행 VLCC 화물 사례 · 달러/배럴')+
  '<div class="transmission-links"><a href="#shipping">VLCC·배럴당 운송비 ↗</a><a href="#fleet">제재·보험·선복 ↗</a></div>';

byId('crude-price-bridge').innerHTML=comparisonChart([['Dated Brent',[90.72,116.89]]],augustSeptember,{digits:2})+
  '<p class="note">전월 대비 +26.17달러/배럴. IEA는 중동 분쟁 재개, 아시아 매입, 동서 송유관 피격과 운임 급등을 상승 요인으로 봤다. '+ref('ieaoil','IEA')+'</p>'+
  '<div class="transmission-links"><a href="#brent-market">실물 평가·선물·가격 차등 ↗</a><a href="#diesel-transmission">디젤로 이어진 비용 ↗</a></div>';

byId('world-stock-bridge').innerHTML=comparisonChart([
  ['육상 재고',[-113]],['해상 석유',[103]],['세계 관측 재고 합계',[-10]]
],['9월 말 − 8월 말'],{digits:0,signed:true,showSign:true})+
  '<p class="note">해상 물량 증가가 육상 감소를 대부분 상쇄했다. 이 집계는 전략비축 방출량과 상업재고 감소를 나누지 않는다. '+ref('ieaoil','IEA')+'</p>';

byId('diesel-runs-bridge').innerHTML=comparisonChart(regionalRunChanges,q2q3,{signed:true,showSign:true})+
  '<p class="note">원유 투입 변화에는 피격·원료 부족·정비·채산성이 함께 반영된다. '+ref('globalruns','EIA')+'</p>'+
  '<div class="transmission-links"><a href="#products-map" data-region="russia" data-site="ryazan">러시아 정유시설 지도 ↗</a><a href="#diesel-exports">디젤 순수출 ↗</a><a href="#geopolitics">정유 공격·휴전 ↗</a></div>';
wireMapLinks('diesel-runs-bridge');

byId('diesel-wholesale-bridge').innerHTML=comparisonChart([
  ['디젤 현물',productQuarterPrices[0][1].slice(1)],
  ['디젤 크랙',productQuarterCracks[0][1].slice(1)]
],q2q3,{digits:2})+
  '<p class="note">크랙은 미국 걸프 경유 현물 − 쿠싱 WTI다. '+ref('usd','경유')+' '+ref('wti','원유')+'</p>'+
  '<div class="transmission-links"><a href="#quarter-cracks">제품별 크랙 ↗</a><a href="#refinery-compare">지역별 정유마진 ↗</a></div>';

const euRetailQuarter=euDieselQuarter[1][1];
const gulfRetailQuarter=averageQuarter(gulfRetail).slice(1);
const retailRows=[
  ['미국 걸프연안',gulfRetailQuarter,'달러/갤런'],
  ['EU 평균',euRetailQuarter,'유로/리터']
];
byId('diesel-retail-bridge').innerHTML=comparisonChart(retailRows.map(([name,[q2,q3],unit])=>[
  name+'<small>'+num(q2,3)+' → '+num(q3,3)+' '+unit+'</small>',[(q3/q2-1)*100]
]),['3분기 전분기비 · %'],{showSign:true,signed:true})+
  '<p class="note">'+ref('gulfretail','EIA')+' '+ref('euoilbulletin','EU')+'</p>'+
  '<div class="transmission-links"><a href="#diesel-cost">도매·판매가 및 세금 ↗</a><a href="#industry-prices-section">화물·항공·발전 비용 ↗</a></div>';

byId('diesel-reading').innerHTML='<div><strong>크랙이 올라도 정유 마진은 줄 수 있다.</strong> '+
  '운임·보험료와 원료 조달비가 먼저 오르면 정유사는 가동을 줄일 수 있다. 다른 지역의 증산이나 제품 재고로 부족분을 메우지 못하면 디젤 크랙이 더 벌어질 수 있다. '+
  ref('ieaoil','IEA')+' '+ref('ieafreight','도착비')+'</div>'+
  '<div class="transmission-links"><a href="#product-shipping">제품선 운임 ↗</a><a href="#product-stocks">중간유분 재고 ↗</a><a href="#freight-adjust">도착 원가 계산 ↗</a></div>';

const asiaAugust=['2025년 8월','2026년 8월'];
const asiaAugustPrices=[
  ['대만',15.5],['태국',14.4],['한국',14.3],['일본',14.3],['싱가포르',13.4],['중국',13.2]
];
byId('lng-arrivals-bridge').innerHTML=
  comparisonChart([['6개 시장 LNG 수입량<small>백만 톤</small>',[16.9/.875,16.9]]],asiaAugust)+
  comparisonChart([['수입 가중평균 단가<small>달러/MMBtu</small>',[10.7,14.1]]],asiaAugust)+
  '<p class="note">전년 대비 물량 −12.5%, 수입 단가 약 +32%. 2025년 물량은 공표된 증감률로 역산했다. 통관 단가는 계약·현물 혼합 실적이다. '+ref('hureau','통관 분석')+'</p>'+
  exactData(comparisonChart(asiaAugustPrices.map(([market,price])=>[market,[price]]),['2026년 8월 · 달러/MMBtu']),'6개 시장별 수입 단가')+
  '<div class="transmission-links"><a href="#lng-voyages">항로별 항해일·비용 ↗</a><a href="#lng-price-linkage">현물·원유 연동가 ↗</a><a href="#industry-prices">산업용 가스·전기 ↗</a></div>';

byId('lng-global-bridge').innerHTML=comparisonChart([
  ['카타르·UAE 선적<small>감소 규모 하한</small>',[-60]],
  ['비걸프 공급<small>증가 규모 하한</small>',[40]],
  ['세계 LNG 선적<small>근사값</small>',[-20]]
],['전년 동기 대비 · 십억 m³'],{digits:0,signed:true,showSign:true})+
  '<p class="note">가스 부피로 환산한 IEA 추정이다. 8월 아시아 통관 집계와 기간·단위가 다르다. '+ref('ieagas','IEA')+'</p>'+
  '<p class="note">아시아행 항로: 미국 걸프 → 파나마 통과 또는 희망봉 우회, 캐나다 서해안 → 태평양 횡단. '+ref('ieagas','IEA')+' '+ref('kplerlng','Kpler')+'</p>'+
  '<div class="transmission-links"><a href="#lng-voyages">항로별 항해일·비용 ↗</a></div>';

byId('russia-repairs').innerHTML=exactData(marketTable(['피해 유형','복구 기간과 생산 영향'],[
  ['상압증류(CDU) 경미한 손상','IEA 기준 1~2주. 원유를 1차 분리하는 공정의 투입량이 줄어든다.'],
  ['수첨분해·탈황 등 후단 공정 중대 손상','평균 6~8개월. 원유 처리를 일부 재개해도 규격에 맞는 경유·항공유 생산은 지연될 수 있다.'],
  ['모스크바 정유시설 사례','설치 능력 25만 배럴/일. IEA는 6월 피격으로 2027년 초까지 가동 중단이 보고됐다고 9월에 전했다.']
],'text-table')+'<p class="note">서방 제재로 일부 장비 공급처 접근이 제한된다. 복구 기간은 IEA의 공정별 일반 범위다. '+ref('russia','IEA')+
' · <a href="#geopolitics">휴전 협상 ↗</a></p>','러시아 정유시설 피해·복구 기간');

const marchChange=(values)=>values[2]-values[1];
const warMonths=[2022,2026].map(year=>monthlyMarket[year]);
byId('war-price-bridge').innerHTML=comparisonChart([
  ['유럽 브렌트 현물',warMonths.map(({brent})=>marchChange(brent))],
  ['미국 걸프연안 디젤 현물',warMonths.map(({diesel})=>42*marchChange(diesel))],
  ['미국 걸프연안 디젤 크랙',warMonths.map(({diesel,wti})=>42*marchChange(diesel)-marchChange(wti))]
],['2022년 러시아 전면 침공','2026년 이란 전쟁'],{digits:2,showSign:true})+
  '<p class="note">두 전쟁은 각 2월 말에 시작됐다. 각 막대는 3월 평균과 2월 평균의 차이다. 전쟁의 영향만 따로 추정한 값은 아니다. '+ref('brent','브렌트')+' '+ref('usd','디젤')+' '+ref('wti','WTI')+'</p>'+
  '<div class="transmission-links"><a href="#timeline">월별 원유·디젤·크랙 시계열 ↗</a><a href="#geopolitics">러시아 정유시설·휴전 ↗</a><a href="#escort-watch">호르무즈 호위·보험 ↗</a></div>';
