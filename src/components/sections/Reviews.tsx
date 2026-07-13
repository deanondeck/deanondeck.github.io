import { REVIEWS } from "@/lib/content";
import { GOOGLE_REVIEWS_URL } from "@/lib/site";

export default function Reviews() {
  return (
    <section className="band band--shell" id="reviews">
      <div className="wrap">
        <div className="sec-head center reveal">
          <p className="log log--center">Dean on Deck · Google Reviews</p>
          <h2 className="display h-lg">What our Sailors are saying.</h2>
          <div className="proof">
            <span className="proof-num">5.0</span>
            <span className="stars" aria-label="Rated 5 out of 5 stars">
              ★★★★★
            </span>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the reviews on Google <span className="arrow">→</span>
            </a>
          </div>
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
