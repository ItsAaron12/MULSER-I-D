# MULSER I+D · LAB02.1 — Correcciones de estabilidad

Fecha: 18 de noviembre de 2026. Estado: maqueta de revisión, no publicar sin aprobación.

## Respaldo
- Antes de modificar se generó `..\MULSER_LAB02_BACKUP_20261118.zip`.
- No se modificaron los textos de los proyectos, el logotipo ni la condición `noindex`.

## Cambios aplicados
- `next.config.ts`: se autorizaron las IP de desarrollo 192.168.1.116 y 192.168.1.121. Actualizar si la IP cambia.
- `src/app/layout.tsx`: carga temprana del script de preferencias con `next/script`, estrategia `beforeInteractive`.
- `src/config/preferences.ts`: tema institucional oscuro como valor inicial homogéneo entre navegadores. Las preferencias elegidas manualmente siguen persistiendo por origen.
- `src/components/layout/Header.tsx`: distribución compacta en teléfonos estrechos.
- `src/components/layout/Navbar.tsx`: prioridad de apilamiento del botón/panel, anchura disponible y desplazamiento del menú.
- `src/app/globals.css`: transición de entrada discreta del menú móvil; respeta movimiento reducido y activación explícita.

## Verificaciones
- `npm run validate`: ESLint, tipos, contraste, compilación, exportación estática y accesibilidad automatizada superados.
- La salida `out/` sigue generándose con las rutas estáticas de los seis proyectos.
- Acceso HTTP desde el equipo a `localhost:3000` y `192.168.1.121:3000`: ambos respondieron 200.

## Pendiente de confirmar manualmente
- Probar menú móvil e interacciones en un teléfono Android real.
- Probar cambio de tema y animación por separado en cada origen: `localStorage` no se comparte entre hostname e IP.
- Probar Safari y Firefox. La prueba visual interactiva en navegador no se ejecutó en esta sesión.
