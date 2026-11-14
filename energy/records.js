'use strict';
// 밸류체인 기업 › 차질·계약 기록: the 차질·복구 대장 (records-disruptions) and the
// 계약·프로젝트 진행표 (records-contracts). index.html holds the two sections with
// their heading, one-line description, 확인 기준 date and empty hosts; this script
// fills the hosts from disruptionRecords and projectRecords of records-data.js.
// recordsAsOf is the last day of the time axes; the date beside the headings is
// written in index.html and test_energy_records.py keeps the two equal.
//
// The pictures come first and the tables are the detail under them.
//   대장: the status counts (they are the colour key and a filter), a map of the
//   rows that have a site (on 세계 the rows of one area are a ring with their
//   count, which opens that area), a timeline with one lane per supply stage
//   (a mark on the day the source came out, a tail back to the event), the
//   six stages as one flow with a stacked bar each (a filter), then the table.
//   진행표: a Gantt of the projects with a target period, announcement day to
//   the end of the period, a short list of the projects without one, the step
//   key (a filter), then the table.
// A table row is one line until it is opened. A mark of a picture is a button:
// on the map and the timeline it opens a small card that leads to the row, on
// the Gantt it opens the row. The marks of the map and of the timeline are one
// stop of the tab order each; the arrow keys move along them. The filters
// narrow the pictures and the table together.
//
// Each panel draws inside its own try, as monitor-chips.js does per chip. A
// constant that did not load or a row that cannot be drawn leaves one note in
// that panel, with no pictures, tiles or filters, and nothing else on the page
// changes; every row is built before anything is put on the page, so a filter
// never meets a broken row. An empty list and a row without a field still draw.
// Each picture also draws inside its own try: one that fails is taken off the
// page and the table stays. The map needs d3 (the projection) and is left out
// without it; the timeline and the Gantt are plain HTML. Every string of the
// data is escaped before it goes into HTML and only http(s) URLs become links.
// The filters follow the page's pill convention (app.js buttons()): a
// role=group of buttons with aria-pressed.
(() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = url => /^https?:\/\//i.test(String(url || '')) ? esc(url) : '';
  const text = value => typeof value === 'string' ? value.trim() : '';
  const list = value => Array.isArray(value) ? value.filter(item => item !== null && item !== undefined) : [];
  const isDate = value => /^\d{4}-\d{2}(-\d{2})?$/.test(text(value));
  // 2026-11-09 -> 2026.11.09; a month (2026-11) and free text ("2026년 3분기") stay readable.
  const dot = value => isDate(value) ? text(value).replace(/-/g, '.') : text(value);
  const time = value => isDate(value) ? '<time datetime="' + esc(text(value)) + '">' + esc(dot(value)) + '</time>' : esc(text(value));
  const host = id => document.getElementById(id);
  const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
  const pct = fraction => (clamp(fraction, 0, 1) * 100).toFixed(2) + '%';
  const said = (...parts) => parts.map(text).filter(Boolean).join(' · ');
  // Days since 1970 of an ISO day, or of the first day of an ISO month; null for anything else.
  const DAY = 864e5;
  const day = value => {
    const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(text(value));
    const at = m ? Date.UTC(+m[1], +m[2] - 1, +(m[3] || 1)) / DAY : NaN;
    return Number.isFinite(at) ? at : null;
  };
  // The last day of an ISO month (a target period ends with its month).
  const dayEnd = value => {
    const m = /^(\d{4})-(\d{2})$/.exec(text(value));
    return m ? Date.UTC(+m[1], +m[2], 1) / DAY - 1 : day(value);
  };
  const ymd = at => { const d = new Date(at * DAY); return [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()]; };
  const monthStart = at => { const [y, m] = ymd(at); return Date.UTC(y, m - 1, 1) / DAY; };
  const nextMonth = at => { const [y, m] = ymd(at); return Date.UTC(y, m, 1) / DAY; };
  const two = n => String(n).padStart(2, '0');
  const asOf = typeof recordsAsOf === 'undefined' ? null : day(recordsAsOf);
  // The width a picture is laid out for. A host that is not shown (its desk or
  // its view is hidden) has no width: the picture is drawn for the fallback.
  // `laid` keeps the width each host was last drawn for, 0 for the fallback,
  // and a host that shows with another width than that is drawn again. So a
  // picture drawn while its host was hidden (the map, when the land outline
  // comes after the reader has left the view) is drawn again when it shows.
  const laid = new Map();
  const widthOf = (el, fallback) => {
    const width = el && el.clientWidth > 0 ? el.clientWidth : 0;
    if (el) laid.set(el, width);
    return width || fallback;
  };
  const onResize = (el, redraw) => {
    if (!el || typeof ResizeObserver === 'undefined') return;
    new ResizeObserver(() => {
      if (el.clientWidth && el.clientWidth !== laid.get(el)) redraw();
    }).observe(el);
  };
  // The width of a label in px, before it is on the page: Latin letters and digits are `narrow`, Korean ones `wide`.
  const letters = (label, narrow, wide) => [...label].reduce((sum, c) => sum + (c.charCodeAt(0) < 128 ? narrow : wide), 0);
  // The note goes in the data host; the pictures, tiles, filters and count are
  // emptied so nothing that can be pressed is left over a panel that was not drawn.
  const fail = (section, controls, name, err) => {
    console.error('records: ' + name + ' not drawn', err);
    controls.forEach(key => {
      const el = host(section + '-' + key);
      if (!el) return;
      el.innerHTML = '';
      el.textContent = '';
      const box = el.closest?.('.rc-fig');
      if (box) box.hidden = true;
    });
    const el = host(section + '-data');
    if (el) el.innerHTML = '<p class="note">기록을 불러오지 못했다.</p>';
  };
  // One picture: a failure takes that picture's box off the page and nothing else.
  const picture = (name, id, draw) => {
    try {
      draw();
    } catch (err) {
      console.error('records: ' + name + ' not drawn', err);
      const el = host(id);
      if (!el) return;
      el.innerHTML = '';
      const box = el.closest?.('.rc-fig') || el;
      box.hidden = true;
    }
  };
  const loaded = (value, name) => {
    if (!Array.isArray(value)) throw new Error(name + ' is not loaded');
    return value.filter(row => row && typeof row === 'object');
  };

  // The six supply stages of the textbook's chapter 1, in order. A record of
  // something outside them (an office building, a fertilizer plant) has no stage.
  const STAGES = ['시추·완결', '생산', '원유 운송', '정유·수소', '제품 출하', '소비·재고'];
  // 계획·전망: a plan or an outlook, by the company or an agency, not something observed.
  const STATUSES = [['open', '진행 중'], ['plan', '계획·전망'], ['resolved', '해소'], ['closed', '폐쇄'], ['unknown', '상태 미상']];
  // Steps a project moves through, then the two states kept apart from them.
  const TRACK = ['MoU', '계약', '투자결정', '건설·시운전', '가동'];
  const OFF_TRACK = ['수리 중', '계획'];
  // The colour of a step (live.css --rc-<name>): a ramp for the five steps, a hue for each of the other three.
  const PHASE_MARK = {'MoU': 't1', '계약': 't2', '투자결정': 't3', '건설·시운전': 't4', '가동': 't5', '수리 중': 'fix', '계획': 'plan', 'none': 'none'};

  const stageKey = row => Number.isInteger(row.stage) && row.stage >= 1 && row.stage <= STAGES.length ? String(row.stage) : 'none';
  const stageLabel = key => key === 'none' ? '6단계 밖' : key + ' ' + STAGES[Number(key) - 1];
  const statusKey = row => STATUSES.some(([key]) => key === row.status) ? row.status : 'unknown';
  const statusLabel = key => (STATUSES.find(([k]) => k === key) || STATUSES[STATUSES.length - 1])[1];
  const phaseKey = row => TRACK.includes(row.phase) || OFF_TRACK.includes(row.phase) ? row.phase : 'none';
  const phaseLabel = key => key === 'none' ? '단계 미기재' : key;
  // A status is a colour and a shape (live.css .rc-mk): the same mark in the
  // counts, on the map, on the timeline, in the card and in the table.
  const mark = status => '<i class="rc-mk" data-st="' + status + '" aria-hidden="true"></i>';
  const swatch = phase => '<i class="rc-sw" data-ph="' + PHASE_MARK[phase] + '" aria-hidden="true"></i>';

  const sections = row => list(row.sections).length ? '<small>교재 ' + esc(list(row.sections).join('·')) + '</small>' : '';
  const sources = row => {
    const items = list(row.sources).filter(source => source && text(source.title));
    if (!items.length) return '';
    return '<ul class="rc-sources">' + items.map(source => {
      const url = safeUrl(source.url);
      return '<li>' + (url ? '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + esc(source.title) + ' ↗</a>' : esc(source.title)) +
        (text(source.qa) ? ' <span class="note">질의응답 ' + esc(source.qa) + '</span>' : '') + '</li>';
    }).join('') + '</ul>';
  };
  // Links to the company cards value-chain.js built (vc-co-<card>). A card
  // that is not on the page gets no link.
  const cards = row => {
    const links = list(row.cards).map(card => {
      const el = /^[A-Za-z0-9-]+$/.test(String(card)) ? host('vc-co-' + card) : null;
      if (!el) return '';
      const name = text(el.querySelector?.('h3')?.firstChild?.textContent) || String(card);
      return '<a href="#vc-co-' + esc(card) + '">' + esc(name) + ' 카드 ↗</a>';
    }).filter(Boolean);
    return links.length ? '<p class="rc-cards">' + links.join(' ') + '</p>' : '';
  };
  // A cell without a value is an empty <td>: live.css writes the dash in it on a wide screen and drops the cell on a phone.
  const cell = (label, html) => '<td data-label="' + esc(label) + '">' + (html || '') + '</td>';
  // One block of an opened row; a field the record does not have gets no block.
  const block = (label, html) => html ? '<div><b>' + esc(label) + '</b>' + html + '</div>' : '';
  const para = value => text(value) ? '<p>' + esc(value) + '</p>' : '';
  // The button that opens a row carries the row's name (the facility, the company).
  // The row is cut in two around the value of aria-expanded, so a row is built
  // once and only that value is filled in when the table is drawn.
  const opener = (i, name) => ['<button type="button" class="rc-toggle" data-toggle="' + i + '" aria-expanded="', '"><b>' + (esc(text(name)) || '—') + '</b></button>'];
  const table = (heads, rows) => rows.length
    ? '<div class="table-scroll"><table class="market-table text-table rc-table"><thead><tr>' + heads.map(head => '<th scope="col">' + esc(head) + '</th>').join('') +
      '</tr></thead><tbody>' + rows.join('') + '</tbody></table></div>'
    : '<p class="note">조건에 맞는 기록이 없다.</p>';
  // A record is two table rows: the one-line summary and, under it, the detail that opens.
  const pair = (i, [before, after, more], open, from, columns) =>
    '<tr class="rc-row' + (from ? ' rc-from' : '') + '" data-row="' + i + '"' + (open ? ' data-open' : '') + '>' + before + open + after + '</tr>' +
    '<tr class="rc-more" data-more="' + i + '"' + (open ? '' : ' hidden') + '><td colspan="' + columns + '"><div class="rc-detail">' + more + '</div></td></tr>';
  // A tile reads label then count ("1 시추·완결 9"); live.css puts the count on top.
  const tile = (key, label, count, active, total, extra) => '<button type="button" data-key="' + esc(key) + '" aria-pressed="' + (key === active) + '"' +
    (count || total ? '' : ' disabled') + '><span>' + esc(label) + '</span><b>' + count + '</b>' + (extra || '') + '</button>';
  const pill = (key, label, count, active, extra) => '<button type="button" data-key="' + esc(key) + '" aria-pressed="' + (key === active) + '">' +
    esc(label) + ' <b>' + count + '</b>' + (extra || '') + '</button>';
  const tally = (rows, keyOf) => rows.reduce((counts, row) => {
    const key = keyOf(row);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
  // One listener per button group; the pressed state moves as in buttons().
  const onPick = (groupId, change) => {
    const group = host(groupId);
    if (!group?.addEventListener) return;
    group.addEventListener('click', event => {
      const button = event.target?.closest?.('button[data-key]');
      if (!button || button.disabled) return;
      [...(group.children || [])].forEach(child => child.setAttribute('aria-pressed', String(child === button)));
      change(button.dataset.key);
    });
  };
  // The counts on a group follow the other filter, and a button at 0 cannot be
  // picked: no pick opens an empty table, so the pressed button is never at 0.
  // 전체 keeps the count of the whole list (`total`) in every group, as the
  // count beside the filters does. `more` redraws what else a button shows
  // (the stacked bar of a stage).
  const recount = (groupId, rows, keyOf, total, more) => {
    const counts = tally(rows, keyOf);
    [...(host(groupId)?.children || [])].forEach(button => {
      const key = button.dataset?.key;
      const count = key === 'all' ? total : counts[key] || 0;
      const figure = button.querySelector?.('b');
      if (figure) figure.textContent = String(count);
      button.disabled = !count && key !== 'all';
      if (more) more(button, key);
    });
  };
  const shown = (id, total, count, unit) => {
    const el = host(id);
    if (el) el.textContent = count === total ? total + unit : total + unit + ' 중 ' + count + unit;
  };
  // ISO dates sort as strings; a month without a day (2026-11) goes after the days of that month.
  const newestFirst = dateOf => (a, b) => {
    const x = text(dateOf(a)), y = text(dateOf(b));
    return x < y ? 1 : x > y ? -1 : 0;
  };
  // A click on a row opens or closes it. A link, the detail under the row and a
  // text selection do not.
  const onRow = (dataHost, toggle) => {
    if (!dataHost?.addEventListener) return;
    dataHost.addEventListener('click', event => {
      const target = event.target;
      if (!target?.closest || target.closest('a, .rc-more')) return;
      const row = target.closest('tr[data-row]');
      if (!row) return;
      if (typeof getSelection === 'function' && String(getSelection() || '') && !target.closest('button')) return;
      toggle(Number(row.dataset.row));
    });
  };
  // After the table is redrawn the button of the row gets the focus back; `show` also brings the row into view.
  const refocus = (dataHost, i, show) => {
    const row = dataHost.querySelector?.('tr[data-row="' + i + '"]');
    if (show) row?.scrollIntoView?.({block: 'center', behavior: 'smooth'});
    row?.querySelector?.('.rc-toggle')?.focus?.({preventScroll: true});
  };
  // The attributes every mark of a picture has: the record it stands for, whether it is the picked one, and its name.
  // On the map and the timeline one mark is the stop of the tab order (`stop`) and the others are reached with the arrow keys.
  const markAttrs = (i, label, picked, stop) => ' data-rec="' + i + '" aria-pressed="' + (i === picked) + '" aria-label="' + esc(label) + '" title="' + esc(label) + '"' +
    (stop === undefined ? '' : ' tabindex="' + (stop ? 0 : -1) + '"');

  // ---- 차질·복구 대장 -------------------------------------------------------
  try {
    const dataHost = host('records-disruptions-data');
    if (dataHost) {
      const rows = loaded(typeof disruptionRecords === 'undefined' ? null : disruptionRecords, 'disruptionRecords')
        .sort(newestFirst(row => row.source_date));
      const state = {stage: 'all', status: 'all', view: 'world', spot: null, picked: null, from: null, open: new Set()};
      const heads = ['자료일', '시설·회사', '단계·유형', '상태', '확인한 내용'];
      // 사건일 is shown where it says something 자료일 does not.
      const eventOf = record => text(record.event_date) && text(record.event_date) !== text(record.source_date) ? text(record.event_date) : '';
      const row = (record, i) => {
        const event = eventOf(record) ? '<small>사건 ' + time(record.event_date) + '</small>' : '';
        const place = [text(record.company), text(record.country)].filter(Boolean).join(' · ');
        const status = statusKey(record);
        const [before, after] = opener(i, record.facility);
        // 자료일 is the date of the source; date_note says when it is another kind of date (확인일).
        return ['<th scope="row">' + (time(record.source_date) || '—') +
            (text(record.date_note) ? '<small>' + esc(record.date_note) + '</small>' : '') + event + '</th>' +
            '<td data-label="시설·회사">' + before,
          after + (place ? '<span class="rc-sub">' + esc(place) + '</span>' : '') + '</td>' +
            cell('단계·유형', '<span class="rc-tags"><span class="status-tag">' + esc(stageLabel(stageKey(record))) + '</span>' +
              (text(record.type) ? '<span class="status-tag">' + esc(record.type) + '</span>' : '') + '</span>') +
            cell('상태', '<span class="rc-state">' + mark(status) + esc(statusLabel(status)) + '</span>') +
            cell('확인한 내용', '<span class="rc-what">' + esc(text(record.what)) + '</span>'),
          block('수치', para(record.figure)) + block('복구', para(record.recovery)) + block('남은 확인', para(record.remaining)) +
            block('대상 범위', para(record.scope)) +
            block('확인 수준·출처', para(record.confidence) + sources(record) + sections(record) + cards(record))];
      };
      const drawn = rows.map(row);
      // What a mark is called: the facility, 자료일, the type, the status and, when it is another day, 사건일.
      const names = rows.map(record => said(record.facility, dot(record.source_date), record.type, statusLabel(statusKey(record)),
        eventOf(record) ? '사건 ' + dot(eventOf(record)) : ''));
      const inStage = record => state.stage === 'all' || stageKey(record) === state.stage;
      const inStatus = record => state.status === 'all' || statusKey(record) === state.status;
      const seen = () => rows.map((_, i) => i).filter(i => inStage(rows[i]) && inStatus(rows[i]));
      const pictures = host('records-disruptions-figures'), card = host('records-disruptions-card');

      // -- the table
      const drawTable = () => {
        dataHost.innerHTML = table(heads, seen().map(i => pair(i, drawn[i], state.open.has(i), state.from === i, heads.length)));
      };
      const toggle = i => {
        if (!state.open.delete(i)) state.open.add(i);
        drawTable();
        refocus(dataHost, i);
      };

      // -- the map: the rows that have a site. On 세계 the rows that would sit on
      // each other are one ring with their count, cut by status; a ring opens the
      // area around it. In an area every row is a mark of its own (the shape and
      // colour are the status, the number is the supply stage) and a place has
      // its name beside its marks.
      const located = record => Number.isFinite(record.lat) && Number.isFinite(record.lon) && Math.abs(record.lat) <= 90 && Math.abs(record.lon) <= 180;
      const sites = rows.map((_, i) => i).filter(i => located(rows[i]));
      const extent = () => {
        if (!sites.length) return [[-128, -42], [156, 63]];
        const lons = sites.map(i => rows[i].lon), lats = sites.map(i => rows[i].lat);
        return [[Math.max(-180, Math.min(...lons) - 9), Math.max(-58, Math.min(...lats) - 7)], [Math.min(180, Math.max(...lons) + 9), Math.min(74, Math.max(...lats) + 6)]];
      };
      // 세계 is fitted to the sites of the ledger, so every located row is on it; the other three are the areas the rows
      // crowd in. 걸프 is the coast from Ras Tanura to Ruwais, with Riyadh at its edge: wide enough to tell its sites apart.
      const VIEWS = {
        world: {label: '세계', bounds: extent(), names: []},
        gulf: {label: '걸프', bounds: [[46, 23.5], [55, 28]], names: [['사우디아라비아', 48.4, 23.9], ['이란', 53.3, 27.9], ['카타르', 51.2, 24.8], ['UAE', 54.3, 23.9]]},
        russia: {label: '유럽·러시아', bounds: [[18, 40], [64, 63]], names: [['러시아', 50, 57.5], ['우크라이나', 31.5, 49], ['카자흐스탄', 58, 48.5], ['흑해', 34, 43.3]]},
        na: {label: '북미', bounds: [[-126, 23], [-66, 52]], names: [['미국', -100, 40], ['캐나다', -100, 50.5], ['멕시코', -103, 25]]}
      };
      // `spot` is the area a ring opened when none of the three holds all its rows.
      const viewKey = () => state.view === 'spot' && state.spot ? 'spot' : state.view in VIEWS ? state.view : 'world';
      const boundsOf = key => key === 'spot' ? state.spot : VIEWS[key].bounds;
      const inView = (record, key) => {
        const [[west, south], [east, north]] = boundsOf(key);
        return record.lon >= west && record.lon <= east && record.lat >= south && record.lat <= north;
      };
      const SIZE = 17, REACH = 24;
      // Rows whose sites are within REACH px of each other on 세계 are one group, drawn at their middle. A group
      // keeps to one area (`areas[n]`, '' outside the three), so the area a ring opens holds all its rows.
      const gather = (spots, areas) => {
        const groups = [];
        spots.forEach(([x, y], n) => {
          const group = groups.find(other => other.area === areas[n] && Math.hypot(other.x - x, other.y - y) < REACH);
          if (!group) { groups.push({x, y, area: areas[n], members: [n]}); return; }
          group.members.push(n);
          group.x += (x - group.x) / group.members.length;
          group.y += (y - group.y) / group.members.length;
        });
        return groups;
      };
      // Marks that would still sit on each other are pushed apart; a thin line leads a moved mark back to its site.
      const spread = (marks, width, height) => {
        marks.forEach(mark => { mark.px = mark.x; mark.py = mark.y; });
        for (let pass = 0; pass < 80; pass++) {
          let moved = false;
          for (let i = 0; i < marks.length; i++) for (let j = i + 1; j < marks.length; j++) {
            const a = marks[i], b = marks[j], room = (a.size + b.size) / 2 + 3;
            let dx = b.px - a.px, dy = b.py - a.py, gap = Math.hypot(dx, dy);
            if (gap >= room) continue;
            if (gap < .01) { dx = Math.cos(i * 2.4 + j); dy = Math.sin(i * 2.4 + j); gap = 1; }
            const push = (room - gap) / 2 + .05;
            a.px -= dx / gap * push; a.py -= dy / gap * push;
            b.px += dx / gap * push; b.py += dy / gap * push;
            moved = true;
          }
          marks.forEach(mark => { mark.px = clamp(mark.px, mark.size / 2 + 1, width - mark.size / 2 - 1); mark.py = clamp(mark.py, mark.size / 2 + 1, height - mark.size / 2 - 1); });
          if (!moved) break;
        }
      };
      // What a group of rows is called: its places (the one with the most rows and how many more), then its rows by status.
      const placesOf = recs => {
        const count = tally(recs.filter(i => text(rows[i].site)), i => text(rows[i].site));
        const places = Object.keys(count).sort((a, b) => count[b] - count[a]);
        return places.length > 2 ? places[0] + ' 외 ' + (places.length - 1) + '곳' : places.join('·');
      };
      const byStatusOf = recs => {
        const counts = tally(recs.map(i => rows[i]), statusKey);
        return STATUSES.filter(([status]) => counts[status]).map(([status, label]) => [status, label, counts[status]]);
      };
      // The ring of a group: one arc per status, as long as its share of the rows.
      const ring = recs => {
        let from = 0;
        return 'conic-gradient(' + byStatusOf(recs).map(([status, , count]) => {
          const to = from + count / recs.length * 100, arc = 'var(--rc-' + (status === 'unknown' ? 'unknown-fill' : status) + ') ' + from.toFixed(1) + '% ' + to.toFixed(1) + '%';
          from = to;
          return arc;
        }).join(',') + ')';
      };
      let land = null;
      const paintMap = () => picture('지도', 'records-disruptions-map', () => {
        const el = host('records-disruptions-map');
        if (!el) return;
        // Without d3 there is no projection: the map and its area buttons are left out and the timeline takes the width.
        if (typeof d3 === 'undefined' || !d3 || !d3.geoMercator || !d3.geoPath) {
          el.innerHTML = '';
          (el.closest?.('.rc-fig') || el).hidden = true;
          return;
        }
        const key = viewKey(), visible = seen();
        const width = widthOf(el, 600), height = Math.round(clamp(width * .54, 210, 340));
        const projection = d3.geoMercator().fitExtent([[12, 12], [width - 12, height - 12]], {type: 'MultiPoint', coordinates: boundsOf(key)});
        projection.clipExtent([[0, 0], [width, height]]);
        const path = d3.geoPath(projection);
        const here = visible.filter(i => located(rows[i]) && inView(rows[i], key));
        const at = here.map(i => projection([rows[i].lon, rows[i].lat]));
        const areas = here.map(i => Object.keys(VIEWS).find(area => area !== 'world' && inView(rows[i], area)) || '');
        const marks = (key === 'world' ? gather(at, areas) : at.map(([x, y], n) => ({x, y, members: [n]}))).map(group => ({x: group.x, y: group.y,
          recs: group.members.map(n => here[n]), size: group.members.length > 1 ? Math.round(20 + Math.min(12, 3 * Math.sqrt(group.members.length))) : SIZE}));
        spread(marks, width, height);
        // West to east: the order the arrow keys go through the marks.
        marks.sort((a, b) => a.px - b.px || a.py - b.py);
        const x = value => (value / width * 100).toFixed(2) + '%', y = value => (value / height * 100).toFixed(2) + '%';
        const leads = marks.map(mark => Math.hypot(mark.px - mark.x, mark.py - mark.y) > 3
          ? '<line x1="' + mark.x.toFixed(1) + '" y1="' + mark.y.toFixed(1) + '" x2="' + mark.px.toFixed(1) + '" y2="' + mark.py.toFixed(1) + '"/>' +
            '<circle cx="' + mark.x.toFixed(1) + '" cy="' + mark.y.toFixed(1) + '" r="1.7"/>' : '').join('');
        // One mark of the picture is in the tab order (the picked one, or the first); the arrow keys reach the rest.
        const stop = marks.find(mark => mark.recs.length === 1 && mark.recs[0] === state.picked) || marks[0];
        const pins = marks.map(mark => {
          const style = ' style="left:' + x(mark.px) + ';top:' + y(mark.py);
          if (mark.recs.length === 1) {
            const i = mark.recs[0];
            return '<button type="button" class="rc-pin rc-mk" data-st="' + statusKey(rows[i]) + '"' + markAttrs(i, names[i], state.picked, mark === stop) + style + '"><span>' +
              (stageKey(rows[i]) === 'none' ? '' : stageKey(rows[i])) + '</span></button>';
          }
          const label = esc(said(placesOf(mark.recs), '기록 ' + mark.recs.length + '건', byStatusOf(mark.recs).map(([, name, count]) => name + ' ' + count).join(', '), '확대'));
          return '<button type="button" class="rc-pin rc-group" data-group="' + mark.recs.join(',') + '" aria-label="' + label + '" title="' + label + '" tabindex="' + (mark === stop ? 0 : -1) + '"' +
            style + ';width:' + mark.size + 'px;height:' + mark.size + 'px;background:' + ring(mark.recs) + '"><span>' + mark.recs.length + '</span></button>';
        }).join('');
        // The name of a place goes beside its marks, on the first side that is free: right, left, under, over.
        const boxes = marks.map(mark => [mark.px - mark.size / 2 - 1, mark.py - mark.size / 2 - 1, mark.px + mark.size / 2 + 1, mark.py + mark.size / 2 + 1]);
        const free = box => box[0] >= 2 && box[1] >= 2 && box[2] <= width - 2 && box[3] <= height - 2 &&
          !boxes.some(other => box[0] < other[2] && box[2] > other[0] && box[1] < other[3] && box[3] > other[1]);
        const places = new Map();
        marks.forEach((mark, n) => {
          const id = key === 'world' ? n : rows[mark.recs[0]].lat + ',' + rows[mark.recs[0]].lon;
          places.set(id, [...(places.get(id) || []), mark]);
        });
        const tags = [...places.values()].sort((a, b) => b.length - a.length).map(group => {
          const recs = group.flatMap(mark => mark.recs), name = placesOf(recs), many = key !== 'world' && recs.length > 1;
          if (!name) return '';
          const wide = letters(name + (many ? ' ' + recs.length : ''), 6, 10.6) + 6, high = 14;
          const west = Math.min(...group.map(mark => mark.px - mark.size / 2)), east = Math.max(...group.map(mark => mark.px + mark.size / 2));
          const north = Math.min(...group.map(mark => mark.py - mark.size / 2)), south = Math.max(...group.map(mark => mark.py + mark.size / 2));
          const spot = [[east + 4, (north + south - high) / 2], [west - 4 - wide, (north + south - high) / 2], [(west + east - wide) / 2, south + 3], [(west + east - wide) / 2, north - 3 - high]]
            .find(([left, top]) => free([left, top, left + wide, top + high]));
          if (!spot) return '';
          boxes.push([spot[0], spot[1], spot[0] + wide, spot[1] + high]);
          return '<span class="rc-map-site" aria-hidden="true" style="left:' + x(spot[0]) + ';top:' + y(spot[1]) + '">' + esc(name) + (many ? ' <b>' + recs.length + '</b>' : '') + '</span>';
        }).join('');
        el.innerHTML = '<div class="rc-map-in" style="aspect-ratio:' + width + '/' + height + '">' +
          '<svg viewBox="0 0 ' + width + ' ' + height + '" aria-hidden="true" focusable="false">' +
          '<path class="rc-grat" d="' + (path(d3.geoGraticule10()) || '') + '"/>' +
          (land ? '<path class="rc-land" d="' + (path({type: 'FeatureCollection', features: land}) || '') + '"/>' : '') +
          '<g class="rc-leads">' + leads + '</g></svg>' +
          (key === 'spot' ? [] : VIEWS[key].names).map(([name, lon, lat]) => { const [px, py] = projection([lon, lat]); return '<span class="rc-map-name" aria-hidden="true" style="left:' + x(px) + ';top:' + y(py) + '">' + esc(name) + '</span>'; }).join('') +
          tags + pins + '</div>';
        // The area buttons count the located rows of the current filters in each area; none is pressed in an area a ring opened.
        [...(host('records-disruptions-region')?.children || [])].forEach(button => {
          const figure = button.querySelector?.('b');
          if (figure) figure.textContent = String(visible.filter(i => located(rows[i]) && inView(rows[i], button.dataset?.key)).length);
          button.setAttribute?.('aria-pressed', String(button.dataset?.key === key));
        });
        const nowhere = host('records-disruptions-nowhere'), unplaced = visible.filter(i => !located(rows[i])).length;
        if (nowhere) nowhere.textContent = unplaced ? '장소 없는 기록 ' + unplaced + '건 · ' : '';
      });

      // -- the timeline: one lane per supply stage, 자료일 across: a mark stands on
      // the day its source came out. A row whose event was earlier has a tail to
      // the left: a line back to the event day when that is written as a date, a
      // short dashed stub when it is not. The last six weeks are drawn wide; what
      // is older is pressed into a narrow shaded band on the left, with its own
      // month ticks.
      const RECENT = 42, LANES = ['1', '2', '3', '4', '5', '6', 'none'];
      const paintTimeline = () => picture('타임라인', 'records-disruptions-timeline', () => {
        const el = host('records-disruptions-timeline');
        if (!el) return;
        const days = rows.map(record => day(record.source_date));
        const dated = days.filter(at => at !== null);
        if (!dated.length) { el.innerHTML = ''; return; }
        const width = widthOf(el, 600), narrow = width < 430, nameWidth = narrow ? 62 : 86;
        // A mark is larger on a phone, where a finger picks it, and the marks of a stack do not share their height.
        const plot = Math.max(120, width - nameWidth - 16), size = narrow ? 11 : 10, gap = size + 2;
        const end = Math.max(asOf ?? -Infinity, ...dated), first = Math.min(...dated), cut = end - RECENT;
        const old = first < cut, share = old ? (narrow ? .19 : .21) : 0, start = old ? monthStart(first) : Math.min(first, cut);
        // Where a day is across the plot, 0 to 1: the old band first, then the wide part from `base`.
        const base = old ? cut : start;
        const at = value => old && value <= cut ? share * (value - start) / (cut - start) : share + (1 - share) * (value - base) / (end - base || 1);
        // Marks of one lane that would touch are stacked upward. The stacks are
        // laid out for the whole ledger, so a filter does not move a mark.
        const level = {};
        const lanes = LANES.map(key => {
          const top = [];
          rows.map((_, i) => i).filter(i => days[i] !== null && stageKey(rows[i]) === key).sort((a, b) => days[a] - days[b]).forEach(i => {
            const px = at(days[i]) * plot;
            let n = 0;
            while (top[n] !== undefined && px - top[n] < gap) n++;
            top[n] = px;
            level[i] = n;
          });
          return [key, top.length];
        });
        const visible = new Set(seen());
        // Ticks: the first of each month in the old band, every seventh day back from the last day in the wide part.
        const ticks = [];
        if (old) {
          for (let month = start; month < cut; month = nextMonth(month)) {
            const [year, m] = ymd(month);
            ticks.push([at(month), m === 1 || year !== ymd(end)[0] && month === start ? year + '.' + two(m) : m + '월', 'old', month]);
          }
        }
        for (let week = end; week > base - .5; week -= 7) {
          const [, m, d] = ymd(week);
          ticks.push([at(week), m + '.' + two(d), week === end ? 'last' : '', week]);
        }
        ticks.sort((a, b) => a[0] - b[0]);
        // A label is dropped when it would run into one that matters more: the last
        // day first, then the first tick, then the old months that have a record,
        // then the weeks from the last day back.
        const busy = new Set(dated.filter(value => value < cut).map(monthStart));
        const taken = [];
        const spans = ticks.map(([fraction, label, kind], n) => {
          const px = fraction * plot, wide = letters(label, 5.7, 10) + 5;
          const left = kind === 'last' ? px - wide : n === 0 ? px : px - wide / 2;
          return {n, left, right: left + wide, rank: kind === 'last' ? 0 : n === 0 ? 1 : kind === 'old' ? 2 : 4 - fraction};
        });
        spans.filter(({n}) => ticks[n][2] !== 'old' || n === 0 || busy.has(ticks[n][3])).sort((a, b) => a.rank - b.rank).forEach(span => {
          if (span.left < -1 || span.right > plot + 1 || taken.some(other => span.left < other.right + 3 && span.right + 3 > other.left)) return;
          taken.push(span);
        });
        const labels = taken.sort((a, b) => a.n - b.n).map(({n}) => {
          const [fraction, label, kind] = ticks[n];
          return '<span' + (kind === 'last' ? ' class="rc-tl-last"' : n === 0 ? ' class="rc-tl-first"' : '') + ' style="left:' + pct(fraction) + '">' + esc(label) + '</span>';
        }).join('');
        const rules = (old ? '<i class="rc-tl-old" style="width:calc(' + pct(share) + ' + 8px)"></i>' : '') +
          ticks.map(([fraction, , kind]) => '<i class="rc-tl-rule' + (kind === 'old' ? ' rc-tl-minor' : '') + '" style="left:' + pct(fraction) + '"></i>').join('');
        // The tail of a row whose event was before its source: back to the event
        // day (to the edge when that is before the axis), or a stub when the
        // event is told in words.
        const tail = i => {
          const told = eventOf(rows[i]), was = day(told), height = ';bottom:' + (level[i] * gap + 4 + size / 2 - 1).toFixed(1) + 'px"></i>';
          if (!told || was !== null && was >= days[i]) return '';
          if (was === null) return '<i class="rc-tl-lag rc-tl-lag-open" style="left:' + pct(at(days[i])) + height;
          const from = at(Math.max(start, was));
          return '<i class="rc-tl-lag' + (was < start ? ' rc-tl-lag-cut' : '') + '" style="left:' + pct(from) + ';width:' + pct(at(days[i]) - from) + height;
        };
        // In a lane the marks go left to right, a stack from the bottom up: the order the arrow keys go through them.
        const inLane = lanes.map(([key]) => rows.map((_, i) => i).filter(i => visible.has(i) && days[i] !== null && stageKey(rows[i]) === key)
          .sort((a, b) => days[a] - days[b] || level[a] - level[b]));
        const all = inLane.flat(), stop = all.includes(state.picked) ? state.picked : all[0];
        el.innerHTML = '<div class="rc-tl" style="--rc-tl-name:' + nameWidth + 'px;--rc-dot:' + size + 'px">' + lanes.map(([key, levels], n) => {
          const items = inLane[n];
          return '<div class="rc-tl-lane' + (items.length ? '' : ' rc-tl-empty') + '"><span class="rc-tl-name">' + esc(stageLabel(key)) + '</span>' +
            '<div class="rc-tl-plot" style="height:' + Math.round(Math.max(22, levels * gap + 9)) + 'px"><div class="rc-tl-in">' + rules + items.map(tail).join('') +
            items.map(i => '<button type="button" class="rc-dot rc-mk" data-st="' + statusKey(rows[i]) + '"' + markAttrs(i, names[i], state.picked, i === stop) +
              ' style="left:' + pct(at(days[i])) + ';bottom:' + (level[i] * gap + 4).toFixed(1) + 'px"></button>').join('') + '</div></div></div>';
        }).join('') + '<div class="rc-tl-axis" aria-hidden="true"><span class="rc-tl-name"></span><div class="rc-tl-plot"><div class="rc-tl-in">' + labels + '</div></div></div></div>';
      });

      // -- the card of a picked mark, and the way from it to the row
      const mapHost = host('records-disruptions-map'), lineHost = host('records-disruptions-timeline');
      const STOP = '.rc-pin, .rc-dot';
      let origin = null, onMap = false;
      const press = () => pictures?.querySelectorAll?.('[data-rec]').forEach(el => el.setAttribute('aria-pressed', String(Number(el.dataset.rec) === state.picked)));
      // The card goes under its mark, or over it, right or left of it: the first of the four that covers no mark, else the one that covers the fewest.
      const place = from => {
        const frame = pictures?.getBoundingClientRect?.(), spot = from?.getBoundingClientRect?.();
        if (!frame || !spot || !card?.style) return;
        const width = card.offsetWidth || 260, height = card.offsetHeight || 120;
        const cx = spot.left - frame.left + spot.width / 2, cy = spot.top - frame.top + spot.height / 2;
        // (It may hang under the pictures, over the stage tiles: there is no mark to cover there.)
        const fit = (left, top) => [clamp(left, 0, Math.max(0, frame.width - width)), Math.max(0, top)];
        const spots = [fit(cx - width / 2, cy + spot.height / 2 + 8), fit(cx - width / 2, cy - spot.height / 2 - 8 - height),
          fit(cx + spot.width / 2 + 10, cy - height / 2), fit(cx - spot.width / 2 - 10 - width, cy - height / 2)];
        const others = [...(pictures.querySelectorAll?.(STOP) || [])].map(el => el.getBoundingClientRect());
        const covered = ([left, top]) => others.filter(box => box.right - frame.left > left && box.left - frame.left < left + width &&
          box.bottom - frame.top > top && box.top - frame.top < top + height).length;
        const [left, top] = spots.map(at => [covered(at), at]).sort((a, b) => a[0] - b[0])[0][1];
        card.style.left = left.toFixed(0) + 'px';
        card.style.top = top.toFixed(0) + 'px';
      };
      const closeCard = back => {
        state.picked = null;
        press();
        if (card) { card.hidden = true; card.innerHTML = ''; }
        // The focus goes back to the mark.
        if (back && origin?.isConnected) origin.focus?.();
      };
      const pick = (i, from, enter) => {
        const record = rows[i];
        if (!record || !card) return;
        const status = statusKey(record), event = eventOf(record);
        state.picked = i;
        origin = from || null;
        onMap = Boolean(from && mapHost?.contains?.(from));
        press();
        card.innerHTML = '<div class="rc-card-top"><span class="rc-state">' + mark(status) + esc(statusLabel(status)) + '</span>' +
          '<span class="status-tag">' + esc(stageLabel(stageKey(record))) + '</span>' +
          '<button type="button" class="rc-card-x" data-close aria-label="닫기">×</button></div>' +
          '<b class="rc-card-name">' + (esc(text(record.facility)) || '—') + '</b>' +
          (said(record.company, record.country) ? '<span class="rc-sub">' + esc(said(record.company, record.country)) + '</span>' : '') +
          '<p class="rc-card-line">' + (time(record.source_date) || '—') + (event ? ' · 사건 ' + time(event) : '') + (text(record.type) ? ' · ' + esc(record.type) : '') + '</p>' +
          '<button type="button" class="rc-card-go" data-goto="' + i + '">표에서 보기 ↓</button>';
        card.hidden = false;
        place(from);
        if (enter) card.querySelector?.('[data-goto]')?.focus?.({preventScroll: true});
      };
      // After a picture is drawn again the open card goes to the mark of its
      // record, in the picture it was picked in when the mark is still there,
      // else in the other; with no mark left it is put away.
      const settle = () => {
        if (state.picked === null || !card || card.hidden) return;
        const markIn = box => [...(box?.querySelectorAll?.('[data-rec]') || [])].find(el => Number(el.dataset.rec) === state.picked);
        const el = onMap ? markIn(mapHost) || markIn(lineHost) : markIn(lineHost) || markIn(mapHost);
        if (!el) { closeCard(); return; }
        origin = el;
        place(el);
      };
      const drawMap = () => { paintMap(); settle(); };
      const drawTimeline = () => { paintTimeline(); settle(); };
      // The row of the picked record opens, is marked as the one the picture led to, and comes into view.
      const goTo = i => {
        if (!rows[i]) return;
        state.open.add(i);
        state.from = i;
        if (card) { card.hidden = true; card.innerHTML = ''; }
        drawTable();
        refocus(dataHost, i, true);
      };
      // A ring opens the area that holds all its rows: one of the three, else the rows' own surroundings.
      const zoom = recs => {
        const inside = recs.filter(i => rows[i] && located(rows[i]));
        if (!inside.length) return;
        const named = Object.keys(VIEWS).find(key => key !== 'world' && inside.every(i => inView(rows[i], key)));
        if (!named) {
          const lons = inside.map(i => rows[i].lon), lats = inside.map(i => rows[i].lat);
          const side = Math.max(4, (Math.max(...lons) - Math.min(...lons)) * .4), up = Math.max(3, (Math.max(...lats) - Math.min(...lats)) * .4);
          state.spot = [[Math.max(-180, Math.min(...lons) - side), Math.max(-80, Math.min(...lats) - up)], [Math.min(180, Math.max(...lons) + side), Math.min(80, Math.max(...lats) + up)]];
        }
        state.view = named || 'spot';
        drawMap();
        mapHost?.querySelector?.('button[tabindex="0"]')?.focus?.({preventScroll: true});
      };

      const drawPictures = () => { drawMap(); drawTimeline(); };
      const draw = () => {
        const visible = seen();
        if (state.picked !== null && !visible.includes(state.picked)) closeCard();
        drawTable();
        shown('records-disruptions-count', rows.length, visible.length, '건');
        // The bar of a stage is as long as its share of the largest stage and is cut by status.
        const inPick = rows.filter(inStatus), byStage = tally(inPick, stageKey), longest = Math.max(1, ...Object.values(byStage));
        recount('records-disruptions-stage', inPick, stageKey, rows.length, (button, key) => {
          const bar = button.querySelector?.('.rc-stack');
          if (!bar) return;
          const parts = byStatusOf(rows.map((_, i) => i).filter(i => inStatus(rows[i]) && stageKey(rows[i]) === key)), total = byStage[key] || 0;
          bar.innerHTML = parts.map(([status, , count]) => '<i data-st="' + status + '" style="flex:' + count + '"></i>').join('') +
            (longest > total ? '<i class="rc-rest" style="flex:' + (longest - total) + '"></i>' : '');
          // The bar is far from the colour key: the tile says its parts in words too.
          button.title = parts.map(([, name, count]) => name + ' ' + count).join(' · ');
        });
        recount('records-disruptions-status', rows.filter(inStage), statusKey, rows.length);
        drawPictures();
      };
      const byStage = tally(rows, stageKey), byStatus = tally(rows, statusKey);
      const stageHost = host('records-disruptions-stage'), statusHost = host('records-disruptions-status'), regionHost = host('records-disruptions-region');
      // The stages are one flow, 1 to 6: all six show, also with no record (the
      // textbook's cases for 5 and 6 are in the company cards).
      const stack = '<i class="rc-stack" aria-hidden="true"></i>';
      if (stageHost) stageHost.innerHTML = tile('all', '전체', rows.length, state.stage, true) +
        STAGES.map((_, i) => tile(String(i + 1), stageLabel(String(i + 1)), byStage[i + 1] || 0, state.stage, false, stack)).join('') +
        (byStage.none ? tile('none', stageLabel('none'), byStage.none, state.stage, false, stack) : '');
      // The status counts are the summary line, the colour key of the pictures and a filter.
      if (statusHost) statusHost.innerHTML = pill('all', '전체', rows.length, state.status) +
        STATUSES.filter(([key]) => byStatus[key]).map(([key, label]) => pill(key, label, byStatus[key], state.status, mark(key))).join('');
      if (regionHost) regionHost.innerHTML = Object.entries(VIEWS).map(([key, view]) => pill(key, view.label, 0, state.view)).join('');
      onPick('records-disruptions-stage', key => { state.stage = key; draw(); });
      onPick('records-disruptions-status', key => { state.status = key; draw(); });
      onPick('records-disruptions-region', key => { state.view = key; drawMap(); });
      onRow(dataHost, toggle);
      if (pictures?.addEventListener) {
        pictures.addEventListener('click', event => {
          const target = event.target;
          if (!target?.closest) return;
          if (target.closest('[data-close]')) return closeCard(true);
          const go = target.closest('[data-goto]');
          if (go) return goTo(Number(go.dataset.goto));
          const group = target.closest('[data-group]');
          if (group) return zoom(String(group.dataset.group).split(',').map(Number));
          const picked = target.closest('[data-rec]');
          if (picked) return pick(Number(picked.dataset.rec), picked, true);
          // A click beside the marks puts the card away; one on the card or on an area button does not.
          if (state.picked !== null && !target.closest('.rc-card, button')) closeCard();
        });
        // The marks of a picture are one stop of the tab order: the mark that has
        // the focus is the stop, and the arrow keys, Home and End move along the
        // picture. The focus alone opens no card; Enter or a click does.
        const stopsOf = el => [mapHost, lineHost].map(box => [...(box?.querySelectorAll?.('button') || [])]).find(all => all.includes(el)) || [];
        const hold = el => stopsOf(el).forEach(other => other.setAttribute('tabindex', other === el ? '0' : '-1'));
        pictures.addEventListener('focusin', event => {
          const stop = event.target?.closest?.(STOP);
          if (stop) hold(stop);
        });
        pictures.addEventListener('keydown', event => {
          if (event.key === 'Escape') { if (state.picked !== null) closeCard(true); return; }
          const step = {ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1, Home: -Infinity, End: Infinity}[event.key];
          const stop = step && event.target?.closest?.(STOP);
          if (!stop) return;
          const all = stopsOf(stop), next = all[clamp(all.indexOf(stop) + step, 0, all.length - 1)];
          event.preventDefault?.();
          if (!next || next === stop) return;
          hold(next);
          next.focus?.();
        });
        // The pointer on a mark lights the same record in the other picture, and the ring that holds it.
        const light = i => {
          pictures.querySelectorAll?.('[data-rec]').forEach(el => el.classList?.toggle('rc-hot', Number(el.dataset.rec) === i));
          pictures.querySelectorAll?.('[data-group]').forEach(el => el.classList?.toggle('rc-hot', i !== null && String(el.dataset.group).split(',').includes(String(i))));
        };
        pictures.addEventListener('pointerover', event => {
          const over = event.target?.closest?.('[data-rec]');
          light(over ? Number(over.dataset.rec) : null);
        });
        pictures.addEventListener('pointerleave', () => light(null));
        // A press anywhere else on the page puts the card away.
        document.addEventListener?.('pointerdown', event => {
          if (card && !card.hidden && !pictures.contains?.(event.target)) closeCard();
        });
      }
      draw();
      onResize(mapHost, drawMap);
      onResize(lineHost, drawTimeline);
      // The outline of the land comes from the page's map file, which maps.js
      // has asked for already; without maps.js it is asked for here. Until it is
      // there, and when it cannot be read, the marks stand on the grid alone.
      if (typeof d3 !== 'undefined' && sites.length) {
        let file = null;
        try { file = energyMapFile; } catch (err) { file = null; }
        if (typeof file?.then !== 'function') file = typeof fetch === 'function'
          ? fetch('energy-data.json').then(response => response.ok ? response.json() : Promise.reject(new Error('energy-data.json ' + response.status))) : null;
        file?.then(data => {
          land = list(data?.world?.features).filter(feature => feature?.properties?.id !== 'ATA');
          drawMap();
        }).catch(err => console.error('records: map outline not loaded', err));
      }
    }
  } catch (err) {
    fail('records-disruptions', ['stage', 'status', 'count', 'region', 'map', 'nowhere', 'timeline', 'card'], '차질·복구 대장', err);
  }

  // ---- 계약·프로젝트 진행표 ---------------------------------------------------
  try {
    const dataHost = host('records-contracts-data');
    if (dataHost) {
      const rows = loaded(typeof projectRecords === 'undefined' ? null : projectRecords, 'projectRecords')
        .sort(newestFirst(row => row.announced));
      const state = {phase: 'all', from: null, open: new Set()};
      const heads = ['발표일', '회사·상대', '프로젝트', '단계', '규모·목표'];
      // One line: the five steps with the row's step marked. 수리 중, 계획 and a
      // row without a stated step get a tag instead of a place on the line.
      const progress = record => {
        const phase = phaseKey(record);
        const told = text(record.phase_text) && text(record.phase_text) !== phase ? '<small>' + esc(record.phase_text) + '</small>' : '';
        if (!TRACK.includes(phase)) return '<span class="status-tag rc-status rc-' + (phase === 'none' ? 'unknown' : 'plan') + '">' + esc(phaseLabel(phase)) + '</span>' + told;
        return '<ol class="rc-track" aria-label="단계 ' + esc(phase) + ' (' + TRACK.length + '단계 중 ' + (TRACK.indexOf(phase) + 1) + '번째)">' +
          TRACK.map(step => '<li' + (step === phase ? ' aria-current="step"' : '') + '>' + esc(step) + '</li>').join('') + '</ol>' + told;
      };
      const row = (record, i) => {
        const [before, after] = opener(i, record.owner);
        const kind = [text(record.kind), text(record.country)].filter(Boolean).join(' · ');
        const scale = [text(record.size), text(record.target)].filter(Boolean).map(esc).join(' · ');
        return ['<th scope="row">' + (time(record.announced) || '—') + '</th><td data-label="회사·상대">' + before,
          after + (text(record.counterparty) ? '<span class="rc-sub">상대 ' + esc(record.counterparty) + '</span>' : '') + '</td>' +
            cell('프로젝트', '<b>' + (esc(text(record.project)) || '—') + '</b>' + (kind ? '<span class="rc-sub">' + esc(kind) + '</span>' : '')) +
            cell('단계', progress(record)) +
            cell('규모·목표', scale ? '<span class="rc-what">' + scale + '</span>' : ''),
          block('확정 범위', para(record.what)) + block('현재 공급으로 세지 않은 것', para(record.not_counted)) + block('후속 확인', para(record.followup)) +
            block('출처', sources(record) + (isDate(record.checked) ? '<p>자료 확인 ' + time(record.checked) + '</p>' : '') + sections(record) + cards(record))];
      };
      const drawn = rows.map(row);
      // What a bar is called: the company and the project, the announcement day, the step and the target.
      const names = rows.map(record => said([text(record.owner), text(record.project)].filter(Boolean).join(' '), dot(record.announced),
        phaseLabel(phaseKey(record)), record.target));
      const seen = () => rows.map((_, i) => i).filter(i => state.phase === 'all' || phaseKey(rows[i]) === state.phase);
      const drawTable = () => {
        dataHost.innerHTML = table(heads, seen().map(i => pair(i, drawn[i], state.open.has(i), state.from === i, heads.length)));
      };
      const toggle = i => {
        if (!state.open.delete(i)) state.open.add(i);
        drawTable();
        refocus(dataHost, i);
      };
      const goTo = i => {
        if (!rows[i]) return;
        state.open.add(i);
        state.from = i;
        drawTable();
        drawGantt();
        refocus(dataHost, i, true);
      };

      // -- the Gantt: the projects whose target wording names a period, one row
      // each: a tick on the announcement day and a bar from it to the end of the
      // period (the period itself is hatched; all of the bar when the period had
      // begun by the announcement). The projects without a period are a short
      // list under it. Both go step by step, MoU first.
      const ORDER = [...TRACK, ...OFF_TRACK, 'none'];
      const drawGantt = () => picture('간트', 'records-contracts-gantt', () => {
        const el = host('records-contracts-gantt');
        if (!el) return;
        const from = rows.map(record => day(record.announced));
        const until = rows.map((record, i) => { const at = dayEnd(record.target_end); return at !== null && from[i] !== null && at > from[i] ? at : null; });
        const opens = rows.map((record, i) => {
          const at = day(record.target_start);
          return until[i] === null || at === null || at > until[i] ? until[i] : Math.max(at, from[i]);
        });
        const order = seen().sort((a, b) => ORDER.indexOf(phaseKey(rows[a])) - ORDER.indexOf(phaseKey(rows[b])) || a - b);
        const timed = order.filter(i => until[i] !== null), loose = order.filter(i => until[i] === null);
        const who = record => '<b>' + (esc(text(record.owner)) || '—') + '</b> ' + esc(text(record.project));
        let chart = '';
        if (timed.length) {
          // The axis is that of the whole 진행표, so a filter does not move a bar.
          const dated = from.filter(at => at !== null);
          const today = asOf ?? Math.max(...dated);
          const low = monthStart(Math.min(today, ...dated)), high = nextMonth(Math.max(today + 45, ...dated, ...until.filter(at => at !== null)));
          const at = value => (value - low) / (high - low);
          // Years on the axis; when the axis is shorter than two years, every third month.
          const ticks = [];
          for (let month = nextMonth(low); month < high; month = nextMonth(month)) {
            const [year, m] = ymd(month);
            if (m === 1) ticks.push([at(month), String(year)]);
            else if (high - low < 730 && m % 3 === 1) ticks.push([at(month), year + '.' + two(m)]);
          }
          // The target wording stands after its bar, and the plot keeps room on
          // the right for the wording of the bar that ends last. At 760px and
          // below live.css stacks the row and puts the wording in the name line,
          // so the plot has the whole width there.
          const full = widthOf(el, 760);
          const stacked = typeof matchMedia === 'function' ? matchMedia('(max-width:760px)').matches : full <= 760;
          const track = Math.max(160, stacked ? full : full - 346) - 8;
          const room = Math.round(clamp(Math.max(0, ...rows.map((record, i) => {
            const fraction = until[i] === null ? 0 : at(until[i]);
            return fraction > 0 ? (letters(text(record.target), 6.4, 11.2) + 12 - (1 - fraction) * track) / fraction : 0;
          })), 24, 190));
          const rules = ticks.map(([fraction]) => '<i class="rc-g-rule" style="left:' + pct(fraction) + '"></i>').join('') +
            '<i class="rc-g-now" style="left:' + pct(at(today)) + '"></i>';
          const [, month, date] = ymd(today);
          chart = '<div class="rc-g" style="--rc-g-room:' + room + 'px">' +
            '<div class="rc-g-row rc-g-axis" aria-hidden="true"><div class="rc-g-name"></div><div class="rc-g-track"><div class="rc-g-in">' +
            ticks.map(([fraction, label]) => '<span style="left:' + pct(fraction) + '">' + esc(label) + '</span>').join('') + '</div></div></div>' +
            timed.map(i => {
              const record = rows[i], phase = phaseKey(record), start = from[i], end = at(until[i]);
              // A wording too long for what is left of the row is cut with an ellipsis; the table has it whole.
              return '<div class="rc-g-row"><div class="rc-g-name">' + who(record) +
                '<span class="rc-g-ph">' + swatch(phase) + esc(phaseLabel(phase)) + '</span><span class="rc-g-target">' + esc(text(record.target)) + '</span></div>' +
                '<div class="rc-g-track"><div class="rc-g-in">' + rules +
                '<button type="button" class="rc-g-item" data-ph="' + PHASE_MARK[phase] + '"' + markAttrs(i, names[i], state.from) +
                ' style="left:' + pct(at(start)) + ';width:' + pct(end - at(start)) + '"><i class="rc-g-bar"></i>' +
                '<i class="rc-g-win" style="left:' + pct((opens[i] - start) / (until[i] - start)) + '"></i></button>' +
                '<span class="rc-g-end" style="left:' + pct(end) + ';max-width:calc(' + pct(1 - end) + ' + var(--rc-g-room) - 14px)">' + esc(text(record.target)) + '</span>' +
                '</div></div></div>';
            }).join('') +
            '<div class="rc-g-row rc-g-axis rc-g-foot" aria-hidden="true"><div class="rc-g-name"></div><div class="rc-g-track"><div class="rc-g-in">' +
            '<span class="rc-g-today" style="left:' + pct(at(today)) + '">기준일 ' + month + '.' + two(date) + '</span></div></div></div></div>';
        }
        // One line per project without a period: the announcement day, the step, the company and the project.
        const list = loose.length ? '<div class="rc-g-loose"><p class="rc-g-loose-head">목표 기간이 없는 사업 <b>' + loose.length + '</b>건</p><div class="rc-g-chips">' +
          loose.map(i => {
            const record = rows[i], phase = phaseKey(record);
            return '<button type="button" class="rc-g-chip" data-ph="' + PHASE_MARK[phase] + '"' + markAttrs(i, names[i], state.from) + '>' +
              '<span class="rc-g-chip-day">' + (esc(dot(record.announced)) || '—') + '</span>' +
              '<span class="rc-g-chip-ph">' + swatch(phase) + esc(phaseLabel(phase)) + '</span>' +
              '<span class="rc-g-chip-name">' + who(record) + '</span></button>';
          }).join('') + '</div></div>' : '';
        el.innerHTML = chart + list;
      });

      const draw = () => {
        drawTable();
        shown('records-contracts-count', rows.length, seen().length, '건');
        drawGantt();
      };
      const byPhase = tally(rows, phaseKey);
      const phaseHost = host('records-contracts-phase');
      // The step tiles are the colour key of the Gantt and a filter.
      if (phaseHost) phaseHost.innerHTML = tile('all', '전체', rows.length, state.phase, true) +
        TRACK.map(step => tile(step, step, byPhase[step] || 0, state.phase, false, swatch(step))).join('') +
        OFF_TRACK.map(step => tile(step, step, byPhase[step] || 0, state.phase, false, swatch(step))).join('') +
        (byPhase.none ? tile('none', phaseLabel('none'), byPhase.none, state.phase, false, swatch('none')) : '');
      onPick('records-contracts-phase', key => { state.phase = key; draw(); });
      onRow(dataHost, toggle);
      host('records-contracts-gantt')?.addEventListener?.('click', event => {
        const picked = event.target?.closest?.('[data-rec]');
        if (picked) goTo(Number(picked.dataset.rec));
      });
      draw();
      onResize(host('records-contracts-gantt'), drawGantt);
    }
  } catch (err) {
    fail('records-contracts', ['phase', 'count', 'gantt'], '계약·프로젝트 진행표', err);
  }
})();
