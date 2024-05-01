/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	env: {
		NEXT_PUBLIC_API_URI: process.env.NEXT_PUBLIC_API_URI,
	},
};

module.exports = nextConfig;
