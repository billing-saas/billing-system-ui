import type { NextConfig } from "next";

console.log("NEXT_PUBLIC_AAAS_URL:", process.env.NEXT_PUBLIC_AAAS_URL);
const nextConfig: NextConfig = {

  async rewrites() {
    return [
      {
        source: '/aaas/:path*',
        destination: process.env.NEXT_PUBLIC_AAAS_URL + '/:path*',
      },
    ];
  },
};

export default nextConfig;