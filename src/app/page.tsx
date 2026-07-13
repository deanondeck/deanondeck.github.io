import RevealObserver from "@/components/RevealObserver";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import About from "@/components/sections/About";
import Showcase from "@/components/sections/Showcase";
import WhyVirgin from "@/components/sections/WhyVirgin";
import RockStar from "@/components/sections/RockStar";
import DeanDifference from "@/components/sections/DeanDifference";
import Ports from "@/components/sections/Ports";
import Experiences from "@/components/sections/Experiences";
import Journal from "@/components/sections/Journal";
import InstagramCta from "@/components/sections/InstagramCta";
import Reviews from "@/components/sections/Reviews";
import Faq from "@/components/sections/Faq";
import TwoWays from "@/components/sections/TwoWays";
import Fleet from "@/components/sections/Fleet";
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
        <RockStar />
        <DeanDifference />
        <Ports />
        <Experiences />
        <Journal />
        <InstagramCta />
        <Reviews />
        <Faq />
        <TwoWays />
        <Fleet />
        <Contact />
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}
