import { describe, expect, it } from 'vitest';
import { createTranslator } from './createTranslator.js';

describe('createTranslator', () => {
  it('translates app keys with variables and falls back to shared keys', () => {
    const translate = createTranslator({ locale: 'he', messages: { 'mail.code': 'הקוד שלך: {code}' } });
    expect(translate('mail.code', { code: 123 })).toBe('הקוד שלך: 123');
    expect(translate('app.shopping')).toBe('הקניות שלי');
  });
});
