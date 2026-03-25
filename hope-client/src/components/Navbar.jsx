import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/logo.png" alt="Hope" className="logo-img" />
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/map">Shelter Map</Link>
        <Link to="/volunteer">Volunteer</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/health">Health Tips</Link>
        <Link to="/donate">Donate</Link>
        <Link to="/login" className="login-link">Login</Link>
        <Link to="/sos" className="sos-link">SOS</Link>
      </div>
    </nav>
  )
}

export default Navbar