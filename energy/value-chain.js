'use strict';
// 밸류체인 기업 desk. value-chain-data.js holds the researched quarter of each
// company (earnings releases, calls, filings; every figure carries its source);
// energyLive (live.js) adds what moves on its own: the last close and its
// changes (Yahoo) and, for SEC 10-Q filers, the newest quarter's revenue, net
// income and diluted EPS from XBRL frames. A quarter newer than the researched
// one is flagged, so the card says when its text is behind the filings.
//
// A card named by eventChains.company_links (event-chains-data.js, loaded
// before this script) gets a 연결 지표 line under its metric table: the figure,
// the series it is compared with and that series' value for the same period,
// worked out here from window.ENERGY_LIVE. A live series (energy_live.py)
// gives the mean of its monthly means (a monthly series: of its monthly
// values) over the period's months (complete months only, as the payload keeps
// them); a weekly supply series (energy_supply.py) the mean of the weekly
// values whose week ends in the period, a monthly yield the mean of its
// months. The same months a year earlier give the comparison. Once the year
// turns, a weekly series holds last year's values only as the comparison of
// this year's weeks (prev): a period of last year is read from them, and its
// own year-earlier comparison is 미확인, with the reason. A period the payload
// does not hold in full is written 미확인 with what is missing, never as the
// mean of the part it has. Volumes the payload keeps in thousands (천 배럴,
// 천 배럴/일) are written in 만 from 1만 on, as the page's prose counts them.
// The public Pages copy nulls eventChains, so no line is drawn there.
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
    // Kinds of a segment's 확인하지 못한 항목 (open_items[].kind), in the order
    // the folded list shows them; test_energy_facts.py checks every item has one.
    const OPEN_KINDS = [['source_unread', '원문 미열람'], ['secondary_only', '2차 자료만'], ['not_disclosed', '미공시'],
                        ['pending', '발표 전'], ['paid_source', '유료 원천'], ['definition', '정의 차이'], ['other', '기타']];
    // The folded list of a segment: items grouped by kind with counts, each
    // linked to the company card it concerns (open_items[].card, the card's
    // vc-co- anchor without the prefix). A bare string is an item of kind
    // other, so the list counts what companyTotals counts.
    const openItems = seg => {
      const items = (seg.open_items || []).map(item => typeof item === 'string' ? {text: item, kind: 'other'} : item)
        .filter(item => item && item.text);
      if (!items.length) return '';
      const kindOf = item => OPEN_KINDS.some(([kind]) => kind === item.kind) ? item.kind : 'other';
      const groups = OPEN_KINDS.map(([kind, label]) => [label, items.filter(item => kindOf(item) === kind)]).filter(([, list]) => list.length);
      const cardLink = item => {
        const company = item.card && seg.companies.find(c => slug(c.yahoo || c.ticker) === item.card);
        return company ? ' <a href="#' + cardId(company) + '">' + esc(company.name_kr) + ' 카드 ↗</a>' : '';
      };
      return '<details class="method vc-open"><summary>확인하지 못한 항목 ' + items.length + '건 · ' +
        groups.map(([label, list]) => esc(label) + ' ' + list.length).join(' · ') + '</summary>' +
        groups.map(([label, list]) => '<p><b>' + esc(label) + ' ' + list.length + '건</b></p><ul>' +
          list.map(item => '<li>' + esc(item.text) + cardLink(item) + '</li>').join('') + '</ul>').join('') + '</details>';
    };

    // ---- 연결 지표: company figures and the series of the same period -------
    const SUP = window.ENERGY_LIVE?.supply?.ok ? window.ENERGY_LIVE.supply : null;
    const LINK_STATUS = {measured:'실측', estimated:'추정', derived:'계산'};
    const DAY = 864e5;
    const num = value => value !== null && value !== undefined && value !== '' && Number.isFinite(Number(value));
    const mean = values => values.reduce((sum, value) => sum + Number(value), 0) / values.length;
    const dotMonth = month => String(month).replace('-', '.');
    const shiftYear = (month, by) => (Number(month.slice(0, 4)) + by) + month.slice(4);
    const nextMonth = month => {
      const [y, m] = month.split('-').map(Number);
      return m === 12 ? (y + 1) + '-01' : y + '-' + String(m + 1).padStart(2, '0');
    };
    // '2026-07/2026-09' -> the months 2026-07, 2026-08, 2026-09 (none for another form).
    const monthsOf = span => {
      const [a, b = a] = String(span || '').split('/');
      if (!/^\d{4}-\d{2}$/.test(a) || !/^\d{4}-\d{2}$/.test(b) || a > b) return [];
      const out = [a];
      while (out.at(-1) < b && out.length < 24) out.push(nextMonth(out.at(-1)));
      return out;
    };
    // 2026-07..2026-09 -> 2026.07~09.
    const monthSpan = months => dotMonth(months[0]) + (months.length > 1
      ? '~' + (months.at(-1).slice(0, 4) === months[0].slice(0, 4) ? months.at(-1).slice(5) : dotMonth(months.at(-1))) : '');
    const quarterText = period => {
      const q = /^(\d{4})-Q([1-4])$/.exec(String(period || ''));
      return q ? q[1] + '년 ' + q[2] + '분기' : String(period || '');
    };
    // Week of the year from January 1 (energy_supply.week_of_year).
    const weekOfYear = time => Math.floor((time - Date.UTC(new Date(time).getUTCFullYear(), 0, 1)) / DAY / 7) + 1;
    // A series over the period's months: {name, unit, digits, how, now, then, lacking, thenLacking}.
    // `now` is the mean over the months, `then` over the same months a year earlier; either is null
    // when the payload lacks one of its months or weeks, and `lacking` then says what is missing for
    // now. `thenLacking`, when set, says why `then` is null.
    const overMonths = (map, months, info) => {
      const take = list => list.every(month => num(map[month])) ? mean(list.map(month => map[month])) : null;
      const gaps = months.filter(month => !num(map[month]));
      return {...info, now: take(months), then: take(months.map(month => shiftYear(month, -1))),
              lacking: gaps.length ? '자동 갱신 자료에 ' + gaps.map(dotMonth).join('·') + ' 값이 없다' : ''};
    };
    const liveSeries = (key, months) => {
      const entry = L?.series?.[key];
      // A monthly series (freq M) keeps its monthly values; the others keep monthly means.
      return entry?.monthly ? overMonths(entry.monthly, months, {name: entry.label, unit: entry.unit, digits: entry.digits,
                                                                 how: entry.freq === 'M' ? '월간 값의 평균' : '월평균의 평균'}) : null;
    };
    const yieldSeries = (key, months) => {
      const entry = SUP?.us_yields?.[key];
      return Array.isArray(entry?.points)
        ? overMonths(Object.fromEntries(entry.points), months, {name: '미국 ' + entry.label + ' 수율', unit: entry.unit, digits: 1, how: '월간 값의 평균'}) : null;
    };
    // EIA weekly series (energy_supply.seasonal_weekly) keep the year of the last value by week
    // (cur, ending with last) and, for each week slot of that year from its first value to the
    // year end, the observation nearest the same date a year back within 3 days (prev). On the
    // weekly grid that observation is the one 52 weeks back, so a slot's prev value is dated so.
    // A week's date in cur is last minus whole weeks; a gap shows as a week number that does not
    // match, and no period is then covered. A period of the last value's year is read from cur
    // and compared with prev; a period of the year before is read from prev, and the payload has
    // no year before that to compare it with: its `then` is null and `thenLacking` says so.
    const weeklySeries = (section, key, months) => {
      const entry = SUP?.[section]?.[key];
      if (!entry?.last?.date || !Array.isArray(entry.cur) || !entry.cur.length) return null;
      const info = {name: '미국 ' + entry.label, unit: entry.unit, digits: entry.unit === '%' || entry.unit === '일' ? 1 : 0,
                    how: entry.basis === 'avg4' ? '4주 평균 주간 값의 평균, 근사' : '주 마감일 기준 주간 값의 평균'};
      const gap = {...info, now: null, then: null, lacking: '자동 갱신 자료의 주간 값으로 이 기간을 채우지 못한다'};
      const last = Date.parse(entry.last.date + 'T00:00:00Z');
      if (!Number.isFinite(last)) return gap;
      const n = entry.cur.length;
      const weeks = entry.cur.map(([week, value], i) => ({week, value, time: last - (n - 1 - i) * 7 * DAY}));
      if (!weeks.every(w => w.week === weekOfYear(w.time))) return gap;
      const year = new Date(last).getUTCFullYear();
      const prev = new Map((Array.isArray(entry.prev) ? entry.prev : []).map(([week, value]) => [week, value]));
      const start = Date.parse(months[0] + '-01T00:00:00Z');
      const end = Date.parse(nextMonth(months.at(-1)) + '-01T00:00:00Z') - DAY;
      // The weeks ending in the period, or null unless the list reaches both ends and each has a value.
      const inPeriod = list => {
        const inside = list.filter(w => w.time >= start && w.time <= end);
        return inside.length && list[0].time <= start + 6 * DAY && list.at(-1).time >= end - 6 * DAY &&
          inside.every(w => num(w.value)) ? inside : null;
      };
      const periodYear = Number(months[0].slice(0, 4));
      if (periodYear === year) {
        const inside = inPeriod(weeks);
        if (!inside) return gap;
        const back = inside.map(w => prev.get(w.week));
        return {...info, now: mean(inside.map(w => w.value)), then: back.every(num) ? mean(back) : null, lacking: ''};
      }
      if (periodYear === year - 1) {
        const slots = [];
        for (let t = weeks[0].time; new Date(t).getUTCFullYear() === year; t += 7 * DAY)
          slots.push({week: weekOfYear(t), value: prev.get(weekOfYear(t)), time: t - 52 * 7 * DAY});
        const inside = inPeriod(slots);
        return inside ? {...info, now: mean(inside.map(w => w.value)), then: null, lacking: '',
                         thenLacking: '자동 갱신 자료에 ' + (periodYear - 1) + '년 주간 값이 없다'} : gap;
      }
      return gap;
    };
    const linkSeries = (indicator, months) => {
      if (!indicator || !months.length) return null;
      if (indicator.kind === 'live') return liveSeries(indicator.key, months);
      const [section, key] = String(indicator.key || '').split('.');
      if (indicator.kind === 'supply' && section === 'us_yields') return yieldSeries(key, months);
      if (indicator.kind === 'supply' && (section === 'us_weekly' || section === 'us_cover')) return weeklySeries(section, key, months);
      return null;
    };
    const withUnit = (text, unit) => text + (unit === '%' ? '%' : unit ? ' ' + esc(unit) : '');
    // The payload keeps volumes in thousands (천 배럴, 천 배럴/일). From 1만 on the line counts them
    // in 만 with one decimal, as the page's prose does (15,786 천 배럴/일 -> 1,578.6만 배럴/일), and in
    // 억 from 10,000만 on. The period's value as printed sets the scale (9.6 천 prints as 10, so it
    // counts), and the comparison follows it.
    const inMan = series => /^천 /.test(series.unit || '') &&
      Math.abs(Number(fmt(series.now, series.digits).replace(/,/g, ''))) >= 10;
    const amount = (value, series) => {
      if (!inMan(series)) return fmt(value, series.digits);
      const tenths = Math.round(Math.abs(value));            // 1천 = 0.1만
      const eok = Math.floor(tenths / 1e5), rest = tenths - eok * 1e5;
      return (value < 0 ? '−' : '') + (eok ? fmt(eok, 0) + '억' : '') +
        (rest || !eok ? (eok ? ' ' : '') + fmt(rest / 10, 1) + '만' : '');
    };
    const unitOf = series => inMan(series) ? series.unit.slice(2) : series.unit;
    // The series side of a line: its value for the period and a year earlier, or why there is none.
    const linkValue = item => {
      const months = monthsOf(item.indicator_period);
      const series = linkSeries(item.indicator, months);
      if (!series) return '<span class="note">자동 갱신 대기</span>';
      const head = esc(series.name) + ' ' + monthSpan(months) + ' 평균 ';
      if (!num(series.now)) return head + '미확인(' + esc(series.lacking) + ')';
      const back = '전년 같은 기간(' + monthSpan(months.map(month => shiftYear(month, -1))) + ') ';
      let change = '';
      if (num(series.then)) {
        const diff = series.unit === '%' ? series.now - series.then : series.then ? (series.now / series.then - 1) * 100 : null;
        change = diff === null ? '' : ' 대비 <em class="' + tone(diff) + '">' + (diff > 0 ? '+' : diff < 0 ? '−' : '') + fmt(Math.abs(diff), 1) + (series.unit === '%' ? '%p' : '%') + '</em>(계산)';
      }
      return head + '<b>' + withUnit(amount(series.now, series), unitOf(series)) + '</b>(계산: ' + esc(series.how) + ') · ' + back +
        (num(series.then) ? amount(series.then, series) + change : '미확인' + (series.thenLacking ? '(' + esc(series.thenLacking) + ')' : ''));
    };
    const linkLine = (company, item) => {
      const target = item.target;
      const metric = (company.metrics || []).find(m => m && m.label === target.label && m.period === target.period);
      if (target.kind !== 'card_metric' || !metric) return '';
      // The figure's status as the chain cells badge it (event-chains.css); an unknown link badges the series side.
      const badge = status => '<span class="ec-badge" data-status="' + esc(status) + '">' + esc(status === 'unknown' ? '미확인' : LINK_STATUS[status] || status) + '</span>';
      const known = item.status !== 'unknown' && item.indicator;
      return '<p class="vc-link" data-status="' + esc(item.status) + '"><strong>연결 지표</strong> <span class="vc-rel">' + esc(item.relation) + '</span> ' +
        esc(metric.label) + ' ' + esc(quarterText(item.company_period)) + (known ? ' ' + badge(item.status) : '') + ' ↔ ' +
        (known ? linkValue(item) : '지표 ' + badge('unknown')) + (item.note ? '<small>' + esc(item.note) + '</small>' : '') + '</p>';
    };
    // Card id -> its lines. A failure here leaves the cards without lines, not the desk empty.
    const linkLines = (() => {
      const out = new Map();
      try {
        const items = typeof eventChains !== 'undefined' && eventChains && Array.isArray(eventChains.company_links)
          ? eventChains.company_links.filter(item => item && item.card && item.target) : [];
        const companies = valueChain.segments.flatMap(seg => Array.isArray(seg?.companies) ? seg.companies : []);
        for (const item of items) {
          const company = companies.find(c => slug(c.yahoo || c.ticker) === item.card);
          const line = company ? linkLine(company, item) : '';
          if (line) out.set(item.card, (out.get(item.card) || '') + line);
        }
      } catch (err) {
        console.error('value-chain: company links not drawn', err);
        out.clear();
      }
      return out;
    })();

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
        (linkLines.get(slug(company.yahoo || company.ticker)) || '') +
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
    // Written as the other sections' 최신 자료일 (section-dates.js): YYYY.MM.DD in <time>.
    const day = iso => '<time datetime="' + esc(iso) + '">' + esc(String(iso ?? '').replaceAll('-', '.')) + '</time>';
    overview.innerHTML = '<div class="section-head"><h2>밸류체인 기업 요약표</h2><span class="meta">최신 자료일 ' + day(valueChain.as_of) +
      (valueChain.pending_checked ? ' · 미발표 확인 ' + day(valueChain.pending_checked) : '') +
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
        '<div class="detail-grid vc-grid">' + seg.companies.map(companyCard).join('') + '</div>' + openItems(seg);
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
