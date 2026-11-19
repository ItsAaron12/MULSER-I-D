import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

interface SectionContainerProps {
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
  /** "alt" usa el fondo alterno para separar visualmente secciones consecutivas. */
  tone?: "default" | "alt";
  children: ReactNode;
  className?: string;
}

/** Envoltorio estándar de sección: espaciado, encabezado accesible y contenedor. */
export function SectionContainer({
  id,
  title,
  eyebrow,
  description,
  tone = "default",
  children,
  className,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("py-16 sm:py-22", tone === "alt" && "bg-bg-alt/80", className)}
    >
      <div className="container-page">
        <AnimatedSection className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            {eyebrow && <p className="text-eyebrow font-bold text-brand">{eyebrow}</p>}
            <h2
              id={`${id}-title`}
              className="mt-2 text-[clamp(1.75rem,4vw,2.65rem)] font-semibold leading-[1.12] tracking-[-0.03em]"
            >
              {title}
            </h2>
          </div>
          {description && <p className="max-w-md text-sm text-muted">{description}</p>}
        </AnimatedSection>
        {children}
      </div>
    </section>
  );
}
