import { describe, expectTypeOf, it } from 'vitest';
import { useCommonTranslations, useTranslations } from './I18nProvider.js';
import type { CommonMessageKey } from './messages.types.js';

describe('translator key types', () => {
  it('limits the shell translator to the shared keys', () => {
    expectTypeOf(useCommonTranslations).returns.parameter(0).toEqualTypeOf<CommonMessageKey>();
  });

  it("widens an app's translator to its own keys plus the shared ones", () => {
    expectTypeOf(useTranslations<{ 'mail.code': string }>)
      .returns.parameter(0)
      .toEqualTypeOf<'mail.code' | CommonMessageKey>();
  });
});
