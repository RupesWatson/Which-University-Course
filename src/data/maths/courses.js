import mathematicsData from './mathematics.json';
import statisticsData from './statistics.json';
import mathematicsCSData from './mathematics-cs.json';
import appliedMathsData from './applied-mathematics.json';
import mathematicsStatisticsData from './mathematics-statistics.json';
import operationalResearchData from './operational-research.json';
import mathematicsPhilosophyData from './mathematics-philosophy.json';
import dataScienceData from './data-science-maths.json';
import mathematicsPhysicsData from './mathematics-physics.json';
import mathematicsIndustryData from './mathematics-with-industry.json';

export const COURSES = [
  {
    id: 'mathematics',
    label: 'Mathematics',
    rankLabel: 'Subject Rank',
    description: 'UCAS 2026 verified Mathematics BSc and MMath titles across top UK universities',
    rankingScope: 'official',
    data: mathematicsData,
  },
  {
    id: 'statistics',
    label: 'Statistics',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Statistics BSc and MMathStat titles — one of the most employable degrees in the UK',
    rankingScope: 'comparison',
    data: statisticsData,
  },
  {
    id: 'mathsCS',
    label: 'Maths & Computer Science',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Mathematics and Computer Science titles — combining rigorous maths with modern computing',
    rankingScope: 'comparison',
    data: mathematicsCSData,
  },
  {
    id: 'appliedMaths',
    label: 'Applied Mathematics',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Applied Mathematics titles — mathematical modelling, fluid dynamics and numerical analysis',
    rankingScope: 'comparison',
    data: appliedMathsData,
  },
  {
    id: 'mathsStats',
    label: 'Maths & Statistics',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Mathematics and Statistics titles — combining mathematical theory with statistical methods',
    rankingScope: 'comparison',
    data: mathematicsStatisticsData,
  },
  {
    id: 'operationalResearch',
    label: 'Operational Research',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Operational Research and MORSE titles — mathematical optimisation for business and logistics',
    rankingScope: 'comparison',
    data: operationalResearchData,
  },
  {
    id: 'mathsPhilosophy',
    label: 'Maths & Philosophy',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Mathematics and Philosophy titles — logic, foundations and the philosophy of mathematics',
    rankingScope: 'comparison',
    data: mathematicsPhilosophyData,
  },
  {
    id: 'dataScience',
    label: 'Data Science',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Data Science (Mathematics pathway) titles — machine learning, statistics and big data',
    rankingScope: 'comparison',
    data: dataScienceData,
  },
  {
    id: 'mathsPhysics',
    label: 'Maths & Physics',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Mathematics and Physics joint degree titles — bridging the two most fundamental sciences',
    rankingScope: 'comparison',
    data: mathematicsPhysicsData,
  },
  {
    id: 'mathsIndustry',
    label: 'Maths with Placement',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Mathematics degrees with industrial or professional training year',
    rankingScope: 'comparison',
    data: mathematicsIndustryData,
  },
];
