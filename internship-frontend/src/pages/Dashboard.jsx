import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState('teachers');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const [usersRes, teachersRes] = await Promise.all([
        api.get('/users'),
        api.get('/teachers')
      ]);
      setUsers(usersRes.data);
      setTeachers(teachersRes.data);
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
      } else {
        setError('Failed to fetch data from the server.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="creative-bg-light min-h-screen flex">
      
      {/* Sidebar Navigation */}
      <div className="w-64 border-r border-slate-200/50 hidden md:flex flex-col justify-between" style={{background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(20px)'}}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-500/30 flex items-center justify-center text-white font-bold text-xl">
              E
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">EduTrack.</h1>
          </div>
          
          <div className="space-y-2">
            <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Menu</p>
            <button
              onClick={() => setActiveView('teachers')}
              className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                activeView === 'teachers' 
                  ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/60' 
                  : 'text-slate-500 hover:bg-white/40 hover:text-slate-800'
              }`}
            >
              <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Teacher Directory
            </button>
            <button
              onClick={() => setActiveView('users')}
              className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                activeView === 'users' 
                  ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/60' 
                  : 'text-slate-500 hover:bg-white/40 hover:text-slate-800'
              }`}
            >
              <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Auth Users
            </button>
          </div>
        </div>

        <div className="p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-bold text-slate-500 rounded-xl hover:bg-white/40 hover:text-red-500 transition-all"
          >
            <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-10 border-b border-slate-200/50" style={{background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(20px)'}}>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              {activeView === 'teachers' ? 'Teacher Directory' : 'Auth Users Overview'}
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-0.5">
              {activeView === 'teachers' ? 'Manage and view all registered faculty.' : 'Overview of system accounts.'}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={fetchData} 
              className="group flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-bold text-slate-600 hover:text-indigo-600 transition-all"
            >
              <svg className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Data
            </button>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-bold flex items-center justify-center shadow-lg shadow-indigo-500/20">
              A
            </div>
          </div>
        </header>

        {/* Scrolling View */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto animate-fade-scale">
            
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50/80 border border-red-100 backdrop-blur flex">
                <svg className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-red-800">{error}</h3>
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex flex-col justify-center items-center py-32 px-4 h-full">
                <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="mt-6 text-sm text-slate-500 font-bold tracking-wide uppercase">Syncing Records...</p>
              </div>
            ) : (
              <div className="elegant-card overflow-hidden">
                
                {activeView === 'teachers' && (
                  <div className="overflow-x-auto">
                    <table className="elegant-table">
                      <thead>
                        <tr>
                          <th>Teacher Details</th>
                          <th>University Profile</th>
                          <th>Demographics</th>
                          <th>Internal Email</th>
                          <th>System Added</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teachers.length === 0 ? (
                          <tr><td colSpan="5" className="text-center py-20 text-slate-500 font-medium">No teachers found in the database.</td></tr>
                        ) : teachers.map((teacher) => (
                          <tr key={teacher.id}>
                            <td>
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                                  {teacher.first_name?.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-extrabold text-slate-800">{teacher.first_name} {teacher.last_name}</span>
                                  <span className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-0.5">Faculty</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="flex flex-col">
                                <span className="font-semibold text-slate-700">{teacher.university_name}</span>
                                <span className="text-slate-500 text-sm font-medium">Joined {teacher.year_joined}</span>
                              </div>
                            </td>
                            <td>
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                {teacher.gender}
                              </span>
                            </td>
                            <td>
                              <span className="text-slate-600 font-medium">{teacher.email}</span>
                            </td>
                            <td className="text-slate-500 text-sm font-medium">
                              {new Date(teacher.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeView === 'users' && (
                  <div className="overflow-x-auto">
                    <table className="elegant-table">
                      <thead>
                        <tr>
                          <th>System ID</th>
                          <th>Account Name</th>
                          <th>Security & Email</th>
                          <th>Auth Timestamp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.length === 0 ? (
                          <tr><td colSpan="4" className="text-center py-20 text-slate-500 font-medium">No system users found.</td></tr>
                        ) : users.map((user) => (
                          <tr key={user.id}>
                            <td>
                              <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">#{String(user.id).padStart(4, '0')}</span>
                            </td>
                            <td>
                              <div className="flex gap-3 items-center">
                                <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs uppercase">
                                  {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
                                </div>
                                <span className="font-extrabold text-slate-800">{user.first_name} {user.last_name}</span>
                              </div>
                            </td>
                            <td>
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                <span className="text-slate-600 font-medium">{user.email}</span>
                              </div>
                            </td>
                            <td className="text-slate-500 text-sm font-medium">
                              {new Date(user.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
              </div>
            )}
            
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
