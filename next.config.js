/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// Cloudinaryを使うための設定↓
		remotePatterns: [
			{
				protocol: "http",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/atomyah/**",
			},
		],
	},
	// images: {
	//   // Cloudinaryを使うための設定↓
	//   domains: ["res.cloudinary.com"],
	// },

	// dockerコンテナからホットリロード可能にする設定
	reactStrictMode: true,
    swcMinify: true,
    webpack: (config, context) => {
        config.watchOptions = {
            ignored: /node_modules/,
            poll: 1000,
            aggregateTimeout: 300
        }
        return config
    }
};
module.exports = nextConfig;
