import "./App.css";

export default function App() {
  return (
    <div className="site">
      <nav className="nav">
        <div className="logo">CYBERDYNE</div>
        <div className="links">
          <a href="#mission">Mission</a>
          <a href="#systems">Systems</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero">
        <h1>Building Intelligent Machines for a Safer Future.</h1>
        <p>
          Cyberdyne develops unmanned systems, surveillance platforms,
          robotics, and next-generation field technology.
        </p>
        <a className="btn" href="#systems">Explore Systems</a>
      </section>

      <section id="mission" className="panel">
        <h2>Cyberdyne Technologies</h2>

        <p>
          Building software, intelligence and autonomous systems for the
          physical and digital world.
        </p>

        <h3>Flagship Product: YardFindX</h3>

        <p>
          YardFindX is a container intelligence platform developed by
          Cyberdyne Technologies to transform empty container yard operations.
        </p>

        <p>
          Born in the container yards of Mundra.
          Built by operators.
          Designed for real-world operations.
        </p>

        <p>
          Features include container tracking, GPS capture,
          yard mapping, fleet monitoring, operator workflows,
          analytics dashboards and command centre operations.
        </p>
      </section>

      <section id="systems" className="cards">
        <div className="card">
          <h3>Unmanned Ground Vehicles</h3>
          <p>Remote-operated vehicles for patrol, rescue, and surveillance.</p>
        </div>
        <div className="card">
          <h3>AI Surveillance</h3>
          <p>Camera, sensor, and analytics systems for perimeter awareness.</p>
        </div>
        <div className="card">
          <h3>Command Interface</h3>
          <p>Live dashboards for location, camera feeds, alerts, and control.</p>
        </div>
      </section>

      <section id="contact" className="panel contact">
        <h2>Contact</h2>
        <p>Cyberdyne Technologies</p>
        <p>Email: rishivashistha@icloud.com</p>
      </section>
    </div>
  );
}
