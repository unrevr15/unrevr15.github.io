'use strict';
// Shock tiles of the market monitor (plan §3 and §4 monitor-shock). Each tile
// prints fact records (facts.js): the value and its period, a small bar chart
// of one source's own series, the citation and a link to the section that
// explains it. A tile whose record is missing is left out; the others stay.
// Runs after facts.js and before workspace.js.
(() => {
  const panel = document.getElementById('monitor-shock');
  if (!panel) return;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const num = value => Number(value).toLocaleString('en-US');
  // '약 500만 배럴/일' → the number large, the unit small.
  const big = (text, unit) => {
    const m = String(text).match(/^((?:약 )?[\d.,~]+(?:만|억)?%?)\s*(.*)$/);
    const rest = [m ? m[2] : '', unit].filter(Boolean).join(' · ');
    return '<b>' + esc(m ? m[1] : text) + '</b>' + (rest ? '<small>' + esc(rest) + '</small>' : '');
  };
  const bar = (label, from, to, max, text, latest) =>
    '<div class="shock-bar"><span>' + esc(label) + '</span><i class="shock-track"><b' + (latest ? ' class="latest"' : '') +
    ' style="left:' + (from / max * 100).toFixed(1) + '%;width:' + ((to - from) / max * 100).toFixed(1) + '%"></b></i><em>' + esc(text) + '</em></div>';
  const tile = ({title, period, value, bars, lines, cite, home, homeText}) =>
    '<article class="shock-tile"><h3>' + esc(title) + '<span>' + esc(period) + '</span></h3><p class="shock-value">' + value + '</p>' +
    '<div class="shock-bars">' + bars + '</div>' + lines.map(line => '<p class="shock-line">' + line + '</p>').join('') +
    '<p class="shock-foot">' + cite + '<a href="#' + home + '">' + esc(homeText) + ' ↗</a></p></article>';
  const value = (id, pick) => {
    const record = typeof facts === 'undefined' ? null : facts[id];
    const found = record && (pick ? record.values.find(pick) : record.values[record.lead]);
    if (!found) throw new Error('monitor: no value in fact ' + id);
    return found;
  };
  const builders = [
    () => {
      const gulf = value('gulf-crude-exports-2026-10');
      return {title: '걸프 해상 원유 수출', period: facts['gulf-crude-exports-2026-10'].period,
        value: big('약 ' + gulf.share + '%', '전쟁 전 대비'),
        bars: bar('전쟁 전', 0, 100, 100, '100%') + bar('10월', 0, gulf.share, 100, '약 ' + gulf.share + '%', true),
        lines: ['원유·콘덴세이트 ' + esc(gulf.text) + ' · ' + esc(gulf.basis)],
        cite: factChip(gulf), home: gulf.home, homeText: '원유 › 걸프 수출'};
    },
    () => {
      const sep = value('hormuz-oil-2026-09'), aug = value('hormuz-oil-2026-08');
      return {title: '호르무즈 통과 석유', period: facts['hormuz-oil-2026-09'].period + ' · IEA 추정',
        value: big(sep.text),
        bars: bar('8월', 0, aug.value, sep.value, num(aug.value) + '만') + bar('9월', 0, sep.value, sep.value, num(sep.value) + '만', true),
        lines: ['8월 대비 +' + num(sep.value - aug.value) + '만(계산) · ' + esc(aug.basis)],
        cite: factChip(sep), home: sep.home, homeText: '원유 › 호르무즈 유량'};
    },
    () => {
      const late = value('ru-refinery-runs-2026-10', v => v.source === 'russiaOctoberRuns');
      const month = value('ru-refinery-runs-2026-10', v => /월평균/.test(v.period || ''));
      // The start of the month, divided back from the late-October value and its stated rise.
      const start = Math.round(late.value / (1 + late.rise_pct / 100));
      if (!Number.isFinite(start)) throw new Error('monitor: no rise in the late-October runs value');
      return {title: '러시아 정유 원유 투입', period: '2026년 ' + late.period,
        value: big(late.text),
        bars: bar('10월 초', 0, start, late.value, '약 ' + num(start) + '만(계산)') +
              bar('10월 하순', 0, late.value, late.value, '약 ' + num(late.value) + '만', true),
        lines: [esc(late.basis) + ' · 10월 초는 ' + num(late.value) + ' ÷ ' + (1 + late.rise_pct / 100) + '(계산)',
                '10월 평균은 ' + esc(month.text) + '(' + esc(month.basis) + ') ' + factChip(month),
                '11월 3일 야로슬라블·11월 5일 랴잔 피격 뒤 처리량은 미확인이다 ' + ref('yar', 'Reuters') + ' ' + ref('ryazanNov5', 'Reuters')],
        cite: factChip(late), home: late.home, homeText: '정유 › 정유시설 피해'};
    },
    () => {
      const premium = value('war-premium-2026-06');
      return {title: '호르무즈 추가 전쟁보험료', period: '6월 합의 전후',
        value: big(premium.text, '선체 가치 대비'),
        bars: bar('합의 전', premium.before[0], premium.before[1], 6, premium.before.join('~') + '%') +
              bar('합의 후', premium.range[0], premium.range[1], 6, premium.range.join('~') + '%', true),
        lines: ['보험중개사 Marsh 평가',
                '11월 5일 보도로는 그 주 일요일 이후 최소 5척이 사고를 신고했다(UKMTO) ' + ref('tankerNov5', 'Reuters')],
        cite: factChip(premium), home: premium.home, homeText: '지정학 › 호위·보험'};
    },
  ];
  const tiles = [];
  for (const build of builders) {
    try {
      tiles.push(tile(build()));
    } catch (err) {
      console.error('monitor: shock tile not built', err);
    }
  }
  if (!tiles.length) {
    panel.hidden = true;
    return;
  }
  panel.insertAdjacentHTML('beforeend', '<div class="shock-grid">' + tiles.join('') + '</div>');
})();
