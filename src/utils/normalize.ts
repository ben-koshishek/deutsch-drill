/**
 * Normalizes a string for answer comparison.
 * - Converts to lowercase
 * - Removes parenthetical content (e.g., "(formal)")
 * - Removes punctuation
 * - Converts German umlauts to ASCII equivalents
 * - Trims whitespace
 */
export function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/[.,!?;:'"]/g, "")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ß/g, "ss")
    .trim();
}
