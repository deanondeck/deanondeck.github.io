import type { SectionProps } from "@/lib/cms/types";

type TickerContent = { items: string[] };

export default function Ticker({ content }: SectionProps) {
  const c = content as TickerContent;
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[...c.items, ...c.items].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
