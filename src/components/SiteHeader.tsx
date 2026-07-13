"use client";

import { useEffect, useRef, useState } from "react";
import { CRUISE_LINES, NAV } from "@/lib/content";
import { img } from "@/lib/media";

/* Dropdown items: each line books out like the Virgin link; river cruising
   has no single line, so it routes to the trip-intake form instead. */
const bookHref = (book: string | null) => book ?? "/plan";

export default function SiteHeader({ subpage = false }: { subpage?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [book, setBook] = useState(false);
  const bookRef = useRef<HTMLDivElement>(null);

  // On sub-pages the in-page anchors live on the home route, so point them
  // back to "/#…". On the home page they stay as plain hashes.
  const home = subpage ? "/" : "#top";
  const to = (href: string) => (subpage ? `/${href}` : href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  // Close the book menu on outside click / Escape.
  useEffect(() => {
    if (!book) return;
    const onDown = (e: PointerEvent) => {
      if (!bookRef.current?.contains(e.target as Node)) setBook(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBook(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [book]);

  return (
    <>
      {/* ---------------- NAV ---------------- */}
      <header className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <a href={home} className="brand" aria-label="Dean on Deck — home">
            <img src={img("logo")} alt="Dean on Deck" />
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
                  <a href={to(href)}>{label}</a>
                </li>
              ))}
              <li>
                <a href="/cruises">Cruises</a>
              </li>
              <li>
                <a href="/plan">Plan a Voyage</a>
              </li>
              <li>
                <a href="/manage">Manage Booking</a>
              </li>
            </ul>
          </nav>
          <div className="nav-cta">
            <div className={`book${book ? " open" : ""}`} ref={bookRef}>
              <button
                type="button"
                className="btn btn-scarlet btn-desktop book-btn"
                aria-expanded={book}
                aria-haspopup="true"
                onClick={() => setBook((b) => !b)}
              >
                Book a voyage
                <svg className="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                  <path d="M5 9l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <ul className="book-menu" aria-label="Book a voyage — pick a cruise line">
                {CRUISE_LINES.map((l) => (
                  <li key={l.id}>
                    <a
                      href={bookHref(l.book)}
                      {...(l.book ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      onClick={() => setBook(false)}
                    >
                      {l.name}
                      {l.book && <span className="ext" aria-hidden="true">↗</span>}
                    </a>
                  </li>
                ))}
                <li className="all">
                  <a href="/cruises" onClick={() => setBook(false)}>
                    Compare every line
                  </a>
                </li>
              </ul>
            </div>
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
          <a key={href} href={to(href)} onClick={() => setMenu(false)}>
            <span className="idx">{String(i + 1).padStart(2, "0")}</span>
            {label}
          </a>
        ))}
        <a href="/cruises" onClick={() => setMenu(false)}>
          <span className="idx">{String(NAV.length + 1).padStart(2, "0")}</span>
          Cruises
        </a>
        <a href="/plan" onClick={() => setMenu(false)}>
          <span className="idx">{String(NAV.length + 2).padStart(2, "0")}</span>
          Plan a Voyage
        </a>
        <a href="/manage" onClick={() => setMenu(false)}>
          <span className="idx">{String(NAV.length + 3).padStart(2, "0")}</span>
          Manage Booking
        </a>
        <div className="drawer-book">
          <span className="bk">Book a voyage</span>
          {CRUISE_LINES.map((l) => (
            <a
              key={l.id}
              href={bookHref(l.book)}
              {...(l.book ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => setMenu(false)}
            >
              {l.name}
              {l.book && <span className="ext" aria-hidden="true"> ↗</span>}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
