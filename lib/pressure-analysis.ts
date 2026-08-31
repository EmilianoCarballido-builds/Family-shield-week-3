import { z } from "zod";

import {
  MAX_NARRATIVE_LENGTH,
  MIN_NARRATIVE_LENGTH,
  normalizeNarrative,
} from "@/lib/intake-validation";

export const cueTypeSchema = z.enum([
  "urgency",
  "secrecy",
  "payment_pressure",
  "new_recipient",
]);

export const analysisRequestSchema = z
  .object({
    narrative: z
      .string()
      .transform(normalizeNarrative)
      .pipe(z.string().min(MIN_NARRATIVE_LENGTH).max(MAX_NARRATIVE_LENGTH)),
    newRecipient: z.boolean(),
    urgencySelected: z.boolean(),
  })
  .strict();

export const generatedAnalysisSchema = z.object({
  cues: z
    .array(
      z.object({
        type: cueTypeSchema,
        evidence: z.string().min(1).max(90),
        explanation: z.string().min(1).max(180),
      }),
    )
    .max(4),
  nextStep: z.enum(["normal_demo", "offer_independent_check"]),
});

export const analysisResponseSchema = generatedAnalysisSchema.extend({
  mode: z.enum(["live", "simulated"]),
  summary: z.string().min(1).max(220),
});

export type AnalysisRequest = z.infer<typeof analysisRequestSchema>;
export type AnalysisResponse = z.infer<typeof analysisResponseSchema>;
export type PressureCue = AnalysisResponse["cues"][number];

export const SAFE_SUMMARY =
  "These pressure cues are not proof of what happened or who sent the message. Verify the emergency through a separate channel before deciding.";

const cueRules: Array<{
  type: PressureCue["type"];
  pattern: RegExp;
  explanation: string;
}> = [
  {
    type: "urgency",
    pattern: /\b(urgente|ahora|hoy|inmediatamente|accidente|emergencia|urgent|now|today|accident|emergency)\b/i,
    explanation: "Urgent language can reduce the time available to check the request independently.",
  },
  {
    type: "secrecy",
    pattern: /(no (le )?digas|no llames|que nadie sepa|secreto|don['’]?t tell|do not tell|don['’]?t call|secret)/i,
    explanation: "A request for secrecy can separate the account owner from people who could help verify it.",
  },
  {
    type: "payment_pressure",
    pattern: /\b(deposita|dep[oó]sito|transfiere|transferencia|manda dinero|paga|send money|transfer|deposit|pay)\b/i,
    explanation: "A direct request to move money increases the cost of acting before verification.",
  },
];

function shortEvidence(narrative: string, match: RegExpMatchArray) {
  const index = match.index ?? 0;
  const start = Math.max(0, index - 24);
  const end = Math.min(narrative.length, index + match[0].length + 32);
  const fragment = narrative.slice(start, end).trim();
  return `${start > 0 ? "…" : ""}${fragment}${end < narrative.length ? "…" : ""}`.slice(0, 90);
}

export function createSimulatedAnalysis(input: AnalysisRequest): AnalysisResponse {
  const cues: PressureCue[] = [];

  for (const rule of cueRules) {
    const match = input.narrative.match(rule.pattern);
    if (match) {
      cues.push({
        type: rule.type,
        evidence: shortEvidence(input.narrative, match),
        explanation: rule.explanation,
      });
    }
  }

  if (input.newRecipient) {
    cues.push({
      type: "new_recipient",
      evidence: "First transfer to this fictional recipient",
      explanation: "A new recipient makes an independent check more useful before money moves.",
    });
  }

  if (input.urgencySelected && !cues.some((cue) => cue.type === "urgency")) {
    cues.unshift({
      type: "urgency",
      evidence: "Urgency marked for this fictional request",
      explanation: "Urgency can reduce the time available to verify the request independently.",
    });
  }

  return {
    mode: "simulated",
    cues: cues.slice(0, 4),
    summary: SAFE_SUMMARY,
    nextStep: cues.length >= 2 ? "offer_independent_check" : "normal_demo",
  };
}
