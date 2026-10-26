import type { LOCALES } from './locale';

export type Locale = (typeof LOCALES)[number];
export type Direction = 'rtl' | 'ltr';

export type LocaleRequest = {
  /** The visitor's explicit choice, from the locale cookie. */
  cookieValue: string | null | undefined;
  acceptLanguage: string | null | undefined;
};
