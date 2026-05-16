import { ShieldCheck } from "lucide-react";
import { CreatePetForm } from "@/components/create-pet-form";
import { SiteShell } from "@/components/site-shell";

export default function CreatePage() {
  return (
    <SiteShell>
      <section className="grid gap-8 pb-12">
        <div className="max-w-2xl pt-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-espresso/10 bg-white/45 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-espresso/65">
            <ShieldCheck className="h-4 w-4 text-amber" />
            No login required
          </div>
          <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight tracking-tight text-espresso sm:text-6xl">
            Tell us about your best friend.
          </h1>
          <p className="mt-4 text-base leading-7 text-espresso/68">
            Add a favorite photo and a few details. PetLuma will create a
            polished digital card you can download or share right away.
          </p>
        </div>
        <CreatePetForm />
      </section>
    </SiteShell>
  );
}
