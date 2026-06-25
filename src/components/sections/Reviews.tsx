import { REVIEWS } from "@/lib/content";

export default function Reviews() {
  return (
    <section className="band band--shell" id="reviews">
      <div className="wrap">
        <div className="sec-head center reveal">
          <p className="log log--center">From the Crew · Google Reviews</p>
          <h2 className="display h-lg">What sailors say.</h2>
        </div>
        <div className="reviews">
          {REVIEWS.map((r, i) => (
            <article className={`review reveal d${(i % 3) + 1}`} key={r.who}>
              <span className="stars">★★★★★</span>
              <p>“{r.q}”</p>
              <span className="who">
                <b>{r.who}</b> · {r.when}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
