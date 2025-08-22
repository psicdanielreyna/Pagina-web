/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io', // permite imágenes que vienen de Sanity
      },
    ],
  },
}

export default nextConfig
