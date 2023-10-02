/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => [
        {
            source: '/',
            destination: '/login',
            permanent: false
        }
    ],
    rewrites: async () => [
        {
            source: '/api/:path*',
            destination: 'https://payload-cms-development-6c1d.up.railway.app/api/:path*',
        },
    ],
}

module.exports = nextConfig
