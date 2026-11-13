"use client";

import { useEffect, useState } from "react";

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
  "Silver Dawn": "https://cdn.sanity.io/images/rd0y3pad/production/f52c84c593994d05d38e1813082392f86434f67a-2500x1875.jpg",
  "Silver Ray": "https://cdn.sanity.io/images/rd0y3pad/production/3429871fc3f45cc59f40be12faebf62ca56db6b4-4939x3550.jpg",
};

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
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
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
            <button type="button" onClick={() => setActive(key)}>Explore the Fleet <span aria-hidden="true">›</span></button>
          </article>
        ))}
      </div>
      {active && (
        <div className="ss-fleet-overlay" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setActive(null); }}>
          <div className="ss-fleet-dialog" role="dialog" aria-modal="true" aria-labelledby="ss-fleet-dialog-title">
            <button className="ss-fleet-close" type="button" onClick={() => setActive(null)} aria-label="Close ship selection">×</button>
            <p className="ss-fleet-brand">DISCOVER THE FLEET</p>
            <h3 id="ss-fleet-dialog-title">{fleets[active].title}</h3>
            <p>{fleets[active].description}</p>
            <div className="ss-fleet-ship-list">
              {fleets[active].ships.map(ship => (
                <a key={ship} href={`https://www.silversea.com/ships/${shipDetails[ship].slug}.html`} target="_blank" rel="noopener noreferrer" aria-label={`Find official information about ${ship} on Silversea's fleet website`}>
                  <span className="ss-fleet-ship-name">{officialShipImages[ship] && <img src={officialShipImages[ship]} alt={`${ship} — official Silversea fleet photograph`} loading="lazy" />}<span>{ship}<small className="ss-fleet-capacity">{shipDetails[ship].guests} guests · Ship details & deck plan</small></span></span><span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
            <p className="ss-fleet-note">Ships differ in design, suites and onboard experiences. Each ship opens its official Silversea page, with photographs, suites, specifications and deck-plan access.</p>
          </div>
        </div>
      )}
    </section>
  );
}
