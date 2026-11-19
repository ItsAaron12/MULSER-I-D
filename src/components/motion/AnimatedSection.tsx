"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { baseTransition, fadeIn, fadeUp, motionConfig } from "@/config/motion";
import { useMotionPreference } from "@/components/providers/MotionProvider";

const tags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
} as const;

interface AnimatedSectionProps {
  as?: keyof typeof tags;
  children: ReactNode;
  className?: string;
  /** Retraso en segundos (útil para escalonar elementos de una cuadrícula). */
  delay?: number;
  /** "up" desplaza ligeramente hacia arriba; "none" solo cambia la opacidad. */
  direction?: "up" | "none";
  id?: string;
}

/**
 * Entrada al hacer scroll. Sin animaciones (preferencia o sistema) renderiza el contenido
 * visible y sin movimiento. Sin JavaScript, el <noscript> del layout lo deja visible.
 */
export function AnimatedSection({
  as = "div",
  children,
  className,
  delay = 0,
  direction = "up",
  id,
}: AnimatedSectionProps) {
  const { animate } = useMotionPreference();
  const Tag = tags[as];
  const enabled = animate && motionConfig.features.entrance;

  return (
    <Tag
      id={id}
      data-animate
      className={className}
      variants={direction === "up" ? fadeUp : fadeIn}
      initial={enabled ? "hidden" : false}
      whileInView="visible"
      viewport={{ once: true, margin: motionConfig.viewportMargin }}
      transition={enabled ? { ...baseTransition, delay } : { duration: 0 }}
    >
      {children}
    </Tag>
  );
}
