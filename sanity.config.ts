import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision"; // 👈 Importar plugin
import { structureTool } from "sanity/structure";

export default defineConfig({
  name: "default",
  title: "Mi Blog",
  projectId: "xxxx",
  dataset: "production",

  plugins: [
    structureTool(),
    visionTool(), // 👈 Activar la pestaña Vision
  ],
});
