begin;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  inviter_id uuid;
  own_invite_code text;
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
  )
  returning invite_code into own_invite_code;

  update auth.users
  set raw_user_meta_data = jsonb_set(
    coalesce(raw_user_meta_data, '{}'::jsonb),
    '{invite_code}',
    to_jsonb(own_invite_code),
    true
  )
  where id = new.id;

  return new;
end;
$$;

revoke all on function private.handle_new_user() from public;

update auth.users as auth_user
set
  raw_user_meta_data = jsonb_set(
    coalesce(auth_user.raw_user_meta_data, '{}'::jsonb),
    '{invite_code}',
    to_jsonb(profile.invite_code),
    true
  ),
  updated_at = now()
from public.profiles as profile
where profile.id = auth_user.id
  and (
    auth_user.raw_user_meta_data ->> 'invite_code'
  ) is distinct from profile.invite_code;

commit;

select
  auth_user.id,
  auth_user.raw_user_meta_data ->> 'username' as username,
  auth_user.raw_user_meta_data ->> 'invite_code' as auth_invite_code,
  profile.invite_code as profile_invite_code
from auth.users as auth_user
join public.profiles as profile
  on profile.id = auth_user.id
order by auth_user.created_at;
