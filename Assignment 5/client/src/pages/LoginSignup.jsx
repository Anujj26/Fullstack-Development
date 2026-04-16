import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const res = await axios.post(endpoint, formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-slate-500 mt-2">{isLogin ? 'Enter your details to access your dashboard.' : 'Sign up to start booking your trips.'}</p>
          </div>

          {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" name="name" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={formData.name} onChange={handleChange} required={!isLogin} 
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input 
                type="email" name="email" 
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={formData.email} onChange={handleChange} required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                type="password" name="password" 
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={formData.password} onChange={handleChange} required minLength="6"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition mt-6 disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-blue-600 hover:underline font-medium"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
