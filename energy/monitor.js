'use strict';
// Supply-shock table of the market monitor (plan §3 and §4 monitor-shock). Each
// row prints fact records (facts.js): the earlier and the latest value of one
// source's own series, the change between them, and a link to the section that
// explains it. A value divided back from a record carries the note mark 1), a
// value the source gives as approximate keeps its '약'. The notes of the rows
// built and the sources sit under the table once. A row whose record is missing
// is left out, with its notes; the others stay. Runs after facts.js and before
// workspace.js.
(() => {
  const panel = document.getElementById('monitor-shock');
  if (!panel) return;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  // Digits as the record has them: 4.5 keeps one, 6 none.
  const places = value => Number.isInteger(value) ? 0 : 1;
  // A field the record lacks throws, so the row is left out instead of printing NaN.
  const num = (value, digits = places(value)) => {
    if (!Number.isFinite(value)) throw new Error('monitor: not a number');
    return value.toLocaleString('en-US', {minimumFractionDigits:digits, maximumFractionDigits:digits});
  };
  const signed = (value, digits) => (value > 0 ? '+' : value < 0 ? '−' : '') + num(Math.abs(value), digits);
  const tone = value => value > 0 ? 'live-up' : value < 0 ? 'live-down' : '';
  const pair = list => {
    if (!Array.isArray(list) || list.length !== 2 || !list.every(Number.isFinite)) throw new Error('monitor: not a range');
    return list;
  };
  // Korean in a number cell keeps the text font.
  const ABOUT = '<span class="kr">약</span> ';
  const about = found => found.approx ? ABOUT : '';
  const value = (id, pick) => {
    const record = typeof facts === 'undefined' ? null : facts[id];
    const found = record && (pick ? record.values.find(pick) : record.values[record.lead]);
    if (!found) throw new Error('monitor: no value in fact ' + id);
    return found;
  };
  // Sources are listed once under the table, by name, linking to their card;
  // a row's note links its own story where two share a name.
  const cited = new Map();
  const cite = (...values) => values.forEach(v => { if (v.label && !cited.has(v.label)) cited.set(v.label, v.source); });
  const sourceLink = (id, label) => typeof sources !== 'undefined' && sources[id]
    ? '<a href="#s-' + esc(id) + '">' + esc(label) + '</a>' : esc(label);
  const mark = '<sup>1)</sup>';
  // '<집계> (Reuters 인용), <범위>' → 'Reuters가 인용한 <집계>, <범위>': the basis without nested parentheses.
  const cited_by = basis => {
    const m = String(basis).match(/^(.+?)\((\S+) 인용\)(.*)$/);
    return m ? m[2] + '가 인용한 ' + m[1] + m[3] : String(basis);
  };

  const builders = [
    () => {
      const gulf = value('gulf-crude-exports-2026-10');
      return {cites:[gulf], name:'걸프 해상 원유 수출', home:gulf.home, unit:'전쟁 전=100',
        // The share is a rounded ratio; its homes write it '약 86%'.
        before:'100', beforeWhen:'전쟁 전', after:ABOUT + num(gulf.share), afterWhen:facts['gulf-crude-exports-2026-10'].period,
        change:gulf.share - 100,
        note:'걸프 10월 해상 수출은 원유·콘덴세이트 ' + esc(gulf.text) + '이다(' + esc(cited_by(gulf.basis)) + ').'};
    },
    () => {
      const sep = value('hormuz-oil-2026-09'), aug = value('hormuz-oil-2026-08');
      return {cites:[sep, aug], name:'호르무즈 통과 석유', home:sep.home, unit:'만 배럴/일',
        before:num(aug.value) + mark, beforeWhen:facts['hormuz-oil-2026-08'].period,
        after:num(sep.value), afterWhen:facts['hormuz-oil-2026-09'].period,
        change:sep.value - aug.value, derived:'호르무즈 8월은 IEA 9월 수치와 증감분으로',
        note:'호르무즈 유량은 IEA 추정이다.'};
    },
    () => {
      const late = value('ru-refinery-runs-2026-10', v => v.source === 'russiaOctoberRuns');
      const avg = value('ru-refinery-runs-2026-10', v => /월평균/.test(v.period || ''));
      // The start of the month, divided back from the late-October value and its stated rise.
      const start = Math.round(late.value / (1 + late.rise_pct / 100));
      if (!Number.isFinite(start)) throw new Error('monitor: no rise in the late-October runs value');
      return {cites:[late, avg], name:'러시아 원유 정제처리량', home:late.home, unit:'만 배럴/일',
        before:about(late) + num(start) + mark, beforeWhen:'10월 초', after:about(late) + num(late.value), afterWhen:late.period,
        change:late.value - start, extra:' (' + signed(late.rise_pct) + '%)', derived:'러시아 10월 초는 하순 값과 월초 대비 증가율로',
        note:'러시아 처리량은 업계 소식통 추정(' + sourceLink(late.source, late.label) + ')이고, 10월 평균은 ' + esc(avg.text) + '(' +
          sourceLink(avg.source, avg.label) + ')이다. 11.03 야로슬라블(' + sourceLink('yar', 'Reuters') + ')·11.05 랴잔(' +
          sourceLink('ryazanNov5', 'Reuters') + ') 피격 이후 처리량은 미확인이다.'};
    },
    () => {
      const premium = value('war-premium-2026-06');
      const [b0, b1] = pair(premium.before), [a0, a1] = pair(premium.range);
      // Change of each bound, written low to high, both with the decimals either needs;
      // the cell takes a colour only when both bounds moved the same way.
      const [lo, hi] = [a0 - b0, a1 - b1].sort((x, y) => x - y);
      const digits = Math.max(places(lo), places(hi));
      return {cites:[premium], name:'호르무즈 추가 전쟁보험료', home:premium.home, unit:'선체 가치 대비 %',
        before:num(b0) + '~' + num(b1), beforeWhen:'합의 전', after:num(a0) + '~' + num(a1), afterWhen:'2026년 6월 합의 후',
        change:Math.sign(lo) === Math.sign(hi) ? hi : 0, text:signed(lo, digits) + '~' + signed(hi, digits) + '%p',
        note:'보험료는 Marsh 평가다. 11.01 이후 UKMTO에 사고를 신고한 선박은 최소 5척이다(11.05 ' + sourceLink('tankerNov5', 'Reuters') + ' 보도).'};
    },
  ];

  const rows = [], notes = [], derived = [];
  for (const build of builders) {
    try {
      const r = build();
      // The unit is small text beside the name, as the heatmap writes it.
      rows.push('<tr class="shock-row"><th scope="row"><a href="#' + esc(r.home) + '">' + esc(r.name) + '</a> <small>' + esc(r.unit) + '</small></th>' +
        '<td class="num">' + r.before + '<small>' + esc(r.beforeWhen) + '</small></td>' +
        '<td class="num shock-latest">' + r.after + '<small>' + esc(r.afterWhen) + '</small></td>' +
        '<td class="num ' + tone(r.change) + '">' + (r.text || signed(r.change) + (r.extra || '')) + '</td></tr>');
      notes.push(r.note);
      if (r.derived) derived.push(r.derived);
      // Cited only once the row is built, so a dropped row leaves no source behind.
      cite(...r.cites);
    } catch (err) {
      console.error('monitor: shock row not built', err);
    }
  }
  if (!rows.length) {
    panel.hidden = true;
    return;
  }
  panel.insertAdjacentHTML('beforeend',
    '<div class="table-scroll"><table class="shock-table"><thead><tr>' +
    ['지표', '이전', '최신', '변화'].map(text => '<th scope="col">' + text + '</th>').join('') +
    '</tr></thead><tbody>' + rows.join('') + '</tbody></table></div>' +
    // Notes and sources are folded under the table.
    '<details class="method shock-fold"><summary>주석·자료</summary>' +
    '<div class="note shock-notes"><p>주: ' + (derived.length ? '1) 역산치. ' + derived.join(', ') + ' 역산했다. ' : '') +
    '변화는 이전과 최신의 차이(계산)다.</p>' + notes.map(note => '<p>' + note + '</p>').join('') + '</div>' +
    '<p class="note shock-sources">자료: ' + [...cited].map(([label, id]) => sourceLink(id, label)).join(', ') + '</p></details>');
})();
