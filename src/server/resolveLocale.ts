import Negotiator from 'negotiator';
import { DEFAULT_LOCALE, isLocale } from '../i18n/locale';
import type { Locale, LocaleRequest } from '../i18n/locale.types';

/** Older browsers still send the retired ISO code for Hebrew. */
const RETIRED_HEBREW_CODE = 'iw';

export function resolveLocale({ cookieValue, acceptLanguage }: LocaleRequest): Locale {
  if (isLocale(cookieValue)) {
    return cookieValue;
  }
  const negotiator = new Negotiator({ headers: { 'accept-language': acceptLanguage ?? '' } });
  const preferred = negotiator.language(['he', RETIRED_HEBREW_CODE, 'en']);
  if (preferred === RETIRED_HEBREW_CODE) {
    return 'he';
  }
  return isLocale(preferred) ? preferred : DEFAULT_LOCALE;
}
