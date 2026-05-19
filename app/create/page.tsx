import { CreatePetForm } from "@/components/create-pet-form";
import { SiteShell } from "@/components/site-shell";

export default function CreatePage() {
  return (
    <SiteShell>
      <section className="grid gap-12 pb-16">
        <div className="grid gap-7 pt-2 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.48em] text-espresso/42">
              Create Companion Card
            </p>
            <h1 className="mt-6 max-w-xl font-serif text-5xl font-medium leading-[0.9] tracking-[-0.06em] text-espresso sm:text-7xl">
              A quiet identity for a beloved companion.
            </h1>
          </div>
          <p className="max-w-xl text-base leading-8 tracking-[-0.01em] text-espresso/60 lg:justify-self-end">
            Add one editorial-style photo and two essential details. PetLuma
            turns them into a warm, premium companion card you can download
            locally as a high-resolution PNG.
          </p>
        </div>
        <CreatePetForm />
      </section>
    </SiteShell>
  );
}
