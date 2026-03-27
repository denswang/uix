/**
 * UIX — Sanity GROQ Queries
 * Phase 4 · v1.0
 *
 * All data fetching goes through these queries.
 * The transform functions convert raw Sanity docs → GalleryEntry shape.
 */

import { safeFetch } from './client';
import { GalleryEntry, GallerySource } from '../lib/types';
import { MOCK_ENTRIES, getMockEntry } from '../lib/mockData';

/* ── GROQ fragment — all fields needed for GalleryEntry ─────────────────── */
const ENTRY_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  description,
  tags,
  affiliateUrl,
  affiliatePrice,
  "thumbnailUrl": thumbnail.asset->url,
  blueprintNote,
  source,
  isPlayable,
  embedUrl,
  embedType,
  "ogImageUrl": ogImage.asset->url,
  publishedAt
`;

/** One row as returned by ENTRY_FIELDS (flattened slug + image URLs) */
interface GalleryEntryQueryRow {
  _id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  affiliateUrl: string;
  affiliatePrice?: string;
  thumbnailUrl: string | null;
  blueprintNote: string;
  source: GallerySource;
  isPlayable: boolean;
  embedUrl?: string;
  embedType?: 'framer' | 'figma';
  ogImageUrl?: string | null;
  publishedAt?: string;
}

/* ── Transform: GROQ row → GalleryEntry ──────────────────────────────────── */
function transform(doc: GalleryEntryQueryRow): GalleryEntry {
  return {
    id: doc._id,
    title: doc.title,
    slug: doc.slug,
    description: doc.description,
    tags: doc.tags ?? [],
    affiliateUrl: doc.affiliateUrl,
    affiliatePrice: doc.affiliatePrice,
    thumbnailUrl: doc.thumbnailUrl ?? '',
    blueprintNote: doc.blueprintNote,
    source: doc.source,
    isPlayable: doc.isPlayable ?? false,
    embedUrl: doc.embedUrl,
    embedType: doc.embedType,
    ogImageUrl: doc.ogImageUrl ?? undefined,
    publishedAt: doc.publishedAt,
  };
}

/* ── Fetch all gallery entries (homepage) ────────────────────────────────── */
export async function getAllEntries(): Promise<GalleryEntry[]> {
  const query = `*[_type == "galleryEntry"] | order(publishedAt desc) {
    ${ENTRY_FIELDS}
  }`;

  const raw = await safeFetch<GalleryEntryQueryRow[]>(query);
  if (!raw || raw.length === 0) {
    // Fall back to mock data
    return MOCK_ENTRIES;
  }
  return raw.map(transform);
}

/* ── Fetch a single entry by slug (detail page) ─────────────────────────── */
export async function getEntryBySlug(slug: string): Promise<GalleryEntry | null> {
  const query = `*[_type == "galleryEntry" && slug.current == $slug][0] {
    ${ENTRY_FIELDS}
  }`;

  const raw = await safeFetch<GalleryEntryQueryRow | null>(query, { slug });
  if (!raw) {
    return getMockEntry(slug) ?? null;
  }
  return transform(raw);
}

/* ── Fetch all slugs for generateStaticParams ────────────────────────────── */
export async function getAllSlugs(): Promise<string[]> {
  const query = `*[_type == "galleryEntry"].slug.current`;
  const raw = await safeFetch<string[]>(query);
  if (!raw || raw.length === 0) {
    return MOCK_ENTRIES.map((e) => e.slug);
  }
  return raw;
}
