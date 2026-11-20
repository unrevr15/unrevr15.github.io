'use strict';

const desks=[...document.querySelectorAll('[data-desk]')];
const deskTabs=[...document.querySelectorAll('[data-tab]')];
// Sub-views of each desk (redesign plan §3: 38 views, the 차질·계약 기록 view of
// records.js and the 분기 비교 view of peer-quarters.js: 40): [key, tab label, section
// ids]. The ref-* sections of reference-charts.js and the rig-activity section of rig-activity.js sit in views that were there. An id ending in '*' takes the desk's other sections whose id starts
// with the rest, in page order (subsidy.js builds one section per region).
// Sections a script did not build are skipped, a view left with none is
// dropped, and a desk's sections no view lists go to a '기타' view. The pane
// of a view is #view-<desk>-<key>. Keep the object strict JSON: the tests
// parse it (backend/tests/test_energy_frame.py).
const deskViews = {
  "war": [
    ["comparison", "현황·비교", ["investigation", "supply-history"]],
    ["iran", "이란·호르무즈", ["israel-iran", "escort-watch", "fleet"]],
    ["russia", "러시아·우크라이나", ["geopolitics"]]
  ],
  "oil": [
    ["supply", "공급·회복", ["crude-overview", "crude-transmission", "monthly-oil-supply", "chain", "physical-crude", "gulf-recovery", "sea-flows", "ref-chokepoints", "gulf-outlets"]],
    ["brent", "가격 구조", ["term-spreads", "brent-curve", "brent-market", "futures-physical"]],
    ["freight", "운임·선박", ["shipping", "td3c-case", "td3c-basis", "tanker-assets"]],
    ["stocks", "비축·재고", ["oil-balance", "oil-buffers", "stock-programs", "ref-crude-stocks"]],
    ["production", "생산·투자", ["upstream-investment", "rig-activity", "ref-rig-counts", "producer-netback", "offshore-cycle"]]
  ],
  "products": [
    ["overview", "요약·크랙", ["products-overview", "diesel-transmission", "oil-market"]],
    ["margins", "마진·가동", ["refinery-compare", "refinery-run-model", "refineries", "refinery-damage", "fuel-specs", "refinery-roster", "ref-refining-capacity", "ref-refining-plants"]],
    ["supply", "재고·교역", ["product-stocks", "us-winter-buffer", "diesel-exports-asia", "product-shipping", "brazil-sugar-mix"]]
  ],
  "supply": [
    ["overview", "요약", ["supply-summary"]],
    ["products", "석유제품", ["supply-distillate", "supply-gasoline", "supply-jet", "supply-light", "supply-resid"]],
    ["crude", "원유·가스", ["supply-crude", "supply-gas"]],
    ["runs", "가동·비축", ["supply-runs", "supply-reserves"]]
  ],
  "gas": [
    ["overview", "요약", ["gas-market", "lng-transmission", "gas-chain"]],
    ["supply", "교역·겨울", ["lng-trade", "winter-gas"]],
    ["contracts", "가격·계약", ["lng-deliveries", "qatar-cheniere", "lng-price-linkage"]],
    ["freight", "운송·선적", ["lng-netback", "lng-shipping", "lng-voyages"]]
  ],
  "power": [
    ["coal", "석탄", ["coal-trade", "whitehaven"]],
    ["generation", "발전비·요금", ["dispatch", "germany-power", "power-policy", "us-power-retail"]],
    ["datacenters", "데이터센터", ["datacenter-power", "ai-power-demand"]]
  ],
  "copper": [
    ["spot", "시장 신호", ["copper-physical"]],
    ["production", "공급·제련", ["copper-overview", "copper-production", "copper-smelting", "zambia-copper"]],
    ["demand", "수요·전가", ["copper-downstream"]]
  ],
  "food": [
    ["overview", "가격·수급", ["food-overview", "food-production", "food-downstream"]],
    ["processing", "투입·가공", ["food-inputs", "food-milling", "food-oils"]]
  ],
  "prices": [
    ["energy", "원가·소매", ["diesel-cost", "industry-prices-section"]],
    ["industry", "전가", ["industry-transmission", "industry-metals"]]
  ],
  "inflation": [
    ["overview", "전이", ["inflation-chain", "ref-cpi-weights", "ref-policy-support", "ref-climate-grain"]],
    ["subsidy", "연료 보조금", ["subsidy-overview", "subsidy-*"]]
  ],
  "companies": [
    ["overview", "요약", ["vc-overview"]],
    ["upstream", "상류", ["vc-offshore_drilling", "vc-land_drilling", "vc-oilfield_services", "vc-us_producers", "vc-intl_producers"]],
    ["midstream", "운송·LNG", ["vc-midstream_tankers", "vc-lng"]],
    ["downstream", "정유·화학", ["vc-refining", "vc-asia_refining", "vc-petrochemicals", "vc-end_demand"]],
    ["power", "전력·소재", ["vc-coal_power", "vc-copper", "vc-food_ag"]],
    ["records", "차질·계약 기록", ["records-disruptions", "records-contracts"]],
    ["peers", "분기 비교", ["peer-quarters", "ref-companies-fleet", "ref-companies-refining", "ref-companies-filings"]]
  ],
  "sources": [
    ["coverage", "제품별 수급 자료", ["supply-method"]],
    ["references", "출처 목록", ["source-list"]]
  ]
};
// Panes of the views before the 38-view structure, so saved links still open
// the view that took over their first section.
const formerViews = {
  "view-war-sanctions": "view-war-iran",
  "view-oil-overview": "view-oil-supply",
  "view-products-cracks": "view-products-overview",
  "view-products-plants": "view-products-margins",
  "view-products-freight": "view-products-supply",
  "view-products-biofuel": "view-products-supply",
  "view-supply-distillate": "view-supply-products",
  "view-supply-gasoline": "view-supply-products",
  "view-supply-jet": "view-supply-products",
  "view-supply-light": "view-supply-products",
  "view-supply-resid": "view-supply-products",
  "view-supply-gas": "view-supply-crude",
  "view-supply-reserves": "view-supply-runs",
  "view-supply-method": "view-sources-coverage",
  "view-copper-overview": "view-copper-production",
  "view-food-crops": "view-food-overview",
  "view-food-prices": "view-food-overview",
  "view-prices-metals": "view-prices-industry",
  "view-inflation-subsidy-countries": "view-inflation-subsidy",
  "view-companies-producers": "view-companies-upstream",
  "view-companies-materials": "view-companies-power"
};

const listedSections=new Set(Object.values(deskViews).flatMap(groups=>groups.flatMap(([, , ids])=>ids)));
const deskNavigation=new Map();
for(const [deskId,groups] of Object.entries(deskViews)) {
  const desk=byId(deskId);
  if(!desk) continue;
  const own=prefix=>[...desk.children].filter(el=>el.id.startsWith(prefix)&&!listedSections.has(el.id));
  const built=groups.map(([key,label,ids])=>[key,label,ids.flatMap(id=>id.endsWith('*')?own(id.slice(0,-1)):[byId(id)].filter(Boolean))])
    .filter(([, , sections])=>sections.length);
  const placed=new Set(built.flatMap(([, , sections])=>sections));
  const loose=[...desk.children].filter(el=>el.matches('.section[id]')&&!listedSections.has(el.id)&&!placed.has(el));
  if(loose.length) built.push(['more','기타',loose]);
  if(!built.length) continue;
  const previousNav=desk.querySelector(':scope > .section-jump');
  const previousLinks=[...(previousNav?.querySelectorAll('a')??[])];
  const nav=document.createElement('div');
  nav.className='desk-navigation';
  const tabs=document.createElement('nav');
  tabs.className='desk-views';
  tabs.setAttribute('aria-label','분석 화면');
  const picker=document.createElement('select');
  picker.className='view-picker';
  picker.setAttribute('aria-label','현재 화면의 상세 항목');
  nav.append(tabs,picker);
  if(previousNav) previousNav.replaceWith(nav);
  else desk.firstElementChild.after(nav);

  const views=built.map(([key,label,sections])=>{
    const pane=document.createElement('div');
    pane.id='view-'+deskId+'-'+key;
    pane.dataset.view=label;
    pane.className='desk-pane';
    const tab=document.createElement('a');
    tab.href='#'+pane.id;
    tab.textContent=label;
    tabs.append(tab);
    const locations=new Map();
    for(const section of sections) {
      const title=section.querySelector('h2,h3')?.textContent??label;
      locations.set(section.id,title);
      pane.append(section);
    }
    for(const link of previousLinks) {
      const id=link.hash.slice(1);
      // The pane is not in the document yet; getElementById cannot see into it.
      if(id&&pane.querySelector('#'+CSS.escape(id))) locations.set(id,link.textContent);
    }
    desk.append(pane);
    return {pane,tab,locations};
  });
  picker.addEventListener('change',()=>{
    if(picker.value) navigateDesk(byId(picker.value));
  });
  const measureNav=()=>desk.style.setProperty('--desk-nav-height',nav.offsetHeight+'px');
  new ResizeObserver(measureNav).observe(nav);
  deskNavigation.set(deskId,{views,picker,measureNav});
}

history.scrollRestoration='manual';
const topBar=document.querySelector('.top');
const sheetButton=topBar.querySelector('.desk-sheet-button');
const topViews=topBar.querySelector('.top-views');
const phoneHeader=matchMedia('(max-width:760px)');
function updateHeaderOffset() {
  document.documentElement.style.setProperty('--header-offset',topBar.offsetHeight+12+'px');
}
new ResizeObserver(updateHeaderOffset).observe(topBar);
updateHeaderOffset();
// Phone header (plan §5.4): one row of desk button, the desk's view tabs and
// search. The button opens the desk list; the row hides while the reader
// scrolls down and comes back on any scroll up.
function setSheet(open) {
  topBar.classList.toggle('sheet-open',open);
  sheetButton.setAttribute('aria-expanded',String(open));
}
sheetButton.addEventListener('click',()=>setSheet(!topBar.classList.contains('sheet-open')));
document.addEventListener('keydown',event=>{
  if(event.key!=='Escape'||!topBar.classList.contains('sheet-open')) return;
  setSheet(false);
  sheetButton.focus();
});
phoneHeader.addEventListener('change',()=>{
  setSheet(false);
  topBar.classList.remove('top-hidden');
});
topBar.addEventListener('focusout',event=>{
  if(event.relatedTarget&&!topBar.contains(event.relatedTarget)) setSheet(false);
});
// Only the reader's own scrolling (wheel, touch, keys) moves the header; jumps
// from links, search, Back and the browser's scroll anchoring do not.
let readerScrolling=false;
for(const type of ['wheel','touchmove','keydown']) window.addEventListener(type,()=>{readerScrolling=true},{capture:true,passive:true});
function holdHeader() {
  readerScrolling=false;
  topBar.classList.remove('top-hidden');
}
let lastScrollY=window.scrollY;
let scrollFrame=0;
window.addEventListener('scroll',()=>{
  if(scrollFrame) return;
  scrollFrame=requestAnimationFrame(()=>{
    scrollFrame=0;
    if(!readerScrolling) {
      lastScrollY=window.scrollY;
      return;
    }
    const delta=window.scrollY-lastScrollY;
    if(Math.abs(delta)<8) return;
    lastScrollY=window.scrollY;
    topBar.classList.toggle('top-hidden',phoneHeader.matches&&delta>0&&window.scrollY>topBar.offsetHeight&&!topBar.classList.contains('sheet-open'));
  });
},{passive:true});
function currentTarget() {
  const id=location.hash.slice(1);
  try {
    const name=decodeURIComponent(id);
    return id&&(byId(name)||formerViews[name]&&byId(formerViews[name]))||byId('monitor');
  } catch {
    return byId('monitor');
  }
}
function keepTabVisible(tab) {
  const bar=tab.closest('.desk-views,.desk-tabs,.top-views');
  if(bar.scrollWidth<=bar.clientWidth) return;
  const item=tab.getBoundingClientRect();
  const area=bar.getBoundingClientRect();
  if(item.left<area.left) bar.scrollLeft+=item.left-area.left;
  else if(item.right>area.right) bar.scrollLeft+=item.right-area.right;
}
function revealDesk(target,move) {
  const selected=target.closest('[data-desk]')||byId('monitor');
  desks.forEach(desk=>{desk.hidden=desk!==selected});
  deskTabs.forEach(tab=>{
    if(tab.dataset.tab===selected.dataset.desk) {
      tab.setAttribute('aria-current','page');
      sheetButton.firstElementChild.textContent=tab.textContent;
      keepTabVisible(tab);
    } else tab.removeAttribute('aria-current');
  });
  const navigation=deskNavigation.get(selected.id);
  let activePane;
  if(navigation) {
    const {views,picker,measureNav}=navigation;
    const activeView=views.find(({pane})=>pane.contains(target))??views[0];
    activePane=activeView.pane;
    for(const {pane,tab} of views) {
      pane.hidden=pane!==activePane;
      if(pane===activePane) tab.setAttribute('aria-current','location');
      else tab.removeAttribute('aria-current');
    }
    picker.hidden=activeView.locations.size<2;
    if(!picker.hidden) {
      picker.replaceChildren(new Option('이 화면에서 이동',''),...Array.from(activeView.locations,([id,label])=>new Option(label,id)));
      picker.value=activeView.locations.has(target.id)?target.id:'';
    }
    keepTabVisible(activeView.tab);
    measureNav();
  }
  topViews.replaceChildren(...(navigation?.views.map(({tab})=>tab.cloneNode(true))??[]));
  const topTab=topViews.querySelector('[aria-current]');
  if(topTab) keepTabVisible(topTab);
  if(!move) return;
  holdHeader();
  if(target===selected||target===activePane||target.id==='main') {
    window.scrollTo({top:0,behavior:'instant'});
  } else {
    for(let ancestor=target.parentElement;ancestor&&ancestor!==selected;ancestor=ancestor.parentElement) {
      if(ancestor.tagName==='DETAILS') ancestor.open=true;
    }
    target.scrollIntoView({block:'start',behavior:'instant'});
  }
}
function navigateDesk(target) {
  const hash='#'+target.id;
  if(location.hash!==hash) {
    history.replaceState({scrollY:window.scrollY},'');
    history.pushState(null,'',hash);
  }
  revealDesk(target,true);
}
document.addEventListener('click',event=>{
  if(topBar.classList.contains('sheet-open')&&!event.target.closest('.desk-sheet,.desk-sheet-button')) setSheet(false);
  if(event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey) return;
  const link=event.target.closest('a[href^="#"]');
  if(!link||!link.hash) return;
  const target=byId(link.hash.slice(1));
  if(!target) return;
  event.preventDefault();
  navigateDesk(target);
  setSheet(false);
  if(event.detail===0) {
    target.setAttribute('tabindex','-1');
    target.focus({preventScroll:true});
  }
});
let locationFrame;
function restoreLocation() {
  setSheet(false);
  cancelAnimationFrame(locationFrame);
  locationFrame=requestAnimationFrame(()=>{
    const saved=history.state?.scrollY;
    revealDesk(currentTarget(),!Number.isFinite(saved));
    if(Number.isFinite(saved)) {
      holdHeader();
      window.scrollTo({top:saved,behavior:'instant'});
    }
  });
}
window.addEventListener('hashchange',restoreLocation);
window.addEventListener('popstate',restoreLocation);
revealDesk(currentTarget(),Boolean(location.hash));

// 기준 줄 of the monitor (plan §3): the research date is in index.html, the
// time the prices were fetched comes with the live payload.
const liveLayer=(typeof energyLive!=='undefined'&&energyLive)||null;
if(liveLayer?.live.fetched_at) byId('monitor-basis').insertAdjacentHTML('beforeend',
  '<span>시세 자동 갱신 <b>'+liveLayer.esc(liveLayer.kst(liveLayer.live.fetched_at))+'</b></span>');

renderBalances('refining',byId('oil-throughput'));
renderBalances('gas',byId('gas-storage'));
for(const [id,label,unit,values] of hormuzQuarterFlows){
  byId(id).innerHTML='<p class="note">'+unit+' · 2026년 2분기까지 '+ref('hormuz','EIA/Vortexa')+'</p>'+
    comparisonChart([[label,values]],hormuzQuarterLabels)+
    '<details class="method"><summary>2025·2026년 2분기 비교</summary><div></div></details>';
  renderBalances('flows',byId(id).querySelector('details>div'),id==='crude-flows'?['석유 전체',label]:[label]);
}
renderBalances('stocks',byId('crude-stocks'),['전략비축유(SPR)','상업 원유']);
renderBalances('stocks',byId('product-stock-comparison'),['중간유분','휘발유','등유형 항공유']);
renderBalances('korea',byId('korea-imports'));
byId('sea-flows-data').innerHTML=marketTable(['집계 범위','백만 배럴/일'],[
  ['걸프 산유국 원유 수출','13.9'],
  ['호르무즈 통과 석유','10.9'],
  ['우회 수출','5.6']
])+'<p class="note context-caption">IEA의 2026년 9월 추정이다. 호르무즈 통과 석유에는 정제제품도 포함된다. 각 행은 집계 범위가 다르다. '+ref('ieaoil','IEA')+'</p>';
const quarterLabels=['2026년 1분기','2026년 2분기','2026년 3분기'];
const crudeQuarterPrices=[
  ['브렌트 원유',[80.5,104.4,97.1]],['WTI 원유',[72,93.2,86.3]],['두바이유',[74.7,88.4,83.2]]
];
const gasQuarterPrices=[
  ['유럽 천연가스',[13.63,15.58,21.53]],['일본 LNG 수입가',[11.41,13.44,15.12]],['미국 천연가스',[4.75,2.95,2.87]]
];
function averageQuarter(monthly) {
  return [0,3,6].map(start=>monthly.slice(start,start+3).reduce((sum,price)=>sum+price,0)/3);
}
const market2026=monthlyMarket[2026];
const jetMonthly=[2.031,2.262,3.697,3.928,3.943,3.042,3.403,3.724,4.388];
const productQuarterPrices=[
  ['미국 걸프 디젤',market2026.diesel],
  ['미국 걸프 휘발유',market2026.gasoline],
  ['미국 걸프 항공유',jetMonthly]
].map(([label,monthly])=>[label,averageQuarter(monthly).map(price=>price*42)]);

const pctQoq=([,second,third])=>(third/second-1)*100;
const wtiQuarterPrices=averageQuarter(market2026.wti);
const productQuarterCracks=productQuarterPrices.map(([name,prices])=>[
  name,prices.map((price,i)=>price-wtiQuarterPrices[i])
]);
byId('quarter-cracks').innerHTML=comparisonChart(productQuarterCracks,quarterLabels,{digits:2})+
  '<p class="note context-caption">미국 걸프연안 제품 현물 − 쿠싱 WTI · 월평균 3개를 분기별로 단순 평균 '+ref('usd','디젤')+' '+ref('usg','휘발유')+' '+ref('jet','항공유')+' '+ref('wti','WTI')+'</p>';

const monitorRows=[
  [crudeQuarterPrices[0],'crude-quotes','달러/배럴'],[crudeQuarterPrices[1],'crude-quotes','달러/배럴'],
  [productQuarterPrices[0],'product-quotes','달러/배럴'],[['미국 디젤 크랙',productQuarterCracks[0][1]],'quarter-cracks','달러/배럴'],
  [gasQuarterPrices[0],'gas-quotes','달러/MMBtu'],[gasQuarterPrices[1],'gas-quotes','달러/MMBtu']
];
byId('quarter-monitor').innerHTML=marketTable(['지표','2분기','3분기','전분기비'],monitorRows.map(([[name,values],target,unit])=>[
  '<a href="#'+target+'">'+name+'</a><small>'+unit+'</small>',num(values[1],2),num(values[2],2),signedChange(pctQoq(values),1)+'%'
]),'ticker-table')+
  '<p class="note context-caption">분기 평균 '+ref('wbquarters','세계은행')+' '+ref('usd','EIA')+'</p>';

function renderPriceDetail(rows,digits=2) {
  const table=marketTable(['현물 지표','비교 월','2025','2026'],rows.map(([name,unit,month,past,now,source])=>[
    name+'<small>'+unit+' '+ref(source)+'</small>',month,num(past,digits),num(now,digits)
  ]));
  return exactData(table,'같은 달 전년 비교·출처');
}
const crudeMonthly=quoteRows.slice(0,2).map(([name,unit,month,past,now,,,source])=>[
  name,unit,month,past,now,source
]);
crudeMonthly.push(['두바이유','중동 · $/배럴','8월',dubai25,dubai26,'keei']);
byId('crude-quotes').innerHTML=comparisonChart(crudeQuarterPrices,quarterLabels)+
  '<p class="note context-caption">세계은행 분기 평균 '+ref('wbquarters','세계은행')+'</p>'+renderPriceDetail(crudeMonthly);

const productQuoteRows=[
  ['미국 걸프연안','9월',crackPeriods.us.rows,42,['usg','usd','jet']],
  ['싱가포르','8월',crackPeriods.aug.rows,1,['keei','keei','keei']]
];
const productMonthly=productQuoteRows.flatMap(([region,month,rows,multiplier,sourceIds])=>
  rows.map(([name,past,now],i)=>[name,region+' · $/배럴',month,past*multiplier,now*multiplier,sourceIds[i]])
);
byId('product-quotes').innerHTML=comparisonChart(productQuarterPrices,quarterLabels,{digits:2})+
  '<p class="note context-caption">EIA 월평균의 3개월 단순 평균 · 42갤런/배럴 '+ref('usd','디젤')+' '+ref('usg','휘발유')+' '+ref('jet','항공유')+'</p>'+renderPriceDetail(productMonthly);

const gasMonthly=benchmarks.slice(1,3).map(([name,now,unit,past])=>[name,unit,'8월',Number(past),Number(now),'keei']);
byId('gas-quotes').innerHTML=comparisonChart(gasQuarterPrices,quarterLabels,{digits:2})+
  '<p class="note context-caption">세계은행 분기 평균. 일본 수입가는 아래 아시아 LNG 현물지표(JKM)와 집계가 다르다. '+ref('wbquarters','세계은행')+'</p>'+
  renderPriceDetail(gasMonthly,1)+'<p class="note context-caption"><a class="ref" href="#industry-prices">산업용 가스·전기 가격 ↗</a></p>';
wireMapLinks('lng-trade');
wireMapLinks('sea-flows');
wireMapLinks('event-note');
