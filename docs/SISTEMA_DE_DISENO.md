# Sistema de diseño institucional

## Tokens (`src/styles/tokens.css`)

| Token | Oscuro (LAB01) | Claro | Uso |
|---|---|---|---|
| `--bg` / `--bg-alt` | `#07111f` / `#0a1828` | `#f3f7fb` / `#e6eef6` | Fondo de página / secciones alternas |
| `--surface` / `--surface-2` | `#0c1d31` / `#11273d` | `#ffffff` / `#f0f5fa` | Tarjetas y controles |
| `--fg` / `--muted` | `#f1f7fd` / `#a6b9ca` | `#0a1a2a` / `#43596c` | Texto principal / secundario |
| `--brand` | `#29dafc` | `#00708f` | Cian institucional (enlaces, foco, filtros) |
| `--ember` | `#ff9c2a` | `#a64b00` | Naranja institucional (etiquetas, acentos) |
| `--azure` | `#317dff` | `#1f5fd0` | Azul de apoyo |
| `--line` / `--control` | `#29465e` / `#5f8aa9` | `#b9cddd` / `#6a86a0` | Borde decorativo / borde de controles (≥ 3:1) |

También definen sombras (`--sh-card/glow/panel`), fondo del escenario del hero, orbes y retícula del fondo,
y los valores del vidrio (`--glass-*`). Tipografía: **Space Grotesk** (títulos, autoalojada vía npm, sin
peticiones externas) y la pila del sistema para el texto corrido.

Cambiar un valor en `tokens.css` cambia todo el sitio. Los tokens se usan en componentes como `bg-surface`,
`text-muted`, `border-control`, `rounded-card`, `shadow-card`, `font-display`.

## Temas

`data-theme="dark" | "light"` en `<html>`. Un script mínimo (`PREFERENCES_INIT_SCRIPT`) lo fija antes del primer
pintado: usa la preferencia guardada o, si no hay, la del sistema. Sin JavaScript queda el tema oscuro.
`ThemeProvider` expone `useTheme()`. El escenario del logotipo se mantiene oscuro en ambos temas porque el
PNG oficial tiene fondo oscuro.

## Animaciones

Todas leen de `src/config/motion.ts` (duraciones, curva, parallax, interruptores por función) y pasan por
`MotionProvider`, que decide una sola regla:

1. `prefers-reduced-motion: reduce` del sistema → **sin animaciones**, siempre.
2. El visitante puede pausarlas con el botón de la cabecera (se recuerda; bloqueado si el sistema ya las reduce).
3. Con animaciones pausadas, el contenido se muestra de inmediato (regla CSS sobre `data-motion="off"`); sin JS
   y en impresión también queda visible.

Incluidas: entrada al hacer scroll (`AnimatedSection`), transición de página, fondo animado (solo `transform`),
parallax moderado del hero (±56 px), anillos orbitales, tarjetas con destello que sigue al puntero,
filtro con entrada/salida, modales, microinteracciones de botones. El vidrio (`.glass`) se limita a la barra de
contexto del hero, el menú móvil y los diálogos.

## Accesibilidad

Enlace de salto, un solo `h1`, jerarquía de encabezados sin saltos, navegación con `aria-current`, menú móvil con
`aria-expanded`, filtros con `aria-pressed` y anuncio del número de resultados (`aria-live`), modal con foco
atrapado, `Escape`, restauración del foco y bloqueo de scroll, objetivos táctiles ≥ 44 px, foco visible,
contrastes verificados en ambos temas (`npm run verify:contrast`).
