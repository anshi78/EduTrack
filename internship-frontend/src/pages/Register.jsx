import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '', password: '', first_name: '', last_name: '', university_name: '', gender: 'Male', year_joined: new Date().getFullYear().toString()
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/register', formData);
      navigate('/login');
    } catch (err) {
      if (err.response?.data?.messages) {
        setError(Object.values(err.response.data.messages).join(' '));
      } else {
        setError(err.response?.data?.error || 'Registration failed. Please check your inputs and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="creative-bg-light min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Brand Header */}
      <div className="mb-10 text-center animate-fade-scale">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-xl shadow-indigo-500/10 mb-6 border border-slate-100">
          <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Join EduTrack</h1>
        <p className="mt-3 text-base text-slate-500 font-medium">Set up your teacher profile in seconds.</p>
      </div>

      <div className="w-full max-w-3xl animate-fade-scale" style={{ animationDelay: '0.1s' }}>
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

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              
              {/* Left Column */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-indigo-100 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">1</div>
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">Account Detail</h3>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input name="email" type="email" required className="elegant-input" placeholder="you@university.edu" value={formData.email} onChange={handleChange} />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Secure Password</label>
                  <input name="password" type="password" required className="elegant-input" placeholder="Min 6 characters" value={formData.password} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                    <input name="first_name" type="text" required className="elegant-input" placeholder="Jane" value={formData.first_name} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                    <input name="last_name" type="text" required className="elegant-input" placeholder="Doe" value={formData.last_name} onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-indigo-100 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">2</div>
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">Public Profile</h3>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">University Name</label>
                  <input name="university_name" type="text" required className="elegant-input" placeholder="Stanford University" value={formData.university_name} onChange={handleChange} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Gender</label>
                    <select name="gender" required className="elegant-input" style={{appearance: 'auto'}} value={formData.gender} onChange={handleChange}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Year Joined</label>
                    <input name="year_joined" type="number" required min="1950" max="2100" className="elegant-input" value={formData.year_joined} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-200/60 flex items-center justify-end gap-4">
              <Link to="/login" className="px-6 py-3 font-semibold text-slate-600 hover:text-slate-900 transition-colors text-sm">
                Cancel
              </Link>
              <button type="submit" disabled={loading} className="elegant-btn w-auto min-w-[200px]">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Registering...
                  </span>
                ) : 'Complete Registration'}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center animate-fade-scale" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm font-medium text-slate-500">
            Already have an active account?{' '}
            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      
    </div>
  );
}

export default Register;
