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
  hero: { eyebrow: string; heading: string; lede: string };
  cta: { eyebrow: string; heading: string; lede: string; actions: Action[] };
};

export default function Cruises({ content, site }: SectionProps) {
  const c = content as CruisesContent;
  const lines = site.cruiseLines;

  return (
    <>
      {/* ---- intro ---- */}
      <section className="band band--black cruises-hero" id="top-cruises">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="log">{c.hero.eyebrow}</p>
            <h2 className="display h-xl">{renderInline(c.hero.heading)}</h2>
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
            <div className={`wrap cl-grid${i % 2 ? " flip" : ""}`}>
              <figure className="cl-media reveal">
                <img src={img(l.img)} alt={l.alt} loading={i === 0 ? "eager" : "lazy"} />
              </figure>
              <div className="cl-body reveal d1">
                <p className="log">{l.k}</p>
                <h3 className="display h-lg">{l.name}</h3>
                <p className="cl-copy">{l.d}</p>
                {l.points && (
                  <ul className="checklist">
                    {l.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
                <div className="cl-actions">
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
                      <a className="cl-alt" href="/plan">
                        or plan it with Dean
                      </a>
                    </>
                  ) : (
                    <a className="btn btn-ink" href="/plan">
                      {l.bookLabel} <span className="arrow">→</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ---- closing CTA ---- */}
      <section className="band band--black cl-cta">
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
