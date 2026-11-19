"use client";

import { motion } from "motion/react";
import { motionConfig } from "@/config/motion";
import { useMotionPreference } from "@/components/providers/MotionProvider";

/**
 * Fondo fijo: retícula de puntos + dos gradientes que derivan muy despacio.
 * Solo anima `transform` (barato para la GPU) y se queda quieto si se reducen animaciones.
 */
export function AnimatedBackground() {
  const { animate } = useMotionPreference();
  const moving = animate && motionConfig.features.animatedBackground;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: "radial-gradient(var(--grid-dot) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage: "linear-gradient(to bottom, rgb(0 0 0 / 0.6), transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgb(0 0 0 / 0.6), transparent 70%)",
        }}
      />
      <motion.div
        className="absolute -left-[12%] -top-[18%] size-[46rem] rounded-full blur-3xl will-change-transform"
        style={{ background: "radial-gradient(circle, var(--orb-1), transparent 65%)" }}
        animate={moving ? { x: [0, 60, 0], y: [0, 40, 0] } : undefined}
        transition={{ duration: 38, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute -right-[14%] top-[38%] size-[40rem] rounded-full blur-3xl will-change-transform"
        style={{ background: "radial-gradient(circle, var(--orb-2), transparent 65%)" }}
        animate={moving ? { x: [0, -50, 0], y: [0, -50, 0] } : undefined}
        transition={{ duration: 46, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
}
