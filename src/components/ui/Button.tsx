import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { IconName } from "@/types/content";
import { Icon } from "./Icon";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  /** Icono final decorativo. */
  icon?: IconName;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | "href"> & { href: string };
type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const variants: Record<Variant, string> = {
  primary:
    "bg-linear-to-r from-[var(--btn-from)] to-[var(--btn-to)] text-on-brand shadow-glow border-transparent",
  outline: "glass text-fg hover:border-brand",
  ghost: "border-transparent text-fg hover:bg-surface-2",
};

const sizes: Record<Size, string> = {
  sm: "px-3.5 py-2 text-[0.8125rem]",
  md: "px-5 py-3 text-[0.875rem]",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", icon, className, children } = props;
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-control border font-bold",
    "transition-[transform,border-color,background-color] duration-200 motion-safe:hover:-translate-y-0.5",
    variants[variant],
    sizes[size],
    className,
  );
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} size={16} />}
    </>
  );

  if (props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, size: _s, icon: _i, className: _c, children: _ch, href, ...rest } = props;
    const external = /^https?:\/\//.test(href);
    return external ? (
      <a href={href} className={classes} rel="noopener noreferrer" {...rest}>
        {content}
      </a>
    ) : (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, icon: _i, className: _c, children: _ch, type, ...rest } = props;
  return (
    <button type={type ?? "button"} className={classes} {...rest}>
      {content}
    </button>
  );
}
