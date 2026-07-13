import { img } from "@/lib/media";

export default function About() {
  return (
    <section className="band band--shell" id="difference">
      <div className="wrap about-grid">
        <div className="about-photo reveal">
          <img src={img("dean")} alt="Dean Satterfield with fellow sailors" />
          <span className="stamp">Dean Satterfield · First Mate</span>
        </div>
        <div className="about-body">
          <p className="log">Your First Mate</p>
          <h2 className="display h-lg reveal">
            Ahoy — I&apos;m Dean.
          </h2>
          <div className="reveal d1">
            <p>
              Better known as <b>Dean on Deck</b>. Whether you&apos;re sailing
              solo or rallying the whole crew for a celebration, I make booking
              your Virgin Voyages cruise effortless — start to gangway.
            </p>
            <p>
              As a Gold-Certified Virgin Voyages First Mate, I&apos;ll handle the
              details, unlock the perks, and point you to the best spots onboard.
              You just show up and sail.
            </p>
            <p>
              Ready to chase the horizon? Pure happiness, zero stress. Let&apos;s
              do this.
            </p>
            <p className="sig">— Dean</p>
            <p>
              <a className="cl-alt" href="/about">
                Read my full story →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
