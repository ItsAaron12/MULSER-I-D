"use client";

import { motion } from "motion/react";
import type { CSSProperties, PointerEvent } from "react";
import { motionConfig } from "@/config/motion";
import { projectStatusLabels } from "@/data/divisions";
import { useMotionPreference } from "@/components/providers/MotionProvider";
import type { Project } from "@/types/content";
import { Icon } from "./Icon";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

/**
 * Tarjeta interactiva: elevación suave y un destello que sigue al puntero.
 * El destello usa variables CSS (sin re-render de React) y solo se activa con animaciones habilitadas.
 */
export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const { animate } = useMotionPreference();
  const interactive = animate && motionConfig.features.interactiveCards;

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <motion.article
      style={{ "--tone": project.accent } as CSSProperties}
      onPointerMove={handlePointerMove}
      whileHover={interactive ? { y: -4 } : undefined}
      transition={{ duration: motionConfig.duration.fast, ease: motionConfig.ease }}
      className="group relative flex min-h-64 flex-col overflow-hidden rounded-card border border-line bg-linear-to-br from-surface-2 to-surface p-6 transition-[border-color,box-shadow] duration-200 hover:border-brand hover:shadow-card"
    >
      {interactive && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(18rem circle at var(--mx, 50%) var(--my, 0%), color-mix(in srgb, var(--tone) 18%, transparent), transparent 70%)",
          }}
        />
      )}
      <div className="relative flex items-start justify-between gap-3">
        <div
          aria-hidden="true"
          className="grid size-13 place-items-center rounded-2xl border font-display text-lg font-bold tracking-tight"
          style={{
            color: "color-mix(in srgb, var(--tone) 55%, var(--fg))",
            background: "color-mix(in srgb, var(--tone) 16%, transparent)",
            borderColor: "color-mix(in srgb, var(--tone) 40%, transparent)",
          }}
        >
          {project.monogram}
        </div>
        <span className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[0.6875rem] font-semibold text-muted">
          {projectStatusLabels[project.status]}
        </span>
      </div>
      <h3 className="relative mt-5 text-xl font-semibold leading-tight">{project.name}</h3>
      <p className="relative mt-2 flex-1 text-[0.8125rem] leading-[1.7] text-muted">
        {project.summary}
      </p>
      <button
        type="button"
        onClick={() => onSelect(project)}
        aria-haspopup="dialog"
        className="relative mt-5 inline-flex min-h-11 items-center gap-1.5 self-start text-[0.8125rem] font-bold text-brand hover:underline"
      >
        Conocer la idea
        <span className="sr-only"> de {project.name}</span>
        <Icon name="arrow-right" size={14} />
      </button>
    </motion.article>
  );
}
