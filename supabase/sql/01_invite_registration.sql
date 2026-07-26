begin;

do $$
begin
  if to_regclass('public.profiles') is null then
    raise exception 'Table public.profiles does not exist';
  end if;

  if not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'profiles'
      and column_name = 'id'
  ) or not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'profiles'
      and column_name = 'username'
  ) then
    raise exception 'public.profiles must contain id and username';
  end if;
end;
$$;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create or replace function private.generate_invite_code()
returns text
language plpgsql
volatile
set search_path = ''
as $$
declare
  generated_code text;
begin
  loop
    generated_code := upper(
      substr(replace(gen_random_uuid()::text, '-', ''), 1, 16)
    );

    exit when not exists (
      select 1
      from public.profiles
      where invite_code = generated_code
    );
  end loop;

  return generated_code;
end;
$$;

revoke all on function private.generate_invite_code() from public;

alter table public.profiles
  add column if not exists email text,
  add column if not exists invite_code text,
  add column if not exists invited_by uuid,
  add column if not exists role text not null default 'user';

update public.profiles
set email = lower(auth_users.email)
from auth.users as auth_users
where public.profiles.id = auth_users.id
  and public.profiles.email is null;

update public.profiles
set invite_code = private.generate_invite_code()
where invite_code is null;

alter table public.profiles
  alter column email set not null,
  alter column invite_code
    set default private.generate_invite_code(),
  alter column invite_code set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_email_key'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_email_key unique (email);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_invite_code_key'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_invite_code_key unique (invite_code);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_invited_by_fkey'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_invited_by_fkey
      foreign key (invited_by)
      references public.profiles (id)
      on delete set null;
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_role_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_role_check
      check (role in ('user', 'admin'));
  end if;
end;
$$;

create index if not exists profiles_invited_by_idx
  on public.profiles (invited_by);

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  inviter_id uuid;
  submitted_code text;
  is_bootstrap_admin boolean := coalesce(
    (new.raw_app_meta_data ->> 'bootstrap_admin')::boolean,
    false
  );
begin
  if not is_bootstrap_admin then
    submitted_code := upper(
      trim(new.raw_user_meta_data ->> 'invite_code')
    );

    select id
    into inviter_id
    from public.profiles
    where invite_code = submitted_code;

    if inviter_id is null then
      raise exception using
        errcode = 'P0001',
        message = 'invalid_invite_code';
    end if;
  end if;

  insert into public.profiles (
    id,
    username,
    email,
    invited_by,
    role
  )
  values (
    new.id,
    trim(new.raw_user_meta_data ->> 'username'),
    lower(new.email),
    inviter_id,
    case when is_bootstrap_admin then 'admin' else 'user' end
  );

  return new;
end;
$$;

revoke all on function private.handle_new_user() from public;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

commit;
