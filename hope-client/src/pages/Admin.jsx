import { useState, useEffect } from 'react'
import { getSOSList, updateSOS, getVolunteers } from '../api'
import './Admin.css'

function Admin() {
  const [sosList, setSosList] = useState([])
  const [volunteers, setVolunteers] = useState([])
  const [tab, setTab] = useState('sos')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [sosRes, volRes] = await Promise.all([getSOSList(), getVolunteers()])
      setSosList(sosRes.data)
      setVolunteers(volRes.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatus = async (id, status) => {
    try {
      await updateSOS(id, status)
      fetchData()
    } catch (err) {
      console.log(err)
    }
  }

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?'

  return (
    <div className="admin-page">

      {/* HERO */}
      <div className="admin-hero">
        <div className="admin-hero-bg"></div>
        <div className="admin-hero-content">
          <div className="admin-badge">⚙️ Admin</div>
          <h1>Admin Dashboard</h1>
          <p>Monitor and manage all SOS signals and volunteers.</p>
        </div>
      </div>

      <div className="admin-body">

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-num">{sosList.length}</span>
            <span className="stat-label">Total SOS</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">{sosList.filter(s => s.status === 'pending').length}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">{sosList.filter(s => s.status === 'resolved').length}</span>
            <span className="stat-label">Resolved</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">{volunteers.length}</span>
            <span className="stat-label">Volunteers</span>
          </div>
        </div>

        {/* TABS */}
        <div className="admin-tabs">
          <button
            className={`admin-tab ${tab === 'sos' ? 'active' : ''}`}
            onClick={() => setTab('sos')}>
            SOS Signals
          </button>
          <button
            className={`admin-tab ${tab === 'volunteers' ? 'active' : ''}`}
            onClick={() => setTab('volunteers')}>
            Volunteers
          </button>
        </div>

        <div className="tab-body">

          {loading ? (
            <p className="no-data">Loading...</p>
          ) : tab === 'sos' ? (
            sosList.length === 0 ? (
              <p className="no-data">No SOS signals yet.</p>
            ) : (
              <div className="sos-table">
                {sosList.map((sos) => (
                  <div key={sos._id} className={`sos-row ${sos.status}`}>
                    <div className="sos-info">
                      <h3>{sos.name}</h3>
                      <p>{sos.message}</p>
                      <p className="sos-location">📍 {sos.location}</p>
                      <p className="sos-time">{new Date(sos.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="sos-actions">
                      <span className={`status-badge ${sos.status}`}>{sos.status}</span>
                      <select
                        className="status-select"
                        value={sos.status}
                        onChange={(e) => handleStatus(sos._id, e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            volunteers.length === 0 ? (
              <p className="no-data">No volunteers yet.</p>
            ) : (
              <div className="vol-table">
                {volunteers.map((vol) => (
                  <div key={vol._id} className="vol-card">
                    <div className="vol-card-top">
                      <div className="vol-avatar">{getInitial(vol.name)}</div>
                      <div>
                        <div className="vol-name">{vol.name}</div>
                        <div className="vol-role">Volunteer</div>
                      </div>
                    </div>
                    <div className="vol-info">
                      <div className="vol-info-row">
                        <span className="vol-info-label">Email</span>
                        <span className="vol-info-value">{vol.email}</span>
                      </div>
                      <div className="vol-info-row">
                        <span className="vol-info-label">Phone</span>
                        <span className="vol-info-value">{vol.phone}</span>
                      </div>
                      <div className="vol-info-row">
                        <span className="vol-info-label">Location</span>
                        <span className="vol-info-value">{vol.location}</span>
                      </div>
                    </div>
                    {vol.skills?.length > 0 && (
                      <div className="vol-skills">
                        {vol.skills.map((skill, i) => (
                          <span key={i} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          )}

        </div>
      </div>
    </div>
  )
}

export default Admin