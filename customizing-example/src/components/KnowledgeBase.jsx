import React from 'react';

export default function KnowledgeBase({ faqs, activeFaq, setActiveFaq, searchQuery, setSearchQuery, onRaiseTicketClick }) {
  return (
    <main className="min-h-screen bg-white">
      
      {/* Top Search Area (Clean Gray) */}
      <div className="bg-slate-50 border-b border-slate-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="text-3xl font-medium text-slate-800">Support Portal</h2>
          </div>
          
          <div className="relative max-w-4xl">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 text-lg">🔍</span>
            <input 
              type="text" 
              placeholder="Eg: How do I apply for mess rebate, How do I report a broken AC..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pl-12 pr-4 bg-white border border-slate-200 rounded text-slate-800 text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition-all"
            />
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Left Sidebar (Accordions) */}
        <div className="md:col-span-4 space-y-2">
          {faqs.map((cat, idx) => (
            <div key={idx} className="border border-slate-200 rounded bg-white overflow-hidden">
              <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center gap-3 font-medium text-slate-700">
                <span className="text-blue-500">{cat.icon}</span> {cat.category}
              </div>
              <div className="bg-white py-2">
                <ul className="space-y-1">
                  {cat.topics.map((t) => (
                    <li key={t.id}>
                      <button
                        onClick={() => setActiveFaq(t)}
                        className={`w-full text-left px-5 py-2 text-sm transition-colors ${
                          activeFaq.id === t.id ? 'text-blue-600 border-l-2 border-blue-600 bg-slate-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                        }`}
                      >
                        {t.question}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="md:col-span-8 space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Home</span> <span className="text-slate-300">❯</span> 
              <span>{faqs.find(c => c.topics.some(t => t.id === activeFaq.id))?.category}</span> <span className="text-slate-300">❯</span> 
              <span className="text-slate-800">Official Guide</span>
            </div>
            
            <h3 className="text-2xl font-medium text-slate-800 leading-snug">{activeFaq.question}</h3>
            
            <div className="text-base text-slate-600 leading-relaxed max-w-3xl">
              {activeFaq.answer}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 mt-8">
            <p className="text-slate-600 mb-4">You can track your complaints or tickets through the GBU support portal, depending on whether you have a registered account.</p>
            <button
              onClick={onRaiseTicketClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded shadow-sm transition-colors"
            >
              Raise a Support Ticket
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}