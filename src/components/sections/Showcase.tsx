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

export default function Showcase({ content }: SectionProps) {
  const c = content as ShowcaseContent;
  return (
    <section className="band band--ink" id="adults">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log">{c.eyebrow}</p>
          <h2 className="display h-lg">{renderInline(c.heading)}</h2>
          <p className="lede">{c.lede}</p>
        </div>
        <div className="showcase">
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
