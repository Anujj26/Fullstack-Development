import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { PlusCircle, Loader, Trash2 } from 'lucide-react';

const StudentDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const { data } = await api.get('/feedback/student');
      setFeedbacks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await api.delete(`/feedback/${id}`);
        setFeedbacks(feedbacks.filter(f => f._id !== id));
      } catch (error) {
        console.error('Error deleting feedback');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">My Feedbacks</h1>
        <Link 
          to="/submit-feedback"
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <PlusCircle size={20} />
          Submit New Feedback
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><Loader className="animate-spin text-indigo-600" size={32} /></div>
      ) : feedbacks.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow text-center text-gray-500">
          You haven't submitted any feedback yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map(f => (
            <div key={f._id} className="bg-white p-6 rounded-xl shadow-md border hover:border-indigo-100 transition relative">
              <button 
                onClick={() => handleDelete(f._id)}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600"
                title="Delete Feedback"
              >
                <Trash2 size={18} />
              </button>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{f.courseId?.courseName}</h3>
              <p className="text-sm text-gray-500 mb-4">Faculty: {f.courseId?.faculty}</p>
              
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Teaching Quality</span>
                  <span className="font-medium">{f.ratings.teachingQuality}/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Course Content</span>
                  <span className="font-medium">{f.ratings.courseContent}/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Infrastructure</span>
                  <span className="font-medium">{f.ratings.infrastructure}/5</span>
                </div>
              </div>
              
              {f.comments && (
                <div className="mt-4 pt-4 border-t text-sm text-gray-600 italic">
                  "{f.comments}"
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
