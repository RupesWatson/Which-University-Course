#!/usr/bin/env python3
"""
One-shot script to enrich Cambridge, Imperial, UCL, Edinburgh and Durham
in the biochemistry university-details.json with the new rich fields.
"""

import json
from pathlib import Path

FILE = Path(__file__).parent / "src/data/biochemistry/university-details.json"

NEW_DATA = {
    "cambridge": {
        "website": "https://www.cam.ac.uk",
        "prospectus": "https://www.undergraduate.study.cam.ac.uk/apply/prospectus",
        "socials": {
            "instagram": "https://www.instagram.com/cambridgeuniversity/",
            "twitter": "https://twitter.com/Cambridge_Uni",
            "youtube": "https://www.youtube.com/cambridgeuniversity",
            "tiktok": "https://www.tiktok.com/@cambridgeuniversity",
            "linkedin": "https://www.linkedin.com/school/university-of-cambridge/"
        },
        "rankings": {
            "complete": 1,
            "guardian": 1,
            "times": 1,
            "qsWorld": 2,
            "theWorld": 2,
            "russellGroup": True,
            "year": "2025"
        },
        "reputation": "Cambridge is the world's second-ranked university and the UK's top-ranked institution in multiple global league tables. Its Natural Sciences Tripos is the gold-standard route into biochemistry — students study broadly across biological and physical sciences before specialising. The MRC Laboratory of Molecular Biology, which has generated more Nobel Prizes in biochemistry than any other institution in the world, sits adjacent to the campus. Cambridge biochemistry graduates are among the most sought-after in the global pharmaceutical and biotech industries.",
        "fees": {
            "homeUndergrad": "£9,535/year",
            "internationalUndergrad": "£37,760–£58,038/year",
            "livingCostEstimate": "£15,140–£22,140/year (Cambridge guidance — higher than most UK cities)"
        },
        "funding": {
            "scholarships": [
                "Cambridge Bursary Scheme (up to £3,500/year for UK students from low-income households)",
                "Prince Philip Scholarship (for students from Malaysia)",
                "Gates Cambridge Scholarship (postgraduate; highly prestigious)",
                "Cambridge Trust scholarships for international undergraduates"
            ],
            "bursaries": "Cambridge Bursary is automatically assessed — students from households with income under £42,620 receive support on a sliding scale. Colleges also provide supplementary bursaries independently.",
            "paymentPlan": "Fees paid termly (three instalments). Colleges often bill separately for accommodation and meals."
        },
        "employability": {
            "graduateEmploymentRate": "95%",
            "medianSalary": "£40,000 (15 months after graduation — among the highest for UK biochemistry graduates)",
            "topEmployers": [
                "AstraZeneca",
                "GSK",
                "MRC Laboratory of Molecular Biology",
                "McKinsey & Company",
                "Goldman Sachs",
                "Wellcome Sanger Institute",
                "Oxford Nanopore Technologies"
            ],
            "careersService": "Cambridge Careers Service offers 1:1 advice, employer fairs, and the Careers Fair (one of the UK's largest). The collegiate system provides additional networking through alumni mentors. Roughly 40% of Cambridge biochemistry graduates continue to PhD programmes.",
            "placementYearAvailable": False
        },
        "research": {
            "refRating": "GPA 3.62/4.0 — Biological Sciences, #1 in UK (REF 2021)",
            "strengthAreas": [
                "Structural biology and cryo-electron microscopy",
                "DNA replication and repair",
                "Cell division and signalling",
                "Metabolic biochemistry and enzyme mechanisms",
                "Neuroscience and protein misfolding diseases"
            ],
            "notableFacilities": [
                "MRC Laboratory of Molecular Biology — world-leading structural and cell biology (Nobel Prize factory)",
                "Wellcome Sanger Institute (Hinxton, 12 miles away) — human genome research",
                "Cambridge Biomedical Campus — one of Europe's largest biomedical clusters",
                "Cryo-EM facility in the Department of Biochemistry",
                "Cambridge Stem Cell Institute"
            ],
            "industryPartners": [
                "AstraZeneca (global HQ at Cambridge Biomedical Campus)",
                "GSK",
                "Pfizer",
                "Agilent Technologies",
                "Illumina"
            ]
        },
        "facilities": {
            "libraries": [
                "University Library — legal deposit library with 8M+ items, open to all students",
                "Each college has its own library, many open 24/7",
                "Biochemistry Department Library — specialist science collections"
            ],
            "sportsFacilities": "University Centre, college boat clubs on the Cam, 100+ sports clubs including the famous Cambridge University Athletic Club. Fenner's cricket ground and a wide range of college-specific facilities.",
            "studySpaces": "24/7 study access in most college libraries; University Library open until midnight; bookable study rooms across the collegiate system.",
            "labs": "Department of Biochemistry is one of the best-equipped teaching and research laboratories in the world. Second-year students begin independent practical projects in research-grade labs.",
            "wellbeing": "Each college has a dedicated welfare team (junior dean, nurse, counsellor). University Counselling Service provides free confidential sessions. Togetherall (24/7 online). Cambridge Mind runs mental health drop-ins."
        },
        "satisfaction": {
            "nssOverall": 85,
            "teachingQuality": 91,
            "academicSupport": 88,
            "learningResources": 90
        },
        "travelFromLondon": {
            "trainTime": "50 minutes (fastest)",
            "trainFromStation": "London King's Cross",
            "trainToStation": "Cambridge",
            "coachTime": "2h 00m (National Express from Victoria)",
            "drivingTime": "1h 20m (A14/M11, off-peak)",
            "distanceMiles": "60 miles north of London",
            "nearestAirport": "London Stansted Airport (30 min by train — direct service)"
        },
        "accessibility": {
            "disabilityService": "Disability Resource Centre (DRC) provides support plans, exam adjustments, assistive technology and disability-related funding advice. Each college also has a disability liaison officer.",
            "accessibleAccommodation": "Colleges vary — most have some accessible rooms and lift access. Accessibility requirements must be declared on the UCAS application to allow colleges to allocate appropriate accommodation. New purpose-built accommodation is fully accessible.",
            "mentalHealthSupport": "University Counselling Service (free, up to 8 sessions), college nurse and welfare dean, Togetherall (24/7), and Samaritans partnership. Cambridge has invested heavily in mental health provision in recent years.",
            "dyslexiaSupport": "DRC provides SpLD assessment, specialist study skills tuition, assistive technology (Dragon, Read&Write), and automatic exam adjustments once a support plan is in place.",
            "campusAccessibility": "Cambridge's historic buildings vary considerably in accessibility. The Department of Biochemistry (Tennis Court Road) is step-free. The university publishes an AccessAble guide for each building."
        },
        "international": {
            "visaSupport": "International Student Team handles CAS issuance, visa guidance, and pre-arrival webinars. Dedicated graduate immigration adviser for post-study Graduate Route and sponsorship queries.",
            "englishRequirements": "IELTS 7.5 overall (7.0 in each component) for Natural Sciences (Biochemistry pathway).",
            "orientationProgramme": "International Welcome Week before Michaelmas term: UK banking, NHS registration, cycling safety, cultural orientation, and college-specific events. Buddy scheme via Cambridge SU.",
            "internationalSocietiesCount": "80+ international and cultural societies",
            "popularCountries": [
                "United States",
                "China",
                "India",
                "Singapore",
                "Germany",
                "Canada",
                "Hong Kong"
            ]
        },
        "contact": {
            "admissionsEmail": "admissions@cam.ac.uk",
            "admissionsPhone": "+44 (0)1223 333308",
            "address": "University of Cambridge, The Old Schools, Trinity Lane, Cambridge CB2 1TN",
            "openDayContact": "admissions@cam.ac.uk"
        }
    },

    "imperial-college-london": {
        "website": "https://www.imperial.ac.uk",
        "prospectus": "https://www.imperial.ac.uk/study/apply/undergraduate/",
        "socials": {
            "instagram": "https://www.instagram.com/imperialcollege/",
            "twitter": "https://twitter.com/imperialcollege",
            "youtube": "https://www.youtube.com/channel/UCcRV5FPxxWFdS4Fjnk9FQvA",
            "tiktok": "https://www.tiktok.com/@imperialcollege",
            "linkedin": "https://www.linkedin.com/school/imperial-college-london/"
        },
        "rankings": {
            "complete": 5,
            "guardian": 5,
            "times": 5,
            "qsWorld": 8,
            "theWorld": 11,
            "russellGroup": True,
            "year": "2025"
        },
        "reputation": "Imperial is the UK's only university dedicated entirely to science, engineering, medicine and business, and is consistently ranked in the global top 10. Its Department of Life Sciences is internationally renowned and its biochemistry graduates are among the most employable in the world. Imperial is uniquely placed in the heart of London's knowledge economy — the South Kensington campus sits alongside the Natural History Museum, Science Museum and the V&A, and the Hammersmith campus is next to a major NHS teaching hospital.",
        "fees": {
            "homeUndergrad": "£9,535/year",
            "internationalUndergrad": "£38,750–£42,550/year",
            "livingCostEstimate": "£17,000–£25,000/year (London costs are the highest in the UK)"
        },
        "funding": {
            "scholarships": [
                "Imperial Scholarship (full tuition fee waiver for exceptional international students)",
                "President's Undergraduate Scholarship (awarded to highest-performing UK first-years)",
                "Imperial Bursary (up to £5,000/year for UK students from low-income households)",
                "Chevening and Commonwealth scholarships accepted"
            ],
            "bursaries": "Imperial Bursary automatically assessed from UCAS — UK students from households earning under £45,000 receive up to £5,000/year on a sliding scale.",
            "paymentPlan": "Fees paid in three instalments per year via the student portal. Instalment plan available for international students."
        },
        "employability": {
            "graduateEmploymentRate": "96%",
            "medianSalary": "£37,000 (15 months after graduation — one of the highest in UK for life sciences)",
            "topEmployers": [
                "GlaxoSmithKline",
                "AstraZeneca",
                "Johnson & Johnson",
                "McKinsey & Company",
                "Goldman Sachs",
                "NHS",
                "Wellcome Trust"
            ],
            "careersService": "Imperial Careers provides 1:1 advisory sessions, employer presentations, the Imperial Plus Award, and sector-specific programmes including a dedicated life sciences careers stream. Employer access via London's financial and biotech networks is unmatched.",
            "placementYearAvailable": True
        },
        "research": {
            "refRating": "100% of research rated 'internationally excellent or world-leading' — Biological Sciences (REF 2021)",
            "strengthAreas": [
                "Structural and molecular biology",
                "Cellular and molecular immunology",
                "Infection biology and global health",
                "Cancer biology and drug target discovery",
                "Synthetic biology and metabolic engineering"
            ],
            "notableFacilities": [
                "Sir Alexander Fleming Building — flagship life sciences research building",
                "Francis Crick Institute (partner institution — walking distance)",
                "Hammersmith Hospital Campus — clinical research and imaging",
                "London Bioscience Innovation Centre",
                "MRC Centre for Molecular Bacteriology and Infection"
            ],
            "industryPartners": [
                "GlaxoSmithKline",
                "AstraZeneca",
                "Pfizer",
                "Johnson & Johnson",
                "Sanofi"
            ]
        },
        "facilities": {
            "libraries": [
                "Central Library — open 24/7 during term time, 400,000+ items",
                "Hammersmith Campus Library — medical and life sciences specialist collections",
                "Digital access to 400,000+ e-books and 50,000+ e-journals"
            ],
            "sportsFacilities": "Ethos Sports Centre — gym, 25m pool, squash courts, climbing wall, sports hall. Harlington Sports Ground (off-campus) provides outdoor pitches. 60+ sports clubs.",
            "studySpaces": "Central Library open 24/7; 1,200+ study spaces; silent and collaborative study zones; bookable group rooms.",
            "labs": "Best-in-class research-grade teaching labs; from Year 2 students work in the same labs as PhD and postdoc researchers. Dedicated safety training programme in Year 1.",
            "wellbeing": "Student Support Zone provides counselling, mental health, and wellbeing services. College Health Centre on campus. Togetherall (24/7). Imperial College Union peer support network."
        },
        "satisfaction": {
            "nssOverall": 77,
            "teachingQuality": 82,
            "academicSupport": 79,
            "learningResources": 88
        },
        "travelFromLondon": {
            "trainTime": "On campus — South Kensington is in central London",
            "trainFromStation": "South Kensington (District/Circle/Piccadilly lines — direct from all London termini)",
            "trainToStation": "South Kensington Underground",
            "coachTime": "N/A — located in central London",
            "drivingTime": "N/A — central London; parking very limited",
            "distanceMiles": "Located in London SW7",
            "nearestAirport": "Heathrow Airport (30 min via Piccadilly line direct)"
        },
        "accessibility": {
            "disabilityService": "Disability Advisory Service provides support plans, exam adjustments, and assistive technology. Self-referral online. Dedicated disability coordinators in each department.",
            "accessibleAccommodation": "Beit Hall and Graduate Centre have accessible rooms. Accessibility requirements should be noted on the accommodation application form. Most modern residences are step-free.",
            "mentalHealthSupport": "Student Counselling Service (free, up to 8 sessions), mental health advisers, Togetherall (24/7), and a Student Minds chapter on campus. Imperial has expanded provision significantly in recent years.",
            "dyslexiaSupport": "Specialist study skills support, assistive technology, and exam adjustments via the Disability Advisory Service. Self-refer through the student hub.",
            "campusAccessibility": "South Kensington campus is largely accessible — the main quad and most buildings are step-free. Lifts installed in most older buildings. Campus accessibility guide available via estates."
        },
        "international": {
            "visaSupport": "International Student Support Office provides Student Visa guidance, CAS letters, and Graduate Route advice. Pre-arrival webinar series and dedicated immigration advisers.",
            "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for most life sciences programmes; check individual course requirements.",
            "orientationProgramme": "International Welcome Programme before term: UK banking, Oyster card setup, NHS registration, campus tour, and cultural orientation. Imperial College Union runs a Buddy Scheme.",
            "internationalSocietiesCount": "70+ international and cultural societies",
            "popularCountries": [
                "China",
                "India",
                "United States",
                "Singapore",
                "Malaysia",
                "Germany",
                "Hong Kong"
            ]
        },
        "contact": {
            "admissionsEmail": "admissions@imperial.ac.uk",
            "admissionsPhone": "+44 (0)20 7589 5111",
            "address": "Imperial College London, South Kensington Campus, London SW7 2AZ",
            "openDayContact": "admissions@imperial.ac.uk"
        }
    },

    "university-college-london": {
        "website": "https://www.ucl.ac.uk",
        "prospectus": "https://www.ucl.ac.uk/prospective-students/undergraduate/",
        "socials": {
            "instagram": "https://www.instagram.com/ucl/",
            "twitter": "https://twitter.com/ucl",
            "youtube": "https://www.youtube.com/universitycollegelondon",
            "tiktok": "https://www.tiktok.com/@uclofficial",
            "linkedin": "https://www.linkedin.com/school/university-college-london/"
        },
        "rankings": {
            "complete": 8,
            "guardian": 8,
            "times": 9,
            "qsWorld": 9,
            "theWorld": 22,
            "russellGroup": True,
            "year": "2025"
        },
        "reputation": "UCL is London's leading multidisciplinary university, ranked in the global top 10 and renowned for its tradition of openness, diversity, and radical thinking. The Department of Structural and Molecular Biology is one of the best in Europe, and UCL's partnership with the Francis Crick Institute — one of the world's largest biomedical research centres — means undergraduates gain exposure to world-class research from day one. UCL is the first university in England to admit students regardless of gender or religion.",
        "fees": {
            "homeUndergrad": "£9,535/year",
            "internationalUndergrad": "£31,500–£38,000/year",
            "livingCostEstimate": "£16,000–£23,000/year (London costs — Bloomsbury is central but transport links reduce the need to live close)"
        },
        "funding": {
            "scholarships": [
                "Provost's Scholarship (£5,000/year for high-achieving home students)",
                "UCL Undergraduate Bursary (up to £2,550/year, means-tested)",
                "Denys Holland Scholarship (covers fees and maintenance for exceptional students)",
                "Bloomberg UCL Scholarship (for students from under-represented backgrounds)"
            ],
            "bursaries": "UCL Undergraduate Bursary is automatically assessed — available to UK students from households with income under £42,620. Amount depends on household income.",
            "paymentPlan": "Tuition fees paid in three termly instalments. Interest-free instalment plan for home students via the student portal."
        },
        "employability": {
            "graduateEmploymentRate": "93%",
            "medianSalary": "£34,000 (15 months after graduation)",
            "topEmployers": [
                "GlaxoSmithKline",
                "AstraZeneca",
                "Francis Crick Institute",
                "NHS",
                "McKinsey & Company",
                "PwC",
                "Wellcome Trust"
            ],
            "careersService": "UCL Careers provides 1:1 advice, the UCL Innovation and Enterprise team supports start-up ventures, and the Biochemistry department runs dedicated careers seminars each term. London employer access is exceptional.",
            "placementYearAvailable": True
        },
        "research": {
            "refRating": "GPA 3.38/4.0 — Biological Sciences, top 8 in UK (REF 2021)",
            "strengthAreas": [
                "Structural biology and cryo-electron microscopy",
                "Molecular mechanisms of disease",
                "Chemical biology and drug discovery",
                "Systems biology and computational genomics",
                "Neuroscience and protein aggregation"
            ],
            "notableFacilities": [
                "Francis Crick Institute (UCL partner — one of Europe's largest biomedical research centres)",
                "UCL Crystallography Building — home to pioneering X-ray and cryo-EM facilities",
                "UCL Cancer Institute (University College Hospital complex)",
                "London Centre for Nanotechnology",
                "UCL Genomics laboratory"
            ],
            "industryPartners": [
                "GlaxoSmithKline",
                "AstraZeneca",
                "Roche",
                "Johnson & Johnson",
                "Bayer"
            ]
        },
        "facilities": {
            "libraries": [
                "Science Library — primary science library in the main UCL campus, extended hours",
                "UCL Main Library — general collections, open late during term time",
                "Senate House Library (University of London) — available to all UCL students"
            ],
            "sportsFacilities": "UCL Bloomsbury gym (on campus), Shenley Sports Ground (Hertfordshire, 20 miles, reachable by minibus), and 60+ sports clubs. Pool available via nearby leisure centre.",
            "studySpaces": "Science Library and Main Library open until midnight during term; 2,500+ study spaces across the estate; 24/7 access in some facilities during exam periods.",
            "labs": "Biochemistry teaching labs are modern and well-equipped. Final-year project students are integrated into research groups, often co-authoring published papers.",
            "wellbeing": "UCL Student Support and Wellbeing team provides counselling, mental health advisers, and a 24/7 crisis line. Togetherall online platform, Student Minds UCL chapter."
        },
        "satisfaction": {
            "nssOverall": 80,
            "teachingQuality": 83,
            "academicSupport": 79,
            "learningResources": 85
        },
        "travelFromLondon": {
            "trainTime": "On campus — Bloomsbury is in central London",
            "trainFromStation": "Euston Square / Russell Square (5-min walk from campus)",
            "trainToStation": "Euston Square Underground (Circle/Hammersmith & City/Metropolitan lines)",
            "coachTime": "N/A — central London location",
            "drivingTime": "N/A — central London; parking very limited",
            "distanceMiles": "Located in London WC1",
            "nearestAirport": "London Heathrow (45 min via Underground), London City Airport (40 min via DLR)"
        },
        "accessibility": {
            "disabilityService": "UCL Student Support and Wellbeing — Disability team provides support plans, specialist mentoring, exam adjustments, and assistive technology. Self-refer via online portal.",
            "accessibleAccommodation": "Several UCL halls have accessible en-suite rooms. Accessibility requirements flagged at accommodation application stage. Newer residences (e.g. Carpenter's Road) fully accessible.",
            "mentalHealthSupport": "UCL counselling service (free, up to 12 sessions), mental health advisers, Togetherall (24/7), and wellbeing drop-in appointments. Student Minds UCL peer support.",
            "dyslexiaSupport": "SpLD assessment, specialist study skills tuition, assistive technology, and automatic exam adjustments arranged through the Disability team.",
            "campusAccessibility": "UCL's Bloomsbury campus is largely accessible — step-free routes to main buildings, lifts installed. Older buildings vary. AccessAble guide published for each building."
        },
        "international": {
            "visaSupport": "UCL Student Immigration Advice provides CAS letters, Student Visa guidance, and Graduate Route support. Pre-arrival webinars and digital immigration portal.",
            "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for Biochemistry; some routes require 7.0.",
            "orientationProgramme": "UCL International Student Orientation Week: NHS registration, UK banking, city transport, and academic culture sessions. International buddy scheme and departmental welcome events.",
            "internationalSocietiesCount": "75+ international and cultural societies",
            "popularCountries": [
                "China",
                "India",
                "United States",
                "Germany",
                "Malaysia",
                "Singapore",
                "Italy"
            ]
        },
        "contact": {
            "admissionsEmail": "admissions@ucl.ac.uk",
            "admissionsPhone": "+44 (0)20 3108 8000",
            "address": "University College London, Gower Street, London WC1E 6BT",
            "openDayContact": "opendays@ucl.ac.uk"
        }
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
        "rankings": {
            "complete": 5,
            "guardian": 6,
            "times": 6,
            "qsWorld": 22,
            "theWorld": 30,
            "russellGroup": True,
            "year": "2025"
        },
        "reputation": "Edinburgh is one of the UK's ancient universities and a global top 30 institution. Its School of Biological Sciences is internationally recognised, and the Roslin Institute — where Dolly the sheep was cloned — is one of the most famous biological research facilities in the world. Edinburgh's unique 4-year Honours degree structure allows students a broader first year before specialising, giving more flexibility than most English universities. The Edinburgh BioQuarter is a top-5 European life sciences cluster, providing exceptional industry exposure.",
        "fees": {
            "homeUndergrad": "£9,535/year (Rest of UK students; Scottish students may qualify for SAAS funding)",
            "internationalUndergrad": "£29,900–£33,200/year",
            "livingCostEstimate": "£13,500–£18,000/year (Edinburgh is moderately expensive — lower than London, higher than most northern cities)"
        },
        "funding": {
            "scholarships": [
                "Edinburgh Global Research Scholarships (for high-achieving international students)",
                "Saltire Scholarships (funded by Scottish Government — for international students from select countries)",
                "Edinburgh Award Bursary (for UK students from under-represented backgrounds)",
                "Principal's Career Development Scholarship (postgraduate — highly competitive)"
            ],
            "bursaries": "Edinburgh Access Bursary provides support for UK students who have participated in widening access programmes. SAAS (Student Awards Agency Scotland) funds tuition for eligible Scottish-domiciled students.",
            "paymentPlan": "Tuition fees paid in two semester instalments. International students may pay in instalments with a deposit required before enrolment."
        },
        "employability": {
            "graduateEmploymentRate": "91%",
            "medianSalary": "£30,000 (15 months after graduation)",
            "topEmployers": [
                "NHS Scotland",
                "AstraZeneca",
                "Novartis",
                "MRC",
                "Wellcome Sanger Institute",
                "Scottish Government",
                "University spinouts via Edinburgh Innovations"
            ],
            "careersService": "Edinburgh Careers Service provides 1:1 appointments, employer events, the Edinburgh Award (employability accreditation), and a dedicated sciences career pathway. Edinburgh's global alumni network of 300,000+ is a major asset.",
            "placementYearAvailable": True
        },
        "research": {
            "refRating": "GPA 3.33/4.0 — Biological Sciences, top 10 in UK (REF 2021)",
            "strengthAreas": [
                "Animal and plant biotechnology (Roslin Institute)",
                "Infection, immunity and inflammation",
                "Neuroscience and dementia research",
                "Synthetic and chemical biology",
                "Genome biology and bioinformatics"
            ],
            "notableFacilities": [
                "Roslin Institute — world-famous animal and biotechnology research, creators of Dolly the sheep",
                "Edinburgh BioQuarter — 2M sq ft life sciences campus (one of Europe's largest)",
                "Queens Medical Research Institute — translational medical research",
                "Edinburgh Genome Foundry — automated synthetic biology platform",
                "Easter Bush Campus — large animal research facility"
            ],
            "industryPartners": [
                "AstraZeneca",
                "Novartis",
                "Boehringer Ingelheim",
                "MSD (Merck)",
                "Zoetis (animal health)"
            ]
        },
        "facilities": {
            "libraries": [
                "Main University Library — one of the largest in the UK with 2.5M+ items, open 24/7 during exams",
                "Darwin Library — primary science library with specialist biological sciences collections",
                "Edinburgh College of Art Library — creative arts collections"
            ],
            "sportsFacilities": "Pleasance Sports Complex (on-campus — gym, courts, pool), Peffermill Playing Fields (2 miles, outdoor pitches), and 50+ sports clubs including rugby, rowing and hillwalking.",
            "studySpaces": "Main Library open 24/7 during term; 3,000+ study spaces across the estate; silent and collaborative zones; bookable rooms.",
            "labs": "Biochemistry and biosciences teaching labs are modern and extensively equipped. Year 3 and 4 project students undertake research in front-line labs at the King's Buildings or BioQuarter campuses.",
            "wellbeing": "Student Counselling Service (free), mental health advisers, Student Advice Place (SU-run), and Nightline peer-support phone service. Each school has a student support officer."
        },
        "satisfaction": {
            "nssOverall": 83,
            "teachingQuality": 86,
            "academicSupport": 82,
            "learningResources": 88
        },
        "travelFromLondon": {
            "trainTime": "4h 20m (fastest LNER service)",
            "trainFromStation": "London King's Cross",
            "trainToStation": "Edinburgh Waverley",
            "coachTime": "9h 00m (National Express — overnight options available)",
            "drivingTime": "7h 00m (A1/M1, off-peak)",
            "distanceMiles": "401 miles north of London",
            "nearestAirport": "Edinburgh Airport (30 min by tram from city centre; flights to 150+ destinations including direct London routes from £30)"
        },
        "accessibility": {
            "disabilityService": "Disability and Learning Support Service provides support plans, exam adjustments, assistive technology and specialist mentoring. Self-refer at any point in the year.",
            "accessibleAccommodation": "Several halls including Pollock Halls have accessible rooms. Accessibility requirements noted at accommodation application — early application strongly recommended.",
            "mentalHealthSupport": "Student Counselling Service (free, up to 8 sessions), mental health practitioners, Togetherall (24/7), and Nightline peer support (term-time evenings).",
            "dyslexiaSupport": "SpLD screening and assessment, specialist study skills tuition, assistive technology (Dragon, Read&Write), and exam adjustments through the Disability and Learning Support Service.",
            "campusAccessibility": "Edinburgh's multiple campuses vary in accessibility — central campus (Old College) has some historic building constraints, but the King's Buildings science campus and BioQuarter are modern and step-free. Campus access guides available."
        },
        "international": {
            "visaSupport": "International Student Advisory Service provides Student Visa guidance, CAS issuance, and Graduate Route advice. Pre-arrival webinar series and a dedicated immigration helpdesk.",
            "englishRequirements": "IELTS 6.5 overall (6.5 in writing; 6.0 in other components) for Biochemistry and Biological Sciences.",
            "orientationProgramme": "International Student Orientation (one week before term): UK banking, NHS registration, EUSA Welcome Fair, and cultural orientation. City tours and buddy scheme included.",
            "internationalSocietiesCount": "60+ international and cultural societies",
            "popularCountries": [
                "China",
                "United States",
                "India",
                "Pakistan",
                "Germany",
                "Canada",
                "Malaysia"
            ]
        },
        "contact": {
            "admissionsEmail": "admissions@ed.ac.uk",
            "admissionsPhone": "+44 (0)131 650 4360",
            "address": "University of Edinburgh, Old College, South Bridge, Edinburgh EH8 9YL",
            "openDayContact": "opendays@ed.ac.uk"
        }
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
        "rankings": {
            "complete": 4,
            "guardian": 4,
            "times": 4,
            "qsWorld": 90,
            "theWorld": 174,
            "russellGroup": True,
            "year": "2025"
        },
        "reputation": "Durham is consistently ranked in the UK top 5, punching well above its size. Its collegiate system — modelled on Oxford and Cambridge — creates exceptionally close-knit academic communities with strong pastoral support. The Department of Biosciences is research-active with particular strength in chemical biology, structural biochemistry and plant science. Durham's reputation for producing well-rounded graduates is outstanding — it is one of the most popular choices for students who narrowly miss Oxbridge.",
        "fees": {
            "homeUndergrad": "£9,535/year",
            "internationalUndergrad": "£24,000–£27,500/year",
            "livingCostEstimate": "£10,500–£13,500/year (Durham is one of the most affordable university cities in the UK)"
        },
        "funding": {
            "scholarships": [
                "Durham Excellence Scholarship (£2,000/year for A*A*A+ entry)",
                "International Excellence Scholarship (£3,000 fee reduction for high-achieving international students)",
                "Durham Access Bursary (up to £2,000/year for UK students from households under £35,000)",
                "Sports Scholarship (for students competing at national or international level)"
            ],
            "bursaries": "Durham Access Bursary automatically assessed via UCAS for eligible UK students. Additional college-based hardship funds available in most of Durham's 17 colleges.",
            "paymentPlan": "Fees paid in three termly instalments via the student portal. Hardship fund available for students in financial difficulty."
        },
        "employability": {
            "graduateEmploymentRate": "94%",
            "medianSalary": "£30,500 (15 months after graduation)",
            "topEmployers": [
                "NHS",
                "AstraZeneca",
                "Procter & Gamble",
                "GSK",
                "PwC",
                "Deloitte",
                "Newcastle NHS Foundation Trust"
            ],
            "careersService": "Durham Careers and Enterprise Service offers 1:1 career coaching, employer insight events, and the Duke of Edinburgh's Award programme. The collegiate system facilitates direct alumni networking, and Durham's employers are particularly strong in the pharmaceutical and North East industrial sectors.",
            "placementYearAvailable": True
        },
        "research": {
            "refRating": "GPA 3.11/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": [
                "Chemical biology and supramolecular chemistry",
                "Structural biology and protein biochemistry",
                "Plant biochemistry and food security",
                "Neuroscience and cellular signalling",
                "Environmental biochemistry"
            ],
            "notableFacilities": [
                "Biophysical Sciences Institute — cross-disciplinary research hub",
                "Integrated Microscopy Centre — confocal and electron microscopy",
                "Durham X-ray Centre — protein crystallography",
                "Northeast Proteomics Facility",
                "Joint access to Newcastle Biomedical Research Centre (NHS)"
            ],
            "industryPartners": [
                "AstraZeneca",
                "Procter & Gamble (Tyne & Wear R&D site)",
                "GSK",
                "NSG Group (materials science)",
                "Newcastle NHS Foundation Trust"
            ]
        },
        "facilities": {
            "libraries": [
                "Palace Green Library — main university library in a historic 17th-century building; open until midnight",
                "Bill Bryson Library — science-focused with modern study facilities, open 24/7 during exams",
                "Each college has its own library for late-night study"
            ],
            "sportsFacilities": "Maiden Castle Sport and Wellness Hub — 50m pool, gym, sports hall, climbing wall, courts. College sports teams in every sport. Over 70 sports clubs across the university.",
            "studySpaces": "Bill Bryson Library 24/7 during exams; 2,000+ study spaces; college libraries open late; bookable quiet study rooms.",
            "labs": "Biosciences teaching labs recently refurbished — modern microscopy, cell culture and molecular biology facilities. Final-year project students work in research labs with dedicated supervisors.",
            "wellbeing": "Student Wellbeing team provides counselling, mental health support, and a disability advisory service. Each college has a junior common room wellbeing rep and a senior tutor for pastoral matters."
        },
        "satisfaction": {
            "nssOverall": 87,
            "teachingQuality": 90,
            "academicSupport": 88,
            "learningResources": 89
        },
        "travelFromLondon": {
            "trainTime": "2h 40m (fastest LNER service)",
            "trainFromStation": "London King's Cross",
            "trainToStation": "Durham",
            "coachTime": "5h 30m (National Express)",
            "drivingTime": "4h 30m (A1(M), off-peak)",
            "distanceMiles": "258 miles north of London",
            "nearestAirport": "Newcastle International Airport (30 min by car/bus; flights to 80+ destinations)"
        },
        "accessibility": {
            "disabilityService": "Durham Disability Support Service provides support plans, exam adjustments, specialist mentoring, and assistive technology. Self-refer online — no GP letter required.",
            "accessibleAccommodation": "Accessible rooms in several colleges including Josephine Butler, Van Mildert and Trevelyan. Accessibility requirements flagged at accommodation allocation — college allocations take disability into account.",
            "mentalHealthSupport": "Durham Counselling Service (free), mental health advisers in each college, Nightline peer listening service, and Togetherall (24/7 online).",
            "dyslexiaSupport": "SpLD assessment, specialist study skills tuition, Read&Write and Dragon assistive software, and exam adjustments co-ordinated through the Disability Support Service.",
            "campusAccessibility": "Durham's historic city-centre campus has some hilly terrain and older buildings with limited lift access. The science site (Lower Mountjoy) is more modern and generally accessible. AccessAble guide published for each building."
        },
        "international": {
            "visaSupport": "Durham International Student Experience team provides CAS letters, Student Visa guidance, and Graduate Route advice. Pre-arrival webinar series and online immigration portal.",
            "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for Biochemistry and Biosciences programmes.",
            "orientationProgramme": "International Student Welcome Week before Michaelmas term: NHS registration, UK banking, city tour, collegiate welcome events, and the International Students' Association welcome fair.",
            "internationalSocietiesCount": "40+ international and cultural societies",
            "popularCountries": [
                "China",
                "United States",
                "Germany",
                "India",
                "Malaysia",
                "Canada",
                "South Korea"
            ]
        },
        "contact": {
            "admissionsEmail": "admissions@durham.ac.uk",
            "admissionsPhone": "+44 (0)191 334 2000",
            "address": "Durham University, The Palatine Centre, Stockton Road, Durham DH1 3LE",
            "openDayContact": "opendays@durham.ac.uk"
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
