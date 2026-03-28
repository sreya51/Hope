const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/database')

dotenv.config()
connectDB()

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: { origin: '*' }
})

app.use(cors())
app.use(express.json())
app.use((req, res, next) => { req.io = io; next() })

app.use('/api/auth', require('./routes/auth'))
app.use('/api/sos', require('./routes/sos'))
app.use('/api/volunteer', require('./routes/volunteer'))

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)
  socket.on('sendSOS', (data) => {
    console.log('SOS Received:', data)
    io.emit('newSOS', data)
  })
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

app.get('/', (req, res) => {
  res.json({ message: 'Hope Backend is Running Successfully!' })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})