import { divisions } from "@/data/divisions";
import { methodSteps } from "@/data/method";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import type { Division, MethodStep, Project, Service } from "@/types/content";

/**
 * Punto único de acceso al contenido.
 *
 * LAB02 usa datos estáticos locales. Para integrar en el futuro una API, un CMS o
 * un servicio propio de MULSER basta con ofrecer otra implementación de esta interfaz
 * (las páginas ya la consumen de forma asíncrona, durante la compilación).
 */
export interface ContentSource {
  getProjects(): Promise<Project[]>;
  getProject(slug: string): Promise<Project | undefined>;
  getServices(): Promise<Service[]>;
  getDivisions(): Promise<Division[]>;
  getMethodSteps(): Promise<MethodStep[]>;
}

export const staticContentSource: ContentSource = {
  getProjects: async () => projects,
  getProject: async (slug) => projects.find((p) => p.slug === slug),
  getServices: async () => services,
  getDivisions: async () => divisions,
  getMethodSteps: async () => methodSteps,
};

/** Fuente activa. Cambiar aquí para conectar un origen distinto. */
export const contentSource: ContentSource = staticContentSource;
