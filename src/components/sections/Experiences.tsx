import { EXPERIENCES } from "@/lib/content";
import { img } from "@/lib/media";

/* The old site's "Dean...on Deck Voyage Distinction" card wall. */
export default function Experiences() {
  return (
    <section className="band band--shell2" id="experiences">
      <div className="wrap">
        <div className="sec-head center reveal">
          <p className="log log--center">Voyage Distinction</p>
          <span className="script">beyond the waves</span>
          <h2 className="display h-lg">Unforgettable Virgin Voyages.</h2>
          <p className="lede" style={{ marginInline: "auto" }}>
            Discover captivating adventures beyond the waves — excursions and
            experiences I&apos;ll help you find, book, and love.
          </p>
        </div>
        <div className="xp">
          {EXPERIENCES.map((x, i) => (
            <article className={`xp-card reveal d${(i % 3) + 1}`} key={x.t}>
              <img src={img(x.img)} alt={x.t} />
              <div className="xp-body">
                <span className="k">{x.k}</span>
                <h3>{x.t}</h3>
                <p>{x.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
