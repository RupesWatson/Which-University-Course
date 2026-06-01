# Data Sources Review

This project compares chemistry, biochemistry and related life-science
undergraduate courses across top UK universities.

## What is verified per row

- Undergraduate course availability for the subject area
- Exact or close course title match for each university/course table entry
- UCAS application code for each row
- Direct per-row source link to the UCAS course page
- A-level offer grades (`entryGrades` / `typicalOffer`)
- Overall university rank (`overallRank`)
- Graduate-prospects outcome percentage (`gradProspects`)

## Primary sources

- UCAS 2026 undergraduate course search and course detail pages on
  `digital.ucas.com`
- Complete University Guide (CUG) 2026 university profile pages on
  `thecompleteuniversityguide.co.uk`
- University open day dates from each institution's official website and UCAS
  events listings

## Subject areas covered

| Subject | Ranking basis | Notes |
|---|---|---|
| Biochemistry | CUG 2026 subject ranking | Oxford MBiochem flagship; Cambridge via Natural Sciences |
| Chemistry | CUG 2026 subject ranking | BSc (F100) and MChem (F103) variants |
| Natural Sciences | Comparison-set position | Cambridge flagship; interdisciplinary route |
| Biomedical Sciences | Comparison-set position | UCAS code B940/B941 |
| Pharmacology | Comparison-set position | Many BPS-accredited (B210) |
| Molecular Biology | Comparison-set position | BSc and MBiol titles |
| Medicinal Chemistry | Comparison-set position | F118 / F153 variants |
| Genetics | Comparison-set position | UCAS code C400 |
| Microbiology | Comparison-set position | UCAS code C500 |
| Biochemistry with Placement | Comparison-set position | Mandatory/optional industrial year (C702/C704/C706) |

## How the tables work

- A university appears in a subject table only if a verified UCAS undergraduate
  course was found for that subject area.
- The app shows the actual verified course title for each university.
- Rows are tagged either `exact` or `close`:
  - `exact`: the UCAS course title clearly matches the selected subject area.
  - `close`: a nearby variant that still belongs in the subject area. The most
    common case is Cambridge, which does not offer standalone Biochemistry /
    Chemistry / Genetics at undergraduate level — students apply to **Natural
    Sciences** and specialise from Year 2.

## University tiers

Each row is tagged `Russell Group` or `Other Universities`. The Russell Group
comprises the 24 research-intensive UK universities; the "Other Universities"
tier covers strong non-Russell-Group providers in the comparison set (e.g. Bath,
Sussex, Leicester, Reading, Keele, Surrey, Aberystwyth).

## Caveats

- Subject ordering for non-Biochemistry/Chemistry tables is comparison-set
  position, not an external published subject ranking.
- Long-form course-detail copy in `course-details.json` and university profile
  copy in `university-details.json` are hand-authored and indicative.
- Open day dates are indicative — always confirm on the official university site.
