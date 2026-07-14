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

export default function RockStar({ content }: SectionProps) {
  const c = content as RockStarContent;
  return (
    <section className="band band--ink" id="rockstar">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log">{c.eyebrow}</p>
          <h2 className="display h-lg">
            {renderInline(c.heading)}
          </h2>
          <p className="lede">
            {c.lede}
          </p>
        </div>
        <div className="tiers">
          <div className="tier reveal d1">
            <span className="tier-tag">{c.coreTag}</span>
            <h3>{c.coreTitle}</h3>
            <ul>
              {c.coreItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="tier mega reveal d2">
            <span className="tier-tag">{c.megaTag}</span>
            <h3>{c.megaTitle}</h3>
            <ul>
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
