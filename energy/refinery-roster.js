'use strict';
// 정유·석유화학 › 마진·가동: the 정유시설 명부 (refinery-roster). index.html holds
// the section with its heading, one-line description and empty hosts; this
// script fills the hosts from refineryRoster of refinery-roster-data.js (the
// facility tables of the textbook's 7.8 and 7.10 to 7.15).
//
// The pictures come first and the table is the detail under them.
//   The region counts are the colour key and the one filter: a region narrows
//   the map, the bars and the table together and the map goes to that region.
//   The map has a mark per facility that has a site: a row of the comparison
//   table (7.8) that says again what a regional row says is no mark of its own,
//   it rides on that row. The colour is the region. The size is the capacity,
//   for the rows written in barrels a day (b/cd, b/sd, b/d, and 천 b/d, which
//   is b/d in thousands): one scale for all of them. A row in Mt/년 or without
//   a figure is a ring of one size; where a picked region is written in Mt/년
//   alone its rings follow Mt/년 on a scale of their own. Nothing is converted.
//   Facilities that would sit on each other are one mark, as large as the
//   largest of them, with their count in a badge: it opens the area around
//   them, or lists them when they share a site.
//   The bars go unit by unit (b/cd, b/sd, b/d, 천 b/d, Mt/년): inside a unit
//   the largest first, on the scale of that unit. Units are different bases,
//   so there is no order across them and no number of a place in a list. A
//   facility that two tables carry is there once.
// A table row is one line until it is opened. A mark is a button: on the map
// it opens a small card that leads to the row, a bar opens the row. The marks
// of the map are one stop of the tab order; the arrow keys move along them.
//
// The panel draws inside a try and each picture inside its own: a picture
// that fails is taken off the page and the table stays. The map needs d3 (the
// projection) and is left out without it. Every string of the data is escaped
// before it goes into HTML and only http(s) URLs become links. The map marks,
// their grouping and the card follow records.js; the two scripts share the
// styles of live.css and no code, so either draws without the other.
(() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = url => /^https?:\/\//i.test(String(url || '')) ? esc(url) : '';
  const text = value => typeof value === 'string' ? value.trim() : '';
  const list = value => Array.isArray(value) ? value.filter(item => item !== null && item !== undefined) : [];
  const host = id => document.getElementById(id);
  const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
  const said = (...parts) => parts.map(text).filter(Boolean).join(' · ');
  // 2026-01-01 -> 2026.01.01; a month (2025-07) and a year (2024) stay as they are written.
  const dot = value => /^\d{4}(-\d{2}){0,2}$/.test(text(value)) ? text(value).replace(/-/g, '.') : text(value);
  // The width a picture is laid out for; a host that is not shown has none and is drawn for the fallback, then again when it shows.
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
  // The width of a label in px before it is on the page: Latin letters and digits are `narrow`, Korean ones `wide`.
  const letters = (label, narrow, wide) => [...label].reduce((sum, c) => sum + (c.charCodeAt(0) < 128 ? narrow : wide), 0);
  const HOSTS = ['region', 'count', 'map', 'nowhere', 'rank', 'scope', 'card', 'sources'];
  const picture = (name, id, draw) => {
    try {
      draw();
    } catch (err) {
      console.error('refinery-roster: ' + name + ' not drawn', err);
      const el = host(id);
      if (!el) return;
      el.innerHTML = '';
      (el.closest?.('.rc-fig') || el).hidden = true;
    }
  };

  // The regions of the pictures, west to east: [key, label, the regions of the tables it holds, the countries when it holds a part of a table].
  // The table of 한국·중국·동남아·호주 is two regions of the pictures: its rows of 한국 and 중국 go with 일본, the rest stand apart.
  const GROUPS = [['am', '미주', ['미주']], ['eu', '유럽·러시아', ['유럽·러시아']], ['me', '중동·아프리카', ['중동', '아프리카']],
    ['in', '인도', ['인도']], ['ea', '한국·중국·일본', ['일본', '한국·중국·동남아·호주'], ['한국', '중국', '일본']], ['sp', '동남아·호주', ['한국·중국·동남아·호주']]];
  const groupOf = row => (GROUPS.find(group => group[2].includes(text(row.region)) && (!group[3] || group[3].includes(text(row.country)))) || ['etc'])[0];
  const groupLabel = key => key === 'all' ? '전체' : (GROUPS.find(group => group[0] === key) || [0, '그 밖'])[1];
  const swatch = key => '<i class="rr-sw" data-g="' + key + '" aria-hidden="true"></i>';
  // Barrels a day behind each unit of the barrel family. Mt/년 is not in it and is never converted.
  const BARREL = {'b/cd': 1, 'b/sd': 1, 'b/d': 1, '천 b/d': 1000};
  const perDay = row => Number.isFinite(row.capacity) && row.capacity > 0 && Object.hasOwn(BARREL, row.unit) ? row.capacity * BARREL[row.unit] : null;
  const inTonnes = row => row.unit === 'Mt/년' && Number.isFinite(row.capacity);
  // The units in the order the table sorts them and the strip under the bars shows them; a row without a figure is last.
  const UNITS = ['b/cd', 'b/sd', 'b/d', '천 b/d', 'Mt/년'];
  const unitKey = row => Number.isFinite(row.capacity) && UNITS.includes(row.unit) ? row.unit : 'none';
  const unitLabel = key => key === 'none' ? '수치 없음' : key;
  // What each unit of the bars is, in a few words (the folded list at the end of the section has the sentence).
  const READ = {'b/cd': 'calendar-day', 'b/sd': 'stream-day', 'b/d': '원자료의 일일 명목능력', '천 b/d': '비교표의 단지 능력', 'Mt/년': '연간 백만 톤 · b/d로 환산하지 않음'};
  const TOP = 15, FEW = 4, FOLD = 30;

  try {
    const dataHost = host('refinery-roster-data');
    if (dataHost) {
      const roster = typeof refineryRoster === 'undefined' ? null : refineryRoster;
      if (!roster || !Array.isArray(roster.rows)) throw new Error('refineryRoster is not loaded');
      const rows = roster.rows.filter(row => row && typeof row === 'object');
      const at = new Map(rows.map((row, i) => [row.id, i]));
      const group = rows.map(groupOf);
      const sourceOf = new Map(list(roster.sources).filter(source => source && text(source.id)).map(source => [source.id, source]));
      const readingOf = new Map(list(roster.units).map(unit => [text(unit?.unit), text(unit?.reading)]));
      const state = {region: 'all', spot: null, picked: null, from: null, open: new Set(), sort: 'order', down: false, all: false};
      // The rows of the same facility in another table (same_facility_as), as places in `rows`.
      const twins = rows.map(row => list(row.same_facility_as).map(id => at.get(id)).filter(i => i !== undefined));
      // A row of the comparison table (천 b/d) says again what a row of a regional table says: it is no facility of
      // its own, and the bars leave it out when the other row is in barrels a day too.
      const again = rows.map((row, i) => row.unit === '천 b/d' && twins[i].length > 0);
      const ranked = rows.map((row, i) => perDay(row) !== null && !(again[i] && twins[i].some(j => perDay(rows[j]) !== null)));
      const located = row => Number.isFinite(row.lat) && Number.isFinite(row.lon) && Math.abs(row.lat) <= 90 && Math.abs(row.lon) <= 180;
      // On the map such a row is no mark of its own when a row it says again has a site in the same region: it rides on
      // that row (`riders`), and the barrels a day it is written in size the mark when the regional row has none.
      const rider = rows.map((row, i) => again[i] && twins[i].some(j => !again[j] && located(rows[j]) && group[j] === group[i]));
      const riders = rows.map((row, i) => rider[i] ? [] : twins[i].filter(j => rider[j] && group[j] === group[i]));
      const worth = rows.map((row, i) => perDay(row) ?? riders[i].map(j => perDay(rows[j])).filter(value => value !== null).sort((a, b) => b - a)[0] ?? null);
      const largest = Math.max(1, ...rows.map((row, i) => rider[i] ? 0 : worth[i] || 0));
      const name = row => text(row.facility) || '—';
      const whoWhere = row => said(row.operator, row.country, row.zone);
      const names = rows.map(row => said(name(row), row.operator, row.country, row.capacity_text));
      const seen = () => rows.map((_, i) => i).filter(i => state.region === 'all' || group[i] === state.region);

      // -- the table
      const HEADS = [['region', '나라·권역'], ['facility', '시설'], ['operator', '운영사'], ['capacity', '능력'], ['basis_date', '기준일']];
      const word = (a, b) => a.localeCompare(b, 'ko');
      // `way` is 1 for the first press of a heading and -1 for the second; a row with nothing in the column is last either way.
      const last = (a, b, order, way) => !a && !b ? 0 : !a ? 1 : !b ? -1 : way * order(a, b);
      const ORDER = {
        order: () => 0,
        region: (a, b, way) => way * (GROUPS.findIndex(g => g[0] === group[a]) - GROUPS.findIndex(g => g[0] === group[b]) || word(text(rows[a].country), text(rows[b].country))),
        facility: (a, b, way) => way * word(name(rows[a]), name(rows[b])),
        operator: (a, b, way) => last(text(rows[a].operator), text(rows[b].operator), word, way),
        basis_date: (a, b, way) => last(text(rows[a].basis_date), text(rows[b].basis_date), (x, y) => x < y ? -1 : x > y ? 1 : 0, way)
      };
      // 능력: a figure compares only with figures of its own unit, so the rows go unit by unit and by the figure
      // inside a unit (the largest first, then the other way round); the rows without a figure stay last.
      const unitRank = i => { const n = UNITS.indexOf(unitKey(rows[i])); return n < 0 ? UNITS.length : n; };
      const sorted = () => {
        const order = seen();
        if (state.sort === 'capacity') return order.sort((a, b) => unitRank(a) - unitRank(b) || (state.down ? 1 : -1) * ((rows[a].capacity ?? 0) - (rows[b].capacity ?? 0)) || a - b);
        const by = ORDER[state.sort] || ORDER.order;
        return order.sort((a, b) => by(a, b, state.down ? -1 : 1) || a - b);
      };
      const cell = (label, html) => '<td data-label="' + esc(label) + '">' + (html || '') + '</td>';
      const block = (label, html) => html ? '<div><b>' + esc(label) + '</b>' + html + '</div>' : '';
      const para = value => text(value) ? '<p>' + esc(value) + '</p>' : '';
      // The capacity as the table of the textbook writes it; the figure is set apart from the words around it.
      const capacity = row => {
        const m = /^(.*?\d[\d,.]*)(.*)$/.exec(text(row.capacity_text));
        return m ? '<b>' + esc(m[1]) + '</b>' + esc(m[2]) : esc(text(row.capacity_text));
      };
      const links = row => {
        const items = list(row.source_ids).map(id => sourceOf.get(id)).filter(source => source && text(source.title));
        return items.length ? '<ul class="rc-sources">' + items.map(source => {
          const url = safeUrl(source.url);
          return '<li>' + (url ? '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + esc(source.title) + ' ↗</a>' : esc(source.title)) + '</li>';
        }).join('') + '</ul>' : '';
      };
      const detail = (row, i) => {
        const others = twins[i].map(j => '<button type="button" class="rr-twin" data-goto="' + j + '">' + esc(said(name(rows[j]), rows[j].operator, rows[j].capacity_text)) +
          ' <small>교재 ' + esc(text(rows[j].section)) + '</small></button>').join('');
        // A row that leans on the ledger of disruptions for its state or its date leads there, among its sources.
        const ledger = (text(row.note) + text(row.basis)).includes('차질·복구 대장') ? '<p><a href="#records-disruptions">차질·복구 대장 ↗</a></p>' : '';
        return block('물류권', para(row.zone)) + block('기준·범위', para(row.basis)) +
          block('주의', para(row.note) + (others ? '<p class="rr-twins">같은 시설의 다른 행 ' + others + '</p>' : '')) +
          block('단위', text(row.unit) && readingOf.get(row.unit) ? '<p>' + esc(row.unit) + ': ' + esc(readingOf.get(row.unit)) + '</p>' : '') +
          block('출처', para(row.source) + links(row) + ledger + (text(row.section) ? '<small>교재 ' + esc(row.section) + '</small>' : ''));
      };
      // A row is built once, cut in two around the value of aria-expanded.
      const drawn = rows.map((row, i) => {
        const area = text(row.region) && text(row.region) !== text(row.country) ? '<span class="rc-sub">' + esc(row.region) + '</span>' : '';
        return ['<th scope="row">' + swatch(group[i]) + (esc(text(row.country)) || '—') + area + '</th>' +
            '<td data-label="시설"><button type="button" class="rc-toggle" data-toggle="' + i + '" aria-expanded="',
          '"><b>' + esc(name(row)) + '</b></button></td>' + cell('운영사', esc(text(row.operator))) +
            cell('능력', '<span class="rr-cap">' + capacity(row) + '</span>') + cell('기준일', esc(dot(row.basis_date))),
          detail(row, i)];
      });
      const pair = (i, open) => {
        const [before, after, more] = drawn[i];
        return '<tr class="rc-row' + (state.from === i ? ' rc-from' : '') + '" data-row="' + i + '"' + (open ? ' data-open' : '') + '>' + before + open + after + '</tr>' +
          '<tr class="rc-more" data-more="' + i + '"' + (open ? '' : ' hidden') + '><td colspan="' + HEADS.length + '"><div class="rc-detail">' + more + '</div></td></tr>';
      };
      const drawTable = () => {
        const order = sorted();
        // A long table shows its first rows and a button for the rest; a region is shown whole.
        const some = !state.all && order.length > FOLD + 10 ? order.slice(0, FOLD) : order;
        const head = HEADS.map(([key, label]) => {
          const on = state.sort === key;
          // 능력 goes from the largest down on the first press, the other columns from the first up: the heading says which.
          const falling = key === 'capacity' ? !state.down : state.down;
          return '<th scope="col"' + (on ? ' aria-sort="' + (falling ? 'descending' : 'ascending') + '"' : '') + '><button type="button" class="rr-sort" data-sort="' + key + '">' +
            esc(label) + '</button></th>';
        }).join('');
        dataHost.innerHTML = order.length
          ? '<div class="table-scroll"><table class="market-table text-table rc-table rr-table"><thead><tr>' + head + '</tr></thead><tbody>' +
            some.map(i => pair(i, state.open.has(i))).join('') + '</tbody></table></div>' +
            (some.length < order.length ? '<button type="button" class="rr-rest" data-rest>나머지 ' + (order.length - some.length) + '행 펼치기</button>' : '')
          : '<p class="note">조건에 맞는 행이 없다.</p>';
      };
      const refocus = (i, show) => {
        const row = dataHost.querySelector?.('tr[data-row="' + i + '"]');
        if (show) row?.scrollIntoView?.({block: 'center', behavior: 'smooth'});
        row?.querySelector?.('.rc-toggle')?.focus?.({preventScroll: true});
      };
      const toggle = i => {
        if (!state.open.delete(i)) state.open.add(i);
        drawTable();
        refocus(i);
      };

      // -- the map
      // The area a set of rows takes, with room around it (`room` of its width and height on each side, `least`
      // degrees of longitude at the least): rows close together still get a few degrees, so the coast around them
      // shows. The outline of the land is a coarse one and says nothing below that.
      const around = (recs, room = .12, least = 1.5) => {
        const lons = recs.map(i => rows[i].lon), lats = recs.map(i => rows[i].lat);
        if (!recs.length) return [[-128, -42], [156, 63]];
        const side = Math.max(least, (Math.max(...lons) - Math.min(...lons)) * room), up = Math.max(least * .65, (Math.max(...lats) - Math.min(...lats)) * room);
        return [[Math.max(-180, Math.min(...lons) - side), Math.max(-70, Math.min(...lats) - up)], [Math.min(180, Math.max(...lons) + side), Math.min(78, Math.max(...lats) + up)]];
      };
      const sites = rows.map((_, i) => i).filter(i => located(rows[i]));
      // A facility in barrels a day is a disc whose area follows its capacity, on one scale; any other is a ring of one
      // size. Where the picked region is written in Mt/년 alone (`tonnes`, its largest figure), a ring follows Mt/년.
      const HOLLOW = 10;
      const discOf = value => Math.max(7, Math.round(26 * Math.sqrt(value / largest)));
      const ringOf = (value, most) => Math.max(7, Math.round(26 * Math.sqrt(Math.max(0, value) / most)));
      const sizeOf = (i, tonnes) => tonnes ? (inTonnes(rows[i]) ? ringOf(rows[i].capacity, tonnes) : HOLLOW) : worth[i] === null ? HOLLOW : discOf(worth[i]);
      const tonneScale = recs => {
        const figures = recs.filter(i => unitKey(rows[i]) !== 'none');
        return state.region !== 'all' && figures.length && figures.every(i => inTonnes(rows[i])) ? Math.max(1e-9, ...figures.map(i => rows[i].capacity)) : null;
      };
      // The room around a mark that still presses it: a small mark gets more, so that none is under 24px.
      const hitOf = size => clamp(Math.ceil((24 - size) / 2), 3, 9);
      const REACH = 15;
      // Facilities of one region whose sites are within REACH px of each other are one group, drawn at their middle.
      const gather = (spots, areas) => {
        const groups = [];
        spots.forEach(([x, y], n) => {
          const near = groups.find(other => other.area === areas[n] && Math.hypot(other.x - x, other.y - y) < REACH);
          if (!near) { groups.push({x, y, area: areas[n], members: [n]}); return; }
          near.members.push(n);
          near.x += (x - near.x) / near.members.length;
          near.y += (y - near.y) / near.members.length;
        });
        return groups;
      };
      // Marks that would still sit on each other are pushed apart; a thin line leads a moved mark back to its site.
      // A group takes a little more room than its size, for its badge.
      const spread = (marks, width, height) => {
        marks.forEach(mark => { mark.px = mark.x; mark.py = mark.y; });
        for (let pass = 0; pass < 60; pass++) {
          let moved = false;
          for (let i = 0; i < marks.length; i++) for (let j = i + 1; j < marks.length; j++) {
            const a = marks[i], b = marks[j], room = (a.size + b.size) / 2 + 2 + (a.recs.length > 1 ? 3 : 0) + (b.recs.length > 1 ? 3 : 0);
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
      // The facility a group is named after and is as large as: the largest in barrels a day (in Mt/년 where the
      // rings follow Mt/년), else the first.
      const lead = (recs, tonnes) => {
        const figure = i => tonnes ? (inTonnes(rows[i]) ? rows[i].capacity : 0) : worth[i] || 0;
        return recs.reduce((best, i) => figure(i) > figure(best) ? i : best, recs[0]);
      };
      // The capacity that sizes the mark of a facility, as written: its own, or that of the comparison row riding on it.
      const sizedBy = (i, tonnes) => tonnes ? (inTonnes(rows[i]) ? text(rows[i].capacity_text) : '')
        : perDay(rows[i]) !== null ? text(rows[i].capacity_text) : text(rows[riders[i].find(j => perDay(rows[j]) === worth[i])]?.capacity_text);
      // What a group is called: the one name when its facilities share it, on the whole map the country (or the two
      // countries) of a large group, else the largest facility and how many more.
      const groupName = (recs, first) => {
        const countries = [...new Set(recs.map(i => text(rows[i].country)).filter(Boolean))];
        if (new Set(recs.map(i => name(rows[i]))).size === 1) return name(rows[first]);
        return state.region === 'all' && !state.spot && recs.length >= 4 && countries.length && countries.length <= 2 ? countries.join('·') : name(rows[first]) + ' 외 ' + (recs.length - 1);
      };
      // Facilities that no closer look can tell apart: their sites are within a sixth of a degree.
      const together = recs => Math.max(...recs.map(i => rows[i].lon)) - Math.min(...recs.map(i => rows[i].lon)) < .17 &&
        Math.max(...recs.map(i => rows[i].lat)) - Math.min(...recs.map(i => rows[i].lat)) < .17;
      const boundsNow = () => state.spot || around(seen().filter(i => located(rows[i])));
      let land = null;
      // The key under the map says what is on it: the unit of the sizes with two round steps and the largest facility
      // of the region (which is a mark of the map), then the kinds of mark the picture has.
      const legend = (recs, tonnes, marks) => {
        const top = tonnes || Math.max(0, ...recs.map(i => worth[i] || 0));
        const steps = (tonnes ? [5, 15] : [200000, 600000]).filter(value => value <= top * .8).concat(top ? [top] : []);
        const size = value => tonnes ? ringOf(value, tonnes) : discOf(value);
        const word = value => tonnes ? value.toLocaleString('en-US', {maximumFractionDigits: 1}) : (value / 10000).toLocaleString('en-US', {maximumFractionDigits: 0}) + '만';
        const rings = tonnes ? [] : recs.filter(i => worth[i] === null);
        const ring = [rings.some(i => inTonnes(rows[i])) ? 'Mt/년 표기' : '', rings.some(i => !inTonnes(rows[i])) ? '수치 없음' : ''].filter(Boolean).join('·');
        return '<div class="rr-legend" aria-hidden="true">' + (steps.length ? '<span class="rr-legend-head">' + (tonnes ? 'Mt/년' : '배럴/일') + '</span>' : '') +
          steps.map(value => '<span><i class="' + (tonnes ? 'rr-legend-ring' : 'rr-legend-disc') + '" style="width:' + size(value) + 'px;height:' + size(value) + 'px"></i>' + word(value) + '</span>').join('') +
          (ring ? '<span><i class="rr-legend-ring"></i>' + ring + '</span>' : '') +
          (marks.some(mark => mark.recs.length > 1) ? '<span><i class="rr-legend-many' + (tonnes ? ' rr-legend-ring' : '') + '"><b>3</b></i>숫자는 묶인 시설 수 · 크기는 그중 가장 큰 곳</span>' : '') + '</div>';
      };
      const paintMap = () => picture('지도', 'refinery-roster-map', () => {
        const el = host('refinery-roster-map');
        if (!el) return;
        // Without d3 there is no projection: the map is left out and the bars take the width.
        if (typeof d3 === 'undefined' || !d3 || !d3.geoMercator || !d3.geoPath) {
          el.innerHTML = '';
          (el.closest?.('.rc-fig') || el).hidden = true;
          return;
        }
        const visible = seen();
        const width = widthOf(el, 640), height = Math.round(clamp(width * (width < 480 ? .8 : .66), 250, 500));
        const projection = d3.geoMercator().fitExtent([[16, 16], [width - 16, height - 16]], {type: 'MultiPoint', coordinates: boundsNow()});
        projection.clipExtent([[0, 0], [width, height]]);
        const path = d3.geoPath(projection);
        // Every facility of the filter that has a site and falls on the picture (all of them, until a group is opened).
        const sited = visible.filter(i => located(rows[i]) && !rider[i]), tonnes = tonneScale(sited);
        const spots = sited.map(i => [i, projection([rows[i].lon, rows[i].lat])])
          .filter(([, [px, py]]) => px >= 4 && px <= width - 4 && py >= 4 && py <= height - 4);
        const here = spots.map(([i]) => i);
        // One facility is a mark of its size. Facilities that sit on each other are one mark as large as the largest of
        // them, with their count in a badge.
        const marks = gather(spots.map(([, point]) => point), here.map(i => group[i])).map(found => {
          const recs = found.members.map(n => here[n]);
          return {x: found.x, y: found.y, recs, hollow: Boolean(tonnes) || recs.every(i => worth[i] === null), size: Math.max(...recs.map(i => sizeOf(i, tonnes)))};
        });
        spread(marks, width, height);
        // West to east: the order the arrow keys go through the marks.
        marks.sort((a, b) => a.px - b.px || a.py - b.py);
        const x = value => (value / width * 100).toFixed(2) + '%', y = value => (value / height * 100).toFixed(2) + '%';
        const leads = marks.map(mark => Math.hypot(mark.px - mark.x, mark.py - mark.y) > 3
          ? '<line x1="' + mark.x.toFixed(1) + '" y1="' + mark.y.toFixed(1) + '" x2="' + mark.px.toFixed(1) + '" y2="' + mark.py.toFixed(1) + '"/>' +
            '<circle cx="' + mark.x.toFixed(1) + '" cy="' + mark.y.toFixed(1) + '" r="1.7"/>' : '').join('');
        const stop = marks.find(mark => mark.recs.length === 1 && mark.recs[0] === state.picked) || marks[0];
        const pins = marks.map(mark => {
          const style = ' style="left:' + x(mark.px) + ';top:' + y(mark.py) + ';width:' + mark.size + 'px;height:' + mark.size + 'px;--hit:' + hitOf(mark.size) + 'px"';
          const key = group[mark.recs[0]], tab = ' tabindex="' + (mark === stop ? 0 : -1) + '"', ring = mark.hollow ? ' rr-ring' : '';
          if (mark.recs.length === 1) {
            const i = mark.recs[0];
            return '<button type="button" class="rr-pin' + ring + '" data-g="' + key + '" data-rec="' + i + '" aria-pressed="' + (i === state.picked) +
              '" aria-label="' + esc(names[i]) + '" title="' + esc(names[i]) + '"' + tab + style + '></button>';
          }
          const first = lead(mark.recs, tonnes), figure = sizedBy(first, tonnes);
          const label = esc(said(groupName(mark.recs, first), groupLabel(key), '시설 ' + mark.recs.length + '곳', figure ? '가장 큰 곳 ' + name(rows[first]) + ' ' + figure : '',
            together(mark.recs) ? '목록' : '확대'));
          return '<button type="button" class="rr-pin rr-many' + ring + '" data-g="' + key + '" data-group="' + mark.recs.join(',') + '" aria-label="' + label + '" title="' + label + '"' + tab + style +
            '><span>' + mark.recs.length + '</span></button>';
        }).join('');
        // A name goes beside its mark where there is room for it: the largest marks first; right, left, under, over.
        // It keeps clear of every other mark and name (8px beside it; 6px when it stands under or over its mark), so
        // that it reads as the name of its own mark and of no other.
        const boxes = marks.map(mark => { const half = mark.size / 2 + 1, badge = mark.recs.length > 1 ? 7 : 0; return [mark.px - half, mark.py - half - badge, mark.px + half + badge, mark.py + half]; });
        const free = (box, clear, own) => box[0] >= 2 && box[1] >= 2 && box[2] <= width - 2 && box[3] <= height - 2 &&
          !boxes.some((other, n) => n !== own && box[0] - clear < other[2] && box[2] + clear > other[0] && box[1] < other[3] && box[3] > other[1]);
        const tags = [...marks.keys()].sort((a, b) => marks[b].size - marks[a].size || marks[b].recs.length - marks[a].recs.length).map(n => {
          const mark = marks[n];
          const label = mark.recs.length > 1 ? groupName(mark.recs, lead(mark.recs, tonnes)) : name(rows[mark.recs[0]]);
          // The badge of a group stands out over its upper right: a name beside it starts past the badge.
          const wide = letters(label, 6, 10.6) + 6, high = 14, half = mark.size / 2, badge = mark.recs.length > 1 ? 7 : 0;
          const spot = [[mark.px + half + 4 + badge, mark.py - high / 2, 8], [mark.px - half - 4 - wide, mark.py - high / 2, 8], [mark.px - wide / 2, mark.py + half + 3, 6],
            [mark.px - wide / 2, mark.py - half - 3 - high - badge, 6]]
            .find(([left, top, clear]) => free([left, top, left + wide, top + high], clear, n));
          if (!spot) return '';
          boxes.push([spot[0], spot[1], spot[0] + wide, spot[1] + high]);
          return '<span class="rc-map-site" aria-hidden="true" style="left:' + x(spot[0]) + ';top:' + y(spot[1]) + '">' + esc(label) + '</span>';
        }).join('');
        el.innerHTML = '<div class="rc-map-in" style="aspect-ratio:' + width + '/' + height + '">' +
          '<svg viewBox="0 0 ' + width + ' ' + height + '" aria-hidden="true" focusable="false">' +
          '<path class="rc-grat" d="' + (path(d3.geoGraticule10()) || '') + '"/>' +
          (land ? '<path class="rc-land" d="' + (path({type: 'FeatureCollection', features: land}) || '') + '"/>' : '') +
          '<g class="rc-leads">' + leads + '</g></svg>' + tags + pins +
          (state.spot ? '<button type="button" class="rr-back" data-back>← ' + esc(groupLabel(state.region)) + ' 보기</button>' : '') + '</div>' + legend(sited, tonnes, marks);
        const nowhere = host('refinery-roster-nowhere'), unplaced = visible.filter(i => !located(rows[i]) && !again[i]).length;
        if (nowhere) nowhere.textContent = unplaced ? '지도에 없는 시설 ' + unplaced + '곳 · ' : '';
      });

      // -- the bars
      const bar = (i, share, ring) => {
        const row = rows[i], label = said(name(row), row.operator, row.country, row.capacity_text);
        return '<button type="button" class="rr-bar' + (ring ? ' rr-bar-ring' : '') + '" data-g="' + group[i] + '" data-bar="' + i + '" aria-label="' + esc(label) + '" title="' + esc(label) + '">' +
          '<span class="rr-bar-name"><b>' + esc(name(row)) + '</b>' +
          (said(row.operator, row.country) ? '<span>' + esc(said(row.operator, row.country)) + '</span>' : '') + '</span>' +
          '<span class="rr-bar-val">' + capacity(row) + '</span>' +
          '<span class="rr-bar-track"><i style="width:' + (clamp(share, 0, 1) * 100).toFixed(1) + '%"></i></span></button>';
      };
      const paintRank = () => picture('단위별 막대', 'refinery-roster-rank', () => {
        const el = host('refinery-roster-rank');
        if (!el) return;
        const visible = seen(), most = state.region === 'all' ? FEW : TOP;
        // One bar a facility: a row of the comparison table is left out when its regional row is in barrels a day too.
        const mine = visible.filter(i => ranked[i] || inTonnes(rows[i]));
        const twice = visible.filter(i => perDay(rows[i]) !== null && !ranked[i]).length;
        // A unit is a basis of its own: its facilities are drawn among themselves, the largest first, on their own scale.
        const sets = UNITS.map(unit => [unit, mine.filter(i => rows[i].unit === unit).sort((a, b) => rows[b].capacity - rows[a].capacity || a - b)]).filter(([, recs]) => recs.length);
        const byUnit = visible.reduce((counts, i) => { const key = unitKey(rows[i]); counts[key] = (counts[key] || 0) + 1; return counts; }, {});
        const units = [...UNITS, 'none'].filter(key => byUnit[key]);
        el.innerHTML =
          (sets.length ? sets.map(([unit, recs]) => {
            const shown = recs.slice(0, most), longest = Math.max(rows[shown[0]].capacity, 1e-9);
            return '<p class="rr-bars-head"><i data-u="' + esc(unit) + '" aria-hidden="true"></i><b>' + esc(unit) + '</b> ' + recs.length + '곳' +
              (recs.length > shown.length ? ' 중 큰 ' + shown.length + '곳' : '') + '<span>' + esc(READ[unit]) + '</span></p>' +
              '<div class="rr-bars">' + shown.map(i => bar(i, rows[i].capacity / longest, unit === 'Mt/년')).join('') + '</div>';
          }).join('') +
            (sets.length > 1 ? '<p class="note rr-scale">막대 길이의 눈금은 단위 묶음마다 따로다.</p>' : '') +
            (twice ? '<p class="note">두 표에 적힌 같은 시설 ' + twice + '곳은 한 번만 넣었다.</p>' : '')
            : '<p class="note">능력 수치가 있는 행이 없다.</p>') +
          '<div class="rr-units"><div class="rr-units-bar" role="img" aria-label="' + esc('단위별 행 수: ' + units.map(key => unitLabel(key) + ' ' + byUnit[key]).join(', ')) + '">' +
          units.map(key => '<i data-u="' + esc(key) + '" style="flex:' + byUnit[key] + '"></i>').join('') + '</div>' +
          '<p class="rr-units-key">' + units.map(key => '<span><i data-u="' + esc(key) + '"></i>' + esc(unitLabel(key)) + ' <b>' + byUnit[key] + '</b></span>').join('') + '</p></div>';
        const scope = host('refinery-roster-scope');
        if (scope) scope.textContent = groupLabel(state.region) + ' · 같은 단위끼리 큰 순';
      });

      // -- the card of a picked mark, and the way from it to the row
      const pictures = host('refinery-roster-figures'), card = host('refinery-roster-card'), mapHost = host('refinery-roster-map');
      const STOP = '.rr-pin';
      let origin = null;
      const press = () => mapHost?.querySelectorAll?.('[data-rec]').forEach(el => el.setAttribute('aria-pressed', String(Number(el.dataset.rec) === state.picked)));
      // The card goes under its mark, or over it, right or left of it: the first of the four that covers the fewest marks.
      const place = from => {
        const frame = pictures?.getBoundingClientRect?.(), spot = from?.getBoundingClientRect?.();
        if (!frame || !spot || !card?.style) return;
        const width = card.offsetWidth || 260, height = card.offsetHeight || 130;
        const cx = spot.left - frame.left + spot.width / 2, cy = spot.top - frame.top + spot.height / 2;
        const fit = (left, top) => [clamp(left, 0, Math.max(0, frame.width - width)), Math.max(0, top)];
        const spots = [fit(cx - width / 2, cy + spot.height / 2 + 8), fit(cx - width / 2, cy - spot.height / 2 - 8 - height),
          fit(cx + spot.width / 2 + 10, cy - height / 2), fit(cx - spot.width / 2 - 10 - width, cy - height / 2)];
        const others = [...(mapHost?.querySelectorAll?.(STOP) || [])].map(el => el.getBoundingClientRect());
        const covered = ([left, top]) => others.filter(box => box.right - frame.left > left && box.left - frame.left < left + width &&
          box.bottom - frame.top > top && box.top - frame.top < top + height).length;
        const [left, top] = spots.map(spotAt => [covered(spotAt), spotAt]).sort((a, b) => a[0] - b[0])[0][1];
        card.style.left = left.toFixed(0) + 'px';
        card.style.top = top.toFixed(0) + 'px';
      };
      const closeCard = back => {
        state.picked = null;
        press();
        if (card) { card.hidden = true; card.innerHTML = ''; }
        if (back && origin?.isConnected) origin.focus?.();
      };
      const cardTop = (key, tag) => '<div class="rc-card-top"><span class="rc-state">' + swatch(key) + esc(groupLabel(key)) + '</span>' +
        (tag ? '<span class="status-tag">' + esc(tag) + '</span>' : '') + '<button type="button" class="rc-card-x" data-close aria-label="닫기">×</button></div>';
      // A line of a card that leads to a row: the facility, who runs it, its capacity as written, its basis and its table.
      const line = i => {
        const row = rows[i];
        return '<button type="button" data-goto="' + i + '"><em><b>' + esc(name(row)) + '</b>' + (text(row.operator) ? ' ' + esc(row.operator) : '') +
          '</em><span>' + capacity(row) + '</span><small>' + esc(said(row.basis, text(row.section) ? '교재 ' + row.section : '')) + '</small></button>';
      };
      const also = recs => recs.length ? '<p class="rr-card-also">다른 표의 같은 시설</p>' + recs.map(line).join('') : '';
      const pick = (i, from, enter) => {
        const row = rows[i];
        if (!row || !card) return;
        state.picked = i;
        origin = from || null;
        press();
        card.innerHTML = cardTop(group[i], text(row.section) ? '교재 ' + row.section : '') +
          '<b class="rc-card-name">' + esc(name(row)) + '</b>' + (whoWhere(row) ? '<span class="rc-sub">' + esc(whoWhere(row)) + '</span>' : '') +
          '<p class="rr-card-cap">' + capacity(row) + '</p>' + (text(row.basis) ? '<p class="rr-card-basis">' + esc(row.basis) + '</p>' : '') +
          (riders[i].length ? '<div class="rr-card-list">' + also(riders[i]) + '</div>' : '') +
          '<button type="button" class="rc-card-go" data-goto="' + i + '">표에서 보기 ↓</button>';
        card.hidden = false;
        place(from);
        if (enter) card.querySelector?.('.rc-card-go')?.focus?.({preventScroll: true});
      };
      // The facilities of one site: one line each, which leads to its row; under them the rows of the comparison table
      // that say one of them again.
      const listGroup = (recs, from) => {
        if (!card || !recs.length) return;
        state.picked = null;
        origin = from || null;
        press();
        card.innerHTML = cardTop(group[recs[0]], '같은 자리 ' + recs.length + '곳') + '<div class="rr-card-list">' + recs.map(line).join('') +
          also([...new Set(recs.flatMap(i => riders[i]))].sort((a, b) => a - b)) + '</div>';
        card.hidden = false;
        place(from);
        card.querySelector?.('[data-goto]')?.focus?.({preventScroll: true});
      };
      const drawMap = () => {
        paintMap();
        if (!card || card.hidden) return;
        const el = state.picked === null ? null : [...(mapHost?.querySelectorAll?.('[data-rec]') || [])].find(mark => Number(mark.dataset.rec) === state.picked);
        if (!el) { closeCard(); return; }
        origin = el;
        place(el);
      };
      // A group opens the area around its rows; rows that share a site, or that the area would not part, are listed.
      const openGroup = (recs, from) => {
        const inside = recs.filter(i => rows[i] && located(rows[i]));
        if (!inside.length) return;
        const next = around(inside, .3, 4), now = boundsNow();
        const same = next.flat().every((value, n) => Math.abs(value - now.flat()[n]) < .01);
        if (together(inside) || same) return listGroup(inside, from);
        if (card) { card.hidden = true; card.innerHTML = ''; }
        state.picked = null;
        state.spot = next;
        drawMap();
        mapHost?.querySelector?.('button[tabindex="0"]')?.focus?.({preventScroll: true});
      };
      // The row of the picked facility opens, is marked as the one a picture led to, and comes into view.
      const goTo = i => {
        if (!rows[i]) return;
        if (state.region !== 'all' && group[i] !== state.region) { state.region = 'all'; state.spot = null; state.all = true; draw(); }
        state.open.add(i);
        state.from = i;
        state.all = true;
        if (card) { card.hidden = true; card.innerHTML = ''; }
        state.picked = null;
        press();
        drawTable();
        refocus(i, true);
      };

      const count = () => {
        const visible = seen(), el = host('refinery-roster-count');
        if (el) el.textContent = (visible.length === rows.length ? rows.length + '행' : rows.length + '행 중 ' + visible.length + '행') +
          ' · 시설 ' + visible.filter(i => !again[i]).length + '곳';
      };
      const draw = () => {
        drawTable();
        count();
        [...(host('refinery-roster-region')?.children || [])].forEach(button => button.setAttribute?.('aria-pressed', String(button.dataset?.key === state.region)));
        drawMap();
        paintRank();
      };

      // The region counts: the summary line, the colour key of the pictures and the filter.
      const regionHost = host('refinery-roster-region');
      const byGroup = group.reduce((counts, key) => { counts[key] = (counts[key] || 0) + 1; return counts; }, {});
      const pill = (key, label, n, mark) => '<button type="button" data-key="' + esc(key) + '" aria-pressed="' + (key === state.region) + '">' + esc(label) + ' <b>' + n + '</b>' + (mark || '') + '</button>';
      if (regionHost) regionHost.innerHTML = pill('all', '전체', rows.length) +
        [...GROUPS.map(([key]) => key), 'etc'].filter(key => byGroup[key]).map(key => pill(key, groupLabel(key), byGroup[key], swatch(key))).join('');
      regionHost?.addEventListener?.('click', event => {
        const button = event.target?.closest?.('button[data-key]');
        if (!button || button.disabled) return;
        state.region = button.dataset.key;
        state.spot = null;
        if (card && !card.hidden) closeCard();
        draw();
      });
      dataHost.addEventListener?.('click', event => {
        const target = event.target;
        if (!target?.closest) return;
        const sort = target.closest('[data-sort]');
        if (sort) {
          // A heading sorts by its column, then the other way round, then gives the order of the tables back.
          const key = sort.dataset.sort;
          if (state.sort !== key) { state.sort = key; state.down = false; }
          else if (!state.down) state.down = true;
          else { state.sort = 'order'; state.down = false; }
          drawTable();
          dataHost.querySelector?.('[data-sort="' + key + '"]')?.focus?.({preventScroll: true});
          return;
        }
        if (target.closest('[data-rest]')) {
          // The rest opens under the rows that were there: the focus goes to the first of the new ones.
          const next = sorted()[FOLD];
          state.all = true;
          drawTable();
          if (next !== undefined) refocus(next);
          return;
        }
        const go = target.closest('[data-goto]');
        if (go) return goTo(Number(go.dataset.goto));
        if (target.closest('a, .rc-more')) return;
        const row = target.closest('tr[data-row]');
        if (!row) return;
        if (typeof getSelection === 'function' && String(getSelection() || '') && !target.closest('button')) return;
        toggle(Number(row.dataset.row));
      });
      if (pictures?.addEventListener) {
        pictures.addEventListener('click', event => {
          const target = event.target;
          if (!target?.closest) return;
          if (target.closest('[data-close]')) return closeCard(true);
          const go = target.closest('[data-goto]');
          if (go) return goTo(Number(go.dataset.goto));
          const to = target.closest('[data-bar]');
          if (to) return goTo(Number(to.dataset.bar));
          if (target.closest('[data-back]')) {
            state.spot = null;
            if (card && !card.hidden) closeCard();
            drawMap();
            // The button is gone with the closer look: the focus goes to the marks.
            mapHost?.querySelector?.('button[tabindex="0"]')?.focus?.({preventScroll: true});
            return;
          }
          const many = target.closest('[data-group]');
          if (many) return openGroup(String(many.dataset.group).split(',').map(Number), many);
          const picked = target.closest('[data-rec]');
          if (picked) return pick(Number(picked.dataset.rec), picked, true);
          if (card && !card.hidden && !target.closest('.rc-card, button')) closeCard();
        });
        // The marks of the map are one stop of the tab order: the arrow keys, Home and End move along them.
        const stops = () => [...(mapHost?.querySelectorAll?.(STOP) || [])];
        const hold = el => stops().forEach(other => other.setAttribute('tabindex', other === el ? '0' : '-1'));
        pictures.addEventListener('focusin', event => {
          const stop = event.target?.closest?.(STOP);
          if (stop) hold(stop);
        });
        pictures.addEventListener('keydown', event => {
          if (event.key === 'Escape') { if (card && !card.hidden) closeCard(true); return; }
          const step = {ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1, Home: -Infinity, End: Infinity}[event.key];
          const stop = step && event.target?.closest?.(STOP);
          if (!stop) return;
          const all = stops(), next = all[clamp(all.indexOf(stop) + step, 0, all.length - 1)];
          event.preventDefault?.();
          if (!next || next === stop) return;
          hold(next);
          next.focus?.();
        });
        document.addEventListener?.('pointerdown', event => {
          if (card && !card.hidden && !pictures.contains?.(event.target)) closeCard();
        });
      }

      // The tables' own notes, the reading of each unit and the sources, folded at the end of the section.
      const sourcesHost = host('refinery-roster-sources');
      if (sourcesHost) {
        const linked = source => {
          const url = safeUrl(source.url);
          return '<li>' + (url ? '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + esc(text(source.title)) + ' ↗</a>' : esc(text(source.title))) + '</li>';
        };
        const all = list(roster.sources).filter(source => source && text(source.title));
        const tables = list(roster.tables).filter(table => table && typeof table === 'object');
        const loose = all.filter(source => !tables.some(table => text(table.section) === text(source.section)));
        sourcesHost.innerHTML = tables.map(table => {
          const own = all.filter(source => text(source.section) === text(table.section));
          return '<div class="rr-src"><b>교재 ' + esc(text(table.section)) + ' · ' + esc(text(table.title)) + '</b>' +
            (list(table.notes).length ? '<ul>' + list(table.notes).map(note => '<li>' + esc(note) + '</li>').join('') + '</ul>' : '') +
            (own.length ? '<ul class="rc-sources">' + own.map(linked).join('') + '</ul>' : '') + '</div>';
        }).join('') +
          (loose.length ? '<div class="rr-src"><b>그 밖의 원자료</b><ul class="rc-sources">' + loose.map(linked).join('') + '</ul></div>' : '') +
          (readingOf.size ? '<div class="rr-src"><b>단위 읽는 법</b><ul>' + [...readingOf].filter(([unit, reading]) => unit && reading)
            .map(([unit, reading]) => '<li><b>' + esc(unit) + '</b> ' + esc(reading) + '</li>').join('') + '</ul></div>' : '');
      }

      draw();
      onResize(mapHost, drawMap);
      // The outline of the land is the map file maps.js has asked for; without maps.js it is asked for here.
      // Until it is there, and when it cannot be read, the marks stand on the grid alone.
      if (typeof d3 !== 'undefined' && sites.length) {
        let file = null;
        try { file = energyMapFile; } catch (err) { file = null; }
        if (typeof file?.then !== 'function') file = typeof fetch === 'function'
          ? fetch('energy-data.json').then(response => response.ok ? response.json() : Promise.reject(new Error('energy-data.json ' + response.status))) : null;
        file?.then(data => {
          land = list(data?.world?.features).filter(feature => feature?.properties?.id !== 'ATA');
          drawMap();
        }).catch(err => console.error('refinery-roster: map outline not loaded', err));
      }
    }
  } catch (err) {
    console.error('refinery-roster: 정유시설 명부 not drawn', err);
    HOSTS.forEach(key => {
      const el = host('refinery-roster-' + key);
      if (!el) return;
      el.innerHTML = '';
      el.textContent = '';
      // The pictures go, and so does the folded list, which would open on nothing.
      const box = el.closest?.('.rc-fig') || (key === 'sources' ? el.closest?.('details') : null);
      if (box) box.hidden = true;
    });
    const el = host('refinery-roster-data');
    if (el) el.innerHTML = '<p class="note">명부를 불러오지 못했다.</p>';
  }
})();
