import { useParams, useSearchParams, Link, Navigate } from 'react-router-dom';
import { getStrand } from '../config/strands';
import { useColleges } from '../hooks/useColleges';
import { oxbridgeSubjectFor, oxbridgeAggregateNote } from '../config/oxbridgeSubjects';

const UNIVERSITY_NAMES = {
  oxford: 'University of Oxford',
  cambridge: 'University of Cambridge',
};

export default function CollegesPage() {
  const { strand: strandId, slug } = useParams();
  const [searchParams] = useSearchParams();
  const strand = getStrand(strandId);
  const courseId = searchParams.get('course');

  const { colleges, loading, error } = useColleges(slug);

  if (!strand || !UNIVERSITY_NAMES[slug]) {
    return <Navigate to="/" replace />;
  }

  const subjectKey = oxbridgeSubjectFor(slug, courseId);
  const aggregateNote = oxbridgeAggregateNote(slug, courseId);
  const universityName = UNIVERSITY_NAMES[slug];
  const course = strand.courses?.find(c => c.id === courseId);

  const offeredColleges = subjectKey ? colleges.filter(c => c.subjects?.includes(subjectKey)) : [];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #050e1f 0%, #061428 100%)' }}>
      <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="mb-4">
          <Link
            to={`/${strandId}?course=${courseId}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-400/80 transition-colors hover:text-blue-300"
          >
            <span>←</span> Back to comparison
          </Link>
        </div>

        <header className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-800/40" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400/60">
              College Explorer
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-800/40" />
          </div>
          <h1 className="mb-2 text-center font-display text-3xl font-bold text-white md:text-4xl">
            {universityName}
          </h1>
          {course && (
            <p className="text-center text-sm text-slate-400">
              Colleges offering <span className="text-slate-200">{course.label}</span>
            </p>
          )}
        </header>

        {!subjectKey ? (
          <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 px-6 py-12 text-center">
            <div className="mb-3 text-lg font-semibold text-amber-300">No direct undergraduate route</div>
            <p className="mx-auto max-w-lg text-sm text-slate-400">
              {universityName} does not offer a standalone undergraduate degree matching{' '}
              <span className="text-slate-200">{course?.label || courseId}</span>. Browse the university
              admissions page for related programmes.
            </p>
            <div className="mt-6">
              <Link
                to={`/${strandId}/university/${slug}`}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
              >
                View {universityName} →
              </Link>
            </div>
          </div>
        ) : (
          <>
            {aggregateNote && (
              <div className="mb-6 rounded-xl border border-blue-800/40 bg-blue-950/30 px-5 py-4">
                <p className="text-sm text-blue-300">{aggregateNote}</p>
              </div>
            )}

            {!loading && !error && colleges.length > 0 && (
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{offeredColleges.length}</span>
                <span className="text-sm text-slate-400">
                  of {colleges.length} colleges offer{' '}
                  <span className="text-slate-200">{course?.label || courseId}</span>
                </span>
              </div>
            )}

            {error ? (
              <div className="rounded-xl border border-red-900/40 bg-red-950/20 px-6 py-10 text-center text-sm text-red-400">
                Failed to load colleges: {error}
              </div>
            ) : loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-sm text-slate-500">Loading colleges...</div>
              </div>
            ) : colleges.length === 0 ? (
              <div className="rounded-xl border border-blue-900/40 py-16 text-center text-sm text-slate-500">
                College data not yet available — check back soon.
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {colleges.map(college => {
                  const isOffered = college.subjects?.includes(subjectKey);
                  return (
                    <div
                      key={college.slug}
                      className={`rounded-xl border p-4 transition-colors ${
                        isOffered
                          ? 'border-blue-900/40 bg-[#0a1f3a]/60'
                          : 'border-slate-800/60 bg-[#050e1f]/40'
                      }`}
                    >
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <h3 className={`text-sm font-semibold leading-tight ${isOffered ? 'text-slate-100' : 'text-slate-500'}`}>
                          {college.name}
                        </h3>
                        {isOffered ? (
                          <span className="inline-flex flex-shrink-0 items-center gap-1 rounded border border-emerald-700/40 bg-emerald-900/40 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                            ✓ Offered
                          </span>
                        ) : (
                          <span className="inline-flex flex-shrink-0 items-center gap-1 rounded border border-slate-700/40 bg-slate-800/40 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                            Not offered
                          </span>
                        )}
                      </div>

                      {college.founded && (
                        <div className="mb-2 text-[10px] text-slate-600">Est. {college.founded}</div>
                      )}

                      {college.overview && (
                        <p className={`mb-3 line-clamp-2 text-xs leading-relaxed ${isOffered ? 'text-slate-400' : 'text-slate-600'}`}>
                          {college.overview}
                        </p>
                      )}

                      <Link
                        to={`/${strandId}/college/${college.slug}?course=${courseId}`}
                        className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-[11px] font-semibold transition-all ${
                          isOffered
                            ? 'border-blue-600/30 bg-blue-600/15 text-blue-400 hover:bg-blue-600/25 hover:text-blue-300'
                            : 'border-slate-700/30 bg-slate-800/10 text-slate-500 hover:bg-slate-800/20'
                        }`}
                      >
                        About this college →
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        <div className="mt-10 text-center text-xs text-slate-600">
          Subject availability sourced from official college and university admissions pages.
        </div>
      </div>
    </div>
  );
}
