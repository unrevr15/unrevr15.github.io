'use strict';
// Live layer. live-data.js sets window.ENERGY_LIVE from the dashboard DB after
// every ETL (backend/app/etl/external/energy_live.py). This script runs after
// research.js and before app.js, so it can extend research.js constants before
// they are drawn:
//   * monthlyMarket gains each newly completed month (the research values are
//     the monthly means of FRED DCOILBRENTEU, DCOILWTICO, DDFUELUSGULF and
//     DGASUSGULF, so new months use the same definition; existing values are
//     never rewritten),
//   * the two industryPrices rows with an exact public source (Gulf Coast jet
//     fuel monthly mean, US retail diesel weekly) move to the newest value,
//   * crackPeriods gains the newest US month when it is past the researched one,
//   * the monitor desk gets a weekly-change heatmap (every series in a fold
//     below it) and the market desks a strip of their own series.
// Everything else on the page is the dated research snapshot and stays as is.
// A failure here must not stop the page: the const is always initialised
// (null on any error) and each research.js constant is replaced whole, never
// left half-extended.

// Heatmap step of a % change: 0 under 1%, then 1–5, 5–10, 10–20 and 20% or more.
function heatLevel(change) {
  const size = Math.abs(change);
  return change === null || change === undefined || !Number.isFinite(size) ? null : size < 1 ? 0 : size < 5 ? 1 : size < 10 ? 2 : size < 20 ? 3 : 4;
}
// Rows of the monitor's weekly heatmap (plan §4 live-market): spot, retail and
// ETF series, and futures whose payload names the contract month.
const MONITOR_HEAT = [['원유', ['brent', 'wti', 'brent_fut', 'wti_fut']],
                      ['석유제품', ['usgc_ulsd', 'usgc_gasoline', 'usgc_jet', 'retail_diesel', 'retail_gasoline']],
                      ['천연가스·LNG', ['henry_hub', 'ng_fut', 'ttf_fut', 'jkm_fut']],
                      ['곡물', ['wheat_fut', 'corn_fut']],
                      ['에너지 주식', ['xle', 'oih']]];

const energyLive = (() => { try {
  const live = window.ENERGY_LIVE;
  if (!live || live.ok !== true || !live.series) return null;
  const S = live.series;

  const esc = value => String(value ?? '').replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt = (value, digits) => value === null || value === undefined || !Number.isFinite(Number(value))
    ? '—'
    : Number(value).toLocaleString('en-US', {minimumFractionDigits:digits, maximumFractionDigits:digits});
  const pct = (now, then) => (now === null || now === undefined || !then) ? null : (now / then - 1) * 100;
  const signed = (value, digits = 1, unit = '%') => value === null || value === undefined || !Number.isFinite(value)
    ? '—'
    : (value > 0 ? '+' : value < 0 ? '−' : '') + fmt(Math.abs(value), digits) + unit;
  const tone = value => !Number.isFinite(value) || value === 0 ? '' : value > 0 ? 'live-up' : 'live-down';
  const dot = iso => iso ? esc(String(iso).replaceAll('-', '.')) : '';
  const shortDate = (iso, freq) => !iso ? '—' : esc(freq === 'M' ? String(iso).slice(0, 7).replace('-', '.') : String(iso).slice(5).replace('-', '.'));
  const kst = iso => {
    try {
      const parts = new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Seoul', year:'numeric', month:'2-digit',
        day:'2-digit', hour:'2-digit', minute:'2-digit', hour12:false}).formatToParts(new Date(iso));
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return p.year + '.' + p.month + '.' + p.day + ' ' + p.hour + ':' + p.minute + ' KST';
    } catch {
      return iso || '';
    }
  };
  const monthKey = (year, month) => year + '-' + String(month).padStart(2, '0');
  const sourceLink = entry => entry.source === 'FRED'
    ? '<a href="https://fred.stlouisfed.org/series/' + encodeURIComponent(entry.ref) + '" target="_blank" rel="noopener noreferrer">FRED ' + esc(entry.ref) + '</a>'
    : '<a href="https://finance.yahoo.com/quote/' + encodeURIComponent(entry.ref) + '" target="_blank" rel="noopener noreferrer">Yahoo ' + esc(entry.ref) + '</a>';

  // ---- monthlyMarket: append completed months ---------------------------
  const MONTHLY = [['brent','brent',2], ['wti','wti',2], ['diesel','usgc_ulsd',3], ['gasoline','usgc_gasoline',3]];
  const commonMonths = keys => {
    const maps = keys.map(key => S[key]?.monthly);
    if (maps.some(map => !map)) return [];
    return Object.keys(maps[0]).filter(month => maps.every(map => map[month] !== null && map[month] !== undefined)).sort();
  };
  const monthly = commonMonths(MONTHLY.map(([, key]) => key));
  const latestMonth = monthly.at(-1) || '';
  const round = (value, digits) => Math.round(value * 10 ** digits) / 10 ** digits;
  let monthsAdded = 0;
  for (const year of [...new Set(monthly.map(month => Number(month.slice(0, 4))))]) {
    if (!monthlyMarket[year] && year <= 2026) continue;     // only years after the research window
    let count = 0;
    while (count < 12 && monthly.includes(monthKey(year, count + 1))) count++;
    const existing = monthlyMarket[year] || {brent:[], wti:[], diesel:[], gasoline:[]};
    const have = existing.brent.length;
    if (count <= have || MONTHLY.some(([field]) => existing[field].length !== have)) continue;
    const next = {...existing};
    for (const [field, key, digits] of MONTHLY) {
      const added = [];
      for (let i = have; i < count; i++) added.push(round(S[key].monthly[monthKey(year, i + 1)], digits));
      next[field] = existing[field].concat(added);
    }
    if (MONTHLY.some(([field]) => next[field].some(value => !Number.isFinite(value)))) continue;
    monthlyMarket[year] = next;
    monthsAdded += count - have;
  }
  const recent = trendWindows.recent;
  for (const year of Object.keys(monthlyMarket).map(Number)) {
    if (year > 2026 && !recent.years.includes(year)) recent.years.push(year);
  }
  if (recent.years.at(-1) > 2026) recent.label = recent.years[0] + '–' + recent.years.at(-1);
  if (latestMonth > recent.initial && monthlyMarket[Number(latestMonth.slice(0, 4))]) recent.initial = latestMonth;

  // ---- industryPrices: the two rows with an exact public source -----------
  const priorYearMonth = month => monthKey(Number(month.slice(0, 4)) - 1, Number(month.slice(5)));
  const jet = S.usgc_jet;
  const jetRow = industryPrices.find(row => row[4] === 'jet');
  const jetMonth = Object.keys(jet?.monthly || {}).sort().at(-1);
  if (jetRow && jetMonth && jetMonth > '2026-09') {         // the research row is September 2026
    const now = jet.monthly[jetMonth], then = jet.monthly[priorYearMonth(jetMonth)];
    jetRow[1] = fmt(now, 3) + ' $/갤런';
    jetRow[2] = then ? fmt(then, 3) + ' → ' + fmt(now, 3) + ' · ' + signed(pct(now, then)) : '전년 동월 값 없음';
    jetRow[3] = jetMonth.slice(0, 4) + '년 ' + Number(jetMonth.slice(5)) + '월 평균 · 항공유 현물(FOB) · 자동 갱신';
  }
  const diesel = S.retail_diesel;
  const dieselRow = industryPrices.find(row => row[4] === 'diesel');
  if (dieselRow && diesel?.last && diesel.last.date > '2026-11-02') {   // research row: 2026.11.02
    const now = diesel.last, then = diesel.y1;
    dieselRow[1] = fmt(now.value, 3) + ' $/갤런';
    dieselRow[2] = then ? fmt(then.value, 3) + ' → ' + fmt(now.value, 3) + ' · ' + signed(pct(now.value, then.value)) : '전년 값 없음';
    dieselRow[3] = (then ? dot(then.date) + ' ↔ ' : '') + dot(now.date) + ' · 세금 포함 소매 · 자동 갱신';
  }

  // ---- crackPeriods: the newest US month past the researched October -----
  const crackMonths = commonMonths(['wti', 'usgc_gasoline', 'usgc_ulsd', 'usgc_jet']);
  const crackMonth = crackMonths.at(-1);
  if (crackMonth && crackMonth > '2026-10') {
    const prior = priorYearMonth(crackMonth);
    const at = (key, month) => S[key].monthly[month];
    if (['wti', 'usgc_gasoline', 'usgc_ulsd', 'usgc_jet'].every(key => at(key, prior) !== undefined)) {
      crackPeriods.usLatest = {
        label:'미국 ' + (crackMonth.slice(0, 4) === '2026' ? '' : crackMonth.slice(0, 4) + '년 ') + Number(crackMonth.slice(5)) + '월 · 자동',
        basis:'미국 걸프연안 제품 − 쿠싱 WTI', crudeName:'쿠싱 WTI', refs:['wti','usg','usd','jet'],
        crude:[round(at('wti', prior), 2), round(at('wti', crackMonth), 2)], multiplier:42,
        years:[prior.slice(0, 4), crackMonth.slice(0, 4)],
        rows:[['일반 휘발유', round(at('usgc_gasoline', prior), 3), round(at('usgc_gasoline', crackMonth), 3)],
              ['초저유황 경유', round(at('usgc_ulsd', prior), 3), round(at('usgc_ulsd', crackMonth), 3)],
              ['등유형 항공유', round(at('usgc_jet', prior), 3), round(at('usgc_jet', crackMonth), 3)]]
      };
    }
  }

  // ---- monitor desk: every live series ------------------------------------
  const GROUPS = [['oil','원유'], ['products','석유제품'], ['gas','천연가스·LNG'], ['power','석탄'],
                  ['metals','구리·금속'], ['food','식량'], ['equity','에너지 업종 ETF']];
  const contractName = month => esc(String(month).slice(0, 4)) + '년 ' + Number(String(month).slice(5, 7)) + '월물';
  const rolled = (now, then) => Boolean(now?.contract && then?.contract && now.contract !== then.contract);
  const changeCell = (now, then) => {
    if (rolled(now, then)) return '<td title="' + contractName(then.contract) + ' → ' + contractName(now.contract) + '">만기 교체</td>';
    const value = pct(now?.value, then?.value);
    return '<td class="' + tone(value) + '">' + signed(value) + '</td>';
  };
  const rowFor = ([key, entry]) =>
    '<tr id="live-' + esc(key) + '"><th scope="row">' + esc(entry.label) + (entry.carried ? ' <span class="live-badge">이전 값</span>' : '') +
    '<small>' + esc(entry.unit) + ' · ' + sourceLink(entry) + (entry.last?.contract ? ' · ' + contractName(entry.last.contract) : '') + '</small></th>' +
    '<td class="latest">' + fmt(entry.last?.value, entry.digits) + '</td>' +
    '<td>' + shortDate(entry.last?.date, entry.freq) + '</td>' +
    (entry.freq === 'M' ? '<td>—</td>' : changeCell(entry.last, entry.w1)) +
    changeCell(entry.last, entry.m1) + changeCell(entry.last, entry.y1) + changeCell(entry.last, entry.ytd) + '</tr>';
  // Only the groups the table draws: the CPI indexes (group cpi) belong to the
  // 물가전이 panel of auto-series.js, and the 전년비 column here reads y1, which
  // for a monthly series with a missing month is not the same month a year back.
  const entries = Object.entries(S).filter(([, entry]) => entry && entry.last && GROUPS.some(([group]) => group === entry.group));
  // Weekly heatmap: cells shade the 1-week and 1-month change by size; across
  // two contracts they say '만기 교체'. The 12-month line (no futures: their
  // monthly means chain contracts) is the monthly means and the newest value.
  const monthName = month => Number(String(month).slice(5, 7)) + '월물';
  const heatCell = (entry, then, span) => {
    if (!then) return '<td class="heat-none">—</td>';
    const range = span + ' ' + dot(then.date) + ' ' + fmt(then.value, entry.digits) + ' → ' + dot(entry.last.date) + ' ' + fmt(entry.last.value, entry.digits);
    if (rolled(entry.last, then)) return '<td><span class="heat-cell heat-roll" title="' + range + '">만기 교체<small>' +
      monthName(then.contract) + ' → ' + monthName(entry.last.contract) + '</small></span></td>';
    const raw = pct(entry.last.value, then.value);
    if (heatLevel(raw) === null) return '<td class="heat-none">—</td>';
    // Shade, arrow and sign follow the printed (rounded) value.
    const change = Math.sign(raw) * Number(Math.abs(raw).toFixed(1));
    const level = heatLevel(change);
    const side = change > 0 ? 'up' : 'down';
    return '<td><span class="heat-cell ' + (level ? side + level : 'flat') + '" title="' + range + '">' +
      (level ? (change > 0 ? '▲ ' : '▼ ') : '') + signed(change) + '</span></td>';
  };
  const spark = (key, entry) => {
    const months = Object.keys(entry.monthly || {}).sort().slice(-12);
    if (key.endsWith('_fut') || months.length < 12) return '';
    const values = [...months.map(month => entry.monthly[month]), entry.last.value];
    const lo = Math.min(...values), hi = Math.max(...values), width = 104, height = 22;
    const x = i => (i * width / (values.length - 1)).toFixed(1);
    const y = value => (hi === lo ? height / 2 : height - (value - lo) / (hi - lo) * height + 3).toFixed(1);
    return '<svg class="heat-spark" viewBox="-4 0 ' + (width + 8) + ' ' + (height + 6) + '" role="img" aria-label="' +
      esc(months[0].replace('-', '.') + '~' + months.at(-1).replace('-', '.') + ' 월평균과 최신값') + '"><path d="' +
      values.slice(0, -1).map((value, i) => (i ? 'L' : 'M') + x(i) + ' ' + y(value)).join(' ') + '"/><circle cx="' + x(values.length - 1) +
      '" cy="' + y(values.at(-1)) + '" r="3"/></svg>';
  };
  const drawn = new Set();
  const heatRow = key => {
    const entry = S[key];
    if (!entry?.last || (key.endsWith('_fut') && !entry.last.contract)) return '';
    drawn.add(key);
    const contract = entry.last.contract ? ' <span class="heat-contract" title="' + contractName(entry.last.contract) + '">' + monthName(entry.last.contract) + '</span>' : '';
    return '<tr><th scope="row">' + esc(entry.label) + (entry.carried ? ' <span class="live-badge">이전 값</span>' : '') + '<small>' + esc(entry.unit) + '</small></th>' +
      '<td class="heat-last"><b>' + fmt(entry.last.value, entry.digits) + '</b>' + contract + '<small>' + shortDate(entry.last.date, entry.freq) + '</small></td>' +
      heatCell(entry, entry.w1, '1주') + heatCell(entry, entry.m1, '1개월') + '<td class="heat-trend">' + spark(key, entry) + '</td></tr>';
  };
  const heatRows = MONITOR_HEAT.map(([title, keys]) => [title, keys.map(heatRow).filter(Boolean)])
    .filter(([, rows]) => rows.length);
  const heatCount = heatRows.reduce((n, [, rows]) => n + rows.length, 0);
  const heatHtml = heatRows.map(([title, rows]) => '<tr class="heat-group"><th colspan="5" scope="rowgroup">' + title + '</th></tr>' + rows.join('')).join('');
  const hasFutures = [...drawn].some(key => key.endsWith('_fut'));
  const hasRoll = heatHtml.includes('heat-roll');
  const monitor = document.querySelector('#monitor > .desk-heading');
  if (monitor && entries.length) {
    const panel = document.createElement('section');
    panel.className = 'panel live-panel';
    panel.id = 'live-market';
    panel.innerHTML = '<div class="heat-head"><p class="kicker">주간 변화 · ' + heatCount + '개 계열</p><h2>최신 시세와 1주·1개월 변화</h2></div>' +
      '<div class="heat-legend" aria-hidden="true"><span>▼ 하락</span><span class="heat-scale">' +
      ['down4', 'down3', 'down2', 'down1', 'flat', 'up1', 'up2', 'up3', 'up4'].map(step => '<i class="' + step + '"></i>').join('') +
      '</span><span>상승 ▲</span><span>칸 경계 ±1·5·10·20%</span>' + (hasRoll ? '<span><i class="heat-roll"></i>만기 교체</span>' : '') +
      '<span><svg class="heat-key" viewBox="0 0 30 10"><path d="M1 8 L9 5 L17 7 L25 3"/><circle cx="26" cy="3" r="2.5"/></svg>월평균 12개월 · 최신값</span></div>' +
      '<div class="table-scroll"><table class="heat-table"><thead><tr>' +
      ['품목', '최신 · 관측일', '1주', '1개월', '12개월'].map(text => '<th scope="col">' + text + '</th>').join('') + '</tr></thead><tbody>' +
      heatHtml + '</tbody></table></div>' +
      '<p class="note">1주·1개월은 각 계열 최신 관측일의 7일·30일(주간 소매가는 7일·28일) 전 마지막 관측과 비교한다.' +
      (hasFutures ? ' 선물은 같은 계약월끼리만 비교한다.' : '') + ' FRED(EIA) · Yahoo Finance</p>';
    // Every series, folded below the first-screen row so opening it does not stretch the tiles' column.
    const more = document.createElement('div');
    more.className = 'panel live-more';
    more.innerHTML = '<details class="method"><summary>전체 시세 ' + entries.length + '개 계열 · 전년비·연초 대비</summary><p class="note">갱신 ' + esc(kst(live.fetched_at)) +
      ' · 지표별 관측일</p><div class="table-scroll"><table class="market-table live-table"><thead><tr>' +
      ['지표','최신','관측일','1주','1개월','전년비','연초 대비'].map(text => '<th scope="col">' + text + '</th>').join('') +
      '</tr></thead><tbody>' +
      GROUPS.map(([group, title]) => {
        const rows = entries.filter(([, entry]) => entry.group === group);
        return rows.length ? '<tr class="live-group"><th colspan="7" scope="rowgroup">' + title + '</th></tr>' + rows.map(rowFor).join('') : '';
      }).join('') +
      '</tbody></table></div></details>' + '<details class="method"><summary>자동 갱신 기준</summary><p>대시보드가 하루 두 번(07:17·17:17 KST) 데이터를 갱신할 때 함께 다시 받는다. ' +
      '현물 가격은 FRED(EIA·IMF·BLS 원자료), 선물과 ETF는 Yahoo Finance 근월물 종가다. 브렌트·WTI 선물 근월물은 같은 계약월끼리만 변화율을 내고, 비교 시점과 계약월이 다르면 ‘만기 교체’로 적는다. 근월물이 매달 바뀌므로 1개월·전년비·연초 대비는 대개 만기를 건너고, 그 기간의 변화는 현물 행에 있다. 1주·1개월·전년비는 각 날짜 이전의 가장 최근 관측값과 비교하고, 연초 대비는 전년 마지막 관측값 대비다. ' +
      'IMF 월간 지표는 직전 월과 전년 동월로 비교한다. 이 표 밖의 수치는 조사 기준일의 원자료 그대로이며, 월별 추이 차트, 미국 크랙의 최신 월 탭, 산업비용의 항공유·도로용 경유 행만 같은 원자료로 이어서 갱신한다. ' +
      '“이전 값” 표시는 이번 갱신에서 원자료를 받지 못해 직전 갱신값을 유지한 지표다.</p></details>';
    const top = document.querySelector('#monitor > .monitor-top');
    if (top) {
      top.prepend(panel);
      top.classList.add('has-live');
      top.after(more);
    } else monitor.after(panel, more);
  }

  // ---- market desks: a strip of their own series --------------------------
  const STRIPS = {
    oil:['brent','wti','brent_fut','wti_fut'],
    products:['usgc_ulsd','usgc_gasoline','usgc_jet','nyh_ulsd','retail_diesel','retail_gasoline'],
    gas:['henry_hub','ng_fut','ttf_fut','jkm_fut','eu_gas_imf','asia_lng_imf'],
    power:['coal_au_imf','henry_hub','ttf_fut'],
    copper:['copper_fut','copper_imf','aluminum_fut'],
    food:['wheat_fut','corn_fut','soy_fut','food_index_imf','eggs'],
    prices:['usgc_jet','retail_diesel','copper_fut','food_index_imf'],
    inflation:['eggs','food_index_imf','retail_gasoline'],
    companies:['xle','oih','brent','henry_hub','copper_fut']
  };
  for (const [desk, keys] of Object.entries(STRIPS)) {
    const heading = document.querySelector('#' + desk + ' > .desk-heading');
    const chips = keys.map(key => [key, S[key]]).filter(([, entry]) => entry?.last);
    if (!heading || !chips.length) continue;
    const strip = document.createElement('div');
    strip.className = 'live-strip';
    strip.setAttribute('role', 'group');
    strip.setAttribute('aria-label', '최신 시세 (자동 갱신)');
    strip.innerHTML = chips.map(([key, entry]) => {
      let basis = entry.freq === 'M' ? entry.prev : entry.m1, span = entry.freq === 'M' ? '전월' : '1개월';
      // A front month's 1개월 change nearly always spans an expiry: fall back
      // to 1주 within the same contract, else name the contract.
      if (rolled(entry.last, basis) && entry.w1 && !rolled(entry.last, entry.w1)) [basis, span] = [entry.w1, '1주'];
      const change = pct(entry.last.value, basis?.value);
      return '<a class="live-chip" href="#' + (drawn.has(key) ? 'live-market' : 'live-' + esc(key)) + '"><span>' + esc(entry.label) + '</span><b>' + fmt(entry.last.value, entry.digits) +
        ' <i>' + esc(entry.unit) + '</i></b><small>' + shortDate(entry.last.date, entry.freq) + ' · ' +
        (rolled(entry.last, basis) ? contractName(entry.last.contract) : span + ' <em class="' + tone(change) + '">' + signed(change) + '</em>') + '</small></a>';
    }).join('') + '<span class="live-strip-note">자동 갱신 ' + esc(kst(live.fetched_at)) + '</span>';
    heading.after(strip);
  }

  return {live, series:S, companies:live.companies || {}, filings:live.filings || {},
          esc, fmt, pct, signed, tone, dot, kst, monthsAdded, latestMonth};
} catch (err) {
  console.error('live: live layer not applied', err);
  return null;
} })();
