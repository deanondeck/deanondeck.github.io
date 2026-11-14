"use client";

import { useEffect, useRef, useState } from "react";

// Veranda photo: © Silversea Cruises Ltd; image served by Widgety cruise-media asset CDN. Confirm supplier reuse permission before publishing.
const booking = "https://go.deanondeck.com/Silversea";
const suitePhotos = [
  "https://assets.widgety.co.uk/2025/04/28/10/14/12/6ede31a4-216b-41cb-9da1-c630a50a8250/Silversea,%20Silver%20Ray,%20Otium%20Suite%20Living%20Room%20with%20Balcony%20%C2%A9Silversea%20Cruises%20Ltd.jpg",
  "https://assets.widgety.co.uk/2025/04/28/12/16/47/bf5105c3-3504-4484-9d89-85c2bf6801a8/Silversea,%20Silver%20Ray,%20Silver%20Suite%20Living%20Room%20%C2%A9Silversea%20Cruises%20Ltd.jpg",
  "https://assets.widgety.co.uk/2025/04/28/13/03/45/48bb19ca-bbc0-4ce9-a185-a426f6c991ad/Silversea,%20Silver%20Ray,%20Premium%20Veranda%20Suite%20Balcony%20%C2%A9Silversea%20Cruises%20Ltd.jpg",
  "https://assets.widgety.co.uk/2025/04/23/13/27/31/07442f61-ee01-4894-b259-1d3b3784ecfe/Silversea,%20Silver%20Muse,%20Vista%20Suite.jpg"
];
const categories = [
  { name: "Villa", heading: "The best address on board", description: "Silversea’s most expansive suites, with separate bedrooms, generous living space and private outdoor areas.", examples: "Otium, Master, Owner’s, Grand and Royal suites", official: "https://www.silversea.com/life-onboard/luxury-suites.html" },
  { name: "Residence", heading: "Room to live. Space to unwind.", description: "Residential-style suites with separate bedroom and living areas, a private balcony and additional comforts.", examples: "Junior Grand, Signature, Silver, Premium Medallion and Medallion suites", official: "https://www.silversea.com/life-onboard/luxury-suites.html" },
  { name: "Veranda", heading: "Your own private outlook", description: "Step through floor-to-ceiling glass doors onto your furnished private balcony. Interior layouts and veranda sizes vary by ship.", examples: "Premium, Deluxe, Superior, Classic and Veranda suites", official: "https://www.silversea.com/life-onboard/luxury-ocean-view-suites/deluxe-veranda-suite" },
  { name: "Ocean View", heading: "The sea, framed beautifully", description: "Comfortable suites with picture windows and panoramic sea views, without a private balcony.", examples: "Panorama and Vista suites", official: "https://www.silversea.com/life-onboard/luxury-suites.html" },
] as const;

export default function SilverseaSuites({ included, note }: { included: string[]; note: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (selected === null) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const keydown = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", keydown);
    return () => { document.body.style.overflow = overflow; document.removeEventListener("keydown", keydown); };
  }, [selected]);
  return (
    <aside className="ss-suite-collection" aria-label="Explore Silversea suite categories">\n      <style>{`@import url(\'https://fonts.googleapis.com/css2?family=Corinthia:wght@400;700&family=Cormorant+Garamond:wght@400;500;600&display=swap\');`}</style>
      <header className="ss-suite-intro">
        <p className="ss-suite-kicker">The Suite Collection</p>
        <h3 style={{ textAlign: "center", margin: "10px 0 16px", lineHeight: 1 }}><span style={{ display: "block", color: "#15243a", fontFamily: "\'Cormorant Garamond\', Georgia, serif", fontSize: "clamp(38px, 6vw, 64px)", fontWeight: 500 }}>Your Suite,</span><span style={{ display: "block", color: "#ae864a", fontFamily: "\'Corinthia\', cursive", fontSize: "clamp(56px, 9vw, 95px)", fontWeight: 700, lineHeight: .9 }}>Your Sanctuary</span></h3>
        <p>An all-suite voyage with a personal butler and exceptional service at every level. Choose the space, setting and experience that feel right for you.</p>
      </header>
      <div className="ss-suite-included">
        <strong>Included with every suite</strong>
        <ul>{included.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
      </div>
      <div className="ss-suite-gallery">
        {categories.map((suite, index) => (
          <button className="ss-suite-tile" key={suite.name} type="button" onClick={() => setSelected(index)} aria-label={`View ${suite.name} suite details`}>
            <img className="ss-suite-photo" src={suitePhotos[index]} alt={`Genuine Silversea ${suite.name} suite category example`} loading="lazy" />
            <span className="ss-suite-tile-caption"><strong>{suite.name}</strong><small>View details ↗</small></span>
          </button>
        ))}
      </div>
      <p className="ss-suite-note">{note}</p>
      <a className="ss-suite-book" href={booking} target="_blank" rel="noopener noreferrer">Find my Silversea suite <span aria-hidden="true">→</span></a>
      {selected !== null && (
        <div className="ss-suite-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          <div className="ss-suite-dialog" role="dialog" aria-modal="true" aria-labelledby="ss-suite-dialog-heading">
            <button ref={closeRef} className="ss-suite-close" type="button" onClick={() => setSelected(null)} aria-label="Close suite details">×</button>
            <p className="ss-suite-kicker">Silversea Suite Collection</p>
            <h3 id="ss-suite-dialog-heading">{categories[selected].name}</h3>
            <img className="ss-suite-dialog-photo" src={suitePhotos[selected]} alt={`Silversea ${categories[selected].name} suite photograph`} />
            <h4>{categories[selected].heading}</h4>
            <p>{categories[selected].description}</p>
            <p><strong>Examples:</strong> {categories[selected].examples}.</p>
            <p className="ss-suite-note">Not every suite type is available on every Silversea ship. Choose a ship and sailing to see its actual suites, layouts and benefits. Enhanced Villa and Residence benefits begin on eligible 2027 departures; inclusions depend on fare and itinerary.</p>
            <a className="ss-suite-official" href={categories[selected].official} target="_blank" rel="noopener noreferrer">See official suite photographs and details ↗</a>
            <a className="ss-suite-book" href={booking} target="_blank" rel="noopener noreferrer">Find my Silversea suite with Dean →</a>
          </div>
        </div>
      )}
    </aside>
  );
}
