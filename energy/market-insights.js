'use strict';

// rows: [label, value…]; points sit by label, so labels are unique. tick, when
// given, prints an axis label in place of the row's own (a date as 연.월). A
// null value is a row a series does not have: its line runs through the rows
// it has and ends at the last of them. marks, {label, points:[[row label,
// series index]…]}, rings those points and names the ring in the legend.
function timeChart(id,rows,series,{unit,domain,band,tick,marks}={}) {
  const host=byId(id);
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('class','insight-chart');
  svg.setAttribute('role','img');
  svg.setAttribute('aria-label',series.map(item=>item.label).join(', ')+' · '+unit);
  const legend=series.map(({label,color})=>'<span><i style="background:'+color+'"></i>'+label+'</span>');
  if(band) legend.unshift('<span><i class="insight-range"></i>'+band.label+'</span>');
  if(marks) legend.push('<span><i class="insight-mark"></i>'+marks.label+'</span>');
  host.innerHTML='<div class="insight-legend">'+legend.join('')+'</div>';
  host.append(svg);
  function draw() {
    const width=svg.clientWidth, height=svg.clientHeight;
    if(!width||!height) return;
    const margin={left:31,right:21,top:10,bottom:24};
    const chart=d3.select(svg).attr('viewBox','0 0 '+width+' '+height);
    chart.selectAll('*').remove();
    const x=d3.scalePoint(rows.map(([date])=>date),[margin.left,width-margin.right]);
    const y=d3.scaleLinear(domain,[height-margin.bottom,margin.top]);
    const ticks=y.ticks(5);
    chart.append('g').selectAll('line').data(ticks).join('line')
      .attr('class','trend-grid').attr('x1',margin.left).attr('x2',width-margin.right)
      .attr('y1',value=>y(value)).attr('y2',value=>y(value));
    chart.append('g').attr('class','trend-axis').attr('transform','translate('+margin.left+',0)')
      .call(d3.axisLeft(y).tickValues(ticks).tickSize(0).tickPadding(6));
    const tickStep=Math.max(1,Math.ceil(rows.length/(width<420?5:8)));
    const dates=rows.filter((_,i)=>i%tickStep===0&&rows.length-1-i>=tickStep/2).map(([date])=>date);
    dates.push(rows.at(-1)[0]);
    chart.append('g').attr('class','trend-axis').attr('transform','translate(0,'+(height-margin.bottom)+')')
      .call(d3.axisBottom(x).tickValues(dates).tickFormat(tick??null).tickSize(0).tickPadding(7));
    if(band) {
      const area=d3.area().x(row=>x(row[0])).y0(row=>y(row[band.low])).y1(row=>y(row[band.high]));
      chart.append('path').datum(rows).attr('d',area).attr('class','insight-range');
    }
    for(const {index,color} of series) {
      const own=rows.filter(row=>row[index]!=null);
      if(!own.length) continue;
      const line=d3.line().x(row=>x(row[0])).y(row=>y(row[index]));
      chart.append('path').datum(own).attr('d',line).attr('fill','none').attr('stroke',color).attr('stroke-width',2);
      const last=own.at(-1);
      chart.append('circle').attr('cx',x(last[0])).attr('cy',y(last[index])).attr('r',3.5).attr('fill',color);
    }
    for(const [label,index] of marks?marks.points:[]) {
      const row=rows.find(row=>row[0]===label), item=series.find(item=>item.index===index);
      if(row&&item&&row[index]!=null) chart.append('circle').attr('class','insight-mark').attr('cx',x(label)).attr('cy',y(row[index])).attr('r',3).attr('stroke',item.color);
    }
  }
  new ResizeObserver(draw).observe(svg);
  draw();
}

byId('gulf-total').innerHTML=comparisonChart([['원유·콘덴세이트·정제제품',[18.9,17.1]]],['2026년 9월','2026년 10월'])+
  '<p class="note context-caption">Vortexa 집계(Reuters 인용) · 이란과 액화석유가스(LPG) 제외. 10월 물량은 9월보다 약 9.5% 감소했다. 선박 위치 신호가 꺼진 항차는 추후 반영될 수 있다. '+ref('gulftrack','Reuters')+'</p>';
byId('gulf-mix').innerHTML=comparisonChart([
  ['원유·콘덴세이트<small>전쟁 전 약 86% 수준</small>',[14]],
  ['정제제품<small>전쟁 전의 절반을 조금 넘는 수준</small>',[3.1]]
],['2026년 10월'])+
  '<p class="note context-caption">전쟁 전 비교는 품목별 수출을 기준으로 한다. <a class="ref" href="#product-stocks">재고·경유 수출 ↗</a> '+ref('gulftrack','Reuters')+'</p>';

const seasonalDistillate=[
  ['06.26',29.6,27.7,34.1],['07.03',27.4,27.0,37.7],['07.10',29.6,28.7,37.4],
  ['07.17',29.6,29.4,36.1],['07.24',30.1,29.8,36.8],['07.31',29.9,29.6,36.0],
  ['08.07',29.3,29.4,34.5],['08.14',28.4,29.0,35.1],['08.21',27.2,29.4,34.2],
  ['08.28',28.5,29.8,32.8],['09.04',28.6,31.6,33.4],['09.11',29.9,31.3,34.2],
  ['09.18',29.5,30.8,33.9],['09.25',27.9,29.9,34.4],['10.02',27.9,26.4,31.7],
  ['10.09',25.8,25.4,30.3],['10.16',26.7,25.9,30.4],['10.23',25.9,25.8,32.3],
  ['10.30',23.8,26.0,30.9]
];
timeChart('distillate-season',seasonalDistillate,[{index:1,label:'2026년',color:'#356fa4'}],{
  unit:'일',domain:[20,40],band:{label:'2021~2025년 같은 주 최저~최고',low:2,high:3}
});
byId('distillate-season').insertAdjacentHTML('beforeend',
  '<p class="insight-result">10월 30일 <strong>23.8일</strong><span>과거 5년 같은 주의 최저 26.0일보다 2.2일 짧음</span></p>'+
  '<p class="note">2021~2025년 같은 국제표준(ISO) 주차의 최저~최고 범위. 경유와 난방유를 포함한 중간유분 재고를 최근 4주 평균 수요 지표로 나눈다. '+ref('distcover','EIA')+'</p>');

const gulfRetail=[3.226,3.414,4.660,5.202,5.124,4.606,4.700,5.253,5.978,5.871];
const usDieselRows=gulfRetail.map((retail,i)=>[(i+1)+'월',market2026.diesel[i],retail]);
timeChart('us-diesel-price',usDieselRows,[
  {index:1,label:'걸프연안 초저유황 경유 현물',color:'#356fa4'},
  {index:2,label:'걸프연안 도로 판매가(세금 포함)',color:'#a75a31'}
],{unit:'달러/갤런',domain:[0,7]});
const gulfRetailQoq=pctQoq(averageQuarter(gulfRetail));
const gulfSpotQoq=pctQoq(averageQuarter(market2026.diesel));
byId('us-diesel-price').insertAdjacentHTML('beforeend',
  '<p class="insight-result">3분기 전분기비 <strong>현물 +'+num(gulfSpotQoq)+'%</strong><span>도로 판매가 +'+num(gulfRetailQoq)+'%</span></p>'+
  '<p class="note">같은 미국 걸프연안 지역의 서로 다른 거래 단계다. 판매가에는 세금과 유통 비용이 반영된다. 분기치는 월평균의 단순 평균이다. '+ref('usd','현물')+' '+ref('gulfretail','판매가')+'</p>'+
  exactData(marketTable(['2026년','현물','도로 판매가'],usDieselRows.map(([date,spot,retail])=>[date,num(spot,3),num(retail,3)])),'월별 수치'));

const euDieselQuarter=[['세금 제외 판매가',[1.138342,1.200787]],['세금 포함 판매가',[1.909516,2.034425]]];
byId('eu-diesel-price').innerHTML=comparisonChart(euDieselQuarter,['2026년 2분기','2026년 3분기'],{digits:3})+
  '<p class="insight-result">11월 2일 <strong>세후 2.154유로/리터</strong><span>세전 1.352유로/리터</span></p>'+
  '<p class="note">EU 집행위원회가 집계한 자동차용 경유 판매가다. 분기치는 각 분기 13개 주간 관측값의 단순 평균이다. '+ref('euoilbulletin','EU 주간 석유 가격')+'</p>';

byId('lng-hub-gap').innerHTML=comparisonChart([['아시아 현물 − 유럽 가스 허브',[2,1]]],['2026년 3~7월','2026년 8~10월'])+
  '<p class="note context-caption">IEA 추정 · 아시아 가격의 웃돈이 약 2달러에서 약 1달러로 줄었다. IEA는 겨울을 앞두고 목적지를 바꿀 수 있는 LNG 화물의 확보 경쟁이 강해졌다고 해석했다. '+ref('ieagas','IEA')+'</p>';
byId('lng-contract-delay').innerHTML=contextFlow([
  ['원유 지표','계약에 정해진 기준가'],
  ['약 5~6개월 뒤','계약 산식에 반영'],
  ['LNG 계약가격','계약마다 연동 조건 차이']
])+'<p class="insight-result">2026년 3분기 <strong>12~14달러/MMBtu</strong><span>IEA의 원유 연동 LNG 가격 추정</span></p>'+
  '<p class="note">IEA는 앞선 유가 상승이 4분기 원유 연동 계약가에 더 뚜렷하게 반영될 것으로 봤다. '+ref('ieagas','IEA')+'</p>';
