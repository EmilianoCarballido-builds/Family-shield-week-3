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

## Session 3 - Feature 3 pressure-cue analysis

### Decisions made

- Analysis is handled only by `POST /api/analyze`; the browser never receives a model credential.
- The request accepts exactly three fields and rejects missing, extra, wrong-type, malformed, and oversized input.
- The current deployment uses the deterministic fallback and permanently labels it **PROTOTYPE — SIMULATED AI**.
- A server-side AI Gateway path is available when `AI_GATEWAY_API_KEY` is configured; model or schema failure returns the safe simulated result.
- User text is delimited as untrusted data, while the server controls the instruction and response schema.
- The response contains cue categories, short evidence, explanations, and a next step—never a score, probability, authenticity verdict, or safety decision.
- The summary is controlled by the server and always says that cues are not proof.

### Blueprint impact

- **Proportional pause:** the result explains that only the current fictional transfer is paused temporarily.
- **Works under pressure:** the cue review is one action and returns a plain-language next step.
- **No certainty claims:** every response uses a server-controlled not-proof statement and contains no risk score.
- **User control:** analysis recommends an independent check but cannot cancel, approve, or move money.
- **Shadow clause:** no content is stored or logged, and only the minimal transcript plus fictional transaction flags enter the route.

### Verification completed

- API tests cover valid simulated output, malformed JSON, wrong types, extra fields, oversized bodies, and prompt-injection-style text.
- Output tests enforce the documented keys, four-cue maximum, not-proof statement, and absence of score/probability fields.
- The UI includes loading, success, unavailable, and typed-fallback states with an accessible live-status message.
- The first mechanical pass found a response-schema bug: simulated analysis could correctly return four allowed cues while the validator allowed only three. The response limit was corrected to four and the affected test was rerun.

### Unresolved risks

- Live model mode is implemented but remains unverified until the project receives a server-side AI Gateway key.
- Independent contact actions and outcome state remain static until Feature 4.
- The simulated cue rules are intentionally narrow and must not be presented as fraud detection.

### Tomorrow's first move

Implement Feature 4: the role-separated trusted-contact flow, Protocol Only outcomes, and final owner decision.

## Session 4 - Feature 4 independent verification flow

### Decisions made

- The prototype now displays one role-specific screen at a time so Mariana cannot see Elena's transfer details beside the contact interface.
- Elena reviews the pressure cues before the independent-check action becomes available.
- The simulated contact request contains only Mariana's alias and the claim that Luis had an accident today.
- Mariana can report “confirmed,” “cannot confirm,” or “not sure,” but cannot approve, cancel, delay, or change the transfer.
- A no-response path is available without pretending a real message was sent.
- “Cannot confirm,” “not sure,” and “no response” all activate Protocol Only.
- A confirmed claim is described as reduced uncertainty, never approval or proof of safety.
- Only Elena's outcome screen contains the final cancel-or-continue actions.
- All flow state remains in React memory and disappears on refresh or restart.

### Blueprint impact

- **Independent channel:** the demo explicitly switches from Elena's view to a separate Mariana view.
- **User control:** Mariana reports knowledge only; Elena alone makes the payment decision.
- **Proportional pause:** the pause ends with Elena's decision and applies only to the fictional MXN 8,500 transfer.
- **Works under pressure:** one primary action advances each stage, while no response has a visible recovery route.
- **No certainty claims:** all outcomes remain neutral, and confirmation is not presented as safety.
- **Shadow clause:** the contact payload has only `contactAlias` and `claim`; prohibited financial, audio, and transcript fields are absent.

### Verification completed

- Policy tests cover all four contact outcomes and enforce Protocol Only for every unclear result.
- A privacy-boundary test confirms that the contact request has only two allowed fields.
- Initial-render tests confirm the interactive flow, analysis action, and family-verification action are present.
- Responsive CSS keeps final actions stacked on narrow screens and exposes keyboard-visible radio controls.
- A real browser pass completed the cannot-confirm route from fictional intake through simulated analysis, isolated contact view, Protocol Only, and Elena's cancellation decision.
- The contact screen contained no transfer amount, the page had no framework error overlay, and the browser reported no site-origin console errors.

### Unresolved risks

- No real message is sent; every contact step is visibly simulated.
- Mobile-width browser verification and the remaining outcome branches stay in the final test milestone.
- The live Site remains owner-only until submission access is explicitly widened.

### Tomorrow's first move

Implement Feature 5: finish full-journey tests, accessibility checks, README instructions, and final security documentation.
