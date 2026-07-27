import React from 'react';

// ==========================================
// [EDIT HERE]: Add your exact GBU School and Hostel names below
// ==========================================
const GBU_SCHOOLS = [
  "School of ICT (SOICT)",
  "School of Engineering (SOE)",
  "School of Management (SOM)",
  "School of Biotechnology",
  "School of Law, Justice & Governance"
];

const GBU_HOSTELS = [
  "Sant Kabir Hostel (Boys)",
  "Munshi Premchand Hostel (Boys)",
  "Gargi Hostel (Girls)",
  "Ramabai Hostel (Girls)"
];
// ==========================================

export default function AuthScreen({ authData, setAuthData, onSubmit }) {
  return (
    <main className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-50">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden transform transition-all duration-500 animate-fade-in-up">
        <div className="bg-purple-900 p-6 text-white text-center border-b-4 border-amber-400">
          <h2 className="text-2xl font-black tracking-tight">Portal Access</h2>
          <p className="text-xs text-amber-400 mt-1 font-medium">Secure Sign In & Registration</p>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4 text-sm">
          
          {/* Role Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200 font-extrabold">
            <button
              type="button"
              onClick={() => setAuthData({...authData, role: 'STUDENT'})}
              className={`py-2 rounded-lg transition-all duration-300 ${authData.role === 'STUDENT' ? 'bg-purple-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Student / User
            </button>
            <button
              type="button"
              onClick={() => setAuthData({...authData, role: 'ADMIN'})}
              className={`py-2 rounded-lg transition-all duration-300 ${authData.role === 'ADMIN' ? 'bg-purple-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Admin / Warden
            </button>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Full Name</label>
            <input 
              type="text" required placeholder="Enter your full name"
              value={authData.name} onChange={(e) => setAuthData({...authData, name: e.target.value})}
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-shadow"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" required placeholder="name@gbu.ac.in"
              value={authData.email} onChange={(e) => setAuthData({...authData, email: e.target.value})}
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-shadow"
            />
          </div>

          {authData.role === 'STUDENT' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block font-bold text-slate-700 mb-1">School / Department</label>
                <select 
                  value={authData.school} onChange={(e) => setAuthData({...authData, school: e.target.value})}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none"
                >
                  {GBU_SCHOOLS.map(school => <option key={school} value={school}>{school}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Residency</label>
                  <select 
                    value={authData.residencyStatus} onChange={(e) => setAuthData({...authData, residencyStatus: e.target.value})}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none"
                  >
                    <option value="HOSTELLER">Hosteller</option>
                    <option value="DAY_SCHOLAR">Day Scholar</option>
                  </select>
                </div>

                {authData.residencyStatus === 'HOSTELLER' && (
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Hostel Block</label>
                    <select 
                      value={authData.hostelBlock} onChange={(e) => setAuthData({...authData, hostelBlock: e.target.value})}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none"
                    >
                      {GBU_HOSTELS.map(hostel => <option key={hostel} value={hostel}>{hostel}</option>)}
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">Password</label>
            <input 
              type="password" required placeholder="••••••••"
              value={authData.password} onChange={(e) => setAuthData({...authData, password: e.target.value})}
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-shadow"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 active:scale-95 text-purple-900 font-extrabold py-3 rounded-xl shadow-lg hover:shadow-amber-400/50 transition-all duration-300 mt-4"
          >
            Authenticate & Continue →
          </button>
        </form>
      </div>
    </main>
  );
}