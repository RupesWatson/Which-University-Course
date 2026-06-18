import englishData from './english-literature.json';
import historyData from './history.json';
import philosophyData from './philosophy.json';
import classicsData from './classics.json';
import frenchData from './french.json';
import spanishData from './spanish.json';
import germanData from './german.json';
import modernLanguagesData from './modern-languages.json';
import linguisticsData from './linguistics.json';
import artHistoryData from './art-history.json';
import musicData from './music.json';
import englishCreativeWritingData from './english-creative-writing.json';
import dramaTheatreData from './drama-theatre.json';

export const COURSES = [
  {
    id: 'english',
    label: 'English Literature',
    rankLabel: 'Subject Rank',
    description: 'Explore English Literature (BA) courses — one of the most widely studied humanities degrees at Russell Group universities',
    rankingScope: 'official',
    data: englishData,
  },
  {
    id: 'history',
    label: 'History',
    rankLabel: 'Subject Rank',
    description: 'Explore History (BA) courses across Russell Group and leading UK universities',
    rankingScope: 'official',
    data: historyData,
  },
  {
    id: 'philosophy',
    label: 'Philosophy',
    rankLabel: 'Subject Rank',
    description: 'Explore Philosophy BA and MA Hons courses — analytical and continental traditions at top UK universities',
    rankingScope: 'official',
    data: philosophyData,
  },
  {
    id: 'classics',
    label: 'Classics',
    rankLabel: 'Table Position',
    description: 'Explore Classics and Classical Studies (BA) courses — ancient languages, literature, history and archaeology',
    rankingScope: 'comparison',
    data: classicsData,
  },
  {
    id: 'french',
    label: 'French',
    rankLabel: 'Subject Rank',
    description: 'Explore French (BA) courses — language, literature and culture, typically with a year abroad',
    rankingScope: 'official',
    data: frenchData,
  },
  {
    id: 'spanish',
    label: 'Spanish',
    rankLabel: 'Subject Rank',
    description: 'Explore Spanish (BA) courses — language, literature and Hispanic culture, typically with a year abroad',
    rankingScope: 'official',
    data: spanishData,
  },
  {
    id: 'german',
    label: 'German',
    rankLabel: 'Subject Rank',
    description: 'Explore German (BA) courses — language, literature and culture across Germany, Austria and Switzerland',
    rankingScope: 'official',
    data: germanData,
  },
  {
    id: 'modernLanguages',
    label: 'Modern Languages',
    rankLabel: 'Table Position',
    description: 'Explore Modern Languages degree courses — study two or more European or world languages',
    rankingScope: 'comparison',
    data: modernLanguagesData,
  },
  {
    id: 'linguistics',
    label: 'Linguistics',
    rankLabel: 'Table Position',
    description: 'Explore Linguistics (BA) courses — the scientific study of language, from phonetics to syntax',
    rankingScope: 'comparison',
    data: linguisticsData,
  },
  {
    id: 'artHistory',
    label: 'History of Art',
    rankLabel: 'Table Position',
    description: 'Explore History of Art (BA) courses — visual culture, criticism and curatorial practice',
    rankingScope: 'comparison',
    data: artHistoryData,
  },
  {
    id: 'musicHumanities',
    label: 'Music',
    rankLabel: 'Table Position',
    description: 'Explore Music (BA) courses — composition, performance, musicology and music technology',
    rankingScope: 'comparison',
    data: musicData,
  },
  {
    id: 'englishCreativeWriting',
    label: 'English & Creative Writing',
    rankLabel: 'Table Position',
    description: 'Explore English with Creative Writing (BA) courses — literary study combined with fiction, poetry and screenwriting',
    rankingScope: 'comparison',
    data: englishCreativeWritingData,
  },
  {
    id: 'dramaTheatre',
    label: 'Drama & Theatre Studies',
    rankLabel: 'Table Position',
    description: 'Explore Drama and Theatre Studies (BA) courses — performance, directing, design and theatre history',
    rankingScope: 'comparison',
    data: dramaTheatreData,
  },
];
