import React, { useState } from 'react';
import { Shield, Mail, CheckCircle2 } from 'lucide-react';

export default function GrievanceModal({ isOpen, onClose, onAddTicket }) {
  const [submissionStep, setSubmissionStep] = useState(1);
  const [otpInput, setOtpInput] = useState('');
  const [lastSubmittedId, setLastSubmittedId] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    domain: 'HOSTEL',
    hostelBlock: 'Sant Kabir Hostel (Boys)',
    department: 'School of ICT',
    roomNumber: '',
    title: '',
    description: '',
    isAnonymous: false
  });

  if (!isOpen) return null;

  // Domain Validation for University Email
  const handleInitiateVerification = (e) => {
    e.preventDefault();
    if (!formData.email.endsWith('@gbu.ac.in')) {
      alert("❌ Email Validation Failed: Please use your official GBU email ending with @gbu.ac.in!");
      return;
    }
    alert(`📧 [MANDATORY EMAIL SENT]: Verification OTP sent to ${formData.email}`);
    setSubmissionStep(2);
  };

  const handleVerifyAndSubmit = (e) => {
    e.preventDefault();
    if (otpInput.length < 4) {
      alert("Please enter a valid OTP code (e.g., 123456).");
      return;
    }

    const generatedId = `GBU-${formData.domain === 'HOSTEL' ? 'H4' : 'DEPT'}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newTicket = {
      id: generatedId,
      email: formData.email,
      domain: formData.domain,
      title: formData.title,
      description: formData.description,
      hostelBlock: formData.hostelBlock,
      department: formData.department,
      roomNumber: formData.roomNumber,
      isAnonymous: formData.isAnonymous,
      status: 'Pending',
      createdAt: new Date().toLocaleString()
    };

    onAddTicket(newTicket);
    setLastSubmittedId(generatedId);
    alert(`📧 [MANDATORY EMAIL SENT]: Confirmation email sent to ${formData.email} with Ticket ID: ${generatedId}`);
    setSubmissionStep(3);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100">
        <div className="bg-[#1B2A4A] text-white p-4 flex justify-between items-center border-b-4 border-[#D4AF37]">
          <h3 className="font-bold text-sm">
            {submissionStep === 1 && "Lodge Student Grievance"}
            {submissionStep === 2 && "2-Step Email Verification"}
            {submissionStep === 3 && "Grievance Logged Successfully"}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl">&times;</button>
        </div>

        {submissionStep === 1 && (
          <form onSubmit={handleInitiateVerification} className="p-5 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Student GBU Email Address</label>
              <input 
                type="email" 
                required
                placeholder="student@gbu.ac.in"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({...formData, domain: 'HOSTEL'})}
                className={`p-2 rounded-lg border text-xs font-bold transition ${
                  formData.domain === 'HOSTEL' ? 'bg-[#1B2A4A] text-white' : 'bg-slate-50 text-slate-600'
                }`}
              >
                Hostel Grievance
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, domain: 'COLLEGE'})}
                className={`p-2 rounded-lg border text-xs font-bold transition ${
                  formData.domain === 'COLLEGE' ? 'bg-[#1B2A4A] text-white' : 'bg-slate-50 text-slate-600'
                }`}
              >
                College Grievance
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Room / Lab / Classroom Number</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Room 204 or Lab 3"
                value={formData.roomNumber}
                onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                className="w-full border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Issue Title</label>
              <input 
                type="text" 
                required
                placeholder="Brief summary..."
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Description</label>
              <textarea 
                rows="3" 
                required
                placeholder="Explain the problem clearly..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
              ></textarea>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-lg border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="text-[#D4AF37]" size={16} />
                <span className="text-xs font-semibold text-slate-700">Keep Identity Confidential</span>
              </div>
              <input 
                type="checkbox" 
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({...formData, isAnonymous: e.target.checked})}
                className="h-4 w-4 text-[#D4AF37]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button type="button" onClick={onClose} className="px-3 py-1.5 border rounded-lg text-xs font-medium">Cancel</button>
              <button type="submit" className="px-4 py-1.5 bg-[#D4AF37] hover:bg-[#E6A100] text-[#1B2A4A] font-bold rounded-lg text-xs shadow">
                Verify Email & Continue
              </button>
            </div>
          </form>
        )}

        {submissionStep === 2 && (
          <form onSubmit={handleVerifyAndSubmit} className="p-6 space-y-4 text-center">
            <Mail className="mx-auto text-[#D4AF37]" size={36} />
            <div>
              <h4 className="font-bold text-sm text-[#1B2A4A]">Enter OTP Code</h4>
              <p className="text-xs text-slate-500 mt-1">
                Enter the OTP code dispatched to <span className="font-semibold text-slate-800">{formData.email}</span>.
              </p>
            </div>

            <input 
              type="text" 
              maxLength={6}
              required
              placeholder="123456"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              className="w-48 mx-auto text-center border-2 border-[#D4AF37] rounded-lg p-2 text-lg tracking-widest font-bold focus:outline-none"
            />

            <div className="flex justify-center gap-2 pt-2">
              <button type="button" onClick={() => setSubmissionStep(1)} className="px-3 py-1.5 border rounded-lg text-xs font-medium">Back</button>
              <button type="submit" className="px-5 py-1.5 bg-[#1B2A4A] text-white font-bold rounded-lg text-xs shadow">
                Verify & Submit
              </button>
            </div>
          </form>
        )}

        {submissionStep === 3 && (
          <div className="p-6 text-center space-y-4">
            <CheckCircle2 className="mx-auto text-emerald-600" size={48} />
            <div>
              <h4 className="font-bold text-base text-[#1B2A4A]">Grievance Logged Successfully</h4>
              <p className="text-xs text-slate-500 mt-1">Your Auto-Generated Unique Ticket ID is:</p>
              <div className="bg-slate-100 border border-slate-300 rounded-lg p-2.5 mt-2 font-mono font-bold text-sm text-[#1B2A4A]">
                {lastSubmittedId}
              </div>
            </div>
            <button onClick={onClose} className="w-full bg-[#D4AF37] hover:bg-[#E6A100] text-[#1B2A4A] font-bold py-2 rounded-lg text-xs shadow">
              Back to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}