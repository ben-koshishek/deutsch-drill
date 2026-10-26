/**
 * Normalizes an answer for comparison:
 * - Lowercase
 * - Trim whitespace
 * - Strip parenthetical markers like (formal), (accusative), (dative), etc.
 * - Convert umlauts: ä→a, ö→o, ü→u, ß→ss
 */
export function normalizeAnswer(answer: string): string {
  return answer
    .toLowerCase()
    .trim()
    .replace(/\s*\([^)]+\)\s*/g, '')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ß/g, 'ss')
}

/**
 * Check if user answer matches the correct answer
 */
export function answersMatch(userAnswer: string, correctAnswer: string): boolean {
  return normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer)
}
