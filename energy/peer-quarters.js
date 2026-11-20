'use strict';
// 밸류체인 기업 › 분기 비교 (peer-quarters). index.html holds the section with its
// heading, one-line description, 확인 기준 date and empty hosts; this script fills
// the hosts from peerQuarters of peer-quarters-data.js (the company sections of
// the textbook manuscript that went to the dashboard). The company cards of
// value-chain.js stay as they are: this view puts the quarter's figures of the
// companies of one stage side by side and carries what the calls explained.
//
// The pictures come first and the words are the detail under them.
//   The stage strip is the value chain in order, with the companies and the
//   observations of each stage; a stage narrows the view to its panel.
//   A panel has the charts of its stage on the left: one chart is one axis in
//   one unit. Which observations make a chart is a rule, not a list: the
//   observations of a stage that share `group` and `unit` are one chart when
//   two of them have a mark to draw (a number or a range). The data decides
//   what a `group` is: one measure of two companies, one measure of a company
//   in two periods (or its actual and the guidance after it), or the parts a
//   company reports in one period (the divisions of its revenue, the classes
//   of its fleet, a total and what it splits into). Where the bars of a chart
//   stand on different bases the data says so (`group_notes`) and the chart
//   carries that line under its head. Everything else is a tile on the right,
//   under its company. No bar crosses to another chart's scale.
//   A bar's length is `value`, a number in the unit of the chart; the figure
//   beside it is `value_text`, as the manuscript writes it, so the two can be
//   written in different units ($693m on a $bn axis is 0.693, 약 1/8 is
//   0.125). A range (`value` [low, high]) is a band from the one to the
//   other. An observation without a number (a wording) is a line of the chart
//   with no bar. 실적 is a filled bar, 회사 정의 지표 a lighter one, 가이던스
//   hatched, 경영진 추정 an outline; the kind is written beside the figure too.
//   Under the pictures a folded table has what each call or filing explained;
//   a row is one line until it is opened (caveat, question numbers, section,
//   sources, the company card when it is on the page).
// A bar and a tile are <details>: the summary takes the focus and carries the
// whole reading as its label (what the chart head says once and everything the
// small line shows: the unit, the day of the release, the kind, a figure that
// was worked out, the comparison), and opening it shows the definition.
// An address inside a panel the stage filter hides shows that stage.
//
// The section draws inside a try, each panel inside its own, and each chart,
// tile and table inside its own again: one that fails is left out (a table
// leaves a note) and the rest stays. An empty list and a row without a field
// still draw. Every string of the data is escaped before it goes into HTML
// and only http(s) URLs become links.
(() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = url => /^https?:\/\//i.test(String(url || '')) ? esc(url) : '';
  const text = value => typeof value === 'string' ? value.trim() : '';
  const list = value => Array.isArray(value) ? value.filter(item => item !== null && item !== undefined) : [];
  const num = value => typeof value === 'number' && Number.isFinite(value) ? value : null;
  const host = id => document.getElementById(id);
  const said = (...parts) => parts.map(text).filter(Boolean).join(' · ');
  const isDate = value => /^\d{4}-\d{2}-\d{2}$/.test(text(value));
  const time = value => isDate(value) ? '<time datetime="' + esc(text(value)) + '">' + esc(text(value).replace(/-/g, '.')) + '</time>' : esc(text(value));
  const slug = value => String(value).replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const HOSTS = ['stage', 'key', 'count', 'sources'];
  // The kinds of a figure and the shape each has in a chart and on a tile.
  const KINDS = [['실적', 'actual'], ['회사 정의 지표', 'defined'], ['가이던스', 'guidance'], ['경영진 추정', 'estimate']];
  const kindOf = row => (KINDS.find(kind => kind[0] === text(row.kind)) || KINDS[0])[1];
  const HEADS = ['회사', '날짜', '주제', '내용'];
  const NO_STAGE = '단계 미상';
  const guard = (name, draw) => {
    try {
      return draw();
    } catch (err) {
      console.error('peer-quarters: ' + name + ' not drawn', err);
      return '';
    }
  };

  try {
    const panelsHost = host('peer-quarters-panels');
    if (panelsHost) {
      const data = typeof peerQuarters === 'undefined' ? null : peerQuarters;
      if (!data || !Array.isArray(data.metrics)) throw new Error('peerQuarters is not loaded');
      const metrics = data.metrics.filter(row => row && typeof row === 'object');
      const notes = list(data.notes).filter(row => row && typeof row === 'object');
      const sources = list(data.sources).filter(source => source && typeof source === 'object' && text(source.title));
      // The stages in the order of the value chain; a stage the list does not name goes after them, and a row
      // without a stage goes to a panel of its own at the end, so every row is drawn and counted.
      const stageOf = row => text(row.stage) || NO_STAGE;
      const stages = [...new Set([...list(data.stages).map(text).filter(Boolean), ...metrics.map(stageOf), ...notes.map(stageOf)])];
      const state = {stage: 'all', open: new Set()};
      const metricsOf = stage => metrics.map((_, i) => i).filter(i => stageOf(metrics[i]) === stage);
      const notesOf = stage => notes.map((_, j) => j).filter(j => stageOf(notes[j]) === stage);
      const namesOf = note => text(note.company).split(' · ').map(name => name.trim()).filter(Boolean);
      // The companies of a count are those with a figure; one a note alone names is not counted.
      const companiesOf = recs => new Set(recs.map(i => text(metrics[i].company)).filter(Boolean));
      const groupNotes = data.group_notes && typeof data.group_notes === 'object' ? data.group_notes : {};
      const basisOf = group => Object.hasOwn(groupNotes, group) ? text(groupNotes[group]) : '';

      // The card value-chain.js built for a ticker (vc-co-<ticker>, or the Yahoo symbol where the card has one).
      // A company without a card on the page gets no link. The link is named as the card is (its heading), so one
      // card has one name wherever it is linked.
      const cardOf = new Map();
      try {
        list(valueChain.segments).forEach(segment => list(segment?.companies).forEach(company => {
          if (text(company?.ticker)) cardOf.set(company.ticker, slug(company.yahoo || company.ticker));
        }));
      } catch (err) { /* value-chain-data.js did not load: the ticker itself is tried */ }
      const cardLink = ticker => {
        const key = text(ticker);
        if (!/^[A-Za-z0-9.-]+$/.test(key)) return '';
        const id = [cardOf.get(key), slug(key)].filter(Boolean).map(part => 'vc-co-' + part).find(candidate => host(candidate));
        if (!id) return '';
        const title = text(host(id).querySelector?.('h3')?.firstChild?.textContent) || key;
        return '<a href="#' + esc(id) + '">' + esc(title) + ' 카드 ↗</a>';
      };

      // -- which observations are one chart
      // What a bar is drawn from: a number is a bar from zero, a range [low, high] a band, anything else no mark.
      const extent = row => {
        const value = row.value;
        if (num(value) !== null) return [Math.min(value, 0), Math.max(value, 0)];
        return Array.isArray(value) && value.length === 2 && num(value[0]) !== null && num(value[1]) !== null && value[0] <= value[1] ? [value[0], value[1]] : null;
      };
      // Same stage, same `group`, same `unit`, and two of them with a mark: a chart of one bar compares nothing.
      // An observation without a group is a tile.
      const bundle = recs => {
        const sets = new Map(), charts = [], tiles = [];
        recs.forEach(i => {
          const row = metrics[i], key = text(row.group) ? text(row.group) + '\n' + text(row.unit) : '';
          if (!key) { tiles.push(i); return; }
          if (!sets.has(key)) sets.set(key, []);
          sets.get(key).push(i);
        });
        sets.forEach(set => {
          if (set.filter(i => extent(metrics[i])).length >= 2) charts.push(set);
          else tiles.push(...set);
        });
        return {charts, tiles: tiles.sort((a, b) => a - b)};
      };

      // -- what a bar and a tile say
      const tag = label => '<em class="pq-tag">' + esc(label) + '</em>';
      const kindTag = row => text(row.kind) && text(row.kind) !== '실적' ? tag(text(row.kind)) : '';
      const day = row => isDate(row.report_date) ? '발표 ' + text(row.report_date).replace(/-/g, '.') : '';
      // The unit is written beside a bare amount ("$18,700") whose wording does not carry it.
      const unitNote = row => {
        const unit = text(row.unit).replace(/\s+/g, ''), wording = text(row.value_text).replace(/\s+/g, '');
        if (!unit || !/^약?[+−-]?\$?[\d,.]+$/.test(wording)) return '';
        const there = unit.startsWith('$') && unit.length > 1 ? wording.includes('$') && wording.includes(unit.slice(1)) : wording.includes(unit);
        return there ? '' : '단위 ' + text(row.unit);
      };
      // The figure as the manuscript writes it. A qualifier after the figure ("$111,500/일·공식 실적발표 기준") goes on a line of its own.
      const figure = row => {
        const wording = text(row.value_text), cut = wording.indexOf('·');
        if (!wording) return '—';
        return cut > 0 && /\d/.test(wording.slice(0, cut)) ? esc(wording.slice(0, cut)) + '<small>' + esc(wording.slice(cut + 1)) + '</small>' : esc(wording);
      };
      const worked = row => row.derived === true && !text(row.metric).includes('계산값');
      // The label of a bar and a tile: all a sighted reader has from the head of the chart and the lines of the mark.
      const reading = row => said(row.company, row.metric, row.value_text, unitNote(row), row.period, day(row), row.kind, worked(row) ? '계산값' : '', row.compare);
      const more = row => {
        const card = cardLink(row.card);
        return '<div class="pq-more">' + (text(row.definition) ? '<p>' + esc(row.definition) + '</p>' : '') +
          '<p class="pq-ref">' + (text(row.section) ? '<span>교재 ' + esc(row.section) + '</span>' : '') + card + '</p></div>';
      };
      // The small line under a figure: `said` is its words (period, day of the release, unit), then the kind, a note
      // that the figure was worked out, and the comparison the manuscript gives.
      const meta = (row, words, kind) => '<span class="pq-meta">' + esc(words) + (kind ? kindTag(row) : '') +
        (worked(row) ? tag('계산값') : '') +
        (text(row.compare) ? '<span class="pq-cmp">' + esc(row.compare) + '</span>' : '') + '</span>';

      // -- a chart: one axis in one unit; a bar is a company, a period or a part
      const chart = set => {
        const rows = set.map(i => metrics[i]), first = rows[0];
        const one = key => new Set(rows.map(row => text(row[key]))).size === 1;
        const sameCompany = one('company'), sameMetric = one('metric');
        // What every bar would repeat is said once at the head: the period, the day of the release and the kind.
        const samePeriod = one('period'), sameDay = one('report_date') && Boolean(day(first)), sameKind = one('kind') && Boolean(kindTag(first));
        const marks = rows.map(extent), drawn = marks.filter(Boolean);
        const low = Math.min(0, ...drawn.map(mark => mark[0])), high = Math.max(0, ...drawn.map(mark => mark[1])), span = high - low || 1;
        const bars = set.map((i, n) => {
          const row = rows[n], mark = marks[n];
          // What tells the bars apart names them: the company, the measure (one company), or the period (one company, one measure).
          const byPeriod = sameCompany && sameMetric;
          const name = byPeriod ? '<b>' + (esc(text(row.period)) || '—') + '</b>'
            : sameCompany ? '<b>' + (esc(text(row.metric)) || '—') + '</b>'
            : '<b>' + (esc(text(row.company)) || '—') + '</b>' + (sameMetric ? '' : '<span>' + esc(text(row.metric)) + '</span>');
          const track = !mark ? '' : '<span class="pq-track">' + (low < 0 ? '<u style="left:' + ((0 - low) / span * 100).toFixed(1) + '%"></u>' : '') +
            '<i style="left:' + ((mark[0] - low) / span * 100).toFixed(1) + '%;width:' + ((mark[1] - mark[0]) / span * 100).toFixed(1) + '%"></i></span>';
          return '<details class="pq-bar' + (!mark ? ' pq-nobar' : Array.isArray(row.value) ? ' pq-range' : '') + '" data-kind="' + kindOf(row) + '" data-metric="' + i + '">' +
            '<summary aria-label="' + esc(reading(row)) + '" title="' + esc(reading(row)) + '"><span class="pq-name">' + name + '</span>' +
            '<span class="pq-val">' + figure(row) + '</span>' + track + meta(row, said(byPeriod || samePeriod ? '' : row.period, sameDay ? '' : day(row)), !sameKind) + '</summary>' + more(row) + '</details>';
        }).join('');
        const of = said(sameCompany ? first.company : '', sameMetric && text(first.metric) !== text(first.group) ? first.metric : '', samePeriod ? first.period : '', sameDay ? day(first) : '');
        return '<div class="pq-chart" role="group" aria-label="' + esc(said(first.group, first.unit)) + '" data-bars="' + set.length + '">' +
          '<div class="pq-chart-head"><h4>' + esc(text(first.group)) + (sameKind ? kindTag(first) : '') + '</h4>' + (text(first.unit) ? '<span class="pq-unit">' + esc(first.unit) + '</span>' : '') + '</div>' +
          (of ? '<p class="pq-of">' + esc(of) + '</p>' : '') + (basisOf(text(first.group)) ? '<p class="pq-basis">' + esc(basisOf(text(first.group))) + '</p>' : '') +
          '<div class="pq-bars">' + bars + '</div></div>';
      };

      // -- the tiles: the observations no chart takes, under their company
      const tile = i => {
        const row = metrics[i];
        return '<details class="pq-tile" data-kind="' + kindOf(row) + '" data-metric="' + i + '"><summary aria-label="' + esc(reading(row)) + '" title="' + esc(reading(row)) + '">' +
          '<span class="pq-name">' + (esc(text(row.metric)) || '—') + '</span><b class="pq-val' + (/\d/.test(text(row.value_text)) ? '' : ' pq-words') + '">' + figure(row) + '</b>' + meta(row, said(row.period, day(row), unitNote(row)), true) + '</summary>' + more(row) + '</details>';
      };
      const tilesByCompany = recs => {
        const groups = new Map();
        recs.forEach(i => {
          const name = text(metrics[i].company);
          if (!groups.has(name)) groups.set(name, []);
          groups.get(name).push(i);
        });
        return [...groups].map(([name, members]) => {
          const drawn = members.map(i => guard('tile ' + text(metrics[i].id), () => tile(i))).join('');
          return drawn ? '<div class="pq-co"><h4>' + (esc(name) || '—') + '</h4><div class="pq-tiles">' + drawn + '</div></div>' : '';
        }).join('');
      };

      // -- the folded table of what the calls explained
      const cell = (label, html) => '<td data-label="' + esc(label) + '">' + (html || '') + '</td>';
      const block = (label, html) => html ? '<div><b>' + esc(label) + '</b>' + html + '</div>' : '';
      const para = value => text(value) ? '<p>' + esc(value) + '</p>' : '';
      const linked = source => {
        const url = safeUrl(source.url), title = text(source.title);
        return '<li>' + (url ? '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + esc(title) + ' ↗</a>' : esc(title)) + '</li>';
      };
      const noteDetail = note => {
        const names = namesOf(note);
        const own = sources.filter(source => text(source.section) === text(note.section) && names.includes(text(source.company)));
        const days = note.dates && typeof note.dates === 'object' ? Object.entries(note.dates).filter(([name, day]) => text(name) && text(day)) : [];
        const cards = list(note.cards).map(ticker => cardLink(ticker)).filter(Boolean);
        return block('주의', para(note.caveat)) + block('질의응답', para(note.qa)) +
          block('회사별 날짜', days.length ? '<p>' + days.map(([name, day]) => esc(name) + ' ' + time(day)).join(' · ') + '</p>' : '') +
          block('원자료', (own.length ? '<ul class="rc-sources">' + own.map(linked).join('') + '</ul>' : '') + (text(note.section) ? '<small>교재 ' + esc(note.section) + '</small>' : '')) +
          block('기업 카드', cards.length ? '<p class="rc-cards">' + cards.join(' ') + '</p>' : '');
      };
      // A row is built once, cut in two around the value of aria-expanded.
      const builtNotes = new Map();
      const noteRow = j => {
        const note = notes[j];
        return ['<th scope="row">' + (esc(text(note.company)) || '—') + '</th>' + cell('날짜', time(note.date)) +
            '<td data-label="주제"><button type="button" class="rc-toggle" data-toggle="' + j + '" aria-expanded="',
          '"><b>' + (esc(text(note.topic)) || '—') + '</b></button></td>' + cell('내용', esc(text(note.text))),
          noteDetail(note)];
      };
      const pair = (j, open) => {
        const [before, after, detail] = builtNotes.get(j);
        return '<tr class="rc-row" data-row="' + j + '"' + (open ? ' data-open' : '') + '>' + before + open + after + '</tr>' +
          '<tr class="rc-more" data-more="' + j + '"' + (open ? '' : ' hidden') + '><td colspan="' + HEADS.length + '"><div class="rc-detail">' + detail + '</div></td></tr>';
      };
      const drawNotes = n => {
        const el = host('peer-quarters-notes-' + n);
        if (!el) return;
        try {
          const rows = notesOf(stages[n]);
          rows.forEach(j => { if (!builtNotes.has(j)) builtNotes.set(j, noteRow(j)); });
          el.innerHTML = '<div class="table-scroll"><table class="market-table text-table rc-table pq-table"><thead><tr>' +
            HEADS.map(head => '<th scope="col">' + esc(head) + '</th>').join('') + '</tr></thead><tbody>' + rows.map(j => pair(j, state.open.has(j))).join('') + '</tbody></table></div>';
        } catch (err) {
          console.error('peer-quarters: notes of ' + stages[n] + ' not drawn', err);
          el.innerHTML = '<p class="note">설명을 불러오지 못했다.</p>';
        }
      };

      // -- a panel a stage
      const tally = (recs, noted) => '회사 ' + companiesOf(recs).size + ' · 관측 ' + recs.length + ' · 설명 ' + noted.length;
      const panel = n => {
        const recs = metricsOf(stages[n]), noted = notesOf(stages[n]), {charts, tiles} = bundle(recs);
        const pictures = charts.map(set => guard('chart ' + text(metrics[set[0]].group), () => chart(set))).join('');
        const figures = tilesByCompany(tiles);
        return '<article class="panel pq-stage" id="peer-quarters-s' + n + '" data-stage="' + n + '">' +
          '<div class="panel-head"><h3><span class="pq-step">' + (n + 1) + '</span>' + esc(stages[n]) + '</h3><span class="meta">' + tally(recs, noted) + '</span></div>' +
          (pictures || figures ? '<div class="pq-body' + (pictures && figures ? '' : ' pq-solo') + '">' +
            (pictures ? '<div class="pq-charts">' + pictures + '</div>' : '') + (figures ? '<div class="pq-cos">' + figures + '</div>' : '') + '</div>' : '') +
          (noted.length ? '<details class="method pq-notes"><summary>콜에서 설명한 내용 <b>' + noted.length + '</b>건</summary><div id="peer-quarters-notes-' + n + '"></div></details>' : '') +
          '</article>';
      };
      const drawn = stages.map((_, n) => guard('panel ' + stages[n], () => panel(n)));
      panelsHost.innerHTML = drawn.join('') || '<p class="note">자료가 없다.</p>';
      stages.forEach((_, n) => { if (drawn[n]) drawNotes(n); });

      // -- the stage strip: the chain in order, the counts, and the one filter
      const stageHost = host('peer-quarters-stage');
      const pill = (key, label, recs) => '<button type="button" data-key="' + key + '" aria-pressed="' + (String(key) === state.stage) + '"><span>' + esc(label) + '</span>' +
        '<em>회사 <b>' + companiesOf(recs).size + '</b> · 관측 <b>' + recs.length + '</b></em></button>';
      if (stageHost) stageHost.innerHTML = pill('all', '전체', metrics.map((_, i) => i)) +
        stages.map((stage, n) => drawn[n] ? pill(n, stage, metricsOf(stage)) : '').join('');
      const count = () => {
        const el = host('peer-quarters-count');
        if (!el) return;
        const n = state.stage === 'all' ? -1 : Number(state.stage);
        el.textContent = n < 0 ? stages.length + '단계 · ' + tally(metrics.map((_, i) => i), notes.map((_, j) => j)) : stages[n] + ' · ' + tally(metricsOf(stages[n]), notesOf(stages[n]));
      };
      const show = () => {
        stages.forEach((_, n) => {
          const el = host('peer-quarters-s' + n);
          if (el) el.hidden = state.stage !== 'all' && state.stage !== String(n);
        });
        [...(stageHost?.children || [])].forEach(button => button.setAttribute?.('aria-pressed', String(button.dataset?.key === state.stage)));
        count();
      };
      stageHost?.addEventListener?.('click', event => {
        const button = event.target?.closest?.('button[data-key]');
        if (!button) return;
        // A stage shows its panel alone; pressed again, or 전체, shows them all.
        state.stage = button.dataset.key === state.stage ? 'all' : button.dataset.key;
        show();
      });
      panelsHost.addEventListener?.('click', event => {
        const target = event.target;
        if (!target?.closest || target.closest('a, .rc-more, summary')) return;
        const row = target.closest('tr[data-row]');
        if (!row) return;
        if (typeof getSelection === 'function' && String(getSelection() || '') && !target.closest('button')) return;
        const j = Number(row.dataset.row), n = notes[j] ? stages.indexOf(stageOf(notes[j])) : -1;
        if (n < 0) return;
        if (!state.open.delete(j)) state.open.add(j);
        drawNotes(n);
        host('peer-quarters-notes-' + n)?.querySelector?.('[data-toggle="' + j + '"]')?.focus?.({preventScroll: true});
      });

      // An address inside a panel the filter hides (the panel itself, its table of notes) shows that stage: a link
      // or a typed hash would otherwise land on nothing. workspace.js, which loads after this script, then scrolls to it.
      const unhide = id => {
        try {
          if (state.stage === 'all' || !id) return;
          const n = host(id)?.closest?.('.pq-stage')?.dataset?.stage ?? (/^peer-quarters-(?:s|notes-)(\d+)$/.exec(id) || [])[1];
          if (n === undefined || String(n) === state.stage || !host('peer-quarters-s' + n)) return;
          state.stage = String(n);
          show();
        } catch (err) { /* an address that is no id of this section */ }
      };
      const named = hash => { try { return decodeURIComponent(String(hash || '').replace(/^#/, '')); } catch (err) { return ''; } };
      if (typeof window !== 'undefined') ['hashchange', 'popstate'].forEach(type => window.addEventListener?.(type, () => unhide(named(location.hash))));
      document.addEventListener?.('click', event => unhide(named(event.target?.closest?.('a[href^="#"]')?.getAttribute?.('href'))));

      const keyHost = host('peer-quarters-key');
      if (keyHost) keyHost.innerHTML = KINDS.map(([label, kind]) => '<span><i class="pq-sw" data-kind="' + kind + '" aria-hidden="true"></i>' + esc(label) + '</span>').join('');

      // The documents behind each section, folded at the end.
      const sourcesHost = host('peer-quarters-sources');
      if (sourcesHost) {
        const bySection = new Map();
        sources.forEach(source => {
          const key = text(source.section);
          if (!bySection.has(key)) bySection.set(key, []);
          bySection.get(key).push(source);
        });
        sourcesHost.innerHTML = [...bySection].map(([section, items]) => '<div class="rr-src">' + (section ? '<b>교재 ' + esc(section) + '</b>' : '') +
          '<ul class="rc-sources">' + items.map(linked).join('') + '</ul></div>').join('');
        if (!sources.length) (sourcesHost.closest?.('details') || sourcesHost).hidden = true;
      }
      show();
    }
  } catch (err) {
    console.error('peer-quarters: 분기 비교 not drawn', err);
    HOSTS.forEach(key => {
      const el = host('peer-quarters-' + key);
      if (!el) return;
      el.innerHTML = '';
      el.textContent = '';
      // The folded list would open on nothing.
      const box = key === 'sources' ? el.closest?.('details') : null;
      if (box) box.hidden = true;
    });
    const el = host('peer-quarters-panels');
    if (el) el.innerHTML = '<p class="note">분기 비교를 불러오지 못했다.</p>';
  }
})();
