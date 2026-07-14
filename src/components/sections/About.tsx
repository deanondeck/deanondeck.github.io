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

export default function About({ id, content }: SectionProps) {
  const c = content as AboutContent;
  return (
    <section className="band band--shell" id="difference" data-cms-id={id}>
      <div className="wrap about-grid">
        <div className="about-photo reveal">
          <img src={img(c.photo)} alt={c.photoAlt} data-cms-field="photo" />
          <span className="stamp" data-cms-field="stamp">{c.stamp}</span>
        </div>
        <div className="about-body">
          <p className="log" data-cms-field="eyebrow">{c.eyebrow}</p>
          <h2 className="display h-lg reveal" data-cms-field="heading">
            {renderInline(c.heading)}
          </h2>
          <div className="reveal d1">
            <RichText markdown={c.body} fieldId="body" />
            <p className="sig" data-cms-field="signature">{c.signature}</p>
            <p>
              <a className="cl-alt" href={c.ctaHref} data-cms-field="ctaLabel">
                {c.ctaLabel}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
