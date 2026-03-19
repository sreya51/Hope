import { useState } from 'react'
import './Donate.css'

function Donate() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', amount: '', type: 'money', message: '' })
  const amounts = ['10', '25', '50', '100']

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="donate-page">
      {submitted ? (
        <div className="donate-success">
          <div className="success-icon">❤️</div>
          <h2>Thank You for Donating!</h2>
          <p>Your generous contribution will help people in crisis.</p>
          <button onClick={() => setSubmitted(false)}>Donate Again</button>
        </div>
      ) : (
        <div className="donate-container">
          <div className="donate-header">
            <span className="donate-badge">❤️ Donate</span>
            <h1>Support Relief Efforts</h1>
            <p>Your donation helps us provide food, medicine, and shelter to people in need.</p>
          </div>
          <form onSubmit={handleSubmit} className="donate-form">
            <div className="form-group">
              <label>Donation Type</label>
              <div className="type-grid">
                {['money', 'goods', 'services'].map(type => (
                  <button type="button" key={type}
                    className={`type-btn ${form.type === type ? 'active' : ''}`}
                    onClick={() => setForm({ ...form, type })}>
                    {type === 'money' ? '💵 Money' : type === 'goods' ? '📦 Goods' : '🛠️ Services'}
                  </button>
                ))}
              </div>
            </div>
            {form.type === 'money' && (
              <div className="form-group">
                <label>Amount (USD)</label>
                <div className="amount-grid">
                  {amounts.map(amt => (
                    <button type="button" key={amt}
                      className={`amount-btn ${form.amount === amt ? 'active' : ''}`}
                      onClick={() => setForm({ ...form, amount: amt })}>
                      ${amt}
                    </button>
                  ))}
                </div>
                <input type="number" placeholder="Or enter custom amount"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })} />
              </div>
            )}
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" placeholder="Enter your name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Message (Optional)</label>
              <textarea placeholder="Leave a message of support..." value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3} />
            </div>
            <button type="submit" className="submit-btn">❤️ Donate Now</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Donate