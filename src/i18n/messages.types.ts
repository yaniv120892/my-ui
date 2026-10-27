import type { Locale } from './locale.types.js';

export type Messages = Record<string, string>;
export type MessageVariables = Record<string, string | number>;

/** The shell's own keys, shared by every app on top of its own messages. */
export type CommonMessageKey =
  | 'app.expenses'
  | 'app.investments'
  | 'app.shopping'
  | 'app.parking'
  | 'shell.openNavigation'
  | 'shell.more'
  | 'shell.logout'
  | 'shell.switchToLight'
  | 'shell.switchToDark'
  | 'shell.switchLanguage'
  | 'shell.switchLanguageHint'
  | 'shell.otherApps';

export type CommonMessages = Record<CommonMessageKey, string>;

/** Every locale carries the same keys as the source (English) messages. */
export type Dictionary<M extends Messages> = Record<Locale, Record<keyof M, string>>;
