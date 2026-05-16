import type { ReactNode } from "react";
import { PetLumaLogo } from "@/components/petluma-logo";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <main className="petluma-noise min-h-screen overflow-hidden px-5 py-6 sm:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex items-center justify-between">
          <PetLumaLogo />
          <span className="hidden rounded-full border border-espresso/10 bg-white/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.26em] text-espresso/60 sm:inline-flex">
            Digital Pet ID
          </span>
        </header>
        {children}
      </div>
    </main>
  );
}
