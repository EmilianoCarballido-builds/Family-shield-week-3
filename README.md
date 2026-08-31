# Family Shield

Family Shield is Emiliano Carballido's Week 3 Business Bending prototype: a short, explainable verification pause before an urgent fictional SPEI transfer.

**Live prototype:** https://family-shield-week3.ecarba27.chatgpt.site

**Current milestone:** Feature 5 — complete working slice, mechanical test coverage, security documentation, and deployment evidence.

The current Site is owner-only during development. It must be changed to public access before the professor tests the submission.

## What the prototype does

1. Elena types or dictates an invented urgent-transfer request.
2. A server route returns bounded pressure cues with a visible live/simulated label.
3. Elena starts an independent verification request with Mariana.
4. Mariana receives only the emergency claim and reports what she knows.
5. Unclear outcomes enter Protocol Only; Elena alone cancels or continues the fictional transfer.

This is not a generic deepfake detector. It never decides whether a voice, person, emergency, or transfer is real, fake, safe, fraudulent, approved, or rejected.

## Stack and boundaries

| Layer | Implementation |
|---|---|
| Interface | Next.js 16, React 19, TypeScript, accessible CSS, Shadcn primitives |
| Voice | Browser Web Speech API using `es-MX`, with a complete typed fallback |
| Analysis | Server-only `POST /api/analyze` using Vercel AI SDK and AI Gateway when configured |
| Default classroom mode | Deterministic fallback permanently labeled **PROTOTYPE — SIMULATED AI** |
| State | React memory only; refresh clears the demo |
| Storage/auth | None; the prototype stores no personal data |
| Hosting | ChatGPT Sites production deployment |

## Run locally

Requirements: Node.js 22.13 or newer and npm.

```bash
npm ci
npm run dev
```

Open the local URL printed by the development server.

### Optional live-model mode

Simulation mode requires no key. For optional live-model testing only:

```bash
cp .env.example .env.local
```

Then set `AI_GATEWAY_API_KEY` in `.env.local`. Environment files are ignored by Git, the key is read only by the server route, and any model/schema failure returns the visibly labeled simulated fallback. Never commit or paste a real key into source, screenshots, or transcripts.

## Verify

```bash
npm test
npm run lint
npm run build
```

`npm test` builds the production bundle and runs the Node test suite. Coverage includes request validation, oversized bodies, extra fields, prompt-injection-style text, output boundaries, contact privacy, all verification outcomes, reduced-motion CSS, absence of tracked credentials, and no user-content persistence/logging.

Current verified result: **15/15 automated tests passing**, with lint and the production build passing.

The documented browser pass is in [`docs/TEST_LOG.md`](docs/TEST_LOG.md), and the complete case matrix is in [`docs/TEST_MATRIX.md`](docs/TEST_MATRIX.md).

## Reproduce the main demo

1. Select **Use fictional example**.
2. Select **Review pressure cues** and identify the **PROTOTYPE — SIMULATED AI** label.
3. Select **Verify with Mariana**.
4. Confirm the preview shares only: “Can you confirm whether Luis had an accident today?”
5. Select **Send simulated request**.
6. In Mariana's view, select **I cannot confirm it**.
7. Select **Send response to Elena** and review Protocol Only.
8. As Elena, select **Cancel transfer** or **Continue anyway**.
9. Restart or refresh and confirm the session is cleared.

## Security floor

- No secret is stored in code; only a blank `.env.example` is tracked.
- No personal data is persisted, so authentication and a database are intentionally excluded.
- Every client and server input is type- and length-validated.
- The API accepts only JSON, rejects extra fields, limits the body size, and returns `no-store`/`nosniff` headers.
- All names, claims, amounts, contacts, and outcomes are fictional and labeled.
- The trusted contact receives no amount, balance, account, recipient details, audio, transcript, credentials, history, or payment control.

See [`docs/SECURITY.md`](docs/SECURITY.md) for the complete checklist and residual risks.

## Business-model interviews

The bank-sponsored B2B2C model is a hypothesis, not a conclusion. Show the demo to three family users and two banking/fintech/payments/fraud professionals. Record concrete evidence: willingness or refusal to pay, acceptable price, required metric, named blocker, credible pilot owner, introduction, or next step. Compliments alone do not validate the payer.

## Project evidence

- [`docs/PACKET.md`](docs/PACKET.md) — packet-before-code evidence
- [`docs/IMPLEMENTATION_PROMPT.md`](docs/IMPLEMENTATION_PROMPT.md) — coding-agent build plan
- [`DECISIONS.md`](DECISIONS.md) — session close and Blueprint mapping
- [`docs/TEST_LOG.md`](docs/TEST_LOG.md) — discovered bug, fix, redeploy, and browser pass
- [`docs/TEST_MATRIX.md`](docs/TEST_MATRIX.md) — mechanical coverage
- [`docs/SECURITY.md`](docs/SECURITY.md) — security-floor review

## Explicit exclusions

No real transfer, bank integration, WhatsApp/SMS sending, contact invitation, database, authentication, biometrics, voiceprint, identity match, generic deepfake verdict, financial score, reimbursement workflow, analytics, or trusted-contact payment control.
