import { NextResponse } from "next/server";
import { savePet } from "@/src/lib/supabase";

type CreatePetPayload = {
  pet_name?: unknown;
  breed?: unknown;
  photo_url?: unknown;
};

function readText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  try {
    console.log("[PetLuma] POST /api/pets called");

    const body = (await request.json()) as CreatePetPayload;
    const petName = readText(body.pet_name, 100);

    console.log("[PetLuma] POST /api/pets payload", {
      hasPetName: Boolean(petName),
      hasBreed: Boolean(readText(body.breed, 100)),
      hasPhotoUrl: Boolean(readText(body.photo_url, 8_000_000)),
    });

    if (!petName) {
      return NextResponse.json(
        { error: "Pet name is required." },
        { status: 400 },
      );
    }

    const pet = await savePet({
      pet_name: petName,
      breed: readText(body.breed, 100),
      photo_url: readText(body.photo_url, 8_000_000),
    });

    console.log("[PetLuma] POST /api/pets saved pet", pet);

    return NextResponse.json({ pet }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not save pet.";

    console.error("[PetLuma] POST /api/pets error", error);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
