import { createBrowserRouter } from 'react-router';
import { MainPage } from '@/pages/main';
import { SignPage } from '@/pages/sign';
import {
  PrivateRoute,
  PublicRoute,
} from './AuthRoute';
import { IndexRedirect } from './IndexRedirect';

export const router = createBrowserRouter(
  [
    {
      Component: PrivateRoute,
      children: [
        {
          path: '/',
          Component: MainPage,
        },
      ],
    },
    {
      Component: PublicRoute,
      children: [
        {
          path: '/sign',
          Component: SignPage,
        },
      ],
    },
    {
      path: '*',
      Component: IndexRedirect,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
