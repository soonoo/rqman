/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  rewrites: () => {
    return [
      { 
        source: "/api/rqlite/:path*",
        destination: `${process.env.RQLITE_HOST || "http://localhost:4001"}/:path*`,
      },
    ];
  },
}

module.exports = nextConfig
