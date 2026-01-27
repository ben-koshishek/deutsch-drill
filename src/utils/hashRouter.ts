import { getDeck } from "@/data/decks";
import { getGrammarLesson } from "@/data/grammar";
import type { Deck, GrammarLesson } from "@/types";

export type View =
  | { type: "dashboard" }
  | { type: "drill"; deck: Deck }
  | { type: "grammar"; lesson: GrammarLesson };

/**
 * Parse URL hash into a View object.
 * Returns dashboard view for invalid or unrecognized hashes.
 */
export function parseHash(hash: string): View {
  // Remove leading # if present
  const path = hash.startsWith("#") ? hash.slice(1) : hash;

  // Empty or root path -> dashboard
  if (!path || path === "/" || path === "") {
    return { type: "dashboard" };
  }

  // Parse /drill/{deckId}
  const drillMatch = path.match(/^\/drill\/(.+)$/);
  if (drillMatch) {
    const deckId = drillMatch[1];
    const deck = getDeck(deckId);
    if (deck) {
      return { type: "drill", deck };
    }
    // Invalid deck ID -> fall back to dashboard
    return { type: "dashboard" };
  }

  // Parse /grammar/{lessonId}
  const grammarMatch = path.match(/^\/grammar\/(.+)$/);
  if (grammarMatch) {
    const lessonId = grammarMatch[1];
    const lesson = getGrammarLesson(lessonId);
    if (lesson) {
      return { type: "grammar", lesson };
    }
    // Invalid lesson ID -> fall back to dashboard
    return { type: "dashboard" };
  }

  // Unrecognized path -> dashboard
  return { type: "dashboard" };
}

/**
 * Generate URL hash from a View object.
 */
export function viewToHash(view: View): string {
  switch (view.type) {
    case "dashboard":
      return "#/";
    case "drill":
      return `#/drill/${view.deck.id}`;
    case "grammar":
      return `#/grammar/${view.lesson.id}`;
  }
}

/**
 * Update URL hash using History API.
 * @param hash - The hash to set (should include #)
 * @param replace - If true, uses replaceState instead of pushState
 */
export function setHash(hash: string, replace = false): void {
  const url = new URL(window.location.href);
  url.hash = hash;

  if (replace) {
    window.history.replaceState(null, "", url.toString());
  } else {
    window.history.pushState(null, "", url.toString());
  }
}
