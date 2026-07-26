drop policy if exists profiles_auth_signup_validation_select
  on public.profiles;

create policy profiles_auth_signup_validation_select
  on public.profiles
  for select
  to supabase_auth_admin
  using (true);

create or replace function public.hook_validate_signup(event jsonb)
returns jsonb
language plpgsql
set search_path = ''
as $$
declare
  submitted_email text := lower(event -> 'user' ->> 'email');
  submitted_username text := trim(coalesce(
    event -> 'user' -> 'user_metadata' ->> 'username',
    event -> 'user' -> 'raw_user_meta_data' ->> 'username',
    event -> 'user' -> 'data' ->> 'username',
    event -> 'data' ->> 'username',
    event ->> 'username'
  ));
  submitted_invite_code text := upper(
    trim(coalesce(
      event -> 'user' -> 'user_metadata' ->> 'invite_code',
      event -> 'user' -> 'raw_user_meta_data' ->> 'invite_code',
      event -> 'user' -> 'data' ->> 'invite_code',
      event -> 'data' ->> 'invite_code',
      event ->> 'invite_code'
    ))
  );
begin
  if exists (
    select 1
    from auth.users
    where lower(email) = submitted_email
  ) then
    return jsonb_build_object(
      'error',
      jsonb_build_object(
        'http_code',
        409,
        'message',
        'Этот адрес электронной почты уже занят'
      )
    );
  end if;

  if exists (
    select 1
    from public.profiles
    where lower(username) = lower(submitted_username)
  ) then
    return jsonb_build_object(
      'error',
      jsonb_build_object(
        'http_code',
        409,
        'message',
        'Имя пользователя уже занято'
      )
    );
  end if;

  if not exists (
    select 1
    from public.profiles
    where invite_code = submitted_invite_code
  ) then
    return jsonb_build_object(
      'error',
      jsonb_build_object(
        'http_code',
        400,
        'message',
        'Код приглашения недействителен'
      )
    );
  end if;

  return '{}'::jsonb;
end;
$$;

grant execute
  on function public.hook_validate_signup(jsonb)
  to supabase_auth_admin;

revoke execute
  on function public.hook_validate_signup(jsonb)
  from authenticated, anon, public;

grant select (id, username, invite_code)
  on public.profiles
  to supabase_auth_admin;
