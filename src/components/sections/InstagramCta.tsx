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
export default function InstagramCta({ id, content }: SectionProps) {
  const c = content as InstagramCtaContent;
  return (
    <section className="band band--black insta" data-cms-id={id}>
      <div className="wrap insta-grid reveal">
        <div className="insta-photo">
          <img
            src={img(c.image)}
            alt={c.imageAlt}
            loading="lazy"
            data-cms-field="image"
          />
          <span className="stamp" data-cms-field="stamp">{c.stamp}</span>
        </div>
        <div className="insta-body">
          <span className="script" data-cms-field="script">{c.script}</span>
          <h2 className="display h-md" style={{ marginBottom: "1rem" }} data-cms-field="heading">
            {c.heading}
          </h2>
          <p data-cms-field="body">
            {c.body}
          </p>
          <a href={c.ctaHref} target="_blank" rel="noopener noreferrer" className="btn btn-light" data-cms-field="ctaLabel">
            {c.ctaLabel} <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
