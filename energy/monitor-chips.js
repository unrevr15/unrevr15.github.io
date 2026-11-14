'use strict';
// Home-record chips of the market monitor (plan §4 monitor-chips; ledger rows
// monitor-futures … physical-summary). The monitor used to redraw values whose
// home is a desk section. Each chip shows one home value, its period and
// comparison, with a link to the home. Most chips read the constant the home
// draws; HOME_TEXT holds the two values a home writes as text, and
// test_energy_monitor.py checks they still appear there. A chip whose data is
// missing is left out, a row with nothing in it is hidden, and with no row
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
  const tone = value => value > 0 ? 'live-up' : value < 0 ? 'live-down' : '';
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
  const chip = ({label, value, unit, valueTone, when, compare, change, home}) =>
    '<a class="live-chip" href="#' + home + '"><span>' + esc(label) + ' ↗</span><b' + (valueTone ? ' class="' + valueTone + '"' : '') + '>' +
    esc(value) + (unit ? ' <i>' + esc(unit) + '</i>' : '') + '</b><small>' + esc(when) +
    (compare ? ' · ' + esc(compare) + (change ? ' <em class="' + textTone(change) + '">' + esc(change) + '</em>' : '') : '') + '</small></a>';

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
      () => ({label:'걸프 제품 수출 회복', ...HOME_TEXT.gulfProducts, compare:'전쟁 전 = 100%', home:'physical-crude'}),
      () => {
        const [, , , value, change] = balanceRow('flows', 'LNG');
        return {label:'호르무즈 통과 LNG', value:fmt(value, 1), unit:'십억 입방피트/일', when:after('flows'), compare:'전년비', change, home:'gas-flows'};
      },
      () => {
        const [, , , value, change] = balanceRow('gas', 'EU 지하 저장률');
        return {label:'EU 가스 저장률', value:fmt(value, 1) + '%', when:pick(balances.gas.period, /^(\S+ \S+)/), compare:'전년비', change, home:'gas-storage'};
      },
      () => ({label:'세계 관측 석유 재고', ...HOME_TEXT.worldStocks, valueTone:textTone(HOME_TEXT.worldStocks.value), home:'oil-balance'}),
      () => {
        // The published change is in the row's unit, not % (the 2025 level is
        // back-calculated from it), so the unit goes with the change.
        const [, scope, , value, change] = balanceRow('refining', '세계 정유 처리량');
        const [month, unit] = scope.split(' · ');
        return {label:'세계 정유 처리량', value:fmt(value, 1), unit, when:'2026년 ' + month, compare:'전년비', change:change + ' ' + unit, home:'oil-throughput'};
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
        return {label:'브렌트 선물', value:fmt(brent.prices.at(-1), 2), unit:'달러/배럴', when:nearbyDays.at(-1) + ' · ' + brent.maturity, home:'futures-physical'};
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
        return {label:'FAO 식량가격지수', value:signed(change), valueTone:tone(change), when:'10월 · 전월비', home:'food-price-index'};
      },
      () => {
        const spread = ([, cash, threeMonths]) => cash - threeMonths;
        const [start, latest] = [copperLmePrices[0], copperLmePrices.at(-1)];
        return {label:'LME 구리 현물 − 3개월물', value:signed(spread(latest), 0, ''), unit:'달러/톤', when:latest[0],
          compare:start[0] + ' 대비', change:signed(spread(latest) - spread(start), 0, ''), home:'copper-physical'};
      },
      () => {
        const [, [, september], yearly] = usPceChanges.find(([name]) => name.startsWith('개인소비지출(PCE) 물가'));
        return {label:'미국 PCE 물가', value:signed(september), valueTone:tone(september), when:'9월 · 전월비', compare:'전년비', change:signed(yearly),
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
    const strip = row.querySelector('.live-strip');
    strip.insertAdjacentHTML('afterbegin', chips.join(''));
    if (!strip.children.length) row.hidden = true;
    else shown += 1;
  }
  if (!shown) panel.hidden = true;
})();
