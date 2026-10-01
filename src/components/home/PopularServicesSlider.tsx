/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import { servicesData } from '../../data/services';
import { ASSET_MAP } from '../../data/assets';
import { ServiceItem } from '../../types/service';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PopularServiceItem {
  id: string;
  serviceId: string;
  name: string;
  imageUrl: string;
  gender: 'women' | 'men';
  categoryId: string;
}

// Clean Popular Services matching valid service catalog IDs
const POPULAR_SERVICES: PopularServiceItem[] = [
  {
    id: 'pop-haircut',
    serviceId: 'srv-haircut-women',
    name: 'Hair Cut & Blowdry',
    imageUrl: ASSET_MAP['hair-01'].url,
    gender: 'women',
    categoryId: 'haircut',
  },
  {
    id: 'pop-rebonding',
    serviceId: 'srv-hair-rebonding-women',
    name: 'Permanent Hair Rebonding',
    imageUrl: 'https://i.postimg.cc/6pG4xWj3/shop-image.jpg',
    gender: 'women',
    categoryId: 'rebonding',
  },
  {
    id: 'pop-keratin',
    serviceId: 'srv-keratin-women',
    name: 'Keratin Protein Smoothing',
    imageUrl: ASSET_MAP['hair-03'].url,
    gender: 'women',
    categoryId: 'keratin',
  },
  {
    id: 'pop-makeup',
    serviceId: 'srv-bridal-makeup',
    name: 'Bridal & Party Makeup',
    imageUrl: ASSET_MAP['makeup-01'].url,
    gender: 'women',
    categoryId: 'makeup',
  },
  {
    id: 'pop-nail-art',
    serviceId: 'srv-nail-art-gel',
    name: 'Designer Nail Art & Gel',
    imageUrl: ASSET_MAP['nails-01'].url,
    gender: 'women',
    categoryId: 'nail-art',
  },
  {
    id: 'pop-hair-spa',
    serviceId: 'srv-hair-spa-deep',
    name: 'L’Oréal Deep Hair Spa',
    imageUrl: ASSET_MAP['interior-02'].url,
    gender: 'women',
    categoryId: 'treatments',
  },
  {
    id: 'pop-grooming',
    serviceId: 'srv-beard-trim-shave',
    name: 'Beard Sculpt & Shave',
    imageUrl: ASSET_MAP['mens-01'].url,
    gender: 'men',
    categoryId: 'beard',
  },
  {
    id: 'pop-colour',
    serviceId: 'srv-global-colour',
    name: 'Global Hair Colour',
    imageUrl: ASSET_MAP['hair-02'].url,
    gender: 'women',
    categoryId: 'colour',
  },
];

export const PopularServicesSlider: React.FC = () => {
  const { toggleService, isServiceSelected, setIsTimeModalOpen } = useBooking();
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

  const getServiceItem = (item: PopularServiceItem): ServiceItem => {
    const existing = servicesData.find((s) => s.id === item.serviceId);
    if (existing) return existing;
    return {
      id: item.serviceId,
      name: item.name,
      categoryId: item.categoryId,
      gender: item.gender,
      description: item.name,
      enabled: true,
    };
  };

  const handleAdd = (item: PopularServiceItem) => {
    const srv = getServiceItem(item);
    toggleService(srv);
  };

  const handleBookNow = (item: PopularServiceItem) => {
    const srv = getServiceItem(item);
    if (!isServiceSelected(srv.id)) {
      toggleService(srv);
    }
    setIsTimeModalOpen(true);
  };

  return (
    <section className="py-1 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-2">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Popular Treatments
          </h3>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollByAmount(-240)}
              className="w-8 h-8 rounded-full bg-white border border-stone-200 hover:border-stone-400 text-stone-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(240)}
              className="w-8 h-8 rounded-full bg-white border border-stone-200 hover:border-stone-400 text-stone-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Continuous auto-sliding cards (No prices, bullet clutter removed) */}
        <div
          ref={scrollRef}
          onMouseEnter={() => { isHoveredRef.current = true; }}
          onMouseLeave={() => { isHoveredRef.current = false; }}
          className="flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto pb-3 pt-1 no-scrollbar transform-gpu"
        >
          {[...POPULAR_SERVICES, ...POPULAR_SERVICES, ...POPULAR_SERVICES].map((item, index) => {
            const isAdded = isServiceSelected(item.serviceId);

            return (
              <div
                key={`${item.id}-${index}`}
                className="group w-[200px] sm:w-[220px] rounded-3xl overflow-hidden bg-white border border-stone-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shrink-0"
              >
                {/* 1. Thumbnail Image */}
                <div className="relative h-28 sm:h-30 w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* 2. Service Name only */}
                <div className="p-3.5 flex flex-col justify-between flex-1 space-y-3">
                  <h4 className="font-bold text-sm text-stone-900 leading-snug">
                    {item.name}
                  </h4>

                  {/* Clean Action Buttons: [Add] and [Book Now] */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => handleAdd(item)}
                      className={`py-1.5 px-2 rounded-full text-xs font-bold text-center transition-all cursor-pointer active:scale-95 ${
                        isAdded
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'border border-stone-200 hover:border-stone-400 text-stone-800 bg-white hover:bg-stone-50'
                      }`}
                    >
                      {isAdded ? 'Added ✓' : '+ Add'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleBookNow(item)}
                      className="py-1.5 px-2 rounded-full bg-[#D61C4E] hover:bg-[#c01844] active:scale-95 text-white text-xs font-bold text-center shadow-xs transition-all cursor-pointer"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
