import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SOS from './pages/SOS'
import Map from './pages/Map'
import Volunteer from './pages/Volunteer'
import Donate from './pages/Donate'
import Resources from './pages/Resources'
import HealthTips from './pages/HealthTips'
import Login from './pages/Login'
import Admin from './pages/Admin'
import './App.css'

function AdminRoute() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return user?.role === 'admin' ? <Admin /> : <Navigate to="/" />
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sos" element={<SOS />} />
        <Route path="/map" element={<Map />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/health" element={<HealthTips />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App