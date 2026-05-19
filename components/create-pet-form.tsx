"use client";

import { ImagePlus } from "lucide-react";
import { type ChangeEvent, useEffect, useState } from "react";
import { PetIdCard } from "@/components/pet-id-card";
import { PrimaryButton } from "@/components/primary-button";
import type { Pet } from "@/lib/types";

const maxPhotoSize = 6 * 1024 * 1024;
const allowedPhotoTypes = ["image/jpeg", "image/png", "image/webp"];

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read photo."));
    reader.readAsDataURL(file);
  });
}

function generatePetLumaId() {
  const year = new Date().getFullYear();
  const number = Math.floor(Math.random() * 9000) + 1000;
  return `PL-${year}-${number}`;
}

export function CreatePetForm() {
  const [photoName, setPhotoName] = useState("");
  const [error, setError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [pet, setPet] = useState<Pet>({
    id: "local-preview",
    petluma_id: "PL-2026-0001",
    pet_name: "",
    breed: "",
    photo_url: "",
    photo_path: "",
    created_at: "2026-01-01T00:00:00.000Z",
  });

  useEffect(() => {
    setPet((current) => ({
      ...current,
      petluma_id: generatePetLumaId(),
      created_at: new Date().toISOString(),
    }));
  }, []);

  function updatePet(field: keyof Pet, value: string) {
    setPet((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    setError("");
    const photo = event.currentTarget.files?.[0];

    if (!photo) {
      setPhotoName("");
      updatePet("photo_url", "");
      updatePet("photo_path", "");
      return;
    }

    if (!allowedPhotoTypes.includes(photo.type)) {
      setError("Please upload a JPG, PNG, or WebP photo.");
      event.currentTarget.value = "";
      return;
    }

    if (photo.size > maxPhotoSize) {
      setError("Please upload a photo smaller than 6 MB.");
      event.currentTarget.value = "";
      return;
    }

    try {
      const photoUrl = await readFileAsDataUrl(photo);
      setPhotoName(photo.name);
      setPet((current) => ({
        ...current,
        photo_url: photoUrl,
        photo_path: photo.name,
      }));
    } catch {
      setError("Could not preview this photo. Please try another image.");
    }
  }

  async function handleSave() {
    setError("");
    setSaveMessage("");

    if (!pet.pet_name.trim()) {
      setError("Please add your pet's name before saving.");
      return;
    }

    setIsSaving(true);

    try {
      console.log("[PetLuma] Create Card clicked", {
        pet_name: pet.pet_name,
        breed: pet.breed,
        hasPhotoUrl: Boolean(pet.photo_url),
      });

      const response = await fetch("/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pet_name: pet.pet_name,
          breed: pet.breed,
          photo_url: pet.photo_url,
        }),
      });

      const data = await response.json();

      console.log("[PetLuma] /api/pets response", {
        status: response.status,
        ok: response.ok,
        data,
      });

      if (!response.ok) {
        console.error("[PetLuma] /api/pets failed", data);
        throw new Error(data?.error || "Could not save this pet.");
      }

      console.log("[PetLuma] saved pet", data.pet);

      setPet({
        id: data.pet.id,
        petluma_id: data.pet.petluma_id,
        pet_name: data.pet.pet_name,
        breed: data.pet.breed || "",
        photo_url: data.pet.photo_url || "",
        photo_path: pet.photo_path,
        created_at: data.pet.created_at,
      });
      setSaveMessage(`Saved to Supabase as ${data.pet.petluma_id}.`);
    } catch (saveError) {
      console.error("[PetLuma] Create Card save error", saveError);
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Could not save this pet. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="grid w-full gap-10 lg:grid-cols-[minmax(17rem,0.68fr)_minmax(0,1.32fr)] lg:items-start">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void handleSave();
        }}
        className="rounded-[2.2rem] border border-espresso/10 bg-[#fbf8f3]/70 p-6 shadow-soft backdrop-blur sm:p-8"
      >
        <div className="mb-8">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.36em] text-espresso/42">
            Companion Details
          </p>
          <h2 className="mt-3 font-serif text-4xl font-medium leading-none tracking-[-0.04em] text-espresso">
            Keep it essential.
          </h2>
          <p className="mt-4 text-sm leading-6 text-espresso/55">
            A luxury membership card works best with restraint: name, breed,
            image, and identity number.
          </p>
        </div>

        <div className="grid gap-5">
          <TextField
            name="petName"
            label="Pet Name"
            placeholder="Luna"
            value={pet.pet_name}
            onChange={(value) => updatePet("pet_name", value)}
          />

          <TextField
            name="breed"
            label="Breed"
            placeholder="Golden Retriever"
            value={pet.breed}
            onChange={(value) => updatePet("breed", value)}
          />

          <label className="group grid cursor-pointer gap-2">
            <span className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-espresso/58">
              Pet Photography
            </span>
            <span className="flex min-h-28 items-center gap-4 rounded-[1.6rem] border border-dashed border-espresso/18 bg-cream/80 p-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:border-amber/70 group-hover:bg-white/70">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-amber/30 bg-espresso text-amber">
                <ImagePlus className="h-6 w-6" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-espresso">
                  {photoName || "Choose a JPG, PNG, or WebP"}
                </span>
                <span className="mt-1 block text-xs text-espresso/55">
                  Golden-hour, outdoor, or soft natural light photos work best.
                </span>
              </span>
            </span>
            <input
              name="photo"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={handlePhotoChange}
            />
          </label>
        </div>

        {error ? (
          <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}

        {saveMessage ? (
          <p className="mt-5 rounded-2xl bg-sage/15 px-4 py-3 text-sm font-semibold text-espresso/70">
            {saveMessage}
          </p>
        ) : null}

        <PrimaryButton
          type="submit"
          disabled={isSaving}
          className="mt-7 w-full"
        >
          {isSaving ? "Saving..." : "Create Card"}
        </PrimaryButton>
      </form>

      <div className="min-w-0 rounded-[2.6rem] border border-white/60 bg-[#eee6dc]/55 p-3 shadow-soft lg:sticky lg:top-8">
        <PetIdCard pet={pet} />
      </div>
    </div>
  );
}

function TextField({
  name,
  label,
  placeholder,
  value,
  onChange,
}: {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-espresso/58">
        {label}
      </span>
      <input
        name={name}
        maxLength={100}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[3.65rem] rounded-[1.35rem] border border-espresso/10 bg-cream/80 px-4 text-sm text-espresso outline-none transition duration-300 placeholder:text-espresso/30 focus:border-amber/70 focus:bg-white/72 focus:ring-4 focus:ring-amber/15"
      />
    </label>
  );
}
