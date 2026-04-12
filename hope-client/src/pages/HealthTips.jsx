import { useState } from 'react'
import './HealthTips.css'

function HealthTips() {
  const [filter, setFilter] = useState('all')

  const tips = [
    {
      category: 'first-aid',
      label: 'First Aid',
      icon: '🩹',
      items: [
        'Apply pressure to bleeding wounds with clean cloth',
        'Do not remove embedded objects from wounds',
        'Keep injured person warm and calm',
        'Check breathing and pulse regularly',
      ]
    },
    {
      category: 'survival',
      label: 'Survival',
      icon: '🏕️',
      items: [
        'Stay low when moving in dangerous areas',
        'Signal rescuers with mirror or whistle',
        'Find shelter before dark',
        'Conserve phone battery for emergencies',
      ]
    },
    {
      category: 'safety',
      label: 'Safety',
      icon: '🛡️',
      items: [
        'Stay away from damaged buildings',
        'Avoid unknown liquids or substances',
        'Keep important documents in waterproof bag',
        'Have an emergency meeting point with family',
      ]
    },
    {
      category: 'mental',
      label: 'Mental Health',
      icon: '🧠',
      items: [
        'Breathe slowly and deeply to reduce panic',
        'Stay connected with trusted people',
        'Focus on what you can control',
        'Help others — it reduces your own stress',
      ]
    },
  ]

  const filtered = tips.filter(tip =>
    filter === 'all' || tip.category === filter
  )

  return (
    <div className="tips-page">

     {/* HERO */}
<div className="tips-hero">
  <div className="tips-hero-bg"></div>
  <div className="tips-hero-content">
    <span className="tips-badge">Health & Safety</span>
    <h1>Health Tips</h1>
    <p>Essential information to stay safe during crisis situations. Stay calm, stay informed, stay alive.</p>

  </div>
</div>

      {/* TIPS GRID */}
      <div className="tips-body">
        <div className="tips-grid">
          {filtered.length > 0 ? filtered.map((tip, i) => (
            <div key={i} className="tip-card">
              <div className="tip-card-header">
                <div className="tip-icon-wrap">{tip.icon}</div>
                <h3>{tip.label}</h3>
              </div>
              <ul>
                {tip.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          )) : (
            <div className="no-results">No tips found.</div>
          )}
        </div>

        {/* DOS & DONTS */}
        <div className="dos-donts">
          <div className="dos-donts-title">Do's & Don'ts in a Crisis</div>
          <div className="dos-donts-sub">Follow these guidelines to stay safe and help others effectively</div>
          <div className="dos-donts-grid">
            <div className="dos">
              <h4>✓ Do's</h4>
              <ul>
                <li>Stay calm and think clearly before acting</li>
                <li>Help injured people if it is safe to do so</li>
                <li>Follow instructions from authorities</li>
                <li>Keep emergency contacts saved offline</li>
                <li>Stock up on water, food & medicine</li>
                <li>Charge your phone whenever possible</li>
              </ul>
            </div>
            <div className="donts">
              <h4>✗ Don'ts</h4>
              <ul>
                <li>Don't spread unverified information</li>
                <li>Don't return to unsafe areas too soon</li>
                <li>Don't ignore warning signals or alerts</li>
                <li>Don't use elevators during emergencies</li>
                <li>Don't drink unknown water sources</li>
                <li>Don't leave family without a contact plan</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HealthTips