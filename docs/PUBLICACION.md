# Publicación

**No publicar sin aprobación.** Se conservan los criterios de LAB01:

- [ ] Confirmar alcance y mensaje institucional.
- [ ] Validar qué proyectos pueden describirse públicamente y qué debe permanecer interno.
- [ ] Aprobar derechos de uso de logotipos y contenidos.
- [ ] Aprobar datos de contacto oficiales y avisos legales/privacidad.
- [ ] Probar diseño móvil/escritorio, accesibilidad, teclado y enlaces en dispositivos reales (Chrome, Firefox, Android).
- [ ] Revisar que no se expongan secretos, respaldos, bases de datos ni documentación clasificada.
- [ ] Decidir dominio y alojamiento.
- [ ] Mantener historial de versiones y copias antes de cada cambio.

## Al aprobar

1. En `src/config/site.ts` poner `status.published: true` (retira `noindex`) y actualizar `status.label`/pie.
2. Añadir los canales oficiales a `contactChannels` y, si aplica, páginas de privacidad.
3. `npm run validate` y publicar el contenido de `out/` en el alojamiento de archivos elegido
   (subruta: `NEXT_PUBLIC_BASE_PATH`). Si el servidor no resuelve `/ruta/` → `/ruta/index.html`, revisar su configuración.
