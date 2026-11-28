/* 에너지 체인 모니터 · 작은 SVG 도형 (색은 CSS 토큰, 방향색은 변화 숫자에만) */
(function (root) {
'use strict';
const M = root.MonitorModel;
const isNum = v => typeof v === 'number' && isFinite(v);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
const f = (v, d) => isNum(v) ? M.fnum(v, d) : '—';
const fs = (v, d) => isNum(v) ? M.fsg(v, d) : '—';
const tOf = M.tOf;
function ext(vals, pad) { const a = vals.filter(isNum); if (!a.length) return [0, 1]; let lo = Math.min(...a), hi = Math.max(...a); if (lo === hi) { lo -= 1; hi += 1; } const p = (hi - lo) * (pad == null ? 0.06 : pad); return [lo - p, hi + p]; }
const sc = (d, r) => v => r[0] + (v - d[0]) / (d[1] - d[0] || 1) * (r[1] - r[0]);
function ticks(lo, hi, n) { const step0 = (hi - lo) / (n || 4); const p = Math.pow(10, Math.floor(Math.log10(step0))); const m = step0 / p; const step = (m < 1.5 ? 1 : m < 3 ? 2 : m < 7 ? 5 : 10) * p; const out = []; for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(+v.toFixed(10)); return out; }
const dg = v => Math.abs(v) >= 1000 ? 0 : Math.abs(v) >= 100 ? 0 : Math.abs(v) >= 10 ? 1 : 2;
const pathOf = pts => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('');
const segPaths = pts => { const out = []; let cur = []; for (const p of pts) { if (p && isNum(p[1])) cur.push(p); else if (cur.length) { out.push(cur); cur = []; } } if (cur.length) out.push(cur); return out.map(pathOf).join(''); };
const dirCls = v => !isNum(v) || v === 0 ? '' : v > 0 ? 'up' : 'dn';
const arrow = v => !isNum(v) ? '' : v > 0 ? '▲' : v < 0 ? '▼' : '·';

/* 행 안 위치 띠: 범위 · 순위 · 비율 · 배수 · 구간 */
function strip(pos, w, h) {
  w = w || 92; h = h || 14; if (!pos) return '<svg class="strip" width="' + w + '" height="' + h + '"></svg>';
  const y = h / 2; let s = '';
  if (pos.kind === 'band') {
    const d = ext([pos.min, pos.max, pos.cur, pos.prev], 0.04); const x = sc(d, [3, w - 3]);
    s += `<line class="st-bar" x1="${x(pos.min)}" x2="${x(pos.max)}" y1="${y}" y2="${y}"/><line class="st-avg" x1="${x(pos.avg)}" x2="${x(pos.avg)}" y1="${y - 4}" y2="${y + 4}"/>`;
    if (isNum(pos.prev)) s += `<circle class="st-prev" cx="${x(pos.prev)}" cy="${y}" r="3"/>`;
    s += `<circle class="st-cur" cx="${x(pos.cur)}" cy="${y}" r="3.4"/>`;
  } else if (pos.kind === 'rank') {
    const x = v => 3 + (pos.N > 1 ? (pos.N - v) / (pos.N - 1) : 0.5) * (w - 6);
    const xm = sc([pos.min, pos.max], [3, w - 3]);
    s += `<line class="st-rail" x1="3" x2="${w - 3}" y1="${y}" y2="${y}"/><line class="st-avg" x1="${xm(pos.med)}" x2="${xm(pos.med)}" y1="${y - 4}" y2="${y + 4}"/><circle class="st-cur" cx="${xm(pos.cur)}" cy="${y}" r="3.4"/>`;
  } else if (pos.kind === 'ratio') {
    const mx = Math.max(125, pos.cur * 1.05); const x = sc([0, mx], [3, w - 3]);
    s += `<rect class="st-fill" x="3" y="${y - 3}" width="${Math.max(0, x(pos.cur) - 3)}" height="6"/><line class="st-ref" x1="${x(100)}" x2="${x(100)}" y1="1" y2="${h - 1}"/>`;
  } else if (pos.kind === 'multiple') {
    const lg = Math.log10; const d = [lg(0.5), lg(Math.max(2, pos.cur * 1.3))]; const x = v => sc(d, [3, w - 3])(lg(v));
    s += `<line class="st-rail" x1="3" x2="${w - 3}" y1="${y}" y2="${y}"/><line class="st-ref" x1="${x(1)}" x2="${x(1)}" y1="1" y2="${h - 1}"/><circle class="st-cur" cx="${x(pos.cur)}" cy="${y}" r="3.4"/>`;
  } else return '';
  return `<svg class="strip" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true">${s}</svg>`;
}

/* 작은 선 */
function spark(pts, w, h, opt) {
  opt = opt || {}; w = w || 90; h = h || 22; const a = (pts || []).filter(p => p && isNum(p[1])); if (a.length < 2) return `<svg class="spark" width="${w}" height="${h}"></svg>`;
  const xs = a.map((p, i) => typeof p[0] === 'string' ? tOf(p[0]) : i); const ys = a.map(p => opt.log ? Math.log10(p[1]) : p[1]);
  const x = sc([Math.min(...xs), Math.max(...xs)], [1, w - 3]), y = sc(ext(ys.concat(opt.zero ? [0] : []), 0.08), [h - 2, 2]);
  let z = ''; if (opt.zero) { const yz = y(0); z = `<line class="ax-zero" x1="0" x2="${w}" y1="${yz}" y2="${yz}"/>`; }
  const P = a.map((p, i) => [x(xs[i]), y(ys[i])]);
  return `<svg class="spark" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true">${z}<path class="ln-main" d="${pathOf(P)}"/><circle class="st-cur" cx="${P[P.length - 1][0]}" cy="${P[P.length - 1][1]}" r="2.2"/></svg>`;
}

/* 여러 선 (날짜·월 축) */
function lines(v, W, H) {
  W = W || 500; H = H || 200; const pad = {l: 38, r: 64, t: 8, b: 20};
  /* 끝 라벨 자리: 가장 긴 라벨 길이만큼(최대 120px) */
  const endLen = Math.max(0, ...(v.series || []).map(s => { const p = (s.pts || []).filter(q => isNum(q[1])); return p.length ? (s.name + ' ' + f(p[p.length - 1][1], dg(p[p.length - 1][1]))).length : 0; }));
  pad.r = Math.min(120, Math.max(64, endLen * 6.4 + 10));
  const ser = v.series.map(s => ({...s, pts: (s.pts || []).filter(p => isNum(p[1])).map(p => [tOf(p[0]), v.log ? Math.log10(p[1]) : p[1], p[1]])})).filter(s => s.pts.length);
  if (!ser.length) return '<p class="miss">미수집</p>';
  const xs = ser.flatMap(s => s.pts.map(p => p[0])), ys = ser.flatMap(s => s.pts.map(p => p[1])).concat(v.zero ? [0] : []);
  const xd = [Math.min(...xs), Math.max(...xs)], yd = ext(ys, 0.06);
  const x = sc(xd, [pad.l, W - pad.r]), y = sc(yd, [H - pad.b, pad.t]);
  let g = '';
  const tk = ticks(yd[0], yd[1], 4); const st = tk.length > 1 ? Math.abs(tk[1] - tk[0]) : 1; const td = st >= 1 ? 0 : st >= 0.1 ? 1 : 2;
  for (const t of tk) { g += `<line class="grid" x1="${pad.l}" x2="${W - pad.r}" y1="${y(t)}" y2="${y(t)}"/><text class="ax" x="${pad.l - 4}" y="${y(t) + 3}" text-anchor="end">${v.log ? f(Math.pow(10, t), 0) : f(t, td)}</text>`; }
  if (v.zero && yd[0] < 0 && yd[1] > 0) g += `<line class="ax-zero" x1="${pad.l}" x2="${W - pad.r}" y1="${y(0)}" y2="${y(0)}"/>`;
  const span = xd[1] - xd[0]; const dd = new Date(xd[0]); const n = 5;
  for (let i = 0; i <= n; i++) { const t = xd[0] + span * i / n; const d = new Date(t).toISOString(); const lab = span > 400 * 864e5 ? d.slice(2, 4) + '.' + (+d.slice(5, 7)) : (+d.slice(5, 7)) + '.' + (+d.slice(8, 10)); g += `<text class="ax" x="${x(t)}" y="${H - 5}" text-anchor="middle">${lab}</text>`; }
  let ly = [];
  ser.forEach((s, i) => { const P = s.pts.map(p => [x(p[0]), y(p[1])]); g += `<path class="${s.alt ? 'ln-alt' : 'ln-main'}${s.dash ? ' dash' : ''}" d="${pathOf(P)}"/>`; const L = P[P.length - 1]; ly.push({y: L[1], x: L[0], t: s.name + ' ' + f(s.pts[s.pts.length - 1][2], dg(s.pts[s.pts.length - 1][2]))}); });
  ly.sort((a, b) => a.y - b.y); for (let i = 1; i < ly.length; i++) if (ly[i].y - ly[i - 1].y < 11) ly[i].y = ly[i - 1].y + 11;
  ly.forEach(l => { g += `<text class="lab" x="${W - pad.r + 4}" y="${l.y + 3}">${esc(l.t)}</text>`; });
  /* v.src: 그림 아래 자료 줄(인용 조건이 있는 원천). 글자로 두어 툴팁이 없는 휴대폰에서도 보인다 */
  return `<figure class="chart"><figcaption>${esc(v.title || '')}</figcaption><svg viewBox="0 0 ${W} ${H}" width="100%" preserveAspectRatio="xMinYMin meet">${g}</svg>${v.src ? `<p class="src-t">${esc(v.src)}</p>` : ''}</figure>`;
}

/* 달력 겹침 + 같은 기간 범위 (M3) */
function calband(v, W, H) {
  W = W || 500; H = H || 200; const pad = {l: 40, r: 52, t: 8, b: 20};
  const N = v.x === 'week' ? 53 : 12;
  const band = (v.band || []).slice(0, N);
  const all = []; band.forEach(b => b && all.push(b[0], b[2])); (v.cur || []).forEach(x => isNum(x) && all.push(x)); (v.prev || []).forEach(x => isNum(x) && all.push(x)); if (v.partial) all.push(v.partial.v); if (v.zero) all.push(0);
  const yd = ext(all, 0.05); const x = sc([0, N - 1], [pad.l, W - pad.r]), y = sc(yd, [H - pad.b, pad.t]);
  let g = '';
  for (const t of ticks(yd[0], yd[1], 4)) g += `<line class="grid" x1="${pad.l}" x2="${W - pad.r}" y1="${y(t)}" y2="${y(t)}"/><text class="ax" x="${pad.l - 4}" y="${y(t) + 3}" text-anchor="end">${f(t, dg(t))}</text>`;
  if (v.zero && yd[0] < 0) g += `<line class="ax-zero" x1="${pad.l}" x2="${W - pad.r}" y1="${y(0)}" y2="${y(0)}"/>`;
  const up = [], dn = [], av = [];
  band.forEach((b, i) => { if (b && isNum(b[0])) { up.push([x(i), y(b[2])]); dn.push([x(i), y(b[0])]); av.push([x(i), y(b[1])]); } });
  if (up.length) g += `<path class="band" d="${pathOf(up)}L${dn.slice().reverse().map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('L')}Z"/><path class="avg dash" d="${pathOf(av)}"/>`;
  const L = arr => (arr || []).slice(0, N).map((val, i) => isNum(val) ? [x(i), y(val)] : null);
  if (v.prev) g += `<path class="ln-alt" d="${segPaths(L(v.prev))}"/>`;
  if (v.cur) g += `<path class="ln-main thick" d="${segPaths(L(v.cur))}"/>`;
  const lastI = (v.cur || []).map((q, i) => isNum(q) ? i : -1).filter(i => i >= 0).pop();
  if (lastI != null) g += `<circle class="st-cur" cx="${x(lastI)}" cy="${y(v.cur[lastI])}" r="3.5"/>`;
  if (v.partial) { const i = +v.partial.m.slice(5, 7) - 1; g += `<circle class="st-prev" cx="${x(i)}" cy="${y(v.partial.v)}" r="3.5"/><text class="lab" x="${x(i) + 5}" y="${y(v.partial.v) - 5}">${(+v.partial.m.slice(5, 7))}월(${v.partial.n}일)</text>`; }
  const labs = v.x === 'week' ? [1, 10, 20, 30, 40, 50] : [1, 3, 5, 7, 9, 11];
  labs.forEach(k => g += `<text class="ax" x="${x(k - 1)}" y="${H - 5}" text-anchor="middle">${k}${v.x === 'week' ? '주' : '월'}</text>`);
  const key = `<span class="key">${v.noBand ? '' : '<i class="k-band"></i>범위 <i class="k-avg"></i>평균 '}<i class="k-main"></i>${esc(v.curLabel || '')} ${v.prev ? '<i class="k-alt"></i>' + esc(v.prevLabel || '') : ''}</span>`;
  return `<figure class="chart"><figcaption>${esc(v.title)} ${key}</figcaption><svg viewBox="0 0 ${W} ${H}" width="100%" preserveAspectRatio="xMinYMin meet">${g}</svg></figure>`;
}

/* 부호 있는 쌓기 막대 + 합계 눈금 (M6) */
function signedStack(items, W, unit, d) {
  W = W || 500; d = d == null ? 2 : d; const rowH = 46, H = items.length * rowH + 18, l = 124, r = W - 16;
  const all = items.flatMap(it => { let p = 0, n = 0; it.parts.forEach(s => { if (s.v > 0) p += s.v; else n += s.v; }); return [p, n, it.total]; });
  const m = Math.max(...all.map(Math.abs).filter(isNum), 1e-9) * 1.1; const x = sc([-m, m], [l, r]);
  let g = `<line class="ax-zero" x1="${x(0)}" x2="${x(0)}" y1="4" y2="${H - 18}"/>`;
  items.forEach((it, i) => {
    const yy = 8 + i * rowH; let p = 0, n = 0;
    g += `<text class="lab b" x="0" y="${yy + 13}">${esc(it.name)}</text>`;
    (it.note ? String(it.note).split(' · ') : []).slice(0, 2).forEach((t, j) => g += `<text class="ax" x="0" y="${yy + 25 + j * 11}">${esc(t)}</text>`);
    it.parts.forEach((s, k) => { if (!isNum(s.v)) return; const a = s.v >= 0 ? p : n; const b = a + s.v; if (s.v >= 0) p = b; else n = b; const x0 = Math.min(x(a), x(b)), w = Math.abs(x(b) - x(a)); g += `<rect class="seg seg${k}" x="${x0}" y="${yy + 2}" width="${Math.max(w, 0.8)}" height="16"/>`; if (w > 34) g += `<text class="seglab${k === 1 ? ' inv' : ''}" x="${x0 + w / 2}" y="${yy + 14}" text-anchor="middle">${fs(s.v, d)}</text>`; });
    if (isNum(it.total)) g += `<line class="tot" x1="${x(it.total)}" x2="${x(it.total)}" y1="${yy - 2}" y2="${yy + 24}"/><text class="lab ${dirCls(it.total)}" x="${Math.max(l, Math.min(r, x(it.total)))}" y="${yy + 34}" text-anchor="${x(it.total) < l + 60 ? 'start' : x(it.total) > r - 60 ? 'end' : 'middle'}">합계 ${arrow(it.total)}${f(Math.abs(it.total), d)}</text>`;
  });
  [-m * 0.9, 0, m * 0.9].forEach(t => g += `<text class="ax" x="${x(t)}" y="${H - 4}" text-anchor="middle">${fs(t, d >= 2 ? 1 : 0)}</text>`);
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" preserveAspectRatio="xMinYMin meet">${g}</svg>`;
}

/* 비율 막대 (100 기준) */
function ratioBars(bars, W) {
  W = W || 500; const rowH = 22, H = bars.length * rowH + 18, l = 96, r = W - 60;
  const mx = Math.max(125, ...bars.map(b => b.v).filter(isNum)) * 1.02; const x = sc([0, mx], [l, r]);
  let g = '';
  bars.forEach((b, i) => {
    const yy = 4 + i * rowH; g += `<text class="lab${b.b ? ' b' : ''}" x="0" y="${yy + 12}">${esc(b.name)}</text>`;
    if (b.miss) g += `<rect class="hatch" x="${l}" y="${yy + 2}" width="${r - l}" height="13"/><text class="ax" x="${l + 6}" y="${yy + 12}">${esc(b.miss)}</text>`;
    else if (isNum(b.v)) g += `<rect class="${b.light ? 'bar-l' : 'bar'}" x="${l}" y="${yy + 2}" width="${x(b.v) - l}" height="13"/><text class="lab num" x="${x(b.v) + 4}" y="${yy + 12}">${f(b.v, 0)}%</text>`;
  });
  g += `<line class="st-ref" x1="${x(100)}" x2="${x(100)}" y1="0" y2="${H - 14}"/><text class="ax" x="${x(100)}" y="${H - 3}" text-anchor="middle">100 = 전년 같은 달</text>`;
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" preserveAspectRatio="xMinYMin meet">${g}</svg>`;
}

/* 월 막대 (부호) */
function mbars(v, W, H) {
  W = W || 500; H = H || 160; const pad = {l: 40, r: 8, t: 10, b: 20}; const a = v.bars.filter(b => isNum(b[1])); if (!a.length) return '<p class="miss">미수집</p>';
  const yd = ext(a.map(b => b[1]).concat([0]), 0.1); const y = sc(yd, [H - pad.b, pad.t]); const bw = (W - pad.l - pad.r) / a.length;
  let g = ''; for (const t of ticks(yd[0], yd[1], 4)) g += `<line class="grid" x1="${pad.l}" x2="${W - pad.r}" y1="${y(t)}" y2="${y(t)}"/><text class="ax" x="${pad.l - 4}" y="${y(t) + 3}" text-anchor="end">${f(t, dg(t))}</text>`;
  g += `<line class="ax-zero" x1="${pad.l}" x2="${W - pad.r}" y1="${y(0)}" y2="${y(0)}"/>`;
  a.forEach((b, i) => { const x0 = pad.l + i * bw + 2; g += `<rect class="${i === a.length - 1 ? 'bar' : 'bar-l'}" x="${x0}" y="${Math.min(y(0), y(b[1]))}" width="${bw - 4}" height="${Math.abs(y(b[1]) - y(0))}"/>`; if (i % Math.ceil(a.length / 8) === 0 || i === a.length - 1) g += `<text class="ax" x="${x0 + bw / 2 - 2}" y="${H - 5}" text-anchor="middle">${b[0].slice(2, 4)}.${+b[0].slice(5, 7)}</text>`; });
  const L = a[a.length - 1]; g += `<text class="lab b" x="${W - pad.r}" y="${pad.t + 2}" text-anchor="end">${b2(L)}</text>`;
  function b2(L) { return (+L[0].slice(5, 7)) + '월 ' + fs(L[1], 2); }
  return `<figure class="chart"><figcaption>${esc(v.title)}</figcaption><svg viewBox="0 0 ${W} ${H}" width="100%" preserveAspectRatio="xMinYMin meet">${g}</svg></figure>`;
}

const API = {esc, f, fs, strip, spark, lines, calband, signedStack, ratioBars, mbars, ext, sc, ticks, dg, pathOf, segPaths, dirCls, arrow, isNum};
root.MonitorCharts = API;
})(window);
