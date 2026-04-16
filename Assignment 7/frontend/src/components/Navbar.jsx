import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfoStr = localStorage.getItem('userInfo');
  let user = null;
  
  if (userInfoStr) {
    try { user = JSON.parse(userInfoStr); } catch {}
  }

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  if (!user && (location.pathname === '/login' || location.pathname === '/register')) {
    return null; // hide navbar on auth pages
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
        <Link to={user?.role === 'admin' ? '/admin' : '/student'} className="text-xl font-bold text-indigo-600">
          EduFeedback
        </Link>
        {user && (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-600">
              <User size={18} />
              <span className="font-medium">{user.name} ({user.role})</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-700 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
