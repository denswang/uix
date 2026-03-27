/**
 * UIX — Sanity Studio Config
 * Phase 5 · v1.0
 *
 * Used by Sanity CLI to deploy the Studio to Sanity Cloud.
 * Run from Dennis's Mac: npx sanity@latest deploy
 * Studio will be live at: https://uix.sanity.studio
 *
 * The Next.js app uses @sanity/client directly — this config
 * is NOT imported by the Next.js build.
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
