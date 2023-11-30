/** @type {import('next').NextConfig} */
const nextConfig = {
  // アンスプラッシュを使うための設定↓
  images: {
    domains: ["source.unsplash.com"],
  },
};
module.exports = nextConfig;
