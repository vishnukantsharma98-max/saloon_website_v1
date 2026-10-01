/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { businessConfig } from '../../data/business';
import { Phone, Calendar, Instagram, Facebook } from 'lucide-react';

export const TopNavigationHeader: React.FC = () => {
  const { activePage, setActivePage } = useBooking();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo - Clicking Logo opens Home */}
        <button
          type="button"
          onClick={() => {
            setActivePage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-bold text-stone-900 group-hover:text-[#D61C4E] transition-colors">
            {businessConfig.brandMark}
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            type="button"
            onClick={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`text-sm font-semibold tracking-wide transition-colors cursor-pointer ${
              activePage === 'home'
                ? 'text-[#D61C4E] font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => {
              setActivePage('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`text-sm font-semibold tracking-wide transition-colors cursor-pointer ${
              activePage === 'services'
                ? 'text-[#D61C4E] font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Services
          </button>

          <button
            type="button"
            onClick={() => {
              setActivePage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`text-sm font-semibold tracking-wide transition-colors cursor-pointer ${
              activePage === 'contact'
                ? 'text-[#D61C4E] font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Contact Us
          </button>
        </nav>

        {/* Right CTA + Socials */}
        <div className="flex items-center gap-2.5">
          <a
            href={businessConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-stone-200 text-stone-600 hover:text-[#D61C4E] hover:border-[#D61C4E] flex items-center justify-center transition-colors cursor-pointer"
            title="Instagram"
            aria-label="Instagram"
          >
            <Instagram className="w-3.5 h-3.5" />
          </a>

          <a
            href={businessConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-stone-200 text-stone-600 hover:text-[#D61C4E] hover:border-[#D61C4E] flex items-center justify-center transition-colors cursor-pointer"
            title="Facebook"
            aria-label="Facebook"
          >
            <Facebook className="w-3.5 h-3.5" />
          </a>

          <a
            href="tel:+919461474764"
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 px-3 py-2 rounded-full border border-stone-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#D61C4E]" />
            <span>94614 74764</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setActivePage('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D61C4E] hover:bg-[#c21443] active:scale-[0.98] text-white shadow-xs transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Now</span>
          </button>
        </div>
      </div>
    </header>
  );
};
