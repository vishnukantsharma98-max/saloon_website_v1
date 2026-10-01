/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import stylistWoman from '../../assets/images/indian_hair_stylist_woman_1790870482330.jpg';
import stylistMakeup from '../../assets/images/indian_makeup_artist_woman_1790870501209.jpg';
import stylistBarber from '../../assets/images/indian_barber_man_1790870525649.jpg';
import stylistColorist from '../../assets/images/indian_colorist_artist_1790870541825.jpg';

interface Stylist {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
}

const STYLISTS: Stylist[] = [
  {
    id: 'st-owner',
    name: 'Virendra Sharma',
    position: 'Founder & L’Oréal Award Winner',
    imageUrl: 'https://i.postimg.cc/FzhxCdNw/owner-receiving-award-from-loreal.jpg',
  },
  {
    id: 'st-1',
    name: 'Sneha Rathore',
    position: 'Bridal & Luxury Makeup Director',
    imageUrl: stylistMakeup,
  },
  {
    id: 'st-2',
    name: 'Rajiv Mehta',
    position: 'Top Stylist & Rebonding Expert',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'st-3',
    name: 'Pooja Sen',
    position: 'Senior Hair Stylist & Cuts',
    imageUrl: stylistWoman,
  },
  {
    id: 'st-4',
    name: 'Rohit Verma',
    position: 'Executive Barber & Fade Specialist',
    imageUrl: stylistBarber,
  },
  {
    id: 'st-5',
    name: 'Neha Sharma',
    position: 'Keratin & Scalp Treatment Artist',
    imageUrl: stylistColorist,
  },
];

export const MeetOurStylists: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef<boolean>(false);

  // Buttery-smooth continuous scrolling with pause-on-hover capability
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    const speed = 0.75;

    const step = () => {
      if (el && !isHoveredRef.current) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const scrollByAmount = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-2 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-3">
        {/* Section Heading */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Meet our Stylists
            </h3>
            <p className="text-xs text-stone-500">
              Ajmer’s certified Indian master artists dedicated to personal precision & care
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByAmount(-240)}
              className="w-9 h-9 rounded-full bg-stone-900 hover:bg-[#D61C4E] active:scale-90 text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
              aria-label="Previous stylist"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(240)}
              className="w-9 h-9 rounded-full bg-stone-900 hover:bg-[#D61C4E] active:scale-90 text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
              aria-label="Next stylist"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel with continuous auto-moving loop and silky hover physics */}
        <div
          ref={scrollRef}
          onMouseEnter={() => { isHoveredRef.current = true; }}
          onMouseLeave={() => { isHoveredRef.current = false; }}
          className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto pb-3 pt-1 no-scrollbar transform-gpu"
        >
          {[...STYLISTS, ...STYLISTS, ...STYLISTS].map((stylist, index) => (
            <div
              key={`${stylist.id}-${index}`}
              className="group relative w-[180px] sm:w-[210px] aspect-3/4 rounded-3xl overflow-hidden bg-stone-900 shadow-md hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 shrink-0 flex flex-col justify-end cursor-pointer"
            >
              <img
                src={stylist.imageUrl}
                alt={stylist.name}
                loading="lazy"
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Smooth multi-stop dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-55% to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Shimmer Border Sheen */}
              <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-[#D61C4E]/60 transition-colors duration-500 pointer-events-none" />

              {/* Details text with upward glide */}
              <div className="relative z-10 p-3.5 text-center text-white space-y-1 transform transition-transform duration-300 group-hover:-translate-y-0.5">
                <h4 className="font-serif text-sm sm:text-base font-bold leading-tight tracking-wide text-white group-hover:text-rose-200 transition-colors">
                  {stylist.name}
                </h4>
                <p className="text-[11px] text-stone-300 font-medium leading-snug">
                  {stylist.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

