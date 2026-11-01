# Which University Course?

A UK undergraduate course finder. It compares courses across eleven subject
strands — Chemistry & Biochemistry, Finance & Accounting, Physics, Mathematics,
Engineering, Humanities, Social Sciences, Computer Science, Medicine &
Healthcare, Biology & Earth Sciences, and Business & Management — at Oxford,
Cambridge, the Russell Group and other strong UK providers, for **2027 entry**.

## Run locally

1. `npm install`
2. `npm run dev`
3. Open the local address shown in the terminal, usually `http://localhost:5173`

## Where the data comes from

Every row was checked in November 2026 against **the university's own course
page for 2027 entry**, and cites that page in `sourceUrl`. `DATA_SOURCES.md`
explains the method, what was found, and the conventions (tariff-only offers,
graduate-entry courses, grade bands).

- `entryGrades` / `typicalOffer` — the standard A-level offer from the
  university's page; `ucasPoints` is computed from it.
- `ibGrades` — the published IB total, or an A-level equivalent marked
  `ibSource: 'derived'` where the page gives none.
- `applicationCode` — only where the university publishes a UCAS code.
- A university appears in a table only if it runs an undergraduate course in
  that subject; rows are tagged `exact` or `close` (a named route or variant,
  e.g. Cambridge's Natural Sciences route into Biochemistry).

## Important caveats

- Offers change every cycle — always confirm on the university's own page.
- Rankings and graduate prospects come from the Complete University Guide and
  were not re-checked in the November 2026 pass. Most tables show position
  within the comparison set, not an official subject ranking.
- Open day dates and the long-form course and university copy are indicative.

## Scripts

- `npm run validate:data` — holds every row to the data rules: a cited
  university page (never UCAS), UCAS points that agree with the grades, an IB
  total, and no UCAS code on an unverified row.
- `npm test` — unit tests for the grade-matching logic.
- `node scripts/gen-business-data.mjs` and
  `node scripts/gen-business-university-details.mjs` — the Business strand is
  generated; edit these, not its JSON.
- `npm run sync:ucas` — **superseded; do not run.** It rebuilds the Chemistry &
  Biochemistry tables from UCAS search with UCAS links, which would overwrite the
  verified data (and the validator now rejects UCAS links).

## Tech stack

- React 19 + React Router 7 (hash routing)
- Vite 5 build tool
- Tailwind CSS 4
- Static JSON data imported at build time (no runtime API calls)
