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
  const [room, setRoom] = useState<string | null>(null);
  const roomClose = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (active === null) return;
    if (room) roomClose.current?.focus(); else close.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { if (room) setRoom(null); else setActive(null); }
      if (!room && e.key === "ArrowRight") setActive(v => v === null ? null : (v + 1) % tabs.length);
      if (!room && e.key === "ArrowLeft") setActive(v => v === null ? null : (v + tabs.length - 1) % tabs.length);
    };
    document.addEventListener("keydown", onKey);
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = old; opener.current?.focus(); };
  }, [active === null, room]);
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
          <button type="button" onClick={()=>setActive((active+tabs.length-1)%tabs.length)} aria-label="Previous accommodation category">← Previous</button>
          <span>{active+1} of {tabs.length}</span>
          <button type="button" onClick={()=>setActive((active+1)%tabs.length)} aria-label="Next accommodation category">Next →</button>
        </div>
      </section>
      {room && <div className="virgin-room-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setRoom(null)}}>
        <section className="virgin-room-dialog" role="dialog" aria-modal="true" aria-label={room + " accommodation viewer"}>
          <button type="button" ref={roomClose} className="virgin-accommodation-close" aria-label="Close room viewer" onClick={()=>setRoom(null)}>×</button>
          <p className="virgin-accommodation-kicker">{tabs[active].title}</p>
          <h3>{room}</h3>
          <div className="virgin-room-photo-grid">
            {room === "Massive Suite" ? <figure className="virgin-room-photo-placeholder" style={{overflow:"hidden",margin:0}}><img src="/img/virgin-accommodations/massive-interior-transfer-test.jpg" alt="Virgin Voyages Massive Suite living room interior" loading="lazy" style={{display:"block",width:"100%",height:"100%",minHeight:210,objectFit:"cover"}} /></figure> : <div className="virgin-room-photo-placeholder"><strong>Interior</strong><span>Verified room photograph pending</span></div>}
            <div className="virgin-room-photo-placeholder"><strong>{room === "Insider" || room === "Sea View" ? "Second room view" : "Private outdoor space"}</strong><span>Verified photograph pending</span></div>
          </div>
          <p className="virgin-accommodation-note">{room === "Massive Suite" ? "Massive Suite interior photo is a low-resolution transfer proof for design review; the final high-resolution asset is still required." : "Photographs will be added when verified for this specific accommodation. Insider and Sea View cabins do not have private terraces."}</p>
          <div className="virgin-accommodation-controls">
            <button type="button" onClick={()=>setRoom(tabs[active].rooms[(tabs[active].rooms.indexOf(room)+tabs[active].rooms.length-1)%tabs[active].rooms.length])}>← Previous</button>
            <span>{tabs[active].rooms.indexOf(room)+1} of {tabs[active].rooms.length}</span>
            <button type="button" onClick={()=>setRoom(tabs[active].rooms[(tabs[active].rooms.indexOf(room)+1)%tabs[active].rooms.length])}>Next →</button>
          </div>
        </section>
      </div>}
    </div>}
  </>;
}
