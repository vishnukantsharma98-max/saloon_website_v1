/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { ASSET_MAP } from '../../data/assets';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Stylist {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
}

const STYLISTS: Stylist[] = [
  {
    id: 'st-1',
    name: 'Elena Vance',
    position: 'Founder & Master Director',
    imageUrl: ASSET_MAP['hero-cutout'].url,
  },
  {
    id: 'st-2',
    name: 'Rajiv Mehta',
    position: 'Top Stylist & Colorist',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'st-3',
    name: 'Anna',
    position: 'Top Stylist',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'st-4',
    name: 'Kumhee',
    position: 'Senior Hair Artist',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'st-5',
    name: 'Priya Sharma',
    position: 'Bridal & Makeup Director',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'st-6',
    name: 'David Chen',
    position: 'Executive Barber Specialist',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80',
  },
];

export const MeetOurStylists: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep moving continuously without stopping on hover
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    const speed = 0.8;

    const step = () => {
      if (el) {
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
    <section className="py-1 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-2">
        {/* Section Heading */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Meet our Stylists
            </h3>
            <p className="text-[11px] text-stone-400">
              Certified artists dedicated to personal precision & care
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollByAmount(-220)}
              className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              aria-label="Previous stylist"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(220)}
              className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              aria-label="Next stylist"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel with continuous auto-moving loop */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto pb-2 pt-1 no-scrollbar"
        >
          {[...STYLISTS, ...STYLISTS, ...STYLISTS].map((stylist, index) => (
            <div
              key={`${stylist.id}-${index}`}
              className="group relative w-[170px] sm:w-[195px] aspect-3/4 rounded-3xl overflow-hidden bg-black shadow-2xs hover:shadow-lg transition-all duration-300 shrink-0 flex flex-col justify-end"
            >
              <img
                src={stylist.imageUrl}
                alt={stylist.name}
                loading="lazy"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

              <div className="relative z-10 p-3 text-center text-white space-y-0.5">
                <h4 className="font-serif text-sm sm:text-base font-bold leading-tight">
                  {stylist.name}
                </h4>
                <p className="text-[10px] text-stone-300 font-medium">
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
