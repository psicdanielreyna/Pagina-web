// schemas/index.ts
import post from "./post";

export default [post];
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Título" },
    { name: "slug", type: "slug", title: "Slug", options: { source: "title" } },
    { name: "date", type: "datetime", title: "Fecha" },
    { name: "excerpt", type: "text", title: "Extracto" },
    { name: "body", type: "array", of: [{ type: "block" }], title: "Contenido" },
  ],
});

export const schemaTypes = [post];
