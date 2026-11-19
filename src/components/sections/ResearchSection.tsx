import { siteContent } from "@/data/site-content";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { ServiceCard } from "@/components/ui/ServiceCard";
import type { Service } from "@/types/content";

const copy = siteContent.research;

export function ResearchSection({ lines }: { lines: Service[] }) {
  return (
    <SectionContainer id="investigacion" eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
      <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
        <AnimatedSection
          as="article"
          className="relative min-h-72 overflow-hidden rounded-panel border border-line bg-linear-to-br from-surface-2 to-surface p-7 sm:p-8"
        >
          <p className="text-eyebrow font-bold text-brand">{copy.featureEyebrow}</p>
          <h3 className="mt-3 max-w-[22rem] text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.02em] sm:text-[1.95rem]">
            {copy.featureTitle}
          </h3>
          <p className="mt-3 max-w-[24rem] text-[0.8125rem] leading-[1.8] text-muted">{copy.featureBody}</p>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-36 top-4 size-[22rem] rounded-full border-2 border-brand/30 shadow-[0_0_60px_rgb(14_186_228/0.14)] [transform:rotate(-30deg)_scaleX(0.58)]"
          >
            <span className="absolute inset-9 rounded-full border-2 border-ember/40 [transform:rotate(45deg)_scaleX(0.58)]" />
            <span className="absolute inset-[6.5rem] rounded-full bg-brand/45 shadow-[0_0_70px_var(--brand)]" />
          </div>
        </AnimatedSection>
        <ul className="grid gap-4">
          {lines.map((line, index) => (
            <AnimatedSection as="li" key={line.id} delay={index * 0.06}>
              <ServiceCard service={line} variant="feature" className="h-full" />
            </AnimatedSection>
          ))}
        </ul>
      </div>
    </SectionContainer>
  );
}
