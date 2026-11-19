import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  Cpu,
  FlaskConical,
  Orbit,
  RefreshCw,
  Workflow,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";
import type { IconName } from "@/types/content";

/** Registro de iconos: los datos citan nombres; aquí se resuelven a Lucide. */
const icons: Record<IconName, ComponentType<LucideProps>> = {
  boxes: Boxes,
  flask: FlaskConical,
  refresh: RefreshCw,
  orbit: Orbit,
  cpu: Cpu,
  workflow: Workflow,
  "arrow-up-right": ArrowUpRight,
  "arrow-right": ArrowRight,
  check: Check,
};

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" strokeWidth={1.75} {...props} />;
}
