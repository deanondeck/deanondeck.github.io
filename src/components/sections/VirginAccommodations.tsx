"use client";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

const suiteFacts: Record<string, { detail: string; link: string }> = {
  "Brilliant Suite": { detail: "Interior 396 sq ft · terrace approximately 86 sq ft.", link: "https://www.virginvoyages.com/cabins/rockstar-quarters" },
  "Seriously Suite": { detail: "Interior 284 sq ft · terrace 68 sq ft.", link: "https://www.virginvoyages.com/cabins/rockstar-quarters" },
  "Cheeky Corner Suite": { detail: "Interior 311 sq ft. Terrace varies: Pretty Big 304–306.5 sq ft; Even Bigger 349–397 sq ft; Biggest 442.42–536.8 sq ft. Photos must match the selected configuration.", link: "https://www.virginvoyages.com/cabins/rockstar-quarters" },
  "Sweet Aft Suite": { detail: "Interior 236 sq ft. Terrace varies: Pretty Big 180–182 sq ft; Even Bigger 223.6–268 sq ft; Biggest 321.8–425 sq ft.", link: "https://www.virginvoyages.com/cabins/rockstar-quarters" }
};

const tabs = [
  { title: "Cabins & Sea Terraces", subtitle: "Beautifully uncomplicated", text: "Explore thoughtfully designed cabins and Sea Terrace rooms with private outdoor space on select accommodations.", rooms: ["Insider", "Sea View", "Sea Terrace", "XL Sea Terrace"] },
  { title: "RockStar Suites", subtitle: "Suite life, elevated", text: "A collection of distinctive suites with elevated service and RockStar privileges. Specific benefits vary by sailing and suite.", rooms: ["Seriously Suite", "Brilliant Suite", "Cheeky Corner Suite", "Sweet Aft Suite"] },
  { title: "Mega RockStar Suites", subtitle: "The ultimate indulgence", text: "Virgin's most exclusive suite collection, designed around generous spaces and a higher-touch onboard experience.", rooms: ["Massive Suite", "Fab Suite", "Posh Suite", "Gorgeous Suite"] },
  { title: "Accessible Accommodations", subtitle: "Comfort for every sailor", text: "Accessible accommodation options are available in select categories. Ask Dean to confirm the precise features and availability for your sailing.", rooms: ["Accessible cabins", "Accessible Sea Terrace options", "Accessible suite options — verify availability"] }
];
export default function VirginAccommodations() {
  const [active, setActive] = useState<number | null>(null);
  const close = useRef<HTMLButtonElement>(null);
  const [room, setRoom] = useState<string | null>(null);
  const [enlarged, setEnlarged] = useState<string | null>(null);
  const roomClose = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (active === null) return;
    if (room) roomClose.current?.focus(); else close.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { if (enlarged) setEnlarged(null); else if (room) setRoom(null); else setActive(null); }
      if (!room && e.key === "ArrowRight") setActive(v => v === null ? null : (v + 1) % tabs.length);
      if (!room && e.key === "ArrowLeft") setActive(v => v === null ? null : (v + tabs.length - 1) % tabs.length);
    };
    document.addEventListener("keydown", onKey);
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = old; opener.current?.focus(); };
  }, [active, room, enlarged]);
  const photos: Record<string, { interior: string; terrace?: string; note?: string; interiorLabel?: string; terraceLabel?: string; second?: string; secondLabel?: string }> = {
    "Insider": { interior: "/img/cabins/insider-entertainment-mode.jpg", interiorLabel: "Insider cabin · Entertainment Mode lighting" },
    "Sea Terrace": { interior: "/img/cabins/sea-terrace-interior.jpg", terrace: "/img/cabins/sea-terrace-balcony.jpg", interiorLabel: "Sea Terrace bedroom", terraceLabel: "Private balcony with hammock" },
    "XL Sea Terrace": { interior: "/img/cabins/xl-sea-terrace.jpg", second: "/img/cabins/xl-sea-terrace-detail.jpg", interiorLabel: "XL Sea Terrace cabin", secondLabel: "XL Sea Terrace interior detail" },
    "Brilliant Suite": { interior: "/img/rockstar/brilliant-suite-01.jpeg", terrace: "/img/rockstar/brilliant-suite-02.jpeg" },
    "Seriously Suite": { interior: "/img/rockstar/seriously-suite-01.jpeg", terrace: "/img/rockstar/seriously-suite-02.jpeg" },
    "Cheeky Corner Suite": { interior: "/img/rockstar/cheeky-corner-suite-01.jpeg", terrace: "/img/rockstar/cheeky-corner-suite-02.jpeg", note: "Terrace photograph: Dean’s Cheeky Corner Biggest Terrace. Pretty Big and Even Bigger are different configurations and are not pictured here." },
    "Sweet Aft Suite": { interior: "/img/rockstar/sweet-aft-suite-01.jpeg", terrace: "/img/rockstar/sweet-aft-suite-02.jpeg", note: "Sweet Aft terrace photograph. Pretty Big, Even Bigger and Biggest terrace layouts vary; confirm the exact configuration for your sailing." }
  };
  const open = (i: number, e: MouseEvent<HTMLButtonElement>) => { opener.current = e.currentTarget; setActive(i); };
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
          {tabs.map((t,i)=><button key={t.title} type="button" role="tab" aria-selected={active===i} onClick={()=>(setRoom(null),setActive(i))}>{t.title}</button>)}
        </div>
        <div className="virgin-accommodation-content">
          <p className="virgin-accommodation-subtitle">{tabs[active].subtitle}</p>
          <h3 id="virgin-accommodation-title">{tabs[active].title}</h3>
          <p>{tabs[active].text}</p>
          <ul className="virgin-accommodation-room-list">{tabs[active].rooms.map(name=><li key={name}><button type="button" onClick={()=>setRoom(name)}>{name} <span aria-hidden="true">↗</span></button></li>)}</ul>
          <p className="virgin-accommodation-note">Room configurations and inclusions may change. Confirm details for your specific ship and sailing.</p>
        </div>
        <div className="virgin-accommodation-controls">
          <button type="button" onClick={()=>{setRoom(null);setActive((active+tabs.length-1)%tabs.length)}} aria-label="Previous accommodation category">← Previous</button>
          <span>{active+1} of {tabs.length}</span>
          <button type="button" onClick={()=>{setRoom(null);setActive((active+1)%tabs.length)}} aria-label="Next accommodation category">Next →</button>
        </div>
      </section>
      {room && <div className="virgin-room-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setRoom(null)}}>
        <section className="virgin-room-dialog" role="dialog" aria-modal="true" aria-label={room + " accommodation viewer"}>
          <button type="button" ref={roomClose} className="virgin-accommodation-close" aria-label="Close room viewer" onClick={()=>setRoom(null)}>×</button>
          <p className="virgin-accommodation-kicker">{tabs[active].title}</p>
          <h3>{room}</h3>
          {suiteFacts[room] && <p className="virgin-accommodation-note">{suiteFacts[room].detail}</p>}
          <div className="virgin-room-photo-grid">
            {photos[room] ? <>
              <button type="button" className="virgin-room-photo-tile" onClick={()=>setEnlarged(photos[room].interior)} aria-label={"Enlarge " + room + " interior photograph"}><img src={photos[room].interior} alt={room + " interior photograph"} loading="lazy" /><span>{photos[room].interiorLabel || "Suite interior"} · enlarge ↗</span></button>
              {photos[room].terrace || photos[room].second ? <button type="button" className="virgin-room-photo-tile" onClick={()=>setEnlarged(photos[room].terrace || photos[room].second!)} aria-label={"Enlarge " + room + " second photograph"}><img src={photos[room].terrace || photos[room].second} alt={room === "Cheeky Corner Suite" ? "Cheeky Corner Biggest Terrace — Dean’s photograph" : photos[room].secondLabel || room + " terrace photograph"} loading="lazy" /><span>{room === "Cheeky Corner Suite" ? "Biggest Terrace · enlarge ↗" : photos[room].terraceLabel ? photos[room].terraceLabel + " · enlarge ↗" : photos[room].secondLabel ? photos[room].secondLabel + " · enlarge ↗" : "Private terrace · enlarge ↗"}</span></button> : <div className="virgin-room-photo-placeholder"><strong>Terrace photograph</strong><span>Exact suite terrace photograph not yet verified</span></div>}
            </> : <div className="virgin-room-photo-placeholder"><strong>Accommodation photograph</strong><span>Verified photograph pending</span></div>}
          </div>
          {photos[room]?.note && <p className="virgin-accommodation-note">{photos[room].note}</p>}
          {suiteFacts[room] && <p><a href={suiteFacts[room].link} target="_blank" rel="noopener noreferrer">Explore More — Virgin Voyages ↗</a></p>}
          <div className="virgin-accommodation-controls">
            <button type="button" onClick={()=>setRoom(tabs[active].rooms[(tabs[active].rooms.indexOf(room)+tabs[active].rooms.length-1)%tabs[active].rooms.length])}>← Previous</button>
            <span>{tabs[active].rooms.indexOf(room)+1} of {tabs[active].rooms.length}</span>
            <button type="button" onClick={()=>setRoom(tabs[active].rooms[(tabs[active].rooms.indexOf(room)+1)%tabs[active].rooms.length])}>Next →</button>
          </div>
        </section>
      </div>}
      {enlarged && <div className="virgin-room-backdrop" onClick={()=>setEnlarged(null)} role="presentation"><div role="dialog" aria-modal="true" aria-label="Enlarged suite photograph" style={{position:"relative",maxWidth:"min(94vw,1100px)",margin:"auto"}}><button type="button" className="virgin-accommodation-close" onClick={()=>setEnlarged(null)} aria-label="Close enlarged photograph">×</button><img src={enlarged} alt="Enlarged suite photograph" style={{display:"block",maxWidth:"100%",maxHeight:"85vh",objectFit:"contain"}} /></div></div>}
    </div>}
  </>;
}
