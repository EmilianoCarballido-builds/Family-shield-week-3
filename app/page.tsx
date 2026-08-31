import {
  ArrowRight,
  BadgeCheck,
  CircleAlert,
  LockKeyhole,
  PhoneCall,
  ShieldCheck,
  UserRoundCheck,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { TransferIntake } from "@/components/transfer-intake";

const steps = ["Review", "Verify", "Decide"];

function StepRail({ active }: { active: number }) {
  return (
    <ol className="step-rail" aria-label={`Step ${active} of 3`}>
      {steps.map((step, index) => {
        const complete = index + 1 < active;
        const current = index + 1 === active;
        return (
          <li
            className={complete || current ? "step is-active" : "step"}
            key={step}
            aria-current={current ? "step" : undefined}
          >
            <span>{complete ? "✓" : index + 1}</span>
            <small>{step}</small>
          </li>
        );
      })}
    </ol>
  );
}

function ReviewScreen() {
  return (
    <article className="phone-card phone-card-primary" aria-labelledby="review-title">
      <div className="screen-topline">
        <span>Step 1 of 3</span>
        <span className="mode-label">AI review available</span>
      </div>
      <StepRail active={1} />

      <div className="screen-icon screen-icon-teal" aria-hidden="true">
        <ShieldCheck />
      </div>
      <p className="eyebrow">Family Shield review</p>
      <h2 id="review-title">Review this urgent transfer</h2>
      <p className="screen-lede">
        A short pause can give you time to verify the emergency independently.
      </p>

      <div className="transfer-card" aria-label="Fictional transfer details">
        <div>
          <span>New recipient</span>
          <strong>Luis M.</strong>
        </div>
        <div className="transfer-amount">
          <span>Amount</span>
          <strong>$8,500 MXN</strong>
        </div>
      </div>

      <div className="reason-card">
        <CircleAlert aria-hidden="true" />
        <div>
          <strong>Why you are seeing this</strong>
          <p>We noticed urgency language and a first-time recipient.</p>
        </div>
      </div>

      <TransferIntake />

      <div className="screen-actions">
        <Button className="primary-action" size="lg" disabled>
          <UserRoundCheck aria-hidden="true" /> Verify with family
        </Button>
        <Button className="secondary-action" variant="outline" size="lg" disabled>
          <X aria-hidden="true" /> Cancel transfer
        </Button>
      </div>
      <p className="certainty-note">These signals do not prove fraud.</p>
    </article>
  );
}

function ContactScreen() {
  return (
    <article className="phone-card" aria-labelledby="contact-title">
      <div className="screen-topline">
        <span>Step 2 of 3</span>
        <span className="privacy-label"><LockKeyhole /> Private</span>
      </div>
      <StepRail active={2} />

      <div className="screen-icon screen-icon-navy" aria-hidden="true">
        <UserRoundCheck />
      </div>
      <p className="eyebrow">Independent check</p>
      <h2 id="contact-title">Ask Mariana to confirm</h2>
      <p className="screen-lede">
        The request goes through a channel separate from the original message.
      </p>

      <div className="contact-card">
        <span className="avatar" aria-hidden="true">MC</span>
        <div>
          <small>Trusted contact</small>
          <strong>Mariana C.</strong>
          <span>Previously selected</span>
        </div>
        <BadgeCheck aria-label="Preselected contact" />
      </div>

      <div className="privacy-card">
        <LockKeyhole aria-hidden="true" />
        <div>
          <strong>Your financial information stays private</strong>
          <p>Mariana cannot see your balance, amount, history, or control the payment.</p>
        </div>
      </div>

      <div className="screen-actions compact-actions">
        <Button className="primary-action" size="lg" disabled>
          Send verification <ArrowRight aria-hidden="true" />
        </Button>
        <Button className="secondary-action" variant="outline" size="lg" disabled>
          Use another method
        </Button>
      </div>
    </article>
  );
}

function OutcomeScreen() {
  return (
    <article className="phone-card" aria-labelledby="outcome-title">
      <div className="screen-topline">
        <span>Step 3 of 3</span>
        <span className="owner-label">Owner decides</span>
      </div>
      <StepRail active={3} />

      <div className="screen-icon screen-icon-amber" aria-hidden="true">
        <CircleAlert />
      </div>
      <p className="eyebrow">Verification status</p>
      <h2 id="outcome-title">Verification incomplete</h2>
      <p className="screen-lede">Mariana could not confirm the claimed emergency.</p>

      <div className="status-card">
        <span className="status-mark" aria-hidden="true">?</span>
        <div>
          <strong>Unresolved — not a verdict</strong>
          <p>This does not prove fraud or prove that the transfer is safe.</p>
        </div>
      </div>

      <div className="protocol-card">
        <span>Protocol Only</span>
        <ul>
          <li><PhoneCall aria-hidden="true" /> Call a number you already know</li>
          <li><ShieldCheck aria-hidden="true" /> Ask for the family safety code</li>
        </ul>
      </div>

      <div className="screen-actions compact-actions">
        <Button className="cancel-action" size="lg" disabled>
          Cancel transfer
        </Button>
        <Button className="secondary-action" variant="outline" size="lg" disabled>
          Continue anyway
        </Button>
      </div>
      <p className="certainty-note">Only the account owner makes this decision.</p>
    </article>
  );
}

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
          Voice + pressure-cue review
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

      <section className="screens-section" aria-labelledby="flow-title">
        <div className="section-heading">
          <span id="flow-title">Core verification flow</span>
          <span>Three load-bearing screens</span>
        </div>
        <div className="screen-grid">
          <ReviewScreen />
          <ContactScreen />
          <OutcomeScreen />
        </div>
      </section>

      <footer>
        <p>Protection cannot quietly become control.</p>
        <span>Week 3 prototype · Emiliano Carballido</span>
      </footer>
    </main>
  );
}
