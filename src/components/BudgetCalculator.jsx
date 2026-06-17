import { useState } from 'react';

const WEEKS = 38;
const DEFAULT_TUITION_HOME = 9250;
const DEFAULT_TUITION_INTL = 22000;

function parseAmount(str) {
  if (!str) return null;
  const raw = String(str);
  const cleaned = raw.replace(/,/g, '');
  const numbers = cleaned.match(/\d+/g);
  if (!numbers) return null;
  const nums = numbers.map(n => parseInt(n, 10));
  // Scottish/SAAS tuition strings list a Scottish fee then an rUK fee — take rUK (last)
  if (/scottish|saas|ruk/i.test(raw)) return nums[nums.length - 1];
  // Two-number ranges like "£140-£210" → midpoint
  if (nums.length === 2) return Math.round((nums[0] + nums[1]) / 2);
  // Single value or fallback — last number
  return nums[nums.length - 1];
}

function Slider({ label, min, max, step, value, onChange }) {
  return (
    <div className="mb-4">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs text-slate-400">{label}</span>
        <span className="text-xs font-semibold text-blue-300">£{value}/wk</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full accent-blue-500"
        style={{ background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((value - min) / (max - min)) * 100}%, #1e3a5f ${((value - min) / (max - min)) * 100}%, #1e3a5f 100%)` }}
      />
      <div className="mt-0.5 flex justify-between text-[10px] text-slate-600">
        <span>£{min}</span><span>£{max}</span>
      </div>
    </div>
  );
}

const SEGMENTS = [
  { key: 'tuition',       label: 'Tuition',       color: '#6366f1' },
  { key: 'accommodation', label: 'Accommodation',  color: '#3b82f6' },
  { key: 'food',          label: 'Food',           color: '#10b981' },
  { key: 'travel',        label: 'Travel',         color: '#f59e0b' },
  { key: 'misc',          label: 'Miscellaneous',  color: '#8b5cf6' },
];

function StackedBar({ values }) {
  const total = SEGMENTS.reduce((s, seg) => s + (values[seg.key] || 0), 0);
  const BAR_H = 148;
  let cumPct = 0;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="44" height={BAR_H} viewBox={`0 0 44 ${BAR_H}`}>
        <rect x={4} y={0} width={36} height={BAR_H} rx={6} fill="#0a1f3a" />
        {SEGMENTS.map(({ key, color }) => {
          const pct = total > 0 ? (values[key] / total) * 100 : 0;
          const y = (cumPct / 100) * BAR_H;
          const h = (pct / 100) * BAR_H;
          cumPct += pct;
          if (h < 1) return null;
          return <rect key={key} x={4} y={y} width={36} height={h} fill={color} opacity={0.85} />;
        })}
      </svg>
      <div className="flex w-full flex-col gap-1.5">
        {SEGMENTS.map(({ key, label, color }) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 flex-shrink-0 rounded-sm" style={{ backgroundColor: color }} />
            <span className="flex-1 text-[11px] text-slate-400">{label}</span>
            <span className="text-[11px] font-semibold text-slate-200">£{(values[key] || 0).toLocaleString()}</span>
          </div>
        ))}
        <div className="mt-1 border-t border-blue-900/40 pt-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-blue-300">Total / year</span>
            <span className="text-sm font-bold text-blue-200">£{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BudgetCalculator({ uni, college }) {
  const [isIntl, setIsIntl] = useState(false);
  const [rent, setRent] = useState(170);
  const [food, setFood] = useState(60);
  const [travel, setTravel] = useState(20);
  const [misc, setMisc] = useState(40);

  const homeFee  = parseAmount(uni?.fees?.homeUndergrad)         ?? DEFAULT_TUITION_HOME;
  const intlFee  = parseAmount(uni?.fees?.internationalUndergrad) ?? DEFAULT_TUITION_INTL;
  const tuition  = isIntl ? intlFee : homeFee;

  const fixedRaw      = college?.accommodation?.avgCost ?? uni?.accommodation?.avgWeeklyCost ?? null;
  const fixedWeekly   = parseAmount(fixedRaw);
  const accomm = fixedWeekly != null ? fixedWeekly * WEEKS : rent * WEEKS;
  const hasFixedAccomm = fixedWeekly != null;

  const values = {
    tuition,
    accommodation: accomm,
    food:   food  * WEEKS,
    travel: travel * WEEKS,
    misc:   misc   * WEEKS,
  };

  return (
    <div>
      {/* Student type toggle */}
      <div className="mb-5 flex gap-2">
        {['Home (UK)', 'International'].map((label, i) => (
          <button
            key={label}
            onClick={() => setIsIntl(i === 1)}
            className={`rounded px-3 py-1.5 text-xs font-semibold transition-colors ${
              isIntl === (i === 1)
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Sliders */}
        <div className="min-w-0 flex-1">
          <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-blue-400/60">
            Weekly living costs
          </div>

          {hasFixedAccomm ? (
            <div className="mb-4 flex items-center justify-between rounded-lg border border-blue-900/30 bg-[#050e1f]/60 px-3 py-2">
              <span className="text-xs text-slate-400">Accommodation</span>
              <span className="text-xs font-semibold text-blue-300">
                {fixedRaw} <span className="text-slate-600">(from data)</span>
              </span>
            </div>
          ) : (
            <Slider label="Accommodation" min={100} max={350} step={5} value={rent} onChange={setRent} />
          )}

          <Slider label="Food & groceries" min={30} max={150} step={5} value={food}   onChange={setFood} />
          <Slider label="Travel"           min={0}  max={80}  step={5} value={travel} onChange={setTravel} />
          <Slider label="Miscellaneous"    min={10} max={100} step={5} value={misc}   onChange={setMisc} />

          <p className="mt-2 text-[10px] text-slate-600">
            Estimated over {WEEKS} teaching weeks. Tuition is {isIntl ? 'international' : 'home'} fee from official data.
          </p>
        </div>

        {/* Stacked bar */}
        <div className="flex-shrink-0">
          <StackedBar values={values} />
        </div>
      </div>
    </div>
  );
}
