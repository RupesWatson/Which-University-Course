#!/usr/bin/env python3
"""Enrich finance university-details.json - batch 1 of 3 (universities 1-11)."""

import json
from pathlib import Path

FILE = Path(__file__).parent / "src/data/finance/university-details.json"

NEW_DATA = {
    "london-school-of-economics-and-political-science": {
        "website": "https://www.lse.ac.uk",
        "prospectus": "https://www.lse.ac.uk/study-at-lse/undergraduate",
        "socials": {
            "instagram": "https://www.instagram.com/lsephotos/",
            "twitter": "https://twitter.com/LSEnews",
            "youtube": "https://www.youtube.com/thelondonscho",
            "tiktok": "https://www.tiktok.com/@lse_official",
            "linkedin": "https://www.linkedin.com/school/london-school-of-economics/"
        },
        "rankings": {"complete": 3, "guardian": 2, "times": 3, "qsWorld": 45, "theWorld": 27, "russellGroup": True, "year": "2025"},
        "reputation": "LSE is the world's leading social science university and the global benchmark for finance and economics education. Its Department of Finance and Department of Economics consistently rank in the top 5 worldwide. LSE graduates are disproportionately represented in the upper echelons of global banking, central banking, hedge funds and asset management — more than any other UK institution. The LSE name alone opens doors in New York, Hong Kong, Singapore and Frankfurt that no other UK university can match.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£22,430/year", "livingCostEstimate": "£17,000–£25,000/year (central London)"},
        "funding": {
            "scholarships": ["LSE Financial Support Award (up to £7,000/year for UK students from low-income households)", "LSE Undergraduate Bursary (up to £3,000/year)", "LSE MBA Scholarships (postgraduate)", "Chevening and Commonwealth scholarships accepted"],
            "bursaries": "LSE Financial Support Award automatically assessed from UCAS — UK students from households under £42,620 receive support on sliding scale.",
            "paymentPlan": "Fees paid in two termly instalments via the student portal."
        },
        "employability": {"graduateEmploymentRate": "97%", "medianSalary": "£47,000 (15 months after graduation — highest of any UK university)", "topEmployers": ["Goldman Sachs", "JP Morgan", "Morgan Stanley", "BlackRock", "McKinsey & Company", "Bank of England", "HM Treasury"], "careersService": "LSE Careers is one of the most elite university careers services in the world, with direct pipelines into bulge-bracket investment banks, top consulting firms and central banks. Employer presentations run daily throughout term.", "placementYearAvailable": False},
        "research": {
            "refRating": "GPA 3.52/4.0 — Economics and Finance, #1 in UK (REF 2021)",
            "strengthAreas": ["Financial economics and asset pricing", "Macroeconomics and monetary policy", "Econometrics and quantitative methods", "Behavioural finance and economics", "International finance and exchange rates"],
            "notableFacilities": ["Systemic Risk Centre", "Financial Markets Group", "LSE-IF Wealth Management Institute", "Paul Woolley Centre for the Study of Capital Market Dysfunctionality", "Centre for Economic Performance (CEP)"],
            "industryPartners": ["Bank of England", "HM Treasury", "Goldman Sachs", "BlackRock", "IMF/World Bank"]
        },
        "facilities": {
            "libraries": ["LSE Library — one of the world's leading social science libraries with 5M+ items", "Shaw Library — reading room in the historic Shaw building", "Digital access to all major finance databases (Bloomberg, Refinitiv, WRDS)"],
            "sportsFacilities": "LSE Bankside — sports hall, gym and fitness classes. Access to University of London athletics facilities. 60+ sports clubs.",
            "studySpaces": "Library open 24/7 during exams; 1,500+ study spaces; finance lab with Bloomberg and Refinitiv terminals.",
            "labs": "Finance Computing Lab — Bloomberg Professional terminals, Refinitiv Eikon, WRDS. Python, R and MATLAB available on all workstations.",
            "wellbeing": "LSE Student Wellbeing provides counselling, mental health support and disability services. Togetherall (24/7). LSE SU peer support."
        },
        "satisfaction": {"nssOverall": 76, "teachingQuality": 80, "academicSupport": 75, "learningResources": 88},
        "travelFromLondon": {"trainTime": "On campus — Holborn/Aldwych, central London WC2", "trainFromStation": "Holborn (Central/Piccadilly lines), Temple (Circle/District), Chancery Lane (Central)", "trainToStation": "Holborn Underground — direct from all London termini", "coachTime": "N/A — central London", "drivingTime": "N/A — central London", "distanceMiles": "Located in London WC2", "nearestAirport": "City Airport (30 min via DLR); Heathrow (45 min via Underground)"},
        "accessibility": {"disabilityService": "LSE Disability and Wellbeing Service provides support plans and exam adjustments. Self-refer via the online portal.", "accessibleAccommodation": "Several LSE halls have accessible rooms. Accessibility requirements flagged at accommodation application.", "mentalHealthSupport": "Counselling service, mental health advisers, Togetherall (24/7), and LSE SU peer support.", "dyslexiaSupport": "SpLD assessment, study skills tuition, assistive technology and exam adjustments.", "campusAccessibility": "LSE's central London campus is largely accessible. Most buildings have lifts. AccessAble guide available."},
        "international": {"visaSupport": "LSE Student Services provides Student Visa guidance and CAS issuance. Pre-arrival webinars and immigration advisers.", "englishRequirements": "IELTS 7.0 overall (6.5 in each component) for Finance and Economics programmes.", "orientationProgramme": "LSE Welcome Week: NHS registration, London orientation, departmental induction and LSE SU International welcome events.", "internationalSocietiesCount": "100+ international and cultural societies", "popularCountries": ["United States", "China", "India", "Germany", "Canada", "Singapore", "France"]},
        "contact": {"admissionsEmail": "ug-admissions@lse.ac.uk", "admissionsPhone": "+44 (0)20 7955 7160", "address": "London School of Economics, Houghton Street, London WC2A 2AE", "openDayContact": "ug-admissions@lse.ac.uk"}
    },

    "warwick": {
        "website": "https://warwick.ac.uk",
        "prospectus": "https://warwick.ac.uk/study/undergraduate/",
        "socials": {
            "instagram": "https://www.instagram.com/uniofwarwick/",
            "twitter": "https://twitter.com/uniofwarwick",
            "youtube": "https://www.youtube.com/@uniofwarwick",
            "tiktok": "https://www.tiktok.com/@uniofwarwick",
            "linkedin": "https://www.linkedin.com/school/uniofwarwick/"
        },
        "rankings": {"complete": 7, "guardian": 6, "times": 7, "qsWorld": 85, "theWorld": 140, "russellGroup": True, "year": "2025"},
        "reputation": "Warwick Business School (WBS) is the UK's highest-ranked business school outside London and one of the top 20 globally (FT ranking). Its Finance Group is internationally regarded for research in asset pricing, corporate finance and financial econometrics. WBS is triple-accredited (AACSB, AMBA, EQUIS) and its undergraduate finance degrees are among the most competitive in the UK — attracting students who go on to careers at bulge-bracket banks, top consulting firms and leading asset managers.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£25,900–£28,700/year", "livingCostEstimate": "£10,500–£14,000/year (Coventry — affordable for a top-10 university city)"},
        "funding": {
            "scholarships": ["Warwick Undergraduate Global Excellence Scholarship (25% fee reduction for exceptional international students)", "Chancellor's International Scholarship (full fee waiver — highly competitive)", "Warwick Bursary (up to £4,000/year for eligible UK students)", "WBS Foundation Award (merit-based)"],
            "bursaries": "Warwick Bursary automatically assessed from UCAS for UK students from households under £42,620.",
            "paymentPlan": "Fees paid in three termly instalments."
        },
        "employability": {"graduateEmploymentRate": "95%", "medianSalary": "£38,000 (15 months after graduation)", "topEmployers": ["Goldman Sachs", "JP Morgan", "HSBC", "Deloitte", "PwC", "McKinsey & Company", "Bank of England"], "careersService": "WBS Careers is one of the most employer-connected business school careers services in the UK, with direct pipelines to City banks, Big 4 and consulting firms. WBS alumni network of 60,000+ globally.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 3.31/4.0 — Business and Management (REF 2021)",
            "strengthAreas": ["Asset pricing and financial markets", "Corporate finance and governance", "Financial econometrics and quantitative methods", "Behavioural finance", "International financial markets"],
            "notableFacilities": ["WBS Finance Group research labs", "Bloomberg and Refinitiv terminal suite", "Gillmore Centre for Financial Technology (FinTech research)", "CAGE (Centre for Competitive Advantage in the Global Economy)", "The Reinvention Centre for Undergraduate Research"],
            "industryPartners": ["Goldman Sachs", "JP Morgan", "HSBC", "PwC", "Deloitte"]
        },
        "facilities": {
            "libraries": ["Warwick Library open 24/7 during exams", "WBS dedicated study and research spaces", "Bloomberg terminal access for finance students"],
            "sportsFacilities": "Sports and Wellness Hub — 50m pool, gym, climbing wall, courts. 65+ sports clubs.",
            "studySpaces": "3,000+ study spaces; WBS dedicated student hub; Bloomberg lab.",
            "labs": "WBS Finance Computing Lab — Bloomberg Professional, Refinitiv Eikon, WRDS, Python/R/MATLAB.",
            "wellbeing": "Wellbeing Support Services — counselling, mental health practitioners, Togetherall (24/7)."
        },
        "satisfaction": {"nssOverall": 84, "teachingQuality": 88, "academicSupport": 84, "learningResources": 89},
        "travelFromLondon": {"trainTime": "1h 00m (Euston to Coventry, then bus to campus)", "trainFromStation": "London Euston", "trainToStation": "Coventry (then U1/U2 bus)", "coachTime": "2h 15m", "drivingTime": "1h 30m (M40)", "distanceMiles": "95 miles north-west of London", "nearestAirport": "Birmingham Airport (20 min by car)"},
        "accessibility": {"disabilityService": "Disability Services provides support plans and exam adjustments. Self-refer online.", "accessibleAccommodation": "Accessible rooms across campus residences.", "mentalHealthSupport": "Counselling, Togetherall (24/7), Nightline peer listening.", "dyslexiaSupport": "SpLD assessment, study skills tuition and exam adjustments.", "campusAccessibility": "Purpose-built campus largely step-free. AccessAble guide available."},
        "international": {"visaSupport": "International Student Experience team — Student Visa guidance and CAS issuance.", "englishRequirements": "IELTS 6.5 overall (6.0 in each component).", "orientationProgramme": "International Welcome Week before term. Buddy scheme.", "internationalSocietiesCount": "60+ international and cultural societies", "popularCountries": ["China", "India", "United States", "Germany", "Singapore", "Malaysia", "Greece"]},
        "contact": {"admissionsEmail": "ugadmissions@warwick.ac.uk", "admissionsPhone": "+44 (0)24 7652 3723", "address": "University of Warwick, Coventry CV4 7AL", "openDayContact": "opendays@warwick.ac.uk"}
    },

    "durham": {
        "website": "https://www.durham.ac.uk",
        "prospectus": "https://www.durham.ac.uk/study/undergraduate/",
        "socials": {
            "instagram": "https://www.instagram.com/durhamuniversity/",
            "twitter": "https://twitter.com/durham_uni",
            "youtube": "https://www.youtube.com/user/durhamuniversity",
            "linkedin": "https://www.linkedin.com/school/durham-university/"
        },
        "rankings": {"complete": 4, "guardian": 4, "times": 4, "qsWorld": 90, "theWorld": 174, "russellGroup": True, "year": "2025"},
        "reputation": "Durham University Business School is one of the UK's most prestigious, triple-accredited (AACSB, AMBA, EQUIS) and consistently ranked in the top 5 for business and finance. The Economics and Finance department has a strong reputation for producing graduates who go into investment banking, asset management and the Bank of England. Durham's collegiate system creates an exceptionally strong alumni network — disproportionately represented in London's financial sector.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£24,000–£27,500/year", "livingCostEstimate": "£10,500–£13,500/year (Durham is one of the UK's most affordable university cities)"},
        "funding": {
            "scholarships": ["Durham Excellence Scholarship (£2,000/year for A*A*A+ entry)", "International Excellence Scholarship (£3,000 fee reduction)", "Durham Access Bursary (up to £2,000/year for eligible UK students)", "Sports Scholarship"],
            "bursaries": "Durham Access Bursary automatically assessed from UCAS.",
            "paymentPlan": "Fees paid in three termly instalments."
        },
        "employability": {"graduateEmploymentRate": "95%", "medianSalary": "£36,000 (15 months after graduation)", "topEmployers": ["Goldman Sachs", "JP Morgan", "HSBC", "Barclays", "Deloitte", "PwC", "Bank of England"], "careersService": "Durham Careers and Enterprise Service with direct City of London employer pipelines. The collegiate alumni network is a major asset for finance careers.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 3.14/4.0 — Business and Management (REF 2021)",
            "strengthAreas": ["Corporate finance and governance", "Financial markets and trading", "Accounting and auditing", "Risk management and insurance", "Behavioural economics"],
            "notableFacilities": ["Durham University Business School trading floor", "Bloomberg terminal suite", "Durham Centre for Academic Development", "Northern Institute for Cancer Research (finance-health intersection)", "Mill Hill Lane research hub"],
            "industryPartners": ["Goldman Sachs", "Barclays", "KPMG", "PwC", "Bank of England"]
        },
        "facilities": {
            "libraries": ["Bill Bryson Library — 24/7 during exams", "Business School library and study hub", "College libraries for late-night study"],
            "sportsFacilities": "Maiden Castle Sport and Wellness Hub — 50m pool, gym, climbing wall. 70+ sports clubs.",
            "studySpaces": "2,000+ study spaces; Business School dedicated hub; Bloomberg lab.",
            "labs": "Business School Finance Lab — Bloomberg Professional, Refinitiv, WRDS.",
            "wellbeing": "Student Wellbeing team — counselling, mental health, Togetherall (24/7), Nightline."
        },
        "satisfaction": {"nssOverall": 87, "teachingQuality": 90, "academicSupport": 88, "learningResources": 89},
        "travelFromLondon": {"trainTime": "2h 40m (fastest LNER service)", "trainFromStation": "London King's Cross", "trainToStation": "Durham", "coachTime": "5h 30m", "drivingTime": "4h 30m (A1(M))", "distanceMiles": "258 miles north of London", "nearestAirport": "Newcastle International Airport (30 min by car)"},
        "accessibility": {"disabilityService": "Durham Disability Support Service — support plans and exam adjustments.", "accessibleAccommodation": "Accessible rooms in several colleges.", "mentalHealthSupport": "Counselling, Togetherall (24/7), Nightline peer listening.", "dyslexiaSupport": "SpLD assessment, study skills tuition and exam adjustments.", "campusAccessibility": "Historic campus varies in accessibility; science site more modern. AccessAble guide available."},
        "international": {"visaSupport": "Durham International Student Experience team — CAS and visa guidance.", "englishRequirements": "IELTS 6.5 overall (6.0 in each component).", "orientationProgramme": "International Welcome Week, collegiate events and buddy scheme.", "internationalSocietiesCount": "40+ international and cultural societies", "popularCountries": ["China", "United States", "Germany", "India", "Malaysia", "Canada", "South Korea"]},
        "contact": {"admissionsEmail": "admissions@durham.ac.uk", "admissionsPhone": "+44 (0)191 334 2000", "address": "Durham University, The Palatine Centre, Stockton Road, Durham DH1 3LE", "openDayContact": "opendays@durham.ac.uk"}
    },

    "edinburgh": {
        "website": "https://www.ed.ac.uk",
        "prospectus": "https://www.ed.ac.uk/studying/undergraduate/",
        "socials": {
            "instagram": "https://www.instagram.com/edinburghuniversity/",
            "twitter": "https://twitter.com/EdinburghUni",
            "youtube": "https://www.youtube.com/user/EdinburghUniversity",
            "tiktok": "https://www.tiktok.com/@edinburghuniversity",
            "linkedin": "https://www.linkedin.com/school/university-of-edinburgh/"
        },
        "rankings": {"complete": 5, "guardian": 6, "times": 6, "qsWorld": 22, "theWorld": 30, "russellGroup": True, "year": "2025"},
        "reputation": "Edinburgh's Business School is one of the most globally respected in the UK, holding triple accreditation (AACSB, AMBA, EQUIS). Its Finance and Economics departments have world-class research standing and the university's global top 30 reputation opens doors in financial centres from London to New York to Singapore. Edinburgh's Scottish 4-year Honours structure gives students an additional year of breadth, and Edinburgh itself is home to a thriving FinTech scene and major financial services employers.",
        "fees": {"homeUndergrad": "£9,535/year (RUK students; Scottish students may qualify for SAAS funding)", "internationalUndergrad": "£29,900–£33,200/year", "livingCostEstimate": "£13,500–£18,000/year"},
        "funding": {
            "scholarships": ["Edinburgh Global Research Scholarships", "Saltire Scholarships (Scottish Government)", "Edinburgh Award Bursary (widening access)", "Edinburgh Business School scholarships"],
            "bursaries": "Edinburgh Access Bursary for UK widening access students. SAAS funds tuition for eligible Scottish students.",
            "paymentPlan": "Fees paid in two semester instalments."
        },
        "employability": {"graduateEmploymentRate": "93%", "medianSalary": "£34,000 (15 months after graduation)", "topEmployers": ["Standard Life Aberdeen", "Royal Bank of Scotland", "Baillie Gifford", "Goldman Sachs", "JP Morgan", "Scottish Widows", "Deloitte"], "careersService": "Edinburgh Careers Service with dedicated finance and professional services stream. Edinburgh's financial services sector is the UK's second largest after London.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 3.28/4.0 — Business and Management (REF 2021)",
            "strengthAreas": ["Financial economics and asset pricing", "Corporate governance and accountability", "FinTech and digital finance", "Risk and actuarial science", "International financial markets"],
            "notableFacilities": ["Business School trading simulation suite", "Bloomberg terminal suite", "Edinburgh FinTech cluster links (CharterHouse)", "Centre for Financial Markets Research", "Bayes Centre (data and AI interface with finance)"],
            "industryPartners": ["Standard Life Aberdeen", "Baillie Gifford", "Royal Bank of Scotland", "Scottish Widows", "Deloitte"]
        },
        "facilities": {
            "libraries": ["Main Library open 24/7 during exams — 2.5M+ items", "Business School library and study hub", "Digital finance databases (Bloomberg, Refinitiv, WRDS)"],
            "sportsFacilities": "Pleasance Sports Complex, Peffermill Playing Fields. 50+ sports clubs.",
            "studySpaces": "3,000+ study spaces; Business School hub; Bloomberg lab.",
            "labs": "Finance Computing Lab — Bloomberg Professional, Refinitiv, WRDS, Python/R.",
            "wellbeing": "Student Counselling Service, mental health advisers, Togetherall (24/7), Nightline."
        },
        "satisfaction": {"nssOverall": 82, "teachingQuality": 85, "academicSupport": 81, "learningResources": 87},
        "travelFromLondon": {"trainTime": "4h 20m (fastest LNER)", "trainFromStation": "London King's Cross", "trainToStation": "Edinburgh Waverley", "coachTime": "9h 00m", "drivingTime": "7h 00m (A1)", "distanceMiles": "401 miles north of London", "nearestAirport": "Edinburgh Airport (30 min by tram; direct London flights from £30)"},
        "accessibility": {"disabilityService": "Disability and Learning Support Service — support plans and adjustments.", "accessibleAccommodation": "Accessible rooms in several halls including Pollock Halls.", "mentalHealthSupport": "Counselling service, Togetherall (24/7), Nightline.", "dyslexiaSupport": "SpLD assessment, study skills tuition and exam adjustments.", "campusAccessibility": "Multiple campuses — science site and Business School largely accessible. AccessAble guide available."},
        "international": {"visaSupport": "International Student Advisory Service — CAS and visa guidance.", "englishRequirements": "IELTS 7.0 overall (6.5 in each component) for Finance programmes.", "orientationProgramme": "International Welcome Week, EUSA International events and buddy scheme.", "internationalSocietiesCount": "60+ international and cultural societies", "popularCountries": ["China", "United States", "India", "Germany", "Canada", "Malaysia", "Hong Kong"]},
        "contact": {"admissionsEmail": "admissions@ed.ac.uk", "admissionsPhone": "+44 (0)131 650 4360", "address": "University of Edinburgh, Old College, South Bridge, Edinburgh EH8 9YL", "openDayContact": "opendays@ed.ac.uk"}
    },

    "bath": {
        "website": "https://www.bath.ac.uk",
        "prospectus": "https://www.bath.ac.uk/topics/undergraduate-study/",
        "socials": {
            "instagram": "https://www.instagram.com/uniofbath/",
            "twitter": "https://twitter.com/UniofBath",
            "youtube": "https://www.youtube.com/c/uniofbath",
            "tiktok": "https://www.tiktok.com/@uniofbath",
            "linkedin": "https://www.linkedin.com/school/university-of-bath/"
        },
        "rankings": {"complete": 9, "guardian": 8, "times": 9, "qsWorld": 175, "theWorld": 251, "russellGroup": False, "year": "2025"},
        "reputation": "Bath School of Management is one of the UK's elite business schools, triple-accredited and consistently top 10. Its Finance and Accounting programmes are particularly renowned — Bath's mandatory placement year (Semester 5) distinguishes it from peers, with placement employers including Goldman Sachs, JP Morgan and KPMG. Bath Finance graduates have consistently high starting salaries driven by a year of real industry experience.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£22,800–£26,500/year", "livingCostEstimate": "£12,000–£16,000/year"},
        "funding": {
            "scholarships": ["Bath University Scholarship (£2,000/year for AAA+)", "Global Excellence Scholarship", "Bath Bursary (means-tested)", "Sports Performance Scholarship"],
            "bursaries": "Bath Support Fund for UK students in hardship. Enhanced support for care-experienced students.",
            "paymentPlan": "Fees paid in three termly instalments."
        },
        "employability": {"graduateEmploymentRate": "97%", "medianSalary": "£36,000 (15 months — significantly boosted by mandatory placement year)", "topEmployers": ["Goldman Sachs", "JP Morgan", "KPMG", "PwC", "Deloitte", "HSBC", "Lloyds Banking Group"], "careersService": "Bath School of Management Careers — dedicated placement team places students in top finance firms. Placement year routinely converts to graduate offers.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 3.17/4.0 — Business and Management (REF 2021)",
            "strengthAreas": ["Corporate finance and investment", "Accounting and auditing", "Quantitative finance and risk", "Financial markets and microstructure", "Sustainable finance and ESG"],
            "notableFacilities": ["School of Management Finance Lab — Bloomberg terminals", "Centre for Business, Organisations and Society", "Trading simulation suite", "EPSRC Centre for Doctoral Training in Statistical Applied Mathematics"],
            "industryPartners": ["Goldman Sachs", "KPMG", "Lloyds Banking Group", "Nationwide Building Society", "Rolls-Royce Financial"]
        },
        "facilities": {
            "libraries": ["University Library open 24/7 — 500,000+ items", "School of Management dedicated study hub", "Bloomberg terminal access"],
            "sportsFacilities": "Sports Training Village (Olympic legacy) — 50m pool, athletics track, gym. One of the finest UK university sport facilities.",
            "studySpaces": "1,800+ study spaces; Management School hub; Bloomberg lab.",
            "labs": "Finance Computing Lab — Bloomberg Professional, Refinitiv, WRDS, Python/R.",
            "wellbeing": "Student Wellbeing — counselling, mental health practitioners, Togetherall (24/7)."
        },
        "satisfaction": {"nssOverall": 89, "teachingQuality": 92, "academicSupport": 89, "learningResources": 91},
        "travelFromLondon": {"trainTime": "1h 25m (Paddington to Bath Spa)", "trainFromStation": "London Paddington", "trainToStation": "Bath Spa", "coachTime": "2h 30m", "drivingTime": "1h 45m (M4)", "distanceMiles": "107 miles west of London", "nearestAirport": "Bristol Airport (30 min)"},
        "accessibility": {"disabilityService": "Disability Service — support plans and exam adjustments.", "accessibleAccommodation": "Accessible en-suite rooms in several halls.", "mentalHealthSupport": "Counselling, Togetherall (24/7), SU peer support.", "dyslexiaSupport": "SpLD assessment, study skills tuition, assistive technology and exam adjustments.", "campusAccessibility": "Hillside campus — main buildings accessible. Accessibility map available."},
        "international": {"visaSupport": "International Student Advisory Service — CAS and visa guidance.", "englishRequirements": "IELTS 6.5 overall (6.0 in each component).", "orientationProgramme": "International Welcome Week and SU International buddy scheme.", "internationalSocietiesCount": "45+ international and cultural societies", "popularCountries": ["China", "United States", "India", "Germany", "Hong Kong", "Malaysia", "France"]},
        "contact": {"admissionsEmail": "admissions@bath.ac.uk", "admissionsPhone": "+44 (0)1225 383019", "address": "University of Bath, Claverton Down, Bath BA2 7AY", "openDayContact": "opendays@bath.ac.uk"}
    },

    "exeter": {
        "website": "https://www.exeter.ac.uk",
        "prospectus": "https://www.exeter.ac.uk/study/undergraduate/prospectus/",
        "socials": {
            "instagram": "https://www.instagram.com/uniofexeter/",
            "twitter": "https://twitter.com/UniofExeter",
            "youtube": "https://www.youtube.com/user/universityofexeter",
            "tiktok": "https://www.tiktok.com/@uniofexeter",
            "linkedin": "https://www.linkedin.com/school/university-of-exeter/"
        },
        "rankings": {"complete": 10, "guardian": 12, "times": 11, "qsWorld": 178, "theWorld": 211, "russellGroup": True, "year": "2025"},
        "reputation": "Exeter Business School is triple-accredited (AACSB, AMBA, EQUIS) and consistently ranked in the UK top 15. Its Finance and Economics groups have strong research reputations, particularly in sustainable finance and ESG investing, which aligns with the university's strengths in climate science. Exeter finance graduates are particularly well-represented in financial services in the South West and in the City of London.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£22,900–£27,300/year", "livingCostEstimate": "£11,500–£15,000/year"},
        "funding": {
            "scholarships": ["Exeter Excellence Scholarship (£2,000/year)", "Global Excellence Scholarship", "Exeter Bursary (up to £2,000/year for UK households under £25,000)", "Sports Scholarship"],
            "bursaries": "Exeter Bursary automatically assessed from UCAS.",
            "paymentPlan": "Fees paid in three termly instalments."
        },
        "employability": {"graduateEmploymentRate": "93%", "medianSalary": "£31,000 (15 months after graduation)", "topEmployers": ["PwC", "Deloitte", "KPMG", "Lloyds Banking Group", "Barclays", "NHS", "Environment Agency"], "careersService": "Exeter Careers Zone with dedicated Business School placement support and employer fairs.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 3.12/4.0 — Business and Management (REF 2021)",
            "strengthAreas": ["Sustainable finance and ESG", "Corporate finance and governance", "Behavioural economics", "Financial markets and trading", "Accounting and accountability"],
            "notableFacilities": ["Exeter Business School Finance Lab — Bloomberg terminals", "Centre for Finance and Investment", "Global Systems Institute (ESG-finance research)", "Xfi Centre for Finance and Investment"],
            "industryPartners": ["PwC", "Deloitte", "Lloyds Banking Group", "Environment Agency", "Devon and Cornwall financial services cluster"]
        },
        "facilities": {
            "libraries": ["Forum Library open 24/7 — 700+ study spaces", "Business School hub and Bloomberg lab"],
            "sportsFacilities": "Sport Exeter — 50m pool, gym, climbing wall.",
            "studySpaces": "3,500+ study spaces; Business School dedicated hub.",
            "labs": "Finance Lab — Bloomberg Professional, Refinitiv, Python/R.",
            "wellbeing": "Wellbeing Services — counselling, 24/7 support line, Togetherall."
        },
        "satisfaction": {"nssOverall": 85, "teachingQuality": 88, "academicSupport": 84, "learningResources": 87},
        "travelFromLondon": {"trainTime": "2h 05m (Paddington to Exeter St Davids)", "trainFromStation": "London Paddington", "trainToStation": "Exeter St Davids", "coachTime": "3h 30m", "drivingTime": "2h 30m (M3/A303)", "distanceMiles": "172 miles south-west of London", "nearestAirport": "Exeter Airport (15 min from campus)"},
        "accessibility": {"disabilityService": "Wellbeing and Accessibility team — support plans and adjustments.", "accessibleAccommodation": "Accessible rooms in all first-year halls.", "mentalHealthSupport": "24/7 Student Support Line, counselling, Togetherall.", "dyslexiaSupport": "SpLD assessment, study skills tuition and exam adjustments.", "campusAccessibility": "Streatham Park campus largely step-free. Buggy service for mobility-impaired students."},
        "international": {"visaSupport": "International Student Support — CAS and visa guidance.", "englishRequirements": "IELTS 6.5 overall (6.0 in each component).", "orientationProgramme": "International Welcome Week. Buddy scheme.", "internationalSocietiesCount": "50+ international and cultural societies", "popularCountries": ["China", "United States", "Germany", "Malaysia", "India", "Nigeria", "Canada"]},
        "contact": {"admissionsEmail": "admissions@exeter.ac.uk", "admissionsPhone": "+44 (0)1392 723044", "address": "University of Exeter, Northcote House, The Queen's Drive, Exeter EX4 4QJ", "openDayContact": "opendays@exeter.ac.uk"}
    },

    "lancaster": {
        "website": "https://www.lancaster.ac.uk",
        "prospectus": "https://www.lancaster.ac.uk/study/undergraduate/",
        "socials": {
            "instagram": "https://www.instagram.com/lancsuni/",
            "twitter": "https://twitter.com/LancasterUni",
            "youtube": "https://www.youtube.com/user/lancsuni",
            "tiktok": "https://www.tiktok.com/@lancsuni",
            "linkedin": "https://www.linkedin.com/school/lancaster-university/"
        },
        "rankings": {"complete": 8, "guardian": 7, "times": 8, "qsWorld": 140, "theWorld": 174, "russellGroup": False, "year": "2025"},
        "reputation": "Lancaster University Management School (LUMS) is consistently ranked in the UK's top 5 for accounting and finance, and is triple-accredited (AACSB, AMBA, EQUIS). It is particularly renowned for its accounting education — LUMS graduates have the highest pass rates on professional accounting exams (ACCA, ICAEW, CIMA) of any UK university. Its Finance Group has strong research in financial economics, corporate governance and quantitative finance, and the school is ranked in the global FT top 50.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£20,275–£24,225/year", "livingCostEstimate": "£10,000–£13,500/year (Lancaster is affordable for a top-10 university)"},
        "funding": {
            "scholarships": ["Lancaster University Scholarship (£2,000 for AAA+ entry)", "LUMS Dean's Scholarship (merit-based for high-achieving students)", "International Excellence Award (fee reduction)", "Lancaster Bursary (means-tested for UK students)"],
            "bursaries": "Lancaster Bursary automatically assessed from UCAS.",
            "paymentPlan": "Fees paid in three termly instalments."
        },
        "employability": {"graduateEmploymentRate": "94%", "medianSalary": "£33,000 (15 months after graduation)", "topEmployers": ["PwC", "KPMG", "Deloitte", "Ernst & Young", "Barclays", "HSBC", "Grant Thornton"], "careersService": "LUMS Careers — specialist finance and accounting career support. Highest Big 4 accounting firm placement rates of any UK university outside London.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 3.22/4.0 — Business and Management (REF 2021)",
            "strengthAreas": ["Accounting and auditing", "Corporate finance and governance", "Quantitative finance and risk", "Financial markets and regulation", "Management accounting and control"],
            "notableFacilities": ["LUMS Finance Lab — Bloomberg and Refinitiv terminals", "Centre for Financial Econometrics, Asset Markets and Macroeconomic Policy", "LUMS Simulation Suite", "Institute for Entrepreneurship and Enterprise Development", "Work Foundation (economic policy research)"],
            "industryPartners": ["PwC", "KPMG", "Deloitte", "EY", "Barclays"]
        },
        "facilities": {
            "libraries": ["University Library open 24/7 during exams", "LUMS dedicated student hub and Bloomberg lab"],
            "sportsFacilities": "Sports Centre and outdoor facilities. 60+ sports clubs. Collegiate system with sports teams.",
            "studySpaces": "2,500+ study spaces; LUMS dedicated hub; Bloomberg terminals.",
            "labs": "Finance Computing Lab — Bloomberg Professional, Refinitiv Eikon, WRDS, R/Python.",
            "wellbeing": "Counselling service, mental health practitioners, Togetherall (24/7), college welfare officers."
        },
        "satisfaction": {"nssOverall": 86, "teachingQuality": 89, "academicSupport": 86, "learningResources": 88},
        "travelFromLondon": {"trainTime": "2h 10m (fastest Avanti West Coast)", "trainFromStation": "London Euston", "trainToStation": "Lancaster", "coachTime": "4h 00m", "drivingTime": "3h 15m (M6)", "distanceMiles": "238 miles north-west of London", "nearestAirport": "Manchester Airport (1h by car or train)"},
        "accessibility": {"disabilityService": "Disability Service — support plans and exam adjustments.", "accessibleAccommodation": "Accessible rooms in several colleges.", "mentalHealthSupport": "Counselling, Togetherall (24/7), college welfare officers.", "dyslexiaSupport": "SpLD assessment, study skills tuition and exam adjustments.", "campusAccessibility": "Purpose-built campus largely step-free. AccessAble guide available."},
        "international": {"visaSupport": "International Student Support — CAS and visa guidance.", "englishRequirements": "IELTS 6.5 overall (6.0 in each component).", "orientationProgramme": "International Welcome Week, college events and buddy scheme.", "internationalSocietiesCount": "45+ international and cultural societies", "popularCountries": ["China", "India", "United States", "Malaysia", "Nigeria", "Germany", "Pakistan"]},
        "contact": {"admissionsEmail": "ugadmissions@lancaster.ac.uk", "admissionsPhone": "+44 (0)1524 65201", "address": "Lancaster University, Bailrigg, Lancaster LA1 4YW", "openDayContact": "opendays@lancaster.ac.uk"}
    },

    "loughborough": {
        "website": "https://www.lboro.ac.uk",
        "prospectus": "https://www.lboro.ac.uk/study/undergraduate/",
        "socials": {
            "instagram": "https://www.instagram.com/lborouniversity/",
            "twitter": "https://twitter.com/lborouniversity",
            "youtube": "https://www.youtube.com/lborouniversity",
            "tiktok": "https://www.tiktok.com/@lborouniversity",
            "linkedin": "https://www.linkedin.com/school/loughborough-university/"
        },
        "rankings": {"complete": 6, "guardian": 5, "times": 6, "qsWorld": 220, "theWorld": 251, "russellGroup": False, "year": "2025"},
        "reputation": "Loughborough University School of Business and Economics is triple-accredited (AACSB, AMBA, EQUIS) and consistently among the UK's top 10 business schools. Its Finance group has particular strength in financial econometrics and investment management. Loughborough is distinctive for its placement culture — virtually all business degrees include a placement year — and its sports science and engineering reputation creates a uniquely employable graduate with analytical and teamwork skills prized by finance employers.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£21,000–£24,500/year", "livingCostEstimate": "£10,000–£13,500/year (Loughborough is excellent value)"},
        "funding": {
            "scholarships": ["Loughborough Scholarship (£2,000 for AAA+ entry)", "International Scholarship (fee reduction)", "Loughborough Bursary (means-tested)", "Sports Scholarship (elite athletes)"],
            "bursaries": "Loughborough Bursary automatically assessed from UCAS.",
            "paymentPlan": "Fees paid in three termly instalments."
        },
        "employability": {"graduateEmploymentRate": "95%", "medianSalary": "£32,000 (15 months — boosted by placement year)", "topEmployers": ["KPMG", "PwC", "Deloitte", "EY", "Barclays", "HSBC", "Santander"], "careersService": "Loughborough Careers and Employability Centre with dedicated Business School placement team. Consistently among UK's top universities for graduate employment.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 3.08/4.0 — Business and Management (REF 2021)",
            "strengthAreas": ["Financial econometrics and quantitative methods", "Investment management and portfolio theory", "Corporate finance and M&A", "Accounting and financial reporting", "Sports finance and economics"],
            "notableFacilities": ["School of Business Finance Lab — Bloomberg terminals", "Loughborough Institute for Consumer Research", "Institute for Innovation and Entrepreneurship", "Loughborough University London (postgraduate finance hub)"],
            "industryPartners": ["KPMG", "PwC", "Santander", "Barclays", "Leicester City FC (sports finance)"]
        },
        "facilities": {
            "libraries": ["Pilkington Library open 24/7 during exams", "Business School dedicated study hub and Bloomberg lab"],
            "sportsFacilities": "Loughborough is the UK's #1 university for sport — Olympic-standard facilities, national training base for multiple sports.",
            "studySpaces": "2,000+ study spaces; Business School hub; Bloomberg lab.",
            "labs": "Finance Lab — Bloomberg Professional, Refinitiv, R/Python.",
            "wellbeing": "Student Services — counselling, mental health, Togetherall (24/7)."
        },
        "satisfaction": {"nssOverall": 87, "teachingQuality": 90, "academicSupport": 87, "learningResources": 89},
        "travelFromLondon": {"trainTime": "1h 15m (to Leicester, then bus/taxi to campus)", "trainFromStation": "London St Pancras International", "trainToStation": "Leicester (then bus 7 to Loughborough)", "coachTime": "2h 30m", "drivingTime": "2h 00m (M1)", "distanceMiles": "107 miles north of London", "nearestAirport": "East Midlands Airport (15 min by taxi — directly adjacent to campus area)"},
        "accessibility": {"disabilityService": "Disability Support — support plans and exam adjustments.", "accessibleAccommodation": "Accessible rooms in several halls.", "mentalHealthSupport": "Counselling, mental health advisers, Togetherall (24/7).", "dyslexiaSupport": "SpLD assessment, study skills tuition and exam adjustments.", "campusAccessibility": "Purpose-built campus largely step-free. AccessAble guide available."},
        "international": {"visaSupport": "International Student Support — CAS and visa guidance.", "englishRequirements": "IELTS 6.5 overall (6.0 in each component).", "orientationProgramme": "International Welcome Week and buddy scheme.", "internationalSocietiesCount": "40+ international and cultural societies", "popularCountries": ["China", "India", "Malaysia", "United States", "Nigeria", "Pakistan", "Germany"]},
        "contact": {"admissionsEmail": "admissions@lboro.ac.uk", "admissionsPhone": "+44 (0)1509 222522", "address": "Loughborough University, Epinal Way, Loughborough LE11 3TU", "openDayContact": "opendays@lboro.ac.uk"}
    },

    "manchester": {
        "website": "https://www.manchester.ac.uk",
        "prospectus": "https://www.manchester.ac.uk/study/undergraduate/",
        "socials": {
            "instagram": "https://www.instagram.com/officialuom/",
            "twitter": "https://twitter.com/officialuom",
            "youtube": "https://www.youtube.com/@officialuom",
            "tiktok": "https://www.tiktok.com/@officialuom",
            "linkedin": "https://www.linkedin.com/school/university-of-manchester/"
        },
        "rankings": {"complete": 16, "guardian": 14, "times": 15, "qsWorld": 32, "theWorld": 58, "russellGroup": True, "year": "2025"},
        "reputation": "Manchester's Alliance Manchester Business School (AMBS) is one of the largest and most internationally connected business schools in the UK, holding triple accreditation. Its Finance group has world-class research in financial markets, corporate finance and financial econometrics. Manchester's QS top 35 global ranking, 25 Nobel laureates, and position in the heart of the North's largest financial services cluster make it a top choice for ambitious finance students.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£27,000–£32,500/year", "livingCostEstimate": "£12,000–£16,000/year"},
        "funding": {
            "scholarships": ["Manchester Excellence Scholarship (up to £2,000/year)", "Global Futures Scholarship (fee reduction)", "Manchester Bursary (up to £2,000/year)", "Sports Excellence Scholarship"],
            "bursaries": "Manchester Bursary automatically assessed from UCAS.",
            "paymentPlan": "Fees paid in three termly instalments."
        },
        "employability": {"graduateEmploymentRate": "93%", "medianSalary": "£34,000 (15 months after graduation)", "topEmployers": ["Goldman Sachs", "JP Morgan", "HSBC", "Barclays", "PwC", "Deloitte", "KPMG"], "careersService": "AMBS Careers — dedicated finance and banking career support with direct City and North West employer pipelines. Manchester Gold Mentoring Programme.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 3.21/4.0 — Business and Management (REF 2021)",
            "strengthAreas": ["Financial markets and trading", "Corporate finance and M&A", "Financial econometrics", "Managerial accounting", "International finance"],
            "notableFacilities": ["AMBS Finance Lab — Bloomberg and Refinitiv terminals", "Alliance MBS Simulation Suite", "Manchester Institute of Innovation Research", "Alan Turing Institute partnership (FinTech and AI in finance)", "Manchester Digital Economy Research Centre"],
            "industryPartners": ["Goldman Sachs", "HSBC", "Deloitte", "PwC", "Manchester City FC (sports finance)"]
        },
        "facilities": {
            "libraries": ["Alan Gilbert Learning Commons — 24/7", "John Rylands Research Institute", "AMBS dedicated finance study hub and Bloomberg lab"],
            "sportsFacilities": "Sugden and Armitage Sports Centres. 70+ sports clubs.",
            "studySpaces": "4,000+ study spaces; AMBS hub; Bloomberg lab.",
            "labs": "Finance Lab — Bloomberg Professional, Refinitiv Eikon, WRDS, Python/R.",
            "wellbeing": "Student Support and Counselling, mental health practitioners, Togetherall (24/7)."
        },
        "satisfaction": {"nssOverall": 81, "teachingQuality": 84, "academicSupport": 80, "learningResources": 87},
        "travelFromLondon": {"trainTime": "2h 10m (Euston to Manchester Piccadilly)", "trainFromStation": "London Euston", "trainToStation": "Manchester Piccadilly", "coachTime": "3h 30m", "drivingTime": "3h 00m (M6)", "distanceMiles": "200 miles north-west of London", "nearestAirport": "Manchester Airport (20 min by Metrolink tram)"},
        "accessibility": {"disabilityService": "DASS — support plans, exam adjustments and assistive technology.", "accessibleAccommodation": "Accessible rooms in several halls.", "mentalHealthSupport": "Counselling, 24/7 crisis line, Togetherall, Nightline.", "dyslexiaSupport": "SpLD assessment, study skills and exam adjustments.", "campusAccessibility": "Oxford Road campus largely step-free. AMBS building fully accessible."},
        "international": {"visaSupport": "International Development Office — CAS and visa guidance.", "englishRequirements": "IELTS 7.0 overall (6.5 in each component) for Finance programmes.", "orientationProgramme": "International Welcome Programme and AMBS International induction.", "internationalSocietiesCount": "70+ international and cultural societies", "popularCountries": ["China", "India", "United States", "Saudi Arabia", "Malaysia", "Nigeria", "Pakistan"]},
        "contact": {"admissionsEmail": "ug.admissions@manchester.ac.uk", "admissionsPhone": "+44 (0)161 306 6000", "address": "The University of Manchester, Oxford Road, Manchester M13 9PL", "openDayContact": "opendays@manchester.ac.uk"}
    },

    "bristol": {
        "website": "https://www.bristol.ac.uk",
        "prospectus": "https://www.bristol.ac.uk/study/media/undergraduate/prospectus-2026/undergraduate-prospectus-2026.pdf",
        "socials": {
            "instagram": "https://www.instagram.com/universityofbristol/",
            "twitter": "https://twitter.com/bristoluni",
            "youtube": "https://www.youtube.com/UniversityOfBristol",
            "tiktok": "https://www.tiktok.com/@officialbristoluni",
            "linkedin": "https://www.linkedin.com/school/university-of-bristol/"
        },
        "rankings": {"complete": 11, "guardian": 10, "times": 10, "qsWorld": 62, "theWorld": 97, "russellGroup": True, "year": "2025"},
        "reputation": "Bristol's School of Economics, Finance and Management is part of one of the UK's most prestigious universities, consistently ranked in the global top 100. Its Finance and Economics groups have strong research reputations, particularly in financial economics and macroeconomics. Bristol's location — with strong financial services employers in Bristol and the West of England — combined with its Russell Group prestige, makes it one of the most sought-after destinations for finance students outside London.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£26,600–£33,100/year", "livingCostEstimate": "£13,500–£18,000/year"},
        "funding": {
            "scholarships": ["Bristol Think Big Scholarship (£5,000–£20,000 for international students)", "Bristol Access Bursary (up to £3,000/year)", "Sanctuary Scholarship", "Alumni Legacy Scholarship"],
            "bursaries": "Bristol Access Bursary automatically assessed from UCAS for UK students from households under £35,000.",
            "paymentPlan": "Fees paid in three termly instalments."
        },
        "employability": {"graduateEmploymentRate": "93%", "medianSalary": "£35,000 (15 months after graduation)", "topEmployers": ["Goldman Sachs", "JP Morgan", "Lloyds Banking Group", "PwC", "Deloitte", "KPMG", "Hargreaves Lansdown"], "careersService": "Bristol Careers Service with Bristol PLUS Award and dedicated finance careers pathway. Strong City of London and Bristol financial services employer network.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 3.27/4.0 — Business and Management (REF 2021)",
            "strengthAreas": ["Financial economics and asset pricing", "Macroeconomics and monetary policy", "Corporate finance and governance", "Quantitative methods and econometrics", "Sustainable finance"],
            "notableFacilities": ["Finance Lab — Bloomberg terminals", "Centre for Market and Public Organisation (CMPO)", "The Jean Golding Institute (data science-finance interface)", "Business and Economics faculty hub"],
            "industryPartners": ["Lloyds Banking Group", "Hargreaves Lansdown", "PwC", "Deloitte", "Burges Salmon"]
        },
        "facilities": {
            "libraries": ["Biomedical and Senate House Libraries — 24/7 during exams", "Economics and Finance faculty study hub", "Bloomberg terminal access"],
            "sportsFacilities": "Sports, Exercise and Health building + Coombe Dingle Sports Complex. 70+ sports clubs.",
            "studySpaces": "2,000+ study spaces; Finance hub; Bloomberg lab.",
            "labs": "Finance Computing Lab — Bloomberg Professional, Refinitiv, R/Python/Stata.",
            "wellbeing": "Student Wellbeing Service — counselling, mental health advisers, Togetherall (24/7)."
        },
        "satisfaction": {"nssOverall": 82, "teachingQuality": 85, "academicSupport": 81, "learningResources": 87},
        "travelFromLondon": {"trainTime": "1h 40m (Paddington to Bristol Temple Meads)", "trainFromStation": "London Paddington", "trainToStation": "Bristol Temple Meads", "coachTime": "2h 30m", "drivingTime": "1h 50m (M4)", "distanceMiles": "118 miles west of London", "nearestAirport": "Bristol Airport (30 min by bus)"},
        "accessibility": {"disabilityService": "Disability Services — support plans and exam adjustments.", "accessibleAccommodation": "Accessible rooms in Wills Hall and Clifton Hill House.", "mentalHealthSupport": "Counselling (up to 12 sessions), mental health practitioners, Togetherall (24/7).", "dyslexiaSupport": "SpLD assessment, study skills tuition and exam adjustments.", "campusAccessibility": "Hilly urban campus — biomedical sciences building and central precinct step-free. AccessAble guide available."},
        "international": {"visaSupport": "International Student Advisory Service — CAS and Graduate Route advice.", "englishRequirements": "IELTS 7.0 overall (6.5 in each component) for Economics and Finance.", "orientationProgramme": "International Welcome Week and buddy scheme.", "internationalSocietiesCount": "55+ international and cultural societies", "popularCountries": ["China", "United States", "India", "Germany", "France", "Malaysia", "Hong Kong"]},
        "contact": {"admissionsEmail": "choosebristol-ug@bristol.ac.uk", "admissionsPhone": "+44 (0)117 394 1649", "address": "University of Bristol, Senate House, Tyndall Avenue, Bristol BS8 1TH", "openDayContact": "opendays@bristol.ac.uk"}
    }
}


def main():
    data = json.loads(FILE.read_text(encoding="utf-8-sig"))
    enriched = 0
    for slug, fields in NEW_DATA.items():
        if slug not in data:
            print(f"[SKIP] {slug} not found")
            continue
        if "website" in data[slug]:
            print(f"[SKIP] {slug} already done")
            continue
        data[slug].update(fields)
        print(f"[OK]   {slug}")
        enriched += 1
    FILE.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nDone — {enriched} universities enriched.")


if __name__ == "__main__":
    main()
