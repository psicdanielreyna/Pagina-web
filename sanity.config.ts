// sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import schemas from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Mi Blog',
  // Asegúrate de tener estos envs en Netlify:
  // NEXT_PUBLIC_SANITY_PROJECT_ID y NEXT_PUBLIC_SANITY_DATASET
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  // 👇 Nada de "studio" aquí. Solo las tools soportadas:
  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemas,
  },
})
