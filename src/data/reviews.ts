/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReviewItem } from '../types/review';

export const reviewsData: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Meera Sengupta',
    source: 'Google Review',
    rating: 5,
    date: 'February 2026',
    serviceTaken: 'Balayage & Scalp Ritual',
    text: 'The first salon where the consultation actually mattered more than selling products. Elena listened to my hair history and gave me the most flattering, low-maintenance dimensional colour I have ever had.',
    enabled: true,
  },
  {
    id: 'rev-2',
    author: 'Aditya Mathur',
    source: 'Google Review',
    rating: 5,
    date: 'January 2026',
    serviceTaken: 'Head Spa & Precision Cut',
    text: 'The head spa suite is genuinely transformative. Calm lighting, warm towels, herbal scent, and meticulous attention to detail. No loud pop music, no rush—just quiet perfection.',
    enabled: true,
  },
  {
    id: 'rev-3',
    author: 'Rhea Nambiar',
    source: 'Verified Client',
    rating: 5,
    date: 'December 2025',
    serviceTaken: 'Director Cut',
    text: 'Elena’s dry-cut technique grew out seamlessly over three months without losing its shape. The space on Lavelle Road is breathtakingly serene.',
    enabled: true,
  },
];
