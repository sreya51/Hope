import { useState, useEffect } from 'react'
import { getSOSList, updateSOS } from '../api'
import './Admin.css'

function Admin() {
  const [sosList, setSosList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSOS()
  }, [])

  const fetchSOS = async () => {
    try {
      const res = await getSOSList()
      setSosList(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatus = async (id, status) => {
    try {
      await updateSOS(id, status)
      fetchSOS()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <span className="admin-badge">Admin</span>
        <h1>Admin Dashboard</h1>
        <p>Monitor and manage all SOS signals in real-time.</p>
      </div>
      <div className="admin-stats">
        <div className="stat-card">
          <span>{sosList.length}</span>
          <p>Total SOS</p>
        </div>
        <div className="stat-card">
          <span>{sosList.filter(s => s.status === 'pending').length}</span>
          <p>Pending</p>
        </div>
        <div className="stat-card">
          <span>{sosList.filter(s => s.status === 'resolved').length}</span>
          <p>Resolved</p>
        </div>
      </div>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : sosList.length === 0 ? (
        <p className="no-data">No SOS signals yet.</p>
      ) : (
        <div className="sos-table">
          {sosList.map((sos) => (
            <div key={sos._id} className={`sos-row ${sos.status}`}>
              <div className="sos-info">
                <h3>{sos.name}</h3>
                <p>{sos.message}</p>
                <p className="sos-location">{sos.location}</p>
                <p className="sos-time">{new Date(sos.createdAt).toLocaleString()}</p>
              </div>
              <div className="sos-actions">
                <span className={`status-badge ${sos.status}`}>{sos.status}</span>
                <select value={sos.status} onChange={(e) => handleStatus(sos._id, e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Admin