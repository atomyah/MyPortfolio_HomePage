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
};
module.exports = nextConfig;
