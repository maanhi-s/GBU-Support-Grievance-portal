import React from 'react';

export default function Navbar({ currentView, setCurrentView, user, onLogout }) {
  return (
    <header className="bg-purple-900 text-white border-b-4 border-amber-400 sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* LOGO & BRANDING */}
        <div 
          onClick={() => setCurrentView('knowledge_base')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* TO USE YOUR LOGO: Put 'gbu-logo.png' in the 'public' folder of your project */}
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <img 
              src="/gbu-logo.png" 
              alt="GBU" 
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }} // Fallback if image is missing
            />
            <span className="text-purple-900 font-black absolute">GBU</span>
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight group-hover:text-amber-300 transition-colors duration-300">Gautam Buddha University</h1>
            <p className="text-[11px] text-amber-400 font-semibold tracking-wide">Support & Grievance Portal</p>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentView('knowledge_base')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
              currentView === 'knowledge_base' ? 'bg-amber-400 text-purple-900 shadow-md' : 'text-purple-100 hover:text-white hover:bg-purple-800'
            }`}
          >
            Support FAQs
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  currentView === 'dashboard' ? 'bg-amber-400 text-purple-900 shadow-md' : 'text-purple-100 hover:text-white hover:bg-purple-800'
                }`}
              >
                {user.role === 'ADMIN' ? 'Admin Console' : 'My Dashboard'}
              </button>
              <button 
                onClick={onLogout}
                className="bg-rose-500 hover:bg-rose-600 active:scale-95 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md transition-all duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setCurrentView('auth')}
              className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-purple-900 font-extrabold px-4 py-1.5 rounded-lg text-xs shadow-lg hover:shadow-amber-400/50 transition-all duration-300"
            >
              Sign In / Register
            </button>
          )}
        </div>
      </div>
    </header>
  );
}