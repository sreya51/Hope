const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, default: 'food' },
  quantity: { type: String },
  location: { type: String },
  donor: { type: String, default: 'Anonymous' }
}, { timestamps: true })

module.exports = mongoose.model('Resource', resourceSchema)