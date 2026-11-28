'use strict';
// 사건 연결 (backlog 9): one chain per event, from the event to the facilities
// hit, production and runs, shipments and trade, stocks and imports, the
// companies exposed and industrial costs and consumer prices. event-chains.js
// draws each chain as a section (chain-<id>) of the desk its chainFrames entry
// names (지정학 when it has none) and the market and industry summary as a
// section of 물가전이 › 전이 (chain-summary). The pilot is the Russian refinery
// strikes; step 7 of the plan added the Gulf and Hormuz disruption, Qatar LNG,
// the copper concentrate shortage, the Australian coal export ports and Mosaic's
// phosphate curtailment. `records` are the event's ledger rows and stay empty
// only when the ledger has none (copper, coal ports); the chain's chainFrames
// entry then names where it starts instead (`start`).
//
// A chain holds no research of its own. Every link points by id at a record the
// page already has: a ledger row (record), a refinery roster row (roster), a
// facts.js value (fact, with the index of the value; the page prints it with
// fact() and the link carries no number of its own), a 분기 비교 metric or note
// (peer_metric, peer_note), a company card figure (card_metric: card, label and
// period of the card's metric) or a sentence of a card (card_text: the quoted
// words must stand in the card's highlights, guidance or read-through), or a
// research.js source (source). A link with nothing behind it is unknown and says
// what is missing.
//
// `step` is the 연결 단계 (1 영향 시설·장치 to 6 산업비용·소비자가격; a chainFrames
// entry may word the six for its goods), not the six supply stages of the
// ledger. `status` is measured (실측), estimated (추정), derived (계산:
// arithmetic on page values) or unknown (미확인). `scope` is the level the
// value covers (facility, country, region, market) and `attribution` says whether
// it belongs to this event alone (event) or not (mixed: an aggregate with other
// causes in it, or a value not specific to this event such as a generic repair
// range). `topics` are the chain's markets and industries the value is
// about; the summary table reads them. `indicator` names the series of the page
// that keeps moving (live: energy_live.SERIES, supply: section.key of the supply
// payload, jodi: country.product.flow, fact: facts.js id).
//
// `company_links` (backlog 9, step 6) tie a figure of a company card to a series
// of the live payload over the same period. `card` is the vc-co- anchor (the
// ledger's form; 분기 비교 names the card by ticker) and `target` the card's
// metric by label and period (card_metric). value-chain.js draws a 연결 지표 line
// under that card's metric table with the series' value for `indicator_period`,
// worked out from the payload when the page loads; event-chains.js counts the
// links of the exposed cards in the summary's 실적 연결 column. `relation` is
// what is compared (물량, 수율, 판매단가, 원가, 마진, 운임). `direction` stays
// empty: the line says what is compared, not which way one moves the other.
// `status` is the figure's, by the rule of the links (a 분기 비교 실적 is
// measured, a company's own metric estimated), or unknown where no series of
// the page stands for the other side; `note` then gives the reason, and
// otherwise the definitions that differ.
//
// as_of is the latest `checked` of the chains, the 확인 기준 of the summary. Keep
// the object strict JSON: backend/tests/test_energy_chains.py parses it. The
// public Pages copy leaves all chains out (public_scope.json), so a link's basis
// may name the paid feed behind an agency figure, as the page's source cards do.
const eventChains = null;
