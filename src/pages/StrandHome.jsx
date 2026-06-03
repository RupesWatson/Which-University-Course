import { useMemo, useState } from 'react';
import { useParams, useSearchParams, Link, Navigate } from 'react-router-dom';
import { getStrand } from '../config/strands';
import { useCourseRows } from '../hooks/useCourseRows';
import { useStrandRowCounts } from '../hooks/useStrandRowCounts';
import StatsBar from '../components/StatsBar';
import Filters from '../components/Filters';
import CourseSelect from '../components/CourseSelect';
import Table from '../components/Table';

function LoadingTable() {
  return (
    <div className="flex items-center justify-center rounded-xl border border-blue-900/40 py-20">
      <div className="text-sm text-slate-500">Loading universities...</div>
    </div>
  );
}

export default function StrandHome() {
  const { strand: strandId } = useParams();
  const strand = getStrand(strandId);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [tier, setTier] = useState('All');
  const [gradeType, setGradeType] = useState('aLevel');

  const courses = strand?.courses ?? [];
  const courseId = searchParams.get('course') || courses[0]?.id;
  const course = courses.find(item => item.id === courseId) || courses[0] || null;

  const { rows, loading: rowsLoading, error: rowsError } = useCourseRows(course?.id, strandId);
  const { counts: rowCounts } = useStrandRowCounts(strandId);

  const filtered = useMemo(() => {
    return rows.filter(university => {
      const matchSearch = university.name.toLowerCase().includes(search.toLowerCase());
      const matchTier = tier === 'All' || university.tier === tier;
      return matchSearch && matchTier;
    });
  }, [rows, search, tier]);

  if (!strand) {
    return <Navigate to="/" replace />;
  }

  const { courseGroups } = strand;

  function handleCourseChange(id) {
    setSearchParams({ course: id }, { replace: true });
    setSearch('');
    setTier('All');
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #050e1f 0%, #061428 100%)' }}>
      <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-400/80 transition-colors hover:text-blue-300"
          >
            <span>←</span> Choose a different subject area
          </Link>
        </div>

        <header className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-800/40" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400/60">
              {strand.headerEyebrow}
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-800/40" />
          </div>
          <h1 className="mb-3 text-center font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
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
            <button
              onClick={() => setGradeType('aLevel')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                gradeType === 'aLevel'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              A-Level
            </button>
            <button
              onClick={() => setGradeType('ib')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                gradeType === 'ib'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              IB
            </button>
            <button
              onClick={() => setGradeType('ucasPoints')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                gradeType === 'ucasPoints'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              UCAS Points
            </button>
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
        <Filters search={search} setSearch={setSearch} tier={tier} setTier={setTier} />

        {rowsError ? (
          <div className="rounded-xl border border-red-900/40 bg-red-950/20 px-6 py-10 text-center text-sm text-red-400">
            Failed to load data: {rowsError}
          </div>
        ) : rowsLoading ? (
          <LoadingTable />
        ) : (
          <Table universities={filtered} course={course} strandId={strand.id} gradeType={gradeType} />
        )}

        <footer className="mt-10 text-center text-xs text-slate-600">
          {strand.footerNote}
        </footer>
      </div>
    </div>
  );
}
