"use client";

import { useEffect, useRef, useState } from "react";

type FleetLineId = "virgin" | "silversea" | "royal-caribbean" | "celebrity" | "atlantis" | "brand-g";

type OfferButtonProps = {
  cruiseLine: string;
  lineId: string;
};

const destinations: Record<FleetLineId, {
  offerHref: string;
  offerLabel: string;
  deanHref: string;
  note: string;
}> = {
  virgin: {
    offerHref: "https://www.virginvoyages.com/cruise-deals",
    offerLabel: "See Virgin’s current offers",
    deanHref: "/plan/?line=Virgin%20Voyages",
    note: "Ask Dean to check current promotions and any additional savings you may qualify for. Eligibility varies, and offers may not combine.",
  },
  silversea: {
    offerHref: "https://www.silversea.com/best-luxury-cruise-deals.html",
    offerLabel: "See Silversea’s current offers",
    deanHref: "https://go.deanondeck.com/Silversea",
    note: "Review current savings and voyage offers, then ask Dean to confirm the fare and included benefits for the suite and sailing you like.",
  },
  "royal-caribbean": {
    offerHref: "https://www.royalcaribbean.com/cruise-deals",
    offerLabel: "See Royal Caribbean’s current offers",
    deanHref: "/plan/?line=Royal%20Caribbean",
    note: "Browse live promotions and sailings. Send Dean a sailing you like and he can check the available cabin options and booking details.",
  },
  celebrity: {
    offerHref: "https://www.celebritycruises.com/cruise-deals",
    offerLabel: "See Celebrity’s current offers",
    deanHref: "/plan/?line=Celebrity%20Cruises",
    note: "Review current deals and eligible sailings, then ask Dean to compare the fare, cabin, and included benefits.",
  },
  "brand-g": {
    offerHref: "https://www.brandgvacations.com/vacations/",
    offerLabel: "Browse Brand g journeys",
    deanHref: "/plan/?line=Brand%20g%20Vacations",
    note: "Booking directly? Tell Brand g that Dean Satterfield of On Deck Agency (Dean On Deck Cruise Travel) is your travel advisor. Dean can also email Brand g to have your reservation associated with his agency.",
  },
  atlantis: {
    offerHref: "https://res.atlantisevents.com/Booking/Trip/List",
    offerLabel: "Browse current Atlantis sailings",
    deanHref: "/#contact",
    note: "Atlantis keeps its available trips and public details on its live sailing page. Share a sailing with Dean so he can confirm whether advisor-assisted booking is available.",
  },
};

export default function FleetOfferButton({ cruiseLine, lineId }: OfferButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const config = destinations[lineId as FleetLineId];
  if (!config) return null;
  const isAtlantis = lineId === "atlantis";
  const isBrandG = lineId === "brand-g";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="fleet-offer-trigger"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        <span className="fleet-offer-trigger-mark" aria-hidden="true">✦</span>
        <span className="fleet-offer-trigger-copy">
          <strong>{isAtlantis || isBrandG ? "Sailings & offers" : "Current offers"}</strong>
          <small>The On Deck Offer Desk</small>
        </span>
        <span className="fleet-offer-trigger-arrow" aria-hidden="true">↗</span>
      </button>

      <dialog
        ref={dialogRef}
        className="fleet-offer-dialog"
        aria-labelledby={`fleet-offer-title-${lineId}`}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        onClose={() => triggerRef.current?.focus()}
      >
        <div className="fleet-offer-rainbow" aria-hidden="true" />
        <div className="fleet-offer-content">
          <header className="fleet-offer-header">
            <p className="fleet-offer-overline"><span aria-hidden="true">✦</span> The On Deck Offer Desk</p>
            <button
              type="button"
              className="fleet-offer-close"
              aria-label="Close offers"
              onClick={() => dialogRef.current?.close()}
            >×</button>
            <h3 id={`fleet-offer-title-${lineId}`}>{isAtlantis ? "Explore Atlantis sailings" : isBrandG ? "Explore Brand g journeys" : `Latest ${cruiseLine} offers`}</h3>
            <p>
              {isAtlantis
                ? "Browse published sailings and itineraries from Atlantis Events."
                : isBrandG ? "Browse published Brand g river, ocean, and land journeys." : `Check ${cruiseLine}’s live offers and eligible sailings.`}
            </p>
          </header>

          <div className="fleet-offer-note">
            <span className="fleet-offer-note-icon" aria-hidden="true">{isAtlantis ? "✧" : "↗"}</span>
            <p>{config.note}</p>
          </div>

          {isAtlantis && (
            <p className="fleet-offer-schedule-note">
              Daily onboard activities and party schedules are shared with booked guests closer to sailing.
            </p>
          )}

          <div className="fleet-offer-actions">
            {isBrandG ? (
              <a className="btn btn-ink" href={config.offerHref} target="_blank" rel="noopener noreferrer">
                View Brand g Vacations <span className="arrow">↗</span>
              </a>
            ) : (
              <>
                <a className="btn btn-ink" href={config.deanHref}>
                  {isAtlantis ? "Ask Dean about a sailing" : "Ask Dean to check an offer"}
                  <span className="arrow">→</span>
                </a>
                <a className="fleet-offer-live-link" href={config.offerHref} target="_blank" rel="noopener noreferrer">
                  {config.offerLabel} <span aria-hidden="true">↗</span>
                </a>
              </>
            )}
          </div>
          <p className="fleet-offer-fine">
            Offers, prices, eligibility, and availability can change. Confirm the details for your chosen sailing before booking.
          </p>
        </div>
      </dialog>
    </>
  );
}

export function FleetPageTools() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 560);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <a
      className={`fleet-to-top${visible ? " is-visible" : ""}`}
      href="#top-cruises"
      aria-label="Back to the top of the Fleet page"
      tabIndex={visible ? 0 : -1}
    >
      <span aria-hidden="true">↑</span>
      <span>Top</span>
    </a>
  );
}
