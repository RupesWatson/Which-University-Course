import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Fetches the university rows for a single course/strand combination.
 * Returns data in the same camelCase shape the components already expect.
 */
export function useCourseRows(courseId, strandId) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId || !strandId) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    supabase
      .from('university_courses')
      .select('*')
      .eq('course_id', courseId)
      .eq('strand_id', strandId)
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) {
          setError(err.message);
          setRows([]);
        } else {
          setRows(
            (data || []).map(row => ({
              name:            row.name,
              tier:            row.tier,
              overallRank:     row.overall_rank,
              subjectRank:     row.subject_rank,
              entryGrades:     row.entry_grades,
              ucasPoints:      row.ucas_points,
              typicalOffer:    row.typical_offer,
              ibGrades:        row.ib_grades,
              gradProspects:   row.grad_prospects,
              courseName:      row.course_name,
              applicationCode: row.application_code,
              sourceUrl:       row.source_url,
              cugSourceUrl:    row.cug_source_url,
              matchType:       row.match_type,
              notes:           row.notes,
            })),
          );
        }
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [courseId, strandId]);

  return { rows, loading, error };
}
