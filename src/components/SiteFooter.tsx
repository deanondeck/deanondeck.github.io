import { img } from "@/lib/media";
import type { SiteConfig } from "@/lib/cms/types";

export default function SiteFooter({
  subpage = false,
  site,
}: {
  subpage?: boolean;
  site: SiteConfig;
}) {
  const { brand, social, footer, seo } = site;
  // On sub-pages, in-page anchors need to point back to the home route.
  const to = (href: string) =>
    subpage && href.startsWith("#") ? `/${href}` : href;

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <div className="brand">
              <img src={img(brand.logo)} alt="" />
              <span className="brand-name">{brand.name}</span>
            </div>
            <p className="foot-tag">{brand.tagline}</p>
            <div className="foot-socials">
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href={social.facebook} aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14v-1c0-.6.4-1 1-1z" />
                </svg>
              </a>
              <a href={social.tiktok} aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 4c.3 2 1.6 3.4 3.5 3.6V10c-1.3 0-2.5-.4-3.5-1.1V15a5 5 0 11-5-5v2.6a2.4 2.4 0 102.4 2.4V4H16z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              {footer.exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={to(link.href)}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>The Boat</h4>
            <ul>
              {footer.boatList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} {seo.siteName}</span>
          <span className="disc">{footer.disclaimer}</span>
        </div>
      </div>
    </footer>
  );
}
