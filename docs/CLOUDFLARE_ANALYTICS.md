# Cloudflare Web Analytics para MULSER I+D

La web permanece alojada en GitHub Pages:
https://itsaaron12.github.io/MULSER-I-D/

## Configuración inicial en Cloudflare (obligatoria una vez)

1. Abrir https://dash.cloudflare.com/ y seleccionar la cuenta.
2. Ir a **Web Analytics** → **Add a site**.
3. En **Set up hostname**, escribir exactamente `itsaaron12.github.io` (sin `https://`, sin `/MULSER-I-D/`).
4. Elegir la sugerencia de ese hostname y seleccionar **Done**.
5. En **Manage site**, copiar el fragmento JS y extraer el valor de `data-cf-beacon` → `token`. El token es un identificador de sitio visible en el JavaScript público, NO una clave API secreta.
6. Ir al repositorio GitHub `ItsAaron12/MULSER-I-D` → **Settings** → **Secrets and variables** → **Actions** → **Variables** → **New repository variable**. Nombre: `CLOUDFLARE_WEB_ANALYTICS_TOKEN`. Valor: el token exacto del sitio.
7. Ir a **Actions** → `Publicar MULSER I+D LAB02 en GitHub Pages` → **Run workflow** (rama `main`), o subir un nuevo commit.
8. Revisar que el workflow termine correctamente y abrir la web pública. En el código de página debe cargarse un único script `https://static.cloudflareinsights.com/beacon.min.js` con ese token.
9. Revisar visitas en **Cloudflare → Web Analytics**. Los datos pueden tardar unos minutos.

## Detalles técnicos

- `src/app/layout.tsx` agrega el script con `next/script` y `strategy="afterInteractive"`, una sola vez en el layout común.
- `.github/workflows/deploy-pages.yml` pasa la variable de GitHub al proceso de compilación de Next.js. El valor se inserta en la salida HTML/JS estática al construir; cambiarlo requiere un nuevo despliegue.
- Sin la variable, **el beacon no se carga** y no se registran visitas.
- En `npm run dev` no se carga el beacon.
- Cloudflare maneja automáticamente los cambios de ruta tipo SPA en navegadores compatibles.
- Se mantiene GitHub Pages; no se cambian DNS, dominio, hosting ni el indicador `noindex` de la maqueta.
- El beacon es una solicitud externa; algunos navegadores como Brave o bloqueadores de anuncios pueden impedir la medición.
- El seguimiento empieza desde que se active el beacon, no recupera visitas históricas previas.
- Revisar el aviso de privacidad público antes de activarlo, según los requisitos legales de MULSER.
- Para desactivarlo, quitar la variable de GitHub y ejecutar de nuevo el workflow.
- **No introducir nunca una clave API, contraseña o token secreto de la cuenta de Cloudflare en este campo**: solo el token del sitio de Web Analytics.

Documentación oficial: https://developers.cloudflare.com/web-analytics/get-started/
