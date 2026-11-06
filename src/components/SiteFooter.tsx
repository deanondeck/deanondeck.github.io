import type { SiteConfig } from "@/lib/cms/types";

export default function SiteFooter({
  subpage = false,
  site,
}: {
  subpage?: boolean;
  site: SiteConfig;
}) {
  const { social, footer, seo } = site;
  // On sub-pages, in-page anchors need to point back to the home route.
  const to = (href: string) =>
    subpage && href.startsWith("#") ? `/${href}` : href;

  return (
    <footer className="foot">
      <style>{`
        .foot { background:radial-gradient(ellipse at 50% 40%,#0a1a35 0%,#06142d 72%,#041027 100%);color:#fff; }
        .foot .foot-top { border-bottom:0; }
        .foot .footer-wordmark { border-left:2px solid #e2b24d; }
        .foot .footer-wordmark small { color:#f2c463; }
        .foot .footer-anchor { object-fit:contain; width:112px; height:125px; flex-shrink:0; mix-blend-mode:lighten; }
        @media(max-width:1100px) and (min-width:701px) { .foot .footer-anchor { width:92px; height:103px; } }
        @media(max-width:700px) { .foot .footer-anchor { width:86px; height:96px; } }
        .foot .foot-socials a { border:2px solid #e8b64e;color:#fff; }
        .foot .footer-wave { display:flex;align-items:center;gap:20px;color:#f3b936; }
        .foot .footer-wave::before,.foot .footer-wave::after {content:"";height:3px;background:#e8b341;flex:1;min-width:0;}
        .foot .footer-wave svg { flex-shrink:0; }
        .foot .foot-bottom,.foot .foot-bottom .disc { color:#fff; }
        @media(min-width:1101px) {
          .foot .foot-top {grid-template-columns:42% 29% 29%;}
          .foot .footer-brand-col {padding-right:34px;}
          .foot .footer-links-col {border-left:2px solid #d9a84e;padding-left:42px;}
          .foot .footer-fleet-col {border-left:2px solid #d9a84e;padding-left:46px;}
          .foot .foot-tag {margin-top:28px;}
          .foot .foot-bottom .disc {border-left:2px solid #d9a84e;}
        }
        @media(max-width:1100px) {
          .foot .footer-links-col,.foot .footer-fleet-col {border-left:1px solid #b9924d;padding-left:18px;}
        }
        @media(max-width:700px) {
          .foot .footer-links-col,.foot .footer-fleet-col {border-left:0;padding-left:0;}
          .foot .footer-wave svg {max-width:80px;}
        }
      `}</style>
      <div className="wrap">
        <div className="foot-top">
          <div className="footer-brand-col">
            <div className="footer-identity">
              <img className="footer-anchor" src="data:image/webp;base64,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" alt="" aria-hidden="true" />
              <div className="footer-wordmark"><span>DEAN ON DECK</span><small>CRUISE TRAVEL</small></div>
            </div>
            <p className="foot-tag">Your vacation, your way.<br/>Your First Mate, all the way.</p>
            <div className="foot-socials">
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14v-1c0-.6.4-1 1-1z" />
                </svg>
              </a>
              <a href={social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 4c.3 2 1.6 3.4 3.5 3.6V10c-1.3 0-2.5-.4-3.5-1.1V15a5 5 0 11-5-5v2.6a2.4 2.4 0 102.4 2.4V4H16z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-links-col">
            <h4><span>Explore</span></h4>
            <ul>
              {footer.exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={to(link.href)}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label === "FAQs" ? "Know Before You Sail" : link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-fleet-col">
            <h4><span>The Fleet</span></h4>
            <ul>
              {footer.boatList.map((item) => {
                const cruise = site.cruiseLines.find((line) => line.name === item || (item === "Atlantis Events" && line.id === "atlantis"));
                return (
                  <li key={item}>
                    {cruise ? <a href={to(`/cruises/#${cruise.id}`)}>{item}</a> : item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="footer-wave" aria-hidden="true"><svg viewBox="0 0 170 34" role="presentation"><path d="M2 25C34 1 58 6 83 15s51 18 85-7C139 24 114 23 87 14S39 5 2 25Z" fill="currentColor"/><path d="M14 30C43 15 63 17 85 24s46 9 70-3C127 34 105 32 83 26S41 19 14 30Z" fill="currentColor"/></svg></div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} {seo.siteName}. All rights reserved.</span>
          <span className="disc">Dean On Deck Cruise Travel is an independently operated travel advisory business offering personalized cruise planning and booking assistance with multiple travel suppliers. Supplier names and trademarks are property of their respective owners.</span>
        </div>
      </div>
    </footer>
  );
}
