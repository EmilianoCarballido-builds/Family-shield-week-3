# Family Shield - Mechanical Test Log

## Pass 1 - Pressure-cue response contract

**Bug found:** The deterministic analysis could correctly produce four allowed pressure cues (urgency, secrecy, payment pressure, and new recipient), but the response validator allowed only three.

**Reproduction:** Run `npm test` with the fictional example containing all three language cues and `newRecipient: true`.

**Observed result:** The simulated object was generated, but `analysisResponseSchema.safeParse(output)` failed.

**Root cause:** The implementation contract permits at most four cues, while the shared response schema mistakenly used `.max(3)`.

**Fix:** Changed the response-schema maximum to four. The live-model instruction remains limited to three narrative cues, leaving room for the transaction-level new-recipient cue.

**Retest:** The affected schema test passed, the complete API suite passed, and the corrected version was redeployed.

## Pass 2 - Cannot-confirm browser journey

**Environment:** Local production-compatible Sites preview in Chrome.

**Journey tested:**

1. Loaded the fictional example.
2. Requested pressure-cue analysis and observed the **PROTOTYPE — SIMULATED AI** label.
3. Started verification with Mariana.
4. Confirmed the request preview contained only Mariana's alias and the emergency claim.
5. Switched to Mariana's isolated view and confirmed the MXN 8,500 amount was absent.
6. Selected **I cannot confirm it**.
7. Observed the Protocol Only outcome and Elena's final-decision controls.
8. Selected **Cancel transfer** and observed the fictional completion screen.

**Result:** Passed. No framework error overlay, blank page, or site-origin console error appeared. The browser environment emitted extension-only metadata errors unrelated to the application.

## Pass 3 - Final security and accessibility gate

**Checks added:** JSON content-type enforcement, unsupported-method handling, missing and short fields, `nosniff`/`no-store` headers, blank environment example, server-only key reference, secret-pattern scan, no user-content logging, no browser persistence API, and reduced-motion output.

**Test issue found:** The first reduced-motion assertion expected the literal source form `0.01ms`, while the production CSS optimizer correctly emitted the equivalent `.01ms`.

**Fix:** Updated only the test expression to accept either equivalent serialized form; the accessibility CSS itself did not require a change.

**Result:** Production build passed, lint passed, and all 15 automated tests passed.
