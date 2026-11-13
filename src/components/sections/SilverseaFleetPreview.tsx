"use client";

import { useEffect, useRef, useState } from "react";

const shipDetails: Record<string, { slug: string; guests: number }> = {
  "Silver Dawn": { slug: "silver-dawn", guests: 596 },
  "Silver Moon": { slug: "silver-moon", guests: 596 },
  "Silver Muse": { slug: "silver-muse", guests: 632 },
  "Silver Nova": { slug: "silver-nova", guests: 728 },
  "Silver Ray": { slug: "silver-ray", guests: 728 },
  "Silver Shadow": { slug: "silver-shadow", guests: 392 },
  "Silver Spirit": { slug: "silver-spirit", guests: 636 },
  "Silver Whisper": { slug: "silver-whisper", guests: 392 },
  "Silver Cloud": { slug: "silver-cloud", guests: 254 },
  "Silver Endeavour": { slug: "silver-endeavour", guests: 220 },
  "Silver Origin": { slug: "silver-origin", guests: 100 },
  "Silver Wind": { slug: "silver-wind", guests: 274 },
};

const officialShipImages: Record<string, string> = {
  "Silver Dawn": "https://cdn.sanity.io/images/rd0y3pad/production/f52c84c593994d05d38e1813082392f86434f67a-2500x1875.jpg?auto=format&fit=max&w=900&q=85",
  "Silver Moon": "https://cdn.sanity.io/images/rd0y3pad/production/89b54e229d9f3cba790d9bff6640ff7b691b52ff-10984x8240.jpg?auto=format&fit=max&w=900&q=85",
  "Silver Muse": "https://cdn.sanity.io/images/rd0y3pad/production/e1d3cfaae1dd49338da020e9717a919378cedfce-5436x3621.jpg?auto=format&fit=max&w=900&q=85",
  "Silver Nova": "https://cdn.sanity.io/images/rd0y3pad/production/5946a7b3eb1ac569f3603639c0962c97c1cd9230-4032x3024.jpg?auto=format&fit=max&w=900&q=85",
  "Silver Ray": "https://cdn.sanity.io/images/rd0y3pad/production/3429871fc3f45cc59f40be12faebf62ca56db6b4-4939x3550.jpg?auto=format&fit=max&w=900&q=85",
  "Silver Shadow": "https://cdn.sanity.io/images/rd0y3pad/production/324f579dae7f1b009fcc821917b9757f7c6a5497-4000x6000.jpg?auto=format&fit=max&w=900&q=85",
  "Silver Spirit": "https://cdn.sanity.io/images/rd0y3pad/production/d5b5f015583f56f197236edd660298eb881ef4e7-5787x4800.jpg?auto=format&fit=max&w=900&q=85",
  "Silver Whisper": "https://cdn.sanity.io/images/rd0y3pad/production/4c68f77fdc2ae184170f04dfa673c069f75cca07-5120x3834.jpg?auto=format&fit=max&w=900&q=85",
  "Silver Cloud": "https://cdn.sanity.io/images/rd0y3pad/production/b587766190d5df7c8acdb45f0efb134b09b8db7e-5464x3640.jpg?auto=format&fit=max&w=900&q=85",
  "Silver Endeavour": "https://cdn.sanity.io/images/rd0y3pad/production/0e8d0ab4130e59213745b82d840fa8892dd54c6f-3500x2475.jpg?auto=format&fit=max&w=900&q=85",
  "Silver Origin": "https://cdn.sanity.io/images/rd0y3pad/production/23100646256d6f1a72f6cef15b0de95d76ba9a6f-6647x4433.jpg?auto=format&fit=max&w=900&q=85",
  "Silver Wind": "https://cdn.sanity.io/images/rd0y3pad/production/46a858fc104bf38ac03e9b5936bab87c09430a1c-4524x2735.jpg?auto=format&fit=max&w=900&q=85",
};

const deanSilverseaBookingUrl = "https://go.deanondeck.com/Silversea";

const fleets = {
  classic: {
    title: "Classic Luxury Voyages",
    description: "Explore the individual character of Silversea's ocean-going ships.",
    ships: ["Silver Nova", "Silver Ray", "Silver Dawn", "Silver Moon", "Silver Muse", "Silver Spirit", "Silver Shadow", "Silver Whisper"],
  },
  expedition: {
    title: "Expedition Voyages",
    description: "Discover Silversea ships designed for extraordinary destinations.",
    ships: ["Silver Endeavour", "Silver Origin", "Silver Cloud", "Silver Wind"],
  },
} as const;

type Fleet = keyof typeof fleets;

export default function SilverseaFleetPreview() {
  const [active, setActive] = useState<Fleet | null>(null);
  const [selectedShip, setSelectedShip] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Record<Fleet, HTMLButtonElement | null>>({ classic: null, expedition: null });
  const activeTriggerRef = useRef<Fleet | null>(null);
  const closeFleet = () => { setSelectedShip(null); setActive(null); window.requestAnimationFrame(() => { if (activeTriggerRef.current) triggerRefs.current[activeTriggerRef.current]?.focus(); }); };
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") { if (selectedShip) setSelectedShip(null); else closeFleet(); } };
    const onTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const dialog = document.querySelector<HTMLElement>(".ss-fleet-dialog");
      const focusable = Array.from(dialog?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])') ?? []);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keydown", onTab);
    return () => { document.removeEventListener("keydown", onKeyDown); document.removeEventListener("keydown", onTab); };
  }, [active, selectedShip]);
  useEffect(() => {
    if (!active) return;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [active]);

  return (
    <section className="ss-fleet" aria-labelledby="ss-fleet-heading">
      <div className="ss-fleet-heading">
        <p className="ss-fleet-brand">SILVERSEA · ULTRA-LUXURY VOYAGES</p>
        <h3 id="ss-fleet-heading">Exquisite Horizons.</h3>
        <p>Personalized Service. Timeless Luxury.</p>
        <strong className="ss-fleet-ribbon">Every suite. Your own butler.</strong>
      </div>
      <div className="ss-fleet-choices">
        {(["classic", "expedition"] as const).map((key) => (
          <article className="ss-fleet-choice" key={key}>
            <h4>{fleets[key].title}</h4>
            <p>{key === "classic" ? "Elegant ships to the world's most iconic destinations." : "Purpose-built ships for extraordinary, remote regions."}</p>
            <button type="button" ref={node => { triggerRefs.current[key] = node; }} onClick={() => { activeTriggerRef.current = key; setSelectedShip(null); setActive(key); }}>Explore the Fleet <span aria-hidden="true">›</span></button>
          </article>
        ))}
      </div>
      <aside className="ss-accessible" aria-labelledby="ss-accessible-heading">
        <div>
          <p className="ss-fleet-brand">THOUGHTFUL TRAVEL</p>
          <h4 id="ss-accessible-heading">Accessible Accommodations</h4>
          <p><strong>Thoughtful luxury, designed for you.</strong></p>
          <p>Selected ships offer wheelchair-accessible suites with wider doorways, generous maneuvering space, roll-in showers, grab bars and adapted storage. Some also offer accessible veranda access.</p>
          <p className="ss-accessible-caution">Features vary by ship and suite. Confirm your needs before booking; tenders and expedition landings may limit access.</p>
        </div>
        <a href={deanSilverseaBookingUrl} target="_blank" rel="noopener noreferrer">Explore Cruises with Dean <span aria-hidden="true">↗</span></a>
      </aside>
      {active && (
        <div className="ss-fleet-overlay" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) closeFleet(); }}>
          <div className="ss-fleet-dialog" role="dialog" aria-modal="true" aria-labelledby="ss-fleet-dialog-title">
            <button ref={closeButtonRef} className="ss-fleet-close" type="button" onClick={closeFleet} aria-label="Close ship selection">×</button>
            {selectedShip && <button type="button" className="ss-fleet-back" onClick={() => setSelectedShip(null)}>← Back to fleet</button>}
            <p className="ss-fleet-brand">DEAN ON DECK CRUISE TRAVEL · DISCOVER THE FLEET</p>
            <h3 id="ss-fleet-dialog-title">{selectedShip || fleets[active].title}</h3>
            <p>{selectedShip ? `${selectedShip} welcomes up to ${shipDetails[selectedShip].guests} guests. Explore its distinctive suites, deck plans and onboard spaces in Silversea’s official ship guide.` : fleets[active].description}</p>
            {selectedShip && <div className="ss-fleet-detail">{officialShipImages[selectedShip] && !failedImages[selectedShip] && <img onError={() => setFailedImages(prev => ({ ...prev, [selectedShip]: true }))} src={officialShipImages[selectedShip]} alt={`${selectedShip} — Silversea official fleet photograph`} loading="eager" />}<a href={`https://www.silversea.com/ships/${shipDetails[selectedShip].slug}.html`} target="_blank" rel="noopener noreferrer">View official ship details & deck plans ↗</a></div>}
            {!selectedShip && <div className="ss-fleet-ship-list">
              {fleets[active].ships.map(ship => (
                <button type="button" key={ship} onClick={() => setSelectedShip(ship)} aria-label={`View ${ship} details`}>
                  <span className="ss-fleet-ship-name">{officialShipImages[ship] && !failedImages[ship] && <img onError={() => setFailedImages(prev => ({ ...prev, [ship]: true }))} src={officialShipImages[ship]} alt={`${ship} — official Silversea fleet photograph`} loading="lazy" />}<span>{ship}<small className="ss-fleet-capacity">{shipDetails[ship].guests} guests · Ship details & deck plan</small></span></span><span aria-hidden="true">›</span>
                </button>
              ))}
            </div>}
            {selectedShip && <div className="ss-fleet-booking"><p>Ready to explore a Silversea voyage? Book through Dean’s personalized Silversea page.</p><a href={deanSilverseaBookingUrl} target="_blank" rel="noopener noreferrer">Explore cruises with Dean ↗</a></div>}
            {selectedShip && failedImages[selectedShip] && <p role="status" className="ss-fleet-note">This photograph is temporarily unavailable. Use the official ship gallery link above to view verified images.</p>}
            <p className="ss-fleet-note">Ship features vary. Official ship guides are for information; use Explore cruises with Dean for personalized booking.</p>
          </div>
        </div>
      )}
    </section>
  );
}
