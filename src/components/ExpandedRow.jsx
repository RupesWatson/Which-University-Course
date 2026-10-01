import GradeBadge from './GradeBadge';

function LinkValue({ href, children }) {
  if (!href) return <span>{children}</span>;

  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-blue-200 hover:underline">
      {children}
    </a>
  );
}

export default function ExpandedRow({ university, course, colSpan }) {
  const rankLabel = course?.rankLabel || 'Table Position';
  const entryGrades = university.entryGrades || university.aLevelGrades;
  // Strands added at different times cite different CUG editions, so the year
  // comes from the course rather than being fixed here.
  const rankingYear = course?.rankingYear ?? 2026;
  const rankText = course?.rankingScope === 'official'
    ? `#${university.subjectRank} in the CUG ${rankingYear} subject ranking`
    : `#${university.subjectRank} in this comparison set`;

  // Strands that record per-row provenance say so here. Strands that don't set
  // the field are unaffected — the row simply omits it.
  const provenanceText = {
    verified: `Offer and course title confirmed against the university's own 2026 entry page${
      university.ibSource === 'derived' ? '. That page publishes no IB offer, so the IB figure is an equivalent' : ''}.`,
    indicative: `Not confirmed against the university's own page. Grades are indicative${
      university.ibSource === 'derived' ? ' and the IB figure is derived from them' : ''
    } — check both, and the UCAS code, before applying.`,
  }[university.provenance];

  const fields = [
    { label: 'Course Title', value: <LinkValue href={university.sourceUrl}>{university.courseName}</LinkValue> },
    { label: 'UCAS Code', value: university.applicationCode || 'N/A' },
    { label: 'Course Type', value: university.matchType === 'exact' ? 'Exact course title' : 'Close course variant' },
    { label: 'Typical Offer', value: university.typicalOffer },
    {
      label: rankLabel,
      value: university.subjectRank != null ? rankText : 'No current table position',
    },
    { label: 'Graduate Prospects', value: `${university.gradProspects} in graduate-level employment` },
    { label: 'Highlights', value: university.notes },
    ...(provenanceText ? [{
      label: university.provenance === 'verified' ? 'Verified' : 'Not verified',
      value: provenanceText,
    }] : []),
  ];

  return (
    <tr className="bg-[#061428]">
      <td colSpan={colSpan} className="px-6 py-0">
        <div className="expand-open border-t border-blue-900/30 py-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {fields.map(({ label, value }) => (
              <div key={label} className="space-y-1">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-blue-400/60">{label}</div>
                <div className="text-sm text-slate-200">{value}</div>
              </div>
            ))}
            <div className="space-y-1">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-blue-400/60">Entry Grade</div>
              <GradeBadge grade={entryGrades} />
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
