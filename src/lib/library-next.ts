export const LIBRARY_NEXT_PATHS = [
  "/resources",
  "/storylock-tax-tool",
  "/extraction-instrument-tool",
  "/protagonist-map",
  "/resources/the-multi-protagonist-map",
] as const;

export type LibraryNextPath = (typeof LIBRARY_NEXT_PATHS)[number];

export const LIBRARY_INTENTS = [
  "storylock_tax",
  "extraction_instrument",
  "multi_protagonist_map",
] as const;

export type LibraryIntent = (typeof LIBRARY_INTENTS)[number];

export function sanitizeLibraryNext(value: unknown): LibraryNextPath {
  if (typeof value === "string" && (LIBRARY_NEXT_PATHS as readonly string[]).includes(value)) {
    return value as LibraryNextPath;
  }
  return "/resources";
}

export function sanitizeLibraryIntent(value: unknown): LibraryIntent | null {
  if (typeof value === "string" && (LIBRARY_INTENTS as readonly string[]).includes(value)) {
    return value as LibraryIntent;
  }
  return null;
}
