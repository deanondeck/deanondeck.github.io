import { img } from "@/lib/media";
import { renderInline } from "@/lib/cms/markdown";
import type { SectionProps } from "@/lib/cms/types";

type ExperienceItem = {
  img: string;
  alt: string;
  pos?: string;
  k: string;
  t: string;
  d: string;
};
type ExperiencesContent = {
  eyebrow: string;
  script: string;
  heading: string;
  lede: string;
  items: ExperienceItem[];
};

/* The old site's "Dean...on Deck Voyage Distinction" card wall. */
export default function Experiences({ id, content }: SectionProps) {
  const c = content as ExperiencesContent;
  return (
    <section className="band band--shell2" id="experiences" data-cms-id={id}>
      <div className="wrap">
        <div className="sec-head center reveal">
          <p className="log log--center" data-cms-field="eyebrow">{c.eyebrow}</p>
          <span className="script" data-cms-field="script">{c.script}</span>
          <h2 className="display h-lg" data-cms-field="heading">{renderInline(c.heading)}</h2>
          <p className="lede" style={{ marginInline: "auto" }} data-cms-field="lede">
            {c.lede}
          </p>
        </div>
        <div className="xp" data-cms-field="items">
          {c.items.map((x, i) => (
            <article className={`xp-card reveal d${(i % 3) + 1}`} key={x.t}>
              <img
                src={img(x.img)}
                alt={x.alt}
                style={x.pos ? { objectPosition: x.pos } : undefined}
              />
              <div className="xp-body">
                <span className="k">{x.k}</span>
                <h3>{x.t}</h3>
                <p>{x.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
