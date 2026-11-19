"use client";

import { projectStatusLabels } from "@/data/divisions";
import type { Project } from "@/types/content";
import { Button } from "./Button";
import { Modal } from "./Modal";

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
  disclaimer: string;
}

/** Ficha rápida de un proyecto. Conserva el contenido durante la animación de salida. */
export function ProjectModal({ project, open, onClose, disclaimer }: ProjectModalProps) {
  return (
    <Modal open={open && project !== null} onClose={onClose} titleId="project-modal-title">
      {project && (
        <div>
          <p className="pr-12 text-xs font-bold text-ember">{projectStatusLabels[project.status]}</p>
          <h2 id="project-modal-title" className="mt-3 text-[1.65rem] font-semibold leading-tight">
            {project.name}
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-[1.8] text-muted">{project.detail}</p>
          <div className="mt-6">
            <Button href={`/proyectos/${project.slug}/`} variant="outline" size="sm" icon="arrow-right">
              Ver ficha de {project.name}
            </Button>
          </div>
          <p className="mt-6 border-t border-line pt-4 text-xs text-muted">{disclaimer}</p>
        </div>
      )}
    </Modal>
  );
}
