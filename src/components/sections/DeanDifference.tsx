import { renderInline } from "@/lib/cms/markdown";
import type { SectionProps } from "@/lib/cms/types";

type Stat = { num: string; unit?: string; lab: string };
type Pillar = { k: string; title: string; body: string };
type DeanDifferenceContent = {
  eyebrow: string;
  heading: string;
  lede: string;
  stats: Stat[];
  pillars: Pillar[];
};

export default function DeanDifference({ id, content }: SectionProps) {
  const c = content as DeanDifferenceContent;
  return (
    <section className="band band--ink2" id="philosophy" data-cms-id={id}>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log" data-cms-field="eyebrow">{c.eyebrow}</p>
          <h2 className="display h-lg" data-cms-field="heading">
            {renderInline(c.heading)}
          </h2>
          <p className="lede" data-cms-field="lede">
            {c.lede}
          </p>
        </div>
        <div className="stats" data-cms-field="stats">
          {c.stats.map((s, i) => (
            <div className={`stat reveal d${i + 1}`} key={s.lab}>
              <div className="num">{s.num}{s.unit && <span style={{ fontSize: "1.4rem" }}>{s.unit}</span>}</div>
              <div className="lab">{s.lab}</div>
            </div>
          ))}
        </div>
        <div className="pillars" data-cms-field="pillars">
          {c.pillars.map((p, i) => (
            <div className={`pillar reveal d${i + 1}`} key={p.title}>
              <span className="k">{p.k}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
