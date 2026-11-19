"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/cn";
import type { NavItem } from "@/types/content";

/** Navegación principal con menú adaptable y resaltado de la sección visible. */
export function Navbar({ items }: { items: readonly NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const menuId = useId();
  const onHome = usePathname() === "/";

  useEffect(() => {
    if (!onHome) return;
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items, onHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 ml-auto grid size-11 shrink-0 place-items-center rounded-control border border-control bg-surface-2 text-fg md:hidden"
      >
        {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>
      <nav
        id={menuId}
        aria-label="Navegación principal"
        data-mobile-open={open ? "true" : "false"}
        className={cn(
          "md:static md:ml-auto md:block md:border-0 md:bg-transparent md:p-0 md:shadow-none",
          open
            ? "glass absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 block max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl p-2 shadow-panel"
            : "hidden",
        )}
      >
        <ul className="flex flex-col md:flex-row md:items-center md:gap-1">
          {items.map((item) => {
            const current = onHome && active === item.id;
            return (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  aria-current={current ? "location" : undefined}
                  onClick={() => {
                    setOpen(false);
                    setActive(item.id);
                  }}
                  className={cn(
                    "block rounded-control px-4 py-3 text-sm font-semibold transition-colors md:px-3 md:py-2 md:text-[0.8125rem]",
                    current ? "text-brand" : "text-fg/85 hover:text-brand",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
