'use strict';
// 참조 자료 (reference-charts.js). The tables and figures the textbook manuscript
// sent to the dashboard and that no other panel carries. index.html holds the
// sections (heading, one sentence, an empty host #<section>-panels) in the views
// they belong to; this script fills the hosts from energyReference of
// reference-data.js: `layout` says which datasets a panel of a section holds,
// `datasets` are the values. One renderer draws every dataset by its `kind`:
//   bars     one unit, one basis: a horizontal bar a row, in the order of the rows.
//            `row_tags` colour the bars and name the colours in a legend
//   grouped  a row has two or more series of one unit, side by side, never stacked
//   stacked  the parts of one whole: a strip of the parts and a bar a part. The
//            whole (`total`) is the figure the manuscript wrote; it is in the
//            head and never a part. Two or three parts are the strip and its
//            legend, without bars. A part has its own colour while the palette
//            lasts, else all are one colour; `highlight` names the one part that
//            keeps the second colour among parts of the first. `group_column`
//            colours the parts by group, a block a group, and the dataset that
//            says `subtotal_of` gives the figures of the groups.
//   series   in time: columns from a zero line. With `series_axis: "columns"` a
//            row is one small chart on its own scale (the columns are the periods)
//   tile     one figure
//   table    words: folded. Figures a cell holds (`row_numbers`) stand above it
//   links    documents: folded; the first cell is the link
// A bar is as long as the number is far from zero; a number below zero is
// hatched. A panel whose first chart is much taller than the rest says `lead`:
// that chart takes the left column and the others stack on the right. A panel
// that says `scale: "shared"` draws its bars of one unit on one scale, and its
// `note` is a sentence under its head.
// A dataset is one unit: nothing here adds, converts or puts two datasets on one
// axis. A figure is written as the manuscript writes it (`labels`); the number
// in `rows` only sets the length of the bar. Under a chart: the date (`as_of`),
// the day of publication (`published`) and the source on one line, the first
// sentence of the note, and the rest folded. A sentence is said once.
// Each section, panel and dataset draws inside its own try: one that fails is
// left out and the rest stays. A missing field, an empty list and a cell without
// a number still draw. Every string of the data is escaped and only http(s) URLs
// become links. Nothing but a link, a <summary> and a scrolling table takes the
// keyboard focus: the rows are read as the text they are. Runs before
// workspace.js and after the scripts that build the panels it links to.
(() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = url => /^https?:\/\//i.test(String(url || '')) ? esc(url) : '';
  const text = value => typeof value === 'string' ? value.trim() : '';
  const list = value => Array.isArray(value) ? value : [];
  const num = value => typeof value === 'number' && Number.isFinite(value) ? value : null;
  const host = id => document.getElementById(id);
  const fmt = value => value.toLocaleString('en-US', {maximumFractionDigits: 5});
  const cell = value => num(value) !== null ? fmt(value) : text(value);
  const DATE = /(\d{4})-(\d{2})(?:-(\d{2}))?/g;
  const dotted = value => text(value).replace(DATE, (m, y, mo, d) => y + '.' + mo + (d ? '.' + d : ''));
  // The days of a date field as a sentence writes them (2026-08-31 -> 2026년 8월 31일).
  const spoken = value => [...text(value).matchAll(DATE)].map(([, y, mo, d]) => y + '년 ' + Number(mo) + '월' + (d ? ' ' + Number(d) + '일' : ''));
  const sentences = value => text(value).replace(/다\.\s+/g, '다.\n').split('\n').filter(Boolean);
  const pct = value => (Math.round(Math.max(0, Math.min(100, value)) * 100) / 100) + '%';
  const slug = value => String(value).replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const KINDS = ['bars', 'grouped', 'stacked', 'series', 'tile', 'table', 'links'];
  const PALETTE = 6;
  const fail = (what, err) => console.error('reference-charts: ' + what + ' not drawn', err);

  try {
    const data = typeof energyReference === 'undefined' ? null : energyReference;
    if (!data || typeof data !== 'object') return;
    const byKey = new Map();
    list(data.datasets).forEach(ds => { if (ds && typeof ds === 'object' && text(ds.id)) byKey.set(ds.id, ds); });
    const subtotals = new Map();
    byKey.forEach(ds => { if (text(ds.subtotal_of)) subtotals.set(ds.subtotal_of, ds); });

    // The numeric columns of a dataset, and what a cell of them shows and measures.
    const numeric = ds => list(ds.numeric_columns).filter(c => Number.isInteger(c) && c >= 0);
    const nameOf = row => cell(list(row)[0]);
    const shown = (ds, i, k) => {
      const written = text(list(list(ds.labels)[i])[k]);
      const value = num(list(list(ds.rows)[i])[numeric(ds)[k]]);
      const base = written || (value === null ? '' : (ds.approx === true ? '약 ' : '') + fmt(value));
      // A figure that says how far below a basis.
      return base && text(ds.direction) === 'lower' ? base + ' 낮음' : base;
    };
    const unitOf = ds => text(ds.unit);
    const withUnit = (ds, written) => written && unitOf(ds) && !written.includes(unitOf(ds)) ? written + ' ' + unitOf(ds) : written;
    // A column head without the unit the chart head already carries (미국 전체·천 b/sd -> 미국 전체).
    const seriesName = (ds, c) => {
      const head = text(list(ds.columns)[c]), unit = unitOf(ds);
      return unit && head.endsWith('·' + unit) ? head.slice(0, -unit.length - 1) : head;
    };
    // The cells of a row that are words: short ones sit beside the name, long ones go under the fold.
    const words = (ds, row, skip) => list(ds.columns).map((head, c) => [text(head), list(row)[c], c])
      .filter(([, value, c]) => c > 0 && c !== skip && !numeric(ds).includes(c) && text(value));
    const SHORT = 22;
    const brief = value => text(value).length <= SHORT && !text(value).endsWith('.');
    const beside = (ds, row, skip) => words(ds, row, skip).filter(([, value]) => brief(value))
      .map(([, value]) => '<small>' + esc(text(value)) + '</small>').join('');
    const rowNote = (ds, row) => {
      const notes = ds.row_notes && typeof ds.row_notes === 'object' ? ds.row_notes : {};
      return Object.hasOwn(notes, nameOf(row)) ? text(notes[nameOf(row)]) : '';
    };
    const tagOf = (ds, row) => {
      const tags = ds.row_tags && typeof ds.row_tags === 'object' ? ds.row_tags : {};
      return Object.hasOwn(tags, nameOf(row)) ? text(tags[nameOf(row)]) : '';
    };
    const tagsOf = ds => [...new Set(list(ds.rows).map(row => tagOf(ds, row)).filter(Boolean))];
    // The longest bar of a chart: its own largest number, or that of the panel when the panel shares one scale.
    const scales = new Map();
    const reach = ds => Math.max(0, ...list(ds.rows).flatMap(row => numeric(ds).map(c => Math.abs(num(list(row)[c]) ?? 0))));
    const topOf = ds => Math.max(reach(ds), scales.get(ds) ?? 0);

    const sourceLinks = ds => list(ds.sources).filter(s => s && text(s.title)).map(s => safeUrl(s.url)
      ? '<a href="' + safeUrl(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(text(s.title)) + '</a>' : esc(text(s.title)));
    // The date a figure stands for and the day it was published. The date is left out only beside a sentence that names every day of it.
    const when = (ds, beside) => {
      const asOf = text(ds.as_of), days = spoken(asOf);
      const named = days.length > 0 && days.every(day => beside.includes(day));
      return [asOf && !named ? (/기준|보고기간/.test(asOf) ? '' : '기준 ') + dotted(asOf) : '', text(ds.published) ? '공표 ' + dotted(ds.published) : ''].filter(Boolean);
    };
    // The date and the source on one line. A dataset without a source document says where it comes from in `basis`.
    const sourceLine = ds => {
      const links = sourceLinks(ds), said = links.length ? '' : sentences(ds.basis)[0] || '';
      const parts = when(ds, said).map(esc).concat(links.length ? '출처 ' + links.join(', ') : esc(said)).filter(Boolean);
      return parts.length ? '<p class="rf-src">' + parts.join(' · ') + '</p>' : '';
    };
    const where = ds => [text(ds.section) ? '교재 ' + text(ds.section) : '', text(ds.figure)].filter(Boolean).join(' · ');
    // A sentence is said once: `said` holds the sentences already on the page and takes the ones a paragraph adds.
    const fresh = (value, said) => sentences(value).filter(sentence => !said.has(sentence) && said.add(sentence));
    const para = (value, said, cls) => {
      const left = fresh(value, said);
      return left.length ? '<p' + (cls ? ' class="' + cls + '"' : '') + '>' + esc(left.join(' ')) + '</p>' : '';
    };
    // The sentences the source line of a chart or a table has shown.
    const lineSaid = ds => new Set(sourceLinks(ds).length ? [] : sentences(ds.basis).slice(0, 1));
    // What follows the basis and the note under a fold: the formula, the notes of the rows (without a sentence the
    // paragraphs above have said), the long cells of words (`cells` false: a table has them in its cells), what the
    // figure leaves out, the figures and assumptions beside the table, the sources and the section of the textbook.
    const rest = (ds, said, cells) => {
      const out = [], above = new Set(said), unsaid = value => sentences(value).filter(sentence => !above.has(sentence)).join(' ');
      if (text(ds.formula)) out.push('<p>' + esc(text(ds.formula)) + '</p>');
      const lines = [];
      list(ds.rows).forEach(row => {
        const note = unsaid(rowNote(ds, row));
        if (note) lines.push('<li><b>' + esc(nameOf(row)) + '</b> ' + esc(note) + '</li>');
        if (!cells) words(ds, row, ds.group_column).filter(([, value]) => !brief(value) && unsaid(value))
          .forEach(([head, value]) => lines.push('<li><b>' + esc(nameOf(row)) + '</b> ' + esc(head) + ': ' + esc(unsaid(value)) + '</li>'));
      });
      list(ds.excluded).forEach(x => { if (x && text(x.label)) lines.push('<li><b>' + esc(text(x.label)) + ' ' + esc(text(x.text)) + '</b> ' + esc(text(x.why)) + '</li>'); });
      list(ds.extra_values).concat(list(ds.assumptions)).forEach(x => {
        if (x && text(x.label)) lines.push('<li><b>' + esc(text(x.label)) + ' ' + esc(text(x.text)) + '</b> ' + esc(text(x.note) || text(x.nature)) + '</li>');
      });
      if (lines.length) out.push('<ul class="rf-list">' + lines.join('') + '</ul>');
      const links = sourceLinks(ds);
      const foot = [links.length ? '출처 ' + links.join(', ') : '', esc(where(ds))].filter(Boolean).join(' · ');
      if (foot) out.push('<p class="rf-foot">' + foot + '</p>');
      return out.join('');
    };
    const legend = items => items.length ? '<div class="rf-legend">' + items.map(([name, c]) =>
      '<span><i class="rf-sw" data-c="' + c + '"></i>' + esc(name) + '</span>').join('') + '</div>' : '';
    // The frame of a chart: title and unit, the date and source line, the picture, one sentence of the note, and under
    // the fold the rest of the basis and of the note. The title is one level under the head of its panel.
    let level = 'h4';
    const frame = (ds, body, extra) => {
      const said = lineSaid(ds), first = para(sentences(ds.note)[0] || '', said, 'rf-note');
      const inner = para(ds.basis, said) + para(ds.note, said) + rest(ds, said, false);
      const label = [text(ds.title), unitOf(ds) ? '단위 ' + unitOf(ds) : ''].filter(Boolean).join(', ');
      return '<figure class="rf-chart" data-id="' + esc(text(ds.id)) + '" data-kind="' + esc(text(ds.kind)) + '" role="group" aria-label="' + esc(label) + '">' +
        '<figcaption class="rf-head"><' + level + '>' + esc(text(ds.title)) + '</' + level + '>' + (unitOf(ds) ? '<span class="rf-unit">' + esc(unitOf(ds)) + '</span>' : '') + '</figcaption>' +
        sourceLine(ds) + (extra || '') + body + first +
        (inner ? '<details class="method rf-more"><summary>해석 기준·출처</summary>' + inner + '</details>' : '') + '</figure>';
    };
    // A bar: the picture of the figure written beside it, so it is hidden from a screen reader.
    const track = (share, c, below) => '<span class="rf-track' + (below ? ' rf-neg' : '') + '" aria-hidden="true"><i' + (c === '' ? '' : ' data-c="' + c + '"') +
      ' style="width:' + pct(share) + '"></i></span>';

    // bars: a row is a bar from zero on the one scale of the chart.
    const bars = ds => {
      const k = numeric(ds)[0];
      const rows = list(ds.rows), values = rows.map(row => num(list(row)[k]));
      const top = topOf(ds), tags = tagsOf(ds);
      const body = rows.map((row, i) => {
        const value = values[i], tag = tagOf(ds, row);
        // A colour says a tag: a row without one among tagged rows is grey, not the colour of the first tag.
        const c = !tags.length ? '' : tag ? tags.indexOf(tag) % PALETTE : 'none';
        return '<div class="rf-row' + (value === null ? ' rf-nobar' : '') + '">' +
          '<span class="rf-name">' + esc(nameOf(row)) + beside(ds, row) + (tag ? '<small class="rf-tag">' + esc(tag) + '</small>' : '') + '</span>' +
          '<span class="rf-val">' + (esc(shown(ds, i, 0)) || '—') + '</span>' +
          (value === null || !top ? '' : track(Math.abs(value) / top * 100, c, value < 0)) + '</div>';
      }).join('');
      return frame(ds, '<div class="rf-rows" data-rows="' + rows.length + '">' + body + '</div>', legend(tags.map((tag, c) => [tag, c % PALETTE])));
    };

    // grouped: the series of a row side by side on one scale; they are not parts of a whole.
    const grouped = ds => {
      const cols = numeric(ds), rows = list(ds.rows), top = topOf(ds);
      // The figures of a chart share one column, as wide as the longest of them (a Korean letter is two wide), so
      // the bars line up. A figure written out in words goes under its bar instead.
      const wide = written => [...written].reduce((n, ch) => n + (ch.charCodeAt(0) > 0x2E7F ? 2 : 1), 0), LONG = 14;
      const body = rows.map((row, i) => '<div class="rf-row rf-set"><span class="rf-name">' + esc(nameOf(row)) + beside(ds, row) + '</span>' + cols.map((c, k) => {
        const value = num(list(row)[c]);
        return '<span class="rf-line' + (value === null ? ' rf-nobar' : '') + (wide(shown(ds, i, k)) > LONG ? ' rf-long' : '') + '" data-series="' + k + '">' +
          (value === null || !top ? '<span class="rf-track rf-none" aria-hidden="true"></span>' : track(Math.abs(value) / top * 100, k % PALETTE, value < 0)) +
          '<span class="rf-val">' + (esc(shown(ds, i, k)) || '—') + '</span></span>';
      }).join('') + '</div>').join('');
      const column = Math.max(4, ...rows.flatMap((row, i) => cols.map((c, k) => wide(shown(ds, i, k)))).filter(n => n <= LONG));
      return frame(ds, '<div class="rf-rows" data-rows="' + rows.length + '" data-series="' + cols.length + '" style="--val:' + column + 'ch">' + body + '</div>',
        legend(cols.map((c, k) => [seriesName(ds, c), k % PALETTE])));
    };

    // stacked: the parts of one whole. The strip is the composition; the bars under it are the parts on one scale.
    const totalLine = ds => {
      const total = ds.total && typeof ds.total === 'object' ? ds.total : null;
      const written = total ? text(total.text) || (num(total.value) === null ? '' : fmt(total.value)) : '';
      return written ? '<p class="rf-total">' + esc(text(total.label) || '합계') + ' <b>' + esc(written) + '</b>' +
        (unitOf(ds) && !written.includes(unitOf(ds)) ? ' <span>' + esc(unitOf(ds)) + '</span>' : '') + '</p>' : '';
    };
    const FEW = 3;
    const stackedRows = ds => {
      const k = numeric(ds)[0], g = Number.isInteger(ds.group_column) ? ds.group_column : -1;
      const rows = list(ds.rows), values = rows.map(row => num(list(row)[k]));
      // Parts make a whole only when none is below zero: otherwise there is no strip, only the bars.
      const whole = values.every(value => value === null || value >= 0);
      const sum = values.reduce((a, v) => a + (v ?? 0), 0), top = topOf(ds);
      const groups = g < 0 ? [] : [...new Set(rows.map(row => text(list(row)[g])))];
      const marked = g < 0 ? text(ds.highlight) : '';
      // Colour: by group; the first colour with the second for the highlighted part; a colour a part while the
      // palette lasts; else one colour, the parts told apart by the lines between them and the rows under the strip.
      const plain = g < 0 && !marked && rows.length > PALETTE;
      const colour = (row, i) => g >= 0 ? groups.indexOf(text(list(row)[g])) % PALETTE : marked ? (nameOf(row) === marked ? 1 : 0) : plain ? 0 : i;
      const strip = whole && sum > 0 ? '<div class="rf-strip" aria-hidden="true">' + rows.map((row, i) => {
        const share = (values[i] ?? 0) / sum * 100;
        return values[i] === null ? '' : '<i class="rf-seg" data-c="' + colour(row, i) + '" style="width:' + pct(share) + '" title="' + esc(nameOf(row) + ' ' + shown(ds, i, 0)) + '">' +
          esc(share >= 12 ? shown(ds, i, 0) : '') + '</i>';
      }).join('') + '</div>' : '';
      // Two or three parts are read off the strip: the rows are its legend and carry no bar of their own.
      const few = Boolean(strip) && g < 0 && rows.length <= FEW;
      const sub = subtotals.get(text(ds.id));
      const subText = name => {
        const at = sub ? list(sub.rows).findIndex(row => nameOf(row) === name) : -1;
        return at < 0 ? '' : shown(sub, at, 0);
      };
      const part = (row, i) => '<div class="rf-row rf-part' + (values[i] === null ? ' rf-nobar' : '') + '">' +
        '<span class="rf-name">' + (plain ? '' : '<i class="rf-sw" data-c="' + colour(row, i) + '"></i>') + esc(nameOf(row)) + beside(ds, row, g) + '</span>' +
        '<span class="rf-val">' + (esc(shown(ds, i, 0)) || '—') + '</span>' +
        (few || values[i] === null || !top ? '' : track(Math.abs(values[i]) / top * 100, colour(row, i), values[i] < 0)) + '</div>';
      // A group is one block (its head, then its parts), so a column never starts in the middle of a group.
      const body = g < 0 ? rows.map(part).join('') : groups.map(name =>
        '<div class="rf-groupset"><div class="rf-group" data-group="' + esc(name) + '"><i class="rf-sw" data-c="' + (groups.indexOf(name) % PALETTE) + '"></i><b>' + esc(name) + '</b>' +
        (subText(name) ? '<span class="rf-val">' + esc(subText(name)) + '</span>' : '') + '</div>' +
        rows.map((row, i) => text(list(row)[g]) === name ? part(row, i) : '').join('') + '</div>').join('');
      return frame(ds, strip + '<div class="rf-rows' + (few ? ' rf-key' : '') + '" data-rows="' + rows.length + '"' + (g < 0 ? '' : ' data-groups="' + groups.length + '"') + '>' + body + '</div>', totalLine(ds));
    };
    // The parts of a whole are one column of numbers. More columns are series side by side, which are never stacked.
    const stacked = ds => numeric(ds).length > 1 ? grouped(ds) : stackedRows(ds);

    // series: columns from the zero line, in time. `points` are [period, value, figure as written].
    const columns = (points, small) => {
      const values = points.map(p => p[1] ?? 0), hi = Math.max(0, ...values), lo = Math.min(0, ...values), span = hi - lo;
      return '<span class="rf-cols' + (small ? ' rf-small' : '') + '">' + points.map(([period, value, written]) => {
        const size = value === null || !span ? 0 : Math.abs(value) / span * 100;
        const from = value === null || !span ? 0 : (Math.min(value, 0) - lo) / span * 100;
        return '<span class="rf-col' + (value === null ? ' rf-nobar' : '') + '"><em>' + (esc(written) || '—') + '</em>' +
          '<span class="rf-plot" aria-hidden="true">' + (value === null ? '' : '<i' + (value < 0 ? ' class="rf-neg"' : '') + ' style="bottom:' + pct(from) + ';height:' + pct(size) + '"></i>') +
          (lo < 0 ? '<u style="bottom:' + pct(-lo / span * 100) + '"></u>' : '') + '</span><small>' + esc(period) + '</small></span>';
      }).join('') + '</span>';
    };
    const series = ds => {
      const cols = numeric(ds), rows = list(ds.rows);
      if (text(ds.series_axis) === 'columns') {
        const body = rows.map((row, i) => '<div class="rf-mini"><b>' + esc(nameOf(row)) + beside(ds, row) + '</b>' +
          columns(cols.map((c, k) => [seriesName(ds, c), num(list(row)[c]), shown(ds, i, k)]), true) + '</div>').join('');
        return frame(ds, '<div class="rf-minis" data-rows="' + rows.length + '" data-series="' + cols.length + '">' + body + '</div>' +
          '<p class="rf-scale">세로 눈금은 행마다 따로 잡았다.</p>');
      }
      return frame(ds, '<div class="rf-time" data-rows="' + rows.length + '">' + columns(rows.map((row, i) => [nameOf(row), num(list(row)[cols[0]]), shown(ds, i, 0)]), false) + '</div>');
    };

    // tile: one figure. Opening it shows the basis, the note and the source.
    const tile = ds => {
      const row = list(ds.rows)[0] || [], written = shown(ds, 0, 0), unit = unitOf(ds);
      const tail = written && unit && !written.includes(unit) ? '<small> ' + esc(unit) + '</small>' : '';
      const assumed = list(ds.assumptions).filter(x => x && text(x.label)).map(x => text(x.label) + ' ' + text(x.text)).join(', ');
      const meta = when(ds, '').concat(assumed).filter(Boolean);
      // The name of the summary holds all it shows (the name, the figure with its unit, the dates, the assumption) and the note of the row.
      const label = [text(ds.title), withUnit(ds, written) || '값 없음'].concat(meta, rowNote(ds, row)).filter(Boolean).join(', ');
      const said = new Set();
      return '<details class="rf-tile' + (written ? '' : ' rf-nobar') + '" data-id="' + esc(text(ds.id)) + '" data-kind="tile"><summary aria-label="' + esc(label) + '">' +
        '<span class="rf-name">' + esc(text(ds.title)) + '</span><b class="rf-val">' + (esc(written) || '—') + tail + '</b>' +
        (meta.length ? '<span class="rf-meta">' + esc(meta.join(' · ')) + '</span>' : '') + '</summary><div class="rf-in">' + para(ds.basis, said) + para(ds.note, said) + rest(ds, said, false) + '</div></details>';
    };

    // table and links: words, folded. The figures a cell holds stand above the fold, each with what it measures.
    const numbers = ds => {
      const of = ds.row_numbers && typeof ds.row_numbers === 'object' ? ds.row_numbers : {};
      const tiles = Object.keys(of).flatMap(name => list(of[name]).filter(x => x && text(x.label) && text(x.text)).map(x =>
        '<div class="rf-num"><span class="rf-name">' + esc(name) + '</span><b class="rf-val">' + esc(text(x.text)) + '</b>' +
        '<span class="rf-meta">' + esc([text(x.label), text(x.as_of)].filter(Boolean).join(' · ')) + '</span>' +
        (text(x.note) ? '<span class="rf-meta rf-scope">' + esc(text(x.note)) + '</span>' : '') + '</div>'));
      return tiles.length ? '<div class="rf-nums" data-for="' + esc(text(ds.id)) + '" data-tiles="' + tiles.length + '">' + tiles.join('') + '</div>' : '';
    };
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
      return id ? ' <a class="rf-card" href="#' + esc(id) + '">기업 카드 ↗</a>' : '';
    };
    // Under the summary: the date and source line, the basis, the table, then the note unbroken and the rest.
    const table = ds => {
      const heads = list(ds.columns).map(text), rows = list(ds.rows), cols = numeric(ds);
      const linked = text(ds.kind) === 'links', at = linked ? heads.indexOf('URL') : -1;
      const cards = ds.cards && typeof ds.cards === 'object' ? ds.cards : {};
      const keep = heads.map((head, c) => c).filter(c => c !== at);
      const value = (row, i, c) => cols.includes(c) ? shown(ds, i, cols.indexOf(c)) || '—' : cell(list(row)[c]);
      const body = rows.map((row, i) => '<tr>' + keep.map((c, n) => {
        if (n) return '<td data-label="' + esc(heads[c]) + '">' + esc(value(row, i, c)) + '</td>';
        const url = at < 0 ? '' : safeUrl(list(row)[at]);
        const name = url ? '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + esc(value(row, i, c)) + '</a>' : esc(value(row, i, c));
        return '<th scope="row">' + name + (linked && Object.hasOwn(cards, nameOf(row)) ? cardLink(cards[nameOf(row)]) : '') + '</th>';
      }).join('') + '</tr>').join('');
      const total = ds.total && typeof ds.total === 'object' && text(ds.total.text) ? '<p class="rf-total">' + esc(text(ds.total.label) || '합계') + ' <b>' + esc(text(ds.total.text)) + '</b></p>' : '';
      const said = lineSaid(ds);
      return numbers(ds) + '<details class="method rf-fold" data-id="' + esc(text(ds.id)) + '" data-kind="' + (linked ? 'links' : 'table') + '" data-rows="' + rows.length + '">' +
        '<summary>' + esc(text(ds.title)) + ' <em>' + rows.length + (linked ? '건' : '행') + '</em></summary>' + sourceLine(ds) + para(ds.basis, said, 'rf-basis') + total +
        '<div class="table-scroll"><table class="market-table text-table rf-table" data-cols="' + keep.length + '"><thead><tr>' + keep.map(c => '<th scope="col">' + esc(heads[c]) + '</th>').join('') +
        '</tr></thead><tbody>' + body + '</tbody></table></div>' + para(ds.note, said, 'rf-note') + rest(ds, said, true) + '</details>';
    };

    const DRAW = {bars, grouped, stacked, series, tile, table, links: table};
    const draw = ds => {
      const kind = text(ds.display) === 'table' || !KINDS.includes(text(ds.kind)) ? 'table' : text(ds.kind);
      // A chart needs a numeric column; a dataset without one is words.
      return (kind === 'table' || kind === 'links' || numeric(ds).length ? DRAW[kind] : table)(ds);
    };
    const slot = ds => text(ds.display) === 'table' || !KINDS.includes(text(ds.kind)) || !numeric(ds).length ? 'folds'
      : text(ds.kind) === 'tile' ? 'tiles' : text(ds.kind) === 'table' || text(ds.kind) === 'links' ? 'folds' : 'charts';
    const BARS = ['bars', 'grouped', 'stacked'];

    const panel = spec => {
      const parts = {tiles: [], charts: [], folds: []};
      // One scale for the bar charts of the panel, when it asks for one and they are of one unit.
      // A dataset that cannot be read leaves the others on their own scales and fails alone below.
      let shared = false;
      try {
        const sets = spec.scale === 'shared' ? list(spec.items).map(key => byKey.get(key)).filter(ds => ds && slot(ds) === 'charts' && BARS.includes(text(ds.kind))) : [];
        if (sets.length > 1 && new Set(sets.map(unitOf)).size === 1) {
          const top = Math.max(...sets.map(reach));
          sets.forEach(ds => scales.set(ds, top));
          shared = true;
        }
      } catch (err) { shared = false; }
      level = text(spec.title) ? 'h4' : 'h3';
      list(spec.items).forEach(key => {
        try {
          const ds = byKey.get(key);
          if (!ds) throw new Error('no dataset ' + key);
          parts[slot(ds)].push(draw(ds));
        } catch (err) { fail(key, err); }
      });
      const links = list(spec.links).filter(link => link && /^[A-Za-z][\w-]*$/.test(text(link.to)) && text(link.label) && host(link.to))
        .map(link => '<a href="#' + esc(link.to) + '">' + esc(text(link.label)) + ' ↗</a>');
      const notes = [text(spec.note), shared && parts.charts.length > 1 ? '이 패널의 막대는 한 눈금으로 그렸다.' : ''].filter(Boolean);
      const body = (parts.tiles.length ? '<div class="rf-tiles">' + parts.tiles.join('') + '</div>' : '') +
        (parts.charts.length ? '<div class="rf-charts" data-charts="' + parts.charts.length + '"' +
          (spec.lead === true && parts.charts.length > 2 ? ' data-lead style="--span:' + (parts.charts.length - 1) + '"' : '') + '>' + parts.charts.join('') + '</div>' : '') +
        (parts.folds.length ? '<div class="rf-folds">' + parts.folds.join('') + '</div>' : '') +
        (links.length ? '<div class="transmission-links">' + links.join('') + '</div>' : '');
      return body ? '<article class="panel rf-panel">' + (text(spec.title) ? '<div class="panel-head"><h3>' + esc(text(spec.title)) + '</h3></div>' : '') +
        (notes.length ? '<p class="rf-pnote">' + esc(notes.join(' ')) + '</p>' : '') + body + '</article>' : '';
    };

    list(data.layout).forEach(entry => {
      const target = entry && /^[A-Za-z][\w-]*$/.test(text(entry.section)) ? host(entry.section + '-panels') : null;
      if (!target) return;
      try {
        target.innerHTML = list(entry.panels).map(spec => {
          try { return spec && typeof spec === 'object' ? panel(spec) : ''; } catch (err) { fail('a panel of ' + entry.section, err); return ''; }
        }).join('') || '<p class="note">표시할 참조 자료가 없다.</p>';
      } catch (err) { fail(entry.section, err); }
    });
  } catch (err) {
    fail('the reference sections', err);
  }
})();
