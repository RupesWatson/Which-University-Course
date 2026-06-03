#!/usr/bin/env python3
"""Enrich the remaining 17 biochemistry university entries."""

import json
from pathlib import Path

FILE = Path(__file__).parent / "src/data/biochemistry/university-details.json"

NEW_DATA = {
    "nottingham": {
        "website": "https://www.nottingham.ac.uk",
        "prospectus": "https://www.nottingham.ac.uk/study/undergraduates/",
        "socials": {
            "instagram": "https://www.instagram.com/uniofnottingham/",
            "twitter": "https://twitter.com/UniofNottingham",
            "youtube": "https://www.youtube.com/nottmuniversity",
            "tiktok": "https://www.tiktok.com/@uniofnottingham",
            "linkedin": "https://www.linkedin.com/school/university-of-nottingham/"
        },
        "rankings": {"complete": 17, "guardian": 16, "times": 17, "qsWorld": 105, "theWorld": 175, "russellGroup": True, "year": "2025"},
        "reputation": "Nottingham is a large, research-intensive Russell Group university with a beautiful leafy campus and a global reputation. Its School of Life Sciences is one of the largest in the UK, with outstanding research in molecular microbiology, structural biochemistry and plant science. Nottingham has a particularly strong industry presence — AstraZeneca, Boots and the NHS all have deep ties to the university — and its proximity to the East Midlands pharmaceutical corridor is a major advantage for biochemistry graduates.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£25,900–£28,880/year", "livingCostEstimate": "£10,500–£14,000/year (Nottingham is one of the UK's most affordable cities for students)"},
        "funding": {
            "scholarships": ["Nottingham Excellence Scholarship (£2,000/year for AAA+ entry)", "Vice-Chancellor's Global Scholarship (£3,000 fee reduction for international students)", "Nottingham Bursary (up to £2,000/year for UK students from households under £25,000)", "Sport Nottingham Scholarship (for elite athletes)"],
            "bursaries": "Nottingham Bursary automatically assessed from UCAS data. Care-experienced students receive enhanced support.",
            "paymentPlan": "Fees paid in three termly instalments via the student portal."
        },
        "employability": {"graduateEmploymentRate": "91%", "medianSalary": "£29,500 (15 months after graduation)", "topEmployers": ["AstraZeneca", "Boots/Alliance Healthcare", "NHS", "GSK", "Experian", "Capital One", "Nottingham University Hospitals Trust"], "careersService": "Nottingham Careers and Employability Service provides 1:1 advice, the Nottingham Advantage Award (employability accreditation), and a dedicated life sciences careers stream. Strong East Midlands pharmaceutical employer network.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 3.14/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": ["Molecular microbiology and antimicrobial resistance", "Structural biochemistry and NMR spectroscopy", "Plant science and food security", "Synthetic biology and metabolic engineering", "Cancer biology and drug discovery"],
            "notableFacilities": ["School of Life Sciences — one of the UK's largest life sciences buildings", "Boots Science Building — pharmaceutical and biochemistry research", "Centre for Biomolecular Sciences", "Nottingham BBSRC Doctoral Training Partnership", "Biomedical Research Unit (NHS-university joint)"],
            "industryPartners": ["AstraZeneca", "Boots", "GSK", "Unilever R&D", "Nottingham University Hospitals NHS Trust"]
        },
        "facilities": {
            "libraries": ["Hallward Library — main library open 24/7, 1M+ items", "George Green Library — science and engineering specialist collections", "Kings Meadow Campus Library — postgraduate and research collections"],
            "sportsFacilities": "David Ross Sports Village — 50m pool, gym, sports hall, courts, outdoor pitches and athletics track. Consistently rated one of the best university sport complexes in the UK. 70+ sports clubs.",
            "studySpaces": "Hallward Library open 24/7; 3,000+ study spaces; silent and collaborative zones.",
            "labs": "School of Life Sciences has modern, well-equipped teaching labs. Final-year project students are embedded in active research groups in molecular biology, structural biochemistry or plant science.",
            "wellbeing": "Wellbeing team provides counselling, mental health practitioners and a 24/7 crisis line. Student nightline service. Togetherall (24/7 online platform)."
        },
        "satisfaction": {"nssOverall": 84, "teachingQuality": 87, "academicSupport": 83, "learningResources": 88},
        "travelFromLondon": {"trainTime": "1h 45m (fastest East Midlands Railway)", "trainFromStation": "London St Pancras International", "trainToStation": "Nottingham", "coachTime": "2h 45m (National Express)", "drivingTime": "2h 00m (M1, off-peak)", "distanceMiles": "130 miles north of London", "nearestAirport": "East Midlands Airport (20 min by taxi; flights to 80+ destinations)"},
        "accessibility": {"disabilityService": "Disability Support team provides support plans, exam adjustments and assistive technology. Self-refer via the student services portal.", "accessibleAccommodation": "Accessible rooms available across several halls. Early application strongly recommended for students with accessibility requirements.", "mentalHealthSupport": "University counselling service, mental health advisers, Togetherall (24/7), and Nightline peer-listening service.", "dyslexiaSupport": "SpLD assessment, specialist study skills tuition, assistive technology and exam adjustments via Disability Support.", "campusAccessibility": "University Park campus is largely step-free with accessible routes. Electric buggy service for mobility-impaired students."},
        "international": {"visaSupport": "International Office provides Student Visa guidance, CAS issuance and Graduate Route advice. Pre-arrival webinars and dedicated portal.", "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for Life Sciences programmes.", "orientationProgramme": "International Welcome Week before term: NHS registration, UK banking, city orientation and cultural events.", "internationalSocietiesCount": "50+ international and cultural societies", "popularCountries": ["China", "Malaysia", "India", "United States", "Nigeria", "Saudi Arabia", "Germany"]},
        "contact": {"admissionsEmail": "undergraduate-enquiries@nottingham.ac.uk", "admissionsPhone": "+44 (0)115 951 5151", "address": "University of Nottingham, University Park, Nottingham NG7 2RD", "openDayContact": "undergraduate-enquiries@nottingham.ac.uk"}
    },

    "king-s-college-london": {
        "website": "https://www.kcl.ac.uk",
        "prospectus": "https://www.kcl.ac.uk/study/undergraduate",
        "socials": {
            "instagram": "https://www.instagram.com/kingscollegelondon/",
            "twitter": "https://twitter.com/KingsCollegeLon",
            "youtube": "https://www.youtube.com/kingscollegelondon",
            "tiktok": "https://www.tiktok.com/@kingscollegelondon",
            "linkedin": "https://www.linkedin.com/school/king's-college-london/"
        },
        "rankings": {"complete": 22, "guardian": 20, "times": 21, "qsWorld": 37, "theWorld": 35, "russellGroup": True, "year": "2025"},
        "reputation": "King's College London is one of the world's top 40 universities and the UK's most central Russell Group institution, with five campuses in the heart of London. Its School of Biochemistry (within the Faculty of Life Sciences and Medicine) benefits enormously from proximity to Guy's Hospital, King's College Hospital and St Thomas' Hospital — three of the UK's leading NHS teaching hospitals. This clinical interface gives biochemistry students unrivalled access to translational research and hospital-based careers. KCL has produced 13 Nobel Prize winners.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£31,000–£36,500/year", "livingCostEstimate": "£16,000–£24,000/year (central London — one of the most expensive locations in the UK)"},
        "funding": {
            "scholarships": ["King's College London Excellence Scholarship (£5,000/year for top-performing home students)", "King's International Scholarship (up to £5,000 fee reduction for exceptional international students)", "Principal's Global Scholarship (full fee waiver for highest-achieving international students)", "King's Bursary (up to £3,000/year for UK students from low-income households)"],
            "bursaries": "King's Bursary is automatically assessed from UCAS — available to UK students from households with income under £42,620 on a sliding scale.",
            "paymentPlan": "Fees paid in three termly instalments. Instalment plans available for international students."
        },
        "employability": {"graduateEmploymentRate": "93%", "medianSalary": "£35,000 (15 months after graduation)", "topEmployers": ["NHS (Guy's & St Thomas', King's College Hospital)", "GlaxoSmithKline", "AstraZeneca", "PwC", "Deloitte", "KPMG", "Wellcome Trust"], "careersService": "KCL Careers provides 1:1 advice, employer events, and a dedicated healthcare and life sciences careers stream. London employer access is exceptional — GSK, AZ and the NHS are all within easy reach.", "placementYearAvailable": False},
        "research": {
            "refRating": "GPA 3.32/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": ["Structural and molecular biology", "Cardiovascular biochemistry", "Neuroscience and brain biochemistry", "Infection biology and immunology", "Cancer cell biology"],
            "notableFacilities": ["Guys Campus — primary life sciences research site adjacent to Guy's Hospital", "School of Biomedical Engineering and Imaging Sciences", "Francis Crick Institute (associate partner)", "King's BHF Centre of Excellence (heart disease research)", "MRC Centre for Transplantation"],
            "industryPartners": ["GlaxoSmithKline", "AstraZeneca", "Johnson & Johnson", "NHS (five teaching hospitals)", "Wellcome Trust"]
        },
        "facilities": {
            "libraries": ["Maughan Library (Chancery Lane) — spectacular historic building, open 24/7", "Weston Education Centre Library (Denmark Hill) — biomedical collections", "St Thomas' Campus Library — clinical science resources"],
            "sportsFacilities": "Jubilee Sports Centre (Stamford Street) — gym, courts, sports hall. Multiple college sites have additional facilities. 60+ sports clubs. Some facilities shared with the wider University of London.",
            "studySpaces": "Maughan Library open 24/7; multiple campus libraries; 2,000+ study spaces across five campuses.",
            "labs": "Guy's Campus biochemistry teaching labs are modern and well-equipped, with direct access to hospital-grade analytical equipment. Final-year projects often involve hospital-based clinical biochemistry research.",
            "wellbeing": "Student Wellbeing Services provides counselling (free), mental health advisers and a disability service across all campuses. Togetherall (24/7). KCL Students' Union runs the Sanctuary mental health programme."
        },
        "satisfaction": {"nssOverall": 79, "teachingQuality": 82, "academicSupport": 78, "learningResources": 84},
        "travelFromLondon": {"trainTime": "On campus — multiple central London sites (Strand, Guy's/London Bridge, Waterloo, Denmark Hill)", "trainFromStation": "Waterloo, London Bridge, Elephant & Castle (all within walking distance of KCL campuses)", "trainToStation": "London Bridge (Jubilee/Northern lines); Waterloo (Jubilee/Waterloo lines)", "coachTime": "N/A — central London", "drivingTime": "N/A — central London; parking very limited", "distanceMiles": "Multiple campuses in central London (SE1, WC2, SW1)", "nearestAirport": "London City Airport (25 min via DLR); Heathrow (45 min via Underground)"},
        "accessibility": {"disabilityService": "KCL Disability Support provides support plans, exam adjustments and assistive technology across all campuses. Self-refer via the online portal.", "accessibleAccommodation": "Several KCL halls have accessible rooms. Accessibility requirements flagged at accommodation application — contact the team early.", "mentalHealthSupport": "Counselling service (free, up to 8 sessions), mental health advisers, Togetherall (24/7), and KCL Sanctuary mental health programme.", "dyslexiaSupport": "SpLD assessment, specialist study skills tuition, assistive technology and exam adjustments through Disability Support.", "campusAccessibility": "KCL's multiple London campuses vary — the Strand and Guy's campuses are largely accessible, with lifts in most buildings. Campus accessibility guides published via AccessAble."},
        "international": {"visaSupport": "KCL International Student Support provides CAS letters, Student Visa guidance and Graduate Route advice. Pre-arrival webinars and dedicated immigration advisers.", "englishRequirements": "IELTS 7.0 overall (6.5 in each component) for Biochemistry and Life Sciences programmes.", "orientationProgramme": "KCL Welcome Week: NHS registration, London transport orientation, cultural events and departmental welcome. International Student Buddy Scheme via KCL Students' Union.", "internationalSocietiesCount": "80+ international and cultural societies", "popularCountries": ["China", "India", "United States", "Germany", "Malaysia", "Greece", "Hong Kong"]},
        "contact": {"admissionsEmail": "admissions@kcl.ac.uk", "admissionsPhone": "+44 (0)20 7836 5454", "address": "King's College London, Strand, London WC2R 2LS", "openDayContact": "admissions@kcl.ac.uk"}
    },

    "birmingham": {
        "website": "https://www.birmingham.ac.uk",
        "prospectus": "https://www.birmingham.ac.uk/undergraduate/",
        "socials": {
            "instagram": "https://www.instagram.com/unibirmingham/",
            "twitter": "https://twitter.com/unibirmingham",
            "youtube": "https://www.youtube.com/unibirmingham",
            "tiktok": "https://www.tiktok.com/@unibirmingham",
            "linkedin": "https://www.linkedin.com/school/university-of-birmingham/"
        },
        "rankings": {"complete": 23, "guardian": 22, "times": 23, "qsWorld": 90, "theWorld": 125, "russellGroup": True, "year": "2025"},
        "reputation": "Birmingham is a large, research-intensive Russell Group university ranked in the global top 100 and known for its distinctive circular Aston Webb campus. Its School of Biosciences is one of the largest in the UK, with strong research in microbiology, protein biochemistry and metabolic disease. Birmingham is uniquely positioned in the heart of England, with strong links to the West Midlands NHS networks and a thriving regional life sciences cluster. It is one of the most international universities in the UK.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£23,580–£27,090/year", "livingCostEstimate": "£11,000–£15,000/year (Birmingham is excellent value for a major UK city)"},
        "funding": {
            "scholarships": ["Birmingham International Scholarship (£2,000 fee reduction for high-achieving international students)", "Academic Excellence Award (£2,000 one-off for AAA+ A-level entry)", "Birmingham Bursary (up to £2,000/year for eligible UK students)", "Guild of Students Sport Scholarship (for elite athletes)"],
            "bursaries": "Birmingham Bursary automatically assessed from UCAS for eligible UK students. Care-experienced students receive enhanced support via the Sanctuary Scholarship.",
            "paymentPlan": "Fees paid in three termly instalments. Payment plans available for international students."
        },
        "employability": {"graduateEmploymentRate": "90%", "medianSalary": "£29,000 (15 months after graduation)", "topEmployers": ["NHS (University Hospitals Birmingham)", "AstraZeneca", "GSK", "Jaguar Land Rover", "KPMG", "PwC", "Cadbury/Mondelez"], "careersService": "Birmingham Careers Network offers 1:1 appointments, employer events, and the Birmingham Award (employability accreditation). Strong West Midlands NHS and life sciences employer links.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 3.10/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": ["Microbiology and infection biology", "Protein biochemistry and structural biology", "Metabolic disease and obesity research", "Plant biochemistry and food security", "Synthetic biology and biocatalysis"],
            "notableFacilities": ["School of Biosciences — modern research and teaching building", "Institute of Microbiology and Infection", "Centre for Systems Biology", "Birmingham Research Park (spinout and industry interface)", "University Hospitals Birmingham Research Facility"],
            "industryPartners": ["AstraZeneca", "GSK", "University Hospitals Birmingham NHS Trust", "Mondelez International", "Jaguar Land Rover (materials interface)"]
        },
        "facilities": {
            "libraries": ["Main Library — central library open 24/7, 1.5M+ items", "Barber Fine Art Library — specialist fine art collections", "Medical and Dental Library — biomedical sciences collections (part of UHB campus)"],
            "sportsFacilities": "Sport Birmingham — 50m pool, gym, sports hall, squash courts, outdoor pitches. Munrow Sports Centre on campus. 70+ sports clubs. Birmingham hosted the 2022 Commonwealth Games.",
            "studySpaces": "Main Library open 24/7; 2,500+ study spaces; silent, collaborative and individual zones.",
            "labs": "School of Biosciences teaching labs are well-equipped and regularly updated. Final-year project students work in research groups in microbiology, structural biology or metabolic science.",
            "wellbeing": "University Welfare team provides counselling, mental health support and disability services. Togetherall (24/7). Guild of Students (SU) wellbeing team and peer supporter network."
        },
        "satisfaction": {"nssOverall": 82, "teachingQuality": 85, "academicSupport": 81, "learningResources": 86},
        "travelFromLondon": {"trainTime": "52 minutes (fastest Avanti West Coast service)", "trainFromStation": "London Euston", "trainToStation": "Birmingham New Street", "coachTime": "2h 30m (National Express)", "drivingTime": "1h 45m (M40, off-peak)", "distanceMiles": "113 miles north-west of London", "nearestAirport": "Birmingham Airport (10 min by train from New Street; flights to 150+ destinations)"},
        "accessibility": {"disabilityService": "Disability Services provides support plans, exam adjustments, specialist mentoring and assistive technology. Self-refer via the student portal.", "accessibleAccommodation": "Several halls have accessible rooms. Accessibility requirements flagged at accommodation application stage.", "mentalHealthSupport": "University counselling service, mental health advisers, Togetherall (24/7), and the Guild of Students peer support programme.", "dyslexiaSupport": "SpLD assessment, specialist study skills tuition, assistive technology and exam adjustments via Disability Services.", "campusAccessibility": "Birmingham's circular campus is largely step-free with accessible routes. Most academic buildings have lifts. Campus accessibility guide available online."},
        "international": {"visaSupport": "International Student Advisory Service provides Student Visa guidance, CAS letters and Graduate Route advice. Pre-arrival webinar series and dedicated portal.", "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for Biosciences programmes.", "orientationProgramme": "International Welcome Week before term: NHS registration, UK banking, campus tour and cultural events. Guild International Society welcome fair.", "internationalSocietiesCount": "60+ international and cultural societies", "popularCountries": ["China", "India", "United States", "Malaysia", "Nigeria", "Saudi Arabia", "Germany"]},
        "contact": {"admissionsEmail": "admissions@contacts.bham.ac.uk", "admissionsPhone": "+44 (0)121 415 8900", "address": "University of Birmingham, Edgbaston, Birmingham B15 2TT", "openDayContact": "admissions@contacts.bham.ac.uk"}
    },

    "leeds": {
        "website": "https://www.leeds.ac.uk",
        "prospectus": "https://www.leeds.ac.uk/undergraduatestudy",
        "socials": {
            "instagram": "https://www.instagram.com/universityofleeds/",
            "twitter": "https://twitter.com/UniversityLeeds",
            "youtube": "https://www.youtube.com/universityofleeds",
            "tiktok": "https://www.tiktok.com/@universityofleeds",
            "linkedin": "https://www.linkedin.com/school/university-of-leeds/"
        },
        "rankings": {"complete": 11, "guardian": 12, "times": 12, "qsWorld": 82, "theWorld": 130, "russellGroup": True, "year": "2025"},
        "reputation": "Leeds is a large, research-intensive Russell Group university consistently ranked in the UK top 15 and globally top 100. Its Faculty of Biological Sciences has world-leading research in astrobiology, structural biochemistry and plant science, and the university has particularly strong industry links to the food and pharmaceutical sectors of the Yorkshire region. Leeds is also one of the UK's best student cities — vibrant, affordable and consistently popular with undergraduates.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£23,750–£27,750/year", "livingCostEstimate": "£11,000–£14,500/year (Leeds is one of the UK's most affordable major cities)"},
        "funding": {
            "scholarships": ["Leeds International Excellence Award (£3,000/year for high-achieving international students)", "Academic Achievement Scholarship (£2,000 one-off for AAA+ entry)", "Leeds Bursary (up to £1,000/year for UK students from low-income households)", "Laidlaw Research and Leadership Scholarship (undergraduate research funding)"],
            "bursaries": "Leeds Bursary automatically assessed from UCAS for eligible UK students. Additional faculty-level hardship funds available.",
            "paymentPlan": "Fees paid in three termly instalments via the student portal."
        },
        "employability": {"graduateEmploymentRate": "91%", "medianSalary": "£29,500 (15 months after graduation)", "topEmployers": ["NHS (Leeds Teaching Hospitals)", "GSK", "Procter & Gamble", "Asda (food science)", "FERA Science", "Unilever", "Marks & Spencer Food"], "careersService": "Leeds Careers Centre provides 1:1 advice, employer events and the Leeds for Life Award (employability accreditation). Strong links to Yorkshire food, pharma and healthcare employers.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 3.22/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": ["Astrobiology and origins of life", "Structural biochemistry and electron microscopy", "Plant cell biology and food security", "Molecular biophysics and membrane proteins", "Cancer biochemistry and cell signalling"],
            "notableFacilities": ["Astbury Centre for Structural Molecular Biology — world-leading structural biology (cryo-EM, X-ray)", "School of Molecular and Cellular Biology", "Leeds Electron Microscopy and Spectroscopy Centre (LEMAS)", "Centre for Plant Sciences", "Food Colloids Group — internationally recognised food biochemistry"],
            "industryPartners": ["Procter & Gamble (Egham R&D)", "GSK", "Unilever R&D", "FERA Science", "Leeds Teaching Hospitals NHS Trust"]
        },
        "facilities": {
            "libraries": ["Brotherton Library — Grade II listed historic library, specialist humanities collections", "Edward Boyle Library — main science library, open 24/7", "Health Sciences Library — biomedical specialist collections"],
            "sportsFacilities": "Edge Sports Centre — gym, 25m pool, sports hall, climbing wall, squash courts. Weetwood playing fields (2 miles). 75+ sports clubs.",
            "studySpaces": "Edward Boyle Library open 24/7; 3,500+ study spaces; silent and collaborative zones.",
            "labs": "Astbury Centre facilities are some of the best in Europe for structural biochemistry. Teaching labs are modern; final-year project students work in research groups in structural biology, plant science or molecular biophysics.",
            "wellbeing": "Leeds Student Counselling service, mental health practitioners, Togetherall (24/7), and the LUU (Leeds University Union) Student Wellbeing team and peer support."
        },
        "satisfaction": {"nssOverall": 83, "teachingQuality": 86, "academicSupport": 82, "learningResources": 87},
        "travelFromLondon": {"trainTime": "2h 10m (fastest LNER service)", "trainFromStation": "London King's Cross", "trainToStation": "Leeds", "coachTime": "3h 30m (National Express / Megabus)", "drivingTime": "3h 00m (M1, off-peak)", "distanceMiles": "192 miles north of London", "nearestAirport": "Leeds Bradford Airport (30 min by taxi; flights to 70+ destinations)"},
        "accessibility": {"disabilityService": "Disability Services provides support plans, exam adjustments and assistive technology. Self-refer via the student services portal.", "accessibleAccommodation": "Accessible rooms in several halls. Early application recommended for students with specific requirements.", "mentalHealthSupport": "Student Counselling and Wellbeing service, mental health practitioners, Togetherall (24/7), and LUU peer support.", "dyslexiaSupport": "SpLD assessment, specialist study skills tuition, assistive technology and exam adjustments via Disability Services.", "campusAccessibility": "Leeds campus is largely step-free with accessible routes and lifts in all modern buildings. Some older buildings have limited access. AccessAble guide available online."},
        "international": {"visaSupport": "International Student Office provides Student Visa guidance, CAS letters and Graduate Route advice. Pre-arrival webinar series and portal.", "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for Biological Sciences programmes.", "orientationProgramme": "International Welcome Week before term: NHS registration, UK banking, city orientation and LUU International welcome events. Buddy scheme.", "internationalSocietiesCount": "55+ international and cultural societies", "popularCountries": ["China", "India", "United States", "Malaysia", "Nigeria", "Saudi Arabia", "Germany"]},
        "contact": {"admissionsEmail": "admissions@leeds.ac.uk", "admissionsPhone": "+44 (0)113 243 1751", "address": "University of Leeds, Woodhouse Lane, Leeds LS2 9JT", "openDayContact": "admissions@leeds.ac.uk"}
    },

    "york": {
        "website": "https://www.york.ac.uk",
        "prospectus": "https://www.york.ac.uk/study/undergraduate/",
        "socials": {
            "instagram": "https://www.instagram.com/uniofyork/",
            "twitter": "https://twitter.com/UniofYork",
            "youtube": "https://www.youtube.com/user/universityofyork",
            "tiktok": "https://www.tiktok.com/@uniofyork",
            "linkedin": "https://www.linkedin.com/school/university-of-york/"
        },
        "rankings": {"complete": 15, "guardian": 14, "times": 15, "qsWorld": 155, "theWorld": 201, "russellGroup": True, "year": "2025"},
        "reputation": "York is a collegiate Russell Group university consistently ranked in the UK top 15, founded on a campus of remarkable beauty around an artificial lake. Its Department of Biology is internationally recognised for research in evolutionary biology, structural biology and neuroscience. York is notably strong in biochemistry and chemical biology, and has produced Nobel Prize winners including Sir Martin Evans (stem cells) and Peter Doherty (immunology). York's high student satisfaction scores and beautiful campus make it a consistently popular choice.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£21,500–£25,900/year", "livingCostEstimate": "£11,000–£14,500/year (York is a beautiful historic city with moderate living costs)"},
        "funding": {
            "scholarships": ["York Scholarships (£2,000/year for top academic performers)", "International Excellence Scholarship (£3,000 fee reduction for high-achieving international students)", "York Financial Assistance Fund (means-tested for UK students in hardship)", "Coutts Scholarship (for students from low-income backgrounds)"],
            "bursaries": "York Financial Assistance Fund provides support for UK students experiencing financial hardship. Assessed on application.",
            "paymentPlan": "Fees paid in three termly instalments via the student portal."
        },
        "employability": {"graduateEmploymentRate": "90%", "medianSalary": "£29,000 (15 months after graduation)", "topEmployers": ["NHS (York and Leeds Teaching Hospitals)", "AstraZeneca", "Nestlé", "GSK", "Yorkshire Science", "York Biomedical Research Institute spinouts", "FERA Science"], "careersService": "York Careers and Placements provides 1:1 advice, employer events and the York Award (employability accreditation). Strong links to Yorkshire and North East life sciences employers.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 3.26/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": ["Structural and chemical biology", "Evolutionary biology and genomics", "Neuroscience and neurochemistry", "Plant biochemistry and metabolomics", "Infection biology and host-pathogen interactions"],
            "notableFacilities": ["York Biomedical Research Institute (YBRI) — flagship interdisciplinary research hub", "Bioscience Technology Facility — NMR, mass spectrometry, cryo-EM", "Centre for Chronic Diseases and Disorders (C2D2)", "Jack Birch Unit — molecular carcinogenesis", "York Centre for Complex Systems Analysis"],
            "industryPartners": ["Nestlé", "AstraZeneca", "GSK", "FERA Science", "Yorkshire Science cluster"]
        },
        "facilities": {
            "libraries": ["J.B. Morrell Library — main library on campus, open 24/7 during exams, 900,000+ items", "King's Manor Library — specialist arts and humanities collections", "Borthwick Institute for Archives — world-class historical archives"],
            "sportsFacilities": "Sport York — 25m pool, gym, sports hall, climbing wall, courts and outdoor pitches around the lake. 60+ sports clubs. Unique lakeside running routes on campus.",
            "studySpaces": "J.B. Morrell Library open 24/7 during exams; 1,500+ study spaces; silent and collaborative zones.",
            "labs": "Biology and Chemistry teaching labs are modern and well-equipped. Final-year project students work in the York Biomedical Research Institute labs, often alongside PhD students on cutting-edge projects.",
            "wellbeing": "Open Door wellbeing team provides counselling, mental health support and disability services. Togetherall (24/7). Each college has a welfare officer for pastoral matters."
        },
        "satisfaction": {"nssOverall": 86, "teachingQuality": 89, "academicSupport": 87, "learningResources": 88},
        "travelFromLondon": {"trainTime": "1h 50m (fastest LNER service)", "trainFromStation": "London King's Cross", "trainToStation": "York", "coachTime": "3h 30m (National Express)", "drivingTime": "2h 30m (A1(M), off-peak)", "distanceMiles": "188 miles north of London", "nearestAirport": "Leeds Bradford Airport (45 min by car; flights to 70+ destinations)"},
        "accessibility": {"disabilityService": "Disability Services provides support plans, exam adjustments and assistive technology. Self-refer via the student services portal.", "accessibleAccommodation": "All colleges have accessible rooms. York's purpose-built campus is largely step-free — one of the most accessible in the UK.", "mentalHealthSupport": "Open Door team counselling (free), mental health practitioners, Togetherall (24/7), Nightline peer-listening service.", "dyslexiaSupport": "SpLD assessment, specialist study skills tuition, assistive technology and exam adjustments via Disability Services.", "campusAccessibility": "York's campus is purpose-built and largely step-free with excellent accessibility throughout. Campus AccessAble guide available online."},
        "international": {"visaSupport": "International Student Support team provides Student Visa guidance, CAS letters and Graduate Route advice. Pre-arrival webinars and portal.", "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for Biology and Biochemistry programmes.", "orientationProgramme": "International Welcome Programme before term: NHS registration, UK banking, campus tour and YUSU (students' union) International welcome events.", "internationalSocietiesCount": "40+ international and cultural societies", "popularCountries": ["China", "India", "United States", "Germany", "Malaysia", "Canada", "Hong Kong"]},
        "contact": {"admissionsEmail": "admissions@york.ac.uk", "admissionsPhone": "+44 (0)1904 324000", "address": "University of York, Heslington, York YO10 5DD", "openDayContact": "opendays@york.ac.uk"}
    },

    "cardiff": {
        "website": "https://www.cardiff.ac.uk",
        "prospectus": "https://www.cardiff.ac.uk/study/undergraduate",
        "socials": {
            "instagram": "https://www.instagram.com/cardiffuni/",
            "twitter": "https://twitter.com/cardiffuni",
            "youtube": "https://www.youtube.com/cardiffuniversity",
            "tiktok": "https://www.tiktok.com/@cardiffuni",
            "linkedin": "https://www.linkedin.com/school/cardiff-university/"
        },
        "rankings": {"complete": 29, "guardian": 27, "times": 28, "qsWorld": 175, "theWorld": 301, "russellGroup": True, "year": "2025"},
        "reputation": "Cardiff is Wales's premier research university and the only Welsh institution in the Russell Group. Its School of Biosciences occupies a striking new building and has world-class research in microbiology, neuroscience and pharmacology. Cardiff has a uniquely bilingual character — offering some programmes through Welsh — and its compact, walkable city centre campus makes it one of the most enjoyable student cities in the UK. Cardiff is consistently voted one of the best cities to live and study in Europe.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£21,700–£26,500/year", "livingCostEstimate": "£10,500–£14,000/year (Cardiff is one of the most affordable capital cities in Europe for students)"},
        "funding": {
            "scholarships": ["Cardiff Vice-Chancellor's International Scholarship (£3,000 fee reduction)", "Wales Financial Contingency Fund (means-tested support for Welsh and UK students)", "Cardiff University Elite Sport Scholarship (for competitive athletes)", "Coleg Cymraeg Cenedlaethol Scholarships (for Welsh-medium study)"],
            "bursaries": "Means-tested financial support via the Wales Financial Contingency Fund. Welsh Government Learning Grant available for eligible Welsh-domiciled students.",
            "paymentPlan": "Fees paid in three termly instalments via the student portal."
        },
        "employability": {"graduateEmploymentRate": "89%", "medianSalary": "£28,500 (15 months after graduation)", "topEmployers": ["NHS Wales (Cardiff and Vale UHB)", "Public Health Wales", "Principality Building Society", "Welsh Government", "Sanofi Pasteur", "Allergan", "IQE (semiconductor materials)"], "careersService": "Cardiff Careers Service provides 1:1 advice, employer events and the Cardiff Award (employability accreditation). Strong NHS Wales and Welsh Government employer links.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 3.06/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": ["Microbiology and infection biology", "Neuroscience and brain biochemistry", "Pharmacology and drug discovery", "Plant science and environmental biology", "Structural biology and biophysics"],
            "notableFacilities": ["Biosciences Building — modern research and teaching facility (2020)", "Wales Gene Park — national genomics facility", "Systems Immunity Research Institute", "Cardiff University Brain Research Imaging Centre (CUBRIC)", "Biomedical Sciences Research Building (UHW campus)"],
            "industryPartners": ["AstraZeneca", "Sanofi Pasteur", "NHS Wales", "Wales Life Sciences Hub", "IQE"]
        },
        "facilities": {
            "libraries": ["Arts and Social Sciences Library — main city-centre library, open late", "Science Library — specialist collections for biosciences", "Cardiff University Special Collections and Archives"],
            "sportsFacilities": "Cardiff University Sport — gym, 25m pool, sports hall, courts and outdoor pitches. 60+ sports clubs. Access to national-standard facilities via proximity to Principality Stadium and Wales National Velodrome.",
            "studySpaces": "Multiple campus libraries with extended hours; 2,000+ study spaces; silent and group zones.",
            "labs": "The new Biosciences Building (2020) has state-of-the-art teaching labs. Final-year project students work in research groups in microbiology, neuroscience or structural biology.",
            "wellbeing": "Student Support team provides counselling, mental health advisers and disability services. Togetherall (24/7). Cardiff SU welfare team and peer-support programme."
        },
        "satisfaction": {"nssOverall": 82, "teachingQuality": 85, "academicSupport": 81, "learningResources": 85},
        "travelFromLondon": {"trainTime": "2h 00m (fastest Great Western Railway service)", "trainFromStation": "London Paddington", "trainToStation": "Cardiff Central", "coachTime": "3h 00m (National Express / Megabus)", "drivingTime": "2h 15m (M4, off-peak)", "distanceMiles": "150 miles west of London", "nearestAirport": "Cardiff Airport (30 min by bus/rail; flights to 40+ destinations)"},
        "accessibility": {"disabilityService": "Disability and Dyslexia Service provides support plans, exam adjustments and assistive technology. Self-refer via the student services portal.", "accessibleAccommodation": "Accessible rooms available across university halls. Accessibility requirements noted at accommodation application.", "mentalHealthSupport": "Counselling service, mental health advisers, Togetherall (24/7), and Cardiff SU Advice and Support peer programme.", "dyslexiaSupport": "SpLD assessment, specialist study skills tuition, assistive technology and exam adjustments via the Disability and Dyslexia Service.", "campusAccessibility": "Cardiff's city-centre campus is largely accessible. The new Biosciences Building is fully step-free. Campus accessibility guide available online."},
        "international": {"visaSupport": "International Student Advisory Service provides Student Visa guidance, CAS letters and Graduate Route advice. Pre-arrival webinars and dedicated portal.", "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for Biosciences programmes.", "orientationProgramme": "International Welcome Week before term: NHS registration, UK banking, city tour and Cardiff University International Society welcome events.", "internationalSocietiesCount": "45+ international and cultural societies", "popularCountries": ["China", "India", "Malaysia", "United States", "Saudi Arabia", "Nigeria", "Greece"]},
        "contact": {"admissionsEmail": "admissions@cardiff.ac.uk", "admissionsPhone": "+44 (0)29 2087 9999", "address": "Cardiff University, Main Building, Park Place, Cardiff CF10 3AT", "openDayContact": "opendays@cardiff.ac.uk"}
    },

    "newcastle": {
        "website": "https://www.ncl.ac.uk",
        "prospectus": "https://www.ncl.ac.uk/undergraduate/",
        "socials": {
            "instagram": "https://www.instagram.com/newcastleuni/",
            "twitter": "https://twitter.com/UniofNewcastle",
            "youtube": "https://www.youtube.com/newcastleuniversity",
            "tiktok": "https://www.tiktok.com/@newcastleuni",
            "linkedin": "https://www.linkedin.com/school/newcastle-university/"
        },
        "rankings": {"complete": 22, "guardian": 21, "times": 22, "qsWorld": 135, "theWorld": 175, "russellGroup": True, "year": "2025"},
        "reputation": "Newcastle is a Russell Group university with a strong research reputation and one of the most vibrant student cities in the UK. Its Faculty of Medical Sciences has outstanding research in ageing, neuroscience and molecular biology. Newcastle's Biosciences Institute — a world-leading centre for ageing research — gives biochemistry students unique access to translational research linking molecular biochemistry to healthy ageing and disease. Newcastle is also consistently voted one of the friendliest student cities in the UK.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£24,800–£27,900/year", "livingCostEstimate": "£10,500–£14,000/year (Newcastle is one of the best-value student cities in the UK)"},
        "funding": {
            "scholarships": ["Newcastle University Excellence Scholarship (£3,000 one-off for AAA+ entry)", "International Excellence Scholarship (£3,000 fee reduction for high-achieving international students)", "Newcastle University Bursary (up to £2,000/year for eligible UK students)", "Sport Excellence Award (for elite athletes)"],
            "bursaries": "Newcastle University Bursary automatically assessed from UCAS for eligible UK students.",
            "paymentPlan": "Fees paid in three termly instalments via the student portal."
        },
        "employability": {"graduateEmploymentRate": "91%", "medianSalary": "£29,500 (15 months after graduation)", "topEmployers": ["NHS (Newcastle Hospitals NHS Trust)", "AstraZeneca", "GSK", "Procter & Gamble", "Sage Group", "Accenture", "Sanofi"], "careersService": "Newcastle Careers Service provides 1:1 advice, employer events and the Newcastle Award (employability accreditation). Strong North East NHS and life sciences employer links.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 3.12/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": ["Ageing biology and healthy longevity", "Neuroscience and neurodegeneration", "Molecular microbiology and antimicrobial resistance", "Structural biology and protein biochemistry", "Mitochondrial biology and metabolism"],
            "notableFacilities": ["Biosciences Institute — world-leading ageing research centre", "Newcastle Institute for Ageing (NICA)", "Centre for Molecular and Structural Biochemistry", "Northern Institute for Cancer Research", "NE England Stem Cell Institute"],
            "industryPartners": ["AstraZeneca", "GSK", "Procter & Gamble (North East R&D)", "Newcastle Hospitals NHS Trust", "Unilever"]
        },
        "facilities": {
            "libraries": ["Philip Robinson Library — main library open 24/7, 1M+ items", "Walton Library (Royal Victoria Infirmary campus) — medical and biomedical sciences", "Devere Library — specialist collections"],
            "sportsFacilities": "Sport Central — gym, 25m pool, sports hall, squash courts. Cochrane Park (off-campus) — outdoor pitches and athletics. 60+ sports clubs.",
            "studySpaces": "Philip Robinson Library open 24/7; 2,500+ study spaces; silent and collaborative zones.",
            "labs": "Biosciences Institute and Faculty of Medical Sciences teaching labs are modern and research-grade. Final-year project students work in research groups in ageing biology, neuroscience or structural biochemistry.",
            "wellbeing": "Counselling and Wellbeing team provides counselling, mental health support and disability services. Togetherall (24/7). NUSU (students' union) peer support."
        },
        "satisfaction": {"nssOverall": 84, "teachingQuality": 87, "academicSupport": 84, "learningResources": 87},
        "travelFromLondon": {"trainTime": "2h 40m (fastest LNER service)", "trainFromStation": "London King's Cross", "trainToStation": "Newcastle Central", "coachTime": "5h 30m (National Express)", "drivingTime": "4h 00m (A1(M), off-peak)", "distanceMiles": "277 miles north of London", "nearestAirport": "Newcastle International Airport (25 min by Metro; flights to 80+ destinations)"},
        "accessibility": {"disabilityService": "Disability Support Service provides support plans, exam adjustments and assistive technology. Self-refer via the online portal.", "accessibleAccommodation": "Accessible rooms available in several halls. Accessibility requirements flagged at accommodation application.", "mentalHealthSupport": "Counselling and Wellbeing service, mental health practitioners, Togetherall (24/7), and NUSU peer support network.", "dyslexiaSupport": "SpLD assessment, specialist study skills tuition, assistive technology and exam adjustments via Disability Support.", "campusAccessibility": "Newcastle's city-centre campus is largely step-free with lifts in most buildings. Campus accessibility guide available via AccessAble."},
        "international": {"visaSupport": "International Student Experience team provides Student Visa guidance, CAS letters and Graduate Route advice. Pre-arrival webinars and dedicated portal.", "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for Biosciences programmes.", "orientationProgramme": "International Welcome Week before term: NHS registration, UK banking, city tour and NUSU International welcome events.", "internationalSocietiesCount": "45+ international and cultural societies", "popularCountries": ["China", "India", "Malaysia", "United States", "Saudi Arabia", "Nigeria", "Germany"]},
        "contact": {"admissionsEmail": "admissions@ncl.ac.uk", "admissionsPhone": "+44 (0)191 208 3333", "address": "Newcastle University, King's Gate, Newcastle upon Tyne NE1 7RU", "openDayContact": "opendays@ncl.ac.uk"}
    },

    "glasgow": {
        "website": "https://www.gla.ac.uk",
        "prospectus": "https://www.gla.ac.uk/study/undergraduate/",
        "socials": {
            "instagram": "https://www.instagram.com/uofglasgow/",
            "twitter": "https://twitter.com/UofGlasgow",
            "youtube": "https://www.youtube.com/universityofglasgow",
            "tiktok": "https://www.tiktok.com/@uofglasgow",
            "linkedin": "https://www.linkedin.com/school/university-of-glasgow/"
        },
        "rankings": {"complete": 20, "guardian": 19, "times": 20, "qsWorld": 73, "theWorld": 125, "russellGroup": True, "year": "2025"},
        "reputation": "Glasgow is one of the UK's ancient universities, founded in 1451, and a global top 75 institution. Its College of Medical, Veterinary and Life Sciences is internationally renowned, with world-class research in infection biology, cancer biochemistry and structural biology. Glasgow's unique 4-year Scottish Honours degree structure provides a broader first year before specialisation. The university's campus in the West End of Glasgow is stunning — described as one of the most beautiful in the world — and Glasgow itself is one of Europe's most vibrant and affordable major cities.",
        "fees": {"homeUndergrad": "£9,535/year (Rest of UK students; Scottish students may qualify for SAAS funding)", "internationalUndergrad": "£22,900–£28,600/year", "livingCostEstimate": "£12,000–£15,500/year (Glasgow is excellent value for a major European city)"},
        "funding": {
            "scholarships": ["Saltire Scholarship (funded by Scottish Government — for international students from select countries)", "Glasgow Global Scholarship (£3,000 fee reduction for high-achieving international students)", "Undergraduate Access Scholarship (for students from widening access backgrounds)", "Principal's Award (for exceptional academic achievement)"],
            "bursaries": "SAAS (Student Awards Agency Scotland) funds tuition fees for eligible Scottish-domiciled students. University Hardship Fund available for students in financial difficulty.",
            "paymentPlan": "Fees paid in two semester instalments. International students may pay in instalments with a deposit required at enrolment."
        },
        "employability": {"graduateEmploymentRate": "91%", "medianSalary": "£29,000 (15 months after graduation)", "topEmployers": ["NHS Scotland (Greater Glasgow and Clyde)", "AstraZeneca", "GSK", "Scottish Government", "Weir Group", "STV Group", "Scottish Enterprise spinouts"], "careersService": "Glasgow Careers Service provides 1:1 advice, employer events and the Glasgow Advantage Award (employability accreditation). Strong NHS Scotland and Scottish life sciences employer links.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 3.30/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": ["Infection biology and global health", "Cancer biochemistry and cell biology", "Structural biology and cryo-EM", "Immunology and inflammation", "Parasitology and tropical disease"],
            "notableFacilities": ["Wolfson Wohl Cancer Research Centre", "MRC-University of Glasgow Centre for Virus Research (CVR) — one of Europe's largest virology research centres", "Institute of Infection, Immunity and Inflammation", "Glasgow Polyomics — advanced metabolomics and genomics", "Electron Microscopy facility (Mazumdar-Shaw Advanced Research Centre)"],
            "industryPartners": ["AstraZeneca", "GSK", "NHS Greater Glasgow and Clyde", "Scottish Enterprise", "LifeSciences Scotland cluster"]
        },
        "facilities": {
            "libraries": ["University Library — stunning neo-Gothic building with 2M+ items, open late", "James Ireland Memorial Library — life sciences specialist collections", "Special Collections — rare manuscripts and historical archives"],
            "sportsFacilities": "Stevenson Building Sports Centre — gym, 25m pool, sports hall, courts. Garscube Sports Complex (nearby) — outdoor pitches and athletics. 80+ sports clubs.",
            "studySpaces": "University Library extended hours; 2,500+ study spaces; silent and collaborative zones.",
            "labs": "Life Sciences teaching labs are well-equipped and modern. Final-year project students work in research groups at the Wolfson Wohl Centre, MRC CVR or the Institute of Infection, Immunity and Inflammation.",
            "wellbeing": "Student Wellbeing team provides counselling, mental health support and disability services. Togetherall (24/7). SRC (Students' Representative Council) peer support and wellbeing events."
        },
        "satisfaction": {"nssOverall": 83, "teachingQuality": 86, "academicSupport": 83, "learningResources": 87},
        "travelFromLondon": {"trainTime": "4h 30m (fastest Avanti West Coast service)", "trainFromStation": "London Euston", "trainToStation": "Glasgow Central", "coachTime": "8h 00m (National Express — overnight options available)", "drivingTime": "6h 00m (M6/M74, off-peak)", "distanceMiles": "401 miles north of London", "nearestAirport": "Glasgow Airport (25 min by bus; flights to 50+ destinations) or Glasgow Prestwick Airport (45 min; budget flights to Europe)"},
        "accessibility": {"disabilityService": "Disability Service provides support plans, exam adjustments and assistive technology. Self-refer via the online portal.", "accessibleAccommodation": "Several halls have accessible rooms including Murano Street and Kelvinhaugh. Accessibility requirements flagged at accommodation application.", "mentalHealthSupport": "Student Counselling Service, mental health practitioners, Togetherall (24/7), and SRC Nightline peer listening service.", "dyslexiaSupport": "SpLD assessment, specialist study skills tuition, assistive technology and exam adjustments via Disability Service.", "campusAccessibility": "Glasgow's historic West End campus varies in accessibility — the main Gilbert Scott building has lift access, and the newer Mazumdar-Shaw Advanced Research Centre is fully step-free. Campus AccessAble guide available online."},
        "international": {"visaSupport": "International Student Support team provides Student Visa guidance, CAS letters and Graduate Route advice. Pre-arrival webinar series and dedicated international portal.", "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for Life Sciences programmes; some routes require higher.", "orientationProgramme": "International Welcome Programme before term: NHS registration, UK banking, city tour and GUSA (students' union) International welcome events. Buddy scheme included.", "internationalSocietiesCount": "55+ international and cultural societies", "popularCountries": ["China", "India", "United States", "Germany", "Malaysia", "Pakistan", "Canada"]},
        "contact": {"admissionsEmail": "student.recruitment@glasgow.ac.uk", "admissionsPhone": "+44 (0)141 330 2000", "address": "University of Glasgow, University Avenue, Glasgow G12 8QQ", "openDayContact": "opendays@glasgow.ac.uk"}
    },

    "liverpool": {
        "website": "https://www.liverpool.ac.uk",
        "prospectus": "https://www.liverpool.ac.uk/study/undergraduate/",
        "socials": {
            "instagram": "https://www.instagram.com/livuni/",
            "twitter": "https://twitter.com/LivUni",
            "youtube": "https://www.youtube.com/liverpooluniversity",
            "tiktok": "https://www.tiktok.com/@liverpooluni",
            "linkedin": "https://www.linkedin.com/school/university-of-liverpool/"
        },
        "rankings": {"complete": 28, "guardian": 26, "times": 27, "qsWorld": 145, "theWorld": 175, "russellGroup": True, "year": "2025"},
        "reputation": "Liverpool is a Russell Group university with a proud research heritage and one of the UK's most celebrated student cities. Its Institute of Integrative Biology has world-class research in infection biology, veterinary biochemistry and evolutionary biology. Liverpool's School of Life Sciences benefits from proximity to the Liverpool School of Tropical Medicine — one of the world's oldest institutions devoted to infectious disease research — providing unique opportunities for biochemistry students interested in global health and parasitology.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£21,600–£25,600/year", "livingCostEstimate": "£10,500–£14,000/year (Liverpool is one of the most affordable major UK cities for students)"},
        "funding": {
            "scholarships": ["Liverpool International Scholarship (£3,000 fee reduction for high-achieving international students)", "Vice-Chancellor's Excellence Award (£2,000 for AAA+ A-level entry)", "Liverpool Bursary (up to £2,000/year for UK students from low-income households)", "Liverpool Sport Scholarship (for elite athletes)"],
            "bursaries": "Liverpool Bursary automatically assessed from UCAS for eligible UK students.",
            "paymentPlan": "Fees paid in three termly instalments via the student portal."
        },
        "employability": {"graduateEmploymentRate": "89%", "medianSalary": "£28,500 (15 months after graduation)", "topEmployers": ["NHS (Liverpool University Hospitals Trust)", "AstraZeneca", "Unilever (Port Sunlight R&D)", "GSK", "Liverpool School of Tropical Medicine", "Pfizer", "Everton/Liverpool FC science teams"], "careersService": "Liverpool Careers and Employability Service provides 1:1 advice, employer events and the Liverpool Award (employability accreditation). Strong NHS Merseyside and biotech employer links.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 3.07/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": ["Infection biology and tropical medicine", "Evolutionary biology and genomics", "Structural biology and biophysics", "Veterinary biochemistry and One Health", "Cancer biology and translational medicine"],
            "notableFacilities": ["Institute of Infection, Veterinary and Ecological Sciences (IVES)", "Liverpool School of Tropical Medicine (partner — walking distance)", "Centre for Proteome Research", "Liverpool Biomedical Research Centre (NIHR)", "Shared Research Facilities — flow cytometry, confocal microscopy, mass spectrometry"],
            "industryPartners": ["Unilever (Port Sunlight)", "AstraZeneca", "Liverpool University Hospitals NHS Trust", "LSTM spinouts", "Evotec"]
        },
        "facilities": {
            "libraries": ["Sydney Jones Library — main library open 24/7, 1M+ items", "Harold Cohen Library — science and engineering specialist collections", "Medical and Dental Library (Royal Liverpool Hospital campus)"],
            "sportsFacilities": "Liverpool Sports Centre — gym, 25m pool, sports hall, squash courts. Wyncote sports ground (off-campus) — outdoor pitches. 60+ sports clubs.",
            "studySpaces": "Sydney Jones Library open 24/7; 2,000+ study spaces; silent and group zones.",
            "labs": "Institute of Integrative Biology teaching labs are modern and well-equipped. Final-year project students work in research groups in infection biology, structural biology or evolutionary genomics.",
            "wellbeing": "Student Life team provides counselling, mental health support and disability services. Togetherall (24/7). Guild of Students (SU) wellbeing team and peer support."
        },
        "satisfaction": {"nssOverall": 82, "teachingQuality": 84, "academicSupport": 81, "learningResources": 85},
        "travelFromLondon": {"trainTime": "2h 10m (fastest Avanti West Coast service)", "trainFromStation": "London Euston", "trainToStation": "Liverpool Lime Street", "coachTime": "3h 30m (National Express / Megabus)", "drivingTime": "3h 00m (M6, off-peak)", "distanceMiles": "211 miles north-west of London", "nearestAirport": "Liverpool John Lennon Airport (30 min by taxi; Ryanair and EasyJet hub)"},
        "accessibility": {"disabilityService": "Disability Advice and Guidance provides support plans, exam adjustments and assistive technology. Self-refer via the student services portal.", "accessibleAccommodation": "Accessible rooms available in several halls. Accessibility requirements flagged at accommodation application.", "mentalHealthSupport": "Counselling service, mental health practitioners, Togetherall (24/7), and Guild peer support.", "dyslexiaSupport": "SpLD assessment, specialist study skills tuition, assistive technology and exam adjustments via Disability Advice.", "campusAccessibility": "Liverpool's campus is largely accessible; most academic buildings have lifts. Some older buildings may have limited access. Campus AccessAble guide available online."},
        "international": {"visaSupport": "International Support team provides Student Visa guidance, CAS letters and Graduate Route advice. Pre-arrival webinars and dedicated portal.", "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for Life Sciences programmes.", "orientationProgramme": "International Welcome Week before term: NHS registration, UK banking, city orientation and Guild International welcome events. Buddy scheme.", "internationalSocietiesCount": "50+ international and cultural societies", "popularCountries": ["China", "India", "Malaysia", "United States", "Nigeria", "Saudi Arabia", "Germany"]},
        "contact": {"admissionsEmail": "ugenquiries@liverpool.ac.uk", "admissionsPhone": "+44 (0)151 794 2000", "address": "University of Liverpool, Foundation Building, Brownlow Hill, Liverpool L69 7ZX", "openDayContact": "opendays@liverpool.ac.uk"}
    },

    "sussex": {
        "website": "https://www.sussex.ac.uk",
        "prospectus": "https://www.sussex.ac.uk/study/undergraduate/",
        "socials": {
            "instagram": "https://www.instagram.com/sussexuni/",
            "twitter": "https://twitter.com/SussexUni",
            "youtube": "https://www.youtube.com/sussexuniversity",
            "tiktok": "https://www.tiktok.com/@sussexuni",
            "linkedin": "https://www.linkedin.com/school/university-of-sussex/"
        },
        "rankings": {"complete": 35, "guardian": 33, "times": 34, "qsWorld": 450, "theWorld": 401, "russellGroup": False, "year": "2025"},
        "reputation": "Sussex is a campus university on the South Downs near Brighton, known for its progressive ethos, radical intellectual tradition and beautiful setting. Its School of Life Sciences has strong research in biochemistry, genetics and neuroscience, and the university is particularly well-regarded for its interdisciplinary approach. Sussex's proximity to Brighton — one of the UK's most vibrant and diverse cities — makes it a popular choice for students who want an excellent academic experience combined with outstanding city life.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£20,500–£23,500/year", "livingCostEstimate": "£13,000–£17,000/year (Brighton is popular but pricier than many northern cities)"},
        "funding": {
            "scholarships": ["Sussex Excellence Scholarship (£3,000 for high-achieving home students)", "Chancellor's International Scholarship (fee reduction for exceptional international students)", "Sussex Bursary (up to £1,000/year for UK students from low-income households)", "Sport Sussex Scholarship (for elite athletes)"],
            "bursaries": "Sussex Bursary automatically assessed from UCAS for eligible UK students.",
            "paymentPlan": "Fees paid in three termly instalments via the student portal."
        },
        "employability": {"graduateEmploymentRate": "88%", "medianSalary": "£27,500 (15 months after graduation)", "topEmployers": ["NHS (Brighton and Sussex University Hospitals)", "Pfizer (Sandwich R&D site)", "GSK", "Channel 4", "BBC", "Amex", "Thermo Fisher Scientific"], "careersService": "Sussex Careers and Employability Centre provides 1:1 advice, employer events and the Sussex Plus Award (employability accreditation). Strong South East life sciences and Brighton tech employer links.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 2.98/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": ["Genetics and genomics", "Neuroscience and behaviour", "Biochemistry and chemical biology", "Cell and developmental biology", "Environmental biology and conservation genetics"],
            "notableFacilities": ["School of Life Sciences building — modern research and teaching facility", "Genome Damage and Stability Centre", "Sussex Neuroscience (multi-school research hub)", "Brighton and Sussex Medical School (joint with University of Brighton)", "Biochemistry and Biophysics core facility"],
            "industryPartners": ["Pfizer (Sandwich)", "GSK", "Brighton and Sussex University Hospitals NHS Trust", "Thermo Fisher Scientific", "Cell Signalling Technology"]
        },
        "facilities": {
            "libraries": ["Sussex Library — central campus library, open late with 900,000+ items", "Special Collections — rare books and archives", "Digital resources covering all life sciences disciplines"],
            "sportsFacilities": "Sport Sussex — gym, sports hall, outdoor pitches, courts and tennis. 60+ sports clubs. Close proximity to Brighton seafront for outdoor activities.",
            "studySpaces": "Library open late; 1,500+ study spaces; silent and collaborative zones.",
            "labs": "School of Life Sciences has modern biochemistry teaching labs. Final-year project students join research groups in genetics, neuroscience or chemical biology.",
            "wellbeing": "Wellbeing and Inclusion team provides counselling, mental health support and disability services. Togetherall (24/7). Sussex Students' Union peer support."
        },
        "satisfaction": {"nssOverall": 83, "teachingQuality": 86, "academicSupport": 82, "learningResources": 84},
        "travelFromLondon": {"trainTime": "55 minutes (fastest Southern/Thameslink service)", "trainFromStation": "London Victoria or London Bridge", "trainToStation": "Brighton (then campus bus)", "coachTime": "1h 45m (National Express)", "drivingTime": "1h 15m (A23/M23, off-peak)", "distanceMiles": "53 miles south of London", "nearestAirport": "Gatwick Airport (30 min by train from Brighton; major international hub)"},
        "accessibility": {"disabilityService": "Disability and Dyslexia Support provides support plans, exam adjustments and assistive technology. Self-refer via the student services portal.", "accessibleAccommodation": "Several halls have accessible rooms. Accessibility requirements noted at accommodation application.", "mentalHealthSupport": "Counselling service, mental health practitioners, Togetherall (24/7), and Sussex Students' Union peer support.", "dyslexiaSupport": "SpLD assessment, specialist study skills tuition, assistive technology and exam adjustments via Disability and Dyslexia Support.", "campusAccessibility": "Sussex's purpose-built campus is largely step-free with accessible routes. Campus accessibility guide available via AccessAble."},
        "international": {"visaSupport": "International Student Support provides Student Visa guidance, CAS letters and Graduate Route advice. Pre-arrival webinars and dedicated portal.", "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for Life Sciences programmes.", "orientationProgramme": "International Welcome Week before term: NHS registration, UK banking, Brighton city tour and Sussex Students' Union International welcome events.", "internationalSocietiesCount": "40+ international and cultural societies", "popularCountries": ["China", "India", "United States", "Germany", "Malaysia", "Italy", "Greece"]},
        "contact": {"admissionsEmail": "ug.admissions@sussex.ac.uk", "admissionsPhone": "+44 (0)1273 876787", "address": "University of Sussex, Falmer, Brighton BN1 9RH", "openDayContact": "opendays@sussex.ac.uk"}
    },

    "leicester": {
        "website": "https://le.ac.uk",
        "prospectus": "https://le.ac.uk/study/undergraduates",
        "socials": {
            "instagram": "https://www.instagram.com/uniofleicester/",
            "twitter": "https://twitter.com/uniofleicester",
            "youtube": "https://www.youtube.com/leicesteruniversity",
            "tiktok": "https://www.tiktok.com/@uniofleicester",
            "linkedin": "https://www.linkedin.com/school/university-of-leicester/"
        },
        "rankings": {"complete": 38, "guardian": 37, "times": 36, "qsWorld": 350, "theWorld": 351, "russellGroup": False, "year": "2025"},
        "reputation": "Leicester is a research-led university known internationally for pioneering DNA fingerprinting — invented here by Sir Alec Jeffreys in 1984. Its Department of Genetics and Genome Biology (within the College of Life Sciences) is one of the UK's strongest, and biochemistry students benefit from close links to the University Hospitals of Leicester NHS Trust, one of the largest teaching hospital trusts in the UK. Leicester has a particularly strong track record for translating scientific research into real-world applications.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£19,000–£22,000/year", "livingCostEstimate": "£10,000–£13,500/year (Leicester is one of the more affordable East Midlands cities)"},
        "funding": {
            "scholarships": ["Leicester Excellence Award (£2,000 for high-achieving home students)", "International Excellence Scholarship (£3,000 fee reduction)", "Leicester Bursary (up to £1,000/year for eligible UK students)", "Sport Leicester Scholarship (for elite athletes)"],
            "bursaries": "Leicester Bursary automatically assessed from UCAS for eligible UK students.",
            "paymentPlan": "Fees paid in three termly instalments via the student portal."
        },
        "employability": {"graduateEmploymentRate": "88%", "medianSalary": "£27,500 (15 months after graduation)", "topEmployers": ["NHS (University Hospitals of Leicester)", "AstraZeneca", "Forensic Science Service", "Walgreens Boots Alliance", "KPMG", "GSK", "National Space Centre (science communication)"], "careersService": "Leicester Careers Service provides 1:1 advice, employer events and the Leicester Award (employability accreditation). Strong NHS East Midlands and forensic science employer links.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 2.95/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": ["Genetics and genome biology", "Cancer biochemistry and cell biology", "Molecular microbiology and infection", "Structural biology and protein chemistry", "Evolutionary genetics and bioinformatics"],
            "notableFacilities": ["Department of Genetics and Genome Biology — birthplace of DNA fingerprinting", "Leicester Cancer Research Centre", "Confocal Imaging Facility", "Molecular Biology Core Facility", "NIHR Leicester Biomedical Research Centre"],
            "industryPartners": ["AstraZeneca", "University Hospitals of Leicester NHS Trust", "Walgreens Boots Alliance", "Forensic Science Service", "GSK"]
        },
        "facilities": {
            "libraries": ["David Wilson Library — modern central library open 24/7, 900,000+ items", "Specialist science reading rooms adjacent to teaching labs", "Digital access via LeicesterFind covering all life sciences"],
            "sportsFacilities": "Leicester Sports and Recreation Centre — gym, 25m pool, sports hall, squash courts, outdoor pitches. 60+ sports clubs.",
            "studySpaces": "David Wilson Library open 24/7; 1,800+ study spaces; silent and group zones.",
            "labs": "College of Life Sciences teaching labs are well-equipped. Final-year project students work in genetics, cancer biology or molecular microbiology research groups.",
            "wellbeing": "Student Wellbeing Service provides counselling, mental health support and disability services. Togetherall (24/7). Leicester Students' Union peer support."
        },
        "satisfaction": {"nssOverall": 84, "teachingQuality": 87, "academicSupport": 84, "learningResources": 86},
        "travelFromLondon": {"trainTime": "1h 05m (fastest East Midlands Railway service)", "trainFromStation": "London St Pancras International", "trainToStation": "Leicester", "coachTime": "2h 15m (National Express)", "drivingTime": "1h 45m (M1, off-peak)", "distanceMiles": "99 miles north of London", "nearestAirport": "East Midlands Airport (30 min by taxi; budget flights to Europe)"},
        "accessibility": {"disabilityService": "Disability Support Team provides support plans, exam adjustments and assistive technology. Self-refer via the online portal.", "accessibleAccommodation": "Accessible rooms available in several halls. Accessibility requirements noted at accommodation application.", "mentalHealthSupport": "Student Wellbeing Service counselling, mental health practitioners, Togetherall (24/7), and Leicester SU peer support.", "dyslexiaSupport": "SpLD assessment, study skills tuition, assistive technology and exam adjustments via Disability Support.", "campusAccessibility": "Leicester's campus is largely step-free with accessible routes. Most buildings have lift access. Campus accessibility guide available online."},
        "international": {"visaSupport": "International Student Support provides Student Visa guidance, CAS letters and Graduate Route advice. Pre-arrival webinars and dedicated portal.", "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for Life Sciences programmes.", "orientationProgramme": "International Welcome Week before term: NHS registration, UK banking, city orientation and Leicester SU International welcome events.", "internationalSocietiesCount": "40+ international and cultural societies", "popularCountries": ["China", "India", "Malaysia", "United States", "Nigeria", "Pakistan", "Ghana"]},
        "contact": {"admissionsEmail": "admissions@le.ac.uk", "admissionsPhone": "+44 (0)116 252 2522", "address": "University of Leicester, University Road, Leicester LE1 7RH", "openDayContact": "opendays@le.ac.uk"}
    },

    "reading": {
        "website": "https://www.reading.ac.uk",
        "prospectus": "https://www.reading.ac.uk/study/undergraduate/",
        "socials": {
            "instagram": "https://www.instagram.com/uniofrdg/",
            "twitter": "https://twitter.com/UniofReading",
            "youtube": "https://www.youtube.com/user/uniofrdg",
            "tiktok": "https://www.tiktok.com/@uniofrdg",
            "linkedin": "https://www.linkedin.com/school/university-of-reading/"
        },
        "rankings": {"complete": 40, "guardian": 38, "times": 39, "qsWorld": 325, "theWorld": 401, "russellGroup": False, "year": "2025"},
        "reputation": "Reading is a campus university west of London with a strong research reputation in food science, meteorology and microbiology. Its School of Biological Sciences has particular strength in food biochemistry, microbiology and plant science, underpinned by proximity to some of the UK's leading food and agricultural research institutions including Rothamsted Research and the Centre for Ecology and Hydrology. Reading's location — 25 minutes from London Paddington — makes it attractive for students who want campus life without sacrificing London access.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£20,580–£23,700/year", "livingCostEstimate": "£12,000–£16,000/year (Reading is moderately priced — more than northern cities, less than London)"},
        "funding": {
            "scholarships": ["Reading Scholarship (£2,000 for high-achieving home students)", "International Excellence Scholarship (fee reduction for high-achieving international students)", "Reading Bursary (means-tested support for UK students)", "Reading Elite Sport Scholarship (for national-standard athletes)"],
            "bursaries": "Reading Bursary automatically assessed from UCAS for eligible UK students.",
            "paymentPlan": "Fees paid in three termly instalments via the student portal."
        },
        "employability": {"graduateEmploymentRate": "88%", "medianSalary": "£28,000 (15 months after graduation)", "topEmployers": ["NHS (Royal Berkshire Hospital)", "Unilever (Port Sunlight and Leatherhead)", "Rothamsted Research", "FERA Science", "Syngenta", "GSK (Brentford)", "Thames Water"], "careersService": "Reading Careers provides 1:1 advice, employer events and the Reading Gold Award (employability accreditation). Particularly strong food science, agricultural and environmental science employer links.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 2.92/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": ["Food biochemistry and nutrition science", "Plant science and crop improvement", "Microbiology and food safety", "Cell biology and developmental biology", "Environmental biochemistry and ecology"],
            "notableFacilities": ["Food and Nutritional Sciences building — state-of-the-art food science labs", "Centre for Food Security", "Rothamsted Research (nearby partner — world's oldest agricultural research station)", "Cole Museum of Zoology", "Lyle Centre for Applied Microbiology"],
            "industryPartners": ["Unilever", "Syngenta", "Rothamsted Research", "FERA Science", "Thames Water"]
        },
        "facilities": {
            "libraries": ["University Library — main campus library open late with 900,000+ items", "Science and Agriculture Library — specialist collections", "Digital resources via the Library catalogue"],
            "sportsFacilities": "Sport and Health Sciences Centre — gym, 25m pool, sports hall, squash courts, outdoor pitches. 60+ sports clubs.",
            "studySpaces": "Library open late; 1,500+ study spaces; silent and collaborative zones.",
            "labs": "Food and Nutritional Sciences building has world-class teaching labs including sensory panels and pilot plant facilities. Final-year project students join food biochemistry or plant science research groups.",
            "wellbeing": "Student Wellbeing Service provides counselling, mental health support and disability services. Togetherall (24/7). RUSU (students' union) peer support."
        },
        "satisfaction": {"nssOverall": 83, "teachingQuality": 86, "academicSupport": 83, "learningResources": 85},
        "travelFromLondon": {"trainTime": "25 minutes (fastest Great Western Railway service)", "trainFromStation": "London Paddington", "trainToStation": "Reading", "coachTime": "1h 00m (National Express)", "drivingTime": "50 minutes (M4, off-peak)", "distanceMiles": "39 miles west of London", "nearestAirport": "London Heathrow Airport (20 min by car; one of the world's busiest airports)"},
        "accessibility": {"disabilityService": "Disability Advisory Service provides support plans, exam adjustments and assistive technology. Self-refer via the online portal.", "accessibleAccommodation": "Accessible rooms available in several halls. Accessibility requirements noted at accommodation application.", "mentalHealthSupport": "Wellbeing service counselling, mental health practitioners, Togetherall (24/7), and RUSU peer support.", "dyslexiaSupport": "SpLD assessment, study skills tuition, assistive technology and exam adjustments via Disability Advisory Service.", "campusAccessibility": "Reading's Whiteknights campus is largely step-free with accessible routes. Campus accessibility guide available online."},
        "international": {"visaSupport": "International Student Advisory Service provides Student Visa guidance, CAS letters and Graduate Route advice. Pre-arrival webinars and portal.", "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for Biological Sciences programmes.", "orientationProgramme": "International Welcome Week before term: NHS registration, UK banking, campus tour and RUSU International welcome events.", "internationalSocietiesCount": "35+ international and cultural societies", "popularCountries": ["China", "India", "United States", "Malaysia", "Nigeria", "Germany", "Saudi Arabia"]},
        "contact": {"admissionsEmail": "study@reading.ac.uk", "admissionsPhone": "+44 (0)118 987 5123", "address": "University of Reading, Whiteknights, PO Box 217, Reading RG6 6AH", "openDayContact": "opendays@reading.ac.uk"}
    },

    "keele": {
        "website": "https://www.keele.ac.uk",
        "prospectus": "https://www.keele.ac.uk/study/undergraduate/",
        "socials": {
            "instagram": "https://www.instagram.com/keeleuniversity/",
            "twitter": "https://twitter.com/KeeleUniversity",
            "youtube": "https://www.youtube.com/user/KeeleUniversity",
            "tiktok": "https://www.tiktok.com/@keeleuniversity",
            "linkedin": "https://www.linkedin.com/school/keele-university/"
        },
        "rankings": {"complete": 55, "guardian": 52, "times": 53, "qsWorld": 601, "theWorld": 601, "russellGroup": False, "year": "2025"},
        "reputation": "Keele is a distinctive campus university on a 617-acre rural estate in Staffordshire, known for its dual-subject degree structure and strong community feel. Its School of Life Sciences is a well-regarded research department with particular strength in biochemistry and molecular biology at the interface of cancer and infection biology. Keele is consistently rated highly for student satisfaction and personal support, making it an excellent choice for students who want a close-knit, collegiate environment with good research opportunities.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£16,000–£18,500/year", "livingCostEstimate": "£9,000–£12,000/year (Keele's rural Staffordshire location is one of the most affordable in the UK)"},
        "funding": {
            "scholarships": ["Keele Excellence Scholarship (£2,000 for high-achieving home students)", "International Scholarship (fee reduction for international students)", "Keele Bursary (means-tested support for eligible UK students)", "Elite Sports Scholarship"],
            "bursaries": "Keele Bursary automatically assessed from UCAS for eligible UK students. Hardship Fund available for students in financial difficulty.",
            "paymentPlan": "Fees paid in three termly instalments via the student portal."
        },
        "employability": {"graduateEmploymentRate": "87%", "medianSalary": "£26,500 (15 months after graduation)", "topEmployers": ["NHS (Midlands Partnership Foundation Trust)", "AstraZeneca", "GSK", "Staffordshire County Council", "KPMG", "Coventry and Warwickshire NHS Trust", "Unilever"], "careersService": "Keele Careers provides 1:1 advice, employer events and the Keele Graduate Award (employability accreditation). Strong NHS Midlands and regional pharma employer links.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 2.88/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": ["Biochemistry and molecular biology", "Cancer cell biology", "Infection biology and antimicrobial resistance", "Structural biology and protein science", "Cellular signalling and gene expression"],
            "notableFacilities": ["School of Life Sciences building — modern research and teaching labs", "Institute for Science and Technology in Medicine (ISTM)", "Keele Biomedical Research Unit", "Medical School research labs (Keele University School of Medicine)", "Shared equipment facility — flow cytometry, confocal microscopy"],
            "industryPartners": ["AstraZeneca", "GSK", "Midlands Partnership NHS Foundation Trust", "University Hospital of North Midlands NHS Trust", "Synectics Medical"]
        },
        "facilities": {
            "libraries": ["Library and Information Services — modern central library open late", "Special collections and archives", "Digital resources covering all life sciences disciplines"],
            "sportsFacilities": "Sports Centre and gym on campus; outdoor pitches, courts and running trails across the 617-acre estate. 40+ sports clubs.",
            "studySpaces": "Library open late; study spaces across the campus; silent and collaborative zones.",
            "labs": "School of Life Sciences has well-equipped teaching labs. Final-year project students join research groups in cancer biology, infection biology or structural biochemistry.",
            "wellbeing": "Student Support and Wellbeing team provides counselling, mental health support and disability services. Togetherall (24/7). KSU (students' union) peer support."
        },
        "satisfaction": {"nssOverall": 87, "teachingQuality": 90, "academicSupport": 88, "learningResources": 87},
        "travelFromLondon": {"trainTime": "1h 45m (to Stoke-on-Trent, then 15 min bus to campus)", "trainFromStation": "London Euston", "trainToStation": "Stoke-on-Trent (then bus to Keele)", "coachTime": "3h 30m (National Express to Newcastle-under-Lyme)", "drivingTime": "2h 15m (M6, off-peak)", "distanceMiles": "150 miles north-west of London", "nearestAirport": "Birmingham Airport (1h by car; flights to 150+ destinations) or Manchester Airport (1h by car)"},
        "accessibility": {"disabilityService": "Disability and Dyslexia Support provides support plans, exam adjustments and assistive technology. Self-refer via the student portal.", "accessibleAccommodation": "Several halls have accessible rooms. Accessibility requirements noted at accommodation application.", "mentalHealthSupport": "Wellbeing counselling service, mental health practitioners, Togetherall (24/7), and KSU peer support.", "dyslexiaSupport": "SpLD assessment, study skills tuition, assistive technology and exam adjustments via Disability and Dyslexia Support.", "campusAccessibility": "Keele's campus is largely step-free with accessible routes across the estate. Campus accessibility guide available online."},
        "international": {"visaSupport": "International Student Support provides Student Visa guidance, CAS letters and Graduate Route advice. Pre-arrival webinars and portal.", "englishRequirements": "IELTS 6.0 overall (5.5 in each component) for Life Sciences programmes.", "orientationProgramme": "International Welcome Week before term: NHS registration, UK banking, campus tour and KSU International welcome events.", "internationalSocietiesCount": "25+ international and cultural societies", "popularCountries": ["China", "India", "Malaysia", "Nigeria", "United States", "Pakistan", "Ghana"]},
        "contact": {"admissionsEmail": "admissions@keele.ac.uk", "admissionsPhone": "+44 (0)1782 734010", "address": "Keele University, Keele, Staffordshire ST5 5BG", "openDayContact": "opendays@keele.ac.uk"}
    },

    "surrey": {
        "website": "https://www.surrey.ac.uk",
        "prospectus": "https://www.surrey.ac.uk/undergraduate",
        "socials": {
            "instagram": "https://www.instagram.com/uniofsurrey/",
            "twitter": "https://twitter.com/UniofSurrey",
            "youtube": "https://www.youtube.com/user/universityofsurrey",
            "tiktok": "https://www.tiktok.com/@uniofsurrey",
            "linkedin": "https://www.linkedin.com/school/university-of-surrey/"
        },
        "rankings": {"complete": 30, "guardian": 29, "times": 30, "qsWorld": 325, "theWorld": 351, "russellGroup": False, "year": "2025"},
        "reputation": "Surrey is a campus university in Guildford, consistently ranked in the UK top 35 and known particularly for its professional training year (PTY) — a mandatory work placement that gives graduates a decisive employability advantage. Its Department of Biochemistry (within the School of Biosciences) has strong research in molecular nutrition, food biochemistry and infection biology, backed by an outstanding industry partnership network. Surrey's location between London and the South Coast, with excellent rail links, makes it popular with students seeking a campus experience close to the capital.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£19,900–£22,750/year", "livingCostEstimate": "£13,000–£17,000/year (Guildford is affluent and relatively expensive, though less than London)"},
        "funding": {
            "scholarships": ["Surrey Excellence Scholarship (£3,000 for AAA+ entry)", "International Excellence Scholarship (fee reduction for high-achieving international students)", "Surrey Bursary (means-tested for eligible UK students)", "Elite Sports Scholarship (for national-level athletes)"],
            "bursaries": "Surrey Bursary automatically assessed from UCAS for eligible UK students.",
            "paymentPlan": "Fees paid in three termly instalments via the student portal."
        },
        "employability": {"graduateEmploymentRate": "94%", "medianSalary": "£30,500 (15 months after graduation — boosted by mandatory Professional Training Year)", "topEmployers": ["GSK (Brentford and Stevenage sites)", "Pfizer", "AstraZeneca", "Unilever (Leatherhead R&D)", "Nestlé", "NHS (Surrey and Borders)", "Sanofi"], "careersService": "Surrey Careers provides 1:1 advice, employer events, and the Surrey Employability Award. The Professional Training Year team places students in pharma, biotech and food science — often leading to graduate job offers.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 3.01/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": ["Molecular nutrition and nutrigenomics", "Food biochemistry and safety", "Infection biology and antimicrobial resistance", "Microbiome science and gut biology", "Structural biology and drug discovery"],
            "notableFacilities": ["Surrey Ion Beam Centre — particle accelerator for materials and biochemical analysis", "Bioscience Laboratories — modern research and teaching facility", "Surrey Satellite Technology (cross-disciplinary space-biology interface)", "Surrey Clinical Research Centre", "Gut Microbiome Research Facility"],
            "industryPartners": ["GSK (South East cluster)", "Unilever (Leatherhead R&D)", "Pfizer", "Nestlé", "Arla Foods"]
        },
        "facilities": {
            "libraries": ["University Library — modern central library open late with 500,000+ items", "Digital resources covering all bioscience disciplines", "Bookable study pods and group rooms"],
            "sportsFacilities": "Surrey Sports Park — Olympic-standard 50m pool, gym, sports hall, courts, athletics track. 60+ sports clubs. One of the best university sports facilities outside London.",
            "studySpaces": "Library open late; 1,500+ study spaces; silent and group zones.",
            "labs": "Bioscience teaching labs are well-equipped. Professional Training Year students gain real industry lab experience. Final-year project students work in molecular nutrition, food biochemistry or infection biology research groups.",
            "wellbeing": "Student Wellbeing Service provides counselling, mental health support and disability services. Togetherall (24/7). USSU (students' union) peer support."
        },
        "satisfaction": {"nssOverall": 85, "teachingQuality": 88, "academicSupport": 85, "learningResources": 87},
        "travelFromLondon": {"trainTime": "35 minutes (fastest South Western Railway service)", "trainFromStation": "London Waterloo", "trainToStation": "Guildford", "coachTime": "1h 15m (National Express)", "drivingTime": "45 minutes (A3, off-peak)", "distanceMiles": "27 miles south-west of London", "nearestAirport": "London Heathrow Airport (30 min by car; major international hub)"},
        "accessibility": {"disabilityService": "Disability and Neurodiversity Support provides support plans, exam adjustments and assistive technology. Self-refer via the student portal.", "accessibleAccommodation": "Accessible rooms available in several halls. Accessibility requirements noted at accommodation application.", "mentalHealthSupport": "Wellbeing counselling service, mental health practitioners, Togetherall (24/7), and USSU peer support.", "dyslexiaSupport": "SpLD assessment, study skills tuition, assistive technology and exam adjustments via Disability Support.", "campusAccessibility": "Surrey's purpose-built campus is largely step-free with accessible routes. Campus accessibility guide available online."},
        "international": {"visaSupport": "International Student Advisory Service provides Student Visa guidance, CAS letters and Graduate Route advice. Pre-arrival webinars and portal.", "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for Biochemistry programmes.", "orientationProgramme": "International Welcome Week before term: NHS registration, UK banking, campus tour and USSU International welcome events.", "internationalSocietiesCount": "40+ international and cultural societies", "popularCountries": ["China", "India", "United States", "Malaysia", "Germany", "Nigeria", "Hong Kong"]},
        "contact": {"admissionsEmail": "admissions@surrey.ac.uk", "admissionsPhone": "+44 (0)1483 300800", "address": "University of Surrey, Guildford, Surrey GU2 7XH", "openDayContact": "opendays@surrey.ac.uk"}
    },

    "queen-mary-university-of-london": {
        "website": "https://www.qmul.ac.uk",
        "prospectus": "https://www.qmul.ac.uk/undergraduate/",
        "socials": {
            "instagram": "https://www.instagram.com/qmulondon/",
            "twitter": "https://twitter.com/QMULondon",
            "youtube": "https://www.youtube.com/qmullondon",
            "tiktok": "https://www.tiktok.com/@qmulondon",
            "linkedin": "https://www.linkedin.com/school/queen-mary-university-of-london/"
        },
        "rankings": {"complete": 32, "guardian": 30, "times": 31, "qsWorld": 130, "theWorld": 117, "russellGroup": True, "year": "2025"},
        "reputation": "Queen Mary is a Russell Group university in east London, ranked in the global top 130, with one of the UK's strongest reputations for research impact relative to its size. Its School of Biological and Behavioural Sciences has world-class research in structural biology, chemical biology and neuroscience, and the Barts Cancer Institute — one of Europe's leading cancer research centres — is based here. QMUL's Mile End campus is one of London's most distinctive, with a genuine campus feel in the heart of the city.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£24,000–£28,500/year", "livingCostEstimate": "£15,000–£22,000/year (east London — cheaper than central London but still expensive)"},
        "funding": {
            "scholarships": ["QMUL Excellence Award (£3,000 for high-achieving home students)", "Queen Mary International Scholarship (fee reduction for exceptional international students)", "QMUL Bursary (up to £3,000/year for eligible UK students from low-income households)", "Sports Scholarship (for elite athletes)"],
            "bursaries": "QMUL Bursary automatically assessed from UCAS for eligible UK students.",
            "paymentPlan": "Fees paid in three termly instalments via the student portal."
        },
        "employability": {"graduateEmploymentRate": "91%", "medianSalary": "£32,000 (15 months after graduation)", "topEmployers": ["NHS (Barts Health — one of the UK's largest NHS trusts)", "GlaxoSmithKline", "AstraZeneca", "PwC", "Deloitte", "Barclays", "Cancer Research UK"], "careersService": "QMUL Careers provides 1:1 advice, employer events and the Queen Mary Award (employability accreditation). London employer access is exceptional — Barts Health NHS, GSK and major financial institutions all nearby.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 3.25/4.0 — Biological Sciences, top 15 in UK (REF 2021)",
            "strengthAreas": ["Structural biology and cryo-EM", "Chemical biology and drug discovery", "Cancer biochemistry and tumour biology", "Neuroscience and cognitive biology", "Evolutionary genomics and cell biology"],
            "notableFacilities": ["Barts Cancer Institute — world-class cancer research (partner institution)", "School of Biological and Behavioural Sciences research labs", "Centre for Translational Bioinformatics", "QMUL Advanced Microscopy Facility", "Genome Centre"],
            "industryPartners": ["GSK", "AstraZeneca", "Barts Health NHS Trust", "Cancer Research UK", "Pfizer"]
        },
        "facilities": {
            "libraries": ["QMUL Library — main Mile End library, open late with 600,000+ items", "Whitechapel Library — medical and biomedical sciences collections", "Digital access to 500,000+ e-resources"],
            "sportsFacilities": "QMUL Sportsground — gym, courts, sports hall. Mile End Park (adjacent to campus) has outdoor sports facilities. 60+ sports clubs. Close to Olympic Park (2023 World Athletics venue).",
            "studySpaces": "Library open late; 1,500+ study spaces; silent and collaborative zones.",
            "labs": "Biological Sciences teaching labs are modern and well-equipped. Final-year project students join research groups in structural biology, cancer biochemistry or chemical biology — often co-authoring publications.",
            "wellbeing": "Student Wellbeing Service provides counselling, mental health support and disability services. Togetherall (24/7). QMSU (students' union) peer support."
        },
        "satisfaction": {"nssOverall": 80, "teachingQuality": 83, "academicSupport": 80, "learningResources": 84},
        "travelFromLondon": {"trainTime": "On campus — Mile End is in east London (Zone 2)", "trainFromStation": "Mile End Underground (Central/District/Hammersmith & City lines)", "trainToStation": "Mile End Underground — direct from central London in 15 min", "coachTime": "N/A — central east London", "drivingTime": "N/A — Zone 2 London; parking very limited", "distanceMiles": "Located in east London E1", "nearestAirport": "London City Airport (20 min by DLR); Heathrow (45 min via Underground)"},
        "accessibility": {"disabilityService": "Disability and Dyslexia Service provides support plans, exam adjustments and assistive technology. Self-refer via the online portal.", "accessibleAccommodation": "Several QMUL halls have accessible rooms. Accessibility requirements flagged at accommodation application.", "mentalHealthSupport": "Wellbeing counselling service, mental health practitioners, Togetherall (24/7), and QMSU peer support.", "dyslexiaSupport": "SpLD assessment, study skills tuition, assistive technology and exam adjustments via Disability and Dyslexia Service.", "campusAccessibility": "Mile End campus is largely step-free; the new Graduate Centre and most academic buildings are fully accessible. Campus accessibility guide via AccessAble."},
        "international": {"visaSupport": "International Student Support provides Student Visa guidance, CAS letters and Graduate Route advice. Pre-arrival webinars and portal.", "englishRequirements": "IELTS 6.5 overall (6.0 in each component) for Biological Sciences programmes.", "orientationProgramme": "International Welcome Week before term: NHS registration, UK banking, London orientation and QMSU International welcome events.", "internationalSocietiesCount": "70+ international and cultural societies", "popularCountries": ["China", "India", "Malaysia", "United States", "Bangladesh", "Nigeria", "Pakistan"]},
        "contact": {"admissionsEmail": "admissions@qmul.ac.uk", "admissionsPhone": "+44 (0)20 7882 5555", "address": "Queen Mary University of London, Mile End Road, London E1 4NS", "openDayContact": "opendays@qmul.ac.uk"}
    },

    "swansea": {
        "website": "https://www.swansea.ac.uk",
        "prospectus": "https://www.swansea.ac.uk/undergraduate/",
        "socials": {
            "instagram": "https://www.instagram.com/swanseauniversity/",
            "twitter": "https://twitter.com/SwanseaUni",
            "youtube": "https://www.youtube.com/swanseauniversity",
            "tiktok": "https://www.tiktok.com/@swanseauniversity",
            "linkedin": "https://www.linkedin.com/school/swansea-university/"
        },
        "rankings": {"complete": 45, "guardian": 43, "times": 44, "qsWorld": 451, "theWorld": 501, "russellGroup": False, "year": "2025"},
        "reputation": "Swansea is a research-led university on the Swansea Bay waterfront, with a stunning new £450M Bay Campus opened in 2015. Its Medical School and Faculty of Medicine, Health and Life Sciences have strong research in biochemistry, genomics and medical science. Swansea's bilingual Welsh-English character gives it a distinctive identity, and its coastal setting — adjacent to the Gower Peninsula, the UK's first Area of Outstanding Natural Beauty — makes it one of the most beautifully located universities in the UK.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£17,000–£20,500/year", "livingCostEstimate": "£9,500–£13,000/year (Swansea is one of the most affordable places to be a student in the UK)"},
        "funding": {
            "scholarships": ["Swansea Excellence Scholarship (£2,000 for high-achieving home students)", "International Scholarship (fee reduction for international students)", "Welsh Government Learning Grant (means-tested for Welsh-domiciled students)", "Sports Scholarship (for elite athletes)"],
            "bursaries": "Means-tested support via the Welsh Government Learning Grant for Welsh-domiciled students. University Hardship Fund available.",
            "paymentPlan": "Fees paid in three termly instalments via the student portal."
        },
        "employability": {"graduateEmploymentRate": "86%", "medianSalary": "£26,000 (15 months after graduation)", "topEmployers": ["NHS Wales (Swansea Bay University Health Board)", "DVLA", "Tata Steel (Port Talbot)", "Public Health Wales", "Welsh Government", "Admiral Insurance", "Swansea University spinouts"], "careersService": "Swansea Careers provides 1:1 advice, employer events and the Swansea Award (employability accreditation). Strong NHS Wales and Welsh Government employer links.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 2.85/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": ["Medical biochemistry and genomics", "Infection and immunity", "Neuroscience and neurodegenerative diseases", "Environmental biology and marine biochemistry", "Cell biology and cancer research"],
            "notableFacilities": ["Swansea Medical School — Bay Campus biomedical research hub", "Institute of Life Science (ILS) — clinical research facility (Singleton Hospital campus)", "Wales Gene Park (partner)", "SPECIFIC Innovation and Knowledge Centre", "Centre for Sustainable Aquatic Research"],
            "industryPartners": ["Swansea Bay University Health Board", "Public Health Wales", "Tata Steel", "Novacyt", "Assay Genie"]
        },
        "facilities": {
            "libraries": ["Bay Campus Library — modern waterfront library open late", "Singleton Park Campus Library — traditional campus library", "Digital access covering all biological sciences disciplines"],
            "sportsFacilities": "Sports Wales National Aquatics Centre (nearby), on-campus gym, sports hall and outdoor pitches. 50+ sports clubs. Surfing, paddleboarding and outdoor pursuits on the Gower Peninsula.",
            "studySpaces": "Bay Campus Library open late; study spaces on both campuses; silent and group zones.",
            "labs": "Swansea Medical School and ILS have well-equipped biochemistry teaching labs. Final-year project students join medical biochemistry or genomics research groups.",
            "wellbeing": "Student Wellbeing Service provides counselling, mental health support and disability services. Togetherall (24/7). SU peer support and wellbeing ambassadors."
        },
        "satisfaction": {"nssOverall": 82, "teachingQuality": 85, "academicSupport": 83, "learningResources": 84},
        "travelFromLondon": {"trainTime": "3h 00m (fastest Great Western Railway service)", "trainFromStation": "London Paddington", "trainToStation": "Swansea", "coachTime": "4h 30m (National Express)", "drivingTime": "3h 15m (M4, off-peak)", "distanceMiles": "189 miles west of London", "nearestAirport": "Cardiff Airport (1h by car; flights to 40+ destinations) or Bristol Airport (1h 30m by car)"},
        "accessibility": {"disabilityService": "Disability Services provides support plans, exam adjustments and assistive technology. Self-refer via the student portal.", "accessibleAccommodation": "Bay Campus has modern accessible accommodation. Accessibility requirements noted at application.", "mentalHealthSupport": "Wellbeing counselling service, mental health practitioners, Togetherall (24/7), and SU peer support.", "dyslexiaSupport": "SpLD assessment, study skills tuition, assistive technology and exam adjustments via Disability Services.", "campusAccessibility": "Bay Campus is purpose-built and fully accessible. Singleton Park Campus is largely step-free. AccessAble guide available online."},
        "international": {"visaSupport": "International Student Support provides Student Visa guidance, CAS letters and Graduate Route advice. Pre-arrival webinars and portal.", "englishRequirements": "IELTS 6.0 overall (5.5 in each component) for most Life Sciences programmes.", "orientationProgramme": "International Welcome Week before term: NHS registration, UK banking, campus tour and SU International welcome events. Welsh language taster sessions available.", "internationalSocietiesCount": "35+ international and cultural societies", "popularCountries": ["China", "India", "Malaysia", "Nigeria", "United States", "Pakistan", "Saudi Arabia"]},
        "contact": {"admissionsEmail": "admissions@swansea.ac.uk", "admissionsPhone": "+44 (0)1792 295111", "address": "Swansea University, Singleton Park, Swansea SA2 8PP", "openDayContact": "opendays@swansea.ac.uk"}
    },

    "aberystwyth": {
        "website": "https://www.aber.ac.uk",
        "prospectus": "https://www.aber.ac.uk/en/undergraduate/",
        "socials": {
            "instagram": "https://www.instagram.com/aberystwythuni/",
            "twitter": "https://twitter.com/AberUni",
            "youtube": "https://www.youtube.com/aberystwythuniversity",
            "tiktok": "https://www.tiktok.com/@aberystwythuni",
            "linkedin": "https://www.linkedin.com/school/aberystwyth-university/"
        },
        "rankings": {"complete": 58, "guardian": 55, "times": 56, "qsWorld": 801, "theWorld": 801, "russellGroup": False, "year": "2025"},
        "reputation": "Aberystwyth is one of the UK's oldest universities (founded 1872) and Wales' first university, set in a stunning coastal town on Cardigan Bay. Its Institute of Biological, Environmental and Rural Sciences (IBERS) is internationally recognised for plant science, environmental biology and rural sciences. Aberystwyth offers a uniquely personal academic experience — with small class sizes and outstanding pastoral support — and is the only university in the UK where you can fully study your degree in Welsh if you choose.",
        "fees": {"homeUndergrad": "£9,535/year", "internationalUndergrad": "£14,450–£16,200/year", "livingCostEstimate": "£8,500–£11,500/year (Aberystwyth is one of the most affordable university towns in the UK)"},
        "funding": {
            "scholarships": ["Aberystwyth Excellence Scholarship (£3,000 one-off for high-achieving home students)", "Coleg Cymraeg Cenedlaethol Scholarships (for Welsh-medium study)", "International Scholarship (fee reduction for international students)", "Welsh Government Learning Grant (for eligible Welsh-domiciled students)"],
            "bursaries": "Aberystwyth University Bursary available for eligible UK students. Welsh Government Learning Grant for Welsh-domiciled students.",
            "paymentPlan": "Fees paid in three termly instalments via the student portal."
        },
        "employability": {"graduateEmploymentRate": "84%", "medianSalary": "£24,500 (15 months after graduation)", "topEmployers": ["NHS Wales", "Environment Agency Wales (NRW)", "BBSRC Institutes (Rothamsted, JIC)", "Public Health Wales", "Welsh Government", "Environment Agency (England)", "Aberystwyth University spinouts"], "careersService": "Aberystwyth Careers provides 1:1 advice, employer events and the Aber Award (employability accreditation). Strong environmental science, plant biology and agricultural employer links via IBERS.", "placementYearAvailable": True},
        "research": {
            "refRating": "GPA 2.90/4.0 — Biological Sciences (REF 2021)",
            "strengthAreas": ["Plant science and crop improvement", "Environmental biology and conservation", "Animal genetics and livestock improvement", "Marine and coastal biochemistry", "Food security and sustainable agriculture"],
            "notableFacilities": ["Institute of Biological, Environmental and Rural Sciences (IBERS) — world-leading plant and environmental biology", "National Plant Phenomics Centre (NPPC) — cutting-edge plant imaging and growth facility", "Aber Instruments (spin-out — biosensor technology)", "Wales Plant Breeding Station", "Aberystwyth Mass Spectrometry Facility"],
            "industryPartners": ["BBSRC (major IBERS funder)", "Environment Agency / Natural Resources Wales", "Cargill (animal nutrition)", "Welsh Government", "Germinal (grass breeding)"]
        },
        "facilities": {
            "libraries": ["Hugh Owen Library — main library open late with 500,000+ items", "Physical Sciences Library — specialist collections", "National Library of Wales (adjacent to campus — one of the UK's six legal deposit libraries)"],
            "sportsFacilities": "Sports Centre — gym, sports hall, courts and outdoor pitches. Seafront location provides exceptional outdoor activities — surfing, kayaking, hiking in the Cambrian Mountains. 40+ sports clubs.",
            "studySpaces": "Hugh Owen Library open late; study spaces across campus; silent and group zones.",
            "labs": "IBERS has world-class plant phenotyping and environmental biology labs. Final-year project students join research groups in plant science, animal genetics or marine ecology.",
            "wellbeing": "Student Wellbeing Service provides counselling, mental health support and disability services. Togetherall (24/7). SU peer support and wellbeing events. Close-knit community provides strong informal support."
        },
        "satisfaction": {"nssOverall": 86, "teachingQuality": 90, "academicSupport": 89, "learningResources": 86},
        "travelFromLondon": {"trainTime": "3h 30m (changing at Shrewsbury or Birmingham)", "trainFromStation": "London Euston or Paddington", "trainToStation": "Aberystwyth", "coachTime": "5h 30m (National Express, limited services)", "drivingTime": "3h 45m (M4/A44, off-peak)", "distanceMiles": "209 miles west of London", "nearestAirport": "Cardiff Airport (2h 30m by car) or Birmingham Airport (2h 30m by car)"},
        "accessibility": {"disabilityService": "Disability Service provides support plans, exam adjustments and assistive technology. Self-refer via the student portal.", "accessibleAccommodation": "Several halls have accessible rooms. Accessibility requirements noted at accommodation application.", "mentalHealthSupport": "Wellbeing counselling service, mental health practitioners, Togetherall (24/7), and SU peer support. Small-town community provides additional informal pastoral support.", "dyslexiaSupport": "SpLD assessment, study skills tuition, assistive technology and exam adjustments via Disability Service.", "campusAccessibility": "Aberystwyth's campus is largely step-free with accessible routes. Some older buildings have limited access. Campus accessibility guide available online."},
        "international": {"visaSupport": "International Student Support provides Student Visa guidance, CAS letters and Graduate Route advice. Pre-arrival webinars and portal.", "englishRequirements": "IELTS 6.0 overall (5.5 in each component) for most Biological Sciences programmes.", "orientationProgramme": "International Welcome Week before term: NHS registration, UK banking, town tour, Welsh language introduction and SU International welcome events.", "internationalSocietiesCount": "20+ international and cultural societies", "popularCountries": ["China", "India", "Malaysia", "United States", "Germany", "Nigeria", "Canada"]},
        "contact": {"admissionsEmail": "ug-admissions@aber.ac.uk", "admissionsPhone": "+44 (0)1970 623111", "address": "Aberystwyth University, Penglais Campus, Aberystwyth SY23 3FL", "openDayContact": "opendays@aber.ac.uk"}
    }
}


def main():
    data = json.loads(FILE.read_text(encoding="utf-8"))
    enriched = 0
    for slug, fields in NEW_DATA.items():
        if slug not in data:
            print(f"[SKIP] {slug} not found in file")
            continue
        if "website" in data[slug]:
            print(f"[SKIP] {slug} already enriched")
            continue
        data[slug].update(fields)
        print(f"[OK]   {slug}")
        enriched += 1

    FILE.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nDone — {enriched} universities enriched, file written.")


if __name__ == "__main__":
    main()
