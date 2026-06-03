import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Returns a Map<courseId, rowCount> for all courses in a strand.
 * Used by CourseSelect to filter out courses that have no verified matches.
 */
export function useStrandRowCounts(strandId) {
  const [counts, setCounts] = useState(new Map());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!strandId) return;

    let cancelled = false;
    setLoading(true);

    supabase
      .from('university_courses')
      .select('course_id')
      .eq('strand_id', strandId)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data) {
          const map = new Map();
          for (const row of data) {
            map.set(row.course_id, (map.get(row.course_id) ?? 0) + 1);
          }
          setCounts(map);
        }
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [strandId]);

  return { counts, loading };
}
