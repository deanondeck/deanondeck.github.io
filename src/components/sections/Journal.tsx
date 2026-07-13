import { JOURNAL } from "@/lib/content";

/* "From the Deck" — the old site's dispatches: Seattle, Sitka, Scarlet
   Night, and Dean's why-I-sail note, kept as a story wall. */
export default function Journal() {
  return (
    <section className="band band--ink2" id="journal">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log">From the Deck</p>
          <h2 className="display h-lg">
            Notes from the <em>latest sailings.</em>
          </h2>
          <p className="lede">
            Ports I&apos;ve walked, tours I&apos;ve tested, nights worth staying
            up for — straight from Dean&apos;s deck log.
          </p>
        </div>
        <div className="journal">
          {JOURNAL.map((e, i) => (
            <article className={`entry reveal d${(i % 3) + 1}`} key={e.t}>
              <span className="k">{e.k}</span>
              <h3>{e.t}</h3>
              <p>{e.d}</p>
              <span className="sea">{e.sea}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
