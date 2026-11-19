import type { Transition, Variants } from "motion/react";

/**
 * Parámetros centrales de animación. Todos los componentes animados leen de aquí,
 * de modo que la intensidad se ajusta en un solo lugar.
 */
export const motionConfig = {
  duration: { fast: 0.18, base: 0.5, slow: 0.9 },
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  stagger: 0.06,
  /** Desplazamiento máximo (px) del efecto parallax del hero. Mantener moderado. */
  parallaxDistance: 56,
  /** Margen de activación de las animaciones de entrada al hacer scroll. */
  viewportMargin: "-8% 0px",
  /** Interruptores por función: permiten apagar efectos sin borrar código. */
  features: {
    entrance: true,
    pageTransition: true,
    parallax: true,
    animatedBackground: true,
    interactiveCards: true,
  },
} as const;

export const baseTransition: Transition = {
  duration: motionConfig.duration.base,
  ease: motionConfig.ease,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
