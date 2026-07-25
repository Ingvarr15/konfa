import type { signTabsMap } from '../constants';

export type SignTabType = (typeof signTabsMap)[keyof typeof signTabsMap];
