export { DesignProvider } from './DesignProvider.js';
export { APP_IDS } from './apps/appIds.js';
export { APP_ICONS } from './apps/registry.js';
export type { AppId, AppUrls } from './apps/registry.types.js';
export { useAppUrls } from './apps/AppUrlsContext.js';
export { I18nProvider, useI18n, useTranslations } from './i18n/I18nProvider.js';
export type { Translate } from './i18n/I18nProvider.types.js';
export {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  intlLocale,
  isLocale,
  localeDirection,
  otherLocale,
} from './i18n/locale.js';
export { LOCALES } from './i18n/localeCodes.js';
export type { Direction, Locale } from './i18n/locale.types.js';
export { createTranslator } from './i18n/createTranslator.js';
export { commonMessages, formatMessage } from './i18n/messages.js';
export type {
  CommonMessageKey,
  CommonMessages,
  Dictionary,
  MessageVariables,
  Messages,
} from './i18n/messages.types.js';
export { useFormat } from './i18n/useFormat.js';
export { AppShell } from './shell/AppShell.js';
export type { AppShellProps, NavItem } from './shell/AppShell.types.js';
export { AppSwitcher } from './shell/AppSwitcher.js';
export { AuthCard } from './shell/AuthCard.js';
export { BrandMark } from './shell/BrandMark.js';
export { LanguageToggle } from './shell/LanguageToggle.js';
export { ModeToggle } from './shell/ModeToggle.js';
export { PageHeader } from './shell/PageHeader.js';
export { CHART_SERIES, FONT_FAMILY, SHELL, createAppTheme } from './theme/createAppTheme.js';
export type { ChartPalette } from './theme/createAppTheme.types.js';
