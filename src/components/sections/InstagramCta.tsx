import { INSTAGRAM_URL } from "@/lib/site";
import { img } from "@/lib/media";

/* The old site's "Follow the journey 🌊" Instagram band, anchored by
   Dean's shot from the scarlet balcony hammock. */
export default function InstagramCta() {
  return (
    <section className="band band--black insta">
      <div className="wrap insta-grid reveal">
        <div className="insta-photo">
          <img
            src={img("dean-hero")}
            alt="Dean relaxing in the red rope hammock on his Virgin Voyages balcony"
            loading="lazy"
          />
          <span className="stamp">The balcony hammock · at sea</span>
        </div>
        <div className="insta-body">
          <span className="script">Follow the journey</span>
          <h2 className="display h-md" style={{ marginBottom: "1rem" }}>
            Life at sea, on the feed.
          </h2>
          <p>
            Cruise moments, the latest deals, and life at sea with Dean on Deck
            — new ports every week.
          </p>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-light">
            @dean__on__deck <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
