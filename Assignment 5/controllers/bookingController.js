const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { packageId, travelDate, peopleCount, mode, days, phone } = req.body;
    
    const newBooking = new Booking({
      userId: req.user.id,
      packageId,
      travelDate,
      peopleCount,
      mode,
      days,
      phone
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: 'Server error while booking' });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('packageId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await booking.deleteOne();
    res.json({ message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
