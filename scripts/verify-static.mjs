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
check(/name="robots"[^>]*content="noindex/.test(home), "robots noindex (maqueta no publicada)");
check(home.includes("skip-link"), "enlace de salto al contenido");

console.log("Autosuficiencia (sin recursos externos)");
const walk = (dir) => readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(out);
const htmlCss = files.filter((f) => [".html", ".css"].includes(extname(f)));
const external = new Set();
for (const f of htmlCss) {
  const text = readFileSync(f, "utf8");
  for (const m of text.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g)) external.add(m[1]);
  for (const m of text.matchAll(/url\((["']?)(https?:\/\/[^)"']+)\1\)/g)) external.add(m[2]);
}
check(external.size === 0, external.size === 0 ? "ningún src/href/url() externo" : `recursos externos: ${[...external].join(", ")}`);
check(!files.some((f) => /\.(php|py|db|sqlite)$/.test(f)), "sin archivos de backend ni base de datos");
check(!files.some((f) => /\.map$/.test(f)), "sin mapas de código fuente");

const mb = files.reduce((n, f) => n + statSync(f).size, 0) / 1048576;
console.log(`\n${files.length} archivos, ${mb.toFixed(2)} MB en out/`);
if (errors.length) { console.error(`\n${errors.length} comprobación(es) fallida(s).`); process.exit(1); }
console.log("\nExportación estática verificada.");
