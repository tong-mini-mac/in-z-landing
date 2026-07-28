import type { NextConfig } from "next";

const ERP_ORIGIN =
  process.env.INZ_ERP_ORIGIN || "https://erp-atlas-production.up.railway.app";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: `${ERP_ORIGIN}/admin`,
      },
      {
        source: "/admin/",
        destination: `${ERP_ORIGIN}/admin`,
      },
    ];
  },
};

export default nextConfig;
