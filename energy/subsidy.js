'use strict';
// 연료 보조금·재정 views of the 물가전이 desk. Reads fuelSubsidy
// (subsidy-data.js: each country's fuel-subsidy budget, spending, oil-price
// assumption, measures and fiscal effect, every figure with its source) and the
// live Brent monthly means (window.ENERGY_LIVE.series.brent, energy_live.py), so
// the budget oil-price assumptions and the 2026 measures sit against this
// year's prices. Runs before workspace.js, which puts the overview and the
// region sections in the desk's 연료 보조금 view (deskViews.inflation).
(() => {
  const desk = document.getElementById('inflation');
  if (!desk || typeof fuelSubsidy === 'undefined' || !fuelSubsidy || !Array.isArray(fuelSubsidy.countries)) return;
  try {
    const D = fuelSubsidy;
    const NOTES = D.notes || {};
    const YEAR = Number(String(D.as_of || '').slice(0, 4)) || new Date().getFullYear();
    const LIVE = window.ENERGY_LIVE || {};
    const BRENT = LIVE.ok === true ? LIVE.series?.brent : null;

    // ---- formatting -------------------------------------------------------
    const esc = value => String(value ?? '').replace(/[&<>"']/g, c =>
      ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const safeUrl = url => /^https?:\/\//i.test(String(url || '')) ? esc(url) : '';
    const ok = v => v !== null && v !== undefined && v !== '' && Number.isFinite(Number(v));
    const fmt = (v, d = 0) => ok(v) ? Number(v).toLocaleString('en-US', {minimumFractionDigits: d, maximumFractionDigits: d}) : '—';
    const srcDecimals = v => (String(v).split('.')[1] || '').length;
    // Budget amounts: the source's decimals, fewer for large numbers.
    const decimals = v => {
      const a = Math.abs(Number(v));
      return Math.min(srcDecimals(v), a >= 1000 ? 0 : a >= 100 ? 1 : a >= 1 ? 2 : 3);
    };
    // Prices and oil-price assumptions exactly as the source wrote them.
    const exact = v => fmt(v, Math.min(srcDecimals(v), 3));
    // "2026-05-14~16" -> "2026년 5월 14일~16일", "2026 초" -> "2026년 초"; qualifiers stay.
    const dateKo = raw => String(raw ?? '')
      .replace(/(\d{4})-(\d{2})(?:-(\d{2}))?/g, (_, y, m, d) => y + '년 ' + Number(m) + '월' + (d ? ' ' + Number(d) + '일' : ''))
      .replace(/^(\d{4})(?![\d년-])/, '$1년')
      .replace(/일~(\d{2})-(\d{2})/, (_, m, d) => '일~' + Number(m) + '월 ' + Number(d) + '일')
      .replace(/일~(\d{1,2})(?![\d월])/, (_, d) => '일~' + Number(d) + '일')
      .replace(/월~(\d{1,2})(?![\d월일])/, (_, m) => '월~' + Number(m) + '월');
    const dateText = raw => esc(dateKo(raw));
    // Calendar positions of a measure, [month 0-11, day, exact?], one per date
    // it names ("A·B" names two). A range, a month or part of one ("초/중순/
    // 하순·말") and an unconfirmed day are approximate; a year alone has none.
    const whenAll = raw => String(raw ?? '').split('·').map(part => {
      const s = part.trim();
      const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?/.exec(s);
      if (!m || Number(m[1]) !== YEAR) return null;
      const rest = s.slice(m[0].length);
      if (m[3]) return [Number(m[2]) - 1, Number(m[3]), !/~|미확인|이후|무렵|경/.test(rest)];
      return [Number(m[2]) - 1, /초/.test(rest) ? 5 : /하순|말/.test(rest) ? 25 : 15, false];
    }).filter(Boolean);
    const dayOf = at => at[0] * 30.5 + at[1];
    const KIND = {budget: '예산', revised: '수정치', realised: '집행', estimate: '추정', balance: '잔액'};
    const kindOf = it => esc(it.kind_label || KIND[it.kind] || '');
    // Fiscal-year label of an item's year, by the country's year rule.
    const fyLabel = (c, y) => !ok(y) ? '' : c.fy_year === 'end' ? 'FY' + (y - 1) + '/' + String(y).slice(2)
      : c.fy_year === 'start' ? 'FY' + y + '-' + String(y + 1).slice(2) : y + '년';
    const period = (c, it) => esc(it.period || fyLabel(c, it.year));
    const perUnit = it => String(it?.unit || '').includes('/') ? '/' + String(it.unit).split('/').slice(1).join('/') : '';
    // Korean money units: 십억 and 크로르 become 억, billion USD 억 달러, and
    // 10,000억 and up read as N조 N,NNN억.
    const amountText = it => {
      let v = Number(it.amount), unit = String(it.unit || '').replace(/\s*\(lakh crore\)/i, '');
      if (/^십억\s*/.test(unit)) { v = Number((v * 10).toFixed(6)); unit = unit.replace(/^십억\s*/, '억 '); }
      else if (/^크로르\s*/.test(unit)) { v = Number((v / 10).toFixed(6)); unit = unit.replace(/^크로르\s*/, '억 '); }
      else if (/^billion USD/i.test(unit)) { v = Number((v * 10).toFixed(6)); unit = unit.replace(/^billion USD/i, '억 달러'); }
      if (/^억/.test(unit) && Math.abs(v) >= 10000) {
        let jo = Math.trunc(v / 10000), eok = Math.round(v - jo * 10000);
        if (eok >= 10000) { jo += 1; eok -= 10000; }
        return fmt(jo, 0) + '조' + (eok ? ' ' + fmt(eok, 0) + '억' : '') + unit.slice(1);
      }
      return fmt(v, decimals(v)) + (/^[가-힣]/.test(unit) ? '' : ' ') + unit;
    };
    const amount = it => '<span class="sb-amt">' + esc(amountText(it)) + '</span>';
    // Dollars in 억 달러, or 만 달러 below that.
    const usdText = it => {
      if (!ok(it?.usd_bn)) return '';
      const eok = Number(it.usd_bn) * 10;
      return '약 ' + (eok >= 1 ? fmt(eok, eok >= 10 ? 0 : 1) + '억' : fmt(eok * 1e4, 0) + '만') + ' 달러' + perUnit(it);
    };
    const usd = it => esc(usdText(it));
    const CUR = {IDR: '루피아', MYR: '링깃', THB: '바트', VND: '동', PHP: '페소', INR: '루피', PKR: '루피', BDT: '타카', LKR: '루피',
                 EGP: '이집트파운드', NGN: '나이라', KRW: '원', JPY: '엔', CNY: '위안'};
    // "계산: 2026-11-07 환율 4.06 MYR/USD, 월 기준" -> "2026년 11월 7일 환율(1달러=4.06링깃)로 계산, 월 기준".
    const usdNote = note => String(note || '').replace(/^계산: (\d{4}-\d{2}-\d{2}) 환율 ([\d,.]+) ([A-Z]{3})\/USD/, (_, d, r, cur) =>
      dateKo(d) + ' 환율(1달러=' + r.replace(/\.00$/, '') + (CUR[cur] || ' ' + cur) + ')로 계산');
    const gdp = it => ok(it?.pct_gdp) ? '<small>GDP 대비 ' + fmt(it.pct_gdp, 2) + '%' + (/^계산/.test(String(it.pct_note || '')) ? '(계산)' : '') + '</small>' : '';
    // When a spending figure applies: its period and the day it runs to.
    const spanOf = it => [it.period ? esc(it.period) : '', it.period_end ? dateText(it.period_end) + '까지' : ''].filter(Boolean).join(' · ');
    const bench = s => String(s || '').replace(/^Brent/, '브렌트');
    const bopLabel = b => [bench(b.benchmark), b.period, b.basis].filter(Boolean).join(' · ');
    const perBarrel = v => exact(v) + '달러/배럴';
    // Particles after a Korean word: pair[0] after a final consonant (은/이/과/을).
    const finalOf = word => {
      const code = String(word).charCodeAt(String(word).length - 1);
      return code >= 0xac00 && code <= 0xd7a3 ? (code - 0xac00) % 28 : 0;
    };
    const particle = (word, pair) => finalOf(word) ? pair[0] : pair[1];
    const ro = word => { const f = finalOf(word); return f && f !== 8 ? '으로' : '로'; };
    const josa = (word, pair) => word + particle(word, pair);
    const names = list => esc(list.map(c => c.name_kr).join('·'));
    const headOf = label => String(label).replace(/\([^()]*\)$/, '');

    // Brent this year: complete months, and the running month apart.
    const brent = (() => {
      const monthly = BRENT?.monthly || {};
      const months = Object.keys(monthly).filter(m => m.startsWith(YEAR + '-') && ok(monthly[m])).sort();
      if (!months.length) return null;
      const p = BRENT.partial_month;
      return {months, monthly, partial: p && String(p.month).startsWith(YEAR + '-') && ok(p.value) ? p : null};
    })();
    // Brent over a budget's own period: the complete months from `from` (YYYY-MM).
    const brentOver = from => {
      if (!brent) return null;
      const ms = brent.months.filter(m => m >= (from || YEAR + '-01'));
      if (!ms.length) return null;
      const vals = ms.map(m => Number(brent.monthly[m]));
      const a = Number(ms[0].slice(5)), b = Number(ms.at(-1).slice(5));
      return {avg: vals.reduce((s, v) => s + v, 0) / vals.length, lo: Math.min(...vals), hi: Math.max(...vals),
              first: ms[0], span: a === b ? a + '월' : a + '~' + b + '월'};
    };
    const versus = (v, ref) => {
      const d = Number(v) - ref.avg;
      return YEAR + '년 ' + ref.span + ' 브렌트 평균(' + fmt(ref.avg, 1) + '달러)보다 ' + fmt(Math.abs(d), 1) + '달러 ' + (d < 0 ? '낮음' : '높음');
    };

    // ---- notes for chart marks: hover, focus, or a first tap ------------------
    const tip = document.createElement('div');
    tip.className = 'sb-tip';
    tip.hidden = true;
    tip.setAttribute('aria-hidden', 'true');
    document.body.append(tip);
    let tipFor = null, armed = null, shownAt = 0, pointer = 'mouse';
    const showTip = el => {
      const text = el.getAttribute('data-tip');
      if (!text) return;
      tip.textContent = text;
      tip.hidden = false;
      const r = el.getBoundingClientRect();
      const w = tip.offsetWidth, h = tip.offsetHeight;
      const x = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), document.documentElement.clientWidth - w - 8);
      const above = r.top - h - 8;
      tip.style.left = x + window.scrollX + 'px';
      tip.style.top = (above > 8 ? above : r.bottom + 8) + window.scrollY + 'px';
      tipFor = el;
      shownAt = performance.now();
    };
    const hideTip = () => { tip.hidden = true; tipFor = null; };
    const tipTarget = e => {
      const el = e.target.closest?.('[data-tip]');
      return el && desk.contains(el) ? el : null;
    };
    document.addEventListener('pointerdown', e => {
      pointer = e.pointerType || 'mouse';
      armed = tip.hidden ? null : tipFor;
      if (!tipTarget(e)) hideTip();
    }, true);
    document.addEventListener('pointerover', e => { if (e.pointerType !== 'touch') { const el = tipTarget(e); if (el) showTip(el); } });
    document.addEventListener('pointerout', e => { if (e.pointerType !== 'touch' && tipTarget(e)) hideTip(); });
    document.addEventListener('focusin', e => { const el = tipTarget(e); if (el) showTip(el); });
    document.addEventListener('focusout', e => { if (tipTarget(e) && pointer !== 'touch') hideTip(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') hideTip(); });
    // On a touch screen the first tap on a mark shows its note and a second tap
    // follows its link (workspace.js skips clicks whose default is prevented).
    document.addEventListener('click', e => {
      const el = tipTarget(e);
      if (!el || pointer !== 'touch' || e.detail === 0 || !el.matches('a[href]')) return;
      if (armed === el) { hideTip(); return; }
      e.preventDefault();
      showTip(el);
    }, true);
    // A scroll right after showing is the browser bringing the mark into view.
    window.addEventListener('scroll', () => { if (performance.now() - shownAt > 300) hideTip(); }, {passive: true});

    // ---- sections ------------------------------------------------------------
    const sections = [];
    function section(id, title, metaHtml) {
      const el = document.createElement('section');
      el.className = 'section sb-section';
      el.id = id;
      el.innerHTML = '<div class="section-head"><h2>' + esc(title) + '</h2>' + (metaHtml ? '<span class="meta">' + metaHtml + '</span>' : '') + '</div>';
      sections.push(el);
      return el;
    }
    const cardId = c => 'sb-' + String(c.code).toLowerCase().replace(/[^a-z0-9]/g, '');
    // [n] goes to the source's entry in the card's own list.
    const refs = (c, ids) => (ids || []).map(id => {
      const s = (c.sources || []).find(x => x.id === id);
      return s ? '<a class="ref" href="#' + cardId(c) + '-src-' + Number(id) + '" title="' + esc(s.title) + '" aria-label="출처 ' + Number(id) + ': ' + esc(s.title) + '">[' + Number(id) + ']</a>' : '';
    }).join('');
    const item = (c, key) => Number.isInteger(c[key]) && c.items?.[c[key]] ? c.items[c[key]] : null;
    const rows = D.countries.map(c => ({c, budget: item(c, 'overview_budget'), spent: item(c, 'overview_realised')}));
    const assumed = D.countries.filter(c => ok(c.budget_oil_price?.value));
    const compared = assumed.map(c => ({c, v: Number(c.budget_oil_price.value), ref: brentOver(c.budget_oil_price.from)})).filter(x => x.ref);
    // "1~10월 96.3달러, 이집트는 7~10월 103.2달러": one entry per Brent window.
    const windows = new Map();
    for (const x of compared) {
      if (!windows.has(x.ref.first)) windows.set(x.ref.first, {ref: x.ref, own: []});
      if (x.c.budget_oil_price.from) windows.get(x.ref.first).own.push(x.c);
    }
    const windowText = [...windows.values()].map(w => (w.own.length ? josa(names(w.own), ['은', '는']) + ' ' : '') + w.ref.span + ' ' + fmt(w.ref.avg, 1) + '달러').join(', ');
    // Bars compare one-off totals; a per-month or per-day figure is not one.
    const scale = rows.filter(r => r.budget && ok(r.budget.usd_bn) && !perUnit(r.budget)).sort((a, b) => b.budget.usd_bn - a.budget.usd_bn);

    // ---- 한눈에 ---------------------------------------------------------------
    const ov = section('subsidy-overview', '연료 보조금과 재정 부담', esc(dateKo(D.as_of)) + ' 조사 · 각국 예산서·재무부·IMF·국영 석유사' + (brent ? ' · 브렌트는 자동 갱신' : ''));
    const lines = [];
    if (compared.length) {
      const below = compared.filter(x => x.ref.avg > x.v);
      const vals = compared.map(x => x.v), gaps = compared.map(x => x.ref.avg - x.v);
      const lo = Math.min(...vals), hi = Math.max(...vals), g0 = Math.round(Math.min(...gaps)), g1 = Math.round(Math.max(...gaps));
      lines.push(below.length === compared.length
        ? names(compared.map(x => x.c)) + '의 예산 유가 가정은 배럴당 ' + exact(lo) + (hi !== lo ? '~' + exact(hi) : '') + '달러로, 각 예산 기간의 ' + YEAR +
          '년 브렌트 평균(' + windowText + ')보다 ' + (g0 === g1 ? g0 : g0 + '~' + g1) + '달러 낮다.'
        : '예산 유가 가정을 확인한 ' + compared.length + '개국 중 ' + below.length + '개국' + (below.length ? '(' + names(below.map(x => x.c)) + ')' : '') +
          '의 가정이 각 예산 기간의 ' + YEAR + '년 브렌트 평균(' + windowText + ')보다 낮다.');
    }
    // A revision of the same budget line shows how far this year's prices pushed it.
    const raised = rows.map(({c, budget}) => {
      if (!budget || budget.kind !== 'revised') return null;
      const orig = (c.items || []).find(it => it.kind === 'budget' && it.label === budget.label && it.year === budget.year && it.unit === budget.unit && ok(it.amount) && it.amount > 0);
      return orig ? {c, orig, rev: budget} : null;
    }).filter(Boolean);
    if (raised.length) {
      lines.push(raised.map(({c, orig, rev}) => esc(c.name_kr) + '의 ' + esc(rev.label) + particle(headOf(rev.label), ['은', '는']) +
        ' 원예산 ' + esc(amountText(orig)) + '에서 ' + esc(amountText(rev)) + ro(amountText(rev)) + ' ' + fmt((rev.amount / orig.amount - 1) * 100, 0) + '% 늘었').join('고, ') + '다.');
    }
    if (scale.length >= 2) {
      const [a, b] = scale;
      lines.push('달러로 환산한 재정 규모는 ' + josa(esc(a.c.name_kr), ['이', '가']) + ' ' + usd(a.budget) + '(' + esc(amountText(a.budget)) + ')' + ro(usdText(a.budget)) + ' 가장 크고, ' +
        josa(esc(b.c.name_kr), ['이', '가']) + ' ' + usd(b.budget) + '(' + esc(amountText(b.budget)) + ')' + ro(usdText(b.budget)) + ' 뒤를 잇는다.');
    }
    if (lines.length) ov.insertAdjacentHTML('beforeend', '<p class="sc-headline">' + lines.join(' ') + '</p>');

    const table = '<div class="table-scroll"><table class="market-table sc-table sb-table sb-overview"><thead><tr><th scope="col">국가<small>보조 방식 · 회계연도</small></th>' +
      '<th scope="col">재정 규모<small>예산·추경·배정, 없으면 추정</small></th><th scope="col">달러 환산</th><th scope="col">집행·손실 누계</th><th scope="col">예산 유가 가정<small>달러/배럴</small></th></tr></thead><tbody>' +
      (D.regions || []).map(([region, rname]) => {
        const inRegion = rows.filter(r => r.c.region === region);
        if (!inRegion.length) return '';
        return '<tr class="sc-region"><th colspan="5"><span>' + esc(rname) + '</span></th></tr>' + inRegion.map(({c, budget, spent}) => {
          const bop = c.budget_oil_price;
          const money = !budget && !spent && c.fiscal_none
            ? '<td colspan="3" class="sb-none">' + esc(c.fiscal_none) + '</td>'
            : '<td>' + (budget ? amount(budget) + '<small>' + esc(budget.label) + ' · ' + period(c, budget) + ' ' + kindOf(budget) + '</small>' : '—') + '</td>' +
              '<td>' + (budget && ok(budget.usd_bn) ? usd(budget) + gdp(budget) : '—') + '</td>' +
              '<td>' + (spent ? amount(spent) + '<small>' + esc(spent.label) + (spanOf(spent) ? ' · ' + spanOf(spent) : '') + (spent.kind !== 'realised' ? ' · ' + kindOf(spent) : '') + '</small>' : '—') + '</td>';
          return '<tr><th scope="row"><a href="#' + cardId(c) + '">' + esc(c.name_kr) + '</a>' + (c.tag ? '<small class="sb-tag">' + esc(c.tag) + '</small>' : '') +
            (c.fy ? '<small>회계연도 ' + esc(c.fy) + '</small>' : '') + '</th>' + money +
            '<td>' + (ok(bop?.value) ? exact(bop.value) + '<small>' + esc(bopLabel(bop)) + '</small>' : '—') + '</td></tr>';
        }).join('');
      }).join('') + '</tbody></table></div>';
    ov.insertAdjacentHTML('beforeend', '<article class="panel">' + table +
      (NOTES.table ? '<p class="note sc-source">' + esc(NOTES.table) + '</p>' : '') + '<p class="note sb-hint">국가명을 누르면 국가 카드로 이동</p></article>');

    const grid = document.createElement('div');
    grid.className = 'detail-grid sb-charts';
    if (scale.length) {
      const max = scale[0].budget.usd_bn;
      const skipped = rows.filter(r => r.budget && !scale.includes(r));
      const why = skipped.map(({c, budget}) => esc(c.name_kr) + particle(c.name_kr, ['은', '는']) + ' ' +
        (perUnit(budget) ? (perUnit(budget) === '/월' ? '월' : '기간') + ' 단위 추정치(' + esc(amountText(budget)) + (ok(budget.usd_bn) ? ', ' + usd(budget) : '') + ')라' : '달러 환산값이 없어') + ' 막대에서 뺐다.').join(' ');
      grid.insertAdjacentHTML('beforeend', '<article class="panel"><div class="panel-head"><h3>달러로 환산한 재정 규모</h3><span class="meta">억 달러 · 표의 재정 규모 열</span></div>' +
        '<div class="sc-bars sb-bars">' + scale.map(({c, budget}) => {
          const label = c.name_kr + ' · ' + budget.label + ' · ' + (budget.period || fyLabel(c, budget.year)) + ' ' + (budget.kind_label || KIND[budget.kind] || '') + ' · ' + amountText(budget) + ' · ' + usdText(budget);
          const eok = budget.usd_bn * 10;
          return '<a class="sc-bar-row sb-bar-row" href="#' + cardId(c) + '" data-tip="' + esc(label) + '" aria-label="' + esc(label) + '"><span>' + esc(c.name_kr) + '<small>' + kindOf(budget) + '</small></span>' +
            '<div class="sc-bar-track"><i style="width:' + Math.max(0.6, budget.usd_bn / max * 100).toFixed(1) + '%"></i></div><em>' + fmt(eok, eok >= 10 ? 0 : 1) + '</em></a>';
        }).join('') + '</div>' +
        (NOTES.bars || why ? '<p class="note sc-source">' + [esc(NOTES.bars || ''), why].filter(Boolean).join(' ') + '</p>' : '') +
        '<p class="note sb-hint">막대에 마우스를 올리면(터치는 한 번 누르면) 항목, 누르면(터치는 다시 누르면) 국가 카드</p></article>');
    }
    // Budget oil-price assumptions against Brent over each budget's own period.
    if (assumed.length) {
      const extent = [...assumed.map(c => Number(c.budget_oil_price.value)), ...compared.flatMap(x => [x.ref.lo, x.ref.hi])];
      const hi = Math.max(...extent) * 1.04, lo = Math.min(...extent) * 0.9;
      const X = v => ((v - lo) / (hi - lo) * 100).toFixed(1);
      const ticks = [];
      for (let t = Math.ceil(lo / 10) * 10; t <= hi; t += 10) ticks.push(t);
      const ranged = D.countries.filter(c => c.budget_oil_price && !ok(c.budget_oil_price.value) && c.budget_oil_price.range);
      grid.insertAdjacentHTML('beforeend', '<article class="panel"><div class="panel-head"><h3>예산 유가 가정' + (compared.length ? '과 ' + YEAR + '년 브렌트' : '') + '</h3><span class="meta">달러/배럴</span></div>' +
        '<div class="sb-dots">' + assumed.slice().sort((a, b) => a.budget_oil_price.value - b.budget_oil_price.value).map(c => {
          const b = c.budget_oil_price, ref = brentOver(b.from);
          const label = c.name_kr + ' 예산 유가 가정 ' + perBarrel(b.value) + ' · ' + bopLabel(b) + (ref ? ' · ' + versus(b.value, ref) : '');
          return '<a class="sb-dot-row" href="#' + cardId(c) + '" data-tip="' + esc(label) + '" aria-label="' + esc(label) + '"><span>' + esc(c.name_kr) +
            '<small>' + esc([bench(b.benchmark), b.period, b.basis].map(x => String(x || '').replace(/\(.*\)/, '').trim()).filter(Boolean).join(' · ')) + '</small></span><div class="sb-dot-track">' +
            ticks.map(t => '<u style="left:' + X(t) + '%"></u>').join('') +
            (ref ? '<s style="left:' + X(ref.lo) + '%;width:' + (X(ref.hi) - X(ref.lo)).toFixed(1) + '%"></s><b class="sb-brent" style="left:' + X(ref.avg) + '%"></b>' : '') +
            '<i style="left:' + X(b.value) + '%"></i></div><em>' + exact(b.value) + '</em></a>';
        }).join('') +
        '<div class="sb-dot-row sb-axis" aria-hidden="true"><span></span><div class="sb-dot-track">' + ticks.map(t => '<small style="left:' + X(t) + '%">' + t + '</small>').join('') + '</div><em></em></div></div>' +
        (compared.length ? '<p class="insight-legend"><span><i class="sb-legend-dot"></i>예산 가정</span><span><i class="sb-legend-line"></i>예산 기간 브렌트 평균</span><span><i class="sb-legend-band"></i>같은 기간 월평균 범위</span></p>' : '') +
        '<p class="note sc-source">기준 유종은 인도네시아가 ICP, 베트남이 자국 원유 결제가로 나라마다 다르다. ' +
        (compared.length ? '브렌트는 FRED DCOILBRENTEU 월평균이며 예산 기간 안의 끝난 달만 쓴다(' + windowText + ').' : '자동 갱신 브렌트를 받지 못해 비교선은 없다.') +
        ranged.map(c => ' ' + esc(c.name_kr) + particle(c.name_kr, ['은', '는']) + ' ' + esc(bench(c.budget_oil_price.benchmark)) + ' 가정을 범위로만 냈다(' + esc(c.budget_oil_price.range) + ').').join('') + '</p></article>');
    }
    if (grid.childElementCount) ov.append(grid);

    // 2026 measures on one calendar, under this year's Brent monthly means.
    // Measures within four days share one numbered mark; close marks take lanes.
    const dated = D.countries.map(c => {
      const pts = [];
      let count = 0;
      for (const m of c.measures_2026 || []) {
        const at = whenAll(m.date);
        if (at.length) count += 1;
        for (const p of at) pts.push({at: p, m});
      }
      pts.sort((a, b) => dayOf(a.at) - dayOf(b.at));
      const marks = [];
      for (const p of pts) {
        const last = marks.at(-1);
        if (last && dayOf(p.at) - dayOf(last.at) <= 4) {
          last.list.push(p.m);
          if (!p.at[2]) last.exact = false;
        } else marks.push({at: p.at, exact: p.at[2], list: [p.m]});
      }
      marks.forEach((g, i) => { g.lane = i && dayOf(g.at) - dayOf(marks[i - 1].at) <= 12 ? (marks[i - 1].lane === 0 ? -1 : marks[i - 1].lane === -1 ? 1 : 0) : 0; });
      return {c, count, marks};
    }).filter(x => x.marks.length);
    if (dated.length) {
      const brentMonths = brent ? [...brent.months, ...(brent.partial ? [brent.partial.month] : [])].map(m => Number(m.slice(5))) : [];
      const nMonths = Math.min(12, Math.max(Number(String(D.as_of).slice(5, 7)) || 1, ...dated.flatMap(x => x.marks.map(g => g.at[0] + 1)), ...brentMonths));
      const pos = ([mo, day]) => ((mo + (Math.min(day, 30) - 0.5) / 30) / nMonths * 100).toFixed(2);
      const monthsRow = Array.from({length: nMonths}, (_, i) => '<small style="left:' + ((i + 0.5) / nMonths * 100).toFixed(2) + '%">' + (i + 1) + '월</small>').join('');
      const gridLines = Array.from({length: nMonths + 1}, (_, i) => '<u style="left:' + (i / nMonths * 100).toFixed(2) + '%"></u>').join('');
      let brentRow = '', drewPartial = false, lead = '';
      if (brent) {
        const vals = Array.from({length: nMonths}, (_, i) => {
          const key = YEAR + '-' + String(i + 1).padStart(2, '0');
          if (ok(brent.monthly[key])) return {v: Number(brent.monthly[key]), key, partial: false};
          if (brent.partial && brent.partial.month === key) return {v: Number(brent.partial.value), key, partial: true};
          return null;
        });
        const vmax = Math.max(...vals.filter(Boolean).map(x => x.v));
        drewPartial = vals.some(x => x && x.partial);
        brentRow = '<div class="sb-cal-row sb-cal-brent"><span>브렌트<small>월평균</small></span><div class="sb-cal-track">' + gridLines + vals.map((x, i) => {
          if (!x) return '';
          const text = Number(x.key.slice(5)) + '월 브렌트 평균 ' + fmt(x.v, 1) + '달러' + (x.partial ? '(진행 중, ' + brent.partial.n + '거래일)' : '');
          const h = x.v / vmax * 74;
          return '<i class="' + (x.partial ? 'sb-partial' : '') + '" style="left:' + (i / nMonths * 100 + 0.6).toFixed(2) + '%;width:' + (100 / nMonths - 1.2).toFixed(2) + '%;height:' + h.toFixed(1) + '%" role="img" aria-label="' + esc(text) + '" data-tip="' + esc(text) + '" tabindex="0"></i>' +
            '<em style="left:' + (i / nMonths * 100).toFixed(2) + '%;width:' + (100 / nMonths).toFixed(2) + '%;bottom:' + (h + 2).toFixed(1) + '%" aria-hidden="true">' + fmt(x.v, 0) + '</em>';
        }).join('') + '</div></div>';
        // How many dated measures came in the months Brent averaged over 100 dollars.
        const high = brent.months.filter(m => Number(brent.monthly[m]) > 100).map(m => Number(m.slice(5)));
        if (high.length) {
          let total = 0, inHigh = 0;
          for (const c of D.countries) for (const m of c.measures_2026 || []) {
            const at = whenAll(m.date)[0];
            if (!at) continue;
            total += 1;
            if (high.includes(at[0] + 1)) inHigh += 1;
          }
          const runs = [];
          for (const mo of high) { const r = runs.at(-1); if (r && mo === r[1] + 1) r[1] = mo; else runs.push([mo, mo]); }
          const monthsText = runs.map(([a, b]) => a === b ? a + '월' : a + '~' + b + '월').join('·');
          if (total) lead = '<p class="sc-headline">' + YEAR + '년 날짜가 확인된 조치 ' + total + '건 중 ' + inHigh + '건(' + fmt(inHigh / total * 100, 0) + '%)이 브렌트 월평균이 100달러를 넘은 ' + monthsText + '에 나왔다.</p>';
        }
      }
      const order = (D.regions || []).map(r => r[0]);
      const calRows = dated.sort((a, b) => order.indexOf(a.c.region) - order.indexOf(b.c.region)).map(({c, count, marks}) =>
        '<div class="sb-cal-row"><span><a href="#' + cardId(c) + '">' + esc(c.name_kr) + '</a> <small>' + count + '건</small></span><div class="sb-cal-track">' + gridLines +
        marks.map(({at, exact: ex, list, lane}) => {
          const text = c.name_kr + ' · ' + list.map(m => dateKo(m.date) + ' · ' + m.text).join(' / ');
          return '<a class="sb-mark' + (ex ? '' : ' sb-approx') + (list.length > 1 ? ' sb-multi' : '') + '" href="#' + cardId(c) + '" style="left:' + pos(at) + '%;top:calc(50% + ' + lane * 5 + 'px)" data-tip="' + esc(text) + '" aria-label="' + esc(text) + '">' +
            (list.length > 1 ? list.length : '') + '</a>';
        }).join('') + '</div></div>').join('');
      const undated = D.countries.reduce((n, c) => n + (c.measures_2026 || []).filter(m => !whenAll(m.date).length).length, 0);
      ov.insertAdjacentHTML('beforeend', '<article class="panel sb-calendar"><div class="panel-head"><h3>' + YEAR + '년 가격·보조 조치 시점</h3><span class="meta">점 하나가 날짜 하나' + (brentRow ? ' · 위 막대는 브렌트 월평균(달러/배럴)' : '') + '</span></div>' + lead +
        '<div class="sb-cal">' + brentRow + calRows + '<div class="sb-cal-row sb-axis" aria-hidden="true"><span></span><div class="sb-cal-track">' + monthsRow + '</div></div></div>' +
        '<p class="insight-legend"><span><i class="sb-legend-dot"></i>날짜 확인</span><span><i class="sb-legend-dot sb-approx"></i>월·순 단위나 기간</span><span><i class="sb-legend-dot sb-multi">2</i>4일 안의 조치 건수</span>' +
        (drewPartial ? '<span><i class="sb-legend-bar sb-partial"></i>진행 중인 달</span>' : '') + '</p>' +
        (undated ? '<p class="note sc-source">연도만 확인된 조치 ' + undated + '건은 국가 카드에만 있다.</p>' : '') +
        '<p class="note sb-hint">점에 마우스를 올리면(터치는 한 번 누르면) 조치 내용, 누르면(터치는 다시 누르면) 국가 카드</p></article>');
    }

    // ---- 국가별 카드 -------------------------------------------------------------
    function card(c) {
      const budget = item(c, 'overview_budget'), spent = item(c, 'overview_realised');
      // Newest year first; within a year the budget, its revision, estimates, then spending.
      const ORDER = {budget: 0, revised: 1, estimate: 2, realised: 3, balance: 4};
      const items = (c.items || []).map((it, i) => ({it, i})).sort((a, b) => (b.it.year - a.it.year) ||
        ((ORDER[a.it.kind] ?? 9) - (ORDER[b.it.kind] ?? 9)) ||
        String(b.it.period_end || '').localeCompare(String(a.it.period_end || '')) || a.i - b.i);
      const list = (arr, cls) => arr && arr.length ? '<ul class="' + cls + '">' + arr.map(x => '<li>' + esc(x.text) + ' ' + refs(c, x.src) + '</li>').join('') + '</ul>' : '';
      const bop = c.budget_oil_price, ref = bop ? brentOver(bop.from) : null;
      // A conversion note shared by several rows is printed once under the table.
      const noteCount = {};
      for (const {it} of items) if (it.usd_note) noteCount[it.usd_note] = (noteCount[it.usd_note] || 0) + 1;
      const common = Object.entries(noteCount).filter(([, n]) => n >= 2).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
      const stat = (label, value, sub) => '<div class="sb-stat"><span>' + label + '</span>' + (value ? '<b>' + value + '</b>' : '') + (sub ? '<small>' + sub + '</small>' : '') + '</div>';
      const stats = [
        budget ? stat('재정 규모', amount(budget), esc(budget.label) + ' · ' + period(c, budget) + ' ' + kindOf(budget) + (ok(budget.usd_bn) ? ' · ' + usd(budget) : '')) : '',
        spent ? stat('집행·손실 누계', amount(spent), esc(spent.label) + (spanOf(spent) ? ' · ' + spanOf(spent) : '') + (spent.kind !== 'realised' ? ' · ' + kindOf(spent) : '')) : '',
        !budget && !spent && c.fiscal_none ? stat('재정 지출', '', esc(c.fiscal_none)) : '',
        ok(bop?.value) ? stat('예산 유가 가정', esc(perBarrel(bop.value)), esc(bopLabel(bop)) + (ref ? ' · ' + esc(versus(bop.value, ref)) : '')) : ''
      ].join('');
      // Undated measures stay after the dated one they followed in the research.
      let anchor = -1;
      const measures = (c.measures_2026 || []).map((m, i) => {
        const at = whenAll(m.date)[0];
        if (at) anchor = dayOf(at);
        return {m, i, key: at ? dayOf(at) : anchor + 0.25};
      }).sort((a, b) => a.key - b.key || a.i - b.i);
      // A bare year that the text already opens with is not repeated.
      const measureDate = m => /^\d{4}년$/.test(dateKo(m.date)) && String(m.text).startsWith(dateKo(m.date)) ? '' : '<b>' + dateText(m.date) + '</b> ';
      return '<article class="panel sb-card" id="' + cardId(c) + '"><div class="panel-head"><h3>' + esc(c.name_kr) + '</h3><span class="meta">' + esc(c.tag || '') + (c.fy ? ' · 회계연도 ' + esc(c.fy) : '') + '</span></div>' +
        (stats ? '<div class="sb-stats">' + stats + '</div>' : '') +
        '<p class="sb-mech">' + esc(c.mechanism) + '</p>' +
        (items.length ? '<h4>재정 항목</h4><div class="table-scroll"><table class="market-table sc-table sb-table sb-items"><thead><tr><th scope="col">항목</th><th scope="col">기간·구분</th><th scope="col">금액</th><th scope="col">달러 환산</th></tr></thead>' +
          items.map(({it, i}) => {
            const key = i === c.overview_budget || i === c.overview_realised;
            const notes = [it.note, it.pct_note ? 'GDP 비율: ' + it.pct_note : '', it.usd_note && it.usd_note !== common ? '달러 환산: ' + usdNote(it.usd_note) : ''].filter(Boolean);
            return '<tbody' + (key ? ' class="sb-key"' : '') + '><tr' + (notes.length ? ' class="sb-has-note"' : '') + '><th scope="row">' + esc(it.label) + '</th>' +
              '<td>' + period(c, it) + ' ' + kindOf(it) + (it.period_end ? '<small>' + dateText(it.period_end) + '까지</small>' : '') + gdp(it) + (key ? '<small class="sb-key-mark">요약 표 기준</small>' : '') + '</td>' +
              '<td class="latest">' + amount(it) + ' ' + refs(c, it.src) + '</td><td>' + (ok(it.usd_bn) ? usd(it) : '—') + '</td></tr>' +
              (notes.length ? '<tr class="sb-note"><td colspan="4">' + notes.map(esc).join(' · ') + '</td></tr>' : '') + '</tbody>';
          }).join('') + '</table></div>' + (common ? '<p class="note sb-usd-note">달러 환산: ' + esc(usdNote(common)) + (noteCount[common] < items.filter(x => ok(x.it.usd_bn)).length ? '(따로 적은 행 제외)' : '') + '</p>' : '') : '') +
        (bop && (ok(bop.value) || bop.note) ? '<p class="sb-line"><b>예산 유가 가정</b> ' + (ok(bop.value) ? esc(perBarrel(bop.value)) + ' · ' : '') + esc([bench(bop.benchmark), bop.period || (bop.year ? bop.year + '년' : '')].filter(Boolean).join(', ')) +
          (bop.note ? '. ' + esc(bop.note) : '') + ' ' + refs(c, bop.src) + '</p>' : '') +
        (measures.length ? '<h4>' + YEAR + '년 조치</h4><ol class="sb-timeline">' + measures.map(({m}) => '<li>' + measureDate(m) + esc(m.text) + ' ' + refs(c, m.src) + '</li>').join('') + '</ol>' : '') +
        ((c.prices || []).length ? '<h4>소매 가격</h4><div class="table-scroll"><table class="market-table sc-table sb-table"><tbody>' + c.prices.map(p => '<tr><th scope="row">' + esc(p.product) + (p.note ? '<small>' + esc(p.note) + '</small>' : '') + '</th><td class="latest">' +
          '<span class="sb-amt">' + (ok(p.price) ? exact(p.price) : esc(p.price)) + ' ' + esc(p.unit) + '</span></td><td>' + dateText(p.date) + ' ' + refs(c, p.src) + '</td></tr>').join('') + '</tbody></table></div>' : '') +
        ((c.sensitivity || []).length ? '<h4>유가 민감도</h4>' + list(c.sensitivity, 'sb-list') : '') +
        ((c.fiscal_impact || []).length ? '<h4>재정 영향</h4>' + list(c.fiscal_impact, 'sb-list') : '') +
        ((c.open_items || []).length ? '<details class="method"><summary>확인하지 못한 항목 ' + c.open_items.length + '건</summary><ul class="sb-list">' + c.open_items.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul></details>' : '') +
        ((c.sources || []).length ? '<details class="method"><summary>출처 ' + c.sources.length + '건</summary><ol class="sb-sources">' + c.sources.map(s => '<li value="' + Number(s.id) + '" id="' + cardId(c) + '-src-' + Number(s.id) + '">' +
          (safeUrl(s.url) ? '<a href="' + safeUrl(s.url) + '" target="_blank" rel="noopener">' + esc(s.title) + '</a>' : esc(s.title)) + (s.publisher ? ' · ' + esc(s.publisher) : '') + (s.date ? ' · ' + dateText(s.date) : '') + '</li>').join('') + '</ol></details>' : '') +
        '</article>';
    }
    for (const [region, rname] of D.regions || []) {
      const list = D.countries.filter(c => c.region === region);
      if (!list.length) continue;
      const s = section('subsidy-' + String(region).replace(/[^a-z0-9]+/gi, '-'), rname + ' 연료 보조금', list.map(c => '<a href="#' + cardId(c) + '">' + esc(c.name_kr) + '</a>').join(' · '));
      s.insertAdjacentHTML('beforeend', '<div class="sb-grid">' + list.map(card).join('') + '</div>');
    }
    desk.append(...sections);
    // Country cards join the desk's jump list, so the view picker and the page
    // search (both built by workspace.js from it) can find each country.
    let jump = desk.querySelector(':scope > .section-jump');
    if (!jump) {
      jump = document.createElement('nav');
      jump.className = 'section-jump';
      jump.setAttribute('aria-label', '물가전이 분석 바로가기');
      desk.firstElementChild.after(jump);
    }
    jump.insertAdjacentHTML('beforeend', D.countries.map(c => '<a href="#' + cardId(c) + '">' + esc(c.name_kr) + ' 연료 보조금</a>').join(''));
  } catch (err) {
    console.error('subsidy: views not built', err);
  }
})();
