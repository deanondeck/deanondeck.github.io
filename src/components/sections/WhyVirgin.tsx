import { img } from "@/lib/media";

export default function WhyVirgin() {
  return (
    <section className="band band--ink2">
      <div className="wrap split">
        <div className="split-media reveal">
          <img src={img("virgin-scarlet-ship")} alt="The scarlet-hulled Virgin Voyages ship at sea" />
          <div className="badge-float">
            <div className="bt">Signature event</div>
            <div className="bm">Scarlet Night</div>
          </div>
        </div>
        <div>
          <p className="log">The Ship</p>
          <h2 className="display h-lg reveal">
            Virgin reinvented what cruising means.
          </h2>
          <p className="lede reveal d1" style={{ marginTop: "1.2rem" }}>
            Smaller ships. Bolder design. An energy that feels more boutique
            hotel than floating buffet — and absolutely no one under 18.
          </p>
          <ul className="checklist reveal d2">
            <li>Kid-free sailings with a genuinely sophisticated crowd</li>
            <li>Michelin-inspired dining included — no surcharges, no buffets</li>
            <li>Stylish, modern ships built by designers, not committees</li>
            <li>Premium entertainment and a real after-dark scene</li>
            <li>Wellness-forward: spa, fitness, and sea-air everything</li>
            <li>Caribbean, Mediterranean, and beyond</li>
          </ul>
          <a href="#contact" className="btn btn-scarlet reveal d3">
            Start planning <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
