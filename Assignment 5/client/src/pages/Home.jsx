import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Calendar, Users } from 'lucide-react';

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get('/api/packages');
        setFeatured(res.data.slice(0, 3)); // Show top 3
      } catch (err) {
        console.error(err);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
            alt="Travel background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light">
            Explore the world's most beautiful destinations with our premium curated travel packages.
          </p>
          <Link to="/packages" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition shadow-xl">
            Explore Packages
          </Link>
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Trending Destinations</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Handpicked locations for your perfect getaway from busy life.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((pkg) => (
            <div key={pkg._id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group relative flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-slate-800">
                  ₹{pkg.price.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-slate-800 mb-2 truncate">{pkg.name}</h3>
                <div className="flex items-center text-slate-500 text-sm mb-4 gap-4">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> India</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {pkg.duration} Days</span>
                </div>
                <p className="text-slate-600 mb-6 line-clamp-2 flex-grow">{pkg.description}</p>
                <Link to={`/packages/${pkg._id}`} className="block w-full text-center bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white py-3 rounded-xl transition font-semibold mt-auto">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/packages" className="inline-block text-blue-600 font-semibold hover:text-blue-800 transition">
            View All Destinations &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
