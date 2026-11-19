// Verifica que `next build` produjo un sitio estático autosuficiente en out/.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const out = "out";
const errors = [];
const ok = (msg) => console.log(`  ✓ ${msg}`);
const fail = (msg) => { errors.push(msg); console.log(`  ✗ ${msg}`); };
const check = (cond, msg) => (cond ? ok(msg) : fail(msg));

if (!existsSync(out)) { console.error("No existe out/. Ejecuta `npm run build` primero."); process.exit(1); }

console.log("Páginas");
const slugs = [...readFileSync("src/data/projects.ts", "utf8").matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
check(existsSync(join(out, "index.html")), "index.html");
check(existsSync(join(out, "404.html")), "404.html");
check(slugs.length > 0, `${slugs.length} proyectos detectados en src/data/projects.ts`);
for (const slug of slugs) check(existsSync(join(out, "proyectos", slug, "index.html")), `proyectos/${slug}/index.html`);

console.log("Contenido de index.html");
const home = readFileSync(join(out, "index.html"), "utf8");
for (const id of ["inicio", "ecosistema", "investigacion", "metodologia", "contacto", "contenido"]) {
  check(home.includes(`id="${id}"`), `ancla #${id}`);
}
check(/<html[^>]*lang="es"/.test(home), "idioma <html lang=\"es\">");
check(/<h1[ >]/.test(home) && (home.match(/<h1[ >]/g) ?? []).length === 1, "un único <h1>");
const publicUrl = "https://itsaaron12.github.io/MULSER-I-D";
const publishedPages = [join(out, "index.html"), ...slugs.map((slug) => join(out, "proyectos", slug, "index.html"))];
const noindexMeta = /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i;
check(publishedPages.every((file) => !noindexMeta.test(readFileSync(file, "utf8"))),
  "página principal y seis proyectos sin meta noindex");
check(home.includes(`href="${publicUrl}/"`), "URL canónica de la portada");
check(slugs.every((slug) => readFileSync(join(out, "proyectos", slug, "index.html"), "utf8")
  .includes(`href="${publicUrl}/proyectos/${slug}/"`)), "URLs canónicas de los seis proyectos");
const sitemapFile = join(out, "sitemap.xml");
check(existsSync(sitemapFile), "sitemap.xml exportado");
if (existsSync(sitemapFile)) {
  const sitemap = readFileSync(sitemapFile, "utf8");
  const urls = [`${publicUrl}/`, ...slugs.map((slug) => `${publicUrl}/proyectos/${slug}/`)];
  check(urls.every((url) => sitemap.includes(`<loc>${url}</loc>`)),
    "sitemap contiene la portada y los seis proyectos");
}
const robotsFile = join(out, "robots.txt");
check(existsSync(robotsFile), "robots.txt exportado en la subruta GitHub Pages");
if (existsSync(robotsFile)) check(readFileSync(robotsFile, "utf8")
  .includes(`Sitemap: ${publicUrl}/sitemap.xml`), "robots.txt referencia el sitemap");
check(existsSync(join(out, "google24d2f5bd3deb8b2d.html")), "verificador de Search Console conservado");
check(home.includes("skip-link"), "enlace de salto al contenido");

console.log("Recursos externos (solo Cloudflare Web Analytics si está configurado)");
const walk = (dir) => readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(out);
const htmlCss = files.filter((f) => [".html", ".css"].includes(extname(f)));
const external = new Set();
for (const f of htmlCss) {
  const text = readFileSync(f, "utf8");
  for (const m of text.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g)) external.add(m[1]);
  for (const m of text.matchAll(/url\((["']?)(https?:\/\/[^)"']+)\1\)/g)) external.add(m[2]);
}
const cfBeacon = "https://static.cloudflareinsights.com/beacon.min.js";
const cfToken = process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN?.trim();
const allowed = new Set(cfToken ? [cfBeacon] : []);
const internalPageUrl = `${publicUrl}/`;
// Las etiquetas <link rel="canonical"> contienen URLs absolutas del propio sitio,
// no son recursos externos que se descarguen.
check([...external].every((url) => allowed.has(url) || url.startsWith(internalPageUrl)) && (!cfToken || external.has(cfBeacon)),
  cfToken ? "solo beacon Cloudflare y URLs canónicas propias" : "ningún recurso externo (solo URLs canónicas propias)");
if (cfToken) {
  // Solo las páginas de Next.js llevan el beacon; los archivos de verificación
  // de Google son HTML estático y deben conservar su contenido exacto.
  const pages = [join(out, "index.html"), join(out, "404.html"), ...slugs.map((slug) => join(out, "proyectos", slug, "index.html"))];
  check(pages.every((f) => {
    const html = readFileSync(f, "utf8");
    return html.includes("cloudflare-web-analytics") && html.includes(cfToken);
  }), "script de analítica configurado en todas las páginas");
} else {
  check(!home.includes("cloudflare-web-analytics"), "sin analítica al no haber token");
}
check(!files.some((f) => /\.(php|py|db|sqlite)$/.test(f)), "sin archivos de backend ni base de datos");
check(!files.some((f) => /\.map$/.test(f)), "sin mapas de código fuente");

const mb = files.reduce((n, f) => n + statSync(f).size, 0) / 1048576;
console.log(`\n${files.length} archivos, ${mb.toFixed(2)} MB en out/`);
if (errors.length) { console.error(`\n${errors.length} comprobación(es) fallida(s).`); process.exit(1); }
console.log("\nExportación estática verificada.");
