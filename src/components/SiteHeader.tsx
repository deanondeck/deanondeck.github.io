"use client";

import { useEffect, useRef, useState } from "react";
import { img } from "@/lib/media";
import type { SiteConfig } from "@/lib/cms/types";

/* Dropdown items: each line books out like the Virgin link; river cruising
   has no single line, so it routes to the trip-intake form instead. */
const bookHref = (book: string | null) => book ?? "/plan";

export default function SiteHeader({
  subpage = false,
  site,
}: {
  subpage?: boolean;
  site: SiteConfig;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [book, setBook] = useState(false);
  const bookRef = useRef<HTMLDivElement>(null);

  const { brand, nav, cruiseLines } = site;

  // The brand link returns to the top of the home route from a sub-page,
  // or scrolls to the top anchor when already on the home page.
  const home = subpage ? "/" : "#top";

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
          <a href={home} className="brand" aria-label={`${brand.name} — home`}>
            <img src={img(brand.logo)} alt={brand.name} />
            <span>
              <span className="brand-name">{brand.name}</span>
              <span className="brand-sub" style={{ display: "block" }}>
                {brand.sub}
              </span>
            </span>
          </a>
          <nav>
            <ul className="nav-links">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
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
                {cruiseLines.map((l) => (
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
        {nav.map((n, i) => (
          <a key={n.href} href={n.href} onClick={() => setMenu(false)}>
            <span className="idx">{String(i + 1).padStart(2, "0")}</span>
            {n.drawerLabel ?? n.label}
          </a>
        ))}
        <div className="drawer-book">
          <span className="bk">Book a voyage</span>
          {cruiseLines.map((l) => (
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
