import type { ContactChannel, NavItem } from "@/types/content";

/**
 * Configuración institucional del sitio.
 * Cambiar aquí el estado de publicación, la navegación o los canales de contacto
 * no requiere tocar ningún componente.
 */
export const siteConfig = {
  name: "MULSER I+D",
  fullName: "MULSER Investigación y Desarrollo",
  lab: "LAB02",
  description:
    "Base tecnológica del ecosistema web institucional de MULSER I+D. Versión de demostración estática.",
  locale: "es",
  /** Sitio público e indexable; el contenido conserva su aviso editorial de revisión. */
  status: {
    published: true,
    label: "Maqueta de revisión",
  },
  cta: { label: "Explorar proyectos", href: "/#ecosistema" },
  nav: [
    { id: "inicio", label: "Inicio" },
    { id: "ecosistema", label: "Proyectos" },
    { id: "investigacion", label: "Investigación" },
    { id: "metodologia", label: "Método" },
    { id: "contacto", label: "Contacto" },
  ] satisfies NavItem[],
  /**
   * Canales oficiales de contacto. Permanece vacío hasta que MULSER I+D los apruebe.
   * Cuando se agreguen, el diálogo de contacto los mostrará automáticamente.
   */
  contactChannels: [] as ContactChannel[],
} as const;
