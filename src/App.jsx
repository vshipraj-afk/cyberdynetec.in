import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const url =
      "https://api.gdeltproject.org/api/v2/doc/doc?query=geopolitics%20technology%20OR%20defense%20technology%20OR%20artificial%20intelligence%20security&mode=artlist&format=json&maxrecords=6&sort=hybridrel";

    fetch(url)
      .then((res) => res.json())
      .then((data) => setNews(data.articles || []))
      .catch(() => setNews([]));
  }, []);

  return (
    <div className="site">
      <nav className="nav">
        <div className="logo">CYBERDYNE TECHNOLOGIES</div>
        <div className="links">
          <a href="#yardfindx">YardFindX</a>
          <a href="#systems">Systems</a>
          <a href="#news">GeoTech News</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero">
        <h1>
          FROM CONTAINER YARDS
          <br />
          TO AUTONOMOUS SYSTEMS
        </h1>
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
          platform, designed to modernize and streamline empty container yard
          operations.
        </p>

        <p>
          Developed from real-world experience in the container yards of Mundra,
          YardFindX was built by operators who understand the challenges of
          daily yard management.
        </p>

        <p>
          Key capabilities include container tracking, GPS-based capture,
          interactive yard mapping, fleet monitoring, operator workflows,
          analytics dashboards, and centralized command centre operations.
        </p>

        <a className="btn small" href="https://yardfindx.com" target="_blank" rel="noreferrer">
          Visit YardFindX →
        </a>
      </section>

      <section id="systems" className="cards">
        <div className="card">
          <h3>YardFindX</h3>
          <p>Container intelligence and yard operations platform.</p>
        </div>

        <div className="card">
          <h3>Atlas</h3>
          <p>Global logistics visibility and fleet intelligence.</p>
        </div>

        <div className="card">
          <h3>Sentinel</h3>
          <p>AI monitoring, surveillance, and operational awareness.</p>
        </div>

        <div className="card">
          <h3>Nexus</h3>
          <p>Unified command and control dashboard for field operations.</p>
        </div>

        <div className="card">
          <h3>Project Nandi</h3>
          <p>Autonomous ground mobility platform for inspection, patrol, and remote operations.</p>
        </div>

        <div className="card">
          <h3>Cyberdyne Labs</h3>
          <p>Research in AI, robotics, computer vision, and autonomous navigation.</p>
        </div>
      </section>

      <section id="news" className="panel news-panel">
        <h2>Live GeoTech News</h2>
        <p>Global updates on geopolitics, technology, AI, logistics, and security.</p>

        <div className="news-window">
          {news.length === 0 ? (
            <p>Loading live news feed...</p>
          ) : (
            news.map((item, index) => (
              <a
                className="news-item"
                key={index}
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                <span>{item.sourceCountry || "GLOBAL"}</span>
                <strong>{item.title}</strong>
              </a>
            ))
          )}
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
