import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import KnowledgeBase from './components/KnowledgeBase';
import AuthScreen from './components/AuthScreen';
import RaiseTicketModal from './components/RaiseTicketModal';
import AdminConsole from './components/AdminConsole';

const INITIAL_FAQS = [
  {
    category: "Hostels & Mess",
    icon: "🏢",
    topics: [
      { id: "h1", question: "How do I log room maintenance or electrical repairs?", answer: "Enquiry offices are available 24/7 across all hostel blocks. For faster online tracking, log a ticket under 'Hostel Maintenance'. A technician will be assigned within 24 hours." },
      { id: "h2", question: "What is the procedure for mess fee rebate?", answer: "Mess rebates require prior written approval or an online request if absent for 3+ consecutive days. Submit a request under 'Accounts & Fees'." }
    ]
  },
  {
    category: "Fees & Accounts",
    icon: "💰",
    topics: [
      { id: "f1", question: "How to get official fee receipts for bank loan approval?", answer: "Fee structure receipts can be downloaded directly from the student ERP or requested via an online ticket under 'Accounts & Fees'." },
      { id: "f2", question: "What are the rules regarding late fee penalties?", answer: "Penalties apply after the official due date. Condonation requests must be addressed to the Registrar's office with valid supporting evidence." }
    ]
  },
  {
    category: "Academics & Schools",
    icon: "📚",
    topics: [
      { id: "a1", question: "How to apply for Provisional Degree or Transcripts?", answer: "Apply through the Examination Cell portal. Ensure all department clearances (Library, Hostel, Accounts) are complete before lodging a transcript ticket." },
      { id: "a2", question: "Attendance requirement rules for semester exams?", answer: "Minimum 75% attendance is mandatory. Medical condonation up to 10% requires HOD/Dean approval within 7 days of illness." }
    ]
  }
];

const INITIAL_TICKETS = [
  {
    id: 'GBU-HOSTEL-2026-8941',
    userEmail: 'student@gbu.ac.in',
    userName: 'Rahul Verma',
    department: 'HOSTEL_WARDEN',
    location: 'Sant Kabir Hostel (Boys) - Room 204',
    subject: 'Washroom water pipe leakage',
    description: 'Main pipe leaking continuously on 2nd floor.',
    hasPhoto: true,
    status: 'Open',
    slaHoursLeft: 14,
    createdAt: '2026-07-27 10:30 AM'
  },
  {
    id: 'GBU-GENERAL-2026-1029',
    userEmail: 'visitor@gmail.com',
    userName: 'Anil Kumar',
    department: 'GENERAL_HELPDESK',
    location: 'School of ICT Main Gate',
    subject: 'Guest House Booking Inquiry',
    description: 'Requesting details for university guest house allocation.',
    hasPhoto: false,
    status: 'Open',
    slaHoursLeft: -4,
    createdAt: '2026-07-25 02:15 PM'
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState('knowledge_base');
  const [currentUser, setCurrentUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState(INITIAL_FAQS[0].topics[0]);

  // Load from Local Storage [cite: 226, 366]
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('gbu_portal_tickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  useEffect(() => {
    localStorage.setItem('gbu_portal_tickets', JSON.stringify(tickets));
  }, [tickets]);

  const [authData, setAuthData] = useState({
    name: '', email: '', password: '', role: 'STUDENT',
    school: 'School of ICT (SOICT)',
    residencyStatus: 'HOSTELLER', hostelBlock: 'Sant Kabir Hostel (Boys)'
  });

  const [ticketData, setTicketData] = useState({
    department: 'HOSTEL_WARDEN', location: '',
    subject: '', description: '', hasPhoto: false
  });

  const [resolvingTicket, setResolvingTicket] = useState(null);
  const [hasProofUpload, setHasProofUpload] = useState(false);

  // Authentication Flow [cite: 361]
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const userRole = authData.role === 'ADMIN' ? 'ADMIN' : 'STUDENT';
    const userObj = {
      name: authData.name || authData.email.split('@')[0],
      email: authData.email,
      role: userRole,
      metadata: authData
    };
    setCurrentUser(userObj);
    setCurrentView('dashboard');
  };

  // Ticket Creation
  const handleCreateTicket = (e) => {
    e.preventDefault();
    const generatedId = `GBU-${ticketData.department.split('_')[0]}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket = {
      id: generatedId,
      userEmail: currentUser.email,
      userName: currentUser.name,
      department: ticketData.department,
      location: ticketData.location,
      subject: ticketData.subject,
      description: ticketData.description,
      hasPhoto: ticketData.hasPhoto,
      status: 'Open',
      slaHoursLeft: 48,
      createdAt: new Date().toLocaleString()
    };
    setTickets([newTicket, ...tickets]);
    alert(`✅ Ticket Created Successfully!\nYour Unique Ticket ID is: ${generatedId}`);
    setIsModalOpen(false);
  };

  // Ticket Resolution & Mandatory Proof [cite: 128, 450]
  const handleConfirmResolve = (e) => {
    e.preventDefault();
    if (!hasProofUpload) {
      alert("❌ MANDATORY PROOF REQUIRED: You must attach completion photo evidence before resolving!");
      return;
    }
    const updated = tickets.map(t => t.id === resolvingTicket.id ? { ...t, status: 'Resolved' } : t);
    setTickets(updated);
    alert(`📧 Alert sent to ${resolvingTicket.userEmail}: Ticket ${resolvingTicket.id} marked RESOLVED.`);
    setResolvingTicket(null);
    setHasProofUpload(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-amber-400 selection:text-purple-900">
      
      {/* GLOBAL NAVBAR */}
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        user={currentUser} 
        onLogout={() => { setCurrentUser(null); setCurrentView('knowledge_base'); }} 
      />

      {/* VIEW: ZERODHA KNOWLEDGE BASE */}
      {currentView === 'knowledge_base' && (
        <KnowledgeBase 
          faqs={INITIAL_FAQS}
          activeFaq={activeFaq}
          setActiveFaq={setActiveFaq}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onRaiseTicketClick={() => {
            if (!currentUser) setCurrentView('auth');
            else setIsModalOpen(true);
          }}
        />
      )}

      {/* VIEW: AUTHENTICATION */}
      {currentView === 'auth' && (
        <AuthScreen 
          authData={authData}
          setAuthData={setAuthData}
          onSubmit={handleAuthSubmit}
        />
      )}

      {/* VIEW: DASHBOARDS (Student & Admin) */}
      {currentView === 'dashboard' && currentUser && (
        <main className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in-up">
          {currentUser.role === 'ADMIN' ? (
            <AdminConsole 
              tickets={tickets} 
              onResolveClick={(t) => setResolvingTicket(t)} 
            />
          ) : (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-3xl shadow-md border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <input 
                  type="text" 
                  placeholder="🔍 Search my tickets by Ticket ID or Keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-96 p-3 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-shadow"
                />

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full md:w-auto bg-amber-400 hover:bg-amber-500 active:scale-95 text-purple-900 font-extrabold px-6 py-3 rounded-xl shadow-lg hover:shadow-amber-400/50 transition-all duration-300"
                >
                  + Raise Support Ticket
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets
                  .filter(t => t.id.toLowerCase().includes(searchQuery.toLowerCase()) || t.subject.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(t => (
                    <div key={t.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs font-black text-purple-900 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100">{t.id}</span>
                          <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase shadow-sm ${
                            t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {t.status}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-800 text-base">{t.subject}</h4>
                          <p className="text-sm text-slate-500 font-medium leading-relaxed mt-2 line-clamp-3">{t.description}</p>
                        </div>
                      </div>
                      <div className="pt-4 mt-4 border-t border-slate-100 flex justify-between text-[11px] text-slate-400 font-bold">
                        <span className="truncate pr-2">📍 {t.location}</span>
                        <span className="shrink-0">🕒 {t.createdAt.split(',')[0]}</span>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          )}
        </main>
      )}

      {/* MODAL: SUBMIT TICKET */}
      <RaiseTicketModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticketData={ticketData}
        setTicketData={setTicketData}
        onSubmit={handleCreateTicket}
      />

      {/* MODAL: ADMIN PROOF UPLOAD */}
      {resolvingTicket && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex justify-center items-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 space-y-5 border border-slate-100 transform transition-all scale-100">
            <div>
              <h3 className="font-black text-lg text-purple-900">Mandatory Proof of Resolution</h3>
              <p className="text-sm text-slate-500 font-medium mt-1">Attach photo evidence showing completed work for <span className="font-bold text-slate-800">{resolvingTicket.id}</span>.</p>
            </div>

            <div 
              onClick={() => setHasProofUpload(!hasProofUpload)} 
              className={`border-2 border-dashed p-6 text-center rounded-2xl cursor-pointer transition-all duration-300 ${
                hasProofUpload ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-inner' : 'border-slate-300 text-slate-500 hover:bg-slate-50 hover:border-purple-400'
              }`}
            >
              <span className="font-extrabold text-sm">
                {hasProofUpload ? '✅ Completion Image Attached' : '📷 Click to Upload Completion Photo (Required)'}
              </span>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => setResolvingTicket(null)} className="px-5 py-2.5 border border-slate-300 hover:bg-slate-100 rounded-xl font-bold text-slate-600 transition-colors">Cancel</button>
              <button onClick={handleConfirmResolve} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black rounded-xl shadow-lg hover:shadow-emerald-600/50 transition-all duration-200">
                Confirm & Resolve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}