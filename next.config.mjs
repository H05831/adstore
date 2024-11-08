import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "utfs.io",
      "images.pexels.com",
      "images.unsplash.com",
    ],
  },
};

export default nextConfig;
