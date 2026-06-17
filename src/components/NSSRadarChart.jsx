const AXES = [
  { key: 'nssOverall',        label: 'Overall' },
  { key: 'teachingQuality',   label: 'Teaching' },
  { key: 'learningResources', label: 'Resources' },
  { key: 'academicSupport',   label: 'Support' },
];

function pt(cx, cy, r, i, n) {
  const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
  return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}

export default function NSSRadarChart({ satisfaction }) {
  if (!satisfaction) return null;

  const axes = AXES.filter(a => satisfaction[a.key] != null);
  if (axes.length < 3) return null;

  const n = axes.length;
  const cx = 100, cy = 96, maxR = 62;
  const levels = [25, 50, 75, 100];

  const gridPolygons = levels.map(lvl => {
    const r = (lvl / 100) * maxR;
    return Array.from({ length: n }, (_, i) => pt(cx, cy, r, i, n).join(',')).join(' ');
  });

  const scorePoints = axes.map((a, i) => {
    const val = Math.max(0, Math.min(100, Number(satisfaction[a.key]) || 0));
    return pt(cx, cy, (val / 100) * maxR, i, n);
  });
  const scorePoly = scorePoints.map(p => p.join(',')).join(' ');

  const labelR = maxR + 22;

  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="192" viewBox="0 0 200 192">
        {/* Grid rings */}
        {gridPolygons.map((pts, i) => (
          <polygon key={i} points={pts} fill="none" stroke="#0f2240" strokeWidth={i === gridPolygons.length - 1 ? 1.5 : 1} />
        ))}
        {/* Level labels on vertical axis */}
        {levels.slice(0, 3).map(lvl => {
          const [lx, ly] = pt(cx, cy, (lvl / 100) * maxR, 0, n);
          return (
            <text key={lvl} x={lx + 3} y={ly + 1} style={{ fontSize: 7, fill: '#334155' }}>
              {lvl}
            </text>
          );
        })}
        {/* Axis spokes */}
        {Array.from({ length: n }, (_, i) => {
          const [ox, oy] = pt(cx, cy, maxR, i, n);
          return <line key={i} x1={cx} y1={cy} x2={ox} y2={oy} stroke="#0f2240" strokeWidth="1" />;
        })}
        {/* Score polygon */}
        <polygon points={scorePoly} fill="rgba(139,92,246,0.22)" stroke="#a78bfa" strokeWidth="2" />
        {/* Score dots */}
        {scorePoints.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.5" fill="#a78bfa" />
        ))}
        {/* Axis labels */}
        {axes.map((a, i) => {
          const [lx, ly] = pt(cx, cy, labelR, i, n);
          const val = Number(satisfaction[a.key]);
          const anchor = lx < cx - 4 ? 'end' : lx > cx + 4 ? 'start' : 'middle';
          return (
            <g key={a.key}>
              <text x={lx} y={ly - 3} textAnchor={anchor} style={{ fontSize: 8, fill: '#94a3b8', fontWeight: 600, letterSpacing: '0.05em' }}>
                {a.label.toUpperCase()}
              </text>
              <text x={lx} y={ly + 9} textAnchor={anchor} style={{ fontSize: 11, fill: '#c4b5fd', fontWeight: 700 }}>
                {val}%
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-1 text-[10px] text-slate-600">National Student Survey — most recent published data.</p>
    </div>
  );
}
