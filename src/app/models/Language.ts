export enum Language {
  ENGLISH = "ENGLISH",
  GERMAN = "GERMAN"
}

export function getLanguageValues(): string[] {
  return Object.values(Language);
}
