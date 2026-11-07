"use client";

import { useEffect, useRef, useState } from "react";
import { submitForm } from "@/lib/forms";
import type { SectionProps } from "@/lib/cms/types";

type FaqItem = { q: string; body: { h: string; text: string }[] };
type FaqContent = { eyebrow: string; heading: string; items: FaqItem[] };
type CoverageData = { departure: string; returnDate: string; destination: string; travelers: string; email: string };

function ProtectionIcon({ kind }: { kind: string }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "calendar" && <><rect x="5" y="7" width="22" height="21" rx="3"/><path d="M10 4v6m12-6v6M5 14h22m-16 7 3 3 7-7"/></>}
    {kind === "heart" && <><path d="M16 27S3 19 3 11a7 7 0 0 1 13-3 7 7 0 0 1 13 3c0 8-13 16-13 16Z"/><path d="M5 16h6l3-6 4 12 3-6h6"/></>}
    {kind === "bag" && <><rect x="5" y="10" width="22" height="18" rx="3"/><path d="M11 10V5h10v5M10 10v18m12-18v18"/></>}
    {kind === "changes" && <><path d="M26 12a11 11 0 0 0-19-4L3 12m0-7v7h7M6 20a11 11 0 0 0 19 4l4-4m0 7v-7h-7"/></>}
  </svg>;
}

function CoveragePanel() {
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [textSize, setTextSize] = useState(1);
  const [data, setData] = useState<CoverageData>({ departure: "", returnDate: "", destination: "", travelers: "1", email: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const exploreRef = useRef<HTMLButtonElement>(null);
  const expandRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (showForm && !expanded) headingRef.current?.focus();
  }, [showForm, expanded]);

  useEffect(() => {
    if (!expanded) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; };
  }, [expanded]);

  function collapse() {
    setExpanded(false);
    requestAnimationFrame(() => expandRef.current?.focus());
  }
  function closeForm() {
    setExpanded(false);
    setShowForm(false);
    requestAnimationFrame(() => exploreRef.current?.focus());
  }
  function openForm() {
    setShowForm(true);
    requestAnimationFrame(() => headingRef.current?.focus());
  }
  function update(key: keyof CoverageData, value: string) {
    setData(previous => ({ ...previous, [key]: value }));
    if (status !== "sending") setStatus("idle");
  }
  async function send(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const result = await submitForm("Travel protection inquiry", {
      email: data.email,
      departure: data.departure,
      returnDate: data.returnDate,
      destination: data.destination,
      travelers: data.travelers,
      message: "Please contact me about travel protection options for my voyage.",
    });
    if (result.ok) setStatus("success");
    else { setError(result.error); setStatus("error"); }
  }

  function formContent(isExpanded: boolean) {
    const prefix = isExpanded ? "coverage-large" : "coverage";
    return <div className="sail-form-view" style={{ fontSize: `${textSize}rem` }}>
      <div className="sail-form-tools" aria-label="Form display options">
        <button type="button" onClick={() => setTextSize(s => Math.max(1, +(s - .15).toFixed(2)))} disabled={textSize <= 1} aria-label="Decrease form text size">A−</button>
        <button type="button" onClick={() => setTextSize(s => Math.min(1.6, +(s + .15).toFixed(2)))} disabled={textSize >= 1.6} aria-label="Increase form text size">A+</button>
        <button ref={isExpanded ? undefined : expandRef} type="button" onClick={isExpanded ? collapse : () => setExpanded(true)} aria-label={isExpanded ? "Reduce form to panel" : "Expand form"}>{isExpanded ? "↙" : "⛶"}</button>
        <button type="button" onClick={closeForm} aria-label="Close coverage form">×</button>
      </div>
      <h3 ref={isExpanded ? undefined : headingRef} tabIndex={-1} id={`${prefix}-title`}>Travel Protection</h3>
      <p className="sail-protection-intro">Tell me about your voyage.</p>
      <form onSubmit={send}>
        <fieldset disabled={status === "sending"}>
          <legend className="sail-visually-hidden">Your travel protection inquiry</legend>
          <div className="sail-date-fields">
            <label htmlFor={`${prefix}-departure`}>Departure<input id={`${prefix}-departure`} type="date" name="departure" value={data.departure} onChange={e => update("departure", e.target.value)} required /></label>
            <label htmlFor={`${prefix}-return`}>Return<input id={`${prefix}-return`} type="date" name="returnDate" min={data.departure || undefined} value={data.returnDate} onChange={e => update("returnDate", e.target.value)} required /></label>
          </div>
          <label htmlFor={`${prefix}-destination`}>Destination<input id={`${prefix}-destination`} name="destination" value={data.destination} onChange={e => update("destination", e.target.value)} required /></label>
          <label className="sail-travelers" htmlFor={`${prefix}-travelers`}>Number of travelers<select id={`${prefix}-travelers`} name="travelers" value={data.travelers} onChange={e => update("travelers", e.target.value)}>{Array.from({ length: 10 }, (_, i) => <option key={i + 1}>{i + 1}</option>)}<option value="11+">11+</option></select></label>
          <label htmlFor={`${prefix}-email`}>Email address<input id={`${prefix}-email`} name="email" type="email" autoComplete="email" value={data.email} onChange={e => update("email", e.target.value)} required /></label>
          <button className="sail-coverage" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request Coverage Options"}<span aria-hidden="true">›</span></button>
        </fieldset>
        {status === "success" && <p className="sail-result" role="status">Your request has been saved. Dean will follow up with available options.</p>}
        {status === "error" && <p className="sail-result is-error" role="alert">{error} You can also <a href="mailto:deanondeck1@gmail.com">email Dean</a> or <a href="https://wa.me/16178999774" target="_blank" rel="noopener noreferrer">message on WhatsApp</a>.</p>}
      </form>
      <button className="sail-back" type="button" onClick={closeForm}>Back to overview</button>
      <p className="sail-policy-note">Dean will follow up with available options.</p>
    </div>;
  }

  return <>
    <aside className="sail-protection" aria-label="Travel protection">
      {showForm ? (expanded ? <div className="sail-expanded-placeholder"><h3>Travel Protection</h3><p>Your form is open in a larger view.</p><button className="sail-back" type="button" onClick={collapse}>Return to panel</button></div> : formContent(false)) : <>
        <h3>Travel Protection</h3>
        <p className="sail-protection-intro">Consider protecting your voyage<br />and travel with greater peace of mind.</p>
        <ul>
          <li><ProtectionIcon kind="calendar"/><span>Trip cancellation &amp; interruption</span></li>
          <li><ProtectionIcon kind="heart"/><span>Emergency medical coverage<small>(includes pre-existing condition provisions)</small></span></li>
          <li><ProtectionIcon kind="bag"/><span>Travel delays &amp; lost baggage</span></li>
          <li><ProtectionIcon kind="changes"/><span>Protection for certain<br />unexpected changes</span></li>
        </ul>
        <button ref={exploreRef} className="sail-coverage" type="button" onClick={openForm}>Explore Coverage Options <span aria-hidden="true">›</span></button>
        <p className="sail-policy-note">Coverage and eligibility depend on the policy selected.</p>
      </>}
    </aside>
    {expanded && <dialog className="sail-dialog" ref={dialogRef} aria-labelledby="coverage-large-title" onCancel={e => { e.preventDefault(); collapse(); }}>{formContent(true)}</dialog>}
  </>;
}

export default function Faq({ id, content }: SectionProps) {
  const c = content as FaqContent;
  return <section className="band band--shell" id="faq" data-cms-id={id}>
    <div className="wrap">
      <div className="sec-head center">
        <h2 className="display h-lg" data-cms-field="heading">{c.heading}</h2>
        <p className="sail-intro">Helpful answers, travel tips, and essential information to make your cruise smooth and stress-free.</p>
      </div>
      <div className="sail-columns">
        <div className="faq" data-cms-field="items">
          {c.items.map(f => <details key={f.q} name={`sail-faq-${id}`}>
            <summary>{f.q}</summary>
            <div className="faq-body">{f.body.map(b => <div key={b.h}><h4>{b.h}</h4><p>{b.text}</p></div>)}</div>
          </details>)}
        </div>
        <CoveragePanel />
      </div>
      <div className="sail-difference">
        <div className="sail-brand">
          <div className="sail-portrait"><img src="/img/dean-on-deck-master.jpg" alt="Dean’s original illustrated portrait" width="1536" height="1491" /></div>
          <div className="sail-brand-name">DEAN ON DECK</div>
          <div className="sail-brand-sub">CRUISE TRAVEL</div>
        </div>
        <div className="sail-difference-copy">
          <p className="sail-difference-label">The Dean On Deck Difference</p>
          <h3>Booking on Your Own Doesn’t Automatically Save You Money.</h3>
          <p>You work hard for your money. Booking directly through a cruise line’s website usually won’t give you a lower fare, extra perks, or a better overall value.</p>
          <p className="sail-penny"><strong>And my services won’t cost you one shiny penny extra.</strong></p>
        </div>
      </div>
    </div>
  </section>;
}
