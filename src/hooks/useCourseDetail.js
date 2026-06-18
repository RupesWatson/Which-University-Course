import financeDetails       from '../data/finance/course-details.json';
import mathsDetails         from '../data/maths/course-details.json';
import physicsDetails       from '../data/physics/course-details.json';
import engineeringDetails   from '../data/engineering/course-details.json';
import biochemDetails       from '../data/biochemistry/course-details.json';
import humanitiesDetails    from '../data/humanities/course-details.json';
import socialDetails        from '../data/socialsciences/course-details.json';
import computerScienceDetails from '../data/computer-science/course-details.json';
import medicineDetails        from '../data/medicine/course-details.json';
import biologyDetails         from '../data/biology/course-details.json';

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
  biology:        biologyDetails,
};

export function useCourseDetail(courseId, strandId) {
  if (!courseId || !strandId) return { detail: null, loading: false, error: null };

  const data   = DETAILS[strandId] ?? {};
  const detail = data[courseId] ?? null;

  return { detail, loading: false, error: null };
}
