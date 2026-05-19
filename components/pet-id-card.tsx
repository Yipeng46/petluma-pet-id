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

          <div className="passport-watermark pointer-events-none absolute right-[6%] top-[14%] text-[clamp(4.5rem,14vw,7.5rem)] font-semibold leading-none">
            PL
          </div>

          <div className="pointer-events-none absolute -right-[8%] top-[18%] h-[52%] w-[38%] rounded-full border-[clamp(14px,2.2vw,22px)] border-[#b9914c]/10" />

          <div className="relative flex h-full flex-col px-[5.5%] py-[5%]">
            <header className="flex items-start justify-between gap-3 border-b border-[#9f7835]/30 pb-[3%]">
              <div>
                <p className="passport-gold-label text-[clamp(0.38rem,0.72vw,0.52rem)] font-semibold uppercase">
                  PetLuma Passport
                </p>
                <p className="mt-1 text-[clamp(0.52rem,1vw,0.68rem)] font-semibold uppercase tracking-[0.28em] text-[#0b1c32]">
                  Identity Page
                </p>
              </div>
              <div className="border border-[#9f7835]/40 px-2 py-1 text-[clamp(0.34rem,0.62vw,0.46rem)] uppercase leading-tight tracking-[0.18em] text-[#7d632e]">
                Official
                <br />
                Document
              </div>
            </header>

            <div className="relative mt-[3.5%] flex min-h-0 flex-1 gap-[4%]">
              <div className="flex w-[38%] shrink-0 flex-col">
                <div className="passport-photo-frame relative aspect-[35/45] overflow-hidden rounded-md border border-[#9f7835]/42 bg-[#fdf4df] p-[2%]">
                  {pet.photo_url ? (
                    <>
                      <img
                        src={pet.photo_url}
                        alt={`${pet.pet_name || "Pet"} photo`}
                        className="h-full w-full object-cover object-center saturate-[0.88] sepia-[0.06]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.18)_0%,transparent_32%),linear-gradient(0deg,rgba(11,28,50,0.12)_0%,transparent_48%)]" />
                    </>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-[#0b1c32]/[0.06] px-3 text-center">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#9f7835]/30 bg-white/40">
                        <Camera className="h-4 w-4 text-[#7d632e]/70" />
                      </span>
                      <span className="mt-2 text-[clamp(0.34rem,0.62vw,0.46rem)] font-medium uppercase tracking-[0.2em] text-[#0b1c32]/42">
                        Portrait
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-[5%] border border-[#9f7835]/30 bg-white/25 p-[3%] text-center">
                  <p className="passport-gold-label text-[clamp(0.32rem,0.58vw,0.44rem)] uppercase">
                    Passport No.
                  </p>
                  <p className="passport-mrz-text mt-1 text-[clamp(0.42rem,0.78vw,0.56rem)] uppercase">
                    {pet.petluma_id}
                  </p>
                </div>
              </div>

              <div className="relative flex min-w-0 flex-1 flex-col justify-between">
                <div>
                  <p className="passport-gold-label text-[clamp(0.32rem,0.58vw,0.44rem)] uppercase">
                    Pet Name / 名字
                  </p>
                  <h2 className="mt-1 break-words font-serif text-[clamp(1.55rem,4.8vw,2.65rem)] font-medium leading-[0.92] tracking-[-0.04em] text-[#0b1c32]">
                    {pet.pet_name || "Pet Name"}
                  </h2>

                  <div className="mt-[5%] grid grid-cols-2 gap-x-[4%] gap-y-[4%]">
                    <PassportDataField label="Species / 物种" value="Companion" />
                    <PassportDataField
                      label="Breed / 品种"
                      value={pet.breed || "Breed"}
                    />
                  </div>
                </div>

                <div className="relative mt-[4%]">
                  <div className="border border-[#9f7835]/22 bg-[#0b1c32]/[0.035] p-[3%] pr-[18%]">
                    <p className="passport-gold-label text-[clamp(0.32rem,0.58vw,0.44rem)] uppercase">
                      Status / 身份
                    </p>
                    <p className="mt-1 text-[clamp(0.42rem,0.78vw,0.56rem)] font-semibold uppercase tracking-[0.14em] text-[#0b1c32]/72">
                      Companion Member
                    </p>
                  </div>

                  <div
                    className="passport-official-seal absolute -bottom-[8%] right-0 flex h-[clamp(2.4rem,7vw,3.2rem)] w-[clamp(2.4rem,7vw,3.2rem)] rotate-[-10deg] items-center justify-center rounded-full text-center opacity-70"
                    aria-hidden
                  >
                    <div className="absolute inset-[10%] rounded-full border border-[#9f7835]/28" />
                    <div className="relative flex flex-col items-center justify-center leading-none">
                      <span className="text-[clamp(0.28rem,0.5vw,0.36rem)] uppercase tracking-[0.14em]">
                        Official
                      </span>
                      <span className="font-serif text-[clamp(0.85rem,2.2vw,1.15rem)]">
                        Seal
                      </span>
                      <span className="text-[clamp(0.28rem,0.5vw,0.36rem)] uppercase tracking-[0.14em]">
                        PetLuma
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="passport-mrz-band passport-mrz-text mt-[3%] shrink-0 pt-[2%] text-[clamp(0.34rem,0.64vw,0.48rem)] uppercase leading-[1.35]">
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
    <div className="border-b border-[#9f7835]/25 pb-[3%]">
      <p className="passport-gold-label text-[clamp(0.3rem,0.55vw,0.42rem)] uppercase">
        {label}
      </p>
      <p className="mt-1 break-words text-[clamp(0.42rem,0.82vw,0.58rem)] font-semibold uppercase tracking-[0.1em] text-[#0b1c32]">
        {value}
      </p>
    </div>
  );
}
