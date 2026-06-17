import { useMemo } from 'react';
import { getMatchTier, gradeKey } from '../utils/gradeMatch';

const TIERS = [
  { key: 'safe',          label: 'Safe',         color: '#10b981' },
  { key: 'match',         label: 'Match',        color: '#3b82f6' },
  { key: 'stretch',       label: 'Stretch',      color: '#f59e0b' },
  { key: 'out-of-scope',  label: 'Out of scope', color: '#ef4444' },
];

function polarXY(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function segmentPath(cx, cy, r, startDeg, endDeg) {
  const [sx, sy] = polarXY(cx, cy, r, endDeg);
  const [ex, ey] = polarXY(cx, cy, r, startDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 0 ${ex} ${ey}`;
}

export default function MatchSimulator({ universities, gradeType, studentScore }) {
  const counts = useMemo(() => {
    const key = gradeKey(gradeType);
    const tally = { safe: 0, match: 0, stretch: 0, 'out-of-scope': 0 };
    for (const uni of universities) {
      const tier = getMatchTier(studentScore, uni[key], gradeType);
      if (tier) tally[tier]++;
    }
    return tally;
  }, [universities, gradeType, studentScore]);

  const total = universities.length;
  if (total === 0) return null;

  const cx = 56, cy = 56, r = 40, GAP = 3;
  let angle = 0;
  const segments = TIERS.flatMap(({ key, color }) => {
    const count = counts[key];
    const sweep = (count / total) * 360;
    if (sweep < 1) { angle += sweep; return []; }
    const path = segmentPath(cx, cy, r, angle + GAP / 2, angle + sweep - GAP / 2);
    angle += sweep;
    return [{ path, color, count }];
  });

  return (
    <div className="flex items-center gap-4 rounded-xl border border-blue-900/30 bg-[#0a1f3a]/40 px-4 py-3">
      <svg width="112" height="112" viewBox="0 0 112 112" className="flex-shrink-0">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#0f2240" strokeWidth="9" />
        {segments.map(({ path, color }, i) => (
          <path key={i} d={path} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" />
        ))}
        <text x={cx} y={cy - 5} textAnchor="middle" style={{ fontSize: 19, fontWeight: 700, fill: 'white' }}>
          {total}
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" style={{ fontSize: 8, fill: '#64748b', letterSpacing: '0.06em' }}>
          UNIS
        </text>
      </svg>

      <div className="min-w-0">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-blue-400/60">
          Grade fit breakdown
        </div>
        <div className="flex flex-col gap-1">
          {TIERS.map(({ key, label, color }) => {
            const count = counts[key];
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div key={key} className="flex items-center gap-2">
                <div className="h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: color }} />
                <span className="w-24 text-xs text-slate-400">{label}</span>
                <span className="w-4 text-right text-xs font-semibold text-slate-200">{count}</span>
                <span className="text-[10px] text-slate-600">({pct}%)</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
