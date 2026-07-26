import { createBrowserRouter } from 'react-router';
import { ChatsPage } from '@/pages/chats';
import { MainPage } from '@/pages/main';
import { ProfilePage } from '@/pages/profile';
import { SignPage } from '@/pages/sign';
import { routes } from '../config';
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
          Component: AppLayout,
          children: [
            {
              index: true,
              Component: MainPage,
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
          path: routes.sign,
          Component: SignPage,
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
