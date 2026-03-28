const router = require('express').Router()
const User = require('../models/User')

router.get('/', async (req, res) => {
  try {
    const volunteers = await User.find({ role: 'volunteer' }).select('-password')
    res.json(volunteers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router