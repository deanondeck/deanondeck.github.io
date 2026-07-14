import type { MetadataRoute } from "next";
import { loadSite, loadPages, pathForSlug } from "@/lib/cms/loader";

// Required for `output: export` — emit a static sitemap.xml at build time.
export const dynamic = "force-static";

type Tuning = {
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

// Per-slug tuning; anything not listed (e.g. admin-created pages) uses default.
const PRIORITY: Record<string, Tuning> = {
  index: { priority: 1, changeFrequency: "monthly" },
  about: { priority: 0.8, changeFrequency: "yearly" },
  cruises: { priority: 0.8, changeFrequency: "monthly" },
  plan: { priority: 0.7, changeFrequency: "yearly" },
  manage: { priority: 0.6, changeFrequency: "yearly" },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const site = loadSite();
  const base = site.seo.url.replace(/\/$/, "");
  const now = new Date();

  return loadPages().map((page) => {
    const tuning: Tuning = PRIORITY[page.slug] ?? {
      priority: 0.5,
      changeFrequency: "monthly",
    };
    const path = pathForSlug(page.slug);
    return {
      url: path === "/" ? base : `${base}${path}`,
      lastModified: now,
      changeFrequency: tuning.changeFrequency,
      priority: tuning.priority,
    };
  });
}
