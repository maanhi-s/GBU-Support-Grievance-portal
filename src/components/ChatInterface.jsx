// src/components/ChatInterface.jsx
import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle, Paperclip } from 'lucide-react';

export default function ChatInterface({ ticket, onBack, onResolve }) {
  const [messages, setMessages] = useState([
    { sender: 'user', text: ticket.description, isInitialQuery: true }
  ]);
  const [inputText, setInputText] = useState('');
  const [showResolveModal, setShowResolveModal] = useState(false);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    setMessages([...messages, { sender: 'admin', text: inputText }]);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Header */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="font-bold text-[#1B2A4A]">{ticket.studentName} <span className="text-sm font-normal text-gray-500">({ticket.id})</span></h2>
            <p className="text-xs text-gray-500">Category: {ticket.category}</p>
          </div>
        </div>
        <button 
          onClick={() => setShowResolveModal(true)} 
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
        >
          <CheckCircle size={18} /> Mark Resolved
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xl p-4 rounded-xl shadow-sm ${msg.sender === 'admin' ? 'bg-[#1B2A4A] text-white rounded-br-none' : 'bg-white border text-gray-800 rounded-bl-none'}`}>
              {msg.isInitialQuery && <div className="text-xs text-gray-500 mb-2 font-bold uppercase">Original Query</div>}
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="bg-white p-4 border-t flex gap-2">
        <button className="p-3 text-gray-500 hover:bg-gray-100 rounded-full transition">
          <Paperclip size={20} />
        </button>
        <input 
          type="text" 
          className="flex-1 border rounded-full px-4 focus:outline-none focus:border-[#D4AF37]" 
          placeholder="Type your message to the student..." 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="p-3 bg-[#D4AF37] text-white rounded-full hover:bg-opacity-90 transition">
          <Send size={20} />
        </button>
      </div>

      {/* Mandatory Resolution Proof Modal */}
      {showResolveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[500px]">
            <h2 className="text-xl font-bold mb-4 text-[#1B2A4A]">Resolve Ticket</h2>
            <p className="text-sm text-gray-600 mb-4">To close this ticket, you must provide a description of the solution and upload proof of work.</p>
            
            <label className="block text-sm font-bold mb-1">Resolution Description *</label>
            <textarea className="w-full border rounded-lg p-3 mb-4 h-24" placeholder="How was this fixed?"></textarea>
            
            <label className="block text-sm font-bold mb-1">Upload Proof (Photo/Doc) *</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-6 cursor-pointer hover:bg-gray-50">
              <span className="text-gray-500">Click to upload resolution proof</span>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowResolveModal(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded">Cancel</button>
              <button onClick={() => { onResolve(ticket.id); setShowResolveModal(false); }} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Submit & Close Ticket</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}