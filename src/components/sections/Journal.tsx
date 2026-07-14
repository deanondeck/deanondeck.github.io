import { img } from "@/lib/media";
import { renderInline } from "@/lib/cms/markdown";
import type { SectionProps } from "@/lib/cms/types";

type JournalItem = {
  img: string;
  alt: string;
  k: string;
  t: string;
  d: string;
  sea: string;
};
type JournalContent = {
  eyebrow: string;
  heading: string;
  lede: string;
  items: JournalItem[];
};

/* "From the Deck" — the old site's dispatches: Seattle, Sitka, Scarlet
   Night, and Dean's why-I-sail note, each with his own snapshot. */
export default function Journal({ id, content }: SectionProps) {
  const c = content as JournalContent;
  return (
    <section className="band band--ink2" id="journal" data-cms-id={id}>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log" data-cms-field="eyebrow">{c.eyebrow}</p>
          <h2 className="display h-lg" data-cms-field="heading">{renderInline(c.heading)}</h2>
          <p className="lede" data-cms-field="lede">{c.lede}</p>
        </div>
        <div className="journal" data-cms-field="items">
          {c.items.map((e, i) => (
            <article className={`entry reveal d${(i % 3) + 1}`} key={e.t}>
              <div className="entry-photo">
                <img src={img(e.img)} alt={e.alt} loading="lazy" />
                <span className="k">{e.k}</span>
              </div>
              <div className="entry-body">
                <h3>{e.t}</h3>
                <p>{e.d}</p>
                <span className="sea">{e.sea}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
