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
export default function Fleet({ content }: SectionProps) {
  const c = content as FleetContent;
  return (
    <section className="band band--shell2" id="fleet">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log">{c.eyebrow}</p>
          <h2 className="display h-lg">{renderInline(c.heading)}</h2>
          <p className="lede">{c.lede}</p>
        </div>
        <div className="fleet">
          {c.items.map((l, i) => (
            <article className={`line-card reveal d${(i % 4) + 1}`} key={l.t}>
              <span className="k">{l.k}</span>
              <h3>{l.t}</h3>
              <p>{l.d}</p>
            </article>
          ))}
        </div>
        <p className="coming reveal">{renderInline(c.coming)}</p>
        <div className="fleet-cta reveal">
          <a className="btn btn-ink" href={c.ctaHref}>
            {c.ctaLabel} <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
