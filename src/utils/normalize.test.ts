import { describe, it, expect } from "vitest";
import { normalize } from "./normalize";

describe("normalize", () => {
  it("converts to lowercase", () => {
    expect(normalize("HALLO")).toBe("hallo");
    expect(normalize("DeutSch")).toBe("deutsch");
  });

  it("removes parenthetical content", () => {
    expect(normalize("you (formal)")).toBe("you");
    expect(normalize("sie (she)")).toBe("sie");
  });

  it("removes punctuation", () => {
    expect(normalize("Guten Tag!")).toBe("guten tag");
    expect(normalize("What?")).toBe("what");
    expect(normalize('Test: "quoted"')).toBe("test quoted");
    expect(normalize("a, b; c.")).toBe("a b c");
  });

  it("converts German umlauts to ASCII", () => {
    expect(normalize("Mädchen")).toBe("madchen");
    expect(normalize("schön")).toBe("schon");
    expect(normalize("müde")).toBe("mude");
    expect(normalize("Straße")).toBe("strasse");
  });

  it("trims whitespace", () => {
    expect(normalize("  hello  ")).toBe("hello");
  });

  it("handles combined transformations", () => {
    expect(normalize("  Schöne Grüße! (formal)  ")).toBe("schone grusse");
  });

  it("handles empty string", () => {
    expect(normalize("")).toBe("");
  });

  it("passes through already-normalized strings", () => {
    expect(normalize("hello")).toBe("hello");
  });
});
