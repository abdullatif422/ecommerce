import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  publicRuntimeConfig: {
    baseUrl:
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_DEV_VERCEL_URL || "http://localhost:3000"
        : process.env.NEXT_PUBLIC_PROD_VERCEL_URL ||
          "https://your-production-url.com",
  },
};

export default nextConfig;
