import React from 'react';

const Navbar = ({ currentUser, onLogin, onLogout, setCurrentView }) => {
  const displayName = currentUser?.name || currentUser?.role || 'Guest';

  return (
    <header className="bg-white h-14 flex items-center justify-between px-6 w-full z-10 select-none">
      
      {/* Clickable GBU Logo & Title -> Takes you home */}
      <div 
        onClick={() => setCurrentView && setCurrentView('knowledge_base')}
        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <img src="/gbu-logo.png" alt="GBU Logo" className="h-10 w-auto object-contain" />
        <span className="font-bold text-blue-900 text-lg hidden sm:block tracking-wide">
          Grievance Portal
        </span>
      </div>

      {/* Right Side: Auth & Profile */}
      <div className="flex items-center gap-4">
        
        {!currentUser ? (
          <button 
            onClick={() => {
              if (onLogin) onLogin();
              if (setCurrentView) setCurrentView('auth');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 rounded font-medium text-sm transition-colors cursor-pointer"
          >
            Login
          </button>
        ) : (
          <>
            <div className="text-sm text-gray-700 font-medium">
              Hi, <span className="text-blue-700 font-bold">{displayName}</span>
            </div>
            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-bold">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <button 
              onClick={onLogout}
              className="text-sm text-red-600 hover:text-red-800 font-medium ml-2 cursor-pointer"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </header>
  );
};

export default Navbar;