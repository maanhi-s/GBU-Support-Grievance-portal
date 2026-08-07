import React, { useState } from 'react';

const GBU_SCHOOLS = ["School of ICT (SOICT)", "School of Engineering (SOE)", "School of Management (SOM)","School of Biotechnology","Buddhist Studies & Civilization","School of Humanaties & Social Sciences","School of Law,Justice and Governance","School of Vocational Studies & Applied Sciences"];
const GBU_HOSTELS = [" Sant Ravidas Boys Hostel" ,"Sant Kabir Das Boys Hostel" ,"Birsa Munda Boys Hostel","Ram Sharan Das Boys Hostel","Shri Narayan Guru Boys Hostel","Tulsidas Boys Hostel","Guru Ghasi Das Boys Hostel","Malik Mohammad Jaysi Boys Hostel","Munshi Premchand Boys Hostel","Raheem Boys Hostel","Maharshi Valmiki Boys Hostel","Savitri Bai Phule Girls Hostel","Rani Laxmi Bai Girls Hostel","Ramabai Ambedkar Girls Hostel","Mahamaya Girls Hostel","Mahadevi Verma Girls Hostel","Ismat Chughtai Girls Hostel","Married Research Scholars Hostel"];

export default function AuthScreen({ authData, setAuthData, onSubmit }) {
  const [authView, setAuthView] = useState('student_login');
  const [otpInput, setOtpInput] = useState('');

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    alert(`📧 OTP sent to ${authData.email}`);
    setAuthView('otp');
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    if (otpInput.length === 6) {
      onSubmit(e);
    } else {
      alert("Please enter a valid 6-digit OTP.");
    }
  };

  return (
    <main 
      className="relative min-h-[90vh] flex items-center justify-center p-4 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/gbu-campus.png')" }} 
    >
      <div className="absolute inset-0 bg-slate-900/80"></div>

      <div className="relative z-10 w-full max-w-5xl bg-white rounded shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Nav Panel */}
        <div className="w-full md:w-1/3 bg-slate-900 text-white p-8 flex flex-col justify-between border-r border-slate-800">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">Portal Access</h2>
            <p className="text-sm text-slate-400">Official Helpdesk & Grievance System.</p>
          </div>
          <div className="mt-8 space-y-1">
            <button 
              onClick={() => { setAuthView('student_login'); setAuthData({...authData, role: 'STUDENT'}); }}
              className={`w-full text-left px-4 py-3 rounded text-sm font-medium transition-colors ${authView === 'student_login' || authView === 'student_signup' || authView === 'otp' ? 'bg-slate-800 text-blue-400 border-l-2 border-blue-500' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              🎓 Student Login
            </button>
            <button 
              onClick={() => { setAuthView('admin_login'); setAuthData({...authData, role: 'ADMIN'}); }}
              className={`w-full text-left px-4 py-3 rounded text-sm font-medium transition-colors ${authView === 'admin_login' ? 'bg-slate-800 text-white border-l-2 border-slate-300' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              🛡️ Admin / Department Login
            </button>
          </div>
        </div>

        {/* Right Form Area */}
        <div className="w-full md:w-2/3 p-8 md:p-12 bg-white">
          
          {authView === 'admin_login' && (
            <div className="max-w-md mx-auto space-y-6 animate-fade-in-up">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h3 className="text-xl font-semibold text-slate-800">Admin Authorization</h3>
                <p className="text-sm text-slate-500 mt-1">access for university authorities.</p>
              </div>
              <form onSubmit={handleInitialSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Official Email</label>
                  <input type="email" required placeholder="admin@gbu.ac.in" value={authData.email} onChange={(e) => setAuthData({...authData, email: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded focus:border-slate-800 focus:ring-1 focus:ring-slate-800 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <input type="password" required placeholder="••••••••" value={authData.password} onChange={(e) => setAuthData({...authData, password: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded focus:border-slate-800 focus:ring-1 focus:ring-slate-800 outline-none" />
                </div>
                <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded transition-colors mt-2">
                  Access Dashboard
                </button>
              </form>
            </div>
          )}

          {authView === 'student_login' && (
            <div className="max-w-md mx-auto space-y-6 animate-fade-in-up">
              <div className="border-b border-slate-100 pb-4 mb-6 flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">Sign In</h3>
                  <p className="text-sm text-slate-500 mt-1">Track your active tickets.</p>
                </div>
                <button type="button" onClick={() => setAuthView('student_signup')} className="text-sm font-medium text-blue-600 hover:underline">Register New</button>
              </div>
              <form onSubmit={handleInitialSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input type="email" required placeholder="name@gbu.ac.in" value={authData.email} onChange={(e) => setAuthData({...authData, email: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <input type="password" required placeholder="••••••••" value={authData.password} onChange={(e) => setAuthData({...authData, password: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded transition-colors">
                  Send OTP to Login
                </button>
              </form>
            </div>
          )}

          {authView === 'student_signup' && (
            <div className="animate-fade-in-up">
              <div className="border-b border-slate-100 pb-4 mb-6 flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">New Registration</h3>
                  <p className="text-sm text-slate-500 mt-1">Complete your profile to log tickets.</p>
                </div>
                <button type="button" onClick={() => setAuthView('student_login')} className="text-sm font-medium text-blue-600 hover:underline">Back to Login</button>
              </div>
              
              <form onSubmit={handleInitialSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input type="text" required placeholder="John Doe" value={authData.name} onChange={(e) => setAuthData({...authData, name: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input type="email" required placeholder="name@gbu.ac.in" value={authData.email} onChange={(e) => setAuthData({...authData, email: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">School / Dept</label>
                    <select value={authData.school} onChange={(e) => setAuthData({...authData, school: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded focus:border-blue-500 outline-none bg-white">
                      {GBU_SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Residency</label>
                    <select value={authData.residencyStatus} onChange={(e) => setAuthData({...authData, residencyStatus: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded focus:border-blue-500 outline-none bg-white">
                      <option value="HOSTELLER">Hosteller</option>
                      <option value="DAY_SCHOLAR">Day Scholar</option>
                    </select>
                  </div>
                  {authData.residencyStatus === 'HOSTELLER' && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Assigned Hostel Block</label>
                      <select value={authData.hostelBlock} onChange={(e) => setAuthData({...authData, hostelBlock: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded focus:border-blue-500 outline-none bg-white">
                        {GBU_HOSTELS.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                  )}
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded transition-colors mt-2">
                  Continue to Email Verification
                </button>
              </form>
            </div>
          )}

          {authView === 'otp' && (
            <div className="max-w-md mx-auto space-y-6 text-center animate-fade-in-up py-4">
              <h3 className="text-2xl font-semibold text-slate-800">Verify Email</h3>
              <p className="text-sm text-slate-500 mt-1">Enter the 6-digit code sent to <br/><strong className="text-slate-800">{authData.email}</strong></p>
              
              <form onSubmit={handleOtpVerify} className="space-y-6 pt-4">
                <input 
                  type="text" maxLength={6} required placeholder="• • • • • •" 
                  value={otpInput} onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))} 
                  className="w-full p-4 border border-slate-300 rounded text-center text-2xl font-medium tracking-[1em] focus:border-blue-500 outline-none" 
                />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded transition-colors">
                  Verify & Secure Login
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}