export type Recurso = {
  slug: string;
  title: string;
  excerpt: string;
  img: string;
  alt: string;
  href: string; // a la página del recurso (tienda/[slug])
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  img: string;
  alt: string;
  href: string; // a la página del post
};
