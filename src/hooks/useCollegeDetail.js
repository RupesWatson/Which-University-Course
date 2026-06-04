import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useCollegeDetail(collegeSlug) {
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!collegeSlug) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    supabase
      .from('colleges')
      .select('*')
      .eq('slug', collegeSlug)
      .single()
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) {
          setError(err.message);
          setCollege(null);
        } else {
          setCollege(
            data
              ? {
                  slug:              data.slug,
                  universitySlug:    data.university_slug,
                  name:              data.name,
                  subjects:          data.subjects ?? [],
                  founded:           data.founded,
                  location:          data.location,
                  overview:          data.overview,
                  character:         data.character,
                  studentNumbers:    data.student_numbers,
                  accommodation:     data.accommodation,
                  academicStrengths: data.academic_strengths,
                  notableAlumni:     data.notable_alumni,
                  keyFacts:          data.key_facts,
                  finances:          data.finances,
                  website:           data.website,
                  sortOrder:         data.sort_order,
                }
              : null,
          );
        }
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [collegeSlug]);

  return { college, loading, error };
}
