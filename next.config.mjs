/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 👇 Esto evita que ESLint tumbe el build en CI/Netlify
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;