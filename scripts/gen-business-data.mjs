/**
 * Generates the row JSON files for the Business & Management strand.
 *
 * Why a generator rather than hand-written JSON:
 *   - `ucasPoints` is always derived from `entryGrades` with the official UCAS
 *     tariff, so the three grade columns cannot drift apart.
 *   - `tier` / `overallRank` come from one table, so a university carries the
 *     same rank here as it does in the other ten strands.
 *   - `subjectRank` / `gradProspects` come from the CUG 2027 subject tables, so
 *     refreshing after a new CUG edition is one edit per table.
 *   - Every row declares whether its offer was verified against the
 *     university's own 2026 entry page. Unverified rows get an explicit
 *     "Indicative" note and carry no UCAS code or source link, rather than an
 *     invented one.
 *
 * Run: node scripts/gen-business-data.mjs
 */

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/business');

// Provenance is carried in its own field and rendered by ExpandedRow, so that
// `notes` stays short enough for the Highlights column not to balloon row
// height (it is a max-w-xs cell that wraps).
const FALLBACK_NOTE = {
  verified: 'Offer confirmed on the university’s own course page.',
  indicative: 'Offer not confirmed — check the university’s course page.',
};

// Official UCAS tariff.
const TARIFF = { 'A*': 56, A: 48, B: 40, C: 32, D: 24, E: 16 };

/**
 * "AAB" -> "136". For a band or alternative offer ("AAB-BBB", "AAA or A*AB")
 * the first grade set wins, which matches how Table.jsx sorts Entry Grades.
 */
function ucasPoints(entryGrades) {
  const first = String(entryGrades).split(/\s*(?:-|–|or|\/)\s*/i)[0];
  const tokens = first.match(/A\*|[A-E]/g) || [];
  const total = tokens.reduce((sum, t) => sum + (TARIFF[t] || 0), 0);
  return total ? String(total) : null;
}

/**
 * Indicative IB total for an A-level offer, used only where the university does
 * not publish an IB equivalent. Documented in DATA_SOURCES.md.
 */
const IB_FROM_POINTS = {
  168: '41', 160: '39', 152: '38', 144: '36', 136: '35',
  128: '32', 120: '30', 112: '29', 104: '28', 96: '26', 88: '24',
};

function derivedIb(entryGrades) {
  return IB_FROM_POINTS[Number(ucasPoints(entryGrades))] ?? null;
}

// ---------------------------------------------------------------------------
// Universities
//
// tier + overallRank are the values the other ten strands already use, so a
// university does not change rank between strands. bm / bmProspects are the
// CUG 2027 Business & Management Studies rank and graduate-prospects figure;
// bmProspects is the fallback whenever a narrower subject table reports n/a.
// ---------------------------------------------------------------------------
const UNIS = {
  oxford:          { name: 'University of Oxford', tier: 'Russell Group', overallRank: 1, bm: 1, bmProspects: '94%' },
  cambridge:       { name: 'University of Cambridge', tier: 'Russell Group', overallRank: 2, bm: null, bmProspects: '93%' },
  warwick:         { name: 'University of Warwick', tier: 'Russell Group', overallRank: 7, bm: 2, bmProspects: '85%' },
  lse:             { name: 'London School of Economics and Political Science', tier: 'Russell Group', overallRank: 5, bm: 3, bmProspects: '95%' },
  standrews:       { name: 'University of St Andrews', tier: 'Other Universities', overallRank: 5, bm: 4, bmProspects: '90%' },
  ucl:             { name: 'University College London', tier: 'Russell Group', overallRank: 6, bm: 5, bmProspects: '92%' },
  bath:            { name: 'University of Bath', tier: 'Other Universities', overallRank: 9, bm: 6, bmProspects: '91%' },
  kcl:             { name: "King's College London", tier: 'Russell Group', overallRank: 15, bm: 7, bmProspects: '86%' },
  exeter:          { name: 'University of Exeter', tier: 'Russell Group', overallRank: 10, bm: 8, bmProspects: '88%' },
  leeds:           { name: 'University of Leeds', tier: 'Russell Group', overallRank: 14, bm: 9, bmProspects: '81%' },
  bristol:         { name: 'University of Bristol', tier: 'Russell Group', overallRank: 11, bm: 10, bmProspects: '84%' },
  birmingham:      { name: 'University of Birmingham', tier: 'Russell Group', overallRank: 23, bm: 11, bmProspects: '86%' },
  manchester:      { name: 'University of Manchester', tier: 'Russell Group', overallRank: 16, bm: 12, bmProspects: '77%' },
  edinburgh:       { name: 'University of Edinburgh', tier: 'Russell Group', overallRank: 8, bm: 13, bmProspects: '81%' },
  loughborough:    { name: 'Loughborough University', tier: 'Other Universities', overallRank: 10, bm: 14, bmProspects: '86%' },
  durham:          { name: 'Durham University', tier: 'Russell Group', overallRank: 4, bm: 15, bmProspects: '85%' },
  glasgow:         { name: 'University of Glasgow', tier: 'Russell Group', overallRank: 20, bm: 16, bmProspects: '82%' },
  strathclyde:     { name: 'University of Strathclyde', tier: 'Other Universities', overallRank: 38, bm: 17, bmProspects: '81%' },
  citystgeorges:   { name: "City St George's, University of London", tier: 'Other Universities', overallRank: 52, bm: 18, bmProspects: '75%' },
  cardiff:         { name: 'Cardiff University', tier: 'Russell Group', overallRank: 18, bm: 19, bmProspects: '79%' },
  lancaster:       { name: 'Lancaster University', tier: 'Other Universities', overallRank: 11, bm: 20, bmProspects: '85%' },
  sheffield:       { name: 'University of Sheffield', tier: 'Russell Group', overallRank: 19, bm: 21, bmProspects: '71%' },
  liverpool:       { name: 'University of Liverpool', tier: 'Russell Group', overallRank: 24, bm: 22, bmProspects: '80%' },
  nottingham:      { name: 'University of Nottingham', tier: 'Russell Group', overallRank: 17, bm: 23, bmProspects: '80%' },
  qub:             { name: "Queen's University Belfast", tier: 'Russell Group', overallRank: 40, bm: 24, bmProspects: '86%' },
  southampton:     { name: 'University of Southampton', tier: 'Russell Group', overallRank: 12, bm: 25, bmProspects: '83%' },
  york:            { name: 'University of York', tier: 'Russell Group', overallRank: 13, bm: 26, bmProspects: '76%' },
  aberdeen:        { name: 'University of Aberdeen', tier: 'Other Universities', overallRank: 32, bm: 27, bmProspects: '80%' },
  newcastle:       { name: 'Newcastle University', tier: 'Russell Group', overallRank: 22, bm: 28, bmProspects: '73%' },
  reading:         { name: 'University of Reading', tier: 'Other Universities', overallRank: 26, bm: 29, bmProspects: '73%' },
  dundee:          { name: 'University of Dundee', tier: 'Other Universities', overallRank: 42, bm: 30, bmProspects: '75%' },
  surrey:          { name: 'University of Surrey', tier: 'Other Universities', overallRank: 27, bm: 31, bmProspects: '74%' },
  stirling:        { name: 'University of Stirling', tier: 'Other Universities', overallRank: 45, bm: 32, bmProspects: '72%' },
  aston:           { name: 'Aston University', tier: 'Other Universities', overallRank: 45, bm: 33, bmProspects: '75%' },
  sussex:          { name: 'University of Sussex', tier: 'Other Universities', overallRank: 29, bm: 34, bmProspects: '74%' },
  bangor:          { name: 'Bangor University', tier: 'Other Universities', overallRank: 55, bm: 35, bmProspects: '72%' },
  swansea:         { name: 'Swansea University', tier: 'Other Universities', overallRank: 34, bm: 36, bmProspects: '75%' },
  leicester:       { name: 'University of Leicester', tier: 'Other Universities', overallRank: 28, bm: 37, bmProspects: '73%' },
  qmul:            { name: 'Queen Mary University of London', tier: 'Russell Group', overallRank: 21, bm: 38, bmProspects: '71%' },
  aberystwyth:     { name: 'Aberystwyth University', tier: 'Other Universities', overallRank: 46, bm: 39, bmProspects: '57%' },
  uea:             { name: 'University of East Anglia', tier: 'Other Universities', overallRank: 32, bm: 40, bmProspects: '72%' },
  heriotwatt:      { name: 'Heriot-Watt University', tier: 'Other Universities', overallRank: 50, bm: 41, bmProspects: '71%' },
  plymouth:        { name: 'University of Plymouth', tier: 'Other Universities', overallRank: 65, bm: 42, bmProspects: '68%' },
  kent:            { name: 'University of Kent', tier: 'Other Universities', overallRank: 60, bm: 43, bmProspects: '70%' },
  rhul:            { name: 'Royal Holloway, University of London', tier: 'Other Universities', overallRank: 30, bm: 45, bmProspects: '83%' },
  keele:           { name: 'Keele University', tier: 'Other Universities', overallRank: 35, bm: 50, bmProspects: '64%' },
  hull:            { name: 'University of Hull', tier: 'Other Universities', overallRank: 80, bm: 54, bmProspects: '56%' },
  mmu:             { name: 'Manchester Metropolitan University', tier: 'Other Universities', overallRank: 65, bm: 55, bmProspects: '63%' },
  lincoln:         { name: 'University of Lincoln', tier: 'Other Universities', overallRank: 60, bm: 58, bmProspects: '69%' },
  northumbria:     { name: 'Northumbria University', tier: 'Other Universities', overallRank: 55, bm: null, bmProspects: '78%' },
  sheffieldhallam: { name: 'Sheffield Hallam University', tier: 'Other Universities', overallRank: 85, bm: null, bmProspects: '63%' },
  ljmu:            { name: 'Liverpool John Moores University', tier: 'Other Universities', overallRank: 95, bm: null, bmProspects: '64%' },
  westminster:     { name: 'University of Westminster', tier: 'Other Universities', overallRank: 90, bm: null, bmProspects: '62%' },
  harperadams:     { name: 'Harper Adams University', tier: 'Other Universities', overallRank: 70, bm: null, bmProspects: '84%' },
  bournemouth:     { name: 'Bournemouth University', tier: 'Other Universities', overallRank: 75, bm: null, bmProspects: '62%' },
  brighton:        { name: 'University of Brighton', tier: 'Other Universities', overallRank: 70, bm: null, bmProspects: '76%' },
  coventry:        { name: 'Coventry University', tier: 'Other Universities', overallRank: 70, bm: null, bmProspects: '58%' },
  cardiffmet:      { name: 'Cardiff Metropolitan University', tier: 'Other Universities', overallRank: 70, bm: null, bmProspects: '58%' },
  qmu:             { name: 'Queen Margaret University', tier: 'Other Universities', overallRank: 80, bm: null, bmProspects: '52%' },
  napier:          { name: 'Edinburgh Napier University', tier: 'Other Universities', overallRank: 75, bm: null, bmProspects: '58%' },
  rgu:             { name: 'Robert Gordon University', tier: 'Other Universities', overallRank: 85, bm: null, bmProspects: '54%' },
};

// ---------------------------------------------------------------------------
// CUG 2027 subject tables, for the courses that sit in a published table.
// [rank, graduateProspects] — null prospects fall back to bmProspects.
// ---------------------------------------------------------------------------
const CUG_ACCOUNTING = {
  lse: [1, '95%'], warwick: [2, '87%'], bath: [3, '88%'], kcl: [4, '70%'], qub: [5, '92%'],
  leeds: [6, '85%'], durham: [7, '86%'], birmingham: [8, '77%'], exeter: [9, '88%'],
  bristol: [10, '87%'], strathclyde: [11, '81%'], glasgow: [12, '83%'], liverpool: [13, '78%'],
  loughborough: [14, '86%'], manchester: [15, '77%'], nottingham: [16, '85%'], sheffield: [17, '79%'],
  edinburgh: [18, '81%'], lancaster: [19, '79%'], southampton: [20, '82%'], dundee: [21, '81%'],
  newcastle: [22, '84%'], citystgeorges: [23, '75%'], cardiff: [24, '66%'], surrey: [25, '74%'],
  aberdeen: [26, '77%'], swansea: [27, '75%'], leicester: [28, '70%'], stirling: [29, '73%'],
  aston: [30, '71%'], reading: [31, '77%'], heriotwatt: [32, '71%'], qmul: [34, '66%'],
  uea: [35, '71%'], sussex: [36, '64%'], bangor: [37, '68%'], rhul: [39, '65%'],
};

const CUG_MARKETING = {
  bath: [1, null], exeter: [2, '92%'], southampton: [3, '84%'], leeds: [4, '80%'],
  liverpool: [5, '84%'], strathclyde: [6, '86%'], durham: [7, null], bristol: [8, null],
  loughborough: [9, null], birmingham: [10, null], manchester: [11, '70%'],
  citystgeorges: [12, null], york: [13, null], lancaster: [14, '78%'], sussex: [15, '78%'],
  dundee: [16, null], plymouth: [17, null], surrey: [18, '78%'], newcastle: [20, '70%'],
  reading: [21, '76%'], heriotwatt: [22, null], kent: [23, '80%'], aston: [24, '72%'],
  stirling: [25, '70%'], northumbria: [26, '78%'], mmu: [29, '80%'], rhul: [31, null],
  hull: [32, '80%'], leicester: [33, '66%'], lincoln: [34, '76%'], uea: [35, '70%'],
  swansea: [37, '66%'], keele: [40, '78%'],
};

// CUG 2027 Land & Property Management.
const CUG_PROPERTY = {
  reading: [1, '86%'], sheffieldhallam: [2, '100%'], ljmu: [4, '94%'],
  westminster: [6, '92%'], harperadams: [8, '84%'],
};

// CUG 2027 Tourism, Transport, Travel & Heritage Studies.
const CUG_TOURISM = {
  surrey: [1, '58%'], strathclyde: [2, '68%'], aberystwyth: [4, null], mmu: [8, '62%'],
  stirling: [9, '48%'], plymouth: [10, '54%'], sheffieldhallam: [12, '56%'],
  northumbria: [14, '50%'], bournemouth: [18, '62%'], lincoln: [19, '60%'],
  brighton: [20, '76%'], ljmu: [25, '64%'], qmu: [29, '52%'], napier: [30, '58%'],
  cardiffmet: [32, '58%'], westminster: [37, '50%'], rgu: [38, '42%'], coventry: [43, '22%'],
};

// ---------------------------------------------------------------------------
// Courses. Each row: [uniKey, courseName, opts]
//   opts.grades  A-level offer (required)
//   opts.ib      published IB offer; omitted means derived from the A-levels
//   opts.code    UCAS code, only where it comes from the university itself
//   opts.src     course page URL, only for verified rows
//   opts.match   'exact' | 'close' (default 'exact')
//   opts.note    extra sentence appended after the provenance note
// ---------------------------------------------------------------------------
const COURSES = [
  {
    file: 'business-management.json',
    table: 'bm',
    rows: [
      ['oxford', 'Economics and Management (BA)', { grades: 'A*AA', ib: '39 (766)', code: 'LN12', src: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/economics-and-management', match: 'close', note: 'Maths required at A or A*; TSA admissions test. Oxford has no standalone Business degree — Economics and Management is the route.' }],
      ['warwick', 'Business and Management (BSc)', { grades: 'A*AA', ib: '38', code: 'N200', src: 'https://warwick.ac.uk/study/undergraduate/courses/bsc-management/', note: 'Warwick Business School; no required A-level subjects, but GCSE Maths at 7/A.' }],
      ['lse', 'Management (BSc)', { grades: 'AAA', ib: '38 (766)', code: 'N200', src: 'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-management', note: 'A-level Maths essential and HL Maths required at 6; the most quantitative of the big management degrees.' }],
      ['standrews', 'Management (MA Hons)', { grades: 'AAA', ib: '38 (666)', code: 'N200', src: 'https://www.st-andrews.ac.uk/subjects/management/management-ma/', note: 'Scottish four-year MA — broad first two years before specialising. Minimum entry is ABB / IB 36 (655).' }],
      ['ucl', 'Management Science (BSc)', { grades: 'A*AA', ib: '39 (19 HL)', code: 'N991', src: 'https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/management-science-bsc-2026', match: 'close', note: 'The A* must be in Maths, and HL Maths at 7. TARA admissions test required from the 2026 cycle. Taught at Canary Wharf; analytics-led rather than general business.' }],
      ['bath', 'Management (BSc)', { grades: 'AAA or A*AB', ib: '36 (666)', src: 'https://www.bath.ac.uk/courses/undergraduate-2026/business-and-management/bsc-management/', note: 'Bath expects one numerical and one essay-based subject. Placement variants available; the course page does not publish a UCAS code.' }],
      ['kcl', 'Business Management (BSc)', { grades: 'A*AA', code: 'N200', ib: '38 (19 HL)', src: 'https://www.kcl.ac.uk/study/undergraduate/courses/business-management-bsc/entry-requirements', note: 'A-levels must include grade A in a humanities or social science subject (not a modern language); IB needs a 6 in one at HL. Contextual offer AAB / IB 35.' }],
      ['exeter', 'Business and Management (BSc)', { grades: 'AAB', ib: '34 (665)', code: 'N202', src: 'https://www.exeter.ac.uk/undergraduate-degrees/bsc-business-and-management/', note: 'Needs GCSE Maths at 5/B. NN12 is the industrial-experience route and N204 the year abroad.' }],
      ['leeds', 'Business Management (BA)', { grades: 'AAA', ib: '35 (17 HL)', code: 'N200', src: 'https://courses.leeds.ac.uk/i475/business-management-ba', note: 'Leeds University Business School; GCSE Maths and English at 5/B.' }],
      ['bristol', 'Business and Management (BSc)', { grades: 'AAA or A*AB', ib: '36 (18 HL)', code: 'N200', src: 'https://www.bristol.ac.uk/study/undergraduate/2026/business-and-management/bsc-business-and-management/', note: 'Taught at the new Temple Quarter campus; contextual offer ABB.' }],
      ['birmingham', 'Business Management (BSc)', { grades: 'AAB', ib: '32 (665)', code: 'N200', src: 'https://www.birmingham.ac.uk/undergraduate/courses/business/business-management', note: 'Birmingham Business School; placement and year-abroad variants.' }],
      ['manchester', 'Management (BSc)', { grades: 'AAA', ib: '36 (666)', code: 'N201', src: 'https://www.manchester.ac.uk/study/undergraduate/courses/2026/03519/bsc-management/', note: 'Alliance Manchester Business School. Will not accept Maths + Further Maths + a native language.' }],
      ['edinburgh', 'Business Management (MA Hons)', { grades: 'A*AA-AAA', ib: '40 (766)-37 (666)', src: 'https://study.ed.ac.uk/programmes/undergraduate/182-business-management/entry-requirements', note: 'Four-year Scottish MA. No A-level subjects required; GCSE Maths at 6/B. The entry-requirements page publishes no UCAS code.' }],
      ['loughborough', 'Business and Management (BSc)', { grades: 'AAB', ib: '35 (665)', code: 'N202', src: 'https://www.lboro.ac.uk/study/undergraduate/courses/management/', note: 'N202 is the three-year route; N200 is the four-year placement route.' }],
      ['durham', 'Business and Management (BA)', { grades: 'AAB', ib: '35 (665)', code: 'N201', src: 'https://www.durham.ac.uk/business/courses/business-and-management-n201/september-2026/', note: 'IB must include Maths at HL, or SL Maths at 5. Contextual offer BBB/ABC.' }],
      ['glasgow', 'Business and Management (MA SocSci)', { grades: 'AAB-BBB', ib: '36 (665)', code: 'N200', src: 'https://www.gla.ac.uk/undergraduate/degrees/businessmanagement/', note: 'Requires A-level English or a humanities subject. No prior business study needed.' }],
      ['strathclyde', 'Business Enterprise (BA Hons)', { grades: 'ABB-BBB', ib: '36', code: 'N190', src: 'https://www.strath.ac.uk/courses/undergraduate/businessenterprise/', match: 'close', note: 'Strathclyde Business School; IB requires no subject below 5 including English and Maths at SL5.' }],
      ['citystgeorges', 'Business Management (BSc)', { grades: 'AAA', ib: '35', code: 'N102', src: 'https://www.bayes.citystgeorges.ac.uk/study/undergraduate/courses/business-management/2025', note: 'Bayes Business School; N121 is the professional-placement route. Needs GCSE Maths at 6/B.' }],
      ['cardiff', 'Business Management (BSc)', { grades: 'AAB-BBB', ib: '34-31 (666-665)', code: 'N201', src: 'https://www.cardiff.ac.uk/study/undergraduate/courses/course/business-management-bsc', note: 'The grade range spans Cardiff’s standard and contextual offers. Grade A in the EPQ typically lowers the offer by one grade.' }],
      ['lancaster', 'Business Management (BSc)', { grades: 'ABB', ib: '32 (16 HL)', code: 'N102', src: 'https://www.lancaster.ac.uk/study/undergraduate/courses/business-management-bsc-hons-n102/2026/', note: 'Lancaster University Management School; study-abroad and industry variants under separate codes.' }],
      ['sheffield', 'Business Management (BA)', { grades: 'AAB', ib: '34', code: 'N200', src: 'https://sheffield.ac.uk/undergraduate/courses/2026/business-management-ba', note: 'IB 33 accepted with an A in a social-science extended essay. Access Sheffield offer is ABB / IB 33.' }],
      ['liverpool', 'Business Management (BA)', { grades: 'AAB', ib: '34 (665)', code: 'N100', src: 'https://www.liverpool.ac.uk/courses/2026/business-management-ba-hons', note: 'IB accepted as 34 overall with nothing below 4, or the Diploma plus 665 at HL.' }],
      ['nottingham', 'Business and Management (BSc)', { grades: 'AAA', ib: '34 (666)', code: 'N200', src: 'https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Business-and-Management-BSc-Hons.html', note: 'A*AB and A*A*C also accepted. Needs GCSE Maths at 6/B.' }],
      ['qub', 'Business Management with Placement (BSc)', { grades: 'ABB', ib: '33 (655)', code: 'N202', src: 'https://www.qub.ac.uk/courses/undergraduate/business-management-placement-bsc-n202/', note: 'Queen’s Business School now lists only the four-year placement route. Needs GCSE Maths at 6/B. Published cycle is 2027/28 entry.' }],
      ['southampton', 'Business Management (BSc)', { grades: 'AAB', ib: '34 (17 HL)', code: 'N202', src: 'https://www.southampton.ac.uk/courses/business-management-degree-bsc', note: 'GCSE Maths at 6/B, or 5 with a B in a quantitative A-level. N203 is the placement route.' }],
      ['york', 'Business and Management (BSc)', { grades: 'AAB', ib: '35', code: 'N202', src: 'https://www.york.ac.uk/study/undergraduate/courses/bsc-business-management/', note: 'School for Business and Society; needs GCSE Maths at 5/B. Optional placement year.' }],
      ['aberdeen', 'Business Management (MA Hons)', { grades: 'BBC', ib: '32 (555)', code: 'N200', src: 'https://www.abdn.ac.uk/study/undergraduate/degree-programmes/474/N200/business-management/', note: 'Four-year Scottish MA, and the most accessible entry band in this table. Widening-access offer CCC.' }],
      ['newcastle', 'Business Management (BA)', { grades: 'AAB', ib: '34', code: 'N200', src: 'https://www.ncl.ac.uk/undergraduate/degrees/n200/', note: 'Newcastle University Business School.' }],
      ['reading', 'Business and Management (BSc)', { grades: 'ABB', ib: '32', code: 'N100', src: 'https://www.reading.ac.uk/ready-to-study/study/subject-area/business-and-management-accounting-and-finance-ug/bsc-business-and-management', note: 'Henley Business School. IB needs 4 in Maths and English at SL. Published cycle is 2027/28 entry.' }],
      ['surrey', 'Business Management (BSc)', { grades: 'ABB', ib: '33', code: 'N200', src: 'https://www.surrey.ac.uk/undergraduate/business-management', note: 'Surrey Business School; placement variant at the same grades. IB needs English and Maths at HL4/SL4. Published cycle is 2027 entry.' }],
      ['aston', 'Business and Management (BSc)', { grades: 'BBB', ib: '31 (555)', code: 'NN12', src: 'https://www.aston.ac.uk/study/courses/business-and-management-bsc/september-2026', note: 'The placement year is compulsory, making this a four-year degree. Contextual offer BBC.' }],
    ],
  },
  {
    file: 'international-business.json',
    table: 'comparison',
    rows: [
      ['warwick', 'International Business and Management (BSc)', { grades: 'A*AA', ib: '38', code: 'N290', src: 'https://warwick.ac.uk/study/undergraduate/courses/bsc-international-business-management/', note: 'Requires GCSE Maths at 7/A and English Language at 6/B.' }],
      ['bath', 'International Management (BSc)', { grades: 'AAA or A*AB', ib: '36 (666)', src: 'https://www.bath.ac.uk/courses/undergraduate-2027/business-and-management/bsc-international-management-with-study-or-work-abroad/', note: 'Four years with a compulsory year abroad on placement or exchange. The course page publishes no UCAS code, and the published cycle is 2027 entry.' }],
      ['kcl', 'International Management (BSc)', { grades: 'A*AA', ib: '38 (19 HL)', code: 'N290', src: 'https://www.kcl.ac.uk/study/undergraduate/courses/international-management-bsc/entry-requirements', note: 'A-levels must include grade A in a humanities or social science subject (not a modern language).' }],
      ['leeds', 'International Business (BSc)', { grades: 'AAA', ib: '35 (17 HL)', code: 'N120', src: 'https://courses.leeds.ac.uk/f831/international-business-bsc', note: 'Accredited by the Chartered Institute of Export & International Trade; optional study-abroad and placement years.' }],
      ['birmingham', 'International Business (BSc)', { grades: 'AAB', ib: '32 (665)', code: 'N120', src: 'https://www.birmingham.ac.uk/study/undergraduate/subjects/business-and-management-courses/international-business-bsc', note: 'A four-year degree. Needs GCSE English at 6/B and Maths at 5/B.' }],
      ['manchester', 'International Management (BSc)', { grades: 'AAA', ib: '36 (666)', code: 'N247', src: 'https://www.manchester.ac.uk/study/undergraduate/courses/2026/18515/bsc-international-management/', note: 'Includes a compulsory year abroad at a partner business school.' }],
      ['edinburgh', 'International Business (MA Hons)', { grades: 'A*AA-AAA', ib: '40 (766)-37 (666)', src: 'https://study.ed.ac.uk/programmes/undergraduate/183-international-business/entry-requirements', note: 'Four-year Scottish MA with compulsory study abroad; Year 3 placement needs a 60% Year 1 average. The entry-requirements page publishes no UCAS code.' }],
      ['loughborough', 'International Business (BSc)', { grades: 'AAB', ib: '35 (665)', code: 'N120', src: 'https://www.lboro.ac.uk/study/undergraduate/courses/international-business/', note: 'N120 is the three-year route; N110 is the four-year placement route.' }],
      ['strathclyde', 'International Business (BA Hons)', { grades: 'ABB-BBB', ib: '32-30', code: 'N120', src: 'https://www.strath.ac.uk/courses/undergraduate/internationalbusiness/', note: 'Compulsory year abroad, with seven specialisms including finance, marketing and HR.' }],
      ['lancaster', 'International Management (BSc)', { grades: 'ABB', ib: '32 (16 HL)', code: 'N123', src: 'https://www.lancaster.ac.uk/study/undergraduate/courses/international-management-bsc-hons-n123/2026/', note: 'Lancaster University Management School; N124 is the industry route.' }],
      ['reading', 'International Business and Management (BSc)', { grades: 'ABB', ib: '32', code: 'N120', src: 'https://www.reading.ac.uk/ready-to-study/study/subject-area/business-and-management-accounting-and-finance-ug/bsc-international-business-and-management', note: 'Henley Business School; transfer to a specialist pathway is possible after Year 1.' }],
      ['aston', 'International Business and Management (BSc)', { grades: 'BBB', ib: '31 (555)', code: 'NNC2', src: 'https://www.aston.ac.uk/study/courses/international-business-and-management-bsc', note: 'Four years with a compulsory integrated placement year. Contextual offer BBC.' }],
      ['sussex', 'International Business (BSc)', { grades: 'ABB-BBB', ib: '32', code: 'N120', src: 'https://www.sussex.ac.uk/study/undergraduate/courses/international-business-bsc-hons', note: 'Professional placement year available.' }],
    ],
  },
  {
    file: 'economics-management.json',
    table: 'comparison',
    rows: [
      ['oxford', 'Economics and Management (BA)', { grades: 'A*AA', ib: '39 (766)', code: 'LN12', src: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/economics-and-management', note: 'Maths required at A or A*; TSA admissions test. Among the most competitive courses in the UK.' }],
      ['leeds', 'Business Economics (BSc)', { grades: 'AAA', ib: '35 (17 HL)', code: 'L112', src: 'https://courses.leeds.ac.uk/f835/business-economics-bsc', match: 'close', note: 'Leeds has no Economics and Management degree. Less mathematical than its straight Economics BSc; needs GCSE Maths at 7/A.' }],
      ['manchester', 'Management (International Business Economics) (BSc)', { grades: 'AAA', ib: '36 (666)', code: 'N246', src: 'https://www.manchester.ac.uk/study/undergraduate/courses/2026/03527/bsc-management-international-business-economics/', match: 'close', note: 'Contextual offer ABB-BBB.' }],
      ['edinburgh', 'Business and Economics (MA Hons)', { grades: 'A*AA-AAA', ib: '40 (766)-37 (666)', src: 'https://study.ed.ac.uk/programmes/undergraduate/186-business-and-economics/entry-requirements', note: 'Four-year Scottish MA. Requires Maths at B (or AS Maths at A) and HL Maths at 5. The entry-requirements page publishes no UCAS code.' }],
      ['loughborough', 'Economics and Management (BSc)', { grades: 'AAB', ib: '35 (665)', code: 'LN12', src: 'https://www.lboro.ac.uk/study/undergraduate/courses/economics-and-management/', note: 'LN12 is the three-year route; LN1F is the four-year placement route.' }],
      ['nottingham', 'Industrial Economics (BSc)', { grades: 'AAA', ib: '34 (666)', code: 'L1N2', src: 'https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/2026/Industrial-Economics-BSc-Hons.html', match: 'close', note: 'Nottingham describes this as the UK’s only dedicated Industrial Economics degree. A*AB and A*A*C also accepted.' }],
      ['reading', 'Business Economics (BSc)', { grades: 'ABB', ib: '32', code: 'L113', src: 'https://www.reading.ac.uk/ready-to-study/study/subject-area/economics-ug/bsc-business-economics', note: 'IB needs 5 in Maths at SL. Published cycle is 2027 entry.' }],
      ['aston', 'Business Economics (BSc)', { grades: 'BBB', ib: '31 (555)', code: 'LN10', src: 'https://www.aston.ac.uk/study/courses/economics-and-management-bsc', note: 'Four years with a compulsory integrated placement year; shared first year with the Economics degree. Contextual offer BBC.' }],
      ['swansea', 'Economics and Business (BSc)', { grades: 'BBB-BBC', ib: '32', code: 'L112', src: 'https://www.swansea.ac.uk/undergraduate/courses/social-sciences/economics/bsc-economics-business/', match: 'close', note: 'Taught in the School of Social Sciences rather than the School of Management. Year-abroad and year-in-industry routes are L1W3 and L1W2.' }],
      ['leicester', 'Business Economics (BSc)', { grades: 'ABB', code: 'LN11', src: 'https://le.ac.uk/courses/economics-and-business-bsc/2026', match: 'close', note: 'Needs GCSE Maths at 5/B. Year-abroad and year-in-industry routes share the code. The page publishes no IB total, so the IB figure here is the A-level equivalent. Published cycle is 2027 entry.' }],
      ['kent', 'Economics and Management (BSc)', { grades: 'BBB', ib: '30', code: 'LN12', src: 'https://www.kent.ac.uk/courses/undergraduate/1941/economics-and-management', note: 'BBC accepted with A-level Maths. Kent also quotes 120 UCAS tariff points.' }],
      ['hull', 'Business Economics (BA)', { grades: 'BBC', code: 'L013', src: 'https://www.hull.ac.uk/study/undergraduate/courses/business-economics-ba-hons', match: 'close', note: 'Hull quotes a tariff range of 96-112 UCAS points rather than fixed grades, and publishes no IB total, so the IB figure here is the A-level equivalent.' }],
    ],
  },
  {
    file: 'accounting.json',
    table: 'accounting',
    rows: [
      ['kcl', 'Accounting & Finance (BSc)', { grades: 'A*AA', ib: '38 (19 HL)', code: 'NN34', src: 'https://www.kcl.ac.uk/study/undergraduate/courses/accounting-finance-bsc/entry-requirements', match: 'close', note: 'A-levels must include grade A in Maths, and the IB a 6 in HL Maths. Accredited by ACCA, ICAEW, ICAS and CIMA.' }],
      ['bath', 'Accounting and Management (BSc)', { grades: 'AAA or A*AB', ib: '36 (666)', src: 'https://www.bath.ac.uk/courses/undergraduate-2026/accounting-and-finance/bsc-accounting-and-management/', note: 'IB alternative is 765 at HL. The course page publishes no UCAS code.' }],
      ['qub', 'Advanced Accounting with Placement (MAcc)', { grades: 'AAB', ib: '34 (665)', code: 'N400', src: 'https://www.qub.ac.uk/courses/undergraduate/2026/advanced-accounting-placement-macc-n400/', match: 'close', note: 'Four-year integrated masters; Queen’s no longer lists a three-year Accounting BSc. Needs GCSE Maths at 6/B.' }],
      ['leeds', 'Accounting and Finance (BSc)', { grades: 'AAA', ib: '35 (17 HL)', code: 'N420', src: 'https://courses.leeds.ac.uk/f834/accounting-and-finance-bsc', match: 'close', note: 'Leeds has no Accounting and Management degree; this is the equivalent route.' }],
      ['durham', 'Accounting (BSc)', { grades: 'AAB', ib: '35 (665)', code: 'N408', src: 'https://www.durham.ac.uk/business/courses/accounting-n408/', note: 'Needs GCSE Maths at 6/B if Maths is not taken at A-level. Placement and year-abroad variants are N409 and N410.' }],
      ['birmingham', 'Accounting and Finance (BSc)', { grades: 'AAA', ib: '32 (666)', code: 'N400', src: 'https://www.birmingham.ac.uk/study/undergraduate/subjects/accounting-and-finance-courses/accounting-and-finance-bsc', match: 'close', note: 'Needs GCSE Maths at 6. Birmingham offers no Accounting and Management degree.' }],
      ['exeter', 'Accounting and Business (BSc)', { grades: 'AAB', ib: '34 (665)', code: 'NN41', src: 'https://www.exeter.ac.uk/undergraduate-degrees/bsc-accounting-and-business/', note: 'Four-year variants available with industrial experience or a year abroad.' }],
      ['strathclyde', 'Accounting (BA Hons)', { grades: 'AAA', ib: '36', code: 'N400', src: 'https://www.strath.ac.uk/courses/undergraduate/accounting/', note: 'Requires A-level Maths at A; IB needs HL5 Maths and SL5 English. Triple-crown accredited.' }],
      ['loughborough', 'Accounting and Finance (BSc)', { grades: 'AAB', ib: '35 (665)', code: 'N400', src: 'https://www.lboro.ac.uk/study/undergraduate/courses/accounting-and-finance-bsc/', match: 'close', note: 'N400 is the three-year route; NN34 is the four-year placement route.' }],
      ['manchester', 'Management (Accounting and Finance) (BSc)', { grades: 'AAA', ib: '36 (666)', code: 'NN24', src: 'https://www.manchester.ac.uk/study/undergraduate/courses/2026/03520/bsc-management-accounting-and-finance/', match: 'close', note: 'Accredited route towards ICAEW and ACCA exemptions.' }],
      ['sheffield', 'Accounting and Financial Management (BA)', { grades: 'AAB', ib: '34', code: 'N420', src: 'https://sheffield.ac.uk/undergraduate/courses/2027/accounting-and-financial-management-ba', note: 'A BA, not a BSc. IB 33 accepted with an A in a social-science extended essay. Needs GCSE Maths at 6/B.' }],
      ['lancaster', 'Accounting and Management (BSc)', { grades: 'AAB', ib: '35 (16 HL)', code: 'NN24', src: 'https://www.lancaster.ac.uk/study/undergraduate/courses/accounting-and-management-bsc-hons-nn24/2026/', note: 'Needs GCSE Maths at 6/B and English at 4/C.' }],
      ['southampton', 'Accounting and Finance (BSc)', { grades: 'AAB', ib: '34 (17 HL)', code: 'N400', src: 'https://www.southampton.ac.uk/courses/accounting-finance-degree-bsc', match: 'close', note: 'Requires GCSE Maths at grade 5 or above.' }],
      ['newcastle', 'Accounting and Finance (BSc)', { grades: 'AAB', ib: '34', code: 'N400', src: 'https://www.ncl.ac.uk/undergraduate/degrees/n400/', match: 'close', note: 'Professionally accredited with exemptions from several professional bodies.' }],
      ['cardiff', 'Accounting and Finance (BSc)', { grades: 'AAB-BBB', ib: '34-31 (666-665)', code: 'N490', src: 'https://www.cardiff.ac.uk/study/undergraduate/courses/course/accounting-and-finance-bsc', match: 'close', note: 'The grade range spans Cardiff’s standard and contextual offers.' }],
      ['surrey', 'Accounting and Finance (BSc)', { grades: 'ABB', ib: '33', code: 'NN34', src: 'https://www.surrey.ac.uk/undergraduate/accounting-and-finance', match: 'close', note: 'Accredited by five professional bodies, giving exemptions from selected exams.' }],
      ['aston', 'Accounting and Finance (BSc)', { grades: 'BBB', ib: '31 (555)', code: 'N420', src: 'https://www.aston.ac.uk/study/courses/accounting-and-finance-bsc', match: 'close', note: 'Four years with a compulsory integrated placement year. Contextual offer BBC.' }],
      ['dundee', 'Accountancy (BAcc Hons)', { grades: 'CCC', ib: '28 (554)', code: 'N400', src: 'https://www.dundee.ac.uk/undergraduate/accountancy-bacc-hons', match: 'close', note: 'Four-year Scottish degree starting at Level 1; three-year Level 2 entry needs IB 30. Accredited by ICAS, ACCA, CIMA, AIA and CAI.' }],
    ],
  },
  {
    file: 'marketing.json',
    table: 'marketing',
    rows: [
      ['bath', 'Management with Marketing (BSc)', { grades: 'AAA or A*AB', ib: '36 (666)', src: 'https://www.bath.ac.uk/courses/undergraduate-2027/business-and-management/bsc-management-with-marketing/', note: 'IB alternative is 765 at HL; contextual offer ABB. The course page publishes no UCAS code, and the published cycle is 2027 entry.' }],
      ['exeter', 'Marketing and Management (BSc)', { grades: 'AAB', ib: '34 (665)', code: 'N2N5', src: 'https://www.exeter.ac.uk/undergraduate-degrees/bsc-marketing-and-management/', note: 'Exeter titles this Marketing and Management rather than a Business and Management marketing pathway.' }],
      ['southampton', 'Marketing (BSc)', { grades: 'AAA', ib: '36 (18 HL)', code: 'N501', src: 'https://www.southampton.ac.uk/courses/marketing-degree-bsc', note: 'Needs GCSE Maths at grade 5 or above.' }],
      ['leeds', 'Business Management with Marketing (BA)', { grades: 'AAA', ib: '35 (17 HL)', code: 'N2N5', src: 'https://courses.leeds.ac.uk/i476/business-management-with-marketing-ba', note: 'Optional placement and study-abroad routes; marketing sits alongside analytics and enterprise pathways.' }],
      ['liverpool', 'Marketing (BA)', { grades: 'AAB', ib: '34 (665)', code: 'N500', src: 'https://www.liverpool.ac.uk/courses/2026/marketing-ba-hons', note: 'CIM-accredited.' }],
      ['strathclyde', 'Marketing (BA Hons)', { grades: 'ABB-BBB', ib: '32-30', code: 'N500', src: 'https://www.strath.ac.uk/courses/undergraduate/marketing/', note: 'Strathclyde’s Marketing department is one of the oldest in the UK.' }],
      ['durham', 'Marketing and Management (BSc)', { grades: 'AAB', ib: '35 (665)', code: 'N513', src: 'https://www.durham.ac.uk/business/courses/marketing-and-management-n513/', note: 'IB must include Maths at HL. Placement and study-abroad variants are N514 and N515.' }],
      ['bristol', 'Marketing (BSc)', { grades: 'AAA', ib: '36 (18 HL)', code: 'N500', src: 'https://www.bristol.ac.uk/study/undergraduate/2027/marketing/bsc-marketing/', note: 'A*AB also accepted; contextual offer ABB / IB 32. Accredited by CIM and the IDM. Published cycle is 2027 entry.' }],
      ['loughborough', 'Marketing (BSc)', { grades: 'AAB', ib: '35 (665)', code: 'NN53', src: 'https://www.lboro.ac.uk/study/undergraduate/courses/marketing-and-management/', note: 'NN53 is the three-year route; NN52 is the four-year placement route.' }],
      ['birmingham', 'Business Management with Marketing (BSc)', { grades: 'AAB', ib: '32 (665)', code: 'N202', src: 'https://www.birmingham.ac.uk/study/undergraduate/subjects/business-and-management-courses/business-management-with-marketing-bsc', match: 'close', note: 'Title, code and IB offer are from the course page, which publishes no A-level offer for the Birmingham campus; AAB is Birmingham’s Business Management offer.' }],
      ['manchester', 'Management (Marketing) (BSc)', { grades: 'AAA', ib: '36 (666)', code: 'N2N5', src: 'https://www.manchester.ac.uk/study/undergraduate/courses/2026/03528/bsc-management-marketing/', match: 'close', note: 'Marketing is declared as a specialism within BSc Management; N2N6 is the placement route.' }],
      ['citystgeorges', 'Business with Marketing (BSc)', { grades: 'AAA', ib: '35', code: 'N1N5', src: 'https://www.bayes.citystgeorges.ac.uk/study/undergraduate/courses/business-with-marketing', match: 'close', note: 'Bayes Business School; N151 is the professional-placement route. Needs GCSE Maths at 6/B.' }],
      ['york', 'Marketing (BSc)', { grades: 'AAB', ib: '35', code: 'N500', src: 'https://www.york.ac.uk/study/undergraduate/courses/bsc-marketing/', note: 'CIM-accredited; needs GCSE Maths at 5/B. Year-in-industry variant available.' }],
      ['lancaster', 'Marketing (BSc)', { grades: 'AAB', ib: '35 (16 HL)', code: 'N500', src: 'https://www.lancaster.ac.uk/study/undergraduate/courses/marketing-management-bsc-hons-n500/2026/', note: 'Lancaster University Management School; CIM-recognised content.' }],
      ['sussex', 'Marketing and Management (BSc)', { grades: 'ABB-BBB', ib: '32', code: 'NN25', src: 'https://www.sussex.ac.uk/study/undergraduate/courses/marketing-and-management-bsc-hons', note: 'CIM-accredited; professional placement year available.' }],
      ['surrey', 'Business Management with Marketing (BSc)', { grades: 'ABB', ib: '33', code: 'N494', src: 'https://www.surrey.ac.uk/undergraduate/business-management-marketing', match: 'close', note: 'CIM-accredited. IB needs English and Maths at HL4/SL4. Published cycle is 2027 entry.' }],
      ['newcastle', 'Marketing (BSc)', { grades: 'AAB', ib: '34', code: 'N500', src: 'https://www.ncl.ac.uk/undergraduate/degrees/n500/', note: 'Industry-led modules with placement and study-abroad options.' }],
      ['reading', 'Business and Management (Marketing) (BSc)', { grades: 'ABB', ib: '32', code: 'NN25', src: 'https://www.reading.ac.uk/ready-to-study/study/subject-area/business-and-management-accounting-and-finance-ug/bsc-business-and-management-marketing', note: 'Henley Business School. IB needs 4 in Maths and English at SL. Published cycle is 2027 entry.' }],
      ['kent', 'Business and Marketing (BSc)', { grades: 'ABB', code: 'N500', src: 'https://www.kent.ac.uk/courses/undergraduate/868/marketing-bsc', match: 'close', note: 'Kent now titles this Business and Marketing. It publishes IB as 128 tariff points (typically H5 H6 H6) rather than a total, so the IB figure here is the A-level equivalent.' }],
      ['aston', 'Marketing (BSc)', { grades: 'BBB', ib: '31 (555)', code: 'N500', src: 'https://www.aston.ac.uk/study/courses/marketing-bsc', note: 'Four years with a compulsory integrated placement year. Contextual offer BBC.' }],
    ],
  },
  {
    file: 'human-resource-management.json',
    table: 'comparison',
    rows: [
      ['leeds', 'Business Management and Human Resources (BA)', { grades: 'AAB', ib: '35 (16 HL)', code: '8H67', src: 'https://courses.leeds.ac.uk/k251/business-management-and-human-resources-ba', note: 'Confers eligibility for CIPD Associate membership on graduation.' }],
      ['strathclyde', 'Human Resource Management (BA Hons)', { grades: 'ABB-BBB', ib: '32-30', code: 'N600', src: 'https://www.strath.ac.uk/courses/undergraduate/humanresourcemanagement/', note: 'Four-year Scottish degree at a triple-crown accredited business school.' }],
      ['lancaster', 'Business and Human Resource Management (BSc)', { grades: 'ABB', ib: '32 (16 HL)', code: 'N600', src: 'https://www.lancaster.ac.uk/study/undergraduate/courses/business-and-human-resource-management-bsc-hons-n600/2026/', note: 'CIPD-aligned content; industry variant under a separate code.' }],
      ['aston', 'Human Resources and Business Management (BSc)', { grades: 'BBB', ib: '31 (555)', code: 'N600', src: 'https://www.aston.ac.uk/study/courses/human-resources-and-business-management-bsc', note: 'Four years with a compulsory integrated placement year. Contextual offer BBC.' }],
      ['keele', 'Business Management and Human Resources (BSc)', { grades: 'BBB', code: 'NN69', src: 'https://www.keele.ac.uk/study/undergraduate/undergraduatecourses/businessandhumanresourcemanagement/', note: 'Keele also runs a BA Business Management with Human Resources at BBC under the same UCAS code. The page publishes no IB total, so the IB figure here is the A-level equivalent.' }],
      ['hull', 'Business Management with Human Resource Management (BA)', { grades: 'BBC', src: 'https://www.hull.ac.uk/study/undergraduate/courses/business-management-with-human-resource-management-ba-hons', note: 'Hull quotes a UCAS tariff range rather than fixed grades (112 points equals BBC) and publishes no UCAS code or IB total on the page, so the IB figure here is the A-level equivalent.' }],
      ['mmu', 'Human Resource Management and Business (BA)', { grades: 'BBC', code: 'N206', src: 'https://www.mmu.ac.uk/study/undergraduate/course/ba-human-resource-management-and-business', match: 'close', note: 'Manchester Met quotes 104-112 UCAS tariff points; 112 equals BBC. The page publishes no IB total, so the IB figure here is the A-level equivalent.' }],
      ['northumbria', 'Business and Human Resource Management (BA)', { grades: 'BBC', code: 'N110', src: 'https://www.northumbria.ac.uk/study-at-northumbria/courses/ba-hons-business-and-human-resource-management-uusbrm1/', note: 'Newcastle Business School quotes 96-112 UCAS tariff points; 112 equals BBC. No subject requirements. The page publishes no IB total, so the IB figure here is the A-level equivalent.' }],
      ['westminster', 'Business Management (Human Resource Management) (BA)', { grades: 'BBC', code: 'NN26', src: 'https://www.westminster.ac.uk/business-and-management-courses/2026-27/september/full-time/business-management-human-resource-management-ba-honours', note: 'Westminster quotes 112 UCAS tariff points for both A-levels and the IB, so the IB figure here is the A-level equivalent.' }],
      ['napier', 'Business Management with Human Resource Management (BA)', { grades: 'BCC', ib: '28 (654)', code: 'N2NP', src: 'https://www.napier.ac.uk/courses/ba-hons-business-management-with-human-resource-management-undergraduate-fulltime', note: 'Four-year Scottish degree with Year 2 and Year 3 entry available from HNC and HND qualifications.' }],
    ],
  },
  {
    file: 'entrepreneurship.json',
    table: 'comparison',
    rows: [
      ['manchester', 'Management (Innovation, Strategy and Entrepreneurship) (BSc)', { grades: 'AAA', ib: '36 (666)', code: 'N200', src: 'https://www.manchester.ac.uk/study/undergraduate/courses/2026/11245/bsc-management-innovation-strategy-and-entrepreneurship/', note: 'Specialisation can be declared after Year 1, keeping the general management route open.' }],
      ['strathclyde', 'Business Enterprise (BA Hons)', { grades: 'ABB-BBB', ib: '36', code: 'N190', src: 'https://www.strath.ac.uk/courses/undergraduate/businessenterprise/', note: 'Four-year Scottish degree; IB needs no subject below 5 plus SL5 English and Maths. Deferred entry is not normally accepted.' }],
      ['lancaster', 'Business Management for Entrepreneurship (BSc)', { grades: 'ABB', ib: '32 (16 HL)', code: 'N1N2', src: 'https://www.lancaster.ac.uk/study/undergraduate/courses/business-management-for-entrepreneurship-bsc-hons-n1n2/2026/', note: 'Mentoring through LUMS’ Entrepreneurs in Residence network.' }],
      ['aston', 'Business Enterprise Development (BSc)', { grades: 'BBC', ib: '29 (554)', src: 'https://www.aston.ac.uk/study/courses/business-enterprise-development-bsc', note: 'A compulsory interview forms part of the application, and no offer is made without it. The course page publishes no UCAS code.' }],
      ['bournemouth', 'Business & Management (Entrepreneurship) (BA)', { grades: 'ABB-BBC', code: 'NN12', src: 'https://www.bournemouth.ac.uk/study/courses/ba-hons-business-management-entrepreneurship', note: 'Bournemouth quotes 112-128 UCAS tariff points. The page publishes no IB total, so the IB figure here is the A-level equivalent. Published cycle is 2027 entry.' }],
      ['brighton', 'Business Management with Entrepreneurship (BSc)', { grades: 'ABB-BCC', ib: '26', src: 'https://www.brighton.ac.uk/courses/study/business-management-with-entrepreneurship-bsc-hons.aspx', note: 'Brighton quotes 104-128 UCAS tariff points for 2027 entry. The page publishes no UCAS code.' }],
      ['westminster', 'Business Management (Entrepreneurship) (BA)', { grades: 'BBC', code: 'N291', src: 'https://www.westminster.ac.uk/business-and-management-courses/2026-27/september/full-time/business-management-entrepreneurship-ba-honours', note: 'Marylebone campus. Westminster quotes 112 UCAS tariff points for both A-levels and the IB, so the IB figure here is the A-level equivalent.' }],
      ['hull', 'Business Management with Entrepreneurship (BA)', { grades: 'BBC', src: 'https://www.hull.ac.uk/study/undergraduate/courses/business-management-with-entrepreneurship-ba-hons', note: 'Hull quotes a UCAS tariff range rather than fixed grades (112 points equals BBC) and publishes no UCAS code or IB total on the page.' }],
    ],
  },
  {
    file: 'business-analytics.json',
    table: 'comparison',
    rows: [
      ['ucl', 'Information Management for Business (BSc)', { grades: 'AAA', ib: '38 (18 HL)', code: 'P1N1', src: 'https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/information-management-business-bsc-2026', match: 'close', note: 'UCL’s business-technology degree; science or social science A-levels preferred. No IB subject below 5.' }],
      ['exeter', 'Business Analytics (BSc)', { grades: 'AAB', ib: '34 (665)', code: 'N300', src: 'https://www.exeter.ac.uk/undergraduate-degrees/bsc-business-analytics/', note: 'Needs GCSE Maths at 5/B. N301 is the industrial-experience route and N302 the year abroad. Contextual offer BBB / IB 30.' }],
      ['leeds', 'Business and Intelligent Technologies (BSc)', { grades: 'AAB', ib: '35 (16 HL)', code: 'N1I4', src: 'https://courses.leeds.ac.uk/k239/business-and-intelligent-technologies-bsc', match: 'close', note: 'Leeds has no undergraduate Business Analytics degree; this is the equivalent route. A-levels must include Maths, and HL Maths at 4 is required.' }],
      ['manchester', 'Information Technology Management for Business (BSc)', { grades: 'AAA', ib: '36 (666)', code: 'GN51', src: 'https://www.manchester.ac.uk/study/undergraduate/courses/2026/06246/bsc-information-technology-management-for-business/', match: 'close', note: 'Designed with over 40 blue-chip employers. Contextual offer ABB-BBB.' }],
      ['loughborough', 'Information Technology Management for Business (BSc)', { grades: 'AAB', ib: '35 (665)', code: 'GN52', src: 'https://www.lboro.ac.uk/study/undergraduate/courses/information-technology-management-for-business-bsc/', match: 'close', note: 'GN52 is the three-year route; GN51 is the four-year placement route.' }],
      ['lancaster', 'Management and Digital Technologies (BSc)', { grades: 'ABB', ib: '32 (16 HL)', code: 'GN51', src: 'https://www.lancaster.ac.uk/study/undergraduate/courses/management-and-information-technology-bsc-hons-gn51/2026/', match: 'close', note: 'Formerly Management and Information Technology; blends LUMS and computing modules.' }],
      ['southampton', 'Business Analytics (BSc)', { grades: 'AAB', ib: '34 (17 HL)', code: 'N100', src: 'https://www.southampton.ac.uk/courses/business-analytics-degree-bsc', note: 'Needs GCSE Maths at grade 5 or above. N101 is the placement route and N110 the study-abroad route.' }],
      ['surrey', 'Business Management with Business Analytics (BSc)', { grades: 'ABB', ib: '33', code: 'N400', src: 'https://www.surrey.ac.uk/undergraduate/business-management-business-analytics', match: 'close', note: 'Optional Professional Training placement year. IB total is Surrey’s published business-school figure; the course page lists A-levels only. Published cycle is 2027 entry.' }],
      ['kent', 'Business Analytics and Management (BSc)', { grades: 'ABB', ib: '32 (16 HL)', code: 'N201', src: 'https://www.kent.ac.uk/courses/undergraduate/5092/business-analytics-management', note: 'IB needs Maths at 4, HL or SL. Kent also quotes 112-128 UCAS tariff points.' }],
      ['aston', 'Business Analytics (BSc)', { grades: 'BBB', ib: '31 (555)', code: 'NG12', src: 'https://www.aston.ac.uk/study/courses/business-analytics-bsc', note: 'Four years with a compulsory integrated placement year; needs SL Maths at 5. Contextual offer BBC.' }],
    ],
  },
  {
    file: 'supply-chain.json',
    table: 'comparison',
    rows: [
      ['cardiff', 'Business Management (Logistics and Operations) (BA)', { grades: 'AAB', match: 'close', note: 'Cardiff’s logistics and operations group is one of the strongest in the UK.' }],
      ['lancaster', 'Management and Supply Chain (BSc)', { grades: 'ABB' }],
      ['loughborough', 'Management with Operations (BSc)', { grades: 'AAB', match: 'close' }],
      ['liverpool', 'Business Management (Operations) (BA)', { grades: 'AAB', match: 'close' }],
      ['aston', 'Business and Operations Management (BSc)', { grades: 'ABB' }],
      ['heriotwatt', 'Business Management (Logistics) (BA)', { grades: 'BBB', match: 'close' }],
      ['northumbria', 'Business with Logistics and Supply Chain Management (BA)', { grades: 'BBC' }],
      ['hull', 'Logistics and Supply Chain Management (BSc)', { grades: 'BBC', note: 'Hull has a long-established logistics institute tied to the Humber ports.' }],
      ['sheffieldhallam', 'Business and Logistics Management (BSc)', { grades: 'BBC' }],
      ['coventry', 'International Logistics (BSc)', { grades: 'BBC' }],
      ['plymouth', 'Business Management (Operations and Logistics) (BSc)', { grades: 'BBC', match: 'close' }],
      ['lincoln', 'Business and Supply Chain Management (BA)', { grades: 'BBC' }],
    ],
  },
  {
    file: 'business-languages.json',
    table: 'comparison',
    rows: [
      ['bath', 'International Management and Modern Languages (BSc)', { grades: 'AAA or A*AB', ib: '36 (666)', note: 'Four years with a year abroad. Grades shown are Bath’s published management band.' }],
      ['leeds', 'Business Management with a Modern Language (BA)', { grades: 'AAA' }],
      ['manchester', 'Management (International Studies) (BSc)', { grades: 'AAA', match: 'close' }],
      ['exeter', 'Business and Management with Modern Languages (BSc)', { grades: 'AAB' }],
      ['durham', 'Business and Management with a Modern Language (BA)', { grades: 'A*AA' }],
      ['sheffield', 'Business Management with a Modern Language (BA)', { grades: 'AAB' }],
      ['newcastle', 'Business Management with a Modern Language (BA)', { grades: 'AAB' }],
      ['cardiff', 'Business Management with a Modern Language (BA)', { grades: 'AAB' }],
      ['strathclyde', 'Business and a Modern Language (BA Hons)', { grades: 'ABB-BBB' }],
      ['aston', 'Business Management with a Modern Language (BSc)', { grades: 'ABB' }],
      ['heriotwatt', 'International Business Management with a Language (BA)', { grades: 'BBB' }],
      ['northumbria', 'Business with a Modern Language (BA)', { grades: 'BBC' }],
    ],
  },
  {
    file: 'real-estate.json',
    table: 'property',
    rows: [
      ['cambridge', 'Land Economy (BA)', { grades: 'A*AA', ib: '40 (776)', match: 'close', note: 'Cambridge’s law, economics and land-management tripos. Not in the CUG Land & Property table (insufficient data), so no subject rank is shown.' }],
      ['reading', 'Real Estate (BSc)', { grades: 'AAB', ib: '34', code: 'N231', src: 'https://www.reading.ac.uk/ready-to-study/study/subject-area/real-estate-and-planning-ug/bsc-real-estate', note: 'Henley Business School; RICS-accredited and ranked first in the UK for the subject.' }],
      ['aberdeen', 'Real Estate (BSc)', { grades: 'AAB', note: 'RICS-accredited; strong links to the Aberdeen commercial property market.' }],
      ['sheffieldhallam', 'Real Estate (BSc)', { grades: 'BBC' }],
      ['ljmu', 'Real Estate Management (BSc)', { grades: 'BBB' }],
      ['westminster', 'Real Estate (BSc)', { grades: 'BBB' }],
      ['harperadams', 'Rural Property Management (BSc)', { grades: 'BBC', note: 'Rural and agricultural estate management rather than commercial property.' }],
    ],
  },
  {
    file: 'hospitality-tourism.json',
    table: 'tourism',
    rows: [
      ['surrey', 'International Hospitality and Tourism Management (BSc)', { grades: 'BCC-CCC', ib: '30-29', code: 'N230', src: 'https://www.surrey.ac.uk/undergraduate/international-hospitality-and-tourism-management', note: 'Ranked first in the UK for the subject; N231 is the placement route.' }],
      ['strathclyde', 'Hospitality and Tourism Management (BA Hons)', { grades: 'ABB-BBB' }],
      ['aberystwyth', 'Tourism Management (BSc)', { grades: 'BBC' }],
      ['mmu', 'International Tourism Management (BA)', { grades: 'BBC' }],
      ['stirling', 'Tourism and Events Management (BA Hons)', { grades: 'BBB' }],
      ['plymouth', 'Tourism Management (BSc)', { grades: 'BBC' }],
      ['sheffieldhallam', 'International Tourism Management (BSc)', { grades: 'BBC' }],
      ['northumbria', 'Tourism and Events Management (BA)', { grades: 'BBC' }],
      ['bournemouth', 'International Hospitality and Tourism Management (BA)', { grades: 'BCC' }],
      ['lincoln', 'International Tourism Management (BA)', { grades: 'BCC' }],
      ['brighton', 'International Tourism Management (BSc)', { grades: 'CCC' }],
      ['ljmu', 'International Tourism Management (BA)', { grades: 'BCC' }],
      ['qmu', 'International Hospitality and Tourism Management (BA)', { grades: 'CCC' }],
      ['napier', 'Tourism and Airline Management (BA)', { grades: 'CCC' }],
      ['cardiffmet', 'Tourism and Hospitality Management (BA)', { grades: 'CCC' }],
      ['westminster', 'Tourism and Events Management (BA)', { grades: 'CCC' }],
      ['rgu', 'International Tourism and Hospitality Management (BA)', { grades: 'CCC' }],
      ['coventry', 'International Hospitality and Tourism Management (BA)', { grades: 'CCC' }],
    ],
  },
];

const TABLES = {
  accounting: CUG_ACCOUNTING,
  marketing: CUG_MARKETING,
  property: CUG_PROPERTY,
  tourism: CUG_TOURISM,
};

function buildRow(uniKey, courseName, opts, index, table) {
  const uni = UNIS[uniKey];
  if (!uni) throw new Error(`Unknown university key: ${uniKey}`);

  const verified = Boolean(opts.src);
  const ibGrades = opts.ib ?? derivedIb(opts.grades);
  if (!ibGrades) throw new Error(`No IB equivalent for grades "${opts.grades}" (${uniKey})`);

  let subjectRank = null;
  let gradProspects = uni.bmProspects;

  if (table === 'bm') {
    subjectRank = uni.bm;
  } else if (table === 'comparison') {
    subjectRank = index + 1;
  } else {
    const entry = TABLES[table]?.[uniKey];
    if (entry) {
      subjectRank = entry[0];
      gradProspects = entry[1] ?? uni.bmProspects;
    }
  }

  const provenance = verified ? 'verified' : 'indicative';

  return {
    provenance,
    ibSource: opts.ib ? 'published' : 'derived',
    name: uni.name,
    tier: uni.tier,
    overallRank: uni.overallRank,
    subjectRank,
    entryGrades: opts.grades,
    ibGrades,
    ucasPoints: ucasPoints(opts.grades),
    typicalOffer: opts.grades,
    gradProspects,
    courseName,
    ...(opts.code ? { applicationCode: opts.code } : {}),
    ...(opts.src ? { sourceUrl: opts.src } : {}),
    matchType: opts.match ?? 'exact',
    notes: opts.note ?? FALLBACK_NOTE[provenance],
  };
}

let total = 0;
for (const course of COURSES) {
  const rows = course.rows.map(([uniKey, courseName, opts = {}], index) =>
    buildRow(uniKey, courseName, opts, index, course.table));

  const names = new Set();
  for (const row of rows) {
    if (names.has(row.name)) throw new Error(`${course.file}: duplicate university ${row.name}`);
    names.add(row.name);
  }

  writeFileSync(resolve(OUT_DIR, course.file), `${JSON.stringify(rows, null, 2)}\n`, 'utf8');
  const verified = rows.filter(r => r.sourceUrl).length;
  console.log(`  ${course.file.padEnd(32)} ${String(rows.length).padStart(2)} rows (${verified} verified)`);
  total += rows.length;
}

console.log(`\n${COURSES.length} courses, ${total} rows written to src/data/business/`);
