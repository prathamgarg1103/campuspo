-- CampusGO initial Supabase schema

create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text not null,
  roll_number text unique,
  email text not null,
  branch text,
  semester integer check (semester between 1 and 8),
  year_of_joining integer,
  role text not null default 'student'
    check (role in ('student','society_admin','faculty','super_admin')),
  avatar_url text,
  phone text,
  hostel_block text,
  created_at timestamptz default now()
);

create table public.buildings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  short_name text,
  category text not null
    check (category in ('academic','hostel','food','sports','admin','library','medical','shop','other')),
  latitude numeric(10,7) not null,
  longitude numeric(10,7) not null,
  floor_count integer,
  description text,
  opening_time time,
  closing_time time,
  phone text,
  is_24hrs boolean default false,
  geojson_polygon jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  building_id uuid references public.buildings(id) on delete cascade,
  room_code text not null,
  floor integer,
  capacity integer,
  room_type text default 'classroom'
    check (room_type in ('classroom','lab','seminar','auditorium'))
);

create table public.shops (
  id uuid primary key default gen_random_uuid(),
  building_id uuid references public.buildings(id),
  name text not null,
  category text not null
    check (category in ('food','stationery','medical','salon','atm','printing','other')),
  description text,
  phone text,
  opening_time time,
  closing_time time,
  is_24hrs boolean default false,
  is_open boolean default true,
  menu_url text,
  location_note text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.societies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category text,
  description text,
  logo_url text,
  email text,
  instagram_url text,
  head_user_id uuid references public.profiles(id),
  is_active boolean default true,
  created_at timestamptz default now()
);

create table public.society_memberships (
  id uuid primary key default gen_random_uuid(),
  society_id uuid references public.societies(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  role text default 'member' check (role in ('member','core','head')),
  joined_at timestamptz default now(),
  unique(society_id, user_id)
);

create table public.society_follows (
  society_id uuid references public.societies(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  followed_at timestamptz default now(),
  primary key (society_id, user_id)
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_type text not null
    check (event_type in ('thapar_official','society','workshop','fest','sports','other')),
  organiser_id uuid references public.profiles(id),
  society_id uuid references public.societies(id),
  building_id uuid references public.buildings(id),
  room_id uuid references public.rooms(id),
  venue_note text,
  start_time timestamptz not null,
  end_time timestamptz,
  registration_deadline timestamptz,
  max_capacity integer,
  current_registrations integer default 0,
  ticket_price numeric(8,2) default 0,
  banner_url text,
  tags text[],
  requires_registration boolean default true,
  is_published boolean default false,
  is_cancelled boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  status text default 'confirmed' check (status in ('confirmed','waitlisted','cancelled')),
  ticket_code text unique default upper(substring(gen_random_uuid()::text, 1, 8)),
  checked_in boolean default false,
  checked_in_at timestamptz,
  registered_at timestamptz default now(),
  unique(event_id, user_id)
);

create table public.timetable_slots (
  id uuid primary key default gen_random_uuid(),
  branch text not null,
  semester integer not null,
  section text,
  subject_name text not null,
  subject_code text,
  faculty_name text,
  room_id uuid references public.rooms(id),
  day_of_week integer not null check (day_of_week between 1 and 7),
  start_time time not null,
  end_time time not null,
  week_type text default 'all' check (week_type in ('all','odd','even')),
  valid_from date,
  valid_until date,
  created_at timestamptz default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  body text,
  type text default 'general' check (type in ('event_reminder','registration_confirm','new_event','general')),
  related_event_id uuid references public.events(id),
  is_read boolean default false,
  created_at timestamptz default now()
);

create table public.broadcast_notifications (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references public.profiles(id),
  title text not null,
  body text not null,
  target_group text default 'all',
  sent_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.buildings enable row level security;
alter table public.rooms enable row level security;
alter table public.shops enable row level security;
alter table public.societies enable row level security;
alter table public.events enable row level security;
alter table public.registrations enable row level security;
alter table public.timetable_slots enable row level security;
alter table public.notifications enable row level security;

create policy "Anyone can view published events" on public.events
  for select using (is_published = true and is_cancelled = false);

create policy "Admins can manage events" on public.events
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role in ('society_admin','faculty','super_admin')
    )
  );

create policy "Users can view own registrations" on public.registrations
  for select using (user_id = auth.uid());

create policy "Users can register themselves" on public.registrations
  for insert with check (user_id = auth.uid());

create policy "Public can view buildings" on public.buildings
  for select using (true);

create policy "Public can view rooms" on public.rooms
  for select using (true);

create policy "Public can view shops" on public.shops
  for select using (true);

create policy "Public can view active societies" on public.societies
  for select using (is_active = true);

create policy "Public can view timetable slots" on public.timetable_slots
  for select using (true);

create policy "Users can view own notifications" on public.notifications
  for select using (user_id = auth.uid());

create policy "Users can view own profile" on public.profiles
  for select using (id = auth.uid());

create policy "Users can update own profile" on public.profiles
  for update using (id = auth.uid());

create or replace function increment_registration_count()
returns trigger as $$
begin
  update public.events
  set current_registrations = current_registrations + 1
  where id = new.event_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_registration_insert
  after insert on public.registrations
  for each row execute function increment_registration_count();

create index on public.events(start_time);
create index on public.events(event_type);
create index on public.timetable_slots(branch, semester, day_of_week);
create index on public.registrations(user_id);
create index on public.notifications(user_id, is_read);
