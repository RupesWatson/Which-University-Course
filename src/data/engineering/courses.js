import engineeringData from './engineering.json';
import mechanicalData from './mechanical-engineering.json';
import civilData from './civil-engineering.json';
import electricalData from './electrical-engineering.json';
import chemicalData from './chemical-engineering.json';
import aerospaceData from './aerospace-engineering.json';

export const COURSES = [
  {
    id: 'engineering',
    label: 'General Engineering',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Engineering BEng and MEng titles — broad-entry degrees covering all engineering disciplines',
    rankingScope: 'comparison',
    data: engineeringData,
  },
  {
    id: 'mechanical',
    label: 'Mechanical Engineering',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Mechanical Engineering BEng and MEng titles across top UK universities',
    rankingScope: 'comparison',
    data: mechanicalData,
  },
  {
    id: 'civil',
    label: 'Civil Engineering',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Civil Engineering BEng and MEng titles across top UK universities',
    rankingScope: 'comparison',
    data: civilData,
  },
  {
    id: 'electrical',
    label: 'Electrical & Electronic Engineering',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Electrical and Electronic Engineering BEng and MEng titles',
    rankingScope: 'comparison',
    data: electricalData,
  },
  {
    id: 'chemical',
    label: 'Chemical Engineering',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Chemical Engineering BEng and MEng titles — process, biochemical and energy engineering',
    rankingScope: 'comparison',
    data: chemicalData,
  },
  {
    id: 'aerospace',
    label: 'Aerospace Engineering',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Aerospace and Aeronautical Engineering BEng and MEng titles',
    rankingScope: 'comparison',
    data: aerospaceData,
  },
];
