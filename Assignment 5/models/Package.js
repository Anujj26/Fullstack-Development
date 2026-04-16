const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true }, // in days
  itinerary: [{ day: Number, description: String }],
  description: { type: String, required: true },
  image: { type: String, required: true },
  travelModes: [{ type: String, enum: ['Flight', 'Train', 'Bus'] }]
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
