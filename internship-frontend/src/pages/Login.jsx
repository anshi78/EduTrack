import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.messages?.error || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="creative-bg-light min-h-screen flex flex-col items-center justify-center p-4">
      
      {/* Brand */}
      <div className="mb-10 text-center animate-fade-scale">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-xl shadow-indigo-500/10 mb-6 border border-slate-100">
          <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back</h1>
        <p className="mt-3 text-base text-slate-500 font-medium">Please enter your credentials to access the portal.</p>
      </div>

      <div className="w-full max-w-md animate-fade-scale" style={{ animationDelay: '0.1s' }}>
        <div className="elegant-card p-10">
          
          {error && (
            <div className="mb-8 p-4 rounded-xl bg-red-50/80 border border-red-100 backdrop-blur flex">
              <svg className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-red-800">{error}</h3>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input name="email" type="email" required className="elegant-input" placeholder="teacher@university.edu" value={formData.email} onChange={handleChange} />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-slate-700">Password</label>
                <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">Forgot?</a>
              </div>
              <input name="password" type="password" required className="elegant-input" placeholder="••••••••" value={formData.password} onChange={handleChange} />
            </div>

            <button type="submit" disabled={loading} className="elegant-btn mt-4">
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Authenticating...
                </span>
              ) : 'Sign In to Dashboard'}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center animate-fade-scale" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm font-medium text-slate-500">
            Don't have a teacher account yet?{' '}
            <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
