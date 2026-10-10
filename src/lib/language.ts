export type Language = "pt" | "en";

export function preferredLanguage(saved: string | null): Language {
  return saved === "pt" ? "pt" : "en";
}