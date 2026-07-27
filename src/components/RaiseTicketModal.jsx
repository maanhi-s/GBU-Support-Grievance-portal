import React from 'react';

export default function RaiseTicketModal({ isOpen, onClose, ticketData, setTicketData, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
        
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-semibold text-slate-800">Lodge New Ticket</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl leading-none">&times;</button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4 text-sm">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Target Department</label>
            <select 
              value={ticketData.department} onChange={(e) => setTicketData({...ticketData, department: e.target.value})}
              className="w-full p-2.5 border border-slate-300 rounded focus:border-blue-500 outline-none bg-white"
            >
              <option value="HOSTEL_WARDEN">Hostel Warden Office</option>
              <option value="ESTATE_REPAIR">Estate & Civil Repairs</option>
              <option value="GENERAL_HELPDESK">General Helpdesk</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Specific Location</label>
            <input 
              type="text" required placeholder="e.g. Hostel 4 Room 204 or SOICT Lab"
              value={ticketData.location} onChange={(e) => setTicketData({...ticketData, location: e.target.value})}
              className="w-full p-2.5 border border-slate-300 rounded focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Issue Subject</label>
            <input 
              type="text" required placeholder="Brief summary of the problem"
              value={ticketData.subject} onChange={(e) => setTicketData({...ticketData, subject: e.target.value})}
              className="w-full p-2.5 border border-slate-300 rounded focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Details</label>
            <textarea 
              rows="3" required placeholder="Provide full context..."
              value={ticketData.description} onChange={(e) => setTicketData({...ticketData, description: e.target.value})}
              className="w-full p-2.5 border border-slate-300 rounded focus:border-blue-500 outline-none resize-none"
            ></textarea>
          </div>

          <div 
            onClick={() => setTicketData({...ticketData, hasPhoto: !ticketData.hasPhoto})}
            className={`border border-dashed p-4 rounded text-center cursor-pointer transition-colors ${
              ticketData.hasPhoto ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-slate-300 text-slate-500 hover:bg-slate-50'
            }`}
          >
            <span>{ticketData.hasPhoto ? '✓ Photo Attached' : '📎 Attach Photo Evidence (Optional)'}</span>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-5 py-2 text-slate-600 hover:text-slate-800 font-medium">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded shadow-sm transition-colors">
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}