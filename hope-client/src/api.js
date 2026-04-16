import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000/api' })

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) req.headers.Authorization = `Bearer ${token}`
  return req
})

export const register = (data) => API.post('/auth/register', data)
export const login = (data) => API.post('/auth/login', data)
export const sendSOS = (data) => API.post('/sos', data)
export const getSOSList = () => API.get('/sos')
export const updateSOS = (id, status) => API.patch(`/sos/${id}`, { status })
export const getVolunteers = () => API.get('/volunteer')
export const registerVolunteer = (data) => API.post('/volunteer', data)
export const submitDonate = (data) => API.post('/donate', data)
export const getDonations = () => API.get('/donate')
export const shareResource = (data) => API.post('/resource', data)
export const getResources = () => API.get('/resource')