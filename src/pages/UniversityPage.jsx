import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { getStrand } from '../config/strands';
import { useUniversityDetail } from '../hooks/useUniversityDetail';
import NSSRadarChart from '../components/NSSRadarChart';
import BudgetCalculator from '../components/BudgetCalculator';

function Section({ title, children }) {
  return (
    <div className="rounded-xl border border-blue-900/40 bg-[#0a1f3a]/40 p-4 sm:p-6 mb-5">
      <h2 className="font-display text-lg sm:text-xl font-semibold text-white mb-4 pb-3 border-b border-blue-900/40">{title}</h2>
      {children}
    </div>
  );
}

function Pill({ text, color = 'blue' }) {
  const colors = {
    blue:   'bg-blue-900/40 border-blue-700/40 text-blue-300',
    indigo: 'bg-indigo-900/40 border-indigo-700/40 text-indigo-300',
    emerald:'bg-emerald-900/40 border-emerald-700/40 text-emerald-300',
    amber:  'bg-amber-900/40 border-amber-700/40 text-amber-300',
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${colors[color]}`}>{text}</span>
  );
}

function InfoGrid({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.filter(i => i.value).map(({ label, value }) => (
        <div key={label} className="space-y-1">
          <div className="text-[10px] uppercase tracking-widest font-semibold text-blue-400/60">{label}</div>
          <div className="text-sm text-slate-200">{value}</div>
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ label, value }) {
  const pct = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs text-slate-300 mb-1">
        <span>{label}</span>
        <span className="font-semibold text-blue-300">{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-[#050e1f] border border-blue-900/40 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function RankCard({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div className="p-4 rounded-lg bg-[#050e1f]/60 border border-blue-900/30 text-center">
      <div className="text-2xl font-bold text-blue-300">#{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-slate-500 mt-1">{label}</div>
    </div>
  );
}

function ExternalLink({ href, children, variant = 'default' }) {
  if (!href) return null;
  const styles = {
    default: 'text-blue-400 hover:text-blue-300 underline text-sm',
    button: 'inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors',
    chip: 'inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border bg-blue-900/40 border-blue-700/40 text-blue-300 hover:bg-blue-900/60 transition-colors',
  };
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles[variant]}>
      {children}
    </a>
  );
}

function UniLogo({ uni }) {
  const domain = uni.website ? new URL(uni.website).hostname.replace('www.', '') : null;
  const initials = uni.name
    .split(' ')
    .filter(w => w.length > 2 && !['of', 'the', 'and', 'for'].includes(w.toLowerCase()))
    .slice(0, 2)
    .map(w => w[0])
    .join('');

  if (!domain) return null;

  return (
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-blue-900/40 bg-white/5 flex items-center justify-center overflow-hidden flex-shrink-0">
      <img
        src={`https://logo.clearbit.com/${domain}`}
        alt={`${uni.name} logo`}
        className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
        onError={e => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <span style={{ display: 'none' }} className="w-full h-full items-center justify-center text-xl font-bold text-blue-300 font-display">
        {initials}
      </span>
    </div>
  );
}

function WebsiteLinks({ uni }) {
  if (!uni.website && !uni.prospectus && !uni.virtualTour && !uni.socials) return null;
  const socials = uni.socials || {};
  return (
    <div className="mb-8 p-5 rounded-xl border border-blue-900/40 bg-[#0a1f3a]/40">
      <div className="flex flex-wrap items-center gap-3">
        {uni.website && (
          <ExternalLink href={uni.website} variant="button">
            Visit Website ↗
          </ExternalLink>
        )}
        {uni.prospectus && (
          <ExternalLink href={uni.prospectus} variant="chip">Prospectus ↗</ExternalLink>
        )}
        {uni.virtualTour && (
          <ExternalLink href={uni.virtualTour} variant="chip">Virtual Tour ↗</ExternalLink>
        )}
      </div>
      {(socials.instagram || socials.twitter || socials.youtube || socials.tiktok || socials.linkedin) && (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-blue-900/40">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-blue-400/60 mr-1">Follow</span>
          {socials.instagram && <ExternalLink href={socials.instagram} variant="chip">Instagram ↗</ExternalLink>}
          {socials.twitter && <ExternalLink href={socials.twitter} variant="chip">Twitter ↗</ExternalLink>}
          {socials.youtube && <ExternalLink href={socials.youtube} variant="chip">YouTube ↗</ExternalLink>}
          {socials.tiktok && <ExternalLink href={socials.tiktok} variant="chip">TikTok ↗</ExternalLink>}
          {socials.linkedin && <ExternalLink href={socials.linkedin} variant="chip">LinkedIn ↗</ExternalLink>}
        </div>
      )}
    </div>
  );
}

function QuickStatsRail({ uni }) {
  const stats = [];
  if (uni.rankings?.complete) stats.push({ label: 'Complete University Guide', value: `#${uni.rankings.complete}` });
  if (uni.rankings?.russellGroup) stats.push({ label: 'Group', value: 'Russell Group' });
  if (uni.fees?.homeUndergrad) stats.push({ label: 'Home fee', value: uni.fees.homeUndergrad });
  if (uni.employability?.graduateEmploymentRate) stats.push({ label: 'Graduate employment', value: uni.employability.graduateEmploymentRate });
  if (uni.satisfaction?.nssOverall) stats.push({ label: 'NSS satisfaction', value: `${uni.satisfaction.nssOverall}%` });

  if (!stats.length && !uni.website) return null;

  return (
    <aside className="lg:sticky lg:top-6 mb-6 lg:mb-0">
      <div className="rounded-xl border border-blue-900/40 bg-[#0a1f3a]/40 p-5">
        <div className="text-[10px] uppercase tracking-widest font-semibold text-blue-400/60 mb-3">Quick stats</div>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
          {stats.map(({ label, value }) => (
            <div key={label} className="p-3 rounded-lg bg-[#050e1f]/60 border border-blue-900/30">
              <div className="text-lg font-bold text-blue-300 leading-tight">{value}</div>
              <div className="text-[10px] uppercase tracking-wide text-slate-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
        {uni.website && (
          <div className="mt-4 pt-4 border-t border-blue-900/40">
            <ExternalLink href={uni.website} variant="button">
              Visit Website ↗
            </ExternalLink>
          </div>
        )}
      </div>
    </aside>
  );
}

export default function UniversityPage() {
  const { strand: strandId, slug } = useParams();
  const navigate = useNavigate();
  const strand = getStrand(strandId);
  const { uni, loading, error } = useUniversityDetail(slug, strandId);

  if (!strand) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#050e1f' }}>
        <div className="text-sm text-slate-500">Loading university details...</div>
      </div>
    );
  }

  if (error || !uni) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#050e1f' }}>
        <div className="text-center">
          <div className="text-slate-400 mb-4">
            {error ? `Error: ${error}` : `University not found in ${strand.label}.`}
          </div>
          <Link to={`/${strandId}`} className="text-blue-400 hover:text-blue-300 underline">← Back to results</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #050e1f 0%, #061428 100%)' }}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Nav */}
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors mb-6">
          <span>←</span> Back to comparison
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start gap-5 mb-4">
            <UniLogo uni={uni} />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start gap-2 mb-2">
                <span className={`px-2.5 py-1 rounded text-[11px] font-semibold tracking-wide border ${
                  uni.campusType?.includes('City') ? 'bg-indigo-900/60 border-indigo-700/50 text-indigo-300' : 'bg-slate-800/60 border-slate-600/50 text-slate-300'
                }`}>{uni.campusType}</span>
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold tracking-wide border bg-blue-900/40 border-blue-700/40 text-blue-300">Est. {uni.founded}</span>
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold tracking-wide border bg-emerald-900/40 border-emerald-700/40 text-emerald-300">{uni.totalStudents?.toLocaleString()} students</span>
                {uni.rankings?.russellGroup && (
                  <span className="px-2.5 py-1 rounded text-[11px] font-semibold tracking-wide border bg-amber-900/40 border-amber-700/40 text-amber-300">Russell Group</span>
                )}
              </div>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 leading-tight">{uni.name}</h1>
              <p className="text-blue-300/70 text-sm font-medium">{uni.city}</p>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">{uni.overview}</p>

          {uni.keyFacts && (
            <div className="flex flex-wrap gap-2 mt-4">
              {uni.keyFacts.map((f, i) => <Pill key={i} text={f} color={['blue','indigo','emerald'][i % 3]} />)}
            </div>
          )}
        </div>

        {/* Website / Quick links strip */}
        <WebsiteLinks uni={uni} />

        {/* Main 2-col layout: content + sticky rail */}
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-6">

          <div>

            {/* Rankings & Reputation */}
            {uni.rankings && (
              <Section title={`Rankings & Reputation${uni.rankings.year ? ` (${uni.rankings.year})` : ''}`}>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                  <RankCard label="Complete UG" value={uni.rankings.complete} />
                  <RankCard label="Guardian" value={uni.rankings.guardian} />
                  <RankCard label="Times" value={uni.rankings.times} />
                  <RankCard label="QS World" value={uni.rankings.qsWorld} />
                  <RankCard label="THE World" value={uni.rankings.theWorld} />
                </div>
                {uni.rankings.russellGroup && (
                  <div className="mb-3">
                    <Pill text="✓ Russell Group member" color="emerald" />
                  </div>
                )}
                {uni.reputation && <p className="text-slate-300 text-sm leading-relaxed">{uni.reputation}</p>}
              </Section>
            )}

            {/* Tuition Fees & Funding */}
            {(uni.fees || uni.funding) && (
              <Section title="Tuition Fees & Funding">
                {uni.fees && (
                  <InfoGrid items={[
                    { label: 'Home undergraduate fee', value: uni.fees.homeUndergrad },
                    { label: 'International undergraduate fee', value: uni.fees.internationalUndergrad },
                    { label: 'Living cost estimate', value: uni.fees.livingCostEstimate },
                  ]} />
                )}
                {uni.funding?.scholarships?.length > 0 && (
                  <div className="mt-5">
                    <div className="text-[10px] uppercase tracking-widest font-semibold text-blue-400/60 mb-2">Scholarships</div>
                    <ul className="space-y-1">
                      {uni.funding.scholarships.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <span className="text-blue-500 mt-0.5 flex-shrink-0">▸</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {(uni.funding?.bursaries || uni.funding?.paymentPlan) && (
                  <div className="mt-5">
                    <InfoGrid items={[
                      { label: 'Bursaries', value: uni.funding?.bursaries },
                      { label: 'Payment plan', value: uni.funding?.paymentPlan },
                    ]} />
                  </div>
                )}
                <div className="mt-6 border-t border-blue-900/40 pt-5">
                  <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-blue-400/60">
                    Budget Calculator
                  </div>
                  <BudgetCalculator uni={uni} />
                </div>
              </Section>
            )}

            {/* Employability & Graduate Outcomes */}
            {uni.employability && (
              <Section title="Employability & Graduate Outcomes">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                  {uni.employability.graduateEmploymentRate && (
                    <div className="text-center p-3 rounded-lg bg-[#050e1f]/60 border border-blue-900/30">
                      <div className="text-2xl font-bold text-emerald-300">{uni.employability.graduateEmploymentRate}</div>
                      <div className="text-[10px] uppercase tracking-wide text-slate-500 mt-1">Graduate employment</div>
                    </div>
                  )}
                  {uni.employability.medianSalary && (
                    <div className="text-center p-3 rounded-lg bg-[#050e1f]/60 border border-blue-900/30">
                      <div className="text-sm font-bold text-blue-300 leading-tight">{uni.employability.medianSalary}</div>
                      <div className="text-[10px] uppercase tracking-wide text-slate-500 mt-1">Median salary</div>
                    </div>
                  )}
                  <div className="text-center p-3 rounded-lg bg-[#050e1f]/60 border border-blue-900/30">
                    <div className="text-sm font-bold text-blue-300">{uni.employability.placementYearAvailable ? '✓ Available' : 'Not standard'}</div>
                    <div className="text-[10px] uppercase tracking-wide text-slate-500 mt-1">Placement year</div>
                  </div>
                </div>
                {uni.employability.topEmployers?.length > 0 && (
                  <div className="mb-5">
                    <div className="text-[10px] uppercase tracking-widest font-semibold text-blue-400/60 mb-2">Top graduate employers</div>
                    <div className="flex flex-wrap gap-2">
                      {uni.employability.topEmployers.map(e => <Pill key={e} text={e} color="indigo" />)}
                    </div>
                  </div>
                )}
                {uni.employability.careersService && (
                  <p className="text-slate-300 text-sm leading-relaxed">{uni.employability.careersService}</p>
                )}
              </Section>
            )}

            {/* Research & Academic Strengths */}
            {uni.research && (
              <Section title="Research & Academic Strengths">
                {uni.research.refRating && (
                  <div className="mb-4">
                    <Pill text={`REF: ${uni.research.refRating}`} color="emerald" />
                  </div>
                )}
                {uni.research.strengthAreas?.length > 0 && (
                  <div className="mb-5">
                    <div className="text-[10px] uppercase tracking-widest font-semibold text-blue-400/60 mb-2">Areas of strength</div>
                    <div className="flex flex-wrap gap-2">
                      {uni.research.strengthAreas.map(a => <Pill key={a} text={a} color="blue" />)}
                    </div>
                  </div>
                )}
                {uni.research.notableFacilities?.length > 0 && (
                  <div className="mb-5">
                    <div className="text-[10px] uppercase tracking-widest font-semibold text-blue-400/60 mb-2">Notable research facilities</div>
                    <ul className="space-y-1">
                      {uni.research.notableFacilities.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <span className="text-blue-500 mt-0.5 flex-shrink-0">▸</span>{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {uni.research.industryPartners?.length > 0 && (
                  <div>
                    <div className="text-[10px] uppercase tracking-widest font-semibold text-blue-400/60 mb-2">Industry partners</div>
                    <div className="flex flex-wrap gap-2">
                      {uni.research.industryPartners.map(p => <Pill key={p} text={p} color="indigo" />)}
                    </div>
                  </div>
                )}
              </Section>
            )}

            {/* City Life */}
            <Section title={`Living in ${uni.city}`}>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">{uni.cityLife?.description}</p>
              <InfoGrid items={[
                { label: 'Average private rent', value: uni.cityLife?.avgRentPerMonth && `${uni.cityLife.avgRentPerMonth} per month` },
                { label: 'Cost of living', value: uni.cityLife?.costOfLiving },
                { label: 'Transport', value: uni.cityLife?.transport },
                { label: 'Nightlife', value: uni.cityLife?.nightlife },
              ]} />
              {uni.cityLife?.highlights && (
                <div className="mt-5">
                  <div className="text-[10px] uppercase tracking-widest font-semibold text-blue-400/60 mb-2">City highlights</div>
                  <ul className="space-y-1">
                    {uni.cityLife.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-blue-500 mt-0.5 flex-shrink-0">▸</span>{h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Section>

            {/* Travel from London */}
            {uni.travelFromLondon && (
              <Section title="Travel from London">
                <InfoGrid items={[
                  { label: 'Fastest train', value: uni.travelFromLondon.trainTime && `${uni.travelFromLondon.trainTime}${uni.travelFromLondon.trainFromStation ? ` from ${uni.travelFromLondon.trainFromStation}` : ''}` },
                  { label: 'Coach', value: uni.travelFromLondon.coachTime },
                  { label: 'Driving', value: uni.travelFromLondon.drivingTime },
                  { label: 'Distance', value: uni.travelFromLondon.distanceMiles },
                  { label: 'Nearest airport', value: uni.travelFromLondon.nearestAirport },
                ]} />
              </Section>
            )}

            {/* Accommodation */}
            <Section title="Accommodation">
              <div className="flex flex-wrap gap-2 mb-4">
                <Pill text={uni.accommodation?.firstYearGuarantee ? '✓ First-year guarantee' : 'No first-year guarantee'} color={uni.accommodation?.firstYearGuarantee ? 'emerald' : 'amber'} />
                <Pill text={`University halls: ~${uni.accommodation?.avgWeeklyCost}/week`} color="blue" />
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">{uni.accommodation?.description}</p>
              <InfoGrid items={[
                { label: 'Average hall cost', value: uni.accommodation?.avgWeeklyCost && `${uni.accommodation.avgWeeklyCost}/week` },
                { label: 'Popular private rent areas', value: uni.accommodation?.privateRentAreas },
              ]} />
              {uni.accommodation?.halls && (
                <div className="mt-5">
                  <div className="text-[10px] uppercase tracking-widest font-semibold text-blue-400/60 mb-2">University halls of residence</div>
                  <div className="flex flex-wrap gap-2">
                    {uni.accommodation.halls.map(h => <Pill key={h} text={h} color="indigo" />)}
                  </div>
                </div>
              )}
            </Section>

            {/* Campus & Facilities */}
            {uni.facilities && (
              <Section title="Campus & Facilities">
                {uni.facilities.libraries?.length > 0 && (
                  <div className="mb-5">
                    <div className="text-[10px] uppercase tracking-widest font-semibold text-blue-400/60 mb-2">Libraries</div>
                    <ul className="space-y-1">
                      {uni.facilities.libraries.map((l, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <span className="text-blue-500 mt-0.5 flex-shrink-0">▸</span>{l}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <InfoGrid items={[
                  { label: 'Sports facilities', value: uni.facilities.sportsFacilities },
                  { label: 'Study spaces', value: uni.facilities.studySpaces },
                  { label: 'Labs', value: uni.facilities.labs },
                  { label: 'Wellbeing', value: uni.facilities.wellbeing },
                ]} />
              </Section>
            )}

            {/* Student Satisfaction */}
            {uni.satisfaction && (
              <Section title="Student Satisfaction (NSS)">
                <NSSRadarChart satisfaction={uni.satisfaction} />
              </Section>
            )}

            {/* Open Days */}
            <Section title="Open Days 2026">
              {uni.openDays?.length ? (
                <div className="space-y-3">
                  {uni.openDays.map((day, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-[#050e1f]/60 border border-blue-900/30">
                      <div className="text-blue-400 text-xl">📅</div>
                      <div>
                        <div className="text-sm font-semibold text-slate-100">{day.date}</div>
                        <div className="text-xs text-slate-400">{day.type}</div>
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-slate-600 mt-2">Dates are indicative — always confirm on the university's official website.</p>
                </div>
              ) : (
                <p className="text-slate-400 text-sm">Check the university website for open day dates.</p>
              )}
            </Section>

            {/* How to Apply */}
            <Section title="How to Apply">
              <InfoGrid items={[
                { label: 'UCAS code', value: uni.application?.ucasCode },
                { label: 'Contextual offers', value: uni.application?.contextualOffers ? 'Yes — reduced offers for eligible students' : 'Standard offers only' },
                { label: 'Interview required', value: uni.application?.interviewRequired ? 'Yes — see course page' : 'No interview required' },
                { label: 'Typical timeline', value: uni.application?.typicalTimeline },
              ]} />
              {uni.application?.personalStatementTips && (
                <div className="mt-5">
                  <div className="text-[10px] uppercase tracking-widest font-semibold text-blue-400/60 mb-2">Personal statement tips</div>
                  <ul className="space-y-2">
                    {uni.application.personalStatementTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-blue-500 flex-shrink-0 mt-0.5">{i + 1}.</span>{tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Section>

            {/* Student Life */}
            <Section title="Student Life">
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{uni.studentLife?.union}</p>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: 'Societies', value: uni.studentLife?.societiesCount },
                  { label: 'Sports teams', value: uni.studentLife?.sportsTeams },
                  { label: 'International students', value: uni.internationalStudents },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center p-3 rounded-lg bg-[#050e1f]/60 border border-blue-900/30">
                    <div className="text-lg font-bold text-blue-300">{value}</div>
                    <div className="text-[10px] uppercase tracking-wide text-slate-500 mt-1">{label}</div>
                  </div>
                ))}
              </div>
              {uni.studentLife?.highlights && (
                <ul className="space-y-1">
                  {uni.studentLife.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-blue-500 mt-0.5 flex-shrink-0">▸</span>{h}
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            {/* Disability & Accessibility Support */}
            {uni.accessibility && (
              <Section title="Disability & Accessibility Support">
                <InfoGrid items={[
                  { label: 'Disability service', value: uni.accessibility.disabilityService },
                  { label: 'Accessible accommodation', value: uni.accessibility.accessibleAccommodation },
                  { label: 'Mental health support', value: uni.accessibility.mentalHealthSupport },
                  { label: 'Dyslexia / SpLD support', value: uni.accessibility.dyslexiaSupport },
                  { label: 'Campus accessibility', value: uni.accessibility.campusAccessibility },
                ]} />
              </Section>
            )}

            {/* International Students */}
            {uni.international && (
              <Section title="International Students">
                <InfoGrid items={[
                  { label: 'Visa support', value: uni.international.visaSupport },
                  { label: 'English requirements', value: uni.international.englishRequirements },
                  { label: 'Orientation programme', value: uni.international.orientationProgramme },
                  { label: 'International societies', value: uni.international.internationalSocietiesCount },
                ]} />
                {uni.international.popularCountries?.length > 0 && (
                  <div className="mt-5">
                    <div className="text-[10px] uppercase tracking-widest font-semibold text-blue-400/60 mb-2">Most common student origin countries</div>
                    <div className="flex flex-wrap gap-2">
                      {uni.international.popularCountries.map(c => <Pill key={c} text={c} color="indigo" />)}
                    </div>
                  </div>
                )}
              </Section>
            )}

            {/* Notable Alumni */}
            {uni.notableAlumni?.length > 0 && (
              <Section title="Notable Alumni">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {uni.notableAlumni.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#050e1f]/60 border border-blue-900/30">
                      <span className="text-blue-400 text-sm mt-0.5">★</span>
                      <span className="text-sm text-slate-300">{a}</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Contact */}
            {uni.contact && (
              <Section title="Contact">
                <InfoGrid items={[
                  { label: 'Admissions email', value: uni.contact.admissionsEmail && <a href={`mailto:${uni.contact.admissionsEmail}`} className="text-blue-400 hover:text-blue-300 underline">{uni.contact.admissionsEmail}</a> },
                  { label: 'Admissions phone', value: uni.contact.admissionsPhone },
                  { label: 'Address', value: uni.contact.address },
                  { label: 'Open day contact', value: uni.contact.openDayContact && <a href={`mailto:${uni.contact.openDayContact}`} className="text-blue-400 hover:text-blue-300 underline">{uni.contact.openDayContact}</a> },
                ]} />
              </Section>
            )}

            <div className="mt-6 text-center">
              <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                ← Back to results
              </button>
            </div>

          </div>

          {/* Sticky quick-stats rail */}
          <QuickStatsRail uni={uni} />

        </div>

      </div>
    </div>
  );
}
