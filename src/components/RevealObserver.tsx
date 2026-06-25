"use client";

import { useEffect } from "react";

/* Scroll-reveal: watches every `.reveal` element in the document and adds the
   `.in` class as it scrolls into view (CSS handles the transition). Renders
   nothing — it only wires up the observer, so it works regardless of which
   server component rendered the `.reveal` nodes. */
export default function RevealObserver() {
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

  return null;
}
