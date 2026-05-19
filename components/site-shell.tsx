import type { ReactNode } from "react";
import { PetLumaLogo } from "@/components/petluma-logo";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <main className="petluma-noise min-h-screen overflow-hidden px-5 py-6 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex items-center justify-between border-b border-espresso/10 pb-5">
          <PetLumaLogo />
          <span className="hidden rounded-full border border-espresso/10 bg-cream/65 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-espresso/55 sm:inline-flex">
            Premium Pet Companion Brand
          </span>
        </header>
        {children}
      </div>
    </main>
  );
}
