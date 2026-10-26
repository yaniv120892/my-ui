'use client';

import { createContext, useCallback, useContext, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createTranslator } from './createTranslator.js';
import { LOCALE_COOKIE } from './locale.js';
import type { Locale } from './locale.types.js';
import type { Messages } from './messages.types.js';
import type { I18nContextValue, Translate } from './I18nProvider.types.js';

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: React.ReactNode;
}) {
  const router = useRouter();

  // The server reads the cookie to render <html lang dir>, so only a refresh flips the document.
  const setLocale = useCallback(
    function setLocale(next: Locale) {
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
      router.refresh();
    },
    [router],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      translate: createTranslator({ locale, messages }),
      setLocale,
    }),
    [locale, messages, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used inside <DesignProvider>');
  }
  return context;
}

/**
 * Typed translator over the app's own keys plus the shared shell keys.
 * Apps wrap it once: `export const useT = () => useTranslations<typeof en>();`
 */
export function useTranslations<M extends Messages = Messages>(): Translate<M> {
  return useI18n().translate;
}
