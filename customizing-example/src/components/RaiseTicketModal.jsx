import React from 'react';

// ==========================================
// [EDIT HERE]: Add exact locations if needed
// ==========================================
const DEPARTMENT_ROUTING = [
  { id: "HOSTEL_WARDEN", label: "Hostel Warden Office" },
  { id: "ESTATE_REPAIR", label: "Estate & Civil Repairs (24/7)" },
  { id: "ACCOUNTS_FEES", label: "Accounts & Fee Section" },
  { id: "ANTI_RAGGING", label: "Anti-Ragging / Proctorial Board" },
  { id: "GENERAL_HELPDESK", label: "General Helpdesk Triage" }
];
// ==========================================

export default function RaiseTicketModal({ isOpen, onClose, ticketData, setTicketData, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex justify-center items-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 transform transition-all scale-100">
        <div className="bg-purple-900 text-white p-5 flex justify-between items-center border-b-4 border-amber-400">
          <h3 className="font-extrabold text-base tracking-wide">Lodge Support Ticket</h3>
          <button onClick={onClose} className="text-purple-200 hover:text-white hover:bg-purple-800 rounded-full w-8 h-8 flex items-center justify-center transition-colors">&times;</button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4 text-sm">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Target Department</label>
            <select 
              value={ticketData.department} onChange={(e) => setTicketData({...ticketData, department: e.target.value})}
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none font-bold text-purple-900 bg-purple-50"
            >
              {DEPARTMENT_ROUTING.map(dept => <option key={dept.id} value={dept.id}>{dept.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Specific Location / Room</label>
            <input 
              type="text" required placeholder="e.g. Hostel 4 Room 204 or SOICT Lab 3"
              value={ticketData.location} onChange={(e) => setTicketData({...ticketData, location: e.target.value})}
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none transition-shadow"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Subject / Query Title</label>
            <input 
              type="text" required placeholder="Brief summary..."
              value={ticketData.subject} onChange={(e) => setTicketData({...ticketData, subject: e.target.value})}
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none transition-shadow"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Detailed Explanation</label>
            <textarea 
              rows="3" required placeholder="Provide full context..."
              value={ticketData.description} onChange={(e) => setTicketData({...ticketData, description: e.target.value})}
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none resize-none transition-shadow"
            ></textarea>
          </div>

          <div 
            onClick={() => setTicketData({...ticketData, hasPhoto: !ticketData.hasPhoto})}
            className={`border-2 border-dashed p-4 rounded-2xl text-center cursor-pointer transition-all duration-300 ${
              ticketData.hasPhoto ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-inner' : 'border-slate-300 text-slate-500 hover:bg-slate-50 hover:border-purple-400'
            }`}
          >
            <span className="font-bold">
              {ticketData.hasPhoto ? '✅ Image Attached Successfully' : '📷 Click to Attach Supporting Photo (Optional)'}
            </span>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-5 py-2.5 border border-slate-300 hover:bg-slate-100 rounded-xl font-bold text-slate-600 transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-2.5 bg-purple-900 hover:bg-purple-800 active:scale-95 text-white font-extrabold rounded-xl shadow-lg hover:shadow-purple-900/50 transition-all duration-200">
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}