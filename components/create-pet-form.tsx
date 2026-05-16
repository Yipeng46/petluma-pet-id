"use client";

import { ImagePlus } from "lucide-react";
import { type ChangeEvent, useEffect, useState } from "react";
import { PetIdCard } from "@/components/pet-id-card";
import { personalities, randomPetPhrase } from "@/lib/pet-options";
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
  const [pet, setPet] = useState<Pet>({
    id: "local-preview",
    petluma_id: "PL-2026-0001",
    pet_name: "",
    breed: "",
    birthday: "",
    personality: "Playful",
    favorite_snack: "",
    photo_url: "",
    photo_path: "",
    pet_phrase: "I had a good day. I think I deserve extra treats.",
    created_at: "2026-01-01T00:00:00.000Z",
  });
  const [maxBirthday, setMaxBirthday] = useState("2026-12-31");

  useEffect(() => {
    setMaxBirthday(new Date().toISOString().slice(0, 10));
    setPet((current) => ({
      ...current,
      petluma_id: generatePetLumaId(),
      pet_phrase: randomPetPhrase(),
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

  return (
    <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(21rem,1.05fr)] lg:items-start">
      <form
        onSubmit={(event) => event.preventDefault()}
        className="rounded-[2rem] border border-white/70 bg-white/58 p-5 shadow-soft backdrop-blur sm:p-7"
      >
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-espresso/45">
            Create ID
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-espresso">
            Pet details
          </h2>
        </div>

        <div className="grid gap-4">
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

          <label className="grid gap-2">
            <span className="text-sm font-bold text-espresso">Birthday</span>
            <input
              name="birthday"
              type="date"
              max={maxBirthday}
              value={pet.birthday}
              onChange={(event) => updatePet("birthday", event.target.value)}
              className="h-[3.35rem] rounded-2xl border border-espresso/10 bg-cream/70 px-4 text-espresso outline-none transition focus:border-amber focus:ring-4 focus:ring-amber/15"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-espresso">Personality</span>
            <select
              name="personality"
              value={pet.personality}
              onChange={(event) =>
                updatePet("personality", event.target.value)
              }
              className="h-[3.35rem] rounded-2xl border border-espresso/10 bg-cream/70 px-4 text-espresso outline-none transition focus:border-amber focus:ring-4 focus:ring-amber/15"
            >
              {personalities.map((personality) => (
                <option key={personality} value={personality}>
                  {personality}
                </option>
              ))}
            </select>
          </label>

          <TextField
            name="favoriteSnack"
            label="Favorite Snack"
            placeholder="Chicken bites"
            value={pet.favorite_snack}
            onChange={(value) => updatePet("favorite_snack", value)}
          />

          <label className="group grid cursor-pointer gap-2">
            <span className="text-sm font-bold text-espresso">
              Upload Pet Photo
            </span>
            <span className="flex min-h-24 items-center gap-4 rounded-3xl border border-dashed border-espresso/18 bg-cream/70 p-4 transition group-hover:border-amber">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blush text-espresso">
                <ImagePlus className="h-6 w-6" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-espresso">
                  {photoName || "Choose a JPG, PNG, or WebP"}
                </span>
                <span className="mt-1 block text-xs text-espresso/55">
                  The preview updates instantly. Square photos look best.
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
      </form>

      <div className="min-w-0 lg:sticky lg:top-8">
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
      <span className="text-sm font-bold text-espresso">{label}</span>
      <input
        name={name}
        maxLength={100}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[3.35rem] rounded-2xl border border-espresso/10 bg-cream/70 px-4 text-espresso outline-none transition placeholder:text-espresso/35 focus:border-amber focus:ring-4 focus:ring-amber/15"
      />
    </label>
  );
}
