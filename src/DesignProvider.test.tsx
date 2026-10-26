import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Box } from '@mui/material';
import { DesignProvider } from './DesignProvider.js';
import type { Locale } from './i18n/locale.types.js';

vi.mock('next/navigation', () => ({ useRouter: () => ({ refresh: vi.fn() }) }));

afterEach(cleanup);

function providerWithBox(locale: Locale) {
  return (
    <DesignProvider locale={locale} messages={{}}>
      <Box data-testid="box" sx={{ ml: '12px' }} />
    </DesignProvider>
  );
}

function renderMarginLeft(locale: Locale) {
  render(providerWithBox(locale));
  return getComputedStyle(screen.getByTestId('box'));
}

describe('DesignProvider', () => {
  it('mirrors physical sides for Hebrew through the RTL style plugin', () => {
    const style = renderMarginLeft('he');
    expect(style.marginRight).toBe('12px');
    expect(style.marginLeft).not.toBe('12px');
  });

  it('keeps physical sides for English', () => {
    const style = renderMarginLeft('en');
    expect(style.marginLeft).toBe('12px');
  });

  it('drops the RTL plugin when the language switches from Hebrew to English', () => {
    const { rerender } = render(providerWithBox('he'));
    rerender(providerWithBox('en'));
    expect(getComputedStyle(screen.getByTestId('box')).marginLeft).toBe('12px');
  });
});
