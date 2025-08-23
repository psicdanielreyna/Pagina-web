// sanity.config.ts
import {defineConfig} from 'sanity';
import {deskTool} from 'sanity/desk';     // 👈 ESTA es la herramienta correcta
import {visionTool} from '@sanity/vision';

import schemas from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Mi Blog Daniel Reyna',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [deskTool(), visionTool()],    // 👈 deskTool en lugar de structureTool
  schema: {
    types: schemas,
  },
});
