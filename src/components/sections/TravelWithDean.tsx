import { renderInline } from "@/lib/cms/markdown";
import type { SectionProps } from "@/lib/cms/types";

type TravelContent = {
  eyebrow: string;
  heading: string;
  lede: string;
  emptyMessage: string;
  ctaLabel: string;
  ctaHref: string;
  voyages: { name: string; dates: string; route: string; href: string }[];
};

export default function TravelWithDean({ id, content }: SectionProps) {
  const c = content as TravelContent;
  return (
    <section className="band band--shell2 travel-together" data-cms-id={id}>
      <div className="wrap">
        <div className="sec-head center">
          <p className="log log--center" data-cms-field="eyebrow">{c.eyebrow}</p>
          <h1 className="display h-lg" data-cms-field="heading">{renderInline(c.heading)}</h1>
          <p className="lede" data-cms-field="lede">{c.lede}</p>
        </div>
        {c.voyages.length ? (
          <div className="travel-voyages" data-cms-field="voyages">
            {c.voyages.map((v) => (
              <article className="line-card" key={`${v.name}-${v.dates}`}>
                <span className="k">{v.dates}</span>
                <h2>{v.name}</h2>
                <p>{v.route}</p>
                <a className="cl-alt" href={v.href}>Ask about this sailing →</a>
              </article>
            ))}
          </div>
        ) : <p className="travel-note" data-cms-field="emptyMessage">{c.emptyMessage}</p>}
        <div className="travel-cta">
          <a className="btn btn-scarlet" href={c.ctaHref} data-cms-field="ctaLabel">{c.ctaLabel} →</a>
        </div>
      </div>
    </section>
  );
}
