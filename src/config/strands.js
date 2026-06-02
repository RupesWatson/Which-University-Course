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
};

export const STRAND_LIST = Object.values(STRANDS);

export function getStrand(id) {
  return STRANDS[id] || null;
}
