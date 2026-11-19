import { cn } from "@/lib/cn";

export interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface CategoryFilterProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (id: string) => void;
}

/** Grupo de botones-conmutador. Cada uno expone su estado con aria-pressed. */
export function CategoryFilter({ label, options, value, onChange }: CategoryFilterProps) {
  return (
    <div role="group" aria-label={label} className="mb-6 flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.id)}
            className={cn(
              "min-h-11 rounded-full border px-4 text-[0.8125rem] font-bold transition-colors duration-200",
              active
                ? "border-brand bg-brand text-on-brand"
                : "border-control bg-surface-2 text-fg hover:border-brand",
            )}
          >
            {option.label}
            <span className="ml-2 text-xs opacity-80" aria-hidden="true">
              {option.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
