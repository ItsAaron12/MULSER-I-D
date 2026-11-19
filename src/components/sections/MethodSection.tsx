import { siteContent } from "@/data/site-content";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { SectionContainer } from "@/components/ui/SectionContainer";
import type { MethodStep } from "@/types/content";

const copy = siteContent.method;

/** Proceso de cuatro etapas: es una secuencia real, por eso se numera con una lista ordenada. */
export function MethodSection({ steps }: { steps: MethodStep[] }) {
  return (
    <SectionContainer id="metodologia" tone="alt" eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <AnimatedSection as="li" key={step.id} delay={index * 0.06} className="list-none">
            <div className="h-full min-h-44 rounded-card border border-line bg-surface p-6">
              <p className="text-[0.8125rem] font-bold tracking-widest text-ember">
                {String(index + 1).padStart(2, "0")} / {step.label.toUpperCase()}
              </p>
              <h3 className="mt-5 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{step.description}</p>
            </div>
          </AnimatedSection>
        ))}
      </ol>
    </SectionContainer>
  );
}
