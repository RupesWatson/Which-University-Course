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
    description: 'UCAS 2026 verified Computer Science BSc and MComp titles across Russell Group and leading UK universities',
    rankingScope: 'official',
    data: computerScienceData,
  },
  {
    id: 'softwareEng',
    label: 'Software Engineering',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Software Engineering BSc and MEng titles — agile, DevOps and industry-led degrees',
    rankingScope: 'comparison',
    data: softwareEngData,
  },
  {
    id: 'aiML',
    label: 'Artificial Intelligence & Machine Learning',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Artificial Intelligence and Machine Learning BSc titles — covering neural networks, ML and AI ethics',
    rankingScope: 'comparison',
    data: aiMLData,
  },
  {
    id: 'csDataScience',
    label: 'Data Science',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Data Science BSc titles — statistics, machine learning and big data engineering',
    rankingScope: 'comparison',
    data: csDataScienceData,
  },
  {
    id: 'cybersecurity',
    label: 'Cyber Security',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Cyber Security BSc titles — including GCHQ/NCSC-certified degrees',
    rankingScope: 'comparison',
    data: cybersecurityData,
  },
  {
    id: 'gamesDev',
    label: 'Games Development',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Games Development and Games Programming BSc titles — the route into the £7bn UK games industry',
    rankingScope: 'comparison',
    data: gamesDevData,
  },
  {
    id: 'computerSystems',
    label: 'Computer Systems Engineering',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Computer Systems Engineering BEng and MEng titles — hardware, OS, embedded systems',
    rankingScope: 'comparison',
    data: computerSystemsData,
  },
  {
    id: 'hci',
    label: 'Human-Computer Interaction',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified HCI and UX Design BSc titles — interaction design, usability and creative computing',
    rankingScope: 'comparison',
    data: hciData,
  },
  {
    id: 'compSciMaths',
    label: 'Computer Science with Mathematics',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified joint Mathematics and Computer Science degrees — theory-focused with algorithm emphasis',
    rankingScope: 'comparison',
    data: compSciMathsData,
  },
  {
    id: 'compSciIndustry',
    label: 'Computer Science with Year in Industry',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Computer Science degrees with integrated placement or sandwich year',
    rankingScope: 'comparison',
    data: compSciIndustryData,
  },
];
