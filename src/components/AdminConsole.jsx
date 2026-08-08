import React, { useState } from 'react';
import UserManagement from './UserManagement';

export default function AdminConsole({ tickets = [], onResolveClick, currentUser }) {
  const [activeTab, setActiveTab] = useState('tickets');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [usersList, setUsersList] = useState([
    { id: 1, name: 'Dr. A. K. Sharma', email: 'asharma@gbu.ac.in', role: 'Senior Warden', status: 'active' },
    { id: 2, name: 'Rajesh Kumar', email: 'rajesh.it@gbu.ac.in', role: 'IT Support', status: 'active' },
    { id: 3, name: 'External Auditor', email: 'auditor@external.gov', role: 'Guest', status: 'guest' },
  ]);

  const filteredTickets = tickets.filter(
    (t) =>
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans antialiased w-full">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 h-14 flex items-center justify-between px-3 sticky top-0 z-30 w-full">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-1.5 text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <span className="font-bold text-base tracking-tight text-slate-900">
            GBU <span className="text-[#387ed1] font-normal">Console</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Hi, {currentUser?.name || 'Admin'}
          </span>
          <div className="w-7 h-7 rounded-full bg-slate-100 text-[#387ed1] flex items-center justify-center font-bold text-xs border border-slate-200">
            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative overflow-hidden w-full">
        {/* Mobile Overlay Drawer */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 z-40 md:hidden"
          />
        )}

        {/* Off-Canvas Sidebar */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-50 bg-white border-r border-slate-200 w-64 transition-transform duration-200 ease-in-out flex flex-col justify-between ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="py-2">
            <NavItem
              label="Tickets Queue"
              active={activeTab === 'tickets'}
              onClick={() => {
                setActiveTab('tickets');
                setIsSidebarOpen(false);
              }}
            />
            <NavItem
              label="User Directory"
              active={activeTab === 'users'}
              onClick={() => {
                setActiveTab('users');
                setIsSidebarOpen(false);
              }}
            />
            <NavItem
              label="Reports & Metrics"
              active={activeTab === 'reports'}
              onClick={() => {
                setActiveTab('reports');
                setIsSidebarOpen(false);
              }}
            />
          </div>

          <div className="p-3 border-t border-slate-100 text-[11px] text-slate-400">
            GBU Grievance System
          </div>
        </aside>

        {/* Flush Edge-to-Edge Workspace (Zero padding, zero floating boxes) */}
        <main className="flex-1 overflow-y-auto bg-white p-0 md:p-4 w-full">
          {activeTab === 'tickets' && (
            <div className="w-full">
              {/* Header Title & Search Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 p-3 sm:px-0">
                <div>
                  <h1 className="text-base font-semibold text-slate-900">Grievance Complaints Desk</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Review student complaints and update resolution status.</p>
                </div>

                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search ID, location, subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:border-[#387ed1]"
                  />
                  <svg className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Borderless Flush Table */}
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left text-xs border-collapse min-w-[550px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-medium text-[11px] bg-slate-50/50">
                      <th className="py-2.5 px-3">Ticket ID</th>
                      <th className="py-2.5 px-3">Subject & Location</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredTickets.length > 0 ? (
                      filteredTickets.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 px-3 font-medium text-[#387ed1]">{t.id}</td>
                          <td className="py-3 px-3">
                            <p className="font-medium text-slate-900">{t.subject}</p>
                            <p className="text-[11px] text-slate-400">{t.location}</p>
                          </td>
                          <td className="py-3 px-3 text-slate-500">{t.category || 'General'}</td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                                t.status === 'Resolved'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : t.status === 'Reopened'
                                  ? 'bg-rose-50 text-rose-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}
                            >
                              {t.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            {t.status !== 'Resolved' ? (
                              <button
                                onClick={() => onResolveClick(t)}
                                className="bg-[#387ed1] hover:bg-[#2b6cb0] text-white px-2.5 py-1 rounded text-xs font-medium transition-colors"
                              >
                                Resolve
                              </button>
                            ) : (
                              <span className="text-emerald-600 text-[11px] font-medium">Closed</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-slate-400">
                          No matching grievances found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <UserManagement usersList={usersList} setUsersList={setUsersList} />
          )}

          {activeTab === 'reports' && (
            <div className="p-3 sm:p-0 space-y-4 w-full">
              <h1 className="text-base font-semibold text-slate-900 border-b border-slate-100 pb-2">System Metrics</h1>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="border border-slate-200 p-3 rounded">
                  <span className="text-slate-400">Total System Complaints</span>
                  <p className="text-xl font-bold text-slate-900 mt-1">{tickets.length}</p>
                </div>
                <div className="border border-slate-200 p-3 rounded">
                  <span className="text-slate-400">SLA Performance</span>
                  <p className="text-xl font-bold text-emerald-600 mt-1">94.2%</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function NavItem({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors border-l-2 ${
        active
          ? 'border-[#387ed1] text-[#387ed1] bg-slate-50/80 font-semibold'
          : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
      }`}
    >
      {label}
    </button>
  );
}