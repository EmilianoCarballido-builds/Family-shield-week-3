export type ContactOutcome =
  | "confirmed"
  | "cannot_confirm"
  | "not_sure"
  | "no_response";

export const outcomeCopy: Record<ContactOutcome, { title: string; detail: string }> = {
  confirmed: {
    title: "Mariana confirmed the claimed emergency",
    detail: "One independent confirmation reduces uncertainty, but it does not prove the transfer is safe.",
  },
  cannot_confirm: {
    title: "Mariana could not confirm the claim",
    detail: "The emergency remains unresolved. This is not a verdict about the caller or request.",
  },
  not_sure: {
    title: "Mariana is not sure",
    detail: "An uncertain response cannot verify the emergency. Use the independent protocol below.",
  },
  no_response: {
    title: "Mariana did not respond",
    detail: "No response means verification is incomplete. It does not prove what happened.",
  },
};

export function requiresProtocolOnly(outcome: ContactOutcome) {
  return outcome !== "confirmed";
}

export function createContactRequest() {
  return {
    contactAlias: "Mariana C.",
    claim: "Can you confirm whether Luis had an accident today?",
  } as const;
}
