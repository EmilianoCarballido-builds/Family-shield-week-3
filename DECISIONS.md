# Family Shield - Decisions Log

## Session 1 - Feature 1 foundation

### Decisions made

- The working slice is a bank-sponsored, pre-SPEI family-verification pause for an urgent, fictional transfer.
- The static foundation shows the three load-bearing states: review, independent verification, and unresolved outcome.
- Feature 1 contains no working AI, voice input, bank connection, contact messaging, storage, or payment controls.
- Every control is disabled until its corresponding tested feature exists.
- The visual language uses navy and teal for trust, amber for uncertainty, and avoids red panic or green approval cues.
- All names, amounts, and transaction details are fictional and labeled.

### Blueprint impact

- **Independent channel:** the verification screen describes a separate, preselected contact route.
- **User control:** the final screen says that only the account owner decides.
- **Proportional pause:** the copy frames the intervention as short and transaction-specific.
- **Works under pressure:** large typography, large controls, and one clear primary action reduce cognitive load.
- **No certainty claims:** the screens say that cues and incomplete verification do not prove fraud or safety.
- **Shadow clause:** the contact privacy panel explicitly excludes balance, amount, history, and payment control.

### Unresolved risks

- Voice recognition behavior and browser support remain untested until Feature 2.
- LLM schema, prompt-injection handling, and simulated fallback remain unimplemented until Feature 3.
- The role-separated contact flow remains static until Feature 4.

### Tomorrow's first move

Implement Feature 2: validated typed intake and browser voice-to-text with a complete typed fallback.

