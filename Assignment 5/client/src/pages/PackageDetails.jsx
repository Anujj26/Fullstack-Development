import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Clock, IndianRupee, Map, Settings, Loader } from 'lucide-react';

const PackageDetails = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`/api/packages/${id}`);
        setPkg(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader className="w-10 h-10 text-blue-600 animate-spin" /></div>;
  }

  if (!pkg) return <div className="text-center mt-20 text-xl">Package not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
        <div className="h-[50vh] relative">
          <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
            <div className="p-8 w-full text-white">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-2">{pkg.name}</h1>
              <div className="flex flex-wrap items-center gap-6 text-lg font-medium">
                <span className="flex items-center gap-2"><Clock className="w-5 h-5"/> {pkg.duration} Days</span>
                <span className="flex items-center gap-2"><IndianRupee className="w-5 h-5"/> {pkg.price.toLocaleString('en-IN')} / person</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <section>
                <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800 mb-4 border-b pb-2">
                  <Map className="w-6 h-6 text-blue-600"/> Overview
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">{pkg.description}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800 mb-6 border-b pb-2">
                  <Settings className="w-6 h-6 text-blue-600"/> Day by Day Itinerary
                </h2>
                <div className="space-y-6">
                  {pkg.itinerary?.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0">
                          {item.day}
                        </div>
                        {index !== pkg.itinerary.length - 1 && <div className="w-0.5 h-full bg-blue-100 mt-2"></div>}
                      </div>
                      <div className="pb-6 pt-1">
                        <h4 className="font-bold text-lg text-slate-800">Day {item.day}</h4>
                        <p className="text-slate-600 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 sticky top-24 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Book this Package</h3>
                <div className="mb-6 space-y-3 text-slate-600">
                  <p className="flex justify-between"><span>Base Price:</span> <span className="font-bold text-slate-800">₹{pkg.price.toLocaleString('en-IN')}</span></p>
                  <p className="flex justify-between"><span>Duration:</span> <span className="font-medium">{pkg.duration} Days</span></p>
                  <div className="pt-3 border-t border-slate-200">
                    <p className="text-sm text-slate-500 mb-2">Available Modes:</p>
                    <div className="flex gap-2 flex-wrap">
                      {pkg.travelModes?.map(mode => (
                        <span key={mode} className="bg-white border border-slate-300 px-3 py-1 rounded-full text-xs font-semibold">{mode}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {token ? (
                  <Link to={`/book/${pkg._id}`} className="block w-full text-center bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-lg">
                    Proceed to Booking
                  </Link>
                ) : (
                  <button 
                    onClick={() => {
                      alert('Please log in to book this package.');
                      navigate('/login');
                    }}
                    className="w-full text-center bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-900 transition shadow-md"
                  >
                    Login to Book
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
