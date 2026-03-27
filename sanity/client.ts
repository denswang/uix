/**
 * UIX — Sanity Client
 * Phase 4 · v1.0
 *
 * Reads NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET from env.
 * Falls back gracefully — if env vars are missing, data fetching returns null
 * and the app renders mock data instead (see lib/mockData.ts).
 */

import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = '2024-01-01';

/**
 * True when Sanity is configured — gates all fetch calls.
 * The app falls back to mock data when this is false.
 */
export const isSanityConfigured = Boolean(projectId);

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
    })
  : null;

/**
 * Safe fetch wrapper — returns null when Sanity is not configured
 * or when a query fails.
 */
export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (err) {
    console.error('[UIX Sanity] Fetch failed:', err);
    return null;
  }
}
