"use client";

import { useEffect, useState } from "react";
import { heroEmbedSrc, img } from "@/lib/media";

/* ── Hero background video ──────────────────────────────────────────
   Cinematic, muted, looping YouTube clip behind the hero (no controls,
   no chrome) — the static night-ship photo stays as the instant poster
   and the reduced-motion fallback.

   TODO(Dean): paste your own clip here. Accepts a full YouTube URL OR a
   bare 11-char video ID — swapping it is this one line. Until then this
   is a Virgin Voyages adults-only placeholder.                          */
const HERO_VIDEO = "e6VxAdd7-iQ";

export default function Hero() {
  const [playVideo, setPlayVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Mount the background video only after first paint, and never when the
  // sailor has asked for reduced motion — the poster photo carries the hero.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) setPlayVideo(true);
  }, []);

  return (
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
          <a href="https://www.virginvoyages.com/book/voyage-planner/find-a-voyage?cabins=1&currencyCode=USD&agentId=281761&agencyId=54480&bookingChannel=FMLINK" target="_blank" className="btn btn-scarlet">
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
  );
}
