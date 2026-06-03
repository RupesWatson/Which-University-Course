-- university_courses: one row per university-course combination
create table if not exists university_courses (
  id bigserial primary key,
  course_id text not null,
  strand_id text not null,
  name text not null,
  tier text,
  overall_rank integer,
  subject_rank integer,
  entry_grades text,
  ucas_points text,
  typical_offer text,
  ib_grades text,
  grad_prospects text,
  course_name text,
  application_code text,
  source_url text,
  cug_source_url text,
  match_type text,
  notes text
);

create index if not exists idx_uc_course_strand
  on university_courses (course_id, strand_id);

-- course_details: rich content — composite PK because course IDs overlap across strands
-- (e.g. both maths and finance have a "dataScience" course)
create table if not exists course_details (
  id text not null,
  strand_id text not null,
  title text,
  duration text,
  overview text,
  entry_requirements text,
  further_study text,
  employer_perspective text,
  year_by_year jsonb,
  skills jsonb,
  professional_bodies jsonb,
  careers jsonb,
  top_employers jsonb,
  is_it_for_you jsonb,
  primary key (id, strand_id)
);

-- university_details: one row per university, deduplicated across strands
create table if not exists university_details (
  slug text primary key,
  name text,
  city text,
  overview text,
  founded integer,
  total_students integer,
  international_students text,
  campus_type text,
  website text,
  prospectus text,
  virtual_tour text,
  reputation text,
  key_facts jsonb,
  accommodation jsonb,
  open_days jsonb,
  application jsonb,
  student_life jsonb,
  city_life jsonb,
  notable_alumni jsonb,
  rankings jsonb,
  fees jsonb,
  funding jsonb,
  employability jsonb,
  research jsonb,
  facilities jsonb,
  satisfaction jsonb,
  travel_from_london jsonb,
  accessibility jsonb,
  international jsonb,
  contact jsonb,
  socials jsonb
);

-- Row Level Security
alter table university_courses enable row level security;
alter table course_details enable row level security;
alter table university_details enable row level security;

-- Public read-only access for the anon role
create policy "Public read university_courses"
  on university_courses for select
  to anon, authenticated
  using (true);

create policy "Public read course_details"
  on course_details for select
  to anon, authenticated
  using (true);

create policy "Public read university_details"
  on university_details for select
  to anon, authenticated
  using (true);
