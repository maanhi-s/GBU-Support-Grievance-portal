// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#1B2A4A] text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img src="/src/assets/gbu-logo.png" alt="GBU" className="h-12 mb-4 bg-white p-1 rounded" />
          <p className="text-sm text-gray-300">
            Gautam Buddha University Grievance Redressal Portal. Upholding excellence in campus welfare.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-[#D4AF37] mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="hover:text-white cursor-pointer transition">Home</li>
            <li className="hover:text-white cursor-pointer transition">Academic Guidelines</li>
            <li className="hover:text-white cursor-pointer transition">Hostel Policies</li>
            <li className="hover:text-white cursor-pointer transition">Support Helpdesk</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-[#D4AF37] mb-4">Contact</h3>
          <p className="text-sm text-gray-300">
            📍 Gautam Buddha University, Greater Noida, UP 201312<br /><br />
            📧 support@gbu.ac.in<br />
            📞 +91 120 234 4200
          </p>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-8 border-t border-gray-600 pt-4">
        Copyright © Gautam Buddha University. All rights reserved.
      </div>
    </footer>
  );
}