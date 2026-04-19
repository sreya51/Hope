import { useState, useEffect } from 'react'
import { shareResource, getResources } from '../api'
import './Resources.css'

function Resources() {
  const [tab, setTab] = useState('available')
  const [form, setForm] = useState({ name: '', type: 'food', quantity: '', location: '' })
  const [submitted, setSubmitted] = useState(false)
  const [requested, setRequested] = useState({})
  const [typeOpen, setTypeOpen] = useState(false)
  const [resources, setResources] = useState([])
  

  const typeLabels = {
    food: 'Food',
    medicine: 'Medicine',
    water: 'Water',
    supplies: 'Supplies'
  }

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    try {
      const res = await getResources()
      setResources(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await shareResource(form)
      setSubmitted(true)
      setForm({ name: '', type: 'food', quantity: '', location: '' })
      fetchResources()
    } catch (err) {
      console.log(err)
    }
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
                <span className="res-stat-num">{resources.length}</span>
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
              {resources.length === 0 ? (
                <p style={{textAlign:'center', color:'#888', marginTop:'40px'}}>No resources yet.</p>
              ) : (
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
                          <span className="res-info-value">{r.donor || 'Anonymous'}</span>
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
              )}
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