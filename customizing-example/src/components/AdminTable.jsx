import React from 'react';
import { UserX } from 'lucide-react';

export default function AdminTable({ tickets, onUpdateStatus }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-[#1B2A4A] text-white p-4 border-b-2 border-[#D4AF37] flex justify-between items-center">
        <div>
          <h2 className="font-bold text-sm">Admin Grievance Management Dashboard</h2>
          <p className="text-[11px] text-slate-300">Updating status automatically triggers mandatory student email notifications.</p>
        </div>
        <span className="bg-[#D4AF37] text-[#1B2A4A] font-bold text-xs px-2.5 py-1 rounded">
          Total: {tickets.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 text-slate-600 font-semibold uppercase border-b border-slate-200">
            <tr>
              <th className="p-4">Ticket ID & Title</th>
              <th className="p-4">Location / Scope</th>
              <th className="p-4">Student Identity</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tickets.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 transition">
                <td className="p-4">
                  <div className="font-bold text-[#1B2A4A]">{t.id}</div>
                  <div className="text-slate-800 mt-0.5 font-medium">{t.title}</div>
                </td>
                <td className="p-4 text-slate-600">
                  {t.domain === 'HOSTEL' ? t.hostelBlock : t.department}
                </td>
                <td className="p-4">
                  {t.isAnonymous ? (
                    <span className="text-slate-400 italic flex items-center gap-1 font-medium">
                      <UserX size={12} /> Confidential
                    </span>
                  ) : (
                    <span className="text-slate-700 font-medium">{t.email}</span>
                  )}
                </td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    t.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                    t.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <select 
                    value={t.status}
                    onChange={(e) => onUpdateStatus(t.id, e.target.value)}
                    className="border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold focus:ring-2 focus:ring-[#D4AF37] focus:outline-none bg-slate-50"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}