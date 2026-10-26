import type { Direction, Locale } from './locale.types';
import type { CommonMessages } from './messages';
import type { MessageVariables, Messages } from './messages.types';

export type I18nContextValue = {
  locale: Locale;
  direction: Direction;
  messages: Messages;
  setLocale: (locale: Locale) => void;
};

export type Translate<M extends Messages> = (
  key: keyof (M & CommonMessages) & string,
  variables?: MessageVariables,
) => string;
