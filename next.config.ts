import type { NextConfig } from "next";
import { securityHeaders } from "./src/lib/security-headers";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  experimental: {
    globalNotFound: true,
    inlineCss: true,
  },
  poweredByHeader: false,
  headers() {
    return [{ source: "/:path*", headers: [...securityHeaders] }];
  },
};

export default nextConfig;
