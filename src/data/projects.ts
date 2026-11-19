import type { Project } from "@/types/content";

/**
 * Proyectos de la maqueta. Textos heredados de LAB01, pendientes de aprobación editorial.
 * Para agregar un proyecto: añadir un objeto a esta lista (ver docs/CONTENIDO.md).
 */
export const projects: Project[] = [
  {
    slug: "eetil",
    name: "ÉETIL",
    monogram: "É",
    division: "aplicacion",
    status: "development",
    accent: "#29d9fa",
    summary:
      "Herramientas digitales para organizar el trabajo técnico, expedientes y actividades de campo.",
    detail:
      "Plataforma modular orientada al trabajo técnico. El alcance conceptual incluye organización de clientes, expedientes, actividades y herramientas de campo. Las funciones requieren validación antes de presentarse como disponibles.",
  },
  {
    slug: "bicha-bi",
    name: "BICHA BI",
    monogram: "BI",
    division: "aplicacion",
    status: "development",
    accent: "#ffab52",
    summary:
      "Conexión entre personas, prestadores de servicios, comercios y productos de su comunidad.",
    detail:
      "Concepto de mercado y conexión local entre personas que buscan servicios y quienes ofrecen servicios, productos o actividades comerciales. Su estructura de publicación y sus reglas están en evolución.",
  },
  {
    slug: "jun",
    name: "JUN",
    monogram: "J",
    division: "aplicacion",
    status: "development",
    accent: "#ed89e6",
    summary: "Bienestar personal, aprendizaje, creatividad y espacios de comunidad para todos.",
    detail:
      "Espacio inclusivo que explora cuidado personal, aprendizaje, talleres creativos y comunidad. Su diseño se revisa con énfasis en claridad, respeto y utilidad.",
  },
  {
    slug: "my-look-store",
    name: "MY LOOK STORE",
    monogram: "POS",
    division: "aplicacion",
    status: "laboratory",
    accent: "#79c7ff",
    summary:
      "Laboratorio de punto de venta, gestión comercial y herramientas de publicidad para negocios.",
    detail:
      "Prototipo de punto de venta con pruebas de flujos comerciales (POS-01). Su operación requiere más validaciones antes de considerarse una solución comercial.",
  },
  {
    slug: "ofnex",
    name: "OFNEX",
    monogram: "OF",
    division: "aplicacion",
    status: "development",
    accent: "#8ca2ff",
    summary: "Herramientas modulares para documentos y flujos de trabajo digitales.",
    detail:
      "Suite conceptual de herramientas para gestionar documentos y apoyar tareas de trabajo. Se estudia una arquitectura modular e interoperable.",
  },
  {
    slug: "nexar",
    name: "NEXAR",
    monogram: "NX",
    division: "investigacion",
    status: "research",
    accent: "#36e6c4",
    summary:
      "Investigación de sistemas de exploración, robótica y herramientas experimentales responsables.",
    detail:
      "Conjunto de investigaciones y pruebas de conceptos relacionados con robótica, exploración y herramientas cognitivas experimentales, sujeto a validación y supervisión humana.",
  },
];
