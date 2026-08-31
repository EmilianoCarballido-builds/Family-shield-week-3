"use client";

import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CircleAlert,
  LockKeyhole,
  PhoneCall,
  RefreshCcw,
  ShieldCheck,
  UserRoundCheck,
  X,
} from "lucide-react";

import { TransferIntake } from "@/components/transfer-intake";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { AnalysisResponse } from "@/lib/pressure-analysis";
import {
  createContactRequest,
  outcomeCopy,
  requiresProtocolOnly,
  type ContactOutcome,
} from "@/lib/verification-policy";

const steps = ["Review", "Verify", "Decide"];
const CONTACT_REQUEST = createContactRequest();

type Stage = "review" | "request" | "contact" | "outcome" | "final";
type OwnerDecision = "cancelled" | "continued";

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

export function VerificationFlow() {
  const [stage, setStage] = useState<Stage>("review");
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [contactChoice, setContactChoice] = useState<ContactOutcome | "">("");
  const [contactOutcome, setContactOutcome] = useState<ContactOutcome | null>(null);
  const [ownerDecision, setOwnerDecision] = useState<OwnerDecision | null>(null);
  const [demoKey, setDemoKey] = useState(0);

  function recordContactOutcome(outcome: ContactOutcome) {
    setContactOutcome(outcome);
    setStage("outcome");
  }

  function submitContactResponse() {
    if (contactChoice) {
      recordContactOutcome(contactChoice);
    }
  }

  function decide(decision: OwnerDecision) {
    setOwnerDecision(decision);
    setStage("final");
  }

  function resetDemo() {
    setStage("review");
    setAnalysis(null);
    setContactChoice("");
    setContactOutcome(null);
    setOwnerDecision(null);
    setDemoKey((current) => current + 1);
  }

  if (stage === "review") {
    return (
      <article className="workflow-card workflow-card-primary" aria-labelledby="review-title">
        <div className="screen-topline">
          <span>Elena&apos;s view · Step 1 of 3</span>
          <span className="mode-label">AI review available</span>
        </div>
        <StepRail active={1} />

        <div className="screen-icon screen-icon-teal" aria-hidden="true"><ShieldCheck /></div>
        <p className="eyebrow">Family Shield review</p>
        <h2 id="review-title">Review this urgent transfer</h2>
        <p className="screen-lede">A short pause gives Elena time to verify the emergency independently.</p>

        <div className="transfer-card" aria-label="Fictional transfer details">
          <div><span>New recipient</span><strong>Luis M.</strong></div>
          <div className="transfer-amount"><span>Amount</span><strong>$8,500 MXN</strong></div>
        </div>

        <TransferIntake key={demoKey} onAnalysisChange={setAnalysis} />

        <div className="screen-actions horizontal-actions">
          <Button className="primary-action" size="lg" disabled={!analysis} onClick={() => setStage("request")}>
            <UserRoundCheck aria-hidden="true" /> Verify with Mariana
          </Button>
          <Button className="secondary-action" variant="outline" size="lg" onClick={() => decide("cancelled")}>
            <X aria-hidden="true" /> Cancel fictional transfer
          </Button>
        </div>
        {!analysis ? <p className="certainty-note">Review the pressure cues to enable independent verification.</p> : null}
        <p className="certainty-note">Only Elena, the fictional account owner, makes the final decision.</p>
      </article>
    );
  }

  if (stage === "request") {
    return (
      <article className="workflow-card" aria-labelledby="request-title">
        <div className="screen-topline">
          <span>Elena&apos;s view · Step 2 of 3</span>
          <span className="privacy-label"><LockKeyhole /> Minimum information</span>
        </div>
        <StepRail active={2} />
        <div className="screen-icon screen-icon-navy" aria-hidden="true"><UserRoundCheck /></div>
        <p className="eyebrow">Independent check</p>
        <h2 id="request-title">Ask Mariana through a separate channel</h2>
        <p className="screen-lede">This simulated request is separate from the original message and shares only the emergency claim.</p>

        <div className="contact-card">
          <span className="avatar" aria-hidden="true">MC</span>
          <div><small>Preselected trusted contact</small><strong>{CONTACT_REQUEST.contactAlias}</strong><span>Daughter · fictional demo</span></div>
          <BadgeCheck aria-label="Preselected contact" />
        </div>

        <section className="claim-preview" aria-labelledby="shared-claim-title">
          <span id="shared-claim-title">The only claim Mariana receives</span>
          <blockquote>“{CONTACT_REQUEST.claim}”</blockquote>
        </section>

        <div className="privacy-card">
          <LockKeyhole aria-hidden="true" />
          <div>
            <strong>Financial information stays with Elena</strong>
            <p>Mariana receives no amount, balance, account, recipient details, audio, transcript, or payment control.</p>
          </div>
        </div>

        <div className="screen-actions compact-actions">
          <Button className="primary-action" size="lg" onClick={() => setStage("contact")}>
            Send simulated request <ArrowRight aria-hidden="true" />
          </Button>
          <Button className="secondary-action" variant="outline" size="lg" onClick={() => recordContactOutcome("no_response")}>
            No response — use Protocol Only
          </Button>
        </div>
      </article>
    );
  }

  if (stage === "contact") {
    return (
      <article className="workflow-card contact-view" aria-labelledby="contact-title">
        <div className="screen-topline">
          <span>Mariana&apos;s view · Independent channel</span>
          <span className="privacy-label"><LockKeyhole /> No financial data</span>
        </div>
        <div className="role-switch-notice">
          <UserRoundCheck aria-hidden="true" />
          <p>You are now viewing the fictional contact screen. Mariana can report what she knows, but cannot control Elena&apos;s payment.</p>
        </div>
        <div className="screen-icon screen-icon-navy" aria-hidden="true"><UserRoundCheck /></div>
        <p className="eyebrow">Family check for Elena</p>
        <h2 id="contact-title">Can you confirm this claim?</h2>
        <blockquote className="contact-claim">“Luis had an accident today.”</blockquote>
        <p className="screen-lede">Choose only what you personally know. This response will not approve, cancel, or change a payment.</p>

        <RadioGroup className="contact-options" value={contactChoice} onValueChange={(value) => setContactChoice(value as ContactOutcome)} aria-label="Contact verification response">
          <label>
            <RadioGroupItem value="confirmed" />
            <span><strong>I can confirm the claimed emergency</strong><small>I independently know that this happened.</small></span>
          </label>
          <label>
            <RadioGroupItem value="cannot_confirm" />
            <span><strong>I cannot confirm it</strong><small>I checked, and I cannot verify the claim.</small></span>
          </label>
          <label>
            <RadioGroupItem value="not_sure" />
            <span><strong>I am not sure</strong><small>I do not have enough information.</small></span>
          </label>
        </RadioGroup>

        <div className="screen-actions compact-actions">
          <Button className="primary-action" size="lg" disabled={!contactChoice} onClick={submitContactResponse}>
            Send response to Elena <ArrowRight aria-hidden="true" />
          </Button>
          <Button className="secondary-action light-outline" variant="outline" size="lg" onClick={() => recordContactOutcome("no_response")}>
            Simulate no response
          </Button>
        </div>
      </article>
    );
  }

  if (stage === "outcome" && contactOutcome) {
    const copy = outcomeCopy[contactOutcome];
    const protocolRequired = requiresProtocolOnly(contactOutcome);
    return (
      <article className="workflow-card" aria-labelledby="outcome-title">
        <div className="screen-topline">
          <span>Elena&apos;s view · Step 3 of 3</span>
          <span className="owner-label">Only Elena decides</span>
        </div>
        <StepRail active={3} />
        <div className="screen-icon screen-icon-amber" aria-hidden="true"><CircleAlert /></div>
        <p className="eyebrow">Verification status</p>
        <h2 id="outcome-title">{copy.title}</h2>
        <p className="screen-lede">{copy.detail}</p>

        <div className="status-card">
          <span className="status-mark" aria-hidden="true">?</span>
          <div><strong>{protocolRequired ? "Unresolved — not a verdict" : "Claim confirmed — not a safety guarantee"}</strong><p>Family Shield does not approve, reject, or determine the truth of this fictional transfer.</p></div>
        </div>

        {protocolRequired ? (
          <div className="protocol-card">
            <span>Protocol Only</span>
            <ul>
              <li><PhoneCall aria-hidden="true" /> Call a number Elena already knows</li>
              <li><ShieldCheck aria-hidden="true" /> Ask for the family safety code</li>
              <li><Building2 aria-hidden="true" /> Contact the bank through its official channel</li>
            </ul>
          </div>
        ) : null}

        <section className="owner-decision" aria-labelledby="owner-decision-title">
          <h3 id="owner-decision-title">Elena makes the final decision</h3>
          <p>Mariana and the system cannot take either action.</p>
          <div className="screen-actions horizontal-actions">
            <Button className="cancel-action" size="lg" onClick={() => decide("cancelled")}>Cancel transfer</Button>
            <Button className="secondary-action" variant="outline" size="lg" onClick={() => decide("continued")}>Continue anyway</Button>
          </div>
        </section>
      </article>
    );
  }

  return (
    <article className="workflow-card final-card" aria-labelledby="final-title">
      <div className="screen-topline"><span>Fictional demo complete</span><span className="owner-label">Owner decision recorded</span></div>
      <div className="screen-icon screen-icon-navy" aria-hidden="true"><ShieldCheck /></div>
      <p className="eyebrow">Elena remained in control</p>
      <h2 id="final-title">{ownerDecision === "cancelled" ? "Elena cancelled the fictional transfer" : "Elena chose to continue the fictional transfer"}</h2>
      <p className="screen-lede">
        {ownerDecision === "cancelled"
          ? "No money moved. The temporary pause ended with Elena's decision."
          : "Family Shield did not approve or guarantee the transfer; it only organized a verification pause before Elena decided."}
      </p>
      <div className="final-boundary"><LockKeyhole aria-hidden="true" /><p>No transcript, response, contact detail, or decision is saved. Refreshing or restarting clears the demo.</p></div>
      <Button className="primary-action restart-button" size="lg" onClick={resetDemo}><RefreshCcw aria-hidden="true" /> Start fictional demo again</Button>
    </article>
  );
}
