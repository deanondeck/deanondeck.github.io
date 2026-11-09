import { img } from "@/lib/media";
import VirginAccommodations from "./VirginAccommodations";
import { renderInline } from "@/lib/cms/markdown";
import type { SectionProps } from "@/lib/cms/types";

/* /cruises — the fleet, one line per band (modeled on the reference's simple
   stacked cruises page). Virgin rides the navy flagship band; the extended
   fleet alternates on paper. The cruise-line list is global (edited in Site
   Settings) so the header "Book a voyage" menu and this page stay in sync. */

type Action = {
  label: string;
  href: string;
  variant: "scarlet" | "ghost" | "ink";
  arrow?: boolean;
};
type CruisesContent = {
  silversea?: { heading: string; intro: string; included: string[]; tiers: {title: string; items: string[]}[]; note: string };
  royal?: { heading: string; intro: string; included: string[]; tiers: { title: string; items: string[] }[]; stateroomTitle: string; stateroomText: string; note: string };
  rockstar?: { eyebrow: string; heading: string; intro: string; includedTitle: string; includedItems: string[]; regular: string; nonItems: string[]; coreTitle: string; coreItems: string[]; megaTitle: string; megaItems: string[]; note: string; cta: string };
  hero: { eyebrow: string; heading: string; lede: string };
  cta: { eyebrow: string; heading: string; lede: string; actions: Action[] };
};

export default function Cruises({ id, content, site }: SectionProps) {
  const c = content as CruisesContent;
  const lines = site.cruiseLines;

  return (
    <>
      {/* ---- intro ---- */}
      <section className="band band--black cruises-hero" id="top-cruises" data-cms-id={id} data-cms-field="hero">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="log log--center">{c.hero.eyebrow}</p>
            <h1 className="display h-xl">{renderInline(c.hero.heading)}</h1>
            <p className="lede">{c.hero.lede}</p>
          </div>
          <nav className="cruises-index reveal d1" aria-label="Cruise lines on this page">
            {lines.map((l) => (
              <a key={l.id} href={`#${l.id}`}>
                <span>{l.name}</span><span className="fleet-link-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ---- one band per line ---- */}
      {lines.map((l, i) => {
        const flagship = l.id === "virgin";
        const band = flagship ? "band--ink" : i % 2 ? "band--shell" : "band--shell2";
        return (
          <section key={l.id} id={l.id} className={`band ${band} cl`}>
            <div className={`wrap cl-grid${flagship ? " cl-grid--virgin" : (l.id === "royal-caribbean" || l.id === "silversea") ? " cl-grid--royal" : ""}${i % 2 && l.id !== "royal-caribbean" && l.id !== "silversea" ? " flip" : ""}`}>
              {flagship ? (
                <div className="virgin-editorial">
                  <h2 className="virgin-editorial-eyebrow"><span>Specialty · Adults Only</span></h2>
                  <div className="virgin-editorial-grid">
                    <figure className="virgin-editorial-photo"><img src={img("virgin-sunset-sailing.jpg")} alt="Virgin Voyages ship sailing at sunset" loading="eager" /></figure>
                    <div className="virgin-editorial-content">
                      <div className="virgin-editorial-wordmark"><img src={img("virgin-voyages-horizontal.svg")} alt="Virgin Voyages" loading="eager" width={500} height={250} /></div>
                      <h3>Bold Cruises for Grown-Up Travelers</h3>
                      <p className="virgin-editorial-intro">Award-winning ships, elevated dining, and unforgettable destinations — all kid-free.</p>
                      <div className="virgin-editorial-tiers">
                        <a href="#virgin-mega-rockstar" className="virgin-editorial-tier"><span className="virgin-editorial-symbol" aria-hidden="true"><svg viewBox="0 0 64 64" fill="currentColor"><path d="M9 46 5 17l15 13L32 8l12 22 15-13-4 29H9Zm1 5h44v7H10z"/></svg></span><span className="virgin-editorial-tier-copy"><strong>Mega RockStar Suites<sup className="virgin-registered">®</sup></strong><em>Our most exclusive suites with VIP perks and personal service.</em></span><span className="virgin-editorial-arrow">›</span></a>
                        <a href="#virgin-rockstar" className="virgin-editorial-tier"><span className="virgin-editorial-symbol" aria-hidden="true"><svg viewBox="0 0 64 64" fill="currentColor"><path d="m32 5 8.6 17.6L60 25.4 46 39l3.3 19.2L32 49.1 14.7 58.2 18 39 4 25.4l19.4-2.8z"/></svg></span><span className="virgin-editorial-tier-copy"><strong>RockStar Suites<sup className="virgin-registered">®</sup></strong><em>Stylish suites with elevated perks and priority access.</em></span><span className="virgin-editorial-arrow">›</span></a>
                        <a href="#virgin-non-rockstar" className="virgin-editorial-tier"><span className="virgin-editorial-symbol virgin-editorial-symbol--red" aria-hidden="true"><svg viewBox="0 0 64 64" fill="currentColor"><path d="m32 5 8.6 17.6L60 25.4 46 39l3.3 19.2L32 49.1 14.7 58.2 18 39 4 25.4l19.4-2.8z"/></svg></span><span className="virgin-editorial-tier-copy"><strong>Cabins &amp; Sea Terraces</strong><em>Comfortable, modern cabins with all the signature Virgin inclusions.</em></span><span className="virgin-editorial-arrow">›</span></a>
                      </div>
                      <a className="virgin-editorial-cta" href="/plan/?line=Virgin%20Voyages">Explore Virgin Voyages with Dean <span aria-hidden="true">›</span></a>
                    </div>
                  </div>
                </div>
              ) : (
              <div className="cl-main">
              <figure className="cl-media reveal">
                <img src={img(flagship ? "virgin-sunset-sailing.jpg" : l.img)} alt={flagship ? "Scarlet Lady sailing into a golden sunset, viewed from above with the full ship and its wake visible" : l.alt} loading={i === 0 ? "eager" : "lazy"} />
              </figure>
              <div className="cl-body reveal d1">
                <p className={flagship ? "log log--center" : "log"}>{l.k}</p>
                <h3 className="display h-lg">{l.name}</h3>
                <p className="cl-copy">{l.d}</p>
                {l.points && (
                  <ul className="checklist">
                    {l.points.filter(p => !flagship || p !== "Ask Dean to check current offers and eligible extras").map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
                {!flagship && <div className="cl-actions">
                  {l.book ? (
                    <>
                      <a
                        className={`btn ${flagship ? "btn-scarlet" : "btn-ink"}`}
                        href={l.book}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {l.bookLabel} <span className="arrow">→</span>
                      </a>

                    </>
                  ) : (
                    <a className="btn btn-ink" href={`/plan/?line=${encodeURIComponent(l.name)}`}>
                      {l.bookLabel} <span className="arrow">→</span>
                    </a>
                  )}
                </div>}
                {flagship && (
                  <a className="virgin-offers" href="https://www.virginvoyages.com/?agentId=281761&agencyId=54480" target="_blank" rel="noopener noreferrer" aria-label="Explore Virgin’s latest offers">
                    <h4>Explore Virgin’s Latest Offers</h4>
                    <p>View current promotions and sailings.</p>
                    <span className="virgin-offers-link">Explore Offers <span aria-hidden="true">→</span></span>
                    <small>Offers and eligibility vary by sailing. Check current terms before booking.</small>
                  </a>
                )}
                {l.browse && <p><a className="cl-alt" href={l.browse} target="_blank" rel="noopener noreferrer">Browse {l.name} itineraries ↗</a></p>}
                {l.id === "silversea" && <p className="booking-note">Explore voyages with Dean’s contact details at hand. Use Contact on the Silversea site to email Dean and arrange your booking.</p>}
                {!l.book && <p className="booking-note">Contact Dean before booking to confirm agency attribution. Browsing a cruise line’s website does not automatically attach Dean to a reservation.</p>}
              </div>
              </div>
              )}
              {flagship && <VirginAccommodations />}
              {flagship && c.rockstar && (
                <aside id="virgin-accommodations" className="cl-rockstar reveal d1" aria-label="Compare Mega RockStar Suites, RockStar Suites and Cabins & Sea Terraces">
                  <header className="virgin-comparison-heading">
                  <p className="log log--center">{c.rockstar.eyebrow}</p>
                  <h3 className="display h-md">{c.rockstar.heading}</h3>
                  <p>{c.rockstar.intro}</p>
                  <div className="cl-included">
                    <h4>{c.rockstar.includedTitle}</h4>
                    <ul className="virgin-checks">{c.rockstar.includedItems.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
                  </div>
                  </header>
                  <div className="virgin-tier-grid">
                  {[{title: c.rockstar.megaTitle, items: c.rockstar.megaItems}, {title: c.rockstar.coreTitle, items: c.rockstar.coreItems}].map(tier => (
                    <div className="cl-rockstar-tier" id={tier.title === c.rockstar?.megaTitle ? "virgin-mega-rockstar" : "virgin-rockstar"} key={tier.title}>
                      <h4><span className="virgin-comparison-icon" aria-hidden="true">{tier.title === c.rockstar?.megaTitle ? <svg viewBox="0 0 64 64" fill="currentColor"><path d="M9 46 5 17l15 13L32 8l12 22 15-13-4 29H9Zm1 5h44v7H10z"/></svg> : <svg viewBox="0 0 64 64" fill="currentColor"><path d="m32 5 8.6 17.6L60 25.4 46 39l3.3 19.2L32 49.1 14.7 58.2 18 39 4 25.4l19.4-2.8z"/></svg>}</span>{tier.title === c.rockstar?.megaTitle ? "Mega RockStar Suites" : "RockStar Suites"}</h4>
                      <ul className="virgin-checks">{tier.items.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
                    </div>
                  ))}
                  <div className="cl-rockstar-tier" id="virgin-non-rockstar">
                    <h4><span className="virgin-comparison-icon virgin-comparison-icon--red" aria-hidden="true"><svg viewBox="0 0 64 64" fill="currentColor"><path d="m32 5 8.6 17.6L60 25.4 46 39l3.3 19.2L32 49.1 14.7 58.2 18 39 4 25.4l19.4-2.8z"/></svg></span>Cabins &amp; Sea Terraces</h4>
                    <p>{c.rockstar.regular}</p>
                    <ul className="virgin-checks">{c.rockstar.nonItems.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
                  </div>
                  </div>
                  <footer className="virgin-comparison-footer">
                  <p className="booking-note">{c.rockstar.note}</p>
                  <a className="btn btn-ink" href="/plan/?line=Virgin%20Voyages">{c.rockstar.cta} <span className="arrow">→</span></a>
                  </footer>
                </aside>
              )}
              {l.id === "royal-caribbean" && c.royal && (
                <aside className="cl-rockstar royal-comparison" aria-label="Compare Royal Caribbean staterooms and suite classes">
                  <header className="virgin-comparison-heading">
                    <p className="log log--center">Your voyage, elevated</p>
                    <h3 className="display h-md">{c.royal.heading}</h3>
                    <p>{c.royal.intro}</p>
                    <div className="cl-included">
                      <h4>Included with every stateroom</h4>
                      <ul className="virgin-checks">{c.royal.included.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
                    </div>
                  </header>
                  <div className="virgin-tier-grid">
                    {c.royal.tiers.map(tier => <div className="cl-rockstar-tier" key={tier.title}>
                      <h4>{tier.title}</h4>
                      <ul className="virgin-checks">{tier.items.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
                    </div>)}
                  </div>
                  <div className="cl-included royal-staterooms"><h4>{c.royal.stateroomTitle}</h4><p>{c.royal.stateroomText}</p></div>
                  <footer className="virgin-comparison-footer">
                    <p className="booking-note">{c.royal.note}</p>
                    <a className="btn btn-ink" href="/plan/?line=Royal%20Caribbean">Find my Royal experience <span aria-hidden="true">→</span></a>
                    <p className="cl-rockstar-source"><a href="https://www.royalcaribbean.com/faq/questions/what-are-the-benefits-of-royal-suite-class" target="_blank" rel="noopener noreferrer">View Royal’s current suite benefits ↗</a></p>
                  </footer>
                </aside>
              )}
              {l.id === "silversea" && c.silversea && (
                <aside className="cl-rockstar royal-comparison silversea-comparison" aria-label="Compare Silversea suite categories">
                  <header className="virgin-comparison-heading">
                    <p className="log log--center">A more personal kind of luxury</p>
                    <h3 className="display h-md">{c.silversea.heading}</h3>
                    <p>{c.silversea.intro}</p>
                    <div className="cl-included"><h4>Included with every suite</h4>
                      <ul className="virgin-checks">{c.silversea.included.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
                    </div>
                  </header>
                  <div className="virgin-tier-grid silversea-tier-grid">
                    {c.silversea.tiers.map(tier => <div className="cl-rockstar-tier" key={tier.title}>
                      <h4>{tier.title}</h4>
                      <ul className="virgin-checks">{tier.items.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
                    </div>)}
                  </div>
                  <footer className="virgin-comparison-footer">
                    <p className="booking-note">{c.silversea.note}</p>
                    <a className="btn btn-ink" href="/plan/?line=Silversea">Find my Silversea suite <span aria-hidden="true">→</span></a>
                    <p className="cl-rockstar-source"><a href="https://www.silversea.com/life-onboard/luxury-suites.html?insider=7owgg-dean-satterfield" target="_blank" rel="noopener noreferrer">View Silversea’s suite collection ↗</a></p>
                  </footer>
                </aside>
              )}
            </div>
          </section>
        );
      })}

      {/* ---- closing CTA ---- */}
      <section className="band band--black cl-cta" data-cms-id={id} data-cms-field="cta">
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="log log--center">{c.cta.eyebrow}</p>
            <h2 className="display h-lg">{renderInline(c.cta.heading)}</h2>
            <p className="lede">{c.cta.lede}</p>
            <div className="cl-cta-actions">
              {c.cta.actions.map((a) => (
                <a className={`btn btn-${a.variant}`} href={a.href} key={a.label}>
                  {a.label}
                  {a.arrow && (
                    <>
                      {" "}
                      <span className="arrow">→</span>
                    </>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
