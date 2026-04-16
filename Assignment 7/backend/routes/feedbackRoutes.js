const express = require('express');
const router = express.Router();
const {
  submitFeedback,
  getFeedbackByStudent,
  getAllFeedback,
  deleteFeedback,
  getAnalytics
} = require('../controllers/feedbackController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, submitFeedback)
  .get(protect, admin, getAllFeedback);

router.route('/student')
  .get(protect, getFeedbackByStudent);

router.route('/analytics')
  .get(protect, admin, getAnalytics);

router.route('/:id')
  .delete(protect, deleteFeedback);

module.exports = router;
