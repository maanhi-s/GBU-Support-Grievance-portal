import React from 'react';

export default function AdminConsole({ tickets, onResolveClick }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden animate-fade-in-up">
      <div className="bg-purple-900 text-white p-6 border-b-4 border-amber-400 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="font-extrabold text-xl tracking-tight">Departmental Authority Console</h3>
          <p className="text-sm text-purple-200 mt-1">Overview of assigned tickets & escalation SLA timers</p>
        </div>
        <span className="bg-amber-400 text-purple-900 font-black text-sm px-4 py-1.5 rounded-xl shadow-md">
          Total Active: {tickets.filter(t => t.status !== 'Resolved').length}
        </span>
      </div>

      <div className="overflow-x-auto p-2">
        <table className="w-full text-left text-sm border-separate border-spacing-y-2">
          <thead className="text-slate-500 font-bold uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4">Ticket Details</th>
              <th className="p-4">Department & Location</th>
              <th className="p-4">SLA Clock</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} className="bg-white hover:bg-purple-50 rounded-xl shadow-sm transition-colors group">
                <td className="p-4 border-b border-slate-100 rounded-l-xl">
                  <div className="font-black text-purple-900">{t.id}</div>
                  <div className="text-slate-700 font-semibold mt-1">{t.subject}</div>
                </td>
                <td className="p-4 border-b border-slate-100">
                  <div className="font-bold text-slate-800">{t.department.replace('_', ' ')}</div>
                  <div className="text-xs text-slate-500 mt-1">{t.location}</div>
                </td>
                <td className="p-4 border-b border-slate-100">
                  {t.slaHoursLeft <= 0 ? (
                    <span className="bg-rose-100 text-rose-700 border border-rose-200 px-3 py-1 rounded-full font-black text-xs shadow-sm">
                      🔴 ESCALATED
                    </span>
                  ) : (
                    <span className="font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">🕒 {t.slaHoursLeft}h left</span>
                  )}
                </td>
                <td className="p-4 border-b border-slate-100">
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase shadow-sm ${
                    t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-amber-100 text-amber-700 border border-amber-200'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="p-4 text-right border-b border-slate-100 rounded-r-xl">
                  {t.status !== 'Resolved' ? (
                    <button
                      onClick={() => onResolveClick(t)}
                      className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow-md hover:shadow-emerald-600/40 transition-all duration-200 opacity-90 group-hover:opacity-100"
                    >
                      Resolve Issue
                    </button>
                  ) : (
                    <span className="text-emerald-600 font-black text-sm pr-4">✓ Done</span>
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