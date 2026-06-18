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
    description: 'Explore Biochemistry BSc and MBiochem courses across top UK universities',
    rankingScope: 'official',
    data: biochemistryData,
  },
  {
    id: 'chemistry',
    label: 'Chemistry',
    rankLabel: 'Subject Rank',
    description: 'Explore Chemistry BSc and MChem courses across top UK universities',
    rankingScope: 'official',
    data: chemistryData,
  },
  {
    id: 'natSci',
    label: 'Natural Sciences',
    rankLabel: 'Table Position',
    description: 'Explore Natural Sciences courses — interdisciplinary science degrees leading to Chemistry or Biochemistry specialisation',
    rankingScope: 'comparison',
    data: naturalSciencesData,
  },
  {
    id: 'biomedSci',
    label: 'Biomedical Sciences',
    rankLabel: 'Table Position',
    description: 'Explore Biomedical Sciences (BSc) courses across Russell Group and other top universities',
    rankingScope: 'comparison',
    data: biomedicalSciencesData,
  },
  {
    id: 'pharmacology',
    label: 'Pharmacology',
    rankLabel: 'Table Position',
    description: 'Explore Pharmacology (BSc) courses and close variants',
    rankingScope: 'comparison',
    data: pharmacologyData,
  },
  {
    id: 'molBiol',
    label: 'Molecular Biology',
    rankLabel: 'Table Position',
    description: 'Explore Molecular Biology BSc and MBiol courses and close variants',
    rankingScope: 'comparison',
    data: molecularBiologyData,
  },
  {
    id: 'medicinalChem',
    label: 'Medicinal Chemistry',
    rankLabel: 'Table Position',
    description: 'Explore Medicinal Chemistry BSc and MChem courses',
    rankingScope: 'comparison',
    data: medicinalChemistryData,
  },
  {
    id: 'genetics',
    label: 'Genetics',
    rankLabel: 'Table Position',
    description: 'Explore Genetics BSc and MBiol courses across UK universities',
    rankingScope: 'comparison',
    data: geneticsData,
  },
  {
    id: 'microbiology',
    label: 'Microbiology',
    rankLabel: 'Table Position',
    description: 'Explore Microbiology (BSc) courses across UK universities',
    rankingScope: 'comparison',
    data: microbiologyData,
  },
  {
    id: 'biochemIndustry',
    label: 'Biochemistry with Placement',
    rankLabel: 'Table Position',
    description: 'Explore Biochemistry degrees with mandatory or optional industrial placement year',
    rankingScope: 'comparison',
    data: biochemistryIndustryData,
  },
];
