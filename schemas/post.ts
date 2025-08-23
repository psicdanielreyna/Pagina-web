const post = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Título" },
    { name: "slug", type: "slug", title: "Slug", options: { source: "title" } },
    { name: "content", type: "text", title: "Contenido" },
  ],
};

export default post;
