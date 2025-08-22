// sanity.config.ts
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import schema from './sanity/schema';

export default defineConfig({
  name: 'default',
  title: 'Studio Daniel',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, // en Netlify env
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,      // en Netlify env
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema,
});
