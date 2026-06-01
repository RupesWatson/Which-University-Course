# UK University Chemistry & Biochemistry Comparison

This app compares chemistry, biochemistry and related life-science undergraduate
courses across the top UK universities (Oxford, Cambridge, the Russell Group, and
a selection of other strong providers).

It covers 10 subject areas: Biochemistry, Chemistry, Natural Sciences, Biomedical
Sciences, Pharmacology, Molecular Biology, Medicinal Chemistry, Genetics,
Microbiology, and Biochemistry with Placement.

## Run locally

1. `npm install`
2. `npm run dev`
3. Open the local address shown in the terminal, usually `http://localhost:5173`

## Data audit

Course availability and course titles were audited against UCAS 2026 listings.

- Exact course titles come from UCAS 2026 undergraduate listings.
- Each row stores a direct UCAS source link and the UCAS application code.
- `overallRank` and `gradProspects` are sourced from the Complete University Guide
  (CUG) 2026 university pages.
- `entryGrades` and `typicalOffer` reflect UCAS A-level offer data.
- Universities are listed in a course table only when there is a verified
  undergraduate match for that subject area.
- Each row is tagged `exact` (UCAS title clearly matches the subject) or `close`
  (a nearby variant — e.g. Cambridge's Natural Sciences route into Biochemistry).

## Important caveats

- **Biochemistry** and **Chemistry** tables use the official CUG 2026 subject
  ranking position. All other subject tables use table position within the
  verified comparison set, not an official national subject ranking.
- Open day dates are indicative and should always be confirmed on the
  university's official website.
- Some supporting copy in the course-detail pages is hand-authored and should be
  treated as indicative rather than line-by-line source-audited.

## Utility scripts

- `npm run sync:ucas`
  Refreshes the course tables from UCAS 2026 using the current matching rules
  (see `scripts/sync-ucas-matches.mjs`).
- `npm run validate:data`
  Checks that every row has a verified course title, UCAS code, source URL, and
  audit status.

## Tech stack

- React 19 + React Router 7 (hash routing)
- Vite 5 build tool
- Tailwind CSS 4
- Static JSON data imported at build time (no runtime API calls)
