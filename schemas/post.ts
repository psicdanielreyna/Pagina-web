// schemas/post.ts
import {defineField, defineType} from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    // ✅ Campo de fecha (regresado)
    defineField({
      name: "date",
      title: "Fecha de publicación",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Resumen",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "cover",
      title: "Portada",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", title: "Alt", type: "string" },
      ],
    }),

    defineField({
      name: "content",
      title: "Contenido",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt", type: "string" }],
        },
      ],
    }),
  ],

  orderings: [
    {
      title: "Más reciente",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Más antiguo",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      media: "cover",
      date: "date",
    },
    prepare({ title, media, date }) {
      const subtitle = date ? new Date(date).toLocaleDateString() : "";
      return { title, media, subtitle };
    },
  },
});
