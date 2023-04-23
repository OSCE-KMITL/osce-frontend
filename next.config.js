/** @type {import('next').NextConfig} */
const path = require('path');
require('dotenv').config();
const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                ],
            },
        ];
    },
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
// next.config.js
