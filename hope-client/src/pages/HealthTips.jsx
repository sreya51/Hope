import './HealthTips.css'

function HealthTips() {
  const tips = [
    {
      category: 'First Aid',
      icon: '🩹',
      items: [
        'Apply pressure to bleeding wounds with clean cloth',
        'Do not remove embedded objects from wounds',
        'Keep injured person warm and calm',
        'Check breathing and pulse regularly',
      ]
    },
    {
      category: 'Survival',
      icon: '🏕️',
      items: [
        'Stay low when moving in dangerous areas',
        'Signal rescuers with mirror or whistle',
        'Find shelter before dark',
        'Conserve phone battery for emergencies',
      ]
    },
    {
      category: 'Safety',
      icon: '🛡️',
      items: [
        'Stay away from damaged buildings',
        'Avoid unknown liquids or substances',
        'Keep important documents in waterproof bag',
        'Have an emergency meeting point with family',
      ]
    },
    {
      category: 'Mental Health',
      icon: '🧠',
      items: [
        'Breathe slowly and deeply to reduce panic',
        'Stay connected with trusted people',
        'Focus on what you can control',
        'Help others — it reduces your own stress',
      ]
    },
  ]

  return (
    <div className="tips-page">
      <div className="tips-header">
        <span className="tips-badge">Health & Safety</span>
        <h1>Emergency Tips</h1>
        <p>Essential information to stay safe during crisis situations.</p>
      </div>
      <div className="tips-grid">
        {tips.map((tip, i) => (
          <div key={i} className="tip-card">
            <div className="tip-icon">{tip.icon}</div>
            <h3>{tip.category}</h3>
            <ul>
              {tip.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HealthTips