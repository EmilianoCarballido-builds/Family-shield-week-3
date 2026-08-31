import { CircleAlert, ShieldCheck } from "lucide-react";

import { VerificationFlow } from "@/components/verification-flow";

export default function Home() {
  return (
    <main className="site-shell">
      <div className="ambient-orb ambient-orb-one" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-two" aria-hidden="true" />

      <header className="product-header">
        <a className="brand" href="#main-experience" aria-label="Family Shield home">
          <span className="brand-mark"><ShieldCheck aria-hidden="true" /></span>
          <span>
            <strong>Family Shield</strong>
            <small>Verify before SPEI</small>
          </span>
        </a>
        <div className="header-status">
          <span className="status-dot" aria-hidden="true" />
          End-to-end fictional demo
        </div>
      </header>

      <section className="intro" id="main-experience">
        <div>
          <p className="kicker">Bank-sponsored family verification</p>
          <h1>A deliberate pause before money moves.</h1>
          <p>
            Family Shield helps a customer independently verify an urgent family request
            without giving relatives access to the account—or asking AI to decide what is true.
          </p>
        </div>
        <aside className="demo-notice" aria-label="Prototype limitations">
          <CircleAlert aria-hidden="true" />
          <div>
            <strong>Fictional demo only</strong>
            <span>No real people, bank accounts, messages, or transfers.</span>
          </div>
        </aside>
      </section>

      <section className="screens-section interactive-section" aria-labelledby="flow-title">
        <div className="section-heading">
          <span id="flow-title">Interactive verification flow</span>
          <span>Review · verify · decide</span>
        </div>
        <VerificationFlow />
      </section>

      <footer>
        <p>Protection cannot quietly become control.</p>
        <span>Week 3 prototype · Emiliano Carballido</span>
      </footer>
    </main>
  );
}
