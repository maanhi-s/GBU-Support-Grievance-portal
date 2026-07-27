import React from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="bg-[#1B2A4A] text-white border-b-4 border-[#D4AF37] shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center font-bold text-[#1B2A4A] text-lg shadow">
            GBU
          </div>
          <div>
            <h1 className="text-base font-bold tracking-wide">Gautam Buddha University</h1>
            <p className="text-xs text-[#D4AF37] font-medium">Grievance Redressal & Ticket System</p>
          </div>
        </div>

        <div className="flex bg-slate-800/80 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => setActiveTab('student')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition ${
              activeTab === 'student' ? 'bg-[#D4AF37] text-[#1B2A4A]' : 'text-slate-300 hover:text-white'
            }`}
          >
            Student Portal
          </button>
          <button
            onClick={() => setActiveTab('authority')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition ${
              activeTab === 'authority' ? 'bg-[#D4AF37] text-[#1B2A4A]' : 'text-slate-300 hover:text-white'
            }`}
          >
            Admin Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
}