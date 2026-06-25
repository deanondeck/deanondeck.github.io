"use client";

import { useEffect, useState } from "react";

/* ── Hero background video ──────────────────────────────────────────
   Cinematic, muted, looping YouTube clip behind the hero (no controls,
   no chrome) — the static night-ship photo stays as the instant poster
   and the reduced-motion fallback.

   TODO(Dean): paste your own clip here. Accepts a full YouTube URL OR a
   bare 11-char video ID — swapping it is this one line. Until then this
   is a Virgin Voyages adults-only placeholder.                          */
const HERO_VIDEO = "e6VxAdd7-iQ";

function ytId(input: string) {
  const m = input.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : input.trim();
}

function heroEmbedSrc(idOrUrl: string) {
  const id = ytId(idOrUrl);
  const p = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    loop: "1",
    playlist: id, // loop=1 needs the id echoed here
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    showinfo: "0",
    disablekb: "1",
    fs: "0",
    iv_load_policy: "3",
    cc_load_policy: "0",
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${p.toString()}`;
}

const NAV = [
  ["The Difference", "#difference"],
  ["Adults Only", "#adults"],
  ["Ports", "#ports"],
  ["RockStar", "#rockstar"],
  ["Reviews", "#reviews"],
];

const TICKER = [
  "No booking fees",
  "Sailor Loot included",
  "Priority boarding",
  "Gold-certified first mate",
  "Adults only · 18+",
  "5-star sailor reviews",
];

const SHOWCASE = [
  { img: "ship-beach", tag: "18+ only", t: "Adults-Only Voyages", d: "Every sailor is 18 or over. No exceptions — just pure grown-up freedom, bow to stern." },
  { img: "dining", tag: "Included", t: "Michelin-Inspired Dining", d: "20+ included restaurants, zero buffets, and not a single tray in sight." },
  { img: "spa", tag: "The Spa", t: "Wellness & Spa", d: "Thermal suites, fitness, and treatments tuned to long days at sea." },
  { img: "suite", tag: "RockStar", t: "Suites With a View", d: "VIP from the terminal on — private decks, a personal agent, the works." },
  { img: "balcony", tag: "Sea days", t: "Sea Days, Your Way", d: "A private balcony, a hammock, and a cold drink as the coast rolls by." },
  { img: "breakfast", tag: "Mornings", t: "Wake Up at Sea", d: "Slow mornings, room service, and a horizon that changes every day." },
];

const PORTS = [
  { img: "port-caribbean", c: "Caribbean", t: "Sun & White Sand" },
  { img: "port-greece", c: "Greece & Croatia", t: "The Adriatic" },
  { img: "port-italy", c: "Italy & the Med", t: "Old-World Coast" },
  { img: "port-spain", c: "Spain", t: "Iberian Nights" },
  { img: "port-tropical", c: "Tropical Escapes", t: "Endless Summer" },
  { img: "port-halong", c: "Far Horizons", t: "On Request" },
];

const CORE = [
  "Richard's Rooftop — private sundeck, bar & nightly happy hour",
  "A dedicated RockStar Agent for dining, shows & requests",
  "Priority dining (120 days) & Shore Things (135 days)",
  "VIP boarding through a private entrance + priority off",
  "In-room bar — first round of full-size bottles on the house",
  "Private section at the Beach Club at Bimini",
];

const MEGA = [
  "Unlimited drinks up to $25 + two bottles of wine daily",
  "Bottomless in-room bar, replenished every day",
  "Unlimited Redemption Spa thermal access",
  "Private transfers within 50 miles, or port parking",
  "Daily laundry, ironing & express service",
  "Upgraded \"Work from Sea\" Wi-Fi",
];

const REVIEWS = [
  { q: "Dean is the absolute best. He spent hours making sure we got the exact suite I wanted. He genuinely cares — the only first mate we'll ever use.", who: "Hayley Preston", when: "Google Review" },
  { q: "He'll research every question you have and get fast results. Thanks Dean on Deck for making my trips stress-free and a fun vacation.", who: "Avid Reader", when: "Google Review" },
  { q: "The attention to detail and personalized experiences were top-notch. I felt pampered and adventurous. Highly recommend.", who: "Natalie", when: "Sailor" },
  { q: "Dean elevated our Virgin Voyages experience beyond expectations — from RockStar service to unique excursions, every detail tailored perfectly.", who: "Ethan", when: "Sailor" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

const img = (name: string, ext = "jpg") => `/img/${name}.${ext}`;

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  useReveal();

  // Mount the background video only after first paint, and never when the
  // sailor has asked for reduced motion — the poster photo carries the hero.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) setPlayVideo(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  return (
    <>
      {/* ---------------- NAV ---------------- */}
      <header className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#top" className="brand" aria-label="Dean on Deck — home">
            <img src={img("mark", "svg")} alt="Dean on Deck" />
            <span>
              <span className="brand-name">Dean on Deck</span>
              <span className="brand-sub" style={{ display: "block" }}>
                Cruise Travel
              </span>
            </span>
          </a>
          <nav>
            <ul className="nav-links">
              {NAV.map(([label, href]) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav-cta">
            <a href="#contact" className="btn btn-scarlet btn-desktop">
              Book a voyage
            </a>
          </div>
          <button
            className="nav-toggle"
            aria-label="Open menu"
            aria-expanded={menu}
            onClick={() => setMenu((m) => !m)}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {menu ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* mobile drawer */}
      <div className={`drawer${menu ? " open" : ""}`} role="dialog" aria-modal="true">
        {NAV.map(([label, href], i) => (
          <a key={href} href={href} onClick={() => setMenu(false)}>
            <span className="idx">{String(i + 1).padStart(2, "0")}</span>
            {label}
          </a>
        ))}
        <a href="#contact" onClick={() => setMenu(false)} className="scarlet">
          <span className="idx">→</span>Book a voyage
        </a>
      </div>

      <main id="top">
        {/* ---------------- HERO ---------------- */}
        <section className="hero">
          <div className="hero-media" aria-hidden="true">
            <img src={img("hero-ship-night")} alt="" />
          </div>
          {playVideo && (
            <div className={`hero-video${videoReady ? " ready" : ""}`} aria-hidden="true">
              <iframe
                src={heroEmbedSrc(HERO_VIDEO)}
                title="Virgin Voyages at sea"
                allow="autoplay; encrypted-media; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                tabIndex={-1}
                onLoad={() => window.setTimeout(() => setVideoReady(true), 600)}
              />
            </div>
          )}
          <div className="hero-scrim" aria-hidden="true" />
          <div className="hero-content wrap">
            <p className="log">Gold-Certified Virgin Voyages First Mate</p>
            <h1>
              Sail like a{" "}
              <em style={{ whiteSpace: "nowrap" }}>grown-up.</em>
            </h1>
            <p className="hero-sub">
              I&apos;m Dean — and I book one thing brilliantly: adults-only Virgin
              Voyages cruises. Michelin-grade dining, RockStar perks, zero booking
              fees. No kids. No stress. Just you and the horizon.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-scarlet">
                Book your voyage <span className="arrow">→</span>
              </a>
              <a href="#difference" className="btn btn-ghost">
                Why sail with Dean
              </a>
            </div>
            <div className="hero-meta">
              <span>
                Est. <b>Seattle</b>
              </span>
              <span>
                Sails <b>worldwide</b>
              </span>
              <span>
                <b>Virgin Voyages</b> only
              </span>
            </div>
          </div>
        </section>

        {/* ---------------- TICKER ---------------- */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
        </div>

        {/* ---------------- ABOUT DEAN ---------------- */}
        <section className="band band--shell" id="difference">
          <div className="wrap about-grid">
            <div className="about-photo reveal">
              <img src={img("dean")} alt="Dean Satterfield with fellow sailors" />
              <span className="stamp">Dean Satterfield · First Mate</span>
            </div>
            <div className="about-body">
              <p className="log">Your First Mate</p>
              <h2 className="display h-lg reveal">
                Ahoy — I&apos;m Dean.
              </h2>
              <div className="reveal d1">
                <p>
                  Better known as <b>Dean on Deck</b>. Whether you&apos;re sailing
                  solo or rallying the whole crew for a celebration, I make booking
                  your Virgin Voyages cruise effortless — start to gangway.
                </p>
                <p>
                  As a Gold-Certified Virgin Voyages First Mate, I&apos;ll handle the
                  details, unlock the perks, and point you to the best spots onboard.
                  You just show up and sail.
                </p>
                <p>
                  Ready to chase the horizon? Pure happiness, zero stress. Let&apos;s
                  do this.
                </p>
                <p className="sig">— Dean</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- ADULTS ONLY SHOWCASE ---------------- */}
        <section className="band band--ink" id="adults">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="log">Why Virgin Voyages</p>
              <h2 className="display h-lg">
                Every detail designed <em>for adults.</em>
              </h2>
              <p className="lede">
                No kids&apos; menus. No water slides. Just Michelin-inspired dining,
                world-class wellness, and sea days made entirely for the grown-up
                escape.
              </p>
            </div>
            <div className="showcase">
              {SHOWCASE.map((s, i) => (
                <article className={`card reveal d${(i % 3) + 1}`} key={s.t}>
                  <img src={img(s.img)} alt={s.t} />
                  <span className="card-num">{s.tag}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- WHY VIRGIN (split) ---------------- */}
        <section className="band band--ink2">
          <div className="wrap split">
            <div className="split-media reveal">
              <img src={img("virgin-scarlet-ship")} alt="The scarlet-hulled Virgin Voyages ship at sea" />
              <div className="badge-float">
                <div className="bt">Signature event</div>
                <div className="bm">Scarlet Night</div>
              </div>
            </div>
            <div>
              <p className="log">The Ship</p>
              <h2 className="display h-lg reveal">
                Virgin reinvented what cruising means.
              </h2>
              <p className="lede reveal d1" style={{ marginTop: "1.2rem" }}>
                Smaller ships. Bolder design. An energy that feels more boutique
                hotel than floating buffet — and absolutely no one under 18.
              </p>
              <ul className="checklist reveal d2">
                <li>Kid-free sailings with a genuinely sophisticated crowd</li>
                <li>Michelin-inspired dining included — no surcharges, no buffets</li>
                <li>Stylish, modern ships built by designers, not committees</li>
                <li>Premium entertainment and a real after-dark scene</li>
                <li>Wellness-forward: spa, fitness, and sea-air everything</li>
                <li>Caribbean, Mediterranean, and beyond</li>
              </ul>
              <a href="#contact" className="btn btn-scarlet reveal d3">
                Start planning <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ---------------- PORTS ---------------- */}
        <section className="band band--shell" id="ports">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="log">Ports of Call</p>
              <h2 className="display h-lg">
                Where shall we point <em>the bow?</em>
              </h2>
              <p className="lede">
                A few of the routes sailors love. Dreaming of Iceland, Alaska, or
                somewhere off the map? Just ask — I&apos;ll chart it.
              </p>
            </div>
          </div>
          <div className="board" aria-hidden="true">
            <div className="board-track">
              {[
                "Bahamas","San Juan","Bimini","Dubrovnik","Santorini","Mykonos",
                "Barcelona","Mallorca","Cannes","Key West","Costa Maya","Roatán",
                "Bahamas","San Juan","Bimini","Dubrovnik","Santorini","Mykonos",
                "Barcelona","Mallorca","Cannes","Key West","Costa Maya","Roatán",
              ].map((p, i) => (
                <span key={i}>{p}</span>
              ))}
            </div>
          </div>
          <div className="wrap">
            <div className="ports">
              {PORTS.map((p, i) => (
                <article className={`port reveal d${(i % 3) + 1}`} key={p.c}>
                  <img src={img(p.img)} alt={p.c} />
                  <span className="coord">{p.t}</span>
                  <h3>{p.c}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- ROCKSTAR ---------------- */}
        <section className="band band--ink" id="rockstar">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="log">Cruise Like a RockStar</p>
              <h2 className="display h-lg">
                RockStar perks, <em>handled.</em>
              </h2>
              <p className="lede">
                RockStar Quarters are Virgin&apos;s VIP experience — and it starts the
                moment you reach the terminal. I&apos;ll match you to the right tier
                and lock in the early booking windows.
              </p>
            </div>
            <div className="tiers">
              <div className="tier reveal d1">
                <span className="tier-tag">All suites</span>
                <h3>Core RockStar</h3>
                <ul>
                  {CORE.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div className="tier mega reveal d2">
                <span className="tier-tag">Top-tier suites</span>
                <h3>Mega RockStar</h3>
                <ul>
                  {MEGA.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- REVIEWS ---------------- */}
        <section className="band band--shell" id="reviews">
          <div className="wrap">
            <div className="sec-head center reveal">
              <p className="log log--center">From the Crew · Google Reviews</p>
              <h2 className="display h-lg">What sailors say.</h2>
            </div>
            <div className="reviews">
              {REVIEWS.map((r, i) => (
                <article className={`review reveal d${(i % 3) + 1}`} key={r.who}>
                  <span className="stars">★★★★★</span>
                  <p>“{r.q}”</p>
                  <span className="who">
                    <b>{r.who}</b> · {r.when}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- THE DEAN DIFFERENCE ---------------- */}
        <section className="band band--ink2">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="log">No Stress. Just Fun.</p>
              <h2 className="display h-lg">
                Your money. <em>Your vacation.</em>
              </h2>
              <p className="lede">
                No booking fees — ever. Where other agencies pile service charges on
                top of supplier rates, I work to land the best price and pass the
                savings straight to you. Most bookings come with extras like Sailor
                Loot and priority boarding. You work hard so you can play hard — I&apos;ll
                handle the rest.
              </p>
            </div>
            <div className="stats">
              <div className="stat reveal d1">
                <div className="num">$0</div>
                <div className="lab">Booking fees, always</div>
              </div>
              <div className="stat reveal d2">
                <div className="num">Loot</div>
                <div className="lab">Onboard credit on most sailings</div>
              </div>
              <div className="stat reveal d3">
                <div className="num">135<span style={{ fontSize: "1.4rem" }}>d</span></div>
                <div className="lab">Priority Shore Things access</div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- CONTACT ---------------- */}
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
                  <span>Existing MNVV booking? I can take it over.</span>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="foot">
        <div className="wrap">
          <div className="foot-top">
            <div>
              <div className="brand">
                <img src={img("mark", "svg")} alt="" style={{ width: 52, height: 52 }} />
                <span className="brand-name">Dean on Deck</span>
              </div>
              <p className="foot-tag">No kids. No stress. Just you.</p>
              <div className="foot-socials">
                <a href="https://instagram.com/dean__on__deck" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="#" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14v-1c0-.6.4-1 1-1z" />
                  </svg>
                </a>
                <a href="#" aria-label="TikTok">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 4c.3 2 1.6 3.4 3.5 3.6V10c-1.3 0-2.5-.4-3.5-1.1V15a5 5 0 11-5-5v2.6a2.4 2.4 0 102.4 2.4V4H16z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                {NAV.map(([label, href]) => (
                  <li key={href}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
                <li>
                  <a href="#contact">Book a voyage</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>The Boat</h4>
              <ul>
                <li>Adults-only · 18+</li>
                <li>Michelin-inspired dining</li>
                <li>RockStar suites</li>
                <li>Scarlet Night</li>
                <li>No booking fees</li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© {new Date().getFullYear()} Dean on Deck Cruise Travel</span>
            <span className="disc">
              Dean On Deck Cruise Travel was created by Dean Satterfield. The Virgin
              Voyages name, logo, and associated brand elements are trademarks of
              Virgin Enterprises Limited.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
