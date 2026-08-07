import React, { useState } from 'react';
import TicketChat from './TicketChat';

export default function TicketDetailView({ ticket, currentUser, onUpdateStatus }) {
  const [resolutionProof, setResolutionProof] = useState(null);
  const [workNotes, setWorkNotes] = useState('');

  const handleResolveSubmit = (e) => {
    e.preventDefault();
    if (!resolutionProof) {
      alert("Mandatory Photo Proof of Resolution is required to close this ticket!");
      return;
    }
    onUpdateStatus(ticket.id, 'Resolved', { proofName: resolutionProof.name, notes: workNotes });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="flex justify-between items-start border-b pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-blue-600">Ticket #{ticket.id}</span>
          <h2 className="text-xl font-bold text-slate-800 mt-1">{ticket.subject}</h2>
          <p className="text-xs text-slate-500 mt-0.5">📍 Location: {ticket.location} | Logged: {ticket.createdAt}</p>
        </div>
        <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">{ticket.status}</span>
      </div>

      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Query Description</h4>
        <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-100">{ticket.description}</p>
        {ticket.fileName && (
          <p className="text-xs text-blue-600 mt-2 font-medium">📎 Student Attachment: {ticket.fileName}</p>
        )}
      </div>

      {/* Admin Resolution & Proof Upload Section */}
      {currentUser?.role === 'ADMIN' && ticket.status !== 'Resolved' && (
        <form onSubmit={handleResolveSubmit} className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-4">
          <h4 className="text-sm font-bold text-blue-900">🛠️ Resolve Case (Proof of Work Required)</h4>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Resolution Work Notes</label>
            <input 
              type="text" 
              placeholder="e.g., Replaced rubber gasket in water tap." 
              value={workNotes} 
              onChange={(e) => setWorkNotes(e.target.value)} 
              className="w-full p-2.5 border rounded-lg text-sm bg-white outline-none focus:border-blue-600" 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Upload Photo Proof of Completion *</label>
            <input 
              type="file" 
              id="adminProof" 
              className="hidden" 
              accept="image/*" 
              onChange={(e) => setResolutionProof(e.target.files[0])} 
            />
            <label htmlFor="adminProof" className="cursor-pointer block border-2 border-dashed border-blue-300 rounded-lg p-3 text-center bg-white text-blue-700 font-medium text-xs hover:bg-blue-50">
              {resolutionProof ? `✅ Selected: ${resolutionProof.name}` : '📁 Browse & Attach Resolution Photo'}
            </label>
          </div>

          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg text-sm font-semibold shadow">
            Mark as Resolved & Submit Proof
          </button>
        </form>
      )}

      {/* Embedded Live Support Chat */}
      <TicketChat ticketId={ticket.id} currentUser={currentUser} />
    </div>
  );
}