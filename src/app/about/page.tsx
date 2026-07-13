import type { Metadata } from "next";
import RevealObserver from "@/components/RevealObserver";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AboutMe from "@/components/sections/AboutMe";

export const metadata: Metadata = {
  title: "About Dean · A Sailor Just Like You | Dean on Deck",
  description:
    "I'm Dean, a Sailor just like you. My Virgin experience changed my life — now I'm a Gold-Certified First Mate helping pros and first-timers alike sail better, with zero booking fees.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Meet Dean — your Virgin Voyages First Mate",
    description:
      "A Sailor first. Booked in the last 30 days? Dean can run the numbers on adding him as your First Mate — and he books other cruise lines too.",
    url: "/about",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader subpage />
      <main id="top">
        <AboutMe />
      </main>
      <SiteFooter subpage />
      <RevealObserver />
    </>
  );
}
