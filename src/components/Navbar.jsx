import React from 'react';

const TopHeader = ({ currentUser }) => {
  // Dynamically set the name based on the logged-in user.
  // If no user is logged in yet, it defaults to 'Guest'.
  const displayName = currentUser?.name || currentUser?.role || 'Guest';

  return (
    <header className="bg-white border-b border-gray-200 h-14 flex items-center justify-between px-4 shadow-sm w-full relative z-10">
      
      {/* LEFT SIDE: GBU Logo & Brand */}
      <div className="flex items-center gap-3">
        {/* Make sure 'gbu-logo.png' is saved in your 'public' folder */}
        <img 
          src="/gbu-logo.png" 
          alt="Gautam Buddha University Logo" 
          className="h-10 w-auto object-contain"
        />
        <span className="font-bold text-blue-900 text-lg hidden sm:block tracking-wide">
          Grievance Portal
        </span>
      </div>

      {/* RIGHT SIDE: Dynamic User Greeting & Profile Avatar */}
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-700 font-medium">
          Hi, <span className="text-blue-700 font-bold">{displayName}</span>
        </div>
        
        {/* Clean Profile Circle */}
        <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-bold border border-blue-200">
          {displayName.charAt(0).toUpperCase()}
        </div>
      </div>

    </header>
  );
};

export default TopHeader;