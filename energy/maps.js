'use strict';

const overviewMapViews = {
  world:{label:'세계',routes:['us-eu','gulf-asia','ru-india','au-kr','qa-kr'],nodes:['us','portarthur','eu','hormuz','jamnagar','korea','australia'],initial:'gulf-asia'},
  gulf:{label:'호르무즈',bounds:[[33,16],[62,34]],routes:['ew','adcop','qa-hormuz','iran-oil','iraq-oil','oman-lng'],nodes:['yanbu','abqaiq','fujairah','qatar','hormuz','iran','jask','oman','ruwais'],initial:'hormuz'},
  russia:{label:'러시아·유럽',bounds:[[6,37],[84,71]],routes:['nord','ukraine','turk','ru-products','ru-india'],nodes:['primorsk','novorossiysk','moscow','ryazan','saratov','yaroslavl','omsk'],initial:'yaroslavl'},
  asia:{label:'아시아',bounds:[[48,-29],[147,43]],routes:['gulf-asia','iran-china','qa-kr','au-kr','my-kr','korea-products'],nodes:['jamnagar','singapore','korea','china','japan','australia'],initial:'qa-kr'},
  korea:{label:'한국 시설',bounds:[[123.3,32.7],[132.8,39]],routes:['korea-products'],nodes:['incheon','daesan','ulsan','onsan','yeosu','pyeongtaek','tongyeong'],initial:'ulsan'}
};

const sitesOnMap = {
  jurong:['주롱 암반 저장고','사우디 원유 저장 계획','2027년 하반기 목표','싱가포르와 사우디의 공동 의향이며 집행 전이다.','jurongCrude'],
  afrodite:['북해 Afrodite 평가정','가스·콘덴세이트','7,700만~1억 8,000만 boe · 회수 가능 자원 추정','35/7-2 평가정이다. 기존 Kvitebjørn 시설로 연결하는 방안을 검토 중이다.','afrodite'],
  bontang:['Bontang LNG','인도네시아 액화시설','기존 Train F 재가동 계획','동칼리만탄의 두 심해 가스 허브를 기존 국내 가스망과 LNG 공장에 연결할 계획이다.','eniFid'],
  novosam:['노보쿠이비셰프스크','러시아 정유 시설','10월 30일 피격 보도','사마라 지역 시설이다. 공정별 피해와 실제 처리량 손실은 확인되지 않았다.','ruStrikesOct'],
  novoil:['바슈네프트 노보일','러시아 정유 시설','10월 31일 피격 정황','우파 정유단지의 시설이다. 실제 정지량은 확인되지 않았다.','ruStrikesOct'],
  norsi:['NORSI · 크스토보','러시아 정유 시설','11월 1일 인근 산업시설 피해','주지사 발표는 피해 시설의 이름을 명시하지 않았다.','ruStrikesOct'],
  kalimantan:['칼리만탄','인도네시아 연료탄 선적','','동칼리만탄 연료탄 선적의 대표 지점이다.','ieacoal'],
  newcastle:['뉴캐슬','호주 석탄 선적','','호주 동부 석탄 선적 거점이다.','ieacoal'],
  jamnagar:['잠나가르','인도 정유·석유화학','140만 배럴/일 · 설비능력','Reliance가 발표한 원유 처리능력이다. 원유 선적을 받아 휘발유·경유 등 제품을 생산하고 수출할 수 있는 정유·항만 거점이다.','reliance'],
  ruwais:['루와이스','UAE 정유·석유화학','92.2만 배럴/가동일 이상','ADNOC 설비 자료의 가동일 기준이다. 경유·나프타·항공유를 생산한다. 걸프 안에서 선적하는 제품은 호르무즈 통항에 노출된다.','adnoc'],
  portarthur:['포트아서','미국 정유','73만 배럴/일 · 운영사 제시','텍사스 걸프연안의 정유 거점이다. 수치는 운영사가 공시한 총 처리 규모이며 2026년 실측 투입량이 아니다.','motiva'],
  hormuz:['호르무즈 해협','항로 병목','2분기 석유 2,100만 → 490만 배럴/일','2025년과 2026년 2분기 평균이다. LNG 통과는 110억 → 8억 입방피트/일로 줄었다.','hormuz'],
  qatar:['라스라판','LNG 액화·선적','2025년 한국향 730만 톤','GIIGNL 국가 간 LNG 교역량이다. 카타르 선적이 호르무즈 통항과 액화설비 가동에 동시에 노출된다.','qatar'],
  yanbu:['얀부','원유 수출항','','사우디 동서횡단 배관을 통해 홍해 쪽에서 원유를 선적할 수 있다.','bypass'],
  abqaiq:['아브카이크','원유 배관·처리','','사우디 동서횡단 원유 배관으로 이어지는 공급 계통이다.','bypass'],
  fujairah:['푸자이라','원유 수출항','','하브샨에서 오는 원유를 호르무즈 바깥 오만만에서 선적할 수 있다.','bypass'],
  iran:['카르그섬','이란 원유 수출','','이란산 원유의 주요 출하 거점이다. 지도 선은 대표 수출 경로를 표시한다.','hormuz'],
  jask:['자스크','이란 원유 수출항','','고레–자스크 배관이 호르무즈 동쪽 오만만에 연결된다.','irantrade'],
  oman:['칼하트','LNG 액화·수출','','오만의 LNG 터미널은 호르무즈 밖 인도양 쪽에 있다.','qatar'],
  primorsk:['프리모르스크','발트해 원유 수출','','러시아 발트해 수출의 주요 거점이다. 인도향 선은 러시아산 원유 교역을 나타낸다.','pipe'],
  novorossiysk:['노보로시스크','흑해 수출항','','흑해에서 원유와 석유제품을 선적하는 거점이다.','pipe'],
  moscow:['모스크바','러시아 정유 시설','25만 배럴/일 · 명목','IEA 9월 보고서에 따르면 2026년 6월 공격 후 2027년 초까지 가동 중단이 예상됐다. 현재 가동 상태는 확인되지 않았다.','russia'],
  ryazan:['랴잔','러시아 정유 시설','34.2만 배럴/일 · 명목','10월 14일 피격 주장을 우크라이나가 반박했다. 15일 화재가 별도로 보고됐다. 실제 투입 감소는 미확인이다.','ryazan'],
  saratov:['사라토프','러시아 정유 시설','13.5만 배럴/일 · 명목','10월 14일 러시아 측 피격 주장과 우크라이나 측 반박이 있었다. 피해로 줄어든 처리량은 확인되지 않았다.','novak'],
  yaroslavl:['야로슬라블','러시아 정유 시설','','2026년 11월 3일 시설 피해가 보고됐다. 사건으로 감소한 처리량은 확인되지 않았다.','yar'],
  omsk:['옴스크','러시아 정유 시설','45만 배럴/일 · 명목','IEA가 인용한 설비 능력이다. 2026년 7월 7일 공격을 받았다.','russia'],
  kitimat:['키티맷','캐나다 LNG 액화·수출','','캐나다 서해안에서 선적해 태평양을 건넌다.','cerlng'],
  uscrude:['미국 걸프연안','원유 선적','','WTI 미들랜드를 포함한 미국 원유를 유럽과 아시아로 수출하는 거점이다.','ceramargins'],
  us:['미국 걸프연안','LNG 액화·선적','2025년 유럽향 7,380만 톤','미국에서 유럽으로 인도된 국가 간 교역량이다. 지도 점은 걸프연안의 대표 위치다.','qatar'],
  eu:['유럽 수입 거점','LNG 인도·재기화','','유럽은 LNG를 들여와 재기화한 뒤 배관·저장소와 연결한다. 유럽 총량에는 GIIGNL 분류에 따라 EU 밖 국가도 포함된다.','qatar'],
  australia:['호주 서북부','LNG 수출','2025년 한국향 1,540만 톤','호주 전체에서 한국으로 도착한 교역량이다. 지도 점은 서북부 대표 터미널 위치다.','qatar'],
  korea:['한국','원유·LNG 수입','','수입 원유는 해안 정유단지, LNG는 수입기지로 들어온다. 한국 시설 보기에서 거점을 확인할 수 있다.','krplants'],
  india:['인도','정유·원유 수입','','러시아 원유의 주요 아시아 수입국이다.','pipe'],
  singapore:['싱가포르','제품 교역·가격','','아시아 휘발유·경유·등유의 도매 지표가 형성되는 교역 거점이다.','keei'],
  china:['중국','정유·LNG 수입','','동시베리아 배관 가스와 해상 LNG를 들여오며, 아시아 석유제품 수급에도 영향을 미친다.','pipe'],
  japan:['일본','LNG 수입·발전','','가스 발전용 연료를 해상 LNG로 조달하는 주요 수입국이다.','qatar'],
  incheon:['인천','정유·LNG','','SK인천석유화학 정유시설과 인천 LNG 인수기지가 있는 지역이다.','krplants'],
  daesan:['대산','정유·석유화학','','HD현대오일뱅크의 정유 거점이다.','krplants'],
  ulsan:['울산','정유·석유화학','','SK의 대규모 정유·석유화학 단지다. 원유 도입에서 제품 출하까지 이어진다.','krplants'],
  onsan:['온산','정유·석유화학','58만 배럴/일 · 상압증류','S-OIL 상압증류 3기 합계다. 콘덴세이트 분별 8.9만, 수첨분해 7.5만 배럴/일은 각각 별도 공정 능력이다.','soilref'],
  yeosu:['여수','정유·석유화학','','GS칼텍스 정유 시설이 있는 남해안 거점이다.','krplants'],
  pyeongtaek:['평택','LNG 인수·재기화','','수입 LNG를 하역하고 저장한 뒤 기화해 배관망에 송출하는 거점이다.','kogas'],
  tongyeong:['통영','LNG 인수·재기화','','남해안의 LNG 하역·저장·재기화 거점이다.','kogas']
};

const extraPoints={jurong:[103.69,1.27],afrodite:[3.4,61.3],bontang:[117.5,.11],novosam:[49.97,53.12],novoil:[56.12,54.87],norsi:[44.13,56.10],kalimantan:[117.58,-0.94],newcastle:[151.78,-32.92],kitimat:[-128.69,54.01],uscrude:[-93.9,29.73],ryazan:[39.75,54.62],saratov:[46.02,51.53],moscow:[37.8,55.64],jask:[57.75,25.67],jamnagar:[69.88,22.35],ruwais:[52.73,24.11],portarthur:[-93.99,29.91],yaroslavl:[39.88,57.55],omsk:[73.28,55.1],onsan:[129.34,35.44],pyeongtaek:[126.79,36.95],tongyeong:[128.43,34.87]};
const mapColors={oil:'#b45424',lng:'#007582',pipe:'#6853ad',products:'#a24470',historic:'#687482',coal:'#60732c'};
const kindNames={oil:'원유 경로',lng:'LNG 경로',pipe:'가스 배관',products:'석유제품 경로',historic:'중단·비가동',coal:'연료탄 항로'};
const regionLabels={
  gulf:[['이란',53,30.4],['사우디아라비아',45,21],['UAE',54.8,23.2],['오만',58,20.4],['이라크',44,31.9],['홍해',36.5,21]],
  russia:[['러시아',61,63],['우크라이나',31.8,47.7],['튀르키예',34,39],['유럽연합',15,49.3]],
  asia:[['인도',76,18],['중국',106,32],['호주',128,-21],['인도양',88,-12]],
  korea:[['한국',127.6,36.45],['동해',131.2,37.4],['황해',124.5,36.4]]
};

function mapRegion(region,label,routes,nodes,initial) {
  return {region,label,bounds:overviewMapViews[region]?.bounds,routes,nodes,initial};
}

const mapProfiles={
  overview:{initial:'gulf',views:Object.fromEntries(Object.entries(overviewMapViews).map(([key,view])=>[key,{...view,region:key}]))},
  oil:{initial:'gulf',views:{
    world:mapRegion('world','세계',['us-europe-oil','gulf-asia','ru-india','iran-china'],['uscrude','primorsk','hormuz','india','china'],'gulf-asia'),
    gulf:mapRegion('gulf','호르무즈·우회로',['ew','adcop','iran-oil','iraq-oil','redsea','yanbu-asia'],['yanbu','abqaiq','fujairah','hormuz','iran','jask'],'hormuz'),
    russia:mapRegion('russia','러시아·유럽',['ru-india','us-europe-oil'],['primorsk','novorossiysk'],'primorsk'),
    asia:mapRegion('asia','아시아',['gulf-asia','iran-china','ru-india'],['india','jamnagar','china','korea','jurong'],'iran-china')
  }},
  products:{initial:'world',views:{
    world:mapRegion('world','세계',['ru-products','india-products','korea-products','gulf-products-asia'],['portarthur','novorossiysk','jamnagar','ruwais','singapore'],'india-products'),
    gulf:mapRegion('gulf','걸프',['gulf-products-asia'],['hormuz','ruwais'],'hormuz'),
    russia:mapRegion('russia','러시아·유럽',['ru-products'],['novorossiysk','moscow','ryazan','saratov','yaroslavl','omsk','novosam','novoil','norsi'],'ryazan'),
    asia:mapRegion('asia','아시아',['gulf-products-asia','india-products','korea-products'],['jamnagar','singapore','korea'],'gulf-products-asia'),
    korea:mapRegion('korea','한국 정유',['korea-products'],['incheon','daesan','ulsan','onsan','yeosu'],'onsan')
  }},
  power:{initial:'asia',views:{
    asia:{...mapRegion('asia','아시아',['id-cn-coal','au-jp-coal'],['kalimantan','newcastle','china','japan'],'id-cn-coal'),bounds:[[100,-37],[158,42]]}
  }},
  gas:{initial:'world',views:{
    world:mapRegion('world','세계 LNG',['us-eu','us-kr','ca-asia','qa-cn','qa-eu','au-jp'],['kitimat','us','eu','qatar','australia','japan'],'us-eu'),
    pacific:{...mapRegion('world','태평양 LNG',['ca-asia','au-jp','au-kr'],['kitimat','australia','japan','korea'],'ca-asia'),rotate:[180,0]},
    gulf:mapRegion('gulf','걸프 LNG',['qa-hormuz','oman-lng'],['qatar','hormuz','oman'],'hormuz'),
    russia:{...mapRegion('russia','유럽 가스관',['nord','ukraine','yamal','turk','norwaypipe'],['eu','afrodite'],'ukraine'),bounds:[[0,37],[84,71]]},
    asia:mapRegion('asia','아시아 LNG',['qa-cn','qa-kr','au-jp','au-cn','au-kr','my-kr','om-kr','ca-asia'],['qatar','australia','korea','china','japan','bontang'],'qa-kr'),
    east:{...mapRegion('east','러시아·중국 가스관',['siberia'],['china'],'siberia'),bounds:[[88,29],[143,65]]},
    korea:mapRegion('korea','한국 LNG기지',['qa-kr','au-kr','us-kr'],['incheon','pyeongtaek','tongyeong'],'pyeongtaek')
  }}
};

const commodityHormuz=Object.fromEntries(['oil','products','gas'].map((key,i)=>[key,hormuzQuarterFlows[i]]));
const mapResearch=new Map([
  [['ew','adcop','yanbu','abqaiq','fujairah','yanbu-asia'],'gulf-outlets','걸프 우회 배관·수출항'],
  [['iran','jask','iran-oil','iran-china'],'iran-routes','이란 수출 경로'],
  [['moscow','ryazan','saratov','yaroslavl','omsk','novosam','novoil','norsi'],'refinery-damage','러시아 정유시설 피해·가동'],
  [['jamnagar','ruwais','portarthur','daesan','ulsan','onsan','yeosu'],'refinery-table','주요 정유시설 용량'],
  [['qa-hormuz','qatar','qa-kr','qa-cn','qa-eu'],'lng-transmission','카타르 선적 차질·대체 물량'],
  [['us-eu','us-kr','ca-asia','kitimat','us'],'lng-netback','LNG 목적지별 선적'],
  [['afrodite','bontang'],'lng-deliveries','가스전·액화시설 개발'],
  [['nord','ukraine','yamal','turk','norwaypipe','eu'],'winter-gas','유럽 가스 저장·배관 공급'],
  [['jurong'],'oil-buffers','사우디 원유 해외 비축'],
  [['ru-products','india-products','korea-products','gulf-products-asia'],'product-shipping','석유제품선 운임']
].flatMap(([ids,target,label])=>ids.map(id=>[id,[target,label]])));
const mapFallbackResearch={
  overview:['physical-crude','원유·제품 수출 회복'],oil:['crude-transmission','원유 물량·운임'],products:['diesel-transmission','경유 공급·가격'],
  gas:['lng-trade','LNG 교역·유량'],power:['coal-export-shift','연료탄 수출 물량'],
  food:['food-actual-trade','밀·대두 신고 물량'],copper:['copper-actual-trade','품목별 중국 수입량']
};

const coalRoutes=[
  {id:'id-cn-coal',label:'인도네시아 → 중국',kind:'coal',
    coords:[[117.58,-0.94],[119.6,1],[120.5,5],[117.8,12],[116,19],[120,25.5],[121.55,29.88]],
    detail:'IEA는 중국의 수입 둔화가 2025년 인도네시아 연료탄 수출 감소의 주요 원인이라고 분석한다. 이 선은 대표 경로이며 화물 추적 실측 경로는 아니다.',source:sources.ieacoal[2]},
  {id:'au-jp-coal',label:'호주 → 일본',kind:'coal',
    coords:[[151.78,-32.92],[157,-23],[155,-8],[148,10],[145,23],[143,32],[139.75,35.67]],
    detail:'일본은 호주산 연료탄의 주요 수입시장이다. 이 선은 대표 경로이며 항로별 물량은 표시하지 않는다.',source:sources.ieacoal[2]}
];

const tradeRoutes=[];
for(const [desk,layers] of Object.entries(commodityTrade)) {
  const views={};
  for(const [key,{label,product,code,year,color,rows}] of Object.entries(layers)) {
    const routes=[],nodes=new Set();
    const largest=Math.max(...rows.map(([, ,tonnes])=>tonnes));
    mapColors[key]=color;
    kindNames[key]=product;
    rows.forEach(([from,to,tonnes,source,reporter],index)=>{
      const id='trade-'+key+'-'+index;
      routes.push(id);
      tradeRoutes.push({
        id,kind:key,label:tradeCountries[from][0]+' → '+tradeCountries[to][0],
        coords:[tradeCountries[from][1],tradeCountries[to][1]],value:tonnes/1e6,unit:'백만 톤',
        digits:2,width:1.1+3.6*Math.sqrt(tonnes/largest),period:year+'년 · '+reporter,
        detail:'HS '+code+' · '+num(tonnes,0)+'톤. 국가 간 신고량을 연결한 선이다.',
        source:sources[source][2]
      });
      for(const country of [from,to]) {
        const node='trade-'+key+'-'+country;
        if(nodes.has(node)) continue;
        nodes.add(node);
        const [name,point]=tradeCountries[country];
        sitesOnMap[node]=[name,product,'','교역 연결을 선택하면 신고량과 신고 기준을 볼 수 있다.',source];
        extraPoints[node]=point;
      }
    });
    views[key]={label,routes,nodes:[...nodes],initial:routes[0],region:'world',rotate:desk==='copper'?[-55,0]:[0,0]};
  }
  mapProfiles[desk]={views,initial:Object.keys(views)[0]};
}

let mapData;
let mapRoutes;
let mapCountries;
function createSupplyMap(host) {
  const kind=host.dataset.map;
  const {views,initial}=mapProfiles[kind];
  const geo=host.querySelector('svg');
  const routeSelect=host.querySelector('[data-route-select]');
  const mapDetail=host.querySelector('[data-map-detail]');
  const mapCanvas=host.querySelector('.map-canvas');
  const mapViewport=document.createElement('div');
  mapViewport.className='map-viewport';
  mapCanvas.before(mapViewport);
  mapViewport.append(mapCanvas,mapDetail);
  const message=host.querySelector('[data-map-message]');
  const tabs=byId(host.id+'-tabs');
  let mapView=initial;
  let selectedRoute;

  function showMapEvidence(id,tag,title,value,period,description,sourceUrl,sourceLabel) {
    const [target,label]=id==='hormuz'
      ? kind==='gas'?mapFallbackResearch.gas:kind==='products'?mapFallbackResearch.products:['sea-flows','호르무즈 통과량·우회로']
      : mapResearch.get(id)??mapFallbackResearch[kind];
    mapDetail.innerHTML='<div class="map-fact"><span>'+tag+'</span><strong>'+title+'</strong>'+
      (value?'<b>'+value+'</b>':'')+(period?'<small class="map-period">'+period+'</small>':'')+'</div>'+
      '<div class="map-evidence"><p>'+description+'</p><div class="map-actions"><a href="#'+target+'">'+label+' ↗</a>'+anchor(sourceUrl,sourceLabel)+'</div></div>';
  }

  function describeMap(id) {
    selectedRoute=id;
    routeSelect.value=id;
    geo.querySelectorAll('[data-map-id]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.mapId===id)));
    const site=sitesOnMap[id];
    if(site) {
      const [title,tag,value,detail,source]=site;
      const hormuz=id==='hormuz'&&commodityHormuz[kind];
      const mapTag=hormuz?hormuz[1]+' 통과량':tag;
      const mapValue=hormuz?hormuz[3].slice(1).map(x=>num(x)).join(' → ')+' '+hormuz[2]:value;
      const period=hormuz?'2026년 1분기 → 2분기 일평균':id==='hormuz'?'2025년 2분기 → 2026년 2분기':'';
      showMapEvidence(id,mapTag,title,mapValue,period,detail,sources[source][2],source==='hormuz'?'EIA':'원자료');
      return;
    }
    const route=mapRoutes.get(id);
    const amount=route.value==null?'':num(route.value,route.digits??1)+' '+route.unit;
    const tag=['ew','adcop'].includes(route.id)?'원유 우회 배관':kindNames[route.kind];
    const period=route.period??(route.kind==='lng'&&route.value!=null?'2025년 도착량 · GIIGNL':'');
    showMapEvidence(id,tag,route.label,amount,period,route.detail,route.source,'원자료');
  }
  routeSelect.addEventListener('change',()=>describeMap(routeSelect.value));

  function render() {
    if(!mapData||!geo.clientWidth) return;
    const view=views[mapView];
    const width=Math.max(290,geo.clientWidth);
    const height=width<480?228:Math.round(Math.min(kind==='overview'?247:340,width*.5));
    const svg=d3.select(geo).attr('viewBox','0 0 '+width+' '+height);
    svg.selectAll('*').remove();
    svg.append('title').text(view.label+' · '+geo.getAttribute('aria-label'));
    const countries=mapCountries;
    const extent=[[22,19],[width-22,height-19]];
    const projection=view.bounds ?
      d3.geoMercator().fitExtent(extent,{type:'MultiPoint',coordinates:view.bounds}) :
      d3.geoNaturalEarth1().rotate(view.rotate||[0,0]).fitExtent(extent,{type:'FeatureCollection',features:countries});
    projection.clipExtent([[0,0],[width,height]]);
    const path=d3.geoPath(projection);
    svg.append('path').datum(d3.geoGraticule10()).attr('d',path).attr('class','graticule');
    svg.append('g').selectAll('path').data(countries).join('path').attr('d',path).attr('class','country');
    svg.append('g').selectAll('text').data(regionLabels[view.region]||[]).join('text').attr('class','region-label')
      .attr('x',item=>projection(item.slice(1))[0]).attr('y',item=>projection(item.slice(1))[1]).text(item=>item[0]);
    const routes=view.routes.map(id=>mapRoutes.get(id));
    const facility=view.nodes.map(id=>({id,title:sitesOnMap[id][0],location:extraPoints[id]||mapData.points[id]}));
    function activate(selection,label,id) {
      selection.attr('tabindex',0).attr('role','button').attr('aria-label',label).attr('data-map-id',id)
        .on('click',()=>describeMap(id))
        .on('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();describeMap(id)}});
    }
    routes.forEach(route=>{
      const group=svg.append('g').attr('class','map-route').style('--route',mapColors[route.kind]);
      if(route.width) group.style('--route-width',route.width+'px');
      else if(route.kind==='lng'&&route.unit==='백만 톤/년'&&Number.isFinite(route.value)) {
        group.style('--route-width',1.2+route.value*.07+'px');
      }
      const line=path({type:'LineString',coordinates:route.coords});
      group.append('path').attr('d',line).attr('class','route-target');
      const dashed=['pipe','historic'].includes(route.kind)||['ew','adcop'].includes(route.id);
      group.append('path').attr('d',line).attr('class','route-stroke').attr('stroke-dasharray',dashed?'5 4':null);
      activate(group,route.label,route.id);
    });
    const occupied=[];
    facility.forEach(({id,title,location})=>{
      const [x,y]=projection(location);
      if(x<0||y<0||x>width||y>height) return;
      const group=svg.append('g').attr('class','map-node');
      group.append('circle').attr('cx',x).attr('cy',y).attr('r',10).attr('fill','transparent');
      group.append('circle').attr('class','node-point').attr('cx',x).attr('cy',y).attr('r',4);
      activate(group,title,id);
      const text=group.append('text').attr('class','node-text').text(title);
      const w=text.node().getComputedTextLength();
      const options=[[8,-8],[8,15],[-w-8,-8],[-w-8,15],[-w/2,-20],[-w/2,27],[-w/2,42],[-w/2,-35]];
      const pos=options.map(([dx,dy])=>[x+dx,y+dy]).find(([lx,ly])=>
        lx>3&&ly>13&&lx+w<width-3&&ly<height-2&&
        !occupied.some(([px,py,pw])=>lx<px+pw+4&&lx+w+4>px&&Math.abs(ly-py)<14));
      if(pos) {
        text.attr('x',pos[0]).attr('y',pos[1]);
        occupied.push([...pos,w]);
      } else {
        text.remove();
      }
    });
    const showsVolumes=routes.some(route=>route.kind==='lng'&&route.unit==='백만 톤/년'&&Number.isFinite(route.value));
    const legend=host.querySelector('[data-map-volume-legend]');
    if(legend) legend.hidden=!showsVolumes;
    const items=[...routes.map(route=>[route.id,route.label]),...facility.map(node=>[node.id,node.title])];
    routeSelect.replaceChildren(...items.map(([id,title])=>new Option(title,id)));
    describeMap(items.some(([id])=>id===selectedRoute)?selectedRoute:view.initial);
  }

  function select(region,id) {
    if(!views[region]) return;
    const view=views[region];
    mapView=region;
    selectedRoute=view.routes.includes(id)||view.nodes.includes(id)?id:view.initial;
    [...tabs.children].forEach(tab=>tab.setAttribute('aria-pressed',String(tab.dataset.key===region)));
    if(geo.clientWidth) render();
    else requestAnimationFrame(render);
  }
  buttons(tabs.id,views,key=>select(key),initial);
  let previousWidth=geo.clientWidth;
  new ResizeObserver(()=>{
    const width=geo.clientWidth;
    if(width!==previousWidth) {
      previousWidth=width;
      render();
    }
  }).observe(geo);
  return {
    select,
    ready(){message.hidden=true;render()},
    fail(){message.textContent='지도 데이터를 표시할 수 없다. 새로고침하면 다시 불러온다.'}
  };
}

const supplyMaps=new Map([...document.querySelectorAll('[data-map]')].map(host=>[host.id,createSupplyMap(host)]));
// The map file is read once. records.js draws its land outline from the same answer.
const energyMapFile=fetch('energy-data.json').then(response=>{
  if(!response.ok) throw new Error('지도 파일을 읽지 못했다.');
  return response.json();
});
energyMapFile.then(data=>{
  mapData=data;
  mapRoutes=new Map([...data.routes,...coalRoutes,...tradeRoutes].map(route=>[route.id,route]));
  mapCountries=data.world.features.filter(feature=>feature.properties.id!=='ATA');
  supplyMaps.forEach(map=>map.ready());
}).catch(error=>{
  supplyMaps.forEach(map=>map.fail());
  console.error(error);
});

function wireMapLinks(id) {
  byId(id).addEventListener('click',event=>{
    if(event.defaultPrevented||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey) return;
    const link=event.target.closest('[data-region][data-site]');
    if(link) supplyMaps.get(link.hash.slice(1))?.select(link.dataset.region,link.dataset.site);
  });
}
