import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useColleges(universitySlug) {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!universitySlug) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    supabase
      .from('colleges')
      .select('*')
      .eq('university_slug', universitySlug)
      .order('sort_order', { ascending: true })
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) {
          setError(err.message);
          setColleges([]);
        } else {
          setColleges(
            (data ?? []).map(c => ({
              slug:             c.slug,
              universitySlug:   c.university_slug,
              name:             c.name,
              subjects:         c.subjects ?? [],
              founded:          c.founded,
              location:         c.location,
              overview:         c.overview,
              character:        c.character,
              studentNumbers:   c.student_numbers,
              accommodation:    c.accommodation,
              academicStrengths: c.academic_strengths,
              notableAlumni:    c.notable_alumni,
              keyFacts:         c.key_facts,
              finances:         c.finances,
              website:          c.website,
              sortOrder:        c.sort_order,
            })),
          );
        }
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [universitySlug]);

  return { colleges, loading, error };
}
