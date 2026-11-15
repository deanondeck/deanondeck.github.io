"use client";
import { useEffect, useRef, useState } from "react";

type Suite = { name: string; image: string; alt: string; highlight: string; description: string };
const suites: Suite[] = [
  { name: "Iconic Suite", image: "https://www.celebritycruises.com/content/dam/celebrity/new-images/staterooms/the-retreat-tank/suite-intro_2.jpg", alt: "Iconic Suite living room aboard a Celebrity Edge Series ship", highlight: "Private terrace · panoramic views", description: "The largest suite in Celebrity’s fleet, with a private terrace, hot tub, and panoramic views." },
  { name: "Penthouse Suite", image: "https://www.celebritycruises.com/content/dam/celebrity/new-images/staterooms/edge-stateroom-images/EG18-PenthouseSuite-LivingR.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg?ch_ck=1561637609000", alt: "Penthouse Suite living room aboard a Celebrity Edge Series ship", highlight: "Separate living and dining areas", description: "A spacious retreat with separate living and dining areas, a private terrace, and a hot tub. Layouts vary by ship." },
  { name: "Edge Villa", image: "https://www.celebritycruises.com/content/dam/celebrity/new-images/staterooms/the-retreat-tank/other-suites-edge-villa.jpg", alt: "Two-level Edge Villa interior with floor-to-ceiling windows", highlight: "Two stories · private plunge pool", description: "A two-story residence exclusive to Edge Series ships, with a private terrace and plunge pool." },
  { name: "Royal Suite", image: "https://www.celebritycruises.com/content/dam/celebrity/new-images/staterooms/the-retreat-tank/royal-suite-edge-2560x1440.jpg", alt: "Royal Suite bedroom aboard a Celebrity Edge Series ship", highlight: "Panoramic windows · private veranda", description: "A generous living area, panoramic windows, and a private veranda. Features vary by ship." },
  { name: "Celebrity Suite", image: "https://www.celebritycruises.com/content/dam/celebrity/new-images/staterooms/edge-stateroom-images/EG18-CelebritySuite-Living2R.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg?ch_ck=1561637545000", alt: "Celebrity Suite living room aboard a Celebrity Edge Series ship", highlight: "Two-room layout · private veranda", description: "A two-room suite with a spacious living area, floor-to-ceiling windows, and a private veranda." },
  { name: "Aqua Sky Suite", image: "https://www.celebritycruises.com/content/dam/celebrity/new-images/beyond-new-images/aqua-sky-suite-BY-2560x1440.jpg", alt: "Aqua Sky Suite aboard Celebrity Beyond", highlight: "Spa-inspired · private veranda", description: "Spa-inspired details bring AquaClass wellness together with The Retreat’s service and a private veranda." },
];

export default function CelebritySuites() {
  const [active, setActive] = useState<Suite | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeModal = () => {
    setActive(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modalRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  return (
    <section className="celebrity-editorial" aria-labelledby="celebrity-suites-heading">
      <header className="celebrity-editorial-heading">
        <p className="log log--center">The Suite Collection</p>
        <h3 className="display h-md" id="celebrity-suites-heading">Six signature suites.</h3>
        <p>Choose a room to see what makes it distinct. Suite names and availability vary by ship.</p>
      </header>
      <div className="celebrity-suite-list" aria-label="Featured Celebrity Cruises suites">
        {suites.map((suite, index) => (
          <button className="celebrity-suite-item" type="button" key={suite.name} aria-haspopup="dialog" aria-expanded={active?.name === suite.name} aria-label={`View details for ${suite.name}`}
            onClick={(event) => { triggerRef.current = event.currentTarget; setActive(suite); }}>
            <span className="celebrity-suite-image"><img src={suite.image} alt={suite.alt} loading="lazy" /></span>
            <span className="celebrity-suite-copy">
              <span className="celebrity-suite-number">0{index + 1}</span>
              <span className="celebrity-suite-name">{suite.name}</span>
              <span className="celebrity-suite-highlight">{suite.highlight}</span>
              <span className="celebrity-suite-action">View suite details <span aria-hidden="true">→</span></span>
            </span>
          </button>
        ))}
      </div>
      <aside className="celebrity-accessible-card" aria-labelledby="celebrity-accessible-heading">
        <img src="https://www.celebritycruises.com/blog/content/uploads/2019/03/cruises-for-seniors-with-disabilities-accessible-bath-1024x683.jpg" alt="Celebrity accessible stateroom bathroom with a roll-in shower" loading="lazy" />
        <div className="celebrity-accessible-copy">
          <p className="log">Accessible Accommodations</p>
          <h4 id="celebrity-accessible-heading">Designed for easier movement.</h4>
          <p>Features can include wider doors, roll-in showers, and grab bars. Layouts vary by ship and room.</p>
          <a href="https://www.celebritycruises.com/special-needs/accessible-staterooms" target="_blank" rel="noopener noreferrer">See Celebrity’s accessibility details ↗</a>
        </div>
      </aside>
      <div className="celebrity-editorial-actions">
        <a className="btn btn-ink" href="/plan/?line=Celebrity%20Cruises">Plan with Dean <span className="arrow">→</span></a>
        <a className="cl-alt" href="https://www.celebritycruises.com/cruises" target="_blank" rel="noopener noreferrer">Browse Celebrity itineraries ↗</a>
      </div>
      {active && (
        <div className="celebrity-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}>
          <div className="celebrity-suite-modal" role="dialog" aria-modal="true" aria-labelledby="celebrity-suite-modal-title" tabIndex={-1} ref={modalRef}>
            <button className="celebrity-modal-close" type="button" onClick={closeModal} aria-label="Close suite details">×</button>
            <img className="celebrity-modal-photo" src={active.image} alt={active.alt} />
            <div className="celebrity-modal-copy">
              <p className="log">The Suite Collection</p>
              <h4 className="display h-md" id="celebrity-suite-modal-title">{active.name}</h4>
              <p>{active.description}</p>
              <p className="celebrity-modal-availability">Exact suite features and availability vary by ship and sailing.</p>
              <a className="btn btn-ink" href={`/plan/?line=Celebrity%20Cruises&suite=${encodeURIComponent(active.name)}`}>Plan this suite with Dean <span className="arrow">→</span></a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
