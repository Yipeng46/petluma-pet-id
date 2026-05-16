import { PrimaryLink } from "@/components/primary-button";
import { SiteShell } from "@/components/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center text-center">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-espresso/50">
          Not found
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-espresso">
          This PetLuma ID does not exist.
        </h1>
        <p className="mt-4 leading-7 text-espresso/65">
          Create a new digital pet identity card in less than a minute.
        </p>
        <PrimaryLink href="/create" className="mt-7">
          Create Pet ID
        </PrimaryLink>
      </section>
    </SiteShell>
  );
}
