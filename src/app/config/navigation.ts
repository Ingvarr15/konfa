import { SignOutButton } from '@/features/Auth';
import {
  ChatsIcon,
  ContactsIcon,
  ProfileIcon,
  SignInIcon,
  SignUpIcon,
} from '@/shared/icons';
import { routes } from './routes';

export const navigationItems = [
  {
    icon: ContactsIcon,
    label: 'Контакты',
    path: routes.contacts,
  },
  {
    icon: ChatsIcon,
    label: 'Чаты',
    path: routes.chats,
  },
  {
    icon: ProfileIcon,
    label: 'Профиль',
    path: routes.profile,
    rightElement: SignOutButton,
  },
];

export const signNavigationItems = [
  {
    icon: SignInIcon,
    label: 'Вход',
    path: routes.signIn,
  },
  {
    icon: SignUpIcon,
    label: 'Регистрация',
    path: routes.signUp,
  },
];
