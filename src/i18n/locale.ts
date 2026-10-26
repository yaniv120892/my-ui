import type { Direction, Locale } from './locale.types';

export const LOCALES = ['he', 'en'] as const;
export const DEFAULT_LOCALE: Locale = 'he';
export const LOCALE_COOKIE = 'locale';

const INTL_LOCALE: Record<Locale, string> = { he: 'he-IL', en: 'en-US' };

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && LOCALES.some((locale) => locale === value);
}

export function localeDirection(locale: Locale): Direction {
  return locale === 'he' ? 'rtl' : 'ltr';
}

export function intlLocale(locale: Locale): string {
  return INTL_LOCALE[locale];
}
