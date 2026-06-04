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

// Returns 'safe' | 'match' | 'reach' | null
export function getMatchTier(studentScore, entryGrade, gradeType) {
  if (studentScore == null || !entryGrade) return null;
  const reqScore = scoreGrade(entryGrade, gradeType);
  if (reqScore == null) return null;
  const delta = studentScore - reqScore;

  if (gradeType === 'ib') {
    if (delta >= 3) return 'safe';
    if (delta >= -3) return 'match';
    return 'reach';
  }
  if (gradeType === 'ucasPoints') {
    if (delta >= 16) return 'safe';
    if (delta >= -16) return 'match';
    return 'reach';
  }
  // A-Level: one grade = 8 pts
  if (delta >= 8) return 'safe';
  if (delta >= -8) return 'match';
  return 'reach';
}

export function gradeKey(gradeType) {
  if (gradeType === 'ib') return 'ibGrades';
  if (gradeType === 'ucasPoints') return 'ucasPoints';
  return 'entryGrades';
}
