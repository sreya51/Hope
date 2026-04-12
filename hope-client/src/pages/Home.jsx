import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import './Home.css'

function Home() {
  useEffect(() => {
    const counters = document.querySelectorAll('.stat-num')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = +counter.getAttribute('data-target')
          let count = 0
          const step = Math.ceil(target / 60)
          const timer = setInterval(() => {
            count += step
            if (count >= target) {
              counter.innerHTML = target.toLocaleString() + '<em>+</em>'
              clearInterval(timer)
            } else {
              counter.innerHTML = count.toLocaleString() + '<em>+</em>'
            }
          }, 25)
          observer.unobserve(counter)
        }
      })
    }, { threshold: 0.5 })
    counters.forEach(counter => observer.observe(counter))

    const fadeEls = document.querySelectorAll('.fade-up')
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })
    fadeEls.forEach(el => fadeObserver.observe(el))
  }, [])

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="hero-tag">
            <span className="beacon"></span>
            Platform active — 3 zones monitored
          </div>
          <h1>Connecting <span>Hope,</span><br />Delivering Aid</h1>
          <p>A web-based emergency relief platform for people in crisis — find shelters, request help, and connect with volunteers instantly.</p>
          <div className="hero-btns">
            <Link to="/sos" className="sos-btn pulse">Send SOS Signal</Link>
          </div>
        </div>
      </section>

      {/* BANNER */}
      <div className="banner">
        <p>In your darkest moment, HOPE is one tap away.</p>
      </div>

      {/* FEATURES */}
      <div className="features-section fade-up">
        <div className="features-strip">
          <Link to="/map" className="feat-strip-item">
            <div className="feat-strip-icon">🗺️</div>
            <h3>Shelter Map</h3>
            <p>Find nearby safe zones, hospitals & food centers instantly</p>
            <span className="feat-strip-link">Find shelter </span>
          </Link>
          <Link to="/volunteer" className="feat-strip-item">
            <div className="feat-strip-icon">🙋</div>
            <h3>Volunteer</h3>
            <p>Register your skills & help those in need around you</p>
            <span className="feat-strip-link">Join now </span>
          </Link>
          <Link to="/resources" className="feat-strip-item">
            <div className="feat-strip-icon">📦</div>
            <h3>Resources</h3>
            <p>Share or request food, medicine & essential supplies</p>
            <span className="feat-strip-link">View resources </span>
          </Link>
          <Link to="/donate" className="feat-strip-item">
            <div className="feat-strip-icon">❤️</div>
            <h3>Donate</h3>
            <p>Support relief with money, goods or services</p>
            <span className="feat-strip-link">Donate now </span>
          </Link>
        </div>
      </div>

    {/* ABOUT */}
      <section className="about fade-up">
        <div className="about-img"></div>
        <div className="about-content">
          <div className="eyebrow">Our mission</div>
          <h2>Technology in service of <span>humanity</span></h2>
          <p>In war-affected areas like Gaza and Ukraine, people face sudden displacement, injury, and severe shortages of food, medicine, and shelter.</p>
          <p>HOPE is designed to make emergency response faster, more organized, and more human — connecting those in need with volunteers and relief teams instantly.</p>
          <Link to="/volunteer" className="about-btn">Learn more </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how fade-up">
        <div className="section-eyebrow">How it works</div>
        <div className="section-title">Get help in 3 simple steps</div>
        <div className="steps">
          <div className="step">
            <div className="step-num">1</div>
            <h3>Register or Sign In</h3>
            <p>Create a free account in seconds — no complex forms, just your basic info</p>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <h3>Send SOS or Browse</h3>
            <p>Send an emergency signal, find nearby shelters, or browse available resources</p>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <h3>Get Help Instantly</h3>
            <p>Volunteers and relief teams are notified immediately and respond fast</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar fade-up">
        <div className="stat-item">
          <span className="stat-num" data-target="1200">0</span>
          <span className="stat-label">Volunteers Active</span>
        </div>
        <div className="stat-item">
          <span className="stat-num" data-target="48">0</span>
          <span className="stat-label">Shelters Listed</span>
        </div>
        <div className="stat-item">
          <span className="stat-num" data-target="320">0</span>
          <span className="stat-label">SOS Resolved</span>
        </div>
      </div>



      {/* QUOTE */}
      <section className="quote-section fade-up">
        <div className="quote-mark">"</div>
        <div className="quote-text">In the middle of every crisis lies great opportunity — to help, to connect, and to restore hope where it has been lost.</div>
        <div className="quote-author">— The HOPE Platform Mission</div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <div className="footer-logo">HOPE</div>
            <div className="footer-desc">A web-based emergency relief platform connecting people in crisis with shelter, aid, and volunteers instantly.</div>
          </div>
          <div className="footer-col">
            <h4>Platform</h4>
            <Link to="/">Home</Link>
            <Link to="/map">Shelter Map</Link>
            <Link to="/volunteer">Volunteer</Link>
            <Link to="/resources">Resources</Link>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <Link to="/health">Health Tips</Link>
            <Link to="/donate">Donate</Link>
            <Link to="/sos">SOS Signal</Link>
            <Link to="/">Contact</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 HOPE Platform. All rights reserved.</div>
          <div className="footer-tagline">Made with <span>♥</span> for humanity</div>
        </div>
      </footer>

    </div>
  )
}

export default Home