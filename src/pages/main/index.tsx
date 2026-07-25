import { useAuth } from '@/shared/hooks';

export const MainPage = function MainPage() {
  const { user } = useAuth();

  return (
    <main>
      Привет,
      {' '}
      {user?.user_metadata.username}
    </main>
  );
};
