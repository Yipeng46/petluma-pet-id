create table if not exists public.pets (
  id uuid primary key default gen_random_uuid(),
  petluma_id text not null unique,
  pet_name text not null,
  breed text,
  photo_url text,
  photo_path text,
  created_at timestamptz not null default now()
);

create index if not exists pets_created_at_idx on public.pets (created_at desc);
