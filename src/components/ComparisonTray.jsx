import { useEffect } from 'react';
import { gradeKey } from '../utils/gradeMatch';

const FIELDS = [
  { label: 'Tier',            render: u => u.tier === 'Russell Group' ? <TierBadge rg /> : <TierBadge /> },
  { label: 'UK Rank',         render: u => u.overallRank != null ? `#${u.overallRank}` : '—' },
  { label: 'Subject Rank',    render: u => u.subjectRank  != null ? `#${u.subjectRank}`  : '—' },
  { label: 'A-Level Offer',   render: u => u.entryGrades ?? u.aLevelGrades ?? '—' },
  { label: 'IB Points',       render: u => u.ibGrades ? `${u.ibGrades} pts` : '—' },
  { label: 'UCAS Points',     render: u => u.ucasPoints ? `${u.ucasPoints} pts` : '—' },
  { label: 'Grad Prospects',  render: u => u.gradProspects ?? '—' },
  { label: 'Typical Offer',   render: u => u.typicalOffer ?? '—' },
  { label: 'Verified Course', render: u => u.courseNameText ?? u.courseName ?? '—' },
];

function TierBadge({ rg }) {
  return rg ? (
    <span className="inline-block rounded border border-indigo-700/50 bg-indigo-900/60 px-2 py-0.5 text-[10px] font-semibold text-indigo-300">
      Russell Group
    </span>
  ) : (
    <span className="inline-block rounded border border-slate-600/50 bg-slate-800/60 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
      Other
    </span>
  );
}

export default function ComparisonTray({ unis, onClose }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!unis.length) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-label="University comparison"
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col border-l border-blue-900/40 bg-[#050e1f] shadow-2xl"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-900/40 px-5 py-4">
          <div>
            <h2 className="font-display text-lg font-semibold text-white">Compare Universities</h2>
            <p className="text-xs text-slate-500">{unis.length} selected — up to 3</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-blue-900/40 p-2 text-slate-400 transition-colors hover:border-blue-700/40 hover:text-white"
            aria-label="Close comparison"
          >
            ✕
          </button>
        </div>

        {/* Comparison grid */}
        <div className="flex-1 overflow-y-auto">
          {/* University names header */}
          <div
            className="sticky top-0 z-10 grid border-b border-blue-900/40 bg-[#061428]"
            style={{ gridTemplateColumns: `clamp(80px, 22vw, 140px) repeat(${unis.length}, minmax(0, 1fr))` }}
          >
            <div className="px-3 py-3 sm:px-4" />
            {unis.map(u => (
              <div key={u.name} className="min-w-0 border-l border-blue-900/30 px-2.5 py-3 sm:px-4">
                <div className="break-words text-xs font-semibold leading-tight text-slate-100 sm:text-sm">{u.name}</div>
                {u.courseName && (
                  <div className="mt-0.5 truncate text-[10px] text-slate-500">{u.courseName}</div>
                )}
              </div>
            ))}
          </div>

          {/* Rows */}
          {FIELDS.map(({ label, render }, fi) => (
            <div
              key={label}
              className={`grid border-b border-blue-900/20 ${fi % 2 === 0 ? 'bg-[#050e1f]' : 'bg-[#07152a]'}`}
              style={{ gridTemplateColumns: `clamp(80px, 22vw, 140px) repeat(${unis.length}, minmax(0, 1fr))` }}
            >
              <div className="flex items-center px-3 py-3 text-[9px] font-semibold uppercase tracking-widest text-blue-400/60 sm:px-4 sm:text-[10px]">
                {label}
              </div>
              {unis.map(u => (
                <div key={u.name} className="flex min-w-0 items-center break-words border-l border-blue-900/20 px-2.5 py-3 text-xs text-slate-200 sm:px-4 sm:text-sm">
                  {render(u)}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-blue-900/40 px-5 py-3">
          <button
            onClick={onClose}
            className="text-xs text-slate-500 transition-colors hover:text-slate-300"
          >
            ← Back to table
          </button>
        </div>
      </div>
    </>
  );
}
