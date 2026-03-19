import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero fade-up">
        <div className="hero-tag">
          <span className="beacon"></span>
          Platform active — 3 zones monitored
        </div>
        <h1>Connecting <span>Hope</span>,<br />Delivering Aid</h1>
        <p>A web-based emergency relief platform for people in crisis — find shelters, request help, and connect with volunteers instantly.</p>
        <Link to="/sos" className="sos-btn pulse">
          🆘 Send SOS Signal
        </Link>
      </section>

      <section className="features fade-up">
        <Link to="/map" className="feat-card">
          <div className="feat-icon">🗺️</div>
          <h3>Shelter Map</h3>
          <p>Find nearby safe zones, hospitals & food centers</p>
        </Link>
        <Link to="/volunteer" className="feat-card">
          <div className="feat-icon">🙋</div>
          <h3>Volunteer</h3>
          <p>Register your skills & help those in need</p>
        </Link>
        <Link to="/" className="feat-card">
          <div className="feat-icon">📦</div>
          <h3>Resources</h3>
          <p>Share or request food, medicine & supplies</p>
        </Link>
        <Link to="/donate" className="feat-card">
          <div className="feat-icon">❤️</div>
          <h3>Donate</h3>
          <p>Support relief with money, goods or services</p>
        </Link>
      </section>

      <section className="stats fade-up">
        <div className="stat">
          <span className="stat-num" data-target="1200">0</span>
          <p>Volunteers Active</p>
        </div>
        <div className="stat">
          <span className="stat-num" data-target="48">0</span>
          <p>Shelters Listed</p>
        </div>
        <div className="stat">
          <span className="stat-num" data-target="320">0</span>
          <p>SOS Resolved</p>
        </div>
      </section>
    </div>
  )
}

export default Home