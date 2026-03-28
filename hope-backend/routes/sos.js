const router = require('express').Router()
const SOS = require('../models/SOS')

router.post('/', async (req, res) => {
  try {
    const sos = await SOS.create(req.body)
    req.io.emit('new-sos', sos)
    res.json(sos)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const list = await SOS.find().sort({ createdAt: -1 })
    res.json(list)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const sos = await SOS.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
    res.json(sos)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router