import engineeringData from './engineering.json';
import mechanicalData from './mechanical-engineering.json';
import civilData from './civil-engineering.json';
import electricalData from './electrical-engineering.json';

export const COURSES = [
  {
    id: 'engineering',
    label: 'General Engineering',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Engineering BEng and MEng titles across top UK universities',
    rankingScope: 'comparison',
    data: engineeringData,
  },
  {
    id: 'mechanical',
    label: 'Mechanical Engineering',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Mechanical Engineering BEng and MEng titles',
    rankingScope: 'comparison',
    data: mechanicalData,
  },
  {
    id: 'civil',
    label: 'Civil Engineering',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Civil Engineering BEng and MEng titles',
    rankingScope: 'comparison',
    data: civilData,
  },
  {
    id: 'electrical',
    label: 'Electrical Engineering',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Electrical Engineering BEng and MEng titles',
    rankingScope: 'comparison',
    data: electricalData,
  },
];
