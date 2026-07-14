"use client";

import { useEffect, useState } from "react";
import { heroEmbedSrc, img } from "@/lib/media";
import { renderInline } from "@/lib/cms/markdown";
import type { SectionProps } from "@/lib/cms/types";

/* ── Hero background video ──────────────────────────────────────────
   Cinematic, muted, looping YouTube clip behind the hero (no controls,
   no chrome) — the static night-ship photo stays as the instant poster
   and the reduced-motion fallback. Accepts a full YouTube URL OR a
   bare 11-char video ID — edit it in the CMS `video` field. */

type Cta = { label: string; href: string };
type HeroContent = {
  eyebrow: string;
  heading: string;
  script: string;
  sub: string;
  posterImg: string;
  video: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  metaItems: string[];
};

export default function Hero({ content, site }: SectionProps) {
  const c = content as HeroContent;
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
        <img src={img(c.posterImg)} alt="" />
      </div>
      {playVideo && (
        <div className={`hero-video${videoReady ? " ready" : ""}`} aria-hidden="true">
          <iframe
            src={heroEmbedSrc(c.video)}
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
        <p className="log">{c.eyebrow}</p>
        <h1>{c.heading}</h1>
        <p className="hero-script">{c.script}</p>
        <p className="hero-sub">{c.sub}</p>
        <div className="hero-actions">
          <a href={c.primaryCta.href} target="_blank" rel="noopener noreferrer" className="btn btn-light">
            {c.primaryCta.label} <span className="arrow">→</span>
          </a>
          <a href={c.secondaryCta.href} className="btn btn-ghost">
            {c.secondaryCta.label}
          </a>
        </div>
        <div className="hero-meta">
          {c.metaItems.map((item, i) => (
            <span key={i}>{renderInline(item)}</span>
          ))}
        </div>
      </div>
      <div className="hero-rail">
        <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a href={site.social.facebook} aria-label="Facebook">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14v-1c0-.6.4-1 1-1z" />
          </svg>
        </a>
        <a href={site.social.tiktok} aria-label="TikTok">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 4c.3 2 1.6 3.4 3.5 3.6V10c-1.3 0-2.5-.4-3.5-1.1V15a5 5 0 11-5-5v2.6a2.4 2.4 0 102.4 2.4V4H16z" />
          </svg>
        </a>
      </div>
      <div className="hero-scroll" aria-hidden="true">
        <span>Scroll</span>
      </div>
    </section>
  );
}
