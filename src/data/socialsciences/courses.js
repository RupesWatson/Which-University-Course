import politicsData from './politics.json';
import lawData from './law.json';
import economicsData from './economics.json';
import psychologyData from './psychology.json';
import sociologyData from './sociology.json';
import ppeData from './ppe.json';
import criminologyData from './criminology.json';
import internationalRelationsData from './international-relations.json';
import politicsEconomicsData from './politics-economics.json';
import socialPolicyData from './social-policy.json';
import socialAnthropologyData from './social-anthropology.json';
import forensicPsychologyData from './forensic-psychology.json';
import internationalDevelopmentData from './international-development.json';

export const COURSES = [
  {
    id: 'politics',
    label: 'Politics & International Relations',
    rankLabel: 'Subject Rank',
    description: 'UCAS 2026 verified Politics and International Relations BA titles across Russell Group and leading UK universities',
    rankingScope: 'official',
    data: politicsData,
  },
  {
    id: 'law',
    label: 'Law (LLB)',
    rankLabel: 'Subject Rank',
    description: 'UCAS 2026 verified Law LLB titles — the qualifying law degree for solicitor and barrister training routes',
    rankingScope: 'official',
    data: lawData,
  },
  {
    id: 'economics',
    label: 'Economics',
    rankLabel: 'Subject Rank',
    description: 'UCAS 2026 verified Economics BSc titles — micro and macroeconomics, econometrics and policy analysis',
    rankingScope: 'official',
    data: economicsData,
  },
  {
    id: 'psychology',
    label: 'Psychology',
    rankLabel: 'Subject Rank',
    description: 'UCAS 2026 verified Psychology BSc titles — BPS-accredited degrees covering cognitive, social and clinical psychology',
    rankingScope: 'official',
    data: psychologyData,
  },
  {
    id: 'sociology',
    label: 'Sociology',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Sociology BA and BSc titles — social theory, research methods and contemporary social issues',
    rankingScope: 'comparison',
    data: sociologyData,
  },
  {
    id: 'ppe',
    label: 'Philosophy, Politics & Economics',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified PPE degree titles — the interdisciplinary course that trains future politicians, civil servants and analysts',
    rankingScope: 'comparison',
    data: ppeData,
  },
  {
    id: 'criminology',
    label: 'Criminology',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Criminology BSc titles — crime, justice, policing and penal policy from social science perspectives',
    rankingScope: 'comparison',
    data: criminologyData,
  },
  {
    id: 'internationalRelations',
    label: 'International Relations',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified International Relations BA titles — global politics, diplomacy, security and international organisations',
    rankingScope: 'comparison',
    data: internationalRelationsData,
  },
  {
    id: 'politicsEconomics',
    label: 'Politics & Economics',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Politics & Economics and Political Economy BA titles — combining political analysis with economic theory',
    rankingScope: 'comparison',
    data: politicsEconomicsData,
  },
  {
    id: 'socialPolicy',
    label: 'Social Policy',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Social Policy BA titles — welfare state, public services, poverty and social inequality',
    rankingScope: 'comparison',
    data: socialPolicyData,
  },
  {
    id: 'socialAnthropology',
    label: 'Social Anthropology',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Social Anthropology BA titles — the comparative study of human societies, cultures and social organisation',
    rankingScope: 'comparison',
    data: socialAnthropologyData,
  },
  {
    id: 'forensicPsychology',
    label: 'Forensic Psychology',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Forensic Psychology BSc titles — psychology applied to crime, criminal justice and offender rehabilitation',
    rankingScope: 'comparison',
    data: forensicPsychologyData,
  },
  {
    id: 'internationalDevelopment',
    label: 'International Development',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified International Development BSc titles — global poverty, aid, development economics and policy',
    rankingScope: 'comparison',
    data: internationalDevelopmentData,
  },
];
