// Comprueba los contrastes WCAG 2.2 de los pares de color del sistema de diseño (src/styles/tokens.css).
import { readFileSync } from "node:fs";

const css = readFileSync("src/styles/tokens.css", "utf8");
const block = (selector) => {
  const start = css.indexOf(selector);
  const body = css.slice(css.indexOf("{", start) + 1, css.indexOf("}", start));
  return Object.fromEntries([...body.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map((m) => [m[1], m[2]]));
};
const themes = { oscuro: block(':root,\n[data-theme="dark"]'), claro: block('[data-theme="light"]') };

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

// [primer plano, fondo, mínimo requerido]
const pairs = [
  ["fg", "bg", 4.5], ["fg", "surface", 4.5], ["muted", "bg", 4.5], ["muted", "bg-alt", 4.5],
  ["muted", "surface", 4.5], ["muted", "surface-2", 4.5], ["brand", "bg", 4.5], ["brand", "bg-alt", 4.5],
  ["brand", "surface", 4.5], ["brand", "surface-2", 4.5], ["ember", "bg", 4.5], ["ember", "surface", 4.5],
  ["ember", "surface-2", 4.5], ["on-brand", "brand", 4.5], ["on-brand", "btn-from", 4.5], ["on-brand", "btn-to", 4.5],
  // Bordes de controles interactivos (WCAG 1.4.11). Los bordes decorativos de tarjetas (--line) quedan fuera.
  ["control", "bg", 3.0], ["control", "surface-2", 3.0],
];

let failed = 0;
for (const [name, t] of Object.entries(themes)) {
  console.log(`Tema ${name}`);
  for (const [fg, bg, min] of pairs) {
    if (!t[fg] || !t[bg]) { console.log(`  ? ${fg}/${bg}: falta el token`); failed++; continue; }
    const r = ratio(t[fg], t[bg]);
    const pass = r >= min;
    if (!pass) failed++;
    console.log(`  ${pass ? "✓" : "✗"} ${fg} sobre ${bg}: ${r.toFixed(2)}:1 (mín. ${min}:1)`);
  }
}
if (failed) { console.error(`\n${failed} par(es) no cumplen.`); process.exit(1); }
console.log("\nContrastes del sistema de diseño verificados.");
