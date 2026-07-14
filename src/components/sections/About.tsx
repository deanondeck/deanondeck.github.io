import { img } from "@/lib/media";
import { renderInline, RichText } from "@/lib/cms/markdown";
import type { SectionProps } from "@/lib/cms/types";

type AboutContent = {
  eyebrow: string;
  heading: string;
  body: string;
  signature: string;
  ctaLabel: string;
  ctaHref: string;
  photo: string;
  photoAlt: string;
  stamp: string;
};

export default function About({ content }: SectionProps) {
  const c = content as AboutContent;
  return (
    <section className="band band--shell" id="difference">
      <div className="wrap about-grid">
        <div className="about-photo reveal">
          <img src={img(c.photo)} alt={c.photoAlt} />
          <span className="stamp">{c.stamp}</span>
        </div>
        <div className="about-body">
          <p className="log">{c.eyebrow}</p>
          <h2 className="display h-lg reveal">
            {renderInline(c.heading)}
          </h2>
          <div className="reveal d1">
            <RichText markdown={c.body} />
            <p className="sig">{c.signature}</p>
            <p>
              <a className="cl-alt" href={c.ctaHref}>
                {c.ctaLabel}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
