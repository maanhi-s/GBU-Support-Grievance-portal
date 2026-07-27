import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import KnowledgeBase from './components/KnowledgeBase';
import AuthScreen from './components/AuthScreen';
import RaiseTicketModal from './components/RaiseTicketModal';
import AdminConsole from './components/AdminConsole';

const INITIAL_FAQS = [
  { category: "Hostels & Mess", icon: "🏢", topics: [{ id: "h1", question: "How do I log room maintenance?", answer: "Log a ticket under 'Estate Repairs'. A technician will be assigned within 24 hours." }] },
  { category: "Fees & Accounts", icon: "💰", topics: [{ id: "f1", question: "How to get official fee receipts?", answer: "Request via an online ticket under 'Accounts & Fees'." }] },
  { category: "Academics", icon: "📚", topics: [{ id: "a1", question: "Attendance rules for exams?", answer: "75% attendance is mandatory. Medical condonation requires HOD approval." }] }
];

const INITIAL_TICKETS = [
  { id: 'GBU-HOS-8941', userEmail: 'student@gbu.ac.in', userName: 'Rahul Verma', department: 'HOSTEL_WARDEN', location: 'Sant Kabir Hostel', subject: 'Pipe leakage', description: 'Leaking pipe.', hasPhoto: true, status: 'Open', slaHoursLeft: 14, createdAt: 'July 27, 2026' }
];

export default function App() {
  const [currentView, setCurrentView] = useState('knowledge_base');
  const [currentUser, setCurrentUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState(INITIAL_FAQS[0].topics[0]);

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('gbu_portal_tickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  useEffect(() => localStorage.setItem('gbu_portal_tickets', JSON.stringify(tickets)), [tickets]);

  const [authData, setAuthData] = useState({ name: '', email: '', password: '', role: 'STUDENT', school: 'School of ICT (SOICT)', residencyStatus: 'HOSTELLER', hostelBlock: 'Sant Kabir Hostel (Boys)' });
  const [ticketData, setTicketData] = useState({ department: 'HOSTEL_WARDEN', location: '', subject: '', description: '', hasPhoto: false });

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setCurrentUser({ name: authData.name || 'User', email: authData.email, role: authData.role === 'ADMIN' ? 'ADMIN' : 'STUDENT' });
    setCurrentView('dashboard');
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    const newId = `GBU-${ticketData.department.split('_')[0]}-${Math.floor(1000+Math.random()*9000)}`;
    setTickets([{ id: newId, userEmail: currentUser.email, ...ticketData, status: 'Open', slaHoursLeft: 48, createdAt: new Date().toLocaleDateString() }, ...tickets]);
    setIsModalOpen(false);
  };

  const handleResolve = (ticket) => {
    setTickets(tickets.map(t => t.id === ticket.id ? { ...t, status: 'Resolved' } : t));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} user={currentUser} onLogout={() => { setCurrentUser(null); setCurrentView('knowledge_base'); }} />

      {currentView === 'knowledge_base' && <KnowledgeBase faqs={INITIAL_FAQS} activeFaq={activeFaq} setActiveFaq={setActiveFaq} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onRaiseTicketClick={() => currentUser ? setIsModalOpen(true) : setCurrentView('auth')} />}
      {currentView === 'auth' && <AuthScreen authData={authData} setAuthData={setAuthData} onSubmit={handleAuthSubmit} />}

      {currentView === 'dashboard' && currentUser && (
        <main className="max-w-7xl mx-auto px-4 py-12">
          {currentUser.role === 'ADMIN' ? (
            <AdminConsole tickets={tickets} onResolveClick={handleResolve} />
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-4 rounded border border-slate-200 shadow-sm">
                <h2 className="text-xl font-medium text-slate-800">My Tickets</h2>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-5 py-2 rounded text-sm font-medium">Raise New Ticket</button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {tickets.map(t => (
                  <div key={t.id} className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold text-slate-700">{t.id}</span>
                      <span className={t.status === 'Resolved' ? 'text-emerald-600' : 'text-amber-600'}>{t.status}</span>
                    </div>
                    <h4 className="font-medium text-slate-900 mb-1">{t.subject}</h4>
                    <p className="text-sm text-slate-500 mb-4">{t.description}</p>
                    <div className="text-xs text-slate-400 border-t border-slate-100 pt-3">{t.location} • {t.createdAt}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      )}

      <RaiseTicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} ticketData={ticketData} setTicketData={setTicketData} onSubmit={handleCreateTicket} />
    </div>
  );
}