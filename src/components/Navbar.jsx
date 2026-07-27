import React from 'react';

export default function Navbar({ currentView, setCurrentView, user, onLogout }) {
  return (
    <header className="bg-white text-slate-900 border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* BRANDING */}
        <div 
          onClick={() => setCurrentView('knowledge_base')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-sm overflow-hidden transition-colors">
            {/* Fallback text if no logo */}
            <span className="text-white font-bold text-xs tracking-wider">GBU</span>
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-800 hover:text-blue-600 transition-colors">
            Gautam Buddha University
          </h1>
        </div>

        {/* NAVIGATION CTAs */}
        <div className="flex items-center gap-4 text-sm font-medium">
          <button 
            onClick={() => setCurrentView('knowledge_base')}
            className={`transition-colors ${currentView === 'knowledge_base' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Support Home
          </button>

          {user ? (
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <span className="text-slate-500 text-xs hidden md:block">Hi, {user.name.split(' ')[0]}</span>
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors shadow-sm"
              >
                {user.role === 'ADMIN' ? 'Staff Console' : 'My Tickets'}
              </button>
              <button 
                onClick={onLogout}
                className="text-slate-500 hover:text-red-600 px-2 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="border-l border-slate-200 pl-4">
              <button 
                onClick={() => setCurrentView('auth')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded shadow-sm transition-colors"
              >
                Sign In / Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}