import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <img src="/logo.png" alt="Hope" />
        </div>
        <div className="login-tabs">
          <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
          <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Register</button>
        </div>

        {submitted ? (
          <div className="login-success">
            <h2>{isLogin ? 'Welcome Back!' : 'Account Created!'}</h2>
            <p>{isLogin ? 'You are now logged in.' : 'Your account has been created successfully.'}</p>
            <Link to="/" className="home-btn">Go to Home</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your name"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
            )}
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password"
                value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            </div>
            {!isLogin && (
              <div className="form-group">
                <label>Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                  <option value="user">Affected Person</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="ngo">NGO / Relief Team</option>
                </select>
              </div>
            )}
            <button type="submit" className="submit-btn">
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Login