import Link from "next/link";

type PetLumaLogoProps = {
  href?: string;
};

export function PetLumaLogo({ href = "/" }: PetLumaLogoProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 rounded-full focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-4 focus:ring-offset-cream"
      aria-label="PetLuma home"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-espresso text-lg font-semibold text-cream shadow-card">
        PL
      </span>
      <span className="leading-none">
        <span className="block font-serif text-2xl font-semibold tracking-tight text-espresso">
          PetLuma
        </span>
        <span className="block text-[0.64rem] font-semibold uppercase tracking-[0.32em] text-espresso/55">
          Pet ID
        </span>
      </span>
    </Link>
  );
}
