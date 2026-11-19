"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { baseTransition, motionConfig } from "@/config/motion";
import { useMotionPreference } from "@/components/providers/MotionProvider";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** id del elemento que titula el diálogo (aria-labelledby). */
  titleId: string;
  children: ReactNode;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Diálogo modal accesible: foco atrapado, Escape, clic en el fondo, restaura el foco al cerrar. */
export function Modal({ open, onClose, titleId, children }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <ModalPanel key="modal" onClose={onClose} titleId={titleId}>
          {children}
        </ModalPanel>
      )}
    </AnimatePresence>
  );
}

function ModalPanel({
  onClose,
  titleId,
  children,
}: Omit<ModalProps, "open">) {
  const { animate } = useMotionPreference();
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    (panel.querySelector<HTMLElement>("[data-autofocus]") ?? panel).focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      } else if (!panel.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  const t = animate ? baseTransition : { duration: 0 };

  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      style={{ background: "var(--backdrop)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: animate ? motionConfig.duration.fast : 0 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="glass relative max-h-[90dvh] w-full max-w-[34rem] overflow-y-auto rounded-panel p-7 shadow-panel outline-none sm:p-8"
        initial={animate ? { opacity: 0, y: 16, scale: 0.97 } : false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={animate ? { opacity: 0, y: 10, scale: 0.98 } : { opacity: 0 }}
        transition={t}
      >
        <button
          type="button"
          data-autofocus
          onClick={onClose}
          aria-label="Cerrar ventana"
          className="absolute right-4 top-4 grid size-11 place-items-center rounded-control border border-control bg-surface-2 text-fg hover:border-brand"
        >
          <X size={18} aria-hidden="true" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}
