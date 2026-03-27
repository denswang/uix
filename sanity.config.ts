/**
 * UIX — Sanity Studio Config
 * Phase 5 · v1.0
 *
 * Embedded in Next.js App Router at /studio via next-sanity.
 * Project ID and dataset read from NEXT_PUBLIC_ env vars.
 */

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schema';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'ez8hxgaa';
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET    ?? 'production';

export default defineConfig({
  name:    'uix',
  title:   'UIX Studio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('UIX Content')
          .items([
            S.listItem()
              .title('Gallery Entries')
              .schemaType('galleryEntry')
              .child(S.documentTypeList('galleryEntry').title('Gallery Entries')),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
