/**
 * Generates src/data/business/university-details.json.
 *
 * Factual fields (founded, student numbers, fees, accommodation, NSS scores,
 * travel) are reused verbatim from the profile the same university already has
 * in another strand, so a university does not report different facts depending
 * on which strand you reached it from. Only the subject-facing fields —
 * overview, graduate employers, key facts and student-life highlights — are
 * rewritten for business and management.
 *
 * Run: node scripts/gen-business-university-details.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Strands are searched in this order; the profile with the most fields wins, so
// the long-form finance and maths profiles are preferred over the leaner ones.
const SOURCE_STRANDS = [
  'finance', 'maths', 'physics', 'engineering', 'biochemistry',
  'humanities', 'socialsciences', 'computer-science', 'medicine', 'biology',
];

function readJson(relPath) {
  return JSON.parse(readFileSync(resolve(ROOT, relPath), 'utf8').replace(/^﻿/, ''));
}

const BASE = new Map();
for (const strand of SOURCE_STRANDS) {
  const details = readJson(`src/data/${strand}/university-details.json`);
  for (const [slug, profile] of Object.entries(details)) {
    const existing = BASE.get(slug);
    if (!existing || Object.keys(profile).length > Object.keys(existing).length) {
      BASE.set(slug, profile);
    }
  }
}

// slug -> { overview, employers, keyFacts, highlights? }
const BUSINESS = {
  oxford: {
    overview: 'Oxford has no standalone business degree at undergraduate level — Economics and Management (run jointly by the Department of Economics and the Saïd Business School) is the route, and it is among the most competitive courses in the UK. Teaching is tutorial-based, with the economics half taught to the same standard as the single-honours degree.',
    employers: ['McKinsey & Company', 'Goldman Sachs', 'Boston Consulting Group', 'Bain & Company', 'Oxera'],
    keyFacts: ['Ranked #1 in the UK for Business & Management (CUG 2027)', 'Economics and Management is the only undergraduate business route', 'TSA admissions test and A-level Maths at A/A* required'],
    highlights: ['Oxford Entrepreneurs', 'Oxford Finance Society', 'Saïd Business School student events'],
  },
  cambridge: {
    overview: 'Cambridge offers no undergraduate business degree. The nearest routes are Land Economy — a distinctive law, economics and land-management tripos — and Management Studies, which is taken as a one-year Part II add-on after two years in another subject.',
    employers: ['Savills', 'Knight Frank', 'McKinsey & Company', 'Bain & Company', 'Grosvenor'],
    keyFacts: ['No standalone undergraduate business degree', 'Land Economy combines law, economics and property', 'Management Studies is a Part II add-on, not a three-year degree'],
    highlights: ['Cambridge University Land Society', 'CU Entrepreneurs', 'Judge Business School talks'],
  },
  warwick: {
    overview: 'Warwick Business School is the UK’s strongest all-round undergraduate business destination — triple-crown accredited, ranked second nationally for Business & Management, and consistently a primary target school for the Big Four, the consultancies and the City.',
    employers: ['Deloitte', 'PwC', 'Accenture', 'Unilever', 'Goldman Sachs'],
    keyFacts: ['Ranked #2 in the UK for Business & Management (CUG 2027)', 'Triple-crown accredited (AACSB, EQUIS, AMBA)', 'Large, well-resourced careers operation inside WBS'],
    highlights: ['Warwick Finance Societies', 'Warwick Consulting Society', 'Warwick Entrepreneurs'],
  },
  'london-school-of-economics-and-political-science': {
    overview: 'LSE’s Department of Management sits inside one of the world’s leading social science institutions, and its BSc Management is the most quantitative of the major UK management degrees — A-level Maths is essential and HL Maths is required at 6.',
    employers: ['Goldman Sachs', 'J.P. Morgan', 'McKinsey & Company', 'Bain & Company', 'Blackstone'],
    keyFacts: ['Ranked #3 in the UK for Business & Management and #1 for Accounting & Finance (CUG 2027)', '95% graduate prospects — the highest in the comparison set', 'Central London campus on the doorstep of the City'],
    highlights: ['LSE SU Business Society', 'LSE Investment Society', 'LSE Entrepreneurs'],
  },
  'st-andrews': {
    overview: 'St Andrews’ School of Management delivers a Scottish four-year MA, so the first two years stay broad before you commit to management. Small cohorts and very high student satisfaction, with a strong record into consulting and finance despite the remote location.',
    employers: ['Deloitte', 'PwC', 'Baillie Gifford', 'Accenture', 'Morgan Stanley'],
    keyFacts: ['Ranked #4 in the UK for Business & Management (CUG 2027)', 'Four-year MA with flexible first two years', '90% graduate prospects'],
    highlights: ['St Andrews Management Society', 'Investment Society', 'Entrepreneurship Centre'],
  },
  'university-college-london': {
    overview: 'The UCL School of Management is the newest of the major London business schools and deliberately quantitative — Management Science and Information Management for Business are closer to applied analytics than to general management, taught from the 38th floor of One Canada Square in Canary Wharf.',
    employers: ['Amazon', 'Google', 'McKinsey & Company', 'Barclays', 'Accenture'],
    keyFacts: ['Ranked #5 in the UK for Business & Management (CUG 2027)', 'Teaching based in Canary Wharf, not Bloomsbury', 'Analytics- and technology-weighted rather than generalist'],
    highlights: ['UCL Management Society', 'UCL Entrepreneurs', 'UCL Data Science Society'],
  },
  bath: {
    overview: 'Bath’s School of Management is built around the placement year, and its reputation with graduate recruiters rests on it — most students spend a paid year in industry and a large share return to the same employer. Ranked top in the UK for Marketing.',
    employers: ['Unilever', 'PwC', 'Nestlé', 'GSK', 'Deloitte'],
    keyFacts: ['Ranked #6 for Business & Management and #1 for Marketing (CUG 2027)', 'Placement year is the centrepiece of the degree', '91% graduate prospects'],
    highlights: ['Bath Marketing Society', 'Bath Investment Society', 'Bath Entrepreneurs'],
  },
  'king-s-college-london': {
    overview: 'King’s Business School is the newest faculty at King’s and among the fastest-rising business schools in London, with an A*AA Business Management degree and strong placement into City finance and professional services from a central London base.',
    employers: ['J.P. Morgan', 'Deloitte', 'EY', 'Accenture', 'Barclays'],
    keyFacts: ['Ranked #7 in the UK for Business & Management (CUG 2027)', 'A*AA standard offer for Business Management', 'Bush House campus on the Strand'],
    highlights: ["King's Business Club", "King's Entrepreneurship Institute", 'KCL Finance Society'],
  },
  exeter: {
    overview: 'Exeter Business School has a strong Russell Group reputation for business, management and marketing, with 88% graduate prospects and a notably large and well-connected alumni network in the City and in consultancy.',
    employers: ['PwC', 'Deloitte', 'Lloyds Banking Group', 'Unilever', 'Accenture'],
    keyFacts: ['Ranked #8 for Business & Management and #2 for Marketing (CUG 2027)', '88% graduate prospects', 'Streatham campus regularly rated among the UK’s most attractive'],
    highlights: ['Exeter Entrepreneurs', 'Exeter Investment Society', 'Exeter Marketing Society'],
  },
  leeds: {
    overview: 'Leeds University Business School is one of the largest in the Russell Group and triple-crown accredited, offering an unusually wide spread of specialist routes — management, marketing, HR, international business, analytics and accounting — all with placement options.',
    employers: ['PwC', 'Deloitte', 'Asda', 'Sky', 'Unilever'],
    keyFacts: ['Ranked #9 in the UK for Business & Management (CUG 2027)', 'Triple-crown accredited', 'Very broad set of named specialist degrees'],
    highlights: ['Leeds University Business Society', 'Leeds Marketing Society', 'Spark enterprise support'],
  },
  bristol: {
    overview: 'Bristol’s School of Management is smaller than most Russell Group business schools and markets itself on a reflective, critical approach to management rather than a purely functional one. 84% graduate prospects with strong links to the Bristol tech and aerospace cluster.',
    employers: ['Deloitte', 'Airbus', 'Hargreaves Lansdown', 'PwC', 'Dyson'],
    keyFacts: ['Ranked #10 in the UK for Business & Management (CUG 2027)', 'Smaller, more critical-management focus', 'Strong regional tech and aerospace employer base'],
    highlights: ['Bristol Entrepreneurs', 'Bristol Investment Society', 'Bristol Marketing Society'],
  },
  birmingham: {
    overview: 'Birmingham Business School is the oldest business school in the UK, founded in 1902, and triple-crown accredited. Large cohorts, a wide specialist spread and 86% graduate prospects, with placement and year-abroad variants across most routes.',
    employers: ['PwC', 'Deloitte', 'Jaguar Land Rover', 'HSBC', 'Aldi'],
    keyFacts: ['The UK’s first business school, founded 1902', 'Ranked #11 in the UK for Business & Management (CUG 2027)', 'Triple-crown accredited'],
    highlights: ['Birmingham Business Society', 'Birmingham Entrepreneurs', 'Marketing Society'],
  },
  manchester: {
    overview: 'Alliance Manchester Business School is one of the two original UK business schools and among the largest, with a distinctive first year shared across all BSc Management routes before you declare a specialism. Original Home of the MBA in Europe.',
    employers: ['PwC', 'Deloitte', 'Accenture', 'Barclays', 'Co-op'],
    keyFacts: ['Ranked #12 in the UK for Business & Management (CUG 2027)', 'Specialism declared after a common first year', 'Triple-crown accredited'],
    highlights: ['Manchester Business Society', 'AMBS Investment Society', 'Manchester Entrepreneurs'],
  },
  edinburgh: {
    overview: 'The University of Edinburgh Business School teaches a Scottish four-year MA, with strong links into the Edinburgh asset-management cluster — Baillie Gifford, Abrdn and Scottish Widows all recruit here directly.',
    employers: ['Baillie Gifford', 'Abrdn', 'Deloitte', 'Royal Bank of Scotland', 'Accenture'],
    keyFacts: ['Ranked #13 in the UK for Business & Management (CUG 2027)', 'Four-year Scottish MA structure', 'Edinburgh is the UK’s second-largest financial centre'],
    highlights: ['Edinburgh University Business Society', 'Edinburgh Investment Society', 'Edinburgh Entrepreneurship Club'],
  },
  loughborough: {
    overview: 'Loughborough Business School pairs a very strong placement record with consistently high student satisfaction, and offers one of the clearest sets of specialist routes in the sector — management, marketing, international business and IT management for business.',
    employers: ['Unilever', 'PwC', 'Rolls-Royce', 'Aldi', 'Mars'],
    keyFacts: ['Ranked #14 in the UK for Business & Management (CUG 2027)', '86% graduate prospects with a strong placement culture', 'Single large campus with extensive sports facilities'],
    highlights: ['Loughborough Business Society', 'Marketing Society', 'LU Enterprise'],
  },
  durham: {
    overview: 'Durham University Business School is triple-crown accredited and highly selective — A*AA for Business and Management — with a collegiate structure and an employment profile closer to Oxbridge than to most of the Russell Group.',
    employers: ['PwC', 'Deloitte', 'Goldman Sachs', 'Accenture', 'Barclays'],
    keyFacts: ['Ranked #15 in the UK for Business & Management (CUG 2027)', 'A*AA standard offer', 'Collegiate system with strong alumni networks'],
    highlights: ['Durham University Finance Society', 'Durham Consulting Society', 'Durham Entrepreneurs'],
  },
  glasgow: {
    overview: 'Adam Smith Business School carries the name of the university’s most famous alumnus and teaches a four-year MA (Social Sciences), with a flexible first two years and the lowest typical entry band of the top-20 business schools.',
    employers: ['Deloitte', 'Barclays', 'J.P. Morgan', 'Morgan Stanley', 'BDO'],
    keyFacts: ['Ranked #16 in the UK for Business & Management (CUG 2027)', 'Named after Adam Smith, a Glasgow alumnus and professor', 'AAB–BBB entry band with no prior business study needed'],
    highlights: ['Glasgow University Business Society', 'Adam Smith Investment Society', 'Glasgow Entrepreneurs'],
  },
  strathclyde: {
    overview: 'Strathclyde Business School is triple-crown accredited and unusual among non-Russell-Group schools for its research standing. Its Marketing department is one of the oldest in the UK and ranked sixth nationally.',
    employers: ['Deloitte', 'Barclays', 'Scottish Power', 'PwC', 'Morgan Stanley'],
    keyFacts: ['Ranked #17 for Business & Management and #6 for Marketing (CUG 2027)', 'Triple-crown accredited outside the Russell Group', 'Strong Glasgow city-centre employer links'],
    highlights: ['Strathclyde Business School Society', 'Strathclyde Marketing Society', 'Strathclyde Entrepreneurs'],
  },
  'city-st-george-s-university-of-london': {
    overview: 'Bayes Business School (formerly Cass) sits a short walk from the City of London and is built around finance, insurance and professional services recruitment. Now part of City St George’s following the 2024 merger with St George’s.',
    employers: ['Lloyd’s of London', 'Aon', 'Barclays', 'EY', 'Marsh'],
    keyFacts: ['Ranked #18 in the UK for Business & Management (CUG 2027)', 'Bayes Business School is minutes from the City', 'Exceptional insurance and actuarial employer links'],
    highlights: ['Bayes Investment Society', 'City Marketing Society', 'City Entrepreneurs'],
  },
  cardiff: {
    overview: 'Cardiff Business School is a Russell Group school with a declared public-value mission, and its logistics and operations management group is one of the strongest in the UK — Cardiff effectively introduced lean thinking to British academia.',
    employers: ['PwC', 'Deloitte', 'Admiral', 'Welsh Government', 'Tata Steel'],
    keyFacts: ['Ranked #19 in the UK for Business & Management (CUG 2027)', 'Leading UK centre for logistics and lean operations', 'Public-value mission shapes the curriculum'],
    highlights: ['Cardiff Business Society', 'Cardiff Marketing Society', 'Cardiff Enterprise'],
  },
  lancaster: {
    overview: 'Lancaster University Management School is triple-crown accredited and widely regarded as the strongest business school outside the Russell Group, with an ABB entry band that makes it unusually good value for the quality of teaching and placement support.',
    employers: ['PwC', 'Deloitte', 'Unilever', 'BAE Systems', 'Accenture'],
    keyFacts: ['Ranked #20 in the UK for Business & Management (CUG 2027)', 'Triple-crown accredited; LUMS is a top-tier school at an ABB offer', '85% graduate prospects'],
    highlights: ['LUMS Business Society', 'Lancaster Marketing Society', 'Lancaster Entrepreneurs'],
  },
  sheffield: {
    overview: 'Sheffield University Management School is triple-crown accredited with strong accounting and financial management provision, and sits in one of the most affordable Russell Group cities for living costs.',
    employers: ['PwC', 'Deloitte', 'HSBC', 'Rolls-Royce', 'Aviva'],
    keyFacts: ['Ranked #21 in the UK for Business & Management (CUG 2027)', 'Triple-crown accredited', 'Among the lowest living costs in the Russell Group'],
    highlights: ['Sheffield Business Society', 'Sheffield Investment Society', 'Sheffield Enterprise'],
  },
  liverpool: {
    overview: 'University of Liverpool Management School is triple-crown accredited with a strong marketing group — fifth in the UK — and good links into the Liverpool professional services and maritime logistics sectors.',
    employers: ['PwC', 'Grant Thornton', 'Peel Ports', 'Barclays', 'Unilever'],
    keyFacts: ['Ranked #22 for Business & Management and #5 for Marketing (CUG 2027)', 'Triple-crown accredited', 'Strong maritime and logistics employer base'],
    highlights: ['Liverpool Business Society', 'Liverpool Marketing Society', 'Liverpool Entrepreneurs'],
  },
  nottingham: {
    overview: 'Nottingham University Business School is triple-crown accredited and operates campuses in China and Malaysia, making international exchange and study-abroad unusually easy to arrange within the same institution.',
    employers: ['PwC', 'Deloitte', 'Boots', 'Experian', 'Rolls-Royce'],
    keyFacts: ['Ranked #23 in the UK for Business & Management (CUG 2027)', 'Campuses in Ningbo (China) and Semenyih (Malaysia)', 'Triple-crown accredited'],
    highlights: ['Nottingham Business Society', 'Nottingham Marketing Society', 'Ingenuity enterprise programme'],
  },
  'queen-s-university-belfast': {
    overview: 'Queen’s Management School is triple-crown accredited and ranked fifth in the UK for Accounting & Finance, with 92% graduate prospects in that subject — among the best in these tables — and very low living costs.',
    employers: ['PwC', 'Deloitte', 'EY', 'Citi', 'First Derivatives'],
    keyFacts: ['Ranked #5 in the UK for Accounting & Finance (CUG 2027)', '92% graduate prospects in accounting', 'Lowest living costs of any Russell Group city'],
    highlights: ['Queen’s Management Society', 'QUB Investment Society', 'QUB Entrepreneurs'],
  },
  southampton: {
    overview: 'Southampton Business School is triple-crown accredited with particular strength in marketing — third in the UK — and in business analytics, supported by the university’s wider data science research base.',
    employers: ['PwC', 'Deloitte', 'Carnival UK', 'Ordnance Survey', 'Lloyds Banking Group'],
    keyFacts: ['Ranked #3 in the UK for Marketing (CUG 2027)', 'Triple-crown accredited', 'Strong analytics provision linked to university data science'],
    highlights: ['Southampton Business Society', 'Marketing Society', 'Southampton Enterprise'],
  },
  york: {
    overview: 'The School for Business and Society at York is one of the newer Russell Group business schools, built explicitly around social purpose and sustainability alongside conventional management content.',
    employers: ['PwC', 'Deloitte', 'Aviva', 'Nestlé', 'Civil Service'],
    keyFacts: ['Ranked #26 in the UK for Business & Management (CUG 2027)', 'Explicit social-purpose and sustainability framing', 'Collegiate campus with lake-side accommodation'],
    highlights: ['York Business Society', 'York Marketing Society', 'York Entrepreneurs'],
  },
  aberdeen: {
    overview: 'Aberdeen University Business School teaches a four-year Scottish MA with distinctive real estate and energy-sector provision, reflecting the city’s oil, gas and renewables economy.',
    employers: ['Shell', 'BP', 'Savills', 'KPMG', 'Wood'],
    keyFacts: ['Ranked #27 in the UK for Business & Management (CUG 2027)', 'RICS-accredited Real Estate degree', 'Strong energy-sector graduate routes'],
    highlights: ['Aberdeen Business Society', 'Aberdeen Property Society', 'Aberdeen Entrepreneurs'],
  },
  newcastle: {
    overview: 'Newcastle University Business School is triple-crown accredited and based in a purpose-built city-centre building, with strong accounting provision (84% graduate prospects) and a well-regarded marketing group.',
    employers: ['PwC', 'Deloitte', 'Sage', 'Greggs', 'Barclays'],
    keyFacts: ['Ranked #22 in the UK for Accounting & Finance (CUG 2027)', 'Purpose-built city-centre business school', 'Triple-crown accredited'],
    highlights: ['Newcastle Business Society', 'Newcastle Marketing Society', 'Newcastle Entrepreneurs'],
  },
  reading: {
    overview: 'Henley Business School at Reading is ranked first in the UK for Land & Property Management and is the dominant academic name in UK real estate, with an exceptionally strong pipeline into CBRE, JLL, Savills and Knight Frank.',
    employers: ['CBRE', 'JLL', 'Savills', 'Knight Frank', 'British Land'],
    keyFacts: ['Ranked #1 in the UK for Land & Property Management (CUG 2027)', 'Henley Business School is triple-crown accredited', 'RICS-accredited Real Estate degree with 86% graduate prospects'],
    highlights: ['Reading Real Estate Society', 'Henley Business Society', 'Reading Investment Society'],
  },
  dundee: {
    overview: 'Dundee’s business provision sits in the School of Business and is strongest in accountancy, where it ranks 21st nationally with 81% graduate prospects, taught as a four-year Scottish MA.',
    employers: ['EY', 'Johnston Carmichael', 'NCR', 'Aviva', 'Scottish Government'],
    keyFacts: ['Ranked #21 in the UK for Accounting & Finance (CUG 2027)', 'Four-year Scottish MA structure', 'Low living costs and compact city-centre campus'],
    highlights: ['Dundee Business Society', 'Dundee Accountancy Society', 'Dundee Enterprise'],
  },
  surrey: {
    overview: 'Surrey Business School is ranked first in the UK for Hospitality, Tourism and Travel — a long-standing national leadership position — and runs a strong placement programme across its business degrees from a campus close to London.',
    employers: ['Marriott International', 'Hilton', 'PwC', 'Nestlé', 'IHG'],
    keyFacts: ['Ranked #1 in the UK for Tourism, Transport and Travel (CUG 2027)', 'Placement year available across most business degrees', '35 minutes by train from London Waterloo'],
    highlights: ['Surrey Hospitality Society', 'Surrey Business Society', 'Surrey Enterprise'],
  },
  stirling: {
    overview: 'Stirling Management School teaches a four-year Scottish degree with distinctive tourism, events and sports-business provision, set on a loch-side campus below the Ochil Hills.',
    employers: ['Scottish Government', 'Diageo', 'VisitScotland', 'Standard Life', 'Historic Environment Scotland'],
    keyFacts: ['Ranked #32 in the UK for Business & Management (CUG 2027)', 'Strong tourism, events and sports-business routes', 'Loch-side campus with national sports facilities'],
    highlights: ['Stirling Business Society', 'Stirling Events Society', 'Stirling Enterprise'],
  },
  aston: {
    overview: 'Aston Business School is triple-crown accredited and built around the placement year — Aston was one of the first UK universities to make a sandwich year standard, and its graduate outcomes reflect it.',
    employers: ['Deloitte', 'PwC', 'Jaguar Land Rover', 'Aldi', 'Mondelez'],
    keyFacts: ['Ranked #33 in the UK for Business & Management (CUG 2027)', 'Triple-crown accredited with a placement-first model', 'Birmingham city-centre campus'],
    highlights: ['Aston Business Society', 'Aston Marketing Society', 'Aston Enterprise'],
  },
  sussex: {
    overview: 'The University of Sussex Business School has strength in marketing (15th nationally) and in international business, with a critical, policy-engaged approach reflecting the wider Sussex tradition.',
    employers: ['American Express', 'PwC', 'Legal & General', 'Brandwatch', 'Civil Service'],
    keyFacts: ['Ranked #15 in the UK for Marketing (CUG 2027)', 'Policy-engaged approach to management', 'Campus in the South Downs, minutes from Brighton'],
    highlights: ['Sussex Business Society', 'Sussex Marketing Society', 'Sussex Entrepreneurs'],
  },
  swansea: {
    overview: 'Swansea School of Management sits on the seafront Bay Campus and is strongest in accounting and business economics, with notably low living costs for a city university.',
    employers: ['PwC', 'Admiral', 'Welsh Government', 'Deloitte', 'Tata Steel'],
    keyFacts: ['Ranked #27 in the UK for Accounting & Finance (CUG 2027)', 'Bay Campus sits directly on the beach', 'Among the lowest living costs in the UK'],
    highlights: ['Swansea Business Society', 'Swansea Enterprise', 'Swansea Accounting Society'],
  },
  leicester: {
    overview: 'Leicester School of Business offers a broad management portfolio with a well-regarded critical management studies tradition, and sits at an ABB entry band with strong local professional-services recruitment.',
    employers: ['PwC', 'Next', 'Hastings Direct', 'Deloitte', 'Dunelm'],
    keyFacts: ['Ranked #37 in the UK for Business & Management (CUG 2027)', 'Established critical management studies group', 'Compact campus close to the city centre'],
    highlights: ['Leicester Business Society', 'Leicester Marketing Society', 'Leicester Enterprise'],
  },
  kent: {
    overview: 'Kent Business School has campuses at Canterbury and Medway, and is strongest in marketing (23rd nationally, 80% graduate prospects). Its proximity to the Channel ports supports a logistics and European business focus.',
    employers: ['PwC', 'Saga', 'Pfizer', 'KPMG', 'Civil Service'],
    keyFacts: ['Ranked #23 in the UK for Marketing (CUG 2027)', 'European business focus reflecting the Channel-port location', 'Canterbury and Medway campuses'],
    highlights: ['Kent Business Society', 'Kent Marketing Society', 'ASPIRE enterprise support'],
  },
  keele: {
    overview: 'Keele Business School offers CIPD-accredited HR provision and a well-regarded marketing group on the UK’s largest single campus, with a long tradition of combined-honours flexibility.',
    employers: ['Bet365', 'JCB', 'PwC', 'NHS', 'Michelin'],
    keyFacts: ['Ranked #40 in the UK for Marketing (CUG 2027)', 'CIPD-accredited human resource management', 'The largest single-site campus in the UK'],
    highlights: ['Keele Business Society', 'Keele HR Society', 'Keele Enterprise'],
  },
  hull: {
    overview: 'Hull University Business School is triple-crown accredited and nationally distinctive for logistics and supply chain management, supported by the Logistics Institute and the city’s position as a major Humber port.',
    employers: ['Siemens Gamesa', 'Reckitt', 'Associated British Ports', 'Smith & Nephew', 'Arco'],
    keyFacts: ['Home of the Logistics Institute, a leading UK supply chain centre', 'Triple-crown accredited', 'Ranked #32 in the UK for Marketing (CUG 2027)'],
    highlights: ['Hull Logistics Society', 'Hull Business Society', 'Hull Enterprise'],
  },
  northumbria: {
    overview: 'Newcastle Business School at Northumbria is AACSB-accredited and among the largest business schools in the UK, with strong marketing (26th nationally, 78% graduate prospects) and extensive placement provision.',
    employers: ['Sage', 'Accenture', 'Greggs', 'Barclays', 'Nissan'],
    keyFacts: ['Ranked #26 in the UK for Marketing (CUG 2027)', 'AACSB-accredited and one of the largest UK business schools', 'City-centre campus in Newcastle'],
    highlights: ['Northumbria Business Society', 'Northumbria Marketing Society', 'Northumbria Enterprise'],
  },
  'manchester-metropolitan': {
    overview: 'Manchester Metropolitan University’s Business School is one of the largest in the UK and strongest in marketing (29th nationally, 80% graduate prospects), with extensive SME and digital-agency placement links across Greater Manchester.',
    employers: ['Co-op', 'AO.com', 'THG', 'Bupa', 'Kellogg’s'],
    keyFacts: ['Ranked #29 in the UK for Marketing (CUG 2027)', 'One of the largest business schools in the UK', 'Dense Manchester agency and SME placement network'],
    highlights: ['MMU Business Society', 'MMU Marketing Society', 'MMU Enterprise'],
  },
  lincoln: {
    overview: 'Lincoln International Business School offers CIPD- and CIM-aligned routes with a strong applied, SME-facing emphasis, and ranks 34th nationally for Marketing with 76% graduate prospects.',
    employers: ['Siemens Energy', 'Lincolnshire Co-op', 'Bakkavor', 'PwC', 'NHS'],
    keyFacts: ['Ranked #34 in the UK for Marketing (CUG 2027)', 'CIPD- and CIM-aligned provision', 'Compact waterside campus in central Lincoln'],
    highlights: ['Lincoln Business Society', 'Lincoln Marketing Society', 'Lincoln Enterprise'],
  },
  'sheffield-hallam': {
    overview: 'Sheffield Hallam is ranked second in the UK for Land & Property Management with a 100% graduate prospects figure, and runs well-established RICS-accredited real estate and applied business provision.',
    employers: ['CBRE', 'Savills', 'Henry Boot', 'Sheffield City Council', 'HSBC'],
    keyFacts: ['Ranked #2 in the UK for Land & Property Management (CUG 2027)', '100% graduate prospects in property', 'RICS-accredited Real Estate degree'],
    highlights: ['Hallam Property Society', 'Hallam Business Society', 'Hallam Enterprise'],
  },
  'liverpool-john-moores': {
    overview: 'Liverpool John Moores has strong RICS-accredited property provision — fourth in the UK for Land & Property Management with 94% graduate prospects — alongside applied business and tourism degrees.',
    employers: ['CBRE', 'Savills', 'Liverpool City Council', 'Peel Ports', 'Bruntwood'],
    keyFacts: ['Ranked #4 in the UK for Land & Property Management (CUG 2027)', '94% graduate prospects in property', 'City-centre campus across Liverpool'],
    highlights: ['LJMU Property Society', 'LJMU Business Society', 'LJMU Enterprise'],
  },
  westminster: {
    overview: 'Westminster Business School sits in central London with RICS-accredited real estate provision — sixth nationally with 92% graduate prospects — and strong tourism and events management routes.',
    employers: ['CBRE', 'Knight Frank', 'Transport for London', 'Hilton', 'Savills'],
    keyFacts: ['Ranked #6 in the UK for Land & Property Management (CUG 2027)', '92% graduate prospects in property', 'Marylebone and Regent Street campuses in central London'],
    highlights: ['Westminster Property Society', 'Westminster Business Society', 'Westminster Enterprise'],
  },
  'harper-adams': {
    overview: 'Harper Adams is the UK’s leading specialist land-based university, with RICS-accredited rural property management and agri-business degrees, a working 635-hectare farm, and an almost universal placement year.',
    employers: ['Savills', 'Strutt & Parker', 'Carter Jonas', 'NFU', 'Defra'],
    keyFacts: ['Ranked #8 in the UK for Land & Property Management (CUG 2027)', 'RICS- and CAAV-relevant rural property provision', 'Working commercial farm on campus; placement year near-universal'],
    highlights: ['Harper Adams Rural Property Society', 'Agri-business Society', 'Harper Forum'],
  },
  bournemouth: {
    overview: 'Bournemouth University Business School has long-standing strength in tourism, hospitality and events management, drawing on the town’s position as a major UK resort destination, with placement years standard.',
    employers: ['TUI', 'Hilton', 'Jet2holidays', 'JP Morgan Bournemouth', 'Merlin Entertainments'],
    keyFacts: ['Ranked #18 in the UK for Tourism, Transport and Travel (CUG 2027)', 'Placement year standard on tourism and hospitality routes', 'Coastal resort location supports sector placements'],
    highlights: ['Bournemouth Tourism Society', 'BU Business Society', 'BU Enterprise'],
  },
  brighton: {
    overview: 'University of Brighton Business School offers applied tourism, events and business management degrees with 76% graduate prospects in tourism — the strongest outcome figure among the mid-table providers.',
    employers: ['American Express', 'Legal & General', 'Brighton & Hove City Council', 'TUI', 'Hilton'],
    keyFacts: ['Ranked #20 in the UK for Tourism, Transport and Travel (CUG 2027)', '76% graduate prospects in tourism', 'Campuses across Brighton and Eastbourne'],
    highlights: ['Brighton Business Society', 'Brighton Tourism Society', 'Brighton Enterprise'],
  },
  coventry: {
    overview: 'Coventry University Business School is large and placement-focused, with international logistics and hospitality management routes and strong links to the West Midlands automotive and distribution sectors.',
    employers: ['Jaguar Land Rover', 'DHL', 'Severn Trent', 'Aldi', 'Deloitte'],
    keyFacts: ['International Logistics degree supported by West Midlands distribution hubs', 'Large placement and sandwich-year programme', 'City-centre campus'],
    highlights: ['Coventry Business Society', 'Coventry Logistics Society', 'Coventry Enterprise'],
  },
  plymouth: {
    overview: 'Plymouth Business School has applied strength in tourism, hospitality and maritime business, supported by the university’s marine and logistics research base and the city’s port economy.',
    employers: ['Princess Yachts', 'Babcock International', 'TUI', 'Plymouth City Council', 'Pennon Group'],
    keyFacts: ['Ranked #10 in the UK for Tourism, Transport and Travel (CUG 2027)', 'Maritime and marine business specialisms', 'Waterfront city with strong port employer links'],
    highlights: ['Plymouth Business Society', 'Plymouth Tourism Society', 'Plymouth Enterprise'],
  },
  'cardiff-metropolitan': {
    overview: 'Cardiff Metropolitan University’s Cardiff School of Management offers applied tourism, hospitality and events degrees with a strong practical and industry-placement emphasis.',
    employers: ['Celtic Manor', 'Principality', 'Welsh Government', 'Hilton', 'Admiral'],
    keyFacts: ['Ranked #32 in the UK for Tourism, Transport and Travel (CUG 2027)', 'Applied, placement-led teaching model', 'Llandaff campus in Cardiff'],
    highlights: ['Cardiff Met Business Society', 'Hospitality Society', 'Cardiff Met Enterprise'],
  },
  'queen-margaret': {
    overview: 'Queen Margaret University in Edinburgh is a specialist provider with long-established hospitality, tourism and events management degrees and close ties to the Edinburgh festivals economy.',
    employers: ['Edinburgh International Festival', 'Hilton', 'Apex Hotels', 'VisitScotland', 'Historic Environment Scotland'],
    keyFacts: ['Ranked #29 in the UK for Tourism, Transport and Travel (CUG 2027)', 'Close links to the Edinburgh festivals', 'Small, specialist, placement-heavy provision'],
    highlights: ['QMU Hospitality Society', 'QMU Events Society', 'QMU Business Society'],
  },
  'edinburgh-napier': {
    overview: 'Edinburgh Napier’s Business School has distinctive tourism, airline and festival management provision, reflecting Edinburgh’s position as a major aviation and events destination.',
    employers: ['Edinburgh Airport', 'Hilton', 'Royal Bank of Scotland', 'VisitScotland', 'Apex Hotels'],
    keyFacts: ['Ranked #30 in the UK for Tourism, Transport and Travel (CUG 2027)', 'Tourism and Airline Management is a distinctive route', 'Three Edinburgh campuses'],
    highlights: ['Napier Tourism Society', 'Napier Business Society', 'Napier Enterprise'],
  },
  'robert-gordon': {
    overview: 'Robert Gordon University in Aberdeen offers applied business, tourism and hospitality degrees with strong energy-sector and north-east Scotland employer links, and a notably employment-focused teaching model.',
    employers: ['Shell', 'Wood', 'Aberdeen City Council', 'Marriott International', 'TAQA'],
    keyFacts: ['Ranked #38 in the UK for Tourism, Transport and Travel (CUG 2027)', 'Strong energy-sector graduate routes', 'Riverside Garthdee campus'],
    highlights: ['RGU Business Society', 'RGU Hospitality Society', 'RGU Enterprise'],
  },
  'heriot-watt': {
    overview: 'Heriot-Watt’s Edinburgh Business School offers international business, logistics and language-combined routes, with campuses in Dubai and Malaysia that make intra-institution study abroad straightforward.',
    employers: ['Shell', 'Standard Life', 'Baillie Gifford', 'DHL', 'Scottish Power'],
    keyFacts: ['Ranked #41 in the UK for Business & Management (CUG 2027)', 'Campuses in Dubai and Malaysia for study abroad', 'Strong logistics and languages combinations'],
    highlights: ['Heriot-Watt Business Society', 'Logistics Society', 'Heriot-Watt Enterprise'],
  },
  aberystwyth: {
    overview: 'Aberystwyth Business School offers tourism and business management degrees on the Welsh coast, with very low living costs and consistently high scores for student experience.',
    employers: ['Welsh Government', 'Visit Wales', 'NFU Cymru', 'HSBC', 'Principality'],
    keyFacts: ['Ranked #4 in the UK for Tourism, Transport and Travel (CUG 2027)', 'Among the lowest living costs in the UK', 'Coastal campus overlooking Cardigan Bay'],
    highlights: ['Aberystwyth Business Society', 'Tourism Society', 'AberEnterprise'],
  },
};

// Fields in a base profile that describe the *source strand's* subject rather
// than the institution. Carrying them over would put "Oxford's Mathematical
// Institute is the world's finest" on a business page, so they are dropped
// unless this file supplies a business version.
//
//   reputation    — subject-department prose
//   research      — REF rating and strength areas for the source subject
//   notableAlumni — the source subject's alumni (physicists, mathematicians)
//   application   — UCAS codes and personal-statement tips for the source subject
const DROP_FIELDS = ['reputation', 'research', 'notableAlumni', 'application'];

// Keys inside nested objects that are likewise subject-specific.
const DROP_NESTED = {
  // placementYearAvailable depends on the course, not the institution.
  employability: ['careersService', 'medianSalary', 'placementYearAvailable'],
  facilities: ['libraries', 'labs', 'studySpaces'],
};

function withoutKeys(object, keys) {
  if (!object) return undefined;
  const kept = Object.fromEntries(Object.entries(object).filter(([key]) => !keys.includes(key)));
  return Object.keys(kept).length ? kept : undefined;
}

/**
 * A few base profiles qualify the IELTS requirement with the source strand's
 * subject ("...for most Biological Sciences programmes"). The requirement
 * itself is institution-level, so keep the figure and drop the qualifier.
 */
function generaliseInternational(international) {
  if (!international?.englishRequirements) return international;
  return {
    ...international,
    englishRequirements: international.englishRequirements.replace(
      /for most .+? programmes/i, 'for most programmes'),
  };
}

function omitUndefined(object) {
  return Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined));
}

const out = {};
const missing = [];

for (const [slug, override] of Object.entries(BUSINESS)) {
  const base = BASE.get(slug);
  if (!base) {
    missing.push(slug);
    continue;
  }

  const institutional = { ...base };
  for (const field of DROP_FIELDS) delete institutional[field];

  out[slug] = omitUndefined({
    ...institutional,
    slug,
    overview: override.overview,
    employability: {
      ...(withoutKeys(base.employability, DROP_NESTED.employability) ?? {}),
      topEmployers: override.employers,
    },
    facilities: withoutKeys(base.facilities, DROP_NESTED.facilities),
    international: generaliseInternational(base.international),
    studentLife: {
      ...(base.studentLife ?? {}),
      ...(override.highlights ? { highlights: override.highlights } : {}),
    },
    keyFacts: override.keyFacts,
  });
}

if (missing.length) {
  console.error(`No base profile found for: ${missing.join(', ')}`);
  process.exitCode = 1;
}

const target = resolve(ROOT, 'src/data/business/university-details.json');
writeFileSync(target, `${JSON.stringify(out, null, 2)}\n`, 'utf8');
console.log(`${Object.keys(out).length} university profiles written to src/data/business/university-details.json`);
