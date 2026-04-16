const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  ratings: {
    teachingQuality: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    courseContent: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    infrastructure: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }
  },
  comments: {
    type: String,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
