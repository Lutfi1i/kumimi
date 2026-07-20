import type { NextConfig } from "next";

const API_BASE = process.env.NEXT_PUBLIC_KUMIMI_API_URL?.replace(/\/$/, "") || "http://localhost:4000";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/proxy-image",
        destination: `${API_BASE}/api/proxy-image`,
      },
    ];
  },
};

export default nextConfig;
