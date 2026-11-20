'use strict';

function contextFlow(steps) {
  return '<ol class="context-flow">'+steps.map(([title,detail])=>'<li><strong>'+title+'</strong><small>'+detail+'</small></li>').join('')+'</ol>';
}

byId('actor-flow').innerHTML=contextFlow([
  ['정유시설 공격','원유 투입·제품 수율 저하'],
  ['복구 지연','부품·장비 공급 제한'],
  ['디젤 수출 여력 감소','중동 차질과 동시 발생'],
  ['에너지 휴전 압력','미국 중재·제재 완화 검토']
]);
byId('actor-table').innerHTML=marketTable(['주체','협상에 영향을 미치는 수단','관측된 제약'],[
  ['러시아','국내 연료와 수출용 디젤을 공급하는 정유시설','6월 원유 투입 380만 배럴/일(전년 대비 약 −30%). IEA는 중대한 후단 공정 피해의 수리에 평균 6~8개월이 걸릴 수 있고, 서방 제재로 일부 장비 조달이 제한된다고 분석. '+ref('russia')],
  ['우크라이나','러시아의 연료 생산·수출을 제약하는 정유시설 공격','상압증류뿐 아니라 수첨분해·탈황 등 복구가 더 오래 걸리는 공정에도 피해. 공격 지속 여부는 러시아의 대우크라이나 에너지 시설 공격과 방공·정보 지원을 포함한 협상 조건에 좌우. '+ref('russia')+' '+ref('ftzel','FT')],
  ['미국','정보·무기 조달 지원, 대러 제재 예외, 휴전 중재','FT에 따르면 미국은 공격 중단을 요구하며 정보 공유와 우크라이나 우선 소요 목록(PURL) 조달을 제한할 수 있다고 경고. 정보 공유를 전면 중단했다는 확인은 없음. 젤렌스키 인터뷰에서 FT는 미국이 연료 가격 인하를 정유 공격 중단 및 러시아산 디젤 도입의 이유로 제시했다고 전함. '+ref('ftpressure','FT')+' '+ref('ftzel','FT 인터뷰')+' '+ref('gl135','OFAC')],
  ['유럽','유럽 내 동결자산의 해제 권한, 개별 제재 체계','FT에 따르면 유럽 대표단은 미국 제안에 반대했고, EU 차원의 해제에는 27개 회원국의 합의가 필요. '+ref('ftassets','FT')+' '+ref('eu2026','EU')]
],'text-table');

const truceEvents=[
  ['10.09','공식','미국 재무부, 러시아산 디젤 관련 거래 일반허가 135 발급. 허가 범위는 판매·인도·하역·수입이며 2027.04.07까지 적용.','gl135'],
  ['10.10','보도','bne는 뉴욕타임스 보도를 인용해, 미국이 에너지 시설 또는 해상 휴전의 유인책으로 동결 국유자산 최대 1,000억 달러 접근을 제안했다고 보도.','bneassets'],
  ['10.11','보도','트럼프 에너지 휴전 발표. FT는 미국이 우크라이나에 정보 공유 및 PURL 조달 제한을 거론했다고 보도.','ftpressure'],
  ['10.13','상반된 주장','트럼프는 미국이 정보를 계속 공유한다고 밝혔다. 젤렌스키는 평소와 같은 미사일 조기경보가 없었다고 했고, 우크라이나 외무장관은 미국의 군사정보를 계속 받는다고 밝혔다.','trumpintel'],
  ['10.14','보도','FT는 스티브 위트코프와 재러드 쿠슈너가 동결 러시아 자산 일부를 미국 감독 기구로 옮기는 안을 제시했고 유럽 대표들이 반대했다고 보도했다. 미 당국자는 포괄적 평화 협상의 일부라고 설명했다. FT 기사에는 1,000억 달러 규모가 명시되지 않았다.','ftassets'],
  ['10.14','상반된 주장','러시아 노박 부총리는 사라토프·랴잔 정유시설이 공격받았다고 주장했고, 우크라이나 대통령실은 정유시설을 공격하지 않았다고 반박. 랴잔 화재는 다음 날 따로 보도됨.','novak'],
  ['10.15','보도','키이우는 휴전 발표 뒤 러시아 정유시설 공격을 잠시 멈췄다. 러시아가 우크라이나 에너지 시설을 계속 공격하자 젤렌스키는 중단 방침을 철회했고 랴잔 피격이 보도됐다. 젤렌스키는 스타링크 기능 제한을 압박으로 해석했다. 영국과 미국 국방 당국은 기능 복원을 환영했다.','ftzel','ryazan'],
  ['10.29–30','보도','러시아의 디젤 수출 쿼터 검토와 미국 압박 이후 우크라이나의 정유시설 공격 일시 중단이 각각 보도됨.','ruexports','pause'],
  ['11.03','보도','러시아 야로슬라블 정유시설 피해 보고. 처리량 감소 규모는 미확인.','yar']
];
byId('truce-timeline').innerHTML='<ol class="context-timeline">'+truceEvents.map(([date,status,detail,...refs])=>
  '<li><time>'+date+'</time><span class="status-tag">'+status+'</span><div>'+detail+' '+refs.map(id=>ref(id)).join(' ')+'</div></li>').join('')+'</ol>'+
  '<p class="note context-caption">유로클리어의 제재 관련 러시아 자산 잔액은 2026년 6월 말 2,020억 유로, 9월 말 2,040억 유로. 유로클리어 전체 잔액이며 미국이 제안한 해제 규모가 아니다. '+ref('euroclear','Euroclear')+'</p>';

byId('truce-timeline').insertAdjacentHTML('beforeend',
  '<div class="transmission-reading"><strong>휴전의 조건</strong> 우크라이나는 상호 공격 중단을 요구했다. 러시아가 우크라이나 전력망 공격을 계속할 경우 키이우는 정유 공격을 중단할 유인이 약해진다. 미국이 기대한 디젤 가격 효과의 변수는 휴전 이행, 러시아 수출 제한, 실제 선적량이다. '+ref('trumpintel','Reuters')+'</div>'+
  exactData(marketTable(['정책 절차','공개 확인'],[
    ['10월 15일 하원 서한','공화·민주 양당 하원의원 22명이 대러 에너지 제재 이행을 요구했다. 러시아산 디젤 거래에 관한 재무부 일반허가 135와 별도로 진행됐다. '+ref('houseDiesel','하원 서한')],
    ['10월 18일 공화당 의원 발언 보도','돈 베이컨 의원은 트럼프 행정부가 대러 정책을 바꾸지 않으면 선거 후 입법이 의회를 통과하기 어려울 것이라고 경고했다. 국방부가 추진한 최소 3,500억 달러 재정조정안의 통과 여부는 확인되지 않았다. '+ref('usBudgetThreat','The Hill')],
    ['10월 22일 하원 발의','러시아산 에너지 수입 제한과 우크라이나 정보 지원을 담은 초당파 법안 H.R.10866이 발의됐다. 하원 의원실은 10월 24일 이를 발표했다. '+ref('usRussianFuelBill','법안 원문')+' '+ref('houseDieselBill','하원 공지')],
    ['10월 29~30일 공격 중단 보도','WSJ는 비공식 중단을 보도했다. 젤렌스키는 최근 신중하게 행동했지만 정유소를 공격하지 말라는 명령은 없었다고 밝혔다. 이어 10월 30일 사마라 시설 피격이 보도됐다. '+ref('pause','WSJ')+' '+ref('ruStrikesOct','피격 추적')]
  ],'text-table'),'미 의회의 제재 논의와 우크라이나의 발표 범위'));

byId('fleet-flow').innerHTML=contextFlow([
  ['미국의 개별 선박 검토','비제재 화물 운송 목적'],
  ['거래·소유권 심사','EU·영국 제재 별도 적용'],
  ['운항 적격성 확인','선급·정비·보험·터미널 승인'],
  ['실제 운항 가능','전쟁보험·호르무즈 통항 위험']
]);
byId('fleet-note').innerHTML=marketTable(['무엇이 움직였나','보도와 관측'],[
  ['정책 단계','10.15 Reuters 보도는 비제재 원유·제품을 실을 선박의 개별 완화 검토. 러시아산 디젤 일반허가 135와는 범위가 다름. '+ref('shadow','Reuters')+' '+ref('gl135','OFAC')],
  ['시장 반응','Reuters는 선도운임계약(FFA) 하락과 미국 걸프–유럽 아프라맥스 용선 평가 30포인트 하락을 보도. 발틱거래소 중동–중국 VLCC(TD3C) 왕복 일일 환산수익은 10.16 137.0만 → 10.23 128.8만 → 10.30 134.6만 달러. '+ref('shadow','Reuters')+' <a class="ref" href="#shipping">[주별 차트]</a>'],
  ['통항 위험','10월 14일 Reuters는 이란 당국자를 인용해 이란이 통항 제한을 어겼다고 본 선박에 대한 공격을 늘렸다고 보도. '+ref('irantactics','Reuters')],
  ['실물 판단','보험·검사·선급을 통과하는 선박이 실제 시장에 투입되면 선복이 늘어나고, 왕복 시간이 길면 같은 선대로 운송할 수 있는 물량이 줄어듦. '+ref('shadow','Reuters')+' '+ref('eu2026','EU')+' '+ref('ukshadow','영국')+' '+ref('ieafreight','IEA')]
],'text-table')+'<div class="transmission-links"><a href="#crude-freight-bridge">원유 항로별 운임 ↗</a><a href="#diesel-transmission">디젤 크랙·최종 가격 ↗</a></div>';

const iranRoutes=[
  ['주요 해상 수출로','이란 카르그섬','호르무즈 → 인도양','중국 정유사','2023년 이란 원유·콘덴세이트 수출의 약 90%가 중국으로 향했다.','irantrade','asia','iran-china'],
  ['호르무즈 우회 설비','이란 내륙','고레–자스크 송유관','오만만 선적','해협 동쪽의 이란 자체 경로다.','irantrade','gulf','jask'],
  ['가스 공급 협의','러시아','배관 경로 협의','이란으로 공급','2025년 보도에 나온 최대 연 550억 m³는 협의 규모다. 가격·경로·실제 인도 물량은 확인되지 않았다.','irangas',null,null]
];
byId('iran-routes').innerHTML=iranRoutes.map(([type,start,middle,end,note,source,view,site])=>
  '<div class="route-story"><strong>'+type+'</strong>'+contextFlow([[start,''],[middle,''],[end,'']])+
  '<p class="note">'+note+' '+ref(source)+(view?' <a class="ref" href="#oil-map" data-region="'+view+'" data-site="'+site+'">지도 ↗</a>':'')+'</p></div>').join('')+
  '<p class="note context-caption">러시아는 중국 정유사 시장에서 이란과 경쟁한다. EIA에 따르면 2022년 이후 할인된 러시아산이 중국 내 이란산 수요 일부를 대체하자 이란도 할인을 확대했다. '+ref('irantrade','EIA')+'</p><p class="note context-caption">11월 3일 Reuters는 미국 봉쇄로 이란 수출이 멈춘 상태라고 보도했다. '+ref('gulfflow','Reuters')+'</p>';
byId('iran-routes').insertAdjacentHTML('beforeend',
  '<p class="note context-caption">11월 5일 이란 안보 책임자 레자이는 푸틴과 러시아산 가스를 이란과 인접국에 공급하는 배관을 논의했다고 밝혔다. 협의는 러시아 → 이란 방향이며, 기존 이란 원유 수출은 카르그섬·자스크 등 이란 선적 경로를 쓴다. '+ref('iranRussiaNov','Reuters')+'</p>');
wireMapLinks('iran-routes');

const lngImports=[['카타르',4.1,0],['미국',1.1,2.9],['캐나다',.1,.9]];
const northAmericaGain=lngImports.slice(1).reduce((sum,[,before,after])=>sum+after-before,0);
const qatarLoss=lngImports[0][1]-lngImports[0][2];
byId('lng-context').innerHTML=comparisonChart(lngImports.map(([name,before,after])=>[name,[before,after]]),['2025년 8월','2026년 8월'])+
  '<p class="note">카타르 도착은 거의 0이다. 미국 +180만 톤, 캐나다 +80만 톤을 합산한 '+num(northAmericaGain)+'백만 톤은 카타르 감소분 '+num(qatarLoss)+'백만 톤의 약 '+num(northAmericaGain/qatarLoss*100,0)+'%다. 캐나다의 전년 8월 수치는 원 통관 분석의 10만 톤을 적용했다. 중국·일본·한국·대만·태국·싱가포르 집계. '+ref('hureau','통관 분석')+'</p>'+
  '<div class="transmission-links"><a href="#gas-map" data-region="gulf" data-site="qa-hormuz">카타르 라스라판 ↗</a><a href="#gas-map" data-region="world" data-site="us-kr">미국 걸프 ↗</a><a href="#gas-map" data-region="pacific" data-site="ca-asia">캐나다 태평양 ↗</a></div>';
wireMapLinks('lng-context');

byId('run-flow').innerHTML=contextFlow([
  ['원유 도착원가 상승','화주 운임·보험료 증가'],
  ['실제 정유 마진 압박','유럽·아시아의 높은 원료비'],
  ['경제적 감산 가능','정기 정비·설비 피격과 구분'],
  ['제품 공급이 더 빨리 감소','조건 충족 시 디젤 크랙 확대']
])+'<p class="note context-caption">감산은 원유 구매도 줄인다. 디젤 수요 감소, 제품 재고 방출, 다른 지역의 증산이 공급 감소를 상쇄하면 디젤 크랙 확대 폭은 줄어든다. '+ref('ieaoil','IEA')+'</p>';
byId('iea-context').innerHTML=marketTable(['지표','수치','기간·구분'],[
  ['세계 석유 공급','1억 230만 배럴/일(전월 대비 +250만)','2026년 9월 · 추정. 사우디가 OPEC+ 증가, UAE가 비OPEC+ 증가를 주도'],
  ['세계 석유 공급 전망','2026년 1억 70만 배럴/일(−580만), 2027년 +770만 반등','연평균 · 전년 대비'],
  ['중동 원유·콘덴세이트 생산 차질','누적 20억 배럴 초과 · 10월 6일 시점 약 500만 배럴/일 중단','Kpler 공개 블로그 10월 추정 · 일일 차질은 2월 대비 '+ref('kpleroil','Kpler')],
  ['중동 해상 수출 회복','원유·콘덴세이트 1,400만(전쟁 전 약 86%) · 정제품 310만 배럴/일(전쟁 전 절반 수준)','2026년 10월 Vortexa 잠정(Reuters 인용) · 이란과 LPG 제외 '+ref('gulfflow','Reuters')],
  ['세계 디젤 해상 순수출','약 −70만 배럴/일. 중동·러시아 합계 약 −130만','2026년 9월 · 전년 대비 잠정치'],
  ['세계 관측 석유 재고','전월 대비 −1,000만 배럴. 육상 −1억 1,300만, 해상 +1억 300만','2026년 9월 · 2월 말 대비 총 −5억 900만'],
  ['지역별 관측 재고','비OECD 원유 −7,600만 배럴(감소분의 78%가 중국), OECD 석유 재고 −3,700만 배럴','2026년 9월 · 전월 대비'],
  ['세계 정유 원유 투입','10월 8,130만 → 연말 8,460만 배럴/일','2026년 연평균 8,170만(−230만), 2027년 +280만 배럴/일 전망'],
  ['세계 석유 수요','4분기 −250만, 연평균 −260만 배럴/일','2026년 수요 감소분의 25%가 디젤. 2027년 수요는 2025년 대비 −62만 배럴/일(−0.6%) 전망'],
  ['디젤 재고 회복','계절적 증가분을 넘어 누적 손실을 보충하는 시점은 2027년 하반기 이전에 어려움','IEA 10월 전망 · 걸프 제품 공급 회복에 의존']
],'text-table')+'<p class="note context-caption">'+ref('ieaoil','IEA 10월 보고서')+'</p>';

byId('brent-flow').innerHTML=contextFlow([
  ['6개 등급의 실물 화물','브렌트/니니안·포티스·오세베르그·에코피스크·트롤·WTI 미들랜드'],
  ['같은 기준으로 환산','선적 창 10일 후~약 한 달 후 · 화물당 70만 배럴'],
  ['데이티드 브렌트 평가','품질·운임 조정 후 가장 경쟁력 있는 등급 · 런던 16:30']
])+'<p class="note">호르헤 몬테페케가 Platts에서 개발한 실물 평가다. 북해 거래 창구의 적격 매수·매도 호가와 체결을 평가하며, 이 가격에 유종별 차등을 붙이는 계약을 통해 다른 지역의 실물 원유에도 영향을 준다. '+ref('datedHistory','Reuters')+' '+ref('platts','평가 방법')+'</p>';
byId('brent-basis').innerHTML=marketTable(['조건','비용 부담','위험 이전'],[
  ['FOB · 본선인도','매수자가 해상운송·보험을 주선','선적항에서 본선 적재 시'],
  ['CIF · 운임·보험료 포함','매도자가 목적항까지 운임과 약정 보험을 부담','선적항에서 본선 적재 시']
],'text-table')+'<p class="note context-caption">WTI 미들랜드의 로테르담 도착(CIF) 가격은 평가기관의 운임 조정으로 북해 본선인도(FOB) 기준에 맞춘다. '+ref('platts','Platts')+' '+ref('icc','ICC')+'</p>';
byId('brent-products').innerHTML=marketTable(['상품·지표','가격이 반영하는 것'],[
  ['Dated Brent','선적 시기가 정해진 실물 화물의 근접 인도 가치.'],
  ['Cash BFOE','월 단위 북해 원유 실물 선도 거래. 10만 배럴 단위 부분 거래가 가능하며 트롤과 WTI 미들랜드도 바스켓에 포함.'],
  ['ICE 브렌트 선물','만기별 거래소 계약. 만기 현금결제에는 ICE Brent Index가 쓰임.'],
  ['차액계약(CFD)','주간 데이티드 가격과 약정한 실물 선도 기준의 차이에 대한 가격 노출.'],
  ['데이티드–근월물(DFL)','데이티드 브렌트와 근월 브렌트 선물의 가격 차이에 대한 노출. '+ref('icedfl','ICE')]
],'text-table')+'<p class="note context-caption">10월 14일 발행된 IEA 보고서 작성 시점에는 실물 Dated가 약 134달러, 브렌트 선물이 약 107달러였다. 9월 Dated 월평균은 116.89달러/배럴(전월 대비 +26.17). IEA는 공급 차질과 아시아 매입 증가에 더해 9월 11일 사우디 동서 송유관 공격과 운임 급등도 영향을 줬다고 분석했다. '+ref('ieaoil','IEA')+' '+ref('platts','Platts')+' '+ref('icebrent','ICE')+' '+ref('icecfd','CFD')+'</p>';

const regionalFreightRows=[
  ['유럽',40.26,80.82,19.99],
  ['싱가포르',75.51,152.49,-17.01],
  ['동북아',79.21,156.19,-19.77]
];
const regionalRunChanges=[
  ['세계',[-4.8,1.8]],['미국',[.5,.5]],['중국',[-2.1,-.8]],['러시아',[-.6,-.8]]
];
const regionalMarginRows=[
  ['미국 걸프연안',10.21,46.75,50.12],
  ['북서유럽',8.62,44.13,47.47],
  ['싱가포르',5.60,29.13,23.09]
];
const regionalMarginTable=marketTable(['정제 지역','2월','8월','9월','8 → 9월'],regionalMarginRows.map(([region,feb,aug,sep])=>[
  region,num(feb,2),num(aug,2),num(sep,2),(sep>=aug?'+':'')+num(sep-aug,2)
]))+'<p class="note context-caption">WTI MEH(미국 휴스턴 연안 원유 지표)를 각 지역에서 정제하는 S&amp;P Global Energy CERA의 모형 마진으로, S&amp;P Global 기사에 공개된 값이다. <a class="ref" href="#crack">제품별 시장 크랙 ↗</a> '+ref('ceramargins','S&P Global')+'</p>';
byId('regional-margins').innerHTML=comparisonChart(regionalMarginRows.map(([region,...values])=>[region,values]),['2월','8월','9월'],{digits:2})+exactData(regionalMarginTable,'마진 변화·산출 기준');
byId('regional-freight').innerHTML=marketTable(['도착지','8월 운임','9월 운임','10월 8일 수출 채산성'],regionalFreightRows.map(([region,aug,sep,net])=>[
  region,num(aug,2),num(sep,2),(net>0?'+':'')+num(net,2)
]))+'<p class="note context-caption">운임은 달러/톤이다. 유럽은 영국·유럽 대륙 및 지중해, 동북아는 중국행 용선 평가다. 마지막 열은 로테르담·싱가포르·동북아로 보낼 때 WTI MEH의 수출 채산성 추정(달러/배럴)이다. '+ref('ceramargins','S&P Global')+'</p>'+
  '<p class="note context-caption">10월 IEA는 더 비싸진 원유와 운임이 유럽·아시아 정유 마진을 압박했고, 할인된 원료를 확보한 미국은 마진이 최고 수준에 이르렀다고 평가했다. 왼쪽의 8~9월 WTI MEH 모형은 원료와 관측 기간을 고정한 비교다. '+ref('ieaoil','IEA')+'</p>';

const regionalRunsTable=marketTable(['지역','2분기 원유 투입 변화','3분기 원유 투입 변화','가동 및 집계 범위'],[
  ['미국','+0.5','+0.5','전국 정유 가동률은 5~9월 평균 95% 초과. '+ref('usrunrates','EIA')],
  ['EU','동일 기준 미확인','동일 기준 미확인','EU 집행위원회는 9월 29일 최대 처리능력에 근접한 가동을, 10월 22일 디젤·항공유 수급 압박이 이어졌다고 보고. '+ref('euruns','9월')+' '+ref('euoct','10월')],
  ['중국','−2.1','−0.8','중국 전체 원유 투입. 싱가포르의 모형 마진과 집계 지역이 다름.'],
  ['인도·한국·일본','−1.0 초과 감소','+0.8','세 나라 합계.'],
  ['러시아','−0.6','−0.8','EIA는 정유 인프라 피격이 처리 감소에 영향을 줬다고 분석.'],
  ['세계','−4.8','+1.8','3분기 원유 투입은 전년 동기보다 약 5% 적음.']
],'text-table')+'<p class="note context-caption">2026년 전분기 대비 · 백만 배럴/일. 미 에너지정보청(EIA)의 Kpler 기반 추정. 2분기는 1분기 대비, 3분기는 2분기 대비다. '+ref('globalruns','EIA')+'</p>';
byId('regional-runs').innerHTML='<p class="note">전분기 대비 원유 투입량 변화 · 백만 배럴/일 · 중앙선 0</p>'+
  comparisonChart(regionalRunChanges,['2026년 2분기','2026년 3분기'],{signed:true,showSign:true})+
  exactData(regionalRunsTable,'EU·인도·한국·일본 포함 전체 표');
byId('diesel-exports').innerHTML='<h4>9월 해상 디젤·가스오일 순수출</h4>'+
  '<p class="note">2026년 9월 전년 대비 · 만 배럴/일 · 중앙선 0</p>'+
  comparisonChart([['세계',[-70]],['중동·러시아',[-130]],['미국·중국',[61]]],['9월 전년비'],{digits:0,signed:true,showSign:true})+
  exactData(marketTable(['집계 범위','전년 대비 · 만 배럴/일','2026년 9월 수준 · 만 배럴/일'],[
    ['세계','약 −70','약 470'],
    ['중동·러시아','약 −130','약 82'],
    ['미국·중국','+61','공개 요약에서 합산 수준 미확인']
  ])+'<p class="note context-caption">IEA가 인용한 Kpler 잠정 집계다. 미국·중국 증가분은 중동·러시아 감소분의 절반에 못 미쳤다. '+ref('ieaoil','IEA')+'</p>','9월 순수출 수준·출처');

byId('distillate-cover').innerHTML=exactData(marketTable(['지표','2025.10.31','2026.10.30','차이'],[
  ['미국 기말 중간유분 재고 · 백만 배럴','111.5','99.3','−12.2'],
  ['최근 수요 속도로 환산한 재고 일수','29.0일','23.8일','−5.2일']
])+'<p class="note context-caption">재고 일수는 EIA의 공식 시계열이다. 기말 재고를 최근 4주 평균 수요 지표(제품 공급량)로 나눈다. '+ref('distcover','일수')+' '+ref('distmethod','산식')+' '+ref('eia','재고')+'</p>','배럴 수치·산식');

const lngLanes=[
  ['캐나다 키티맷 → 아시아','태평양 횡단',10,'캐나다 에너지 규제기관의 아시아행 대표 기간 '+ref('cerlng','CER')],
  ['카타르 → 일본 히메지','호르무즈·말라카 경유',11773/(16*1.852*24),'11,773km를 16노트로 항해하는 계산 예시 '+ref('lngcost','거리')],
  ['미국 걸프 → 아시아','파나마 경유',20,'캐나다 에너지 규제기관의 파나마 경유 대표 기간 '+ref('cerlng','CER')]
];
byId('lng-days').innerHTML=comparisonChart(lngLanes.map(([label,,days])=>[label,[days]]),['편도 · 일'])+exactData(marketTable(['출발지 → 도착지','항로','편도','기준'],lngLanes.map(([label,route,days,note])=>[
  label,route,'약 '+num(days,days%1?1:0)+'일',note
]),'text-table')+'<p class="note context-caption">희망봉 우회, 해협 대기, 하역 일수는 넣지 않았다. 실제 항해일은 아시아 도착항·항로별로 다르다.</p>','항로별 기간 산정 기준');
const lngHire=freightMarkets.gas.rows.find(([name])=>name==='LNG · BLNG3')[3];
byId('lng-charter').innerHTML=comparisonChart(lngLanes.map(([label,,days])=>[label.split(' → ')[0],[2*days*lngHire/1e6]]),['왕복 · 백만 달러'],{digits:2})+exactData(marketTable(['출발지','편도','왕복 용선료 · 백만 달러'],lngLanes.map(([label,,days])=>[
  label.split(' → ')[0],'약 '+num(days,days%1?1:0)+'일',num(2*days*lngHire/1e6,2)
]))+'<p class="note context-caption">동일 일일 용선료 '+num(lngHire,0)+'달러 × 편도 항해일 × 2. 2026년 44주차 발틱거래소 미국 걸프–일본 LNG선 평가액을 세 항로에 공통 적용한 모형이다. 원료값·액화비·선박 연료·보험·통항료·하역비는 넣지 않았다. '+ref('balticgas26','발틱거래소')+'</p>','용선료 가정과 산식')+
  '<details class="method"><summary>과거 도착비 모형과 2026년 도착가</summary><p>Wood Mackenzie의 2022년 동북아 도착비 모형(Canadian Energy Centre 인용)은 카타르 5.45, 캐나다 서부 9.05, 미국 9.20달러/MMBtu였다. 선적단계 손익분기 비용·해상 운송·재기화 요금을 더한 과거 추정치다. <a class="ref" href="#lng-transmission">2026년 8월 6개 시장 통관 실적 ↗</a> '+ref('lngcost','2022 모형')+'</p></details>';

const escortCounts=[['5.01',21],['5.02',13],['5.03',9],['5.04',10]];
byId('escort-counts').innerHTML='<div class="freight-bars escort-bars">'+escortCounts.map(([day,count],i)=>
  '<div'+(i===3?' class="escort-start"':'')+'><b>'+count+'</b><i style="height:'+count*3+'px" aria-hidden="true"></i><span>'+day+'</span></div>').join('')+
  '</div><p class="note context-caption">S&amp;P Global 기사에 공개된 선박 통항 집계다. 5월 4일은 미국 호위 개시일이며, 미 중부사령부는 별도로 미국 국적 상선 2척 호위를 발표했다. '+ref('escortbase','5월 1~3일')+' '+ref('escortday','5월 4일')+'</p>';
byId('escort-conditions').innerHTML=marketTable(['관측','확인 내용'],[
  ['5.04 · 개시일','걸프 상선에서 폭발·화재 신고. '+ref('escortattack','Reuters')],
  ['5.05 · 일시 중단','미국은 협상 진전을 이유로 호위를 일시 중단한다고 발표. '+ref('escortpause','Reuters')],
  ['6월 합의 전후','보험중개사 Marsh의 추가 전쟁보험료 평가 · 선체 가치의 4.5~6% → 3~4%. '+ref('warpremium','S&P Global')]
],'text-table')+'<p class="note context-caption">5월 호위 전후를 같은 조건으로 비교할 수 있는 선박별 보험료와 화물량은 공개 자료로 확인되지 않는다.</p>'+
  '<p class="note context-caption">11월 5일에도 피격이 보도됐다. Reuters는 UKMTO를 인용해 그 주 일요일 이후 최소 5척이 사고를 신고했다고 전했다. '+ref('tankerNov5','Reuters')+'</p>'+
  '<p class="note context-caption">미 특사 톰 배럭은 10월 20일 도하에서 걸프 국가들의 방위 분담과 지역 협력을 강조했다. '+ref('barrackGulf','발언 보도')+'</p>';

byId('brent-quote').innerHTML=contextFlow([
  ['데이티드 기준가','약정 가격결정 기간의 평가 평균 가정 100.00'],
  ['화물 차등','Dated + 2.20'],
  ['화물 단가','102.20달러/배럴']
])+'<p class="note context-caption">특정 등급·선적 창의 매수 호가는 계약에서 정한 Dated 평가 기준에 차등을 붙인 값이다. 70만 배럴에 같은 단가를 적용하면 화물 대금 예시는 7,154만 달러다. '+ref('platts','Platts')+'</p>';
byId('brent-adjustments').innerHTML=marketTable(['조정','적용 기준과 사례'],[
  ['북해 품질 프리미엄','12월 선적분(11월 2일 발표) · 오세베르그 2.7170, 에코피스크 2.1513, 트롤 2.7625달러/배럴. '+ref('plattsqp','Platts')],
  ['포티스 황 함량 할인','2026년 3월 선적 기준, 황 0.6중량%를 넘는 부분에 0.1%p당 0.25달러/배럴 차감. 예를 들어 황 0.8%라면 0.50달러/배럴 차감. '+ref('forties','Platts')],
  ['WTI 미들랜드 운임 환산','로테르담 도착(CIF) 평가에서 북해–로테르담 운임 조정분을 빼 북해 본선인도(FOB)와 같은 기준으로 비교. '+ref('midlandfaf','Platts')]
],'text-table');
