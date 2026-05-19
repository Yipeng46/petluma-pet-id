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
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amber/35 bg-espresso text-sm font-semibold uppercase tracking-[0.18em] text-amber shadow-card">
        PL
      </span>
      <span className="leading-none">
        <span className="block font-serif text-3xl font-semibold tracking-[-0.03em] text-espresso">
          PetLuma
        </span>
        <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.38em] text-espresso/50">
          Companion Identity
        </span>
      </span>
    </Link>
  );
}
