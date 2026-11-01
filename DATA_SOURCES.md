# Data Sources Review

The site compares UK undergraduate courses across eleven strands (Chemistry &
Biochemistry, Finance & Accounting, Physics, Mathematics, Engineering,
Humanities, Social Sciences, Computer Science, Medicine & Healthcare, Biology &
Earth Sciences, Business & Management).

## 2027-entry re-verification (November 2026)

Every row in every strand was re-checked against **the university's own course
page for 2027 entry** — the current UCAS cycle. This replaced the original
generated data, which turned out to be unreliable:

| Problem found | Rows |
|---|---|
| A-level offer different on the live page | 779 of 1,216 kept rows (407 higher, 277 lower, the rest a different band or wording) |
| UCAS code wrong or not published | 589 |
| IB figure not an IB total (e.g. "6", "6-6-6 (18/21)") | 868 |
| Course does not exist as listed (dropped) | 183 of 1,399 |
| `sourceUrl` an invented `digital.ucas.com` link that returned 404 | every one of the 825 UCAS links |

### How each row was checked

1. A checker agent per university found the real course page and recorded the
   standard (not contextual) A-level offer, the IB total, the UCAS code, the
   entry year, and a **verbatim quote** of the offer lines.
2. Code, not the agent, then re-fetched every cited page with headless Chromium
   and confirmed that the quotes, the grades in them, the IB total and the UCAS
   code really occur on the page. Sites that block headless browsers (UCL,
   Oxford, Leicester, Cardiff, Manchester Met, Bournemouth) were confirmed the
   same way by a same-origin fetch from a real browser tab; Edinburgh, whose
   offers sit behind a dropdown, by an independent re-capture with the dropdown
   selected.
3. Every judgement call — a course that has been renamed, merged or withdrawn —
   was reviewed against one rule: a replacement stays only if it is the table's
   subject, a named route or variant of it, or (for placement tables) the parent
   degree with an optional placement year. A plain parent degree or a sibling
   subject (Mathematics for Applied Mathematics, Genetics for Molecular Biology,
   Nutrition for Dietetics) is dropped rather than shown as a match.

UCAS's own course search serves a CAPTCHA to automated browsers, so no row is
sourced from UCAS; the university's page is the source of truth.

### What each row now carries

- `sourceUrl` — the university page the offer was read from
- `entryYear` — the cycle that page states (2027 for all but a handful that
  still publish only 2026; those say so)
- `provenance: 'verified'` — shown in the expanded row as "Verified"
- `entryGrades` / `typicalOffer` — the standard offer; a band is stored
  top-first ("AAB-BBB"), and `typicalOffer` adds the subject requirements
- `ucasPoints` — always computed from the first grade set of `entryGrades`
- `ibGrades` + `ibSource` — the published IB total (with the HL requirement),
  or, where a page publishes none, the A-level equivalent marked `derived`
- `applicationCode` — only where the page publishes a UCAS code

**Tariff-only offers.** Some universities quote UCAS points instead of grades
("104–112 UCAS points"). Those rows take the top of the band, convert it to the
equivalent three grades (112 → BBC), keep the points band in `typicalOffer`, and
say so in the note — the same convention the Business strand already used.

**Graduate-entry and audition courses.** Graduate-entry Medicine asks for a
degree (e.g. "2:1 degree, any subject") and conservatoires audition. Those rows
carry `entryBasis: 'degree' | 'audition'`, no UCAS points and (graduate) no IB
figure, so the grade filter does not pretend to score them.

### Thin tables

Several course tables are subjects UK universities rarely run as a named
undergraduate degree, so verification left them short: Computational Physics
(1 row), Human-Computer Interaction (2), Operational Research (2),
Biotechnology (3) and Forestry & Countryside (3). They are kept, not removed;
deciding whether to keep each is a product call.

## Finance table (added November 2026)

The Finance strand has a new **Finance** table: single-honours Finance degrees
(BSc, BA, BFin, MA) and Finance-led variants such as Finance and Investment. All
82 institutions on the site were checked; 31 run one and are listed, ordered by
overall university rank. Accounting & Finance, Economics & Finance, Banking &
Finance and Financial Mathematics are excluded because other tables cover them,
as are online-only and top-up routes. Aberdeen's Finance page publishes no
grades, so it is left out rather than guessed. Universities new to the Finance
strand reuse their factual profile from another strand, with subject-specific
copy dropped, and take their graduate-prospects figure from the CUG 2027
**Accounting & Finance** table (the closest published subject table), not from
whatever subject another strand happened to list.

## Russell Group tags corrected (November 2026)

46 rows carried the wrong tier: Warwick, York, Southampton, Exeter and Queen's
Belfast were tagged "Other Universities" in some tables, and Bath, Leicester and
Reading "Russell Group" in others. Every row now follows the 24-member Russell
Group list, as the Business generator already did.

## University tiers

Each row is tagged `Russell Group` or `Other Universities`. The Russell Group
comprises the 24 research-intensive UK universities; the "Other Universities"
tier covers strong non-Russell-Group providers in the comparison set (e.g. Bath,
Sussex, Leicester, Reading, Keele, Surrey, Aberystwyth).

## Caveats

- Rankings and graduate prospects were **not** re-checked in this pass; they are
  still the CUG figures each strand was built with.
- Subject ordering for most tables is comparison-set position, not an external
  published subject ranking.
- Long-form course-detail copy in `course-details.json` and university profile
  copy in `university-details.json` are hand-authored and indicative.
- Open day dates are indicative — always confirm on the official university site.
- Offers change every cycle. Re-run the check each autumn when universities
  publish the next cycle.

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

The strand was first verified on 2026-10-01, mostly against 2026-entry pages.
In November 2026 every row was re-checked against the 2027-entry page (see the
re-verification section at the top) and now carries `entryYear`; the generator
passes it through from each row's `year` option. Re-check each admissions year.

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
