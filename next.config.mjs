/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Agrega aquí los dominios desde donde sirves imágenes
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "danielreyna.com" },
      { protocol: "https", hostname: "assets.st-note.com" }, // ej. si lo necesitas
      // { protocol: "https", hostname: "tu-cdn.com" },
    ],
  },
};

export default nextConfig;
