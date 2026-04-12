import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, register } from '../api'
import './Login.css'

function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' })
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [roleOpen, setRoleOpen] = useState(false)
  const navigate = useNavigate()

  const roleLabels = {
    user: 'Affected Person',
    volunteer: 'Volunteer',
    ngo: 'NGO / Relief Team'
  }

  const roleOptions = [
    { value: 'user', label: 'Affected Person'  },
    { value: 'volunteer', label: 'Volunteer'},
    { value: 'ngo', label: 'NGO / Relief Team'},
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = isLogin ? await login(form) : await register(form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  const switchMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setForm({ name: '', email: '', password: '', role: 'user' })
    setShowPass(false)
    setRoleOpen(false)
  }

  return (
    <div className="login-page">
      <div className={`login-card ${isLogin ? 'show-login' : 'show-register'}`}>
        <div className="forms-wrap">

          {/* LOGIN FORM */}
          <div className="form-section login-section">
            <div className="form-title">Hello, Welcome!</div>
            <div className="form-sub">Sign in to your HOPE account</div>
            {isLogin && error && <div className="error-msg">{error}</div>}
            <form onSubmit={handleSubmit} className="fields">
              <div className="floating">
                <input
                  type="email"
                  placeholder=" "
                  id="l-email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required={isLogin} />
                <label htmlFor="l-email">Email Address</label>
              </div>
              <div className="floating pass-wrap">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder=" "
                  id="l-pass"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required={isLogin} />
                <label htmlFor="l-pass">Password</label>
                <button type="button" className="pass-toggle"
  onClick={() => setShowPass(!showPass)}>
  {showPass ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )}
</button>
              </div>
              {isLogin && (
                <button type="submit" className="submit-btn">Login</button>
              )}
            </form>
          </div>

          {/* REGISTER FORM */}
          <div className="form-section register-section">
            <div className="form-title">Create Account</div>
            <div className="form-sub">Join HOPE and make a difference</div>
            {!isLogin && error && <div className="error-msg">{error}</div>}
            <form onSubmit={handleSubmit} className="fields">
              <div className="floating">
                <input
                  type="text"
                  placeholder=" "
                  id="r-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required={!isLogin} />
                <label htmlFor="r-name">Full Name</label>
              </div>
              <div className="floating">
                <input
                  type="email"
                  placeholder=" "
                  id="r-email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required={!isLogin} />
                <label htmlFor="r-email">Email Address</label>
              </div>
              <div className="floating pass-wrap">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder=" "
                  id="r-pass"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required={!isLogin} />
                <label htmlFor="r-pass">Password</label>
                <button type="button" className="pass-toggle"
  onClick={() => setShowPass(!showPass)}>
  {showPass ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )}
</button>
              </div>

              {/* CUSTOM DROPDOWN */}
              <div className="custom-select-wrap">
                <div
                  className={`custom-select ${roleOpen ? 'open' : ''}`}
                  onClick={() => setRoleOpen(!roleOpen)}>
                  <span>{roleLabels[form.role]}</span>
                  <span className="select-arrow">▾</span>
                </div>
                {roleOpen && (
                  <div className="custom-options">
                    {roleOptions.map(opt => (
                      <div
                        key={opt.value}
                        className={`custom-option ${form.role === opt.value ? 'selected' : ''}`}
                        onClick={() => {
                          setForm({ ...form, role: opt.value })
                          setRoleOpen(false)
                        }}>
                        <span className="opt-icon">{opt.icon}</span>
                        <span>{opt.label}</span>
                        {form.role === opt.value && (
                          <span className="opt-check">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {!isLogin && (
                <button type="submit" className="submit-btn">Create Account</button>
              )}
            </form>
          </div>

          {/* SLIDING PANEL */}
          <div className="slide-panel">
            <div className="panel-bg"></div>
            <div className="panel-content">
              <div className="panel-logo">HOPE</div>
              <div className="panel-divider"></div>
              {isLogin ? (
                <>
                  <div className="panel-title">Don't have an account?</div>
                  <div className="panel-sub">Join HOPE and help people<br />in crisis worldwide.</div>
                  <button className="panel-btn" onClick={switchMode}>Register →</button>
                </>
              ) : (
                <>
                  <div className="panel-title">Welcome Back!</div>
                  <div className="panel-sub">Already have an account?<br />Sign in to continue.</div>
                  <button className="panel-btn" onClick={switchMode}>← Login</button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login