import { FAQ } from "@/lib/content";

/* Essential FAQs for travelers — fare tiers, Pay-In-Full, MNVV, transfers. */
export default function Faq() {
  return (
    <section className="band band--shell" id="faq">
      <div className="wrap">
        <div className="sec-head center reveal">
          <p className="log log--center">Essential FAQs</p>
          <h2 className="display h-lg">Know before you sail.</h2>
        </div>
        <div className="faq reveal d1">
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <div className="faq-body">
                {f.body.map(([h, text]) => (
                  <div key={h}>
                    <h4>{h}</h4>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
