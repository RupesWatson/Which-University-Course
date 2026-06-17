import { useState } from 'react';

const OXFORD_COORDS = {
  'oxford-balliol':           [90, 62],
  'oxford-brasenose':         [118, 85],
  'oxford-christ-church':     [105, 120],
  'oxford-corpus-christi':    [115, 110],
  'oxford-exeter':            [110, 75],
  'oxford-harris-manchester': [130, 53],
  'oxford-hertford':          [128, 70],
  'oxford-jesus':             [102, 70],
  'oxford-keble':             [100, 40],
  'oxford-lady-margaret-hall':[85, 25],
  'oxford-lincoln':           [108, 89],
  'oxford-magdalen':          [170, 95],
  'oxford-mansfield':         [140, 52],
  'oxford-merton':            [128, 112],
  'oxford-new-college':       [142, 75],
  'oxford-oriel':             [118, 100],
  'oxford-pembroke':          [97, 106],
  'oxford-queens':            [138, 90],
  'oxford-st-annes':          [75, 38],
  'oxford-st-catharines':     [170, 72],
  'oxford-st-edmund-hall':    [143, 84],
  'oxford-st-hildas':         [165, 116],
  'oxford-st-hughs':          [88, 27],
  'oxford-st-johns':          [79, 54],
  'oxford-st-peters':         [82, 80],
  'oxford-somerville':        [69, 45],
  'oxford-trinity':           [108, 59],
  'oxford-university-college':[130, 88],
  'oxford-wadham':            [138, 60],
  'oxford-worcester':         [52, 70],
};

const CAMBRIDGE_COORDS = {
  'cambridge-christs':         [122, 95],
  'cambridge-churchill':       [42, 55],
  'cambridge-clare':           [84, 102],
  'cambridge-corpus-christi':  [106, 108],
  'cambridge-downing':         [112, 120],
  'cambridge-emmanuel':        [128, 105],
  'cambridge-fitzwilliam':     [68, 60],
  'cambridge-girton':          [35, 35],
  'cambridge-gonville-and-caius': [92, 94],
  'cambridge-homerton':        [148, 125],
  'cambridge-hughes-hall':     [148, 105],
  'cambridge-jesus':           [118, 72],
  'cambridge-kings':           [88, 106],
  'cambridge-lucy-cavendish':  [72, 50],
  'cambridge-magdalene':       [72, 70],
  'cambridge-murray-edwards':  [72, 45],
  'cambridge-newnham':         [65, 110],
  'cambridge-pembroke':        [108, 118],
  'cambridge-peterhouse':      [105, 126],
  'cambridge-queens':          [88, 118],
  'cambridge-robinson':        [52, 112],
  'cambridge-selwyn':          [62, 120],
  'cambridge-sidney-sussex':   [106, 80],
  'cambridge-st-catharines':   [102, 113],
  'cambridge-st-edmunds':      [68, 66],
  'cambridge-st-johns':        [82, 80],
  'cambridge-trinity':         [88, 88],
  'cambridge-trinity-hall':    [80, 95],
  'cambridge-wolfson':         [62, 132],
};

const COORD_MAP = { ...OXFORD_COORDS, ...CAMBRIDGE_COORDS };

const OXFORD_ROADS = [
  // High Street (E-W)
  'M 52,90 L 175,90',
  // Broad Street
  'M 75,60 L 145,60',
  // St Giles'
  'M 88,25 L 88,60',
  // Cornmarket / Carfax
  'M 100,60 L 100,120',
  // Longwall / Merton St
  'M 128,75 L 128,120',
  // Magdalen Bridge area
  'M 155,90 L 180,90',
];

const CAMBRIDGE_ROADS = [
  // King's Parade / Trumpington St (N-S)
  'M 100,72 L 100,145',
  // Bridge St / St John's St
  'M 78,68 L 78,100',
  // Trinity St / King's Pde junction
  'M 78,88 L 115,88',
  // Emmanuel / Downing streets (E-W)
  'M 88,108 L 155,108',
  // Sidgwick Ave
  'M 52,110 L 82,110',
  // River Cam (stylized)
  'M 72,28 Q 68,80 65,145',
];

export default function CollegesMap({ colleges, subjectKey, focusedSlug, onFocus }) {
  const [hovered, setHovered] = useState(null);

  const isOxford = colleges[0]?.universitySlug === 'oxford';
  const roads = isOxford ? OXFORD_ROADS : CAMBRIDGE_ROADS;

  const placedColleges = colleges.filter(c => COORD_MAP[c.slug]);

  if (placedColleges.length === 0) return null;

  const tooltip = hovered ? colleges.find(c => c.slug === hovered) : null;
  const tooltipCoord = hovered ? COORD_MAP[hovered] : null;

  return (
    <div className="relative mb-6 overflow-hidden rounded-xl border border-blue-900/40 bg-[#0a1f3a]/40">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-blue-900/30 px-4 py-2.5">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-400/60">
          {isOxford ? 'Oxford' : 'Cambridge'} — College Map
        </span>
        <span className="text-[10px] text-slate-600">Click a college to jump to its card</span>
      </div>

      <div className="relative">
        <svg
          viewBox="0 0 230 160"
          className="w-full"
          style={{ maxHeight: 240 }}
        >
          {/* Subtle road lines */}
          {roads.map((d, i) => (
            <path key={i} d={d} stroke="#0d2035" strokeWidth="3" fill="none" strokeLinecap="round" />
          ))}

          {/* River tint for Cambridge */}
          {!isOxford && (
            <path
              d="M 72,28 Q 68,80 65,145"
              stroke="#0a2a4a"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
          )}

          {/* College dots */}
          {placedColleges.map(college => {
            const [x, y] = COORD_MAP[college.slug];
            const offered = subjectKey ? college.subjects?.includes(subjectKey) : true;
            const isFocused = focusedSlug === college.slug;
            const isHov = hovered === college.slug;

            const fillColor = offered
              ? isFocused || isHov ? '#60a5fa' : '#3b82f6'
              : '#1e3a5f';
            const r = isFocused || isHov ? 6 : offered ? 5 : 4;

            return (
              <g
                key={college.slug}
                style={{ cursor: 'pointer' }}
                onClick={() => onFocus(isFocused ? null : college.slug)}
                onMouseEnter={() => setHovered(college.slug)}
                onMouseLeave={() => setHovered(null)}
              >
                {(isFocused || isHov) && (
                  <circle cx={x} cy={y} r={r + 4} fill="none" stroke={offered ? '#3b82f6' : '#1e3a5f'} strokeWidth="1.5" opacity={0.5} />
                )}
                <circle
                  cx={x} cy={y} r={r}
                  fill={fillColor}
                  stroke={offered ? '#93c5fd' : '#1e3a5f'}
                  strokeWidth={offered ? 1 : 0}
                  opacity={offered ? 0.95 : 0.5}
                />
              </g>
            );
          })}

          {/* Tooltip */}
          {tooltip && tooltipCoord && (() => {
            const [tx, ty] = tooltipCoord;
            const offered = subjectKey ? tooltip.subjects?.includes(subjectKey) : true;
            const boxW = 110, boxH = 28;
            const bx = Math.min(tx - boxW / 2, 230 - boxW - 4);
            const by = ty - boxH - 10 < 4 ? ty + 10 : ty - boxH - 10;
            return (
              <g>
                <rect x={Math.max(4, bx)} y={by} width={boxW} height={boxH} rx={4} fill="#061428" stroke="#1e3a5f" strokeWidth="1" />
                <text x={Math.max(4, bx) + boxW / 2} y={by + 11} textAnchor="middle" style={{ fontSize: 8, fill: '#e2e8f0', fontWeight: 600 }}>
                  {tooltip.name}
                </text>
                <text x={Math.max(4, bx) + boxW / 2} y={by + 22} textAnchor="middle" style={{ fontSize: 7, fill: offered ? '#4ade80' : '#64748b' }}>
                  {offered ? '✓ Offered' : 'Not offered'}
                </text>
              </g>
            );
          })()}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-2 right-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full border border-blue-400/50 bg-blue-500" />
            <span className="text-[9px] text-slate-500">Offered</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-[#1e3a5f]" />
            <span className="text-[9px] text-slate-600">Not offered</span>
          </div>
        </div>
      </div>
    </div>
  );
}
