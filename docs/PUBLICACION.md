# Publicación

**Estado actual (noviembre de 2026):** MULSER I+D está publicado en GitHub Pages; su responsable autorizó habilitar la indexación de la web. El aviso editorial «Maqueta de revisión» permanece visible, y las comprobaciones siguientes siguen pendientes cuando corresponda:

- [ ] Confirmar alcance y mensaje institucional.
- [ ] Validar qué proyectos pueden describirse públicamente y qué debe permanecer interno.
- [ ] Aprobar derechos de uso de logotipos y contenidos.
- [ ] Aprobar datos de contacto oficiales y avisos legales/privacidad.
- [ ] Probar diseño móvil/escritorio, accesibilidad, teclado y enlaces en dispositivos reales (Chrome, Firefox, Android).
- [ ] Revisar que no se expongan secretos, respaldos, bases de datos ni documentación clasificada.
- [ ] Decidir dominio y alojamiento.
- [ ] Mantener historial de versiones y copias antes de cada cambio.

## Indexación y futuras aprobaciones

1. `src/config/site.ts` tiene `status.published: true`; Next.js permite la indexación de las páginas públicas. La etiqueta visible se mantiene hasta su aprobación editorial definitiva.
2. Añadir los canales oficiales a `contactChannels` y, si aplica, páginas de privacidad.
3. `npm run validate` y publicar el contenido de `out/` en el alojamiento de archivos elegido
   (subruta: `NEXT_PUBLIC_BASE_PATH`). Si el servidor no resuelve `/ruta/` → `/ruta/index.html`, revisar su configuración.
