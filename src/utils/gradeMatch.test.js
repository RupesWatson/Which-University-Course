// Rule: an A-level offer is scored on the UCAS tariff (A* 56, A 48, B 40, C 32,
// D 24, E 16) of its FIRST grade set. Offers are often a band ("AAB-BBB") or an
// alternative ("AAA or A*AB"); the first set is the standard offer, and it is
// the set ucasPoints (scripts/validate-data.mjs) and Table.jsx sorting already
// use. Separators between sets: - – — / ; "or" "to". Spaces inside a set are
// ignored, so a student typing "A* A A" scores the same as "A*AA". No grades at
// all scores null, never 0.
//
// Expected values below are hand-calculated from the tariff, not produced by
// the code under test.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scoreGrade, getMatchTier } from './gradeMatch.js';

const aLevel = g => scoreGrade(g, 'aLevel');

test('a single grade set scores its tariff total', () => {
  assert.equal(aLevel('AAA'), 144); // 48+48+48
  assert.equal(aLevel('A*AA'), 152); // 56+48+48
  assert.equal(aLevel('A*A*A'), 160); // 56+56+48
  assert.equal(aLevel('BBC'), 112); // 40+40+32
  assert.equal(aLevel('A* A A'), 152); // spaces inside a set are ignored
});

test('a band scores its first set, not every grade in the string', () => {
  assert.equal(aLevel('AAB-BBB'), 136); // AAB = 48+48+40; summing all six gave 256
  assert.equal(aLevel('A*AA–AAA'), 152); // en dash
  assert.equal(aLevel('AAA—AAB'), 144); // em dash
  assert.equal(aLevel('BBC to CCC'), 112);
});

test('an alternative offer scores its first set', () => {
  assert.equal(aLevel('AAA or A*AB'), 144);
  assert.equal(aLevel('AAA; AAB'), 144);
  assert.equal(aLevel('AAA/A*AB'), 144);
});

test('no grades scores null, never a fabricated 0', () => {
  assert.equal(aLevel(''), null);
  assert.equal(aLevel(null), null);
  assert.equal(aLevel('N/A'), null);
});

test('a student exactly on the standard offer of a band is a match, not out of scope', () => {
  // Before the fix the band scored 256, so AAB (136) was 120 short: out-of-scope.
  assert.equal(getMatchTier(136, 'AAB-BBB', 'aLevel'), 'match');
  assert.equal(getMatchTier(144, 'AAA or A*AB', 'aLevel'), 'match');
  assert.equal(getMatchTier(128, 'AAB-BBB', 'aLevel'), 'stretch'); // one grade below
  assert.equal(getMatchTier(152, 'AAB-BBB', 'aLevel'), 'safe'); // two grades above
});

test('exhaustive: for every three-grade set, appending any second set never changes the score', () => {
  const TARIFF = { 'A*': 56, A: 48, B: 40, C: 32, D: 24, E: 16 };
  const grades = Object.keys(TARIFF);
  const seps = ['-', '–', '—', '/', ';', ' or ', ' to ', ' - '];
  let checked = 0;
  for (const a of grades) for (const b of grades) for (const c of grades) {
    const set = `${a}${b}${c}`;
    const expected = TARIFF[a] + TARIFF[b] + TARIFF[c];
    assert.equal(aLevel(set), expected, set);
    for (const sep of seps) {
      const second = 'A*A*A*'; // the strongest possible second set: any leak shows
      assert.equal(aLevel(`${set}${sep}${second}`), expected, `${set}${sep}${second}`);
      checked += 1;
    }
  }
  assert.equal(checked, 216 * seps.length);
});
