import { img } from "@/lib/media";
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
            <p className="log">{c.hero.eyebrow}</p>
            <h1 className="display h-xl">{renderInline(c.hero.heading)}</h1>
            <p className="lede">{c.hero.lede}</p>
          </div>
          <nav className="cruises-index reveal d1" aria-label="Cruise lines on this page">
            {lines.map((l) => (
              <a key={l.id} href={`#${l.id}`}>
                {l.name}
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
            <div className={`wrap cl-grid${flagship ? " cl-grid--virgin" : l.id === "royal-caribbean" ? " cl-grid--royal" : ""}${i % 2 && l.id !== "royal-caribbean" ? " flip" : ""}`}>
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
                {!l.book && <p className="booking-note">Contact Dean before booking to confirm agency attribution. Browsing a cruise line’s website does not automatically attach Dean to a reservation.</p>}
              </div>
              </div>
              {flagship && c.rockstar && (
                <aside className="cl-rockstar reveal d1" aria-label="Compare Mega RockStar, RockStar and Non-RockStar">
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
                    <div className="cl-rockstar-tier" key={tier.title}>
                      <h4>{tier.title}</h4>
                      <ul className="virgin-checks">{tier.items.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
                    </div>
                  ))}
                  <div className="cl-rockstar-tier">
                    <h4>Non-RockStar</h4>
                    <p>{c.rockstar.regular}</p>
                    <ul className="virgin-checks">{c.rockstar.nonItems.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
                  </div>
                  </div>
                  <footer className="virgin-comparison-footer">
                  <p className="booking-note">{c.rockstar.note}</p>
                  <a className="btn btn-ink" href="/plan/?line=Virgin%20Voyages">{c.rockstar.cta} <span className="arrow">→</span></a>
                  <p className="cl-rockstar-source"><a href="https://www.virginvoyages.com/cabins/suites" target="_blank" rel="noopener noreferrer">View Virgin’s current suite benefits ↗</a></p>
                  <p className="cl-rockstar-source"><a href={site.virginBookingUrl} target="_blank" rel="noopener noreferrer">Let’s Go — Book with Dean ↗</a></p>
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
