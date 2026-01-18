import { describe, it, expect } from "vitest";
import { formatTime } from "./formatTime";

describe("formatTime", () => {
  describe("under 1 minute", () => {
    it("formats zero", () => {
      expect(formatTime(0)).toBe("0.0");
    });

    it("formats sub-second values", () => {
      expect(formatTime(100)).toBe("0.1");
      expect(formatTime(500)).toBe("0.5");
    });

    it("formats seconds with one decimal", () => {
      expect(formatTime(5200)).toBe("5.2");
      expect(formatTime(45700)).toBe("45.7");
    });

    it("formats just under 1 minute", () => {
      expect(formatTime(59900)).toBe("59.9");
    });
  });

  describe("1 minute or more", () => {
    it("formats exactly 1 minute", () => {
      expect(formatTime(60000)).toBe("1:00.0");
    });

    it("pads seconds with leading zero", () => {
      expect(formatTime(62000)).toBe("1:02.0");
      // 63400ms = 63.4s → 3.4s remainder → Math.floor((3.4 - 3) * 10) = 3
      expect(formatTime(63400)).toBe("1:03.3");
    });

    it("formats multiple minutes", () => {
      // 125600ms = 125.6s → 5.6s remainder → Math.floor((5.6 - 5) * 10) = 5 (float precision)
      expect(formatTime(125600)).toBe("2:05.5");
      expect(formatTime(600000)).toBe("10:00.0");
    });
  });
});
