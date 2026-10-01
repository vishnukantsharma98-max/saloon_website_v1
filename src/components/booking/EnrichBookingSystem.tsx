/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { useBooking, ConfirmedBookingInfo } from '../../context/BookingContext';
import { servicesData } from '../../data/services';
import { ASSET_MAP } from '../../data/assets';
import { businessConfig } from '../../data/business';
import { formatDuration } from '../../utils/formatters';
import {
  Search,
  Check,
  Plus,
  X,
  ArrowLeft,
  Calendar,
  MessageCircle,
  Download,
} from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

export const EnrichBookingSystem: React.FC = () => {
  const {
    selectedServices,
    toggleService,
    isServiceSelected,
    removeService,
    totalDuration,
    totalPriceFormatted,
    bookingSubView,
    setBookingSubView,
    activeCategory,
    setActiveCategory,
    activeGender,
    setActiveGender,
    searchQuery,
    setSearchQuery,
    setIsTimeModalOpen,
    confirmedBooking,
    resetBookingFlow,
  } = useBooking();

  // Scroll container refs
  const circularRailRef = useRef<HTMLDivElement>(null);
  const pillsBarRef = useRef<HTMLDivElement>(null);

  // Synchronized category definitions
  const womenCategories = [
    { id: 'haircut', name: 'Hair Cut', image: ASSET_MAP['hair-01'].url },
    { id: 'hair-wash', name: 'Hair Wash', image: ASSET_MAP['interior-01'].url },
    { id: 'colour', name: 'Colour', image: ASSET_MAP['hair-02'].url },
    { id: 'treatments', name: 'Treatments', image: ASSET_MAP['beauty-02'].url },
    { id: 'texture', name: 'Texture', image: ASSET_MAP['hair-03'].url },
    { id: 'kerastase', name: 'Kérastase Rituals', image: ASSET_MAP['interior-02'].url },
    { id: 'styling', name: 'Styling', image: ASSET_MAP['hair-03'].url },
    { id: 'threading', name: 'Threading', image: ASSET_MAP['beauty-01'].url },
    { id: 'manicure', name: 'Manicure', image: ASSET_MAP['nails-01'].url },
  ];

  const menCategories = [
    { id: 'haircut', name: 'Hair Cut', image: ASSET_MAP['hair-01'].url },
    { id: 'beard', name: 'Beard & Shave', image: ASSET_MAP['mens-01'].url },
    { id: 'hair-wash', name: 'Hair Wash', image: ASSET_MAP['interior-01'].url },
    { id: 'colour', name: 'Colour', image: ASSET_MAP['hair-02'].url },
    { id: 'treatments', name: 'Treatments', image: ASSET_MAP['beauty-02'].url },
    { id: 'manicure', name: 'Grooming', image: ASSET_MAP['nails-01'].url },
  ];

  const currentCategories = activeGender === 'men' ? menCategories : womenCategories;

  // Reset scroll to start whenever activeGender changes
  const handleGenderSwitch = (gender: 'women' | 'men') => {
    setActiveGender(gender);
    setActiveCategory('haircut');
    if (circularRailRef.current) {
      circularRailRef.current.scrollTo({ left: 0, behavior: 'instant' });
    }
    if (pillsBarRef.current) {
      pillsBarRef.current.scrollTo({ left: 0, behavior: 'instant' });
    }
  };

  useEffect(() => {
    if (circularRailRef.current) {
      circularRailRef.current.scrollLeft = 0;
    }
    if (pillsBarRef.current) {
      pillsBarRef.current.scrollLeft = 0;
    }
  }, [activeGender]);

  // Scrollspy: update active category dynamically as user scrolls through sections
  useEffect(() => {
    const handleScroll = () => {
      // If at very top, default to haircut
      if (window.scrollY < 120) {
        return;
      }

      const offset = 180;
      for (let i = currentCategories.length - 1; i >= 0; i--) {
        const cat = currentCategories[i];
        const el = document.getElementById(`section-${cat.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            setActiveCategory(cat.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentCategories, setActiveCategory]);

  // Quick add upsell items for "Add to your visit"
  const upsellItems = servicesData.filter((s) => {
    const isGenderMatch = activeGender === 'all' || s.gender === activeGender || s.gender === 'unisex';
    return (
      isGenderMatch &&
      ['srv-classic-manicure', 'srv-threading', 'srv-beard-trim-shave', 'srv-hair-wash', 'srv-botoplex', 'srv-global-colour'].includes(s.id)
    );
  });

  // Always show all current categories so scrolling flows through all of them!
  const displayedCategories = currentCategories;

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (categoryId === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(`section-${categoryId}`);
    if (el) {
      const yOffset = -140;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleOpenWhatsApp = (info: ConfirmedBookingInfo) => {
    const servicesList = info.services
      .map((s, idx) => `  ${idx + 1}. ${s.name}`)
      .join('\n');

    const msg =
      `Hello ${businessConfig.brandMark}!\n\n` +
      `I would like to book an appointment:\n` +
      `Date: ${info.dateLabel}\n` +
      `Time: ${info.timeSlot}\n\n` +
      `Services:\n${servicesList}\n\n` +
      `Client Name: ${info.client.name}\n\n` +
      `Please confirm my appointment slot. Thank you!`;

    const encoded = encodeURIComponent(msg);
    const targetPhone = businessConfig.contact.whatsappNumber;
    window.open(`https://wa.me/${targetPhone}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadCalendar = (info: ConfirmedBookingInfo) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    const endDate = new Date(startDate.getTime() + (info.totalDurationMinutes || 60) * 60000);

    const formatIcs = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '');
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Lumea Salon//Booking//EN',
      'BEGIN:VEVENT',
      `UID:${info.bookingId}@lumeasalon.com`,
      `DTSTAMP:${formatIcs(new Date())}`,
      `DTSTART:${formatIcs(startDate)}`,
      `DTEND:${formatIcs(endDate)}`,
      `SUMMARY:Salon Booking - ${businessConfig.brandMark} (${info.bookingId})`,
      `DESCRIPTION:${info.services.map((s) => s.name).join(', ')}`,
      `LOCATION:${info.outlet.name}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `booking-${info.bookingId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white text-[#18181B] font-sans selection:bg-[#D61C4E]/20 selection:text-[#D61C4E]">
      {/* 1. CONFIRMATION VIEW */}
      {bookingSubView === 'confirmation' && confirmedBooking && (
        <div className="max-w-2xl mx-auto px-4 py-12 animate-in zoom-in-95 duration-200">
          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-xl space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-widest font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Booking Confirmed
              </span>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mt-2">
                Your Appointment is Scheduled
              </h2>
            </div>

            {/* Pass Ticket */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-stone-200 pb-2.5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Salon Atelier</span>
                  <strong className="text-stone-900 font-bold text-sm">{businessConfig.name}</strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 block">Status</span>
                  <strong className="text-emerald-700 font-bold text-xs uppercase tracking-wider">Reserved ✓</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-b border-stone-200 pb-2.5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Date & Time</span>
                  <strong className="text-stone-900">{confirmedBooking.dateLabel} at {confirmedBooking.timeSlot}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Client Name</span>
                  <strong className="text-stone-900">{confirmedBooking.client.name}</strong>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                  Reserved Services ({confirmedBooking.services.length})
                </span>
                <ul className="space-y-1 text-stone-700">
                  {confirmedBooking.services.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 font-medium">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{s.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => handleOpenWhatsApp(confirmedBooking)}
                className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-sm transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Confirm on WhatsApp: 9461474764</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownloadCalendar(confirmedBooking)}
                className="w-full py-3 px-6 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4 text-stone-500" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                type="button"
                onClick={resetBookingFlow}
                className="w-full py-2 text-stone-500 hover:text-stone-900 text-xs font-semibold cursor-pointer"
              >
                Book Another Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. CART VIEW */}
      {bookingSubView === 'cart' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-32 space-y-8 animate-in fade-in duration-150">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setBookingSubView('catalog')}
              className="p-1.5 rounded-full hover:bg-stone-100 text-stone-700 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              Your booking
            </h2>
          </div>

          {selectedServices.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-stone-200 rounded-3xl bg-[#FAF8F5] space-y-3">
              <p className="text-stone-500 text-sm">You haven't added any services yet.</p>
              <button
                type="button"
                onClick={() => setBookingSubView('catalog')}
                className="px-5 py-2 rounded-full bg-[#18181B] text-white text-xs font-bold cursor-pointer"
              >
                Browse Services
              </button>
            </div>
          ) : (
            <div className="divide-y divide-stone-100 bg-white">
              {selectedServices.map((service) => (
                <div
                  key={service.id}
                  className="py-4 flex items-center justify-between gap-4"
                >
                  <h3 className="font-semibold text-base text-stone-900">
                    {service.name}
                  </h3>

                  <button
                    type="button"
                    onClick={() => removeService(service.id)}
                    className="p-1.5 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                    title="Remove service"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setBookingSubView('catalog')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 hover:text-[#D61C4E] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add another service</span>
            </button>
          </div>

          {/* Add to your visit */}
          <div className="space-y-3 pt-6 border-t border-stone-100">
            <h3 className="font-bold text-base text-stone-900">
              Add to your visit
            </h3>

            <div className="flex items-stretch gap-3 overflow-x-auto pb-3 no-scrollbar">
              {upsellItems.map((item) => {
                const isAdded = isServiceSelected(item.id);
                return (
                  <div
                    key={item.id}
                    className="min-w-[170px] sm:min-w-[190px] p-4 rounded-2xl border border-stone-200 bg-white flex items-center justify-between shadow-2xs hover:shadow-xs transition-shadow gap-2"
                  >
                    <h4 className="font-semibold text-xs text-stone-900 leading-snug">
                      {item.name}
                    </h4>

                    <button
                      type="button"
                      onClick={() => toggleService(item)}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-[#D61C4E] border-[#D61C4E] text-white'
                          : 'border-stone-300 text-stone-700 hover:border-stone-500 bg-white'
                      }`}
                    >
                      {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky Bottom "Choose a time" */}
          <div className="fixed bottom-14 md:bottom-0 inset-x-0 z-40 bg-white border-t border-stone-200 p-4 shadow-lg">
            <div className="max-w-4xl mx-auto flex items-center justify-center">
              <button
                type="button"
                disabled={selectedServices.length === 0}
                onClick={() => setIsTimeModalOpen(true)}
                className="w-full py-4 px-6 rounded-full bg-[#D61C4E] hover:bg-[#c21443] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base tracking-wide transition-all cursor-pointer shadow-md text-center"
              >
                Choose a time
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. CATALOG VIEW */}
      {bookingSubView === 'catalog' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 pb-32 space-y-6">
          {/* Top Bar: "Book a service" + Search Bar + Women / Men Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              Book a service
            </h2>

            <div className="flex items-center gap-3">
              {/* Gender Switcher */}
              <div className="inline-flex p-1 rounded-full bg-stone-100 border border-stone-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => handleGenderSwitch('women')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeGender === 'women'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Women
                </button>
                <button
                  type="button"
                  onClick={() => handleGenderSwitch('men')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeGender === 'men'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Men
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative w-44 sm:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-full pl-8 pr-7 py-1.5 text-xs text-stone-900 placeholder-stone-400 focus:border-[#D61C4E] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Circular Categories (Default highlighted on Hair Cut with smooth scale & pink ring) */}
          <div
            ref={circularRailRef}
            className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-1 no-scrollbar"
          >
            {currentCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => scrollToCategory(cat.id)}
                  className="flex flex-col items-center text-center shrink-0 group cursor-pointer focus:outline-none transition-transform active:scale-95"
                >
                  <div
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden p-1 border transition-all duration-300 ${
                      isActive
                        ? 'border-[#D61C4E] ring-4 ring-[#D61C4E]/25 bg-rose-50 scale-105 shadow-sm'
                        : 'border-stone-200 bg-stone-50 group-hover:border-stone-400'
                    }`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                  <span
                    className={`text-xs font-semibold mt-2 transition-colors duration-200 ${
                      isActive ? 'text-[#D61C4E] font-bold' : 'text-stone-800'
                    }`}
                  >
                    {cat.name}
                  </span>
                </button>
              );
            })}

            {/* All Services icon */}
            <button
              type="button"
              onClick={() => scrollToCategory('all')}
              className="flex flex-col items-center text-center shrink-0 group cursor-pointer focus:outline-none transition-transform active:scale-95"
            >
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl border flex items-center justify-center transition-all duration-300 ${
                  activeCategory === 'all'
                    ? 'border-[#D61C4E] ring-4 ring-[#D61C4E]/25 bg-rose-50 text-[#D61C4E] scale-105 shadow-sm'
                    : 'border-stone-200 bg-stone-50 text-stone-700 group-hover:border-stone-400'
                }`}
              >
                <div className="grid grid-cols-3 gap-1">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-current" />
                  ))}
                </div>
              </div>
              <span className={`text-xs font-semibold mt-2 transition-colors duration-200 ${activeCategory === 'all' ? 'text-[#D61C4E] font-bold' : 'text-stone-800'}`}>
                All services
              </span>
            </button>
          </div>

          {/* Horizontal Category Filter Pills (Includes "All" pill at start and dynamically updates on scroll) */}
          <div
            ref={pillsBarRef}
            className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar"
          >
            {/* All Services Pill */}
            <button
              type="button"
              onClick={() => scrollToCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer active:scale-95 ${
                activeCategory === 'all'
                  ? 'bg-[#18181B] text-white shadow-xs scale-102'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400'
              }`}
            >
              All
            </button>

            {currentCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => scrollToCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-[#18181B] text-white shadow-xs scale-102'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Clean Service Cards with Micro-Animations & Zero Subtitle Filler */}
          <div className="space-y-8 pt-2">
            {displayedCategories.map((cat) => {
              const categoryServices = servicesData.filter((s) => {
                const matchesCategory = s.categoryId === cat.id;
                const matchesGender =
                  activeGender === 'all' || s.gender === activeGender || s.gender === 'unisex';
                const matchesSearch =
                  !searchQuery.trim() ||
                  s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  s.description.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCategory && matchesGender && matchesSearch;
              });

              if (categoryServices.length === 0) return null;

              return (
                <ScrollReveal key={cat.id} delayMs={50}>
                  <section id={`section-${cat.id}`} className="space-y-3 pt-2 scroll-mt-36">
                    {/* Clean Category Heading ONLY */}
                    <h3 className="text-xl font-bold text-stone-900">
                      {cat.name}
                    </h3>

                    <div className="space-y-3">
                      {categoryServices.map((service) => {
                        const isAdded = isServiceSelected(service.id);

                        return (
                          <div
                            key={service.id}
                            className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 flex items-center justify-between gap-4 transition-all duration-300 hover:shadow-md hover:border-stone-300"
                          >
                            <div className="flex-1">
                              <h4 className="font-semibold text-base text-stone-900 leading-snug">
                                {service.name}
                              </h4>
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleService(service)}
                              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 active:scale-80 hover:scale-105 cursor-pointer ${
                                isAdded
                                  ? 'bg-[#D61C4E] border border-[#D61C4E] text-white shadow-xs'
                                  : 'border border-stone-300 text-stone-700 hover:border-stone-500 bg-white hover:bg-stone-50'
                              }`}
                              aria-label={isAdded ? `Remove ${service.name}` : `Add ${service.name}`}
                            >
                              {isAdded ? (
                                <Check className="w-5 h-5 stroke-[2.5]" />
                              ) : (
                                <Plus className="w-4 h-4 stroke-[2.5]" />
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
