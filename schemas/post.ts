// schemas/post.ts
const post = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    { name: "title", title: "Título", type: "string", validation: (r:any)=>r.required() },
    { name: "slug",  title: "Slug",   type: "slug", options: { source: "title" }, validation:(r:any)=>r.required() },
    { name: "excerpt", title: "Resumen", type: "text" },
    { name: "cover", title: "Portada", type: "image", options: { hotspot: true } },
    { name: "date", title: "Fecha", type: "datetime", initialValue: () => new Date().toISOString() },
    {
      name: "content",
      title: "Contenido",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
      validation:(r:any)=>r.required()
    },
  ],
  preview: {
    select: { title: "title", media: "cover", subtitle: "slug.current" },
  },
};

export default post;
