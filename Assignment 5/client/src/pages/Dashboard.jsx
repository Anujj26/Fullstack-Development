import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Trash2, MapPin, SearchX, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('/api/bookings/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [token]);

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      try {
        await axios.delete(`/api/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(bookings.filter(b => b._id !== id));
      } catch (err) {
        alert('Failed to cancel booking');
      }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader className="w-10 h-10 text-blue-600 animate-spin" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Welcome, {user.name}!</h1>
          <p className="text-slate-500 mt-1">Manage your upcoming trips and travel history.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="bg-blue-50 text-blue-700 px-6 py-3 rounded-xl font-semibold text-center border border-blue-100">
            Total Bookings: {bookings.length}
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Bookings</h2>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
          <SearchX className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-700 mb-2">No bookings found</h3>
          <p className="text-slate-500 mb-6">You haven't booked any travel packages yet.</p>
          <Link to="/packages" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            Explore Destinations
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-slate-200">
              <div className="md:flex h-full">
                <div className="md:w-2/5 relative h-48 md:h-auto">
                  <img src={booking.packageId?.image || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&q=80'} 
                    alt={booking.packageId?.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-800 flex items-center gap-1">
                    <MapPin className="w-3 h-3"/> {booking.mode}
                  </div>
                </div>
                <div className="p-6 md:w-3/5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 truncate mb-1">{booking.packageId?.name || 'Unknown Package'}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-4">
                      <Calendar className="w-4 h-4 text-blue-500"/> 
                      {new Date(booking.travelDate).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                    <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-600">
                      <div><span className="text-slate-400">Duration:</span> <br/>{booking.days} Days</div>
                      <div><span className="text-slate-400">Passengers:</span> <br/>{booking.peopleCount}</div>
                      <div className="col-span-2 mt-1"><span className="text-slate-400">Contact:</span> {booking.phone}</div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end flex-wrap">
                    <button 
                      onClick={() => handleCancel(booking._id)}
                      className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1 w-full justify-center md:w-auto"
                    >
                      <Trash2 className="w-4 h-4"/> Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
