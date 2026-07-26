import {
  ChatsIcon,
  ContactsIcon,
  ProfileIcon,
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
  },
] as const;
