import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Ask Cyberdyne what to look at today.");
  const [weather, setWeather] = useState(null);
  const [quakes, setQuakes] = useState([]);
  const [iss, setIss] = useState(null);
  const [conflicts, setConflicts] = useState([]);
  const [conflictStatus, setConflictStatus] = useState("Loading autonomous GDELT feed...");
  const [activeNews, setActiveNews] = useState(0);
  const [localWeather, setLocalWeather] = useState(null);
  const [spaceWeather, setSpaceWeather] = useState([]);
  const [solarStatus, setSolarStatus] = useState("Checking NOAA SWPC...");

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

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code&daily=uv_index_max,sunrise,sunset&timezone=auto`
        )
          .then((r) => r.json())
          .then(setLocalWeather)
          .catch(() => setLocalWeather(null));
      },
      () => setLocalWeather(null)
    );

    fetch("https://services.swpc.noaa.gov/products/alerts.json")
      .then((r) => r.json())
      .then((d) => {
        const rows = Array.isArray(d) ? d.slice(1, 4) : [];
        setSpaceWeather(rows);
        setSolarStatus(rows.length ? "NOAA SWPC alerts active" : "No active solar alerts");
      })
      .catch(() => {
        setSpaceWeather([]);
        setSolarStatus("NOAA SWPC feed unavailable");
      });
  }, []);

  useEffect(() => {
    if (!conflicts.length) return;
    const newsTimer = setInterval(() => {
      setActiveNews((current) => (current + 1) % conflicts.length);
    }, 4500);
    return () => clearInterval(newsTimer);
  }, [conflicts]);

  async function askCyberdyne() {
    const q = question.trim();

    if (!q) {
      setAnswer("Ask Cyberdyne anything.");
      return;
    }

    setAnswer("Cyberdyne is thinking...");

    try {
      const res = await fetch("https://cyberdyne-api.onrender.com/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: q }),
      });

      const data = await res.json();
      setAnswer(data.answer || "No response received.");
    } catch (err) {
      setAnswer("Cyberdyne Assistant could not connect to the AI server.");
    }
  }

  return (
    <div className="site">
      <nav className="nav">
        <div className="logo">CYBERDYNE TECHNOLOGIES</div>
        <div className="links">
          <a href="#yardfindx">YardFindX</a>
          <a href="#systems">Systems</a>
          <a href="#assistant">Assistant</a>
          <a href="#atmosphere">Atmosphere</a>
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




      <section id="assistant" className="panel assistant-panel">
        <h2>Cyberdyne Assistant</h2>
        <p>Ask what to look at today across atmosphere, orbit, archive, YardFindX and autonomous systems.</p>

        <div className="assistant-box">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") askCyberdyne();
            }}
            placeholder="Ask Cyberdyne..."
          />

          <button onClick={askCyberdyne}>
            Query
          </button>
        </div>

        <div className="assistant-answer">
          {answer}
        </div>

        <div className="assistant-prompts">
          <button onClick={() => {setQuestion("What should I look at today?"); setAnswer("Start with Atmosphere for local conditions, then Orbit for global conflicts, then Archive for long-term knowledge.");}}>Today</button>
          <button onClick={() => {setQuestion("Show solar activity"); setAnswer("Atmosphere shows solar flare class, geomagnetic activity, and radio-blackout monitoring.");}}>Solar</button>
          <button onClick={() => {setQuestion("Show conflicts"); setAnswer("Cyberdyne Orbit displays conflict intelligence from verified reporting and GDELT monitoring.");}}>Conflicts</button>
          <button onClick={() => {setQuestion("What is YardFindX?"); setAnswer("YardFindX is Cyberdyne's flagship container intelligence platform.");}}>YardFindX</button>
        </div>
      </section>

      <section id="atmosphere" className="panel atmosphere">
        <h2>Atmosphere</h2>
        <p>A quiet local environment window for weather, wind, ultraviolet exposure and solar activity.</p>

        <div className="weather-window">
          <div className="weather-main">
            <span>LOCAL CONDITIONS</span>
            <h3>{localWeather ? `${localWeather.current.temperature_2m}°C` : "Location Required"}</h3>
            <p>
              {localWeather
                ? `Humidity ${localWeather.current.relative_humidity_2m}% · Wind ${localWeather.current.wind_speed_10m} km/h`
                : "Allow location access to show weather near you."}
            </p>
          </div>

          <div className="weather-metrics">
            <div>
              <span>WIND</span>
              <strong>{localWeather ? `${localWeather.current.wind_direction_10m}°` : "--"}</strong>
              <p>Direction</p>
            </div>

            
<div className="uv-box">
  <span>UV INDEX</span>

  <strong className="metric-big">
    {localWeather ? (localWeather?.daily?.uv_index_max?.[0] ?? 0).toFixed(1) : "--"}
  </strong>

  <div className="uv-state">
    {
      !localWeather ? "UNKNOWN" :
      (localWeather?.daily?.uv_index_max?.[0] ?? 0) < 3 ? "LOW EXPOSURE" :
      (localWeather?.daily?.uv_index_max?.[0] ?? 0) < 6 ? "MODERATE EXPOSURE" :
      (localWeather?.daily?.uv_index_max?.[0] ?? 0) < 8 ? "HIGH EXPOSURE" :
      (localWeather?.daily?.uv_index_max?.[0] ?? 0) < 11 ? "VERY HIGH EXPOSURE" :
      "EXTREME EXPOSURE"
    }
  </div>

  <p>Protection Recommended</p>
</div>

          </div>

          <div className="solar-window">

<div className="solar-scale-card">

  <span>SOLAR ACTIVITY</span>

  <strong>M-Class</strong>

  <p>Current Solar Activity Level</p>

  <div className="flare-scale">

    <span>C</span>
    <span>M</span>
    <span>X</span>

    <div className="flare-marker"></div>

  </div>

  <div className="solar-status">
    Moderate Activity
  </div>

  <div className="solar-explain">
    Solar flares are bursts of energy released from the Sun.
    Strong events can affect satellites, GPS navigation,
    radio communications, and space operations.
  </div>

</div>

            <span>SOLAR ACTIVITY</span>
            <h3>Monitoring the Sun and Near-Earth Space</h3>

            <p>
              The Sun emits radiation, charged particles, and magnetic energy that can affect
              satellites, GPS navigation, radio communication, power grids, and spacecraft.
            </p>

            <p>
              Cyberdyne monitors public space-weather bulletins from NOAA's Space Weather
              Prediction Center.
            </p>

            <div className="solar-status-line">
              {solarStatus}
            </div>

            <div className="solar-alert-grid">
              <div className="solar-alert-card">
                <span>SOLAR FLARES</span>
                <strong>Monitored</strong>
                <p>Powerful bursts of radiation from the Sun that may affect radio and satellite systems.</p>
              </div>

              <div className="solar-alert-card">
                <span>GEOMAGNETIC FIELD</span>
                <strong>Monitored</strong>
                <p>Disturbances in Earth's magnetic field that can affect satellites and power systems.</p>
              </div>

              <div className="solar-alert-card">
                <span>RADIO BLACKOUTS</span>
                <strong>Monitored</strong>
                <p>Temporary disruptions to radio communication caused by solar radiation events.</p>
              </div>
            </div>
          </div>
        </div>
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

      <div className="news-collection-window">
        <span>LIVE NEWS COLLECTION</span>

        {conflicts.length > 0 ? (
          <a
            href={conflicts[activeNews]?.url}
            target="_blank"
            rel="noreferrer"
            className="featured-news"
          >
            <small>
              {(conflicts[activeNews]?.sourceCountry || "GLOBAL")} · {(conflicts[activeNews]?.seendate || "LIVE")}
            </small>
            <strong>{conflicts[activeNews]?.title}</strong>
            <em>{conflicts[activeNews]?.domain}</em>
          </a>
        ) : (
          <p>Collecting live conflict news...</p>
        )}
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

    <div>
      <span>VISUAL INTELLIGENCE</span>
      <p>
        Understanding the world through imagery. Future integration with
        GDELT Visual Global Knowledge Graph for objects, locations,
        infrastructure, disasters, transportation, and emerging events.
      </p>
    </div>

    <div>
      <span>NARRATIVE INTELLIGENCE</span>
      <p>
        Tracking the ideas, technologies, conflicts, scientific discoveries,
        and global narratives shaping human civilization.
      </p>
    </div>

    <div>
      <span>HUMAN IMPACT ARCHIVE</span>
      <p>
        Nobel Prize winners, innovators, world leaders, scientific milestones,
        historical newspapers, and major events preserved for future reference.
      </p>
    </div>
  </div>
</section>



      



      <section id="archive" className="panel archive">
        <h2>Cyberdyne Archive Engine</h2>
        <p>
          A long-term knowledge system for Nobel Prize winners, world leaders,
          scientists, innovators, historical front pages, public records,
          and major events shaping humanity.
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

        <div className="archive-engine">
          <h3>Archive Engine</h3>
          <p>
            Cyberdyne Archive Engine is designed to collect source links,
            public metadata, dates, summaries, documents, and event references
            into a searchable long-term knowledge base.
          </p>

          <div className="archive-pipeline">
            <div><span>01</span><strong>Collect</strong><p>Official sources, public datasets, media references and open archives.</p></div>
            <div><span>02</span><strong>Classify</strong><p>People, countries, institutions, topics, dates and historical relevance.</p></div>
            <div><span>03</span><strong>Preserve</strong><p>Store metadata, links, summaries and research notes for future retrieval.</p></div>
            <div><span>04</span><strong>Understand</strong><p>Connect events, leaders, inventions, conflicts and human progress.</p></div>
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
