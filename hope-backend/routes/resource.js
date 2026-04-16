const router = require('express').Router()
const Resource = require('../models/Resource')

router.post('/', async (req, res) => {
  try {
    const resource = await Resource.create(req.body)
    res.json(resource)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const list = await Resource.find().sort({ createdAt: -1 })
    res.json(list)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router