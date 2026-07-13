import { FLEET } from "@/lib/content";

/* "Discover Unique Voyages" — the old site's beyond-Virgin portfolio. */
export default function Fleet() {
  return (
    <section className="band band--shell2" id="fleet">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log">Beyond Virgin</p>
          <h2 className="display h-lg">
            A different kind of <em>getaway?</em>
          </h2>
          <p className="lede">
            We love Virgin&apos;s bold, adults-only energy — but it isn&apos;t
            the perfect fit for every traveler. Family reunion, ultra-luxury
            escape, or specialty charter: request me by name as your Travel
            Advisor, or reach out and I&apos;ll handle every detail.
          </p>
        </div>
        <div className="fleet">
          {FLEET.map((l, i) => (
            <article className={`line-card reveal d${(i % 4) + 1}`} key={l.t}>
              <span className="k">{l.k}</span>
              <h3>{l.t}</h3>
              <p>{l.d}</p>
            </article>
          ))}
        </div>
        <p className="coming reveal">
          <b>Coming soon:</b> Disney Cruise Line, Norwegian Cruise Line, and
          Princess Cruises join the lineup — plus one special line. Stay tuned,
          or email me with questions and bookings in the meantime.
        </p>
      </div>
    </section>
  );
}
