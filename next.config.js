/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Разрешаем внешние изображения если нужно
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Убираем предупреждение о качестве
    qualities: [75, 90],
  },
  // Убираем ESLint из конфига
};

module.exports = nextConfig;
