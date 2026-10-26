import Negotiator from 'negotiator';
import { ACCEPT_LANGUAGE_HEADER, DEFAULT_LOCALE, isLocale } from '../i18n/locale.js';
import { LOCALES } from '../i18n/localeCodes.js';
import type { Locale, LocaleRequest } from '../i18n/locale.types.js';

/** Older browsers still send the retired ISO code for Hebrew. */
const RETIRED_HEBREW_CODE = 'iw';

export function resolveLocale({ cookieValue, acceptLanguage }: LocaleRequest): Locale {
  if (isLocale(cookieValue)) {
    return cookieValue;
  }
  const negotiator = new Negotiator({ headers: { [ACCEPT_LANGUAGE_HEADER]: acceptLanguage ?? '' } });
  const preferred = negotiator.language([...LOCALES, RETIRED_HEBREW_CODE]);
  if (preferred === RETIRED_HEBREW_CODE) {
    return 'he';
  }
  return isLocale(preferred) ? preferred : DEFAULT_LOCALE;
}
