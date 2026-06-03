import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Fetches a university profile by its slug.
 * Returns data in the same camelCase shape UniversityPage already expects.
 */
export function useUniversityDetail(slug) {
  const [uni, setUni] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    supabase
      .from('university_details')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) {
          setError(err.message);
          setUni(null);
        } else {
          setUni(
            data
              ? {
                  slug:                   data.slug,
                  name:                   data.name,
                  city:                   data.city,
                  overview:               data.overview,
                  founded:                data.founded,
                  totalStudents:          data.total_students,
                  internationalStudents:  data.international_students,
                  campusType:             data.campus_type,
                  website:                data.website,
                  prospectus:             data.prospectus,
                  virtualTour:            data.virtual_tour,
                  reputation:             data.reputation,
                  keyFacts:               data.key_facts,
                  accommodation:          data.accommodation,
                  openDays:               data.open_days,
                  application:            data.application,
                  studentLife:            data.student_life,
                  cityLife:               data.city_life,
                  notableAlumni:          data.notable_alumni,
                  rankings:               data.rankings,
                  fees:                   data.fees,
                  funding:                data.funding,
                  employability:          data.employability,
                  research:               data.research,
                  facilities:             data.facilities,
                  satisfaction:           data.satisfaction,
                  travelFromLondon:       data.travel_from_london,
                  accessibility:          data.accessibility,
                  international:          data.international,
                  contact:                data.contact,
                  socials:                data.socials,
                }
              : null,
          );
        }
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [slug]);

  return { uni, loading, error };
}
