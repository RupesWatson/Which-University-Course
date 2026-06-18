import { useParams, useSearchParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { getStrand } from '../config/strands';
import { useCollegeDetail } from '../hooks/useCollegeDetail';
import { oxbridgeSubjectFor } from '../config/oxbridgeSubjects';
import BudgetCalculator from '../components/BudgetCalculator';

function Section({ title, children }) {
  return (
    <div className="mb-5 rounded-xl border border-blue-900/40 bg-[#0a1f3a]/40 p-4 sm:p-6">
      <h2 className="mb-4 border-b border-blue-900/40 pb-3 font-display text-lg sm:text-xl font-semibold text-white">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Pill({ text, color = 'blue' }) {
  const colors = {
    blue:    'bg-blue-900/40 border-blue-700/40 text-blue-300',
    indigo:  'bg-indigo-900/40 border-indigo-700/40 text-indigo-300',
    emerald: 'bg-emerald-900/40 border-emerald-700/40 text-emerald-300',
    amber:   'bg-amber-900/40 border-amber-700/40 text-amber-300',
    slate:   'bg-slate-800/60 border-slate-600/50 text-slate-300',
  };
  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${colors[color]}`}>
      {text}
    </span>
  );
}

function InfoGrid({ items }) {
  const visible = items.filter(i => i.value != null && i.value !== '');
  if (!visible.length) return null;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {visible.map(({ label, value }) => (
        <div key={label} className="space-y-1">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-blue-400/60">{label}</div>
          <div className="text-sm text-slate-200">{value}</div>
        </div>
      ))}
    </div>
  );
}

function ExternalLink({ href, children, variant = 'default' }) {
  if (!href) return null;
  const styles = {
    default: 'text-blue-400 hover:text-blue-300 underline text-sm',
    button: 'inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500',
    chip: 'inline-flex items-center gap-1 rounded-full border border-blue-700/40 bg-blue-900/40 px-3 py-1.5 text-xs font-medium text-blue-300 transition-colors hover:bg-blue-900/60',
  };
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles[variant]}>
      {children}
    </a>
  );
}

function StatCard({ label, value }) {
  if (!value) return null;
  return (
    <div className="rounded-lg border border-blue-900/30 bg-[#050e1f]/60 p-4 text-center">
      <div className="text-2xl font-bold text-blue-300">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-wide text-slate-500">{label}</div>
    </div>
  );
}

export default function CollegePage() {
  const { strand: strandId, collegeSlug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const strand = getStrand(strandId);
  const courseId = searchParams.get('course');

  const { college, loading, error } = useCollegeDetail(collegeSlug);

  if (!strand) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: '#050e1f' }}>
        <div className="text-sm text-slate-500">Loading college details...</div>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: '#050e1f' }}>
        <div className="text-center">
          <div className="mb-4 text-slate-400">
            {error ? `Error: ${error}` : 'College not found.'}
          </div>
          <button onClick={() => navigate(-1)} className="text-blue-400 underline hover:text-blue-300">
            ← Go back
          </button>
        </div>
      </div>
    );
  }

  const subjectKey = oxbridgeSubjectFor(college.universitySlug, courseId);
  const isOffered = subjectKey ? college.subjects?.includes(subjectKey) : null;
  const backUrl = `/${strandId}/university/${college.universitySlug}/colleges${courseId ? `?course=${courseId}` : ''}`;
  const course = strand.courses?.find(c => c.id === courseId);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #050e1f 0%, #061428 100%)' }}>
      <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm text-blue-400 transition-colors hover:text-blue-300"
        >
          ← Back to colleges
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {college.founded && (
              <span className="rounded border border-blue-700/40 bg-blue-900/40 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-blue-300">
                Est. {college.founded}
              </span>
            )}
            {college.location && (
              <span className="rounded border border-slate-600/50 bg-slate-800/60 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-slate-300">
                {college.location}
              </span>
            )}
            {isOffered !== null && (
              isOffered ? (
                <span className="rounded border border-emerald-700/40 bg-emerald-900/40 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                  ✓ Offers {course?.label || courseId}
                </span>
              ) : (
                <span className="rounded border border-slate-600/50 bg-slate-800/40 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                  Does not offer {course?.label || courseId}
                </span>
              )
            )}
          </div>

          <h1 className="mb-2 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            {college.name}
          </h1>
          <p className="text-sm font-medium text-blue-300/70">
            {college.universitySlug === 'oxford' ? 'University of Oxford' : 'University of Cambridge'}
          </p>

          {college.overview && (
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400">{college.overview}</p>
          )}

          {college.keyFacts?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {college.keyFacts.map((f, i) => (
                <Pill key={i} text={f} color={['blue', 'indigo', 'emerald'][i % 3]} />
              ))}
            </div>
          )}
        </div>

        {/* Website */}
        {college.website && (
          <div className="mb-8 rounded-xl border border-blue-900/40 bg-[#0a1f3a]/40 p-5">
            <ExternalLink href={college.website} variant="button">
              Visit College Website ↗
            </ExternalLink>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-6">

          <div>

            {/* Character */}
            {college.character && (
              <Section title="College Character">
                <p className="text-sm leading-relaxed text-slate-300">{college.character}</p>
              </Section>
            )}

            {/* Academic Strengths */}
            {college.academicStrengths?.length > 0 && (
              <Section title="Academic Strengths">
                <div className="flex flex-wrap gap-2">
                  {college.academicStrengths.map((s, i) => (
                    <Pill key={i} text={s} color={['blue', 'indigo', 'emerald', 'amber'][i % 4]} />
                  ))}
                </div>
              </Section>
            )}

            {/* Accommodation */}
            {college.accommodation && (
              <Section title="Accommodation">
                <div className="mb-4 flex flex-wrap gap-2">
                  {college.accommodation.yearsGuaranteed != null && (
                    <Pill
                      text={`${college.accommodation.yearsGuaranteed} year${college.accommodation.yearsGuaranteed !== 1 ? 's' : ''} accommodation guaranteed`}
                      color="emerald"
                    />
                  )}
                  {college.accommodation.inCollege && (
                    <Pill text="In-college rooms available" color="blue" />
                  )}
                  {college.accommodation.avgCost && (
                    <Pill text={`~${college.accommodation.avgCost}`} color="amber" />
                  )}
                </div>
                {college.accommodation.description && (
                  <p className="text-sm leading-relaxed text-slate-300">{college.accommodation.description}</p>
                )}
              </Section>
            )}

            {/* Finances */}
            {college.finances && (
              <Section title="Finances & Bursaries">
                <InfoGrid items={[
                  { label: 'Endowment', value: college.finances.endowment },
                  { label: 'Bursaries', value: college.finances.bursaries },
                ]} />
                {college.finances.description && (
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">{college.finances.description}</p>
                )}
                <div className="mt-6 border-t border-blue-900/40 pt-5">
                  <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-blue-400/60">
                    Budget Calculator
                  </div>
                  <BudgetCalculator college={college} />
                </div>
              </Section>
            )}

            {/* Notable Alumni */}
            {college.notableAlumni?.length > 0 && (
              <Section title="Notable Alumni">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {college.notableAlumni.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg border border-blue-900/30 bg-[#050e1f]/60 p-3">
                      <span className="mt-0.5 flex-shrink-0 text-sm text-blue-400">★</span>
                      <span className="text-sm text-slate-300">{a}</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

          </div>

          {/* Sidebar quick stats */}
          <aside className="mb-6 lg:sticky lg:top-6 lg:mb-0">
            <div className="rounded-xl border border-blue-900/40 bg-[#0a1f3a]/40 p-5">
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-blue-400/60">
                Quick facts
              </div>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                {college.studentNumbers?.undergraduates && (
                  <StatCard label="Undergraduates" value={college.studentNumbers.undergraduates?.toLocaleString?.()} />
                )}
                {college.studentNumbers?.postgraduates && (
                  <StatCard label="Postgraduates" value={college.studentNumbers.postgraduates?.toLocaleString?.()} />
                )}
                {college.studentNumbers?.total && (
                  <StatCard label="Total students" value={college.studentNumbers.total?.toLocaleString?.()} />
                )}
                {college.founded && (
                  <StatCard label="Founded" value={college.founded} />
                )}
              </div>

              {college.website && (
                <div className="mt-4 border-t border-blue-900/40 pt-4">
                  <ExternalLink href={college.website} variant="button">
                    Visit Website ↗
                  </ExternalLink>
                </div>
              )}
            </div>

            <div className="mt-4">
              <Link
                to={backUrl}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-blue-900/40 bg-[#0a1f3a]/40 px-4 py-3 text-sm font-medium text-blue-400 transition-colors hover:bg-[#0a1f3a]/60 hover:text-blue-300"
              >
                ← All {college.universitySlug === 'oxford' ? 'Oxford' : 'Cambridge'} colleges
              </Link>
            </div>
          </aside>

        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-blue-400 transition-colors hover:text-blue-300"
          >
            ← Back to colleges
          </button>
        </div>

      </div>
    </div>
  );
}
