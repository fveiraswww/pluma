import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    instrumentationHook: true,
    serverComponentsExternalPackages: ["pdf-parse"],
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "obsproject.com",
      },
      {
        protocol: "https",
        hostname: "kick.com",
      },
      {
        protocol: "https",
        hostname: "twitch.com",
      },
      {
        protocol: "https",
        hostname: "assets.basehub.com",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
})(nextConfig);
