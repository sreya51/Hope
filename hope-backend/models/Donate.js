const mongoose = require('mongoose')

const donateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: String },
  type: { type: String, default: 'money' },
  message: { type: String },
  payment: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Donate', donateSchema)