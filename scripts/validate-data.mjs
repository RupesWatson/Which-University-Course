import fs from 'node:fs/promises';
import path from 'node:path';
import { OXFORD_SUBJECT_KEYS, CAMBRIDGE_SUBJECT_KEYS } from '../src/config/oxbridgeSubjects.js';

const DATA_DIR = new URL('../src/data/', import.meta.url);

// Each strand has its own folder of subject row files. Meta files
// (course-details.json, university-details.json) and the courses.js
// barrel are excluded from row-level validation.
const STRANDS = {
  biochemistry: [
    'biochemistry.json',
    'chemistry.json',
    'natural-sciences.json',
    'biomedical-sciences.json',
    'pharmacology.json',
    'molecular-biology.json',
    'medicinal-chemistry.json',
    'genetics.json',
    'microbiology.json',
    'biochemistry-with-industry.json',
  ],
  finance: [
    'universities.json',
    'economics-finance.json',
    'financial-maths.json',
    'banking-finance.json',
    'actuarial.json',
    'fintech.json',
    'applied-ai.json',
    'data-science.json',
    'tech-management.json',
    'investment-banking.json',
    'venture-capital.json',
    'international-finance.json',
    'esg-finance.json',
    'finance-law.json',
    'behavioural-finance.json',
    'finance-innovation.json',
  ],
  humanities: [
    'english-literature.json',
    'history.json',
    'philosophy.json',
    'classics.json',
    'french.json',
    'spanish.json',
    'german.json',
    'modern-languages.json',
    'linguistics.json',
    'art-history.json',
    'music.json',
    'english-creative-writing.json',
    'drama-theatre.json',
  ],
  socialsciences: [
    'politics.json',
    'law.json',
    'economics.json',
    'psychology.json',
    'sociology.json',
    'ppe.json',
    'criminology.json',
    'international-relations.json',
    'politics-economics.json',
    'social-policy.json',
    'social-anthropology.json',
    'forensic-psychology.json',
    'international-development.json',
  ],
};

function fail(message) {
  throw new Error(message);
}

// ── business strand ─────────────────────────────────────────────────────────
// The business rows are generated (scripts/gen-business-data.mjs) and follow a
// different provenance convention from the four strands above: offers are cited
// from each university's own course page rather than from digital.ucas.com, and
// rows that could not be confirmed say so instead of carrying an invented UCAS
// code. These checks enforce the invariants the generator is supposed to hold.
const BUSINESS_FILES = [
  'business-management.json',
  'international-business.json',
  'economics-management.json',
  'accounting.json',
  'marketing.json',
  'human-resource-management.json',
  'entrepreneurship.json',
  'business-analytics.json',
  'supply-chain.json',
  'business-languages.json',
  'real-estate.json',
  'hospitality-tourism.json',
];

const TARIFF = { 'A*': 56, A: 48, B: 40, C: 32, D: 24, E: 16 };

function expectedUcasPoints(entryGrades) {
  const first = String(entryGrades).split(/\s*(?:-|–|or|\/)\s*/i)[0];
  const tokens = first.match(/A\*|[A-E]/g) || [];
  const total = tokens.reduce((sum, t) => sum + (TARIFF[t] || 0), 0);
  return total ? String(total) : null;
}

// Mirrors toSlug in Table.jsx — the slug the UI will look a profile up by.
function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/^university of /, '')
    .replace(/ university$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function validateBusiness() {
  console.log('\n=== business ===');

  const courseDetails = JSON.parse(
    await fs.readFile(new URL('business/course-details.json', DATA_DIR), 'utf8'));
  const uniDetails = JSON.parse(
    await fs.readFile(new URL('business/university-details.json', DATA_DIR), 'utf8'));
  const courseSource = await fs.readFile(new URL('business/courses.js', DATA_DIR), 'utf8');

  // Every course declared in the barrel needs a detail page, or CoursePage renders empty.
  const declaredIds = [...courseSource.matchAll(/^\s*id: '([^']+)'/gm)].map(m => m[1]);
  if (!declaredIds.length) fail('business/courses.js: no course ids found');
  for (const id of declaredIds) {
    if (!courseDetails[id]) fail(`business/courses.js: course '${id}' has no course-details entry`);
  }

  // One university must not report two different ranks or tiers across the strand.
  const identity = new Map();

  for (const file of BUSINESS_FILES) {
    const rows = JSON.parse(await fs.readFile(new URL(`business/${file}`, DATA_DIR), 'utf8'));
    const seen = new Set();
    let verified = 0;

    rows.forEach((row, index) => {
      const label = `business/${file} row ${index + 1} (${row.name})`;

      if (!row.name) fail(`${label}: missing university name`);
      if (seen.has(row.name)) fail(`${label}: duplicate university`);
      seen.add(row.name);

      if (!row.courseName) fail(`${label}: missing courseName`);
      if (!['exact', 'close'].includes(row.matchType)) fail(`${label}: invalid matchType`);
      if (row.overallRank == null) fail(`${label}: missing overallRank`);
      if (!['Russell Group', 'Other Universities'].includes(row.tier)) fail(`${label}: invalid tier`);
      if (!row.gradProspects) fail(`${label}: missing gradProspects`);
      if (!row.entryGrades) fail(`${label}: missing entryGrades`);
      if (!row.typicalOffer) fail(`${label}: missing typicalOffer`);

      // The three grade columns are driven off one source, so they must agree.
      const expected = expectedUcasPoints(row.entryGrades);
      if (row.ucasPoints !== expected) {
        fail(`${label}: ucasPoints ${row.ucasPoints} does not match entryGrades ${row.entryGrades} (expected ${expected})`);
      }

      // Filters.jsx asks for an IB *total*, so ibGrades must lead with one.
      // A per-subject value like "6-6-5" would silently mark every course a match.
      const ibTotal = parseInt(row.ibGrades, 10);
      if (Number.isNaN(ibTotal) || ibTotal < 24 || ibTotal > 45) {
        fail(`${label}: ibGrades "${row.ibGrades}" must lead with an IB total between 24 and 45`);
      }

      // Provenance drives the "Verified"/"Not verified" field in ExpandedRow and
      // the course-title label in the mobile card, so it must agree with whether
      // the row actually cites a source.
      if (!row.notes) fail(`${label}: missing notes`);
      if (!['published', 'derived'].includes(row.ibSource)) fail(`${label}: invalid ibSource`);
      if (row.ibSource === 'derived' && row.provenance === 'verified' && !row.sourceUrl) {
        fail(`${label}: verified row without a source`);
      }

      if (row.sourceUrl) {
        verified += 1;
        if (row.provenance !== 'verified') fail(`${label}: has a sourceUrl but provenance is '${row.provenance}'`);
        if (!row.sourceUrl.startsWith('https://')) fail(`${label}: sourceUrl is not https`);
      } else {
        if (row.provenance !== 'indicative') fail(`${label}: no sourceUrl but provenance is '${row.provenance}'`);
        if (row.applicationCode && !row.notes.includes('course URL')) {
          fail(`${label}: has a UCAS code but no source — codes must come from the university`);
        }
      }

      // Table.jsx links the university name to /business/university/<slug>.
      const slug = toSlug(row.name);
      if (!uniDetails[slug]) fail(`${label}: no university-details profile for slug '${slug}'`);

      const prior = identity.get(row.name);
      if (prior && (prior.overallRank !== row.overallRank || prior.tier !== row.tier)) {
        fail(`${label}: rank/tier disagrees with ${prior.file} (${prior.overallRank}/${prior.tier} vs ${row.overallRank}/${row.tier})`);
      }
      if (!prior) identity.set(row.name, { overallRank: row.overallRank, tier: row.tier, file });
    });

    console.log(`  ${path.basename(file).padEnd(32)} ${String(rows.length).padStart(3)} rows validated (${verified} cited)`);
  }

  // Profiles with no rows are dead weight the UI can never reach.
  const usedSlugs = new Set([...identity.keys()].map(toSlug));
  for (const slug of Object.keys(uniDetails)) {
    if (!usedSlugs.has(slug)) fail(`business/university-details.json: '${slug}' has a profile but no rows`);
  }

  console.log(`  ${Object.keys(uniDetails).length} university profiles, ${declaredIds.length} courses`);
}

async function main() {
  await validateBusiness();

  for (const [strand, files] of Object.entries(STRANDS)) {
    console.log(`\n=== ${strand} ===`);
    for (const file of files) {
      const fullPath = new URL(`${strand}/${file}`, DATA_DIR);
      const rows = JSON.parse(await fs.readFile(fullPath, 'utf8'));
      const seen = new Set();

      rows.forEach((row, index) => {
        const label = `${strand}/${file} row ${index + 1} (${row.name})`;

        if (!row.name) fail(`${label}: missing university name`);
        if (seen.has(row.name)) fail(`${label}: duplicate university`);
        seen.add(row.name);

        if (!row.courseName) fail(`${label}: missing verified courseName`);
        if (!row.sourceUrl?.startsWith('https://digital.ucas.com/explore/courses/')) {
          fail(`${label}: invalid sourceUrl`);
        }
        if (!row.cugSourceUrl?.startsWith('https://www.thecompleteuniversityguide.co.uk/universities/')) {
          fail(`${label}: invalid cugSourceUrl`);
        }
        if (!row.applicationCode) fail(`${label}: missing UCAS applicationCode`);
        if (!['exact', 'close'].includes(row.matchType)) fail(`${label}: invalid matchType`);
        if (!row.notes?.startsWith('Verified UCAS 2026')) fail(`${label}: missing audit note`);
        if (row.overallRank == null) fail(`${label}: missing overallRank`);
        if (!row.gradProspects) fail(`${label}: missing gradProspects`);
        if (!row.entryGrades) fail(`${label}: missing entryGrades`);
        if (!row.typicalOffer) fail(`${label}: missing typicalOffer`);
      });

      console.log(`  ${path.basename(file)}: ${rows.length} rows validated`);
    }
  }
  await validateColleges();
}

async function validateColleges() {
  const COLLEGE_FILES = [
    { file: 'src/data/colleges/oxford-colleges.json',   prefix: 'oxford-',   validKeys: OXFORD_SUBJECT_KEYS },
    { file: 'src/data/colleges/cambridge-colleges.json', prefix: 'cambridge-', validKeys: CAMBRIDGE_SUBJECT_KEYS },
  ];

  for (const { file, prefix, validKeys } of COLLEGE_FILES) {
    const fullPath = new URL(`../${file}`, import.meta.url);
    let data;
    try {
      data = JSON.parse(await fs.readFile(fullPath, 'utf8'));
    } catch {
      console.log(`  ${file}: not found — skipping`);
      continue;
    }

    console.log(`\n=== ${file} ===`);
    for (const [key, college] of Object.entries(data)) {
      const label = `${file} [${key}]`;
      if (college.slug !== key) fail(`${label}: key !== slug`);
      if (!college.slug.startsWith(prefix)) fail(`${label}: slug must start with '${prefix}'`);
      if (!college.name) fail(`${label}: missing name`);
      if (!college.overview) fail(`${label}: missing overview`);
      if (!Array.isArray(college.subjects)) fail(`${label}: subjects must be an array`);
      for (const subjectKey of college.subjects) {
        if (!validKeys.includes(subjectKey)) {
          fail(`${label}: unknown subject key '${subjectKey}'`);
        }
      }
    }
    console.log(`  ${Object.keys(data).length} colleges validated`);
  }
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
