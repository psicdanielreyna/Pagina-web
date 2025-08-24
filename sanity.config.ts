// sanity.config.ts
import {defineConfig} from "sanity";
import {deskTool} from "sanity/desk";
import schemas from "./schemas"; // 👈 importa el índice

export default defineConfig({
  name: "default",
  title: "Mi Blog Daniel Reyna",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [deskTool()],
  schema: {
    types: schemas, // 👈 usa el arreglo que exporta ./schemas/index.ts
  },
});
