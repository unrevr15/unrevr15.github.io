'use strict';

const nearbyDays=['11월 3일','11월 4일','11월 5일'];
const nearbySettlements=[
  {label:'WTI',maturity:'2026년 12월물',prices:[96.09,88.12,90.52],color:'#356fa4'},
  {label:'Brent',maturity:'2027년 1월물',prices:[103.60,94.62,98.29],color:'#ae4d22'}
];
byId('nearby-settlements').innerHTML=comparisonChart(nearbySettlements.map(({label,maturity,prices})=>[
  label+' '+maturity,prices
]),nearbyDays,{digits:2})+
  '<p class="note">미 현지 거래일. 4일에는 중간선거 이후 이란전 종식 기대가, 5일에는 유조선 사고와 공급 우려가 가격에 반영됐다고 Reuters는 보도했다. 민주당의 양원 승리가 보도됐고 새 의원 임기는 2027년 1월 3일 시작한다. 3일 가격은 다음 날 발표된 결제값과 변화액으로 역산했다. '+ref('nov4oil','11월 4일')+' '+ref('nov5oil','11월 5일')+' '+ref('midtermNov','선거')+' '+ref('congressTerms','의회 임기')+'</p>'+
  '<div class="transmission-links"><a href="#sea-flows">호르무즈 실제 유량 ↗</a><a href="#us-winter-buffer">중간유분 재고 ↗</a><a href="#inflation-chain">소비재 가격 전가 ↗</a></div>';

byId('curve-scenarios').innerHTML=marketTable(['비교할 지표','해석과 확인 조건'],[
  ['근월·원월','Brent 2027년 1월물과 2027년 12월물의 결제값 차이는 11월 3일 18.72달러, 11월 4일 15.50달러/배럴이다. 근월이 원월보다 높은 백워데이션이며 하루 새 3.22달러 줄었다.'],
  ['3월 23일과 11월 4일','3월 23일 미국의 공격 연기 발표 뒤 WTI는 10.3%, Brent는 10.9% 내려 마감했다. 11월 4일에도 협상 기대가 가격에 반영됐다. 두 날짜의 하락률은 관측값이며 전쟁 프리미엄만 분해한 값이 아니다. '+ref('march23Oil','3월 Reuters')+' '+ref('nov4oil','11월 Reuters')],
  ['공급 회복 가정','EIA 10월 전망은 2026년 4분기 중동 생산 차질을 하루 평균 약 450만 배럴로 가정했다. 2027년 2분기 말까지 대부분 회복한다는 경로는 우회 수송과 생산 재개를 전제로 한다. '+ref('steooct','EIA')],
  ['재고 완충','IEA 관측 세계 석유 재고는 9월 말에 2월 말보다 5억 900만 배럴 적었다. '+ref('ieaoil','IEA')],
  ['기관 가격 전망','11월 Goldman Sachs 전망으로 보도된 2027년 평균은 Brent 88달러, WTI 78달러/배럴이다. 거래소 원월물 결제값과 집계가 다르다. '+ref('goldmannov','보도')]
],'text-table')+'<div class="transmission-links"><a href="#brent-curve">브렌트 근월·원월 비교 ↗</a></div>';

byId('saudi-outlets').innerHTML=marketTable(['경로','확인된 내용과 보도'],[
  ['걸프 · 라스 타누라','후티는 10월 27일 정유소를 공격했다고 주장했다. Bloomberg는 터미널 인근 화재가 진압됐다고 보도했다. Aramco 투자설명서의 정유 명목능력은 하루 55만 배럴이며, 가동 손실이나 수출 선적 차질 물량이 아니다. '+ref('rasattack','Reuters')+' '+ref('rastanura','Aramco')],
  ['홍해 · 얀부','동서 송유관은 호르무즈를 우회한다. 9월에는 배관 공격으로 일시 차질이 났다. '+ref('ieaoil','IEA')]
],'text-table')+'<div class="transmission-links"><a href="#oil-map" data-region="gulf" data-site="ew">동서 송유관 지도 ↗</a></div>';
wireMapLinks('saudi-outlets');

byId('uae-outlets').innerHTML=marketTable(['상태','푸자이라 방향 수송'],[
  ['운영','기존 하브샨–푸자이라 배관은 호르무즈 밖에서 선적할 수 있다. Bloomberg 보도상 약 200만 배럴/일은 수송능력이며 실제 유량이 아니다. '+ref('uaepipe','Bloomberg')],
  ['건설 중','두 번째 배관은 2027년 가동을 목표로 보도됐다. '+ref('uaereply','Anadolu')],
  ['보도·당사자 반응','Bloomberg가 서부에서 푸자이라로 가는 세 번째 노선을 보도했다. ADNOC는 추측이라고 답했고 확정된 용량은 없다. '+ref('uaepipe','Bloomberg')+' '+ref('uaereply','ADNOC 반응')]
],'text-table')+'<div class="transmission-links"><a href="#oil-map" data-region="gulf" data-site="adcop">푸자이라 우회로 지도 ↗</a></div>';
wireMapLinks('uae-outlets');

byId('td3c-contract').innerHTML=contextFlow([
  ['DHT Puma','VLCC 개별 계약 사례'],
  ['Mercuria → Hunter','고정 약 5만 2천 달러/일'],
  ['Hunter → Mercuria','TD3C 연동 변동 용선료']
])+marketTable(['집계 시점','보고된 금액과 범위'],[
  ['9월 말','Hunter는 10월 9일 공시에서 상대방을 공개하지 않고 6,780만 달러 미수액을 밝혔다. '+ref('hunterdisclosure','공시 목록')],
  ['11월 4일 보도','Hunter 회장이 언급한 용선수입·손실·이자 합계는 1억 달러 초과다. 집계 범위가 9월 미수액과 다르다. '+ref('td3cbloom','Bloomberg')]
],'text-table')+'<p class="note">법정에서 보도된 DHT Puma 한 척의 구조다. Bloomberg는 당사자를 Mercuria로 식별했다.</p>';

byId('td3c-litigation').innerHTML=marketTable(['구분','2026년 11월 6일 한국시간 기준'],[
  ['쟁점','걸프→중국 VLCC 거래가 급감한 기간에 중개인 평가로 TD3C를 계속 공표할 수 있었는지다. Baltic Exchange는 평가가 가능했고 방법론을 준수했다는 입장이다. '+ref('td3cbaltic','Baltic')],
  ['청구 변경','11월 4일 보도에 따르면 Mercuria는 3월 초~7월 3일 공표의 적절성에 대한 선언적 판단을 구한다. 소급 중단·재산정 요구와 손실액 기재는 철회했다. '+ref('td3cft','10월 보도')+' '+ref('td3cbloom','11월 보도')],
  ['법원 절차','본안은 10월 26일 시작했고 11월 6일자 속행 일정까지 공개돼 있다. 본안 판결은 확인되지 않았다. Hunter 용선료는 별도 중재다. '+ref('td3cdocket','법원 일정')],
  ['계약 영향','지수 연동 용선계약과 선도운임계약(FFA)은 각자 정산·대체 지표 조항을 따른다. 과거 정산이 무효가 되는지는 이 소송만으로 정해지지 않는다.']
],'text-table')+'<div class="transmission-links"><a href="#shipping">TD3C 운임 시계열 ↗</a><a href="#tanker-assets">유조선과 호르무즈 실물 ↗</a></div>';

byId('gasoline-blend').innerHTML=contextFlow([
  ['휘발유 기초유분','배합 전 성분별 옥탄가'],
  ['배합재 투입','MTBE 등 옥탄가 보강'],
  ['완제품 출하','옥탄가·증기압 등 규격 충족']
])+marketTable(['관측','공급 영향의 범위'],[
  ['옴스크·톨리야티','옴스크 MTBE 공정 손상과 톨리야티 화학공장 피격이 각각 보도됐다. 톨리야티는 MTBE를 생산하지만 해당 라인의 손상·정지량은 미확인이다. '+ref('mtbeomsk','옴스크 보도')+' '+ref('mtbetoly','톨리야티 보도')],
  ['배합 여력','메틸 tert-부틸 에터(MTBE)는 휘발유 옥탄가를 높이는 배합재다. '+ref('mtbechem','연료 특성')+' 부족분을 메울 수단은 다른 고옥탄 성분, 재고, 수입이다. '+ref('mtbeimports','수입 분석')],
  ['계절과 3–2–1 크랙','겨울 휘발유는 여름보다 증기압 규격이 완화되는 시장에서 부탄을 더 섞을 수 있다. 드라이빙 시즌 종료와 함께 휘발유 크랙이 약해지면 휘발유 비중이 큰 3–2–1도 낮아질 수 있다. '+ref('blendseason','계절 배합')+' '+ref('crack','산식')]
],'text-table')+'<p class="note">공격 의도와 전국 휘발유 출하 손실은 확인되지 않았다. 11월에는 별도의 정유소 피격 보도도 이어졌다.</p>';

byId('winter-diesel').innerHTML=marketTable(['구분','설비와 완제품 공급'],[
  ['동절기 디젤','저온에서는 파라핀 결정이 필터를 막을 수 있다. 저온유동성이 좋은 유분 배합, 탈왁스 처리, 첨가제 등으로 동절기 규격을 맞춘다. MTBE는 휘발유 배합재다. '+ref('dieselflow','저온 규격')],
  ['10월 하순 러시아 투입','Reuters가 인용한 업계 소식통 추정 약 500만 배럴/일(Kpler 공개 블로그의 10월 월평균 추정은 약 430만). 11월 3일 야로슬라블 피격과 11월 5일 랴잔 피격 정황은 이 추정 뒤의 일이다. '+ref('russiaOctoberRuns','Reuters')+' '+ref('ruwinter','Kpler')+' '+ref('rulatest','11월 5일 보도')],
  ['러시아산 디젤 선적','11월 5일 Reuters는 대서양 횡단 신호를 보낸 화물이 최소 6건이라고 전했다. 당시 미국 도착은 관측되지 않았으며 선박의 목적지 신호는 하역 실적이 아니다. '+ref('rulatest','Reuters')]
],'text-table')+'<div class="transmission-links"><a href="#russia-repairs">시설별 처리능력과 복구 ↗</a><a href="#geopolitics">휴전과 디젤 수출 협의 ↗</a></div>';

byId('weekly-stock-moves').innerHTML=comparisonChart([
  ['상업 원유<small>전략비축 제외</small>',[-.9]],['휘발유',[-.2]],['중간유분',[-3.6]],['쿠싱 원유<small>상업 원유에 포함</small>',[.3]],['전략비축 원유',[-.4]]
],['전주 대비'],{signed:true,showSign:true})+
  '<p class="note">중간유분 기말 재고는 약 9,926만 배럴, 전략비축 원유는 약 2억 8,218만 배럴이다. 같은 주 총 상업용 석유는 약 818만 배럴, 상업 원유와 SPR 합계는 약 130만 배럴 감소했다. '+ref('wsoir','EIA')+' '+ref('spr','전략비축')+'</p>'+
  exactData(marketTable(['API · 10월 27일 발표','10월 23일 종료 · 백만 배럴'],[
    ['원유','−2.031'],['휘발유','+2.390'],['중간유분','+0.380'],['쿠싱','−0.453'],['SPR · 같은 주 별도 EIA','−0.100']
  ])+'<p class="note">API는 민간 집계로 위 EIA 그래프와 종료 주차가 다르다. '+ref('api1027','API 통계 인용')+' '+ref('spr','전략비축')+'</p>','10월 27일 API 발표와 같은 주 SPR');

byId('winter-distillate').innerHTML=comparisonChart([['미 동부 9월 중간유분 재고<small>2021~2025년 9월 평균 = 100</small>',[100,68]]],['5년 평균','2026년 9월'],{digits:0})+
  '<p class="note">EIA는 동부 재고가 2027년에도 해당 5년 계절 평균을 10~30% 밑돌 것으로 전망했다. 11월 4일 에너지부는 북동부 난방유 비축 100만 배럴 중 30만 배럴의 교환 계약을 발표했다. 기업은 같은 연료에 프리미엄을 더해 반환하는 조건이다. '+ref('steooct','EIA')+' '+ref('neheating','에너지부')+'</p>'+
  '<p class="note">2026년 5~9월 미국 정유 가동률은 95%를 넘었지만 설비능력은 2019년보다 4% 적었다. IIR은 정유소 7곳의 원유처리장치 10기가 가을 정비를 2027년 가을로 미뤘다고 보고했다. 겨울 이후 낮은 제품 재고로 여름 휘발유 성수기를 맞으면 정비·불시정지의 가격 영향이 커질 수 있다. '+ref('usrunrates','EIA 가동률')+' '+ref('iirmaint','IIR 정비')+'</p>'+
  '<div class="transmission-links"><a href="#product-stocks">계절별 재고 일수 ↗</a><a href="#diesel-transmission">디젤 현물·판매가 ↗</a></div>';

byId('eu-winter-scenario').innerHTML=comparisonChart([
  ['독일 전국 충전율',[61.5]],['일반 시설 법정 목표',[80]],['6개 시설 완화 목표',[45]]
],['11월 1일 · 작업용량 대비 %'])+
  '<p class="note">전국 평균과 개별 시설에 적용되는 법정 목표다. INES는 전국 충전율이 61.5%라고 발표했다. '+ref('destorage','INES')+'</p>'+
  comparisonChart([
    ['온화·재생 발전 증가',[33,25]],['한파·재생 발전 감소',[15,7]]
  ],['호르무즈 LNG 1월 재개','3월 말까지 차질'],{digits:0})+
  '<p class="note">IEA가 가정별로 계산한 2026/27년 난방기 말 EU 저장률(%). 겨울 진입 재고는 2013년 이후 가장 낮았다. 한파와 LNG 차질이 겹치는 경우 3월 초 10% 미만으로 내려가고 난방기 말 7%에 이른다. IEA는 충전율이 30% 아래로 내려가면 인출 속도가 느려지는 경향이 있다고 설명한다. '+ref('euGasStressPdf','IEA 73~74쪽')+'</p>'+
  marketTable(['일정·가정','유럽 공급에 미치는 영향'],[
    ['러시아산 장기 LNG','기존 장기계약의 수입 금지는 2027년 1월 1일부터 적용된다. '+ref('eugaslaw','EU 규정')],
    ['러시아산 장기 배관 가스','기존 장기계약은 2027년 9월 30일부터 적용된다. 집행위원회가 저장 목표 위험을 확인하면 11월 1일 적용 예외가 가능하다. '+ref('eugaslaw','EU 규정')],
    ['2027년 여름 재충전','네 시나리오에서 난방기 말 재고는 8~34 bcm이다. 11월 초까지 5년 평균을 회복하려면 여름에 57~83 bcm을 채워야 한다. '+ref('euGasStressPdf','IEA 74쪽')]
  ],'text-table')+'<div class="transmission-links"><a href="#gas-storage">EU 저장량 시점 비교 ↗</a><a href="#gas-map">배관·LNG 항로 ↗</a></div>';

byId('importer-lng-stress').innerHTML=exactData(marketTable(['2026년 3~10월 현물','달러/MMBtu','전년 같은 기간 대비'],[
    ['동북아 LNG(아시아 현물)','약 21.5','약 +80%'],
    ['유럽 TTF','약 20','약 +70%'],
    ['미국 Henry Hub','2.94','−9.4%']
  ])+'<p class="note">아시아·유럽은 국제에너지기구(IEA) 집계다. 미국은 EIA 월평균 8개를 단순 평균했다(2025년 3.24 → 2026년 2.94). '+ref('ieagas','IEA 3~10월')+' '+ref('henryHubMonthly','EIA Henry Hub')+'</p>','세 시장의 같은 기간 전년 대비')+
  '<p class="note"><strong>방글라데시</strong> Bloomberg는 2025년 LNG 수입의 약 60%가 카타르산이었고, 가스 공급 차질과 비용 상승이 섬유 염색·마감 및 도자기 공장의 가동을 압박했다고 보도했다. 8~9월에는 일부 LNG 터미널 가동 중단이 겹쳤다. '+ref('banglalng','Bloomberg')+' '+ref('ieagas','IEA')+'</p>';

byId('grid-queue').innerHTML=comparisonChart([
  ['발전설비 신청',[1312]],['저장설비 신청',[749]]
],['2025년 말 미국 송전망 접속 대기'],{digits:0})+
  '<p class="note">발전·저장 프로젝트의 신청 용량이다. 데이터센터의 수요 신청이나 즉시 쓸 수 있는 전력이 아니다. 2025년에 실제 가동한 발전 사업 중 자료가 있는 지역에서는 접속 신청부터 상업운전까지 중앙값이 5년을 넘었다. '+ref('queuedup','버클리랩')+'</p>'+
  comparisonChart([['GE Vernova 가스발전 장비',[116,122]]],['2026년 2분기 말','2026년 3분기 말'],{digits:0})+
  '<p class="note">장비 수주잔고와 생산 슬롯 예약의 합계다. 경영진은 2032년 인도 슬롯 예약을 언급했다. 장비 인도 뒤에도 설치와 송전 연결이 남는다. '+ref('geturbines','GE Vernova')+' '+ref('ge2032','설명회 보도')+'</p>';

byId('powered-shell').innerHTML=contextFlow([
  ['GPU 구매','선지출 발생'],
  ['전력·냉각·변전','설치 가능한 시설 확보'],
  ['서버 설치·시험','계통 연결과 전력 인도 확인'],
  ['상업 가동','매출 발생·추가 발주']
])+marketTable(['확인할 조건','가동 일정·비용'],[
  ['웜 셸과 좌초자본','나델라는 2025년 인터뷰에서 전력과 시설 부족으로 GPU 설치가 지연될 수 있다고 설명했다. GPU를 먼저 사면 가동 전 금융비용과 기술 노후화 부담이 생길 수 있다. '+ref('mswarm','인터뷰 보도')],
  ['미국 발전 확대 제안','OpenAI는 연 100GW의 신규 에너지 설비 확대를 제안했다. 제안 단계의 규모이며 승인되거나 운전 중인 설비가 아니다. '+ref('oai100gw','OpenAI')],
  ['펜실베이니아','주 행정명령은 AI 데이터센터를 신속 인허가에서 제외했다. 주정부의 GRID 협약은 피크 부하 25MW 초과 사업에 공급능력·접속과 사업 유발 비용 부담을 요구한다. '+ref('pagrid','주정부')],
  ['조달과 신용','머스크는 투자적격 신용, 스타링크·로켓 매출을 근거로 SpaceX가 400억 달러 GPU 금융을 조달했다고 밝혔다. Reuters가 인용한 후속 보도는 대출의 매수자 모집을 다뤘다. 네오클라우드 통합·도산과 신용 공급 위축의 범위는 관측값이 아닌 발언·전망이다. '+ref('spacexfund','발언')+' '+ref('spacexdeal','후속')]
],'text-table')+'<div class="transmission-links"><a href="#us-power-retail">미국 전기요금 ↗</a><a href="#ai-power-demand">AI 사용량과 전력 수요 ↗</a><a href="#inflation-chain">반도체 수출과 전력 제약 ↗</a></div>';

byId('india-coal-buffer').innerHTML='<h4>인도 발전소 재고 · 백만 톤</h4>'+
  comparisonChart([['인도 석탄부 발표 재고',[18.932,18.205]]],['9월 29일','10월 10일'],{digits:2})+
  '<p class="note">철도 수송은 9월 하루 평균 426편성, 10월 1~10일 469편성이었다. '+ref('indiaCoalActual','석탄부')+'</p>'+
  exactData(comparisonChart([['재고와 증량 목표',[18,55]]],['11월 보도 약','2027년 3월 목표'],{digits:0})+
    '<p class="note">백만 톤. 위 석탄부 발표 재고와 시점·범위가 다르다. '+ref('indiastock','목표 보도')+' '+ref('indiaCoalDaily','일일 집계')+'</p>',
    '2027년 여름 전 증량 목표');

byId('upstream-followup').innerHTML=exactData(marketTable(['사례','발표와 생산량 구분'],[
  ['Diamondback','11월 2일 주주서한은 2027년에 전기식 동시 파쇄팀 5개를 운영할 계획이라고 밝혔다. '+ref('diamondq3','회사')],
  ['미국 메탄 규정','EPA는 10월 27일 석유·가스 규정의 개정을 제안했다. 제안 단계이며 시행 일정과 비용 절감 규모는 정해지지 않았다. '+ref('epaoct','EPA')],
  ['베네수엘라','Reuters가 전한 17개 유전의 약 640억 배럴과 베이커 연구소 전문가가 추산한 계약 기간 25년 내 개발 가능량 약 100억 배럴은 다른 수치다. '+ref('venreuters','Reuters')]
],'text-table'),'셰일 투자·메탄 규제·베네수엘라');

byId('consumer-pass-through').innerHTML=comparisonChart([
  ['기초 매출 증가율',[5.2]],['판매량 기여',[2.9]],['가격 기여',[2.3]]
],['Unilever 2026년 3분기 · %'])+
  '<p class="note">Unilever는 원자재 비용 상승에 대응해 가격을 높였다고 발표했다. '+ref('unileverq3','공시')+'</p>'+
  '<p class="note">Kraft Heinz CFO는 비용 인플레이션을 2026년 연간 4% 소폭 상회, 4분기 약 6%로 예상했다. 2027년은 이전 4~5%에서 5% 소폭 상회로 높였다. 포장재·대두유를 포함한 회사 원가 전망이다. '+ref('kraftq3','실적 질의응답')+'</p>'+
  '<p class="note">클라스 노트는 11월 4일 보도에서 에너지 충격의 가격 전가가 상품과 서비스 물가에 영향을 줄 수 있다고 지적했다. ECB 결정과 구분되는 개인 견해다. '+ref('knotnov','Bloomberg')+'</p>';

byId('korea-exposure').innerHTML=comparisonChart([
  ['전체 수출',[115.28]],['반도체 수출<small>전체 수출에 포함</small>',[56.44]],['무역흑자',[42.50]]
],['2026년 10월 · 십억 달러'],{digits:2})+
  '<p class="note">반도체는 전체 수출의 약 49%다. '+ref('krtradeoct','산업통상부')+'</p>'+
  '<div class="transmission-reading">달러 표시 에너지 가격과 원·달러 환율이 함께 오르면 원화 수입단가가 상승한다. 외화 조달 여력이 작은 에너지 수입국은 연료 보조금과 재정 부담이 커질 수 있다. '+ref('undpcost','UNDP')+'</div>'+
  '<div class="transmission-links"><a href="#datacenter-power">데이터센터 전력 일정 ↗</a><a href="#diesel-cost">도매가와 연료 판매가 ↗</a></div>'+
  exactData(marketTable(['구분','삼성전자','SK하이닉스'],[
    ['11월 5일 정규장 종가','201,500원 (−7.57%)','1,264,000원 (−9.46%)']
  ])+'<p class="note">개별 주가의 일일 변동만으로 에너지 가격 효과를 분리할 수 없다. '+ref('krStockNov','정규장 마감')+'</p>'+
    '<p class="note">에너지 수입액, 수출대금 및 외국인 자금 흐름은 환율에 서로 다른 경로로 작용한다.</p>',
    '반도체 종가');

byId('fleet-note').insertAdjacentHTML('beforeend',
  '<div class="transmission-links"><a href="#td3c-case">TD3C 방법론 소송과 지수 연동 용선 ↗</a></div>');

byId('curve-scenarios').insertAdjacentHTML('beforeend',
  exactData(marketTable(['Aramco 경영진 · 11월 3일','추정과 전망'],[
    ['누적 액체연료 공급 손실','30억 배럴 초과로 추정. 동서 송유관과 전략비축 방출 등 대체 공급을 반영한 부족분은 약 20억 배럴이라고 설명했다.'],
    ['2027년 수요·재고','수요 억제 완화를 전제로 세계 액체연료 수요가 하루 약 240만 배럴 늘고 재고 복구에는 최대 2년이 걸릴 수 있다고 봤다.']
  ],'text-table')+'<p class="note">IEA의 관측 재고 감소량과 집계 범위가 다르다. '+ref('aramcoq3','Aramco 발표자료')+'</p>','Aramco의 누적 공급 손실 추정')
);

const fallCrackRows=[8,9].map(i=>{
  const gasoline=market2026.gasoline[i]*42-market2026.wti[i];
  const diesel=market2026.diesel[i]*42-market2026.wti[i];
  return [gasoline,diesel,(2*gasoline+diesel)/3];
});
byId('gasoline-blend').insertAdjacentHTML('beforeend',
  exactData(comparisonChart(['휘발유 크랙','디젤 크랙','3–2–1 크랙'].map((name,i)=>[name,fallCrackRows.map(row=>row[i])]),['9월','10월'],{digits:2})+
    '<p class="note">2026년 미국 걸프연안 현물과 쿠싱 WTI · 달러/배럴. 9~10월 변화는 계절 배합과 원유·제품 수급 변화를 합친 값이다. '+ref('usg','휘발유')+' '+ref('usd','디젤')+' '+ref('wti','원유')+'</p>',
    '9~10월 단일 제품·3–2–1 크랙 비교')
);
