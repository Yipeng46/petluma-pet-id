import { createClient } from "@supabase/supabase-js";

type SavePetInput = {
  pet_name: string;
  breed?: string;
  photo_url?: string;
};

export type SavedPet = {
  id: string;
  petluma_id: string;
  pet_name: string;
  breed: string | null;
  photo_url: string | null;
  created_at: string;
};

const petLumaAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function createSupabaseServerClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.log("[PetLuma] Supabase env check", {
    hasSupabaseUrl: Boolean(supabaseUrl),
    hasServiceRoleKey: Boolean(serviceRoleKey),
  });

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variable.",
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function generatePetLumaId() {
  const code = Array.from({ length: 6 }, () => {
    const index = Math.floor(Math.random() * petLumaAlphabet.length);
    return petLumaAlphabet[index];
  }).join("");

  return `PLM-${code}`;
}

export async function savePet(input: SavePetInput) {
  const supabase = createSupabaseServerClient();

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const petlumaId = generatePetLumaId();

    console.log("[PetLuma] savePet insert attempt", {
      attempt: attempt + 1,
      petluma_id: petlumaId,
      pet_name: input.pet_name,
      hasBreed: Boolean(input.breed),
      hasPhotoUrl: Boolean(input.photo_url),
    });

    const { data, error } = await supabase
      .from("pets")
      .insert({
        petluma_id: petlumaId,
        pet_name: input.pet_name,
        breed: input.breed || null,
        photo_url: input.photo_url || null,
      })
      .select("id, petluma_id, pet_name, breed, photo_url, created_at")
      .single<SavedPet>();

    if (!error && data) {
      console.log("[PetLuma] saved pet", data);
      return data;
    }

    console.error("[PetLuma] Supabase insert error", {
      attempt: attempt + 1,
      code: error?.code,
      message: error?.message,
      details: error?.details,
      hint: error?.hint,
    });

    if (error?.code !== "23505" || attempt === 2) {
      throw new Error(error?.message || "Could not save pet.");
    }
  }

  throw new Error("Could not save pet.");
}
