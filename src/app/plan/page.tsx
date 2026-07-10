import type { Metadata } from "next";
import RevealObserver from "@/components/RevealObserver";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PlanVoyage from "@/components/sections/PlanVoyage";

export const metadata: Metadata = {
  title: "Plan a Voyage · Trip Details | Dean on Deck",
  description:
    "Ready to sail? Share your sailing, cabin, and fare preferences and Dean on Deck will come back with a plan, pricing, and every Virgin Voyages perk you're owed — no booking fees, usually same-day.",
  alternates: { canonical: "/plan" },
  openGraph: {
    title: "Chart your course — plan a Virgin Voyages trip with Dean on Deck",
    description:
      "Tell Dean who's sailing, where, and how you like to travel. Get back a plan, pricing, and perks — no booking fees.",
    url: "/plan",
    type: "website",
  },
};

export default function PlanPage() {
  return (
    <>
      <SiteHeader subpage />
      <main id="top">
        <PlanVoyage />
      </main>
      <SiteFooter subpage />
      <RevealObserver />
    </>
  );
}
