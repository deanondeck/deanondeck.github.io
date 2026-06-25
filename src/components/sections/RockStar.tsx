import { CORE, MEGA } from "@/lib/content";

export default function RockStar() {
  return (
    <section className="band band--ink" id="rockstar">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log">Cruise Like a RockStar</p>
          <h2 className="display h-lg">
            RockStar perks, <em>handled.</em>
          </h2>
          <p className="lede">
            RockStar Quarters are Virgin&apos;s VIP experience — and it starts the
            moment you reach the terminal. I&apos;ll match you to the right tier
            and lock in the early booking windows.
          </p>
        </div>
        <div className="tiers">
          <div className="tier reveal d1">
            <span className="tier-tag">All suites</span>
            <h3>Core RockStar</h3>
            <ul>
              {CORE.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="tier mega reveal d2">
            <span className="tier-tag">Top-tier suites</span>
            <h3>Mega RockStar</h3>
            <ul>
              {MEGA.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
