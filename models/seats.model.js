const mongoose = require('mongoose');

const SeatsSchema = new mongoose.Schema({
  id: { type: Number, required: false },
  day: { type: Number, required: true },
  seat: { type: Number, required: true },
  client: { type: String, required: true },
  email: { type: String, required: true }
});

module.exports = mongoose.model('Seat', SeatsSchema);