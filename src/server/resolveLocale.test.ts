import { describe, expect, it } from 'vitest';
import { resolveLocale } from './resolveLocale.js';

describe('resolveLocale', () => {
  it('prefers the cookie over the browser language', () => {
    expect(resolveLocale({ cookieValue: 'en', acceptLanguage: 'he-IL,he;q=0.9' })).toBe('en');
  });

  it('ignores a cookie that is not a supported locale', () => {
    expect(resolveLocale({ cookieValue: 'fr', acceptLanguage: 'en-US' })).toBe('en');
  });

  it('honours Accept-Language quality ordering', () => {
    expect(
      resolveLocale({ cookieValue: undefined, acceptLanguage: 'fr;q=1, en;q=0.5, he;q=0.8' }),
    ).toBe('he');
  });

  it('maps the retired iw code to Hebrew', () => {
    expect(resolveLocale({ cookieValue: undefined, acceptLanguage: 'iw' })).toBe('he');
  });

  it('falls back to Hebrew when nothing matches', () => {
    expect(resolveLocale({ cookieValue: null, acceptLanguage: 'de-DE' })).toBe('he');
    expect(resolveLocale({ cookieValue: null, acceptLanguage: null })).toBe('he');
  });
});
