import type { authRouteTypesMap } from '../constants';

export type AuthRouteType = (typeof authRouteTypesMap)[
  keyof typeof authRouteTypesMap
];

export interface SnackBarOptions {
  type: 'success' | 'error';
  text: string;
  duration?: number;
}
