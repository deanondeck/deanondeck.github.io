import { INSTAGRAM_URL } from "@/lib/site";

/* The old site's "Follow the journey 🌊" Instagram band. */
export default function InstagramCta() {
  return (
    <section className="band band--black insta">
      <div className="wrap reveal">
        <span className="script">Follow the journey</span>
        <h2 className="display h-md" style={{ marginBottom: "1rem" }}>
          Life at sea, on the feed.
        </h2>
        <p>
          Cruise moments, the latest deals, and life at sea with Dean on Deck —
          new ports every week.
        </p>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-light">
          @dean__on__deck <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
}
