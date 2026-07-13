import { NAV, VIRGIN_BOOKING_URL } from "@/lib/content";
import { img } from "@/lib/media";

export default function SiteFooter({ subpage = false }: { subpage?: boolean }) {
  const to = (href: string) => (subpage ? `/${href}` : href);
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <div className="brand">
              <img src={img("logo")} alt="" />
              <span className="brand-name">Dean on Deck</span>
            </div>
            <p className="foot-tag">No kids. No stress. Just you.</p>
            <div className="foot-socials">
              <a href="https://instagram.com/dean__on__deck" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14v-1c0-.6.4-1 1-1z" />
                </svg>
              </a>
              <a href="#" aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 4c.3 2 1.6 3.4 3.5 3.6V10c-1.3 0-2.5-.4-3.5-1.1V15a5 5 0 11-5-5v2.6a2.4 2.4 0 102.4 2.4V4H16z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              {NAV.map(([label, href]) => (
                <li key={href}>
                  <a href={to(href)}>{label}</a>
                </li>
              ))}
              <li>
                <a href="/cruises">Cruises</a>
              </li>
              <li>
                <a href={VIRGIN_BOOKING_URL} target="_blank">Book a voyage</a>
              </li>
              <li>
                <a href="/plan">Plan a voyage</a>
              </li>
              <li>
                <a href="/manage">Manage a booking</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>The Boat</h4>
            <ul>
              <li>Adults-only · 18+</li>
              <li>Michelin-inspired dining</li>
              <li>RockStar suites</li>
              <li>Scarlet Night</li>
              <li>No booking fees</li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Dean on Deck Cruise Travel</span>
          <span className="disc">
            Dean On Deck Cruise Travel Agency was created by Dean Satterfield,
            does not claim to represent, is not affiliated with, endorsed by,
            employed by, authorized by, or officially connected with Virgin
            Voyages or Virgin Group Ltd. All product and company names are
            trademarks™ or registered® trademarks of their respective holders.
          </span>
        </div>
      </div>
    </footer>
  );
}
