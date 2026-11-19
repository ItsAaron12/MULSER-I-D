"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { baseTransition, motionConfig } from "@/config/motion";
import { useMotionPreference } from "@/components/providers/MotionProvider";

/**
 * Transición de entrada entre páginas. `template.tsx` se vuelve a montar en cada
 * navegación, a diferencia de `layout.tsx`. Las salidas animadas no son viables con App Router
 * sin dependencias adicionales; ver docs/ARQUITECTURA.md.
 */
export default function Template({ children }: { children: ReactNode }) {
  const { animate } = useMotionPreference();
  const enabled = animate && motionConfig.features.pageTransition;
  return (
    <motion.div
      data-animate
      initial={enabled ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={enabled ? baseTransition : { duration: 0 }}
    >
      {children}
    </motion.div>
  );
}
