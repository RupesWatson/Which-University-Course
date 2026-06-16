import oxfordColleges from '../data/colleges/oxford-colleges.json';
import cambridgeColleges from '../data/colleges/cambridge-colleges.json';

const ALL_COLLEGES = { ...oxfordColleges, ...cambridgeColleges };

export function useCollegeDetail(collegeSlug) {
  if (!collegeSlug) {
    return { college: null, loading: false, error: null };
  }

  const college = ALL_COLLEGES[collegeSlug] ?? null;

  return {
    college,
    loading: false,
    error: college ? null : 'College not found',
  };
}
