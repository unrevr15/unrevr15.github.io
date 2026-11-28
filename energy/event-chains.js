'use strict';
// 사건 연결 (backlog 9). Reads eventChains (event-chains-data.js) and the
// records its links point at (records-data.js, refinery-roster-data.js,
// peer-quarters-data.js, value-chain-data.js, facts.js, research.js), and the
// live payload (energyLive of live.js, window.ENERGY_LIVE.supply). Builds
//   * one section per chain (chain-<id>) in the desk its chainFrames entry
//     names (지정학 when it has none): the event's ledger records, then the six
//     연결 단계 side by side (stacked on a narrow screen), each link with its
//     value, period, scope, status and attribution, what is missing and where
//     the value comes from;
//   * the market and industry summary (chain-summary) in the 물가전이 desk. Its
//     실적 연결 column counts the company_links of the cards a row's links
//     name, so a link counts on every row that names its card, whatever the
//     row's goods; value-chain.js draws each of them as a 연결 지표 line on its card.
// Runs before workspace.js, which puts the sections in the views listed in
// deskViews (war › russia: chain-*; war › iran, gas › supply, copper ›
// production, power › coal and food › processing name their chain; inflation ›
// overview: chain-summary). A chain
// whose desk the page lacks is left out, and the summary counts and links the
// chains that were placed. The sections join the desks only after all of them
// are built, so a failure leaves every desk as it was. A data constant that is
// null (the public copy) builds nothing.

// Rows of the summary table: the markets and industries of the chains, with
// the series of the live payload that stands for each one's price and consumer
// price (energy_live.SERIES keys; null where the page has none). Strict JSON:
// backend/tests/test_energy_chains.py parses it.
const chainSummaryRows = [
  {"kind": "market", "name": "중간유분", "price": "usgc_ulsd", "consumer": "retail_diesel"},
  {"kind": "market", "name": "휘발유", "price": "usgc_gasoline", "consumer": "retail_gasoline"},
  {"kind": "market", "name": "항공유", "price": "usgc_jet", "consumer": "cpi_airfare"},
  {"kind": "market", "name": "원유", "price": "brent", "consumer": null},
  {"kind": "market", "name": "LNG", "price": "asia_lng_imf", "consumer": null},
  {"kind": "market", "name": "구리", "price": "copper_fut", "consumer": null},
  {"kind": "industry", "name": "정유", "price": null, "consumer": null},
  {"kind": "industry", "name": "제품선", "price": null, "consumer": null},
  {"kind": "industry", "name": "항공", "price": "usgc_jet", "consumer": "cpi_airfare"},
  {"kind": "industry", "name": "육상 물류", "price": "retail_diesel", "consumer": null},
  {"kind": "industry", "name": "원유선", "price": "bwet", "consumer": null},
  {"kind": "industry", "name": "LNG선", "price": null, "consumer": null},
  {"kind": "industry", "name": "구리 광산", "price": "copper_fut", "consumer": null},
  {"kind": "industry", "name": "구리 제련", "price": null, "consumer": null},
  {"kind": "market", "name": "석탄", "price": "coal_au_imf", "consumer": null},
  {"kind": "industry", "name": "석탄 광업", "price": "coal_au_imf", "consumer": null},
  {"kind": "industry", "name": "발전", "price": "coal_au_imf", "consumer": null},
  {"kind": "market", "name": "인산 비료", "price": null, "consumer": null},
  {"kind": "market", "name": "곡물", "price": "wheat_imf", "consumer": "cpi_food_home"},
  {"kind": "industry", "name": "비료", "price": null, "consumer": null},
  {"kind": "industry", "name": "농업", "price": "wheat_imf", "consumer": "cpi_food_home"}
];

// Where each chain's section goes and how it reads, by chain id. `desk` is the
// id of the [data-desk] element the section joins; workspace.js then puts it in
// the view of that desk that lists it. The other keys are optional: `steps`
// words the six 연결 단계 for goods that are not oil products (eventChains.steps
// otherwise), `defined` names the company-defined metrics 읽는 법 calls 추정,
// `mixed` says what the chain's 혼합 집계 values mix in (the generic wording
// otherwise) and `start`, only for a chain whose event the ledger has no row of
// (its `records` are empty), names where the chain starts instead; the
// section's first sentence says so. A chain not listed is the pilot: the war
// desk's chain-* view, eventChains.steps and the pilot's metrics. Strict JSON:
// backend/tests/test_energy_chains.py parses it.
const chainFrames = {
  "gulf-hormuz-2026": {"desk": "war"},
  "qatar-lng-2026": {"desk": "gas"},
  "copper-concentrate-2026": {"desk": "copper", "start": "기업 카드와 출처"},
  "au-coal-ports-2026-q3": {
    "desk": "power",
    "steps": ["영향 시설", "생산·처리량", "출하", "재고·수입 보완", "노출 기업", "산업비용·소비자가격"],
    "defined": "조정 EBITDA",
    "mixed": "광산 운영, 아시아 수요, 인도네시아·중국 공급 제약 같은 다른 요인이 함께 든 값이거나, 피바디의 실적과 뉴캐슬 가격처럼 이 사건에만 해당하지 않는 값",
    "start": "화이트헤이븐 기업 카드"
  },
  "mosaic-phosphate-curtailment-2026-11": {
    "desk": "food",
    "steps": ["영향 시설", "생산·처리량", "출하", "재고·수입 보완", "노출 기업", "산업비용·소비자가격"],
    "defined": "조정 EBITDA",
    "mixed": "황·암모니아 원가, 브라질 고객 신용, 다른 회사의 결정 같은 다른 요인이 함께 든 값이거나, 세계은행 지표 가격처럼 이 사건에만 해당하지 않는 값"
  }
};

(() => {
  const inflation = document.getElementById('inflation');
  if (typeof eventChains === 'undefined' || !eventChains || !Array.isArray(eventChains.chains)) return;
  const frameOf = chain => chainFrames[chain.id] || null;
  const deskOf = chain => document.getElementById(frameOf(chain)?.desk || 'war');
  try {
    const D = eventChains;
    const STEPS = Array.isArray(D.steps) ? D.steps : [];
    const L = (typeof energyLive !== 'undefined' && energyLive) || null;
    const LIVE = window.ENERGY_LIVE || {};
    const SUP = LIVE.supply && LIVE.supply.ok ? LIVE.supply : null;
    const STATUS = {measured: '실측', estimated: '추정', derived: '계산', unknown: '미확인'};
    const SCOPE = {facility: '시설', country: '국가', region: '권역', market: '시장'};
    const ATTRIBUTION = {event: '사건 단독', mixed: '혼합 집계'};
    const RECORD_STATUS = {open: '진행 중', plan: '계획·전망', resolved: '해소', closed: '폐쇄', unknown: '상태 미상'};

    // ---- formatting -------------------------------------------------------
    const esc = value => String(value ?? '').replace(/[&<>"']/g, c =>
      ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const list = value => Array.isArray(value) ? value.filter(item => item !== null && item !== undefined) : [];
    const ok = v => v !== null && v !== undefined && Number.isFinite(Number(v));
    const fmt = (v, d = 0) => ok(v) ? Number(v).toLocaleString('en-US', {minimumFractionDigits: d, maximumFractionDigits: d}) : '—';
    const signed = v => ok(v) ? (v > 0 ? '+' : v < 0 ? '−' : '') + fmt(Math.abs(v), 1) + '%' : '—';
    const tone = v => !ok(v) || v === 0 ? '' : v > 0 ? 'live-up' : 'live-down';
    const dot = iso => String(iso || '').replace(/-/g, '.');
    // An observation date as live.js shortDate writes a monthly one: 2026-10-01 -> 2026.10 when freq is 'M'.
    const obsDate = (iso, freq) => dot(freq === 'M' ? String(iso || '').slice(0, 7) : iso);
    // 2026-11-03 -> 2026.11.03, 2026-10 -> 2026.10, 2026-Q3 -> 2026년 3분기, a/b -> a~b (b without its year when it is a's).
    const periodText = raw => {
      const one = p => /^\d{4}-Q[1-4]$/.test(p) ? p.slice(0, 4) + '년 ' + p.slice(6) + '분기' : dot(p);
      const [a, b] = String(raw || '').split('/');
      if (!b) return one(a);
      return one(a) + '~' + (b.slice(0, 4) === a.slice(0, 4) && !/Q/.test(b) ? dot(b.slice(5)) : one(b));
    };
    // The last day a period covers, for ordering: 2026-10 -> 2026-10-99, 2026-Q3 -> 2026-09-99.
    const periodEnd = raw => {
      const p = String(raw || '').split('/').pop();
      const q = /^(\d{4})-Q([1-4])$/.exec(p);
      if (q) return q[1] + '-' + String(Number(q[2]) * 3).padStart(2, '0') + '-99';
      return /^\d{4}$/.test(p) ? p + '-12-99' : /^\d{4}-\d{2}$/.test(p) ? p + '-99' : p;
    };
    const timeTag = iso => '<time datetime="' + esc(iso) + '">' + esc(dot(iso)) + '</time>';
    const slug = value => String(value).replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');

    // ---- what the links point at -------------------------------------------
    const records = typeof disruptionRecords !== 'undefined' && Array.isArray(disruptionRecords) ? disruptionRecords : [];
    const rosterRows = typeof refineryRoster !== 'undefined' && refineryRoster && Array.isArray(refineryRoster.rows) ? refineryRoster.rows : [];
    const peers = typeof peerQuarters !== 'undefined' && peerQuarters ? peerQuarters : {};
    const companies = typeof valueChain !== 'undefined' && valueChain && Array.isArray(valueChain.segments)
      ? valueChain.segments.flatMap(seg => list(seg.companies)) : [];
    const cardOf = company => slug(company.yahoo || company.ticker);
    const byCard = new Map(companies.map(company => [cardOf(company), company]));
    const byTicker = new Map(companies.map(company => [String(company.ticker), cardOf(company)]));
    const record = id => records.find(row => row.id === id) || null;
    const rosterRow = id => rosterRows.find(row => row.id === id) || null;
    const peerMetric = id => list(peers.metrics).find(row => row.id === id) || null;
    const peerNote = id => list(peers.notes).find(row => row.id === id) || null;
    const haveFact = (id, which) => typeof facts !== 'undefined' && facts[id] && facts[id].values[which];
    // A fact link prints the value of facts.js, not a number of its own.
    const isFact = link => link.ref?.kind === 'fact' && link.status !== 'derived' && haveFact(link.ref.id, link.ref.value);
    // The company cards a link names (vc-co-<card>).
    const cardsOf = link => {
      const r = link.ref || {};
      if (r.kind === 'card_metric' || r.kind === 'card_text') return [r.card];
      if (r.kind === 'peer_metric') return [byTicker.get(String(peerMetric(r.id)?.card))].filter(Boolean);
      if (r.kind === 'peer_note') return list(peerNote(r.id)?.cards).map(t => byTicker.get(String(t))).filter(Boolean);
      if (r.kind === 'record') return list(record(r.id)?.cards);
      return [];
    };
    const cardLink = card => byCard.has(card)
      ? '<a href="#vc-co-' + esc(card) + '">' + esc(byCard.get(card).name_kr) + ' 카드 ↗</a>' : '';
    const refHtml = link => {
      const r = link.ref;
      if (!r) return '';
      if (r.kind === 'record') {
        const row = record(r.id);
        return row ? '<a href="#records-disruptions">차질·복구 대장 · ' + esc(row.facility) + ' ↗</a>' : '';
      }
      if (r.kind === 'roster') {
        const row = rosterRow(r.id);
        return row ? '<a href="#refinery-roster">정유시설 명부 · ' + esc(row.facility) + ' ↗</a>' : '';
      }
      if (r.kind === 'fact') {
        if (!haveFact(r.id, r.value)) return '';
        const value = factValue(r.id, r.value);
        return factChip(value) + (value.home ? ' <a href="#' + esc(value.home) + '">페이지 위치 ↗</a>' : '');
      }
      if (r.kind === 'peer_metric' || r.kind === 'peer_note') {
        const row = r.kind === 'peer_metric' ? peerMetric(r.id) : peerNote(r.id);
        if (!row) return '';
        return '<a href="#peer-quarters">분기 비교 · ' + esc(row.company) + ' ' + esc(row.metric || row.topic) + ' ↗</a>' +
          cardsOf(link).map(card => ' ' + cardLink(card)).join('');
      }
      if (r.kind === 'card_metric' || r.kind === 'card_text') return cardLink(r.card);
      if (r.kind === 'source') return typeof sources !== 'undefined' && sources[r.id] ? ref(r.id) : '';
      return '';
    };

    // ---- the series that keep moving ---------------------------------------
    const liveEntry = key => L?.series?.[key] || null;
    // The newest value and its change: one month for daily and weekly series,
    // the month before for monthly ones.
    const liveChange = entry => {
      const basis = entry.freq === 'M' ? entry.prev : entry.m1;
      const change = basis?.value ? (entry.last.value / basis.value - 1) * 100 : null;
      return {span: entry.freq === 'M' ? '전월' : '1개월', change};
    };
    // The series' name, newest value, unit, date and change, or a note while the payload has none.
    const liveText = key => {
      const entry = liveEntry(key);
      if (!entry?.last) return '<span class="note">자동 갱신 대기</span>';
      const {span, change} = liveChange(entry);
      return esc(entry.label) + ' <b>' + fmt(entry.last.value, entry.digits) + '</b> <small>' + esc(entry.unit) + ' · ' + esc(obsDate(entry.last.date, entry.freq)) + '</small> ' +
        '<span class="ec-change">' + span + ' <em class="' + tone(change) + '">' + signed(change) + '</em></span>';
    };
    const indicatorHtml = ind => {
      if (!ind) return '';
      let body = '<span class="note">자동 갱신 대기</span>';
      if (ind.kind === 'live') {
        body = liveText(ind.key);
      } else if (ind.kind === 'supply') {
        const [section, key] = String(ind.key).split('.');
        const entry = SUP?.[section]?.[key];
        if (entry?.last) body = esc(entry.label) + ' <b>' + fmt(entry.last.value, entry.unit === '일' || entry.unit === '%' ? 1 : 0) + '</b> <small>' + esc(entry.unit) + ' · ' + esc(obsDate(entry.last.date, entry.freq)) + '</small>';
        else if (Array.isArray(entry?.points) && entry.points.length) {
          const [month, value] = entry.points[entry.points.length - 1];
          body = esc(entry.label) + ' <b>' + fmt(value, 1) + '</b> <small>' + esc(entry.unit) + ' · ' + esc(obsDate(month, 'M')) + '</small>';
        }
      } else if (ind.kind === 'jodi') {
        const [c, p, f] = String(ind.key).split('.');
        const J = SUP?.jodi;
        const entry = J?.data?.[c]?.[p]?.[f];
        if (entry?.last) body = esc([J.countries?.[c]?.name, J.products?.[p], J.flows?.[f]].filter(Boolean).join(' ')) + ' <b>' + fmt(entry.last[1], 0) + '</b> <small>' +
          esc(f === 'CLOSTLV' ? J.units?.CLOSTLV : J.units?.other) + ' · ' + esc(obsDate(entry.last[0], 'M')) + '</small>';
      } else if (ind.kind === 'fact') {
        body = typeof facts !== 'undefined' && facts[ind.key] ? factCited(ind.key) : body;
      }
      return '<p class="ec-ind"><span class="live-badge">자동 갱신</span> ' + body + '</p>';
    };

    // ---- one link ---------------------------------------------------------
    const valueHtml = link => isFact(link) ? esc(fact(link.ref.id, link.ref.value)) : esc(link.value_text);
    const linkPeriod = link => isFact(link) ? (factValue(link.ref.id, link.ref.value).period || facts[link.ref.id].period) : periodText(link.period);
    const badge = status => '<span class="ec-badge" data-status="' + esc(status) + '">' + esc(STATUS[status] || status) + '</span>';
    const linkCard = link => {
      const known = link.status !== 'unknown';
      return '<li class="ec-link" data-status="' + esc(link.status) + '">' +
        '<p class="ec-what"><b>' + esc(link.subject) + '</b> ' + esc(link.metric) + '</p>' +
        (known ? '<p class="ec-value">' + valueHtml(link) + '</p>' : '') +
        '<p class="ec-tags">' + badge(link.status) + '<span class="ec-chip">' + esc(SCOPE[link.scope] || link.scope) + '</span>' +
          '<span class="ec-chip' + (link.attribution === 'mixed' ? ' ec-mixed' : '') + '">' + esc(ATTRIBUTION[link.attribution] || link.attribution) + '</span>' +
          '<span class="ec-period">' + esc(linkPeriod(link)) + '</span></p>' +
        (link.basis ? '<p class="ec-basis">' + esc(link.basis) + '</p>' : '') +
        (link.missing ? '<p class="ec-missing"><b>' + (known ? '남은 값' : '빠진 값') + '</b> ' + esc(link.missing) + '</p>' : '') +
        indicatorHtml(link.indicator) +
        (refHtml(link) ? '<p class="ec-ref">' + refHtml(link) + '</p>' : '') +
        '</li>';
    };
    const counts = links => Object.keys(STATUS).map(status => [status, links.filter(link => link.status === status).length]).filter(([, n]) => n);

    // ---- a chain ----------------------------------------------------------
    const chainSection = chain => {
      // Its chainFrames entry words the steps and 읽는 법; the pilot, which has none, names its own metrics.
      const frame = frameOf(chain);
      const steps = Array.isArray(frame?.steps) && frame.steps.length === STEPS.length ? frame.steps : STEPS;
      const defined = frame ? frame.defined : '조정 연료단가, 연료비 회수율';
      const links = list(chain.links);
      const rows = list(chain.records).map(record).filter(Boolean);
      const section = document.createElement('section');
      section.className = 'section ec-section';
      section.id = 'chain-' + chain.id;
      const unknown = links.filter(link => link.status === 'unknown').length;
      // Mixed links are counted among those with a value, so the two counts do not overlap.
      const mixed = links.filter(link => link.status !== 'unknown' && link.attribution === 'mixed').length;
      section.innerHTML = '<div class="section-head"><h2>사건 연결: ' + esc(chain.title) + '</h2><span class="meta">확인 ' + timeTag(chain.checked) + '</span></div>' +
        '<p class="note">' + (rows.length ? '차질·복구 대장의 기록 ' + rows.length + '건에서 시작해 '
          : '차질·복구 대장에는 이 사건의 기록이 없어 ' + esc(frame?.start || '기업 카드와 출처') + '에서 시작해 ') +
        steps.map(esc).join(', ') + '까지 페이지에 있는 값을 이었다. ' +
        '연결 ' + links.length + '개 가운데 ' + unknown + '개는 값이 없는 칸이고, 값이 있는 ' + (links.length - unknown) + '개 가운데 ' + mixed +
        '개는 사건 밖의 원인이 함께 들었거나 이 사건에만 해당하지 않는 혼합 집계다. 혼합 집계 값을 이 사건의 몫으로 읽지 않는다.</p>' +
        (rows.length ? '<ul class="ec-records" aria-label="이 사건의 대장 기록">' + rows.map(row => {
          const day = /^\d{4}-\d{2}-\d{2}$/.test(row.event_date) ? '사건일 ' + dot(row.event_date) : '자료일 ' + dot(row.source_date);
          return '<li><a href="#records-disruptions">' + esc(row.facility) + '</a><span>' + esc([day, row.type, RECORD_STATUS[row.status] || row.status].filter(Boolean).join(' · ')) + '</span></li>';
        }).join('') + '</ul>' : '') +
        '<ol class="ec-steps">' + steps.map((name, i) => {
          const here = links.filter(link => link.step === i + 1);
          return '<li class="ec-step"><div class="ec-step-head"><span class="ec-num">' + (i + 1) + '</span><h3>연결 ' + (i + 1) + '단계 · ' + esc(name) + '</h3>' +
            '<p class="ec-counts">' + counts(here).map(([status, n]) => esc(STATUS[status]) + ' ' + n).join(' · ') + '</p></div>' +
            '<ul class="ec-links">' + here.map(linkCard).join('') + '</ul></li>';
        }).join('') + '</ol>' +
        '<details class="method"><summary>읽는 법</summary><ul>' +
        '<li>상태는 값이 나온 곳을 따른다. 실측은 정부 통계와 회사 공시·실적, 추정은 국제기구·통신·업계의 집계·평가와 회사의 전망, 계산은 페이지 값으로 한 산술, 미확인은 페이지에 값이 없는 칸이다. ' +
          '기업 카드 문장·분기 비교 설명·대장 기록에서 가져온 값과 회사가 정의한 지표' + (defined ? '(' + esc(defined) + ')' : '') + '는 추정으로 둔다.</li>' +
        '<li>범위: 값이 덮는 수준이다(시설, 국가, 권역, 시장). 귀속: 사건 단독은 이 사건만의 시설 값이고, 혼합 집계는 ' +
          esc(frame?.mixed || '다른 원인이 함께 든 값이거나 공정별 일반 복구 기간처럼 이 사건에만 해당하지 않는 값') + '이다. 시설보다 넓은 범위의 값은 모두 혼합 집계로 둔다.</li>' +
        '<li>연결 1~6단계는 차질·복구 대장의 공급 6단계(시추·완결~소비·재고)와 다른 축이다.</li>' +
        '<li>값은 각 칸 아래의 대장·명부·분기 비교·기업 카드·출처에서 가져왔고, 자동 갱신 표시는 같은 계열의 최신 값이다.</li>' +
        '</ul></details>';
      return section;
    };

    // ---- the summary ------------------------------------------------------
    // A chain whose desk the page lacks is left out; the summary counts and links the placed ones.
    const placed = D.chains.filter(chain => chain && chain.id && Array.isArray(chain.links))
      .map(chain => [deskOf(chain), chain]).filter(([desk]) => desk);
    const chains = placed.map(([, chain]) => chain);
    const covers = (chain, row) => list(row.kind === 'market' ? chain.markets : chain.industries).includes(row.name);
    const about = (link, row) => list(link.topics).includes(row.name);
    const hasValue = link => isFact(link) || link.value !== null && link.value !== undefined;
    // A value in money (a price, a treatment charge, a profit) is no supply quantity: the price columns cover it.
    const money = link => /(^|\s)(달러|센트|위안|유로|원)(\/|$)/.test(String(link.unit || ''));
    const latestSupply = (covering, row) => covering
      .flatMap(chain => chain.links.filter(link => link.step >= 2 && link.step <= 4 && link.status !== 'unknown' && about(link, row) && hasValue(link) && !money(link)))
      .reduce((best, link) => !best || periodEnd(link.period) > periodEnd(best.period) ? link : best, null);
    const summaryRow = row => {
      const covering = chains.filter(chain => covers(chain, row));
      const links = covering.flatMap(chain => chain.links.filter(link => about(link, row)));
      const cards = [...new Set(links.flatMap(cardsOf))].filter(card => byCard.has(card));
      // 실적 연결: company_links of the exposed cards; of them, those without a series are named too.
      const tied = list(D.company_links).filter(item => cards.includes(item?.card));
      const tiedOpen = tied.filter(item => item.status === 'unknown').length;
      const open = covering.reduce((n, chain) => n + STEPS.filter((_, i) =>
        !chain.links.some(link => link.step === i + 1 && link.status !== 'unknown' && about(link, row))).length, 0);
      const supply = latestSupply(covering, row);
      const checked = covering.map(chain => chain.checked).sort().pop();
      const dash = '<td class="ec-none">—</td>';
      return '<tr><th scope="row">' + esc(row.name) + '<small>' + (row.kind === 'market' ? '시장' : '산업') + '</small></th>' +
        '<td class="ec-text">' + covering.length + '건' + covering.map(chain => '<small><a href="#chain-' + esc(chain.id) + '">' + esc(chain.title) + '</a></small>').join('') + '</td>' +
        (supply ? '<td class="ec-text">' + valueHtml(supply) + '<small>' + esc(supply.subject) + ' ' + esc(supply.metric) + ' · ' + esc(linkPeriod(supply)) + '</small>' + badge(supply.status) + '</td>' : covering.length ? '<td class="ec-text">' + badge('unknown') + '</td>' : dash) +
        '<td class="ec-text">' + (row.price ? liveText(row.price) : '<span class="note">자동 갱신 계열 없음</span>') + '</td>' +
        '<td>' + (covering.length ? cards.length : '—') + '</td>' +
        '<td>' + (covering.length ? tied.length + (tiedOpen ? '<small>지표 미확인 ' + tiedOpen + '</small>' : '') : '—') + '</td>' +
        '<td class="ec-text">' + (row.consumer ? liveText(row.consumer) : '<span class="note">자동 갱신 계열 없음</span>') + '</td>' +
        '<td>' + (covering.length ? open + '/' + STEPS.length * covering.length : '—') + '</td>' +
        '<td>' + (checked ? timeTag(checked) : '—') + '</td></tr>';
    };
    const summarySection = () => {
      const section = document.createElement('section');
      section.className = 'section ec-section';
      section.id = 'chain-summary';
      // Markets first, then industries, each in the order of chainSummaryRows.
      const rows = ['market', 'industry'].flatMap(kind => chainSummaryRows.filter(row => row && row.name && row.kind === kind));
      section.innerHTML = '<div class="section-head"><h2>사건 연결 요약: 시장·산업별</h2><span class="meta">확인 기준 ' + timeTag(D.as_of) +
        (L ? ' · 시세 자동 갱신 ' + esc(L.kst(L.live.fetched_at)) : '') + '</span></div>' +
        '<p class="note">사건 연결 ' + chains.length + '건을 시장과 산업별로 모았다. 가격 지표와 소비자가격 지표는 자동 갱신 값이고 나머지 칸은 사건 연결 자료에서 센다.</p>' +
        '<div class="table-scroll"><table class="market-table ec-summary-table"><thead><tr><th scope="col">시장·산업</th><th scope="col">사건</th><th scope="col">최근 공급 지표</th>' +
        '<th scope="col">가격 지표</th><th scope="col">노출 기업 카드</th><th scope="col">실적 연결</th><th scope="col">소비자가격 지표</th><th scope="col">미확인 단계</th><th scope="col">확인</th></tr></thead><tbody>' +
        rows.map(summaryRow).join('') + '</tbody></table></div>' +
        '<details class="method"><summary>열 기준</summary><ul>' +
        '<li>최근 공급 지표: 그 시장·산업에 붙은 연결 2~4단계(' + STEPS.slice(1, 4).map(esc).join(', ') + ') 값 가운데 기간이 가장 늦은 것과 그 상태다. 가격·제련비처럼 금액으로 적힌 값은 세지 않는다. 혼합 집계 값이 많아 사건의 몫으로 읽지 않는다.</li>' +
        '<li>가격 지표·소비자가격 지표: 자동 갱신 계열의 최신 값이다. 일간·주간 계열은 1개월 전, 월간 계열은 전월과 비교한다. 정제마진, 제품선·LNG선 운임, 구리 제련비(TC·RC), 인산 비료·비료 가격은 자동 갱신 계열이 없다. 원유선은 탱커 운임선물 ETF로 대신한다.</li>' +
        '<li>노출 기업 카드: 연결이 가리키는 기업 카드 수다. 실적 연결: 그 카드들의 분기 실적 수치를 같은 분기의 지표와 잇는 연결의 수다. 그 가운데 지표 계열이 없어 값을 내지 못한 연결의 수를 지표 미확인으로 함께 적는다. 카드의 연결은 그 카드가 노출 기업 카드에 든 시장·산업마다 세므로, 한 연결이 여러 행에 들기도 하고 행의 품목과 다른 지표를 잇기도 한다. 기업 실적의 분기는 사건 기간과 다를 수 있다. 지표 값과 비교 기간은 각 기업 카드의 지표표 아래 연결 지표 줄에 있다.</li>' +
        '<li>미확인 단계: 연결 6단계 가운데 그 시장·산업에 실측·추정·계산 값이 하나도 없는 단계의 수다.</li>' +
        '</ul></details>';
      return section;
    };

    const sections = placed.map(([desk, chain]) => [desk, chainSection(chain)]);
    const summary = inflation && chains.length ? summarySection() : null;
    for (const [desk, section] of sections) desk.append(section);
    if (summary) inflation.append(summary);
  } catch (err) {
    console.error('event-chains: sections not built', err);
  }
})();
