import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [quakes, setQuakes] = useState([]);
  const [iss, setIss] = useState(null);
  const [conflicts, setConflicts] = useState([]);
  const [conflictStatus, setConflictStatus] = useState("Loading autonomous GDELT feed...");

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=23.2419&longitude=69.6669&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code&daily=sunrise,sunset,uv_index_max&timezone=auto")
      .then(r => r.json())
      .then(setWeather)
      .catch(() => setWeather(null));

    fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson")
      .then(r => r.json())
      .then(d => setQuakes((d.features || []).slice(0, 5)))
      .catch(() => setQuakes([]));

    fetch("https://api.wheretheiss.at/v1/satellites/25544")
      .then(r => r.json())
      .then(setIss)
      .catch(() => setIss(null));
    const gdeltQuery = encodeURIComponent(
      "war OR conflict OR missile OR strike OR ceasefire OR border OR drone OR airstrike"
    );

    fetch(
      `https://api.gdeltproject.org/api/v2/doc/doc?query=${gdeltQuery}&mode=artlist&format=json&maxrecords=10&sort=datedesc`
    )
      .then((r) => r.json())
      .then((d) => {
        const articles = d.articles || [];
        setConflicts(articles);
      })
      .catch(() =>
        setConflicts([
          {
            title: "Reuters World Conflict Coverage",
            url: "https://www.reuters.com/world/",
            sourceCountry: "GLOBAL",
            seendate: "LIVE",
            domain: "reuters.com",
          },
          {
            title: "Associated Press World News",
            url: "https://apnews.com/hub/world-news",
            sourceCountry: "GLOBAL",
            seendate: "LIVE",
            domain: "apnews.com",
          },
          {
            title: "GDELT Global Conflict Monitoring",
            url: "https://www.gdeltproject.org/",
            sourceCountry: "GLOBAL",
            seendate: "LIVE",
            domain: "gdeltproject.org",
          },
        ])
      );
  }, []);

  return (
    <div className="site">
      <nav className="nav">
        <div className="logo">CYBERDYNE TECHNOLOGIES</div>
        <div className="links">
          <a href="#yardfindx">YardFindX</a>
          <a href="#systems">Systems</a>
          <a href="#orbit">Orbit</a>
          
          <a href="#archive">Archive</a>
          <a href="#careers">Careers</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      
<section className="hero">

  <div className="eyebrow">
    CYBERDYNE TECHNOLOGIES
  </div>

  <h1>
    FROM ONE WORLD
    <br />
    TO WORLDS
  </h1>

  <div className="hero-stack">
    Software.<br />
    Intelligence.<br />
    Autonomous Systems.
  </div>

  <p className="hero-sub">
    Building the technologies that will define the next century.
  </p>

  <a className="btn" href="#yardfindx">
    Explore Cyberdyne
  </a>

</section>


      <section id="yardfindx" className="panel">
        <h2>Flagship Product: YardFindX</h2>
        <p>
          YardFindX is Cyberdyne Technologies' flagship container intelligence
          platform, designed to modernize and streamline empty container yard operations.
        </p>
        <p>
          Developed from real-world experience in the container yards of Mundra,
          YardFindX was built by operators who understand the challenges of daily yard management.
        </p>
        <p>
          Key capabilities include container tracking, GPS-based capture, interactive yard mapping,
          fleet monitoring, operator workflows, analytics dashboards, and centralized command centre operations.
        </p>
        <a className="btn small" href="https://yardfindx.com" target="_blank" rel="noreferrer">
          Visit YardFindX →
        </a>
      </section>

      <section id="systems" className="cards">
        <div className="card"><h3>YardFindX</h3><p>Container intelligence and yard operations platform.</p></div>
        <div className="card"><h3>Atlas</h3><p>Global logistics visibility and fleet intelligence.</p></div>
        <div className="card"><h3>Sentinel</h3><p>AI monitoring, surveillance, and operational awareness.</p></div>
        <div className="card"><h3>Nexus</h3><p>Unified command and control dashboard for field operations.</p></div>
        <div className="card"><h3>Project Nandi</h3><p>Autonomous ground mobility platform for inspection, patrol, and remote operations.</p></div>
        <div className="card"><h3>Cyberdyne Labs</h3><p>Research in AI, robotics, computer vision, and autonomous navigation.</p></div>
      </section>


      

<section id="orbit" className="panel orbit-panel">
  <h2>Cyberdyne Orbit</h2>

  <p>
    A planetary conflict-intelligence layer for monitoring geopolitical activity,
    strategic chokepoints, public reporting, and emerging global security events.
  </p>

  <div className="orbit-command minimal-conflict">
    <div className="orbit-console full">
      <span>LIVE CONFLICT LAYER</span>

      <h3>Current Conflict Intelligence</h3>

      <p>
        Cyberdyne Orbit continuously monitors emerging geopolitical developments,
        military activity, strategic chokepoints, and global security events through
        publicly available reporting, open-source intelligence, and real-time news
        aggregation.
      </p>

      <p>
        The Conflict Layer is designed to provide situational awareness rather than
        commentary, enabling users to observe events as they unfold across the
        world's most strategically significant regions.
      </p>

      <div className="intel-grid">
        <div>
          <span>ACTIVE MONITORING</span>
          <ul>
            <li>Armed conflicts and military operations</li>
            <li>Missile, drone and airstrike activity</li>
            <li>Maritime security and strategic waterways</li>
            <li>Border tensions and force mobilizations</li>
            <li>Sanctions, diplomacy and ceasefire developments</li>
            <li>Critical infrastructure and supply-chain disruptions</li>
          </ul>
        </div>

        <div>
          <span>VERIFIED SOURCES</span>
          <ul>
            <li>Reuters</li>
            <li>Associated Press</li>
            <li>GDELT Global Event Database</li>
            <li>International media networks</li>
            <li>Public government releases</li>
          </ul>
        </div>
      </div>

      <div className="conflict-feed">
        <p className="feed-status">{conflictStatus}</p>

        {conflicts.length === 0 ? (
          <p>Waiting for live items...</p>
        ) : (
          conflicts.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="conflict-item"
            >
              <span>
                {(item.sourceCountry || "GLOBAL")} · {(item.seendate || "LIVE")}
              </span>
              <strong>{item.title}</strong>
              <small>{item.domain}</small>
            </a>
          ))
        )}
      </div>
    </div>
  </div>

  <div className="orbit-feeds">
    <div>
      <span>STRATEGIC HOTSPOTS</span>
      <p>
        Monitor regions experiencing elevated geopolitical activity, military
        operations, security incidents, and strategic competition.
      </p>
    </div>

    <div>
      <span>VERIFIED REPORTING</span>
      <p>
        Access source-attributed reporting from established international news
        organizations and public information channels.
      </p>
    </div>

    <div>
      <span>GLOBAL EVENT GRAPH</span>
      <p>
        Powered by GDELT and open-source intelligence feeds to identify emerging
        developments and event relationships across the globe.
      </p>
    </div>

    <div>
      <span>AUTONOMOUS MONITORING</span>
      <p>
        Continuously updated conflict-awareness layer with automated data
        collection, classification, and archival capability.
      </p>
    </div>
  </div>
</section>



      



      <section id="archive" className="panel archive">
        <h2>Cyberdyne Human Impact Archive</h2>
        <p>
          A curated knowledge archive for Nobel Prize winners, world leaders,
          scientists, builders, innovators, and institutions shaping humanity.
        </p>

        <div className="archive-grid">
          <div className="archive-card">
            <span>KNOWLEDGE</span>
            <h3>Nobel Prize Archive</h3>
            <p>
              Official Nobel Prize records, laureate profiles, discovery areas,
              countries, years, and human impact summaries.
            </p>
            <a href="https://www.nobelprize.org/prizes/lists/all-nobel-prizes/" target="_blank" rel="noreferrer">
              Open Nobel Archive →
            </a>
          </div>

          <div className="archive-card">
            <span>LEADERSHIP</span>
            <h3>Global Leaders</h3>
            <p>
              Profiles of political, scientific, industrial, military, social,
              and technological leaders influencing the direction of the world.
            </p>
            <a href="https://www.un.org/en/about-us/member-states" target="_blank" rel="noreferrer">
              Open UN Member States →
            </a>
          </div>

          <div className="archive-card">
            <span>NEWS MEMORY</span>
            <h3>World Newspaper Front Pages</h3>
            <p>
              A reference window for front pages and headlines from India, China,
              the UK, Europe, the USA, Canada, and South America.
            </p>
            <a href="https://www.freedomforum.org/todaysfrontpages/" target="_blank" rel="noreferrer">
              Open Front Pages →
            </a>
          </div>
        </div>

        <div className="archive-list">
          <h3>Regions Covered</h3>
          <p>India • China • United Kingdom • Europe • United States • Canada • South America</p>

          <h3>Archive Principle</h3>
          <p>
            Cyberdyne will preserve source links, dates, summaries, public metadata,
            and research notes. Copyrighted newspaper images should be linked to
            their original publishers or licensed sources.
          </p>
        </div>
      </section>

      <section id="careers" className="panel careers">
        <h2>Careers</h2>
        <p>
          Cyberdyne Technologies is looking for people interested in software,
          logistics technology, AI, data systems, robotics, and autonomous systems.
        </p>

        <div className="career-box">
          <h3>Work With Us</h3>
          <p>
            If you want to contribute to YardFindX, Cyberdyne Orbit, Project Nandi,
            or future Cyberdyne Labs systems, send your profile to us.
          </p>

          <a
            className="btn"
            href="mailto:rishivashistha@icloud.com?subject=Career%20Application%20-%20Cyberdyne%20Technologies&body=Hello%20Cyberdyne%20Technologies,%0A%0AI%20am%20interested%20in%20working%20with%20Cyberdyne.%0A%0AName:%0ARole%20Interested:%0AExperience:%0ALocation:%0APhone:%0ALinkedIn/GitHub/Portfolio:%0A%0ARegards,"
          >
            Apply by Email
          </a>
        </div>
      </section>

      <section id="contact" className="panel contact">
        <h2>Contact</h2>
        <p>Cyberdyne Technologies</p>
        <p>Email: rishivashistha@icloud.com</p>
        <p>Website: cyberdynetec.in</p>
        <p>Bhuj, Kutch, Gujarat, India</p>
      </section>
    </div>
  );
}
