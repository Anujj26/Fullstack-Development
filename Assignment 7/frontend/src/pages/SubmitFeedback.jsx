import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import api from '../api';

const SubmitFeedback = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseId: '',
    teachingQuality: 5,
    courseContent: 5,
    infrastructure: 5,
    comments: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/courses');
        setCourses(data);
        if(data.length > 0) {
          setFormData(prev => ({ ...prev, courseId: data[0]._id }));
        }
      } catch (err) {
        console.error('Error fetching courses');
      }
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.courseId) return setError('Please select a course');

    try {
      await api.post('/feedback', {
        courseId: formData.courseId,
        ratings: {
          teachingQuality: formData.teachingQuality,
          courseContent: formData.courseContent,
          infrastructure: formData.infrastructure
        },
        comments: formData.comments
      });
      navigate('/student');
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting feedback');
    }
  };

  const renderStarInput = (label, field) => (
    <div className="mb-4 flex flex-col justify-center">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFormData({...formData, [field]: star})}
            className={`transition-all duration-200 hover:scale-110 ${
              formData[field] >= star ? 'text-amber-400' : 'text-gray-300'
            }`}
          >
            <Star 
              size={32} 
              fill={formData[field] >= star ? 'currentColor' : 'none'} 
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
      <div className="text-sm font-bold text-indigo-600 mt-2">{formData[field]} / 5</div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit Feedback</h2>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
          <select 
            value={formData.courseId}
            onChange={(e) => setFormData({...formData, courseId: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>Select a course</option>
            {courses.map(c => (
              <option key={c._id} value={c._id}>{c.courseName} - {c.faculty}</option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg mb-6">
          {renderStarInput('Teaching Quality', 'teachingQuality')}
          {renderStarInput('Course Content', 'courseContent')}
          {renderStarInput('Infrastructure', 'infrastructure')}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments</label>
          <textarea 
            rows="4" 
            value={formData.comments}
            onChange={(e) => setFormData({...formData, comments: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Share your thoughts..."
          ></textarea>
        </div>

        <div className="flex gap-4 justify-end">
          <button type="button" onClick={() => navigate('/student')} className="px-6 py-2 text-gray-600 hover:text-gray-800">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitFeedback;
