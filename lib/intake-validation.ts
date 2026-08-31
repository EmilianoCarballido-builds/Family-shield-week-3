export const MIN_NARRATIVE_LENGTH = 20;
export const MAX_NARRATIVE_LENGTH = 1200;

export type NarrativeValidation =
  | { valid: true; value: string }
  | { valid: false; error: string };

export function normalizeNarrative(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function validateNarrative(value: unknown): NarrativeValidation {
  if (typeof value !== "string") {
    return { valid: false, error: "Enter the request as text before continuing." };
  }

  const normalized = normalizeNarrative(value);

  if (normalized.length < MIN_NARRATIVE_LENGTH) {
    return {
      valid: false,
      error: `Add at least ${MIN_NARRATIVE_LENGTH} characters so the request has enough context.`,
    };
  }

  if (normalized.length > MAX_NARRATIVE_LENGTH) {
    return {
      valid: false,
      error: `Keep the description under ${MAX_NARRATIVE_LENGTH} characters.`,
    };
  }

  return { valid: true, value: normalized };
}
