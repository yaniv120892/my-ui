'use client';

import { useMemo } from 'react';
import { intlLocale } from './locale';
import { useI18n } from './I18nProvider';

/** Locale-aware Intl formatters, so every app prints numbers and dates the same way. */
export function useFormat() {
  const { locale } = useI18n();
  return useMemo(() => {
    const languageTag = intlLocale(locale);
    return {
      number: (value: number, options?: Intl.NumberFormatOptions) =>
        new Intl.NumberFormat(languageTag, options).format(value),
      currency: ({
        value,
        currency = 'ILS',
        options,
      }: {
        value: number;
        currency?: string;
        options?: Intl.NumberFormatOptions;
      }) =>
        new Intl.NumberFormat(languageTag, { style: 'currency', currency, ...options }).format(
          value,
        ),
      percent: (value: number, options?: Intl.NumberFormatOptions) =>
        new Intl.NumberFormat(languageTag, {
          style: 'percent',
          maximumFractionDigits: 1,
          ...options,
        }).format(value),
      date: (value: Date | string | number, options?: Intl.DateTimeFormatOptions) =>
        new Intl.DateTimeFormat(languageTag, options ?? { dateStyle: 'medium' }).format(
          new Date(value),
        ),
    };
  }, [locale]);
}
