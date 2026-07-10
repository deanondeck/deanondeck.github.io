"use client";

import { useState } from "react";
import { img } from "@/lib/media";
import { submitForm } from "@/lib/forms";

/* Trip-intake form — the on-site replacement for the old "2026 Dean on Deck
   Travel Contact Information" Google Form. Same questions, same admin inbox
   as every other form (`submitForm`), redesigned as a ship's manifest. */

const CABINS: [string, string, string][] = [
  // [value, tag, description]
  ["Insider Cabin", "The base", "The most affordable way aboard — a smart, modern room without a window."],
  ["Sea View Room", "Porthole", "A comfy cabin with an ocean view and a window seat made for gazing."],
  ["Sea Terrace", "The balcony", "The signature Virgin cabin — private balcony, rainshower, and the famous red hammock."],
  ["RockStar Quarters", "The suite", "Tom Dixon–designed suites with a stocked bar, marble bathroom, and Richard's Rooftop access."],
];

const FARES: [string, string, string][] = [
  ["Base Fare", "Lock it in", "Lowest price, non-refundable. Basic Wi-Fi and dining reservations 15 days out — for confident planners."],
  ["Essential Fare", "The standard", "Virgin's classic inclusive model. Date changes allowed, classic Wi-Fi, dining opens 45 days out."],
  ["Premium Fare", "Best perks", "Premium Wi-Fi for two devices, a $15 daily bar tab, and the earliest dining access at 60 days."],
  ["Not sure yet", "Ask Dean", "I'll walk you through the tiers and match one to how you actually travel."],
];

const GRATUITIES: [string, string, string][] = [
  ["Prepay", "$20 / sailor / night", "Save $2 a night, cover every crew member up front, and step off with no surprises on the final bill."],
  ["Pay on board", "$22 / sailor / night", "Settle gratuities on the ship instead."],
];

type Status = "idle" | "submitting" | "success" | "error";

export default function PlanVoyage() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // At least one cabin — HTML `required` can't express this for a group.
    if (fd.getAll("cabin").length === 0) {
      setError("Pick at least one cabin style so I can price the right rooms.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError("");

    // Object.fromEntries would keep only the last checked cabin — collapse
    // repeated keys (the cabin checkboxes) into one "; "-joined value instead.
    const data: Record<string, FormDataEntryValue> = {};
    for (const key of new Set(fd.keys())) {
      const values = fd.getAll(key);
      data[key] = values.length > 1 ? values.join("; ") : values[0];
    }

    const result = await submitForm("Plan a voyage", data);

    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setError(result.error);
      setStatus("error");
    }
  }

  return (
    <section className="band band--ink plan" id="plan">
      <div className="plan-media">
        <img src={img("port-sail")} alt="" />
      </div>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log">Ahoy, Sailor</p>
          <h2 className="display h-lg">
            Chart <em>your course.</em>
          </h2>
          <p className="lede">
            Tell me who&apos;s sailing, where you&apos;re dreaming of, and how
            you like to travel. I&apos;ll come back with a plan, pricing, and
            every perk you&apos;re owed — usually the same day.
          </p>
        </div>

        <div className="plan-grid">
          <form className="form reveal d1" onSubmit={handleSubmit}>
            <fieldset className="leg">
              <legend className="leg-title">
                <span className="leg-n">01</span> The sailors
              </legend>
              <div className="field">
                <label htmlFor="p-fullname">Full name(s), as on passport</label>
                <input
                  id="p-fullname"
                  name="fullname"
                  type="text"
                  autoComplete="name"
                  placeholder="Include your travel partner if known"
                  required
                />
              </div>
              <div className="row">
                <div className="field">
                  <label htmlFor="p-phone">Phone</label>
                  <input id="p-phone" name="phone" type="tel" autoComplete="tel" required />
                </div>
                <div className="field">
                  <label htmlFor="p-email">Email</label>
                  <input id="p-email" name="email" type="email" autoComplete="email" required />
                </div>
              </div>
            </fieldset>

            <fieldset className="leg">
              <legend className="leg-title">
                <span className="leg-n">02</span> The sailing
              </legend>
              <div className="field">
                <label htmlFor="p-sailing">
                  Which itinerary caught your eye — and when?
                </label>
                <textarea
                  id="p-sailing"
                  name="sailing"
                  placeholder="Name of the sailing, destination, and rough dates — e.g. Fire &amp; Sunset Soirées, Miami to Bimini, June 2026"
                  required
                />
              </div>
            </fieldset>

            <fieldset className="leg">
              <legend className="leg-title">
                <span className="leg-n">03</span> The cabin
              </legend>
              <p className="leg-note">Pick every style you&apos;d consider.</p>
              <div className="choices">
                {CABINS.map(([value, tag, desc]) => (
                  <label className="choice" key={value}>
                    <input type="checkbox" name="cabin" value={value} />
                    <span className="choice-body">
                      <span className="choice-head">
                        <strong>{value}</strong>
                        <span className="choice-tag">{tag}</span>
                      </span>
                      <span className="choice-desc">{desc}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="leg">
              <legend className="leg-title">
                <span className="leg-n">04</span> The fare
              </legend>
              <p className="leg-note">
                Virgin&apos;s VoyageFair Choices — three tiers for Sea Terrace
                cabins and below. RockStar Quarters skip this entirely.
              </p>
              <div className="choices">
                {FARES.map(([value, tag, desc]) => (
                  <label className="choice" key={value}>
                    <input type="radio" name="fare" value={value} required />
                    <span className="choice-body">
                      <span className="choice-head">
                        <strong>{value}</strong>
                        <span className="choice-tag">{tag}</span>
                      </span>
                      <span className="choice-desc">{desc}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="leg">
              <legend className="leg-title">
                <span className="leg-n">05</span> Gratuities
              </legend>
              <p className="leg-note">
                Since October 2025 gratuities are a separate, mandatory charge —
                prepaying is cheaper and covers all service staff.
              </p>
              <div className="choices">
                {GRATUITIES.map(([value, tag, desc]) => (
                  <label className="choice" key={value}>
                    <input type="radio" name="gratuities" value={value} required />
                    <span className="choice-body">
                      <span className="choice-head">
                        <strong>{value}</strong>
                        <span className="choice-tag">{tag}</span>
                      </span>
                      <span className="choice-desc">{desc}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="leg">
              <legend className="leg-title">
                <span className="leg-n">06</span> The details
              </legend>
              <div className="field">
                <label htmlFor="p-extras">
                  Anything else to plan around? (optional)
                </label>
                <textarea
                  id="p-extras"
                  name="extras"
                  placeholder="Celebrations, flights or hotels to line up, accessibility needs, travel insurance questions…"
                />
              </div>
              <div className="field">
                <label htmlFor="p-other">
                  Interested in a cruise line other than Virgin? (optional)
                </label>
                <input
                  id="p-other"
                  name="other_cruise"
                  type="text"
                  placeholder="A trusted colleague of mine handles those — just say the word"
                />
              </div>
            </fieldset>

            <button type="submit" className="btn btn-scarlet" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Send my trip details"}{" "}
              <span className="arrow">→</span>
            </button>

            {status === "success" && (
              <p className="form-status is-success" role="status" aria-live="polite">
                Anchors aweigh — your details are in. I&apos;ll be back with a
                plan and pricing, usually the same day.
              </p>
            )}
            {status === "error" && (
              <p className="form-status is-error" role="alert" aria-live="assertive">
                {error}
              </p>
            )}
          </form>

          <aside className="plan-aside reveal d2">
            <p className="log">Good to know</p>
            <ul className="plan-notes">
              <li>
                <strong>Adults only. Absolutely.</strong> No kids, no chaos —
                just poolside cocktails, late-night shows, and lie-ins that
                last as long as you like.
              </li>
              <li>
                <strong>Travel insurance is smart.</strong> I recommend it in
                case the unforeseeable happens — ask me when we speak.
              </li>
              <li>
                <strong>No booking fees, ever.</strong>{" "}
                Same fare as booking direct, plus Sailor Loot and perks
                you&apos;d otherwise miss.
              </li>
            </ul>
            <p className="plan-note">
              Prefer to talk it through first? Text or call and we&apos;ll
              chart it live.
            </p>
            <div className="line">
              <span className="k">Call / Text</span>
              <a href="tel:+16178999774">(617) 899-9774</a>
            </div>
            <div className="line">
              <span className="k">Email</span>
              <a href="mailto:dean@deanondeck.com">dean@deanondeck.com</a>
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
