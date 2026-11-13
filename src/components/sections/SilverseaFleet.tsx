"use client";

import { useEffect, useState } from "react";

const classic = ["Silver Ray","Silver Nova","Silver Dawn","Silver Moon","Silver Muse","Silver Spirit","Silver Shadow","Silver Whisper"] as const;
const expedition = ["Silver Endeavour","Silver Origin","Silver Wind","Silver Cloud"] as const;
type Group = "classic" | "expedition";
const groups = {
  classic: { title:"Classic Luxury Voyages", description:"Refined ocean journeys, with time to savor every destination.", ships:classic },
  expedition: { title:"Expedition Voyages", description:"Extraordinary discoveries, with thoughtful luxury along the way.", ships:expedition },
};

export default function SilverseaFleet() {
  const [open, setOpen] = useState<Group | null>(null);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(null); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);
  return <aside className="silversea-fleet" aria-label="Explore Silversea ships">
    <header className="silversea-fleet-header">
      <p className="log log--center">The art of extraordinary travel</p>
      <h3 className="display h-md">For the Finer Things in Life</h3>
      <p className="silversea-fleet-tagline">Luxury Has No Bounds.</p>
      <p>Intimate ships, extraordinary destinations. Discover the voyage that feels like yours.</p>
    </header>
    <div className="silversea-fleet-cards">
      {(["classic","expedition"] as const).map(group => <button type="button" key={group} className="silversea-fleet-card" onClick={() => setOpen(group)} aria-haspopup="dialog" style={{textAlign:"left",cursor:"pointer",font:"inherit",color:"inherit"}}>
        <span className="silversea-fleet-label">{group === "classic" ? "Ocean journeys" : "Explore farther"}</span>
        <h4>{groups[group].title}</h4>
        <p>{groups[group].description}</p>
        <span style={{textDecoration:"underline",textUnderlineOffset:4}}>Explore the ships →</span>
      </button>)}
    </div>
    <section className="silversea-suite-intro" aria-label="Silversea suite preview">
      <p className="log log--center">A glimpse inside</p><h4>Room to unwind, wherever you roam.</h4>
      <p><strong>Every suite. Your own butler.</strong> Personalized service and thoughtful details. Dean can help you find the right suite for your journey.</p>
      <a href="/plan/?line=Silversea">Find your suite with Dean →</a>
    </section>
    <footer className="silversea-fleet-footer"><p>Every ship has its own character. Ask Dean which one suits your journey.</p><a className="btn btn-ink" href="/plan/?line=Silversea">Explore Silversea with Dean →</a></footer>
    {open && <div role="presentation" onMouseDown={event => { if(event.target === event.currentTarget) setOpen(null); }} style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(12,19,26,.78)",display:"grid",placeItems:"center",padding:16}}>
      <section role="dialog" aria-modal="true" aria-labelledby="silversea-dialog-title" style={{background:"#faf9f6",color:"#18222a",width:"min(900px,100%)",maxHeight:"90vh",overflowY:"auto",padding:"clamp(20px,4vw,48px)",position:"relative",borderRadius:4}}>
        <button type="button" onClick={() => setOpen(null)} aria-label="Close ship previews" style={{position:"absolute",right:18,top:12,border:0,background:"transparent",fontSize:30,cursor:"pointer",color:"inherit"}}>×</button>
        <p className="log">Silversea · Explore with Dean</p><h3 id="silversea-dialog-title" className="display h-md">{groups[open].title}</h3>
        <p>{groups[open].description}</p>
        <div className="silversea-fleet-cards" style={{marginTop:24}}>
          {groups[open].ships.map(ship => <article key={ship} className="silversea-fleet-card">
            <h4>{ship}</h4><p>A closer look at the journey and accommodations.</p>
            <a href="https://go.deanondeck.com/Silversea" aria-label={`Book a Silversea voyage aboard ${ship}`}>Let’s Go Book →</a>
          </article>)}
        </div>
        <p style={{fontSize:13,marginTop:24}}>Booking currently uses Dean’s existing Silversea advisor link. Ship-specific Shlink destinations will replace it after verification.</p>
      </section>
    </div>}
  </aside>;
}
