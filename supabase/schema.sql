-- ============================================================
--  ALQUITARA VIP · Esquema de base de datos (Supabase / Postgres)
--  Pega TODO este archivo en:  Supabase -> SQL Editor -> New query -> Run
-- ============================================================

-- ---------- PERFILES ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  phone text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now()
);

-- Crea el perfil automaticamente cuando alguien se registra
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'phone');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Helper: saber si el usuario actual es admin (evita recursion en RLS)
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ---------- EVENTOS (cronograma semanal) ----------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  day_of_week int not null check (day_of_week between 0 and 6), -- 0=Dom .. 6=Sab
  start_time text,
  image_url text,
  tag text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- PROMOCIONES ----------
create table if not exists public.promos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  price numeric,
  old_price numeric,
  image_url text,
  includes text[],
  badge text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- RESERVAS ----------
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  type text not null check (type in ('promo','cumple','mesa')),
  promo_id uuid references public.promos on delete set null,
  event_id uuid references public.events on delete set null,
  date date not null,
  guests int not null default 1,
  celebrant_name text,
  contact_phone text,
  notes text,
  status text not null default 'pendiente' check (status in ('pendiente','confirmada','cancelada')),
  created_at timestamptz not null default now()
);

-- ============================================================
--  ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles     enable row level security;
alter table public.events       enable row level security;
alter table public.promos       enable row level security;
alter table public.reservations enable row level security;

-- PERFILES: cada quien ve/edita el suyo; el admin ve todos
drop policy if exists "perfil propio lectura" on public.profiles;
create policy "perfil propio lectura" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists "perfil propio update" on public.profiles;
create policy "perfil propio update" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Seguridad: un usuario puede editar su nombre/teléfono pero NO su rol
-- (evita que alguien se auto-ascienda a admin desde el frontend).
revoke update (role) on public.profiles from authenticated, anon;

-- EVENTOS: lectura publica; solo admin escribe
drop policy if exists "eventos lectura publica" on public.events;
create policy "eventos lectura publica" on public.events
  for select using (true);

drop policy if exists "eventos admin escribe" on public.events;
create policy "eventos admin escribe" on public.events
  for all using (public.is_admin()) with check (public.is_admin());

-- PROMOS: lectura publica; solo admin escribe
drop policy if exists "promos lectura publica" on public.promos;
create policy "promos lectura publica" on public.promos
  for select using (true);

drop policy if exists "promos admin escribe" on public.promos;
create policy "promos admin escribe" on public.promos
  for all using (public.is_admin()) with check (public.is_admin());

-- RESERVAS: el usuario crea/ve las suyas; el admin ve y gestiona todas
drop policy if exists "reservas crea propias" on public.reservations;
create policy "reservas crea propias" on public.reservations
  for insert with check (auth.uid() = user_id);

drop policy if exists "reservas ve propias" on public.reservations;
create policy "reservas ve propias" on public.reservations
  for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists "reservas usuario cancela" on public.reservations;
create policy "reservas usuario cancela" on public.reservations
  for update using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "reservas admin borra" on public.reservations;
create policy "reservas admin borra" on public.reservations
  for delete using (public.is_admin());

-- ============================================================
--  STORAGE  (fotos de galeria, flyers de eventos y promos)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media lectura publica" on storage.objects;
create policy "media lectura publica" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "media admin sube" on storage.objects;
create policy "media admin sube" on storage.objects
  for insert with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "media admin actualiza" on storage.objects;
create policy "media admin actualiza" on storage.objects
  for update using (bucket_id = 'media' and public.is_admin());

drop policy if exists "media admin borra" on storage.objects;
create policy "media admin borra" on storage.objects
  for delete using (bucket_id = 'media' and public.is_admin());

-- ============================================================
--  DATOS INICIALES (cronograma y promos reales de Alquitara VIP)
-- ============================================================
insert into public.events (title, description, day_of_week, start_time, tag) values
  ('Martes de Reapertura', 'Arranca la semana con los mejores tragos y música urbana.', 2, '16:00', 'Open Door 4PM'),
  ('Miércoles de Damas', 'Noche especial para ellas. Cortesías y shows sorpresa.', 3, '16:00', 'Ladies Night'),
  ('Jueves de Karaoke & Tragos', 'Canta tus temas favoritos y gana cócteles.', 4, '16:00', 'Karaoke'),
  ('Viernes de Reventón', 'DJ en vivo, luces y la mejor vibra.', 5, '16:00', 'DJ en vivo'),
  ('Sábado "Del Frío" · Show Central', 'El evento más esperado: show central e invitados.', 6, '16:00', 'Show en vivo'),
  ('Resuaca Fest', 'Carta dominguera, cócteles especiales y premios al look más destruido.', 0, '16:00', 'Domingos')
on conflict do nothing;

-- (Las promos se dejan vacías: se gestionan desde el panel admin cuando haya
--  ofertas reales. Los servicios fijos ya están en la web.)

-- ============================================================
--  COMO HACERTE ADMIN:
--  1) Registrate normalmente en el sitio con tu correo.
--  2) Vuelve aqui y corre (cambia el correo por el tuyo):
--     update public.profiles set role = 'admin'
--     where id = (select id from auth.users where email = 'TU-CORREO@ejemplo.com');
-- ============================================================
