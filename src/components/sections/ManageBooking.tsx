"use client";

import { useState } from "react";
import { img } from "@/lib/media";
import { submitForm } from "@/lib/forms";

const STEPS: [string, string, string][] = [
  ["01", "Send the details", "Drop your booking or MNVV voucher number below — that's all I need to find it."],
  ["02", "I request the transfer", "Virgin moves your reservation under me as your First Mate. Your price and itinerary don't change."],
  ["03", "Perks switched on", "Sailor Loot, priority windows, and hands-on planning kick in for a trip you've already started."],
];

type Status = "idle" | "submitting" | "success" | "error";

export default function ManageBooking() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setError("");

    const data = Object.fromEntries(new FormData(form).entries());
    const result = await submitForm("Manage existing booking / MNVV", data);

    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setError(result.error);
      setStatus("error");
    }
  }

  return (
    <section className="band band--ink manage" id="manage">
      <div className="manage-media">
        <img src={img("cta-sunset")} alt="" />
      </div>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log">Already booked?</p>
          <h2 className="display h-lg">
            Make me your <em>First Mate.</em>
          </h2>
          <p className="lede">
            Already holding a Virgin Voyages reservation or a My Next Virgin
            Voyage (MNVV) voucher? Hand it over — no rebooking, no fees, and your
            fare stays exactly the same. I&apos;ll take it from here and unlock
            the Sailor Loot and perks you should be getting.
          </p>
        </div>

        <div className="manage-grid">
          {/*
            NOTE FOR DEAN: wire this form to your inbox before launch — same as
            the main contact form. Set the `action` to your Formspree/Basin
            endpoint (https://formspree.io) and keep method="POST".
          */}
          <form className="form reveal d1" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="fullname">Full name (as on passport or ID)</label>
              <input id="fullname" name="fullname" type="text" autoComplete="name" required />
            </div>
            <div className="row">
              <div className="field">
                <label htmlFor="m-email">Email</label>
                <input id="m-email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="field">
                <label htmlFor="dob">Date of birth</label>
                <input id="dob" name="dob" type="date" required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="ref">Booking or MNVV voucher number</label>
              <input
                id="ref"
                name="reference"
                type="text"
                placeholder="e.g. 1234567 or MNVV code"
                required
              />
            </div>

            <label className="check">
              <input type="checkbox" name="assign_request" value="yes" required />
              <span>
                I request that <strong>Dean Satterfield (On Deck)</strong> be
                assigned as my First Mate / Travel Advisor for this booking.
              </span>
            </label>

            <div className="field">
              <label htmlFor="m-msg">Anything I should know? (optional)</label>
              <textarea
                id="m-msg"
                name="message"
                placeholder="Cabin requests, celebrations, questions…"
              />
            </div>

            <button type="submit" className="btn btn-scarlet" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Request the handover"}{" "}
              <span className="arrow">→</span>
            </button>

            {status === "success" && (
              <p className="form-status is-success" role="status" aria-live="polite">
                Got it — your handover request is in. I&apos;ll confirm the
                transfer with Virgin and be in touch shortly.
              </p>
            )}
            {status === "error" && (
              <p className="form-status is-error" role="alert" aria-live="assertive">
                {error}
              </p>
            )}
          </form>

          <aside className="manage-aside reveal d2">
            <p className="log">How it works</p>
            <ol className="steps">
              {STEPS.map(([n, t, d]) => (
                <li key={n}>
                  <span className="step-n">{n}</span>
                  <span>
                    <strong>{t}</strong>
                    {d}
                  </span>
                </li>
              ))}
            </ol>
            <p className="manage-note">
              Prefer to talk it through first? Reach me directly and I&apos;ll
              walk you through the transfer.
            </p>
            <div className="line">
              <span className="k">Call</span>
              {/* TODO: replace with Dean's real number */}
              <a href="tel:+10000000000">Tap to call Dean</a>
            </div>
            <div className="line">
              <span className="k">Instagram</span>
              <a
                href="https://instagram.com/dean__on__deck"
                target="_blank"
                rel="noopener noreferrer"
              >
                @dean__on__deck
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
