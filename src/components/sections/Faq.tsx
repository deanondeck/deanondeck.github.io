import type { SectionProps } from "@/lib/cms/types";

type FaqBodyItem = { h: string; text: string };
type FaqItem = { q: string; body: FaqBodyItem[] };
type FaqContent = {
  eyebrow: string;
  heading: string;
  items: FaqItem[];
};

/* Essential FAQs for travelers — fare tiers, Pay-In-Full, MNVV, transfers. */
export default function Faq({ content }: SectionProps) {
  const c = content as FaqContent;
  return (
    <section className="band band--shell" id="faq">
      <div className="wrap">
        <div className="sec-head center reveal">
          <p className="log log--center">{c.eyebrow}</p>
          <h2 className="display h-lg">{c.heading}</h2>
        </div>
        <div className="faq reveal d1">
          {c.items.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <div className="faq-body">
                {f.body.map((b) => (
                  <div key={b.h}>
                    <h4>{b.h}</h4>
                    <p>{b.text}</p>
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
