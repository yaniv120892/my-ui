'use client';

import { useMemo } from 'react';
import { intlLocale } from './locale.js';
import { useI18n } from './I18nProvider.js';

/** One zone for server and browser, or SSR and hydration print different days near midnight. */
const SHARED_TIME_ZONE = 'Asia/Jerusalem';

const numberFormats = new Map<string, Intl.NumberFormat>();
const dateFormats = new Map<string, Intl.DateTimeFormat>();

export function useFormat() {
  const { locale } = useI18n();
  return useMemo(() => {
    const languageTag = intlLocale(locale);
    return {
      number: ({ value, options = {} }: { value: number; options?: Intl.NumberFormatOptions }) =>
        numberFormat({ languageTag, options }).format(value),
      currency: ({
        value,
        currency = 'ILS',
        options,
      }: {
        value: number;
        currency?: string;
        options?: Intl.NumberFormatOptions;
      }) => numberFormat({ languageTag, options: { style: 'currency', currency, ...options } }).format(value),
      percent: ({ value, options }: { value: number; options?: Intl.NumberFormatOptions }) =>
        numberFormat({ languageTag, options: { style: 'percent', maximumFractionDigits: 1, ...options } }).format(
          value,
        ),
      date: ({ value, options }: { value: Date | string | number; options?: Intl.DateTimeFormatOptions }) => {
        const dateOptions = { timeZone: SHARED_TIME_ZONE, ...(options ?? { dateStyle: 'medium' }) };
        return dateFormat({ languageTag, options: dateOptions }).format(new Date(value));
      },
    };
  }, [locale]);
}

function numberFormat({ languageTag, options }: { languageTag: string; options: Intl.NumberFormatOptions }) {
  return cached({
    cache: numberFormats,
    key: `${languageTag}|${JSON.stringify(options)}`,
    create: () => new Intl.NumberFormat(languageTag, options),
  });
}

function dateFormat({ languageTag, options }: { languageTag: string; options: Intl.DateTimeFormatOptions }) {
  return cached({
    cache: dateFormats,
    key: `${languageTag}|${JSON.stringify(options)}`,
    create: () => new Intl.DateTimeFormat(languageTag, options),
  });
}

/** Intl formatters are costly to build and immutable, so one per locale and options is shared. */
function cached<Formatter>({
  cache,
  key,
  create,
}: {
  cache: Map<string, Formatter>;
  key: string;
  create: () => Formatter;
}): Formatter {
  let formatter = cache.get(key);
  if (!formatter) {
    formatter = create();
    cache.set(key, formatter);
  }
  return formatter;
}
