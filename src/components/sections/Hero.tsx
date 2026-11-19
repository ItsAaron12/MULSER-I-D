"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import type { CSSProperties } from "react";
import logo from "@/assets/brand/logo-oficial-mulser-id.png";
import { baseTransition, motionConfig } from "@/config/motion";
import { siteContent } from "@/data/site-content";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { useMotionPreference } from "@/components/providers/MotionProvider";
import type { Service } from "@/types/content";

const copy = siteContent.hero;

/**
 * El PNG oficial trae un fondo casi negro. Se difuminan sus bordes para que el logotipo
 * se integre con el escenario sin modificar el archivo original de la identidad.
 */
const feather = (dir: string) => `linear-gradient(${dir}, transparent 0, #000 14%, #000 86%, transparent 100%)`;
const logoFeather: CSSProperties = {
  maskImage: `${feather("to right")}, ${feather("to bottom")}`,
  maskComposite: "intersect",
  WebkitMaskImage: `${feather("to right")}, ${feather("to bottom")}`,
  WebkitMaskComposite: "source-in",
};

/**
 * Primera pantalla. El elemento memorable es el escenario del logotipo oficial, con anillos
 * orbitales y parallax moderado; el resto se mantiene sobrio. El texto es visible de inmediato.
 */
export function Hero({ capabilities }: { capabilities: Service[] }) {
  const { animate } = useMotionPreference();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const shift = motionConfig.parallaxDistance;
  const logoY = useTransform(scrollYProgress, [0, 1], [0, shift]);
  const ringsY = useTransform(scrollYProgress, [0, 1], [0, shift * 1.8]);
  const parallax = animate && motionConfig.features.parallax;
  const spin = animate && motionConfig.features.animatedBackground;

  return (
    <section id="inicio" ref={ref} aria-labelledby="inicio-title" className="relative pb-10 pt-12 sm:pt-16">
      <div className="container-page grid items-center gap-8 md:grid-cols-[0.95fr_1.05fr] md:gap-10">
        <div className="py-2">
          <p className="flex items-center gap-2.5 text-eyebrow font-bold text-brand">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-ember shadow-[0_0_14px_var(--ember)]" />
            {copy.eyebrow}
          </p>
          <h1
            id="inicio-title"
            className="mt-4 max-w-[12ch] text-[clamp(2.6rem,6vw,4.4rem)] font-semibold leading-[1.04] tracking-[-0.045em] sm:max-w-none"
          >
            {copy.titleLead}{" "}
            <span className="bg-linear-to-r from-brand via-brand to-ember bg-clip-text text-transparent">
              {copy.titleEmphasis}
            </span>
          </h1>
          <p className="mt-5 max-w-[34rem] text-base leading-[1.8] text-muted">{copy.lead}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href={copy.primaryCta.href} icon="arrow-up-right">
              {copy.primaryCta.label}
            </Button>
            <Button href={copy.secondaryCta.href} variant="outline" icon="arrow-right">
              {copy.secondaryCta.label}
            </Button>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
            {copy.points.map((point) => (
              <li key={point} className="flex items-center gap-1.5">
                <span aria-hidden="true" className="text-brand">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          className="stage relative grid min-h-[16rem] place-items-center overflow-hidden rounded-panel border border-line shadow-panel sm:min-h-[24rem]"
          initial={animate ? { opacity: 0, scale: 0.97 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={animate ? { ...baseTransition, duration: motionConfig.duration.slow } : { duration: 0 }}
        >
          <motion.div aria-hidden="true" className="absolute inset-0 grid place-items-center" style={{ y: parallax ? ringsY : 0 }}>
            <motion.span
              className="orbit-ring size-[29rem] max-w-none"
              style={{ rotate: -18, scaleY: 0.5 }}
              animate={spin ? { rotate: [-18, 342] } : undefined}
              transition={{ duration: 140, ease: "linear", repeat: Infinity }}
            />
            <motion.span
              className="orbit-ring size-[20rem] max-w-none border-[rgb(255_174_54/0.18)]"
              style={{ rotate: 21, scaleY: 0.82 }}
              animate={spin ? { rotate: [21, -339] } : undefined}
              transition={{ duration: 180, ease: "linear", repeat: Infinity }}
            />
          </motion.div>
          <motion.div className="relative z-10 w-[94%]" style={{ y: parallax ? logoY : 0 }}>
            <Image src={logo} alt={copy.logoAlt} priority sizes="(min-width: 768px) 46vw, 94vw" className="h-auto w-full"
              style={logoFeather}
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="container-page mt-10">
        <h2 className="sr-only">Enfoque de desarrollo</h2>
        <ul className="grid gap-3 md:grid-cols-3">
          {capabilities.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} variant="compact" className="h-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
