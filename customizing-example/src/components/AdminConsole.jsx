import React, { useState } from 'react';

export default function AdminConsole({ tickets, onResolveClick }) {
  const [filter, setFilter] = useState('ALL');

  const filteredTickets = filter === 'ALL' ? tickets : tickets.filter(t => t.department === filter);

  return (
    <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
      
      {/* Console Header */}
      <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg text-slate-800">Staff Control Center</h3>
          <p className="text-sm text-slate-500 mt-1">Manage departmental tickets and track SLAs.</p>
        </div>
        <select 
          value={filter} onChange={(e) => setFilter(e.target.value)}
          className="bg-white border border-slate-300 text-slate-700 text-sm rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        >
          <option value="ALL">All Departments</option>
          <option value="HOSTEL_WARDEN">Hostel Warden</option>
          <option value="ESTATE_REPAIR">Estate Repairs</option>
        </select>
      </div>

      {/* Clean Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white border-b border-slate-200 text-slate-500 font-medium">
            <tr>
              <th className="p-4 font-medium">Ticket ID</th>
              <th className="p-4 font-medium">Subject</th>
              <th className="p-4 font-medium">Location</th>
              <th className="p-4 font-medium">Status & SLA</th>
              <th className="p-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTickets.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-slate-800 font-medium">{t.id}</td>
                <td className="p-4 text-slate-600 max-w-xs truncate">{t.subject}</td>
                <td className="p-4 text-slate-500">{t.location}</td>
                <td className="p-4">
                  {t.status === 'Resolved' ? (
                    <span className="text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded text-xs">Resolved</span>
                  ) : t.slaHoursLeft <= 0 ? (
                    <span className="text-red-600 bg-red-50 border border-red-100 px-2 py-1 rounded text-xs">Escalated</span>
                  ) : (
                    <span className="text-amber-600 bg-amber-50 border border-amber-100 px-2 py-1 rounded text-xs">{t.slaHoursLeft}h left</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  {t.status !== 'Resolved' && (
                    <button
                      onClick={() => onResolveClick(t)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                    >
                      Mark Resolved
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