import { img } from "@/lib/media";
import { renderInline } from "@/lib/cms/markdown";
import type { SectionProps } from "@/lib/cms/types";

type ShowcaseItem = { img: string; tag: string; t: string; d: string };
type ShowcaseContent = {
  eyebrow: string;
  heading: string;
  lede: string;
  items: ShowcaseItem[];
};

export default function Showcase({ id, content }: SectionProps) {
  const c = content as ShowcaseContent;
  return (
    <section className="band band--ink" id="adults" data-cms-id={id}>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log" data-cms-field="eyebrow">{c.eyebrow}</p>
          <h2 className="display h-lg" data-cms-field="heading">{renderInline(c.heading)}</h2>
          <p className="lede" data-cms-field="lede">{c.lede}</p>
        </div>
        <div className="showcase" data-cms-field="items">
          {c.items.map((s, i) => (
            <article className={`card reveal d${(i % 3) + 1}`} key={s.t}>
              <img src={img(s.img)} alt={s.t} />
              <span className="card-num">{s.tag}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
