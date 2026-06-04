-- colleges: one row per Oxbridge undergraduate college
create table if not exists colleges (
  slug text primary key,              -- 'oxford-balliol', 'cambridge-trinity'
  university_slug text not null,      -- 'oxford' | 'cambridge'
  name text not null,
  subjects jsonb,                     -- array of canonical subject keys offered (see oxbridgeSubjects.js)
  founded integer,
  location text,
  overview text,
  character text,
  student_numbers jsonb,              -- { undergraduates, postgraduates, total }
  accommodation jsonb,                -- { yearsGuaranteed, description, avgCost, inCollege }
  academic_strengths jsonb,           -- string[]
  notable_alumni jsonb,               -- string[]
  key_facts jsonb,                    -- string[]
  finances jsonb,                     -- { endowment, bursaries, description }
  website text,
  sort_order integer
);

create index if not exists idx_colleges_university on colleges (university_slug);

alter table colleges enable row level security;

create policy "Public read colleges"
  on colleges for select
  to anon, authenticated
  using (true);
