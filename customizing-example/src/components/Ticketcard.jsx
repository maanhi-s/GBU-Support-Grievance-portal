import React from 'react';
import { Home, Building2, Clock } from 'lucide-react';

export default function TicketCard({ ticket }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <span className="text-xs font-bold text-[#1B2A4A] bg-slate-100 px-2.5 py-1 rounded">
          {ticket.id}
        </span>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
          ticket.status === 'Pending' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
          ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
        }`}>
          {ticket.status}
        </span>
      </div>

      <div>
        <h3 className="font-bold text-slate-800 text-sm">{ticket.title}</h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{ticket.description}</p>
      </div>

      <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-500">
        <span className="font-medium text-slate-700 flex items-center gap-1">
          {ticket.domain === 'HOSTEL' ? <Home size={12} /> : <Building2 size={12} />}
          {ticket.domain === 'HOSTEL' ? ticket.hostelBlock : ticket.department} (Room {ticket.roomNumber})
        </span>
        <span className="flex items-center gap-1"><Clock size={12} /> {ticket.createdAt}</span>
      </div>
    </div>
  );
}