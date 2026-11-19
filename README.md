# MULSER I+D · WEB LAB02

Primera base tecnológica del ecosistema web institucional de MULSER I+D. Migración de la maqueta
`MULSER_ID_WEB_LAB01` (HTML único) a una arquitectura FrontEnd modular, reutilizable y escalable.

> **Estado:** sitio de demostración público en GitHub Pages, autorizado para indexación.
> El contenido conserva la etiqueta editorial «Maqueta de revisión»; ver `docs/PUBLICACION.md`.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (estricto) · Tailwind CSS 4 · Motion para React ·
Lucide React · ESLint. Three.js / React Three Fiber **no** son dependencias (ver `docs/ARQUITECTURA.md`).

## Uso

Requiere Node.js ≥ 20.9 (se recomienda 22; ver `.nvmrc`).

```bash
npm ci              # instala exactamente lo bloqueado en package-lock.json
npm run dev         # desarrollo en http://localhost:3000
npm run build       # genera el sitio estático en out/
npm start           # sirve out/ localmente
npm run validate    # lint + tipos + contraste + build + verificación estática + accesibilidad
```

`out/` es una carpeta de archivos estáticos: se puede abrir desde cualquier hosting de archivos, sin Node,
sin backend ni base de datos. Para publicarla en una subruta: `NEXT_PUBLIC_BASE_PATH=/lab02 npm run build`.

## Estructura

```
src/
  app/            Rutas (inicio, /proyectos/[slug]/, 404), layout, template (transición), estilos globales
  components/
    layout/       Header, Navbar, Footer, ThemeToggle, MotionToggle
    sections/     Hero, ProjectsSection, ResearchSection, MethodSection, ContactSection
    ui/           Button, ServiceCard, ProjectCard, CategoryFilter, ProjectModal, Modal, SectionContainer, Icon
    motion/       AnimatedBackground, AnimatedSection
    providers/    ThemeProvider, MotionProvider
  config/         site.ts (marca, navegación, estado), motion.ts (parámetros de animación), preferences.ts
  data/           projects, services, divisions, method, site-content  ← contenido, sin JSX
  lib/            content-source (acceso a datos), preference-store, cn
  styles/         tokens.css  ← sistema de diseño institucional
  types/          Contratos de datos
scripts/          verify-static, audit-a11y, check-contrast, qa/browser-check.py
docs/             Arquitectura, sistema de diseño, contenido, publicación, validación
```

## Documentación

| Documento | Contenido |
|---|---|
| `docs/ARQUITECTURA.md` | Decisiones, flujo de datos, extensibilidad, integraciones futuras, 3D |
| `docs/SISTEMA_DE_DISENO.md` | Tokens, temas, animaciones y accesibilidad |
| `docs/CONTENIDO.md` | Cómo agregar proyectos, servicios, divisiones y secciones |
| `docs/MIGRACION_LAB01.md` | Qué se conservó de LAB01 y dónde vive ahora |
| `docs/PUBLICACION.md` | Criterios de publicación heredados y pasos de despliegue |
| `docs/VALIDACION.md` | Resultados de las pruebas y límites conocidos |
