'use strict';
// 미국 가동 리그와 시추 생산성 (원유 › 생산·투자, #rig-activity). Two monthly sections of
// window.ENERGY_LIVE.supply (backend/app/etl/external/energy_supply.py):
//   us_rigs      EIA rotary rigs in operation: crude oil, natural gas, total, onshore, offshore.
//                EIA republishes the Baker Hughes weekly counts as 4- or 5-week averages.
//   us_drilling  EIA Short-Term Energy Outlook table 10a by region: rigs, wells drilled and
//                completed, drilled but uncompleted wells (DUC), crude oil from newly completed
//                wells (and per rig) and the change of existing wells' production.
// index.html holds the section's heading and empty hosts. Tiles and line charts come first; the
// reading conditions and the tables are folded shut. Every number is computed here from the
// payload; no sentence carries a figure of it.
//
// The arithmetic is in the functions below, outside the drawing code, so test_energy_rigs.py runs
// it in node. The section builds its markup before it touches the page. Without the payload, with
// a snapshot from before these sections existed, or on any error it is the one line '자료 없음';
// when only one of the two sources is there, that one is drawn and the other is named as missing.
// The payload is read from window.ENERGY_LIVE, not from energyLive, so a failure of live.js does
// not take the section with it. Loaded after d3 and market-expansion.js (marketTable, exactData).

// 'YYYY-MM' n months earlier.
function rigMonthBack(month, n) {
  const index = Number(String(month).slice(0, 4)) * 12 + Number(String(month).slice(5, 7)) - 1 - n;
  return Math.floor(index / 12) + '-' + String(index % 12 + 1).padStart(2, '0');
}
// [[YYYY-MM, value], …] → Map by month. A row that is not a month key with a finite number is
// dropped; so is a number below zero unless the series is a change (signed).
function rigMonthly(points, signed) {
  const monthly = new Map();
  for (const row of Array.isArray(points) ? points : []) {
    if (!Array.isArray(row) || !/^\d{4}-(0[1-9]|1[0-2])$/.test(row[0])) continue;
    if (typeof row[1] !== 'number' || !Number.isFinite(row[1]) || (!signed && row[1] < 0)) continue;
    monthly.set(row[0], row[1]);
  }
  return monthly;
}
// Newest month of a series, or null.
function rigLatest(monthly) {
  return monthly instanceof Map && monthly.size ? [...monthly.keys()].sort().at(-1) : null;
}
// Change over n months (1 전월 대비, 12 전년 대비) by month key, in the unit of the series. null
// when either month is missing: the observation before a gap is not the month before, and would
// print a two-month change as 전월 대비.
function rigChange(monthly, month, n) {
  const earlier = rigMonthBack(month, n);
  if (!(monthly instanceof Map) || !monthly.has(month) || !monthly.has(earlier)) return null;
  return monthly.get(month) - monthly.get(earlier);
}
// The `count` calendar months that end at `end`, oldest first: [[month, value or null], …]. A
// month the series lacks stays in as null, so a chart breaks its line there and a table leaves
// the cell empty.
function rigWindow(monthly, end, count) {
  return Array.from({length: Math.max(0, count)}, (_, i) => {
    const month = rigMonthBack(end, count - 1 - i);
    return [month, monthly instanceof Map && monthly.has(month) ? monthly.get(month) : null];
  });
}
// One metric of the drilling section as a Map by month: a region's own series or, with no region,
// the sum over every region the section lists. A month enters the sum only when all of them have
// a value in it: a sum short of a region would read as a fall.
function drillingSeries(drilling, metric, region) {
  const months = drilling && Array.isArray(drilling.months) ? drilling.months : [];
  const rows = drilling && drilling.data && typeof drilling.data === 'object' ? drilling.data[metric] : null;
  const one = code => rigMonthly(months.map((month, i) => [month, rows && Array.isArray(rows[code]) ? rows[code][i] : null]),
    metric === 'oil_existing');
  if (region) return one(region);
  const parts = Object.keys(drilling && drilling.regions && typeof drilling.regions === 'object' ? drilling.regions : {}).map(one);
  const sum = new Map();
  for (const month of parts.length ? months : []) {
    if (parts.every(part => part.has(month))) sum.set(month, parts.reduce((total, part) => total + part.get(month), 0));
  }
  return sum;
}
// 신규 유정이 더한 생산 + 기존 유정의 생산 변화 = 순변화, by month, on the two values as they are
// printed (one decimal), so the three figures of a row add up on the page.
function drillingNet(added, existing) {
  const shown = value => Number(value.toFixed(1));
  const net = new Map();
  if (!(added instanceof Map) || !(existing instanceof Map)) return net;
  for (const [month, value] of added) {
    if (existing.has(month)) net.set(month, shown(shown(value) + shown(existing.get(month))));
  }
  return net;
}

(() => {
  const NONE = '<p class="note">자료 없음</p>';
  const HOSTS = ['rig-activity-data', 'rig-activity-charts', 'rig-activity-basis'];
  const host = id => document.getElementById(id);
  const none = () => HOSTS.forEach((id, i) => { const el = host(id); if (el) el.innerHTML = i ? '' : NONE; });
  try {
    const live = window.ENERGY_LIVE;
    const supply = live && live.supply && live.supply.ok === true ? live.supply : null;
    if (!HOSTS.every(host)) return;
    const esc = value => String(value ?? '').replace(/[&<>"']/g, c =>
      ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    // A number is printed from its rounded value, so the sign and the colour follow what is shown.
    const shown = (value, digits) => Number(value.toFixed(digits));
    const fmt = (value, digits = 0) => value === null ? '—' : (shown(value, digits) < 0 ? '−' : '') +
      Math.abs(shown(value, digits)).toLocaleString('en-US', {minimumFractionDigits: digits, maximumFractionDigits: digits});
    const signed = (value, digits = 0) => (shown(value, digits) > 0 ? '+' : '') + fmt(value, digits);
    const tone = (value, digits = 0) => shown(value, digits) > 0 ? 'live-up' : shown(value, digits) < 0 ? 'live-down' : '';
    const delta = (change, digits = 0) => change === null ? '—' : '<span class="' + tone(change, digits) + '">' + signed(change, digits) + '</span>';
    const monthKo = month => Number(month.slice(0, 4)) + '년 ' + Number(month.slice(5, 7)) + '월';
    const monthDot = month => month.replace('-', '.');
    const time = month => '<time datetime="' + esc(month) + '">' + monthKo(month) + '</time>';
    // Calendar months from `start` to `end`, both counted.
    const span = (start, end) => (Number(end.slice(0, 4)) - Number(start.slice(0, 4))) * 12 + Number(end.slice(5, 7)) - Number(start.slice(5, 7)) + 1;
    const oldest = monthly => [...monthly.keys()].sort()[0];
    const changes = (monthly, month, digits = 0) => ['전월 대비 ' + delta(rigChange(monthly, month, 1), digits), '전년 대비 ' + delta(rigChange(monthly, month, 12), digits)];
    // lines: the items of each line under the figure. An item is not broken across two lines.
    const tile = (name, value, unit, lines) => '<div class="ra-tile"><span class="ra-name">' + name + '</span><span class="ra-val">' + value +
      '<small>' + unit + '</small></span>' + lines.map(items => '<span class="ra-meta">' + items.map(item => '<span>' + item + '</span>').join(' · ') + '</span>').join('') + '</div>';
    // Series colours: the first three of the reference charts (live.css --rf-c0..2). The total is context, a grey that still stands 3:1 off the panel.
    const COLORS = ['#256aa8', '#c2571a', '#12876f'], CONTEXT = '#7f8d9c';

    // ---- 가동 리그 수 (us_rigs) ------------------------------------------------
    const rigSource = supply && supply.us_rigs && typeof supply.us_rigs === 'object' ? supply.us_rigs : {};
    const rigs = Object.fromEntries(['oil', 'gas', 'total', 'onshore', 'offshore'].map(key =>
      [key, rigMonthly(rigSource[key] && rigSource[key].points)]));
    const rigMonth = ['oil', 'gas', 'total'].map(key => rigLatest(rigs[key])).filter(Boolean).sort().at(-1) || null;

    // ---- 시추 생산성 (us_drilling) ----------------------------------------------
    const drilling = supply && supply.us_drilling && typeof supply.us_drilling === 'object' ? supply.us_drilling : null;
    const total = Object.fromEntries(['rigs', 'drilled', 'completed', 'duc', 'oil_new', 'oil_existing'].map(key =>
      [key, drillingSeries(drilling, key)]));
    const net = drillingNet(total.oil_new, total.oil_existing);
    const regions = drilling && drilling.regions && typeof drilling.regions === 'object' ? Object.keys(drilling.regions) : [];
    // 천 배럴/일 per rig → 배럴/일 per rig.
    const perRig = code => new Map([...drillingSeries(drilling, 'oil_new_per_rig', code)].map(([month, value]) => [month, value * 1000]));
    const OIL_REGIONS = ['PM', 'BK', 'EF'].filter(code => regions.includes(code) && perRig(code).size);
    // Appalachia and Haynesville yield natural gas for the most part. Their wells are in the sums
    // of wells and DUCs that stand beside the crude oil figures, so the sums say how many are theirs.
    const GAS_REGIONS = ['AP', 'HA'].filter(code => regions.includes(code));
    // Their part of a sum, in a month the sum has (a month every region has); null without them.
    const gasPart = (metric, month) => GAS_REGIONS.length
      ? GAS_REGIONS.reduce((sum, code) => sum + drillingSeries(drilling, metric, code).get(month), 0) : null;
    const drillMonth = ['drilled', 'completed', 'duc', 'oil_new'].map(key => rigLatest(total[key])).filter(Boolean).sort().at(-1) || null;

    if (!rigMonth && !drillMonth) { none(); return; }

    // ---- tiles -----------------------------------------------------------------
    const tiles = [];
    let siteParts = false;      // the total's tile prints 육상 and 해양 under it
    for (const [key, name] of [['oil', '원유 리그'], ['gas', '가스 리그'], ['total', '전체 리그']]) {
      const month = rigLatest(rigs[key]);
      if (!month) continue;
      const sites = key !== 'total' ? [] : [['onshore', '육상'], ['offshore', '해양']].filter(([site]) => rigs[site].has(month))
        .map(([site, label]) => label + ' ' + fmt(rigs[site].get(month)));
      siteParts = siteParts || sites.length === 2;
      tiles.push(tile(name, fmt(rigs[key].get(month)), '기', [[time(month), ...sites], changes(rigs[key], month)]));
    }
    for (const [key, name] of [['drilled', '시추 유정'], ['completed', '완결 유정'], ['duc', '미완결 유정(DUC)']]) {
      const month = rigLatest(total[key]);
      if (!month) continue;
      const gas = gasPart(key, month);
      tiles.push(tile(name, fmt(total[key].get(month)), '개', [[time(month), regions.length + '개 지역 합계', ...(gas === null ? [] : ['가스 지역 ' + fmt(gas)])],
        changes(total[key], month)]));
    }
    if (OIL_REGIONS.length) {
      const code = OIL_REGIONS[0], series = perRig(code), month = rigLatest(series);
      tiles.push(tile('리그당 신규 유정 원유 생산', fmt(series.get(month)), '배럴/일', [[time(month), esc(drilling.regions[code]), '1년 추세'], changes(series, month)]));
    }
    const netMonth = rigLatest(net);
    if (netMonth) tiles.push(tile('신규·기존 유정 생산 순변화', signed(net.get(netMonth), 1), '천 배럴/일', [[time(netMonth), regions.length + '개 지역 합계', '1년 추세'],
      ['신규 유정 ' + signed(total.oil_new.get(netMonth), 1), '기존 유정 ' + signed(total.oil_existing.get(netMonth), 1)]]));

    // ---- charts ----------------------------------------------------------------
    // rows: [[month, value or null, …]] of the `count` calendar months that end at `end`.
    const matrix = (series, end, count) => {
      const windows = series.map(monthly => rigWindow(monthly, end, count));
      return windows[0].map(([month], i) => [month, ...windows.map(rowsOf => rowsOf[i][1])]);
    };
    const WINDOW = 61;          // five years and the month they are counted from
    const charts = [];
    // series: [Map, legend label, name at the line's end (none for a lone line)]
    const add = (title, unit, digits, end, count, lines, lead) => {
      const kept = lines.filter(([monthly]) => monthly.size);
      if (kept.length) charts.push({title, unit, digits, lead, rows: matrix(kept.map(([monthly]) => monthly), end, count),
        series: kept.map(([, label, short, color], i) => ({label, short, color: color || COLORS[i]}))});
    };
    const rigCount = rigMonth ? Math.min(WINDOW, span(['oil', 'gas', 'total'].filter(key => rigs[key].size).map(key => oldest(rigs[key])).sort()[0], rigMonth)) : 0;
    if (rigMonth) add('가동 리그 수', '기 · 월간 평균', 0, rigMonth, rigCount,
      [[rigs.oil, '원유', '원유'], [rigs.gas, '가스', '가스'], [rigs.total, '전체', '전체', CONTEXT]], true);
    const drillCount = drillMonth ? Math.min(WINDOW, span(drilling.months.filter(month => /^\d{4}-\d{2}$/.test(month)).sort()[0], drillMonth)) : 0;
    if (drillMonth) {
      const scope = ' · ' + regions.length + '개 지역 합계';
      // The two charts of well counts name the gas regions in place of 합계: a longer unit goes under the title on a narrow plot.
      const wells = '개 · ' + regions.length + '개 지역' + (GAS_REGIONS.length ? '(가스 지역 포함)' : ' 합계');
      add('시추 유정과 완결 유정', wells, 0, drillMonth, drillCount, [[total.drilled, '시추', '시추'], [total.completed, '완결', '완결']]);
      add('미완결 유정(DUC)', wells, 0, drillMonth, drillCount, [[total.duc, '합계', '']]);
      add('리그당 신규 유정 원유 생산', '배럴/일 · 1년 추세', 0, drillMonth, drillCount, OIL_REGIONS.map(code => [perRig(code), drilling.regions[code], drilling.regions[code]]));
      add('신규 유정 생산과 기존 유정 감소', '천 배럴/일' + scope + ' · 1년 추세', 1, drillMonth, drillCount, [[total.oil_new, '신규 유정 생산', '신규'],
        [new Map([...total.oil_existing].map(([month, value]) => [month, -value])), '기존 유정 감소', '기존']]);
    }

    // ---- folds: reading conditions, regions, months ---------------------------------
    // Three rows at most; a source's own row only while that source is drawn.
    const conditions = marketTable(['항목', '해석 기준'], [
      rigMonth && ['리그 통계의 비교 기준', '리그 수는 Baker Hughes 주간 집계를 EIA가 4주 또는 5주 평균으로 다시 실은 월간 값이다(미국 50개 주와 워싱턴 DC). 주간 집계와는 기준이 달라 한 추세로 이을 수 없고, 캐나다·북미 밖 집계는 범위가 달라 합산할 수 없다. 가동 중인 장비만 센 값이며 보유·계약·유휴·장기 계류 장비와 해양 장비의 종류(잭업·반잠수식·드릴십)별 수는 들어 있지 않다.'],
      ['리그에서 생산까지', '리그 수는 새 유정을 뚫는 활동이어서 생산량으로 환산할 수 없다. 시추한 유정을 완결하고 처리설비·배관에 연결한 뒤에 생산이 는다. 그동안 기존 유정의 생산이 줄어 신규 생산이 더해져도 전체 생산은 줄 수 있다.'],
      drillMonth && ['표 10a의 값', '신규·기존 유정 생산과 리그당 생산은 EIA가 12개월 구간으로 평활한 1년 추세여서 두 값의 합이 실제 월간 생산 증감과 다를 수 있다. 최근 6개월의 유정 자료는 EIA 추정이다. 리그당 생산은 그 달 신규 유정 생산을 두 달 전 리그 수로 나눈 값이라 DUC 완결분과 집계 시차가 들어간다.']
    ].filter(Boolean), 'text-table');
    const folds = ['<details class="method"><summary>해석 기준</summary>' + conditions + '</details>'];
    if (drillMonth) {
      const print = (series, digits, scale = 1, sign = false) => !series.has(drillMonth) ? '—' : (sign ? signed : fmt)(series.get(drillMonth) * scale, digits);
      const cell = (metric, code, digits, scale, sign) => print(drillingSeries(drilling, metric, code), digits, scale, sign);
      const sum = (key, digits, sign) => print(total[key], digits, 1, sign);
      folds.push(exactData('<div class="table-scroll">' + marketTable(['지역', '가동 리그', '시추 유정', '완결 유정', '미완결 유정', '리그당 신규 유정 원유 생산<small>배럴/일</small>', '신규 유정 생산<small>천 배럴/일</small>', '기존 유정 생산 변화<small>천 배럴/일</small>'],
        [...regions.map(code => [esc(drilling.regions[code]), cell('rigs', code, 0), cell('drilled', code, 0), cell('completed', code, 0), cell('duc', code, 0),
          cell('oil_new_per_rig', code, 0, 1000), cell('oil_new', code, 1), cell('oil_existing', code, 1, 1, true)]),
        ['합계', sum('rigs', 0), sum('drilled', 0), sum('completed', 0), sum('duc', 0), '—', sum('oil_new', 1), sum('oil_existing', 1, true)]], 'ra-table') + '</div>' +
        // A cell and the total are each rounded once from the stored values, so the printed cells need not add up to the printed total.
        '<p class="note">지역은 EIA 표의 구분이고 알래스카와 멕시코만 해상은 들지 않는다.' +
        (GAS_REGIONS.length ? ' 가스가 주로 나는 ' + GAS_REGIONS.map(code => esc(drilling.regions[code])).join('·') + '(가스 지역)도 유정 수와 미완결 유정의 합계에 들어 있다.' : '') +
        ' 합계는 반올림 전 값을 더한 것이어서 표의 지역 값을 더한 수와 끝자리가 다를 수 있다.</p>', '지역별 ' + monthKo(drillMonth)));
    }
    const monthTables = [];
    if (rigMonth) {
      const cols = [['oil', '원유'], ['gas', '가스'], ['total', '전체'], ['onshore', '육상'], ['offshore', '해양']].filter(([key]) => rigs[key].size);
      monthTables.push('<div class="table-scroll ra-months">' + marketTable(['가동 리그 · 기', ...cols.map(([, label]) => label)],
        matrix(cols.map(([key]) => rigs[key]), rigMonth, rigCount).reverse().map(([month, ...values]) => [esc(monthDot(month)), ...values.map(value => fmt(value))]), 'ra-table') + '</div>' +
        (['oil', 'gas', 'total'].every(key => rigs[key].size) ? '<p class="note">전체에는 원유·가스로 나뉘지 않은 리그도 들어 있어 두 수의 합과 다를 수 있다.</p>' : ''));
    }
    if (drillMonth) {
      // [series, column head, digits, printed with its sign]
      const cols = [[total.drilled, '시추 유정', 0], [total.completed, '완결 유정', 0], [total.duc, '미완결 유정', 0],
        [total.oil_new, '신규 유정 생산<small>천 배럴/일</small>', 1], [total.oil_existing, '기존 유정 생산 변화<small>천 배럴/일</small>', 1, true],
        [net, '순변화<small>천 배럴/일</small>', 1, true]];
      monthTables.push('<div class="table-scroll ra-months">' + marketTable([regions.length + '개 지역 합계', ...cols.map(([, label]) => label)],
        matrix(cols.map(([series]) => series), drillMonth, drillCount).reverse().map(([month, ...values]) => [esc(monthDot(month)),
          ...values.map((value, i) => cols[i][3] && value !== null ? signed(value, cols[i][2]) : fmt(value, cols[i][2]))]), 'ra-table') + '</div>');
    }
    folds.push('<details class="method"><summary>월별 수치</summary>' + monthTables.join('') + '</details>');

    // ---- notes -----------------------------------------------------------------
    const missing = [!rigMonth && '가동 리그 수', !drillMonth && '시추 생산성 지표'].filter(Boolean);
    const carried = [Object.values(rigSource).some(entry => entry && entry.carried) && '가동 리그 수', drilling && drilling.carried && '시추 생산성 지표'].filter(Boolean);
    const stamp = new Date(supply.fetched_at);
    const updated = !supply.fetched_at || Number.isNaN(stamp.getTime()) ? '' : (() => {
      const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hour12: false}).formatToParts(stamp).map(({type, value}) => [type, value]));
      return '갱신 ' + p.year + '.' + p.month + '.' + p.day + ' ' + p.hour + ':' + p.minute + ' KST';
    })();
    const out = url => ' target="_blank" rel="noopener noreferrer" href="' + url + '"';
    const sources = [rigMonth && '<a' + out('https://www.eia.gov/dnav/ng/ng_enr_drill_s1_m.htm') + '>EIA 원유·천연가스 시추 활동</a>(Baker Hughes 집계의 월간 평균)',
      drillMonth && '<a' + out('https://www.eia.gov/outlooks/steo/') + '>EIA 단기 에너지 전망</a>' +
        (/^\d{4}-\d{2}$/.test(drilling.edition || '') ? ' ' + monthKo(drilling.edition) + '호' : '') + ' 표 10a'].filter(Boolean);
    const weekly = host('producer-netback')
      ? '<a href="#producer-netback">원유 생산자의 실현가격과 투자</a>' : '원유 생산자의 실현가격과 투자';
    // EIA rounds each rig series on its own, so 육상 + 해양 can miss 전체 by one. The other panel prints one week's
    // count: the sentence says the basis differs, not the values (a week's count can equal a month's average).
    const notes = (rigMonth ? '<p class="note">리그 수는 ' + (siteParts ? 'EIA가 계열마다 반올림한 월간 평균이라 육상·해양의 합이 전체와 1 다를 수 있다. ' : '월간 평균이다. ') +
      weekly + '에 적은 퍼미안·미국 전체 리그 수는 10월 30일 종료 주간 집계라 기준이 다르다.</p>' : '') +
      (missing.length ? '<p class="note">' + missing.join(', ') + ': 자료 없음</p>' : '') +
      '<p class="note context-caption">' + sources.join(' · ') + (updated && ' · ' + updated) +
      (carried.length ? ' · 이번 갱신에서 받지 못해 이전 값을 유지한 자료: ' + carried.join(', ') : '') + '</p>';

    // ---- the page ----------------------------------------------------------------
    host('rig-activity-data').innerHTML = '<div class="ra-tiles">' + tiles.join('') + '</div>';
    host('rig-activity-charts').innerHTML = '';
    charts.forEach(chart => lineChart(host('rig-activity-charts'), chart));
    host('rig-activity-basis').innerHTML = notes + folds.join('');
    if (host('rig-activity-asof')) host('rig-activity-asof').innerHTML = [rigMonth && '리그 ' + time(rigMonth), drillMonth && '시추·완결 ' + time(drillMonth), '월간'].filter(Boolean).join(' · ');

    // One line chart: its title and unit, a legend that is also the readout of the month under
    // the pointer (the newest month with a value when nothing is picked), and the plot. A series
    // that lacks a month breaks its line there. Each line ends in a dot and its name.
    function lineChart(parent, {title, unit, lead, digits, series, rows}) {
      const tail = rows.length - 1;
      // The window ends at the newest month of the section; this chart's own series may stop before it.
      const newest = rows.reduce((found, row, i) => row.slice(1).some(value => value !== null) ? i : found, tail);
      const figure = document.createElement('figure');
      figure.className = 'ra-chart' + (lead ? ' ra-lead' : '');
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
      svg.setAttribute('aria-label', title + ' · ' + unit + ' · ' + monthKo(rows[0][0]) + '~' + monthKo(rows[tail][0]) + ' · ' + monthKo(rows[newest][0]) + ' ' +
        series.map(({label}, i) => label + ' ' + fmt(rows[newest][i + 1], digits)).join(', '));
      figure.append(head, read, svg);
      parent.append(figure);
      let picked = null, place = () => {};
      const show = () => {
        const row = rows[picked ?? newest];
        read.innerHTML = '<time datetime="' + esc(row[0]) + '">' + esc(monthDot(row[0])) + '</time>' +
          series.map(({label, color}, i) => '<span><i style="background:' + color + '"></i>' + esc(label) + '<b>' + fmt(row[i + 1], digits) + '</b></span>').join('');
        place();
      };
      const draw = () => {
        const width = svg.clientWidth, height = svg.clientHeight;
        if (!width || !height) return;
        const m = {left: 40, right: 54, top: 8, bottom: 20};
        const plot = d3.select(svg).attr('viewBox', '0 0 ' + width + ' ' + height);
        plot.selectAll('*').remove();
        const months = rows.map(row => row[0]);
        const x = d3.scalePoint(months, [m.left, width - m.right]);
        const values = rows.flatMap(row => row.slice(1)).filter(value => value !== null);
        const y = d3.scaleLinear(d3.extent(values), [height - m.bottom, m.top]).nice(4);
        const ticks = y.ticks(4);
        plot.append('g').selectAll('line').data(ticks).join('line').attr('class', 'trend-grid')
          .attr('x1', m.left).attr('x2', width - m.right).attr('y1', value => y(value)).attr('y2', value => y(value));
        plot.append('g').attr('class', 'trend-axis').attr('transform', 'translate(' + m.left + ',0)')
          .call(d3.axisLeft(y).tickValues(ticks).tickSize(0).tickPadding(5).tickFormat(value => fmt(value, 0)));
        // A tick at each January; where a year takes less than 44px, every other one.
        const januaries = months.filter(month => month.endsWith('-01'));
        const every = januaries.length > 1 && x(januaries[1]) - x(januaries[0]) < 44 ? 2 : 1;
        const marks = januaries.length ? januaries.filter((_, i) => (januaries.length - 1 - i) % every === 0) : [months[0], months[tail]];
        plot.append('g').attr('class', 'trend-axis').attr('transform', 'translate(0,' + (height - m.bottom) + ')')
          .call(d3.axisBottom(x).tickValues(marks).tickSize(0).tickPadding(6).tickFormat(month => month.slice(2).replace('-', '.')));
        const ends = [];
        series.forEach(({short, color}, i) => {
          const at = row => row[i + 1];
          plot.append('path').datum(rows).attr('fill', 'none').attr('stroke', color).attr('stroke-width', 2)
            .attr('stroke-linejoin', 'round').attr('stroke-linecap', 'round')
            .attr('d', d3.line().defined(row => at(row) !== null).x(row => x(row[0])).y(row => y(at(row))));
          const last = rows.filter(row => at(row) !== null).at(-1);
          // A month with a value between two months without one has no line to sit on.
          rows.forEach((row, k) => {
            if (row !== last && at(row) !== null && (!rows[k - 1] || at(rows[k - 1]) === null) && (!rows[k + 1] || at(rows[k + 1]) === null))
              plot.append('circle').attr('cx', x(row[0])).attr('cy', y(at(row))).attr('r', 2).attr('fill', color);
          });
          if (last) {
            plot.append('circle').attr('cx', x(last[0])).attr('cy', y(at(last))).attr('r', 4).attr('fill', color).attr('stroke', '#fff').attr('stroke-width', 2);
            if (short) ends.push({x: x(last[0]) + 8, y: y(at(last)) + 3.5, label: short});
          }
        });
        // Names of lines that end close together are set one line apart.
        ends.sort((a, b) => a.y - b.y);
        for (let i = 1; i < ends.length; i++) if (ends[i].y - ends[i - 1].y < 12) ends[i].y = ends[i - 1].y + 12;
        const overflow = ends.length ? ends.at(-1).y - (height - m.bottom) : 0;
        if (overflow > 0) ends.forEach(end => { end.y -= overflow; });
        for (const end of ends) plot.append('text').attr('class', 'ra-end').attr('x', end.x).attr('y', end.y).text(end.label);
        const cursor = plot.append('g').attr('class', 'ra-cursor').attr('display', 'none');
        cursor.append('line').attr('y1', m.top).attr('y2', height - m.bottom);
        series.forEach(({color}) => cursor.append('circle').attr('r', 3.5).attr('fill', color).attr('stroke', '#fff').attr('stroke-width', 1.5));
        place = () => {
          cursor.attr('display', picked === null ? 'none' : null);
          if (picked === null) return;
          const row = rows[picked];
          cursor.select('line').attr('x1', x(row[0])).attr('x2', x(row[0]));
          cursor.selectAll('circle').each(function (_, i) {
            d3.select(this).attr('display', row[i + 1] === null ? 'none' : null).attr('cx', x(row[0])).attr('cy', row[i + 1] === null ? 0 : y(row[i + 1]));
          });
        };
        // The month nearest the pointer; a tap picks one too.
        svg.onpointermove = svg.onpointerdown = event => {
          const step = x.step() || 1;
          picked = Math.max(0, Math.min(tail, Math.round((event.clientX - svg.getBoundingClientRect().left - m.left) / step)));
          show();
        };
        place();
      };
      // A mouse that leaves the plot drops the month. A tapped one stays until a tap elsewhere, and
      // one reached with the keys until the plot loses focus.
      const drop = () => { if (picked !== null) { picked = null; show(); } };
      svg.onpointerleave = event => { if (event.pointerType === 'mouse') drop(); };
      svg.addEventListener('blur', drop);
      document.addEventListener('pointerdown', event => { if (!svg.contains(event.target)) drop(); });
      svg.addEventListener('keydown', event => {
        const move = {ArrowLeft: -1, ArrowRight: 1, Home: -rows.length, End: rows.length}[event.key];
        if (!move) return;
        event.preventDefault();
        picked = Math.max(0, Math.min(tail, (picked ?? newest) + move));
        show();
      });
      new ResizeObserver(draw).observe(svg);
      draw();
      show();
    }
  } catch (err) {
    console.error('rig activity: section not drawn', err);
    none();
  }
})();
