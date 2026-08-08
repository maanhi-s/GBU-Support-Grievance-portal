import React, { useState } from 'react';

export default function AdminConsole({ tickets = [], onResolveClick, currentUser }) {
  const [activeTab, setActiveTab] = useState('tickets');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile drawer toggle
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Desktop collapse toggle
  const [searchQuery, setSearchQuery] = useState('');
  const [userSubTab, setUserSubTab] = useState('active');

  // Filtered tickets based on search query
  const filteredTickets = tickets.filter(
    (t) =>
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger & Desktop Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 rounded-md hover:bg-slate-100 text-slate-600 focus:outline-none"
            aria-label="Toggle Navigation Drawer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden md:flex p-2 rounded-md hover:bg-slate-100 text-slate-600 focus:outline-none"
            title="Toggle Sidebar Rail"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h12M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-tight text-slate-900">
              GBU <span className="text-[#387ed1]">Admin Console</span>
            </span>
          </div>
        </div>

        {/* User Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-slate-900">{currentUser?.name || 'Admin Officer'}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">{currentUser?.role || 'SYSTEM ADMIN'}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#387ed1] text-white flex items-center justify-center font-bold text-sm shadow-sm">
            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative overflow-hidden">
        {/* Mobile Backdrop Overlay */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          />
        )}

        {/* Collapsible Drawer Sidebar */}
        <aside
          className={`
            fixed md:static inset-y-0 left-0 z-50 bg-white border-r border-slate-200 
            transition-all duration-300 ease-in-out flex flex-col justify-between
            ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'}
            ${isSidebarCollapsed ? 'md:w-16' : 'md:w-64'}
          `}
        >
          <div className="p-3 space-y-1">
            {/* Navigation Options */}
            <SidebarItem
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              }
              label="Tickets Queue"
              active={activeTab === 'tickets'}
              collapsed={isSidebarCollapsed}
              onClick={() => {
                setActiveTab('tickets');
                setIsSidebarOpen(false);
              }}
            />

            <SidebarItem
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              }
              label="User Directory"
              active={activeTab === 'users'}
              collapsed={isSidebarCollapsed}
              onClick={() => {
                setActiveTab('users');
                setIsSidebarOpen(false);
              }}
            />

            <SidebarItem
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              label="Analytics & SLAs"
              active={activeTab === 'reports'}
              collapsed={isSidebarCollapsed}
              onClick={() => {
                setActiveTab('reports');
                setIsSidebarOpen(false);
              }}
            />
          </div>

          <div className="p-3 border-t border-slate-100">
            <div className={`text-xs text-slate-400 text-center ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
              GBU Grievance
            </div>
          </div>
        </aside>

        {/* Main Workspace Canvas */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
          {/* TAB 1: TICKETS MANAGEMENT */}
          {activeTab === 'tickets' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Grievance Complaints Desk</h1>
                  <p className="text-xs text-slate-500 mt-1">Review incoming student reports, update SLA milestones, and upload proof of resolution.</p>
                </div>
                
                {/* Search Box */}
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search ID, location, subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#387ed1] transition-all"
                  />
                  <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Tickets Table Card */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                        <th className="p-3.5">Ticket ID</th>
                        <th className="p-3.5">Subject & Location</th>
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredTickets.length > 0 ? (
                        filteredTickets.map((t) => (
                          <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3.5 font-semibold text-[#387ed1]">{t.id}</td>
                            <td className="p-3.5">
                              <p className="font-medium text-slate-900">{t.subject}</p>
                              <p className="text-[11px] text-slate-400">{t.location}</p>
                            </td>
                            <td className="p-3.5 text-slate-500">{t.category || 'General'}</td>
                            <td className="p-3.5">
                              <span
                                className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                                  t.status === 'Resolved'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : t.status === 'Reopened'
                                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}
                              >
                                {t.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-right">
                              {t.status !== 'Resolved' ? (
                                <button
                                  onClick={() => onResolveClick(t)}
                                  className="bg-[#387ed1] hover:bg-[#2c65a8] text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
                                >
                                  Resolve Issue
                                </button>
                              ) : (
                                <span className="text-emerald-600 text-[11px] font-medium flex items-center justify-end gap-1">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                  </svg>
                                  Closed
                                </span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="p-8 text-center text-slate-400 text-xs">
                            No tickets matched your query.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: USER DIRECTORY MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">User Management Console</h1>
                  <p className="text-xs text-slate-500 mt-1">Manage wardens, hostel superintendents, and maintenance staff permissions.</p>
                </div>

                <div className="flex gap-2">
                  {['active', 'guest', 'deleted'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setUserSubTab(tab)}
                      className={`px-3 py-1.5 rounded text-xs font-medium capitalize transition-all ${
                        userSubTab === tab
                          ? 'bg-[#387ed1] text-white'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {tab} Users
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                <p className="text-xs text-slate-500">
                  Showing <span className="font-semibold text-slate-800 capitalize">{userSubTab}</span> staff accounts.
                </p>
                <div className="mt-4 p-8 border-2 border-dashed border-slate-200 rounded-lg text-center">
                  <p className="text-xs text-slate-400">User directory loaded. Role assignments are linked to GBU RBAC filters.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REPORTS */}
          {activeTab === 'reports' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <h1 className="text-xl font-bold text-slate-900">System Performance Metrics</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm">
                  <p className="text-xs text-slate-400">Average Resolution SLA</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">18.4 Hours</p>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm">
                  <p className="text-xs text-slate-400">Total System Tickets</p>
                  <p className="text-2xl font-bold text-[#387ed1] mt-1">{tickets.length}</p>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm">
                  <p className="text-xs text-slate-400">Resolution Rate</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">94.2%</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Sub-component for clean sidebar link item rendering
function SidebarItem({ icon, label, active, collapsed, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all
        ${
          active
            ? 'bg-[#387ed1]/10 text-[#387ed1] font-semibold'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }
      `}
      title={label}
    >
      <div className="flex-shrink-0">{icon}</div>
      <span className={`truncate ${collapsed ? 'hidden' : 'block'}`}>{label}</span>
    </button>
  );
}