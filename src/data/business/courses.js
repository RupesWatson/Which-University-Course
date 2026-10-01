import businessManagementData  from './business-management.json';
import internationalBusinessData from './international-business.json';
import economicsManagementData  from './economics-management.json';
import accountingData          from './accounting.json';
import marketingData            from './marketing.json';
import hrmData                  from './human-resource-management.json';
import entrepreneurshipData     from './entrepreneurship.json';
import businessAnalyticsData    from './business-analytics.json';
import businessLanguagesData    from './business-languages.json';
import realEstateData           from './real-estate.json';
import hospitalityTourismData   from './hospitality-tourism.json';

export const COURSES = [
  {
    id: 'businessManagement',
    label: 'Business & Management',
    rankLabel: 'Subject Rank',
    description: 'Explore Business and Management BSc and BA courses across Russell Group and leading UK universities',
    rankingScope: 'official',
    rankingYear: 2027,
    data: businessManagementData,
  },
  {
    id: 'internationalBusiness',
    label: 'International Business',
    rankLabel: 'Table Position',
    description: 'Explore International Business and International Management courses — usually with a year abroad',
    rankingScope: 'comparison',
    data: internationalBusinessData,
  },
  {
    id: 'economicsManagement',
    label: 'Economics & Management',
    rankLabel: 'Table Position',
    description: 'Explore Economics and Management, Business Economics and Industrial Economics courses',
    rankingScope: 'comparison',
    data: economicsManagementData,
  },
  {
    id: 'accounting',
    label: 'Accounting',
    rankLabel: 'Subject Rank',
    description: 'Explore Accounting, Accounting and Finance and Accountancy courses — the route to ICAEW, ACCA and CIMA',
    rankingScope: 'official',
    rankingYear: 2027,
    data: accountingData,
  },
  {
    id: 'marketing',
    label: 'Marketing',
    rankLabel: 'Subject Rank',
    description: 'Explore Marketing BSc and BA courses — consumer behaviour, brand strategy and digital marketing',
    rankingScope: 'official',
    rankingYear: 2027,
    data: marketingData,
  },
  {
    id: 'hrm',
    label: 'Human Resource Management',
    rankLabel: 'Table Position',
    description: 'Explore Human Resource Management courses — CIPD-aligned people, reward and employment-law routes',
    rankingScope: 'comparison',
    data: hrmData,
  },
  {
    id: 'entrepreneurship',
    label: 'Entrepreneurship & Innovation',
    rankLabel: 'Table Position',
    description: 'Explore Entrepreneurship, Enterprise and Innovation courses — starting and scaling ventures',
    rankingScope: 'comparison',
    data: entrepreneurshipData,
  },
  {
    id: 'businessAnalytics',
    label: 'Business Analytics',
    rankLabel: 'Table Position',
    description: 'Explore Business Analytics and Information Management courses — data-led decision making',
    rankingScope: 'comparison',
    data: businessAnalyticsData,
  },
  {
    id: 'businessLanguages',
    label: 'Business with Languages',
    rankLabel: 'Table Position',
    description: 'Explore Business and Management with a Modern Language courses — four years with a year abroad',
    rankingScope: 'comparison',
    data: businessLanguagesData,
  },
  {
    id: 'realEstate',
    label: 'Real Estate & Property',
    rankLabel: 'Subject Rank',
    description: 'Explore Real Estate, Property Management and Land Economy courses — most are RICS-accredited',
    rankingScope: 'official',
    rankingYear: 2027,
    data: realEstateData,
  },
  {
    id: 'hospitalityTourism',
    label: 'Hospitality & Tourism',
    rankLabel: 'Subject Rank',
    description: 'Explore Hospitality, Tourism and Events Management courses — placement-heavy and sector-facing',
    rankingScope: 'official',
    rankingYear: 2027,
    data: hospitalityTourismData,
  },
];
