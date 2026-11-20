'use strict';
// Home-record rows of the market monitor (plan §4 monitor-chips; ledger rows
// monitor-futures … physical-summary). The monitor used to redraw values whose
// home is a desk section. Each row of the table shows one home value, its
// period and comparison, with the name linking to the home. Most rows read the
// constant the home draws; HOME_TEXT holds the two values a home writes as
// text, and test_energy_monitor.py checks they still appear there. A row whose
// data is missing is left out, a group with nothing in it is hidden, and with no group
// left the panel is hidden. Runs after the desk scripts whose constants it
// reads (index.html loads it after physical-comparisons.js).
(() => {
  const panel = document.getElementById('monitor-chips');
  if (!panel) return;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt = (value, digits) => {
    if (!Number.isFinite(value)) throw new Error('monitor chips: not a number');
    return value.toLocaleString('en-US', {minimumFractionDigits:digits, maximumFractionDigits:digits});
  };
  const signed = (value, digits = 1, unit = '%') => (value > 0 ? '+' : value < 0 ? '−' : '') + fmt(Math.abs(value), digits) + unit;
  // research.js writes a change as text: '−31.1%', '약 −9%p', '+10.6%'.
  const textTone = text => /^(?:약 )?−/.test(text) ? 'live-down' : /^(?:약 )?\+/.test(text) ? 'live-up' : '';
  const pick = (text, pattern) => {
    const m = String(text).match(pattern);
    if (!m) throw new Error('monitor chips: no period in ' + text);
    return m[1];
  };
  const balanceRow = (key, label) => {
    const found = balances[key].rows.find(([name]) => name === label);
    if (!found) throw new Error('monitor chips: no row ' + label + ' in balances.' + key);
    return found;
  };
  // Period of a balances table: the 2026 side of '2025.10.31 ↔ 2026.10.30 …'.
  const after = key => pick(balances[key].period, /↔ (\S+(?: \d분기| 1~\d+월)?)/);
  // 값 holds a level in ink; a change goes to 변화 in its tone. A row with two
  // changes (PCE: 전월비 / 전년비) colours each one.
  // Korean in a number cell ('약', '억') keeps the text font.
  const kr = text => esc(text).replace(/[가-힣]+/g, word => '<span class="kr">' + word + '</span>');
  // Dates as the heatmap writes them: a day is mm.dd ('11월 5일', '2026.10.30' → '11.05', '10.30'); a month keeps its words.
  const day = text => String(text ?? '').replace(/(\d{1,2})월 (\d{1,2})일/g, (_, m, d) => m.padStart(2, '0') + '.' + d.padStart(2, '0'))
    .replace(/^20\d\d\.(\d\d\.\d\d)$/, '$1');
  const toned = text => textTone(text) ? '<span class="' + textTone(text) + '">' + kr(text) + '</span>' : kr(text);
  const chip = ({label, value, unit, when, compare, change, home}) => {
    const changes = [].concat(change ?? []);
    const single = changes.length === 1 && textTone(changes[0]) ? ' ' + textTone(changes[0]) : '';
    // The unit is small text beside the name, as the heatmap writes it.
    return '<tr class="mc-item"><th scope="row"><a href="#' + home + '">' + esc(label) + '</a>' + (unit ? ' <small>' + esc(unit) + '</small>' : '') + '</th>' +
      '<td class="num">' + (value ? '<b>' + kr(value) + '</b>' : '') + '</td>' +
      '<td>' + esc(day(when)) + '</td><td>' + esc(day(compare)) + '</td>' +
      '<td class="num' + single + '">' + (changes.length > 1 ? changes.map(toned).join(' / ') : kr(changes[0] || '')) + '</td></tr>';
  };

  // Values whose home writes them as text: #cargo-basis (supply-followup.js)
  // and #oil-balance (index.html).
  const HOME_TEXT = {
    gulfProducts: {value:'약 40%', when:'2026년 9월'},
    worldStocks: {value:'−5.09억', unit:'배럴', when:'2026년 2월 말~9월 말'},
  };

  const rows = {
    supply: [
      () => {
        const [, , , value, change] = balanceRow('stocks', '전략비축유(SPR)');
        return {label:'미국 전략비축유', value:fmt(value, 1), unit:'백만 배럴', when:after('stocks'), compare:'전년비', change, home:'crude-stocks'};
      },
      () => {
        const [, , , value, change] = balanceRow('stocks', '중간유분');
        return {label:'미국 중간유분 재고', value:fmt(value, 1), unit:'백만 배럴', when:after('stocks'), compare:'전년비', change, home:'product-stock-comparison'};
      },
      // IEA September estimate; the home compares it with crude (75% 초과).
      () => ({label:'걸프 정제제품 수출', ...HOME_TEXT.gulfProducts, compare:'전쟁 전 = 100%', home:'physical-crude'}),
      () => {
        const [, , , value, change] = balanceRow('flows', 'LNG');
        return {label:'호르무즈 통과 LNG', value:fmt(value, 1), unit:'십억 입방피트/일', when:after('flows'), compare:'전년비', change, home:'gas-flows'};
      },
      () => {
        const [, , , value, change] = balanceRow('gas', 'EU 지하 저장률');
        return {label:'EU 가스 저장률', value:fmt(value, 1) + '%', when:pick(balances.gas.period, /^(\S+ \S+)/), compare:'전년비', change, home:'gas-storage'};
      },
      // A stock change over the period, so it is a 변화, not a level; its unit goes with it.
      () => {
        const {value, unit, when} = HOME_TEXT.worldStocks;
        return {label:'세계 관측 석유 재고', when, compare:'증감', change:value + ' ' + unit, home:'oil-balance'};
      },
      () => {
        // The published change is in the row's unit, not % (the 2025 level is
        // back-calculated from it); it prints without %, in the unit beside the name.
        const [, scope, , value, change] = balanceRow('refining', '세계 정유 처리량');
        const [month, unit] = scope.split(' · ');
        return {label:'세계 정유 처리량', value:fmt(value, 1), unit, when:'2026년 ' + month, compare:'전년 대비 증감', change, home:'oil-throughput'};
      },
      () => {
        const [, unit, , value, change] = balanceRow('korea', '에너지 수입액');
        return {label:'한국 에너지 수입액', value:fmt(value, 1), unit:unit.split(' · ')[0], when:after('korea'), compare:'전년비', change, home:'korea-imports'};
      },
    ],
    price: [
      () => {
        // Level and contract month (plan §4 monitor-futures) of the settlement the
        // home draws; the live front month is in the heatmap above.
        const brent = nearbySettlements.find(({label}) => label === 'Brent');
        return {label:'브렌트 선물 결제가', value:fmt(brent.prices.at(-1), 2), unit:'달러/배럴', when:nearbyDays.at(-1) + ' · ' + brent.maturity, home:'futures-physical'};
      },
      () => {
        const [, [, second, third]] = productQuarterCracks.find(([name]) => name === '미국 걸프 디젤');
        const change = (third / second - 1) * 100;
        return {label:'미국 디젤 크랙', value:fmt(third, 2), unit:'달러/배럴', when:'2026년 3분기', compare:'전분기비', change:signed(change), home:'diesel-transmission'};
      },
    ],
    inflation: [
      () => {
        const index = foodPriceSeptember.findIndex(([name]) => name === '식량가격지수');
        const change = foodPriceOctober[index];
        return {label:'FAO 식량가격지수', when:'2026년 10월', compare:'전월비', change:signed(change), home:'food-price-index'};
      },
      () => {
        const spread = ([, cash, threeMonths]) => cash - threeMonths;
        const [start, latest] = [copperLmePrices[0], copperLmePrices.at(-1)];
        return {label:'LME 구리 현물 − 3개월물', value:signed(spread(latest), 0, ''), unit:'달러/톤', when:latest[0],
          compare:start[0] + ' 대비', change:signed(spread(latest) - spread(start), 0, ''), home:'copper-physical'};
      },
      () => {
        const [, [, september], yearly] = usPceChanges.find(([name]) => name.startsWith('개인소비지출(PCE) 물가'));
        return {label:'미국 PCE 물가', when:'2026년 9월', compare:'전월비 / 전년비', change:[signed(september), signed(yearly)],
          home:'consumer-pass-through'};
      },
    ],
  };

  let shown = 0;
  for (const [key, builders] of Object.entries(rows)) {
    const row = document.getElementById('monitor-chips-' + key);
    if (!row) continue;
    const chips = [];
    for (const build of builders) {
      try {
        chips.push(chip(build()));
      } catch (err) {
        console.error('monitor: home chip not built', err);
      }
    }
    row.insertAdjacentHTML('beforeend', chips.join(''));
    if (!chips.length) row.hidden = true;
    else shown += 1;
  }
  if (!shown) panel.hidden = true;
})();
