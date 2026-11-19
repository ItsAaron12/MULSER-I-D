"""Pruebas en navegador real (Chromium) sobre out/. Requiere: pip install playwright; npm i (axe-core).
Uso: python3 scripts/qa/browser-check.py  (desde la raíz; sirve out/ en un puerto local)."""
import functools, http.server, json, pathlib, socketserver, sys, threading
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parents[2]
SHOTS = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "qa-shots"
SHOTS.mkdir(exist_ok=True, parents=True)
AXE = (ROOT / "node_modules/axe-core/axe.min.js").read_text()

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args, **kwargs):
        pass

handler = functools.partial(Quiet, directory=str(ROOT / "out"))
httpd = socketserver.TCPServer(("127.0.0.1", 0), handler)
threading.Thread(target=httpd.serve_forever, daemon=True).start()
BASE = f"http://127.0.0.1:{httpd.server_address[1]}"

results, failures = [], []
def check(name, cond, extra=""):
    results.append((name, bool(cond)))
    print(("  ✓ " if cond else "  ✗ ") + name + (f" — {extra}" if extra and not cond else ""))
    if not cond: failures.append(name)

def axe(page):
    page.evaluate(AXE)
    return page.evaluate("axe.run(document, {runOnly:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']})")

with sync_playwright() as pw:
    browser = pw.chromium.launch()

    for scheme in ("dark", "light"):
        print(f"\nEscritorio · tema {scheme}")
        ctx = browser.new_context(viewport={"width": 1366, "height": 850}, color_scheme=scheme)
        page = ctx.new_page(); errors = []
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(BASE + "/"); page.wait_for_timeout(1500)
        check("data-theme coincide con el sistema", page.evaluate("document.documentElement.dataset.theme") == scheme)
        page.screenshot(path=str(SHOTS / f"home-{scheme}-top.png"))
        for y in range(0, page.evaluate("document.body.scrollHeight"), 500):
            page.evaluate(f"window.scrollTo(0,{y})"); page.wait_for_timeout(120)
        page.wait_for_timeout(700)
        page.screenshot(path=str(SHOTS / f"home-{scheme}-full.png"), full_page=True)
        page.evaluate("window.scrollTo(0,0)")
        res = axe(page)
        bad = [(v["id"], v["impact"], len(v["nodes"])) for v in res["violations"]]
        check(f"axe-core (incl. contraste) sin violaciones", not bad, str(bad))
        check("sin desbordamiento horizontal", page.evaluate("document.documentElement.scrollWidth <= window.innerWidth"))
        check("sin errores de consola", not errors, str(errors))
        ctx.close()

    print("\nInteracciones (escritorio, tema oscuro)")
    ctx = browser.new_context(viewport={"width": 1366, "height": 850}, color_scheme="dark")
    page = ctx.new_page(); page.goto(BASE + "/"); page.wait_for_timeout(1200)
    count = lambda: page.locator("#ecosistema ul > li").count()
    check("6 proyectos visibles al inicio", count() == 6)
    page.get_by_role("button", name="Investigación", exact=True).click(); page.wait_for_timeout(900)
    check("filtro Investigación → 1 proyecto", count() == 1)
    check("aria-pressed del filtro activo", page.get_by_role("button", name="Investigación", exact=True).get_attribute("aria-pressed") == "true")
    page.get_by_role("button", name="Aplicaciones", exact=True).click(); page.wait_for_timeout(900)
    check("filtro Aplicaciones → 5 proyectos", count() == 5)
    page.get_by_role("button", name="Todos", exact=True).click(); page.wait_for_timeout(900)
    check("filtro Todos → 6 proyectos", count() == 6)

    opener = page.get_by_role("button", name="Conocer la idea de ÉETIL")
    opener.scroll_into_view_if_needed(); opener.focus(); page.keyboard.press("Enter"); page.wait_for_timeout(700)
    dlg = page.get_by_role("dialog")
    check("modal de proyecto se abre con teclado", dlg.is_visible())
    check("modal etiquetado (aria-labelledby → título)", dlg.get_attribute("aria-labelledby") == "project-modal-title" and "ÉETIL" in page.locator("#project-modal-title").inner_text())
    check("el foco entra al modal", page.evaluate("document.activeElement.closest('[role=dialog]') !== null"))
    page.screenshot(path=str(SHOTS / "modal-dark.png"))
    inside = True
    for _ in range(6):
        page.keyboard.press("Tab"); inside &= page.evaluate("document.activeElement.closest('[role=dialog]') !== null")
    check("Tab no escapa del modal (foco atrapado)", inside)
    page.keyboard.press("Shift+Tab"); check("Shift+Tab permanece dentro", page.evaluate("document.activeElement.closest('[role=dialog]') !== null"))
    res = axe(page); check("axe con modal abierto", not res["violations"], str([v["id"] for v in res["violations"]]))
    page.keyboard.press("Escape"); page.wait_for_timeout(700)
    check("Escape cierra el modal", page.get_by_role("dialog").count() == 0)
    check("el foco regresa al botón que lo abrió", page.evaluate("document.activeElement.textContent.includes('Conocer la idea')"))
    check("se restaura el scroll del cuerpo", page.evaluate("document.body.style.overflow") == "")

    opener.click(); page.wait_for_timeout(600)
    page.mouse.click(8, 8); page.wait_for_timeout(600)
    check("clic en el fondo cierra el modal", page.get_by_role("dialog").count() == 0)

    opener.click(); page.wait_for_timeout(500)
    page.get_by_role("link", name="Ver ficha de ÉETIL").click(); page.wait_for_timeout(900)
    check("enlace del modal navega a la ficha", page.url.endswith("/proyectos/eetil/") and page.locator("h1").inner_text() == "ÉETIL")
    page.screenshot(path=str(SHOTS / "project-page.png"))
    page.get_by_role("link", name="Proyectos", exact=True).first.click(); page.wait_for_timeout(900)
    check("navegación Navbar desde otra página vuelve a #ecosistema", "/#ecosistema" in page.url and page.locator("#ecosistema").is_visible())

    page.get_by_role("button", name="Información de contacto").click(); page.wait_for_timeout(600)
    check("diálogo de contacto", page.get_by_role("dialog").is_visible() and "Canales oficiales" in page.get_by_role("dialog").inner_text())
    page.keyboard.press("Escape"); page.wait_for_timeout(600)

    page.goto(BASE + "/"); page.wait_for_timeout(600)
    for label in ("Proyectos", "Investigación", "Método", "Contacto"):
        page.locator("nav[aria-label='Navegación principal']").get_by_role("link", name=label, exact=True).click(); page.wait_for_timeout(1300)
    check("scroll-spy marca la sección actual", page.locator("nav a[aria-current='location']").inner_text() == "Contacto")

    page.evaluate("window.scrollTo(0,0)")
    before = page.evaluate("document.documentElement.dataset.theme")
    page.get_by_role("button", name="Cambiar a tema claro").click(); page.wait_for_timeout(300)
    check("conmutador de tema cambia data-theme", page.evaluate("document.documentElement.dataset.theme") == "light" and before == "dark")
    page.reload(); page.wait_for_timeout(600)
    check("tema persiste tras recargar (sin parpadeo)", page.evaluate("document.documentElement.dataset.theme") == "light")
    page.get_by_role("button", name="Pausar animaciones").click(); page.wait_for_timeout(300)
    check("conmutador de animaciones → data-motion=off", page.evaluate("document.documentElement.dataset.motion") == "off")
    page.reload(); page.wait_for_timeout(600)
    check("animaciones pausadas persisten", page.evaluate("document.documentElement.dataset.motion") == "off" and page.get_by_role("button", name="Activar animaciones").count() == 1)
    check("sin animaciones el contenido está visible", page.evaluate("[...document.querySelectorAll('[data-animate]')].every(e => getComputedStyle(e).opacity === '1')"))
    ctx.close()

    print("\nprefers-reduced-motion del sistema")
    ctx = browser.new_context(viewport={"width": 1366, "height": 850}, reduced_motion="reduce")
    page = ctx.new_page(); page.goto(BASE + "/"); page.wait_for_timeout(800)
    btn = page.get_by_role("button", name="Animaciones desactivadas por la configuración de tu sistema")
    check("el conmutador se bloquea y lo explica", btn.count() == 1 and btn.is_disabled())
    check("contenido visible de inmediato", page.evaluate("[...document.querySelectorAll('[data-animate]')].every(e => getComputedStyle(e).opacity === '1')"))
    page.locator("#investigacion").scroll_into_view_if_needed(); page.wait_for_timeout(300)
    check("sin transformaciones residuales en secciones", page.evaluate("[...document.querySelectorAll('[data-animate]')].every(e => ['none','matrix(1, 0, 0, 1, 0, 0)'].includes(getComputedStyle(e).transform))"))
    ctx.close()

    print("\nSin JavaScript")
    ctx = browser.new_context(java_script_enabled=False, viewport={"width": 1366, "height": 850})
    page = ctx.new_page(); page.goto(BASE + "/"); page.wait_for_timeout(500)
    check("contenido legible sin JS", page.evaluate("[...document.querySelectorAll('[data-animate]')].every(e => getComputedStyle(e).opacity === '1')") and "Nuestros proyectos" in page.content())
    ctx.close()

    print("\nMóvil 375×740")
    for scheme in ("dark", "light"):
        ctx = browser.new_context(viewport={"width": 375, "height": 740}, device_scale_factor=2, is_mobile=True, has_touch=True, color_scheme=scheme)
        page = ctx.new_page(); page.goto(BASE + "/"); page.wait_for_timeout(1200)
        page.screenshot(path=str(SHOTS / f"mobile-{scheme}-top.png"))
        check(f"[{scheme}] sin desbordamiento horizontal", page.evaluate("document.documentElement.scrollWidth <= window.innerWidth"))
        if scheme == "dark":
            toggle = page.get_by_role("button", name="Abrir menú")
            check("menú móvil cerrado por defecto", toggle.get_attribute("aria-expanded") == "false" and not page.get_by_role("link", name="Método").is_visible())
            toggle.tap(); page.wait_for_timeout(300)
            check("menú móvil se abre (aria-expanded=true)", page.get_by_role("button", name="Cerrar menú").get_attribute("aria-expanded") == "true" and page.get_by_role("link", name="Método").is_visible())
            page.screenshot(path=str(SHOTS / "mobile-menu.png"))
            page.keyboard.press("Escape"); page.wait_for_timeout(200)
            check("Escape cierra el menú móvil", not page.get_by_role("link", name="Método").is_visible())
            page.get_by_role("button", name="Abrir menú").tap(); page.get_by_role("link", name="Método").tap(); page.wait_for_timeout(1300)
            check("enlace del menú navega y lo cierra", page.locator("#metodologia").is_visible() and not page.get_by_role("link", name="Método").is_visible())
            small = page.evaluate("[...document.querySelectorAll('a,button')].filter(e=>e.offsetParent&&!e.closest('.sr-only')&&(e.getBoundingClientRect().height<40||e.getBoundingClientRect().width<40)).map(e=>(e.textContent||e.ariaLabel).trim().slice(0,30))")
            check("objetivos táctiles ≥ 40 px", not small, str(small))
        res = axe(page); check(f"[{scheme}] axe-core móvil", not res["violations"], str([(v['id'],len(v['nodes'])) for v in res['violations']]))
        ctx.close()
    ctx = browser.new_context(viewport={"width": 320, "height": 640}, is_mobile=True, has_touch=True)
    page = ctx.new_page(); page.goto(BASE + "/"); page.wait_for_timeout(1000)
    print("\nMóvil muy estrecho 320×640")
    check("sin desbordamiento horizontal a 320 px", page.evaluate("document.documentElement.scrollWidth <= window.innerWidth"))
    check("cabecera sin elementos cortados", page.evaluate("[...document.querySelectorAll('header a, header button')].filter(e=>e.offsetParent).every(e=>e.getBoundingClientRect().right<=window.innerWidth)"))
    page.screenshot(path=str(SHOTS / "mobile-320.png"))
    ctx.close()
    browser.close()

passed = sum(1 for _, ok in results if ok)
print(f"\n{passed}/{len(results)} comprobaciones superadas")
sys.exit(1 if failures else 0)
