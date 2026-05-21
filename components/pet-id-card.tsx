"use client";

/* eslint-disable @next/next/no-img-element */

import html2canvas from "html2canvas";
import { Camera, Download } from "lucide-react";
import { useState } from "react";
import { PassportCover } from "@/components/passport-cover";
import { SecondaryButton } from "@/components/primary-button";
import type { Pet } from "@/lib/types";

type PetIdCardProps = {
  pet: Pet;
};

function mrzToken(value: string, fallback: string) {
  const token = value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "<")
    .replace(/^<|<$/g, "");

  return token || fallback;
}

function buildMrzLines(pet: Pet) {
  const nameToken = mrzToken(pet.pet_name, "PETNAME");
  const breedToken = mrzToken(pet.breed, "COMPANION");
  const idToken = mrzToken(pet.petluma_id.replace(/-/g, ""), "PLM00000000");

  return {
    line1: `P<PLM<<${nameToken}<<<<<<<<<<<<<<<<<<<<`,
    line2: `${idToken}PETLUMA<<<<<<<<<<`,
    line3: `${breedToken}<<<<<<<<<<<<<<<<<<<<`,
  };
}

export function PetIdCard({ pet }: PetIdCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState("");
  const mrz = buildMrzLines(pet);

  async function downloadCard() {
    const card = document.getElementById("petluma-card-only");

    if (!card) {
      return;
    }

    setIsDownloading(true);
    setDownloadMessage("");

    try {
      const rect = card.getBoundingClientRect();
      const canvas = await html2canvas(card, {
        backgroundColor: "#07111f",
        scale: 3,
        useCORS: true,
        logging: false,
        width: rect.width,
        height: rect.height,
        windowWidth: rect.width,
        windowHeight: rect.height,
      });

      const link = document.createElement("a");
      link.download = "petluma-pet-id.png";
      link.href = canvas.toDataURL("image/png", 1);
      link.click();
    } catch {
      setDownloadMessage("We could not export the card. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="grid w-full gap-5">
      <article
        id="petluma-card-only"
        className="passport-shell relative m-0 w-full overflow-hidden rounded-[1.4rem] border border-[#1e2d45]/70 p-3 text-[#0b1c32] shadow-none outline-none sm:p-4"
        style={{
          margin: 0,
          outline: "none",
          borderRadius: "1.4rem",
          overflow: "hidden",
        }}
      >
        <div className="relative grid min-h-[min(52vw,520px)] gap-3 lg:grid-cols-[minmax(200px,0.36fr)_1.64fr] lg:items-stretch lg:gap-0">
          <PassportCover passportNo={pet.petluma_id} />

          <div className="passport-paper relative h-full min-h-[280px] w-full overflow-hidden rounded-[1.05rem] lg:rounded-l-none">
          <div className="passport-paper-grain pointer-events-none absolute inset-0" />
          <div className="passport-guilloche pointer-events-none absolute inset-0" />
          <div className="passport-laminate pointer-events-none absolute inset-0" />
          <div className="passport-binding pointer-events-none absolute inset-y-0 left-0 w-[6%]" />
          <div className="pointer-events-none absolute inset-y-[8%] left-[5.5%] w-px bg-[#9f7835]/35" />
          <div className="pointer-events-none absolute inset-y-[8%] left-[7%] w-px bg-white/55" />

          <div className="passport-watermark pointer-events-none absolute inset-0 overflow-hidden">
            <div className="passport-watermark-emblem" aria-hidden>
              <span className="passport-watermark-ring flex items-start justify-center pt-[10%]">
                PetLuma Kingdom
              </span>
              <span className="passport-watermark-monogram">PL</span>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-[6%] top-[20%] h-[48%] w-[34%] rounded-full border-[clamp(12px,1.8vw,18px)] border-[#b9914c]/[0.07]" />

          <div className="relative flex h-full flex-col px-[5.5%] py-[5.5%]">
            <header className="flex items-start justify-between gap-4 border-b border-[#9f7835]/26 pb-[3.5%]">
              <div>
                <p className="passport-gold-label passport-identity-kicker uppercase">
                  PetLuma Passport
                </p>
                <p className="passport-identity-heading mt-[0.35rem] text-[clamp(0.58rem,1.05vw,0.72rem)] uppercase text-[#0b1c32]/88">
                  Identity Page
                </p>
              </div>
              <div className="passport-identity-badge px-[0.55rem] py-[0.35rem] text-[clamp(0.32rem,0.58vw,0.42rem)] uppercase leading-[1.45] text-[#7d632e]/90">
                Official
                <br />
                Document
              </div>
            </header>

            <div className="relative mt-[4%] flex min-h-0 flex-1 gap-[5%]">
              <div className="flex w-[36%] shrink-0 flex-col">
                <div className="passport-photo-frame relative aspect-[35/45] overflow-hidden border border-[#9f7835]/38 bg-[#fdf4df] p-[2.2%]">
                  <div className="passport-photo-inner h-full w-full">
                    {pet.photo_url ? (
                      <>
                        <img
                          src={pet.photo_url}
                          alt={`${pet.pet_name || "Pet"} photo`}
                          className="h-full w-full object-cover object-center saturate-[0.86] sepia-[0.08] contrast-[1.02]"
                        />
                        <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(145deg,rgba(255,255,255,0.16)_0%,transparent_34%),linear-gradient(0deg,rgba(11,28,50,0.14)_0%,transparent_42%)]" />
                      </>
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-[#0b1c32]/[0.05] px-3 text-center">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#9f7835]/28 bg-white/35">
                          <Camera className="h-3.5 w-3.5 text-[#7d632e]/65" />
                        </span>
                        <span className="passport-photo-caption mt-2 text-[clamp(0.32rem,0.58vw,0.42rem)] font-medium uppercase text-[#0b1c32]/38">
                          Portrait
                        </span>
                      </div>
                    )}
                    <div className="passport-photo-holo" aria-hidden />
                    <span className="passport-photo-corner passport-photo-corner-tl" aria-hidden />
                    <span className="passport-photo-corner passport-photo-corner-tr" aria-hidden />
                    <span className="passport-photo-corner passport-photo-corner-bl" aria-hidden />
                    <span className="passport-photo-corner passport-photo-corner-br" aria-hidden />
                  </div>
                </div>

                <div className="passport-id-plate mt-[6%] px-[4%] py-[3.5%] text-center">
                  <p className="passport-gold-label uppercase">
                    Passport No.
                  </p>
                  <p className="passport-mrz-text mt-[0.35rem] text-[clamp(0.44rem,0.82vw,0.58rem)] uppercase">
                    {pet.petluma_id}
                  </p>
                </div>
              </div>

              <div className="relative flex min-w-0 flex-1 flex-col justify-between pt-[0.2%]">
                <div>
                  <p className="passport-gold-label uppercase">
                    Pet Name / 名字
                  </p>
                  <h2 className="passport-name-display mt-[0.35rem] break-words text-[clamp(1.65rem,4.6vw,2.55rem)] leading-[0.94] text-[#0b1c32]">
                    {pet.pet_name || "Pet Name"}
                  </h2>

                  <div className="mt-[6%] grid grid-cols-2 gap-x-[5%] gap-y-[5.5%]">
                    <PassportDataField label="Species / 物种" value="Companion" />
                    <PassportDataField
                      label="Breed / 品种"
                      value={pet.breed || "Breed"}
                    />
                  </div>
                </div>

                <div className="relative mt-[5%]">
                  <div className="passport-status-block px-[3.5%] py-[3.2%] pr-[22%]">
                    <p className="passport-gold-label uppercase">
                      Status / 身份
                    </p>
                    <p className="passport-field-value mt-[0.35rem] text-[clamp(0.46rem,0.86vw,0.62rem)] uppercase text-[#0b1c32]/78">
                      Companion Member
                    </p>
                  </div>

                  <div
                    className="passport-official-seal absolute -bottom-[10%] right-[-1%] h-[clamp(2.55rem,7.4vw,3.35rem)] w-[clamp(2.55rem,7.4vw,3.35rem)] rotate-[-11deg] opacity-[0.78]"
                    aria-hidden
                  >
                    <PassportOfficialSeal />
                  </div>
                </div>
              </div>
            </div>

            <div className="passport-mrz-band passport-mrz-text mt-[4%] shrink-0 text-[clamp(0.36rem,0.68vw,0.5rem)] uppercase">
              <p className="passport-mrz-label mb-[1.8%]">Machine Readable Zone</p>
              <p className="truncate">{mrz.line1}</p>
              <p className="truncate">{mrz.line2}</p>
              <p className="truncate">{mrz.line3}</p>
            </div>
          </div>
        </div>
        </div>
      </article>

      <div className="grid gap-3">
        <SecondaryButton type="button" onClick={downloadCard}>
          <Download className="mr-2 h-4 w-4" />
          {isDownloading ? "Preparing..." : "Download Companion Card"}
        </SecondaryButton>
      </div>

      {downloadMessage ? (
        <p className="text-center text-sm font-semibold text-espresso/65">
          {downloadMessage}
        </p>
      ) : null}
    </div>
  );
}

function PassportDataField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-[#9f7835]/22 pb-[3.5%]">
      <p className="passport-gold-label uppercase">{label}</p>
      <p className="passport-field-value mt-[0.35rem] break-words text-[clamp(0.46rem,0.88vw,0.62rem)] uppercase text-[#0b1c32]/86">
        {value}
      </p>
    </div>
  );
}

function PassportOfficialSeal() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="1.6" opacity="0.72" />
      <circle cx="60" cy="60" r="48" stroke="currentColor" strokeWidth="0.8" opacity="0.48" />
      <circle cx="60" cy="60" r="38" stroke="currentColor" strokeWidth="0.6" opacity="0.32" strokeDasharray="2.5 3.2" />
      <path
        id="seal-ring-path"
        d="M 60 18 A 42 42 0 1 1 59.9 18"
        fill="none"
      />
      <text fill="currentColor" opacity="0.62" fontSize="6.2" letterSpacing="2.8">
        <textPath href="#seal-ring-path" startOffset="3%">
          PETLUMA KINGDOM • OFFICIAL • AUTHENTIC •
        </textPath>
      </text>
      <path
        d="M60 42 L63.8 52.2 L74.8 52.8 L66.2 59.4 L69.2 70 L60 63.8 L50.8 70 L53.8 59.4 L45.2 52.8 L56.2 52.2 Z"
        stroke="currentColor"
        strokeWidth="0.9"
        fill="rgba(159,120,53,0.08)"
        opacity="0.72"
      />
      <text
        x="60"
        y="86"
        textAnchor="middle"
        fill="currentColor"
        opacity="0.58"
        fontSize="7.2"
        letterSpacing="2.4"
        style={{ fontFamily: "var(--font-cinzel, Georgia), serif" }}
      >
        VERIFIED
      </text>
    </svg>
  );
}
