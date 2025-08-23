import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import schemas from "./schemas"; // aquí importa tu carpeta de esquemas

export default defineConfig({
  name: "default",
  title: "Mi Blog Daniel Reyna",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, 
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemas,
  },
});
