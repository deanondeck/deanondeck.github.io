import { renderInline } from "@/lib/cms/markdown";
import type { SectionProps } from "@/lib/cms/types";

type Way = {
  k: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};
type TwoWaysContent = {
  eyebrow: string;
  heading: string;
  way1: Way;
  way2: Way;
};

/* The old site's "Two Ways to Book" — self-serve link vs. full service. */
export default function TwoWays({ content }: SectionProps) {
  const c = content as TwoWaysContent;
  return (
    <section className="band band--ink" id="book">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log">{c.eyebrow}</p>
          <h2 className="display h-lg">{renderInline(c.heading)}</h2>
        </div>
        <div className="ways">
          <div className="way reveal d1">
            <span className="k">{c.way1.k}</span>
            <h3>{c.way1.title}</h3>
            <p>{c.way1.body}</p>
            <a href={c.way1.ctaHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              {c.way1.ctaLabel} <span className="arrow">→</span>
            </a>
          </div>
          <div className="way gold reveal d2">
            <span className="k">{c.way2.k}</span>
            <h3>{c.way2.title}</h3>
            <p>{c.way2.body}</p>
            <a href={c.way2.ctaHref} className="btn btn-scarlet">
              {c.way2.ctaLabel} <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
