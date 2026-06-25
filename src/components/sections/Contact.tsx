import { img } from "@/lib/media";

export default function Contact() {
  return (
    <section className="band contact" id="contact">
      <div className="contact-media">
        <img src={img("cta-sunset")} alt="" />
      </div>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log">Ready to Set Sail?</p>
          <h2 className="display h-lg">
            Let&apos;s plan <em>your voyage.</em>
          </h2>
        </div>
        <div className="contact-grid">
          {/*
            NOTE FOR DEAN: wire this form to your inbox before launch.
            Easiest path with a static site — set the `action` below to a
            Formspree/Basin endpoint (https://formspree.io) and keep method="POST".
            Then drop in your real phone/email in the aside on the right.
          */}
          <form
            className="form reveal d1"
            action="https://formspree.io/f/your-form-id"
            method="POST"
          >
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
            <button type="submit" className="btn btn-scarlet">
              Send Dean a message <span className="arrow">→</span>
            </button>
          </form>
          <aside className="contact-aside reveal d2">
            <p style={{ marginTop: 0 }}>
              Send me the destination that&apos;s sparking your interest and
              I&apos;ll be back in touch fast — usually same day.
            </p>
            <div className="line">
              <span className="k">Call</span>
              {/* TODO: replace with Dean's real number */}
              <a href="tel:+10000000000">Tap to call Dean</a>
            </div>
            <div className="line">
              <span className="k">Instagram</span>
              <a href="https://instagram.com/dean__on__deck" target="_blank" rel="noopener noreferrer">
                @dean__on__deck
              </a>
            </div>
            <div className="line">
              <span className="k">Manage</span>
              <a href="/manage">Existing MNVV booking? I can take it over →</a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
