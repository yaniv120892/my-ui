import { cookies, headers } from 'next/headers';
import { LOCALE_COOKIE } from '../i18n/locale';
import type { Locale } from '../i18n/locale.types';
import { resolveLocale } from './resolveLocale';

/** For the root layout: `<html lang={locale} dir={localeDirection(locale)}>`. */
export async function getLocale(): Promise<Locale> {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  return resolveLocale({
    cookieValue: cookieStore.get(LOCALE_COOKIE)?.value,
    acceptLanguage: headerStore.get('accept-language'),
  });
}
