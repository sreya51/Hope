import { useState } from 'react'
import { sendSOS } from '../api'
import './SOS.css'

function SOS() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', message: '', location: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await sendSOS(form)
      setSubmitted(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send SOS')
    }
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
        <div className="sos-card">

          {/* LEFT PANEL */}
          <div className="sos-panel">
            <div className="sos-panel-bg"></div>
            <div className="sos-panel-content">
              <div className="sos-logo">HOPE</div>
              <div className="sos-divider"></div>

              <div className="panel-title">Send <span>SOS</span><br />Signal</div>
              <div className="panel-sub">Your distress signal will be sent to nearby volunteers and relief teams immediately.</div>
              <div className="sos-steps">
                <div className="sos-step">
                  <div className="step-num">1</div>
                  <div className="step-text">Enter your name and situation</div>
                </div>
                <div className="sos-step">
                  <div className="step-num">2</div>
                  <div className="step-text">Share your location</div>
                </div>
                <div className="sos-step">
                  <div className="step-num">3</div>
                  <div className="step-text">Hit Send — help is on the way</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="sos-form-side">
            <div className="sos-badge">
              <div className="badge-dot"></div>
              Emergency
            </div>
            <div className="form-title">I Need Help</div>
            <div className="form-sub">Fill in the details below. We'll connect you with help immediately.</div>

            {error && <div className="error-msg">{error}</div>}

            <form onSubmit={handleSubmit} className="fields">
              <div className="floating">
                <input type="text" placeholder=" " id="sos-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required />
                <label htmlFor="sos-name">Your Name</label>
              </div>

              <div className="floating">
                <textarea placeholder=" " id="sos-msg" rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required />
                <label htmlFor="sos-msg">Describe your emergency situation</label>
              </div>

              <div className="loc-row">
                <div className="floating">
                  <input type="text" placeholder=" " id="sos-loc"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })} />
                  <label htmlFor="sos-loc">Your Location</label>
                </div>
                <button type="button" className="detect-btn" onClick={getLocation}>
                   Detect
                </button>
              </div>

              <button type="submit" className="sos-btn">
                Send SOS Signal
              </button>
            </form>
          </div>

        </div>
      )}
    </div>
  )
}

export default SOS