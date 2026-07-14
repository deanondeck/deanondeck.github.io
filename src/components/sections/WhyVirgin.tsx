import { img } from "@/lib/media";
import { renderInline } from "@/lib/cms/markdown";
import type { SectionProps } from "@/lib/cms/types";

type WhyVirginContent = {
  image: string;
  imageAlt: string;
  badgeTop: string;
  badgeMain: string;
  eyebrow: string;
  heading: string;
  lede: string;
  checklist: string[];
  ctaLabel: string;
  ctaHref: string;
};

export default function WhyVirgin({ id, content }: SectionProps) {
  const c = content as WhyVirginContent;
  return (
    <section className="band band--ink2" data-cms-id={id}>
      <div className="wrap split">
        <div className="split-media reveal">
          <img src={img(c.image)} alt={c.imageAlt} data-cms-field="image" />
          <div className="badge-float">
            <div className="bt" data-cms-field="badgeTop">{c.badgeTop}</div>
            <div className="bm" data-cms-field="badgeMain">{c.badgeMain}</div>
          </div>
        </div>
        <div>
          <p className="log" data-cms-field="eyebrow">{c.eyebrow}</p>
          <h2 className="display h-lg reveal" data-cms-field="heading">
            {renderInline(c.heading)}
          </h2>
          <p className="lede reveal d1" style={{ marginTop: "1.2rem" }} data-cms-field="lede">
            {c.lede}
          </p>
          <ul className="checklist reveal d2" data-cms-field="checklist">
            {c.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a href={c.ctaHref} className="btn btn-scarlet reveal d3" data-cms-field="ctaLabel">
            {c.ctaLabel} <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
