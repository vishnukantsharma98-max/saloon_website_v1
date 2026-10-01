/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { ASSET_MAP } from '../../data/assets';
import { businessConfig } from '../../data/business';
import { SalonPhotoSlider } from '../gallery/SalonPhotoSlider';
import { PopularServicesSlider } from './PopularServicesSlider';
import { MeetOurStylists } from './MeetOurStylists';
import { GoogleMapRatingSection } from './GoogleMapRatingSection';
import { ScrollReveal } from '../common/ScrollReveal';
import { Clock, Instagram, Facebook } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActivePage, setActiveCategory, setActiveGender } = useBooking();

  // Circular Categories for Home Page
  const homeCategories = [
    { id: 'haircut', label: 'Hair Cut', image: ASSET_MAP['hair-01'].url, gender: 'women' as const },
    { id: 'beard', label: 'Beard & Shave', image: ASSET_MAP['mens-01'].url, gender: 'men' as const },
    { id: 'hair-wash', label: 'Hair Wash', image: ASSET_MAP['interior-01'].url, gender: 'women' as const },
    { id: 'colour', label: 'Colour', image: ASSET_MAP['hair-02'].url, gender: 'women' as const },
    { id: 'treatments', label: 'Treatments', image: ASSET_MAP['beauty-02'].url, gender: 'women' as const },
    { id: 'texture', label: 'Texture', image: ASSET_MAP['hair-03'].url, gender: 'women' as const },
    { id: 'threading', label: 'Threading', image: ASSET_MAP['beauty-01'].url, gender: 'women' as const },
    { id: 'manicure', label: 'Manicure', image: ASSET_MAP['nails-01'].url, gender: 'women' as const },
  ];

  const handleCategoryClick = (catId: string, gender: 'women' | 'men') => {
    setActiveGender(gender);
    setActiveCategory(catId);
    setActivePage('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-4 pb-20">
      {/* 1. HERO BANNER: Staggered Entrance Animation with Framer Motion */}
      <section className="relative w-full min-h-[440px] sm:min-h-[500px] flex items-center bg-stone-950 text-white overflow-hidden">
        {/* Animated Background Image: Slides in smoothly from Left */}
        <motion.div
          initial={{ x: -140, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          {/* Responsive Hero Background:
              - Desktop: Salon + Barber image with barber visible on right & salon on left
              - Mobile: Vertical crop focusing on the barber's face & upper body */}
          <picture className="w-full h-full">
            <source
              media="(max-width: 767px)"
              srcSet="/home-screenphoto.png, https://i.postimg.cc/rmhWfdHG/home-screenphoto.png"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/home-screenphoto.png, https://i.postimg.cc/rmhWfdHG/home-screenphoto.png"
            />
            <img
              src="/home-screenphoto.png"
              alt="Luméa Salon & Barber Master Stylist"
              className="w-full h-full object-cover object-[78%_20%] md:object-[72%_35%] opacity-75 md:opacity-70 animate-hero-zoom transform-gpu will-change-transform scale-105"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('postimg.cc')) {
                  target.src = 'https://i.postimg.cc/rmhWfdHG/home-screenphoto.png';
                }
              }}
            />
          </picture>

          {/* Ambient window light sweep */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent animate-light-sweep" />
        </motion.div>

        {/* Subtle Dark Overlay only where necessary for text readability:
            - Desktop: Dark on left where headline sits, transparent on right so barber is clearly visible
            - Mobile: Gradient from bottom/left to keep barber in focus while text is legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/92 via-stone-950/50 to-transparent hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/60 to-stone-950/20 block md:hidden" />

        {/* Text and Actions: Slides in concurrently from Right with Staggered Children */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-14 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { x: 120, opacity: 0 },
              visible: {
                x: 0,
                opacity: 1,
                transition: {
                  duration: 1.0,
                  ease: [0.16, 1, 0.3, 1],
                  staggerChildren: 0.18,
                  delayChildren: 0.1,
                },
              },
            }}
            className="max-w-xl space-y-4"
          >
            <motion.h1
              variants={{
                hidden: { x: 50, opacity: 0 },
                visible: {
                  x: 0,
                  opacity: 1,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]"
            >
              <span className="block transform transition-transform hover:translate-x-1 duration-300">
                Your Beauty.
              </span>
              <span className="block bg-gradient-to-r from-white via-rose-100 to-stone-200 bg-clip-text text-transparent transform transition-transform hover:translate-x-1 duration-300">
                Your Style. Your Confidence.
              </span>
            </motion.h1>

            {/* Quick Action Buttons: Staggered with hover interactive glow */}
            <motion.div
              variants={{
                hidden: { x: 50, opacity: 0 },
                visible: {
                  x: 0,
                  opacity: 1,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="pt-3 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                onClick={() => {
                  setActivePage('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative px-8 py-3.5 rounded-full bg-white hover:bg-stone-100 active:scale-95 text-stone-900 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all cursor-pointer hover:shadow-2xl overflow-hidden"
              >
                <span className="relative z-10">Book Now</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setActivePage('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-full bg-transparent hover:bg-white/10 active:scale-95 text-white border border-white/50 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer backdrop-blur-xs"
              >
                Services
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. "BOOK A SERVICE" CATEGORY RAIL (Tight vertical gap) */}
      <ScrollReveal delayMs={30}>
        <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              Book a service
            </h2>

            <button
              type="button"
              onClick={() => {
                setActivePage('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-[#D61C4E] hover:underline cursor-pointer"
            >
              All Services →
            </button>
          </div>

          {/* Circular Categories */}
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-1 no-scrollbar">
            {homeCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id, cat.gender)}
                className="flex flex-col items-center text-center shrink-0 group cursor-pointer focus:outline-none transition-transform active:scale-95"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden p-1 border border-stone-200 bg-stone-50 group-hover:border-[#D61C4E] group-hover:scale-105 transition-all duration-300">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <span className="text-xs font-semibold mt-1.5 text-stone-800 group-hover:text-[#D61C4E] transition-colors">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 3. SALON GALLERY: Continuous Auto-Movement (Never stops on hover) */}
      <ScrollReveal delayMs={40}>
        <SalonPhotoSlider />
      </ScrollReveal>

      {/* 4. POPULAR TREATMENTS DRAWER: No prices, No bullet clutter, Never stops on hover */}
      <ScrollReveal delayMs={40}>
        <PopularServicesSlider />
      </ScrollReveal>

      {/* 5. MEET OUR STYLISTS CAROUSEL: Continuous Auto-Movement */}
      <ScrollReveal delayMs={40}>
        <MeetOurStylists />
      </ScrollReveal>

      {/* 6. GOOGLE RATING & MAP DIRECTIONS (Yellow stars + Fade in up) */}
      <ScrollReveal delayMs={40}>
        <GoogleMapRatingSection />
      </ScrollReveal>

      {/* 7. STUDIO HOURS & SOCIAL CONNECT CARD */}
      <ScrollReveal delayMs={40}>
        <section className="px-4 sm:px-8 max-w-7xl mx-auto pt-1">
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-base">Studio Hours</h4>
                <p className="text-xs text-stone-600">
                  Tue – Sat: 10:00 AM – 8:00 PM · Sun: 11:00 AM – 6:00 PM (Mon Closed)
                </p>
              </div>
            </div>

            {/* Social Links & Short Punchy Action Button */}
            <div className="flex items-center gap-3">
              <a
                href={businessConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={businessConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Facebook"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => {
                  setActivePage('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="py-2.5 px-6 rounded-full bg-[#D61C4E] hover:bg-[#c21443] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
              >
                Book Now
              </button>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};
