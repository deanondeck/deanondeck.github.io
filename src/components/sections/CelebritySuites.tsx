const suites = [
  { name: "Iconic Suite", family: "Edge Series" },
  { name: "Penthouse Suite", family: "Select ships" },
  { name: "Edge Villa", family: "Edge Series" },
  { name: "Royal Suite", family: "Select ships" },
  { name: "Celebrity Suite", family: "Select ships" },
  { name: "Aqua Sky Suite", family: "Select ships" },
];

export default function CelebritySuites() {
  return (
    <section className="celebrity-editorial" aria-labelledby="celebrity-suites-heading">
      <div className="celebrity-editorial-heading">
        <p className="log">THE SUITE COLLECTION</p>
        <h3 className="display h-md" id="celebrity-suites-heading">Space to settle in. Service that feels personal.</h3>
        <p>
          Celebrity’s suite collection ranges from expansive, top-tier retreats to refined suites with access to The Retreat on select ships. Suite names, layouts, and benefits vary across the fleet.
        </p>
      </div>

      <div className="celebrity-suite-list" aria-label="Featured Celebrity Cruises suites">
        {suites.map((suite, index) => (
          <article className="celebrity-suite-item" key={suite.name}>
            <span className="celebrity-suite-number">0{index + 1}</span>
            <div>
              <p className="celebrity-suite-family">{suite.family}</p>
              <h4>{suite.name}</h4>
            </div>
            <span className="celebrity-suite-arrow" aria-hidden="true">↗</span>
          </article>
        ))}
      </div>

      <aside className="celebrity-accessible-note">
        <p className="log">ACCESSIBLE ACCOMMODATIONS</p>
        <p>Accessible staterooms are available on Celebrity ships. Bathroom configurations and features vary by ship and category; ask Dean to help compare the options for your sailing.</p>
      </aside>

      <div className="celebrity-editorial-actions">
        <a className="btn btn-ink" href="/plan/?line=Celebrity%20Cruises">Explore Celebrity with Dean <span className="arrow">→</span></a>
        <a className="cl-alt" href="https://www.celebritycruises.com/cruises" target="_blank" rel="noopener noreferrer">Browse Celebrity Cruises itineraries ↗</a>
      </div>
    </section>
  );
}
