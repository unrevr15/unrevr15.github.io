'use strict';
// 제품별 수급 desk. Reads window.ENERGY_LIVE.supply (backend/app/etl/external/
// energy_supply.py: EIA weekly stocks and refinery runs, JODI monthly country
// data, Eurostat emergency stocks, PAJ reserve days) and the weekly price means
// of window.ENERGY_LIVE.series (energy_live.py) for crack spreads. Everything
// shown is computed from those payloads when the page loads; the only fixed
// text is the value-chain description of each product. Runs after
// value-chain.js (company names) and before workspace.js, which puts the
// sections in the desk's views (deskViews.supply).
(() => {
  const desk = document.getElementById('supply');
  if (!desk) return;
  try {
    const LIVE = window.ENERGY_LIVE || {};
    const SUP = LIVE.supply && LIVE.supply.ok ? LIVE.supply : null;
    const PRICES = LIVE.ok === true && LIVE.series ? LIVE.series : {};
    const W = SUP?.us_weekly || {};
    const COVER = SUP?.us_cover || {};
    // A JODI section without a reference month (first run with JODI down) is no section.
    const J = SUP?.jodi?.latest && SUP?.jodi?.data && SUP?.jodi?.countries ? SUP.jodi : null;

    // ---- formatting -------------------------------------------------------
    const esc = value => String(value ?? '').replace(/[&<>"']/g, c =>
      ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const ok = v => v !== null && v !== undefined && Number.isFinite(Number(v));
    const fmt = (v, d = 0) => ok(v) ? Number(v).toLocaleString('en-US', {minimumFractionDigits: d, maximumFractionDigits: d}) : '—';
    const sign = v => v > 0 ? '+' : v < 0 ? '−' : '';
    const signed = (v, d = 1, unit = '%') => ok(v) ? sign(v) + fmt(Math.abs(v), d) + unit : '—';
    const pct = (a, b) => ok(a) && ok(b) && b ? (a / b - 1) * 100 : null;
    const dayLabel = iso => { const [, m, d] = String(iso).split('-'); return Number(m) + '월 ' + Number(d) + '일'; };
    // "11월 2~6일" for the Monday-Friday week ending on the given Friday.
    const weekLabel = fri => {
      const end = new Date(fri + 'T00:00:00Z'), start = new Date(end.getTime() - 4 * 864e5);
      const m1 = start.getUTCMonth() + 1, m2 = end.getUTCMonth() + 1;
      return m1 === m2 ? m2 + '월 ' + start.getUTCDate() + '~' + end.getUTCDate() + '일'
        : m1 + '월 ' + start.getUTCDate() + '일~' + m2 + '월 ' + end.getUTCDate() + '일';
    };
    const monthIndex = ym => { const [y, m] = String(ym).split('-').map(Number); return y * 12 + m - 1; };
    const monthBack = (ym, n) => {
      const [y, m] = String(ym).split('-').map(Number), i = y * 12 + m - 1 - n;
      return Math.floor(i / 12) + '-' + String(i % 12 + 1).padStart(2, '0');
    };
    const monthLabel = ym => { const [y, m] = String(ym).split('-'); return esc(y) + '년 ' + Number(m) + '월'; };
    // Korean particles follow the last Hangul syllable before any parenthesis.
    const batchim = word => {
      const w = String(word).replace(/\s*\([^)]*\)\s*$/, '');
      const ch = [...w].reverse().find(c => c >= '가' && c <= '힣');
      return ch ? (ch.charCodeAt(0) - 0xAC00) % 28 : 0;
    };
    const topic = word => esc(word) + (batchim(word) ? '은' : '는');
    const withJosa = (word, a, b) => word + (batchim(word.replace(/<[^>]*>/g, '')) ? a : b);
    // Copula after a value: 이다 after a final consonant (일, 배럴, digits
    // read 영·일·삼·육·칠·팔), 다 otherwise (%, 달러, Bcf ...).
    const cop = text => {
      const last = [...String(text).replace(/<[^>]*>/g, '').trim()].at(-1) || '';
      if (last >= '가' && last <= '힣') return (last.charCodeAt(0) - 0xAC00) % 28 ? '이다' : '다';
      return /[013678]/.test(last) ? '이다' : '다';
    };
    // "기준보다 3.1% 적다" or, for no difference at the printed precision, "기준과 같다".
    const versus = (ref, delta, unit, less, more, d = 1) => !ok(delta) ? '' :
      Math.abs(delta) < 0.5 * 10 ** -d ? withJosa(ref, '과', '와') + ' 같다'
        : ref + '보다 ' + fmt(Math.abs(delta), d) + unit + ' ' + (delta < 0 ? less : more);
    const kst = iso => { try { return new Date(iso).toLocaleString('ko-KR', {timeZone: 'Asia/Seoul', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'}); } catch { return iso; } };
    // Display units: stocks in million barrels, flows in 10,000 b/d (Korean 만 배럴/일).
    const UNITS = {
      stock: {div: 1000, d: 1, unit: '백만 배럴'},
      flow: {div: 10, d: 0, unit: '만 배럴/일'},
      pct: {div: 1, d: 1, unit: '%'},
      level: {div: 10, d: 0, unit: '만 배럴/일'},
      cover: {div: 1, d: 1, unit: '일'},
      gas: {div: 1, d: 0, unit: 'Bcf'},
    };
    const unitOf = entry => entry?.product === 'gas' ? UNITS.gas : UNITS[entry?.kind] || UNITS.stock;
    const disp = (v, u) => ok(v) ? v / u.div : null;
    const show = (v, u, d = u.d) => ok(v) ? fmt(v / u.div, d) + u.unit : '—';
    const flowShow = kbd => ok(kbd) ? fmt(kbd / 10, kbd / 10 >= 100 ? 0 : 1) + '만 배럴/일' : '—';
    const stockShow = kb => ok(kb) ? fmt(kb / 1000, 1) + '백만 배럴' : '—';
    // Tightness tone for stocks against the five-year average.
    const tone = p => !ok(p) ? '' : p <= -10 ? 'sc-tight2' : p <= -3 ? 'sc-tight' : p >= 10 ? 'sc-ample2' : p >= 3 ? 'sc-ample' : 'sc-even';

    // ---- companies (value-chain-data.js) ---------------------------------
    const VC = typeof valueChain !== 'undefined' && valueChain && Array.isArray(valueChain.segments) ? valueChain : null;
    const companyByYahoo = new Map();
    for (const seg of VC?.segments || []) for (const c of seg.companies || []) companyByYahoo.set(c.yahoo, c);
    const slug = value => String(value).replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const chips = tickers => tickers.map(t => companyByYahoo.get(t)).filter(Boolean).map(c =>
      '<a class="sc-chip" href="#vc-co-' + esc(slug(c.yahoo || c.ticker)) + '">' + esc(c.name_kr) + '<small>' + esc(c.ticker) + '</small></a>').join('');

    // ---- charts ------------------------------------------------------------
    const SVGNS = 'http://www.w3.org/2000/svg';
    const C = {cur: '#155787', prev: '#8c9aa8', avg: '#5d7d99', band: '#d9e6f2', alt: ['#a75a31', '#2e7d5b', '#7a4fa0', '#b08a1f', '#3f8fb5', '#c0504d']};
    function frame(host, legend, aria) {
      const svg = document.createElementNS(SVGNS, 'svg');
      svg.setAttribute('class', 'insight-chart sc-chart');
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', aria);
      host.insertAdjacentHTML('beforeend', '<div class="insight-legend">' + legend.join('') + '</div>');
      host.append(svg);
      return svg;
    }
    const swatch = (label, color, cls = '') => '<span><i class="' + cls + '" style="background:' + color + '"></i>' + esc(label) + '</span>';
    const MONTH_WEEKS = [1, 5, 9, 13, 18, 22, 26, 31, 35, 40, 44, 48];

    // Seasonal chart: x = week of year (1-53) or month (1-12).
    function seasonChart(host, s, {u, aria}) {
      const legend = [swatch(s.year + '년', C.cur), swatch((s.year - 1) + '년', C.prev)];
      if (s.band.length) legend.push(swatch(s.bandYears[0] + '~' + s.bandYears[1] + '년 범위', C.band, 'insight-range'),
                                     swatch('5년 평균', C.avg, 'sc-dash'));
      const svg = frame(host, legend, aria);
      const draw = () => {
        const width = svg.clientWidth, height = svg.clientHeight;
        if (!width || !height) return;
        const m = {left: 40, right: 44, top: 10, bottom: 22};
        const chart = d3.select(svg).attr('viewBox', '0 0 ' + width + ' ' + height);
        chart.selectAll('*').remove();
        const x = d3.scaleLinear([1, s.n], [m.left, width - m.right]);
        const vals = [...s.cur.map(p => p[1]), ...s.prev.map(p => p[1]), ...s.band.flatMap(b => [b[1], b[3]])].filter(ok);
        if (!vals.length) return;
        const y = d3.scaleLinear(d3.extent(vals), [height - m.bottom, m.top]).nice(5);
        const ticks = y.ticks(5);
        chart.append('g').selectAll('line').data(ticks).join('line').attr('class', 'trend-grid')
          .attr('x1', m.left).attr('x2', width - m.right).attr('y1', v => y(v)).attr('y2', v => y(v));
        chart.append('g').attr('class', 'trend-axis').attr('transform', 'translate(' + m.left + ',0)')
          .call(d3.axisLeft(y).tickValues(ticks).tickSize(0).tickPadding(5).tickFormat(v => fmt(v, ticks.length > 1 && Math.abs(ticks[1] - ticks[0]) % 1 ? 1 : 0)));
        const xt = s.n === 12 ? d3.range(1, 13) : MONTH_WEEKS;
        const step = width < 460 ? 3 : width < 700 ? 2 : 1;
        chart.append('g').attr('class', 'trend-axis').attr('transform', 'translate(0,' + (height - m.bottom) + ')')
          .call(d3.axisBottom(x).tickValues(xt.filter((_, i) => i % step === 0)).tickSize(0).tickPadding(7)
            .tickFormat(v => (s.n === 12 ? v : MONTH_WEEKS.indexOf(v) + 1) + '월'));
        if (s.band.length) {
          chart.append('path').datum(s.band).attr('class', 'insight-range')
            .attr('d', d3.area().x(b => x(b[0])).y0(b => y(b[1])).y1(b => y(b[3])));
          chart.append('path').datum(s.band).attr('fill', 'none').attr('stroke', C.avg).attr('stroke-width', 1)
            .attr('stroke-dasharray', '3 3').attr('d', d3.line().x(b => x(b[0])).y(b => y(b[2])));
        }
        const line = d3.line().defined(p => ok(p[1])).x(p => x(p[0])).y(p => y(p[1]));
        chart.append('path').datum(s.prev).attr('fill', 'none').attr('stroke', C.prev).attr('stroke-width', 1.4).attr('d', line);
        chart.append('path').datum(s.cur).attr('fill', 'none').attr('stroke', C.cur).attr('stroke-width', 2.2).attr('d', line);
        const last = s.cur.filter(p => ok(p[1])).at(-1);
        if (last) {
          chart.append('circle').attr('cx', x(last[0])).attr('cy', y(last[1])).attr('r', 3.5).attr('fill', C.cur);
          chart.append('text').attr('class', 'sc-last').attr('x', x(last[0]) + 6).attr('y', y(last[1]) + 4)
            .text(fmt(last[1], u.d));
        }
      };
      new ResizeObserver(draw).observe(svg);
      draw();
    }
    // Normalise a weekly EIA entry or a JODI entry for seasonChart.
    function weeklySeason(entry, u) {
      const d = v => disp(v, u);
      return {n: 53, year: entry.year, bandYears: entry.band_years || [],
              cur: entry.cur.map(([w, v]) => [w, d(v)]), prev: entry.prev.map(([w, v]) => [w, d(v)]),
              band: (entry.band || []).map((b, i) => b ? [i + 1, d(b[0]), d(b[1]), d(b[2])] : null).filter(Boolean)};
    }
    function monthlySeason(entry, u) {
      const d = v => disp(v, u);
      const pts = arr => (arr || []).map((v, i) => [i + 1, d(v)]).filter(p => ok(p[1]));
      const band = entry.avg ? entry.avg.map((a, i) => ok(a) ? [i + 1, d(entry.lo[i]), d(a), d(entry.hi[i])] : null).filter(Boolean) : [];
      return {n: 12, year: J.year, bandYears: J.band_years, cur: pts(entry.cur), prev: pts(entry.prev), band};
    }

    // Line chart over dates: series = [{label, color, points: [[iso, v]], dash}].
    function lineChart(host, series, {aria, digits = 1, zero = false}) {
      series = series.filter(s => s.points && s.points.length > 1);
      if (!series.length) { host.insertAdjacentHTML('beforeend', '<p class="note">표시할 자료가 없다.</p>'); return; }
      const svg = frame(host, series.map(s => swatch(s.label, s.color, s.dash ? 'sc-dash' : '')), aria);
      const parse = iso => new Date(iso + 'T00:00:00Z');
      const draw = () => {
        const width = svg.clientWidth, height = svg.clientHeight;
        if (!width || !height) return;
        const m = {left: 40, right: 46, top: 10, bottom: 22};
        const chart = d3.select(svg).attr('viewBox', '0 0 ' + width + ' ' + height);
        chart.selectAll('*').remove();
        const all = series.flatMap(s => s.points);
        const x = d3.scaleUtc(d3.extent(all, p => parse(p[0])), [m.left, width - m.right]);
        const ext = d3.extent(all.map(p => p[1]).filter(ok));
        if (zero) { ext[0] = Math.min(0, ext[0]); ext[1] = Math.max(0, ext[1]); }
        const y = d3.scaleLinear(ext, [height - m.bottom, m.top]).nice(5);
        const ticks = y.ticks(5);
        chart.append('g').selectAll('line').data(ticks).join('line').attr('class', 'trend-grid')
          .attr('x1', m.left).attr('x2', width - m.right).attr('y1', v => y(v)).attr('y2', v => y(v));
        chart.append('g').attr('class', 'trend-axis').attr('transform', 'translate(' + m.left + ',0)')
          .call(d3.axisLeft(y).tickValues(ticks).tickSize(0).tickPadding(5).tickFormat(v => fmt(v, ticks.length > 1 && Math.abs(ticks[1] - ticks[0]) % 1 ? 1 : 0)));
        chart.append('g').attr('class', 'trend-axis').attr('transform', 'translate(0,' + (height - m.bottom) + ')')
          .call(d3.axisBottom(x).ticks(width < 460 ? 4 : 7).tickSize(0).tickPadding(7).tickFormat(d3.utcFormat('%y.%m')));
        const labels = [];
        for (const s of series) {
          const line = d3.line().defined(p => ok(p[1])).x(p => x(parse(p[0]))).y(p => y(p[1]));
          chart.append('path').datum(s.points).attr('fill', 'none').attr('stroke', s.color)
            .attr('stroke-width', s.dash ? 1.3 : 2).attr('stroke-dasharray', s.dash ? '4 3' : null).attr('d', line);
          const last = s.points.filter(p => ok(p[1])).at(-1);
          if (last) {
            chart.append('circle').attr('cx', x(parse(last[0]))).attr('cy', y(last[1])).attr('r', 3).attr('fill', s.color);
            labels.push({x: x(parse(last[0])) + 5, y: y(last[1]) + 4, color: s.color, text: fmt(last[1], digits)});
          }
        }
        // End labels that would overlap are pushed apart vertically.
        labels.sort((a, b) => a.y - b.y);
        for (let i = 1; i < labels.length; i++) {
          if (Math.abs(labels[i].x - labels[i - 1].x) < 40 && labels[i].y - labels[i - 1].y < 11) labels[i].y = labels[i - 1].y + 11;
        }
        for (const l of labels) chart.append('text').attr('class', 'sc-last').attr('x', l.x).attr('y', l.y).attr('fill', l.color).text(l.text);
      };
      new ResizeObserver(draw).observe(svg);
      draw();
    }
    // 24-month sparkline (previous year then current year) for table cells.
    function spark(prev, cur) {
      const vals = [...(prev || []), ...(cur || [])];
      const pts = vals.map((v, i) => [i, v]).filter(p => ok(p[1]));
      if (pts.length < 3) return '';
      const w = 84, h = 22, lo = Math.min(...pts.map(p => p[1])), hi = Math.max(...pts.map(p => p[1]));
      const X = i => 2 + i * (w - 4) / 23, Y = v => hi === lo ? h / 2 : h - 3 - (v - lo) * (h - 6) / (hi - lo);
      const d = pts.map((p, k) => (k ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1)).join('');
      const last = pts.at(-1);
      return '<svg class="sc-spark" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true"><line x1="' + X(12) + '" x2="' + X(12) + '" y1="1" y2="' + (h - 1) +
        '" class="sc-spark-year"/><path d="' + d + '"/><circle cx="' + X(last[0]).toFixed(1) + '" cy="' + Y(last[1]).toFixed(1) + '" r="2"/></svg>';
    }

    // ---- crack spreads from weekly price means ----------------------------
    const weekly = key => PRICES[key]?.weekly || null;
    function spread({a, b, kind}) {
      const A = weekly(a), B = weekly(b);
      if (!A || !B) return [];
      const bm = new Map(B);
      return A.filter(([d]) => bm.has(d)).map(([d, v]) => {
        const w = bm.get(d);
        const val = kind === 'ratio' ? v * 42 / w * 100 : kind === 'bbl' ? v - w : v * 42 - w;
        return [d, Math.round(val * 100) / 100];
      });
    }
    const crackLine = pts => {
      const last = pts.at(-1);
      if (!last) return null;
      const target = new Date(Date.parse(last[0]) - 364 * 864e5).toISOString().slice(0, 10);
      const ago = pts.filter(p => p[0] <= target).at(-1);
      return {last, ago};
    };

    // ---- JODI helpers -----------------------------------------------------
    const jEntry = (c, p, f) => J?.data?.[c]?.[p]?.[f] || null;
    const lastIdx = arr => { for (let i = (arr || []).length - 1; i >= 0; i--) if (ok(arr[i])) return i; return -1; };
    // Latest month of an entry: value, the same month a year earlier, the 5-year average.
    function jLatest(e) {
      if (!e) return null;
      const i = lastIdx(e.cur);
      if (i >= 0) return {month: J.year + '-' + String(i + 1).padStart(2, '0'), v: e.cur[i], yago: e.prev?.[i], avg: e.avg?.[i], prev: i ? e.cur[i - 1] : e.prev?.[11], i};
      const k = lastIdx(e.prev);
      if (k >= 0) return {month: (J.year - 1) + '-' + String(k + 1).padStart(2, '0'), v: e.prev[k], yago: null, avg: null, prev: k ? e.prev[k - 1] : null, i: k, old: true};
      return null;
    }
    const REGIONS = [['europe', '유럽'], ['asia', '아시아·태평양'], ['americas', '미주'], ['mideast', '중동·아프리카']];
    const EUROPE = ['GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'PL', 'TR'];
    const NE_ASIA = ['JP', 'KR', 'TW'];
    // Sum of the countries that report the latest month and its 5-year average.
    // Sum over the countries that report this product's newest common month:
    // the latest month at least half of the reporting countries have reached
    // (the product's own month, not the page's reference month).
    function aggregate(codes, product, flow = 'CLOSTLV') {
      if (!J) return null;
      const entries = codes.map(c => jEntry(c, product, flow)).filter(e => e && e.avg);
      if (!entries.length) return null;
      const need = Math.max(1, Math.ceil(entries.length / 2));
      let i = -1;
      for (let k = 11; k >= 0 && i < 0; k--) if (entries.filter(e => ok(e.cur?.[k]) && ok(e.avg?.[k])).length >= need) i = k;
      if (i < 0) return null;
      let v = 0, avg = 0, yago = 0, n = 0, nYago = 0;
      for (const e of entries) {
        if (!ok(e.cur?.[i]) || !ok(e.avg?.[i])) continue;
        v += e.cur[i]; avg += e.avg[i]; n += 1;
        if (ok(e.prev?.[i])) { yago += e.prev[i]; nYago += 1; }
      }
      const month = J.year + '-' + String(i + 1).padStart(2, '0');
      return n ? {month, v, avg, n, of: codes.length, vs: pct(v, avg), yy: nYago === n ? pct(v, yago) : null} : null;
    }

    // ---- product definitions ----------------------------------------------
    // chain: [stage, text, tickers]; text is definitional (no figures) — the
    // figures come from the payload.
    const REFINERS = ['VLO', 'MPC', 'PSX', 'PBF', 'DINO', '010950.KS', '096770.KS'];
    const ASIA_REFINERS = ['0386.HK', '0857.HK', '002493.SZ', '600346.SS', 'RELIANCE.NS', '5020.T'];
    const PRODUCTS = [
      {id: 'distillate', name: '경유·난방유', jodi: 'GASDIES', yieldKey: 'distillate',
       us: {stock: 'distillate_stocks', more: ['distillate_stocks_east'], cover: 'distillate_days', flows: ['distillate_prod', 'distillate_demand', 'distillate_exports']},
       cracks: [{name: '걸프연안 경유 크랙(WTI 기준)', label: '걸프연안 경유 − WTI', a: 'usgc_ulsd', b: 'wti', color: C.cur},
                {label: '걸프연안 경유 − 브렌트', a: 'usgc_ulsd', b: 'brent', color: C.alt[2]},
                {label: '뉴욕항 난방유 − 브렌트', a: 'nyh_heating_oil', b: 'brent', color: C.alt[0]},
                {label: 'NY ULSD 선물 − 브렌트 선물', a: 'ho_fut', b: 'brent_fut', color: C.alt[1], dash: true}],
       asiaExports: ['CN', 'KR', 'IN', 'JP', 'TW'],
       chain: [
         ['원료', '상압증류의 등유·경유 유분과 감압가스유', []],
         ['정제', '수소화탈황으로 황을 낮춰 초저유황 경유(미국 도로용 15ppm 이하)를 만들고, 수소화분해로 무거운 유분을 경유로 바꾼다', REFINERS],
         ['아시아 수출 정유', '중국·인도·한국 대형 정유소가 호주·동남아 등 아시아·태평양과 유럽·중남미로 경유를 수출한다', ['0386.HK', '0857.HK', '002493.SZ', 'RELIANCE.NS', '010950.KS', '096770.KS']],
         ['물류', '파이프라인(미국 걸프→동부 콜로니얼), 제품선(MR·LR), 터미널 저장', ['STNG', 'INSW', 'KMI']],
         ['수요', '화물 트럭·철도·농기계·건설장비, 미국 북동부·유럽의 난방, 선박용 경유', []]]},
      {id: 'gasoline', name: '휘발유', jodi: 'GASOLINE', yieldKey: 'gasoline',
       us: {stock: 'gasoline_stocks', cover: 'gasoline_days', flows: ['gasoline_prod', 'gasoline_demand']},
       cracks: [{name: '걸프연안 휘발유 크랙(WTI 기준)', label: '걸프연안 휘발유 − WTI', a: 'usgc_gasoline', b: 'wti', color: C.cur},
                {label: '걸프연안 휘발유 − 브렌트', a: 'usgc_gasoline', b: 'brent', color: C.alt[2]},
                {label: '뉴욕항 휘발유 − 브렌트', a: 'nyh_gasoline', b: 'brent', color: C.alt[0]},
                {label: 'RBOB 선물 − 브렌트 선물', a: 'rbob_fut', b: 'brent_fut', color: C.alt[1], dash: true}],
       asiaExports: ['CN', 'KR', 'IN', 'SG', 'TW'],
       chain: [
         ['원료', '경질 나프타, 접촉분해(FCC) 휘발유, 개질유, 알킬레이트, 부탄, 에탄올', []],
         ['정제', '접촉개질로 옥탄가를 높이고 접촉분해·알킬화로 휘발유 성분을 늘린다. 미국 휘발유는 대부분 에탄올 10%를 섞는다(E10)', REFINERS],
         ['규격', '여름·겨울 증기압 규격이 달라 봄 규격 전환기에 재고가 줄어든다', []],
         ['물류', '파이프라인·바지선·제품선 → 터미널 → 주유소', ['KMI', 'STNG']],
         ['수요', '승용차·경트럭. 미국 수요는 5~9월 운전 성수기에 높다', []]]},
      {id: 'jet', name: '항공유', jodi: 'JETKERO', cnProduct: 'KEROSENE', yieldKey: 'jet',
       us: {stock: 'jet_stocks', cover: 'jet_days', flows: ['jet_prod', 'jet_demand', 'jet_exports']},
       cracks: [{name: '걸프연안 항공유 크랙(WTI 기준)', label: '걸프연안 항공유 − WTI', a: 'usgc_jet', b: 'wti', color: C.cur},
                {label: '걸프연안 항공유 − 브렌트', a: 'usgc_jet', b: 'brent', color: C.alt[2]}],
       asiaExports: ['CN', 'KR', 'IN', 'JP', 'TW'],
       chain: [
         ['원료', '상압증류의 등유 유분', []],
         ['정제', '수소화처리로 황을 낮추고, 머록스(Merox) 처리로 메르캅탄을 이황화물로 바꾼다(총 황은 그대로다). Jet A·Jet A-1 규격이 어는점과 인화점을 정한다', [...REFINERS, ...ASIA_REFINERS]],
         ['물류', '파이프라인·제품선 → 공항 저장시설 → 급유', ['STNG', 'KMI']],
         ['수요', '여객·화물 항공. 운항 편수와 노선 거리가 늘면 수요가 늘어난다', []]]},
      {id: 'light', name: '나프타·LPG', jodi: 'NAPHTHA', jodi2: 'LPG',
       us: {stock: 'propane_stocks', cover: 'propane_days', flows: ['propane_demand']},
       cracks: [{name: '프로판 가격의 WTI 대비 비율', label: '몽벨뷰 프로판 / WTI (%)', a: 'propane', b: 'wti', kind: 'ratio', color: C.cur}],
       crackUnit: '%', asiaExports: ['IN', 'SA', 'KW'],
       chain: [
         ['원료', '나프타는 상압증류 경질 유분, LPG는 가스처리시설의 NGL 분리와 정유 부생', ['EPD', 'ET', 'WMB']],
         ['수출', 'LPG는 미국 걸프 수출 터미널에서 대형 가스선(VLGC)으로 아시아에 간다', ['EPD', 'ET']],
         ['분해', '분해설비가 나프타·LPG(미국·중동은 주로 에탄)를 원료로 에틸렌·프로필렌을 만들고, 프로판 탈수소(PDH)가 프로필렌을 만든다', ['DOW', 'LYB', 'WLK', '2010.SR', '051910.KS', '011170.KS']],
         ['수요', '플라스틱·합성섬유 원료, 휘발유 배합(나프타 개질), 난방·취사(LPG)', []]]},
      {id: 'resid', name: '중유', jodi: 'RESFUEL',
       us: {stock: 'resid_stocks', flows: []}, cracks: [], asiaExports: ['KR', 'IN', 'SG', 'SA'],
       chain: [
         ['원료', '상압·감압 증류 잔사유', []],
         ['정제', '코커·잔사유 수소화분해로 경질유로 바꾸거나 탈황해 황 0.5% 이하 선박유(VLSFO)로 판다', [...REFINERS, ...ASIA_REFINERS]],
         ['물류', '벙커링 항구(싱가포르·로테르담·푸자이라)에서 선박에 공급', []],
         ['수요', '선박 연료, 일부 국가의 발전', []]]},
      {id: 'crude', name: '원유', jodi: 'CRUDEOIL', crude: true,
       us: {stock: 'crude_stocks', more: ['spr'], flows: ['crude_prod', 'crude_runs', 'crude_imports', 'crude_exports']},
       cracks: [{name: '브렌트와 WTI의 가격 차이', label: '브렌트 − WTI', a: 'brent', b: 'wti', kind: 'bbl', color: C.cur},
                {label: '브렌트 선물 − WTI 선물', a: 'brent_fut', b: 'wti_fut', kind: 'bbl', color: C.alt[1], dash: true}],
       chain: [
         ['시추·생산', '육상·해양 유전의 시추, 완결, 유전 서비스', ['RIG', 'VAL', 'HAL', 'SLB', 'XOM', 'CVX', '2222.SR']],
         ['수송', '파이프라인과 유조선(VLCC·수에즈막스·아프라막스), 저장 탱크', ['KMI', 'EPD', 'FRO', 'DHT', 'INSW']],
         ['비축', '상업 재고와 정부 전략비축', []],
         ['정제', '상압증류를 거쳐 제품별 공정으로 간다', [...REFINERS, ...ASIA_REFINERS]]]},
      {id: 'gas', name: '천연가스·LNG', gas: true,
       us: {stock: 'gas_storage', flows: []},
       prices: [['henry_hub', '헨리허브 현물'], ['ng_fut', '헨리허브 선물'], ['jkm_fut', 'JKM 선물']],
       chain: [
         ['생산', '셰일·전통 가스전, 원유 생산에 딸린 수반가스', ['XOM', 'CVX', 'COP', 'EOG']],
         ['처리·수송', '가스처리(NGL 분리) → 파이프라인 → 지하 저장', ['KMI', 'WMB', 'ET']],
         ['액화', '육상 LNG 터미널과 부유식 액화설비(FLNG)가 가스를 영하 162도로 냉각해 액화한다', ['LNG', 'VG', 'NEXT', 'WDS.AX', 'GLNG']],
         ['해상 운송·재기화', 'LNG선 → 수입 터미널(부유식 포함)에서 재기화', ['FLNG', 'EE']],
         ['수요', '발전, 산업, 가정 난방. 유럽은 겨울 전에 저장을 채운다', ['VST', 'CEG', 'NRG', 'NEE']]]},
    ];

    // ---- sentences --------------------------------------------------------
    function stockSentence(entry) {
      if (!entry) return '';
      const u = unitOf(entry), last = entry.last, w1 = entry.w1, v5 = entry.vs5;
      const value = show(last.value, u);
      let s = topic(entry.label) + ' ' + dayLabel(last.date) + ' ' + value;
      if (v5 && ok(v5.pct)) s += '로 ' + versus(entry.band_years[0] + '~' + entry.band_years[1] + '년 같은 주 평균', v5.pct, '%', '적다', '많다');
      else s += cop(value);
      s += '.';
      if (w1 && ok(w1.value)) {
        const d = last.value - w1.value;
        s += Math.abs(d) / u.div < 0.5 * 10 ** -u.d ? ' 전주와 같은 수준이다.'
          : ' 전주보다 ' + show(Math.abs(d), u) + ' ' + (d < 0 ? '줄었다' : '늘었다') + '.';
      }
      return s;
    }
    function flowRow(entry) {
      if (!entry) return '';
      const u = unitOf(entry), last = entry.last, v5 = entry.vs5;
      const yy = entry.y1 ? pct(last.value, entry.y1.value) : null;
      return '<tr><th scope="row">' + esc(entry.label) + '<small>' + (entry.basis === 'avg4' ? '4주 평균 · ' : '') + esc(entry.ref) + '</small></th>' +
        '<td class="latest">' + show(last.value, u) + '</td>' +
        '<td>' + (entry.w1 ? signed(pct(last.value, entry.w1.value)) : '—') + '</td>' +
        '<td>' + signed(yy) + '</td>' +
        '<td class="' + (entry.kind === 'stock' ? tone(v5?.pct) : '') + '">' + signed(v5?.pct) + '</td></tr>';
    }
    const flowTable = entries => '<div class="table-scroll"><table class="market-table sc-table"><thead><tr><th scope="col">미국 주간</th><th scope="col">최근</th><th scope="col">전주비</th><th scope="col">전년비</th><th scope="col">5년 평균 대비</th></tr></thead><tbody>' +
      entries.filter(Boolean).map(flowRow).join('') + '</tbody></table></div>';

    // ---- sections -----------------------------------------------------------
    const sections = [];
    function section(id, title, meta) {
      const el = document.createElement('section');
      el.className = 'section';
      el.id = id;
      el.innerHTML = '<div class="section-head"><h2>' + esc(title) + '</h2>' + (meta ? '<span class="meta">' + esc(meta) + '</span>' : '') + '</div>';
      sections.push(el);
      return el;
    }
    function panel(parent, title, meta) {
      const el = document.createElement('article');
      el.className = 'panel';
      el.innerHTML = '<div class="panel-head"><h3>' + esc(title) + '</h3>' + (meta ? '<span class="meta">' + esc(meta) + '</span>' : '') + '</div>';
      parent.append(el);
      return el;
    }
    function grid(parent) {
      const el = document.createElement('div');
      el.className = 'detail-grid';
      parent.append(el);
      return el;
    }
    const source = text => '<p class="note sc-source">' + text + '</p>';

    if (!SUP) {
      const s = section('supply-summary', '제품별 수급', '자료 없음');
      s.insertAdjacentHTML('beforeend', '<p class="note">재고·가동률 자료가 아직 수집되지 않았다. 다음 정기 갱신 뒤에 표시된다.</p>');
    } else {
      // One failing view must not take the others down, and its half-built
      // section is not shown.
      const guard = (name, fn) => {
        const before = sections.length;
        try { fn(); } catch (err) { sections.splice(before); console.error('supply: ' + name + ' not built', err); }
      };
      guard('summary', buildSummary);
      for (const p of PRODUCTS) guard(p.id, () => buildProduct(p));
      guard('runs', buildRuns);
      guard('reserves', buildReserves);
      guard('method', buildMethod);
      // A summary row whose section was not built is plain text, not a link out of the desk.
      const built = new Set(sections.map(el => el.id));
      sections.find(el => el.id === 'supply-summary')?.querySelectorAll('a[href^="#supply-"]').forEach(a => {
        if (!built.has(a.getAttribute('href').slice(1))) a.replaceWith(...a.childNodes);
      });
    }
    desk.append(...sections);

    // ---- 요약표 -------------------------------------------------------------
    function buildSummary() {
      const s = section('supply-summary', '제품별 재고와 가동 요약표', '자동 갱신 ' + kst(SUP.fetched_at));
      const P = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
      // One row per product as the sources split them: naphtha has no US
      // weekly series, LPG pairs with US propane.
      const SUMMARY = [
        {name: '원유', view: 'crude', us: 'crude_stocks', jodi: 'CRUDEOIL', cn: ['CRUDEOIL', 'REFINOBS', '정제 투입'], crack: P.crude.cracks[0]},
        {name: '휘발유', view: 'gasoline', us: 'gasoline_stocks', cover: 'gasoline_days', jodi: 'GASOLINE', cn: ['GASOLINE', 'TOTEXPSB', '수출'], crack: P.gasoline.cracks[0]},
        {name: '경유·난방유', view: 'distillate', us: 'distillate_stocks', cover: 'distillate_days', jodi: 'GASDIES', cn: ['GASDIES', 'TOTEXPSB', '수출'], crack: P.distillate.cracks[0]},
        {name: '항공유', view: 'jet', us: 'jet_stocks', cover: 'jet_days', jodi: 'JETKERO', cn: ['KEROSENE', 'TOTEXPSB', '등유 수출'], crack: P.jet.cracks[0]},
        {name: '나프타', view: 'light', jodi: 'NAPHTHA', cn: ['NAPHTHA', 'TOTIMPSB', '수입']},
        {name: 'LPG·프로판', view: 'light', us: 'propane_stocks', cover: 'propane_days', jodi: 'LPG', cn: ['LPG', 'TOTIMPSB', '수입'], crack: P.light.cracks[0], crackUnit: '%'},
        {name: '중유', view: 'resid', us: 'resid_stocks', jodi: 'RESFUEL', cn: ['RESFUEL', 'TOTEXPSB', '수출']},
        {name: '천연가스', view: 'gas', us: 'gas_storage'},
      ];
      const cell = (v, sub, cls = '') => '<td class="' + cls + '">' + v + (sub ? '<small>' + sub + '</small>' : '') + '</td>';
      const rows = SUMMARY.map(r => {
        const us = r.us ? W[r.us] : null, cov = r.cover ? COVER[r.cover] : null;
        const crk = r.crack ? crackLine(spread(r.crack)) : null;
        const eu = r.jodi ? aggregate(EUROPE, r.jodi) : null, asia = r.jodi ? aggregate(NE_ASIA, r.jodi) : null;
        let cn = null;
        if (r.cn) {
          const l = jLatest(jEntry('CN', r.cn[0], r.cn[1]));
          if (l) cn = {label: r.cn[2], v: l.v, yy: pct(l.v, l.yago), vs: r.cn[1] === 'REFINOBS' ? pct(l.v, l.avg) : null, month: l.month};
        }
        const unit = r.crackUnit || '달러';
        return '<tr><th scope="row"><a href="#supply-' + r.view + '">' + esc(r.name) + '</a></th>' +
          (us ? cell(signed(us.vs5?.pct), show(us.last.value, unitOf(us)) + ' · ' + dayLabel(us.last.date), tone(us.vs5?.pct)) : cell('—')) +
          (cov ? cell(fmt(cov.last.value, 1) + '일', '평균 ' + fmt(cov.vs5?.avg, 1) + '일', tone(cov.vs5?.pct)) : cell('—')) +
          (eu ? cell(signed(eu.vs), stockShow(eu.v) + ' · ' + eu.n + '개국 · ' + Number(eu.month.slice(5)) + '월', tone(eu.vs)) : cell('—')) +
          (asia ? cell(signed(asia.vs), stockShow(asia.v) + ' · ' + asia.n + '개국 · ' + Number(asia.month.slice(5)) + '월', tone(asia.vs)) : cell('—')) +
          (cn ? cell(cn.vs !== null ? signed(cn.vs) : signed(cn.yy), cn.label + ' ' + flowShow(cn.v) + ' · ' + Number(cn.month.slice(5)) + '월' + (cn.vs !== null ? ' · 5년 평균 대비' : ' · 전년비')) : cell('—')) +
          (crk ? cell(fmt(crk.last[1], 1) + unit, crk.ago ? '1년 전 ' + fmt(crk.ago[1], 1) + unit : '') : cell('—')) + '</tr>';
      });
      s.insertAdjacentHTML('beforeend',
        '<article class="panel"><div class="table-scroll"><table class="market-table sc-table sc-summary"><thead><tr>' +
        '<th scope="col">제품</th><th scope="col">미국 재고<small>주간 · 5년 평균 대비</small></th><th scope="col">미국 재고 일수<small>4주 평균 공급량 기준</small></th>' +
        '<th scope="col">유럽 재고<small>최근 공통 월 · 5년 평균 대비</small></th><th scope="col">일본·한국·대만 재고<small>최근 공통 월 · 5년 평균 대비</small></th>' +
        '<th scope="col">중국<small>최근 보고 월</small></th><th scope="col">크랙·가격차<small>최근 주 평균 · 배럴당</small></th></tr></thead><tbody>' +
        rows.join('') + '</tbody></table></div>' +
        '<p class="sc-legend"><span class="sc-tight2">5년 평균보다 10% 이상 적음</span><span class="sc-tight">3~10% 적음</span><span class="sc-even">±3% 이내</span><span class="sc-ample">3~10% 많음</span><span class="sc-ample2">10% 이상 많음</span></p>' +
        source('미국은 EIA 주간 석유 현황(매주 수요일 발표, 직전 금요일 기준), 유럽·아시아는 JODI 월간(두 달가량 늦음). 5년 평균은 최근 연도 직전 5년(' +
          esc((W.distillate_stocks?.band_years || []).join('~')) + '년)의 같은 주·같은 달 평균. 유럽은 영국·독일·프랑스·이탈리아·스페인·네덜란드·벨기에·폴란드·튀르키예 중 해당 월 자료가 있는 나라의 합계. 중국은 재고를 보고하지 않아 수출입(원유는 정제 투입)을 싣는다. 크랙은 걸프연안 현물 − 쿠싱 WTI(원유 행은 브렌트 − WTI 현물 가격차), LPG 행은 프로판 가격의 WTI 대비 비율(%).') +
        '</article>');
      const ut = W.utilization;
      if (ut) {
        const g = grid(s);
        const a = panel(g, '미국 정유 가동률', '주간 · ' + dayLabel(ut.last.date));
        a.insertAdjacentHTML('beforeend', '<p class="insight-result"><strong>' + fmt(ut.last.value, 1) + '%</strong><span>' +
          ut.band_years.join('~') + '년 같은 주 평균 ' + fmt(ut.vs5?.avg, 1) + '% · 1년 전 ' + fmt(ut.y1?.value, 1) + '%</span></p>');
        seasonChart(a, weeklySeason(ut, UNITS.pct), {u: UNITS.pct, aria: '미국 정유 가동률 계절 비교'});
        const b = panel(g, '국가별 원유 정제 투입', J ? monthLabel(J.latest) + '까지 · 5년 평균 대비' : '');
        b.insertAdjacentHTML('beforeend', runsMiniTable());
      }
      // The method sits on the 출처·검증 desk; what this run kept from the last one is said here too.
      const carried = carriedItems();
      s.insertAdjacentHTML('beforeend', '<p class="note">' + (carried.length ? '이번 갱신에서 받지 못해 이전 값을 유지한 항목: ' + esc(carried.join(', ')) + '. ' : '') +
        '<a class="ref" href="#supply-method">자료와 산출 방법 ↗</a></p>');
    }
    function runsMiniTable() {
      if (!J) return '<p class="note">JODI 자료 없음.</p>';
      const codes = ['US', 'CN', 'IN', 'KR', 'JP', 'DE', 'GB', 'FR', 'IT', 'ES', 'NL', 'SA'];
      const rows = codes.map(c => {
        const l = jLatest(jEntry(c, 'CRUDEOIL', 'REFINOBS'));
        if (!l) return '';
        const vs = pct(l.v, l.avg);
        return '<tr><th scope="row">' + esc(J.countries[c]?.name || c) + '<small>' + monthLabel(l.month) + '</small></th><td class="latest">' + flowShow(l.v) + '</td><td>' + signed(pct(l.v, l.yago)) +
          '</td><td>' + signed(vs) + '</td></tr>';
      }).join('');
      return '<div class="table-scroll"><table class="market-table sc-table"><thead><tr><th scope="col">국가</th><th scope="col">정제 투입</th><th scope="col">전년비</th><th scope="col">5년 평균 대비</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
        source('JODI 원유 정제 투입(REFINOBS). 설비 능력 자료가 없어 가동률 대신 투입량을 비교한다.');
    }

    // ---- product views -----------------------------------------------------
    function chainHtml(p) {
      const yieldNote = p.yieldKey && SUP.us_yields?.[p.yieldKey] ? (() => {
        const pts = SUP.us_yields[p.yieldKey].points, last = pts.at(-1);
        return '<p class="note">미국 정유소의 ' + esc(SUP.us_yields[p.yieldKey].label) + ' 수율은 ' + monthLabel(last[0]) + ' ' + fmt(last[1], 1) + '%다(원유·미완성유 등 정제 투입량 대비, EIA ' + esc(SUP.us_yields[p.yieldKey].ref) + ').</p>';
      })() : '';
      return '<div class="sc-chain">' + p.chain.map(([stage, text, tickers]) =>
        '<div class="sc-stage"><b>' + esc(stage) + '</b><p>' + esc(text) + '</p>' + (tickers.length ? '<div class="sc-chips">' + chips(tickers) + '</div>' : '') + '</div>').join('') + '</div>' + yieldNote;
    }
    function countryTable(p) {
      if (!J || !p.jodi) return '';
      const flows = p.crude ? ['REFINOBS', 'INDPROD', 'TOTIMPSB', 'TOTEXPSB'] : ['REFGROUT', 'TOTDEMO', 'TOTEXPSB', 'TOTIMPSB'];
      const head = p.crude ? ['정제 투입', '생산', '수입', '수출'] : ['정유 생산', '수요', '수출', '수입'];
      const body = REGIONS.map(([region, rname]) => {
        const codes = Object.entries(J.countries).filter(([, c]) => c.region === region).map(([code]) => code);
        const rows = codes.map(code => {
          const product = code === 'CN' && p.cnProduct ? p.cnProduct : p.jodi;
          const st = jEntry(code, product, 'CLOSTLV'), l = jLatest(st);
          const fl = flows.map(f => jLatest(jEntry(code, product, f)));
          if (!l && !fl.some(Boolean)) return null;
          // Days of cover: stocks over daily demand, for crude over daily refinery intake.
          const demand = jLatest(jEntry(code, product, p.crude ? 'REFINOBS' : 'TOTDEMO'));
          const days = l && demand && demand.month === l.month && demand.v ? l.v / demand.v : null;
          const vs = l ? pct(l.v, l.avg) : null;
          const month = l?.month || fl.find(Boolean)?.month;
          return {size: l?.v || 0, html: '<tr><th scope="row">' + esc(J.countries[code].name) + (code === 'CN' && p.cnProduct ? '<small>등유 전체</small>' : '') + '<small>' + (month ? monthLabel(month) : '') + '</small></th>' +
            '<td class="latest">' + (l ? stockShow(l.v) : '<span class="note">미보고</span>') + '</td>' +
            '<td>' + (l ? signed(pct(l.v, l.yago)) : '—') + '</td>' +
            '<td class="' + tone(vs) + '">' + signed(vs) + '</td>' +
            '<td>' + (ok(days) ? fmt(days, 0) + '일' : '—') + '</td>' +
            fl.map(x => {
              // A flow from another month than the row's says so; one more than six months older is left out.
              const gap = x && month ? monthIndex(month) - monthIndex(x.month) : 0;
              if (!x || gap > 6) return '<td>—</td>';
              return '<td>' + flowShow(x.v) + '<small>' + signed(pct(x.v, x.yago)) + (x.month !== month ? ' · ' + monthLabel(x.month) : '') + '</small></td>';
            }).join('') +
            '<td>' + (st ? spark(st.prev, st.cur) : '') + '</td></tr>'};
        }).filter(Boolean).sort((a, b) => b.size - a.size);
        return rows.length ? '<tr class="sc-region"><th colspan="' + (6 + flows.length) + '">' + esc(rname) + '</th></tr>' + rows.map(r => r.html).join('') : '';
      }).join('');
      return '<div class="table-scroll"><table class="market-table sc-table sc-country"><thead><tr><th scope="col">국가</th><th scope="col">월말 재고</th><th scope="col">전년비</th><th scope="col">5년 평균 대비</th><th scope="col">' + (p.crude ? '정제 투입 일수' : '수요 일수') + '</th>' +
        head.map(h => '<th scope="col">' + h + '<small>전년비</small></th>').join('') + '<th scope="col">재고 추이<small>전년·올해</small></th></tr></thead><tbody>' + body + '</tbody></table></div>' +
        source('JODI-Oil 월간(' + esc(J.products[p.jodi] || p.jodi) + '). 재고는 월말, 흐름은 하루 평균. ' + (p.crude ? '정제 투입 일수는 월말 원유 재고를 같은 달 하루 정제 투입으로' : '수요 일수는 월말 재고를 같은 달 하루 수요로') +
          ' 나눈 값. 각국 최근 월이 다르고, 행의 월과 다른 흐름 값에는 그 월을 적었다.');
    }
    function buildProduct(p) {
      const s = section('supply-' + p.id, p.name, p.gas ? '재고 · 가격' : '밸류체인 · 재고 · 크랙');
      s.insertAdjacentHTML('beforeend', '<article class="panel sc-chain-panel"><div class="panel-head"><h3>밸류체인</h3><span class="meta">기업명을 누르면 기업 카드로 이동</span></div>' + chainHtml(p) + '</article>');
      const g = grid(s);
      const st = W[p.us.stock];
      if (st) {
        const a = panel(g, p.gas ? '미국 천연가스 지하 저장' : '미국 ' + st.label, '주간 · EIA ' + st.ref);
        a.insertAdjacentHTML('beforeend', '<p class="sc-headline">' + stockSentence(st) + '</p>');
        seasonChart(a, weeklySeason(st, unitOf(st)), {u: unitOf(st), aria: st.label + ' 계절 비교'});
      }
      if (p.us.cover && COVER[p.us.cover]) {
        const cv = COVER[p.us.cover];
        const a = panel(g, cv.label, '재고 ÷ 4주 평균 공급량');
        a.insertAdjacentHTML('beforeend', '<p class="sc-headline">' + dayLabel(cv.last.date) + ' ' + fmt(cv.last.value, 1) + '일' + (cv.vs5 ? '로 ' +
          versus(cv.band_years.join('~') + '년 같은 주 평균(' + fmt(cv.vs5.avg, 1) + '일)', cv.vs5.diff, '일', '짧다', '길다') : '이다') + '.</p>');
        seasonChart(a, weeklySeason(cv, UNITS.cover), {u: UNITS.cover, aria: cv.label + ' 계절 비교'});
      }
      for (const key of p.us.more || []) {
        const e = W[key];
        if (!e) continue;
        const a = panel(g, e.label, '주간 · EIA ' + e.ref);
        a.insertAdjacentHTML('beforeend', '<p class="sc-headline">' + stockSentence(e) + '</p>');
        seasonChart(a, weeklySeason(e, unitOf(e)), {u: unitOf(e), aria: e.label + ' 계절 비교'});
      }
      if ((p.cracks || []).length) {
        const lines = p.cracks.map(c => ({label: c.label, color: c.color, dash: c.dash, points: spread(c)}));
        const main = crackLine(lines[0].points);
        const a = panel(g, p.crude ? '원유 가격 차이' : p.crackUnit ? '프로판 가격 비율' : '크랙 스프레드', '주간 평균 · ' + (p.crackUnit ? '%' : '달러/배럴'));
        if (main) {
          const unit = p.crackUnit || '달러';
          a.insertAdjacentHTML('beforeend', '<p class="sc-headline">' + topic(p.cracks[0].name) + ' ' + weekLabel(main.last[0]) + ' 평균 ' + fmt(main.last[1], 1) + unit +
            (main.ago ? '로 ' + versus('1년 전(' + fmt(main.ago[1], 1) + unit + ')', main.last[1] - main.ago[1], p.crackUnit ? '%p' : '달러', '낮다', '높다') : cop(unit)) + '.</p>');
        }
        lineChart(a, lines, {aria: '크랙 스프레드 추이', digits: 1});
        const kind = p.cracks[0].kind;
        a.insertAdjacentHTML('beforeend', source((kind === 'ratio' ? '프로판 가격(달러/갤런)×42를 WTI 가격으로 나눈 비율(%)의 주간 평균.'
          : kind === 'bbl' ? '브렌트와 WTI 가격(달러/배럴) 차이의 주간 평균.'
          : '제품가(달러/갤런)×42에서 원유가를 뺀 값의 주간 평균.') + ' FRED(EIA 현물)·Yahoo 근월물. 현물은 FRED 게재가 1주가량 늦고, 사흘 미만 자료가 쌓인 주는 아직 넣지 않는다.'));
      }
      if (p.prices) {
        const lines = p.prices.map(([k, label], i) => ({label, color: i ? C.alt[i - 1] : C.cur, dash: k === 'ng_fut', points: weekly(k) || []}));
        const a = panel(g, '가스 가격', '주간 평균 · 달러/MMBtu');
        lineChart(a, lines, {aria: '가스 가격 추이', digits: 2});
        const ttf = PRICES.ttf_fut;
        a.insertAdjacentHTML('beforeend', source((ttf?.last ? 'TTF는 최근 ' + fmt(ttf.last.value, 2) + '유로/MWh다(' + dayLabel(ttf.last.date) + '). ' : '') +
          'EU 저장률은 천연가스·LNG 탭의 \'EU 지하 가스 저장\'(조사 시점 자료)에 있다.'));
      }
      const flows = (p.us.flows || []).map(k => W[k]).filter(Boolean);
      if (flows.length) {
        const a = panel(g, '미국 생산·수요·교역', '주간 · 흐름은 4주 평균');
        a.insertAdjacentHTML('beforeend', flowTable([st, ...flows]) + source('EIA 주간 석유 현황. 공급량(product supplied)은 수요 대용 지표.'));
      }
      if (p.asiaExports && J) {
        const product = code => code === 'CN' && p.cnProduct ? p.cnProduct : p.jodi;
        const lines = p.asiaExports.map((code, i) => {
          const e = jEntry(code, product(code), 'TOTEXPSB');
          if (!e) return null;
          const pts = [...e.prev.map((v, k) => [(J.year - 1) + '-' + String(k + 1).padStart(2, '0') + '-15', ok(v) ? v / 10 : null]),
                       ...e.cur.map((v, k) => [J.year + '-' + String(k + 1).padStart(2, '0') + '-15', ok(v) ? v / 10 : null])].filter(q => ok(q[1]));
          return {label: J.countries[code]?.name || code, color: i ? C.alt[i - 1] : C.cur, points: pts};
        }).filter(Boolean);
        const mideast = p.asiaExports.some(c => J.countries[c]?.region === 'mideast');
        const a = panel(g, (mideast ? '아시아·중동 ' : '아시아 ') + (J.products[p.jodi] || p.name) + ' 수출', '월간 · 만 배럴/일 · JODI');
        lineChart(a, lines, {aria: p.name + ' 수출 추이', digits: 0, zero: true});
        a.insertAdjacentHTML('beforeend', source('JODI 수출(TOTEXPSB). 중국은 수출 허가 물량에 따라 월별 변동이 크다.' + (p.cnProduct ? ' 중국은 항공유를 따로 보고하지 않아 등유 전체를 쓴다.' : '')));
      }
      if (p.jodi) {
        const a = panel(s, '국가별 ' + (p.jodi2 ? J?.products?.[p.jodi] || p.name : p.name) + ' 재고와 흐름', J ? monthLabel(J.latest) + '까지 · JODI 월간' : '');
        a.insertAdjacentHTML('beforeend', countryTable(p));
        if (p.jodi2) {
          const b = panel(s, '국가별 LPG 재고와 흐름', J ? monthLabel(J.latest) + '까지 · JODI 월간' : '');
          b.insertAdjacentHTML('beforeend', countryTable({...p, jodi: p.jodi2, cnProduct: null}));
        }
        // Seasonal charts for the largest European and Asian holders.
        const pick = ['DE', 'FR', 'GB', 'JP', 'KR'].filter(c => jEntry(c, p.jodi, 'CLOSTLV')?.avg);
        if (pick.length) {
          const gg = grid(s);
          for (const c of pick.slice(0, 4)) {
            const e = jEntry(c, p.jodi, 'CLOSTLV');
            const a2 = panel(gg, J.countries[c].name + ' ' + (J.products[p.jodi] || p.name) + ' 재고', '월말 · 백만 배럴');
            const l = jLatest(e);
            if (l) a2.insertAdjacentHTML('beforeend', '<p class="sc-headline">' + monthLabel(l.month) + ' ' + stockShow(l.v) + (ok(l.avg) ? '로 ' + versus('5년 평균', pct(l.v, l.avg), '%', '적다', '많다') : cop(stockShow(l.v))) + '.</p>');
            seasonChart(a2, monthlySeason(e, UNITS.stock), {u: UNITS.stock, aria: J.countries[c].name + ' 재고 계절 비교'});
          }
        }
      }
    }

    // ---- 정제 가동 ------------------------------------------------------------
    function buildRuns() {
      const s = section('supply-runs', '정유 가동과 원유 투입', '미국 주간 · 국가별 월간');
      const g = grid(s);
      for (const key of ['utilization', 'crude_runs']) {
        const e = W[key];
        if (!e) continue;
        const u = unitOf(e);
        const a = panel(g, '미국 ' + e.label, '주간 · EIA ' + e.ref + (e.basis === 'avg4' ? ' · 4주 평균' : ''));
        a.insertAdjacentHTML('beforeend', '<p class="sc-headline">' + dayLabel(e.last.date) + ' ' + show(e.last.value, u) + (e.vs5 ? '로 ' +
          versus(e.band_years.join('~') + '년 같은 주 평균(' + show(e.vs5.avg, u) + ')', key === 'utilization' ? e.vs5.diff : e.vs5.pct, key === 'utilization' ? '%p' : '%', '낮다', '높다') : cop(show(e.last.value, u))) + '.</p>');
        seasonChart(a, weeklySeason(e, u), {u, aria: e.label + ' 계절 비교'});
      }
      if (J) {
        const gg = grid(s);
        for (const c of ['CN', 'KR', 'JP', 'DE']) {
          const e = jEntry(c, 'CRUDEOIL', 'REFINOBS');
          if (!e) continue;
          const l = jLatest(e);
          const a = panel(gg, J.countries[c].name + ' 원유 정제 투입', '월간 · 만 배럴/일 · JODI');
          if (l) a.insertAdjacentHTML('beforeend', '<p class="sc-headline">' + monthLabel(l.month) + ' ' + flowShow(l.v) + (ok(l.avg) ? '로 ' + versus('5년 평균(' + flowShow(l.avg) + ')', pct(l.v, l.avg), '%', '적다', '많다') : cop(flowShow(l.v))) + '.</p>');
          seasonChart(a, monthlySeason(e, UNITS.flow), {u: UNITS.flow, aria: J.countries[c].name + ' 정제 투입 계절 비교'});
        }
        const t = panel(s, '국가별 원유 정제 투입', monthLabel(J.latest) + '까지');
        t.insertAdjacentHTML('beforeend', runsMiniTable());
      }
    }

    // ---- 비상 비축 ------------------------------------------------------------
    function buildReserves() {
      const s = section('supply-reserves', '비상 비축', '미국 SPR · EU 회원국 · 일본');
      const g = grid(s);
      const spr = W.spr;
      if (spr) {
        const a = panel(g, '미국 전략비축유(SPR)', '주간 · EIA ' + spr.ref);
        a.insertAdjacentHTML('beforeend', '<p class="sc-headline">' + stockSentence(spr) + (spr.y1 ? ' 1년 전(' + stockShow(spr.y1.value) + ')보다 ' + stockShow(Math.abs(spr.last.value - spr.y1.value)) + ' ' + (spr.last.value < spr.y1.value ? '적다' : '많다') + '.' : '') + '</p>');
        seasonChart(a, weeklySeason(spr, UNITS.stock), {u: UNITS.stock, aria: '미국 전략비축유 계절 비교'});
      }
      const jp = SUP.japan_reserves;
      if (jp?.rows?.length) {
        const rows = jp.rows.slice(-13), last = rows.at(-1), max = Math.max(...rows.map(r => r.total || 0));
        const yearAgo = jp.rows.find(r => r.month === monthBack(last.month, 12));
        const a = panel(g, '일본 석유 비축 일수', '월말 · 경제산업성(PAJ 통계 05)');
        a.insertAdjacentHTML('beforeend', '<p class="sc-headline">' + monthLabel(last.month) + ' ' + fmt(last.total, 0) + '일(민간 ' + fmt(last.private, 0) + '일, 국가 ' + fmt(last.national, 0) + '일, 산유국 공동 ' + fmt(last.joint, 0) + '일)이다.' +
          (yearAgo && ok(yearAgo.total) ? ' ' + versus('1년 전(' + fmt(yearAgo.total, 0) + '일)', last.total - yearAgo.total, '일', '짧다', '길다', 0) + '.' : '') + '</p>' +
          '<div class="sc-stack" role="img" aria-label="일본 비축 일수 월별 구성">' + rows.map(r => '<div class="sc-stack-col"><span class="sc-stack-total">' + fmt(r.total, 0) + '</span><div class="sc-stack-bar" style="height:' + Math.round((r.total || 0) / max * 112) + 'px">' +
            [['national', '국가'], ['private', '민간'], ['joint', '공동']].map(([k]) => '<i class="sc-' + k + '" style="flex:' + (r[k] || 0) + '"></i>').join('') + '</div><small>' + Number(r.month.slice(5)) + '월</small></div>').join('') + '</div>' +
          '<p class="insight-legend"><span><i class="sc-national"></i>국가 비축</span><span><i class="sc-private"></i>민간 비축</span><span><i class="sc-joint"></i>산유국 공동 비축</span></p>' +
          source((jp.private_obligation?.days ? '민간 비축 의무는 ' + fmt(jp.private_obligation.days, 0) + '일이다' +
            (/^\d{4}-\d{2}-\d{2}$/.test(jp.private_obligation.since || '') ? '(' + jp.private_obligation.since.slice(0, 4) + '년 ' + Number(jp.private_obligation.since.slice(5, 7)) + '월 ' +
              Number(jp.private_obligation.since.slice(8)) + '일부터, 자원에너지청)' : '') + '. ' : '') +
            '일수는 석유비축법 기준이며, 원유는 0.95를 곱해 제품량으로 환산한다(민간·국가·산유국 공동 모두).'));
      }
      const eu = SUP.eu_emergency;
      if (eu?.rows) {
        const rows = Object.entries(eu.rows).map(([geo, r]) => {
          const month = r.points.at(-1)[0], ago = r.points.find(p => p[0] === monthBack(month, 12));
          return {geo, name: r.name, month, days: r.points.at(-1)[1], ago: ago ? ago[1] : null};
        })
          .sort((a, b) => b.days - a.days);
        const max = Math.max(...rows.map(r => r.days), eu.minimum_days);
        const compared = rows.filter(r => ok(r.ago)), fell = compared.filter(r => r.days < r.ago);
        const drop = [...fell].sort((a, b) => (a.days - a.ago) - (b.days - b.ago)).slice(0, 3);
        const a = panel(s, 'EU 회원국 비상 비축 일수', monthLabel(eu.latest) + '까지 · Eurostat nrg_stk_oem');
        a.insertAdjacentHTML('beforeend', '<p class="sc-headline">1년 전과 비교할 수 있는 ' + compared.length + '개국 중 ' + fell.length + '개국의 비축 일수가 줄었다' +
          (drop.length ? '. 감소 폭이 큰 나라는 ' + drop.map(r => esc(r.name) + '(' + signed(r.days - r.ago, 1, '일') + ')').join(', ') + cop(drop.at(-1).name) : '') + '.</p>' +
          '<div class="sc-bars">' + rows.map(r => '<div class="sc-bar-row"><span>' + esc(r.name) + '<small>' + Number(r.month.slice(5)) + '월</small></span><div class="sc-bar-track"><i style="width:' + (r.days / max * 100).toFixed(1) +
            '%"></i><b style="left:' + (eu.minimum_days / max * 100).toFixed(1) + '%"></b></div><em>' + fmt(r.days, 1) + '일' + (ok(r.ago) ? '<small>' + signed(r.days - r.ago, 1, '일') + '</small>' : '') + '</em></div>').join('') + '</div>' +
          source('Eurostat이 EU 지침(2009/119/EC) 기준으로 환산한 비축 일수. 지침은 하루 평균 순수입의 90일분과 국내 소비의 61일분 중 큰 쪽을 요구하므로, 점선(90일)은 참고선이며 나라별 의무 수준과 다를 수 있다. 숫자 아래는 1년 전 대비. 영국은 EU 통계에서 빠져 JODI 재고(석유제품 화면)로 본다.'));
      }
    }

    // ---- 자료·방법 (출처·검증 데스크에 놓인다) ---------------------------------------
    // What this run could not refresh, in the page's words.
    function carriedItems() {
      const NAMES = {us_cover: '미국 재고 일수', us_yields: '미국 정유 수율', us_rigs: '미국 가동 리그 수', us_drilling: '미국 시추 생산성 지표',
        jodi: 'JODI 국가 자료', eu_emergency: 'EU 비상 비축', japan_reserves: '일본 비축 일수'};
      const carried = Object.entries(SUP).filter(([, v]) => v && typeof v === 'object' && v.carried)
        .map(([k]) => (NAMES[k] || k) + (k === 'jodi' && SUP.jodi.stale_files?.length ? '(' + SUP.jodi.stale_files.join(', ') + ' 파일)' : ''));
      for (const [k, v] of Object.entries(SUP)) {
        if (!v || typeof v !== 'object' || v.carried || !NAMES[k]) continue;
        const inner = Object.entries(v).filter(([, e]) => e && typeof e === 'object' && e.carried).map(([, e]) => e.label || '');
        if (inner.length) carried.push(NAMES[k] + ' 일부(' + inner.filter(Boolean).join(', ') + ')');
      }
      return [...carried, ...Object.entries(W).filter(([, v]) => v.carried).map(([, v]) => v.label || v.ref)];
    }
    function buildMethod() {
      const s = section('supply-method', '제품별 수급 자료와 산출 방법', '');
      const carried = carriedItems();
      const rows = [
        ['EIA 주간 석유 현황·가스 저장', '주간(석유 수요일·가스 저장 목요일 발표, 직전 금요일 기준)', W.distillate_stocks ? dayLabel(W.distillate_stocks.last.date) : '—', 'www.eia.gov/dnav/pet · ng (hist_xls)'],
        ['EIA 정유 수율', '월간(약 2개월 지연)', SUP.us_yields?.distillate ? monthLabel(SUP.us_yields.distillate.points.at(-1)[0]) : '—', 'MGFRYUS3 · MDIRYUS3 · MKJRYUS3'],
        ['EIA 가동 리그 수', '월간(매월 말 발표, 전월까지)', SUP.us_rigs?.total?.points?.length ? monthLabel(SUP.us_rigs.total.points.at(-1)[0]) : '—', 'www.eia.gov/dnav/ng (hist_xls) · E_ERTRR*'],
        ['EIA 단기 에너지 전망 표 10a', '월간(매월 10일 전후 발표, 전월까지)', SUP.us_drilling?.latest ? monthLabel(SUP.us_drilling.latest) : '—', 'www.eia.gov/outlooks/steo (STEO_m.xlsx)'],
        ['JODI-Oil 세계 데이터베이스', '월간(약 2개월 지연, 매월 갱신)', J ? monthLabel(J.latest) : '—', 'www.jodidata.org 연도별 CSV'],
        ['Eurostat 비상 비축 일수', '월간(약 2개월 지연)', SUP.eu_emergency?.latest ? monthLabel(SUP.eu_emergency.latest) : '—', 'nrg_stk_oem · STK_EUE_DIR'],
        ['일본 석유 비축 일수', '월간(매월 15일 전후)', SUP.japan_reserves?.rows?.length ? monthLabel(SUP.japan_reserves.rows.at(-1).month) : '—', '석유연맹 통계 05(경제산업성)'],
        ['제품·원유 가격', '일간 → 주간 평균', PRICES.brent?.last ? dayLabel(PRICES.brent.last.date) : '—', 'FRED(EIA 현물) · Yahoo 근월물'],
      ];
      s.insertAdjacentHTML('beforeend', '<article class="panel"><div class="table-scroll"><table class="market-table text-table"><thead><tr><th scope="col">자료</th><th scope="col">주기</th><th scope="col">최신 기준</th><th scope="col">원천</th></tr></thead><tbody>' +
        rows.map(r => '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td><td>' + esc(r[2]) + '</td><td>' + esc(r[3]) + '</td></tr>').join('') + '</tbody></table></div>' +
        '<ul class="sc-method">' +
        '<li>5년 범위·평균: 최근 연도 직전 5년. 주간 자료는 해마다 같은 날짜(±3일)에 가장 가까운 관측치를, 월간 자료는 같은 달을 비교한다. 3개 연도 미만이면 범위를 그리지 않는다.</li>' +
        '<li>흐름(생산·공급량·수출입·정제 투입)은 EIA 관행대로 4주 평균, 재고 일수는 재고를 4주 평균 공급량으로 나눈 값이다.</li>' +
        '<li>JODI 평가 코드는 1(비교 가능)·2(메타데이터 확인 필요)·3(미평가)이다. 값은 원자료대로 쓰되, 코드 3으로 실린 0은 미보고로 보고 뺐다. 중국·싱가포르·인도네시아·말레이시아·쿠웨이트는 재고를, 인도는 최근 몇 달을 보고하지 않았다.</li>' +
        '<li>싣지 못한 자료: 싱가포르 주간 재고(엔터프라이즈 싱가포르, 공개 API 없음), ARA 제품 재고(Insights Global, 유료), EU 가스 저장(GIE AGSI, 인증키 필요), 한국 석유공사 주간 자료(자동 수집 미연결).</li>' +
        '</ul>' +
        '<p class="note">수집 ' + esc(kst(SUP.fetched_at)) + (carried.length ? ' · 이번에 갱신하지 못해 이전 값을 유지한 항목: ' + esc(carried.join(', ')) : '') + '</p></article>');
    }
  } catch (err) {
    console.error('supply: desk not built', err);
  }
})();
