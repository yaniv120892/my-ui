import { LOCALE_COOKIE } from '../i18n/locale';
import type { Locale } from '../i18n/locale.types';
import { resolveLocale } from './resolveLocale';

/** For route handlers that hold a Request rather than Next's request-scoped cookies(). */
export function requestLocale(request: Request): Locale {
  const cookieValue = request.headers
    .get('cookie')
    ?.split(';')
    .map((pair) => pair.trim().split('='))
    .find(([name]) => name === LOCALE_COOKIE)?.[1];
  return resolveLocale({ cookieValue, acceptLanguage: request.headers.get('accept-language') });
}
