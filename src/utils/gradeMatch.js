const ALEVEL_SCORE = { 'A*': 56, A: 48, B: 40, C: 32, D: 24, E: 16 };

function scoreALevel(grade) {
  const tokens = String(grade || '').match(/A\*|[A-E]/g);
  if (!tokens?.length) return null;
  return tokens.reduce((sum, t) => sum + (ALEVEL_SCORE[t] || 0), 0);
}

function scoreNumeric(grade) {
  const n = parseInt(String(grade || ''), 10);
  return isNaN(n) ? null : n;
}

export function scoreGrade(grade, gradeType) {
  if (!grade) return null;
  if (gradeType === 'ib' || gradeType === 'ucasPoints') return scoreNumeric(grade);
  return scoreALevel(grade);
}

/**
 * Returns 'safe' | 'match' | 'stretch' | 'out-of-scope' | null
 *
 * A-Level thresholds (one grade = 8 pts):
 *   safe         delta >= 8   — above requirement by one+ grade
 *   match        delta >= 0   — meets requirement
 *   stretch      delta >= -8  — one grade below
 *   out-of-scope delta < -8   — two+ grades below
 *
 * IB (one step ≈ 3 pts):
 *   safe >= +3 | match >= 0 | stretch >= -3 | out-of-scope < -3
 *
 * UCAS (one grade ≈ 16 pts):
 *   safe >= +16 | match >= 0 | stretch >= -16 | out-of-scope < -16
 */
export function getMatchTier(studentScore, entryGrade, gradeType) {
  if (studentScore == null || !entryGrade) return null;
  const reqScore = scoreGrade(entryGrade, gradeType);
  if (reqScore == null) return null;
  const delta = studentScore - reqScore;

  if (gradeType === 'ib') {
    if (delta >= 3)  return 'safe';
    if (delta >= 0)  return 'match';
    if (delta >= -3) return 'stretch';
    return 'out-of-scope';
  }
  if (gradeType === 'ucasPoints') {
    if (delta >= 16)  return 'safe';
    if (delta >= 0)   return 'match';
    if (delta >= -16) return 'stretch';
    return 'out-of-scope';
  }
  // A-Level
  if (delta >= 8)  return 'safe';
  if (delta >= 0)  return 'match';
  if (delta >= -8) return 'stretch';
  return 'out-of-scope';
}

export function gradeKey(gradeType) {
  if (gradeType === 'ib') return 'ibGrades';
  if (gradeType === 'ucasPoints') return 'ucasPoints';
  return 'entryGrades';
}
