const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createBooking, getUserBookings, deleteBooking } = require('../controllers/bookingController');

router.post('/', auth, createBooking);
router.get('/user', auth, getUserBookings);
router.delete('/:id', auth, deleteBooking);

module.exports = router;
