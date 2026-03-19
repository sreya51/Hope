import { useState } from 'react'
import './SOS.css'

function SOS() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', message: '', location: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setForm({ ...form, location: `${pos.coords.latitude}, ${pos.coords.longitude}` })
    })
  }

  return (
    <div className="sos-page">
      {submitted ? (
        <div className="sos-success">
          <div className="success-icon">✅</div>
          <h2>SOS Signal Sent!</h2>
          <p>Your distress signal has been received. Help is on the way.</p>
          <button onClick={() => setSubmitted(false)}>Send Another</button>
        </div>
      ) : (
        <div className="sos-container">
          <div className="sos-header">
            <span className="sos-badge">🆘 Emergency</span>
            <h1>Send SOS Signal</h1>
            <p>Fill in the details below. Your signal will be sent to nearby volunteers and relief teams immediately.</p>
          </div>
          <form onSubmit={handleSubmit} className="sos-form">
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Situation</label>
              <textarea
                placeholder="Describe your emergency situation..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={4}
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <div className="location-row">
                <input
                  type="text"
                  placeholder="Your location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
                <button type="button" className="location-btn" onClick={getLocation}>
                  📍 Detect
                </button>
              </div>
            </div>
            <button type="submit" className="submit-btn">
              🆘 Send SOS Signal
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default SOS