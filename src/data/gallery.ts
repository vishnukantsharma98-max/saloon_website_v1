/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GalleryItem, BeforeAfterPair } from '../types/gallery';

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-1',
    category: 'salon',
    title: 'The Sunlit Atelier Washroom',
    caption: 'Custom travertine basins with soft halo ambient illumination',
    aspect: '16:9',
    imageSlot: 'interior-01',
    featured: true,
  },
  {
    id: 'gal-2',
    category: 'hair',
    title: 'Warm Champagne Dimension',
    caption: 'Seamless micro-foil blend on fine virgin texture',
    aspect: '4:3',
    imageSlot: 'hair-01',
    featured: true,
  },
  {
    id: 'gal-3',
    category: 'hair',
    title: 'Modern Architectural Bob',
    caption: 'Weightless internal layering with razor-defined perimeter',
    aspect: '3:4',
    imageSlot: 'hair-02',
    featured: true,
  },
  {
    id: 'gal-4',
    category: 'skin',
    title: 'Gua Sha Sculpting Suite',
    caption: 'Private chamber for lymphatic and buccal facial therapies',
    aspect: '4:3',
    imageSlot: 'beauty-01',
    featured: false,
  },
  {
    id: 'gal-5',
    category: 'salon',
    title: 'Artisanal Dispensary',
    caption: 'Small-batch organic botanical concentrates and clean formulations',
    aspect: '1:1',
    imageSlot: 'interior-02',
    featured: false,
  },
];

export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: 'ba-1',
    title: 'Corrective Blonde Tone & Density Restoration',
    treatmentName: 'Custom Lowlight Diffusion + Moisture Repair',
    beforeImageSlot: 'before-01',
    afterImageSlot: 'after-01',
    labelBefore: 'Prior Uneven Tone',
    labelAfter: 'After 3.5hr Gentle Restoration',
    notes: 'Restored hair fiber integrity while diffusing harsh brass line without bleach overlap.',
  },
];
