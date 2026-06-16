import oxfordColleges from '../data/colleges/oxford-colleges.json';
import cambridgeColleges from '../data/colleges/cambridge-colleges.json';

const ALL_COLLEGES = { ...oxfordColleges, ...cambridgeColleges };

export function useColleges(universitySlug) {
  if (!universitySlug) {
    return { colleges: [], loading: false, error: null };
  }

  const colleges = Object.values(ALL_COLLEGES)
    .filter(c => c.universitySlug === universitySlug)
    .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));

  return { colleges, loading: false, error: null };
}
