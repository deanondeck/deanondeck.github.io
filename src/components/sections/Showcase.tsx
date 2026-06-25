import { SHOWCASE } from "@/lib/content";
import { img } from "@/lib/media";

export default function Showcase() {
  return (
    <section className="band band--ink" id="adults">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log">Why Virgin Voyages</p>
          <h2 className="display h-lg">
            Every detail designed <em>for adults.</em>
          </h2>
          <p className="lede">
            No kids&apos; menus. No water slides. Just Michelin-inspired dining,
            world-class wellness, and sea days made entirely for the grown-up
            escape.
          </p>
        </div>
        <div className="showcase">
          {SHOWCASE.map((s, i) => (
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
