/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "utfs.io",
      "images.pexels.com",
      "images.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
