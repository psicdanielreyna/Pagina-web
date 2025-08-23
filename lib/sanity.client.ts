import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: true, // usar caché para lecturas rápidas
  apiVersion: "2023-01-01", // o la fecha de hoy
});
