import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { MotionToggle } from "./MotionToggle";
import { Navbar } from "./Navbar";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header
      className="sticky top-0 z-40 border-b border-line backdrop-blur-xl"
      style={{ background: "var(--header-bg)" }}
    >
      <div className="container-page relative flex h-[4.25rem] items-center gap-1.5 sm:gap-3 md:gap-4">
        <Link
          href="/#inicio"
          aria-label={`${siteConfig.name}, ir al inicio`}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap font-display text-[0.9375rem] font-bold tracking-wide sm:gap-2.5 sm:text-[1.0625rem]"
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-[0.6rem] max-[360px]:hidden border border-brand/50 bg-surface-2 text-brand"
          >
            ◇
          </span>
          MULSER <span className="text-ember">I+D</span>
        </Link>
        <Navbar items={siteConfig.nav} />
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <MotionToggle />
          <ThemeToggle />
          <div className="hidden lg:block">
            <Button href={siteConfig.cta.href} size="sm" icon="arrow-up-right">
              {siteConfig.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
