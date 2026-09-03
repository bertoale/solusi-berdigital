import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    IMAGE_BASE_URL: process.env.IMAGE_BASE_URL || "",
    S3_ENDPOINT: process.env.S3_ENDPOINT || "",
    S3_BUCKET: process.env.S3_BUCKET || "",
    WHATSAPP: process.env.WHATSAPP || "6285858089376",
    EMAIL: process.env.EMAIL || "bertoale.dev@gmail.com",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.nevaobjects.id",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
    ],
  },
};

export default nextConfig;
