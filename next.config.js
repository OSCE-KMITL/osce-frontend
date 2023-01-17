/** @type {import('next').NextConfig} */
const path = require('path');
require('dotenv').config();
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    experimental: {
        fontLoaders: [{ loader: '@next/font/google', options: { subsets: ['latin'] } }],
    },
};

module.exports = nextConfig;
