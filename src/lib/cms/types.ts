/* CMS content model — the data-driven contract for the whole site.

   A page is a `PageDoc`: SEO/meta + an ordered list of section instances.
   Each section instance names a `type` (looked up in the section registry)
   and carries a `content` object whose shape is defined per-type by
   `content/sections.schema.json`. The admin panel reads that same schema to
   render editing forms, so this file and the schema JSON must agree. */

export type SectionInstance = {
  /** Stable unique id within the page — survives reorder, used as React key. */
  id: string;
  /** Section type — key into the registry + the schema. */
  type: string;
  /** Hidden sections stay in the JSON but are not rendered on the site. */
  hidden?: boolean;
  /** Editable values, shape defined by the type's schema entry. */
  content: Record<string, unknown>;
};

export type PageMeta = {
  /** Page `<title>`. */
  title: string;
  /** Meta description + default OG description. */
  description?: string;
  /** OG image path (e.g. "/img/hero-ship-night.jpg"); falls back to site default. */
  ogImage?: string;
  /** OG type, e.g. "website" | "profile". */
  ogType?: string;
  /** OG title override; falls back to `title`. */
  ogTitle?: string;
  /** OG description override; falls back to `description`. */
  ogDescription?: string;
  /** Show in the header nav. */
  inNav?: boolean;
  /** Label to use in nav (defaults to `title`). */
  navLabel?: string;
};

export type PageDoc = {
  meta: PageMeta;
  sections: SectionInstance[];
};

/** A page as returned by the loader, with its resolved slug attached. */
export type LoadedPage = PageDoc & {
  /** "index" for the home page, else the url path without leading slash. */
  slug: string;
};

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
  /** Optional longer label used in the mobile drawer (e.g. "About Dean"). */
  drawerLabel?: string;
};

export type CruiseLine = {
  id: string;
  name: string;
  /** eyebrow */
  k: string;
  img: string;
  alt: string;
  /** description */
  d: string;
  points?: string[];
  /** external booking URL, or null → route to /plan */
  book: string | null;
  bookLabel: string;
};

export type SiteConfig = {
  brand: {
    name: string;
    sub: string;
    /** logo image name (used with img()) */
    logo: string;
    tagline: string;
  };
  seo: {
    siteName: string;
    title: string;
    description: string;
    url: string;
    /** OG image path relative to site root, e.g. "/img/hero-ship-night.jpg" */
    ogImage: string;
    ogTitle: string;
    ogDescription: string;
    keywords: string[];
  };
  social: {
    instagram: string;
    facebook: string;
    tiktok: string;
    googleReviews: string;
  };
  /** Header primary nav (About, Cruises, Plan, Manage). */
  nav: NavLink[];
  /** Virgin booking deep-link used by the header dropdown + footer. */
  virginBookingUrl: string;
  /** Booking portfolio — drives the header "Book a voyage" menu + /cruises. */
  cruiseLines: CruiseLine[];
  footer: {
    /** "Explore" column links, in order. */
    exploreLinks: NavLink[];
    /** "The Boat" column plain list items. */
    boatList: string[];
    /** Legal disclaimer paragraph. */
    disclaimer: string;
  };
};

/** Props every section component receives. */
export type SectionProps = {
  content: Record<string, unknown>;
  site: SiteConfig;
};
