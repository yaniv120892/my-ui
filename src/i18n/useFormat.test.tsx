import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DesignProvider } from '../DesignProvider.js';
import { useFormat } from './useFormat.js';

vi.mock('next/navigation', () => ({ useRouter: () => ({ refresh: vi.fn() }) }));

function renderFormat() {
  return renderHook(useFormat, {
    wrapper: ({ children }) => (
      <DesignProvider locale="en" messages={{}}>
        {children}
      </DesignProvider>
    ),
  });
}

describe('useFormat', () => {
  it('prints a date-only value as that calendar day', () => {
    const { result } = renderFormat();
    expect(
      result.current.date({ value: '2026-10-24', options: { day: 'numeric', month: 'short' } }),
    ).toBe('Oct 24');
  });

  it('prints dates in the apps’ shared time zone, whatever the runtime’s own zone is', () => {
    const { result } = renderHook(useFormat, {
      wrapper: ({ children }) => (
        <DesignProvider locale="en" messages={{}}>
          {children}
        </DesignProvider>
      ),
    });
    expect(
      result.current.date({
        value: '2026-03-05T23:30:00Z',
        options: { day: 'numeric', month: 'short' },
      }),
    ).toBe('Mar 6');
  });
});
