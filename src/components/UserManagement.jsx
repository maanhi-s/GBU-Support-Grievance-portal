import React, { useState } from 'react';

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState('active');
  const [users, setUsers] = useState([
    { id: 1, name: 'Dr. R. K. Sharma', email: 'rksharma@gbu.ac.in', role: 'Head Warden', status: 'Active' },
    { id: 2, name: 'Prof. Anjali Singh', email: 'asingh@gbu.ac.in', role: 'IT Admin', status: 'Active' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Warden');
  const [newPassword, setNewPassword] = useState('');

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newName || !newEmail || !newPassword) return;
    const userObj = {
      id: Date.now(),
      name: newName,
      email: newEmail,
      role: newRole,
      status: 'Active'
    };
    setUsers([...users, userObj]);
    setNewName('');
    setNewEmail('');
    setNewPassword('');
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">User Management Console</h1>
          <p className="text-sm text-slate-500">Manage system administrators, wardens, and staff access roles.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg font-medium shadow transition-all hover:scale-105"
        >
          + Add New Member
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 space-x-6">
        <button 
          onClick={() => setActiveTab('active')}
          className={`pb-3 font-semibold text-sm border-b-2 transition-colors ${activeTab === 'active' ? 'border-purple-700 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Active Users ({users.length})
        </button>
        <button 
          onClick={() => setActiveTab('guest')}
          className={`pb-3 font-semibold text-sm border-b-2 transition-colors ${activeTab === 'guest' ? 'border-purple-700 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Guest Users (0)
        </button>
        <button 
          onClick={() => setActiveTab('deleted')}
          className={`pb-3 font-semibold text-sm border-b-2 transition-colors ${activeTab === 'deleted' ? 'border-purple-700 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Deleted Users
        </button>
      </div>

      {/* Add User Panel/Modal */}
      {showAddModal && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100 mb-6 transition-all">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Add New Admin / Staff Member</h3>
          <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Display Name</label>
              <input 
                type="text" 
                placeholder="Dr. A. Kumar" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)} 
                className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none" 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email ID / Username</label>
              <input 
                type="email" 
                placeholder="kumar@gbu.ac.in" 
                value={newEmail} 
                onChange={(e) => setNewEmail(e.target.value)} 
                className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none" 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Assign Role</label>
              <select 
                value={newRole} 
                onChange={(e) => setNewRole(e.target.value)} 
                className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="Warden">Hostel Warden</option>
                <option value="Head Warden">Head Warden</option>
                <option value="IT Admin">IT Support Admin</option>
                <option value="Estate Officer">Estate Officer</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Temporary Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none" 
                required 
              />
            </div>
            <div className="md:col-span-2 flex justify-end space-x-3 mt-2">
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border rounded-lg text-sm text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-sm font-medium shadow"
              >
                Save Member
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-600 text-xs uppercase font-semibold">
              <th className="p-4">Display Name</th>
              <th className="p-4">Email ID</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-800">{u.name}</td>
                <td className="p-4 text-slate-600">{u.email}</td>
                <td className="p-4"><span className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-md text-xs font-semibold">{u.role}</span></td>
                <td className="p-4"><span className="text-emerald-600 font-medium flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>{u.status}</span></td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(u.id)} className="text-red-500 hover:text-red-700 font-medium text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}