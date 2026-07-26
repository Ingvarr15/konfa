import { createBrowserRouter } from 'react-router';
import { ChatsPage } from '@/pages/chats';
import { ContactsPage } from '@/pages/main';
import { ProfilePage } from '@/pages/profile';
import { SignInPage } from '@/pages/sign-in';
import { SignUpPage } from '@/pages/sign-up';
import { routes } from '../config';
import {
  AppLayout,
  AuthLayout,
} from '../layouts';
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
          path: routes.contacts,
          Component: AppLayout,
          children: [
            {
              index: true,
              Component: ContactsPage,
            },
            {
              path: routes.chats,
              Component: ChatsPage,
            },
            {
              path: routes.profile,
              Component: ProfilePage,
            },
          ],
        },
      ],
    },
    {
      Component: PublicRoute,
      children: [
        {
          Component: AuthLayout,
          children: [
            {
              path: routes.signIn,
              Component: SignInPage,
            },
            {
              path: routes.signUp,
              Component: SignUpPage,
            },
          ],
        },
      ],
    },
    {
      path: routes.notFound,
      Component: IndexRedirect,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
