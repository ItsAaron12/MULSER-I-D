
import type { NextConfig } from "next";

/**
 * LAB02 es una demostración estática: `next build` genera la carpeta `out/`
 * lista para cualquier hosting de archivos (sin Node, sin backend).
 *
 * Para publicarla bajo una subruta (p. ej. /lab02) define
 * NEXT_PUBLIC_BASE_PATH=/lab02 antes de compilar.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,

  // Permite el acceso desde la red local durante el desarrollo.
  allowedDevOrigins: ["192.168.1.116", "192.168.1.121"],
};

export default nextConfig;
