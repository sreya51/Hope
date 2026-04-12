import { useState } from 'react'
import './Volunteer.css'

function Volunteer() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', location: '', skills: []
  })

  const skillOptions = [
    { name: 'Medical', desc: 'First aid, nursing, or medical support' },
    { name: 'Food Distribution', desc: 'Distribute food to affected people' },
    { name: 'Communication', desc: 'Coordinate and relay information' },
    { name: 'Transportation', desc: 'Drive or arrange transport for supplies' },
    { name: 'Search & Rescue', desc: 'Locate and assist trapped individuals' },
    { name: 'Counseling', desc: 'Provide mental health support' },
  ]

  const toggleSkill = (skill) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('http://localhost:5000/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch (err) {
      setError('Failed to submit. Please try again.')
    }
  }

  return (
    <div className="volunteer-page">
      {submitted ? (
        <div className="vol-success">
          <div className="success-icon">🙋</div>
          <h2>Registration Successful!</h2>
          <p>Thank you for volunteering. We will contact you soon.</p>
          <button onClick={() => { setSubmitted(false); setStep(1) }}>Register Another</button>
        </div>
      ) : (
        <div className="vol-split">

          {/* LEFT */}
          <div className="vol-left">
            <div className="vol-left-bg"></div>
            <div className="vol-left-content">
              <span className="vol-badge"> Volunteer</span>
              <h1>Join as a<br /><span>Volunteer</span></h1>
              <p>Register your skills and help people in crisis. Every helping hand matters.</p>
              <div className="vol-stats">
                <div className="vol-stat-item">
                  <span className="vol-stat-num">1,200+</span>
                  <span className="vol-stat-text">Active volunteers worldwide</span>
                </div>
                <div className="vol-stat-item">
                  <span className="vol-stat-num">6</span>
                  <span className="vol-stat-text">Skill categories needed</span>
                </div>
                <div className="vol-stat-item">
                  <span className="vol-stat-num">3</span>
                  <span className="vol-stat-text">Crisis zones needing help now</span>
                </div>
              </div>
              <div className="vol-quote">
                <div className="vol-quote-mark">"</div>
                <p>I helped 50 families in Gaza find shelter through HOPE. It took just one registration.</p>
                <span>— Sarah K., Medical Volunteer</span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="vol-right">

            {/* PROGRESS */}
            <div className="vol-progress">
              <div className="vol-progress-steps">
                <div className={`vol-step ${step >= 1 ? 'active' : ''}`}>
                  <div className="vol-step-circle">1</div>
                  <span>Personal Info</span>
                </div>
                <div className={`vol-step-line ${step >= 2 ? 'active' : ''}`}></div>
                <div className={`vol-step ${step >= 2 ? 'active' : ''}`}>
                  <div className="vol-step-circle">2</div>
                  <span>Your Skills</span>
                </div>
              </div>
            </div>

            <div className="vol-form-wrap">
              <h2>{step === 1 ? 'Personal Information' : 'Your Skills'}</h2>
              <p className="vol-sub">
                {step === 1
                  ? 'Tell us about yourself so we can connect you with relief teams.'
                  : `Select your skills — ${form.skills.length} selected`}
              </p>

              {error && <p className="vol-error">{error}</p>}

              <form onSubmit={handleSubmit} className="vol-form">

                {step === 1 && (
                  <>
                    <div className="form-group floating">
                      <input type="text" id="vol-name" placeholder=" "
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                      <label htmlFor="vol-name">Full Name</label>
                    </div>
                    <div className="form-group floating">
                      <input type="email" id="vol-email" placeholder=" "
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                      <label htmlFor="vol-email">Email Address</label>
                    </div>
                    <div className="form-group floating">
                      <input type="tel" id="vol-phone" placeholder=" "
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                      <label htmlFor="vol-phone">Phone Number</label>
                    </div>
                    <div className="form-group floating">
                      <input type="text" id="vol-location" placeholder=" "
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })} required />
                      <label htmlFor="vol-location">Your Location</label>
                    </div>
                    <button type="button" className="submit-btn"
                      onClick={() => {
                        if (!form.name || !form.email || !form.phone || !form.location) {
                          setError('Please fill all fields.')
                          return
                        }
                        setError('')
                        setStep(2)
                      }}>
                      Next → Skills
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="skills-grid">
                      {skillOptions.map(skill => (
                        <div key={skill.name}
                          className={`skill-card ${form.skills.includes(skill.name) ? 'active' : ''}`}
                          onClick={() => toggleSkill(skill.name)}>
                          <div className="skill-card-name">{skill.name}</div>
                          <div className="skill-card-desc">{skill.desc}</div>
                          {form.skills.includes(skill.name) && (
                            <div className="skill-check">✓</div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="vol-step2-btns">
                      <button type="button" className="back-btn" onClick={() => setStep(1)}>
                        ← Back
                      </button>
                      <button type="submit" className="submit-btn">
                        Register as Volunteer
                      </button>
                    </div>
                  </>
                )}

              </form>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default Volunteer