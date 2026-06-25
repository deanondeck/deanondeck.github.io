import RevealObserver from "@/components/RevealObserver";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import About from "@/components/sections/About";
import Showcase from "@/components/sections/Showcase";
import WhyVirgin from "@/components/sections/WhyVirgin";
import Ports from "@/components/sections/Ports";
import RockStar from "@/components/sections/RockStar";
import Reviews from "@/components/sections/Reviews";
import DeanDifference from "@/components/sections/DeanDifference";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <Ticker />
        <About />
        <Showcase />
        <WhyVirgin />
        <Ports />
        <RockStar />
        <Reviews />
        <DeanDifference />
        <Contact />
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}
