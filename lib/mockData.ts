/**
 * UIX — Mock Gallery Data
 * Phase 4 · v1.0
 *
 * 3 seed entries for local development — used when NEXT_PUBLIC_SANITY_PROJECT_ID
 * is not set, or when running `npm run dev` without Sanity credentials.
 *
 * Remove or replace once Sanity entries are live.
 */

import { GalleryEntry } from './types';

export const MOCK_ENTRIES: GalleryEntry[] = [
  {
    id: 'mock-001',
    title: 'SaaS Onboarding — Linear Pattern',
    description:
      'A 6-step progressive onboarding architecture that cuts time-to-value by surfacing the core action within 90 seconds. Workspace setup, invite flow, and feature discovery compressed into a single-page state machine with zero redundant screens.',
    tags: ['SaaS', 'Onboarding', 'Flow', 'Framer'],
    affiliateUrl: 'https://framer.com/templates/',
    affiliatePrice: '$49',
    thumbnailUrl:
      'https://placehold.co/640x400/111111/3D7EF5?text=SaaS+Onboarding',
    blueprintNote:
      '6-step state machine — 4-column inner grid, 80px vertical rhythm, conditional branch at step 3',
    source: 'Framer',
    isPlayable: false,
    slug: 'saas-onboarding-linear-pattern',
    publishedAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'mock-002',
    title: 'E-Commerce Checkout — Stripe Aesthetic',
    description:
      'Single-page checkout that eliminates friction through progressive disclosure. Payment, shipping, and confirmation collapse into one continuous scroll — no page transitions, no redundant fields, no abandoned carts.',
    tags: ['E-Commerce', 'Checkout', 'Conversion', 'SaaS'],
    affiliateUrl: 'https://framer.com/templates/',
    affiliatePrice: '$79',
    thumbnailUrl:
      'https://placehold.co/640x400/111111/FFFFFF?text=Checkout+Flow',
    blueprintNote:
      '2-column split — form 60%, order summary 40%, sticky CTA pinned at viewport bottom, 16px gap between sections',
    source: 'Awwwards',
    isPlayable: false,
    slug: 'ecommerce-checkout-stripe-aesthetic',
    publishedAt: '2026-03-10T00:00:00Z',
  },
  {
    id: 'mock-003',
    title: 'Analytics Dashboard — Vercel Density',
    description:
      'Data-dense dashboard achieving zero visual noise through typographic hierarchy alone. Every metric earns its space or gets cut. No decorative charts — each data point maps directly to a decision.',
    tags: ['Dashboard', 'Analytics', 'Dark Mode', 'UIX Original'],
    affiliateUrl: 'https://framer.com/templates/',
    affiliatePrice: 'Free',
    thumbnailUrl:
      'https://placehold.co/640x400/0A0A0A/888888?text=Analytics+Dashboard',
    blueprintNote:
      '12-column grid, 3-tier density zones — KPI header row, trend mid section, data table floor at 8px baseline',
    source: 'UIX',
    isPlayable: false,
    slug: 'analytics-dashboard-vercel-density',
    publishedAt: '2026-03-15T00:00:00Z',
  },
];

/** Find a single mock entry by slug */
export function getMockEntry(slug: string): GalleryEntry | undefined {
  return MOCK_ENTRIES.find((e) => e.slug === slug);
}
