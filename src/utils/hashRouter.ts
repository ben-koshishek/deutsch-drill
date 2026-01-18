import { getDeck } from "@/data/decks";
import { getGrammarLesson } from "@/data/grammar";
import type { Deck, GrammarLesson } from "@/types";

export type View =
  | { type: "dashboard" }
  | { type: "flow"; sources: Array<Deck | GrammarLesson> }
  | { type: "how-german-works" };

/**
 * Parse URL hash into a View object.
 * Returns dashboard view for invalid or unrecognized hashes.
 */
export function parseHash(hash: string): View {
  const path = hash.startsWith("#") ? hash.slice(1) : hash;

  if (!path || path === "/" || path === "") {
    return { type: "dashboard" };
  }

  if (path === "/how-german-works") {
    return { type: "how-german-works" };
  }

  // Parse /flow/{id1,id2,...}
  const flowMatch = path.match(/^\/flow\/(.+)$/);
  if (flowMatch) {
    const ids = flowMatch[1].split(",");
    const sources: Array<Deck | GrammarLesson> = [];
    for (const id of ids) {
      const deck = getDeck(id);
      if (deck) {
        sources.push(deck);
        continue;
      }
      const lesson = getGrammarLesson(id);
      if (lesson) {
        sources.push(lesson);
      }
    }
    if (sources.length > 0) {
      return { type: "flow", sources };
    }
    return { type: "dashboard" };
  }

  // Legacy: redirect /drill/{id} and /grammar/{id} to /flow/{id}
  const legacyDrill = path.match(/^\/drill\/(.+)$/);
  if (legacyDrill) {
    const deck = getDeck(legacyDrill[1]);
    if (deck) return { type: "flow", sources: [deck] };
  }
  const legacyGrammar = path.match(/^\/grammar\/(.+)$/);
  if (legacyGrammar) {
    const lesson = getGrammarLesson(legacyGrammar[1]);
    if (lesson) return { type: "flow", sources: [lesson] };
  }

  return { type: "dashboard" };
}

/**
 * Generate URL hash from a View object.
 */
export function viewToHash(view: View): string {
  switch (view.type) {
    case "dashboard":
      return "#/";
    case "flow":
      return `#/flow/${view.sources.map(s => s.id).join(",")}`;
    case "how-german-works":
      return "#/how-german-works";
  }
}

/**
 * Update URL hash using History API.
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
