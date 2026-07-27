import React from 'react';

export default function AdminConsole({ tickets, onResolveClick, currentUser }) {
  // STRICT FILTERING: Only show tickets matching the Admin's scope
  const adminTickets = tickets.filter(t => {
    // If they logged in as an Admin and selected a specific hostel in their profile,
    // they will only see tickets that mention that hostel.
    if (currentUser.metadata && currentUser.metadata.hostelBlock) {
       return t.location.includes(currentUser.metadata.hostelBlock);
    }
    // If they are a general admin, show all
    return true; 
  });

  return (
    <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
      
      <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg text-slate-800">Restricted Staff Console</h3>
          <p className="text-sm text-slate-500 mt-1">Viewing authorized tickets for: <strong className="text-slate-700">{currentUser.name}</strong></p>
        </div>
        <div className="text-sm font-medium bg-white px-3 py-1.5 border border-slate-200 rounded text-slate-600">
          Strict Mode: Active
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white border-b border-slate-200 text-slate-500 font-medium">
            <tr>
              <th className="p-4 font-medium">Ticket ID & Proof</th>
              <th className="p-4 font-medium">Location</th>
              <th className="p-4 font-medium">SLA Deadline</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {adminTickets.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-slate-500">No active tickets in your jurisdiction.</td>
              </tr>
            ) : adminTickets.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="text-slate-800 font-medium">{t.id}</div>
                  {t.status === 'Resolved' && <div className="text-xs text-emerald-600 mt-1">📎 Resolution Proof Uploaded</div>}
                </td>
                <td className="p-4 text-slate-500 max-w-xs truncate">{t.location}</td>
                <td className="p-4">
                  {t.status === 'Resolved' ? (
                     <span className="text-slate-400 text-xs">SLA Met</span>
                  ) : t.slaHoursLeft <= 0 ? (
                    <span className="text-red-600 font-bold text-xs">⚠️ DEADLINE BREACHED</span>
                  ) : (
                    <span className="text-amber-600 font-medium text-xs">⏳ {t.slaHoursLeft} Hours Left</span>
                  )}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    t.status === 'Resolved' ? 'text-emerald-600 bg-emerald-50 border border-emerald-100' : 
                    t.status === 'Reopened' ? 'text-red-600 bg-red-50 border border-red-100' : 'text-amber-600 bg-amber-50 border border-amber-100'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {t.status !== 'Resolved' && (
                    <button
                      onClick={() => onResolveClick(t)}
                      className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded font-medium text-xs transition-colors shadow-sm"
                    >
                      Upload Proof & Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}