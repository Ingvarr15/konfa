import { createBrowserRouter } from 'react-router';
import { ChatsPage } from '@/pages/chats';
import { ContactsPage } from '@/pages/main';
import { ProfilePage } from '@/pages/profile';
import { SignInPage } from '@/pages/sign-in';
import { SignUpPage } from '@/pages/sign-up';
import {
  navigationItems,
  routes,
  signNavigationItems,
} from '../config';
import { AppLayout } from '../layouts';
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
          element: (
            <AppLayout navigationItems={navigationItems} />
          ),
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
          element: (
            <AppLayout
              centerContent
              navigationItems={signNavigationItems}
            />
          ),
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
