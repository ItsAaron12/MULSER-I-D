# Arquitectura

## Principios

1. **Datos separados de la interfaz.** `src/data/*` solo contiene objetos tipados (`src/types/content.ts`).
   Los componentes reciben datos por props y no conocen proyectos concretos.
2. **Un punto de acceso al contenido.** Las páginas leen mediante `contentSource` (`src/lib/content-source.ts`),
   una interfaz asíncrona. Hoy devuelve datos locales; mañana puede leer una API, un CMS o un servicio de MULSER
   sin tocar páginas ni componentes. En exportación estática esa lectura ocurre en la compilación.
3. **Sistema de diseño central.** Colores, sombras, radios y tipografía viven en `src/styles/tokens.css` y se
   exponen como utilidades de Tailwind en `src/app/globals.css`. Ningún componente define colores propios.
4. **Servidor por defecto, cliente solo si hace falta.** Son componentes cliente únicamente los que usan estado,
   efectos o Motion (filtros, modal, navegación móvil, animaciones, proveedores).
5. **Estático y sin dependencias de servicio.** `output: "export"`, `trailingSlash: true`, imágenes sin optimizador.

## Componentes solicitados

Header · Navbar · Hero · Footer · Button · ServiceCard · ProjectCard · CategoryFilter · ProjectModal ·
SectionContainer · AnimatedBackground · AnimatedSection · ThemeProvider (más `Modal`, `MotionProvider`,
`ThemeToggle`, `MotionToggle` e `Icon` como piezas de apoyo). Todos tienen tipos de props explícitos.

## Extensibilidad (sin reconstruir la arquitectura)

| Necesidad | Qué se toca |
|---|---|
| Nuevo proyecto | Un objeto en `src/data/projects.ts` → tarjeta, modal, filtro y ficha `/proyectos/<slug>/` aparecen solos |
| Nueva división | Un objeto en `src/data/divisions.ts` → aparece como filtro cuando tiene proyectos |
| Nuevo servicio / línea | Un objeto en `src/data/services.ts` (`group`: `capability` o `research`) |
| Nueva sección | Un componente con `SectionContainer`, una entrada en `siteConfig.nav` y una línea en `app/page.tsx` |
| Nuevo icono | Importarlo en `components/ui/Icon.tsx` y añadir su nombre a `IconName` |
| Nueva página | Una carpeta en `src/app/` (hereda Header, Footer, fondo y transición) |

## Integraciones futuras

- **APIs / CMS / sistemas propios:** implementar `ContentSource` y asignarla a `contentSource`. Para contenido
  que cambie sin recompilar, añadir una ruta dinámica o un cliente de datos; entonces se abandona
  `output: "export"` de forma consciente.
- **Formularios y contacto:** hoy `siteConfig.contactChannels` está vacío a propósito (canales no aprobados).
- **Experiencia WEB-03 «El Despertar»:** debe ser un módulo opcional. Se recomienda una ruta propia
  (`src/app/experiencias/...`) cargada con `next/dynamic` y `ssr: false`, de modo que el sitio institucional
  funcione sin ella.

## Three.js y React Three Fiber

No están instalados ni referenciados. Para incorporarlos más adelante: instalarlos **solo** en la ruta que los
use, cargarlos con `next/dynamic` (`ssr: false`), ofrecer una alternativa 2D y respetar `useMotionPreference()`
(`animate === false` → no renderizar el lienzo animado). Así LAB02 no cambia de peso ni de requisitos.

## Transiciones entre páginas

`app/template.tsx` anima la **entrada** de cada página (se remonta en cada navegación). Las animaciones de
**salida** entre rutas no son prácticas en App Router sin librerías adicionales o la API de View Transitions;
queda documentado como mejora progresiva. Las entradas/salidas dentro de la página sí existen (filtro de
proyectos y modales usan `AnimatePresence`).
