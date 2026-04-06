const router = require('express').Router()
const Volunteer = require('../models/Volunteer')

router.post('/', async (req, res) => {
  try {
    const vol = await Volunteer.create(req.body)
    res.json(vol)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 })
    res.json(volunteers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router