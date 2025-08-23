import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: r => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({ name: "publishedAt", title: "Fecha", type: "datetime" }),
    defineField({ name: "excerpt", title: "Resumen", type: "text" }),
    defineField({
      name: "cover",
      title: "Portada",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt", type: "string" }],
    }),
    defineField({
      {
      name: "content",
      title: "Contenido",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Texto alternativo" }],
        },
      ],
},
    }),
  ],
});
