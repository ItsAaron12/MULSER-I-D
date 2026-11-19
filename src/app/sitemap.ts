import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

// Next.js requiere que esta ruta se genere durante la compilación estática.
export const dynamic = "force-static";

/** Rutas públicas de MULSER. Se generan durante la exportación estática. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://itsaaron12.github.io/MULSER-I-D";
  return [
    { url: `${base}/`, priority: 1, changeFrequency: "monthly" },
    ...projects.map((project) => ({
      url: `${base}/proyectos/${project.slug}/`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
  ];
}
