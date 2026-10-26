import type { CommonMessages, Dictionary, MessageVariables } from './messages.types.js';

/** Replaces `{name}` placeholders; an unknown placeholder is left visible so it gets noticed. */
export function formatMessage({
  template,
  variables,
}: {
  template: string;
  variables?: MessageVariables;
}): string {
  if (!variables) {
    return template;
  }
  return template.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    Object.hasOwn(variables, name) ? String(variables[name]) : placeholder,
  );
}

const commonEn = {
  'app.expenses': 'My Expenses',
  'app.investments': 'My Investments',
  'app.shopping': 'My Shopping',
  'shell.openNavigation': 'Open navigation',
  'shell.more': 'More',
  'shell.logout': 'Log out',
  'shell.switchToLight': 'Switch to light mode',
  'shell.switchToDark': 'Switch to dark mode',
  'shell.switchLanguage': 'עברית',
  'shell.switchLanguageHint': 'Switch to Hebrew',
  'shell.otherApps': 'Other apps',
} satisfies CommonMessages;

export const commonMessages: Dictionary<CommonMessages> = {
  en: commonEn,
  he: {
    'app.expenses': 'ההוצאות שלי',
    'app.investments': 'ההשקעות שלי',
    'app.shopping': 'הקניות שלי',
    'shell.openNavigation': 'פתיחת תפריט',
    'shell.more': 'עוד',
    'shell.logout': 'התנתקות',
    'shell.switchToLight': 'מעבר למצב בהיר',
    'shell.switchToDark': 'מעבר למצב כהה',
    'shell.switchLanguage': 'English',
    'shell.switchLanguageHint': 'מעבר לאנגלית',
    'shell.otherApps': 'אפליקציות נוספות',
  },
};
