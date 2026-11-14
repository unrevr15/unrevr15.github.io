'use strict';

const byId = id => document.getElementById(id);
const num = (value, digits = 1) => value.toLocaleString('en-US', {minimumFractionDigits:digits, maximumFractionDigits:digits});
const anchor = (url, label) => '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + label + ' ↗</a>';

function buttons(id, collection, change, active) {
  const host = byId(id);
  Object.entries(collection).forEach(([key, item]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = item.label;
    button.dataset.key = key;
    button.setAttribute('aria-pressed', String(key === active));
    button.addEventListener('click', () => {
      [...host.children].forEach(child => child.setAttribute('aria-pressed', String(child === button)));
      change(key);
    });
    host.append(button);
  });
}

const [,diesel25,diesel26]=crackPeriods.aug.rows[1];
const [,usDiesel25,usDiesel26]=crackPeriods.usOct.rows[1];
const [dubai25,dubai26]=crackPeriods.aug.crude;
const [wti25,wti26]=crackPeriods.usOct.crude;
const [brent25,brent26]=[monthlyMarket[2025].brent[9],monthlyMarket[2026].brent[9]];
const quoteRows=[
  ['브렌트 원유','북해 · $/배럴','10월',brent25,brent26,2,'#timeline','brent',null,null,'brent'],
  ['WTI 원유','쿠싱 · $/배럴','10월',wti25,wti26,2,'#timeline','wti',null,null,'wti'],
  ['미국 디젤 현물','걸프연안 초저유황 · $/배럴','10월',42*usDiesel25,42*usDiesel26,2,'#timeline','usd',null,null,'dieselSpot'],
  ['미국 경유 크랙','걸프연안 경유 − WTI · $/배럴','10월',42*usDiesel25-wti25,42*usDiesel26-wti26,1,'#timeline','usd','usOct',null,'diesel'],
  ['싱가포르 디젤 현물','황 10ppm · $/배럴','8월',diesel25,diesel26,1,'#product-quotes','keei',null,benchmarks[0][4]],
  ['싱가포르 경유 크랙','경유 − 두바이유 · $/배럴','8월',diesel25-dubai25,diesel26-dubai26,1,'#crack','keei','aug'],
  ...benchmarks.slice(1,3).map(([name,latest,unit,prior,reported])=>[name,unit,'8월',Number(prior),Number(latest),1,'#gas-market','keei',null,reported])
];
byId('quote-board').innerHTML='<table class="market-table quote-table"><thead><tr><th scope="col">지표</th><th scope="col">비교 월</th><th scope="col">2025</th><th scope="col">2026</th><th scope="col">전년비</th></tr></thead><tbody>'+
  quoteRows.map(([name,unit,month,prior,latest,digits,href,source,view,reported,series])=>{
    const change=reported||(view?'+$'+num(latest-prior):'+'+num((latest/prior-1)*100)+'%');
    return '<tr><th scope="row"><a href="'+href+'"'+(view?' data-crack="'+view+'"':'')+(series?' data-series="'+series+'"':'')+'>'+name+'</a><small>'+unit+' '+ref(source,source==='keei'?'KEEI':'EIA')+'</small></th><td>'+month+'</td><td>'+num(prior,digits)+'</td><td class="latest">'+num(latest,digits)+'</td><td class="change '+signTone(change)+'">'+change+'</td></tr>';
  }).join('')+'</tbody></table>';
byId('benchmarks').innerHTML = '<table class="market-table"><thead><tr><th scope="col">벤치마크</th><th scope="col">2025</th><th scope="col">2026</th><th scope="col">전년비</th></tr></thead><tbody>'+
  benchmarks.map(([label,now,unit,then,delta,definition]) =>
    '<tr><th scope="row">'+label+'<small>'+unit+' · '+definition+'</small></th><td>'+then+'</td><td>'+now+'</td><td class="change '+signTone(delta)+'">'+delta+'</td></tr>').join('')+
  '</tbody></table>';
byId('industry-prices').innerHTML=industryPrices.map(([label,price,change,period,source])=>
  '<div class="cost-row"><div><strong>'+label+'</strong><small>'+period+' '+ref(source)+'</small></div><b>'+price+'</b><span>'+change+'</span></div>').join('');

const crackHost = byId('crack-history');
crackHost.innerHTML = '<div id="crack-tabs" class="pills light" role="group" aria-label="크랙 비교 기간"></div><div id="crack-data" aria-live="polite"></div>';
function renderCrack(key) {
  const {label,basis,crudeName,refs,crude,rows,multiplier=1,years=['2025','2026']} = crackPeriods[key];
  const values = rows.map(([name,before,after])=>{
    const past=before*multiplier-crude[0], current=after*multiplier-crude[1];
    return '<tr><th scope="row">'+name+'</th><td>'+num(past)+'</td><td>'+num(current)+'</td><td><b>'+(current>=past?'+':'')+num(current-past)+'</b></td></tr>';
  }).join('');
  byId('crack-data').innerHTML = '<p class="note crack-note">'+basis+' · '+label+' · $/배럴</p>'+
    '<table class="crack-table"><thead><tr><th scope="col">제품</th><th scope="col">'+years[0]+'</th><th scope="col">'+years[1]+'</th><th scope="col">변화</th></tr></thead><tbody>'+values+'</tbody></table>'+
    '<p class="note crack-note">'+crudeName+' '+num(crude[0],multiplier===42?2:1)+' → '+num(crude[1],multiplier===42?2:1)+'. '+(multiplier===42?'미국 제품가는 갤런당 가격에 42를 곱해 배럴당으로 환산했다. ':'KEEI 기간 평균으로 계산했다. ')+refs.map(id=>ref(id)).join(' ')+'</p>';
}
buttons('crack-tabs',crackPeriods,renderCrack,'aug');
renderCrack('aug');
byId('quote-board').querySelectorAll('[data-crack]').forEach(link=>{
  link.addEventListener('click',()=>byId('crack-tabs').querySelector('[data-key="'+link.dataset.crack+'"]').click());
});

const calc=byId('calc');
function calculate() {
  const [crude,gasoline,diesel]=['c','g','d'].map(id=>byId(id).valueAsNumber);
  byId('spread').value=calc.checkValidity() ? num((2*gasoline+diesel-3*crude)/3,2)+' $/배럴' : '입력값 확인 필요';
}
calc.addEventListener('input',calculate);
calc.addEventListener('submit',event=>{event.preventDefault();calculate()});
calculate();

function renderBalances(key,host,labels) {
  const {title,period,sources,note,rows:allRows} = balances[key];
  const rows=labels?allRows.filter(([label])=>labels.includes(label)):allRows;
  const unitFor=(unit)=>key==='stocks'?'백만 배럴':unit.split(' · ').at(-1);
  const maxima=new Map();
  rows.forEach(([,unit,before,after])=>{
    const group=unitFor(unit);
    maxima.set(group,Math.max(maxima.get(group)||0,before,after,group.endsWith('%')?100:0));
  });
  const bar = (value, max, digits, year) =>
    '<div class="barrow"><span class="bar" aria-hidden="true"><i style="width:'+value/max*100+'%"></i></span><span aria-label="'+year+'년 '+num(value,digits)+'">'+num(value,digits)+'</span></div>';
  host.innerHTML =
    '<div class="balance-meta"><div><h3>'+title+'</h3><p class="note">'+period+'</p></div><div class="legend"><span><i></i>2025</span><span><i></i>2026</span></div></div>'+
    rows.map(([label,unit,before,after,delta,digits=1])=>{
      const max=maxima.get(unitFor(unit));
      return '<div class="metric"><div class="metric-label"><strong>'+label+'</strong><small>'+unit+'</small></div><div class="barset">'+bar(before,max,digits,2025)+bar(after,max,digits,2026)+'</div><div class="delta">'+delta+'</div></div>';
    }).join('')+'<details class="method"><summary>집계 기준·출처</summary><p>'+note+' '+sources.map(id=>ref(id)).join(' ')+'</p></details>';
}
const flowLabels={
  oil:[['걸프 산유국','원유 생산·선적'],['해협·탱커','호르무즈 · 원유 재고'],['정유소','증류 → 전환 → 탈황'],['제품 시장','경유·항공유·나프타'],['산업 수요','항공·화물·석유화학']],
  lng:[['가스전·배관','생산·정제'],['액화·선적','카타르 라스라판'],['선박·재기화','해상 LNG · 수입 터미널'],['저장·계통','지하 저장 · 배관 송출'],['산업 수요','발전·비료·도시가스']]
};
const flowLinks={
  oil:[
    ['호르무즈 석유 2,100만 → 490만 배럴/일','2025·2026년 2분기','hormuz'],
    ['미국 전략비축유 409.6 → 282.2백만 배럴','2025·2026년 10월 말','spr'],
    ['세계 정유 처리 85.6 → 81.4백만 배럴/일','2025·2026년 8월 · IEA 추정','ieasep'],
    ['중동·러시아 경유 순수출 약 130만 배럴/일 감소','2026년 9월 전년 대비','ieaoil'],
    ['미국 도로용 경유 3.753 → 6.292달러/갤런','2025·2026년 11월 첫 주','diesel']
  ],
  lng:[
    ['우크라이나 경유 러시아 가스 계약 종료','2025년 1월','pipe'],
    ['카타르·UAE LNG 선적 600억 m³ 넘게 감소','2026년 3~10월 전년 대비','ieagas'],
    ['호르무즈 LNG 110억 → 8억 입방피트/일','2025·2026년 2분기','hormuz'],
    ['EU 지하 가스 재고 948 → 839 TWh','2025·2026년 11월 3일','volt'],
    ['EU 비가정용 가스 가격 −6.7%','2026년 상반기 전년 대비','eugas']
  ]
};
function renderChain(key,stepsId,detailId) {
  const steps=chains[key].steps;
  const collection=Object.fromEntries(flowLabels[key].map(([label],index)=>[index,{label}]));
  function renderStep(index) {
    const [title,body,metrics,...refs]=steps[index];
    const [indicator,period,source]=flowLinks[key][index];
    const refinery=key==='oil'&&Number(index)===2;
    byId(detailId).innerHTML='<div class="chain-caption"><strong>'+indicator+'</strong><small>'+period+' '+ref(source)+'</small></div>'+
      (refinery?'<div class="refinery-flow" aria-label="정유 공정과 대표 산출물"><span>원유</span><i aria-hidden="true">→</i><span>상압·감압증류</span><i aria-hidden="true">→</i><div class="refinery-branches"><div>접촉분해 <i>→</i> 휘발유 계열</div><div>수첨분해 <i>→</i> 경유·항공유 계열</div><div>탈황·블렌딩 <i>→</i> 규격 제품</div></div></div>':'')+
      '<details class="method"><summary>'+title+' 상세</summary><p>'+body+' '+refs.map(id=>ref(id)).join(' ')+'</p><p class="note">'+metrics+'</p></details>';
  }
  byId(stepsId).replaceChildren();
  buttons(stepsId,collection,renderStep,'0');
  [...byId(stepsId).children].forEach((button,i)=>{
    const short=document.createElement('small');
    short.textContent=flowLabels[key][i][1];
    button.append(short);
  });
  renderStep(0);
}
renderChain('oil','chain-steps','chain-detail');
renderChain('lng','gas-chain-steps','gas-chain-detail');

const sectors=[
  ['항공','등유형 항공유','공항 급유비 · 연료 헤지','jet'],
  ['화물·농업','자동차용 경유','도로용 판매가 · 유류할증료','diesel'],
  ['석유화학','나프타','스팀크래커 원료비','keei'],
  ['비료','천연가스','암모니아 원료·공정 연료','ieagas'],
  ['발전·제조','LNG·배관 가스','발전 연료비 · 비가정용 전기료','euelec']
];
byId('sector-costs').innerHTML='<table class="market-table text-table"><thead><tr><th scope="col">산업</th><th scope="col">주요 원료·연료</th><th scope="col">비용에 반영되는 항목</th></tr></thead><tbody>'+
  sectors.map(([sector,fuel,cost,source])=>'<tr><th scope="row">'+sector+'</th><td>'+fuel+'</td><td>'+cost+' '+ref(source)+'</td></tr>').join('')+'</tbody></table>';

const warRows=[
  ['첫 차질','호르무즈 통항 · 걸프 선적','정유시설 피해 · 유럽 배관 가스'],
  ['원유','호르무즈 원유·콘덴세이트 14.9 → 3.7백만 배럴/일<small>2025·2026년 2분기 '+ref('hormuz')+'</small>','러시아 정유 처리 약 30% 감소<small>2026년 6월 전년 대비 '+ref('russia')+'</small>'],
  ['제품','호르무즈 석유제품 6.2 → 1.1백만 배럴/일<small>2025·2026년 2분기 '+ref('hormuz')+'</small>','정유 가동 및 경유·항공유 공급 제약<small>IEA 시설 분석 '+ref('russia')+'</small>'],
  ['가스','호르무즈 LNG 11.0 → 0.8십억 입방피트/일<small>2025·2026년 2분기 '+ref('hormuz')+'</small>','우크라이나 경유 계약 종료<small>2025년 1월 '+ref('pipe')+'</small>']
];
byId('war-matrix').innerHTML='<table class="market-table text-table"><thead><tr><th scope="col">경로</th><th scope="col">이란 전쟁</th><th scope="col">러시아·우크라이나 전쟁</th></tr></thead><tbody>'+
  warRows.map(([item,iran,russia])=>'<tr><th scope="row">'+item+'</th><td>'+iran+'</td><td>'+russia+'</td></tr>').join('')+'</tbody></table>';

function researchBlock([label,body,...refs]) {
  return '<div class="research-block"><strong>'+label+'</strong><p>'+body+' '+refs.map(id=>ref(id)).join(' ')+'</p></div>';
}
byId('war-cards').innerHTML=investigations.map(({title,blocks})=>
  '<article class="panel"><h3>'+title+'</h3>'+blocks.map(researchBlock).join('')+'</article>').join('');
byId('regional-research').innerHTML=regionalResearch.map(([label,body,...refs])=>
  '<p><strong>'+label+'</strong> · '+body+' '+refs.map(id=>ref(id)).join(' ')+'</p>').join('');
byId('source-list').innerHTML=Object.entries(sources).map(([id,[label,meta,url]])=>
  '<a id="s-'+id+'" class="source-card" href="'+url+'" target="_blank" rel="noopener noreferrer"><b>'+label+' ↗</b><span>'+meta+'</span></a>').join('');

const trendSeries=[
  {key:'brent',label:'브렌트 원유',color:'#a24b1d'},
  {key:'wti',label:'WTI 원유',color:'#775a16',dashed:true},
  {key:'dieselSpot',label:'미국 디젤 현물',color:'#08787e'},
  {key:'diesel',label:'미국 경유 크랙',color:'#285d9a',dashed:true},
  {key:'gasoline',label:'미국 휘발유 크랙',color:'#7046a2'}
];
// Tone class of a change written as text ('+81.1%', '약 −9%p', '−109 TWh'): the first sign decides.
function signTone(text) {
  const sign=String(text).match(/[+−-](?=\s*[$0-9])/);
  return sign?(sign[0]==='+'?'change-up':'change-down'):'change-flat';
}
function signedChange(value,digits) {
  const tone=value===0?'flat':value>0?'up':'down';
  const sign=value===0?'':value>0?'+':'−';
  return '<span class="change-'+tone+'">'+sign+num(Math.abs(value),digits)+'</span>';
}
const trendMonth=byId('trend-month');
const trendSvg=byId('trend');
let trendWindow='recent';
let trendRows=[];
let focusSeries='';
const trendLegend=byId('trend-legend');
trendLegend.addEventListener('click',event=>{
  const key=event.target.closest('[data-series]')?.dataset.series;
  if(key) chooseTrendSeries(key===focusSeries?'':key);
});
function chooseTrendSeries(key) {
  focusSeries=key;
  paintTrend();
}
byId('quote-board').querySelectorAll('[data-series]').forEach(link=>{
  link.addEventListener('click',()=>chooseTrendSeries(link.dataset.series));
});
trendLegend.innerHTML=trendSeries.map(({key,label,color})=>
  '<button type="button" data-series="'+key+'" aria-pressed="false"><i style="background:'+color+'"></i><span>'+label+'</span><b></b></button>').join('');
const eventEvidence={
  '2026-03':['2026-02','#oil-map','호르무즈 원유 지도'],
  '2026-06':['2026-05','#refinery-table','러시아 정유시설'],
  '2026-09':['2025-09','#product-stocks','경유 순수출·재고'],
  '2026-10':['2026-09','#shipping','운임·원유 도착비'],
  '2022-03':['2022-02','#investigation','전쟁별 공급 지표 비교'],
  '2022-06':['2022-02','#crack','지역별 크랙']
};

function renderEvent(selected,event) {
  const target=byId('event-note');
  const previous=trendRows[trendRows.indexOf(selected)-1];
  const [beforeMonth,href,label]=event?eventEvidence[selected.month]:[previous?.month];
  const mapTarget=href==='#oil-map'?' data-region="gulf" data-site="hormuz"':'';
  const before=trendRows.find(row=>row.month===beforeMonth);
  const rows=[['브렌트','brent',2],['미국 디젤','dieselSpot',2],['미국 디젤 크랙','diesel',1]];
  const header=['달러/배럴',beforeMonth?.slice(2).replace('-','.')??'이전',selected.month.slice(2).replace('-','.'),'변화'];
  target.innerHTML='<table class="market-table event-compare"><thead><tr>'+
    header.map(text=>'<th scope="col">'+text+'</th>').join('')+'</tr></thead><tbody>'+
    rows.map(([name,key,digits])=>'<tr><th scope="row">'+name+'</th><td>'+(before?num(before[key],digits):'—')+
      '</td><td>'+num(selected[key],digits)+'</td><td>'+(before?signedChange(selected[key]-before[key],digits):'—')+'</td></tr>').join('')+
    '</tbody></table>'+(event?
    '<div class="event-refs"><a href="'+href+'"'+mapTarget+'>'+label+' ↗</a></div>'+
    '<details class="method"><summary>사건 배경·출처</summary><p>'+event[2]+' '+event.slice(3).map(id=>ref(id)).join(' ')+'</p></details>':'');
}

function paintTrend() {
  const selected=trendRows.find(row=>row.month===trendMonth.value);
  const width=Math.max(275,trendSvg.clientWidth),height=235;
  const svg=d3.select(trendSvg).attr('viewBox','0 0 '+width+' '+height);
  svg.selectAll('*').remove();
  svg.append('title').text('월별 브렌트 원유, 디젤 현물가와 정제제품 크랙');
  const x=d3.scalePoint(trendRows.map(row=>row.month),[35,width-15]);
  const events=trendWindows[trendWindow].events;
  const tracks=[['원유·디젤 현물',trendSeries.slice(0,3),21,102],['디젤·휘발유 크랙',trendSeries.slice(3),128,height-23]];
  for(const [title,series,top,bottom] of tracks) {
    const [low,high]=d3.extent(trendRows.flatMap(row=>series.map(({key})=>row[key])));
    const y=d3.scaleLinear([Math.min(low,0),Math.max(high,1)],[bottom,top]).nice(3);
    const ticks=y.ticks(3);
    svg.append('text').attr('class','trend-track-label').attr('x',36).attr('y',top-8).text(title);
    svg.append('g').selectAll('line').data(ticks).join('line')
      .attr('class','trend-grid').attr('x1',35).attr('x2',width-14).attr('y1',y).attr('y2',y);
    svg.append('g').attr('class','trend-axis').attr('transform','translate(35,0)')
      .call(d3.axisLeft(y).tickValues(ticks).tickSize(0).tickPadding(7));
    svg.append('g').selectAll('line').data(events).join('line')
      .attr('class','trend-event-line').attr('x1',event=>x(event[0])).attr('x2',event=>x(event[0])).attr('y1',top).attr('y2',bottom);
    const cursor=x(selected.month);
    svg.append('line').attr('class','trend-cursor').attr('x1',cursor).attr('x2',cursor).attr('y1',top).attr('y2',bottom);
    for(const {key,color,dashed} of series) {
      const opacity=focusSeries&&focusSeries!==key ? .32 : 1;
      const line=d3.line().x(row=>x(row.month)).y(row=>y(row[key]));
      svg.append('path').datum(trendRows).attr('d',line).attr('fill','none').attr('stroke',color).attr('stroke-width',key===focusSeries?2.5:1.8).attr('opacity',opacity).attr('stroke-dasharray',dashed?'5 3':null);
      svg.append('circle').attr('cx',cursor).attr('cy',y(selected[key])).attr('r',3.4).attr('fill',color).attr('opacity',opacity);
    }
  }
  const monthTicks=trendRows.filter((_,i)=>i%(width<480?5:3)===0).map(row=>row.month);
  svg.append('g').attr('class','trend-axis').attr('transform','translate(0,'+(height-23)+')')
    .call(d3.axisBottom(x).tickValues(monthTicks).tickSize(0).tickPadding(8).tickFormat(month=>month.slice(2).replace('-','.')));
  trendLegend.querySelectorAll('button').forEach(button=>{
    const key=button.dataset.series;
    const price=num(selected[key],['brent','wti','dieselSpot'].includes(key)?2:1);
    button.setAttribute('aria-pressed',String(key===focusSeries));
    button.querySelector('b').textContent=price;
  });
  svg.on('click',event=>{
    const clickX=d3.pointer(event,trendSvg)[0];
    const closest=d3.least(trendRows,row=>Math.abs(x(row.month)-clickX));
    selectTrend(closest.month);
  });
  byId('trend-values').innerHTML=trendSeries.map(({key,label,color})=>
    '<span><i style="background:'+color+'"></i>'+label+' <b>'+num(selected[key],['brent','wti','dieselSpot'].includes(key)?2:1)+'</b></span>').join('');
  byId('events-list').querySelectorAll('button').forEach(button=>
    button.setAttribute('aria-pressed',String(button.dataset.month===selected.month)));
  renderEvent(selected,events.find(entry=>entry[0]===selected.month));
}

function selectTrend(month) {
  trendMonth.value=month;
  paintTrend();
}

function renderTrend(key) {
  trendWindow=key;
  const {years,initial,events}=trendWindows[key];
  trendRows=years.flatMap(year=>monthlyMarket[year].brent.map((brent,i)=>{
    const {wti,diesel,gasoline}=monthlyMarket[year];
    return {month:year+'-'+String(i+1).padStart(2,'0'),brent,wti:wti[i],dieselSpot:42*diesel[i],diesel:42*diesel[i]-wti[i],gasoline:42*gasoline[i]-wti[i]};
  }));
  trendMonth.replaceChildren(...trendRows.map(({month})=>new Option(month.replace('-','년 ')+'월',month)));
  const eventsList=byId('events-list');
  eventsList.innerHTML=events.map(([month,label])=>
    '<button type="button" data-month="'+month+'"><time datetime="'+month+'">'+month.slice(2).replace('-','.')+'</time><span>'+(label.startsWith('2월')?label.replace(' · ',' '):label.split(' · ').at(-1))+'</span></button>').join('');
  eventsList.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>selectTrend(button.dataset.month)));
  selectTrend(initial);
}

buttons('trend-tabs',trendWindows,renderTrend,'recent');
trendMonth.addEventListener('change',paintTrend);
renderTrend('recent');
let trendWidth=trendSvg.clientWidth;
new ResizeObserver(()=>{
  if(trendSvg.clientWidth!==trendWidth){
    trendWidth=trendSvg.clientWidth;
    paintTrend();
  }
}).observe(trendSvg);
