import computerScienceData  from './computer-science.json';
import softwareEngData      from './software-engineering.json';
import aiMLData             from './ai-machine-learning.json';
import csDataScienceData    from './data-science.json';
import cybersecurityData    from './cybersecurity.json';
import gamesDevData         from './games-development.json';
import computerSystemsData  from './computer-systems.json';
import hciData              from './hci.json';
import compSciMathsData     from './compsci-maths.json';
import compSciIndustryData  from './compsci-industry.json';

export const COURSES = [
  {
    id: 'computerScience',
    label: 'Computer Science',
    rankLabel: 'Subject Rank',
    description: 'Explore Computer Science BSc and (MComp) courses across Russell Group and leading UK universities',
    rankingScope: 'official',
    data: computerScienceData,
  },
  {
    id: 'softwareEng',
    label: 'Software Engineering',
    rankLabel: 'Table Position',
    description: 'Explore Software Engineering BSc and (MEng) courses — agile, DevOps and industry-led degrees',
    rankingScope: 'comparison',
    data: softwareEngData,
  },
  {
    id: 'aiML',
    label: 'Artificial Intelligence & Machine Learning',
    rankLabel: 'Table Position',
    description: 'Explore Artificial Intelligence and Machine Learning (BSc) courses — covering neural networks, ML and AI ethics',
    rankingScope: 'comparison',
    data: aiMLData,
  },
  {
    id: 'csDataScience',
    label: 'Data Science',
    rankLabel: 'Table Position',
    description: 'Explore Data Science (BSc) courses — statistics, machine learning and big data engineering',
    rankingScope: 'comparison',
    data: csDataScienceData,
  },
  {
    id: 'cybersecurity',
    label: 'Cyber Security',
    rankLabel: 'Table Position',
    description: 'Explore Cyber Security (BSc) courses — including GCHQ/NCSC-certified degrees',
    rankingScope: 'comparison',
    data: cybersecurityData,
  },
  {
    id: 'gamesDev',
    label: 'Games Development',
    rankLabel: 'Table Position',
    description: 'Explore Games Development and Games Programming (BSc) courses — the route into the £7bn UK games industry',
    rankingScope: 'comparison',
    data: gamesDevData,
  },
  {
    id: 'computerSystems',
    label: 'Computer Systems Engineering',
    rankLabel: 'Table Position',
    description: 'Explore Computer Systems Engineering (BEng) courses — hardware, OS, embedded systems',
    rankingScope: 'comparison',
    data: computerSystemsData,
  },
  {
    id: 'hci',
    label: 'Human-Computer Interaction',
    rankLabel: 'Table Position',
    description: 'Explore HCI and UX Design (BSc) courses — interaction design, usability and creative computing',
    rankingScope: 'comparison',
    data: hciData,
  },
  {
    id: 'compSciMaths',
    label: 'Computer Science with Mathematics',
    rankLabel: 'Table Position',
    description: 'Explore joint Mathematics and Computer Science degrees — theory-focused with algorithm emphasis',
    rankingScope: 'comparison',
    data: compSciMathsData,
  },
  {
    id: 'compSciIndustry',
    label: 'Computer Science with Year in Industry',
    rankLabel: 'Table Position',
    description: 'Explore Computer Science degrees with integrated placement or sandwich year',
    rankingScope: 'comparison',
    data: compSciIndustryData,
  },
];
