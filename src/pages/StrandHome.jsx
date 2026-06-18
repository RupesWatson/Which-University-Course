import { useMemo, useState } from 'react';
import { useParams, useSearchParams, Link, Navigate } from 'react-router-dom';
import { getStrand } from '../config/strands';
import StatsBar from '../components/StatsBar';
import Filters from '../components/Filters';
import CourseSelect from '../components/CourseSelect';
import Table from '../components/Table';
import MatchSimulator from '../components/MatchSimulator';
import ComparisonTray from '../components/ComparisonTray';
import { scoreGrade, getMatchTier, gradeKey } from '../utils/gradeMatch';

export default function StrandHome() {
  const { strand: strandId } = useParams();
  const strand = getStrand(strandId);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [tier, setTier] = useState('All');
  const [gradeType, setGradeType] = useState('aLevel');
  const [predictedGrade, setPredictedGrade] = useState('');
  const [hideReach, setHideReach] = useState(false);
  const [selectedUnis, setSelectedUnis] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const courses = strand?.courses ?? [];
  const courseId = searchParams.get('course') || courses[0]?.id;
  const course = courses.find(item => item.id === courseId) || courses[0] || null;

  const rows = course?.data ?? [];
  const rowCounts = useMemo(
    () => new Map(courses.map(c => [c.id, c.data?.length ?? 0])),
    [courses],
  );

  const studentScore = predictedGrade ? scoreGrade(predictedGrade, gradeType) : null;

  const filtered = useMemo(() => {
    const key = gradeKey(gradeType);
    return rows.filter(university => {
      const matchSearch = university.name.toLowerCase().includes(search.toLowerCase());
      const matchTier = tier === 'All' || university.tier === tier;
      if (!matchSearch || !matchTier) return false;
      if (hideReach && studentScore != null) {
        const fit = getMatchTier(studentScore, university[key], gradeType);
        if (fit === 'out-of-scope') return false;
      }
      return true;
    });
  }, [rows, search, tier, hideReach, studentScore, gradeType]);

  if (!strand) {
    return <Navigate to="/" replace />;
  }

  const { courseGroups } = strand;

  const selectedNames = useMemo(() => new Set(selectedUnis.map(u => u.name)), [selectedUnis]);

  function toggleSelectUni(uni) {
    setSelectedUnis(prev => {
      if (prev.some(u => u.name === uni.name)) return prev.filter(u => u.name !== uni.name);
      if (prev.length >= 3) return prev;
      return [...prev, uni];
    });
  }

  function handleCourseChange(id) {
    setSearchParams({ course: id }, { replace: true });
    setSearch('');
    setTier('All');
    setSelectedUnis([]);
    setShowComparison(false);
  }

  function handleGradeTypeChange(type) {
    setGradeType(type);
    setPredictedGrade('');
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #050e1f 0%, #061428 100%)' }}>
      <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-400/80 transition-colors hover:text-blue-300"
          >
            <span>←</span> Choose a different subject area
          </Link>
        </div>

        <header className="mb-6 sm:mb-10">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-800/40" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400/60">
              {strand.headerEyebrow}
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-800/40" />
          </div>
          <h1 className="mb-3 text-center font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
            {strand.headerTitleStart}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #93c5fd, #2563eb)' }}
            >
              {strand.headerTitleAccent}
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-center text-sm text-slate-400">
            {strand.headerSubtitle}
          </p>
        </header>

        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="text-xs font-medium text-slate-400">Entry requirements:</span>
          <div className="flex gap-2">
            {[
              { id: 'aLevel', label: 'A-Level' },
              { id: 'ib', label: 'IB' },
              { id: 'ucasPoints', label: 'UCAS Points' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleGradeTypeChange(id)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  gradeType === id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <CourseSelect
          selectedId={courseId}
          onChange={handleCourseChange}
          courses={courses}
          groups={courseGroups}
          strandId={strand.id}
          rowCounts={rowCounts}
          verifiedCount={rows.length}
        />
        <StatsBar universities={filtered} course={course} gradeType={gradeType} />
        <Filters
          search={search} setSearch={setSearch}
          tier={tier} setTier={setTier}
          gradeType={gradeType}
          predictedGrade={predictedGrade} setPredictedGrade={setPredictedGrade}
          hideReach={hideReach} setHideReach={setHideReach}
          studentScore={studentScore}
        />

        {studentScore != null && (
          <div className="mb-4 grid gap-3 sm:grid-cols-[auto_1fr]">
            <MatchSimulator
              universities={filtered}
              gradeType={gradeType}
              studentScore={studentScore}
            />
            <div className="flex flex-wrap content-center items-center gap-x-5 gap-y-2 rounded-xl border border-blue-900/30 bg-[#0a1f3a]/40 px-4 py-3">
              <span className="w-full text-[10px] font-semibold uppercase tracking-widest text-blue-400/60">Grade fit legend</span>
              {[
                { label: 'Safe',         desc: 'At or above requirement',  classes: 'bg-emerald-900/50 border-emerald-600/50 text-emerald-300' },
                { label: 'Match',        desc: 'Meets requirement',         classes: 'bg-blue-900/50 border-blue-600/50 text-blue-300' },
                { label: 'Stretch',      desc: '~1 grade below',            classes: 'bg-amber-900/50 border-amber-600/50 text-amber-300' },
                { label: 'Out of scope', desc: '2+ grades below',           classes: 'bg-red-900/50 border-red-700/50 text-red-400' },
              ].map(({ label, desc, classes }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-semibold tracking-wide ${classes}`}>
                    {label}
                  </span>
                  <span className="text-[11px] text-slate-500">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Table
          universities={filtered}
          course={course}
          strandId={strand.id}
          gradeType={gradeType}
          studentScore={studentScore}
          selectedList={selectedNames}
          onSelectToggle={toggleSelectUni}
        />

        {/* Floating comparison bar */}
        {selectedUnis.length > 0 && !showComparison && (
          <div className="fixed inset-x-4 bottom-4 z-30 sm:inset-x-auto sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2">
            <div className="flex items-center gap-2 rounded-full border border-blue-700/60 bg-[#061428] px-3 py-2.5 shadow-2xl shadow-blue-900/40 sm:gap-3 sm:px-5 sm:py-3">
              <span className="flex-shrink-0 text-xs font-medium text-slate-300 sm:text-sm">
                {selectedUnis.length} selected
              </span>
              <div className="hidden flex-1 gap-1.5 sm:flex">
                {selectedUnis.map(u => (
                  <span key={u.name} className="max-w-[120px] truncate rounded-full border border-blue-800/60 bg-blue-900/40 px-2.5 py-0.5 text-xs text-blue-300">
                    {u.name}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setShowComparison(true)}
                className="ml-auto flex-shrink-0 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-500 sm:ml-0 sm:px-4"
              >
                Compare →
              </button>
              <button
                onClick={() => setSelectedUnis([])}
                className="flex-shrink-0 px-1 text-base text-slate-500 transition-colors hover:text-slate-300 sm:text-xs"
                aria-label="Clear selection"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Comparison slide-over */}
        {showComparison && (
          <ComparisonTray
            unis={selectedUnis}
            onClose={() => setShowComparison(false)}
          />
        )}

        <footer className="mt-10 text-center text-xs text-slate-600">
          {strand.footerNote}
        </footer>
      </div>
    </div>
  );
}
