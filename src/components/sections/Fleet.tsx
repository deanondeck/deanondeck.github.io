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
export default function Fleet({ id, content }: SectionProps) {
  const c = content as FleetContent;
  return (
    <section className="band band--shell2" id="fleet" data-cms-id={id}>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log" data-cms-field="eyebrow">{c.eyebrow}</p>
          <h2 className="display h-lg" data-cms-field="heading">{renderInline(c.heading)}</h2>
          <p className="lede" data-cms-field="lede">{c.lede}</p>
        </div>
        <div className="fleet" data-cms-field="items">
          {c.items.map((l, i) => (
            <article className={`line-card reveal d${(i % 4) + 1}`} key={l.t}>
              <span className="k">{l.k}</span>
              <h3>{l.t}</h3>
              <p>{l.d}</p>
            </article>
          ))}
        </div>
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
