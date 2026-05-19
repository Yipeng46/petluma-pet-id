import { KingdomGateEmblem } from "@/components/kingdom-gate-emblem";

type PassportCoverProps = {
  passportNo: string;
};

export function PassportCover({ passportNo }: PassportCoverProps) {
  return (
    <section
      aria-label="PetLuma Passport cover"
      className="passport-cover relative flex aspect-[88/125] h-full min-h-[280px] w-full flex-col overflow-hidden rounded-[1.05rem] border border-[#1a2840]/90 lg:rounded-r-none lg:border-r-0"
    >
      <div className="passport-cover-leather pointer-events-none absolute inset-0" />
      <div className="passport-cover-grain pointer-events-none absolute inset-0" />
      <div className="passport-cover-vignette pointer-events-none absolute inset-0" />
      <div className="passport-cover-spine pointer-events-none absolute inset-y-0 left-0 w-[3px]" />

      <div className="relative z-10 flex h-full flex-col px-7 pb-8 pt-9 sm:px-8 sm:pb-9 sm:pt-10">
        <header className="shrink-0 text-center">
          <p className="passport-cover-gold passport-cover-kingdom">
            PetLuma Kingdom
          </p>
        </header>

        <div className="passport-cover-titles shrink-0 pt-5 text-center sm:pt-6">
          <h2 className="passport-cover-gold passport-cover-brand">PetLuma</h2>
          <p className="passport-cover-gold passport-cover-passport mt-2">
            Passport
          </p>
        </div>

        <div className="passport-cover-emblem relative flex min-h-0 flex-1 items-center justify-center py-4 sm:py-5">
          <KingdomGateEmblem className="passport-cover-emblem__art h-full w-full max-h-[min(58vw,20rem)] max-w-[min(88%,17.5rem)] text-[#c9a227]" />
        </div>

        <footer className="shrink-0 text-center">
          <p className="passport-cover-gold passport-cover-footer">
            Official Companion Document
          </p>
          {passportNo ? (
            <p className="passport-cover-number mt-3">{passportNo}</p>
          ) : null}
          <div className="mt-5 flex justify-center">
            <PassportChipIcon />
          </div>
        </footer>
      </div>
    </section>
  );
}

function PassportChipIcon() {
  return (
    <svg
      viewBox="0 0 48 36"
      className="passport-cover-chip h-6 w-8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="4"
        y="6"
        width="40"
        height="24"
        rx="3"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="14"
        y="12"
        width="20"
        height="12"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="0.85"
      />
      <circle cx="24" cy="18" r="3.5" stroke="currentColor" strokeWidth="0.85" />
      <path d="M8 14 H12 M8 18 H12 M8 22 H12" stroke="currentColor" strokeWidth="0.7" />
      <path d="M36 14 H40 M36 18 H40 M36 22 H40" stroke="currentColor" strokeWidth="0.7" />
    </svg>
  );
}
