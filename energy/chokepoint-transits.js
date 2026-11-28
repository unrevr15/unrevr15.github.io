'use strict';
// 해협별 유조선 통과 척수 (원유 › 공급·회복, #chokepoint-transits) and the BWET line under the TD3C bars
// of #shipping (원유 › 운임·선박). Two parts of window.ENERGY_LIVE:
//   shipping     IMF PortWatch daily chokepoint transits (backend/app/etl/external/chokepoint_transits.py):
//                per chokepoint, weekly means since 2019 ([monday, tankers a day, tons a day, days],
//                Monday to Sunday), complete-quarter means and the newest 120 days one by one.
//   series.bwet  Breakwave Tanker Shipping ETF (energy_live.py): weekly means of its closes since its
//                first week ([friday, mean]) and the last close with its comparison points.
// index.html holds the section's heading and empty hosts, and the empty BWET host under #vlcc-plot.
// Tiles and line charts come first; the reading conditions and the tables are folded shut. Every
// number is computed here from the payload; no sentence carries a figure of it.
//
// The arithmetic is in the functions below, outside the drawing code, so test_energy_chokepoints.py
// runs it in node. Without the payload, or on any error, the section is the one line '자료 없음' and
// the BWET host stays empty. The public Pages copy has neither the section nor the payload key
// (backend/app/static_site/public_scope.py for live-data.js, pages.build_tree for data/energy-live.json):
// there the script draws the BWET line only. The payload
// is read from window.ENERGY_LIVE, not from energyLive, so a failure of live.js does not take the
// section with it. Loaded after d3, live-data.js, market-expansion.js (marketTable, exactData) and
// reference-data.js (energyReference).

// [payload key, row name of the EIA chokepoint table in reference-data.js]
const CP_POINTS = [['hormuz', '호르무즈'], ['bab_el_mandeb', '바브엘만데브'], ['cape', '희망봉']];
// The years whose same-week range is the band, and the first day the charts draw.
const CP_BAND_YEARS = [2019, 2025];
const CP_CHART_FROM = '2023-01-01';
const CP_EIA_TABLE = 'chokepoint-oil-transit-4q25-2q26';

function cpNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}
// 'YYYY-MM-DD' → that day at UTC midnight, or null for anything that is not a calendar day.
function cpDate(iso) {
  if (typeof iso !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const day = new Date(iso + 'T00:00:00Z');
  return Number.isNaN(day.getTime()) || day.toISOString().slice(0, 10) !== iso ? null : day;
}
// The day `days` after `iso` (before it, when negative).
function cpShift(iso, days) {
  const day = cpDate(iso);
  if (!day) return null;
  day.setUTCDate(day.getUTCDate() + days);
  return day.toISOString().slice(0, 10);
}
// [ISO year, ISO week] of a day: the week of the Thursday of its Monday-Sunday week.
function cpIsoWeek(iso) {
  const day = cpDate(iso);
  if (!day) return null;
  const thursday = new Date(day);
  thursday.setUTCDate(day.getUTCDate() + 3 - (day.getUTCDay() + 6) % 7);
  const year = thursday.getUTCFullYear();
  return [year, Math.floor((thursday - Date.UTC(year, 0, 1)) / 864e5 / 7) + 1];
}
// [[monday, tankers a day, tons a day, days], …] → Map by Monday, oldest first: {n, cap, days}. A row
// that is not a Monday with a count of zero or more is dropped; a missing tonnage is null.
function cpWeekly(points) {
  const rows = [];
  for (const row of Array.isArray(points) ? points : []) {
    if (!Array.isArray(row) || !cpNumber(row[1])) continue;
    const day = cpDate(row[0]);
    if (!day || day.getUTCDay() !== 1) continue;
    rows.push([row[0], {n: row[1], cap: cpNumber(row[2]) ? row[2] : null, days: Number.isInteger(row[3]) ? row[3] : null}]);
  }
  return new Map(rows.sort((a, b) => a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
}
// The range of the band years' weekly means in each ISO week: Map week → {lo, avg, hi, years}. A week
// needs `need` of the years; week 53 (2020 alone among them) is left to cpBandAt.
function cpBand(weekly, from = CP_BAND_YEARS[0], to = CP_BAND_YEARS[1], need = 5) {
  const byWeek = new Map();
  for (const [monday, {n}] of weekly instanceof Map ? weekly : []) {
    const [year, week] = cpIsoWeek(monday);
    if (year < from || year > to) continue;
    if (!byWeek.has(week)) byWeek.set(week, []);
    byWeek.get(week).push(n);
  }
  const band = new Map();
  for (const [week, values] of byWeek) {
    if (values.length >= need) band.set(week, {lo: Math.min(...values), avg: values.reduce((sum, v) => sum + v, 0) / values.length,
      hi: Math.max(...values), years: values.length});
  }
  return band;
}
// The band of the ISO week a Monday falls in; week 53 takes week 52's.
function cpBandAt(band, monday) {
  const week = cpIsoWeek(monday);
  if (!week || !(band instanceof Map)) return null;
  return band.get(week[1]) || (week[1] === 53 ? band.get(52) || null : null);
}
// The weekly mean against the one `weeks` weeks before: {diff in tankers a day, pct (null from zero)}.
// null when either week is missing.
function cpChange(weekly, monday, weeks) {
  const before = cpShift(monday, -7 * weeks);
  if (!(weekly instanceof Map) || !weekly.has(monday) || !weekly.has(before)) return null;
  const now = weekly.get(monday).n, then = weekly.get(before).n;
  return {diff: now - then, pct: then > 0 ? (now / then - 1) * 100 : null};
}
// Percent against the band years' mean of the same week; null without a band or from zero.
function cpVsBand(weekly, band, monday) {
  const ref = cpBandAt(band, monday);
  if (!ref || !(ref.avg > 0) || !(weekly instanceof Map) || !weekly.has(monday)) return null;
  return (weekly.get(monday).n / ref.avg - 1) * 100;
}
// Tons a tanker: the tonnage over the count, null without either or from zero tankers.
function cpPerShip(cap, n) {
  return cpNumber(cap) && cpNumber(n) && n > 0 ? cap / n : null;
}
// [[day, tankers, tons], …] → Map by day, oldest first: {n, cap, avg7}. avg7 is the mean of the day and
// the six before it, null unless all seven are there.
function cpDaily(points) {
  const days = new Map();
  for (const row of Array.isArray(points) ? points : []) {
    if (Array.isArray(row) && cpDate(row[0]) && cpNumber(row[1])) days.set(row[0], {n: row[1], cap: cpNumber(row[2]) ? row[2] : null});
  }
  const out = new Map([...days].sort((a, b) => a[0] < b[0] ? -1 : 1));
  for (const [day, value] of out) {
    const week = Array.from({length: 7}, (_, i) => out.get(cpShift(day, -i)));
    value.avg7 = week.every(Boolean) ? week.reduce((sum, v) => sum + v.n, 0) / 7 : null;
  }
  return out;
}
// [['YYYYQn', tankers a day, tons a day, days], …] → Map by quarter: {n, cap, days}.
function cpQuarterly(points) {
  const out = new Map();
  for (const row of Array.isArray(points) ? points : []) {
    if (Array.isArray(row) && /^\d{4}Q[1-4]$/.test(row[0]) && cpNumber(row[1])) {
      out.set(row[0], {n: row[1], cap: cpNumber(row[2]) ? row[2] : null, days: Number.isInteger(row[3]) ? row[3] : null});
    }
  }
  return out;
}
// 'YYYYQn' of an EIA column head such as '4Q25', or null.
function cpQuarterOf(head) {
  const m = /^([1-4])Q(\d{2})$/.exec(String(head));
  return m ? '20' + m[2] + 'Q' + m[1] : null;
}
// The EIA chokepoint table of reference-data.js: {heads, quarters, rows: Map name → [first, second]}, or
// null when the table is not there or its two columns are not quarters.
function cpEia(reference) {
  const sets = reference && Array.isArray(reference.datasets) ? reference.datasets : [];
  const table = sets.find(set => set && set.id === CP_EIA_TABLE);
  if (!table || !Array.isArray(table.columns) || !Array.isArray(table.rows)) return null;
  const heads = table.columns.slice(1, 3);
  const quarters = heads.map(cpQuarterOf);
  if (quarters.length !== 2 || quarters.some(quarter => !quarter)) return null;
  const rows = new Map(table.rows.filter(row => Array.isArray(row) && typeof row[0] === 'string' && cpNumber(row[1]) && cpNumber(row[2]))
    .map(row => [row[0], [row[1], row[2]]]));
  return {heads, quarters, rows, unit: String(table.unit || ''), published: String(table.published || '')};
}
// Percent change from `then` to `now`; null from zero or without either.
function cpPct(then, now) {
  return cpNumber(then) && cpNumber(now) && then > 0 ? (now / then - 1) * 100 : null;
}

(() => {
  const NONE = '<p class="note">자료 없음</p>';
  const HOSTS = ['chokepoint-transits-data', 'chokepoint-transits-charts', 'chokepoint-transits-basis'];
  const host = id => document.getElementById(id);
  const live = window.ENERGY_LIVE;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  // A number is printed from its rounded value, so the sign and the colour follow what is shown.
  const shown = (value, digits) => Number(value.toFixed(digits));
  const fmt = (value, digits = 0) => value === null || value === undefined || !Number.isFinite(value) ? '—' : (shown(value, digits) < 0 ? '−' : '') +
    Math.abs(shown(value, digits)).toLocaleString('en-US', {minimumFractionDigits: digits, maximumFractionDigits: digits});
  const signed = (value, digits = 0) => (shown(value, digits) > 0 ? '+' : '') + fmt(value, digits);
  const tone = (value, digits = 0) => shown(value, digits) > 0 ? 'live-up' : shown(value, digits) < 0 ? 'live-down' : '';
  const delta = (change, digits = 0, unit = '') => change === null || change === undefined || !Number.isFinite(change) ? '—'
    : '<span class="' + tone(change, digits) + '">' + signed(change, digits) + unit + '</span>';
  const dot = iso => String(iso).replaceAll('-', '.');
  // A Monday-keyed week as '2026.11.09~11.15'.
  const weekOf = monday => dot(monday) + '~' + dot(cpShift(monday, 6)).slice(5);
  const out = url => ' target="_blank" rel="noopener noreferrer" href="' + url + '"';
  const updated = stamp => {
    const at = new Date(stamp);
    if (!stamp || Number.isNaN(at.getTime())) return '';
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false}).formatToParts(at).map(({type, value}) => [type, value]));
    return '갱신 ' + p.year + '.' + p.month + '.' + p.day + ' ' + p.hour + ':' + p.minute + ' KST';
  };
  const tile = (name, value, unit, lines) => '<div class="ra-tile"><span class="ra-name">' + name + '</span><span class="ra-val">' + value +
    '<small>' + unit + '</small></span>' + lines.map(items => '<span class="ra-meta">' + items.map(item => '<span>' + item + '</span>').join(' · ') + '</span>').join('') + '</div>';
  const COLOR = '#256aa8';
  const BAND = CP_BAND_YEARS[0] + '~' + CP_BAND_YEARS[1] + '년';

  // ---- 해협별 유조선 통과 척수 ------------------------------------------------------
  const none = () => HOSTS.forEach((id, i) => { const el = host(id); if (el) el.innerHTML = i ? '' : NONE; });
  try {
    if (HOSTS.every(host)) section();
  } catch (err) {
    console.error('chokepoint transits: section not drawn', err);
    none();
  }

  // ---- BWET under the TD3C bars ------------------------------------------------------
  try {
    if (host('bwet-freight')) bwet();
  } catch (err) {
    console.error('chokepoint transits: BWET line not drawn', err);
    host('bwet-freight').innerHTML = '';
  }

  function section() {
    const shipping = live && live.shipping && live.shipping.ok === true && live.shipping.chokepoints &&
      typeof live.shipping.chokepoints === 'object' ? live.shipping : null;
    const points = CP_POINTS.map(([key, eiaName]) => {
      const entry = shipping ? shipping.chokepoints[key] : null;
      if (!entry || typeof entry !== 'object') return null;
      const weekly = cpWeekly(entry.weekly);
      if (!weekly.size) return null;
      return {key, eiaName, label: String(entry.label || key), weekly, band: cpBand(weekly), daily: cpDaily(entry.daily),
        quarterly: cpQuarterly(entry.quarterly), last: [...weekly.keys()].at(-1)};
    }).filter(Boolean);
    if (!points.length) { none(); return; }

    // ---- tiles: the newest week of each chokepoint ------------------------------------
    const tiles = points.map(({label, weekly, band, last}) => {
      const change = cpChange(weekly, last, 4), ref = cpBandAt(band, last);
      return tile(esc(label) + ' · 유조선', fmt(weekly.get(last).n, 1), '척/일',
        [['<time datetime="' + esc(last) + '">' + esc(weekOf(last)) + '</time> 주 평균'],
         ['4주 전 대비 ' + delta(change && change.diff, 1, '척'),
          BAND + ' 같은 주 평균' + (ref ? ' ' + fmt(ref.avg, 1) + '척' : '') + ' 대비 ' + delta(cpVsBand(weekly, band, last), 0, '%')]]);
    });

    // ---- charts: weekly means since CP_CHART_FROM over the band years' range ---------------------
    const charts = host('chokepoint-transits-charts');
    charts.innerHTML = '';
    const drawn = points.map(({label, weekly, band}) => {
      const rows = [...weekly].filter(([monday]) => monday >= CP_CHART_FROM).map(([monday, {n}]) => {
        const ref = cpBandAt(band, monday);
        return [monday, n, ref ? ref.lo : null, ref ? ref.hi : null];
      });
      return rows.length ? [label, rows] : null;
    }).filter(Boolean);

    // ---- folds -------------------------------------------------------------------------
    const ieaRef = '<a class="ref" href="#s-ais">[IEA]</a>';
    const conditions = marketTable(['항목', '해석 기준'], [
      ['집계 대상', 'PortWatch가 위성으로 받은 선박 AIS 신호로 센 해협 통과 선박 가운데 유조선 범주다. 선형 크기를 나누지 않아 VLCC만의 척수는 이 자료로 셀 수 없고, 통과 방향과 적재·공선 여부도 나뉘지 않는다.'],
      ['하한', 'AIS를 끄고 지나는 유조선은 집계에 들지 않아 척수는 실제 통과의 하한이다. IEA는 중동 해협에서 AIS를 끄고 지나는 유조선의 비중이 크고 늘고 있다고 본다. ' + ieaRef],
      ['갱신과 개정', 'PortWatch는 매주 화요일 오전 9시(미 동부)에 갱신한다. 최근 며칠 값이 다음 갱신에서 바뀔 수 있어 대시보드는 갱신마다 최신 관측일 전 35일부터 다시 받아 덮어쓴다.'],
      ['통과 물동량', 'PortWatch가 통과 선박 신호로 추정한 물동량(미터톤)이다. 적재 상태를 어떻게 반영했는지는 미확인이다. 척당 물동량은 물동량을 척수로 나눈 계산 값이다.'],
      ['비교 기준', '띠는 ' + BAND + ' 각 해의 같은 ISO 주(월~일) 주간 평균의 최소~최대다. 타일의 기준 대비 변화율은 같은 주 ' + BAND + ' 평균과 비교한다.']
    ], 'text-table');
    const folds = ['<details class="method"><summary>해석 기준</summary>' + conditions + '</details>'];

    const eia = cpEia(typeof energyReference === 'undefined' ? null : energyReference);
    if (eia) {
      const rows = points.filter(({eiaName}) => eia.rows.has(eiaName)).map(({label, eiaName, quarterly}) => {
        const [a, b] = eia.quarters.map(quarter => quarterly.has(quarter) ? quarterly.get(quarter).n : null);
        const [fa, fb] = eia.rows.get(eiaName);
        return [esc(label), fmt(a, 1), fmt(b, 1), delta(cpPct(a, b), 0, '%'), fmt(fa, 1), fmt(fb, 1), delta(cpPct(fa, fb), 0, '%')];
      });
      if (rows.length) {
        folds.push(exactData('<div class="table-scroll">' + marketTable(['해협', esc(eia.heads[0]) + ' 유조선<small>척/일</small>', esc(eia.heads[1]) + ' 유조선<small>척/일</small>', '척수 변화',
          'EIA ' + esc(eia.heads[0]) + '<small>' + esc(eia.unit) + '</small>', 'EIA ' + esc(eia.heads[1]) + '<small>' + esc(eia.unit) + '</small>', '유량 변화'], rows, 'ra-table') + '</div>' +
          '<p class="note">척수는 분기 일평균이고, EIA 값은 원유·석유계 액체의 관측 통과량이다(' + (cpDate(eia.published) ? dot(eia.published) + ' 공표, ' : '') +
          '<a href="#ref-chokepoints">해협·우회로별 석유 통과량</a>). 단위가 달라 변화율만 나란히 둔다.</p>', 'EIA 분기 통과량과 같은 분기 척수'));
      }
    }

    const weeks = 12;
    const weekTables = points.map(({label, weekly, band}) => {
      const rows = [...weekly].slice(-weeks).reverse().map(([monday, {n, cap}]) => {
        const ref = cpBandAt(band, monday), per = cpPerShip(cap, n);
        return [esc(weekOf(monday)), fmt(n, 1), cap === null ? '—' : fmt(cap / 1000, 0), per === null ? '—' : fmt(per / 1000, 1),
          ref ? fmt(ref.lo, 1) + '~' + fmt(ref.hi, 1) : '—'];
      });
      return '<div class="table-scroll ra-months">' + marketTable([esc(label), '유조선<small>척/일</small>', '통과 물동량<small>천 톤/일</small>', '척당 물동량<small>천 톤</small>',
        BAND + ' 같은 주<small>척/일</small>'], rows, 'ra-table') + '</div>';
    });
    folds.push('<details class="method"><summary>주간 수치 · 최근 ' + weeks + '주</summary>' + weekTables.join('') + '</details>');

    const lastDay = points.map(({daily}) => [...daily.keys()].at(-1)).filter(Boolean).sort().at(-1);
    if (lastDay) {
      const days = Array.from({length: 28}, (_, i) => cpShift(lastDay, -i));
      const cells = days.map(day => [esc(dot(day)), ...points.flatMap(({daily}) => {
        const value = daily.get(day);
        return value ? [fmt(value.n, 0), fmt(value.avg7, 1)] : ['—', '—'];
      })]);
      folds.push('<details class="method"><summary>일별 수치 · 최근 28일</summary><div class="table-scroll ra-months">' +
        marketTable(['날짜', ...points.flatMap(({label}) => [esc(label) + '<small>척</small>', '7일 평균<small>척/일</small>'])], cells, 'ra-table') + '</div></details>');
    }

    // ---- notes ---------------------------------------------------------------------------
    const latest = points.map(({daily, last}) => [...daily.keys()].at(-1) || cpShift(last, 6)).sort().at(-1);
    const stale = shipping.stale === true;
    const notes = '<p class="note">척수는 AIS를 켜고 지난 유조선만 센 하한이다. ' + ieaRef + '</p>' +
      '<p class="note">최근 며칠 값은 다음 주 PortWatch 갱신에서 바뀔 수 있다.</p>' +
      '<p class="note">유조선 크기는 구분하지 않는다. VLCC만의 척수와 적재·공선 여부는 이 자료로 알 수 없다.</p>' +
      (stale ? '<p class="note">최신 관측일 ' + esc(dot(latest)) + ' 뒤로 3주 넘게 새 값이 없다.</p>' : '') +
      '<p class="note context-caption"><a' + out('https://portwatch.imf.org/datasets/imf-dataviz::daily-chokepoints-data') + '>IMF PortWatch 일별 해협 통과</a>' +
      ' · 최신 관측 ' + esc(dot(latest)) + (updated(shipping.fetched_at) && ' · ' + updated(shipping.fetched_at)) +
      (shipping.carried === true ? ' · 이번 갱신에서 PortWatch 응답을 받지 못해 이전에 받은 값이다' : '') + '</p>';

    // ---- the page ----------------------------------------------------------------------
    host('chokepoint-transits-data').innerHTML = '<div class="ra-tiles">' + tiles.join('') + '</div>';
    drawn.forEach(([label, rows]) => weekChart(charts, {title: label, unit: '유조선 척/일 · 주간 평균', digits: 1, rows,
      label: '유조선', band: BAND + ' 범위', span: weekOf}));
    host('chokepoint-transits-basis').innerHTML = notes + folds.join('');
    if (host('chokepoint-transits-asof')) host('chokepoint-transits-asof').innerHTML = '최신 <time datetime="' + esc(latest) + '">' + esc(dot(latest)) + '</time> · 주간 · IMF PortWatch';
  }

  function bwet() {
    const entry = live && live.ok === true && live.series && live.series.bwet && typeof live.series.bwet === 'object' ? live.series.bwet : null;
    const rows = (entry && Array.isArray(entry.weekly) ? entry.weekly : [])
      .filter(row => Array.isArray(row) && cpDate(row[0]) && cpNumber(row[1]) && row[1] > 0).map(row => [row[0], row[1], null, null]);
    if (!rows.length || !entry.last || !cpNumber(entry.last.value)) { host('bwet-freight').innerHTML = ''; return; }
    const change = (then, span) => then && cpNumber(then.value) ? span + ' ' + delta(cpPct(then.value, entry.last.value), 0, '%') : null;
    const target = host('bwet-freight');
    target.innerHTML = '<p class="note">' + ['종가 ' + fmt(entry.last.value, 2) + '달러(<time datetime="' + esc(entry.last.date) + '">' + esc(dot(entry.last.date)) + '</time>)',
      change(entry.m1, '1개월'), change(entry.y1, '전년비'), entry.carried === true && '이번 갱신에서 받지 못해 이전 값을 유지했다'].filter(Boolean).join(' · ') + '</p>';
    weekChart(target, {title: '탱커 운임선물 ETF (BWET)', unit: '달러 · 주간 평균 종가 · 로그 축', digits: 2, rows, label: '주 평균', span: dot, log: true});
    target.insertAdjacentHTML('beforeend', '<p class="note">BWET는 TD3C(VLCC, 중동 걸프 → 중국) 운임선물 90%와 TD20(수에즈맥스, 나이지리아 → 북서유럽) 10%로 짠 지수를 따르는 ETF다. ' +
      '선물 가격이어서 위 막대의 현물 일일 환산수익과 다르고 만기 교체 효과가 섞인다. 지수 비중은 해마다 다시 정하고, 보유 선물의 가중 평균 만기는 출처마다 달라 미확인이다. ' +
      '<a' + out('https://finance.yahoo.com/quote/BWET') + '>Yahoo BWET</a> · <a' + out('https://amplifyetfs.com/bwet/') + '>Amplify ETFs</a></p>');
  }

  // One line chart over weeks: its title and unit, a readout that is also the legend (the newest week
  // when nothing is picked), and the plot. rows: [[week key, value, band low, band high], …] (a null
  // band leaves the band out there). `log` draws the values on a log axis.
  function weekChart(parent, {title, unit, digits, rows, label, band, span, log}) {
    const tail = rows.length - 1;
    const figure = document.createElement('figure');
    figure.className = 'ra-chart';
    const head = document.createElement('div');
    head.className = 'ra-head';
    head.innerHTML = '<h3>' + esc(title) + '</h3><span class="ra-unit">' + esc(unit) + '</span>';
    const read = document.createElement('p');
    read.className = 'ra-read';
    read.setAttribute('aria-live', 'polite');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'ra-plot');
    svg.setAttribute('role', 'img');
    svg.setAttribute('tabindex', '0');
    svg.setAttribute('aria-label', title + ' · ' + unit + ' · ' + span(rows[0][0]) + '~' + span(rows[tail][0]) + ' · ' + span(rows[tail][0]) + ' ' +
      label + ' ' + fmt(rows[tail][1], digits));
    figure.append(head, read, svg);
    parent.append(figure);
    let picked = null, place = () => {};
    const show = () => {
      const row = rows[picked ?? tail];
      read.innerHTML = '<time datetime="' + esc(row[0]) + '">' + esc(span(row[0])) + '</time>' +
        '<span><i style="background:' + COLOR + '"></i>' + esc(label) + '<b>' + fmt(row[1], digits) + '</b></span>' +
        (band ? '<span><i class="insight-range"></i>' + esc(band) + '<b>' + (row[2] === null ? '—' : fmt(row[2], digits) + '~' + fmt(row[3], digits)) + '</b></span>' : '');
      place();
    };
    const draw = () => {
      const width = svg.clientWidth, height = svg.clientHeight;
      if (!width || !height) return;
      const m = {left: 40, right: 12, top: 8, bottom: 20};
      const plot = d3.select(svg).attr('viewBox', '0 0 ' + width + ' ' + height);
      plot.selectAll('*').remove();
      const keys = rows.map(row => row[0]);
      const x = d3.scalePoint(keys, [m.left, width - m.right]);
      const values = rows.flatMap(row => row.slice(1)).filter(value => value !== null);
      let y, ticks;
      if (log) {
        const [low, high] = [Math.min(...values), Math.max(...values)];
        y = d3.scaleLog(low < high ? [low, high] : [low / 2, high * 2], [height - m.bottom, m.top]);
        const [lo, hi] = y.domain(), steps = [];
        for (let p = Math.floor(Math.log10(lo)); p <= Math.ceil(Math.log10(hi)); p++) [1, 2, 5].forEach(k => steps.push(k * 10 ** p));
        ticks = steps.filter(value => value >= lo && value <= hi);
        if (ticks.length > 6) ticks = ticks.filter(value => /^1/.test(String(value)));
      } else {
        y = d3.scaleLinear([0, Math.max(1, ...values)], [height - m.bottom, m.top]).nice(4);
        ticks = y.ticks(4);
      }
      plot.append('g').selectAll('line').data(ticks).join('line').attr('class', 'trend-grid')
        .attr('x1', m.left).attr('x2', width - m.right).attr('y1', value => y(value)).attr('y2', value => y(value));
      plot.append('g').attr('class', 'trend-axis').attr('transform', 'translate(' + m.left + ',0)')
        .call(d3.axisLeft(y).tickValues(ticks).tickSize(0).tickPadding(5).tickFormat(value => fmt(value, value > 0 && value < 1 ? 1 : 0)));
      // A tick at the first week of each year; where a year takes less than 36px, every other one.
      const firsts = keys.filter((key, i) => i && key.slice(0, 4) !== keys[i - 1].slice(0, 4));
      const every = firsts.length > 1 && x(firsts[1]) - x(firsts[0]) < 36 ? 2 : 1;
      const marks = firsts.length ? firsts.filter((_, i) => (firsts.length - 1 - i) % every === 0) : [keys[0]];
      plot.append('g').attr('class', 'trend-axis').attr('transform', 'translate(0,' + (height - m.bottom) + ')')
        .call(d3.axisBottom(x).tickValues(marks).tickSize(0).tickPadding(6).tickFormat(key => key.slice(0, 4)));
      if (band) {
        plot.append('path').datum(rows).attr('class', 'insight-range')
          .attr('d', d3.area().defined(row => row[2] !== null).x(row => x(row[0])).y0(row => y(row[2])).y1(row => y(row[3])));
      }
      plot.append('path').datum(rows).attr('fill', 'none').attr('stroke', COLOR).attr('stroke-width', 1.8)
        .attr('stroke-linejoin', 'round').attr('stroke-linecap', 'round')
        .attr('d', d3.line().x(row => x(row[0])).y(row => y(row[1])));
      plot.append('circle').attr('cx', x(rows[tail][0])).attr('cy', y(rows[tail][1])).attr('r', 3.5).attr('fill', COLOR).attr('stroke', '#fff').attr('stroke-width', 1.5);
      const cursor = plot.append('g').attr('class', 'ra-cursor').attr('display', 'none');
      cursor.append('line').attr('y1', m.top).attr('y2', height - m.bottom);
      cursor.append('circle').attr('r', 3.5).attr('fill', COLOR).attr('stroke', '#fff').attr('stroke-width', 1.5);
      place = () => {
        cursor.attr('display', picked === null ? 'none' : null);
        if (picked === null) return;
        const row = rows[picked];
        cursor.select('line').attr('x1', x(row[0])).attr('x2', x(row[0]));
        cursor.select('circle').attr('cx', x(row[0])).attr('cy', y(row[1]));
      };
      // The week nearest the pointer; a tap picks one too.
      svg.onpointermove = svg.onpointerdown = event => {
        const step = x.step() || 1;
        picked = Math.max(0, Math.min(tail, Math.round((event.clientX - svg.getBoundingClientRect().left - m.left) / step)));
        show();
      };
      place();
    };
    // A mouse that leaves the plot drops the week. A tapped one stays until a tap elsewhere, and one
    // reached with the keys until the plot loses focus.
    const drop = () => { if (picked !== null) { picked = null; show(); } };
    svg.onpointerleave = event => { if (event.pointerType === 'mouse') drop(); };
    svg.addEventListener('blur', drop);
    document.addEventListener('pointerdown', event => { if (!svg.contains(event.target)) drop(); });
    svg.addEventListener('keydown', event => {
      const move = {ArrowLeft: -1, ArrowRight: 1, Home: -rows.length, End: rows.length}[event.key];
      if (!move) return;
      event.preventDefault();
      picked = Math.max(0, Math.min(tail, (picked ?? tail) + move));
      show();
    });
    new ResizeObserver(draw).observe(svg);
    draw();
    show();
  }
})();
