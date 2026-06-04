/**
 * Seed script: reads all local JSON data files and populates Supabase.
 *
 * Usage:
 *   SUPABASE_URL=https://xxx.supabase.co SUPABASE_SERVICE_KEY=eyJ... node scripts/seed-supabase.mjs
 *
 * Run ONCE after creating the schema. Safe to re-run: university_courses are
 * cleared and re-inserted; course_details and university_details use upsert.
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables before running.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

function readJson(relPath) {
  const content = readFileSync(resolve(root, relPath), 'utf-8').replace(/^﻿/, '');
  return JSON.parse(content);
}

// Mirrors Table.jsx toSlug — used to verify slugs match what the UI generates
function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/^university of /, '')
    .replace(/ university$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Mirrors src/data/*/courses.js — maps course IDs to their JSON source files.
// The `transform` function mirrors any data transformation done in the barrel file.
const STRAND_COURSES = {
  biochemistry: [
    { id: 'biochemistry',   file: 'src/data/biochemistry/biochemistry.json' },
    { id: 'chemistry',      file: 'src/data/biochemistry/chemistry.json' },
    { id: 'natSci',         file: 'src/data/biochemistry/natural-sciences.json' },
    { id: 'biomedSci',      file: 'src/data/biochemistry/biomedical-sciences.json' },
    { id: 'pharmacology',   file: 'src/data/biochemistry/pharmacology.json' },
    { id: 'molBiol',        file: 'src/data/biochemistry/molecular-biology.json' },
    { id: 'medicinalChem',  file: 'src/data/biochemistry/medicinal-chemistry.json' },
    { id: 'genetics',       file: 'src/data/biochemistry/genetics.json' },
    { id: 'microbiology',   file: 'src/data/biochemistry/microbiology.json' },
    { id: 'biochemIndustry',file: 'src/data/biochemistry/biochemistry-with-industry.json' },
  ],
  finance: [
    // universities.json uses afRank/aLevelGrades — normalised to match all other courses
    {
      id: 'af',
      file: 'src/data/finance/universities.json',
      transform: u => ({ ...u, subjectRank: u.afRank, entryGrades: u.aLevelGrades }),
    },
    { id: 'econFin',           file: 'src/data/finance/economics-finance.json' },
    { id: 'finMath',           file: 'src/data/finance/financial-maths.json' },
    { id: 'banking',           file: 'src/data/finance/banking-finance.json' },
    { id: 'actuarial',         file: 'src/data/finance/actuarial.json' },
    { id: 'fintech',           file: 'src/data/finance/fintech.json' },
    { id: 'appliedAI',         file: 'src/data/finance/applied-ai.json' },
    { id: 'dataScience',       file: 'src/data/finance/data-science.json' },
    { id: 'techManagement',    file: 'src/data/finance/tech-management.json' },
    { id: 'investmentBanking', file: 'src/data/finance/investment-banking.json' },
    { id: 'ventureCapital',    file: 'src/data/finance/venture-capital.json' },
    { id: 'intlFinance',       file: 'src/data/finance/international-finance.json' },
    { id: 'esgFinance',        file: 'src/data/finance/esg-finance.json' },
    { id: 'financeLaw',        file: 'src/data/finance/finance-law.json' },
    { id: 'behaviouralFinance',file: 'src/data/finance/behavioural-finance.json' },
    { id: 'finInn',            file: 'src/data/finance/finance-innovation.json' },
  ],
  physics: [
    { id: 'physics',             file: 'src/data/physics/physics.json' },
    { id: 'astrophysics',        file: 'src/data/physics/astrophysics.json' },
    { id: 'theoreticalPhysics',  file: 'src/data/physics/theoretical-physics.json' },
    { id: 'mathematicalPhysics', file: 'src/data/physics/mathematical-physics.json' },
    { id: 'physicsPhilosophy',   file: 'src/data/physics/physics-philosophy.json' },
    { id: 'spaceScience',        file: 'src/data/physics/space-science.json' },
    { id: 'computationalPhysics',file: 'src/data/physics/computational-physics.json' },
    { id: 'medicalPhysics',      file: 'src/data/physics/medical-physics.json' },
    { id: 'geophysics',          file: 'src/data/physics/geophysics.json' },
    { id: 'physicsIndustry',     file: 'src/data/physics/physics-with-industry.json' },
  ],
  maths: [
    { id: 'mathematics',       file: 'src/data/maths/mathematics.json' },
    { id: 'statistics',        file: 'src/data/maths/statistics.json' },
    { id: 'mathsCS',           file: 'src/data/maths/mathematics-cs.json' },
    { id: 'appliedMaths',      file: 'src/data/maths/applied-mathematics.json' },
    { id: 'mathsStats',        file: 'src/data/maths/mathematics-statistics.json' },
    { id: 'operationalResearch',file: 'src/data/maths/operational-research.json' },
    { id: 'mathsPhilosophy',   file: 'src/data/maths/mathematics-philosophy.json' },
    { id: 'dataScience',       file: 'src/data/maths/data-science-maths.json' },
    { id: 'mathsPhysics',      file: 'src/data/maths/mathematics-physics.json' },
    { id: 'mathsIndustry',     file: 'src/data/maths/mathematics-with-industry.json' },
  ],
  engineering: [
    { id: 'engineering', file: 'src/data/engineering/engineering.json' },
    { id: 'mechanical',  file: 'src/data/engineering/mechanical-engineering.json' },
    { id: 'civil',       file: 'src/data/engineering/civil-engineering.json' },
    { id: 'electrical',  file: 'src/data/engineering/electrical-engineering.json' },
    { id: 'chemical',    file: 'src/data/engineering/chemical-engineering.json' },
    { id: 'aerospace',   file: 'src/data/engineering/aerospace-engineering.json' },
  ],
  humanities: [
    { id: 'english',              file: 'src/data/humanities/english-literature.json' },
    { id: 'history',              file: 'src/data/humanities/history.json' },
    { id: 'philosophy',           file: 'src/data/humanities/philosophy.json' },
    { id: 'classics',             file: 'src/data/humanities/classics.json' },
    { id: 'french',               file: 'src/data/humanities/french.json' },
    { id: 'spanish',              file: 'src/data/humanities/spanish.json' },
    { id: 'german',               file: 'src/data/humanities/german.json' },
    { id: 'modernLanguages',      file: 'src/data/humanities/modern-languages.json' },
    { id: 'linguistics',          file: 'src/data/humanities/linguistics.json' },
    { id: 'artHistory',           file: 'src/data/humanities/art-history.json' },
    { id: 'musicHumanities',      file: 'src/data/humanities/music.json' },
    { id: 'englishCreativeWriting', file: 'src/data/humanities/english-creative-writing.json' },
    { id: 'dramaTheatre',         file: 'src/data/humanities/drama-theatre.json' },
  ],
  socialsciences: [
    { id: 'politics',              file: 'src/data/socialsciences/politics.json' },
    { id: 'law',                   file: 'src/data/socialsciences/law.json' },
    { id: 'economics',             file: 'src/data/socialsciences/economics.json' },
    { id: 'psychology',            file: 'src/data/socialsciences/psychology.json' },
    { id: 'sociology',             file: 'src/data/socialsciences/sociology.json' },
    { id: 'ppe',                   file: 'src/data/socialsciences/ppe.json' },
    { id: 'criminology',           file: 'src/data/socialsciences/criminology.json' },
    { id: 'internationalRelations', file: 'src/data/socialsciences/international-relations.json' },
    { id: 'politicsEconomics',     file: 'src/data/socialsciences/politics-economics.json' },
    { id: 'socialPolicy',          file: 'src/data/socialsciences/social-policy.json' },
    { id: 'socialAnthropology',    file: 'src/data/socialsciences/social-anthropology.json' },
    { id: 'forensicPsychology',    file: 'src/data/socialsciences/forensic-psychology.json' },
    { id: 'internationalDevelopment', file: 'src/data/socialsciences/international-development.json' },
  ],
};

async function seedUniversityCourses() {
  console.log('\n=== university_courses ===');

  // Clear existing rows so re-runs are idempotent
  const { error: clearError } = await supabase.from('university_courses').delete().neq('id', 0);
  if (clearError) throw new Error(`Clear failed: ${clearError.message}`);

  for (const [strandId, courses] of Object.entries(STRAND_COURSES)) {
    for (const course of courses) {
      const rawData = readJson(course.file);
      const data = course.transform ? rawData.map(course.transform) : rawData;

      if (!data.length) {
        console.log(`  ${strandId}/${course.id}: 0 rows (empty JSON — skipping)`);
        continue;
      }

      const rows = data.map(u => ({
        course_id:        course.id,
        strand_id:        strandId,
        name:             u.name,
        tier:             u.tier ?? null,
        overall_rank:     u.overallRank ?? null,
        subject_rank:     u.subjectRank ?? null,
        entry_grades:     u.entryGrades ?? null,
        ucas_points:      u.ucasPoints ?? null,
        typical_offer:    u.typicalOffer ?? null,
        ib_grades:        u.ibGrades ?? null,
        grad_prospects:   u.gradProspects ?? null,
        course_name:      u.courseName ?? null,
        application_code: u.applicationCode ?? null,
        source_url:       u.sourceUrl ?? null,
        cug_source_url:   u.cugSourceUrl ?? null,
        match_type:       u.matchType ?? null,
        notes:            u.notes ?? null,
      }));

      const { error } = await supabase.from('university_courses').insert(rows);
      if (error) throw new Error(`${strandId}/${course.id}: ${error.message}`);
      console.log(`  ${strandId}/${course.id}: ${rows.length} rows`);
    }
  }
}

async function seedCourseDetails() {
  console.log('\n=== course_details ===');

  for (const strandId of Object.keys(STRAND_COURSES)) {
    const details = readJson(`src/data/${strandId}/course-details.json`);
    const entries = Object.values(details);

    const rows = entries.map(d => ({
      id:                   d.id,
      strand_id:            strandId,
      title:                d.title ?? null,
      duration:             d.duration ?? null,
      overview:             d.overview ?? null,
      entry_requirements:   d.entryRequirements ?? null,
      further_study:        d.furtherStudy ?? null,
      employer_perspective: d.employerPerspective ?? null,
      year_by_year:         d.yearByYear ?? null,
      skills:               d.skills ?? null,
      professional_bodies:  d.professionalBodies ?? null,
      careers:              d.careers ?? null,
      top_employers:        d.topEmployers ?? null,
      is_it_for_you:        d.isItForYou ?? null,
    }));

    const { error } = await supabase
      .from('course_details')
      .upsert(rows, { onConflict: 'id,strand_id' });
    if (error) throw new Error(`course_details/${strandId}: ${error.message}`);
    console.log(`  ${strandId}: ${rows.length} course detail rows`);
  }
}

async function seedUniversityDetails() {
  console.log('\n=== university_details ===');

  // Deduplicate across strands — first occurrence wins
  const seen = new Map();

  for (const strandId of Object.keys(STRAND_COURSES)) {
    const details = readJson(`src/data/${strandId}/university-details.json`);

    for (const [key, u] of Object.entries(details)) {
      const slug = u.slug || key;
      if (!seen.has(slug)) {
        seen.set(slug, u);
      }
    }
  }

  const rows = Array.from(seen.values()).map(u => ({
    slug:                   u.slug,
    name:                   u.name ?? null,
    city:                   u.city ?? null,
    overview:               u.overview ?? null,
    founded:                u.founded ?? null,
    total_students:         u.totalStudents ?? null,
    international_students: u.internationalStudents ?? null,
    campus_type:            u.campusType ?? null,
    website:                u.website ?? null,
    prospectus:             u.prospectus ?? null,
    virtual_tour:           u.virtualTour ?? null,
    reputation:             u.reputation ?? null,
    key_facts:              u.keyFacts ?? null,
    accommodation:          u.accommodation ?? null,
    open_days:              u.openDays ?? null,
    application:            u.application ?? null,
    student_life:           u.studentLife ?? null,
    city_life:              u.cityLife ?? null,
    notable_alumni:         u.notableAlumni ?? null,
    rankings:               u.rankings ?? null,
    fees:                   u.fees ?? null,
    funding:                u.funding ?? null,
    employability:          u.employability ?? null,
    research:               u.research ?? null,
    facilities:             u.facilities ?? null,
    satisfaction:           u.satisfaction ?? null,
    travel_from_london:     u.travelFromLondon ?? null,
    accessibility:          u.accessibility ?? null,
    international:          u.international ?? null,
    contact:                u.contact ?? null,
    socials:                u.socials ?? null,
  }));

  const { error } = await supabase
    .from('university_details')
    .upsert(rows, { onConflict: 'slug' });
  if (error) throw new Error(`university_details: ${error.message}`);
  console.log(`  ${rows.length} universities`);
}

async function main() {
  console.log(`Seeding ${SUPABASE_URL}...`);
  try {
    await seedUniversityCourses();
    await seedCourseDetails();
    await seedUniversityDetails();
    console.log('\nSeed complete.');
  } catch (err) {
    console.error('\nSeed failed:', err.message);
    process.exit(1);
  }
}

main();
