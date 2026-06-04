/**
 * Maps every app courseId to the canonical Oxbridge undergraduate subject key.
 *
 * Oxford and Cambridge use umbrella degrees for some subjects:
 *   - Cambridge Natural Sciences covers Physics, Chemistry, Biochemistry, Biology, etc.
 *   - Cambridge HSPS covers Politics, Sociology, Social Anthropology, IR, Social Policy.
 *   - Oxford Engineering Science covers all engineering disciplines.
 *   - Oxford Modern Languages covers French, Spanish, German, etc.
 *   - Oxford PPE is the entry route for Politics/Economics standalone applicants.
 *
 * When oxford or cambridge is non-null, the value is the canonical key used in the
 * college.subjects[] array. aggregateNote explains the mapping to applicants.
 *
 * CANONICAL KEY SETS (the contract for college JSON data):
 *
 * Oxford: biochemistry | chemistry | physics | physics-philosophy | mathematics |
 *   mathematics-cs | mathematics-philosophy | engineering | ppe |
 *   economics-management | law | history | english | modern-languages |
 *   classics | history-of-art | music | psychology | biomedical-sciences |
 *   archaeology-anthropology | linguistics
 *
 * Cambridge: natural-sciences | mathematics | engineering | economics | law |
 *   history | english | mml | hsps | classics | history-of-art | music |
 *   linguistics | philosophy | psychology
 */

export const OXBRIDGE_SUBJECTS = {
  // ── BIOCHEMISTRY STRAND ────────────────────────────────────────────────────
  biochemistry: {
    oxford: 'biochemistry',
    cambridge: 'natural-sciences',
    aggregateNote: { cambridge: 'At Cambridge, Biochemistry is studied within Natural Sciences, selecting biological science options in Years 1 and 2.' },
  },
  chemistry: {
    oxford: 'chemistry',
    cambridge: 'natural-sciences',
    aggregateNote: { cambridge: 'At Cambridge, Chemistry is studied within Natural Sciences, typically selecting Chemistry A and Chemistry B papers.' },
  },
  natSci: {
    oxford: null,
    cambridge: 'natural-sciences',
  },
  biomedSci: {
    oxford: 'biomedical-sciences',
    cambridge: null,
  },
  pharmacology: { oxford: null, cambridge: null },
  molBiol: {
    oxford: null,
    cambridge: 'natural-sciences',
    aggregateNote: { cambridge: 'At Cambridge, Molecular Biology is studied within Natural Sciences.' },
  },
  medicinalChem: { oxford: null, cambridge: null },
  genetics: {
    oxford: null,
    cambridge: 'natural-sciences',
    aggregateNote: { cambridge: 'At Cambridge, Genetics is studied within Natural Sciences.' },
  },
  microbiology: { oxford: null, cambridge: null },
  biochemIndustry: {
    oxford: 'biochemistry',
    cambridge: 'natural-sciences',
    aggregateNote: { cambridge: 'At Cambridge, Biochemistry is studied within Natural Sciences.' },
  },

  // ── PHYSICS STRAND ─────────────────────────────────────────────────────────
  physics: {
    oxford: 'physics',
    cambridge: 'natural-sciences',
    aggregateNote: { cambridge: 'At Cambridge, Physics is studied within Natural Sciences, selecting Physics A and Physics B papers.' },
  },
  astrophysics: {
    oxford: 'physics',
    cambridge: 'natural-sciences',
    aggregateNote: {
      oxford: 'At Oxford, Astrophysics is studied within the Physics degree (MPhys).',
      cambridge: 'At Cambridge, Astrophysics is studied within Natural Sciences.',
    },
  },
  theoreticalPhysics: {
    oxford: 'physics',
    cambridge: 'natural-sciences',
    aggregateNote: {
      oxford: 'At Oxford, Theoretical Physics is available as a specialism within the Physics degree.',
      cambridge: 'At Cambridge, Theoretical Physics pathways are available within Natural Sciences.',
    },
  },
  mathematicalPhysics: {
    oxford: 'physics',
    cambridge: 'natural-sciences',
    aggregateNote: {
      oxford: 'At Oxford, Mathematical Physics is studied within the Physics degree.',
      cambridge: 'At Cambridge, Mathematical Physics is studied within Natural Sciences.',
    },
  },
  physicsPhilosophy: {
    oxford: 'physics-philosophy',
    cambridge: null,
  },
  spaceScience: {
    oxford: null,
    cambridge: 'natural-sciences',
    aggregateNote: { cambridge: 'At Cambridge, Space Science and Astrophysics are studied within Natural Sciences.' },
  },
  computationalPhysics: {
    oxford: 'physics',
    cambridge: 'natural-sciences',
    aggregateNote: {
      oxford: 'At Oxford, Computational Physics is studied within the Physics degree.',
      cambridge: 'At Cambridge, Computational Physics is studied within Natural Sciences.',
    },
  },
  medicalPhysics: { oxford: null, cambridge: null },
  geophysics: {
    oxford: null,
    cambridge: 'natural-sciences',
    aggregateNote: { cambridge: 'At Cambridge, Geophysics and Earth Sciences are studied within Natural Sciences.' },
  },
  physicsIndustry: {
    oxford: 'physics',
    cambridge: 'natural-sciences',
    aggregateNote: {
      oxford: 'At Oxford, the Physics degree offers industry placement options.',
      cambridge: 'At Cambridge, Physics is studied within Natural Sciences.',
    },
  },

  // ── MATHS STRAND ───────────────────────────────────────────────────────────
  mathematics: {
    oxford: 'mathematics',
    cambridge: 'mathematics',
  },
  statistics: {
    oxford: null,
    cambridge: 'mathematics',
    aggregateNote: { cambridge: 'At Cambridge, Statistics is covered within the Mathematics Tripos (Part IB/II).' },
  },
  mathsCS: {
    oxford: 'mathematics-cs',
    cambridge: null,
  },
  appliedMaths: {
    oxford: 'mathematics',
    cambridge: 'mathematics',
    aggregateNote: {
      oxford: 'At Oxford, Applied Mathematics is covered within the Mathematics degree.',
      cambridge: 'At Cambridge, Applied Mathematics is covered within the Mathematics Tripos.',
    },
  },
  mathsStats: {
    oxford: null,
    cambridge: 'mathematics',
    aggregateNote: { cambridge: 'At Cambridge, Mathematics and Statistics is covered within the Mathematics Tripos.' },
  },
  operationalResearch: { oxford: null, cambridge: null },
  mathsPhilosophy: {
    oxford: 'mathematics-philosophy',
    cambridge: null,
  },
  dataScience: { oxford: null, cambridge: null },
  mathsPhysics: {
    oxford: 'mathematics',
    cambridge: 'mathematics',
    aggregateNote: {
      oxford: 'At Oxford, joint Maths and Physics is covered within the Mathematics or Physics degrees.',
      cambridge: 'At Cambridge, the Mathematics Tripos includes mathematical physics options.',
    },
  },
  mathsIndustry: {
    oxford: 'mathematics',
    cambridge: 'mathematics',
    aggregateNote: {
      oxford: 'At Oxford, industry placement is available within the Mathematics degree.',
      cambridge: 'At Cambridge, the Mathematics Tripos does not include a formal placement year.',
    },
  },

  // ── ENGINEERING STRAND ─────────────────────────────────────────────────────
  engineering: {
    oxford: 'engineering',
    cambridge: 'engineering',
  },
  mechanical: {
    oxford: 'engineering',
    cambridge: 'engineering',
    aggregateNote: {
      oxford: 'At Oxford, Mechanical Engineering is studied within the Engineering Science degree.',
      cambridge: 'At Cambridge, Mechanical Engineering is studied within the Engineering degree.',
    },
  },
  civil: {
    oxford: 'engineering',
    cambridge: 'engineering',
    aggregateNote: {
      oxford: 'At Oxford, Civil Engineering is studied within the Engineering Science degree.',
      cambridge: 'At Cambridge, Civil Engineering is studied within the Engineering degree.',
    },
  },
  electrical: {
    oxford: 'engineering',
    cambridge: 'engineering',
    aggregateNote: {
      oxford: 'At Oxford, Electrical Engineering is studied within the Engineering Science degree.',
      cambridge: 'At Cambridge, Electrical Engineering is studied within the Engineering degree.',
    },
  },
  chemical: {
    oxford: 'engineering',
    cambridge: 'engineering',
    aggregateNote: {
      oxford: 'At Oxford, Chemical Engineering is studied within the Engineering Science degree.',
      cambridge: 'At Cambridge, Chemical Engineering is studied within the Engineering degree.',
    },
  },
  aerospace: {
    oxford: 'engineering',
    cambridge: 'engineering',
    aggregateNote: {
      oxford: 'At Oxford, Aerospace Engineering is studied within the Engineering Science degree.',
      cambridge: 'At Cambridge, Aerospace Engineering is studied within the Engineering degree.',
    },
  },

  // ── FINANCE STRAND ─────────────────────────────────────────────────────────
  af: { oxford: null, cambridge: null },
  econFin: {
    oxford: 'economics-management',
    cambridge: 'economics',
    aggregateNote: {
      oxford: 'At Oxford, Economics is studied within Economics and Management (E&M).',
    },
  },
  finMath: { oxford: null, cambridge: null },
  banking: { oxford: null, cambridge: null },
  actuarial: { oxford: null, cambridge: null },
  fintech: { oxford: null, cambridge: null },
  appliedAI: { oxford: null, cambridge: null },
  techManagement: { oxford: null, cambridge: null },
  investmentBanking: { oxford: null, cambridge: null },
  ventureCapital: { oxford: null, cambridge: null },
  intlFinance: { oxford: null, cambridge: null },
  esgFinance: { oxford: null, cambridge: null },
  financeLaw: { oxford: null, cambridge: null },
  behaviouralFinance: { oxford: null, cambridge: null },
  finInn: { oxford: null, cambridge: null },

  // ── HUMANITIES STRAND ──────────────────────────────────────────────────────
  english: {
    oxford: 'english',
    cambridge: 'english',
  },
  history: {
    oxford: 'history',
    cambridge: 'history',
  },
  philosophy: {
    oxford: null,
    cambridge: 'philosophy',
  },
  classics: {
    oxford: 'classics',
    cambridge: 'classics',
  },
  french: {
    oxford: 'modern-languages',
    cambridge: 'mml',
    aggregateNote: {
      oxford: 'At Oxford, French is studied within the Modern Languages degree.',
      cambridge: 'At Cambridge, French is studied within Modern and Medieval Languages (MML).',
    },
  },
  spanish: {
    oxford: 'modern-languages',
    cambridge: 'mml',
    aggregateNote: {
      oxford: 'At Oxford, Spanish is studied within the Modern Languages degree.',
      cambridge: 'At Cambridge, Spanish is studied within Modern and Medieval Languages (MML).',
    },
  },
  german: {
    oxford: 'modern-languages',
    cambridge: 'mml',
    aggregateNote: {
      oxford: 'At Oxford, German is studied within the Modern Languages degree.',
      cambridge: 'At Cambridge, German is studied within Modern and Medieval Languages (MML).',
    },
  },
  modernLanguages: {
    oxford: 'modern-languages',
    cambridge: 'mml',
    aggregateNote: {
      oxford: 'At Oxford, Modern Languages covers two or more European or world languages.',
      cambridge: 'At Cambridge, Modern and Medieval Languages (MML) covers a wide range of European and world languages.',
    },
  },
  linguistics: {
    oxford: 'linguistics',
    cambridge: 'mml',
    aggregateNote: {
      oxford: 'At Oxford, Linguistics is studied as Linguistics, Philology and Phonetics.',
      cambridge: 'At Cambridge, Linguistics is studied as an option within Modern and Medieval Languages (MML).',
    },
  },
  artHistory: {
    oxford: 'history-of-art',
    cambridge: 'history-of-art',
  },
  musicHumanities: {
    oxford: 'music',
    cambridge: 'music',
  },
  englishCreativeWriting: { oxford: null, cambridge: null },
  dramaTheatre: { oxford: null, cambridge: null },

  // ── SOCIAL SCIENCES STRAND ─────────────────────────────────────────────────
  politics: {
    oxford: 'ppe',
    cambridge: 'hsps',
    aggregateNote: {
      oxford: 'At Oxford, Politics is studied within PPE (Philosophy, Politics and Economics).',
      cambridge: 'At Cambridge, Politics is studied within HSPS (Human, Social and Political Sciences).',
    },
  },
  law: {
    oxford: 'law',
    cambridge: 'law',
  },
  economics: {
    oxford: 'economics-management',
    cambridge: 'economics',
    aggregateNote: {
      oxford: 'At Oxford, Economics is studied within Economics and Management (E&M), or as part of PPE.',
    },
  },
  psychology: {
    oxford: 'psychology',
    cambridge: 'psychology',
  },
  sociology: {
    oxford: null,
    cambridge: 'hsps',
    aggregateNote: {
      cambridge: 'At Cambridge, Sociology is studied within HSPS (Human, Social and Political Sciences).',
    },
  },
  ppe: {
    oxford: 'ppe',
    cambridge: null,
  },
  criminology: { oxford: null, cambridge: null },
  internationalRelations: {
    oxford: null,
    cambridge: 'hsps',
    aggregateNote: {
      cambridge: 'At Cambridge, International Relations is studied within HSPS (Human, Social and Political Sciences).',
    },
  },
  politicsEconomics: {
    oxford: 'ppe',
    cambridge: 'hsps',
    aggregateNote: {
      oxford: 'At Oxford, Politics and Economics are studied within PPE (Philosophy, Politics and Economics).',
      cambridge: 'At Cambridge, Politics can be studied within HSPS; Economics has its own Tripos.',
    },
  },
  socialPolicy: {
    oxford: null,
    cambridge: 'hsps',
    aggregateNote: {
      cambridge: 'At Cambridge, Social Policy is studied within HSPS (Human, Social and Political Sciences).',
    },
  },
  socialAnthropology: {
    oxford: 'archaeology-anthropology',
    cambridge: 'hsps',
    aggregateNote: {
      oxford: 'At Oxford, Social Anthropology is studied within Archaeology and Anthropology.',
      cambridge: 'At Cambridge, Social Anthropology is studied within HSPS (Human, Social and Political Sciences).',
    },
  },
  forensicPsychology: { oxford: null, cambridge: null },
  internationalDevelopment: { oxford: null, cambridge: null },
};

/** All valid canonical subject keys for Oxford colleges. */
export const OXFORD_SUBJECT_KEYS = [
  'biochemistry', 'chemistry', 'physics', 'physics-philosophy',
  'mathematics', 'mathematics-cs', 'mathematics-philosophy',
  'engineering', 'ppe', 'economics-management', 'law',
  'history', 'english', 'modern-languages', 'classics',
  'history-of-art', 'music', 'psychology', 'biomedical-sciences',
  'archaeology-anthropology', 'linguistics',
];

/** All valid canonical subject keys for Cambridge colleges. */
export const CAMBRIDGE_SUBJECT_KEYS = [
  'natural-sciences', 'mathematics', 'engineering', 'economics',
  'law', 'history', 'english', 'mml', 'hsps', 'classics',
  'history-of-art', 'music', 'linguistics', 'philosophy', 'psychology',
];

/**
 * Returns the canonical Oxbridge subject key for a given university slug and
 * app courseId, or null if no undergraduate route exists.
 */
export function oxbridgeSubjectFor(universitySlug, courseId) {
  const mapping = OXBRIDGE_SUBJECTS[courseId];
  if (!mapping) return null;
  if (universitySlug === 'oxford') return mapping.oxford ?? null;
  if (universitySlug === 'cambridge') return mapping.cambridge ?? null;
  return null;
}

/**
 * Returns an explanatory note when the app course maps to an umbrella Oxbridge
 * degree (e.g. Natural Sciences, PPE, HSPS), or null when no note is needed.
 */
export function oxbridgeAggregateNote(universitySlug, courseId) {
  const mapping = OXBRIDGE_SUBJECTS[courseId];
  if (!mapping?.aggregateNote) return null;
  const notes = mapping.aggregateNote;
  if (typeof notes === 'string') return notes;
  return notes[universitySlug] ?? null;
}
