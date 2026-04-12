import { useState } from 'react'
import './Resources.css'

function Resources() {
  const [tab, setTab] = useState('available')
  const [form, setForm] = useState({ name: '', type: 'food', quantity: '', location: '' })
  const [submitted, setSubmitted] = useState(false)
  const [requested, setRequested] = useState({})
const [typeOpen, setTypeOpen] = useState(false)

const typeLabels = {
  food: 'Food',
  medicine: 'Medicine',
  water: 'Water',
  supplies: 'Supplies'
}
  const resources = [
    { name: 'Emergency Food Pack', type: 'food', quantity: '200 packs', location: 'Gaza City', donor: 'UNRWA' },
    { name: 'Medical Supplies', type: 'medicine', quantity: '50 kits', location: 'Khan Younis', donor: 'MSF' },
    { name: 'Clean Water', type: 'water', quantity: '500L', location: 'Rafah', donor: 'Red Cross' },
    { name: 'Blankets & Tents', type: 'supplies', quantity: '100 pcs', location: 'Kyiv', donor: 'UNHCR' },
    { name: 'Baby Food', type: 'food', quantity: '80 packs', location: 'Aleppo', donor: 'UNICEF' },
    { name: 'First Aid Kits', type: 'medicine', quantity: '30 kits', location: 'Kharkiv', donor: 'WHO' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const toggleRequest = (i) => {
    setRequested(prev => ({ ...prev, [i]: !prev[i] }))
  }

  return (
    <div className="resources-page">

      <div className="res-split">

        {/* LEFT */}
        <div className="res-left">
          <div className="res-left-bg"></div>
          <div className="res-left-content">
            <span className="res-badge"> Resources</span>
            <h1>Resource<br /><span>Sharing</span></h1>
            <p>Share or request food, medicine, water, and essential supplies for people in crisis worldwide.</p>
            <div className="res-stats">
              <div className="res-stat-item">
                <span className="res-stat-num">6</span>
                <span className="res-stat-text">Active resources available now</span>
              </div>
              <div className="res-stat-item">
                <span className="res-stat-num">3</span>
                <span className="res-stat-text">Crisis zones covered</span>
              </div>
              <div className="res-stat-item">
                <span className="res-stat-num">5+</span>
                <span className="res-stat-text">International aid organizations</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="res-right">

          {/* TABS */}
          <div className="res-tabs">
            <button
              className={tab === 'available' ? 'active' : ''}
              onClick={() => setTab('available')}>
              Available Resources
            </button>
            <button
              className={tab === 'share' ? 'active' : ''}
              onClick={() => setTab('share')}>
              Share a Resource
            </button>
          </div>

          {/* AVAILABLE */}
          {tab === 'available' && (
            <div className="res-body">
              <div className="res-grid">
                {resources.map((r, i) => (
                  <div key={i} className="res-card">
                    <span className="res-type">{r.type}</span>
                    <h3>{r.name}</h3>
                    <div className="res-info">
                      <div className="res-info-row">
                        <span className="res-info-label">Qty</span>
                        <span className="res-info-value">{r.quantity}</span>
                      </div>
                      <div className="res-info-row">
                        <span className="res-info-label">Location</span>
                        <span className="res-info-value">{r.location}</span>
                      </div>
                      <div className="res-info-row">
                        <span className="res-info-label">Donor</span>
                        <span className="res-info-value">{r.donor}</span>
                      </div>
                    </div>
                    <button
                      className={`req-btn ${requested[i] ? 'requested' : ''}`}
                      onClick={() => toggleRequest(i)}>
                      {requested[i] ? '✓ Requested' : 'Request'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SHARE */}
          {tab === 'share' && (
            <div className="res-body res-body-center">
              <div className="share-container">
                {submitted ? (
                  <div className="share-success">
                    <div>📦</div>
                    <h2>Resource Listed!</h2>
                    <p>Your resource has been added successfully.</p>
                    <button onClick={() => setSubmitted(false)}>Add Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="share-form">
                    <div className="form-group floating">
                      <input type="text" id="res-name" placeholder=" "
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                      <label htmlFor="res-name">Resource Name</label>
                    </div>
                   <div className="form-group">
  <label>Type</label>
  <div className="custom-select-wrap">
    <div
      className={`custom-select ${typeOpen ? 'open' : ''}`}
      onClick={() => setTypeOpen(!typeOpen)}>
      <span>{typeLabels[form.type]}</span>
      <span className="select-arrow">▾</span>
    </div>
    {typeOpen && (
      <div className="custom-options">
        {[
          { value: 'food', label: 'Food' },
          { value: 'medicine', label: 'Medicine' },
          { value: 'water', label: 'Water' },
          { value: 'supplies', label: 'Supplies' },
        ].map(opt => (
          <div
            key={opt.value}
            className={`custom-option ${form.type === opt.value ? 'selected' : ''}`}
            onClick={() => {
              setForm({ ...form, type: opt.value })
              setTypeOpen(false)
            }}>
            <span className="opt-icon">{opt.icon}</span>
            <span>{opt.label}</span>
            {form.type === opt.value && <span className="opt-check">✓</span>}
          </div>
        ))}
      </div>
    )}
  </div>
</div>
                    <div className="form-group floating">
                      <input type="text" id="res-qty" placeholder=" "
                        value={form.quantity}
                        onChange={(e) => setForm({ ...form, quantity: e.target.value })} required />
                      <label htmlFor="res-qty">Quantity</label>
                    </div>
                    <div className="form-group floating">
                      <input type="text" id="res-loc" placeholder=" "
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })} required />
                      <label htmlFor="res-loc">Location</label>
                    </div>
                    <button type="submit" className="submit-btn">Share Resource</button>
                  </form>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Resources