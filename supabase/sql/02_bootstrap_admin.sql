-- Replace all three values before running this script in Supabase SQL Editor.
-- Do not commit a real password to the repository.

begin;

do $$
declare
  admin_email text := 'ADMIN_EMAIL'; -- Replace
  admin_username text := 'ADMIN_USERNAME'; -- Replace
  admin_password text := 'ADMIN_PASSWORD'; -- Replace
  admin_id uuid;
begin
  if admin_email = 'ADMIN_EMAIL'
    or admin_username = 'ADMIN_USERNAME'
    or admin_password = 'ADMIN_PASSWORD'
  then
    raise exception 'Replace admin placeholders before running the script';
  end if;

  if length(admin_password) < 8 then
    raise exception 'Admin password must contain at least 8 characters';
  end if;

  select id
  into admin_id
  from auth.users
  where lower(email) = lower(admin_email);

  if admin_id is null then
    admin_id := gen_random_uuid();

    insert into auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      confirmation_token,
      recovery_token,
      email_change,
      email_change_token_new,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    )
    values (
      '00000000-0000-0000-0000-000000000000',
      admin_id,
      'authenticated',
      'authenticated',
      lower(admin_email),
      extensions.crypt(
        admin_password,
        extensions.gen_salt('bf')
      ),
      now(),
      '',
      '',
      '',
      '',
      jsonb_build_object(
        'provider', 'email',
        'providers', jsonb_build_array('email'),
        'role', 'admin',
        'bootstrap_admin', true
      ),
      jsonb_build_object(
        'username', trim(admin_username),
        'email_verified', true
      ),
      now(),
      now()
    );
  else
    update auth.users
    set encrypted_password = extensions.crypt(
          admin_password,
          extensions.gen_salt('bf')
        ),
        email_confirmed_at = coalesce(email_confirmed_at, now()),
        confirmation_token = coalesce(confirmation_token, ''),
        recovery_token = coalesce(recovery_token, ''),
        email_change = coalesce(email_change, ''),
        email_change_token_new = coalesce(email_change_token_new, ''),
        raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
          || jsonb_build_object(
            'provider', 'email',
            'providers', jsonb_build_array('email'),
            'role', 'admin',
            'bootstrap_admin', true
          ),
        raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb)
          || jsonb_build_object(
            'username', trim(admin_username),
            'email_verified', true
          ),
        updated_at = now()
    where id = admin_id;

    insert into public.profiles (
      id,
      username,
      email,
      role
    )
    values (
      admin_id,
      trim(admin_username),
      lower(admin_email),
      'admin'
    )
    on conflict (id) do update
    set username = excluded.username,
        email = excluded.email,
        role = excluded.role;
  end if;

  insert into auth.identities (
    id,
    provider_id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  )
  select
    gen_random_uuid(),
    admin_id::text,
    admin_id,
    jsonb_build_object(
      'sub', admin_id::text,
      'email', lower(admin_email),
      'email_verified', true,
      'phone_verified', false,
      'username', trim(admin_username)
    ),
    'email',
    now(),
    now(),
    now()
  where not exists (
    select 1
    from auth.identities
    where user_id = admin_id
      and provider = 'email'
  );
end;
$$;

commit;

select
  id,
  username,
  email,
  role,
  invite_code
from public.profiles
where role = 'admin';
