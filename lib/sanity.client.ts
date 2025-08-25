import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-01-01", // o la fecha que prefieras
  useCdn: true, // true = cacheado en edge (más rápido, pero puede no ser inmediato)
});
