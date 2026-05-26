import type { NextConfig } from "next";
import path from "path";

const monorepoRoot = path.join(__dirname, "../..");

const projectsUrl =
  process.env.PROJECTS_API_URL ?? "http://localhost:3001";
const blogUrl = process.env.BLOG_API_URL ?? "http://localhost:3002";

const nextConfig: NextConfig = {
  outputFileTracingRoot: monorepoRoot,
  transpilePackages: ["@portfolio/types"],
  async rewrites() {
    return [
      {
        source: "/api/projects/:path*",
        destination: `${projectsUrl}/api/projects/:path*`,
      },
      {
        source: "/api/blog/:path*",
        destination: `${blogUrl}/api/blog/:path*`,
      },
    ];
  },
};

export default nextConfig;
