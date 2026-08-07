import React, { useState } from 'react';
import UserManagement from './UserManagement';
import TicketDetailView from './TicketDetailView';

const AdminConsole = ({ tickets, onResolveClick, currentUser }) => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  return (
    <div className="flex w-full bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden" style={{ minHeight: '75vh' }}>
      
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col">
        <div 
          onClick={() => { setActiveTab('tickets'); setSelectedTicket(null); }}
          className={`px-6 py-3 cursor-pointer text-sm font-medium transition-colors ${
            activeTab === 'tickets' && !selectedTicket ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-600' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Home (Tickets)
        </div>
        
        <div className="px-6 py-3 hover:bg-slate-50 hover:text-blue-600 cursor-pointer text-sm font-medium text-slate-600 transition-colors">Alerts</div>

        {/* Users Collapsible Menu */}
        <div>
          <div 
            className="px-6 py-3 hover:bg-slate-50 hover:text-blue-600 cursor-pointer text-sm font-medium text-slate-600 flex justify-between items-center transition-colors"
            onClick={() => setIsUsersOpen(!isUsersOpen)}
          >
            <span>Users</span>
            <span className="text-xs">{isUsersOpen ? '▲' : '▼'}</span>
          </div>
          
          {isUsersOpen && (
            <div className="bg-slate-50 py-1 border-y border-slate-100">
              <div 
                onClick={() => { setActiveTab('users'); setSelectedTicket(null); }}
                className={`px-10 py-2 cursor-pointer text-xs font-medium transition-colors ${
                  activeTab === 'users' ? 'text-blue-700 font-bold' : 'text-slate-500 hover:text-blue-600'
                }`}
              >
                Active users
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-3 hover:bg-slate-50 hover:text-blue-600 cursor-pointer text-sm font-medium text-slate-600 transition-colors">Groups</div>
        <div className="px-6 py-3 hover:bg-slate-50 hover:text-blue-600 cursor-pointer text-sm font-medium text-slate-600 transition-colors">Resources</div>
        <div className="px-6 py-3 hover:bg-slate-50 hover:text-blue-600 cursor-pointer text-sm font-medium text-slate-600 transition-colors">Reports</div>
        <div className="my-2 border-b border-slate-200"></div>
        <div className="px-6 py-3 hover:bg-slate-50 hover:text-blue-600 cursor-pointer text-sm font-medium text-slate-600 transition-colors">Support</div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex-1 bg-slate-50 p-6 overflow-y-auto">
        
        {/* VIEW 1: TICKETS LIST */}
        {activeTab === 'tickets' && !selectedTicket && (
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Grievance Management Dashboard</h2>
            <div className="space-y-4">
              {tickets.map(t => (
                <div 
                  key={t.id} 
                  onClick={() => setSelectedTicket(t)}
                  className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex justify-between items-center cursor-pointer hover:border-blue-300 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-sm font-semibold text-slate-500">{t.id}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                    <h4 className="font-semibold text-slate-900 text-lg">{t.subject}</h4>
                    <p className="text-sm text-slate-600 line-clamp-1">{t.description}</p>
                  </div>
                  <div className="text-right text-xs text-slate-400">
                    <div>📍 {t.location}</div>
                    <div>🕒 {t.createdAt}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: DETAILED TICKET & CHAT */}
        {selectedTicket && (
          <TicketDetailView 
            ticket={selectedTicket} 
            onBack={() => setSelectedTicket(null)} 
            onResolveClick={onResolveClick} 
            currentUser={currentUser} 
          />
        )}

        {/* VIEW 3: USER MANAGEMENT CONSOLE */}
        {activeTab === 'users' && (
          <UserManagement />
        )}

      </div>
    </div>
  );
};

export default AdminConsole;