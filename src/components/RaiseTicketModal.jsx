import React, { useState } from 'react';

export default function RaiseTicketModal({ isOpen, onClose, onSubmit }) {
  const [attachedFile, setAttachedFile] = useState(null);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ subject, description, location, fileName: attachedFile ? attachedFile.name : null });
    setAttachedFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Lodge New Grievance</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Issue Subject</label>
            <input 
              type="text" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
              placeholder="e.g., Leaking water tap in room" 
              className="w-full p-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600" 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Location / Hostel Block</label>
            <input 
              type="text" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              placeholder="e.g., Hostel 4, Room 204" 
              className="w-full p-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600" 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Describe the problem in detail..." 
              className="w-full p-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 h-24 resize-none" 
              required 
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Attach Photo / Proof (Optional)</label>
            <div className="border-2 border-dashed border-blue-200 rounded-xl p-4 text-center bg-blue-50/30 hover:bg-blue-50/60 transition-colors">
              <input 
                type="file" 
                id="proofUpload" 
                className="hidden" 
                accept="image/*,.pdf" 
                onChange={handleFileChange} 
              />
              <label htmlFor="proofUpload" className="cursor-pointer text-blue-700 font-medium text-sm block">
                {attachedFile ? (
                  <span className="text-emerald-700 font-semibold">📎 Attached: {attachedFile.name}</span>
                ) : (
                  <span>📁 Click to Browse & Upload Photo / PDF Proof</span>
                )}
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}