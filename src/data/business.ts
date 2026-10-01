/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BusinessConfig } from '../types/business';

/**
 * CENTRAL MASTER BUSINESS CONFIGURATION
 * 
 * To rebrand this system for a new client (e.g. Salon A, Luxury Barber, Bridal Studio):
 * Simply edit this file and corresponding data files in src/data/.
 * All UI components, navigation, hero, trust bars, WhatsApp triggers, and maps
 * will update automatically without changing component code.
 */
export const businessConfig: BusinessConfig = {
  id: 'lumea-hair-beauty-studio',
  name: 'Luméa Salon & Spa',
  brandMark: 'LUMÉA',
  tagline: 'Your Beauty. Your Style. Your Confidence.',
  shortDescription:
    'A luxury salon sanctuary crafted for bespoke hair couture, rejuvenating skin rituals, and executive grooming.',
  editorialSummary:
    'Founded on the philosophy that true beauty is natural, personal, and meticulously crafted. Every session begins with a relaxed consultation, prioritizing the health and longevity of your hair and skin in a calm, private atmosphere.',
  ownerName: 'Elena Vance',
  ownerTitle: 'Creative Director & Founder',

  contact: {
    phoneDisplay: '+91 94614 74764',
    phoneE164: '+919461474764',
    whatsappNumber: '919461474764', // User specified: 9461474764
    email: 'concierge@lumeasalon.com',
  },

  location: {
    addressLine1: 'Atelier 4, The Pavilion Promenade',
    addressLine2: 'Lavelle Road District',
    city: 'Bengaluru, Karnataka',
    landmark: 'Opposite Cinnamon Garden Conservatory',
    postalCode: '560001',
    latitude: 12.9716,
    longitude: 77.5946,
    directionsUrl: 'https://maps.google.com/?q=12.9716,77.5946',
  },

  operatingHours: [
    { days: 'Tuesday – Saturday', hours: '10:00 AM – 8:00 PM' },
    { days: 'Sunday', hours: '11:00 AM – 6:00 PM' },
    { days: 'Monday', hours: 'Studio Rest & Private Bookings' },
  ],

  social: {
    instagram: 'https://instagram.com/lumea.studio.demo',
    facebook: 'https://facebook.com/lumea.studio.demo',
    googleMaps: 'https://maps.google.com/?q=12.9716,77.5946',
  },

  trust: {
    googleRating: 4.9,
    reviewCount: 142,
    establishedYear: 2021,
    verifiedBadgeText: 'By Appointment Only',
    curatedBrands: ['Davines', 'Oribe', 'Kérastase Chronologiste', 'Biologique Recherche'],
  },

  hero: {
    mode: 'image', // 'image' | 'video' | 'cutout'
    eyebrow: 'Private Atelier · Lavelle Road',
    title: 'Precision craft for hair & skin that speaks without shouting.',
    emphasisWord: 'craft',
    subtitle:
      'A quiet, sunlit salon space designed for bespoke colour formulation, mindful cutting, and restorative skin rituals.',
    primaryCtaLabel: 'Enquire on WhatsApp',
    secondaryCtaLabel: 'Explore Services',
    locationBadge: 'Lavelle Road, Bengaluru',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=85',
    videoUrl: '',
    posterImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=85',
    personCutout: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=85',
  },
};
