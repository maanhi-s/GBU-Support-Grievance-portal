
import React from 'react';

const Footer = () => {
  return (
    // Flushed edge-to-edge with no borders or shadows
    <footer className="w-full bg-[#1B2A4A] text-white">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src="/gbu-logo.png" alt="GBU Logo" className="h-12 w-auto bg-white rounded-full p-1" />
          </div>
          <p className="text-sm text-gray-300 leading-relaxed pr-4">
            Gautam Buddha University Grievance Redressal Portal. <br />
            Upholding excellence in campus welfare.
          </p>
        </div>

        {/* Middle Column: Links */}
        <div>
          <h4 className="text-[#D4AF37] font-semibold mb-4 text-lg">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Academic Guidelines</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Hostel Policies</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Support Helpdesk</a></li>
          </ul>
        </div>

        {/* Right Column: Contact */}
        <div>
          <h4 className="text-[#D4AF37] font-semibold mb-4 text-lg">Contact</h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span>📍</span>
              <span>Gautam Buddha University, Greater Noida, UP 201312</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span>
              <span>support@gbu.ac.in</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span>
              <span>+91 120 234 4200</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Bar - Slightly darker background for flat contrast */}
      <div className="bg-[#111c33] py-4 text-center text-xs text-gray-400">
        Copyright © Gautam Buddha University. All rights reserved.
      </div>
      
    </footer>
  );
};

export default Footer;