import { LOCALES } from './localeCodes.js';
import type { Direction, Locale } from './locale.types.js';

export const DEFAULT_LOCALE: Locale = 'he';
export const LOCALE_COOKIE = 'locale';
export const ACCEPT_LANGUAGE_HEADER = 'accept-language';

const LOCALE_CONFIG: Record<Locale, { intl: string; direction: Direction }> = {
  he: { intl: 'he-IL', direction: 'rtl' },
  en: { intl: 'en-US', direction: 'ltr' },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && LOCALES.some((locale) => locale === value);
}

export function localeDirection(locale: Locale): Direction {
  return LOCALE_CONFIG[locale].direction;
}

export function intlLocale(locale: Locale): string {
  return LOCALE_CONFIG[locale].intl;
}

export function otherLocale(locale: Locale): Locale {
  return LOCALES.find((candidate) => candidate !== locale) ?? DEFAULT_LOCALE;
}
