/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")({});
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400", // Önbellekleme süreleri
          },
        ],
      },
    ];
  },
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  turboPack: {
    enabled: true, // TurboPack'ı etkinleştirme veya devre dışı bırakma
    polyfill: true, // TurboPack polyfill'ini etkinleştirme veya devre dışı bırakma
    targets: ["es5", "module"], // Hedef platformları belirleme (örneğin, es5, es6, es7)
    // Diğer TurboPack ayarlarını burada belirleyebilirsiniz
  },
  generateBuildId: async () => {
    // Rastgele bir sayı veya benzersiz bir kimlik oluşturabilirsiniz
    return "pogget";
  },
};

module.exports = nextConfig;
