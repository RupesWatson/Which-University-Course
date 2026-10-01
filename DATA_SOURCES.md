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

---

# Business & Management strand

This strand was added after the sections above and follows a **different
provenance convention**, because UCAS course pages could not be cited per row.
It is deliberately explicit about which rows were confirmed and which were not.

## Per-row provenance

Every row carries a `provenance` field (`verified` | `indicative`) and an
`ibSource` field (`published` | `derived`), and the UI shows both:

- **`provenance: 'verified'`** rows carry a `sourceUrl` pointing at the
  university's own 2026 course page and an `applicationCode` taken from that
  page. The table labels these "Verified Course"; the expanded row adds a
  **Verified** field explaining what was confirmed.
- **`provenance: 'indicative'`** rows carry **no** `sourceUrl` and **no**
  `applicationCode`. The table labels these "Course Title", the UCAS code shows
  as "N/A", and the expanded row adds a **Not verified** field telling the
  reader to check the grades, IB figure and UCAS code before applying.

Provenance lives in its own field rather than in `notes` so that the Highlights
column stays short — it is a wrapping `max-w-xs` cell, and putting a provenance
sentence in every row made table rows roughly twice as tall as other strands.
`ExpandedRow` renders the provenance field only when `provenance` is present, so
the other ten strands are unaffected.

A UCAS code is never present without a source, with one documented exception:
Lancaster publishes codes in its course URLs, and rows using a code taken that
way say so in the note. `scripts/validate-data.mjs` enforces this.

**45 of 180 rows are cited.** The Business & Management table — the
highest-traffic table in the strand — is **fully verified: 31 of 31 rows**, each
with a UCAS code and IB offer read off the university's own page (Bath and
Edinburgh publish no UCAS code on theirs, so those two rows carry none). The
remaining 135 rows in the other eleven courses still need a pass — see
"Verification backlog" below.

That verification pass is worth recording, because it is the argument for
marking rows honestly in the first place: of the 16 Business & Management rows
that had been estimated, **14 were wrong** in at least one field. Only York
(AAB / IB 35) and Reading (ABB / IB 32) were right. Errors included Durham
(estimated A*AA, actually AAB), Aberdeen (AAB, actually BBC), City St George's
(ABB, actually AAA), and three rows whose course title or award was wrong —
Cardiff is a BSc not a BA, Nottingham's degree is Business and Management not
Management, and Queen's Business School now lists only the four-year placement
route. An estimate that looks plausible in a comparison table is worse than no
estimate at all.

## Rankings and graduate prospects

- `subjectRank` and `gradProspects` come from the **Complete University Guide
  2027** subject tables, which are the current edition. Five courses sit in a
  published table and are marked `rankingScope: 'official'`:

  | Course | CUG 2027 table |
  |---|---|
  | Business & Management | Business & Management Studies |
  | Accounting & Management | Accounting & Finance |
  | Marketing | Marketing |
  | Real Estate & Property | Land & Property Management |
  | Hospitality & Tourism | Tourism, Transport, Travel & Heritage Studies |

- The other seven courses show comparison-set position, ordered by the
  university's Business & Management Studies rank.
- Where a narrower table reports graduate prospects as `n/a`, the figure falls
  back to that university's **Business & Management Studies** prospects. This is
  a real sourced number for the institution, not an estimate.
- Course detail pages state the CUG year they use, driven by `rankingYear` on
  the course rather than a hardcoded label.

## Derived fields

- `ucasPoints` is **always computed** from `entryGrades` using the official UCAS
  tariff (A\* 56, A 48, B 40, C 32, D 24, E 16); for a band or alternative offer
  ("AAB-BBB", "AAA or A\*AB") the first grade set is used. The validator fails if
  a stored value disagrees. Note that some older strands contain hand-typed
  `ucasPoints` that do not match their grades.
- `ibGrades` is the university's published IB offer where one exists. Where the
  course page publishes A-levels but no IB equivalent, an indicative total is
  derived from the UCAS points, and the row's note says so:

  | A-level | 168 | 160 | 152 | 144 | 136 | 128 | 120 | 112 | 104 | 96 | 88 |
  |---|---|---|---|---|---|---|---|---|---|---|---|
  | IB total | 41 | 39 | 38 | 36 | 35 | 32 | 30 | 29 | 28 | 26 | 24 |

  `ibGrades` must lead with an IB **total** (24–45), because the grade filter
  asks the student for a predicted total. The validator enforces this.
- `overallRank` and `tier` are reused from the values the other strands already
  use, so a university does not change rank between strands.

## Generated, not hand-edited

Do not edit the row JSON or `university-details.json` by hand — regenerate:

```
node scripts/gen-business-data.mjs
node scripts/gen-business-university-details.mjs
npm run validate:data
```

University profiles reuse the factual fields (founded, student numbers, fees,
accommodation, NSS scores, travel) from the same university's profile in another
strand, so facts do not differ by strand. Subject-specific fields from the
source strand (`reputation`, `research`, `notableAlumni`, `application`, careers
service and placement copy, subject libraries and labs) are **dropped** rather
than carried over, so a business page never claims a maths department's
reputation. Business overview, employers, key facts and society highlights are
authored in the generator.

## Verification backlog

135 rows are marked Indicative. Business & Management is done. Priority order
for the rest:

| Course | Rows to verify |
|---|---|
| Accounting & Management | 16 |
| Marketing | 17 |
| International Business | 11 |
| Hospitality & Tourism | 17 |
| Economics & Management | 11 |
| Business Analytics | 11 |
| Entrepreneurship & Innovation | 11 |
| Human Resource Management | 11 |
| Supply Chain & Logistics | 12 |
| Business with Languages | 12 |
| Real Estate & Property | 6 |

Notes from the Business & Management pass, for whoever does the next one:

- Many university sites return 403 or 404 to a plain fetch (Durham, Cardiff,
  UCL, Queen's, Bayes). Driving a real browser got through every one of them.
- Search-result summaries are not reliable enough to cite — several disagreed
  with the course page itself on grades, UCAS code or award. Always open the
  page.
- Several universities have already rolled their published cycle forward to
  2027/28 (Queen's, Reading, Surrey, UCL's default view). Where the cited offer
  is for a later cycle, the row's note says so.
- Watch for the course that no longer exists in the form you assumed: Queen's
  now lists only Business Management *with Placement*, and Cardiff's degree is a
  BSc, not the BA that older listings show.
