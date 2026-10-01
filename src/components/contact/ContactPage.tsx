/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { businessConfig } from '../../data/business';
import { MapPin, Phone, MessageCircle, Clock, CheckCircle, Calendar } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { setActivePage } = useBooking();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Haircut & Styling');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const text = `Hello Luméa Salon! My name is ${name}. I am inquiring about ${service}.${phone ? ` Phone: ${phone}.` : ''}${message ? ` Message: ${message}` : ''}`;
    const url = `https://wa.me/${businessConfig.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="py-8 sm:py-14 px-4 sm:px-8 max-w-7xl mx-auto space-y-10 pb-24">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
          Contact Us
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Lavelle Road District, Bengaluru · Mon Closed
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* Address */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">Atelier Studio</h3>
                <span className="text-xs text-stone-400">Lavelle Road, Bengaluru</span>
              </div>
            </div>
            <p className="text-xs text-stone-600 pl-13 leading-relaxed">
              {businessConfig.location.addressLine1}, {businessConfig.location.addressLine2}, {businessConfig.location.city} - {businessConfig.location.postalCode}
            </p>
            <div className="pl-13 pt-1">
              <a
                href={businessConfig.location.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#D61C4E] hover:underline inline-flex items-center gap-1"
              >
                <span>Google Maps Directions →</span>
              </a>
            </div>
          </div>

          {/* Telephone & WhatsApp */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">Direct Phone</h3>
                <span className="text-xs text-stone-400">+91 94614 74764</span>
              </div>
            </div>

            <div className="pl-13 space-y-2">
              <a
                href={`tel:${businessConfig.contact.phoneE164}`}
                className="block text-sm font-bold text-stone-900 hover:text-[#D61C4E] transition-colors"
              >
                +91 94614 74764
              </a>

              <a
                href={`https://wa.me/${businessConfig.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">Studio Hours</h3>
                <span className="text-xs text-stone-400">Tue – Sun</span>
              </div>
            </div>
            <div className="pl-13 text-xs text-stone-600 space-y-1">
              <p>Tuesday – Saturday: <strong>10:00 AM – 8:00 PM</strong></p>
              <p>Sunday: <strong>11:00 AM – 6:00 PM</strong></p>
              <p className="text-stone-400">Monday: Closed</p>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Message Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] border border-stone-200 space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Send a Message
              </h2>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-white border border-emerald-200 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Message Sent
                </h3>
                <p className="text-xs text-stone-600">
                  Thank you, {name}! We will reply to your WhatsApp chat shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-[#D61C4E] font-bold underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-bold text-stone-700 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:border-[#D61C4E] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-bold text-stone-700 block mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:border-[#D61C4E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-bold text-stone-700 block mb-1">
                      Service
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:border-[#D61C4E] focus:outline-none cursor-pointer"
                    >
                      <option value="Haircut & Styling">Haircut & Styling</option>
                      <option value="Hair Colour & Balayage">Hair Colour & Balayage</option>
                      <option value="Facial & Skin Care">Facial & Skin Care</option>
                      <option value="Manicure & Pedicure">Manicure & Pedicure</option>
                      <option value="Beard Grooming & Shave">Beard Grooming & Shave</option>
                      <option value="Threading & Waxing">Threading & Waxing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider font-bold text-stone-700 block mb-1">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Your message or questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:border-[#D61C4E] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Send on WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActivePage('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="py-3 px-6 rounded-full bg-[#D61C4E] hover:bg-[#c21443] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
