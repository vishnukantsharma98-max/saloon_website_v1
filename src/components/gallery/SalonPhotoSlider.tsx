/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryCardItem {
  id: string;
  title: string;
  imageUrl: string;
}

const SALON_GALLERY_ITEMS: GalleryCardItem[] = [
  {
    id: 'gal-1',
    title: 'Master Styling & Foils',
    imageUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gal-2',
    title: 'L’Oréal Paris Award',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gal-3',
    title: 'Balayage Before & After',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gal-4',
    title: 'Bridal Glam Makeup',
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gal-5',
    title: 'Studio Interior Stations',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gal-6',
    title: 'Precision Scissor Fade',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
  },
];

export const SalonPhotoSlider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Continuous auto-sliding without stopping when cursor is on it
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    const speed = 0.85;

    const step = () => {
      if (el) {
        el.scrollLeft += speed;
        // When halfway through the duplicated list, reset to create seamless infinite movement
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const scrollByAmount = useCallback((amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  }, []);

  return (
    <section className="py-1 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-2">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Salon Gallery
          </h3>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollByAmount(-260)}
              className="w-8 h-8 rounded-full bg-white border border-stone-200 hover:border-stone-400 text-stone-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(260)}
              className="w-8 h-8 rounded-full bg-white border border-stone-200 hover:border-stone-400 text-stone-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Continuous auto-moving slider that keeps sliding smoothly */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto pb-2 pt-1 no-scrollbar"
        >
          {[...SALON_GALLERY_ITEMS, ...SALON_GALLERY_ITEMS, ...SALON_GALLERY_ITEMS].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="group relative w-[220px] sm:w-[250px] aspect-4/3 rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-2xs hover:shadow-lg transition-all duration-300 shrink-0"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h4 className="font-serif text-sm sm:text-base font-bold leading-tight drop-shadow-xs">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
