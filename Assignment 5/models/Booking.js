const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  travelDate: { type: Date, required: true },
  peopleCount: { type: Number, required: true },
  mode: { type: String, enum: ['Flight', 'Train', 'Bus'], required: true },
  days: { type: Number, required: true },
  phone: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
