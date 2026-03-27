/**
 * UIX — Sanity CLI Config
 * Phase 5 · v1.0
 *
 * Used by the Sanity CLI for deploy, migrations, etc.
 * Run: npx sanity@latest deploy
 */

import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'ez8hxgaa',
    dataset: 'production',
  },
  studioHost: 'uix',
});
