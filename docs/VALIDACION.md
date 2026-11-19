# Validación

Ejecutada el 16 de noviembre de 2026 sobre una copia limpia extraída del ZIP, con `npm ci`
(Node 22.23.4, Next.js 16.4.6, TypeScript 5.9.3, Chromium 153).

## Resultado

| Área | Comando | Resultado |
|---|---|---|
| Calidad de código | `npm run lint` (ESLint, config de Next.js) | 0 errores, 0 advertencias |
| Tipos | `npm run typecheck` (TypeScript estricto + `noUncheckedIndexedAccess`) | 0 errores |
| Contraste de tokens | `npm run verify:contrast` | Todos los pares ≥ 4,5:1 (texto) y ≥ 3:1 (bordes de controles), en ambos temas |
| Compilación | `npm run build` | Correcta; 10 rutas estáticas |
| Exportación estática | `npm run verify:static` | `index`, `404` y 6 fichas generados; 72 archivos, 2,85 MB; sin recursos externos, backend ni mapas de código |
| Accesibilidad (HTML exportado) | `npm run verify:a11y` (axe-core + jsdom) | 0 violaciones en 8 páginas |
| Dependencias | `npm audit --omit=dev` | 0 vulnerabilidades |
| Navegador real | `python3 scripts/qa/browser-check.py` | **47/47** comprobaciones |

`npm run validate` encadena las primeras siete.

## Qué cubre la prueba en navegador (Chromium)

- **Ambos temas** (oscuro/claro): axe-core con reglas WCAG 2.0/2.1/2.2 A y AA **incluido el contraste calculado**,
  sin errores de consola ni desbordamiento horizontal.
- **Navegación:** anclas, scroll-spy (`aria-current`), ficha `/proyectos/<slug>/`, regreso a `/#ecosistema`
  desde otra página, menú móvil (apertura, Escape, cierre al navegar).
- **Interacciones:** filtros (6 → 1 → 5 → 6 proyectos, `aria-pressed`), modal de proyecto y de contacto
  (apertura con teclado, foco atrapado con Tab/Shift+Tab, Escape, clic en el fondo, foco devuelto al botón de origen,
  scroll restaurado), conmutador de tema (persiste al recargar sin parpadeo) y de animaciones (persiste).
- **Preferencias de accesibilidad:** con `prefers-reduced-motion` el contenido aparece sin movimiento y el
  conmutador se bloquea explicando por qué; sin JavaScript el contenido es legible.
- **Móvil:** 375 px y 320 px sin desbordamiento, objetivos táctiles ≥ 40 px, cabecera sin elementos cortados.

Capturas de referencia en `docs/capturas/`.

## Defectos encontrados y corregidos durante la validación

1. El botón «Explorar proyectos» de la cabecera no se ocultaba bajo 1024 px (conflicto `hidden`/`inline-flex`).
2. Nombre accesible de la marca no contenía el texto visible «MULSER I+D» (axe `label-content-name-mismatch`).
3. Salto de encabezados h1 → h3 bajo el hero (se añadió un h2 de sección).
4. Con animaciones pausadas, el HTML pre-renderizado mostraba bloques ocultos hasta la hidratación (ahora se resuelve en CSS).
5. Botones de la cabecera se encogían por debajo de 40 px en móvil.
6. `npm run typecheck` fallaba en una instalación limpia (faltaban los tipos generados por Next); ahora ejecuta `next typegen` primero.
7. Recuadro negro del PNG oficial visible sobre el escenario del hero (se difuminan sus bordes con una máscara CSS; el archivo no se modifica).

## Límites conocidos (lo que **no** se probó)

- Solo se probó Chromium. **Firefox, Safari y un teléfono Android real siguen pendientes** (criterio de `docs/PUBLICACION.md`).
- No se probó con lector de pantalla (NVDA, VoiceOver, TalkBack). axe-core detecta una parte de los problemas WCAG; no sustituye una revisión manual.
- La exportación se sirvió con un servidor de archivos local; no se probó en el hosting definitivo (aún sin decidir).
- Las animaciones de **salida** entre páginas no están implementadas (ver `docs/ARQUITECTURA.md`).
- `eslint@9` aparece como «sin soporte» en `npm`; se fijó la serie 9 por compatibilidad con `eslint-config-next@16`. Revisar al actualizar.

## LAB01 intacta

LAB01 no se modificó. Huellas SHA-256 del paquete original recibido (`MULSER_ID_WEB_LAB01_Paquete_Aaron_20261113.zip`):

```
e0a3c462c56a01c3d968772cc8b6acd58c1a771c7fb88a1d98fd3d830d950b47  (ZIP completo)
16fea57b7b7cfce5423e6833ab41a7fa318cf13f090c6121ca946fbf856a5b5f  index.html
2e19eebb79ccb76dbc0b8e12057ce23ff8f6d404ea83d9a20830b6ac1c54a72c  assets/logo-oficial-mulser-id.png
```

El logotipo de LAB02 (`src/assets/brand/`) es una copia byte a byte del original.
