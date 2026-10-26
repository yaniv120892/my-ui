import { parse } from 'cookie';
import { ACCEPT_LANGUAGE_HEADER, LOCALE_COOKIE } from '../i18n/locale.js';
import type { Locale } from '../i18n/locale.types.js';
import { resolveLocale } from './resolveLocale.js';

/**
 * For route handlers that hold a Request rather than Next's request-scoped cookies().
 * Reads headers only: wrapping the Request (e.g. in NextRequest) clones its body stream,
 * which breaks a handler that reads the body before or after this call.
 */
export function requestLocale(request: Request): Locale {
  return resolveLocale({
    cookieValue: parse(request.headers.get('cookie') ?? '')[LOCALE_COOKIE],
    acceptLanguage: request.headers.get(ACCEPT_LANGUAGE_HEADER),
  });
}
