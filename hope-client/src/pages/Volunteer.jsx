import { useState } from 'react'
import './Volunteer.css'

function Volunteer() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', location: '', skills: []
  })

  const skillOptions = ['Medical', 'Food Distribution', 'Communication', 'Transportation', 'Search & Rescue', 'Counseling']

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
          <button onClick={() => setSubmitted(false)}>Register Another</button>
        </div>
      ) : (
        <div className="vol-container">
          <div className="vol-header">
            <span className="vol-badge">Volunteer</span>
            <h1>Join as a Volunteer</h1>
            <p>Register your skills and help people in crisis. Every helping hand matters.</p>
          </div>
          {error && <p style={{ color: '#C0392B', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}
          <form onSubmit={handleSubmit} className="vol-form">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" placeholder="Enter your phone number" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input type="text" placeholder="Your city or area" value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Your Skills</label>
              <div className="skills-grid">
                {skillOptions.map(skill => (
                  <button type="button" key={skill}
                    className={`skill-btn ${form.skills.includes(skill) ? 'active' : ''}`}
                    onClick={() => toggleSkill(skill)}>
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="submit-btn">Register as Volunteer</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Volunteer