/* eslint-disable @next/next/no-img-element */

import { ArrowRight } from "lucide-react";
import { PrimaryLink } from "@/components/primary-button";
import { SiteShell } from "@/components/site-shell";

export default function HomePage() {
  return (
    <SiteShell>
      <section className="grid min-h-[calc(100vh-9rem)] items-center gap-16 py-4 lg:grid-cols-[0.9fr_1.1fr] lg:py-8">
        <div className="max-w-2xl">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.52em] text-espresso/45">
            PetLuma Companion Identity
          </p>
          <h1 className="mt-8 max-w-[11ch] font-serif text-6xl font-medium leading-[0.86] tracking-[-0.06em] text-espresso sm:text-7xl lg:text-[7.8rem]">
            Your pet deserves an identity.
          </h1>
          <p className="mt-8 max-w-md text-base leading-8 tracking-[-0.01em] text-espresso/62 sm:text-lg">
            Create a premium digital companion card for the pet who brightens
            your everyday life.
          </p>
          <PrimaryLink href="/create" className="mt-10 w-full sm:w-auto">
            Create Companion Card
            <ArrowRight className="ml-2 h-4 w-4" />
          </PrimaryLink>

          <div className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-espresso/10 pt-6 text-[0.58rem] font-semibold uppercase leading-5 tracking-[0.3em] text-espresso/42">
            <span>Outdoor luxury</span>
            <span>Emotional companion</span>
            <span>Warm editorial</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[37rem]">
          <div className="absolute -right-14 top-12 h-48 w-48 rounded-full bg-amber/18 blur-3xl" />
          <div className="absolute -bottom-12 -left-14 h-56 w-56 rounded-full bg-sage/16 blur-3xl" />

          <div className="relative grid gap-4">
            <div className="relative ml-auto w-[72%] overflow-hidden rounded-[2.35rem] border border-white/70 bg-[#eee6dc]/70 p-3 shadow-soft">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.85rem] bg-espresso">
                <img
                  src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85"
                  alt="Dog in warm outdoor light"
                  className="h-full w-full object-cover object-[48%_50%] opacity-90 saturate-[0.76] sepia-[0.18]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,24,18,0.03)_0%,rgba(36,24,18,0.22)_52%,rgba(36,24,18,0.78)_100%)]" />
                <div className="absolute left-7 right-7 top-7 flex items-center justify-between text-cream">
                  <span className="text-[0.56rem] font-semibold uppercase tracking-[0.44em] text-cream/68">
                    PetLuma
                  </span>
                  <span className="h-px w-20 bg-amber/70" />
                </div>

                <div className="absolute bottom-7 left-7 right-7 rounded-[1.65rem] border border-cream/14 bg-espresso/84 p-6 text-cream backdrop-blur-md">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-serif text-5xl font-medium leading-none tracking-[-0.06em]">
                        Luna
                      </p>
                      <p className="mt-3 text-[0.58rem] font-semibold uppercase tracking-[0.36em] text-amber">
                        Companion Member
                      </p>
                    </div>
                    <p className="text-right text-[0.55rem] font-semibold uppercase leading-5 tracking-[0.32em] text-cream/42">
                      PL-2026
                      <br />
                      0001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative -mt-28 w-[58%] overflow-hidden rounded-[2rem] border border-white/70 bg-cream p-2 shadow-card">
              <div className="relative aspect-[5/3] overflow-hidden rounded-[1.55rem] bg-espresso">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85"
                alt="Warm outdoor landscape"
                className="h-full w-full object-cover opacity-85 saturate-[0.72] sepia-[0.22]"
              />
                <div className="absolute inset-0 bg-espresso/28" />
                <p className="absolute bottom-5 left-5 max-w-[12rem] text-[0.58rem] font-semibold uppercase leading-5 tracking-[0.32em] text-cream/74">
                  Everyday rituals, preserved beautifully.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
