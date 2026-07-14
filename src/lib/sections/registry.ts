/* Section registry — maps a section `type` string to its React component.

   This is the site half of the contract with the admin panel: the admin reads
   `content/sections.schema.json` to know each type's editable fields, and this
   registry tells the site how to render each type. Adding a new section type
   means: create the component, register it here, and add its schema entry.

   Every registered component takes `SectionProps` ({ content, site }). */

import type { ComponentType } from "react";
import type { SectionProps } from "@/lib/cms/types";

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
import AboutMe from "@/components/sections/AboutMe";
import Cruises from "@/components/sections/Cruises";
import PlanVoyage from "@/components/sections/PlanVoyage";
import ManageBooking from "@/components/sections/ManageBooking";

export const SECTION_REGISTRY: Record<
  string,
  ComponentType<SectionProps>
> = {
  hero: Hero,
  ticker: Ticker,
  about: About,
  showcase: Showcase,
  whyVirgin: WhyVirgin,
  rockStar: RockStar,
  deanDifference: DeanDifference,
  ports: Ports,
  experiences: Experiences,
  journal: Journal,
  instagramCta: InstagramCta,
  reviews: Reviews,
  faq: Faq,
  twoWays: TwoWays,
  fleet: Fleet,
  contact: Contact,
  aboutMe: AboutMe,
  cruises: Cruises,
  planVoyage: PlanVoyage,
  manageBooking: ManageBooking,
};

export function getSectionComponent(
  type: string,
): ComponentType<SectionProps> | undefined {
  return SECTION_REGISTRY[type];
}
