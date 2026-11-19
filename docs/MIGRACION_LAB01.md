# Migración LAB01 → LAB02

LAB01 (`index.html` único, ~27 KB, sin frameworks) permanece **intacta** como respaldo; LAB02 es un proyecto nuevo.

| LAB01 | LAB02 |
|---|---|
| CSS en `<style>` y variables `--cyan/--orange/...` | `src/styles/tokens.css` + utilidades Tailwind; añade tema claro |
| Cabecera, menú móvil, botón «Explorar proyectos» | `Header`, `Navbar`, `Button` |
| Hero con logotipo, métricas | `Hero`, `ServiceCard` (variante compacta) |
| Objeto JS `details` y tarjetas escritas a mano | `src/data/projects.ts` → `ProjectCard`, `ProjectModal` |
| Filtros `data-filter` con ocultar/mostrar | `CategoryFilter` derivado de `divisions` |
| Investigación (3 líneas), método (4 pasos) | `ResearchSection` + `services.ts`; `MethodSection` + `method.ts` |
| Diálogo con foco fijo en «Cerrar» | `Modal` con foco atrapado, Escape y restauración de foco |
| Contacto provisional | `ContactSection` (mismo texto; canales en `siteConfig`) |
| Texto «Maqueta de revisión · No publicada» | `siteConfig.status` + `robots: noindex` |

**Cambios de comportamiento deliberados:** nuevas fichas `/proyectos/<slug>/`, tema claro/oscuro, control de
animaciones, tipografía Space Grotesk, `noindex`. **No se cambió** ningún texto institucional ni el logotipo.
Se respetan los límites de LAB01: sin backend, sin formularios, sin datos personales, sin claves ni
información interna.
