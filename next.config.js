/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Для Vercel можно оставить true
  },
  // Если есть проблемы с билдом
  typescript: {
    ignoreBuildErrors: false, // Измените на true если TypeScript ошибки
  },
  eslint: {
    ignoreDuringBuilds: true, // Игнорировать ESLint при билде
  },
};

module.exports = nextConfig;
