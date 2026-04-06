const mongoose = require('mongoose')
const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  skills: [String]
}, { timestamps: true })
module.exports = mongoose.model('Volunteer', volunteerSchema)