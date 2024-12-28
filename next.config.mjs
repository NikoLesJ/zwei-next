/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: "/(.*)", // применить ко всем маршрутам
          headers: [
            {
              key: "X-Robots-Tag",
              value: "noindex, nofollow",
            },
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  