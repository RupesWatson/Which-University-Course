import financeDetails       from '../data/finance/university-details.json';
import mathsDetails         from '../data/maths/university-details.json';
import physicsDetails       from '../data/physics/university-details.json';
import engineeringDetails   from '../data/engineering/university-details.json';
import biochemDetails       from '../data/biochemistry/university-details.json';
import humanitiesDetails    from '../data/humanities/university-details.json';
import socialDetails        from '../data/socialsciences/university-details.json';
import computerScienceDetails from '../data/computer-science/university-details.json';
import medicineDetails        from '../data/medicine/university-details.json';

const DETAILS = {
  finance:        financeDetails,
  maths:          mathsDetails,
  physics:        physicsDetails,
  engineering:    engineeringDetails,
  biochemistry:   biochemDetails,
  humanities:     humanitiesDetails,
  socialsciences: socialDetails,
  computerScience: computerScienceDetails,
  medicine:       medicineDetails,
};

function findBySlug(data, slug) {
  // Direct match (most strands use toSlug() format: "bath", "oxford", etc.)
  if (data[slug]) return data[slug];
  // Some strand JSONs keep "University of X" → "university-of-X" or "X University" → "X-university"
  if (data[`university-of-${slug}`]) return data[`university-of-${slug}`];
  if (data[`${slug}-university`])    return data[`${slug}-university`];
  return null;
}

export function useUniversityDetail(slug, strandId) {
  if (!slug || !strandId) return { uni: null, loading: false, error: null };

  const data = DETAILS[strandId] ?? {};
  const uni  = findBySlug(data, slug);

  return { uni, loading: false, error: null };
}
