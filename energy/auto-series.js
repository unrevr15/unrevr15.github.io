'use strict';
// Two panels computed from series the live payload already carries
// (window.ENERGY_LIVE.series, backend/app/etl/external/energy_live.py):
//   * futures-cracks (정유·석유화학 › 요약·크랙): US futures cracks from the daily
//     closes of the RBOB, NY Harbor ULSD and WTI front months,
//   * cpi-items (물가전이 › 전이): month-on-month and year-on-year changes of
//     five US CPI indexes and the last 13 month-on-month changes of one item.
// index.html holds the panels' headings and empty hosts. Every number is
// computed here from the payload; no sentence carries a fixed figure.
//
// The arithmetic is in the three functions below, outside the drawing code, so
// test_energy_autoseries.py runs it in node. Each panel draws inside its own
// try and builds its markup before it touches the page. Without the payload,
// with a snapshot from before these fields existed, or on any error, a panel
// shows the one line '자료 없음' and nothing else on the page changes. The
// payload is read from window.ENERGY_LIVE, not from energyLive, so a failure
// of live.js does not take these panels with it (supply.js does the same).
// Loaded after market-insights.js (timeChart) and supply-followup.js (the PCE
// table the CPI panel links to).

// Daily closes [[YYYY-MM-DD, value], …] of the three front months → one row
// per trading day on which all three have a price. A value that is not a
// number or is zero or below is dropped, and with it that day. Products are
// in dollars per gallon and crude in dollars per barrel: 42 gallons a barrel.
function futuresCracks(rbob, ho, wti) {
  const priced = rows => new Map((Array.isArray(rows) ? rows : []).filter(row => Array.isArray(row) &&
    /^\d{4}-\d{2}-\d{2}$/.test(row[0]) && typeof row[1] === 'number' && Number.isFinite(row[1]) && row[1] > 0)
    .map(([day, value]) => [day, value]));
  const [gasolinePrice, ulsdPrice, crude] = [rbob, ho, wti].map(priced);
  return [...crude.keys()].filter(day => gasolinePrice.has(day) && ulsdPrice.has(day)).sort().map(day => {
    const gasoline = gasolinePrice.get(day) * 42 - crude.get(day);
    const ulsd = ulsdPrice.get(day) * 42 - crude.get(day);
    return {date: day, gasoline, ulsd, crack321: (2 * gasoline + ulsd) / 3, gap: ulsd - gasoline};
  });
}
// 'YYYY-MM' n months earlier.
function cpiMonthBack(month, n) {
  const index = Number(String(month).slice(0, 4)) * 12 + Number(String(month).slice(5, 7)) - 1 - n;
  return Math.floor(index / 12) + '-' + String(index % 12 + 1).padStart(2, '0');
}
// % change of a monthly index over n months (1 전월비, 12 전년비), by month key.
// null when either month is missing: the payload's y1 is the newest
// observation on or before a year back, so it would compare with the month
// before a missing one and print a 13-month change as 전년비.
function cpiChange(monthly, month, n) {
  const level = key => monthly && typeof monthly[key] === 'number' && Number.isFinite(monthly[key]) && monthly[key] > 0 ? monthly[key] : null;
  const now = level(month), then = level(cpiMonthBack(month, n));
  return now === null || then === null ? null : (now / then - 1) * 100;
}

(() => {
  const NONE = '<p class="note">자료 없음</p>';
  const live = window.ENERGY_LIVE;
  const series = (live && live.ok === true && live.series) || {};
  const host = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fixed = (value, digits = 2) => Math.abs(value).toLocaleString('en-US', {minimumFractionDigits:digits, maximumFractionDigits:digits});
  // Two decimals; the sign follows the printed value, so −0.004 prints 0.00.
  const shown = value => Number(value.toFixed(2));
  const plain = value => Number.isFinite(value) ? (shown(value) < 0 ? '−' : '') + fixed(value) : '—';
  const signed = (value, unit = '') => !Number.isFinite(value) ? '—' : (shown(value) > 0 ? '+' : shown(value) < 0 ? '−' : '') + fixed(value) + unit;
  const tone = value => !Number.isFinite(value) || shown(value) === 0 ? '' : value > 0 ? 'live-up' : 'live-down';
  const dot = iso => esc(String(iso).replaceAll('-', '.'));
  const time = iso => '<time datetime="' + esc(iso) + '">' + dot(iso) + '</time>';
  const monthKo = month => Number(String(month).slice(0, 4)) + '년 ' + Number(String(month).slice(5, 7)) + '월';
  const contractKo = month => monthKo(month) + '물';
  const sourceLink = entry => '<a href="' + (entry.source === 'FRED' ? 'https://fred.stlouisfed.org/series/' : 'https://finance.yahoo.com/quote/') +
    encodeURIComponent(entry.ref) + '" target="_blank" rel="noopener noreferrer">' + esc(entry.source) + ' ' + esc(entry.ref) + '</a>';
  const updated = () => {
    const stamp = new Date(live.fetched_at);
    if (!live.fetched_at || Number.isNaN(stamp.getTime())) return '';
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Seoul', year:'numeric', month:'2-digit', day:'2-digit',
      hour:'2-digit', minute:'2-digit', hour12:false}).formatToParts(stamp).map(({type, value}) => [type, value]));
    return '갱신 ' + p.year + '.' + p.month + '.' + p.day + ' ' + p.hour + ':' + p.minute + ' KST';
  };
  // One line in the data host; the other hosts are emptied so no chart or
  // button is left over a panel that was not drawn.
  const none = (data, others) => {
    others.forEach(id => { const el = host(id); if (el) el.innerHTML = ''; });
    const el = host(data);
    if (el) el.innerHTML = NONE;
  };

  // ---- 미국 선물 크랙 --------------------------------------------------------
  try {
    const legs = ['rbob_fut', 'ho_fut', 'wti_fut'].map(key => series[key]);
    const rows = legs.every(entry => entry && Array.isArray(entry.daily)) ? futuresCracks(...legs.map(entry => entry.daily)) : [];
    if (!rows.length || !host('futures-cracks-data') || !host('futures-cracks-chart')) none('futures-cracks-data', ['futures-cracks-chart', 'futures-cracks-basis']);
    else {
      const latest = rows.at(-1);
      const daysBefore = n => { const day = new Date(latest.date + 'T00:00:00Z'); day.setUTCDate(day.getUTCDate() - n); return day.toISOString().slice(0, 10); };
      // As live.js compares prices: the newest row on or before 7 / 30 / 365 days earlier.
      const before = n => rows.filter(row => row.date <= daysBefore(n)).at(-1) || null;
      const columns = [['최신', latest], ['1주 전', before(7)], ['1개월 전', before(30)], ['1년 전', before(365)]];
      const measures = [['3–2–1 크랙', '(2 × 휘발유 크랙 + ULSD 크랙) ÷ 3', 'crack321', plain],
                        ['휘발유 크랙', 'RBOB × 42 − WTI', 'gasoline', plain],
                        ['ULSD 크랙', 'ULSD × 42 − WTI', 'ulsd', plain],
                        ['차이', 'ULSD 크랙 − 휘발유 크랙', 'gap', signed]];
      const table = marketTable(['달러/배럴', ...columns.map(([label, row]) => label + (row ? '<small>' + dot(row.date) + '</small>' : ''))],
        measures.map(([label, formula, key, print]) => [label + '<small>' + formula + '</small>',
          ...columns.map(([, row], i) => !row ? '—' : i ? print(row[key]) : '<strong>' + print(row[key]) + '</strong>')]));
      const months = legs.map(entry => entry.last && entry.last.date === latest.date ? entry.last.contract : null);
      const contracts = months.every(Boolean)
        ? '<p class="note">' + time(latest.date) + ' 종가의 계약월은 RBOB ' + contractKo(months[0]) + ', ULSD ' + contractKo(months[1]) + ', WTI ' + contractKo(months[2]) + '이다.</p>' : '';
      // From the '1년 전' column's own observation to the newest row, so each
      // column of the table is a point of the chart. timeChart places points
      // by label: the label is the whole date, and the axis prints it as
      // 연.월 (month.day alone repeats, and reads backwards, where the year turns).
      const year = rows.filter(row => row.date >= (before(365) || rows[0]).date);
      const values = year.flatMap(row => [row.crack321, row.gasoline, row.ulsd]);
      const domain = [Math.min(0, Math.floor(Math.min(...values) / 10) * 10), Math.max(10, Math.ceil(Math.max(...values) / 10) * 10)];
      const elsewhere = host('supply-distillate')
        ? '<a href="#supply-distillate">제품별 수급</a>의 크랙 스프레드에 있는 선물 점선' : '제품별 수급의 크랙 스프레드에 있는 선물 점선';
      const basis = '<p class="note">' + elsewhere + '은 같은 제품 선물에서 브렌트 선물을 뺀 주간 평균이다. 이 패널은 WTI 선물을 빼고 거래일마다 계산한다.</p>' +
        '<details class="method"><summary>계산·해석 범위</summary>' + marketTable(['항목', '적용 조건'], [
        ['단위 환산', '원유는 달러/배럴, 제품은 달러/갤런이다. 제품 가격에 42를 곱해 배럴 단위로 맞춘다.'],
        ['계약', '세 선물의 최근월 연속 시세는 만기 교체일과 계약월이 서로 다를 수 있다. 같은 만기로 묶은 헤지 거래의 손익과 다른 지표용 근사치다.'],
        ['제외 비용', '가공비·운송비·세금·지역 베이시스와 실제 제품 수율은 반영하지 않는다.'],
        ['실물 공급 해석', '미국 선물 사이의 가격차다. 지역별 제품 재고와 공정 가동은 이 계산에 들어 있지 않다.']
      ], 'text-table') + '</details>';
      timeChart('futures-cracks-chart', year.map(row => [row.date, row.crack321, row.gasoline, row.ulsd]), [
        {index: 1, label: '3–2–1 크랙', color: '#356fa4'},
        {index: 2, label: '휘발유 크랙', color: '#a75a31'},
        {index: 3, label: 'ULSD 크랙', color: '#2e7d5b'}
      ], {unit: '달러/배럴', domain, tick: day => day.slice(2, 7).replace('-', '.')});
      host('futures-cracks-chart').insertAdjacentHTML('beforeend', '<p class="note context-caption">최근 1년 · ' + time(year[0].date) + '~' + time(latest.date) +
        ' · ' + year.length + '거래일 · ' + legs.map(sourceLink).join(' · ') + ' 근월물 종가' + (updated() && ' · ' + updated()) + '</p>');
      host('futures-cracks-data').innerHTML = '<p class="note">RBOB 휘발유·뉴욕항 ULSD·WTI 근월 선물의 종가로 계산한 제품과 원유의 가격차다. 같은 거래일에 세 가격이 모두 있는 관측만 쓴다.</p>' +
        '<div class="table-scroll">' + table + '</div>' + contracts;
      if (host('futures-cracks-basis')) host('futures-cracks-basis').innerHTML = basis;
      if (host('futures-cracks-asof')) host('futures-cracks-asof').innerHTML = '기준일 ' + time(latest.date) + ' · WTI 선물 기준 · 달러/배럴';
    }
  } catch (err) {
    console.error('auto series: futures cracks not drawn', err);
    none('futures-cracks-data', ['futures-cracks-chart', 'futures-cracks-basis']);
  }

  // ---- 미국 CPI 품목 ---------------------------------------------------------
  try {
    // 근원 포함 여부: the US core index leaves out food and energy, so gasoline
    // and food at home are outside it and airline fares are inside it.
    const ITEMS = [['cpi_all', '종합', '전체 품목'], ['cpi_core', '근원', '식품·에너지 제외'], ['cpi_gasoline', '휘발유', '근원 제외'],
                   ['cpi_food_home', '가정 내 식품', '근원 제외'], ['cpi_airfare', '항공요금', '근원 포함']];
    const items = ITEMS.map(([key, name, core]) => {
      const entry = series[key];
      const monthly = entry && entry.monthly && typeof entry.monthly === 'object' ? entry.monthly : null;
      const month = monthly ? Object.keys(monthly).filter(m => /^\d{4}-\d{2}$/.test(m) && Number.isFinite(monthly[m]) && monthly[m] > 0).sort().at(-1) : null;
      return month ? {key, name, core, entry, monthly, month} : null;
    }).filter(Boolean);
    if (!items.length || !host('cpi-items-data') || !host('cpi-items-tabs') || !host('cpi-items-months')) none('cpi-items-data', ['cpi-items-tabs', 'cpi-items-months']);
    else {
      const cell = value => value === null ? '—' : '<span class="' + tone(value) + '">' + signed(value, '%') + '</span>';
      // The markup of comparisonChart's signed bars (market-expansion.js), with
      // the labels printed by signed() and tone() as in the table: the same
      // change reads the same in both (−0.42, and 0.00 for −0.004).
      const bars = (rows, key) => {
        const max = Math.max(1, ...rows.map(([, value]) => Math.abs(shown(value))));
        return '<div class="compare-chart signed-chart"><div class="compare-key"><span class="compare-series-0"><i></i>' + key + '</span></div>' +
          rows.map(([label, value]) => {
            const width = Math.abs(shown(value)) / max * 50;
            return '<div class="compare-item"><strong>' + label + '</strong><div class="compare-values">' +
              '<div class="compare-row compare-series-0" aria-label="' + key + ' ' + signed(value) + '"><span class="compare-track" aria-hidden="true">' +
              '<i style="left:' + (shown(value) < 0 ? 50 - width : 50) + '%;width:' + width + '%"></i></span><span class="' + tone(value) + '">' + signed(value) + '</span></div></div></div>';
          }).join('') + '</div>';
      };
      const table = marketTable(['품목', '최신 월', '전월비', '전년비'], items.map(item => [
        esc(item.name) + '<small>' + item.core + ' · ' + sourceLink(item.entry) + '</small>',
        esc(item.month.replace('-', '.')), cell(cpiChange(item.monthly, item.month, 1)), cell(cpiChange(item.monthly, item.month, 12))]));
      const newest = items.map(item => item.month).sort().at(-1);
      const draw = key => {
        const item = items.find(candidate => candidate.key === key);
        const window13 = Array.from({length: 13}, (_, i) => cpiMonthBack(item.month, 12 - i)).map(month => [month, cpiChange(item.monthly, month, 1)]);
        const known = window13.filter(([, change]) => change !== null), missing = window13.filter(([, change]) => change === null);
        host('cpi-items-months').innerHTML = (known.length
          ? bars(known.map(([month, change]) => [esc(month.replace('-', '.')), change]), esc(item.name) + ' 전월비 · %')
          : NONE) +
          '<p class="note">' + monthKo(window13[0][0]) + '~' + monthKo(item.month) + '.' +
          (missing.length ? ' 그 달이나 앞 달 지수가 없어 뺀 달: ' + missing.map(([month]) => esc(month.replace('-', '.'))).join('·') + '.' : '') + '</p>';
      };
      const first = items[0].key;
      // The months whose missing index left a 전년비 cell empty.
      const noYear = [...new Set(items.filter(item => cpiChange(item.monthly, item.month, 12) === null).map(item => cpiMonthBack(item.month, 12)))].sort();
      // The PCE table sits in a fold of another panel (supply-followup.js);
      // workspace.js opens the fold when a link lands inside it.
      const pce = host('us-pce-changes') ? '<div class="transmission-links"><a href="#us-pce-changes">개인소비지출(PCE) 물가 ↗</a></div>' : '';
      host('cpi-items-tabs').innerHTML = '';
      buttons('cpi-items-tabs', Object.fromEntries(items.map(item => [item.key, {label: item.name}])), draw, first);
      draw(first);
      host('cpi-items-data').innerHTML = '<p class="note">미국 소비자물가지수(CPI) 품목별 계절조정 지수에서 계산한 전월비와 전년비다.</p>' +
        '<div class="table-scroll">' + table + '</div>' +
        '<p class="note">전월비와 전년비는 계절조정 지수에서 소수 둘째 자리까지 계산한다. 공식 발표는 소수 한 자리로 적고, 공식 전년비는 비계절조정 지수로 계산해 값이 조금 다를 수 있다. ' +
        '앞 달이나 전년 같은 달' + (noYear.length ? '(' + noYear.map(monthKo).join('·') + ')' : '') + ' 지수가 없는 칸은 비운다.' +
        ' 근원지수는 식품과 에너지를 뺀 지수라 휘발유와 가정 내 식품은 들지 않고 항공요금은 든다.' + (updated() && ' ' + updated()) + '</p>' + pce;
      if (host('cpi-items-asof')) host('cpi-items-asof').innerHTML = '기준월 <time datetime="' + esc(newest) + '">' + monthKo(newest) + '</time> · 계절조정 지수 · %';
    }
  } catch (err) {
    console.error('auto series: cpi items not drawn', err);
    none('cpi-items-data', ['cpi-items-tabs', 'cpi-items-months']);
  }
})();
