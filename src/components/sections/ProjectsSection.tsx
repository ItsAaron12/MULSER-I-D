"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { baseTransition } from "@/config/motion";
import { siteContent } from "@/data/site-content";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { useMotionPreference } from "@/components/providers/MotionProvider";
import type { Division, Project } from "@/types/content";

const copy = siteContent.projects;
const ALL = "todos";

/** Cuadrícula filtrable de proyectos con ficha rápida. Recibe todo por props (datos independientes). */
export function ProjectsSection({ projects, divisions }: { projects: Project[]; divisions: Division[] }) {
  const { animate } = useMotionPreference();
  const [filter, setFilter] = useState(ALL);
  const [selected, setSelected] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  const options = useMemo(
    () => [
      { id: ALL, label: "Todos", count: projects.length },
      ...divisions
        .map((d) => ({ id: d.id, label: d.label, count: projects.filter((p) => p.division === d.id).length }))
        .filter((o) => o.count > 0),
    ],
    [projects, divisions],
  );
  const visible = filter === ALL ? projects : projects.filter((p) => p.division === filter);

  const handleSelect = useCallback((project: Project) => {
    setSelected(project);
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <SectionContainer
      id="ecosistema"
      tone="alt"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
    >
      <CategoryFilter label="Filtrar proyectos por división" options={options} value={filter} onChange={setFilter} />
      <p className="sr-only" role="status" aria-live="polite">
        Mostrando {visible.length} {visible.length === 1 ? "proyecto" : "proyectos"}
      </p>
      <motion.ul layout={animate} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.slug}
              layout={animate}
              initial={animate ? { opacity: 0, scale: 0.96 } : false}
              animate={{ opacity: 1, scale: 1 }}
              exit={animate ? { opacity: 0, scale: 0.96 } : undefined}
              transition={animate ? baseTransition : { duration: 0 }}
            >
              <ProjectCard project={project} onSelect={handleSelect} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      <p className="mt-5 text-xs text-muted">* {copy.note}</p>
      <ProjectModal project={selected} open={open} onClose={handleClose} disclaimer={copy.modalDisclaimer} />
    </SectionContainer>
  );
}
