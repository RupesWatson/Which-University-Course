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
Instead every row is cited against the university's own course page.

## Every row is cited

**152 of 152 rows carry a `sourceUrl`** pointing at the university's own course
page, together with the UCAS code and IB offer that page publishes. There are no
indicative rows left in the strand.

Each row still records its provenance explicitly:

- `provenance` is `verified` for every row, and `ExpandedRow` shows a **Verified**
  field saying what was confirmed.
- `ibSource` is `published` where the university states an IB total, and
  `derived` where it does not. Around a quarter of rows are `derived`: many
  post-92 providers quote a UCAS tariff range instead of grades and give no IB
  total, so those rows take the top of the tariff band as the A-level figure and
  the A-level equivalent as the IB figure. The row note always says so.
- A UCAS code is present only where the course page publishes one. Several
  universities (Bath, Edinburgh, and most of the tariff-based providers) do not.

`scripts/validate-data.mjs` enforces all of this, including that `provenance`
agrees with whether a source is cited and that no UCAS code appears without one.

## What verification changed

Verification was not a formality. Of the 180 rows originally generated,
**roughly three in five were wrong** in at least one field, and the errors were
mostly not grades:

| Problem | Effect |
|---|---|
| Course does not exist under that title | row swapped for the university's real course, or dropped |
| Wrong award (BA vs BSc vs MA vs MAcc) | corrected |
| Wrong UCAS code or no code published | corrected, or the code removed |
| Grades out by one or two bands | corrected |

**28 rows and one whole course were removed** because the degree does not exist:

- **Supply Chain & Logistics** was dropped entirely. Only four of its twelve
  universities run an undergraduate supply chain degree; the rest teach it at
  masters level, as work-based distance learning, or as a one-year top-up. UK
  supply chain is a specialism or a postgraduate subject, not a named
  undergraduate degree.
- **Entrepreneurship** lost six of twelve rows for the same reason — it is
  usually a pathway inside a management degree rather than a named course.
- Individual drops elsewhere: Nottingham (International Business, Business
  Analytics, Entrepreneurship), Cardiff (Business Analytics), Kent and Lincoln
  (HRM), Durham/Exeter/Manchester/Aston/Northumbria (Business with Languages),
  Stirling/Sheffield Hallam/Coventry/LJMU (Hospitality & Tourism).

Notable individual findings: Queen's no longer runs a three-year Accounting BSc,
only a four-year Advanced Accounting MAcc; Cambridge has renamed Land Economy to
**Environment, Law and Economics**; Cardiff's Business Management is a BSc, not
a BA; Sheffield's Accounting and Financial Management is a BA, not a BSc.

The strand is now **11 courses and 152 rows**, down from 12 and 180.

## Rankings and graduate prospects

- `subjectRank` and `gradProspects` come from the **Complete University Guide
  2027** subject tables. Four courses sit in a published table and are marked
  `rankingScope: 'official'`:

  | Course | CUG 2027 table |
  |---|---|
  | Business & Management | Business & Management Studies |
  | Accounting | Accounting & Finance |
  | Marketing | Marketing |
  | Real Estate & Property | Land & Property Management |
  | Hospitality & Tourism | Tourism, Transport, Travel & Heritage Studies |

- The other courses show comparison-set position, ordered by the university's
  Business & Management Studies rank.
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
- `ibGrades` must lead with an IB **total** (24-45), because the grade filter
  asks the student for a predicted total. Where a university publishes no total,
  it is derived from the UCAS points:

  | A-level | 168 | 160 | 152 | 144 | 136 | 128 | 120 | 112 | 104 | 96 | 88 |
  |---|---|---|---|---|---|---|---|---|---|---|---|
  | IB total | 41 | 39 | 38 | 36 | 35 | 32 | 30 | 29 | 28 | 26 | 24 |

- `overallRank` and `tier` are reused from the values the other strands already
  use, so a university does not change rank between strands.

## Cycle drift

Several universities have already rolled their published cycle forward to
2027/28 (Queen's, Reading, Surrey, Bath, Bristol, Leicester, UCL's default view
and others). Where the cited offer is for a later cycle, the row's note says so.
This is worth re-checking each admissions year.

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

## Practical notes for the next refresh

- Many university sites return 403 or 404 to a plain fetch (Durham, Cardiff,
  UCL, Queen's, Bayes, Hull, Birmingham). Driving a real browser got through
  every one of them.
- Search-result summaries are **not reliable enough to cite** — several
  disagreed with the course page itself on grades, UCAS code or award. Always
  open the page.
- Watch for courses that have been renamed, merged or withdrawn between cycles;
  that was the single largest source of error in the first pass.
