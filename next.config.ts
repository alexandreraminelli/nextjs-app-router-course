import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */

  // Recursos experimentais
  experimental: {
    // Pré-renderização parcial
    ppr: "incremental",
  },
}

export default nextConfig
