import { COURSES as biochemCourses } from '../data/biochemistry/courses';
import { COURSES as financeCourses } from '../data/finance/courses';
import { COURSES as physicsCourses } from '../data/physics/courses';
import { COURSES as mathsCourses } from '../data/maths/courses';
import { COURSES as engineeringCourses } from '../data/engineering/courses';
import { COURSES as humanitiesCourses } from '../data/humanities/courses';
import { COURSES as socialSciencesCourses } from '../data/socialsciences/courses';
import { COURSES as computerScienceCourses } from '../data/computer-science/courses';
import { COURSES as medicineCourses } from '../data/medicine/courses';

export const STRANDS = {
  biochemistry: {
    id: 'biochemistry',
    label: 'Chemistry & Biochemistry',
    tagline: 'Explore chemistry, biochemistry and life-science courses for 2026 entry',
    headerEyebrow: 'UCAS 2026 Course Finder',
    headerTitleStart: 'Find Your Chemistry & ',
    headerTitleAccent: 'Biochemistry Course',
    headerSubtitle:
      'Explore 2026 undergraduate options across Russell Group and other leading UK universities. ' +
      'Course data is drawn from UCAS 2026 with rankings from the Complete University Guide 2026.',
    footerNote:
      'Course data sourced from UCAS 2026. Subject ranks for Biochemistry and Chemistry use CUG 2026 ' +
      'subject table positions; other tables show table position within this comparison set.',
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
    tagline: 'Explore finance, accounting and business courses for 2026 entry',
    headerEyebrow: 'UCAS 2026 Course Finder',
    headerTitleStart: 'Find Your Finance & ',
    headerTitleAccent: 'Business Course',
    headerSubtitle:
      'Explore 2026 undergraduate options across Russell Group and other leading UK universities. ' +
      'Course data is drawn from UCAS 2026.',
    footerNote:
      'Course data sourced from UCAS 2026. Only Accounting & Finance carries an official subject rank; ' +
      'other tables show table position within this comparison set.',
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
    tagline: 'Explore physics, astrophysics and physical-sciences courses for 2026 entry',
    headerEyebrow: 'UCAS 2026 Course Finder',
    headerTitleStart: 'Find Your Physics & ',
    headerTitleAccent: 'Physical Sciences Course',
    headerSubtitle:
      'Explore 2026 undergraduate options across Russell Group and other leading UK universities. ' +
      'Course data is drawn from UCAS 2026 with rankings from the Complete University Guide 2026.',
    footerNote:
      'Course data sourced from UCAS 2026. Physics uses the CUG 2026 subject ranking; ' +
      'other tables show table position within this comparison set.',
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
    tagline: 'Explore mathematics, statistics and data science courses for 2026 entry',
    headerEyebrow: 'UCAS 2026 Course Finder',
    headerTitleStart: 'Find Your Mathematics & ',
    headerTitleAccent: 'Statistics Course',
    headerSubtitle:
      'Explore 2026 undergraduate options across Russell Group and other leading UK universities. ' +
      'Course data is drawn from UCAS 2026 with rankings from the Complete University Guide 2026.',
    footerNote:
      'Course data sourced from UCAS 2026. Mathematics uses the CUG 2026 subject ranking; ' +
      'other tables show table position within this comparison set.',
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
    tagline: 'Explore engineering courses across every specialism for 2026 entry',
    headerEyebrow: 'UCAS 2026 Course Finder',
    headerTitleStart: 'Find Your Engineering & ',
    headerTitleAccent: 'Technology Course',
    headerSubtitle:
      'Explore 2026 undergraduate options across Russell Group and other leading UK universities. ' +
      'Course data is drawn from UCAS 2026. Switch between A-level and IB entry requirements using the toggle.',
    footerNote:
      'Course data sourced from UCAS 2026. Tables show table position within this comparison set. ' +
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
    tagline: 'Explore humanities, languages and arts courses for 2026 entry',
    headerEyebrow: 'UCAS 2026 Course Finder',
    headerTitleStart: 'Find Your Humanities & ',
    headerTitleAccent: 'Arts Course',
    headerSubtitle:
      'Explore 2026 undergraduate options across Russell Group and other leading UK universities. ' +
      'Course data is drawn from UCAS 2026 with rankings from the Complete University Guide 2026.',
    footerNote:
      'Course data sourced from UCAS 2026. English, History and Philosophy use the CUG 2026 subject ranking; ' +
      'French, Spanish and German use CUG Modern Languages rankings; other tables show position within this comparison set.',
    courseGroups: [
      { label: 'Core Humanities', ids: ['english', 'history', 'philosophy', 'classics'] },
      { label: 'Languages', ids: ['french', 'spanish', 'german', 'modernLanguages'] },
      { label: 'Literature & Creative Arts', ids: ['englishCreativeWriting', 'dramaTheatre', 'artHistory', 'musicHumanities'] },
      { label: 'Language Science', ids: ['linguistics'] },
    ],
    courses: humanitiesCourses,
  },
  computerScience: {
    id: 'computerScience',
    label: 'Computer Science',
    tagline: 'Explore computer science, AI and software engineering courses for 2026 entry',
    headerEyebrow: 'UCAS 2026 Course Finder',
    headerTitleStart: 'Find Your Computer Science & ',
    headerTitleAccent: 'Software Engineering Course',
    headerSubtitle:
      'Explore 2026 undergraduate options across Russell Group and other leading UK universities. ' +
      'Course data is drawn from UCAS 2026 with rankings from the Complete University Guide 2026.',
    footerNote:
      'Course data sourced from UCAS 2026. Computer Science uses the CUG 2026 subject ranking; ' +
      'other tables show table position within this comparison set.',
    courseGroups: [
      { label: 'Core Computer Science', ids: ['computerScience', 'softwareEng', 'compSciMaths', 'compSciIndustry'] },
      { label: 'AI, Data & Security', ids: ['aiML', 'csDataScience', 'cybersecurity'] },
      { label: 'Applied & Specialist', ids: ['gamesDev', 'computerSystems', 'hci'] },
    ],
    courses: computerScienceCourses,
  },
  medicine: {
    id: 'medicine',
    label: 'Medicine & Healthcare',
    tagline: 'Explore medicine, dentistry, veterinary and allied-health courses for 2026 entry',
    headerEyebrow: 'UCAS 2026 Course Finder',
    headerTitleStart: 'Find Your Medicine & ',
    headerTitleAccent: 'Healthcare Course',
    headerSubtitle:
      'Explore 2026 undergraduate options across Russell Group and other leading UK universities. ' +
      'Course data is drawn from UCAS 2026 with rankings from the Complete University Guide 2026.',
    footerNote:
      'Course data sourced from UCAS 2026. Medicine, Dentistry, Veterinary Medicine, Nursing and Pharmacy use ' +
      'CUG 2026 subject rankings; other tables show table position within this comparison set. ' +
      'Always confirm entry tests (UCAT, GAMSAT, BMAT-equivalent) on the university website.',
    courseGroups: [
      { label: 'Doctor Routes', ids: ['medicine', 'graduateMedicine'] },
      { label: 'Dental, Veterinary & Pharmacy', ids: ['dentistry', 'veterinary', 'pharmacy'] },
      { label: 'Nursing & Midwifery', ids: ['nursing', 'midwifery'] },
      { label: 'Allied Health Professions', ids: ['physiotherapy', 'paramedicScience', 'radiography', 'occupationalTherapy', 'dietetics'] },
    ],
    courses: medicineCourses,
  },
  socialsciences: {
    id: 'socialsciences',
    label: 'Social Sciences',
    tagline: 'Explore social sciences, law and policy courses for 2026 entry',
    headerEyebrow: 'UCAS 2026 Course Finder',
    headerTitleStart: 'Find Your Social Sciences & ',
    headerTitleAccent: 'Law Course',
    headerSubtitle:
      'Explore 2026 undergraduate options across Russell Group and other leading UK universities. ' +
      'Course data is drawn from UCAS 2026 with rankings from the Complete University Guide 2026.',
    footerNote:
      'Course data sourced from UCAS 2026. Politics, Law, Economics and Psychology use the CUG 2026 subject ranking; ' +
      'other tables show table position within this comparison set.',
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
