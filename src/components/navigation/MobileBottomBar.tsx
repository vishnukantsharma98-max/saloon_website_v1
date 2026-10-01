/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Home, Sparkles, Phone } from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const { activePage, setActivePage } = useBooking();

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] px-6 py-2 flex items-center justify-around select-none"
    >
      {/* 1. Home */}
      <button
        type="button"
        onClick={() => {
          setActivePage('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all cursor-pointer ${
          activePage === 'home'
            ? 'text-[#D61C4E] font-bold'
            : 'text-stone-400 hover:text-stone-700'
        }`}
      >
        <Home className={`w-5 h-5 mb-0.5 ${activePage === 'home' ? 'stroke-[2.5]' : 'stroke-1.5'}`} />
        <span className="text-[11px] tracking-tight">Home</span>
      </button>

      {/* 2. Services */}
      <button
        type="button"
        onClick={() => {
          setActivePage('services');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all cursor-pointer ${
          activePage === 'services'
            ? 'text-[#D61C4E] font-bold'
            : 'text-stone-400 hover:text-stone-700'
        }`}
      >
        <Sparkles className={`w-5 h-5 mb-0.5 ${activePage === 'services' ? 'stroke-[2.5]' : 'stroke-1.5'}`} />
        <span className="text-[11px] tracking-tight">Services</span>
      </button>

      {/* 3. Contact Us */}
      <button
        type="button"
        onClick={() => {
          setActivePage('contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all cursor-pointer ${
          activePage === 'contact'
            ? 'text-[#D61C4E] font-bold'
            : 'text-stone-400 hover:text-stone-700'
        }`}
      >
        <Phone className={`w-5 h-5 mb-0.5 ${activePage === 'contact' ? 'stroke-[2.5]' : 'stroke-1.5'}`} />
        <span className="text-[11px] tracking-tight">Contact Us</span>
      </button>
    </nav>
  );
};
