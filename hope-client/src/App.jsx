import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SOS from './pages/SOS'
import Map from './pages/Map'
import Volunteer from './pages/Volunteer'
import Donate from './pages/Donate'
import Resources from './pages/Resources'
import HealthTips from './pages/HealthTips'
import Login from './pages/Login'
import './App.css'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App