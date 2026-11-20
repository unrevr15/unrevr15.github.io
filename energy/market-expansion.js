'use strict';

function marketTable(heads, rows, className='') {
  return '<table class="market-table '+className+'"><thead><tr>'+heads.map(label=>'<th scope="col">'+label+'</th>').join('')+
    '</tr></thead><tbody>'+rows.map(([label,...cells])=>'<tr><th scope="row">'+label+'</th>'+
    cells.map(cell=>'<td>'+cell+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
}

function comparisonChart(rows,periods,{digits=1,signed=false,showSign=false}={}) {
  const max=Math.max(1,...rows.flatMap(([,values])=>values).filter(Number.isFinite).map(Math.abs));
  return '<div class="compare-chart'+(signed?' signed-chart':'')+'">'+
    '<div class="compare-key">'+periods.map((period,i)=>'<span class="compare-series-'+i+'"><i></i>'+period+'</span>').join('')+'</div>'+
    rows.map(([name,values])=>'<div class="compare-item"><strong>'+name+'</strong><div class="compare-values">'+
      values.map((value,i)=>{
        const known=Number.isFinite(value);
        const width=known?Math.abs(value)/max*(signed?50:100):0;
        const offset=signed?(value<0?50-width:50):0;
        const label=known?(showSign&&value>0?'+':'')+num(value,digits):'미확인';
        return '<div class="compare-row compare-series-'+i+'" aria-label="'+periods[i]+' '+label+'"><span class="compare-track" aria-hidden="true"><i style="left:'+offset+'%;width:'+width+'%"></i></span><span>'+label+'</span></div>';
      }).join('')+'</div></div>').join('')+'</div>';
}

function exactData(table,label='표·집계 기준') {
  return '<details class="method"><summary>'+label+'</summary>'+table+'</details>';
}

const tankerFreightBasis={
  source:['baltic25','baltic26'],
  note:'달러/일 · 왕복 일일 환산수익(TCE). —는 비교 자료 미표기.',
  worldscale:true
};
const freightMarkets={
  tanker:{...tankerFreightBasis,rows:[
    ['VLCC · TD3C','중동 걸프 → 중국 · 원유 27만 톤',123776,1345710,'127.83 → 1,262.50'],
    ['VLCC · TD34','오만만 → 중국 · 원유',null,699257,'— → 659.29'],
    ['VLCC · TD15','서아프리카 → 중국 · 원유 26만 톤',110975,632191,'117.94 → 633.75'],
    ['VLCC · TD22','미국 걸프 → 중국 · 원유',89692,477013,'—'],
    ['수에즈맥스 · TD20','나이지리아 → 북서유럽 · 원유 13만 톤',71425,396100,'145 → 713.89',0,' 이상']
  ]},
  products:{...tankerFreightBasis,rows:[
    ['LR2 · TC1','중동 걸프 → 일본 · 제품 7.5만 톤',32600,288700,'141 → 1,003'],
    ['MR · TC2','북서유럽 → 미국 동해안 · 제품 3.7만 톤',6400,16600,'104 → 226']
  ]},
  gas:{source:['balticgas25','balticgas26'],note:'17.4만 m³급 LNG 표준선의 용선 평가액이다.',rows:[
    ['LNG · BLNG1','호주 → 일본 · 달러/일',42200,44800],
    ['LNG · BLNG2','미국 걸프 → 유럽 대륙 · 달러/일',60600,29800],
    ['LNG · BLNG3','미국 걸프 → 일본 · 달러/일',66500,63800]
  ]},
  lpg:{source:['balticgas25','balticgas26'],note:'액화석유가스(LPG) 화물 톤당 운임이다.',rows:[
    ['LPG · BLPG1','라스타누라 → 지바 · 달러/톤',57.50,257.20,null,2],
    ['LPG · BLPG2','휴스턴 → 플러싱 · 달러/톤',66.00,174.33,null,2],
    ['LPG · BLPG3','휴스턴 → 지바 · 달러/톤',121.67,313.14,null,2]
  ]}
};
function renderFreight(id,key) {
  const {rows,source,note,worldscale}=freightMarkets[key];
  const value=(x,digits)=>typeof x==='number'?num(x,digits):x||'—';
  const tableRows=rows.map(([ship,route,before,after,ws,digits=0,suffix=''])=>[
    ship+'<small>'+route+'</small>',value(before,digits),'<b>'+value(after,digits)+suffix+'</b>',...(worldscale?[ws]:[])
  ]);
  const table=marketTable(['선종·항로','2025','2026',...(worldscale?['WS']:[])],tableRows)+
    '<p class="note context-caption">'+note+' '+ref(source[0],'2025')+' '+ref(source[1],'2026')+'</p>';
  const unit=key==='lpg'?'달러/톤':'달러/일';
  const chartRows=rows.map(([ship,,before,after])=>[ship,[before,after]]);
  byId(id).innerHTML='<p class="note">'+unit+' · 44주차</p>'+comparisonChart(chartRows,['2025','2026'],{digits:key==='lpg'?2:0})+
    (key==='tanker'?'<p class="note">TD20의 2026년 값은 하한(396,100달러/일)이다.</p>':'')+
    exactData(table,'항로·정확한 운임·출처');
}
renderFreight('freight-table','tanker');
renderFreight('product-freight','products');
renderFreight('lng-freight','gas');
renderFreight('lpg-freight','lpg');

const vlccWeeks=[['10.02',1221893,40],['10.09',1412594,41],['10.16',1370193,42],['10.23',1287851,43],['10.30',1345710,44]];
byId('vlcc-plot').innerHTML='<div class="freight-bars" aria-label="2026년 10월 TD3C 왕복 일일 환산수익">'+
  vlccWeeks.map(([date,rate,week])=>'<div><b>'+num(rate/1e6,2)+'</b><i style="height:'+Math.round(rate/1500000*66)+'px" aria-hidden="true"></i><a href="https://www.balticexchange.com/en/data-services/WeeklyRoundup/tanker/news/2026/tanker-report-week-'+week+'.html" aria-label="'+date+' 발틱거래소 보고서" target="_blank" rel="noopener noreferrer">'+date+'</a></div>').join('')+
  '</div><p class="note">2025년 44주차 같은 항로 123,776달러/일 '+ref('baltic25','2025')+'</p>';
byId('route-costs').innerHTML='<div class="route-costs">'+[
  ['중동 걸프 → 아시아','37 초과'],['미국 걸프 → 싱가포르','약 33'],['미국 걸프 → 유럽','약 24']
].map(([route,cost])=>'<div><span>'+route+'</span><b>'+cost+'</b></div>').join('')+'</div>';

const marginInputs=[2025,2026].map(year=>{
  const {wti,diesel,gasoline}=monthlyMarket[year];
  return {crude:wti[9],diesel:42*diesel[9],gasoline:42*gasoline[9]};
});
const crack321=({crude,diesel,gasoline})=>(2*gasoline+diesel)/3-crude;
const marginRows=[
  ['쿠싱 WTI 현물',x=>x.crude],
  ['걸프연안 휘발유 현물',x=>x.gasoline],
  ['걸프연안 초저유황 디젤 현물',x=>x.diesel],
  ['휘발유 단일 크랙',x=>x.gasoline-x.crude],
  ['디젤 단일 크랙',x=>x.diesel-x.crude],
  ['3–2–1 크랙',crack321]
];
byId('refining-margins').innerHTML=marketTable(['지표','2025.10','2026.10','변화'],marginRows.map(([label,calculate])=>{
  const [before,after]=marginInputs.map(calculate);
  return [label,num(before,2),num(after,2),'+'+num(after-before,2)];
}),'margin-table');
const premium=byId('delivered-premium');
function updateAdjustedCrack() {
  byId('adjusted-crack').value=premium.validity.valid?num(crack321(marginInputs[1])-premium.valueAsNumber,2)+' $/배럴':'비용 입력 필요';
}
premium.addEventListener('input',updateAdjustedCrack);
byId('freight-adjust').addEventListener('submit',event=>event.preventDefault());
updateAdjustedCrack();

byId('refinery-process').innerHTML=marketTable(['공정','원료 → 산출물','가동 차질의 영향'],[
  ['상압증류(CDU)','원유 → 나프타·등유·경유 유분·잔사유','전체 투입과 후속 공정 원료가 줄어든다.'],
  ['감압증류(VDU)','상압 잔사유 → 감압 경유·감압 잔사유','접촉분해·수첨분해·코커의 원료가 줄어든다.'],
  ['유동접촉분해(FCC)','감압 경유 등 → 휘발유 기재·프로필렌','휘발유 수율과 석유화학 원료 공급이 줄어든다.'],
  ['수첨분해','중질유 + 수소 → 경유·항공유 기재','중간유분 생산과 원유 선택 폭이 줄 수 있다.'],
  ['수첨탈황(HDS)','유분 + 수소 → 저유황 제품 기재','정지하면 규격을 충족하는 경유 공급이 줄 수 있다.'],
  ['지연 코킹','감압 잔사유 → 분해유·석유 코크스','중질 원유의 잔사유 처리 능력이 줄어든다.']
],'text-table');
const refineryAssets=[
  ['잠나가르','인도 · Reliance','140만 배럴/일','운영사 원유 처리능력','접촉분해·코커·알킬화·석유화학 통합. 운영사 복잡도 지수 21.1.','world','jamnagar',['reliance']],
  ['루와이스','UAE · ADNOC Refining','92.2만 배럴/가동일 이상','운영사 설비 자료','중질·고유황유 처리 능력 최대 42만 배럴/가동일. 기존 단지의 일부 공정 능력.','gulf','ruwais',['adnoc','ruwaisflex']],
  ['포트아서','미국 · Motiva','65.64만 배럴/달력일','EIA 가동 가능 상압증류 · 2026.1.1','휘발유·디젤·항공유·윤활기유 생산. 운영사 기준 총 처리 규모 73만 배럴/일.','world','portarthur',['portrank','motiva']],
  ['온산','한국 · S-OIL','58만 + 8.9만 배럴/일','상압증류 3기 + 콘덴세이트 분별','수첨분해 7.5만 배럴/일, 잔사유 유동접촉분해(RFCC) 7.3만 배럴/일.','korea','onsan',['soilref']],
  ['옴스크','러시아 · Gazprom Neft','45만 배럴/일','IEA 인용 설비능력','2026.7.7 공격. 해당 시설의 실제 투입 감소량 미확인.','russia','omsk',['russia']],
  ['모스크바','러시아','25만 배럴/일','IEA 인용 설비능력','6월 공격으로 큰 피해. IEA 9월 보고서는 2027년 초까지 정지할 수 있다고 전함.','russia','moscow',['russia']],
  ['랴잔','러시아 · Rosneft','34.2만 배럴/일','S&P Global 인용 설비능력','10월 15일 화재 보도. 실제 처리량 감소는 미확인.','russia','ryazan',['novak','ryazan']],
  ['사라토프','러시아 · Rosneft','13.5만 배럴/일','S&P Global 인용 설비능력','10월 14일 피격 주장과 반박. 피해와 처리량 감소는 미확인.','russia','saratov',['novak']],
  ['야로슬라블','러시아','연 약 1,500만 톤','Slavneft YANOS · 휘발유·경유·연료유','2026.11.3 피해 보도. 생산 감소량 미확인.','russia','yaroslavl',['yar']]
];
byId('refinery-table').innerHTML=marketTable(['정유시설','처리능력','주요 공정·공급 노출'],refineryAssets.map(([name,operator,capacity,basis,detail,view,site,refs])=>[
  '<a href="#products-map" data-region="'+view+'" data-site="'+site+'">'+name+' ↗</a><small>'+operator+'</small>',
  '<b>'+capacity+'</b><small>'+basis+'</small>',detail+' '+refs.map(id=>ref(id)).join(' ')
]),'text-table asset-table');
wireMapLinks('refinery-table');
