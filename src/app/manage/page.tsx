import type { Metadata } from "next";
import RevealObserver from "@/components/RevealObserver";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ManageBooking from "@/components/sections/ManageBooking";

export const metadata: Metadata = {
  title: "Manage an Existing Booking · MNVV Transfer | Dean on Deck",
  description:
    "Already have a Virgin Voyages booking or a My Next Virgin Voyage (MNVV) voucher? Transfer it to Dean on Deck as your First Mate — no rebooking, no fees, same fare. Unlock Sailor Loot and RockStar perks.",
  alternates: { canonical: "/manage" },
  openGraph: {
    title: "Make Dean your First Mate — transfer your Virgin Voyages booking",
    description:
      "Hand over an existing Virgin Voyages reservation or MNVV voucher. No rebooking, no fees, same fare — just perks and hands-on service.",
    url: "/manage",
    type: "website",
  },
};

export default function ManagePage() {
  return (
    <>
      <SiteHeader subpage />
      <main id="top">
        <ManageBooking />
      </main>
      <SiteFooter subpage />
      <RevealObserver />
    </>
  );
}
