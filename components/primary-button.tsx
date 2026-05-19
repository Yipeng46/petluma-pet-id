import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  children: ReactNode;
};

type LinkButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  children: ReactNode;
};

const baseClass =
  "inline-flex min-h-12 items-center justify-center rounded-full px-7 text-xs font-semibold uppercase tracking-[0.22em] transition duration-300 focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-4 focus:ring-offset-cream";

export function PrimaryButton({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        baseClass,
        "bg-espresso text-cream shadow-card hover:-translate-y-0.5 hover:bg-[#1a100c] hover:shadow-soft disabled:cursor-not-allowed disabled:opacity-70",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function PrimaryLink({ className, children, ...props }: LinkButtonProps) {
  return (
    <Link
      className={cn(
        baseClass,
        "bg-espresso text-cream shadow-card hover:-translate-y-0.5 hover:bg-[#1a100c] hover:shadow-soft",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export function SecondaryButton({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        baseClass,
        "border border-espresso/15 bg-cream/70 text-espresso hover:-translate-y-0.5 hover:border-amber/55 hover:bg-white/75",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
