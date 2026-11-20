'use strict';

const searchDialog=byId('research-search');
const searchInput=byId('research-query');
const searchResults=byId('research-search-results');
const searchCount=byId('research-search-count');
const searchOpen=byId('research-search-open');
const searchAliases={
  'brent-curve':'브렌트 데이티드 실물 선물 원월물 근월물 백워데이션 forward curve 스프레드 DFL',
  'term-spreads':'기간구조 M1 M2 근월물 차근월물 백워데이션 콘탱고 스프레드 두바이 Dubai 유종 가격차',
  'brent-market':'벤치마크 브렌트 바스켓 FOB CIF CFD BFOE WTI 미들랜드',
  'oil-market':'정제마진 정유 디젤 경유 휘발유 항공유 crack spread 3–2–1',
  'refinery-run-model':'런컷 감산 원유 도착비 정제비 크랙 마진',
  'refineries':'정유소 리파이너리 refinery 증류 수첨 탈황',
  'stock-programs':'SPR 전략비축유 방출 IEA G7 재고',
  'shipping':'VLCC 탱커 유조선 월드스케일 TCE TD3C',
  'td3c-case':'Mercuria Hunter Baltic 머큐리아 헌터 발틱 선도운임계약 FFA',
  'lng-netback':'LNG 선적 유럽행 아시아행 JKM TTF',
  'brazil-sugar-mix':'Sugar Mix 설탕 수크로스 에탄올 바이오연료',
  'datacenter-power':'데이터 센터 웜 셸 warm shell GPU 계통 접속 가스터빈',
  'food-overview':'식량 밀 대두 곡물 공급망 밸류체인 무역 지도 비축',
  'food-milling':'밀 제분 밀가루 부산물 밀기울 수율',
  'food-oils':'대두 착유 대두유 대두박 설탕 식용유 사료 바이오연료',
  'copper-overview':'구리 정광 전기동 밸류체인 교역 지도',
  'copper-production':'구리 광산 생산 선광 정련 정광 전해 에스콘디다',
  'copper-downstream':'구리 전선 케이블 생산자물가 전력망 스크랩 재활용',
  'vc-end_demand':'전방 수요 항공사 배송 택배 항공유 경유 연료비 유류할증 단위매출 jet fuel surcharge',
  'records-disruptions':'차질 복구 대장 정비 화재 피격 재가동 감산 폐쇄 정유소 파이프라인 리그',
  'records-contracts':'계약 프로젝트 진행표 MoU 공급계약 투자결정 FID 증설 수리 시운전 가동',
  'rig-activity':'리그 수 가동 리그 시추 완결 미완결 유정 DUC 시추 생산성 rig count 퍼미안 바켄 이글포드 STEO',
  'peer-quarters':'분기 비교 피어 실적 가이던스 어닝콜 리그 수주잔고 TCE 처리량 가동률 연료비 시추 유전서비스 배관 선사 정유 비료 항공',
  'ref-chokepoints':'말라카 호르무즈 수에즈 SUMED 바브엘만데브 덴마크 해협 튀르키예 해협 파나마 희망봉 통과량 병목 우회로 chokepoint',
  'ref-crude-stocks':'전략 재고 추정 비축 SPR 비축기지 석유공사 시설능력 저장능력 중국 미국 일본 한국 인도 사우디아라비아 이란 UAE 프랑스 스페인 Visakhapatnam Mangalore Padur Bryan Mound',
  'ref-rig-counts':'가동 리그 수 집계 Baker Hughes Rig Count 주간 월간 International 북미 제외 OPEC ASB 국가별 기준선 미국 캐나다 이란 쿠웨이트 인도 UAE 사우디아라비아 이라크 오만 아르헨티나 나이지리아 브라질',
  'ref-refining-capacity':'정유능력 명목능력 OPEC ASB 상압증류 감압 증류 열분해 촉매 분해 수첨분해 촉매 개질 탈황 PADD Gulf Coast Midwest stream-day calendar-day operable',
  'ref-refining-plants':'울산 CLX SK에너지 CDU HOU RFCC VRDS RHDS 고도화 탈황 Marathon Galveston Bay Garyville Catlettsburg Robinson Detroit El Paso Los Angeles Anacortes Kenai',
  'ref-companies-fleet':'선대 유조선 선사 Scorpio LR2 MR Handymax International Seaways Frontline 용선 배관 Kinder Morgan Enbridge Mainline Southern Lights Express Platte Enterprise 터미널',
  'ref-companies-refining':'Reliance O2C Gasoil ATF 폴리머 PP PE PVC 판매용 생산량 S-OIL 온산 SK이노베이션 GS칼텍스 HD현대오일뱅크 대산 Valero Marathon Phillips 66 CPChem LyondellBasell SK엔무브 Casey 상장 모회사',
  'ref-companies-filings':'연차보고서 사업보고서 10-K 20-F Annual Report 부록 A 공시 원문 링크 보고기간 선대 기준일',
  'ref-cpi-weights':'CPI 가중치 상대중요도 근원 바스켓 휘발유 가정 내 식품 외식 전기요금 도시가스요금 항공요금 에너지 합계 기여도 민감도 BLS',
  'ref-policy-support':'일본 전기 가스 요금 지원 저압 전력 지원 단가 일반예비비 할인액 보조 METI',
  'ref-climate-grain':'난방도일 HDD 겨울 전망 STEO 기후 곡물 식품가격 전망 USDA ERS FAO'
};
const searchStarters=[
  ['브렌트 근월·원월','brent-curve'],
  ['정유 크랙 비교','oil-market'],
  ['전략비축과 방출','stock-programs'],
  ['VLCC 운임','shipping'],
  ['호르무즈 통과량','sea-flows'],
  ['LNG 목적지별 선적','lng-netback'],
  ['식량 밸류체인','food-overview'],
  ['구리 밸류체인','copper-overview']
];

const normalizeSearch=text=>text.normalize('NFKC').toLocaleLowerCase('ko').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
function searchLocation(id) {
  const node=byId(id);
  const desk=deskTabs.find(tab=>tab.dataset.tab===node?.closest('[data-desk]')?.dataset.desk)?.textContent;
  const view=node?.closest('[data-view]')?.dataset.view;
  return [desk,view].filter(Boolean).join(' › ');
}

const searchEntries=[
  ...searchStarters.map(([title,id])=>({title,id,detail:'',priority:2})),
  ...Array.from(deskNavigation.values()).flatMap(({views})=>views.flatMap(({locations})=>
    Array.from(locations,([id,title])=>({id,title,detail:'',priority:1})))),
  ...coverageRows.map(([,title,detail,id])=>({id,title,detail,priority:0})),
  ...mapProfiles.products.views.russia.nodes.map(site=>({
    id:'products-map',title:sitesOnMap[site][0],detail:sitesOnMap[site][3],region:'russia',site,priority:3
  })),
  ...Object.entries(sources).map(([key,[title,detail]])=>({id:'s-'+key,title,detail,priority:-1}))
].map(entry=>({
  ...entry,
  titleKey:normalizeSearch(entry.title),
  searchKey:normalizeSearch([entry.title,entry.detail,searchAliases[entry.id]??''].join(' ')).replaceAll(' ','')
}));

function renderSearch() {
  const query=normalizeSearch(searchInput.value);
  const tokens=query.split(' ').filter(Boolean);
  const matching=query?searchEntries.filter(entry=>tokens.every(token=>entry.searchKey.includes(token))):searchEntries.slice(0,searchStarters.length);
  const score=({titleKey,priority})=>priority+(titleKey===query?20:titleKey.startsWith(query)?12:titleKey.includes(query)?8:0)+
    tokens.filter(token=>titleKey.includes(token)).length*2;
  if(query) matching.sort((a,b)=>score(b)-score(a));
  const seen=new Set();
  const matches=matching.filter(entry=>{
    const key=[entry.id,entry.titleKey,entry.site].join('|');
    if(seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  searchCount.textContent=query?(matches.length?matches.length+'개 결과':'검색 결과가 없다. 지표 이름이나 다른 표기로 다시 검색할 수 있다.'):'바로 열기';
  searchResults.replaceChildren(...matches.map(({title,id,detail,region,site})=>{
    const row=document.createElement('li');
    const link=document.createElement('a');
    const name=document.createElement('strong');
    const location=document.createElement('small');
    link.href='#'+id;
    name.textContent=title;
    location.textContent=searchLocation(id);
    link.append(name,location);
    if(detail) {
      const description=document.createElement('span');
      description.textContent=detail;
      link.append(description);
    }
    if(region&&site) {
      link.dataset.region=region;
      link.dataset.site=site;
    }
    row.append(link);
    return row;
  }));
  searchResults.scrollTop=0;
}

function openResearchSearch() {
  if(searchDialog.open) return;
  searchInput.value='';
  renderSearch();
  searchDialog.showModal();
}
searchOpen.addEventListener('click',openResearchSearch);
searchInput.addEventListener('input',renderSearch);
searchInput.addEventListener('keydown',event=>{
  if(event.isComposing) return;
  if(event.key==='Escape') {
    event.preventDefault();
    searchDialog.close();
  } else if(event.key==='Enter') {
    event.preventDefault();
    searchResults.querySelector('a')?.click();
  }
});
document.addEventListener('keydown',event=>{
  if(event.key!=='/'||event.ctrlKey||event.metaKey||event.altKey||event.target.closest?.('input,select,textarea,[contenteditable]')||searchDialog.open) return;
  event.preventDefault();
  openResearchSearch();
});
searchDialog.addEventListener('click',event=>{
  if(event.target.closest('a[href^="#"]')&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey) searchDialog.close();
});
wireMapLinks('research-search-results');
