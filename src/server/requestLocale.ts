import { NextRequest } from 'next/server';
import { ACCEPT_LANGUAGE_HEADER, LOCALE_COOKIE } from '../i18n/locale.js';
import type { Locale } from '../i18n/locale.types.js';
import { resolveLocale } from './resolveLocale.js';

/** For route handlers that hold a Request rather than Next's request-scoped cookies(). */
export function requestLocale(request: Request): Locale {
  return resolveLocale({
    cookieValue: new NextRequest(request).cookies.get(LOCALE_COOKIE)?.value,
    acceptLanguage: request.headers.get(ACCEPT_LANGUAGE_HEADER),
  });
}
