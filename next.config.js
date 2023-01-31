/** @type {import('next').NextConfig} */
const path = require('path');
require('dotenv').config();
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    swcMinify: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    experimental: {
        fontLoaders: [{ loader: '@next/font/google', options: { subsets: ['latin'] } }],
    },
};

module.exports = nextConfig;
