import { SignIn, SignUp } from '../ui';
import type { SignTabType } from '../types';
import type { JSX } from 'react';

export const signTabsMap = {
  signUp: 'signUp',
  signIn: 'signIn',
} as const;

export const signTabsContent: Record<SignTabType, JSX.Element> = {
  [signTabsMap.signIn]: <SignIn />,
  [signTabsMap.signUp]: <SignUp />,
};
