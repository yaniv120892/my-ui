'use client';

import { useMemo } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { AppUrlsProvider } from './apps/AppUrlsContext.js';
import type { AppUrls } from './apps/registry.types.js';
import { I18nProvider } from './i18n/I18nProvider.js';
import { localeDirection } from './i18n/locale.js';
import type { Locale } from './i18n/locale.types.js';
import type { Messages } from './i18n/messages.types.js';
import { createAppTheme } from './theme/createAppTheme.js';

const RTL_CACHE = { key: 'muirtl', stylisPlugins: [prefixer, rtlPlugin] };
const LTR_CACHE = { key: 'mui', stylisPlugins: [prefixer] };
const NO_APP_URLS: AppUrls = {};

/**
 * Theme, emotion cache, CssBaseline and i18n in one provider. Render it in the root layout
 * with the locale from `getLocale()` (`@yaniv120892/my-ui/server`) and the app's messages for it.
 * `appUrls` feeds the "Other apps" links; an app without a URL is left out.
 */
export function DesignProvider({
  locale,
  messages,
  appUrls = NO_APP_URLS,
  children,
}: {
  locale: Locale;
  messages: Messages;
  appUrls?: AppUrls;
  children: React.ReactNode;
}) {
  const direction = localeDirection(locale);
  const theme = useMemo(() => createAppTheme(direction), [direction]);

  // The emotion cache is created once per mount, so a language switch must remount it
  // for the RTL plugin to be added or removed.
  return (
    <AppRouterCacheProvider key={direction} options={direction === 'rtl' ? RTL_CACHE : LTR_CACHE}>
      <ThemeProvider theme={theme} defaultMode="system">
        <CssBaseline />
        <I18nProvider locale={locale} messages={messages}>
          <AppUrlsProvider value={appUrls}>{children}</AppUrlsProvider>
        </I18nProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
