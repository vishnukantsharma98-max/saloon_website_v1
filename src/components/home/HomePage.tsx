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
import { GoogleReviewsSlider } from './GoogleReviewsSlider';
import { ScrollReveal } from '../common/ScrollReveal';
import { Clock, Instagram, Facebook } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActivePage, setActiveCategory, setActiveGender } = useBooking();

  // Circular Categories for Home Page (Matching user-requested core services)
  const homeCategories = [
    { id: 'haircut', label: 'Hair Cut', image: ASSET_MAP['hair-01'].url, gender: 'women' as const },
    { id: 'rebonding', label: 'Rebonding', image: 'https://i.postimg.cc/6pG4xWj3/shop-image.jpg', gender: 'women' as const },
    { id: 'keratin', label: 'Keratin', image: ASSET_MAP['hair-03'].url, gender: 'women' as const },
    { id: 'makeup', label: 'All Makeup', image: ASSET_MAP['makeup-01'].url, gender: 'women' as const },
    { id: 'nail-art', label: 'Nail Art', image: ASSET_MAP['nails-01'].url, gender: 'women' as const },
    { id: 'treatments', label: 'Hair Treatment', image: ASSET_MAP['interior-02'].url, gender: 'women' as const },
    { id: 'beard', label: 'Beard & Shave', image: ASSET_MAP['mens-01'].url, gender: 'men' as const },
    { id: 'colour', label: 'Colour', image: ASSET_MAP['hair-02'].url, gender: 'women' as const },
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
      <section className="relative w-full min-h-[520px] sm:min-h-[540px] md:min-h-[560px] flex items-end md:items-center bg-stone-950 text-white overflow-hidden pb-8 pt-16 md:py-14">
        {/* Animated Background Image: Slides in smoothly from Left */}
        <motion.div
          initial={{ x: -140, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          {/* Responsive Hero Background:
              - Desktop: Salon + Barber image with stylist face clear on right & text on left
              - Mobile: Positioned so the stylist's face is at top (76% 8%) and never hidden by text */}
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
              alt="PERFECT SHINE UNISEX SALON Master Stylist"
              className="w-full h-full object-cover object-[76%_8%] md:object-[76%_32%] opacity-95 md:opacity-75 md:animate-hero-zoom transform-gpu will-change-transform scale-100 md:scale-105"
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

        {/* Dark Overlay placed specifically to protect face visibility:
            - Desktop: Left 65% shaded for text, right side 100% transparent so face is bright and completely clear
            - Mobile: Bottom 45% shaded for text, top 55% transparent so face is never covered */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/60 to-transparent to-65% hidden md:block pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/85 via-45% to-transparent to-65% block md:hidden pointer-events-none" />

        {/* Text and Actions: Salon Name is Main Focus with Motto */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full">
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
            className="max-w-lg md:max-w-xl space-y-2 sm:space-y-3"
          >
            {/* Top Eyebrow */}
            <motion.div
              variants={{
                hidden: { x: 50, opacity: 0 },
                visible: {
                  x: 0,
                  opacity: 1,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.2em] text-rose-300 uppercase bg-black/45 backdrop-blur-md px-3 py-1 rounded-full border border-rose-500/30 shadow-xs">
                ★ Ajmer’s Premier Unisex Salon
              </span>
            </motion.div>

            {/* MAIN FOCUS: Salon Name */}
            <motion.h1
              variants={{
                hidden: { x: 50, opacity: 0 },
                visible: {
                  x: 0,
                  opacity: 1,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.05] drop-shadow-xl"
            >
              <span className="block transform transition-transform hover:translate-x-1 duration-300">
                PERFECT SHINE
              </span>
              <span className="block text-[#D61C4E] sm:text-rose-400 font-sans text-xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.2em] uppercase mt-0.5 sm:mt-1">
                UNISEX SALON
              </span>
            </motion.h1>

            {/* MOTTO / TAGLINE */}
            <motion.p
              variants={{
                hidden: { x: 50, opacity: 0 },
                visible: {
                  x: 0,
                  opacity: 1,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="font-serif italic text-base sm:text-2xl text-stone-100 drop-shadow-md pt-0.5"
            >
              “Your Beauty. Your Style. Your Confidence.”
            </motion.p>

            {/* Quick Action Buttons with spring hover & click physics */}
            <motion.div
              variants={{
                hidden: { x: 50, opacity: 0 },
                visible: {
                  x: 0,
                  opacity: 1,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3.5"
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 20px 25px -5px rgba(214, 28, 78, 0.4)' }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => {
                  setActivePage('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative px-7 sm:px-8 py-3.5 rounded-full bg-[#D61C4E] hover:bg-[#c21443] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all cursor-pointer overflow-hidden"
              >
                <span className="relative z-10">Book Appointment</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => {
                  setActivePage('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 sm:px-7 py-3.5 rounded-full bg-white/10 text-white font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/30 transition-all cursor-pointer"
              >
                Explore Services
              </motion.button>
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
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden p-1 border border-stone-200 bg-stone-50 group-hover:border-[#D61C4E] group-hover:scale-108 group-hover:shadow-lg transition-all duration-300 ease-out">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500 ease-out"
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
                <Clock className="w-5 h-5 text-[#D61C4E]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-base">Studio Hours</h4>
                <p className="text-xs text-stone-600">
                  Monday – Sunday: <strong>10:00 AM – 9:00 PM</strong> (Open All 7 Days)
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

      {/* 8. CLIENT REVIEWS SLIDER (Authentic Indian Google Reviews) */}
      <ScrollReveal delayMs={40}>
        <GoogleReviewsSlider />
      </ScrollReveal>
    </div>
  );
};
