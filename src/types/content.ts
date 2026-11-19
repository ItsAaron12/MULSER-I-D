/**
 * Contratos de datos de LAB02.
 * Los componentes visuales solo conocen estos tipos, nunca el contenido concreto.
 */

/** Nombres de iconos disponibles. Se resuelven en components/ui/Icon.tsx. */
export type IconName =
  | "boxes"
  | "flask"
  | "refresh"
  | "orbit"
  | "cpu"
  | "workflow"
  | "arrow-up-right"
  | "arrow-right"
  | "check";

/** División o línea de trabajo; alimenta los filtros y las etiquetas. */
export interface Division {
  id: string;
  label: string;
  description?: string;
}

export type ProjectStatus = "development" | "laboratory" | "research";

export interface Project {
  /** Identificador estable; se usa en la URL /proyectos/[slug]/. */
  slug: string;
  name: string;
  /** Texto corto del icono (1–3 caracteres). */
  monogram: string;
  /** Debe coincidir con un `Division.id`. */
  division: Division["id"];
  status: ProjectStatus;
  /** Resumen para la tarjeta. */
  summary: string;
  /** Descripción conceptual para el modal y la ficha. */
  detail: string;
  /** Color de acento de la tarjeta (hex). */
  accent: string;
}

export type ServiceGroup = "capability" | "research";

export interface Service {
  id: string;
  group: ServiceGroup;
  title: string;
  description: string;
  icon: IconName;
}

export interface MethodStep {
  id: string;
  label: string;
  title: string;
  description: string;
}

export interface NavItem {
  /** Id de la sección de la página de inicio. */
  id: string;
  label: string;
}

export interface ContactChannel {
  label: string;
  href: string;
}
