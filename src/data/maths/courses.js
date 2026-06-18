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
    description: 'Explore Mathematics BSc and MMath courses across top UK universities',
    rankingScope: 'official',
    data: mathematicsData,
  },
  {
    id: 'statistics',
    label: 'Statistics',
    rankLabel: 'Table Position',
    description: 'Explore Statistics BSc and MMathStat courses — one of the most employable degrees in the UK',
    rankingScope: 'comparison',
    data: statisticsData,
  },
  {
    id: 'mathsCS',
    label: 'Maths & Computer Science',
    rankLabel: 'Table Position',
    description: 'Explore Mathematics and Computer Science courses — combining rigorous maths with modern computing',
    rankingScope: 'comparison',
    data: mathematicsCSData,
  },
  {
    id: 'appliedMaths',
    label: 'Applied Mathematics',
    rankLabel: 'Table Position',
    description: 'Explore Applied Mathematics courses — mathematical modelling, fluid dynamics and numerical analysis',
    rankingScope: 'comparison',
    data: appliedMathsData,
  },
  {
    id: 'mathsStats',
    label: 'Maths & Statistics',
    rankLabel: 'Table Position',
    description: 'Explore Mathematics and Statistics courses — combining mathematical theory with statistical methods',
    rankingScope: 'comparison',
    data: mathematicsStatisticsData,
  },
  {
    id: 'operationalResearch',
    label: 'Operational Research',
    rankLabel: 'Table Position',
    description: 'Explore Operational Research and MORSE courses — mathematical optimisation for business and logistics',
    rankingScope: 'comparison',
    data: operationalResearchData,
  },
  {
    id: 'mathsPhilosophy',
    label: 'Maths & Philosophy',
    rankLabel: 'Table Position',
    description: 'Explore Mathematics and Philosophy courses — logic, foundations and the philosophy of mathematics',
    rankingScope: 'comparison',
    data: mathematicsPhilosophyData,
  },
  {
    id: 'dataScience',
    label: 'Data Science',
    rankLabel: 'Table Position',
    description: 'Explore Data Science (Mathematics pathway) courses — machine learning, statistics and big data',
    rankingScope: 'comparison',
    data: dataScienceData,
  },
  {
    id: 'mathsPhysics',
    label: 'Maths & Physics',
    rankLabel: 'Table Position',
    description: 'Explore Mathematics and Physics joint degree courses — bridging the two most fundamental sciences',
    rankingScope: 'comparison',
    data: mathematicsPhysicsData,
  },
  {
    id: 'mathsIndustry',
    label: 'Maths with Placement',
    rankLabel: 'Table Position',
    description: 'Explore Mathematics degrees with industrial or professional training year',
    rankingScope: 'comparison',
    data: mathematicsIndustryData,
  },
];
