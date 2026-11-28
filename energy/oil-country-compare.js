'use strict';
// 국가별 원유 수출·정제 투입·제품 순공급 (정유·석유화학 › 마진·가동, #oil-country-compare). One
// table of the JODI section of window.ENERGY_LIVE.supply (backend/app/etl/external/energy_supply.py,
// jodi_view): for every area the payload carries, one month for every cell. The table reads
// CRUDEOIL INDPROD, TOTEXPSB and REFINOBS, and per product (GASDIES, GASOLINE, JETKERO, NAPHTHA,
// LPG, RESFUEL; KEROSENE for China only) REFGROUT and TOTEXPSB. The payload also carries CLOSTLV,
// TOTIMPSB and TOTDEMO (and TOTPRODS for days of cover); the table does not use them, so 순공급
// leaves imports out (the fold says so). Each flow is in KBD (thousand barrels a day; CLOSTLV in
// thousand barrels) as two 12-month rows: `cur` for jodi.year, `prev` for the year before.
//   원유 생산 INDPROD, 원유 수출 TOTEXPSB, 정제 투입 REFINOBS: the payload's values.
//   순공급 (계산) = the product's REFGROUT − its TOTEXPSB.
//   수율 (계산) = the product's REFGROUT ÷ CRUDEOIL REFINOBS × 100.
// The month is the newest one, from jodi.latest back, in which every area reports at least one of
// these flows; an area whose newest report is OIL_COMPARE_LATE or more months before jodi.latest
// is left out of that choice. A cell without a value in that month is 미확인: no value comes from
// another month. Units stay as JODI gives them (KBD); only the yield is a percentage.
//
// index.html holds the heading and the empty hosts. Every number is computed here from the
// payload; no sentence carries a fixed figure. The arithmetic is in the functions below, outside
// the drawing code, so test_energy_oil_compare.py runs it in node. Without the payload, with a
// snapshot without the JODI section or on any error the section is the one line '자료 없음'. The
// payload is read from window.ENERGY_LIVE, not from energyLive, so a failure of live.js does not
// take the section with it. Needs no other script of the page.

// An area whose newest report is this many months or more before jodi.latest does not hold the
// table's month back; its cells are 미확인.
const OIL_COMPARE_LATE = 3;
// The products of the table, in the order of the picker; the first is shown first.
const OIL_COMPARE_PRODUCTS = ['GASDIES', 'GASOLINE', 'JETKERO', 'NAPHTHA', 'LPG', 'RESFUEL'];
// The product read where an area reports none of the one asked for (the payload keeps
// KEROSENE, jet fuel included, only for China, which reports no JETKERO).
const OIL_COMPARE_STAND_IN = {JETKERO: 'KEROSENE'};
const OIL_COMPARE_CRUDE = [['CRUDEOIL', 'INDPROD'], ['CRUDEOIL', 'TOTEXPSB'], ['CRUDEOIL', 'REFINOBS']];

// 'YYYY-MM' → months since year 0, or NaN.
function oilCompareIndex(month) {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(String(month)) ? Number(month.slice(0, 4)) * 12 + Number(month.slice(5, 7)) - 1 : NaN;
}
function oilCompareMonth(index) {
  return Math.floor(index / 12) + '-' + String(index % 12 + 1).padStart(2, '0');
}
// The value of one area, product and flow in one month, or null: a month after jodi.latest, a
// month outside the payload's two years, a missing slot or anything but a finite number.
function oilCompareValue(jodi, code, product, flow, month) {
  const flows = jodi && jodi.data && jodi.data[code] && jodi.data[code][product];
  const entry = flows && typeof flows === 'object' ? flows[flow] : null;
  if (!entry || Number.isNaN(oilCompareIndex(month)) || !(oilCompareIndex(month) <= oilCompareIndex(jodi.latest))) return null;
  const year = Number(month.slice(0, 4)), slot = Number(month.slice(5, 7)) - 1;
  const row = year === Number(jodi.year) ? entry.cur : year === Number(jodi.year) - 1 ? entry.prev : null;
  const value = Array.isArray(row) ? row[slot] : null;
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}
// The product read for an area: the one asked for, or its stand-in when the area carries only that.
function oilCompareProduct(jodi, code, product) {
  const own = jodi && jodi.data && jodi.data[code] && typeof jodi.data[code] === 'object' ? jodi.data[code] : {};
  const standIn = OIL_COMPARE_STAND_IN[product];
  return !own[product] && standIn && own[standIn] ? standIn : product;
}
// [product, flow] pairs the table reads for an area.
function oilCompareFlows(jodi, code) {
  return [...OIL_COMPARE_CRUDE, ...OIL_COMPARE_PRODUCTS.flatMap(product => {
    const key = oilCompareProduct(jodi, code, product);
    return [[key, 'REFGROUT'], [key, 'TOTEXPSB']];
  })];
}
// The months, newest first, from jodi.latest back to January of the year before jodi.year: the two
// years the payload holds.
function oilCompareMonths(jodi) {
  const top = oilCompareIndex(jodi && jodi.latest), first = (Number(jodi && jodi.year) - 1) * 12;
  if (Number.isNaN(top) || !Number.isFinite(first)) return [];
  const months = [];
  for (let i = top; i >= first; i--) months.push(oilCompareMonth(i));
  return months;
}
// The months in which an area has a value in at least one flow of the table, newest first.
function oilCompareReported(jodi, code) {
  const flows = oilCompareFlows(jodi, code);
  return oilCompareMonths(jodi).filter(month => flows.some(([product, flow]) => oilCompareValue(jodi, code, product, flow, month) !== null));
}
// The table's month: {month, latest, all, codes, late, omitted, pool, reporters}. `codes` are the
// areas with any flow of the table, in the payload's order; `late` = [[code, newest month]] of
// those left out of the choice; `omitted` the areas the payload lists without any of these flows.
// `all` is false only when no month of the two years has every area of the choice; the month is
// then the newest one with the most of them. null without a usable JODI section.
function oilCompareWindow(jodi) {
  if (!jodi || typeof jodi !== 'object' || Number.isNaN(oilCompareIndex(jodi.latest)) || !jodi.data || typeof jodi.data !== 'object' ||
      !jodi.countries || typeof jodi.countries !== 'object') return null;
  const top = oilCompareIndex(jodi.latest);
  const reported = new Map(), omitted = [];
  for (const code of Object.keys(jodi.countries)) {
    const months = oilCompareReported(jodi, code);
    if (months.length) reported.set(code, new Set(months));
    else omitted.push(code);
  }
  if (!reported.size) return null;
  const codes = [...reported.keys()];
  const newest = code => [...reported.get(code)].sort().at(-1);
  const late = codes.filter(code => top - oilCompareIndex(newest(code)) >= OIL_COMPARE_LATE);
  const pool = late.length < codes.length ? codes.filter(code => !late.includes(code)) : codes;
  const count = month => pool.filter(code => reported.get(code).has(month)).length;
  const months = oilCompareMonths(jodi);
  let month = months.find(m => count(m) === pool.length);
  const all = Boolean(month);
  if (!month) month = months.reduce((best, m) => count(m) > count(best) ? m : best, months[0]);
  return {month, latest: jodi.latest, all, codes, omitted, pool: pool.length, reporters: count(month),
          late: pool === codes ? [] : late.map(code => [code, newest(code)])};
}
// One area in one month for one product. Missing values stay null; the two computed ones are null
// unless both of their inputs are there (and the intake is above zero for the yield).
function oilCompareRow(jodi, code, month, product) {
  const key = oilCompareProduct(jodi, code, product);
  const value = (p, flow) => oilCompareValue(jodi, code, p, flow, month);
  const intake = value('CRUDEOIL', 'REFINOBS'), output = value(key, 'REFGROUT'), exports = value(key, 'TOTEXPSB');
  return {code, product: key, standIn: key !== product,
          production: value('CRUDEOIL', 'INDPROD'), crudeExports: value('CRUDEOIL', 'TOTEXPSB'), intake,
          output, exports, net: output !== null && exports !== null ? output - exports : null,
          yield: output !== null && intake !== null && intake > 0 ? output / intake * 100 : null};
}

(() => {
  const NONE = '<p class="note">자료 없음</p>';
  const HOSTS = ['oil-country-compare-data', 'oil-country-compare-pick', 'oil-country-compare-basis'];
  const host = id => document.getElementById(id);
  const none = () => HOSTS.forEach((id, i) => { const el = host(id); if (el) el.innerHTML = i ? '' : NONE; });
  try {
    if (!HOSTS.every(host)) return;
    const live = window.ENERGY_LIVE;
    const supply = live && live.supply && live.supply.ok === true ? live.supply : null;
    const jodi = supply && supply.jodi && typeof supply.jodi === 'object' ? supply.jodi : null;
    const win = oilCompareWindow(jodi);
    if (!win) { none(); return; }

    const esc = value => String(value ?? '').replace(/[&<>"']/g, c =>
      ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    // A number is printed from its rounded value, so the sign follows what is shown.
    const fmt = (value, digits = 0) => {
      const shown = Number(value.toFixed(digits));
      return (shown < 0 ? '−' : '') + Math.abs(shown).toLocaleString('en-US', {minimumFractionDigits: digits, maximumFractionDigits: digits});
    };
    const monthKo = month => Number(month.slice(0, 4)) + '년 ' + Number(month.slice(5, 7)) + '월';
    const time = month => '<time datetime="' + esc(month) + '">' + monthKo(month) + '</time>';
    // Particles follow the last Hangul syllable: 은/는, 을/를, and the copula 이다/다.
    const final = word => {
      const ch = [...String(word)].reverse().find(c => c >= '가' && c <= '힣');
      return ch ? (ch.charCodeAt(0) - 0xAC00) % 28 > 0 : false;
    };
    const topic = word => esc(word) + (final(word) ? '은' : '는');
    const object = word => esc(word) + (final(word) ? '을' : '를');
    const copula = word => esc(word) + (final(word) ? '이다' : '다');
    const name = code => jodi.countries[code] && jodi.countries[code].name ? String(jodi.countries[code].name) : code;
    // Names joined with '·', unescaped: the particle helpers escape them.
    const names = codes => codes.map(name).join('·');
    const label = product => jodi.products && jodi.products[product] ? String(jodi.products[product]) : product;
    const unknown = '<span class="note">미확인</span>';
    const cell = (value, digits = 0, unit = '') => value === null ? unknown : fmt(value, digits) + unit;
    const month = win.month;

    // ---- the picker: products at least one area of the table carries ----------------------
    const products = OIL_COMPARE_PRODUCTS.filter(product => win.codes.some(code => (jodi.data[code] || {})[oilCompareProduct(jodi, code, product)]));
    if (!products.length) products.push(OIL_COMPARE_PRODUCTS[0]);
    host('oil-country-compare-pick').innerHTML = '<div class="inputs compare-inputs"><label for="oil-country-compare-product">제품' +
      '<select id="oil-country-compare-product">' + products.map((product, i) => '<option value="' + esc(product) + '"' + (i ? '' : ' selected') + '>' +
        esc(label(product)) + '</option>').join('') + '</select></label></div>';

    // ---- the table and the sentences above it ---------------------------------------------
    const REGIONS = [['europe', '유럽'], ['asia', '아시아·태평양'], ['americas', '미주'], ['mideast', '중동·아프리카']];
    const lateMonth = new Map(win.late);
    const draw = product => {
      const rows = win.codes.map(code => oilCompareRow(jodi, code, month, product));
      const order = new Map(win.codes.map((code, i) => [code, i]));
      // Largest crude intake first; an area without it after the others, in the payload's order.
      const sorted = list => [...list].sort((a, b) => (b.intake ?? -1) - (a.intake ?? -1) || order.get(a.code) - order.get(b.code));
      const region = row => (jodi.countries[row.code] || {}).region;
      const groups = [...REGIONS.map(([key, title]) => [title, rows.filter(row => region(row) === key)]),
        ['기타', rows.filter(row => !REGIONS.some(([key]) => region(row) === key))]];
      const line = row => {
        const head = esc(name(row.code)) + (lateMonth.has(row.code) ? '<small>최근 보고 ' + monthKo(lateMonth.get(row.code)) + '</small>' : '');
        // A product cell read from the stand-in says which product it is.
        const standIn = value => value === null || !row.standIn ? '' : '<small>' + esc(label(row.product)) + '</small>';
        return '<tr><th scope="row">' + head + '</th><td>' + cell(row.production) + '</td><td>' + cell(row.crudeExports) + '</td><td>' + cell(row.intake) + '</td>' +
          '<td>' + cell(row.output) + standIn(row.output) + '</td><td>' + cell(row.exports) + standIn(row.exports) + '</td>' +
          '<td>' + cell(row.net) + standIn(row.net) + '</td><td>' + cell(row.yield, 1, '%') + standIn(row.yield) + '</td></tr>';
      };
      const body = groups.filter(([, list]) => list.length)
        .map(([title, list]) => '<tr class="sc-region"><th colspan="8">' + esc(title) + '</th></tr>' + sorted(list).map(line).join('')).join('');
      const p = esc(label(product));
      const head = ['국가', '원유 생산<small>INDPROD</small>', '원유 수출<small>TOTEXPSB</small>', '정제 투입<small>REFINOBS</small>',
        p + ' 정유 생산<small>REFGROUT</small>', p + ' 수출<small>TOTEXPSB</small>', p + ' 순공급(계산)<small>REFGROUT − TOTEXPSB</small>',
        p + ' 수율(계산)<small>REFGROUT ÷ REFINOBS</small>'];
      const table = '<div class="table-scroll"><table class="market-table sc-table sc-country"><thead><tr>' +
        head.map(text => '<th scope="col">' + text + '</th>').join('') + '</tr></thead><tbody>' + body + '</tbody></table></div>';
      // The judgment first: the areas that export more crude than they refine. The yields are not
      // ranked: JODI's product split follows each area's reporting practice, so the highest and the
      // lowest yield can be a reporting difference (Spain's jet fuel, Australia's zero naphtha in
      // the 2026-11-22 snapshot) and not a finding; the fold says so.
      const exporters = rows.filter(row => row.crudeExports !== null && row.intake !== null && row.crudeExports > row.intake)
        .sort((a, b) => b.crudeExports - a.crudeExports || order.get(a.code) - order.get(b.code));
      const lead = exporters.length ? monthKo(month) + ' 원유 수출이 정제 투입보다 많은 나라는 ' + copula(names(exporters.map(row => row.code))) + '.' : '';
      host('oil-country-compare-data').innerHTML = (lead ? '<p class="sc-headline">' + lead + '</p>' : '') + table;
    };

    // ---- notes ------------------------------------------------------------------------------
    const lateCodes = win.late.map(([code]) => code);
    const counted = (lateCodes.length ? object(names(lateCodes)) + ' 뺀 ' : '표의 ') + win.pool + '개국';
    const choice = !win.all ? counted + '이 모두 보고한 달은 최근 2년 안에 없어, 가장 많은 ' + win.reporters + '개국이 보고한 최근 달을 썼다.'
      : month === win.latest ? 'JODI 최신 월이며 ' + counted + '이 모두 보고했다.'
        : counted + '이 모두 보고한 가장 최근 달이며, JODI 최신 월은 ' + copula(monthKo(win.latest)) + '.';
    const late = lateCodes.length ? '<p class="note">' + topic(names(lateCodes)) + ' 최근 보고 월이 JODI 최신 월보다 ' + OIL_COMPARE_LATE +
      '개월 이상 앞서 기준 월 산정에서 뺐다.</p>' : '';
    const stamp = new Date(supply.fetched_at);
    const updated = !supply.fetched_at || Number.isNaN(stamp.getTime()) ? '' : (() => {
      const part = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hourCycle: 'h23'}).formatToParts(stamp).map(({type, value}) => [type, value]));
      return '갱신 ' + part.year + '.' + part.month + '.' + part.day + ' ' + part.hour + ':' + part.minute + ' KST';
    })();
    const source = '<p class="note context-caption"><a target="_blank" rel="noopener noreferrer" href="https://www.jodidata.org/oil/database/data-downloads.aspx">' +
      'JODI-Oil 세계 데이터베이스</a> 월간 CSV' + (updated && ' · ' + updated) + (jodi.carried ? ' · 이번 갱신에서 받지 못해 이전 값을 유지했다' : '') + '</p>';
    const definitions = '<div class="table-scroll"><table class="market-table text-table"><thead><tr><th scope="col">열</th><th scope="col">JODI 품목·흐름</th><th scope="col">정의</th></tr></thead><tbody>' + [
      ['원유 생산', 'CRUDEOIL · INDPROD', '국내에서 생산한 원유다.'],
      ['원유 수출', 'CRUDEOIL · TOTEXPSB', '원유 총수출량이다.'],
      ['정제 투입', 'CRUDEOIL · REFINOBS', '정유소에 투입한 원유다. NGL과 기타 원료는 들지 않는다.'],
      ['정유 생산', '제품 · REFGROUT', '고른 제품의 정유소 생산량이다.'],
      ['수출', '제품 · TOTEXPSB', '고른 제품의 총수출량이다.'],
      ['순공급(계산)', 'REFGROUT − TOTEXPSB', '정유 생산에서 수출을 뺀 값이다. 수입과 재고 변화는 넣지 않았다. 음수면 수출이 정유 생산보다 많다.'],
      ['수율(계산)', 'REFGROUT ÷ CRUDEOIL REFINOBS × 100', '고른 제품의 정유 생산을 원유 정제 투입으로 나눈 값(%)이다.']
    ].map(([column, code, text]) => '<tr><th scope="row">' + column + '</th><td>' + code + '</td><td>' + text + '</td></tr>').join('') + '</tbody></table></div>';
    const notes = [
      '수율(계산)은 나라 사이 순위를 매기지 않고 칸에만 싣는다. JODI의 제품 구분은 나라별 보고 관행을 따르므로, 다른 나라와 크게 벌어지거나 0인 ' +
        '수율에는 실제 정유 수율이 아닌 보고 기준 차이가 섞일 수 있다.',
      '수율의 분모는 원유 정제 투입뿐이어서, NGL·기타 원료·첨가제를 많이 쓰는 나라의 수율은 정유소 전체 투입 대비 수율보다 높게 나온다. 제품별 수급 화면의 미국 EIA 수율은 원유·미완성유 등 전체 투입 대비라 값이 다르다.',
      'LPG 정유 생산은 정유소 생산분만이다. 가스처리시설에서 분리한 LPG도 수출에 들어가므로 산유국의 LPG 순공급(계산)은 음수가 될 수 있다.',
      ...Object.entries(OIL_COMPARE_STAND_IN).map(([product, standIn]) => [product, standIn, win.codes.filter(code => oilCompareProduct(jodi, code, product) === standIn)])
        .filter(([, , codes]) => codes.length)
        .map(([product, standIn, codes]) => topic(names(codes)) + ' ' + object(label(product)) + ' 따로 보고하지 않아 ' + esc(label(product)) + ' 열에 ' +
          esc(label(standIn)) + ' 값을 쓴다.'),
      '기준 월은 JODI 최신 월부터 한 달씩 거슬러, 표의 나라가 모두 원유 생산·수출·정제 투입과 ' + esc(OIL_COMPARE_PRODUCTS.map(label).join(', ')) +
        '의 정유 생산·수출 가운데 하나 이상에 값을 낸 첫 달이다. 고른 제품 열이 모두 미확인인 나라도 다른 흐름에 값이 있으면 보고한 나라로 센다. ' +
        '최근 보고 월이 JODI 최신 월보다 ' + OIL_COMPARE_LATE + '개월 이상 앞선 나라는 이 판단에서 뺀다. 기준 월에 값이 없는 칸은 다른 달 값으로 채우지 않는다.',
      'JODI가 미평가(평가 코드 3)로 실은 0은 수집 단계에서 미보고로 보고 뺐다. 평가된 0은 보고된 값이라 그대로 싣는다.',
      ...(win.omitted.length ? [topic(names(win.omitted)) + ' 표의 흐름을 싣지 않아 행을 두지 않았다.'] : [])
    ];
    host('oil-country-compare-basis').innerHTML = '<p class="note">모든 칸은 ' + monthKo(month) + ' 한 달 값이다. ' + choice +
      ' 이 달 값이 없는 칸은 다른 달로 채우지 않고 미확인으로 두었다. 단위는 JODI 원자료의 천 배럴/일(KBD)이며 환산하지 않았다. 수율만 %다.</p>' + late + source +
      '<details class="method"><summary>열 정의와 기준 월</summary>' + definitions + notes.map(text => '<p class="note">' + text + '</p>').join('') + '</details>';

    draw(products[0]);
    const asof = host('oil-country-compare-asof');
    if (asof) asof.innerHTML = '기준 ' + time(month) + ' · JODI 월간';
    const picker = host('oil-country-compare-product');
    if (picker) picker.addEventListener('change', () => {
      try {
        draw(products.includes(picker.value) ? picker.value : products[0]);
      } catch (err) {
        console.error('oil country compare: table not redrawn', err);
      }
    });
  } catch (err) {
    console.error('oil country compare: section not drawn', err);
    none();
  }
})();
