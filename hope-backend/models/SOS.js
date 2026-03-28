const mongoose = require('mongoose')
const sosSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  location: { type: String },
  status: { type: String, enum: ['pending', 'active', 'resolved'], default: 'pending' }
}, { timestamps: true })
module.exports = mongoose.model('SOS', sosSchema)