import { Link, useNavigate } from 'react-router-dom';
import { Plane, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Plane className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-slate-800">AstraVoyage</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/packages" className="text-slate-600 hover:text-blue-600 font-medium transition">Destinations</Link>
            {token ? (
              <>
                <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 font-medium transition flex items-center gap-1">
                  <User className="h-4 w-4" /> Dashboard
                </Link>
                <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-medium transition flex items-center gap-1">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">Log In / Sign Up</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
