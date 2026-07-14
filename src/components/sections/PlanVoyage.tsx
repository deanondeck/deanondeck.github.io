"use client";

import { useState } from "react";
import { img } from "@/lib/media";
import { submitForm } from "@/lib/forms";
import { renderInline } from "@/lib/cms/markdown";
import type { SectionProps } from "@/lib/cms/types";

/* Trip-intake form — the on-site replacement for the old "2026 Dean on Deck
   Travel Contact Information" Google Form. Same questions, same admin inbox as
   every other form (`submitForm`), redesigned as a ship's manifest. The form
   fields are fixed; marketing copy and the cabin/fare/gratuity choices are
   CMS-editable. */

type Choice = { value: string; tag: string; desc: string };
type AsideNote = { strong: string; text: string };
type AsideLine = { k: string; label: string; href: string; external?: boolean };
type PlanContent = {
  eyebrow: string;
  heading: string;
  lede: string;
  image: string;
  cabins: Choice[];
  fares: Choice[];
  gratuities: Choice[];
  aside: {
    log: string;
    notes: AsideNote[];
    note: string;
    lines: AsideLine[];
  };
};

type Status = "idle" | "submitting" | "success" | "error";

export default function PlanVoyage({ content }: SectionProps) {
  const c = content as PlanContent;
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
        <img src={img(c.image)} alt="" />
      </div>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log">{c.eyebrow}</p>
          <h2 className="display h-lg">{renderInline(c.heading)}</h2>
          <p className="lede">{c.lede}</p>
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
                {c.cabins.map((choice) => (
                  <label className="choice" key={choice.value}>
                    <input type="checkbox" name="cabin" value={choice.value} />
                    <span className="choice-body">
                      <span className="choice-head">
                        <strong>{choice.value}</strong>
                        <span className="choice-tag">{choice.tag}</span>
                      </span>
                      <span className="choice-desc">{choice.desc}</span>
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
                {c.fares.map((choice) => (
                  <label className="choice" key={choice.value}>
                    <input type="radio" name="fare" value={choice.value} required />
                    <span className="choice-body">
                      <span className="choice-head">
                        <strong>{choice.value}</strong>
                        <span className="choice-tag">{choice.tag}</span>
                      </span>
                      <span className="choice-desc">{choice.desc}</span>
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
                {c.gratuities.map((choice) => (
                  <label className="choice" key={choice.value}>
                    <input type="radio" name="gratuities" value={choice.value} required />
                    <span className="choice-body">
                      <span className="choice-head">
                        <strong>{choice.value}</strong>
                        <span className="choice-tag">{choice.tag}</span>
                      </span>
                      <span className="choice-desc">{choice.desc}</span>
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
            <p className="log">{c.aside.log}</p>
            <ul className="plan-notes">
              {c.aside.notes.map((n) => (
                <li key={n.strong}>
                  <strong>{n.strong}</strong> {n.text}
                </li>
              ))}
            </ul>
            <p className="plan-note">{c.aside.note}</p>
            {c.aside.lines.map((line) => (
              <div className="line" key={line.k}>
                <span className="k">{line.k}</span>
                <a
                  href={line.href}
                  {...(line.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {line.label}
                </a>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
