const PLACEHOLDERS = {
  aLevel:     { text: 'e.g. A*AA', hint: 'Enter predicted A-level grades' },
  ib:         { text: 'e.g. 38',   hint: 'Enter predicted IB total points' },
  ucasPoints: { text: 'e.g. 136',  hint: 'Enter predicted UCAS points' },
};

export default function Filters({
  search, setSearch,
  tier, setTier,
  gradeType,
  predictedGrade, setPredictedGrade,
  hideReach, setHideReach,
  studentScore,
}) {
  const { text: placeholder, hint } = PLACEHOLDERS[gradeType] || PLACEHOLDERS.aLevel;
  const hasValidGrade = studentScore != null;

  return (
    <div className="flex flex-col gap-3 mb-6">
      {/* Row 1: search + tier filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search universities…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#0a1f3a] border border-blue-900/50 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors"
          />
        </div>

        <div className="flex rounded-lg border border-blue-900/50 overflow-hidden">
          {['All', 'Russell Group', 'Other Universities'].map(t => (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={`px-4 py-2.5 text-xs font-semibold tracking-wide transition-colors ${
                tier === t
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#0a1f3a] text-slate-400 hover:text-slate-200 hover:bg-blue-900/30'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Row 2: predicted grades input + hide reach toggle */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-xs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <input
            type="text"
            placeholder={`Predicted grades — ${placeholder}`}
            value={predictedGrade}
            onChange={e => setPredictedGrade(e.target.value.toUpperCase())}
            title={hint}
            className={`w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
              hasValidGrade
                ? 'bg-purple-950/30 border-purple-700/50 text-purple-200 focus:border-purple-500 focus:ring-purple-500/30'
                : 'bg-[#0a1f3a] border-blue-900/50 text-slate-200 focus:border-blue-500 focus:ring-blue-500/30'
            }`}
          />
        </div>

        {hasValidGrade && (
          <label className="flex items-center gap-2 cursor-pointer select-none group">
            <div
              onClick={() => setHideReach(!hideReach)}
              className={`relative w-9 h-5 rounded-full border transition-colors ${
                hideReach
                  ? 'bg-purple-600 border-purple-500'
                  : 'bg-slate-700 border-slate-600'
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${hideReach ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
            <span className="text-xs font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
              Hide out of scope
            </span>
          </label>
        )}

        {!hasValidGrade && predictedGrade && (
          <span className="text-xs text-slate-500">Enter valid grades to see fit badges</span>
        )}
      </div>
    </div>
  );
}
