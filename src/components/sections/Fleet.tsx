import { img } from "@/lib/media";
import { renderInline } from "@/lib/cms/markdown";
import type { SectionProps } from "@/lib/cms/types";

type FleetItem = { k: string; t: string; d: string };
type FleetContent = {
  eyebrow: string;
  heading: string;
  lede: string;
  items: FleetItem[];
  coming: string;
  ctaLabel: string;
  ctaHref: string;
};

/* "Discover Unique Voyages" — the old site's beyond-Virgin portfolio. */
export default function Fleet({ id, content, site }: SectionProps) {
  const c = content as FleetContent;
  return (
    <section className="band band--shell2" id="fleet" data-cms-id={id}>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log" data-cms-field="eyebrow">{c.eyebrow}</p>
          <h2 className="display h-lg" data-cms-field="heading">{renderInline(c.heading)}</h2>
          <p className="lede" data-cms-field="lede">{c.lede}</p>
        </div>
        <nav className="cruise-strip" aria-label="Explore cruise lines" data-cms-field="items">
          {c.items.map((item) => {
            const line = site.cruiseLines.find((entry) => entry.name === item.t);
            return (
              <a className="cruise-panel" href={`/cruises/#${line?.id ?? "top-cruises"}`} key={item.t}>
                {line && <img src={img(line.img)} alt="" loading="lazy" />}
                <span className="cruise-panel-copy">
                  <span className="cruise-panel-k">Explore · {item.k}</span>
                  <span className="cruise-panel-title">{item.t}</span>
                  <span className="cruise-panel-desc">{item.d}</span>
                  <span className="cruise-panel-arrow" aria-hidden="true">Explore →</span>
                </span>
              </a>
            );
          })}
        </nav>
        <p className="coming reveal" data-cms-field="coming">{renderInline(c.coming)}</p>
        <div className="fleet-cta reveal">
          <a className="btn btn-ink" href={c.ctaHref} data-cms-field="ctaLabel">
            {c.ctaLabel} <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
