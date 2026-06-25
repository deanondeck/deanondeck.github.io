import { BOARD, PORTS } from "@/lib/content";
import { img } from "@/lib/media";

export default function Ports() {
  return (
    <section className="band band--shell" id="ports">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log">Ports of Call</p>
          <h2 className="display h-lg">
            Where shall we point <em>the bow?</em>
          </h2>
          <p className="lede">
            A few of the routes sailors love. Dreaming of Iceland, Alaska, or
            somewhere off the map? Just ask — I&apos;ll chart it.
          </p>
        </div>
      </div>
      <div className="board" aria-hidden="true">
        <div className="board-track">
          {[...BOARD, ...BOARD].map((p, i) => (
            <span key={i}>{p}</span>
          ))}
        </div>
      </div>
      <div className="wrap">
        <div className="ports">
          {PORTS.map((p, i) => (
            <article className={`port reveal d${(i % 3) + 1}`} key={p.c}>
              <img src={img(p.img)} alt={p.c} />
              <span className="coord">{p.t}</span>
              <h3>{p.c}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
