import type { Service } from "@/types/content";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

interface ServiceCardProps {
  service: Service;
  /** "compact" = franja bajo el hero; "feature" = lista de líneas de investigación. */
  variant?: "compact" | "feature";
  className?: string;
}

export function ServiceCard({ service, variant = "compact", className }: ServiceCardProps) {
  const compact = variant === "compact";
  return (
    <article
      className={cn(
        "flex items-start gap-4 rounded-card border border-line bg-surface/80",
        compact ? "items-center p-5" : "p-6",
        className,
      )}
    >
      <div
        className={cn(
          "grid shrink-0 place-items-center rounded-[0.8rem] bg-surface-2 text-brand",
          compact ? "size-11" : "size-12",
        )}
      >
        <Icon name={service.icon} size={compact ? 20 : 22} />
      </div>
      <div>
        <h3 className={cn("font-semibold", compact ? "text-sm" : "text-[1.0625rem]")}>
          {service.title}
        </h3>
        <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">{service.description}</p>
      </div>
    </article>
  );
}
