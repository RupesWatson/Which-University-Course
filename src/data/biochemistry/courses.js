import biochemistryData from './biochemistry.json';
import chemistryData from './chemistry.json';
import naturalSciencesData from './natural-sciences.json';
import biomedicalSciencesData from './biomedical-sciences.json';
import pharmacologyData from './pharmacology.json';
import molecularBiologyData from './molecular-biology.json';
import medicinalChemistryData from './medicinal-chemistry.json';
import geneticsData from './genetics.json';
import microbiologyData from './microbiology.json';
import biochemistryIndustryData from './biochemistry-with-industry.json';

export const COURSES = [
  {
    id: 'biochemistry',
    label: 'Biochemistry',
    rankLabel: 'Subject Rank',
    description: 'UCAS 2026 verified Biochemistry BSc and MBiochem titles across top UK universities',
    rankingScope: 'official',
    data: biochemistryData,
  },
  {
    id: 'chemistry',
    label: 'Chemistry',
    rankLabel: 'Subject Rank',
    description: 'UCAS 2026 verified Chemistry BSc and MChem titles across top UK universities',
    rankingScope: 'official',
    data: chemistryData,
  },
  {
    id: 'natSci',
    label: 'Natural Sciences',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Natural Sciences titles — interdisciplinary science degrees leading to Chemistry or Biochemistry specialisation',
    rankingScope: 'comparison',
    data: naturalSciencesData,
  },
  {
    id: 'biomedSci',
    label: 'Biomedical Sciences',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Biomedical Sciences BSc titles across Russell Group and other top universities',
    rankingScope: 'comparison',
    data: biomedicalSciencesData,
  },
  {
    id: 'pharmacology',
    label: 'Pharmacology',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Pharmacology BSc titles and close variants',
    rankingScope: 'comparison',
    data: pharmacologyData,
  },
  {
    id: 'molBiol',
    label: 'Molecular Biology',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Molecular Biology BSc and MBiol titles and close variants',
    rankingScope: 'comparison',
    data: molecularBiologyData,
  },
  {
    id: 'medicinalChem',
    label: 'Medicinal Chemistry',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Medicinal Chemistry BSc and MChem titles',
    rankingScope: 'comparison',
    data: medicinalChemistryData,
  },
  {
    id: 'genetics',
    label: 'Genetics',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Genetics BSc and MBiol titles across UK universities',
    rankingScope: 'comparison',
    data: geneticsData,
  },
  {
    id: 'microbiology',
    label: 'Microbiology',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Microbiology BSc titles across UK universities',
    rankingScope: 'comparison',
    data: microbiologyData,
  },
  {
    id: 'biochemIndustry',
    label: 'Biochemistry with Placement',
    rankLabel: 'Table Position',
    description: 'UCAS 2026 verified Biochemistry degrees with mandatory or optional industrial placement year',
    rankingScope: 'comparison',
    data: biochemistryIndustryData,
  },
];
