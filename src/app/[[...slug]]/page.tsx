import type { Metadata } from "next";
import RevealObserver from "@/components/RevealObserver";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getSectionComponent } from "@/lib/sections/registry";
import {
  listPageSlugs,
  loadPage,
  loadSite,
  paramsToSlug,
  pathForSlug,
  slugToParams,
} from "@/lib/cms/loader";

/* Single data-driven route for every page on the site.

   Each page is a JSON file under `content/pages/`. This optional catch-all
   pre-renders all of them at build time (static export), rendering their
   ordered section instances through the registry. Home is `index.json` (`/`);
   every other file maps to `/<slug>`. New pages added by the admin panel appear
   automatically on the next build — no code change. */

type Params = { slug?: string[] };

export function generateStaticParams(): Params[] {
  return listPageSlugs().map((slug) => ({ slug: slugToParams(slug) }));
}

// Only serve the pages we generated; anything else 404s (required for export).
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const key = paramsToSlug(slug);
  const page = loadPage(key);
  const site = loadSite();
  const { meta } = page;

  const description = meta.description ?? site.seo.description;
  const canonical = pathForSlug(key);

  return {
    title: meta.title,
    description,
    alternates: { canonical },
    openGraph: {
      title: meta.ogTitle ?? meta.title,
      description: meta.ogDescription ?? description,
      url: canonical,
      siteName: site.seo.siteName,
      type: (meta.ogType as "website") ?? "website",
      images: [
        {
          url: meta.ogImage ?? site.seo.ogImage,
          width: 1200,
          height: 630,
          alt: "Dean on Deck — Virgin Voyages at sea",
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const key = paramsToSlug(slug);
  const page = loadPage(key);
  const site = loadSite();
  const isSubpage = key !== "index";

  return (
    <>
      <SiteHeader subpage={isSubpage} site={site} />
      <main id="top">
        {page.sections
          .filter((s) => !s.hidden)
          .map((section) => {
            const Section = getSectionComponent(section.type);
            if (!Section) return null;
            return (
              <Section key={section.id} content={section.content} site={site} />
            );
          })}
      </main>
      <SiteFooter subpage={isSubpage} site={site} />
      <RevealObserver />
    </>
  );
}
