'use strict';
// 정유시설 명부의 행: 교재 7.8, 7.10~7.15의 시설·운영사·설비능력·물류권과 표별 기준, 단위 읽는 법, 원자료.
// refinery-roster.js가 그린다. 능력은 원자료 단위 그대로이고(capacity_text), 좌표는 시설 소재지의 개략 위치다.
const refineryRoster = {
 "as_of": "2026-11-07",
 "units": [
  {
   "unit": "b/cd",
   "reading": "정비 등 연중 중단을 반영한 calendar-day 능력이다. 미국 EIA 표의 기준이다."
  },
  {
   "unit": "b/sd",
   "reading": "장치가 가동하는 날의 stream-day 능력이다. Shell 공시의 기준이다."
  },
  {
   "unit": "b/d",
   "reading": "원자료의 일일 명목능력이다. calendar-day·stream-day 정의가 명확하지 않으면 원자료 표기를 유지했다."
  },
  {
   "unit": "Mt/년",
   "reading": "연간 백만 톤이다. b/d로 바꾸려면 원유 밀도와 가동일수 가정이 필요해 환산하지 않았다."
  },
  {
   "unit": "천 b/d",
   "reading": "한국·주요 수출 허브 비교표의 단위다(840천 b/d = 840,000 b/d). 이 표의 시설은 다른 표에 b/d·Mt/년으로 다시 적혀 있어, 두 표의 행을 더하면 같은 시설이 두 번 들어간다."
  },
  {
   "unit": "정유단지·회사 합계",
   "reading": "개별 CDU·콘덴세이트 설비·동일 단지의 신구 공장이 이미 들어 있는 값이다."
  },
  {
   "unit": "현재 차질",
   "reading": "실제 중단 장치·가동량·출하량 기준이다. 명목능력과는 별개다."
  }
 ],
 "tables": [
  {
   "section": "7.8",
   "title": "한국·주요 수출 허브의 단지별 능력",
   "notes": [
    "단위는 천 b/d다. 시설 경계와 기준시점은 행에 따라 다르다. 명목능력이 현재 가동량을 뜻하지 않는다.",
    "CFU는 콘덴세이트 정제설비다. 수율·가공 기능이 일반 원유 CDU와 같은지는 확인하지 않았다.",
    "CDU와 콘덴세이트 설비를 어디까지 넣었는지에 따라 같은 공장의 능력도 다르게 표시된다."
   ]
  },
  {
   "section": "7.9",
   "title": "시설 명부의 능력 표시",
   "notes": [
    "전 세계 시설을 모두 담지는 않았다. 인도·일본은 공개 명부를 넓게 담았고, 다른 권역은 대형 공장과 주요 수출입 거점을 선정했다.",
    "설비능력의 기준일과 현재 운영 상태는 따로 적었다. 차질·복구 대장에 없는 시설의 운영 상태는 미확인이다.",
    "단위와 기준일이 다른 능력은 합산·환산하지 않았다."
   ]
  },
  {
   "section": "7.10",
   "title": "미주: 미국·캐나다·브라질",
   "notes": [
    "미국 수치는 EIA Table 5의 원유 상압증류능력이다.",
    "Port Arthur에는 Motiva 공장과 Valero 공장이 따로 있어 도시명만으로는 피해 시설을 특정할 수 없다.",
    "브라질 내륙 공장의 해안 터미널·배관·제품 유통망은 이 표에 없다."
   ]
  },
  {
   "section": "7.11",
   "title": "유럽·러시아: 대서양·지중해·내륙 거점",
   "notes": [
    "Shell의 b/sd와 TotalEnergies의 정기정비 반영 능력은 정의가 다르다.",
    "러시아 시설의 피격과 완전 중단은 별개다. 명목능력이 확인된 Yaroslavl도 실제 중단량은 공개되지 않았다."
   ]
  },
  {
   "section": "7.12",
   "title": "중동·아프리카: 걸프만 안쪽과 바깥쪽",
   "notes": [
    "OPEC 수치는 ASB 2025, Table 4.1의 2024년 명목값이다. 현재 가동량·복구 완료·추가 수출 가능량과 다른 값이다.",
    "홍해 거점은 호르무즈 밖에 있지만 원료 조달과 제품 출하는 바브엘만데브·항만·보험 조건에 달려 있다."
   ]
  },
  {
   "section": "7.13",
   "title": "인도: PPAC 공개 시설 명부",
   "notes": [
    "기준일은 2026년 4월 1일이다. 원자료의 천 톤/년 표기를 Mt/년으로 옮겼다.",
    "수치는 설치능력이다. 상업가동과 설계수율 달성 여부는 이 수치로 알 수 없다.",
    "Jamnagar의 RIL·RPL 행은 한 복합단지의 두 행이고, 단지 총계는 한국·주요 수출 허브 비교표에 있다. 증설 항목은 원자료에 기재된 상태대로 실었으며 현재 공급량에 들지 않는다."
   ]
  },
  {
   "section": "7.14",
   "title": "일본: 시설 명부와 추출 상충값",
   "notes": [
    "PAJ의 2026년 4월 시설 명부다. 명부 PDF에서 서로 다른 숫자가 함께 추출된 항목은 수치를 보류했다.",
    "PAJ 명부에 기재된 전체 설계능력은 3,110,400 b/d다.",
    "명부의 수치는 설계능력이며 현재 생산량과 다르다."
   ]
  },
  {
   "section": "7.15",
   "title": "한국·중국·동남아·호주: 선정 거점",
   "notes": [
    "중국·동남아는 선정 거점만 담았다.",
    "원유 CDU, 콘덴세이트 가공, 정유·화학 단지 능력은 범위가 서로 다르다."
   ]
  }
 ],
 "sources": [
  {
   "id": "kind-2025-09-04-hubs",
   "section": "7.8",
   "title": "시설 범위 대조: 2025년 9월 4일 국내 정유시설 비교 공시",
   "url": "https://kind.krx.co.kr/external/2025/09/04/000022/20250904000036/10601.htm"
  },
  {
   "id": "eia-table5",
   "section": "7.10",
   "title": "EIA: 미국 개별 정유소 명부·2026년 1월 1일",
   "url": "https://www.eia.gov/petroleum/refinerycapacity/table5.pdf"
  },
  {
   "id": "shell-ar-2025",
   "section": "7.10",
   "title": "Shell Annual Report 2025: 제조시설 표",
   "url": "https://www.shell.com/investors/results-and-reporting/annual-report/_jcr_content/root/main/section/promo/links/item0.stream/1773292272508/5e49e127579b77081f032b6088b348694aac0d14/shell-annual-report-2025.pdf"
  },
  {
   "id": "epe-2025",
   "section": "7.10",
   "title": "브라질 EPE: 2024/2025 Oil & Gas Report·Figure 4",
   "url": "https://www.epe.gov.br/sites-en/publicacoes-dados-abertos/publicacoes/PublicacoesArquivos/publicacao-197/topico-211/BOR_2024_2025.pdf"
  },
  {
   "id": "totalenergies-urd-2025",
   "section": "7.11",
   "title": "TotalEnergies Universal Registration Document 2025: 정유시설 표",
   "url": "https://totalenergies.com/system/files/documents/totalenergies_universal-registration-document-2025_2026_en.pdf"
  },
  {
   "id": "reuters-2026-11-05",
   "section": "7.11",
   "title": "러시아 시설·사건 근거: Reuters 기사 재게재·2026년 11월 5일",
   "url": "https://ca.marketscreener.com/news/renewed-refinery-attacks-deplete-russian-diesel-supply-as-us-deal-in-focus-ce785fddd889f527"
  },
  {
   "id": "opec-asb-2025",
   "section": "7.12",
   "title": "OPEC ASB 2025: Table 4.1·시설별 명목능력",
   "url": "https://www.opec.org/assets/assetdb/asb-2025.pdf"
  },
  {
   "id": "oq-2024-08",
   "section": "7.12",
   "title": "OQ: Duqm·Suhar 정유능력·2024년 8월 공개자료",
   "url": "https://assets.oq.com/en/news-and-media/newsroom/202408-oq-celebrates-groundbreaking-of-strategic-fuel-reserve-project-valued-at-usd-124-million"
  },
  {
   "id": "bapco-bmp",
   "section": "7.12",
   "title": "Bapco: Modernisation Programme 설계능력",
   "url": "https://www.bapco.net/en/page/faqs/"
  },
  {
   "id": "ppac-2026-04",
   "section": "7.13",
   "title": "인도 PPAC: Installed Refinery Capacity·2026년 4월 1일",
   "url": "https://ppac.gov.in/infrastructure/installed-refinery-capacity"
  },
  {
   "id": "paj-2026-04",
   "section": "7.14",
   "title": "일본 PAJ: 정유시설 지도·설계능력·2026년 4월",
   "url": "https://www.paj.gr.jp/sites/default/files/2026-06/paj-04E_refining%20capacities%20_202604r.pdf"
  },
  {
   "id": "idemitsu-chiba",
   "section": "7.14",
   "title": "Idemitsu Chiba: 공정별 능력·2026년 4월 1일 대조",
   "url": "https://www.idemitsu.com/en/business/factory/chiba/ability/index.html"
  },
  {
   "id": "kind-2025-09-04",
   "section": "7.15",
   "title": "국내 설비 정의: 2025년 9월 4일 투자설명서",
   "url": "https://kind.krx.co.kr/external/2025/09/04/000022/20250904000036/10601.htm"
  },
  {
   "id": "rongsheng-2024",
   "section": "7.15",
   "title": "중국: Rongsheng 2024 Annual Report Summary·ZPC 정유·화학",
   "url": "https://disc.static.szse.cn/disc/disk03/finalpage/2025-05-13/16201d6a-05da-49dc-96f0-98bc731fbec0.PDF"
  },
  {
   "id": "exxonmobil-singapore",
   "section": "7.15",
   "title": "싱가포르: ExxonMobil 운영시설 소개",
   "url": "https://corporate.exxonmobil.com/locations/singapore/our-operations"
  },
  {
   "id": "petronas-outlook",
   "section": "7.15",
   "title": "말레이시아: PETRONAS Activity Outlook 2025–2027",
   "url": "https://petronas.com/sites/default/files/uploads/content/2025/PETRONAS%20Activity%20Outlook%202025-2027.pdf"
  },
  {
   "id": "viva-geelong",
   "section": "7.15",
   "title": "호주: Viva Energy Geelong 정유소",
   "url": "https://www.vivaenergy.com.au/operations/geelong"
  },
  {
   "id": "ampol-lytton",
   "section": "7.15",
   "title": "호주: Ampol Lytton 운영시설 소개",
   "url": "https://www.ampol.com.au/about-ampol/news-and-media/lytton-refinery-to-continue"
  }
 ],
 "rows": [
  {
   "id": "hub-ulsan-sk-energy",
   "section": "7.8",
   "region": "한국·중국·동남아·호주",
   "country": "한국",
   "zone": "",
   "facility": "울산",
   "operator": "SK에너지",
   "capacity": 840,
   "unit": "천 b/d",
   "capacity_text": "840천 b/d",
   "basis": "2025년 9월 4일 투자설명서",
   "basis_date": "2025-09-04",
   "source": "2025년 9월 4일 투자설명서(국내 정유시설 비교 공시)",
   "source_ids": [
    "kind-2025-09-04-hubs"
   ],
   "note": "2025년 9월 4일 투자설명서의 CDU다. 한국·중국·동남아·호주 선정 거점 표의 울산·SK에너지 행(840,000 b/d·CDU)과 같은 시설·같은 값이다.",
   "lat": 35.5,
   "lon": 129.4,
   "same_facility_as": [
    "kr-ulsan-sk-energy"
   ]
  },
  {
   "id": "hub-incheon-sk-incheon-petrochem",
   "section": "7.8",
   "region": "한국·중국·동남아·호주",
   "country": "한국",
   "zone": "",
   "facility": "인천",
   "operator": "SK인천석유화학",
   "capacity": 275,
   "unit": "천 b/d",
   "capacity_text": "275천 b/d",
   "basis": "2025년 9월 4일 투자설명서",
   "basis_date": "2025-09-04",
   "source": "2025년 9월 4일 투자설명서(국내 정유시설 비교 공시)",
   "source_ids": [
    "kind-2025-09-04-hubs"
   ],
   "note": "원유 증류능력 275천 b/d다. 콘덴세이트 설비 포함 표기는 375천 b/d이며, 포함 표기에 275가 들어 있다. 한국·중국·동남아·호주 선정 거점 표의 인천·SK인천석유화학 행(275,000 b/d·CDU)과 같은 시설·같은 값이다.",
   "lat": 37.5,
   "lon": 126.6,
   "same_facility_as": [
    "kr-incheon-sk-incheon-petrochem"
   ]
  },
  {
   "id": "hub-yeosu-gs-caltex",
   "section": "7.8",
   "region": "한국·중국·동남아·호주",
   "country": "한국",
   "zone": "",
   "facility": "여수",
   "operator": "GS칼텍스",
   "capacity": 800,
   "unit": "천 b/d",
   "capacity_text": "800천 b/d",
   "basis": "기업 공식 소개·2026년 11월 7일 확인",
   "basis_date": "2026-11-07",
   "source": "GS칼텍스 공식 소개",
   "source_ids": [],
   "note": "원유 정제능력이다. 한국·중국·동남아·호주 선정 거점 표의 여수·GS칼텍스 행(800,000 b/d)과 같은 시설·같은 값이다.",
   "lat": 34.7,
   "lon": 127.8,
   "same_facility_as": [
    "kr-yeosu-gs-caltex"
   ]
  },
  {
   "id": "hub-onsan-s-oil",
   "section": "7.8",
   "region": "한국·중국·동남아·호주",
   "country": "한국",
   "zone": "",
   "facility": "온산",
   "operator": "S-OIL",
   "capacity": 580,
   "unit": "천 b/d",
   "capacity_text": "580천 b/d",
   "basis": "2025년 공시·공식 소개 대조",
   "basis_date": "2025",
   "source": "2025년 공시·S-OIL 공식 소개",
   "source_ids": [],
   "note": "원유 증류능력 580천 b/d다. 공시상 CFU 포함 669천 b/d, 기업 소개 총능력도 669천 b/d다. 669에 580이 들어 있다. 한국·중국·동남아·호주 선정 거점 표의 온산·S-OIL 행(580,000 b/d·CDU)과 같은 시설·같은 값이다.",
   "lat": 35.4,
   "lon": 129.3,
   "same_facility_as": [
    "kr-onsan-s-oil"
   ]
  },
  {
   "id": "hub-daesan-hd-hyundai-oilbank",
   "section": "7.8",
   "region": "한국·중국·동남아·호주",
   "country": "한국",
   "zone": "",
   "facility": "대산",
   "operator": "HD현대오일뱅크",
   "capacity": 520,
   "unit": "천 b/d",
   "capacity_text": "520천 b/d",
   "basis": "2025년 9월 4일 투자설명서",
   "basis_date": "2025-09-04",
   "source": "2025년 9월 4일 투자설명서(국내 정유시설 비교 공시)",
   "source_ids": [
    "kind-2025-09-04-hubs"
   ],
   "note": "원유 증류능력 520천 b/d다. 콘덴세이트 설비 포함 표기는 690천 b/d이며, 포함 표기에 520이 들어 있다. 한국·중국·동남아·호주 선정 거점 표의 대산·HD현대오일뱅크 행(520,000 b/d·CDU)과 같은 시설·같은 값이다.",
   "lat": 37.0,
   "lon": 126.4,
   "same_facility_as": [
    "kr-daesan-hd-hyundai-oilbank"
   ]
  },
  {
   "id": "hub-jamnagar-reliance",
   "section": "7.8",
   "region": "인도",
   "country": "인도",
   "zone": "",
   "facility": "Jamnagar",
   "operator": "",
   "capacity": 1400,
   "unit": "천 b/d",
   "capacity_text": "1,400천 b/d",
   "basis": "Reliance 공식 소개·2026년 11월 7일 확인",
   "basis_date": "2026-11-07",
   "source": "Reliance 공식 소개",
   "source_ids": [],
   "note": "단일 사이트 복합단지의 crude processing이다. 인도 PPAC 명부의 Jamnagar·RIL(33.000 Mt/년), Jamnagar SEZ·RPL(35.200 Mt/년) 행과 같은 단지다. 두 행은 이 행과 단위가 다르다.",
   "lat": 22.4,
   "lon": 69.9,
   "same_facility_as": [
    "in-jamnagar-ril",
    "in-jamnagar-sez-rpl"
   ]
  },
  {
   "id": "hub-ruwais",
   "section": "7.8",
   "region": "중동",
   "country": "UAE",
   "zone": "",
   "facility": "Ruwais",
   "operator": "",
   "capacity": 817,
   "unit": "천 b/d",
   "capacity_text": "817천 b/d",
   "basis": "OPEC ASB 2025의 2024년 기준",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "OPEC ASB 2025 표의 명목 정유능력이다. 중동·아프리카 명부의 Ruwais 행(817,000 b/d)과 같은 시설·같은 자료다. 주요 정유시설 표의 루와이스 값은 운영사의 가동일 기준 능력이라 이 행과 기준이 다르다.",
   "lat": 24.1,
   "lon": 52.7,
   "same_facility_as": [
    "ae-ruwais"
   ]
  },
  {
   "id": "hub-al-zour",
   "section": "7.8",
   "region": "중동",
   "country": "쿠웨이트",
   "zone": "",
   "facility": "Al-Zour",
   "operator": "",
   "capacity": 615,
   "unit": "천 b/d",
   "capacity_text": "615천 b/d",
   "basis": "OPEC ASB 2025의 2024년 기준",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "OPEC ASB 2025 표의 명목 정유능력이다. 중동·아프리카 명부의 Al-Zour 행(615,000 b/d)과 같은 시설·같은 자료다.",
   "lat": 28.7,
   "lon": 48.4,
   "same_facility_as": [
    "kw-al-zour"
   ]
  },
  {
   "id": "hub-dangote-lekki",
   "section": "7.8",
   "region": "아프리카",
   "country": "나이지리아",
   "zone": "",
   "facility": "Dangote/Lekki",
   "operator": "",
   "capacity": 650,
   "unit": "천 b/d",
   "capacity_text": "650천 b/d",
   "basis": "OPEC ASB 2025의 2024년 기준",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "OPEC ASB 2025 표의 명목 정유능력이다. 중동·아프리카 명부의 Dangote / Lekki 행(650,000 b/d)과 같은 시설·같은 자료다.",
   "lat": 6.4,
   "lon": 4.0,
   "same_facility_as": [
    "ng-dangote-lekki"
   ]
  },
  {
   "id": "us-port-arthur-motiva",
   "section": "7.10",
   "region": "미주",
   "country": "미국",
   "zone": "텍사스 걸프",
   "facility": "Port Arthur",
   "operator": "Motiva",
   "capacity": 656400,
   "unit": "b/cd",
   "capacity_text": "656,400 b/cd",
   "basis": "EIA·2026년 1월 1일",
   "basis_date": "2026-01-01",
   "source": "EIA",
   "source_ids": [
    "eia-table5"
   ],
   "note": "같은 도시에 Valero 공장(385,000 b/cd)이 따로 있다.",
   "lat": 29.9,
   "lon": -94.0,
   "same_facility_as": []
  },
  {
   "id": "us-galveston-bay-marathon",
   "section": "7.10",
   "region": "미주",
   "country": "미국",
   "zone": "텍사스 걸프",
   "facility": "Galveston Bay",
   "operator": "Marathon",
   "capacity": 631000,
   "unit": "b/cd",
   "capacity_text": "631,000 b/cd",
   "basis": "EIA·2026년 1월 1일",
   "basis_date": "2026-01-01",
   "source": "EIA",
   "source_ids": [
    "eia-table5"
   ],
   "note": "",
   "lat": 29.4,
   "lon": -94.9,
   "same_facility_as": []
  },
  {
   "id": "us-garyville-marathon",
   "section": "7.10",
   "region": "미주",
   "country": "미국",
   "zone": "루이지애나",
   "facility": "Garyville",
   "operator": "Marathon",
   "capacity": 617000,
   "unit": "b/cd",
   "capacity_text": "617,000 b/cd",
   "basis": "EIA·2026년 1월 1일",
   "basis_date": "2026-01-01",
   "source": "EIA",
   "source_ids": [
    "eia-table5"
   ],
   "note": "",
   "lat": 30.1,
   "lon": -90.6,
   "same_facility_as": []
  },
  {
   "id": "us-beaumont-exxonmobil",
   "section": "7.10",
   "region": "미주",
   "country": "미국",
   "zone": "텍사스 걸프",
   "facility": "Beaumont",
   "operator": "ExxonMobil",
   "capacity": 612000,
   "unit": "b/cd",
   "capacity_text": "612,000 b/cd",
   "basis": "EIA·2026년 1월 1일",
   "basis_date": "2026-01-01",
   "source": "EIA",
   "source_ids": [
    "eia-table5"
   ],
   "note": "",
   "lat": 30.1,
   "lon": -94.1,
   "same_facility_as": []
  },
  {
   "id": "us-baytown-exxonmobil",
   "section": "7.10",
   "region": "미주",
   "country": "미국",
   "zone": "휴스턴권",
   "facility": "Baytown",
   "operator": "ExxonMobil",
   "capacity": 564500,
   "unit": "b/cd",
   "capacity_text": "564,500 b/cd",
   "basis": "EIA·2026년 1월 1일",
   "basis_date": "2026-01-01",
   "source": "EIA",
   "source_ids": [
    "eia-table5"
   ],
   "note": "",
   "lat": 29.7,
   "lon": -95.0,
   "same_facility_as": []
  },
  {
   "id": "us-baton-rouge-exxonmobil",
   "section": "7.10",
   "region": "미주",
   "country": "미국",
   "zone": "루이지애나",
   "facility": "Baton Rouge",
   "operator": "ExxonMobil",
   "capacity": 523500,
   "unit": "b/cd",
   "capacity_text": "523,500 b/cd",
   "basis": "EIA·2026년 1월 1일",
   "basis_date": "2026-01-01",
   "source": "EIA",
   "source_ids": [
    "eia-table5"
   ],
   "note": "",
   "lat": 30.5,
   "lon": -91.2,
   "same_facility_as": []
  },
  {
   "id": "us-lake-charles-citgo",
   "section": "7.10",
   "region": "미주",
   "country": "미국",
   "zone": "루이지애나",
   "facility": "Lake Charles",
   "operator": "CITGO",
   "capacity": 471200,
   "unit": "b/cd",
   "capacity_text": "471,200 b/cd",
   "basis": "EIA·2026년 1월 1일",
   "basis_date": "2026-01-01",
   "source": "EIA",
   "source_ids": [
    "eia-table5"
   ],
   "note": "",
   "lat": 30.2,
   "lon": -93.3,
   "same_facility_as": []
  },
  {
   "id": "us-whiting-bp",
   "section": "7.10",
   "region": "미주",
   "country": "미국",
   "zone": "중서부",
   "facility": "Whiting",
   "operator": "BP",
   "capacity": 435000,
   "unit": "b/cd",
   "capacity_text": "435,000 b/cd",
   "basis": "EIA·2026년 1월 1일",
   "basis_date": "2026-01-01",
   "source": "EIA",
   "source_ids": [
    "eia-table5"
   ],
   "note": "",
   "lat": 41.7,
   "lon": -87.5,
   "same_facility_as": []
  },
  {
   "id": "us-port-arthur-valero",
   "section": "7.10",
   "region": "미주",
   "country": "미국",
   "zone": "텍사스 걸프",
   "facility": "Port Arthur",
   "operator": "Valero",
   "capacity": 385000,
   "unit": "b/cd",
   "capacity_text": "385,000 b/cd",
   "basis": "EIA·2026년 1월 1일·Motiva 공장과 별개",
   "basis_date": "2026-01-01",
   "source": "EIA",
   "source_ids": [
    "eia-table5"
   ],
   "note": "같은 도시의 Motiva 공장(656,400 b/cd)과 별개다.",
   "lat": 29.9,
   "lon": -94.0,
   "same_facility_as": []
  },
  {
   "id": "us-los-angeles-carson-marathon",
   "section": "7.10",
   "region": "미주",
   "country": "미국",
   "zone": "서해안",
   "facility": "Los Angeles / Carson",
   "operator": "Marathon",
   "capacity": 365000,
   "unit": "b/cd",
   "capacity_text": "365,000 b/cd",
   "basis": "EIA·2026년 1월 1일",
   "basis_date": "2026-01-01",
   "source": "EIA",
   "source_ids": [
    "eia-table5"
   ],
   "note": "",
   "lat": 33.8,
   "lon": -118.2,
   "same_facility_as": []
  },
  {
   "id": "us-pascagoula-chevron",
   "section": "7.10",
   "region": "미주",
   "country": "미국",
   "zone": "미시시피 걸프",
   "facility": "Pascagoula",
   "operator": "Chevron",
   "capacity": 356440,
   "unit": "b/cd",
   "capacity_text": "356,440 b/cd",
   "basis": "EIA·2026년 1월 1일",
   "basis_date": "2026-01-01",
   "source": "EIA",
   "source_ids": [
    "eia-table5"
   ],
   "note": "",
   "lat": 30.3,
   "lon": -88.5,
   "same_facility_as": []
  },
  {
   "id": "us-corpus-christi-valero",
   "section": "7.10",
   "region": "미주",
   "country": "미국",
   "zone": "텍사스 걸프",
   "facility": "Corpus Christi",
   "operator": "Valero",
   "capacity": 290000,
   "unit": "b/cd",
   "capacity_text": "290,000 b/cd",
   "basis": "EIA·2026년 1월 1일",
   "basis_date": "2026-01-01",
   "source": "EIA",
   "source_ids": [
    "eia-table5"
   ],
   "note": "",
   "lat": 27.8,
   "lon": -97.4,
   "same_facility_as": []
  },
  {
   "id": "us-sweeny-phillips-66",
   "section": "7.10",
   "region": "미주",
   "country": "미국",
   "zone": "텍사스 걸프",
   "facility": "Sweeny",
   "operator": "Phillips 66",
   "capacity": 277000,
   "unit": "b/cd",
   "capacity_text": "277,000 b/cd",
   "basis": "EIA·2026년 1월 1일",
   "basis_date": "2026-01-01",
   "source": "EIA",
   "source_ids": [
    "eia-table5"
   ],
   "note": "",
   "lat": 29.1,
   "lon": -95.7,
   "same_facility_as": []
  },
  {
   "id": "ca-scotford-shell",
   "section": "7.10",
   "region": "미주",
   "country": "캐나다",
   "zone": "앨버타 내륙",
   "facility": "Scotford",
   "operator": "Shell",
   "capacity": 100000,
   "unit": "b/sd",
   "capacity_text": "100,000 b/sd",
   "basis": "Shell·2025년 12월 31일·업그레이더와 구분",
   "basis_date": "2025-12-31",
   "source": "Shell Annual Report 2025",
   "source_ids": [
    "shell-ar-2025"
   ],
   "note": "업그레이더와 구분한 정유소 능력이다.",
   "lat": 53.8,
   "lon": -113.1,
   "same_facility_as": []
  },
  {
   "id": "br-paulinia-replan-petrobras",
   "section": "7.10",
   "region": "미주",
   "country": "브라질",
   "zone": "상파울루 내륙",
   "facility": "Paulínia / REPLAN",
   "operator": "Petrobras",
   "capacity": 434000,
   "unit": "b/d",
   "capacity_text": "434,000 b/d",
   "basis": "EPE·2025년 7월 명목능력",
   "basis_date": "2025-07",
   "source": "브라질 EPE",
   "source_ids": [
    "epe-2025"
   ],
   "note": "명목능력이다.",
   "lat": -22.7,
   "lon": -47.1,
   "same_facility_as": []
  },
  {
   "id": "br-revap-petrobras",
   "section": "7.10",
   "region": "미주",
   "country": "브라질",
   "zone": "상파울루권",
   "facility": "REVAP",
   "operator": "Petrobras",
   "capacity": 252000,
   "unit": "b/d",
   "capacity_text": "252,000 b/d",
   "basis": "EPE·2025년 7월 명목능력",
   "basis_date": "2025-07",
   "source": "브라질 EPE",
   "source_ids": [
    "epe-2025"
   ],
   "note": "명목능력이다.",
   "lat": -23.2,
   "lon": -45.8,
   "same_facility_as": []
  },
  {
   "id": "nl-pernis-shell",
   "section": "7.11",
   "region": "유럽·러시아",
   "country": "네덜란드",
   "zone": "ARA",
   "facility": "Pernis",
   "operator": "Shell",
   "capacity": 447000,
   "unit": "b/sd",
   "capacity_text": "447,000 b/sd",
   "basis": "2025년 12월 31일·지분 적용 전 설비 전체",
   "basis_date": "2025-12-31",
   "source": "Shell 공시",
   "source_ids": [],
   "note": "지분 적용 전 설비 전체 능력이다.",
   "lat": 51.9,
   "lon": 4.4,
   "same_facility_as": []
  },
  {
   "id": "de-rheinland-shell",
   "section": "7.11",
   "region": "유럽·러시아",
   "country": "독일",
   "zone": "라인강권",
   "facility": "Rheinland",
   "operator": "Shell",
   "capacity": 235000,
   "unit": "b/sd",
   "capacity_text": "235,000 b/sd",
   "basis": "2025년 12월 31일·동일 단지의 사업 범위 확인",
   "basis_date": "2025-12-31",
   "source": "Shell 공시",
   "source_ids": [],
   "note": "",
   "lat": 50.9,
   "lon": 7.0,
   "same_facility_as": []
  },
  {
   "id": "fr-normandy-gonfreville-totalenergies",
   "section": "7.11",
   "region": "유럽·러시아",
   "country": "프랑스",
   "zone": "르아브르권",
   "facility": "Normandy-Gonfreville",
   "operator": "TotalEnergies",
   "capacity": 253000,
   "unit": "b/d",
   "capacity_text": "253,000 b/d",
   "basis": "2025년 연차공시·정기정비 영향 반영 정의",
   "basis_date": "2025",
   "source": "TotalEnergies Universal Registration Document 2025",
   "source_ids": [
    "totalenergies-urd-2025"
   ],
   "note": "정기정비 영향을 반영한 정의의 능력이다.",
   "lat": 49.5,
   "lon": 0.2,
   "same_facility_as": []
  },
  {
   "id": "fr-donges-totalenergies",
   "section": "7.11",
   "region": "유럽·러시아",
   "country": "프랑스",
   "zone": "대서양",
   "facility": "Donges",
   "operator": "TotalEnergies",
   "capacity": 219000,
   "unit": "b/d",
   "capacity_text": "219,000 b/d",
   "basis": "2025년 연차공시",
   "basis_date": "2025",
   "source": "TotalEnergies Universal Registration Document 2025",
   "source_ids": [
    "totalenergies-urd-2025"
   ],
   "note": "",
   "lat": 47.3,
   "lon": -2.1,
   "same_facility_as": []
  },
  {
   "id": "fr-feyzin-totalenergies",
   "section": "7.11",
   "region": "유럽·러시아",
   "country": "프랑스",
   "zone": "내륙",
   "facility": "Feyzin",
   "operator": "TotalEnergies",
   "capacity": 109000,
   "unit": "b/d",
   "capacity_text": "109,000 b/d",
   "basis": "2025년 연차공시",
   "basis_date": "2025",
   "source": "TotalEnergies Universal Registration Document 2025",
   "source_ids": [
    "totalenergies-urd-2025"
   ],
   "note": "",
   "lat": 45.7,
   "lon": 4.9,
   "same_facility_as": []
  },
  {
   "id": "be-antwerp-totalenergies",
   "section": "7.11",
   "region": "유럽·러시아",
   "country": "벨기에",
   "zone": "ARA",
   "facility": "Antwerp",
   "operator": "TotalEnergies",
   "capacity": 338000,
   "unit": "b/d",
   "capacity_text": "338,000 b/d",
   "basis": "2025년 연차공시",
   "basis_date": "2025",
   "source": "TotalEnergies Universal Registration Document 2025",
   "source_ids": [
    "totalenergies-urd-2025"
   ],
   "note": "",
   "lat": 51.3,
   "lon": 4.3,
   "same_facility_as": []
  },
  {
   "id": "ru-yaroslavl-yanos-slavneft",
   "section": "7.11",
   "region": "유럽·러시아",
   "country": "러시아",
   "zone": "내륙·제품 수출망",
   "facility": "Yaroslavl / YANOS",
   "operator": "Slavneft",
   "capacity": 15,
   "unit": "Mt/년",
   "capacity_text": "약 15 Mt/년",
   "basis": "Reuters·2026년 11월 3일·실제 중단량은 별도 미공개",
   "basis_date": "2026-11-03",
   "source": "Reuters",
   "source_ids": [
    "reuters-2026-11-05"
   ],
   "note": "약 15 Mt/년이다. 실제 중단량은 공개되지 않았다. 11월 3일 화재의 근거 기사는 차질·복구 대장의 해당 기록에 있다.",
   "lat": 57.6,
   "lon": 39.9,
   "same_facility_as": []
  },
  {
   "id": "ru-ryazan-rosneft",
   "section": "7.11",
   "region": "유럽·러시아",
   "country": "러시아",
   "zone": "내륙",
   "facility": "Ryazan",
   "operator": "Rosneft",
   "capacity": null,
   "unit": "",
   "capacity_text": "능력 수치 미검증",
   "basis": "Reuters·2026년 11월 5일 피격 정황·차질·복구 대장 참조",
   "basis_date": "2026-11-05",
   "source": "Reuters",
   "source_ids": [
    "reuters-2026-11-05"
   ],
   "note": "능력 수치를 검증하지 못했다. 주요 정유시설 표의 랴잔 값은 인용 설비능력이고, 이 명부의 원자료로는 확인하지 못했다. 피격 정황은 차질·복구 대장의 해당 기록에 있다.",
   "lat": 54.6,
   "lon": 39.8,
   "same_facility_as": []
  },
  {
   "id": "ru-afipsky",
   "section": "7.11",
   "region": "유럽·러시아",
   "country": "러시아",
   "zone": "흑해권",
   "facility": "Afipsky",
   "operator": "",
   "capacity": null,
   "unit": "",
   "capacity_text": "능력 수치 미검증",
   "basis": "시설 식별과 현재 운전·손실량을 분리·차질·복구 대장 참조",
   "basis_date": "",
   "source": "",
   "source_ids": [],
   "note": "능력 수치를 검증하지 못했다. 이 행에는 시설 식별만 있고, 현재 상태는 차질·복구 대장의 해당 기록에 있다.",
   "lat": 44.9,
   "lon": 38.8,
   "same_facility_as": []
  },
  {
   "id": "sa-ras-tanura",
   "section": "7.12",
   "region": "중동",
   "country": "사우디",
   "zone": "걸프만",
   "facility": "Ras Tanura",
   "operator": "",
   "capacity": 550000,
   "unit": "b/d",
   "capacity_text": "550,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "",
   "lat": 26.6,
   "lon": 50.2,
   "same_facility_as": []
  },
  {
   "id": "sa-satorp",
   "section": "7.12",
   "region": "중동",
   "country": "사우디",
   "zone": "Jubail / 걸프만",
   "facility": "SATORP",
   "operator": "",
   "capacity": 460000,
   "unit": "b/d",
   "capacity_text": "460,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "",
   "lat": 27.0,
   "lon": 49.6,
   "same_facility_as": []
  },
  {
   "id": "sa-sasref",
   "section": "7.12",
   "region": "중동",
   "country": "사우디",
   "zone": "Jubail / 걸프만",
   "facility": "SASREF",
   "operator": "",
   "capacity": 305000,
   "unit": "b/d",
   "capacity_text": "305,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "",
   "lat": 27.0,
   "lon": 49.6,
   "same_facility_as": []
  },
  {
   "id": "sa-yasref",
   "section": "7.12",
   "region": "중동",
   "country": "사우디",
   "zone": "홍해",
   "facility": "YASREF",
   "operator": "",
   "capacity": 430000,
   "unit": "b/d",
   "capacity_text": "430,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "",
   "lat": 24.1,
   "lon": 38.1,
   "same_facility_as": []
  },
  {
   "id": "sa-samref",
   "section": "7.12",
   "region": "중동",
   "country": "사우디",
   "zone": "홍해",
   "facility": "SAMREF",
   "operator": "",
   "capacity": 400000,
   "unit": "b/d",
   "capacity_text": "400,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "",
   "lat": 24.1,
   "lon": 38.1,
   "same_facility_as": []
  },
  {
   "id": "sa-petro-rabigh",
   "section": "7.12",
   "region": "중동",
   "country": "사우디",
   "zone": "홍해",
   "facility": "Petro Rabigh",
   "operator": "",
   "capacity": 400000,
   "unit": "b/d",
   "capacity_text": "400,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "",
   "lat": 22.7,
   "lon": 39.0,
   "same_facility_as": []
  },
  {
   "id": "sa-jazan",
   "section": "7.12",
   "region": "중동",
   "country": "사우디",
   "zone": "홍해 남부",
   "facility": "Jazan / Jizan",
   "operator": "",
   "capacity": 400000,
   "unit": "b/d",
   "capacity_text": "400,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "",
   "lat": 17.3,
   "lon": 42.4,
   "same_facility_as": []
  },
  {
   "id": "sa-yanbu-aramco",
   "section": "7.12",
   "region": "중동",
   "country": "사우디",
   "zone": "홍해",
   "facility": "Yanbu",
   "operator": "Aramco",
   "capacity": 220000,
   "unit": "b/d",
   "capacity_text": "220,000 b/d",
   "basis": "OPEC·2024년·YASREF·SAMREF와 별개",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "같은 Yanbu의 YASREF·SAMREF와 별개 공장이다.",
   "lat": 24.1,
   "lon": 38.1,
   "same_facility_as": []
  },
  {
   "id": "sa-riyadh",
   "section": "7.12",
   "region": "중동",
   "country": "사우디",
   "zone": "내륙",
   "facility": "Riyadh",
   "operator": "",
   "capacity": 126000,
   "unit": "b/d",
   "capacity_text": "126,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "",
   "lat": 24.7,
   "lon": 46.7,
   "same_facility_as": []
  },
  {
   "id": "kw-al-zour",
   "section": "7.12",
   "region": "중동",
   "country": "쿠웨이트",
   "zone": "걸프만",
   "facility": "Al-Zour",
   "operator": "",
   "capacity": 615000,
   "unit": "b/d",
   "capacity_text": "615,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "한국·주요 수출 허브 비교표의 Al-Zour 행(615천 b/d)과 같은 시설·같은 자료다.",
   "lat": 28.7,
   "lon": 48.4,
   "same_facility_as": [
    "hub-al-zour"
   ]
  },
  {
   "id": "kw-mina-abdullah",
   "section": "7.12",
   "region": "중동",
   "country": "쿠웨이트",
   "zone": "걸프만",
   "facility": "Mina Abdullah",
   "operator": "",
   "capacity": 490000,
   "unit": "b/d",
   "capacity_text": "490,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "",
   "lat": 29.0,
   "lon": 48.2,
   "same_facility_as": []
  },
  {
   "id": "kw-mina-al-ahmadi",
   "section": "7.12",
   "region": "중동",
   "country": "쿠웨이트",
   "zone": "걸프만",
   "facility": "Mina Al-Ahmadi",
   "operator": "",
   "capacity": 346000,
   "unit": "b/d",
   "capacity_text": "346,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "",
   "lat": 29.1,
   "lon": 48.2,
   "same_facility_as": []
  },
  {
   "id": "ae-ruwais",
   "section": "7.12",
   "region": "중동",
   "country": "UAE",
   "zone": "걸프만",
   "facility": "Ruwais",
   "operator": "",
   "capacity": 817000,
   "unit": "b/d",
   "capacity_text": "817,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "한국·주요 수출 허브 비교표의 Ruwais 행(817천 b/d)과 같은 시설·같은 자료다. 주요 정유시설 표의 루와이스 값은 운영사의 가동일 기준 능력이라 이 행과 기준이 다르다.",
   "lat": 24.1,
   "lon": 52.7,
   "same_facility_as": [
    "hub-ruwais"
   ]
  },
  {
   "id": "ae-jebel-ali-enoc",
   "section": "7.12",
   "region": "중동",
   "country": "UAE",
   "zone": "걸프만",
   "facility": "Jebel Ali",
   "operator": "ENOC",
   "capacity": 210000,
   "unit": "b/d",
   "capacity_text": "210,000 b/d",
   "basis": "OPEC·2024년·콘덴세이트 가공 범위 유의",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "",
   "lat": 25.0,
   "lon": 55.1,
   "same_facility_as": []
  },
  {
   "id": "ir-abadan",
   "section": "7.12",
   "region": "중동",
   "country": "이란",
   "zone": "서남부",
   "facility": "Abadan",
   "operator": "",
   "capacity": 374000,
   "unit": "b/d",
   "capacity_text": "374,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "",
   "lat": 30.3,
   "lon": 48.3,
   "same_facility_as": []
  },
  {
   "id": "ir-isfahan",
   "section": "7.12",
   "region": "중동",
   "country": "이란",
   "zone": "내륙",
   "facility": "Isfahan",
   "operator": "",
   "capacity": 375000,
   "unit": "b/d",
   "capacity_text": "375,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "",
   "lat": 32.7,
   "lon": 51.7,
   "same_facility_as": []
  },
  {
   "id": "ir-bandar-abbas-nioc",
   "section": "7.12",
   "region": "중동",
   "country": "이란",
   "zone": "호르무즈 인접",
   "facility": "Bandar Abbas",
   "operator": "NIOC 표기",
   "capacity": 344000,
   "unit": "b/d",
   "capacity_text": "344,000 b/d",
   "basis": "OPEC·2024년·같은 도시의 다른 설비 제외",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "OPEC 표의 NIOC 표기 설비다. 같은 도시의 다른 설비는 넣지 않았다.",
   "lat": 27.2,
   "lon": 56.3,
   "same_facility_as": []
  },
  {
   "id": "iq-baiji",
   "section": "7.12",
   "region": "중동",
   "country": "이라크",
   "zone": "내륙",
   "facility": "Baiji",
   "operator": "",
   "capacity": 290000,
   "unit": "b/d",
   "capacity_text": "290,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "",
   "lat": 34.9,
   "lon": 43.5,
   "same_facility_as": []
  },
  {
   "id": "iq-basrah",
   "section": "7.12",
   "region": "중동",
   "country": "이라크",
   "zone": "남부",
   "facility": "Basrah",
   "operator": "",
   "capacity": 210000,
   "unit": "b/d",
   "capacity_text": "210,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "",
   "lat": 30.5,
   "lon": 47.8,
   "same_facility_as": []
  },
  {
   "id": "iq-karbala",
   "section": "7.12",
   "region": "중동",
   "country": "이라크",
   "zone": "내륙",
   "facility": "Karbala",
   "operator": "",
   "capacity": 140000,
   "unit": "b/d",
   "capacity_text": "140,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "",
   "lat": 32.6,
   "lon": 44.0,
   "same_facility_as": []
  },
  {
   "id": "om-duqm",
   "section": "7.12",
   "region": "중동",
   "country": "오만",
   "zone": "아라비아해",
   "facility": "Duqm",
   "operator": "",
   "capacity": 230000,
   "unit": "b/d",
   "capacity_text": "230,000 b/d",
   "basis": "OQ·2024년 8월 공개",
   "basis_date": "2024-08",
   "source": "OQ",
   "source_ids": [
    "oq-2024-08"
   ],
   "note": "",
   "lat": 19.7,
   "lon": 57.7,
   "same_facility_as": []
  },
  {
   "id": "om-suhar-sohar",
   "section": "7.12",
   "region": "중동",
   "country": "오만",
   "zone": "오만만",
   "facility": "Suhar / Sohar",
   "operator": "",
   "capacity": 198000,
   "unit": "b/d",
   "capacity_text": "198,000 b/d",
   "basis": "OQ·2024년 8월 공개",
   "basis_date": "2024-08",
   "source": "OQ",
   "source_ids": [
    "oq-2024-08"
   ],
   "note": "",
   "lat": 24.5,
   "lon": 56.6,
   "same_facility_as": []
  },
  {
   "id": "bh-sitra-bapco",
   "section": "7.12",
   "region": "중동",
   "country": "바레인",
   "zone": "걸프만",
   "facility": "Sitra / Bapco",
   "operator": "",
   "capacity": 380000,
   "unit": "b/d",
   "capacity_text": "380,000 b/d·BMP 설계",
   "basis": "Bapco 공식 FAQ·현재 가동량 아님",
   "basis_date": "",
   "source": "Bapco 공식 FAQ",
   "source_ids": [
    "bapco-bmp"
   ],
   "note": "BMP 설계능력이다. 현재 가동량과 다르다.",
   "lat": 26.2,
   "lon": 50.6,
   "same_facility_as": []
  },
  {
   "id": "ng-dangote-lekki",
   "section": "7.12",
   "region": "아프리카",
   "country": "나이지리아",
   "zone": "대서양",
   "facility": "Dangote / Lekki",
   "operator": "",
   "capacity": 650000,
   "unit": "b/d",
   "capacity_text": "650,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "한국·주요 수출 허브 비교표의 Dangote/Lekki 행(650천 b/d)과 같은 시설·같은 자료다.",
   "lat": 6.4,
   "lon": 4.0,
   "same_facility_as": [
    "hub-dangote-lekki"
   ]
  },
  {
   "id": "dz-skikda-crude",
   "section": "7.12",
   "region": "아프리카",
   "country": "알제리",
   "zone": "지중해",
   "facility": "Skikda·원유",
   "operator": "",
   "capacity": 355000,
   "unit": "b/d",
   "capacity_text": "355,000 b/d",
   "basis": "OPEC·2024년·콘덴세이트 설비 별도",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "원유 설비 수치다. 콘덴세이트 설비는 이 값에 들어 있지 않고 별도다.",
   "lat": 36.9,
   "lon": 6.9,
   "same_facility_as": []
  },
  {
   "id": "dz-arzew",
   "section": "7.12",
   "region": "아프리카",
   "country": "알제리",
   "zone": "지중해",
   "facility": "Arzew",
   "operator": "",
   "capacity": 87000,
   "unit": "b/d",
   "capacity_text": "87,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "",
   "lat": 35.9,
   "lon": -0.3,
   "same_facility_as": []
  },
  {
   "id": "dz-algiers",
   "section": "7.12",
   "region": "아프리카",
   "country": "알제리",
   "zone": "지중해",
   "facility": "Algiers",
   "operator": "",
   "capacity": 78000,
   "unit": "b/d",
   "capacity_text": "78,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "",
   "lat": 36.7,
   "lon": 3.1,
   "same_facility_as": []
  },
  {
   "id": "ly-ras-lanuf",
   "section": "7.12",
   "region": "아프리카",
   "country": "리비아",
   "zone": "지중해",
   "facility": "Ras Lanuf",
   "operator": "",
   "capacity": 220000,
   "unit": "b/d",
   "capacity_text": "220,000 b/d",
   "basis": "OPEC·2024년",
   "basis_date": "2024",
   "source": "OPEC ASB 2025",
   "source_ids": [
    "opec-asb-2025"
   ],
   "note": "",
   "lat": 30.5,
   "lon": 18.6,
   "same_facility_as": []
  },
  {
   "id": "in-digboi-ioc",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Assam",
   "facility": "Digboi",
   "operator": "IOC",
   "capacity": 0.65,
   "unit": "Mt/년",
   "capacity_text": "0.650 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 27.4,
   "lon": 95.6,
   "same_facility_as": []
  },
  {
   "id": "in-guwahati-ioc",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Assam",
   "facility": "Guwahati",
   "operator": "IOC",
   "capacity": 1.2,
   "unit": "Mt/년",
   "capacity_text": "1.200 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 26.2,
   "lon": 91.8,
   "same_facility_as": []
  },
  {
   "id": "in-koyali-ioc",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Gujarat",
   "facility": "Koyali",
   "operator": "IOC",
   "capacity": 13.7,
   "unit": "Mt/년",
   "capacity_text": "13.700 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 22.4,
   "lon": 73.1,
   "same_facility_as": []
  },
  {
   "id": "in-barauni-ioc",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Bihar",
   "facility": "Barauni",
   "operator": "IOC",
   "capacity": 6.0,
   "unit": "Mt/년",
   "capacity_text": "6.000 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 25.4,
   "lon": 86.1,
   "same_facility_as": []
  },
  {
   "id": "in-haldia-ioc",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "West Bengal",
   "facility": "Haldia",
   "operator": "IOC",
   "capacity": 8.0,
   "unit": "Mt/년",
   "capacity_text": "8.000 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 22.0,
   "lon": 88.1,
   "same_facility_as": []
  },
  {
   "id": "in-mathura-ioc",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Uttar Pradesh",
   "facility": "Mathura",
   "operator": "IOC",
   "capacity": 8.0,
   "unit": "Mt/년",
   "capacity_text": "8.000 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 27.4,
   "lon": 77.7,
   "same_facility_as": []
  },
  {
   "id": "in-panipat-ioc",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Haryana",
   "facility": "Panipat",
   "operator": "IOC",
   "capacity": 15.0,
   "unit": "Mt/년",
   "capacity_text": "15.000 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 29.5,
   "lon": 76.9,
   "same_facility_as": []
  },
  {
   "id": "in-bongaigaon-ioc",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Assam",
   "facility": "Bongaigaon",
   "operator": "IOC",
   "capacity": 2.7,
   "unit": "Mt/년",
   "capacity_text": "2.700 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 26.5,
   "lon": 90.5,
   "same_facility_as": []
  },
  {
   "id": "in-paradip-ioc",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Odisha·동해안",
   "facility": "Paradip",
   "operator": "IOC",
   "capacity": 15.0,
   "unit": "Mt/년",
   "capacity_text": "15.000 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 20.3,
   "lon": 86.6,
   "same_facility_as": []
  },
  {
   "id": "in-mumbai-hpcl",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Maharashtra·서해안",
   "facility": "Mumbai",
   "operator": "HPCL",
   "capacity": 9.5,
   "unit": "Mt/년",
   "capacity_text": "9.500 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 19.0,
   "lon": 72.9,
   "same_facility_as": []
  },
  {
   "id": "in-vizag-hpcl",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Andhra Pradesh·동해안",
   "facility": "Vizag",
   "operator": "HPCL",
   "capacity": 15.0,
   "unit": "Mt/년",
   "capacity_text": "15.000 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 17.7,
   "lon": 83.2,
   "same_facility_as": []
  },
  {
   "id": "in-mumbai-bpcl",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Maharashtra·서해안",
   "facility": "Mumbai",
   "operator": "BPCL",
   "capacity": 12.0,
   "unit": "Mt/년",
   "capacity_text": "12.000 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 19.0,
   "lon": 72.9,
   "same_facility_as": []
  },
  {
   "id": "in-kochi-bpcl",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Kerala·서해안",
   "facility": "Kochi",
   "operator": "BPCL",
   "capacity": 15.5,
   "unit": "Mt/년",
   "capacity_text": "15.500 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 10.0,
   "lon": 76.4,
   "same_facility_as": []
  },
  {
   "id": "in-bina-bpcl",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Madhya Pradesh·내륙",
   "facility": "Bina",
   "operator": "BPCL",
   "capacity": 7.8,
   "unit": "Mt/년",
   "capacity_text": "7.800 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 24.2,
   "lon": 78.2,
   "same_facility_as": []
  },
  {
   "id": "in-manali-cpcl",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Chennai·동해안",
   "facility": "Manali",
   "operator": "CPCL",
   "capacity": 10.5,
   "unit": "Mt/년",
   "capacity_text": "10.500 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 13.2,
   "lon": 80.3,
   "same_facility_as": []
  },
  {
   "id": "in-cauvery-basin-cpcl",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Chennai·증설 항목",
   "facility": "Cauvery Basin",
   "operator": "CPCL",
   "capacity": 0,
   "unit": "Mt/년",
   "capacity_text": "0 Mt/년·목록상 증설 중",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "목록상 증설 중인 항목이다. 능력은 0으로 실려 있다.",
   "lat": 10.8,
   "lon": 79.8,
   "same_facility_as": []
  },
  {
   "id": "in-numaligarh-nrl",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Assam",
   "facility": "Numaligarh",
   "operator": "NRL",
   "capacity": 3.0,
   "unit": "Mt/년",
   "capacity_text": "3.000 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 26.6,
   "lon": 93.8,
   "same_facility_as": []
  },
  {
   "id": "in-tatipaka-ongc",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Andhra Pradesh",
   "facility": "Tatipaka",
   "operator": "ONGC",
   "capacity": 0.066,
   "unit": "Mt/년",
   "capacity_text": "0.066 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 16.5,
   "lon": 81.9,
   "same_facility_as": []
  },
  {
   "id": "in-mangalore-mrpl",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Karnataka·서해안",
   "facility": "Mangalore",
   "operator": "MRPL",
   "capacity": 15.0,
   "unit": "Mt/년",
   "capacity_text": "15.000 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 13.0,
   "lon": 74.8,
   "same_facility_as": []
  },
  {
   "id": "in-ggsr-bathinda-hmel",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Punjab·내륙",
   "facility": "GGSR / Bathinda",
   "operator": "HMEL",
   "capacity": 11.3,
   "unit": "Mt/년",
   "capacity_text": "11.300 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 30.2,
   "lon": 74.9,
   "same_facility_as": []
  },
  {
   "id": "in-pachpadra-hrrl",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Rajasthan·내륙",
   "facility": "Pachpadra",
   "operator": "HRRL",
   "capacity": 9.0,
   "unit": "Mt/년",
   "capacity_text": "9.000 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 25.9,
   "lon": 72.3,
   "same_facility_as": []
  },
  {
   "id": "in-jamnagar-ril",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Gujarat·서해안",
   "facility": "Jamnagar",
   "operator": "RIL",
   "capacity": 33.0,
   "unit": "Mt/년",
   "capacity_text": "33.000 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "Jamnagar SEZ·RPL 행(35.200 Mt/년)과 같은 복합단지다. 한국·주요 수출 허브 비교표의 Jamnagar 행(1,400천 b/d)이 단지 값이며 이 행과 단위가 다르다.",
   "lat": 22.4,
   "lon": 69.9,
   "same_facility_as": [
    "hub-jamnagar-reliance",
    "in-jamnagar-sez-rpl"
   ]
  },
  {
   "id": "in-jamnagar-sez-rpl",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Gujarat·서해안",
   "facility": "Jamnagar SEZ",
   "operator": "RPL",
   "capacity": 35.2,
   "unit": "Mt/년",
   "capacity_text": "35.200 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "Jamnagar·RIL 행(33.000 Mt/년)과 같은 복합단지다. 한국·주요 수출 허브 비교표의 Jamnagar 행(1,400천 b/d)이 단지 값이며 이 행과 단위가 다르다.",
   "lat": 22.4,
   "lon": 69.9,
   "same_facility_as": [
    "hub-jamnagar-reliance",
    "in-jamnagar-ril"
   ]
  },
  {
   "id": "in-vadinar-nayara",
   "section": "7.13",
   "region": "인도",
   "country": "인도",
   "zone": "Gujarat·서해안",
   "facility": "Vadinar",
   "operator": "Nayara",
   "capacity": 20.0,
   "unit": "Mt/년",
   "capacity_text": "20.000 Mt/년",
   "basis": "PPAC Installed Refinery Capacity·2026년 4월 1일",
   "basis_date": "2026-04-01",
   "source": "PPAC",
   "source_ids": [
    "ppac-2026-04"
   ],
   "note": "",
   "lat": 22.4,
   "lon": 69.7,
   "same_facility_as": []
  },
  {
   "id": "jp-hokkaido-idemitsu",
   "section": "7.14",
   "region": "일본",
   "country": "일본",
   "zone": "홋카이도",
   "facility": "Hokkaido",
   "operator": "Idemitsu",
   "capacity": 140000,
   "unit": "b/d",
   "capacity_text": "140,000 b/d",
   "basis": "PAJ·2026년 4월",
   "basis_date": "2026-04",
   "source": "PAJ",
   "source_ids": [
    "paj-2026-04"
   ],
   "note": "",
   "lat": 42.6,
   "lon": 141.7,
   "same_facility_as": []
  },
  {
   "id": "jp-sendai-eneos",
   "section": "7.14",
   "region": "일본",
   "country": "일본",
   "zone": "도호쿠",
   "facility": "Sendai",
   "operator": "ENEOS",
   "capacity": 145000,
   "unit": "b/d",
   "capacity_text": "145,000 b/d",
   "basis": "PAJ·2026년 4월",
   "basis_date": "2026-04",
   "source": "PAJ",
   "source_ids": [
    "paj-2026-04"
   ],
   "note": "",
   "lat": 38.3,
   "lon": 141.0,
   "same_facility_as": []
  },
  {
   "id": "jp-kashima-kashima-oil",
   "section": "7.14",
   "region": "일본",
   "country": "일본",
   "zone": "간토",
   "facility": "Kashima",
   "operator": "Kashima Oil",
   "capacity": 210100,
   "unit": "b/d",
   "capacity_text": "210,100 b/d",
   "basis": "PAJ·2026년 4월·콘덴세이트 스플리터 포함",
   "basis_date": "2026-04",
   "source": "PAJ",
   "source_ids": [
    "paj-2026-04"
   ],
   "note": "콘덴세이트 스플리터를 포함한 수치다.",
   "lat": 35.9,
   "lon": 140.7,
   "same_facility_as": []
  },
  {
   "id": "jp-chiba-cosmo",
   "section": "7.14",
   "region": "일본",
   "country": "일본",
   "zone": "도쿄만",
   "facility": "Chiba",
   "operator": "Cosmo",
   "capacity": null,
   "unit": "",
   "capacity_text": "수치 보류",
   "basis": "PAJ·2026년 4월·PDF 텍스트에 177,000 / 214,000 중복 추출",
   "basis_date": "2026-04",
   "source": "PAJ",
   "source_ids": [
    "paj-2026-04"
   ],
   "note": "PAJ 명부 PDF에서 177,000과 214,000 두 값이 함께 추출돼 수치를 보류했다.",
   "lat": 35.5,
   "lon": 140.1,
   "same_facility_as": []
  },
  {
   "id": "jp-chiba-osaka-international-refining",
   "section": "7.14",
   "region": "일본",
   "country": "일본",
   "zone": "도쿄만",
   "facility": "Chiba",
   "operator": "Osaka International Refining",
   "capacity": 129000,
   "unit": "b/d",
   "capacity_text": "129,000 b/d",
   "basis": "PAJ·2026년 4월",
   "basis_date": "2026-04",
   "source": "PAJ",
   "source_ids": [
    "paj-2026-04"
   ],
   "note": "",
   "lat": 35.5,
   "lon": 140.1,
   "same_facility_as": []
  },
  {
   "id": "jp-chiba-complex-idemitsu",
   "section": "7.14",
   "region": "일본",
   "country": "일본",
   "zone": "도쿄만",
   "facility": "Chiba Complex",
   "operator": "Idemitsu",
   "capacity": 200000,
   "unit": "b/d",
   "capacity_text": "200,000 b/d",
   "basis": "운영사·2026년 4월 1일 장치표 대조",
   "basis_date": "2026-04-01",
   "source": "PAJ·Idemitsu 장치표",
   "source_ids": [
    "paj-2026-04",
    "idemitsu-chiba"
   ],
   "note": "운영사의 2026년 4월 1일 장치표와 대조한 수치다.",
   "lat": 35.5,
   "lon": 140.0,
   "same_facility_as": []
  },
  {
   "id": "jp-sodegaura-fuji-oil",
   "section": "7.14",
   "region": "일본",
   "country": "일본",
   "zone": "도쿄만",
   "facility": "Sodegaura",
   "operator": "Fuji Oil",
   "capacity": 143000,
   "unit": "b/d",
   "capacity_text": "143,000 b/d",
   "basis": "PAJ·2026년 4월",
   "basis_date": "2026-04",
   "source": "PAJ",
   "source_ids": [
    "paj-2026-04"
   ],
   "note": "",
   "lat": 35.4,
   "lon": 140.0,
   "same_facility_as": []
  },
  {
   "id": "jp-kawasaki-eneos",
   "section": "7.14",
   "region": "일본",
   "country": "일본",
   "zone": "도쿄만",
   "facility": "Kawasaki",
   "operator": "ENEOS",
   "capacity": 249100,
   "unit": "b/d",
   "capacity_text": "249,100 b/d",
   "basis": "PAJ·2026년 4월",
   "basis_date": "2026-04",
   "source": "PAJ",
   "source_ids": [
    "paj-2026-04"
   ],
   "note": "",
   "lat": 35.5,
   "lon": 139.8,
   "same_facility_as": []
  },
  {
   "id": "jp-keihin-toa-oil",
   "section": "7.14",
   "region": "일본",
   "country": "일본",
   "zone": "도쿄만",
   "facility": "Keihin",
   "operator": "TOA Oil",
   "capacity": null,
   "unit": "",
   "capacity_text": "수치 보류",
   "basis": "PAJ·2026년 4월·PDF 텍스트에 70,000 / 60,000 중복 추출",
   "basis_date": "2026-04",
   "source": "PAJ",
   "source_ids": [
    "paj-2026-04"
   ],
   "note": "PAJ 명부 PDF에서 70,000과 60,000 두 값이 함께 추출돼 수치를 보류했다.",
   "lat": 35.5,
   "lon": 139.7,
   "same_facility_as": []
  },
  {
   "id": "jp-negishi-eneos",
   "section": "7.14",
   "region": "일본",
   "country": "일본",
   "zone": "도쿄만",
   "facility": "Negishi",
   "operator": "ENEOS",
   "capacity": 153000,
   "unit": "b/d",
   "capacity_text": "153,000 b/d",
   "basis": "PAJ·2026년 4월",
   "basis_date": "2026-04",
   "source": "PAJ",
   "source_ids": [
    "paj-2026-04"
   ],
   "note": "",
   "lat": 35.4,
   "lon": 139.6,
   "same_facility_as": []
  },
  {
   "id": "jp-aichi-idemitsu",
   "section": "7.14",
   "region": "일본",
   "country": "일본",
   "zone": "이세만",
   "facility": "Aichi",
   "operator": "Idemitsu",
   "capacity": null,
   "unit": "",
   "capacity_text": "수치 보류",
   "basis": "PAJ·2026년 4월·PDF 텍스트에 165,000 / 163,000 중복 추출",
   "basis_date": "2026-04",
   "source": "PAJ",
   "source_ids": [
    "paj-2026-04"
   ],
   "note": "PAJ 명부 PDF에서 165,000과 163,000 두 값이 함께 추출돼 수치를 보류했다.",
   "lat": 35.0,
   "lon": 136.8,
   "same_facility_as": []
  },
  {
   "id": "jp-yokkaichi-cosmo",
   "section": "7.14",
   "region": "일본",
   "country": "일본",
   "zone": "이세만",
   "facility": "Yokkaichi",
   "operator": "Cosmo",
   "capacity": 86000,
   "unit": "b/d",
   "capacity_text": "86,000 b/d",
   "basis": "PAJ·2026년 4월",
   "basis_date": "2026-04",
   "source": "PAJ",
   "source_ids": [
    "paj-2026-04"
   ],
   "note": "",
   "lat": 35.0,
   "lon": 136.6,
   "same_facility_as": []
  },
  {
   "id": "jp-yokkaichi-showa-yokkaichi-sekiyu",
   "section": "7.14",
   "region": "일본",
   "country": "일본",
   "zone": "이세만",
   "facility": "Yokkaichi",
   "operator": "Showa Yokkaichi Sekiyu",
   "capacity": 225000,
   "unit": "b/d",
   "capacity_text": "225,000 b/d",
   "basis": "PAJ·2026년 4월",
   "basis_date": "2026-04",
   "source": "PAJ",
   "source_ids": [
    "paj-2026-04"
   ],
   "note": "",
   "lat": 35.0,
   "lon": 136.6,
   "same_facility_as": []
  },
  {
   "id": "jp-sakai-cosmo",
   "section": "7.14",
   "region": "일본",
   "country": "일본",
   "zone": "오사카만",
   "facility": "Sakai",
   "operator": "Cosmo",
   "capacity": 100000,
   "unit": "b/d",
   "capacity_text": "100,000 b/d",
   "basis": "PAJ·2026년 4월",
   "basis_date": "2026-04",
   "source": "PAJ",
   "source_ids": [
    "paj-2026-04"
   ],
   "note": "",
   "lat": 34.6,
   "lon": 135.4,
   "same_facility_as": []
  },
  {
   "id": "jp-sakai-eneos",
   "section": "7.14",
   "region": "일본",
   "country": "일본",
   "zone": "오사카만",
   "facility": "Sakai",
   "operator": "ENEOS",
   "capacity": 141000,
   "unit": "b/d",
   "capacity_text": "141,000 b/d",
   "basis": "PAJ·2026년 4월",
   "basis_date": "2026-04",
   "source": "PAJ",
   "source_ids": [
    "paj-2026-04"
   ],
   "note": "",
   "lat": 34.6,
   "lon": 135.4,
   "same_facility_as": []
  },
  {
   "id": "jp-mizushima-eneos",
   "section": "7.14",
   "region": "일본",
   "country": "일본",
   "zone": "세토내해",
   "facility": "Mizushima",
   "operator": "ENEOS",
   "capacity": 350200,
   "unit": "b/d",
   "capacity_text": "350,200 b/d",
   "basis": "PAJ·2026년 4월",
   "basis_date": "2026-04",
   "source": "PAJ",
   "source_ids": [
    "paj-2026-04"
   ],
   "note": "",
   "lat": 34.5,
   "lon": 133.7,
   "same_facility_as": []
  },
  {
   "id": "jp-marifu-eneos",
   "section": "7.14",
   "region": "일본",
   "country": "일본",
   "zone": "세토내해",
   "facility": "Marifu",
   "operator": "ENEOS",
   "capacity": 128000,
   "unit": "b/d",
   "capacity_text": "128,000 b/d",
   "basis": "PAJ·2026년 4월",
   "basis_date": "2026-04",
   "source": "PAJ",
   "source_ids": [
    "paj-2026-04"
   ],
   "note": "",
   "lat": 34.2,
   "lon": 132.2,
   "same_facility_as": []
  },
  {
   "id": "jp-oita-eneos",
   "section": "7.14",
   "region": "일본",
   "country": "일본",
   "zone": "규슈",
   "facility": "Oita",
   "operator": "ENEOS",
   "capacity": 136000,
   "unit": "b/d",
   "capacity_text": "136,000 b/d",
   "basis": "PAJ·2026년 4월",
   "basis_date": "2026-04",
   "source": "PAJ",
   "source_ids": [
    "paj-2026-04"
   ],
   "note": "",
   "lat": 33.3,
   "lon": 131.7,
   "same_facility_as": []
  },
  {
   "id": "jp-shikoku-taiyo-oil",
   "section": "7.14",
   "region": "일본",
   "country": "일본",
   "zone": "시코쿠",
   "facility": "Shikoku",
   "operator": "Taiyo Oil",
   "capacity": 138000,
   "unit": "b/d",
   "capacity_text": "138,000 b/d",
   "basis": "PAJ·2026년 4월",
   "basis_date": "2026-04",
   "source": "PAJ",
   "source_ids": [
    "paj-2026-04"
   ],
   "note": "",
   "lat": 34.0,
   "lon": 132.8,
   "same_facility_as": []
  },
  {
   "id": "kr-ulsan-sk-energy",
   "section": "7.15",
   "region": "한국·중국·동남아·호주",
   "country": "한국",
   "zone": "동해안",
   "facility": "울산",
   "operator": "SK에너지",
   "capacity": 840000,
   "unit": "b/d",
   "capacity_text": "840,000 b/d·CDU",
   "basis": "2025년 공시·국내 사업보고서 사례와 대조",
   "basis_date": "2025",
   "source": "2025년 9월 4일 투자설명서(국내 정유시설 비교 공시)",
   "source_ids": [
    "kind-2025-09-04"
   ],
   "note": "CDU 기준이다. 한국·주요 수출 허브 비교표의 울산·SK에너지 행(840천 b/d)과 같은 시설·같은 값이다.",
   "lat": 35.5,
   "lon": 129.4,
   "same_facility_as": [
    "hub-ulsan-sk-energy"
   ]
  },
  {
   "id": "kr-incheon-sk-incheon-petrochem",
   "section": "7.15",
   "region": "한국·중국·동남아·호주",
   "country": "한국",
   "zone": "서해안",
   "facility": "인천",
   "operator": "SK인천석유화학",
   "capacity": 275000,
   "unit": "b/d",
   "capacity_text": "275,000 b/d·CDU",
   "basis": "CFU 포함 표기는 375,000 b/d·2025년 공시",
   "basis_date": "2025",
   "source": "2025년 9월 4일 투자설명서(국내 정유시설 비교 공시)",
   "source_ids": [
    "kind-2025-09-04"
   ],
   "note": "CDU 기준이다. CFU 포함 표기는 375,000 b/d이며, 포함 표기에 CDU가 들어 있다. 한국·주요 수출 허브 비교표의 인천·SK인천석유화학 행(275천 b/d)과 같은 시설·같은 값이다.",
   "lat": 37.5,
   "lon": 126.6,
   "same_facility_as": [
    "hub-incheon-sk-incheon-petrochem"
   ]
  },
  {
   "id": "kr-yeosu-gs-caltex",
   "section": "7.15",
   "region": "한국·중국·동남아·호주",
   "country": "한국",
   "zone": "남해안",
   "facility": "여수",
   "operator": "GS칼텍스",
   "capacity": 800000,
   "unit": "b/d",
   "capacity_text": "800,000 b/d",
   "basis": "공식 소개·한국·주요 수출 허브 비교표 참조",
   "basis_date": "",
   "source": "GS칼텍스 공식 소개",
   "source_ids": [],
   "note": "한국·주요 수출 허브 비교표의 여수·GS칼텍스 행(800천 b/d·원유 정제능력)과 같은 시설·같은 값이다.",
   "lat": 34.7,
   "lon": 127.8,
   "same_facility_as": [
    "hub-yeosu-gs-caltex"
   ]
  },
  {
   "id": "kr-onsan-s-oil",
   "section": "7.15",
   "region": "한국·중국·동남아·호주",
   "country": "한국",
   "zone": "동해안",
   "facility": "온산",
   "operator": "S-OIL",
   "capacity": 580000,
   "unit": "b/d",
   "capacity_text": "580,000 b/d·CDU",
   "basis": "CFU 포함 669,000 b/d·2025년 공시",
   "basis_date": "2025",
   "source": "2025년 9월 4일 투자설명서(국내 정유시설 비교 공시)",
   "source_ids": [
    "kind-2025-09-04"
   ],
   "note": "CDU 기준이다. CFU 포함은 669,000 b/d이며, 포함 값에 CDU가 들어 있다. 한국·주요 수출 허브 비교표의 온산·S-OIL 행(580천 b/d)과 같은 시설·같은 값이다.",
   "lat": 35.4,
   "lon": 129.3,
   "same_facility_as": [
    "hub-onsan-s-oil"
   ]
  },
  {
   "id": "kr-daesan-hd-hyundai-oilbank",
   "section": "7.15",
   "region": "한국·중국·동남아·호주",
   "country": "한국",
   "zone": "서해안",
   "facility": "대산",
   "operator": "HD현대오일뱅크",
   "capacity": 520000,
   "unit": "b/d",
   "capacity_text": "520,000 b/d·CDU",
   "basis": "CFU 포함 표기는 690,000 b/d·2025년 공시",
   "basis_date": "2025",
   "source": "2025년 9월 4일 투자설명서(국내 정유시설 비교 공시)",
   "source_ids": [
    "kind-2025-09-04"
   ],
   "note": "CDU 기준이다. CFU 포함 표기는 690,000 b/d이며, 포함 표기에 CDU가 들어 있다. 한국·주요 수출 허브 비교표의 대산·HD현대오일뱅크 행(520천 b/d)과 같은 시설·같은 값이다.",
   "lat": 37.0,
   "lon": 126.4,
   "same_facility_as": [
    "hub-daesan-hd-hyundai-oilbank"
   ]
  },
  {
   "id": "cn-zhejiang-petrochemical-rongsheng",
   "section": "7.15",
   "region": "한국·중국·동남아·호주",
   "country": "중국",
   "zone": "저장·저우산",
   "facility": "Zhejiang Petrochemical",
   "operator": "Rongsheng 계열",
   "capacity": 40,
   "unit": "Mt/년",
   "capacity_text": "40 Mt/년",
   "basis": "2024 Annual Report Summary·정유·화학 통합",
   "basis_date": "2024",
   "source": "Rongsheng 2024 Annual Report Summary",
   "source_ids": [
    "rongsheng-2024"
   ],
   "note": "정유·화학 통합 단지의 능력이다. 원자료 표기는 Mt/년이다.",
   "lat": 30.3,
   "lon": 121.9,
   "same_facility_as": []
  },
  {
   "id": "sg-singapore-refinery-exxonmobil",
   "section": "7.15",
   "region": "한국·중국·동남아·호주",
   "country": "싱가포르",
   "zone": "Jurong",
   "facility": "Singapore Refinery",
   "operator": "ExxonMobil",
   "capacity": 592000,
   "unit": "b/d",
   "capacity_text": "592,000 b/d",
   "basis": "운영사 소개·두 운영 사이트가 하나의 정유시설로 연결",
   "basis_date": "",
   "source": "ExxonMobil 운영시설 소개",
   "source_ids": [
    "exxonmobil-singapore"
   ],
   "note": "두 운영 사이트가 하나의 정유시설로 연결돼 있고, 능력은 그 정유시설 전체 기준이다.",
   "lat": 1.3,
   "lon": 103.7,
   "same_facility_as": []
  },
  {
   "id": "my-pengerang-integrated-complex",
   "section": "7.15",
   "region": "한국·중국·동남아·호주",
   "country": "말레이시아",
   "zone": "조호르",
   "facility": "Pengerang Integrated Complex",
   "operator": "",
   "capacity": 300000,
   "unit": "b/d",
   "capacity_text": "300,000 b/d",
   "basis": "PETRONAS Activity Outlook 2025–2027·정유·화학 통합",
   "basis_date": "",
   "source": "PETRONAS Activity Outlook 2025–2027",
   "source_ids": [
    "petronas-outlook"
   ],
   "note": "정유·화학 통합 단지의 능력이다. 원유 CDU만의 값과 기준이 다르다.",
   "lat": 1.4,
   "lon": 104.2,
   "same_facility_as": []
  },
  {
   "id": "au-geelong-viva-energy",
   "section": "7.15",
   "region": "한국·중국·동남아·호주",
   "country": "호주",
   "zone": "빅토리아",
   "facility": "Geelong",
   "operator": "Viva Energy",
   "capacity": 120000,
   "unit": "b/d",
   "capacity_text": "최대 120,000 b/d",
   "basis": "운영사 소개·화재 후 실제 가동은 차질·복구 대장에서 별도 확인",
   "basis_date": "",
   "source": "Viva Energy 운영사 소개",
   "source_ids": [
    "viva-geelong"
   ],
   "note": "최대 능력이다. 화재 후 실제 가동은 차질·복구 대장의 해당 기록에 있다.",
   "lat": -38.1,
   "lon": 144.4,
   "same_facility_as": []
  },
  {
   "id": "au-lytton-ampol",
   "section": "7.15",
   "region": "한국·중국·동남아·호주",
   "country": "호주",
   "zone": "퀸즐랜드",
   "facility": "Lytton",
   "operator": "Ampol",
   "capacity": null,
   "unit": "",
   "capacity_text": "명목능력 미검증",
   "basis": "FCCU 정비·재가동 전망은 차질·복구 대장 참조",
   "basis_date": "",
   "source": "Ampol 운영시설 소개",
   "source_ids": [
    "ampol-lytton"
   ],
   "note": "명목능력을 검증하지 못했다. FCCU 정비·재가동 전망은 차질·복구 대장의 해당 기록에 있다.",
   "lat": -27.4,
   "lon": 153.2,
   "same_facility_as": []
  }
 ]
};
