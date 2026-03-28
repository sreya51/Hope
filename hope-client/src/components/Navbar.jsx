import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoutModal from './LogoutModal'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const [showModal, setShowModal] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setShowModal(false)
    navigate('/login')
  }

  return (
    <>
      {showModal && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowModal(false)}
        />
      )}
      <nav className="navbar">
        <div className="navbar-top">
          <Link to="/">
            <img src="/logo.png" alt="Hope" className="logo-img" />
          </Link>
        </div>
        <div className="navbar-bottom">
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/map">Shelter Map</Link>
            <Link to="/volunteer">Volunteer</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/health">Health Tips</Link>
            <Link to="/donate">Donate</Link>
            {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
          </div>
          <div className="navbar-right">
            {user ? (
              <button className="logout-btn" onClick={() => setShowModal(true)}>
                Logout ({user.name})
              </button>
            ) : (
              <Link to="/login" className="login-link">Login</Link>
            )}
            <Link to="/sos" className="sos-link">SOS</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar