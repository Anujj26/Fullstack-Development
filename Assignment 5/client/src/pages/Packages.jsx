import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Calendar, Loader } from 'lucide-react';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get('/api/packages');
        setPackages(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">All Destinations</h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">Browse our complete collection of curated travel packages and find your next dream vacation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div key={pkg._id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group flex flex-col">
            <div className="relative h-60 overflow-hidden">
              <img 
                src={pkg.image} 
                alt={pkg.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <span className="font-bold text-xl block truncate">{pkg.name}</span>
                <span className="text-sm font-medium text-slate-200 block truncate">₹{pkg.price.toLocaleString('en-IN')} / person</span>
              </div>
            </div>
            <div className="p-5 flex-grow flex flex-col">
              <div className="flex items-center text-slate-500 text-sm mb-4 gap-4">
                <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded"><MapPin className="w-4 h-4 text-rose-500"/> India</span>
                <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded"><Calendar className="w-4 h-4 text-indigo-500"/> {pkg.duration} Days</span>
              </div>
              <p className="text-slate-600 mb-6 flex-grow">{pkg.description}</p>
              <Link to={`/packages/${pkg._id}`} className="block w-full text-center bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition font-medium mt-auto shadow-md">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
