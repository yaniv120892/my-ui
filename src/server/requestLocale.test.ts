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

  it('takes the last of duplicate locale cookies, as cookies() does', () => {
    const request = new Request('https://app.example.test', { headers: { cookie: 'locale=he; locale=en' } });
    expect(requestLocale(request)).toBe('en');
  });

  it('works on a request whose body was already read', async () => {
    const request = postWithBody();
    await request.json();
    expect(requestLocale(request)).toBe('en');
  });

  it('leaves the body readable for the handler', async () => {
    const request = postWithBody();
    expect(requestLocale(request)).toBe('en');
    await expect(request.json()).resolves.toEqual({ email: 'user@example.com' });
  });
});

function postWithBody(): Request {
  return new Request('https://app.example.test', {
    method: 'POST',
    headers: { cookie: 'locale=en' },
    body: JSON.stringify({ email: 'user@example.com' }),
  });
}
