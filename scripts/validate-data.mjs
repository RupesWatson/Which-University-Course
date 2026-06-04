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

async function main() {
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
