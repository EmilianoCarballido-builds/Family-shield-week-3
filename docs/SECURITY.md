# Family Shield - Security Floor Review

## Security posture

This is a fictional, session-only academic prototype. Its security strategy is data minimization: do not collect or persist personal data, do not expose a model credential to the browser, and do not give the trusted contact access to financial information or payment controls.

## Five required checks

| Requirement | Status | Evidence |
|---|---|---|
| No secrets in code or repository | Pass | `.env*` is ignored, `.env.example` contains only a blank variable, and static tests reject credential-shaped values. `AI_GATEWAY_API_KEY` is read only in the server route. |
| Auth if personal data is stored | Not applicable by design | No account, database, cookie, local storage, session storage, analytics, recording, or persistent transcript exists. If persistence is introduced, auth becomes mandatory before collection. |
| RLS for personal Supabase tables | Not applicable by design | The prototype has no Supabase project or user-data table. Any future personal-data schema requires Supabase Auth and user-scoped RLS before deployment. |
| Every form validates input | Pass | Client validation enforces a normalized 20–1200-character narrative. The API requires JSON, three exact typed fields, a 5,000-byte body limit, and rejects extra fields. |
| No real personal demo data | Pass | Elena, Mariana, Luis, the accident claim, the contact relationship, recipient, amount, responses, and transfer are invented and visibly labeled. |

## API boundary

`POST /api/analyze`:

- accepts only `application/json`;
- accepts exactly `narrative`, `newRecipient`, and `urgencySelected`;
- normalizes and bounds the narrative;
- rejects malformed JSON, missing fields, wrong types, extra fields, and oversized bodies;
- sends `Cache-Control: no-store` and `X-Content-Type-Options: nosniff`;
- does not log the request or model output;
- treats the narrative as delimited untrusted data;
- constrains live output with a server-owned schema;
- returns a safe, visibly simulated response when no key exists or the model fails.

## Shadow-clause boundary

The simulated contact request has exactly two fields: a fictional contact alias and the emergency claim. It excludes the transfer amount, balance, bank/account details, recipient details, transaction history, full transcript, audio, credentials, unrelated family data, and any ability to approve, cancel, schedule, delay, or change a payment.

The contact's confirmation is neutral evidence only. It never becomes a “safe,” “approved,” or authenticity verdict. Only the fictional account owner sees the final cancel-or-continue controls.

## Threats considered

| Threat | Mitigation |
|---|---|
| Secret exposure | Server-only environment variable; ignored environment files; static repository scan. |
| Prompt injection | User text is delimited as data; system instruction and output schema remain server-controlled. |
| Oversized/malformed input | Content-type check, byte limit, strict runtime schema, safe 4xx responses. |
| False certainty | No score/probability; server-controlled not-proof statement; neutral contact outcomes. |
| Family surveillance/control | Minimal contact payload and role-isolated screens; no financial access or payment action. |
| Accidental retention | No database, local/session storage, analytics, cookies, or content logging. |
| Real-person exposure in demo | Invented names and transaction data with persistent fictional-demo notice. |

## Residual risks

- Browser speech recognition support and processing behavior depend on the user's browser; typed input is the guaranteed fallback.
- Live-model mode is optional and has not been enabled in the classroom deployment.
- The deterministic cue rules are deliberately narrow and must not be described as fraud detection.
- The contact channel and transfer are simulated; no real delivery, identity, banking, or callback assurance is provided.
- Public submission access will widen who can open the fictional demo. Because no data persists, visitors do not gain access to another user's session.
