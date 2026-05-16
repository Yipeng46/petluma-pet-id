import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";
import { PrimaryLink } from "@/components/primary-button";
import { SiteShell } from "@/components/site-shell";

export default function HomePage() {
  return (
    <SiteShell>
      <section className="grid min-h-[calc(100vh-7rem)] items-center gap-10 py-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-espresso/10 bg-white/45 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-espresso/65">
            <Sparkles className="h-4 w-4 text-amber" />
            Warm, minimal, yours
          </div>
          <h1 className="font-serif text-5xl font-semibold leading-[0.96] tracking-tight text-espresso sm:text-6xl">
            Create your pet&apos;s PetLuma ID
          </h1>
          <p className="mt-5 text-lg leading-8 text-espresso/70">
            A digital identity card for your furry family member.
          </p>
          <PrimaryLink href="/create" className="mt-8 w-full sm:w-auto">
            Create Pet ID
            <ArrowRight className="ml-2 h-4 w-4" />
          </PrimaryLink>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -left-6 top-12 h-28 w-28 rounded-full bg-blush/80 blur-2xl" />
          <div className="absolute -right-8 bottom-10 h-32 w-32 rounded-full bg-sage/80 blur-2xl" />
          <div className="relative rounded-[2rem] border border-white/70 bg-white/52 p-4 shadow-soft backdrop-blur">
            <div className="rounded-[1.6rem] bg-espresso p-5 text-cream">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-cream/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em]">
                  PetLuma
                </span>
                <BadgeCheck className="h-6 w-6 text-amber" />
              </div>
              <div className="mt-8 aspect-[4/3] rounded-[1.35rem] bg-[linear-gradient(135deg,#E9D7D7,#CBD3B8)] p-4">
                <div className="flex h-full items-end rounded-[1rem] border border-white/35 bg-white/20 p-4">
                  <div>
                    <p className="font-serif text-4xl font-semibold text-espresso">
                      Luna
                    </p>
                    <p className="mt-1 text-sm font-bold uppercase tracking-[0.24em] text-espresso/70">
                      PL-2026-0001
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-cream/10 p-3">
                  <p className="text-cream/55">Breed</p>
                  <p className="mt-1 font-bold">Golden</p>
                </div>
                <div className="rounded-2xl bg-cream/10 p-3">
                  <p className="text-cream/55">Personality</p>
                  <p className="mt-1 font-bold">Curious</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
