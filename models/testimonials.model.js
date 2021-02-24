const mongoose = require('mongoose');

const testimonialsSchema = new mongoose.Schema({
  id: { type: Number, required: false },
  author: { type: String, required: true },
  text: { type: String, required: true }
});

module.exports = mongoose.model('Testimonial', testimonialsSchema);