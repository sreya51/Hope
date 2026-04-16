const router = require('express').Router()
const Donate = require('../models/Donate')

router.post('/', async (req, res) => {
  try {
    const donate = await Donate.create(req.body)
    res.json(donate)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const list = await Donate.find().sort({ createdAt: -1 })
    res.json(list)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router