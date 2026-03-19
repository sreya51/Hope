import { useEffect } from 'react'
import './Map.css'

function Map() {
  useEffect(() => {
    if (document.getElementById('map')._leaflet_id) return

    const L = window.L
    const map = L.map('map').setView([31.5017, 34.4668], 5)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map)

    const shelters = [
      { name: 'Gaza City Relief Center', lat: 31.5017, lng: 34.4668, type: 'shelter' },
      { name: 'Khan Younis Hospital', lat: 31.3452, lng: 34.3036, type: 'hospital' },
      { name: 'Rafah Aid Camp', lat: 31.2832, lng: 34.2459, type: 'food' },
      { name: 'Kyiv Emergency Shelter', lat: 50.4501, lng: 30.5234, type: 'shelter' },
      { name: 'Kharkiv Medical Center', lat: 49.9935, lng: 36.2304, type: 'hospital' },
      { name: 'Lviv Safe Zone', lat: 49.8397, lng: 24.0297, type: 'shelter' },
      { name: 'Aleppo Relief Point', lat: 36.2021, lng: 37.1343, type: 'food' },
      { name: 'Idlib Aid Center', lat: 35.9306, lng: 36.6339, type: 'shelter' },
      { name: 'Mogadishu Relief Camp', lat: 2.0469, lng: 45.3182, type: 'food' },
      { name: 'Kabul Safe Shelter', lat: 34.5553, lng: 69.2075, type: 'shelter' },
    ]

    shelters.forEach(s => {
      L.marker([s.lat, s.lng])
        .addTo(map)
        .bindPopup(`<b>${s.name}</b><br/>Type: ${s.type}`)
    })
  }, [])

  return (
    <div className="map-page">
      <div className="map-header">
        <span className="map-badge">Shelter Map</span>
        <h1>Find Nearby Shelters</h1>
        <p>Locate safe zones, hospitals, and food distribution centers near you.</p>
      </div>
      <div className="map-legend">
        <span>Shelter</span>
        <span>Hospital</span>
        <span>Food Center</span>
      </div>
      <div id="map"></div>
    </div>
  )
}

export default Map