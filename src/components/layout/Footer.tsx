import { ChevronUp } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-3 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name} · Identidad institucional
        </p>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>{siteConfig.status.label}</span>
          <Link
            href="/#inicio"
            className="inline-flex min-h-11 items-center gap-1 font-semibold text-brand hover:underline"
          >
            Volver arriba <ChevronUp size={14} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </footer>
  );
}
