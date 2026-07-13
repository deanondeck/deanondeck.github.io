import { GOOGLE_REVIEWS_URL } from "@/lib/site";
import { img } from "@/lib/media";

/* /about — the First Mate's letter. Dean's own words, verbatim, set as a
   personal note: script salutation in the hero, serif letter body on paper,
   and the 30-day transfer question raised as the letter's one gold flag
   (it routes to /manage, which exists exactly for that switch). */

/* Dean's own shots from the home Journal — proof he sails what he sells. */
const PROOF = [
  { img: "deck/sitka", alt: "Dean beside the carved eagle at the Sitka, Alaska welcome sign", cap: "Sitka, Alaska" },
  { img: "deck/scarlet-night", alt: "Dean in red light under the Scarlet Night neon sign on board", cap: "Scarlet Night" },
  { img: "deck/whale-watching", alt: "Dean dockside in front of the Swiftsure catamaran in Port Townsend", cap: "Port Townsend, WA" },
  { img: "deck/space-needle", alt: "Dean's selfie beneath the Space Needle against a clear blue sky", cap: "Seattle, WA" },
];

export default function AboutMe() {
  return (
    <>
      {/* ---- hero: the letter's opening line ---- */}
      <section className="band band--black about-hero" id="about-dean">
        <div className="wrap ah-grid">
          <div className="ah-body">
            <p className="log">About me · Your First Mate</p>
            <span className="script reveal">Ahoy, Sailor —</span>
            <h1 className="display h-xl reveal">
              I&apos;m Dean, a Sailor{" "}
              <em>just like you.</em>
            </h1>
            <p className="lede reveal d1">
              My Virgin experience honestly changed my life, and it&apos;s the
              reason I became a Travel Advisor (First Mate).
            </p>
          </div>
          <figure className="ah-photo reveal d2">
            <img
              src={img("deck/life-is-great")}
              alt="Dean waving from the pier with a Virgin Voyages ship towering behind him"
            />
            <span className="stamp">Dean Satterfield · Gold-Certified First Mate</span>
          </figure>
        </div>
      </section>

      {/* ---- the letter ---- */}
      <section className="band band--shell2">
        <div className="wrap">
          <div className="letter">
            <p className="reveal">
              If your current First Mate isn&apos;t quite meeting your needs, I
              would love the opportunity to earn your trust and your business.
            </p>

            <div className="letter-flag reveal">
              <h2>Did you book a voyage in the last 30 days?</h2>
              <p>
                If you haven&apos;t paid in full yet, I&apos;d be happy to run
                the numbers to see if adding me as your First Mate offers you a
                better advantage.
              </p>
              <a className="btn btn-ink" href="/manage">
                Run the numbers <span className="arrow">→</span>
              </a>
              <p className="fine">
                You keep your cabin, rate, and confirmation number — only the
                agency of record changes.
              </p>
            </div>

            <p className="reveal">
              Whether you are a seasoned sailor who prefers booking
              independently or a first-timer, I am here to help:
            </p>

            <div className="letter-duo">
              <div className="duo-card reveal">
                <span className="k">For the Pros</span>
                <p>
                  Let me handle the unexpected stress and phone calls so you
                  don&apos;t have to.
                </p>
              </div>
              <div className="duo-card reveal d1">
                <span className="k">For the First-Timers</span>
                <p>
                  I&apos;ll listen and guide you to an itinerary that creates
                  lifelong memories and new friends.
                </p>
              </div>
            </div>

            <p className="reveal">
              Not looking at Virgin Voyages right now? I also book with{" "}
              <a href="/cruises">other cruise lines</a>{" "}
              for your cruising adventures!
            </p>

            <p className="reveal">
              Thank you for considering me and for suggesting my services to
              your fellow sailors. Let&apos;s set sail! ⚓
            </p>

            <p className="sig reveal">— Dean</p>
            <p className="letter-role">
              Dean Satterfield · Gold-Certified Virgin Voyages First Mate
            </p>
          </div>
        </div>
      </section>

      {/* ---- proof: his own deck, not a stock library ---- */}
      <section className="band band--ink">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="log">The receipts</p>
            <h2 className="display h-lg">
              I sail the ships{" "}
              <em>I sell.</em>
            </h2>
            <p className="lede">
              Every photo on this site is from my own sailings. When I
              recommend a ship, a cabin, or a Shore Thing, it&apos;s because
              I&apos;ve stood there — camera in hand.
            </p>
          </div>
          <div className="proof-strip">
            {PROOF.map((p, i) => (
              <figure key={p.img} className={`reveal d${i + 1}`}>
                <img src={img(p.img)} alt={p.alt} loading="lazy" />
                <figcaption>{p.cap}</figcaption>
              </figure>
            ))}
          </div>
          <div className="proof reveal">
            <span className="proof-num">5.0</span>
            <span className="stars" aria-label="Rated 5 out of 5 stars">
              ★★★★★
            </span>
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
              Read the Google reviews
            </a>
          </div>
        </div>
      </section>

      {/* ---- closing CTA (shared closing-band styles from /cruises) ---- */}
      <section className="band band--black cl-cta">
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="log log--center">Ready when you are</p>
            <h2 className="display h-lg">
              Let&apos;s find{" "}
              <em>your voyage.</em>
            </h2>
            <p className="lede">
              Call or text with a question, or send me your trip and I&apos;ll
              come back with real numbers — usually the same day.
            </p>
            <div className="cl-cta-actions">
              <a className="btn btn-scarlet" href="tel:+16178999774">
                Call (617) 899-9774
              </a>
              <a className="btn btn-ghost" href="/plan">
                Start planning <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
