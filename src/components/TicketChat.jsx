import React, { useState } from 'react';

export default function TicketChat({ ticketId, currentUser }) {
  const [messages, setMessages] = useState([
    { sender: 'System', text: 'Ticket initialized and assigned to support.', time: '10:00 AM' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMessages([...messages, {
      sender: currentUser?.name || 'User',
      text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInputMsg('');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-80">
      <div className="p-3 border-b bg-slate-50 rounded-t-xl flex justify-between items-center">
        <span className="font-bold text-slate-700 text-sm">💬 Resolution & Support Discussion</span>
        <span className="text-xs text-slate-400">Ticket #{ticketId}</span>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex flex-col ${m.sender === (currentUser?.name || 'User') ? 'items-end' : 'items-start'}`}>
            <span className="text-[10px] text-slate-400 mb-0.5">{m.sender} • {m.time}</span>
            <div className={`p-2.5 rounded-lg text-sm max-w-xs ${m.sender === (currentUser?.name || 'User') ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-800'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="p-3 border-t flex gap-2">
        <input 
          type="text" 
          placeholder="Type your message or clarification..." 
          value={inputMsg} 
          onChange={(e) => setInputMsg(e.target.value)} 
          className="flex-1 border p-2 rounded-lg text-sm outline-none focus:border-purple-600"
        />
        <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-800">
          Send
        </button>
      </form>
    </div>
  );
}