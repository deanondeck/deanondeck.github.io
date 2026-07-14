import { img } from "@/lib/media";
import { renderInline } from "@/lib/cms/markdown";
import type { SectionProps } from "@/lib/cms/types";

/* /about — the First Mate's letter. Dean's own words, set as a personal note:
   script salutation in the hero, serif letter body on paper, the 30-day
   transfer question raised as the letter's one gold flag (routes to /manage),
   and proof shots from his own deck. All copy is CMS-editable. */

type Action = {
  label: string;
  href: string;
  variant: "scarlet" | "ghost" | "ink";
  arrow?: boolean;
};
type ProofShot = { img: string; alt: string; cap: string };
type AboutMeContent = {
  hero: {
    eyebrow: string;
    script: string;
    heading: string;
    lede: string;
    photo: string;
    photoAlt: string;
    stamp: string;
  };
  letter: {
    intro: string;
    flag: { heading: string; body: string; ctaLabel: string; ctaHref: string; fine: string };
    afterFlag: string;
    duo: { k: string; body: string }[];
    other: string;
    thanks: string;
    signature: string;
    role: string;
  };
  proof: {
    eyebrow: string;
    heading: string;
    lede: string;
    strip: ProofShot[];
    ratingNum: string;
    reviewsLabel: string;
    reviewsHref: string;
  };
  cta: { eyebrow: string; heading: string; lede: string; actions: Action[] };
};

const btnClass = (v: Action["variant"]) => `btn btn-${v}`;

export default function AboutMe({ content }: SectionProps) {
  const c = content as AboutMeContent;
  const { hero, letter, proof, cta } = c;

  return (
    <>
      {/* ---- hero: the letter's opening line ---- */}
      <section className="band band--black about-hero" id="about-dean">
        <div className="wrap ah-grid">
          <div className="ah-body">
            <p className="log">{hero.eyebrow}</p>
            <span className="script reveal">{hero.script}</span>
            <h1 className="display h-xl reveal">{renderInline(hero.heading)}</h1>
            <p className="lede reveal d1">{hero.lede}</p>
          </div>
          <figure className="ah-photo reveal d2">
            <img src={img(hero.photo)} alt={hero.photoAlt} />
            <span className="stamp">{hero.stamp}</span>
          </figure>
        </div>
      </section>

      {/* ---- the letter ---- */}
      <section className="band band--shell2">
        <div className="wrap">
          <div className="letter">
            <p className="reveal">{renderInline(letter.intro)}</p>

            <div className="letter-flag reveal">
              <h2>{letter.flag.heading}</h2>
              <p>{renderInline(letter.flag.body)}</p>
              <a className="btn btn-ink" href={letter.flag.ctaHref}>
                {letter.flag.ctaLabel} <span className="arrow">→</span>
              </a>
              <p className="fine">{letter.flag.fine}</p>
            </div>

            <p className="reveal">{renderInline(letter.afterFlag)}</p>

            <div className="letter-duo">
              {letter.duo.map((d, i) => (
                <div className={`duo-card reveal${i > 0 ? ` d${i}` : ""}`} key={d.k}>
                  <span className="k">{d.k}</span>
                  <p>{renderInline(d.body)}</p>
                </div>
              ))}
            </div>

            <p className="reveal">{renderInline(letter.other)}</p>

            <p className="reveal">{renderInline(letter.thanks)}</p>

            <p className="sig reveal">{letter.signature}</p>
            <p className="letter-role">{letter.role}</p>
          </div>
        </div>
      </section>

      {/* ---- proof: his own deck, not a stock library ---- */}
      <section className="band band--ink">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="log">{proof.eyebrow}</p>
            <h2 className="display h-lg">{renderInline(proof.heading)}</h2>
            <p className="lede">{proof.lede}</p>
          </div>
          <div className="proof-strip">
            {proof.strip.map((p, i) => (
              <figure key={p.img} className={`reveal d${i + 1}`}>
                <img src={img(p.img)} alt={p.alt} loading="lazy" />
                <figcaption>{p.cap}</figcaption>
              </figure>
            ))}
          </div>
          <div className="proof reveal">
            <span className="proof-num">{proof.ratingNum}</span>
            <span className="stars" aria-label="Rated 5 out of 5 stars">
              ★★★★★
            </span>
            <a href={proof.reviewsHref} target="_blank" rel="noopener noreferrer">
              {proof.reviewsLabel}
            </a>
          </div>
        </div>
      </section>

      {/* ---- closing CTA (shared closing-band styles from /cruises) ---- */}
      <section className="band band--black cl-cta">
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="log log--center">{cta.eyebrow}</p>
            <h2 className="display h-lg">{renderInline(cta.heading)}</h2>
            <p className="lede">{cta.lede}</p>
            <div className="cl-cta-actions">
              {cta.actions.map((a) => (
                <a className={btnClass(a.variant)} href={a.href} key={a.label}>
                  {a.label}
                  {a.arrow && (
                    <>
                      {" "}
                      <span className="arrow">→</span>
                    </>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
