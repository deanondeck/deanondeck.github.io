"use client";

import { useEffect, useState } from "react";
import { submitForm } from "@/lib/forms";
import { renderInline } from "@/lib/cms/markdown";
import type { SectionProps } from "@/lib/cms/types";

type PlanContent = {
  eyebrow: string;
  heading: string;
  lede: string;
  aside: {
    log: string;
    notes: { strong: string; text: string }[];
    note: string;
    lines: { k: string; label: string; href: string; external?: boolean }[];
  };
};

export default function PlanVoyage({ id, content, site }: SectionProps) {
  const c = content as PlanContent;
  const [line, setLine] = useState("");
  const [extras, setExtras] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const selected = query.get("line");
    if (query.get("interest") === "travel-with-dean") {
      setExtras("I’m interested in joining Dean on a future voyage. Please share upcoming sailing options.");
      setLine("Help me choose");
    }
    if (selected && site.cruiseLines.some((item) => item.name === selected)) {
      setLine(selected);
    }
  }, [site.cruiseLines]);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setError("");
    const result = await submitForm("Plan a voyage", Object.fromEntries(new FormData(form)));
    if (result.ok) {
      setStatus("success");
      form.reset();
      setLine("");
      setExtras("");
    } else {
      setError(result.error);
      setStatus("error");
    }
  }

  return (
    <section className="band band--ink plan" id="plan" data-cms-id={id}>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log" data-cms-field="eyebrow">{c.eyebrow}</p>
          <h1 className="display h-lg" data-cms-field="heading">{renderInline(c.heading)}</h1>
          <p className="lede" data-cms-field="lede">{c.lede}</p>
        </div>
        <div className="plan-grid">
          <form className="form reveal d1" onSubmit={handleSubmit}>
            <div className="row">
              <div className="field">
                <label htmlFor="p-name">Your name</label>
                <input id="p-name" name="fullname" autoComplete="name" required />
              </div>
              <div className="field">
                <label htmlFor="p-email">Email</label>
                <input id="p-email" name="email" type="email" autoComplete="email" required />
              </div>
            </div>
            <div className="row">
              <div className="field">
                <label htmlFor="p-phone">Phone — WhatsApp preferred</label>
                <input id="p-phone" name="phone" type="tel" autoComplete="tel" aria-describedby="p-phone-help" required />
                <small id="p-phone-help">Please include your country code.</small>
              </div>
              <div className="field">
                <label htmlFor="p-line">Cruise line</label>
                <select id="p-line" name="cruiseLine" value={line} onChange={(e) => setLine(e.target.value)} required>
                  <option value="">Choose a line</option>
                  {site.cruiseLines.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
                  <option value="Help me choose">Help me choose</option>
                </select>
              </div>
            </div>
            {line === "Virgin Voyages" && (
              <div className="field">
                <label htmlFor="p-experience">How would you like to sail?</label>
                <select id="p-experience" name="virginExperience" required defaultValue="">
                  <option value="">Choose your Virgin experience</option>
                  <option value="Mega RockStar">Mega RockStar</option>
                  <option value="RockStar">RockStar</option>
                  <option value="Non-RockStar">Non-RockStar</option>
                  <option value="Help me choose">Help me choose</option>
                </select>
                <small>A preference, not a reservation. Dean will confirm suite availability and pricing.</small>
              </div>
            )}
            {line === "Atlantis Events" && (
              <div className="atlantis-note">
                <strong>A quick note for Atlantis guests</strong>
                <p>Atlantis advised Dean that guests who booked directly within the past four years generally must continue booking directly. We’ll confirm eligibility before you book. When calling, request Dean Satterfield at On Deck Agency.</p>
                <div className="field">
                  <label htmlFor="p-atlantis">Have you booked directly with Atlantis within the last four years?</label>
                  <select id="p-atlantis" name="atlantisBookingHistory" required>
                    <option value="">Please choose</option><option>No</option><option>Yes</option><option>Not sure</option>
                  </select>
                </div>
              </div>
            )}
            <div className="field">
              <label htmlFor="p-sailing">Destination, dates or sailing you have in mind</label>
              <textarea id="p-sailing" name="sailing" placeholder="A Caribbean getaway, Alaska, the Mediterranean—or help me choose…" required />
            </div>
            <div className="field">
              <label htmlFor="p-extras">What would you like help with? (optional)</label>
              <textarea id="p-extras" name="extras" value={extras} onChange={(e) => setExtras(e.target.value)} placeholder="Cabin preferences, group size, a special occasion, or an existing booking question" />
            </div>
            <button type="submit" className="btn btn-scarlet" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Send Dean my cruise ideas"} <span className="arrow">→</span>
            </button>
            {status === "success" && <p className="form-status is-success" role="status">Your details have been received. Dean will be in touch.</p>}
            {status === "error" && <p className="form-status is-error" role="alert">{error} You can also call (617) 899-9774 or email deanondeck1@gmail.com.</p>}
          </form>
          <aside className="plan-aside reveal d2" data-cms-field="aside">
            <p className="log">{c.aside.log}</p>
            <ul className="plan-notes">{c.aside.notes.map((n) => <li key={n.strong}><strong>{n.strong}</strong> {n.text}</li>)}</ul>
            <p className="plan-note">{c.aside.note}</p>
            {c.aside.lines.map((item) => <div className="line" key={item.k}><span className="k">{item.k}</span><a href={item.href} {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{item.label}</a></div>)}
          </aside>
        </div>
      </div>
    </section>
  );
}
