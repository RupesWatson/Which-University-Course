import { COURSES as biochemCourses } from '../data/biochemistry/courses';
import { COURSES as financeCourses } from '../data/finance/courses';
import { COURSES as physicsCourses } from '../data/physics/courses';
import { COURSES as mathsCourses } from '../data/maths/courses';
import { COURSES as engineeringCourses } from '../data/engineering/courses';
import { COURSES as humanitiesCourses } from '../data/humanities/courses';
import { COURSES as socialSciencesCourses } from '../data/socialsciences/courses';

export const STRANDS = {
  biochemistry: {
    id: 'biochemistry',
    label: 'Chemistry & Biochemistry',
    tagline: 'UCAS 2026 verified chemistry, biochemistry and life-science courses',
    headerEyebrow: 'UCAS 2026 Course Audit',
    headerTitleStart: 'UK University Chemistry & ',
    headerTitleAccent: 'Biochemistry Comparison',
    headerSubtitle:
      'Compare verified 2026 undergraduate course matches across Russell Group and other top UK universities. ' +
      'Course titles sourced from UCAS 2026 and rankings from the Complete University Guide 2026.',
    footerNote:
      'Exact course titles and availability verified against UCAS 2026. Subject ranks for Biochemistry and Chemistry ' +
      'use CUG 2026 subject table positions; all other course tables show table position within the verified comparison set.',
    courseGroups: [
      { label: 'Core Sciences', ids: ['biochemistry', 'chemistry', 'natSci'] },
      { label: 'Life Sciences', ids: ['biomedSci', 'pharmacology', 'molBiol', 'genetics', 'microbiology'] },
      { label: 'Specialist & Placement', ids: ['medicinalChem', 'biochemIndustry'] },
    ],
    courses: biochemCourses,
  },
  finance: {
    id: 'finance',
    label: 'Finance & Business',
    tagline: 'UCAS 2026 verified finance, accounting and business courses',
    headerEyebrow: 'UCAS 2026 Course Audit',
    headerTitleStart: 'UK University Finance & ',
    headerTitleAccent: 'Business Comparison',
    headerSubtitle:
      'Compare verified 2026 undergraduate course matches across Russell Group and other top UK universities. ' +
      'Course titles sourced from UCAS 2026.',
    footerNote:
      'Exact course titles and availability verified against UCAS 2026. Only Accounting & Finance keeps an official ' +
      'subject rank; all other tables show table position within the verified comparison set.',
    courseGroups: [
      { label: 'Core Finance', ids: ['af', 'econFin', 'finMath', 'banking', 'actuarial'] },
      { label: 'Finance & Technology', ids: ['fintech', 'appliedAI', 'dataScience', 'techManagement'] },
      {
        label: 'Specialist & Emerging',
        ids: ['investmentBanking', 'ventureCapital', 'intlFinance', 'esgFinance', 'financeLaw', 'behaviouralFinance', 'finInn'],
      },
    ],
    courses: financeCourses,
  },
  physics: {
    id: 'physics',
    label: 'Physics',
    tagline: 'UCAS 2026 verified physics, astrophysics and related science degrees',
    headerEyebrow: 'UCAS 2026 Course Audit',
    headerTitleStart: 'UK University Physics & ',
    headerTitleAccent: 'Physical Sciences Comparison',
    headerSubtitle:
      'Compare verified 2026 undergraduate course matches across Russell Group and other top UK universities. ' +
      'Course titles sourced from UCAS 2026 and rankings from the Complete University Guide 2026.',
    footerNote:
      'Exact course titles and availability verified against UCAS 2026. Physics uses the CUG 2026 subject ranking; ' +
      'all other course tables show table position within the verified comparison set.',
    courseGroups: [
      { label: 'Core Physics', ids: ['physics', 'astrophysics', 'theoreticalPhysics'] },
      { label: 'Physics & Other Disciplines', ids: ['mathematicalPhysics', 'physicsPhilosophy', 'spaceScience', 'computationalPhysics'] },
      { label: 'Applied & Specialist', ids: ['medicalPhysics', 'geophysics', 'physicsIndustry'] },
    ],
    courses: physicsCourses,
  },
  maths: {
    id: 'maths',
    label: 'Mathematics',
    tagline: 'UCAS 2026 verified mathematics, statistics and data science degrees',
    headerEyebrow: 'UCAS 2026 Course Audit',
    headerTitleStart: 'UK University Mathematics & ',
    headerTitleAccent: 'Statistics Comparison',
    headerSubtitle:
      'Compare verified 2026 undergraduate course matches across Russell Group and other top UK universities. ' +
      'Course titles sourced from UCAS 2026 and rankings from the Complete University Guide 2026.',
    footerNote:
      'Exact course titles and availability verified against UCAS 2026. Mathematics uses the CUG 2026 subject ranking; ' +
      'all other course tables show table position within the verified comparison set.',
    courseGroups: [
      { label: 'Core Mathematics', ids: ['mathematics', 'statistics', 'appliedMaths'] },
      { label: 'Mathematics & Other Disciplines', ids: ['mathsCS', 'mathsStats', 'mathsPhysics', 'mathsPhilosophy'] },
      { label: 'Applied & Specialist', ids: ['operationalResearch', 'dataScience', 'mathsIndustry'] },
    ],
    courses: mathsCourses,
  },
  engineering: {
    id: 'engineering',
    label: 'Engineering',
    tagline: 'UCAS 2026 verified engineering degrees across all specialisms',
    headerEyebrow: 'UCAS 2026 Course Audit',
    headerTitleStart: 'UK University Engineering & ',
    headerTitleAccent: 'Technology Comparison',
    headerSubtitle:
      'Compare verified 2026 undergraduate course matches across Russell Group and other top UK universities. ' +
      'Course titles sourced from UCAS 2026. Switch between A-level and IB entry requirements using the toggle.',
    footerNote:
      'Exact course titles and availability verified against UCAS 2026. All course tables show table position within the verified comparison set. ' +
      'A-level and IB equivalents are provided; always confirm exact entry requirements on the university website.',
    courseGroups: [
      { label: 'Broad & Civil', ids: ['engineering', 'civil'] },
      { label: 'Mechanical & Aerospace', ids: ['mechanical', 'aerospace'] },
      { label: 'Electrical & Chemical', ids: ['electrical', 'chemical'] },
    ],
    courses: engineeringCourses,
  },
  humanities: {
    id: 'humanities',
    label: 'Humanities',
    tagline: 'UCAS 2026 verified humanities, languages and arts degrees',
    headerEyebrow: 'UCAS 2026 Course Audit',
    headerTitleStart: 'UK University Humanities & ',
    headerTitleAccent: 'Arts Comparison',
    headerSubtitle:
      'Compare verified 2026 undergraduate course matches across Russell Group and other top UK universities. ' +
      'Course titles sourced from UCAS 2026 and rankings from the Complete University Guide 2026.',
    footerNote:
      'Exact course titles and availability verified against UCAS 2026. English, History and Philosophy use the CUG 2026 subject ranking; ' +
      'French, Spanish and German use CUG Modern Languages rankings; all other tables show position within the verified comparison set.',
    courseGroups: [
      { label: 'Core Humanities', ids: ['english', 'history', 'philosophy', 'classics'] },
      { label: 'Languages', ids: ['french', 'spanish', 'german', 'modernLanguages'] },
      { label: 'Literature & Creative Arts', ids: ['englishCreativeWriting', 'dramaTheatre', 'artHistory', 'musicHumanities'] },
      { label: 'Language Science', ids: ['linguistics'] },
    ],
    courses: humanitiesCourses,
  },
  socialsciences: {
    id: 'socialsciences',
    label: 'Social Sciences',
    tagline: 'UCAS 2026 verified social science, law and policy degrees',
    headerEyebrow: 'UCAS 2026 Course Audit',
    headerTitleStart: 'UK University Social Sciences & ',
    headerTitleAccent: 'Law Comparison',
    headerSubtitle:
      'Compare verified 2026 undergraduate course matches across Russell Group and other top UK universities. ' +
      'Course titles sourced from UCAS 2026 and rankings from the Complete University Guide 2026.',
    footerNote:
      'Exact course titles and availability verified against UCAS 2026. Politics, Law, Economics and Psychology use the CUG 2026 subject ranking; ' +
      'all other tables show table position within the verified comparison set.',
    courseGroups: [
      { label: 'Core Social Sciences', ids: ['politics', 'law', 'economics', 'psychology'] },
      { label: 'Specialist', ids: ['sociology', 'ppe', 'criminology', 'internationalRelations'] },
      { label: 'Cross-Disciplinary', ids: ['politicsEconomics', 'socialPolicy', 'socialAnthropology', 'forensicPsychology', 'internationalDevelopment'] },
    ],
    courses: socialSciencesCourses,
  },
};

export const STRAND_LIST = Object.values(STRANDS);

export function getStrand(id) {
  return STRANDS[id] || null;
}
