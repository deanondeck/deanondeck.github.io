import { img } from "@/lib/media";
import type { SectionProps } from "@/lib/cms/types";

type InstagramCtaContent = {
  image: string;
  imageAlt: string;
  stamp: string;
  script: string;
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

/* The old site's "Follow the journey 🌊" Instagram band, anchored by
   Dean's shot from the scarlet balcony hammock. */
export default function InstagramCta({ content }: SectionProps) {
  const c = content as InstagramCtaContent;
  return (
    <section className="band band--black insta">
      <div className="wrap insta-grid reveal">
        <div className="insta-photo">
          <img
            src={img(c.image)}
            alt={c.imageAlt}
            loading="lazy"
          />
          <span className="stamp">{c.stamp}</span>
        </div>
        <div className="insta-body">
          <span className="script">{c.script}</span>
          <h2 className="display h-md" style={{ marginBottom: "1rem" }}>
            {c.heading}
          </h2>
          <p>
            {c.body}
          </p>
          <a href={c.ctaHref} target="_blank" rel="noopener noreferrer" className="btn btn-light">
            {c.ctaLabel} <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
