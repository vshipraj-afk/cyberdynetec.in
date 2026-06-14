import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [quakes, setQuakes] = useState([]);
  const [iss, setIss] = useState(null);

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
  }, []);

  return (
    <div className="site">
      <nav className="nav">
        <div className="logo">CYBERDYNE TECHNOLOGIES</div>
        <div className="links">
          <a href="#yardfindx">YardFindX</a>
          <a href="#systems">Systems</a>
          <a href="#geotech">GeoTech</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero">
        <h1>FROM CONTAINER YARDS<br />TO AUTONOMOUS SYSTEMS</h1>
        <p>
          Building software, intelligence, and autonomous systems for the
          physical and digital world.
        </p>
        <a className="btn" href="#yardfindx">EXPLORE CYBERDYNE</a>
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

      <section id="geotech" className="panel">
        <h2>Live GeoTech Window</h2>
        <p>Weather, seismic activity, space systems, satellites, maritime movement, and planetary awareness.</p>

        <div className="geo-grid">
          <div className="geo-card">
            <span>WEATHER / KUTCH</span>
            <h3>{weather ? `${weather.current.temperature_2m}°C` : "Loading"}</h3>
            <p>Wind: {weather ? `${weather.current.wind_speed_10m} km/h` : "--"}</p>
            <p>Direction: {weather ? `${weather.current.wind_direction_10m}°` : "--"}</p>
            <p>UV Index: {weather ? weather.daily.uv_index_max[0] : "--"}</p>
          </div>

          <div className="geo-card">
            <span>EARTHQUAKE WATCH</span>
            <h3>{quakes.length} Alerts</h3>
            {quakes.map((q, i) => (
              <p key={i}>M{q.properties.mag} — {q.properties.place}</p>
            ))}
          </div>

          <div className="geo-card">
            <span>ISS POSITION</span>
            <h3>International Space Station</h3>
            <p>Lat: {iss ? iss.latitude.toFixed(2) : "--"}</p>
            <p>Lng: {iss ? iss.longitude.toFixed(2) : "--"}</p>
            <p>Altitude: {iss ? `${iss.altitude.toFixed(0)} km` : "--"}</p>
          </div>

          <div className="geo-card">
            <span>SPACE SYSTEM</span>
            <h3>Earth • Moon • Sun</h3>
            <p>Seasonal cycle, sunrise/sunset, lunar awareness, and solar radiation monitoring.</p>
            <p>Sunrise: {weather ? weather.daily.sunrise[0].split("T")[1] : "--"}</p>
            <p>Sunset: {weather ? weather.daily.sunset[0].split("T")[1] : "--"}</p>
          </div>

          <div className="geo-card">
            <span>SATELLITE LAYER</span>
            <h3>Orbital Systems</h3>
            <p>ISS live tracking enabled.</p>
            <p>Starlink and satellite constellation layer planned.</p>
            <p>Requires satellite tracking API key for full live feed.</p>
          </div>

          <div className="geo-card">
            <span>MARITIME LAYER</span>
            <h3>India Flag Vessels</h3>
            <p>Indian-flag vessel tracking planned.</p>
            <p>Live AIS vessel feeds require a maritime API subscription.</p>
            <p>Future use: ports, vessels, routes, cargo and fleet intelligence.</p>
          </div>
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
