import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "explorer-api.walletconnect.com",
        pathname: "/v3/logo/**",
      },
    ],
  },
};

export default nextConfig;
