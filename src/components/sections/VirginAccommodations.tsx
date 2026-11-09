"use client";
import { useEffect, useRef, useState } from "react";

const tabs = [
  { title: "Cabins & Sea Terraces", subtitle: "Beautifully uncomplicated", text: "Explore thoughtfully designed cabins and Sea Terrace rooms with private outdoor space on select accommodations.", rooms: ["Insider", "Sea View", "Sea Terrace", "XL Sea Terrace"] },
  { title: "RockStar Suites", subtitle: "Suite life, elevated", text: "A collection of distinctive suites with elevated service and RockStar privileges. Specific benefits vary by sailing and suite.", rooms: ["Seriously Suite", "Brilliant Suite", "Cheeky Corner Suite", "Sweet Aft Suite"] },
  { title: "Mega RockStar Suites", subtitle: "The ultimate indulgence", text: "Virgin's most exclusive suite collection, designed around generous spaces and a higher-touch onboard experience.", rooms: ["Massive Suite", "Fab Suite", "Posh Suite", "Gorgeous Suite"] },
  { title: "Accessible Accommodations", subtitle: "Comfort for every sailor", text: "Accessible accommodation options are available in select categories. Ask Dean to confirm the precise features and availability for your sailing.", rooms: ["Accessible cabins", "Accessible Sea Terrace options", "Accessible suite options — verify availability"] }
];
export default function VirginAccommodations() {
  const [active, setActive] = useState<number | null>(null);
  const close = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (active === null) return;
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive(v => v === null ? null : (v + 1) % tabs.length);
      if (e.key === "ArrowLeft") setActive(v => v === null ? null : (v + tabs.length - 1) % tabs.length);
    };
    document.addEventListener("keydown", onKey);
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = old; opener.current?.focus(); };
  }, [active === null]);
  const open = (i: number, e: React.MouseEvent<HTMLButtonElement>) => { opener.current = e.currentTarget; setActive(i); };
  return <>
    <div className="virgin-accommodation-launch">
      <p className="virgin-accommodation-kicker">Explore your space at sea</p>
      <h3>Find your perfect Virgin accommodation</h3>
      <p>Take a closer look at cabins, RockStar suites, and accessible options.</p>
      <div className="virgin-accommodation-launch-grid">
        {tabs.map((t,i) => <button type="button" key={t.title} onClick={e=>open(i,e)}>{t.title}<span aria-hidden="true"> ↗</span></button>)}
      </div>
    </div>
    {active !== null && <div className="virgin-accommodation-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setActive(null)}}>
      <section className="virgin-accommodation-dialog" role="dialog" aria-modal="true" aria-labelledby="virgin-accommodation-title">
        <button className="virgin-accommodation-close" type="button" ref={close} aria-label="Close accommodation guide" onClick={()=>setActive(null)}>×</button>
        <p className="virgin-accommodation-kicker">Virgin Voyages · Accommodations</p>
        <div className="virgin-accommodation-tabs" role="tablist" aria-label="Accommodation categories">
          {tabs.map((t,i)=><button key={t.title} type="button" role="tab" aria-selected={active===i} onClick={()=>setActive(i)}>{t.title}</button>)}
        </div>
        <div className="virgin-accommodation-content">
          <p className="virgin-accommodation-subtitle">{tabs[active].subtitle}</p>
          <h3 id="virgin-accommodation-title">{tabs[active].title}</h3>
          <p>{tabs[active].text}</p>
          <ul>{tabs[active].rooms.map(room=><li key={room}>{room}</li>)}</ul>
          <p className="virgin-accommodation-note">Room configurations and inclusions may change. Confirm details for your specific ship and sailing.</p>
        </div>
        <div className="virgin-accommodation-controls">
          <button type="button" onClick={()=>setActive((active+tabs.length-1)%tabs.length)} aria-label="Previous accommodation category">← Previous</button>
          <span>{active+1} of {tabs.length}</span>
          <button type="button" onClick={()=>setActive((active+1)%tabs.length)} aria-label="Next accommodation category">Next →</button>
        </div>
      </section>
    </div>}
  </>;
}
