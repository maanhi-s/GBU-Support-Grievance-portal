import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import KnowledgeBase from './components/KnowledgeBase';
import AuthScreen from './components/AuthScreen';
import RaiseTicketModal from './components/RaiseTicketModal';
import AdminConsole from './components/AdminConsole';
import Footer from './components/Footer';


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
  const [resolvingTicket, setResolvingTicket] = useState(null);
  const [hasProofUpload, setHasProofUpload] = useState(false);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    // Saving all metadata (like hostel block) into the currentUser object so the Admin Console can use it
    setCurrentUser({ 
      name: authData.name || 'User', 
      email: authData.email, 
      role: authData.role === 'ADMIN' ? 'ADMIN' : 'STUDENT',
      metadata: authData 
    });
    setCurrentView('dashboard');
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    const newId = `GBU-${ticketData.department.split('_')[0]}-${Math.floor(1000+Math.random()*9000)}`;
    setTickets([{ id: newId, userEmail: currentUser.email, ...ticketData, status: 'Open', slaHoursLeft: 48, createdAt: new Date().toLocaleDateString() }, ...tickets]);
    setIsModalOpen(false);
  };

  // Reopen Case Logic for Students
  const handleReopen = (ticketId) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: 'Reopened', slaHoursLeft: 24 } : t));
    alert("Ticket reopened and escalated for immediate review.");
  };

  // Admin Proof Upload Logic
  const handleConfirmResolve = (e) => {
    e.preventDefault();
    if (!hasProofUpload) {
      alert("❌ MANDATORY PROOF REQUIRED: You must attach completion photo evidence before resolving!");
      return;
    }
    setTickets(tickets.map(t => t.id === resolvingTicket.id ? { ...t, status: 'Resolved' } : t));
    alert(`📧 Alert sent to ${resolvingTicket.userEmail}: Ticket marked RESOLVED.`);
    setResolvingTicket(null);
    setHasProofUpload(false);
  };

return (
  <div className="overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

      
      {/* 1. TOP NAVBAR */}
      <Navbar 
  currentView={currentView} 
  setCurrentView={setCurrentView} 
  currentUser={currentUser} 
  onLogin={() => setCurrentView('auth')}
  onLogout={() => { 
    setCurrentUser(null); 
    setCurrentView('knowledge_base'); 
  }} 
/>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-grow flex flex-col w-full">
        {currentView === 'knowledge_base' && (
          <KnowledgeBase 
            faqs={INITIAL_FAQS} 
            activeFaq={activeFaq} 
            setActiveFaq={setActiveFaq} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            onRaiseTicketClick={() => currentUser ? setIsModalOpen(true) : setCurrentView('auth')} 
          />
        )}

        {currentView === 'auth' && (
          <AuthScreen authData={authData} setAuthData={setAuthData} onSubmit={handleAuthSubmit} />
        )}

        {currentView === 'dashboard' && currentUser && (
          <div className="max-w-7xl mx-auto px-4 py-8 w-full">
            {currentUser.role === 'ADMIN' ? (
              <AdminConsole tickets={tickets} onResolveClick={(t) => setResolvingTicket(t)} currentUser={currentUser} />
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-white p-4 rounded border border-slate-200 shadow-sm">
                  <h2 className="text-xl font-medium text-slate-800">My Tickets</h2>
                  <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-5 py-2 rounded text-sm font-medium">Raise New Ticket</button>
                </div>
                
                <div className="space-y-4">
                  {tickets.map(t => (
                    <div key={t.id} className="bg-white p-5 rounded border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono text-sm font-semibold text-slate-500">{t.id}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 
                            t.status === 'Reopened' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {t.status}
                          </span>
                        </div>
                        <h4 className="font-semibold text-slate-900 text-lg">{t.subject}</h4>
                        <p className="text-sm text-slate-600 mt-1">{t.description}</p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-3 min-w-[200px]">
                        <div className="text-right text-xs text-slate-400">
                          <div>📍 {t.location}</div>
                          <div>🕒 Logged: {t.createdAt}</div>
                        </div>
                        {t.status === 'Resolved' && (
                          <button 
                            onClick={() => handleReopen(t.id)}
                            className="w-full md:w-auto px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-medium rounded text-sm transition-colors"
                          >
                            Issue not fixed? Reopen
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* 3. MODALS & FOOTER */}
      <RaiseTicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} ticketData={ticketData} setTicketData={setTicketData} onSubmit={handleCreateTicket} />
      <Footer />
      
    </div>
  );}