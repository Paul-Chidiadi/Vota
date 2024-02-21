/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vota.onrender.com",
      },
    ],
  },
};

module.exports = nextConfig;
