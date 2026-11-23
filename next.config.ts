import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["varied-wrongly-jokingly.ngrok-free.dev"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      { protocol: "https", hostname: "api.dicebear.com" },
    ],
  },

  experimental: {
    inlineCss: true,
  },

  cacheComponents: true,
  partialPrefetching: true,

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
