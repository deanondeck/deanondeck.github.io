"use client";

import { useState } from "react";
import { img } from "@/lib/media";
import { submitForm } from "@/lib/forms";
import { renderInline } from "@/lib/cms/markdown";
import type { SectionProps } from "@/lib/cms/types";

type Step = { n: string; t: string; d: string };
type AsideLine = { k: string; label: string; href: string; external?: boolean };
type ManageContent = {
  eyebrow: string;
  heading: string;
  lede: string;
  image: string;
  checkboxLabel: string;
  steps: Step[];
  aside: { log: string; note: string; lines: AsideLine[] };
};

type Status = "idle" | "submitting" | "success" | "error";

export default function ManageBooking({ content }: SectionProps) {
  const c = content as ManageContent;
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
        <img src={img(c.image)} alt="" />
      </div>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log">{c.eyebrow}</p>
          <h2 className="display h-lg">{renderInline(c.heading)}</h2>
          <p className="lede">{c.lede}</p>
        </div>

        <div className="manage-grid">
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
              <span>{renderInline(c.checkboxLabel)}</span>
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
            <p className="log">{c.aside.log}</p>
            <ol className="steps">
              {c.steps.map((s) => (
                <li key={s.n}>
                  <span className="step-n">{s.n}</span>
                  <span>
                    <strong>{s.t}</strong>
                    {s.d}
                  </span>
                </li>
              ))}
            </ol>
            <p className="manage-note">{c.aside.note}</p>
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
