import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STRAND_LIST } from '../config/strands';

export default function Landing() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(STRAND_LIST[0].id);

  function handleExplore() {
    navigate(`/${selectedId}`);
  }

  const selected = STRAND_LIST.find(s => s.id === selectedId);

  return (
    <div className="min-h-screen flex items-center" style={{ background: 'linear-gradient(180deg, #050e1f 0%, #061428 100%)' }}>
      <div className="mx-auto w-full max-w-screen-md px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-800/40" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-blue-400/70">
              UCAS 2026 Course Audit
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-800/40" />
          </div>
          <h1 className="mb-4 font-display text-4xl font-bold leading-tight text-white md:text-5xl">
            Which University{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #93c5fd, #2563eb)' }}
            >
              Course?
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
            A side-by-side comparison tool to help you choose your UK undergraduate degree.
            Browse verified UCAS 2026 course titles, typical A-level offers, graduate prospects,
            and detail pages for Russell Group universities and the next tier down.
          </p>
        </header>

        <div className="rounded-2xl border border-blue-900/40 bg-[#0a1f3a]/60 p-6 backdrop-blur-sm sm:p-8">
          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-blue-400/70">
            Choose a subject area
          </label>

          <div className="relative mb-4">
            <select
              value={selectedId}
              onChange={e => setSelectedId(e.target.value)}
              className="w-full appearance-none rounded-lg border border-blue-900/50 bg-[#050e1f] py-3 pl-4 pr-10 text-base text-slate-100 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
            >
              {STRAND_LIST.map(strand => (
                <option key={strand.id} value={strand.id} className="bg-[#050e1f] text-slate-100">
                  {strand.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {selected?.tagline && (
            <p className="mb-5 text-xs text-slate-500">{selected.tagline}</p>
          )}

          <button
            onClick={handleExplore}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition-colors hover:bg-blue-500 sm:w-auto"
          >
            Explore {selected?.label}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        <p className="mt-6 text-center text-[11px] text-slate-600">
          More subject areas coming soon — Engineering, Computer Science, Medicine, Law and more.
        </p>
      </div>
    </div>
  );
}
