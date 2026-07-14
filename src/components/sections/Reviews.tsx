import { renderInline } from "@/lib/cms/markdown";
import type { SectionProps } from "@/lib/cms/types";

type ReviewItem = { q: string; who: string; when: string };
type ReviewsContent = {
  eyebrow: string;
  heading: string;
  ratingNum: string;
  linkLabel: string;
  linkHref: string;
  items: ReviewItem[];
};

export default function Reviews({ content }: SectionProps) {
  const c = content as ReviewsContent;
  return (
    <section className="band band--shell" id="reviews">
      <div className="wrap">
        <div className="sec-head center reveal">
          <p className="log log--center">{c.eyebrow}</p>
          <h2 className="display h-lg">{renderInline(c.heading)}</h2>
          <div className="proof">
            <span className="proof-num">{c.ratingNum}</span>
            <span className="stars" aria-label="Rated 5 out of 5 stars">
              ★★★★★
            </span>
            <a
              href={c.linkHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.linkLabel} <span className="arrow">→</span>
            </a>
          </div>
        </div>
        <div className="reviews">
          {c.items.map((r, i) => (
            <article className={`review reveal d${(i % 3) + 1}`} key={r.who}>
              <span className="stars">★★★★★</span>
              <p>“{r.q}”</p>
              <span className="who">
                <b>{r.who}</b> · {r.when}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
