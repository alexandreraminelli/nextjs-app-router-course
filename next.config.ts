import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */

  // Recursos experimentais
  experimental: {
    ppr: "incremental",
  },
}

export default nextConfig
