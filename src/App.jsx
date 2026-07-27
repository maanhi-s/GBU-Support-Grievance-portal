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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} user={currentUser} onLogout={() => { setCurrentUser(null); setCurrentView('knowledge_base'); }} />

      {currentView === 'knowledge_base' && <KnowledgeBase faqs={INITIAL_FAQS} activeFaq={activeFaq} setActiveFaq={setActiveFaq} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onRaiseTicketClick={() => currentUser ? setIsModalOpen(true) : setCurrentView('auth')} />}
      {currentView === 'auth' && <AuthScreen authData={authData} setAuthData={setAuthData} onSubmit={handleAuthSubmit} />}

      {currentView === 'dashboard' && currentUser && (
        <main className="max-w-7xl mx-auto px-4 py-12">
          {currentUser.role === 'ADMIN' ? (
            <AdminConsole tickets={tickets} onResolveClick={(t) => setResolvingTicket(t)} currentUser={currentUser} />
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-4 rounded border border-slate-200 shadow-sm">
                <h2 className="text-xl font-medium text-slate-800">My Tickets</h2>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-5 py-2 rounded text-sm font-medium">Raise New Ticket</button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {tickets.map(t => (
                  <div key={t.id} className="bg-white p-5 rounded border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold text-slate-700">{t.id}</span>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 
                          t.status === 'Reopened' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                      <h4 className="font-medium text-slate-900 mb-1">{t.subject}</h4>
                      <p className="text-sm text-slate-500 mb-4">{t.description}</p>
                    </div>
                    
                    <div className="border-t border-slate-100 pt-3 mt-2">
                      <div className="text-xs text-slate-400 mb-3 flex justify-between">
                        <span>📍 {t.location}</span>
                        <span>🕒 Logged: {t.createdAt}</span>
                      </div>
                      
                      {t.status === 'Resolved' && (
                        <button 
                          onClick={() => handleReopen(t.id)}
                          className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-medium py-1.5 rounded text-xs transition-colors"
                        >
                          Issue not fixed? Reopen Case
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      )}

      <RaiseTicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} ticketData={ticketData} setTicketData={setTicketData} onSubmit={handleCreateTicket} />

      {/* Mandatory Proof Modal for Admins */}
      {resolvingTicket && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded shadow-xl w-full max-w-md p-8 space-y-5 border border-slate-200">
            <div>
              <h3 className="font-semibold text-lg text-slate-900">Proof of Resolution</h3>
              <p className="text-sm text-slate-500 font-medium mt-1">Attach photo evidence showing completed work for <span className="font-bold text-slate-800">{resolvingTicket.id}</span>.</p>
            </div>

            <div 
              onClick={() => setHasProofUpload(!hasProofUpload)} 
              className={`border border-dashed p-6 text-center rounded cursor-pointer transition-colors ${
                hasProofUpload ? 'bg-blue-50 border-blue-400 text-blue-700' : 'border-slate-300 text-slate-500 hover:bg-slate-50'
              }`}
            >
              <span className="font-medium text-sm">
                {hasProofUpload ? '✅ Completion Image Attached' : '📷 Click to Upload Completion Photo (Required)'}
              </span>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => setResolvingTicket(null)} className="px-5 py-2 border border-slate-300 hover:bg-slate-50 rounded font-medium text-sm text-slate-600 transition-colors">Cancel</button>
              <button onClick={handleConfirmResolve} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded text-sm shadow-sm transition-colors">
                Confirm & Resolve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}