import type { Locale } from './locale.types';

export type Messages = Record<string, string>;
export type MessageVariables = Record<string, string | number>;

/** Every locale carries the same keys as the source (English) messages. */
export type Dictionary<M extends Messages> = Record<Locale, Record<keyof M, string>>;
