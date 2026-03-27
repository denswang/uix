/**
 * UIX — Shared TypeScript Types
 * Phase 4 · v1.0
 */

/* ── Gallery Source ──────────────────────────────────────────────────────── */
export type GallerySource =
  | 'Framer'
  | 'Webflow'
  | 'Awwwards'
  | 'Siteinspire'
  | 'Godly'
  | 'UIX';

/* ── Gallery Entry (Sanity document / mock data shape) ───────────────────── */
export interface GalleryEntry {
  /** Sanity _id or mock id */
  id: string;
  /** Short architectural title — max 8 words */
  title: string;
  /** Editorial description — 2–3 sentences in UIX voice */
  description: string;
  /** Tag array — 3–5 items */
  tags: string[];
  /** Affiliate or tracked CTA URL */
  affiliateUrl: string;
  /** Display price — e.g. "$49", "Free", "$79" */
  affiliatePrice?: string;
  /** Thumbnail image URL — DO Spaces CDN or placeholder */
  thumbnailUrl: string;
  /** Blueprint Mode annotation — 1 sentence on structural logic */
  blueprintNote: string;
  /** Origin platform */
  source: GallerySource;
  /** If true: PlayableEmbed is rendered on detail page */
  isPlayable: boolean;
  /** Framer or Figma prototype embed URL (required if isPlayable) */
  embedUrl?: string;
  /** Embed platform type */
  embedType?: 'framer' | 'figma';
  /** URL slug for /gallery/[slug] routing */
  slug: string;
  /** OG image URL — defaults to thumbnailUrl if absent */
  ogImageUrl?: string;
  /** ISO date string — for ordering */
  publishedAt?: string;
}

/* ── Sanity Image reference (raw from GROQ) ──────────────────────────────── */
export interface SanityImageRef {
  asset: {
    url: string;
  };
}

/* ── Raw Sanity document (before transformation) ─────────────────────────── */
export interface SanityGalleryEntry {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  affiliateUrl: string;
  affiliatePrice?: string;
  thumbnail: SanityImageRef;
  blueprintNote: string;
  source: GallerySource;
  isPlayable: boolean;
  embedUrl?: string;
  embedType?: 'framer' | 'figma';
  slug: { current: string };
  ogImage?: SanityImageRef;
  publishedAt?: string;
}

/* ── Page-level props ────────────────────────────────────────────────────── */
export interface GalleryPageProps {
  params: Promise<{ slug: string }>;
}
