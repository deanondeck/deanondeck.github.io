const classic = [
  ["Silver Dawn",596],["Silver Moon",596],["Silver Muse",632],["Silver Nova",728],
  ["Silver Ray",728],["Silver Shadow",392],["Silver Spirit",636],["Silver Whisper",392],
] as const;
const expedition = [
  ["Silver Cloud",254],["Silver Endeavour",220],["Silver Origin",100],["Silver Wind",274],
] as const;

function ShipGroup({ title, description, ships }: {title:string; description:string; ships:readonly (readonly [string,number])[]}) {
  return <section className="silversea-fleet-group" aria-label={title}>
    <div className="silversea-fleet-group-heading"><h4>{title}</h4><p>{description}</p></div>
    <div className="silversea-fleet-cards">
      {ships.map(([name, guests]) => <article className="silversea-fleet-card" key={name}>
        <span className="silversea-fleet-label">{title === "Classic Voyages" ? "Classic" : "Expedition"}</span>
        <h5>{name}</h5><p>Up to {guests} guests</p>
        <a href="https://www.silversea.com/ships.html" target="_blank" rel="noopener noreferrer" aria-label={`Explore ${name} on Silversea's official fleet page`}>Explore ship <span aria-hidden="true">↗</span></a>
      </article>)}
    </div>
  </section>;
}

export default function SilverseaFleet() {
  return <aside className="silversea-fleet" aria-label="Explore Silversea ships">
    <header className="silversea-fleet-header">
      <p className="log log--center">Twelve ships · Two ways to explore</p>
      <h3 className="display h-md">Discover the Silversea Fleet</h3>
      <p>Intimate ships, extraordinary destinations. Find the voyage that feels like yours.</p>
    </header>
    <ShipGroup title="Classic Voyages" description="Refined ocean journeys, with time to savor every destination." ships={classic}/>
    <ShipGroup title="Expedition Voyages" description="Venture farther, without leaving thoughtful luxury behind." ships={expedition}/>
    <footer className="silversea-fleet-footer">
      <p>Every ship has its own character. Ask Dean which one suits your journey.</p>
      <a className="btn btn-ink" href="/plan/?line=Silversea">Explore Silversea with Dean <span aria-hidden="true">→</span></a>
    </footer>
  </aside>;
}
