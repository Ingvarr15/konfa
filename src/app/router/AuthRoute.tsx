import {
  Navigate,
  Outlet,
} from 'react-router';
import { Loader } from '@/widgets/Auth';
import { authRouteTypesMap } from '@/shared/constants';
import { useAuth } from '@/shared/hooks';
import type { AuthRouteType } from '@/shared/types';

interface Props {
  type: AuthRouteType;
  redirectPath?: string;
}

export const AuthRoute = function AuthRoute({
  type,
  redirectPath,
}: Props) {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  const isPrivate = type === authRouteTypesMap.private;

  if (isPrivate && !isAuthenticated) {
    return <Navigate replace to={redirectPath ?? '/sign'} />;
  }

  if (!isPrivate && isAuthenticated) {
    return <Navigate replace to={redirectPath ?? '/'} />;
  }

  return <Outlet />;
};

export const PrivateRoute = function PrivateRoute() {
  return (
    <AuthRoute
      redirectPath="/sign"
      type={authRouteTypesMap.private}
    />
  );
};

export const PublicRoute = function PublicRoute() {
  return (
    <AuthRoute
      redirectPath="/"
      type={authRouteTypesMap.public}
    />
  );
};
