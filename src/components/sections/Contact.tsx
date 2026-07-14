"use client";

import { useState } from "react";
import { img } from "@/lib/media";
import { submitForm } from "@/lib/forms";
import { renderInline } from "@/lib/cms/markdown";
import type { SectionProps } from "@/lib/cms/types";

type Status = "idle" | "submitting" | "success" | "error";

type ContactLine = { k: string; label: string; href: string; external?: boolean };
type ContactContent = {
  eyebrow: string;
  heading: string;
  image: string;
  asideIntro: string;
  lines: ContactLine[];
};

export default function Contact({ content }: SectionProps) {
  const c = content as ContactContent;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setError("");

    const data = Object.fromEntries(new FormData(form).entries());
    const result = await submitForm("Contact form", data);

    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setError(result.error);
      setStatus("error");
    }
  }

  return (
    <section className="band contact" id="contact">
      <div className="contact-media">
        <img src={img(c.image)} alt="" />
      </div>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log">{c.eyebrow}</p>
          <h2 className="display h-lg">{renderInline(c.heading)}</h2>
        </div>
        <div className="contact-grid">
          <form className="form reveal d1" onSubmit={handleSubmit}>
            <div className="row">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required />
              </div>
            </div>
            <div className="row">
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" />
              </div>
              <div className="field">
                <label htmlFor="dest">Destination</label>
                <input id="dest" name="destination" type="text" placeholder="Caribbean, Greece…" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="msg">What&apos;s sparking your interest?</label>
              <textarea id="msg" name="message" placeholder="Tell me about the trip you're dreaming up…" />
            </div>
            <button type="submit" className="btn btn-scarlet" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Send Dean a message"}{" "}
              <span className="arrow">→</span>
            </button>

            {status === "success" && (
              <p className="form-status is-success" role="status" aria-live="polite">
                Thanks — your message is on its way to Dean. Expect a reply soon,
                usually the same day.
              </p>
            )}
            {status === "error" && (
              <p className="form-status is-error" role="alert" aria-live="assertive">
                {error}
              </p>
            )}
          </form>
          <aside className="contact-aside reveal d2">
            <p style={{ marginTop: 0 }}>{c.asideIntro}</p>
            {c.lines.map((line) => (
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
