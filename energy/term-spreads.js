'use strict';
// 기간구조 스프레드 (원유 › 가격 구조, #term-spreads), computed from the live
// payload (window.ENERGY_LIVE, backend/app/etl/external/energy_live.py):
//   * M1 − M2 of Brent and WTI from `term.<crude>.rows`, the same-day closes
//     of the front contract and the contract month after it,
//   * Brent − Dubai from the IMF monthly averages `series.brent_imf` and
//     `series.dubai_imf`. The IMF Brent runs at the level of the front-month
//     future, so that half names it and prints the same month's difference
//     on the spot average (`series.brent`) under it.
// index.html holds the heading and the empty hosts. Every number is computed
// here from the payload; no sentence carries a fixed figure. An entry the
// fetcher kept from an earlier run (`carried`) is badged '이전 값' and gets no
// '갱신' time.
//
// The arithmetic is in the functions below, outside the drawing code, so
// test_energy_term_spreads.py runs it in node. Each half draws inside its own
// try and builds its markup before it touches the page. Without the payload,
// with a snapshot from before these fields existed, or on any error, a half
// shows the one line '자료 없음' and nothing else on the page changes. Loaded
// after market-insights.js (timeChart) and market-expansion.js (marketTable).

// Rows [[YYYY-MM-DD, M1 close, M2 close, 'YYYY-MM', 'YYYY-MM'], …] → one row
// per trading day, oldest first. A row whose prices are not numbers above
// zero, or whose second contract month is not later than the first, is
// dropped. `roll` marks the first day on a new front contract: the pair of
// contracts differs from the row before it, so the step between the two rows
// is the change of contracts as well as of the market.
function termSpreads(rows) {
  const month = value => typeof value === 'string' && /^\d{4}-\d{2}$/.test(value);
  const price = value => typeof value === 'number' && Number.isFinite(value) && value > 0;
  const byDay = new Map((Array.isArray(rows) ? rows : []).filter(row => Array.isArray(row) &&
    typeof row[0] === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(row[0]) && price(row[1]) && price(row[2]) &&
    month(row[3]) && month(row[4]) && row[3] < row[4]).map(row => [row[0], row]));
  return [...byDay.keys()].sort().map((day, i, days) => {
    const [, m1, m2, front, next] = byDay.get(day);
    return {date: day, m1, m2, front, next, spread: m1 - m2, roll: i > 0 && byDay.get(days[i - 1])[3] !== front};
  });
}
// The name of the structure, by the sign of the value as printed (two decimals).
function termStructure(spread) {
  if (typeof spread !== 'number' || !Number.isFinite(spread)) return null;
  const shown = Number(spread.toFixed(2));
  return shown > 0 ? '백워데이션' : shown < 0 ? '콘탱고' : '평탄';
}
// The newest row on or before `days` calendar days before the last row.
function termBefore(rows, days) {
  if (!Array.isArray(rows) || !rows.length) return null;
  const day = new Date(rows.at(-1).date + 'T00:00:00Z');
  day.setUTCDate(day.getUTCDate() - days);
  const limit = day.toISOString().slice(0, 10);
  return rows.filter(row => row.date <= limit).at(-1) || null;
}
// What the chart draws from each crude's rows (termSpreads): the days any of
// them has within `span` calendar days of the newest row, a row [day, spread…]
// per day with null where a crude has none, and the points [day, crude number]
// on which a crude's line steps onto a new front contract. A roll on a crude's
// first drawn day is no step of its line and is left out.
function termChart(list, span) {
  const all = (Array.isArray(list) ? list : []).map(rows => Array.isArray(rows) ? rows : []);
  const newest = all.flatMap(rows => rows.slice(-1)).map(row => row.date).sort().at(-1);
  if (!newest) return {days: [], rows: [], marks: []};
  const from = new Date(newest + 'T00:00:00Z');
  from.setUTCDate(from.getUTCDate() - span);
  const start = from.toISOString().slice(0, 10);
  const drawn = all.map(rows => rows.filter(row => row.date >= start));
  const days = [...new Set(drawn.flatMap(rows => rows.map(row => row.date)))].sort();
  const maps = drawn.map(rows => new Map(rows.map(row => [row.date, row.spread])));
  return {days, rows: days.map(day => [day, ...maps.map(map => map.has(day) ? map.get(day) : null)]),
    marks: drawn.flatMap((rows, i) => rows.filter((row, j) => j > 0 && row.roll).map(row => [row.date, i + 1]))};
}
// Two {YYYY-MM: monthly average} maps → the months both have, oldest first.
function gradeSpread(brent, dubai) {
  const level = (monthly, key) => monthly && typeof monthly[key] === 'number' && Number.isFinite(monthly[key]) && monthly[key] > 0 ? monthly[key] : null;
  return Object.keys(brent && typeof brent === 'object' ? brent : {}).filter(key => /^\d{4}-\d{2}$/.test(key)).sort()
    .map(key => ({month: key, brent: level(brent, key), dubai: level(dubai, key)}))
    .filter(row => row.brent !== null && row.dubai !== null)
    .map(row => ({...row, spread: row.brent - row.dubai}));
}

(() => {
  const NONE = '<p class="note">자료 없음</p>';
  const live = window.ENERGY_LIVE;
  const ok = live && live.ok === true;
  const series = (ok && live.series) || {};
  const term = (ok && live.term) || {};
  const host = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fixed = value => Math.abs(value).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
  // Two decimals; the sign follows the printed value, so −0.004 prints 0.00.
  const shown = value => Number(value.toFixed(2));
  const signed = value => !Number.isFinite(value) ? '—' : (shown(value) > 0 ? '+' : shown(value) < 0 ? '−' : '') + fixed(value);
  const tone = value => !Number.isFinite(value) || shown(value) === 0 ? '' : value > 0 ? 'live-up' : 'live-down';
  const dot = iso => esc(String(iso).replaceAll('-', '.'));
  const time = iso => '<time datetime="' + esc(iso) + '">' + dot(iso) + '</time>';
  const monthKo = month => Number(String(month).slice(0, 4)) + '년 ' + Number(String(month).slice(5, 7)) + '월';
  // '2027년 1월물 − 2월물', and both years when the pair crosses one.
  const pairKo = row => monthKo(row.front) + '물 − ' +
    (row.next.slice(0, 4) === row.front.slice(0, 4) ? Number(row.next.slice(5, 7)) + '월' : monthKo(row.next)) + '물';
  const link = (base, ref, label) => '<a href="' + base + encodeURIComponent(ref) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + '</a>';
  const updated = () => {
    const stamp = new Date(live.fetched_at);
    if (!live.fetched_at || Number.isNaN(stamp.getTime())) return '';
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Seoul', year:'numeric', month:'2-digit', day:'2-digit',
      hour:'2-digit', minute:'2-digit', hour12:false}).formatToParts(stamp).map(({type, value}) => [type, value]));
    return '갱신 ' + p.year + '.' + p.month + '.' + p.day + ' ' + p.hour + ':' + p.minute + ' KST';
  };
  const fill = (id, html) => { const el = host(id); if (el) el.innerHTML = html; };
  // As live.js marks an entry this run could not refresh.
  const STALE = ' <span class="live-badge">이전 값</span>';
  // One line in the data host; the other hosts are emptied so no chart or
  // table is left over a half that was not drawn.
  const none = (data, others) => { others.forEach(id => fill(id, '')); fill(data, NONE); };
  let drawn = 0;

  // ---- 근월물 − 차근월물 (M1 − M2) ------------------------------------------
  const TERM_HOSTS = ['term-spreads-chart', 'term-spreads-table', 'term-spreads-asof'];
  try {
    const crudes = [['brent', '#ae4d22'], ['wti', '#356fa4']].map(([key, color]) => {
      const entry = term[key];
      const rows = entry ? termSpreads(entry.rows) : [];
      return rows.length ? {key, color, entry, rows, latest: rows.at(-1), label: esc(entry.label || key), stale: Boolean(entry.carried)} : null;
    }).filter(Boolean);
    if (!crudes.length || !host('term-spreads-data') || !host('term-spreads-chart')) none('term-spreads-data', TERM_HOSTS);
    else {
      const tiles = '<div class="ts-tiles">' + crudes.map(({label, latest, stale}) =>
        '<div class="ts-tile"><h4>' + label + ' <span>' + pairKo(latest) + (latest.roll ? ' · 만기 교체' : '') + '</span></h4>' +
        '<p class="ts-value"><b>' + signed(latest.spread) + '</b><small>달러/배럴</small><em>' + termStructure(latest.spread) + '</em></p>' +
        '<p class="ts-legs">' + fixed(latest.m1) + ' − ' + fixed(latest.m2) + ' · ' + time(latest.date) + ' 종가' + (stale ? STALE : '') + '</p></div>').join('') + '</div>';
      // Levels, each with its own day and pair of contracts: a month back is
      // another pair, so the cells are not turned into changes.
      const columns = [['전 거래일', rows => rows.at(-2) || null], ['1주 전', rows => termBefore(rows, 7)], ['1개월 전', rows => termBefore(rows, 30)]];
      const cell = row => !row ? '—' : '<span class="' + tone(row.spread) + '">' + signed(row.spread) + '</span><small>' +
        esc(row.date.slice(5).replace('-', '.')) + '</small><small>' + Number(row.front.slice(5, 7)) + '월물 − ' + Number(row.next.slice(5, 7)) + '월물</small>';
      const table = marketTable(['달러/배럴', ...columns.map(([label]) => label)],
        crudes.map(({label, rows}) => [label, ...columns.map(([, pick]) => cell(pick(rows)))]));
      // A year back from the newest close, each crude on its own days: one
      // that stopped earlier ends there and the other runs on.
      const newest = crudes.map(({latest}) => latest.date).sort().at(-1);
      const chart = termChart(crudes.map(({rows}) => rows), 365);
      const days = chart.days;
      const sources = crudes.map(({entry, latest, label, stale}) => {
        const symbols = entry.symbols && typeof entry.symbols === 'object' ? entry.symbols : {};
        const refs = [latest.front, latest.next].map(month => symbols[month]).filter(ref => typeof ref === 'string');
        return label + (stale ? STALE : '') + ' ' + (refs.length === 2 ? refs.map(ref => link('https://finance.yahoo.com/quote/', ref, ref)).join('·')
          : link('https://finance.yahoo.com/quote/', entry.ref || '', 'Yahoo ' + (entry.ref || '')));
      }).join(' · ');
      // The time of this run goes with the crudes it refreshed, by name when
      // another one was kept from an earlier run.
      const fresh = crudes.filter(({stale}) => !stale).map(({label}) => label);
      const foot = sources + ' 종가' + (fresh.length && updated() ? ' · ' + (fresh.length < crudes.length ? fresh.join('·') + ' ' : '') + updated() : '');
      if (days.length > 1) {
        const values = chart.rows.flatMap(row => row.slice(1).filter(value => value !== null));
        const domain = [Math.min(0, Math.floor(Math.min(...values))), Math.max(1, Math.ceil(Math.max(...values)))];
        // A point's label is its whole date (timeChart places points by label);
        // the axis prints 월.일, or 연.월 once the days span more than four months.
        const long = (new Date(days.at(-1)) - new Date(days[0])) / 864e5 > 124;
        const lines = crudes.map(({label, color}, i) => ({index: i + 1, label, color})).filter(({index}) => chart.rows.some(row => row[index] !== null));
        // The chart rings each day a line steps onto a new front contract
        // (twelve a year for each crude); the caption names the newest only.
        timeChart('term-spreads-chart', chart.rows, lines.map(({index, label, color}) => ({index, label: label + ' M1 − M2', color})),
          {unit: '달러/배럴', domain, tick: day => long ? day.slice(2, 7).replace('-', '.') : day.slice(5).replace('-', '.'),
           ...(chart.marks.length ? {marks: {label: '근월물 교체일', points: chart.marks}} : {})});
        const rolls = lines.map(({index, label}) => [label, chart.marks.filter(([, crude]) => crude === index).at(-1)]).filter(([, mark]) => mark)
          .map(([label, [day]]) => label + ' ' + esc(day.slice(long ? 2 : 5).replace(/-/g, '.'))).join(', ');
        host('term-spreads-chart').insertAdjacentHTML('beforeend', '<p class="note context-caption">' + time(days[0]) + '~' + time(days.at(-1)) +
          ' · ' + days.length + '거래일 · 0보다 위는 백워데이션, 아래는 콘탱고' + (rolls && ' · 최근 근월물 교체일 ' + rolls) + ' · ' + foot + '</p>');
      } else fill('term-spreads-chart', '<p class="note context-caption">' + foot + '</p>');
      fill('term-spreads-data', '<h4 class="ts-sub">근월물 − 차근월물 (M1 − M2)</h4>' + tiles);
      fill('term-spreads-table', '<div class="table-scroll">' + table + '</div>');
      fill('term-spreads-asof', '기준일 ' + time(newest) + ' · 달러/배럴');
      drawn += 1;
    }
  } catch (err) {
    console.error('term spreads: M1 − M2 not drawn', err);
    none('term-spreads-data', TERM_HOSTS);
  }

  // ---- Brent − Dubai 월평균 --------------------------------------------------
  try {
    const legs = [series.brent_imf, series.dubai_imf];
    const rows = legs.every(entry => entry && entry.monthly) ? gradeSpread(legs[0].monthly, legs[1].monthly) : [];
    if (!rows.length || !host('grade-spread-data')) none('grade-spread-data', []);
    else {
      const latest = rows.at(-1), year = rows.slice(-13);
      const max = Math.max(1, ...year.map(row => Math.abs(shown(row.spread))));
      // The markup of comparisonChart's signed bars (market-expansion.js), with
      // the labels printed by signed() and tone() as in the tile.
      const key = 'IMF 브렌트 − IMF 두바이유 · 달러/배럴';
      const bars = '<div class="compare-chart signed-chart"><div class="compare-key"><span class="compare-series-0"><i></i>' + key + '</span></div>' +
        year.map(row => {
          const width = Math.abs(shown(row.spread)) / max * 50;
          return '<div class="compare-item"><strong>' + esc(row.month.replace('-', '.')) + '</strong><div class="compare-values">' +
            '<div class="compare-row compare-series-0" aria-label="' + key + ' ' + signed(row.spread) + '"><span class="compare-track" aria-hidden="true">' +
            '<i style="left:' + (shown(row.spread) < 0 ? 50 - width : 50) + '%;width:' + width + '%"></i></span><span class="' + tone(row.spread) + '">' +
            signed(row.spread) + '</span></div></div></div>';
        }).join('') + '</div>';
      const higher = shown(latest.spread) > 0 ? '브렌트가 높음' : shown(latest.spread) < 0 ? '두바이유가 높음' : '같음';
      // Which Brent: the IMF's, at the level of the front-month future. The
      // page's monthly figures are the spot price, so the same month's spot
      // average and the difference on it go under the two legs.
      const spot = series.brent && series.brent.monthly ? series.brent.monthly[latest.month] : null;
      const onSpot = typeof spot === 'number' && Number.isFinite(spot) && spot > 0
        ? '<p class="ts-legs">현물 브렌트 ' + fixed(spot) + ' 기준 ' + signed(spot - latest.dubai) + '</p>' : '';
      const monthly = host('timeline') ? '<a href="#timeline">원유·디젤·크랙 추이</a>' : '원유·디젤·크랙 추이';
      const stale = legs.some(entry => entry.carried);
      fill('grade-spread-data', '<h4 class="ts-sub">Brent − Dubai 월평균</h4><div class="ts-tiles ts-one"><div class="ts-tile"><h4>브렌트 − 두바이유 <span>' +
        '<time datetime="' + esc(latest.month) + '">' + monthKo(latest.month) + '</time> 평균</span></h4>' +
        '<p class="ts-value"><b>' + signed(latest.spread) + '</b><small>달러/배럴</small><em>' + higher + '</em></p>' +
        '<p class="ts-legs">IMF 브렌트 ' + fixed(latest.brent) + ' − IMF 두바이유 ' + fixed(latest.dubai) + (stale ? STALE : '') + '</p>' + onSpot + '</div></div>' +
        '<p class="note">IMF 브렌트는 선물 근월물 수준의 월평균이라 ' + monthly + '의 현물 브렌트와 다른 값이다.</p>' + bars +
        '<p class="note context-caption">' + monthKo(year[0].month) + '~' + monthKo(latest.month) + ' · IMF 월평균 · ' +
        legs.map(entry => link('https://fred.stlouisfed.org/series/', entry.ref, 'FRED ' + entry.ref)).join(' · ') + (!stale && updated() ? ' · ' + updated() : '') + '</p>');
      drawn += 1;
    }
  } catch (err) {
    console.error('term spreads: Brent − Dubai not drawn', err);
    none('grade-spread-data', []);
  }

  // The terms and the basis of reading, folded shut, under whichever half drew.
  fill('term-spreads-basis', !drawn ? '' : '<details class="method"><summary>용어·해석 기준</summary>' +
    '<p>백워데이션은 근월물이 원월물보다 비싼 구조이고, 콘탱고는 근월물이 원월물보다 싼 구조다.</p>' +
    '<p>M1 − M2에는 수급 기대와 재고, 보유비용, 실물 인도 일정이 함께 들어가 있어 변화 전부를 공급 부족의 크기로 환산할 수 없다.</p>' +
    '<p>Brent − Dubai는 황 함량·밀도·제품 수율과 정유소의 조달 대안이 반영되는 유종 가격차다.</p></details>');
})();
