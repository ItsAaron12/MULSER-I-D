import type { Division } from "@/types/content";

/**
 * Divisiones / líneas de trabajo. Agregar una entrada crea automáticamente
 * su filtro; después basta con asignar `division` a los proyectos que correspondan.
 */
export const divisions: Division[] = [
  { id: "aplicacion", label: "Aplicaciones", description: "Software para necesidades reales." },
  { id: "investigacion", label: "Investigación", description: "Líneas experimentales con método." },
];

export const projectStatusLabels = {
  development: "En desarrollo",
  laboratory: "Laboratorio",
  research: "Investigación",
} as const;
