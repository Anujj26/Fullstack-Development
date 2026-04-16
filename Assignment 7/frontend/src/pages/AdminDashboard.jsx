import React, { useEffect, useState } from 'react';
import api from '../api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader, Trash2, Users, BookOpen, Star } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [allFeedback, setAllFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  
  const [newCourse, setNewCourse] = useState({ courseName: '', faculty: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, feedbackRes, coursesRes] = await Promise.all([
        api.get('/feedback/analytics'),
        api.get('/feedback'),
        api.get('/courses')
      ]);
      setStats(analyticsRes.data);
      setAllFeedback(feedbackRes.data);
      setCourses(coursesRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      await api.post('/courses', newCourse);
      setNewCourse({ courseName: '', faculty: '' });
      fetchData(); // refresh
    } catch (error) {
      console.error('Error creating course');
    }
  };

  const handleDeleteFeedback = async (id) => {
    if(window.confirm('Delete this feedback?')) {
      try {
        await api.delete(`/feedback/${id}`);
        fetchData();
      } catch (err) {}
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader className="animate-spin text-indigo-600" size={40} /></div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<Users size={24}/>} title="Total Feedback" value={stats?.totalFeedbacks} color="bg-blue-500" />
        <StatCard icon={<Star size={24}/>} title="Avg Teaching" value={stats?.averageTeaching} color="bg-indigo-500" />
        <StatCard icon={<Star size={24}/>} title="Avg Content" value={stats?.averageContent} color="bg-purple-500" />
        <StatCard icon={<Star size={24}/>} title="Avg Infra" value={stats?.averageInfra} color="bg-pink-500" />
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md border h-[400px]">
        <h2 className="text-xl font-bold mb-6 text-gray-700">Course Ratings Overview</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats?.chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="courseName" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="averageRating" name="Avg Rating" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Manage Courses */}
        <div className="bg-white p-6 rounded-xl shadow-md border col-span-1 h-fit">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><BookOpen size={20}/> Manage Courses</h2>
          <form onSubmit={handleCreateCourse} className="space-y-4 mb-6">
            <input 
              type="text" required placeholder="Course Name"
              value={newCourse.courseName} onChange={e => setNewCourse({...newCourse, courseName: e.target.value})}
              className="w-full p-2 border rounded"
            />
            <input 
              type="text" required placeholder="Faculty Name"
              value={newCourse.faculty} onChange={e => setNewCourse({...newCourse, faculty: e.target.value})}
              className="w-full p-2 border rounded"
            />
            <button className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">Add Course</button>
          </form>
          
          <div className="max-h-60 overflow-y-auto space-y-2">
            {courses.map(c => (
              <div key={c._id} className="p-3 bg-gray-50 rounded border text-sm flex justify-between items-center">
                <div>
                  <div className="font-semibold">{c.courseName}</div>
                  <div className="text-gray-500 text-xs">{c.faculty}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Feedback Feed */}
        <div className="bg-white p-6 rounded-xl shadow-md border col-span-2">
          <h2 className="text-xl font-bold mb-4">All Submitted Feedback</h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {allFeedback.map(f => (
              <div key={f._id} className="p-4 border rounded-lg hover:shadow-sm transition flex gap-4">
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-bold text-gray-800">{f.courseId?.courseName}</span>
                      <span className="text-xs text-gray-500 ml-2">by {f.studentId?.name || 'Unknown'}</span>
                    </div>
                    <button onClick={() => handleDeleteFeedback(f._id)} className="text-red-400 hover:text-red-600">
                      <Trash2 size={16}/>
                    </button>
                  </div>
                  <div className="flex gap-4 text-xs font-medium text-gray-600 mb-2">
                    <span className="bg-gray-100 px-2 py-1 rounded">Teaching: {f.ratings.teachingQuality}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">Content: {f.ratings.courseContent}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">Infra: {f.ratings.infrastructure}</span>
                  </div>
                  {f.comments && <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded">"{f.comments}"</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div className={`${color} rounded-xl p-6 text-white shadow-md flex items-center gap-4`}>
    <div className="bg-white/20 p-3 rounded-lg">{icon}</div>
    <div>
      <div className="text-sm opacity-80">{title}</div>
      <div className="text-2xl font-bold">{value || 0}</div>
    </div>
  </div>
);

export default AdminDashboard;
