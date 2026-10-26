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
});
