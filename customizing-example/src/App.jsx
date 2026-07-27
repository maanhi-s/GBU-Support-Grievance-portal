import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Navbar from './components/Navbar';
import TicketCard from './components/TicketCard';
import AdminTable from './components/AdminTable';
import GrievanceModal from './components/GrievanceModal';

const INITIAL_TICKETS = [
  {
    id: 'GBU-H4-2026-8941',
    email: 'student1@gbu.ac.in',
    domain: 'HOSTEL',
    title: 'Water Leakage in Washroom Block-B',
    description: 'Main pipe leaking continuously on the 2nd floor washroom area.',
    hostelBlock: 'Sant Kabir Hostel (Boys)',
    roomNumber: '204',
    isAnonymous: true,
    status: 'Pending',
    createdAt: '2026-07-27 10:30 AM'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('student');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Persistent State Management using LocalStorage
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('gbu_tickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  useEffect(() => {
    localStorage.setItem('gbu_tickets', JSON.stringify(tickets));
  }, [tickets]);

  const handleAddTicket = (newTicket) => {
    setTickets([newTicket, ...tickets]);
  };

  const handleUpdateStatus = (ticketId, newStatus) => {
    const updated = tickets.map(t => {
      if (t.id === ticketId) {
        alert(`📧 [MANDATORY EMAIL SENT]: Notification sent to ${t.email} -> Status updated to '${newStatus}'`);
        return { ...t, status: newStatus };
      }
      return t;
    });
    setTickets(updated);
  };

  const filteredTickets = tickets.filter(t => 
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by Ticket ID or Title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
            />
          </div>

          {activeTab === 'student' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto bg-[#D4AF37] hover:bg-[#E6A100] text-[#1B2A4A] font-bold px-5 py-2 rounded-lg text-xs shadow transition"
            >
              + Lodge Student Grievance
            </button>
          )}
        </div>

        {activeTab === 'student' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTickets.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <AdminTable tickets={filteredTickets} onUpdateStatus={handleUpdateStatus} />
        )}
      </main>

      <GrievanceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddTicket={handleAddTicket} 
      />
    </div>
  );
}