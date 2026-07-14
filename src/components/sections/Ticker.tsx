import type { SectionProps } from "@/lib/cms/types";

type TickerContent = { items: string[] };

export default function Ticker({ id, content }: SectionProps) {
  const c = content as TickerContent;
  return (
    <div className="ticker" aria-hidden="true" data-cms-id={id}>
      <div className="ticker-track" data-cms-field="items">
        {[...c.items, ...c.items].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
