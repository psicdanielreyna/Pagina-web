// app/studio/[[...index]]/page.tsx
'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config'; // ajusta la ruta si tu sanity.config.ts está en otro lugar

export default function StudioPage() {
  return <NextStudio config={config} />;
}
