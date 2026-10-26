import { NextRequest } from 'next/server';
import { ACCEPT_LANGUAGE_HEADER, LOCALE_COOKIE } from '../i18n/locale.js';
import type { Locale } from '../i18n/locale.types.js';
import { resolveLocale } from './resolveLocale.js';

/**
 * For route handlers that hold a Request rather than Next's request-scoped cookies().
 * Wrapping the handler's Request itself clones its body stream, which breaks a handler that reads
 * the body before or after this call. A body-less NextRequest still parses cookies as cookies()
 * does, so this agrees with getLocale.
 */
export function requestLocale({ url, headers }: { url: string; headers: Headers }): Locale {
  return resolveLocale({
    cookieValue: new NextRequest(url, { headers }).cookies.get(LOCALE_COOKIE)?.value,
    acceptLanguage: headers.get(ACCEPT_LANGUAGE_HEADER),
  });
}
