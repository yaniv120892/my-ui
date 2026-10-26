import type { LOCALES } from './localeCodes.js';

export type Locale = (typeof LOCALES)[number];
export type Direction = 'rtl' | 'ltr';

export type LocaleRequest = {
  cookieValue: string | null | undefined;
  acceptLanguage: string | null | undefined;
};
