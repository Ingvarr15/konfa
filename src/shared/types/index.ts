import type { authRouteTypesMap } from '../constants';
import type { ElementType } from 'react';

export type AuthRouteType = (typeof authRouteTypesMap)[
  keyof typeof authRouteTypesMap
];

export interface SnackBarOptions {
  type: 'success' | 'error';
  text: string;
  duration?: number;
}

export interface NavigationItem {
  icon: ElementType;
  label: string;
  path: string;
  rightElement?: ElementType;
}
