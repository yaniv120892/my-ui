import { cache } from 'react';
import { cookies, headers } from 'next/headers';
import { ACCEPT_LANGUAGE_HEADER, LOCALE_COOKIE } from '../i18n/locale.js';
import type { Locale } from '../i18n/locale.types.js';
import { resolveLocale } from './resolveLocale.js';

/** For the root layout: `<html lang={locale} dir={localeDirection(locale)}>`. */
export const getLocale = cache(async function getLocale(): Promise<Locale> {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  return resolveLocale({
    cookieValue: cookieStore.get(LOCALE_COOKIE)?.value,
    acceptLanguage: headerStore.get(ACCEPT_LANGUAGE_HEADER),
  });
});
