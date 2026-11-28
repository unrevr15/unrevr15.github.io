'use strict';
// 최신 자료일 of the page's sections (backlog 8, 최신성: backlog/08-09-event-chain.md, design 라 and work
// step 1).
//
// The day a section was last researched is recorded for six sections only, and their heads keep the
// check date they carry (N월 N일 확인, 가장 늦은 확인일, 확인 기준). So does every head that already names a
// check or research day (확인, 조사: the event chains, the subsidy overview) or this date (최신 자료일: the
// value chain overview). Every other section gets, after the meta of its head, 최신 자료일: the latest date
// among the dated material the section itself cites, the definition the value chain overview uses, except
// that the live and supply observation dates the section prints in <time> count too (the overview's date is
// the value chain as_of, and the segment cards print their close date as plain text, not in <time>, so live
// quotes do not count there). The dates are read from the data each time the page loads, so they
// cannot fall behind it:
//   * research.js sources the section cites (a.ref to #s-<key>) or lists (the source cards),
//   * facts.js values with a `date` whose `home` is in the section,
//   * reference-data.js datasets the section holds (`published` and `as_of`),
//   * value-chain-data.js companies of a segment section (report_date and source dates, as the overview),
//   * subsidy-data.js countries of a region section (source and price dates),
//   * <time datetime> in the section, which the auto-updated sections print for the live and supply
//     payloads, and data-latest, the newest observation supply.js prints in a section of its desk.
// A date is a day or, for a monthly series, a month; a month counts when it is later than the month of
// every day, and the head then writes YYYY.MM. Nothing later than the reader's day (KST) is shown, and a
// section with no dated citation shows nothing. A section the page does not build (the public copy leaves
// some out) is simply not there.
//
// A source card is research.js's [title, detail, url]. Its date is the latest day the card states: a full
// date in its title or detail (2026년 10월 30일, 2026.10.30), a date in its URL path (-2026-10-27/), or a
// day written without its year (11월 6일, 10월 27~28일). Such a day takes the year the card names last
// before it (IEA · 2022년 러시아 석유 공급 · 2월 24일 is 2022-02-24) when that does not put it after the
// data day; otherwise it takes the latest year that keeps it on or before the data day. The data day is
// the latest of the 기준일 the data files carry (as_of of the value chain, ledger, roster, 분기 비교,
// reference, subsidy and event chain files) and the full dates the cards state. So a day later than the
// data day, written without its year, is dated a year early (11월 25일 against 2026-11-22 is 2025-11-25);
// a card that states such a day writes its year, which also moves the data day (the test checks the 60 days
// after the data day). A scheduled day after today is not written as a date in a card, since a full date
// would move the data day past today. A card that states no day (a statistics page, a series) has no date.
//
// Runs after every script that draws a section (index.html loads it last); each section is dated inside
// its own try. backend/tests/test_energy_section_dates.py runs it in node.
const sectionDates = (() => {
  const pad = n => String(n).padStart(2, '0');
  // A calendar day as YYYY-MM-DD, or null (2월 30일 is none).
  const calendarDay = (y, m, d) => {
    y = Number(y); m = Number(m); d = Number(d);
    const t = new Date(Date.UTC(y, m - 1, d));
    return y >= 1900 && t.getUTCFullYear() === y && t.getUTCMonth() === m - 1 && t.getUTCDate() === d
      ? y + '-' + pad(m) + '-' + pad(d) : null;
  };
  const isDay = v => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && calendarDay(...v.split('-')) === v;
  const isMonth = v => typeof v === 'string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(v);
  // The days and months a free-text date field holds ('2026-10-30(미국 SPR 잔고), 2026-08-31(...)').
  const datesIn = text => (String(text ?? '').match(/\d{4}-\d{2}(?:-\d{2})?(?!\d)/g) || []).filter(v => isDay(v) || isMonth(v));

  // The latest of days and months: the latest day, unless a month is later than its month.
  function latest(values) {
    const days = values.filter(isDay).sort(), months = values.filter(isMonth).sort();
    const day = days[days.length - 1] || null, month = months[months.length - 1] || null;
    return month && (!day || month > day.slice(0, 7)) ? month : day;
  }

  // ---- source cards -------------------------------------------------------------------------
  // A full date, a day with or without its year, or a year alone (it names the year of the days after it).
  const TEXT_DATE = /(20\d\d)[.-](\d{2})[.-](\d{2})(?!\d)|(?:(20\d\d)년\s*)?(\d{1,2})월\s*(\d{1,2})(?:\s*~\s*(\d{1,2}))?일|(20\d\d)년/g;
  const URL_DATE = /(?:^|\D)(20\d\d)[-/](\d{2})[-/](\d{2})(?!\d)/g;
  const card = key => typeof sources !== 'undefined' && sources && Array.isArray(sources[key]) ? sources[key] : null;
  // Full days of a card, and its days without a year as [month, day, the year named before them].
  function cardDays(entry) {
    const full = [], open = [];
    let named = null;
    for (const m of (String(entry[0] ?? '') + ' · ' + String(entry[1] ?? '')).matchAll(TEXT_DATE)) {
      if (m[1]) {
        const day = calendarDay(m[1], m[2], m[3]);
        if (day) full.push(day);
        named = m[1];
      } else if (m[5]) {
        const last = m[7] || m[6];
        if (m[4]) {
          const day = calendarDay(m[4], m[5], last);
          if (day) full.push(day);
          named = m[4];
        } else open.push([m[5], last, named]);
      } else named = m[8];
    }
    for (const m of String(entry[2] ?? '').matchAll(URL_DATE)) {
      const day = calendarDay(m[1], m[2], m[3]);
      if (day) full.push(day);
    }
    return {full, open};
  }

  let dataDayMemo;
  // The page's data day: the latest 기준일 of the data files and full date of the source cards.
  function dataDay() {
    if (dataDayMemo !== undefined) return dataDayMemo;
    const days = [];
    const take = value => { if (isDay(value)) days.push(value); };
    const holder = value => value && typeof value === 'object' ? value : {};
    if (typeof valueChain !== 'undefined') take(holder(valueChain).as_of);
    if (typeof recordsAsOf !== 'undefined') take(recordsAsOf);
    if (typeof refineryRoster !== 'undefined') take(holder(refineryRoster).as_of);
    if (typeof peerQuarters !== 'undefined') take(holder(peerQuarters).as_of);
    if (typeof energyReference !== 'undefined') take(holder(energyReference).as_of);
    if (typeof fuelSubsidy !== 'undefined') take(holder(fuelSubsidy).as_of);
    if (typeof eventChains !== 'undefined') take(holder(eventChains).as_of);
    if (typeof sources !== 'undefined' && sources) {
      for (const key of Object.keys(sources)) if (card(key)) days.push(...cardDays(card(key)).full);
    }
    dataDayMemo = latest(days.filter(isDay));
    return dataDayMemo;
  }

  // A day written without its year.
  function yearless(month, day, named) {
    const limit = dataDay();
    if (!limit) return null;
    if (named) {
      const dated = calendarDay(named, month, day);
      if (dated && dated <= limit) return dated;
    }
    const year = Number(limit.slice(0, 4));
    const dated = calendarDay(year, month, day);
    return dated && dated <= limit ? dated : calendarDay(year - 1, month, day);
  }

  // The date of a research.js source card, or null when it states no day.
  function sourceDay(key) {
    const entry = card(key);
    if (!entry) return null;
    const {full, open} = cardDays(entry);
    return latest([...full, ...open.map(([month, day, named]) => yearless(month, day, named)).filter(Boolean)]);
  }

  // ---- what a section cites -----------------------------------------------------------------
  const regionSection = region => 'subsidy-' + String(region).replace(/[^a-z0-9]+/gi, '-');
  function cited(section) {
    const out = [];
    for (const a of section.querySelectorAll('a.ref[href^="#s-"]')) {
      const day = sourceDay(String(a.getAttribute('href')).slice(3));
      if (day) out.push(day);
    }
    for (const a of section.querySelectorAll('a.source-card[id^="s-"]')) {
      const day = sourceDay(String(a.id).slice(2));
      if (day) out.push(day);
    }
    for (const el of section.querySelectorAll('time[datetime], [data-latest]')) {
      out.push(el.getAttribute('datetime') || el.getAttribute('data-latest'));
    }
    if (section.getAttribute('data-latest')) out.push(section.getAttribute('data-latest'));
    if (typeof facts !== 'undefined' && facts) {
      for (const record of Object.values(facts)) {
        for (const value of (record && record.values) || []) {
          if (!value || !isDay(value.date) || !value.home) continue;
          const home = document.getElementById(value.home);
          if (home && (home === section || section.contains(home))) out.push(value.date);
        }
      }
    }
    if (typeof energyReference !== 'undefined' && energyReference && Array.isArray(energyReference.layout)) {
      const datasets = new Map((energyReference.datasets || []).map(ds => [ds && ds.id, ds]));
      for (const place of energyReference.layout.filter(place => place && place.section === section.id)) {
        for (const panel of place.panels || []) {
          for (const id of (panel && panel.items) || []) {
            const ds = datasets.get(id);
            if (ds) out.push(...datesIn(ds.published), ...datesIn(ds.as_of));
          }
        }
      }
    }
    if (typeof valueChain !== 'undefined' && valueChain && Array.isArray(valueChain.segments)) {
      const segment = valueChain.segments.find(seg => seg && 'vc-' + seg.id === section.id);
      for (const company of (segment && segment.companies) || []) {
        out.push(company.report_date, ...(company.sources || []).map(s => s && s.date));
      }
    }
    if (typeof fuelSubsidy !== 'undefined' && fuelSubsidy && Array.isArray(fuelSubsidy.regions)) {
      const region = fuelSubsidy.regions.find(([key]) => regionSection(key) === section.id);
      for (const country of region ? (fuelSubsidy.countries || []).filter(c => c && c.region === region[0]) : []) {
        out.push(...(country.sources || []).map(s => s && s.date), ...(country.prices || []).map(p => p && p.date));
      }
    }
    return out.filter(v => isDay(v) || isMonth(v));
  }

  // ---- the heads ----------------------------------------------------------------------------
  // A head that already says which day it is on.
  const RECORDED = /확인|조사|최신 자료일/;
  const readerDay = () => new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
  const label = value => '<span class="section-latest">최신 자료일 <time datetime="' + value + '">' + value.replaceAll('-', '.') + '</time></span>';
  const applied = [];
  function apply(doc) {
    const today = readerDay();
    for (const section of doc.querySelectorAll('section.section[id]')) {
      if (section.hasAttribute('data-desk')) continue;
      try {
        const head = section.querySelector(':scope > .section-head');
        const meta = head ? head.querySelector('.meta') : null;
        if (meta && RECORDED.test(meta.textContent || '')) continue;
        const value = latest(cited(section).filter(v => v <= (isDay(v) ? today : today.slice(0, 7))));
        if (!value) continue;
        if (meta) meta.insertAdjacentHTML('beforeend', ((meta.textContent || '').trim() ? ' · ' : '') + label(value));
        else if (head) head.insertAdjacentHTML('beforeend', '<span class="meta">' + label(value) + '</span>');
        else section.insertAdjacentHTML('afterbegin', '<div class="section-head section-head-latest"><span class="meta">' + label(value) + '</span></div>');
        applied.push([section.id, value]);
      } catch (err) {
        console.error('section-dates: ' + section.id + ' not dated', err);
      }
    }
  }
  if (typeof document !== 'undefined' && document && typeof document.querySelectorAll === 'function') {
    try {
      apply(document);
    } catch (err) {
      console.error('section-dates: sections not dated', err);
    }
  }
  return {sourceDay, dataDay, latest, applied};
})();
