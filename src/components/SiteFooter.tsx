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
              <svg className="footer-anchor" viewBox="0 0 90 104" fill="none" aria-hidden="true">
                <defs><linearGradient id="footerGold" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f7d991"/><stop offset=".48" stopColor="#d9a64d"/><stop offset="1" stopColor="#edc46e"/></linearGradient></defs>
                <g stroke="url(#footerGold)" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="45" cy="11" r="5.4" strokeWidth="2.7"/>
                  <path d="M45 17v56M32 31h26" strokeWidth="2.7"/>
                  <path d="M45 73C29 73 17 63 14 49M45 73c16 0 28-10 31-24" strokeWidth="2.8"/>
                  <path d="M14 49l-6 6 9 4M76 49l6 6-9 4M45 73l-7-7m7 7 7-7" strokeWidth="2.5"/>
                  <path d="M8 87c12-6 24-7 37-2 13 5 25 4 37-2M9 96c13-6 25-7 37-2 13 5 24 4 35-2" strokeWidth="2.2"/>
                </g>
              </svg>
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
