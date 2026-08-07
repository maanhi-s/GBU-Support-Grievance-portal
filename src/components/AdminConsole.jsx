// src/components/AdminConsole.jsx
import React, { useState } from 'react';
import { Search, Plus, UserCheck, Filter, MessageSquare, CheckCircle } from 'lucide-react';

export default function AdminConsole({ tickets, onOpenChat }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMember, setShowAddMember] = useState(false);

  // Filter Logic
  const filteredTickets = tickets.filter(t => 
    t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.issue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden m-0 p-0">
      {/* Sidebar */}
      <div className="w-64 bg-[#1B2A4A] text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
           <img src="/gbu-logo.png" alt="GBU Logo" className="h-10" />
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full text-left p-3 bg-[#D4AF37] text-[#1B2A4A] font-bold rounded-lg">Dashboard</button>
          <button className="w-full text-left p-3 hover:bg-white/10 rounded-lg transition">All Tickets</button>
          <button className="w-full text-left p-3 hover:bg-white/10 rounded-lg transition">My Assigned</button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col">
        <div className="bg-white p-6 shadow-sm flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1B2A4A]">Faculty Cell Head Dashboard</h1>
          <button onClick={() => setShowAddMember(true)} className="bg-[#1B2A4A] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#1B2A4A]/90 transition">
            <Plus size={18} /> Add Member
          </button>
        </div>

        <div className="p-6">
          {/* Search & Filters */}
          <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by Name, Email, or Ticket ID..." 
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4AF37]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="border rounded-lg px-4 py-2 bg-gray-50">
              <option>All Statuses</option>
              <option>Open</option>
              <option>Resolved</option>
            </select>
          </div>

          {/* Tickets Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-4">User & Ticket</th>
                  <th className="p-4">Issue Details</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Assigned To</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map(ticket => (
                  <tr key={ticket.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-bold">{ticket.studentName}</div>
                      <div className="text-xs text-gray-500">{ticket.id}</div>
                    </td>
                    <td className="p-4 text-gray-700">{ticket.issue}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${ticket.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {/* Assignment Dropdown for Head Admin */}
                      <select className="border rounded px-2 py-1 text-xs">
                        <option>Unassigned</option>
                        <option>Prof. Sharma (Hostel 4)</option>
                        <option>Estate Section</option>
                      </select>
                    </td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => onOpenChat(ticket)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition" title="Open Chat">
                        <MessageSquare size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-4 text-[#1B2A4A]">Add New Admin Member</h2>
            <input type="text" placeholder="Full Name" className="w-full border p-2 rounded mb-3" />
            <input type="email" placeholder="Email Address" className="w-full border p-2 rounded mb-3" />
            <select className="w-full border p-2 rounded mb-4">
              <option>Select Role / Department</option>
              <option>Junior Warden</option>
              <option>Estate Manager</option>
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAddMember(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded">Cancel</button>
              <button className="px-4 py-2 bg-[#1B2A4A] text-white rounded hover:bg-opacity-90">Add Member</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}