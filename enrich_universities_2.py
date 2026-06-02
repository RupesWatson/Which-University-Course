#!/usr/bin/env python3
"""
Enrich Warwick, Bath, Manchester, Sheffield and Southampton
in the biochemistry university-details.json.
"""

import json
from pathlib import Path

FILE = Path(__file__).parent / "src/data/biochemistry/university-details.json"

NEW_DATA = {
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
        "rankings": {
            "complete": 7,
            "guardian": 6,
            "times": 7,
            "qsWorld": 85,
            "theWorld": 140,
            "russellGroup": True,
            "year": "2025"
        },
        "reputation": "Warwick is one of the UK's most academically selective universities, consistently ranked in the top 8, and has built a reputation for rigorous teaching and research-led education across the sciences. Its Department of Life Sciences is a leading centre for quantitative and systems biology, structural biology and plant science. Warwick is unusual in combining a genuinely research-intensive science faculty with exceptionally strong social sciences, mathematics and economics departments — making it a favourite for interdisciplinary thinkers.",
        "fees": {
            "homeUndergrad": "£9,535/year",
            "internationalUndergrad": "£25,900–£28,700/year",
            "livingCostEstimate": "£10,500–£14,000/year (Coventry is one of the UK's most affordable university cities)"
        },
        "funding": {
            "scholarships": [
                "Warwick Undergraduate Global Excellence Scholarship (25% fee reduction for international students with outstanding academics)",
                "Chancellor's International Scholarship (full fee waiver for exceptional international students — highly competitive)",
                "Warwick Bursary (up to £4,000/year for UK students from low-income households)",
                "Sports Warwick Scholarship (for elite athletes)"
            ],
            "bursaries": "Warwick Bursary automatically assessed from UCAS — UK students from households with income under £42,620 receive up to £4,000/year on a sliding scale.",
            "paymentPlan": "Fees paid in three termly instalments via the online student portal."
        },
        "employability": {
            "graduateEmploymentRate": "93%",
            "medianSalary": "£31,500 (15 months after graduation)",
            "topEmployers": [
                "GlaxoSmithKline",
                "AstraZeneca",
                "NHS",
                "Jaguar Land Rover",
                "Deloitte",
                "PwC",
                "KPMG"
            ],
            "careersService": "Warwick Careers and Skills provides 1:1 appointments, the Warwick Award (employability accreditation), employer fairs, and a STEM careers programme. Warwick's employer network is particularly strong in pharma, professional services and tech — reflecting its cross-disciplinary strengths.",
            "placementYearAvailable": True
        },
        "research": {
            "refRating": "GPA 3.18/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": [
                "Systems and synthetic biology",
                "Structural biology and protein science",
                "Plant and environmental biochemistry",
                "Cell biology and developmental biology",
                "Quantitative biology and bioinformatics"
            ],
            "notableFacilities": [
                "Warwick Integrative Synthetic Biology Centre (WISB)",
                "Warwick Advanced Bioimaging Research Technology Platform",
                "Midlands Integrative Biosciences Training Partnership (MIBTP)",
                "Zeeman Institute for Systems Biology",
                "Warwick X-ray and Cryo-EM Facility"
            ],
            "industryPartners": [
                "GlaxoSmithKline",
                "AstraZeneca",
                "Syngenta",
                "Jaguar Land Rover (materials interface)",
                "IBM Research"
            ]
        },
        "facilities": {
            "libraries": [
                "Warwick Library — central library with 1M+ items, open 24/7 during exam periods",
                "Life Sciences Library — specialist collections adjacent to the science buildings",
                "Digital access to 500,000+ e-resources"
            ],
            "sportsFacilities": "Sports and Wellness Hub — 50m pool, gym, climbing wall, squash courts, sports hall, outdoor pitches and athletics track. 65+ sports clubs. One of the best sport facilities of any UK campus university.",
            "studySpaces": "Library open 24/7 during exams; 3,000+ study spaces; silent and group zones; bookable rooms via the app.",
            "labs": "Life Sciences teaching labs are modern and well-equipped; Year 3 and 4 project students work in research labs with cutting-edge equipment including flow cytometry, cryo-EM and super-resolution microscopy.",
            "wellbeing": "Wellbeing Support Services provides counselling, mental health practitioners, and a disability team. Nightline peer listening service run by students. Togetherall (24/7 online platform)."
        },
        "satisfaction": {
            "nssOverall": 83,
            "teachingQuality": 87,
            "academicSupport": 83,
            "learningResources": 88
        },
        "travelFromLondon": {
            "trainTime": "1h 00m (fastest — to Coventry, then 15 min bus to campus)",
            "trainFromStation": "London Euston",
            "trainToStation": "Coventry (then U1/U2 bus to University)",
            "coachTime": "2h 15m (National Express)",
            "drivingTime": "1h 30m (M40, off-peak)",
            "distanceMiles": "95 miles north-west of London",
            "nearestAirport": "Birmingham Airport (20 min by car; 40 min via rail and bus)"
        },
        "accessibility": {
            "disabilityService": "Disability Services provides support plans, exam adjustments, specialist mentoring and assistive technology. Self-refer online at any point during the year.",
            "accessibleAccommodation": "A range of accessible rooms available across campus residences. Accessibility requirements flagged at the accommodation application stage — early application recommended.",
            "mentalHealthSupport": "Wellbeing Support Services counselling (free, unlimited sessions), mental health practitioners, Togetherall (24/7), and Nightline (peer listening, evenings during term).",
            "dyslexiaSupport": "SpLD assessment, specialist study skills tuition, assistive technology including Dragon Naturally Speaking and Read&Write, and exam adjustments coordinated by Disability Services.",
            "campusAccessibility": "Warwick's purpose-built campus is largely step-free with accessible paths across the main precinct. Some older halls and buildings have limited lift access. Campus AccessAble guide published online."
        },
        "international": {
            "visaSupport": "Warwick International Student Experience team provides Student Visa guidance, CAS issuance, and Graduate Route support. Pre-arrival webinar series and dedicated online portal.",
            "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for Life Sciences programmes; check individual course requirements.",
            "orientationProgramme": "International Welcome Week before term: UK banking, NHS registration, campus tour, sporting and social events. Warwick Global Partners scheme pairs international students with domestic student ambassadors.",
            "internationalSocietiesCount": "60+ international and cultural societies",
            "popularCountries": [
                "China",
                "India",
                "United States",
                "Germany",
                "Singapore",
                "Malaysia",
                "Greece"
            ]
        },
        "contact": {
            "admissionsEmail": "ugadmissions@warwick.ac.uk",
            "admissionsPhone": "+44 (0)24 7652 3723",
            "address": "University of Warwick, Coventry CV4 7AL",
            "openDayContact": "opendays@warwick.ac.uk"
        }
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
        "rankings": {
            "complete": 9,
            "guardian": 8,
            "times": 9,
            "qsWorld": 175,
            "theWorld": 251,
            "russellGroup": False,
            "year": "2025"
        },
        "reputation": "Bath is one of the UK's top 10 universities despite not being a Russell Group member — a remarkable achievement that reflects the quality of its teaching and research. It is consistently rated gold in the Teaching Excellence Framework and scores among the highest nationally for graduate employment and student satisfaction. Bath's integrated placement year — a mandatory Semester 5 industry placement — is the defining feature of its undergraduate degrees and gives graduates a decisive employability edge. The Department of Life Sciences has particular strength in structural biochemistry and biomolecular NMR.",
        "fees": {
            "homeUndergrad": "£9,535/year",
            "internationalUndergrad": "£22,800–£26,500/year",
            "livingCostEstimate": "£12,000–£16,000/year (Bath is a beautiful but relatively expensive city)"
        },
        "funding": {
            "scholarships": [
                "Bath University Scholarship (£2,000/year for students with AAA+ at A-level)",
                "Global Excellence Scholarship (fee reduction for high-achieving international students)",
                "Sports Performance Scholarship (for elite competing athletes)",
                "Claverton Scholarship (for US students)"
            ],
            "bursaries": "Bath Support Fund provides means-tested financial support for UK students in hardship. Enhanced bursaries available for care-experienced students and estranged students.",
            "paymentPlan": "Fees payable in three termly instalments. Instalment plan options for international students."
        },
        "employability": {
            "graduateEmploymentRate": "96%",
            "medianSalary": "£33,000 (15 months after graduation — boosted by mandatory placement year)",
            "topEmployers": [
                "GlaxoSmithKline",
                "Pfizer",
                "AstraZeneca",
                "Procter & Gamble",
                "Unilever",
                "NHS",
                "Syngenta"
            ],
            "careersService": "Bath Careers Service provides 1:1 advice, employer insight events, and the dedicated Placement Learning Unit which supports students in securing and succeeding in their Semester 5 industrial placement. Placement employers include GSK, Pfizer and AstraZeneca.",
            "placementYearAvailable": True
        },
        "research": {
            "refRating": "GPA 3.12/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": [
                "Structural biochemistry and biomolecular NMR spectroscopy",
                "Chemical biology and enzyme design",
                "Cell biology and developmental signalling",
                "Infection biology and antimicrobial research",
                "Bioinformatics and computational biology"
            ],
            "notableFacilities": [
                "Department of Life Sciences — purpose-built building with research-grade teaching labs",
                "Bath Institute for Rheumatic Diseases (clinical biochemistry)",
                "Centre for Therapeutic Innovation",
                "High-field NMR facility (600 MHz and 800 MHz spectrometers)",
                "Proteomics facility"
            ],
            "industryPartners": [
                "GlaxoSmithKline",
                "Pfizer",
                "AstraZeneca",
                "Procter & Gamble",
                "Reckitt"
            ]
        },
        "facilities": {
            "libraries": [
                "University Library — central library open 24/7, over 500,000 items",
                "Library pod study rooms — bookable for group and individual study",
                "Digital collections via Bath library portal covering all life sciences disciplines"
            ],
            "sportsFacilities": "Sports Training Village (built for the 2012 Olympics pre-training) — 50m pool, athletics track, gym, courts, sports hall, tennis centre, and dance studio. One of the finest university sport facilities in the UK.",
            "studySpaces": "Library open 24/7; 1,800+ study spaces; silent and collaborative zones; additional faculty study rooms across campus.",
            "labs": "Life Sciences teaching labs are recently refurbished and research-grade. Placement-year students are typically placed in pharma or biotech industry labs, returning with professional lab skills far beyond the standard undergraduate level.",
            "wellbeing": "Student Wellbeing provides counselling, mental health support, and a disability service. Students' Union peer supporter network and Togetherall (24/7 online platform)."
        },
        "satisfaction": {
            "nssOverall": 88,
            "teachingQuality": 91,
            "academicSupport": 88,
            "learningResources": 90
        },
        "travelFromLondon": {
            "trainTime": "1h 25m (fastest)",
            "trainFromStation": "London Paddington",
            "trainToStation": "Bath Spa",
            "coachTime": "2h 30m (National Express)",
            "drivingTime": "1h 45m (M4, off-peak)",
            "distanceMiles": "107 miles west of London",
            "nearestAirport": "Bristol Airport (30 min by car/taxi; flights to 100+ destinations)"
        },
        "accessibility": {
            "disabilityService": "Disability Service provides support plans, exam adjustments, specialist mentoring, and assistive technology. Self-refer via the online portal — no GP letter required.",
            "accessibleAccommodation": "Several halls have accessible en-suite rooms. Accessibility requirements noted at accommodation application — contact the accommodation office early to ensure suitable allocation.",
            "mentalHealthSupport": "Student Wellbeing counselling (free), mental health practitioners, Togetherall (24/7), and the SU peer support network. Bath has expanded mental health provision significantly in recent years.",
            "dyslexiaSupport": "SpLD assessment, specialist study skills tuition, assistive technology, and exam adjustments arranged through the Disability Service.",
            "campusAccessibility": "Bath's hillside campus has some accessibility challenges, but the main library, teaching buildings and Students' Union are fully step-free. Campus accessibility map and AccessAble guides available online."
        },
        "international": {
            "visaSupport": "International Student Advisory Service provides Student Visa guidance, CAS letters, and Graduate Route advice. Pre-arrival webinar series and immigration drop-in sessions.",
            "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for Life Sciences programmes.",
            "orientationProgramme": "International Welcome Week before term: UK banking, NHS registration, city tour, and academic orientation. SU International Society welcome events and buddy scheme.",
            "internationalSocietiesCount": "45+ international and cultural societies",
            "popularCountries": [
                "China",
                "United States",
                "India",
                "Germany",
                "Hong Kong",
                "Malaysia",
                "France"
            ]
        },
        "contact": {
            "admissionsEmail": "admissions@bath.ac.uk",
            "admissionsPhone": "+44 (0)1225 383019",
            "address": "University of Bath, Claverton Down, Bath BA2 7AY",
            "openDayContact": "opendays@bath.ac.uk"
        }
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
        "rankings": {
            "complete": 16,
            "guardian": 14,
            "times": 15,
            "qsWorld": 32,
            "theWorld": 58,
            "russellGroup": True,
            "year": "2025"
        },
        "reputation": "Manchester is the UK's largest single-site university and a global research powerhouse, ranked in the QS World top 35. It has produced more Nobel laureates than almost any other UK university — 25 in total — including Ernest Rutherford (splitting the atom) and André Geim (graphene). The Faculty of Biology, Medicine and Health is one of the largest in Europe, with outstanding research in cancer biology, immunology and biochemistry. Manchester is also one of the most vibrant student cities in the world, consistently voted the UK's best place to be a student.",
        "fees": {
            "homeUndergrad": "£9,535/year",
            "internationalUndergrad": "£27,000–£32,500/year",
            "livingCostEstimate": "£12,000–£16,000/year (Manchester is excellent value for a major city)"
        },
        "funding": {
            "scholarships": [
                "Manchester Excellence Scholarship (up to £2,000/year for high-achieving home students)",
                "Global Futures Scholarship (fee reduction for international students from select countries)",
                "Manchester Bursary (up to £2,000/year for UK students from low-income households)",
                "Sports Excellence Scholarship (for elite athletes competing at national level)"
            ],
            "bursaries": "Manchester Bursary automatically assessed from UCAS — available to UK students from households with income under £42,620 on a sliding scale.",
            "paymentPlan": "Fees paid in three termly instalments. Instalment plan available for international students."
        },
        "employability": {
            "graduateEmploymentRate": "91%",
            "medianSalary": "£30,000 (15 months after graduation)",
            "topEmployers": [
                "AstraZeneca",
                "NHS",
                "GSK",
                "Unilever",
                "PwC",
                "Deloitte",
                "Cancer Research UK"
            ],
            "careersService": "Manchester Careers Service provides 1:1 advice, employer events, and the Manchester Gold Mentoring Programme connecting students with senior alumni. Manchester's location in the heart of the North West's life sciences and biotech cluster is a significant advantage.",
            "placementYearAvailable": True
        },
        "research": {
            "refRating": "GPA 3.28/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": [
                "Cancer biology and drug target discovery",
                "Immunology and inflammatory disease",
                "Structural biology and molecular machines",
                "Systems biology and computational modelling",
                "Microbiome and infection biology"
            ],
            "notableFacilities": [
                "Michael Smith Building — state-of-the-art life sciences research building",
                "Wellcome Centre for Cell-Matrix Research",
                "Cancer Research UK Manchester Institute (Christie Hospital campus)",
                "Manchester Institute of Biotechnology (MIB)",
                "National Graphene Institute (cross-disciplinary materials-biology interface)"
            ],
            "industryPartners": [
                "AstraZeneca",
                "GSK",
                "Cancer Research UK",
                "Unilever R&D",
                "Bruntwood SciTech (life sciences cluster)"
            ]
        },
        "facilities": {
            "libraries": [
                "John Rylands Research Institute and Library — world-famous historic library and special collections",
                "Main Library — open 24/7 during exams, 4M+ items",
                "Alan Gilbert Learning Commons — modern study hub open 24/7"
            ],
            "sportsFacilities": "Sugden Sports Centre (on-campus — gym, pool, courts), Armitage Sports Centre (off-campus — extensive outdoor facilities). 70+ sports clubs.",
            "studySpaces": "Alan Gilbert Learning Commons open 24/7; 4,000+ study spaces; silent, social and collaborative zones.",
            "labs": "Michael Smith Building houses modern biochemistry teaching labs; project students in Years 3–4 are embedded in research groups at the cutting edge of cancer biology, immunology and structural biology.",
            "wellbeing": "Student Support and Counselling service provides free counselling, mental health practitioners, and a 24/7 crisis line. Togetherall (24/7), Manchester SU peer support, and college-based welfare support."
        },
        "satisfaction": {
            "nssOverall": 80,
            "teachingQuality": 83,
            "academicSupport": 79,
            "learningResources": 86
        },
        "travelFromLondon": {
            "trainTime": "2h 10m (fastest Avanti West Coast service)",
            "trainFromStation": "London Euston",
            "trainToStation": "Manchester Piccadilly",
            "coachTime": "3h 30m (National Express / Megabus)",
            "drivingTime": "3h 00m (M6, off-peak)",
            "distanceMiles": "200 miles north-west of London",
            "nearestAirport": "Manchester Airport (20 min by Metrolink tram; direct services to 200+ destinations)"
        },
        "accessibility": {
            "disabilityService": "Disability Advisory and Support Service (DASS) provides support plans, exam adjustments, specialist mentoring, and assistive technology. Self-refer online at any point.",
            "accessibleAccommodation": "Accessible rooms available in several university halls. Accessibility requirements flagged at accommodation application — early applications strongly recommended.",
            "mentalHealthSupport": "Student Support and Counselling (free, up to 12 sessions), mental health practitioners, Togetherall (24/7), Nightline (peer listening, evenings during term), and a 24/7 crisis support line.",
            "dyslexiaSupport": "SpLD assessment, specialist study skills tuition, assistive technology (Dragon, Read&Write), and exam adjustments co-ordinated through DASS.",
            "campusAccessibility": "Manchester's main Oxford Road campus is largely step-free with accessible routes and lifts in most buildings. The new Michael Smith Building is fully accessible. Campus accessibility guide available."
        },
        "international": {
            "visaSupport": "International Development Office provides Student Visa guidance, CAS issuance, Graduate Route support, and pre-arrival webinars. Dedicated immigration advisers on campus.",
            "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for Biochemistry and Life Sciences programmes.",
            "orientationProgramme": "International Welcome Programme before term: UK banking, NHS registration, tram pass information, and academic orientation. Manchester SU International Society welcome events.",
            "internationalSocietiesCount": "70+ international and cultural societies",
            "popularCountries": [
                "China",
                "India",
                "United States",
                "Saudi Arabia",
                "Malaysia",
                "Nigeria",
                "Pakistan"
            ]
        },
        "contact": {
            "admissionsEmail": "ug.admissions@manchester.ac.uk",
            "admissionsPhone": "+44 (0)161 306 6000",
            "address": "The University of Manchester, Oxford Road, Manchester M13 9PL",
            "openDayContact": "opendays@manchester.ac.uk"
        }
    },

    "sheffield": {
        "website": "https://www.sheffield.ac.uk",
        "prospectus": "https://www.sheffield.ac.uk/study/undergraduate",
        "socials": {
            "instagram": "https://www.instagram.com/sheffielduni/",
            "twitter": "https://twitter.com/sheffielduni",
            "youtube": "https://www.youtube.com/sheffielduniversity",
            "tiktok": "https://www.tiktok.com/@sheffielduni",
            "linkedin": "https://www.linkedin.com/school/university-of-sheffield/"
        },
        "rankings": {
            "complete": 19,
            "guardian": 17,
            "times": 18,
            "qsWorld": 105,
            "theWorld": 160,
            "russellGroup": True,
            "year": "2025"
        },
        "reputation": "Sheffield is a Russell Group university with a long tradition of world-class science and engineering. It is consistently voted the UK's best university for student experience and has been named University of the Year multiple times. The Department of Molecular Biology and Biotechnology (known as MBB) is a well-regarded research department with particular strength in RNA biology, genome stability and microbial biochemistry. Sheffield's combination of strong science, an exceptional students' union and the most affordable major city in England makes it a top choice for students who want quality without compromise.",
        "fees": {
            "homeUndergrad": "£9,535/year",
            "internationalUndergrad": "£24,450–£27,880/year",
            "livingCostEstimate": "£10,000–£13,500/year (Sheffield is consistently ranked the most affordable major UK city for students)"
        },
        "funding": {
            "scholarships": [
                "Sheffield Excellence Award (£2,000 one-off for AAA+ applicants)",
                "Global Award (£3,000 fee reduction for international students from select countries)",
                "Sheffield Bursary (up to £1,250/year for UK students from households under £25,000)",
                "Sports Sheffield Scholarship (for elite athletes)"
            ],
            "bursaries": "Sheffield Bursary automatically assessed from UCAS. Additional departmental hardship funds available in most faculties.",
            "paymentPlan": "Fees paid in three termly instalments via the student portal."
        },
        "employability": {
            "graduateEmploymentRate": "90%",
            "medianSalary": "£29,000 (15 months after graduation)",
            "topEmployers": [
                "NHS",
                "AstraZeneca",
                "Unilever",
                "Rolls-Royce",
                "Boeing",
                "Procter & Gamble",
                "Sheffield Teaching Hospitals NHS Trust"
            ],
            "careersService": "Sheffield Careers Service provides 1:1 appointments, the Sheffield Graduate Award (employability accreditation), employer fairs, and a dedicated STEM careers programme with strong links to the South Yorkshire life sciences and NHS research network.",
            "placementYearAvailable": True
        },
        "research": {
            "refRating": "GPA 3.07/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": [
                "RNA biology and non-coding RNA",
                "Genome stability and DNA damage response",
                "Microbial biochemistry and synthetic biology",
                "Structural biology and protein folding",
                "Plant biochemistry and food security"
            ],
            "notableFacilities": [
                "Firth Court — home of the Department of Molecular Biology and Biotechnology",
                "Krebs Institute — named after Nobel Laureate Hans Krebs (who worked at Sheffield)",
                "Sheffield Biosciences Shared Research Facilities",
                "Healthy Lifespan Institute (linking biochemistry to ageing and health)",
                "Sheffield Institute for Nucleic Acids (SInFoNiA)"
            ],
            "industryPartners": [
                "AstraZeneca",
                "Unilever",
                "Sheffield Teaching Hospitals NHS Trust",
                "Insigneo Institute (biomedical modelling)",
                "Xaar (bioprinting applications)"
            ]
        },
        "facilities": {
            "libraries": [
                "Western Bank Library — main library open 24/7 during exams with 1M+ items",
                "Information Commons — modern 24/7 study building with 1,300 study spaces",
                "Science and Engineering Library — specialist collections"
            ],
            "sportsFacilities": "SportsSheffield — extensive on-campus facilities including a 25m pool, gym, climbing wall, sports hall, squash courts and outdoor pitches. 70+ sports clubs.",
            "studySpaces": "Information Commons open 24/7; 3,000+ study spaces across the estate; silent, group and individual zones.",
            "labs": "MBB department teaching labs are well-equipped with modern molecular biology facilities. Final-year project students join active research groups in RNA biology, genome stability or microbial genetics.",
            "wellbeing": "Sheffield University Health Service provides GP, counselling and mental health services on campus. Togetherall (24/7), the SU Big Night In welfare campaign, and peer-supported wellbeing events."
        },
        "satisfaction": {
            "nssOverall": 85,
            "teachingQuality": 87,
            "academicSupport": 84,
            "learningResources": 88
        },
        "travelFromLondon": {
            "trainTime": "2h 10m (fastest East Midlands Railway/CrossCountry)",
            "trainFromStation": "London St Pancras International",
            "trainToStation": "Sheffield",
            "coachTime": "3h 30m (National Express / Megabus)",
            "drivingTime": "2h 30m (M1, off-peak)",
            "distanceMiles": "168 miles north of London",
            "nearestAirport": "Leeds Bradford Airport (45 min by car) or Manchester Airport (1h by car/train)"
        },
        "accessibility": {
            "disabilityService": "Disability and Dyslexia Support (DDS) provides support plans, exam adjustments, specialist mentoring and assistive technology. Self-refer via Student Services.",
            "accessibleAccommodation": "Several halls have accessible rooms including Endcliffe Village and Ranmoor. Accessibility requirements flagged during accommodation application.",
            "mentalHealthSupport": "University Health Service counselling, mental health practitioners, Togetherall (24/7), and the SU award-winning welfare services.",
            "dyslexiaSupport": "SpLD assessment, specialist study skills tuition, assistive technology, and exam adjustments via DDS.",
            "campusAccessibility": "Sheffield's hillside campus has some challenging terrain; however, key academic buildings including Firth Court (MBB) and the Information Commons are accessible. Campus accessibility map online."
        },
        "international": {
            "visaSupport": "Sheffield International Student Support team provides Student Visa guidance, CAS letters and Graduate Route advice. Pre-arrival webinar series and dedicated international portal.",
            "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for Biochemistry and Molecular Biology programmes.",
            "orientationProgramme": "International Student Welcome Week before term: NHS registration, UK banking, city orientation and academic induction. SISA (Sheffield International Student Association) welcome events.",
            "internationalSocietiesCount": "50+ international and cultural societies",
            "popularCountries": [
                "China",
                "India",
                "United States",
                "Malaysia",
                "Nigeria",
                "Saudi Arabia",
                "Germany"
            ]
        },
        "contact": {
            "admissionsEmail": "study@sheffield.ac.uk",
            "admissionsPhone": "+44 (0)114 222 0000",
            "address": "The University of Sheffield, Western Bank, Sheffield S10 2TN",
            "openDayContact": "opendays@sheffield.ac.uk"
        }
    },

    "southampton": {
        "website": "https://www.southampton.ac.uk",
        "prospectus": "https://www.southampton.ac.uk/study/undergraduate/",
        "socials": {
            "instagram": "https://www.instagram.com/uni_southampton/",
            "twitter": "https://twitter.com/unisouthampton",
            "youtube": "https://www.youtube.com/universityofsouthampton",
            "tiktok": "https://www.tiktok.com/@unisouthampton",
            "linkedin": "https://www.linkedin.com/school/university-of-southampton/"
        },
        "rankings": {
            "complete": 12,
            "guardian": 11,
            "times": 12,
            "qsWorld": 88,
            "theWorld": 132,
            "russellGroup": True,
            "year": "2025"
        },
        "reputation": "Southampton is a Russell Group university consistently ranked in the UK top 15 with a global reputation particularly strong in engineering, oceanography and biosciences. Its School of Biological Sciences has excellent research groups in protein biochemistry, structural biology and systems biology. Southampton is uniquely positioned on the South Coast — its Institute for Life Sciences (IfLS) bridges basic biochemistry research with clinical translation via the Southampton General Hospital complex, one of the UK's leading teaching hospitals.",
        "fees": {
            "homeUndergrad": "£9,535/year",
            "internationalUndergrad": "£23,000–£27,100/year",
            "livingCostEstimate": "£11,500–£15,500/year (Southampton is moderate — cheaper than London and Bristol)"
        },
        "funding": {
            "scholarships": [
                "Southampton Undergraduate Excellence Scholarship (£3,000 one-off for AAA+ entry)",
                "Vice-Chancellor's International Scholarship (£5,000 fee reduction for excellent international students)",
                "Mayflower Scholarship (for US students with strong academic record)",
                "Sports Performance Scholarship (for elite athletes)"
            ],
            "bursaries": "Southampton Bursary automatically assessed from UCAS — UK students from households with income under £40,000 receive financial support on a sliding scale. Care-experienced students receive additional support.",
            "paymentPlan": "Fees paid in three termly instalments. Instalment plans available via the student portal."
        },
        "employability": {
            "graduateEmploymentRate": "92%",
            "medianSalary": "£30,000 (15 months after graduation)",
            "topEmployers": [
                "NHS (Southampton University Hospitals Trust)",
                "AstraZeneca",
                "IBM",
                "Ordnance Survey",
                "Lloyd's Register",
                "Rolls-Royce",
                "Parexel International"
            ],
            "careersService": "Southampton Careers and Employability Service provides 1:1 advice, the Southampton Award (employability accreditation), employer events, and placement placement support through the Institute for Life Sciences enterprise arm.",
            "placementYearAvailable": True
        },
        "research": {
            "refRating": "GPA 3.18/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": [
                "Structural biology and protein biochemistry",
                "Systems biology and mathematical modelling",
                "Cell biology and epigenetics",
                "Infection and immunity",
                "Marine biochemistry and blue biotechnology"
            ],
            "notableFacilities": [
                "Institute for Life Sciences (IfLS) — bridging basic science and clinical translation",
                "Centre for Biological Sciences — modern research building",
                "Southampton General Hospital Research Campus (adjacent to university)",
                "National Oceanography Centre (marine biochemistry interface)",
                "Biomedical Imaging Unit (University Hospital)"
            ],
            "industryPartners": [
                "AstraZeneca",
                "IBM Research",
                "Parexel International",
                "Lloyd's Register Foundation",
                "Southampton University Hospitals NHS Trust"
            ]
        },
        "facilities": {
            "libraries": [
                "Hartley Library — central library, open 24/7 during exams, 1.5M+ items",
                "Avenue Campus Library — humanities and social sciences collections",
                "Digital resources via SotonFind covering all biological sciences disciplines"
            ],
            "sportsFacilities": "Wide Lane Sports Complex — 50m pool, gym, sports hall, squash courts, athletics track, outdoor pitches and tennis courts. 60+ sports clubs. Strong rowing and sailing culture reflecting the maritime setting.",
            "studySpaces": "Hartley Library open 24/7; 2,500+ study spaces; silent, group and individual zones; bookable rooms via app.",
            "labs": "Biological Sciences teaching labs are modern and well-equipped. Final-year project students are placed in research labs at the Centre for Biological Sciences or the Institute for Life Sciences.",
            "wellbeing": "Student Wellbeing team provides counselling (free), mental health practitioners, and a 24/7 Student Wellbeing Line. Togetherall (24/7). SUSU (Students' Union) peer support and welfare drop-ins."
        },
        "satisfaction": {
            "nssOverall": 84,
            "teachingQuality": 86,
            "academicSupport": 83,
            "learningResources": 87
        },
        "travelFromLondon": {
            "trainTime": "1h 15m (fastest South Western Railway service)",
            "trainFromStation": "London Waterloo",
            "trainToStation": "Southampton Central",
            "coachTime": "2h 15m (National Express)",
            "drivingTime": "1h 30m (M3, off-peak)",
            "distanceMiles": "79 miles south-west of London",
            "nearestAirport": "Southampton Airport (10 min by train; flights to Edinburgh, Amsterdam, Dublin and more)"
        },
        "accessibility": {
            "disabilityService": "Enabling Services provides support plans, exam adjustments, specialist mentoring, and assistive technology. Self-refer via the online portal — no GP letter required.",
            "accessibleAccommodation": "Several halls have accessible en-suite rooms. Accessibility requirements flagged during accommodation application. The Mayflower Halls are modern and fully accessible.",
            "mentalHealthSupport": "Student Wellbeing counselling (free, up to 12 sessions), mental health practitioners, 24/7 Student Wellbeing Line, and Togetherall online platform.",
            "dyslexiaSupport": "SpLD assessment, specialist study skills tuition, assistive technology, and exam adjustments arranged through Enabling Services.",
            "campusAccessibility": "Highfield campus is largely step-free; main academic buildings including the Centre for Biological Sciences are accessible. Campus AccessAble guide published online."
        },
        "international": {
            "visaSupport": "International Student Advisory Team provides Student Visa guidance, CAS letters, and Graduate Route support. Pre-arrival webinars and a dedicated international student portal.",
            "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for Biochemistry and Biological Sciences programmes.",
            "orientationProgramme": "International Welcome Week before term: NHS registration, UK banking, campus tour, and cultural orientation. SUSU International Student Liaison Officer events and buddy scheme.",
            "internationalSocietiesCount": "45+ international and cultural societies",
            "popularCountries": [
                "China",
                "India",
                "United States",
                "Malaysia",
                "Germany",
                "Nigeria",
                "Singapore"
            ]
        },
        "contact": {
            "admissionsEmail": "admissions@soton.ac.uk",
            "admissionsPhone": "+44 (0)23 8059 5000",
            "address": "University of Southampton, University Road, Southampton SO17 1BJ",
            "openDayContact": "opendays@soton.ac.uk"
        }
    }
}


def main():
    data = json.loads(FILE.read_text(encoding="utf-8"))

    for slug, fields in NEW_DATA.items():
        if slug not in data:
            print(f"[SKIP] {slug} not found in file")
            continue
        if "website" in data[slug]:
            print(f"[SKIP] {slug} already enriched")
            continue
        data[slug].update(fields)
        print(f"[OK]   {slug} enriched with {len(fields)} new field groups")

    FILE.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    print("\nDone — file written.")


if __name__ == "__main__":
    main()
