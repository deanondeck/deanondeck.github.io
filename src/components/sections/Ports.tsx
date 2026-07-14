import { img } from "@/lib/media";
import { voyageSearch } from "@/lib/voyages";
import { renderInline } from "@/lib/cms/markdown";
import type { SectionProps } from "@/lib/cms/types";

type PortItem = { img: string; c: string; t: string; q: string };
type PortsContent = {
  eyebrow: string;
  heading: string;
  lede: string;
  board: string[];
  items: PortItem[];
};

export default function Ports({ content }: SectionProps) {
  const c = content as PortsContent;
  return (
    <section className="band band--shell" id="ports">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="log">{c.eyebrow}</p>
          <h2 className="display h-lg">{renderInline(c.heading)}</h2>
          <p className="lede">{c.lede}</p>
        </div>
      </div>
      <div className="board" aria-hidden="true">
        <div className="board-track">
          {[...c.board, ...c.board].map((p, i) => (
            <span key={i}>{p}</span>
          ))}
        </div>
      </div>
      <div className="wrap">
        <div className="ports">
          {c.items.map((p, i) => (
            <a
              className={`port reveal d${(i % 3) + 1}`}
              key={p.c}
              href={voyageSearch(p.q)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Explore ${p.c} voyages on Virgin Voyages`}
            >
              <img src={img(p.img)} alt={p.c} />
              <span className="coord">{p.t}</span>
              <h3>{p.c}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
