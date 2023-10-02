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
            destination: 'http://localhost:3000/api/:path*',
        },
    ],
}

module.exports = nextConfig
