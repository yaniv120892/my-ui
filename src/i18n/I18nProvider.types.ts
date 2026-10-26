import type { Locale } from './locale.types.js';
import type { CommonMessages, MessageVariables, Messages } from './messages.types.js';

export type Translate<M extends Messages> = (
  key: keyof (M & CommonMessages) & string,
  variables?: MessageVariables,
) => string;

export type I18nContextValue = {
  locale: Locale;
  /** Untyped by key; `useTranslations<M>()` narrows it to the app's message keys. */
  translate: (key: string, variables?: MessageVariables) => string;
  setLocale: (locale: Locale) => void;
};
