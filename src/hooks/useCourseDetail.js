import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Fetches rich course detail content (curriculum, careers, entry requirements).
 * strandId is required because the same courseId can exist in multiple strands
 * (e.g. "dataScience" appears in both maths and finance).
 */
export function useCourseDetail(courseId, strandId) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId || !strandId) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    supabase
      .from('course_details')
      .select('*')
      .eq('id', courseId)
      .eq('strand_id', strandId)
      .single()
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) {
          setError(err.message);
          setDetail(null);
        } else {
          setDetail(
            data
              ? {
                  id:                   data.id,
                  title:                data.title,
                  duration:             data.duration,
                  overview:             data.overview,
                  entryRequirements:    data.entry_requirements,
                  furtherStudy:         data.further_study,
                  employerPerspective:  data.employer_perspective,
                  yearByYear:           data.year_by_year,
                  skills:               data.skills,
                  professionalBodies:   data.professional_bodies,
                  careers:              data.careers,
                  topEmployers:         data.top_employers,
                  isItForYou:           data.is_it_for_you,
                }
              : null,
          );
        }
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [courseId, strandId]);

  return { detail, loading, error };
}
