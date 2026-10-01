/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { businessConfig } from '../../data/business';
import { useBooking } from '../../context/BookingContext';
import { Phone, MessageCircle, ArrowUp, Instagram, Facebook, MapPin, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { brandMark, contact, location } = businessConfig;
  const { setActivePage } = useBooking();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF8F5] text-stone-900 border-t border-stone-200 pt-14 pb-24 sm:pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-200">
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="https://i.postimg.cc/0jSmd76C/34567890.png"
                alt="PERFECT SHINE UNISEX SALON"
                className="h-16 sm:h-20 w-auto object-contain drop-shadow-xs"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-serif text-lg font-black tracking-wide text-stone-900 block leading-tight">
                  PERFECT SHINE
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D61C4E]">
                  UNISEX SALON
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed max-w-sm">
              Your Beauty. Your Style. Your Confidence. Ajmer’s trusted unisex destination for precision haircutting, hair rebonding, keratin smoothing, and bridal aesthetics.
            </p>

            <div className="pt-1 flex items-center gap-3">
              <a
                href={businessConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:border-[#D61C4E] flex items-center justify-center text-stone-700 hover:text-[#D61C4E] transition-all shadow-xs"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={businessConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:border-[#D61C4E] flex items-center justify-center text-stone-700 hover:text-[#D61C4E] transition-all shadow-xs"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-stone-900">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActivePage('home');
                    scrollToTop();
                  }}
                  className="hover:text-[#D61C4E] transition-colors cursor-pointer"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActivePage('services');
                    scrollToTop();
                  }}
                  className="hover:text-[#D61C4E] transition-colors cursor-pointer"
                >
                  Services Catalogue
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActivePage('contact');
                    scrollToTop();
                  }}
                  className="hover:text-[#D61C4E] transition-colors cursor-pointer"
                >
                  Contact & Directions
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="space-y-3 text-xs text-stone-600">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-stone-900">
              Location & Hours
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#D61C4E] shrink-0 mt-0.5" />
              <p>
                {location.addressLine1}, {location.addressLine2}, {location.city}
              </p>
            </div>
            <div className="flex items-start gap-2 pt-1">
              <Clock className="w-4 h-4 text-[#D61C4E] shrink-0 mt-0.5" />
              <div>
                <p>Monday – Sunday: <strong>10:00 AM – 9:00 PM</strong></p>
                <p className="text-emerald-700 font-semibold">Open All 7 Days</p>
              </div>
            </div>
          </div>

          {/* Direct Concierge */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-stone-900">
              Direct Concierge
            </h4>
            <div className="space-y-2">
              <a
                href={`tel:${contact.phoneE164}`}
                className="flex items-center gap-1.5 font-bold text-stone-900 hover:text-[#D61C4E]"
              >
                <Phone className="w-3.5 h-3.5 text-[#D61C4E]" />
                <span>+91 94614 74764</span>
              </a>

              <a
                href={`https://wa.me/${contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-semibold text-emerald-700 hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366]" />
                <span>WhatsApp: 9461474764</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} PERFECT SHINE UNISEX SALON. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-stone-900 transition-colors cursor-pointer text-stone-600 font-semibold"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
