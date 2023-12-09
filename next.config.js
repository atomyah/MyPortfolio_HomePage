/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      // アンスプラッシュを使うための設定↓ // Cloudinaryを使うための設定↓
    domains: ["source.unsplash.com","res.cloudinary.com"],
  },
  env: { // Cloudinaryを使うための環境変数（.env.localに書いても動く.）
    // NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "atomyah",
    // NEXT_PUBLIC_CLOUDINARY_PRESET_NAME:"atomyah"
  },
};
module.exports = nextConfig;
