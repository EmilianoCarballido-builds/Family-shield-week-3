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

## Session 2 - Feature 2 voice and typed intake

### Decisions made

- The user can type a request or dictate it through the browser's native speech-recognition interface.
- Voice recognition uses Spanish (Mexico) because the exact user is a Mexican older adult receiving a family-emergency request.
- The transcript remains editable and is never submitted automatically after dictation.
- The interface includes a fictional example so the live demo never requires real personal information.
- Client validation requires 20-1200 normalized characters and returns plain-language recovery messages.
- Unsupported browsers and denied microphone permission always return focus to the typed fallback.
- Audio is processed only by the browser speech interface; the prototype does not upload, save, or log audio.
- Saving a valid description stops at a clearly labeled readiness state. AI analysis remains outside Feature 2.

### Blueprint impact

- **Works under pressure:** voice and typing offer two ways to complete the same action without a dead end.
- **User control:** the user reviews and edits the transcript before anything can continue.
- **No certainty claims:** intake collects context only and does not display a verdict or score.
- **Shadow clause:** the form warns against real names, account numbers, and private information; nothing persists after refresh.

### Verification completed

- Typed-input validation covers wrong type, too short, valid, and too long values.
- Voice support detection, permission-error recovery, stop behavior, and component cleanup are implemented.
- Keyboard focus and live status announcements are included.
- Starter-only CSS assertions were replaced with product-specific intake, validation, voice-control, and reduced-motion checks.

### Unresolved risks

- Browser voice support varies; the typed fallback remains the guaranteed path.
- The transcript has not yet been sent to an LLM or server route.
- Contact verification remains static.

### Tomorrow's first move

Implement Feature 3: a strictly validated pressure-cue analysis route with structured, visibly labeled simulated output.
