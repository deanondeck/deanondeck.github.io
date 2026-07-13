import { voyageSearch } from "@/lib/voyages";

/* The old site's "Two Ways to Book" — self-serve link vs. full service. */
export default function TwoWays() {
  return (
    <section className="band band--ink" id="book">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log">Two Ways to Book</p>
          <h2 className="display h-lg">
            Book it yourself, <em>or let me make ship happen.</em>
          </h2>
        </div>
        <div className="ways">
          <div className="way reveal d1">
            <span className="k">Fast &amp; easy</span>
            <h3>Book it yourself</h3>
            <p>
              Ready to dive in? Book through my direct link and you still get
              the extras — qualifying Sea Terrace and RockStar bookings come
              loaded with Sailor Loot for spa days, cocktails, or whatever
              floats your boat.
            </p>
            <a href={voyageSearch()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Book with my link <span className="arrow">→</span>
            </a>
          </div>
          <div className="way gold reveal d2">
            <span className="k">Even better deals</span>
            <h3>Book with me</h3>
            <p>
              I can offer exclusive extras beyond the link: personalized cabin
              picks, an MNVV certificate if you don&apos;t have one, and the
              absolute best deal for a cruise tailored just for you. Tell me
              where you want to go.
            </p>
            <a href="#contact" className="btn btn-scarlet">
              Get in touch <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
