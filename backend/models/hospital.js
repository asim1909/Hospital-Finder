const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  image: { type: String, required: true },
  specialities: [{ type: String }],
  rating: { type: Number, required: true, min: 0, max: 5 },
  description: { type: String },
  images: [{ type: String }],
  numberOfDoctors: { type: Number },
  numberOfDepartments: { type: Number },
});

module.exports = mongoose.model('Hospital', hospitalSchema);