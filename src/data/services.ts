import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    id: "software-util",
    group: "capability",
    icon: "boxes",
    title: "Software útil",
    description: "Aplicaciones pensadas para necesidades reales",
  },
  {
    id: "investigacion-aplicada",
    group: "capability",
    icon: "flask",
    title: "Investigación aplicada",
    description: "Ideas, simulaciones y validación técnica",
  },
  {
    id: "evolucion-continua",
    group: "capability",
    icon: "refresh",
    title: "Evolución continua",
    description: "Prototipos, pruebas y nuevas versiones",
  },
  {
    id: "robotica-exploracion",
    group: "research",
    icon: "orbit",
    title: "Robótica y exploración",
    description:
      "Estudio de plataformas y sensores para entornos de investigación, con supervisión y control.",
  },
  {
    id: "computacion-experimental",
    group: "research",
    icon: "cpu",
    title: "Computación experimental",
    description:
      "Investigación conceptual y pruebas para comprender arquitecturas y métodos alternativos.",
  },
  {
    id: "integracion-herramientas",
    group: "research",
    icon: "workflow",
    title: "Integración de herramientas",
    description:
      "Arquitecturas modulares que permitan conectar soluciones sin comprometer la seguridad.",
  },
];
