const Feedback = require('../models/Feedback');
const Course = require('../models/Course');

const submitFeedback = async (req, res) => {
  const { courseId, ratings, comments } = req.body;
  try {
    const feedback = new Feedback({
      studentId: req.user._id,
      courseId,
      ratings,
      comments
    });
    const createdFeedback = await feedback.save();
    res.status(201).json(createdFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getFeedbackByStudent = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ studentId: req.user._id }).populate('courseId', 'courseName faculty');
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('studentId', 'name email')
      .populate('courseId', 'courseName faculty')
      .sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    // allow delete if admin or if the student who created it
    if (req.user.role === 'admin' || feedback.studentId.toString() === req.user._id.toString()) {
      await Feedback.findByIdAndDelete(req.params.id);
      res.json({ message: 'Feedback removed' });
    } else {
      res.status(401).json({ message: 'Not authorized to delete this feedback' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('courseId', 'courseName');
    
    const courseStats = {};
    let totalFeedbacks = feedbacks.length;
    let totalTeaching = 0;
    let totalContent = 0;
    let totalInfra = 0;

    feedbacks.forEach(f => {
      totalTeaching += f.ratings.teachingQuality;
      totalContent += f.ratings.courseContent;
      totalInfra += f.ratings.infrastructure;

      let courseName = f.courseId ? f.courseId.courseName : 'Unknown Course';
      if (!courseStats[courseName]) {
        courseStats[courseName] = { count: 0, sumAvg: 0 };
      }
      courseStats[courseName].count += 1;
      let avgRating = (f.ratings.teachingQuality + f.ratings.courseContent + f.ratings.infrastructure)/3;
      courseStats[courseName].sumAvg += avgRating;
    });

    const averageTeaching = totalFeedbacks ? totalTeaching / totalFeedbacks : 0;
    const averageContent = totalFeedbacks ? totalContent / totalFeedbacks : 0;
    const averageInfra = totalFeedbacks ? totalInfra / totalFeedbacks : 0;

    const chartData = Object.keys(courseStats).map(course => ({
      courseName: course,
      averageRating: parseFloat((courseStats[course].sumAvg / courseStats[course].count).toFixed(2)),
      feedbackCount: courseStats[course].count
    }));

    res.json({
      averageTeaching: parseFloat(averageTeaching.toFixed(2)),
      averageContent: parseFloat(averageContent.toFixed(2)),
      averageInfra: parseFloat(averageInfra.toFixed(2)),
      totalFeedbacks,
      chartData
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitFeedback, getFeedbackByStudent, getAllFeedback, deleteFeedback, getAnalytics };
