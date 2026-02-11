/**
 * Normalizes a string for answer comparison.
 * - Converts to lowercase
 * - Removes parenthetical content (e.g., "(formal)")
 * - Removes punctuation
 * - Converts German umlauts to ASCII equivalents (unless keepUmlauts is true)
 * - Converts ß to ss (always — ss and ß are interchangeable)
 * - Trims whitespace
 */
export function normalize(str: string, keepUmlauts = false): string {
  let result = str
    .toLowerCase()
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/[.,!?;:'"]/g, "");
  if (!keepUmlauts) {
    result = result.replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u");
  }
  return result.replace(/ß/g, "ss").trim();
}
