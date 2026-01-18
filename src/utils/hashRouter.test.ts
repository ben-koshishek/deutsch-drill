import { describe, it, expect, vi } from "vitest";
import type { Deck, GrammarLesson } from "@/types";

const mockDeck: Deck = {
  id: "pronouns",
  name: "Personal Pronouns",
  category: "pronouns",
  type: "translation",
  words: [],
};

const mockLesson: GrammarLesson = {
  type: "grammar",
  id: "gender-rules",
  name: "der/die/das Rules",
  description: "Test lesson",
  category: "articles",
  exercises: [],
};

vi.mock("@/data/decks", () => ({
  getDeck: (id: string) => (id === "pronouns" ? mockDeck : undefined),
}));

vi.mock("@/data/grammar", () => ({
  getGrammarLesson: (id: string) =>
    id === "gender-rules" ? mockLesson : undefined,
}));

// Import after mocks
const { parseHash, viewToHash } = await import("./hashRouter");

describe("parseHash", () => {
  it("returns dashboard for empty/root hashes", () => {
    expect(parseHash("")).toEqual({ type: "dashboard" });
    expect(parseHash("#")).toEqual({ type: "dashboard" });
    expect(parseHash("#/")).toEqual({ type: "dashboard" });
    expect(parseHash("/")).toEqual({ type: "dashboard" });
  });

  it("parses valid flow hash with single deck", () => {
    const result = parseHash("#/flow/pronouns");
    expect(result).toEqual({ type: "flow", sources: [mockDeck] });
  });

  it("parses valid flow hash with mixed sources", () => {
    const result = parseHash("#/flow/pronouns,gender-rules");
    expect(result).toEqual({ type: "flow", sources: [mockDeck, mockLesson] });
  });

  it("filters out invalid IDs in flow hash", () => {
    const result = parseHash("#/flow/pronouns,nonexistent");
    expect(result).toEqual({ type: "flow", sources: [mockDeck] });
  });

  it("falls back to dashboard for flow hash with all invalid IDs", () => {
    expect(parseHash("#/flow/nonexistent")).toEqual({ type: "dashboard" });
  });

  it("redirects legacy drill hash to flow", () => {
    const result = parseHash("#/drill/pronouns");
    expect(result).toEqual({ type: "flow", sources: [mockDeck] });
  });

  it("redirects legacy grammar hash to flow", () => {
    const result = parseHash("#/grammar/gender-rules");
    expect(result).toEqual({ type: "flow", sources: [mockLesson] });
  });

  it("falls back to dashboard for invalid legacy drill ID", () => {
    expect(parseHash("#/drill/nonexistent")).toEqual({ type: "dashboard" });
  });

  it("parses how-german-works route", () => {
    expect(parseHash("#/how-german-works")).toEqual({ type: "how-german-works" });
  });

  it("falls back to dashboard for unrecognized paths", () => {
    expect(parseHash("#/unknown")).toEqual({ type: "dashboard" });
  });
});

describe("viewToHash", () => {
  it("generates dashboard hash", () => {
    expect(viewToHash({ type: "dashboard" })).toBe("#/");
  });

  it("generates flow hash", () => {
    expect(viewToHash({ type: "flow", sources: [mockDeck, mockLesson] })).toBe(
      "#/flow/pronouns,gender-rules"
    );
  });

  it("generates how-german-works hash", () => {
    expect(viewToHash({ type: "how-german-works" })).toBe("#/how-german-works");
  });
});
