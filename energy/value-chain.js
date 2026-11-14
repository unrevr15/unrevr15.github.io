'use strict';
// 밸류체인 기업 desk. value-chain-data.js holds the researched quarter of each
// company (earnings releases, calls, filings; every figure carries its source);
// energyLive (live.js) adds what moves on its own: the last close and its
// changes (Yahoo) and, for SEC 10-Q filers, the newest quarter's revenue, net
// income and diluted EPS from XBRL frames. A quarter newer than the researched
// one is flagged, so the card says when its text is behind the filings.
//
// Runs before workspace.js, which puts the desk's sections in its views. The
// sections join the desk only after every one of them exists, so a failure
// here leaves the desk empty instead of breaking the other desks.
(() => {
  const desk = document.getElementById('companies');
  if (!desk || typeof valueChain === 'undefined' || !valueChain || !Array.isArray(valueChain.segments)) return;
  try {
    const L = (typeof energyLive !== 'undefined' && energyLive) || null;
    const esc = value => String(value ?? '').replace(/[&<>"']/g, c =>
      ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const safeUrl = url => /^https?:\/\//i.test(String(url || '')) ? esc(url) : '';
    const fmt = (value, digits) => value === null || value === undefined || !Number.isFinite(Number(value))
      ? '—' : Number(value).toLocaleString('en-US', {minimumFractionDigits:digits, maximumFractionDigits:digits});
    const pct = (now, then) => (now === null || now === undefined || !then) ? null : (now / then - 1) * 100;
    const signed = (value, digits = 1) => value === null || !Number.isFinite(value)
      ? '—' : (value > 0 ? '+' : value < 0 ? '−' : '') + fmt(Math.abs(value), digits) + '%';
    const tone = value => !Number.isFinite(value) || value === 0 ? '' : value > 0 ? 'live-up' : 'live-down';
    const slug = value => String(value).replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const DESKS = {war:'지정학', oil:'원유', products:'정유·석유화학', gas:'천연가스·LNG', power:'석탄·전력',
                   copper:'구리', food:'식량', prices:'산업비용', inflation:'물가전이'};
    const CURRENCY = {USD:['달러',2], KRW:['원',0], GBp:['펜스',1], GBP:['파운드',2], EUR:['유로',2], NOK:['크로네',1],
                      AUD:['호주달러',2], CAD:['캐나다달러',2], SAR:['리얄',2], JPY:['엔',0], BRL:['헤알',2]};
    const price = (value, currency) => {
      const [unit, digits] = CURRENCY[currency] || [currency || '', 2];
      return fmt(value, digits) + (unit ? ' ' + esc(unit) : '');
    };
    const usd = value => {
      if (value === null || value === undefined || !Number.isFinite(Number(value))) return '—';
      const v = Number(value);
      return (v < 0 ? '−' : '') + fmt(Math.abs(v) / 1e8, 1) + '억 달러';
    };
    const quote = company => L?.companies?.[company.yahoo] || null;
    const filing = company => company.cik ? L?.filings?.[String(Number(company.cik))] || null : null;
    // A filed quarter newer than the researched period end.
    const newerFiling = company => {
      const f = filing(company);
      return f && f.end && company.period_end && f.end > company.period_end ? f : null;
    };
    const cardId = company => 'vc-co-' + slug(company.yahoo || company.ticker);

    const sourceRefs = (company, ids) => {
      const list = Array.isArray(ids) ? ids : ids === undefined || ids === null || ids === '' ? [] : [ids];
      return list.map(id => {
        const src = (company.sources || []).find(s => String(s.id) === String(id));
        const url = src && safeUrl(src.url);
        // A source without a link (a call, a printed report) keeps its number, as plain text.
        return url ? '<a class="ref" href="' + url + '" target="_blank" rel="noopener noreferrer">[' + esc(id) + ']</a>'
          : src ? '<span class="ref vc-noref">[' + esc(id) + ']</span>' : '';
      }).join('');
    };
    const quoteLine = company => {
      const q = quote(company);
      if (!q?.last) return '<p class="vc-quote note">주가 자동 갱신 대기 · ' + esc(company.yahoo) + '</p>';
      return '<p class="vc-quote"><b>' + price(q.last.value, q.currency) + '</b> <span class="note">' + esc(q.last.date.replaceAll('-', '.')) + ' 종가' +
        (q.carried ? ' · 이전 값' : '') + '</span> · 1개월 <em class="' + tone(pct(q.last.value, q.m1?.value)) + '">' + signed(pct(q.last.value, q.m1?.value)) +
        '</em> · 연초 대비 <em class="' + tone(pct(q.last.value, q.ytd?.value)) + '">' + signed(pct(q.last.value, q.ytd?.value)) +
        '</em> · 52주 ' + price(q.lo52, q.currency) + '~' + price(q.hi52, q.currency) + '</p>';
    };
    const filingBlock = company => {
      const f = filing(company);
      if (!f) return '';
      const yoy = fact => fact && fact.year_ago && fact.value !== null && fact.year_ago > 0 && fact.value > 0
        ? ' (전년 ' + signed(pct(fact.value, fact.year_ago)) + ')'
        : fact && fact.year_ago !== null && fact.year_ago !== undefined ? ' (전년 ' + usd(fact.year_ago) + ')' : '';
      const accn = String(f.accn || '').replace(/-/g, '');
      const link = accn && company.cik
        ? ' <a class="ref" href="https://www.sec.gov/Archives/edgar/data/' + Number(company.cik) + '/' + esc(accn) + '/" target="_blank" rel="noopener noreferrer">[공시]</a>' : '';
      const newer = newerFiling(company);
      return '<div class="vc-filing' + (newer ? ' vc-newer' : '') + '"><span class="live-badge">SEC 자동</span> ' + esc(f.frame) + ' (' + esc(f.end) + ' 종료 분기) · ' +
        '매출 ' + usd(f.revenue?.value) + yoy(f.revenue) + ' · 순이익 ' + usd(f.net_income?.value) + yoy(f.net_income) +
        (f.eps ? ' · 희석 EPS ' + fmt(f.eps.value, 2) + '달러' : '') + link +
        (newer ? '<strong> · 조사 분기 이후 새 분기 공시</strong>' : '') + '</div>';
    };
    const companyCard = (company) => {
      const metrics = (company.metrics || []).filter(m => m && m.label);
      // A company that has not reported the latest quarter yet shows its
      // last published period (the period text names the coming date).
      const status = '<span class="vc-tag' + (company.status === 'reported' ? '' : ' vc-wait') + '">' +
        esc(company.period) + (company.report_date ? ' · ' + esc(company.report_date) + ' 발표' : '') + '</span>';
      const desk = company.read_through?.desk;
      return '<article class="panel vc-card" id="' + cardId(company) + '">' +
        '<div class="panel-head"><h3>' + esc(company.name_kr) + ' <small>' + esc(company.name_en) + '</small></h3><span class="meta">' +
        esc(company.ticker) + ' · ' + esc(company.exchange) + ' · ' + esc(company.country) + '</span></div>' +
        '<p class="vc-role">' + esc(company.role_kr) + ' ' + status + '</p>' +
        quoteLine(company) + filingBlock(company) +
        ((company.highlights || []).length ? '<ul class="vc-points">' + company.highlights.map(h =>
          '<li>' + esc(h.text) + ' ' + sourceRefs(company, h.src) + '</li>').join('') + '</ul>' : '') +
        (metrics.length ? '<div class="table-scroll"><table class="market-table vc-metrics"><thead><tr><th scope="col">지표</th><th scope="col">값</th><th scope="col">기간</th><th scope="col">변화</th></tr></thead><tbody>' +
          metrics.map(m => '<tr><th scope="row">' + esc(m.label) + ' ' + sourceRefs(company, m.src) + '</th><td>' + esc(m.value) + (m.unit ? ' <small>' + esc(m.unit) + '</small>' : '') +
            '</td><td>' + esc(m.period) + '</td><td>' + esc(m.change || '—') + '</td></tr>').join('') + '</tbody></table></div>' : '') +
        ((company.guidance || []).length ? '<div class="vc-guidance"><strong>가이던스·전망</strong><ul>' + company.guidance.map(g =>
          '<li>' + esc(g.text) + ' ' + sourceRefs(company, g.src) + '</li>').join('') + '</ul></div>' : '') +
        (company.read_through?.text ? '<p class="vc-read"><strong>시장 전이</strong> ' + esc(company.read_through.text) +
          (DESKS[desk] ? ' <a href="#' + esc(desk) + '">' + DESKS[desk] + ' 데스크 ↗</a>' : '') + '</p>' : '') +
        ((company.sources || []).length ? '<details class="method"><summary>출처 ' + company.sources.length + '건</summary><ol class="vc-sources">' +
          company.sources.map(s => '<li value="' + esc(s.id) + '">' + (safeUrl(s.url)
            ? '<a href="' + safeUrl(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.title) + ' ↗</a>' : esc(s.title)) +
            ' <span class="note">' + esc(s.publisher) + (s.date ? ' · ' + esc(s.date) : '') + '</span></li>').join('') + '</ol></details>' : '') +
        '</article>';
    };

    const segments = valueChain.segments.filter(seg => seg && seg.id && Array.isArray(seg.companies));
    const all = segments.flatMap(seg => seg.companies.map(company => ({seg, company})));

    // Overview: every company with its live columns.
    const overview = document.createElement('section');
    overview.className = 'section';
    overview.id = 'vc-overview';
    const newerCount = all.filter(({company}) => newerFiling(company)).length;
    const totals = companyTotals(valueChain);
    overview.innerHTML = '<div class="section-head"><h2>밸류체인 기업 요약표</h2><span class="meta">조사 기준 ' + esc(valueChain.as_of) +
      (L ? ' · 주가·SEC 자동 갱신 ' + esc(L.kst(L.live.fetched_at)) : '') + '</span></div>' +
      '<p class="note">' + totals.companies + '개 기업의 실적 발표·컨퍼런스콜·공시를 분기별로 정리했다(지표 ' + fmt(totals.metrics, 0) +
      '개, 하이라이트 ' + fmt(totals.highlights, 0) + '개, 가이던스 ' + fmt(totals.guidance, 0) + '개, 출처 ' + fmt(totals.sources, 0) +
      '건, 확인하지 못한 항목 ' + fmt(totals.open_items, 0) + '개). 종가와 1개월·연초 대비 변화는 대시보드 갱신(하루 두 번)마다 Yahoo Finance에서 다시 받는다. 미국 10-Q 제출 기업은 SEC XBRL로 최신 분기 매출·순이익·희석 EPS를 함께 받는다.' +
      (newerCount ? ' 조사 분기 이후 새 분기를 공시한 기업 ' + newerCount + '곳은 카드에 표시했다.' : '') + '</p>' +
      '<div class="table-scroll"><table class="market-table vc-overview-table"><thead><tr><th scope="col">기업</th><th scope="col">단계</th><th scope="col">종가</th><th scope="col">1개월</th><th scope="col">연초 대비</th><th scope="col">조사 분기</th><th scope="col">SEC 최신 분기</th></tr></thead><tbody>' +
      all.map(({seg, company}) => {
        const q = quote(company);
        const f = filing(company);
        const m1 = q ? pct(q.last?.value, q.m1?.value) : null, ytd = q ? pct(q.last?.value, q.ytd?.value) : null;
        return '<tr><th scope="row"><a href="#' + cardId(company) + '">' + esc(company.name_kr) + '</a><small>' + esc(company.ticker) + ' · ' + esc(company.exchange) + '</small></th>' +
          '<td>' + esc(seg.title) + '</td><td class="latest">' + (q?.last ? price(q.last.value, q.currency) : '—') + '</td>' +
          '<td class="' + tone(m1) + '">' + signed(m1) + '</td><td class="' + tone(ytd) + '">' + signed(ytd) + '</td>' +
          '<td>' + esc(company.period) + (company.status === 'reported' ? '' : ' · 대기') + '</td>' +
          '<td>' + (f ? esc(f.frame) + (newerFiling(company) ? ' · 신규' : '') : '—') + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<div class="vc-chain">' + segments.map(seg => '<a href="#vc-' + esc(seg.id) + '"><b>' + esc(seg.title) + '</b><span>' +
        esc(seg.position) + '</span><small>' + seg.companies.length + '개 기업</small></a>').join('') + '</div>';

    const sections = [overview];
    for (const seg of segments) {
      const section = document.createElement('section');
      section.className = 'section';
      section.id = 'vc-' + seg.id;
      section.innerHTML = '<div class="section-head"><h2>' + esc(seg.title) + '</h2><span class="meta">' + seg.companies.length + '개 기업</span></div>' +
        '<p class="note vc-position">' + esc(seg.position) + '</p>' +
        ((seg.summary || []).length ? '<div class="panel vc-summary"><h3>분기 요약</h3><ul>' + seg.summary.map(line => '<li>' + esc(line) + '</li>').join('') + '</ul></div>' : '') +
        '<div class="detail-grid vc-grid">' + seg.companies.map(companyCard).join('') + '</div>' +
        ((seg.open_items || []).length ? '<details class="method"><summary>확인하지 못한 항목</summary><ul>' + seg.open_items.map(item => '<li>' + esc(item) + '</li>').join('') + '</ul></details>' : '');
      sections.push(section);
    }
    // Company names become picker entries and search results (workspace.js
    // reads links of a desk's .section-jump nav as locations).
    const jump = document.createElement('nav');
    jump.className = 'section-jump';
    jump.setAttribute('aria-label', '기업 바로가기');
    jump.innerHTML = all.map(({company}) => '<a href="#' + cardId(company) + '">' + esc(company.name_kr) + ' ' + esc(company.ticker) + '</a>').join('');
    const heading = desk.querySelector(':scope > .desk-heading');
    (heading || desk.firstChild).after(jump);
    // workspace.js puts the sections in the desk's views (deskViews.companies);
    // a segment it does not list goes to a '기타' view.
    desk.append(...sections);
  } catch (err) {
    console.error('value-chain: desk not built', err);
  }
})();
