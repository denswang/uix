/**
 * UIX — Sanity Schema
 * Phase 4 · v1.0
 *
 * galleryEntry document type.
 *
 * To use: paste this schema into your Sanity Studio project's
 * schemaTypes array (schemaTypes/index.ts).
 *
 * Sanity Studio setup:
 *   npm create sanity@latest -- --project YOUR_PROJECT_ID --dataset production
 *   Then copy this schema into the studio project.
 */

export const galleryEntrySchema = {
  name: 'galleryEntry',
  title: 'Gallery Entry',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Gallery title — max 8 words, architectural voice. E.g. "SaaS Onboarding — Linear Pattern"',
      validation: (R: any) => R.required().max(80),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 80 },
      validation: (R: any) => R.required(),
    },
    {
      name: 'description',
      title: 'Editorial Description',
      type: 'text',
      rows: 4,
      description: '2–3 sentences in UIX voice. Structural, no marketing fluff.',
      validation: (R: any) => R.required().max(400),
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      description: 'Upload to Sanity — or reference a DO Spaces CDN URL via external URL field.',
      options: { hotspot: true },
      validation: (R: any) => R.required(),
    },
    {
      name: 'source',
      title: 'Source Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Framer', value: 'Framer' },
          { title: 'Webflow', value: 'Webflow' },
          { title: 'Awwwards', value: 'Awwwards' },
          { title: 'Siteinspire', value: 'Siteinspire' },
          { title: 'Godly', value: 'Godly' },
          { title: 'UIX Original', value: 'UIX' },
        ],
        layout: 'radio',
      },
      validation: (R: any) => R.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: '3–5 tags. E.g. SaaS, Onboarding, Dark Mode.',
      validation: (R: any) => R.required().min(2).max(6),
    },
    {
      name: 'blueprintNote',
      title: 'Blueprint Mode Annotation',
      type: 'string',
      description: '1 sentence — structural logic visible in Blueprint Mode. E.g. "4-column inner grid, 80px vertical rhythm"',
      validation: (R: any) => R.required().max(200),
    },
    {
      name: 'affiliateUrl',
      title: 'Affiliate / CTA URL',
      type: 'url',
      description: 'Affiliate link or direct product URL — used for CTA button.',
      validation: (R: any) => R.required(),
    },
    {
      name: 'affiliatePrice',
      title: 'Price Display',
      type: 'string',
      description: 'Display price for CTA. E.g. "$49", "$79", "Free".',
    },
    {
      name: 'isPlayable',
      title: 'Is Playable (Interactive Flow)',
      type: 'boolean',
      description: 'Enable to render PlayableEmbed on the detail page.',
      initialValue: false,
    },
    {
      name: 'embedUrl',
      title: 'Embed URL',
      type: 'url',
      description: 'Required if Is Playable is enabled. Framer embed URL or Figma prototype link.',
      hidden: ({ document }: any) => !document?.isPlayable,
    },
    {
      name: 'embedType',
      title: 'Embed Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Framer', value: 'framer' },
          { title: 'Figma', value: 'figma' },
        ],
        layout: 'radio',
      },
      hidden: ({ document }: any) => !document?.isPlayable,
    },
    {
      name: 'ogImage',
      title: 'OG Image (optional)',
      type: 'image',
      description: 'Overrides thumbnail for social sharing. Recommended 1200×630.',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      source: 'source',
      media: 'thumbnail',
    },
    prepare({ title, source, media }: any) {
      return { title, subtitle: source, media };
    },
  },
  orderings: [
    {
      title: 'Published, Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
};

/** Export as array for Sanity Studio schemaTypes */
export const schemaTypes = [galleryEntrySchema];
