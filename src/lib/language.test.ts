import { describe, expect, it } from "bun:test";
import { preferredLanguage } from "./language";

describe("language preference", () => {
  it("defaults to English for a new visit", () => {
    expect(preferredLanguage(null)).toBe("en");
  });
  it("preserves an explicit Portuguese selection", () => {
    expect(preferredLanguage("pt")).toBe("pt");
  });
});