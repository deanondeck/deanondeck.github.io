import { renderInline } from "@/lib/cms/markdown";
import type { SectionProps } from "@/lib/cms/types";

type RockStarContent = {
  eyebrow: string;
  heading: string;
  lede: string;
  coreTag: string;
  coreTitle: string;
  coreItems: string[];
  megaTag: string;
  megaTitle: string;
  megaItems: string[];
};

export default function RockStar({ id, content }: SectionProps) {
  const c = content as RockStarContent;
  return (
    <section className="band band--ink" id="rockstar" data-cms-id={id}>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log" data-cms-field="eyebrow">{c.eyebrow}</p>
          <h2 className="display h-lg" data-cms-field="heading">
            {renderInline(c.heading)}
          </h2>
          <p className="lede" data-cms-field="lede">
            {c.lede}
          </p>
        </div>
        <div className="tiers">
          <div className="tier reveal d1">
            <span className="tier-tag" data-cms-field="coreTag">{c.coreTag}</span>
            <h3 data-cms-field="coreTitle">{c.coreTitle}</h3>
            <ul data-cms-field="coreItems">
              {c.coreItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="tier mega reveal d2">
            <span className="tier-tag" data-cms-field="megaTag">{c.megaTag}</span>
            <h3 data-cms-field="megaTitle">{c.megaTitle}</h3>
            <ul data-cms-field="megaItems">
              {c.megaItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
