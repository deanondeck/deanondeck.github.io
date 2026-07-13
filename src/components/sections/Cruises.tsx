import { CRUISE_LINES } from "@/lib/content";
import { img } from "@/lib/media";

/* /cruises — the fleet, one line per band (modeled on the reference's
   simple stacked cruises page). Virgin rides the navy flagship band;
   the extended fleet alternates on paper. */

export default function Cruises() {
  return (
    <>
      {/* ---- intro ---- */}
      <section className="band band--black cruises-hero" id="top-cruises">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="log">The Fleet</p>
            <h2 className="display h-xl">
              One advisor. <em>Every ocean.</em>
            </h2>
            <p className="lede">
              Virgin Voyages is my specialty — but it isn&apos;t the only ship
              I sail. Family reunion, ultra-luxury escape, or a slow drift down
              the Danube: request me as your travel advisor on any of these
              lines and I handle every detail. No booking fees, ever.
            </p>
          </div>
          <nav className="cruises-index reveal d1" aria-label="Cruise lines on this page">
            {CRUISE_LINES.map((l) => (
              <a key={l.id} href={`#${l.id}`}>
                {l.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ---- one band per line ---- */}
      {CRUISE_LINES.map((l, i) => {
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
            <p className="log log--center">Anchors aweigh</p>
            <h2 className="display h-lg">
              Can&apos;t decide? <em>That&apos;s my job.</em>
            </h2>
            <p className="lede">
              Tell me who&apos;s sailing and what a perfect day at sea looks
              like — I&apos;ll come back with the right line, the right ship,
              and every perk you&apos;re owed. Usually the same day.
            </p>
            <div className="cl-cta-actions">
              <a className="btn btn-scarlet" href="tel:+16178999774">
                Call (617) 899-9774
              </a>
              <a className="btn btn-ghost" href="/plan">
                Start planning <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
