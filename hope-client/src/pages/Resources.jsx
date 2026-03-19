import { useState } from 'react'
import './Resources.css'

function Resources() {
  const [tab, setTab] = useState('available')
  const [form, setForm] = useState({ name: '', type: 'food', quantity: '', location: '' })
  const [submitted, setSubmitted] = useState(false)

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

  return (
    <div className="resources-page">
      <div className="resources-header">
        <span className="res-badge">Resources</span>
        <h1>Resource Sharing</h1>
        <p>Share or request food, medicine, water, and other supplies.</p>
      </div>
      <div className="res-tabs">
        <button className={tab === 'available' ? 'active' : ''} onClick={() => setTab('available')}>Available Resources</button>
        <button className={tab === 'share' ? 'active' : ''} onClick={() => setTab('share')}>Share a Resource</button>
      </div>
      {tab === 'available' && (
        <div className="res-grid">
          {resources.map((r, i) => (
            <div key={i} className="res-card">
              <span className="res-type">{r.type}</span>
              <h3>{r.name}</h3>
              <p>Qty: {r.quantity}</p>
              <p>Location: {r.location}</p>
              <p>Donor: {r.donor}</p>
              <button className="req-btn">Request</button>
            </div>
          ))}
        </div>
      )}
      {tab === 'share' && (
        <div className="share-container">
          {submitted ? (
            <div className="share-success">
              <h2>Resource Listed!</h2>
              <p>Your resource has been added successfully.</p>
              <button onClick={() => setSubmitted(false)}>Add Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="share-form">
              <div className="form-group">
                <label>Resource Name</label>
                <input type="text" placeholder="e.g. Rice, Medicine, Water"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option value="food">Food</option>
                  <option value="medicine">Medicine</option>
                  <option value="water">Water</option>
                  <option value="supplies">Supplies</option>
                </select>
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input type="text" placeholder="e.g. 10kg, 5 packs"
                  value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" placeholder="Your city or area"
                  value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
              </div>
              <button type="submit" className="submit-btn">Share Resource</button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

export default Resources