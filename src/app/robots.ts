import type { MetadataRoute } from "next";
import { loadSite } from "@/lib/cms/loader";

// Required for `output: export` — emit a static robots.txt at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = loadSite().seo.url.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
