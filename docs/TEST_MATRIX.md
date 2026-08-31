# Family Shield - Mechanical Test Matrix

Legend: **Automated** runs in `npm test`; **Browser** was exercised in the production-compatible preview; **Inspection** is a documented source/CSS boundary.

| # | Test case | Method | Result and evidence |
|---:|---|---|---|
| 1 | Typed happy path | Browser | Passed: fictional example produced bounded simulated cues and enabled verification. |
| 2 | Voice permission denied and typed recovery | Inspection | Implemented: denied microphone returns focus to the textarea and explains typed recovery. |
| 3 | Voice unsupported and typed recovery | Browser + inspection | Passed: preview browser exposed the disabled unsupported microphone state while typing remained available. |
| 4 | Empty, too-short, and oversized narrative | Automated | Passed in shared validation and API tests. |
| 5 | Wrong types, unexpected keys, invalid JSON, wrong content type, and oversized request | Automated | Passed with safe 400, 413, or 415 responses. |
| 6 | Prompt-injection-style narrative | Automated | Passed: text remained data; response schema and not-proof statement were unchanged. |
| 7 | Missing live-model key/failure | Automated | Passed: deterministic output returned with `mode: simulated`; UI shows permanent simulated label. |
| 8 | Confirmed contact outcome without approval language | Automated | Passed: confirmation does not activate Protocol Only and explicitly does not prove safety. |
| 9 | Cannot-confirm outcome | Automated + Browser | Passed: entered Protocol Only and returned final control to Elena. |
| 10 | No-response and not-sure outcomes | Automated | Passed: both require Protocol Only. |
| 11 | Contact privacy boundary | Automated + Browser | Passed: payload has only `contactAlias` and `claim`; contact screen omitted the MXN 8,500 amount. |
| 12 | Owner control | Automated + Browser | Passed: Mariana cannot control payment; only Elena's outcome screen has final actions. |
| 13 | Refresh/restart clears state | Inspection | Passed by architecture: flow state exists only in React memory; no browser or server persistence APIs are used. |
| 14 | 360 px/mobile and keyboard behavior | CSS inspection | Responsive rules stack controls below 420/760 px; semantic labels, radio controls, focus styles, live status, and reduced-motion handling are present. |
| 15 | No secrets, logging, or storage | Automated | Static security tests confirm blank env example, server-only key reference, and absence of user-content logging/persistence APIs. |
| 16 | Production page and API serving | Automated | Production bundle renders the main page; `/api/analyze` is exercised through the built worker. |

## Commands

```bash
npm test
npm run lint
npm run build
```

The actual bug/fix/redeploy evidence and browser journey are recorded in [`TEST_LOG.md`](TEST_LOG.md).
