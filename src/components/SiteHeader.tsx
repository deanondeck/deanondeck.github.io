"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/lib/content";
import { img } from "@/lib/media";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

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
    </>
  );
}
