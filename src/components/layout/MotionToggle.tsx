
"use client";

import {
  Monitor,
  Zap,
  ZapOff,
} from "lucide-react";

import {
  useMotionPreference,
} from "@/components/providers/MotionProvider";

export function MotionToggle() {
  const {
    preference,
    toggle,
  } = useMotionPreference();

  const label =
    preference === "system"
      ? "Animaciones: automático. Cambiar a activadas"
      : preference === "on"
        ? "Animaciones: activadas. Cambiar a desactivadas"
        : "Animaciones: desactivadas. Cambiar a automático";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-live="polite"
      className="grid size-11 shrink-0 place-items-center rounded-control border border-control bg-surface-2 text-fg transition-colors duration-300 hover:border-brand"
    >
      {preference === "system" ? (
        <Monitor size={18} aria-hidden="true" />
      ) : preference === "on" ? (
        <Zap size={18} aria-hidden="true" />
      ) : (
        <ZapOff size={18} aria-hidden="true" />
      )}
    </button>
  );
}
