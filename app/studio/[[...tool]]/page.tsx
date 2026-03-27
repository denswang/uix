/**
 * UIX — Sanity Studio Route
 * Phase 5 · v1.0
 *
 * Embeds Sanity Studio at /studio using next-sanity.
 * Must be a client component — Studio renders in the browser.
 *
 * Access: https://new.uix.cx/studio
 * Requires a Sanity account with access to the UIX project.
 */

'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
