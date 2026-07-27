import React from 'react';

export default function KnowledgeBase({ faqs, activeFaq, setActiveFaq, searchQuery, setSearchQuery, onRaiseTicketClick }) {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-10 animate-fade-in">
      
      {/* Hero Banner */}
      <div className="bg-purple-900 text-white rounded-[2rem] p-8 md:p-14 text-center border-b-4 border-amber-400 shadow-2xl relative overflow-hidden group">
        {/* Abstract Background Design */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-800 to-purple-900 opacity-50 z-0"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
        
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <span className="bg-amber-400 text-purple-900 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
            Official GBU Helpdesk
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">How can we help you today?</h2>
          <p className="text-sm md:text-base text-purple-200 font-medium">Search hostel guidelines, academic policies, fee structures, or raise a ticket.</p>
          
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-5 text-slate-400 text-xl">🔍</span>
            <input 
              type="text" 
              placeholder="Search e.g. Hostel repair, fee receipt, attendance rules..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pl-12 pr-6 rounded-2xl text-slate-800 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-amber-400 shadow-2xl transition-shadow duration-300"
            />
          </div>
        </div>
      </div>

      {/* Split Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sidebar Categories */}
        <div className="space-y-4 lg:col-span-1">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest pl-2">Browse Categories</h3>
          <div className="space-y-4">
            {faqs.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4 bg-slate-50 font-black text-sm text-purple-900 border-b border-slate-200 flex items-center gap-3">
                  <span className="text-xl bg-white p-2 rounded-lg shadow-sm border border-slate-100">{cat.icon}</span> {cat.category}
                </div>
                <div className="p-2 space-y-1">
                  {cat.topics.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveFaq(t)}
                      className={`w-full text-left p-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                        activeFaq.id === t.id ? 'bg-purple-900 text-white shadow-md translate-x-1' : 'text-slate-600 hover:bg-slate-100 hover:text-purple-900'
                      }`}
                    >
                      {t.question}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Answer Display */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-5 transform transition-all duration-300">
            <span className="text-xs bg-blue-100 text-blue-800 font-black px-3 py-1 rounded-full uppercase tracking-wide border border-blue-200">
              Verified Guide
            </span>
            <h3 className="text-2xl font-black text-purple-900 leading-snug">{activeFaq.question}</h3>
            <div className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-5 font-medium">
              {activeFaq.answer}
            </div>
          </div>

          {/* Call to action */}
          <div className="bg-amber-50 border-l-8 border-amber-400 p-8 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="space-y-1">
              <h4 className="font-black text-lg text-amber-900">Didn't find your answer?</h4>
              <p className="text-sm text-amber-800 font-medium">Lodge an official ticket to route your query directly to university authorities.</p>
            </div>
            <button
              onClick={onRaiseTicketClick}
              className="bg-purple-900 hover:bg-purple-800 active:scale-95 text-white font-black px-6 py-3.5 rounded-xl shadow-xl hover:shadow-purple-900/50 transition-all duration-300 shrink-0"
            >
              Raise Support Ticket →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}