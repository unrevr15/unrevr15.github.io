/* 에너지 체인 모니터 작업 공간 (#mon-ws)
 * 위→아래 시선 = 생각 순서: 단계 상자(어디서 어긋났나) → 열마다 흐름 차트(지금 위치·흐름) → 구조도(어떻게 번지나) → 레인별 시간 띠(언제 무슨 일).
 * 차트·노드·사건이 같은 열·같은 행에 놓인다. 노드를 고르면 같은 자리에서 그 고리를 여러 면(지역·품목·저장·운송)으로 펼친다.
 * 판정은 단계 상자와 구조도 두 곳에만. 왼쪽 = 믿을 수 있나(자료 시점·미수집)와 주의(변동 상위·가격 구조). 오른쪽 = 판정 근거(그림).
 * 수치·판정은 monitor-model.js 의 buildMonitorModel 한 곳에서 나온다. 이 파일은 배치만 한다.
 * MONITOR_HOPE 가 null 이면(공개본) 판정 낱말 없이 위치와 값만 보인다.
 * 독립 페이지 monitor.html 의 창 전체를 쓴다(2026-11-25). 노드 선택은 주소 해시(#c2)와 history 에 남는다.
 * 왼쪽 목록·오른쪽 상세는 화면의 열로 붙고 단추로 접는다. 덮는 창은 쓰지 않는다. */
(function () {
'use strict';
const ROOT = document.getElementById('mon-ws');
const M = window.MonitorModel, K = window.MonitorCharts;
if (!ROOT || !M || !K) return;
/* 리서치 페이지·매크로 대시보드 주소(monitor.html 의 data- 속성) */
const RESEARCH = ROOT.dataset.research || '', DASH = ROOT.dataset.dashboard || '';
/* 화면 이름: 매크로 대시보드의 F4 탭(에너지 체인)과 같은 이름 */
const MW_NAME = '에너지 체인 모니터';
/* 점검 → 더 깊이 볼 리서치 데스크. 앞쪽이 그 점검 해설(meta.guide) 앵커가 있는 데스크이거나 같은 상품 데스크다.
 * 이름은 리서치 페이지 데스크 탭 글자와 같다. 공개 사본에서 빠지는 데스크(조달)는 쓰지 않는다.
 * DESK_AT: 데스크 첫머리 대신 그 데스크 안의 절로 간다(⑬ 일정 기록의 출처인 계약·프로젝트 진행표) */
const DESKS = {oil: '원유', products: '정유·석유화학', supply: '제품별 수급', gas: '천연가스·LNG', power: '석탄·전력', copper: '구리', food: '식량', prices: '산업비용', inflation: '물가전이', war: '지정학', companies: '밸류체인 기업'};
const DESK_AT = {companies: 'records-contracts'};
const CHECK_DESKS = {c1: ['oil', 'war'], c2: ['oil'], c3: ['products'], c4: ['prices'], c5: ['supply', 'oil'], c6: ['oil', 'war'], c7: ['supply', 'products'], c8: ['products', 'oil'], c9: ['gas', 'supply'], c10: ['power', 'food', 'copper'], c11: ['prices'], c12: ['inflation'], c13: ['oil', 'gas', 'companies']};
const deskLinks = id => RESEARCH && CHECK_DESKS[id] ? `<span class="xc-r">리서치${CHECK_DESKS[id].map(d => `<a href="${esc(RESEARCH)}#${DESK_AT[d] || d}">${DESKS[d]} →</a>`).join('')}</span>` : '';
const offMsg = why => `<p class="mw-msg">${why} <a href="${RESEARCH}#monitor">리서치 페이지의 조사 지표</a>를 본다.</p>`;
const LIVE = window.ENERGY_LIVE;
if (!LIVE || !LIVE.series || !LIVE.supply) { ROOT.classList.add('mw-off'); ROOT.innerHTML = offMsg('실시간 자료가 없어 작업 공간을 그리지 않았다.'); return; }
const {esc, f, fs, strip, spark, isNum} = K;
const PAGES = M.MONITOR_HOPE === null;
ROOT.classList.toggle('pub', PAGES);
/* 참조 자료(교재 그림 값): EIA 국가별 전략 재고 추정 · 고정 관측이며 수집 자료가 아니다 */
const strategicRef = (() => { try { return (energyReference.datasets || []).find(d => d.id === 'strategic-stocks-quarterly') || null; } catch (e) { return null; } })();
const input = {live: LIVE, records: typeof disruptionRecords !== 'undefined' ? disruptionRecords : [], projects: typeof projectRecords !== 'undefined' ? projectRecords : [], recordsAsOf: typeof recordsAsOf !== 'undefined' ? recordsAsOf : null, chains: PAGES ? null : (typeof eventChains !== 'undefined' ? eventChains : null), strategic: strategicRef};
const store = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } };
const state = {win: store('monWs.win') || '4주', sel: null, tab: null, phone: false, edge: null, hover: null, axis: 'dir', lens: '전체', cmode: 'ex', ctab: null, ruleOpen: false, regOpen: null,
  ex: {flow: 'TOTEXPSB', prod: 'CRUDEOIL', cc: 'SA', meas: 'ratio'}, gx: {hub: 'eu', meas: 'level'}, cx: {item: 'cpi_all', meas: 'ann3'}, sx: {cell: 'room:Cushing'}, ux: {cell: 'use:world_demand'}};
if (!M.MONITOR_RULE.window.presets.includes(state.win)) state.win = '4주';
let model = null, WORLD = null;
const $ = s => ROOT.querySelector(s);

const VCLS = {'부합': 'v-ok', '불일치': 'v-no', '혼재': 'v-mix', '보합': 'v-flat', '판정 없음': 'v-none', '미수집': 'v-miss', '—': 'v-none'};
const vword = (v, extra) => `<span class="vw ${VCLS[v] || 'v-none'}">${esc(v)}</span>${extra || ''}`;
const fdate = (d, fr) => d ? M.fdate(d, fr) : '—';
const dnum = (v, u) => isNum(v) ? `<span class="num ${K.dirCls(v)}">${K.arrow(v)}${f(Math.abs(v), 2)}${u === '%' ? '%' : ''}</span>` : '—';
const MODEL_NAME = {M1: '창 변화', M2: '순위', M3: '계절·5년 범위', M4: '동월비', M5: '스프레드·구조', M6: '항등 분해', M7: '시차·전가', M8: '유량 대 능력', M9: '사건 정렬', M10: '조건부 산술', M11: '신선도', M12: '근거 범위', M13: '경로'};
function val(r) {
  if (!r || !isNum(r.value)) return '<span class="miss-t">미수집</span>';
  const u = r.unit || ''; const pre = u === '$' || u === '€' ? u : '';
  const post = pre ? '' : u; const neg = pre && r.value < 0;
  return `<b class="num">${neg ? '−' : ''}${pre}${f(neg ? -r.value : r.value, r.digits == null ? 2 : r.digits)}</b>${post ? `<small class="u">${esc(post)}</small>` : ''}`;
}
function delta(d, note) {
  if (!d) return note ? `<span class="note-t">${esc(note)}</span>` : '<span class="note-t">—</span>';
  const v = isNum(d.abs) ? d.abs : d.pct; const show = String(d.show || '').replace(/[$€]$/, '');
  if (d.roll) return `<span class="num roll" title="만기 교체를 포함한 근월물 연결 값 · 방향 판정 없음">${K.arrow(v)}${esc(show.replace(/^[+−]/, ''))}</span><small class="tag">교체</small>`;
  return `<span class="num ${K.dirCls(v)}">${K.arrow(v)}${esc(show.replace(/^[+−]/, ''))}</span>`;
}
function posText(p) {
  if (!p) return '';
  if (p.kind === 'band') return p.m ? M.fdate(p.m, 'M') + ' 범위 ' + p.pos : '범위 ' + p.pos;
  if (p.kind === 'rank') return p.part ? M.fdate(p.m, 'M') + ' ' + p.N + '중 ' + p.k + '위 · ' + M.fdate(p.part.m, 'M') + ' ' + p.part.k + '위' : p.N + '중 ' + p.k + '위';
  if (p.kind === 'ratio') return f(p.cur, 0) + '/100';
  if (p.kind === 'multiple') return '×' + f(p.cur, p.cur >= 10 ? 0 : 1) + ' 전년';
  return p.text || '';
}
/* 급변 표: 계열마다 최신값, 창 변화, 실제 관측 기간(시작→끝)과 평소 변화폭의 기준(주평균 σ·월 σ 환산·월평균)을 적는다.
 * 같은 창이라도 계열의 이력 모양에 따라 기간과 기준이 다를 수 있어서다. 기준 줄은 늘 보인다 */
function jumpTable(rows, none, big, title, small) {
  const ym = d => d.slice(2, 4) + '.' + d.slice(5, 7);
  const per = j => j.freq === 'M' && j.d0 && j.date && j.d0.slice(0, 4) !== j.date.slice(0, 4) ? ym(j.d0) + '→' + ym(j.date) : (j.d0 ? fdate(j.d0, j.freq) + '→' : '') + fdate(j.date, j.freq);
  const row = j => !j || j.miss ? `<tr><th>${esc(j ? j.name : '')}</th><td colspan="4"><span class="miss-t">미수집</span></td></tr>`
    : `<tr><th>${esc(j.name)}</th><td class="r nw">${j.big ? '<b>급변</b> · ' : ''}평소의 <b class="num">${M.zfmt(j.z, model.rule)}</b>배</td><td class="r num nw">${fs(j.chg, 1)}%</td><td class="r num nw">${f(j.v, Math.min(isNum(j.digits) ? j.digits : 2, 3))} <small>${esc(j.unit || '')}</small></td><td class="r nw">${per(j)}<small class="jb">${esc(j.basis || '')}</small></td></tr>`;
  return `${title ? `<p class="vh">${esc(title)}</p>` : ''}<div class="jtw"><table class="rtab jtab${small ? ' sm' : ''}"><thead><tr><th>계열</th><th class="r">평소 변화폭 대비</th><th class="r">창 변화</th><th class="r">최신</th><th class="r">관측 기간 · 기준</th></tr></thead><tbody>${rows.map(row).join('')}</tbody></table></div>${none ? `<p class="vh">${esc(none)}</p>` : ''}<p class="jk">창 변화 ÷ 그 계열의 평소 같은 길이 변화폭(표준편차). 평소의 ${big || model.rule.big_multiple}배 이상(${big || model.rule.big_multiple}배 포함)이면 급변이다. 판정에는 넣지 않는다.</p>`;
}
/* 판정 근거 패널용 급변 목록: 좁은 칸에서 줄을 바꿔도 읽히게 표 대신 줄글 칸으로 */
function jumpList(rows, none) {
  const ym = d => d.slice(2, 4) + '.' + d.slice(5, 7);
  const per = j => j.freq === 'M' && j.d0 && j.date && j.d0.slice(0, 4) !== j.date.slice(0, 4) ? ym(j.d0) + '→' + ym(j.date) : (j.d0 ? fdate(j.d0, j.freq) + '→' : '') + fdate(j.date, j.freq);
  return `<ul class="ejl">${rows.map(j => !j || j.miss ? `<li><b>${esc(j ? j.name : '')}</b> <span class="miss-t">미수집</span></li>`
    : `<li><b>${esc(j.name)}</b> <span class="num">${f(j.v, Math.min(isNum(j.digits) ? j.digits : 2, 3))}</span> <small>${esc(j.unit || '')}</small> · <span class="num">${fs(j.chg, 1)}%</span> · <span class="nw">${per(j)}</span> <small>${esc(j.basis || '')}</small> · ${j.big ? '<b>급변</b> · ' : ''}<span class="nw">평소의 <b class="num">${M.zfmt(j.z, model.rule)}</b>배</span></li>`).join('')}</ul>${none ? `<p class="ejn">${esc(none)}</p>` : ''}`;
}
function vis(v, ch) {
  if (!v) return '<p class="miss">미수집</p>';
  const W = state.phone ? Math.max(300, Math.min(500, window.innerWidth - 44)) : 500;
  switch (v.type) {
    case 'c1bars': {
      const bars = []; v.byCountry.forEach(c => { const nm = c.name.replace('사우디아라비아', '사우디'); bars.push({name: nm + ' 원유', v: c.crude, b: c.c === 'ALL'}); bars.push({name: nm + ' 제품·LPG', v: c.prod, light: true, b: c.c === 'ALL'}); });
      const tr = v.trend; const mini = K.lines({title: '월별 회복률 (전년 같은 달 = 100, ' + M.fdate(tr[0] && tr[0].m, 'M') + '~' + M.fdate(tr[tr.length - 1] && tr[tr.length - 1].m, 'M') + ')', series: [{name: '원유', pts: tr.map(x => [x.m, x.crude])}, {name: '제품', pts: tr.map(x => [x.m, x.prod]), alt: true}]}, W, 120);
      const last3 = tr.slice(-4).map(x => `${M.fdate(x.m, 'M')} ${f(x.crude, 0)}·${f(x.prod, 0)}`).join(' → ');
      return `<p class="vh">${M.fdate(v.m, 'M')} 동월비 · 두 달 모두 보고한 품목만 합산</p>` + K.ratioBars(bars, W) + `<p class="note-t">최근 4개월 원유·제품 회복률(%): ${esc(last3)} · 월별 선은 추세 탭</p>`;
    }
    case 'c1trend': return K.lines({title: '원유·제품 수출 회복률 (전년 같은 달 = 100)', series: [{name: '원유', pts: v.trend.map(x => [x.m, x.crude])}, {name: '제품', pts: v.trend.map(x => [x.m, x.prod]), alt: true}]}, W, 200);
    case 'c1priv': return `<p class="vh">비공개 · 선박 신호 기준 하한 · 최근 7일 평균 vs 전년 같은 분기 평균</p><table class="rtab"><thead><tr><th>해협</th><th class="r">7일 평균(척/일)</th><th class="r">전년 같은 분기</th><th class="r">비율</th><th class="r">관측</th></tr></thead><tbody>${v.priv.map(p => `<tr><th>${esc(p.label)}</th><td class="r num">${f(p.x, 1)}</td><td class="r num">${f(p.qv, 1)} <small>${esc(p.q)}</small></td><td class="r num">${f(p.r, 0)}%</td><td class="r">${fdate(p.date)}</td></tr>`).join('')}</tbody></table>` + K.lines({title: v.priv[0].label + ' 주간 유조선 통과 (척/일)', series: [{name: v.priv[0].label, pts: v.priv[0].weekly.map(x => [x[0], x[1]])}]}, W, 130);
    case 'c2struct': {
      const cells = v.rows.map((r, i) => `<div class="cell"><span class="c-l">${esc(r.label)}</span><span class="c-v">${val(r)}</span><span class="c-d">${delta(r.delta, r.deltaNote)} <small>${esc(state.win)}</small></span>${spark(i === 0 ? v.m1 : i === 1 ? v.sp : v.basis, 140, 30, {zero: i > 0})}<small>${i === 0 ? '근월물(T 행) ' + v.m1.length + '일' : i === 1 ? '근월−차월 ' + v.sp.length + '일' : '현물−근월 주간 ' + v.basis.length + '주'}</small></div>`).join('');
      const rk = v.rank;
      return `<div class="trio">${cells}</div>` + (rk ? `<div class="rankbig"><span class="vh">브렌트 현물 월평균 순위 (${M.fym(rk.from)} 이후 ${rk.N}개월)</span>${strip(rk, W - 40, 18)}<div class="rk-l"><span>낮음 ${f(rk.min, 0)}</span><span>중앙 ${f(rk.med, 1)} · ${M.fdate(rk.m, 'M')} ${f(rk.cur, 1)} = ${rk.k}위</span><span>높음 ${f(rk.max, 0)}</span></div></div>` : '');
    }
    case 'lines': return K.lines(v, W, 210);
    case 'mbars': return K.mbars(v, W, 180);
    case 'calband': {
      const ch2 = v.choices ? `<select class="calpick">${v.choices.map(c => `<option value="${esc(c.id)}">${esc(c.label)}</option>`).join('')}</select>` : '';
      return ch2 + `<div class="calwrap">${K.calband(v, W, 210)}</div>`;
    }
    case 'decomp': {
      const items = v.bars.map(b => ({name: b.name, note: b.note, parts: [{v: b.gPart}, {v: b.uPart}], total: b.dc}));
      return `<p class="vh">Δ3-2-1 = ⅔·Δ휘발유 크랙 + ⅓·ΔULSD 크랙 (항등식, $/배럴) <span class="key"><i class="k-seg0"></i>휘발유 몫 <i class="k-seg1"></i>경유 몫 <i class="k-tot"></i>합계</span></p>` + K.signedStack(items, W, '$', 2) + `<p class="note-t">현물은 주평균이라 월물과 무관하다. 같은 창을 브렌트·WTI 두 원유 기준으로 나란히 둔다: 원유 다리에 따라 부호가 바뀔 수 있다.${v.roll ? ' 선물 막대는 창 안 RB·HO 만기 교체로 뺐다.' : ''}</p>`;
    }
    case 'crackmatrix': {
      const dl = (v2, roll) => isNum(v2) ? `<span class="num ${roll ? 'roll' : K.dirCls(v2)}">${K.arrow(v2)}${f(Math.abs(v2), 2)}</span>${roll ? '<small class="tag">교체</small>' : ''}` : '—';
      return `<table class="rtab"><thead><tr><th>크랙 ($/배럴)</th><th class="r">최신 · 관측</th><th class="r">Δ1주</th><th class="r">Δ4주</th><th class="r">전년</th><th>같은 달 범위</th></tr></thead><tbody>${v.matrix.map(r => `<tr><th>${esc(r.name)}<small>${r.wk ? '주평균' : '선물 일별 · 근월물 연결'}</small></th><td class="r nw"><b class="num">${f(r.v, 2)}</b> <small class="u">${fdate(r.d, r.freq === 'W' ? 'W' : 'D')}${r.wk ? ' 주' : ''}</small></td><td class="r">${dl(r.d1, r.r1)}</td><td class="r">${dl(r.d4, r.r4)}</td><td class="r num nw">${r.wk ? (isNum(r.dy) ? K.arrow(r.dy) + f(Math.abs(r.dy), 2) : '—') : (isNum(r.yx) ? '×' + f(r.yx, 2) : '—')}</td><td>${r.pos ? esc(M.fdate(r.posM, 'M')) + ' 범위 ' + esc(r.pos) : '<small>범위 없음</small>'}</td></tr>`).join('')}</tbody></table><p class="note-t">Δ는 최신 칸의 관측일 기준. 같은 달 범위는 마지막 완결 월(월평균)을 2022–25 같은 달과 비교한 것이라 날짜가 다르다. 현물 전년 = 52주 전 주평균 대비 $ 차, 선물 전년 = 전년 같은 날 배수. 교체 = 창 안 RB·HO 월물 변경(방향 판정 없음).</p>`;
    }
    case 'study': {
      if (!v.study.length) return `<p class="vh">${esc(v.title)}</p><p class="miss">창 안 기록 없음</p>`;
      return `<p class="vh">${esc(v.title)}</p><table class="rtab"><thead><tr><th>기록</th><th class="r">정렬일</th><th class="r">${v.two ? esc(v.two[0]) + ' ' : ''}전</th><th class="r">${v.two ? esc(v.two[0]) + ' ' : ''}후</th>${v.two ? `<th class="r">${esc(v.two[1])} 전</th><th class="r">${esc(v.two[1])} 후</th>` : ''}</tr></thead><tbody>${v.study.slice(-8).map(s => `<tr><th>${esc(s.r.site || s.r.facility)}<small>${esc(s.r.type)}</small></th><td class="r">${fdate(s.d || s.r.ed.d)}</td><td class="r">${dnum(s.pre, v.unit)}</td><td class="r">${dnum(s.post, v.unit)}</td>${v.two ? `<td class="r">${dnum(s.pre2, v.unit)}</td><td class="r">${dnum(s.post2, v.unit)}</td>` : ''}</tr>`).join('')}</tbody></table><p class="note-t">${esc(v.note)}</p>`;
    }
    case 'retaildec': {
      const wItems = (v.win || []).map(d => ({name: d.name + ' ' + d.w, note: (d.weekly ? M.fdate(d.d0) + '→' + M.fdate(d.d1) + ' 조사일 · 도매 ' + M.fdate(d.wd0) + '→' + M.fdate(d.wd1) + ' 주' : M.fdate(d.d0, 'M') + '→' + M.fdate(d.d1, 'M') + ' 월평균'), parts: [{v: d.dW}, {v: d.dM}], total: d.dR}));
      const mItems = v.items.map(d => ({name: d.name + ' ' + M.fdate(d.m, 'M') + ' 월', note: '마진 ' + f(d.margin, 3) + ' · ' + d.q + '백분위', parts: [{v: d.dW}, {v: d.dM}], total: d.dR}));
      const rk = v.ranks.map((r, i) => r ? `<div class="rankrow"><span>${i ? '경유' : '휘발유'} 소매 월평균</span>${strip(r, 220, 14)}<small>${M.fym(r.from)} 이후 ${r.N}개월 중 ${r.k}위 · ${M.fdate(r.m, 'M')}${r.part ? ` · ${M.fdate(r.part.m, 'M')}(${r.part.n}회) ${r.part.N}개 중 ${r.part.k}위` : ''}</small></div>` : '').join('');
      return `<p class="vh">Δ소매 = Δ도매(USGC) + Δ소매 마진 ($/갤런) <span class="key"><i class="k-seg0"></i>도매 몫 <i class="k-seg1"></i>마진 몫 <i class="k-tot"></i>합계</span></p>` + K.signedStack(wItems.concat(mItems), W, '$', 3) + `<p class="note-t">위 두 막대 = 선택 창(소매 조사일 a→b, 도매는 각 조사일 직전 주평균), 아래 두 막대 = 마지막 완결 달의 전월 대비. 같은 부호에서 마진 몫이 도매 몫보다 크면 '마진 몫 > 도매 몫', 반대 부호면 '마진 확대(소매 지연)'.</p>` + rk;
    }
    case 'jumps': {
      /* 급변: 창 변화(%) ÷ 평소 변화폭. 배수가 기준 이상이면 '급변' 낱말을 붙인다(새 색 없음) */
      return jumpTable(v.rows, v.none, v.big, v.title);
    }
    case 'strips': return `<p class="vh">${esc(v.head)} · 범위 아래로 먼 순 <span class="key"><i class="k-band"></i>${'같은 주 범위'} <i class="k-avg"></i>평균 <i class="k-main"></i>올해 <i class="k-alt"></i>전년</span></p><div class="strips">${v.rows.map(r => `<div class="srow"><span class="s-l">${esc(r.label.replace(/\s*\(.*\)/, ''))}</span><span class="s-v">${val(r)}</span>${strip(r.pos, 150, 14)}<span class="s-p">${esc(r.pos.pos)}</span><span class="s-d">${delta(r.delta)}</span></div>`).join('')}</div>`;
    case 'stocktable': return `<div class="two-t"><div><p class="vh">EU 비상 비축 (일, 국가별 최신 달) · 기준 ${v.eu.min}일</p><table class="rtab"><tbody>${v.eu.list.slice(0, 10).map(x => `<tr><th>${esc(x.name)}</th><td class="r num">${f(x.p[1], 1)}</td><td class="r">${M.fdate(x.p[0], 'M')}</td><td>${x.p[1] < v.eu.min ? '기준 미만' : ''}</td></tr>`).join('')}</tbody></table></div><div><p class="vh">JODI 재고 (백만 배럴) vs 같은 달 ${v.by.join('–')}</p><table class="rtab"><tbody>${v.jodi.map(x => `<tr><th>${esc(x.name)} ${esc(x.pr)}</th><td class="r num">${f(x.v, 1)}</td><td class="r">${M.fdate(x.m, 'M')}</td><td>${x.bp ? '범위 ' + x.bp.pos : ''}</td></tr>`).join('')}</tbody></table></div></div>`;
    case 'c6pair': {
      const an = v.anchor || {};
      return `<div class="pair"><div><span class="big num">${f(v.dd, 0)}%</span><small>52주 고점(${M.fdate(v.hiD)} 주 ${f(v.hi, 0)}) 대비</small></div><div><span class="big num">×${f(v.multW, 1)}</span><small>전년 같은 주 대비 · 1× 기준</small></div>${PAGES ? '' : `<div class="wide"><table class="rtab small"><thead><tr><th>앵커</th><th class="r">Δ${esc(state.win)}</th><th class="r">변화/σ</th><th>방향</th></tr></thead><tbody><tr><th>주평균 <small>판정 사용 · ${M.fdate(an.d0)}→${M.fdate(v.last && v.last[0])}</small></th><td class="r">${dnum(an.pW, '%')}</td><td class="r num">${f(an.z1, 2)}</td><td>${vword(an.dirW)}</td></tr><tr class="ctx"><th>일별 마지막 값 <small>비교 · ${M.fdate(an.dD)}</small></th><td class="r">${dnum(an.pD, '%')}</td><td class="r num">${f(an.z2, 2)}</td><td>${vword(an.dirD)}</td></tr></tbody></table><small>보합 문턱 |변화/σ| &lt; ${model.rule.flat.sigma}</small></div>`}</div>` + K.lines({title: 'BWET 주평균 52주 (로그 눈금, $)', series: [{name: 'BWET', pts: v.pts}], log: true}, W, 160) + '<p class="note-t">운임선물 ETF 가격이며 운임(WS·달러/일)이 아니다. ' + (PAGES ? '' : '두 앵커의 판정이 다르면 행에 경계 표시가 붙는다.') + '</p>';
    }
    case 'rankonly': return v.rank ? `<p class="vh">${esc(v.label)}</p>${strip(v.rank, W - 40, 18)}<div class="rk-l"><span>낮음 ${f(v.rank.min, 1)}</span><span>중앙 ${f(v.rank.med, 1)} · 최신 ${f(v.rank.cur, 1)} = ${v.rank.k}위</span><span>높음 ${f(v.rank.max, 1)}</span></div>` : '<p class="miss">미수집</p>';
    case 'ranklist': return `<div class="strips">${v.rows.map(r => r.pos && r.pos.kind === 'rank' ? `<div class="srow"><span class="s-l">${esc(r.label)}</span><span class="s-v">${val(r)}</span>${strip(r.pos, 150, 14)}<span class="s-p nw">${r.pos.N}중 ${r.pos.k}위</span><span class="s-d">${r.pos.cur > r.pos.med ? '중앙 위' : '중앙 아래'}</span></div>` : '').join('')}</div><p class="note-t">순위는 각 계열의 월평균 이력 안 위치. 근월물 선물은 연결 월물이다.</p>`;
    case 'routes': return `<p class="vh">${esc(v.head || '비공개 · 주간 통과(척/일) vs 전년 같은 주')}</p><table class="rtab"><tbody>${v.routes.map(r => `<tr><th>${esc(r.label)}</th><td class="r num">${f(r.v, v.digits == null ? 2 : v.digits)}</td><td class="r num">${f(r.y, v.digits == null ? 2 : v.digits)}</td><td class="r num">${f(r.r, 0)}%</td><td class="r">${fdate(r.d)}</td></tr>`).join('')}</tbody></table>`;
    case 'c7': return `<div class="pair"><div><span class="big num">${f(v.spare.value, 0)}</span><small>여유능력 천 b/d · ${fdate(v.spare.date)} · Δ${esc(state.win)} ${delta(v.spare.delta)}</small></div><div class="wide">${strip(v.util.pos, 240, 18)}<small>가동률 ${f(v.util.value, 1)}% · 같은 주 범위 ${f(v.util.pos.min, 1)}~${f(v.util.pos.max, 1)} → ${esc(v.util.pos.pos)} · 전년 ${f(v.util.pos.prev, 1)}</small></div></div>` + K.calband({title: '여유능력 = 능력 − 총투입 (천 b/d, 주)', x: 'week', band: [], noBand: true, cur: v.spareCur, prev: v.sparePrev, curLabel: '올해', prevLabel: '전년'}, W, 150) + `<p class="note-t">JODI 정제 투입: ${v.jN}개국 가운데 ${v.jBelow}개국이 같은 달 범위 아래.</p>`;
    case 'jodiref': return `<table class="rtab"><thead><tr><th>국가</th><th class="r">정제 투입 천 b/d</th><th class="r">달</th><th>같은 달 ${v.by.join('–')}</th></tr></thead><tbody>${v.list.sort((a, b) => (a.bp ? (a.bp.cur - a.bp.min) / (a.bp.max - a.bp.min || 1) : 9) - (b.bp ? (b.bp.cur - b.bp.min) / (b.bp.max - b.bp.min || 1) : 9)).map(x => `<tr class="${x.stale ? 'ctx' : ''}"><th>${esc(x.name)}</th><td class="r num">${f(x.v, 0)}</td><td class="r">${M.fdate(x.m, 'M')}</td><td>${x.stale ? '오래됨' : x.bp ? strip(x.bp, 90, 12) + ' ' + x.bp.pos : ''}</td></tr>`).join('')}</tbody></table>`;
    case 'c8bars': return `<p class="vh">중국 · 전년 같은 달 = 100${PAGES ? '' : ` · 결합 규칙 → ${vword(v.comb)}${v.tag ? ' <small class="tag">' + esc(v.tag) + '</small>' : ''}`}</p>` + K.ratioBars(v.bars.map(b => b.miss ? {name: b.name, miss: b.miss} : {name: b.name + ' ' + M.fdate(b.o && b.o.m, 'M'), v: b.o && b.o.r}), W) + (PAGES ? '' : '<p class="note-t">수입 ▲ + 휘발유 수출 ▲ = 부합 · 수입 ▲ + 수출 ▼ 또는 미보고 = 불일치(흡수·수출 억제) · 그 밖 = 혼재</p>');
    case 'bracket': return bracket(v, W);
    case 'episode': {
      const pts = (arr, y) => arr.map((x, i) => [y + '-' + String(i + 1).padStart(2, '0') + '-01', x]);
      return `<p class="vh">${esc(v.title)} · 2022 최고 ${f(v.max, 2)} (${M.fdate(v.maxM, 'M')})</p>` + monthOverlay([{name: v.labelA, vals: v.a, alt: true}, {name: v.labelB, vals: v.b}], v.max, W) + '<p class="note-t">사건 기준 정렬(2022 사례) · 같은 기간 다른 요인이 함께 반영된다.</p>';
    }
    case 'c10table': return `<table class="rtab"><thead><tr><th>경로</th><th>투입 Δ</th><th>소비자 끝</th><th class="r">관측</th>${PAGES ? '' : '<th>방향·수준</th>'}</tr></thead><tbody>${v.table.map(t => `<tr><th>${esc(t.name)}</th><td>${esc(t.inputTxt)}</td><td>${t.consumer ? esc(t.consumerTxt) : `<span class="miss-t">${esc(t.consumerTxt)}</span>`}</td><td class="r">${fdate(t.d, t.input.freq)}</td>${PAGES ? '' : `<td>${vword(t.input.dir.v)} ${vword(t.input.lvl.v)}</td>`}</tr>`).join('')}</tbody></table><p class="note-t">투입 가격과 소비자 품목은 따로 둔다(더하지 않는다).</p><div class="strips">${v.rows.map(r => `<div class="srow"><span class="s-l">${esc(r.label)}</span><span class="s-v">${val(r)}</span>${strip(r.pos, 150, 12)}<span class="s-p">${esc(posText(r.pos))}</span><span class="s-d">${delta(r.delta)}</span></div>`).join('')}</div>`;
    case 'skeleton': return `<p class="vh">${esc(v.title)}</p><div class="skel">${v.parts.map(p => `<div class="sk-row"><span>${esc(p[0])} ${esc(p[1])}</span><span class="hatchbar">미수집</span></div>`).join('')}</div><p class="note-t">${PAGES ? '미수집' : '미수집 (DB 있음) · 경로: ' + esc(v.route)}</p>`;
    case 'c12': {
      const p = v.part || {}, G = v.G || {}; const cell = (lab, s) => `<div class="cell"><span class="c-l">${lab}</span><span class="c-v"><b class="num">${f(s.ann, 1)}</b><small class="u">% 3개월 연율</small></span><span class="c-d">전월비 <span class="num ${K.dirCls(s.mm)}">${K.arrow(s.mm)}${f(Math.abs(s.mm), 2)}%</span> · 가속 <span class="num ${K.dirCls(s.acc)}">${K.arrow(s.acc)}${f(Math.abs(s.acc), 2)}%p</span></span><small>${M.fdate(s.lm, 'M')} · ${s.rk ? s.rk.N + '개월 중 ' + s.rk.k + '위' : ''}${s.yoyFall ? ' · 전년* 기준 ' + M.fym(s.yoyFall) : ''}</small></div>`;
      const gas = `<div class="cell"><span class="c-l">휘발유 소매 부분월</span><span class="c-v">${isNum(p.r) ? `<b class="num ${K.dirCls(p.r)}">${K.arrow(p.r)}${f(Math.abs(p.r), 1)}</b><small class="u">% 전월 평균 대비</small>` : '<span class="miss-t">미수집</span>'}</span><span class="c-d">CPI 휘발유 전월비 ${isNum(G.mm) ? `<span class="num ${K.dirCls(G.mm)}">${K.arrow(G.mm)}${f(Math.abs(G.mm), 2)}%</span> <small>${M.fdate(G.lm, 'M')}</small>` : '<span class="miss-t">미수집</span>'}${v.GN && isNum(v.GN.mm) ? ` · 계절조정 전 <span class="num ${K.dirCls(v.GN.mm)}">${K.arrow(v.GN.mm)}${f(Math.abs(v.GN.mm), 2)}%</span>` : ''}</span><small>${p.pm ? M.fdate(p.pm.month, 'M') + ' ' + p.pm.n + '회 평균' + (p.lm ? ' · ' + M.fdate(p.lm, 'M') + ' 평균 대비' : '') + ' · 판정 없음' : ''}</small></div>`;
      return `<div class="trio">${cell('CPI 종합', v.A)}${cell('근원 CPI', v.K)}${gas}</div>` + (v.contrib ? `<p class="vh">${esc(v.contrib.title)}</p>` + contribBars(v.contrib, W) : `<div class="sk-row"><span>CPI 3개월 기여 (에너지·식품·근원 상품·근원 서비스)</span><span class="hatchbar">${PAGES ? '미수집 · DB 있음' : '미수집 · DB 있음 (P1)'}</span></div>`);
    }
    /* 기여표(PPI·CPI): 항목 막대와 합계, 에너지 안 막대, 기여 이력 선, 세 측정 표 */
    case 'contrib': {
      const tb = (v.table || []).length ? `<table class="rtab small"><thead><tr><th>기여 (%p)</th><th class="r">전월비</th><th class="r">3개월</th><th class="r">전년비</th></tr></thead><tbody>${v.table.map(t => `<tr><th>${esc(t.name)}</th><td class="r num">${fs(t.mom, 2)}</td><td class="r num">${fs(t.qoq, 2)}</td><td class="r num">${fs(t.yoy, 2)}</td></tr>`).join('')}</tbody></table>` : '';
      return `<p class="vh">${esc(v.title)}</p>` + contribBars(v, W) + (v.sub ? `<p class="vh">${esc(v.sub.title)}</p>` + contribBars(v.sub, W) : '') + (v.hist ? K.lines(v.hist, W, 160) : '') + tb + (v.note ? `<p class="note-t">${esc(v.note)}</p>` : '');
    }
    /* 내년 월물 곡선: 가로 = 월물, 세로 = 달러/배럴. 최신은 실선, 한 달 전은 점선, 브렌트는 진한 선, WTI는 옅은 선.
     * 최신은 월물마다 같은 날(as_of) 값이라 ⑬ 행과 맞다. 한 달 전은 월물마다 날짜가 다를 수 있어 제목 줄에 범위로 적는다 */
    case 'curve': {
      const ms = v.months || [], sr = (v.series || []).map(x => ({...x, pts: (x.pts || []).filter(p => isNum(p[1]) && ms.includes(p[0]))})).filter(x => x.pts.length);
      if (!ms.length || !sr.length) return '<p class="miss">미수집</p>';
      const H = 200, pad = {l: 38, r: 112, t: 10, b: 22}, yd = K.ext(sr.flatMap(x => x.pts.map(p => p[1])), 0.08);
      const xm = m => ms.length > 1 ? pad.l + (W - pad.l - pad.r) * ms.indexOf(m) / (ms.length - 1) : (pad.l + W - pad.r) / 2, y = K.sc(yd, [H - pad.b, pad.t]);
      let g = ''; const tk = K.ticks(yd[0], yd[1], 4);
      tk.forEach(t => g += `<line class="grid" x1="${pad.l}" x2="${W - pad.r}" y1="${y(t)}" y2="${y(t)}"/><text class="ax" x="${pad.l - 4}" y="${y(t) + 3}" text-anchor="end">${f(t, 0)}</text>`);
      ms.forEach(m => g += `<text class="ax" x="${xm(m)}" y="${H - 5}" text-anchor="middle">${esc((+m.slice(5, 7)) + '월물')}</text>`);
      const ends = [];
      sr.forEach(x => { const P = x.pts.map(p => [xm(p[0]), y(p[1])]); g += `<path class="${x.alt ? 'ln-alt' : 'ln-main'}${x.dash ? ' dash' : ''}" d="${K.pathOf(P)}"/>`;
        if (!x.dash) P.forEach(q => g += `<circle class="cdot" cx="${q[0]}" cy="${q[1]}" r="2.4"/>`);
        const L = x.pts[x.pts.length - 1]; ends.push({y: y(L[1]), x: xm(L[0]), t: x.name + ' ' + f(L[1], 2)}); });
      ends.sort((a, b) => a.y - b.y); for (let i = 1; i < ends.length; i++) if (ends[i].y - ends[i - 1].y < 11) ends[i].y = ends[i - 1].y + 11;
      ends.forEach(l => g += `<text class="lab" x="${l.x + 6}" y="${l.y + 3}">${esc(l.t)}</text>`);
      const span = dash => { const ds = sr.filter(x => !!x.dash === dash).flatMap(x => x.pts.map(p => p[2])).filter(Boolean).sort(); return ds.length ? fdate(ds[0]) + (ds[ds.length - 1] !== ds[0] ? '~' + fdate(ds[ds.length - 1]) : '') : null; };
      const dl = [span(false) && '최신 ' + span(false), span(true) && '한 달 전 ' + span(true)].filter(Boolean).join(' · ');
      return `<figure class="chart"><figcaption>${esc(v.title)}${dl ? ' · ' + esc(dl) : ''}</figcaption><svg viewBox="0 0 ${W} ${H}" width="100%" preserveAspectRatio="xMinYMin meet">${g}</svg></figure><p class="note-t">최신은 모든 월물에 종가가 있는 가장 최근 날의 값이다(그날 값이 없는 월물·이전 실행 값은 제 마지막 거래일 값이고, 제목 줄 날짜 범위에 드러난다). 한 달 전은 그날의 30일 전 또는 그 앞 마지막 값이고, 그 값이 없는 월물은 제 마지막 거래일 기준이라 며칠 다를 수 있다.</p>`;
    }
    case 'c13': return `<table class="rtab"><tbody>${v.rows.map(r => `<tr><th>${esc(r.label)}${r.sub ? `<small>${esc(r.sub)}</small>` : ''}</th><td class="r">${r.missing ? `<span class="miss-t">미수집 · ${esc(r.missing.status)}</span>` : val(r)}</td><td>${r.missing ? `<small>${esc(PAGES ? String(r.missing.route || '').replace(/\s*\(P\d+\)/g, '') : r.missing.route)}</small>` : `<small>${esc(r.path)}</small>`}</td><td class="r">${fdate(r.date, r.freq)}</td></tr>`).join('')}</tbody></table><p class="vh">일정 있는 기록</p><table class="rtab"><tbody>${v.projects.map(p => `<tr><th>${esc(p.project)}</th><td>${esc(p.kind)} · ${esc(p.phase)}</td><td class="r">${esc(p.target_start)}${p.target_end && p.target_end !== p.target_start ? '~' + esc(p.target_end) : ''}</td><td><span class="miss-t">규모 미수집</span></td></tr>`).join('')}</tbody></table><p class="note-t">판정 없음 · 시나리오 없음.</p>`;
    default: return '<p class="miss">표시 없음</p>';
  }
}
/* 기여 막대(%p): 항목마다 0에서 좌우로, 값은 오른쪽 열에. 합계는 진한 막대로 맨 아래. 고정 가중 근사라 항목 합과 합계가 다를 수 있다.
 * px: 탐색 패널처럼 여백이 있는 칸에서는 폭을 픽셀로 둔다(100%면 여백만큼 넘친다) */
function contribBars(v, W, px) {
  const rows = (v.bars || []).filter(b => isNum(b.v)).concat(isNum(v.total) ? [{name: v.totalLabel || '합계', v: v.total, tot: true}] : []);
  if (!rows.length) return '<p class="miss">미수집</p>';
  const rowH = 19, H = rows.length * rowH + 18, l = Math.min(118, Math.round(W * 0.36)), r = W - 52, d = v.d == null ? 2 : v.d;
  const m = Math.max(...rows.map(b => Math.abs(b.v)), 1e-9) * 1.08, x = K.sc([-m, m], [l, r]);
  let g = `<line class="ax-zero" x1="${x(0)}" x2="${x(0)}" y1="2" y2="${H - 16}"/>`;
  rows.forEach((b, i) => { const y = 3 + i * rowH, x0 = Math.min(x(0), x(b.v)), w = Math.abs(x(b.v) - x(0));
    g += `<text class="lab${b.tot ? ' b' : ''}" x="0" y="${y + 11}">${esc(b.name)}</text><rect class="${b.tot ? 'bar' : 'bar-l'}" x="${x0}" y="${y + 2}" width="${Math.max(w, 0.8)}" height="12"/><text class="lab num ${K.dirCls(b.v)}" x="${W - 2}" y="${y + 12}" text-anchor="end">${fs(b.v, d)}</text>`; });
  [-m * 0.9, 0, m * 0.9].forEach(t => g += `<text class="ax" x="${x(t)}" y="${H - 4}" text-anchor="middle">${fs(t, 1)}</text>`);
  return `<svg viewBox="0 0 ${W} ${H}" ${px ? `width="${W}" height="${H}"` : 'width="100%" preserveAspectRatio="xMinYMin meet"'}>${g}</svg>`;
}
function monthOverlay(sers, ref, W) {
  const H = 170, pad = {l: 36, r: 40, t: 8, b: 20}; const all = sers.flatMap(s => s.vals).filter(isNum).concat([ref]);
  const yd = K.ext(all, 0.06); const x = K.sc([0, 11], [pad.l, W - pad.r]), y = K.sc(yd, [H - pad.b, pad.t]);
  let g = ''; for (const t of K.ticks(yd[0], yd[1], 4)) g += `<line class="grid" x1="${pad.l}" x2="${W - pad.r}" y1="${y(t)}" y2="${y(t)}"/><text class="ax" x="${pad.l - 4}" y="${y(t) + 3}" text-anchor="end">${f(t, 0)}</text>`;
  g += `<line class="st-ref" x1="${pad.l}" x2="${W - pad.r}" y1="${y(ref)}" y2="${y(ref)}"/>`;
  sers.forEach(s => { const P = s.vals.map((v, i) => isNum(v) ? [x(i), y(v)] : null); g += `<path class="${s.alt ? 'ln-alt' : 'ln-main thick'}" d="${K.segPaths(P)}"/>`; const li = s.vals.map((v, i) => isNum(v) ? i : -1).filter(i => i >= 0).pop(); if (li != null) g += `<text class="lab" x="${x(li) + 4}" y="${y(s.vals[li]) + 3}">${esc(s.name)}</text>`; });
  [1, 3, 5, 7, 9, 11].forEach(k => g += `<text class="ax" x="${x(k - 1)}" y="${H - 5}" text-anchor="middle">${k}월</text>`);
  return `<svg viewBox="0 0 ${W} ${H}" width="100%">${g}</svg>`;
}
function bracket(v, W) {
  const H = 178, pad = {l: 44, r: 96, t: 10, b: 22};
  const weeks = []; for (let k = v.w; k <= 52; k++) weeks.push({wk: k, y: 0}); for (let k = 1; k <= 13; k++) weeks.push({wk: k, y: 1});
  const bandAt = k => v.band[k - 1]; const lastYear = weeks.map(o => o.y === 0 ? v.prev[o.wk - 1] : v.curLine[o.wk - 1]);
  const all = weeks.flatMap(o => bandAt(o.wk) ? [bandAt(o.wk)[0], bandAt(o.wk)[2]] : []).concat([v.cur, v.e1, v.e2]).concat(lastYear.filter(isNum));
  const yd = K.ext(all, 0.05); const x = K.sc([0, weeks.length - 1], [pad.l, W - pad.r]), y = K.sc(yd, [H - pad.b, pad.t]);
  let g = ''; for (const t of K.ticks(yd[0], yd[1], 4)) g += `<line class="grid" x1="${pad.l}" x2="${W - pad.r}" y1="${y(t)}" y2="${y(t)}"/><text class="ax" x="${pad.l - 4}" y="${y(t) + 3}" text-anchor="end">${f(t, 0)}</text>`;
  const up = weeks.map((o, i) => [x(i), y(bandAt(o.wk)[2])]), dn = weeks.map((o, i) => [x(i), y(bandAt(o.wk)[0])]), av = weeks.map((o, i) => [x(i), y(bandAt(o.wk)[1])]);
  g += `<path class="band" d="${K.pathOf(up)}L${dn.slice().reverse().map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('L')}Z"/><path class="avg dash" d="${K.pathOf(av)}"/>`;
  g += `<path class="ln-alt" d="${K.segPaths(lastYear.map((q, i) => isNum(q) ? [x(i), y(q)] : null))}"/>`;
  const xe = x(weeks.length - 1), x0 = x(0);
  g += `<line class="tot" x1="${xe}" x2="${xe}" y1="${y(v.b13[0])}" y2="${y(v.b13[2])}"/>`;
  g += `<path class="ln-main dash" d="M${x0},${y(v.cur)}L${xe},${y(v.e1)}"/><path class="ln-main dash" d="M${x0},${y(v.cur)}L${xe},${y(v.e2)}"/>`;
  g += `<circle class="st-cur" cx="${x0}" cy="${y(v.cur)}" r="4.5"/><text class="lab" x="${x0 + 6}" y="${y(v.cur) - 6}">${v.w}주 ${f(v.cur, 0)}</text>`;
  g += `<circle class="st-cur" cx="${xe}" cy="${y(v.e1)}" r="4"/><circle class="st-prev" cx="${xe}" cy="${y(v.e2)}" r="4"/>`;
  const ly = [[y(v.e1), '평년 인출 ' + f(v.e1, 0)], [y(v.e2), '지난겨울 인출 ' + f(v.e2, 0)]].sort((a, b) => a[0] - b[0]); if (ly[1][0] - ly[0][0] < 12) ly[1][0] = ly[0][0] + 12;
  ly.forEach(l => g += `<text class="lab" x="${xe + 6}" y="${l[0] + 3}">${l[1]}</text>`);
  g += `<text class="ax" x="${xe + 6}" y="${y(v.b13[0]) + 3}">하단 ${f(v.b13[0], 0)}</text><text class="ax" x="${xe + 6}" y="${y(v.b13[2]) + 3}">상단 ${f(v.b13[2], 0)}</text>`;
  [0, 52 - v.w + 1, weeks.length - 1].forEach(i => g += `<text class="ax" x="${x(i)}" y="${H - 6}" text-anchor="middle">${weeks[i].wk}주</text>`);
  return `<p class="vh">미국 가스 저장 → 3월 말(13주) · 두 인출 가정 (bcf) <span class="key"><i class="k-band"></i>${v.by.join('–')} 범위 <i class="k-alt"></i>지난겨울 실제 경로</span></p><svg viewBox="0 0 ${W} ${H}" width="100%">${g}</svg><p class="note-t">평년 인출 = 같은 주 평균에서 13주 평균까지 빠진 양. 지난겨울 인출 = 전년 같은 주 → 올해 13주. 확률이 아닌 조건부 계산이다. 유럽 가스(IMF) ${M.fdate(v.ep.m, 'M')}는 2022 최고의 ${f(v.ep.r, 0)}%.</p>`;
}
const SCLS = {'부합': 's-ok', '불일치': 's-no', '혼재': 's-mix', '보합': 's-flat', '판정 없음': 's-none', '미수집': 's-miss', '—': 's-none'};
const ORDER = ['부합', '불일치', '혼재', '보합', '판정 없음', '미수집'];
const chk = id => model.checks.find(x => x.id === id);
/* 판정 이력: monitor-history.js 가 있고 ok 일 때만 쓴다. 칩 title 은 기록 창과 같은 창을 볼 때만 붙인다 */
const HIST = !PAGES && typeof MONITOR_HISTORY !== 'undefined' && MONITOR_HISTORY && MONITOR_HISTORY.ok ? MONITOR_HISTORY : null;
const histText = h => '판정 전환 ' + h.at + ' ' + h.from + '→' + h.to + (h.model ? ' (그 사이 모델 수정)' : '');
const histOf = (id, ax) => (HIST && HIST.checks[id] && HIST.checks[id][ax]) || null;
const histTitle = id => { const a = HIST && state.win === HIST.win ? histOf(id, state.axis) : null; return a && a.changes.length ? ' · ' + histText(a.changes[a.changes.length - 1]) : ''; };
function histBlock(ch) {
  if (!HIST || ch.noVerdict) return '';
  const row = (ax, name) => { const a = histOf(ch.id, ax); const hs = a ? a.changes.slice(-3).reverse() : [];
    return `<li class="cx"><span>${name}</span>${hs.length ? `<span class="hs">${hs.map(h => esc(histText(h))).join('<br>')}</span>` : `<span class="hs">${esc(a ? '전환 없음 · ' + a.at + ' 기록 시작' : '기록 없음')}</span>`}</li>`; };
  return `<p class="vh2">판정 이력 <span class="leg2">${esc(HIST.win)} 창 · 판정이 바뀐 때만 기록 · 최근 3회</span></p><ul class="cxl">${row('dir', '방향')}${row('lvl', '수준')}</ul>`;
}
const nodeOf = id => model.graph.nodes.find(n => n.id === id);
const LENS = {'기대 경로': ['n-flow', 'n-freight', 'n-crude', 'n-cracks', 'n-retail', 'n-cpi-energy', 'n-cpi', 'n-stocks', 'n-refining'], '병목': ['n-refining', 'n-stocks', 'n-china', 'n-lng', 'n-storage', 'n-gas'], '물가 확산': ['n-materials', 'n-food', 'n-utility', 'n-costs', 'n-cpi-core', 'n-cpi'], '전체': null};
const nodeV = n => PAGES ? '—' : (state.axis === 'dir' ? n.dir : n.lvl);
const checkV = c => PAGES ? '—' : c[state.axis].v;
function build() { model = M.buildMonitorModel(input, {win: state.win, pages: PAGES}); }
function firstBreak() {
  const lk = b => b ? `<a href="#${b.id}" data-sel="${b.id}">${b.no} ${esc(b.name)}</a> <small>${esc(b.ind)} ${esc(b.date)}</small>` : '없음';
  return `<span class="fbk">첫 이탈</span> 방향 ${lk(model.breakDir)} · 수준 ${lk(model.breakLvl)}`;
}
function pathSet(nodes0) {
  const nodes = new Set(nodes0), E = model.graph.edges, up = new Set(nodes), dn = new Set(nodes);
  let grow = true; while (grow) { grow = false; E.forEach(e => { if (dn.has(e.from) && !dn.has(e.to)) { dn.add(e.to); grow = true; } if (up.has(e.to) && !up.has(e.from)) { up.add(e.from); grow = true; } }); }
  const on = new Set([...up, ...dn]); on.up = up; on.dn = dn; return on;
}
function highlight() {
  const cid = state.hover || state.sel; const c = cid && chk(cid); const nodes = new Set(c ? c.meta.nodes : []);
  const on = pathSet([...nodes]); const act = !!c;
  ROOT.querySelectorAll('#mw-canvas .node').forEach(n => { n.classList.toggle('dim', act && !on.has(n.dataset.n)); n.classList.toggle('on', nodes.has(n.dataset.n)); });
  ROOT.querySelectorAll('#mw-canvas .ln').forEach(e => { const f = e.dataset.from, t = e.dataset.to; const inP = (on.up.has(f) && on.up.has(t)) || (on.dn.has(f) && on.dn.has(t)); e.classList.toggle('dim', act && !inP); e.classList.toggle('pick', state.edge === e.dataset.e); });
  ROOT.querySelectorAll('.tl .evt').forEach(t => { t.classList.toggle('dim', act && !nodes.has(t.dataset.n)); t.classList.toggle('on', act && nodes.has(t.dataset.n)); });
}
const STAGES = ['공급(물량)', '수송·완충', '원료 가격', '가공·마진', '최종 가격·비용', '물가'];
const LANES = [['원유·석유제품', 1, 3], ['가스·LNG', 4, 4], ['석탄·금속·곡물', 5, 5]];
const POS = {'n-flow': [1, 1], 'n-freight': [2, 1], 'n-crude': [3, 1], 'n-cracks': [4, 1], 'n-retail': [5, 1], 'n-cpi-energy': [6, 1],
  'n-supply': [1, 2], 'n-stocks': [2, 2], 'n-refining': [4, 2], 'n-costs': [5, 2], 'n-cpi-core': [6, 2],
  'n-china': [1, 3], 'n-cpi': [6, 4],
  'n-lng': [1, 4], 'n-storage': [2, 4], 'n-gas': [3, 4], 'n-utility': [5, 4],
  'n-materials': [3, 5], 'n-food': [5, 5]};
function barsBase() {
  const kst = new Date(Date.parse(model.fetched) + 9 * 3600e3).toISOString();
  const sel = state.sel && chk(state.sel);
  /* 앱 막대가 곧 페이지 머리다. 위계: 매크로 대시보드(F4 탭) → 에너지 체인 모니터 → 에너지 공급망 리서치.
   * 왼쪽에 대시보드로 돌아가는 링크와 지금 보는 화면, 오른쪽 끝 묶음 앞에 리서치로 더 들어가는 링크 */
  const back = DASH ? `<a class="ab-ln" href="${esc(DASH)}">매크로 대시보드 ↩</a>` : '';
  const fwd = RESEARCH ? `<a class="ab-ln ab-fwd" href="${esc(RESEARCH)}">에너지 공급망 리서치 →</a>` : '';
  $('#mw-appbar').innerHTML = `<span class="logo" aria-hidden="true">◇</span>${back}<span class="crumb">${sel ? `<button class="ab-home" data-home>${MW_NAME}</button><i>›</i><b>${sel.circ} ${esc(sel.name)}</b>` : `<b>${MW_NAME}</b>`}</span>
    <span class="ab-r">${fwd}<span class="mark ${PAGES ? 'pub' : 'priv'}">${PAGES ? '공개본' : '비공개본'}</span><span>수집 <b class="num">${kst.slice(5, 7)}.${kst.slice(8, 10)} ${kst.slice(11, 16)}</b> KST</span><label class="srch"><span aria-hidden="true">⌕</span><input id="mw-q" placeholder="점검·노드 찾기" autocomplete="off"></label></span>`;
  const hb = $('#mw-appbar [data-home]'); if (hb) hb.onclick = () => deselect();
  if (RESEARCH) document.title = (sel ? `${sel.circ} ${sel.name} · ` : '') + MW_NAME;
  const grp = (label, inner) => `<div class="tg"><div class="tg-b">${inner}</div><span class="tg-l">${label}</span></div>`;
  /* 단계 상자: 부문마다 상자 하나, 안에 점검 번호와 상태 점, 상자 사이 화살표 */
  const stages = model.parts.map(p => `<div class="stg"><span class="stg-h">${esc(PAGES ? p.label.replace('기대 경로', '물량·가격') : p.label)}</span><span class="stg-d">${p.checks.map(id => { const c = chk(id); return `<button class="sd ${PAGES ? 's-none' : SCLS[checkV(c)] || 's-none'}${state.sel === id ? ' sel' : ''}" data-sel="${id}" title="${esc(c.circ + ' ' + c.name + (PAGES ? '' : ' · ' + checkV(c)) + histTitle(id))}">${c.circ}</button>`; }).join('')}</span></div>`).join('<span class="stg-ar" aria-hidden="true">›</span>');
  $('#mw-toolbar').innerHTML = grp('렌즈', Object.keys(LENS).map(k => `<button class="tb" aria-pressed="${state.lens === k}" data-lens="${k}">${PAGES && k === '기대 경로' ? '물량·가격' : k}</button>`).join('')) +
    grp('창', model.rule.window.presets.map(w => `<button class="tb" aria-pressed="${w === state.win}" data-win="${w}">${w}</button>`).join('')) +
    (PAGES ? '' : grp('색 기준', `<button class="tb" aria-pressed="${state.axis === 'dir'}" data-axis="dir">방향</button><button class="tb" aria-pressed="${state.axis === 'lvl'}" data-axis="lvl">수준</button>`)) +
    `<div class="stages" aria-label="점검 단계">${stages}</div>`;
  ROOT.querySelectorAll('[data-win]').forEach(b => b.onclick = () => { state.win = b.dataset.win; store('monWs.win', state.win); renderAll(); });
  ROOT.querySelectorAll('[data-lens]').forEach(b => b.onclick = () => { state.lens = b.dataset.lens; renderBars(); renderCanvas(); });
  /* 목록 단추(맨 왼쪽): 왼쪽 열을 접고 편다 */
  $('#mw-toolbar').insertAdjacentHTML('afterbegin', `<button class="tb colt" data-col="lst" aria-pressed="${listShown()}" title="자료 시점·미수집·변동 상위·가격 구조">목록</button>`);
  ROOT.querySelectorAll('[data-axis]').forEach(b => b.onclick = () => { state.axis = b.dataset.axis; renderBars(); renderList(); renderCanvas(); });
  ROOT.querySelectorAll('#mw-toolbar [data-sel]').forEach(b => b.onclick = () => select(b.dataset.sel));
  const q = $('#mw-q'); q.onkeydown = e => { if (e.key !== 'Enter') return; const t = q.value.trim(); if (!t) return; const n = model.graph.nodes.find(x => x.name.includes(t)); const c = model.checks.find(x => x.name.includes(t) || x.kpi.label.includes(t)) || (n && chk(n.check)); if (c) select(c.id); };
}
const MON = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
/* 미수집 빗금(SVG): .hatchbar 와 같은 135° 가는 줄 */
const HATCH = id => `<pattern id="${id}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" class="hp-bg"/><line x1="0" y1="0" x2="0" y2="6" class="hp-ln"/></pattern>`;
/* 첫 화면에 숫자가 없던 점검(⑥~⑪)은 노드에 대표 숫자 하나를 단다 */
const REP_CHECKS = ['c6', 'c7', 'c8', 'c9', 'c10', 'c11'];
/* 숫자 앞 짧은 이름: 무엇의 값인지(⑥은 BWET ETF 가격의 전년 배수, ⑪은 3개월 연율) */
const REP_NAME = {c6: 'BWET 가격', c7: '정제 여유', c8: '원유 수입', c9: '가스 저장', c10: '구리', c11: '운송 PPI 연율'};
const repVal = r => { if (r.pos && r.pos.kind === 'multiple' && isNum(r.pos.cur)) return '전년 ×' + f(r.pos.cur, 1); const u = String(r.unit || ''); const v = f(r.value, isNum(r.digits) ? Math.min(r.digits, 1) : 1); return u.startsWith('$') ? '$' + v + u.slice(1) : u.startsWith('%') ? v + u.split(' ')[0] : v + (u.length <= 6 ? u : ''); };
function axisY(y, lo, hi, x0, x1, n, dg) { let g = ''; K.ticks(lo, hi, n || 3).forEach(t => { g += `<line class="cg" x1="${x0}" x2="${x1}" y1="${y(t)}" y2="${y(t)}"/><text class="ca cy" x="${x0 - 3}" y="${y(t) + 3}" text-anchor="end">${f(t, dg == null ? 0 : dg)}</text>`; }); return g; }
/* 열 차트 x축 글자: 앞 글자와 겹치면 건너뛴다(글자 폭은 한글 9px·그 밖 5.5px로 어림). 좁은 상자에서 '1월4월7월'이 붙지 않게 */
function xLabels(list, H) {
  return list.map(([x, t, a]) => `<text class="ca cx" x="${x}" y="${H - 3}" text-anchor="${a || 'middle'}">${t}</text>`).join('');
}
/* 그린 뒤 실제 글자 폭(화면 상자)으로 겹치는 x축 글자만 뺀다(앞 글자 우선, 1px 이상 떨어지면 둔다) */
function thinX(root) {
  root.querySelectorAll('svg').forEach(sv => { let right = -1e9; [...sv.querySelectorAll('text.cx')].map(t => [t, t.getBoundingClientRect()]).sort((a, b) => a[1].left - b[1].left).forEach(([t, b]) => { if (b.left < right + 1) t.remove(); else right = b.right; }); });
}
function seasonChart(mobj, W, H, dg) {
  const pad = {l: 30, r: 6, t: 6, b: 14}; const yrs = [2022, 2023, 2024, 2025]; const cy = new Date().getUTCFullYear();
  const keys = Object.keys(mobj || {}).sort(); if (!keys.length) return '';
  const lastY = +keys[keys.length - 1].slice(0, 4);
  const band = MON.map((m, i) => { const vs = yrs.map(y => mobj[y + '-' + String(i + 1).padStart(2, '0')]).filter(isNum); return vs.length ? [Math.min(...vs), vs.reduce((a, b) => a + b, 0) / vs.length, Math.max(...vs)] : null; });
  const line = y => MON.map((m, i) => mobj[y + '-' + String(i + 1).padStart(2, '0')]);
  const cur = line(lastY), prev = line(lastY - 1);
  const all = band.flatMap(b => b ? [b[0], b[2]] : []).concat(cur.filter(isNum), prev.filter(isNum));
  const yd = K.ext(all, 0.06); const x = K.sc([0, 11], [pad.l, W - pad.r]), y = K.sc(yd, [H - pad.b, pad.t]);
  let g = axisY(y, yd[0], yd[1], pad.l, W - pad.r, 3, dg);
  const up = band.map((b, i) => b && [x(i), y(b[2])]).filter(Boolean), dn = band.map((b, i) => b && [x(i), y(b[0])]).filter(Boolean);
  g += `<path class="cband" d="M${up.map(p => p.join(',')).join('L')}L${dn.reverse().map(p => p.join(',')).join('L')}Z"/>`;
  g += `<path class="cavg" d="${K.segPaths(band.map((b, i) => b ? [x(i), y(b[1])] : null))}"/>`;
  g += `<path class="cprev" d="${K.segPaths(prev.map((v, i) => isNum(v) ? [x(i), y(v)] : null))}"/>`;
  g += `<path class="ccur" d="${K.segPaths(cur.map((v, i) => isNum(v) ? [x(i), y(v)] : null))}"/>`;
  const li = cur.map((v, i) => isNum(v) ? i : -1).filter(i => i >= 0).pop(); if (li != null) g += `<circle class="cdot" cx="${x(li)}" cy="${y(cur[li])}" r="3"/>`;
  g += xLabels((x(11) - x(9) < 30 ? [0, 3, 6, 9] : [0, 3, 6, 9, 11]).map(i => [x(i), (i + 1) + '월']), H);
  return {svg: `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${g}</svg>`, key: `<i class="kb"></i>${yrs[0]}–${String(yrs[3]).slice(2)} 같은 달 범위 <i class="kp"></i>${lastY - 1} <i class="kc"></i>${lastY}`};
}
function weekBandChart(u, W, H, scale) {
  const pad = {l: 30, r: 6, t: 6, b: 14}; const sc2 = v => isNum(v) ? v / (scale || 1) : null;
  const band = u.band.map(b => b && b.map(sc2)); const cur = u.cur.map(p => [p[0], sc2(p[1])]), prev = u.prev.map(p => [p[0], sc2(p[1])]);
  const all = band.flatMap(b => b ? [b[0], b[2]] : []).concat(cur.map(p => p[1]), prev.map(p => p[1])).filter(isNum);
  const yd = K.ext(all, 0.06); const x = K.sc([1, 53], [pad.l, W - pad.r]), y = K.sc(yd, [H - pad.b, pad.t]);
  let g = axisY(y, yd[0], yd[1], pad.l, W - pad.r, 3, 0);
  const up = band.map((b, i) => b && [x(i + 1), y(b[2])]).filter(Boolean), dn = band.map((b, i) => b && [x(i + 1), y(b[0])]).filter(Boolean);
  g += `<path class="cband" d="M${up.map(p => p.join(',')).join('L')}L${dn.reverse().map(p => p.join(',')).join('L')}Z"/><path class="cavg" d="${K.segPaths(band.map((b, i) => b ? [x(i + 1), y(b[1])] : null))}"/>`;
  g += `<path class="cprev" d="${K.segPaths(prev.map(p => isNum(p[1]) ? [x(p[0]), y(p[1])] : null))}"/><path class="ccur" d="${K.segPaths(cur.map(p => isNum(p[1]) ? [x(p[0]), y(p[1])] : null))}"/>`;
  const l = cur[cur.length - 1]; if (l) g += `<circle class="cdot" cx="${x(l[0])}" cy="${y(l[1])}" r="3"/>`;
  g += xLabels([[1, '1월'], [14, '4월'], [27, '7월'], [40, '10월']].map(([w, t]) => [x(w), t]), H);
  const by = u.band_years || [];
  return {svg: `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${g}</svg>`, key: `<i class="kb"></i>${by[0]}–${String(by[1]).slice(2)} 같은 주 범위 <i class="kp"></i>전년 <i class="kc"></i>올해`};
}
function areaChart(series, W, H, ref, dg, label) {
  const pad = {l: 30, r: 6, t: 6, b: 14}; const pts = series.filter(p => isNum(p[1])); if (pts.length < 2) return {svg: '<p class="miss">미수집</p>', key: ''};
  const ts = pts.map(p => M.tOf(p[0].length === 7 ? p[0] + '-01' : p[0])); const ys = pts.map(p => p[1]);
  const yd = K.ext(ys.concat(isNum(ref) ? [ref] : []), 0.08); const x = K.sc([ts[0], ts[ts.length - 1]], [pad.l, W - pad.r]), y = K.sc(yd, [H - pad.b, pad.t]);
  let g = axisY(y, yd[0], yd[1], pad.l, W - pad.r, 3, dg);
  const P = pts.map((p, i) => [x(ts[i]), y(p[1])]); const yr = y(isNum(ref) ? ref : yd[0]);
  g += `<path class="carea" d="M${P[0][0]},${yr}L${P.map(p => p.join(',')).join('L')}L${P[P.length - 1][0]},${yr}Z"/>`;
  if (isNum(ref)) g += `<line class="cref" x1="${pad.l}" x2="${W - pad.r}" y1="${yr}" y2="${yr}"/>`;
  g += `<path class="ccur" d="${K.pathOf(P)}"/><circle class="cdot" cx="${P[P.length - 1][0]}" cy="${P[P.length - 1][1]}" r="3"/>`;
  const y0 = new Date(ts[0]).getUTCFullYear(), y1 = new Date(ts[ts.length - 1]).getUTCFullYear();
  /* 해 눈금 글자는 간격이 좁으면 건너뛴다(마지막 해는 남긴다) */
  const yrs = []; for (let yy = y0 + 1; yy <= y1; yy++) { const t = Date.UTC(yy, 0, 1); if (t > ts[0]) yrs.push([yy, t]); }
  const gap = yrs.length > 1 ? x(yrs[1][1]) - x(yrs[0][1]) : 99; const step = Math.max(1, Math.ceil(26 / gap));
  yrs.forEach(([yy, t], i) => { g += `<line class="cg" x1="${x(t)}" x2="${x(t)}" y1="${pad.t}" y2="${H - pad.b}"/>` + ((yrs.length - 1 - i) % step === 0 ? `<text class="ca" x="${x(t)}" y="${H - 3}" text-anchor="middle">${String(yy).slice(2)}년</text>` : ''); });
  if (y0 === y1) g += xLabels([0, Math.floor(pts.length / 2), pts.length - 1].map((i, k) => [P[i][0], +pts[i][0].slice(5, 7) + '월', k === 0 ? 'start' : k === 2 ? 'end' : 'middle']), H);
  return {svg: `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${g}</svg>`, key: label};
}
const primVis = id => { const ch = chk(id); const t = ch && (ch.tabs.find(t => t.primary) || ch.tabs[0]); return (t && t.vis) || {}; };
const ISO3 = {US: 'USA', CA: 'CAN', MX: 'MEX', GB: 'GBR', DE: 'DEU', FR: 'FRA', IT: 'ITA', ES: 'ESP', NL: 'NLD', BE: 'BEL', PL: 'POL', TR: 'TUR', CN: 'CHN', JP: 'JPN', KR: 'KOR', IN: 'IND', SG: 'SGP', TW: 'TWN', TH: 'THA', ID: 'IDN', MY: 'MYS', AU: 'AUS', SA: 'SAU', KW: 'KWT', NG: 'NGA'};
const PROD = [['CRUDEOIL', '원유'], ['GASDIES', '경유'], ['GASOLINE', '휘발유'], ['NAPHTHA', '나프타'], ['RESFUEL', '중유'], ['LPG', 'LPG'], ['JETKERO', '등유·항공유']];
const FLOW = [['TOTEXPSB', '수출'], ['TOTIMPSB', '수입'], ['INDPROD', '생산'], ['REFINOBS', '정제 투입'], ['REFGROUT', '정제 산출'], ['TOTDEMO', '수요'], ['CLOSTLV', '재고']];
const REG = {mideast: '중동·아프리카', asia: '아시아·태평양', europe: '유럽', americas: '미주'};
const CHOKE = {hormuz: [56.4, 26.6], bab_el_mandeb: [43.4, 12.6], cape: [18.5, -34.4], suez: [32.35, 30.6]};
const PRESET = {c1: {flow: 'TOTEXPSB', prod: 'CRUDEOIL', cc: 'SA'}, c8: {flow: 'TOTIMPSB', prod: 'CRUDEOIL', cc: 'CN'}, c5: {flow: 'CLOSTLV', prod: 'GASDIES', cc: 'US'}, c7: {flow: 'REFINOBS', prod: 'CRUDEOIL', cc: 'US'}, c3: {flow: 'REFGROUT', prod: 'GASDIES', cc: 'KR'}, c4: {flow: 'TOTDEMO', prod: 'GASDIES', cc: 'US'}};
const J = () => input.live.supply.jodi;
function cell(cc, prod, flow) { const o = ((J().data[cc] || {})[prod] || {})[flow]; return o || null; }
function lastIdx(o) { if (!o || !o.cur) return -1; let i = -1; o.cur.forEach((v, k) => { if (isNum(v)) i = k; }); return i; }
function stat(cc) {
  const o = cell(cc, state.ex.prod, state.ex.flow); const i = lastIdx(o); if (i < 0) return null;
  const v = o.cur[i], p = o.prev[i]; const yr = J().year;
  return {v, p, r: isNum(p) && p ? v / p * 100 : null, m: yr + '-' + String(i + 1).padStart(2, '0'), o, i, stale: (+J().latest.slice(5, 7)) - (i + 1) > 3};
}
function exMetric(s) { return !s ? null : state.ex.meas === 'ratio' ? s.r : s.v; }
function renderExplore() {
  const box = $('#mw-canvas'); const JJ = J(); const ex = state.ex;
  const ccs = Object.keys(JJ.countries);
  const rows = ccs.map(cc => ({cc, name: JJ.countries[cc].name, reg: JJ.countries[cc].region, s: stat(cc)})).filter(r => r.s && r.s.v > 0);
  const unit = ex.flow === 'CLOSTLV' ? JJ.units.CLOSTLV : JJ.units.other;
  const fname = (FLOW.find(x => x[0] === ex.flow) || [])[1], pname = (PROD.find(x => x[0] === ex.prod) || [])[1];
  const facet = (k, list, cur) => `<div class="xf"><span class="xf-l">${k === 'flow' ? '흐름' : k === 'prod' ? '품목' : '측정'}</span>${list.map(([id, nm]) => { const n = k === 'meas' ? null : ccs.filter(cc => k === 'flow' ? cell(cc, ex.prod, id) : cell(cc, id, ex.flow)).length; return `<button class="xb" aria-pressed="${cur === id}" data-k="${k}" data-id="${id}"${n === 0 ? ' disabled' : ''}>${nm}${n != null ? ` <small>${n}</small>` : ''}</button>`; }).join('')}</div>`;
  const head = `<div class="xh">${facet('flow', FLOW, ex.flow)}${facet('prod', PROD, ex.prod)}${facet('meas', [['ratio', '전년 같은 달 = 100'], ['level', '최신 달 수준']], ex.meas)}</div>`;
  /* 국가 분포: 지역별 묶음, 이름 + 오른쪽 숫자 + 연한 막대 (Histogram helper 형식) */
  const vals = rows.map(r => exMetric(r.s)).filter(isNum); const vmax = Math.max(...vals.map(Math.abs), 1);
  const hist = Object.keys(REG).map(rg => { const rr = rows.filter(r => r.reg === rg).sort((a, b) => (exMetric(b.s) || 0) - (exMetric(a.s) || 0)); if (!rr.length) return ''; return `<li class="xr-g">${REG[rg]} <small>${rr.length}</small></li>` + rr.map(r => { const v = exMetric(r.s); const w = ex.meas === 'ratio' ? Math.min(100, v / 2) : v / vmax * 100; return `<li><button class="xr${ex.cc === r.cc ? ' on' : ''}${r.s.stale ? ' st' : ''}" data-cc="${r.cc}" title="${esc(r.name + ' · ' + M.fdate(r.s.m, 'M'))}"><span>${esc(r.name)}</span><b class="num">${isNum(v) ? f(v, ex.meas === 'ratio' ? 0 : 0) : '—'}</b><span class="xr-b"><i style="width:${Math.max(0, w).toFixed(1)}%"></i>${ex.meas === 'ratio' ? '<em style="left:50%"></em>' : ''}</span><small>${M.fdate(r.s.m, 'M')}</small></button></li>`; }).join(''); }).join('');
  box.innerHTML = `${head}<div class="xg"><div class="xmap" id="mw-xmap"></div><aside class="xhist"><h4>${esc(pname)} ${esc(fname)} · 국가 <small>${ex.meas === 'ratio' ? '전년 같은 달 = 100, 막대 가운데 눈금 = 100' : unit}</small></h4><ul>${hist}</ul></aside></div>
    <div class="xb3"><section class="xp" id="mw-xp1"></section><section class="xp" id="mw-xp2"></section><section class="xp" id="mw-xp3"></section></div>`;
  box.querySelectorAll('.xb').forEach(b => b.onclick = () => { state.ex[b.dataset.k] = b.dataset.id; renderCanvas(); });
  box.querySelectorAll('.xr').forEach(b => b.onclick = () => { state.ex.cc = b.dataset.cc; renderCanvas(); });
  drawMap(rows); drawPanels(rows, unit, fname, pname); reflow = () => drawMap(rows);
}
function drawMap(rows) {
  const el = $('#mw-xmap'); const W = el.clientWidth, H = el.clientHeight; if (!W || !WORLD || !window.d3) { el.innerHTML = '<p class="miss">지도 자료 없음</p>'; return; }
  const proj = d3.geoNaturalEarth1().fitExtent([[6, 6], [W - 6, H - 6]], {type: 'Sphere'}); const path = d3.geoPath(proj);
  const by = {}; rows.forEach(r => by[ISO3[r.cc]] = r);
  const ratio = state.ex.meas === 'ratio'; const vs = rows.map(r => exMetric(r.s)).filter(isNum); const vmax = Math.max(...vs, 1);
  /* 회색 단계: 밝을수록 많다(전년=100 보기에서는 100 위가 밝고 아래가 어둡다) */
  const col = v => { if (!isNum(v)) return '#2f343c'; if (ratio) { const t = Math.max(-1, Math.min(1, (v - 100) / 40)); return d3.interpolateRgb('#2a2f37', '#e5e8eb')((t + 1) / 2); } return d3.interpolateRgb('#2f343c', '#e5e8eb')(Math.sqrt(v / vmax)); };
  let g = `<path class="xsph" d="${path({type: 'Sphere'})}"/><path class="xgrat" d="${path(d3.geoGraticule10())}"/>`;
  WORLD.features.forEach(ft => { const r = by[ft.properties.id]; g += `<path class="xc${r ? ' j' : ''}${r && r.cc === state.ex.cc ? ' on' : ''}" ${r ? `data-cc="${r.cc}" style="fill:${col(exMetric(r.s))}"` : ''} d="${path(ft)}"><title>${esc(r ? r.name + ' · ' + f(exMetric(r.s), 0) + (ratio ? ' (전년=100)' : '') + ' · ' + M.fdate(r.s.m, 'M') : ft.properties.name)}</title></path>`; });
  const SH = input.live.shipping; if (SH && SH.chokepoints) Object.entries(CHOKE).forEach(([k, ll]) => { const c = SH.chokepoints[k]; if (!c) return; const [x, y] = proj(ll); const w = c.weekly || []; const lw = w[w.length - 1]; g += `<g class="xck" transform="translate(${x},${y})"><rect x="-5" y="-5" width="10" height="10" transform="rotate(45)"/><text x="9" y="4">${esc(c.label || c.name || k)}${lw ? ' ' + f(lw[1], 1) + '척/일' : ''}</text><title>${esc((c.label || k) + ' 주간 유조선 통과(비공개)')}</title></g>`; });
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${g}</svg><div class="xleg">${ratio ? '<i style="background:#2a2f37"></i>전년보다 적다 <i style="background:#888d94"></i>100 <i style="background:#e5e8eb"></i>많다' : '<i style="background:#2f343c"></i>적다 <i style="background:#e5e8eb"></i>많다'} · 칠 없음 = JODI 밖${SH && SH.chokepoints ? ' · ◆ 해협 통과(비공개)' : ''}</div>`;
  el.querySelectorAll('.xc.j').forEach(p => p.onclick = () => { state.ex.cc = p.dataset.cc; renderCanvas(); });
}
function barsPair(o, W, H, unit) {
  const pad = {l: 34, r: 6, t: 8, b: 16}; const all = o.cur.concat(o.prev).filter(isNum); const yd = [0, Math.max(...all) * 1.08];
  const x = K.sc([0, 12], [pad.l, W - pad.r]), y = K.sc(yd, [H - pad.b, pad.t]); const bw = (x(1) - x(0)) * 0.36;
  let g = axisY(y, yd[0], yd[1], pad.l, W - pad.r, 3, 0);
  for (let i = 0; i < 12; i++) { if (isNum(o.prev[i])) g += `<rect class="bp" x="${x(i) + 2}" y="${y(o.prev[i])}" width="${bw}" height="${y(0) - y(o.prev[i])}"/>`; if (isNum(o.cur[i])) g += `<rect class="bcur" x="${x(i) + 2 + bw}" y="${y(o.cur[i])}" width="${bw}" height="${y(0) - y(o.cur[i])}"/>`; if (i % 2 === 0) g += `<text class="ca" x="${x(i) + bw + 2}" y="${H - 3}" text-anchor="middle">${i + 1}월</text>`; }
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${g}</svg>`;
}
function bandMonths(o, W, H) {
  const pad = {l: 34, r: 6, t: 8, b: 16}; const all = (o.lo || []).concat(o.hi || [], o.cur, o.prev).filter(isNum); const yd = K.ext(all, 0.06);
  const x = K.sc([0, 11], [pad.l, W - pad.r]), y = K.sc(yd, [H - pad.b, pad.t]); let g = axisY(y, yd[0], yd[1], pad.l, W - pad.r, 3, 0);
  if (o.lo && o.hi) { const up = o.hi.map((v, i) => isNum(v) ? [x(i), y(v)] : null).filter(Boolean), dn = o.lo.map((v, i) => isNum(v) ? [x(i), y(v)] : null).filter(Boolean); g += `<path class="cband" d="M${up.map(p => p.join(',')).join('L')}L${dn.reverse().map(p => p.join(',')).join('L')}Z"/><path class="cavg" d="${K.segPaths(o.avg.map((v, i) => isNum(v) ? [x(i), y(v)] : null))}"/>`; }
  g += `<path class="cprev" d="${K.segPaths(o.prev.map((v, i) => isNum(v) ? [x(i), y(v)] : null))}"/><path class="ccur" d="${K.segPaths(o.cur.map((v, i) => isNum(v) ? [x(i), y(v)] : null))}"/>`;
  [0, 3, 6, 9].forEach(i => g += `<text class="ca" x="${x(i)}" y="${H - 3}" text-anchor="middle">${i + 1}월</text>`);
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${g}</svg>`;
}
function drawPanels(rows, unit, fname, pname) {
  const ex = state.ex, JJ = J(); const nm = (JJ.countries[ex.cc] || {}).name || ex.cc;
  const p1 = $('#mw-xp1'), p2 = $('#mw-xp2'), p3 = $('#mw-xp3'); const W = Math.max(150, p1.clientWidth - 16), H = 132;
  const o = cell(ex.cc, ex.prod, ex.flow);
  p1.innerHTML = `<h4>${esc(nm)} · ${esc(pname)} ${esc(fname)} <small>월별, ${esc(unit)}</small></h4>${o ? barsPair(o, W, H, unit) + `<p class="xk"><i class="kpv"></i>${JJ.year - 1} <i class="kcu"></i>${JJ.year}</p>` : '<p class="miss">이 나라는 이 항목을 보고하지 않는다</p>'}`;
  const st = cell(ex.cc, ex.prod, 'CLOSTLV') || cell(ex.cc, 'CRUDEOIL', 'CLOSTLV');
  p2.innerHTML = `<h4>${esc(nm)} · 재고 <small>${st ? (cell(ex.cc, ex.prod, 'CLOSTLV') ? pname : '원유') : ''} 월말, ${esc(JJ.units.CLOSTLV)}${st && st.lo ? ' · 같은 달 ' + JJ.band_years.join('–') + ' 범위' : ''}</small></h4>${st ? bandMonths(st, W, H) + `<p class="xk"><i class="kb"></i>범위 <i class="kp"></i>${JJ.year - 1} <i class="kc"></i>${JJ.year}</p>` : '<p class="miss">재고 미보고</p>'}`;
  const SH = input.live.shipping, S = input.live.series;
  let t3 = '';
  /* 해협 주간 통과(비공개): 수에즈를 넣어 네 선까지 */
  const cps = SH && SH.chokepoints && !PAGES ? Object.values(SH.chokepoints).map(c => ({n: c.label || c.name, pts: (c.weekly || []).slice(-52).filter(p => p && isNum(p[1])).map(p => [p[0], p[1]])})).filter(w => w.pts.length > 1).slice(0, 4) : [];
  if (cps.length) { const ws = cps; const pts = ws.flatMap(w => w.pts.map(p => p[1])); const yd = [0, Math.max(...pts, 1) * 1.1]; const pad = {l: 34, r: 6, t: 8, b: 16}; const t0 = M.tOf(ws[0].pts[0][0]), t1 = M.tOf(ws[0].pts[ws[0].pts.length - 1][0]); const x = K.sc([t0, t1], [pad.l, W - pad.r]), y = K.sc(yd, [H - pad.b, pad.t]); let g = axisY(y, yd[0], yd[1], pad.l, W - pad.r, 3, 0); const cls = ['ccur', 'cprev', 'cthird', 'cfourth']; ws.forEach((w, i) => g += `<path class="${cls[i]}" d="${K.pathOf(w.pts.map(p => [x(M.tOf(p[0])), y(p[1])]))}"/>`); g += `<text class="ca" x="${pad.l}" y="${H - 3}">${M.fdate(ws[0].pts[0][0])}</text><text class="ca" x="${W - pad.r}" y="${H - 3}" text-anchor="end">${M.fdate(ws[0].pts[ws[0].pts.length - 1][0])}</text>`; t3 = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${g}</svg><p class="xk">${ws.map((w, i) => `<i class="${['kc', 'kp', 'k3', 'k4'][i]}"></i>${esc(w.n)}`).join(' ')} · 주간 유조선 통과(척/일, 비공개)</p>`; }
  else { const bw = (S.bwet || {}).weekly || []; t3 = bw.length ? multiLine([{pts: bw.slice(-104), cls: 'l-a'}], W, H, {dg: 0}) + '<p class="xk">VLCC 운임선물 ETF 주평균(달러) · 운임(WS·달러/일)이 아니다</p>' : '<p class="miss">미수집</p>'; }
  p3.innerHTML = `<h4>해상 운송 <small>${cps.length ? '해협 통과 · ' : '운임 · '}톤마일 미수집</small></h4>${t3}`;
}
const HUBS = [
  {id: 'us', name: '미국 헨리허브', ll: [-92.2, 30.0], key: 'henry_hub', unit: '달러/MMBtu', reg: '미주'},
  {id: 'eu', name: '유럽 (IMF 월간)', ll: [4.9, 52.4], key: 'eu_gas_imf', unit: '달러/MMBtu', reg: '유럽', fut: 'ttf_fut'},
  {id: 'asia', name: '아시아 LNG (IMF 월간)', ll: [135.0, 35.0], key: 'asia_lng_imf', unit: '달러/MMBtu', reg: '아시아', fut: 'jkm_fut'}];
/* 품목과 그 위 단계(투입). P1 계열(group inflation)은 payload에 있을 때만 품목이 되고, 없으면 미수집 줄로 남는다 */
const CPI_ALL = [
  {id: 'cpi_all', name: 'CPI 종합', up: 'brent', upName: '브렌트 현물'},
  {id: 'cpi_core', name: '근원 CPI', up: 'ppi_services', upName: 'PPI 최종수요 서비스'},
  {id: 'cpi_energy', name: '에너지', up: 'retail_gasoline', upName: '휘발유 소매', p1: true},
  {id: 'cpi_gasoline', name: '휘발유', up: 'retail_gasoline', upName: '휘발유 소매'},
  {id: 'cpi_electricity', name: '전기', up: 'coal_au_imf', upName: '호주 석탄 (IMF)', p1: true},
  {id: 'cpi_utility_gas', name: '도시가스', up: 'henry_hub', upName: '헨리허브 (월평균)', p1: true},
  {id: 'cpi_food_home', name: '가정 내 식품', up: 'food_index_imf', upName: 'IMF 식품지수'},
  {id: 'cpi_airfare', name: '항공요금', up: 'usgc_jet', upName: '걸프연안 항공유'},
  {id: 'cpi_transport_svc', name: '운송 서비스', up: 'ppi_transport', upName: 'PPI 운송·창고', p1: true}];
const hasM = k => !!(input.live.series[k] && input.live.series[k].monthly);
const CPI_ITEMS = CPI_ALL.filter(it => hasM(it.id)).map(it => it.up && !hasM(it.up) ? {...it, up: null, upName: it.upName + ' (미수집)'} : it);
const CPI_MISSING = CPI_ALL.filter(it => it.p1 && !hasM(it.id)).map(it => 'CPI ' + it.name);
const MOm = k => ((input.live.series[k] || {}).monthly) || {};
const sortedM = o => Object.keys(o).sort();
const addM = (m, k) => { const d = new Date(Date.UTC(+m.slice(0, 4), +m.slice(5, 7) - 1 + k, 1)); return d.toISOString().slice(0, 7); };
const keyLine = items => `<p class="xk">${items.map(([c, t]) => `<i class="${c}"></i>${esc(t)}`).join(' ')}</p>`;
const median = a => { const s = a.filter(isNum).slice().sort((x, y) => x - y); return s.length ? (s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2) : null; };
function multiLine(sers, W, H, opt) {
  opt = opt || {}; const pad = {l: 34, r: 8, t: 8, b: 16};
  const all = sers.flatMap(s => s.pts.map(p => p[1])).concat(isNum(opt.ref) ? [opt.ref] : []).filter(isNum); if (!all.length) return '<p class="miss">미수집</p>';
  const ts = sers.flatMap(s => s.pts.map(p => M.tOf(p[0].length === 7 ? p[0] + '-01' : p[0])));
  const t0 = Math.min(...ts), t1 = Math.max(...ts); const yd = K.ext(all, 0.06);
  const x = K.sc([t0, t1], [pad.l, W - pad.r]), y = K.sc(yd, [H - pad.b, pad.t]); const T = p => x(M.tOf(p[0].length === 7 ? p[0] + '-01' : p[0]));
  let g = axisY(y, yd[0], yd[1], pad.l, W - pad.r, 3, opt.dg || 0);
  if (opt.fill && sers.length >= 2) { const a = sers[opt.fill[0]].pts, b = sers[opt.fill[1]].pts; const bm = Object.fromEntries(b); const A = a.filter(p => isNum(bm[p[0]])); if (A.length > 1) g += `<path class="cspread" d="M${A.map(p => T(p) + ',' + y(p[1])).join('L')}L${A.slice().reverse().map(p => T(p) + ',' + y(bm[p[0]])).join('L')}Z"/>`; }
  if (isNum(opt.ref)) g += `<line class="cref" x1="${pad.l}" x2="${W - pad.r}" y1="${y(opt.ref)}" y2="${y(opt.ref)}"/>`;
  for (let yy = new Date(t0).getUTCFullYear() + 1; yy <= new Date(t1).getUTCFullYear(); yy++) { const t = Date.UTC(yy, 0, 1); g += `<line class="cg" x1="${x(t)}" x2="${x(t)}" y1="${pad.t}" y2="${H - pad.b}"/><text class="ca" x="${x(t)}" y="${H - 3}" text-anchor="middle">${String(yy).slice(2)}년</text>`; }
  sers.forEach(s => { const P = s.pts.filter(p => isNum(p[1])).map(p => [T(p), y(p[1])]); if (P.length < 2) return; g += `<path class="${s.cls}" d="${K.pathOf(P)}"/><circle class="cdot2 ${s.cls}" cx="${P[P.length - 1][0]}" cy="${P[P.length - 1][1]}" r="2.6"/>`; });
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${g}</svg>`;
}
function hubStat(h) {
  const mo = MOm(h.key); const ks = sortedM(mo); const m = ks[ks.length - 1]; if (!m) return null;
  const v = mo[m], p = mo[addM(m, -12)]; const y22 = ks.filter(k => k.startsWith('2022')).map(k => mo[k]); const mx = Math.max(...y22);
  return {m, v, r: isNum(p) ? v / p * 100 : null, p22: y22.length ? v / mx * 100 : null};
}
function renderGasEx() {
  const box = $('#mw-canvas'); const gx = state.gx; const S = input.live.series, U = input.live.supply;
  const st = HUBS.map(h => ({h, s: hubStat(h)}));
  const mv = s => !s ? null : gx.meas === 'level' ? s.v : gx.meas === 'ratio' ? s.r : s.p22;
  const mlab = {level: '최신 달 수준, 달러/MMBtu', ratio: '전년 같은 달 = 100', p22: '2022년 월간 최고 = 100'}[gx.meas];
  const facet = `<div class="xh"><div class="xf"><span class="xf-l">측정</span>${[['level', '가격 수준'], ['ratio', '전년 같은 달 = 100'], ['p22', '2022년 최고 대비']].map(([id, nm]) => `<button class="xb" aria-pressed="${gx.meas === id}" data-gm="${id}">${nm}</button>`).join('')}</div><div class="xf"><span class="xf-l">허브</span>${HUBS.map(h => `<button class="xb" aria-pressed="${gx.hub === h.id}" data-gh="${h.id}">${esc(h.name.split(' (')[0])}</button>`).join('')}</div></div>`;
  const vmax = Math.max(...st.map(x => mv(x.s)).filter(isNum), 1);
  const list = st.map(({h, s}) => { const v = mv(s); const w = gx.meas === 'level' ? v / vmax * 100 : Math.min(100, v / 2); return `<li><button class="xr${gx.hub === h.id ? ' on' : ''}" data-gh="${h.id}"><span>${esc(h.name.split(' (')[0])}</span><b class="num">${isNum(v) ? f(v, gx.meas === 'level' ? 2 : 0) : '—'}</b><span class="xr-b"><i style="width:${Math.max(0, w).toFixed(1)}%"></i>${gx.meas !== 'level' ? '<em style="left:50%"></em>' : ''}</span><small>${s ? M.fdate(s.m, 'M') : ''}</small></button></li>`; }).join('');
  const sp = (() => { const a = MOm('asia_lng_imf'), e = MOm('eu_gas_imf'), u = MOm('henry_hub'); const m = sortedM(u).filter(k => isNum(a[k]) && isNum(e[k])).pop(); return m ? [['아시아 − 미국', a[m] - u[m]], ['유럽 − 미국', e[m] - u[m]], ['아시아 − 유럽', a[m] - e[m]]].map(([n, v]) => `<li><span class="xr static"><span>${n}</span><b class="num">${f(v, 2)}</b><span class="xr-b"><i style="width:${Math.min(100, Math.abs(v) / 20 * 100).toFixed(1)}%"></i></span><small>${M.fdate(m, 'M')}</small></span></li>`).join('') : ''; })();
  /* 난방도일(STEO 표 9c, 월간): 실적 마지막 달과 다음 석 달 EIA 전망, 막대 = 직전 10년 같은 달 평균 = 100 */
  const hdd = (() => { const B = U.steo_balance; if (!B || !B.series || !B.series.us_hdd || !B.series.us_hdd_normal) return ''; const i = B.months.indexOf(B.last_historical); if (i < 0) return ''; const ms = B.months.slice(i, i + 4).map((m, k) => ({m, v: B.series.us_hdd.values[i + k], n: B.series.us_hdd_normal.values[i + k], f: k > 0})).filter(x => isNum(x.v) && x.n); return ms.length ? `<h4>난방도일 <small>평년 = 100 · STEO ${esc(M.fdate(B.edition, 'M'))}판 · 첫 달 추정·실적, 나머지 EIA 전망</small></h4><ul>${ms.map(x => { const r = x.v / x.n * 100; return `<li><span class="xr static${x.f ? ' st' : ''}" title="${esc(M.fdate(x.m, 'M') + ' ' + f(x.v, 0) + ' / 평년 ' + f(x.n, 0))}"><span>${esc(M.fdate(x.m, 'M'))}${x.f ? ' 전망' : ''}</span><b class="num">${f(r, 0)}</b><span class="xr-b"><i style="width:${Math.min(100, r / 2).toFixed(1)}%"></i><em style="left:50%"></em></span><small>${f(x.v, 0)}</small></span></li>`; }).join('')}</ul>` : ''; })();
  const hddHtml = hdd;
  box.innerHTML = `${facet}<div class="xg"><div class="xmap" id="mw-xmap"></div><aside class="xhist"><h4>허브 <small>${esc(mlab)}</small></h4><ul>${list}</ul><h4>지역 차 <small>달러/MMBtu, IMF 월간 같은 달</small></h4><ul>${sp}</ul>${hddHtml}<h4>미수집 <small>${chk('c9').missing.length + 1}</small></h4><ul class="xmiss"><li>EU 가스 저장률 · 키 없음(추가 안 함)</li>${chk('c9').missing.map(m => `<li>${esc(m.item)} · ${esc(m.status)}</li>`).join('')}</ul></aside></div><div class="xb3"><section class="xp" id="mw-xp1"></section><section class="xp" id="mw-xp2"></section><section class="xp" id="mw-xp3"></section></div>`;
  box.querySelectorAll('[data-gm]').forEach(b => b.onclick = () => { gx.meas = b.dataset.gm; renderCanvas(); });
  box.querySelectorAll('[data-gh]').forEach(b => b.onclick = () => { gx.hub = b.dataset.gh; renderCanvas(); });
  /* 지도: 허브 원(크기 = 가격, 색 = 전년 대비), 고른 허브 강조 */
  const drawGas = () => { const el = $('#mw-xmap'); if (!el) return; const W = el.clientWidth, H = el.clientHeight;
  if (W && WORLD && window.d3) {
    const proj = d3.geoNaturalEarth1().fitExtent([[6, 6], [W - 6, H - 6]], {type: 'Sphere'}); const path = d3.geoPath(proj);
    let g = `<path class="xsph" d="${path({type: 'Sphere'})}"/><path class="xgrat" d="${path(d3.geoGraticule10())}"/>` + WORLD.features.map(ft => `<path class="xc" d="${path(ft)}"/>`).join('');
    const pmax = Math.max(...st.map(x => x.s && x.s.v).filter(isNum), 1);
    st.forEach(({h, s}) => { if (!s) return; const [x, y] = proj(h.ll); const r = 8 + 26 * Math.sqrt(s.v / pmax); const t = isNum(s.r) ? Math.max(-1, Math.min(1, (s.r - 100) / 60)) : 0; const c = d3.interpolateRgb('#2a2f37', '#e5e8eb')((t + 1) / 2);
      g += `<g class="hub${gx.hub === h.id ? ' on' : ''}" data-gh="${h.id}" transform="translate(${x},${y})"><circle r="${r}" style="fill:${c}"/><text y="${-r - 5}" text-anchor="middle">${esc(h.name.split(' (')[0])}</text><text class="hv" y="4" text-anchor="middle">${f(s.v, 1)}</text><title>${esc(h.name + ' ' + M.fdate(s.m, 'M') + ' ' + f(s.v, 2) + ' ' + h.unit + (isNum(s.r) ? ' · 전년 같은 달 = 100 기준 ' + f(s.r, 0) : ''))}</title></g>`; });
    el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${g}</svg><div class="xleg">원 크기 = 가격 수준(달러/MMBtu) · 밝기 <i style="background:#2a2f37"></i>전년보다 낮다 <i style="background:#888d94"></i>비슷 <i style="background:#e5e8eb"></i>높다</div>`;
    el.querySelectorAll('.hub').forEach(n => n.onclick = () => { gx.hub = n.dataset.gh; renderCanvas(); });
  } };
  drawGas(); reflow = drawGas;
  const p1 = $('#mw-xp1'), p2 = $('#mw-xp2'), p3 = $('#mw-xp3'); const PW = Math.max(150, p1.clientWidth - 16), PH = 112;
  const ser = k => Object.entries(MOm(k)).sort();
  p1.innerHTML = `<h4>세 지역 가격 <small>월평균, 달러/MMBtu · 면 = 아시아와 미국의 차</small></h4>${multiLine([{pts: ser('asia_lng_imf'), cls: 'l-a'}, {pts: ser('eu_gas_imf'), cls: 'l-e'}, {pts: ser('henry_hub'), cls: 'l-u'}], PW, PH, {fill: [0, 2]})}${keyLine([['k-a', '아시아 LNG'], ['k-e', '유럽'], ['k-u', '미국 헨리허브']])}`;
  const gs = U.us_weekly.gas_storage; const wb = gs ? weekBandChart(gs, PW, PH, 1) : null;
  p2.innerHTML = `<h4>미국 가스 저장 <small>bcf · 같은 주 ${gs ? gs.band_years.join('–') : ''} 범위 · 3월 말 조건부는 ⑨ 상세</small></h4>${wb ? wb.svg + `<p class="xk">${wb.key}</p>` : '<p class="miss">미수집</p>'}`;
  const hub = HUBS.find(h => h.id === gx.hub); const fut = hub.fut ? (S[hub.fut] || {}).weekly : (S.ng_fut || {}).weekly;
  const futName = hub.fut ? S[hub.fut].label + ' (' + S[hub.fut].unit + ')' : '헨리허브 선물 근월물 (달러/MMBtu)';
  p3.innerHTML = `<h4>${esc(hub.name.split(' (')[0])} 선물 주평균 <small>${esc(futName)} · 근월물 연결</small></h4>${fut ? multiLine([{pts: fut.slice(-104), cls: 'l-a'}], PW, PH, {dg: 0}) : '<p class="miss">미수집</p>'}<p class="xk">석탄(호주, IMF) ${(() => { const c = MOm('coal_au_imf'); const m = sortedM(c).pop(); return m ? f(c[m], 0) + ' 달러/톤 · ' + M.fdate(m, 'M') : '미수집'; })()} · LNG 관련 대장 기록 ${model.timeline.records.filter(r => r.node === 'n-lng' || r.node === 'n-gas').length}건</p>`;
}
function cpiMeas(id, meas) {
  const mo = MOm(id); const out = {};
  sortedM(mo).forEach(m => { const v = mo[m]; const b = meas === 'mm' ? mo[addM(m, -1)] : meas === 'ann3' ? mo[addM(m, -3)] : mo[addM(m, -12)]; if (!isNum(v) || !isNum(b)) return; out[m] = meas === 'mm' ? (v / b - 1) * 100 : meas === 'ann3' ? (Math.pow(v / b, 4) - 1) * 100 : (v / b - 1) * 100; });
  return out;
}
function renderCpiEx() {
  const box = $('#mw-canvas'); const cx = state.cx;
  const ml = {mm: '전월비 %', ann3: '3개월 연율 %', yoy: '전년비 %'}[cx.meas];
  const data = CPI_ITEMS.map(it => { const s = cpiMeas(it.id, cx.meas); const ks = sortedM(s); return {it, s, ks, med: median(Object.values(s)), sd: (() => { const v = Object.values(s); const m = v.reduce((a, b) => a + b, 0) / v.length; return Math.sqrt(v.reduce((a, b) => a + (b - m) * (b - m), 0) / v.length) || 1; })()}; });
  const lastM = sortedM(MOm('cpi_all')).pop(); const months = []; for (let k = 23; k >= 0; k--) months.push(addM(lastM, -k));
  const facet = `<div class="xh"><div class="xf"><span class="xf-l">측정</span>${[['mm', '전월비'], ['ann3', '3개월 연율'], ['yoy', '전년비']].map(([id, nm]) => `<button class="xb" aria-pressed="${cx.meas === id}" data-cm="${id}">${nm}</button>`).join('')}</div><div class="xf"><span class="xf-l">품목</span>${CPI_ITEMS.map(it => `<button class="xb" aria-pressed="${cx.item === it.id}" data-ci="${it.id}">${esc(it.name)}</button>`).join('')}</div></div>`;
  /* 히트맵: 칸 색 = 그 품목의 2022년 이후 중앙값에서 표준편차 몇 배 떨어졌나 (밝을수록 높다 · 어두울수록 낮다) */
  const cw = `calc((100% - 120px) / ${months.length})`;
  const heat = `<div class="hm"><div class="hm-r hm-h"><span></span>${months.map((m, i) => `<span class="hm-m">${i % 3 === 0 || i === months.length - 1 ? (m.slice(5) === '01' ? m.slice(2, 4) + '.' : '') + (+m.slice(5)) : ''}</span>`).join('')}</div>${data.map(d => `<div class="hm-r${cx.item === d.it.id ? ' on' : ''}" data-ci="${d.it.id}"><span class="hm-n">${esc(d.it.name)}</span>${months.map(m => { const v = d.s[m]; if (!isNum(v)) return `<span class="hm-c na" title="${esc(d.it.name + ' ' + M.fdate(m, 'M') + ' 자료 없음')}"></span>`; const z = Math.max(-2, Math.min(2, (v - d.med) / d.sd)); const c = d3.interpolateRgb('#24282e', '#eef0f2')((z + 2) / 4); return `<span class="hm-c" style="background:${c}" title="${esc(d.it.name + ' ' + M.fdate(m, 'M') + ' ' + ml + ' ' + f(v, 2))}"></span>`; }).join('')}</div>`).join('')}${CPI_MISSING.map(n => `<div class="hm-r miss-r"><span class="hm-n">${esc(n)}</span><span class="hm-x">미수집 · DB 있음${PAGES ? '' : ' (payload에 추가 필요)'}</span></div>`).join('')}<p class="xleg2"><i style="background:#24282e"></i>자기 중앙값보다 낮다 <i style="background:#898c90"></i>중앙값 근처 <i style="background:#eef0f2"></i>높다 · 품목마다 2022년 이후 ${esc(ml)} 분포 기준 · 빗금 = 자료 없음</p></div>`;
  const list = data.map(d => { const m = d.ks[d.ks.length - 1]; const v = d.s[m]; return `<li><button class="xr${cx.item === d.it.id ? ' on' : ''}" data-ci="${d.it.id}"><span>${esc(d.it.name)}</span><b class="num">${isNum(v) ? f(v, cx.meas === 'mm' ? 2 : 1) : '—'}</b><span class="xr-b"><i style="width:${Math.min(100, Math.abs(v) / (cx.meas === 'mm' ? 2 : 12) * 100).toFixed(1)}%;${v < 0 ? 'background:#5f6b7c' : ''}"></i></span><small>${m ? M.fdate(m, 'M') : ''}</small></button></li>`; }).join('');
  box.innerHTML = `${facet}<div class="xg"><div class="xmap hmwrap">${heat}</div><aside class="xhist"><h4>품목 최신 <small>${esc(ml)}</small></h4><ul>${list}</ul><h4>연결</h4><ul class="xmiss">${CPI_ITEMS.map(it => `<li>${esc(it.upName)} → ${esc(it.name)}</li>`).join('')}</ul></aside></div><div class="xb3"><section class="xp" id="mw-xp1"></section><section class="xp" id="mw-xp2"></section><section class="xp" id="mw-xp3"></section></div>`;
  box.querySelectorAll('[data-cm]').forEach(b => b.onclick = () => { cx.meas = b.dataset.cm; renderCanvas(); });
  box.querySelectorAll('[data-ci]').forEach(b => b.onclick = () => { cx.item = b.dataset.ci; renderCanvas(); });
  const it = CPI_ITEMS.find(x => x.id === cx.item); const p1 = $('#mw-xp1'), p2 = $('#mw-xp2'), p3 = $('#mw-xp3'); const PW = Math.max(150, p1.clientWidth - 16), PH = 112;
  /* 상류 가격과 소비자 품목을 같은 달 = 100으로 맞춰 나란히 */
  const rebase = (k, base) => { const mo = MOm(k); const b = mo[base]; return sortedM(mo).filter(m => m >= base).map(m => [m, mo[m] / b * 100]); };
  const base = '2024-01';
  p1.innerHTML = `<h4>${esc(it.upName.split(' (')[0])} → ${esc(it.name)} <small>${M.fym(base)} = 100</small></h4>${it.up ? multiLine([{pts: rebase(it.up, base), cls: 'l-u'}, {pts: rebase(it.id, base), cls: 'l-a'}], PW, PH, {ref: 100}) + keyLine([['k-u', it.upName + ' (상류)'], ['k-a', it.name + ' (소비자)']]) : `<p class="miss">${esc(it.upName)}</p>`}`;
  const d = data.find(x => x.it.id === it.id);
  p2.innerHTML = `<h4>${esc(it.name)} 흐름 <small>${esc(ml)} · 점선 = 2022년 이후 중앙값</small></h4>${multiLine([{pts: d.ks.map(m => [m, d.s[m]]), cls: 'l-a'}], PW, PH, {ref: d.med, dg: 1})}`;
  const c12 = chk('c12'); const pt = c12.gasPart || {}, G = c12.G || {};
  p3.innerHTML = `<h4>휘발유 소매 부분월 · 기여 <small>⑫ 맥락 · 판정 없음</small></h4>${isNum(pt.r) ? `<p class="xv"><b class="num">${fs(pt.r, 1)}%</b> <small>${esc(M.fdate(pt.pm.month, 'M'))} ${pt.pm.n}회 평균 · ${esc(M.fdate(pt.lm, 'M'))} 평균 대비</small></p><p class="xv"><b class="num">${fs(G.mm, 2)}%</b> <small>CPI 휘발유 ${esc(M.fdate(G.lm, 'M'))} 전월비</small></p>` : '<p class="miss">미수집</p>'}${c12.contrib ? `<p class="xv"><small>${esc(c12.contrib.title)}</small></p>` + contribBars(c12.contrib, PW, true) : '<div class="sk-row"><span>CPI 3개월 기여(에너지·식품·근원 상품·근원 서비스)</span><span class="hatchbar">미수집 · DB 있음</span></div>'}`;
}
/* ⑤ 완충 탐색: 행 = 면(재고 위치·공급일수·계절 수요·13주 경로·저장 여유·비축·세계 균형과 여유능력), 열 = 그 면의 단위(품목·지역·국가·세계).
 * 맨 위 계절 달력은 같은 주 5년 평균의 연중 모양(산술)과 이번 주 위치. 칸을 고르면 아래 세 칸에 그 칸의 이력·짝·연결 가격을 편다.
 * 판정 낱말은 쓰지 않는다(맥락 면). 수치는 monitor-model.js 의 checks.c5.facets 와 payload 원자료에서만 나온다. */
const UW = () => (input.live.supply || {}).us_weekly || {};
const mb = v => isNum(v) ? f(v, v >= 100 ? 0 : 1) : '—';
const ym = d => d ? d.slice(0, 4) + '년 ' + (+d.slice(5, 7)) + '월' : '';
const svgW = (W, H, g, cls) => `<svg class="${cls || ''}" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${g}</svg>`;
function gFill(x, W) {
  const H = 14, sc = v => 2 + (W - 4) * Math.max(0, Math.min(100, v)) / 100;
  let g = `<rect class="gf-t" x="2" y="4" width="${W - 4}" height="6"/>`;
  if (x.bandFill) g += `<rect class="gf-b" x="${sc(x.bandFill[0])}" y="2" width="${Math.max(1, sc(x.bandFill[2]) - sc(x.bandFill[0]))}" height="10"/>`;
  g += `<rect class="gf-v" x="2" y="5" width="${Math.max(0, sc(x.fill) - 2)}" height="4"/>`;
  if (isNum(x.y1Fill)) g += `<line class="gf-y" x1="${sc(x.y1Fill)}" x2="${sc(x.y1Fill)}" y1="1" y2="13"/>`;
  return svgW(W, H, g + `<circle class="gf-d" cx="${sc(x.fill)}" cy="7" r="2.6"/>`);
}
function gSeason(o, W, x) {
  /* 같은 주 범위(띠)와 평균(점선), 이번 주 점, 평년 13주 변화(흰 점선). 연말을 넘으면 오른쪽 끝까지 그리고 왼쪽 첫 주들에 이어 그린다 */
  const H = 26; if (!o || !o.band) return svgW(W, H, '');
  const b = o.band.slice(0, 52); const all = b.flatMap(v => v ? [v[0], v[2]] : []).filter(isNum); if (!all.length) return svgW(W, H, '');
  const a = wkSeriesUI(o); const L = a[a.length - 1]; const tgt = L && x && isNum(x.n13) ? L.v + x.n13 : null;
  const yd = K.ext(all.concat(L ? [L.v] : [], isNum(tgt) ? [tgt] : []), 0.08);
  const X = w => 2 + (W - 4) * (w - 1) / 51, y = K.sc(yd, [H - 2, 2]);
  const up = b.map((v, i) => v && [X(i + 1), y(v[2])]).filter(Boolean), dn = b.map((v, i) => v && [X(i + 1), y(v[0])]).filter(Boolean);
  let g = `<path class="gs-b" d="M${up.map(p => p.join(',')).join('L')}L${dn.reverse().map(p => p.join(',')).join('L')}Z"/><path class="gs-a" d="${K.segPaths(b.map((v, i) => v ? [X(i + 1), y(v[1])] : null))}"/>`;
  if (L && isNum(tgt)) {
    if (!x.wrap) g += `<path class="gs-13" d="M${X(L.w)},${y(L.v)}L${X(x.w13)},${y(tgt)}"/>`;
    else { const span = 53 - L.w + x.w13, ym = L.v + (tgt - L.v) * (53 - L.w) / span; g += `<path class="gs-13" d="M${X(L.w)},${y(L.v)}L${X(52)},${y(ym)}M${X(1)},${y(ym)}L${X(x.w13)},${y(tgt)}"/>`; }
  }
  if (L) g += `<circle class="gs-d" cx="${X(L.w)}" cy="${y(L.v)}" r="2.4"/>`;
  return svgW(W, H, g);
}
function wkSeriesUI(o) { const out = []; (o.prev || []).forEach(([w, v]) => isNum(v) && out.push({y: o.year - 1, w, v})); (o.cur || []).forEach(([w, v]) => isNum(v) && out.push({y: o.year, w, v})); return out; }
function gPath(x, W) {
  const H = 14; if (!x || !x.b13) return svgW(W, H, '');
  const vals = [x.b13[0], x.b13[2], x.e1, x.e2, x.cur].filter(isNum); const d = K.ext(vals, 0.06), sc = K.sc(d, [3, W - 3]);
  let g = `<rect class="gp-b" x="${sc(x.b13[0])}" y="3" width="${Math.max(1, sc(x.b13[2]) - sc(x.b13[0]))}" height="8"/><line class="gp-a" x1="${sc(x.b13[1])}" x2="${sc(x.b13[1])}" y1="1" y2="13"/><line class="gp-c" x1="${sc(x.cur)}" x2="${sc(x.cur)}" y1="4" y2="10"/>`;
  if (isNum(x.e2)) g += `<circle class="gp-e2" cx="${sc(x.e2)}" cy="7" r="3"/>`;
  return svgW(W, H, g + `<circle class="gp-e1" cx="${sc(x.e1)}" cy="7" r="3"/>`);
}
function gMon(s, W, zero) {
  /* STEO 월간: 실적 실선, EIA 전망 점선 */
  const H = 22; if (!s) return svgW(W, H, '');
  const pts = s.pts.slice(-36); const t = p => M.tOf(p[0] + '-01'); const xd = [t(pts[0]), t(pts[pts.length - 1])];
  const yd = K.ext(pts.map(p => p[1]).concat(zero ? [0] : []), 0.1); const x = K.sc(xd, [2, W - 4]), y = K.sc(yd, [H - 2, 2]);
  const h = pts.filter(p => p[0] <= s.m), fc = pts.filter(p => p[0] >= s.m);
  let g = zero ? `<line class="gm-z" x1="2" x2="${W - 2}" y1="${y(0)}" y2="${y(0)}"/>` : '';
  g += `<path class="gm-h" d="${K.pathOf(h.map(p => [x(t(p)), y(p[1])]))}"/>`;
  if (fc.length > 1) g += `<path class="gm-f" d="${K.pathOf(fc.map(p => [x(t(p)), y(p[1])]))}"/>`;
  const L = h[h.length - 1]; return svgW(W, H, g + (L ? `<circle class="gs-d" cx="${x(t(L))}" cy="${y(L[1])}" r="2.4"/>` : ''));
}
function gRatio(v, W, ref, max) {
  const H = 14, sc = u => 2 + (W - 4) * Math.max(0, Math.min(max, u)) / max;
  return svgW(W, H, `<rect class="gf-t" x="2" y="4" width="${W - 4}" height="6"/><rect class="gf-v" x="2" y="5" width="${Math.max(0, sc(v) - 2)}" height="4"/><line class="gf-y" x1="${sc(ref)}" x2="${sc(ref)}" y1="1" y2="13"/><circle class="gf-d" cx="${sc(v)}" cy="7" r="2.6"/>`);
}
/* 계절 달력: 행마다 같은 주 5년 평균을 그 계열의 연중 최저~최고로 0~1 칠한다(산술). 세로선 = 이번 주 */
function seasonCal(W) {
  const U = input.live.supply || {}; const W0 = UW(); const B = U.steo_balance;
  const rows = [['휘발유 수요', W0.gasoline_demand], ['중간유분 수요', W0.distillate_demand], ['프로판 수요', W0.propane_demand], ['항공유 수요', W0.jet_demand], ['정유 가동률', W0.utilization]].filter(r => r[1] && r[1].band)
    .map(([n, o]) => ({n, v: o.band.slice(0, 52).map(b => b ? b[1] : null)}));
  if (B && B.series && B.series.us_hdd_normal) { const hn = B.series.us_hdd_normal; const yr = +String(B.last_historical || '').slice(0, 4); const byM = {}; B.months.forEach((m, i) => { if (+m.slice(0, 4) === yr && isNum(hn.values[i])) byM[+m.slice(5, 7)] = hn.values[i]; }); if (Object.keys(byM).length === 12) rows.push({n: '난방도일 평년', v: Array.from({length: 52}, (_, i) => byM[Math.min(12, Math.floor(i * 12 / 52) + 1)]), monthly: true}); }
  const cw = W0.utilization || W0.gasoline_demand; const nowW = cw ? (wkSeriesUI(cw).pop() || {}).w : null;
  const lw = 88, H = 12 + rows.length * 12; const x = w => lw + (W - lw - 4) * (w - 1) / 52;
  let g = '';
  [[1, '1월'], [14, '4월'], [27, '7월'], [40, '10월']].forEach(([w, t]) => g += `<text class="ca" x="${x(w)}" y="9">${t}</text>`);
  /* 행마다 다섯 분위로 칠한다(회색 다섯 단계, 밝을수록 그 계열의 연중 높은 주). 산술 순위이며 확률이 아니다 */
  const STEP = ['#262b32', '#454c56', '#6b737e', '#9aa2ac', '#d3d8de'];
  rows.forEach((r, i) => { const a = r.v.filter(isNum).slice().sort((p, q) => p - q); const y0 = 12 + i * 12;
    const q = v => Math.min(4, Math.floor(a.filter(z => z < v).length / a.length * 5));
    g += `<text class="sc-n" x="0" y="${y0 + 9}">${esc(r.n)}</text>`;
    r.v.forEach((v, k) => { if (!isNum(v)) return; g += `<rect x="${x(k + 1)}" y="${y0}" width="${(W - lw - 4) / 52 + 0.3}" height="10" style="fill:${STEP[q(v)]}"><title>${esc(r.n + ' · ' + (k + 1) + '주 평균 ' + f(v, v > 100 ? 0 : 1) + (r.monthly ? ' (월)' : '') + ' · ' + (q(v) + 1) + '분위')}</title></rect>`; }); });
  if (nowW) g += `<line class="sc-now" x1="${x(nowW) + 2}" x2="${x(nowW) + 2}" y1="10" y2="${H}"/><text class="ca" x="${x(nowW) + 5}" y="9">${nowW}주</text>`;
  return svgW(W, H, g, 'scal');
}
const d3c = (a, b, t) => window.d3 ? d3.interpolateRgb(a, b)(Math.max(0, Math.min(1, t))) : b;
function stockRows() {
  const c5 = chk('c5'), F = c5.facets || {}; const W0 = UW(); const c7 = chk('c7');
  const by = (W0.crude_stocks || {}).band_years || []; const byT = by.length ? by[0] + '–' + String(by[1]).slice(2) : '';
  const cnt = (xs, key) => { const o = {}; xs.forEach(x => { const p = key(x); if (p) o[p] = (o[p] || 0) + 1; }); return ['아래', '안', '위'].filter(k => o[k]).map(k => k + ' ' + o[k]).join(' · '); };
  const R = [];
  R.push({id: 'level', name: '재고 위치', ru: '백만 배럴', sub: '백만 배럴 · 같은 주 ' + byT + ' 범위', sum: cnt(F.level || [], x => x.pos && x.pos.pos), cells: (F.level || []).map(x => ({id: 'level:' + x.p, p: x.p, name: x.name, val: mb(x.value), u: '백만 배럴', glyph: x.pos ? strip(x.pos, 92, 12) : '', word: x.pos ? x.pos.pos : '', date: x.date, miss: !isNum(x.value)}))
});
  R.push({id: 'cover', name: '공급일수', ru: '일', sub: '일 · 재고 ÷ 4주 평균 수요', sum: cnt(F.cover || [], x => x.pos && x.pos.pos), cells: (F.cover || []).map(x => ({id: 'cover:' + x.p, p: x.p, name: x.name, val: mb(x.value), u: '일', glyph: x.pos ? strip(x.pos, 92, 12) : '', word: x.pos ? x.pos.pos : '', date: x.date, miss: !isNum(x.value)}))});
  R.push({id: 'demand', name: '계절 수요', ru: '백만 b/d', sub: '백만 b/d · 4주 평균 · 흰 점선 = 평년 13주 변화', sum: cnt(F.demand || [], x => x.pos && x.pos.pos), cells: (F.demand || []).map(x => ({id: 'demand:' + x.p, p: x.p, name: x.p === 'crude' ? '정제 투입' : x.p === 'total' ? '합계' : x.name, val: isNum(x.value) ? f(x.value / 1000, 2) : '—', u: '백만 b/d', glyph: gSeason(W0[x.key], 92, x), word: x.pos ? x.pos.pos : '', date: x.date, miss: !isNum(x.value), note: isNum(x.n13pct) ? '평년 13주 ' + fs(x.n13pct, 1) + '% · 정점 ' + x.peakW + '주' : ''}))});
  R.push({id: 'path', name: '13주 경로', ru: '백만 배럴', sub: '백만 배럴(평년 경로) · ● 평년 ○ 전년 · 띠 = 13주 뒤 범위', sum: cnt(F.path || [], x => x.p1), cells: (F.path || []).map(x => ({id: 'path:' + x.p, p: x.p, name: x.name, val: isNum(x.e1) ? mb(x.e1 / 1000) : '—', u: '백만 배럴', glyph: gPath(x, 92), word: x.p1 ? x.p1 + (x.p2 ? '·' + x.p2 : '') : '', date: x.date, miss: !isNum(x.e1), why: W0[x.key] && !W0[x.key].band_next ? '해 넘는 범위 수집 전' : '', note: x.w13 ? x.w + '주 → ' + (x.wrap ? '다음 해 ' : '') + x.w13 + '주 · 범위 ' + (x.by13 || []).join('–') : ''}))});
  R.push({id: 'room', name: '저장 여유', ru: '%', sub: '% · 재고 ÷ (작업 능력 + 수송 중 재고) · SPR ÷ 작업 능력 · 띠 = 같은 주 범위 · 눈금 = 전년', sum: (F.room || []).filter(x => isNum(x.fill)).length + '/' + (F.room || []).length + '곳', cells: (F.room || []).map(x => ({id: 'room:' + x.rg, name: x.name, tag: isNum(x.cap) ? ym(x.capAsOf) + ' 능력' : '', val: isNum(x.fill) ? f(x.fill, 0) : '—', u: '%', glyph: isNum(x.fill) ? gFill(x, 92) : '', word: isNum(x.room) ? '여유 ' + mb(x.room) : '', date: x.date, miss: !isNum(x.fill), why: x.missing ? x.missing + (x.missing === '수집 전' ? ' · EIA 주간' : ' · 저장능력 보고서') : '', note: isNum(x.cap) ? x.capBasis + ' ' + mb(x.cap) + ' · ' + ym(x.capAsOf) + ' 기준' : ''}))});
  const S = F.stockpile || {};
  const jodiOf = cc => (S.jodi || []).find(x => x.cc === cc && x.pr === '원유');
  const sc = [];
  if (S.spr) sc.push({id: 'stock:spr', name: '미국 SPR', val: mb(S.spr.value), u: '백만 배럴', glyph: isNum(S.spr.y1r) ? gRatio(S.spr.y1r, 92, 100, 150) : '', word: isNum(S.spr.y1r) ? '전년의 ' + f(S.spr.y1r, 0) + '%' : '', date: S.spr.date, note: isNum(S.spr.fill) ? '작업 저장능력의 ' + f(S.spr.fill, 0) + '%' : ''});
  else sc.push({id: 'stock:spr', name: '미국 SPR', miss: true, why: '수집 전'});
  if (S.jp) sc.push({id: 'stock:jp', name: '일본', val: f(S.jp.total, 0), u: '일', glyph: gRatio(S.jp.total, 92, isNum(S.jp.y) ? S.jp.y : S.jp.total, 300), word: isNum(S.jp.y) ? '전년 ' + S.jp.y + '일' : '', date: S.jp.m, freq: 'M', note: '민간 ' + S.jp.private + '일 · 국가 ' + S.jp.national + '일' + (isNum(S.jp.y) ? ' · 전년 같은 달 ' + S.jp.y + '일(눈금)' : '')});
  if (S.eu) sc.push({id: 'stock:eu', name: 'EU 의무', val: S.eu.k + '/' + S.eu.N, u: '국 ' + S.eu.min + '일 미만', glyph: gRatio(S.eu.k / S.eu.N * 100, 92, S.eu.k0 ? S.eu.k0.k / S.eu.k0.n * 100 : 0, 100), word: S.eu.k0 ? '1년 전 ' + S.eu.k0.k + '/' + S.eu.k0.n : '', date: S.eu.mto, freq: 'M'});
  for (const [cc, nm] of [['KR', '한국'], ['IN', '인도']]) { const j = jodiOf(cc); sc.push(j ? {id: 'stock:' + cc, name: nm + ' 원유', val: mb(j.v), u: '백만 배럴', glyph: j.bp ? strip(j.bp, 92, 12) : '', word: j.bp ? j.bp.pos : '', date: j.m, freq: 'M', note: 'JODI 월말 · 같은 달 범위'} : {id: 'stock:' + cc, name: nm + ' 원유', miss: true, why: 'JODI 미보고'}); }
  sc.push({id: 'stock:CN', name: '중국 원유', miss: true, why: '미보고 · JODI 재고 없음'});
  R.push({id: 'stock', name: '비축', sub: '정책·의무 재고', sum: sc.filter(x => !x.miss).length + '/' + sc.length, cells: sc});
  const Wd = F.world || {}; const wc = [];
  const mcell = (id, name, s, unit, dg, zero, note) => s ? {id, name, val: f(s.v, dg), u: unit, glyph: gMon(s, 92, zero), word: isNum(s.y) ? '전년 ' + f(s.y, dg) : '', date: s.m, freq: 'M', note} : {id, name, miss: true, why: '수집 전 · STEO'};
  wc.push(mcell('world:draw', '세계 순인출', Wd.draw, '백만 b/d', 2, true, '+ 인출 · − 축적 · 점선 EIA 전망'));
  wc.push(Wd.oecd ? {id: 'world:oecd', name: 'OECD 재고', val: mb(Wd.oecd.v), u: '백만 배럴', glyph: Wd.oecd.pos ? strip(Wd.oecd.pos, 92, 12) : gMon(Wd.oecd, 92), word: Wd.oecd.pos ? '같은 달 ' + String(Wd.oecd.by[0]).slice(2) + '–' + String(Wd.oecd.by[1]).slice(2) + ' ' + Wd.oecd.pos.pos : '', date: Wd.oecd.m, freq: 'M', note: '월말 · STEO 표 3a'} : {id: 'world:oecd', name: 'OECD 재고', miss: true, why: '수집 전 · STEO 표 3a'});
  wc.push(mcell('world:spare', 'OPEC 잉여', Wd.spare, '백만 b/d', 2, false, 'STEO 표 3d'));
  wc.push(mcell('world:outages', 'OPEC 차질', Wd.outages, '백만 b/d', 2, false, 'STEO 표 3d'));
  const rs = c7 && c7.rows && c7.rows[0]; wc.push(rs && isNum(rs.value) ? {id: 'world:refspare', name: '미국 정제 여유', val: f(rs.value, 0), u: '천 b/d', glyph: K.spark(((c7.tabs.find(t => t.id === 'm8') || {vis: {}}).vis.spareCur || []).map((v, i) => [i, v]).filter(p => isNum(p[1])), 92, 20), word: '⑦', date: rs.date} : {id: 'world:refspare', name: '미국 정제 여유', miss: true, why: '⑦ 미수집'});
  wc.push(Wd.duc ? {id: 'world:duc', name: 'DUC 유정', val: f(Wd.duc.v, 0), u: '개', glyph: gMon({...Wd.duc, m: Wd.duc.m}, 92), word: isNum(Wd.duc.y) ? '전년 ' + f(Wd.duc.y, 0) : '', date: Wd.duc.m, freq: 'M', note: 'STEO 표 10a · 지역 합'} : {id: 'world:duc', name: 'DUC 유정', miss: true, why: '수집 전'});
  wc.push(Wd.hdd && Wd.hddN ? {id: 'world:hdd', name: '난방도일', val: f(Wd.hdd.v, 0), u: '도일', glyph: gRatio(Wd.hdd.v / (Wd.hddN.v || 1) * 100, 92, 100, 200), word: '평년의 ' + f(Wd.hdd.v / (Wd.hddN.v || 1) * 100, 0) + '%', date: Wd.hdd.m, freq: 'M', note: '직전 10년 같은 달 ' + f(Wd.hddN.v, 0)} : {id: 'world:hdd', name: '난방도일', miss: true, why: '수집 전 · STEO 표 9c'});
  R.push({id: 'world', name: '세계 균형·여유능력', sub: 'STEO ' + (Wd.ed ? M.fdate(Wd.ed, 'M') + '판 ' : '') + '추정·실적 · 점선 전망', sum: wc.filter(x => !x.miss).length + '/' + wc.length, cells: wc});
  return R;
}
function renderStockEx() {
  const box = $('#mw-canvas'); const R = stockRows(); const sx = state.sx;
  const all = R.flatMap(r => r.cells); if (!all.some(c => c.id === sx.cell && !c.miss)) sx.cell = (all.find(c => !c.miss) || {}).id;
  const head = `<div class="xh"><div class="xf"><span class="xf-l">면</span>${R.map(r => `<a class="xb" href="#mw-mx-${r.id}" data-jump="${r.id}" title="${esc(r.sum || '')}">${esc(r.name)}</a>`).join('')}</div></div>`;
  const mx = `<div class="mx">${R.map(r => `<div class="mxr" id="mw-mx-${r.id}"><div class="mxh"><b>${esc(r.name)}</b><small>${esc(r.sub)}</small><em>${esc(r.sum || '')}</em></div><div class="mxcs">${r.cells.map(c => mxCell(r.ru && c.u === r.ru ? {...c, u: ''} : c, sx.cell)).join('')}</div></div>`).join('')}</div>`;
  box.innerHTML = `${head}<div class="xg one"><div class="xmap xmat" id="mw-xmap"><div class="scalw"></div>${mx}</div></div><div class="xb3"><section class="xp" id="mw-xp1"></section><section class="xp" id="mw-xp2"></section><section class="xp" id="mw-xp3"></section></div>`;
  const sw = box.querySelector('.scalw'); sw.innerHTML = seasonCal(Math.max(320, sw.clientWidth - 4));
  box.querySelectorAll('[data-cell]').forEach(b => b.onclick = () => { sx.cell = b.dataset.cell; box.querySelectorAll('.mxc.on').forEach(e => e.classList.remove('on')); b.classList.add('on'); stockPanels(); });
  box.querySelectorAll('[data-jump]').forEach(a => a.onclick = ev => { ev.preventDefault(); const t = box.querySelector('#mw-mx-' + a.dataset.jump); if (t) t.scrollIntoView({block: 'nearest'}); });
  stockPanels(); showCell(box, sx.cell);
}
/* 행렬 칸 한 개: 이름, 값, 기준 그림, 위치 낱말. 미수집 칸은 빗금과 사유 */
function mxCell(c, on) {
  return c.miss ? `<button class="mxc miss" disabled title="${esc(c.name + ' · ' + (c.why || '미수집'))}"><span class="mxn">${esc(c.name)}</span><span class="hatchbar">${esc(c.why || '미수집')}</span></button>`
    : `<button class="mxc${on === c.id ? ' on' : ''}" data-cell="${esc(c.id)}" title="${esc(c.name + ' · ' + (c.val || '') + ' ' + (c.u || '') + ' · ' + M.fdate(c.date, c.freq) + (c.note ? ' · ' + c.note : '') + (c.word ? ' · ' + c.word : ''))}"><span class="mxt"><span class="mxn">${esc(c.name)}${c.tag ? ` <em>${esc(c.tag)}</em>` : ''}</span><span class="mxv"><b class="num">${esc(c.val)}</b><small>${esc(c.u || '')}</small><span class="mxw">${esc(c.word || '')}</span></span></span><span class="mxg">${c.glyph || ''}</span></button>`;
}
/* 고른 칸이 행렬 스크롤 밖이면 행렬 안에서만 움직여 보이게 한다 */
function showCell(box, id) {
  const sc = box.querySelector('.xmat'); if (!sc || !id) return; const el = [...box.querySelectorAll('[data-cell]')].find(e => e.dataset.cell === id); if (!el) return;
  const a = el.getBoundingClientRect(), b = sc.getBoundingClientRect(); if (a.top < b.top || a.bottom > b.bottom) sc.scrollTop += a.top - b.top - Math.max(0, (b.height - a.height) / 2);
}
function stockPanels(cell) {
  const p1 = $('#mw-xp1'), p2 = $('#mw-xp2'), p3 = $('#mw-xp3'); const PW = Math.max(150, p1.clientWidth - 16), PH = 112;
  const [kind, key] = String(cell || state.sx.cell || '').split(':'); const F = chk('c5').facets || {}; const W0 = UW(); const U = input.live.supply || {};
  const wb = (o, scale, title, sub) => { if (!o || !o.band) return `<h4>${esc(title)}</h4><p class="miss">미수집</p>`; const r = weekBandChart(o, PW, PH, scale); return `<h4>${esc(title)} <small>${esc(sub || '')}</small></h4>${r.svg}<p class="xk">${r.key}</p>`; };
  const STK = {crude: 'crude_stocks', gasoline: 'gasoline_stocks', distillate: 'distillate_stocks', jet: 'jet_stocks', propane: 'propane_stocks', resid: 'resid_stocks'};
  const DEM = {crude: 'crude_runs', gasoline: 'gasoline_demand', distillate: 'distillate_demand', jet: 'jet_demand', propane: 'propane_demand', total: 'total_demand'};
  const COV = {gasoline: 'gasoline_days', distillate: 'distillate_days', jet: 'jet_days', propane: 'propane_days'};
  const NM = {crude: '원유', gasoline: '휘발유', distillate: '중간유분', jet: '항공유', propane: '프로판', resid: '중유', total: '석유제품 합계'};
  const monLines = (sers, opt) => multiLine(sers, PW, PH, opt || {});
  const split = s => s ? [{pts: s.hist.slice(-36), cls: 'l-a'}, {pts: s.fcst.length ? [s.hist[s.hist.length - 1]].concat(s.fcst) : [], cls: 'l-f'}] : [];
  if (kind === 'demand' && key === 'total') {
    /* 합계 수요: 제품 합계 · 원유 정제 투입 · 날씨(난방·냉방도일과 직전 10년 평균, STEO 월간) */
    const wd = F.world || {};
    p1.innerHTML = wb(W0.total_demand, 1, '석유제품 합계 수요', '천 b/d · 4주 평균 · 같은 주 범위');
    p2.innerHTML = wb(W0.crude_runs, 1, '원유 정제 투입', '천 b/d · 4주 평균 · 같은 주 범위');
    p3.innerHTML = wd.hdd && wd.hddN ? `<h4>미국 난방·냉방도일 <small>월 · 실선 STEO 추정·실적 · 점선 EIA 전망 · 회색 = 직전 10년 평균</small></h4>${monLines(split(wd.hdd).concat([{pts: wd.hddN.pts.slice(-36), cls: 'l-u'}], wd.cdd ? [{pts: wd.cdd.hist.slice(-36), cls: 'l-e'}] : []), {dg: 0})}${keyLine([['k-a', '난방도일'], ['k-u', '난방 평년'], ['k-e', '냉방도일']])}` : '<h4>난방·냉방도일</h4><p class="miss">미수집 · STEO 표 9c</p>';
    return;
  }
  if (['level', 'cover', 'demand', 'path'].includes(kind)) {
    const p = key; const so = W0[STK[p]], dm = W0[DEM[p]];
    p1.innerHTML = so ? wb(so, 1000, NM[p] + ' 재고', '백만 배럴 · 같은 주 범위') : wb(dm, 1, NM[p] + ' 수요', '천 b/d 4주 평균');
    p2.innerHTML = dm ? wb(dm, 1, NM[p] + (p === 'crude' ? ' 정제 투입' : ' 수요'), '천 b/d · 4주 평균 · 같은 주 범위') : '<h4>수요</h4><p class="miss">미수집 · 품목별 주간 수요 없음</p>';
    const pa = (F.path || []).find(x => x.p === p);
    if (COV[p] && kind === 'cover') p3.innerHTML = wb((U.us_cover || {})[COV[p]], 1, NM[p] + ' 공급일수', '일 · 같은 주 범위');
    else if (pa && isNum(pa.e1)) p3.innerHTML = `<h4>${esc(NM[p])} 13주 경로 <small>백만 배럴 · ${pa.w}주 → ${pa.w13}주</small></h4>${pathChart(so, pa, PW, PH)}`;
    else p3.innerHTML = `<h4>13주 경로</h4><p class="miss">미수집 · ${so && !so.band_next ? '13주 뒤가 다음 해라 다음 해 같은 주 범위(band_next)가 필요하다. 다음 수집부터 들어온다' : '입력 없음'}</p>`;
    return;
  }
  if (kind === 'room') {
    const x = (F.room || []).find(r => r.rg === key) || {}; const o = W0[x.key];
    const den = x.cap * 1000;
    p1.innerHTML = o && o.band && isNum(den) ? (() => { const r = weekBandChart(o, PW, PH, den / 100); return `<h4>${esc(x.name)} 충전률 <small>% · ${esc(x.capBasis)} ${mb(x.cap)}백만 배럴 · ${esc(ym(x.capAsOf))} 기준</small></h4>${r.svg}<p class="xk">${r.key}</p>`; })() : '<h4>충전률</h4><p class="miss">미수집</p>';
    const rooms = (F.room || []).filter(r => isNum(r.fill));
    p2.innerHTML = `<h4>지역별 충전률 <small>% · 띠 = 같은 주 ${esc(((x.by || [])[0] || '') + '–' + String((x.by || [])[1] || '').slice(2))} 범위 · 눈금 = 전년 같은 주</small></h4><ul class="rmx">${rooms.map(r => `<li class="${r.rg === key ? 'on' : ''}"><span>${esc(r.name)}</span>${gFill(r, 88)}<b class="num">${f(r.fill, 0)}%</b><small title="${esc('최근 4주 변화 ' + (isNum(r.k4) ? fs(r.k4, 1) + '백만 배럴' : '—') + (r.weeksToFull && r.weeksToFull < 104 ? ' · 이 속도면 ' + f(r.weeksToFull, 0) + '주 뒤 만충' : ''))}">${r.weeksToFull && r.weeksToFull < 104 ? '만충 ' + f(r.weeksToFull, 0) + '주' : isNum(r.k4) ? fs(r.k4, 1) : ''}</small></li>`).join('')}</ul><p class="xk">끝 칸 = 최근 4주 변화(백만 배럴) · 만충 = 남은 공간 ÷ 최근 4주 평균 증가(속도 불변 가정, 2년 안일 때만)</p>`;
    const tw = (input.live.term || {}).wti; const sp = tw && tw.rows ? tw.rows.map(r => [r[0], r[2] - r[1]]) : [];
    const capH = ((((U.storage_capacity || {}).regions || {})[key] || {}).working_history || []);
    p3.innerHTML = key === 'Cushing' || key === 'US' || key === 'PADD 2' ? `<h4>WTI 차월 − 근월 <small>달러/배럴 · 0 위 = 콘탱고 · 저장 보유 유인(교재 18장) · ${sp.length}일</small></h4>${sp.length > 2 ? multiLine([{pts: sp, cls: 'l-a'}], PW, PH, {ref: 0, dg: 1}) : '<p class="miss">미수집</p>'}`
      : `<h4>${esc(x.name)} 작업 저장능력 이력 <small>백만 배럴 · EIA 보고서 ${esc(ym((U.storage_capacity || {}).as_of))} 자료 뒤 중단</small></h4>${capH.length > 1 ? multiLine([{pts: capH.map(([m, v]) => [m, v / 1000]), cls: 'l-u'}], PW, PH, {dg: 0}) : '<p class="miss">미수집</p>'}`;
    return;
  }
  if (kind === 'stock') {
    const S = F.stockpile || {}; const wd = F.world || {};
    if (key === 'spr' || key === 'KR' || key === 'IN') {
      p1.innerHTML = key === 'spr' ? wb(W0.spr, 1000, '미국 SPR 주간', '백만 배럴 · 같은 주 범위는 정책 재고라 참고만') : (() => { const o = ((((U.jodi || {}).data || {})[key] || {}).CRUDEOIL || {}).CLOSTLV; return o ? `<h4>${key === 'KR' ? '한국' : '인도'} 원유 월말 재고 <small>천 배럴 · 같은 달 ${esc((U.jodi.band_years || []).join('–'))} 범위 · JODI</small></h4>${bandMonths(o, PW, PH)}` : '<p class="miss">미보고</p>'; })();
    } else if (key === 'jp' && S.jp) {
      const rows = S.jp.rows.slice(-24); p1.innerHTML = `<h4>일본 비축 일수 <small>일 · 민간·국가·산유국 공동 · ${esc(M.fdate(rows[0].month, 'M'))}~${esc(M.fdate(rows[rows.length - 1].month, 'M'))}</small></h4>${multiLine([{pts: rows.map(r => [r.month, r.total]), cls: 'l-a'}, {pts: rows.map(r => [r.month, r.national]), cls: 'l-e'}, {pts: rows.map(r => [r.month, r.private]), cls: 'l-u'}], PW, PH, {ref: S.jp.obligation, dg: 0})}${keyLine([['k-a', '합계'], ['k-e', '국가'], ['k-u', '민간'], ['', '점선 = 민간 의무 ' + S.jp.obligation + '일']])}`;
    } else if (key === 'eu' && S.eu) {
      const lst = S.eu.list.slice(0, 14); const mx = Math.max(...lst.map(x => x.p[1]), S.eu.min);
      p1.innerHTML = `<h4>EU 의무 비축 낮은 순 <small>일 · 눈금 = ${S.eu.min}일 · 국가별 최신 달</small></h4><ul class="rmx">${lst.map(x => `<li><span>${esc(x.name)}</span>${svgW(88, 14, `<rect class="gf-t" x="2" y="4" width="84" height="6"/><rect class="gf-v" x="2" y="5" width="${84 * x.p[1] / mx}" height="4"/><line class="gf-y" x1="${2 + 84 * S.eu.min / mx}" x2="${2 + 84 * S.eu.min / mx}" y1="1" y2="13"/>`)}<b class="num">${f(x.p[1], 0)}</b><small>${esc(M.fdate(x.p[0], 'M'))}</small></li>`).join('')}</ul>`;
    } else p1.innerHTML = '<p class="miss">미수집</p>';
    const sp = wd.sprPath; const cap = S.spr && S.spr.cap;
    p2.innerHTML = sp ? `<h4>미국 SPR 월말 <small>백만 배럴 · 실선 STEO 추정·실적 · 점선 EIA 전망(STEO ${esc(M.fdate(wd.ed, 'M'))}) · 기준선 = 작업 저장능력 ${mb(cap)}(${esc(ym(S.spr && S.spr.capAsOf))})</small></h4>${monLines(split(sp), {ref: cap, dg: 0})}` : '<h4>SPR 경로</h4><p class="miss">미수집 · STEO 표 4a</p>';
    const st = S.strategic; p3.innerHTML = st ? `<h4>전략 재고 변화 4Q25 → 2Q26 <small>백만 배럴 · EIA ${esc(M.fdate(st.published))} 공개 추정</small></h4><ul class="rmx">${st.rows.map(r => { const d = r.s2 - r.s0, m = Math.max(...st.rows.map(z => Math.abs(z.s2 - z.s0))) || 1, Wb = 88; return `<li><span>${esc(r.name)}</span>${svgW(Wb, 14, `<line class="gm-z" x1="${Wb / 2}" x2="${Wb / 2}" y1="0" y2="14"/><rect class="${d < 0 ? 'gb-n' : 'gb-p'}" x="${d < 0 ? Wb / 2 - Wb / 2 * Math.abs(d) / m : Wb / 2}" y="3" width="${Wb / 2 * Math.abs(d) / m}" height="8"/>`)}<b class="num">${fs(d, 0)}</b><small>${f(r.s2, 0)}</small></li>`; }).join('')}</ul>` : '<p class="miss">참조 자료 없음</p>';
    return;
  }
  if (kind === 'world') {
    const wd = F.world || {};
    const pair = {draw: [['draw', '세계 재고 순인출', '백만 b/d · + 인출 · − 축적', true], ['oecd', 'OECD 상업 재고', '백만 배럴', false]], spare: [['spare', 'OPEC 잉여 원유 생산능력', '백만 b/d', false], ['outages', 'OPEC 비계획 차질', '백만 b/d', false]], outages: [['outages', 'OPEC 비계획 차질', '백만 b/d', false], ['capacity', 'OPEC 원유 생산능력', '백만 b/d', false]], hdd: [['hdd', '미국 난방도일', '도일 · 회색 = 직전 10년 평균', false], ['cdd', '미국 냉방도일', '도일 · 회색 = 직전 10년 평균', false]], duc: [['duc', '미완결 유정(DUC) 지역 합', '개 · STEO 표 10a', false], ['spare', 'OPEC 잉여 원유 생산능력', '백만 b/d', false]], refspare: [['spare', 'OPEC 잉여 원유 생산능력', '백만 b/d', false], ['outages', 'OPEC 비계획 차질', '백만 b/d', false]]}[key] || [];
    const draw = ([k, t, sub, zero], el) => { const s = wd[k]; if (!s) { el.innerHTML = `<h4>${esc(t)}</h4><p class="miss">미수집</p>`; return; } const extra = k === 'hdd' && wd.hddN ? [{pts: wd.hddN.pts.slice(-36), cls: 'l-u'}] : k === 'cdd' && wd.cddN ? [{pts: wd.cddN.pts.slice(-36), cls: 'l-u'}] : []; el.innerHTML = `<h4>${esc(t)} <small>${esc(sub)} · 실선 STEO 추정·실적 · 점선 EIA 전망</small></h4>${monLines(s.hist ? split(s).concat(extra) : [{pts: s.pts, cls: 'l-a'}], {ref: zero ? 0 : undefined, dg: Math.abs(s.v) >= 100 ? 0 : 1})}`; };
    if (key === 'refspare') { const c7 = chk('c7'); const t = c7.tabs.find(x => x.id === 'm8'); p1.innerHTML = t ? `<h4>미국 정제 여유능력 <small>천 b/d · 능력 − 총투입 · 주 · ⑦</small></h4>${K.calband({x: 'week', band: [], noBand: true, cur: t.vis.spareCur, prev: t.vis.sparePrev, curLabel: '올해', prevLabel: '전년'}, PW, PH)}` : '<p class="miss">미수집</p>'; }
    else draw(pair[0] || ['draw', '세계 재고 순인출', '', true], p1);
    draw(pair[1] || ['oecd', 'OECD 상업 재고', '', false], p2);
    const sv = wd.supply, cs = wd.consumption;
    p3.innerHTML = sv && cs ? `<h4>세계 생산 · 소비 <small>백만 b/d · STEO · 면 = 차(재고 증감)</small></h4>${multiLine([{pts: sv.pts.slice(-36), cls: 'l-a'}, {pts: cs.pts.slice(-36), cls: 'l-e'}], PW, PH, {fill: [0, 1], dg: 0})}${keyLine([['k-a', '생산'], ['k-e', '소비']])}` : '<h4>세계 생산·소비</h4><p class="miss">미수집 · STEO 표 3a</p>';
  }
}
/* ② 사용량: 행 = 면(세계·지역 소비 → 미국 주간 제품 공급 → 국가별 수요 → 비축 수요 → 맥락), 칸 = 지역·품목.
 * 미국 주간 수요·비축·여유능력·충전률 칸은 ⑤의 칸을 그대로 쓰고, 누르면 ⑤와 같은 그림이 열린다 */
const STEO_M = U0 => 'STEO ' + (U0.ed ? M.fdate(U0.ed, 'M') + '판' : '') + ' · ' + (U0.lh ? M.fdate(U0.lh, 'M') : '') + ' 추정·실적';
function useRows() {
  const U0 = chk('c2').usage || {}; const R5 = stockRows(); const r5 = id => (R5.find(r => r.id === id) || {cells: []}).cells;
  const R = [];
  const reg = (U0.regions || []).filter(r => r.key !== 'demand_ust' && r.key !== 'demand_nonoecd_europe');
  R.push({id: 'world', name: '세계·지역 소비', ru: '백만 b/d', sub: '백만 b/d · ' + STEO_M(U0) + ' · 표 3a · 실선 STEO 추정·실적 · 점선 EIA 전망',
    sum: '지역 ' + reg.filter(r => !r.miss && r.grp !== 'all' && r.grp !== 'agg' && isNum(r.r) && r.r < 100).length + '/' + reg.filter(r => !r.miss && r.grp !== 'all' && r.grp !== 'agg').length + '곳 전년 아래',
    cells: reg.map(r => r.miss ? {id: 'use:' + r.key, name: r.name, miss: true, why: '수집 전 · STEO 표 3a'} : {id: 'use:' + r.key, name: r.name, val: f(r.v, r.v >= 10 ? 1 : 2), u: '백만 b/d', glyph: gMon(r, 92), word: '전년의 ' + f(r.r, 0) + '%', date: r.m, freq: 'M', note: '최근 12개월 평균 ' + f(r.t12, 2) + (isNum(r.rT) ? ' (직전 12개월=100 → ' + f(r.rT, 1) + ')' : '') + (isNum(r.rN) ? ' · 다음 12개월 전망 ' + f(r.n12, 2) : '')})});
  const dR = R5.find(r => r.id === 'demand') || {cells: []};
  R.push({id: 'us', name: '미국 제품 공급', ru: '백만 b/d', sub: '백만 b/d · 주간 4주 평균 · 띠 = 같은 주 5년 범위 · ⑤와 같은 칸', sum: dR.sum || '', cells: dR.cells});
  const J = U0.jodi || []; const top = J.slice(0, 12); const jby = U0.jby ? U0.jby[0] + '–' + String(U0.jby[1]).slice(2) : '';
  const cnt = {}; J.forEach(j => { cnt[j.bp.pos] = (cnt[j.bp.pos] || 0) + 1; });
  R.push({id: 'jodi', name: '국가별 수요', ru: '백만 b/d', sub: '백만 b/d · JODI 제품 합계 · 같은 달 ' + jby + ' 범위 · 큰 순 ' + top.length + '/' + J.length + '개국',
    sum: ['아래', '안', '위'].filter(k => cnt[k]).map(k => k + ' ' + cnt[k]).join(' · '),
    cells: J.length ? top.map(j => ({id: 'jodi:' + j.cc, name: j.name, tag: j.behind >= 3 ? M.fdate(j.m, 'M') + ' 자료' : '', val: f(j.v / 1000, 2), u: '백만 b/d', glyph: strip(j.bp, 92, 12), word: j.bp.pos, date: j.m, freq: 'M', note: '같은 달 ' + jby + ' 범위 ' + f(j.band[0] / 1000, 2) + '~' + f(j.band[2] / 1000, 2) + (isNum(j.r) ? ' · 전년=100 → ' + f(j.r, 0) : '') + (j.behind >= 3 ? ' · 최신 달보다 ' + j.behind + '개월 늦은 보고' : '')})) : [{id: 'jodi:none', name: '국가별 수요', miss: true, why: '수집 전 · JODI 수요 범위'}]});
  const sd = U0.sprDraw; const st = (chk('c5').facets || {}).stockpile || {}; const S5 = r5('stock');
  const sdc = sd ? {id: 'use:sprdraw', name: 'SPR 순인출', val: f(sd.v, 2), u: '백만 b/d', glyph: gMon(sd, 92, true), word: sd.v < 0 ? '축적' : sd.v > 0 ? '방출' : '0', date: sd.m, freq: 'M', note: '+ 방출 · − 축적(재매입) · 점선 EIA 전망 · STEO 표 4a'} : {id: 'use:sprdraw', name: 'SPR 순인출', miss: true, why: '수집 전 · STEO 표 4a'};
  const sg = st.strategic; const sgd = sg ? sg.rows.map(r => r.s2 - r.s0) : [];
  const sgGlyph = () => { const Wb = 92, mx = Math.max(...sgd.map(Math.abs)) || 1, bw = (Wb - 4) / sgd.length; return svgW(Wb, 14, '<line class="gm-z" x1="2" x2="' + (Wb - 2) + '" y1="7" y2="7"/>' + sgd.map((d, i) => '<rect class="' + (d < 0 ? 'gb-n' : 'gb-p') + '" x="' + (2 + i * bw) + '" y="' + (d < 0 ? 7 : 7 - 6 * Math.abs(d) / mx) + '" width="' + Math.max(1, bw - 1) + '" height="' + Math.max(0.5, 6 * Math.abs(d) / mx) + '"/>').join('')); };
  const sgc = sg ? {id: 'use:strategic', name: '전략 재고 (추정)', val: fs(sgd.reduce((a, b) => a + b, 0), 0), u: '백만 배럴', glyph: sgGlyph(), word: sg.columns[1] + '→' + sg.columns[3], date: sg.published, note: 'EIA 공개 추정 · ' + sg.rows.length + '개국·권역 합 · 막대 = 국가별 변화'} : {id: 'use:strategic', name: '전략 재고 (추정)', miss: true, why: '참조 자료 없음'};
  R.push({id: 'stock', name: '비축 수요', sub: 'SPR 순인출·재매입 경로, 정책 재고, 국가 전략 재고(추정)', sum: '', cells: [sdc].concat(S5.filter(c => ['stock:spr', 'stock:jp', 'stock:eu'].includes(c.id)), [sgc], S5.filter(c => c.id === 'stock:CN'))});
  const W5 = r5('world'), RM = r5('room'); const pick = (a, id) => a.find(c => c.id === id);
  R.push({id: 'ctx', name: '맥락', sub: 'OPEC 잉여·차질(STEO 표 3d) · 저장 여유(EIA 저장능력 2024-03 기준, 보고서 중단)', sum: '', cells: [pick(W5, 'world:spare'), pick(W5, 'world:outages'), pick(W5, 'world:draw'), pick(RM, 'room:US'), pick(RM, 'room:Cushing')].filter(Boolean)});
  return R;
}
function renderUseEx() {
  const box = $('#mw-canvas'); const R = useRows(); const ux = state.ux;
  const all = R.flatMap(r => r.cells); if (!all.some(c => c.id === ux.cell && !c.miss)) ux.cell = (all.find(c => !c.miss) || {}).id;
  const head = `<div class="xh"><div class="xf"><span class="xf-l">면</span>${R.map(r => `<a class="xb" href="#mw-mx-${r.id}" data-jump="${r.id}" title="${esc(r.sum || '')}">${esc(r.name)}</a>`).join('')}</div></div>`;
  const mx = `<div class="mx">${R.map(r => `<div class="mxr" id="mw-mx-${r.id}"><div class="mxh"><b>${esc(r.name)}</b><small>${esc(r.sub)}</small><em>${esc(r.sum || '')}</em></div><div class="mxcs">${r.cells.map(c => mxCell(r.ru && c.u === r.ru ? {...c, u: ''} : c, ux.cell)).join('')}</div></div>`).join('')}</div>`;
  box.innerHTML = `${head}<div class="xg one"><div class="xmap xmat" id="mw-xmap"><div class="scalw"></div>${mx}</div></div><div class="xb3"><section class="xp" id="mw-xp1"></section><section class="xp" id="mw-xp2"></section><section class="xp" id="mw-xp3"></section></div>`;
  const sw = box.querySelector('.scalw'); sw.innerHTML = seasonCal(Math.max(320, sw.clientWidth - 4));
  box.querySelectorAll('[data-cell]').forEach(b => b.onclick = () => { ux.cell = b.dataset.cell; box.querySelectorAll('.mxc.on').forEach(e => e.classList.remove('on')); b.classList.add('on'); usePanels(); });
  box.querySelectorAll('[data-jump]').forEach(a => a.onclick = ev => { ev.preventDefault(); const t = box.querySelector('#mw-mx-' + a.dataset.jump); if (t) t.scrollIntoView({block: 'nearest'}); });
  usePanels(); showCell(box, ux.cell);
}
function usePanels() {
  const cell = state.ux.cell || ''; const [kind, key] = cell.split(':');
  if (kind !== 'use' && kind !== 'jodi') return stockPanels(cell);
  const p1 = $('#mw-xp1'), p2 = $('#mw-xp2'), p3 = $('#mw-xp3'); const PW = Math.max(150, p1.clientWidth - 16), PH = 112;
  const U0 = chk('c2').usage || {}; const U = input.live.supply || {};
  const split = s => s ? [{pts: s.hist.slice(-36), cls: 'l-a'}, {pts: s.fcst.length ? [s.hist[s.hist.length - 1]].concat(s.fcst) : [], cls: 'l-f'}] : [];
  /* 막대 목록: 기준(100)에서 값까지, 점 = 값 */
  const refBars = (rows, field, title, sub, onKey) => { const v = rows.filter(r => isNum(r[field])); const lo = Math.min(90, ...v.map(r => r[field])), hi = Math.max(110, ...v.map(r => r[field])); const Wb = 88, sx = u => 2 + (Wb - 4) * (u - lo) / (hi - lo);
    return `<h4>${esc(title)} <small>${esc(sub)}</small></h4><ul class="rmx">${v.map(r => `<li class="${onKey(r) ? 'on' : ''}"><span>${esc(r.name)}</span>${svgW(Wb, 14, `<line class="gf-y" x1="${sx(100)}" x2="${sx(100)}" y1="1" y2="13"/><rect class="gf-v" x="${Math.min(sx(100), sx(r[field]))}" y="5" width="${Math.abs(sx(r[field]) - sx(100))}" height="4"/><circle class="gf-d" cx="${sx(r[field])}" cy="7" r="2.6"/>`)}<b class="num">${f(r[field], 0)}</b><small>${esc(M.fdate(r.m, 'M'))}</small></li>`).join('')}</ul>`; };
  if (kind === 'use' && (key === 'sprdraw' || key === 'strategic')) {
    /* 비축 수요: 순인출 경로(STEO 4a), SPR 월말 경로, 국가 전략 재고 추정(⑤와 같은 그림) */
    stockPanels('stock:spr');
    const sd = U0.sprDraw;
    p1.innerHTML = sd ? `<h4>미국 SPR 순인출 <small>백만 b/d · + 방출 · − 축적(재매입) · 실선 STEO 추정·실적 · 점선 EIA 전망(STEO ${esc(M.fdate(U0.ed, 'M'))})</small></h4>${multiLine(split(sd), PW, PH, {ref: 0, dg: 1})}` : '<h4>SPR 순인출</h4><p class="miss">미수집 · STEO 표 4a</p>';
    return;
  }
  if (kind === 'use') {
    const r = (U0.regions || []).find(x => x.key === key); const regs = (U0.regions || []).filter(x => !x.miss && x.grp !== 'all' && x.grp !== 'agg' && x.key !== 'demand_ust');
    if (!r || r.miss) { p1.innerHTML = '<p class="miss">미수집</p>'; return; }
    const prevYear = r.pts.map(([m]) => [m, (r.pts.find(x => x[0] === addM(m, -12)) || [])[1]]).filter(x => isNum(x[1])).slice(-36);
    p1.innerHTML = `<h4>${esc(r.name)} 석유 소비 <small>백만 b/d · 월 · 실선 STEO 추정·실적 · 점선 EIA 전망 · 회색 = 12개월 전 같은 달</small></h4>${multiLine(split(r).concat([{pts: prevYear, cls: 'l-u'}]), PW, PH, {dg: r.v >= 10 ? 0 : 1})}${keyLine([['k-a', 'STEO 추정·실적·전망'], ['k-u', '12개월 전']])}`;
    p2.innerHTML = refBars(regs.slice().sort((a, b) => a.r - b.r), 'r', '지역별 · 전년 같은 달 = 100', STEO_M(U0) + ' · 낮은 순', x => x.key === key);
    p3.innerHTML = refBars(regs.filter(x => isNum(x.rN)).sort((a, b) => a.rN - b.rN).map(x => ({...x, m: addM(U0.lh, 12)})), 'rN', '다음 12개월 EIA 전망 · 최근 12개월 = 100', 'STEO 전망 · 날짜 = 전망 끝 달', x => x.key === key);
    return;
  }
  /* 국가: JODI 제품 합계 수요(같은 달 범위), 국가별 위치, 그 나라 제품별 전년 같은 달 = 100 */
  const JD = (U.jodi || {}).data || {}; const e = ((JD[key] || {}).TOTPRODS || {}).TOTDEMO; const j = (U0.jodi || []).find(x => x.cc === key); const nm = j ? j.name : key;
  p1.innerHTML = e ? `<h4>${esc(nm)} 석유 수요 <small>천 b/d · 월 · 같은 달 ${esc((U.jodi.band_years || []).join('–'))} 범위 · JODI 제품 합계</small></h4>${bandMonths(e, PW, PH)}` : '<p class="miss">미보고</p>';
  const J = U0.jodi || [];
  p2.innerHTML = `<h4>국가별 같은 달 범위 안 위치 <small>${J.length}개국 · 큰 순 · 띠 = 범위 · 점 = 최신 달 · 백만 b/d</small></h4><ul class="rmx">${J.map(x => `<li class="${x.cc === key ? 'on' : ''}"><span>${esc(x.name)}</span>${strip(x.bp, 88, 12)}<b class="num">${f(x.v / 1000, 2)}</b><small>${esc(M.fdate(x.m, 'M'))}</small></li>`).join('')}</ul>`;
  const P = JD[key] || {}; const PN = (U.jodi || {}).products || {};
  const prows = ['GASOLINE', 'GASDIES', 'JETKERO', 'KEROSENE', 'LPG', 'NAPHTHA', 'RESFUEL'].map(pr => { const d = P[pr] && P[pr].TOTDEMO; if (!d || !d.last) return null; const i = +d.last[0].slice(5, 7) - 1; const a = d.cur[i], b = d.prev[i]; return isNum(a) && isNum(b) && b > 0 ? {key: pr, name: PN[pr] || pr, r: a / b * 100, m: d.last[0]} : null; }).filter(Boolean);
  const pr2 = prows.filter(x => !(x.key === 'KEROSENE' && prows.some(y => y.key === 'JETKERO')));
  p3.innerHTML = pr2.length ? refBars(pr2, 'r', nm + ' 제품별 수요 · 전년 같은 달 = 100', 'JODI · 최신 달', () => false) : '<h4>제품별 수요</h4><p class="miss">미보고</p>';
}
function pathChart(o, pa, W, H) {
  /* 지금 주 → 13주 뒤(날짜로 7일씩): 같은 주 범위(띠, 해를 넘으면 다음 해 범위), 평년 평균 경로, 전년 같은 13주 경로를 지금 값에서 출발시켜 겹친다 */
  if (!o || !o.band) return '<p class="miss">미수집</p>';
  const DAYMS = 864e5, t0 = M.tOf(o.last.date);
  const wk = t => { const d = new Date(t), y = d.getUTCFullYear(); return {y, w: Math.floor((t - Date.UTC(y, 0, 1)) / DAYMS / 7) + 1}; };
  const bandOf = ({y, w}) => y === o.year ? o.band[w - 1] : (() => { const n = (o.band_next || []).find(x => x[0] === w); return n && y === o.year + 1 ? [n[1], n[2], n[3]] : null; })();
  const look = ({y, w}) => { const arr = y === o.year ? o.cur : y === o.year - 1 ? o.prev : null; const h = arr && arr.find(x => x[0] === w); return h && isNum(h[1]) ? h[1] : null; };
  const steps = Array.from({length: 14}, (_, k) => ({now: wk(t0 + 7 * k * DAYMS), ly: wk(t0 - 364 * DAYMS + 7 * k * DAYMS)}));
  const band = steps.map(s => bandOf(s.now)); const ly0 = look(steps[0].ly);
  const prevPath = steps.map(s => { const v = look(s.ly); return isNum(v) && isNum(ly0) ? pa.cur + (v - ly0) : null; });
  const normPath = band.map(b => b && band[0] ? pa.cur + (b[1] - band[0][1]) : null);
  const pad = {l: 34, r: 60, t: 6, b: 16};
  const all = band.flatMap(b => b ? [b[0], b[2]] : []).concat(prevPath, normPath).filter(isNum).map(v => v / 1000);
  const yd = K.ext(all, 0.06); const x = K.sc([0, 13], [pad.l, W - pad.r]), y = K.sc(yd, [H - pad.b, pad.t]);
  let g = axisY(y, yd[0], yd[1], pad.l, W - pad.r, 3, 0);
  const up = band.map((b, k) => b && [x(k), y(b[2] / 1000)]).filter(Boolean), dn = band.map((b, k) => b && [x(k), y(b[0] / 1000)]).filter(Boolean);
  if (up.length > 1) g += `<path class="cband" d="M${up.map(p => p.join(',')).join('L')}L${dn.reverse().map(p => p.join(',')).join('L')}Z"/>`;
  const yb = steps.findIndex(s => s.now.y !== o.year); if (yb > 0) g += `<line class="cg" x1="${x(yb)}" x2="${x(yb)}" y1="${pad.t}" y2="${H - pad.b}"/>`;
  g += `<path class="ccur dash" d="${K.segPaths(normPath.map((v, k) => isNum(v) ? [x(k), y(v / 1000)] : null))}"/><path class="cprev" d="${K.segPaths(prevPath.map((v, k) => isNum(v) ? [x(k), y(v / 1000)] : null))}"/>`;
  g += `<circle class="cdot" cx="${x(0)}" cy="${y(pa.cur / 1000)}" r="3"/>`;
  const ends = [[pa.e1, '평년 ' + f(pa.e1 / 1000, 1)], [pa.e2, '전년 ' + f(pa.e2 / 1000, 1)]].filter(e => isNum(e[0])).map(e => [y(e[0] / 1000), e[1]]).sort((p, q) => p[0] - q[0]); if (ends.length === 2 && ends[1][0] - ends[0][0] < 11) ends[1][0] = ends[0][0] + 11;
  ends.forEach(e => g += `<text class="ca" x="${W - pad.r + 4}" y="${e[0] + 3}">${esc(e[1])}</text>`);
  [0, 13].forEach(k => g += `<text class="ca" x="${x(k)}" y="${H - 3}" text-anchor="middle">${steps[k].now.y !== o.year ? String(steps[k].now.y).slice(2) + '년 ' : ''}${steps[k].now.w}주</text>`);
  const yy = a => a ? String(a[0]).slice(2) + '–' + String(a[1]).slice(2) : '';
  const by = yb > 0 && o.band_next_years ? yy(o.band_years) + '→' + yy(o.band_next_years) : yy(o.band_years);
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${g}</svg><p class="xk" title="세로선 = 해 바뀜. 해를 넘은 주는 다음 해 같은 주의 다섯 해 범위다. 확률이 아닌 조건부 계산이다."><i class="kb"></i>범위 ${esc(by)} <i class="kc"></i>평년 <i class="kp"></i>전년 13주</p>`;
}
const COLCHART = [{c: 'c1', t: '물동량', s: '원유 수출 회복률, 전년 같은 달 = 100'}, {c: 'c5', t: '재고', s: '미국 중간유분 재고, 백만 배럴'}, {c: 'c2', t: '유가', s: '브렌트 현물 월평균, 달러/배럴'}, {c: 'c3', t: '크랙', s: '3-2-1 현물 월평균, 달러/배럴'}, {c: 'c4', t: '소매 연료', s: '경유 소매 월평균, 달러/갤런'}, {c: 'c12', t: '물가', s: 'CPI 종합 3개월 연율, %'}];
const EXVIEW = {c1: 'oil', c2: 'use', c5: 'stock', c7: 'oil', c8: 'oil', c9: 'gas', c10: 'cpi', c12: 'cpi'};
const LANE_OF = n => { const r = (POS[n] || [0, 0])[1]; return r >= 1 && r <= 3 ? 0 : r === 4 ? 1 : r === 5 ? 2 : -1; };
function colChart(i, W, H) {
  const S = input.live.series, U = input.live.supply; const mo = s => (S[s] || {}).monthly || {};
  if (i === 0) return areaChart((primVis('c1').trend || []).map(x => [x.m, x.crude]), W, H, 100, 0, '<i class="ka"></i>회복률 <i class="kr"></i>100');
  if (i === 1) return U.us_weekly.distillate_stocks ? weekBandChart(U.us_weekly.distillate_stocks, W, H, 1000) : null;
  if (i === 2) return areaChart(Object.entries(mo('brent')).sort(), W, H, null, 0, '<i class="ka"></i>2022년 이후');
  if (i === 3) { const r = chk('c3').rows.find(x => x.id === 'c3-321b'); return r && r.mobj ? seasonChart(r.mobj, W, H, 0) : null; }
  if (i === 4) return seasonChart(mo('retail_diesel'), W, H, 1);
  const m = mo('cpi_all'); const ks = Object.keys(m).sort(); return areaChart(ks.slice(3).map((k, j) => [k, (Math.pow(m[k] / m[ks[j]], 4) - 1) * 100]).slice(-46), W, H, 0, 0, '<i class="ka"></i>3개월 연율 <i class="kr"></i>0');
}
function checkView(ch) {
  const box = $('#mw-canvas'); const tabs = ch.tabs.filter(t => !t.priv || !PAGES);
  if (!tabs.length) { box.innerHTML = `<div class="ckv"><p class="pa-q">${esc(ch.q || ch.name)}</p><p class="miss">미수집 · 이 점검의 입력이 payload에 없다</p></div>`; return; }
  if (!state.ctab || !tabs.some(t => t.id === state.ctab)) state.ctab = (tabs.find(t => t.model === 'M3') || tabs.find(t => t.primary) || tabs[0]).id;
  const t = tabs.find(x => x.id === state.ctab); const W = Math.min(680, box.clientWidth - 40);
  box.innerHTML = `<div class="ckv"><p class="pa-q">${esc(ch.q || '')}</p><nav class="tabs">${tabs.map(x => `<button aria-selected="${x.id === state.ctab}" data-ct="${x.id}">${esc(x.label)}<small class="mt">${esc(x.model || '')}</small></button>`).join('')}</nav><div class="ckv-f" style="max-width:${W}px">${vis(t.vis, ch)}</div></div>`;
  box.querySelectorAll('[data-ct]').forEach(b => b.onclick = () => { state.ctab = b.dataset.ct; renderCanvas(); });
}
function crumbBar(ch) {
  const n = model.graph.nodes.find(x => x.check === ch.id); const ln = n ? (LANES[LANE_OF(n.id)] || [''])[0] : '';
  return `<nav class="xcrumb"><button data-back="1">◂ 구조도</button><i>›</i><span>${esc(ln || '전망')}</span><i>›</i><b>${ch.circ} ${esc(ch.name)}</b><span class="xc-n">${EXVIEW[ch.id] ? '여러 면으로 펼친 보기' : '모델 그림'}</span>${deskLinks(ch.id)}</nav>`;
}
function graphBase() {
  const box = $('#mw-canvas'); const G = model.graph; const at = n => POS[n.id] || [n.col, n.row];
  /* 좁은 데스크톱(760~1023px)에서도 캔버스 폭을 넘지 않게: 그림 폭 하한 480 */
  const W = Math.max(480, box.clientWidth), H = Math.max(420, box.clientHeight);
  const laneW = 92, padR = 10, nC = STAGES.length, colW = (W - laneW - padR) / nC, gx = Math.min(30, colW * 0.18), pw = colW - gx, ph = 28;
  /* 아래는 첫 이탈 줄과 범례 자리(레인 이름·노드와 겹치지 않게). 좁은 화면에서 둘 중 하나가 두 줄이 되면
   * 그 높이를 미리 재서 그만큼 비운다(기본 50px = 범례 한 줄 + 첫 이탈 한 줄) */
  const cnt = {}; G.nodes.forEach(n => { const v = nodeV(n); cnt[v] = (cnt[v] || 0) + 1; });
  const legCnt = PAGES ? '' : ['부합', '불일치', '혼재', '보합', '판정 없음', '미수집'].map(v => `<i class="sw ${SCLS[v]}"></i>${v} ${cnt[v] || 0}`).join(' · ');
  const cvHtml = `<div class="cv-h">${model.hope && !PAGES ? `<p class="cv-a">${firstBreak()}</p>` : ''}</div>`, legHtml = `<p class="cv-leg">${PAGES ? '' : '<i class="lg k-h"></i>기대 경로 '}<i class="lg k-c"></i>계산 <i class="lg k-s"></i>표시 <i class="lg k-d"></i>도식 · ${PAGES ? '' : '노드 막대 = ' + (state.axis === 'dir' ? '방향' : '수준') + ' 판정 ' + legCnt + ' · <svg class="lfb" width="8" height="9" aria-hidden="true"><path d="M0,0L8,4.5L0,9Z"/></svg> 첫 이탈(' + (state.axis === 'dir' ? '방향' : '수준') + ') · '}점 = 최근 대장 기록</p>`;
  const probe = h => { const d = document.createElement('div'); d.style.cssText = 'position:absolute;left:0;right:0;top:0;visibility:hidden'; d.innerHTML = h; box.appendChild(d); const e = d.firstElementChild; const hh = e ? e.getBoundingClientRect().height : 0; d.remove(); return hh; };
  const legHt = probe(legHtml), cvhHt = probe(cvHtml), cvhBottom = Math.max(26, Math.ceil(legHt) + 10);
  const chartH = 124, chartTop = 30, gTop = chartTop + chartH + 58, nR = 5, rowH = Math.max(34, (H - gTop - Math.max(50, cvhBottom + Math.ceil(cvhHt) + 2)) / nR);
  const X = c => laneW + (c - 1) * colW, Y = r => gTop + (r - 1) * rowH + (rowH - ph) / 2;
  let g = '';
  LANES.forEach(([ln, r0, r1], i) => { const y0 = gTop + (r0 - 1) * rowH, y1 = gTop + r1 * rowH; g += `<rect class="lane${i % 2 ? ' alt' : ''}" x="0" y="${y0}" width="${W}" height="${y1 - y0}"/><text class="laneh" x="10" y="${(y0 + y1) / 2 + 4}">${esc(ln)}</text>`; });
  /* 열 안내선: 차트 → 노드로 눈이 내려가는 길 */
  STAGES.forEach((s, i) => { const xc = X(i + 1) + pw / 2; g += `<line class="colguide" x1="${xc}" x2="${xc}" y1="${chartTop + chartH + 40}" y2="${gTop - 4}"/><text class="colh" x="${X(i + 1)}" y="${chartTop - 10}">${esc(s)}</text>`; });
  G.edges.forEach(e => {
    const a = nodeOf(e.from), b = nodeOf(e.to); const [ac, ar] = at(a), [bc, br] = at(b);
    const ax = X(ac) + pw, ay = Y(ar) + ph / 2, bx = X(bc), by = Y(br) + ph / 2; let d;
    if (ac === bc) { const x0 = X(ac) + pw / 2; d = ar < br ? `M${x0},${Y(ar) + ph}V${Y(br)}` : `M${x0},${Y(ar)}V${Y(br) + ph}`; }
    else if (ar === br && bc - ac === 1) d = `M${ax},${ay}H${bx}`;
    else if (bc - ac === 1) { const xm = ax + gx / 2; d = `M${ax},${ay}H${xm}V${by}H${bx}`; }
    else { const gut = ar === br ? Y(br) - (rowH - ph) / 2 + 3 : (ar > br ? Y(br) + ph + (rowH - ph) / 2 - 3 : Y(br) - (rowH - ph) / 2 + 3); const x1 = ax + gx / 2, x2 = bx - gx / 2; d = `M${ax},${ay}H${x1}V${gut}H${x2}V${by}H${bx}`; }
    const title = e.id + ' ' + a.name + ' → ' + b.name + ' · ' + e.label + ' · ' + e.kind + (!PAGES && e.test ? ' · ' + e.test : '') + (!PAGES && e.flag ? ' · ' + e.flag : '');
    g += `<path class="ln k-${e.kind}${e.hope && !PAGES ? ' hope' : ''}" data-e="${e.id}" data-from="${e.from}" data-to="${e.to}" d="${d}" marker-end="url(#mw-ah)"/><path class="ln-hit" data-e="${e.id}" d="${d}"><title>${esc(title)}</title></path>`;
  });
  /* 노드: 상태색은 왼쪽 막대에만. 혼재·보합은 낱말로, ⑥~⑪은 대표 숫자 하나(그 점검 kpi 행이 놓인 노드), 첫 이탈 노드에 ▸ */
  const fbNode = (() => { const b = !PAGES && (state.axis === 'dir' ? model.breakDir : model.breakLvl); if (!b) return null; const r = chk(b.id).rows.find(x => x.id === b.row); return r ? r.node : null; })();
  G.nodes.forEach(n => {
    const c = chk(n.check), v = nodeV(n), lens = LENS[state.lens]; const [cc, rr] = at(n);
    const off = lens && !lens.includes(n.id); const fb = n.id === fbNode; const nm0 = n.name; const nm = pw < 104 && nm0.length > 6 ? nm0.slice(0, 6) + '…' : nm0; const tx = fb ? 37 : 26;
    const rep = REP_CHECKS.includes(n.check) && c.kpi && c.kpi.node === n.id && isNum(c.kpi.value) ? REP_NAME[n.check] + ' ' + repVal(c.kpi) : '';
    const word = !PAGES && (v === '혼재' || v === '보합') ? v : '';
    const sub = [word, rep].filter(Boolean).join(' · ');
    /* 좁은 화면에서 상자를 넘을 때 차례로 쓸 짧은 문구(fitSubs): 이름 빼기 → 단위 빼기 → 낱말이나 숫자 하나.
     * 숫자를 중간에서 자르지 않는다. 전체 문구는 title 에 남는다 */
    const rv = rep ? repVal(c.kpi) : '', rn = rv ? (rv.match(/[×$]?[−+-]?[\d,.]+(%|천|만)?/) || [rv])[0] : '';
    const subAlt = rep ? [[word, rv], [word, rn], [word || rn]].map(a => a.filter(Boolean).join(' · ')) : null;
    const ty = sub ? 12 : ph / 2 + 4.5;
    g += `<g class="node pillg ${SCLS[v] || 's-none'}${off ? ' off' : ''}${fb ? ' fb' : ''}" id="mon-${n.id}" data-n="${n.id}" data-c="${n.check}" transform="translate(${X(cc)},${Y(rr)})" tabindex="0"><title>${esc(n.name + ' · ' + c.circ + ' ' + c.name + (PAGES ? '' : ' · 방향 ' + n.dir + ' · 수준 ' + n.lvl) + (fb ? ' · 첫 이탈' : '') + (rep ? ' · ' + c.kpi.label + ' ' + rep + ' ' + fdate(c.kpi.date, c.kpi.freq) : '') + ' · 누르면 펼침')}</title><rect class="pr" width="${pw}" height="${ph}" rx="3"/><rect class="pbar" width="4" height="${ph}" rx="1"/><text class="pc" x="15" y="${ty}" text-anchor="middle">${c.circ}</text>${fb ? `<path class="pfb" d="M26,${ty - 9}L34,${ty - 4.5}L26,${ty}Z"/>` : ''}<text class="pt" x="${tx}" y="${ty}">${esc(nm)}</text>${sub ? `<text class="ps" x="26" y="${ph - 5}"${subAlt ? ` data-alt="${esc(JSON.stringify(subAlt))}"` : ''}>${esc(sub)}</text>` : ''}${n.ev ? `<circle class="evd" cx="${pw - 5}" cy="5" r="2.5"/>` : ''}</g>`;
  });
  const charts = COLCHART.map((cc, i) => { const c = chk(cc.c); return `<button class="cc" data-sel="${cc.c}" style="left:${X(i + 1)}px;top:${chartTop}px;width:${pw}px"><span class="fl-h"><b>${c.circ} ${esc(cc.t)}</b><span class="cc-v">${!isNum(c.kpi.value) ? '' : val(c.kpi) + ' <small>' + fdate(c.kpi.date, c.kpi.freq) + '</small>'}</span></span><span class="fl-s">${esc(cc.s)}</span><span class="fl-c" data-i="${i}"></span><span class="fl-k"></span></button>`; }).join('');
  box.innerHTML = `${cvHtml}<svg class="cv" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="열마다 흐름 차트와 구조도"><defs><marker id="mw-ah" viewBox="0 0 6 6" refX="5.5" refY="3" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0L6,3L0,6Z" class="ahd"/></marker>${HATCH('mw-hatch')}</defs>${g}</svg>${charts}${legHtml}`;
  fitSubs(box, pw - 31);
  const cvh = box.querySelector('.cv-h'); if (cvh) cvh.style.bottom = cvhBottom + 'px';
  box.querySelectorAll('.fl-c').forEach(el => { const r = colChart(+el.dataset.i, Math.max(60, el.clientWidth), Math.max(60, el.clientHeight || 84)); if (r) { el.innerHTML = r.svg; el.nextElementSibling.innerHTML = r.key; thinX(el); } else el.innerHTML = '<span class="miss">미수집</span>'; });
  box.querySelectorAll('.node').forEach(n => { n.onclick = () => select(n.dataset.c); n.onkeydown = e => { if (e.key === 'Enter') select(n.dataset.c); }; n.onmouseenter = () => { state.hover = n.dataset.c; highlight(); }; n.onmouseleave = () => { state.hover = null; highlight(); }; });
  box.querySelectorAll('.cc').forEach(b => { b.onclick = () => select(b.dataset.sel); b.onmouseenter = () => { state.hover = b.dataset.sel; highlight(); }; b.onmouseleave = () => { state.hover = null; highlight(); }; });
  box.querySelectorAll('.ln-hit').forEach(el => el.onclick = () => { const e = model.graph.edges.find(x => x.id === el.dataset.e); const to = nodeOf(e.to).check; state.edge = e.id;
    /* 급변 간선은 도착 점검의 급변 탭을 연다(탐색 보기가 있는 점검은 모델 그림으로) */
    if (e.jump) { state.ctab = 'jump'; if (EXVIEW[to] && state.cmode !== 'model') { state.cmodeBack = state.cmode; state.cmode = 'model'; } }
    select(to, true); });
  box.querySelectorAll('[data-sel].a-break, .cv-a [data-sel]').forEach(a => a.onclick = ev => { ev.preventDefault(); select(a.dataset.sel); });
  highlight();
}
/* 노드 보조 문구가 상자 폭(max)을 넘으면 data-alt 의 짧은 문구를 차례로 쓰고, 그래도 넘으면 끝을 줄임표로 줄인다.
 * 1024px 화면에서 '⑥ BWET 가격 전년 ×31.5' 의 '.5' 가 옆 상자에 가려지던 문제 */
function fitSubs(box, max) {
  box.querySelectorAll('.pillg .pt').forEach(t => { const m = max + 26 - (+t.getAttribute('x') || 26); let s = t.textContent; while (s.length > 1 && t.getComputedTextLength() > m) { s = s.replace(/…$/, '').slice(0, -1); t.textContent = s + '…'; } });
  box.querySelectorAll('.pillg .ps').forEach(t => {
    if (t.getComputedTextLength() <= max) return;
    let alts = []; try { alts = JSON.parse(t.dataset.alt || '[]'); } catch (e) { alts = []; }
    for (const a of alts) { t.textContent = a; if (t.getComputedTextLength() <= max) return; }
    let s = t.textContent; while (s.length > 1 && t.getComputedTextLength() > max) { s = s.slice(0, -1); t.textContent = s + '…'; }
  });
}
function listBase() {
  const fr = model.fresh; const oj = model.oldestJudged || fr.filter(x => isNum(x.age)).sort((a, b) => b.age - a.age)[0];
  const by = {}; model.register.forEach(r => by[r.status] = (by[r.status] || 0) + 1);
  const ch = state.sel && chk(state.sel);
  /* 자료 시점은 '가장 오래된 입력' 한 줄로 접고, 누르면 원천별 목록과 기준이 펼쳐진다 */
  const fopen = !!state.freshOpen;
  $('#mw-list').innerHTML = `<h3 class="hp">자료 시점 <button class="fold" data-fold aria-expanded="${fopen}">${fopen ? '접기' : '원천별 펼치기'}</button></h3>
    ${oj ? `<p class="old1"><i class="fd3">${esc(oj.dot || '')}</i>가장 오래된 입력 <b>${esc(oj.text || oj.src + ' ' + oj.label)}</b> <small>${isNum(oj.age) ? oj.age + '일' : ''}</small></p>` : ''}
    ${fopen ? `<ul class="frl2">${fr.map(x => `<li${x.lag ? ` title="${esc(x.lag + '개월 늦게 발표돼 경과일은 자료 달 ' + x.lag + '개월 뒤 1일부터 센다')}"` : ''}><i class="fd3">${esc(x.dot || '')}</i><span>${esc(x.src)}</span><b class="num">${esc(x.label)}${x.lag ? '*' : ''}</b><small>${x.age}일</small></li>`).join('')}</ul>
    <p class="hp-n">● 신선 ◐ 지연 ○ 오래됨 · 일 ${model.rule.fresh.D.join('/')} · 주 ${model.rule.fresh.W.join('/')} · 월 ${model.rule.fresh.M.join('/')}일 기준</p>` : ''}
    <h3 class="hp">미수집 <small>${model.register.length}개 · 상태별</small></h3><ul class="hist">${Object.entries(by).sort((a, b) => b[1] - a[1]).map(([s, n]) => `<li><span class="hrow static"><i class="sw s-miss"></i><span>${esc(s)}</span><b class="num">${n}</b><span class="hb"><i style="width:${(n / model.register.length * 100).toFixed(0)}%"></i></span></span></li>`).join('')}</ul>
    ${ch ? `<h3 class="hp">${ch.circ} ${esc(ch.name)}의 미수집 <small>${ch.missing.length}</small></h3><ul class="mlist dk">${ch.missing.map(m => `<li><span class="mst">${esc(m.status)}</span>${esc(m.item)}</li>`).join('')}</ul>` : ''}`;
}
const vcol = v => ({'부합': 'var(--s-ok)', '불일치': 'var(--s-no)', '혼재': 'var(--s-mix)', '보합': 'var(--s-flat)'}[v] || 'transparent');
/* 판정 행 추세: 행 값과 같은 단위의 이력(모델 r.arr) 최근 60점. 세 점이 안 되면 그림을 만들지 않고 행에서 칸을 뺀다 */
function rowSpark(r, W, H) {
  const pts = (r.arr || []).filter(p => isNum(p[1])).slice(-60); if (pts.length < 3) return '';
  const ts = pts.map(p => M.tOf(p[0].length === 7 ? p[0] + '-01' : p[0])); const ys = pts.map(p => p[1]);
  /* 끝 점은 W − 6 에 놓는다: 끝 점 고리(반지름 4.6 + 선 0.5)가 칸 너비 안에 들어 옆 칸의 ▲▼·띠에 닿지 않는다 */
  const R = W - 6;
  const x = K.sc([ts[0], ts[ts.length - 1]], [1, R]), y = K.sc(K.ext(ys, 0.1), [H - 2, 2]);
  const d0 = r.delta && r.delta.d0 ? M.tOf(r.delta.d0.length === 7 ? r.delta.d0 + '-01' : r.delta.d0) : null;
  let g = d0 && d0 > ts[0] ? `<rect class="rs-win" x="${x(d0)}" y="0" width="${R - x(d0)}" height="${H}"/>` : '';
  /* 범위 띠는 칸 안쪽만 그린다: 범위가 그림 위·아래 밖에 있으면(⑤ SPR 범위 아래 등) 칸을 덮지 않고 걸친 만큼만 남는다 */
  if (r.pos && r.pos.kind === 'band' && isNum(r.pos.min) && isNum(r.pos.max)) { const a = y(r.pos.max), b = y(r.pos.min); if (isFinite(a) && isFinite(b)) { const t = Math.max(0, Math.min(a, b)), u = Math.min(H, Math.max(a, b)); if (u > t) g += `<rect class="rs-band" x="1" y="${t}" width="${R - 1}" height="${u - t}"/>`; } }
  /* 끝 점이 그린 범위 띠 밖이면 점에 고리를 두른다: 띠 끝에 붙은 값(⑤ 휘발유 재고 0.1px)도 밖인지 보인다.
   * 판단은 그린 끝 점과 그린 띠로 한다(③ 현물 행의 위치는 지난 완결 월 평균이라 최신 주 끝 점과 다르다).
   * 위치 띠의 전년 값(속 빈 원)과 다른 모양이다 */
  const lv = ys[ys.length - 1], lo = r.pos && Math.min(r.pos.min, r.pos.max), hi = r.pos && Math.max(r.pos.min, r.pos.max);
  const outB = r.pos && r.pos.kind === 'band' && isNum(lo) && isNum(hi) && (lv < lo || lv > hi);
  const ex = x(ts[ts.length - 1]), ey = y(lv);
  g += `<path class="rs-l" d="${K.pathOf(pts.map((p, i) => [x(ts[i]), y(p[1])]))}"/><circle class="rs-d" cx="${ex}" cy="${ey}" r="2.4"/>${outB ? `<circle class="rs-o" cx="${ex}" cy="${ey}" r="4.6"/>` : ''}`;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${g}</svg>`;
}
function dirGlyph(r) {
  const d = r.delta ? (isNum(r.delta.abs) ? r.delta.abs : r.delta.pct) : null; const s = Math.sign(d || 0);
  const v = r.dir ? r.dir.v : '—'; const exp = v === '부합' ? s : v === '불일치' ? -s : 0;
  const ar = k => k > 0 ? '▲' : k < 0 ? '▼' : '·';
  if (r.delta && r.delta.roll) return `<span class="dg" title="만기 교체 · 방향 판정 없음"><i class="dg-e">${ar(exp)}</i><i class="dg-r">⇄</i></span>`;
  return `<span class="dg" title="기대 ${ar(exp)} · 실제 ${ar(s)} · 방향 ${esc(v)}"><i class="dg-e">${exp ? ar(exp) : '?'}</i><i class="dg-a">${ar(s)}</i></span>`;
}
function ageBar(x) {
  if (x.fixed) return `<span class="fx" title="${esc(x.fixed)}">${esc(x.fixed)}</span>`;
  const th = model.rule.fresh[x.freq === 'M' ? 'M' : x.freq === 'W' ? 'W' : 'D']; if (!isNum(x.age)) return '<span class="miss-t">미수집</span>';
  const mx = th[1] * 1.4, w = v => Math.min(100, v / mx * 100);
  /* 늦게 발표하는 월간 원천(lag): 경과일을 자료 달 + lag 달 1일(ageFrom)부터 센다 */
  const from = x.lag && x.ageFrom ? x.lag + '개월 늦게 발표돼 ' + fdate(x.ageFrom, 'M') + '부터 ' : '';
  return `<span class="ab" title="${esc(fdate(x.date, x.freq) + ' 관측 · ' + from + x.age + '일 경과 · 신선 ' + th[0] + '일 · 지연 ' + th[1] + '일')}"><i class="ab-1" style="width:${w(th[0])}%"></i><i class="ab-2" style="left:${w(th[0])}%;width:${w(th[1]) - w(th[0])}%"></i><b style="left:${w(x.age)}%" class="${x.age <= th[0] ? 'ok' : x.age <= th[1] ? 'mid' : 'old'}"></b></span>`;
}
function edgeGlyph(e) {
  const t = e.test || ''; const v = ['부합', '불일치', '혼재', '보합'].find(w => t.startsWith(w)) || null;
  /* 판정 낱말로 시작하지 않는 결과: 급변 간선은 급변/급변 없음, 나머지는 앞부분을 짧게 */
  const short = !v && t && !t.startsWith('도식') ? (e.jump ? (e.jump.miss ? '미수집' : e.jump.big ? '급변' : '급변 없음') : t.split(' (')[0].slice(0, 14)) : '';
  const st = e.kind === '도식' ? 'stroke-dasharray="4 3"' : e.kind === '표시' ? 'stroke-width="1"' : 'stroke-width="2"';
  const tbl = !PAGES && e.jumps ? `<div class="ejt">${jumpList(e.jumps, e.jumpNone)}</div>` : '';
  return `<li class="${state.edge === e.id ? 'on' : ''}${tbl ? ' ej' : ''}" title="${esc(e.id + ' ' + e.label + ' · ' + e.kind + (t && !PAGES ? ' · ' + t : '') + (e.flag && !PAGES ? ' · ' + e.flag : ''))}"><span class="eg-n">${esc(nodeOf(e.from).name)}</span><svg width="64" height="12"><line x1="2" x2="54" y1="6" y2="6" stroke="#abb3bf" ${st}/><path d="M54,2L62,6L54,10Z" fill="#abb3bf"/></svg><span class="eg-n">${esc(nodeOf(e.to).name)}</span><span class="eg-k">${esc(e.label)}</span>${PAGES ? '' : v ? `<i class="vwd">${esc(v)}</i>` : short ? `<i class="vwd">${esc(short)}</i>` : e.flag ? '<i class="eg-f" title="표시">!</i>' : '<i class="vwd">—</i>'}${tbl}</li>`;
}
function addModeTabs() {
  const cb = $('#mw-canvas .xcrumb'); if (!cb) return; const n = cb.querySelector('.xc-n'); if (n) n.remove();
  const stock = EXVIEW[state.sel] === 'stock'; if (!stock && state.cmode === 'map') state.cmode = 'ex';
  /* 전환은 이름 옆 첫 줄에 둔다. 리서치 링크(.xc-r, 오른쪽 끝)보다 앞이라 좁으면 링크가 다음 줄로 간다. */
  const html = `<span class="xmode"><button aria-pressed="${state.cmode === 'ex'}" data-cmode="ex">여러 면</button>${stock ? `<button aria-pressed="${state.cmode === 'map'}" data-cmode="map">국가 재고 지도</button>` : ''}<button aria-pressed="${state.cmode === 'model'}" data-cmode="model">모델 그림</button></span>`;
  const r = cb.querySelector('.xc-r'); if (r) r.insertAdjacentHTML('beforebegin', html); else cb.insertAdjacentHTML('beforeend', html);
  cb.querySelectorAll('[data-cmode]').forEach(b => b.onclick = () => { state.cmode = b.dataset.cmode; renderCanvas(); });
}
/* 판정 칸: 색 대신 낱말(세 상태색은 노드 막대와 단계 칩에만) */
const VSHORT = {'부합': '부합', '불일치': '불일치', '혼재': '혼재', '보합': '보합', '판정 없음': '없음', '미수집': '미수집', '—': '—'};
const vsq = (x, ax) => `<i class="vwd" title="${esc(ax + ' ' + (x ? x.v : '—'))}">${esc(VSHORT[x ? x.v : '—'] || '—')}</i>`;
function renderDossier() {
  const ch = state.sel && chk(state.sel); const box = $('#mw-dossier'); ROOT.classList.toggle('dos', !!ch);
  if (!ch) { box.innerHTML = ''; return; }
  const nodes = new Set(ch.meta.nodes); const E = model.graph.edges.filter(e => nodes.has(e.from) || nodes.has(e.to));
  const rows = ch.rows.filter(r => r.judged);
  /* 판정 행 범례: 비공개본의 '띠 = 위치'는 판정 기준 상자의 수준 정의(… 대비 위치)를 가리킨다. 1024~1279px 상세 열에서 한 줄이 되게 줄였다 */
  const rowHtml = r => { const sp = rowSpark(r, 90, 26); return `<li class="jr${sp ? '' : ' nos'}"><span class="jr-n" title="${esc((r.sub || '') + ' · ' + fdate(r.date, r.freq))}">${esc(r.label)}</span>${sp ? `<span class="jr-s">${sp}</span>` : ''}${PAGES ? '' : dirGlyph(r)}<span class="jr-p" title="${esc(posText(r.pos))}">${r.pos ? strip(r.pos, 86, 14) : '<span class="miss-t">기준 없음</span>'}</span>${PAGES ? '' : `<span class="jr-v">${vsq(r.dir, '방향')}${vsq(r.lvl, '수준')}</span>`}</li>`; };
  const ctx = ch.ctx.map(r => { const d = isNum(r.value) && r.sign ? r.value : null; return `<li class="cx" title="${esc((isNum(r.value) ? (r.sign ? fs(r.value, isNum(r.digits) ? r.digits : 1) : f(r.value, isNum(r.digits) ? r.digits : 1)) + ' ' + (r.unit || '') + ' · ' : '') + (r.note || '') + (r.delta ? ' · Δ' + r.delta : ''))}"><span>${esc(r.label)}</span>${r.missing ? '<span class="miss-t">미보고</span>' : !isNum(r.value) ? '<span class="miss-t">미수집</span>' : d != null ? `<i class="dg-a">${d > 0 ? '▲' : d < 0 ? '▼' : '·'}</i>` : '<i class="cx-ok">●</i>'}</li>`; }).join('');
  box.innerHTML = `<header class="ds-h"><span class="ds-ic">${ch.circ}</span><div><h2>${esc(ch.name)}</h2><p class="ds-ty">판정 근거</p></div><button class="x" aria-label="닫기">×</button></header>
    <div class="ds-b">
    ${ch.noVerdict ? '' : `<p class="vh2">판정 행 <span class="leg2"><i class="lk-w"></i>창 <i class="lk-b"></i>범위 <i class="lk-o"></i>범위 밖 · ${PAGES ? '띠 = 기준 대비 위치' : '<b>▲▼</b> 기대→실제 · 띠 = 위치 · 칸 = 방향·수준'}</span></p><ul class="jrl">${rows.map(rowHtml).join('')}</ul>`}
    ${histBlock(ch)}
    ${ch.ctx.length ? `<p class="vh2">맥락 <span class="leg2">판정에 넣지 않는 행 · ▲▼ 변화 방향 · 마우스를 올리면 값</span></p><ul class="cxl">${ctx}</ul>` : ''}
    ${E.length ? `<p class="vh2">간선 시험 <span class="leg2">굵은 선 계산 · 가는 선 표시 · 점선 도식${PAGES ? '' : ' · 칸 = 시험 결과'}</span></p><ul class="egl">${E.map(edgeGlyph).join('')}</ul>` : ''}
    <p class="vh2">입력 신선도 <span class="leg2"><i class="lk-1"></i>신선 <i class="lk-2"></i>지연 · 점 = 경과일</span></p><ul class="inl">${ch.inputs.map(x => `<li><span>${esc(x.label)}</span>${x.date ? ageBar(x) : '<span class="miss-t">미수집</span>'}</li>`).join('')}</ul>
    <p class="note-t"><a href="${esc(RESEARCH + ch.guideHref)}">해설 ${esc(ch.meta.guide[0])} ↗</a></p></div>`;
  box.querySelector('.x').onclick = () => deselect();
  const on = box.querySelector('.egl li.on'); if (on) box.scrollTop = Math.max(0, on.offsetTop - box.clientHeight / 3);
}
function renderStrip() {
  const box = $('#mw-strip'); const T = model.timeline; const W = Math.max(400, box.clientWidth - 20), laneW = 92, lh = 15;
  const lanes = LANES.map(l => l[0]).concat(T.chains ? ['사건 연결'] : []).concat(['계획·재가동']);
  const H = 14 + lanes.length * lh; const end = M.tOf(T.fetch), start = end - 26 * 7 * 864e5, fut = end + 365 * 864e5;
  const xa = K.sc([start, end], [laneW, laneW + (W - laneW) * 0.78]), xb = K.sc([end, fut], [laneW + (W - laneW) * 0.78, W - 6]); const x = t => t <= end ? xa(Math.max(t, start)) : xb(Math.min(t, fut));
  const ch = state.sel && chk(state.sel); const nodes = new Set(ch ? ch.meta.nodes : []);
  let g = '';
  const t0 = new Date(start); for (let t = Date.UTC(t0.getUTCFullYear(), t0.getUTCMonth() + 1, 1); t <= fut; t = Date.UTC(new Date(t).getUTCFullYear(), new Date(t).getUTCMonth() + (t > end ? 3 : 1), 1)) g += `<line class="grid" x1="${x(t)}" x2="${x(t)}" y1="10" y2="${H}"/><text class="ax" x="${x(t) + 2}" y="9">${t > end && new Date(t).getUTCMonth() === 0 ? String(new Date(t).getUTCFullYear()).slice(2) + '.' : ''}${+new Date(t).toISOString().slice(5, 7)}월</text>`;
  const ws = end - (model.days || 28) * 864e5; g += `<rect class="brush" x="${x(ws)}" y="10" width="${x(end) - x(ws)}" height="${H - 10}"/>`;
  const asT = M.tOf(T.asOf); if (asT < end) g += `<rect class="hatch" x="${x(asT)}" y="10" width="${x(end) - x(asT)}" height="${LANES.length * lh + 2}"><title>대장 확인 ${esc(M.fdate(T.asOf))} · 이후 미확인</title></rect>`;
  lanes.forEach((ln, i) => { const y0 = 12 + i * lh; g += `<text class="lab" x="0" y="${y0 + 11}">${esc(ln)}</text><line class="grid" x1="${laneW}" x2="${W}" y1="${y0 + lh}" y2="${y0 + lh}"/>`; });
  T.records.filter(r => M.tOf(r.d) >= start && r.node).forEach(r => { const li = LANE_OF(r.node); if (li < 0) return; const y0 = 12 + li * lh; const on = nodes.has(r.node); g += `<rect class="evt${ch ? (on ? ' on' : ' dim') : ''}" x="${x(M.tOf(r.d)) - 2}" y="${y0 + 3}" width="4" height="${lh - 6}" rx="1"><title>${esc(r.d + ' ' + (r.site || '') + ' · ' + r.type)}</title></rect>`; });
  if (T.chains) { const y0 = 12 + LANES.length * lh; T.chains.forEach((c, j) => { const a = x(M.tOf(c.a)), b = Math.max(x(M.tOf(c.b)), a + 4); g += `<rect class="bar" x="${a}" y="${y0 + 3 + (j % 3) * 3}" width="${b - a}" height="3"><title>${esc(c.title)}</title></rect>`; }); }
  { const y0 = 12 + (lanes.length - 1) * lh; T.projects.forEach((p, j) => { const a = x(M.tOf(p.a + '-01')), b = Math.max(x(M.tOf(p.b + '-01') + 28 * 864e5), a + 4); g += `<rect class="bar-l" x="${a}" y="${y0 + 3 + (j % 3) * 3}" width="${b - a}" height="3"><title>${esc(p.project + ' · ' + p.a + '~' + p.b)}</title></rect>`; }); }
  g += `<line class="now" x1="${x(end)}" x2="${x(end)}" y1="8" y2="${H}"/><text class="ax" x="${x(end) - 4}" y="${H - 2}" text-anchor="end">수집일</text><text class="ax" x="${x(end) + 4}" y="${H - 2}">앞으로 1년 →</text>`;
  box.innerHTML = `<svg class="tl" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><defs>${HATCH('mw-hatch-t')}</defs>${g}</svg>`;
}
function renderList() {
  
  listBase();
  const L = $('#mw-list');
  const fb = L.querySelector('[data-fold]'); if (fb) fb.onclick = () => { state.freshOpen = !state.freshOpen; renderList(); };
  /* 미수집 상태를 누르면 항목 전체가 펼쳐진다 */
  L.querySelectorAll('.hrow.static').forEach(el => { const st = el.querySelector('span:nth-of-type(1)') ? el.children[1].textContent : ''; el.classList.add('clk'); el.onclick = () => { state.regOpen = state.regOpen === st ? null : st; renderList(); }; });
  if (state.regOpen) { const li = [...L.querySelectorAll('.hrow.static')].find(el => el.children[1].textContent === state.regOpen); if (li) li.parentNode.insertAdjacentHTML('afterend', `<li><ul class="mlist dk reg2">${model.register.filter(r => r.status === state.regOpen).map(r => `<li><a href="#${r.cid}" data-sel="${r.cid}">${esc(r.check.split(' ')[0])}</a> ${esc(r.item)}</li>`).join('')}</ul></li>`); }
  const mz = Math.max(...model.movers.map(m => Math.abs(m.z)), 1);
  L.insertAdjacentHTML('beforeend', `<h3 class="hp">변동 상위 <small>창 ${esc(state.win)} · 평소 변화폭 대비</small></h3><ul class="mv">${model.movers.map(m => `<li title="${esc(m.label + ' · ' + M.zfmt(m.z, model.rule) + 'σ · ' + m.basis + (m.roll === '만기 교체' ? ' · 만기 교체 포함' : ''))}"><span>${m.big ? '<b class="mv-j">급변</b> ' : ''}${esc(m.label)}</span><span class="mv-b"><i style="width:${(Math.abs(m.z) / mz * 100).toFixed(0)}%"></i></span><i class="dg-a">${m.pct >= 0 ? '▲' : '▼'}</i></li>`).join('')}</ul>
    <h3 class="hp">가격 구조 <small>스프레드 이력</small></h3><ul class="sp2">${model.spreads.map(s => `<li title="${esc(s.name + ' · ' + s.pos)}"><span>${esc(s.name)}</span>${K.spark(s.spark, 70, 16, {zero: true})}</li>`).join('')}</ul>`);
  L.querySelectorAll('[data-sel]').forEach(a => a.onclick = ev => { ev.preventDefault(); select(a.dataset.sel); });
}
function graphView() {
  
  graphBase();
  if (PAGES || !model.hope) return; const cm = model.comove; if (!cm.grid.length) return;
  const cell = (v, want) => `<i class="cm ${v === want ? 'hit' : v ? 'miss' : ''}" title="${v > 0 ? '▲' : v < 0 ? '▼' : '·'}">${v > 0 ? '▲' : v < 0 ? '▼' : '·'}</i>`;
  $('#mw-canvas').insertAdjacentHTML('beforeend', `<div class="cmv" title="최근 ${cm.k}개월 · 물동량 ▲ · 유가 ▼ · 물가 가속 ▼ 이 기대 방향 · 채운 칸 = 기대와 같은 달"><b>동행</b><span class="cm-r"><em>물량</em>${cm.grid.map(g => cell(g.flow, 1)).join('')}</span><span class="cm-r"><em>유가</em>${cm.grid.map(g => cell(g.oil, -1)).join('')}</span><span class="cm-r"><em>물가</em>${cm.grid.map(g => cell(g.cpi, -1)).join('')}</span></div>`);
}
/* 열: 목록은 구조도 화면에서는 1024px 이상이면, 노드를 연 화면에서는 상세와 함께 펴도 가운데가 600px 이상이면(아래 narrowPair) 기본으로 편다.
 * 상세는 노드를 열면 편다. 단추로 바꾼 값은 다음 노드에도 그대로다. 휴대폰은 한 열로 쌓이므로 쓰지 않는다.
 * 폭은 CSS 폭 구간과 같은 창 폭(세로 스크롤바 포함)이다: 규칙 띠를 열어 페이지에 클래식 스크롤바(Windows 15~17px)가 생겨도 열이 접히지 않는다 */
const deskW = () => window.innerWidth || ROOT.clientWidth;
function listWanted() { if (typeof state.lstOpen === 'boolean') return state.lstOpen; return state.sel ? !narrowPair() : deskW() >= 1024; }
const dosWanted = () => state.dosOpen !== false;
/* 노드를 연 화면에서 목록·상세를 둘 다 펴면 가운데가 600px보다 좁아지는 폭이면 하나만 편다. 마지막에 누른 쪽이 남는다.
 * 열 폭은 CSS --lw·--dw(폭 구간마다 다르다)에서 읽는다: 1280px 232+400, 1100px 200+340(가운데 560), 1024px 200+340(484), 760px 200+300(260) */
const colPx = k => parseFloat(getComputedStyle(ROOT).getPropertyValue(k)) || 0;
const narrowPair = () => !!state.sel && deskW() - colPx('--lw') - colPx('--dw') < 600;
function listShown() { return listWanted() && !(narrowPair() && dosWanted() && state.colLast !== 'lst'); }
function dosShown() { return dosWanted() && !(narrowPair() && listWanted() && state.colLast === 'lst'); }
function fitColumns() {
  ROOT.classList.toggle('nolst', !listShown()); ROOT.classList.toggle('nodos', !!state.sel && !dosShown());
  ROOT.querySelectorAll('#mw-toolbar [data-col]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.col === 'lst' ? listShown() : dosShown())));
}
function renderBars() {
  
  barsBase();
  /* 규칙 단추와 상세 단추(노드를 열었을 때)는 도구 막대 오른쪽 끝 한 묶음에 붙어 있다: 막대가 가로로 스크롤해도 늘 보이고 서로 덮지 않는다 */
  const tb = $('#mw-toolbar'); tb.insertAdjacentHTML('beforeend', `<div class="tb-end"><div class="tg rulebtn"><div class="tg-b"><button class="tb" data-rule aria-pressed="${!!state.ruleOpen}">${PAGES ? '읽는 기준' : '판정 기준'}</button></div><span class="tg-l">규칙</span></div>${state.sel ? `<button class="tb colt colt-r" data-col="dos" aria-pressed="${dosShown()}" title="${PAGES ? '상세' : '판정 근거'}">상세</button>` : ''}</div>`);
  tb.querySelector('[data-rule]').onclick = () => { state.ruleOpen = !state.ruleOpen; renderBars(); renderStrip(); renderCanvas(); };
  /* 규칙은 도구 막대 아래 띠로 연다(캔버스를 덮지 않고 그 높이만큼 밀어 낸다) */
  let rb = $('#mw-rule'); if (!rb) { tb.insertAdjacentHTML('afterend', '<section id="mw-rule" hidden></section>'); rb = $('#mw-rule'); }
  rb.hidden = !state.ruleOpen;
  /* 작업 공간 최소 높이(CSS --rb)에 띠 높이를 더해, 띠를 열어도 구조도(그림 하한 420px)가 잘리지 않게 한다 */
  const setRb = () => ROOT.style.setProperty('--rb', state.ruleOpen ? rb.offsetHeight + 'px' : '0px');
  if (state.ruleOpen) { const R = model.rule; rb.innerHTML = `<h4>${PAGES ? '읽는 기준' : '판정 기준'}</h4><ul>${PAGES ? `<li><b>위치</b> 같은 시기 범위(최소~최대) · 자기 이력 중앙값 · 전년 같은 달 100 · 전년 같은 주 1배 대비 위·안·아래.</li><li><b>선물</b> 창 양 끝 월물이 다르면 만기 교체로 표시한다.</li><li><b>신선도</b> 일 ${R.fresh.D.join('/')} · 주 ${R.fresh.W.join('/')} · 월 ${R.fresh.M.join('/')}일.</li><li><b>급변</b> 창 변화가 같은 길이 평소 변화폭(표준편차)의 ${R.big_multiple}배 이상(${R.big_multiple}배 포함). 판정에는 넣지 않는다.</li>` : `<li><b>방향</b> 창 안 변화 부호 = 기대 부호 → 부합. 평소 변화폭(σ)의 ${R.flat.sigma}배 미만 → 보합. 이력 변화 ${R.flat.min_changes}개 미만 → 부호만.</li><li><b>수준</b> 같은 시기 범위(최소~최대) · 자기 이력 중앙값 · 전년 같은 달 100 · 전년 같은 주 1배 대비 위치.</li><li><b>집계</b> 부합·불일치가 섞이면 혼재. 판정 행 없음 → 판정 없음. 입력 없음 → 미수집.</li><li><b>선물</b> 창 양 끝 월물이 다르면 만기 교체 → 방향 판정 없음.</li><li><b>첫 이탈</b> 기대 경로 ①→②→③→④→⑫에서 축마다 처음 만나는 불일치. 판정은 경로를 따라 번지지 않는다.</li><li><b>신선도</b> 일 ${R.fresh.D.join('/')} · 주 ${R.fresh.W.join('/')} · 월 ${R.fresh.M.join('/')}일.</li><li><b>급변</b> 창 변화가 같은 길이 평소 변화폭(표준편차)의 ${R.big_multiple}배 이상(${R.big_multiple}배 포함). 판정에는 넣지 않는다.</li>`}</ul>`; } else rb.innerHTML = '';
  setRb(); setBx();
  tb.querySelectorAll('[data-col]').forEach(b => b.onclick = () => { if (b.dataset.col === 'lst') state.lstOpen = !listShown(); else state.dosOpen = !dosShown(); state.colLast = b.dataset.col; fitColumns(); renderStrip(); renderCanvas(); });
  fitColumns();
}
/* 전화: 열 차트는 두 줄로, 구조도는 레인 × 단계 목록으로 */
function phoneGraph() {
  const box = $('#mw-canvas'); const G = model.graph; const at = n => POS[n.id] || [n.col, n.row];
  const charts = COLCHART.map((cc, i) => `<button class="cc ph" data-sel="${cc.c}"><span class="fl-h"><b>${chk(cc.c).circ} ${esc(cc.t)}</b></span><span class="fl-s">${esc(cc.s)}</span><span class="fl-c" data-i="${i}"></span><span class="fl-k"></span></button>`).join('');
  const lanes = LANES.map(([ln, r0, r1]) => `<div class="plane"><span class="plane-h">${esc(ln)}</span>${STAGES.map((st, ci) => { const ns = G.nodes.filter(n => at(n)[0] === ci + 1 && at(n)[1] >= r0 && at(n)[1] <= r1); return ns.length ? `<div class="pcol"><span class="pcol-h">${esc(st)}</span><div class="pcol-n">${ns.map(n => `<button class="pill node ${SCLS[nodeV(n)] || 's-none'}" data-n="${n.id}" data-c="${n.check}"><span class="pc">${chk(n.check).circ}</span>${esc(n.name)}</button>`).join('')}</div></div>` : ''; }).join('')}</div>`).join('');
  box.innerHTML = `${model.hope && !PAGES ? `<p class="cv-a">${firstBreak()}</p>` : ''}<div class="phc">${charts}</div>${lanes}`;
  box.querySelectorAll('.fl-c').forEach(el => { const r = colChart(+el.dataset.i, Math.max(60, el.clientWidth), 84); if (r) { el.innerHTML = r.svg; el.nextElementSibling.innerHTML = r.key; thinX(el); } else el.innerHTML = '<span class="miss">미수집</span>'; });
  box.querySelectorAll('[data-sel]').forEach(b => b.onclick = ev => { ev.preventDefault(); select(b.dataset.sel); });
  box.querySelectorAll('.node').forEach(n => n.onclick = () => select(n.dataset.c));
}
/* 노드를 열면 구조도를 위에 얇은 줄로 남긴다: 같은 배치의 축소판, 고른 노드의 위·아래 경로만 밝게. 누르면 그 노드로 */
function miniMap(W) {
  const ch = chk(state.sel); const sel = new Set(ch.meta.nodes); const on = pathSet([...sel]);
  const nC = STAGES.length, colW = (W - 8) / nC, pw = colW - 16, ph = 9, rowH = 10.5, top = 3, H = top + 5 * rowH + 2;
  const X = c => 4 + (c - 1) * colW, Y = r => top + (r - 1) * rowH;
  let g = '';
  model.graph.edges.forEach(e => {
    const a = POS[e.from], b = POS[e.to]; if (!a || !b) return; const inP = (on.up.has(e.from) && on.up.has(e.to)) || (on.dn.has(e.from) && on.dn.has(e.to));
    const d = a[0] === b[0] ? `M${X(a[0]) + pw / 2},${a[1] < b[1] ? Y(a[1]) + ph : Y(a[1])}V${a[1] < b[1] ? Y(b[1]) : Y(b[1]) + ph}` : `M${X(a[0]) + pw},${Y(a[1]) + ph / 2}H${X(b[0]) - 8}V${Y(b[1]) + ph / 2}H${X(b[0])}`;
    g += `<path class="mm-e${inP ? ' on' : ''}" d="${d}"/>`;
  });
  model.graph.nodes.forEach(n => {
    const [c, r] = POS[n.id] || [n.col, n.row]; const v = nodeV(n); const cc = chk(n.check);
    g += `<g class="mm-n ${SCLS[v] || 's-none'}${on.has(n.id) ? ' on' : ''}${sel.has(n.id) ? ' sel' : ''}" data-c="${n.check}" transform="translate(${X(c)},${Y(r)})"><rect class="mm-r" width="${pw}" height="${ph}" rx="1.5"/><rect class="mm-b" width="2.5" height="${ph}"/><text class="mm-t" x="5" y="7.2">${cc.circ} ${esc(n.name)}</text><title>${esc(cc.circ + ' ' + n.name + (PAGES ? '' : ' · ' + v) + ' · 누르면 이 노드로')}</title></g>`;
  });
  return `<svg class="mm" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="구조도 축소판">${g}</svg>`;
}
/* 탐색 지도 다시 그리기: 보기가 지도를 처음 그릴 때는 경로 막대·축소판이 아직 없어 상자가 더 크다 */
let reflow = null, drawnW = 0, drawnH = 0;
function renderCanvas() {
  /* 막대 높이(--bx)를 먼저 맞춘다: 막대 관찰자는 다음 프레임에 재므로, 그 사이에 오는 그리기(지도 파일 도착 등)가 옛 하한으로 그리지 않게 */
  reflow = null; setBx();
  const ch = state.sel && chk(state.sel);
  /* 노드를 연 화면의 여백·스크롤 규칙(.xn)을 그리기 전에 붙여, 패널·지도가 최종 폭으로 크기를 잰다 */
  $('#mw-canvas').classList.toggle('xn', !!ch);
  if (!ch) { if (state.phone) phoneGraph(); else graphView(); drawnH = $('#mw-canvas').clientHeight; return; }
  const v = EXVIEW[ch.id];
  if (v !== 'stock' && state.cmode === 'map') state.cmode = 'ex';
  const miss = () => { $('#mw-canvas').innerHTML = `<div class="ckv"><p class="pa-q">${esc(ch.q || ch.name)}</p><p class="miss">미수집 · 이 보기의 입력이 payload에 없다</p></div>`; };
  try { if (v && state.cmode === 'ex') { if (v === 'oil') renderExplore(); else if (v === 'stock') renderStockEx(); else if (v === 'use') renderUseEx(); else if (v === 'gas') renderGasEx(); else renderCpiEx(); } else if (v === 'stock' && state.cmode === 'map') renderExplore(); else checkView(ch); }
  catch (e) { try { checkView(ch); } catch (e2) { miss(); } }
  $('#mw-canvas').insertAdjacentHTML('afterbegin', crumbBar(ch));
  $('#mw-canvas [data-back]').onclick = () => deselect();
  if (v) addModeTabs();
  if (!state.phone) {
    const cv = $('#mw-canvas'); const cb = cv.querySelector('.xcrumb');
    cb.insertAdjacentHTML('afterend', `<div class="mmap" id="mw-mini">${miniMap(Math.max(400, cv.clientWidth - 20))}</div>`);
    cv.querySelectorAll('.mm-n').forEach(n => n.onclick = () => select(n.dataset.c));
  }
  if (reflow) { const r = reflow; reflow = null; try { r(); } catch (e) { /* 지도는 첫 그림이 남는다 */ } }
  /* 행렬 높이는 경로 막대·축소판이 들어간 뒤에 정해지므로 고른 칸 맞추기는 마지막에 한 번 더 */
  if (state.cmode === 'ex' && (v === 'stock' || v === 'use')) showCell($('#mw-canvas'), v === 'stock' ? state.sx.cell : state.ux.cell);
  drawnW = ROOT.clientWidth; drawnH = $('#mw-canvas').clientHeight;
}
/* 주소와 뒤로 가기: 노드를 열면 주소 해시가 #c2 처럼 바뀌고 기록이 하나 쌓인다. 구조도는 빈 해시(#)다.
 * pushState 가 막힌 호스트에서는 compat.js 가 같은 해시를 location.hash 로 넣으므로 hashchange 도 받는다 */
const hashId = () => { const h = (location.hash || '').slice(1); return /^c\d{1,2}$/.test(h) ? h : null; };
let pushing = false;
function remember(id) {
  /* pushState 가 막힌 호스트에서는 compat.js 가 location.hash 를 바꾸고, 브라우저가 그 안에서 바로 popstate 를 낸다.
   * 그 이벤트가 진행 중인 select 를 다시 부르지 않게 기록하는 동안은 주소 이벤트를 받지 않는다 */
  pushing = true;
  try {
    const st = history.state && typeof history.state === 'object' ? history.state : {};
    if (!('monWs' in st)) history.replaceState({...st, monWs: state.sel || null}, '');
    if ((history.state || {}).monWs !== id) history.pushState({monWs: id}, '', '#' + (id || ''));
  } catch (e) { /* 기록을 못 쓰는 호스트에서는 뒤로 가기만 빠진다 */ } finally { pushing = false; }
}
function fromAddress(e) {
  if (pushing || !model) return;
  const st = e && e.state && typeof e.state === 'object' ? e.state : null;
  const id = st && 'monWs' in st ? st.monWs : hashId();
  if (id && chk(id)) { if (state.sel !== id) select(id, false, true); }
  else if (state.sel) deselect(true);
}
window.addEventListener('popstate', fromAddress);
window.addEventListener('hashchange', () => fromAddress(null));
function select(id, keep, fromHistory) {
  if (!fromHistory) remember(id);
  if (PRESET[id]) Object.assign(state.ex, PRESET[id]); if (id === 'c10') state.cx.item = 'cpi_food_home'; if (id === 'c12') state.cx.item = 'cpi_all';
  if (state.sel !== id && !keep) { state.tab = null; state.edge = null; state.ctab = null; if (state.cmodeBack) { state.cmode = state.cmodeBack; state.cmodeBack = null; } }
  state.sel = id; ROOT.classList.add('ex');
  if (state.phone && !fromHistory) window.scrollTo(0, 0);
  for (const r of [renderBars, renderList, renderDossier, renderCanvas, renderStrip]) { try { r(); } catch (e) { if (window.console) console.error('monitor-ws', r.name, e); } }
}
function deselect(fromHistory) { if (!fromHistory) remember(null); if (state.cmodeBack) { state.cmode = state.cmodeBack; state.cmodeBack = null; } state.sel = null; state.tab = null; state.edge = null; state.ctab = null; ROOT.classList.remove('ex'); renderBars(); renderList(); renderDossier(); renderCanvas(); renderStrip(); }
let booted = false;
function renderAll() {
  /* 그리는 폭을 적어 둔다: 폰↔데스크톱 전환(mq change)처럼 이 함수가 새 폭으로 그린 뒤 작업 공간 관찰자가 같은 폭으로 다시 그리지 않는다 */
  if (ROOT.clientWidth) lastW = ROOT.clientWidth;
  try {
    build();
    if (!booted) { booted = true; const h0 = hashId(); if (h0 && chk(h0)) { try { history.replaceState({...(history.state && typeof history.state === 'object' ? history.state : {}), monWs: h0}, ''); } catch (e) { /* 주소만 남는다 */ } select(h0, false, true); return; } }
    renderBars(); renderList(); renderDossier(); renderStrip(); renderCanvas(); }
  catch (e) { ROOT.classList.add('mw-off'); ROOT.innerHTML = offMsg('계산에 필요한 자료가 빠져 작업 공간을 그리지 못했다.'); if (window.console) console.error('monitor-ws', e); }
}
/* 데스크가 숨겨진 동안은 폭이 0이라 그리지 않고, 보이는 순간(크기 변화) 다시 그린다.
 * 작업 공간 관찰자는 폭 변화만, 캔버스 관찰자는 캔버스 높이 변화만 본다. 창 높이·규칙 띠·접힌 막대(--bx)로 작업 공간 높이가 바뀌어도
 * 캔버스 높이가 마지막 그림(drawnH)과 같으면 다시 그리지 않는다. 두 관찰자가 함께 알리면 다시 그리기 예약 하나를 같이 쓴다 */
let lastW = 0, redraw = null, redrawCols = false;
function queueRedraw(cols, ms) {
  redrawCols = redrawCols || cols; clearTimeout(redraw);
  /* 캔버스 높이만 알린 예약은 실행할 때 높이가 마지막 그림과 같으면(잠깐 바뀌었다 돌아온 때) 건너뛴다 */
  redraw = setTimeout(() => { redraw = null; const c = redrawCols; redrawCols = false; setBx(); if (!c && Math.abs($('#mw-canvas').clientHeight - drawnH) < 2) return; if (c) fitColumns(); renderStrip(); renderCanvas(); }, ms);
}
const mq = window.matchMedia('(max-width: 759px)'); state.phone = mq.matches;
mq.addEventListener('change', e => { state.phone = e.matches; if (ROOT.clientWidth) renderAll(); });
new ResizeObserver(() => { const w = ROOT.clientWidth; if (!w) { lastW = 0; return; } if (Math.abs(w - lastW) < 2) return; const first = !lastW; lastW = w;
  /* 데스크가 다시 보일 때는 마지막으로 그린 폭과 다를 때만 다시 그린다(숨은 동안 그린 경우). 같으면 스크롤 위치를 그대로 둔다 */
  if (first && drawnW && Math.abs(w - drawnW) < 2) return;
  if (first) { clearTimeout(redraw); redraw = null; redrawCols = false; setTimeout(renderAll, 0); } else queueRedraw(true, 120); }).observe(ROOT);
/* 캔버스 높이가 작업 공간과 따로 바뀌면(늦게 온 글꼴로 머리·도구 막대 줄 수가 바뀐 때) 그 높이로 다시 그린다.
 * 데스크톱 캔버스는 격자 칸 크기라 그림이 캔버스 크기를 바꾸지 않는다. 폰은 높이가 내용을 따르므로 보지 않는다 */
new ResizeObserver(() => { if (state.phone || !model || !drawnH) return; const h = $('#mw-canvas').clientHeight; if (!h || Math.abs(h - drawnH) < 2) return; queueRedraw(false, 60); }).observe($('#mw-canvas'));
/* 머리·도구 막대가 한 줄(34px·50px)보다 높아진 만큼(폭이 좁거나 늦게 온 글꼴로 접힌 때) 데스크톱 작업 공간 최소 높이를 늘린다(CSS --bx).
 * 막대가 한 줄이면 0이라 하한은 620px(+규칙 띠)이다. renderBars 가 그리기 전에 바로 재고, 막대 크기만 바뀐 때(창 폭·글꼴)는 다음 프레임에 잰다:
 * 관찰자 안에서 바로 쓰면 바깥 작업 공간 크기가 같은 회차에 바뀌어 'ResizeObserver loop' 오류가 난다 */
function setBx() { const a = $('#mw-appbar'), t = $('#mw-toolbar'); if (!a || !t) return; const v = Math.max(0, a.offsetHeight - 34) + Math.max(0, t.offsetHeight - 50) + 'px'; if (ROOT.style.getPropertyValue('--bx') !== v) ROOT.style.setProperty('--bx', v); }
{ const bo = new ResizeObserver(() => requestAnimationFrame(setBx)); ['#mw-appbar', '#mw-toolbar'].forEach(q => { const el = $(q); if (el) bo.observe(el); }); }
/* 지도 바탕(세계 국경): energy-data.json 을 한 번 읽는다(같은 페이지에 maps.js 가 있으면 그 응답을 같이 쓴다) */
let mapFile = null; try { mapFile = energyMapFile; } catch (err) { mapFile = null; }
if (!mapFile && window.fetch) mapFile = fetch('energy-data.json').then(r => { if (!r.ok) throw new Error('지도 파일을 읽지 못했다.'); return r.json(); });
if (mapFile) mapFile.then(d => { WORLD = {type: 'FeatureCollection', features: d.world.features.filter(x => x.properties.id !== 'ATA')}; if (state.sel && EXVIEW[state.sel] && ROOT.clientWidth) renderCanvas(); }).catch(() => {});
/* 공개본(PAGES)은 판정이 없는 화면이다: 행 설명·안내 문구에 남은 판정 낱말을 그린 뒤에 바꾸거나 지운다(2026-11-25).
 * 순서가 있다(긴 문구 먼저). 공개본 화면에 '판정'이 들어가는 문구를 새로 만들면 이 표에 더한다.
 * test_energy_monitor_ws.py 가 알려진 문구와 모델의 공개본 문구를 이 표로 고친 결과를 확인한다 */
const PUB_WORDS = [[' · 방향 판정 없음', ''], ['(방향 판정 없음)', ''], [' · 판정 없음', ''], ['판정 없음 · ', ''], [' 판정에는 넣지 않는다.', ''],
  ['판정에 넣지 않는 행', '점검 행 밖'], ['전년비 판정', '전년비'], ['판정 근거', '상세'], ['판정 행', '점검 행']];
const pubWords = t => PUB_WORDS.reduce((x, [a, b]) => x.split(a).join(b), t);
function pubClean(root) {
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); const hit = [];
  while (tw.nextNode()) if (tw.currentNode.nodeValue.includes('판정')) hit.push(tw.currentNode);
  hit.forEach(n => { n.nodeValue = pubWords(n.nodeValue); });
  root.querySelectorAll('[title*="판정"],[aria-label*="판정"]').forEach(el => ['title', 'aria-label'].forEach(a => { const v = el.getAttribute(a); if (v && v.includes('판정')) el.setAttribute(a, pubWords(v)); }));
}
/* 글자·속성 변경은 관찰하지 않으므로(childList 만) 바꾼 결과가 다시 불리지 않는다 */
/* 바꾼 문구로 도구 막대 줄 수가 달라질 수 있어(공개본 노드 화면 1024px: 두 줄 → 한 줄) 막대 높이를 바로 다시 잰다 */
if (PAGES && window.MutationObserver) new MutationObserver(() => { pubClean(ROOT); if (!state.phone) setBx(); }).observe(ROOT, {childList: true, subtree: true});
/* 화면 밖 검사 스크립트용 손잡이 */
ROOT.monitor = {model: () => model, select: id => select(id), deselect: () => deselect(), render: () => renderAll()};
})();
