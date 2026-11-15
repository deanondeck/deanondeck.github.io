const suites = [
  { name: "Iconic Suite", family: "Edge Series", tone: "ink" },
  { name: "Penthouse Suite", family: "Select ships", tone: "bronze" },
  { name: "Edge Villa", family: "Edge Series", tone: "lagoon" },
  { name: "Royal Suite", family: "Select ships", tone: "wine" },
  { name: "Celebrity Suite", family: "Select ships", tone: "sand" },
  { name: "Aqua Sky Suite", family: "Select ships", tone: "sea" },
];

export default function CelebritySuites() {
  return (
    <section className="celebrity-editorial" aria-labelledby="celebrity-suites-heading">
      <div className="celebrity-editorial-heading">
        <p className="log">THE SUITE COLLECTION</p>
        <h3 className="display h-md" id="celebrity-suites-heading">A suite with a point of view.</h3>
        <p>
          From the most expansive retreats to suites with access to The Retreat, Celebrity’s collection offers distinct ways to experience the ship. Tap a suite to ask Dean about ships, layouts, and current pricing.
        </p>
      </div>

      <div className="celebrity-suite-list" aria-label="Featured Celebrity Cruises suites">
        {suites.map((suite, index) => (
          <a
            className={`celebrity-suite-item celebrity-suite-item--${suite.tone}`}
            href={`/plan/?line=${encodeURIComponent("Celebrity Cruises")}&suite=${encodeURIComponent(suite.name)}`}
            key={suite.name}
            aria-label={`Ask Dean about the ${suite.name}`}
          >
            <span className="celebrity-suite-number">0{index + 1}</span>
            <span className="celebrity-suite-copy">
              <span className="celebrity-suite-family">{suite.family}</span>
              <span className="celebrity-suite-name">{suite.name}</span>
              <span className="celebrity-suite-action">Ask Dean about this suite <span aria-hidden="true">→</span></span>
            </span>
          </a>
        ))}
      </div>

      <aside className="celebrity-accessible-note">
        <p className="log">ACCESSIBLE ACCOMMODATIONS</p>
        <p>Accessible staterooms are available on Celebrity ships. Bathroom configurations and features vary by ship and category; ask Dean to help compare the options for your sailing.</p>
      </aside>

      <div className="celebrity-editorial-actions">
        <a className="btn btn-ink" href="/plan/?line=Celebrity%20Cruises">Explore Celebrity with Dean <span className="arrow">→</span></a>
        <a className="cl-alt" href="https://www.celebritycruises.com/cruises" target="_blank" rel="noopener noreferrer">Browse Celebrity Cruises itineraries →</a>
      </div>
    </section>
  );
}
