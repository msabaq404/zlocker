import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: "/zlocker", // Set base path to match repo name
  assetPrefix: "/zlocker/", // Ensure assets load correctly
};

export default nextConfig;
