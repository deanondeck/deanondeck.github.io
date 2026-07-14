/* Content loader — reads the `content/` directory at build time.

   Everything here runs on the server during `next build` (static export) and
   during `next dev`. It is deliberately filesystem-based rather than static
   `import`s so that pages added by the admin panel (new JSON files) are picked
   up on the next build with no code change. */

import fs from "node:fs";
import path from "node:path";
import type { LoadedPage, PageDoc, SiteConfig } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PAGES_DIR = path.join(CONTENT_DIR, "pages");

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

/** All page slugs, "index" first if present. A slug is the filename sans .json. */
export function listPageSlugs(): string[] {
  const files = fs
    .readdirSync(PAGES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.slice(0, -".json".length));
  // Keep "index" first for stable ordering; the rest alphabetical.
  return files.sort((a, b) =>
    a === "index" ? -1 : b === "index" ? 1 : a.localeCompare(b),
  );
}

/** Load one page by slug ("index" = home). Throws if missing. */
export function loadPage(slug: string): LoadedPage {
  const doc = readJson<PageDoc>(path.join(PAGES_DIR, `${slug}.json`));
  return { ...doc, slug };
}

/** Load every page. */
export function loadPages(): LoadedPage[] {
  return listPageSlugs().map(loadPage);
}

/** The URL path for a slug: "index" → "/", else "/<slug>". */
export function pathForSlug(slug: string): string {
  return slug === "index" ? "/" : `/${slug}`;
}

/** Route params for the optional catch-all: "index" → [], else ["<slug>"]. */
export function slugToParams(slug: string): string[] {
  return slug === "index" ? [] : slug.split("/");
}

/** Inverse of slugToParams: catch-all params → slug key ("index" for /). */
export function paramsToSlug(slug: string[] | undefined): string {
  return !slug || slug.length === 0 ? "index" : slug.join("/");
}

let siteCache: SiteConfig | null = null;

/** Load the global site config (nav, footer, brand, SEO, cruise lines). */
export function loadSite(): SiteConfig {
  if (!siteCache) {
    siteCache = readJson<SiteConfig>(path.join(CONTENT_DIR, "site.json"));
  }
  return siteCache;
}
