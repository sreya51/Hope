import { useEffect, useState } from 'react'
import './Map.css'

function Map() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(-1)

  const shelters = [
    { name: 'Gaza City Relief Center', location: 'Gaza City, Palestine', lat: 31.5017, lng: 34.4668, type: 'shelter' },
    { name: 'Khan Younis Hospital', location: 'Khan Younis, Gaza', lat: 31.3452, lng: 34.3036, type: 'hospital' },
    { name: 'Rafah Aid Camp', location: 'Rafah, Gaza', lat: 31.2832, lng: 34.2459, type: 'food' },
    { name: 'Kyiv Emergency Shelter', location: 'Kyiv, Ukraine', lat: 50.4501, lng: 30.5234, type: 'shelter' },
    { name: 'Kharkiv Medical Center', location: 'Kharkiv, Ukraine', lat: 49.9935, lng: 36.2304, type: 'hospital' },
    { name: 'Lviv Safe Zone', location: 'Lviv, Ukraine', lat: 49.8397, lng: 24.0297, type: 'shelter' },
    { name: 'Aleppo Relief Point', location: 'Aleppo, Syria', lat: 36.2021, lng: 37.1343, type: 'food' },
    { name: 'Idlib Aid Center', location: 'Idlib, Syria', lat: 35.9306, lng: 36.6339, type: 'shelter' },
    { name: 'Mogadishu Relief Camp', location: 'Mogadishu, Somalia', lat: 2.0469, lng: 45.3182, type: 'food' },
    { name: 'Kabul Safe Shelter', location: 'Kabul, Afghanistan', lat: 34.5553, lng: 69.2075, type: 'shelter' },
  ]

  const filtered = shelters.filter(s =>
    filter === 'all' || s.type === filter
  )

  useEffect(() => {
    if (document.getElementById('map')._leaflet_id) return

    const L = window.L
    const map = L.map('map').setView([31.5017, 34.4668], 5)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map)

    const colors = { shelter: '#C0392B', hospital: '#1565c0', food: '#2e7d32' }

    shelters.forEach((s, i) => {
      const icon = L.divIcon({
        className: '',
        html: `<div style="
          width:28px;height:28px;
          background:${colors[s.type]};
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 2px 6px rgba(0,0,0,0.3);
          border:2px solid #fff;
        "></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      })

      L.marker([s.lat, s.lng], { icon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family:sans-serif;min-width:160px;">
            <strong style="font-size:14px;">${s.name}</strong><br/>
            <span style="font-size:12px;color:#666;">${s.location}</span><br/>
            <span style="
              display:inline-block;margin-top:6px;
              background:${colors[s.type]}22;
              color:${colors[s.type]};
              padding:2px 10px;border-radius:10px;
              font-size:11px;font-weight:700;
              text-transform:uppercase;
            ">${s.type}</span>
          </div>
        `)
        .on('click', () => setSelected(i))
    })
  }, [])

  return (
    <div className="map-page">

      {/* SIDEBAR */}
      <div className="map-sidebar">
        <div className="sidebar-top">
          <div className="sidebar-title">Find Nearby Shelters</div>
          <div className="sidebar-sub">Locate safe zones in crisis areas</div>
          <div className="sidebar-filters">
            {['all', 'shelter', 'hospital', 'food'].map(f => (
              <button
                key={f}
                className={`sfilt ${f} ${filter === f ? 'active' : ''}`}
                onClick={() => { setFilter(f); setSelected(-1) }}>
                {f === 'all' ? 'All' :
                 f === 'shelter' ? '🔴 Shelter' :
                 f === 'hospital' ? '🔵 Hospital' : '🟢 Food'}
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-count">
          Showing {filtered.length} location{filtered.length !== 1 ? 's' : ''}
        </div>

        <div className="sidebar-list">
          {filtered.map((s, i) => {
            const realIdx = shelters.indexOf(s)
            return (
              <div
                key={i}
                className={`sitem ${selected === realIdx ? 'active' : ''}`}
                onClick={() => setSelected(realIdx)}>
                <div className="sitem-top">
                  <div className="sitem-name">{s.name}</div>
                  <span className={`sitem-tag ${s.type}`}>{s.type}</span>
                </div>
                <div className="sitem-loc">📍 {s.location}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* MAP */}
      <div className="map-area">
        <div id="map"></div>
        <div className="map-legend">
          <div className="leg-item"><div className="leg-dot shelter"></div>Shelter</div>
          <div className="leg-item"><div className="leg-dot hospital"></div>Hospital</div>
          <div className="leg-item"><div className="leg-dot food"></div>Food</div>
        </div>
      </div>

    </div>
  )
}

export default Map