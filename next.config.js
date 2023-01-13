/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    experimental: {
        fontLoaders: [{ loader: '@next/font/google', options: { subsets: ['latin'] } }],
    },
};

module.exports = nextConfig;
