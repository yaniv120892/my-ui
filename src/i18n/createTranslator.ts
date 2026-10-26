import type { Translate } from './I18nProvider.types.js';
import type { Locale } from './locale.types.js';
import { commonMessages, formatMessage } from './messages.js';
import type { Messages } from './messages.types.js';

/** The non-hook translator, for server components, route handlers and emails. */
export function createTranslator<M extends Messages>({
  locale,
  messages,
}: {
  locale: Locale;
  messages: M;
}): Translate<M> {
  const merged: Messages = { ...commonMessages[locale], ...messages };
  return function translate(key, variables) {
    return formatMessage({ template: merged[key] ?? key, variables });
  };
}
