# Family Shield

Family Shield is a Week 3 Business Bending prototype for independent family verification before an urgent, fictional SPEI transfer.

## Current milestone

Feature 4 completes the end-to-end fictional flow with validated voice/text intake, pressure-cue analysis, an independent trusted-contact view, Protocol Only, and an owner-controlled final decision:

1. Explainable transaction review with an editable request description
2. Independent trusted-contact check
3. Unresolved outcome with owner control

The intake supports Spanish (Mexico) browser speech recognition and always provides a typed fallback. No audio is uploaded or stored. `POST /api/analyze` accepts only a small validated object and returns bounded structured cues without a score or verdict.

The contact request contains only a fictional contact alias and the emergency claim. It does not contain the amount, balance, account details, audio, transcript, or payment controls. “Cannot confirm,” “not sure,” and “no response” all enter Protocol Only. Only Elena's view contains the final cancel-or-continue actions, and all state disappears when the page refreshes.

Without `AI_GATEWAY_API_KEY`, the route returns a deterministic result permanently labeled **PROTOTYPE — SIMULATED AI**. If a server-side key is configured, it attempts a structured live model response and safely falls back to the labeled simulation on failure. Copy `.env.example` to `.env.local` only for local live-model testing and never commit the key. The classroom deployment intentionally uses simulated mode, so it requires no secret or model cost.

## Run locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm test
npm run lint
```

## Safety boundary

This is a fictional academic prototype. It does not determine whether a voice, person, emergency, or transaction is real, fake, safe, or fraudulent. It stores no personal data and never gives a trusted contact control over a payment.
