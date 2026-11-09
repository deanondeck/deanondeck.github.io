"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

type TerraceOption = { id: string; name: string; size: string };
type Suite = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  interior: string;
  terraces: TerraceOption[];
  bedroom: string;
  bedroomAlt: string;
  terracePhoto?: string;
  terraceAlt?: string;
  terraceCaption?: string;
  biggestPhoto?: string;
  biggestAlt?: string;
};

const exploreMore =
  "https://www.virginvoyages.com/cabins/suites?agentId=281761&agencyId=54480";

const suites: Suite[] = [
  {
    id: "brilliant",
    name: "Brilliant Suite",
    tagline: "A bright, sea-facing RockStar retreat.",
    description:
      "An open, sophisticated suite with room to unwind and a private terrace.",
    interior: "396 sq ft",
    terraces: [{ id: "standard", name: "Private terrace", size: "85.7 sq ft" }],
    bedroom: "/img/rockstar/brilliant-bedroom.jpg",
    bedroomAlt: "Brilliant Suite bedroom from the Virgin Voyages brochure",
  },
  {
    id: "cheeky",
    name: "Cheeky Corner Suite",
    tagline: "Panoramic views. A private corner of the sea.",
    description:
      "A corner suite with an open bedroom and a terrace whose footprint depends on the assigned configuration.",
    interior: "311 sq ft",
    terraces: [
      { id: "pretty-big", name: "Pretty Big", size: "304–306.5 sq ft" },
      { id: "even-bigger", name: "Even Bigger", size: "349–397 sq ft" },
      { id: "biggest", name: "Biggest", size: "442.42–536.8 sq ft" },
    ],
    bedroom: "/img/rockstar/cheeky-bedroom.jpg",
    bedroomAlt: "Cheeky Corner Suite bedroom from the Virgin Voyages brochure",
    terracePhoto: "/img/rockstar/cheeky-terrace.jpg",
    terraceAlt: "Cheeky Corner Suite terrace from the Virgin Voyages brochure",
    terraceCaption:
      "Suite-category terrace view. Terrace layouts and sizes differ by configuration.",
    biggestPhoto: "/img/rockstar/cheeky-biggest.jpg",
    biggestAlt: "Dean on the Cheeky Corner Biggest Terrace",
  },
  {
    id: "seriously",
    name: "Seriously Suite",
    tagline: "The art of getting away, beautifully.",
    description:
      "A compact RockStar suite with a European king bed, curated in-suite bar and private terrace.",
    interior: "284 sq ft",
    terraces: [{ id: "standard", name: "Private terrace", size: "68 sq ft" }],
    bedroom: "/img/rockstar/seriously-bedroom.jpg",
    bedroomAlt: "Seriously Suite bedroom from the Virgin Voyages brochure",
  },
  {
    id: "sweet-aft",
    name: "Sweet Aft Suite",
    tagline: "A little more aft, a lot more wow.",
    description:
      "Set at the stern, this suite looks out over the ship’s wake from the bedroom and terrace.",
    interior: "236 sq ft",
    terraces: [
      { id: "pretty-big", name: "Pretty Big", size: "180–182 sq ft" },
      { id: "even-bigger", name: "Even Bigger", size: "223.6–268 sq ft" },
      { id: "biggest", name: "Biggest", size: "321.8–425 sq ft" },
    ],
    bedroom: "/img/rockstar/sweet-bedroom.jpg",
    bedroomAlt: "Sweet Aft Suite bedroom from the Virgin Voyages brochure",
    terracePhoto: "/img/rockstar/sweet-terrace.jpg",
    terraceAlt: "Sweet Aft Suite terrace overlooking the wake",
    terraceCaption:
      "Suite-category terrace view. Terrace layouts and sizes differ by configuration.",
  },
];

export default function VirginAccommodations() {
  const [active, setActive] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [selectedTerrace, setSelectedTerrace] = useState<string>("pretty-big");
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const suite = active === null ? null : suites[active];
  const selectedTerraceOption =
    suite?.terraces.find((item) => item.id === selectedTerrace) ?? suite?.terraces[0];
  const showBiggestPhoto =
    suite?.id === "cheeky" && selectedTerraceOption?.id === "biggest";

  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (lightbox) setLightbox(null);
        else setActive(null);
      }
      if (event.key === "ArrowRight" && active !== null) {
        setActive((active + 1) % suites.length);
      }
      if (event.key === "ArrowLeft" && active !== null) {
        setActive((active + suites.length - 1) % suites.length);
      }
      if (event.key === "Tab" && !lightbox) {
        const dialog = document.querySelector<HTMLElement>(".virgin-accommodation-dialog");
        const items = dialog?.querySelectorAll<HTMLElement>(
          "button:not([disabled]), a[href]",
        );
        if (!items?.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [active, lightbox]);

  useEffect(() => {
    if (active === null && !lightbox) openerRef.current?.focus();
  }, [active, lightbox]);

  const open = (index: number, event: MouseEvent<HTMLButtonElement>) => {
    openerRef.current = event.currentTarget;
    setSelectedTerrace(suites[index].terraces[0].id);
    setActive(index);
  };

  return (
    <>
      <div className="virgin-accommodation-launch">
        <p className="virgin-accommodation-kicker">Virgin Voyages · RockStar Quarters</p>
        <h3>Four distinctive suites. Your own view of the sea.</h3>
        <p>Explore the bedroom, private terrace and suite dimensions.</p>
        <div className="virgin-accommodation-launch-grid">
          {suites.map((item, index) => (
            <button
              className="virgin-accommodation-card"
              type="button"
              key={item.id}
              onClick={(event) => open(index, event)}
              aria-haspopup="dialog"
            >
              <span className="virgin-accommodation-card-image">
                <img src={item.bedroom} alt="" loading="lazy" />
              </span>
              <span className="virgin-accommodation-card-copy">
                <strong>{item.name}</strong>
                <em>{item.tagline}</em>
                <span className="virgin-accommodation-card-link">
                  Explore suite <span aria-hidden="true">↗</span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {suite && active !== null && (
        <div
          className="virgin-accommodation-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActive(null);
          }}
        >
          <section
            className="virgin-accommodation-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="virgin-accommodation-title"
          >
            <button
              className="virgin-accommodation-close"
              type="button"
              ref={closeRef}
              aria-label="Close accommodation guide"
              onClick={() => setActive(null)}
            >
              ×
            </button>
            <p className="virgin-accommodation-kicker">Virgin Voyages · RockStar Quarters</p>
            <div className="virgin-accommodation-dialog-heading">
              <div>
                <p className="virgin-accommodation-subtitle">{suite.tagline}</p>
                <h3 id="virgin-accommodation-title">{suite.name}</h3>
                <p>{suite.description}</p>
              </div>
              <div className="virgin-accommodation-measures" aria-label="Suite dimensions">
                <div>
                  <span>Interior</span>
                  <strong>{suite.interior}</strong>
                </div>
                <div>
                  <span>Private terrace</span>
                  <strong>
                    {suite.terraces.length === 1
                      ? suite.terraces[0].size
                      : "Varies by configuration"}
                  </strong>
                </div>
              </div>
            </div>

            {suite.terraces.length > 1 && (
              <div className="virgin-accommodation-variants" aria-label="Terrace configurations">
                <span className="virgin-accommodation-variant-label">Terrace configurations</span>
                <div>
                  {suite.terraces.map((option) => (
                    <button
                      type="button"
                      key={option.id}
                      className={
                        selectedTerraceOption?.id === option.id ? "selected" : undefined
                      }
                      aria-pressed={selectedTerraceOption?.id === option.id}
                      onClick={() => setSelectedTerrace(option.id)}
                    >
                      <strong>{option.name}</strong>
                      <span>{option.size}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="virgin-accommodation-gallery">
              <figure>
                <button
                  type="button"
                  className="virgin-accommodation-photo-button"
                  onClick={() =>
                    setLightbox({ src: suite.bedroom, alt: suite.bedroomAlt })
                  }
                  aria-label={"Enlarge photo: " + suite.name + " bedroom"}
                >
                  <img src={suite.bedroom} alt={suite.bedroomAlt} />
                  <span>Enlarge photo ↗</span>
                </button>
                <figcaption>01 / BEDROOM</figcaption>
              </figure>
              {showBiggestPhoto && suite.biggestPhoto ? (
                <figure>
                  <button
                    type="button"
                    className="virgin-accommodation-photo-button"
                    onClick={() =>
                      setLightbox({ src: suite.biggestPhoto!, alt: suite.biggestAlt! })
                    }
                    aria-label="Enlarge photo: Cheeky Corner Biggest Terrace"
                  >
                    <img src={suite.biggestPhoto} alt={suite.biggestAlt} />
                    <span>Enlarge photo ↗</span>
                  </button>
                  <figcaption>02 / BIGGEST TERRACE · DEAN’S PHOTO</figcaption>
                </figure>
              ) : suite.terracePhoto ? (
                <figure>
                  <button
                    type="button"
                    className="virgin-accommodation-photo-button"
                    onClick={() =>
                      setLightbox({ src: suite.terracePhoto!, alt: suite.terraceAlt! })
                    }
                    aria-label={"Enlarge photo: " + suite.name + " terrace"}
                  >
                    <img src={suite.terracePhoto} alt={suite.terraceAlt} />
                    <span>Enlarge photo ↗</span>
                  </button>
                  <figcaption>
                    02 / PRIVATE TERRACE
                    {suite.terraceCaption && (
                      <span className="virgin-accommodation-photo-note">
                        {suite.terraceCaption}
                      </span>
                    )}
                  </figcaption>
                </figure>
              ) : (
                <div className="virgin-accommodation-photo-pending" role="note">
                  <span>02 / PRIVATE TERRACE</span>
                  <strong>Terrace photograph to confirm</strong>
                  <p>
                    The approved photo archive does not contain a confirmed terrace image
                    for this suite.
                  </p>
                </div>
              )}
            </div>

            {suite.id === "cheeky" && (
              <p className="virgin-accommodation-note">
                The Biggest Terrace photo shows that configuration only. The Pretty Big and
                Even Bigger terraces have different footprints; the category photo above is
                not a picture of either specific layout.
              </p>
            )}
            <div className="virgin-accommodation-footer">
              <a href={exploreMore} target="_blank" rel="noopener noreferrer">
                Explore More at Virgin Voyages <span aria-hidden="true">↗</span>
              </a>
              <span>{active + 1} of {suites.length}</span>
            </div>
          </section>
        </div>
      )}

      {lightbox && (
        <div
          className="virgin-accommodation-lightbox"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLightbox(null);
          }}
        >
          <button
            type="button"
            aria-label="Close enlarged photograph"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <img src={lightbox.src} alt={lightbox.alt} />
          <p>{lightbox.alt}</p>
        </div>
      )}
    </>
  );
}
