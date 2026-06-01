const DATA_DIR = new URL('../src/data/', import.meta.url);
const CUG_BASE = 'https://www.thecompleteuniversityguide.co.uk/universities/';
const cugPageCache = new Map();
const cugUrlCache = new Map();

// Subjects whose tables use the official CUG subject ranking. Their existing
// subjectRank is retained on sync rather than being overwritten with table
// position. All other subjects use comparison-set position (index + 1).
const OFFICIAL_RANK_SUBJECTS = new Set(['biochemistry', 'chemistry']);

const SPECS = {
  biochemistry: {
    file: 'biochemistry.json',
    queries: ['biochemistry', 'molecular biochemistry'],
    classify(title) {
      if (title.includes('biochemistry')) return exact();
      if (title.includes('natural sciences')) return close();
      return null;
    },
  },
  chemistry: {
    file: 'chemistry.json',
    queries: ['chemistry'],
    classify(title) {
      if (title.includes('biochemistry') || title.includes('medicinal chemistry')) return null;
      if (/\bchemistry\b/.test(title)) return exact();
      if (title.includes('natural sciences')) return close();
      return null;
    },
  },
  natSci: {
    file: 'natural-sciences.json',
    queries: ['natural sciences'],
    classify(title) {
      return title.includes('natural sciences') ? exact() : null;
    },
  },
  biomedSci: {
    file: 'biomedical-sciences.json',
    queries: ['biomedical science', 'biomedical sciences'],
    classify(title) {
      if (title.includes('biomedical')) return exact();
      if (/(medical science|medical sciences)/.test(title)) return close();
      return null;
    },
  },
  pharmacology: {
    file: 'pharmacology.json',
    queries: ['pharmacology'],
    classify(title) {
      if (title.includes('pharmacology')) return exact();
      if (/(pharmacology and physiology|pharmaceutical science)/.test(title)) return close();
      return null;
    },
  },
  molBiol: {
    file: 'molecular-biology.json',
    queries: ['molecular biology', 'molecular cell biology'],
    classify(title) {
      if (title.includes('molecular biology')) return exact();
      if (/(molecular and cellular biology|molecular cell biology|cell biology)/.test(title)) return close();
      return null;
    },
  },
  medicinalChem: {
    file: 'medicinal-chemistry.json',
    queries: ['medicinal chemistry', 'chemistry medicinal', 'pharmaceutical chemistry'],
    classify(title) {
      if (title.includes('medicinal chemistry')) return exact();
      if (/(chemistry with medicinal chemistry|pharmaceutical chemistry)/.test(title)) return close();
      return null;
    },
  },
  genetics: {
    file: 'genetics.json',
    queries: ['genetics', 'molecular genetics'],
    classify(title) {
      if (title.includes('genetics')) return exact();
      if (title.includes('natural sciences')) return close();
      return null;
    },
  },
  microbiology: {
    file: 'microbiology.json',
    queries: ['microbiology', 'medical microbiology'],
    classify(title) {
      if (title.includes('microbiology')) return exact();
      if (/(microbiology and|bacteriology)/.test(title)) return close();
      return null;
    },
  },
  biochemIndustry: {
    file: 'biochemistry-with-industry.json',
    queries: ['biochemistry placement', 'biochemistry industrial', 'biochemistry year in industry'],
    classify(title) {
      if (!title.includes('biochemistry')) return null;
      if (/(placement|industrial|year in industry|professional|sandwich)/.test(title)) return exact();
      return close();
    },
  },
};

function exact() {
  return { matchType: 'exact', note: 'Verified UCAS 2026 exact title match' };
}

function close() {
  return { matchType: 'close', note: 'Verified UCAS 2026 close course variant' };
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function normaliseTitle(title) {
  return title.toLowerCase().trim();
}

function buildSourceUrl(courseId, courseTitle) {
  return `https://digital.ucas.com/explore/courses/${courseId}/${slugify(courseTitle)}?studyYear=2026`;
}

function slugifyUniversity(title) {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/,/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function queryUcas(provider, searchTerm) {
  const params = new URLSearchParams({
    query: searchTerm,
    hitsPerPage: '20',
    filters: `provider.name:"${provider}" AND studyLevel:Undergraduate AND academicYearId:2026`,
  }).toString();

  const body = {
    requests: [{ indexName: 'd10prod_courses_new', params }],
  };

  const response = await fetch('https://Y3QRV216KL-dsn.algolia.net/1/indexes/*/queries', {
    method: 'POST',
    headers: {
      'x-algolia-application-id': 'Y3QRV216KL',
      'x-algolia-api-key': 'c0f72e5c62250ac258c2cf4a3896c19d',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`UCAS query failed for ${provider} / ${searchTerm}: ${response.status}`);
  }

  const json = await response.json();
  return json.results?.[0]?.hits ?? [];
}

function chooseMatch(spec, hits) {
  const deduped = [];
  const seen = new Set();

  for (const hit of hits) {
    if (seen.has(hit.courseId)) continue;
    seen.add(hit.courseId);

    const classification = spec.classify(normaliseTitle(hit.courseTitle));
    if (!classification) continue;

    deduped.push({
      classification,
      hit,
    });
  }

  deduped.sort((a, b) => {
    if (a.classification.matchType !== b.classification.matchType) {
      return a.classification.matchType === 'exact' ? -1 : 1;
    }
    return a.hit.courseTitle.localeCompare(b.hit.courseTitle);
  });

  return deduped[0] ?? null;
}

function extractAlevelOffer(hit) {
  const entry = hit.academicEntryRequirements?.find(item => item.name === 'A level' && !item.notAccepted);
  const grades = entry?.offer?.grades?.trim();

  if (!grades) {
    return {
      entryGrades: null,
      typicalOffer: null,
    };
  }

  const [firstBand] = grades.split(/\s*[-–]\s*/);
  return {
    entryGrades: firstBand?.trim() || null,
    typicalOffer: grades,
  };
}

function extractCugNumber(sectionHtml, label) {
  const pattern = new RegExp(`${label}[\\s\\S]*?<p>(\\d+)(?:st|nd|rd|th)`, 'i');
  const match = sectionHtml.match(pattern);
  return match ? parseInt(match[1], 10) : null;
}

function extractCugPercent(sectionHtml, label) {
  const pattern = new RegExp(`${label}[\\s\\S]*?<span class="smtxt">(\\d+)%<\\/span>`, 'i');
  const match = sectionHtml.match(pattern);
  return match ? `${match[1]}%` : null;
}

async function searchForCugUrl(universityName) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(`site:thecompleteuniversityguide.co.uk/universities ${universityName}`)}`;
  const response = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
  const html = await response.text();
  const match = html.match(/uddg=([^"&]+thecompleteuniversityguide\.co\.uk%2Funiversities%2F[^"&]+)/i);
  return match ? decodeURIComponent(match[1]) : null;
}

async function getCugUrl(universityName) {
  if (cugUrlCache.has(universityName)) return cugUrlCache.get(universityName);

  const directUrl = `${CUG_BASE}${slugifyUniversity(universityName)}`;
  const directResponse = await fetch(directUrl, { redirect: 'follow' });
  if (directResponse.ok) {
    cugUrlCache.set(universityName, directResponse.url);
    cugPageCache.set(directResponse.url, await directResponse.text());
    return directResponse.url;
  }

  const fallback = await searchForCugUrl(universityName);
  if (!fallback) return null;

  cugUrlCache.set(universityName, fallback);
  return fallback;
}

async function getCugMetrics(universityName) {
  const cugUrl = await getCugUrl(universityName);
  if (!cugUrl) {
    return { overallRank: null, gradProspects: null, cugSourceUrl: null };
  }

  let html = cugPageCache.get(cugUrl);
  if (!html) {
    const response = await fetch(cugUrl);
    if (!response.ok) {
      return { overallRank: null, gradProspects: null, cugSourceUrl: cugUrl };
    }
    html = await response.text();
    cugPageCache.set(cugUrl, html);
  }

  return {
    overallRank: extractCugNumber(html, 'Overall ranking'),
    gradProspects: extractCugPercent(html, 'Graduate prospects – outcomes'),
    cugSourceUrl: cugUrl,
  };
}

async function updateRow(row, match, index, keepLegacyRank) {
  const { hit, classification } = match;
  const aLevel = extractAlevelOffer(hit);
  const cug = await getCugMetrics(row.name);
  const next = {
    ...row,
    entryGrades: aLevel.entryGrades || row.entryGrades || row.aLevelGrades || null,
    typicalOffer: aLevel.typicalOffer || row.typicalOffer || null,
    overallRank: cug.overallRank || row.overallRank || null,
    gradProspects: cug.gradProspects || row.gradProspects || null,
    courseName: hit.courseTitle,
    applicationCode: hit.applicationCode,
    sourceUrl: buildSourceUrl(hit.courseId, hit.courseTitle),
    cugSourceUrl: cug.cugSourceUrl || row.cugSourceUrl || null,
    matchType: classification.matchType,
    notes: classification.note,
  };

  if (!keepLegacyRank) {
    next.subjectRank = index + 1;
  }

  return next;
}

async function readJson(fileUrl) {
  const fs = await import('node:fs/promises');
  return JSON.parse(await fs.readFile(fileUrl, 'utf8'));
}

async function writeJson(fileUrl, value) {
  const fs = await import('node:fs/promises');
  await fs.writeFile(fileUrl, JSON.stringify(value, null, 2) + '\n');
}

async function main() {
  const summary = [];

  for (const [courseId, spec] of Object.entries(SPECS)) {
    const fileUrl = new URL(spec.file, DATA_DIR);
    const rows = await readJson(fileUrl);
    const matchedRows = [];

    for (const row of rows) {
      const hits = [];

      for (const query of spec.queries) {
        const result = await queryUcas(row.name, query);
        hits.push(...result);
      }

      const match = chooseMatch(spec, hits);
      if (match) {
        matchedRows.push(await updateRow(row, match, matchedRows.length, OFFICIAL_RANK_SUBJECTS.has(courseId)));
      }
    }

    await writeJson(fileUrl, matchedRows);
    summary.push(`${courseId}: ${matchedRows.length} verified matches`);
  }

  console.log(summary.join('\n'));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
