import physicsData from './physics.json';
import astrophysicsData from './astrophysics.json';
import theoreticalPhysicsData from './theoretical-physics.json';
import mathematicalPhysicsData from './mathematical-physics.json';
import physicsPhilosophyData from './physics-philosophy.json';
import spaceScienceData from './space-science.json';
import computationalPhysicsData from './computational-physics.json';
import medicalPhysicsData from './medical-physics.json';
import geophysicsData from './geophysics.json';
import physicsWithIndustryData from './physics-with-industry.json';

export const COURSES = [
  {
    id: 'physics',
    label: 'Physics',
    rankLabel: 'Subject Rank',
    description: 'Explore Physics BSc and MPhys courses across top UK universities',
    rankingScope: 'official',
    data: physicsData,
  },
  {
    id: 'astrophysics',
    label: 'Astrophysics',
    rankLabel: 'Table Position',
    description: 'Explore Astrophysics BSc and MPhys courses — one of the most popular science degrees',
    rankingScope: 'comparison',
    data: astrophysicsData,
  },
  {
    id: 'theoreticalPhysics',
    label: 'Theoretical Physics',
    rankLabel: 'Table Position',
    description: 'Explore Theoretical Physics MPhys courses — the most mathematically demanding physics degree',
    rankingScope: 'comparison',
    data: theoreticalPhysicsData,
  },
  {
    id: 'mathematicalPhysics',
    label: 'Mathematical Physics',
    rankLabel: 'Table Position',
    description: 'Explore Mathematical Physics courses — bridging physics and mathematics at the highest level',
    rankingScope: 'comparison',
    data: mathematicalPhysicsData,
  },
  {
    id: 'physicsPhilosophy',
    label: 'Physics & Philosophy',
    rankLabel: 'Table Position',
    description: 'Explore Physics and Philosophy degrees — exploring the deepest questions in science and philosophy',
    rankingScope: 'comparison',
    data: physicsPhilosophyData,
  },
  {
    id: 'spaceScience',
    label: 'Space Science',
    rankLabel: 'Table Position',
    description: 'Explore Space Science, Astronomy and Astrophysics courses — for the next generation of space scientists',
    rankingScope: 'comparison',
    data: spaceScienceData,
  },
  {
    id: 'computationalPhysics',
    label: 'Computational Physics',
    rankLabel: 'Table Position',
    description: 'Explore Computational Physics and Physics with Data Science courses — combining physics with modern computing',
    rankingScope: 'comparison',
    data: computationalPhysicsData,
  },
  {
    id: 'medicalPhysics',
    label: 'Medical Physics',
    rankLabel: 'Table Position',
    description: 'Explore Medical Physics courses — applying physics to healthcare, imaging and radiotherapy',
    rankingScope: 'comparison',
    data: medicalPhysicsData,
  },
  {
    id: 'geophysics',
    label: 'Geophysics',
    rankLabel: 'Table Position',
    description: 'Explore Geophysics MPhys courses — physics of the Earth and applications in energy and environment',
    rankingScope: 'comparison',
    data: geophysicsData,
  },
  {
    id: 'physicsIndustry',
    label: 'Physics with Placement',
    rankLabel: 'Table Position',
    description: 'Explore Physics degrees with Year in Industry — combining academic excellence with employer experience',
    rankingScope: 'comparison',
    data: physicsWithIndustryData,
  },
];
