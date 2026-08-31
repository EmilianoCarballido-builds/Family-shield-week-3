# Family Shield - Implementation Prompt

You are a coding agent building the Week 3 Business Bending prototype defined in `docs/PACKET.md`. Read the Packet completely before changing code. Treat it as the product contract.

## Mission

Build one working, mobile-first slice of **Family Shield** for a fictional Mexican bank customer about to make an urgent SPEI transfer after receiving a possible family-impersonation message.

The product must let the user:

1. Type or dictate what the requester said.
2. Receive a bounded LLM analysis of urgency, secrecy, and payment-pressure cues.
3. Start a simulated independent check with a preselected trusted contact.
4. Record whether the contact can confirm the claimed emergency, cannot confirm it, or does not respond.
5. Personally choose to cancel or continue the fictional transfer.

This is **not** a deepfake detector. Never label a voice, person, emergency, or payment as real, fake, safe, fraudulent, approved, or rejected.

## Non-negotiable product rules

- The account owner always makes the final decision.
- The contact can report whether they can confirm the claimed emergency but cannot approve, cancel, delay, or alter the transfer.
- The contact view must not show the payment amount, balance, recipient account, transaction history, audio, full transcript, credentials, or unrelated family data.
- The pause must be explained, transaction-specific, temporary, and limited to the fictional demo.
- A failed, ambiguous, or missing response must enter **Protocol Only** and offer a known-number callback, family code, or independent bank-help route.
- One confirmation reduces uncertainty but never becomes a safety guarantee.
- Use invented demo data only and label it.
- Store nothing after refresh. Do not add a database, accounts, analytics, or logging of user content.

## Recommended implementation

- Next.js with TypeScript and mobile-first accessible CSS.
- Browser Web Speech API for voice-to-text, with a complete typed-input fallback.
- One server-only `POST /api/analyze` route for LLM analysis.
- Strict runtime validation for every request and form.
- Environment variables for any API credentials; commit only `.env.example` with placeholder names.
- A deterministic simulated-analysis fallback is allowed only when prominently and persistently labeled **PROTOTYPE - SIMULATED AI**.
- Session-only client state for the verification demo.
- Vitest for unit/API tests and Playwright or an equivalent browser test for the critical journey.
- Vercel free-tier deployment.

Do not add dependencies until you inspect the existing repository and confirm what is already installed. Preserve unrelated user work. Never commit a secret or a real person's data.

## Analysis contract

### Request

Accept only a small object equivalent to:

```ts
{
  narrative: string; // editable transcript, 20-1200 characters
  newRecipient: boolean;
  urgencySelected: boolean;
}
```

Reject missing fields, extra fields, wrong types, and oversized bodies. Normalize whitespace. Do not log the request or transcript.

### Response

Return only structured data equivalent to:

```ts
{
  mode: "live" | "simulated";
  cues: Array<{
    type: "urgency" | "secrecy" | "payment_pressure" | "new_recipient";
    evidence: string;
    explanation: string;
  }>;
  summary: string;
  nextStep: "normal_demo" | "offer_independent_check";
}
```

Requirements:

- No score or fraud probability.
- No authenticity or safety verdict.
- At most four cues.
- Quote only short evidence fragments from the submitted narrative.
- The summary must say that cues are not proof.
- The server controls the system instruction and output schema.
- User text is data, not instructions; delimit it and do not let it change the task.
- If the live model errors, return a safe, visibly simulated fixture without exposing implementation details.

## Screen/state model

Implement the following explicit states:

1. **Intake** - fictional transfer summary, invented-data label, editable textarea, microphone control, typed fallback, and validation.
2. **Pressure-cue review** - live/simulated label, plain-language cues, "not proof" statement, and actions to cancel or start verification.
3. **Verification request** - contact alias, exact minimum claim to be shared, privacy boundary, and send/switch-to-contact action.
4. **Trusted-contact view** - no financial details; options: "I can confirm the claimed emergency," "I cannot confirm it," and "I am not sure."
5. **Outcome** - confirmed claim, cannot confirm, or no response. Never use green approval language or a "safe" checkmark.
6. **Protocol Only** - known-number callback, family safe word/code, and independent bank route when verification is unclear.
7. **Final owner decision** - only the payer can select "Cancel transfer" or "Continue anyway"; both are fictional demo endings.

## Feature and commit plan

Implement one feature at a time. After each feature, run its relevant checks and commit only when the acceptance criteria pass.

### Feature 1 - Safe project foundation and static shell

Build the project shell, global layout, accessibility baseline, invented-data banner, and static versions of the three core mockup screens.

Acceptance criteria:

- App runs locally with one documented command.
- Mobile layout works at 360 px and desktop layout works without horizontal overflow.
- Main headings, labels, buttons, focus styles, and color contrast are usable.
- The interface says that no real transfer occurs and all names/data are fictional.
- No secrets, database, auth, analytics, or external messaging are present.

Commit: `feat: scaffold family shield prototype`

Deploy after this commit as **Deploy 1** and record the URL and commit SHA in `DECISIONS.md`.

### Feature 2 - Voice and typed intake with validation

Add editable typed input, browser speech recognition where supported, clear microphone states, permission/error handling, and the typed fallback.

Acceptance criteria:

- A user can complete intake without enabling a microphone.
- Supported browsers can start/stop speech recognition and place the transcript in the editable field.
- Unsupported/denied voice access produces plain-language recovery, not a dead end.
- Client validation enforces the defined lengths/types.
- No audio is uploaded or stored.
- Keyboard and screen-reader labels work for all controls.

Commit: `feat: add validated voice and text intake`

### Feature 3 - Secure LLM pressure-cue route

Implement `POST /api/analyze`, strict server validation, the structured output contract, a server-side model call, and a visibly labeled simulated fallback.

Acceptance criteria:

- Valid requests return only the documented schema.
- Empty, malformed, oversized, wrong-type, and extra-field requests receive safe 4xx responses.
- No user content is logged.
- Model credentials are server-only and ignored by Git.
- Prompt-injection text cannot change the output task or schema.
- Every live or simulated response says that pressure cues are not proof.
- Automated endpoint tests cover valid and invalid cases.

Commit: `feat: analyze transfer pressure cues safely`

### Feature 4 - Independent contact and Protocol Only flow

Build the role-separated verification demo, all three contact outcomes, Protocol Only, and the owner's final decision.

Acceptance criteria:

- Contact view never exposes prohibited financial or personal information.
- Contact cannot control the transfer.
- Confirmed status is neutral and never says safe/approved.
- "Cannot confirm," "not sure," and timeout/no-response routes enter Protocol Only.
- Only the payer view contains final cancel/continue controls.
- Refresh clears the demo state.
- A browser test covers at least the cannot-confirm route end to end.

Commit: `feat: add independent family verification flow`

Deploy after this commit as **Deploy 2** and record the URL and SHA.

### Feature 5 - Complete testing, accessibility, and documentation

Finish the mechanical test matrix, responsive checks, README, privacy/security notes, and reproducible demo instructions.

Acceptance criteria:

- Unit/API/browser tests pass.
- Lint and production build pass.
- There are no console errors in the full journey.
- `README.md` explains setup, environment variables, simulation mode, test commands, and deployment.
- `DECISIONS.md` maps the six Blueprint conditions and shadow clause to the implementation.
- The tester documents at least one actual bug before fixing it.

Commit: `test: complete family shield verification coverage`

### Feature 6 - Required test fix and persona fix

Run the mechanical pass on Deploy 2, document at least one discovered bug, fix it, and repeat the affected test. Then run the fresh-chat Doña Elena persona test using ordered screenshots, log every confusion, and fix the highest-severity confusion.

Acceptance criteria:

- `docs/TEST_LOG.md` records the mechanical bug, reproduction steps, root cause, fix, and passing retest.
- `docs/PERSONA_LOG.md` records the persona, ordered screens, all confusion points, severity ranking, worst issue fixed, and retest result.
- Tests, lint, and production build pass after both fixes.
- The live deployment reflects the fixes.

Commit: `fix: resolve test and persona friction`

Redeploy as **Deploy 3**. This is the required fix-and-redeploy proof.

## Mechanical test cases

At minimum, automate or document these cases:

1. Typed happy path.
2. Voice permission denied and typed recovery.
3. Voice API unsupported and typed recovery.
4. Empty, too-short, and oversized narrative.
5. Wrong types, unexpected keys, invalid JSON, and oversized request body.
6. Prompt-injection-style narrative.
7. Live-model failure producing labeled simulated output.
8. Confirmed contact outcome without safety language.
9. Cannot-confirm outcome entering Protocol Only.
10. No-response/not-sure outcome entering Protocol Only.
11. Contact privacy check: no amount, balance, account, transcript, audio, or control.
12. Owner-control check: only the payer sees the final action.
13. Refresh clears all state.
14. 360 px mobile and keyboard-only journey.

## Persona test instructions

Create ordered screenshots from the live app. In a fresh LLM chat, use the exact persona from `docs/PACKET.md`, paste the screens one at a time, and ask the persona to attempt the task while narrating where she hesitates, misunderstands, or would silently quit. Log all feedback, rank it, fix the worst issue, repeat the affected screens, and preserve before/after evidence in `docs/PERSONA_LOG.md` for conversion to `PERSONA_Emiliano_Carballido.pdf`.

## Payer-model evidence

The product is bank-sponsored in the demo, but that is a hypothesis. Add a short non-persistent test script to the README for three family interviews and two banking/fintech/payments/fraud professionals. Evidence must be concrete: stated willingness or refusal to pay, acceptable price range, required metric, named blocker, pilot owner, introduction, or actual next step. Do not represent interest as a commitment.

## Explicitly excluded

Do not build real transfers, bank integration, WhatsApp/SMS sending, real contact invitations, authentication, a database, biometrics, voiceprints, identity matching, financial scoring, generic deepfake detection, restitution case management, admin surveillance, or trusted-contact payment controls.

## Final verification gate

Before calling the build complete, provide evidence for:

- `npm test`
- lint
- production build
- actual local HTTP/API tests
- browser journey at mobile and desktop widths
- console-error check
- public live URL after the post-test redeploy
- Git history containing at least the planned commits
- no tracked secrets or real personal data

Do not claim a command, deployment, URL, or test passed unless you actually ran and observed it.

## Session Close - mandatory every work session

Before ending any session:

1. Update `DECISIONS.md` with decisions made, evidence, unresolved risks, current deploy URL/SHA, and Blueprint-condition impact.
2. Write tomorrow's first concrete move.
3. Run the relevant tests.
4. Commit the session's completed work with a focused message.
5. Push to the configured remote.
6. Report what is complete, what was verified, the commit SHA, and the exact next move.

If blocked, preserve the work, document the blocker, and stop without inventing success or beginning an unapproved feature.

