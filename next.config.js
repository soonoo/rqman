/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: () => {
    return [
      { 
        source: "/api/rqlite/:path*",
        destination: "http://localhost:4001/:path*",
      },
    ];
  },
}

module.exports = nextConfig
