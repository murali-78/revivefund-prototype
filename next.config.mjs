/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    // Safety net: don't block deploys on lint warnings
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    outputFileTracingIncludes: {
      "/**/*": ["./prisma/dev.db"],
    },
  },
};

export default nextConfig;
