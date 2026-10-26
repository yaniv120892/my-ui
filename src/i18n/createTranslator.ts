import type { Translate } from './I18nProvider.types';
import type { Locale } from './locale.types';
import { commonMessages, formatMessage } from './messages';
import type { Messages } from './messages.types';

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
