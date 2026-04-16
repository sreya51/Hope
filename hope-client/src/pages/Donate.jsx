import { useState } from 'react'
import { submitDonate } from '../api'
import './Donate.css'

function Donate() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', amount: '', type: 'money', message: '', payment: 'googlepay' })
  const amounts = ['10', '25', '50', '100']

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await submitDonate(form)
      setSubmitted(true)
      setForm({ name: '', email: '', amount: '', type: 'money', message: '', payment: 'googlepay' })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="donate-page">
      {submitted ? (
        <div className="donate-success">
          <div className="success-icon">❤️</div>
          <h2>Thank You for Donating!</h2>
          <p>Your generous contribution will help people in crisis across Gaza, Ukraine, Palestine and beyond.</p>
          <button onClick={() => setSubmitted(false)}>Donate Again</button>
        </div>
      ) : (
        <div className="donate-split">

          {/* LEFT */}
          <div className="donate-left">
            <span className="donate-badge"> Donate</span>
            <div className="donate-left-bg"></div>
            <div className="donate-left-content">
              <h1>Help save lives.<br /><span>Donate</span> now.</h1>
              <p>Your support reaches people in Gaza, Ukraine, Palestine and crisis zones worldwide — instantly.</p>
              <div className="impact-stats">
                <div className="impact-item">
                  <span className="impact-num">$10</span>
                  <span className="impact-text">Provides emergency food for a family for 3 days</span>
                </div>
                <div className="impact-item">
                  <span className="impact-num">$25</span>
                  <span className="impact-text">Supplies basic medicine for 5 people</span>
                </div>
                <div className="impact-item">
                  <span className="impact-num">$100</span>
                  <span className="impact-text">Funds shelter for a displaced family for a week</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="donate-right">
            <h2>Your Donation</h2>
            <p className="donate-sub">100% of your donation goes directly to relief efforts.</p>

            <form onSubmit={handleSubmit} className="donate-form">

              {/* DONATION TYPE */}
              <div className="form-group">
                <div className="type-grid-label">Donation Type</div>
                <div className="type-grid">
                  {['money', 'goods', 'services'].map(type => (
                    <button type="button" key={type}
                      className={`type-btn ${form.type === type ? 'active' : ''}`}
                      onClick={() => setForm({ ...form, type })}>
                      <span className="type-label">
                        {type === 'money' ? ' Money' : type === 'goods' ? ' Goods' : 'Services'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* AMOUNT */}
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
                  <div className="form-group floating">
                    <input type="number" className="form-input" id="amount"
                      placeholder=" "
                      value={form.amount}
                      onChange={(e) => setForm({ ...form, amount: e.target.value })} />
                    <label htmlFor="amount">Custom Amount (USD)</label>
                  </div>
                </div>
              )}

              {/* NAME */}
              <div className="form-group floating">
                <input type="text" className="form-input" id="name"
                  placeholder=" "
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <label htmlFor="name">Your Name</label>
              </div>

              {/* EMAIL */}
              <div className="form-group floating">
                <input type="email" className="form-input" id="email"
                  placeholder=" "
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <label htmlFor="email">Email Address</label>
              </div>

              {/* PAYMENT */}
              <div className="form-group">
                <label>Payment Method</label>
                <div className="payment-methods">
                  {[
                    { id: 'googlepay', name: 'Google Pay' },
                    { id: 'bkash', name: 'bKash' },
                  ].map(p => (
                    <button type="button" key={p.id}
                      className={`pay-btn ${form.payment === p.id ? 'active' : ''}`}
                      onClick={() => setForm({ ...form, payment: p.id })}>
                      <span className="pay-icon">{p.icon}</span>
                      <span className="pay-name">{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* MESSAGE */}
              <div className="form-group floating message-group">
                <textarea className="form-input message-input" id="message"
                  placeholder=" "
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3} />
                <label htmlFor="message">Message <span className="optional-tag">Optional</span></label>
                <span className="message-hint">Your words matter as much as your donation.</span>
              </div>

              <button type="submit" className="submit-btn">
                ❤️ Donate Now
              </button>

            </form>
          </div>

        </div>
      )}
    </div>
  )
}

export default Donate