import { img } from "@/lib/media";
import VirginAccommodations from "./VirginAccommodations";
import SilverseaFleetPreview, { SilverseaAccessibility } from "./SilverseaFleetPreview";
import SilverseaSuites from "./SilverseaSuites";
import RoyalAccommodations from "./RoyalAccommodations";
import CelebritySuites from "./CelebritySuites";
import FleetOfferButton, { FleetPageTools } from "./FleetOfferButton";
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
        const atlantis = l.id === "atlantis";
        const brandG = l.id === "brand-g";
        const royal = l.id === "royal-caribbean";
        const band = flagship ? "band--ink" : i % 2 ? "band--shell" : "band--shell2";
        return (
          <section key={l.id} id={l.id} className={`band ${band} cl`}>
            <div className={`wrap cl-grid${flagship ? " cl-grid--virgin" : (l.id === "royal-caribbean" || l.id === "silversea") ? " cl-grid--royal" : ""}${i % 2 && l.id !== "royal-caribbean" && l.id !== "silversea" ? " flip" : ""}`}>
              {atlantis ? (
                <div className="atlantis-editorial">
                  <div className="atlantis-editorial-grid">
                    <figure className="atlantis-photo reveal">
                      <img
                        src="https://atlantisevents.com/wp-content/uploads/home-inline-Oasis-Tdance.jpg"
                        alt="Atlantis Events daytime T-dance on a cruise ship pool deck"
                        loading="eager"
                      />
                      <figcaption>Official Atlantis Events photo · onboard T-dance</figcaption>
                    </figure>
                    <div className="atlantis-content reveal d1">
                      <p className="log">{l.k}</p>
                      <div className="atlantis-brandline"><span aria-hidden="true">✦</span>{l.name}</div>
                      <h2 className="display atlantis-heading">Your people.<em>Your kind of voyage.</em></h2>
                      <p className="atlantis-lede">{l.d}</p>
                      <div className="atlantis-highlights">
                        <article className="atlantis-tile">
                          <h3>Made to connect</h3>
                          <p>Meet fellow travelers through shared experiences, from daytime deck events to evening shows.</p>
                        </article>
                        <article className="atlantis-tile">
                          <h3>Big-stage energy</h3>
                          <p>Atlantis charters add their own entertainment and celebrations to the shipboard experience.</p>
                        </article>
                      </div>
                      <div className="atlantis-check">
                        <span aria-hidden="true">✓</span>
                        <p><strong>New to Atlantis?</strong> Contact Dean before booking so he can confirm whether advisor-assisted booking is available for your reservation.</p>
                      </div>
                      <div className="atlantis-check">
                        <span aria-hidden="true">✓</span>
                        <p><strong>Booked directly with Atlantis before?</strong> Atlantis generally requires guests who booked directly within the past four years to continue booking directly. Check with Dean before making a new reservation.</p>
                      </div>
                      <p className="atlantis-fine">Booking eligibility and agency attribution must be confirmed with Atlantis before you reserve. If eligible, request <strong>Dean Satterfield</strong> with <strong>On Deck Agency</strong>.</p>
                      <FleetOfferButton cruiseLine={l.name} lineId={l.id} />
                      <div className="atlantis-cta">
                        <div>
                          <h3>Curious about an Atlantis sailing?</h3>
                          <p>Tell Dean what you’re considering. He’ll help confirm the right booking path before you reserve.</p>
                        </div>
                        <a className="btn btn-ink" href="/#contact">{l.bookLabel} <span className="arrow">→</span></a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : brandG ? (
                <div className="brandg-editorial">
                  <div className="brandg-photo reveal">
                    <img src={img("port-halong")} alt="Scenic destination landscape evoking Brand g's destination-focused journeys" loading="lazy" />
                    <span className="brandg-photo-caption">Discover destinations together</span>
                  </div>
                  <div className="brandg-content reveal d1">
                    <p className="log">LGBTQ+ journeys · Culture &amp; Connection</p>
                    <h2 className="display brandg-heading">Brand g Vacations <em>See more. Feel more. Belong.</em></h2>
                    <p className="brandg-lede">Intimate river and ocean voyages, thoughtfully curated land adventures, and a welcoming LGBTQ+ community. Brand g puts the destination, local culture, and shared discovery at the heart of the journey.</p>
                    <div className="brandg-highlights">
                      <div><strong>River, sea &amp; land</strong><span>Luxury river cruises, intimate ocean voyages, and curated land adventures.</span></div>
                      <div><strong>Travel with community</strong><span>Connect through small-group experiences and shared adventures.</span></div>
                    </div>
                    <details className="brandg-discover">
                      <summary className="btn btn-ink">Discover the Experience <span aria-hidden="true">→</span></summary>
                      <div className="brandg-discover-copy">
                        <h3>Travel beyond the ordinary</h3>
                        <p>Brand g creates luxury all-LGBT+ journeys for adults 21 and older: full-ship river charters, intimate ocean cruises, and small-group land adventures. Explore the Rhine, Danube, Nile, Mekong and beyond, alongside ocean itineraries and immersive cultural tours. Each journey emphasizes shared discovery, welcoming community, and thoughtful planning.</p>
                      </div>
                    </details>
                    <FleetOfferButton cruiseLine={l.name} lineId={l.id} />
                    <p className="brandg-advisor-note"><strong>Booking with Brand g?</strong> If booking directly, name <strong>Dean Satterfield · Dean On Deck Cruise Travel</strong> as your travel advisor, or contact Dean to arrange agency attribution. Rates and availability may change until deposited; travel protection options are available to discuss.</p>
                  </div>
                </div>
              ) : flagship ? (
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
                      <FleetOfferButton cruiseLine="Virgin Voyages" lineId="virgin" />
                    </div>
                  </div>
                </div>
              ) : (
              <div className="cl-main">
              <figure className="cl-media reveal">
                <img
                  src={l.id === "celebrity" ? "https://www.celebritycruises.com/xcel/cms-images/10d72afd212e856da9af2c4850214faf_05_06_25_WEB_Xcel_Preview_Sailing_Microsite.jpg" : img(flagship ? "virgin-sunset-sailing.jpg" : l.img)}
                  alt={l.id === "celebrity" ? "Celebrity Xcel sailing at sunset in a full side view" : flagship ? "Scarlet Lady sailing into a golden sunset, viewed from above with the full ship and its wake visible" : l.alt}
                  loading={i === 0 || l.id === "celebrity" ? "eager" : "lazy"}
                />
              </figure>
              <div className="cl-body reveal d1">
{l.id === "celebrity" ? (
                  <div className="celebrity-intro">
                    <div className="celebrity-intro-brand">
                      <p className="log">{l.k}</p>
                      <h3 className="display h-lg">
                        <img
                          className="celebrity-opening-wordmark"
                          src={img("celebrity/celebrity-x-wordmark.png")}
                          alt="Celebrity X Cruises"
                          width={1524}
                          height={325}
                          loading="eager"
                        />
                      </h3>
                    </div>
                    <div className="celebrity-intro-copy">
                      <p className="cl-copy">{l.d}</p>
                      <div className="cl-actions">
                        <a className="btn btn-ink" href={`/plan/?line=${encodeURIComponent(l.name)}`}>
                          {l.bookLabel} <span className="arrow">→</span>
                        </a>
                      </div>
                      {l.browse && (
                        <p className="celebrity-browse">
                          <a className="cl-alt" href={l.browse} target="_blank" rel="noopener noreferrer">
                            Browse {l.name} itineraries ↗
                          </a>
                        </p>
                      )}
                      <FleetOfferButton cruiseLine={l.name} lineId={l.id} />
                      <p className="booking-note celebrity-transfer-note">
                        I’ll handle the planning and stand behind you throughout. Already booked? Ask if your reservation can transfer to me. You’ll enter payment and booking details directly with Celebrity.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                <p className={flagship ? "log log--center" : royal ? "log log--center royal-eyebrow" : l.id === "silversea" ? "log silversea-eyebrow" : "log"}>{l.k}</p>
                {l.id === "silversea" && <a className="silversea-official-logo" href="https://go.deanondeck.com/Silversea" target="_blank" rel="noopener noreferrer" aria-label="Explore Silversea with Dean"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Silversea.png" alt="Silversea official wordmark" loading="lazy" /></a>}
                <h3 className="display h-lg">
                  {l.id === "silversea" ? <img className="ss-opening-wordmark" src={img("silversea/wordmark.png")} alt={l.name} width={600} height={67} />
                    : royal ? <img className="royal-opening-wordmark" src={img("royal-caribbean/wordmark.png")} alt="Royal Caribbean®" width={3746} height={1556} loading="lazy" />
                    : l.id === "celebrity" ? <img className="celebrity-opening-wordmark" src={img("celebrity/celebrity-x-wordmark.png")} alt="Celebrity X Cruises" width={1524} height={325} loading="lazy" />
                    : l.name}
                </h3>
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
                {!flagship && <FleetOfferButton cruiseLine={l.name} lineId={l.id} />}
                {l.browse && l.id !== "silversea" && <p><a className="cl-alt" href={l.browse} target="_blank" rel="noopener noreferrer">Browse {l.name} itineraries ↗</a></p>}
                
                {royal && <p className="booking-note royal-booking-note">Tell Dean what you’re looking for; he’ll handle the planning and send your official booking link. Already booked? Ask if your reservation can transfer so he can keep supporting you. You provide payment and booking details directly to Royal Caribbean; Dean On Deck never collects them.</p>}
                  </>
                )}
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
              {royal && c.royal && (
                <div className="royal-comparison">
                  <section className="royal-feature royal-icon-feature" id="icon-of-the-seas" aria-labelledby="royal-icon-heading">
                    <figure className="royal-feature-photo">
                      <img src={img("royal-caribbean/icon-surfside.jpg")} alt="Families playing at Splashaway Bay in the Surfside neighborhood on Icon of the Seas" width={1499} height={1000} loading="lazy" />
                      <figcaption>Splashaway Bay · Icon of the Seas</figcaption>
                    </figure>
                    <div className="royal-feature-copy">
                      <p className="log">Family life on board</p>
                      <h3 id="royal-icon-heading">Icon of the Seas</h3>
                      <p>Spend the afternoon in Surfside, a neighborhood built for families. Kids can race down the slides at Splashaway Bay, and little ones have their own splash area at Baby Bay.</p>
                      <p>The three-level <strong>Ultimate Family Townhouse</strong> even has a slide inside the suite. You’ll find it in <strong>Explore Rooms &amp; Suites</strong> below.</p>
                    </div>
                  </section>
                  <section className="royal-feature" aria-labelledby="royal-accommodations-heading">
                    <figure className="royal-feature-photo">
                      <img src={img("royal-caribbean/crown-loft.jpg")} alt="Two-story Crown Loft Suite on Wonder of the Seas" width={1500} height={1000} loading="lazy" />
                      <figcaption>Crown Loft Suite · Wonder of the Seas</figcaption>
                    </figure>
                    <div className="royal-feature-copy">
                      <p className="log">Life on board</p>
                      <h3 id="royal-accommodations-heading">A room worth sailing for</h3>
                      <p>From a private balcony to a three-level family suite, discover a few of our favorite ways to stay at sea.</p>
                      <RoyalAccommodations logo={site.brand.logo} />
                      <p className="royal-rooms-note">Rooms and Royal Suite Class benefits vary by ship and suite. <a href="https://www.royalcaribbean.com/faq/questions/what-are-the-benefits-of-royal-suite-class" target="_blank" rel="noopener noreferrer">See suite benefits ↗</a></p>
                    </div>
                  </section>
                  <div className="royal-loyalty">
                    <div>
                      <p className="log">Crown &amp; Anchor Society</p>
                      <h4>Pinnacle Club</h4>
                      <p>The highest loyalty tier, reached at 700 cruise points.</p>
                    </div>
                    <a href="https://www.royalcaribbean.com/faq/questions/loyalty-program-benefits" target="_blank" rel="noopener noreferrer">See loyalty benefits ↗</a>
                  </div>
                </div>
              )}
              {l.id === "silversea" && <SilverseaFleetPreview />}
              {l.id === "silversea" && <SilverseaAccessibility />}
              {l.id === "silversea" && c.silversea && <SilverseaSuites included={c.silversea.included} note={c.silversea.note} />}
              {l.id === "celebrity" && <CelebritySuites />}
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
      <FleetPageTools />
    </>
  );
}

