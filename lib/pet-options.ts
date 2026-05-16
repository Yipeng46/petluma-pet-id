export const personalities = [
  "Playful",
  "Calm",
  "Loyal",
  "Curious",
  "Sleepy",
  "Funny",
] as const;

export type Personality = (typeof personalities)[number];

export const petPhrases = [
  "I had a good day. I think I deserve extra treats.",
  "I looked adorable today and everyone should know.",
  "My human is doing their best. I supervise closely.",
  "I found sunshine, snacks, and a perfect place to nap.",
  "I bring premium emotional support with very soft paws.",
  "I am small in paperwork, large in personality.",
] as const;

export function randomPetPhrase() {
  return petPhrases[Math.floor(Math.random() * petPhrases.length)];
}
