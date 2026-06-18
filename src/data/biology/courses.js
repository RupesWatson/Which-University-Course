import biologyData             from './biology.json';
import zoologyData             from './zoology.json';
import marineBiologyData       from './marine-biology.json';
import ecologyData             from './ecology.json';
import plantSciencesData       from './plant-sciences.json';
import biotechnologyData       from './biotechnology.json';
import geologyData             from './geology.json';
import earthSciencesData       from './earth-sciences.json';
import environmentalScienceData from './environmental-science.json';
import geographyData           from './geography.json';
import forestryData            from './forestry.json';

export const COURSES = [
  {
    id: 'biology',
    label: 'Biology',
    rankLabel: 'Subject Rank',
    description: 'Explore Biology BSc and (MBiol) courses across Russell Group and leading UK universities',
    rankingScope: 'official',
    data: biologyData,
  },
  {
    id: 'zoology',
    label: 'Zoology',
    rankLabel: 'Table Position',
    description: 'Explore Zoology BSc courses — animal biology, evolution, behavioural ecology',
    rankingScope: 'comparison',
    data: zoologyData,
  },
  {
    id: 'marineBiology',
    label: 'Marine Biology',
    rankLabel: 'Table Position',
    description: 'Explore Marine Biology BSc courses — coastal and ocean ecosystem study',
    rankingScope: 'comparison',
    data: marineBiologyData,
  },
  {
    id: 'ecology',
    label: 'Ecology & Conservation',
    rankLabel: 'Table Position',
    description: 'Explore Ecology and Conservation Biology BSc courses — field-based and applied conservation science',
    rankingScope: 'comparison',
    data: ecologyData,
  },
  {
    id: 'plantSciences',
    label: 'Plant Sciences',
    rankLabel: 'Table Position',
    description: 'Explore Plant Sciences and Botany BSc courses — plant biology, agriculture and crop science',
    rankingScope: 'comparison',
    data: plantSciencesData,
  },
  {
    id: 'biotechnology',
    label: 'Biotechnology',
    rankLabel: 'Table Position',
    description: 'Explore Biotechnology BSc courses — applying biology to industry, medicine and agriculture',
    rankingScope: 'comparison',
    data: biotechnologyData,
  },
  {
    id: 'earthSciences',
    label: 'Earth Sciences',
    rankLabel: 'Table Position',
    description: 'Explore Earth Sciences MEarthSci and BSc courses — broad-spectrum geosciences research',
    rankingScope: 'comparison',
    data: earthSciencesData,
  },
  {
    id: 'geology',
    label: 'Geology',
    rankLabel: 'Subject Rank',
    description: 'Explore Geology BSc and MSci courses — minerals, fossils, plate tectonics and resource extraction',
    rankingScope: 'official',
    data: geologyData,
  },
  {
    id: 'environmentalScience',
    label: 'Environmental Science',
    rankLabel: 'Table Position',
    description: 'Explore Environmental Science BSc courses — climate change, pollution, sustainability and conservation policy',
    rankingScope: 'comparison',
    data: environmentalScienceData,
  },
  {
    id: 'geography',
    label: 'Geography',
    rankLabel: 'Subject Rank',
    description: 'Explore Geography BA and BSc courses — covering human and physical geography from cultural to environmental change',
    rankingScope: 'official',
    data: geographyData,
  },
  {
    id: 'forestry',
    label: 'Forestry & Countryside',
    rankLabel: 'Table Position',
    description: 'Explore Forestry and Countryside Management BSc courses — woodland management, conservation and rural environment',
    rankingScope: 'comparison',
    data: forestryData,
  },
];
