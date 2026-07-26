import { Navigate } from 'react-router';
import { routes } from '@/app/config';
import { Loader } from '@/widgets/Auth';
import { useAuth } from '@/shared/hooks';

export const IndexRedirect = function IndexRedirect() {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Navigate
      replace
      to={isAuthenticated ? routes.contacts : routes.sign}
    />
  );
};
