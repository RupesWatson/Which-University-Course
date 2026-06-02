// Single source of truth for subject-area "strands".
// Each strand owns its own courses list, course/university detail blobs,
// dropdown groupings, and page copy.
//
// Adding a third strand later (e.g. Engineering) means dropping new data
// files into src/data/<strand>/, importing them here, and adding one entry
// to STRANDS — no component changes required.

import { COURSES as biochemCourses } from '../data/biochemistry/courses';
import biochemCourseDetails from '../data/biochemistry/course-details.json';
import biochemUniDetails from '../data/biochemistry/university-details.json';

import { COURSES as financeCourses } from '../data/finance/courses';
import financeCourseDetails from '../data/finance/course-details.json';
import financeUniDetails from '../data/finance/university-details.json';

import { COURSES as physicsCourses } from '../data/physics/courses';
import physicsCourseDetails from '../data/physics/course-details.json';
import physicsUniDetails from '../data/physics/university-details.json';

import { COURSES as mathsCourses } from '../data/maths/courses';
import mathsCourseDetails from '../data/maths/course-details.json';
import mathsUniDetails from '../data/maths/university-details.json';

import { COURSES as engineeringCourses } from '../data/engineering/courses';
import engineeringCourseDetails from '../data/engineering/course-details.json';
import engineeringUniDetails from '../data/engineering/university-details.json';

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
    courseDetails: biochemCourseDetails,
    universityDetails: biochemUniDetails,
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
    courseDetails: financeCourseDetails,
    universityDetails: financeUniDetails,
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
    courseDetails: physicsCourseDetails,
    universityDetails: physicsUniDetails,
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
    courseDetails: mathsCourseDetails,
    universityDetails: mathsUniDetails,
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
      { label: 'Core Engineering', ids: ['engineering', 'mechanical', 'civil', 'electrical'] },
    ],
    courses: engineeringCourses,
    courseDetails: engineeringCourseDetails,
    universityDetails: engineeringUniDetails,
  },
};

export const STRAND_LIST = Object.values(STRANDS);

export function getStrand(id) {
  return STRANDS[id] || null;
}
