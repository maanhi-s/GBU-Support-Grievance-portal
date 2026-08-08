import React, { useState } from 'react';

export default function UserManagement({ usersList, setUsersList }) {
  const [userSubTab, setUserSubTab] = useState('active');
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'Hostel Warden',
    password: ''
  });

  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email) return;

    const createdUser = {
      id: Date.now(),
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      status: 'active'
    };

    setUsersList([...usersList, createdUser]);
    setNewMember({ name: '', email: '', role: 'Hostel Warden', password: '' });
    setIsAddMemberOpen(false);
  };

  const filteredUsers = usersList.filter((u) => u.status === userSubTab);

  return (
    <div className="w-full space-y-0">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 p-3 sm:px-0">
        <div>
          <h1 className="text-base font-semibold text-slate-900">User Management Console</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage wardens, superintendents, and staff roles.</p>
        </div>

        <button
          onClick={() => setIsAddMemberOpen(true)}
          className="bg-[#387ed1] hover:bg-[#2c65a8] text-white px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New Member
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-medium text-slate-500 px-3 sm:px-0 gap-6 pt-2">
        <button
          onClick={() => setUserSubTab('active')}
          className={`pb-2 transition-colors border-b-2 ${
            userSubTab === 'active'
              ? 'border-[#387ed1] text-[#387ed1] font-semibold'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          Active ({usersList.filter((u) => u.status === 'active').length})
        </button>
        <button
          onClick={() => setUserSubTab('guest')}
          className={`pb-2 transition-colors border-b-2 ${
            userSubTab === 'guest'
              ? 'border-[#387ed1] text-[#387ed1] font-semibold'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          Guests ({usersList.filter((u) => u.status === 'guest').length})
        </button>
        <button
          onClick={() => setUserSubTab('deleted')}
          className={`pb-2 transition-colors border-b-2 ${
            userSubTab === 'deleted'
              ? 'border-[#387ed1] text-[#387ed1] font-semibold'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          Deleted ({usersList.filter((u) => u.status === 'deleted').length})
        </button>
      </div>

      {/* Flush Users Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-xs border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-medium text-[11px] bg-slate-50/50">
              <th className="py-2.5 px-3">Display Name</th>
              <th className="py-2.5 px-3">Email ID</th>
              <th className="py-2.5 px-3">Assigned Role</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-3 font-medium text-slate-900">{u.name}</td>
                  <td className="py-3 px-3 text-slate-500">{u.email}</td>
                  <td className="py-3 px-3">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium border border-slate-200">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setUsersList(usersList.filter((usr) => usr.id !== u.id))}
                      className="text-rose-600 hover:text-rose-800 text-xs font-medium"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-8 text-center text-slate-400">
                  No {userSubTab} staff records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Member Modal Drawer */}
      {isAddMemberOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="bg-white border border-slate-200 rounded-lg shadow-lg w-full max-w-md overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-semibold text-slate-900 text-xs">Add New Staff / Warden Member</h3>
              <button onClick={() => setIsAddMemberOpen(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMemberSubmit} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Display Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:border-[#387ed1]"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Email ID</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rsharma@gbu.ac.in"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:border-[#387ed1]"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Assigned Role</label>
                <select
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:border-[#387ed1] bg-white"
                >
                  <option value="Hostel Warden">Hostel Warden</option>
                  <option value="Senior Warden">Senior Warden</option>
                  <option value="IT Support Lead">IT Support Lead</option>
                  <option value="Estate Enquiry Office">Estate Enquiry Office</option>
                  <option value="Superintendent Office">Superintendent Office</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Temporary Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={newMember.password}
                  onChange={(e) => setNewMember({ ...newMember, password: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:border-[#387ed1]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddMemberOpen(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#387ed1] hover:bg-[#2b6cb0] text-white rounded transition-colors font-medium"
                >
                  Create Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}