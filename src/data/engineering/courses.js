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
    description: 'Explore Engineering (BEng) courses — broad-entry degrees covering all engineering disciplines',
    rankingScope: 'comparison',
    data: engineeringData,
  },
  {
    id: 'mechanical',
    label: 'Mechanical Engineering',
    rankLabel: 'Table Position',
    description: 'Explore Mechanical Engineering (BEng) courses across top UK universities',
    rankingScope: 'comparison',
    data: mechanicalData,
  },
  {
    id: 'civil',
    label: 'Civil Engineering',
    rankLabel: 'Table Position',
    description: 'Explore Civil Engineering (BEng) courses across top UK universities',
    rankingScope: 'comparison',
    data: civilData,
  },
  {
    id: 'electrical',
    label: 'Electrical & Electronic Engineering',
    rankLabel: 'Table Position',
    description: 'Explore Electrical and Electronic Engineering (BEng) courses',
    rankingScope: 'comparison',
    data: electricalData,
  },
  {
    id: 'chemical',
    label: 'Chemical Engineering',
    rankLabel: 'Table Position',
    description: 'Explore Chemical Engineering (BEng) courses — process, biochemical and energy engineering',
    rankingScope: 'comparison',
    data: chemicalData,
  },
  {
    id: 'aerospace',
    label: 'Aerospace Engineering',
    rankLabel: 'Table Position',
    description: 'Explore Aerospace and Aeronautical Engineering (BEng) courses',
    rankingScope: 'comparison',
    data: aerospaceData,
  },
];
