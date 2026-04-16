import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IndianRupee } from 'lucide-react';

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    travelDate: '',
    peopleCount: 1,
    mode: 'Flight'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    
    // Set default name from user profile
    if (user.name) {
      setFormData(prev => ({ ...prev, name: user.name }));
    }

    const fetchPackage = async () => {
      try {
        const res = await axios.get(`/api/packages/${id}`);
        setPkg(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPackage();
  }, [id, token, navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/api/bookings', {
        packageId: id,
        travelDate: formData.travelDate,
        peopleCount: Number(formData.peopleCount),
        mode: formData.mode,
        days: pkg.duration,
        phone: formData.phone
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (!pkg) return <div className="text-center mt-20">Loading...</div>;

  const totalCost = pkg.price * formData.peopleCount;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
        <div className="md:flex">
          {/* Left summary side */}
          <div className="bg-slate-900 text-white p-8 md:w-1/3 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6">Booking Summary</h2>
              <div className="relative h-32 rounded-xl overflow-hidden mb-6">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover opacity-80" />
                <div className="absolute bottom-2 left-2 font-bold z-10">{pkg.name}</div>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex justify-between"><span>Duration:</span> <span className="font-semibold text-white">{pkg.duration} Days</span></li>
                <li className="flex justify-between"><span>Base Price:</span> <span className="font-semibold text-white">₹{pkg.price.toLocaleString('en-IN')}</span></li>
                <li className="flex justify-between border-t border-slate-700 pt-3"><span>Passengers:</span> <span className="font-semibold text-white">{formData.peopleCount}</span></li>
              </ul>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-700">
              <p className="text-sm text-slate-400 mb-1">Total Amount</p>
              <h3 className="text-3xl font-bold flex items-center gap-1 text-white"><IndianRupee className="w-6 h-6"/> {totalCost.toLocaleString('en-IN')}</h3>
            </div>
          </div>

          {/* Right form side */}
          <div className="p-8 md:w-2/3">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Passenger Details</h2>
            {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6">{error}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Primary Traveler Name</label>
                  <input type="text" name="name" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input type="tel" name="phone" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={formData.phone} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Travel Date</label>
                  <input type="date" name="travelDate" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={formData.travelDate} onChange={handleChange} required min={new Date().toISOString().split("T")[0]} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Number of People</label>
                  <input type="number" name="peopleCount" min="1" max="10"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={formData.peopleCount} onChange={handleChange} required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Mode of Travel</label>
                <select name="mode" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                  value={formData.mode} onChange={handleChange}>
                  {pkg.travelModes?.map(mode => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition mt-6 disabled:opacity-50 text-lg">
                {loading ? 'Confirming Booking...' : `Confirm & Pay ₹${totalCost.toLocaleString('en-IN')}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
