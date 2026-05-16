import type { Personality } from "@/lib/pet-options";

export type Pet = {
  id: string;
  petluma_id: string;
  pet_name: string;
  breed: string;
  birthday: string;
  personality: Personality;
  favorite_snack: string;
  photo_url: string;
  photo_path: string;
  pet_phrase: string;
  created_at: string;
};
