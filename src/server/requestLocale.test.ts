// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { requestLocale } from './requestLocale.js';

describe('requestLocale', () => {
  it('reads the locale cookie among others', () => {
    const request = new Request('https://app.example.test', {
      headers: { cookie: 'session=abc; locale=en; other=1', 'accept-language': 'he' },
    });
    expect(requestLocale(request)).toBe('en');
  });

  it('falls back to Accept-Language without the cookie', () => {
    const request = new Request('https://app.example.test', { headers: { 'accept-language': 'en-GB' } });
    expect(requestLocale(request)).toBe('en');
  });

  it('leaves the body readable, before and after the body is read', async () => {
    const postWithBody = () =>
      new Request('https://app.example.test', {
        method: 'POST',
        headers: { cookie: 'locale=en' },
        body: JSON.stringify({ email: 'user@example.com' }),
      });

    const readFirst = postWithBody();
    await readFirst.json();
    expect(requestLocale(readFirst)).toBe('en');

    const readAfter = postWithBody();
    expect(requestLocale(readAfter)).toBe('en');
    await expect(readAfter.json()).resolves.toEqual({ email: 'user@example.com' });
  });
});
