"use client";

/* eslint-disable @next/next/no-img-element */

import html2canvas from "html2canvas";
import { Camera, Download, Share2 } from "lucide-react";
import { useState } from "react";
import { SecondaryButton } from "@/components/primary-button";
import type { Pet } from "@/lib/types";

type PetIdCardProps = {
  pet: Pet;
};

export function PetIdCard({ pet }: PetIdCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  async function downloadCard() {
    const card = document.getElementById("petluma-card-only");

    if (!card) {
      return;
    }

    setIsDownloading(true);
    setShareMessage("");

    try {
      const rect = card.getBoundingClientRect();
      const canvas = await html2canvas(card, {
        backgroundColor: "#241812",
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
      setShareMessage("We could not export the card. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }

  async function shareCard() {
    setShareMessage("");
    const shareData = {
      title: `${pet.pet_name || "My pet"}'s PetLuma ID`,
      text: `Meet ${pet.pet_name || "this pet"}, a ${pet.personality.toLowerCase()} companion with excellent taste.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        return;
      }
    }

    await navigator.clipboard.writeText(window.location.href);
    setShareMessage("Link copied to clipboard.");
  }

  return (
    <div className="grid w-full gap-5">
      <div
        id="petluma-card-only"
        className="relative m-0 h-[570px] w-[900px] overflow-hidden rounded-[28px] border-0 bg-[#241812] p-0 text-[#F9F7F4] shadow-none outline-none"
        style={{
          width: "900px",
          height: "570px",
          margin: 0,
          padding: 0,
          border: "none",
          outline: "none",
          background:
            "radial-gradient(circle at 78% 20%, rgba(230, 169, 74, 0.14), transparent 30%), radial-gradient(circle at 18% 92%, rgba(249, 247, 244, 0.045), transparent 34%), linear-gradient(135deg, #17100D 0%, #241812 36%, #3A271E 66%, #160E0B 100%)",
          borderRadius: "28px",
          overflow: "hidden",
        }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,rgba(249,247,244,0.72)_1px,transparent_0),linear-gradient(115deg,transparent_0%,rgba(249,247,244,0.35)_46%,transparent_47%)] [background-size:4px_4px,180px_180px]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(158deg,rgba(249,247,244,0.09)_0%,transparent_24%,rgba(0,0,0,0.2)_100%)]" />

        <div className="absolute bottom-6 left-6 top-6 w-[35%] overflow-hidden rounded-[30px]">
          {pet.photo_url ? (
            <>
              <img
                src={pet.photo_url}
                alt={`${pet.pet_name || "Pet"} photo`}
                className="h-full w-full object-cover object-[38%_64%] contrast-[1.15] saturate-[0.78] sepia-[0.12]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(249,247,244,0.2)_0%,transparent_30%),linear-gradient(0deg,rgba(28,18,14,0.34)_0%,transparent_46%,rgba(230,169,74,0.1)_100%)]" />
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-[#3A271E] px-6 text-center text-[#F9F7F4]/55">
              <span className="flex h-12 w-12 items-center justify-center bg-[#F9F7F4]/10">
                <Camera className="h-5 w-5" />
              </span>
              <span className="mt-3 text-xs font-medium uppercase tracking-[0.18em]">
                Upload pet photo
              </span>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-[42%] right-0 top-0 flex flex-col justify-between py-16 pl-14 pr-16 text-left">
          <div>
            <p className="text-[0.5rem] font-light uppercase leading-none tracking-[0.72em] text-[#F9F7F4]/42 [font-family:Inter,ui-sans-serif,system-ui,sans-serif]">
              PetLuma
            </p>
          </div>

          <div className="min-w-0 pb-6">
            <h2 className="break-words text-[5.7rem] font-medium leading-[0.78] tracking-[-0.075em] text-[#F9F7F4] [font-family:'Playfair_Display','Cormorant_Garamond',Georgia,serif]">
              {pet.pet_name || "Pet Name"}
            </h2>
            <p className="mt-8 break-words text-[0.78rem] font-light uppercase leading-[1.5] tracking-[0.44em] text-[#E6A94A]/74 [font-family:Inter,ui-sans-serif,system-ui,sans-serif]">
              Companion Member
            </p>
          </div>

          <div>
            <p className="break-words text-[0.58rem] font-light leading-[1.1] tracking-[0.36em] text-[#F9F7F4]/32 [font-family:Inter,ui-sans-serif,system-ui,sans-serif]">
              {pet.petluma_id}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <SecondaryButton type="button" onClick={downloadCard}>
          <Download className="mr-2 h-4 w-4" />
          {isDownloading ? "Preparing..." : "Download Pet ID"}
        </SecondaryButton>
        <SecondaryButton type="button" onClick={shareCard}>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </SecondaryButton>
      </div>

      {shareMessage ? (
        <p className="text-center text-sm font-semibold text-espresso/65">
          {shareMessage}
        </p>
      ) : null}
    </div>
  );
}
