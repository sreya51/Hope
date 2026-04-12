import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import LogoutModal from './LogoutModal'
import './Navbar.css'
import logo from '../assets/logo.png'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const [showModal, setShowModal] = useState(false)
  const [sliderStyle, setSliderStyle] = useState({})
  const [menuOpen, setMenuOpen] = useState(false)
  const pillWrapRef = useRef(null)
  const pillRefs = useRef([])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/map', label: 'Shelter Map' },
    { to: '/volunteer', label: 'Volunteer' },
    { to: '/resources', label: 'Resources' },
    { to: '/health', label: 'Health Tips' },
    { to: '/donate', label: 'Donate' },
  ]

  if (user?.role === 'admin') {
    links.push({ to: '/admin', label: 'Admin' })
  }

  const moveSlider = (el) => {
    if (!pillWrapRef.current || !el) return
    const wrapRect = pillWrapRef.current.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    setSliderStyle({
      left: elRect.left - wrapRect.left,
      width: elRect.width,
    })
  }

  useEffect(() => {
    const activeIndex = links.findIndex(l => l.to === location.pathname)
    const idx = activeIndex === -1 ? 0 : activeIndex
    if (pillRefs.current[idx]) {
      setTimeout(() => moveSlider(pillRefs.current[idx]), 50)
    }
  }, [location.pathname])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

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

        {/* LOGO */}
        <div className="navbar-left">
          <Link to="/">
<img src={logo} alt="Hope" className="logo-img" />          </Link>
        </div>

        {/* DESKTOP CENTER LINKS */}
        <div className="navbar-center">
          <div className="nav-pill-wrap" ref={pillWrapRef}>
            <div className="slider-bg" style={sliderStyle}></div>
            {links.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                ref={el => pillRefs.current[i] = el}
                className={`nav-pill ${location.pathname === link.to ? 'active' : ''}`}
                onMouseEnter={() => moveSlider(pillRefs.current[i])}
                onMouseLeave={() => {
                  const activeIdx = links.findIndex(l => l.to === location.pathname)
                  const idx = activeIdx === -1 ? 0 : activeIdx
                  moveSlider(pillRefs.current[idx])
                }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* DESKTOP RIGHT */}
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

        {/* HAMBURGER */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>

      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <button className="mobile-close" onClick={() => setMenuOpen(false)}>✕</button>

        <div className="mobile-links">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`mobile-link ${location.pathname === link.to ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
        
        <div className="mobile-bottom">
          {user ? (
            <button className="mobile-logout" onClick={() => { setShowModal(true); setMenuOpen(false) }}>
              Logout ({user.name})
            </button>
          ) : (
            <Link to="/login" className="mobile-login" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
          <Link to="/sos" className="mobile-sos" onClick={() => setMenuOpen(false)}> Send SOS</Link>
        </div>
      </div>

      {/* OVERLAY */}
      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)}></div>}
    </>
  )
}

export default Navbar