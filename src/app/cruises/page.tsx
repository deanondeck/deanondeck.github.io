import type { Metadata } from "next";
import RevealObserver from "@/components/RevealObserver";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Cruises from "@/components/sections/Cruises";

export const metadata: Metadata = {
  title: "Cruises · Every Line I Book | Dean on Deck",
  description:
    "Virgin Voyages, Royal Caribbean, Celebrity Cruises, Silversea, and river boat cruises — one advisor, every ocean. Request Dean as your travel advisor and sail with zero booking fees.",
  alternates: { canonical: "/cruises" },
  openGraph: {
    title: "One advisor. Every ocean. — Cruises with Dean on Deck",
    description:
      "Virgin Voyages, Royal Caribbean, Celebrity Cruises, Silversea, and river cruising — compare the lines Dean books, fee-free.",
    url: "/cruises",
    type: "website",
  },
};

export default function CruisesPage() {
  return (
    <>
      <SiteHeader subpage />
      <main id="top">
        <Cruises />
      </main>
      <SiteFooter subpage />
      <RevealObserver />
    </>
  );
}
