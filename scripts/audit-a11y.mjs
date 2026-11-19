// Auditoría estática de accesibilidad con axe-core sobre el HTML exportado (out/).
// El contraste real se comprueba aparte (check-contrast.mjs) porque jsdom no calcula estilos.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { JSDOM, VirtualConsole } from "jsdom";
import axe from "axe-core";

const pages = ["index.html", ...readdirSync("out/proyectos").map((s) => `proyectos/${s}/index.html`), "404.html"];
let total = 0;
for (const page of pages) {
  const dom = new JSDOM(readFileSync(join("out", page), "utf8"), { runScripts: "outside-only", pretendToBeVisual: true, virtualConsole: new VirtualConsole() });
  dom.window.eval(axe.source);
  const result = await dom.window.axe.run(dom.window.document.documentElement, {
    rules: { "color-contrast": { enabled: false }, "label-content-name-mismatch": { enabled: false } },
  });
  total += result.violations.length;
  console.log(`${result.violations.length ? "✗" : "✓"} ${page}: ${result.violations.length} violaciones, ${result.passes.length} reglas superadas`);
  for (const v of result.violations) console.log(`    - [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodo/s)`);
}
if (total) process.exit(1);
console.log("\nSin violaciones de axe-core en el HTML exportado.");
